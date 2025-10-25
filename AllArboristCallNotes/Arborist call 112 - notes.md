## Arborist Call #112 Notes

Meeting Date/Time: Octobe 16, 2025 15:00UTC

Meeting Duration: 42 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra Update [zebra,Z3, Nu 6.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [Nu6.1, zcashD](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Zsa,orchard,librustzcash](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets) / [crosslink, trailing finality layer](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labsecc-crosslink-trailing-finality-layer)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion-i)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=G6P-k2I-7kU)

Moderator: Pili

Notes:chidi [@ZcashNigeria](https://x.com/ZcashNigeria)

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:00:00  

Alright, so welcome to today's arborist call on the 16th of October, 2025 I'm Pili from the  zcash foundation, and this is the agenda for today's meeting. So we'll start off with some updates from the teams working on the core zcash stack, the zcash Foundation, the electricCoin Company and zingo labs. And then we will follow this up with some updates from teams working on research and implementation of new features,  Zsa , shielded labs on NSM and shielded labs and electric Coin Company on crosslink. We will then open up the floor to participants to make any announcements, or if there's any discussion topic that has come up during the call or people want to bring up, then we will have time for that at the end. So what is the arborist call? The arborist call is a bi weekly call where zcash protocol contributors meet up to discuss upgrade timelines and processes, protocol research and development efforts, design and implementation of new protocol features, identify blockers and resolve them and the purpose of this call is to try to make zcash protocol development accessible to interested parties and to provide more transparency for everyone interested in zcash. Anyone can register to attend. You can go to  arboristcall.org and if you want to become more involved and present during the arborist call, you can email us at our arboristcall@zfnd.org, and we'll get a presentation slot for you outside of the arborist call you can participate in zcash community by applying to one of the grant programs, you can also take part in community discussions in the  zcash R and D  discord or the zcash community forums. And there are clickable links for all of these if you go to zcasharborist.org so let's see if we've got people Yeah, let's start with some updates from Zebra, from the engineering team. I think this is Marek today. Please take it away.

## Zebra Update 

Marek:00:02:08  

Marek, yep, it's me today. Thanks pili So we've just published a release candidate for nu 6.1 which is zebra 3 RC, and if everything goes well, we'll turn that into zebra 3. In the past two weeks, we've also merged a bunch of externally contributed PRs which were related to error handling, RPC, APIs and the rectest mode, big. Thank you to the authors of those prs. They were great contributions. We've also fixed a divergence from Z cash D in Zebra regtest That was reported by the Zaino folks. We have also finally looked at zebras performance, and the result of that effort is that zebra 3 will sync much faster than zebra 2. The fastest sync we've had so far was eight and a half hours, and the slowest one was somewhere around 16 hours. And you know, these are much better numbers than the 50 to 70 hours we used to have. I have one more update for developers who work with Zebra. We've updated the docs for building it, and the main update there is that you can link RocksDB dynamically if you are tired of recompiling it whenever cargo decides to do so. RocksDB, as you know, is a c++ library which zebra uses for its persistent storage, and it takes a while to compile it. And if you want to skip that entirely, you can install rocks DB as a system library and point the compiler at it, and it will just link it dynamically. The docs have the instructions, but they are not rendered yet on the web because we haven't finished migrating to a new hosting provider for the docs. Yep, and that's all I've got.

Pili: 00:04:41  

Oh, thank you, Marek, we have a question on the chat about whether we have any comparison with Z cash D for the sync.

Marek: 00:04:50  

I don't know how fast zcashkd syncs off the top of my head. I remember it was around two days. Yeah, yeah. We haven't done it recently. 

Kris: 00:05:09  

certainly more than eight hours. But that is syncing, probably from Genesis rather than from, I guess, sapling activation. So there's some difference there.

Pili: 00:05:19  

Probably the last time, I can't remember exactly, but it was faster than two days, it has gotten faster. Recently, significantly faster zcashd or zebra.

I'm sorry, zebra

Marek: 00:05:36  

no worries. Thank you. Cool.

Pili: 00:05:41  

Any other questions for Marek and the rest of the zcash team. i mean zcash foundation team, sorry, ? Cool. Should we move on? Let's move on. Next stop is updates from the ECC Kris that's you.

## ECC Update 

Kris: 00:06:06  

So let's see, since the last arborist call, we had just made the Nu 6.1 zcashD release, and then there's been a lot going on with respect to the massive influx of zashi users. And with that massive influx of zashi users, they have discovered some corners of the zashi wallet back end that needed to have some bugs fixed and cleaned up and whatnot, so that has been our primary focus for the last couple of weeks. So we have not made substantial progress. Strad did add a PR for adding authentication or to the Zallet API because we did not have password, password authentication there previously, and Cookie, cookie auth is in the works, but that's, that's basically it on our side. So we've made it updated. Oh, we did make an updated crate release of Zcash keys in addition. And there will be new releases of the Z cash client back end and the remainder of the Librustzcash stack probably next week. Yeah, so that's that's it. So our primary focus for the next couple of weeks, going forward is so I am mostly focused still on wallet back end tasks, but Daira, Emma and Strad are putting all of their attention towards the orchard crate review for qedit, so that we can move that process forward, so probably after the next arborist call is when we will actually be getting back to more work on Zallet and zcashd deprecation.

Pili: 00:08:20  

Thank you, kris. Any questions for kris?

Nate: 00:08:30  

I have a question. What kind of big influx of users or like, how many? What has changed? I'm curious,

Kris: 00:08:42  

So I don't have the exact numbers, but I think that Josh may have posted some of these in his weekly update, but essentially, we've gotten as many new new zashi users in the past two weeks as we have in the past year. So Well,

Pili:00:09:08  

Any other questions for kris, yeah, congratulations guys.Okay, let's move on. Next stop is zingo labs on zaino , who wants to give the update?

## zingolabs updates - zaino

Dorian: 00:09:30  

For the last two weeks, we've been making a bunch of progress in the RPC endpoints, with four completed. I think one of them was Pacu. Thank you. And there are also two more under review. And on the zallet side, we've also been making progress on the chain index integration. Which is a replacement for the old local cache we were using. Thank you

Pili: 00:10:04  

Great. Thank you, Dorian. Any questions for Dorian or the rest of the zingo labs team? okay. Let's move on to zcashd deprecation updates updates. Pacu, would you want to take this one?

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:10:34  

Yes, thank you, Pili. Well, besides everything which was covered by Kris and Dorian, the outreach efforts have been significantly improved by this influx of people or people's interest in Zcash, so responses and interest from partners has raised significantly, which is very good. We are getting new responses for the network upgrade friction survey that we are conducting to know how traumatic or how awesome our network update processes involving transaction changes are. That's something that we had a lot of superstitions, but we didn't have any real information or data we could make decisions on and as well interest for the zallet alpha. So thanks to all this privacy focused interest of the public, we are being more prioritized, and that's helping out a lot to get new zallet at alpha interest and also interest on zebra or interest on block explorers and API providers  that would like to provide RPCs for zcash developers or zcash enthusiasts. So we are improving a lot there. So it's very exciting. Then we're starting to work towards deprecating light walletd that it's like the small cousin of deprecating zcashd, I guess that a lot of that is happening at like, lightclient working group, but the work kind of like it has an intersection with this section, and we're starting to work towards that with working on adding transparent data to the  protocol to make like everything related to shielding or supporting transparent from from mobile wallets or light clients to be less tricky in terms of what information the clients request to the servers, and what the service can learn about that. And so that's something that was not kind of on the radar when we started all of this, but, yeah, it became necessary so that means that we're making a lot of progress that we start to think about, what's necessary  to sunset, like, well, so it's awesome. That's kind of it. Okay.

Pili: 00:13:13  

Thank you. Any questions for Pacu? Any comments? I look forward to reading some of the responses to the Nu friction survey, if that's available to me, good to get some feedback. Cool. Let's move on to the research and implementation updates. Starting off with qedit, vivek is that you today?

## Research and implementation updates- Qedit Zcash Shielded Assets

Vivek: 00:14:28  

Yeah, that's me. Hi, pili and everyone else. So yeah, we have a few updates to discuss today starting with the zips. So we had some changes to the zips since the last time I was giving the update, I think that was two months ago. So  most of the work has been completed in the last month. And Pablo probably mentioned that last month, things are again largely stable. We made one refactoring to the zip regarding the orchard note plain text recently that turns out to be affected by both the Zsas and the memo bundles. And so that's currently open  on the zips repo, that pull request. So other than that, we've made all, pretty much all, these zip changes all across the stack, which is orchard, Librustzcash, zebra, the test vectors and so on. It's going specifically to the repositories. Orchard, as kris mentioned, we've been keeping the orchard pull request, the upstream pull request, ready for review on a wall footing so that, ecc, can get started with the review whenever it works out. We did also have a meeting with Daira Emma a couple of days ago, and we gave a quick tour of changes over there, the orchard Zsa changes. So Daira Emma spotted something that could leak, like a small amount of info about, like, which assets are not being transferred in there. And so, yeah, we made that fix as well already. It's just a small shuffle of the actions of like in the orchard implementation. And we'll be merging that. I think it's just like in the final stages of review. So we'll merge that in the next few days, I guess. Yeah, librustzcash, we've also kept that up to date with all the zip changes we were working on, like, making this also, like up to date with upstream. We, I think we got, like, the main stuff in, like, the stuff that actually interacts with our protocol. I'm not sure if we are, like, up to date to the last commit or anything like that. We've also begun implementing the fees for Zsas  in Librustzcash. So that's something that we've been discussing a bit with Kris and Alfredo from ECC and Zcash foundation. So I made a first draft of that, but I am still like adding a few tests to make sure things work as expected. And then,  we'll review it once, and then we'll probably discuss it with Kris and Alfredo the next time we meet. Yeah, Zebra wise, I think we've made some good progress as well. There we pulled like, we brought it up to date to, I think version 2.4.2. I think of zebra ,slightly older than, like, the current version. But we caught up a bunch. And we've also made, like, good progress on the state management front for like, this additional state that needs to be added for Zsa. And yeah, we've also made it working with the latest version of orchard and librustzcash that have these zip changes implemented. And yeah, last is the test vectors,  we've worked on that and made that up to date with all the zip changes that happened over the last month. So yeah, that's the basic status. I think we have an open PR for Librustzcash as well, but that's something that won't probably be getting reviewed until after the orchard review, and then the orchard review will possibly have, like, knock on changes there. So it's there. It's in the repository, but it's probably not going to be immediate review stuff. Yeah, that's basically the update from us. 

Pili: 00:18:58  

Sorry, I was just saying that. Mark has been very helpful, putting up links on the chat for everyone related to those. Any questions for Vivek? okay, well, thank you, Vivek. Let's move on to Nsm shielded labs. Hey, Mark

## Research and Implementation Updates Shielded Labs- NSM

Mark: 00:19:24  

yeah, as you pointed out, I posted two links to two different pull requests in the chat. Marius have been dutifully merging them and keeping them up to date with Maine, and I believe they're all but ready to be merged at this point, they might need a couple extra AC ks from people, or whatever the process is there, but I think those are ready, and once those are merged, we'll move on to zip 234 and zip 235, thats all from us

Pili: 00:19:54  

great, short and sweet. Any questions for Mark?

Kris: 00:20:02  

I've pinged Daira Emma for the test vector review again.

Mark: 00:20:07  

Thank you, kris. I appreciate that.

Pili: 00:20:18  

Any other questions or comments? Yes, let's move on to crosslink. Who can talk about that today?

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:20:33  

Hello, hi. Let's see. First we have a demo video, so let me see if I can share my screen

Pili: 00:20:38  

Oh, can we stop sharing. Yeah, this is always fun. Yeah, I'll just stop sharing. And then do I need to give you? It's been a while since I've done this. I don't know. You just do it yourself.

Nate: 00:20:59  

Can people see my screen? It says, I am sharing.

Mark: 00:21:50  

Nate, if you just switch to your laptop microphone instead of your EarPods, and then just play the video, it should just pick it up.

Nate: 00:21:58  

Okay, I'm not yet sure how to do that.

let me just try disconnecting my ear  pods, here we go 

[crosslink #4](https://www.youtube.com/watch?v=FSeyWwUsEKY)

Andrew: 00:22:25  

We unfortunately don't have Sam today, as he's not feeling well, so you have to make it with just me. Since the last arborist call, we had a workshop in which we learned quite a lot about the UX for onboarding finalizers, and we're now at the point where we can just run the executable without doing any config, and it'll join the existing test net. It'll gradually get up to sync. And we can see here that we're now getting both proof of work and proof of state blocks so it's worth noting that the roster management is occurring on the proof of work side, very temporarily. This is stored in the proof of work block headers. This has a couple of implications. One, the fact that it's now in the proof of work chain means that anyone running an internal miner can get themselves into the roster without any manual into it, without any manual intervention from the shielded labs team. So this is exciting. The downside of the fact that it's in the header, as opposed to in a transaction, is that if it were in transactions, it would be being shared in the mempool, which is a very low latency, and everyone would know about it very quickly. The fact that it's in a header means that is relying on blocks sync, which is slightly lower latent, sorry, higher latency, and it means that you kind of end up with, you may end up with a side chain locally of the blocks you mined, which then don't get transferred over to everyone else, and we have to keep resubmitting your your roster request until you actually get on. This is interesting for testing purposes, having all these side chains, but is obviously not the end goal of production. So we can see we've got our roster being updated, and as we finalize new blocks, both the members of the roster accumulate new stake, and also we get new additions to the roster. Currently we have a kind of insecure username thing going on where, you know, you can edit stuff with a human readable name. But this obviously is not the, again, not the production intent, that'll just be a public key, yeah? So rather than waiting. Looking for this to fully sync, I am going to quit and run a reg test version, just to demonstrate a couple things. So the roster model is not one where you have to completely register. You have to register as a Finalizer, and then people stake to you. We have a model where, by staking to an address, what will be a public address and is currently a username, you implicitly create the roster member. So we've started with myself as a roster member, and we can add some stake. So if we submit this command, then fairly shortly, a proof of work block will be generated with this , give it a sec, and you can see, I started with one stake. This is a kind of fairly arbitrary number.And once a block was finalized, we get 6000 total reward. Again, a completely arbitrary number per block and then this gets distributed between the members of the roster by stake, and we can see where was it? Somewhere around here. Yeah, we added this command. Added a bunch of stake to myself, and we now have a lot more stake here. This interface is available both in the GUI and also via the command line. And it's what will show here that we can add stake to any arbitrary person or address or node, and they will become once they get added and finalized. Let's see. You'll be somewhere around here. Here we go. Once this gets finalized, we will see Billy get added to the roster and is accumulating stake relative to their position. Now we have a workshop coming up next Wednesday, on the 22nd so if you can join us for that, then you get to play with everything we've got I've just shown here. And if all goes well, we may also have an extra surprise to you. Until then, we'll see you guys later, take care everyone. Okay, quick addendum, I just all right, you

Nate: 00:27:43  

I also have overall updates. So like we said, we're doing a workshop next week, and that is basically the same functionality as our last workshop, but our last workshop had a bunch of hurdles and snags to participate in, so this workshop should be much easier. Okay, yeah, I cut off part of the video. Sorry about that. So if you want to participate next week, it should be much easier. You should be able to just run like build and run the node with no with like, a default configuration, and it should join the network. And let's see, we've been blogging about our staking design and getting a lot of feedback about that. We have yet to implement it, and we've also started discussions on how to sort of evolve our testnet. So you know, right now you just saw a video demo kind of showing the functionality of the testnet, but our ideal is to evolve it all the way to the point that it's like a production quality feature test net well before it is scheduled to be activated in a network upgrade so that we have, like people are able to do, end to end testing of, say, wallets or other infrastructure. And we've been brainstorming ways to make that more more real with real zcash, and so the easiest or most obvious way to do that is to have rewards or bounties for participating. You know, if, if you can achieve certain goals. But we've also been brainstorming, are there other ways we could? I. Other more sophisticated mechanisms, such as if you burn Zec on Mainnet, then that gives you the ability to stake on testnet, or more radical ideas like that. We haven't committed to anything like that, but I just wanted to share that we're trying to brainstorm ways to sort of smoothly let people opt in to trying out cross link with real zec at stake, so that we can get validation and confirmation that people want it and it's useful before we have to activate it in the core protocol. And then the last piece is we have made a ticket. I wanted to draw people's attention to this. Just a moment, we have a ticket about preparing an emergency patch. And the idea of this is this would be like a permissionless patch that has a hot fix that sort of disables proof of stake and reverts back to proof of work. And obviously we don't ever want to need to use that, but our thinking is, if it's already prepared and tested, it can help improve confidence. And also, let's see if there is any emergency situation where that is the right move. People will already know some people will already know it exists. So we can shorten the turnaround time to release like an emergency hotfix update. And that turnaround time is important because it affects our security reasoning about how long staking  needs to be locked up. Like, how long is the unlocking delay? And so we've, like, we've gotten a lot of feedback from people who have experience staking on different networks, and there's a variety of delays. So, like, a Solana might be very fast. It might be on the order of two days. Ethereum has this queue, and it so it varies, but when we looked at a point in time, it was about 28 days. And so that makes a big difference for user preferences, for for people who stake on different networks, but from our sort of security focused perspective, we want to make sure that if, if there is malicious activity involving stake, that the Network of Users sort of has the opportunity to, like, freeze things and figure out What happened. But we don't want any sort of freeze button in the protocol. We don't want any sort of centralized control. So this idea of having the emergency patch prepared ahead of time is sort of like a balancing act between, you know, decentralized, decentralized, permissionless things that people could choose to activate in an emergency upgrade, versus trying to keep the unlock period short so that staking is appealing to users. 

Pili: 00:33:39  

I have a question about that. How would that work? In fact, then, would everyone running a super node have to run a new version? Or is it like a command that you ran on? Yeah,

Nate: 00:33:51  

it would have to be a new version. So it would, it would basically be an emergency network upgrade. We've never had to do one of those, like on short notice. And so it would require, since this is disabling proof of stake, it would require, it's a little bit tricky, but it basically requires most of the mining capacity to install the new hotfix node so that it would have to be convinced, and then also we would want to make sure, like exchanges and so forth, are all on the same page, to avoid confusion. it could cause a chain split. And this a reminder Zcash, our very first upgrade called overwinter made a change so that in the event of a chain split, users should have more safety around their funds, because it prevents what was called a relay attack that can happen kind of by default on blockchains that split. So that would be the worst. This case, probably, and hopefully even having the notion that there is this emergency patch would deter people from trying to do malicious activity where this could be used. So it is what it is. If you're interested, you can check out ticket number 24 Cool. Thank you.

Pili: 00:35:24  

Any other questions for Nate? Okay, I think that's it. Then any announcements or discussion from anyone for today, go ahead

## Open Discussion 

Nate: 00: 35:47  

I don't know if this is an announcement or a discussion topic. I'm interested in standardizing burning Zec for a few reasons, and then also standardizing. How can we post public information with a transaction? So there's a few ways to do these things already, but I'm interested in standardizing it to make it available for, like, app developers. And one I've been asking around if people are interested in anything that burns Zec. And Zec mec got in touch with me, and he's been sort of doing the design side of like, a social app. So like, a Twitter replacement that uses Zcash burning to, like, remove spam or things like that. So he was interested in it. And by the way, he's also looking for anyone who can help him with the actual like, backend Zcash wallet coding. So if anyone's interested, you can talk to him. Yeah, so I don't know how to go about standardizing that, but I guess for me, the first step is to chat with people intimately familiar with wallets and transactions and wallet API's and see what, what a good API and implementation might look like. So interested in that, get in touch with me.

Pili: 00:37:31  

Great. Thank you, Nate. I think I saw the post on the forum from zecmec about this, where he's talking about, what do you get for burning? Do you get like option to participate in governance decisions? I think that was one of the things he was talking about. Cool. Well, any other announcements so we can switch to discussion or any other topics up for discussion today. Raise your hand if you do, Dorian, go ahead.

Dorian: 00:38:14  

Yeah, this is probably too specific, but there's an endpoint in zaino that is not going to be implemented in zebra, and there it relies on an implementation detail of zcashd. So I decided to write me a spec for it, and I left a link in the zaino discord channel, if folks want to take a look at it.

Pili: 00:38:52  

Okay, thank you. Would you? Do you have the link so you can post it also on the chat here? Useful for people, I'll wait for that, and then if anyone else has any other discussion items, thank you, Dorian, so there's the link on the chat To the spec, I guess any other discussion topics?

Right? I don't see anyone. Last chance to raise your hand waiting for two weeks until the next one. Okay, let's. Leave it there. Thanks everyone. We will have the next one on the 30th of October at 21 UTC See you then. Thank you. Bye, for now. Thank you. Goodbye,

Next Meeting Scheduled: 30th October 2025, 21:00 UTC
