# Arborist Call #56 Notes

Meeting Date/Time: June 29th 2023, 22:30 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro - [Change of Arborist Call times](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#0-welcome--intro---change-of-arborist-call-times)

+ ECC Core Update - [Zcashd / Lightwalletd & Shardtree](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#1-ecc-core-updates---zcashd--lightwalletd--shardtree-work)

+ Zebra Update - [Zebra 1.0.1 Patch release](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#2-zebrad-status-i---zebra-101-patch-release) / [Breaking Changes between Zebra / Zcashd libraries](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#2-zebrad-status-ii---breaking-changes-between-zebra--zcashd-libraries)

+ Research & Implementation Update - [FROST version 14 & Demos](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation-updates-i-frost-version-14--demos) / [Shielded Labs Zcash Sustainability Fund Development](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation-updates-ii-shielded-labs-zcash-sustainability-fund-development) / [ZSF ZIP editing](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation-updates-iii-zsf-zip-editing) / [Ziggurat Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation---iv-ziggurat-update) /

+ Open Discussion [Ledger App Audit & Blockers](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation---v-ledger-app-audit--blockers) / [Ledger App Audit & Blockers cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2056-Notes.md#3-research--implementation---vi-ledger-app-audit--blockers-cont)


Video of the meeting: [recorded]


Moderator: Dodger

Notes: Jason Rogers


___



## Full Notes

### 0. Welcome & Intro - Change of Arborist Call times


[01:51] - **Dodger**

You can apply for a major grant from the Zcash Community Grants Committee. You can also apply for a grant from the Filecoin & ECC grant program if your project benefits both the Filecoin and Zcash ecosystems. A good place to start chatting to other Zcash developers is the Zcash R&D Discord and there's the ever lively and exciting [Zcash Community Forum](https://forum.zcashcommunity.com) and you can find all of these links by pointing your browser at https://zcasharborist.org quick reminder that Zcon4 is coming up very soon. Registration is open and it is filling up fast. It is at the center of nearly a week of events, including crypto lounge experience that is happening the day before at Solo House in Barcelona, and then a ZK proof workshop the day after, co located at the same venue as Zcon. So book your tickets, book your flights, or you're going to miss out. Want to let everybody know that the Arborist calls will be changing in August. This slot will be moving to be earlier, 21:00 UTC rather than the 22:30 uTC that is currently scheduled in. This is to make it easier for people in Europe to join the calls.

[03:17] 

The earlier slot will stay at the same time. So the zoom links will be changing in August your old existing zoom links that you may have in your calendar or saved somewhere will be no longer valid. But just a note that the next call in the earlier time slot on the 27 July is unaffected. We will publish the new zoom links in early August after Zcon.  Zcon will mark the break between the old zoom regime and the new zoom regime. Moving on, let's hear from ECC. I'm guessing it's going to be Daira about how things are going with Zcashd.


___


### 1. ECC Core Updates - Zcashd / Lightwalletd & shardtree work


[04:45] - **Daira**

We've been working on the shardtree implementation and other things that are necessary for DAGSync and pre-DAGSync, which is a simpler version. Found a few bugs, doing lots of code review. That's about it, really.

[23:28] - **Str4d**

Well, I missed the rest of it. Sorry for being late because I was too busy and distracted working on the spendability lightwallet changes.

[23:38] - **Daira**

Actually, I did a fairly inadequate review of what we were doing in Zcashd because I've been quite distracted. So can you do a more thorough description?

[23:52] - **Str4d**

So ECC updates on Zcashd specifically or general?

[23:59] - **Daira**

It doesn't have to be Zcashd.

[24:01] - **Str4d**

Well, to give those updates, we have not really been doing much on Zcashd because we've been almost solely focused on the mobile wallet updates. So the current status of that is all of the changes necessary for the lightwalletd code to be amenable to non-linear scanning. So the entire stack was built on assumptions of you process all the blocks in a single order and we've finally finished unpicking all of those assumptions.

[24:43] 

And then the last PR that's up at the moment and that I am currently testing and reviewing from Kris is the one that implements the non-linear scanning component. So the previous ones did the changes to enable it to do that and also the migration to the [shardtree crate](https://github.com/zcash/incrementalmerkletree/tree/master/shardtree), which is the new crate that Kris wrote to do the new mechanism of witness updates for notes. Then this last PR is the one that starts using it fully or enabling it to be used fully by exposing the right APIs and logic to do the non-linear updates.

[25:31] 

So being doing a bunch of bug fixing on finding on that. Found and fixed a bunch of bugs in the Shardtree crate, found and fixed a bunch of bugs in this PRi've & I've just been sort of like bashing at it to try and get the last few performance issues out. I'm hoping this will be in a good state by tomorrow or early next week and then we can get that merged and pull them into the mobile SDKs for testing there. I think that's basically it as far as those changes go. Happy to answer further questions.

[26:43] - **Deirdre**

For the shardtree crate. I'm a little catching up because I was out but is there a new release for that happening? 

[26:52] - **Str4d**

It doesn't have a 0.1 yet it is currently an unreleased crate.

[26:57] 

Inside Incremental merkle tree.

[27:01] 

So there are three crates in that repository now. There's the Incremental merkle tree crate, which is now the home of all of the common logic, and it is also the home of the old Sprout and early Sapling era commitment tree logic that Zcashd was using. Then we have the bridge tree crate, which was the one that was written with the expectation that that's what we would be using for fast updates. That was written as part of doing Orchard & the moment that was written, it became obvious how to do it properly. We are no longer going to use the bridge tree crate for the mobile wallets as was originally planned. We're now using the shardtree crate. So the third iteration of going through these.

[27:47] - **Daira**

There may also be a design change, minor design change to the shardtree crate to use Ark for atomic reference counting.

[28:04] - **Deirdre**

That's what I was wondering about

[28:07] - **Daira**

I think we've concluded thats necessary to do parallelism properly.

[28:12] - **Str4d**

Yeah, I thought it might not be, but unfortunately, due to how the rustqlite crate is set up it does force it. Because I thought I could go the other direction of keep doing all the shardtree stuff in independent threads separately without send or sync, and then just load in a reference to the SQLite database into each thread as it needed it. But that doesn't work so for that bit of performance parallelization we'll just switch the crate to using Ark instead of RC.

[28:45] 

I still haven't got that parallelization working. I spent several hours today and just was failing miserably, so had to time box that, but I'll be trying that again probably next week because it would give another speed up on top of all the speed up's that we've already landed.  Then there's other similar ones that will probably land. Like the one I'm just doing right now is adding a caching layer because the process of upgrading an existing wallet is almost as slow as just rescanning from scratch. Because when we're doing the frontier updates and loading those into the tree, it's thrashing SQLlte so I'm just currently writing a caching layer which will hopefully make that performance issue go away.

[29:40] 

And then what we left with is just the fact that there is a bunch of commitment tree merkle path hashing being done in a single thread, which is the other thing I'm trying to fix with the parallelization of that piece. But everything else is pretty good throughput at this point. So the next step after getting that working is, as I said, getting it into the Android and iOS SDKs and starting to do testing of that on actual devices as opposed to my nice server with the 5950X, 52 threads and check what our performance things look like there. But all of that performance is related to improvements to linear scanning overall because the nonlinear scanning still has to do all the linear pieces to catch up, but the fast spendability pieces provide significant speed up's on top of that.


___


### 2. Zebrad Status I) - Zebra 1.0.1 Patch release



[05:30] - **Teor**

Hey, so we made the first patch release of Zebra a few weeks ago. So that's [Zebra 1.0.1](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.1) We really encourage people to upgrade to this release regardless of whether you're on a release candidate or the first stable release. We fixed multiple connection security bugs and panics and reduced CPU usage. So it's really important that people upgrade.

[06:03] 

We wanted to thank, in particular, dimxy from Komodo and the Ziggurat team for their help reporting these bugs and testing these bugs. So we really appreciated that people have been testing Zebra on the network and opening tickets and getting back to us really quickly about those and we're really happy to say that we've fixed a bunch of those bugs. The other thing that you'll see in Zebra when you upgrade is a cute welcome message in your terminal. So have a look out for that before it scrolls away with all the logs.

[06:40] 

The other thing we've done is that Rust 1.7.0 caused some bugs in our macOS implementation on shutdown. So we aren't building that anymore. It should still work. And even if it does some weird things on shutdown, your cache state should be fine but we just can't support that anymore because it does weird things with our tests. That's about where we're at. Any questions about zebra?


___


### 2. Zebrad Status II) - Breaking Changes between Zebra / Zcashd libraries


[30:46] - **Teor**

I kind of skipped over this in the Zebra update because it relates to work that we're doing that will be in a future release. But currently we're working on matching the changes to Zcashd rpc's in 5.6.0, so that's what's been called fast spendability for wallets. And so that'll help us be as fast as Zcashd is with the latest version of Lightwalletd.

[31:12] 

So as part of that, what happened is that we were using an undocumented and as we found out unsupported serialization format to store note commitment trees and then the dependency updates from ECC removed that format & that's totally understandable because it was always going to be a breaking change to change those structures because they're just not the same shape they were before. So there's no way to match the serialization format without some conversion code. So we've gone through the process of writing the conversion code from the format that wasn't officially supported, that's still stuck in our database, to the latest format which we'll be using for the RPC's, which is necessary to get some of the information out of the RPC's. So that seems to be working but that has  slowed down our progress on that because it was a bit of a surprise.

[32:18] 

Is there a way to let us know when there is a breaking change coming or a big change coming so that we can maybe start work on that early or do things to avoid that breakage? I'm thinking of similar examples that we've had in the past around the Zcash script library where there's been a big change and so we've needed to pull in more dependencies to Zcash script or rewrite some code. Just thinking about how to make that easier so that the ECC team isn't trying to rush patch releases or whatever to their crates after Zebra discovers there's a problem. But also Zebra isn't slowed down by surprises in various updates.

[33:26] - **Dodger**

This may be something to raise with Nick.

[33:29] - **Daira**

Sorry, can you repeat the question teor?

[33:32] - **Teor**

So the question is are there ways to let us know earlier when there's a breaking change coming? And that'll go both ways because sometimes it's libraries that are maintained by the foundation and sometimes it's libraries that are maintained by ECC. And then the other question is, is there a way for us to minimize that breakage so that we're not asking you to apply patches and do patch updates and we're not slowed down as well. So two different questions about letting us know and then how we over the longer term decouple these dependencies a bit more.

[34:18] - **Str4d**

Well anything that ends up as breaking, we document in our changelogs and we try to document those as we go. We don't always manage to catch everything, but for the most part, the changes that are in flight and proposed for the next release are documented in the main branch in the current state of the changelog so that's probably the best place to be looking to see if there's something coming up that hasn't been mentioned.

[34:56] - **Daira**

We can try and use the library's channel

[35:00] - **Str4d**

We can try and post more there if there's something that we think might be affecting.

[35:08] - **Daira**

But don't rely on that because it's very easy to forget.

[35:13] - **Str4d**

Yeah, that's probably the most reliable place at the moment to be aware of those kinds of changes is the upgrade. Like Alfredo says, the serialization changes in particular, the stuff that we've been adding in serialization is versioned, but this one happened to be a slightly more problematic because it was an implicit serialization that didn't have an explicit version that's the other solution is just we won't do any more of those.

[36:02] - **Teor**

Yeah, just to follow that up. I think on the Zebra side we learned that we really shouldn't be depending on undocumented interfaces and particularly for things that we stick in the database and we think this is the only instance of that. So that's great for us.

[36:18] - **Str4d**

It's definitely an interesting one because I know Zcashd database formats are either slightly more malleable or we're just so used to reindexing that it kind of ends up not mattering. Whereas Zebrad going for the very clear, if it's more than x blocks old, then it is rock adds a new layer of keeping track of things that we need to factor into subsequent changes to crates.

[37:00] - **Teor**

Yeah, just to clarify there, we used to do a big rebuild whenever we made a breaking change, but that's getting much more expensive now that the blockchain is hundreds of gigabytes and much slower as well. So what we've just merged over the last few hours is a way of doing an in-place upgrade. So like a reindex, but hopefully a bit more performant. So, yes, that was our alternative here which was to overwrite or update the format to a supported one and we might do that at some point in future. It's just not necessary at this point, so we won't be doing it right now.

[37:54] - **Daira**

I noticed you said fast spendability. I think we've decided to change the name to 'spend before sync'.

[38:06] - **Deirdre**

Is this the fourth name? I think there's been a lot of names and things going around.

[38:11] - **Daira**

I can't keep track.

[38:14] - **Deirdre**

It's fine. I'm just amused.

[38:17] - **Str4d**

Well, the name was for something that was like a fragment of something else. So something else had the name, but the fragment sort of didn't.

[38:29] - **Daira**

It was never an official name.


___


### 3. Research & Implementation Updates I) FROST version 14 & Demos


[07:29] - **Conrado**

Hi, everyone. So what's going on with FROST. The [version 14](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-frost-14) of the specification was released this week. The main differences is that it includes the hashing the public key in the blinding factor computation that I mentioned before. There was no objection in the list, so that was added to the spec and defined the test vectors that are updated for hopefully the final version. So, yeah, I think it's now pretty close to done.

[08:03]

On the implementation side, Chelsea realised that the Re-randomised crate that we for which we use it with Zcash, for example, to use FROST with Zcash, the design could be simplified. You can basically build the re randomized version on top of vanilla FROST so you don't need to actually modify it so that was nice.

[08:34] 

We added documentation being reviewed but its now much simpler than was before. The audit is ongoing, they looked first at the ed2448 Goldilocks crate, which is the crate we use to support the ed2448 curve, because  both spec and our implementation support cipher suites and that's one of them. That was the one that had a less known, less used library. So we asked them to look into it and they found 3 bugs, nothing super major.

[09:17] 

We already fixed it so that's nice. They look next into FROST core, which is the main part of the FROST implementation. The demo that we are working is very close to them in the community call mentioned earlier, which is about challenges on using FROST with the Zcash, how to integrate with wallets and so on. So that will happen probably next week. So I invite everyone who is interested if you work on Wallets or if you're interested in how to use FROST, it's more oriented for developers.

[10:00] 

But of course, everyone who is interested is welcome to attend. My idea is to talk about the challenges and try to figure some things out. But hopefully this conversation will continue at Zcon because there will also be a session about FROST in wallets, a bit less technical, hopefully. everyone is also invited to that.



___


### 3. Research & Implementation Updates II) Shielded Labs Zcash Sustainability Fund Development


[10:58] - **Jason McGee**

Hey. So I'm here today on behalf of Shielded Labs to announce that we've started development on the Zcash sustainability Fund. After a few months of gauging community sentiment and soliciting feedback both publicly on the forum and in private. So Shielded Labs hired a couple of engineers from the Equilibrium Group as contractors to do the development work. Mark Henderson is here as well, and he's going to be overseeing that work. The first milestone for the project is just to write two ZIP's. One is to establish the sustainability fund on the protocol level, and then the second is to modify the Issuance schedule.  We plan on following the ZIP process outlined in ZIP-0. But Mark, I think do you have any questions about the ZIP process or is there anything you wanted clarification on?

[11:50] - **Mark Henderson**

Hey, folks. No, I guess just nothing in particular. But if there's anything that the ZIP editors would like me to keep in mind as I start this process, any helpful tips there would be very useful. Happy to follow the stated process.

[12:22] - **Mark Henderson**

Any tips that the ZIP editors have? Like you, Daira anybody else.

[12:34] - **Daira**

Yeah, discuss that in the ZIP's channel on the R&D discord.

[12:39] - **Mark Henderson**

Sure, no problem, thank you.

[12:42] - **Jason McGee**

Thank you.

[12:49] - **Deirdre**

Yeah, agreed with Daira said, I'm also throwing a link to [ZIP-0](https://ZIPs.z.cash/ZIP-0000), which is explaining what the ZIP process is like and how it intersects with ZIP editors and all of that and our procedures of how we write documents and review them and so forth. Yeah, getting started with a draft ZIP and looking at earlier existing ZIPs of similar proposals is a good place to start and yes, discussing on the ZIPs channel on the R&D discord where we hang out is a very good idea & you can ping us with questions about what you should include shouldn't include & you can also just open a PR with the first stab of the ZIP and that will give us something to all look at together as it evolves.

[13:46] - **Daira**

That was very complete Deirdre.

[13:49] - **Mark Henderson**

Awesome. Thank you very much.

[13:51] - **Jason McGee**

Very helpful thank you.

[13:53] - **Dodger**

And Mark, if you need a link to the Zcash, R&D discord, just point your browser https://zcasharborist.org.



___


### 3. Research & Implementation Updates III) ZSF ZIP editing


[14:09] - **Teor**

So I had a question for the ZIP editors. I know there's been some discussion about whether it's better to open one PR or two PR's for two ZIP's and whether people should just make edits to the same PR or keep opening new PR's every time there's a big revision. What's your preference there? Because that, I guess, is something that people need to know at the start of the process.

[14:33] - **Daira**

I would prefer not to open new PR's. It's usually easier to review changes incrementally and it's usually not necessary to rebase ZIP PR's, if we need to do that, then the purposes can do that. So it really doesn't matter if its a whole bunch of unrelated commits because it will get cleaned up, or if it doesn't, it doesn't matter.

[15:08] - **Deirdre**

In relation to that the ZSA design process has gone through a couple of PR's over its existence and I can understand that being useful as an initial design evolves with implementation and they kind of want to clean things up and start with something cleaner. I understand that as a designer and implementer, from an editor and reviewer perspective we would appreciate keeping one place where we're tracking things. Even if you make a series of commits that will rewrite all the text at the head of the branch or whatever, so that we don't have to be like, which PR was that again? Was that the first iteration of that ZIP that was open? No, it's the third one. We can use version control for that.

[16:04] - **Daira**

There was another question as well besides how many PR's to use. I can't remember what it was.

[16:14] - **Teor**

So if there are two ZIPs, do you want them in a single PR or do you want one PR per ZIP?

[16:25] - **Daira**

I don't really have a preference for that.

[16:29] - **Deirdre**

Similar to ZSA's, they've been juggling at least two ZIPs that are highly coupled to each other. So when one changes, one is also going to likely change,

[16:41] - **Daira**

In that case a single PR.

[16:43] - **Deirdre**

Right. I would say if they are extremely related and if we make our suggested changes, that they will likely apply to the other. One PR seems like a good idea. If they are only tangentially related - they don't change if one of the other one changes I think two PRS is doable, but it's up to the discretion of whoever is opening that and then we can make suggestions, but we can go back and forth on that.

[17:22] - **Mark Henderson**

One more question. In the event that the ZIP work that we're doing in, I guess the draft ZIP's that we're working on would affect the contents of previous ZIPs based on what happens in the block headers and things like that. Should that all be included in? I think I know the answer, but I just want to be thorough.

[17:46] - **Daira**

Usually. Yes.

[17:47] - **Mark Henderson**

Okay, just include it in one bundle and then review together.

[17:54] - **Daira**

I think that's the easiest thing to review usually.

[17:56] - **Deirdre**

Yeah.

[17:57] - **Mark Henderson**

Cool.

[17:59] - **Deirdre**

Also beware that if there are changes to block header contents, that may also indicate changes in the protocol spec document, which is unwieldy beast. It depends. We've had changes to the block header that are spread in certain ZIP's, but there's also like the full block header is in, for example, the Orchard variant is updated in the protocol spec document and there's some information in ZIP's and you put all the things together to get a mostly complete specification of Zcash.

[18:38] - **Daira**

Previously, I've handled updating the protocol spec but I think we want me to be a little bit less of a bottleneck on that. So yeah, it is absolutely fine to update the protocol spec, which is written in LaTeX with very heavy use of macros. It's okay to update that in the same PR, but you don't necessarily need to because the ZIP's are what describe the changes to the protocol. And yeah, even if it's not me who's doing it's technically the ZIP editor's responsibility to make sure that everything is consistent.

[00:19:24] - **Mark Henderson**
Alright, cool. Well, I'll do my best and we'll see what happens. This is my first time.

[19:32] - **Deirdre**

Sure. You do not have to know LaTeX. You don't have to know these kind of wonky things to start a ZIP and start contributing. Just if you're changing things that we, the ZIP editors are sort of like, "we shall also make sure that we change this other thing over here". We will help make sure that that is done. But just a thought to keep everything internally consistent.

[20:00] - **Daira**

And if it is possible to minimize changes to things like block headers, which I don't believe we've actually ever changed the block headers as opposed to transaction headers,

[20:15] - **Mark Henderson**

It's an addition of a field.

[20:18] - **Daira**

Well, yeah, we've used a previously reserved field and we have modified the semantics of fields.

[20:28] - **Mark Henderson**

Okay, that's interesting.

[20:29] - **Deirdre**

A highly loaded set of 32 bytes.

[20:36] - **Mark Henderson**

You just stuff an integer or float somewhere in here. Okay, cool. This is great information. Good to know.

[20:49] - **Daira**

And speaking of that field, which is now the hash block commitments field, there's a particular way to add extensions to it so other things that you need a block to commit to. So it would be good to follow the existing design there and if you can possibly avoid changing the headers, then do but I don't know if that's possibly the case.

[21:15] - **Mark Henderson**

Well, what I'll do is I'll go on the discord & very gingerly kind of step through what I'm thinking and maybe you can just guide me in the right direction.

[21:24] - **Daira**

Sounds good.

[21:25] - **Mark Henderson**

Alright, awesome. That's all from me.

[21:36] - **Teor**

Yes. Now, I have actually a question, for either Jason or Mark. I understand, and maybe you don't know the answer to this yet, I understand that you were thinking of using Zebra to do your initial implementation. So my question is from the perspective of member of the Zebra Team. How can we help you? And at what time is a good time for us to have a detailed chat about that kind of thing? Probably for us, after Zcon is a better time.

[22:14] - **Mark Henderson**

That should be fine. I can schedule something with the team. At least the rust dev on our team. Maybe that week right after, the week of the 6th onwards in August?

[22:37] - **Teor**

I think a bunch of people will be on leave or travelling back. Maybe the 13th would be better. But yeah, let's have a chat about the rough side of things and the implementation side of things. We can also just chat in the Zebra Channel on the R&D discord and see where we get up to that way.

[22:58] - **Mark Henderson**

Okay, thank you.

____


### 3. Research & Implementation - IV) Ziggurat Update


[39:20] - **Mark Henderson**

Just changing topics for a second. Somebody mentioned Ziggurat earlier, so I thought maybe just give a quick update that the Zebra bugs that were found were part of a Red Team exercise that we conducted on testnet. We found four things of varying degrees of severity and there'll be an update on that in the form of a blog post or something like that. Coming soon. Maybe after Zco i'm not sure if I'll have time to get to that before then, but we'll see. So I just wanted to open up the discussion on that and see if anybody had questions or just update people.

[40:09] - **Dodger**

I just want to say I think from our perspective, it's really useful to have that sort of red teaming those sorts of aggressive testing going on. I think our engineers are very grateful that you guys are finding these issues and raising them. 

[40:34] - **Teor**

Yeah. It was great for us to get those bugs reported to us and we're very happy to be able to fix them. So two questions related to that. I realise you're not funded for this, so it's totally fair if you want to leave it off, but one of the things we're interested in doing is getting Zebra retested either after this release or after the next release when we've added a few more security fixes for lower severity. So just curious if that could happen or if you wanted to wait until both nodes had done fixes and do retesting. It's not urgent at all for us.

[41:16] - **Mark Henderson**

Yeah, it would be great to consolidate the pair of nodes into one retest. The engineers have moved on and been re-resourced to other projects at this point, but we do want to retest it and we might just go ahead and retest it at some point, we're just not exactly sure when.

[41:45] - **Teor**

Just another question about scheduling coordination. It'd be great when there's a red teaming exercise for us to get a week or two of warnings so we can maybe coordinate a release to get any fixes out that we'd like tested that just happen to be sitting on the main branch. Also for us, it took us a few days to set up the machines for the test to make sure that there were enough Zebra instances running on testnet that were configured for it. So  it'd be great to get a week or two notice next time.

[42:20] - **Mark Henderson**

Yeah, no problem.


____


### 4. Open Discussion I) Ledger App Audit & Blockers


[42:41] - **Taylor Hornby**

Yeah, I have one. So I just wrapped up my audit of Hanh's Ledger hardware wallet and everything's looking pretty good. But one of the issues that came out of that was I realised that the ledger API does not support ZIP-32 for key and address derivation & there's no way from a ledger apps perspective to support it because you basically have to hash the root seed with Blake2 using different personalisations.

[43:19] 

So the issue is what their app is currently doing is deriving the shielded keys based off of some BIP-32 derived transparent keys. So if that lands in production, that's going to create a whole bunch of issues where basically seed phrases won't be compatible between wallets.  The ideal way to fix that is for ledger to add ZIP-32 support. But that's a change they would need to make to their operating system that runs on their devices. The second best way to fix that would be some standard change to ZIP-32 that allows these kind of hardware wallets to work. So I just wanted to raise that as an issue and I think what we need to do is to have someone on point for negotiating with ledger to get that kind of support.

[44:23] - **Str4d**

Yeah, this is absolutely a pain and it's something that they have known about for five years at this point.

[44:29] - **Daira**

Yeah, I mean they've had five years to update the OS if they wanted to be compatible. 

[44:38] - **Str4d**

As I suggested in the discord, the simplest approach it seems for compatibility while satisfying ledger's desire to not support anything other than what they already support in terms of cryptographic primitives, is to just implement ZIP-32 for Orchard. Because all that depends on this Blake2b. And they do have Blake2b in their firmware because they have it for other things that they've chosen to add. So if they just implemented that, then the Zcash ledger app would just support Orchard transparent unified addresses and that would be it.

[45:18] 

And I expect that going forward, we are likely to only approach like ZIP-32 things for any future things in the same way with different personalizations. But that's fine, because if they added the Orchard approach in the same way as they do for BIP-32, you can choose the path you derive at, but it has to follow the BIP-32 paradigm and go through secp256k1. If they added what we've defined for Orchard, but just in a generic way, that would be fine as well. Essentially, let us derive an arbitrary 32 byte seed value from the seed phrase via this mechanism.

[46:03] 

I mean, if someone really wants to, that could be written up in a way that isn't Zcash specific, so other chains could use it as well.

[46:12] - **Daira**

Does that violate their security policy? I know that there was a big fuss about what you could and couldn't do and whether it was consistent with what they said you could do, but my understanding is that it's not supposed to be possible to do what you just said.

[46:37] - **Str4d**

No, it should be entirely possible. What I said was, allow us to derive an arbitrary 32 byte key value from the seed. That's exactly what their BIP 32 support does. What they don't want to do is expose the seed from the wallet.

[46:56] - **Daira**

But if they allow you to specify how you derive that.

[47:03] 

That's not what I said. I said specify the path, which is exactly what they do. You have to derive it via BIP 32, but you get to say, I want to derive it like at node hardened 44/ hardened coin type / whatever. You get to choose that as the app developer, but it must follow the BIP-32 derivation process. So this would just be another derivation process, but it just uses Blake2b for the nodes instead of secp256k1 based derivation.

[47:37] - **Str4d**

Just take the Orchard derivation process and generalise it. Literally just take the Orchard derivation process. So this seems like the smallest lift that we could get them to do that would solve the problem and if they're unwilling to do and if they're unwilling to do that, then that's a statement on ledger.

[48:01] - **Daira**

Yeah. Sorry, I didn't quite understand what you were suggesting, but yes, that is the best way I think.

[48:10] - **Str4d**

Yeah, and if they're unwilling to do that, then we would have to consider alternatives. But we should also consider whether we should be recommending ledger to people.

[48:22] - **Taylor Hornby**

Yeah, I agree with that. I think it's totally reasonable to implement that and it would be safe and maybe we could even give them some funding or whatever they need to be able to support that. But yeah, we should be prepared for the worst case outcome here. I think hardware wallets have been in the works for a long time and we might just not have the negotiating leverage we need to get something. So we should keep our minds open.

[48:54] - **Daira**

I will be very disappointed at that because it's always been my position that the shielded protocol isn't really complete unless we have hardware wallet support for it because I personally don't store my ZEC other than in a hardware wallet.

[49:15] - **Str4d**

So the approach that the older Zondax one took and I forget whether this new one is derived from that in any way or not, but the approach I think they took in their dev version was they derived an arbitrary keypath under BIP-32, because you're allowed to do that. Then they used that secp256k1 private key as the root seed for a ZIP-32 key tree.

[49:47] - **Daira**

Sorry, I thought that Zondax had done it the right way, the ZIP 32 compatible way.

[49:56] - **Str4d**

Zondax was the ledger. Not the Trezor one, the ledger one. So this was the first ledger one that got all the way through to having an app, but ledger didn't do the ledger side, so it never got deployed. I think that was partly because of lack of like a JavaScript wallet or something, I can't remember.

[50:18] - **Dodger**

It was because ledger required that there be a desktop wallet for testing purposes & as an alternative to ledger live.

[50:29] - **Str4d**

Right, okay and nothing was done with that at the time, but I believe the approach they took was: you had the root phrase of the ledger device. They derived a custom BIP-32 pathway down to just some root, but this was not used for transparent keys. They just derived an arbitrary path down to some root and used the secret key derived from that as the root of a Zcash key tree.

[51:04] 

So they did the Zcash key tree pieces, ZIP-32 and everything all in their device, like in their memory so wherever the app was running and outside of the system memory, the disadvantage of that is it's still not standard. But at least the advantage is it can be mapped to standard. By which I mean you could take that seed that you've just derived the pathway for and turn it into a phrase that could be extracted from the app and imported into some wallet outside of the hardware wallet if you needed to. It's essentially hanging a full tree off a subtree off Ledgers internal app.

[51:50] - **Daira**

We could standardise that. I'm kind of reluctant to do it, but if we have to. In order to avoid double scanning, scanning for both ways of deriving it then you would need to tell the user would need to tell the wallet which derivation.

[52:16] - **Str4d**

That will have to be done in either case. The advantage of the way that I just described is that you can avoid double scanning when you pull it out because the hanging off key tree is a valid key tree of the same shape that we're already used to. So instead of importing the ledger's root phrase, you would import this subphrase as the root phrase of the wallet. You're importing it into. If, for whatever reason, you had to migrate off the ledger onto some other device, and then you would avoid the double scanning problem entirely.

[52:46] - **Daira**

Okay I didn't realise that could be made to work well.

[52:50] - **Str4d**

Yeah. Because you just need to derive the root in the right way. So the way that you would do.

[53:01] - **Daira**

That now that you say yes, it's obvious.

[53:03] - **Str4d**

You would use the derived Bit 32 path as specifically as the entropy that goes into the phrase definition so that you are so you're producing something that has a phrase and then run that through the BIP-39 phrase derivation piece to get the actual seed that you use for the Zcash key tree.

[53:25] - **Daira**

And we can specify some way of encoding that in the comments and the export files so that an export file is sufficient.

[53:30] - **Str4d**

Yeah. The downside to doing this is that then your transparent keys are not the default transparent keys you would get by just using the current Zcash app on the ledger app store. You would have a different set of transparent addresses. Effectively what you would need to do is export your funds from your transparent only Zcash app and input and send them to the unified address with transparent part side part in the new app. But once you've done that once, then you would be in a consistent key tree and one that you could import into other wallets if you needed to. And that would be at least consistent there. Whereas the approach that's currently in the new app is completely divergent from ZIP-32 and incompatible with everything that's out there.

[54:32] - **Taylor Hornby**

Thanks I'll make that as a recommendation in case we don't get proper ZIP-32 support. That's a good idea.

____

### 4. Open Discussion - II) Ledger App Audit & Blockers cont.



[54:45] - **Conrado**

Yeah. This is super important. I'm wondering if other hardware wallets have the same design. I think maybe not.

[54:54] - **Str4d**

No, the only other one that's relevant is Trezor and Trezor doesn't have the app design of ledger, so everything just goes into their firmware. Because that means they have to pull in the curve support and everything into the main Trezor monolith app, they've got the curves and things there already so they can just support the rest of it as well. They're already adding custom currency logic to their app effectively. So extra key tree stuff doesn't really matter, whereas for ledger, because of the way they've designed it, they have the main firmware and then each app is a separable bit of code, so the app specific curves and things end up in the app code. And the ledger is just all the common pieces of which they treat secp256k1 stuff and everything as common enough because it's bitcoin and then all forking bitcoin pieces.

[55:54] - **Daira**

Yeah, I guess if they implemented the orchard style derivation, that would also work for any forks of Zcash.

[56:04] - **Str4d**

Yeah, it would work for any forks and for anyone else. Effectively you can think of it as a generalisation of BIP-32 away from curves. "Here's a hardened only derivation process for deriving hardened key material". It would be like equivalent to like using HKDF or something, but just BIP32-ified.

[56:34] - **Conrado**

Thank you and the other thing I'm wondering if I feel like we should ask ledger if they're willing to do this, but who should ask? Is there anyone else at ECC or whatever who have some contact with ledger to ask this or should we ask everyone who is interested in this to reach out to ledger to try to convince them to add ZIP-32 support?

[56:59] - **Dodger**

So I've been in contact with them with regards to the recent app submission and some of the blockers that are preventing that from being accepted. I think now is probably not the right time to be asking ledger to make these sort of changes, but when as and when we start making progress, I think we can raise it.

[57:32] 

Just out of curiosity Str4d the Zondax approach allows for the seed phrase to be exported from ledger and then for people to be able to access the funds using other wallets. Can you take a seed phrase from other wallets and import it into ledger?

[57:54] - **Str4d**

No. The approach I described only works for things created in ledger. You suffer the same problem where if you take a seed phrase using regular ZIP-32 and then import that seed phrase directly into the ledger device, the ledger device doesn't support the ZIP-32 logic, so it can't derive those keys. You can only derive BIP 32, so you can derive the BIP-44 transparent part of your wallet, but you can't access the shielded stuff.

[58:26] 

Importing a non-hardware wallet seed phrase into a hardware wallet generally isn't meant to be happening, unless it was going from like a paper offline wallet sort of thing, that would be the pathway. But if you were doing that then at the time you made the paper wallet, likely what you would have done is generated it on the device that you are importing it to. The usual pathway is; you generate it on the device, the device tells you to back it up as a paper wallet, and then you're reimporting what you backed up. So the pathways here effectively would be if you've generated your seed phrase on a ledger, backed it up, and then your ledger device goes down and so you're importing one back in, you're fine.

[59:18] 

And if you decided to switch to like a Trezor or something else at that point that supported the regular key tree, then importing the baseline one would give you a completely new set. You would have to be aware that you need to do some post processing on that offline seed phrase to get the "real one" the subtree one to import into the Trezor.  That would be slightly tricky to do in a way that doesn't bring the key online, but it would be doable. Or maybe the pathway you take there is that you import it into a ledger first, and then the Zcash app on the ledger gives you a way to export that subphrase in the same way that you export the regular phrase for the ledger itself, which you'd be able to do because unlike the root phrase is protected by the ledger but the subphrase, because it's just derived from a keypath on that thing is entirely visible to the app. So the app would be able to see and export that subphrase as a "root phrase" for exportability to other hardware wallets if they wanted to.

[01:00:31]

The simplest approach is if they support ZIP-32, orchard, then the UX all works fine.

[01:01:13] - **Dodger**

Okay, let's leave it there, everybody. The next arborist call will be the early slot on 27th July. Appreciate that some people may be travelling at that point but we'll hold the call anyway then just a final reminder that Arborist calls will be changing after Zcon. The late slot will move to be 90 minutes earlier, the earlier slot will stay where it is, and the links will be changing. The new zoom links will be published at https://zcasharborist.org after Zcon so that we don't get people going to the wrong links & I will coordinate with ECC to hopefully get an email since that everybody's registered with the existing links and/or some other form of notification. Hopefully see some of you at Zcon in a few weeks time.



_____


### Attendees


+ Zcash Foundation  

+ Teor (they/them)

+ Dan Wolande

+ Deirdre Connolly

+ Jack Grigg

+ Alfredo Garcia

+ Arya Solhi

+ Conrado Gouvea

+ Daira Emma Hopwood

+ Jason McGee

+ Mark Henderson

+ Taylor Hornby

+ John Bruhling

+ Josh Swihart

+ Madison Parks

+ Michael Harms

+ Oleksandr Putyak

+ zero dartz



**Next Meeting Scheduled: 15:00 UTC July 27th 2023**


___
___
