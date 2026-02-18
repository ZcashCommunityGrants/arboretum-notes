## Arborist Call 118 Notes 

Meeting Date/Time: 5th Feb, 2026. 15:00 UTC

Meeting Duration: 55 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update[zebra 4.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

Former ECC Core Update [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino)/[Zcashd, librustzcash](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcash-deprecation-updates-former-ecczf-zingo-labs-pacu)/ [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit--zcash-shielded-assets)/[Nsm, crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--nsm)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=22YcmN1PPsc)

Moderator: Pili

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:00:50  

welcome everyone to today's aborist call on the 5th of February 2026 the agenda for today's meeting as usual, we will start off with some updates from the teams working on core Zcash stack, so the Zcash Foundation, the former Ecc team and zingolabs. Then we will follow up with updates from teams working on research and implementation of new features, such as qedit and shielded labs. And then finally, we will open the floor to participants for any announcements or any discussion topics that may be of interest to everyone. So what is the arborist call? It is a bi weekly call where Zcash protocol contributors meet up to discuss and update protocol research and development efforts design implementation of new protocol features, and we identify blockers and then resolve the issues. And the purpose of this all is to try to make Zcash protocol development accessible to everyone and to provide more transparency for interested parties. So anyone can register to attend at Zcasharborist.org and if you want to become more involved and present, you can email us at our at arboist.zfnd or  request a presentation slot. outside of the aborist call. You can participate in the Zcash community by applying to one of the grants programs and taking part in community discussions in the Zcash R and D discord or the Zcash community forum. And there are clickable links for all of these at Zcash aborist.org So with all that said, we can get started with some updates on zebra from the foundations engineering team and Marek. Please take it away.

## Zebra Update 

Marek: 00:02:57  

So we'll be releasing zebra 4.1 either today or tomorrow. And the main improvements are new Prometheus metrics and Grafana dashboards. They are ready for integration with the z3 stack, and we plan to use them to identify any potential bottlenecks in Zebra's performance as well. Another change that this release contains are new mempool checks for standard transparent scripts to match Zcash D. And this was community contribution, and I noticed we had a few inquiries related to shielded Coinbase transactions. The work there is done, and we tested it by producing a block with a shielded Coinbase on mainnet. We're currently reviewing that work, and if you want to use that you need to use the PR that implements zip 213, for now, and that's all I had for this Update.

Pili: 00:04:16  

Thank you, Marek, and congratulations on mining the mainnet block.any questions for Marek? Okay, let's move on. Core stack updates from former Ecc team. Who's going to be talking about that today? I'm here. Thanks, 

## Former ECC Update 

Str4d: 00:04:47  

So for the last couple of weeks, the main focus has been on Zallet work in terms of the dev stack. So we've been ramping up in getting various backlog things through that have been sitting there over the holidays, we've started building the ideal RPCs for people to interact with. So there's a draft here for fuzzy, get balances, which is hopefully eventually just going to replace all the other balance API's. There's some work that's been done on pczt based transaction code instruction from a third party community member. But there's also some sort of, like, more targeted, like, zcmi replacement stuff that's been worked on at the moment, and figured out we had various underlying refactors that we've been doing as well. We got the low level refactor  khris has been working on for Zcash client backend, which is intended to make more of  the logic that sort of grew over time inside the Zcash client SQLite library, which powers the mobile SDKs, zallet and zashi, more of that logic available to use for other backend implementations, in particular The Zcash client memory crate, which sort of has some of it implemented in parallel, and then some of it just has not been sufficiently able to be easily maintained, I think, because of there were bits of the needed duplication. So this refactor should hopefully make it easier to maintain those kinds of like builds on top. If you're using custom backends, there's progress going for you, keep moving, keeping up with checking on Zaino updates and making sure that those you know figuring out what remains for integration into zallet. There's still some things about the chain index traits that don't work for Zallet yet, but keeping a close eye on those. kris and I helped coordinate with the shieldedlabs and Zcash foundation folks to get the first round of community coin holder fund disbursements out earlier this week. So then that led to many thoughts and issues on my side in terms of how to make multi Sig workflows nicer to use. So I guess it's good that we are currently forced to go through a somewhat manual process to do them, but I'm very much looking forward to us not having to do that, to that point, I'm expecting in the next week or two, we'll be picking back up the work on both P2sh multisig and, you know, we're starting with P2sh multisig in the Keystone firmware that that Greg has been working on, he was working on sometime last year. And yeah, we're picking that work back up with the goal of making the p2sh style disbursements easier to do in future and easier for everyone else to use. I think there's been, on the zcashd side, a little bit of maintenance work, but not too much, just needed attention there. And then, yeah. And I guess the other thing is that we've started reviewing and a bunch of  PR starting to appear on Zallet. So thank you very much for those. Keep them coming. We will keep reviewing them and and giving feedback as as needed. And yeah, we'll just continue churning out API improvements there.

Pili: 00:09:06  

Great. Thank you. Strad Alfredo,

Alfredo: 00:09:11  

yeah, I noticed that there are a bunch of new PRs in the zallet side, and I was wondering if you guys need some review help there, or you think you will handle them all.

str4d  9:21  

I mean, I will happily take review comments on the PRS that are up, we will probably still be reviewing them ourselves as well, but particularly for the things that people think they'll be using downstream. So, like, I put up a PR a couple of days ago for a get wallet status API, which is the thing that you'd requested for making ,the test  framework makes it easier to to keep the wallet in sync with the tests. So I've put up an example or draft of what I think would be there. Would be great if you could review that.

Alfredo: 00:10:05  

Okay, I'm happy to take a look at that. Yeah, I think I made another request that wasn't able to spend I don't remember exactly who it was, but I'll let you know it was before the end of the year. So I can't remember, but I remember it was stuck in the test for some other reason that I would like to either try to make  myself or request someone that could do that work. But anyways, yeah,

str4d  10:38  

If we identify the particular tests that are struggling there, then we can figure out if they are tests that we expect we have to rewrite the test for, or if it's missing potentiality that we can get onto the backlog, right?

Alfredo: 00:10:50  

Yeah, and I'm happy to take a look at some of the other open PRs that are there at some comments as well. But, yeah, great stuff.

Pili: 00:10:58  

Thanks, Hazel.

Hazel: 00:11:05  

Yes. Str4d, you mentioned something about pieces of chain index that still aren't working for your use cases yet. Is that just related to being able to serve data when zaino isn't fully synced to the node yet. Or are there more pieces that need to change

str4d  11:30  

The other piece that I'm aware of that's missing, which I think I raised with Zingo labs, like October, November, maybe a bit earlier, is that the sub tree roots aren't accessible through the chain index API, sub tree root, okay, I must have gotten lost somewhere. I will make a note of that. (Str4a) It's, it's definitely, I checked and it is, it is listed in the like list of things that came up, but yeah, hasn't been addressed yet. So once, once that gets in, I think that's from memory. That's the only thing in the migrated chain, index, PR, that is currently just mocked up with a to do. Once those are in there, then I'll be able to, like, make further progress on figuring out if there's more things that need that are missing. Okay, great. Thank you.

Pili: 00:12:23  

Any more questions for str4d?

str4d  12:28  

Yeah, there was, like, obviously there was like, zip related stuff as well, but that's not part of the core piece here, so we can talk about it later.

Pili: 00:12:37  

Great. Okay, thank you, str4d Let's move on zingo labs and zaino

Marek: 00:12:50  

There's one thing that I forgot to mention in the zebra update, and that's that we added Zaino D to the QA RPC framework reported from Zcash D to zebra. Yeah, that's, that's all. .

Pili: 00:13:19  

Thank you. Marek, awesome.Cool. Hazel, are you delivering the zingo labs update today?

## core stack updates, zingo labs zaino

Hazel: 00:13:24  

Yes, we're in mostly the same spot we were in last arborist call. We're still working on the last couple of pieces that we need to release.

I'm hopeful, pass through will land today, but there's still some local cache removal, and apparently we don't serve sub tree roots yet, so there's that too.

Pili: 00:13:54  

Okay, thank you, Hazel. Any questions for Hazel? No,

Pacu: 00:14:03  

Hazel, I think yesterday, we talked about something we needed to ask Str4d, and I can't recall what oh, it was to you.

Hazel: 00:14:15  

I'm not sure if this is a question for specifically str4d, but str4d is one of those people who knows everything. So you might know the answer to this. Zaino currently only properly handles transparent paid a public key and script hash addresses, and apparently there are some non-standard transparent addresses floating around. Do we need to support them meaningfully? I guess

str4d  14:50  

support in what form are you asking?

Hazel: 00:14:54  

I'm not sure. Like when I look at the Zcash protocol and LibrustZcash code, I see a number of things that say that the only kinds of transparent addresses are P2pk h and p2sH.

str4d  15:08  

So that is correct. So if what you mean is an encoded address format, then yes, there are only p2p k h and p2sh addresses. They're the t1 and t3 addresses. There are other kinds of transparent encumbrances that aren't representable with address. With those addresses, like the old pay to pub key stuff from very early Bitcoin that we still have under the hood, and just like arbitrary like non p2sh scripts that people write, yeah, those aren't representable as addresses, but they can exist. I don't know if they do exist. You have to check the chain. I don't think there's any need to support those because they aren't addressable in the same way. You can't give out a payment address to one of those. Though, if you're using those kinds of things, you're you're doing something a bit more custom.

Hazel: 00:16:05  

Okay, I don't know enough about those things to even properly formulate the question I want to ask, I think. But yeah, generally, do our API's need to interact with them in any way other than serving like raw block and raw transaction data.

str4d  16:26  

Yeah, I guess the most I'll say here, and then we can take it offline, is anywhere that's interacting with just plain scripts, it should be possible to access the data for these scripts. Regardless, that should work, no matter what kind of scripts are going on, anything that's interacting specifically with addresses only needs to handle the address formats that are actually defined, and that is only P2pkH and P2sh. Okay.

Hazel: 00:17:02  

So I might have follow up questions, but I will need to chew on that one for a bit first.

Pili: 00:17:12  

Thank you. Any other questions for Hazel or otherwise? Let's move on. ZcashD Deprection updates. pacu, What do you have for us tonight 

## Zcash deprecation updates former Ecc,Zf, zingo labs pacu

Pacu: 00:17:28  

All right, yes, well, on Zcashd deprecation we've been working on a bunch of stuff, advancing a little bit feature parity with Librustzcash. So we added transparent data, serving transparent data through Zaino, like a few days ago, that's going to be available with a little on that branch or on the next release zaino does. And then we're working to update zaino to zebra 4.0 which is a pretty manual process because of the libraries that we need to update on zingo as well, all the Zingo crates. So that's in process. And then we put together this project, GitHub project, which is like an attempt at a dashboard thing, which it's for external contributors to look for opportunities to contribute to Zallet and it didn't have much action until, like, a few days ago. Apparently, Emerson felt like throwing a few PRs and, like, completely, a bunch of them. I don't know if I can, like, quickly share a window here. Let's see if it works.

Pili: 00:19:10  

I can stop sharing. If not, let's stop sharing, and then you should be able to share now.

Speaker 4  19:29  

okay. Do you see it? It's zallet  contributors board. I've been sharing this link on the weekly updates. You can find it there, and you have several tabs here, like, the backlog, one, unfortunately, GitHub, kind of, tracks everything. I take the work. Like, every now and then I try to  prune this and move things so it looks like reality. So a lot of things are in progress, and this view, like, turned into something pretty overwhelming. But you can see, for example, things that are in your review, things that have been done, and then the ready prioritize column. If things that are ready to work on and are sorted by priority, and they have a T shirt size, which tells you, like, how big of a task it is. And if you want, like, a simpler, less overwhelming view the contributors wanted, a view which has a list of issues that our contributors wanted. The criteria of this is that these are things that can be worked on and they're ready to work on, and we don't have, like, a specific urgency or timing dependency  on Zallet so you can, like, work on them as a free surfer, that kind of thing, free programmer or free contributor that you work when you can, when you feel about it, and there's you're not blocking on anyone. And we had a bunch of these, like 12, and apparently, like, I woke up one day and I have like half of them, or more than half of them with PRs already. So I guess we will have to look for more of these kinds of issues to put up in this board. So thank you so much  to Emersonian  young for these contributions. And yeah, keep them coming. And if you want to work on something and you can't find it just like, send me a message in the forums or in this burden, or I don't know, X, whatever you find me and like we're trying to, we'll try to do our best to find something you can collaborate with. So thank you so much.

Pili: 00:22:19  

Thank you pacu. Let me share the slides again. Okay, cool. Any questions for Pacu? Go ahead.

Marek: 00: 22:38  

Pacu, you mentioned you were going to bump the version for zebra D to version 4. It might be easier if you wait, I guess, until tomorrow, and then you can bump to the newest 4.1 and I know that we broke the compilation of Zaino-proto  in zebra 4.0 and that will be fixed in zebra 4.1. Nice.

Pacu: 00:23:12  

You mean, like the frost  libraries, like there were, like 14. Yeah.

Marek: 00:23:21  

I don't think those were an issue. I was referring to the issue that str4d opened, yeah, the

Str4d  23:35  

the zebra state, etc, were bumped in a path release to use zebra chain, for which is a breaking API change in and because those types appear in the public API of downstream crates, that's a breaking change in places like zaino, which then broke if you did a cargo update or try to start using them, it's one of those things which, like, it's easy to slip through, and there's not great tooling for detecting it yet.

Pacu: 00:24:06  

Okay, I probably got it compiling just by coincidence.

Str4d  24:11  

Yeah, if you're very lucky and you get into the right state, then you can work around it, but, but yes,

Pacu: 00:24:17  

okay, yeah, this one has some lore and magic on it, so it worked on it, but yeah, maybe in order the other machines 

Marek: 00:24:26  

Thanks for reporting that. And yeah, it should be fixed tomorrow.

Pili: 00:24:38  

Okay, thank you. Marek any other questions for Pacu, or comment Okay let's move on then to research and implementation updates, starting with qedit. Who do we have from qedit today?

## Research & Implementation Updates Qedit- Zcash shielded Assets

Vivek: 00:24:59  

Hi everyone. So yeah, like for the Zcash shielded asset side, the top priority has continued to be making changes on the basis of Str4ds orchard zsa review in the orchard crate. So we are mostly done with all the changes. But like recently, we've just mostly been involved responding to all the comments with like, pointing to what changed where, then what we've done. So yeah, alongside like that, the orchard zsa review also had some changes to the zips, mostly like minor things, with removing some redundant definitions and making some changes for example, the value burn was reduced to like be a U 63 so that it won't overflow or something when we like, mix it with other value balances. So I've made those changes as well on the zip. So there are a couple of open PRs, which will get merged or reviewed, eventually, soon. On the other side, there's also has been obviously knock-on effects from the orchard zsa  review , like those things move on to Librustzcash and zebra and so on. So we are on top of all those changes we've created PRs inside our versions of Librustzcash and zebra and so on we make these changes based on the changes that happened in the orchard.  The goal is that our stack is continuing to like work as it should. So yeah, this is all  connected to the orchard zsa  review, another parallel effort has been on the Zcash test vector side. So we caught up to upstream some time back, and we have now responded to all the comments made by Str4d and Alfredo. So I think one of the blocking changes was that we had made some formatting changes that affect all the files, and so we've moved those into separate PRs so there's now a PR 112, and 114, that do these formatting changes. And we have, like, reverted that. We've removed those things from PR 108, which is the ZSA changes, so that you can now, like, look at the test vector changes without those formatting changes coming in the way and making it like a lot bigger than otherwise. So yeah, so that, hopefully that removes the block that was there, so that should be ready for review as well. also we have, I guess, some updates on the asset swaps front. I've not really spoken much about that the last few months, because we reduced focus on that, because we were pushing for the Nu7 changes and the orchard review and so on. So yeah, we've continued to maintain the asset swaps branches as addition over zsa, the like, most recent changes that we've made, and like, more recently, we've also had, like, some more bandwidth. And so we are pretty close to having those completed and having working versions of that as well. So that is something that we'll probably announce more concretely in the coming weeks, this is like across all the crates, orchard, Librustzcash, zebra and the transaction tool. And speaking of transaction tool, we've also continued to maintain our single node test net that we have running, and we've added, I think, some improvements to like the sync times for like catching up to the zebra state and so on by  just having it store some amount of material in cash so that you don't have to start from zero and waste a lot of time just picking up those things for the testnet. So, yeah, that's pretty much what we've been up to.

Pili: 00:29:00  

Okay, thank you, Vivek. Are there any questions for Vivek?

Pacu: 00: 29:28  

vivek Have you folks been able to review or read the draft zip for the new proposed transaction format.

Vivek: 00:29:41  

So we have had a look. I've been looking at it recently, I'm still  making sure that I have it all in the right spot in my head, I'll probably have some questions about it, but  I'm just trying to make sure I have all the pieces right first. So yeah, we are looking at that.

Pacu: 00:30:03  

Yeah, yeah. I was asking, just because I remember that kris had asked the  working group, could take a look at that and just wonder if you guys were aware of it.

Alfredo: 00:30:14  

I was going to ask the same because in the context, for example, of the test vectors, we have created transaction v6 I think it is, and I'm not really sure if that is how it's going to end up being with this new proposal of the new transaction type. So I'm afraid that maybe the PRS get blocked for that, or I'm not sure how we're going to handle it.

Str4d  30:47  

The current v6 test vectors are still valuable for the current state of zip 230, so it's still valuable to keep those in sync. The main question is, when we get to the point of the extensible test vectors, that being in a state where we can, like, make a decision on whether we, whether we go with that or, or the 230, then, then that would be the point if we, if, you know, if we did make the decision, then we just swap over and replace the The v6 test vectors with test vectors for this one, the pieces for the ZSA stuff within them should ideally be easily applicable to migrate from one to the other, and then, like, We've not formally gone through like a zip withdrawal at the point where we've had, like, test vectors, that point in the past. But like, withdrawing zips is a thing we've done on its own in the past, and so we do need a process for handling that. So it just means we might have to either just go in and make a PR to remove them later, or do something in the test vector repo to make it clear that those are like test vectors for a withdrawn zip and that they don't apply to the network if we get to that point.

Pili: 00:32:11  

Got it. Thanks everyone. Any other questions? Let's move on.  shielded labs and the network sustainability mechanism. Who wants to talk about that?

## Research & Implementation Updates Shielded labs- NSM

Jason: 00:32:31  

I can do it. So for the NSM on the zip side, we updated the motivation section to zip 234, to better clarify the reasoning behind smoothing the issuance curve and redistributing block rewards that get burned through zip 233 that PR is currently under review and pending merge, we're also still waiting for the zip editors to review and accept updates that we made to zip 233 again, these add the requirements and privacy implication section based on feedback that we received from an audit report. Separately, we updated the NSM simulator and corrected the chart, and I believe those changes have now been merged. And then on the engineering side, as I mentioned on the last call, we've addressed reviewer comments and updated the zip 234, 235 implementation PR, and we're just waiting for those updates to be reviewed and merged into zebra. Related to that, we're waiting on clarification around how and whether build flags will be standardized, since that decision will ultimately impact the implementation work that we've done there.

Str4d: 00:33:47  

you said you were waiting on updates on zip 233, to be merged. It looks like those are merged in mid December so where are you? Is it that you weren't aware that the PR had been merged? Or is there a rendering problem we need to figure out 

Jason: 00:34:09  

No, I wasn't. I wasn't aware that the PR had been merged.

Str4d: 00: 34:10  

PR was merged in mid December and  it looks like they rendered as well. So yeah, they've been out for like a month and a half. 

Pili: 00:34:33  

Okay, any other questions? Alfredo,

Alfredo: 00:34:39  

I think in the zebra side, Conrado was reviewing the Nsm pr. I think he's here. Maybe can provide an update, conrado

Conrado: 00:34:51  

Sure, yeah, I reviewed it. I gave it some feedback on some things that could be improved. I think I ended up getting busy with other stuff. I think Judah went to schedule a meeting to talk about possible approaches. So, yeah, I need to schedule a time to do that. But I think it's looking good, but it needs still some some improvements to the PR

Alfredo: 00:35:20  

What about that big  sync flags that need to be sorted out

Conrado: 00:35:25  

we need to sort them out. It's a kind of a mess. I think str4d gave good feedback on the issue we created about the flags. So we just need to update the flags to follow that convention

Str4d: 00:35:42  

I think what we would probably want there is, is we might even want to just write up a zip, like a process that, or something that outlines how we coordinate on this, because, because those flags do have to match across the entire stack, across, you know, zebra, zaino Librustzcash, etc. So that may be useful for making sure that going forward, we're all coordinated the same way.

Pili: 00:36:18  

Okay? Any other questions or comments? Okay, let's move on cross link. Is that Nate today

## Research & Implementation Updates Shielded labs, former Ecc. Crosslink Trailing Finality Layer

Nate: 00:36:39  

So we did a workshop last week called 4c. In the overall process, we are approaching the end of the prototype phase. So the prototype, the workshop was that last week, I think, had, that has, like all of the functionality in terms of UX, we set out in the beginning to prototype, to demonstrate. So that's good, that it's approaching that stage. And we have one more prototype milestone that sort of, the way I describe it is put a bow on it. So the purpose of that is to begin transitioning towards making it, making cross link production ready. And next week, shielded Labs is having an on site. We're going to be discussing 2026 a lot. We haven't determined which goals we want most for milestone five, which would sort of wrap up the prototype phase one that we have been discussing, which is sort of launching a persistent feature testnet that continues throughout 2026 and continues to improve as the production version. Then another thing is we hired a mechanism design analyst, and they've finished their reports. Should be publishing it any moment now, so hopefully today and that's I'm pretty happy with that, you know,it points out where there are potential risks and ways to improve things. And since during this prototyping, we sort of stripped down the proof of stake stuff to make it super simple by relying on some simplifying assumptions consistently. So that makes these kinds of analysis easier, and then it's also easier to sort of analyze the proposed changes. So I'm looking forward to that we haven't decided if any of those changes we want to adopt, or if we want to explore different alternatives, and we intend to be repeating more analyzes like this moving forward. Yeah, I think that's it for today.

Pili: 00:39:44  

Okay, thank you. Nate. Any questions for Nate? Go ahead. Marek,

Marek: 00:39:54  

Nate, I think you mentioned the other day that you were interested in full blown custom testnets in zebra when I was working on the shielded Coinbase. Like part of that work was that I added functionality for generating custom Genesis blocks, which Zcash D supports. And so I thought that the functionality required for proper custom testnets was kind of complete. And I just wonder, like, what else is missing? If you can  compile  any list of functionalities that you would like to see that would that would be great, yeah,

Nate: 00:40:58  

we'll look at that, I remember there was one step that was sort of annoying, that required updating like test vectors and generating  like faking a Genesis block and such. I think we've just been reusing that each time we're doing a workshop, so it was just a one time cost, but we will. I think we should look at that again as we're setting up this new one, and also writing down any other snags, because I think that's the kind of thing. It's the kind of process you only do every now and then, and so people keep running into the same snags and needing to figure out how to work through them. But I'll pay attention in more detail and get back to you and check out that new change, is it like a custom Coinbase definition? Is that the new feature?

Marek: 00:42:12  

No, no. So I haven't pushed it yet, but I added a new command to zebra, something like z Brad generate Genesis, and you specify the parameters that you want the Genesis block to have, and then it will spit out the Genesis block that differs from mainnet or testnet. And then you can, you know, keep appending blocks to this Genesis block and that gives you a fully custom chain. I know that other teams rely on custom testnets, and so feel free to open issues on GitHub, for example, if you have  any requirements in this domain that zebra doesn't support yet. I just thought of that because I'm just assuming, like, right now, you use the Genesis from, like, the official "Zcash testnet."

Nate: 00:43:26  

so I might be confusing it with test vectors, but I can follow up more with you after this meeting. I might be confusing it with test vector changes, but there was, like this one off thing where we needed to use a script or write, like some throwaway code. So I'll go back and figure out if that was specific to Genesis block or test vectors or both.

Pili: 00:44:09  

Okay, any other questions or comments? Okay, let's move on. Then,

## Research & Implementation Updates Shielded labs- Dynamic fee

Mark: 00;44:28  

yeah. So we had an R and D call last night where we walked through much of the design that's proposed in the draft zip, and there was substantive feedback from mostly the zip editor contingent, and I am currently addressing  that feedback with updates to the zip and I will be making commits. I was meant to do it this morning, but I didn't have time, so we'll do it after the call.

Pili: 00:45:04  

Thank you. Mark, any comments or questions for mark on dynamic fees, Mark, I assume you still have your hand up from before, still raised for some reason. Okay, thank you. No questions on dynamic fees. Let's move on open announcements. Any open announcements from anyone actually have one? It's not that important. Oh, go ahead.

## Open Discussion 

Hazel: 00:45:42  

Not an open announcement, just a question that I forgot to write down the answer to earlier, the shielded Coinbase transactions in zebra, just to check my understanding of it, there's a PR that is draft, called ad support zip 213 that is apparently ready enough that it's been used to generate Coinbase transactions on test net, but I also see that it Has merge conflicts with Zebra mains. I'm just wondering where this is exactly

Marek: 00:46:27  

The conflicts are trivial. The reason why it's in draft is that it internally depends on like six other PRs that need to be merged first, and then this one will follow. And the reason the conflicts are there is that it's a bit older, and the reason why it's in still in draft is that I didn't want  to label it as ready for review, because there are the other PRs that need to go in first,  But I used the PR to mine a block on mainnet as well, and  it worked. And by the way, it's on the forum, the block reward for that block, like I offer it as a bounty for  finding two easter eggs that I hid in the block so whoever finds the Easter eggs can claim the block reward.

str4d: 00: 47:53  

I saw something about there being an easter egg. I didn't find it.

Marek: 00:48:03  

I thought it would be fun, because you know, that Zec was born directly in the orchard pool, and has never seen the old c++ code base and has never touched the transparent pool either. So yeah, and the Easter eggs are related to the goal that I think Zcash has. Yeah, that's all. So feel free use use the zip  213 PR and consider it production ready.

Alfredo: 00:48:49  

Yeah. So we have a bunch of PRs in zebra from last year that we are trying to sort out to get merged or fix whatever is needed. So I was wondering about that. I remember there was stuff in Librustzcash that was needed to be merged as well. Is that all merged already?

Marek: 00:49:11  

yeah. So the zip 213, PR depends on some trivial API changes in Zcash script which will need to be integrated and Released in Librustzcash, Librustzcash will need to update the Zcash script dependency. And then when this happens, then we can release the zip 213 implementation,

Str4d: 00:49:59  

which relevant PR is this 

Marek: 00:50:04  

this um so if you go to zip to Zcash script, there are three open PRs and, like, yeah, basically the only one is 283

Str4d: 00:50:39  

Okay, well, that's some draft. So that would need to be finished before it could be

Alfredo: 00:50:48  

that seems to make a function public, and then we need to create a release of Zcash script. And then we need to make Librustzcash to use that version, and then we can proceed to zebra, right?

Str4d: 00:51:07  

It's possible that it is already public. I will need to check, like that API is just for parsing a single op code. But I'm pretty assertive. There is a way of using this for parsing possibly bad op codes as a full script that is public.

Marek: 00:51:32  

Yeah, if you look at the PR description, I pointed to the exact spot in zebra where I needed that, that's like the only API change that I needed essentially

Str4d: 00:51:44  

I see, yeah, I think it should be possible to instead do this, rather than parsing as a single opcode, parse. It as a full script, If you use source script mod, yeah, so if you use the type, Zcash script from chain that will give you a script component of possibly bad op codes. And that is public and can be used to pass the scripts in the way you're trying to do. And then you would take the first op code that it gets as  the thing that they're trying to restrict.

Marek: 00:52:40  

Could you drop that in the PR description? Yeah, cool. Thank you.

Pili: 00:52:50  

Okay, thank you. My announcement is that I have a new signal and telegram. So if you've seen me change that on channels, it is me. It's not someone's not taking over my signal and is adding someone else, bit of housekeeping there. But yes, I have a new, new number for work related signal chats. Any other announcements from anyone? No,

going, once twice. Let's call it. Thanks everyone. The next aborist call will be on the 19th of February, at the later time of 21:00 UTC thanks everyone.

Next Meeting Scheduled: 19th feb.2026, 21:00 UTC
