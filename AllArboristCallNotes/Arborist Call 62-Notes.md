# Arborist Call #62 Notes

Meeting Date/Time: October 5th 2023, 21:00 UTC

Meeting Duration: 1 hour 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro - [ZCAP poll](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#0-welcome-and-meeting-intro---zcap-poll)

+ ECC Core Update - [Zcashd 5.7.0 / Mobile SDK testing](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#1-ecc-update---zcashd-570--mobile-sdk-beta-testing)

+ Zebra Update - [Zebrad updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#2-zebrad-status---zebrad-updates)

+ Research & Implementation Update - [FROST Community call / Updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#3-research--implementation-updates-i-frost-community-call--updates)

+ Scheduling NU5 Retrospective - [Scheduling NU5 Retrospective / Network Upgrade Pipeline](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#4-scheduling-nu5-retrospective)

+ Open Discussion - [Long Term Incentives for Miners](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2062-Notes.md#3-research--implementation-updates-iii-trailing-finality)

Video of the meeting: [recording](https://www.youtube.com/watch?v=jmeQayEd3zw)


Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes



### 0. Welcome and Meeting Intro - ZCAP poll 


[03:31] - **Jack Gavigan**

A quick reminder to anybody who is on ZCAP to dig out the email and vote in the Minor grants poll, there are 20 grant applications with a total aggregate grant value of over $225,000, but unfortunately, we only have $75,000 to allocate to them so your vote counts. Check your email for an email from the helios voting bot, and if you can't find it, check your spam folder.

[04:18]

I usually search for 'Helios' if I'm trying to find it. It's got the links in there to the Helios poll. Make sure you vote. The more people vote, the more engaged our community, the more justification we have for being able to distribute these funds. Right, let's kick off with core team updates, and we start this week with the Electric Coin Company.


___

### 1. ECC Update - Zcashd 5.7.0 / Mobile SDK beta testing 

[05:04] - **Kris**

All right, so the big news that is important for members of the Zcash ecosystem to be aware of is that [zcashd 5.7.0](https://github.com/zcash/zcash/releases/tag/v5.7.0) was released in the past week or so. This is a relatively small update from 5.6.1, but importantly, 5.6.1 is about to EOS halt on October 11, I believe.

[05:30] 

So you have about 6 days to upgrade to zcashd 5.7.0 before your existing system's EOS halt. So please do so to ensure the continued stability of the network. We're a little bit behind on getting out the release this time, so the window is shorter than normal. Apart from that, we've been making a bunch of progress on our development of the Zashi wallet, including Zcash SDK releases 2.0.0 and then a hotfix release [2.0.1](https://mvnrepository.com/artifact/cash.z.ecc.android/zcash-android-backend) is available for both iOS and Android.

[06:16]

For those of you who are on the Zashi beta testers list, the Android release is ready for you. So we should be getting that out to you in the next couple of days. For those of you on iOS, the most recent release of the Zashi wallet is out today. So I think that's the major stuff from zcashd and Lightwallets. I know that Nate and Daira have also been making a bunch of good progress on design of the Consensus protocol for Proof of Stake. I see Nate's here, so maybe he could give an update there.

[07:09] - **Jack Gavigan**

We'll come to that later, but any questions first for Kris?

[07:20] - **Daira Emma**

Are we looking to open the beta testing of Zashi to people listening to this call?

[07:31] - **Zooko**

Yeah, the process is reach out to Kris Nuttycombe or to me.

[07:35] - **Daira Emma**

Okay.

[07:38] - **Kris**

There's a there's a waiting list that people are able to join, and then we're filtering folks into the beta test from that waiting list as things stabilize.


___

### 2. Zebrad Status - Zebrad updates

[08:36] - **Teor**

So for Zebra over the last few weeks, we've been finishing up the testing and code cleanup for Fast Spendability rpc's, so they will be in the next release. We've been looking at activating our getblocktemplate rpc's in production builds, but we're just waiting on bug fix to merge for that. And we're looking at making our progress bar interface available in production builds behind a config.

[09:08] 

So if everything goes well, those will be in the next release or the one after. That means that if you want Zebra to look a little more like zcashd, you'll be able to do that, and we'll give you instructions closer to the date. We've also been preparing for the next release, but we ran into a performance issue in syncing in pre-release testing. So we're just fixing that up, and hopefully we'll have something for you in the next week or two.


___


### 3. Research & Implementation Updates i) FROST community call / updates


[10:22] - **Conrado**

So we just had a community call about FROST which was recorded, so I think we'll be online soon if you missed it. We mostly talked about some things that we need to figure out to actually get FROST deployed by wallets or any other tools. So with the feedback from this call, we'll probably start to have more information to plan our next steps regarding FROST.

[10:58] 

So just to keep everyone in the loop, the crates are ready. They have been audited. It's working. But of course, to actually get deployed it's tricky because it's a distributed protocol, so you need mechanisms to actually send message and this is the thing. We try to figure out what's the simplest thing that you can do to get this deployed. Like I mentioned, the audit report, all the audit findings have been addressed & merged. The audit report is ready but we're just giving some feedback about just the wordings of some of the findings. They have all been fixed but we want to make sure that the impact of each finding is accurate so that's coming up next.

[12:03]

We'll finish giving this feedback by early next week. So probably we'll have the final report maybe next week or soon after that. And we're working on the implementation side, finishing some refactorings because we want to do a release candidate of the crates, our plan is that while we are in this release candidate state for people to test it and try to find anything in the API that people think maybe needs to change or could be improved and after some period, I don't know exactly how much time, a month or two we'll finally release 1.0.0 stable.

[13:47] - **Daira Emma**

I'm sorry, did you say that the audit was published or not yet?

[13:52] - **Jack Gavigan**

Not yet. Okay. Is there anybody on from qedit? I don't think there is, is there?  They normally would attend the earlier session anyway. So let's move onto the sustainability fund. I see that Mark is on from Equilibrium.


___


### 3. Research & Implementation Updates ii) Sustainability Fund


[14:17] - **Mark Henderson**

Hello, Jason's here too, I think.

[14:27] - **Jason McGee**

I think our questions pertain.. Mark, unless you had any questions specific to the ZIP our questions were more so related to the discussion around the network upgrade planning.

[14:42] - **Mark Henderson**

Yes, so just to give an update to the group, we've written three separate ZIPs that are very granular in nature that sort of build upon each other, that establish the ZSF and then determine transaction fee splitting. Then another ZIP that smooths out the Issuance curve to take into account deposits into the ZSF in the disbursement or minting, if you will.

[15:13] 

Question we had was we got feedback saying that we should define a specific block height that this upgrade should take place on. It's a good suggestion, but it feels a little out of my pay grade to decide when something like that should happen, especially enshrining that into a ZIP at this stage.

[15:38] - **Daira Emma**

Who is that feedback from?

[15:42] - **Str4d**

Yeah, that was from me. Just to clarify what I meant there, I wasn't necessarily suggesting that it needed to be defining a specific height, but more that the ZIP should be describing how the transition from old Issuance to new Issuance is expected to go.

[16:07] - **Daira Emma**

Yeah, you can put a placeholder there to just put x's where the height would be. That should do fine for now.

[16:16] - **Mark Henderson**

The general guidance just to run it by you, is that it should happen pretty soon after a halving or when a halving would take place. So that it's the maximal increase in disbursement and then the curve would go down from there. Is that maybe correct?

[16:43] - **Daira Emma**

Is the rationale for that in the ZIP? I don't remember seeing the rationale.

[16:47] - **Mark Henderson**

Not yet. 

[16:51] - **Daira Emma**

If that's what you're recommending then, put some rationale for it.

[16:55] - **Mark Henderson**

Okay, that works.

[17:05] - **Daira Emma**

I can see an argument for doing the opposite. If you wanted to decrease the issuance in the short term in order to increase scarcity, there could be an economic argument for that.

[17:32] - **Mark Henderson**

Yeah, that's true. And there's also the argument that it could happen sooner because right now I believe we're in a zone where it would decrease the issuance if we did it now. So that could be a rationale too. I guess it's just sort of pick one and include it and see where it goes.

[17:51] - **Jack Gavigan**

I think the overriding concern should be safety and the stability of the network when trying to determine when things should activate. 

[18:15] - **Teor**

So we have a graph in the ZIP that's currently is of a smooth out the block subsidy issuance. It's a [PR](https://github.com/zcash/zips/pull/706#discussion_r1346533953) in the ZIPs repository.

[18:28] 

There's a graph based on, I think, an ECC blog post but what's important is that we actually do the calculations for the point that we do choose, because what could happen is that we're making assumptions based on previous work or previous ideas that don't actually happen to have the curve end up this way based on all of the changes that have been made since then.

[19:00]

So I think what would be helpful is if once an ideal activation point is selected with a rationale, somebody goes ahead and does an example of that happening in code so that we can make sure that the issuance is actually rising or it is actually falling as intended. And then that will kind of complete the simulation work on the ZIP to show that the rationale is actually met.

[19:37] - **Str4d**

The meta point I was wanting to make here was that the ZIP talks about smoothness, but there's obviously going to be some sort of discontinuity between the old curve and the new curve or the old system / new system. And so the odd one being a piecewise smooth curve, but very disjoint at the, at the pieces.

[20:13] 

And again realizing that the height at which you switch from old to new behaviour does not have to coincide with network upgrade activation height. The activation height of the network upgrade defines when the new behavior starts, but that new behavior can still be the old behavior for another year or whatever, or another six months or whatever. So the point that I would like the ZIP to make is does it matter if, for instance, the new rules activate immediately coincident with the old halving, in which case, maybe, depending on what the curve is, it still has a halving effect, but it's now just a drop down to by only 25% instead of 50% for instance, at that boundary because of roughly how where the exponential ends up intersecting with the old issuance graph.

[21:11] 

Or does it instead activate at a different position so that the difference between what the old issuance curve and the new issuance curve is at the time of switching between them is smaller. There's points where they cross, for instance. So if there were no other constraints, then the smoothest would arguably be to have the switchover height be at a point where they cross. So you'd be changing the slope of the Issuance curve from flat for the current one flat and then stepwise.

[21:46] 

You'd be on a flat region and then you would just start sloping downwards rather than but otherwise be smooth. So, for example, where the November 2026 line vertical line is on the [graph that's currently on screen](https://raw.githubusercontent.com/zcash/zips/732e65a1520c82cb366f145a6722b1e8cc2fd02e/draft-zip-smoothed-issuance-curve.png), that's effectively an intersection point. So does that make sense? Does that matter to the ZIP authors? That kind of thing is the flexibility that needs to be defined within the context of the ZIP, with rationale etc.

[22:18] - **Daira Emma**

I can see an argument for that, definitely.

[22:27] - **Jack Gavigan**

Yeah.

[22:28] - **Mark Henderson**

I guess to the point of making the calculations it would be interesting to see which of these coincidence events happen when and which one the soonest is, and maybe aim for that or have a step thing. We can do it point A, point B. point C when these graphed events sort of happen, and then make sure that we have the calculations correct and everything there.

[22:59] - **Daira Emma**

If it's 2 years after our halving, which it will be roughly I think, then that would be October 2026.

[23:20] - **Str4d**

But there's also no reason why for instance, again it depends on the motivations and the rationale for the ZIP. But if the motivation is to switch to this sooner as possible, there's no reason why it couldn't be done 6 months from now before the halving.

[23:41] - **Daira Emma**

Right.

[23:42] - **Str4d**

It's just there will be a size of delta between the two. There's a maximum delta will be either up or down. So it going up also as a consideration and the effects of that on things,

[23:58] - **Jack Gavigan**

I assume there's a point at which the delta is effectively zero.

[24:04] - **Daira Emma**

Yes, that would be the October 2026 roughly

[24:09] - **Jack Gavigan**

Would it?

[24:13] - **Daira Emma**

The intersection with the stepwise curve you mean?

[24:19] - **Jack Gavigan**

You sure it would be midway through?

[24:23] - **Daira Emma**

I mean, roughly. If you want the smooth curve to approximate the stepwise curve, then...

[24:34] - **Jack Gavigan**

I'm saying that there will be a point between two halving's in the current curve where introducing the new curve will not lead to either a sudden jump or a sudden dip, but it will just suddenly introduce the curve and it will start to fall away from the current.

[25:08] - **Str4d**

That's the October 2026 point that your mouse is currently over.

[25:22] - **Nate**

I have some context. This chart, I was striving to be as close to consensus as possible, but it's just a standalone rust crate that has its own sort of model, but it's calculating every block's Issuance and accounting for the speed up change and things like that. I think the way the exponential curve works is if you pick any activation height, the green line doesn't move. It's just you either jump up to that line or jump down to that line, depending on which x coordinate you pick. So I think that's the feature of that curve.

[26:16] - **Daira Emma**

I think one of the design goals in the ZIP, or maybe this was a comment that I made, I can't remember, is that over some short term period, the average issuance should approximate what it would have been during that period.

[26:41] - **Jack Gavigan**

Over the 4 year period, shouldn't it?

[26:45] - **Daira Emma**

Well, in addition to the average over the 4 year period. Because you have two degrees of freedom. So the rate of decay of the exponential, that gives you the property that over 4 years, the issuance halves that's one degree of freedom, but that just tells you the time period of the exponential. It doesn't tell you the scaling factor. So using the other degree of freedom, you can decide what the short term is.

[27:26] - **Daira Emma**

You can pick a period and say that "over that period, the issuance by the old algorithm should be the same as the issuance by the new algorithm". That determines your other degree of freedom.

[27:45] - **Nate**

I don't know what that other degree of freedom is. 

[27:46] - **Jack Gavigan**

I will say we are getting down into the weeds here on this and this is meant to be an update slot so if we want to delve into this, maybe we should schedule it as a specific topic for discussion.

[28:01] - **Daira Emma**

I can answer Nathan's implied question in one sentence, which is that the exponential is a constant c * 0.5 ^T over another constant. So there's your two degrees of freedom.

[28:33] - **Teor**

Yeah, so one thing I also wanted to mention, which is an open question, is how close do the ZIP authors want to get to the current amount of issuance over four years? Because the current ZIP has the issuance dropping by about half a percent, but we can get significantly closer if they want to do that and I'm happy to do the calculations, but I haven't had any response on the pull request. So that is an open question and what I would encourage you to think about before we generate graphs and things like that, because changing the constants will require a slight update to the graph.

[29:26] - **Conrado**

Yeah, I just want to point it out that if we keep this curve and not adjust it, and if we activated it before the halvening this means that the amount will decrease from the previous square curve. So this means that dev fund recipients will receive less funds than they were expecting to receive. So I think that may be bad. So at least for me, if you don't adjust the curve, then we need to do to activate this, either at the next halvening or sometime after that.

[30:08] - **Daira Emma**

On the other hand, miners will also receive less, which should have in theory, have an effect on the price because of scarcity.

[30:19] - **Conrado**

Yeah, that's a good point.

[30:23] - **Jack Gavigan**

I don't think we should be letting those types of considerations drive what are essentially technical discussions. And maybe, Daira, you should have a chat with Zooko about that topic.

[30:37] - **Daira Emma**

I'm not saying that's why we should make any particular decision. I'm saying that might be the effect.


___

### 3. Research & Implementation Updates iii) Trailing Finality 

[31:17] - **Nate**

So actually, Daira has been making a lot of progress on a particular design called Crosslink, and that's an improvement over the ebb and flow paper. That paper has a high level description of a protocol but when you start thinking about what the actual implications are for a real ledger like Zcash there's some, at the very least, some big gaps in the paper.

[31:51] 

Daira came up with some changes that are significant enough to be a new design. So I've been reviewing those. I don't quite have a full grasp of the design that Ze is working on but it seems extremely promising. In particular, I'm not certain about this, but it may help address the kind of concern that was brought up at Zcon4.

[32:23] 

Because in the ebb and flow paper the design I promoted there is called Snap-and-Chat and there is this concern that the two subprotocols are somewhat independent so attacking one might compromise properties like safety, and if doing so is cheaper than a monolithic protocol, then maybe the overall security would be lower for the same budget. I'm not certain yet, but Crosslink may at least partially resolve or completely resolve that issue. That's my quick summary. Daira, is there anything you would like to give that's update level depth to add on to that?

[33:22] - **Daira Emma**

Yeah, so we found some issues with Snap-and-Chat. Just to give a background on ebb and flow protocols in general the idea is that you have a BFT (Byzantine Fault Tolerant) protocol and a Best Chain protocol, and you combine those blockchains and come up with both a finalized ledger and dynamically available ledger, the finalized ledger being a prefix of the dynamically available one.

[34:02]

There are some issues with the particular construction that's suggested in the paper. So, for example, they don't account for being able to spend finalized transactions that are not in the best chain of that protocol. So that absolutely needs to be fixed, because if you don't fix it, that kind of defeats the point of doing it at all. So I've come up with something that fixes that and also by the same mechanism has other useful security properties and what I'm aiming for is not to have any potential security regression from the best chain protocol on its own if you manage to subvert the BFT protocol. So if, for example, you have more than a third of validators under your control.

[35:13] - **Nate**

Just quick next steps. We need to post an update about Crosslink, soonish. Like in the next week or two, even though it's not complete, just to help people follow along. So that's my plan, as well as reviewing what Daira's been working on.

[35:43] - **Jack Gavigan**

This is going to sound very ZIP editorish, but it might be worth defining what the rationale of the design and/or the objectives of this is, just to be clear on exactly what the intended outcomes are. Because obviously there are things that you can do that are subjectively good based on various criteria, but I think it might be useful even at this early stage before ZIP is written to say "these are what we're looking to achieve with this initiative".

[36:29] 

Because there has been some discussion about the fact that this was in relation to the Coinbase raising the alarm of ViaBTC that Zcash already has a restriction implemented in both nodes that will not allow rollback past 100 blocks. So we already have a type of finality. I know that it's not the same type of finality. Just being clear, and I appreciate that another advantage of doing this is to introduce a form of Proof of Stake as a way of introducing it more further down the line. But that's just a suggestion that the goal here is defined rather than post rationalizing what has been done after the fact, which is something that's happened with some of those in the past.

[37:46] - **Daira Emma**

Yeah, I'm not sure that has happened in the past, but I agree definitely that we need to be clear about the motivations of doing this. About that 100 block limit on rollbacks, what both zcashd definitely and I believe also zebrad will do in that case is that the node just shuts down if it attempts to do a rollback past 100 blocks. So that is absolutely not the same as the nodes continuing to run but preventing the rollback.

[38:30] - **Jack Gavigan**

Rejecting the rollback, yeah. 

[38:36] - **Nate**

I was going to say the high level motivations and rationale are already in the [TFL book](https://github.com/Electric-Coin-Company/tfl-book), but portions of that book are now no longer accurate for the crosslink design. So the update I mentioned making I think is going to look like basically deleting portions of that and then describing the goals of crosslink with kind of a link to the HackMD.

[39:13] 

I don't think the high level motivations or rationale will change, but there are sort of lower level, more fine grained decisions and rationale that are coming up as we work on crosslink so we are marking those as we go.

[39:33] - **Daira Emma**

Yeah, especially what I said about not wanting to have a security regression, even potentially if the BFT protocol is subverted. I don't by the way know whether that's entirely achievable. I think it is, but I'm currently working on the security proofs.

[39:58] - **Nate**

Yeah, just while we're here. One of the rationales for this kind of protocol change is for finality to be practically useful for users so that implies the time to finality should be a lot lower than 100 blocks. I think that would be a key benefit.

[40:20] - **Jack Gavigan**

Agreed. I just think it's worth writing these things down and having them clear. I didn't realize there was a TFL book by the way.

[40:31] - **Daira Emma**

Yeah, because 100 blocks is 125 minutes. Is that right?

[40:39] - **Jack Gavigan**

Yeah.

[40:39] - **Daira Emma**

2 hours block spacing.


____


### 4. Scheduling NU5 Retrospective


[41:40] - **Daira Emma**

Okay, let's move on a little bit about an NU5 retro. So this has been on ice pending ECC exiting emergency mode. I think the last conversation we had about it was with Nick, quite some time ago. At the time, I think the hope was that ECC would exit emergency mode in June. Obviously, that didn't happen. So I wanted to have a check in on when ECC think they will be ready to do an NU5 retro.

[42:49] - **Nate**

I can point out this thing that has been going on at ECC is we have this thing called emergency mode where we've been focused on improving the shielded wallet performance. We're reaching the tail end of that. So now we're in a phase where we've shipped major update to the SDK's, and so now we're primarily just trying to help the wallet vendors deploy that and then help make sure to verify that it's actually working well for their users.

[43:20]

After that is done, we'll switch our company configuration to be less constrained. So I think after that time would be a good time for an NU5 retrospective. So I would guess lets say a month from now or anytime after that could probably work for us.

[43:49] - **Jack Gavigan**

Let's revisit this in 4 weeks, say during the next late scheduled slot. Then I believe I wasn't around for the last call, but I believe there was some discussion about introducing a network upgrade planning or scheduling slot and I think we touched on that a little bit with regards to the sustainability fund. Obviously there is likely to be a network upgrade of some description that activates next November.

[44:38] 

I guess during the next earlier slot we can have a chat with the Qedit folks to find out when they expect or when they would hope to be looking to introduce the ZSA's. But I'll throw this open to the floor to see if there's any opinions or thoughts or questions on this topic?

[45:02] 

Just to answer Pacu's question while waiting for people to raise their hands, the idea is that we'll probably do at least start that retro during an Arborist call. So the idea is that will be open, an open discussion about NU5 and we can review how it went and what lessons can be learned for the next one. Any comments on network upgrade planning and our scheduling?

[45:41] - **Str4d**

Well, if we're looking at deployment timelines, if we wanted for example, given the earlier discussion around the smoothing proposal. If that were to be deployed and we were to want to have it deployed for activating the change in behaviour at the network upgrade boundary, then the latest the network upgrade could be for that is activation is the next halving.

[46:19] 

Working back from that you're looking at sort of around about 4-5 months of gap you need from that for EOS halts and things at least for zcashd nodes. And I believe Zebrad has a similar kind of period of that. So you're looking like latest for deployment around sort of like mid-next year latest for deployment as in like the nodes themselves going out. So work back from that, that's 6-8 months of window from now.

[46:59] - **Daira Emma**

Yeah. Canopy had a similar constraint because we wanted to activate the funding streams when the founders reward expired. So can you remember exactly when we deployed that to zcashd? Obviously we didn't have both zcashd and Zebra at that time.

[47:24] - **Str4d**

Not offhand, sorry.

[47:26] - **Daira Emma**

Okay, yeah, this is the kind of thing we'll discuss at the upgrade planning meeting.

[47:34] - **Str4d**

Yeah, but the number to keep in mind is that we're looking at roughly 8 months maximum until an upgrade would have to go out. If we want that kind of thing to be included, if there's smaller things, or if there's things that are really ahead of that, or if we decide that we don't need certain things to be deployed, then that can change the schedule. 

[47:54] - **Daira Emma**

And of course things can activate at different times. That would be the latest we can deploy to get something that activates the halving. It doesn't necessarily mean that we can't have things activating before the halving.

[48:18] - **Teor**

So at the moment in Zcash, we have two different types of network upgrades. As Daira was saying we have ones that target a specific block height that we can't change, like halvings, and then we have everything else where the schedule is able to slip, sometimes up to a year.

[48:41] 

So as an aside, if I were writing a ZIP that would change halvings, I would put that in as part of the rationale. But, yeah, I think because we're facing this very strict deadline, I would like to encourage us to think about what really needs to meet that deadline and what could perhaps go in a network upgrade that was 6 months after that. Because one of the risks that has happened in almost every network upgrade is that the timeframe slips and engineers are put under a lot of pressure and then mistakes get made and testing takes longer than we expected.

[49:25] 

I think when we're facing a strict deadline, that's something I'd like to avoid. So maybe think about which upgrades really need to go in the network upgrade that's targeted at the halving at the strict deadline and which could potentially go in before if we want to do a mini upgrade, or after if we want to do something more substantial.

[49:52] - **Daira Emma**

I try to think in terms of complexity budgets of upgrades and intuitively, I think if, for example we were to include v6 transaction format, explicit transaction fees in the transaction field, ZSA's and the ZSF smoothing and deposits into the fund, that is about the maximum that you could possibly include in an upgrade. In terms of complexity budget. We wouldn't have room for anything else.

[50:45] - **Teor**

Yes, I think that that's accurate. If we have time to slip the schedule like we did with NU5, I think that if we don't have time to slip the schedule, we really do need a smaller complexity budget because if anything goes wrong or there's unexpected work, then I would be very concerned that we might not make that deadline.

[51:11] 

That would put a lot of pressure on engineers and also the rest of the community for testing. So, yeah, I would encourage us to set a smaller complexity budget, and then once we show that we can get things in early reliably, that's the time when we can make the budget bigger. Because what we've been doing instead is setting very large budgets, exceeding them, slipping the time, and then putting people under a lot of pressure.

[51:45] - **Daira Emma**

The v6 transaction format, the explicit transaction fees, is a relatively small thing and ZSA's, they're kind of a collection of things that goes together because you absolutely have to have a new transaction version for ZSA's. And if you have a new transaction version, you might as well include the explicit transaction fees. I think those pretty much have to go together, and then they're independent of the ZSF stuff.

[52:32] - **Jack Gavigan**

One thing I would say is that although v6 transactions might be necessary for ZSA's, I would say that they could activate before ZSA's.

[52:50] - **Daira Emma**

They could in the sense that you could you could disable non-ZEC assets before that part of it is ready. Yeah, you could do that.

[53:15] - **Str4d**

You do need to be a little careful with that though, because you are defining your parser at that point for v6. So even though you're setting those values to be empty by consensus prior to activating ZSA's, you're still defining the parser for them. So there's a bunch of the ZSA piece that still needs to be finalized at that point.

[53:36] - **Daira Emma**

Yeah, you're basically saying you can't change the format, which is kind of inconvenient if it turns out you actually do, if you miss something.

[53:49] - **Jack Gavigan**

You can change the format. It's just that you're taking a risk. You're taking a risk that you're introducing v6 transactions with the expectation that your design is going to be correct. And then it turns out if you do have to change your design, you're going to have to throw away v6 and go to v7.

[54:13] - **Teor**

I'm not convinced there's much of a difference between defining v6 transactions with fields that are required to not be there or required to be empty and then defining v7 transactions. I don't think there's a lot of cost to adding another transaction version with the things that are ready to be deployed later on.

[54:36] 

I understand the desire to change the format once and change some code once, but I would prefer to just change it twice because it doesn't cost us that much more particularly when you're talking about the complexity of an entire format that isn't ready and things that aren't tested and a whole bunch of other things that would have to go along at the same time.

[55:05] - **Daira Emma**

I think maybe the cost in zcashd is well, it's more annoying to have with the way that transactions are parsed and implemented in Zcashd to have multiple versions. Would you agree with that str4d?

[55:23] - **Str4d**

To some extent, yeah. But there is also overall cognitive complexity to having multiple transaction formats around, floating.

[55:32] - **Daira Emma**

And specification complexity.

[55:42] - **Str4d**

I wanted to note because the interaction between the smoothing proposal and funding stream code that we have in the full node code bases, that's also something that there isn't anything in the ZIP that currently manages notes specifically. I think, though offhand it should, "just work". But there are a couple of things that the ZIP might need to mention if there are still funding streams after the halving, if that separate discussion goes ahead. But at least for Zcashd, I'm not too familiar with zebra here, but at least for Zcashd, that is a relatively simple change within the context. So there's a minimal complexity budget for that piece for whatever would need to go into target a halving if that ends up being a ZIP.

[57:07] - **Str4d**

The interaction with the smoothing would be the only place where the complexity creeps in, but that would be something that the smoothing ZIP would need to just clarify.

[57:19] - **Daira Emma**

Yeah, I said that I thought there was no interaction between the ZSF ZIP's and the explicit transaction fees. Actually there is because, it might be slightly simpler to define the amount going into the ZSF. If you have that explicit transaction field, it's not a large interaction. You can do it either way.

[57:57] - **Jack Gavigan**

Are you sure that the funding streams have been split up by percentage. Are you sure it won't be more complex?

[58:11] - **Str4d**

My recollection of how the funding streams are, at least in Zcashd implemented is there's the block subsidy function and everything's done as a ratio of that. It just so happens it works out quite nicely for the old Issuance curve because it's flat between halvings and a well defined ratio.

[58:28] 

So it's easy to come up with funding stream ratios that exactly that map nicely to round numbers. Obviously, with a smooth curve, that no longer is the case. But I'm pretty certain, at least on Zcashd, all of the logic is still written in terms of fractions. So if the block Issuance is changed by the Issuance ZIP, that just changes the amount that the fraction is multiplying. So that's why, I mean, functionally, I don't think the code that actually manages the funding streams would change much at all.

[59:08] - **Jack Gavigan**

Yeah, it's defined as numerator and denominator.

[59:15] - **Str4d**

So whether there are funding streams at all is a separable ZIP. But the logic that they would use to implement themselves, if they exist, should be relatively straightforward.

[59:27] - **Jack Gavigan**

Need to get the rounding right.

[59:29] - **Str4d**

Yeah, exactly.

[59:33] - **Daira Emma**

And a few tests might break, but easy to fix.

[59:39] - **Jack Gavigan**

Yeah, it's in [section 7.10.1](https://zips.z.cash/protocol/protocol.pdf#page=136). Numerators and denominators the various streams. Cool. Anything else on this particular topic for now? 

[59:54] 

Nate's got to run. He made a good point in the chat, he said "I like the style exemplified by v6 with anticipated ZSA first, then ZSA functionality, because each change has some impacts that will ripple through the ecosystem and unbundling feels safer".

[01:00:11] 

I think he's right, because obviously introducing a new transaction version is something that has to be implemented in a variety of codebases, not just zcashd and the mobile SDKs and Zebrad. There are some other places as well.

[01:00:34] - **Daira Emma**

I mean, if the only thing that was going into a v6 transaction format was the explicit transaction fees, then I'm not sure that's sufficient motivation for a new version. It's the kind of thing that if you're making a transaction version change anyway, you include that.

[01:01:04] - **Teor**

One of the sustainability fund ZIP's requires an extra field to deposit funds into the sustainability fund.

[01:01:14] - **Daira Emma**

Yeah, that's the interaction I was talking about before.

[01:01:20] - **Teor**

Sure, maybe there wouldn't be enough for a v6 transaction format. But I think we should make a list and see if we add the memo changes, then that's another change. We should make a list and decide if that's enough. Just going back to what I think Str4d was saying, you yes, it's quite simple to change in zebra as well. We were pretty careful around the rounding, so whatever block subsidy amounts or funding streams turn up, we just basically change a function and change a bunch of constants and that's it for us and we make all of our tests work again.

[01:02:07] - **Jack Gavigan**

What are the memo changes that you guys are talking about there?

[01:02:13] - **Kris**

This is a suggestion that came up during NU5 development that we opted out of because we didn't have the time. But the basic idea there is to decouple memos from outputs where instead of a 512 byte memo field associated with every output, each output would have a 32 byte key associated with it.

[01:02:42] 

Then you would have a separate list of memos in the transaction and each output's key might decrypt one or more of the memos associated with the transaction. Both for common use cases could mean that transactions are somewhat smaller in terms of bytes, but also opens up some possibilities for sending longer memos by sending multiple memos that are all decryptable by the single output or sending a single memo to a bunch of recipients without bloating the chain and that sort of thing.

[01:03:22] - **Daira Emma**

Yeah, if we're spitballing things that could potentially go into an upgrade. I think another thing is shielded transaction aggregate so that's [zcash/zcash ticket 4946](https://github.com/zcash/zcash/issues/4946), which is a scalability improvement where you basically use recursive proofs to reduce the on-chain size of a bunch of transactions. That's a bit more speculative because I pretty much know how it would work, but it depends on recursive proofs.

[01:04:04] 

Don't think NU6.

[01:04:07] - **Str4d**

No, that would definitely not hit an NU6 and probably depending on how they get split, it wouldn't be something that I think would hit an upgrade that was targeting the halving either. Whether that be NU6 or NU7, depending on how things got split.

[01:04:23] - **Daira Emma**

I mean, if, if we decided not to do ZSA's, then maybe we could have complexity budget for that, but it would really be a stretch. I don't think so.

[01:04:38] - **Jack Gavigan**

You said two big ifs there if we're spitballing, what's going to go in and then if we decided to ditch ZSA's and both of those are big if's.

[01:04:48] - **Daira Emma**

Yeah. I don't want to ditch ZSA's. I think Qedit has done outstanding work on ZSA's and it is entirely feasible to get them into the next upgrade.

[01:05:05] - **Jack Gavigan**

Cool. Anything else on this topic? I think that once we've done the NU5 retro, we will be in a position to revise or create a new network upgrade process, which covers things like the need for audits, need for ecosystem engagement and whatnot, and also consulting the Zcash community to make sure that they're on board with the changes that are being proposed. I think it's important to do the NU5 retro first.

[01:05:53] - **Daira Emma**

Yeah.


____


### 4. Open Discussion - Long Term Incentives for Miners

[01:06:19] - **Mark Henderson**

Another question about the other ZIP regarding splitting the transaction fees between the miner and the ZSF deposit. Teor you raised on the forum, the issue of the 50/50 split being unbalanced in the context of this far future situation when there's no Issuance anymore and it's just transaction fees happening. I updated the ZIP to be 60/40. Does that alleviate the concern? I have to admit I'm not 100% understanding the implications of that, but does that work?

[01:07:11] - **Teor**

Yeah, I think this might be more Daira's area than mine but we were looking for...

[01:07:22] - **Daira Emma**

I haven't seen Teor's post, so I would be in the dark there.

[01:07:31] - **Teor**

Sure, I can [link](https://forum.zcashcommunity.com/t/the-zcash-posterity-fund/42703/102) to it. So the concern is if you basically this is a far future concern, but it's also a concern as soon as the amount of transaction fees being deposited starts to get close to the block subsidy.

[01:08:03] 

So it could actually happen sooner rather than later if people start depositing very large amounts as transaction fees or blocks get very large. Basically, fees exist as an incentive to and the subsidy exists as an incentive for miners to mine the block and to keep mining on the longest chain, if you reduce fees or subsidies too much, then what happens is miners have incentives to fork the chain and only include transactions with large fees and they have incentives to roll back the chain in order to either substitute their own blocks, they get their own subsidy, or they get larger fees. So that's the concern here. It's a security concern.

[01:08:57] - **Daira Emma**

Yeah, I think I understand the concern & yes, it needs more analysis.

[01:09:10] - **Jack Gavigan**

Is it a concern that activates within say, the next decade?

[01:09:22] - **Daira Emma**

Well, that depends on the absolute amount of the block reward, excluding fees. What is it called? Miner subsidy. So I think it only really is a concern at least two halvings away but that's 10 years or 9 years, maybe 13 years. Yeah, I think it's fine until then.

[01:10:05] - **Jack Gavigan**

Sure.

[01:10:08] - **Teor**

I think it's okay to say that it's fine until then, but that actually needs to be explicitly said in the ZIP. If you're making an argument that something improves security or you're making an argument that it's not necessary to improve security, then that's something that needs to be written down.

[01:10:2]

So that when we come back to this, when the economics of Zcash changes for example, if we make blocks bigger or transaction fees higher, or we switch to proof of stake all of which change the economics. We can review that security argument and say "have we pushed out this 13 years? Have we brought it closer by doing this?" And so we now need to consider this in the next network upgrade. So this is more about forward planning and being clear about what's intended by the ZIP, even if what is intended is nothing needs to change right now.

[01:11:03] - **Daira Emma**

Yeah, I've always been concerned about the future economics when the miner subsidy reduces significantly. I think that hasn't been thoroughly analyzed even for bitcoin. We do have the advantage that bitcoin is further ahead on the issuance curve, so we can look what happens to it.

[01:11:35] - **Jack Gavigan**

By the way, Mark, the reason I was asking that question was to highlight the fact that it may not be necessary to change the split so much as address the question of "does this impact security"?

[01:12:02] - **Daira Emma**

I mean, there were two arguments that Teor made in that post. One was about the long term incentives for miners, and another was just about the fact that it's harder to discover some kind of bugs if you have an equal split for that, any value other than 50% works.

[01:12:34] - **Teor**

Yeah, I'd just like to note the ZIP before that had a similar bug in its calculations where there was a 50% split, except this was issuing half of the fund and it cost us a bit of extra work to find that bug because we'd gone ahead and done calculations on the basis that we were talking about the half that was issued, but it turns out that the calculation was actually for the half that was staying in the fund for future issuance.

[01:12:59] - **Teor**

So there's nothing wrong with having a 50/50 split. It just needs to be checked more carefully than any other kind of split. So we can do that work if that's necessary. That was just that kind of while we're thinking about this, if we can avoid having to check this carefully, that would be nice.

[01:13:23] - **Daira Emma**

Like you say, we can't avoid checking it carefully whether it's a 50% split or not, and it will get an audit, so that kind of thing will be checked independently by multiple parties.

[01:13:38] - **Mark Henderson**

But I think I'm hearing the actionable feedback here is just to explicitly plant a flag in the ZIP and say this is almost certainly fine in the short term, meaning the next handful of years or more, but we need to come back and review this once a couple of halvings happen or once the issuance curve gets down low enough or the transaction fees get high enough.

[01:14:00] - **Daira Emma**

Yes.

[01:14:01] - **Mark Henderson**

Roger that. Thank you.

[01:14:09] - **Teor**

And we can help you make that a robust argument where it is, if any of these things happen or these amounts get bigger than those amounts, then we need to reconsider this. But for now, we are at least this amount of time away from that.

[01:14:26] - **Mark Henderson**

Sounds good.

[01:14:27] - **Daira Emma**

Yeah. Has anyone heard any objections from miners to diverting some of the transaction fees to a different destination? I know that miners haven't been terribly engaged with protocol changes in Zcash in general.

[01:15:00] 

Perhaps some vociferously object, but they're not here for some reason.

[01:15:08] - **Jack Gavigan**

I was writing up the history lesson part of the blog post we published today, and as part of that, I went back and was looking at how consensus reached around [ZIP 1014](https://zips.z.cash/zip-1014) and what sentiment gathering mechanisms were used.

[01:15:27] 

One of them was an invitation to miners to express their views on the various proposals that have been put forward ZIP's 1001 to 1013 through block signalling and none of them signalled any preference. You'd at least have expected one or two to signal a preference for the no dev fund option so that all the rewards went to miners. But yeah, they did not seem to be particularly engaged in that discussion, so it wouldn't surprise me if they are similarly not engaged and not interested in this discussion.

[01:16:19] - **Kris**

It's not clear that a no dev fund option would actually be good for miners, depending upon what that would mean for the evolution of the protocol.

[01:16:29] - **Jack Gavigan**

Yeah, true.

[01:16:30] - **Str4d**

I think the only thing that I've heard in the last several years related to miners and fees is that fees are generally a small enough percentage of what the miner is getting via subsidy that they haven't really mattered. Certainly to the point that I'm not aware of miners that are implementing custom block selection processes.

[01:17:03] - **Daira Emma**

I might push back on that a little bit because let's, for the sake of argument, say that there were no transaction fees. What would be the miner's incentive to include transactions at all as opposed to mining coinbase only blocks?

[01:17:21] - **Str4d**

For the most part, that seems to have been inertia because zcashd implements a particular block selection algorithm and it works and they don't have to touch the code

[01:17:36] - **Daira Emma**

But it does affect their profit right because there's some latency in verifying transactions. So if you verify transactions and some other mining pool is not.. I hesitate to point this out to miners, but I think miners are probably not listening to this call. Then it would be a disadvantage to your pool.

[01:18:04] - **Str4d**

Well, the main place we saw that was during sandblasting where we had very high verification things, and at least there the process appeared to mostly be let's figure out the ways to make verification better so we can just keep mining blocks as is.

[01:18:21] - **Daira Emma**

Yeah. I mean, to be fair, miners could have acted a lot more selfishly than they did, so I'm glad of that.

[01:18:36] - **Teor**

We're actually aware of some miners that write their own coinbase transaction code, but I'm not sure. I think they do their own transaction selection, but I'm not sure. But, yeah, we definitely know they're writing their own Coinbase transactions and have run into issues around that when we've changed transaction versions, for example.

[01:19:01] - **Str4d**

Yeah, that definitely exists because of differences in the way the mining pools work. That's also why getblocktemplate has all the various pieces of hashing that it outputs that we've added over the years to enable different combinations of block production. But beyond Coinbase, I'm not aware of any major deviations from sort of the recommended algorithms that Zcashd and now Zebrad have implemented.

[01:19:41] - **Daira Emma**

Yeah, and if you remember the earlier, it wasn't really an intentional denial of service, it was some mining pool making transactions with lots and lots of inputs and when we changed the block template selection for that, it had an immediate effect on blocks. So at least at that time, they were just using the zcashd template selection.

[01:20:16] - **Jack Gavigan**

Turning to Daira what you were saying about miners incentives for including transactions, even though the fees are quite small and delayed, takes longer for them to generate a block tactically, and in the short term, you're right. It may make sense for them to. But strategically, if it was not possible to send transactions on the Zcash network because miners refused to, that would have a long term impact on the viability of the Zcash network and therefore on the miner's ability to generate revenue from mining on it.

[01:21:00] - **Daira Emma**

Even a shorter term impact on the price actually.

[01:21:02] - **Jack Gavigan**

One thing I think it's really important to bear in mind is that the community has expressed a clear preference for moving away from proof of work. So sooner or later or in the long term, we won't be necessarily needing to worry about miners. Again, that plays back into the sort of time horizon for the sort of question that Mark raised. If in ten years we've moved away entirely from proof of work and there are no miners, then we have a different speed of generating a block may no longer be an issue.

[01:21:48] - **Daira Emma**

I mean, latency will still be an issue. So if we're competing with other chains that have improved their transaction latency then our targets for latency will presumably decrease in terms of time.


_____


### Attendees

+ Decentralistdan   

+ Aditya Bharadwaj

+ Conrado Gouvea

+ Jason McGee

+ Kris Nuttycombe

+ Jack Grigg

+ Daira Emma  

+ Teor

+ Yasser Isa

+ str4d

+ Oleksandr Putyak

+ Mark Henderson

+ Pacu ZWCD

+ zero d


**Next Meeting Scheduled: 15:00 UTC October 19th 2023**


___
___
