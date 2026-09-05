## Arborist Call 131 Notes 

Meeting Date/Time: 3rd Sept, 2026 15:00 UTC

Meeting Duration: 40 minutes

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zodl-core-libraries-and-zallet-cli-wallet) 

Research & Implementation Updates - [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs---zaino) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--nsm)

Open [Announcements](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=POkZ42EgXNQ)

Moderator: Pili

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:05:32  

I'm just waiting for at least, Alfredo's here. Just want to wait for someone from zodl to join, and then we'll get started. Yeah, John is saying that people might still have a link to the late call today. Okay, I think we have someone now. Okay, so let's get the call started. So, the usual reminder that the meeting will be recorded and uploaded  to YouTube. So welcome everyone to today's arborist call on the third of September, 2026. The agenda of today's meeting is almost the same as usual. We'll start off with some updates from the teams working on the core zcash stack, such as the zcash Foundation, zodl and zingo labs, and then we will follow this up with some updates from teams working on research and implementation of new features such as  qedit, shielded  Labs, and zodl. And if there's anyone else that has any announcements. So the arborist call is a biweekly call where zcash protocol contributors meet up to discuss upgrade timelines and process protocol research and development efforts, design and implementation of new protocol features, and we try to identify blockers and unresolved issues. And the purpose of this call is to try to make zcash protocol development accessible to everyone and to provide more transparency. Anyone can register to attend at zcasharborist.org, and you can become more involved and present during the call by emailing us at  arboristcalll@zfnd.org and requesting a presentation slot. Outside of the call, you can participate in the zcash community by applying for a zcash community grant, or you can also take part in community discussions in the zcash R&D Discord or the zcash Community  forum, and there are links for all of these, So let's get started zcash foundation zebra , and Alfred today.

## Zebra Update 

Pili: 00:08:52  

Yeah, thanks, pili. Can you hear me?

Alfredo: 00:08:56  

So since our  last call , the biggest item is the transaction type refactor we did in zebra .transaction  which is now a wrapper over upstream zcash primitive tasnsaction type, this was opened for months zebra side and is a huge change that touches more than 5,000 lines of code and it unblocks other integration work, so it's so huge that we find some issues with it after we merged. One of them was found by Conrado, which was a performance regression. The script validation was loading a quadratic number of transaction inputs we  fixed that, and then from an external contributor, we get some reports about consensus divergence. We open an issue for that, and we have a fix we're working on. So we we want to apply those fixes, and we want tto  ensurethese  don't happen again, like being more strict in our review process to try to catch them up earlier, so that's blocking our next release. We need to fix that before a new zebra release. So we are not sure when the next release will be. Apart from that, we did some network partitioning  changes. The peer connections are now cut for the IPv6 groups, not just by address, which was what we've had before. So peers with IPv6 could still attack us, and now we hardened that a little bit and we had an issue with a peer. So a peer mempool downloaded a  slot that was not released when the verification timed out. So we fixed that and we gained a small performance increase there as well. We did various change in the RPC in the RPC crate of zebra, the get address UTXOs is now bounded by requested height range  and limits. That was code contributed by an external person. Thank you for that. We had been changing some of the long tests we have that were stateful tests to regtest. So for the mining RPC, we made a version of regtest now, and that's significantly decreased our CI times for the operators. I've seen this working in snapshots  from Zebra, which was something we started to work, but then we left it there. Now we have a web page snapshots.zfnd.org, and we have the book page to explain how to use them. And let me see. So in the process, we had to merge stuff. We used a tool that was called Mergify to manage the queue in zebra and we replaced that with GitHub native merge queue because we think that that's going to be more efficient for our work right now. Related to that, we cleaned up our labels in the four PRs initials in Zebra. We had more than 120 labels, and we had 20 or something like that in order to be more, so people can understand better and not get confused with the huge amount of labels we had from the entire history of zebra we're not using anymore. Yeah, so then coming up, I guess we have several stuff coming up, but we don't have a date for the next release for things we need to fix before that.. We have a new tool. We have fixed a near tip sync restart loop. This also unblocks some of the quality integration tests we have been reading in our CI since a lot. We are working on that. Mike's working on a mining and mempool performance PRs, we can add in cage and stuff to some of the verification there, which should make Zebra faster. An external contributor opened a PR that caching shielded bundled verification, so we are hoping for a performance increase there as well. This is a large PR that was just opened yesterday. I think it was under review. Lastly, we had been starting to work in the new peer-to-peer version 2, which is a draft zip.  but we had been making some part of the implementation on the zebra side, so we are expecting to keep going there and find an agreement for the new peer-to-peer stuff. We hopefully will avoid some of the problems we have with the current framework right now, and that's pretty much it. pili

Pili: 00:14:17  

Thank you, Alfredo. Does anyone have any questions for Alfredo. It's a lot there.

No, it's great. All right, last chance. Let's move on. Next up is zodl Ironwood. I don't know if there's any.

Pacu: 00:14:51  

No, I thought I always thought was going to remove that slide.

Pili: 00:14:55  

Okay, well, let's move on. Core libraries and zallet

## Core stack Updates zodl Core libraries and Zallet (cli wallet)

Pacu: 00:14:58  

Okay, that'd be me. So these last two weeks, we worked on coin  Holder polling, and we collaborated with the Valor Group folks on that. A lot of work there. Great work was done with them. Danny mostly, And kris, then we shipped Zallet Beta 3 and it fixes some of the migration path issues that were reported from miners. Also, some of the audit items from least authority. Then we addressed all of  the issues on the least authority audit, and we are receiving feedback. It's like it's a two round. a two-round audit for those who are not familiar with least authority auditing process. So we are now in the round two where we get acknowledgement of the fixes or any suggestions on how to improve them. So we are there. We also groomed a bit of the GitHub security advisories that were kind of flooded with bugs, but  no GitHub issues. So it took quite  a lot of work. Thank you for the reports, but please before filing any security advisories, verify that this is really a security issue, not just a bug like I don't know, just a crash or something like that. And then we are working towards beta four of Zallet, and we're trying to make. We've said this many times, but  we kind of pay a bit. Like we  put too much on the betas that  we want to make them more often  and have less changes. So  we want to try to achieve that on beta 4. We had a bunch of miners already moving to Zallet full time, which is awesome. Which means that the migration iis working really well now. Besides  some edge cases, we encourage people that have wallet.dat files on their  zcash Ds to obviously back them up and try to import them into Zallet because it's really kind of a free world Kind of domain there, and you can do a lot of things inside the the wallet.dat file of zcashd. So it's really difficult to cover every scenario of how people can manage their keys. So it's good  to have feedback from various users  of the ecosystem, and please file  any issues you find in the Zallet GitHub. It will be much appreciated to catch those edge cases that we might have not covered with the tooling we have in place. Also we worked a bit on protocol and zip towards Nu7 And preparing a lot of zips that are in flight. Then we worked a little bit on some wallet correctness issues on zcash Client SQLite, And then we caught up in the release versions of the mobile SDKs with all the crunch  and  we had a little bit of mess there. So apologies  to the mobile SDK clients. We are releasing versions 2.7, 2.8, and 3.0 of the SDKs to tidy up a little bit the things, and we will ship,I think i version four soon, which will include coin holder polling on the just a minor

Kris Nuttycombe  14:58  

correction there, Pacu. 

Kris Nuttycombe  14:58  

2.70 3.0 and 3.0 will be forthcoming

Pacu: 00:19:02  

Okay, thank you. Yeah, it's a little bit confusing even to me. So you get an idea of the the backlog of versioning we had. We are straightening that up, and also we're starting to review some of the Tachyon and V7's PRs on Librustzcash, which is some future and exciting work, and also zips for the zcash peer-to-peer v2 as as Zf folks also mentioned that, and I think that's pretty much it to know not to go too much into like useless details.

Kris Nuttycombe:00:21:12  

Yeah, I've got one callout  or really two callouts for zip review. The  one I'm most interested in is this pull request or this PR that I'm posting in the chat. So this is what I believe is what we'd like to merge as a draft for ZIP 248, the extensible you know future extensible transaction format. I think I'm pretty happy with where it is right now. So anyone who can provide feedback on that PR, your contribution would be greatly appreciated. The second thing that I'd like to draw attention to, there was a discussion of the zip editors this week about the PR from Market Shielded Labs about reducing the marginal ZIP 317 fee to 1000 zatoshis per action. I think that in general we would like to move forward with that, but I also want to start a discussion with anyone who's interested about the possibility of  getting the zip editors out of the loop for fee changes, and my rough proposal here is going to be that we just decide on a a minimum fee in USD and and actually have full nodes start doing you know, come  up with an algorithm that we can use  a lagging averaged price history  to  round off and set a fee in USD. One of the things I'll call attention to , a change from current transaction formats in 1156. Since everything is going into bundles, I thought it would be a good opportunity to clean up a little bit of very old legacy behavior, which is, right now Coinbase transactions are always required to have a transparent bundle so that  the block height and the miner data can be recorded as a fake input, and so to clean that up, I wanted to create a Coinbase bundle type that is present only in the Coinbase transaction. But since coming up with that idea, it occurred to me that we may want to extend that bundle type to make room for things like optional miner signaling and so forth. And  fee floors are things that miners could signal for, and then we could actually have that data aggregated on chain. So anyways, just  some thoughts there. If anyone is interested  in that sort of Oracle based fee discussion, get in touch, please.

Pili: 00:24:41  

Okay, thank you, kris. Just going back to a comment on the chat regarding the wallet.dat, just mentioned that wallet. DB file that may need also clarification. I'm guessing in case people get confused between the wallet.dat  and the wallet.DB, yeah.

Pacu: 00:25:05  

Okay, yeah, noted.

Pili: 00:25:07  

Something for the docs

Pacu: 00:25:10  

Yeah, I'm currently working on clarifying migration paths on the docs. we updated the code, but the docs are lagging behind

Pili: 00:25:21  

great. Any other questions for zodl on the core libraries or zallet? Alfredo? 

Alfredo: 00:25:37  

Yeah. So as far as I know, the valar Group forked the core libraries and they improved it with some performance increase. So I was wondering how we are going to handle that.

Kris Nuttycombe: 00:25:53  

So we actually have an ongoing process to backport those changes to the Zcash org repositories. That's been spearheaded by Danny Williams. He's  been making PRs , doing review and some minor adjustments and backports of those PRs and so there's going to be a stack of them. It's going to be sort of an ongoing process. We have built some tooling to simplify that process, but still you know it's  still work that's ongoing, and we definitely would appreciate assistance, you know that's another thing. If you want to talk about how we're doing that, happy to sort of talk offline. But  reviews on those PRs would be greatly appreciated. The current one that is of most interest. Let me just double check. So yeah, there are two PRs on the pasta curves crate. There is PRs 106 and 107. Oh, and 103. Yeah. So 103, 106, and 107.  and 100. So there are four PRs on the pasta curves crate that Danny has opened recently that would be good to get a third-party review on.

Alfredo: 00:27:45  

Okay, cool.  I can take a look at that if you send me the links.

Alfredo: 00:27:52  

reason I was asking that is, so zebra depends  on that, and we I guess we will want to continue to depend on those crates. So, as a general question of how much divergence these new folks are getting from the ones that we are using, I'm not sure if I'm explaining myself correctly.

Kris Nuttycombe: 00:28:27  

We are treating these as things that we need to get upstreamed quickly. So yeah, there are the PR links in the chat.

Alfredo: 00:28:42  

Great, thanks, Chris.

Pili: 00:28:43  

Thank you, kris and Alfredo. Any other questions? Okay, let's move on. I don't see anyone from zingo Labs today? But please raise your hand if you are willing to give an update for zingo Labs. Otherwise, we'll oh someone has raised the hand. Oh, Eli, I don't know.  One second, let me promote you

## core stack updates, zingo labs - zaino

Eli : 00:29:32  

Hi. there. Yeah, I've recently joined Zaino. I've been working on it for the last two months or so. We have been working on modularizing a bunch of the internals of how we construct indexes, and so we're getting very close to landing that. One of the benefits with this new architecture is we're going to make each index opt in. So by default, we'll just have the compact block indices, and we'll build those by default since that's what the majority of consumers use. We have some other stuff like the gettxoutsetinfo   that's expensive to compute, but less people use it. They're kind of making some of those indexes opt in for users, and that's going to help speed up the sync time a lot for like the default cases, Arlo has been working on all the fixes for the mempool and the security things that were addressed there. So that's all been merged in and released. And then we've also been working on a new testing harness and observability of. tooling. So basically now for every release cycle, we've got full sync tests running much easier, and then we've been measuring the blocks per second metrics. We've been looking at CPU performance flame graphs, and so we've identified a few optimizations that we also want to work on in the next month or two. So mainly, yeah, mainly code-based quality modularization, and then yeah, some performance improvements.

Pili: 00:31:18  

Thank you and welcome, Pacu, you have a question?

Pacu: 00:31:23  

Yes. Hi, Eli. Question on the compact block data not being opt-in in Zaino. I think it should be the other way around. For example, for Zallet, it  is of no use for us, so we would like not to have it if possible. So  can that be? I don't know how you're handling the configuration. Is it like configuration or features, so that, for example, for the Zallet, when you build Zallet with the Zaino backend, that you don't get the compact block data because we don't.

Eli: 00:32:11  

Yeah, we. Yeah, that's totally possible because each index will have its own  little configuration section, and you can enable it or disable it, and then like two other parameters about it. And so, yeah, you'll be able to turn off compact block indexing, and Zaino just won't build that.

Pacu: 00:32:32  

Cool. Thank you.

Pili: 00:32:36  

Thank you, Pacu. Any other questions? Yeah,

Pacu: 00:32:49  

sorry. Yes, there is a lot of like snapshotting work that we didn't used to have before, and in my work with different partners, they are more welcoming to using snapshots lately and giving you know in order to avoid syncing times and catching up with the chain and have like faster uptime. Will zaino be able to have snapshots, or will the li optionality of the indices conspire against that kind of features?

Eli: 00:33:36  

I think it will allow some snapshots. So certain sets of indexes are very tightly coupled, and so if we didn't release a snapshot, we need to release like two or three indexes as one. Then others like compact blocks are fairly full structures, so we could just release a snapshot of just that. I was actually just talking with someone like two days ago about taking our like Kubernetes cluster that we currently run tests on, and having that basically also generate snapshots on like a nightly job. So it's definitely possible, and yeah, we can we can look into that doing that once we merge in this sync modularization.

Pacu: 00:34:21  

Cool. Yeah, I don't think that daily cadence makes much difference in a in server environment.  maybe we can do it  weekly because there's a lot of data. Yep. Cool.

Pili: 00:34:38  

All right. Any other questions? I'm going to move on. Research and implementation updates. Do we have anyone from qedit today? I don't see anyone, but please raise your hand if you're here from qedit, and I'll promote you to a panelist. Here, I'm not seeing anyone. Let's move on. Shielded lab. and the network sustainability mechanism. Who can talk about that today?

## Research & Implementation Updates shielded labs -Nsm

Judah: 00:35:27  

Oh yeah, I can talk about that really quick. I'll keep it short and sweet. So besides waiting on the NU7 polling results, I just need some extra eyes on  the alternative draft zip for 234 that preserves halvings. Yeah, that's about it.

Pili: 00:35:48  

Thank you, Judah. Okay, any questions? I think it's not small. Cross link from Shielded  Labs. Who's talking about that today?

## Research & Implementation Updates shielded labs- crosslink

Jason: 00:36:12  

I can do it. Quick update again. We met in person last week to discuss project planning and roadmapping. We also held a workshop and announced the plan for the next round of Zec payouts for our incentivized test net. Nate's out this week, but he's going to have a detailed update at the next call in in two weeks.

Pili: 00:36:35  

Great, thank you, Jason. Any questions for Jason? Okay, let's move on. Dynamic fees from Shielded Labs. Does anyone have an update about that? Nope. Shall we move on, Jason?

## Research & Implementation Updates dynamic fee

Jason: 00:37:10  

Yeah, that's fine. I'm not sure if Mark's on the call, but I again,  we've all been out, so I think next call will have more substantive updates.

Pili: 00:37:20  

That's good. Let's move on to formalization from zodl Anyone can speak to that. Maybe kris or Pacu. Any updates on the formalization work that is being done?

## Research and implementation updates zodl- formalization

Kris Nuttycombe: 00:37:40  

I know that the work is ongoing, and that Dara Emma plans to publish a blog post sometime soon with  an update. It's essentially the balance and validity games have now been formalized, and the formalization extends to a number of additional things beyond the circuit, but I don't have the exact details on that.

Pili: 00:38:26  

No worries. Great. I look forward to hearing more on the next Arborist call. Yeah, I think that's kind of the end of the agenda. Does anyone have any announcements that they'd like to share?

## Open Announcements 

Kris Nuttycombe: 00:38:42  

There's one more thing that I wanted to point folks to, which is also something I'd like to get migrating into production relatively soon. Is ZIP 316 revision two? I linked a PR to the implementation of that in the chat, but  this actually turns out to be relatively important for wallets that want to be able to represent standalone account level viewing keys, which is something we ended up needing for Zcash D wallet import, so  that's essentially ready  to land and hopefully start being made use of in the broader ecosystem.

Pili: 00:39:37  

Okay, thank you, kris. Any other announcements? Any discussion topics?

Kris Nuttycombe: 00:40:03  

Just a temperature check. How how do folks feel about the idea of saying, okay, we're just going to denominate a minimum fee in USD and and rely on you know public sources of historical exchange rate data to  compute it.

Pili: 00:40:30  

I personally want to think about it more. My my gut feeling is, ooh, I'm not sure I like it. Just like the the anchoring on USD, but I want to understand more. Yeah.

Kris Nuttycombe: 00:40:45  

So, the rationale I have for this is that the reason that we are making fee adjustments  is that the exchange rate price has changed. The reason that I'm suggesting USD is that it's the in our experience it's the most widely available source of price data, and unfortunately, like in an ideal world, we might use a signal like blocks becoming full for this, but I don't believe that we currently, can tolerate full blocks until we've moved away from trial decryption, so that's sort of the mix of concerns. I've looked extensively at Shielded Lab's dynamic fees work, and I I don't believe that it currently defines a stable control algorithm.

Pili: 00:42:08  

There's a suggestion to take this offline, but if anyone else wants to raise their hand and say something about it, or be promoted to a panelist and talk about it, happy to continue the discussion.

Zooko: 00:42:32  

Should I say something? Hi.

Pili: 00:42:34  

If you want to

Kris Nuttycombe: 00:42:35  

It's an open discussion.

Zooko: 00:42:40  

Yeah, I disagree.  I basically don't think it's a effective process to debate it while all these other people are like watching and making up their minds or whatever. I think we should either take it offline or at least do it like meta process, like we go off and run experiments and report back. One thing I really like that's a promising meta process is you go get wallets to implement it. Sodlimplements one thing, Unstoppable implements a different thing, and we find out which one works better or whatever. 

Kris Nuttycombe: 00:43:22  

its a network thing, right?

Zooko: 00:43:25  

Very few things get me more excited than thinking I'm right and other people are wrong, and I can explain why. I just don't think it's a really great use of our arborist call.

Pili: 00:43:35  

That's a fair comment.

Zooko: 00:43:38  

Let's go. Let's go hang out at the coffee shop, kris, and get a piece of paper and all right,

Kris Nuttycombe: 00:43:42  

it's a deal.

Zooko: 00:43:44  

Yeah, I'm available. kris and I happen to live in the same town So good, good fortune.

Pili: 00:43:50  

Nice, cool. So let's move on from this discussion item. Does anyone else have any other discussion item that they'd like to raise?

Zooko: 00:44:08  

Oh, not debating, but there's another meta process we could use, which we've already used a little bit over in shielded Labs is make a proposal and then hire an independent like design auditor,  a not a security auditor or an implementation auditor, but like a mechanism economist or whatever to review the pros and cons of your design.

Pili: 00:44:34  

That's good. And with that, I'm going to give a last chance for any other items.  Thank you very much, everyone. The next hour's call will be on September 17th at the same time, 15 UTC.

Next Meeting Scheduled: September 17th 2026. 15:00 UTC

