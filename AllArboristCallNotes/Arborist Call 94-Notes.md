# Arborist Call #94 Notes

Meeting Date/Time: January 23rd 2024, 21:00 UTC

Meeting Duration: 1 hour 40 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Update - [Z|ECC Summit](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#1-ecc-update---zecc-summit)

+ [Zebra Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#2-zebra-update) 

+ ECC & ZF zcashd deprecation - [Ecosystem Patners / Zaino / Zallet Progress](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#3-zcashd-deprecation-update---ecosystem-patners--zaino--zallet-progress)

+ Research & Implementation Updates - [ZSA Integration ZIP editors meeting](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#3-research--implementation-updates-i-zsa-integration-zip-editors-meeting) / [FROST Demo PCZTs & Community Call](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#3-research--implementation-updates-ii-trailing-finality-layer) / [NSM updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#3-research--implementation-updates-iv-nsm-updates) / [NU7 Timeline changes](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#3-research--implementation-updates-v-nu7-timeline-changes) 

+ Open Announcements - [Pop Up City Movement / Zcash Dev Summit / Z|ECC Prague ](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#4-open-announcements-i-pop-up-city-movement--zcash-dev-summit--zecc-prague)

+ Open Discussion - [Sprout Pool Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2094-Notes.md#5-open-discussion---sprout-pool-deprecation)




___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=hKRk9O2Rki0)

Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes




### 1. ECC Update - Z|ECC Summit

[00:02:20.04] - **Kris**

The ECC team has just gotten back from a very productive week of discussions on in our company off-site. We have come up with a number of ideas that we're going to be presenting to the community related to things like how to approach deprecation of the Sprout pool and other things. Other news is that we are proceeding rapidly with our work on the Zallet full node wallet, getting the initial RPC services and the overall skeleton fleshed out. Look for rapid progress there as well. I think those are the major things that have happened recently.

[00:03:23.34] 
We can go into some more specifics about some of the ideas that we have for specifically, the Sprout deprecation in maybe the R&D segment here.


____


### 2. Zebra Update  


[00:03:57.16] - **Arya**

In Zebra, since the last Arborist call, PRs have merged to that, updated the getblockchaininfo method to return information about the genesis block when the state is empty. Updated the RPC client used in tests to use the new JSON RPC crate, which we just migrated to recently.

[00:04:14.46] 

A PR merged for avoiding transforming non-coinbase transaction to Zcash primitives transaction types to check if their outputs are decryptable. Added serialized NU5 test block vectors and updated a lot of unit tests, fixed new links from the the latest clipee release, fix some CI issues, and merged some preparations for deploying long living instances of Zebra on updates to the main branch.

[00:04:39.18] 

Then there is also a new PR open for fixing a concurrency bug related to automatically verifying transactions in blocks that have already been verified for the mempool. That's it.

[00:04:54.15] - **Dodger**

Thank you. Any questions for Arya? I just also want to highlight the new JSON RPC crate. We migrated from one that had been deprecated. And if anybody else is looking for an RPC crate, obviously, it might be worth considering standardizing on a single one.

[00:05:24.49] - **Arya**

Yeah, I did see that. Actually, that's what I've spent the last day or so pulling into Zallet. I'm having some trouble with it in terms of it being compatible with Zcash CLI and therefore compatible with anyone who's doing automated JSON RPC access in the same way as Zcash CLI. And this is after taking some of the compatibility pieces that Zebra has in the current main branch. It'd be good to chat offline about if there's anything else that I need to be taking into account there.



____

### 3. zcashd deprecation Update - Ecosystem Patners / Zaino / Zallet Progress


[00:06:00.47] - **Dodger**

Any other questions, comments? Okay, let's move on and talk about zcashd deprecation. So I'm not sure there's any further updates regarding Zebra, but Pacu, are you up for giving an update on the broader picture?

[00:06:28.07] - **Pacu**

Broad picture. We updated the spreadsheet with new information. We just got from one exchange and one mining pool. We are still waiting a few more to come in, and we'll be updating the public spreadsheet of RPC methods present on different partners of the ecosystem as we get them.

[00:07:05.23] 

Then in terms of Zaino and the new CLI wallet, and zcashd deprecation, Josh and ECC folks informed some delay. I don't know what they called it, but , some timeline delays on some work of zcashd deprecation and will be impacting in two months of the expected date NU7 was targeted for August, will be falling to October.

[00:07:56.15] 

It's not clear to me whether the deprecation date, which was targeted for April, if it's going to be also falling behind two months. If that's so, it will be targeting June this year. And then there was some updates around Zaino, falling a little bit behind on Milestone 2. I'm working with them to see how we can help them catch up. They are bringing in more people from projects they have ahead of schedule to help Zaino folks while I'm working with Zingo labs on that.

[00:08:49.53] 

That's pretty much the updates we have and then we should also expect to collect some code walkthroughs from ECC to be recorded, it would be similar to what the foundation did with Zebra, but for librustzcash. And the idea is to be able to get folks more involved in the whereabouts of the code base and getting maybe some review like school of reviewers, as I've called it many times, going on. So we can eventually, in time, expand our throughput on reviews and code merges from librustzcash because it's historically been a start of a bottleneck, and now it's more of a bottleneck. 

[00:10:00.10] - **Str4d**

With my ZIP Editor hat on, I just wanted to clarify for the benefit of those watching the recording who might not have context around. The August date for NU7 that Pacu referred to comes from a timeline that the ZIP editors published back in October last year. That was an optimistic timeline, and all of the ZIP editors were on the same page there that this was the timeline we showing the earliest that anything could possibly happen, mainly for the benefit of ensuring that everyone got on and helped to get through the process. There was the expectation that that would not be a target deadline, but the earliest deadline that things could reasonably occur.

[00:10:51.11] - **Dodger**

We will come on to NU7 later. Maybe if we just focus on zcashd deprecation, which I appreciate as a component of NU7, but I don't know, Za, do you want to give any more context or updates?

[00:11:07.19] - **Za**

The Zaino timeline has fallen back. Our best estimate right now is mid-May, and that still puts us a solid two months ahead of the August optimistic time for Network Upgrade 7. I do want to throw myself on the sword of saying that Arlo, who has been the lead on Zaino, has been putting in the long weeks and making amazing progress. And so all of the slippage is due to my poor estimation of how long it would take to onboard folks. But we are right now in the process of onboarding some folks. And so pretty soon we should have data on a new velocity that has new people that are fully onboarded.

[00:11:58.29] - **Dodger**

I I do have a question. For context, I'm just going to share another document, which many of you will be familiar with. So Za, the Zaino package includes the light wallet functionality, and I appreciate that may already be close to completion. But given that we already have a lightwalletd that works with Zebra, this element, I feel, isn't necessarily on the critical path for zcashd deprecation.

[00:12:38.57] 

I want to just put it out there that maybe if the other part that's necessary for supporting the CLI wallet were to be prioritized, then we might get closer to the Zcashd deprecation milestone, and therefore be able to start the ecosystem outreach quicker, and then the lightwallet work could continue on afterwards. Like I said, it's just an idea. I don't necessarily expect you to respond with that right now. And I do appreciate that the lightwalletd of the work may be already nearly complete, so it may not make a lot of sense. But I just wanted to put that idea out there.

[00:13:30.05] - **Za**

It's an interesting idea. I'd like to say a few things, and then Kris might add some comments. One thing is that the interfaces that Arlo designed that would work for the lightwalletd, they're designed as a library that can be imported into other rust crates. So a lot of that work has been upgraded to this better architecture, where it's not tightly bound to this independently running process that just is this indexer thing. So that's one thing.

[00:14:05.43] 

Another thing is my understanding, as is to be expected with working with multiple teams and components. There was some stuff that was not in the place we thought it was when we got started. And we've been able to shift. Arlo was able to shift his time to working on the lightwalletd replacement aspect while other stuff was being worked on in other teams. So the upshot of that is, I think it's essentially done.

[00:14:38.58] 

But the important insight into the architecture is that he's designed, I think, in consultation with other teams. He's designed it in a way that the bulk of the design is in this portable set of types you can import into any Rust crate.

[00:15:03.31] 

So I think it's a good idea, and I like the thinking. I like the focus of the thinking, and I think it certainly is something to stay on top of and look at things that might not be on the optimal path. But I think in this case, mostly because it's mostly already... In fact, I think it might be completely already done. I don't think it's going to get us savings that we're hoping for. But I mean, if it is, yeah, sure. Definitely, I agree that we need to have that laser like focus that you're talking about there, Dodger.

[00:15:40.13] - **Dodger**

Yeah. I've been thinking a lot about focus today. 

[00:15:44.23] - **Kris**

So there's a bit of false dichotomy there because there are a number of the APIs that we require from the lightwallet protocol that will still be required for the wallet that is operating the full node context. A good example of that is the transparent UTXO access methods. Those we need either way. And having these in a common interface where we can import Zaino as a library and make use of those methods means that we'll be ready to go there.

[00:16:25.19] 

So it's not, from my perspective, a diversion to have working on the light wallet services, because essentially the the only thing that we're not going to use is going to be just the compact blocks access. And even that, we will likely build around the compact block interface until we are ready to switch to handling full blocks. So there's an evolution path here where I think that this work is relevant either way.

[00:17:04.34] - **Za**

I think it's worth noting that it is relevant because it's idiomatically rusty and it has been implemented as a library. It could have been designed poorly. And I think props to whoever came up with the design because it's the right design. Wasn't me.

[00:17:22.46] - **Dodger**

All right.

[00:17:25.18] - **Arya**

So recently, I think Kris, you said that the plan is to use it as a library? Will it be using the read state service interface? Will it be using the service interface or the RPC interface?

[00:17:42.01] - **Za**

I could speak to that just a bit. The high-level interface is generic for different backends. So the answer is both.

[00:17:54.58] - **Arya**

`Okay. So then in either case, as long as the interface is designed, there's no reason for Zaino development to block the wallet development at all. If, Dodger, your question was about not waiting on Zaino to finish development. We would just need Zaino to be complete in order to finish integration testing and it fix any bugs that come up.

[00:18:20.36] - **Kris**

Yeah. Some of the access to the new indices that are required are things that those APIs that probably have not been designed yet. There will be some iteration on that design as we do the implementation in zcash client back-end. But that just strikes me as... We're not not quite there to make use of those new interfaces yet. So things will be progressing in parallel.

[00:18:56.25] - **Str4d**

So on the the wallet part of what's on the diagram there, so the Zallet piece. Following on from the discussions and planning that we did at the Offsite Summit, the general approach that we are pushing for here is to get Zallet into a point where it is suitable for integration into build systems and deployment pipelines and so on, basically as quickly as possible, ahead of functionality.

[00:19:31.43] 

Essentially, with it's external shell in sufficient time that we can then be parallelizing on build systems, reproducibility, and so on to enable external partners, particularly ones who are willing to give feedback, to be able to start integrating and give iterative feedback as then functionality is filled in within it. That also should help with some level of pipelining parallelization within the overall timeline.

[00:20:03.10] 

We're not expecting to have Zallet be feature complete before people are able to bring it into their test infrastructure. This will also then mean that any feedback we get from that test infrastructure will be able to fold into the feature development as it goes on rather than needing to necessarily duplicate work in a couple of months time if anything blocking within the ecosystem usage becomes discovered.

[00:20:33.40]

I'm also looking forward to the integration with zebrad into the existing test frameworks from the zcashd RPC test, for instance, to also provide this iterative feedback as the internal features get developed.

[00:20:55.11] - **Dodger**

Do you have a timeline or a target date for when it will be feature complete Str4d?

[00:21:00.00] - **Str4d**

Not for feature completeness, but we are targeting end of February at this point for all of the surrounding infrastructure being in place with the initial.. Essentially, if the use case is supported in Zashi or the mobile SDKs as a currently is, so the core loge we already have, the aim is for it to be usable by the end of February. Then starting in March is the process of the additional exposure of features that the zcashd wallet has uniquely served the community so far.

[00:21:50.27] 

Looking beyond that, it's going to very much depend on how those features develop and how quickly feedback on that is achieved, which is why we're letting the community be aware that if they want to get feedback on that, hopping in, particularly in mid-February, would be a great time to talk to us about getting into the iterative pace, because there are going to be, as has been discussed in previous calls, there are going to be some features that Zallet does not support.

[00:22:26.58] 

And hopefully, even potentially within the set of features that exchanges and that whatnot in the spreadsheets have currently expressed they are using, there are going to be some things that are just not viable to support going forward, and thus there will have to be migration pathways to enable those users to migrate their existing wallets to the new use cases.

[00:22:50.57] 

And discovering places where that migration is not possible for some constraint or other is the next thing needs to be figured out from an ecosystem outreach perspective. That's going to be harder to figure out before we have working code that they can start testing with. That's why we want to get to that core point as soon as possible.

[00:23:17.18] - **Dodger**

Okay. But obviously this is not intended as committing anybody to anything, but it feels like both Zaino and the CLI wallet will be potentially coming together. That's probably a poor choice of phrase. Probably reaching some level of a functionality where they can potentially start being linked together for at least for trial purposes in April, May time.

[00:23:55.58] - **Kris**

I would say much earlier than that.

[00:23:58.11] - **Str4d**

I would expect Zaino Zallet to be at least communicating with each other within Q1, obviously pending making sure that Zaino has what Zallet needs for that purpose. Because as Kris mentioned, we're going to be using the lightwalletd protocol initially, just because Zashi and the SDKs work fine with that right now. So for, as I said, targeting in February for that compatibility of features, we'll be fine there, but we will need Zaino for at least some of the additional functionality that zcashd uniquely provides.

[00:24:40.21] - **Dodger**

I guess that at the end of February, people could, in theory, try Can you talk about an alpha version of the CLI wallet, sorry, Zallet, with the existing lightwalletd, if Zaino is not quite there yet.

[00:24:56.07] - **Kris**

I think we want to be actually a little bit more aggressive than that. Since Zaino has right now essentially complete light wallet functionality, I wanted to start integrating it directly so that we're not accessing the lightwalletd RPC service, but instead are accessing the APIs that Zaino is exposing in the interface that Za has described.

[00:25:23.03] - **Str4d**

Logical lightwalletd access, but not actual.

[00:25:27.32] - **Kris**

Yeah, it's not RPC access. It is RPC functionality access.

[00:25:37.07] - **Arya**

Is the plan currently for the wallet to provide a proxy towards Zebra or lightwalletd so that it supports all for as many of the zcashd RPCs that users are currently depending on?

[00:25:52.21] - **Str4d**

That's going to somewhat depend on the deployment side of things and how that goes. I personally would prefer users to migrate towards being aware of their being two separate services because we know that it's not a good idea to be running the wallet code in the same process as the full node code. But we know also that in the deployments that we will have in these large ecosystem partners, it's going to be probably a 1:1 node to wallet environment, although that doesn't necessarily need to be the case. You could have environments where you have a single Zaino node powering several hot wallets, for instance. In that case, you wouldn't necessarily want to multiplex together.

[00:26:48.46] 

If they're both using JSON RPC, the new Crate, then there should be compatibility there. Then if If it was desired for it, it could be added somewhere, or there could be a separate binary people can run that will accept RPC commands and then just divert them to either zebrad or Zallet based on who's meant to answer them. I don't think that should be on the critical path, though.

[00:27:20.19] 

I think if we can encourage people to migrate to be having to service where we should, if that becomes a significant blocker, then I I don't think that writing that like, shim around the two is too big of a lift, but it's not something I want to focus on right now.

[00:27:39.01] - **Arya**

So stepping back, the motivation for this is just the RPC test, Alfredo, at some point, I think a few months ago copied over all the RPC tests, but commented out all but a handful because the vast majority of them were less. We either have to update those or we're going to need a shim.

[00:27:57.22] - **Str4d**

Well, so my thinking there was that the RPC test's Python side can just be that shim. So literally the shim I just described of having... We know that some RPC names will be served by one RPC and some methods will be served by another. So in the node abstraction that the RPC test had, because the RPC test assume one wallet per node, and there's no point in breaking that for this integration. The back-end that sets up that node would under the hood set up both a zebrad and Zallet as set up an interior architecture, and then it would just route it to either zebrad or Zallet as appropriate. Essentially, would be the the shim I was describing, but at a small test level rather than something that's intended for production use.

[00:28:46.04] - **Arya**

Okay, that works. Thank you. 

[00:28:51.20] - **Pacu**

Yes, something that we discussed last week is to aim for an an early deployment of artefacts that different partners could start importing and testing because there is a whole deployment scenario outreach that str4d just mentioned, and I think, Dodger you did too, that we need to find out.  It's easier to maybe just create some infrastructure that Yasser, maybe, and Emmersonian can chip in as well, since they are already teaming up on these matters to create whatever infrastructure examples or Kubernetes or Helm containers or docking containers that different partners can just grab and try to fit into their existing infrastructure. And maybe if there are things that don't work for them, just file issues. 

[00:30:09.28] 

it will be maybe more effective approach instead of asking them theoretical questions of what it will be convenient for them. We are already doing that on the new outreach form. We got some suggestions or things that they would like, but I think having something their DevOps can just play with, it's far better.

[00:30:38.31] - **Dodger**

Better its Dockerized for them to be able to deploy release.

[00:30:41.49] - **Kris**

I was just going to say that what we are intending at this point is a Docker-first deployment strategy where the simplest possible thing will be you run a Docker Compose and you get the services spun up with the correct shared back-end data store and the correct shared, the correct back-end network and so forth. Building that out through Helm or whatever is appropriate for the more production deployments is also something that we're essentially starting on essentially immediately as soon as we have the Zallet service responding correctly to requests. Responding correctly to request of any sort, just responding to an RPC call.

[00:31:35.41] - **Str4d**

The crunchy outer shell I described earlier without all of the gooey internals.


___


### 3. Research & Implementation Updates i) ZSA Integration ZIP editors meeting

[00:32:11.59] - **Str4d**

I can give a brief status update if desired.

[00:32:16.26] - **Dodger**

Okay.

[00:32:18.26] - **Str4d**

We had the ZSA integration meeting early this week. The main thing that came up. There was an audit concern around how a particular constant was generated, and so we were able to clarify the... It looks like there might have been a little bit of API documentation that could be improved there to make it clearer as to what was going on there. We've clarified that up. Everything else, as far as I was told in the meeting, otherwise, seemed to be going smoothly.

[00:32:56.17] 

We talked about the integration process for for the ZSA zips. We've already started on the reprocess for those. We just got EC, we just got in the Zcash node encryption changes, for instance, in that. There is a lot of code to review. I think some of them are like 20,000 lines. It is going to be fun. But yeah, so progress being made there.

[00:33:21.43]

We also talked about the changes that Qedit proposed for integrating the atomic swap-related transaction changes into the V6 transaction format preemptively so that we don't have to go through another transaction forma tchange there. I conveyed to them the design that the ZIP editors have come up with for how we're going to do the sighash changes for NU7 such that we do not need to define what the sighash changes will be for atomic swaps right now while we don't have semantic stability on atomic swaps.

[00:34:04.32]

We're all on the same page there. At this point, it's just the next steps there are making sure that the transaction-related changes are sound and cover everything, and then just integration work that is being continued on.

[00:34:24.56] - **Dodger**

A bit of an aside, during a fever dream I had over the Christmas holiday, I was thinking about, it would be great to define transaction formats in some, something like XML or some standardized language, and then make it super easy to in the future deploy support for new transaction formats in an easier fashion. But that's probably a topic for discussion over beers and tequila.

[00:35:18.10] 

Okay. I know that Daira is currently recovering from some nasty jet lag after their flight was delayed twice, I believe. Or even cancelled twice. So unless, Jason, you want to provide an update, we can move on.



___


### 3. Research & Implementation Updates ii) Trailing Finality Layer

[00:35:38.15] - **Jason**

For crosslink. Yeah. So Zooko and Nate are unable to make today's call. But I wanted to introduce everyone to Sam Smith, who is Shielded Labs' new engineer. He's on today's call. And Sam and Nate are turning their attention towards building a prototype for Crosslink, and they'll have an update on the next Arborist call on February 6th. Cool.

[00:36:02.59] - **Dodger**

One thing we've been talking a little bit about at ZF is thinking about what changes we might potentially, or what refactoring or whatnot we might want to make to zebra. And this is obviously forward-looking post, I think, the main thrust of work for NU7. But to make it easier to to change the consensus mechanism, to plug in different consensus mechanisms. Because we can imagine people wanting to spin up a test net to test maybe different types of... To test something like the ZSA or atomic swaps functionality, but would rather not have to deal with mining and might want to use something else instead. So at some point it'd be worth, I think, exploring that. But like I said, it's likely to be after the main thrust of the NU7 effort is complete. 



____

### 3. Research & Implementation Updates iii) FROST Demo PCZTs & Community Call 


[00:37:19.14] - **Conrado**

We've been working on adding broadcast channel support for the demo for the Frost client tool that we wrote. We also updated the documentation for the demo. We updated this dev signing tool that we have that basically allows you to sign a transaction plan generated from YWallet using something that you have signed it somewhere, which in case is Rust.

[00:37:58.35] 

So this tool wasn't working post NU6. We just had to update the ECC dependencies. So we did that. It's working. So basically, that's it. We just have a couple of cars to finish review, but with that, we'll be mostly done with the Frost project, which is exciting.

[00:38:21.32] 

Next steps is just wrapping things up. We're going to do a community call, probably the first week of February to show the current status of the demo and also to give an overview of how everything works. Our wish is for wallet developers to start getting interested in integrating for us. We know that Zingo people are interested, so we're going to continue conversations on that front and that's it.

[00:39:01.04] - **Dodger**

I'd also suggest that the CLI wallet, after again, the main zcashd deprecation and ZSA functionality addition is complete, I think that'll be a good target for adding frost.

[00:39:23.04] - **Kris**

Two things that are related to that that I wanted to bring up. One is we now have the Zcash dev tool, which is a great place to potentially to migrate the functionality of the Frost signing tool because then it will be immediately integrated with everything. The other thing that would be really good there is in addition to the YWallet transaction format that it could be updated to make use of PCZTs, because then that opens up the possibility of using it in hardware wallets. And so I think that there's a lot of potential benefit if maybe take a look at integrating those functions that exist in that tool as a Zcash dev tool commands.

[00:40:26.58] - **Conrado**

Yeah, that's a good point. We've been I'm considering integrating with PCZTs. We're basically just waiting for things to settle up. And I guess I do have a question. I saw a comment in a PR somewhere about how Keystone is pointed to a branch I think, of librustzcash. So I was wondering at which point...

[00:40:50.28] - **Kris**

So that branch situation is specifically due to the need for no standard compatibility, so it shouldn't affect anything that is relevant for Frost.

[00:41:07.26] - **Str4d**

Can we already do PCZTs with everything with the PCZT crates? Yes. Can we already do PCZTs with everything with reduced crates? Yes. Can we Cool. The PCZT 0.1 crate implements PCZT's V1, and technically is the specification for them as well.

[00:41:25.04] - **Conrado**

In particular, you should be able to use PCZT's V1 alongside along with the proprietary extension fields that they include to basically ship whatever FROST specific logic you need. There's examples of how to do this in the Zcash client back-end crate, where we just define our own custom struct for the extra data we want to provide, and then we just serde that into some... I forget what we serde it into. Because it's just a proprietary key value thing. The keys are string the value as bytes. Just have your own extra structs per input, per output, or global, and then chuck them in there.

[00:42:07.33] 

That will be sufficient for using PCZT V1 to generate V5 transactions. Doing that logic would also be useful for figuring out what is necessary to be in the format so that we can then consider adding specific fields for Frost-related logic to be more efficient there in PCZT V2, which will be happening once the V6 transaction format is finalized.

[00:42:35.30] 

Cool. Yeah, that sounds like a natural next step. We just need to schedule things because we also need to focus on Zebra, but I think that's the next step, probably.

[00:42:45.58] - **Str4d**

Also, Dodger's comment about Zallet reminded me that a crossover point here between all of these topics is that the transaction builder logic that is going to be used Zallet for the V6 transactions is going to be based around PCZTs quite heavily because it fits very well with the way in which the builder is going to need to update it and build the transactions, particularly when you take into account things like member bundles and ZSAs. So because of that, frost support within PCZTs would then make it significantly easier post push, as Dodger puts it, to bring Frost in.

[00:43:41.31] - **Pacu**

Oh, yeah. Yeah, If the PCZT work for Frost can be done soon, it would be really useful for the Zavax redbridge which was formerly ZavaX Bridge, because basically it will be based on Orchard and Frost. So the Bridge will be making use of the Zcash Zallet CLI wallet, and Frost for the bridge guardians validated and sign transactions. So super awesome to hear that that's happening.

[00:44:40.00] - **Dodger**

What timeline are they working towards?

[00:44:46.22] - **Pacu**

They're just wrapping up the Zavax, the Oracle part, and working on some demos of the workflow, I think, for the Allyn Foundation. And after that, they'll be starting working on implementing the Bridge architecture. So it could be, I don't know, a few months. I don't know how many, but not too far, not too close.

[00:45:26.58] - **Dodger**

Just in terms of expectation setting, one Once this demo is complete and we've run the community called the Plan is to set aside for a while to focus on zcashd deprecation and NU7. And we'll come back to it at a later point. But the hope is that people will take, after they see the demo, people will take what has been demoed, try it out for themselves, and hopefully start providing feedback as to what if anything is missing that would allow them to use it either for something like zavax or for a wallet. So it may not move as quickly as people hope purely because of conflicting priorities.

[00:46:22.29] - **Pacu**

That's fine. I'm going to bring this up on my Tuesday sync with the Redbridge team, and I also maybe ask them for some timelines, and then I'll get back to the Frost team and you, Dodger, to see if there are anything that needs to be worked out or anything that has to be done with your oversight and that maybe the Redbridge team can actually contribute. We'll work it out.

[00:46:57.31] - **Dodger**

Yeah, we'll work it out. Yeah. Cool. Any more questions relating to Frost? We'll move on to the Network Sustainability Mechanism.



____

### 3. Research & Implementation Updates iv) NSM updates 


[00:47:11.20] - **Jason**

Okay, so last Arborist call, we discussed concerns raised by ECC ZF and the community about the term "burning" and have since changed the terminology. We've updated the ZIPs to remove any mention of burning, and now ZIP 233 introduces a mechanism to remove from circulation.

[00:47:31.24] 

ZIP 234 smooths the issuance curve and enables coins that have been removed from circulation to be recycled into future block rewards. And then ZIP 235 removes 60% of transaction fees from circulation to support network sustainability. We submitted pull request for these changes. Str4ds come back with some comments, and he mentioned that Daira Emma also has comments. Once we have all that feedback, we'll update the zips to address their comments.

[00:48:01.22] 

Now we're ready to do the integration work. It sounds like there's talk about delays to the NU7 timeline and a possible NU 6.5 so I'd be happy to refer a discussion of the NSM to those conversations so we can have better clarity on how best to proceed.

[00:48:25.44] - **Dodger**

Any questions or comments on NSM?

[00:48:30.13] - **Kris**

With respect to that last bit, Jason, I would say that the path forward is to move on getting those changes into zebrad and potentially into the wallet code, basically, as soon as convenient under feature flags. There's not really a strong reason that I can see to keep it held out. So long as it's feature flagged, then bringing it in will ensure that any changes that might touch it or affect it won't cause conflicts.

[00:49:12.04] - **Jason**

Okay, then we will do that.

[00:49:16.53] - **Dodger**

I think had a first glance at the pull request into Zebra. And again, just in terms of expectation setting, prioritization may mean that the time for PR reviews may be constrained. But that's purely down to potentially ruthless prioritization to bring some timelines back under control. Any other questions or comments related to NSM? Okay, let's talk about NU7. 


____

### 3. Research & Implementation Updates v) NU7 Timeline changes


[00:50:10.44] - **Str4d**

Yeah, I could do that. Well, the general gist of that was partly for... The initial part of that presentation was about just getting everyone who was at the summit on the same page about what the proposed ZIPs for NU7 were, because there's a fair bit of technical details in there, and not everyone who was at the summit is always on these Arborist calls. I think the slides got posted by Josh in his thread.

[00:50:42.01] 

The initial part was just giving some context there around that. From the timeline perspective, I did bring up the timeline that the ZIP editors proposed for as sketched out, really as a... This is the minimum set of things that need to be done before we can activate. And that was used at the time, back in October, to set deadlines for when the semantically stable zips had to be set.

[00:51:12.18] 

As far as I could see from, and again, remembering that this presentation was with my ECC hat on, so I was looking at it from the perspective of ECC, but there are obviously other parties involved in the process overall. From our perspective, The changes, the progress towards that timeline was pretty smooth up until the ZIPs, the semantic stability deadline.

[00:51:46.32] 

But there has been delays since there. One of them that was mentioned earlier was the sudden pivot to Keystone for hardware wallet support. That that ECC made, which now means that we have hardware wallet support and PCZTs, but also means that other things were delayed at that time.

[00:52:10.32] 

Another source of delay here is that we've had the set of zips and at least the zips has gave their view on what was safe, feasible, and useful to include in a new back in, I think it was the very beginning of December. But we are still lacking for the... At least the things that the zips has recommended getting feedback on, we are lacking general feedback from the community.

[00:52:45.17]

And so that causes some uncertainty in terms of what will end up making it into a NU7. Now, from what I can tell, the node implementers and library implementers, so ECC and ZF have been working around this, around this lack of clarity. This is where the feature flag was just mentioned, bringing things in in that way, is hopefully going to enable us to defer the decision on what is going in as much as possible while we wait for that feedback to be collected.

[00:53:24.37] 

But at some point, we are going to have to just say that if no one's giving feedback, then people are happy with what has been proposed. As far as I can tell, the latest that we can essentially cut off any feedback that is coming in. The obvious latest point is the selection of the main net activation height. Once that has been, that cannot be done before features are final.

[00:53:57.49] 

The practical point at which we can cut that off is really when we're starting to do audits because we really don't want to have to go through multiple audits. And in particular, if you're running an audit and then taking features out, that can impact the way in which... Depending on the feature that's taken out, it can impact the way in which those features interact and can affect the order of results.

[00:54:25.39] 

The things that The i see as concern points for getting through this time are getting the changes into actual production code, which requires a lot of time for PR review because there is a lot of code, particularly around ZSA that's coming in that needs to get in.

[00:54:50.36] 

Then we have the zcashd deprecation process, which It puts a hard point on where we can start switching people over, which means that it puts a semi-hard block on how soon we can define the mainnet activation height.

[00:55:18.10]

The problem we essentially face here is that once we set the mainnet activation height, and so we define this is actually when the network operator is going through, that sets the end date for people switching away from Zcash team. If we don't have surety that what is available at that point will be sufficient, then the network coverage is going to go through the network, people won't have migrated properly and things are going to fall apart.

[00:55:50.35] 

That's where the dual aspect of we need surety in what's going in 10 years, even ahead of that, and the work to do the integration needs to have happened, and we the zcashd deprecation to be far enough ahead that we know that anything that remains is small enough that it can be handled on a case-by-case basis rather than being overall existential. Those were the two parallel blockers and at the moment, both of them, relative to what the ZIP editors has put out as the optimistic timeline, as far as I can tell, both of those tracks have essentially slipped, as was mentioned earlier by about two months. I don't currently think it is feasible to get a network upgrade containing ZSAs out before October.

[00:56:45.14] - **Arya**

Is it reasonable to ask auditors to verify that the implementation is correct with and without the feature flag, or is that something that's likely going to significantly add to the cost of the audit?

[00:57:00.08] - **Str4d**

It will depend on the features as part of the problem. If we look at something like ZIP 235 as an example, that's a very standalone piece, and it's very isolatable so that's fine from an auditing perspective.

[00:57:18.55]

Something like the interactions where I could see complexity are, for example, the interaction between the changes that ZSAs need for to note encryption because they need to add the asset ID or the asset base into the note plaintext and the changes that memo bundles need for changing up the memo with a key. Both of those have impacts on the code implementation of Zcash note encryption.

[00:57:51.26] 

And so while at a specification level, they're relatively separate because they're changing distinct parts of the specification that don't overlap. From a code implementation point of view, there's a lot of coupling and complexity. And so by the time we get to the point of an implementation audit, I think we need clarity, for example, on the combination of those to versus at a spec order point, I think we would still have a chance to pull things back.

[00:58:23.15] - **Dodger**

Has there been any discussion of what a reduction in scope might look like?

[00:58:39.51] - **Str4d**

The ZIP editors gave some pointers on that back in the, I think it was the December post about looking over everything. Again, this was back in December, so things were at that point still were still not too far off the optimistic timeline, but on the presumption that ZSAs is definitely being included, which I think at this point we have sufficient feedback from the community for that to be the motivating central point around which the network upgrade we are working towards is built.

[00:59:25.50] 

Well, anything touching the transaction format in small ways is fine to include. They don't really have much cost. And given that, again, if you're including ZSAs, you necessarily have a transaction format change. So all the small stuff like the ZIP 2000 series, 2002 and 2003, I think it is, are very trivial to include, as well as ZIP 233 is a little bit more, has a bit more complexity to it in the consensus rules, but from a transaction perspective, again, it's just an extra field. We have options there around adding things to the transaction format, but then just zeroing them out in consensus rules, for instance.

[01:00:16.32] 

It's a bit ugly, but if we are at the point where we know that the transaction format for something is going to be stable and it just is we don't have time to work on the consensus rule parts of it, then that is an option for several of the ZIPs. Another example is precisely the action group related changes that I mentioned in the ZSA section. Those that are attempting to be preemptively brought in. I think we're at the point now, like I said, it's a bit more review to do on the relevant ZIPs PR, but we're at the point now where Qedit has managed to isolate that down to just the transaction format changes that we need to happen, and they will essentially just be in consensus but required by consensus to be unused and allowing the consensus implementation to be done later and circled in that case.

[01:01:13.56] 

Not all things can be paired up that way. Like I mentioned, member bundles is something that is, again, somewhat isolatable and could be pulled out if necessary, but the decision on that would need to be sooner because implementation-wise, it does interact quite closely with ZSAs, as well as being necessary for some of the things that I'm hearing people want to do with ZSAs, specifically around the ability to do authenticated sender, for which memo bundles is a hard requirement because we just don't have the space in transactions with the current memos to be able to store the necessary data.

[01:02:03.58] 

There's definitely things that could be pulled in and out, but at this point, as far as I can tell, most of the code for things is implemented. Certainly on the ZSA side, I believe the NSM side at least has the stuff ready for test usage. Yeah, the main concern from my perspective here is mostly about the PR review and getting the changes through. That's where we need a fair few hands from the NU7 side.

[01:02:46.56] - **Dodger**

Any other comments or questions? I think from my part, I want to take a look at the timeline.

[01:03:05.05] - **Josh**

Yeah, I was just going to say the other complexity that came out in our conversations in Mexico, we're just related to the timeline for the lockbox in the district reach mechanism. Like as Stra4d was saying earlier, it's the earliest that NU7 can activate is October. That's assuming everything goes everything happens exactly as planned.

[01:03:34.06] 

There's a risk that this slips further into November or beyond. We also have this limitation in terms of how often we can roll out network upgrades. It would be likely three months before we can roll out another network upgrade, which puts us already into early 2026. There's a question for the community of what we want to do. One option is to say, okay, the dev funds that are going into the lockbox and the dev funds that are going to ZCG will just cease in November. That is one option.

[01:04:22.35] 

Some downsides of that option is that it leads to 100% of the dev the mining rewards, then go to the miners, and then a change like that can be disruptive to flow more money to the miners and then have less money or to take it back or revert later.

[01:04:46.38] 

The other one that I didn't put in the post, I guess, is you could put something that you could flow some of those funds into the NSM when that's activated. But the question is, I think the community had signalled pretty clear consensus that they want to continue with a dev fund. There wasn't clear consensus on what they wanted to do other than to put it into a lockbox for an why we worked on a non-directive funding model, which we don't have yet and we won't have in time.

[01:05:22.50]

Do we want to extend the time for the lockbox by some period of months. There's a couple of proposals that I put out to the community in a forum post. One is that we include an extension of the lockbox for a year within NU7. If NU7 does not activate with ZSAs, with all the capability that's out there, or if it's not ready by the November, our expiration date, then that is the only thing that activates and everything else, the ZSAs and everything else pushes it out to a later date. The other is to insert a network upgrade before the current NU7 and decouple them so that there's an extension of the lock box, which is a fairly trivial change.

[01:06:25.23] 

Then that date is not tied to the NU7 date. Would appreciate folks' thoughts and thinking and comments in that thread. One of the things I know is true for ECC, and it's probably true for ZF, and will be true for ZCG, is we don't have unlimited funds. We expect to apply for grants or something like that out of the lockbox. We have at ECC about two years of runway currently. So even just in terms of our financial sustainability and planning is thinking about when funds might be available. For us, it's significant for us. It's probably significant for others as well.

[01:07:35.46] - **Dodger**

Yes. So I think a call for people to provide feedback on the forums, and obviously in due course, we'll start to pull the community to determine what it is that they want to do. 

[01:07:53.11] - **Str4d**

Yeah, I just wanted to make clear from a node implementer perspective, a change to the funding streams. The way that the funding streams are implemented in both zcashd and zebrad is very straightforward to modify. The main constraint on a hypothetical network upgrade that just does that is just the deployment timeline. The three-month window that Josh mentioned is something that we've just aligned at over time as the tightest we can do something with the ecosystem managing to upgrade within that. I think there have been times we've done emergency upgrades of nodes in the past due to security fixes, but that's not a pleasant process to have to go through, and so having that buffer is preferred.

[01:08:45.45] 

I would just make sure the community is aware that the numbering doesn't really matter for network upgrades. It's just there's a set of features and it's going out, and the numbering is really defined by the order in which they end up the consensus chain. But a 6.5 or whatever ends up, it would end up being a seven if we did that. Don't get hang up on the numbers. The full node side we'll be handling that aspect.

[01:09:16.04] 

It's really just about what the community wants from an ecosystem perspective. The tech side of that is straightforward to handle.

[01:09:34.10] - **Arya**

Why does there need to be a three-month gap? And is it possible to prepare network upgrades concurrently so that they can be deployed closer together?

[01:09:42.13] - **Str4d**

That's what I was saying. It is absolutely possible to prepare network upgrades concurrently, and particularly for something proposed like that that is a very simple change to existing consensus rules that doesn't require any new consensus rule logic to be implemented. The code for that can be done in parallel and merged at the same time behind feature flags or whatever, and then enabled at the right time.

[01:10:05.28] 

The three-month window really just comes down to the rate of churn of the ecosystem. If you think about, say, large exchanges, they have their own infrastructure engineers and things to deploy and timelines to deployment of things.

[01:10:20.16] 

In the past, what we found with upgrades has been that the rate at which they can react to us relative to reacting to all of the other chains they have to support means that a three-month lead time was the shortest that meant that we still had upgrades going through consistently with sufficient people upgraded before the activation height, that there was no stability problems.

[01:10:46.16]

Now, part of that window is that in many network upgrades, in addition to just updating their nodes, they also have to update their transaction building logic and adapt to a new transaction format or new consensus rule that's now constraining what they were previously doing.

[01:11:03.16] 

For something like the 6.5 that Josh was positing there, because the only two effective changes would be the change to the funding stream, which basically doesn't affect anyone because it's just an internal rule for how funds are flowing. I should clarify. That change would affect miners from the perspective of needing to ensure that their blocks match that rule from that point going forward, but they rely on zebrad and zcashds getblocktemplates.

[01:11:39.33] 

So as long as those are reacting correctly, then that's fine. And then the other change, because every network upgrade comes with a new consensus branch ID. All of the wallets would need to be aware of that new consensus branch ID and roll that out like any other upgrade. But there would be no new transaction formats to be aware none of that extra complexity. There's maybe shrug possibility to shrink that window down between when a hypothetical small upgrade went out and a large one up after a long three months. But three months is the ballpark I would tend to want to work to.

[01:12:22.31] - **Dodger**

Fyi, we've had some feedback that we should have a long, hard think about whether updating the consensus branch ID with every single network upgrade is wise. It's not something I want to litigate on this call, but there's some compelling suggestion that it's introducing more friction than maybe people are comfortable with.

[01:12:56.25] - **Str4d**

That would be good to organize some separate discussion on yes, because the motivations for that are very clearly outlined in ZIP 200. So if anyone is interested in looking at why we designed it the way we did, read ZIP 200. But part of that was in particular, two-way replay protection is what is the core thing that provides.

[01:13:21.28] 

If we chose to stop doing that, then you would lose that two-way replay protection, which at least when we introduced it in 2017 the conversation around forks and things at the time was that that thing was considered by wallets, and in particular hardware wallet manufacturers were strongly and vocally supporting adding that to chains. There's a lot of history back there, and that was part of the reason why we folded in the way we did. If those ecosystem participants have changed their minds in the intervening eight years, it will be very good to hear from them.

[01:14:04.42] - **Dodger**

Any other questions or comments on that or on the general topic of NU7? One thing that I wanted to raise, and again, this is more to put it in people's heads rather than to look for any a conclusion or a decision here, but thinking about making sure that there's clarity around what the expectations are in terms of prerequisites for features and code that is going to go into future network upgrades.

[01:14:45.37] 

I was going to say NU7, but now, perhaps I shouldn't be so specific. This is a historical document about some of the discussions we had back relating to NU5 and reviewing what had been done for sapling and therefore what was appropriate for orchard. I just wanted to check to see whether the ZIP editors had already covered this off, whether there had been any thinking about it or what the story was there

[01:15:35.02] - **Str4d**

The particular one you're looking at there is somewhat NU5-specific because the goal for this document- It's for NU5, yeah.

[01:15:45.10] 

Yes, but NU5 was the upgrade in which Orchard was deployed. So remember, as you can see, the heading there is sapling parity. So what this was primarily focused on was the fact that in the sapling upgrade, we deployed a new shielded protocol to replace Sprout, and as it turned out to fix a counterfeiting bug within Sprout.

[01:16:06.53]

This was around the fact that we were doing that a second time with the Orchard Protocol. And so there was a lot of Yeah, as I said, sapling parity. There were things we did for the sapling upgrade that we needed to make sure we remembered for the Orchard upgrade because it involved a new circuit system, a new proving system, a new circuit, a new circuit design, a new specification for a payment protocol.

[01:16:32.50] 

It was a big stack of things that we had to track. That's what this particular thing was approaching. There are probably elements of it. I would say probably the last four rows are essentially the bit that is more NU general, in a sense, and more applicable. Those are things that were, for example, mentioned in the original sketched-out timeline from October, the optimistic timeline that the ZIP editors put out.

[01:17:09.38] 

We mentioned the general need for spec audits and code audits and things earlier. As I mentioned in the ZSA piece, there's already been audits going on for the ZSA circuits and circuit implementation. That aspect of things is underway. Code implementations, as mentioned, we're at the point where a lot of the work that is needed doing is code integration, so PR review and integration there. Implementation and test audits, that obviously requires the code to be in. But those aspects will... The full node implementers should be comfortable already with the set of things that they need todo to have assurance of the consensus rules within their own implementations.

[01:18:08.31] - **Dodger**

Yeah, I figured that this was in hand, but I just thought there was no harm of the checking.

[01:18:14.50] - **Str4d**

Yeah. Arya, you had a hand up briefly?

[01:18:17.54] - **Arya**

I was just going to mention the ZSA circuit audits.

[01:18:28.10] - **Dodger**

I guess at some point we need to start planning a code audit for Zebra once the implementations have been merged.  


___


### 4. Open Announcements i) Pop Up City Movement / Zcash Dev Summit / Z|ECC Prague 


[01:19:30.17] - **Za**

Yeah, it's not really an announcement. It is a floating an idea. The bus problem where librustzcash is bound to just a few core developers and that knowledge needs to be diffused used. There's a hack out there called the pop up city movement, where a bunch of people come and hang out for a long time together. And frequently those venues have funding as well. I think it would be interesting to think about having a librustzcash knowledge diffusion cluster at one of those events.

[01:20:11.52] - **Str4d**

Yeah, we very much benefited at the summit we just had from... We ran a hacker house afterwards where we just hang out after the summit to digest on the things we discussed and also go through other things. And we found that beneficial.

[01:20:31.55] - **Dodger**

Yeah, it's really good, really good suggestion, actually. Having just unstructured time for people to spend time together.

[01:20:42.12] - **Kris**

Yeah, it was fantastic. At the ECC summit, we had Maya there, and then Pacu was there for the hacker house, and we got through a lot. And in open discussion, there were some ideas that came out of that that I'd like to bring up and discuss.

[01:21:01.41] - **Dodger**

I just want to remind people that we are planning a dev summit just before ZK proofs, which itself is before Real World Crypto in Sofia in March. If you're interested in taking part in that, hop on to the form and you'll find a registration. It says application. All we really do is make sure that they're not known trolls and also to set any expectations if they're not a developer, to make sure that they understand that the content is likely to be developer-heavy.

[01:21:44.44]

We've got a bunch of people attending, and in the not-so-distant future, we're going to start consulting with them on what they want the content to be, whilst we, ZF, are organizing this and facilitating it and providing the room and whatnot, and there will be some structure to it. The idea is that the attendees have a significant say in what the content is and what the actual time spent is.

[01:22:17.30]

So that will be happening on Saturday, March 22nd. That will be the structured day. And then the following day, we plan to retain the space and provide coffee and all that stuff so that people can co-work, hang out, work together on projects, pair up on things, but in a more unstructured thing without having a set agenda and so on.

[01:22:41.43] 

So if you're interested, if you're going to be in Bulgaria, if you're going to be in Sophia for any of the crypto events that are taking place then, and you'd like to join us for that, hop onto the forum, find a link, and let us know. And yeah, Za, you still have your hand up. It was something else you want to say? No. Okay. Josh.

[01:23:02.35] - **Za**

Well, I just wanted to make another plug for the pop-up city thing. In modern development, we're this globally distributed community. And you've got the co-located people who see each other at work every day. You've got the people who just see each other occasionally at a dev summit like this. The co-location for the extended period of time for globally distributed groups like ours is, I think it's an innovation that is worth looking at a little bit more carefully and thinking about those extended longer weeks or maybe even a month, where maybe some people can only attend for a week and some people to attend for a whole time. I think there's a lot of value there. So I just want to make another plug for it.

[01:23:49.24] - **Dodger**

Yeah, I agree. It sounds quite interesting. Certainly something to think about more. 

[01:23:57.51] - **Josh**

Yeah, I agree. It's a great idea. Just also, if you're interested, like again, we talk a little bit about the Z|ECC summit. The next one tentatively is scheduled for the week the seventh of July. And so if you're interested, and we're looking at doing this one in Prague, and it will be a mix of structured sessions as well as we'll look at doing the hacker house again. And so if it's something you're interested in participating in, just mark your calendars for now, and then we'll get announcements and signups once we have locked everything in. 



___

### 5 Open Discussion - Sprout Pool Deprecation 


[01:25:06.41] - **Kris**

It depends on which of the ideas that you're interested in talking about. But I'll lead off with the one that I'm excited about. So we came up with an idea of how to approach. So, Dodger, in the past, you've expressed some concern about the removal of the V4 transaction format from what is valid on the network because it makes Sprout coins unspendable.

[01:25:38.58]

Now, first, anyone who has Sprout coins currently should move them out of the shot pool as soon as possible. That being said, one of the things that we talked about at the hacker house was this problem. We came up with an idea which has some nice features. Put really simply, the idea is that with the advent of ZSAs, it would be possible to use an offline protocol where individuals could present proofs to a group of trusted signers that have a multisig, and those signers would mint a ZSA that represents those Sprout funds. We would then, inside of consensus, that specific ZSA provide a mechanism to redeem that ZSA and burn it in exchange for ZEC. And that would then-

[01:26:42.52] - **Str4d**

Specifically, ZEC in the the Sprout pool balance. 

[01:26:48.37] - **Kris**

So that could be a good way forward to allow us to continue with Sprout deprecation, but have a way for anyone who is a laggard to redeem their funds in the future.

[01:27:04.34] - **Str4d**

And in particular, the effects this had, the way this would play out if it were implemented, would be that by deprecating the V4 transaction format, say in a NU7, that would essentially freeze the amount that is in the Sprout pool. Now, we know that some amount of that will never get claimed because of lost keys and whatever. But what it means essentially is that this synthetic asset, the synthetic Sprout ZEC, the most that could ever be issued is the balance remaining in the Sprout pool.

[01:27:46.28] 

But that could be ceased at any earlier time if the community determines that everyone who could possibly have actually claimed has claimed and the remaining the remaining balance is lost. You could then leverage the finalization aspect of ZSAs to at some point finalize the issuance of synthetic Zec, after which point any remaining balance could then be dealt with at a at a network-wide level, perhaps via, say, the the NSM protocol.

[01:28:24.01] 

But it would then mean that we're leveraging ZSAs for this, The change to the consensus rule to enable this would solely be around the definition of the asset and the custom project for burning, which is a relatively small consensus change.

[01:28:48.01] 

In particular, it means no circuit changes or new circuits in the consensus rules. We would be leveraging the ZSA circuit changes that we're deploying in what's currently in U7 for that purpose, which is a big benefit over previous iterations of this idea.

[01:29:09.24] - **Dodger**

One of which I'm displaying on screen right now. It came up Which I came up with almost exactly six years ago.

[01:29:18.43] - **Str4d**

The other benefit of the potential benefit of this design is that it is not direct control over ZEC. It is instead control over synthetic assets. So there's no the chance of there being... It minimizes the potential chance of there being a counterfeiting bug because we're not providing direct issuance control over Zec. What you're providing is the ability to exchange Zec from that frozen Sprout pool with another asset, which reduces the likelihood of problems there.

[01:29:53.48] 

And also another interesting benefit, Any change that did this would move the Sprout consensus rule logic and circuit logic out of circuit, which means that doing things like mergers and whatever can be a bit tricky in terms of proving to the trusted set that the correct proofs have been provided.

[01:30:20.09] - **Arya**

The other aspect that ties into this that Kris and I discussed at the time, but hadn't been mentioned yet, is with the advent of memo bundles, we'd be able to put those proofs on chain. Anyone would then be able to run those proofs and verify that the entities who were issuing the synthetic Zec were doing the correct thing. There would be an the visibility aspect of it compared to if it were purely an offline faucet that didn't have that visibility, then you wouldn't have the ability to verify that the people trusted to run this process are doing the same thing.

[01:30:58.25] - **Str4d**

But because Because of that, it would mean that you would be claiming the synthetic Zec in units exactly corresponding to the Sprout notes that you had available. But because it's a ZSA, you could then choose to exchange those for Zec inside of Orchard or merge them or do whatever you want there and have someone else potentially could do the actual burning stage, the public burning, because the burning stage of a ZSA is public and the burning stage and corresponding claim of grounds from the Sprout pool, you would be able to do mergers and things of those received funds to decorrelate the claiming of funds from the Sprout pool via the permissioned signature from the conversion into Zec.

[01:31:54.10] - **Kris**

Yeah. The essential thing there is that because as a ZSA, it is just another synthetic asset. That synthetic asset would have a one-to-one redemption for Zec, but you could also just exchange that asset by selling it to someone for however you wanted to.

[01:32:20.22] - **Dodger**

I love it.

[01:32:27.13] 

When I created this issue, I created the label, This is a bad idea, which was described as, We really shouldn't do this unless we can't figure out a better alternative. And I feel like this is a better alternative. And we may, maybe if we make some more progress on this, we can look at closing this ticket when we come up with a better idea for deprecating the Sprout value pool without causing loss of funds for users who own unspent Sprout notes. I just wanted to point out that I'm nothing, if not consistent. Five years ago, So, yeah, I am. Yeah, Daira agreed that this idea was a bad idea as well. But yeah, this, I think, is certainly something worth exploring. And I do like it. I like the elegance of it.

[01:33:21.07] - **Kris**

I'll move this ticket to the ZIPs Repository so that it can be updated with new ideas. 

[01:33:31.47] - **Dodger**

I love it. Nice to have a positive, how do we solve this problem thing rather than...

[01:33:44.05] - **Str4d**

Yeah, it's good. So another thing to keep in mind here is that this is a general mechanism. So to deprecate sapling, you would then just take this exact same mechanism and define a synthetic sapling asset that is tied to the frozen The balance remaining in the sapling pool at whatever time deprecation is chosen there. So this becomes a reusable mechanism for doing this thing in future.

[01:34:11.29] - **Dodger**

I like Dan's idea as well. If only a small amount of Sprout Zec It may be cool to keep the synthetics as NFT or collectible.

[01:34:19.42] - **Str4d**

True. Especially once the synthetic set is finalized, then the only thing you could do with it is hold on to it or claim it for Zec.

[01:34:31.55] - **Dodger**

Or burn it for Zec, in fact.

[01:34:33.59] - **Str4d**

Yeah, exactly.

[01:34:38.56] - **Dodger**

Okay. I like it. I like it. Although I do feel that given our timeline and scope constraints, we're not likely to explore it in time for the next network upgrade.

[01:34:52.14] - **Str4d**

No, but you can see it's actually using most, if not potentially all of the features that in NU7 is is proposing of introducing. It'll be using ZSAs, memo bundles, and potentially NSM.

[01:35:09.06] - **Dodger**

Okay. Any other comments or questions on that? I just want to highlight that we are technically over time. Are there any other burning topics that anybody wants to introduce for the open discussion portion? 

[01:35:40.19] - **Arya**

I just want to ask for a quick update on the Equihash PR in librustzcash and see-

[01:35:47.46] - **Str4d**

That is in the list of PRs that we are working on reviewing. Yes, it is alongside the ZSA and NSM and PRs. That is one of the PRs that we're trying to get through. Okay, perfect. Thank you.

[01:36:06.22] - **Dodger**

Okay, let's wrap it up there. Thank you, everybody. We will see you again in two weeks. On the 6th February at the 15:00 UTC time slot. And just as a final aside, we have been looking very hard at the calendar issue. We think we may have a solution, which is actually based on one that was suggested by Vivek during the last Arborist call. So hopefully in the not-too-distant future, we will be able to tell you all how to potentially re-register to get correct and updated calendar entries. But for the meantime, please continue to bear in mind that your calendar entries that are set up on Zoom may be incorrect.



____


**Next Meeting Scheduled: 15:00 UTC February 6th 2025**


___
___



