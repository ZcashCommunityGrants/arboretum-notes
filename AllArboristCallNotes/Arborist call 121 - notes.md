## Arborist Call 121 Notes 

Meeting Date/Time: 19th March 2026, 21:00UTC

Meeting Duration: 25 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra Update [4.2.0](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

ZODL Update [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update) 

Research & Implementation Updates -[zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino)/ [zcash d deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcash-deprecation-updates-zodlzf-zingo-labs-pacu)/ [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)/[Crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer)/[dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fee)

Open Announcements 

Open Discussion 

Video of the meeting: [recorded](youtube.com/watch?v=LtdKAhi6l7s)

Moderator: Alex

Notes:chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:02:54  

So this is the Zcash arborist call for March 19, 2026, so yes our agenda. So we'll start with core stack updates. Zcash foundation with Zebra, zodl with Zcash D core libraries and Zallet, Zingo labs with Zaino and pacu with Zcash D, deprecation. Then we'll do research and implementation updates with qedit for zsas shielded labs for network sustainability mechanism, shielded labs and zodl with cross link trailing finality layer and shielded labs with dynamic fees and then open announcements and discussion, if there is any, what are arborist calls, bi weekly calls, where Zcash protocol contributors convene to discuss upgrade timelines and process protocol r, d efforts, design and implementation of new protocol features and identify blockers and unresolved issues. Purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development, can register at Zcash arborist.org if you want to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Other ways to get involved are through Zcash community grants , Zcash R D discord and  the Zcash community forum, and these links are listed on the website. So let's start with core stack updates with Zcash foundation and zebra.

## Zebra Update 

Alfredo: 00:04:39  

I will give updates for zebra. Since the last arborist call, we released zebra 4.2.0 mainly had extended RPC functionality and parity with Zcash D then we added some mempool policy. Sorry, this is for transactions to get into a mempool. We added some policy, which is the same that zcash D used to have. Then we added some state requests that were requested by zaino Also, that's including the release. The release also includes a bug fix for non finalized state backups, which we discovered in the integration test that there was a bug there.  Apart from that, we just fixed a bug in get block subsidy that should have been included into a release, but we forgot to add it. So sorry about that, and we fixed a block propagation error in reg test, which was found also by the integration test. So visit that and in progress right now, we are integrating a test trigger, which is when the integration test repository, sorry, when zebra push a comint to main the integration test repository should run all the tests. And that's the same that's going to happen for zallet and zaino as well. So we have that pending, add that into zebra, at that functionality. I see zallet already have it, and we are about to merge the zip 213, which is shielded Coinbase, if I remember correctly. We have merged all their PRs interdependencies, and that's kind of ready to go. And then the fly client and NSM, all PRs we had in zebra had been bumped in the last week, so we haven't seen Marek working on the flight client, and Conrado, I think in the NSM. So that's has a bit of fraction, again, that's all I can remember.

Alex: 00:07:05  

Any questions for Alfredo, Pacu

Pacu: 00:07:09  

Well, great, great work team, you mentioned that there was a fix in get block subsidy that didn't make it to this last version. Are you folks going to cut a new version, like 4.2.1 or something in the next two days? Or is something that is not urgent?

Alfredo: 00:07:37  

And that's a good question. I am not sure. Yeah, I don't know, to be honest, I think about it, but yeah, thank you for that.

Pacu: 00:7:51  

And the shielded Coinbase. Is that in Main or included in 4.2

Alfredo: 00:07:59  

No, we still have pending PRs that are not even in main so it's not there yet. Partially, they are a thing, because the full functionality was several PRs, and it seems some of them are merged, but the full work is not there yet.

Pacu: 00:08:18  

All right, cool. Well, it's an incredible list of work. So congratulations for doing all of it. 

Alfredo: 00:08:25  

 yeah. Thanks.

Alex: 00:08:35  

Other questions for Alfredo. Great. Thanks Alfredo. Up next we have zodl with Zcash D core libraries and Zallet

## ZODL Update 

Kris: 00:08:49  

looks like I'm probably the only one here again. So significant things we've been working on in the past couple of weeks have been the integration testing repository. So I think we now have fully set up integration testing for the whole z3 stack  with Zebra, Zallet and Zaino, that each get pulled in, built and then exercised together using the RPC tests. And there's infrastructure set up so that the the various repositories, when pull requests are opened on those repositories, that they can trigger CI builds using the integration testing repository. So that's been one major focus of effort. The next major focus of effort has been on essentially Nu 7 specification and planning. There's been a lot of movement among the groups in the ecosystem to figure out what Nu 7 is going to be, and we've been doing a bunch of zip work on that, and in coordination with other teams to try to to figure out the shape of a sensible Nu 7. And then, apart from that, Zallet work is moving forward with Z shield Coinbase and  the other major thing there is there's a bunch of backend work going in to support fully transparent transactions. You know, that's something that Zcash client back end does not support it up until this point, but for Zcash D wallet replacement, we obviously need it. And so that's that's requiring a bunch of backend work. I think those are the dominant things right now. There's a little little bit of other wallet stuff on the side, but, but those are the main things.

Alex: 00:10:53  

Any questions for kris? Great. Thank you. kris

Kris: 00:11:03  

before we go on. I do have one request for others in the ecosystem, and that is, let me find the zip pull request. Pul 1206 in Zcash zips. I would greatly appreciate feedback and response on so this is, this is essentially a replacement for what was revision one of the Unified address standard. Revision one was met originally with, with some, you know, some suggestions for improvement. And so we've withdrawn revision one, and are proposing now a revision two, and I'll drop the link to that in the chat. Okay, that's it now. Cool.

Alex: 00:12:01  

Thanks, kris. Any questions for kris before we move on? Great. So on to zingo labs with Zaino.

## core stack updates, zingo labs zaino

Hazel: 00:12:11  

Hello. So see we have been polishing off our release candidates. We've got a whole bunch of bugs fixed that I think zaino D is now in a releasable state. We got the back end stuff that zallet is using in position where str4d was finally able to, like, start testing with our new backend, and that shook loose a bunch More bugs in that, and we've got most of those finished off. Now, there might be another couple of those still being tidied so. And then I think we will have, I think our sixth release candidate will be Zaino release maybe still, still too early to say that, but I'm hopeful for this one.

Alex: 00:13:27  

Questions for Hazel?, Okay, thank you. Hazel, ZcashD deprecation updates with pacu, ZF, single labs and zodl, all right.

## Zcash deprecation updates Zodl,Zf, zingo labs pacu

Pacu: 00:13:51  

So besides all the things that were mentioned, Zaino now supports zebra, 4.2 , thanks for the zingo folks who reviewed all my last minute PRs during today and yeah, all the integration tests seem to pass, and now what I have left is to try to sync testnet with zodl we already synced zingo lab on test net really quickly, and now we're running like I'm running this manual test of syncing this old, old testnet wallet I have. And also today we met in like client Working Group and decided  the next steps that we're going to take to build some tooling to to have some metrics on parity between Zaino D, lightwallet API and Lightwallet D, so we kind of like drafted a path to deprecate lightwallet d and be sure that's going well. So we're going to start working on that now. But lightwalletD isn't going anywhere for now, so we're releasing a new version of it soon with updates. So pay attention, all the people running the node program from our emersonians team. You'll be seeing new software soon, and I hope we can also bring you folks, Zaino D. I tested Zaino D on testnet, and the latest version that Hazel talked about really improved the sync speeds tremendously compared to its previous RC. So we're also working on optimizing and making zaino faster and crashing some bugs as well. So that's what's going  on this end. So

Alex: 00:16:23  

Any questions for Pacu? Great. Thank you. Qedit,  Zcash shielded assets. Does anybody here from qedit today? I don't think so. So we'll come back if, if somebody shows up next, research and implementation updates, shielded labs with network sustainability mechanism.

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:16:51  

Thank you. Yeah. So there's just a very quick update, the NSM zip 234 and zip 235 have been split into two PRs, two separate PRs with a smaller commit history, a little more tight focus. Both of those PRs are up, but there's an additional third PR, which is a minor refactor that came up through extra conversations, and that was just to remove deferred pool bound to change from different types of blocks and calculate them on demand. There's more context in the PR, which I'll put in the chat, but those just need some eyes. The 234 PR is blocked by the minor refactor because it does actually simplify the 234 implementation. So I just need some eyes on that. But that's about it. On the NSM side,

Alex: 00:17:41  

Awesome. Thanks, Judah. Any questions for Judah? Great. On to shield labs and zodl with cross link trailing finality layer

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:17:58  

Okay, so we are wrapping up the last milestone of our prototype phase, and so we're hoping to do a workshop in mid April, two or three weeks from now, and the the transition, to the next phase is where we're going to start aiming for making the feature development networks more persistent and to enable users to be able to migrate state across them. So the thing we're going to start with, we'll have networks we call seasons. Each season we will deploy a new version of the software that will start with a consensus protocol, similar to mainet, and then it will activate the current version of the cross link under development. But then also, we want to enable users to be able to migrate state, some state from the previous season, to give it a sense of persistent history with the participants. And then, along with that, we plan to have like, a rewards program based on a donation of Zcash that we received from Vitalik Buterin and yeah, so that's the goal. So we want to launch that in a couple of weeks. We intend to post more about our roadmap next week. I'm working on a post to the forum about some terminology we're using in shielded  labs, around testnets, and also how we're thinking about testnets, to see if some of those ideas are useful for other people, or if we can collaborate with any folks on any of those and that's sort of the where we're at in the bigger picture, some updates that we've been working on during this milestone, we are working on a new networking transport layer. And so this started because we we wanted to improve how quickly we could do initial block sync, and when we started investigating how we might improve that with the networking layer, we began talking to different teams about to sort of do like speculative early requirements gathering. So we've talked to people from the tachyon team, the zebra team and the Nim team about what we're thinking with this transport protocol, and what sorts of needs they might have, and how we might meet those needs. But that's not a primary goal. That's sort of early exploration for how this might be useful beyond crosslink. And then we have the start of a tool that we're going to begin using to automate deploying these new seasonal networks we're hoping  that might be useful for other people who are deploying testnets. And then we have a zip PR. That's totally a placeholder, I made it yesterday, just quickly to check something off. you should see some placeholder zip work there next week. Yeah, so I think that's it for crosslink.

Alex: 00:22:10  

Any questions, yeah, cool, thanks. Nate up. Next, shielded labs with dynamic fees.

## Research & Implementation Updates Shielded labs- Dynamic fee

Mark: 00:22:29  

We withdrew the existing dynamic fee zip, just because that was required for the Nu 7 polling, and we're sort of regrouping and making a new roadmap, and where we're going to start is creating what I'm calling like a mainnet sensor, or fee sensor. And I'm working on a fork of Zaino that's going to have a new RPC endpoint called Z get standard fees or some such thing, and like dipping a sensor into a flowing river, I kind of wanted to start gathering fee statistics from MainNet and seeing what information you can gain from that. So that's what I've started working on this week, is implementing that endpoint in Zaino, and we will also be publishing a more detailed and comprehensive roadmap in the next week or two, detailing sort of the rest of our thoughts on how we want to move forward with dynamic fees.



Alfredo: 00:23:41  

So I was wondering why zaino was choosing to put the RPC there, and why RPC and not gRPC? maybe

Mark: 00:23:53  

I thought it would be easier to do in an indexer rather than a full node. It just is a lighter lift. And as to RPC versus gRPC, I'm pretty agnostic to that. We can talk about that offline and

Alfredo: 00:24:08  

The zaino RPC endpoint is almost exactly the same as the zebra one. It passed through all the functions to zebra. So I'm not sure if that is going to keep going the case, but zaino I see main use case is as a library to zallet and as a gRPC endpoint to replace lightwallet D. So I'm not really sure how much use their normal Rpc has been, but maybe I'm wrong. It's just a feeling 

Mark: 00:24:40  

Okay, I look more into that, and let's, let's connect on like signal or something,

Alex: 00:24:48  

Any other questions for Mark? Great. Thank you, Mark. Open announcements. If you have any news or announcement you'd like to share, please raise your hand. Great, and then open discussion. If there's a topic you'd like to raise for open discussion, please raise your hand. We are all about efficiency today. Great. Thank you all very much. The next arborist call be Oh, did somebody want to say something? All right, thank you All.

Next Meeting Scheduled: April 2nd 2026 at 1500 UTC

