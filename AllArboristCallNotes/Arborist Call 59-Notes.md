# Arborist Call #59 Notes

Meeting Date/Time: August 24th 2023, 15:00 UTC

Meeting Duration: 1 hour 15 minutes


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Update - [Lightwalletd Support](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#1-zebrad-status---lightwalletd-support)

+ ECC Core Update - [Mobile SDK's](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#1-zebrad-status---lightwalletd-support) 

+ Research & Implementation Update - [FROST audit / demo documentation & wallet integrations](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#3-research--implementation-updates-i-frost-audit--demo-documentation--wallet-integrations) / [Zcash Shielded Asset recap + next steps](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#3-research--implementation-updates-ii-zcash-shielded-asset-recap--next-steps) / [Proof of Stake Research / Security considerations](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#3-research--implementation-updates-iii-proof-of-stake-research--security-considerations) / [Zcash Sustainability Fund update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#4-research-and-implementation-updates-iv-zcash-sustainability-fund-update)
    
+ Open Discussion - [Zcash Wallet Community Developer updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#4-open-discussion-i-zcash-wallet-community-developer-updates) / [EIP-1559 Style Fees](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#4-open-discussion-ii-eip-1559-style-fees)  / [ZIP-317 Enforcement / Wallet outreach ](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#4-open-discussion-iii-zip-317-enforcement--wallet-outreach) / [Zcash Minor Grants program](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2059-Notes.md#4-open-discussion-iv-zcash-minor-grants-program)


Video of the meeting: [recorded]


Moderator: Decentralistdan

Notes: Jason Rogers


___



## Full Notes



___


### 1. Zebrad Status - Lightwalletd Support 

[00:18] - **Marek**

So in Zebra, we're finishing the new lightwalletd support. The changes will be in included in the upcoming release. We also have a new optimization in place, the note commitment trees are deduplicated and that saved us about 13% of space, that also means that the database will grow by 13% less. The size of the database was around 278gb recently, and now it's at 244gb.

[01:04] - **Daira**

What was the previous source of the duplication?

[01:08] - **Marek**

For each block height we were storing Sapling and Orchard tree, even if it was the same tree as the previous one and now we only store unique trees. That's all from me.

___

### 2. ECC Core Updates - Mobile SDK's 


[01:31] - **Zooko**

As you may have heard, now that Nick is gone from ECC, I'm personally taking over engineering management and product, and the products include the mobile SDKs, and that's what we've been primarily focused on. The current state is we've got a few bug fixes under testing, and I'm going to paste a link in here so anyone who's interested can look at the [DAG of dependencies](https://zcash.github.io/developers/zcash-wallet-dag.svg) that we look at. 

[02:22] - **Daira**

Directed Acyclic Graph for anyone who doesn't know.

[02:47] - **Zooko**

So anyway, if you look at that link, it's the Directed Acyclic Graph of all of the work that I know of in our GitHub's. If you're curious about the details, I guess you'll have to reach out to me after.

[03:15]

But there's a giant graph with all kinds of work, but a subset of that tree is what we're focused on, which is delivering the mobile SDK's. Also, Nate is not going to be here or he's going to be late, he asked me to report that he's working on a post about the feedback and conversations from Zcon4 about Proof-of-Stake. I think that's pretty much it. 

[04:12] 

There's a great question in the Q&A from Andrew Arnott.

[04:33] - **Kris**

So I think that right now we would characterize the Zcash client backend and Zcash client SQLite projects as the SDK's that can be used to target desktop platforms and in fact Strad has built a sort of "minimal for testing" CLI wallet atop Zcash client SQLite that we use internally, and the source is available, but it is not recommended for any sort of production use at this point because it's a testing thing. But it can give you an idea of how to go about using the Zcash client SQLite crate to support a desktop wallet.

[05:37] - **Daira**

I was going to say so the vast majority of the code is in Rust. There is some Swift and Kotlin code, but if you stick to the Rust code, then that definitely will work on desktop platforms.

[05:58] - **Zooko**

Kris, can you get the link to the [CLI tool](https://github.com/zcash-hackworls/zec-sqlite-cli)? While you're doing that, let me answer Andrew Arnott's question with the engineering manager and product owner perspective. The mobile SDK's for iOS and Android are what I think of as supported products.

[06:31] 

There's a 3rd category that's sort of coalescing into a supported product, which I'm calling Zcash Core Libs in my head, which is a bunch of different crates. But I don't know if the things you would need that Daira and Kris were just describing are going to be in that Zcash Core Libs thing. So basically, it may not be supported by us, we may not prioritize answering your questions or fixing the bugs in it. We might in the future.

[07:01] - **Daira**

Previously we've treated the internal interfaces in those crates as unstable. We can change them whenever we like, as long as we update everything. So that's one sense in which it is not a product, even though there are products relying on it.

[07:20] - **Zooko**

We're considering upgrading some of that code into supported, in which case you would get such nice things with that we wouldn't be changing the interfaces without warning you and stuff like that. But currently we're just focused on the mobile SDK's.

[07:35] - **Daira**

We wouldn't be warning you in advance. But the changelogs are pretty comprehensive, so if you follow the changelogs, then you can make all the changes that we're making.

[07:45] - **Zooko**

So were we not able to get the link? What was that chat saying? Yeah, Pacu has a really good point that the SDK's contain logic that you're actually going to need for a client, even if it's a desktop client. The Zcash hackworks link doesn't work.

[08:10] - **Daira**

Yeah, because it's still private.


___


### 3. Research & Implementation Updates i) FROST audit / demo documentation & wallet integrations

[09:06] - **Conrado**

So what's going on is that our FROST library was being audited by NCC. So the audit is complete. They only found medium and low severity issues. The medium issues were panics that in some case our code would panic. So we fixed that. We fixed all of the issues that the audit found.

[09:39] 

So just waiting for the PR's to be reviewed because a bunch of people are on conference or on leave. But we will probably get everything merged by the end of the month or by the beginning of September. So that's great. And I'm also documenting the demo that we presented Zcon. [There's a demo for using FROST](https://www.youtube.com/watch?v=xvzESdDtczo) with Zcash using the Ywallet.

[10:09] 

We need the documentation for people to be able to reproduce the demo. So that's almost done, it needs to be reviewed and merged. So yeah, people can use FROST right now with Zcash. There's a bunch of command line tools, but it's possible. You need to copy and paste message between participants, but it's possible. So we're still planning, figuring things out, what's going to happen next. We would like to collaborate with Wallet developers so that Wallets can support FROST.

[10:55]

There's a bunch of issues related to that which are related to how to make participants communicate with each other and stuff like that. I'm also writing a section on our documentation to explain these issues and how they could be solved, that would be probably our next steps. 


___


### 3. Research & Implementation Updates ii) Zcash Shielded Asset recap + next steps

[11:30] - **Vivek**

I think this is my first meeting, first Arborist call since Zcon so just wanted to say thanks for the organization and stuff. We had a lot of fun and I think we had some good discussions as well. Just to re-up, we had a [demo](https://www.youtube.com/watch?v=bRdNvepJVXM) there and it's available for everyone to [try out](https://github.com/QED-it/zcash/tree/zcon4-demo) if they want to.

[11:55] 

One of the discussions that we had at Zcon was about including an enable ZSA's flag in our implementation, that's sort of like a good way to be able to pause ZSA's if it's ever necessary to do so for any reason & also that will give us a way to not have ZSA's as an option to be monitored in coinbase transactions. So based on that discussion, we've added that into the Orchard implementation now and I think we've updated the circuit document that we had shared last month or so. ZIP's are not updated with that yet, but it's in the implementation now.

[12:43] - **Daira**

Is that a public input to the circuit as well so that it can enforce that all of the value bases are ZEC?

[12:55] - **Vivek**

Yeah, I believe that's the case.

[12:58] - **Daira**

Thanks.

[12:59] - **Vivek**

So it's sort of like linked to the is_native_asset flag, but not fully in the sense that IsNative asset remains private and so if enabled ZSA's is on then is_native_asset could be off. But the other way around doesn't happen. That if enable ZSA's as off, then is_native_asset is fixed to be true.

[13:24] - **Daira**

That's very much in the spirit of the enableSpends and enableOutputs we already have so that makes sense.

[13:34] - **Vivek**

On the implementation side, I think so far we've been making our changes on the V5 transaction structure in Orchard and so we've now started looking into moving the things into a separate V6 transaction structure so that we are not just messing with the V5 structure that's there. That's work that's in progress. We've also started benchmarking of the proof size and proof time and things like that for the circuit we have right now, and that's like a first step. See how much it's changed compared to the original circuit and then we'll be able to start on optimizations and so on.

[14:21] - **Vivek**
Yeah, I guess another change that we are looking at now is the move from Zcashd to Zebra. So we've been discussing in our calls with the Foundation and the engineers there, we are looking at what we need to do to make sure we have the support for ZSA's on Zebra as well. So far I think we've been using Zcashd for our testing and our demo and stuff is all using Zcashd and the command line interface. So we'll have to see how we move to Zebra.

[15:01]

On the ZIP side, I was on leave for a few weeks post the conference, so I've started getting back into answering the pending comments. There are still some comments pending that I haven't answered, so getting on with that and hopefully should have progress with that in the next few days and so on. On the asset swap side, We have some initial design ideas that we've put down and we are looking at proof aggregation as something that will be helpful to us for doing the asset swaps. So that's sort of where we are on that project. That's my update for now, thanks.

[15:55] - **Dan**

Thanks Vivek. Any questions? 

[16:06] - **Daira**

Yeah, about the enable ZSA's flag, I thought of a question which I now realize is not relevant, that we could maybe split that into enable non native spends and enable non native outputs. But then I realized that the non native assets have to balance in the shielded parts. Whereas that's not true for ZEC because you can shield and unshield. So it doesn't actually make sense to split the flag that way.


___


### 3. Research & Implementation Updates iii) Proof of Stake Research / Security considerations


[16:47] - **Nate**

I could give an update on Proof of Stake. At Zcon I gave a [presentation](https://www.youtube.com/watch?v=qhMzMYeEPMM) that was about the beginning of a design. There were a lot of good questions in that presentation, and people had brought my attention to a concern that the security provided by that design would be sort of the minimum of the two components, which seems like a drawback.

[17:45] 

Since then, I went back and just started reviewing the [ebb and flow paper](https://eprint.iacr.org/2020/1091.pdf) to understand that better. So I've just started doing that with Daira's help and there's a few issues. One is I'm not sure if the design I was proposing actually fits the ebb and flow paper. And then second, I haven't learned yet if it talks about this issue of the security. Basically the cost of attack being the minimum, the cost to attack either component. So I'm just reviewing that. That's the update there.

[18:24] 

I plan to do a short post for a general audience, sort of recapping discussions that came out of Zcon related to this update.

[18:36] - **Daira**

So I've not fully understood the ebb and flow paper, but my understanding is that the ~~security~~ finality of the finalised ledger in ebb & flow is only dependent on the BFT Byzantine consensus protocol rather than the longest chain protocol. Hang on. That might not be true, it's something we definitely have to analyse in much more depth.

[19:37] 

I also raised a question about compatibility of ebb and flow with scalability proposals. For example, the proposal that I made at Zcon 1 and Amsterdam ZK-proof is not compatible because of the transaction reordering that is done in ebb & flow, which is called sanitization in the paper. Maybe that can be fixed. It's just that we should think about scalability as we're designing the proof of stake.

[20:18] - **Nate**

In the chat, I noticed Jack Gavigan saying the concern only applies for hybrid proof of work and proof of stake question. And I'm not sure yet, because I think ebb and flow assumes, well, it's describing two sub-protocols that I think are just independent black boxes, but Ethereum is a real life example that uses proof of stake, and it's close to an ebb and flow design. But then the further confusing thing is both sub-protocols are relying on the same state, but maybe at different timescales or something. So I don't understand that very well. So I want to look more into that. I don't know the answer for that yet.

[21:12] - **Daira**

The [Ebb & Flow paper](https://eprint.iacr.org/2020/1091.pdf) doesn't make any commitment to what the consensus mechanism is in the BFT protocol and the longest chain protocol. So there are many different combinations and it seems likely that we will use proof of stake for the BFT and proof of work for the longest chain. But that's by no means decided, and this is one of the things that we need to analyse.




____

### 4. Research and Implementation Updates iv) Zcash Sustainability Fund update


[28:56] - **Tomek**

All right, so thank you and thank you Zooko for noticing my message. So, given this is my first Arborist call, I'll maybe briefly introduce myself. So I'm a Rust engineer. My name is Tomek, I'm from Poland and I work at Eiger and I've been working with Jason, Mark and Marius, who is also an engineer at Eiger on the sustainability fund.

[29:22] 

So what we are working on now is, we are preparing what looks like is going to be three ZIP's. So the [First one](https://github.com/zcash/zips/pull/703) was submitted last week and it was reviewed partly by Daira and Teor. We got some good feedback, so we're going to be working on addressing that.

[29:42]

We are currently working on another zip which will introduce the smoothing of the issuance curve. So the goal there is to replace the 4 year halving schema with a smooth issuance curve so that there are no halvings at the same time maintaining the same issuance rate. Meaning in any given four year period, approximately half of the allotted funds will be paid out as block rewards. So this is going to be our ZIP two. What we are discussing right now is probably a possible ZIP 3 from our end, which will provide another non-optional way of funding the ZSF.

[30:40] 

This might be something that Nathan suggested a while ago, which was redirecting part of the transaction fees towards the ZSF. Again, this is something we are still discussing internally. So we will be working on that, I guess, next week or a week after that. So we will keep you guys up to date on any possible developments there.

[31:12] - **Dan**

Great thank you Tomek, and thanks for joining us and jumping in. Any questions on that?

[31:23] - **Zooko**

Okay, I have a question. Are you going to just propose a full EIP-1559 style fee upgrade or less than that or what?

[31:35] - **Tomek**

That's a good question, actually we were discussing this today, but we haven't made our minds yet.

[31:42] - **Zooko**

Okay, that's a good answer.


____

### 4. Open Discussion i) Zcash Wallet Community Developer updates


[22:16] - **Pacu**

So this is almost the first month of my grant and lately I've been working on a couple of things. First, we worked with Nighthawk to review a lot of PR's that they are doing in their app on their branch of the codebase and also doing some heavy testing and shaking things up in the migration code. This means Nighthawk has a current version in the app that is based on the ECC reference wallet, which is another repo, a different kind of app & totally different underlying key management.  When they update to the new version, those keys will have to be migrated either automatically or manually with the user importing the seed again.

[23:33] 

So I helped a little bit test that hands on since that's mostly like a manual process where you have to build the old app in your device and then build a new one and you have to have an Apple developer thing to be able to test that. So I helped Matt and Adi with that, also a lot of other PR's and then regarding Zingo!, we're progressing on tools for creating these Darksidewalletd tests that will help test all wallets.

[24:11] 

I'm mostly doing a test that it's called Second Flush of Enthusiasm, which is the most typical situation when you onboard a friend. Then that friend forgets about Zcash and the app and all and time passes and then suddenly remembers it and wants to either receive Zcash or use it. In like a month or three months have passed and the wallet has to catch up and we want to be able to create such a dataset that you can actually measure what's that scenario and how the wallet behaves.

[24:50]

So that involves a lot of tooling and working with [regtest Zcashd](https://free2z.com/pacu/zpage/running-a-zcashd-regtest-node-with-docker) and I'm working on Docker compose, like not running Zcashd on my computer to have that reproducible and all and that's in progress and give or take almost ready because of a few bumps on the road, but we're on a good track and with leaving a lot of documentation and probably articles and tutorials on how to do stuff to do testing-tooling on Zcash. So that's pretty cool. Also yesterday we had an unfortunate incident with Zecwallet Mobile that we fortunately got feedback in Twitter.

[25:37] 

John helped me to respond among other Zcashers and we could, I don't know, raise awareness, the server was back up. I'll be probably writing some, I don't know what's the format, but some recommendations for wallets on how to deal with offline modes and stuff to have users secure and also how the sunset apps if for example, Zecwallet seems to be not so maintained. I know that the ECC has taken measures on the https://z.cash/wallets side to have that reflected there regarding the wallet listing and we should kind of write guidelines on how developers, if they want to sunset an app & maybe build another or just not build it, have practices to not leave the users hanging, for example. Kind of like what those users felt when they suddenly had their app not working and they couldn't get keys or anything else so, that's about these last two weeks have been from the previous update.

[26:57] - **Dan**

Thanks. Pacu. Do you want to mention the light client working group call?

[27:03] - **Pacu**

Yeah, we have the light client working group in 1.5hrs. As part of my grant i'll be kind of like doing the administration of it. There's no way of a management thing. It's just like helping out, getting the venue. I'm looking for better or more suitable schedules for everyone. We have people all over the world, so the current schedule might not be the best time for some people. So we're trying to be nice and inclusive with everyone and we will be doing as much as we can. As for the world, it's round, so hard to handle. Dan, you have been helping me a lot to get the zoom call for this time. Time stays the same until we announce it. If you have any suggestions or things that you would like to see change or new things that you want to see in the Light Client Working Group, please ping me and we'll work it out and see you, everyone that wants to attend in an hour and a half.

[28:26] - **Dan**

Great, thanks. Pacu, any other news or announcements? 


____

### 4. Open Discussion ii) EIP-1559 Style Fees


[31:50] - **Daira**

EIP-1559 if I understand correctly burns the fees or part of the fees. I guess the mechanism could be similar even though the destination of the funds is different.

[32:08] - **Nate**

I think EIP-1559 like is fairly complicated compared to just redirecting fees from the current system, from my understanding, because there's a couple of reasons. One is you need consensus about what the current fee rate is. Then the second piece is that Ethereum does a thing where in any given block there's a network wide fee rate. But whoever generates a transaction has to generate it before they know which block it goes into. So then I believe they get a refund depending on which block they get into, which we can't do very easily at all on Zcash UTXO's. I think it's complicated. It's different enough that it would take some amount of work to do right. 

[33:15] - **Daira**

Yeah and it's particularly more difficult to refund an anonymous sender. I guess you could provide an address, which would be a one-time-use address and that could work, but it seems a lot more complicated than is actually necessary for the goal.

[33:46] - **Zooko**

Okay, I can't resist adding one thought, and I'm not even sure if this is accurate, but if you're looking at fee thingies as part of your sustainability work, what I'm looking at almost all day long is the user interface for the Zashi wallet. So I have a user interface driven request for you as a protocol developer, which is it'd be a much better user experience if the user could know before entering the transaction details how much the fee would be.

[34:39] - **Daira**

Seems reasonable.

[34:43] - **Zooko**

Please write it down. It's actually really important for users.

[34:52] - **Nate**

Before they specify how much they want to transfer?

[34:55] - **Zooko**

I didn't say it was possible. I just said it would be great.

[35:00] - **Daira**

Before they confirm the transaction because that's the user interface.

[35:06] - **Zooko**

I said before they enter the transaction details. It would be awesome if they knew how much the fee would be. Write that down.

[35:16] - **Daira**

It's incompatible with ZIP-317.

[35:20] - **Zooko**

Okay, but please write it down as a consequential user experience difference for your potential future consensus protocols, is how early the user can know exactly what the fee will be. No, an estimate is not very good. It's much worse in user experience terms.

[35:41] - **Daira**

In scalability proposals you can potentially make transactions constant-cost in terms of network resources, regardless of how many inputs or outputs they spend, using recursive proofs. So in that case, you could use a constant fee. But I think we've learned from the Sandblasting attack/situation that constant fees are problematic in Zcash-like networks as they stand. Can I just refine that statement? Because it's not constant fees that matter, it's fees that don't depend on the cost of the particular transaction. So just having a variable network wide fee that is the same for all transactions, that is still problematic for denial-of-service. Carry on.

[37:09] - **Pacu**

I guess it depends on what the fee change, like the fee being cheaper or more expensive is to the user. What does it mean to the user in terms of their experience or their expectation? If I know nothing about fees and protocols and I say, "if I put a higher fee, what's my premium?" What I will be paying for in terms of classic fee on Bitcoin or on proof-of-work ethereum, it was like the more fee you put, the faster the transaction was.

[37:53] 

So I guess if you had an oracle that could have that information, for example, and that's the goal of the fees on Zcash, then you do not necessarily need to know beforehand but you can have estimates you can decide upon, which is like the current experience of wallets. We have a difference, which is like we have a minimum fee for a set of outputs or like a minimum fee for an estimator or average transaction shape. Then if your transaction has another shape, then you have different fees and then let's say that your base fee for a given transaction is a number. Then if you add a premium, what does the premium mean? What does it give you?

[38:47] 

I think that's the way to think about fees in terms of the user experience. Like they don't care about anything of the details that we write and we are interested in. They care about like "I pay this much and if I can pay the minimum, if I pay more, what does it give me?" I think that's the important way of thinking of it.

[39:09] - **Daira**

So if the fee is small enough, then I think it's less important to be able to accurately predict the fee in advance because then the user can say, for example, I'm fine accepting any fee that is worth less than five US cents or denominated in ZEC if they prefer, and the current minimum fee is about at the current price equivalent to a quarter of a US cent. So these are not large fees, even though we had to increase them to address sandblasting.

[39:47] - **Nate**

Two things, plus one to what Daira just said. Maybe a good UX is pick a threshold that is quite likely for most users, for most transactions, to be above the fee and then just display fee less than equal to one cent. It would be good to do user testing, but my intuition is, maybe that's good enough because it just simplifies things for users.

[40:20] 

For me personally, if it's less than one cent, I don't care what it actually is, just that it's less than one cent. I don't need like 4 digits of precision. The other thing was to push back against something I think Daira said a while ago, which is if fees are the same for everyone, that's bad for sandblasting. That is not supposed to be true for something like EIP-1559 because if there is sandblasting the fees are the same for everyone, but the fees are also escalating exponentially. So the user experience there would be like: you open your wallet and you say you want to pay something and it says "Whoa. normally it's always less than 1%, but right now it's 20 cents" and the user is like, okay what do I do?

[41:15] 

I either submit or we need some way to let the user know. If you wait a bit, it should go back down so you can try again later. I don't know how appealing that user experience is, but then if they choose to wait, it will go back down eventually.

[41:34] - **Daira**

I mean, maybe for $0.20 this isn't so important, but if it can go higher than that, and it has done on Ethereum and Bitcoin in the past, then that is by itself a denial-of-service attack. If the adversary can cause fees to escalate.

[41:54] - **Zooko**

Isn't this the way it currently works on Ethereum?

[41:57] - **Nate**

Yeah, EIP-1559 is exponential, so if an adversary has 1x ZEC they can raise the fees past the threshold for an hour. If they have 4x ZEC, they can do 2 hours, they have 9x ZEC, they can do 3 hours or whatever.

[42:19] 

It's exponential, so they can disrupt it for a given amount of time and then they've exhausted their funds. So to me that seems pretty strong. The only uncertainty is like, how long is that going to be? And then there's the other piece, which is if there's actually enough organic demand constantly so that the fees become high, like in Ethereum, then what would we do? I think we want better scalability.

[42:55] - **Daira**

Agreed. I still think any 1559-like proposal needs a whole lot of security analysis.

[43:07] - **Kris**

I mean, on the plus side, Ethereum having paved the way there and successfully using that algorithm on their network does give us some confidence that it can be secure.

[43:23] - **Zooko**

As a historical detail, Vitalik originally proposed EIP-1559 as a ZIP for Zcash and Daira, among others, had a lot of scepticism and wanted to make sure it had really thorough security analysis. So we're using Ethereum as our testnet.

[43:41] - **Daira**

Excellent idea.

[43:43] - **Nate**

Another detail is that Filecoin technically deployed to mainnet first with that kind of fee mechanism before Ethereum adopted it.

[43:51] - **Zooko**

I've forgotten about that. We've got two testnets, Filecoin and Ethereum.


____

### 4. Open Discussion iii) ZIP-317 Enforcement / Wallet outreach 


[44:01] - **Nate**

Well, I have few items for open discussion, and I realised both of them do relate to fees and user experience but their tangential. So the first one is for ZIP-317, we need two pieces to work out well in order for the experience to be good for users.

[44:41] 

So one is we're ratcheting up the enforcement and transitioning the whole network to use those kinds of fees. The other piece is the wallets have to do that. So there's sort of a give and take. If every wallet upgraded first and then we could just turn on the protocol enforcement and then there'd be no disruption to users but presumably some wallets won't, or they'll be slow, so we can sort of ratchet things up.

[45:10] 

I would be concerned, though, if we're not reaching out to enough wallets and helping them realize what's going on and what they need to do and plan and schedule around that while we're turning up the mechanisms. So I heard a report, I don't know for sure if it's related to ZIP-317, but a Trezor user created a transaction that wasn't confirming and its fee was too low. And then I think they just retried later and it worked.

[45:43] - **Kris**

A piece of information here is that the characteristic of the transactions on the network has changed in the last couple of weeks. Almost all of these transactions now are spending a Sapling note to create 48 transparent outputs, all with dust values. The goal I think being to consume the unpaid action limit.

[46:21] 

Essentially, the attempt is to saturate the mempool with transactions that consume the unpaid action limit and prevent other transactions from getting in. So it was a predictable response, I guess, to ZIP-317 being enacted and really, the solution is for wallets to adopt ZIP-317.

[46:46] - **Daira**

Agreed.

[46:47] - **Nate**

Right, getting to my point, ECC often historically has done some of that kind of outreach, but I've never felt too certain about how comprehensive that outreach is. Like, are we reaching all of the wallets or do we even know? I think there's a fair number of wallets that support transparent Zcash that may have a significant number of users that I might not even be aware of. You mentioned the name. I'd be like, I've heard of that

[47:19] - **Zooko**

Coinomi.

[47:21] 

Yeah, so i'm hoping as an ecosystem or community we can sort of circle the wagons and do better outreach and see if we can be more comprehensive and let these wallets know about ZIP-317 and what's happening. But I just wanted to bring that up and see if there's ways we could as a group track who we've done outreach to or things of that nature. We should definitely be doing outreach to anyone listed on Z.Cash at the least, in my opinion. So how could we organize that? It seems a little bit distinct from the Lightwallet Working Group because those are sort of like developers focused on Zcash, whereas I'm more concerned about the long tail of multicoin wallet that happen to support Zcash, but maybe they're not paying close attention.

[48:22] 

That's a great question. It's something that ECC has previously done and we're not going to do going forward.

[48:31] - **Nate**

Right. So we want to be able to transfer that, and I don't know how to fulfill it within the community. I almost feel like there could be community ecosystem outreach roles, or people at ZF could help, or people like, maybe Pacu it could be part of your role. I don't know, just brainstorming different ideas. I'm hoping we can come up with something, especially now because the 317 timeline is advancing.

[49:07] - **Pacu**

Yeah, I think there's already a partnership role that Beth was filling in. I don't know if that was under ZCG or the Foundation then I guess that a trusted actor is really important in this case. So being totally distributed could be a source of attack vector for impersonators to make partners or wallets or other types of Zcash users to believe that there are certain instructions they need to follow. So I guess that someone that has legitimacy is really important. That could be my role or the Foundations or someone in specific that it's created for. But I think it's important to be something that someone that is public and verifiable and that there's like, one group to not put it in, a person to avoid the hit by a bus attack. But that's something that we should come up with.

[50:26] - **Dan**

Yeah, I'd be happy to help be a part of that absolutely and Beth's new role is definitely through ZCG and then Pacu if this isn't out of scope for what you have going on, maybe the three of us can chat about this a bit more and see what we can put together.

[50:43] - **Pacu**

I think that my role has kind of a leeway. My milestones are suggestions on what I've gathered from different wallet teams. So there's definitely room to do that, provided that also the community is okay with it and the ZCG is okay with it. So that can be worked out.

[51:09] - **Jack Gavigan**

I think there should also be an expectation that wallet developers and other developers who are likely to be impacted by protocol changes, including soft protocol changes like 317 should be either attending these calls or at least watching them or reading the minutes and paying attention because you can do all the outreach you want but I think there is a responsibility on people to be proactive about making sure that they're keeping their product current with regards to the Zcash protocol.

[52:06] - **Nate**

On that front, I do feel like I think there can be a balance between how much effort we, the core development community does versus the long tail of wallets. I wouldn't expect Coinomi to watch recordings of these videos, but hopefully they would pay attention to the right venue. So I'm assuming maybe they look at like, Zcashd release announcements, but that's not the right thing here. So it's almost like maybe there could be a resource page on [z.cash](https://z.cash) thats like 'Wallet implementors announcements' or something like that. I'm not sure. I'm just trying to figure out what's the most likely way to get their attention for the least amount of effort, like the highest leverage. 

[53:17] - **Pacu**

Yeah, I think that the personal outreach it's important but it's just like one instance of it. The moment you have made the outreach and you have been either ignored or acknowledged, then if you were acknowledged, then there's this follow up where the people you've contacted that is probably a public contact of the entity you did the outreach for will forward the information to the implementing team.

[53:55] 

I think that there's a lot that we as development community need to work on to make the documentation suitable and easy and accessible to teams that are not 100% focused on Zcash and have other duties. So that when we do the outreach or we do communications, then the people that follow up to implement have i wouldn't say 100% will be ideal, but maybe 60, 70, 80% of the details documented clearly somewhere, and then they can follow up on the different venues we have for other questions.

[54:46] 

That can be like GitHub issues or it can be like R&D discord or this call or whatever other calls. But I think that just the outreach won't cut it. I could or anyone could go and have all the meetings and then when the people that have met you need to follow up, if they don't have the information somewhere online and it's good and easy to comprehend for people without a lot of context, then it won't do much, people will say we don't know how to do it or we can't prioritize it.

[55:27] - **Nate**

I had a 1 on 1 conversation with Paul Puey of Edge Wallet at Zcon4 that was engaging and fun and he had particular opinions about what Zcash should be prioritizing and he basically was asking, "is there a different way lightwallet service providers can do the detection of which transactions are destined to which wallet?" So that when wallets open, they just immediately, they make like one request response, they know what their transactions are. And I said, yeah, there's a thing like that we've discussed in Zcash called detection keys, but we were trying to figure out how to do that and every approach that we could come up with requires the service provider to pay a cost per user per transaction. So it didn't seem scalable. He said, well, that doesn't matter, that's totally worth it. We do something like that for Monero.

[57:07] 

We were the first wallet to use, like the proprietary service that does this for us, and we pay per user per month, and it's expensive and it's totally worth it. So I wanted to bring it up here because I think there's a lesson and also maybe we should be revisiting. So the lesson is, in my memory of those discussions, it was just engineers or protocol designers assuming, that's not going to work or it's not going to be scalable, but we didn't check with real live product developers.

[57:52]

So that's one lesson. If we were going to prioritize that, which Paul thinks we should, he thinks it's important, it would be kind of an alternative to a lot of the scanning work that we've been doing. From what I gather, Monero has both, it has wallets that can take each approach. Paul asserts that a huge proportion of users just do the scan instant sync thing, even though there's privacy tradeoffs. So I just wanted to bring it up with this community as like, should we consider this as an alternative or priority and share that.

[58:49] - **Daira**

It kind of depends whether we can fix the scanning performance problems without doing that. Carry on, dodger.

[59:02] - **Jack Gavigan**

I'm very much in favor of us looking at detection keys at the Foundation Deirdre looked a bit at [oblivious message retrieval](https://zfnd.org/oblivious-message-retrieval/) as a potential solution to this whole kind of performance issue. Could we shift the burden of scanning to a service provider setting aside the question of cost, because if something is valuable enough then people will figure out how to pay for it.

[59:49] 

But it didn't seem to present an immediate solution so I think we should definitely be looking at detection keys. At the end of the day, it will be an entirely optional thing that wallet providers won't be forced to support them. They can support them if they want to if they think it'll give them a competitive edge in the market. It sounds like Paul believes that it does give edge a competitive edge. That was a totally inadvertent pun. It's something I think we should definitely I suggest that we schedule in for a full discussion during an upcoming Arborist call.

[01:00:42] - **Zooko**

I just wanted to add precision to something Nate said. Paul Puey told me the same things in a separate conversation at Zcon4. Paul Puey said that Monero wallets can use this feature that allows them to skip scanning or they can do scanning, and that approximately all monero users use the skip scanning feature. But I wanted to clarify that detection keys as we think of them and as we would implement them, are way better on privacy than that monero feature.

[01:01:36]

As I understand it, that monero feature is that you give some random server a viewkey so they can see all of your private stuff. And most monero users do that so that they don't have to scan. But detection keys would be great in terms of privacy in addition to in terms of other kinds of user experience.

[01:02:00] - **Nate**

I had heard that in the past. But I thought in this discussion, Paul said that used to be common, but now there's a new way to do content encryption. So it sounded to me similar to what we think of as detection keys but either way the point stands.

[01:02:22] 

The second thing is he shared some info and I asked if it's okay to share it publicly and I'm pretty sure he said yes. So a few things. One is they pay about 5 to 10c user per month. 5 cents per user/month to an API provider to do this. And 2, their revenue mainly comes from integrating into exchanges or exchange protocols. So it sounds like it's worth it for Edge because  it sounded like providing good support for monero, including this has led to adoption of edge by a lot of monero users and enough of them are using the exchange functionality that it makes it worthwhile to pay for the service.

[01:03:42] - **Daira**

Interesting.

[01:03:46] - **Dan**

Any other thoughts on this?

[01:03:51] - **Nate**

Wouldn't it be great if there was some kind of way of paying someone to do this like some kind of mechanism of payment like almost a currency of some kind that you could use to pay someone trustlessly and anonymously to do this sort of scanning for you I'm going to have to take that idea away and think about it. I have a couple of other topics I want to raise quickly once we're done with this.

[01:04:28]

That reminded me dodger of this area of design I'm keen to explore which is, Are there ways we can add fees into a transaction that get paid out to different kinds of service providers?

[01:04:55]

So this might have a bunch of different use cases, but one might be is there a way we can wallet providers to be paid by the users somehow? Or other use cases might be if we have Tor integration or other sort of network privacy infrastructure providers. Is there a way that users could pay for that as part of transaction fees? Just a general design area. I don't have more to say than that, other than i'm interested in it.

[01:05:30]

It's a design area I'm really keen to explore because it may be helpful for incentivizing and making sustainable other kinds of infrastructure like lightwalletd network privacy providers or things of that nature. 

[01:06:12] - **Jack Gavigan**

Yeah, I just wanted to remind everybody as and when ECC declares an end to Emergency Mode, we're going to look to schedule an NU5 retro. So I can ask that ECC folks keep us updated on that so we can plan for it at an appropriate time. I also want to ask, is there anything ZF can do to help with efforts to resolve the current network congestion?

[01:06:58] - **Kris**

Know wallet outreach like Pacu was discussing is probably the single most significant thing that can be done. And then the other piece is, as far as ZF specifically, I'm not sure as far as the overall community goes, testing the SDKs before their release is also really helpful.

[01:07:40] - **Jack Gavigan**

So then, at the risk of opening a window into the sausage factory, Dan can you take the lead from the ZF side in terms of reaching out to wallet providers and making sure that they're aware of ZIP-317 and what they should be doing to update their software? So I'll consider that part done, Kris.

[01:08:18] 

As always, the more passive thing, which is easy to say and then just gets left. But if there's anything more that we can do to help things move along quicker, please do let me know. 

[01:08:54] - **Nate**

I noticed the Q&A box, Andrew Arnott is asking for help with a PR on a ZIP repo.

[01:09:15] - **Jack Gavigan**

Andrew I suspect that the reason it has taken so long for that to get some attention is because it looks like it was submitted around the time of Zcon, when we were all in Barcelona and or on vacation. I know that a lot of people have taken vacation after Zcon or have taken time off in lieu for the time that they spent traveling to get there. So I would suggest that it's more a case of just bad, unfortunate timing rather than people not being interested in paying attention to it. And I do think that Daira has looked at it in the past couple of days.

[01:10:05] - **Andrew Arnott**

Yes, thank you. And that's totally cool. People are busy, this is my very first PR into that repo I just wanted to know if I was missing some process or maybe I shouldn't have had one PR with changes to 4 documents, because each document is owned by an individual type thing.

[01:10:23] - **Jack Gavigan**

I'll let the zip editors respond on the formats and what not, but I think it was just unfortunate timing and we definitely want to encourage more people to contribute in the way that you have done. So thank you


____

### 4. Open Discussion iv) Zcash Minor Grants program


[01:10:41] - **Dan**

So if we don't have anything else in the open discussion portion, we can jump forward. Yesterday we announced the 2nd round of the Zcash Foundation's Minor Grants program. The applications are now open for grants up to $25,000. The deadline is Monday September 18th, and you can find more information https://zfnd.org/minorgrants or in the [Minor grants thread on the Forum](https://forum.zcashcommunity.com/t/opening-applications-for-the-second-round-of-zf-minor-grants/45463) as well. if you have any questions, please feel free to ping me either on the forum or Twitter or email. 

[01:11:37]

Andrew was a minor grantee recipient earlier this year, and we just love to see a bunch of applications and more participation. So we look forward to seeing those come through. Okay, and I think that's it. Thank you, guys. The next call is September 7th at the 21:00 UTC time slot. 

[01:12:02]

Please go to the foundation website in the arborist call section to use the new links to register, and I'll share those around as well, on the forum and the discords and whatnot and Twitter. So thank you guys I appreciate it, and we'll see you next time.



_____


**Next Meeting Scheduled: 21:00 UTC September 7th 2023**


___
___

