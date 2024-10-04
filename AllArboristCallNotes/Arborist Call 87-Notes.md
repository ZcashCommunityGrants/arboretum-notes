# Arborist Call #87 Notes

Meeting Date/Time: October 3rd 2024, 21:00 UTC

Meeting Duration: 1 hour 30 minutes 


**Agenda**: 

+ Welcome and Meeting Intro

+ [NU6 Testnet](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#1-nu6-testnet)

+ ECC Core Update - [Sean Bowe leaves ECC / Zashi / Note Commitment Tree bug](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#2-ecc-update---sean-bowe-leaves-ecc--zashi--note-commitment-tree-bug) 

+ Zebra Update - [Zebra 2.0.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#3-zebra-update---zebra-200) 

+ [ECC & ZF zcashd deprecation - New API's](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#4-zcashd-deprecation---new-apis)

+ Research & Implementation Updates - [Trailing Finality Layer update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#5-research--implementation-updates-i-trailing-finality-layer)

+ Open Discussion - [NU6 Testnet Mining](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#6-open-discussion-i-nu6-tesnet-mining) / [Testnet Bug Explained](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2087-Notes.md#5-open-discussion-ii---testnet-bug-explained)



## Decision & Action Items

i) Hold testnet bug retrospective 


___

Video of the meeting: [https://www.youtube.com/watch?v=0lRFmXxuRq4]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes

____

### 1. NU6 Testnet 

[00:02:02.46] - **Daira Emma**

We are fixing testnet. It's not quite fixed yet, but we are catching up to the current time because obviously the block time stamps were quite a way behind, but we've worked around that and we're currently catching up at a rate of about 1 minute a second, something like that. And so testnet should be back to normal and we will give you all of the details of how to connect to it and how to work around any problems that you might be having catching up.

[00:03:36.32] 

Okay, so in addition to what I said, we have the release branch for zcashd 6.0.0 ready. it's not yet ready to be tagged because we want to verify that testnet is properly working and that the change that we made since the -rc 1.0 is working properly. That's the change to set the block unpaid action limits to zero. I think that that should help with transaction propagation. When it's applied to mainnet it should help with transaction propagation and removing the remaining spam, I hope. Anyway, let's see. Kris, have I forgotten anything about NU6?`

[00:04:52.59] - **Kris**

We are in the process of doing that work. So we were collaborating with ZF engineers on that yesterday. We did discover a network protocol difference between how zcashd and zebrad operates with respect to the initial block download phase.

[00:05:23.22] 

This is something that, it's not really a problem that we need to be concerned about on mainnet, but it is something that sort of made the testnet stall worse. We also identified a bug in zcashd with respect to block template construction. So this will be news to perhaps Arya and Colorado. But we did have code to do the timestamp clamping in the zcashd block template construction. However, the input to that time clamping was being set incorrectly that basically prevented it from functioning properly.

[00:06:14.38] 

So there's a very small patch that we will add to the release branch to fix that. But anyway, that combination of that bug and the incompatibility meant that our attempts to get the testnet back online last night weren't fully successful. But we should be now. Daira Emma and I are both running miners. That should catch us up to the chain tip that should then allow the new miner infrastructure that Yasser has set up on the ECC infra to begin providing mining power and then we should actually have some stable mining power on testnet.

[00:07:02.19] 

Also, our initial testing, what we did was relatively minimal, but I'm relatively content with it. We'll need to do some smoke testing once the release is tagged. But at this point I think that we are NU6 OR 6.0.0  release ready.

[00:07:36.28] - **Daira Emma**

Yes, I mildly disagree that this difference in protocol between zcashd and zebrad is only relevant to testnet. It does affect mainnet and it would mainly show up as when the network is has a greater proportion of zebrad nodes as zcashd nodes might sync more slowly. But we can fix that.

[00:08:11.40] 

We understand the problem well, and I've filed bugs for both zebrad and zcashd. Basically, on the zcashd side, it's just backporting a few fixes from bitcoin, and on the zebrad side, it's undoing a workaround that they made to try and get zebrad working better with zcashd in a different situation. So they try to improve one situation and end up making another situation worse by not following the protocol.

[00:08:48.01] - **Kris**

The one thing that has kind of come out of this in terms of a realization is that ZF, would you be willing to set up a zebrad only public testnet that forks from once we have testnet fully back online, we should now set up a zebrad only public testnet to begin preparation for the transition to no longer having zcashd on the network. Because I'd like for there to be a stable zebrad-only testnet that we can hook up light wallets to and run a lightwalletd against and so forth, so that we can start seeing what the network behaviour is like when zcashd is no longer online.

[00:09:44.18] - **Dodger**

Coincidentally, we've been talking a lot about enhancing Zebra's testnet capabilities recently. So that's definitely something we'd be willing to do.

[00:09:59.25] - **Daira Emma**

Because I think there's some emergent behaviour of the network protocol that will be different between a pure zebrad-only network and a network that is mostly zebrad but has some zcashd nodes.

[00:10:16.41] - **Dodger**

Yeah. I've got to say that I don't find it surprising that we have finally discovered some issues or incompatibilities between zebra and zcashd.

[00:10:36.40] - **Daira Emma**

The peer to peer protocol is one of the least well documented areas of the protocol. So, yeah, that's where I'd expect to find some interoperability problems.

[00:10:54.01] - **Daira Emma**

Unlike a consensus divergence, that has a very obvious effect if it happens.

[00:11:05.41] - **Dodger**

Whereas network issues are -

[00:11:08.27] - **Daira Emma**

They tend to manifest as flakiness rather than something obvious.

[00:11:13.35] - **Dodger**

Or security vulnerabilities.

[00:11:15.26] - **Daira Emma**

That's true, yes.

[00:11:17.53] - **Dodger**

So are you guys planning to do a 6.0.0 release that will expire before the halvening?

[00:11:30.32] - **Daira Emma**

No, that will expire in January.

[00:11:36.28] - **Kris**

So this will be the NU6 activating release.

[00:11:40.38] - **Daira Emma**

Is zebrad 1.9.0, does that fully support any six or do you need another release?

[00:11:57.23] - **Arya**

On testnet it does, but on mainnet, not yet. We need to update the minimum specified protocol version for NU6 on mainnet. And we also need to just add the activation height, but otherwise, yes.

[00:12:10.57] - **Kris**

Will that be a zebrad 2.0.0?

[00:12:13.54] - **Arya**

Yes.

[00:12:14.39] - **Daira Emma**

You could skip to 6.0.0 So keep us informed about that so that we know when that's happening.

[00:12:39.28] - **Daira Emma**

Maybe it would be confusing for the zebrad numbers and the zcashd numbers to be similar.

[00:12:47.56] - **Kris**

Well, we only have one network upgrade to worry about it, right?

[00:12:51.47] - **Daira Emma**

That's true, yeah. You can decide whatever convention you want after that.

[00:13:02.16] - **Alfredo**

So I think it's going to be Zebra 2.0 release candidate or something like that. Because it will not have the mainnet activation heights, is that correct?

[00:13:17.35] - **Kris**

So we put out a 6.0.0 release candidate 1, without the main net activation height set that does end of service halt prior to the actual having, and then 6.0.0 final sets the activation height. So the release candidate is The only difference is that.

[00:13:41.21] - **Alfredo**

We want to do the same. We are planning to start working on the release in the next week. Should be over for the end of the week in the worst case, we hope. Is that okay with you guys?

[00:13:56.13] - **Daira Emma**

Yeah. So Kris said something incorrect. There is another difference between 6.0.0 rc 1 and 6.0.0, which is the block unpaid action limit going to zero.

[00:14:14.49] - **Alfredo**

Sorry?

[00:14:16.59] - **Daira Emma**

Remember we said quite a while ago that we're going to set the block unpaid action limit to zero, meaning that we're effectively no longer using the probabilistic algorithm that allows some unpaid actions. Zebrad already has this change, but in zcashd that got delayed because although the change itself is a single line change, there are 1300 lines of tests that needed to change.

[00:14:49.13] - **Alfredo**

It's a ZIP change?

[00:14:59.47] - **Daira Emma**

That's a good point. We probably should document it in a ZIP, but no, because it's a configuration option for both. Well, it's certainly a configuration option for Zcash, we didn't put it in a ZIP. But you're right, because it significantly changes the network behaviour. It should be documented in. ZIP 317. 

[00:15:41.12] - **Arya**

Yes, it is and I was going to say that it's only recommended in ZIP 317, so it would be nice to update that. But everything is still following 317.

[00:15:52.00] - **Daira Emma**

Exactly. It's conformant to the current spec.

[00:15:56.48] - **Alfredo**

Do we have that already in zebra Arya?

[00:16:01.19] - **Arya**

Yes, we do. We merged that, I think, a month ago or a few weeks before that.

[00:16:08.05] - **Alfredo**

Okay, thanks. So basically, for us, the only difference between the candidate and the actual 2.0 will be the mainnet activation height. Because we already have that.

[00:16:33.05] - **Daira Emma**

Yeah. This is basically something that just got delayed because I was busy with those things. 

[00:16:44.01] - **Kris**

One thing that is relevant here is that the zcash protocol crate version 0.4 has been released, of course, as part of the zcashd release. So that sets the mainnet activation height in the zcash protocol crate.

[00:17:03.11] - **Alfredo**

So the mainnet heights are there in the librustzcash libraries?

[00:17:10.02] - **Kris**

Yes. So you could bump to zcash primitive 0.19. Zcash proofs 0.19. And I think it's zcash protocol.

[00:17:24.28] - **Daira Emma**

Just look at the versions that, that zcashd 6.0.0 depends on it's cargo.toml.

[00:17:35.14] - **Kris**

Yeah, zcash protocol 0.4 and zcash address 0.6 and then zcash proofs in primitive 0.19.

[00:17:43.04] - **Alfredo**

Didn't check the change for that. Do you see there are breaking changes from zebra from the top of your head?

[00:17:50.16] - **Daira Emma**

Well, I would count that as definitionally a breaking change because it's supporting a new network upgrade.

[00:17:57.26] - **Kris**

Yeah. It's not an API breaking change, but it's a semantic breaking change. So therefore it's a full version bump through the stack. Fortunately, it's an easy breaking change. Yuo just have to update cargo tunnel and you're basically done.

[00:18:16.28] - **Alfredo**

Well, I would love to see that, but in general that's not the case. We have to make additional changes. But if the API didn't change, I guess it would be easy to do, I hope, because I probably have to do it.

[00:18:32.51] - **Kris**

It would be nice for us to be able to just have the one source of truth for network upgrade heights and have that be not necessarily in the zcash protocol crate because it is a hassle to have to bump the whole stack. But what we've talked about is factoring out a separate crate that just has the constants and then depend upon those constants. Have zcash protocol define the interfaces. And then I don't know. Call it zcash constants define the constants. And then you depend on just the zcash constants for the network upgrades that you support.

[00:19:22.04] - **Alfredo**

So we're also thinking that we have a duplicate transaction structure and we wanted to use the one in zcash client backend or whatever, or primitives.

[00:19:33.23] - **Kris**

We don't need to make that change yet. I'm not refactoring and I got actually a fair ways into it at rust conf, but I haven't picked it up since I got home. I came home and had Covid and then it's been busy since then.

[00:19:48.34] - **Alfredo**

Okay. But with the foundation, I'm thinking of removing somehow the transaction structure we have in zebra and use the one that you guys have in zcash primitives.

[00:20:01.04] - **Kris**

Yeah, I think that the right way to approach that, and this is something I discussed with Arya and Conrado, is that instead of removing the zebra transaction type, the refactoring that I started on removes the transaction enum, but it keeps a transaction type that supports the same operations so that nothing downstream needs to know. But then it just wraps the librustzcsh or zcash primitives transaction type in a new Type wrapper. 

[00:20:48.04] - **Alfredo**

That would make the change not so big.

[00:20:50.23] - **Daira Emma**

Also it's wrapping a particular generic instantiation of that type so that you're not having the complexity of those. Who knows that you don't really need in. Yeah.

[00:21:04.35] - **Kris**

You don't have to propagate the type parameters everywhere and stuff. So I think that's the way forward. I just thought about that in the last two weeks.

[00:21:13.02] - **Daira Emma**

Even if you were using it directly, I think you would want to use the type alias.

[00:21:27.51] - **Dodger**

Any other questions? 

[00:21:37.50] - **Arya**

I was just going to say that rather than using the constants we could, in zebra, at least probably just use the Zcash primitives or zcash protocol network upgrade type directly or through a new type wrapper.

[00:21:54.41] - **Daira Emma**

Yeah, a local decision for zebrad, I think.

[00:22:05.10] - **Dodger**

Okay, let's move on.

[00:22:06.49] - **Kris**

The main reason that we want to factor out the zcash constants is just to make it so that because right now we have to. When we make a network upgrade or when we change the constants, which admittedly doesn't happen that often. We have to release a stack of 6 crates that even if there are no API changes, getting away from that and just depending upon the constants, like at the application layer, is kind of how we'd like to go with things in as much as we possibly can. 


____

### 2. ECC Update - Sean Bowe leaves ECC / Zashi / Note Commitment Tree bug 

[00:22:45.38] - **Dodger**

Right. ECC updates.

[00:23:03.55] - **Kris**

So on the zashi side, there are a bunch of new features that are going to be coming out in the next week or so, including address book functionality, ZIP 321 integration, and a zashi redesign at the UI layer. That's pretty spiffy. So there's a lot of nice stuff there.

[00:23:32.50] 

At the crate layer we fixed finally, the note commitment tree corruption bug that we had had and that was a consequence of a bad API decision in the incremental merkle tree crate from three years ago or something. So that API had a foot gun in it that I was able to misuse my own API. So there's a new release forthcoming of the shardtree crate that fixes that API foot gun. For those who are using the shardtree crate directly, I highly recommend carefully reading the release notes, because there are some semantic changes that must be respected by third party trait implementations.

[00:24:42.12] 

In most places I tried to make it so that they would be API breaking changes, but there is one change that is not API breaking, where you just have to [read the release notes](https://crates.io/crates/shardtree) and update the semantics of the implementation of the method accordingly.

[00:24:59.48] 

So just be aware of that. But that fixes something that has caused me no end of problems over the past few years, and this note commitment tree corruption bug was just sort of the last straw. Apart from that, Str4d has been. I'm trying to remember what Str4d's been working on because he's also been doing a bunch of stuff that I am not remembering at the moment. Some related to the NU6 upgrade and other pieces related to stuff that's going into the wallet crates.

[00:25:51.49] - **Daira Emma**

I can't remember whether at the last aarborist call, the protocol spec had been updated for NU6. So it has been. Yeah. The protocols back and all of the relevant ZIPs.

[00:26:12.17] - **Dodger**

Including the address for the ZCG slice?

[00:26:16.53] - **Daira Emma**

Yes.

[00:26:20.01] - **Dodger**

Okay, any questions for ECC? 

[00:26:30.25] - **Daira Emma**

So should we announce that Sean is going to be working on scalability? 

[00:26:41.54] - **Kris**

Yeah, Sean is now funded independently of ECC to work on zcash, scalability.

[00:26:52.52] - **Daira Emma**

Looking forward to that.

____

### 3. Zebra Update - Zebra 2.0.0 



[00:27:05.35] - **Arya**

So in Zebra, since the last arborist call, pr's have been merged for copying parts of the zcashd RPC test framework over and applying them to zebra and returning errors instead of panicking during contextual block validation in the state when Zebra can't find a block's parent. There are also new pr's open for restoring the internal miner, though this is still blocked and is unlikely to be merged anytime soon.

[00:27:27.33] 

Verifying orphaned mempool transactions so transactions in the mempool that spend transparent outputs of other transactions in the mempool and including those transactions in block templates. A fix for returning errors from the sendrawtransaction RPC method so that it doesn't return a result until a transaction has either been inserted into the mempool or rejected, rather than after it's gone through the transaction verifier. Adding authentication to Zebra's RPC server with cookies, adding indexes and read state service requests and responses for querying spending transaction id's by spent outputs or revealed nullifiers and making the block subsidy halving interval configurable on custom testnets and matching the halving interval in zcashd for regtest.

[00:28:11.10] - **Daira Emma**

I didn't quite hear that thing about nullifiers.

[00:28:14.15] - **Arya**

We have a pr open for adding the indexes from revealed nullifiers to the transaction id's that revealed those nullifiers.

[00:28:25.46] - **Kris**

And is there also one for the outpoints to the transactions that spend them?

[00:28:31.54] - **Arya**

Yes, it's in the same pr because I want to keep the DB format upgrade like it's just faster to do.

[00:28:41.01] - **Kris**

That's fantastic. 

[00:28:46.02] - **Daira Emma**

Also, the validation of orphan transactions, or change transactions - that's really important. Thank you.

[00:28:55.18] - **Kris**

Absolutely. The other thing I was going to ask about so you said that the local miner probably was not going to merge anytime soon. What is required there? Because, I'm pretty enthusiastic after this testnet debacle about getting a zebra only testnet going, and that obviously will require a miner. So what needs to be done there?

[00:29:26.58] - **Arya**

I need to review the equihash pr that is in librustzcash for converting like the C++ code from zcashd over to C and adding rust bindings. There's one file left that I need to review. If anyone else could help with the review as well, that might move things along but that's the main blocker. Thank you.

[00:29:49.01] - **Daira Emma**

So is there a branch where local mining with zebrad works?

[00:29:55.59] - **Arya**

Yes, it's the restore internal miner branch. It just can't be merged into main because our CI checks that all the crates can be released.

[00:30:05.10] - **Daira Emma**

Okay. Yeah, I was trying. In the attempt to fix testnet, I was trying to mine using zebrad and I wasn't using that branch, which is the problem, presumably.

[00:30:19.26] - **Kris**

So in terms of that crate release, Once the librustzcash changes go in, we're going to have a crate release of zcash client backend and zcash client sqlite here. Probably early next week, I'm expecting. So it likely won't go into that one, but we can follow on with a crate release for that pretty quickly after.

[00:30:55.05] - **Dodger**

Has ECC ever run an ASIC miner?

[00:31:01.00] - **Kris**

We do not have any ASICs.

[00:31:03.55] - **Daira Emma**

No. I'm not aware of us ever having had an ASIC. 

[00:31:11.50] - **Dodger**

Any other questions relating to zebra? If nothing, let's move on to zcashd deprecation. I think the big one of the important updates here is that the Zingo Labs grant application has been approved. They're going to be starting work on Zaino imminently. I just wondered if there's any other updates from either team on this topic.


___


### 4. zcashd deprecation - New API's 


[00:31:50.52] - **Kris**

So Str4d and I have been moving towards building an initial skeleton of a wallet service. So we have a repository for it now and he and I have just been talking a bit about how that will be structured. But we should have the barest bones of skeleton up sometime soon. That will be relying on the light client codebase for its chain data. But we're going to do the minimum viable wallet service so that we have something to hack on and build against.

[00:32:39.33] - **Dodger**

Cool. That's the major milestone in this process.

[00:32:47.55] 

Any other questions or comments on zcashd deprecation?

[00:32:56.00] - **Pacu**

Just a quick update. Pili, decentralistdan and myself are starting to work on the ecosystem outreach. We're trying to reach anyone running zcashd. And so if you're hearing this and you're in the Internet, you're hearing this on YouTube, just ping us in the forums and let us know how you use your zcashd infrastructure. Or leave us a contact so that we can reach out with some questions we will be doing - anyone running cd, we want to know basically everything that it's useful to get every requirement in for the day we sunset zcashd and we say goodbye to it & farewell. But we don't want to leave anyone behind on their use cases. So we need to actually kind of reach out, which is a challenge in a privacy minded community. So it's going to be fun.

[00:34:21.26] - **Kris**

So I have a weakly held and potentially somewhat controversial position, which is that I think that we should start with no support for the zcashd wallet RPC APIs. Essentially none of the existing zcashd RPC wallet APIs exhibit the kind of behaviour that, that we actually want, and I think that they also don't serve exchange users and so forth particularly well.

[00:35:06.33] 

I think we should very seriously consider taking this opportunity to make breaking API changes, since people are going to be having to do some upgrades that preserve the spirit of the existing operations. But I do not think that we should be making a drop in replacement. Because, I've been looking at the zcashd wallet RPC methods and some of the more important ones, we do not want to replicate those semantics. In particular, we don't want to replicate the semantics of the getnewaddress method, where those addresses are all treated as feeding a single unified pool of funds. 

[00:35:55.52]

So we should talk as a community. But in this outreach process, we should attempt to gather requirements not in terms of the existing zcashd rPC methods, but in terms of the actual business requirements.

[00:36:16.07] - **Daira Emma**

I agree to a certain extent, and also disagree. So I agree that the important thing is to figure out the business requirements and the RPC API should be secondary to that. But also I think that it is possible to provide a drop in replacement for most of the API that does not necessarily do exactly the same thing as the current API. So to take getnewaddress as an example, you can express that in terms of accounts. So you can say that all uses of getnewaddress return an address in a given account.

[00:37:08.49] - **Kris**

You can. So when I made my point earlier about the shardtree changes, I said that there was one dangerous change, which is a semantic change that doesn't also involve an API change. That is something that I think the danger is even higher for zcashd wallet users, that if there is not a breaking API change, they may assume incorrect semantics and that's what we don't want.

[00:37:36.59] - **Daira Emma**

I mean, so if you think about the current semantics of getnewaddress, it's defining a pool of funds, which is the same thing that an account is.

[00:37:50.14] - **Kris**

Yes, but there are other things to consider here. Daira Emma, for example, the existing methods to send transactions, they use a single pool of funds. We do have some API methods that take an address as a source of funds and those no longer have meaningful semantics.

[00:38:18.40] - **Daira Emma**

What I think we should do is define the semantics. And for that we need to know what business logic we'll need and then define a mapping of the RPC methods that are semantics. So we can say, for example, that getnewaddress is equivalent to this other API that is part of the API service that we want. You can reason about the legacy APIs via that mapping. It's like defining a kernel language and a service language.

[00:38:59.54] - **Kris**

It's only true if all of those changes are non breaking.

[00:39:11.11] - **Daira Emma**

Let's discuss whether that's possible.

[00:39:13.47] - **Kris**

Yeah, we should define no semantically breaking changes that use the same API calls.

[00:39:31.46] - **Alfredo**

Yeah, so I definitely agree with that. I think it would be a good opportunity to just do another API. In the other hand, I'm not sure if we did that, we are losing the little business that we have built in zcash. We will be losing it if we just do it that way. It's too radical. So I agree with Daira Emma. That middle point will be to be able to map the other APIs with documentation to the new stuff so people will have something to actually figure out how to continue their business. Because the other way around is the ideal world where Zebra, Zaino or whatever supports all the RPC methods that zcashd which each time we talk about this, more and more work to make that happen.

[00:40:32.37] - **Daira Emma**

Just to interrupt here, the advantage of the approach that I gave where you're mapping the old APIs and new semantics is that you not only implement it that way, which simplifies the implementation, but you document it that way and then that tells people how to move to the new APIs. So if we can do that in a semantics preserving way, which is not clear to me at the moment.

[00:41:00.55] - **Kris**

So I have two responses here. The first is that for the NU7 release we will need the full 16 week adoption window. We cannot shorten that for the NU7 release. So once NU7 is implementation complete, has been audited, and has been tested on testnet for a month, then that will be when the 16 week deprecation window begins.

[00:41:33.22] - **Kris**

That then gives us the opportunity within that window.  I don't believe that we will see any or we will see many users start to attempt to migrate until that point. So that 16 week window is when it becomes possible for end users to migrate. At that point we will have some time to add backwards compatibility to those APIs if we absolutely have to, but we shouldn't start from the assumption that we actually have to.

[00:42:30.23] - **Daira Emma**

So I am more optimistic about the chances of getting at least some important third parties to, to upgrade well before then. I agree that there will be a tale of third parties that won't upgrade until then, or won't even try to upgrade until then.

[00:42:51.32] - **Kris**

So part of my motivation here is that this is really the first network upgrade in zcash history where there is going to be a forcing function that could allow us to, for example make a smooth path for exchanges to support shielded deposits. If we reproduce the transparent only APIs, then we are smoothing the path for continued fully transparent functionality, which is not what I would think we want to do. I think we want to be full zcash protocol support is what is supported in the APIs, and then only if we really have to, we provide transparent only support.

[00:43:46.25] - **Daira Emma**

I mean, this is basically a business decision based on how likely it is that we think that various important exchanges and other third parties are likely to upgrade to shielded support. Because my impression is that in some cases, it's because there's some technical difficulty and they just reproduced what they were doing with bitcoin, but in a very large proportion of cases it's regulatory stuff or it's fear of potential regulatory stuff, and that's just too complicated for them to reason about. Now, some of those parties, maybe it doesn't matter that they fall off the network.

[00:44:42.02] - **Kris**

That inability to reason about it is exactly why I think that we should provide new APIs to begin with, and then we will get concrete information about whether or not users are willing to support the full zcash protocol. And to be clear, I think that the new APIs you provide should make it possible to operate in a transparent only fashion. But that shouldn't be the default.

[00:45:19.49] - **Alfredo**

Well, it's risky. It's too risky. Just putting transparent transactions right now and we don't support it and we're going to do it in a few weeks.

[00:45:33.11] - **Daira Emma**

You might, you might get a lot of delistings.

[00:45:35.54] - **Dodger**

Yeah, I think you get a lot. I think, I think Zcash will be delisted from +95% of the exchanges that are currently listed.

[00:45:46.26] - **Kris**

I mean, this is an empirical question though. This is something that Pacu and the folks who are doing that outreach and Dan need to find out. But it's also scope creep.

[00:45:57.42] - **Daira Emma**

Well, it's not so much scope creep because it's actually doing less work potentially. But the problem is that if we do end up needing those APIs, then we don't want to be in a position where we only have a short length of time to implement them. And I disagree with Kris. Fundamentally, I don't think that 16 weeks, that's not the right time to implement.

[00:46:24.33] - **Dodger**

It's scope creep in the sense that the objective of this project is to deprecate zcashd. It's not to try and force exchanges to accept shielded deposits.

[00:46:48.01] - **Pacu**

Although philosophically Kris's idea, it's appealing. I tend to agree more with Daira Emma in terms of how to proceed.

[00:47:23.10] - **Kris**

Is this a governance question?

[00:47:25.20] - **Daira Emma**

Yes, absolutely. That's the point that I was. I said a bit. I said a business decision.

[00:47:47.37] - **Pacu**

I think that I would actually think that maybe there's a way to actually have both. In terms of that we may not want to implement 1:1 functionality on the final result, but actually provide the functionality on a kind of a middleware basis, where we do provide a smooth path of zcashd deprecation without actually moving tech debt from one place to the other.

[00:48:33.50] 

But we definitely want people running businesses to have a low amount of disruption because behind those businesses there are users. And also I care about the users, not the businesses. So if we disrupt the businesses, maybe they won't have a way to actually use their funds, neither to eject themselves from those businesses to self custody at all. So we have to give a smooth way forward.

[00:49:19.02] 

But I totally agree with Kris on that side of putting the greater amount of effort in making the new thing good. But maybe there are ways to actually architect the final shape of it. I think that Zaino is a good component to maybe provide this translated API when and people will be connecting through Zaino or a module of Zaino or a feature of Zaino that actually helps you have a smoother transition.

[00:50:05.23] 

That list of awful rpc's that we don't want in the new place is super important for us because if we optimistically get a lot of answers from the outreach, we can actually start to create a census of who's using what and which are the most used, mostly used rpc's. And we can estimate how difficult or how disruptive this will all be. Maybe the ugly ones are not the most popular RPC's and we can, you know, lessen the drama about it.

[00:50:46.37]

But I don't think that we should include a question of "would you mind if we break everything just this once? That's just this one time. Would you not love us for that?" Because nobody will say I don't care. You break everything. Just, make zebra awesome. So it's kind of a non-question for us to send.

[00:51:14.12] - **Kris**

That's not the right question. The question is really about like business requirements. So do you generate per customer addresses, what are your requirements around those? And so focus the questions not on the RPC methods, but on the business requirements.

[00:51:40.38] - **Daira Emma**

Daira, I completely agree about focusing on business requirements. And the thing is, if we can do this technique where we express the less preferred methods in terms of the more preferred ones, that's an open question whether we can do that adequately. If we can do that, then we can use Pacu's idea of putting that mapping in a different component that can potentially be developed in parallel.

[00:52:16.46] 

As long as we have those mappings documented that component, it doesn't need to depend on it being the new indexer or zebrad that's performing that functionality, because you can run it against zcashd as well. So it removes a blocking relationship from the dependencies, which I think will be a very valuable thing to do.

[00:52:52.05] - **Dodger**

Okay, I'm next. So the two points I wanted to make, the first one is that business requirements and technical requirements often overlap in a weird way. So an example might be where it is a business requirement that they don't want to spend loads of money or loads of engineering efforts to upgrade to a new piece of software. Because in my experience, from talking to exchanges at the past, they primarily want to focus their engineering efforts on adding new coins so that they can generate more revenue from adding new coins.

[00:53:42.16]

Regulatory constraints are themselves a business requirement. I do agree that we shouldn't assume that simply replicating the existing set of APIs is what's required. Certainly that should be part of the question. I think it was probably 18 months ago I was chatting with Coinbase a bit and they pointed me towards an [API specification](https://docs.cdp.coinbase.com/mesh/docs/welcome) that they at the time had called Rosetta. I posted a link to the new version of it, which is called mesh, apparently in the chat, and I think it'll be interesting to find out if it may well be that some exchanges, if we say to them hey, what's your preferred interface?

[00:54:41.47] 

They may point to something like this, if not this. And the simple fact of the matter is we don't know. All we're doing is guessing. All we're doing is assuming, all we're doing is speculating until we actually have those conversations. Now we've already been able to start those conversations with minors. I'm hopeful that we'll soon be getting the necessary contacts and edits of the necessary to groups to be able to get them started with exchanges.

[00:55:08.53] 

But I think absolutely right. We shouldn't be assuming that simply replicating the current APIs blindly is the way to go. If we are going to change the API, then it may be that there are some exchanges who say "we're not going to be supporting that". In that case it becomes a trade off of well, do we want to support everybody? Or do we want to say, well actually we're happy to lose certain exchanges. And that goes the same for effectively not supporting transparent anymore, with just the difference that the number of exchanges would be far greater.

[00:55:56.50] - **Kris**

I'm looking at this mesh API that you linked, and this seems like a really good potential way forward because then it's not. We are giving you our new API. It is. We are moving our support to this standard, and I think that's a much stronger position to be in.

[00:56:25.22] - **Dodger**

We don't know how widely adopted the standard. That's the only thing.

[00:56:29.06] - **Daira Emma**

It's also scope creep because it's a new API.

[00:56:34.56] - **Dodger**

Yeah, agree. Anything that isn't simply a drop in replacement for zcashd to my mind is scope creep.

[00:56:43.35] - **Daira Emma**

I disagree. I think that implementing just the subset that is not already deprecated, and remember that some of these methods have been deprecated for years in some cases. So if you use a deprecated API, you're acknowledging that it may go away.

[00:57:07.32] - **Dodger**

Okay, let me rephrase that then to say implementing the non deprecated set of zcashd APIs, sorry, that is actually an important difference.

[00:57:20.06] - **Kris**

So dodger, you might be somewhat distressed then how much of the deprecated API is still use by third parties. Because virtually everything that I've talked about removing is deprecated.

[00:57:34.59] - **Dodger**

Well then we need to be talking to our users and our customers then effectively. If we're sitting here in, you know, I'm going to be controversial here. If we're sitting here in an ivory tower wanting to deprecate API interfaces that we don't like and RPC interfaces that we don't like, and it's going to massively inconvenience our end users, what does that say about our priorities, like our job here is to make zcash available for as many people as possible, not to make it a perfect thing that nobody uses. It reminds me of the old analogy that you can make a computer really, really secure by encasing it cement and burying it in a hole in the ground, but then you can't use it.

[00:58:27.00] - **Daira Emma**

I mean, my position is that we can have the best of both worlds by doing this mapping. And then the deprecated parts, it becomes clear that they're implemented by another component that is optional and that it needn't be ECC or ZF that maintains that component even.

[00:58:53.43] - **Arya**

I like the idea of a mapping, but in general zcashd deprecation seems like such a big change. But despite the very prompting and enormous opportunities that it enables, sticking to the minimum set of requirements would probably be best until after zcashd has been deprecated.

[00:59:12.26] - **Daira Emma**

I don't think it's feasible to use this as leverage to try and move people to shielded, despite being a privacy fundamentalist basically, and so it pains me that we can't do that now, but we are missing important functionality that we would need in order to move everyone to shielded. Even if there were no kind of regulatory fud involved. And it's unfortunate that we've been distracted by a lot of other things, like the sandblasting for example. But we have always had a plan to fill in that missing functionality for shielded and FROST is part of it, there are other parts, and once we've done that, we'll be in a much stronger position to do that migration.

[01:00:16.59] - **Daira Emma**

Also to strongly encourage people to migrate and that will involve it will depend on how the regulatory landscape evolves as well, at least in the case of centralized parties and for dex's and so on. Maybe it's an easier shift for them and the focus needs to switch in that direction.

[01:00:49.11] - **Pacu**

Yeah, I agree with what Daira has said. Also, I do believe that the opportunity here is to move on to a less monolithic, more modular and maintainable architecture, so that although we might not be having the API or the RPCs of our dreams. We could eventually get to it, which now is just like possibly not technically feasible because of the state of zcashd.

[01:01:34.41] 

So I think that it's important to have the short term goals always present. Given that we can focus on like Zebra now not being solely replacement of everything that zcashd did, it can now be just a consensus node. We can have other infrastructure like Zaino to do other work that is more easily extensible, probably try to focus on how to build other stuff that can cooperate and build horizontally instead of monolithically on the node.

[01:02:29.47] 

So I guess that's the opportunity here. Instead of thinking of how we can use this opportunity to make people do this thing, I guess that people will move in to and appreciate the new infrastructure if we really put an effort on it being better ergonomically, like have a better developer experience, you know, make things easier for people, maintaining the infrastructure.

[01:03:08.35] 

And that is not that we are the ones like not having the headaches anymore and maybe, you know, delegating the headaches to other people, I don't know, having to move to the new things. Like instead of like doing the new stadium analogy, we can try to build something that can be potentially really good in the midterm and not a hassle in the short term for any partner that is actually supporting zcash.

[01:03:50.26] 

That's kind of like how I see the opportunity here. Then moving to shielded is another thing. And it possibly will be much more easy when we don't have all the tech debt that zcashd is. So we can focus on that later after we achieve this.

[01:04:10.35] - **Daira Emma**

Yeah, I mean in terms of moving to shielded, I think the emphasis should be on the carrot rather than the stick. And so we have some really encouraging progress on shielded hardware wallet support, for example with Keystone. So FROST is finally becoming usable. We are getting there. It's been a slow process, but we are getting there. And we need to provide that functionality and make that functionality better than what we currently have for transparent. You're right, Pacu, that's the only way to encourage people to switch by making the developer experience and eventually that will pass through to the user experience better.

[01:05:32.46] - **Pacu**

Yeah, just one last thing. Like this kind of questions that, for example, Kris came up with. I took notes like, do you generate per customer addresses or things that you think that it's important to know? Please reach out to Pili, Dan or myself and we can, you know, collect all these things and, you know, start sending these questions to the ecosystem. It's a team effort.

[01:06:25.56] - **Daira Emma**

One last thing on that point. I think this has been a hugely productive conversation because at least I have thought of a bunch of new ideas for how to do that mapping, which is a different approach than we were thinking of before and could be a much faster and better approach. So about trailing finality, there has been no updates on that.





____

### 5. Research & Implementation Updates i) Trailing Finality Layer

[01:06:57.09] - **Kris**

Shielded labs has both Zooko and Jason here, so maybe they can say something.

[01:07:09.48] - **Zooko**

There's only a couple of things to say about Crosslink trailing finality. One is that we're hiring, we're interviewing and hiring. And so please, if you know anyone who's interested in protocols and mission of Zcash, send them our way right away before we hire someone else.

[01:07:30.00] 

The other is that at the next arborist call two weeks from now, we will present like last call for [what are the requirements for this first deployment?](https://docs.google.com/document/d/1GZYQgQdzL1-GNJLWmt5CbTFXo1nuufkL7-gg7az_M2Q/edit) I'm not exactly sure what form that'll be in, but there'll be some way to record everyone's input by then if anyone wants to give input. In the meantime, you can always give input on this totally unstructured, messy Google Doc that I just pasted, or contact any of us by any means.


___


### 6. Open Discussion i) NU6 Tesnet mining


[01:08:03.44] - **Daira Emma**
That's all.

[01:08:07.08] - **Dodger**
So let's open it to the floor for any open announcements that people want to make, in which case we can return to open discussion if people want to continue that discussion. 

[01:09:32.33] - **Pacu**
What are the next steps for fixing testnet? Is there something that people using testnet previously should do to contribute to chaos and contribute to fixing?

[01:09:55.35] - **Daira Emma**
We will post everything about that in #nodedev on the R&D discord. All right, so that's where you should be if you're trying to get anything to work on testnet. Kris, you're muted.

[01:10:18.47] - **Kris**
The answer should now, I believe, be just wait a few hours for us to catch up to. For testnet to catch up to the chain tip such that all of the nodes agree that they're in a state where the block height that they're expecting corresponds to the time that they're expecting and then the network should just start functioning again. But yeah, we can follow up on the discord.

[01:10:53.36] - **Daira Emma**
Yeah, let me just have a look at what the current block time is. Bear with me. I can just do this quickly.

[01:11:06.43] - **Arya**
Just thank you to everyone who helped fix testnet and a reminder to anyone that's running zebra on testnet that if you followed the wrong fork on the finalized part of your chain, you can use the copy state command to just copy the parts of the state that on the right fork out. There are notes about it in the [Zebra 1.9.0 release notes](https://github.com/ZcashFoundation/zebra/releases/tag/v1.9.0).

[01:11:32.36] - **Daira Emma**
I'm just looking at the timestamp of this block. 

[01:11:55.37] - **Pacu**
Are there any actions that have to be run on the Zcash Explorer?

[01:12:03.10] - **Daira Emma**
We are up to date. I think we are up to date.

[01:12:10.33] - **Kris**
I'm surprised at that because when I looked at the estimated chain tip height when I started my node before, it was saying that we were would be about 7000 blocks higher than we actually are. I don't know whether that estimate would be disregarded.

[01:12:30.10] - **Daira Emma**
So if you can see the current Unix timestamp is very close to the last block.

[01:12:52.50] - **Alfredo**
Is this is going to be a document about what went wrong with testnet, how to fix it?

[01:13:00.02] - **Daira Emma**
We should absolutely do a retrospective and write down notes from that. Yes, it's a good idea.

[01:13:06.38] - **Dodger**
I think this may be completely wrong, but the impression I picked up is that one person was running a miner to feed a faucet and they didn't upgrade because they didn't realize that they were the only miner maintaining testnet. And as a result their node fell off testnet. And that's not intended to assign blame, but I think that was. That was one of the contributing factors.

[01:13:52.57] - **Daira Emma**
Well, I mean, that faucet for testnet, but that didn't have any effect on the rest of the problems. I think the problems are to do with design issues in the block header syncing as inherited from bitcoin core and as implemented somewhat differently in zebrad. And we understand fairly well what the issues are now. They were quite complicated and they can't really be summarized as any single noder having done anything wrong.

[01:14:35.05] - **Kris**
Yeah. Also, one just factoid that Str4d discovered in the process of working on this was that part of the reason that testnet was unable to recover was due to a bug in bitcoin core that we inherited in 2015 that was finally fixed in 2022. It was a bug that had been active in bitcoin core for seven years, and the fix is non trivial. We hadn't even looked at backporting yet because we're not that close to bitcoin core to backporting from 2022. But, yeah, we did. That's the level of protocol level stuff that Daira Emma is talking about here.

[01:15:29.42] - **Daira Emma**
Yeah. We nearly managed to backport some network fixes from bitcoin, and we did backport some. But getting all the way to 2022 was never on the cards with zcashd. So it's understandable why it happened.

[01:15:50.31] - **Arya**
To briefly add to that, in order to mitigate the issue on Zebra's side, another bug was introduced in Zebra that triggered another bug in zcashd. So I think there's a lot to talk about here.

[01:16:02.30] - **Daira Emma**
Yeah. I think the lesson from this is don't make changes just to compensate for bugs in other software. I think that bug was discussed, but it wasn't really something that was on the ECC team's radar to fix because we had lots of other fires to fight. And so now that we have fewer fires to fight, we are in a better position to kind of, for the time that zcashd is still going to be relevant, to iron out any interoperability problems, which is still important to do, and to make sure that zebrad is going to be stable once on its own.

[01:17:08.41] - **Kris**
Yeah. Just to put a different spin on that also, I would say also that at the point where this workaround for this zcashd bug was put into place, the ZF and ECC teams were not collaborating nearly as closely as we are today.

[01:17:26.57] - **Kris**
That's been a huge improvement to be able to really work together on these kinds of issues.

[01:17:33.26] - **Dodger**
So what was it that actually triggered the situation on testnet that needed to be recovered from that?

___

### 5 Open Discussion ii) - Testnet Bug Explained


[01:17:40.08] - **Daira Emma**

I will attempt to do an in depth explanation because it's a really complicated protocol. So, there are headers and blocks, and what bitcoin core does is it downloads. Originally it would get both headers and blocks, in sort of in parallel, but it only looked at a single node and that's still the case. So it would pick one node out of its peers that it thought was good and get the headers from that.

[01:18:30.53] 

At some point they changed to try and get as many headers as possible and then download the blocks. And the reason for that is that if you're after a checkpoint and then you basically know that you're on the right chain and you don't have to do as much validation on the block. So that's an efficiency improvement sync.

[01:18:55.21] 

The way that a node is supposed to answer get headers requests is relevant to this book, and it's a little bit clunky. There's a maximum number of headers that will fit in the response to a get headers message and if the responding peer sends the maximum number of headers, that's considered to mean that there are more headers to come so it's not at the end of its chain.

[01:19:39.29] 

If it sends fewer than that number of headers, then that's a weak indication that it was at the end of its chain. and so we don't conclude that there are any more headers to fetch. So zcashd at which does not have the headers first change, so it's still downloading headers and blocks concurrently. It had an efficiency bug inherited from bitcoin core. This is the bug from 2015 that was only fixed in 2022, where it would send redundant getheaders requests. So it's basically supposed to just send getheaders for the ranges that it actually needs in sequential order, but it actually will send additional requests and that was causing much greater bandwidth usage.

[01:20:57.38] 

So zcashd, when syncing, would take several multiples of the bandwidth that are actually needed. So what zebra did to try and compensate for that is not to send the maximum number of headers in any given message. So instead of sending 160 headers, if it had more to send later, then it would send 158. And for the network at the time that that workaround was put in place that worked reasonably well and avoided the bandwidth efficiency problem from zcashd.

[01:22:05.55] 

But in a different situation where it's the zcashd nodes that zebrad nodes that have the authoritative chain and the zcashd nodes are trying to catch up, the effect of not sending the maximum number of headers in each message was that a zcashd node would sync much more slowly because it would think that it had reached the end of that chain when it's connecting to a given peer and it only connects to one peer, which exacerbates the problem.

[01:22:59.02] 

So what was happening was that when the peer mined another block or when it sent an INF message, I think it would get unstuck. So it would load 158 headers and then wait for the next block to be mined and then another 158 headers and so on, instead of loading the headers continuously. And this made the sync take much longer. So yeah, that was the efficiency bug that was introduced by this change that became an emergent bug due to this change in zebrad. And so what we did to fix the network, well, we did several things.

[01:23:53.28] 

This all interacts with another thing called the max tip age. So if no blocks have been mined for 24 hours, then the network will break, because that's not an expected condition and in the normal situation that would normally indicate that your clock is wrong, for example, or you're on a fork and you shouldn't continue. So it's reasonable that rule should exist. But in a situation where no blocks had been mined on the network for a day, and in this case it was no box have been mined for seven days, then it creates a big problem.

[01:24:52.02]

So what we did to work around that was just to increase the constant, which is normally 24 hours, I just increased that to 10 days. And that got the particular nodes that I was using to catch up to see that we were near enough the tip and they were able to mine. And then there was another bug in zcashd where there are constraints on the timestamp of blocks. So the timestamp of a block has to be greater than the, it's called the median time pass. So it's a kind of average of the last 17 block timestamps.

[01:25:42.41] 

The details don't really matter, but it also cannot be too far in the future relative to the median time pass. So there can't be a gap of more than 90 minutes between the medium time pass of a block and its timestamp. And so if you try to mine a block just using the current time, when you're in the situation where the network is broken, then it won't work. So what you're supposed to do really is to clamp the block time to the maximum time allowed by the consensus rules. So zebrad was doing that. zcashd was trying to do that, but there was a bug. And so we figured out what the bug was. Temporary workaround. And then zcashd was able to catch up.

[01:26:49.44] - **Daira Emma**

The other thing that we did was just manually figure out what the best chain was and then do add nodes to create a well connected network between those nodes.

[01:27:09.41] - **Kris**

Also, I did verify that without the max tip age setting, that zcashd node can now sync and it is in current state. So testnet is healed.

[01:27:25.43] - **Dodger**

This was triggered because basically there was no mining on testnet for like a week. And the point I was trying to make earlier that the reason there was no mining on testnet for a week is because the sole node that was mining in order to supply the faucet dropped off.

[01:27:46.59] - **Kris**

On our side. Yasser did the work to set up a miner in cloud infrastructure about a week ago, but that miner fell into the hole and couldn't get out of it.

[01:28:00.32] - **Daira Emma**

In fact, everything that we tried to set up fell into this hole. We hadn't figured out what the workaround was because there were two simultaneous workarounds needed and because of this other bug that was. It was slowing down sync. So we couldn't get to the point of even being able to use the workaround quick enough. 

[01:28:25.20] - **Kris**

Every time we scramble out of the hole, then the whole wall spalled away and degraded and we couldn't climb out.

[01:28:33.46] - **Daira Emma**

And each of us ran out of time and needed to do something else and shut down our node. But, yeah, we finally got it.

[01:28:42.39] - **Dodger**

Well, it's just really good that this happened on testnet. Is it?

[01:28:45.58] - **Daira Emma**

Yes, this is what testnet is for.

[01:28:48.49] - **Kris**

Although I've said that if this were to happen on mainnet, if difficulty on mainnet were to drop like that, then cpu mining would become feasible again. And I just set up a cpu miner. It would be great.

[01:29:06.04] - **Dodger**

Okay, well, we are at time, so if people want to stay on and continue chatting, they're free to do so. But if you want to drop off, because this is the past, the end now of the scheduled meeting, feel free to do so. And we'll see you again in two weeks time.

[01:29:28.01] - **Daira Emma**

If you want more detail on those two bugs. I think they're the most recent bugs on zcash/zcash and zcashfoundation/zebra. 


____


### Attendees

+ Kris Nuttycombe 

+ Arya Solhi

+ Alfredo Garcia 

+ Daira Emma 

+ Jason McGee

+ Pacu 

+ Zooko Z

+ Amber O'Hearn

+ Daniel Wolande

+ John Bruhling

+ Oleksandr Putyak 



**Next Meeting Scheduled: 21:00 UTC September 6th 2024**


___
___



