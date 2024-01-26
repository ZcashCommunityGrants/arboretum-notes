# Arborist Call #69 Notes

Meeting Date/Time: January 25th 2024, 21:00 UTC

Meeting Duration: 1 hour 20 minutes 


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [Mobile SDKs / Revision one Unified Addresses](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#1-ecc-update---mobile-sdks--revision-one-unified-addresses)

+ Zebra Update - [Zebra 1.5.2](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#2-zebra-update---zebra-152)

+ Open Announcements - [Nate leaving ECC](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#open-announcements---nate-leaving-ecc)

+ Research & Implementation Update - [FROST updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#3-research--implementation-updates-i-frost-updates) / [Trailing Finality Layer - Overview](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#3-research--implementation-updates-ii-trailing-finality-layer---overview) / [Trailing Finality Layer - Goals & Requirements](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#3-research--implementation-updates-iii-trailing-finality-layer---goals--requirements) / [Trailing Finality Layer - Crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#3-research--implementation-updates-iv-trailing-finality-layer---crosslink)

+ Open Discussion - [TFL Q&A](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#4-open-discussion-i-tfl-qa) / [Possible BFT light clients](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2069-Notes.md#4-open-discussion-ii-possible-bft-light-clients)


## Decision & Action Items

i) Put out request to select the new HRP for revision 1 unified addresses. 

ii) Address improvements for ZIP-312


___


Video of the meeting: [recorded]

Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes



### 1. ECC Update - Mobile SDKs / Revision one Unified Addresses

[02:51] - **Str4d**
Hello. Our work in the last two weeks has been primarily focused on the mobile sdk's. We've had a variety of changes that we've been making to address these concrete performance issues in various places that were hampering the ability for the spend for sync logic to work its best.

[03:25] 

So we've been putting effort into identifying and fixing these various concrete issues. The other thing that we have done is we are gating off the orchard work that's still ongoing and incomplete in the rust crates so that we can publish versions of the crates to get the remainder of the non-orchard things, including the relevant changes for performance out into published versions of the crates.

[04:10] 

This will also include things like the change that was mentioned in a [previous Arborist call](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/b970bc473247e4e7791862bfae8c7e8075e1b6bb/AllArboristCallNotes/Arborist%20Call%2046-Notes.md#2-ecc-core-updates---541-changes--deprecated-features--two-stage-payment-api) for adding APIs that enable you to build transactions in a 2 step process of creating a proposal for a transaction from the lightclient wallet state and then turning that proposal into a final transaction. So we're expecting those crate publishes to happen imminently once we're done sort of corralling the rest of the code base into shape.

[04:45] 

Then there will probably be accompanying mobile SDK releases within the next few days to week kind of timeline. Other than that, I think that's primarily what we've been focused on the court. Kris, anything else that I've forgotten to mention? 

[05:15] - **Kris**

The only other thing, this has not been an ECC core team thing, but this has been a members of the ECC core team in unofficial capacity in the community. We've been working on the proposals for Binance exchange addresses, working on what are the possible ways of going about satisfying Binance's requests and in the process of that, updating unified addresses to define some new metadata items and to define a new range Unified Address Typecodes that are Item Typecodes that are designated as 'Must Understand'.

[06:14]

What this means is that wallets that encounter a unified address with one of these metadata items will either have to know what that item means and respect its directives, or else reject the entire UA as something that they can't support.

[06:35] 

So one of the upshots of this is that we want to create essentially a second edition of unified addresses that has a new human readable part in order to domain separate those unified addresses from those that were originally defined. The reason for that domain separation is that we don't want existing wallets to understand those unified addresses because they could potentially ignore the Must Understand metadata items.

[07:17] 

So this is something where we're going to be making a call out for community involvement. Which is select the new human readable prefix for revision one unified addresses. Anyway, we've been discussing that a little bit, we'll probably put out a wider call for participation in selecting that HRP. 


___

### 2. Zebra Update - Zebra 1.5.2


[08:03] - **Arya**

TSince the last Arborist call, we released [Zebra version 1.5.2](https://github.com/ZcashFoundation/zebra/releases/tag/v1.5.2). We couldn't publish crates depending on a git reference, so the internal miner feature was temporarily removed until the next equihash release.

[08:16]

It could be used by compiling [version 1.5.1](https://github.com/ZcashFoundation/zebra/tree/v1.5.1) from source in the meantime. We also updated the Zebra scan mvp results reader to work with the latest version of the JSON RPC crate, cleaned up some links in Zebra's documentation, added a test that the shielded scanner starts where it left off before the last shutdown to CI, and added the Zebra gRPC crate and a tower service to zebra scan as steps towards adding a gRPC API to zebra scan.

[08:43] - **Dodger**

Do you want to outline our plans regarding the RPC interface?

[08:50] - **Arya**

Sure. So for now we're thinking of having just two methods. One of them being scan and another to clear registered keys or results, where the scan method will take a list of viewing keys to register or a list of key hashes to identify and authorize access to already registered keys, and then it can retrieve the results as a stream of raw transaction data. As for clearing, we're not entirely sure there yet.

[09:23] - **Dodger**

The idea is to make this functionality available over RPC so that external clients can make use of it. Any questions or comments on zebra?

[09:39] - **Str4d**

Just on the mining piece and the equihash front. I cannot promise that I will work on the equihash thing this week because we have various timelines to get the other crate publishes out. But it's the kind of thing that's likely to happen next week on or around zeboot, so hopefully that feature can be not too delayed in terms of getting into a zebra release.

[10:10] - **Dodger**

I think the prime users of it are qedit. I think that they're not massively affected by it at the moment.

[10:18] - **Str4d**

Yeah, it's not urgent, but it's more just, there's just some coordination that needs to happen in addition to landing the PR. It's on the back burner, it's on my mind, and when I have a moment that isn't doing stuff.

[10:45] - **Arya**

We asked qedit as well, and I don't think anyone said that it was urgent for them.

___


### 3. Research & Implementation Updates i) FROST updates


[11:32] - **Conrado**

We are still working on add communication to the demo that we have, the demo that allows you to sign as Zcash transaction using FROST. So we're adding socket support so you can use it over Internet. We're still finishing up phase one.

[11:55] 

We have already started phase two of that, which involves creating an HTTP server that both participants and the coordinator connect to. And this server basically just carries message back and forth to make it easier because it's tricky for participants to connect to each other directly. So the server purpose is just to do this message carrying. Still working on that.

[12:31] 

For the FROST crate itself. We released a stable release candidate last December. We waited a little bit for people, if they have any opinions on the API, we got nothing in particular so we're planning to make the stable release, the 1.0.0 stable release soon. So look forward to that.

[12:56] 

And also the FROST [ZIP-312](https://github.com/zcash/zips/pull/662), is also currently being reviewed. There was another round of review, so I need to address some things that were pointed out there to improve the zip, but I think it's going smoothly and hopefully it should be finalized soon. And also the security proof paper that Chelsea wrote, I think it's going to be published to ePrint this week or maybe next week.


___

###  Open Announcements - Nate leaving ECC

[14:05] - **Nate**

I posted to the [forum](https://forum.zcashcommunity.com/t/im-leaving-ecc/46674) announcing that I'm departing from ECC after Zeboot, which is next week. I'm taking a break from working on Zcash to focus on my family, and it's kind of hard to do because I'm pretty excited about Zcash, but I'm also really excited to see what direction it goes with all the participants that are engaged with it now. Just wanted to share that and let everyone know.

[14:52] - **Dodger**

I hope you continue to participate and contribute and chime in and attend these calls as well, because I think it's really important to try and try and keep institutional knowledge within the ecosystem and not let it disappear.

[15:13] - **Nate**

Yeah. On that front, if anyone does want to contact me to chat about anything, feel free. Probably the best way is through my Twitter dm's right now, but I'll figure out my story for that and post on the zcash discords. I'll also be on the discords lurking occasionally so you can ping me there.

___

### 3. Research & Implementation Updates ii) Trailing Finality Layer - Overview 

[16:52] - **Nate**

Real quick, if you haven't heard about this, I've been working with Daira and Sean at ECC to develop a design for a hybrid PoW / Proof of Stake protocol, so that we can propose zcash transition to that in a future upgrade. And it's called Trailing Finality Layer. 

[17:52] 

Okay, so this is to recap why we're motivated by Proof of Stake. So one of the big picture items, in my opinion, is that it could enable a larger number of participants to contribute to network security and earn relatively more than they might through mining.

[18:31] 

A second one is that Proof of Stake protocol, some of them can provide something we call assured finality. What that means is if your node knows that a block or a transaction is final, there's a really high assurance that it can never be reverted except through an out-of-protocol means.

[18:59] 

So that has various benefits. It enables trust minimized bridging, and it simplifies certain issues. For example, wallets can rely on that so they don't need to have extra state or UX complexity around transactions reverting.

[19:26] 

Proof of Stake also uses less resources. This is pure Proof of Stake if we not, not a hybrid, but pure Proof of Stake uses less resources than PoW. One sort of subtle thing about that is that it allows the infrastructure providers to be a bit more nimble because they primarily just need a network connection. That network connection doesn't need to be high bandwidth it doesn't need to be very special. So this means that those providers, whoever is doing the Proof of Stake validation, are more nimble or agile, they can move if they need to, or switch service providers, which might be useful for keeping the network resilient.

[20:27] 

And then there's a fourth piece, which is that economically, miners have to constantly sell the coins they're receiving in order to pay their operational costs, whereas validators are competing with each other to acquire more coins so that they can increase their voting weight. So it sort of has the opposite economic effect, which seems like it could be good for Zcash.

[20:58] 

Then the next piece is: "why hybrid PoW / proof of Stake?". This is one I do want to discuss more during open discussion or Q&A if anyone is interested, because I think it's worth digging into. But basically our thinking with taking a hybrid approach is let's do that first, and then after that we can transition to pure Proof of Stake.

[21:24]

So the first point is obvious, it makes some progress towards Proof of Stake without switching all the way there. But because it's an intermediate step, the bet is that it might be less disruptive overall for the ecosystem and the infrastructure and wallet support and so on and so forth.

[21:53]

A third idea is that there would be a period during this hybrid protocol where there's going to be both miners and stakers participating. I just have this intuition that having both of those use cases overlap in time for some amount of time may be beneficial. For example, maybe some miners will begin staking, dipping their toes in staking or things like that.

[22:25] 

The fourth piece, and this is kind of a big one for me because we've been thinking about Proof of Stake for a long time, and after seeing ethereum finally succeed in transitioning to pure Proof of Stake, that's a really good demonstration that it's possible to do.

[22:58] 

So we have a few high level goals or requirements as we're figuring out how to come up with this hybrid protocol. The top level is we want to think about new use cases. The first one is that we want to enable users to stake, so they're going to be providing network security and they're going to be earning ZEC through doing that.

[23:26] 

The second use case that we're interested in is enabling trust minimized bridges so we can achieve that if we have assured finality. But I just wanted to be clear that we aren't anticipating building a bridge in the v1 of this protocol. So this is sort of like a prerequisite step that could be good for trust minimized bridges. But I also want to point out that there seems to be a lot of interest in building bridges from multiple groups, so that's good to see.

[24:10]

And I mentioned previously, having assured finality can improve certain use cases. For example, exchange deposits might be able to rely on the time to finality for honouring a deposit, which might be much faster than pure PoW. So those are new use cases.


___

### 3. Research & Implementation Updates iii) Trailing Finality Layer - Goals & Requirements

[24:36] - **Nate**

Some other goals or requirements we have are around ecosystem stability. So a) we want the activation to be safe, b) we don't want to disrupt mining during the activation to this hybrid protocol and while the hybrid protocol is running. So hopefully miners can keep using the same stacks & infrastructure and user flow as they are currently using without disruption. There's one big warning sign caveat here, which is obviously their mining revenue is going to go down because we are assuming that we're going to keep the existing Zcash supply schedule.

[25:28] 

So Zcash will still be emitted at about the same rate per time and there will still be the cap of 21 million ZEC. And so that necessitates lowering the mining rewards if there's going to be rewards for staking. We want to try to minimize risk, UX disruption & ecosystem disruption wherever possible. For example, if there's users using a full node RPC API, hopefully they can just upgrade their full node and keep using the same API without change and things will still work for them. Hopefully the same is true for development above a certain layer. So if you're using full node APIs or wallet sdks, ideally the full node implementations might update and the sdks might update, but the API changes won't be disruptive.

[26:39] 

And then we have Security and Safety goals. Ideally we would have some way to estimate a cost of attack and show that it will be the same or better if we transition to this hybrid protocol. Since the hybrid protocol is going to have PoW as part of it, it would be nice if we can reuse existing understanding about PoW security or the design and sort of carry that forward.

[27:17] 

In understanding the hybrid protocol, we want to make sure there's reasonably good privacy around staking. I say this as reasonably good because we don't necessarily want to innovate substantially to make staking more private than just an easy first approximation, because we have a goal to be able to deploy this relatively quickly. Also we believe that some of the basic approaches are probably good enough for now, and then maybe future protocols could improve that.

[28:05] 

Then hopefully we don't want to disrupt privacy for anything that isn't interacting with staking at all, and we don't anticipate there would be reason for that. So everything above was sort of in mind and present when I gave a presentation at the last [Zcon about Trailing Finality Layer](https://www.youtube.com/watch?v=qhMzMYeEPMM).

[28:32]

Since that presentation, we've come up with a more specific design, and we call that [Crosslink](https://electric-coin-company.github.io/tfl-book/design/crosslink.html). Crosslink is a protocol mechanism that allows you to combine two subprotocols. So it's inspired by something called snap and chat, which comes from a research paper called [ebb and flow](https://arxiv.org/pdf/2009.04987.pdf).

[29:11] 

And that's the only paper I've seen so far that's specifically about "can you combine protocols that provide dynamic availability, like PoW and Finality? like many Proof of Stake protocols, in a reasonable way that gives you what you think you want?" That paper came out during the midst of Ethereum 2 development. Ethereum 2 does try to achieve some of the same properties as this paper describes, but the approach in the paper called snap and chat is much simpler than Ethereum 2, so that's why it appealed to us. However, we found some ways in which snap and chat was lacking in detail. Once we began investigating that, we started extending it, and that's where Crosslink came from.

[30:25] 

So again, the idea of Crosslink is we can pick subprotocols. So one could be existing Zcash PoW, another one could be another existing Proof of Stake protocol and Crosslink is kind of a way to plug them together. This first part is basically with existing PoW, why don't we have assured finality? And there are two reasons.

[31:02] 

So first of all, if the network partitions, mining continues on each side of the partition, and that's a strength and a weakness of PoW. It has a property called dynamic availability. That basically means that even if you're on a partition, mining still happens. So you can still submit blocks, the chain still makes progress. And that's nice. The not nice thing is, after that partition is resolved, over on the other partition, there was also a chain progressing. And so now you have two forks, and with Satoshi style PoW, one of those forks is going to lose. So the blocks in that will be reverted.

[31:55] 

Safety here refers to the coherence or consistency of relying on a transaction. So if a transaction can be reverted, that's not safe the other issue is that even without partitions, safety is always probabilistic for PoW. So it's always possible, even though the probability diminishes drastically. But it's always possible that a really old block could be reverted. So theoretically, all software and users have to always anticipate that in practice, usually rollbacks are limited to some depth and people kind of adjust to that.

[32:46] 

But that does mean if there's ever a larger rollback, it's going to violate a lot of people's assumptions, and that could be really problematic. So there's sort of this fundamental tradeoff between this sort of dynamically available protocol that PoW provides, or one that makes the tradeoff the other way. So byzantine fault tolerant protocols are those that make the trade off another way. So they are safe, because if the network partitions, they halt. So if a network partitions, there's no longer new blocks being created, and everyone on that partition knows that there's a partition, and so they know they need to wait before that's resolved, before the network can resume. So it's always safe, it's just not available in that condition, and the safety is not probabilistic.

[33:57] 

It's what we call assured finality. So once a node knows that a block is final, they know that that will always remain true unless there's an out of band protocol change, like a fork or a reset or something like that. One thing not quite mentioned here is the goal of the ebb and flow paper is to say, "okay, there are this tradeoff between these two types of protocols, but is there a way to combine them where you can kind of get the benefits of each?"

[34:43] 

So the idea is you do combine them and you have availability even when there's partitions, and then you also have finality. What happens is if there's a partition, finality stops making progress. So if anyone is waiting for finality as a condition of doing something, they sort of get blocked and can't make progress if there's a partition. But for other users who prefer to rely on probabilistic finality, and they prefer the high availability, they can continue using the network during that partition. Those dual goals are what the ebb and flow paper is exploring, and it's also what Ethereum strives to provide with its modern protocol.

[35:47] 

Here's a brief summary of stake-weighted BFT a lot of Proof of Stake protocols are of this style. The most prominent one, or the one I'm most familiar with, would be the Tendermint, or it's now called [CometBFT](https://docs.cometbft.com/v0.38/) protocol that's part of Cosmos.

[36:12] 

These protocols come from older research prior to cryptocurrency, and then they've been sort of adapted for cryptocurrency, so they are pretty well understood, which is nice. Just a quick recap is in these protocols, you have a set of validators that are chosen in some way, and then those validators are voting on which blocks they see that are valid and those votes have to reach a threshold to ensure that a new block can become canonical and final.

[36:52] 

So the reason that it halts under partitions is that there's not enough validators present to vote. And then the important thing is, with Proof of Stake, the set of validators can change over time based on how much stake those validators are posting. Earlier we were talking about sort of the general goals and requirements we had for a hybrid protocol, but more specifically for Crosslink we want to provide a Finalized Ledger.

[37:41] 

This is something all full nodes can see and that has assured finality. So all of those nodes know that none of those blocks can be rolled back, and then it's live. We put here under reasonable assumptions about both subprotocols. I kind of just described that in the previous slide.

[38:08] 

We also want to have low latency as much as possible. The latency will not be as good as a pure BFT Proof of Stake protocol because we're doing this thing where we're relying on mining output. So mining is producing blocks, and then we're going to be finalizing those blocks. So we have to wait for the mining system to generate the blocks.

[38:42] 

And pure Proof of Stake systems don't have to do that. Okay. Oh yes, this last bullet is somewhat important. Also, ideally, the latency and security would be no worse than the current PoW, and hopefully often they can be better.

[39:25]

Let's suppose we didn't have the goal of transitioning to pure Proof of Stake. Would we have any motivation to have a hybrid protocol still? I think the answer is yes. And one indication of that is that modern Ethereum is still a hybrid protocol, even though it doesn't use PoW.

[39:52] 

More specifically for Zcash's case, if we're using a hybrid protocol, one thing that that gives us in terms of understanding security is we can rely on the known security of PoW, even if the BFT subprotocol has a weakness or a failure or some kind of bug. So that seems appealing for doing a safe transition.

[40:29] 

The other piece here at the bottom is that by having this hybrid protocol, we can often avoid halting the network if there's a partition that's relatively short term. So that result might be more resilient than a pure BFT protocol, which would halt more often. So it might have better availability overall.


___

### 3. Research & Implementation Updates iv) Trailing Finality Layer - Crosslink 

[41:03] - **Nate**

Now diving into a quick, simplified explanation of crosslink, the basic idea is there's something called a best chain protocol, which in our case was Zcash PoW. So those green dots are blocks being produced by miners, and we're going to modify that so those blocks will still contain transactions and refer to the previously mined block, but they'll also refer to a recent final BFT block header that they've seen. So one issue talking about this stuff is it can get really confusing, because now there's two kinds of blocks.

[41:51] 

So we try to always say BC block or BFT block to distinguish between these. So each PoW block in this new hybrid protocol is going to point both to a previous PoW block that it's extending, but also a final BFT block that the miner knew about when they were creating the BC block.

[42:18]

Then in addition, the BFT blocks are kind of doing the same thing. So the BFT blocks always refer to their predecessor as they would in a normal BFT protocol. But now they're also referring to the a recent BC block that was known when the BFT block was created. That's the basic gist of the design.

[42:55] 

So what this means is if you are looking at a BC block, or I'll call it a PoW block, because that's easier for me to keep in mind. If you have a PoW block, and you have all of the context of the blocks that your full node has seen, then you can look up which BFT block it refers to, and then from that BFT block you can bounce back sort of on this red arrow to a prior PoW block. then you know that one and everything before it is final in this example.

[43:43] 

So hopefully, if you are kind of familiar with existing Zcash PoW, this could be appealing because you can just think of your own wallet logic that says I have a transaction, is it in a block? What's its depth? And then you make some decision based on that. Well, now you can basically do the same thing, but now once you get to a certain depth, you know, that is considered final. So you might simplify some of your logic

[44:21] 

Today exchanges or different participants might have some rule like I'm not going to honor a transaction until it has so many blocks of confirmation, and different people might use different numbers for that, different exchanges might use different depths or what have you. With this finality, everyone would know that there's an obvious choice that's very safe that can't be rolled back. So we might imagine many participants would just rely on that. So exchanges, for example, would just use that as their confirmation depth for deposits.

[45:10] 

Finally, if you would rather have lower latency instead of assured finality, you can use transactions and more recent blocks, which people always already do with Zcash PoW sort of intuitively you can still do that. That's sort of the purpose of the hybrid protocol is letting the user choose between those two.

[45:36] 

Okay, so now I want to talk a little bit about the security analysis we've been doing on this. So first of all, we have this definition of something called "prefix agreement". I'm not going to read it. It has funny symbols, but the intuition is simpler to understand, hopefully. That is if you pick any two honest nodes and you cut off sigma blocks from their current best chains, then those pruned views of those two nodes are guaranteed that one is a prefix of the other.

[46:32] 

You don't know necessarily the order like which node sees the longer chain or anything like that. But you do know that they don't see a fork if you've cut off the tips of the chains. Given that property, we show that what we call Log fin. So this is basically the set of finalized blocks and transactions also has that same relationship. So as long as the best chains have the prefix agreement. So these are the PoW chains as long as they have prefix agreement for some sigma so if you cut off sigma blocks, you are in this condition where one node has a prefix of the other node's view, then the same is true about their finality logs. So because of that you know the nodes can rely on those logs not being reverted due to PoW rollbacks.

[48:25] 

The first diagram was simplified. We are trying to figure out a difference in design between two variants. So the earlier variant that we were spending our time understanding had the potential for a PoW chain rollback to cause the views that the nodes see of finalized states to also cross a rollback. So in this diagram, if you start at the rightmost top dot, this PoW dot, and you do the trick where you follow the two arrows to get to the final block. You get here on this bottom part of the green fork at the top.

[49:34] 

But if you look at one of its predecessor blocks and you do the same traversal, you find a final block that was on a different side of a fork. So we think it's possible to still have a safe protocol that does this, even though it seems pretty messy at first. Doing that requires a special trick. I don't think I want to go into it right now and we're trying to figure out if there's a potential variant that doesn't allow this case. So it's simpler to understand, but we're not sure the security arguments apply to it yet. And so that's sort of where we are with understanding this design. And that's it for the slides that I have. So let me stop sharing. Okay, so let's do Q&A or comments or open discussion.

[50:44] - **Conrado**

I do have a question. There was a slide that you mentioned the advantages of keeping PoW. So I'm just curious about would it be possible if it deactivates right and after a while we decide it's safe enough. Would it be possible or even relevant to remove PoW and just leave Proof of Stake?

[51:12] - **Nate**

Yeah, that is our thinking about step two. We're really focused on step one, but the big picture thinking is we're going to do 2 upgrades to the consensus protocol. The first one enables this hybrid protocol, that's what crosslink is and then the second one would transition from that to pure Proof of Stake.

[51:39] 

For that second transition, we haven't thought about it as much yet, but there's at least two options. One is we keep the Crosslink construction and we just swap out the PoW subprotocol with a Proof of Stake protocol that has dynamic availability. The reason we might want to do that is to maintain that ebb and flow property where there's dynamic availability even when there's partitions. But there's also finality, and that is what Ethereum strives to do.

[52:18] 

Another option is we just transition totally away from Crosslink to a new pure Proof of Stake protocol. That's a BFT protocol that has finality. And then that new protocol might halt more often if there are network partitions, but it would always be safe and it would have really low latency and there's not partitions. So that's a big decision between those two.

[52:45] 

The other thing I mentioned that I wanted to make sure we touched on is our whole premise is that it's safer to do this two step process and bring along the miners and don't disrupt the ecosystem too much and just add a Proof of Stake subprotocol and then later transition to full Proof of Stake. But I do really think it's worth digging in a lot more to figure out. Could it be safe enough to just transition all at once on some sort of flag day or something like that? Because the appeal of that is if we can figure out a good transition strategy, then we could just use an existing out of the box Proof of Stake protocol. We would want to modify it a little bit for privacy reasons and the the issuance schedule. But that would be appealing to just use something out of the box.

[53:52] - **Conrado**

Makes sense. Thank you.

___

### 4. Open Discussion i) TFL Q&A

[54:00] - **Nate**

So with that presentation, those slides, I'm wondering how clear this design is. Like, are there gaps? People are wondering like wait, what about x?

[54:23] - **Dodger**

I think my perception of this is probably coloured by the original Trailing Finality discussions like years ago at the time it was more about having trust in nodes rather than Proof of Stake. But one thing that I'm kind of wondering, and feel free to say that this is completely orthogonal, hasn't been considered but I feel like transitioning away from Proof of Work I think gives us an opportunity.

[55:09] 

It's almost like a clean slate. By which I mean we could start a new blockchain and with the new consensus mechanism, whether it's hybrid or pure proof stake ensure that there's a process for migrating across and then allow people to, in the same way that people can migrate from one pool to another, allow people to migrate from the current, what we would probably in future call the "Legacy Zcash" chain, onto the new chain & over time the value would migrate the coins remaining on the old chain. Just like we spelled some coins left in the sprout pool.

[56:07] 

You could end up in a situation where you could adjust the difficulty. Im sure, Str4d would have comments on this, but you could change the difficulty such that blocks on the old chain only need to be produced when people have transactions to migrate funds to the new chain. And that would allow us to  say "this history of loads of transactions can now safely let that go". Obviously there's an assumption that there's a question there whether in order to validate Zcash, you need to go back to the old chain and validate it from the genesis block onwards.

[56:57] 

But the question is, has there been any consideration given to that sort of approach? And no is a perfectly fine answer.

[57:07] - **Nate**

Okay, no, there has been in the past. The appeal is we could set up a new chain, and that gives us the opportunity on the new chain to do all manner of things in a new way. So, for example, maybe there's no bitcoin script and Taddrs, because that stuff is thorny. So with that approach, the new chain needs users and infrastructure service providers to begin integrating it. And we would have flexibility so we could make it more or less similar.

[58:14] 

So a question would be, take a mobile shielded Zcash wallet. What would it look like in that wallet, for that wallet to be able to talk to both chains and help users migrate? Or would we want, a new type of wallet, users have to get a new wallet, and then from their old wallet they push a button, it comes to the new wallet. There's all those questions about how the infrastructure and use case migration might happen. Whereas this hybrid thinking, there was the slides about not disrupting the ecosystem, its the other mentality of swap the consensus out from under everyone and they don't have to notice.

[59:08] 

The appeal of that is it's not disruptive. So the existing use cases and network effect remain, and there's no of migration process. The downside is then you have to support all of the existing old infrastructure, so it has more of like this backwards compatibility constraint. Ethereum was pretty amazing to me, so they chose that backwards compatible approach. So it was completely transparent to wallets when the protocol switchover happened and I think it might have been transparent, like from the perspective of smart contracts.

[59:56] 

That was appealing because all of the users and ecosystem just kept using it and didn't have to even know. So people joked about how the final switchover was a nothing burger. Like it was boring because nothing changed, nobody had to do anything and it just worked. But from my perspective, I was like, "wow, that was really well done".

[01:00:23] 

I can see it going either way, because we want to deprecate old functionality, we want to roll out new functionality and have that adopted by the ecosystem. So one question is, do we want to sort of bundle these together and force everyone to do that in order to do this upgrade, or do we want to uncouple them so the ecosystem upgrade is sort of happening, and separately the consensus protocol is upgraded and they don't have to match in lockstep. I don't know, I could be persuaded either way.

[01:01:04] 

Another thought is whenever we begin building out trust minimized bridges, the sort of basic user experience of a bridge might be you have a wallet, it's a Zcash wallet, and you want to send to another chain, and your wallet is kind of smart about that and it knows how to send towards the other chain. But in order to make the full transfer, you need to get a wallet on the other chain, do some stuff like get an address or whatever. So the process is a little bit tedious. A much nicer experience that could be possible would be you have a wallet that sort of knows a bit about both chains and it can do the whole process for you if we want to strive for that. Wallets are going to need to be upgraded substantially to make that work. The question is, think about T address support. Are we going to be bringing T address support along all the way to that phase, or will it be deprecated before that?

[01:02:38] 

Because I feel like I'm not being clear, but doing the lockstep upgrade where we force all wallets to upgrade, would make it a lot easier to aim for newer features, even though the migration process might be painful for users, like they might have to use two wallets and do multiple steps or something to migrate, but the end result could be nicer.

[01:03:19] - **Dodger**

No correct answers, just trade offs.

___

### 4. Open Discussion ii) Possible BFT light clients


[01:03:24] - **Dodger**

Any other questions or comments?

[01:03:32] - **Str4d**

A thing that is, I don't know if Nathan you called this out in your presentation, because I don't recall spotting it. But my understanding from when this question was explained to me was that the BFT side of the chain if you just attach it in this way, is essentially a headers only chain. So you have like headers and information on that side, but all the transaction data canonically is still on the BC chain, the existing zcash chain.

[01:04:08] 

So there is a potential way of modelling this in your head of having both where you have something like Crosslink that is doing essentially effectively like a cross authentication sort of thing between the BFT chain, ensuring that transactions on the BC chain have finality. But you could also potentially bake into this the ability to add additional transactions separately on the BFT side, which is akin to setting up a brand new BFT only chain. The BFT chain itself would still be including data from the BC chain and cross authenticating it, which even if you just spin up a pure BC chain, you would need some level of that anyway in order to do the proofs of inclusion for if you're doing any sort of migration of enabling people to migrate funds from the BC chain to the BFT chain pool state, like, if you treated those as separate pools, you'd still need some sort of cross talk and cross authentication for the BFT chain to be able to verify that a transaction that was burning or whatever in the correct way, transferring out of the BC chain was correctly included on the BC chain.

[01:05:24]

So you will likely still need something, even in that case like Crosslink. So there is a potential design space where you could have both pre-emptively where you tune the functionality you want on the BFT side, and then if you need the older functionality, you continue to use the BC chain and then adjust them over time as desired.

[01:05:49] - **Nate**

Yeah, that's a great point I hadn't thought about much before. Like Dodger, you mentioned the approach of spinning up a new network and then bridging between them. Well, for bridging, I mean, there's different ways to do bridging. There's safer and less safe ways. But a design that's relatively safe is if both protocols support light clients that have certain security guarantees, then basically the full nodes on each side has a light client of the other side, and that allows them to see some activity on each side. 

[01:06:35] 

Then from on top of that, you begin to build the transfer logic. What str4d was just describing was, if the BFT side of a hybrid Crosslink chain, I don't know if you were describing this, but one thing I could imagine is basically those BFT nodes could effectively become light clients of the PoW chain, and the PoW chain could become light clients of the BFT side. And then the hybrid chain almost begins to kind of separate with a bridge built in from the start.

[01:07:30] - **Str4d**

Potentially, yes. The point I was sort of pointing at was that what crosslink is providing is kind of half of the work of the kind of light client you need there with stronger guarantees than regular light client bridges have. Those light clients that you have are essentially, you have an inclusion proof of a transaction in a block, which is just a Merkel path, and then you have some kind of heuristic proof that a block was mined, which is exactly what Crosslink is giving you, right?

[01:08:07] - **Nate**

Yeah, a difference with Crosslink, as we've been thinking about it so far, is we were imagining full nodes. Let's see, on the BFT side, those are full nodes in the sense that they have the complete history of all blocks and transactions, both PoW blocks and BFT blocks. That's kind of just to make it easier to think about security. But I do think it's feasible to start using light client techniques.

[01:08:51] 

And even if you aren't thinking about this idea of bridging between two networks or partial separate networks, if you're just thinking about a monolithic hybrid protocol, from the software architecture standpoint, it still could be really nice if you could have a separate, really lightweight daemon that is a BFT validating node, and it's connecting to a full node. So also from the software architecture side, it sort of reinforces how light client support could be really nice.

[01:09:41] - **Dodger**

There's a question in the chat from Jason. Is fixing chain halts a manual process?

[01:09:50] - **Nate**

I don't know too well, but I do have the impression in Cosmos land, when chains halt, the validators all happen to be in the same discord channel, and they just manually start chatting with each other like, "oh, hey, why don't you set your command line options to this, to select this block so we can restart?"

[01:10:14] 

So it's very manual. That kind of creeps me out because one really appealing thing about PoW is if it halted, you can imagine events that would cause it to halt. Like there's a severe bug or something that causes all nodes to crash. Then assuming there's an obvious fix for the bug, then all of the miners race independently to begin mining the bug fix version as soon as possible without coordinating with anyone except TCP/IP connections. So that's pretty cool, because then you have all of the miners, they don't need to call each other or anything, they just need to get their miners up and running as fast as possible. Also, there could be like a new miner who wasn't on the network when it crashed, and they just show up at a particular point, or there's a change to consensus rules or something, like maybe there's a contentious fork, but that seems really appealing because then the network seems really resilient. It will inevitably restart as long as anyone cares to start mining it.

[01:11:31] 

Whereas with the BFT protocols, as far as I can tell, they have these manual restarts. So who gets to restart it is who was already there. That's bad and they have to call each other and decide when to launch and with what settings. So that seems much more brittle. And yeah, it's interesting that Ethereum has this feature. I forget what they call it, but basically it is designed to never halt. If stakers aren't participating frequently enough, then they start getting slashed more and more severely and the remaining stakers start getting larger and larger rewards. I think that is intended to prevent a halt, right? By at least incentivizing more stakers to arrive because the share of the rewards is larger if that begins happening, and also punishing the ones who aren't available more and more severely. I am really curious how well that would work though in some global catastrophe scenario. But hopefully it does, or hopefully we never have to find out.

[01:13:10] - **Arya**

If transactions can be finalized before they're included in a block with a PoW, could we increase the target spacing to reduce storage requirements at all?

[01:13:24] - **Nate**

Oh, with Crosslink it's the other way around. So a transaction has to be mined by PoW before it can become finalized.

[01:13:33] - **Arya**

I meant with Str4d's idea. Was it not to finalize transactions before they're included in a block?

[01:13:39] - **Str4d**

No, my idea was that they never get included in a PoW block. What I was pointing out is that Dodger's idea of having a completely separate chain with some way to migrate in between was compatible with Crosslink. So the idea here would be that the Crosslink BFT side is requiring that a transaction on the BC side be mined in a PoW block before you authenticate it, but then separately having separate transactions that only live on the BFT side that the BC side is essentially unaware of.

[01:14:17]

Now there's obviously a UX issue there of if what you have is a BC address and someone else has a BFT address, then the BC people can send funds to the BFT side, but they can't receive funds because they are independent chains. And that is a limitation of doing that. If you wanted to do a bi directional one, then that increases complexity and it turns into an actual proper bridge. But if you're doing that, the idea then would be that effectively you could ignore the BC chain if you wanted, other than the extent you need to be able to parse it as a full node for validating the BFT side, but as a BFT like client, for instance, you could in theory just interoperate on the post migration Zcash if you really wanted to, which would have UX problems, but is a thing that could be considered.

[01:15:29] 

It's an approach that would be worth thinking about, because even if we don't decide to do something like that, and we decide to go with a Crosslink approach to begin with, when you get to the brass tacks of implementing the BFT side, there are things that you can leave space for in that side to make sure that if you want to put transactions in there later, you can, rather than requiring to carry around the baggage of the BC side.

[01:15:59] 

For instance, one of the things that came up when I was looking at it was the fact that in the sketch, like the nice high level sketch on Crosslink, there's a reference to the BFT side has to carry around the BC block headers, which in our case are rather large because of equihash. But due to how the BC block headers work, you can't trim equihash if you need to fully validate the chain because it's a suffix, you can't even do any pre computation there. So there are considerations from that perspective that you will still have to take into account. But yeah, it's mostly just about making sure we're not like eliminating potential options.

[01:16:51] - **Nate**

One other piece, let me see if I have over on the [Zcash developers DAG](https://zcash.github.io/developers/zcash-tfl-dag), we have sort of the set of tasks we plan to do and where is the chat? So we took some time sort of spelling out.

[01:17:32] 

We added a long tail on the right side that's much more coarsely grained and a bit more speculative of how we get from the current end of the short term roadmap all the way to deploying this on mainnet? And that's worth looking at. So that was just our brainstorm and it has here, let me do a quick screen share actually, if I may. Yeah, so these blue boxes are sort of our milestones, and all of the blue boxes are relatively short term goals. So like the end of this last blue box is when we've picked a specific Proof of Stake algorithm. So this would be sort of the end of the initial design phase when prototyping and implementation could begin in earnest. And then over here on the right, we added a bunch of steps.

[01:18:48] 

So all the way on the right side we have deploy a hybrid Proof of Stake protocol on mainnet. Going backwards from there, finalize the details of that deployment, deploy that on the public testnet, going backwards. Make sure there's community consensus for deploying on the public testnet so it's clear that this should be activated doing security audits, so on and so forth.

[01:19:23] 

So we were trying to work backwards to figure out what the major milestones would be for activating it. So we still don't have a good time estimate, but at least we've started figuring it out. So I encourage people to look at that if you're interested. A final piece of context is ECC is doing a thing called Zeboot next week. So we are discussing all the things like everything we're interested in doing are doing, wish we weren't doing, so on and so forth. And we're going to try to see if we can clarify where we want to prioritize things and which things we want to streamline or cut if possible. So after next week we'll have more clarity about our plans for the next half year or year.

[01:20:28] 

So stay tuned for that. And that discussion is going to be everything's on the table. So we may decide it's like we don't have enough bandwidth to do certain other things we want to do and deploy Proof of Stake, or we may decide we're going to table other stuff and have everyone focused on Proof of Stake. So yeah, stay tuned for the outcome of that.


____


### Attendees

+ Daniel (decentralistdan)

+ Jack Grigg

+ Arya Solhi

+ Conrado Gouvea

+ Kris Nuttycombe

+ Nate ZEC

+ Taylor Hornby

+ John Bruhling

+ Oleksandr Putyak 

+ zero d


**Next Meeting Scheduled: 15:00 UTC February 8th 2024**


___
___
