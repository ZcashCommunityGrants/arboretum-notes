# Arborist Call  #38 Notes

Meeting Date/Time: October 20th 2022, 21:30 UTC

Meeting Duration: 35 minutes

**Agenda**: 

+ Zebrad Status Updates
    

+ Zcashd Status Updates


+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://ipfs.io/ipfs/QmZxaSXypcC6BFQ84KYkA2yQ1E5JR8FZcLafW61YkEH5Hg) [2](https://ipfs.io/ipfs/QmVsH8qMPwqwxXfwPqAaeKZnoadeMfYtA98ifTEPCHcvFX) [3](https://ipfs.io/ipfs/QmcMMacPFRjQvJfFRhFsDMHT8YmpC6GjzSGSAFqfHchgnR) [4](https://ipfs.io/ipfs/QmanXWr5HoM24GgXffpKEbFrqVkJ4NZMUcwdMWLKAXkx4S)

Moderator: Steven Smith


Notes: Jason Rogers

___

## Decisions & Action Items


i)   Wallet devs & Ecosystem participants to discuss impacts of fee changes with ECC 

ii)  Core team to upgrade 'zcash_inspect' tool to add fee calculation



___

## Full Notes



### 1. Zebrad Updates - Zebra 1.0.0 release candidate


[02:47] - **Teor**

Hi, I am Teor. We have exciting news Zebra has tagged its first release candidate which means that we're pretty happy with the consensus rules, syncing the chain and lightwalletd RPC's and we're looking to get it audited over the next few months hopefully. 

[03:19]

In this particular release we made some significant performance improvements to the lightwalletd RPCs making lightwalletd syncing about 2x faster. Also letting all of the RPCs run in parallel with blocks being committed to the state. Anybody who uses Zebras RPC's should see some performance improvements there. 

[03:44]

One breaking change in this release is that rust released a new compiler version with a performance regression in Zebras parameter download code so for new users that might mean if you build with rust 1.64 or later, the parameter download will timeout. Old users are fine & anybody who uses rust 1.63 or earlier should be fine. We've got a workaround on our side of using rust 1.63 and/or using the download script from the Zcashd repository to download the parameters. So you can check out the readme for those details. Those are the big changes in this release, and credit to the entire Zebra team including a bunch of people who are no longer with the foundation for getting us to this stage.

[04:40]

If you want to try Zebra out we are the 'zebra project' on [dockerhub](https://hub.docker.com/r/zfnd/zebra/tags) / [release notes](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.0). Go launch a docker image, see how it goes. It'll just sync for now we didn't want to turn the RPCs on by default because that might be a security issue to have them running unexpectedly but you should be able to turn those on by changing the config in the docker image. So thats where we're up to. We've had some questions from users already on our discord and on the R&D discord. 

[05:40] - **Steven**

I'd just like to say huge congratulations. I know it's been a tonne of great work. As Teor indicated some people that worked on it really hard and are not with the foundation currently but great work by those folks as well as the current engineers at the foundation. It's been a big effort and a lot of great work. 


___

### 2. Zcashd Updates i) - Status Update / 5.3.0 release 


[07:00]

The focus for us has been for some period of time making some changes to lessen the impact of the increase shielded load that we're seeing on chain. We've put out a couple of Zcashd releases already, 5.1.0/5.2.0, we're releasing 5.3.0 today. We'll talk a little about that in a moment with some of the specifics. But just that 5.3.0 is largely focused on improving concurrent memory utilisation during scanning/full node sync so that we don't max out and run out of memory when that is occurring.  We've made a number of optimisations here to improve that and we are pretty pleased with that. 

[07:57]

There's a couple of other optimisations, we are looking at one memory related & one performance and we'll get those rolled into maybe a zcashd 5.3.1 or 5.4.0, it depends on the timing but we'll get that out as quick as we could but we wanted to get the memory optimisations out on the field as soon as possible. 

[08:17]

We are also working on recursion in Halo2 and on three parallel tracks as I mentioned before, it's a long running project. The frontend API, backend split accumulation & circuit changes for full width scalar multiplication. We've continued to do work on ZIP 317. I mentioned that on the last Arborist call and as that call was ongoing we thought of an edge case that we hadn't accounted for and we've got a slide that talks about the parameter selection for that coming up. We'll go over that one more time so everyone is on the same page. 

[09:01]

On the mobile sdk's, we put out the releases for the node. We feel pretty good about that. We've still got some optimisation we'll be rolling out but for wallets built on our SDK, which is Nighthawk, Unstoppable & Edge wallets, we need to get a faster sync solution in place in those SDK's. That's been our priority ever since we put out 5.2.0. for Zcashd because that involves the core team and the wallet team working on those releases. Primarily on the core side, Kris & Str4d have been doing great work along with Pacu and Carter and the wallet folks.

[09:50]

Our tentative timeline is on IOS side we will have an alpha ready next week for trial testing, the android should follow roughly by a week. We are getting pretty close to the first phase where we'll roll out that out in a couple of releases. The first one is massive in terms of the updates that occurs so we wanted to split it up and do it piecemeal and also add support to the SDKs for unified addresses. 

[10:26]

In terms of Zcashd 5.3.0 specifically. 5.2.0 improved the performance of wallets scanning with multithreaded batch scanning Sapling outputs. Essentially, the high level version that resulted in more memory usage and depending on your node and your wallet you could hit an OOM situation. We isolated that, we made a lot of improvements around memory usage in the batch scanner and now we cap it. We detect it and cap it and operate within that cap so we avoid the OOM problems. 

[11:10]

We also have added new metrics, prometheus metrics. You can see those and that gives you an idea of progress of the batch scanner as well as how far the node has synced & block height. On the RPC interface, finalorchardroot & getblock result and the finalRoot field + z_gettreestate have been changed so that to match byte ordering that can be something that can be discovered. That's essentially the updates, as I mentioned the bulk of work on 5.3.0 were on memory optimisations for the most part. 

___

### 2. Zcashd Updates ii)  - ZIP 317 


[11:51]

ZIP 317, Here's the parameter selection that we are settled on. We have Kris & this is a text he put together so we can analyse this so we have an expert on the call. I'll walk you through the high level intent. The intent is to make fees paid for transactions, as the name of the ZIP implies, proportional to your usage of the chain. How much are you using the chain in terms of space for any given transaction? The team came up with the concept of logical actions. 

[12:35]

Actions is an orchard term specifically. In sprout theres joinsplits, in sapling theres inputs/outputs but in orchard theres just actions. You cant really tell what is an input. 10 actions could be 5 inputs 5 outputs or 1 input 9 outputs. It's obfuscated for privacy. Logical actions is a term we came up with to have a common term applied across all the pools. Basically what we wanted to come up with was a way to make fair regardless of which pool you're in and not creating an economic incentive to use one pool over another per se. To just make usage of the chain equitable across pool regardless of what you're doing.  

[13:35]

In the case of Sprout, you have Joinsplits, 2x the number of joinsplits. For sapling the max of inputs or outputs on a transaction and again orchard actions is a logical thing as well and on the transparent side you have the ins & outs from txo's. What that didn't account for is sometimes transparent transactions can be rather large even though they have a smaller number of inputs and outputs. What we wanted to do - and this was the change from last Arborist call when we discussed this: we wanted to account for, if you do have a large transparent transaction, even though you might have a small number of inputs & outputs, we wanted to factor in and create a logical actions for transparent. 

[14:27]

It's essentially taking the standard input size for a transparent transaction as the devisor and the dividend being the actual number of input bytes and ditto on the output side. Output bytes divided by the standard output bytes. So you kind of wind up with a logical representation of usage of the chain by that transparent transaction. The net of all this is the fee comes out to be something we feel is fair and equitable regardless of the pool you're using and its based on how much you used the chain. I know thats a lot. I do have some examples of what this looks like in practice. 

[15:24] - **Adi**

Great to see so many iterations of the parameter selection. Looking at the logical actions, for the sapling portion, I see a max of either sapling inputs or outputs. 

[15:56] - **Kris**

We wanted to make sure that there was not an economic reason to use Sapling instead of Orchard. In orchard its non discretionary. You have as many inputs as you have outputs or vice versa. So by taking the max of the sapling inputs & sapling outputs it essentially means you are paying the same per input/output price as you are paying for using orchard. 

[16:32] - **Adi**

Steven also mentioned an edge case that was found. Even I had discussed with Daira and we found our edge case but that was in the enforcement portion. Was that the same as this or another one?

[16:45] - **Steven**

No, at the last Arborist call we weren't taking into account the potential size of a transparent transaction. We were just looking at the number of transparent inputs & outputs similar to how we were doing sapling. Then we realised you can have a low number of transparent inputs & outputs but a very large transparent transaction. We just wanted to make sure that if you happen to have one of those very large transactions, you're paying the equivalent if you had the same number of transparent inputs & outputs that created the same amount of chain usage. That was the case we discovered after the last arborist call.

[17:36] - **Kris**

With transparent scripts you can include an arbitrary amount of data and this basically says, as with sprout & sapling, we are going to use the size of the transparent script as our proxy for the number of economic actions you are trying to make. So if you have a 2 input 2 output transparent transaction you'll be paying the same as a 2 input 2 output sapling or orchard transactions and thats assuming a standard p2pkh transaction. If you have a multisig or something like that you might end up paying approximately one action per signature thats required. 

[18:42] - **Adi**

Understood, thats pretty smart. My concern was about enforcement of this fee and thats where another edge case where the spamming can continue. So what are the plans around enforcement? Is this going to be a hard fork upgrade or a soft fork? 

[19:03] - **Steven**

The next step if someone says, "what about this edge case" and we revisit it, Nate couldn't join us today he's been on point on our side getting comfortable with the actual parameters. It's also another reason why you have to be incredibly careful with anything related to economics. Thats why we've really scrutinised potential fee changes so we thought about it from a lot of angles to try and identify any edge cases or holes in the implementation.

[19:48]

The next steps, Adi we could definitely use your help on this. I think Nate may have emailed you, we want to get the wallet developers together from the community like yourself and zecwallet, ywallet, edge, unstoppable and go over some of this. I know you have a great understanding because you talked with folks at zcon3, Kris & Daira and then authored the zip and have been iterating on that. You're super familiar with it, I want to make sure other wallet devs are up to speed too and have an opportunity to weigh in any concerns or questions or perhaps they can think of an edge case.

[20:40]

That would be next step and in parallel we can be thinking 'how do we enforce this'. We want to make sure as we roll out a fee change that it doesn't have some unintended second order effect and impact. The great thing, like Greg who's relatively new core developer has done some great analysis work. So we could look at fees that are currently being paid and the shape of transactions, what those fees are and then model it so if we did increase fees to one thing or another, what would it look like, what would that impact be? 

[21:17]

We can now use that same technology or the same analysis to look at wallet developers that have elected to start adding this in as the standard fee, nothing would break if its not included. So if you and the Nighthawk team had implemented it first but Edge or Unstoppable was behind, nothings going to stop their transactions from working but we can monitor the adoption of this new fee schedule in the ecosystem. Then to look at "we're comfortable with the percentage of transactions that are paying fees according to the new mechanism are enough that if we enforce it its not going to eliminate people from being able to transact with Zcash".

[22:08]

First step would be getting it implemented by the devs and second step would be some selective enforcement. The 'enforcement' is to be determined, we don't have any specific, we have some ideas but not hardfast 'this would be the best way'. You can look at miners not including transactions that don't have the right fee structure, the relay of transactions not relaying things that don't have the right fee structure, theres a number of things you could do strictly before you would do some kind of network upgrade/hardfork enforcement of fee change. I think we've got some options on the enforcement side but a lot of it to be determined and working with the different dev teams and community on what that looks like. 

[23:09] - **Adi**

That clarifies a lot of upcoming plans for this zip to be adopted, thank you. 

[23:18] - **Steven**

Great work and thank you for authoring this. I know you've been communicating with the team, Nate and Kris and Str4d and great work to everyone involved.


___

### 3. Open Discussion i) - Shielded Pools / Fee Enforcement 


[23:43] - **Anonymous**

Can you briefly explain the terms "Sapling" & "Orchard for a newbie?

[23:49]

There are 4 pools of funds in Zcash, this is going to be super high level. One is transparent, one is Sprout - that was the first shielded technology introduced to Zcash. Another one is Sapling - that was the 2nd shielded tech introduced in Zcash which i believe was October 2018. Then Orchard is based on a new proof system called halo 2 and that activated in May of this year. There are 4 separate pools, with the names we followed an Arborist theme, sprout sapling orchard. It's essentially just a way to distinguish the different pools. They all use different underlying cryptography. 

[25:12]

Parameter analysis, this is rough approximation. If you look at something with 2 logical actions from the parameter selection slide. If you think of it as one thing in-one thing out, the simplest transaction. If you did one of those in every single block which is roughly 1152 per day based on 75 second block time you would have paid under the old mechanism $0.69. Now you would pay $6.91. More but you are doing 1100 transactions a day, so when you keep it that particular perspective in mind its not that bad. 

[26:17]

Then you can see some other examples of a 2 in 2 out or a 4 in 4 out. Again, all the fees per day would have been, assuming you did one every block you can see the numbers there. It would have been $0.69 now its $13/$27. The last column is a multiple of 2. This is the actual average increased shielded transaction load, at the time we pulled this it was representative of the load that we're seeing. Each transaction, on average for the given week that we looked at was about 1100 logical actions. There were about 704 of those per day. Not one in every block but one in a number of blocks per day. The old fee for the transactions would be $0.42 per day. Now that number would be $2300 per day. This is essentially filling up blocks that the transactions occur in so you're getting full use of the blockchain for these transactions.

[27:44]

A proportional fee mechanism would say "you use more, you pay more" and thats what it would add up to. This would be about $12 a month under the old fee mechanism and we've got about $69,000 a month under the new mechanism. It's a pretty substantial load that we're seeing and it's making heavy use of the chain so it should definitely be proportional in our opinion. 

[28:53] - **Dodger**

There are some legitimate users who could want to create transaction with lots of actions like exchanges sweeping funds from deposit addresses and miners doing mining payouts. How would this impact them?

[29:16] - **Steven**

Next steps are meeting wallet devs and keeping the tyres on it but also with Exchanges and Mining pools to go over the fee mechanism change with them and make them aware of any potential impact to their standard operations. Those were 2 standard cases we were already thinking about. Sometimes I think the way exchanges work, people assume "I have a deposit address, I put my 5 ZEC in there and my 5 ZEC's always in there". It's actually probably in there for about a minute and it gets swept to an an address used for proof of reserves for example. 

[30:09]

Depending on how they operate and the pattern of deposits & withdrawals could involve a lot of notes which would then have a larger impact on fees and ditto for mining pools. If a miner mines a block and it's a block reward, they've got 100 participants in the pool, that could potentially be in the simplest case a 1 in 100 out transaction. Those are the type of conversation we'll be having over the coming weeks to make sure that the change is well understood by ecosystem participants and they specifically understand how it might alter their operations. 

[31:00] - **Kris**

I have two comments there. One is that the initial plan for enforcement of this is through miner selection, to prefer to select transactions that pay the ZIP 317 fees but as far as miners are concerned for their own payouts, one of the things they can do is include their own transactions regardless of whether or not they pay that conventional fee. For mining pools I think this is less of a concern because mining pools never have to obey any fee structure. Fees are not currently part of the consensus rules. 

[31:57]

The second thing is that fees after this change will remain extremely low. The per action fee is going to be something like a 10th of a cent or lower at current prices. So if an exchange has to spend 10 cents to sweep 100 deposits, compared to other chain thats still extremely cheap. The other thing, I know from my own experience withdrawals from the exchanges that i've interacted with charge a withdrawal fee and those fees most recently I paid was 0.001 ZEC. Thats 100 times the fee the exchange actually has to pay even under the new rules. Fees remain extremely low but if you're trying to fill every block then it starts to add up. 

[33:29] - **Dodger**

It would be interesting to have a tool that you could give a Transaction ID and then it could tell you what the implied cost of the transaction would have been. 

[33:48] - **Steven**

I'm sure thats something Greg could add really quick. 

[33:53] - **Kris**

We have a tool that we ship with Zcashd which is zcash_inspect and that already does dissection of transactions, it would be trivial to add the calculation of what the fee total under the new rules would be. That actually works with the bytes of a transaction but it would be straightforward to chain that together with a script that would grab a transaction from the chain. 

[34:35] - **Steven**

Added that to our core team list to catch up on. Good idea. 

[34:42] - **Adi**

To add to what Kris said, the whole purpose of the ZIP was to not let the fees grow a lot for end users who use Zcash regularly for sending and receiving ZEC, this goes for exchanges as well and the other point for exchanges, the other services who might make large bundled transactions. In the past we've seen other blockchains service providers adopt to the changing fees, so today because of the low fees they might send large transactions but if they do see they're paying significant amount for sending such transactions they might change their way of operations so I'm not too worried about exchanges. 


### Attendees

+  Adi Zcash

+  Arya Solhi

+  Conrado Gouvea

+  Dodger

+  Kris

+  Marek

+  Marshall

+  Pacu ECC

+  Teor

+  Ying Tong

+  Andrew Levin

+  Charlie OKeefe

+  Daniel Wolande

+  Michael Harms

+  Sasha S


___
___

**Next Meeting Scheduled For: November 3rd 15:00 UTC**
