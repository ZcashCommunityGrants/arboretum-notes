## Arborist Call #105 Notes

Meeting Date/Time: july 10 2025,21:00 UTC

Meeting Duration: 19 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [zebra 2.4](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

core stack updates zingo labs [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#corestack-updates-zingolabs-zaino)

Research & Implementation Updates shielded labs[Network sustainability mechanism](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) / [crosslink , trailing finality layer](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)

Open Announcements [zingo wallet release](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=82h8qI66Vqg)

Moderator: ALEX

Notes: CHIDI 

Full Notes

## Welcome & Meeting Intro 

ALEX: 00:00:00

Zcash Arborist call. Today's July 10, 2025. The agenda is core stack updates, Zcash Foundation Zebra,  Zcash Core Libraries and Zallet CLI Wallet, Zingolabs with Zaino and Zcash D deprecation. We also have research and implementation updates from qedit if they're present for ZSAs shielded labs on Network Sustainability Mechanism and Shielded Labs and Electric Coin Company on Crosslink Trailing Finality layer and then any open announcements and discussion. So what are Arborist calls? Arborist calls are bi weekly calls where zcash protocol contributors convene to discuss upgrade timelines and processes, Protocol R and D efforts, design and implementation of new protocol features and identify blockers and unresolved issues. Purpose is to make core zcash development accessible for a wider set of participants and provide more transparency for the community at large.
Who can participate?  Anyone interested in learning about zcash Protocol development can register at zcasharborist.org. If you want to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Other ways to get involved are community grants  at zcashcommunitygrants.org, the Zcash R&D Discord and the Zcash Community Forum. You can find these links by pointing your browser to zcasharborist.org, so let's start with CoreStack updates from Zcash Foundation.

## Zebra Update 

conrado: 00:01:53 

Yep, that's me. Basically we've been working on some miscellaneous stuff we added to get raw transaction RPC in Zebra related to sprout and sapling transactions. It was actually a contributor pr. We added the ability to return sidechains in the GRPC interface of Zebra so other piece of software can query for the other chains that might be active at some point in time, not just the main chain. And we also had a Prometheus feature in Zebra that you had to enable explicitly which is related to metrics but like this is generally useful so we're just enabling by default now. We're going to make a release very soon. Today or tomorrow will be zebra 2.4  including all the recent changes. Most of them are related to RPC and general functionality. This update has database upgrades, so be aware that if you upgrade Zebra you can go back to you can go back to old Zebra, but then we have to seek from scratch because the database will be upgraded. So if you plan to upgrade but want to have a rollback prepared, if you're quiet then please backup your state. The changelog will have detailed information about that. But yeah, that's mostly it. We've been aware of some requests, some issues that people have created in our repo, so we're going to work on that after release and we also plan to investigate Zebra performance because it seems like we had a performance decrease in the recent past. So we're going to also look into that related to the sync time of  the node and that's it. Does anyone have any questions?

ALEX: 00:04:27 

Great  appreciate it. next is corestack update from ecc. I don't believe anybody is present from ECC today.

ALEX: 00:04:37 

Next Core Stack Update zingo Labs on Zaino.

## Corestack updates Zingolabs-Zaino

ZAR: 00:04:43 

So we're approaching completion of our non finalized state and finalized state representations in Zaino and that will shortly be available to Zallet and other consumers and of course we're doing that work we've been motivated by a request from Vale that our error handling doesn't partition well between internal and public types, which is a sort of shade the gray problem. But we are pretty intent on engineering first class depth pattern error handling architecture such that user, designers can be assured that they will be receiving semantically useful errors. So our handling architecture is going to move towards providing a public non exhaustive fieldless enumeration such that consumers will be future compatible and will be shielded from our internal dependencies. So we'll be making the implementation details of our error handling in a way that enables consumers to be unconcerned with our own dependency side. We are the most downstream part of the zcash ecosystem. Zallet has come online recently to provide our first real use case and so we're actually, I think we're sort of efficient or sort of in the right spot to really start investing in paying attention to this. So we're going to expand our grant application to the zcg so that we can maintain our velocity and add more developer time to designing projects so we can add this kind of encapsulation while staying on schedule. We're also implementing RPCs in zaino that are slightly delayed by a need to re-architect our error handling and we anticipate finishing the non finalized state and finalized state and their integrations in the near term. Next week or two probably. Oh, we also have a proposal that we would like to discuss in Zaino community chats wherein as the  components are going to converge we'd like to discuss an interface or impedance mismatch protocol where each team provides some sort of contract where they will have something like a weekly branch or a Z2 branch, something like that where they are willing to run an additional, in addition to their own tests, they will test against the other partners in the ecosystem and at least be available to open issues and inform other ecosystem partners so that we can be efficient in our integrations. So that's on the docket for us. All of which should keep us moving forward  fast.

ALEX: 00:08:46

Any questions for zar before we move on? Great, thanks zar. Zcashd Deprecation updates  anybody here to give an update?  I don't believe so. All right, we will move on from deprecation updates to research and implementation updates QEDIT which I don't believe anybody is here today from qedit. Up next, research and implementation updates with shielded Labs, network sustainability mechanism.

## Research & Implementation Updates, shielded labs- Network sustainability mechanism

MARK: 00:09:21 

I can give an update here in that there's really not much of an update. We remain blocked on pull request reviews, and we've been in touch with the ECC engineers who are tasked with reviewing them. They said maybe next week as they're all traveling. But yeah, it's. It's been, you know, a long time. And we have a security audit queued up that we had to reschedule because of this. So that's our update.

ALEX: 00:10:02 

Any questions for Mark? Ok shielded Labs and ecc  Crosslink.

## Research & Implementation Updates, shielded labs & Ecc- Crosslink- Trailing finality layer

MARK: 00:10:11

Same here. I can also, if I can share my screen, I can play a YouTube video of a demo.

ALEX: 00:10:19 

Let's see.

MARK: 00:10:39 

Can we see that?

MARK: 00:10:42 

All right, cool. Here we go.

[YOUTUBE VIDEO](https://www.youtube.com/watch?v=ctF7W-FlLrA&t=18s)

SAM: 00:10:57 

Hello there. Sam and Andrew from Shielded Labs here with another crosslink update. Recently we've been working on testing. And that, of course, means being able to run tests in this manner where we run offline tests without network connections. These offline tests simulate presenting various data coming from the network to our node and then we test whether or not it accepts and rejects, and we observe the state. Now, these are interesting. They're not unit tests per say. These terms are very complicated, I think  they mean different things to different people. What we have is a file format or a data format, I should say, which we can both pull from disk and generate. And then we feed that data format to the program which processes these instructions to run the test. We'll take a look at those in a second. But first I just want to show, say here in this test, if I break it and recompile the test, which because we're using Rust, will take a little bit. We should see. We're going to see when the test,  At what instruction exactly the test failed. In other words, when did it deviate from our expectation? And then we'll also show, of course, the visualizer is not in use here, but we can also build with the visualizer, go in and inspect the state of a test. So here the test failed. So these instructions worked, and then we failed on this one. And then, you know, these are the ones that come afterwards. Very useful. So then if we also wanted to run all the tests with the visualizer, we can do so as well. Of course, then we'll have to wait for another compile run. Andrew, is there anything. What else is there to say about the instruction format while we wait?

ANDREW: 00:12:39 

So the instruction format is a binary format. It's fairly simple. But we've chosen that for a few reasons. One is that the data that we're getting off the network is just going to be effectively binary data. And so we need to be able to handle that  canonical form that we're going to get presented in, as well as handle the possibility of malformed data or maliciously presented data.

SAM: 00:13:03 

I've shown the visualizer running the test now, so now the viewers can now see your screen, so you can actually just show them the format.

ANDREW: 00:13:12 

Brilliant, thank you. So as well as just being running the actual canonical data, it also means that we can save any arbitrary data disk which could have been presented, could have been generated from visualizer, from arbitrary code or in the test themselves, as I think you should have just earlier, if we take a look at the format here directly. Sorry, one other thing about the format itself, or the benefit of the format itself is that because we're just using bytes, we're isolated from any kind of rust type changes or rust member changes that don't directly affect the serialization. So it helps us avoid churn on changes that aren't actually meaningful.

SAM: 00:13:59 

Maybe the best way to say that is if we for example, change the format of proof of stake blocks, then that changes what we are testing. And so it makes sense that much of the tests would have to change. But if the data is the same, because of course all programs just transform data and so if the data that goes in and comes out, it's the same, then that's the thing we're testing. We're testing the program end to end without doing network connections that take time so that the tests can run quickly.

ANDREW: 00:14:31 

And because we know exactly the sequence that things are going to be happening in, it means we get to avoid any flaky race conditions or other reasons for inconsistent tests. So the format itself is very simple. We have a short header that just identifies this as our test format, says how many instructions we have in our stream and then what locates them, and then immediately following that, this big binary block of data, just kind of completely arbitrary, can be any bytes and following that are the instructions themselves. And then the instructions say what kind of thing they're doing with their loading proof of work blocks, loading proof of state blocks or various other things. And then if needed, they will reference data in this binary block to it will actually make up the serialization of this proof of work or proof statelock.

ANDREW: 00:15:18 

And so we basically load this memory, treat this as an array, iterate through it and run all of our normal operations. There's a separation of concerns where the test data basically gets piped in in the same way that the BFT consensus data would normally.

SAM: 00:15:39 

Yes, yes, exactly. We run on the same Rails or code paths, I should say.

ANDREW: 00:15:43 

So we're testing as much as possible the real code that we're actually running.

SAM: 00:15:48 

And there's also an additional advantage here, which is having it be bytes. When we write our code, we add types in order to try and know that things are in a consistent state, etc. But the thing we want to test as a program, we're writing a program that is exposed to the Internet and any malicious actors. We want to make it easy to construct malicious inputs or malformed inputs. And having just the raw bytes makes that as easy as it could be. All right, I guess. Do we have anything else to say?

ANDREW: 00:16:24 

I think that's it from us for now.

SAM: 00:16:26 

All right, well, until. Stay tuned. Yes.

ALEX: 00:16:39

Thanks. Are there any questions for Mark?

ZAR: 00:16:44 

Sorry, how do I get a link to that? Is that on the chat? I don't get a link to that video.

MARK: 00:16:50 

I'll put it in the chat now.

ALEX:00:16:58 

Thank you, Mark,  open announcements. Does anybody have any announcements they'd like to share? Nothing?


## Open Announcements

ZAR: 00:17:23 

I do, Zingo is about to release for the first time in many months, a new version of our wallet. And I think maybe this is the first venue ever where we're announcing. Probably, we think given a few different benchmarks, and we're still benchmarking and looking for other data sets to affirm this and trying to reproduce multiple. With multiple different testers. But we think it's the fastest syncing zcash wallet that there is, so we're pretty excited about that.

ALEX: 00:18:45 

Awesome. Thanks for sharing that zar,  any topics for open discussion? All right, quick and efficient meeting here. So the next arborist call will be July 24th at 1500 UTC. So thank you for joining us.

Next Meeting Scheduled: 24th July 2025  15:00 UTC

