# Arborist Call #75 Notes

Meeting Date/Time: July 25th 2024, 21:00 UTC

Meeting Duration: 1 hour 40 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ [ECC & ZF NU6 Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#1-ecc--zf-nu6-update)

+ Zebra Update - [Zebra Updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#2-zebra-update---zebra-updates)

+ ECC Core Update - [ZIP 320 / zcashd 5.10](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#3-ecc-update---zip-320--zcashd-510)

+ [ECC & ZF zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#4-ecc--zf-zcashd-deprecation)

+ Research & Implementation Update - [Zcash Shielded Assets Updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#5-research--implementation-updates-i-zcash-shielded-assets-updates) / [Zcash Shielded Assets Asset Swaps](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#5-research--implementation-updates-ii-zcash-shielded-assets-asset-swaps) / [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#5-research--implementation-updates-ii-frost-update) / 

+ Open Announcements - [Trailing Finality](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#6-open-annoucements-i---trailing-finality) / [ZCG Coordination with Node Implementers](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2082-Notes.md#6-open-annoucements-ii---zcg-coordination-with-node-implementors)


## Decision & Action Items

i)  Schedule meeting with anoyone interested to assist zcashd deprecation
ii) ZCG to attend Arborist Calls to discuss proposal details 
iii) Conrado to discuss API changes with ECC


___
Video of the meeting: [recorded]

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes

### 1. ECC & ZF NU6 Update

[00:03:40.10] - **Kris**

From the ECC side, since both of the finalist proposals for development fund allocation after NU6 involve a funding stream-based mechanism that feeds into an in-protocol lockbox. We're implementing the underlying lockbox functionality so that it will just be a configuration change effectively in order to implement whatever proposal is finally decided on. And I believe that folks at ZF in Zebra have made the same changes.

[00:04:24.23] - **Daira Emma**

There's another thing to do if we intend to include my draft ZIP. About blocks balancing. That should be pretty straightforward it's really just maybe one or a few lines in the consensus code and then a bunch of tests.

[00:05:26.07] - **Arya**

Just to confirm, Zebra is in the same position as zcashd right now. We have PR open that essentially implements everything except for a few parameters that still might change because the ZIPs are in draft.

[00:05:44.23] - **Pili**

Any news on when we might have more clarity? I know there's the runoff poll, but I believe I haven't seen any results from that. So I guess when's the runoff of polls?

[00:05:58.53] - **Daira Emma**

I'm hoping that on the zcashd side, that PR and another PR for the lockbox balancing will be ready by the time of the outcome of the poll. So it'll just be a matter of selecting the relevant option and then implementing it.

[00:06:17.36] - **Str4d**

The options only affect configuration parameters in the PRs. So right now, the focus with regards to the PRs is just making sure that the zcashd and zebrad PRs implement the same thing, that they're not inconsistent with each other. Then as far as timing goes, I believe the run-off polls are all roughly targeting Monday next week for there because there's a zip editor meeting that we were going to finalize things in as Tuesday next week, which would then mean that hopefully by later next week, we're situation where both Zebrad and zcashd have have agreement on what the implementations and what they've implemented, and we can then set the test and activation and get that rolled out.

[00:07:16.52] - **Daira Emma**

Str4d is, from the zebrad point of view, is that 8th of August date still realistic?

[00:07:24.05] - **Str4d**

It's irrelevant to the ZIP editors. What matters there is the full node. From the ZIP editors point of view, once the run offs are done and we have clarity from that in terms of which parameters get done, we ensure those parameters get into the relevant drafts, we assign the ZIP numbers, get those up as proposed, and with any remaining edits that need to happen, and that's there.

[00:07:55.11]

The question is whether the full node implementers believe that given that we won't have the finalized things to enable activation until Tuesday next week, whether there is enough time between then and August 8 to get the remaining implementation work done, go through their respective release processes, get them out to the people who are participating in testnet, and then get everyone upgraded to testnet in time for 8th August. That seems a little tight.

[00:08:29.54] - **Daira Emma**

Yeah, that's how I would describe it as well.

[00:08:46.12] - **Str4d**

Mostly just comes into how quickly the releases can get out after the code is done.

[00:08:55.19] - **Daira Emma**

There's enough time before Tuesday to have all the tests working on regtest. I wouldn't anticipate that this testnet is going to show up any problems, but obviously, that's the point of the testnet activation to discover and anticipate some stuff.

[00:09:21.41] - **Pili**

We were hoping to get a Zebra release out by the end of next week or very early the following week. So if the testnet activation is on Thursday 8th, we're trying to get Zebra out the previous Friday or the previous Monday, but we'll see how everything goes. 

[00:09:52.14] - **Alfredo**

Yeah, I was wondering if can we change the testnet activation? That's one question I have. The other one is, so right now the ZF into Zebra and the ECC into the zcashd has an open PR for the lockbox. So I was wondering if the plan of the ECC is to merge that to main and then do the changes as needed or to wait until we have everything before merging or if that is even relevant.

[00:10:30.07] - **Daira Emma**

I had anticipated that you would wait until Tuesday before merging that because there's not really much point in merging it while we don't know the relevant option.

[00:10:45.05] - **Str4d**

The main thing here is it depends on how it's implemented in terms of configurability. I don't believe the funding streams in zcashd are like regtest configurable. Only the network upgrades are. So whatever we merge in is the thing that then regtest would be testing against.

[00:11:06.56] 

Whereas we can and will merge the PR without a testnet activation height and just be testing locally against regtest. So to Alfredo's point about, can we change the test activation? Well, we don't change it. We just don't set it until we are right at the point of doing the actual releases. We can target attempting to get things out for August 8, but what we should really just be doing is keeping an eye on each other in terms of getting our PRs in and getting our release process ready.

[00:11:40.01] 

Then once we're both at the point of having releases with the button ready to go, we can then set the activation heights, pull that in, and go ahead, and at that point, confirm what's realistic to actually hit.

[00:11:56.28] - **Daira Emma**

I think in zcashd, we do have some tests that target it, testnet. So it's obviously a local in-process testnet.

[00:12:04.27] - **Kris**

We do. And in fact, it's only with respect to the testnet config that our zcashd tests test funding streams at all. Right now, there are no regtest funding streams configured. That's something we may want to change for this.

[00:12:28.01] - **Daira Emma**

Testing on that, that process local testnet, it's slower, but it works fine. So we might as well do that. 

[00:12:41.53] - **Kris**

Those tests aren't done using the RPC test framework. They're, they're Gtests. So they, they don't suffer, some of the problems. They're doing things, taking up little bits and pieces in a different way. 

[00:13:03.42] - **Pili**

Okay. Anything else?

[00:13:08.01] - **Daira Emma**

So there was a question about, can we change the activation time? Yes, we can up to the point that we release either zcashd or Zebra, whichever releases first. 

[00:13:35.25] - **Alfredo**

So, yeah, I had another question that it was, so for NU6, we have the log box and we have the changes to get block subsidy output that we discussed. Do we have something else in regards to code changes?

[00:13:56.42] - **Daira Emma**

So have the ZIP editors decided or have ECC and ZF decided whether the box misbalance ZIP is getting into a NU6?

[00:14:15.21] - **Str4d**

My belief is we had.

[00:14:18.12] - **Daira Emma**

I just don't remember there being a formal decision about that. If there has been, then it should be assigned the ZIP number

[00:14:30.26] - **Str4d**

Well, all the ZIP number assignments were going to happen on Tuesday.

[00:14:35.10] - **Daira Emma**

Oh, I see okay. It would be useful to know because if that is getting in, then  I can work on the ZIP for the activation. Why was asked?

[00:14:53.43] - **Str4d**

What activation?

[00:14:58.54] - **Daira Emma**

The deployment ZIP for NU6.

[00:15:02.41] - **Str4d**

There's already a ZIP draft up for the deployment.

[00:15:05.32] - **Daira Emma**

All right.

[00:15:06.06] - **Arya**

It includes the client basis balance ZIP.

[00:15:09.11] 

Oh, it does. That answers my question.

[00:15:20.58] - **Jon**

Can I ask a governance question on the lockbox?

[00:15:27.20] - **Daira Emma**

Sure.

[00:15:28.52] - **Jon**

It seems like the way it's designed right now and is about to be launched is assigning the lockbox and then the mechanism that the lockbox would operate under is something in the future that will happen through another ZIP. It puts a lot of concentrated stakes on the ZIP editing process, which is already there's a lot at stake with ZIP editing, but now it's like pure money.

[00:16:11.25] - **Str4d**

No, I don't think so. The ZIP editor process is ensuring that the ZIPs that are being included into the Zcash spec are sound and have support and things from the community. But at the end of the day, it's what actually gets implemented into nodes and deployed that matters there.

[00:16:33.19] 

So the understanding that has been gained from the votes thus far in the community is that there's clear support for what's being figured out now is this precise details, but there's clear support for a lockbox where the mechanism for disbursement will be done in some non-direct funding model at a later at a later point. Now, I agree that needs to be figured out, and the next step there is figuring out what are the technical limitations on what is possible to do securely in different ways that that could be done.

[00:17:17.46]

Then with that being known, then there's the discussions that the community will have to have around the social side of that governance of the lockbox.  Obviously, all of those are on independent timelines from from other things, which is the point of the lockbox is to decouple those discussions from NU6 activation at halving.

[00:17:48.38] - **Jon**

So if I understand correctly, the argument here is, yeah, there's a ZIP process, but there's also in the end what actually becomes of Zebra and zcashd. The equilibrium removes a little bit of the stakes on that.

[00:18:09.32] - **Daira Emma**

Let me explain my understanding of how Zcash governance really works. ECC and Zf, so in general, full Node implementers, are highly incentivized to follow the specs as produced by the ZIP process. Because that gives them specs that are well-defined and implementable, and if someone accused them of just doing their own thing and ignoring the community, they can say, no, this was a ZIP. This was the set of polls that supported that ZIP and so on.

[00:19:02.57] 

So it gives them legitimacy in what they implemented in full nodes. And then the actual consensus just follows what the full nodes do in the sense that... So if you have two full node implementations, then it will be the majority chain for mining that determines which one is followed. But in the ideal case, where they're trying to implement the same thing, that would only match in the case where you have a consensus vote. Does that answer the question.

[00:19:52.14] - **Dodger**

So the role of the ZIP editors is to determine whether a proposed ZIP or change the protocol is well specified and whether issues have been highlighted, whether it's been reviewed properly for security and whatnot. The process of deciding what goes into the protocol is entirely separate.

[00:20:22.56]

As of right now, that requires agreement between ECC and the Zcash Foundation. Not withstanding anything that ECC have announced. But as of right now, that requires that ECC and ZF agree what changes should be made to the protocol. And both those organizations are committed to following the clear consensus of the Zcash community. So this process that's going on at the moment of polling and whatnot is part of that process on both sides of each organization assessing what the consensus of the Zcash community is.

[00:21:06.02] - **Daira Emma**

Yeah, I was going to ask a question about how ECC's withdrawal from the Trademark Agreement affects that. So In this particular upgrade, I think it's pretty often controversial. It will basically follow the outcome of the run-off And so it almost doesn't matter what process is being followed because the outcome will be the same. But still, it's interesting to ask what the effect of ECC's withdrawal is formally and what effect that will actually have in the future of grades. And I can't ask that question. Is Josh on the call? 

[00:22:07.07] - **Pili**

I don't think so. Vivek also has his hand up. I don't know if he wants to jump in, if we don't have an answer to that question.

[00:22:15.02] - **Str4d**

I think what Daira said was answered it. So what question I had was, post this process, there will be probably some further polls and stuff discussing the design of the lockbox in the next whenever, over the next one year, obviously much less than that to design the lockbox?.

[00:22:44.30] - **Daira Emma**

Okay. I mean, there's also the question. So assuming that the next network upgrade is any seven and it contains the ZSA changes, there could potentially It's going to be some controversy about that between the ECC and ZF. I don't anticipate any, but let's, for the sake of argument, say that there is some disagreements about what two versions of the specs that should be followed, how is that result?

[00:23:18.07] - **Kris**

Daira, Emma, I think that since the plan is for zcashdnot to upgrade at NU7 and something is shut down, I don't think that this is really going to be something that you have to worry about.

[00:23:31.57] - **Daira Emma**

Yeah, it's a hypothetical that if zcashd had continued as an active consensus node, we would have needed to talk about.

[00:23:41.54] - **Str4d**

As I said before, it comes back to what do people actually run? That's the the end deciding factor is if a network upgrade, we can do all this bloviating and put together something and be happy it's secure and things. But if people don't run it, it doesn't activate.

[00:24:04.36] - **Kris**

Ultimately, the miners have a veto if they choose not to upgrade. Miners, to some extent, the users, definitely.

[00:24:13.56] - **Jon**

Thanks for ask for further clarifications. It's an interesting process.

[00:24:20.25] - **Daira Emma**

We will need to just figure out what happens. How would the trademark is handled after this change. We don't need to do that now.


____

### 2. Zebra Update - Zebra 

[00:25:01.22] - **Alfredo**

So since the last zebra release, that was 1.8.0, which was around three weeks ago. In the Zebra team, we improved some more conflicts in our testing framework that make our tests pass more easily in the CI, which saves us some time when making changes.

[00:25:24.46]

We merged the code for the scanner that we moved into a new binary. We had that code already, but was blocked by the release. And after we did the release, we merged that. We moved it and adapted all the tests needed. We upgraded the documentation to use a scanner in the new way. We're finalize with all that for now. We added a tonic server in the zebra RPC create, which is part of the indexer work that we got started.

[00:25:55.29] 

Then after that, we shifted our attention to NU6, and we did all that work of zcashd deprecation on hold for now. So we added a new NU6 variant to Zebra without any activation height, just the types and the needed changes to make the stuff work. In the middle of that, we had an issue in lightwalletd with the getblockchaininfo RPC method that we fixed it.

[00:26:21.56] 

We also spent some time upgrading Zebra to use the new stable version of Hyper, which is a dependency we use in our codebase that changed it to a major version and that was needed some time consuming changes on our side to make it work.

[00:26:54.24] 

We use Hyper in two places in our codebase, and we are thinking on stop using it in one of them and probably in the other one. Maybe at some point, it's not a dependency for us anymore. We spent some time with that. It was last week. Then back to the NU6, we have the PR open to a logbook functionality that we were talking about, just spending six on a solution. We are synchronizing with zcashd team to produce the same output.

[00:27:36.47] 

Finally, yesterday, we merged configurable testnet funding stream, which is a feature that would allow to test a NU6 functionality with the Zebra Regtest mode. 


____

### 3. ECC Update - ZIP 320 / zcashd 5.10

[00:28:24.28] - **Str4d**

We've been primarily working on the ZIP-320 changes. We got those merged and in the process of testing them, there's a couple of bugs that we're dealing with that are exposed by the ZIP-320 logic, but not the ZIP-320 logic itself. It's things in elsewhere in parts of the stack that we are currently working through with the aim to still be able to do SDK releases, including ZIP-320 sometime next week. But depending on figuring out these bugs, we'll figure out what we can do with them. There's a couple of other bugs related to the mobile SDKs that we're also working on around detection of transparent, purely transparent transactions that we're working through. 

[00:29:28.57] - **Daira Emma**

For zcashd, So I had a PR to reduce the block action limit, unpaid action limit to zero. And that got failed because of the changes. Actually, I think it was a failing test because I hadn't updated the teststhe.

[00:30:04.23] - **Str4d**

Tests were using old fee calculations.

[00:30:07.39] - **Daira Emma**

So I need to figure that out and then we can release 5.10.0.

[00:30:16.45] - **Str4d**

Then obviously, there's the the NU6 stuff that was discussed in the previous section. Then the zcashd side then is going to target those pieces. The Rust changes. There's another PR that we're working on, and I'm trying to remember if it's been merged or not, but support from Andrew Arnott for importing accounts into the Rust wallet code bases from either arbitrary account numbers, not just sequential, and importing UFVKs to enable watch-only reports. So I've been working through the process of getting that in. I think that's most of everything that is relevant here, I think.

[00:31:13.35] - **Daira Emma**

Were we planning Can we start to include the testnet and use exchanges with 5.10.0?

[00:31:24.08] - **Str4d**

Well, that entirely depends on timing. It makes the most sense because we're aiming for the next zcashd release to be in the next couple of weeks. That will very likely just be 5.10.0, and we'll do them together. If for whatever reason there end up being delays in the NU6 code, then maybe we put out a release just prior to it with other changes that need to get out. I don't anticipate that the delays there will be significant enough to justify doing two zcashd releases.

[00:32:12.56] - **Str4d**

The other thing I forgot to mention is that we got the currency conversion lookup via Tor merged into the Rust Crates. So that will also be in the next release of the Rust Crates using Arti as the backend. Looks like on On desktop, it takes 5-10 seconds the first time you use it, and then a couple of seconds afterwards. On mobile, I think it's taken up to 20 seconds sometimes because obviously you have to bootstrap the tor node and whatnot. But when that work, that work can be cached. Normally, it's more like five seconds or so to do the queries and things.

[00:32:57.55] 

The way that it's being presented in the mobile SDKs is that there's a value you can subscribe to that has the ZEC/USD exchange rate, and then there's an API you can call to refresh it. The intention will be that you won't do the refreshing very often. You won't need to, but the wallets can obviously decide how they want to how they want to do that. But that's now been merged into the Rust codes. That will be in the next release, the Rust crates, and carry through to the Mobile SDKs. 

[00:33:30.56] - **Pili**

Any questions for the ECC?.

[00:33:38.43] - **Arya**

Yeah, so shall we plan to do more in that regard? Like sending transactions with tor or something like that?

[00:33:46.29] - **Kris**

That is entirely my intention. It's just a lot more work. So the way that this is set up is that we're using hyper and request and things to do to do HTTP requests, but it's hooked up to a custom TCP layer that redirects itself, that is hooked up to direct itself through Arti. All of this is doable with tonic as well, but there's The tonic APIs do not expose nearly as good interfaces to build this with as hyper does. There's a lot more infrastructure that I need to build to get this to work.

[00:34:26.23] - **Str4d**

Basically copying a bunch of the internals of the GRPC setup logic from inside tonic and rewriting it to instead go over Tor. So yes, it's entirely doable. It's just going to take some time, and so I'll just be doing it on the side. But the bootstrapping stuff that Tor does for currency conversion will also be directly usable for these kinds of requests. And then once that's in place, that will enable doing GRPC connections to lightwalletd through Tor exit nodes. Not We're not thinking about Onion Services yet because RT's support for Onion Services itself is still experimental, but that would enable you to do queries, which due to all the added latency, you very likely wouldn't want to do your regular block downloads and block scanning over there.

[00:35:18.24] - **Str4d**

But for transaction sending or for specific address, UTXO lookups potentially or address balance lookups, it would be useful to have.

[00:35:27.40] - **Daira Emma**

Just for people who aren't familiar with the create names. Tonic is a GRPC over HTTP2 implementation and hyper is just a HTTP.

[00:35:43.06] - **Str4d**

Yeah, so it can do Http one or two. And I think tonic users hyper under the hood. It just doesn't expect you to do weird stuff like this, so it doesn't expose any of the APIs to let you do it.

[00:36:21.22] - **Daira Emma**

So I guess I can add that we're getting Greg Pfeil, who has previously worked for ECC. We will be working on zcash deprecation, and in particular on completing the library for zcash script.

[00:37:00.36] - **Str4d**

Yeah, and other than that, the main work we've been doing in this regard is getting the transparent logic. Those bugs I referred to before, that ZIP 32 is exposing, are basically all to do with transparent handling. So the bug fixing we're doing here is also directly relevant to zcashd deprecation.

____

### 4. ECC & ZF zcashd deprecation

[00:37:23.26] - **Jason McGee**

Yeah, so there's a form thread that has the zcashd deprecation roadmap. And in that same thread, hanh [lists the APIs](https://github.com/ZcashFoundation/zebra/issues/8632) and the features that he's been relying on in zcashd. I know that ECC, ZF are doing some work on this, and then qedit's also doing some work. The Zingo Labs team has expressed an interest in helping out as well. I'm curious if there's a roadmap or a checklist that shows who's doing what and where Zingo Labs can help out, and then ZCG can allocate resources to accelerate the deprecation.

[00:38:03.41] - **Daira Emma**

That's a very good question. We should probably meet and have a more focused meeting about that, or discuss it. It's previously unexplored.

[00:38:15.15] - **Str4d**

If people are interested in helping to deprecate zcashd, there's a, well, there's a meeting that we currently are using for that purpose. But obviously, if there's additional people interested, then we can look at finding a better time to schedule for everyone there.

[00:38:36.24] 

But basically, anyone who is actively interested in contributing to that should let us know so we can schedule just a regular check-in meeting where we're doing that synchronization and keeping up on what is necessary to do. We also have the [DAG](https://zcash.github.io/developers/zcash-zcashd-deprecation-dag) that shows what our current belief is on things that need to be done. Obviously, as we make progress through it, we expand things as we learn and add more things to the graph.

[00:39:07.41]

There are things missing from this graph right now because I keep needing to and keep not having time to review Conrado's PR to fix the rendering for this so that it will pull in the zebra repo issues again, because there's obviously a bunch of changes that need to happen to zebra and various things in that realm, adding things that is currently lacking on that side. Those issues currently aren't shown in the DAG, but I will once again try and push that higher up my stack to review that PR.

[00:39:41.43] 

Similarly, anyone else in the ecosystem, any other repos, that become relevant, should also end up in this graph. But yeah, to the point of Hanh giving things that they're relying on, that's all relevant to things like issue 1395 in terms of what APIs are being that the index needs to provide. There's another issue around, there for, enumerating the APIs that zcashd currently has that are absolutely necessary. 

[00:40:33.07] 

[1350](https://github.com/zcash/librustzcash/issues/1350) is the issue there. librustzcash, determining what subset of zcashd wallet functionality is required by users in a replacement wallet, independent of how it's accessed. I did, back in April copy over the list of capabilities that Hanh had listed on the forum in that thread. So they are tracked there.

[00:40:55.05] 

Basically, if there's anyone else who's listening to this call who goes, "Oh, I use the zcashd wallet in this way that maybe you haven't thought of", go and talk on that issue.

[00:41:06.59] - **Jason McGee**

Do we use that thread to have people reach out to express their interest, or would you rather Discord?

[00:41:12.03] - **Str4d**

Okay, so the community thread is probably a good place to have that general discussion, yes. The issue I just posted is specific to the question of if you are using zcashd in a particular way. That's separate from that piece there. Then as far as R&D related stuff, yeah, the zcashd channel and the zcashd R&D Discord is the perfect place to talk about zcashd deprecation.

[00:41:41.04] - **Pili**

We also on the Zebra side, apart from once our issue is into the [DAG](https://zcash.github.io/developers/zcash-zcashd-deprecation-dag), we do have a couple of milestones of tracking issues that track the different areas. For example, we've been looking at implementing the different pieces for the new architecture for the replacement built-in wallet that is in zcashd.

[00:42:03.53] 

And then there's also things like, what do we need to support block explorers, which we're doing a little bit of work on before we switch to a NU6. And also recently, we've also been thinking about what do hardware wallets need? How do they use zcashd? And is there any functionality that we need to implement in Zebra to support that use case?

[00:42:27.12] 

I can pop in the links for the Zebra milestones and also some tracking issues on the chat as well, if anyone is interested. And the call that we currently have with the ECC for zcashd's deprecation is at the same time not just this Arborist call. So if anyone else If he's interested in joining, ping me and I'll get them added google to the Google Meet, but maybe we can change the platform.

[00:42:56.33] - **Daira Emma**

It's on the opposite week, so it's the Arborist call

[00:43:24.36] 

I think from the Zebra side, what we're more interested in is what use cases are we currently not meeting. We really need different subsets of the community to talk to us and tell us, Hey, zebra doesn't work for us for these reasons. And then we can look at getting them added.

[00:43:44.05] - **Jon**

At some point, it was discussed that the main functionality is the exchanges being able to use, right? Is this now at 100% coverage? Where does it cover? Nowhere near?

[00:44:03.01] - **Daira Emma**

Well, that's my impression. Because a Zebra doesn't have a wallet at all. That's my understanding.

[00:44:13.07] - **Str4d**

Yeah. A large part of the work being done here is to build the wallet infrastructure that then can be used in conjunction with zcashd  to replace the zcashd wallet.

[00:44:27.13] - **Jon**

Got it.

[00:44:32.20] 

Jason, that's the type of work that Zingo Labs was envisioning?

[00:44:41.10] - **Jason McGee**

I believe so. I think they're on the call. 

[00:44:46.43] - **Daira Emma**

This is AloeareV from Zingo Labs. So I was helping a little bit earlier in the year with-

[00:45:14.35] - **AloeareV - ZingoLabs**

The work we've been looking at mostly in terms of has been looking more at lightwalletd deprecation recently rather than zcashd deprecation. So it was doing a little bit of work helping with implementing regtests in zebrad earlier in the year. And from talks there, it sounded like the best for us was to focus on providing a Rust implemented alternative to lightwalletd

[00:45:45.08] - **Str4d**

Which is separately a very good thing to have.

[00:45:49.07] - **AloeareV - ZingoLabs**

Yeah, so we're also getting some funding from NYM. And we're going to be implementing a NYM server in this lightwalletd implementation as well.

[00:45:59.24] 

First of all, we're not planning to implement all of the lightwallet RPCs over NYM. Just a subset that will allow NYM shielded send and then NYM shielded sync for Zcash wallets. 

[00:46:16.34] - **Zancas**

Once regtest mode is fully supported in Zebrad, which might be the case already, we can drop Zebrad into our smoke tests, our end-to-end tests from client to node and get insight into which RPCs our light client needs that Zebrad doesn't support yet. So as soon as regtest mode is ready, we can flip it into our test framework and provide a bunch of insight into what a light client, besides Hanh's, requires for Zebrad to fully support light client infrastructure. So that's work we would be doing towards Zcashd deprecation.

[00:47:02.28] - **Jon**

I'm sorry. The light client infrastructure is the critical path for exchanges to be able to work, or is it separate?

[00:47:11.26] - **Daira Emma**

So the code that is currently used for light clients, even if we extend it to not make that light client assumption, it's going to be a large overlap in the code.

[00:47:37.30]

Even though the current code is focused on light clients, a large proportion of it is going to be needed even without making the light client's assumptions. So let's say if you run a light client on the same node as your zcashd node, and so you have the same within trust boundry, then that provides most of what you need for-

[00:48:09.07] - **Jon**

But is the target zcashd deprecation or lightwalletd-deprecation?

[00:48:19.17] - **Str4d**

We shouldn't rabbit hole on this particular topic.

[00:48:24.41] - **Jon**

I just wanted to understand what's the critical fact.

[00:48:27.23] - **Str4d**

To give a very brief answer, the work that lightwalletd does, in an architecture where we have a zcashd wallet replacement, the work lightwalletd does has partial overlap with some of the work that zcashd was doing. The general approach that we've sketched out, and there's another issue that's visible in the DAG, is to have the main consensus node. You then have some indexer service which is not doing the core consensus protocol work.

[00:48:58.09] 

If you're just being a consensus node, all you need is that. But then the stuff that blockchains use, what lightwalletd does and so on, all that work starts to fall in under the realm of indexes. Work being done, for instance, to provide Rust code to replacing lightwalletd, it won't all be directly usable, but there'll be parts of that that will also be usable for the indexer purpose, which in current lightwalletd, the Go code is talking to zcashd code that does that indexing for it. It's entirely relying on that.

[00:49:34.08]

But in the general architecture going forward, you'll have this indexer service, which may, in some deployments, still be part of the same zebrad node, or it might be a separate process. You'll have options in terms of what you wish to do there. But, logically, you'll have an indexer service that is pulling data from the core consensus node and turning it into the form that the wallet needs.

[00:49:58.08] 

Then you have the wallet, half of it, which currently in the light clients is all merged together as well. You just have the core wallet that's doing the wallet logic for what you need. Then you have the scanning logic, which is currently just done by everything being sent down in compact block form and getting very nimble guarantees of what you get.

[00:50:19.28] 

Those can be split out as well into what we roughly call a scanner service and then the wallet service. Right now, the split is roughly that the scanner and the wallet correspond to what we currently think of as a light client, and the indexer is split between what we currently think of as lightwalletd and what we currently think of as zcashd. The intention is that, at least for an exchange replacement version, you would instead have an architecture where everything except the wallet is running in one container or process or whatever. The core consensus node, the indexer, and the scanner are all running together and can be on that piece there.

[00:50:57.37] 

Then the wallet code is the separable piece. Or it might be in a particular department that they're okay with running the scanner with them as well, but the scanner piece is less relevant for a purely transparent exchange because they don't have the scanning load. The scanner will probably just be, again, as I said, just hooked into whichever one makes most sense for them.

[00:51:17.31] - **Daira Emma**

Yeah, so the current light client protocol has a bunch of limitations, especially around transparent support. It was basically designed again, only to do shielded post-sapling and only to support light client wallet. And we're running into those problems, even when we're trying to include some transparent functionality in the light wallet. And so this new architecture will be beneficial both for the the exchange case of a full node placement case and for the light wallet.

[00:52:16.24] - **Arya**

I just want to say that if anyone wants to use regtest in Zebra, it is ready with a notable missing RPC methods of invalidate block and reconsider block. And responding to Str4d, I still feel indexer is the wrong word here because Zebra does all the indexing that zcashd does already it's just providing that in a different interface it's more of a caching layer.

[00:52:40.28] - **Str4d**

It is a caching layer, yeah. I guess the point I was making is that there's a bunch of logic there that you need when you're using a consensus node in the context of a block explorer or a wallet backing case or a light wallet backing case, which if you're just running consensus nodes and checking consensus or even just operating in a mining case, you don't need any of that.

[00:53:04.22] 

That's really maybe index is the wrong word for it, but the index language just literally comes from the fact that the code in zcashd that does this was originally written for a block explorer. It was indexing the chain to do things like building look up indexes between an address and the transactions that get used in, which is completely, you don't need those indices for a full node, but you do need them if you're doing a block explorer or something that needs rapid lookup.

[00:53:33.04] - **Daira Emma**

The indexing and terminology makes sense to me. Can you be more specific, Arya, about why you don't think that's the right terminology?

[00:53:44.09] - **Arya**

I would think that an indexer builds the indices and adds them to a database, whereas in this case, Zebra already has all that information and it's just replicating it and distributing it.

[00:53:54.43] - **Str4d**

Well, in that case, then, zebrad is acting already as a partial indexer. So it's essentially partial doing what zcashdis also already doing. But I don't think that invalidates the architectural split.

[00:54:08.07] - **Arya**

No, the architecture still looks good to me. 

[00:54:18.17] - **Daira Emma**

There will be some benefits in doing it in different processes, but let's not go down there.

[00:54:27.53] - **Dodger**

To address Jonathan's I'll question directly. Replacing lightwalletd is not on the critical path for deprecating zcashd. As of today, as far as I'm aware, all Zcash light clients rely on Zebra at the backend. I'm not aware of any lightwalletd servers that run against zcashd. They all rely on zebrad. So Zebra already has the capabilities.

[00:55:00.00] - **Str4d**

I think that is false. I believe Zec rocks does both. 

[00:55:04.33] - **Dodger**

Zec rocks has a zcashd instance running in case there's a problem with Zebra, but all of the production instances are using Zebra.

[00:55:14.23] - **Str4d**

My understanding was that it was a pool that was redirected for various backends. That might have changed in the last few weeks.

[00:55:26.50] - **Dodger**

I checked this within the last few weeks. Okay.

[00:55:36.31] 

So just to reiterate, deprecating light quality is not on the critical path for deprecating zcashd. That's number one. And the second thing, I think that we've just spent a lot of time discussing something that is more about things that would be good or things that would be nice to have rather than things that are necessary for zcashd deprecation. I think it's important that we separate out what's necessary, what's on the critical path, and things that are a good idea in the abstract but aren't actually necessary for zcashd deprecation.

[00:56:08.17] - **Jon**

My question was around the exchanges, but if the users with the consumer wallets require a light client, then I'm not making this more important than that question. I was just asking specifically for the exchanges where it stood, but I'm not saying that light clients are less or more or anything like this. 

[00:56:34.51] - **Dodger**

Yes. As far as we know, exchanges rely on the built-in wallet in zcashd, and that's what's on the critical path for replacement in order to be able to deprecate zcashd so that exchanges and other heavy users like mining pools who do distribution of rewards can switch from zcashd to something else.

[00:56:59.31] - **Daira Emma**

So it may turn out that to satisfy that use case involves building things that take the place in the architecture diagram of what is currently done by lightwalletd. So it's not quite the case, but it's more complicated than saying that replacing lightwallet is not on the offical roadmap.


___


### 5. Research & Implementation Updates i) Zcash Shielded Assets Updates 

[00:58:05.28] - **Vivek**

Yeah, I think I'll give the ZSA updates today. So this is since the last Arborist call, I think We've been working on a bunch of things. One of the things is the ZSA circuit. I think we mentioned last time that we were close to submitting a PR for Halo 2. We'd split the work into an initial groundwork PR that gets all the interfaces in but doesn't make any changes to the actual stuff, and followed by something that does the actual changes to Halo 2 to generalize for Zcash Shielded Assets.

[00:58:47.09] 

So we submitted the PR for that initial groundwork change recently. And we also have, I think, the next PR with the actual changes ready. We spoke to ECC just a couple of days back, and we discussed that it's probably best to split it into, I think there's 3 parts that we are changing. And so we'll split it into 3 different PR so that it's independent pieces that can be reviewed separately.

[00:59:24.43] - **Daira Emma**

Yeah, I think that the approach that you've already taken with the process of PR will really help subject review because huge PRs are so difficult to review, especially when they're changing consensus code. It really helps a lot to break them into small pieces.

[00:59:47.09] - **Vivek**

I guess that's what we are splitting the stuff up into the 3 PRs, so that should be coming in the near future. The other thing is we've continued working on librustzcash and Orchard and the Python Zcash test vectors. I think last month it was that we were in the middle of getting the reference implementation with the test vectors working. So that's done pretty much. And we tested it against the new transaction format in librustzcash. Basically, we got that all working. That's done.

[01:00:31.25] 

We have to, clean up, just do one pass to make sure everything's clean, and then we'll probably be able to submit the PR for that as well. On librustzcash, I think we had refactored the code to move to v7 transactions, but we also got confirmation from the ZIP editors that I think there's no changes in NU6 to the transaction format. It'll just be like v6 transactions only. We are just reverting those things back to a v6 from v7. There's that and probably some other clean up.

[01:01:23.11] 

On Zebra, I believe, we had this Zcash transaction tool that's there to help with the generating Zebra transactions. I think we are close to merging the PR with the v6 work on that. I think we've done some consensus changes for NU7 for the Zebra node. I think we're also trying to get a demo out that you can interact with better with a node up in on an EC2 ECS instance or something like that. So that's also stuff that we're working on.

[01:02:06.02] 

So other thing is the ZIPs. So while I was doing the Python test vectors-

[01:02:16.02] - **Jon**

Maybe before the ZIPs, just a small thing. This transaction tool is a bit more advanced than transaction tool. This is what we use to do to test the entire ZSA today in our homegrown testnets. And this is probably what we're going to provide, is just a spin up a Docker and see how to use ZSAs and form transactions. That's the transaction tool that does that. So pay attention when you see this in a PR, that's your angle to actually using ZSAs very soon, issuing, transferring them. It's a big piece.

[01:03:12.59] - **Vivek**

That's great. For the ZIPs, on the ZIP side, I think while I was doing the test vectors stuff, I noticed that there were some places in the ZIP where there was some ambiguity or it was not super well specified. So I've added some stuff to the ZIPs to clarify that stuff and should be better now.

[01:03:35.44]

I think there was also a small change to the transaction format in the ZIP where we had the Orchard transactions, then the binding signature, and then the burn transactions. And so I moved the burn transactions above because since the binding signature also binds the burn stuff, it makes sense to have the burn stuff above and the binding signature at the end.

[01:04:01.38] 

So some things like that. Then I think on the ZIP side, there were some issues that were there that have the ZSA tag. So I've started going through those. Some basic ones have made some fixes that we'll basically merge those things into our main upstream PR and put those in together. But that's what I'll be trying to resolve over the next bit for the ZIPs. On the question of the ZIPs, We have a ZIP for the fee changes for the ZSAs, and we have the asset swap ZIP. There's not been much activity of late, and we were hoping to just raise the question to see if there's any feedback or any data.

[01:04:59.43] - **Daira Emma**

Yeah, I was going to ask about the Asset Swap ZIP. My understanding is that that involved a refactoring the transaction format to use action groups.

[01:05:15.14] - **Vivek**

Yes.


___


### 5. Research & Implementation Updates ii) Zcash Shielded Assets Asset Swaps


[01:05:16.30] - **Daira Emma**

Does it make sense to include that in NU7? I don't want to suggest anything that will end up blocking deployment of the main ZSA functionality. I'm just thinking, how difficult would it be to include that refactoring in the-

[01:05:47.04] - **Jon**

This is work that's done, I think, by December, right, Vivek?

[01:05:53.46] - **Vivek**

Yeah. So that's, I think, part of what we wanted to discuss later about we are planning to have We have work on the implementation of asset swaps done, ideally, by the end of December. We'll get to, I guess. Basically, I just wanted to raise that there are these drafts of the asset swaps and the fees. Any comments, anything so that we can finalize that and get those things also implemented soon, that would be a good thing.We'll discuss more about the Asset Swaps implementation and the grant, I guess maybe a bit later.

[01:06:37.02] - **Jon**

Maybe we can discuss it now. It's a good time to talk about it.

[01:06:43.07] - **Daira Emma**

Before we go off, the question of the transaction format, I guess we don't need to make that decision now. We can get feedback on the action group design and the asset swap design and then make a decision about whether it's a single transaction change or ends up being two transactions.

[01:07:08.42] - **Jon**

That's basically our proposal. If I make a long thread short, I'm not going to mention anything about past cancelled grants and the emotional toll that it takes to go through those those forum threads. We were suggesting to take the qedit team and the resources that we dedicate to this effort and put them behind two features. One is transaction acceptance or refusal in the form of a ZIP that we've worked on it quite a lot, but we're going to be formalizing it and proposing it. 

[01:08:12.27] 

The second thing is have a concrete implementation of asset swap now that the ZIPs have been discussed a little bit. We believe that from the concrete implementation, we'll have also concrete feedback that will allow us to do any revisions.

[01:08:31.46]

This work is basically proposed to be now and ready by early December after already iterations and work with the community. So hopefully we could... I don't know when NU7 is targeted, but we could already have a little bit of time with these features being concretely implemented to decide if this makes it or not.

[01:09:04.41]

This is the very short version of me discussing the grant proposal that we are now proposing through Zcash Community Grants. The process of discussing features with the Zcash Community Grants and trying to figure out what is the consensus in the community is not an easy one. But if anyone has a way to interact with us to make our proposals more aligned with all of the community, we're takers. That's all I'll say for now. There's a lot more that can be said over beers and longer periods of time.

[01:09:56.13] - **Daira Emma**

I just like to say that the qedit and the staff have taken this process with a great deal of grace and understanding. I know it must be hugely stressful to have a grant of that initially cancelled. We disagree on the proposal it could be cancelled, but we don't disagree. But qedit has done amazing work on ZSA's and these additional features about asset swaps and asset acceptance are very useful functionality. I don't think raise similar problems to the ones that were cause for disagreement. About the asset acceptance. Can you give us a bit of a rough idea of how it works?

[01:11:05.02] - **Jon**

The main thing there is we want to have asset acceptance while retaining privacy and unlinkability. So we have two use cases that we have in mind. One is you're in a restaurant and your friend is paying for you and you're politely saying, "No, I'll take this one". So you refuse the payment.

[01:11:34.29]

The other that's more maybe crucial is an exchange is providing an address to receive funds, and they say, "We don't want to deal with this asset, so we don't accept those being funded to us". And the main way that it's implemented is the sender sends, in a way, their intent to send the asset in an off-chain way, and then the recipient can use the swap mechanism to have their side of the acceptance be bundled together and then posted on chain.

[01:12:28.02] - **Daira Emma**

It's basically It goes on top of the swap. That makes a lot of sense.

[01:12:33.32] - **Jon**

The idea is that you would prove as the recipient that you're the correct recipient to the transaction that sent, and you prove this in zero knowledge so that you don't have linkability issues. All of these are proposed and will be discussed in a ZIP, so we can go back and forth. I don't want to take too much time, but that's the rough idea. The asset swap part is actually going through the transaction format and starting to implement this on our branches of ZSA and seeing how we can catch this up to NU6, NU7, and whatever NU we have to catch it to. 

[01:13:12.39] - **Daira Emma**

I have a a shared use case, which is just a private user, not an exchange, who has worked out the tax implications of a particular set of assets, and they want to to limit the complexity of their tax affairs and to just use those assets, and because it can be very complicated. I am such a user.

[01:13:46.40] - **Pili**

I'm going to jump in because we have less than 15 minutes left. I know some people have their hands up. If the questions are very specifically targeted towards the current implementation, current research and then implementation of zcash shielded assets, then please keep your hand up. 

[01:14:10.50] - **Pacu**

Yes. I haven't been 100 % up to speed with this asset acceptance feature. With shielded, that is easier not to be spam, but there's a lot of token spam in chains like Ethereum, where every wallet gets trash tokens.

[01:14:37.10] - **Jon**

The answer is yes. That is the motivation.

[01:14:39.29] - **Pacu**

Okay, so you can do an allowed list of tokens you know you want to or you will be trading and you will be able to not get your-

[01:14:51.35] - **Jon**

We didn't design an allow list in this ZIP, but the understanding that you hold the ability to to say, I want this token, yes or no. Basically, you allow whatever token you want. But this part of the-

[01:15:08.15] - **Vivek**

I feel that while it's not there as a list as such, I think that is something that can easily be added on top at the wallet level where you have these individual things, and then you can have a place where the wallet can basically you can have a list at the wallet level, and then the wallet should be able to block it. So for the user, it should be like a list.

[01:15:34.29] - **Daira Emma**

Yeah, I hadn't realized that it was basically a acceptance or refusal on a per transaction or per payment level, which is actually more flexible than a token allow list, but you can obviously implement the latter.


___


### 5. Research & Implementation Updates iii) Zcash Sustainability Fund Update


[01:16:37.56] - **Tomek**

Yeah, I guess I can give an update. I've been lately working on Basically, integration testing, the ZSF. I was doing that on Zebra's regtest, so I had some issues running it initially with lightwalletd, but with Arya's help, I got it to run.

[01:17:00.59]

Yeah, I guess that's pretty much it. I'll hope to start pushing some code soon. I have some parts of the code that I don't think will change that much.  Hopefully there will be something to review maybe next week.

[01:17:23.19] - **Pili**

Okay. Great. Thank you. Any questions, forward comments?

[01:17:30.13] - **Jason McGee**

I have one question as it relates to the Zcash Sustainability Fund. Kris, earlier in the call, mentioned he said if zcashd shuts down, is going to shut down at NU7, right? If the sustainability fund wants to be included in NU7, does that mean that we do not need to do the implementation for NU7? To ask this question differently, for example, if ZSAs are ready for NU7 and Zcash G deprecation is not, will zcashd be delayed to NU8, or are ZSAs also contingent on zcashd deprecation?

[01:18:08.36] - **Str4d**

The specific constraint here is that zcashd is not going to include any significant, major consensus changes. That's the constraint there. If zcashd deprecation is delayed, that does delay ZSAs. ZSF, possibly, depends on how complex the implementation gets and how much is available to do it. ZSAs is very much complex enough that the time and energy that would be spent getting into zcashd is better spent deprecating zcashd.

[01:18:50.55] 

As far as a sequencing problem, the network upgrade numbers It would just be considered guidelines in a sense. Targeting a given upgrade is more like, if we can target that one, great. But if, for example, just as a hypothetical, if zcashd deprecation took an extra two years. I'm giving a hopefully nonsensical number for a hypothetical. Then ZSAs would be delayed to that point there, but other things that are of the order of the stuff we're doing in U6 could potentially still go out in between.

[01:19:33.38]

Now, ideally, zcashd happens as quickly as possible, which is what we're working towards, and then ZSA's can get out. Then as far as ZSF goes, it's just a question of complexity within a given network upgrade as to how much change to the consensus protocol we can tolerate at any one time in terms of the review and security auditing and whatever loads.

[01:20:02.57] 

For each change to the consensus rules, if the change is well-tested and well-contained and well-specified, that's going to make it easier to get in a given network upgrade. It doesn't necessarily mean it is easy to get in a network upgrade, depending on how much other sequencing stuff is going on.


___


### 5. Research & Implementation Updates ii) FROST update


[01:20:39.57] - **Conrado**

So we've finished merged the refresh shares functionality for the trust dealer key generation, and we're working on that for distributed, key generation. The changing architecture that I mentioned last call about moving the aggregator hold back to the coordinator is done, its in review, and this will hopefully make further work easier.

[01:21:11.58] 

I'm currently working on updating our signing tool. So our FROST demo with the cache uses a signing tool which uses a Ywallet code, which takes a Ywallet transaction plan and signs it to FROST. So I'm updating it because it uses old versions of the ECC crates and also has a bunch of local changes that were never contributed upstream. So I'm going over that, updating the crates to pinpoint exactly what API changes are required, something that Pacu is also doing.

[01:21:49.14]

So I was glad to see that you're on the same page. We need basically the same things. So I'm working on that, and at some point I will discuss with ECC, this API changes and how is the best way to do them, but it's still ongoing work. 

[01:22:12.05] 

And the 2.0.0 stable release like I mentioned last time, our last release was 2.0.0 -rc0 we're waiting for feedback on the API changes. We didn't get any, so I'm assuming everyone is happy with the API changes. And we'll make, I don't know exactly when, but soon the final 2.0.0 is the release of the library of rust crates.

[01:22:37.18] - **Dodger**

 i just wanted to mention as well that the ZIP, the The FROST for Zcash ZIP needs also to be finalized and the status change the final status.

[01:22:55.49] - **Daira Emma**

I haven't had time to review that.

[01:22:58.27] - **Str4d**

Well, on that point, we did, we've been through that ZIP, Conrado did some, some updates to the draft, Kris and I looked over it. And so that's now been merged. So the current status of the draft is up on the ZIPs website. I've got a PR open with the main piece that hadn't yet been addressed from the initial review, which is dealing with how keygen works, which also ties into the PR that Pacu has open on the Orchard repo.

[01:23:31.32] 

So there's a PR up on the ZIPs repo, which is where we should be figuring out how we'll actually use FROST in the zcash key trees and zcash keys. And once we've figured that out, then I think it's mainly just in the the editorial work remaining.

[01:23:52.24] - **Daira Emma**

That's [883](https://github.com/zcash/zips/pull/883) on the zcash zips.



___


### 6. Open Annoucements i) - Trailing Finality 

[01:24:27.33] - **Pacu**

Yes, I wanted to ask a question regarding trailing finality. Do we know if there are other teams that might be interested in working on this? I'm planning on doing a privacy blog about what's the experience of using zcash on different exchanges and services or wallets that have exchanges. And I guess that this issue is really important to get an option. I guess I'm leaning towards maybe, the most important, given that I've seen 100 confirmation requirements from some exchange to actually exchange funds. Imagine how it looks like.

[01:25:27.02] 

I'm freaking out and I'm supposed to be an expert. When you see a website just having a scrolling wheel and your money is in the limbo, like nowhere. So it would be nice to see if any teams hearing this call want to chip in on this.

[01:25:46.53] 

There's some already that are thinking on working on this for a Zcash. It would be super awesome.


___


### 6. Open Annoucements ii) - ZCG Coordination with Node Implementors 


[01:26:28.06] - **Jason McGee**

So going back to qedit, I have a question about process. So one of the things that came out of this cancelled stablecoin grant is that ZCG is going to start attending these Arborist calls. Michael and I are here today. To go back to something Jonathan mentioned earlier, ZCG doesn't need community consensus to approve a grant. But what we need to know is that the engineering community is comfortable with the technical merits of the proposal, that it's implementable, and that there are no unforeseen risks like there were with a stablecoin grant.

[01:27:00.53]

I guess the question ultimately is, what does that process look? Once they look like, once they submit their proposal, we can attend these calls, we can flag it, but will you want to review the written proposal, discuss it, and then follow up with us to give us a green light? Or how do you expect... What do you just want to see come out of this change in process?

[01:27:27.40] - **Daira Emma**

This is a question to node implementers, right?

[01:27:34.24]

So the most important thing is to recognize how busy node implementers are, but they might not notice things. I think that was part of the problem here.

[01:27:53.05] - **Str4d**

So from that regard, coming to Arborist calls and mentioning things that might need attention is a good way to that interaction.

[01:28:02.32] - **Daira Emma**

So for example, I had to express strong reservations about the stablecoin thing, but I didn't know that it was an open grant for the amount of money that was involved. I didn't know what the schedule was for approving or taking account of third-party comments on that grant. I don't know whether was that clearly communicated, and I just missed it?

[01:28:39.46] - **Jon**

The nature of the grant was to do the work of getting comments from everyone and see if there's a cryptographic breakthrough that we can include so that these features can be as privacy-preserving as they can. But I'm not replaying a past match.

[01:29:02.31] - **Daira Emma**

I think we have a different view of that, but that's not really the point here. The point is, for plans going forward, what needs to be the process for ZCG communicating with the full node implementers? Yeah, just having a lower bandwidth stream of proposals to look at.

[01:29:43.17] - **Jon**

I actually have a suggestion there. It's much easier to comment on well-formed arguments that state clearly what they're trying to achieve. There's a rigorous work to ask from someone that's busy their opinion and not waste their time and the more you do work beforehand and you propose something that you already hashed, some problems or refusals that could or You have a better chance of not wasting anyone's time. That's work.

[01:30:20.55]

And so the best is, and this is what we reached, I think, with ZCG, is to make sure that anything Everything that's worked on has very early feedback on concrete proposals that have very defined 'what are we discussing' and 'why are we doing this' et cetera. It used to be the case that we could take a bet that we work on this before a grant, and then we put some of the work out there, and then the grant continues this towards implementation. Now we're a little bit more on shaky grounds where we know that some work we will do before the grant might not actually be funded. But the best way to move forward is just to make sure that the work is correctly chopped and there's points for the for engineers to see concrete proposals.

[01:31:23.31] - **Daira Emma**

I don't object in principle to there being funding even up front for very controversial proposals. I think that in this case, lots of people in the community were surprised by- I'm talking about future ones.

[01:31:48.40] - **Jon**

The past is in the past.

[01:31:50.14] - **Daira Emma**

I know. But it is relevant in the sense that the amount of funding that is committed for that exploratory work that there might be objections from the community too. It should be kept, I think. That's my suggestion.

[01:32:19.29] - **Jon**

One day we will show what we worked on for verifiable encryption and the places that this can be relevant for Zcash other than the proposed features. There's really a lot of work that went into this. But this is, again, a grant that was ultimately cancelled. The part of that grant was discussing completely other features that we also worked on, which part of them are the asset transaction acceptance. So we come with something because we worked on it also. But I guess, Jason, the best we can hope is eyeballs that look at concrete, at what we desire as a community, and then move on that.

[01:33:20.49] - **Pili**

If I can just jump in. Okay. Yeah, sorry. At the foundation, we have had grants highlighted to us in the past, and we have provided feedback to ZCG on brands, and we're happy to keep doing that, provide our expertise. As long as these are highlighted to us, we're happy to spend some time providing feedback as we have done in the past. I just wanted to add that.

[01:33:47.09] - **Jason McGee**

The way that I see this process working is that Jonathan is going to submit his proposal today. At the next Arborist call, we will attend the meeting and we will give an overview of it. We will have a discussion. I don't think we shouldn't need a green light per se, but assuming that there are no highlighted risks or no one has any issues that qedit needs to bring back to the table, then we should be okay going on with our process, considering community feedback and approving the grant or rejecting it.

[01:34:31.24] - **Jon**

At this stage, though, we don't have a lot more to describe to this call than what we described today. The rest is formalized in a proposal.

[01:34:47.51] - **Jason McGee**

But the issue is that people aren't looking at the proposals, right?

[01:34:52.01] - **Jon**

No, but I highlighted the big parts just today in the call. 

[01:35:00.40] - **Daira Emma**

Yeah, the issue was that people were very distracted with other things. And also that there were a lot of things lumped together in the same grant. And I can see part of the motivation for that. Sometimes they depend on the same mechanism & it may be easier for the grant proposal to lump things together. But in the case where you have features, one or some of which could be very controversial and the others are not, then maybe those should always have been two separate clients.

[01:35:53.01] - **Arya**

I have a separate question. Jon, you mentioned deploying ZSAs on a homegrown testnet. Is that testnet public or are there any plans to deploy ZSAs on a custom testnet before a NU7 activation?

[01:36:05.38] - **Jon**

Yeah, this is in the coming weeks. It's going to be a node that we run that you can connect to, but you will also have all the means of running that testnet yourself and connecting from different machines. We needed this for testing, and it's actually part of the previous grant we work on. It's a small remaining the piece that we need to deliver. So it's coming up.

[01:36:46.10] - **Dodger**

Yeah, I just want to express a caution about trying to jam more into the Arborist calls. As you can see, we're already over time with this call. And I agree with Jason that the problem is that people haven't been looking at the grants, haven't been paying attention to them and reviewing them.

[01:37:08.23] - **Dodger**

Maybe it might be worth having a separate call where node implementers or people who feel that they want to express an opinion on grants that may impact the protocol can attend, and then such grants can be reviewed there. I would just caution against trying to jam more into the Arborist call, given that we're already buffing up against and going past the scheduled time.

[01:37:38.01] - **Jason McGee**

Can I make a suggestion that I think complements that? And that's just having a dedicated Discord channel that we can tag people, we can paste links to the grant, we can say, please review, and then we can follow up if we don't hear anything back. Because I agree with Dodger, it would probably be cumbersome to discuss open grants during the Arborist call.

[01:38:02.47] - **Daira Emma**

I would slightly push back on this because the reason this call has gone long is that we were discussing both NU6, which is a huge topic on its own, and the ZSAs in the grant process. The actual content of the call was quite substantive in this case, but it could have been split over several calls. I'm just wary of having to attend another meeting because that is not really solving the problem in this case, which is that I didn't have enough time to review it.

[01:38:46.41] - **Dodger**

Jason's suggestion is then to have a dedicated Discord channel where people can be alerted to grants that they ought to review.

[01:38:59.06] - **Daira Emma**

I mean, there was a ZSA's channel.

[01:39:03.08] 

The fact that there was a grant was not discussed on that channel at the moment.

[01:39:14.16] - **Jason McGee**

All right, well, maybe we start with the Arborist calls, and if we find that that's eating up too much time, then we move it elsewhere. Can we agree on that?

[01:39:23.41] - **Daira Emma**

Makes sense to me. 

[01:39:34.18] - **Pili**

Well, let's leave it there. Thank you, everyone, for attending and for engaging. Next Arborist call will be on the 8th of August at the later time of 21:00 UTC. See you all then.

____


### Attendees

+ Dodger

+ Daniel (decentralistdan)

+ Daira Emma Hopwood

+ Kris Nuttycombe

+ Alfredo Garcia

+ Arya Solhi

+ Conrado Gouvea

+ Jack Grigg

+ Jon (QEDIT)

+ Michael Harms

+ Pacu ZWCD

+ Tomek Piotrowski

+ Vivek (QEDIT)

+ Jason McGee

+ AloeareV (ZingoLabs)

+ zerodartz



**Next Meeting Scheduled: 21:00 UTC August 8th 2024**


___
___



