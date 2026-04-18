## Arborist Call 123 Notes 

Meeting Date/Time: 16th April 2026, 21:00 UTC

Meeting Duration: 45 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [RocksDb, dynamic linking](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [zcashD. vulnerability disclosure](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

Research & Implementation Updates: [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates--zingo-labs-zaino) [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer)  

Grant Discussion [formal verification of halo 2 in lean](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#grant-application-discussion--formal-verification-of-halo-2-in-lean-4-244)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=cmPQexrzn_o)

Moderator: Alex

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:03:45  

This meeting will be recorded So if you don't want to be recorded, please turn off your video or leave the call. this is zcash arborist call for April 16, 2026, so our agenda, core stack updates, Zcash foundation with Zebra, zodl with Zcash D core libraries and Zallet Zingo labs with Zaino and pacu with Zcash D deprecation. And then we'll do research and implementation updates with qedit for zsas shielded labs for network sustainability mechanism, shielded labs and zodl for crosslink, shielded labs with dynamic fees. And then Mavenrain is going to discuss their grant application, and then open announcements and discussion if there are any  So what are arborist calls, bi weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts ,design and implementation of new protocol features and identify blockers and unresolved issues. Purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning more about Zcash protocol development can register at Zcasharborist.org if you want to suggest the topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot, other ways to get involved, Zcash community grants, Zcash R D Discord, Zcash community forum, and all these links are listed at Zcasharborist.org, so let's start with core stack updates. Zcash Foundation, zebra.

## Zebra Update 

Alfredo: 00:05:40  

thanks, Alex, I see that's me. Yeah. So in the last two weeks or so, in zebra, the most visible changes are related to CI and DevOps changes specifically switched rocks db to dynamic linking, which speeds ups the CI build. And while doing this, we had a runtime crash, and we fixed  that already, so that's fully working now. We're factoring our deployment pipelines. There was a latent back there got set up, which was impacting when we did a mail release. We're improving our release process in relation to automation. So there are several things we do by hand on each release, like we increase the checkpoint list and we do some support calculations. We are trying to automate that in order to make release faster and easier for the team. So running our own research AI is pretty much related to testing different parts of zebra and the different grades for trying to find bugs that we cannot find manually as humans, so we are trying some machines to do that. Finally, we had previously some issues in the test net sync, so that's fixed now on zebra, we are actively working on performance improvements and benchmarks. Expect next week to put that together. We have three or four open PRs right now for benchmarks and performance improvements. So we want to put that together next week, and yeah, probably have a release with that and other stuff soon. That's pretty much it Alex

Alex: 00:07:34  

any questions for Alfredo? Awesome. Thanks. Alfredo up next core stack updates with zodl

## Zodl Update

Daira: 00:07:55  

Is kris here? Or am I doing this?

Alex: 00:07:58  

kris does not appear to be here. All right,

Daira: 00:08:01  

Okay, let's see. I'm not very well prepared. Sorry. I think we are going to be in the process of doing a new stack release, which will address some issues in zodl. Let's see we are making progress on the Alpha front of zallet. Think about what else? Yeah, I think that's about it. So for Zcash D, we had a security disclosure. It was kind of a verification bug in  sprout proofs. So, yeah, look for that update.  so the impact there  is posted on the blog post, which is at https://zodl.com/zcashd-zebra-april-2026-disclosure/  is very detailed, but the long and short is that there was an optimization that we tried to do to avoid joint split proofs, so proofs from being verified twice, and that optimization was incorrect, but it's fixed now, and the it was mitigated as soon as the majority of mining pools adopted the patch and the core libraries, I think one of the things we're doing is allowing a hardware wallets to be disconnected, and Another thing I think, is improving the status of transactions. So there's an issue with that in the  zodl wallet where transactions can be shown as pending when they should be expired. 

Alex: 00:10:33  

Okay, great. Any questions for Daira, cool. Thank you. Up next, Zingo labs with Zaino.

## core stack updates- zingo labs zaino

Alex: 00:11:02  

Do we have somebody here, Hazel Maybe? Yeah, if you're trying to talk, Hazel, we can't hear you. Allright, why don't we come back to this, Hazel just raise your hand if you are able to speak. So Zcash D deprecation updates with pacu,

Pacu: 00:11:32  

yeah, I think I can also give an update for Zaino. Okay, we can go back. So in terms of zcashD deprecation, there is going to be a release of Zaino soon and and that's going to have some fixes that come up from the collaboration work between zallet and zodl, and then we are actively working to continue expanding the integration tests and get the lightwalletd, the and ZainoD  RV test in which I'm working on them, and also  I know zf, zingo labs and zodl of are working together in some testing infrastructure for some specific scenarios that we want to cover for production use of the z3 stack, and that's pretty much what is being worked on these last two weeks, besides other work that has been said 

Alex: 00:13:06  

Any questions for Pacu?  Hazel Are you able to speak yet?. Cool. Thanks

Okay, we'll move on to the next one. qedit with Zcash shielded assets. Is anybody here from qedit? I don't believe so. All right, we'll move on to the next shielded labs with network sustainability mechanisms.

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:13:39  

Yeah, I can give a quick update on this one. So it's been a very busy month for shielded labs so far, with what daira Emma touched on before, plus some of the things we're going to give an update on after me. Yeah, thank you, Conrado for taking a look at the PR. I saw the feedback, and I'll have that implemented by Monday, and so it should be ready for some extras after that. Yeah, that's about it for me. I'll pass it back.

Alex: 00:14:06  

Any questions for judah on Nsm. Oh, there you go. We can hear you.

## core stack updates, zingo labs zaino (CONTD)

Hazel: 00:14:15  

Oh, nice. I'm not sure what I did, but it's fixed now. So I was messing with my sounds, and I didn't actually hear what pacu said. So it's possible he covered all of this already, but we're putting out a release candidate tomorrow, some minor updates, like we have a bug fix for REG test networks that weren't able to handle networks that I think didn't have a sapling activation, height listed and some other small improvements, like Some database updates, I have been working on a documentation overhaul and s some cleanup to how we handle pass through internally, because when I was trying to document it, I discovered that it's really hard to make sense of, even for me, and I wrote it, but that will not be ready for the next release that is ongoing work, and that's about it for Zaino.

Alex: 00:15:29  

Any questions for Hazel? Great. Thank you. Oh, Alfredo, go for it.

Alfredo: 00:15:42  

yeah, sorry, I wanted to ask if, so I know where we're going to check out how zaino is in regards to lightwalletD compatibility. So I wanted to know if there is any work done there or not yet.

Hazel: 00:15:59  

There is some ongoing work related to that. I believe I have not really been keeping abreast of it.

Alfredo: 00:16:17  

I should check it out myself, so. But yeah, thanks.

Hazel: 00:16:22  

Yeah, I think maybe Dorian has been working on some of that stuff. I'm not sure entirely it's on the roadmap, but it's still somewhat backburnered. 

Alex: 00:16:39  

Great. Thank you, Hazel, so let's jump back into the agenda. Yep, shielded labs and zodl with crosslink.

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:16:48  

Okay, so yesterday, we ran a workshop for the final milestone of the prototype phase. So the distinction is, we are switching to running a persistent feature network for cross link, and we're also introducing zEC rewards, like a reward mechanism that's based on how issuance works on that feature net. So if you participate in the feature net and you mine or stake or earn fees through running a Finalizer, then you are earning the opportunity to receive some of these rewards each season, and this season is roughly six weeks. However, we ran into demo Gremlins and we're resetting the network. We had a bug where, because we were relying on a Genesis block with an old time stamp, the difficulty adjustment was behaving strangely, and so as an expedient ,that was disabled, which didn't work well, so we fixed that so we should have new binaries ready, like, quite soon, imminently, and then we'll be relaunching that network. Yeah, we'll be relaunching that network later today. Is there anything you wanted to share? Sam, about the details of the bug?

Sam: 00:18:43  

Yeah, well, it's interesting. So the change we made doesn't change anything in consensus, because on testnet, the requirement for how far in the future can a block's timestamp be from its predecessor, that requirement only activates around the 5000 or 500,000 ish. But the zebra default miner was adhering to this rule anyway. And so we, yeah, we had this experience. So every block when we did this on Wednesday, it was getting mined and was maximally in the future as it could be, which I think is 90 minutes or something. But it meant that the algorithm was keeping the difficulty at the lowest possible amount. And now we fix that. So you know, for the first couple of blocks, it jumps up to, you know, 2026, recent time, and then the difficulty adjust, works. We also fixed some, some other issues during testing today. But the new network is up and we're done with the release. We just need to package it up and put it on GitHub for people to download.

Daira: 00:20:01  

I didn't catch what you said about the difficulty.

Sam: 00:20:04  

So because we've, we basically chain fork from the real, normal testnet at the first or second block, and so the timestamp on the Genesis is 2016 and so all of the blocks had 2016 timestamps, far, very far apart from each other.

Daira: 00:20:28  

Yeah, yeah, that will happen.

Sam: 00:20:32  

Does anybody have any other questions ?

Nate: 00:20:40  

So just one last thing, if you want to participate in that, the best way to get engaged is there's a signal channel to join. So if you want to participate, you're not in that channel, you can ping me, or ping us or go look at forum threads for ways to get involved

Sam: 00:21:07  

I should add as well. So this network is going to be up for a month, I think is our target ish, before we do the rewards at the end. But we will be doing updates to the software, but that don't change the network protocol. So there'll be upgrades to the software that improve things or fix bugs that  could seamlessly upgrade with the network,

Daira: 00:21:38  

By the way, if you're still going to fork from the test net Genesis block, you might be better off turning off the limitation on the gap between time slots.

Sam: 00:21:53  

So that's how we do it that limitation  does not apply for testnet blocks lower than height, 500,000 in consensus. So we have a disable. We have it disabled in the in the zebra miner for the first couple blocks to skip that rule

Daira: 00:22:13  

Okay, yeah, that's how the actual testnet does it.

Alfredo: 00:22:21  

So that rewards you mentioned are real cross link rewards or is some other system?

Sam: 00:22:29  

So we have 25 zEC allocated for this first season, and the way that's going to work is this. We haven't built this yet, but at the end of the season, there will be some tool, some web tool we make, where you export your viewing key from the software or the wallet you used for the testnet, and then we will scan that and do payouts. So it's not any CTAs that can be rewarded and turned into zEC. It's how much did you earn from specific activities like mining or staking during the season? And that'll be analyzed by our tool at the end.

Alex: 00:23:17  

I any other questions for Sam and Nate? Awesome. Thanks, guys. Before we go on, Hazel, do you want to mention what you put in the chat out loud?

Hazel: 00:23:34  

Oh, sure, yeah. So I remembered after Alfredo asked about it that we have had recent bug fixes that I think bring a couple things into line with how lightwalletD did those things. get _compact _block stream we were not handling. rain blocks out of range, the same way lightwallet D was and we are now. We also had some Tree_ State consistency fixes that I think made it to the I think we're at the Zaino D level. I think Zaino D had been doing tree states differently from lightwalletd

Alfredo: 00:24:28  

ok That makes sense. Thanks.

Alex: 00:24:36  

Great. Thanks, Hazel. Okay, let's move on to the next, shieldded labs  with the dynamic fees.

## Research & Implementation Updates, shielded labs- Dynamic fee

Jason: 00:24:42  

So no update for dynamic fees. Mark's out today, but he's going to publish a blog post next week that provides an update on the project, as well as a roadmap and a loose timeline. So stay tuned for that, and then we'll provide a detailed update on the arborist call that happens in 2 weeks. Thanks.

Alex: 00:25:07  

Thanks, Jason. Sounds like you're under a waterfall. Any questions for Jason before we move on? Cool. Next slide. So grant application discussion side, before Maven rain takes over here, I just dropped the grant in question into the chat. Zcg asked this applicant to come to this arborist call and share some of what they're working on for feedback. So I want to just say thank you for showing up and doing this. Not a little intimidating, I would say, with this group, but super appreciated. And yeah, looking forward to hearing what you have to share. So please take it away.

## Grant Application Discussion- Formal verification of Halo 2 in lean 4 #244

Marvenrain: 00:25:56  

Thanks, Alex, hi guys. My name is oni, aka Maven rain. I'm just going to go through some notes that I have here that are related to the grant application I have submitted, and then I'll leave some time for questions at the end. Give me a second here yeah, so I have been interested in and looking into formal verification in the context of Zcash, you know, on orchard gadgets. So there are five gadgets in orchard, you know, sinsemiller ECC, Merkle path, you know, range look up, etc. So what I am proposing to do, essentially, is to leverage a framework that nethermind created in order to verify Halo 2 gadgets, and sort of, you know, drill that down and sort of basically extend the halva framework. I think it's called, I think that's how you pronounce it in order to extract a model into lean four, which is a mathematical theorem prover to prove security properties about Each of the circuits, nethermind Used this recently to discover a soundness bug in one of the gadgets that they use, or that scroll uses, called Keck. I think that's how you pronounce that that basically led to an under constrained situation that allowed provers  to push through facts that weren't true, right? So the theory behind sort of evolving from manual testing of these things, or the the bug, the typical bug finding that you do with test suites and whatnot is that there are certain bugs of these, you know, kinds like, you know, soundness bugs and things of that nature that are, they're either laborious to discover manually or you can't do it because it involves something that's mathematically intricate about the gadget that you're analyzing, and so. You know, over time, companies like nethermind have become interested in building out these suites, you know, in in coke or lean or what have you, these different theorem provers in order to extract the logic of the circuits that they're working on and prove these properties in order to mathematically prove their security. So yeah, so that's sort of the motivation behind it. So of course, you know, I'm focused on the Zcash gadgets, in particular the five relates to Orchard. I have already started on that. I looked at what I believe is the simplest one, which is the lookup range check. And that is in a repo which I posted on the grant application as a comment there it's the halo 2 dash formal repo, and that basically goes through and sets up soundness and completeness theorems specifically for the lookup range check and so taking a look at what the body of the grant would entail, it's basically two phases. And in the first phase, what I would essentially do is extend this, this, you know, these soundness and completeness checks to the other four core gadgets that are part of orchard, and then from there. So couple months out, I was proposing a phase two, which would involve proving some more sophisticated security properties, things like spend authorization or Fiat mirror soundness, and in particular, that one is important for avoiding vulnerabilities that had recently been discovered By trail of bits in a bunch of different systems, Plank, graph 16, etc. They call it the so called Frozen Heart vulnerability, which has to do with basically, essentially not committing enough information pertaining to the public setup, or, you know, the transcript that a producer produces along the way of generating proofs that leads to situations where you can prove things that aren't true in those setups. So, so, yeah, so Phase two would be looking at those additional properties once we've already nailed down soundness and completeness for the five core orchard circuits. Okay, so a laundry list of questions I'm going to knock out here. So as far as, like, the time commitment from individuals besides me, I am going to assert that it's going to be pretty minimal. I think this was a question that Artkor, if that's how you pronounce it, had asked in the forum. Basically all of the information, or most of the information, that I would need in order to progress through this program would be contained in public sources. you've got the halo 2 book, The Orchard book, and you've got the code bases themselves. You've got netherminds, halva framework, which will be what I will be building on top of, and that's pretty much it. You know, places where I might ever ask a question during the course of this work is where there are spec ambiguities, and then in that case, I will  take some time to form targeted questions that will drop in the forum as far as if I find anything interesting along the journey of my research that might lead to an actual issue, like a soundness bug, I would agree to a specific sort of cadence for disclosure on that. I'm assuming that there will be an email or a channel where you all would prefer that I mentioned what I found before anything goes public.

Daira: 00:34:05  

There will be a signal messenger, yeah, I'm really enthusiastic about this project. So it's great that you've brought this grant application. Yeah, and anything I can do to help, I'm happy to do. There was one essentially analyzing the sapling protocol, and kind of we never really had the opportunity the time to capitalize on that, so I want to make sure that doesn't happen this time. And I want to make sure that we work collaboratively with you, and where you're producing things that are in the form that we can continue to use and maintain. So I had a question. This is not a trick question, I promise. Do you intend to use AI?

Marvenrain: 00:35:13  

Yeah, so I talked to Grok a lot that is that's been my buddy, and so the answer to that question is yes,

Daira: 00:35:28  

I've used Claude. There are specific models that have been developed for Lean, for proving. So I think it might be useful to look at that and also to look at Claude. I don't know  how well they do relative to each other on this kind of work.

Marvenrain: 00:35:56  

Oh, okay, that's a good tip in its own right. Let me make I

Daira: 00:36:01  

feel very impressed with Claude 4.6 and there's a 4.7 now. For example there was a bug in the Merkle tree design for Bitcoin, which had a CVE fixed quite a while ago, but their description of why the fix was secure had quite a bit of hand waving. It's the only known way to attack this is blah, and we think we fixed that. I just pointed Claude at it, and it gave me complete proof that the fix was adequate. I didn't have to. I didn't have to handhold it at all. Oh yeah, it's an informal proof. It's not only for proof. It's very it's pretty good

Marvenrain: 00:36:53  

Allright, I will raise the priority of looking at that other model.

Daira: 00:37:00  

So if you want to have a kind of initial pairing with me, and we'll kind of look at what you're doing in more detail, and I can give you advice or whatever, I'm very happy to do,



Marvenrain: 00:37:15  

I very much appreciate that. Thank you, Dara, is that? Is that? How you say Daira,Okay, nice to meet you, and thank you for offering.

Alex: 00:37:29  

There's a question in the chat from Everett, use AI for specifying or for just writing the proofs,

Marvenrain: 00:37:39  

 Both 

Daira: 00:37:41  

I recommend both,I mean, it will make mistakes, but in my experience, the kind of mistakes that it makes are pretty reasonable. It sometimes forgets things. But I mean, humans do as well, So I used to be a huge, huge skeptic about AI in general, but formal verification was one area where, kind of you have an article that tells you whether the answer is correct. So a correct proof is a correct proof regardless of how you arrived at it. Usually short proofs are better. So in that sense, you don't really have the problems of hallucination or whatever. But clearly, if you use the AI to produce the specifications, then that no longer applies, and they can, they can make arbitrary mistakes there. But still, I highly recommend using AI for that purpose, because it's a lot more collaborative than just vibe coding. No one's going to vibecode for specification for Zcash. It's too complicated, but you do need, well, maybe some people can do it without AI help, but I'm an expert on this, and I would use AI. So use the right tools for the job.

Alex: 00:39:28  

And there's a follow up question from Everett, so use the AI to write specs and check them manually.

Marvenrain: 00:39:35  

Yeah, for sure.

Alex: 00:39:38  

Great, yeah. And get the AI to explain it to you and kind of get it to try and poke holes in its own work. That is the most effective way of using it, in my experience.

Marvenrain: 00:39:54  

Yeah, I think a lot of the grind is going to be just that, you know, revisions, sort of hallucination management, especially in what I'm calling the phase two part of the grant, where the proofs are, they involve more complex sort of concepts. And so, I think it's going to be like the next level of, you know, what's called a Ralph loop, typically, where you just sort of grinding through sort of edges, working with axioms to try to plug holes and whatnot, right? Yeah.

Daira: 00:40:40  

i really advise working in public and so that people can review it as you're going along. That will be much more useful.

Marvenrain: 00:40:47  

That was actually the next thing I was going to say is, as far as, like, work products, like things I can actually hand you guys that you'll see is it's going to be a bunch of public repos. So literally, every commit you're going to see it. Let you know. Let me know. Well, what kind of licensing do you guys want on those? I typically  default to the dual MIT or Apache



Daira: 00:41:20  

MIT  Apache is probably better, yeah, that's the same as all of the rest of the code.

Marvenrain: 00:41:29  

Got it. Got it, yeah. So let's see. I think I've covered everything. The only thing is that, you know, as far as risk management goes, there are a couple levers that we can pull. Obviously, I've split the grant up into two phases. So if we feel like just dipping our toes in, there's the possibility of just committing to phase one for now, things of that nature. And then as far as, like, running into proofs that get hairy. You know, the plan there is to basically get as far as I can. I mean, obviously I'll be able to do the full specifications, but as far as, like, the the proofs of some of the complex properties go, just get as far as I can, and then document from the stopping point, sort of what the what the conjectures are that need to be completed. And then one other note here that I had is that it is possible that as far as the elliptic curve calculations that halva might not provide everything that we need, and so I might need to do some supplementation there with math lib in order to actually fully extract the orchard circuits building on top of halva.

Daira: 00:43:01  

So you're intending to extract from the rust code, correct? That seems like a reasonable approach. Yeah, I used Claude too, I pointed it to the, I think the orchard code, and also the halo 2 book. So you know, the security argument, the correctness argument for elliptic curve multiplication, and it did an outstanding job. I was shocked at how good it was. Yeah, it is really impressive because it, I mean, I hesitate to use the word understand for an AI model, but it did a good job of simulating understanding that the argument for why it was correct, which is a complicated argument, and I don't think it's, I mean, it's written down in the book, but I'm not sure how many people actually understand it

Marvenrain: 00:44:18  

I think there is some definition. I don't think it's the word understanding truly, but some sort of definition that fits the AI models and sort of how they approach these problems.

Alex: 00:44:31  

Got another question. Is halva actively maintained or up to date enough? You mentioned it was used recently for a verification task.

Marvenrain: 00:44:39  

I don't know exactly how maintained it is. As far as you know, did someone push an enhancement yesterday? I can get you that answer, but the article that talked about the vulnerability that they found with it. That is from last July. And so, I presume that even if they think its in a good state that it is a recent technology that is up to date at least as far as nethermind is concerned. Now I have reached out to Julian Sutherland, who I think heads a formal verification team over there. I can ping him to ask him, sort of what the up to date state is on halva in particular, if you're curious.

Alex: 00:45:45  

Cool other questions, great. Well, I just want to remind everybody that this is an open grant, and has not been approved or rejected yet. So if you support it, please go to the forum or on GitHub, but it's linked on the chat to give your support or ask additional questions. And I know zcg will be watching this and paying attention as well. So yeah, anything else on this one?

Marvenrain: 00:46:15  

No, that's it. Thank you guys for listening to me appreciate it 

Alex: 00:46:21  

Yeah, I really appreciate you coming and presenting awesome. So open discussion of any topic, topics anybody would like to raise for open discussion. Yeah, okay, next slide please. Oh, okay. Well, thank you everybody.

Next Meeting Scheduled: 30 th April 2026. 15:00 UTC

