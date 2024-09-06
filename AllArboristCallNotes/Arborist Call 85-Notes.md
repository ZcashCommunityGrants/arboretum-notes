# Arborist Call #85 Notes

Meeting Date/Time: September 5th 2024, 21:00 UTC

Meeting Duration: 1 hour 

**Agenda**: 

+ Welcome and Meeting Intro

+ [NU6 Testnet Activation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#1-nu6-testnet-activation)

+ [ECC & ZF zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#2-ecc--zf-zcashd-deprecation)

+ ECC Core Update - [Zcashd 5.10.0 / Brave & Chainsafe](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#3-ecc-core-team-updates---zcashd-5100--brave--chainsafe) 

+ Zebra Update - [Zebra 1.9 / NU6 Testnet & Audit](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#4-zebra-update---zebra-19--nu6-testnet--audit) 

+ Research & Implementation Updates - [Trailing Finality desirable qualities / Crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#5-research--implementation-updates-i-trailing-finality-desirable-qualities--crosslink) / [FROST](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#5-research--implementation-updates-ii-frost) 

+ Open Discussion - [Testnet Mining](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2085-Notes.md#6-open-discussion-i-testnet-mining)



## Decision & Action Items

i)  Grouping issues in DAG or parallel board - Pacu / Conrado 

ii) Document Process for zcashd testnet restart 

iii) Update Crosslink Book with updates from Shielded Labs research 


___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=PAayYqN9mLw&t=6s)

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. NU6 Testnet Activation 


[00:02:59.53] - **Kris**

NU6 testnet activation went well, and [zcashd 5.10.0](https://github.com/zcash/zcash/releases/tag/v5.10.0) was released. That will EOS halt at the beginning of November. So the next step on NU6 is to make a zcashd 6.0.0 release that will set the NU6 activation height on mainnet.

[00:03:30.18] 

The one slight hiccup - the network upgrade on testnet went fine and everything was happy. Then we didn't realize that whoever it is who has been providing mining power to Testnet didn't upgrade. We all shut down our miners on Friday and so testnet has currently paused until we can fix it. Because zcashd, at least, has a restriction whereby if the interval between blocks is too long, it interprets that as something is wrong and it needs human intervention.

[00:04:12.45] 

So we have to perform that human intervention in order to get Testnet back online. But apart from that, it went great. That's the current status on NU6. 

[00:04:30.38] - **Conrado**

I think that's it, on the Zebra side everything went smoothly. I don't have anything to add.

[00:04:41.24] - **Kris**

I think the current halt is, in fact, It's caused by two different things. One is that, as I understand it, the zebrad internal miner is still not working in the NU6 testnet supporting release of zebrad, and we all shut off our zcashd mining nodes, and so the chain just halted. So this will be an exercise in bringing the chain back online.

[00:05:09.10] - **Conrado**

Just to confirm, we have internal miner feature, we enable it internally. It's not available in the main release. So yeah, no zebra testnet nodes were mining. So yeah, this also contributed to the issue.

[00:05:35.32] - **Pacu**

Would it be helpful if maybe if we can get the people doing their grant of the testnet infrastructure to set up a miner? Would the testnet node that the person is using to service the testnet block explorer help in this situations or is it undesirable? Just let me know when we can actually set it up.

[00:06:06.40] - **Kris**

We should have some maintained testnet mining power. We don't know who was providing the testnet mining power before now. If anyone in the community wants to hold up their hand and say, Hey, that was me, that would be great. But we're currently planning to set up a little bit of minimal testnet mining infrastructure at the ECC just to keep the testnet chain ticking over. But we have to get the chain going again first.

[00:06:47.47] - **Pacu**

Yeah. You had to start the lawnmower by hand. Let me know, and we can set it up. I'm in contact with that grantee, so maybe we can do something.

[00:07:07.26] - **Alfredo**

Yeah. So do we know how to fix this? Is it just a matter of someone start mining the testnet or it's more complicated than that?

[00:07:15.14] - **Kris**

It's slightly more complicated than that because essentially zcashd is currently in a state where the last block it's received is so far in the that it will not leave syncing mode. So it can't get into the state where a miner can run on it. So the key here is, in order to mine a block, we have to override the time since the maximum time since last block, and then we can start mining again. And we're waiting until Str4d gets back tomorrow because he remembers how to do that, and none of the rest of us, we'd have to go and figure it out. Str4d will be back soon, we're just going to wait for his brain.

[00:08:18.56] - **Alfredo**

It's important for us to fix it up because we have testnet CI checks that right now It's not allowing us to merge a PR into a Zebra repo. We could disable the test, but we could disable the test if we want, but it would be good if we just fix it up because we have to we'll have to fix it anyway. So we can wait until tomorrow. It's not a big deal. If the situation gets worse we'll see. Thank you, Kris.

[00:08:52.29] - **Kris**

I think that in general, just like ECC is going to set up some minimal testnet mining infrastructure, it would be good to have maybe 3 or 4 entities in the ecosystem that A) follow upgrades closely, and B) provide a little bit of testnet mining power. Obviously, it sounds like for ZF, since you have CI that depends upon it, it would be nice if ZF were to run a small mining node somewhere so that the tests don't go offline for this.

[00:09:30.16] - **Alfredo**

Yeah. We had problems with the DNS there in the testnet a few, maybe a month ago, and it was the same thing. It's good in a sense that we realized something is wrong because it stops working. But yeah, I agree. We should have some minimal. We have planned for that, but we don't have implemented it yet. 

[00:09:56.26] - **Conrado**

Just to mention that ZF is also planning on I'm running some testnet nodes constantly. It's a good reminder that we should also enable mining on them to help sort out this issue. 

[00:10:19.26] - **Dodger**

I think it was Michael Harms who was mining on testnet and sending the TAZ to his faucet, and he ran into a zcashd build error on Ubuntu. He didn't have time to work through it, so he took down the faucet for now.

[00:10:49.42] - **Kris**

Okay, that explains it. So he was the one who was keeping our testnet work alive. All right. In the future, let's Let's get this fixed, and then let's all run some minimal infrastructure so there's some guarantee of continuity.

[00:11:10.33] - **Dodger**

Yeah. Also, probably worth documenting how to escape from this because, God forbid, something happens to Str4d.

[00:11:19.47] - **Kris**

Well, this is just essentially me being lazy to wait till tomorrow because it's I've got other things that I'm trying to complete. I could figure it out, but since it's just waiting till tomorrow, I can probably just wait.

[00:11:45.09] - **Alfredo**

Yeah, so I don't remember exactly, but I think after some time that no blocks gets mining in the testnet, the hashrates go to zero. So I guess anyone could mine, but I could be wrong.

[00:11:57.13] - **Kris**

Anyone can mine already under normal circumstances, if you spin up a miner with... If I put eight cores on it, then I'll win most of the blocks with CPU mining, unless someone brings on an ASIC to test it out or something like that. But so even under normal circumstances, anybody can mine. Just right now, the problem is the maximum time since the last block has been exceeded. 

[00:12:45.47] - **Dodger**

And in terms of testing, making sure that transactions can go through, was there any coordinated testing done?

[00:12:56.27] - **Kris**

Yeah. When we did the NU6 activation, we sent a bunch of transactions back and forth. And yeah, in fact, I hooked up my local version of zec-sqlite CLI with the necessary changes to the test network and use that to send and receive some transactions and so forth. We haven't published an update to the crates that are needed in order for other people to do that yet, but should do that soon.


____

### 2. ECC & ZF zcashd deprecation


[00:13:51.40] - **Kris**

There's been a bunch of conversation between ECC and ZF this week as to the architecture for the pieces that are required for the replacement wallet, which is obviously the biggest blocker to use zcashd deprecation. I think we have a pretty good plan for that architecture at this point. Modulo time that's currently being spent fixing a couple of bugs in the wallet back-end, we're basically ready to start moving a bunch of the synchronization code from our internal testing CLI wallet into Zcash client back-end. From there, building out a skeleton for a public-facing or a CLI that is a product instead of a testing tool.

[00:15:02.44] - **Pacu**

I think you have mentioned this already, but I forgot. Can anyone join those ECC/ZF meetings or are they exclusive to the core devs?

[00:15:14.54] - **Dodger**

If you're interested in joining ping Pili, we don't want to make them public.

[00:15:28.19] - **Pacu**

I've been I'm trying to craft a series of boards to try to see overall progress between the tracking issues that Pili is doing, which are awesome and he DAG, that is also awesome, but it's like a split between the two, and there are a lot of items that overlap. I'm trying to figure out what's the best tool to actually see zcashd deprecation at a glance in terms of progress, because the dependency part is pretty well-covered with the DAG.

[00:16:16.50] - **Pacu**

I know that there's a PR for the ZF DAG that is there. If it's blocked, maybe it requires some permissions or something, and I cannot help with that at all. It would be awesome to have it. I'll be sharing the results I get with the GitHub free tools for doing projects and tracking stuff that I'm trying to achieve there to do some public boards that show who's working on what or what's the progress or what is being worked on at the moment in a concise way.

[00:17:07.19] - **Conrado**

We had to disable our DAG because we weren't using that much in the past. But now that we're working on this, we want to restore it. But there was some weird permission issue with Zenhub, and we were using another API, which is not supported anymore. So I created a PR for the DAG generation that migrates to the new API.

[00:17:31.31] 

It would allow creating a DAG which issues both from ECC and ZF projects. It's still under review. I think Str4d wants to take a look, but he's out, but I'm guessing when he's back, he'll be able to review that and get it merged. So he's just working on that. I agree it would be good. I think the DAG is really useful, but it might be good to have a bit higher level view. Maybe we can do grouping issues somehow. I'm thinking about this, too. I also want a solution to this, and I'm thinking about it, and then I'll see if I come up with something, either in the DAG or just something parallel to it.

[00:18:18.40] - **Dodger**

Yeah, I think to date, the zcashd deprecation work has been internal to ZF and ECC, and as a result, the knowledge has been verbal conversations. And the sudden interest in contributing it has exposed the fact that some of the tracking issues and whatnot have got lists of issues that aren't necessarily up to date and don't reflect the the latest discussions.

[00:19:03.22] 

I've put this [issue 1373 in the librustzcash](https://github.com/zcash/librustzcash/issues/1373) repo up on the screen, because this is where there's been discussions about the overall architecture and obviously, agreeing on architecture is a key part of them being able to say, what is it that we're actually going to do? And once we know what we're going to do, other people can then stick their hands up to actually contribute to to that. So there is, I think, an onus on us, ZF and ECC, to figure out what needs to be done, what the end state is that we're aiming for and then having some stability around that so that we can then start to figure out what it is that needs to be delivered in terms of parcels of work and then other people can then look at contributing to that.

[00:20:04.14] - **Pacu**

Yeah, I think that's one part of it. I've seen on the ECC core team DAG that there are a lot of items that don't have incoming edges, so they're in theory ready to work on, and that they might be small enough or contained enough that contributors can actually work on them besides I like the big picture that I agree with what you just said.

[00:20:34.58] 

It's hard to find it if you don't know where to find it. I was trying to see how we could make that better. It's still in talks and meetings, but there's a chance that Zingo I might be contributing quite a lot to zcashd deprecation, mostly the node RPCs. I don't know on which extent to the wallet, Zcashd wallet itself. But the RPCs and indexing and whatnot. I guess that having these tools would be awesome.

[00:21:29.39] 

Still, I'm trying to figure out as everybody, which is the best tool. If you go to any tool, it would say, Yeah, this is the best tool, brochures. But yeah. So if anyone has ideas or I don't know, some eureka moment, just let me know.

[00:21:52.46] - **Dodger**

Just to share so people understand what we're talking about in terms of a DAG. This is the ECC DAG, this This is the [ECC DAG](https://zcash.github.io/developers/zcash-zcashd-deprecation-dag) related to zcashd deprecation. You can click on these boxes, and you can see the actual issues that have been opened. It also illustrates the dependencies, what's required in which order to do things. Regarding Zingo Labs, they have revised their original grant proposal, and they have put together something which I believe was in consultation with you, Kris. Is that correct?

[00:22:48.40] - **Kris**

I contributed to or talked about what I think is useful in terms of the architecture and the I would say not just me, it was also ZF folks, Arya and Alfredo, all contributed substantially to that discussion. Also, I expect that Something that's a little bit awkward is that since Str4d has been gone, I know that he also has opinions here, and so I'm hoping to get his refinement on some of these ideas when he's back next week. Hopefully, it won't be just, Oh my God, what have you all done?

[00:23:40.28] - **Dodger**

Yeah, I do think there needs to be some syncing up in terms of making sure that we're all on the same page in terms of architecture.

[00:23:47.12] - **Kris**

Yeah, I think we're working towards a common vision. I think that right now, ECC and ZF are pretty well aligned. I think that that vision has been communicated to the Zingo Labs relatively effectively, but I think there's probably some additional massaging of their proposal that will be needed before its final.

[00:24:14.04] - **Dodger**

I'm a strong believer in making sure that things are written down and that there is clarity around a shared understanding, because the biggest problem with communication is the assumption that it has happened. And if one person understands that the plan is to do one thing and the other person believes that it's to do another thing, then that can lead to a lot of wasted effort and confusion and often friction.

[00:24:48.26] - **Kris**

I hope that in a relatively near future, the way that we can get more perfect alignment on this is is having some of the pieces that are required, like this skeleton of a CLI wallet, that people can actually start playing with implementing against. And that's really where we're going to be certain of all of the pieces fitting together correctly. So it's going to be an incremental process, but we have all of the pieces right now. I believe that we need to start that.

[00:25:31.38] - **Dodger**

One of the other factors here is that ZCG are in the position of having to evaluate this grant proposal and they obviously want to have some confidence that it A) delivers value, and B) is aligned with what is planned between ZF and ECC. Are there any opinions on what the best way of doing that is? Is it a case of getting everybody onto the same meeting and being able to have a conversation?

[00:26:15.20] - **Kris**

I would say we've had a few of those conversations. I think that with the updated proposal that we've seen, it still needs refinement. Essentially, is where I'm at.

[00:26:34.58] - **Pacu**

A bunch of those meetings already happened in a more grassroots way. I guess that ZCG considers it, since they are the ones that will evaluate and have the final call on the grant, probably it's hard to say if they want such a meeting. I think it would be good to have it.

[00:27:07.53] - **Jason McGee**

We had a call with Zancas last Friday, and where we left things off with him was we asked specifically for him to get sign off from the ECC and ZF teams before posting the grant. It sounds like he didn't get that if you think there's additional refinements that need to made. So it sounds like that's where the miscommunication was. And if there's any way we can make it more clear so we know what we need to review and they're not continuously needing to make updates to their grant. That would probably be a good way forward.

[00:27:51.50] 

And if it's achieved through another call, like with a couple of folks from ECC, ZF, and ZCG, then I think we're open to that.

[00:28:02.10] - **Kris**

Part of it is just time. So I did get access to the architecture diagrams, but there's only so much that boxes and arrows can convey. And there's also only so much time that I've had, aside from the other pieces that I'm working on on a day to day basis to provide that evaluation.

[00:28:32.35] - **Dodger**

I'll make a general comment, which is that what we're actually talking about here is delegating or bringing in someone new. Delegating some work or bringing in a new organization to contribute it to it. We all know that when you bring someone new into your organization, there's a cost to onboarding them. And I think we need to view this in the same way.

[00:29:00.58] 

Secondly, with regards to to delegation, one of the key things that I think is tricky here is that, is that person just are making a very well-specified job on, in which case they have to deliver against a very tight set of specifications, in which case those specifications need to be super clear, or is there a set of outcomes that can be described and that they then have a lot of latitude to deliver those outcomes in the way that they see fit.

[00:29:42.08] 

And there are tradeoffs in all of these things. The fact that we've got different pieces working that need to be interconnected and working with one another makes this tricky. We've got considerations about how CLI, what is going to interact with Zebra, security considerations. We just had a discussion today during the zcashd deprecation meeting about the security implications of accessing the zebra database and side channel etc.

[00:30:15.06] 

I think if we can, as much as possible, try to get people on the same page, and in my opinion, that means being able to get people on calls together. I know that calls take at the end of the day, if we're having separate conversations, it feels like it's difficult that there's one set of conversations happening over there, and now we're having a conversation about this. And Jason's listening in to this from the ZCG perspective. And it just doesn't feel ideal. Maybe we need to try harder to try and get people all on the same calls. 

[00:31:04.27] - **Pacu**

Yeah, I think it's a little bit of both. It fits into the tricky category that you mentioned because we can delegate implementation details to the Zingo folks. I guess that I have confidence that they have a routine that they'll be able to do the code needed and merge the additions to the existing repos that they need to do and they need to merge as they see fit with their expertise.

[00:31:46.25]

But then you also have the part of the indexer that has to serve existing partners like exchanges, block explorers, and wallets, etc. That actually needs a spec, or if there's not a spec already, there should be an outreach and say, "Hey, what are the RPCs that you're using? What are you using them for? What are the pieces of those RPCs that you're actually using, which are those that are not?"

[00:32:25.26] 

For example, I recall there was some RPC, I forgot the name, but I Kris said, Hey, we should port this one-to-one. And then Kris said, "Hey, no, that's actually an RPC that was done because a side effect that we had to mitigate. And if we had to do something new, we wouldn't actually do that again." So there are a lot of those things and degrees that do have to be specified, there's a little bit of salt and pepper, I guess.

[00:33:03.46] - **Dodger**

Okay, well, I feel like we should move on from this topic. Let me go back to the agenda. But, yeah, if anybody is interested in contributing to zcashd deprecation, reach out to Pili or to any of the core engineers and express an interest in joining those calls.



____

### 3. ECC Core Team Updates - Zcashd 5.10.0 / Brave & Chainsafe


[00:33:59.37] - **Kris**

All right, so I guess you've all heard a fair amount from me thus far. So aside from NU6, the primary things that we've been working I've just put up a PR for moving some test infrastructure from Zcash Client SQLite to Zcash client back-end. That's going to facilitate the use by, hopefully, the Brave and chainsafe teams and potentially also the team that's working on Keystone Wallet. They all have been making good and important progress. There's one outstanding bug in lightwallet synchronization or generally wallet synchronization that I'm working. I think that's basically it apart from NU6 and There's been specification work for a NU6 and bits and pieces of the release process that have been the primary things that we've been working on for the last couple of weeks.

[00:35:13.10] - **Dodger**

Any questions for Kris?

[00:35:18.50] - **Pacu**

I missed the first three seconds that were really important to describe what you were doing for changes that are for Brave.

[00:35:28.54] - **Kris**

I finally am getting to do the work that I've wanted to do for a long time, which is migrate the test infrastructure from Zcash Client SQLite to Zcash client back-end so that it's reusable across wallet back-end implementations.

[00:35:52.17] - **Alfredo**

I didn't have a chance to look at your PR yet, but that's replaced the one I opened up, which was a dirty hacky solution, I guess.

[00:36:07.19] - **Kris**

Yeah. That's its intent is to get everything moved to take a generalized approach so that-

[00:36:24.04] - **Alfredo**

So your PR closed 1412?

[00:36:26.25] - **Kris**

I literally just put the PR up a few minutes ago, and it's still a draft because the generalization piece has been largely done. The moving piece will show me where I have not successfully completed the generalization. That's what I'm trying to next.


____

### 4. Zebra Update - Zebra 1.9 / NU6 Testnet & Audit


[00:37:08.38] - **Alfredo**

From the last Arborist call we worked in the private testnet for a NU6 with the ECC. We upgraded all the ECC dependencies Zebra has to the last version of them. We added the activation heights and all that, and to finally release [Zebra 1.9.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.9.0), which is the one that has the testnet activation height.

[00:37:52.04] 

So after that went over and a NU6 activated on testnet, we made several cleanups We fixed some panics in the state for an edge case we wanted to fix it for a while. Some minor cleanups after the network operate. Then Gustavo made some improvements on security fixes to our CI. With the release, we realized that there were some issues with the Docker images. Fixed that.

[00:38:26.05] 

Finally, this week, I am personally working on moving the zcashd Python RPC test to work with Zebra. So to do this, we currently added two new RPC methods that only works in the Regtest mode that are needed for this test. These RPC methods are the stop RPC method, which actually shutdowns the node, and the generate RPC method that mines block immediately.

[00:38:53.32] 

So with those two, we are in a pretty good position to start the merging of the test. Finally, as we mentioned already, we are in a lot of discussions and planning related to the zcashd deprecation and the indexer service process.

[00:39:20.16] - **Dodger**

Don't forget the audit.

[00:39:28.05] - **Alfredo**

Oh, yeah, that's correct. So I think it was Arya who had a kick-off meeting for the audit of the NU6. Yeah, that was in the last two weeks for sure. I'm not really sure about the status of that because I wasn't in the meeting. I'm not sure if Arya is here yet. Maybe we want to comment something out about that.

[00:39:52.48] - **Arya**

We just gave them just that needs to be audited. It seems to be the progress based on the questions that the auditors are asking. Also, I may have missed this, but if the sendrawtransaction method wasn't mentioned, that is now returning verification errors as well. If Hanh sees this, please test it and give him back on what that there was.

[00:40:24.59] - **Dodger**

Cool. Any questions relating to Zebra? Okay, let's move on. And any updates regarding the Zebra Sustainability Fund?

[00:40:40.51] - **Jason McGee**

No updates this week. We'll have an update on the 19th.


___


### 5. Research & Implementation Updates i) Trailing Finality desirable qualities / Crosslink 


[00:40:54.59] - **Zooko**

Yes. I'll repost the link to the [document of desirable qualities](https://docs.google.com/document/d/1GZYQgQdzL1-GNJLWmt5CbTFXo1nuufkL7-gg7az_M2Q/edit#heading=h.6ffy45al3m33). So since the last time, we got some feedback on the desirable qualities from Josh Swihart and Daira Emma in form of comments in the Doc. And we had a meeting with Chris Goes and Nate Wilcox.

[00:41:26.02] 

So we've updated the list of desirable qualities, and everyone is more than welcome to review this and point out missing desirable qualities or trade offs between desirable qualities. We've also done a little more thinking about, specifically about what the next step is going to be on implementation.

[00:41:51.38] 

You can see that since the last time we flushed out what privacy means in the context of staking, the desirable qualities for privacy. It's just my first stab at it so have a look at what it means in terms of to an end-user who wants to run a validator and/or stake. What does privacy and security mean to them? We clarified in my mind and in this document that a very important security is if you delegate your ZEC, can the validator you're delegating to steal it or not? That has big implications for implementation.

[00:42:49.31] 

We came up with a potential desirable goal, which we're currently leaning toward excluding from the first deployment of Crosslink, which is the amount of staked ZECs evenly distributed so that there aren't a few actors who control a lot of the ZEC? And there's a couple of reasons we currently have written down as reasons to exclude this from the scope of the first deployment. One is that in the Crosslink design, if there's an adversary who controls too much of the ZEC, there's pretty limited damage they can do. So pretty much as far as I currently understand, the worst they can do is halt the protocol until people get together and decide to restart it. So I listened with interest in the process of restarting the testnet.

[00:43:37.46] 

The other is that we can't really fix that in the protocol. If Market mechanisms and a bunch of people's individual decisions are going to concentrate. ZEC, the protocol probably can't help very much or improve that very much. So that one is highlighted in pink at the moment, meaning that I'm leaning toward adding it to the excluded from first release list.

[00:44:05.12] 

There might be a couple of other changes. Okay, so please review and please either comment on the Google Doc or hit me up somehow. Oh, and we're hiring hit up, Jason, if you know anyone who wants to implement this, which is going to be really fun.

[00:44:21.59]

Now, the conversation with Nate and Chris was super interesting. I have a couple of notes I want to share with you guys to get your feedback. One is this major strategic fork in the road between reuse something versus implement our own thing. And the something can be the economic architectural design of how does delegation work and what rewards and penalties and stuff like that. And it can also mean the implementation.

[00:44:56.25] 

In both cases, the pros of doing our own stuff is we get to exclude things that Zcashers really aren't super important to Zcashers right now, which reduces risk and we get to make sure we include things that are super important to Zcashers right now, even if they're not included in the other thing that we're trying to crib from. And we get to use our own team and quality control processes, security audits, and unit testing and all that.

[00:45:23.28] 

And the pros of reusing someone else's design and/or implementation. It reduces time to market and risk and cost. It reduces ego involvement by us so that that reduces time to market and the potential for social friction because it's not our baby and then we get to reuse the quality controls from upstream. If they did security audits and they had review processes, and if they've deployed on mainnet, and we've learned from the experience of real money being at risk on that system, that's all beneficial.

[00:45:58.29] 

It's interesting to note that the design part and the implementation part are different. If we wanted to crib from something upstream for its design, Cosmos Hub is apparently a great candidate because there's been at least 100 live projects that have deployed using more or less the same economic design. And so we have a lot of both security audits and mainnet like honeypot tests to see if anyone can exploit any of them.

[00:46:27.56] 

On the other hand, Cosmos Hub is implemented in Go. Nobody wants to deal with that. But if we wanted to crib somebody's source code, there's both Namada and Penumbra that are implemented in Rust that have their own designs and their own source code.

[00:46:40.40]

That's about as far as I got there. Then Nate and Chris had really great ideas about how to get started with really dumb, simple prototypes that don't do much, but you can learn from. Here's a proposal. Prototype 1, it doesn't have staking. It has Crosslink implemented. Crosslink has approved a Proof-of-Work component and a proof-of-stake component. The Proof of Stake component isn't implemented, so it always fails. So now, how does prototype one behave? We could probably learn a lot and fix a lot of bugs just from that one.

[00:47:10.08]

Prototype two is just like that, and the so-called Proof of Stake component is really just proof of authority, where there's a server or 2/3 servers or something that can do that job. And then possible prototype 3, I've learned a lot from Chris Goes. He works on Anoma, and he's been volunteering a bunch of advice and information is really useful. Possible prototype 3, it still doesn't have staking, but you hardcode a list of public keys and how much voting power they ought to have, and you hardcode that into a Comet-BFT implementation. Comet BFT is a component of Cosmos, which just does the BFT.

[00:48:57.32] 

And then the next one possible prototype is hardcode a table of public keys and their voting weights into the Zcash ledger and let the Proof of Stake component of Crosslink read it out of the Zcash ledger. I think that's all my notes.

[00:49:22.10] 

One more thing I wanted to mention, which I didn't include last time in my summary of desirable goals, is that Shielded Labs really values the time to market goal, in part because we have a limited budget. Shielded Labs intends not to accept dev funds in the future and we got these donations from these really generous Zcash holders and supporters, and those donations are earmarked just for this project, to deploy a Crosslink/TFL to Mainnet.

[00:50:00.10] 

So to ensure that we succeed at that, we have to deploy it as soon as possible while our budget lasts. But perhaps a more important motivation for us is just to deliver it to users soon because they want it.

[00:50:12.45]

So time to market is the first one on the list, on our list of desirable goals, and those are the reasons. Okay. Any questions?

[00:50:28.28] - **Alfredo**

Yeah. So maybe this was already answered or already in the document, I didn't was able to read yet, but I remember this [book](https://electric-coin-company.github.io/tfl-book/) from Daira Emma, i am wondering if what you're trying to do is in that direction or is it a bit different?

[00:50:53.41] - **Zooko**

Good question. Yeah. We're intending to use pretty much exactly the protocol in that book, which I think the protocol is specifically Crosslink v2. But there's a protocol that Daira Emma, and Nate worked out. They've done a lot of security analysis about what can go wrong. And that protocol has great properties for our purposes. It's really safe. And it keeps the proof of stake and the proof of work side as little coupled together as possible.

[00:51:27.34] - **Alfredo**

Do you plan to update the book with the new features or stuff you have in your document right now?

[00:51:35.53] - **Zooko**

Great question. I don't know. Maybe talk to Daira or i'll ask Nate, since he's also an author of the book.

[00:51:52.10] - **Alfredo**

Yeah, I guess it would be good to continue there if that is possible. But yeah.

[00:51:57.28] - **Zooko**

Totally. That's a great question. I've written it down.


___


### 5. Research & Implementation Updates ii) FROST

[00:52:19.59] - **Conrado**

So things are a bit slow because we're busy with NU6 and people on PTO also. But we're mostly working on adding encryption authentication to the Frost server, which is the thing we are creating to help people use Frost, which makes it easier for wallets to talk to each other. And now I'm working not exactly on that, but on contact management, because to authenticate, you need other people's public keys, and you need a way to export and import contacts. It's kind of PGP but very simplified. So we're working on that. And also I'm finishing the refresh share functionality for the DKG, for the Distributed Key Generation. 

[00:53:13.11] - **Dodger**

Any questions related to FROST? Any progress on the Zip?

[00:53:26.02] - **Conrado**

Oh, good question. There were some comments added to it that I need to address, which is related to how we generate the randomizer, which is a specific thing that needs to happen. So Daira Emma made a suggestion, which is great. So I need to update it with that.

[00:53:47.25] - **Conrado**

The other missing thing is finishing the specification, how to generate the whole Zcash wallet because Frost creates a represents the spending key, which is just one key from many keys necessary for using Zcash. And I had a couple of suggestions on how to generate the rest, and we need to review it and see if people are interested in that. Please take a look if you have any feedback.

[00:54:22.52]

I think the other missing thing, I don't think it will be part of the zip, but it's a requirement for it maybe. It's like the transaction proposal format. There's a name for it that I forgot, but I think the Keystone wallet thing is going to work on that, but this is also needed for Frost, so I am also interested in it. I made a couple of comments on that. There's a issue about it, and I'm just brainstorming some ideas on how to do it, and I need to resume work on that but I guess probably the Keystone folks will also work on that. 


___


### 6. Open Discussion i) Testnet Mining 


[00:55:39.26] - **Conrado**

I think Testnet is alive again. Someone started mining. I don't know. But it seems to be working now. I was going to start to mining on it, but I think someone beat me to it. We need to double check if everything is actually working, but it seems to be working.

[00:55:57.47] - **Dodger**

By the way, it was Michael Harms, who was mining. He was running a T3 large instance running zcashd with Gen=1. Nothing powerful.

[00:56:14.08] - **Alfredo**

Yeah, I opened an issue today in Zebra to keep track of that and I just added a comment a few minutes ago that we are going to be waiting for Str4d tomorrow to resume the testnet. But if you have any updates, if it is working, if you can please post a comment, it would be great. So if everything is working, we just close the issue, I guess. I think it would be good to also document the process on how to do it. It seems Str4d is the only one who has the knowledge.

[00:56:50.06] - **Dodger**

Is Arya about to tell us how test that got restarted?

[00:56:53.32] - **Arya**

It just works. I didn't really change anything. I just merged main into the... which has enabled the miner.

[00:57:02.34] - **Dodger**

You're a bit garbled, but I'm guessing that you're trying to tell us that you span up a zebra instance with a miner enabled?

[00:57:11.23] - **Arya**

Yeah, it just worked on its own after merging the changes from main in.

[00:57:18.11] - **Conrado**

To repeat that, we had a branch with mining support for Testnet, but it was a bit outdated, so Arya updated it to sync up with main and I think and I think he started running it and it's working, and I'm also running it. But my node seems stuck, but I'll figure out. I'm not sure. It does happen. But the reason I reported this is because I'm checking, just to be clear, I'm checking the [testnet.zcashexplorer.app](https://testnet.zcashexplorer.app) site, and it seems blocks are getting in, so this is why I reported this.

[00:57:53.20] - **Dodger**

Who says meetings can't be productive? Any other open announcements or news that anybody wants to share? 

[00:58:23.47] - **Zooko**

To Alfredo's question, yeah, the thing that we're doing at Shielded Labs is basically just the TFL/Crosslink design from that book. All the things that I've been talking about are more specific questions that you have to answer in order to implement and deploy it, just so you know. But your suggestion about updating the book is a great one.

[00:58:59.59] - **Dodger**

It feels like we've had three mentions of documentation. First of all, documenting our architecture for the new CLI wallet. Secondly, documenting how to get how to get Testnet running again. And now this making sure that design considerations are documented. Any other topics that anybody wants to raise for discussion?

[00:59:43.19] - **Dodger**

Thank you all. The next Arborist call will be in two weeks in the earlier time slot. So I look forward to seeing you all then.


____


### Attendees

+ Pacu ZWCD

+ Conrado Gouvea

+ Kris Nuttycombe

+ Alfredo Garcia

+ Arya Solhi

+ Jason McGee

+ Zooko

+ Anon

+ Daniel Wolande

+ Vito ZK


**Next Meeting Scheduled: 15:00 UTC September 19th 2024**


___
___



