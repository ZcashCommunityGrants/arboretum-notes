# Arborist Call #63 Notes

Meeting Date/Time: October 19th 2023, 15:00 UTC

Meeting Duration: 30 minutes


**Agenda**: 

+ [Welcome and Meeting Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#0-welcome-and-meeting-intro) 

+ Zebra Update - [Zebra 1.3.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#1-zebra-update---zebra-130)

+ ECC Core Update - [Mobile SDK 2.0.3 & Edge Wallet integration](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#2-ecc-update---mobile-sdk-203--edge-wallet-integration)

+ Research & Implementation Update - [ZSA update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#3-research--implementation-updates-i-zcash-shielded-asset-updates) / [Trailing Finality research](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#3-research--implementation-updates-ii-trailing-finality-research) / [FROST](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2063-Notes.md#3-research--implementation-updates-iii-frost)


Video of the meeting: [recorded]

Moderator: Pili Guerra 

Notes: Jason Rogers


___



## Full Notes



### 0. Welcome and Meeting Intro 

[00:40] - **Pili**

This is a bi weekly call where Zcash Protocol contributors meet up to discuss the update timelines and process, protocol research and development efforts, design and implementation of new protocol features, and to identify blockers and any unresolved issues.

[00:58] 

The purpose of this is so that we can make Zcash Protocol development accessible to interested parties and provide transparency to the community. So if you want to attend, you can register at [zcasharborist.org](https://zcasharborist.org). If you want to become more involved and present an item, you can email us at arboristcall@zfnd.org and we'll provide a presentation slot for you. And then outside of the Arborist call, you can participate in the Zcash community in a number of ways.

[01:30] 

There's a number of grant programs available, you can take part in community discussions in the Zcash Discord or the Zcash Community Forum, and there's clickable links for all these at [zcasharoborist.org](https://zcasharborist.org). 

___

### 1. Zebra Update - Zebra 1.3.0 

[01:59] - **Marek**

So earlier this week we released [Zebra 1.3.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.3.0) and this release contains three interesting user visible updates. The first one is that the Spend-before-Sync feature is fully supported. The second one is that we enabled progress bars in the default build, so users don't have to compile Zebra with special compilation flag.

[02:40]

The progress bars are enabled by default and users will need to enable them in Zebra's config file. When you enable the progress bars, Zebra will show you these progress bars in your terminal instead of the log output, and the log output is redirected into a file. The last update in this release is that we fixed some performance bugs in some mining related RPCs. Specifically, when you requested network solutions over a large amount of blocks, zebra would take a long time to return the result, so that is fixed. After the release we merged a PR that enables all the mining related RPC's in the default build, so users won't need to again compile Zebra with a special flag to enable mining, but it will be supported by default. But this is going to land in the next release and that's all about it in the last few weeks.

___

### 2. ECC Update - Mobile SDK 2.0.3 & Edge Wallet integration

[04:57] - **Zooko**

Great. Welcome back. Since two weeks ago, we released SDK's 2.0.2, which fix a few more bugs. We've released several updates of the Zashi private beta, and if anyone wants to help test the private beta, reach out to me. The changes in Zashi are implementing the UI.

[05:31] 

We have a whole new UI design and it's partially implemented, and we've been releasing it to the private beta testers as we go. I think we made a zcashd release since two weeks ago three weeks ago? We're already up to date on that one. We've gotten a lot of really good help from our wallet developers Nighthawk, Edge, and Unstoppable. They're all three making good progress. I invited them to this meeting to explain in their own words what their plans are, because I can't necessarily relay it accurately, but I only invited them five minutes ago, so I don't expect them to show up.

[06:16] 

But they have all three been doing quite a lot of work integrating the SDK to enable Spend-before-Sync and to upgrade their wallets to support that. Expect them to ship results soonish. And they've been giving us lots of good bug reports and requests and things. So at the moment, we have fixed one more bug in the SDK. We've started the process of releasing SDK 2.0.3, and we've also gotten a new bug report from Edge. So there's at least one more bug in the SDK, but we'll probably release 2.0.3, like, today or tomorrow, and then probably fix that last bug, the very last one, and then release SDK 2.0.4 maybe next week.

[07:05] - **Paul Puey**

Does that bug include the one just reported by Matt? This is Paul from Edge, by the way. Sorry, i'm in my car. You just caught me just kind of in the middle bringing the kids to school.

[07:15] - **Zooko**

Yeah, thanks for jumping in in the middle of bringing kids to school. I really appreciate you jumping in. Did you hear me just saying that I wasn't sure I could accurately relay your plans to the rest of us?

[07:26] - **Paul Puey**

I heard you say that and you mentioned 2.0.3 and their last few bugs and whatnot.

[07:30] - **Zooko**

Yeah, that's the last last one that hasn't been fixed yet. So 2.0.3 is going to come out today or tomorrow without that fix.

[07:42] - **Paul Puey**

Without that fix, got it.

[07:43] - **Daira Emma**

Which one was that again?

[07:46] - **Zooko**

It's the one I pasted into our private slack an hour ago. That's the one that we haven't yet diagnosed. While you're here, Paul, and dropping off your kids at school, can you summarize your plans for Edge's support of new, improved Zcash functionality?

[08:13] - **Paul Puey**

Yeah, I think we've got pretty much on the roadmap. Basically we're entirely just blocked by whatever functionality is in the SDK for full support of everything under the sun. So at this point, we've got unified addresses mixed with automatic autoshielding into the app. Full memo support both send and receive detection of memo support. I'm not sure what obviously any of the shielded pools that are supported by the SDK we'll support.

[08:44] - **Zooko**

That's Sapling.

[08:47] - **Paul Puey**

I don't believe there's anything else. Obviously, the faster sync helps, although in our at least anecdotal testing, for a lot of users especially if they created a wallet quite a while ago, like a year plus ago, it still could be pretty darn slow to sync from scratch. That includes some of my own personal wallets, but at least it's a notable improvement, although it's still a little bit laggy. But yeah, that's kind of the roadmap that we've got is whatever the SDK supports, we currently have the plan of support, and that's just something I'm not aware of on the roadmap for the SDK.

[09:31] - **Zooko**

So when wen when are we supporting it?

[09:36] - **Paul Puey**

It's actually testing right now. Yeah, well, we'd be shipped, except the SDK itself wasn't ready, so we're ironing out the bugs. Right now we have a freeze to push to the store tomorrow, which should be available by early next week at latest, because Apple could take anywhere from a few hours to a few days to approve. But the new SDK would be in the stores by at latest Monday, Tuesday next week.

[10:05] 

Our only concern is know we updated and then another bug showed up and our developers are having to fix it. So the issue with transactions missing was reported when we tried to resync, all transactions were showing except  that when we hit resync, it didn't actually resync the wallet. An update was given to us such that the resync does work, except not all transactions show. So we're kind of now having to hack around that and the concern being is how much work does that entail and will that cause bugs? Because we're very late in our release cycle, meaning that we were code frozen about two weeks ago and entirely in testing.

[10:55] 

So the idea is that we don't put in major changes in the middle of testing a release candidate, and these changes end up being somewhat major and potential cause for regression. So you kind of see where we're stuck in this. Ideally two weeks ago, we code freeze, we test very minor things to update, and things are all hunky dory. But having to go through two updates of the SDK in the middle of release candidate is kind of our concern and whether or not things might slip.

[11:24] - **Daira Emma**

Okay, noted.

[11:27] - **Paul Puey**

Yeah, that's where we're at. Ideally, we'd be live by early next week.

[11:37] - **Zooko**

Okay.

[11:38] - **Daira Emma**

So the most recent bug we fixed which was something that affected only the Vtransactions view and could cause notes to be merged when they shouldn't be. So that was done as a point release or is being done as a point release. So that shouldn't affect the API's or anything like that. It's just a bug fix.

[12:11] - **Paul Puey**

Understood. Can you share whats going to the 2.3? What's getting fixed there?

[12:18] - **Zooko**

That's a different bug that's not the one you reported.

[12:23] - **Paul Puey**

Got it, okay.

[12:26] - **Zooko**

All right. Thanks for the update Paul.


___


### 3. Research & Implementation Updates i) Zcash Shielded Asset updates

[13:08] - **Vivek**

Hi, everyone. So, yeah, I think in terms of the Zcash Shielded Assets, we have, I think, an exciting update in that we are pretty much ready with the circuit optimizations that we've been doing on the ZSA protocol circuit. I think we have PR's open on the halo2 and the orchard crates. I think they should be ready really soon for the Zcash team at ECC and others to review and let us know how that's going so that's exciting.

[13:49] 

Based on the ZIP's, I think we are pretty much like we are in the final stages of getting our draft ZIP's for the transfer and the Issuance, which is like [ZIP's 226 & 227](https://github.com/zcash/zips/pull/680) merged. Into the main zcash repo. Which is nice, because then, rather than just having its stubs and looking at it from our pull request, we now will have it with the main all the other ZIP's and yeah, it looks good. It looks like we are close to having everything.

[14:25] - **Daira Emma**

That's just waiting for my review which I will try to do today or tomorrow.

[14:31] - **Vivek**

Yeah, thanks. I saw you had done some comments. I think I resolved pretty much all of those, but yeah, I'll keep an eye out for your further comments. In our last meeting, I discussed that we shifted from choosing the issuance authorization signature scheme. It used to be a redpallas signature. We shifted to using the [BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki) Schnorr signature instead.

[15:00]

So we've added those changes in our ZIP's. I'm still working on adding that to the implementation and that will be added into the Orchard crate. Our changes to the Orchard crate in the coming, that's one of the things we are working on. So there's work that's kind of still in progress with moving all the work that we've done in the Orchard crates and stuff under feature flags and moving it to separate, transaction v6 sort of data structure and getting that in so that, basically the feature flags are helpful because then we can sort of get the stuff merged into the repo as well then we can slowly get things working without affecting the actual functionality of the stuff that's all perfectly fine.

[16:00] 

Other than that, I think we are also working with the Zebra Team, and we are looking at making a wallet that will have first support for just v5 transactions and then further also the ZSA stuff. So that's also exciting work that we've begun to get us ready to switch to using Zebra instead of Zcashd. I think that's pretty much my update for this time. Thanks.

[16:48] 

Actually, just quick, I think I didn't mention that we've also been working on the asset swaps project. So I think we have a draft document that's pretty close to I think what we think is a good initial ZIP structure. So that's also something that hopefully pretty soon we'll be able to send it out to people at ECC and then look into getting it as a draft ZIP and things like that. That's coming soon. Thank you.

___

### 3. Research & Implementation Updates ii) Trailing Finality Research 

[17:35] - **Nate**

Hello, okay so the status here is that the Crosslink design seems fairly complete as a first draft and this includes security arguments for liveness and safety.

[17:58] - **Daira Emma**

The one for safety isn't complete, the one for liveness is.

[18:03] - **Nate**

Oh, okay. So that's still in progress. The [high level book](https://electric-coin-company.github.io/tfl-book/), we're in the midst of sort of updating that to integrate Crosslink and link to the Crosslink documents. Then we are starting to try to move more of our development out into the community. So one thing we plan to do is switch our development conversations over to the R&D discord.

[18:38] 

So in the Proof of Stake Channel, you'll begin seeing discussions, know, PR's to the book content, or work on a [simulator](https://github.com/zcash/simtfl) that we've started and discussions about that. So if you're interested, go show up in the R&D discord Proof of Stake Channel.

[19:02]

Our next sort of high level goal that we hope to have done by next Arborist Call in two weeks would be there's a revision of the book that's updated to refer to Crosslink, and all of the content is consistent with Crosslink. And hopefully we could have the safety argument complete by that time. Does that seem possible to you?

[19:28] - **Daira Emma**

Yeah, that seems realistic.

[19:30] - **Nate**

Yeah and then additionally, we have a simulator we are just starting and improving.

[19:39] - **Daira Emma**

Do you want me to talk about the simulator?

[19:41] - **Nate**

Yes, go for it.

[19:43] - **Daira Emma**

So it's a discrete event simulation so it can run the network faster than real time, because it's not actually doing the time delays and where at the moment, it's got a basic implementation of a network with message passing and I'm just working on the abstractions for the best chain protocol.

[20:12] 

So that's a simulation of Zcash's current proof of work protocol. Obviously, because it's just a simulation, it doesn't need to be as detailed, but it needs to account for the things that could potentially complicate the TFL design. So it needs to simulate UTXOs and it will need to simulate anchors and nullifiers and note commitment structures in less detail than the actual implementation, but enough to show up the potential problems.

[21:04] - **Nate**

Yes and then finally I posted the link to the [book rendering](https://electric-coin-company.github.io/tfl-book/) in the chat there. So if you go read that now, it's going to be somewhat inconsistent with Crosslink, but the high level details, like the motivation, why we're taking this approach, what the goals are, are accurate. In two weeks hopefully it'll be consistent with Crosslink. So if you're interested in just getting an overview of what we're doing, you can check out that link. If you want to follow the fine grained details, you can show up in the R&D discord or head over to the GitHub repository. And that link is in the book under a section called 'Getting Involved'.

[21:58] - **Daira Emma**

Did we talk about the DAG? So the way we organize development at ECC and also ZF use this as well, is to have a directed graph of dependencies between tasks and issues. So you can see that it's public for there's one for TFL's, one for Zcashd and the wallet code and so on. So they are all at let me see what URL it is. I'll paste the URL into the chat.

[22:40] - **Nate**

Oh, thanks. I didn't realize that was already published for TFL. But that's great.

[22:45] - **Daira Emma**

Yes it is.

[22:49] - **Nate**

Right. So that will be a fairly fine grained way to see sort of what we currently have planned and what progress we're making along those issues.

[23:04] - **Pili**

Marek, you have a question?

[23:07] - **Marek**

I tried to find the simulation, but I didn't see anything. Is that public?

[23:14] - **Daira Emma**

It is public, yes. It's on GitHub at [zcash/simtfl](https://github.com/zcash/simtfl)

[23:24] - **Marek**

Okay, thank you.

[23:27] - **Daira Emma**

You're welcome.

[23:32] - **Pili**

Exciting stuff. I look forward to reading the latest when it's out. Any other comments on Trailing finality or questions?

____


### 3. Research & Implementation Updates iii) FROST

[24:59] - **Pili**

So we've been waiting for the final audit report to be published. So we just had a few final comments. We wanted to add to the final report, but I think those are resolved now. So once NCC publishes publicly, we can share with the community, but it's all good. So we're happy with the outcome and just watch out for this in the next few days, a week or so.

[25:28] 

So now we've got the audit report, well, the second audit, the next step will be to release a stable release candidate. So we've got an API, which we think is stable, but we'd like to release candidate, get some comments, some feedback from any potential users in case there are any final changes that need to be made and then if we don't get any feedback within a month or so, then we'll just tag a stable release with a stable API.

[26:04] 

We had a community call last week and following on from that discussion, we've been thinking about first, how do we want FROST participants to communicate during the various different stages in the protocol? So we're still not sure. We're looking into using various different libraries, various different peer to peer protocols. But we've decided whilst we do that investigation on the side, we've decided to start off with simplest use case, which we think would be using a trusted dealer.

[26:37] 

So centralizing communication with the trusted dealer, and just having a single user essentially managing the key shares between their own devices. So then probably for a key share recovery use case. So we're going to try to implement that first, share that with wallet developers, with any community members that are interested, and see how we iterate on the more difficult use cases and hopefully come up with some solutions for the communication in real time.

[27:11] 

On the reference implementation, we've implemented a feature, well, an option to disable cheater detection during the signature aggregation phase. And I think that's pretty much it. I don't think I have anyone else from the FROST team that can add anything else. Does anyone have any questions about that?

[27:32] - **Daira Emma**

So what was that option about cheater detection? 

[27:39] - **Pili**

So we have implemented cheater detection, which means that the coordinator needs to store the verifying shares for the public keys. So we've had an option to not have to do that, so to not have to store the verifying shares. And so therefore you are not able to identify which participant is responsible if the verification of a group signature fails. So that just turning off the potential for that.

[28:08] - **Daira Emma**

Yeah. So you can tell that someone cheated, but not who.

[28:12] - **Pili**

Yes.

[28:15] - **Daira Emma**

How much overhead does the cheater detection result in?

[28:20] - **Pili**

No idea. You'll have to ask Conrado or Natalie one of them, but I can find out for you.

[29:28] 

Thank you very much to all participants and attendees. Next Arborist call will be at a later time of 21:00 UTC. This may or may not be at a different time than what you used to. If it is at a different time it's probably earlier, but don't trust me. Just please check your calendars carefully. So until then, goodbye everyone and thank you again.


_____


### Attendees

+ Jack Gavigan

+ Dan (decentralistdan)

+ Zooko AtECC

+ Paul Puey

+ Daira Emma Hopwood

+ Marek Bielik

+ Nate ZEC

+ Vivek (QEDIT)

+ Francisco Gindre

+ John Bruhling


**Next Meeting Scheduled: 21:00 UTC November 2nd 2023**
___
___
