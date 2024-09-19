# Arborist Call #86 Notes

Meeting Date/Time: September 19th 2024, 15:00 UTC

Meeting Duration: 1 hour 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ [NU6 Testnet Activation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#1-nu6-testnet-activation)

+ Zebra Update - [NU6 audit report](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#2-zebra-update---nu6-audit-report) 

+ ECC Core Update - [NU6 bug / Zashi & Wallet SDK](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#3-ecc-update---nu6-bug--zashi--wallet-sdk) 

+ Research & Implementation Updates -  [ZSA update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#4-research--implementation-updates-i-zcash-shielded-assets) / [ZSF update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#4-research--implementation-updates-ii-zcash-sustainability-fund) / [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#4-research--implementation-updates-iii-frost)

+ Open Announcements - [Github Boards/ TUM Blockchain](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#5-open-announcements-i-github-boards--tum-blockchain)

+ Zcashd Deprecation & CLI wallet architecture - [Justification & Overview](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#6-zcashd-deprecation-cli-wallet-architecture-i-justification--overview) / [Architecture & Exchange Use Case](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#6-zcashd-deprecation-cli-wallet-architecture-ii-architecture--exchange-use-case) / [Direct Database Access](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2086-Notes.md#6-zcashd-deprecation-cli-wallet-architecture-iii-direct-database-access)



## Decision & Action Items

i) Inquire into Exchanges Addresses and Scan requirements - Daira Emma 


___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=I8jHbDYb-_Q)

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes


### 1. NU6 Testnet Activation

[00:01:50.58] - **Daira Emma**

Testnet activation went fine, except I think a lot of people are having problems syncing on testnet. We're not exactly sure why that is. I think perhaps the connectivity in the testnet network is a bit too sparse at the moment. We don't have any evidence that there's actually a consensus bug, but we need to sort out that connectivity issue and get testnet running reliably for everyone.

[00:02:34.49] 

We have released sothe new version of the librustzcash SDKs. Let's see that supports Str4d. What new features are supported in those versions?

[00:03:01.30] - **Str4d**

Relating to NU6, nothing.

[00:03:12.05] - **Daira Emma**

For NU6, specifically, the current version of librustzcash does not support NU6, so we know that we need to put this out.

[00:03:27.56] - **Str4d**

To be clear, it does It just does not have the testnet or mainnet activation heights set, but that is planned for the next release of the Rust crates.

[00:03:39.41] - **Daira Emma**

Yes, but it won't actually work until we release that. I think that's everything except for the Least Authority audit. So Least Authority said that they would deliver the report yesterday, and we're still waiting for that.


[00:04:16.47] - **Alfredo**

Yeah, in regards to what Daira Emma was saying, the testnet issue was nobody mining. Conrado and Arya has local nodes that started mining, but we at the foundation are trying to make a persistent node that they can mine.

[00:04:33.43]

Because when nobody mines, then the blockchain can't make progress, and that's one of the issues we have with the testnet.

[00:04:46.04] - **Daira Emma**

I think zcashd nodes are still having problems syncing or connecting to other nodes. So my node, for example, only has 2 connections and is stuck at 2975999 which is just before the NU6 activation. So there is some issue there that we need to investigate.

[00:05:21.50] - **Dodger**

Would the 100 block rollback limit have anything to do with this?

[00:05:26.38] - **Daira Emma**

I mean, I reset my node to previous snapshot, and it's still not syncing properly. That might be the issue for some people, but it's not the primary issue. For that issue, specifically, we can put out a version of zcashd that has a long rollback to the fork point. But until we've to figured out what else is going on, and that by itself wouldn't be sufficient.

[00:06:18.44] - **Pacu**

Would asking Zec.Rocks or zcashexplorer.app to set up nodes to mine testnet be helpful or not yet?

[00:06:34.59] - **Daira Emma**

I mean, for the time being, it's sufficient for ZF to do it, I think it's just we need to investigate a bit more.

[00:06:46.43] - **Str4d**

It's also likely that whoever or whatever was running nodes to mine Testnet previously just didn't see and didn't upgrade to NU6 and may still be mining on pre-NU6 off on their own branch. 

[00:07:06.58] - **Pili**

I just want to add a NU6 update from the foundation side, and that's that we received the preliminary report from Least Authority on a NU6, and it's mainly  inconsistencies between what the comments are and what the code does and just the consensus also will be creating issues to fix that documentation soon.

____

### 2. Zebra Update - NU6 Audit Report

[00:07:43.26] - **Marek**

The update is going to be brief this time. In terms of merged PRs and new functionality, we added two new RPCs, namely Stop and Generate, and refactored one more RPC, and then the regular stuff such as dependency updates, documentation refactorings, and CI improvements. Then as Pili said, the initial version of the NU6 report came in, and it contains two findings. So far, they are classified as suggestions, and they are related to the documentation and error handling. That's all from me.


___


### 3. ECC Update - NU6 bug / Zashi & Wallet SDK 


[00:08:43.30] - **Daira Emma**

We did investigate that there was a potential issue with tracking chain value pool balances after the NU6 upgrade, or rather for the zcashd 510.0, which supports NU6 on Testnet. That issue was being seen by one user on mainnet. So Str4d and I, and previously Kris and I, looked very thoroughly at the changes there, and we can't see what is causing that. It appears to be only one user. So we've asked the user more questions, but we don't think that that's a block or anything. 

[00:09:54.52] - **Str4d**

So on the wallet SDK and sides there, the main changes coming in from the Rust back-end are around changes to how scan progress is going to be exposed to users, to try and give a bit more usefulness and fidelity to what syncing needs to happen before you can use your wallet in its current state, versus discover history in other notes and things.

[00:10:32.58] 

There were also some bugs related to older Android API versions that were investigated and addressed, like API 27. So hopefully noone's relying on those here, but we've kept that support for now. There were some other Android changes, mostly just, I think, on the refactoring side. Then there's a couple of new updates of Zashi rolling out near future. I forget which feature has been deployed, but that's not really relevant for the Arborist call.

[00:11:15.19] 

The next thing that is from the Wallet SDK side that's being looked at and worked on is the changes to how confirmations are chosen. There's a draft in ZIP 315 that describes some changes about how to basically make notes spendable more quickly while still retaining appropriate security. And we're working through the motions of implementing those to improve the users experience of spending based on the Rust SDKs.

____


### 4. Research & Implementation Updates i) Zcash Shielded Assets 

[00:12:07.58] - **Vivek**

So this week's update is also thinking with the [monthly update](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153/84) that I've given on the forum. So I'll just quickly recap most of that.

[00:12:21.59] 

To start off, we basically completed work on Orchard, librustzcash, and the test vector scripts for the v6 transaction support. And we are currently working on moving forward with the Zebra additions for ZSAs on multiple fronts. We've been talking to least authority again regarding the audit of the Orchard ZSA protocol. So I think that should be starting pretty soon and we'll support the team when necessary over the next few weeks as that goes on.

[00:12:55.14] 

On the ZIPs front, we've addressed most of the critical issues that were there on the open issues on the ZIPs repo. So there's still some work connected to recommended wallet behaviour and stuff that I will work on keeping the NU7 roadmap in mind. There are some open PRs on Halo2 and Zcash note encryption that I think we are waiting feedback on. So that's regarding ZSAs.

[00:13:27.21] 

Regarding swaps and user control, which is the other grant that we have. We've made another pass through ZIP-228, which is the asset swap zip, while before the implementation started.

[00:13:40.43]

And then we began modifying the Orchard, the repo, and our folks to make those implementation changes. So that's a work in progress. Regarding user control, we had a discussion with Daira Emma, I think, a couple of weeks back to get their view on some of the directions we had in mind. So we've been putting ideas together towards getting that progress as well. 


___


### 4. Research & Implementation Updates ii) Zcash Sustainability Fund 


[00:14:21.58] - **Paul Dann**

Yeah, I can give an update on that. So we are in the process of reworking  the ZIPs again. We've identified some issues that it's not worth going into just yet, but we'll explain that more in the coming days, I think.

[00:14:44.29] 

We've been working on getting a local test networking between Zcashd and Zebra. Since we can't run end-to-end testing on Zebra in the same way that we can with Zcashd, we wanted some mechanism to validate the work we were doing to make sure that Zebra is happy with everything. We've managed to do that with some tweaks, and I've described that a little bit in Discord. The patching that was needed to get that to work.

[00:15:18.09] 

But we're now in a situation where we're able to essentially simulate our RPC tests from zcashd and send them over to Zebra and check that everything's working correctly there. So that's really useful.

[00:15:32.52] - **Str4d**

Finally, we've run into a tricky issue in the Rust code in Zebra that is to do with async lifetimes and there's some complication there. We posted on Discord, and Conrado replied that maybe the Arya can help, but we've not heard anything beyond that. So any help that can be offered or input would be greatly welcome. 

[00:16:10.52] - **Daira Emma**

Sorry, what channel was that on?

[00:16:12.58] - **Paul Dann**

That was on the zebra channel.

[00:16:15.58] - **Daira Emma**

Okay. I'll have a look. 

[00:16:47.48] - **Alfredo**

Yeah, in the previous topic, we are adding to Zebra the RPC test framework that zcashd uses, the Python one. Maybe that's useful for your testing, we can discuss in the Discord I guess too. 

[00:17:06.48] - **Paul Dann**

Feel free to jump in, I opened a thread under NodeDev in Discord called zcashd-zebra, local testnet. Feel free to jump in there and we can discuss what we've managed to do so far. It could be interesting to compare notes. 


____

### 4. Research & Implementation Updates iii) FROST 

[00:17:47.10] - **Conrado**

Yeah, it's a short update. We are basically still working on the same things on finishing a refresh share functionality for the DKG and adding encryption authentication to the FROST server, where our goal is to have a production ready FROST server in the coming months. But that its it.



___


### 5. Open Announcements i) Github Boards / TUM Blockchain 

[00:18:13.15] - **Pili**

Thank you, Conrado. Any open announcements before we dive into zcashd deprecation and the CLI wallet architecture?

[00:18:28.07] - **Pacu**

Yeah. I'm just announcing that I'm creating some [GitHub boards](https://github.com/pacu?tab=projects) to have another slice of the progress of the different development efforts, like zcashd deprecation, hardware wallet support, block explorer support, I can share this async so I I don't take any more time from the meeting. Maybe those can be included on the notes that are published later.

[00:19:14.25] - **Daira Emma**

I guess I have one thing, which is that I appeared on a panel about privacy at [TUM Blockchain](https://conference.tum-blockchain.com). I took a pretty hard line on not compromising with surveillance or compliance protocols.

___

### 6. Zcashd Deprecation CLI Wallet Architecture i) Justification & Overview


[00:19:59.55] - **Pili**

Let's move on to the main topic today, which is zcashd deprecation, with a focus on defining the CLI wallet architecture and also the related grant proposal from Zingo Labs. I'm not sure whether anyone wants to kick off the discussion on this.

[00:20:26.56] - **Dodger**

I'll provide some context on this. So last year at Zcon, ECC and ZF agreed that we would collaborate on deprecating zcashd and the expectation was that we would work together on that in partnership in order to make it possible for zcashd to be sunset and effectively switched off.

[00:20:59.46] 

The expectation was not that we would simply replicate all of zcashd's functionality into zebra, but that we would potentially build new pieces of software if and when it was appropriate. For example, a replacement for the zcashd full node CLI wallet was one of the things that we thought made sense to separate out from Zebra.

[00:21:24.41] 

If we fast forward some time, obviously, the landscape has changed, and there hasn't been a a huge amount of progress towards that and given that, ECC have announced that they are no longer going to entertain any further functionality into zcashd that means that any further significant upgrades to the Zcash protocol are blocked on us deprecating zcashd. So that's the background. We've been having discussions over, I think, the past 7 months with ECC about how best to go about deprecating zcashd and what a CLI wallet architecture might look like and that's has not yet been finalized.

[00:22:19.35] 

In the meantime, Zingo have put forward a proposal for a grant to assist with the process of zcashd deprecation by helping to build a CLI wallet. I'm going to drop a couple of links into the chat so that people can see the [GitHub issue](https://github.com/zcash/librustzcash/issues/1373) where there's been some discussion about what the architecture might look like, and then a link to the [Zingo Labs Grants application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/47228585/) so that people can review that.

[00:22:56.17] 

But ZCG have asked for feedback on whether what Zingo Labs are proposing makes sense and whether there's consensus amongst the ZF and ECC engineers that that is a path worth pursuing, because obviously ZCG don't want to go ahead and fund the grant if it's not going to deliver something that makes sense to the core engineers. So on this call, I suggest that we see if we can I agree on a high level architecture for the CLI wallet and see if what Zingo Labs have proposed syncs in with that and if not, what changes need to be made? And then finally, who is going to be responsible for building which components? And just to be clear, from ZFs' perspective, we have no previous experience of building a wallet. So in terms of architecture, we've been happy to defer to ECC, who in our view have got far more experience of building the wallet.

[00:24:14.43] 

And obviously, we're happy to build whatever is required into Zebra in order to make that possible with the caveat that we don't want to have a full wallet functionality all lumped into Zebra because we think we would just end up back at the same starting point that we came from.

[00:24:35.13] - **Daira Emma**

On the issue that you said that not much progress has been made. From my point of view, a huge amount of progress has been made on librustzcash that's necessary for it to be a basis for a wallet that supports transparent functionality. So that has been done. But I agree that the next thing that we need to concentrate on is this wallet architecture.

[00:25:17.02] - **Dodger**

Cool. I'm just going to see if I can seize control of the screen sharing and just to put up some diagrams. So this was the latest evolution of the architecture that was being discussed on the GitHub issue that I've just posted in chat.

[00:25:44.30] 

What I suggest you do is you click on the [link](https://github.com/zcash/librustzcash/issues/1373) and go to GitHub and then you can look at it. And then as a separate binary named Zebroid in this instance, which runs alongside Zebra and then serves out to the actual CLI wallet, which is down here on the bottom left.

[00:26:11.19] 

Zingo have put forward a wallet architecture diagram, which is an evolution or an adaptation of what Arya posted, slightly different. It includes a light wallet gRPC service, and there is some overlap between the functionality required to serve a CLI wallet and the functionality that's inherent in a light wallet server. But one thing I would caution about here is scope creep and being clear about what our objectives are.

[00:26:48.17] 

It's because it would be good to have a new version of lightwalletd that's not written in go, it doesn't mean that that's something that we should block on in terms of deprecating zcashd. So I think there's a few different options on the table. There have been some ideas that we should simply leverage all the functionality that already exists in the librustzcash libraries and effectively have the CLI wallet use the light wallet protocol.

[00:27:22.17]

There's also the option of having zebra serve the necessary information out of this extra component. I'll leave it open to the floor as to whether I've missed anything. But I think really we are...

[00:28:07.42] - **Jon**

I have great difficulty following the architecture diagrams. Also, when I click on the GitHub links to understand the scope of the conversation here, the difficulty more precisely is which part is a necessary diagram that will help the implementers do their job, and which part is a description of the outcome modules or areas of work that the people that don't work on them can understand what is being built, why is it good. I think if we all If people use the exact same mental model as the people that actually come and do the work, then it creates a screen of fog to really understand what's being built and what are the pieces.

[00:29:25.47] 

No doubt that the complexity is there, but then it's difficult understand what goes on.

[00:29:32.45] - **Daira Emma**

Okay. I think parts of the motivation for splitting into these separate pieces shown by the light yellow boxes is that we don't want a full node to do more than it strictly has to. The reason for that is that a full node is already very complicated. Also a full node has to directly talk to the network, so it necessarily has some attack surface there.

[00:30:08.37] 

So if it's also directly providing functionality for a wallet, then there's some risk there in terms of the keys that it holds and the potential for timing attacks and other side channel attacks against the wallet. That's why we have this intermediate indexer, and then the indexer is providing the information that is not needed for validation it's not needed to be a full node, but it is needed for a wallet. Therefore the wallet can make queries to the indexer, and there's some separation there from the full node.

[00:31:00.20] - **Jon**

That's a really good clarification. Thank you. I immediately understand much more.

[00:31:08.42] - **Str4d**

To just give a slightly different way of thinking about it, which comes from the various discussions that we've had over the past months. The full node provides the consensus view of the network and just of what is necessary to ensure consensus. The concept of the indexer is to be caching publicly relevant information. So stuff that doesn't depend on any individual wallet or is tied to an individual wallet, but that is aggregatable and derivable from the public state.

[00:31:52.36] 

Then we have, beyond that, you then have things that require knowing something about the wallet that is consuming that data. In the yellow box in the bottom left currently, there's what's called a scanner there, which could be a separable box itself, but it would necessarily have information about the wallet's viewing keys which we don't want the indexer to have because the indexer should... In terms of a privacy boundary and a trust boundary, the indexer in the full node, we want to be able to operate just on public so that it's clear when people are configuring and set these up, where their key material is and how it is used.

[00:32:39.35] - **Daira Emma**

Excellent description, yes.

[00:32:53.34] - **Dodger**

That's the point we're trying to make here is that we could spend the next hour educating people about all all of the background that has led us to this point, or we could move towards trying to reach a final conclusion so that the whole of the ecosystem can move forward. 

[00:33:10.00] - **Daira Emma**

I think the answer to that question was really useful, actually, in terms of clarifying what the goals are of having these components, because it's not obvious why you need these three components, but you do.

[00:33:23.42] - **Str4d**

The main thing that I want to know then, which is what I raised my hand for, was Dodger said that what Zingo has proposed is a slightly different architecture. I would like to hear from them what they see as the difference in their architecture relative to what we just described.

[00:33:48.17] - **Arlo**

I think one of the main things that I got from what we've been designing is that we would be designing essentially a remote interface for the read state service in Zebra with a one-to-one functionality, which would mean any CLI wallet would be able to either use Zebra's read state service directly if they're going to run all processes on one bit of hardware, or they could separate off having the validator run on one piece of hardware and the wallet run on another and then use the remote service for that.

[00:34:28.11] 

So that's the indexer RPC box. And then I think it was also thought it would be good to unify how the lightwallet service gets its data. So it'd be building that service directly off the read state service instead of the JSON RPC interface in zebra. I don't think it would be that much more work to implement that gRPC service. We've done quite a lot the preliminary work for that and also done some preliminary work to enable that service over the NYM mixnet, which is something I definitely am eager to see happen. So I think those are the reasons for our design and how we'd like to implement it.

[00:35:27.40] - **Str4d**

So to clarify the The primary difference from what was described in the other diagram is that inside what you've labeled Zaino here, but in the indexer box, there also exists a lightwallet server, are there other architectural changes?

[00:35:50.01] - **Marek**

No, essentially, that's the main one. I think this is something we've had a few meetings now, narrowing it down. Essentially, I think what Arya put down is very But just adding in the lightwallet side to that.

[00:36:11.28] - **Conrado**

I think one important thing to keep in mind is that there is the abstract design and there's the concrete design. So when we talk about an indexer, this could mean a process, like Zaino here in this diagram, or it It would be something like a crate, which is linked to the wallet, right? And then there won't be a separate process, right?

[00:36:38.35]

So my first question was, in the previous weeks, I thought we were converging to the idea that the indexer So the indexer would be like a crate, which is linked to the wallet and could use the zero state crate from zero. So the solution, there will be the wallet process and the zebra process, and that's it, right? But now I think we have shifted for a design where there is a separate process for the indexer. And this process is basically like the lightwalletd server, but maybe done a different.

[00:37:17.08]

So I have two questions, right? The first question is, do we really want to do this? Do we really want to create an indexer, a separate process? And the second question is, if you want to do that, why can't we just simply use the existing lightwalletd? Do we need to rewrite it? I think these are the important things we need to answer before advancing the design.

[00:37:43.56] - **Daira Emma**

It's a technical question whether the existing lightwallet, gRPC interface is sufficient for the wallets that we want to build as a zcashd replacement. Obviously, we're already using it for some existing wallets, but those don't have all of the functionality of zcashd. I think Str4d is probably best placed to answer that.

[00:38:10.45] - **Str4d**

It is currently the case that the lightwallet RPC, as it currently exists, is not sufficient to provide all the functionality that a zcashd wallet replacement needs. It could be extended in various ways with various deficiencies to do that, but having some other access to the index is a need to serve the underlying requirements given the current state of lightwalletd. If we were to base it on lightwalletd, it would need to be extended, whereas basing it on something like the zebra state or whatever that base crate is a difference in where you're focusing your energy, but that state service likely already has a bunch of the information that we need here that is currently not reachable and accessible through the lightwallet service.

[00:39:10.43] - **Daira Emma**

The trade-off here is, do we concentrate on a new thing that probably is going to be a lot more maintainable going forward, or do we try and extend lightwalletd to provide an adequate interface? My intuition is that the first option is better, but it does depend on exactly how much we would have to extend or go with lightwalletd. Basically, I want this architecture as it's shown with a separate process anyway. The question is, do we need it in the short term or do we only need it in the medium term?

___

### 6. Zcashd Deprecation CLI Wallet Architecture ii) Architecture & Exchange Use Case

[00:40:03.45] - **Pili**

I think Arya had his hand up, so I'll ask him to speak next.

[00:40:09.26] - **Arya**

Exactly how much would we have to extend the existing quite well Zgo implementation? Is it just those two methods for the new indices that we've talked about with the spent out points and the nullifiers leading to the transactions that spend them? Or is there more?

[00:40:25.22] - **Alfredo**

Is there anything in the CLI validation interface that we need to add to the index or RPC service?

[00:40:30.09] - **Str4d**

I can't tell you offhand what would need to be added where because lightwalletd was not built to provide this information. There would be the need to route it through both on JSON RPC and on gRPC side, as well as whatever internal machinations are necessary inside, which I am not familiar with. But to just go back to the point that Conrado asked about, I don't personally We see the distinction of it being a crate that is bundled into zebra versus being a separate process as a huge distinction. The main difference it makes is whether we have to have some IPC for what's labelled on there as finalized state chain, nulliied state. The communication layer between them. As long as there's a logical separation inside zebra, I don't think it matters if initially it's still part of zebra. If there's a direction to be able to separate it.

[00:41:29.43] - **Daira Emma**

I think Arya suggested it would be part of the wallet. But it could be either. Which process you put it in is not, to me, the critical thing because you need to write almost the same code anyway, and you just need to write a little bit of extra code to make it accessible over RPC.

[00:41:48.58] - **Za**

I'd like to hop in and disagree with Str4d because that's exciting. I like disagreeing with Str4d. I think it does matter a fair amount, not whether it's a creator or a process, but where that create lives, because typically or ideally, creates a single stakeholder. I think decentralization is very desirable here. Secondly, to Arya's point about enumerating the already necessary functionality that lightwalletd would need, I think it's critical to point out that we're talking about right now in this moment, we already know lightwalletd is insufficient, and we're trying to build a system that is resilient to future environments.

[00:43:02.01] - **Str4d**

The point I was making about create versus process was not about how you develop it, it was about how you deploy it. Those are two orthogonal aspects of it, and the development side should be a separate discussion from the architecture side. This hand was about the front-end piece, which we haven't really talked about yet. The constraint that we are likely to have from getting this out to people, specifically the big current users of zcashd wallets that we are trying to migrate off, is going to be that whatever is provided here needs to have some JSON RPC interface that lines up with or has minimal impedence mismatch to what they currently use.

[00:43:52.32] 

When we talk about a CLI wallet, I want to just be clear what we mean by CLI wallet. My understanding of that, and I want to make sure that the proposal from Zingo is either on the same page or not on the same page, then we figure out what that difference is that functionally, there is a wallet service that runs that is actually responsible for holding the key material & maybe that's where scanning happens, maybe that's extractible, that's a separate piece there. But the key thing is it manages the wallet keys and wallet state.

[00:44:30.40] 

Then there is some mechanism for poking it and making it do things. That mechanism could be a CLI interface for working with it, but would also likely need to have in some fashion, a JSON RPC interface that existing users can transition to relatively simply. Does that line up with what's on this proposed diagram, or are there other differences being that we need to discuss?

[00:45:03.31] - **Arlo**

We were asked to remove all wallet development from this grant and just have this grant be for the remote indexing service, which is the Zaino box.

[00:45:16.53] - **Str4d**

That is very good to know.

[00:45:19.59] - **Arlo**

We were told that that was an ongoing discussion and it would be best to wait. If it's decided that... I think we're all very up for doing that work, but it depends. It's the case of whether people want us to do that work. We were told to remove it from this grant. We'll now put in a grant just for the Zaino work. Then if it's decided that people want us to also develop that CLI wallet, then we'd put in a separate grant for that.

[00:45:48.07] - **Str4d**

Great. I'm glad I brought this up then because that significantly changes how I'm looking at this right now. The intention then for this meeting is to focus on Zainoas the proposed indexer within the architecture.

[00:46:03.40] - **Marek**

That's the current grant, yeah. I think the decision was to wait, hold by to work out exactly what's going on with Zenith and some other wallet options and then dependent on those discussions, come back to the CLI wallet grant.

[00:46:20.44] - **Daira Emma**

I do think we need to talk a little bit about wallets because some of the existing wallets are not going to be capable of exchange usage because they're just not designed to hold the number of transparent addresses that exchanges use. We need to not box ourselves into a corner where we don't have anything to support that use case.

[00:46:47.44] - **Str4d**

Yeah, but at the same time, given what was said earlier about proposed within the Zaino box, combined with what we were sketching out about what the role of an indexer is, the indexer node or whatever it ends up being, being focused on public information means that the main constraint there from a large user's perspective is making sure that it is able to provide those indices in as a reasonable way as possible for whatever wallet consumer there ends up being. In particular, it also means we don't need to consider JSON RPC at all for that box because  the existing exchanges usages will be talking to the wallet process and don't necessarily need to talk directly to Zaino.

[00:47:54.50] - **Pacu**

Yeah, I was a little bit confused about the CLI wallet conversation. I think the main advantage of having an indexer part that it's independent on any other component, like that being either the wallet or the node, is that it gives us a broader range of possibilities. We don't know, when you couple this indexing service to one of those, we're limiting other possible users or users or use cases. So if the indexer is something on its own, then it's easier to have, for example, data transformers that can implement or either the RPC services or whatever other data or API that is needed to help all zcashd users to migrate to the new architecture.

[00:49:19.31] 

So keeping that uncoupled, it's really a good way to go, in my point of view, at least. And also keeping it independent helps anyone needing to use Zaino as, for example, an integration testing platform to actually do what we were doing with Darksidewalletd and have end-to-end testing that is easy to set up and easy to test like edge cases. So I really support Zaino being, I think, on its own rather than being tied to either a wallet process or the node.

[00:50:17.09] - **Dodger**

I seem to recall that one of the main reasons for suggesting that the indexer process, that the wallet queries, should be separate from the node is to avoid some form of attack, the name of it escapes me.

[00:50:36.49] - **Daira Emma**

Yeah, there was a similar attack against zcashd called the pingreject attack.  So that was originally to do with using ping or reject messages from the network to do timing attacks. But there are generalizations of it that depend on locking interactions between the wallet side of zcashd and the full node side of zcashd. At the moment, we use a horrible hack to separate them, even though they're in the same process. Doing it using an indexer. To go on to the point that I have my hand up for, this is basically the architecture that I've always wanted it to be and thought was the right way of doing it almost from the start. We just never had time to implement it in zcashd.

[00:51:40.56] - **Dodger**

The second thing I wanted to say is that We need to discuss whether including the lightwalletd gRPC service in this index or whether it's Zaino or the Zebroid service, whether that's on the critical path for zcashd deprecation or whether it's just a nice to have. And then finally, I want to highlight that Rene from the Zenith Wallet Project is here. I think it was Za who suggested or was questioning whether Zenith could be useful in this context.

[00:52:17.09] 

I think the key question there is if we're going to propose or suggest that something could be used as a wallet interface, we need to determine whether or not it's capable of handling the exchange use case, which is tens, possibly hundreds of thousands of addresses.

[00:52:33.12] - **Daira Emma**

Can I address the lightwalletd thing first? If we don't put the lightwalletd interface in to Zaino, then we still need it. No one wants to maintain the GO lightwalletd. It will be significantly more complex to have to access both a lightwalletd and a separate indexer process. I don't think that makes sense given how relatively simple it is to make Zaino provide the lightwalletd interface. I mean, perhaps someone from Zaino can comment on the relative complexity of adding that part of that interface to Zaino.

[00:53:34.37] - **Arlo**

I think once you have the interface with the read state service set up and you can get all the data from that, there's not a lot of work to actually implement those gRPC services.

[00:53:44.22] - **Daira Emma**

That was my impression, too. Yeah.

[00:54:05.01] - **Pili**

Okay. So I guess I don't know if Rene wants to address the question, whether Zenith Wallet could cope with the exchange use case?

[00:54:29.29] - **Rene**

I don't think anything would prevent us from doing that. We are storing the addresses in a database. We couldn't handle large amounts of those addresses. I think the question is really going to be more about performance, and It would be great if we could have a little bit more details on the use case of how often are they trying to scan those hundreds of thousands of T addresses to understand exactly where would be the limitation of performing that. 

[00:55:08.07]

That's a good point. I'll put it on my to do this to ask our Exchange contacts about that.

[00:55:18.08] - **Str4d**

The performance questions tend to come not so much from the number of addresses, but the number of notes or coins, the outputs related to those that need to be tracked. I remember, this was years ago, but I probably still have it lying around somewhere, putting together a test wallet for zcashd or a pair of test wallets, one of which I think what I simulated there was 200,000 individual notes because the limitations here are primarily to do with performance under keeping shielded notes and transparent coins and things tracked from a spendability perspective.Then note selection is the other main constraint.

[00:56:07.29] 

I had a test architecture that we used for finding and optimizing performance problems in zcashd. That might be a useful test artefact to migrate. Once we have a way of migrating wallet.dat's from zcashd into another format, that might be something that could be pulled from. But in the meantime, you might be able to manually extract the data from that to be able to play around with it from a testing perspective.

[00:56:37.56] - **Daira Emma**

It's worth pointing out that Zcashd actually does not have very good performance for this use case. We had lots of complaints from exchange users about that. My impression is that some of them found ways to work around it, and some of them just wrote their own code and now only rely on zcashd as a full node proper. But unfortunately, I don't have as much detail about that as I'd like, I think partly because exchanges tend to be quite cagey about their internal architecture.

[00:57:23.05] - **Arlo**

Yeah, one question I had about Zenith is, how do you actually get your data from the node? Because one worry I had for the exchange use case is if it's going through some RPC interface, is that going to slow things down too much? Do we want to provide a wallet that can have direct access to the zebra DB? That's something I don't know how on a part that would be due to it be written in Haskell rather than Rust.

[00:57:55.29] - **Rene**

We currently are using the zebra RPCs to get the data.

[00:58:08.15] - **Daira Emma**

If you use the the zebra RPCs to get the data as it's coming in, then you're then storing it in a form that is easy to index. That's the whole point of the indexer. It's not as though you necessarily have a large bandwidth between the indexer and the full node in the steady-state.

[00:58:39.14] - **Str4d**

There is a question around from a from a how it is used perspective, what the... It has just very been drawn on there on the red line, the arrows that go through the red are relevant to the scope, even if the box is inside the red box or outside scope, the arrows that go through the box to communicate with them have to be manageable in some way.

[00:59:15.23]

That is an advantage of adding lightwallet gRPC in as a initial point because then the core of the state service can at least be tested with existing mobile wallets. As a "we have a known reference that is consuming the... That is consuming lightwalletd, backed by Zebra or zcashd, and we can ensure that that continues to work" as the indexer is developed. While the indexer RPC service that is better suited to conveying the necessary information to the desired full node cases can be developed.

[00:59:59.07] 

That would be one nice approach for it. Presuming, as was said, that adding the gRPC service APIs is simple once you have all the data indexed there, which I would presume is significantly easier than is the case in lightwalletd.

[01:00:18.33] 

Lightwalletd is partly an indexer itself, but it misses a lot of the stuff and it relies on the full nodes for a lot of stuff. Whereas having a unified indexer that can be extended as necessary, can load additional indexes in as it needs and be resilient to rollbacks and all that is going to make for a much nicer way to then expose data as we need to.

[01:00:41.43] - **Daira Emma**

I agree. 

[01:00:57.31] - **Arlo**

I like the gRPC option. I think as I think some other options have been put forward, but that would be my preference.

[01:01:05.03] - **Daira Emma**

It's certainly simpler if we just have one RPC protocol.

[01:01:20.51] - **Za**

Yeah, I just wanted to make sure my interjection didn't cut into this more context-rich conversation. It jumps back to, I think, Pacu's point earlier, and there's a lot of talk about needing to support centralized exchange wallets that have a huge number of transparent addresses, which is probably because they're just using the legacy Bitcoin style, generate tons of T-addresses architecture.

[01:01:53.50] 

I just wanted to say, use cases, ideally, we're going to handle all use cases, but we have a limited amount of resources, and some use cases are going to be lower priority than others. And I'm concerned that when we get pushback from exchanges saying, Zcashd is too slow for us because we have these large numbers of coins. I'm concerned that we are building for yesterday's problem and looking at the wrong use case. So I'm not sure. I don't have data, but I think we need to keep in mind the migration towards DEXs.

[01:02:33.40] - **Daira Emma**

I agree completely. We should consider migration towards DEX's. For the extreme a strange case, which is actually the blocker to deprecating zcashd, because DEXs are not a blocker to deprecating zcashd, for those, we can try and persuade them to use shielded addresses or deposits because then you can obviously scan just using one incoming viewing key, an arbitrary number of addresses. That would potentially solve their performance problem. But I'm not optimistic about the chances of persuading them to do that.

[01:03:30.48] - **Za**

It's pointed out that the current zcashd doesn't do a terribly good job from the centralized exchange perspective, and it's a pain in the butt. In order to deprecate it, we need to build something that's probably at least that good, or at least good enough that they will use it. I think we should definitely not expend any effort beyond that to support that particular use case. It doesn't need to be better.

[01:04:00.07] - **Daira Emma**

Well, they're basically not going to make any major changes in what they do. That's my impression, that they may be able to stop using certain APIs that we won't support anymore, but that's about it, really.

[01:04:19.52] - **Za**

Yeah, I'm just concerned about the opportunity cost to other use cases, to designing and building for other use cases.

[01:04:28.55] - **Daira Emma**

I don't think we have the option to just ignore all centralized exchanges and say we're only going to concentrate on DEX's anymore. Basically, we have to build this functionality anyway.

[01:04:52.45] - **Dodger**

I think we should be clear on what the objective is and building something that doesn't cater for the existing centralized exchanges who rely on Zcashd is not the objective. That may be a different project that people want to pursue. Also, the the quickest path to a a DEX for Zcash is to unblock the deployment of ZSA's so that we can then add in the asset swaps functionality, which will turn the Zcash network into one giant DEX.

[01:05:26.56] 

So I just want to just want to highlight that we have very specific objectives here, and we should not be letting the desire to achieve perfection stand in the way of us making progress towards the objectives that we have. If we need to rediscuss those objectives, that's fine, but I don't think they're going to change any day soon.

[01:05:58.14]

I mostly agree, but also we don't want to build something that is unmaintainable. We should be looking to design the in a way that is going to be extensible and maintainable and people will actually want to maintain, which I think means the architecture that's on the screen with a a rust implementation of Zaino as opposed to continuing to rely on the go lightwalletd.

[01:06:47.38] - **Pacu**

Yeah, basically, my experience reaching out exchanges is that they are juggling many, many balls in the air and that they'll do as least effort as they can. And so we should take that into consideration. Although I agree with Za that this support is super important for the future. Also, in order to bring most of the Zcash supply into to a TEX, we need to get it out from centralized exchanges. I don't know how much of the ZEC supply is on centralized exchanges on its transparent form. I guess that quite a lot, given the poor support of hardware wallets that we have and other kinds of custody or custodial services.

[01:07:52.43] 

So probably what we want to achieve is to have the least bumpy zcashd deprecation as we can maybe try to support as much of the existing RPCs as they are, not maybe fully, maybe adapting the interfaces through data transformation or something like that, so that we have the least disruption as possible, given that we have limited resources to deal with any bumps. And the least we have to deal with deployment bumps and disruptions, the more we can do towards the future use cases. That's how I envision we can achieve that. I think that we can achieve that with this architecture proposed. And we can worry about the future.

[01:08:53.34] - **Daira Emma**

I would be very surprised if we didn't lose some exchanges. We would be very lucky to keep all of the exchanges, but obviously we want to keep as many of them as possible.

[01:09:11.32] - **Str4d**

Okay, so to try I'm trying to pull this back around in the tally into the meeting towards actionable feedback on the proposal here, the main thing I would want to ensure for an index like Zaino is that if or when we discover that new indices are necessary for a particular use case, it is easy to add those in. Currently in zcashd, if you're running a zcashd node and you discover that you need a different index, you have to completely start the consensus node again from scratch. That is a significant, both just a It is a foot gun for using people, and it is also a significant doss on exchange services, for instance, that depend on access to data.

[01:10:11.51] - **Daira Emma**

To the extent that they'll basically refuse to do it.

[01:10:16.36] - **Str4d**

Keeping the resiliency between the full node being able to just be deployed and then just essentially run as it needs to. Then when the indexer wants or needs information, it can be restarted on its own, it can have quick startup, it could do maybe live reindexing of certain bits on the fly. That's stuff that could be figured out within that, and it doesn't all need to be rolled in initially. But having that in mind while implementing the initial thing would be, I think, very useful here and is also relevant to the top right question mark here of the Zcash RPC service in terms of how the indexer communicates with the consensus note from that perspective.

[01:11:08.30] 

Then I guess the other piece I would say is that, similarly on the front-end side, but I think this was already mentioned, was just making sure that the... I agree with Pacu, and I think Dodger might've said something to this effect as well, of enabling other plug-up use cases within the front-end. The gRPC services are one way of doing that, but I'm also thinking of the number of block explorers that they need an indexer service as well. They're built on that. That's where zcashd's indices came from was being imported from one of those projects.

[01:11:43.01] - **Str4d**

Having a thing that we can similarly, if people want to use it to power their... For public information about the chain, that would be a very useful service to end up with from this. To that point, which just occurred to me, my other solution, then I'll put my mic down, is making sure that the front-end gRPCs, so at the bottom end of this box, Do not expose full node control APIs. That's a core problem with JSON RPC, with the way the zcashd inherited from Bitcoin JSON RPC. If you expose the JSON IPC, you get full access to control the full node, which is bad.

[01:12:35.58] 

It's the main reason why when people go, Hey, is there a public RPC we can query? The answer is generally no, because no one puts the zcashd JSON RPC online. Whereas if the indexer RPC service box on this diagram is designed such that it can be safely put online and be a public source of information, that makes it more likely that people can run these indexer nodes and offer them as public services or paid services if you want to provide better up times or something to a particular enterprise consumer, and it being something that can just be easily deployed without foot guns.

[01:13:17.01] 

With those three points, other than that, I'm pretty happy with this as a proposal.

[01:13:23.47] - **Daira Emma**

This is not an architecture question, but it's more of an implementation question. The question mark on the left at the top, was that intended to be direct database access or an RPC?

[01:13:41.25] - **Arlo**

I believe the read state service in Zebra does have direct read access to Zebra's RocksDB. 

[01:13:53.38] - **Dodger**

Does that then incur the timing attack issue?

[01:13:59.26] - **Daira Emma**

We believe not because we believe that it's possible to open the database in such a way that It's basically one process is writing what the processes can read. We need to look very carefully at the issues there. But I think that how that is implemented is the reading process basically just looks at the log, so it's a snapshot isolation model. And so it is possible to do that without logs, but that is something that we need to look at very carefully.

[01:15:24.14] - **Rene**

Yeah, I just wanted to say that if we have a better understanding of exchange use case. It wasn't originally on our plan for Zenith, but I think we're in a good position where we could address that edge case without taking everyone else's time of the other teams that are building more forward-looking infrastructure like this. And they need something that's a little more specific for what they do, which is probably going to be heavily on transparent addresses and generating them, managing them, and scanning for them. We could look into that. So we can provide that on top of zebra nodes for the early exchanges.

[01:16:18.20] 

Yeah, so back to the question marks. So if Zaino is going to be its own process and written in Rust, then it can use the zebra state create to read a zebra's database directly. That's basically the question mark on the left. And that will give full read-only access to all Zebra's database. And then the question mark on the right is basically JSON RPCs to sync the main pool data and the last, the most recent 100 blocks in the blockchain.

[01:17:14.55] - **Str4d**

We may not want to keep it as JSON RPCs, but that would be a reasonable way to start getting things going. To get back to Dodger's question, but on the right-hand side, because the kinds of attacks that are relevant for the timing things, what matters is that they're network observable. So any update to the state that is being read by the indexer that happens necessarily in line with responses to peer-to-peer network peers needs to avoid being blocked on wallet operations.

[01:17:56.40] 

If I understand the intention of It's the split between the read state service and the indexer state service. The intention here is that then the zebra state logic is essentially going to become the core state for the consensus nodes that is necessary to run the consensus node. Then the indexer would be then post-processing that as it comes in into the indices that it is then exposing downstream. What that means is then the reads that are occurring of the indexer via the lower APIs from wallets, they will be occurring on different databases than the ones that the indexer is querying, which provides a buffer in between, which is probably sufficient to prevent that particular timing attack.

[01:18:49.19] 

The JSON RPC's have the same thing there where they need to feed into the same indices that are being built. But as long as there is some separation of buffer thing there where the the wallets don't learn information in line blocking the network layer, then we eliminate that particular avenue.

[01:19:11.18] - **Daira Emma**

Yes. RocksDB, in recent versions, does support. There's an explicit API that you need to use to try catch up with primary that a secondary database can use to catch up with updates from the writing process.

[01:19:35.29] - **Conrado**

Yeah, I feel like the next step here, or this in my mind, is the bottom right question mark is mapping out what exactly is missing. Just for the sake of explanation, assuming we are using the go lightwalletd server, what's missing from it, what needs to be added for it to to support the zcash client back-end. This also is important. I think it's set into stone that we're using the cache-quiet back-end in the wallet. I think it's good to make that clear. So if we map out what is missing from the current lightwalletd, we can get a better understanding of what exactly Zaino needs to do, right? And what exactly is the Is there anything to measure between expanding the current goal implementation or doing a new one, right? Maybe it's super easy to do that. I understand everyone hates the goal server, but maybe it's easy, right? And that would make sense to just extend it and then replace it later or not?

[01:20:48.26] - **Daira Emma**

Yeah, that might make sense if it's sufficiently feasible work just to do both. And then that removes the blockage on Zaino being fully implemented.


___

### 6. Zcashd Deprecation CLI Wallet Architecture iii) Direct Database Access

[01:21:13.13] - **Dodger**

For this direct database access, does Zebra and Zaino need to run on the same machine?

[01:21:22.39] - **Daira Emma**

In order to use that, Zaino would need to have access to the same file system. not necessarily the same machine.

[01:21:34.52] - **Arlo**

We plan to have a backup create that will use the JSON RPC service, so you could run it on a different machine if you wanted. A lot of that's already in there, essentially. So it's going to be very little work to finish that functionality off. And then by default, it'll run directly using the read state service, but you could run it and it will get its data from the JSON RPC interface.

[01:22:01.40] - **Str4d**

Yeah, that would be nice because certainly for the things I mentioned before of like rebuilding indices and whatnot, the ability to do direct data access is going to make that so much easier to do performantly. 

[01:22:15.46] - **Daira Emma**

I mean, since this is a performance issue, maybe we should not prematurely optimize and just try and get the JSON RPC version of it working first.

[01:22:29.10] - **Str4d**

Well, if they're both there, then they're both working.

[01:22:34.03] - **Marek**

What you can already do in the read state service is to provide a directory path for opening the database, and then you're good to go. That's the current state.

[01:22:47.49] - **Daira Emma**

And that already uses the secondary database does it?

[01:22:55.09] - **Marek**

Yeah, it opens. It uses the RocksDB read-only mode.

[01:23:02.07] - **Daira Emma**

That's a slightly different thing because if I understand correctly, the read-only mode, all processes need to be read-only. In this case, obviously, zebra needs to write to the database, and then the secondaries need to catch up, which there's an API for them to do. But I don't know whether that's what's already implemented.

[01:23:28.21] - **Arya**

It is what's already implemented.

[01:23:40.41] - **Dodger**

Is read state service in the right location on this diagram?

[01:23:50.04] - **Arlo**

It's a crate in zebra, but it's a crate that we will use as a dependency in Zaino so there's code there that will be running in the Zaino process.

[01:24:06.26] - **Za**

Hi. Can you hear me? Yes. The ZCG wanted me to run my upfront ask numbers by this chat, so I'm going to paste those in the channel so people can see what we're asking for, if that's all right. I just want to I'll take that down quickly. Arlo began working on what is intended to be designed on January 13th. He's going to look at his GitHub. I was billing him at $80 an hour.

[01:24:42.06] 

So for the retroactive, I have $80 an hour $160 hours a month, 8 months. I multiply by 1.5 there. So instead of just Arlo working on this, I wanted to include our contributions to Regtest Mode in Zebra and couple of reasons to librustzcash over the last eight months that we have been doing that are, I think, directly relevant to zcashd-deprecation. I don't think we can get deprecated zcashd without Regtest mode, for example, in the replacement.

[01:25:19.05] 

So that is a retroactive ask for services rendered of about... It sounds like $153,600. Then I've recruited 3 new to Zcash, not just new to Zingo, new developers who I anticipate working directly on zcashd deprecation for 6 months for $30,000. They're new, but I think that's an amazing price tag, and it should be supported by the community. And then we're asking for equipment to test Zaino $12,000, and to give laptops to the new guys. So that is our upfront ask.

[01:26:20.33] - **Daira Emma**

So that's up front. What's the overall?

[01:26:30.36] - **Alfredo**

Overall, Arlo can give the three milestone numbers. I think it makes sense. They are $38400, $44800, and $38400.

[01:26:52.37] - **Daira Emma**

That seems fine to me.

[01:27:07.32] - **Pili**

We're almost at time. We can continue the discussion, but I assume some people will have to drop off. I just wanted to wrap things up a little bit and try to understand whether we have a final architecture that we can agree on. Obviously, the numbers for the grant are not really something we can comment on here. This is about protocol development. Can we agree on CLI wallet architecture that teams can start working on in order to unblock or to progress with Zcashd deprecation?

[01:27:59.59] - **Daira Emma**

I mean, I agree that this is a useful thing to build, and it's maintainable for the future, and I have no issues with this.

[01:28:18.11] - **Za**

I think if this is set in stone, does that offer constraints on what that CII wallet will look like? Isn't this a step towards that?

[01:28:29.55] - **Daira Emma**

I mean, yes, given that the output of this is those to gRPC or whatever interfaces, then the CLI wallets or whatever you want to call it is going to have to consume those so yeah. I noticed you got that wallet consuming only the the indexer service and not the indexer service and also the lightwallet gRPC. That might not actually be how we do it.

[01:29:08.41] - **Arlo**

My understanding was originally that the Client Wallet was going to be designed to use essentially the data that the read state service provides so that it could run on the read state service directly if it was going to all run on the same hardware or you could. Then we'd implement a remote for those services.

[01:29:33.07] - **Daira Emma**

I don't think you need to decide that.

[01:29:35.11] - **Arlo**

It's a different implementation of just implementing the gRPC services for the extra data that we need.

[01:29:42.04] - **Str4d**

This gets back to the point I was making before of the as long as that front-end plugin, where those RPCs are, is relatively modular, then if we discover there's other things we need to access in the indexer service later on in the wallet piece, it becomes very easy to add them.

[01:30:00.14] - **Marek**

I think if we have access to the read state service and all of that data, and then we're implementing a gRPC service, very easy to add extra services and build whatever indices we need.

[01:30:18.57] - **Conrado**

Can I just say that I'm happy with this architecture. Just keep in mind what Str4d mentioned, that it would be good to have options in the future, if we want to get rid of a separate process and actually linking it with the wallet. It would be good, but we don't need to worry about this, but I just think it would be good to keep in mind that that should be a possibility. But I have that with architecture, yes.

[01:30:46.25] - **Str4d**

Just like as another thing to throw out on that point, a complaint that I've seen in the web wallet space with gRPC is that it's actually quite difficult to interact directly with it. So there might be a desire to have a WebSocket-based  interface, for instance. But again, if everything is through the index estate service, that makes that a lot easier.

[01:31:13.22] - **Arya**

I'm also happy with this architecture I just want to mention that we should, if we're using the read state service to support the lightwallet gRPC service, copy a lot of code from Zebra RPC over because it's going to be very similar logic.

[01:31:33.31] - **Pili**

Okay, so it seems like we've arrived at consensus. It might be a good point then to move on with the call and wrap it up, essentially.

[01:31:45.37] 

Thank you very much for your time and attention during this call. And the next one will be on October 3rd at 21:00 UTC. See you then.

____


### Attendees

+ Alfredo Garcia 

+ Dodger 

+ Elise Hamdon

+ Daira Emma Hopwood

+ Jack Grigg

+ Paul Dann

+ Amber O'Hearn

+ Arya Solhi

+ Conrado Gouvea

+ Jon Rouach QEDIT

+ Marek Bielik

+ Pacu

+ Rene Vergara

+ Vivek QEDIT

+ Za Wilcox

+ Arlo Idky136

+ Daniel Wolande

+ Mariusz Pilarek

+ Natalie Eskinazi

+ Oscar Pepper

+ Vito


**Next Meeting Scheduled: 21:00 UTC October 3rd 2024**


___
___
