# Arborist Call #73 Notes

Meeting Date/Time: March 21st 2024, 21:00 UTC

Meeting Duration: 9 minutes


**Agenda**: 

+ [Welcome and Meeting Intro]()

+ ECC Core Update - [ECC Mobile SDK Orchard support  / zcashd maintenance release]()

+ Zebra Update - [Hack Sprint report / Zebra Scanning]()

+ Research & Implementation Update - [FROST Demos Phase 3 / Re-randomized paper]

+ [Wrap up & Meeting Close] 

___


Video of the meeting: [recorded]

Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome & Meeting intro 

[00:02] - **Dodger**

Okay, welcome to the Arborist call for the 21st March 2024. A lot of people are traveling, are on their way or are already in Toronto for Real World Crypto. So it's a smaller group of attendees today than usual, so I expect it'll be very, really quick and short.

[00:27]

So for the record, these Arborist calls are bi-weekly calls that alternate between an early time slot at 15:00 UTC and a later time slot, which is this one at 21:00 UTC, where contributors to the Zcash protocol get together to discuss upgrade timelines and processes, the R&D efforts that are being undertaken, and design implementation of new protocol features.

[01:18] 

The idea of these calls, apart from coordination between those people who are working on Zcash, is to make the process of building and improving Zcash more accessible to a wider set of people so people can see a little bit about how the sausages are manufactured to provide transparency for the Zcash community who are funding many of these efforts.

[01:43] 

Anybody who is interested in learning more about Zcash can join these calls. Just go to [zcasharborist.org](https://zcasharborist.org) and you can register there. If you want to suggest a topic for discussion, or if you want to give a presentation to the call, just drop us an email at arboristcall@zfnd.org we have to date never received an email, but there you go. Other ways to get involved, you can apply for [Zcash Community Grants](https://zcashcommunitygrants.org), you can join the [R&D discord](https://discord.gg/xpzPR53xtU) where a lot of the engineers hang out and discuss technical topics. And you can also join the ever exciting and fun [Community Forum](https://forum.zcashcommunity.com) with lots of discussion about Zcash and its future.

____

### 1. ECC Update - ECC Mobile SDK Orchard support  / zcashd maintenance release


[03:08] - **Kris**

So the main effort right now is we are in the final phases of stabilizing orchard support in Zcash Client Backend and zcash client sqlite and the ECC mobile wallet SDKs.

[03:23] 

We are down to just a couple of small known issues and are, I think, nearing the end of the audit on those. So we are looking forward to a mobile wallet release and SDK release really soon now. The other thing that is on deck is there will be a Zcashd maintenance release coming out sometime in the next week or two that essentially upgrades to current librustzcash crates and bumps the end of service but that's just a routine maintenance thing that will be happening.

___

### 2. Zebra Update - Hack Sprint report / Zebra Scanning


[04:41] - **Arya**

So since the last arborist call, Alfredo has added an open API specification generator for Zebra's RPC methods and [documentation](https://zebra.zfnd.org/user/openapi.html) on how to use it. With Swagger IO as part of our hack sprint.

[04:51] 

We've added timeouts to the Zebra scan service used by Zebra gRPC methods so those methods won't hang when Zebra isn't synced past the sapling activation height and we've added more helpful error messages for those methods as well as improved documentation.

[05:04] 

Then finally, the Zingo team has refactored production code for network consensus rules into network methods and removed the copy trait from network as steps towards adding regtest and custom testnets to zebra. And we are currently focused on supporting regtest and custom testnets in zebra and collaborating with the ECC on enabling wallet functionality that relies on zebra. That's it for the Zebra update.


___


### 3. Research & Implementation Updates i) FROST Demos Phase 3 / Re-randomized paper


[05:27] - **Dodger**

So I have something to read out. We are finishing up phase two of the FROST demos, which decouples the server from the coordinator role. This is the server that handles communications between the various participants in a FROST action. We expect to be finished by the end of this sprint,. ie, Next Monday. We started looking at phase three of the FROST demos for which we want to add user registration and authentication and message encryption to the FROST server. So far we've been investigating various different libraries that we might want to use for this.

[06:25] 

The other update is that the [FROST re randomized paper](https://eprint.iacr.org/2024/436) has been published to ePrint. So I'll invite questions about FROST, but quite frankly, I am unlikely to be able to answer them. But if anybody has any questions, feel free.


___

### 4. Wrap up & Meeting close

[06:58] - **Dodger**

Thank you all. The next arborist call will be in two weeks time, during the earlier time slot. For those of us who are in countries that observe daylight savings, bear in mind that the time is set in UTC, and therefore your subjective time that this is scheduled at will change. So just bear in mind it's at 15:00 UTC, not 15:00 UK time or British summertime, or whatever alternative that might shift with daylight savings. So with that, we'll wrap it up less than ten minutes. Look at that. Shortest one ever, I think. But I'm sure we'll have more to discuss us in two weeks.


____


### Attendees

+ Daniel (decentralistdan)

+ Alfredo Garcia 

+ Arya Solhi 

+ Kris Nuttycombe

+ Vito 

+ Zero dartz

+ John Bruhling


**Next Meeting Scheduled: 15:00 UTC April 4th 2023**


___
___



