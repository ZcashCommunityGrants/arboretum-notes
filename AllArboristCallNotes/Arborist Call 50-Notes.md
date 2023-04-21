# Arborist Call #50 Notes

Meeting Date/Time: April 20th 2023, 22:30 UTC

Meeting Duration: 1hr 30mins


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status - [Status Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#1-zebrad-status---zebrad-updates)

+ ECC Core Update - [5.5.0 release](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#2-ecc-core-updates----zcashd-status) / [Light Client Working Group](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#2-ecc-core-updates----light-client-working-group)

+ Research & Implementation Update - [FROST crates & The FROST book](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#3-research--implementation-updates-i-frost-crate-releases--the-frost-book) / [Technical Collaboration Forum](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#3-research--implementation-updates-iii-technical-collaboration-forum) / [NU5 Retrospective](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#3-research--implementation-updates-iii-planning-nu5-retrospective)
    
+ Open Discussion - [NUP Review](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2050-Notes.md#3-open-discussion-i-nu6-review)


Video of the meeting: [recorded]


Moderator: Dodger

Notes: Jason Rogers



## Decisions & Action Items

i) Circle back on Lead for NU5 retrospective

___



## Full Notes



### 1. Zebrad Status - Zebrad updates


[03:44] - **Dodger**

I'll give a quick update to let you all know that the audit has obviously been progressing with a short hiatus during real world crypto, and we are in the process of remediating some of the issues that have been raised by the auditors. Fortunately so far. This may not hold, we'll be able to confirm that there are no major issues and we're hopefully going to be on track to do a formal stable release of Zebra later on, hopefully by June. 

[05:06] - **Deirdre**

That sounds good. Another milestone on the road to publishing. After our audit is done, we've grabbed all of our crate names on crates.io so no one can grab them out from under us. So we will be publishing a bunch of those after the audit is done and we are ready to go stable and that'll make Zebra a little bit more accessible to general builders. Just pulling a crate from crates.io.

___


### 2. ECC Core Updates  - Zcashd status 

[06:01] - **Str4d**

We've been pushing forwards for 5.5.0. The big thing that's in this one, as I think have you mentioned in previous arborists is the ZIP-317 changes. So those are all in & the release candidate, has just been approved. So we just wait for CI to run & then that will merge.

[06:31] 

Then assuming there's no problems with our regular network testing and things that devices runs before we cut a final release, we should be looking at a 5.5.0 release early next week. So that's been our primary focus the last couple of weeks, is getting all that across the line. 

[06:57] 

Secondary to that, we had a few wallet issues that we were solving, some problems with. Some views that some of the SDK logic was relying on, had interacted poorly with some other updates that were being made in preparation for fast wallet syncing. And so we just had to spend some time last week to rework some of those views and to deal with the fact that we can't reliably show certain kinds of information when you don't have the full blockchain there.

[07:42]

Did some reworking of that and resolved some various issues there. Cut again releases of the rust crates which are going into 5.5.0 as well. But basically they have all of the updates that are in the pipeline. The only one that is not in there yet is we're still depending on the secp256k1 rust crate.

[08:13] 

We currently depend on version 0.21. The next bump to that will be to 0.26 partly because that's what the HD wallet crate depends on, and partly because that coincides with the official 0.2  release of the C library that backs it, which zcashd has a dependency on, and we need to upgrade all those in sync.

[08:38]

Doing that is a little tricky, tying in backports to upstream. But hopefully now that the upstream library has moved to versioned releases rather than revisioned releases, managing that should be simpler going forward. I think that's everything we've been working on in this last bit. Once 5.5.0 gets out, then obviously, the next 5.6.0 in zcashd Will be the changes that fast sync requires, which already some of those are in this current release backend work and the rest that will go into the next release in 6 weeks from now, or wherever it is for targeting. Obviously the wallet changes to that as well.

[09:39] - **Dodger**

How's engagement with the wallet developers going?



___


### 2. ECC Core Updates  - Light Client Working Group


[10:00] - **Pacu**

We are gathering together every other week on Thursdays with developers from Zingo Labs, Nighthawk, and others that might want to show up. We invite everyone to actually join the R&D discord. There's a channel there I'm locked out from Discord, so I can't read out the name, Light Client Working Group and if you want to join those calls, you can contact us there. If you want to know what the meetings were about, we have [public notes](https://github.com/zcash/lcwg/tree/main/meeting-notes) on GitHub.

[11:07] - **Dodger**

Yeah, I think it's LCWG.

[11:10] - **Pacu**

Yeah, lcwg. All the previously the previous 47 meetings have their respective notes there. That's mostly our place of gathering and syncing up, where we can talk about anything light client related. Also, we have John from ZF. He is community support. Yeah, he's always there and helping out and bringing that side of things. Everything like node or wallet related. He's like, helping out and contributing on the matter. So, yeah, that's kind of our strategy for the moment for wallet related.

[12:24] - **Dodger**

Cool. If there's anything we at the Foundation can do to help with that, just let us know. We've got Dan he's on the call here. He's our ecosystem Relations manager and he can help with outreach to any other wallet developers that don't currently attend those calls. You might need to make changes as result of ZIP-317.

[12:49] - **Pacu**

Yeah, sure, we do have content with Unstoppable, but on one-to-one basis, not over those calls. That's our other outreach. But everyone can reach out through the Light client Working Group, which is more collective.


___


### 3. Research & Implementation Updates i) FROST crate releases / The FROST book


[13:36] - **Deirdre**

We've published [All of our implementations of Frost](https://crates.io/search?q=frost) as rust crates on crates.io, including Frost Core, all the different cipher suites in our RFC Draft, and Frost Re randomized, which is used if you have the flag set in reddsa now to have the zcash flavored variants of Frost Threshold signatures that's for redjubjub and redpallas which are now implemented in the reddsa crate.

[14:15] 

Related to that, there was an interesting weirdness with the zeroised trait that we implement for our Frost types and was exposed in some of those APIs, there was a weird interaction with the latest version of Rust which went stable today. It's kind of hard to tell why this wasn't breaking the compiler before. But we've pushed out a new version of Frost Core and our other crates for 0.2 that fixes that for the latest stable version of Rust and has updated zeroised.

[14:52]

So if you are seeing any errors in your usage of that, those are gone and that unblocks people pulling in reddsa if they had turned on that flag, which is I don't think it's on by default, but either way it was messing with the build so that's available. We've gotten through the latest IETF miniboss. The IRTF chair has waved through the spec, so we are yet closer to being a real RFC or at least an informational RFC, that's most of what we got right now.

[15:32] - **Dodger**

On non-technical front, we've also chosen an auditor, so we'll be getting that scheduled. That's to audit the reference implementation which is remind me what language is written in.

[15:50] - **Deirdre**

We've got the Rust ones we own and then the reference is Python/Sage.

[15:58] - **Dodger**

That's the one. So the reference implementation is written in Sage and then obviously our implementation written in Rust will also be the main thrust of the audit. Also work is going on the proof of re-randomizable Frost.

[16:28] - **Deirdre**

Yes updating the frost proof of security to update the slight changes that we make to make it work for the re randomized variant of Frost which is what reddsa, redjubjub and redpallas sapling & orchard variants use. So that you can randomize your signatures between each usage between each zcash spend so that they are unlinkable on-chain.

[17:01]

So you "just" need to update your proof to include this little tweak that gets done to support that. So that's underway. Another item I just published is we have a new [FROST book](https://github.com/ZcashFoundation/frost/blob/main/book/src/SUMMARY.md) like we have a zebra book out on the World Wide Web. That will be the place where we're going to. Include things like a user guide for people trying to deploy frost using our crates, and a lot of contextual tips about if you're trying to do key gen either in a trusted variant or in a DKG variant. How you can do that because we've already gotten some good incoming questions from people who just found our crates on crates.io or Docs.rs or whatever asking, "can I use xyz tool to deploy this?"

[18:05] - **Deirdre**

Instead of trying to have a bespoke answer for every single question, we need to write some more to help. So once the DNS propagates and the certificates are getting issued, I'll share that link. So we'll have a web page for that. 


___


### 3. Research & Implementation Updates iii) Technical Collaboration Forum 


[18:29] - **Nate**

I would love a presentation that's an overview of "here's what Frost is, here's how it could be used". Maybe for developers working on products in the Zcash ecosystem that might want to use it. So wallets come to mind immediately, but also maybe others. I think it'd be awesome if we could organise some sort of call with that kind of presentation. And it sounds like maybe after the guide stuff is out, there might be a good time for that. So that's just a wish list request.

[19:07] - **Dodger**

Absolutely. We got that noted from previously. Another thing that's going on is there's some demos being written to showcase Frost in a demo sort of prototype manner, which will help a lot with helping developers understand what it is, how it works & having some code that they can look at, that actually implements. It will be helpful when people are looking to make use of it.

[20:33] - **Dodger**

Just give a quick bit of background before I hand over to Nate. A few months ago, I think now Hudson was on this call and we were talking about ways for engineers to be able to collaborate.

[20:47] - **Dodger**

Obviously we've got the Zcash, R&D Discord, which is a chat based format, we've got these calls which are obviously verbal and there was discussion about whether it would make sense to have a forum sort of persistent style format with the caveat that it needs to be a place where the engineers can be productive in their conversations and obviously the Zcash Community forums being an open forum, there's a lot of people who join those forums and express strongly held but not necessarily well informed, from an engineering perspective opinions on Zcash.

[21:34]

It is possible on the forums to create permissionned or private sections of the forum and then to create groups. So for example, we could have engineers group. There already is a section for the Light client working group. So we have [created a section](https://forum.zcashcommunity.com/c/rd/45) and hasn't really seen much use yet, but I'm going to hand over to Nate to talk further.

[22:07] - **Nate**

I've been looking for a long form asynchronous forum for technical collaboration and the Zcash forum is already there. What I was hoping for would be a venue that is world-readable generally for most topics, but is more exclusive for who can post there than the General Forum. So I poked around a bit in the current category and right now it's world-private.

[22:47] 

So I would prefer world-readable because whatever discussions are going on there, I like to keep it open for two reasons. One would be just transparency, so like Zcash community can see what's brewing there, also it leaves it more open ended for more collaboration across the web. Somebody might write a blog post or a tweet linking to forum posts.

[23:13] 

So that's sort of what I was hoping for. And I've been wondering a little bit about sort of like the norms and how it might compare to the rest of the Zcash Forum. And I was sort of thinking in the big picture, like the focus for the R&D might be we're trying to figure out how to do things, what they are specifically and how feasible they are, and maybe motivations why the Zcash community might want X to be done.

[23:52]

That would sort of be the focus there rather than more. So should Zcaf do X or Y? That should be for the General Forum because we want the full community sort of involved in that side of discussion. But I feel like if we separate those two out, it can help both sides because the broader should we do X side. Those conversations I think will be better if what people are talking about is specific and clear and meanwhile figuring out specific and clear proposals benefits, if everyone's just kind of focused on that rather than backing up to like why are we doing this every time something starts to make progress. So that's what I'm looking for and I think that forum category could work just fine. Yeah, that's my proposal. Basically we use that, we make it world Readable, it's invite only to post and then there's a question of who would be invited. I personally like having a really liberal policy, so you need to apply and in doing so you might need to acknowledge that your intent is to collaborate on stuff. And I think that bar might be good enough as long as there's sort of moderation.

[25:18] 

And we might want to withdraw people's post privileges if they're too disruptive. Or there could be something more exclusive like you have to show up in an arborist call and introduce yourself or you have to be working on a project like a Community Grants grantee or a wallet or something like that. I tend to prefer the more liberal invite policy but I'm open to whatever will help get people collaborating. So any thoughts or feedback on that idea from this group? Do people like this idea? Like, would you want to start using it if it was there? At ECC I've been focused on wallet stuff for a while and that process is sort of we're approaching the light at the end of the tunnel on that. So I want to resume discussions and technical collaborations specifically about proof of stake or cross-chain interop. And so I was hoping for a forum like this for those kinds of discussions.

[26:47] - **Str4d**

So it seems like the main benefit to moving to well, I shouldn't say moving to having this forum as a place to discuss is that people who like expressing ideas and discussions in that form can use it because we do already have persistent discussion systems, which is the GitHub issues that we've previously used. But that does require a GitHub account to be able to participate in. That doesn't necessarily mean that the forums don't like the forums still require account and if you're doing the permission model you have to have an account there as well. Is this something about the forum interaction model that people would find easier for this?

[27:57] - **Nate**

My thinking on that has like two pieces. One is maybe the first piece is maybe the forum is more accessible. The second piece is the style of conversation. I see. GitHub, you need to choose which repository you're going to post to. For example, if I wanted to start a discussion about proof of stake, I really want that to be collaborative across orgs because there's many pieces and I think we need a lot of attention to come up with any sort of proposal that is good.

[28:47]

One question would be where could I have those discussions? One answer might be the zips repository [issue tracker](https://github.com/zcash/zips/issues). But it sort of feels like stuff should only show up in zips as a specific proposal is becoming fairly mature. That's when we want to start developing zips & there might be multiple zips for any big piece. So I'm looking for somewhere to do technical discussions kind of earlier in the process.

[29:29]

And then one other piece is knowing where to show up for technical discussions. On GitHub there's different orgs and then each has different repositories. Maybe one option is GitHub discussions. I don't know if they have org scope discussions, I haven't used those much yet. That might be a fine option. I'm not particularly attached. I just want something that's kind of accessible & any newcomers to Zcash who want to collaborate technically can discover it, so it's somewhat obvious. It feels like the forum is good for that because you show up there and then you can notice, "oh, there's this R&D space". So maybe I should collaborate there.

[30:23] - **Str4d**

Yeah. The point about having it be not repo or org specific is a good one. The Zcash issue tracker sort of served both purposes for a long time, and there is a lot of good content in there.

[30:46] - **Dodger**

There's stuff that I still point at, ideas like a pay the verification key.

[30:53] - **Str4d**

There's a lot of good discussion that happened there. But if there's sufficient gravity around the forum or the forum software as the kind of software that people who we want participating in these discussions are used to using or wanting to use. Like, I know, for example, I think that there's an active ethereum research one that uses discourse as well. So people from there who are used to that would be used to this as well.

[31:31] - **Nate**

Yeah. That site is an inspiration to me because I've gone there to look for information and the quality of collaboration is really good.

[31:41] - **Str4d**

I've had minimal direct exposure to the curation tools for this having not been on the moderation side, so I don't know how much effort it would take within the constraints of this to keep that subsection of the forum curated in a way that makes the discussions and content there useful. But if there's people who are able and willing to do that and manage that there, then I don't see why it wouldn't be useful.

[32:21] - **Nate**

I was wondering also about moderation and also managing the invites. I don't know who would do that. So this would obviously be asking for someone to do that work. In terms of moderation, though, it feels like this hopefully wouldn't expand the scope of the existing forum moderators that much, because I'm kind of betting this area will be less of a burden than the rest of the forum, or about the same amount. So I'm hoping it wouldn't add much moderation headache, but maybe I'm optimistic.

[33:01] - **Dodger**

I don't think it'll add much at all. The fact that it will be a curated invite only area is important. I'm looking at the list of people who currently have access. We've got Adi, Daira, Deirdre, Decentralistdan, myself, Nathan, Kris, Hudson, Str4d, Teor, Conrado, Autotunafish, Sean Bowe, Hanh, Daniel formerly of Qedit, Pacu, Vivek from Qedit & Zancas.

[33:49] 
Those people don't have a track record of requiring moderation intervention. I'm not too worried. I think the key thing is being clear on what this is. Objective advice in the context of providing a venue. A bunch of those people, including you, Nathan Kris, Str4d, and Daira are owners of that group, so you should be able to add people to the Zcash R&D group.

[34:29] 
In terms of managing invites, you guys should be able to do that. I'm not entirely sure because I get an admin view. So if you're unable to figure out how to do that, then let me know. We can try and work through it together. But as far as I'm concerned, this is a place for engineers to talk about engineering and implementation things and therefore, as far as I'm concerned, it's up to the engineers to decide who they want to invite into that room.

[35:01] 
So I don't think it's for me, for example, to say who should be invited. What I would advise is that it's kept relatively basically it's people that you want to talk to and then just let us know. We can invite them or just add them to the group that's got access to that.

[35:32] - **Nate**

It could be somewhat confusing. Like I think there might be gray areas. For example, a lot of grantees are already posting status updates in other parts of the forum. So there might be some confusion, like should we be posting here or there. But I figure we can just hopefully identify those kinds of things as they come and figure out norms and evolve sort of organically.

[36:16] - **Dodger**

At the moment, as Nathan said, it's private, so only members of the group can see that that area of the forum. Are there any other opinions on making it World Readable?

[36:39] - **Teor**
I was wondering how that actually works. So if you can read something, does that mean that you can react to things? Does it just stop people making comments if they aren't part of the group? Or what does it actually do I am not familiar with this forum software.

[37:00] - **Dodger**

I believe that you can only post to that topic or area of the forum if you are a member of that group. But if it's world readable, then everybody else would be able to see it as well.

[37:20] - **Teor**

Can people who aren't a member of the group comment?

[37:27] - **Str4d**

No, there's no distinction between posts and comments in discourse as I understand it. Is there a distinction between people who can create threads and people who can post within threads? 

[37:46] - **Dodger**

I don't believe so.

[37:49] - **Str4d**

What about the reaction side? The likes and other bits bookmarks? Those are the bits and pieces.

[38:05] - **Dodger**

Short answer is. I don't know.

[38:07] - **Dan**

Yeah, I'll look into that.

[38:09] - **Dodger**

Worst case scenario is that you'll have random people liking comments. I don't think that would be intrusive.

[38:18] - **Nate**

That also makes me wonder about polls, personally with the reactions their scope doesn't matter as much to me. Whichever way it falls, I would adapt. If it's configurable, then I would prefer just keeping it simple. If you're not invited, you can't emit anything there. You can't do polls or reactions or posts or replies just because that's kind of simpler to reason about for me.

[38:52] - **Dodger**

So the granularity of the interaction is there's different rules for the group versus the area so let's look here. So the permissions are See, Reply and Create. So what we would do to make it globally visible is add everyone and by default, if you add someone then they have see they can see the category.

[40:01]

Create means that they can create a new topic within that category and Reply means that they can reply to an existing topic. So at the moment it's just the Zcash R&D group who could See, Reply and Create.

[40:16] - **Nate**

That sounds ambiguous about world readability, i prefer public-readable URLs.

[40:29] - **Dodger**

At the moment right now, at this specific point in time, it's only the Zcash, R&D group can See Reply and Create in that category. To make it world readable, we would give everyone see privileges.

[40:48] - **Str4d**

That would make the see privileges same as the rest of everything else. And I think the only other aspect of this would be if you had see privileges then you could probably not necessarily reply in the thread, but you would potentially be able to reference reference something in an area of the form where you can reply.

[41:17] - **Dodger**

You'd be able to quote.

[41:19] - **Str4d**

That's you would be able to participate in the discussion. If someone wanted to react to something going on there with see privileges, people would be able to do that, but they would be doing so in a different area of the forum.

[41:38] - **Dodger**

Yeah.

[41:41] - **Nate**

I personally like that because then the general community can be like, hey, I noticed this discussion about X, but I'm concerned about it, what do you guys think? Or those kinds of things. I feel like those are good and important, it's just I don't want them in line with the technical discussion because then it gets too hard to track everything. So I feel like that separation is really good for community deliberation.

[42:13] - **Str4d**

That kind of UX would definitely in terms of some of those discussions happening sort of in the same place as other things happening and being able to be cross referenced in an easy way would definitely be an improvement over GitHub issues where you do have some level of that, but it's still very manual for doing that kind of cross linking.

[42:42] - **Nate**

Of course there will still be cross linking challenges because as technical discussions become more mature, there's probably going to be more and more cross linking to like zip drafts or GitHub issues or code snippets or whatever. So cross linking is always going to be a challenge.

[43:02] - **Dodger**

Yeah, it's going to be case whatever solution you use. 

[43:29]

So again is world readable. The direction that people want to go with this?

[43:37] - **Str4d**

I would be fine with that from the perspective of if I'm treating this the same way that I'm treating how we would do those kinds of discussions previously in GitHub issues, well they were similarly world readable.

[43:51] - **Dodger**
I will make that happen right now.

[43:54] - **Str4d**

Yeah, I mean it'd be nice if someone else chimed in as well on that.

[44:10] - **Nate**

I figure it's always the case we can try it and sort of review how useful it is in this call. Several months from now and adapt if we want to tweak anything or what have you.

[44:26] - **Str4d**

Because there's also going to be the inevitable thing of it's. Another bit of software that I have to pay attention to in the engineering development process that can be done, but like, it is another thing in the stack.

[44:41] - **Dodger**

I think  Discourse is fairly widely used and you know, it's well documented, you can go, you know, if anybody has any questions about notifications or anything. I think there's good documentation out there for Discourse.

[45:00] - **Teor**

So to think about another moderation situation that might happen. Is it possible to have specific users not have read access if that turns out to be a problem later on, I don't really mind either way because I'm not sure it will be much of a problem. But I'm interested in the answer.

[45:29] - **Dodger**

The answer is no. There's the ability to allow everyone to see it but I don't believe there's ability to specifically exclude specific people.

[45:44] - **Teor**

That makes sense because they could just log out.

[45:50] - **Dodger**

It's either world readable or it's not basically.

[46:08] - **Dan**

Just one other thing to consider. I think as far as making categories that that's only done on the admin side. I will confirm that tomorrow. But if that is the case then we just have to collaborate on what everybody would like the categories to be and if we want to add one, just inform Dodger or myself. Or if we make another mod that's completely fine as well. And then that way the categories are set and can be changed through that process. But I'll check tomorrow.

[46:41] - **Dodger**

I think there might be a bit of confusion here between categories and topics. So let me share my view of the logged out view of the forum to clarify. So here we have, this is I'm logged at them in incognito mode. So on the left we have categories and we have subcategories. So we have community grounds, applications updates, RFP's, ecosystem updates, etc.

[47:22] 

We now have Zcash R&D with a few test things that we created. This is from about a month ago. So yeah, for categories and subcategories it's an admin function but anybody who has access to create, in the Zcash R&D group will be able to create. I think the easiest way to get to grips with this is to go in and try it is a short answer here and if you can't do something that you want done, let me and Dan know and then depending on the time zone, one of us will react.

[48:18] - **Str4d**

Yeah, I think my first suggestion then would be going back to the point around curation of maintenance links. My first suggestion would be to add a proof of stake subcategory to help contain the initial discussions because I suspect the way that forums go, we will end up with multiple different threads that are branching related to within the category rather than single long running issue with multiple branches internally.

[48:57] - **Dodger**

Yeah. The other thing to bear in mind is that myself and Dan as moderators, we can do things like move specific posts between topics. There's a lot of flexibility at the backend with regards to doing after the fact, so we don't need to worry about it being too perfect to start off.

[49:31] - **Nate**

Awesome. That's what I was going to ask about because maybe a simple way to get started is there's just this one category. We see what topics show up. If we see there's a lot of topics about X, we could move them into a subcategory. That way we don't have to figure it out all up front. Yeah, that works.

[00:49:59.310] 

Well done that's there. Now it's done.

[00:50:05.810] 

If anybody does not have access to it message myself, I'm dodger on the forums and decentralist Dan or ask Nate, Str4d, deirdre, Teor, I think are all owners as well and should be able to add people. Like I said, if any of you guys aren't able to figure out how to add people, let me know.






____

### 3. Research & Implementation Updates iii) Planning NU5 Retrospective


[50:55.480] - **Dodger**

It may be that something else is better, but I think it's safe to try to use a terminology that'd be very familiar to the ECC folks and we've mentioned a little bit recently within ZF and if it doesn't work, then we can come back to the drawing board.

[51:59] 

Let's move on to the next topic, which is planning an NU5 retrospective. So this was something that we were talking about quite some time ago, but then a whole bunch of other stuff interfered and there was kind of a long tail of NU5 stuff that needed to be done and then we've had the spam issue.

[52:25] 

But I think it behooves us to make sure that we do a retrospective on NU5 to see review how it went, to see what lessons we can take going forward, see what can be done better. Obviously, there's been a fair bit of change at ECC, and Steven would have been the sort of the point man for this, but who would be the point for it now?

[53:10] - **Nate**

That is a good question. It might be me or some others on the engineering team. I kind of want to circle back with everyone and figure that out. In terms of scheduling, I think it would be more convenient for us if it were in June or later, because we still are trying to remain focused on doing this big SDK update to address the performance issues so I'm trying to protect everyone from any distraction from that until June.

[53:48] - **Dodger**

Yeah, this is part of the long tail of NU5. Totally, there's no massive rush or urgency or deadline, but I think it's important rather than urgent.

[54:21] - **Nate**

I mean, this is meta retrospective, but if we do it in June, that's about 13 months since activation. So one thing to improve is in the future, do the retros sooner after activations.


____


### 3. Open Discussion i) NU6 Review


[54:47] - **Dodger**

Then following on from that, there has been discussion of reviewing the network upgrade process and again Nate I'll hand over to you but the NUP, as we dubbed it, was designed by ECC, when ECC was the only node implementation with the impending stable release of Zebra. And indeed during NU5, obviously the Zebra team were implementing NU5 for Zebra.

[00:55:23] 

Also with QEDIT making significant progress towards ZSA's, it's entirely possible that NU6 will deploy ZSA's. It behooves us to review the network upgrade process, including looking at other platforms like Ethereum, where they already have kind of a multipolar world, I guess. Nate, again, I'll hand over to you as you instigated this.

[00:56:02] - **Nate**

Some background. As I've said, we've been really focused on trying to improve our SDK so that shielded wallet performance improves. 

[00:56:18] 

So that we're trying to focus on improving shielded wallet performance even when there's a high load in the network. Then we've also been contributing to some other stuff, like ZIP-317 is a proposed fee change, which should hopefully address some of the network load itself at the root.  Since we've been focused on that, we turned our attention away from protocol research and the general upgrade process. And we've been doing regular posts recently about the status of our focus on improving wallet performance. And in one of those threads, somebody started asking about the upgrade process.

[00:57:04] 

There was a stale schedule page that we hadn't taken down and we hadn't been following through on what that process was in the first place. So I posted saying "it feels like that whole process should be revamped, especially with the larger community, especially because there's many more organisations involved now in protocol development.

[00:57:32] 

Since I had posted that, I was like, oh, maybe I should notify different development ogs that I said that just so they're aware of it and see if we can get that ball rolling. So I sent out like a private spam on the forum to a bunch of orgs, ZF, ZCG, QEDIT, Shielded Labs, and then maybe Nighthawk, I just had a grab bag brainstorm of who to loop into that conversation. But that was just a private thread and it's really a topic that the whole development community should be looking into.

[00:58:15]

So what I would hope to see is some sort of collaboration across all developers touching any piece of the protocol to figure out, how can we coordinate on protocol upgrades? And there's in my mind two big categories. One is just sort of like execution, like, how can we make sure, given assuming we know we need features xyz, which upgrades should they occur in, when should those upgrades occur, what do we need to do to prepare for upgrades? All of that sort of execution logistics.

[00:58:59] 

There's a separate thing which is more about governance, how should we decide as a community which changes to make to the protocol? I think it's important to kind of keep those separated to some degree, but obviously they have to tie into each other. So my hope is to get these orgs together to come up with a thing that works for all of them that we can move forward with.

[00:59:25] 

And historically, as Dodger said, the NUP has had a few versions. The first one was really ECC was sort of operating more in a vacuum. We had the only node and we were working on protocol upgrades and we just wanted to have sort of a clear process for ourselves and the community & a big flaw in that process is it was too hard to have other organisations show up and contribute protocol changes. So ECC was too much of a bottleneck or gatekeeper.

[01:00:08] 

We tried to improve that with a new version, but that new version was still just something ECC kind of cooked up. I had a map like "if you want to show up and do protocol stuff, show up to this piece of the process". But the process wasn't really developed with orgs actually doing the work. And arguably at that time there weren't enough orgs to show up to do that, but now there is. So now is a good time to improve that process. And finally, another way that I'm thinking about it is like, let's make sure there's no organization. That's a single point of failure for the process.

[01:00:48] 

ECC has been focused on this wallet stuff and because of that, we sort of let that schedule and process slide & it'd be really nice if we had a more robust process so that if any particular is not picking up their slack or whatever, the whole process can still make progress with the other orgs contributing.

[01:01:15] - **Dodger**

I'm hoping that we can persuade Hudson to kind of take part in that and/or somebody else from the Ethereum ecosystem because obviously for quite some time they have been operating with a multi node world where multiple nodes have to collaborate on implementing upgrades. I think it's good to learn from other people's experience.

[01:01:51] 

One thing I'll say is that the NUP I think was designed with the goal of it applying to all network upgrades. I remember very clearly that there were two approaches put forward. One was what was adopted, which was the let's have a specific timeline & schedule with calendar months specified and whatnot and the rationale for that was that third parties would know when they needed to be ready, they would show up and would need to be ready at a specific point in time.

[01:02:39]

The other perspective was, well, let's just wait until there's enough stuff that's worth of doing a network upgrade and then actually go ahead and do it. I think that one thing we should consider and obviously we need to get the learnings from NU5 first. I think it's really important to look at what went well and what could have gone better within NU5. And also then with the benefit of hindsight, maybe what sort of testing we need to be doing with future network upgrades to avoid finding ourselves in spouse down situations in the future.

[01:03:20] 

I think it might be worth deciding what the process is going to be for NU6 and then running with that rather than trying to design something that's the perfect solution for all future network upgrades because I think that iteration might be a better approach.

[01:03:46] 

With NU6, I think we have one clear candidate in terms of a consensus change, ZSA's that is making progress and looks like it's going to be ready in the not too distant future within the medium term. So I think that's one approach. But again, I think we need to do the NU5 retro and then see what comes out of that before agreeing. 

[01:04:26.990] - **Deirdre**

Yeah, I do think we need our NU5 kind of retro, but especially going forward, we will need to adapt the NUP because we have more than one full implementation of the consensus rules. We also have our QEDIT partners who will be highly involved with the next network upgrade whenever ZSA's are in. Even not having as many independent parties, the protocol is bigger and more complex than ever before.

[01:05:08]

So there's both the complexity but also having multiple parties, independent parties that have to interoperate and kind of hopefully all be ready to activate and validate the new consensus rules at the same time, I think that necessitates reoverhauling the NUP process because it's just a very different protocol world in both character complexity and number of parties than it ever has been before. So, yeah, we need a little bit of a straight look in the face of what we can do going forward because I don't think what we were doing for the NUP in the past will necessarily work anymore.

[01:06:06] - **Teor**

I wanted to note that ZSA's are conceptually one change, but in practice they will result in, well, at least three zips so far, maybe four. So if we're thinking about complexity budget, we should consider them as a number of interacting changes, if that helps make sense. So there's the change to the protocol to actually implement ZSA's, there's the change to the fees, there's the change to the transaction format. I think the ZSA zips were maybe two separate zips.

[01:06:52] - **Teor**

So just in terms of complexity budget, we're talking about something fairly large here and thinking about how the protocol itself functions, we would then be looking at having potentially three active transaction versions and well, three active pools, but effectively ZSA's being a variant on the Orchard pool as well. So maybe it might be worth considering which old features we might want to deprecate at the same time, simply to keep the complexity down, otherwise the testing becomes very complicated.

[01:07:53] - **Nate**
But another piece was I'm personally much more motivated these days to figure out how to sort of unbundle or lower the complexity of coordination. So I'm thinking specifically around testnets. So I'm interested if we can find a model where like, QEDIT, for example, could spin up a testnet relatively soon and that could be a signal or a milestone or a precursor about how ready we are for a mainnet upgrade.

[01:08:39] 

Also I'm keen to figure out if there's ways we can at sort of the front end of this upgrade process, it's possible for multiple teams working on different things to sort of in isolation start developing them or proving them out, and then we figure out when and how to combine them. Oh, related to what Teor was saying, the question of sequencing. So I feel like typically in the past we've considered the next upgrade and what should go into it or not. At least I haven't been as clear on if we're going to do it this way, what future sequence is that supporting? So I would like to find ways for us to improve that.

[01:09:34] - **Nate**

Maybe making a dependency graph of multiple feature changes and then figuring out are those getting bundled into a single upgrade or are they going into future upgrades? And it's a graph that might have different changes. One thing on my mind is Shielded Labs has mentioned wanting to do something about a sustainability fund which is based on this idea I have in a blog post. I called it Posterity Fund, but I think their new name sounds better.

[01:10:12]

That is probably technically unrelated to ZSA's. So if there were any way to make sure shielded Labs isn't blocked on any network upgrade sort of bureaucracy before they can sort of make progress on that, so maybe that's like they're making a testnet along with making zips. People can see it or interact with it or build on it & then as we're approaching an opportunity to network upgrade, we can survey what's there, what's mature, and that can help inform that decision, also we can know, okay, given that these multiple things are in the works, how should they be sequenced? Should they be in one upgrade? Does either depend on another?

[01:11:09] - **Nate**

Will it require multiple upgrades? So on and so forth. So that longer range planning is something I'd like to see and also sort of decoupling the front end of improvements.

[01:11:45.310] - **Str4d**

I think I've made my thoughts clear around this in previous Arborist calls, but just reiterating that zcashd does already have a mechanism that unfortunately was merged too late to use in NU5. But we Have had for quite some time a mechanism for doing those kinds of, like, separated out features & representing those features as a graph internally. So we should already have some of the fundamentals in place to be able to enable that sort of development process. I think we'd still need to be tied a little bit more into the Rust side, but that's, again, stuff that can be done.  Definitely wanting to head more in the direction of get things out that people can play with earlier to have that feedback into the development loop.

[01:12:50] - **Teor**

Just jumping off that. Zebra has been using rust features quite extensively recently and so we again didn't use them for NU5, but we have been using them for mining and for a number of experimental projects you can read about on our [blog](https://zfnd.org/blog/) or that are coming up on our blog over the next month or so.

[01:13:13] - **Teor**

We would also be in a position to do that and to get things out quickly if people were wanting to do that. I think on the other side, in terms of having separate testnets, we might want to have a chat about how that works at some point and come up with a spec that node implementations and wallets can work to. It wouldn't need to be as formal as a consensus zip. I think we could just put something rough together and iterate on it.

[01:13:48] - **Dodger**

The reason I put up my hand was I think it's also worth Teor mentioned complexity budget and it's worth considering whether we want to do more frequent network upgrades, smaller, more frequent network upgrades. I feel like in the past, apart from maybe overwinter was probably the exception, all the network upgrades were pretty significant, pretty hefty, and in some cases that was necessary either because of dependencies or because of the urgency of, for example, getting sapling out.

[01:14:39] 

I think it's worth in the same way that we all aim to do software releases on a regular cadence so that they become fairly straightforward and routine, I wonder if it's worth considering looking at doing network upgrades on a more on a more frequent cadence, not necessarily regular, but frequent. The caveat being that it's obviously very easy to say, but when the interdependencies and complexities start getting involved, it can be not quite that easy.

[01:15:22] - **Nate**

Yes, well, since you brought up cadence, it got me excited about that.

[01:15:28] 

I would hope to see my overall desire would be Zcash has upgrades as rapidly as possible while still being safe. Assuming there's enough good improvements that could be done if people were doing the development. So my hope would be the process doesn't slow down whatever natural rate of improvements are present in the community. And I was just thinking of Ethereum, the upgrade that switched to Proof of Stake, but there have been multiple upgrades.

[01:16:21]

But the one that actually turned off proof of Work had an incredible amount of testing and effort that went into it and it was a pretty long cycle, whereas, by contrast, they just did Shapella & my understanding is those changes weren't nearly as complex. Also they actually did two protocol changes in short sequence, which I think was to sort of unbundle some complexity. So just taking those examples, if we want to follow their example, it shows like they're adjusting the timing based on the complexity of the change, but when they can do small quick changes, they do that. That's kind of inspiring, especially because they haven't blown up Ethereum mainnet yet.

[01:17:13] 

The other piece was, when discussing the upgrade process, I think it would be good if we can get any ecosystem, such as wallet developers into the conversation. I'm not sure how available or interested they are to participate, but I would have an ideal that when we're aiming for upgrades, wallets would be involved in the process so that we kind of have a full stack demonstration of the new features and we know that they will work. So this is an item for me on the retro for NU5.

[01:17:55] 

Thinking about unified addresses and Wallet support for unified addresses and Orchard and the timeline between the actual mainnet upgrade versus when wallets deployed that support. it would be nice if we could loop in Wallets much earlier in the process.

[01:18:17] - **Str4d**

Yeah. You were correct that the shortest interval we've had between upgrades was between Overwinter and Sapling. Obviously, I think there were some mitigating circumstances in there that affected that because of the counterfeiting bug that was being fixed in that. But also I remember that one causing a lot of noisy complaints because we had a breaking change to the transaction format in overwinter to the v3 format, followed by another breaking change to the transaction format four months later in Sapling, where it was breaking and people, they had to do a hard switch from one version to another.

[01:19:12] 

So to that aspect, also tying to what affects wallets and things, it might be worth considering, even though the upgrades themselves are essentially sequential by nature of how consensus changes work, you can't really make a graph of them in terms of what they affect you might be able to consider that as being more of a graph.  So we might be able to structure things in ways where the upgrades themselves are more frequent, but the areas of the ecosystem that they affect those areas experience breaking changes less frequently or sufficiently less frequently that they're okay with the cadence.

[01:20:09] 

I know six months was sort of a cadence. I think Overwinter originally wanted to be like six months, but Overwinter slipped a bit. Then the other thing I wanted to mention is that the cadence is also affected by the prevalence of nodes on the network. So for example, in ECC's case, with our support policy for zcashd being 16 weeks, in general, we are able to deploy those kinds of changes. Generally, ten weeks would be probably the minimum between pushing out something that supports a consensus upgrade and the upgrade being able to that we would consider the upgrade safe to go live.

[01:21:12] 

Zebra, I believe, has gone with a longer support policy with their nodes. So that would affect the cadence from that perspective, on the assumption that you would want if you have different intentions for how to manage zebra nodes across upgrades, then that would need to be taken into account for this kind of thing. But I would expect that to have an effect on the cadence that would be able to be sustained.

[01:21:48] - **Dodger**

The zebra auto-senescence period can always be changed. We have the ability to change that.

[01:21:57] - **Str4d**

Yeah, and we introduced ours later anyway, like in 1.0.8, I think it was. So there was a long tail of nodes that just stuck around at like 1.0.6 to 1.0.8 all the way through to Sapling activation for like a year and a half, were still on the network because people prior to them were not really, they would run the nodes and then just leave them. That's great from some perspectives, but consensus breaking upgrades is not one of them.

[01:22:30] - **Teor**
Yeah. So I just wanted to mention that we haven't actually decided on a support policy for Zebra yet. There's an open PR, and I think we're probably going to have that discussion as a team over the next few weeks. That's where we're at with that. If you have any advice, please feel free to pass it on or mention it on the PR.

[01:23:01] - **Teor**

In terms of network upgrades in general, I just wanted to mention that we haven't stopped making changes, so we've made some changes to Fees network protocol, we can do some soft forks, we're adding extra features to Zebra and to understand zcashd's adding performance features. So I would be in favor of trying to move as many changes out of network upgrades as possible because it's a lot easier to make those smaller changes on a regular cadence. But some things do have to be breaking changes and that's fine. So yeah, just also we're thinking about that changes do still happen to the protocol inbetween network upgrades.

[01:23:58] - **Str4d**

Yeah, and that would kind of tie in as well with the idea of being like, okay, what areas of the ecosystem are affected by changes? Because, like, a breaking change to interaction patterns like, Fees, for instance, is going to be something that Wallets have to upgrade to. So also, deploying a transaction format change adds slight complexity to their upgrade processes around that time. Those kinds of changes should probably be considered within the graph of feature development as well.

[01:25:06] - **Dodger**

I think our conclusion here is that this will happen after the NU5 retro, which in turn will happen after ECC have completed their current effort to mitigate the performance issues.

[01:25:34] - **Nate**

Yeah, just to clarify, we have a goal to release a Wallet SDK update in early June. We're hopeful that that will address the bulk of the issues, and that's also when we intend to start escalating other priorities again. I anticipate there's going to be follow up effort that will be needed to follow through on the Wallet performance issues. So it'll be an ongoing priority, but we'll begin ramping up other priorities such as proof of stake research around June or collaborating on network upgrade processes retrospectives, things like that.

[01:27:05] - **Dodger**

Thank you, everybody.


_____

### Attendees


+ Jack Grigg

+ Deirdre Connolly

+ Arya Solhi

+ Conrado Gouvea

+ Daniel Wolande

+ Nate ZEC

+ PACU ECC

+ teor (they/them)

+ Chris Tomeo

+ Greg Pfeil

+ Jason McGee

+ John Bruhling

+ Joseph Van Geffen

+ Josh Swihart

+ luckytokidoki

+ ZEC Prophet

+ zero dartz


**Next Meeting Scheduled: 15:00 UTC May 4th 2023**


___
___

