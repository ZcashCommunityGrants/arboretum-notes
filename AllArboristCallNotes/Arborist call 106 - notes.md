## Arborist Call #106 Notes

Meeting Date/Time: 24 th july 2025, 15:00 UTC

Meeting Duration: 1 hr 30 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [zebra 2.4.0 zebra 2.4.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [Ecc, zcashd,core libraries](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates -[zcashd zingo labs](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-zcashd-deprecation-ecc-zf-zingo-labs-pacu) [Qedit, ZSA ](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit--zcash-shielded-assets)[NSM, shielded labs](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs--network-sustainability-mechanism)

Open Discussion [zebra, fork](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=uFz_5pzgRlQ&sttick=0)

Moderator: NATALIE

Notes: CHIDI OLISA

## Full Notes

## Welcome & Meeting Intro 

NATALIE  00:00:01  

We very much encourage people to get involved. So if you want to suggest a topic as well for discussion, for the arborist calls, the email is here. And here are some other ways to get involved. So we have the Zcash community grants, the research and development discord channel, and we also have some community forums. Yeah, so let's get started. So we'll start with the core stack update, and I believe Alfredo will be talking from the foundation about zebra you.

## Zebra Update 

NATALIE:00:1:05  

Alfredo, if you are speaking, you are muted. Can you hear me? Great.

ALFREDO:00:1:22  

Oh, sorry, I joined in late. So yeah, I guess it's my turn for the zebra updates, right?

NATALIE: 00: 1:29  

Yeah, no worries. Okay,

ALFREDO: 00:1:35  

so in zebra, we launched the release 2. 4.0, and its release contained a database format upgrade in an attempt to make it the most efficient and less destructive for the node operators. We identified a bug.The bug was not discovered  by our test framework, but by a ticket from Shambo about the RPC , we found the root cause of that problem. We made a fix, and we push it 2.4.1 ,and we shank the 2.4.0 release. We provided instruction on how to proceed if your database was corrupted by the use of 2.4.0 node.We while we were testing 2.41 we found some issues, and this time, we're not totally sure if we're going to to make 2.4.2 , or if 2.4.1, which is the release we made with the fix, will just make it so, we will confirm that probably Today. Yeah, we're sorry about that inconvenience. We had a hard time with the last release. We are having some CI issues as well. We have kind of a bottleneck in the releases, and we are trying to improve the process to be able to fix faster and improve the test framework to find these kind of bugs before they happen. So apart from that, we removed some crates from Zebra, but we introduced it a while ago when the stack we are working on right now for zcash D deprecation was not clear. So we had some scanning functionalities from one of the stuff that we ended up not using. So we removed that zebra scan grade, and there was a related grade, zebra gRPC, which was an entry point from that that was removed as well. Then we are trying to use zcash primitives to build Coinbase transactions using the transaction builder, and we are also trying to use other parts of zcash primitives as kind of the duplicate code we have in zebra, and just use that. We are working on missing reg text functionality specifically to support the QI framework testing. We have a PR open for implementing NU 6.1 , this is under review right now. We also have different pull requests open in different parts of the stack, like Librustzcash, solid and other repositories. We're also merging external contributor PRs and things that are showing up in zebra and trying to respond to the tickets people have been opening. That's pretty much it, I guess the main stuff,any question, please let me know.

NATALIE: 00:5:02  

Thank you. Alfredo. Are there any questions? No, okay, great, we'll move on. Who's going to be speaking from ecc? Do we have anyone who's going to talk today? If not, that's fine.

## ECC Update 

DAIRA EMMA: 00:5:33  

Actually, sorry. Can you hear me now? Yes, yeah, I was first muted and hardware muted. Okay, so I think the last arborist call was on the 10th which means that we haven't yet reported on the zEC summit, the work that we did in the hacker house, the core and Wallet team for ECC, so there's potentially a lot to talk about. I'm not sure I can remember all of it, but let's see. We had some discussions about Tachyon, which is the new scalability architecture. The research on that being done by Shonda. So the core team kind of explained that to the Wallet team, and we had some discussions about how to kind of change the payment flows, or what payment flows were possible for the new architecture. Basically there will be higher emphasis on payment requests rather than kind of sending via the broadcast channels the blockchain. See what else. So at the summit, we fleshed out a roadmap, there's no blog post yet. The Q3 roadmap for ECC has been reviewed, but I don't know whether I can kind of give you the final version yet,but there will be a blog post coming out soon about that. I guess I can give you some summary about what will be in it. Just bear with me a second. Oh, okay, so make sure I'm on the right tab.Yep. So from the point of view of core, we're planning for a potential NU 6.1 mainnet activation window in October or November. Probably October. It's likely to be the end of the current lockbox distribution stream.There's a lot of work to do on NU 7 and that will be all fleshed out in the schedule. We are currently working on the specifications of frost, key derivation and quantum resilience for orchards, the details haven't been flesh out yet, but I hope there will be an audit of quantum resilience and frost key derivation,

See what else. So we've been doing a lot of work on p2sh support, because that is needed both for ZcashD deprecation and for  NU 6.1 

ZOKOO:00:09:19  

sorry, what is p2SH

DAIRA EMMA:00:09:23  

sorry. P2SH, so mainly, P2SH, multisig, that's the transparent multisig. So the that's as well as frost. But for Nu, 6.1 the disbursement from the lockbox will be to a P2SH Multisig address. Now we see Zcash D supports that, but we want that support in zallet  and Keystone. and we will need a keystone firmware update to support that. We are planning to propose that transparent information be put into compact blocks, which should improve privacy . Obviously, the transparent protocol can't be pretty private, but it will avoid leaking  transactions. Okay, there's a schedule for ZcashD releases. oh, I haven't said anything about zashi, but so is this ECC in general, this report, or is it including zashi? Is anyone from the ECC Wallet team here? I guess the scope of what it says on the slide there is just core team. I'll just say that there will be a kind of a roadmap forzashi as well.And in the last two weeks, let's see have been, yeah, we're working onbasically those priorities. So a lot of work on zcash script, which is necessary for p2sh support.Let's see, a huge number of PRs in Librustzcash have been  reviewed and we have been working on the quantum resilience spec. And, yeah, there's a technical change aspect, to add a new key, qSk. I won't get into the details, but that will be helpful for hardware wallets in the post quantum era. And yes, some recapturing of how Tor is handled for zashi, so not everyone can use Tor. There are countries which it could be sort of a risk to users to use Tor, and so we'll be making the opt in opt outfor that more robust in zashi. And let's see. That will be really soon. That's about it.

NATALIE:00:13:42  

Great. Thank you very much. Yeah, a couple of questions. Make them.

DAIRA EMMA: 00:13:47  

Let me have a look at the questions in the chat. I'll read them up.

Is there a plan to publish user metrics, user interview summaries for zashi?

I know we have that information,and it's kind of published internally, in all hands meetings. I can't speak for the actual team about whether it's a plan to publish that. Oh, apparently Tatiana is on that. So, yes, light client working group, sorry, what was the question there?

ZOOKO: 00:14:34  

Venue for light wallet updates?

DAIRA EMMA: 00:14:38  

Oh, okay, that's not my wheelhouse. So any updates on the orchard reviews? So reviewing the halo circuit changes is next on my to do list. And, yeah, I think that's everything

NATALIE: 00:14:58  

great. We have some questions, it seems so I think it was Alfredo, Pacu and Zoko. So Alfred, did you want to?

ALFREDO: 00:15:04  

Yeah, so you mentioned the lock box addresses will be of this new type that we support. So I was wondering if you know, so right now, in the zebra PR and I guess in the zcashd PR as well. For NU 6.1 the address list is empty. And I was wondering if you think we are going to need to do anything to support this new type of address in the node side.

DAIRA EMMA: 00:15:33  

So it only features p2sh,  so I don't think so. I think that's mainly wallet thing, and  

session will be accepted because the hex code there is money, then that's it. Okay.

So obviously you can spend. So when you disperse to a p2sh multisig, that transaction is then spending from that multisig address is just a normal transaction. There's nothing special about it. There's no consensus for that. And as far as I understand, the PR that you're talking about is the consensus changes for the lockbox disbursement itself, the one time specimen. And I think I haven't reviewed it, and it's sort of close to the top of my list to review, but I think that includes all of the consensus changes needed. Thanks. Next question.

PACU: 00:16:49  

I'm next Okay.My question was around the change in the  law format to include transparent info. Yeah, do you have that fleshed out? When would be an appropriate moment to bring other teams to the discussion in terms of development scope and mostly Zaino, since it's going to be replacing lightwallet D, and probably needs scope at that work. And

DAIRA EMMA: 00:17:32  

yes, I would imagine that should be discussed in the light client wallet meeting, which I think is this one today. Yeah, yeah, there's one today, so I can do that. Okay,

DAIRA EMMA: 00:17:53  

So to answer the question about whether it's already the spec has already been fleshed out. The answer is, No, I think it's relatively straightforward. It's just defining the protocol format basically.

ZOOKO: 00:18:20  

Where can I track that work on the network sustainability mechanism spec,

DAIRA EMMA: 00:18:27  

there's a PR for it. I think it's the most recent PR in zcash steps. Just track that. I willl put it in the chat. Thanks.

NATALIE: 00;18:39  

Great. Are there any other questions from anyone? No, great. Thank you. Daira emma. 

Zingo labs, anyone?

## Core stack updates zingolabs- zaino

ZA: 00:18:56  

Yeah, so we have done a significant refactor that paid for the support feature  to represent the single chain with non-finalizing, finalized states. So we'll do cross links compatible releases, and we anticipate having the zaino  light wallet proxy in production. We have a target, an optimistic target, of two weeks for that.

NATALIE: 00:19:39  

Thank you. Any questions for anyone?

DAIRA EMMA: 00:19:44  

I didn't hear the first part of what you said.

ZA: 00:19:52  

So we've reworked our representations of chain state internally such that we have a non finalized state and finalized state first class objects in Zaino so that when the consensus algorithm migrates to cross link, it will be compatible and future proof and offer ergonomic interfaces to that consensus algorithm. I am confident that Arlo has done significant work on adding TX outputs to combat blocks. I think he may have completed uh, most of that work, but I don't have insight into the specifics to earlier questions.

DAIRA EMMA: 00:20:49  

Okay, so we should avoid duplicating work. Let's discuss that in the client working group meeting. Yeah, yeah. Great. Thank you.

NATALIE: 00:21:03  

Next is the Zcash D deprecation update. Who would like to, I see pacu 

## Research & Implementation Updates, ZcashD Deprecation, ECC, ZF, Zingo labs, Pacu

PACU: 00:21:19  

so in terms of zcashD deprecation,I think that this week I'm going to be working and annoying some people,because I want to kind of start building some sort of like visibility tool in terms of how things are going, not specifically bound to dates or anything. But it has been brought to my attention that some teams that needed to lay out their plans for the next months or quarters didn't have, like, good visibility on how things were marching. And so I would like to work and help to improve that, not to bound us to any any targets or weeks or anything, but just to improve, like, overall visibility of the progress and all the work that we're we're doing, that it's kind of going under the radar and and that, not only, like, makes communication more cumbersome, but also kind of undermines all the work that is being done. It's good to have it visible. So I'm trying to figure out what's the best tool, how to make it simple and not a job on its own, like, not have the tool be a work like, let the tool work for us. So I'll be contacting leads of every team to try to figure out what, what's the, what's their tooling and and how we can make that happen. That's kind of the update here, yeah, and, yeah. I don't know if anyone from any team wants to bring up something on this slot that kind of. It's a placeholder for the Thursday's meetings. If not, we can keep going.

NATALIE: 00:23:29  

Great. Thank you. Does anyone want to add anything or ask any questions?

DAIRA EMMA: 00:23:36  

So did I give sufficient detail in my report about zcashD deprecation?That I think I understated how much work has been done on zallet  recently that's coming along really nicely. And a lot of the kind of sharp edges that would prevent you from using it as a wallet, have  been shaved off.  

So I think the alpha of that is alpha or beta, alpha is expected soon, real soon.really, really soon.

PACU: 00:24:20  

Cool. I'll get in touch to know, so you tell me,  how can I, like, be useful on, on the alpha phase and all that, thank you

NATE: 00:24:43  

So this was in the context of Zcash D deprecation, which I think is sort of the critical step, or it's on the critical path for a lot of things, but that sort of visibility tool would be great just generally for across all orgs. So just wanted to throw that in.

PACU: 00:25:09  

I agree, yeah, I really like the Shielded Labs roadmap. Also, I think that the blinking.is really cool. The aesthetics are nice.But, yeah, something like that.Condensing all the things that are in flight would be good to have.

NATALIE: 00:25:39  

Great. Thank you. Go to the next slide. So research and implementation updates. Anyone from qedit Want to talk?

## Research & Implementation Updates, Qedit- Zcash shielded assets

VIVEK: 00:25:52  

Yeah hi,I'll be giving the update this month. And yeah, we've had some good progress as well on our front. So let's start with, I guess, the zips. We had some design changes, small design changes to the zips. Like, there was an encoding change that allows for, like, easier versioning of the issuance, authorization signatures and like, as a result of that, we also needed some clarifying of the naming of the various items to account for, like, the possible ambiguities that could arise due to these, this versioning in future. So we made like, the initial pull request for that, and I think these editors are putting finishing touches to that. And, yeah, so that, I guess soon we should have, like, some freeze in the design again. So we've made these design changes in the Python reference implementation as well. There's some small cleanup that's still happening, and then we will submit an upstream PR as well with all of these ZSA updates to the test vectors. I think we had one submitted sometime last year, and that's like the test vectors have also been like the upstream has also moved ahead, and some changes have happened there. So we will put a new PR that one's a bit out of date. So yeah, the design changes that I mentioned, we've been working on making those changes through the stack. So we are on the orchard changes now, and like Librustzcash and then Zebra is pending. So yeah, we'll be moving up the stack as we go ahead. Like, speaking of orchard, we've also been making some code simplifications, both within the circuit and outside it, and we've been reducing the diff with the upstream where possible. So we are also soon likely to be getting further feedback from ECC on some implementation discussions that we have been talking with them about, so, yeah, we are looking forward to that. On the Librustzcash front, there's been some work for a while that we've been doing now catching up to upstream, because we had the branch out a little while behind, and we had to catch up. And I think the pczt editions had various implications for the ZSA code, so that's largely solved now, I think, and we will be having discussions again with ECC soon on how these changes look for zsas And yeah, we will be taking it from there. There's a halo 2, PR that's also pending for merge or review by the ECC, yeah, that's for those libraries. On the zebra side, we also have an upstream PR that's open. We got a review from Arya from the Zcash foundation. I think we've made the changes internally at present, and we are discussing with the ZF on how to bring that into upstream properly. Yeah, the top of the stack for us is the transaction tool that we have the repository. So we've been also working on that, making some generalizations, and we've also improved the CI automation. So yeah, that should lead to, like, easier and improve deployment of the transaction tool. So that's for the essays in NU7. Beyond that, we had and gone from a team at the zec summit a few weeks back, and so I think there was some nice discussion we had there as well about the transaction controls and the post quantum resilience and things like that. So yeah, that's my update for now. Any questions, let me know? Yeah,

DAIRA EMMA: 00:30:00  

oh, I'm sorry. I said earlier that we'd made updates to the NSM back, sorry. It wasn't NSM, we have recently, as I think you mentioned, made updates to the way issuance keys are done, and also flesh out some of the spec for transparent sorry for zcash versioning in NU 7, but I don't think there have been any changes to NSM. Go for that mistake. I

NATALIE: 00:30:45  

Great. Thank you. Any questions? No, okay,okay, shielded labs,

## Research & Implementation Updates  shielded labs , network sustainability mechanism

JASON MCGEE: 00:30:55  

yeah, so Mariusz, is going to give the update today. He's been working with ZF and  ECC on the open prs.

MARIUSZ: 00:31:05  

Yeah, hi. So not much update from my side since the previous time, but I have a question, because I  saw that there was a new PR created, like a top on our PR for librustzcash.

DAIRA EMMA: 00:31:33  

Sorry I was muted. That may actually have been what I was thinking of. Let me just check that. What's your question about the PR? Yeah,

MARUSZ: 00:31:45  

so there was a PR created at top of our PR for the librustzcash the 1879, that's right.

DAIRA EMMA: 00;32:03  

So let's see. I believe so I'm not sure we were able to push to your PR, because it's a cross organization push. So that's why we opened this PR, but I think it just builds on yours. Yes, it does. So it's, it's not a relay or anything. It's just additional  commit. So yes, you should basically work from that PR I believe now instead of 1567,so it's up to date with current main

MARIUSZ: 00;32:55  

so I don't know, should I answer the comments, or The PR creator should answer them? Or,

DAIRA EMMA: 00:33:02  

let me just have a look at the comments. sorry, I have all of the files viewed so I can't see the comments very easily. Let me just look on the other view

MARIUSZ: 00;33:21  

there are some suggestions,

DAIRA EMMA: 00:33:26  
So yes, I just reviewed it and all of those, I think we will just accept those suggestions, so I don't think you need to do any extra work for that. it's just going through our review process.

MARIUSZ: 00:33:45  

Okay, thank you.

JASON MCGEE: 00:33:47  

Okay, so then what's the status of the other open PR, which is a block or the Zcash test vectors? I was told a week or so ago  that was merged.

DAIRA EMMA: 00:34:41  

okay, I'll just approve that to run workflows.

JASON MACGEE: 00;34:48  

Yeah, I think there was some talk about giving mark from shielded labs, or maybe arya from the Zcash Foundation, merging, right, so that they could help

DAIRA EMMA: 00:35:00  

Yeah, I think that just slips through the cracks, but that was intended, I believe, so I will have a to do,  to follow that up.

JASON MACGEE: 00:35:10  

Thank you. And then Mariusz once so you're squared away on librustzcash. So how much work do you need to do to get zip 233, merged. Should it be pretty quick. Now, if we're just waiting on the Zcash test factors, and we know what we need to do for librustzcash,

MARIUSZ: 00:35:31  

I also have to take call for sure. I will need to rebase the PR and it's hard for me to say now I would have to take a look closely at the PR for sure, there will be some rebasing needed.

JASON MCGEE: 00:35:49  

all right. We can talk. Okay, we can talk after this call yeah

DAIRA EMMA: 00:35:53  

so that was Arya and who else to be at its collaborators 

JASON MCGEE 00:35:58  

Mark Henderson from shielded labs, okay,

DAIRA EMMA: 00:36:05  

yeah, I'm sure we can do that. Thank you.

NATALIE: 00:36:15  

Great. Thank you. Does anyone else want to ask anything on shielded labs? No, yeah. Okay, so shielded labs and ECC, this is about crosslink. Anything to say about this.

## Research & Implementation Updates, shielded labs and Ecc, crosslink- trailing finality layer

NATE: 00:36:35  

I can share, So one thing is,I attended the ECC Summit, and so I gave a short presentation of the current status there, and got some feedback. In particular, we had been sorting through a design issue where we wanted to have signatures on chain. And there's this funny thing with BFT protocols, where you know you're voting on BFT blocks, and so those signatures can't be in the block, so if you want signatures on the chain, you have to put them maybe in a later block. And so there's this weird staggering thing, and there's various approaches to it, and Daira shared that she has already created one design for that in the trial and finality layer docs. Since then, we have been looking into that more and considering the motivations for having signatures on the chain in the first place. So one of the primary motivations is based on the idea that we want to reward finalizers based on their participation. So the idea would be that finalizers that are more available get rewarded more, and those that aren't participating lose out on rewards. But we have begun discussing, what if that is not the case, because there's always trade offs there where, yeah, there's a set of trade offs and security issues, and so we've sort of been discussing, yeah, scalability issues. We've we've been investigating that part of the design more so that's sort of on the design front, and then on the implementation front, we're still working on creating testing framework with test vectors that can, like replay both BFT blocks and work blocks, so that we can explore or like test different state transitions in the hybrid zebra node when blocks of the two types are arriving in different orders. So that's our status. So and zooming out, this is all in the middle of what we're calling milestone three. And the goal of milestone three is to in the implementation change proof of work to point in the proof of work blocks to the BFT blocks, and so that will implement the finality logic, but it won't include any of the proof of stake layer, so there's no the roster is hard coded in a config file, and there's no rewards or slashing or anything like that, and no changes to transaction formats. That's the implementation goal. But meanwhile, the design goal for milestone three is to flesh out a full design for all of the proof of stake stuff. So that's where we're at. Any questions?

ZOOKO: 00:40:07  

milestone four or milestone three? 

NATE: 00:40:32

Well, milestone four is about implementing all of the proof of stake design, if that makes sense. So that one will be pretty meaty, because it involves changing transaction formats, making tools that can delegate and tools that allow finalizers to become candidates, to get on the roster, and things like that. So that's the real meaty one.

DAIRA EMMA: 00:40:44  

So something else is that I have started work on a lean formalization of the cross link 2 protocol that's on the TFL book repo. I will  put the URL in the chat just a second so basically the progress on that is that i have  formalized the assumptions that go into the security proof. In other words, the assumptions about the proof of work chain and the BFT chain, the crosslink 2 protocol itself, is not done yet, but I think we have a sound basis on which to do more work in that formalization.

NATE: 00:41:45  

just real quick on that. So I need to review the assumptions for the security argument, and I'm wondering if any of the proof of stake layer impacts it. So for example, this issue with signatures, whether or not they're on the chain. How do those match to the assumptions?

DAIRA EMMA: 00:42:11  

So those are not involved in the assumptions directly, that might be involved in when I kind of flesh out the details for crosslink 2. Or it could be that the formalization is kind of more abstract than that, and this is up those details depends on  how much detail I choose to put into it because obviously the  crosslink as it's described in the TFL book, is parameterized by the of the modified best chain and the BFT protocols. And so we're kind of treating those as black boxes. And it depends where we put the abstraction boundary for the BFT protocol, whether that detail about signatures is included in the formalization.

NATE: 00:43:15  

Okay, then we need to coordinate a bit more on this design issue, because we reviewed your design, but we wanted to explore alternatives.

DAIRA EMMA: 00:43:27  

Okay, yeah, it sounds as though it would be a good idea to have a meeting about that.

NATE: 00:43:32  

Okay, yeah, let's do it cool.,

ZOOKO: 00:43:37  

Other related information, which is that the folks from informal reached out to me like yesterday or so because, you know, informal, they're the makers of Malachite, which we're using for the BFT code. They're also, they also do this tool called Quint, Q, U, I N, T, and here I've reached the limit of my understanding, there's Quint, there's tla plus that Alfredo submitted a suggestion, and even a like first crack at, I think, on our GitHub, and there's lean. And I don't know how these things relate to each other, but I wanted you to know that there is an initial first crack at using quint to formalize a different part of crosslink somewhere in our GitHub, or maybe I need to forward it to someone from my signal. And maybe that could be part of the meeting. Because,

DAIRA EMMA: 00:44:33  

yeah, let's talk about that.My understanding is that TLA plus is kind of quite focused on doing model checking. You can also do model checking in Lean. There's a library for that, my impression, I haven't dug into the details enough to be sure about this, is that I know lean forward is expressive enough to do the security proofs that I wanted to do. I don't know what the TLA plus is. So because TLA plus is just kind of focused on model tracking, so I don't know that. 


ZOOKO: 00:45:28  

maybe we should bring everyone who, Maybe we should have a meeting bring everyone who knows and cares about this stuff and links to all the different versions of things, and it's both about the checking and formalization tools, and also this question that Nate was pointing at about how to implement this one part of the protocol. Yeah,

DAIRA EMMA: 00:45:54  

Quint by the way, is kind of a front end to TLA plus. So there are at least two front ends. But yeah,

ALFREDO: 00:46:05  

That's correct. I've seen that in my experience, the TLA plus is kind of better when you do kind of synchronous stuff, like things going on at the same time and stuff like that. I think that's kind of the strongerTLA plus capabilities, the distributed stuff. Yeah, I am pretty much in as well. We are more than happy to check out what you're doing, daira emma, and more than happy to have a meeting to discuss this kind of thing, yeah, as well.

DAIRA EMMA: 00:46:42  

the level that the existing pencil and paper security proofs sort of define that, you don't need to do model checking for them, and you don't need to get into the detail of what messages are sent in the protocols, because  you have these sort of more high level properties of the protocols that you're able to use in proof. Now, obviously that is only checking a part of what you need to check, but it's an important part, and it's the part where you could make mistakes. So that's why I want those proofs.

ALFREDO: 00:47:26  

Yeah, they all check apart.The real thing is the implementation. So,but yeah, yeah I see right now, It's kind of different people doing different stuff, and maybe join that up to Yeah. I

DAIRA EMMA: 00:47:43  

There are advantages of that as well, because kind of if I do everything with the security analysis, then I have blind spots, and so other people might find things that I miss.

NATE: 00:47:57  

yep, so I will work to set up a meeting about that. And anyone who hears this, let me know if you want to be invited, but I assume Alfredo, you would like to come and Daira and then we can invite the folks from informal

DAIRA EMMA: 00:48:20  

I don't want to volunteer for Str4d, but I suspect that Str4d might want to come because, I mean, it is Nate, me and Strad who are the designers of crosslink too. Okay, sorry, Strad, if I volunteered you, you can always refuse.

NATALIE: 00:48:42  

Great. Thank you. Are there any other questions? No, great,  Is another slide for discussions after this, let's just have announcements and discussions because, well, I could just, oh yes, there's discussion. So first of all, are there any announcements from anyone? Okay, so discussions, I know that. So Jason would like to discuss the changes to the protocol upgrade process. Do you want to pull away?

## Open Discussion 

JASON MCGEE: 00:49:21  

So Josh had a forum post the other day where he detailed a proposal for how the network upgrade process should work after NU 7 basically each organization would maintain a fork of zebra and be responsible for the full development integration life cycle of the changes that they're proposing. So the reason I asked to add it to the agenda is because I wanted to hear feedback from the ZF team and sort of understand all angles before publicly stating the shielded labs position. I see that Conrado and Arya have both provided some thoughtful feedback, and I'm curious to see ECC response. But I also think it would be helpful to walk through like a real world example or case study. It kind of feels like the forum discussion might not be the best place for this conversation, and maybe we can do some of it on the arborist call, but it may require more time than that. So, you know, maybe if it's not enough time, we can have a separate standalone call on it, or maybe we're all busy, and there's no real urgency around citing this now, and the conversation will just sort of naturally occur over the next few months

DAIRA EMMA: 00:50:27  

I'm just catching up on the forum discussions. Can we get a link to the forum discussion that's

JASON MCGEE: 00:50:41  

Can we get a link to the forum discussion that's

DAIRA EMMA: 00:50:52  

Yep. Two of us linked up. Thank you.


ALFREDO: 00:51:03  

Yeah. So I think that the current progress is problematic, and sometimes put a lot of stuff on top of certain organizations. E.g review the code and introduce code and stuff like that. In the other hand, I think that the zcashd deprecation up to a NU 7 it's an older commitment than all the organizations kind of agreed on, and I think we should do that with the current repositories and the current staff, even if it is a painful process before trying to switch into something else. Yeah, that's my two cents about it.

DAIRA EMMA: 00:52:05  

so just responding to kind of the overhead issue.So I'd imagine each organization would just be maintaining their own patches and then sort of pulling or rebasing from upstream. So that also answers dismad  point on the forum, he said, What they said is the risk that centralized exchanges won't be willing to choose which version to use. There will still be an upstream. It's just that upstream will presumably be the version that CEXs will be using, and mining clause and so on. It's just that people wanting to propose a change would be maintaining their own version that could be run on a testnet,  those versions presumably would not be compatible with mainnet, because, by definition, They define consensus changes that our consensus changes are usually incompatible in the sense that they will immediately cause their chain divergence. There's a term for that. I can't remember what it is, so I wouldn't imagine there'd be any confusion about which version an exchange would use for a mining pool on mainnet. You can sort of define a version that you're proposing that the whole network should fork to, but that is a different thing than proposing a version that's implementing a particular feature I will yield to other people now.

NATALIE: 00:54:11  
Nate, is this about what we were just talking about, or is this a different topic?

NATE: 00:54:17  

It's about what we're talking about yeah, it was just that one thing I wanted to share from our experience is, when we first started setting up our fork of zebra, we wanted to port over all of the TI infrastructure on the theory  that it would be really good to ensure we're not introducing any regressions. And we found it was really difficult to set up and kind of expensive. And so we decided instead, we would kind of reset the CI and do simpler CI, just for our changes. And then occasionally, like, I'm not sure if we followed up on this, but occasionally, like, maybe every milestone, see if we can submit a draft PR upstream to run all of it CI, just to get that feedback earlier than then when we're finished. So that might be a topic we would need to collaborate on, is how to do good testing and CI if we have multiple forks.



DAIRA EMMA: 00:55:36  

So maybe I'm missing something. But why is it not possible to have an upstream branch that just always follows the fork, that could even be automatically kept up to date with a branch from the fork

NATE: 00:55:54  

Yes, that might be possible, but we thought, I assume it might be costly to run the full CI, so we only want to do it occasionally. If that makes sense, I could be wrong.

DAIRA EMMA: 00:56:15  

So ECC has accepted the cost of running CI on branches for PRs, even if they are long running branches. If we find that that's too expensive, then we might change the policy. But, but as of now, ci runs on PRs, and that's fine,

NATE: 00:56:42  

but I'm talking about zebra in particular, like zebra CI.

ALFREDO: 00:56:50  

There is definitely a problem in zebra CI to do that, what you're trying to do specifically, we are kind of discussing how to solve it. So one thing you can do is we run the full CI. If the branch, it is inside the zcash Foundation organization, so few if we give you like the ability to create branches there you can run the full CI, but right now you cannot run the full CI from the external contributor. And our issue is what you just described, which is, if you want to run your own CI, it's too complicated and too expensive to do so, so yeah, we might want to have your comments about what exactly the problems you found, and we can consider adding that down with this kind of issues that we would like to fix the future.

NATE: 00:57:49  

And also this topic is somewhat separate from altering the upgrade process or anything, because I think anyone who's developing big features cares about.

DAIRA EMMA: 00:58:03  
Yeah. So what I said about CI is true for ECC maintained repos like Librustzcash, but obviously not for zebra.




ALFREDO: 00:58:15  

So our main issues are that we kind of try to synchronize the blockchain with, kind of not with HPR, but that makes the call singer a monster at some point, and that's maybe we'll try to Maybe we have to remove some of that covers to simplify the CI is too much synchronization. It takes days to do some stuff, and that's complicated, the whole thing. Arya, please go ahead.

ARYA: 00:58:57  

Yeah, we are working to make CI a little bit simpler and hopefully also less expensive to run for each branch. And in the future, maybe it'll be very easy for forks to just run an exact copy of the CI that's on zebras repo, or at least it'll be inexpensive enough that it's reasonable to have a branch that just follows every single commit on all the other forks. Going back to the forum post. So I don't think there's any, or at least I don't see very much controversy in having forks maintained for the purpose of developing a big feature. I think there's just controversy around cutting releases from each one of these forks. And from my perspective, it just seems like a very large cost that we can't really afford right now, and there's not much reason to take on at any point unless there's a competing implementation. Someone brought up that other ecosystems like Ethereum have multiple repos and multiple nodes, but those are completely different implementations that are being maintained by different teams. That makes sense to me, because then each team has specific familiarity with their node implementation, and every team has familiarity with the spec. But in this case, it would seem like we're just distributing the work. But you know, the familiarity is not always going to be there if no one team can concentrate fully on just zebra, I think the code quality will suffer, and I think the pace of development will also suffer.

DAIRA EMMA: 00:1:00:33  

So in Josh's post, I'm not seeing any kind of suggestion that there are official releases for these Forks; it's up to the fork maintainer what they do in terms of release processes, whether they even have releases or if  they are just have a running main

ARYA: 00: 1:00:59  
As long as there aren't releases of the various forks, and each fork is not taking in contributions from every other fork, but there's just one central repo. I think that's perfectly efficient.

DAIRA EMMA: 01:01:14  

Yeah, it obviously helps if you keep fairly up to date with upstream, because if, if the feature is accepted, then you will want to to have something that is manageable upstream. But apart from that, we're not trying to impose development processes on any other org.

NATALIE: 01:01:37  
Conrado go ahead 

CONRAO: 01:01:39  

Yeah, I feel like this proposal is a bit confusing. I feel like people are not on the same page about it, whether Emma just said, sounds very visible, but against like it's what already the current situation looks like, like there's the zebra repo people fork it to develop like Qedit did, shielded labs and the Submit PRs upstream, and that seems like the current what is already happening, right? But in the thread, if you look at the thread, I asked some questions to clarify some stuff and Chris responded, answered that it would be like each or would make their own release of the node, which seems weird to me.

DAIRA EMMA: 01:02:26  

Yeah, what I said might conflict with what Chris said. Sorry, I hadn't read Chris's response.

CONRADO: 01:02:33  

Yeah. So I just feel like each person has a view of this proposal, of what this proposal looks like, which is already also confusing.

DAIRA EMMA: 01:02:44  

Okay, that's not your problem. That's ours for not explaining it. I will talk, I will talk to Josh about it, and discuss some of the misconceptions that people might have had, all the differing interpretations we will clarify that

CONRADO: 01:03:00  

Just  to emphasize something that someone also said in the chat, like, I feel that this is trying to solve a problem, but it doesn't explicitly say what the problem is. So would be also be helpful to state like, what exactly does this try to solve?

DAIRA EMMA: 01:03:18  

So I can talk about that to some extent. If you look at how long it takes to get protocol changes into Zcash, it's clearly too long. So qedit has been having to maintain this feature branch for a long time,

ZOOKO: 01:03:37  

Network sustainability mechanism, simplest patch ever, taking on like, 24 months or something now.


DAIRA EMMA: 01:03:44  

yeah, it's, it's because we tend to bundle changes in in one upgrade, and that does have some synergy effects. I mean, it does simplify things, for example, to be able to assume that the quantum resilience changes and TSAs and also going into the same upgrade, some other things could have been decoupled and probably should have been decoupled, and that's what this change in process is aiming to to encourage. And we haven't been wanting to do that for a while. We've been saying, this is not really a new proposal.This is what we wanted to do for a couple of years. It just didn't happen for NU 7, and now, partly because of that, because NU 7 is kind of like a brick that is plugging up our digestive system for network upgrades.That's why NU 6.1 had to be inserted. So sorry for the unpleasant digestive metaphor, but yeah,hopefully we will be able to ship the breakfast.

PACU: 01:05:20  

Okay, yeah, I understand that the core problem that ECC wants to address is is like removing themselves as drivers of network upgrades.I think that the the question is whether, I guess that what daira emma just clarified, is that they also think that network upgrades are lower and taking more time than they should. So they would like this process to be faster and then I guess, like more, like, more lean and happen more often with less things. I see the blog post addressing the first part of like ECC, saying, Okay, we're not going to be the drivers or the main drivers of the ad hoc drivers of network upgrades. But the other thing like, I think it's totally unaddressed and also probably made worse, because I don't think that decentralization helps that all with speed so far, maybe they're going to be breakthroughs soon on that. But usually one thing, calling the shots is faster than  a group of people trying to agree on things.
what I see is that, for example, the zcash Foundation has on their program areas, specifically, it says zcash Foundation acts as the steward of the zcash protocol, supporting its continued maintenance and improvement. So I guess it could be that that's the thing that it's needed. Like, there is someone coordinating, organizing, fostering the things that need to be done for a network upgrade to happen in some way, and that is not chaotic and like, it's not like three or four organizations proposing things like features that may not align with each other with time. So that's the only concern I have, is like, I don't see how this is going to be faster if, there is no clear process on how things are done and, and I understand, ecc, like one wanting to relinquish that, that role, but  that's kind of my concern,what's going to happen? Like today, anyone can actually launch their own zebra fork. And hash rate concentration actually could make it feasible where just the majority of miners, which is just one single mining pool, wants to run one version of zebra, and that will be the upgrade, I guess, in a nutshell. So the blog post doesn't bring anything new that can actually, can't actually happen like currently, but I think that, since it's a process that someone is proposing,I guess, that we should try to make it the most beneficial as possible. And I kind of see that part of like not not being there, and I clearly not not seeing the benefit besides of the conceptual benefits of decentralization.



DAIRA EMMA: 01:09:48  

Can I answer that, okay, so the benefits of decentralization are not only conceptual, they are very concrete. We do not want there to be a single organization that is the potential target of kind of legal attacks or denial of service or it's too risky for the protocol. We didn't just relinquish control of protocol direction because we didn't want to do it anymore, we did it because we thought that was the best thing for Zcash. And I don't think that just another organization adopting the role that ECC played in the first protocol,I don't think that will be beneficial in long term for zcash decentralization is important, it's not just warm words in terms of, actually, I'll stop there and let other people contribute.

NATALIE: 01:11:04  

Anyone have a comment or question? Oh, Alfredo,

ALFREDO: 01:11:10  

yeah, I feel that this kind of, when we start talking about forking stuff, it's kind of people start to think about competition between blockchain nodes, whatever, different organizations. So, yeah, I think it's a complicated topic. I remember when there was some sort of proposal to kind of move zcash to an ethereum token or something like that. Yeah, I don't think this. I mean, it's great. I understand all the problems. I kind of leave them as well. I think we need to fix it in the future. But yeah, again, I think we need to put and use the shielded assets as we are, and then single alternative and what to do for all these

DAIRA EMMA: 01:12:06  

So can I push back on that? First of all, we're not proposing this for NU 7, but I do think that we need to talk about it now. We can't just do NU 7  and then talk about it, because then anyway, in practice, end up being right. This has happened before.

ALFREDO: 01:12:27  

Yeah, I think it would be good to clarify that like, Okay, we are trying to sync an alternative for after this thing. I feel that we already committed to deprecate Zcash D to launch the shielded assets. And if we start talking about kind of forking and competing stuff like, you know, if the miners or the user follows my version, then, yeah, I don't want to see that right now, I guess.

DAIRA EMMA: 01:13:00  

Where does the blog post say compete?




DAIRA EMMA: 01:13:15  

because you could try and convince people to run those nodes on mainnet. I mean, I feel that this is addressed in the blog post, but carry on. Okay,

NATE: 01:13:29  
just a quick interjection. Fork means different things to different people, by the way, right? So there's source code forks, and then there's chain splits.So that might be causing some confusion.

DAIRA EMMA: 01:13:44  

Yeah, when I've been saying fork, I've been meaning code fork

PACCU: 01:13:49  

Just wanted to clarify when I mentioned the conceptual benefits of decentralization. I meant in the context of the blog post is like the block that the the blog post kind of like lays out some situation, and then, I guess there's no Clear proposal  on how, ecc envisions that these next NUs  like NU 8 , 7, NU 8, not 7, definitely NU 7,8,9,10, etc, should, be coordinated. And that's kind of what, I guess, leaves with a lot of room for imagination or catastrophic thoughts or things like that. And that's when I think that just the the conceptual benefits of decentralization are like, like we I mean that if there's no vision on how that's going to happen, then it's decentralization just for the sake of it, and then it's detrimental to the processes  as we know it At the moment. So that's what I mean by conceptual. And I guess that that's I the next discussion, or maybe the next research that we need to do is to figure out how other protocols have been dealing with this, if they have, and and see what's a good way to achieve a decentralization that it's robust, capture resistance and also deliver, able to leave, deliver at a pace that that we think is necessary For Zcash to keep evolving and keep being competitive in the crypto world.

ARYA: 01:16:33  

just responding to the vulnerability that Dara Emma brought up that if only a single organization has the ability to develop zebra, then it's a denial of service risk. They're like legal pressure could be put on that organization. I think the solution to that is to build familiarity with Zebra across the other organizations. I don't think it's necessary to have competing forks. I think it's fine to have regular forks, just not competing ones, at least not right now.If the financial situation changes, that might change as well. But,

DAIRA EMMA: 01:17:12  
I believe it's a misunderstanding of what Josh meant to say, to say that these are competing Forks, the post doesn't say competing.They're not intended to be competing.If you look at the paragraph, alternatively, the proposal could attempt to push their changes to consensus nodes, potentially causing a chain fork. That's an alternative to what is being proposed. That's not what is being proposed.

ALFREDO: 01:17:46  

yeah, so in regards to one of Conrados concerns about what happened in the past with wallet forks, do you have any input for that? Daira emma,

DAIRA EMMA: 01:17:59  

sorry, I didn't quite hear what

ALFREDO: 01:18:00  

About Conrado concerns in the forum. About  previous experience with the wallet that you know that's kind of something that can be happening today is that, as my code takes too much time to be merged, I do whatever you want in the work, then it's kind of impossible to sync the nodes like there. We ended up with different version of wallets in the past for kind of decision.

DAIRA EMMA: 01:18:38  

I don't think I understand the point. Are you talking about divergence between consensus nodes or between wallets? Because wallets have to be consistent with the consensus protocol, but they are not responsible for implementing it

ALFREDO: 01:18:56  

Yeah, it happened in the past that we had different wallets using  different version of Librustzcash, and that didn't work very well, in my opinion, instead of a centralized place where

DAIRA EMMA: 01:19:08  

it's always going to be the case because of version skew, because of differences in release schedules, that different wallets are on different versions of Librustzcash, they shouldn't, ideally they should not be on inconsistent forks of librustzcash. But I feel like we've done a pretty good job of keeping librustzcash from diverging in the same way that, for example, Bellman and Halo 2 diverged with Bellman CE and Halo 2 PSE and those, the improvements or changes in those forks never got merged back upstream. That hasn't happened with Librustzcash. So and changes to Librustzcash for December, they have well documented change logs, so it's kind of up to implementers to avoid any problems with different wallets relying on different versions, does that answer the question?



NATALIE: 01:20:25  

just gonna do a time check. We've got nine minutes left, but um, Arya, please go.

ARYA: 01:20:33  

So if they're not competing, the rest of the post seems very non-controversial. It's just explicitly saying what we've been aspiring to, or at least what I think we've been aspiring to for a while. A while, and largely have been doing. And then just one more note on the denial of service risk. It applies to other crates, and like it applies to every crate in the ecosystems. Just Zebra is probably the biggest one 

DAIRA EMMA: 01:20:58  
So in practice, if a change in the protocol is making consensus changes, then in practice, it will have to be a fork of librustzcash, as well as zebra, I would think in most cases. So for Zsa, is that certainly true? Yeah,

DAIRA EMMA: 01:21:29  
 And it may be, it may also require a fork of other crates, like, you know, librustzcash, of course, isn't a crate. It's a workspace with multiple crates.

ARYA: 01:21:48  
I think having familiarity like all of the orgs, having familiarity with all of the crates, also opens up a lot of room for everyone to pick up ideas from the other teams that have been missed so far, to some extent, that could just be really good for everyone. We just have to find the time to do it.

DAIRA EMMA: 01:22:07  

Yeah, so I think someone mentioned that the important point was that people got familiar with the zebra code. I think  practice, basically the only way they're going to do that is by maintaining a fork, because you don't get the same kind of exposure to keeping it working. If you don't have a fork, you can make tiny pull requests to a repo and never understand really how that code base works. 

NATALIE: 01:23:00  

Yeah. I mean, I feel like we are in agreement that competing forks is not a good idea. I think that there's a, I get a nervousness, perhaps, around the idea that forks would become competing because, yeah, as we seem to agree, it's not a good idea. So I think

DAIRA EMMA: 01:23:31  

sorry, I didn't mean to interrupt, but if you're maintaining a code fork, it always  has the potential to become a network fork, as the post explicitly acknowledges, and that's okay, 
because ECC intentionally wanted to get out of the business of deciding what Zcash was. That's why we withdrew from the trademark agreement. ZF Can, can make their own decisions about how they want to handle governance, but I think it's also the case that ZF shouldn't want, I mean, I don't know, but I imagine you don't want to be in the business of deciding what Zcash is. And so if that's the case, then deciding what Zcash is will need to be based on community processes, including, but not limited to the zip process.

NATALIE: 01:24:46  

I don't think what we're talking about is saying what Zcash is. I think we're talking about, I mean, what Zokoo says here. I think competition has benefits as well as drawbacks. I don't think, I really think everyone can maybe have a bigger conversation another time. I really do think competing blocks is basically a terrible idea, and I have lots of reasons why, but we do not have time for that right now. But to hear that, yeah, I will happily have that conversation, but not in the four minutes we have left. Nate,

NATE: 01:25:18  

well, it's, along the same vein, but I was just wanting to point out that, like having alternative implementations with different features or different teams, can be a kind of competition in that we might see which users prefer which. But it doesn't have to be. Comes like competitive in terms of acrimonious or non collaborative, if that makes sense. So like an example is, I could say Zcash D and zebra are competing full node implementations, and we're all collaborating to retire one, right? So we have these two options, and that gives us more options as a community, but it's still collaborative. So I just wanted to try to distinguish those.

NATALIE: 01:26:14  

I think there's a big difference between two different, or however many different, ideas for something. And actually this code base, we are forking, and now we're going to have 2,3,4,5, different versions of it, and which one do you want to go to? And people are spending lots of time and money maintaining one, and then suddenly it diverges. I think that is one of those things which, like, in the short term could be like, Oh, this will be this, but actually, long term becomes really unhealthy, and I think often a waste of time. And I think that's a big concern. And we have two minutes left. So Arya, if you can say in under two minutes go for it. I'm

ARYA:01:27:01  

seeing the motivation a little bit better now. And yeah, it'll be good to read the motivation that that blog post is updated to have if, if it does.

DAIRA EMMA: 01:27:13  

I'll talk to Josh about it. But basically, if you don't want people to run your fork except for testing, then just say that ,it's all simpler than this conversation just made it out to me. Wasn't intended to say all of the controversial stuff. I don't think I'll confirm that with Josh, yeah, no. I mean, I think

NATALIE: 0 1:27:37  

it just sort of led to a different discussion, hasn't it? I don't think, I think I think we sort of veered a little bit off from the blog post itself, which is fine, yes. So two, well, one minute to go. Now. I think maybe we should just wrap up. Thank you. And yeah, the next one will be at nine UTC, 9pm sorry, UTC on August 7, and the next one at this time will be, yeah, two weeks after that. So thank you everyone for coming into the people who are presenting and yeah,

Next Meeting Scheduled: Aug 7th , 2025. 21:00 UTC

