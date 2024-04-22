# Arborist Call #75 Notes

Meeting Date/Time: April 18th 2024, 21:00 UTC

Meeting Duration: 1 hour 45 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [zcashd 5.9.0 / Zashi](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#1-ecc-update---zcashd-590--zashi)

+ Zebra Update - [Zebra 1.6.1 / Organisation DAGs](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#2-zebra-update---zebra-161--organisation-dags) 

+ Research & Implementation Update - [FROST demo phase 2](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#3-research--implementation-updates-i-frost-demo-phase-2) / [Zcash Sustainability Fund](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#3-research--implementation-updates-ii-zcash-sustainability-fund) / [Zcash Sustainability Fund cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#3-research--implementation-updates-ii-zcash-sustainability-fund-cont)

+ Open Announcements - [Z|ECC Summit](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#4-open-announcements-i-zecc-summit)

+ Network Upgrade Planning - [Transient testnets](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#5-network-upgrade-planning-i-transient-testnets) / [ZIP process](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#5-network-upgrade-planning-ii-zip-process) / [Zcashd deprecation / NU6 items](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#5-network-upgrade-planning-iii-zcashd-deprecation--nu6-items) / [Possible NU7 Items](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2075-Notes.md#5-network-upgrade-planning-iv-possible-nu7-items) 



## Decision & Action Items

i)  Add zcashd deprecation slot to Arborist Calls

ii) Replace/Restore Zenhub for Zebra DAG and the ECC DAG

iii) Discussion on cost of audit for NU6 node implementation

iv) Future Arborist call topic Memo bundles

v) Prioritise ZSF at start of next NU6 meeting 



___
Video of the meeting: [recording](https://www.youtube.com/watch?v=c9LY1Rptt5c&embeds_referring_euri=https%3A%2F%2Ftwitter.com%2F&source_ve_path=MjM4NTE&feature=emb_title)

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - zcashd 5.9.0 / Zashi


[02:12] - **Daira Emma**

so we have tagged zcashd 590 RC1. The last full release of zcashd that is still working is EOS halting soon, so that's an urgent priority for this week. I would expect the final 5.9.0 to be tagged tomorrow.

[03:09] 

There's been a lot of development on librustzcash. Kris or Str4d can you elaborate on that? 

[03:31] - **Kris**

I think the main things from the last couple of weeks have been essentially work that has fixed up some bugs and corner cases that were discovered in the process of the Zashi rollout. So some database migration that was required to ensure that existing wallets have an Orchard receiver in their unified address, and then a couple of other just relatively minor cleanup things.

[04:10] 

Last week, we spent a bunch of time on roadmap planning, which Josh posted to the [forum](https://forum.zcashcommunity.com/t/ecc-roadmap-for-q2-2024/47465) yesterday.

[04:25] - **Daira Emma**

Speaking of which, I've just added some target tickets for deploying NU6 and NU7, and a very rough outline of the dependency graph. You can see that on the core DAG, it may not have rendered yet, but it's there. The core DAG, by the way, is [zcash.github.io/developers](https://zcash.github.io/developers).

[05:13] - **Dodger**

Cool. Any questions relating to ECC's work?

[05:20] - **Str4d**

One thing that I want to mention here. We've had an issue, or we and many others in the in the iOS ecosystem have had a problem for a few months with regard to Xcode, specifically Xcode 15.3 has some bug in its build system that broke a bunch of projects that had binary static files inside them. We were affected by this. The latest version of the iOS SDK has that fixed. If you're running into that problem, upgrade to the latest version of the iOS, the Swift SDK, to get that result.

[06:12] - **Andrew**

With Zashi 1.0 out, I'm wondering what's the expectation for prioritization for bugs that prevent other wallets from interpreting transactions and then an account recovery correctly? I filled 2 or 3, which I think the folks here are aware of, but they've just been deprioritized so far. How are we prioritizing other wallets that use the librustzcash codebase that have issues?

[06:45] - **Daira Emma**

Highly, yes.

[06:49] - **Kris**

Now that we're beyond the crunch and planning week, those things are top of the list.

[07:01] - **Andrew**

Great. Thank you.

[07:03] - **Str4d**

The next part of this in the general trend towards being able to, also in the trend of being able to get rid of, deprecate zcashd is to make certainly the rust parts of the wallets, not necessarily the Kotlin and Swift pieces, because those are very mobile SDK-specific. We're still not currently looking at turning making those usable for desktop, even though in theory you could use the... the Swift one is relatively minimally coupled to Apple, other than it's entirely coupled to Apple because Swift.

[07:41] 

But from the Rust side perspective, the intention is for the use cases of that to strengthen over time to enable us to do things like support the more varied sets of transactions that are needed for the equivalent of a zcashd wallet. Bugs of those sort are good to report. Please continue reporting them as you find them. 

[08:17] - **Dodger**

Let's move on now to the Zcash Foundation. I think Alfredo has got the job today.



____

### 2. Zebra Update - Zebra 1.6.1 / Organisation DAGs

[08:26] - **Alfredo**

In the last last two weeks or so, the Zebra team has worked in some improvements to the getBlock RPC method. Before, the getBlock RPC method in Zebra just had the fields for like what is the functionality. We now improve it and prepare to add more field to make it more compatible to what zcashd does.

[08:54] 

By the request of a community member, we added the Block Time field. And We are planning how to add the rest of the field in the verbosity level zcashd has. Another thing we're working on is that, I'm not sure if it was mentioned in the last call, but we added disk size when Zebra starts, so we can know how big is the blockchain when Zebra starts & when Zebra shutdowns. This was the work of an external contributor, which The GitHub handle of this contributor is Elijah Hampton. So thank you for that. 

[09:38] 

In the last few days, we made a small adjustment to a PR. So the display of the size are in a more human-readable form. So instead of just putting the bytes there, which are a long string of numbers, you now say that in Gb or in Mb.

[10:00] 

We tagged the [1.6.1 release](https://github.com/ZcashFoundation/zebra/releases/tag/v1.6.1), which includes the first version of the OpenAPI spec, which is documentation for our RPC methods in the swagger style. We are continuing making progress in regards to the regtest support in Zebra. This will allow to spawn private networks and help other teams and ourselves to build network upgrade features more very easily. This is part of the zcashd deprecation process.

[10:34] 

We fix a lot of Rust warnings, a lot of dependencies that we spent some time in there. It was a bit harder than we was expecting. We are continuing planning and prototyping the external client functionality to Zebra, which one of our plans that maybe if we have time later today to discuss it for the integration between Zebra and zcash client backend. But you've seen the Zebra Scan project we did with Zebra before. That's one of the ideas we have for deprecating zcashd in that part in regards to wallet functionality. Yeah, I think that's it.

[11:31] - **Dodger**

Actually, the mention of that last bit just reminds me of something that I've been wondering, should we add a specific slot during these calls to discuss the zcashd deprecation work? And I'll let Jack and Daira speak.

[11:49] - **Daira Emma**

Happy to do that.

[11:51] - **Str4d**

Yeah. In the same way that we generally end up with a talking point about network upgrades, I think that would be a useful one to have Certainly for the remainder of this year. The question I had was, has there been any further progress related to the integration testing ability of zebrad? Or is that still blocked on anything other than the v2 Equihash solver piece that I've been working on?

[12:28] - **Alfredo**

Arya's working on that area. I'm not sure if he's here. 

[12:39] - **Arya**

Yeah, we're making good progress. Right now, I think the next step is going to be to create the genesis blocks in Zebrad for regtest. Then there are a few more fields that we need to add in order to have a very minimal, still incompatible with zcashd version of regtest and from there we can continue on to make it fully compatible. For now, we're thinking that we're going to just disable proof of work altogether until we can restore the internal miner so that it works, even though it doesn't provide the full coverage.

[13:09] - **Daira Emma**

Is there any reason, by the way, not to just use the regtest, genesis blocks from zcashd.

[13:20] - **Arya**

No, I don't believe there is so we could do that, too.

[13:25] - **Str4d**

That's not going to if the regtest is incompatible, or it depends exactly on how the compatibility is with zcashd.

[13:35] - **Daira Emma**

Oh yeah, that's a good point.

[13:37] - **Str4d**

In any case, on the generation side, just to that point, I've finished Reintegrating and squashing and cleaning up the changes that Teor made on top of the initial equihash PR that I did. Collectively the two get it working. I just finished pulling those pieces in together and I'm currently now doing some other refactoring for better testability of some of the pieces that Teor introduced.

[14:09] 

So I'm hoping in the next week or so we'll have that piece into the equihash create. What it won't have is the ability to run with multiple parameter sets on the solver side. That's going to need someone to do additional adjustments to the C code. So instead of Because the C code currently hard codes via C. If C defines the parameters it works for, it works for a bunch of different parameters, but you have to pick it at compile time.

[14:43] - **Str4d**

That will require a little bit of work from someone to make it compatible with multiple parameter sets, specifically the two we care about, the main testnet version and the regtest version. But the core of it working with mainnet  and testnet versions of the parameters will be working soon.

[15:13] - **Daira Emma**

So when I generate the DAGs for... I've got a little script that does it for Core, Wallet, TFL, halo2, and ZF. And for a while now, the ZF one has been failing with a code 510 internal server error. So it might be worth us just trying to fix that so that we can integrate the the Zebra DAG and the ECC DAGs and see what the dependencies between them are, especially for a deprecation process.

[15:57] - **Dodger**

Conrado, were you looking at this recently or am I imagining something?

[16:04] - **Daira Emma**

It's been a while. We don't use the DAG as much as the ECC does. So I think it broke at some point and I intended to look at it, but I never managed to do that. But I can take a look to see what's going on. Okay. Thanks. I just have a question. I think if I remember correctly, the script, the DAG script, use both ZenHub and GitHub. That's right, yes. But I can't think to... I think we stopped using ZenHub. So maybe that's the reason.

[16:40] - **Kris**

We have also stopped using ZenHub other than as a data store for the DAG and as a way of easily updating it in the UI because we just use the ZenHub plugin for GitHub to gain access to that data. If anyone with DevSecOps, chops, wants to collaborate on replacing that part, I would be very happy.

[17:09] - **Daira Emma**

Same. But I think there isn't a way in GitHub?

[17:17] 

I would propose is reading the description of the ticket and recognizing things like 'blocks' or 'blocked by'. Yeah.

[17:27] - **Str4d**

Right. But that's only a very small part of it. That helps with the data storage part. That does not at all help with the UX of manipulating it because you end up in a situation where you have to be parsing both ends and being resilient against third parties making changes. And it becomes a very tricky process there.

[17:54] - **Daira Emma**

I have some ideas on how to do it, but we don't need to get into that. Yeah.

[18:00] - **Dodger**

Any other questions relating to Zebra? Let's move on to FROST and I expect we're back with Conrado.


___


### 3. Research & Implementation Updates i) FROST demo phase 2 

[18:16] - **Conrado**

So we're basically wrapping up phase two of adding online communication to the FROST demo. So that's just a single PR that needs to be reviewed, but it's working. So with that ready, we have our demo. We don't need to copy paste things anymore. Our demo works over the internet using a server for help handling communication between participants and coordinator.

[18:49]

We are planning the next steps after that. Our intention is for this to turn into orientation, it's for this to turn So a solution that can be used by wallets to deploy FROST and some of these things are user registration, some user registration mechanisms in the server. We need encryption, authentication for the communication between participants and stuff like that. So you're basically planning the next steps. I think that's mostly it.

[19:29] - **Dodger**

I think it's probably fair to say that a lot of the work in the next step is not necessarily as crypto-heavy. So if people are interested in getting involved in supporting this work or contributing to it, do reach out and let us know. 

[20:10] - **Daira Emma**

No updates. Well, I guess apart from the roadmap that we published, no updates on the documentation or simulator.


___


### 3. Research & Implementation Updates ii) Zcash Sustainability Fund 


[20:31] - **Dodger**

On to the sustainability fund, and Jason McGee and Tomek were on the call earlier. They had to drop off, but Jason left a note:

**Jason McGee**

"Hi all – Tomek and I need to drop for other commitments, but where we stand with the Zcash Sustainability Fund: we’re about 70% complete with the Zebra integration and still have work to do for Zcashd.  Tomek feels comfortable we can be done in time for a release with NU6". 

"What we were hoping to get out of this call is (1) what’s the precise timeline of when we’d need to be done to be considered for inclusion in NU6?"

"And (2) I think one thing that remains unclear is what are the expectations in terms of governance, specifically gauging community sentiment of the Zcash Sustainability Fund and support for its implementation."

"I’ll check out the recording for an answer if you have time to get to it.  Otherwise, we can catch up at the next Arborist call.  Thanks all!"



____

### 3. Research & Implementation Updates ii) Zcash Sustainability Fund cont.


[21:53] - **Dodger**

Anybody want to make any comments on that?

[21:55] - **Str4d**

With my Zip editor hat on, one of the things that came out of some of the more recent reviews of those particular ZIPs is that at least at a specification level, it feels like there is still some things that aren't clearly specified in the ZIPs.

[22:14] - **Str4d**

So the fact The fact that there is implementation going on is good to know because one of the things that will be required prior to inclusion in the network upgrade is to make sure that the Zip specifications are clear and unambiguous. The fact that it sounds like they are doing both integration work into zcashd and Zebra means that there will be three different spots to be looking at to make sure that they are consistent.

[22:50] - **Str4d**

My initial concern from the reviews we done previously was that` the single implementation as in the specs, was was insufficiently specified to be implementable. So I'm very glad that they are implementing it because they know what they mean by the specs. So the main next step I see there is to ensure that the specs and the implementations are exactly consistent and clear in terms of what is actually being implemented across the three of them.

[23:23] 

And in addition, being clear in the implementations, which parts of the implementation correspond to which spec, because there is still the question from a complexity point of view in the network upgrade, what makes sense to include in when But the main thing is just making sure that the specifications are clear.

[23:49] - **Daira Emma**

I also wanted to say that there was some sentiment in the last Zip editor meeting. Remember, I'm no longer a Zip editor, so Str4d can correct me on this, that the current drafts were lacking in clear motivation, clear economic motivation, and needed to contain more detail on what the expected economic effects are, whether the amounts of money involved, so what effect they will have on funding, what effect they'll have on sell pressure for miners, things like that.

[24:45] - **Dodger**

Okay. Are the ZIPs relating to this specific enough at this point that there's there's clarity around exactly what is being proposed? Because remember, there It seems there was some uncertainty around percentages. Has that been settled?

[25:10] - **Daira Emma**

So, to my mind, there are several parameters that the current drafts do make a proposal, but the question is, does the community agree with those parameters? So one of them is the The proportion of transaction fees that go to the sustainability fund. The other is the exact parameters of the issuance smoothing. So for example, how does the issuance curve compare to the step function that we currently have? Where does it intersect that step function? Okay.

[26:01] - **Dodger**

That's obviously going to be key for assessing community sentimen.

[26:05] - **Daira Emma**

Absolutely. And the economics. 

[26:49]

If you look on the TFL and NU6 timeline, that's the document. I think they're there. Yeah, there are 5 PRs on ZIPs. [703](https://github.com/zcash/zips/pull/703), [706](https://github.com/zcash/zips/pull/706), [718](https://github.com/zcash/zips/pull/718), [745](https://github.com/zcash/zips/pull/745), and [748](https://github.com/zcash/zips/pull/748).

[27:22] - **Dodger**

And if these are to going into NU6, obviously the changes will need to be accepted into Zebra and Zcashd and I also feel that an audit is going to be required. And I guess the scope of audit or audits needs to be agreed upon.

[27:55] - **Daira Emma**

That's correct. We need to do that very soon. That's my responsibility as part of my job as engineering manager to organize audits. Of course, if ZF Do you want to do a separate audit of the Zebra code? Because there will be a specification. Sorry. There will be an audit that handles the specification implementation and the implementation in zcashd? Should ZF and ECC share the cost of that and then it can cover Zebra as well, or does ZF want to organize a separate audit?

[28:48] - **Dodger**

Well, we need to have a chat about cost because we're in constrained financial situation. I understand. We can't just take on the cost of everything, basically.

[29:10] - **Daira Emma**

I would think that any audits would cover all of the NU6 features rather than being split up by feature.

[29:22] - **Str4d**

In any case, the other aspect there is, as you know, is like audit scoping and things. Part of the The thing with scoping here is that for this one in particular, because of the way in which these changes are split up, both from the perspective of what the community wants to have included, but also from the perspective of where the complexity lies.

[29:51] 

If we feel that the scope for NU6 is too great when we get to the point of deciding what goes into it, there is the ability to look at, for example, including the definition of the ZSF, which is the changes to the transaction format and the changes to how the full nodes account for those without including the change to smooth the issuance curve. You can't do the latter without the former, but the latter is also a fair bit of extra complexity on the... It adds the complexity budget, basically.

[30:33] - **Daira Emma**

Yeah, the dependencies are to add that field with ZSF deposit, which is dependent on defining the V6 transaction format. Then the issuance smoothing is dependent on defining ZSF deposit, and the percentage of fees to the sustainability fund is also dependent on that. It's like a triangle.

[31:01] - **Str4d**

Then at the same time, any changes regarding if the community coalesces around a dev fund option, that will also interact with the existence or not of the issuance smoothing. Because anything around how any dev fund option, all of those come out are how the block's subsidy is divided between security and development. But the issuance smoothing changes how the block's subsidy equations work.

[31:35] 

So there will be more issuance at sometimes and less issuance at others for a smoother output as it claims. But from a calculating what's going on perspective, that's the thing to take into account, both in terms of whether the issuance smoothing is present versus absent at the time a Dev Fund proposal lands, if it does. Then similarly, if a Dev Fund proposal lands without the issue in smoothing, then the effect of issue in smoothing on that, in addition to mining, is something that needs to be taken into account, which also adds complexity.

[32:20] - **Daira Emma**

It's also worth pointing out that there was some opposition on the forum to a curve that ever went above the current a step function. I'm not taking a position on that, but there was some opposition.

[32:38] - **Dodger**

I think there's at least one definite proposal, Gguy's, where there may be a significant interaction between the two. Interaction is probably the right word, not conflict, but they could impact one another.

[32:57] - **Str4d**

This is the thing that Yeah, this is where the ordering somewhat matters because an issuance smoothing Zip in the absence of a change to how funding streams work has one kind of analysis, and that Zip existing afterwards has a different analysis. The analysis of the interaction has to happen somewhere. We can't include both things without an analysis of the interaction between them. So someone has to do that work. Okay.

[33:36] - **Daira Emma**

So that, again, argues for audits covering all of the NU6 features rather than individual ones.

___


### 4. Open Announcements i) Z|ECC Summit


[34:27] - **Josh**

Z/ECC Summit. Yeah.

[34:40]

Yeah, so if you weren't aware, we did a thing before in January that we called Zeboot, and that was coming back together in terms of ECC planning. And one of the things we wanted to do that we're committed to is part of planning on our roadmap at ECC is to engage the community and to to involve the community in it as much as possible.

[35:02] 

We didn't want to do it remotely, and so it was an in-person event. We came together. We had ECC had some sessions on Monday, and then we invited the community in on Tuesday and Wednesday, and then ECC wrapped up its time together on Thursday. With this quarterly planning cycle that we're now on, what we decided is to do the Zeboot thing quarterly. It was really well received. I think the people that were there, both from the ECC team as well as the community, were really energized, and we got a lot of great collaborative work done on those days. The next one is in July. Since we're not going to reboot every six months, it's now the Z/ECC summit. So Z/ECC, this aggregation of the Zcash community in ECC on ECC's plan

[36:01]

We got a limited number of seats, we don't accept everybody. We can't accept everybody. But if you're a developer working in the Zcash ecosystem, and I use the developer word broadly, but if you're working in the Zcash ecosystem as an active participant and would like to participate, there's a post on the forum. You can [register](https://forum.zcashcommunity.com/t/z-ecc-summit-ecc-community-event/47433) and we'll do it again in July in San Diego. So we hope somebody will be able to make it.




___

### 5 Network Upgrade Planning i) Transient testnets 


[36:42] - **Dodger**

Cool. Let's return to the discussion that we were having earlier about network upgrade planning. And so hopefully everybody's had a little bit of time to relax and cool down.

[37:13] 

So we spent a lot We've got a time discussing ZSAs. We've just spent some time discussing the sustainability fund, and I wonder if there's anything else to discuss on that topic?

[37:29] - **Daira Emma**

I think it's difficult because the people from Shielded Labs are not here. Yeah.

[37:35] - **Dodger**

Yeah. The next Arborist call will be in the earlier slot. Yeah. And Tomek should be able to make it then.

[37:45] - **Str4d**

Yeah. And also while I was looking at the PRs earlier, it looks like sometime in the last week, they responded to the feedback that the Zip editors gave two months ago so there's going to be some additional things that I presume will come up at the next Zip editors meeting.

[38:26] 

From a sustainability fund part, getting an update from them on the status of an implementation and how that reflects on what's currently in the ZIPs, and additionally, how modular it currently is in terms of if we need to only include one or other of the ZIPs, as we were just saying before, depending on complexity and audit budget and whatnot. Getting feedback from them on that will will be useful as input.

[39:05] - **Dodger**

I think the other thing that they were asking for is what the requirements are. And I've literally just gone and dug out the checklist that we put together relating to end NU5, which might provide us with a starting point. A lot of this stuff won't be applicable. So for example, peer review, or I don't think we need a peer review of the sustainability fund.

[39:50] - **Daira Emma**

Yeah. So both of the upgrades that this is comparing, NU5 and Sapling, are major circuit grades. So this would be comparable, say, to the upgrade in which we do ZSAs, but it's not quite the same as other upgrades.

[40:11] - **Dodger**

I think these items are probably relevant to spec audit, code implementations and testing.

[40:35] - **Str4d**

The thing that we haven't had in previous network upgrades that I want to strongly encourage, and qedit has already started along these lines on their own in terms of enabling this, is getting to the point of an implementation where people can be actively testing it before things are finalized with it.

[41:04] 

In the recently ECC roadmap, this is mentioned as transient test nets. For things that are having a wider impact on the consensus rules, so like explicit fee field, that's relatively minor. But a change to issuance is not so much. Getting to the point where people can download the latest version of what the implementation is, run it, connect to a globally running test net of anyone who happens to be participating in it, check things out, run things, and then that is expected to roll on a weekly or fortnightly basis, would make coordinating on and testing these things far early on and finding things early, it would make that far easier.

[42:04] 

We've referred to things in the past of things like testnet in a box and other things we've tried to do to make testing easier. I actually wanted to happen this time.

[42:19] - **Daira Emma**

As I just pointed out on the chat, the roadmaps that ECC posted has transient testnets of penciled in for June for NU6. Yeah.

[42:32] - **Str4d**

And those currently are indicated as transient test nets for the early stage of what might be collected into that upgrade. But I would love to be seeing things earlier than that for the specific ideas. We should always be testing.

[42:55] - **Arya**

We are also making progress towards configurable testnets in zebra as part of the regtest work.

[43:05] - **Str4d**

The thing that would be neat here, I think from an enabling it to perspective is if there was something in... Probably the thing I'm thinking about here is really just a GitHub action that runs weekly and just shuts down on whatever branches we configure it for. If we have a feature branch for ZSAs, a feature branch for ZSF and so on, that then the people primarily helping to get that in are doing integration testing and things there. Then weekly or bi weekly, the action just runs and tears down what's ever there, builds a new thing, sets it up, and we go from there. I don't know how much effort that will be to set up, but that feels like if we can get that running, then we can have a bunch of... People can then just build feature branches and just immediately hook into that process.

[44:05] - **Daira Emma**

Yeah, I don't know whether this is too ambitious, but it would be nice to have a testnet with both zcashd and Zebra on it, but we shouldn't block on that if it's not visible in the time.

[44:25] 

Well the public testnet obviously has had zcashd and Zebra running on it at various times, for NU5, for example.

[44:38] - **Str4d**

Yeah, but these transient test nets, for the reason of we want them to be iterative and quick, we also don't want to be paying a bunch of cost to run real-world mining on them. The approach that Arya was mentioning before of not even having proof of work at all on them makes total sense for this environment because we don't need to be testing the interaction with real proof of work here in most cases.

[45:01] 

Some test nets, we would need that. A proof of stake testing test net needs to also have the proof of work bit. But for most of these things, what we're really interested in is the consensus feature. We don't need any of that. Really, I would think of this more as a global two-week long version of the zcashd regtest, integration testing, rather than the duration of a single CI run.

[45:36] - **Dodger**

Because we obviously have a CI that does a fair amount of what's just been described to run through a whole bunch of tests. So it may be worth, when the time is right, when we're ready to start talking about doing this, to look at how that's set up. And Gustavo would be the man to talk us through that, though obviously all the ZF engineers are somewhat familiar with it. But I think that's for a later date.

[46:15] - **Daira Emma**

By the way, the things that you've got here are already on the [core DAG](https://zcash.github.io/developers/zcash-core-dag), possibly with the exception of testing, but I can easily add that. The core DAG is going to be the point of truth for what the dependencies are in tasks for NU6 and NU7.

[46:42] - **Str4d**

At least from our perspective, other people can maintain their own to-do lists if they wish. Exactly. We like DAGs.

[46:50] - **Dodger**

We should also just, for completeness on this, we should put spec written at the top, if we're going to try and make a general list here.

[47:11] - **Str4d**

Zip is context dependent, but yeah.

[47:18] - **Dodger**

 Do we need the Zip editors to sign off and say that this Zip is suitable?

[47:33] - **Str4d**

So the general Zip process here is anyone can draft a Zip. ZIPs live in the draft phase. What we're trying to move towards is rather than having long running PRs in the ZIPs repo, moving towards getting an initial draft in, get that to the point where it's like we're at least comfortable that this is something that wouldn't be against the ethos of Zcash. It's something that there's enough interest in the ecosystem to pursue and then get that merged in and then it lives as a draft continually being improved until it gets to the right point.

[48:12] 

The right point here is when it goes to, I think the status is proposed which is the transition from this was a draft and it's possibly incomplete to this has had sufficient eyes on it, it has achieved essentially rough consensus. As you know, it's somewhat beyond that point. When it transitions to propose, the Zip editors are satisfied that... There may be tiny changes and things that happen in the process of getting implementations in, but the Zip is in a state where what will get deployed is basically that.

[49:05] 

So there's no major outstanding issues. From the perspective of a consensus-related Zip, that's the point at which the It needs to have essentially been spec-audited. I don't think we can really transition. For most, specifically consensus ZIPs, we can't transition to proposed.

[49:43] 

Implemented is the status I'm thinking of. Yeah. Because if we look at those particular steps in there, down to the status down here.

[49:52] - **Daira Emma**

And implemented, it's a status that applies to either zcashd or Zebra or both.

[50:01] - **Str4d**

Right. But implemented is where we have a working reference for this before it has been activated in the consensus upgrade. So proposed is the point where the community is like, "we're on board with this. This is the thing. It's going to go into some upgrade". It hasn't necessarily been scheduled for an upgrade. I guess that's the core distinction there. Proposed does not mean this is going into NU6 or NU7 or whatever, but proposed does mean this is actually going to make a network as it is.

[50:36] - **Daira Emma**

The point at which it's definitely, I mean, subject to security bugs and emergency changes. The point at which it's going into an upgrade is when you have a deployment set that specifies everything going into that upgrade. There's for every previous upgrade.

[51:03] - **Str4d**

I know it actually Zip0 does say that a deployment section must be present for the Zip to change status to propose. That technically is stronger than what I just said, which that implies that you can't transition to proposed until it has been scheduled for a network upgrade. I personally don't think it needs to be quite that strict, but we should have a… At the point it goes to propose, we need to know how it is going to be deployed, even if we don't know precisely what upgrade it's going to go deployed in.

[51:31] - **Dodger**

Would it be useful to come up with a flowchart similar to this?

[51:37] - **Str4d**

We have had several such flowcharts in the past, and how well the Network Upgrade Pipeline, if that's a term people remember, has helped people is debatable. But yeah-

[51:51] - **Daira Emma**

I think the problem with the previous Network Upgrade Pipelines is the timelines, mainly the timelines for planned upgrades were not realistic, and so they would tend to slip.

[52:09] - **Str4d**

But yeah, a general workflow because the Zip at the moment is just a very big wall of text. Github now does actually support rendering to like, Mermaid diagram, something. So actually having a flowchart that corresponds to what we currently have written in there would be quite That's really beneficial, I think, for other people to-

[52:33] - **Dodger**

I think not just having it written, sorry, not just what's in Zip0, but also things like the implementation of it, the explicit things that we plan to require.

[52:47] - **Str4d**

I agree that that should stuff should exist, Dodger, in that diagram and my point is that that's what Zip0 is meant to be codifying from the perspective of how we get specifications to be part of the network.

[53:04] - **Daira Emma**

No, there's a placeholder for a Zip1, which was going to say basically precisely what Dodger said, but we never got around to writing it. And that would have been what is the process for a network upgrade?

[53:29] - **Str4d**

Oh, so there is. I hadn't seen that then. And, yeah, we should just put that diagram there instead then.

[53:37] - **Dodger**

Some other things that pop into my head, obviously, we've talked about potential interactions with other changes, and I guess that will end up being included on the umbrella of a deployment zip. What about an analysis of what other changes might be required to, for example, wallet or to-

[54:12] - **Daira Emma**

That should be in deployment sections.

[54:16] - **Str4d**

Yeah, that stuff is stuff that... But yeah, those kinds of considerations are things that the ZIPs themselves and the zip authors need to be taking into account and this is partly why I want people to move in the direction of doing the specs and the implementation somewhat in parallel so that the deployment issues can be determined empirically as opposed to guessed and then re-evaluated later.

[54:58] - **Daira Emma**

I'm conscious that we don't want to add too much process because it can be an obstacle to contributors. Yeah, there's a happy medium there.


___

### 5 Network Upgrade Planning ii) ZIP Process


[55:22] - **Dodger**

Just one thing I would say is that the convention or the practice of writing the spec and doing the code implementation at the same time might be fine for a situation where the people who are writing the spec are doing all the code implementations for all the nodes, but it was certainly a struggle for the Zebra team.

[55:54] - **Daira Emma**

I mean, there is a tradition and the conventional wisdom is that I think that's the best approach for things like RFCs that you need to implement in order to get feedback. Zcash in general, has always been a system where specification has been front loaded, and we've tried to get specifications right in advance. I think that has worked out very well. But again, there are trade offs between how much prototyping work do you do while you're writing the specification. I don't think you need to have final implementations done when you're writing the spec.

[56:46] - **Str4d**

Yeah, we don't need final code to be done before as it can transition to proposed.

[56:54] - **Daira Emma**

No, that's why it's in the order it is. Draft to proposed, to implemented, to active. Yeah.

[57:04] - **Str4d**

Yeah. And again, the conversation is drifting a little bit far away from the specific ZIPs we're considering for this.

[57:13] - **Daira Emma**

We really need to get on to the actual proposals for NU6, really. Yeah.

[57:18] - **Str4d**

But the point I would just, to hopefully cap this off, say is that the fact that I and others want implementations to be done earlier It shouldn't mean that people who are good at writing specifications but aren't good at implementing things should be dissuaded from writing ZIPs. But someone needs to do an implementation at some point, and it's not something that should just be assumed that, Oh, the full node maintainers will do the implementation. If an idea is popular enough, you'll be able to find people who are interested in implementing it, put it that way.

[58:09] - **Daira Emma**

Zcash is an interesting position in that a NU6 For the time being, is probably going to be the only upgrade that requires implementation in both zcashd and Zebra because then it will just be Zebra. We may have more than one node implementation in the future. I don't know. The process should allow it, obviously.

[58:39] - **Dodger**

In other situations, I've seen situations where there must be an implementation for one... There must be a code implementation for one equivalent of a node in Zcash. In order for it to be demonstrated and tested and whatnot. And then once there is an agreement that the change of the protocol is going to happen, and it is finalized, then the implementations are done for the other nodes.

[59:23] - **Str4d**

At that point, you've got the general buy-in to justify doing that. Whereas when you're at the point of just having a zip, then it can be harder to make that determination.

[59:36] - **Daira Emma**

Yeah, there are stricter requirements on the number of implementations for some RFCs that are on standards track, but I don't think that's necessary here.

[59:51] - **Dodger**

Okay. So I think this is a start of providing some clarity and expectation around what people are going to need to do if they expect a proposal to be included in a network upgrade.

[01:00:12] - **Daira Emma**

And we should mention that just having code implementations doesn't mean that this is going to get into the protocol because the community consensus can always say, no, you have to abandon those implementations. We're not doing this.

[01:00:32] - **Dodger**

Yeah. I guess, just a comment there. I guess there's a little bit of a race condition there where If there's a requirement to do an implementation, then you're potentially asking people to implement throwaway work if there isn't yet clear community consensus around it, which I think be the case for the sustainability fund. 

[01:01:06] - **Daira Emma**

Yeah, that can happen.

[01:01:09] - **Andrew**

I'm a little confused at the process for ZIPs. If draft is just an idea and proposal is when it should be ready to implement and it's been more reviewed. Zip320 has been a hot Zip lately with text addresses. It's still in draft status, and yet it's been implemented in wallets already. And Librustzcash, why is this just out of date? Or is this a bad example of how Zip flow usually happens?

[01:01:39] - **Daira Emma**

It should probably be in a proposal.

[01:01:42] - **Str4d**

I thought that there was a PR to update its status.

[01:01:46] - **Daira Emma**

Oh, it may just be that that PR hasn't been merged yet. It just didn't get sufficient review yet.

[01:01:54] - **Andrew**

Is it common for coding? Because months ago, a month or two, maybe, I considered implementing Zip320, and I went to the forum and said, What does draft mean? And it was like, It's not ready for implementation, so I didn't implement it. But I wanted to hear anybody else implementing it.

[01:02:10] - **Str4d**

The thing was, there was a point where it was still in draft implementation because it had… I think actually the draft that is there may actually still be the draft version because it included several different options, for instance, and implementing the whole thing would indeed have been incorrect. No, that's too much. Yeah. So that bit's been merged then, in which case the status should have been updated.

[01:02:38] 

Also at least the ECC parts of the Zip editors were in crunch mode basically all of the beginning of this year.

[01:02:51] - **Andrew**

Github doesn't do a great job of this. I don't know if there's something we can do to improve it on our side, but discoverability of pull requests that ZIPs is terrible. The Zcash Wallet Best Practices Zip, I was looking at it in Main only to find out later, Oh, no, it didn't even exist in Main. Everybody was looking at a particular pull request, and I had no idea that that's what introduced the Zip, and I couldn't find it.

[01:03:19] - **Str4d**

This is precisely why the comment I made before about what we want to move to is rather than having these long-running PRs that live live in the PI, and you have to know to look there to be able to find it, what we want to move to is smaller, more granular updates to the ZIPs so that if you look at what's in main or look at what's published on the website and you look at that draft, that will be the most recent version of the draft.

[01:03:46] 

There might be changes to that draft being proposed and considered, but those changes should, in general, be smaller and more manageable. That sounds good. Then the process of going from draft to proposed is the point where you are ensuring that there has been review of the Zip draft as a whole, not just in the incremental updates. For what it was, there's not a single open PR that mentions 320. When I search GitHub for PR.

[01:04:21] - **Daira Emma**

That was a mistake. It should have been in 798, and I just omitted to update it. 

[01:04:31] - **Str4d**

The other aspect here to remember, and this is where a diagram would be more helpful, is that there are two workflows for ZIPs here. One goes through draft, proposed, implemented, final, or active as a consensus track, which has a much more integral tie in into the network upgrade process. Then you have things like Zip 315 or wallet-level things, which they are standards to the point of wallet implementers needing to agree on them, but they don't need to be as tightly regimented for the process of going through because they don't require coordination at a global network consensus level. They are just at a wallet consensus level.

[01:05:24] 

We still need to be careful with them. The main issue here is just making sure we're not things aren't stated to be proposed or active or whatever when they're not. As an example of this, actually, the Zip 316, which is the UA Zip. We recently realized that actually we need to be able to distinguish revisions there because revision zero is final, but revision one is now only at the proposed stage and it's still being implemented. Where previously the entire thing was marked as final.

[01:06:04] - **Andrew**

I think calling out the two different levels of rigor that ZIPs will go through, depending on whether they tackle consensus stuff or just guidance and wallet individual app stuff, would be really good to call out. Because even though I've been in the community for a little while and semi-active, I find the idea of writing a zip very intimidating. If I felt like or if I was aware that there was a lower level of rigor, rigor for some ZIPs than others, I might be more daring enough to try my hand at some of the less rigorous ones as a way to get more involved.

[01:06:39] 

Yeah, that's good feedback. That's the thing where adding clarity to zip zero, and in the case of things that hit consensus, zip one, as well as there's a guide down the bottom for how to do ZIPs. Which starts with, Don't panic and like friendly letters on the cover.

[01:07:05] - **Daira Emma**

Zipguide.rst. Yes. I have just opened [817](https://github.com/zcash/zips/pull/817) for a Zip322 proposed.

[01:07:14] - **Str4d**

If the Zip guide is still intimidating or has things that you think you want clarity on, please open an issue and that can be a documentation bug to fix.  

[01:07:32] - **Dodger**

I feel like the distinction is similar to the distinction between a hard fork and a soft fork. 320 is important because ideally, all wallet should hopefully eventually implement it, but it's not as important as, say, if we were to implement text addresses at the protocol layer.

[01:07:56] - **Kris**

Yeah, exactly.

[01:07:59] - **Dodger**

Okay, probably. I've shared this checklist with Darish Strad, Kris, and the ZF engineer. So feel free to make suggestions or changes or whatnot.

[01:08:18] - **Daira Emma**

By the way, my OCD is preventing me from refraining from pointing up the typo and title. Thank you.

[01:08:32] - **Dodger**

Okay, I feel like we've done that topic to death.


___

### 5 Network Upgrade Planning iii) Zcashd deprecation / NU6 items 


[01:08:39] - **Dodger**

Let's go back. So next up is talking about Zcashd deprecation. We talked a little bit about this previously, but maybe we should delve in a little bit on some of the specifics and talk about how we're going to actually make it happen.

[01:09:06] - **Daira Emma**

All right. So just on time, how much time do we have left? Because we also want to talk about the specific NU6.

[01:09:15] - **Str4d**

Yeah, actually in this call, I don't think we have time to go over this, but I do want to because this looks like a very nice... Yeah, this is a great expansion of a DAG that I threw together at Real World Crypto, and I definitely want to get this into more hands.

[01:09:36] - **Daira Emma**

Which is more important for us to do in this meeting, the Zcashd deprecation or NU6?

[01:09:43] - **Str4d**

I think NU6 NU7 piece. Because we've only got another 10, 15 minutes before we start running over at this point.

[01:10:02] 

I'm loathed to say we need more meetings, but we might need more meetings.

[01:10:15] 

Forget about NU6 and NU7 for a moment. The set of things that have been discussed as ideas for candidates for inclusion at this point are ZSAs, which is very clearly, it's going to be a candidate for inclusion, we just are figuring out the pathway to get it in as quickly as possible.

[01:10:43] 

The Sustainability Fund, there are ZIPs. The ZIPs were, at least when the Zip editors last looked in a couple of months ago, needed some more work as we saw there. We've now had the update that there is implementation going on There's a potential candidate there.

[01:11:04]

The change for explicit fees, which is basically something that we have wanted for ages, but have just never quite had the complexity budget to add it in along with everything else that has been going on. But that's essentially requiring that the transaction explicitly encode the amount of the fee rather than implicitly determining it. For purely shielded transactions, the fee can be directly be determined from what's encoded, so that would be duplicative. But for any transaction involving transparent, having the explicit fee means you don't have to do an input lookup, which greatly simplifies a lot of wallet UX and fixes UX bugs that users have been complaining about at various points in time.

[01:11:59] - **Daira Emma**

Did you mention the advantage for hardware wallets?

[01:12:03] - **Str4d**

We've done things for hardware wallets in the past where you have to calculate the fees when you're creating the transaction, but that's at transaction creation time. We had already addressed those in previous upgrades with the change to the equihash algorithm. This is purely an upgrade for when you receive a transaction for history displays and things like that.

[01:12:25] - **Daira Emma**

I see. I think actually it solves the hardware wallet issue more robustly than Zip143 does, but that's just my opinion.

[01:12:36] - **Str4d**

Yeah. That's a candidate. It's like explicit fee field in transaction format is essentially the proposal. The next one after that that has been proposed is changing the way that memos work to essentially create an idea of memo bundles. The summary here, which I've given in previous calls, but to give it here again, currently, there is a memo field of 512 bytes in each output for Sapling and for Orchard.

[01:13:16] 

Each output in each of those has an associated 512 bytes memo field. The limitation there is that each transaction only gets that output, which means that Each output only has access to at most 512 bytes, 511 for arbitrary data. That places limitations on functionalities such as reply addresses. People have done informal things with reply addresses in the past where they've just stuck the text encoding of the address into the field and whatever, but there's no authentication there. You can put whatever you want in there, and it doesn't bind it in any way to the transaction

[01:13:56] 

The concept of authenticated reply addresses is where you include essentially a zero-knowledge proof that the address in the memo field is bound to the same spending key as one of the inputs to the transaction.

[01:14:13] - **Daira Emma**

To be clear here, it's not that authenticated reply addresses are a consensus feature. It's just that that proof is quite large.

[01:14:23] - **Str4d**

Yes, exactly. Sapling only, there's a protocol already for hacking this in for sapling receivers, but for Orchard, the HALO 2 proofs are just too big. You can't fit them in a single one. There's also been a bunch of other ideas proposed over the years for multi-part memos and stuff. Essentially, what would we do if we had larger memo fields. The idea of a memo bundle is instead of having one memo per output, each output gains a memo key, which gives them the ability to decrypt zero or more of the memos in the memo bundle.

[01:15:02] 

The specifics of this are still to be determined, but essentially would be that the memo bundle contains a series of chunks, and within those chunks, some subset of them you can decrypt, which concatenate to form a variable length memo. The details there are really around how you continue to hide arity, whether we continue to use 512 byte chunking or padme for padding or something like that. But the general premise is that you have a block of data which is independent of sapling or orchard that the memo data goes into. Then what goes specifically into the sapling and orchard parts is a key that lets you decrypt some or all of that data.

[01:15:50] - **Daira Emma**

We know basically how it will work. There's probably a couple of days specification work and then making sure that it fits with potential ZSA changes. But it's not very much specification work.

[01:16:11] - **Str4d**

I think that's everything I'm aware of. There was another list somewhere.

[01:16:17] - **Daira Emma**

I mean, there's a list in the ECC roadmap design document.

[01:16:30] - **Str4d**

The TFL. Yeah, the only other thing on that list was just if there is a funding stream change for a dev fund or something, that would be the last thing that would go on that list of things being considered.

[01:16:45] - **Daira Emma**

Yeah, I think that TFL and NU6 timeline document is not public, but it doesn't contain anything that we haven't discussed just now, and Funding Stream change.

[01:17:08] - **Dodger**

So one thing I want to say is, I think we need to discuss memo bundles more because I think there's a question to be asked as to whether we we want to double down on storing memo data on the blockchain or whether we want to store it off the blockchain, in which case it can be any size. And also that would support eventually moving to a more succinct blockchain architecture. Yeah.

[01:18:06] - **Daira Emma**

Putting it on the blockchain is convenient. It's not absolutely necessary, but it's convenient for restoring wallets from seed because then you don't have to go anywhere else in the blockchain to recover that data. That's, I think, the primary reason why we do that. There's also the fact that if you store it externally, then you potentially are leaking metadata about accesses to that external storage.

[01:18:41] 

If you were accessing it over a private mixnet-based distributed storage system, and you hand wave and assume that this has very good privacy properties, then yes, that is a reasonable thing to do. But then you have to have this distributed private storage system, and we don't have one.

[01:19:10] - **Kris**

I think that This is the thing that I see as... I agree with you, Dodger, that that is a desirable use case but for things like authenticated reply to, there I think there are good reasons to have that extra information attached to the transaction itself as opposed to store it elsewhere. But I see this as a process of evolution by making it possible to put this data on the blockchain.

[01:19:52] 

That would also probably have to include some ZIP 317 changes since the transaction structure is going to change the cost that the ecosystem of storing data on the chain is going to change proportionally to how memo bundles are done and so forth. I see this as just a stepping stone, the next evolution of memos. And while I agree that we also want to solve the larger problem, this is a tractable improvement on the current state of the art.

[01:20:28]

And specifically, I want us to have a solution to both authenticated reply to and payment disclosure without having to wait for a mixnet.

[01:20:43] - **Daira Emma**

The other thing is, so currently the ciphertext uses authenticated encryption, and that authentication is over both the note and the memo. That's inconvenient because if you're sending to a light client, the light client always needs the note, and it may or may not need the memo. You also want to be able to trim memos more easily. If you have, as would be the case with this memo bundle proposal, if you have an authenticated ciphertext for the note and separate ones for the memos, then it's all much neater and easier to analyze and potentially more efficient.

[01:21:46] - **Str4d**

That also then means from a pruning perspective, if someone wanted to run a build of zebra, for instance, that... I mean, zebra's current architecture It doesn't necessarily make this particularly easy with the RocksDB that is immutable. But if someone wanted to run a version that was doing pruning, one option here would be that you could just prune out the memo bundle parts of the transactions and just leave behind the necessary hashes to continue to be able to calculate the TXIDs and so on.

[01:22:20] 

If you wanted to run something that allow people to recover their funds but not recover the memo data, potentially. Andrew also makes a point in chat about the variable length memo will also leak the length of the memo. There are ways to avoid that or mitigate that. The simplest one is if you consider that right now, we already leak the arity of large transactions, the number of outputs in a transaction is already leaked. A transaction that had effectively one unit of memo bundled data per output is equivalent to what we currently have, except that it's paying an extra 32 bytes per output or something for the extra keys, and then an extra, well, 48 because we have the extra tag as well.

[01:23:12] - **Str4d**

But what you're leaking then is an upper bound on the number of memos. You're not actually leaking the number of memos because that memo data might be one memo per output, but it could be a single memo that every output or even a subset of outputs is able to access. So there's greater... You're hiding several different possible usage patterns within one pattern of memo data.

[01:23:43] - **Daira Emma**

I think we'd also plan to use Padme, which is a proposed padding scheme that obscures lengths and has some academic analysis, which is-It's also been just deployed by Apple and they're a PQ3 protocol for iMessage. Yeah, so that's a well-understood padding scheme.

[01:24:13] - **Dodger**

Like I said, I think it's a topic we can include in a future Arborist call. With regards to the dev fund proposals that are currently on the table, only one of them proposes a... I'm not going to put this, complex or it's something that is more complex than what exists with the current debt fund. So the current Dev fund is fairly simple, split amongst a specified number of... Well, I'm sorry, I just wanted Daira to make a special reaction to that. But it is move forward and there isn't any complexity. Gguy's proposal, if adopted, would see a change in the distribution of funds with every single block, which obviously introduces a bit of complexity.

[01:25:23] - **Daira Emma**

So Str4d was talking about trying to convince proposers to keep the proposals within what could already be implemented using the existing Zip 207 mechanism. I think we figured out a way to do that for Gguy's proposal.

[01:25:47] - **Str4d**

It's not non-trivial, but at least the last time I looked at it, it was doable to do it. Although the Gguy's proposal is also one of the ones that would then interact more complexly with the ZSF Zip for changing the issuing schedule.

[01:26:07] - **Daira Emma**

Yeah, the interaction there is quite tricky. I was thinking earlier, so I don't know what Josh would think about this, but a possibility is just two years for and just a one-third split between ZCG, ZF, and ECC. That's my personal preference.

[01:26:43] - **Dodger**

You should propose that.

[01:26:46] - **Daira Emma**

I think I will. 

___

### 5 Network Upgrade Planning iv) Possible NU7 Items 


[01:26:54] - **Dodger**

We are technically at time. Do we Do we have any other candidates for NU6? And are there any separate candidates for NU7?

[01:27:18] - **Str4d**

So the obvious candidate for NU7 is if we do a split that way as ZSAs. And technically, anything we don't put into NU6 could be put into NU7. It's Yeah. Again, I would be worried by a complexity budget if we did that.

[01:27:36] - **Daira Emma**

But maybe depending on the details, I could be.

[01:27:43] - **Str4d**

Yeah. In past network upgrades, we've had documents where we've looked at different combinations of proposed changes and figured out what... One of the motivating things there was what combination of features can we do within the given complexity for what time is left to do to get things through. Currently, we can see from this, ZSAs is complex. Sustainability fund really has three parts to it because there are three ZIPs, and one of them is relatively comparatively simple, one of them is comparatively complex in its interaction, and one of them is simple but it has the consensus question of 

[01:28:31] - **Daira Emma**

Yeah, Andrew Arnott raised scaling and smart contracts.

[01:28:41] - **Kris**

So the answer to that is no on both.

[01:28:44] - **Daira Emma**

Very complicated Well, no, in the sense that if we did either of those, then we couldn't do ZSAs in the same upgrade. 

[01:28:57] - **Str4d**

To summarize discussions that have happened at multiple previous arborist calls, but possibly several years ago. The scaling aspect, the primary vehicle for that is going to be some nesting or recursion in proofs based around that. That was what the NU5 in part was setting the groundwork for by shifting the route of spend authority for funds for Orchard to a curve that is compatible with recursion. There's still a bunch of work that would be needed to do to enable that work. Currently, the long term R&D, at least that ECC is working on, is in the direction of proof of stake I did. But we've already essentially done the groundwork towards enabling that.

[01:29:51] - **Daira Emma**

I was going to mention that. It seems that there's a consensus that ZSA days are the highest priority to be done for the next two upgrades. But there might not be a consensus on whether proof of stake or scalability or some programmability is what we want to focus on after that. Proof of stake is the closest to having a concrete design. We can see how to design a hybrid consensus with Crosslink 2 and the existing proof of work and some BFT algorithm. Which BFT algorithm hasn't that have been established, but we know the properties that it would need to have. For programmability, I think if we wanted to minimize the amount of design work, then probably we might want to look at existing systems like Mina, Aleo, and so on, and see whether we can reuse any of the design ideas and perhaps even implementation from those.

[01:31:34] - **Dodger**

There will be a presentation on that topic during ZconV.

[01:31:38] - **Daira Emma**

Cool. I'd like us to keep that on the table. It's very much welcome to discuss it at Zcon or at the Z/ECC summit. Let's see, what was the other one? Scalability. You can I see from the answers to these questions that this seems to be a lower priority for most people, I think. It's difficult to interpret because obviously it's...

[01:32:20] - **Dodger**

This is four, three and a half years? Sorry, two and a half years old now.

[01:32:27] - **Daira Emma**

Yeah. So I think it's too difficult to interpret these questions, and we should possibly have another poll, maybe at Zcon, about what people think about the relative, given that we're basically adding user-defined assets, what the priority is between the other three.

[01:32:57] - **Arya**

What about detection keys as a candidate for a NU7?

[01:33:01] - **Str4d**

Definitely not a candidate for NU6 because we don't have a concrete proposal for that yet.

[01:33:09] - **Str4d**

NU7, it would potentially be a candidate. We would need to think more or less around a design. We've had a few ideas at various points, and we, at least... When I say we, I mean the set of people who over the years have been thinking about protocol evolutions to shielded protocol, have not found a design that we were at the time happy with for the trade offs that it was making.

[01:33:39] - **Daira Emma**

At that time, we were placing a much higher emphasis on address size. But now that we're using unified addresses, which are generally much larger, I think that needs to be revisited and there may be ways to to do it, but I have perfectly reasonable address sizes. Whether we could do that at the same time as ZSAs, I don't know.

[01:34:11] - **Str4d**

But it is the thing that if we want to deploy something, we as the community, and specifically people who are interested in getting it out, should be thinking about it in the window of the next 4 to 6 months. Because if we wanted to include it on the timeline of an upgrade that went out in April, whatever upgrade that is, we would need for something of that kind, which is changing a critical enough part of the pathway that we would need quite a bit of time for review and all the different things. I would want that to be probably in place by August, September, I would think, offhand, if we wanted a chance of getting into an upgrade that was going out in April.

[01:35:14] - **Daira Emma**

I want to raise another potential feature, which is postquantum privacy. I was at a real-world PQC and real-world crypto and hacks in Toronto recently. There was a lot of focus on upgrading protocols to be postquantum private, and especially in the context of... You might be skeptical about whether and how soon quantum computers can break public key encryption. But the forcing factor there is the fact that an adversary can just store the ciphertext, or if it's a blockchain, then they have the cipher text and decrypt it later when they have a quantum computer. In the worst case, that could reveal the whole Zcash transaction graph and all of the memos.

[01:36:21] 

It wouldn't allow spend authority attacks. There's a potential fix to this, which is to use a postquantum algorithm for the note encryption. What I think you're going to write there is that if addresses are treated as shared secret, so in other words, the adversary does not know an address, then Zcash already postquantum. And I talked about this a bit in my presentation for Zcon3, I think it was. Was it Zcon 3 or 4? Anyway. But That doesn't help you if you're publicizing addresses because you want anyone to be able to send funds to you.

[01:37:25] - **Str4d**

And also, correction, I believe for what you've just written, Dodger, is that the end of the sentence?

[01:37:34] - **Dodger**

Zcash funds are not at risk from advances in quantum computing, but privacy is.

[01:37:39] - **Str4d**

No, that's backwards.

[01:37:42] 

Zcash funds are absolutely at risk from advances in quantum computers because the... Yeah, so the little bit of a modicum of computer science here, you can have perfect hiding or perfect binding, but never both. And the protocol The protocols that we currently design for are for perfect or as close to perfect as we can get hiding, which means that the primitives that we have chosen are vulnerable to essentially false proofs if a quantum computer exists. However, That is only a risk from the time that the quantum computer becomes viable.

[01:38:20] - **Daira Emma**

Sorry, that's what I was trying to get at.

[01:38:22] - **Str4d**

It's the same risk as with signatures, where for historical data, looking at historical data, it's irrelevant because until a quantum computer exists, correctness is fine amongst classical computers. From the point the quantum computer exists, past funds, past transactions won't be altered because of the nature of the proof of work chain. It's ongoing funds from that time. The risk here is for what's called like harvest now decrypt later attacks, which is for encryption, not authentication.

[01:38:58]

That is where The memo data stored on the chain, the way that Zcash does its privacy is perfectly quantum private, except for the note data stored on chain. That is private if your recipient address is kept private. That's the distinction that was being made there. We have a limited issue for postquantum privacy, which the for this would be make a change that resolves that, and then the process of switching to postquantum secure from a correctness point of view primitives, that's an ongoing research question from figuring out what kinds of postquantum systems can give us the efficient ZKPs that we need to be able to switch to them.

[01:39:52] - **Daira Emma**

Yeah. There are candidates already for postquantum stocks, but I think it's not the right time to consider moving Zcash completely to postquantum stocks. But in the NU7, NU8, a new nine timelines, it could be worth switching to a postquantum node encryption algorithm. Or actually, what you would do is a hybrid algorithm that is I'm not sure if either the postquantum one or the conventional one is. If you did that, then you would protect against Havas now, decrypt later, or text. Yeah.

[01:40:42] - **Str4d**

Also for context there, Bitcoin and other cryptocurrencies are also in the same way at risk from advances in quantum computing because transparent funds are authorized by... Zk transparent funds, Bitcoin funds, they're all authorized by Signatures, the form of which become vulnerable to quantum computers.

[01:41:08] - **Daira Emma**

And also other private cryptocurrencies like Monero and something like these things. .

[01:41:18] - **Str4d**

And any private cryptocurrency that isn't vulnerable in this way using classical cryptography is instead vulnerable from a privacy perspective. There are bigger targets once a quantitive computer becomes viable for these kinds of attacks.

[01:41:45] - **Dodger**

Right. We are over time. We're 50 minutes over time. Shall we leave it there and pick up again in... Well, we can either pick up again in a couple of weeks or we can consider scheduling something extra in the meantime. But any strong thoughts? Okay.

[01:42:09] - **Daira Emma**

So the question is, I think based on the timing of When we need to have a new six fully specified, we probably shouldn't wait two weeks.

[01:42:23] - **Str4d**

Two weeks from now, we're getting into, like it's the beginning of May, and we really need to be starting to implement some of the things that we want to go into in new six and getting things in now. We already mentioned, I think, in the previous call that, for example, the ZSA stuff, the last ZSA call we had earlier this week, one of the things out of that was, let's start getting the note encryption pieces in, the first parts of changes that need to happen to be able to make the transaction format changes and so on. We are already needing to start doing these things. We need to have a lot more agreement on what we want to go into it if we're going to be working on the right things in the next couple of months.

[01:43:13] - **Daira Emma**

I think just moving forward to the next one to next week, that makes sense.

[01:43:23] - **Dodger**

Well, I'm not sure we can just move forward to maybe a case of adding in another extra one.

[01:43:34] - **Str4d**

I think adding in is going to be a better way to do that.

[01:43:37] - **Daira Emma**

Yeah, and that would be at a time when the Shielded Labs people can attend, presumably.

[01:43:44] - **Dodger**

Okay. So again, the same time as our easy ZF engineering sync. Actually, we can talk about zcashd deprecation then as well.

[01:43:56] - **Str4d**

But next time, we should front load the sustainability fund piece because that's the one that I think we have the... We need the most information on.

[01:44:07] - **Dodger**

We'll probably schedule that tomorrow, given how late it is here.

[01:44:11] - **Daira Emma**

There was one more point I wanted to make about of any seven and subsequent upgrades is that we could always find a security issue at any time that required something to be inserted into an upgrade. So we always need to have the flexibility to drop things if needed.

[01:44:39] - **Dodger**

If only we could plan our security issues in advance, that That'll be great. Cool.

[01:44:49] - **Daira Emma**

I mean, we did pretty well with that plan.

[01:44:53] - **Dodger**

Yes, I still think that the effort involved there goes goes unrecognized and somewhat unacknowledged. Okay, let's leave it there. We'll return again in a week's time. I will once again spread the information on the forum, and this time I'll try and make sure that the link actually works like earlier today. Apologies for that. Any other final business before we wrap it up? In that case, I'll say good night and see you all next week.

____


### Attendees

+ Daniel (decentralistdan)

+ Alfredo Garcia

+ Andrew Arnott

+ Arya Solhi

+ Conrado Gouvea

+ Daira Emma

+ Jack Grigg

+ Josh Swihart

+ Kris Nuttycombe

+ Taylor Hornby 

+ Brian M   

+ Vito 

+ John Bruhling 

+ Justin Meharchand 

+ Marek Bielik

+ Michael Harms


**Next Meeting Scheduled: 21:00 UTC May 3rd 2024**


___
___
