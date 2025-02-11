# Arborist Call #95 Notes

Meeting Date/Time: February 6th, 15:00 UTC

Meeting Duration: 50 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Zebra 2.2.0]() 

+ ECC Core Update - [Transparent Script / Zallet development]() 

+ zcashd deprecation[Zaino update]()

+ Research & Implementation Updates - [Zcash Shielded Assets]() / [NSM update]() / [Trailing Finality/Crosslink]() / [FROST client tool & server]()

+ Open Announcements - [ZconVI Registrations / Zcash Dev Summit / Zcash Server Workshop & Hosh tool]()

+ Open Discussion - [Google Advanced Protection Program ]()




___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=zgoArHP-1ps)

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes




### 1. Zebra Update - Zebra 2.2.0 

[00:02:05.35] - **Alfredo**

This week, we released [Zebra 2.2.0](https://github.com/ZcashFoundation/zebra/releases/tag/v2.2.0). Over the last two or three weeks, our work has been a split between finalizing the release and some other things that are in flight and others that were landing to main after the release.

[00:02:32.14] 

The most important in the release was that we added an additional consensus rule check for the branch ID for increasing security. We added a new index to track spending transaction IDs, which is needed for the zcashd wallet replacement. We added verbosity equal to for the getblock RPC method. We migrated from the deprecated JSON RPC crate to JSON rpsee.

[00:03:09.32]

We fixed an issue where the blockchain info didn't handle an empty state properly, and we replaced that with the Genesis block. It was by an external contributor. I think Hampton is the last name. I don't remember the name now. We improved the RPC compatibility, making the error message of the getblock construction more closely matched zcashd. That's the most important in the release.

[00:03:35.03]

Then we have a few things that landed after the release, which is that Zebra now advertises new mining blocks to the network. That was a bug that wasn't happening, and it's happening now. We added CI architecture documentation, and we fixed a bug related to transparent address in regtest mode. Then we have a bunch of stuff that we are currently working on. Some of them will get into the main soon, others will take some more days.

[00:04:07.42] 

So Marek is working on refactoring the Docker file and entry point of zebra. We have the same external contributor that is implementing invalidateblock and reconsiderblock. This contributor started the work on that by adding a few methods inside our finalized state.

[00:04:28.04]

We are going to be tracking misbehaving peers, and we are going to ban them using a score-based system. This is something Arya is working on. We are adding inbound connections to a getpeers RPC method, which is something I am working on and should be pretty much ready soon. We are reviewing and working in replacing the Zcash script implementation, which is a joint effort between... In the foundation site is mainly Conrado. Then Natalie is working on replacing the Zebra sensimilla implementation in favor of a new crate, the ECC added at zcash/sensimilla. Then I think Marek or Arya is working on extending the RPC, getblockchaininfo to return more data.



____


### 2. ECC Update - Transparent Script / Zallet development



[00:06:22.18] - **Kris**

So for the last couple of weeks, we've been focused largely on transparent wallet support. So the two things there are the transparent script support that Greg Pfeil has completed. Thank you very much, ZF folks, for your reviews there. Those have been merged to Zcash script. There's a follow-up PR that we need to give some attention to.

[00:06:55.19] 

`Then the other thing is we have implemented the transparent gap limit handling, so we can handle recovery for seed phrases from arbitrary transparent-only wallets that did transparent address rotation in the Bitcoin style. Apart from that, there's been a bunch of specification work. We've been working on a ZIP review for the the ZSA zips and have had a couple of rounds of feedback with the Qedit folks, and that work is still ongoing.

[00:07:44.26] 

We're now moving forward on the V6 transaction format specification. Arya has been taking part in those calls as well. 

[00:08:08.04] 

Oh, and then, of course, there's the Zallet. The last Arborist call, we had a initial alpha version, but it wasn't actually serving any zcashd RPC APIs as yet. So Zallet is now, with some more changes, actually serving a couple of zcashd RPC APIs. That's now even more to the point where it makes sense to start working on infrastructure for how that is going to be deployed. We did not make any progress on connecting it up to Zaino yet. It's still just connecting to a lightwallet server for its data source.

[00:09:09.23] - **Pacu**

Hey. Kris, could you link the PR you mentioned that needed attention so we can put it on the... Like everyone somewhere of it and we put it on the notes? Yeah.

[00:09:29.55] - **Kris**

That is [PR 197](https://github.com/ZcashFoundation/zcash_script/pull/197). I see it's still marked as being drafted, so I'll check back with Greg on that today.

___

### 3. zcashd deprecation - Zaino update 

[00:37:39.04] - **Zancas**
Yeah, I can just give a brief update. Zaino is very close to releasing the replacement, we've had a very brief interruption with some health issues with one of someone in our community. So that has I wasn't expecting to present on this. I was expecting someone else to.

[00:38:20.44] - **Daira Emma**
I hope they're okay.

[00:38:24.18] - **Zancas**
Yeah. The Zexcavator project is cranking along. I see that this slide is specifically calling out zaino. We have increased the number of people working on it, and there's a lot of productivity there. I looked a bit into the name of some of the types in zaino, and there's some discussion around back. But again, I wasn't prepped to talk about it this time. It's cranking along.

[00:39:11.33] - **Pili**
No worries. Sorry to put you on the spot. Just so you I thought we might have anything. It's absolutely fine. Pacu?

[00:39:20.19] - **Pacu**
I can provide some updates, too. I didn't want to steal anyone's thunder. So there are a couple of The PRs on the Zaino repo is that's [github.com/zingolabs/zaino](github.com/zingolabs/zaino), which are part of the milestone 2, which is mostly composed of implementing the read state service functionality. Anyone wanting to take a look there, reviews are always welcome everywhere. This is for everybody else. Review your friends and your colleagues code. Someone has to do it. Might not be that fun, but we need reviews everywhere. That's another update I just got from one of the folks from zaino. Reviews are welcome. Yeah, I'll look for them and I'll share them here or on Discord, the arborist call channel.

[00:41:11.35] - **Pili**
Any other topics to discuss today? We have time today. If there's something you want to discuss with the people here, please raise your hand and put the started on it. There's an announcement from Jason to sign up to the Shielded Newsletter at zechub.wiki/newsletter. 

[00:41:57.43] - **Daira Emma**
I do have something. So I was trying to prove that ML-KEM, the postquantum encryption algorithm standardized by Nist, was key private. I got to the point of doing a sketch proof and then found that there's a paper that already proves it. So that's useful because it means that we can... A future upgrade could use ML-KEM for note encryption. 

[00:42:33.49] - **Pacu**
Oh, yeah, there's something... I was looking at the PRs that Kris requested. There's an outstanding discussion on a PR named ['allow connecting to the zebrad on any host name'](https://github.com/zingolabs/zaino/pull/115), which is a requirement from zecrocks and I don't know. I think that this is important to have some consensus about, I guess.

[00:43:07.13] - **Pili**
It's a PR or an issue?

[00:43:09.35] - **Pacu**
Yes, it's a PR.

[00:43:11.53] - **Pili**
On which repo?

[00:43:13.40] - **Pacu**
On Zaino. I just saw it and while I was looking at something else, and I was reminded of it. So ECC has the idea of starting to build early integration testing infrastructure to send to partners and test ourselves. I think it will be important for the people creating the Docker thingies and the Kubernetes and all of that to have clear guidance of what are the decisions around that, around this topic, particularly. I guess that has his approach and other people have others. I just wanted to bring that up. It doesn't need to be solved at this time, I guess, but it's important that the discussion gets somewhere.

[00:44:16.01] - **Blake**
Yeah, just a quick note here. I think we pretty much resolved it in the GitHub thing. I don't see it as a blocker anymore. And the context here is I'm all about keeping our infrastructure very secure and having secure by default nudges throughout the code that we write. But we have to support Docker and we have to support common cloud native deployment environment.

[00:44:39.38] - **Blake**
To me, it means if we can connect the different processes over RFC-1918 local IP addresses, that satisfies any requirement that I have. I totally see the concerns of not wanting pieces of our infrastructure to connect over the open Internet. It's merging insecure modes across everything. So yeah, I feel satisfied with the way this pull goes, and I don't see how it's a blocker anymore.


___


### 4. Research & Implementation Updates i) Zcash Shielded Assets 


[00:10:53.26] - **Vivek**

Hi. We have a few updates to give. To start off, wanted to share that generalization of the Zcash Note Encryption Crate, which adds support for ZSA. There was some discussion with the reviewers at ECC, and it was merged upstream post that discussion. So this is the first ZSA implementation piece, I think, that's been added into upstream, and so we are excited about that.

[00:11:24.31] 

On the ZIPs front, as Kris mentioned, the Zip editors completely We did another round of reviews. We fixed various comments and one pull request was merged in. There's still, as Kris mentioned, one other change to the transaction format that we are still discussing. That change, that's the new thing that I've opened a new [PR 976](https://github.com/zcash/zips/pull/976), which makes that change. And we can continue the discussion and stuff on that new PR.

[00:12:00.28] 

On the Zebra side, we have been working again, on the implementation of the consensus rules, the new consensus rules, and the transaction structure. There's also, I think, some work being going on on the state management and the asset supply management side of things. We have set up an ECS instance of our Zebra node towards setting up a ZSA testnet. We are in the process of completing the setup so that anybody could use basically Docker and GitHub actions, I think, and just get their node started.

[00:12:41.37] 

Ideally, it should be easy to use without too much work involved. So we are working on that. I think it should be nearly complete. So stay tuned for that update. We have also completed various changes across librustzcash, Orchard, and the Python reference implementation. This was related to implementing the Zip changes that were merged recently into Upstream.

[00:13:14.41] 

We also, December, probably is when we got the Least authority audit of our protocol. We were working on resolving the suggestions, and we completed resolving all their suggestions. So I think they've given us an updated audit report that also says that they're happy with the suggestion, like what we've done with those suggestions. This is regarding the immediate NU7 stuff, regarding asset swaps and user controls, which we are also working on. I think we had done the implementation of ZSA swaps in Orchard previously. We've also done, I think, a draft of the implementation in librustzcash now. I think that's the status for swaps at the moment.

[00:14:10.05]

We will be getting this a similar support for Zebra and Zcash transaction tool in the future. And we have for user control, the transaction acceptance bit. We had provided a forum post with the possible designs, and we also drafted a draft ZIP for the user control features. I think that there's no defined number yet, but we will discuss with the Zip editors and finalize that at some point. I guess there are some open PRs in halo 2 and so on where I think that would be what we think is the next spot for a review and possibly ideally be merging in the future. So we are excited to have those things also join in in the future. 

[00:15:16.46] - **Kris**

So, Vivek, I wanted to check whether you saw my post in the ZIPs channel related to our suggestions for the changes to how asset descriptions are handled?

[00:15:32.25] - **Vivek**

I didn't see the post, but I did see the PR, like 975. I haven't gone through it fully, but I'll keep an eye on that, and I'll check the ZIPs channel.

[00:15:54.07] - **Pacu**

Yes, I was thinking about timelines and besides deployments, what is a reasonable time where wallet developers should start looking at the ZSA implementation and start working towards supporting them because ZSAs will turn Zcash wallets into a multi-asset wallet on a single chain. It won't be the same as a multi coin, multi chain wallet, but still it's a reasonably big refactor on any on any code base.

[00:17:02.56] 

What are the tools that developers have now to start working towards that? I'm thinking that the second most important thing of NU7 is actually having all of that available to the users the day of the deployment, if that would be the best case scenario. So what are the tools that we have to work towards that and where can people find that information?

[00:17:45.20] - **Vivek**

So we have a repository on Qedit. It's the zcash_tx_tool, the zcash transaction tool. So before zebra was just a node without any wallet functionality or the ability to create transactions. So we created some testing repository, which is the Zcash transaction tool, which can be used to basically create transactions that do issuance that do transfer, that do burn.

[00:18:17.32] 

So we gave a [demo](https://www.youtube.com/watch?v=1MZMGC9ViyA) for that in end of December, just before the holidays, I believe. So we've continuously been maintaining that. That's also the place where we are building the Docker support and the GitHub action. That would be one place where... Even just looking, I think, at the transaction tools and how the transactions are created, it's not, I think, really production level stuff. It's just there so that it can be done. But that may be a good place to start to see how the whole thing interacts with when ZSA is also involved.

[00:19:02.46] - **Pacu**

All right, great. How are you folks approaching development yourself? Do you run a private testnet or something like that where you have ZSA is active on the zebra or something like that? Do you see something that is possible?

[00:19:26.14] - **Vivek**

We are building a testnet, and the way we see it, I think we've set up a node on ECS that just runs in the cloud that is constantly running zebra. The idea is to take that and use that as the starting point for building a basic testnet. The idea with, again, the Docker and the GitHub Actions thing is to allow people to, again, download, just run that. Then they have a node that runs that connects to, I think, basically the ECS node, so that generates a testnet function. That's close to getting... I thought it was done, but I think we are ironing out some kinks. That's why we haven't formally said, Okay, it's ready yet.

[00:20:18.04] - **Pacu**

That's awesome.

[00:20:26.43] - **Dodger**

Just to touch on that topic, I would imagine that getting the changes merged into core libraries like librustzcash and stuff like that is probably a prerequisite for the wallet has been able to start working. And I imagine as well, this is just speculation, that it might be easier for them to do that work once ZSA capabilities have been added to the CLI wallet. So obviously, looking moving forward several steps.

[00:21:05.59] - **Pacu**

Well, you can mock everything up, but ultimately, you need a Zebra instance that is serving this transaction or some better version of it, then those changes will bubble or trickle down to Zaino, for example, and the whole stack should start working on it. I think that's a bunch of work that it has to start happening at some point in time. This is maybe too early in the year, but I guess in two or three months, it will have to. So that's the reason of this question. What do we have in place to actually help developers build all these things around ZSAs?

[00:22:02.40] - **Daira Emma**

Kris, we had a re-estimate of the timeline that we were... We just used internally to calculate for the ECC roadmap, which has been published on its own. Let me just check that. Actually, carry on while I'm finding them.

[00:22:29.31] - **Vivek**

Yeah, I guess I was mentioning that I think our craze, our versions of all the repositories, like Zebra or Halo 2, may not be Halo 2, but basically Orchard, librustzcash, we are somewhere at different levels behind, say, the top of the main branch. That's part of because it's obviously a moving target that we are working towards. In some places, I think we cannot properly merge to Zebra because we are using a dependency of orchard that's slightly older because I think there's been various changes made.

[00:23:09.34] 

Again, I don't remember actively if that's still the case or we fixed it, but we were behind on Orchard. We couldn't move. I mean, we would have to do a bunch of debasing and merging to move because Orchard moved the head, and then the librustzcash has moved the head significantly because of the various things like PCZT. We are looking into that now because that's a bunch of refactoring that will break a lot of our stuff. That's why I think we are happy to see things start to get merged because the rebasing does add overhead that would be nice to minimize.

[00:23:56.56] - **Daira Emma**

Unfortunately, that's inevitable, but sorry, it's been disruptive to you. I have the link that I was thinking about. Actually, I'll screenshare.

[00:24:56.41] 

I don't know if you've seen this before, but this was what was used to calculate the the ECC roadmap. And you can see that the NU7 activation here. So this like the previous timeline, oh that updated because it was using the same event labels. So that's not actually accurate.

[00:25:34.34] 

Like the previous one, [this is also optimistic](https://hackmd.io/lQQpGdObSp28Y-1lK0PiLg?view). So bear that in mind when you're interpreting it, but it is more realistic than the previous one. You can see that when the zcashd wallet replacement, this is May the first here. It's a political line. Now, this must be the old version because... This is the update? No, this is the old version, so ignore me because for some reason, this is not showing the right version of the document, so I'll just close that. If I can find how to close it.



___


### 4. Research & Implementation Updates ii) NSM update

[00:27:39.47] - **Jason**

We're currently focused on the integration work for the three ZIPs. Mariusz from Eiger can provide the details for the status update?

[00:27:49.40] - **Mariusz**

Yes, hello. So I am currently rebasing the PR covering the Zip 243 implementation. I'm mostly done and the next step will be to actually introduce the transaction version 6 and remove the feature flag that was set initially in this implementation. Also, we'll do the same on the librustzcash PR.


____

### 4. Research & Implementation Updates iii) Trailing Finality / Crosslink 


[00:28:46.10] - **Zooko**

I can give a brief update. You had this as a join update, but with who?

[00:28:51.01] - **Pili**

Shielded Labs and Electric Coin Company, I guess Daira Emma was talking about this in the past. 

[00:28:58.41] - **Zooko**

Yeah. Kind of like proof of work and proof of state cooperating. Over at Shielded Labs, we're booting up our new employees, Sam and Mark, and we're working on a tear down CI for Zebra that does less, and we understand better. The main thing is that the upstream CI does integration test on mainnet, and since crosslink is a backwards and compatible change, it can't connect to I mainnet. But there may be other stuff. I haven't read the new CI documentation that you guys just dropped.

[00:29:38.01] 

The first milestone that we aim to deliver is a prototype that pretends to run the BFT half and that it always fails. And lastly, I've been responding to a bunch of thoughtful comments from Andrew Arnott and Arya on the GitHub, [github.com/shieldedlabs/crosslink-deployment](github.com/shieldedlabs/crosslink-deployment), that's the update.


____

### 4. Research & Implementation Updates iv) FROST client tool & server

[00:30:35.58] - **Conrado**

We finished everything we were working on with the FROST server and FROST Client. Where FROST Client is basically a command line tool that allows you to generate keys and sign with FROST using the server. So that's ready and the audit has started at the beginning of the week, the kickoff was on Monday. We're excited on getting this audited and finally having a tool people can use to sign FROST transactions. Its as a command line tool for now, but hopefully...

[00:31:24.23] - **Pili**

You're breaking up a little bit, Conrado.

[00:31:26.04] - **Conrado**

...Yeah, so basically, audit has started. My connection is bad again. Okay. Let me just go back. The audit has started and we are just waiting for the results so we can finish a final version of our tools. And we also thinking that we might want to rename our repository from demo because it's not just... 

[00:32:14.35] - **Pili**

Yeah, I can probably give a little bit of a summary. So we're pretty much finished with anything that a wallet would need, barring obviously, comments, people trying it out and giving us comments to a wallet would use FROST in such and such a way, and we need that.

[00:32:35.35] 

But the client and the server, which would handle a lot of the communication between the different participants in the FROST signing demo, they're done. We have an audit being done in it at the moment. And I think the last thing we're saying is that we're going to rename the repo because it's not really a demo. It's actually an implementation of FROST using the FROST reference implementation library. I think that's probably it in a gist. But happy to take any questions or comments. Maybe Conrado can also answer. 

[00:33:19.14] - **Pacu**

Do you have an estimated date for the walkthrough of the... Not demo anymore?

[00:33:29.39] - **Pili**

Well, I don't know if it has been announced, but we have... Let me call it tentative because I don't know if it's been announced. I don't want to spoil the surprise, but we're planning to present this in a community call on the 19th of February, so just in another two weeks time. So watch out for that. We really want some feedback. Want people to try it out and give us feedback. 

[00:34:13.02] - **Daira Emma**

I'll try and check that.


___


### 5. Open Announcements i) ZconVI Registrations / Zcash Dev Summit / Zcash Server Workshop & Hosh tool 


[00:34:18.40] - **Pili**

Announcements. Does anyone have anything they'd like to share? Maybe I can just mention the ZconVI has been announced. Please register. [https://zfnd.org/zconvi](https://zfnd.org/zconvi)

[00:34:50.22] - **Dodger**

Yeah, you can find the ZconVI link on the forum or on our website. I also wanted to mention a last call for anyone who wants to participate in the Zcash summit, the [dev summit](https://zfnd.org/zcash-dev-summits/) that we're going to be hosting for Real World Crypto. We've got a bunch of people signed up, some of whom are on this call. And we're going to make sure that it's clear that it's for the community. We're going to have a non ZF person facilitating and sharing it. So, yeah, please, if you're interested in taking part in that, if you're going to be in Sofia around that time, then please check that out.

[00:35:42.23] - **Pili**

Thank you, Jack. Blake, you have an announcement?

[00:35:46.37] - **Blake**

Hey, how's it going? So here at the zec rocks team, I just wanted to quickly note that we've got 2.2.0 running globally. That's awesome. And then we're also doing a workshop to help people learn how to run their own light wallet nodes. We do not want to be centralized in our operating of light wallets, so it's not too late to join in on that. Feel free to post on my thread on the forum, and we have over 40 participants right now.

[00:36:13.02] 

So if anyone technical, that wants to pitch in with providing support, we're also quite open to help. Then we also have a relatively new tool called Hosh, running at [hosh.zec.rocks](https://hosh.zec.rocks/zec) to track the uptime of lightwallet nodes across the ecosystem. So We'll be adding the new ones that hopefully are popping up over the next few weeks as everything sinks. If anyone's running infrastructure you'd like to track the uptime of, we'd love to add it there, both across mainnet and I like that. And I think Zingo Labs just joined as well. So I'm not sure if there's still time, but they may want to hop up.

[00:36:51.22] - **Pili**

There we go. We can have a... If anyone from Zingo Labs wants to give an update now? Now's the time. And thank you, Blake. I do need to find some time to follow the class and run. And just to say, we did release Zebra 2.2.0. I do a blog post on that and a forum post on that, so we will announce that shortly, but it's good that people are already running it..




___

### 6 Open Discussion - Google Advanced Protection Program 

[00:45:12.48] - **Daira Emma**

Yeah. I'd just like to take the opportunity to encourage everyone to enroll in Google's advanced protection program for all of their accounts. There have been some very worrying incidents. I mean, the most obvious ones are physical security incidents, but it's also important that we are targets, all of us, just because we work in cryptocurrency. Some of us are activists as well, which makes us doubly targets.

[00:45:46.59] 

The advanced protection program, it's not onerous at all. It basically just does what you expect for properly designed two-factor authentication. You need a hardware security key. If you lose the key, then you can still use your recovery code. So it's all very reasonably designed. It's not going to lock you out or anything. It's not going to stop you from going abroad. So please, I want people to stay safe. Speaking of staying safe, support any trans friends you have because we're going through a really hard time now with the anti-trans stuff in the US. Okay, that's I want to say.

[00:46:31.55] - **Pili**

Thank you, Daira. Andrew Arnot on the chat says LZR still has a bug that prevents spending Zcash. It seems like spendability bugs, so to get high priority. There's a link to librustzcash [issue 1609](https://github.com/zcash/librustzcash/issues/1609)? I don't know if anyone... 

[00:46:55.14] - **Andrew**

It's been glanced at by a couple of folks, but it's also a few months old, and it directly impacts one of the users of my wallet app. So it'd be nice to get it fixed.

[00:47:12.25] - **Kris**

We do have a reproduction of that issue Str4d has it. We haven't had any time to prioritize it lately, but I am aware of it. Sorry, we haven't gotten to it yet. 

[00:47:26.16] - **Andrew**

As long as it's still on your mind, that's the most important thing thanks.

[00:47:55.07] - **Pili**

Thank you, everyone. Thank you for joining. Thank you for participating. The next hour's call is for different in two weeks time on the 20th of February, the later time of 21:00 UTC. Thanks again, and see you then.


____


**Next Meeting Scheduled: 21:00 UTC February 20th 2025**


___
___



