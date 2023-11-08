# Arborist Call #64 Notes

Meeting Date/Time: November 2nd 2023, 21:00 UTC

Meeting Duration: 1 hour 15 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [Focusing & Decentralising ECC](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#1-ecc-update---focusing-ecc--decentralising-efforts)

+ Zebra Update - [Zebrad 1.4.0 details](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#2-zebra-update---zebrad-140)

+ Research & Implementation Update - [Trailing Finality Progress](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#3-research--implementation-updates-i-trailing-finality) / [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#3-research--implementation-updates-ii-frost) / [ZSA updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#3-research--implementation-updates-iii-zsa-updates)

+ Open Discussion - [NU5 Retrospective](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#4-open-discussion-i---nu5-retrospective) / [NU5 Retrospective cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2064-Notes.md#4-open-discussion-ii---nu5-retrospective)


Video of the meeting: [recording](https://www.youtube.com/watch?v=IhLj4vKGuUI)

Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes



___

### 1. ECC Update - Focusing ECC & Decentralising efforts

[03:01] - **Zooko**

Okay, since two weeks ago, we officially declared the end of emergency mode, since all three of the wallets that use our wallet SDK shipped new versions using wallet SDK 2.0 and all of their users now have access to their funds.

[03:20] 

So after much work, those users are all in the clear. Along the way we have been working a lot on iterations of the Zashi user interface. Anybody who wants to help beta test and identify user experience issues in the secret Zashi beta testers club, just reach out. I'm not really aware of anything we've done on zcashd at the engineering level.

[03:49] 

I've been working on Zcash at the product level is helping others take over the role of maintainer of full nodes on behalf of CEX's and mining pools and things like that. The overall theme is that ECC is decentralizing Zcash and Focusing ECC, we call it. The Focus ECC part is about make it so we can just do proof of stake, the SDK & Zashi. The decentralize Zcash part turns out to take a whole lot of work. We're spending a lot of time helping other people gain more control over things that we used to do since we were the only organization that existed 8 years ago, like the Z.cash website, maintaining a full node on behalf of CEX's and several other things.



___

### 2. Zebra Update - Zebrad 1.4.0


[05:04] - **Jack Gavigan**

Thank you and congratulations on exiting emergency mode.

[05:25] - **Teor**

Hi, i'm Teor. I am the release manager for the next Zebra release 1.4.0 which is going to be out next week sometime. So we have a lot of quite significant changes coming in our next release. Some of the major changes to our features and functionality are that our mining RPCs are now available in production builds.

[05:54] 

So we fixed some final bugs in those RPCs and stabilized that rust feature. As of 1.4.0, the latest build of Zebra will contain all of those RPCs. There's about 12 of them, but the major one is the getblocktemplate RPC.

[06:13] 

The other thing we've done, following along from the zcashd changes in their last release, is that we have embedded the sapling and the sprout verification parameters in the zebrad binary. So that means that you don't need to download separate parameter files. Whether you're using Zcash or Zebra, you can delete those files after you upgrade to the relevant releases and yeah, that simplifies things because there's no separate download and no separate website that can fail those kinds of things. So those are the two major functional changes.

[06:58] 

We also have some deprecation that we're considering doing or have done so the deprecation that we've done is that now that we're publishing rust crates, our [public documentation](https://docs.rs/zebrad/latest/zebrad/) is available on docs.rs so we are not updating our doc.zebra.zcashfoundation.org website anymore with our published API documentation.

[07:27] 

Look at docs.rs for that or look at our internal docs, which still exist at doc-internal. All these details are in the [Changelog](https://github.com/ZcashFoundation/zebra/blob/main/CHANGELOG.md#deprecation-warnings). So I'll post a link to these if people want to follow up on that.

[07:44] 

Then the other thing that we're thinking of changing, but we haven't changed yet, is that we've got a lot of docker tags and we're not sure how many of them are used and how many of those tags are actually useful and something we want to support. So we're considering simplifying things down to just having a tag that has the full version number in it if you want to stay on that exact release and then a latest tag. So currently we have about seven per release, which is quite a lot.

[08:19] 

Those are the things that we are planning on doing. Please let us know if you want specific docker tags that say "stay on the NU5 version of Zebra" or something like that. And that's it from us for the moment.



___


### 3. Research & Implementation Updates i) Trailing Finality


[09:07] - **Nate**

Since two weeks ago, we've been at work sort of updating the [book](https://electric-coin-company.github.io/tfl-book/introduction/trailing-finality-layer-in-a-nutshell.html). Sadly, we didn't get to the goal I wanted to by this meeting, which is that if you go to that book, all of the content is roughly self consistent and it sort of introduces crosslink, which is a main component of our design that we're working on.

[09:45] 

But we still have a few pending changes. So if you glance at it today, you may see some sections that are inconsistent with crosslink and that should be all ready by Monday. So in addition to that, we've continued working on the two main security arguments for the Crosslink construction. So those are for liveness and safety and we've also done some roadmapping.

[10:20]

So after this goal on Monday of having a release of the book that's all self consistent and introduces Crosslink, that Monday version links to all of the Crosslink definition, which is over on hackMD.  

[10:50] 

So instead of having the book and a hackMD, we're going to get it all in one document. And then after that, we have a lot of security analysis goals & as we are working towards those, we're also developing a simulator, which is a Python code base that we can use to run simulations of different security scenarios and that's the next big milestone we're aiming for.

[11:28] - **Daira Emma**

I can talk about how far on we are with the simulator, but carry on with what you were saying first.

[11:35] - **Nate**

I think I was done. That was sort of the main status update. We have this release coming out on Monday that's sort of like the first coherent introduction to Crosslink. The next milestone is to integrate that all into one document, and then the milestone beyond that is to start improving the simulator with multiple different kinds of security analysis. Daira, do you want to talk more about the simulator updates?

[12:05] - **Daira Emma**

I think by the time of the last Arborist call we just had a framework for message passing between nodes. Now we have some abstractions for Crosslink and Snap and Chat, which is the protocol it was originally based on.

[12:27]

They take two protocols. So one is a best chain protocol like Zcash or Bitcoin, and the other is BFT, so Byzantine Fault Tolerance protocol & they combine those and you get out a finalized ledger and a dynamically available ledger. So as far as the simulator is concerned, I've written some abstractions for the best chain protocol, and currently there's a draft PR up for the BFT protocol.

[13:06]

The next thing to do, I think, is to implement a specific BFT protocol called [Streamlet](https://web.stanford.edu/class/ee374/lec_notes/lec18.pdf), which is designed to be easy to explain and teach. So that's also quite easy to implement.

[13:26] - **Nate**

I wish I had done this at the very beginning, just in case people don't have context but this project we're calling Trailing finality layer, the goal of it is to propose an upgrade to the Zcash protocol that would transition it from a proof of work based system very similar to Bitcoin to a hybrid system that would retain that proof of work element but it would add a proof of stake sort of layer that is causing the transactions and blocks coming out of proof of work to become finalized. And finalized transactions can't be rolled back, which provides a lot of benefits for usability but also building various protocol things on top of, especially like bridges or DEX integrations or things like that.

[14:27] - **Daira Emma**

Yeah, and I think we already went over this in the previous call. But the tricky thing about the analysis is to make sure that you're not getting just the weaker of the security properties of the BFT protocol and the best chain protocol and we think we've achieved that.


___

### 3. Research & Implementation Updates ii) FROST 


[15:19] - **Teor**

It's me as well, but I'm just reading out what a summary from the FROST team because they're away today. The FROST Audit Report has been [published](https://research.nccgroup.com/2023/10/23/public-report-zcash-FROST-security-assessment/). They're still working on cleanups for the FROST Rust release candidate, and they started working on adding network communication to the FROST demos. 

[16:17] - **Jack Gavigan**

I believe it's on NCC's website. Yeah. If you go to research.nccgroup.com, you'll find [Public report Zcash FROST security assessment](https://research.nccgroup.com/2023/10/23/public-report-zcash-FROST-security-assessment/).

[16:42] - **Daira Emma**

Okay, thank you.


___

### 3. Research & Implementation Updates iii) ZSA updates


[17:10] - **Jon QEDIT**

Thank you. I'm right now based in Pennsylvania for logistical mercurial reasons, I don't know how to say, marshall reasons. So short version is we have been working on trying to get the ZSAs back to function, but this time on Zebra because, as you know, we almost accomplished everything we needed on Zcash and we did a demo. But moving to Zebra, there's missing pieces that we need to catch up to get back to developing and having those transactions actually circulate and function.

[18:12] 

So there's been conversations, we actually started tighter conversations with the foundation. There's a question of coordinating who does what and where it's going. What qedit is doing right now is writing a kind of testing platform to issue transactions that have a sort of pseudo v6. The v6 being envisioned here is one that contains ZSAs. So we added the ability to issue those transactions that have ZSAs in them and try to run all that on Zebra itself. So it's not really a wallet, but it has some of the functionality of picking up nodes and creating a transaction in the right format and handing it over for a network to try to accept.

[19:23] 

So the interaction with the foundation is on trying to run a testnet that is not the testnet that is live and running, but something that we can actually use for our Zsa work because things right now are kind of hard coded in Zebra for testnet and maybe I'm reiterating also here that we plus one the requests or the asks to try to have the Zebra code be able to launch networks that are not the testnet for better testing. But the outcome of what we're doing is actually useful. Also for Orchard transactions, there'll be a possibility to test transactions on Zebra with the code that we're providing. So we're doing the work for ZSA, but actually we had to do it also for Orchard.

[20:34] - **Daira Emma**

Excellent.

[20:36] - **Jon QEDIT**

Thank you. We had to do it because otherwise we can't progress. For asset swap that we started already designing and there's a few deliverables that are hinging on just continuing to write and being able to test what we write. You'll get more details from Vivek & on the forum we want to post exactly what we did.

[21:06] 

There's a question of, well, that work hasn't been foreseen, but we're doing it anyway because it's necessary. So how do we make it work with the deliverables we have? So we have a post coming up to explain what we're doing and trying to do. But it's actually looking good. The progress there funnily. I was quoted, I don't know where, describing how much of a breeze it is to work on Rust rather than Zcashd.

[21:51] 

It's funny, the snippets they pick up, but it's true. The engineers are happy. There is a question that Jack, you suggested that I put here, which is with these three groups trying to coordinate between what's going on in librustzcash and in Orchard and ZSA and those zebra and all these efforts. It's not fully clear to us where does NU6 work start and who picks up the movement to have those v6 transactions being discussed and forged.

[22:45] 

So right now we're building these sort of dummy transactions that we call v6 because that's the next integer in line and we discussed it with everybody. But the formal NU6, it's not fully clear what's the target and where it goes. I'm happy to hear what people have in mind for that.

[23:16] - **Teor**

Yeah, so as one of the ZIP editors I might be able to help with that question. Currently what we have at the moment is a bunch of ZIPs that might change the transaction format that are in various statuses everywhere from, I think, approved all the way through to draft and then maybe ideas in people's heads.

[23:39]

So what happens closer to NU6 is we look at all of those ZIPs that are ready to go and then we look to ECC and ZF to help gauge community sentiment and decide what is going to be Zcash NU6. Then when we know what's going to be an NU6, then it's the role of the ZIP editors to create a transaction format that supports everything that's actually going to be in NU6.

[24:21] 

So that's maybe three steps or four step process before we know what the final state is going to be. But definitely bringing together all those separate ZIPs is the role of the ZIP editors because we're the ones who know what all the new fields need to be. And then I guess after that happens, then it's over to the implementation team.

[24:46] 

So the engineers at ECC and ZF will then be adding those extra fields into their implementations. So I think that's what's going to happen. But people who've done this more times than me, please feel free to jump in and correct.

[25:01] - **Daira Emma**

I mean, that sounds like a reasonable process to me. It certainly sounds like a more decentralized process than how we used to do it, which is basically a bunch of ECC engineers doing it, this is better.

[25:20] - **Jon QEDIT**

In the spirit of ideas coming from decentralized places, I want to start putting this as a topic also in these calls. I think we should start thinking about what are the features that we're adding in ZSA that help us make Zcash robust against future attacks from regulators or people looking at platforms with strong privacy as the devil? And we have a lot of ideas at QEDIT.

[26:06] 

Frankly, it became much more of a silent stressing point now that some of us are working day and night at detecting crypto transactions on Ethereum and Bitcoin related to the current affairs back in Israel, Palestine and what's going on there. So we're at the same time wearing the hat of oh my God, bad things are happening with crypto as we speak and it's very easy to see one or two transactions that would be coming on the Zcash network that would tarnish a lot of work that otherwise is pushing just stronger privacy for fully legit uses.

[27:03] 

So all this to say that I think the time to figure out what goes on into NU6, to show that those elements are not welcome in this community, the time is now. I don't have any strong suggestions because it's super tricky to figure out what exactly we need to do because we don't want to weaken the core of neither of Zcash or of ZSA. We want to remain with a strong core but I think we need to have some working group on this.

[27:48] 

I'm happy to take the lead on this particular topic because basically I have taken the lead on this particular topic outside of Zcash. We have a ZK proof policy event in Washington at the end of the month on November 30, where I'm trying to figure out nobody's going to give a green light to anything, but what is the sentiment and how can we try to walk that balance without abdicating to the core vision of what Zcash is bringing?

[28:32] - **Daira Emma**

I have opinions, so I've been pretty disappointed about the quality of technical proposals for, you might say, compromises on goals like preventing money laundering or terrorist financing. Because I think if you look at the history of proposals like that in academic papers and things like privacy pools recently, they have a lot of flaws and they really do reduce privacy by quite a lot. So to the extent that it's possible to achieve those goals at all, we're going to need better ideas today.

[29:30] - **Jon QEDIT**

I agree and these are the side conversations I'm having in the various meetings we have, are trying to figure out what are those better ideas? Aviv Zohar who's a co founder at QEDIT, has been starting to work on ideas exactly on kind of like how to have the consensus of the entire community on who do we allow to doxx, should we be faced with a misuse that we know how to characterize?

[30:09] 

It's very tricky but it has to be discussed and we don't want to be faced with the current immediate feature that we have right now is this. So use this, be forced to use features that are actually too revealing, like giving viewing keys or things like that. So anyone that wants to be engaged in tech ideas on this, I'm really keen and anyone who's around DC on November 30th, you're going to see a lot of progress in zero knowledge in general, but in particular there's going to be a bunch of conversations on this topic. Shameless plug.

[31:00] - **Jack Gavigan**

I'll add that topic to our future list of discussion topics. John, I'll coordinate with you. When's a good time to schedule that for so you can get Aviv maybe it might be interesting to see if we get Paul Brigner from ECC to join that discussion as well because he obviously has a lot of experience of talking to these folks. Any questions for John?

[31:34] - **Teor**

Yeah, so I haven't been part of the conversations about Zebra and testnets on Zebra mainly due to time zones. I think I'm at the opposite time zone to you at UTC+10. So I'm not sure if this has already been said, but currently what's supported in Zebra is forking the current testnet. So you can add another network upgrade to the current testnet with all of the things you need for a network upgrade, like the Consensus Branch ID and an activation height. And that's something that's quite easy to implement in Zebra. If you want to start an entirely separate network from the start, then as you probably know from your meetings with the other ZF engineers, that use case hasn't been on our list of things to design towards. So we'd have to schedule that work in over the next few months along with the other things that we're doing.

[32:44] 

So I guess my question would be, would it be enough for you to fork the current testnet or do you actually need to be able to run a completely different testnet from Genesis? Because the amount of development effort on our side is quite different.

[33:04] - **Jon QEDIT**

So I wouldn't be the right person to answer this, but I appreciate that you're asking. The meeting we had actually today discussed a little bit about it and basically what we're saying is, any solution that's good enough to start testing new formats of transactions we take. We can't be like maintainers of a fork of Zebra just for that. So I think we'll find something that is reasonably not too much work on your end and meets our criteria. But this is beyond my scope of knowledge.

[33:52] - **Daira Emma**

I mean, all previous network upgrades have been tested on forks of testnet and that includes Sapling and Orchard. So if it's not possible for ZSAs, then I would be asking what is different about ZSAs? But I think it is possible.

[34:12] - **Jon QEDIT**

The main difference is that when you do those forks, this is kind of like the main thing that the Zcash ecosystem is pushing towards. So you have everybody aligned. But if we were to do forks of ZSA on our side that don't interact, then we need to right.

[34:33] - **Daira Emma**

So I might have misunderstood. I was just saying that for those forks we only needed to fork the public testnet. But my argument was that in general, you just need to be able to fork a testnet. If you fork the public one in order to create a private one, then that should be sufficient.

[35:00] - **Str4d**

Yeah, that's effectively the thing we've done in the past is make custom binaries of the full nodes that at some predetermined height, go off and activate the rules for testing purposes and then just only give those binaries to the people who are doing the testing. So it's completely separate.

[35:19] - **Jon QEDIT**

Yeah, I heard something to that effect in the conversation, but it's lost on me so let's not even attempt.

[35:29] - **Daira Emma**

And we did have a private fork of testnet at one point. I can't remember what that was for.

[35:46] - **Teor**

Yeah. So maybe it's not helpful to go into the details here, but what we can do on the ZF side is come up with a minimal set of instructions for all of the things that you need to change to fork a testnet. And then I will pass that through our other engineers who are already in that meeting, and that's how we can get that information to you.

[36:12] - **Daira Emma**

All right, if I have this correctly, the ideal thing we're asking for is actually already in your issues. There's, like, a detailed description of what would allow to issue a sort of local testnet that's immediately available locally without any networking stack. But again, we can take this.

[36:43] - **Jack Gavigan**

Yeah, this is kind of relitigating a meeting that we've already had today, so I think you should catch up. Pili and the rest of the team. Any other questions on this topic? 

[37:07.] - **Daira Emma**

I think i remember what the private testnet was. For some reason the public testnet had stalled and we were testing a fix. I think that was it. Anyway, carry on.

[37:20] - **Jack Gavigan**

Oh, yeah, because didn't somebody point a whole load of hardware miners at testnet and then bump up the difficulty?

[37:31] - **Daira Emma**

Yeah, there was a rule that was testnet specific that was quite problematic and needed to remove it. Anyway, carry on.




___

### 4. Open Discussion i) - NU5 Retrospective 


[38:10] - **Daira Emma**

So, ECC has exited emergency mode, which is fantastic news and also means that we can start talking about planning the NU5 retrospective. So I think two things I wanted to discuss briefly were, first of all, do we want to do that retrospective on what I assume will be multiple arborist calls?

[38:41] - **Jack Gavigan**

Or do we want to have a separate schedule, separate meeting to do it? Then secondly what topics do we want to cover? So I guess the first question, does anybody have any strong feelings against doing the NU5 retrospective during or after the normally scheduled business on arborist calls?

[39:15] - **Daira Emma**

So I guess the disadvantage of that is that it makes the call longer because we have this bunch of stuff to get through, and then we do a retrospective thing. So that's going to be a very long call and might need an accessibility break in the middle at least. Whereas if it's a separate call then shorter.

[39:40] - **Jack Gavigan**

Yeah. I'm assuming that we wouldn't try and do it all on a single call that we would split it up into multiple topics. The other thing we could do is we could on a couple of Arborist calls skip a lot of the main updates and just say "this Arborist call is going to be focused on NU5 retro" and just do a very quick is there any important business to be raised or any important announcements that need to be raised up front and just rely on the fact that we effectively have two Arborist calls a month? So having four weeks between updates doesn't seem to be too unreasonable to me. But interested in hearing others thoughts on that.

[40:35] - **Daira Emma**

Sounds fine to me.

[40:41] - **Jack Gavigan**

Okay. What I might do then is I might look at scheduling the Arborist call in four weeks during this late time slot to be the first NU5 retro focused and we can target that. 

[41:03] - **Nate**

I just wanted to request if the meeting is 1.5hrs or longer, maybe it would be nice to have like a ten minute break in the middle because for really focused meetings like that, sometimes a break helps me. Is that something we could accommodate?

[41:25] - **Jack Gavigan**

Yes. I totally agree that having lengthy meetings without bio breaks is difficult, secondly to reiterate, I think that if we split up we figure out what topics we want to discuss and then chop it up into bite sized chunks rather than trying to eat the entire elephant in one sitting. I think we might have a better chance of avoiding having massively long meetings. So certainly my goal would be to chunk it up. 

[42:05] - **Str4d**

And just on that point, I know from my experience in past retrospective meetings that there are often things that will come up that cut across a bunch of different topic areas. So if we're trying to do it in this way where we break it up into pieces, we will need to be conscious of limiting how much we go down on tangents to focus getting through individual topics.

[42:40] 

Also I think there may be a benefit to in addition to having those more focused ones, maybe having one. I don't know whether it be making more sense at the beginning or the end, of one that enables more looking into those cross cutting issues, if that makes sense. Because I feel like topic focused ones are not the right space to discuss those, but I think it is important that we have a space to discuss those.

[43:11] - **Daira Emma**

Yeah. So that probably makes sense to be the last of these meetings because then we will know what things we want to discuss in that way.

[43:21] - **Str4d**

Yeah. So if while we're in. The meetings, doing the more in depth things, and we identify things that are cross cutting. You can be like, okay, we're not discussing this now. We'll cut this off but we'll put a pin in it and bring it up at that more cross-cutting meeting.

[43:38] - **Jack Gavigan**

To that end, I'm about to share a Google doc an NU5 retrospective Google doc with Zooko, Daira, Str4d, Kris, Sean, Pili, Teor, Marek, Alfredo, Conrado, Arya, Jon from QEDIT, and Nate.

[43:59] 

If we need to add anybody to that, let me know. But it's literally just a barebones Google doc. All it's got at the moment is a list of three topics, and we can add to that. We can put comments and notes and whatnot in it. So I'm literally hitting send now. You should all receive that into your inboxes shortly. I guess maybe the best way to describe that topic, that sort of topic, Str4d is kind of meta topics or cross-discipline, so I'll just add that now. 

[44:44] - **Nate**

I just wanted to request that we don't skip the sort of normal status update agenda for too long. So if new content keeps coming up in retrospective, we might be tempted to keep chewing through that. And I just don't want to starve out the status updates because I think they're always pretty valuable. So maybe skipping one session or two sessions might be okay, but once we get to more than a month, I start getting nervous about losing momentum or awareness of all the different things that are going on.

[45:28] - **Jack Gavigan**

Well, my thinking was to kind of have alternating so I feel like the earlier Arborist call slot, it feels like everybody who's on this call is able to attend that call as well. Is there anybody here who cannot attend the 15:00 UTC Arborist call?

[45:56] - **Str4d**

I cannot until the end of November.

[46:06] - **Teor**

I cannot because it's 01:00 for me.

[46:09] - **Jack Gavigan**

Good point. Okay, so if we do the regular updates during the earlier slot, we will have people from both organizations on and as well from QEDIT and from Equilibrium who are based in Europe. We will miss out on Teor and str4d while he's wherever he is. But I think that's an acceptable compromise because we still have people from their organizations on those calls.

[46:59] 

Basically what I'm thinking about is we keep the updates on the earlier time slot calls, so we have the maximum gap between updates would be four weeks, and then we use the later calls to focus on the NU5 retrospective topics.

[47:21] - **Daira Emma**

I don't know what the answer to this is, but is there anyone missing on this call who would want to be involved in the retrospective and can't because of timezones?

[47:38] - **Str4d**

I don't have an answer to that question, but mine directly follows from this.

[47:47] - **Jack Gavigan**

Short answer is I don't know. I think there are some ZF people who need to be involved in the retrospectives who don't normally attend these calls, Pili being a good example. I'll chat internally to see if that's something that they can accommodate and/or provide notes that their colleagues can bring to the meeting. What about from the ECC side? The only person who I think might have input is Sean.

[48:41] 

I don't think Sean is here at the moment.

[48:46] - **Str4d**

Timezone is the same as Kris and others in Central America. By Central America, Central US and by central US, I mean midwest. I don't know.

[49:06] - **Jack Gavigan**

I was only just today researching Native American names for the American continents for a story that I'm writing. It's fascinating.

[49:23] 

I'm going to resist the urge to go off on a tangent about Native American stuff. Str4d.

[49:28] - **Str4d**

Yeah. So my follow on related point was it's been long enough since the NU5 development and release process that there are people who have since moved on to other ecosystems and it would be worthwhile reaching out to them to see if they are interested in attending any of these particular retrospectives, to be able to give input and feedback. It would be helpful for them I expect if we have a more defined like on this particular call, we'll be discussing this particular subtopic and focusing there. Versus this one, we'll be discussing the more general things so that they have the ability to sort of find time to attend the ones that they're interested in giving feedback on.

[50:29] - **Jack Gavigan**

Yeah, agreed. I can think of at least two people in this document, we want to put together a list of people to invite along.

[50:48] - **Str4d**

Which makes it even more important that we're careful with sticking to the scopes of what we're discussing in each of those subsections so that we're making their time if they do turn up.

[51:05] - **Jack Gavigan**

Great. Anything else on the scheduling? Do we think it's safe to try having the first NU5 retrospective session in 4 weeks time? Any objections to that? Or does anybody think it's not safe to try and then we can see how it goes?

[51:33] - **Daira Emma**

Just going to check my calendar. Pretty sure I'm free.

[51:52] 

Sorry. So that's in four weeks?

[52:42] - **Jack Gavigan**

Okay, let's give that a try and then let's talk about what topics do we want to cover. So I've come up with timeline and I guess that blends a little bit into the sort of network upgrade process as well.

[53:03] 

Scope, which also blends in with the process. And I think it's worth doing a Sandblast post mortem. I'm conscious that there are two aspects to this. Number one, the technical thing, and then number two, what lessons can be learned for future network upgrades? Does anybody have any comments? Anybody have other suggestions for stuff we should discuss? 

[53:46] - **Teor**

One of the things that happened, I wanted to talk about how we change timelines, because it was kind of the original timeline and then there were multiple amended timelines, but maybe we can discuss that as part of the timeline item. I guess the reason I'm bringing this up is that some of the ZIPs we have are explicitly targeted at for NU6 are explicitly targeted at the halving. Maybe a topic to cover kind of external constraints would be useful because I don't know what there was for NU5 but they'll definitely be for NU6.

[54:36] - **Daira Emma**

Well there was for Canopy as well that was constrained to be on the previous Halving. That was a little bit fraught as a result, if I remember.

[54:48] - **Str4d**

And while there wasn't a directly a block height constraint there, there were other external constraints that affected things. So, yeah it's worth having a topic for that.

[55:03] - **Jack Gavigan**

Cool. I have added that to the list of topics in our little embryonic document. So far we've got timeline, scope, external constraints, sandblast post mortem, and meta/cross-discipline issues.

[55:22] - **Daira Emma**

So for the scope of the Sandblast post mortem, we can talk about the specific sandblasting attack, but I think we also need to talk more generally about our response to long running attacks and to what extent should we drop everything and respond? To what extent should we try to respond in parallel with other work, things like that?

[55:58] - **Jack Gavigan**

Yes, that's a good point.



___

### 4. Open Discussion ii) - NU5 Retrospective 


[56:00] - **Kris**

I mean, there's also a question of who is responsible for responding to attacks?

[56:05] - **Daira Emma**

Yeah, exactly.

[56:07] - **Kris**

Because that, I think, was a significant part of the problem in the response to the Sandblasting was that question did not and does not currently have an answer.

[56:29] - **Daira Emma**

And the future answer may be different to the past answer.

[56:34] - **Teor**

I think as part of the Sandblasting, it would be helpful to talk about who's responsible for monitoring the network as well, because that's a separate thing to once we know there's an attack, what do we do about it and who's responsible? Because I think that's a helpful discussion point.

[57:07] - **Jack Gavigan**

That's a topic I would love to have the equilibrium folks join for because they are pretty much the closest thing we have to a network monitoring team at the moment. 

[57:23] - **Str4d**

Two points here. Firstly, maybe this is just a meta topic for the meta thing, but like there's there's a distinction between it sort of crossed a couple of things. You have a specific Sandblast postponement which is not part of it's not an NU5 retrospective. Like, this is really outside of the retrospective for NU5, but then we separately have the effect of that on NU5, which sort of cuts into it touches on external constraints and more of a meta issue. But maybe it sort of gets a bit of what I think Daira said before. How do we respond to that and how does the responding to something like that interact with other things.

[58:30] 

I don't know the best way to frame that. The reason I'm saying this is I don't want to take away from doing a good post mortem on the sandblasting issue by tying it into NU5.

[58:48] - **Daira Emma**

I agree. I think those should be completely separate, actually, because although they did interact...

[58:56] - **Str4d**

That's why I'm saying I think we should have that sandblasting post mortem on its own, but then have it at a point where we can then take what we discuss from that and feed it into the NU5 retrospective. So maybe as long as we've had it before the meta meeting, then maybe that's sufficient.

[59:17] - **Jack Gavigan**

What if we schedule the sandblast post mortem first?

[59:21] - **Str4d**

I mean, that would almost probably be easier because it's the more recent one and we probably have more of it in our working memory.

[59:31] - **Daira Emma**

I'd be fine with that.

[59:33] - **Jack Gavigan**

One thing I think it's important to talk about is obviously we have the benefit of hindsight, but going forward, what should we do as part of our network upgrade process to avoid similar situations in the future? We do things like if we have new crypto, we need to have a security proof, et cetera.

[01:00:09] - **Daira Emma**

I mean, we so we did have a security analysis for Orchard. Were you meaning to tie that into the sandblasting issue? Because we i think had not done a worst case analysis of denial of service attacks,

[01:00:34] - **Jack Gavigan**

I think, yeah, that's what I'm okay, yeah. I'm not trying to say that a problem with Orchard because of sandblast. I'm using the fact that when we're rolling out new crypto, we require a security proof. Are there other similar requirements that we should apply? Or should we have a red team that comes in and deliberately looks at both the current and future protocol and say, Right, actually there's this massive issue that you either haven't recognized or have underestimated. There's no answer to this. It's just a topic of discussion that I think it's important to discuss.

[01:01:25] - **Str4d**

So continuing on. The third thing is this is sort of scope, but it's not quite scope sort of like I feel like there's probably a fair bit to do to look at in terms of retrospectoring on the implementation and the process.

[01:02:05] 

It has some interactions with scope in terms of how emergent complexity and things was discovered and handled. But there are probably things that we could talk about in the actual engineering process of what was a big, complex feature that we can probably elucidate some insights for going forward, for future large cross cutting engineering improvements or even just thinking in terms of some of the stuff that qedit was mentioning earlier about how these larger scale changes interact with the rest of the protocol and how deployment of those and testing of those interact with the rest of the protocol in light of other teams doing other things in the same similar code bases. So maybe there's enough there that deserves its own topic i'm not quite sure. 

[01:03:16] - **Daira Emma**

So there's a difference between a retrospective and a planning for future upgrades and we seem to be conflating those. I'm a bit concerned that if we do, then we will not have enough time in the scheduled meetings to do a thorough job of the NU5 retrospective per se.

[01:03:46] - **Jack Gavigan**

Agreed. I think we need to separate out the sort of post mortem approach versus and then identifying lesson and then there's identifying lessons learned that we can then carry through into future planning.

[01:04:02]

Yeah, identifying lessons is always a part of a retrospective or an effective retrospective, but that is a different thing than planning future upgrades.

[01:04:14] - **Str4d**

Just to be clear, that's not what I was saying. Daira.

[01:04:19] - **Daira Emma**

No, it wasn't just what you were saying. It was the thread of the that.

[01:04:26] - **Str4d**

Sounds like a response to what I said.

[01:04:27] - **Daira Emma**

Not directly.

[01:04:33] - **Str4d**

In the case of my one, what I'm thinking of there is I was referring to qedit, which is obviously about future planning, but I'm sure there are things that we will think of if we're sitting down, having a discussion about that that would have gone better had we the benefit of hindsight that we now do.

[01:05:00] - **Jack Gavigan**

Let me just switch my share to show you what I've got so far. So we have sandblast post mortem, specifics of the attack, a response, long running attacks. Who's responsible for responding to attacks, monitoring the network..

[01:05:26] - **Str4d**

I've just remembered my point. So your how to avoid was about, I would phrase it as "how could we have more easily identified this as being a potential problem?" Or something like that. Which is kind of what security proofs are trying to do. Is there something we could have done there? 

[01:05:49] 

But maybe relatedly. The thing I was trying to remember was how we deal with tech debt. Because there's definitely element of that in the sandblasting post mortem, but we could also bundle that in with other tech debt approaches as well if we want to.

[01:06:18] - **Jack Gavigan**

Yeah, tech debt is a big one, isn't it? Okay, so how to avoid similar issues in the future that links to the tech debt discussion? Do we have something like a red team, specify that as an example. We want to talk about the timeline because I think timeline obviously the foundation engineers were working to add NU5 to Zebra and the shifting timeline made things a little bit difficult there.

[01:07:23] 

But I think as we go forward with a more multipolar ecosystem, we're going to need to have a timeline. I think that's more consensus formed, I guess, rather than simply one organization saying, right, this is what's going to happen. Scope and complexity and as str4d alluded to emergent complexity, how we deal with tech debt, external constraints, & I feel like external constraints that may end up cropping up in different places and then meta or cross-discipline issues including the effects of the Sandblast attack on NU5.

[01:08:17] - **Daira Emma**

Yeah, there's a lot to talk about in terms of complexity budgets because obviously people are going to have different opinions on what complexity is actually reasonable and we have been extremely ambitious in a lot of previous upgrades.

[01:08:44] - **Teor**

I think with scope might also help to distinguish pre activation and post activation work because I think that was another part of the scope of NU5 that was tricky. There were a lot of things that needed to be done before activation & then there were other things that were follow ups mainly from the ECC side that effectively extended the network upgrade for them, but not much at all for the Zebra Team because of our feature set. So distinguishing those would be helpful.

[01:09:24] - **Daira Emma**

Yeah, I mean that was the main interaction of the Sandblasting attack on NU5, derailing the work that we would otherwise have done to support Orchard after the upgrade.

[01:09:42] - **Jack Gavigan**

We are coming up to time and I want to be respectful of people's schedules. I feel like we've got done a good first pass at this and I'm sure that it will shift and evolve. You all have the links to this, so feel free to edit, put in comments and suggestions and whatnot, but let's leave it there for now.

[01:10:05] 

The only other topic that was on the schedule, if I can figure out where my presentation has gone was to talk about NU6 planning. But we kind of touched a bit on that, I think sufficiently earlier when we were talking with John and I think we all agree that it's important to do the retrospective and to be able to take the lessons that we learned from that going into the planning process for NU6.

[01:10:57] - **Daira Emma**

So Pacu asked on the chat, who will facilitate the meetings?

[01:11:05] - **Jack Gavigan**

Would someone like to volunteer?

[01:11:15] - **Daira Emma**

I volunteer to take notes.

[01:11:18] - **Jack Gavigan**

Okay. Any volunteers to facilitate Teor?

[01:11:24] - **Teor**

I'm happy to facilitate, but I think it'd be good to have multiple facilitators. So if there's a topic that I want to speak about, then we can kind of swap out. But yeah, in any case, I'm happy to help.

[01:11:44] - **Jack Gavigan**

Thank you. Let's start off with well, actually, the first topic is going to be sandblast Daira I suspect that you may be more interested in participating in that discussion than in notetaking.

[01:12:01] - **Daira Emma**

That's a very good point.

[01:12:05] 

I'm going to have opinions regardless, but I can type at the same time as having opinions.

[01:12:09] - **Jack Gavigan**

As, I guess we're all forgetting that we do have a notetaker who attends these meetings and then uploads notes to GitHub.

[01:12:24] - **Daira Emma**

That's true. Yeah. So we don't necessarily need someone who's attending as a participant to do that.

[01:12:37] - **Jack Gavigan**

And obviously they are recorded as well so we are able to go back if necessary to check on things. I think the key thing that's going to come out of these are agreed points or agreed future action items or recommendations or something. Those, I think, will hopefully be relatively succinct. Fingers crossed.

[01:13:07]

Like I said, there's another kind of notes that you take during a retrospective, which are more edited conclusions rather than a transcript of what was said. So I think we can probably all cooperate on writing those.

[01:13:37] 

So we discussed a little bit of network upgrade planning earlier when John from qedit was on, so I don't think we need to do that again.

[01:14:00] 

Next arborist call will be a regular call, so no retro on the 16th November in the earlier time slot so thank you all.


_____


### Attendees

+ Daniel (decentralistdan)

+ Daira Emma

+ Jack Grigg

+ Jon Rouch

+ Kris Nuttycombe

+ Marek Bielik

+ Michael Harms

+ Nate_ZEC

+ Teor

+ Zooko AtECC

+ Oleksandr Putyak

+ Pacu ZWCD


**Next Meeting Scheduled: 15:00 UTC November 16th 2023**


___
___
