# Arborist Call #57 Notes

Meeting Date/Time: July 27th 2023, 15:00 UTC

Meeting Duration: 20 minutes


**Agenda**: 

+ Welcome and Meeting Intro - [change to arborist call times](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#0-welcome--intro---change-of-arborist-call-times)

+ ECC Core Update - [mobile sdk's / lightwalletd bug fixes](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#1-ecc-update---mobile-sdk-updates--lightwalletd-bug-fixes)

+ Zebra Update - [zebra 1.1.0 fixes](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#2-zebrad-status---zebra-110)

+ Research & Implementation Update - [FROST demos / audit updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#3-research--implementation-updates-i-frost-demos-and-audit-update) / [NIghthawk update - Zcash Block Explorer API requests](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#3-research--implementation-updates-ii-nighthawk-update---zcash-block-explorer-api-requests)

+ Open Discussion - [curve25519-dalek 4.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2057-Notes.md#4-open-discussion-i-curve25519-dalek-40-update)


Video of the meeting: [recorded]


Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome & Intro - Change of Arborist Call times

[00:13] - **Pili**

This is the Arborist call, which is a bi-weekly call where Zcash protocol contributors meet up to discuss update, timelines and process protocol research and development efforts. These design and implementation of new protocol features and we identify, blockers and resolve issues. So the purpose of this call is to try and make Zcash protocol development accessible to interested parties and to provide more transparency for everyone.

[00:42] 

Anyone can register to attend, you can do so at https://zcasharborist.org, and if you want to become more involved and you want to present during this call, you can email us at arboristcall@zfnd.org to request a presentation slot. So outside of the arborist call, you can participate in the Zcash community in a number of ways, you can apply to one of the grant programs and you can take part in community discussions on the Zcash R&D Discord or the Zcash Community Forum. There are clickable links for all of these at [zcasharborist.org](https://zcasharborist.org).

[01:20] 

So today's agenda, before we get started with the usual node updates, we have a quick announcement about key changes to the Arborist call, then we'll continue with the agenda as usual with the node updates, the research and implementation updates, any announcements and any open discussion items.

[01:46] 

And so with that we can move on to the scheduling announcement. The main change is that the later Arborist call time slot lot is moved to 21:00 UTC. So that's a little bit earlier than the previous time slot of 22:00 UTC. I won't say how many hours earlier or not because it will change depending on whether you're on daylight savings or not. So just know that it will be earlier and please keep that in mind. The earlier 15:00 UTC time slot will stay as it is.  There are also new zoom links, so you will need to re register, there are new links at zcasharborist.org and they are listed hopefully very clearly in the page. 




### 1. ECC Update - Mobile SDK updates / Lightwalletd bug fixes


[02:50] - **Str4d**

So we have in the last two weeks done basically nothing on Zcashd itself. So that's the node update. We have not been working on Zcashd because we've been working on the mobile SDKs. So on that front, we have basically finished all of the rust changes, found a variety of bugs and fixed them and various other opportunities for performance improvements. And so the rust components of the spend before sync work are done, they will probably be pushed as publishers crates sometime next week. But in the meantime, the changes are being tested on Android, because there's a couple of things that we can potentially tweak in some hard coded constants to get some slightly better pipelining, depending on what we need. Other than that, that's basically all there so the next step on as far as the SDK's goes is then just finishing the integration of those to the existing sync logic, and then those SDKs will be able to go out.

[04:14] - **Pili**

Does anyone have any quick questions for Jack, or shall we move on to Zebra updates?

[04:21] - **Adi**

Yeah, quick question. So what is the target release for the updated SDKs?

[04:28] - **Str4d**

I don't have that to hand because that's going to depend on how long the iOS Android developers take. But the Android one is like they're in the middle of using the new APIs because there's a bit of reworking that has to happen on their side for those pieces. But I'm not sure what the time is for that. If you ping Nick in the light client channel, that's probably the best way, although I think he's on PTO this week so you would probably get a better answer to that next week.

[05:11] - **Adi**

Got it and there was a spending bug that we had run into. Is that one fixed as well?

[05:18] - **Str4d**

Yeah, that particular bug was that if you used the nonlinear linear scanning APIs just for linear scanning, there was no problem, but if you followed the preference logic that we want you to for certain wallet configurations, certain orders of note receives, you could end up in a situation where you detected a note that had been spent, but didn't detect it as spent. So we fixed that. There's a new table that gets maintained by the wallet DB that tracks any nullifiers that your wallet observes before it would have had a chance to observe that note.

[06:05] 

So any out of order nullifier detection is stored, and then those nullifiers are held around locally until the history frontier, like the fully scanned height catches up to where they are and has a chance to observe them. That's fixed. Then we found a couple of other bugs in the implementation that we fixed as well. Mostly stuff in the shardtree crate because it's brand new, so lots of new code and lots of code that needed testing. That now has it.

[06:42] - **Adi**

Got it. And there was just another issue that we had reported about having the ability to change the lightwalletd server.

[06:52] - **Str4d**

That I don't know anything about sorry. 

[06:55] - **Adi**

Because right now it's hard coded to a single server, the mainnet one and that's one is getting too much load right now. So we wanted the ability to change the Lightwalletd server.

[07:09] - **Str4d**

I'm not familiar with that part of the work that the iOS and Android devs were doing. You'd have to ask in the Lightwallet channel about that, probably.

[07:20] - **Adi**

Okay.

[07:20] - **Str4d**

Related to lightwalletd, though, there is a bug in Lightwalletd in the latest release of it, related to the spend before sync stuff, specifically the getsubtreeroots API. If you set zero to max entries, what's supposed to happen is that just says "get everything", but it actually says "get nothing" because the way it was passed through. So that bug has been fixed in master, but the way we're working around it for now is to just request 65536 entries, which is the maximum number of entries you can have.

[07:57] 

So it's not critical to get that update deployed but the bug fix that is in the main repo and I think it's going to get a released soon.

[08:11] - **Adi**

Cool.

[08:12] 

Might have even already just happened, not sure. As far as the other pieces there go you'd need to ask in the lightwallet channel of the R&D server.


[17:21] - **Str4d**

Just that the next Zcashd release, 5.7.0, is probably going to be in around about two weeks. So we're not going to do a release while Zcon is going on because that'd be silly. So we'll wait till Zcon is over and then we'll cut that. So it'll be probably around about the time that I think 5.5.0 is due to reach end of service halt. But if you're on 5.6.0 or 5.6.1, you'll be fine.



___


### 2. Zebrad Status - Zebra 1.1.0 


[08:38] - **Marek**

So last week we released Zebra 1.1 and it has a bunch of changes. The breaking one is that Zebra now recognizes wrong subcommands on the command line and doesn't start if there's a wrong subcommand, because before it would start and it would take the wrong subcommand as filter for logs.


[09:11] 

We had two networking security fixes. We added metrics for tracking mempool actions credit to Str4d for that PR. We bumped our dependencies that are from ECC to match Zcashd 5.6.0, we also have a framework in place for updating the database on the flight, basically so users don't have to resync the whole database if there's a format change, zebra will do it on its own while it's running.

[10:06] 

We deduplicated the note commitment trees in the non finalized state. So the non finalized state now contains only unique trees, and we are still working on doing the same for the database, which is the finalized state. And then we fixed a bunch of stuff, we noticed that our docker images for mining, so images that have mining support enabled had some bugs in them. So we fixed some panics and improved logging and a bunch of other smaller PR's and that's all.


___


### 3. Research & Implementation Updates I) FROST demos and audit update



[11:36] - **Natalie**

We were doing little demos of FROST to try it out, basically and all those demos are complete, so all the different roles, a trusted dealer and a coordinator and a participant, et cetera. So we've got all those demos, very importantly, these are demos. This is a demo implementation. This is not the use in a real world scenario.

[12:06] 

But what we can do is conrado has been doing some work about integrating it with Ywallet, and so actually we can show, which we're going to at Zcon, how you can use FROST. But obviously with the caveat that FROST is still in version 0.6, so we're not at version 1.0 yet. On that note, the audit is going very well. We haven't had any sort of catastrophic findings or anything. It's been really good and all those sort of things which have been found are very pretty fixable. We've already fixed quite a few of the things they also gave us lots of nice compliments, which was lovely.

[12:56] 

I don't know if there's anything much more to say on the audit. We haven't got the final document yet. I'm not sure quite how many more meetings there are, actually. Pili can probably tell you that. So there's going to be a presentation as well at Zcon from Conrado, as well as the workshops that we have. Yeah, I think that's all the updates.

[13:22] - **Pili**

Thank you, Natalie.

[13:27] - **Deirdre**

Hi, just giving a little bit more. I think we are done with the primary engagement of the audit. We went with NCC group again. In the course of not a party engagement, but some of the team members also did their own implementations of FROST, including some fresh implementations of the ed448 cipher suite, which is cool.

[13:52] 

And part of the audit scope was some of the dependencies that our implementation uses, including the ed448 crate that we were using, ed448-goldilocks, which we weren't sure had ever received any significant attention. So that was in part of the audit. A few things got reported, are public and I think already fixed in ed448-goldilocks and in fiat-crypto.

[14:22] 

If people are familiar with the [fiat-crypto formal library](https://github.com/mit-plv/fiat-crypto) that helps spit out code in a couple of languages based on formally verified correct formulas in coq that a lot of crypto libraries have used in the past. There were some recommended changes, basically how they spit out their Rust code that produces nice types that the Rust compiler will not wave away because it's trying to be smart.

[14:53] 

That is not necessarily what we want from a cryptographic standpoint, so I think that is already being worked on by fiat-crypto, but I'm very pleased to see some of those kind of results come out of this audit engagement because it's gone beyond just did our code implement the FROST specification. It's helping the ecosystem in general ways that might use some of the dependencies that we've relied on.

[15:20] 

We're making a few small changes to the spec, making some implicit requirements explicit, which should help any other implementors of the spec in case they weren't sure. This doesn't say 'must' or 'should' or whatever, but it sounds like it's a must or should. Those things are being made more explicit and things like that. I think we're all going to Zcon, so we won't be able to go back and forth and finalize the audit report in the meantime. But sometime, hopefully late august is what we're thinking, at least the last time we talked with the auditors about getting out a final report, but we'll see about that. But the final report will be public for our code and everything else that was in the scope of the audit so we're quite pleased.


___


### 3. Research & Implementation Updates II) Nighthawk Update - Zcash Block Explorer API requests


[16:27] - **Adi**

Yeah, just a short note that propped up from our end is that we're receiving a high amount of requests for the Zcash Block Explorer API. It seems like someone has been scraping off the data, so we're going to look up for scaling our infrastructure and if the known party is interested to access specific APIs, feel free to get in touch with us and we can cater to that because right now it's consuming all the CPU's and the node is barely functional running Zcashd. That's pretty much it from me.

[17:07] - **Pili**

Okay. Thank you, Aditya. I hope that resolves itself. 



____


### 4. Open Discussion I) curve25519-dalek 4.0 update



[17:56] - **Pili**

I do have one announcement about Zcon4, just to let everyone know that the in person registration is closed, but if you want to register as a virtual attendee, you can still do so. Any other announcements from anyone? Okay, we're a small group today. I guess not. Finally, open discussion, same question. Any items for open discussion today?

[18:44] - **Deirdre**

If anyone's a user of the curve25519-dalek crate, there is a 4.0 stable release out that the team has been working on for probably over a year now. A lot of us use that crate in our stacks. This is just sort of like they're finally stable 4.0. Go update your code if you want, but it might be depending on the API's you use from them a non trivial upgrade, but just sort of a "yay good crypto code that we all rely on it's updated!"

[19:29] - **Pili**

Great, thank you, Deirdre, any other items? Hopefully you will be there in Barcelona and we can see you then. So thank you very much to everyone who participated today from the ECC, Nighthawk and the Zcash Foundation. See you all at Barcelona, hopefully and the next Arborist call will be on the 10th August at the 21:00 UTC time slot and please re register at https://zcasharborist.org. Thank you, everyone.



_____


### Attendees


+ Jack Gavigan (Dodger)  

+ Deirdre Connolly

+ Jack Grigg (Str4d)

+ Adi Nighthawk

+ Marek 

+ Natalie Eskinazi

+ John Bruhling 

+ Pacu Gindre




**Next Meeting Scheduled: 21:00 UTC August 10th 2023**


___
___
