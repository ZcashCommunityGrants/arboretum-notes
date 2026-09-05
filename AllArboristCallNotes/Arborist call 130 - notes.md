## Arborist Call 130 Notes 

Meeting Date/Time: 20th August 2026, 15:00 UTC

Meeting Duration: 1 hr 20 minutes

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update[zebra 6.3.0](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zodl-core-libraries-and-zallet-cli-wallet)

Research & Implementation Updates - [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit-zsa)/ [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--nsm)/ [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--crosslink)

Open [Announcements](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements) 

Open Discussion[constant time hardening](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#constant-time-hardening-and-explicit-timing-semantics-for-zcash-cryptography) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=doDbR0i9zZA)

Moderator: Alex

Notes: chidi (X) @zcashNigeria 

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:02:06  

All right, let's get started. So, arborist calls are scheduled in the UTC time zone, we're going to start well now.

The meeting will be recorded. So this is Zcash Arborist call, August 20, 2026. Our agenda starting with core stack updates: Zcash Foundation with Zebra, Zodl with Core Libraries and Zallet CLI Wallet, Zingo Labs with Zaino, and then onto research and implementation updates with qedit for ZSAs, Shielded Labs with Network Sustainability Mechanism, Shielded Labs with Crosslink Trailing Finality Layer, and Shielded Labs with dynamic fees. And then we have open announcements and discussion, including a guest who will be presenting Eric's grant application constant time hardening and explicit timing semantics for Zcash Rust cryptography. What are Arborist calls? Biweekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. Purpose is to make Zcash core development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development can register at zcasharborist.org. If you want to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Other ways to get involved: Zcash Community Grants, ZCG, Zcash R and D Discord, and Zcash Community Forum. And these links are all listed on zcasharborist.org. Let's start with core stack updates from Zcash Foundation Zebra.

## Zebra Update 

Alfredo: 00:04:02

Yeah, that's me. Thank you, Alex. So in Zebra, in the last two weeks, we released Zebra 6.3.0. That was on August the 10. Sync and peer-scoring security fixes. Apart from that, Zebra now has a lightwallet-compatible gRPC server, which implements the compact transaction streaming interface. So light clients can connect directly to a Zebra node without running the lightwalletd node in between. This is experimental and not enabled by default. On the consensus side, the transaction verifier was split into separate block and mempool verifiers. This is some cleanup we needed to do, it is for future work. Several network fixes went in. The main one being that now banning a peer removes every address-book entry for the IP. Previously, the malicious peer could come back into the address book. We refactored and simplified the peer set, actually, so the address book is now behind a Tower service, which is something we wanted to do for a while as well. We had an external contributor who added coverage for fuzzing in the network and consensus crates, which is being reviewed, but that's another feature Zebra has. And on the internal development process, actually, we changed the changelog entries to use a tool named Changie. That should make it easier to deal with the changelog conflicts Zebra has been having in the last several months, with the amount of PRs we have, so we are trying to improve that by using this new tool. And then coming up, we are after a big refactor that we wanted to do as well, which is the transaction type. So we have a PR pretty much ready to replace our transaction type with the zcash_primitives one, which is something we really want to do, and it'll simplify a lot of the codebase. We are converting flaky tests we have in our CI into nextest tests, so we are trying to make our CI to fail less often a bit more reliable. I think we were mentioning at the end that we have a five PR drafts for a new peer-to-peer protocol over QUIC. This is Arya and some of the ZIP editors that are working on this area of Zebra. So I hope we'll have news about that soon. That's pretty much it. Thanks.

Alex: 00:07:09

Any questions for Alfredo? Great. Thanks, Alfredo. Up next, Zodl with Core Libraries and Zallet.

## Core stack Updates zodl Core libraries and Zallet (cli wallet)

Pacu: 00:07:22

Thank you, Alex. I'll be giving the updates. So these last weeks, we have had a bunch of folks in the team taking some time off after a huge stretch we had to do, but there were a lot of updates anyway, so we closed a lot of findings from the zallet security audit, and we hardened the gRPC and and other parts of the Wallet, which is still in beta 0.10 and we also hardened the zcashd migration path with feedback from miners and other users. So now you can import pre-Sapling, HD-seedless wallets and older key material, and it's better supported. Also, we Cut a few crates like zcash_client_sqlite 0.22. What else? Were

Daira: 00:08:48

Those mainly Ironwood updates? They have one.

Pacu: 00:08:51

I think they're mainly Ironwood and other fixes as well. Yeah. Also, we advanced the Zcash pool migration engine and a lot of the improvements we did with zodl development and that's that's pretty much it. These crates that we cut are our final crate releases, and no more RCs. Fortunately, yeah. So that's mainly our update, and we also developed a few more RPCs, like signed messages, for example, for Zallet and yeah that's pretty much it. We do have a, I guess, a small request because we've seen that there were improvements to the Orchard crate and and other librustzcash improvements. So if those contributors could upstream their contributions, we would be really grateful to receive them and, yeah, review them and merge them. Yeah, that's pretty much it. Thank you.

Alex: 00:10:46

Any questions for Pacu on core libraries and Zallet, Alfredo?

Alfredo: 00:10:52

Yeah, I just want to just to say to Pacu that I think you submitted a regression issue into Zebra. I will take a look at that today. Thank you. Oh, okay.

Pacu: 00:11:04

Thank you. Yeah, we can. If you have anything that you'd like to test, we can like send them over the the branch you're working on, and maybe they can test

Alex: 00:11:33

Great. Any other questions for Pacu? Okay, moving on to Zingo Labs with Zaino. Do we have anybody here from Zaino today? Doesn't look like it. Okay, let's move on. QEDIT with Zcash shielded assets.

## Research & Implementation Updates Qedit. Zsa

Vivek: 00:12:00

Hi, so that's me today. Hi everyone. So yeah, we have a few updates regarding what we've been working on recently. the main thing has just been catching up our code with the changes that have been made for the NU 6.2 and NU 6.3 updates. So the changes there are. I think we've pretty much got to NU6.2 on all the crates. That's like Orchard, librustzcash, Zebra, a transaction tool, and so on. We have done the changes for NU6.3 in Orchard as well. So, like just in Orchard so far, we are working on the Ironwood changes in the others. Yeah, we are also like in the Orchard setting. We are splitting out our work. Like I think we discussed this with Daira, and we are going to be splitting out the circuit as a separate PR so that just the circuit can be reviewed independently and like to make it smaller since it's a pretty large PR in general. So I think that also it's not pushed to upstream yet, but I think that should be happening reasonably soon. On the Halo 2 side, Iwe have a PR that we had for like an edition that was needed for the Orchard ZSA circuit. I think that's pretty much done in terms of like the review. Like, there was a review; we addressed the comment, so maybe it's ready to be merged or might happen in the next release or something like that. Other than that, that's mainly for the ZSA stuff. On the swap side, we like to request the ZIP editors to add our draft of the swap ZIP to the upstream, because so far it was just a stub and the version was on our deployed web, like our rendered version, which used to break every few months or something. So now, now that's been added. So that draft is available in the zcash/zips repository as ZIP 228. so far it's been like swaps has been an addition on top of ZSAs, but since both swaps and ZSAs are pretty much ready, we are looking into how we can best merge the two together and deliver them as one single piece. So that's like we are checking how that would look and what the work for that would be like across the various crates. I think that's basically the update I have for this time.

Alex: 00:14:55

Any questions for Vivek? No,

Daira: 00:14:59

Just to say that I'm going to be focusing on getting those PRs reviewed in the next couple of weeks, because my work on the Ironwood formalization is nearly done.

Alfredo: 00:15:22

That sounds good. So yeah, QEDIT has a draft PR open against Zebra that implements shielded assets. Of course, it depends upon the other crates that need upgrading first. But one of the things that So in the past, I think that the refactor we want to do changes our transaction type to use the zcash_primitives one. So in the past, I think QEDIT didn't want to do that because it will conflict directly with the PR they have opened. I don't think that's very relevant anymore. But I just wanted to ask you, Vivek, about that. I'm not sure if I was here. What do you think?

Vivek: 00:16:16

I'm not sure I have that on the top of my mind. What you were mentioning, like

Alfredo: 00:16:24

So if we change the transaction type to use the upstream one, the QEDIT PR that the shielded asset will have to do more changes to support that. But I think at this point it's not that relevant anymore because the code changed anyways a lot. So I assume you'll be fine. You have to do a bunch of changes anyway if you upgrade the current PR. So this will be just one more that you

Vivek: 00:16:55

There is definitely a lot of changes that need to be handled for Ironwood, so okay, yeah, we'll take a look and we'll like get back to you in case there's yeah we we see any other.

Alfredo: 17:08

I added some comments on that PR at the end, so maybe if you can take a look

Vivek: 00:17:15

We'll do that yeah thanks

Alex: 00:17:17

Great any other questions for Vivek? Great. Thank you. And up next, Shielded Labs with network sustainability mechanism.

## Research & Implementation Updates shielded labs- Nsm

Judah: 00:17:30

Yeah. So only one small update with that. I was asked to make.

Daira: 00:17:35

Ah, you're very quiet.

Judah: 00:17:37

Oh, let me see. How is this any better?

Daira: 00:17:43

No, still very quiet.

Judah: 00:17:46

Oh darn! This seems to keep happening. How about now? I

Daira: 00:17:59

Just speak up a bit because I can't hear you.

Judah: 00:18:01

Oh sure, yeah. I'll see how close I can get. A minor update is that I was asked to submit a draft ZIP 234 with halvings preserved, and so I'm going to have that going out probably today, hopefully. So just to make sure that proposal is at least backed by a zip, so that's the the only update.

Daira: 00:18:23

Is that is that so presenting the smoothed option and the halvings option as kind of parallel tracks?

Judah: 00:18:36

So this one I can change it to do that. Right now it's just a separate zip.

Judah: 00:18:42

Just to make sure they're talked about separately, But if you prefer one over the other, definitely let me know.

Daira: 00:18:53

It would be easier to compare them if they were presented that way. The other option is to present it as another draft zip, just so that we get the rendering.

Judah: 00:19:14

Right, definitely. Okay, great. Yeah, I'll I'll send you the the current draft after this.

Daira: 00:19:21

I mean I can review it as a PR, but people are supposed to be voting on the options. So yeah, ideally they should be able to look at the rendered versions.

Judah: 00:19:33

Yeah, yeah, that's it for the NSM.

Alex: 00:19:37

Any additional questions or comments for Judah On NSM. Great, thanks, Judah. Next up, Shielded Labs with Crosslink trailing finality layer.

## Research & Implementation Updates shielded labs- Crosslink

Philip: 00:19:51

Hi, can everybody hear me? Okay. Hey, everybody. I'm Philip. I'm on the Crosslink team. Shielded Labs headline news is that we have a Crosslink workshop scheduled for august 26 at 4p.m. UTC. That's 9 a.m. Pacific, 12 p.m. Eastern. In that workshop, we'll review the progress we've made since the last workshop, which includes stability improvements and the hard fork tool that we've developed. We'll also announce the round two payment date. We'll share plans for the next network implementation. We'll discuss plans to begin resetting the network on a regular basis. We'll announce the new nightly network. We'll gather feedback from participants and we'll hold an open Q and A and discuss next steps. Definitely check that out. august 26, 4p.m. UTC. Yeah, since the last Arborist call, we released two stability updates to our Crosslink node version 12, version 13. Version 12 contained speed improvements to our built-in wallet which improved reliability for staking and unstaking for participants now that the chain is longer than before. It also included visualizer improvements for displaying sidechains and improvements to the user experience, especially for participants who were running headless, and that's both in the build and also just in usage, version 13 was a small patch that also improved the stability of the of the wallet. we've also continued to monitor the experience of participants after the release of version 11, which we talked about in the last call, and we no longer see any systematic or pervasive forking, so we're confident that those bugs are squashed, and we've closed the book on that investigation. We are working internally to prepare for our first network restart, which is going to include a bunch of consensus changes based on what we've learned running this first network, and that'll also include merging all of the updates made to the Zebra codebase, including Ironwood, since we first forked it and launched the network. And that's it for this update.

Alex: 00: 22:13

Any questions for Philip on Crosslink? Thank you.

Daira: 00:22:24

Hang on. Yeah. So, what are those consensus updates? Can you give a summary apart from kind of just adopting Ironwood?

Philip: 00:22:35

Yeah, they are details related to the staking system. Some of them are data format changes in terms of how we had implemented the staking actions, you know, just to make it computationally easier for in some situations. Well, like one example is just for our staking action, there was like a staking to field in terms of like which finalizer you want to stake to, but there's some reasons in which we think it's prudent to have a staking from field, which is to say, what finalizer are you staking away from? that's for a redelegation, sorry, not a staking action. So like if I'm redelegating from one finalizer to another, I want to know from which one I was redelegating from, and the main reason for that is, when we were developing the hard fork tool, we needed a computationally easy way to check recent blocks, like a window, because we have a window in which to burn bonds that have been staked to a finalizer that we're slashing, and just having that from field is useful. So yeah, there's data that's

Daira: 00:23:50

Supposed to be correct by consensus. Yeah,

Philip: 00:23:52

It would have to be verified by consensus. Yes, definitely. And then other ones, we just have not yet implemented the commission, the 10% commission that we intend to have for finalizers. So, like the current network just doesn't have that 10% commission to finalizers. So that's just an example of just like features that need adding. So those are the main ones: is just like convenient data formats or like useful data formats, and then the other one is just features that have not been implemented yet.

Nate: 00:24:27

Hello, can I chime in? Can people hear me? Oh yes, yeah. So I'm sorry, I'm pretty distracted, so I may have missed this. But one other category is we need to backport stuff from mainnet, including Ironwood, so those breaking consensus changes are going to be one category.

Nate: 00:24:51

Sorry if that was already covered. Yeah.

Alex: 00: 24:58

Great. Any other questions or comments for Philip, awesome. So now shielded labs with dynamic fees.

## Research & Implementation Updates- shielded labs Dynamic fee

Mark: 00:25:10

Okay, so the two big things here are I made a ZIP draft, a 2000 level zip, to reduce the marginal fee from 5000 zats to 1000 zats. I understand that number may be up for debate. That's fine. The PR is there in the ZIPs repo, and it would be great if we could discuss it there. The other thing is that I spoke with Dave from Zakura. I wish he was on this call so we could discuss this here or whatever. But he has gone ahead and increased the weight ratio cap in Zakura to 10x. So I went ahead and made a PR to that effect in Zebra, after talking with Arya in D.C.

Daira: 00:26:06

Wait, shouldn't we be doing the specification first? This is the first I'm hearing of it, and there was no proposed change to the zip.

Mark: 00:26:17

Yeah, I'm I'm happy to make that another a second 2000 level zip, and I mean, it just felt like

Daira: 00: 26:22

This is not just about fixing it now. This is about kind of why was that done in the first place without any opportunity to discuss the specification. That that shouldn't be how we do things.

Mark: 00:26:41

Understood. Yeah,

Daira: 00: 26:42

And I'm not criticizing you.

Mark: 00:26:44

Yeah, no. That's why I'm saying I wish. I wish Dave was here. I wish Zakura and Tachyon would attend these calls. But that's all. You know, that's just the update for dynamic fees. I'll go ahead and make another 2000 level ZIP and make a PR to that effect for the weight ratio cap. And again, we can just discuss it publicly on the PRs.

Daira: 00:27:08

Hang on, though. This is the kind of thing that should be discussed in these calls. So, what's the rationale for changing it to 10x, or is that necessary?

Mark: 00:27:26

So the marginal fee ZIP that I wrote argues for a powers of 10 fee alphabet for easier explainability and understanding. That seems

Daira: 00:27:42

That seems a pretty weak argument to me.

Mark: 00:27:44

Okay, so the 10x just fits into that, and it widens the range for people to pay for inclusion. I understand the blocks are not congested at the moment, but they may be in the future, And Dave wanted to just remove it, and I argued against that, and I argued to just increase it. So there's some interpersonal political things going on here as well.

Daira: 00:28:18

We should do things by changing specs, not by unilaterally changing implementations; otherwise, it's impossible to keep the specs and the implementations in sync.

Mark: 00:28:31

Yeah, I'm playing catch-up. I'm on the heels here of this sort of unilateral design change, as you call it. I feel as if the only thing I can do right now is make the ZIP PR as it is and and go from there. Or you know, now we have configuration differences. We have constant differences between the nodes now.

Daira: 00: 29:00

I understand. Has anyone actually considered what the interoperability consequences of some nodes having the 10 times and some time some nodes having the four times are?

Mark: 00:29:14

I have, and because it's perhaps not as harmful because it's widening, it's an inclusive change rather than an exclusive change. So it's not tightening any parameters. It's just making it so that theoretically more transactions would get included, or I mean they would anyway because anything above 4x just counts as 4x in the current spec and in the current Zebra. Yeah, so I don't think it's going to cause any sort of soft forks or any mempool eviction or anything like that we wouldn't expect. Yeah, yeah.

Daira: 00:29:55

The point is not so much the specific change is harmful. It's that it's a very bad precedent because it seems as though this may have been done without even considering interoperability issues, or at least not discussing them publicly within the community.

Mark: 00:30:13

Yeah, I can't tell you whether they were considered. I certainly considered them, but they were definitely not discussed publicly.

Daira: 00:30:24

Understood.

Mark: 00:30:25

Yeah. Okay. Well, thank you, Daira. that's all I have for dynamic fees at the moment. Yeah,

Daira: 00:30:36

I'm sorry for kind of slightly shooting the messengers there. I realize this is not your change originally, but it concerns me deeply that I'm just finding out about this, and I'm zodl head of assurance and research, and it shouldn't be that the only way I can keep up with protocol changes is on a call like this. That's what the ZIP repo is for. That's what the R&D Discord is for. So these things can be discussed, and everyone knows what the proposal is before it gets implemented, and we can point out security issues, we can point out weak motivation, things like that. That's how it's always worked, and that's why we've been so successful in avoiding serious security issues, or at least mitigating them in a way that doesn't lead to user loss.

Alex: 00:31:53

Alfredo, Alfredo.

Alfredo: 00:31:56

Yeah, I totally agree with what Daira said in everything. I guess. So I was wondering if maybe the ZIP process needs some updates. I don't. You guys have been pretty much working on that. So why would people prefer to just do change unilaterally? Maybe there is some friction in the ZIP process

Daira: 00:32:25

I mean we had been seeing Dave regularly in ZIP Sync meetings, and this has not been mentioned though. I've been at every ZIP Sync meeting. Okay. I don't know why it wasn't mentioned. Okay. Yeah, I mean, maybe there's friction in the process, but you have to use the current process, and you have to kind of argue for there to be changes, not just go ahead and do. Yeah, yeah,

Alfredo: 00:33:00

The only way for different implementations to figure out what to do in this. I'm not sure how critical this is, but as you said, there could be other changes that when you implement one thing and the other one is going to be hard. And we have been doing that between zcashd and zebrad in the past.

Daira: 00:33:20

Yes, of course. I think Zooko wants to speak

Zooko: 00: 33:32

It did. Can you all hear me?

Zooko: 00:33:37

Okay, I can tell I'm going to do one of those things that I always regret, which is, I want to widen the Overton window and say I totally disagree with all of y'all, but then we don't have to resolve it. I just want everyone to know there's different opinions out there. I don't think fees should be collectively agreed on by everyone. I think wallets should do whatever they want. Are we talking about fees? These aren't.

Mark: 00:34:01

We are talking about two specific configuration parameters defined in ZIP 317 that are defined as constants in both code bases.

Zooko: 00: 34:02

I think miners should do whatever they want to. But now let's move on to the next topic. I'll be quiet.

Daira: 00:34:15

It might actually be ZIP 401. I can't remember. Which is a wallet zip. I mean, this isn't specific to fees, right? So the principle of the thing is that this is a spec, and yes, you can disagree about the extent to which everyone needs to follow the spec, but please talk about that first. We can weaken specs.

Zooko: 00:34:49

People were upset about the ZIP 318 visor versus Zodl fight, and they were bringing it up in the topic of dynamic fees. Is that what's going on?

Daira: 00:35:01

Sorry, I didn't quite hear what you said.

Zooko: 00:35:03

I said What actually is going on is people are upset about the ZIP 318 Zodl versus Vissor fight, and they're bringing up the general principle and the topic of dynamic fees. Because I don't think dynamic fees are.

Mark: 00:35:15

To be totally honest, I'm not getting that vibes Zooko. Oh, okay

Daira: 00:35:19

No that's not what it's about.

Zooko: 00:35:22

Whats the general principle you are talking about, You said the general principle, like,

Daira: 00:35:29

Oh, yes, that point also covers the ZIP things, but the rest of what I was saying, I was saying about fees,

Zooko: 00:35:44

Well, so I guess there isn't a general principle. Some things should be collectively agreed on and approved by everyone in advance for added security. Other things shouldn't, right?

Daira: 00:35:55

But if there's a ZIP specifying it currently, and you want to change that, you want to say, okay, this is an over specification. We should relax the specification. Fine, that's a completely fine thing to argue for, but do that. Just don't do your own thing.

Zooko: 00: 36:12

Oh no, interesting. If there's currently a zip, I wonder how many zips there are currently, which in my opinion are specifying things that should not be specified by zips. Maybe I should submit a whole bunch of PRs, deleting a whole bunch of zips. I don't want to bother. I don't even know what they are. I don't. I'm not even reading the zips, except for the, except for the ZIP 234 and 233 and 235 that I'm responsible for. enough time to read all the zips

Daira: 00:36:43

Implementers should read zips, and if they think that something is an over specification, they should kind of tell ZIP editors about it.

Zooko: 00: 36:52

Well, for some things and not others. Like it's, well if its not all one thing

Daira: 00:36:58

Okay, we're quite careful not to use must or should, conformance requirements where we don't need to, because we're well aware of over specification as an issue. So, yeah, and clearly, you don't have to follow a specification. I mean, this is a demonstration of this. Someone didn't follow the specification, and we can't force them to. I think, for the success of Zcash and to fulfill our obligations to its users, we need to work collaboratively. And I'm currently not seeing the extent of it. I'm disappointed by some of the actions that are not collaborative, in my view.

Zooko: 00:38:02

With regard to dynamic fees, or what? Which actions do you mean, Daira?

Zooko: 00:38:14

Let's give Nathan a chance to talk.

Daira: 00:38:18

Okay, I'm not going to raise a whole other bunch of drama here. most of us know what issues I'm talking about.

Zooko: 00:38:27

One I named earlier, I'm guessing. Yes, but but Mark says that that's one of them. Yes, let's hear from Nate. Go ahead, Nate.

Nate: 00: 38:35

Yeah, well, I was just going to try to advocate for what I think is a reasonable middle ground between what I hear from Zooko and Daira. On one end, as Daira acknowledged, we can't expect people to always follow specs, especially as the ecosystem grows, you know, there's going to be teams implementing stuff who have no guarantee if they're going to even know about Zips or read them. But on the other hand, they serve a purpose. There's a purpose where they are absolutely necessary, right? For making sure that we understand critical consensus issues, but then there's this middle ground, such as how you know, especially around wallets following conventions that are outside of Like hard, strict consensus, but are still quite important. Such as fee selection impacts privacy, on-chain privacy, and linkability. That's really important. It's a system level privacy issue that is sort of like a public good. It requires coordination to do well, and I feel like a simple middle ground is hey if you are implementing something and you know that it deviates from some existing zip. A minimum effort that's sort of polite and collaborative is just to let the ZIP authors know, like, "Hey, I'm doing this thing. I don't want to follow the zip. Just as a heads up, right? That's kind of a minimum ground. That was my main point

Nate: 00:40:36

It could be more collaborative to like try to update the ZIP or explain what's different, etc. But you know that does take some effort, so I can see it going either way in terms of collaboration. But it seems like an easy ask that a minimum bar is like, hey, I noticed there's a zip. I don't think I'm following it, and I have some rationale. Just heads up, right? That feels like a. Does that seem good? Because the reason I'm suggesting is that it lets the people, the ZIP owners, know something is up. It lets the implementer not block much on anything. It's just an announcement, so it's sort of trying to give each side something that they want, and then negotiating whether to do like tighter or looser coordination. It can be kind of a case by case thing, but this is just like a minimum polite bar to propose. Okay, so so there's

Daira: 00:41:49

There's another kind of category of things that we need to consider here, which is security analysis. So it would be a hopeless task to try and keep any security analysis of the protocol up to date, if everyone is just doing their own thing, it's too complicated already. the The protocol is too complicated, and part of that is because we've been extremely tardy on removing things that needed to be removed and there are a whole bunch of simplifications that could be made if we were just kind of more willing to. If we took security more seriously in terms of reducing complexity as a prerequisite for security, because I mean we're not going to be able to formalize everything. We formalized balance for the Ironwood pool with some caveats, but yeah, in order to have good confidence about the security of the protocol as a whole, it has to be not quite so much of a moving target, so that's one thing. The other thing is consistency between specifications. So if we have people implementing things without even trying to update specs, then beyond a certain point, you can no longer rely on the specs, and we've seen the consequences of that for internet protocols. Basically, every implementation has to have a bunch of workarounds to stop it from breaking when it sees when it talks to other implementations, and it's terrible. It objectively results in a ton of security bugs, and it makes everyone's life harder. And we should not do that. We consciously did not do that. some of the things that people are objecting to as overspecifications were intentional choices, just to simplify the analysis and to simplify kind of interoperability, but yeah, I'll get off my happy horse now. But it's important.

Alex: 00:44:54

Go ahead, Zooko. lot of hands raised. Let's do it

Zooko: 00: 44:57

Okay, real quick, I want to do a mea culpa and also give information that reflects on Alfredo's question about the ZIP process, and also maybe you can use this information to work with us on dynamic fees going forward. But what I want you to know is that it was a very explicit decision by me, where previously when working on dynamic fees, I've been telling Mark, oh, we got to get like a ZIP and get everyone to agree on the new dynamic fees process, and it's going to require this sort of like education and persuasion effort, and posts on the forum, and arguing against alternatives, blah blah blah blah blah. And then one day at ZCon, no, at Zcash Dev Summit, I was having dinner with Pili, and I was explaining to Pili, yeah, we really want to do this dynamic fees thing, and she was like, "Oh, that sounds like it's gonna be complicated to get everyone to agree to a thing. I was like, "Yeah, and I was like, "You know what? We don't have to get everyone to agree to a thing. Just gonna go talk to the wallets. Any ones that agree with us, they can do it. We'll make progress. Everyone will learn. This is gonna be awesome. So I went back home and I told Mark, forget it. We're not going to try to convince anyone of anything other than wallets, because that's much easier, much faster progress. Don't waste everyone's time. Much less miserable.

Daira: 00:46:10

Okay, please just tell. Please just tell the core protocol engineers.

Zooko: 00:46:14

I really like Nate's middle ground. Nate's middle ground was when you do that, let people know what you're doing. That's a great idea. I should have done that.

Daira: 00:46:23

Yeah, because it seems as though kind of you are setting a straw man in your mind about how hard it is to change things, and it's not hard enough to change things.

Zooko: 00:46:31

Oh, Daira, do not start with me. Not only 100 times in the past, but also with dynamic fees specifically before we made that Change, but anyway, get off my hobby horse now.

Alex: 00: 46:46

Go ahead, Nate. Okay,

Nate: 00:46:49

So the next thing is, Daira, I heard your rationale for the importance of having a working ZIP process that we are proactively coordinating on, and I agree with a lot of the benefits. And I just want to name the drawbacks and point out that it's always going to be a trade-off decision that's being made by multiple teams collaborating. I also think the trade-off shifts with scale, like the number of, like the size of the ecosystem, number of implementers. So, and I mean, I think these are probably obvious, but I think it's worth calling them out. So, one drawback is there are likely to be more and more teams building stuff for the ecosystem that won't know about zips. So we just have to anticipate

Daira: 00:47:55

You can't build things for Zcash without knowing about zips. Period.

Nate: 00:47:58

And that's not true. Anyone can just whip up—ask a bot—and implement a random thing, connect to mainnet, and start speaking the protocol. That's just how the internet works. There are a lot of them live right now and so I mean, just as an example, just imagine trying to get Bitcoin wallet implementers to follow a standard consistently and uniformly across the ecosystem. It's just impossible. What I'm saying is, right now we have a solid track record of being much more like safe and considerate and careful with the stewardship of Zcash, and because we have this development community, and I'm just saying, maintaining that is a good goal, and it will be challenged ,the larger and larger the community gets. That's just what I'm saying. So I know

Daira: 00:49:05

I know that.

Nate: 00: 49:05

I agree. The other thing is that the other piece on my mind. Well, I mean, I know we don't like it, but if we really care about safety in practice, we have to anticipate it and figure out.

Daira: 00:49:26

We have to push back. Actually, we we have to not just roll over. Okay, and this is part of what this conversation is.

Nate: 00:49:36

I understand that, and also what I'm saying here is about people who aren't in these conversations. I totally agree. People in these conversations-it's a totally different story, right? Because we're talking. We should at least, you know.

Daira: 00:49:51

But the concrete example was kind of Dave and Zooko and Pili. It sounds kind of like deciding to do something without telling anyone else.

Zooko: 00:50:08

Pili had nothing to do with that. That was me having a conversation with Pili, which caused me to realize when trying to explain it. Oh wait, I don't have to do that. But let me, while I have the floor, notice that we're Shielded Labs is doing something entirely. We're totally doing the ZIP process with NSM, and we're totally not doing the ZIP process with dynamic fees. Currently.

Nate: 00: 50:27

Can I reclaim the floor because I didn't see it, and I had a second thing. So, yeah, the first point was not about how we should collaborate. It was just that hey, we should all anticipate more and more there will be people experimenting, so and so forth that aren't connected to us.

Daira: 00:50:50

Thats not the problem I'm pushing back on. The problem I'm pushing back is people who are deeply connected. I

Nate: 00: 50:57

I understand that. What I mean by bringing that up, is that whatever process we are coordinating on, or collaborating on, has to include or anticipate that. So if we're writing a spec that's like, you know, hey, all wallets should treat fees this way because there's a privacy benefit that's a common good, and if you don't follow the spec, you're harming your users and making everything a little worse for others. Depending on how many users each wallet has, so therefore we advocate all wallets do this, and we have to anticipate wallets don't do that. Right, some of them, or new ones show up, or something. So, we have to be thinking at kind of both levels.

Daira: 00:51:48

Explaining that as part of the privacy implications

Mark: 00:51:54

Hold on, hold on. The the whole thing about like we're gonna do whatever we want and we don't need to tell anybody is all in the context of things that you can do within the protocol now, the reason why I made the ZIP 2000 level change for the marginal fee is because that is not quite consensus, but it does it does evict transactions, which has economic consequences, which is why I made that zip, and I thought that was well within the bounds of things that are consensus related, things that are policy related, kind of like Nate's tiers as he's describing, and I made the judgment call that the weight ratio cap, because it's a soft policy, because people can still overpay was not necessary, but that could potentially have been a bad judgment call on my part. But I don't I don't want it to. I think I think things are getting overstated here, regards how like how rogue we're going. We're not you know, and I also don't want dynamic fees to become the battleground for all of this. I think

Daira: 00: 53:03

I think we have

Mark: 00:53:04

A fun little project trying to do that is generally inclusive and not too harmful to any protocol. We just need to decide on specific parameter values, and it seems like these type of conversations kind of always come up in the context of my fun little project, and I just don't want it to become this thing, this contentious thing trying to do.

Daira: 00:53:29

I'm just looking at ZIP 401, which is what specifies this. Okay, and it has very thorough rationale, incredibly thorough rationale.

Nate: 00:53:41

Can i chime in with my second point that I didn't get to yet? That I want to because this one is more. So the first one was kind of obvious, but you know, when people are collaborating with us, that's good, and we also need to anticipate some people won't. but the other one is, I think there can be a lot of value in experimenting on mainnet when we have pretty high confidence that it's safe to do, at least compared to the status quo, in order to learn things that we can't anticipate by trying to specify things upfront, so that's why I think it is important and valuable to be able to say there's already this spec written up, but we're choosing to deviate from it because we believe or suspect maybe there's a different trade off that's important, and we want to learn about that And so, one way to do that is more tighter coordination or collaboration-would be to agree how to alter the spec to make space for the different experiments. Another way that's less coordination and seems still polite and collaborative, but it's a lower bar. Is just letting the current ZIP owners know, like, hey, we want to experiment with not doing this, and we want to deploy it to mainnet, and we think that's safe. I think it is helpful to have a conversation about safety, like a safety check-in could be good.

Daira: 00:55:20

There is already a forum for this, the the R&D Discord. Okay, but my point is precisely this kind of thing is what it's for, and it's not being used. Okay,

Nate: 00:55:32

Here's what I'm suggesting, and let me get really specific. It is that we have a new norm, because here's the problem that maybe some people get tripped up on. They think discussing standards means you have to figure out certain things upfront before implementing. And what I'm saying is, I see a lot of value in implementing something as long as everyone believes it's safe as an experiment on mainnet to learn from it, and so the one specific thing is adopt a norm that's a kind of thing to discuss in the Zcash R&D or ZIP meetings. Like, hey, we're going to do this experiment. We believe it's safe. We're plowing ahead. Does that seem like a good way to be more collaborative

daira: 00:56:28

That's what you previously described as the minimum requirement. I agree, it's a minimum requirement. Yeah, and I agree that there are some people who won't do it.

Daira: 00:56:40

But as well as that, what was I going to say? I mean, it's it's not even productive because, so doing it this way, just just going ahead and implementing something and deploying it on mainnet without talking to anyone, which has happened several times, it's creating drama that needn't have existed because you may have made a mistake, and it's very likely that you will have made a mistake because this is a complicated protocol, and there's information that is in people's heads about how other nodes behave and how other wallets behave that you should be taking into account. And if you go ahead on your own, then you won't be.

Zooko: 00:57:40

You said it's creating drama, but dynamic fees is not creating drama, right?

Daira: 00:57:43

Well, it just has. It just has right now in this call.

Nate: 00:57:49

I don't think this is a drama. I think this is really good for figuring out the risk

Mark: 00:57:57

Yeah, Dynamic fees is the inner Matryoshka doll of this outer drama that we're sort of—I push back on.

Zooko: 00:58:08

Just don't want dynamic fees to get tainted with a broad brush. There's a whole bunch of drama which has nothing to do with Mark, and let's not let's not say things that could allow listeners to think that Mark is responsible for any drama that he's not,

Daira: 00:58:21

I kept I kept my general points general and my specific points specific. You know how careful I am about these.

Alex: 00:58:30

Why don't we work towards wrapping up this conversation because we have a bunch of other stuff to get through. Super appreciate the conversation though, Nate.

Nate: 00: 58:42

One more collaboration technique protocol thing that I want to advocate, which is there is a heavy cost and delay when synchronizing across orgs. So I just want to advocate more of the style of like we post a thing, so like show up in Zcash R&D, say hey we're thinking about doing this experiment, not 'thinking about'—we're gonna do this experiment. Here's the contour of it, and we're not gonna wait for a response. You know, everyone being judicious about their assessment of safety.

Daira: 00:59:21

If you start with that, then you're basically saying that we're not going to take into account if someone has an objection that actually is a pretty good objection.

Nate: 00: 59:32

No we will take it into account. It's just that it won't be blocked on, so it will come up when it comes up, and then whoever is the proactive party should adjust their plans in flight for doing that if they want to be doing this higher velocity thing. That's what I'm proposing

Daira: 00:59:54

I do have to push back on something, which is that the idea that it takes longer if you kind of take the approach that I'm advocating, the more collaborative approach. So it will take much longer if you're proposing something that other people disagree with, and you haven't given them a heads up. That's the case that takes longer.

Nate: 01:00:24

So I'm saying the non-blocking heads up. I'm advocating for that. And just as a motivating example, somebody might have really important feedback and expertise, but they might have a huge backlog and a bunch of other urgent priorities, and they're not going to notice for weeks, right? And so, what do you do? That's the cross-org problem. Anyway, I'm just going to point out.

Daira: 01:00:49

I'm just going to point something out as well, which is that if we'd taken this approach with ZSAs, then we would have just totally ignored the coinholder vote and deployed them anyway. So I want the people who are kind of taking this approach to be careful what they wish for.

Nate: 01:01:08

Right. It doesn't work for everything like consensus. It's only some things. So it requires people, you know, using their judgment about which things are safe to plow ahead. Okay, I'm wrapping up. I'm done. I'm also late for school.

Alex: 01:01:24

Thank you all for that conversation. Obviously, very important, and we need to continue. So, thank you. Appreciate it. Okay, open announcements. Are there any news or announcements you'd like to share? Raise your hand, please.

Daira: 01:01:39

Oh, I was expecting that there'll be a section on formalization. There probably should be, because that's a major area of research.

Alex: 01:01:49

I am happy to add it. Just we can just do that for next time. But would you like to say something about that?

## Open Announcements 

Daira: 01:01:54

So just on the progress of the formalization, I'll just share my screen. Oh my! I don't know whether I can share my screen. Oh, I might be able to.

Alex: 01:02:06

You should be able to now. I just stopped sharing.

Daira: 01:02:10

Okay, is that screen sharing now? No. It says I'm sharing my entire screen, but it actually is. Okay. I can't see it. Anyway, so can someone share the Ironwood book, which is at well, if you go to GitHub.com/zcash/Ironwood,

Alex: 01:02:41

Is someone else able to do that? I'm not given the way I'm set up here.

Daira: 01:02:53

Oh, it's it's just GitHub.com/zcash/Ironwood. There we go. Oh, thanks. Yeah, that's it exactly. Yes, hang on, just so I can see this. So go to group hash indifferentiability at the bottom there. Yeah. So so this is a major kind of new strand of the formalization. So, as if you know the protocol in any detail, then we use a hash function that produces curve points, and those curve points have to have unknown discrete logarithms, and that's necessary for the security of both the high-level protocol and Halo 2. So that was kind of a missing piece in the formalization before, but this page goes through it in a lot of detail, and all of that is supported by Lean code. So this is kind of a test case for how I want the formalization to be presented, because it explains everything in kind of similar detail to the protocol spec, and kind of you can actually trace everything through to the to the theorems and make sure that yeah, it's it's actually proving what it says it's proving, and any gaps are explicitly called out. So if you go down to the bottom. Yeah. So it summarizes. Actually, it's the section just above that. Yeah. It summarizes exactly what is proved and what isn't proved in the formalization, and what things you have to trust based on looking at some math papers, because those things couldn't be proven using the constructions in Mathlib and so on. So, yeah, I want to kind of bring the other parts of the formalization up to a similar standard of explanation, so that people can actually check it without being faced with hundreds of thousands of lines of Lean code.

Alex: 01:05:43

Any questions for Daira on this? Cool. Anything else

Daira: 01:05:53

There's similar things. Yeah, things along a similar vein starting to come in there.

Nate: 01:06:08

This is tangential, but I, I, and some other Zcashers I know of want to learn lean, like the basics, and so I'm just announcing that, and it would be cool if there were like a learn lean study club or something.

Daira: 01:06:30

It was at one point, and then it kind of lapsed That's really cool. We could bring that back.

Nate: 01:06:37

I'll ask around about that and see if I can help revive it.

Daira: 01:06:43

Yeah, one thing to know is that we've been very heavily using AI, and so kind of it. It's important to know how to do it without AI. You want to be able to understand what it's doing, but I mean, I think a study group like that would be as much how not to let the AI get ahead of you, because it's it's quite difficult to do anything very substantial in lean without it.

Alex: 01:07:23

Oh, all right. Oh, are you talking, Nate? You're on mute.

Nate: 01:07:27

Sorry, I forgot my camera's on. Yeah, the one other piece about AI is basically, I think any study club these days is going to have to have like a portion of how to use AI for this thing, and also how to learn how to do it without AI. So, I think that's kind of implicit.

Daira: 01:07:45

Very much got it.

Alex: 01:07:48

Totally agree, Nate. Cool. All right. Any other comments or questions for Daira on this one? Awesome, Vivek. You want to stop sharing, and we'll get back on here. Does that look good? I can't see the screen for some reason. Yeah, those

Alex: 01:08:11

Awesome. Okay. Any other open announcements? Great. So open discussion. We've got Eric's grant application, constant-time hardening, and explicit timing semantics for Zcash cryptography presenting. Just got to get you promoted here. Val, can you promote Facundo, please?

## Constant-time hardening and explicit timing semantics for Zcash cryptography

Alex: 01:08:49

Yep, there you are. Good, Facundo. We can't hear you talking.

Facundo: 01:09:11

Can you hear me now?

Alex: 1:09:13

Yep. Now I can hear. Okay,

Facundo: 01:09:14

Great. Yeah, Zoom is always difficult for me. Sorry.

Facundo: 01:09:18

Hi everyone. My name is Facundo. I'm I work at Erys. We have been making some contributions to the zcash ecosystem, particularly to librustzcash. We have been tackling a few issues, and we are exploring how we could work together. So that's why we thought of this grant proposal. I will share in the chat the forum post so you can see. So the proposal is named constant-time hardening and explicit timing semantics for zcash Rust cryptography. I will like briefly explain the idea. The idea is going through the repository, the Zcash Rust repository, and look at the paths where sensitive data is being handled, and that need to be operated on in constant time to avoid information leakage and make them explicit through documentation in code comments and maybe through tests that can verify that it stays that way. So right now we have been reading some documentation and some issues in the repository, and we saw that maybe there are operations that need to be constant-time, but that they are implicit, which makes them prone to being broken unintentionally by some change in a refactor, and also we we find code that handles sensitive data in variable time, but that doesn't need fixing because it isn't reachable by an adversary because of where that part of the code is run, so we could make that explicit too. So that's like the the main idea. It's labeling constant-time usages so that it is clear in the code and trying to enforce it with tests. For that, we had to first define a threat model, and then use that to look around the code and see based on those criteria, identify all the usages of constant-time operations and labeling them and trying to write tests for them. And so, well, the the reason I'm bringing this here is to first find out if you see this work would be useful. We saw we had some chats in Discord a few months ago about this, but I wanted to revalidate this, and also because in case that we worked on this, we would need some help from the maintainers to define and validate the threat model we may have. We may have some questions that we should write to you, and then you answer. And also to validate PRs that we may have with the comments and the code, the tests and the documentation. So that's pretty much it. We wanted to know if you find this useful and if you could have some time. I think it shouldn't be much time. It should be just answering occasional questions and reviewing some short PRs.

Daira: 01:13:29

Yeah, I'm happy to spend that time. I think it is useful. So one thing is that there are some cases where we know that code works on private information. I'm thinking, for example, about the multiscalar multiplications in Halo 2 proving, where it's working on a secret witness, and the reason it uses a variable-time multiscalar multiplication is that you really need it for the performance. So if you tried, I don't know of a way to get comparable performance in constant-time. I mean, if we were only losing a small constant factor, then it would be totally worth moving to a constant-time implementation. But my understanding is that it's the performance loss is more significant than that. So I mean, it would be really nice if I don't know whether this fits within the scope of the grant. If there could be some research on how to close the gap between variable-time and constant-time algorithms in cases like that, because otherwise, yeah, you can document that. Yes, this is not constant-time, and maybe it should be. But if it was a conscious performance trade-off, then the code isn't going to change.

Facundo: 01:15:15

Yeah, but maybe we could just like leave the comment there, like making explicit that, okay, this is variable-time, and this is the reason and yeah that that's like the aim of the proposal like making explicit like all these decisions

Daira: 01:15:33

And I think there were other reasons why we thought that was okay in that particular case and for example the blinding means that you're not actually doing those multiscalar multiplications on the raw witness data. So, yeah, maybe it's even possible to prove that it's okay.

Alex: 01:15:57

Alfredo

Alfredo: 01:15:59

Yeah. Thanks for presenting that. I have a question. It seems that you are proposing to do this analysis in the librustzcash repository. I was wondering why that repository was picked, and we have a bunch of stuff in Rust. Do you think you will find the most useful stuff there, or any other reason for picking that one, thanks.

Facundo: 01:16:22

I mean, I think that the main reason is we had to choose some point to start because we are new to the ecosystem, and we saw that repo, and we saw that was used in many places, and we thought that it would be a good point to start and get a good look at the zcash ecosystem. Yeah.

Daira: 01:16:51

So in a lot of cases, the actual cryptography code is a dependency of librustzcash, but it's not in librustzcash itself. So I'm thinking like the the Pasta curves, right, the Orchard , and so on. So yeah, it would be incomplete if you just considered the librustzcash repo. You kind of have to consider its cryptographic dependencies.

Facundo: 01:17:35

Okay, so we could we could check if we could add other repositories to the proposal

Daira: 01:17:42

I think you you're not going to find the code that is actually relevant here if you just stick to librustzcash itself.

Facundo: 01:17:55

Okay, okay, we will do some more research on that then.

Alfredo: 01:18:00

Okay, thanks.

Facundo: 01:18:02

We chose that because as I said I I thought it would be a good starting point to to start from there and then go to others

Daira: 01:18:14

You should start from there in terms of looking at what the dependency graph actually is. Yeah, but but I think you'll find that a lot of the non constant-time code is not in librustzcash itself. Okay.

Alex: 01:18:32

Any other questions or comments for facundo? And I would suggest if you think of anything after the call, comment on the GitHub submission or on the forum, please. So,

Alex: 01:18:54

Yeah, awesome. Thank you for presenting. It's we always appreciate having potential grantees here. It's awesome. So, thank you.

Does anybody have anything?

Daira: 01:19:07

The proposal overall is a good idea.

Alex: 01:19:11

Cool. Thank you. Thank you for sharing that. Okay, open discussion. We've got 11 minutes. Is there a topic you'd like to raise for open discussion? Please raise your hands. Going once. We're all talked out today, huh? Cool. Thank you. Next Arborist call is on September 3, and yeah, thanks everybody for your participation and great conversation. Appreciate it. Thanks. Thanks for managing

Next Meeting Scheduled: 3rd September 2026

