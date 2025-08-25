## Arborist Call #108 Notes 

Meeting Date/Time: 21 August 2025 15:00 UTC

Meeting Duration: 1 hour 33 minutes 

## Agenda

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [zebra 2.5.0, Nu 6.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update[zallet, P2sh,librustzcash](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Dag](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-zcashd-deprecation-ecc-zf-zingo-labs)/ [Qedit,Zsa,Pczt](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets) [Nsm,PRs](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)

Open Discussion [NU 7](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=cwp6y9gHBVk)

Moderator: Alex

Notes: chidi olisa 

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:01:50  

Today is August 21 Zcash arborist call. So the agenda for today, core stack updates, Zcash Foundation, zebra electric Coin Company with Zcash D core libraries and Zallet CLI wallet, Zingo labs with Zaino and Zcash D deprecation. And then we go on to research and implementation updates. Qedit for Zsa, shielded labs for the network sustainability mechanism, shielded labs and electric Coin Company for cross link trailing finality layer and then open announcements and discussion, which includes a new segment proposal with shielded labs. Next slide, please. So what are arborist calls? Bi weekly calls, where Zcash protocol contributors convene to discuss upgrade timelines and process protocol r, d efforts design and implementation of new protocol features and identify blockers and unresolved issues. Purpose to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large who can participate, so anyone can anyone interested in learning about Zcash protocol development, can register at Zcash arborist.org if you would like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request A slot. Other ways to get involved are Zcash community grants, at Zcash community grants.org Zcash r & d, Discord, Zcash community forum. And you can find these links by pointing your browser at Zcash arborist.org, so let's start with core stack updates from Zcash Foundation.

## Zebra Update 

Arya: 00:03:41  

Thank you, Alex, so since the last arborist call, we've released zebra 2.5.0 that deploys Nu 6.1 on testnet. We've made a bunch of improvements to Ci, including using next test and optimizing our Docker test builds updated zebras minimum required burst version to 0, 1.8 9.0 made the funding streams configurable on custom test nets and on reg test switched to using the orchard batch validator from librustzcash and actually doing batch validation instead of Using a maximum of two orchard bundles per batch, added rust back trace to our CI and just to the default cargo config, and then that's everything that's been merged in flight. We have PRs that add a feature variant to our network upgrade so that you can use the librustzcash feature, add some missing orchard fields to get raw transactions. Adds B join split fields to get raw transaction. Those are just RPCs being filled in and completing said, Get Tree State backing up non finalized blocks in the state cache directory so that when zebra restarts, it can restore the non finalized state from its previous run. Then just some other minor cleanup that's been most of it. There's also a PR to switch to the sapling verifier from librustzcash to pre-generate the Coinbase transactions when using the get block template method with long polling.And I think that's that's most of it.

Alex: 00:05:30  

Thanks Arya. Any questions for Arya?  Great. Let's move on to the next  one. So core stack updates, ecc, Zcash D, core libraries and zallet CLI wallets.

## ECC Update 

Kris: 00:06:21  

So the major work that we've been undertaking for the last couple of weeks has been getting in additional changes to the Zcash script crate for p2sh support. Alongside that, we're essentially now back working towards the zallet alpha in service of that. Just yesterday, I did some work to update zaino to the latest zebra release and the latest librustzcash crate releases, and so we're propagating that through the stack we have so Str4d has created a draft PR  to the zips repository for the specification of the pieces of T format. Let's see, there's a bunch of stuff scattered across other pieces of the stack, we have merged new functionality for confirmations policies into Zcash client backend to allow the flexibility that we need for both Zallet and and Zashi to be able to allow for low conf and zero conf shielding and transfers that we need to be able to reproduce the functionality that exists in the Zcash wallet we've done a bunch of other work on, sort of planning out how to support p2sh more broadly in the Zcash ecosystem, learning from the various Bitcoin specs for p2sh handling. There are many, but we've drilled down and determined a subset of that functionality that we're focused on. So, yeah, that that's, there's other stuff in our history here, but I think that's the, the high level important stuff the other so our priorities going forward here are continuing the work on p2sh support in service of making the Nu 6.1 mainnet release. So the key holder orgs still need to do p2sh address setup processes for the lockbox disbursement addresses, and that's been what we've been doing, the the P2sh research on Bitcoin for is so that we can make sure that whatever we support is also usable via ledger and Keystone. So looking at how ledger and Keystone do p2sh and making sure that our key generation, which is the important bit, fits into what the existing hardware wallets will be able to easily support, based upon their Bitcoin P2sh  functionality. And then we've got essentially three remaining issues to get through, to get out the zallet alpha, a little bit more work on Z list on spent integration of the Zcash D wallet, import changes and then updates to Z view transaction. I think that everything else is more or less in place with existing PRs for the changes we wanted to get in for config and so forth. So I think that's it.

Daira emma: 00:10:26  

Yeah. One thing that I found interesting was that a meeting we had on comparing different approaches to formalizing crosslink.

Kris: 00:10:37  

the other thing that we've done is we have merged Qedits Halo 2 PRs so  the review on those is completed, and we've resumed moving forward on getting the ZSA PRs to Orchard merged. So Str4d and I did some review on that a couple of days ago, and we have more work to do there.

Alex: 00:11:08  

Thanks, Chris. Any questions for Chris or ECC in general?

Pacu: 00:11:15  

Great. I know just forgot a lot of work he did on the protocol, canonical files, or zaino like walletD and anything using gRPC and sending PRs to all the corresponding places. So everything is tidy up. And now going forward, and helped a bunch of people for example, myself in trying to land a feature on librustzcash, and also  did a bunch of reviews on Zaino and meetings with the zaino folks on the API. So, yeah, you were forgetting about stuff you did.

Kris: 00:12:05  

I also was forgetting about, we've finished review and merged PRs from the Maya protocol folks  to add up return functionality to the Zcash primitives transaction builder, so that they can embed the information that they need in transparent transactions for however, whatever they're doing with that that they they need to put, they need to put transparent data on chain, and are using op return to do that. And so now, now the Zcash primitive transaction builder has that functionality.

Daira emma: 00:12:49  

Yeah, well, I did some work to support our grant application. Let's see. There's also a hot fix for Zcash keys to fix a bug in transparent secret key encoding, yeah, I think that pretty much covers

almost everything. I

Kris: 00:013:11  

I think that the full release of the Librustzcash stack was before the last arborist call, and so I think we've already covered that. Yeah,

Alex: 00:13:32  

Thank you Kris, Daira Emma  and Pacu for the assistance there, so let's go on to Zingo labs. Is anyone here to provide an update?

## zingolabs updates - zaino

Za: 00:13:45  

Yes, I am. So we are completing the chain index API for consumption by Zallet and to fully support the non finalized state, which will be important for crosslink the non finalized state support, we've been working this week on tracking all or providing APIs that track the others 

we're probably a week away from finishing  our grant that covers this work, and we have sort of bottlenecks, and delaying our progress on that grant, so we've also started working on a re architecture of the core code, some some code quality upgrades that we think are going to make it much more hackable in the near future. And we also have work going forward, block explorer, RPC use so,I think that wraps up Zaino

Alex: 00:15:04  

Any questions for za? awesome. Thank you.

## Research & Implementation Updates, ZcashD Deprecation, ECC, ZF, Zingo labs

Pacu: 00:15:18  

The update that has been kind of like intertwined on the previous updates, but on a large scheme of things, like the priorities right now are, I'm leaving the that link for the note taker in the chat people can go there and look at just one green square that says, like zallet MVP, and you will see that it has a bunch of boxes there. And the priorities are actually working towards wrapping those things, 

[link](https://zcash.github.io/developers/zcash-zcashd-deprecation-dag)

as kris said, wrapping up like, block explorer Zingo folks are working in parallel a bunch of stuff, like the chain index is one thing, which is a huge refactor that has been like, coordinated through this API calls that we've been help having, like, every, every Monday since a while between ECC and Zaino folks. And then there are the block explorer APIs. We currently have a test net block explorer running zebra, but in a kind of hacky way, the real work is bein ,finalized by Zingo Labs, which will have all the RPCs needed for other block explorers to switch to, the new stack. And that's actually in progress as well, one of the priorities that we're handling, and then also some changes to the compact block protocol to accommodate better, transparent data, and fixing a lot of things in terms of privacy side effects and whatnot, long to explain. So  those are  what we're working on, and we're, I want to just say huge kudos to the zebra team, that they're like, jumping and helping out. And also, big kudos to Alfredo, because everything, every time somebody asks, could somebody help on this,  Alfredo will take a look. kudos to to him and to Gustavo  that are working on the Docker and stuff for shipping this z3

thing when the alpha time comes, there's a lot of collaboration there and, yeah, a lot of work that is sometimes invisible and really tedious, like CI stuff. So kudos to them. Yeah.

Alex: 00:18:18  

Awesome, questions or  Comments for pacu?

Daira emma: 00:18:29  

Just a comment on that DAG, I notice it has all of the Nu 7 stuff as a dependency of required functionality for zcashd wallet replacement. I guess that's not actually the case. So all of the graph that is kind of connected on the bottom left, it's not actually a dependency. some of it might be, but I don't think setting the activation height for Nu 7 is the dependency for Zcash D wallet replacement.

Kris: 00:19:06  

Oh, yeah,there's definitely some inaccuracies there, then yeah, that we need for NU 7 is, you know, needs to be in the Zcash but NU 7 itself is not a blocker,

Daira Emma: 00:19:23  

exactly, yes. In fact, it can't be a blocker because

Kris: 00:19:27  

it's the other way around. We should, we should clean that up. I will do that. Yeah. We should have a NU 7 wallet ready node  that everything feeds into Exactly,

Pacu: 00:19:43  

yeah. How often does it re render? Like? Is it daily?

Kris: 00:19:46  

it's every two hours?

Pacu: 00:19:49  

oh, that's more often than I thought,

Kris : 00:19:52  

Oh, there is something I did in the last couple of weeks, I actually fixed some problems with the the rendering so that we're now using, you know, kind of meaningless CI, it's, well, not meaningless, but CI work. That means that we're now using GitHub Pages artifacts for doing that rendering, and are not storing a million ancient versions and  get history of the rendered.

Pacu: 00:20:22  

Oh, I had a really superficial idea this morning when I was looking at the DAG like, it would be nice to have like intermediate snapshots, so we could kind of animate the DAG, like, progressing over time, sometime in the future. Be cool.

Kris: 00:20:42  

One can actually do that to a degree, using the target issue functionality, because you can just specify any issue  and, you know, the other thing that's fun is to render with, closed issues visible, because then you get like, then you get  massive  everything that's been done in the history of zcash,

Daira emma: 00:21:10  

I mean, all of the information. So the structure of the graph might change because the dependencies change, but usually they're just corrections. And so you can still see the history of when tickets were closed. So you could kind of do that animation without storing historical graphs.

Alfredo: 00: 21:37  

Yeah. So in addition to that, I want to say that Conrado upgraded the spreadsheet with the RPC methods for zcash deprecation. We are trying to find out what missing functionality we had in zebra. Conrado took the time to actually upgrade that. I think that's good reflected  in the zcash website as

Pacu: 00:22:02  

I think it's actually cross reference with some kind of iframe, is it or but thank you Conrado for doing that.

Daira emma: 00:22:14  

There is actually something I wanted to raise about that I hope this doesn't end up being too contentious. So we're implementing get transaction, and so there's a bunch of kind of just incorrect fields in that, because they have been implemented in zcash D in a way that doesn't take into account, sure the transactions at all.  So they're just kind of incorrect. And I want to talk about what the policy should ben when we have a situation like that. So  how far should we go in terms of bug for bug compatibility, when actually it's just clearly returning wrong information?

Alfredo: 00: 23:17  

Okay? Should we do that now or later in the meeting or offline.

Daira emma: 00:23:23  

Now, let's get through the meeting first, and then thank you for bringing that up and we'll bring it up later. Thank you there. We can come back to that. Yeah, great.

Alex: 00:23:37  

So anything else on Zcash Deprecation ?

Pacu: 00:23:42  

No, thank you. Thank you everyone.

Alex: 00:23:45  

Yeah, thank you Pacu, research and implementation updates. Qedit on Zcash shielded assets?

## Research and implementation updates- Qedit Zcash Shielded Assets

Vivek: 00:23:53  

Hi, hi everyone. So we have had a few updates over the past month. So as I think kris mentioned in the ECC update, we did get a Halo 2 PR merged in the last few weeks, and that's like with the full support for Zsa modification, like all the ZSA modifications needed for Halo 2, the there's also supporting changes to support those changes in orchard, which is also an open PR, which I think daira emma has approved, but I think it's waiting for a second or third review, before it gets merged in. So that's all Good, yeah, so that's great on the halo 2 front, besides that on the zip. So we had recently been working with the zip editors on changes to the SIG hash to allow some versioning in the signatures and so on. So I noticed that it's recently been merged. So that's on the zip side. These zip changes. So we have in the process of making those changes, along with the changes to the encoding of the issuance, authorization, signature and issuance, validating key in the transaction format. So we've been making those changes throughout the stack. At present, it's done in the test vectors, the Python reference implementation, and close, it's close to being done in orchard. So that's where we are at. And then, like we'll move on to  Librustzcash, and then the consensus changes in zebra for this. Besides that on orchard, we did some code simplifications recently. And yeah, I think we were waiting to get a sketch of a different approach for, like, implementing the bundle that was based on discussion we had with the ECC. Yeah, I think, like kris also mentioned, they've been working on that recently. 

Kris: 00:25:59  

yeah, so I can give a bit of an update on that, essentially, Strad and I looked at that last week and decided that we are, we are effectively content with the changes since we initially discussed this. Because the major change was that previously, there had been types from Zcash node encryption that were being essentially revealed in the bundle type that we didn't think was appropriate, but you've since modified that type to use the, I think you called it like orchard primitive, or something like that,we're basically ready to move forward as soon as you believe that that orchard PR is ready for review, it's still marked as draft, but once you mark it as ready for review, then we're ready to move forward with the rest of the review on that. And there may be additional API changes that we want to make once we get that PR in, but right now we just want to sort of get it in as as soon as we can get it fully reviewed, which, you know, that's going to take some time, because I think there are 30,000 lines of code changes, in addition to 20,000 lines of of verification key but even despite its size, there's a lot of it that's relatively straightforward. So we'll, hopefully be moving forward on that in between the other stuff that we have to get done in the next two weeks.

Vivek: 00:27:36  

Okay, yeah, that's, that's great to hear that. I'll pass that on to the team, and we'll, we'll let you know we like, basically make it not draft Once we are happy with it, it should be soon, though. Yeah, I'll pass that on, yeah. So on, that's orchard, then on Librustzcash. We, I think we completed the catch up to upstream, basically, like the pczt changes. There may be few more changes that have happened since then that I'm not sure if we are, like up to like, actual main but we are. We've gotten a lot closer, and we've made like, a large bunch of those changes. So at some point soon, we'll probably be discussing that with the ECC as well. Again, what implementation changes were needed for Zsa is to come like the pczts and Zsa is how they interact, and when we discuss with them, we'll get to see if there's anything that they have in mind that we need to update. That's Librustzcash, on zebra we are done, or mostly done, I'm not sure, with the catching up to the upstream, version 2.4.2, which I think is the  version or so behind the 2. 5.0 which Arya mentioned they've released. Our branch will work with everything needed for ZSAs, except the state management bit, which means, like, the finalization, will not be working, among other things. So, yeah, the state management is also done to a decent extent, but it's in a separate branch that I think we still like making some changes to before we push that as well, that zebra. And yeah, we have our transaction tool as well to generate the v6 transactions. We've pretty much just been keeping it up to date with our version of zebra, with all the changes we've been making there. And yeah, on the side, we've been improving the CI for, like, deployment and stuff. So yeah, that's the  update.

Alex: 00:29:49  
Any questions for qedit or vivek?  Thank you very much.



Alfredo: 00: 30:04  

So yesterday, we had a meeting with ecc and kris, we were talking about how to implement some of the changes needed for shielded assets, Zcash client, backend, and yeah, we are starting to, in a high level, seeing that we are going to need to use qedit forks, maybe try to figure out the transaction tools you guys created, and we need to build a plan, because it seems like A pretty decently big project. So we were wondering if we could get someone from qedit to coordinate and work on that. Some of the qedit developers.

Vivek: 00:30:52  

yeah, definitely. We'll that sounds good.  you said on Zcash client back end?

Kris: 00:30:59  

So the idea here is that  Zcash client backend is where we will need to have, this is wallet support, right? And so in order to get wallet support into zallet and into all of the other wallets that depend on Zcash client backend, what I was talking about with Alfredo yesterday was the possibility of doing sort of a top down sketch, probably behind a config flag And feature flag of a proposed Zsa issuance API and a and then an API that from the proposal, can generate pczt for Zsa issuance, and then plum the handling of that pczt  through to the rest of the pczt workflow. So there'll be, there's a whole pile of work to be done here. But I think that if we, if we sort of start at the, you know, propose Zsa issuance level, and then sort of step downward, then there will be a bunch of discovery, of changes that need to be made to the the sort of ephemeral proposal data structures, changes that need to be made to pczt that will probably go into a pczt V2 or pczt V3. So Str4d, like I said, he's just defined the pczt, v1 structure in a zip, and the P2sh support changes will be probably, will probably do pczt v2, which is just p2sh, and then pczt V3 will likely be, you know, expand that with zsas and the rest of the stuff that's needed for Nu7. So yeah, I'd be happy to get on a call where we can try to coordinate better what all needs to be done there.

Vivek: 00:33:22  

Yeah, that makes sense. I'll pass that on as well, and we'll see who is best placed with, the background for this that we can coordinate on this, I'll check with them, and, we'll reach out to you guys and let you know.

Alex: 00:33:44  

Pacu, did you want to say something?

Pacu: 00:33:47  

Yes, I think there was a post from last December from Taylor Hornby about proposing a zsa ux challenge. And I think it will be an interesting input for folks having these meetings and coming around with the tooling that will be needed to succeed in this UX challenge that Taylor is proposing. So I left the link on the chat with that forward thread because it's an interesting way of, like designing this inner parts, or these components from desirable outcomes,So refresher, probably you've seen it, but you know  there's a lot going on. So

Kris: 00:34:42  

okay, just noted in the chat also that I was wrong about what pczt V2 is that that pczt v2 is needed for v6 transaction support, so that'll be the ZSAs and frost and so forth. Yeah. Yes. Alfredo,

Alfredo: 00:35:04  

yeah. So we don't know the details yet, but the general idea is kind of, we are going to be launching this into a protocol, but nobody can use it. So in order for wallets to use a shielded assets, this middle work needs to be done. And that's kind of the idea to create the bridge to Yeah. Use it.

Vivek: 00:35:30  

Yeah. Makes sense.  I think we've made the basic  way to generate transactions, but that's like, definitely steps away from the whole wallet support. So yeah, we'll see how we can bridge from like, what we have with our transaction tool and this. So yeah, we'll, we'll get on the meeting, and we will figure that out

Alex: 00:36:02  

Anything else on the subject for right now? Cool. Thank you, Vivek, and just amazing cooperation and coordination between teams, thank you very much, moving forward, really, really nicely.

## Research & Implementation updates. Shielded labs- Network Sustainability Mechanism

Mariusz: 00:36:26  

Hi, so for the NSM last week, I have updated the zip, 233, PR, it is rebased and updated for the latest Librustzcash. PR, that was merged, I think, one or two weeks ago, and it is ready and waiting for review. And also I have addressed the comments for the Zcash test vectors. PR, 101

and this is also ready for review, and that's it from my side.

Jason: 00:37:03  

Any estimate on getting those?.

Kris: 00:37:07  

I just did the search for 233 in the zips repository, and I don't see a PR labeled, labeled with zip 233 so can you please make sure that the title of the PR contains 233.

Mariusz: 00: 37:22  

It contains 233, in the name, I will post a link here for the PR.

Alex: 00:37:39  

Any additional comments or questions, 

Jason: 00:37:41

just a comment on timing on getting those reviewed, if possible.

Kris: 00:37:59  

Can you provide that link? Yes, I

Mariusz: 00:38:20  

I'm not sure if everyone get my messages or should I post again to everyone

Jason: 00:38:29  

I got them both. Oh,

Kris: 00:38:32  

Oh, this is the Zcash test vector. PR, not zips. PR,

Daira emma: 00:38:35  

oh, sorry, yeah, that's why, that's why we weren't seeing it. Okay, all right, thank you. Yes. Yeah,

Kris: 00:38:50  

Okay, yeah, Daira, I mean, you had reviewed that, and it looks like a bunch of your comments have been addressed. And then, yeah, your the post review fixes are also in so that, Daira, if you can,

Daira emma: 00:39:04  

yes, I will review that.

Alex: 00:39:12  

Great. Move on to the next update, shield labs and ECC for crosslink.

## Research & Implementation Updates.Shielded labs and Ecc- Crosslink- Trailing Finality Layer

Nate: 00:39:21  

Okay, yes, I can give an update on shielded labs implementation. So we are close to wrapping up our milestone three. So this is the one that is running both consensus protocols and linking them together. And like, we have a test case that demonstrates that finality prevents nodes from rolling back past the final proof of work block. So that's awesome. To finish the milestone, we need to update some tech docs that's on my plate, and hopefully we can get those rendered. So my hope is to put them all in the zebra book, but it's our fork of the zebra book, and then get that rendered at a public URL. yep, and we are making a bunch of quick prototyping decisions, and so that book will like, we're going to move our ADRs architectural design records into that book as an appendix and stuff like that. So it should be the one stop shop for the zebra cross link code base to understand its design and code. And then we are going to like, make a release and a tag. And then next week, we're doing an in person for shielded labs, and we'll be hosting a workshop, and hopefully by then, we will have made some improvements to the test network. We're sort of grappling with that last I heard. And so if you remember, at the last workshop for Milestone Two, we had a shadowing mode, but the way to join it was really brittle, so once, basically all nodes have to update a config file at the same time to add a node or remove a node. So we're exploring ways to make a more resilient testnet, but with a quick and dirty approach, like whatever we can get working by next week. So hopefully that will be ready. So come to that workshop, if you're interested, or if you want to lurk, we'll also have general Q and A. Yeah, so I think that's our update. Oh also, I noticed there's been multiple efforts at using, I don't know if I call these formal analysis tools or formal analysis automation tools, but I noticed multiple efforts, and so we just got everyone together into a call to discuss different people's approaches to modeling cross link, which is modeling or automating proofs about its properties, which are both super helpful. And I already knew those were helpful as like an assurance for an end product, but one thing that helped me shift my perspective in that meeting was that those are great earlier on as the reference for implementing for software engineers, so we want to kind of pull forward some of that work and, like, collaborate more actively with all of you who are contributing those things.

Daira emma: 00:43:11  

Yeah, and to me, there's also the issue that I mean, I've done pencil and paper proofs for the cross link design, but are those correct? Yeah, if I do the formalization, then I'll be pretty sure they're correct. Yeah, it's hard to review proofs.

Nate: 00:43:33  

Also, another area I'm interested to dig into is, you know, we're discovering there's like design decisions that impact, saying subtly about the assumptions for cross link. So for example, when is issuance paid out to delegators, and what are the incentives if BFT is stalled for too long and things like that, where I'm a little bit concerned that we don't want to violate the assumptions of cross link, or that we're very clear about when the two protocols are sort of influencing each other, which is a really hard problem, but hard and fun, yeah? So,

Daira emma: 00:44:22  

yeah. I mean, it's really hard to make sure that the incentives work out after a really extended BFT stall. I mean, it's intended to work out in the short term, but in the sort of medium and longer term, you have to fix whatever problem called across the storm, but the idea is to just give time to do that.

Nate: 00:44:47  

Yeah. So hopefully, after this milestone, next week, I want to write a blog post about some of the surprises we've come across. That's sort of an overview of the ADRs. Yeah, so that's our update.

Alex: 00:45:07  

Thank you. Nate. Any questions for Nate on crosslink,

Nate: 00:45:16  

awesome. I just want to say it's really fun having our visualizer because we can, like, see the input vectors for test cases which are correlated to the diagrams we're always trying to draw on whiteboards. So we can, like, visually check, oh, yeah, that is what we thought it was. So I love that.

Daira emma: 00:45:37  

Yeah, I was on that call. It was awesome, except that my phone died about five minutes before the end. What? What was the last five minutes? Oh,

Nate: 00:45:53  

you mean from last arborist Call Update? 

Daira emma: 00:45:58  

No no, the call about formalization, next steps. Basically,

Nate: 00:46:05  

yeah, next steps. So shielded Labs is going to talk to informal systems, and basically, one of the things they do is consulting, where they rely heavily on Quint, and they're also developing Quint itself, and they have experience with a bunch of different consensus protocols, like Starkware is a big one. So we're going to chat with them to figure out how much engagement we want for the automated proofs. I would like to start looking at those during our next milestone. So by the end of the year, I would hope to, you know, be able to run them and understand them and see how it matches our implementation. Yeah, I think that's as far as we are currently okay, but let me know if you have suggestions.

Daira emma: 00:47:03  

Yeah, that fits. That gives me a timeline for when to work on the Lean formalization.

Alex: 00:47:16  

Awesome. Thank you. So let's do open announcements, and then we can tackle the agenda item. Jason wanted to go over and then Dara, Emma, so any open announcements Going once? Awesome. Let's move on, Jason. You want to tackle that Nu 7  discussion?

## Open Discussion 

Jason: 00:47:37  

Yeah, sure. So last week, I showed a proposal for shielded labs to deliver a smaller, faster version of Nu 7. It includes the network sustainability mechanism, explicit fees and then front loads, all transaction format changes required for all the currently proposed features. You know, our goal with this proposal is to sort of help Zcash move towards shipping protocol upgrades more quickly and regularly. You know, ideally, we'd like to see it happen every six months. There were some criticisms that were raised that I'd like to address on today's call. And so I think it might work best if I start by just briefly outlining three concerns and then sharing our perspective and then opening it up for discussion. So first off, there was an assumption that introducing a smaller network upgrade would inevitably lead to further delays for zsas. We don't believe that's necessarily the case. The timeline for Nu 7 activation has already shifted multiple times, and the current target for June 2026, is still considered optimistic, and realistically may slip again. So introducing a smaller network upgrade sooner reduces the risk of stalling protocol development behind a single delayed release. It also, I believe, eases pressure on the core engineering teams by addressing this current bottleneck and enabling certain features to be released independently. And additionally, it helps avoid a situation where delays to one feature compound delays across the entire upgrade. So second, there's  an assumption that every network upgrade causes the ecosystem to break particularly related to things like transaction format changes or updates to the consensus branch ID. The truth is, some disruption is impossible to avoid, and it's relatively common for some exchanges or wallet partners to complete updates only after their users start to complain and report issues. But overall, like we think that we can help improve the process by building relationships with miners, exchanges, wallet partners, understanding requirements on their end and and then working with them to minimize disruption. So we would take ownership and help streamline the process in a way that not only supports this smaller upgrade, but also future protocol upgrades. And really, the same goes for the ECC and the Zcash Foundation, like Conrado, noted that upgrades add work, you know, including review, reviewing changes, merging code, running Private and Public Testnets  and preparing for mainnet release. But you know, we believe many of those responsibilities can be taken on by shielded labs, and this is really sort of consistent with the spirit of Josh's recent proposal, which encourages contributors to take more ownership over the full network upgrade life cycle. And then lastly, there were comments suggesting that the NSM and explicit fees don't have enough impact on user experience to justify a network upgrade. And it would be a different situation if a major feature like crosslink were ready for production. Couple things here. One, we don't we don't think that network upgrade should be prioritized solely based on perceived significance. What the community really needs here is a predictable cadence of upgrades, where features are included when they're ready, and tying upgrades strictly to specific features runs risks running into the situation that we're currently with, where there's delays and slowdowns from delivering these user facing features. But moreover, our motivation for proposing this smaller Nu 7 is to help accelerate crosslink. We'll eventually need to go through the full upgrade process for crosslink, and then doing the smaller upgrade now gives us the opportunity to build relationships, improve coordination, and work through any challenges ahead of time, which will ultimately make that larger effort more efficient. So yeah, I'll stop there, and I see a bunch of people have their hands raised. So why don't we start with Daira Emma,

Daira emma: 00:51:56  

yeah, so I'm kind of opposed to this proposal, and my main concern is, I'm sorry that I haven't had time to to actually respond to the forum thread, but I'll make my arguments here. I think the main focus my argument is the last point that you, last criticism that you made, which is the fact that NSM, plus explicit fees, does not have a significant impact. It basically doesn't have any impact on user experience, because so the issuance smoothing part of NSM will be deferred to

the next, halving, anyway and so it, it basically doesn't matter. It's unobservable,

Kris: 00:52:52  

not the next having, it would be deferred to the midpoint. Sorry. So essentially, a year from November,

Daira emma: 00:53:01  

right a year from November. So unless Nu 7 is delayed until after a year from November,

there will be no impact of delaying and some issuance smoothing to a new sub. So the fee components, so the requirement to send 60% of issuance fees to remove those from circulation. So that the impact of that is calculating zip, and that is really a very long term improvement to the economics. It's not going to, it objectively, isn't going to have a significant impact in the short term, and the point of it isn't in the short term. So it's not just that. It's a matter of opinion whether it will have a short, short term impact. It just won't. And explicit fees. Explicit fees is a clean up. It's not going to have actually an impact unless a user is using a wallet that calculates a fee incorrectly. That's the biggest impact it has. So, yeah, the positive benefits of sort of making these changes quicker, just not very significant. Also, there are risks. So, I mean, it might not be very visible, but sort of our planning and thinking and design has been based on the assumption that these features will activate at the same time. I think is actually extremely risky to make, to try to make transaction format changes in advance of the features that we're supposed to be providing a format for, because if you get it wrong, then you just have to change it again, and you end up with a transaction version that is basically unusable,that has an overhead in the protocol, documentation, specifications, implementations that can't easily be removed.I think it will be much better to wait until, wait to make those format changes until everything has been finalized and the actual Nu 7 features that need them. 

Jason: 00:56:13  

I just wanted to respond to a few of those points before we get to Nate. If you don't mind, first off, in what you were saying about the NSM, one thing that you glossed over is the fact that zip 233, enables this new burning mechanism, right? So there are certain economics that would be available to users that otherwise wouldn't. Second is, I understand your concerns about the risks associated with this. But one of the things that this really achieves is it forces us to get on a better network upgrade schedule, right? Because what we're currently doing, where we just have it based on features, and then it gets there's multiple delays, is kind of hurting Zcash  reputation, and it's and it's hurting our reputations and it's hurting users. So having more frequent network upgrades on a schedule would probably benefit things going forward. There was a third thing that I wanted to say, and that's I agree with the point that you you made about transaction, format changes coming before features, there is that risk that you know it gets wrong in the implementation and then you have to redo it. So, yeah, that point is noted.

Daira emma: 00:57:35  

I mean, I just think that it's been very clear for a long time that the feature that the Zcash community wants us to focus on is ZSAs. And yes, honestly, any Nu 7 is too big an upgrade.It probably should have been just ZSAs because that's taken a long time to get in. So there is this perception that it's just slipping and slipping. There are good reasons why it's taken a long time to get in, and it's a huge feature that changes a lot of the cryptography,you need a high degree of attention to review. And I mean, yes, there might have been errors in prioritization, I don't think that kind of inserting yet another upgrade, because, remember, we inserted Nu 6.1 and that was based on a governance decision by the community, inserting yet another upgrade before what is effectively Nu 7, which is the upgrade that activates ZSAs, because everyone's going to think of that as Nu 7. What you're effectively doing is inserting an Nu 6.2 that no one's really asked for. I mean, explicit fees were going in because we were doing a format change anyway, and explicit fees were always going to get into whatever the next format change was. There isn't enough rationale  to do them on their own as a network upgrade, that's why we haven't done a mini upgrade. And I mean to me, shielded Labs, you seem to be very, very keen to get the NSM in, and I don't see that it's what the community is asking for. Why is the NSM so important when it's going to make such a small economic difference?

Jason: 01:00:20  

Nate, do you want to respond?

Nate: 01:00:26  

So I have a few things. The big picture thing is that, well, yeah, zooming out to the big picture, I think it is a mistake for this community to associate the excitement and newsworthiness and celebratory nature of teachers with network upgrades, right? Because, like, it's always the case that when you're developing code, sometimes, like, you need to fix some stuff, and it's kind of boring to users, and so you need an update to do that. Yeah, so I think, I think it's a mistake for we've made this mistake in the past, and I've been prone to it where it's like, Oh, if we're going to do a network upgrade, it has to have a big splashy thing that people want. And I think that's a mistake. I think upgrades should be just for engineering decisions, and the big splashy thing needs to be events that users can like interact with, right? So I don't think when something activates in the protocol, it's very interesting. I think it's interesting when users have something in their hand that they can use to do something. That's when, that's when it's news, right? So, like, a counter example is the Ethereum merge was a massive, massive update. It took, like, multiple years, and it had zero user visible effects when it happened. Nothing happened, but everyone celebrated, right? Because it's showing this difference between, like, celebration and the community caring about something versus what does it enable? Like, What features does it have, or what things is it fixing? It should be decoupled. Yeah, so the the next thing is that for the NSM, for my perspective, it's not so much that the NSM is special or exciting or good, even though I think it is special, exciting and good, but like compared to other potential changes, or even other changes of the same order of complexity, which is pretty low, that's not why I'm personally saying we should ship it soon. I think we should ship protocol features as soon as they are ready, without entangling them with other features. Because there's a trade off. Dara, I see your thumbs down. There's a trade off. One trade off is like one world is there's a bunch of separate network upgrades. They're each disruptive. Each one introduces a new kind of thing, and it's disruptive. So the ecosystem, the downside might be that the ecosystem gets, like too disrupted over time, and like loses coherence, or something or network effect. The upside is people can begin learning and using the new functionality in the protocol sooner, so like network upgrade, so NSM enables burning what? What will people do with that? We don't know. I have some ideas. When can they do that? The difference is, could they do it at 6.2 or do they have to wait, like, a year and a half? I mean, the Delta might be a year, or even if it's six months, it's just more time where people can experiment and learn, including us. So like, if a protocol change is disrupted to the ecosystem, who does it disrupt? What's the issue with it? What do they need to do to fix it? So those are the trade offs for that approach, the other approach of let's package everything together to make a huge, splashy update, and let's make sure all of the pieces don't disrupt each other. Means, whenever a new piece arrives that people think is a priority, that means we have to delay the release in order to incorporate this new feature into everything. That's what's been happening, right? So first it was the and now, first it was this is, and then we have been glomming on all kinds of changes, and each one requires review and developers to understand what it is, and so forth.

Daira emma: 01:05:42  

What changes have been climbing on? I'm only aware of quantum resilience.

Nate: 01:05:49  

Quantum resilience would be one. Zcash D, deprecation would be another

Daira emma: 01:05:52  

Wait, no, no. Zcash D, deprecation is required for zsas, but it wasn't so, so if we do Nu 6.2 but it was

Jason: 01:06:21  

Hold on a second. There was some scope creep, right? Because you're right, quantum resilience was one of them, but there were some additional things that were also added on. And one with quantum resilience, there hasn't been any discussion, there hasn't been a zip, but it's sort of spoken about as it's being included as part of Nu 7. Second. The other things to me, to my mind, is the security requirements yeah, the other things were like the ongoing lock box disbursement, the key rotation for consensus. Keys were two other things that weren't originally this. The scope of Nu 7 was originally defined late in

Nate: 01:06:58  

memo bundles. Memo bundles were in the original lineup for Nu 7. But is it something users have been like, I feel like there's moving goal posts where, oh, it has to be important enough. It either has to be important enough for users to specifically want it and demand it, or it needs to ride on the coattails of something that is which means that like so I'm just saying the trade offs are, if the good thing is, if all of these things work. Well, there's just sort of one disruption to the ecosystem. If all of the integrations work, the disruption, you know, is not too disruptive. And then all of these features and functionality become available together. And it's a big, noteworthy event, the down of order is, can

Kris: 01:08:04  

Can we please take some shorter turns, because we're going on like 10 minutes a person speaking here, and I would really like for Arya and myself and Strad to be able to make some points. Okay,

Nate: 01:08:17  

sorry I lost my train of thoughts,. Downsides are lots of risk delaying all of the features, except for the slowest one to be ready. And I still also believe the risk of disrupting the ecosystem is actually the same or larger than doing multiple updates. But that's yeah, that's what I want to share. Okay, Aria,

Arya:  01:08:49  

So from my perspective, it seems that all the risks and dangers can be worked around. It's just a matter of how long is it going to take and how much effort are we going to have to put in? And I don't think that having the NSM deployed a little bit earlier is worth all the extra effort that we'd have to invest in making it happen. I do also think it's going to push statuses out. So I don't think this is a good idea for Nu 7 but I do think this is bringing up a good point for future network upgrades. I see that someone mentioned in the chat we used to have regularly scheduled network upgrades. I think we should go back to that, and we should have more incremental network upgrades, ideally a more flexible transaction format. I do see that we clocked on a bunch of things into Nu 7 that were not planned at the very outset, but that we've realized we needed as we went on, specifying, I think zebra and the new stack will help a lot with making incremental network upgrades possible or practical. But we really just got to get through Zcash D deprecation at this point, because we've invested so much into it, we're so far down this road that we've passed sort of a soft point of no return. And all this discussion is valuable for what we do going forward after Nu 7. Yeah, that's, that's my perspective. Okay, I have, I have a

Kris: 01:10:19  

Okay, I have a few different points here. I will try to be quick. The first one is that I'm very concerned about the proposal to deploy all of the transaction format changes as part of this proposed upgrade. So the the main reason that we have not wanted to or that we have glommed stuff on to Nu 7 is because transaction format changes are currently highly disruptive to the ecosystem. They cause lots of things to break. I would love it if we could make transaction format changes without them breaking so much of the ecosystem, but that requires implementations of parsing libraries in lots of different languages, and having those parsing libraries broadly adopted, that would be something worth doing now , in particular the integration of memo bundles, I think, makes the proposal that Jason has made extremely challenging to implement, and that, honestly, if we're going to, like I would rather see The transaction format break twice then have the changes for memo bundles included  in this proposal, and  frankly, the changes for all of the rest of the format changes,if you want to make this change, the changes required to Zcash D for all of the rest of the transaction format changes are simply too dangerous to include along with the NSM format changes, the NSM format changes are relatively trivial. They are hopefully almost ignorable,  we shouldn't push forward the rest of the transaction format changes because they change way too much about how so much of the protocol operates. I'm not greatly in favor of inserting another network upgrade, but at least that won't mean like months of work buried into Zcash D, to actually get all the rest of the transaction format changes, because it is months of work if you want to do everything in the transaction format changes that are currently scheduled for Nu 7 in Zcash D.

Jason: 01:12:58  

Can I just respond to that piece real quick? I'm sorry to interrupt you, but the reason that I put that into the proposal was based off the conversation I had with you where it almost seemed like it would be a deal breaker to do otherwise, right? Because we didn't want to have multiple, multiple transaction format changes. If you want us to remove that from the proposal and just do the necessary ones for the NSM, then, then that's fine. I mean, that benefits us and it makes it simpler to execute. 

Kris: 01:13:25  

So I don't think it's a good idea to have multiple transaction format changes, but I think that it's a better idea to do that than it is to try to implement the memo bundle changes and maintain them. You know this the the inviolability of the network. The other thing that I wanted to bring up related to this is timing. So we are currently sprinting to try to get to where we can have the Nu 6.1 main net activation height set. Then there's a 16 week lead window for end of service halts for each release that We make So the end of service halt for the Nu 6.1 supporting Zcash D and zebra releases will extend, you know, into next year, and there cannot be a network, network upgrade before all Zcash D and zebra nodes that have prior versions of the consensus rules have halted. So there's really not a like. I don't see any possibility for this network upgrade that you're proposing to activate before essentially, the end of q1 of 2026 and then  that's really running up quite close to the time that we want to be public, have or have published Nu 7 supporting zebra release. So this then means that we're going to have two transaction format bumps within a couple of months of one another, or a few months of one another. Well, four, if we do the full 16 week deprecation window that we have consistently planned for Nu 7. So there's,  

Jason: 01:15:46  

How confident are you that that Nu 7 timeline is attainable?

Daira emma: 01:15:56  

I mean, we're merging the Nu 7 PRs. We merged some of it into Halo. We merged some of it into orchard. There's a lot to do still, but it's actually on our plate to do in the near future, which it hasn't been able to because we've been so focused on zcashd deprecation and so on. I mean, I'm almost certain that this proposal would slow down the deployment of ZSA

Kris: 01:16:33  

So again, what Jason is proposing is for shielded labs to take on all responsibility for this network upgrade, which includes wallet updates and so forth. So in theory, for us to be able to keep the wallets that we maintain working across this network upgrade boundary, we will have to review the changes to the wallet back ends that are required. So it does. It does mean that, you know, it does put that additional work onto the ecosystem. That being said, that's work that's shared with the rest of what we've called Nu 7. that's okay, I guess. I think that in terms of the transaction format changes, it's pretty important that one, one  possibility that occurs to me here is that if this proposed network upgrade activates, but nobody on the network except those who are wanting to to do burns, if nobody uses that v6 transaction format, then it's perhaps less impactful. It does mean that, you know, essentially, that transaction format will only, would only be supported in consensus, and people would have to write their own software if they wanted to otherwise interact with those transactions. I guess that's fine.

Daira emma: 01:18:23  

It's not fine. In my view. 

Kris: 01:18:25  

Its not great. But, you know, I can say that zashi and Zallet will probably not eagerly update to support that interim transaction format for transaction construction, they'll, of course, have to be able to parse it and integrate their information into the wallet. But that's mostly a UI and display  kind of issue. So if  we don't change wallets to broadly construct v6 transactions with this narrower view of v6 then, then maybe that's okay, and maybe it's slightly less disruptive to the ecosystem, 

Daira emma: 01:19:16

Well, it means, it means that you're not, you're not getting the benefit of the explicit fees. So, yeah, that's

Kris 01:19:18  

I don't consider that a blocker in any in any sense, like the explicit fees benefits are they're subtle, and they won't be fully realized anyway, because they won't be fully realized until v5 transactions are no longer accepted by the network, and that's going to be quite a while, because there's been no proposal to deprecate v 5 transactions  for, Nu 7, okay, yeah, I should end. Are you there? Okay, back to Nate. Then I guess no, we cannot hear you. I

Str4d: 01:20:25  

How about now? okay that that will have to do, okay? It's been like 20 to 25, minutes since I raised my hand. So I can't exactly remember what I raised it for. I was the one who posted in the chat about the fact that, like, when, when either, I think, figured if it was Jason or Nate talking at the time, I raised the point that we tried six month upgrade periods in the past and did not succeed at maintaining that rate. In particular, I've got a post I made back in 2023 in the forum, where I did the various calculations to just see, like, what was our actual sort of effective network upgrade rate in the past. And at the time, we had effectively been managing to get out around one upgrade a year. Then sandblasting happened, and there was an interval of several years where we didn't get any network upgrades out because, for various reasons, we were unable to devote time to anything other than sandblasting mitigations. But prior to that, if you look at the the numbers on that, I don't, I can't screenshot them, but if someone else wants to that page, you can see them the table there that there were a couple of upgrades that we were able to do in around about half a year or slightly under, but those were either upgrades that we were able to paralyze because the upgrade before was very small, namely overwinter, or upgrades that were themselves very cut down and restrained, which was like heartwood and canopy. They were, they were very small upgrades the moment we got into something that was of any particular size, the upgrade took well over a year to get through. So getting to so it given past experience. It makes sense that getting upgrades out, and in terms of the the speed at which the network is able is able to get, you know, the ecosystem is able to get through the network upgrade process does take a like about a year at that time, I am what I was asking about in the in the question was, what if we're continuing to propose trying to get back to that every six months target, which was the target at that time, and we were consistently failing to hit that target? What is changing? What has been proposed to be done differently this time. That means we won't just do the same thing again, and can and continue to to miss those targets.

Daira emma: 01:23:10  

I have a direct response about where that target came from. so I worked that out with another person who is no longer at ECC, and I kind of felt very pressured to reduce that as much as possible. And I think that we just made a mistake, and that six months is just not, under any circumstances, feasible unless we were to have some very significant design changes as well as procedure changes in how both transaction format changes and network upgrades themselves work, so  that would require a lot of preparation. It can't be done now. 

Str4d: 01:24:02  

very much love to decrease the the frequency here, but any proposal that's attempting to decrease the frequency has to reckon with the fact that we have tried this in the past and not succeeded, and so we need to figure out how to how to adjust the way that either network upgrades go out, or how coordination goes out to to enable getting upgrades out of their frequency, without treading on each other's toes and without trading on like interfering with and delaying  the  upgrade process longer.

Jason:  01:24:38  

Do you want to respond to that.

Alex:01:24:44  

just, just to jump in for one second before we go to Nate, we have about five minutes left. I want to be sure we're respecting everybody's time. So Nate, you want to jump in and then, if there's any other quick comments to wrap this up,

Nate: 1:24:56  

yes, okay, I'll try to be quick. I think the best way to say it, though, is just that I have a strong concern that if improvements to the protocol take a long time to ship, that is, like one of the the key metrics. I know it's very hand wavy and abstract, but it's one of the key metrics about how rapidly zcash can progress. So I asked chat GPT about the median time between upgrades for Ethereum, and it, I lost, I lost it. But I'll share that link, and it is something like half a year or something. And my question is, how could Ethereum, which has a much larger ecosystem,

make changes that quickly?

Daira emma: 01:26:12  

that, we would need to spend weeks answering.

Nate: 01:26:16  

Yeah, but I think it's an important question for us to think about. The last piece I wanted to say is in terms of if a protocol change. So a protocol change activates. Now, who uses it? Well, developers need to ensure that the software they make that could benefit from it is updated to use it. I think very few of those developers will do that for Zcash before an upgrade happens, like, I think just the shielded wallets, but probably not like Gemini or Coinbase or block explorers or I many, many other vendors, and I think they only begin changing things when they notice, and many don't notice until an upgrade happens, and then they have their own pain and learning curve, and it might take a long Time. And one thing, one difference I noticed is it often seems like we want to provide all of the tools for everyone, but I also think sometimes these businesses should be improving their own tools, and they won't do that until they need to, because their customers require it and they notice. So I just want to say earlier. That's why I believe getting things out the door earlier, even if there's low usage, is important, because it has to be activated for a while before it's actually usable by users. That's it.

Daira emma:  01:28:05  

Yeah, Strad made the point in the chat that actually the Ethereum consensus layer hardfok is around once a year. So yeah, once a year is feasible. I don't think for Zcash at least six months. 

Alex: 01:28:26  

Do you want to say anything in closing, Jason, before we wrap up?

Jason: 01:28:30  

I mean, my biggest fear, and the reason that we're bringing this up, is that the timeline continues to slip and we just keep making the same mistakes. However, the current process isn't working. I think we need to do something to change it. And, I mean, we're strongly considering  moving forward  with this proposal. So, I mean, I'd like to keep the conversation going.

Daira emma: 01:29:00  

I mean, it's kind of up to the node implementers, unless shielded labs want to fork and kind of try and convince people to run a competing node implementation. But to me, doing that without the cooperation of ECC and ZF is just creating a whole bunch of drama that we don't need, and that will sort of slow things down. I mean, I think I will be very strongly opposed to making anticipatory format changes beyond those that we've already planned. So the v6 transaction format changes do include some anticipation of changes for asset swaps. So basically, if you also anticipate Nu 7, then you've got two layers of anticipation. That's the end of the point that I didn't have time to make before, and that's why we shouldn't do that. And then I also think that you're underestimating the cost of making two format changes. So those options are bad. Making two option two format changes is bad. Making anticipatory format changes to the extent that would be needed is bad. So just think that's a non-starter space.

Alex: 01:30:55

Ok we we are unfortunately out of time , apologies to you Daira emma that we didnt get to that your subject, hopefully we will next time, Do you want to say something Nate?

Nate: 01:31:00

Yes, i really wanted to point out i really do appreciate everyones efforts on this current plan, i know a lot of thoughts have really gone into it , you all have a lot of experiences and noticing many things i am not noticing, so i just wanted to express appreciation for all of that and the amount of collaboration is amazing.i dont want any of these to be a downer, i just want to explore.

Daira emma: 01:31:15

I think maybe if this proposal was made six months ago it might have reception, its kind of too late , we are too far down the road already

Kris: 01:31:59

In principle I like this proposal from an ecosystem decentralization perspective, I really think that we need to as a community address the problem of support libraries , because i will love it for us to able to make transaction format changes without them being so incredibly disruptive, no one is taking on that work, Ecc is not in a position to take on that work, i dont know how we can get that work done, i want as little additional work done in zcashD as possible if shielded labs is intending going forward with this proposal, and i really wish we could instead work towards making changes like this one that will be a minimal Nsm more possible, so that we dont face this kind of problem continuously 

Daira emma: 01:32:00

I think that deprecating Zcash d as soon as possible which is the objective of this proposal will help a lot and will have a modern node implementation written in memory safe language with an architecture designed for zcash, that will make so much difference, the faster we can get there the better, i dont think this proposals gets us there faster, i think it gets us there slower 

Alex: 01:32:40

Thank you everybody for an awesome call and great vibrations, really appreciate everybodys updates and efforts, lets keep this conversations going on the forum, discord and elsewhere and then pick up on the next arborist call, thank you very much, much appreciated.

Next Meeting Scheduled: 4 th september 2025, 21:00 UTC
