# Arborist Call #89 Notes

Meeting Date/Time: October 31st 2024, 21:00 UTC

Meeting Duration: 1 hour 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ [NU6]()

+ ECC Core Update - [PCZT's / Zallet]() 

+ Zebra Update - [Zebra 2.0.1]() 

+ [ECC & ZF zcashd deprecation]()

+ Research & Implementation Updates -  [ZSA update]() / [FROST update]() / [NSM update]() // [Crosslink update]()

+ Open Announcements - [NSM Twitter Spaces / Wallet Developers NU6 updates]()

+ Open Discussion - [NU7 Draft ZIPs]()



## Decision & Action Items

i) Check user agent stream in Zebra - Alfredo 

ii) Write possible description of emissions under NSM Daira Emma + Str4d


___

Video of the meeting: [recorded]()

Moderator: Decentralistdan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC & ZF - NU6

[00:01:34.22] - **Daira Emma**

NU6, have we done anything specific since the last Arborist call? I think everything is pretty much ticking along with NU6. I submitted a PR for the final clarifications of the NU6 specs. The least authority audit has been published. It's on one of the github tickets. 

[00:02:32.57] - **Str4d**

At least as visible by my seeder, current updates to the good PSA it is about. I I'm seeing around 30 nodes that are on NU6 compatible, around 50 nodes that are not yet. So that's the distribution. 50 zcashd nodes, again, these are the ones in the good set that my seeder determines will be advertised. So there will be more nodes that are not visible there. But the zcashd 5.1.0 EOS is, I believe Tuesday next week. So we should see a wave of updates to 6.0.0 in the next week as people hit that EOS halt and update their nodes.

[00:03:45.28] - **Alfredo**

Yeah. For  NU6, in the last two weeks, we added a [release](https://github.com/ZcashFoundation/zebra/releases/tag/v2.0.1) with the mainnet activation height.

[00:03:55.42] 

We added a document in the [Zebra book](https://zebra.zfnd.org/user/custom-testnets.html) about the private testnet that the ECC did with the Zcash Foundation. We published the results of that into a book page. We also updated the NU6 related documentation in the codebase. We did a release with all that. I think that the NU6 is passed now for zcashd and zebrad.

[00:04:32.17] - **Str4d**

I believe that the mobile SDKs, at least, that we've had, obviously, since zcashd 6.0.0, we've had corresponding Rust crate updates with support for a NU6. Those at this point have made their way out into the mobile SDKs as well. So like Zashi, Edge, Unstoppable, anyone who's depending on the current versions of the mobile SDK crates, those wallets should also be in U6 compatible at this time.

[00:05:18.27] - **Alfredo**

Yeah, I was going to ask, Str4d, how do you know the nodes that are upgraded? Do you do an RPC call to get the consensus branch ID?

[00:05:31.15] - **Str4d**

You mean how do I know for my own metrics?

[00:05:41.13] - **Alfredo**

Yeah, so how do you know? 

[00:05:44.04] - **Str4d**

So I operate one of the DNS seeders. So the DNS seeder code has this big dump file that it generates with just every node it's ever seen and the current statistics. So it's like a text version of what's in its database. And I've just got some scripts that go through that and extract from that the nodes that it is currently advertising. So a very small portion of the nodes it's ever seen will be classed as good based on the metrics that it decides that this is a good stable peer to advertise for the network. And so I just have scripts that pull those out to see what the current set of good nodes are by node version.

[00:06:26.06] - **Daira Emma**

Yeah. Can you summarize what the criteria are for a good node? I know it has to be able to connect with the right version.

[00:06:37.33] - **Str4d**

It's a bunch of thing... Obviously, it has to be serving the current protocol version that is peer-to-peer protocol version. And so that obviously changes across network upgrade boundaries. So that's the thing that defines whether NU6 or a network upgrade is supported.

[00:06:58.11] - **Str4d**

It also does things like it must be publicly reachable at the default port of 8232, whichever one it is, which is the P2P port. Because obviously, DNS only can advertise IP addresses. It can't advertise ports. So any node that isn't accessible at the default port is by definition, bad in this context.  Similarly, it then looks for, well, A, it must be reachable. You must be able to connect to it. It checks things like, are you on the same chain as we expect? Do you have good up-time? So it's tracking up times both short term over the last hour or two back to the last month. And it's looking at a bunch of bits related to that for, is this a peer that would be good to tell other people to connect to? So this is all code that was implemented for Bitcoin that we ported to Zcash. So It's the same thing I've been running for for years and that I've been using for these metrics.

[00:08:08.02] - **Alfredo**

I think in Zebra, there is some user agent in the peers, I think we should check that because we operate with every whichever it is. We operate the user agent stream, but it's not a very good way, I guess, to check if they are good enough.

[00:08:26.34] - **Str4d**

The seeder is connecting over the peer-to-peer network protocol to fetch that version information and things. So in addition to that, it has to be able to successfully complete a handshake. Anything in the version negotiation piece that relates to the upgrade process inherently gets checked there. Anyway, I think we should put a cap on that for now and move on.



### 2. Zebra Update - Zebra 2.0.1 / 

[00:09:14.55] - **Alfredo**
Yeah, I guess that's me. Apart from what I said that Conrado wrote that private testnet guide for the test we did with the ECC. Not sure if it was mentioned, but we added the cookie authentication method to the Zebra RPCs.

[00:09:38.14] - **Alfredo**
Then we added the new activation heights and created the version 2 stable release. We had a release candidate before. However, we had a mistake with some of the package increase that I owe, so we had to release the patch 2.0.1, which is the one people should use if they are expecting to pass a NU6 mainnet activation. Unfortunately, if you use 2.0.0, which was our intention, that will result in a panic. You must use 2.0.1 to pass NU6 Yeah, I guess we were a bit busy with that. Then we fixed that bug in the size metrics that are breathing with Zebrad start shutdown. They were a bit off.

[00:10:27.28] - **Alfredo**
We are working on now In the CI side, we are fixing the merge from external contribution into main because it's still failing. Gustavo, our CI of DevOps guy is working on that. That's related to a PR Zaino opened that we already approved, but it's not merged due to that issue.

[00:10:54.22] - **Alfredo**
Then, I think Arya is working on implementing the... I think he's already done implementing the get block the other RPC method. I think Conrado is working on extending the getblock RPC method that has a lot of options, and Zebra only support a handful of those, so we want to support more. Another big change I am working on is we are changing the Zebra RPC framework. We're refactoring the framework to use crates that are not deprecated. That's a big refactor, but for the end user and the people that use the API, it should be the same.

____

### 3. ECC Updates - PCZT's / Zallet


[00:12:14.01] - **Str4d**

Okay, I don't know what was mentioned last time because I'm currently in a time zone that means I can't make the other time slot for Arborist calls. But in the last In a couple of weeks, the main focus has have been on support stuff related to moving things along the NU7 activation pathway for ZIPs related to that. So we've had work we had to do along those lines. There's been a couple of different bugs that have been investigated and resolved around Zashi.

[00:13:00.52] 

There are a couple of bugs related to how the is shielding state was displayed. Kris has been implementing a first pass of how note management for the SDKs so that they will start splitting up change into multiple notes for better flexibility in transaction creation. And then there's a couple of other user bugs that have come up related to this error message and things that we've spent some time on. There is work being done on refactoring the transaction builder - work that I will be picking up related to that along the lines of enabling the transaction builder to work with PCZTs.

[00:14:03.16]

So on the PCZT front, that's the main next thing to be making progress, which is enabling. For context, PCZTs are partially created Zcash transactions. The intention is to be effectively the Zcash equivalent of Bitcoin's PSBT, Partially Signed Bitcoin transaction, and enable different hardware wallet vendors, wallet providers, service operators, and things to interoperate when it comes to collaborating on creating a transaction.

[00:14:43.10] 

And the current status there is that the main draft proposal for the structure of the PCZTs is up, and people have been giving feedback on it. There's a few more fields that need inclusion and updates there. But once those additional fields are in place, then the fun, hard problem of deciding what encoding to use is my next task there, and in particular, deciding what properties we want from the encoding.

[00:15:15.23] 

So that's the thing I'm looking into at the moment from that regard. But the transaction builder stuff changes I was mentioning relate to being able to take the rust crates and produce PCZTs to then be able to use them. So there's work that will be happening in that vein. Trying to think, is there anything else I haven't mentioned in the last week or two?

[00:15:47.42] 

I think that's mostly we haven't done much on the zcashd side because we've focused on NU7 primarily.

[00:15:55.34] - **Daira Emma**

Yeah, I was just looking for zcashd PRs. 

[00:16:00.55] - **Str4d**

The main things we've been doing related to zcashd have been focused instead on the zcashd wallet replacement. And so that's been where the changes in the and so on have been part of that.

[00:16:16.44] - **Daira Emma**

Did you mention that we've made a start on the new wallet replacement.?

[00:16:23.38] - **Str4d**

Yes. So we've put as a basis for starting to put together a thing that people can use to execute on the wallet back-end. We've put together an initial binary that can be used, which currently does nothing, but it has all the framework for localization and commands and whatnot just for the zcashd wallet replacement.

[00:16:55.22]

Just as a thing that can then run the services, because the main The next thing that has to happen along that pathway to zcashd  replacement is being able to spin up the wallet back-end that currently exists and start connecting it to the outside world from RPCs and things, to be able to, to some extent, empirically determine what remains to be done in terms of support for the use cases and methods and things that existing zcashd wallet users require. So getting that to the point of being able to start iterating and testing on that bit is what's currently going on on that particular axis.

[00:17:42.45] - **Daira Emma**

We have a provisional name for that wallet, which is Zallet. Z-a-l-l-e-t.

[00:17:54.54] - **Str4d**

Yeah, Kris suggested that as based on Sallet, which is a piece armour.

[00:18:05.54] 

Medieval French helmets or something. 

[00:18:14.16] - **Alfredo**

Yeah, that's really cool. Do you have a link to a repo?

[00:18:21.04] - **Str4d**

It's just in the same wallet repo that we've been using for the coordination. 

[00:18:32.46] 

Yeah, so it's just whatever that current PR is up there, [PR 8](https://github.com/zcash/wallet/pull/8) so I can just drop a link in chat. There you go.

___


### 4. zcashd depreaction 

[00:19:09.35] - **Str4d**

Well, we just were talking about that in the previous section, so stuff is happening in that direction. Yeah, from our perspective, we just described what we're currently working on there. I think once we have that framework up, probably one of the next big things will be starting to get the...my goal for this particular binary is to get it to the point where we can integrate it into the existing Python RPC test framework, which I believe has already been at least migrated to be able to run the non-wallet-related pieces on Zebra. 

[00:19:54.05] 

So what I want to get to the point of is that we can have a combination of Zebra, some interstitial, which for now we can just use a lightwalletd temporarily, and this, to get to the point where we can start running the existing test suite against that combination, even if it's just some a bit of manual work to get going so that we can then start integrating on, okay, what limitations need to be fixed in the back-end stack and it's read that way. I expect that will be a somewhat jankier integration, and we'll see whether or not we keep it in the far future going forward.

[00:20:39.08] 

But at least for this step, that's going to be pretty critical to ensuring that nothing gets missed.

[00:20:52.45] - **Pacu**

On the outreach front, we're keeping to nudge the different partners operating nodes. We've discovered a few that we will be reaching out shortly. Also, we are in touch with new partners that we've met thanks to Kit from Red-bridge.

[00:21:26.04] 

We're basically trying to collect from them requirements elements from other kinds of blockchains like Avalanche that have an Ethereum-based structure and architecture. We would like to know how we could better support Zcash being supported on those explorers, especially on the verge of the Avalanche<>Zcash Bridge, aka Red Bridge, being online in, I hope near future. That's basically it on the outreach. If anyone has contacts, they could provide business relationships. Everything's welcome. We're trying to reach everyone out there through everything, smoke signals, pigeons, GitHub tickets, Telegram messages, etc.

[00:22:33.49] 

Just message me, Pili or Dan, and we will get on to it.


___


### 5. Research & Implementation Updates i) Zcash Shielded Assets

[00:23:12.31] - **Daira Emma**

I can summarize the last meeting I had with them. So basically, they were talking about fees for ZSAs. And they had to identify that there are four cases. There's creating a brand new asset. Then the other three are issuing funds and asset, burning, and just transfers using an asset. The last of those can't be distinguished from just Orchard transfers.

[00:23:53.28] 

They obviously have to have the same fee. The issuing and burning From the point of view of spam prevention, they don't really need to have a higher fee because all you're doing is updating a database entry to how much of those how much in that asset has been issued. But from an economic point of view, you might want to charge more for them. I don't really have a strong opinion on that, and neither did get it. And for creating a new entry for a new asset, that has to have a higher fee. I think Qedit suggested 5,000 times the marginal fee. I think, personally, that's a little bit too high. It only needs to be, I don't know, 500 to 2,000.

[00:25:03.07] 

We don't really want people creating huge numbers of new assets. The only real limitation there is that if we wanted to allow assets to be used for individual NFTs, then high fee would obviously be disadvantageous just to that usage. But I'm not sure we want to encourage that usage for the time being. I don't know. So that's fees. Does anyone have any comments on fees to start with?

[00:25:45.46] - **Zooko**

I put a comment in the text messages, but I don't think we need to spend time talking about it just for future reference.

[00:25:53.51] - **Daira Emma**

Yeah, because that's not part of ZSA's. Excuse me. And the other question was whether we should include action groups in the V6 format, but essentially turned off. So I'm just a special case where you have one action group because it affects the structure of the V6 format. 

[00:26:24.18] 

So if we could express adding Express Enabling Action groups as just removing a restriction, that might be useful to simplify parsers and so on. Qedit was going to go away and see how complicated that was, whether that's something they could specify in the next few days before the NU7 ZIP deadline. But if it turns out it's too complicated, then And we'll just defer that.

[00:27:04.28] - **Str4d**

And then I think the only other thing that we could bring up here is that the circuit audit for ZSAs, I believe, starts next week.

[00:27:19.35] - **Arya**

And.. Implementation that are in Zebra are currently under review. They've created a series of... For their implementation in Zebra, and that's under review. The first two were reviewed, the remaining three should be reviewed shortly.


___


### 5. Research & Implementation Updates ii) FROST


[00:28:16.44] - **Conrado**

Yeah, on Frost, we made the 2.0.0 release final, which is very similar to the release candidate. It has a bunch of new functions, They exposed the API. They were already there, but they were exposed in the API because they're useful for some use case, like we're finding single signature shares instead of just aggregating them, for example.

[00:28:45.23]

But that's out. There's one interesting thing going on that some external contributors opened up here for including BIP-340 signature or taproot signatures support. That's been open for a while, but there was some work on the... The cool thing is just the community work on this. We didn't have to do much, but they fixed some issues, and it's now in a good shape.

[00:29:22.08] 

I reviewed it, and I made some cleanups there just to be less invasive on the frost core crate. And there's something that's some small adjustments to be made there, but should get merged soon and should make the next release. And this is useful for Zcash because the signatures will be used for ZSA issuance. If that hasn't been changed, I think not. And this is a use case where it makes a lot of sense to use for us to protect issuance of ZSA so that's cool.

[00:30:04.46]

Regarding the demo and the server, I'm going to go back. I mentioned last time that we finished the encryption certification. So now we just need a bunch of cleanups and stuff to make the server production ready. So we're probably to start to resume working on that soon. 

[00:30:37.44] - **Str4d**

The BIP 340 piece. Do you think there's anything So I'm thinking from the PCZT's perspective. Anything specific to that versus sapling and orchard that you think will be relevant in the PCZT format in terms of if you were doing a transparent signing round for the round 2? Just in terms of what kinds of fields would need to be incorporated into the PCZT for conveying in either direction.

[00:31:19.55] - **Conrado**

Yeah, that's a good point. I need to recall what is the format for issuance, but I think it I don't have... I can't think of anything in particular that needs to be there because it's just a signature, right? It doesn't even have the randomization stuff. So yeah, right now I can't think of anything But it's a good idea. I want to double check.

[00:31:48.27] - **Str4d**

Yeah, because I want to make sure that the PCZT works for transparent frost-based Multisig in addition to shielded frost-based multisig. For shielded, it's It's just frost Multisig. But obviously transparent, the normal way for Multisig there is the Bitcoin style Multisig, but good for the frost style to also work there. I think the important stuff, though, is I think that might be the newer schnorr stuff, though.

[00:32:18.47] 

So the answer there might be we can't support it right now because we don't support Schnorr Signatures for transparent. We only support the older ECDSA. So it might just be that we... If there's something we can have in the format that makes it potentially useful in those contexts, then it'd be good to know. Otherwise, we can just focus on shielded.

[00:32:45.42] - **Conrado**

Yeah. I'm going to double check for Frost, the main thing that from the user's point of view, they need to extract all the information from the PCZT to know what they're signing, right?

[00:32:59.29] - **Str4d**

Which is the same as a regular hardware signer as well.

[00:33:02.48] - **Conrado**

Yeah. So for the specific case of issues, I need to look into how it's specified to know what exactly it needs to be conveyed to the user.

[00:33:15.19] - **Str4d**

Cool. Thanks.

____

### 3. Research & Implementation Updates iii) Network Sustainability Mechanism / Emmision & Fees 

[00:33:31.57] - **Jason**

Hey, everybody. We have a few updates since our discussion on the Network Sustainability Mechanism two weeks ago. First, I posted to the forum an update and an FAQ on the with them and have been soliciting feedback from the community and answering questions. Second, Nate and I met with Daira Emma to discuss concerns about exceeding NU7's complexity budget, also concerns about not having demonstrated consensus for ZIP 235, which is the one that smooths out the emissions curve so that burns can be recycled into future block rewards.

[00:34:09.48]

We understand and we appreciate those concerns. But given these issues, we'd like to suggest an alternative proposal. First, in response to my forum post, Conrado had mentioned, and speaking for himself, not for the Zcash Foundation, That ZIP 233, which introduces the voluntary burning mechanism, seems like a good change and requires changing the transaction format, which will already happen with ZSAs and would be a change to It would be a pain to have to change it later. So theoretically, we're open to ZIP 233 being implemented by itself as part of NU7. This is a non-controversial change, and the worst thing that could happen is it doesn't get used.

[00:35:01.37] 

Second, instead of implementing ZIP 235 into the protocol, and that's the one that burned 60% of the transaction fees, could we, at some point in the future, as a precursor to a consensus level change, update the node software to default or to have an opt-in configuration that burns 60% of transaction fees.

[00:35:25.51]

They're so small, miners wouldn't notice. If they somehow increased, we could remove the configuration from nodes or change it. But one good thing about doing it this way is it allows us to test out the feature before implementing it into the protocol. What this would accomplish is that, one, the voluntary burning mechanism, which again is non-controversial, would get implemented into NU7.

[00:35:52.04] 

We could test out burning 60% of the transaction fees without making a consensus level change. Then we'd hold off on implementing ZIP 234 to smooth out the issuance curve, and that would allow more time to discuss this change with the community, determine if there's consensus, and assuming that there is, it could be included in a future network upgrade sometime afterwards.

[00:36:19.20] - **Daira Emma**

I mean, from a technical point of view, those are definite possibilities. Let's see. So for ZIP235, If there is any... Yeah, I guess not putting that in the consensus protocol is a simplification. So there are two options. If it's not in the consensus protocol, either make it a standard rule or, as you said, just have wallets do it voluntarily. It depends what the community thinks about those.

[00:37:13.25] - **Kris**

Well, it would be having miners do it voluntarily, not wallets.

[00:37:18.51] - **Str4d**

You could in theory do it either way, but for this particular rule, it would have to be miners. You could emulate the rule by having wallets to do it ahead of time. However, the ahead of time piece will interact with the miner enforced ZIP 317.

[00:37:40.55] - **Daira Emma**

Oh, that's right. Yeah. Okay. So ignore that option. Yeah, it would be miners who are doing it voluntarily. In which case, there's no distinction between standard rule and voluntary compliance.

[00:37:58.43] - **Kris**

What you would do in wallets, if you wanted to do this, would just be have wallets by default set. You would have a wallet option to, say, donate with every transaction to the sustainability reserve or whatever it is.

[00:38:18.53] - **Str4d**

That would amount to a effective fee increase. Another way of doing that would be to essentially implement ZIP 235 at the Yeah, at the miner layer of being like the ZIP 317 enforcement is over both aspects of that. So the fees are just the fee is still ZIP 317, but where the fees go to is configurable. You have it so that you could alter the way that ZIP 317 fees are enforced to account for the portion that gets burned. 

[00:39:04.50] 

Yeah, but that could be done rather than it being a consensus rule, that could be done as nodes deployed to if you choose to burn it, then the fee is allowed to be small while still satisfying the ZIP 317 rules.

[00:39:20.21] - **Daira Emma**

Yeah. I mean, from the point of view of the motivation of ZIP 317 to to defeat the sandblasting attack, that works fine because burning the fee is just as good as giving it to the miner from that point of view.

[00:39:41.08] - **Str4d**

Yeah. It's- It's- It's just the no change enables wallets to test the fee locally by splitting it in that way without requiring the miners to do so themselves, but also without requiring the whole network to enforce it.

[00:39:59.55] - **Zooko**

Tell me if I've got this right. Once the fee burning becomes a consensus-required rule, then miners can no longer bypass the anti spam mechanism, of ZIP 317. Is that correct?

[00:40:26.29] - **Daira Emma**

Let me think about that. So I'm not sure that's a well-posed question because it's not miners that are... So, yeah, currently you are depending on miners to enforce that mechanism.

[00:40:48.50] - **Str4d**

ZIP 235 as a consensus rule wouldn't, I think, alter the anti-spam stuff at all because it's working. It would be required carrying a percentage of the fees to go to this burning mechanism, but it doesn't on its own enforce what the absolute magnitude of that fee is.

[00:41:10.45] - **Daira Emma**

So the ZIP 317 enforces the absolute magnitude.

[00:41:15.24] - **Str4d**

Yeah, the ZIP 317 stuff is also not currently enforced by consensus. Someone who is sufficiently motivated to spam the network and is either running a miner or collaborating with a miner is currently able to bypass ZIP 317. It's just essentially impractical to do so because you would have to incentivize them beyond what ZIP 317 already costs you.

[00:41:58.17] - **Kris**

So With the ZIP 317 fees, miners can... There are legitimate use cases for miners, for example, for their own payouts to bypass the ZIP 317 fees. 

[00:42:18.54] - **Zooko**

So is it fair to say that currently the anti-sandblasting feature of ZIP 317 is enforced by the miners? So a miner could sandblast the network for no economic cost to itself currently.

[00:42:36.59] - **Kris**

That's correct.

[00:42:38.58] - **Daira Emma**

Yes, but it's extremely expensive to do that. So a miner can only do it for blocks that they would gain anyway. We're inherently trusting the miner not to, for example, produce empty blocks or completely useless blocks.

[00:43:04.29] - **Str4d**

And also, you should, to clarify there, it wouldn't be at no cost to themselves because in their own blocks, any transactions they introduce that are sandblasting would therefore be at the expense of transactions that could give them fees. Right now, with fees being low, it's a negligible potentially cost to them, but it is not a non-zero cost because any sandblasting transactions they introduce displace fee bank.

[00:43:31.38] - **Daira Emma**

Yeah, and this is also the reason to... And this is relevant in respect of ZIP 235. You don't want the fee to be too low because it gives the, in that case, minus have zero incentive to include transactions. I mean, apart from reputation, which isn't a very weak mechanism.

[00:44:08.08] - **Str4d**

Yeah, Jason, I had a question for ZIP 234, which I think I've raised previously, but I don't know if we've been on the same page previously about what my question was. So for ZIP 234, the smoothing, has there been any consideration or discussion about enabling the NSM to go out without smoothing, instead being a modification to the current halving-based mechanism?

[00:44:45.42] - **Jason**

There hasn't. And because we don't seem to think that there's a way to do that in a way that makes sense. In a way, what I'm proposing today achieves that, right?

[00:45:02.07] - **Str4d**

Yeah. Essentially, the thing I was trying to figure out is what does the... Because obviously the smoothing aspect is quite simple to describe, but the effect on the network stacks, the implementations, the mining pools and everything. There's a lot of depth that it touches. And in my head, the thing I was trying to square was, is there a smaller change that still requires the full nodes to make changes?

[00:45:29.29] 

Because no matter what you're doing there, if you're changing the way that blocks up your words, you're doing emissions, you have changes in the full nodes, but potentially requires fewer or more targeted changes in the rest of the stack. And that I don't have a good sense of right now.

[00:45:46.14] - **Daira Emma**

I mean, you could make the issuance curve look more like it does at the moment with the steps and still issue the NSM. I mean, if you really want a proposal of how to do that, I can work it out.

[00:46:10.10] - **Str4d**

The main thing, the thing I had in my head was, well, the way the current halving curve is described, it's really a percentage of the... You can look at it as an absolute amount that is block, subsidy issued each block or a percentage of the remaining subsidy that is unissued. And if the remaining subsidy that's unissued is the thing that's now variable, you could still interpret the existing curve as issuing a fixed percentage of that on the current halving schedule.

[00:46:44.17] 

So the effect would be that it would look like the current discrete halving curve, but instead of being a straight line across, it would be a slightly fluctuating line. But otherwise it would be very close to the existing halving, and in particular the halving times themselves be unaltered. So that was the thing that I was trying to think of a way that we could find something in the middle that might work. But the proposal to just defer that and take more time to figure this out would also be a decent way to get around this.

[00:47:20.35] - **Jason**

Yeah. And to answer your question, we are definitely open to other alternatives if they make sense and they work.

[00:47:30.08] - **Zooko**

When Str4d was saying that for the first...I've previously tried to think of other alternatives several times, and I couldn't figure out one that could actually work. If somebody burns some ZEC at a certain point, then future issuance at some point in the future after that is going to have to be a different amount if it's still going to end up at 21 million eventually. Other than the exponential smoothing curve that Nate originally proposed, I haven't been able to think of one until just now when Str4d was saying you still have halvings.

[00:48:12.17] 

I still am not 100% sure what you meant, Str4d, but are you saying it still halves every four years and it's still a constant rate of emission for the period of four years? But at the beginning of the four years, you set the rate for the coming four years, and then at the end of four years, depending on...

[00:48:31.24] - **Str4d**

It's even simpler than that. If you think of the way that we do the block, subsidy, check, and consensus, we currently do it as we know based on what halving interval we're in and the max and the max supply that will be issued, we can work out what percentage of it remains. And in this halving, what percentage of that remains gets issued in this halving interval, and therefore what percentage of that gets issued right now.

[00:49:00.18] 

Right now, all of that can be computed as an absolute value because the amount that remains unissued is well defined because issuance only goes out. There's nothing going back in. And the thought there was, you just change that one place so that when you're calculating the block subsidy for a given block, you know the amount of issuance prior to that block and you apply all the same percentage calculations, but to that number rather than what the pure issuance curve would tell you should be the amount that's there, which is how we currently do it.

[00:49:42.07] - **Zooko**

Okay, we should probably take it offline. I think that's the exact same thing that the Eiger folks already implemented for ZIP 235. So if there's a difference between what you just said and what they already implemented.

[00:49:53.56] - **Str4d**

This preserves the existence of halvings. The exponential Which one does not. And so I should finish up this with that. If we're happy to defer this and take more time in the deployment things, then we may not need this intermediate state. My main concern is around the complexity of doing that significant a change to the way that emissions occurs. And I expect there's going to be quite a lag in terms of getting a change like that deployed to the full ecosystem. And if we can make that change smaller than we can potentially do it earlier, but if we're willing to take the time to do the full deployment, then we may not need the intermediate state.

[00:50:41.23] - **Daira Emma**

I don't know why, because it's a relatively simple computation, but people seem to get the issuance wrong anyway.

[00:50:50.58] - **Str4d**

Oh, yeah, even with the current stuff.

[00:50:54.32] - **Daira Emma**

So maybe it's actually not that much of an extra lift to get them to do it right in the new way rather than do it right in the existing way.

[00:51:04.59] - **Zooko**

Well, if you can, Str4d, I'd really appreciate understanding your alternative proposal. Because I've tried previously to understand different or to think of different alternatives. And just now, I still don't really understand the one you're proposing right now. Do you want to write it down?

[00:51:22.47] - **Daira Emma**

Yeah, I think I understand it. And maybe, Str4d and I, if we have time before the deadline.

[00:51:28.54] - **Str4d**

If we're doing the pairing at some point, we can write down what that looks like. 

[00:51:45.25] - **Daira Emma**

I had another thing that I had my hand up for, which was that... So you know I said that part of the reason that you need some of the fees to go to the miner is to incentivize them to include transactions. So the rule we were talking about before where you use essentially burn amount plus fee for the ZIP 317 requirement, that is self-correcting there because if wallets or users aren't getting their transactions through if they just increase the proportion that goes to the miner. I think that rule wouldn't really present a problem from that perspective. As long as they were permitted to send enough to the miner to incentivise it for the work that they're doing and including transactions.


____

### 3. Research & Implementation Updates iv) Crosslink First Deployment

[00:53:23.51] - **Daira Emma**

So I have been writing up the security proof for the low latency simpler version of Crosslink. The proof is all working. And I hope to have a PR for that maybe by early next week.

[00:53:58.56] - **Zooko**

Awesome.

[00:54:04.17]

For Shielded Labs, I've been focusing on the scoping for our first deployment of Crosslink. Previous Arborist call, I issued a call for feedback, and I got a ton of really high quality feedback, both big and small. My overall big picture is it seems like we have rough consensus, like most people want most of the things. So between now and the next Arborist on the 14th, I'm going to integrate everyone's feedback and circle back with them all and see if the resulting scope is acceptable to them.

[00:54:54.00] - **Pacu**

Thanks, Zooko. Any questions, thoughts on this topic? All right, we'll jump... Oh, Alfredo.

[00:55:05.52] - **Alfredo**

Yes, so Daira Emma, when did you say you were going to push a PR or can a PR to what repo?

[00:55:15.23] - **Daira Emma**

Oh, that would be to TFL Book. Okay. So it's https://electric-coin-company/tfl-book.

[00:55:25.28] - **Alfredo**

So another question I have more generic. I remember when we started discussion to move to proof of stake. Another reason was that it's more friendly with the environment. Why do we choose this hybrid solution that doesn't get rid of proof of work?

[00:55:44.30] - **Zooko**

That's a good question. Some other people have already asked that. By the way, speaking of GitHub, you can find the current scoping doc for Shielded Labs' first deployment of crosslink at the Shielded Labs GitHub hub under the repo called [crosslink-deployment](https://github.com/ShieldedLabs/crosslink-deployment). And so that's one of the things, Alfredo, that I'm currently integrating is both of those points you brought up. One is the better energy efficiency of proof of stake, and the other is why then keep using proof of work for anything?

[00:56:21.16] - **Alfredo**

Cool. Thanks.

[00:56:23.31] - **Daira Emma**

I can answer from my point of view. I am very keen on the energy efficiency properties of proof of stake. It's one of my main motivations for working on this. Why am I suggesting a hybrid approach? It's much safer. It's something that you can do without a substantial change to the overall architecture of how nodes and wallets interact with the blockchain, especially Crosslink 2, where basically the finalized prefix is it's just a the mix of the proof of work best chain.

[00:57:19.58] - **Daira Emma**

So that's a huge simplification. But I would be much more reluctant to to work on it if I didn't have a plan for how to get the environmental benefits as well. Basically, it's to switch to [PoSAT](https://arxiv.org/abs/2402.00922) instead of proof of work. So PoSAT is

[00:57:45.11] - **Alfredo**

The idea is to go over with proof of work and then use the finality layer with other consensus mechanisms in the future?

[00:57:58.13] - **Daira Emma**

Yeah. So PoSAT preserves the property that the next block producer is unpredictable. I personally think that's an important security property. I'll link the paper in the chat. But post that, although it requires ZK proofs, it's still a lot more energy-efficient than proof of Oh, actually, it requires a VRF and recursive proofs are one way of implementing a VRF.

[00:58:54.30] - **Nate**

So I just wanted to share the progress on making an implementation of Crosslink. Right now, we are working on hiring and clarifying the scope. And then the general planned is to start modifying Zebra to implement a prototype.

[00:59:26.05] 

And there's a few milestones we're interested in releasing on the way to basically getting up to a point where the existing Crosslink is under-specified or there's gaps for example, collecting which proof of stake protocol to use or how to implement the proof of stake bookkeeping logic and things of that nature.

[00:59:58.56] 

So once we approach that phase of the prototype, my current thinking is we will begin just strawman-ing a design and implementing it in a prototypical fashion. To make a complete system that appears to work but may not be secure. And then after that or concurrently with that, we can be improving the design to aim for something that is safe to deploy. Then once we reach that phase, we'll start writing up ZIPs and applying to get it into a network upgrade. That's the sequence I imagine.

[01:01:00.14] - **Zooko**

I just wanted to add, yes, and we at Shielded Labs, one of our motivations for retaining proof of work, there's a few, but one of them is that proof of work prevents an attacker from reusing spent resources in a way that proof of stake doesn't. And I don't yet know because I haven't read those papers that Daira just posted about that other thing.


___


### 4. Open Announcements i) NSM Twitter Spaces / Wallet Developers NU6 updates


[01:01:58.23] - **Jason**

Zooko, Nate, and I are hosting a Twitter Spaces event on Tuesday, which is November 5th at 18:00 UTC, and we're going to be discussing the network sustainability mechanism. Kris from ECC is going to attend, and we'd like for some other engineers to attend as well. So if any of you are interested, please say so or DM me to let me know. But it would be great to have somebody from the Zcash Foundation on the call as well, just so all orgs are represented.

[01:02:40.11] - **Pacu**

Yeah, just in case anyone, any wallet developer listening. Just friendly reminder. I've already sent messages to some of them. Also, tweeted about it. On the verge of NU6, remember to update to the latest ECC SDKs. If you're using those frameworks, if you're not, make sure you are ready to point to the right consensus branch ID on your wallet for NU6. Be up to date with the librustzcash crates if you have those dependencies.

[01:03:24.39]

And if any doubts, please reach out in the R&D Discord, everyone will be very happy to help you go through another awesome network upgrade.


___

### 5 Open Discussion - NU7 Draft ZIPs



[01:04:08.13] - **Str4d**

This may be... It's the previous section, this section. I just wanted to remind everyone that the current deadline for NU7 ZIP Draft submissions is early next week. I think it's the 5th. To clarify, anyone who is considering, who would like ZIPs to be considered for inclusion in NU7. Obviously, we have to then figure out what combination of ZIPs is feasible to deploy.

[01:04:54.43]

But the ZIP drafts need to be semantically stable by then. Now, semantically stable meaning that any subsequent changes to the ZIP will only be editorial or filling out things that are already clear specification. There's no new specification work that would be going on after that point for those individual ZIPs.

[01:05:21.42]

There would still be, for clarity, in particular, the V6 transaction format, and the transaction digest, so the sig hash, those two pieces necessarily get specified and become dramatically stable after this deadline because their content depends on which zips end up going and getting included.

[01:05:44.45] 

But the zips themselves should, and as far as I'm aware, most of them already do this, say in what way, for example, the transaction format will need to change to accommodate this ZIP.

[01:05:58.33] 

If you've got any questions about that, just ping us in the ZIPs channel in the R&D Discord. We've been going through and reviewing the open PRs that are there just to get the existing open PRs in a state where we can get them merged and identify any remaining questions or issues around semantic stability that we can see. So the various authors are aware. And we're going to continue doing that this week.

[01:06:36.37] - **Daira Emma**

Yeah. So there are two zips that, well, one of them is submitted just by me and one by ECC. So the one that I've submitted is disallowing V4 transactions from NU7. So that would effectively disable Sprout.

[01:07:00.32] 

The motivation is... There's a pretty complete motivation section in Zet, arguing that it's important to reduce the complexity and attack surface of the protocol. And so we need to eventually deprecate Sprout. And the deprecation of Zcashd will in practice make it impractical to get funds out of the Sprout pool anyway. So any remaining holders of Sprout funds will need to do that before Zcashd deprecation.

[01:07:40.05] - **Str4d**

For instance, the Sprout to Sapling Migration Tool, it's in zcashd, it will simply stop working once the network upgrades that zcashd doesn't support, which is almost certainly going to be a NU7, once that network upgrade it activates because the way that it works of spending partial amounts generates change for which we won't be able to update the commitment tree because zcashd won't be able to follow the network anymore. Essentially, there is already a deadline on being able to easily get Sprout funds out of the Sprout pool, and that deadline is zcashd deprecation. Yeah.

[01:08:26.44] - **Daira Emma**

And so if we didn't disable the Sprout protocol, we would essentially have a protocol that is useless and is only adding attack surface and complexity, and that doesn't really make sense. If anyone has comments specificly on that before I go on to the next ZIP? Paco,

[01:09:05.55] 

So the other ZIP is explicit fees. I'm just making the fee field in V6 explicit. ZIP, which is a pretty uncontroversial change. I was relatively easy to specify. So, yeah, anyone who wants to review those two zips, the 927 and 919 on zcash/zips.

[01:09:42.53] - **Str4d**

I missed it. Daira Emma , did you also mention the memo zip that Str4d does-I mentioned it earlier during the ECC update section, but I can reiterate it here, which is that the memo bundles that has a bunch of additional changes there. It's still not quite semantically stable, and We'll be working to get it to that point before the deadline. But the short of that one, for anyone who doesn't recall from previous Arborist calls, is that instead of having a 512-byte memo per shielded output there will instead be a memo bundle.

[01:10:18.44] 

The proposal is to have a memo bundle in the transaction, and then each shielded output gets a memo key. The properties of this then mean that you can have variable size memos, in particular, all the way up to we're proposing a limit of 10 kilobyte memos rather than the current limit of 512 bytes. And then also you will be able to have the same memo bytes be decryptable by multiple outputs by giving them the same memo key.

[01:10:53.41] 

And as a interesting side effect of the current proposal, You would be able to have memos in otherwise purely transparent transactions. The downside being that you need to figure out how to get the memo key to the recipient because you obviously can't just put the memo key in the transparent output because it's transparent.

[01:11:13.44] 

But there are potentially use cases for having memo data in an otherwise transparent transaction for well-known memo decryption keys and things.

[01:11:31.43] - **Daira Emma**

I realized there was one other thing in the Sprout deprecation or V4 deprecation ZIP, which is different from what we'd previously proposed, which is that that ZIP doesn't propose to actually unissue the funds. So it removes the need to have any Sprout-specific code for consensus.

[01:12:05.52] 

But if we decided later on that we did want to retrieve those funds, it would still be possible. Now, it would be good to have feedback on that aspect because people may think it's fine to add that or preferable to add that to the the unissued funds for the Network Sustainability Mechanism. So there's an interaction between those two ZIPs. And if it's preferred, we can easily unissue the Sprout funds.

[01:12:43.11] - **Str4d**

But it's also not a blocker on the ZIP. And in the same way that the lockbox mechanism is accruing funds without a way to move them, and that ZIP 233 for NSM on its own would do the same thing, this would just be another case of any remaining funds in the Sprout pool would be frozen at that point, and a decision on what to do with them could be made later.

[01:13:10.56] - **Daira Emma**

So just to clarify the interaction, if you had all three, or actually, just 233, and 234 of the NSM ZIPs, then that is reissuing part the unissued funds, and then it would make a difference whether this other ZEC had unissued the Sprout funds or not. 

[01:13:47.20] - **Dan**

The next Arborist call is November 14th at 1500 UTC, and please be aware of the clock's changing. So thank you all for being here. This will get up on the ZF YouTube and Squirrel gets the notes out. Happy Halloween. Thank you all.

____



**Next Meeting Scheduled: 21:00 UTC November 14th 2024**


___
___



