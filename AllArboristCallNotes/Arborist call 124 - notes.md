## Arborist Call 124 Notes 

Meeting Date/Time: April 30th, 2026. 15:00 UTC

Meeting Duration: 65 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [zallet, Ai agents](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update) 

Research & Implementation Updates [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates--zingo-labs-zaino) / [zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-zodlzf-zingo-labs-pacu) / [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-wedit--zsa) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer)

Open Discussion [formal verification of rust](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=qfIS6wORZIA)

Moderator: Pili

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro

Pili: 00:00:54  

A usual reminder, this meeting is recorded. It's uploaded to YouTube, and if you don't feel comfortable with this, you can turn off your camera, or you can mute the session. So with that said, we can start the call and the recording now. Hi everyone. Welcome to today's arborist call on the 30th of April 2026 the agenda for today is as usual. We will start off with some updates from the teams working on the core Zcash stack, such as the Zcash Foundation, zodl and zingo labs. And then we'll follow this up with some updates from teams working on research and implementation of new features, such as qedit shielded labs and zodl as well. Finally, we will open the floor to participants if they have any announcements or there's a discussion topic that they want to bring up that might be of interest to the community. So what is the aborist call? It is a bi weekly call where Zcash protocol contributors meet up to discuss upgrade timelines and process protocol research and development efforts, design and implementation of new protocol features, and we identify blockers and unresolved issues. And the purpose of this call is to try to make Zcash protocol development accessible to interested parties and to provide transparency for everyone interested. Anyone can register to attend by going to Zcashaborist.org and if you want to become more involved and present during the call, you can email us at Arboristcall@zfnd.org, and ask us for a presentation slot. Outside of the arborist call, you can participate in the Zcash community in a number of ways, by applying to one of the grant programs, or you can take part in community discussions in the Zcash R and D discord of the Zcash community forum, and you can find clickable links for all of these at Zcashaborist.org  and with all that said, we can start with some updates on zebra from the Zcash Foundation's engineering team, and I think Marek is delivering that today.

## Zebra Update 

Marek: 00:03:21  

Thanks, pili. So in the past two weeks, we've been addressing reported security advisories. Right after the last arborist, we released zebra 4.3.1 with some fixes, and soon we will be releasing a new version with more fixes. That's the update.

Pili: 00:03:59  

Thank you. Marek, any questions or comments for marek?  okay, I guess not. Let's move on to updates from zodl. Who do we have today? Thank 

you.

## Zodl Update 

Daira: 00:04:26  

Okay, so can you still hear me? If I do this? allright, okay,  I just need to find the update that kris sent me. Where is that? Hang on. There we go. Okay. So we released sapling crypto 0.7.0, orchard  0.13.0 and the entire Librustzcash stack, and those include quite a bit of new functionality, so you can read the change logs to somewhat change there. So we needed to do those releases because of the yanking of the core 2 crate. So that became maintained. The original maintenance yanked it. So we've been depending on that, and we needed to write a replacement. We weren't happy with all replacements that were available in the community, and that was to avoid a regression in no standard environments. So we still support those now. So we wrote our own  crate  relatively simple, and yeah it's better because it doesn't depend on safe code. And then we added the ability to regression test Zallet wallet import, so that now supports history that goes all the way back to Genesis. So we constructed some reg test wallets to test that. We've tested that, that actually works okay, and that's in a PR on the integration test repository. Okay, cool, and then for research and assurance, so I've been working on finishing off the butchered quantum recoverability spec, merged the PR with lots of cleanups for that, and I'm making headway on the security proof. So there was an informal security argument before, but not a proof, and this will be a completely formal proof that we're actually doing something that will enable us to have a quantum secure protocol in future. Okay? And the other thing is that we started off a repo of skills for mainly claude, but could be used by other AI agents for working on Zcash code bases. I made a lot of cleanups to that, so Claude had looked at the Zcash repositories, they duplicated a lot of information that isn't actually needed in the skill. So some of that will be cleaned up because it's just more efficient for it to go and look at the current information rather than take it from a stale copy. Okay, I think that's about it. I don't know whether this has been said in the last arborist call, but there's so 6.12.1 of Zcash D was released, which is a security release. There's a blog post about it on the zodl blog, and I think that's about it.

Pili: 00:08:44  

Thank you. Daira emma, any questions for Daira? no questions, thanks. So far, maybe we can move on. Yeah, let's move on. zingo labs and zaino, who's delivering that update today.

## core stack updates- zingo labs zaino

Pili: 00:09:21  

Nice. So Hazel, okay,

Hazel: 00:09:35  

So I don't have much to report. We've been doing a lot of work under the hood, nothing really public facing like we've been making our tests run faster, getting a better integration test suite. There's been some work. Some there were a couple API's that were diverging a bit from light wallet D, mostly version numbers that weren't quite right that we've fixed up, like working on like cleaner shut down, upgrading our dependencies to use the new ones that depend on core Zed instead of core two, bunch of assorted tech debt cleanup stuff like that, getting some duplicate code,otherwise nothing very public facing in the last couple of weeks.

Pili: 00:10:58  

Cool, good. Any questions for Hazel?

Alfredo: 00:11:19  

I'm not sure if you are aware Hazel, but I saw zancas has opened an issue in zebra about some dependency stuff that is giving zaino some issues. So I was wondering, how fast do you think that should be fixed? If you know,

Hazel: 00:11:42  

I was not aware of this.

Alfredo: 00:11:48  

I'll post you the link and yeah, thank you. 

Pili: 00:11:58  

Any other questions for Hazel? Okay, let's move on. zcashd deprecation updates, Pacu, do you have anything to say today?

## zcashd deprecation updates zodl,zf zingo labs pacu

Pacu: 00:12:25  

My internet connection went down the moment I joined the call a few minutes ago. So I am in the data plan. Okay, so a few things. There's a new release of Zaino being prepared, and our appointed release manager, Nacho, I think he's traveling at this moment, so obviously the release is waiting for him and  I also updated zaino to zebra 4.3.1  that was pending. Fortunately, we've been cleaning up,  the zingo labs folks also did a bunch of stuff so that there's not many interdependencies, and now updating zebra versions is significantly faster. So that's that's very good news, and also the integration tests that check parity between lightwalletD and Zaino, there were few wrinkles from the transparent data that were ironed out, and all the PRS are in place, and need reviews, but the tests are Passing, so that's a really good thing that we're going to continue to improve the light client protocol. And yes, those interested in the light client protocol invite you to light client Working Group, which is every other Thursday at 17 UTC. And I think that's pretty much it for ZcashD deprecation. And we are also getting most of the block explorer RPCs done, from what I've been checking on zingo labs board and their grant progression, there are a few I just mentioned, and that we are paying some people to see if they're really using them, that thing we're going to cross off the list very soon. So I'm really happy that's it.

Pili: 00:13:16  

Okay. Thank you. Pacu, any questions for Pacu?

Daira: 00:12:30  

So are we leaving discussion till the end? Because I want to say that Zcash D should be deprecated sooner because of AI vulnerability discovery being a big problem now,

Pili: 00:15:41  

We can talk about it now. It's just the right time I think.

Daira: 00:15:47  

Yeah, so ZcashD 6120 fixed a security bug where we wernt verifying sprout proofs in some cases, and then in 612, 1, there were, kind of think of them as four bugs, and depends how you count, but there was two problems, there was a crushing bug in both Zcash D and zebra, where, if the RK point was the identity, and then we had a consensus divergence between Zcash D and zebra, where Zcash D was wrong and accept, and I think that's right. Yeah, it was to do with EPK being the identity. And then there was another bug to do with chain that allowed bypassing the  checks, which is very serious, obviously, but it didn't allow a balance violation of its own. But combined with other bugs that could have and then, as a consequence of that, we found other issues with arithmetic on balances that potentially could have caused undefined behavior, and we added a checkpoint mechanism to make sure that the balances that are persistent on disk were restored if they've been corrupted. So there are a lot of bugs, and there are going to be more bugs. So the question is, I mean, how fast can people like mining pools patch? Should we kind of change how we handle security incidents so that, I mean, one thing I thought of is that Microsoft, at one point had so many bugs that it switched to doing regular security updates at a particular predictable time of the month, Patch Tuesday. Maybe, if you need to do something like that for both Zcash D and zebra, maybe. So, yeah. And then the other thing is that we desperately need to simplify the protocol so that all of the sprout code, we can get rid of.

Pili: 00:18:38  

Yeah. Thank you very much. Arya, you want to respond ,we can't hear you. Arya, if you're talking,

Arya: 00:18:50  

we can see that we're no longer maintaining its network security, so that operators are advised to essentially hide their Zcashd, if they need it for their wallet, behind a zebra node as of now and then focus our attention on making sure that zebra network is secure, rather than trying to get Zcashd to be secure, which is Probably a losing battle.  (Daira)So I don't think that that's necessarily a sensible thing to do right now, because it's so hiding all of the Zcash D nodes behind zebra nodes is kind of equivalent to switching the whole network to zebra because, well, not quite if mining pools are still using Zcash D for get block template, but I think it almost has a worst of both worlds effect. You intuitively think that it's the best of both worlds, but actually no because so you're vulnerable to all of the crashing bugs of zebra. And then if you have a consensus divergence, then your Zcash D nodes, even if they're behind the zebra, ones, get stuck. And so then the mining pool mining power drops of legitimate miners and the adversaries miners get the whole network actively. So I'm not convinced. I mean, I know shielded Labs has put out this blog post advising people to do that, and I I got them to turn down some of the enthusiastic advocacy of this approach and be more realistic about the problems. But I didn't find all of the problems when I reviewed that post, and the more I thought about it, the more skeptical I am about that direction.

Pili: 00:21:02  

zooko, you've had your hand raised for a while. Do you want to go next?

Zooko: 00:21:05  

Yeah, shielded Labs is still recommending that to partners on the reasoning that it protects you from a whole bunch of really bad bugs, while also making you more vulnerable or differently vulnerable to certain problems, especially around chain forks. Daria helped me think through the chain forking issue in advance of our first blog post. So why don't we talk more about the further issues you've come up with? But at the moment, it seems like, what's the word, like a graceful or practical path forward for people who cannot turn off their Zcash D right now, so that's still what we're working on. Stay tuned.

Daira: 00:21:50  

I mean, yeah, for that narrow purpose, yes, but I think it doesn't really address what I was originally talking about, which is the fact that we need to deprecate Zcash D sooner. And even if you switch to this, if you hide all the Zcash DS behind zebra, you're not really addressing the problem, because you still need to deprecate Zcash D very quickly, even in that scenario. At the moment, it's basically, I mean, there are a bunch of denial of service attacks in the bugs that are being found, but it's also a denial of service on our time as maintainers. So, yeah, yeah,

Zooko: 00:22:42  

Yea , zodl needs to make a policy and communicate it to the rest of us about that, like, are you going to be spending all your time fixing security bugs and distributed patches? Are they coming out as fast as possible, or on Tuesday, or what? Like hypothetically,  there's various things that can be done, but it depends on, yeah, depends on what zodl plans to do going forward for that.

Daira: 00:23:14  

Yeah. So it wasn't quite clear when these books started that how many of them that were going to be but I do think that we need to consider this carefully, accelerate the timeline for deprecation as much as we can, and then that the whole Network is going to be safer when we transition to zebra, but we do have to make sure of that,  we really need an audit, which is kind of the white hat people trying to find consensus divergences and then fix them without the all of the overhead of the current security incident response processes. Anyway,

Pili: 00:24:16  

So we're sort of struggling, but I feel like we're starting to get duplicate submissions where the submissions that we get are in severity. So I feel like the low hanging fruit, at least, of what could be found has been found. Well, I mean Famous last words,

Daira: 00:24:41  

I'm not yet confident with that, but it may be different. Yeah, it may be different between Zcash D and zebra actually, yeah.

Pili: 00:24:54  

And the other thing I would say, we're working with shielded labs, because some people that have put Zcashd behind zebra are finding that it does not quite work for the use case, and shielded labs are helping us with that. So thank you for that. I don't know what else I was going to say, Yeah, where it is a denial of service on the team, we're hoping it will slow down. But you know, go ahead zooko

Zooko: 00:25:20  

you said we need more audits. And shielded Labs has hired Taylor Hornby to do audits of zebra and Zcash D and like all the software and Zcash community grants, has announced a $1 million total bug bounty. It's not $1 million per report. The max is $225,000 for the best possible report, but it's a total of a million dollars worth of bug bounties for white hats to report bugs, thereby D.O.S-ing the teams even more.

Daira: 00:25:52  

It is encouraging that AI hasn't yet found any end of circuit bugs or kind of the balance violations relative to the intended consensus rules. So there are things like Zcash D  sometimes not verifying drain split briefs, which is kind of embarrassing bugs to have, at least the bugs are in places where I thought there might be problems, so things like point normalization, low order points, that was always an absolute pain to reason about kind of and hold everything in your head. We tried to simplify it for orchard, but it turned out that kind of the implementation didn't follow the spec. So simplifying the spec doesn't necessarily help in that case, yeah, they just want to get rid of all of the C++ code as fast as possible.

Pili: 00:27:13  

Pacu, you wanted to say something and then. zooko, again, yes.

Pacu: 00:27:19  

Perfect line. You get me daira Emma, yes, so for people hearing this or listening to this on YouTube, currently, the assumptions that all the teams had on Zcash deprecation and its timeline has has changed to this incidents and that reports, and now we are shifting the approach a bit in terms of what can we modify, or what scope can we change so that zcashD deprecation happens faster. And obviously we can give out any timelines, but probably what we're talking about, and what being been discussing the last few days with with the team, and this is an idea that that kris nuttycomb brought up, is to probably relinquish the idea of frictionless transition and focus on getting the most important scenarios and use cases functionally right, and then double or triple or quadruple down on outreach and support to make the transition happen, even if it has high friction, because it's important to deprecate Zcash D as soon as we can. And it's now with this new reality. Why now? The answer is because our tangible reality and the facts have changed, and we adapt to these new facts, and we are making new decisions, so

Daira: 00:29:44  

it's going to be a bit messier. In other words.

Pacu: 00:29:47  

Yes, it's going to be rough. But that's kind of the rationale. So people understand mostly, there are a lot of people that watch this call that maybe they're not software developers, or maybe not, that they're not in the into every detail I wanted to kind of explain the rationale.

Pili: 00:30:08  

Thank you Pacu, zooko you wanted to respond

Zooko: 00:30:15  

yeah, yeah. On the topic of how many more bugs and how bad they are likely to be in Zcash D and in zebra, and on the topic of Dara, Emma being embarrassed about the sprout joint split verification miss and and on the topic of Dara said, at least it's a relief there's been no critical bugs in the zero knowledge verification of the actual shielded money circuits, which would be sort of the Most High Impact dangerous part. Well, I just want to point out with someone probably a lot of you already know, but the rest of the world is having way worse than us. We've done way better than most crypto and non crypto projects to be ready for this wave of discoveries. Like Litecoin just had a active counterfeiting exploit. We're just kind of vaguely comparable to the kinds of things we've been facing, but it actually got exploited and has resulted in loss, monetary loss, to users and all kinds of problems. If you go to ZK bugs.com There's 139 bugs in zero knowledge proof verifiers that have been publicly discovered and revealed. But so far, knock on wood, none, none in the verifiers that we depend on anyway.

Daira: 00:31:44  

I thought the Litecoin thing was a network split, hash power attack, not

Zooko: 00:31:57  

if you like, diving into the actual details and all the ins and outs, where some of the resulting problems involved, who got notified about the vulnerability when that became a huge issue. And it's really interesting, and it totally relates to shielded labs' recommendation that you put your Zebra, a fresh new zebra node in front of your Zcash D, because part of the successful exploit of the bug. But to answer your question, the original bug was actually a counterfeiting of Litecoin out of their M web semi privacy hack. So it was a chain of a bunch of things that also involved DOS-ing the miners that had been patched so that the unpatched miners that were accepting the impelled transactions got ahead. So there's several different pieces interacting. But anyway, in general, Zcash is better than most or all, but we may still have really substantial bugs.

Daira: 00:33:04  

we're really tempting fate. We should probably stop talking, yeah,

Zooko: 00:33:15  

we're likely to have more. I agree purely that it's a really good sign that we're getting duplicates which are lower severity that's a statistically meaningful and encouraging sign.

Pili: 00:33:29  

Yeah, we'll see Jason and then Natalie, who had a question in the Q and A but, yeah, go ahead, Jason.

Jason: 00:33:36  

Okay, so I'm just joining this call a bit late, so I apologize if I'm speaking out of turn or this comment comes across as random, but I just don't want the next network upgrade to block on Zcash D deprecation. Totally get that Zcash D is a liability and prone to vulnerabilities, but now that zsas are not going to be included in Nu 7, I think if Zcash D deprecation isn't ready by a concrete date, that's like a few months away, then we should just ship a network upgrade in both Zcash D and zebra as soon as there is consensus on what candidates are in scope.

Daira: 00:34:13  

So one thing is that, and I'd still have to work out the details of the specs, which a quantum recoverability is probably not going to depend on a network upgrade. So it can be done as , it needs an activation height, but it can be done at the wallet level, like zip 212, was. well, 212 is synchronized with an upgrade. So  the thing is, moving things out of a network upgrade and kind of reorganizing what's in it, means a whole a whole bunch of rewriting specs and redesigning stuff. And so I tend to think that we should stop changing our minds about what is in network upgrades ,on that the things that we had originally decided to do should be grandfathered in and,  we should  stop changing horses in midstream, or whatever the metaphor is, anyways, changing zebras in midstream . yea thats the one

Pili: 00:35:41  

I think Natalie was next.

Natalie: 00:35:44  

Thank you. Can you hear me?  Okay, my question is about formal verification of rust code in Zcash and zebra. Are there any ongoing work with formal verification. If yes, how exactly

Pili: 00:36:03  

Let's  move this to the open discussion.

Daira: 00:36:11  

Yea its potentially a large topic. Yeah

Pili: 00:36:15  

Let's save it for the end, and if there's still time, sorry, Natalie, we'll keep that one. , and then we'll try and move on. Because we're running out of time for the call

Pacu: 00:36:32  

yes to answer Jason's question. One of the things that was discussed in a  meeting, I think a few days ago, not the last one, I couldn't attend yesterday. So I don't know if there are other developments and on this topic, but the idea of accelerate, of free scoping Zallet and the expectations of the transition experience is to in order to accelerate Zcash D in a way that we can achieve an Nu 6.1 zebra only network, and that it doesn't obstruct Nu 7 when it's scoped  and scheduled. That's how urgent  we want to deprecate Zcash D I guess now.

Jason: 00:37:32  

Okay will  Catch up with Mark to find out more details about what was discussed on that call.

Pili: 00:37:47  

Thanks Let's move on to, oh, that should be, what does that say? This should be research and implementation updates. But anyway, let's start with qedit. I don't know why that got mistaken. Who do we have from qedit today?  Vivek. 

## Research & Implementation Updates. Qedit- ZSA

Vivek: 00:38:06  

So yeah, one second, let me get my pages back in, out in my head. But yeah, I guess for Zsa is the most exciting thing we did in the last few weeks was we gave a demo of the entire functionality on zechub, and this included the issuance transfer and as well like the atomic swaps feature. So we had an end to end demo, and we had some time for questions, and it was pretty fun overall. So I think that's up on YouTube and stuff. So anybody who's interested can go have a look at that. That was nice. It. I think, like all this stuff, can easily be run on your local computers as well. So I think you can also, like, connect to the node that we are running, which we have a node that would support swap, so we'll be posting some stuff about that on the forum as well in the coming week or so, I think. So that's one, on the other side, yeah. Like the on the zip side, we started off a discussion about like, considering that zsas are not in Nu 7, we are considering folding in the consensus sensitive stuff that changes in swaps also into the ZSA zips, because, like in some future network network update that includes Zsas we would probably also be including swap, since that's pretty much ready as well. So if, if that's the case, then it will be good to have the consensus details all in one place, rather than having some amount in zips 226 and 227 and then some more in zip 228 So yeah, that's something that we'll be looking at possibly in the in the future, in the near future, on the orchard side, I think we've responded to the str4ds review, and responded to all the comments. So we are, think we've done a few rounds of this. Hopefully we should be getting a response or a merge of that into the long term Zsa branch soon. We also had a brief discussion with daira emma about,  like there will be structural changes that come in for swaps So, but we'll probably like since this review is  in an advanced stage, we will wait for this review to complete before we, like, put in extra swap, swap related details so that,  we'll discuss with the zodl  as we go along. on the other crates, I think, generally like, yeah, we've been keeping them ready for review. So once the orchard review is done, we'll probably move on to librustZcash and so on. So all those things are generally ready for review at all points. And yeah, on both the ZSA front as well as the swaps front. So, yeah, I think we were going to be putting a zebra PR as well out. We were working on the final stages of that, but I can't recall right now whether we submitted that or it's still internal. But yeah, that's also we have, like, the final stuff on zebra ready to go? Yeah, that's, I think that's basically it from me.

Pili: 00:41:48  

Great. Thank you, Vivek. Any questions for Vivek? No, okay, let's move on. Shielded labs on the network sustainability mechanism. Who's talking about that today?



## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:42:14  

I can give an update on that one. Yeah. So quick update on this one. Not too much to share. So I'll keep it quick. Conrado caught really, like a nice or like a small mistake I made where I was using the zero value of a deferred pool balance change in one of the procedures, and so that one needed to actually calculate the correct value, because it had enough information at that point. So the only fix for that was just passing in the deferrable Bounce change parameter and then updating all the call sites. Besides that, added some regression tests to ensure that those kind of small mistakes are caught at least in tests, and that is about it. So just need an extra pair of eyes when people have some time on that PR, yeah, once that one is merged in, then the actual second half PR can be taken like a look at. So, yeah, that's about it for me. 

Pili: 00:43:07  

Thank you judah, any questions? all right, move on. Shielded labs  and zodl on crosslink

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Mark: 00:43:36  

yeah, I can give this update, will like to share my screen

Pili: 00:43:37  

one second I can stop sharing. Also, if you want to share.

Mark: 00:43:48  

that's fine. I think I can just do that. Does that work? Yeah, okay, great. All right, so this is our update over the last two weeks on cross link. The main thing is that our feature net went live April 16, and we have been supporting our users and participants since then. I can't say that it's been up the whole time, but it is up now. And, you know, we've always gone back and fixed things. So there's been 91 commits across six contributors. And what's really cool is that there's three community projects now, at least three that I know of. They're mostly like block explorer type things. Our friends over at cipher skin made a cross link version of their explorer. There's a couple other community explorers out there. So the main work that went into this, and the thing that the featurenet  rests on, is this thing called shielded transport pigeon. That's our working title, which is the custom UDP transport for block syncing and all that. The main thing that it does is basically it gives all of the UDP datagrams IDs, communicates them over noise encryption using the snow library, reassembles them based on their IDs into these jumbo grams that can be up to eight megabytes, and are used, you know, those messages, blocks and votes and things like that are used in the application layer. It's important that we're honest about all the trade offs between STP and other things like quic our main motivation, beyond simplicity and audit surface, is optimizing for Nym, mix nets and things like that, with traditional congestion control being a bottleneck there. However, there, you know, I frame the slide as trade offs. There is no post quantum in noise, but there's people working on it now in a library called clatter that we're going to start looking at at some point. So we have sort of a migration path towards post Quantum. And you can see here, I won't read all this to you, but this is basically why we're doing this. We're going to accept the POST quantum migration debt for now, given that we're just on the feature net and we're learning and working through this. And again, the nice thing is that there's no infrastructure other than just being able to send UDP packets required for this, whereas something like, you know, TCP, or even quic, requires other infrastructure there. The main things that we got done, we're calling this new net, this STP driven syncing protocol, lot of refactoring, and we've replaced block sync, but not mempool. Nothing with the mempool right now, so that still uses the standard zebra network stuff we are making consensus on Crosslink stronger by using the real fee values. And we're calling it eagerly verifying the staking windows. So you know, there's just some redundancy in the messaging. There's no caching, which is nice. We're building out wallet support. We have T address and unified addresses working. We have the funding streams working now, after a fix, and we're building a scanner that's going to allow people to get their incentivized rewards based on a new RPC. And we have the plumbing for that, and the coin base is working, and we're going to build up the staking rewards next. So that's like the last 24 hours, kind of work in progress stuff, and a bunch of reliability improvements as well. Cool things to call out here. We have a new hire at shield of labs, Giovanni Carlino, who landed a substantive first volley of commits on the GUI and rendering side of our cross link node. And then we have another really cool thing, which is our first external community pull request and merge, which was a quick one line change, but an important one, because it moved to sleep inside a loop, instead of outside of it where it needed to be. We're going to build up the scanner next. We're going to harden up the new net syncing and keep working on that, some cleanup. And then we're going to implement the Finalizer commission. Some potential things are the mempool sync, and we're going to start looking into the fly client height proofs, which would help with syncing. Help with syncing as well, and I will stop sharing. Thank you.

Pili: 00:48:47  

Great. Thank you. I share my screen now again. Any questions for Mark In the meantime,

Pacu: 00:49:05  

Yes, I don't have a question. I just wanted to congratulate all the teams, because a lot of people are working on the cross link featurenet. It's really fun. I encourage everyone to join. It's really easy and non-invasive. You don't really need to be a Linux nerd or anything like that to run it and see the crossing graphic UI and report bugs and weirdnesses. So it's been a hell of a ride, super fun. And, yeah, hop on people. Don't miss this train, because it's super, super hilarious and fun to see all of these three things.

Mark: 00:50:03  

It is super fun, and at times hilarious, is definitely one way to put it. But the types of information that we get in the value and the quality of the information that we get is unparalleled to anything that we would do in development, just by having it out there, having real people using it for some real economic value, we want to just wholeheartedly thank everybody and say it's been such a positive experience, because we're learning so much as We go through this

Pili: 00:50:34  

great thank you, Pacu and Mark. Don't know if we lost our master panelist. And I don't know if they wanted it anyway. Any other questions for mark on crosslink or comments 

Daira: 00:51:00  

I don't know whether I missed anything about the transport layer stuff. I mean, there's a big advantage in using something established, like quic, and it doesn't necessarily seem to me as though inventing a new Udp based transport layer is within the scope that at least I had originally envisaged for cross link. It's a big chunk of functionality that's a large amount of code to maintain. It's a complicated protocol, and sort of components of it, like the congestion control, are easy to get wrong and also complicated. Whereas if you use QUIC, you can just take some off the shelf libraries, they already support verse quantum. I know it may not be, it may not do everything you want, and it may be inefficient in a few ways, but you know that it works. You know that it shows the network reasonably well with other protocols, because QUIC is a substantial proportion of network traffic now. So I would have, I mean, if it were me, I would have just chosen quic. But it's obviously not me. I just think that what was shown on the slide doesn't necessarily convince me.

Zooko: 00;52:53  

It It's basically my call as chief product officer, and your arguments are good ones, and frankly, a big part of it is that the people we've hired like writing their own code and maintaining it more than using other people's code and maintaining that, which is not how I would do it,

Daira: 00:53:14  

we have that problem too.

Zooko: 00:53:14  

Did I say it was a problem? I didn't mean to say it was a problem. It's not how I would do it, but that's how they do it, and they're totally succeeding at it, so I'm letting them do it their way. So our current plan is you shield the transport pigeon for season one of the cross link incentivized feature net. They're called seasons; it's kind of like in a TV show, and then, more than likely, update shielded transport pigeon and use updated shielded transport pigeon for season two, and then review and reconsider that's the current plan.

Daira: 00:53:53  

Cool, yeah, I'm not saying you should necessarily take my advice on this?

Zooko: 00:54:03  

No, those are good points. But anyway, that's what, that's what we're going to be doing. So stay tuned.

Daira: 00:54:15  

Yeah, I guess the difference was that when we rolled our own crypto, we didn't really have a lot of choice, because, there were implementations of ZK proof systems, but they turned out to be unsound. Yeah, yeah.

Pili: 00:54:28  

Well, okay, any other questions or comments on crosslink?  Okay, gonna move on dynamic fees. Do we have any updates on that?

## Research & Implementation Updates, shielded labs- Dynamic fee

Mark: 00:54:46  

Yeah, I wish I had a whole prepared set of slides, and it was as exciting as the cross link update was, but no major updates. I've had some personal friction I was dealing with over the last few days here. I was planning on making a blog post, an announcement on some of the recent work that we done. So I will just say, stay tuned for now and follow all of our social accounts for people that are watching this or whatever, if you're interested in dynamic fees, because within the next day or two, we will have a lot of good news here.

Pili: 00:55:17  

Okay, look forward to that mark. Thank you. Any any questions or comments for mark on dynamic fees? 

Daira: 00:55:25  

looking forward to reading the spec when I don't have this banana service on my time.

Mark: 00:55:43  

Yeah, the AI apocalypse has taken up a lot of everybody's bandwidth.

Daira: 00:55:50  

Yeah, who knew that Skynet would look like this? It could get worse, you know, probably gets

Mark: 00:56:01  

It's a discrete system, so hopefully there's a finite number of things to be discovered, but we'll see.

Pili: 00:56:21  

Let's not write any more code and we'll be safe, right? Cool. Let's move on. 

 Any announcements for anyone? Raise your hand.

Pili: 00:56:46  

Okay? Well, if someone thinks of something, we can give more time open discussion. Natalie. Do you want to ask your question again? Or maybe we can now discuss Natalie's question from our dear

## open discussion

Natalie: 00:56:58  

Should I repeat my question?

Pili: 00:57:01  

I don't remember it, or I can read it out. Let me read it out from the screen

Natalie: 00:57:09  

it was about formal verification of rust code. Do you have any approaches? I'm sorry. My dog is making noises,

Daira: 00:57:21  

So there is a grant proposal to verify Halo 2 in Lean four. I enthusiastically support that proposal, and I like to take it further, really, and verify the whole protocol in need for I think it's feasible now. So only kind of six months ago, it didn't seem feasible. It seemed as though this would be a kind of cutting edge research project. And cutting edge research projects, The problem is that they don't keep up with development of the thing that they're trying to verify. But now that we have AI, it may actually be feasible. I'm not sure. We can certainly verify some things. We can verify the things that are most complicated or some of the things that we don't have confidence in. So the things that we don't have confidence in kind of split into two categories. There's things like Zcash D, where it's a bunch of crafty C ++  codes that we're never going to be able to verify. So we should get rid of it, and then the stuff that were the complexity is inherent, like, say, the some of the complicated optimizations we do on elliptic curve arithmetic and the sapling and orchard circuits it turns out, by the way, that AI is very good at reasoning about those. It can make mistakes, but kind of it's a good starting point. AI is very good at lean four. It wasn't until quite recently, but now that there are more people using Lean four, there's more of a code base for it to train on. So it seems as though I'm a lot more optimistic about formal verification than I was before.  So there have been two kind of things that have increased my optimism on formal verification. So one was the hacks at the I think it was hacks for 24 where there was a lot of enthusiasm about in four people were excited about buying it to new things. It seemed that kind of there was a critical mass coalescing around that, and now AI turns out to be very good at formalization, so I think there's actually a good chance that we'll get useful results from verification of parts of the Zcash project.

natalie:01:00:28  

But what would be the pipeline for rust code? I mean, translate code with hex to lean four and then verify it

Daira: 00:1:00:42  

So to me, that's not necessarily the best approach, you can use it for some things. I'm kind of more interested in verifying the design, because obviously you do need to verify the design, regardless of whether you verify the rust code, because those can be wrong independently. The rust code cannot implement the design, or the design can be wrong. So you kind of you've got to at least verify the design, which seems to be more feasible for the time being

Natalie: 01:01:21  

approach which Nadim is using, right? I mean, Nadim khobesin with his instrument.

Daiira: 01:01:21  

yea, So I know less about the kind of translating rust and formally verifying that.

Natalie: 01:01:38  

I'm sorry, you mentioned the elliptic curve I saw recently. The project. They did formal verification for the local elliptic curve. I don't know if you heard of this project. They translated rust code to lean I know if it's was from plumkey Free or they translated using this instrument, Aeneas, which is going to be united with, I'm not sure, yeah, yeah,

Daira: 01:02:12  

I heard of that project. Sorry. Is the background music causing a problem? Or can you not hear that? Yeah, the answer is, that might be very feasible. It's just not the thing that I'm focused on, so I don't know.

Pili: 01:02:38  

Thank you so much. Sorry, you wanted to say something and then pacu,

Conrado: 01:02:46  

yeah, just confirm that at Zcash Foundation, we are not currently working on formal verification, not in zebra. I think it's interesting, but we don't currently have the bandwidth to  work on that. But yeah, we welcome people working on that.

Pili: 00:1:03:03  

Thank you, conrado.  

Pacu: 01:03:09

I shared a link in the chat that  about a grant that is requesting some funds to fund a formal verification of Halo two, the grant is still open for feedback, so I encourage everyone here who has a say about that to go to that forum post and please provide feedback as community feedback, or as core team, if you are part of the core team, feedback, that's basically what I wanted to bring up. And if anyone wants to propose another grant about this, please go ahead and ping me if you need help understand or any questions about the grant application, I can help you with that.

Natalie: 01:04:26  

How can I ping you? Can you send me contact information?

Pacu: 01:04:30  

Oh, yes, yes, I'll send you a DM over zoom before this and this call ends right now.

Daira: 01:04:42  

Also, I'm happy to help anyone working on formal verification as far as I can.

Pili: 01:04:53  

Great. Thank you. daira Emma and pacu. zooko, you want to say something

Zooko: 01:04:58  

just that I put a comment in the text chat about shielded Labs  reasons for inventing shielded transport protocol instead of using quic  so check that out if you're interested.

Pili: 01:05:12  

Great. Thank you. zooko, any other discussion items or announcements.

Okay, I think I'm gonna call it for today. Thank you. Everyone

Next Meeting Scheduled: may 14th 2026. 21:00 UTC

