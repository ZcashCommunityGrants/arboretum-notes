# Arborist Call 133 Notes 

Meeting Date/Time: 01/10/2026 15:00 UTC

Meeting Duration: 45 minutes  

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)  

Research & Implementation Updates - [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zodl-core-libraries-and-zallet-cli-wallet) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-nsm) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shileded-labs-crosslink) 

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=gJA1brRxnf4&t=16s)

Moderator: Pili

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:01:29

I'll give it one more minute, and then we'll start, and hopefully people will trickle in after that. I'm just waiting for someone from Zodl to join. Can someone maybe give them a ping? Okay. Well, it's two minutes past, so let's start. So, just a reminder that this meeting is going to be recorded and uploaded to YouTube. So, if you do not feel comfortable with this, please turn off your camera or leave the session.

Okay, so welcome to today's arborist call on the first of October. The agenda for today's meeting is as follows. We will start off with some updates from the teams working on the core zcash stack, such as the Zcash Foundation, Zodl, and Zingo Labs, and then we will follow this up with some updates from teams working on research and implementation of new features, such as QEDIT, Shielded Labs, and Zodl. Finally, we will open the floor to participants to make any announcements or bring a discussion topic that may be of interest to the community. So, what is the Arborist call? The Arborist call is a biweekly call where Zcash protocol contributors meet up to discuss upgrade timelines and processes, protocol research and development efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. And the purpose of this call is to try to make Zcash protocol development accessible to interested parties, and to provide more transparency for everyone. Anyone can register to attend at zcasharborist.org, and if you want to become more involved and present, you can email us at  arboristcall@zfnd.org and request a presentation slot. Outside of the arborist call, you can participate in the zcash community in a number of ways, such as applying for one of the grant programs and taking part in community discussions in the Zcash R&D Discord and the Zcash Community Forum, and there are clickable links for all these at  zcasharborist.org. So with that being said, let's start with updates from the Zcash Foundation on Zebra, and I believe Arya will deliver those today.

## Zebra Update 

Arya: 00:03:56

Thank you, Pili. So in Zebra, since the last arborist call, we've shipped three releases 6.4.0, 6.4.1 and 6.4.2. Everyone should be on 6.4.2. The other two have been withdrawn, including the Docker images and binaries, because it fixes a remotely triggerable denial of service attack when processing malformed v6 transactions. It was reported by the Google OSS-Fuzz and independently rediscovered by v12security. 6.4.1.  fixed the regression, 6.4.0 where the sync code would stall permanently, actually that turned out to be an issue with network weather, and then 6.4.0 was a security release with a batch of other fixes. It also had changes that matter for miners, which is the getblocktemplate is served now from a pre-computed template, so it's going to be much much faster to call the getblocktemplate method from Zebra. Now shielded proof and signature verifications are cached, so that submitblock will validate more quickly in typical cases. And mempool transactions are not verified again when they're mined.  ZIP 317 marginal fee is down to 1,000 zatoshis per logical action, and the weight ratio cap has been moved from 4 to 10, as has been specified. Equal work chain ties now go to the first received block, which is going to solve a bunch of orphaned block issues, as the protocol specs says, and as zcashd  does. There's an experimental lightwalletd compatible gRPC server built into Zebra now enabled with the RPC lightwalletd listen address config field. The end of support was shortened in 6.4.0 from 15 weeks to 12, and 6.4.x nodes now halt on November 2nd. This is deliberate and ahead of NU7, so that the end of support still halts before  NU7 which is tentatively scheduled for November 5 th, we know that shortening the window is not ideal. We're not intending to do this like regularly, but  this one just happened. And then known issues. There are still some you know, the tip dependent on network weather. So far, it looks like they've gotten better, but it could happen again, and then the rest we've just mostly been working on NU7. There's a stack of PRs that just deploy NU7, including the ZIP 2003 V4 transaction rejection for future NUs, ZIP 218 25-second block spacing and related changes, and the NSM halving-preserving issuance with the 60% fee removal, it also bumps the state database to v29, a major version buff. It's going to reuse the existing cache with no resync, and we added end-to-end verifier tests for NU7 with real Ironwood proofs. All that's left for NU7 now is the consensus branch IDs and network protocol versions, which are going to be bumped in the release PR for the next zebra.

Pili: 00:06:39

Thank you, Arya. Cool. I think Nate has a question.

Nate: 00:06:52

Oh yes. Hello. Is my audio working? Oh, I was wondering what was the motivation or need to change the expiry height or the wind down height of the release.

Arya: 00:07:06

So previous ,usually Zebra expires every 16 weeks, but we wanted to do a network upgrade sooner than that, and we decided that after the previous version for Zebra was released. Also, I forgot to mention that getblocktemplate RPC now supports Probosci v3.

Nate: 00:07:25

Okay, thanks.

Pili: 00:07:30

Any other questions for Arya? Guess not. Let's move on. Zodl, who do I have

today? Pacu, is that you?

## Core stack Updates zodl Core libraries and Zallet (cli wallet)

Pacu: 00:07:48

Yes that's me. Hello, everyone. Yes, these last two weeks have been pretty intense. I was away a little bit, so I hope that I don't miss anything. So basically, what the team has been working on is mostly NU7 readiness. You know, preparing crates and for the release. You know, release crates for Orchard  and librustzcash crates. We have a lot of PRs being merged right now, and we intend to cut the crate versions  in preparation for NU7. Also, yesterday in the R&D meeting, people from from Zodl, zf, Valar Group, Tachyon. and I didn't recall who, if there was anyone from Shielded Labs, and we defined the testnet activation height for a NU7 and the different teams, mostly Dev, Strad and also Daira emma and Marek, are working on stabilizing the testnet a little bit because we have been noticing that the testnet is like running really fast, like I don't know, 12.5 block average, like seconds block average is really going like running fast, was discussing some some problems, mostly on trying to plan when the the NU 7 activation will hit on testnet. So, thank you, Mark, for always like being the who has the pulse of testnet, and then continue with the Zodl updates. We also been working on upstreaming some of the Zakura improvements, performance improvements into the librustzcash crates and also adding some formal verification work to it, which which is great, and we are trying to put together some metrics and benchmarks to then give a proper update on  what things are improving and how much and all that, and you will be seeing some of those improvements in the next releases of the librustzcash crates,  which is awesome. What else? And then we have been also working a little bit on the PCZT crate because we have been working on integrating ledger with the wallet team, so there was a little bit of a cross-team work there, and yeah, I think that's pretty much it. And Zallet, we've also been working a little bit on some multi-sig work  which is being put forward by by Greg, and also working through some CI issues  and some small progress because most of the of the team is actually working in  NU7, but then when we update the crates on Zallet, we will have to cut out a release of that too. But we don't know when we're going to do it. But it's sooner than later.

Pili: 00:12:14

Great, thank you, Pacu. Any questions for Pacu? Okay, I guess let's move on. Do we have anyone from Zingo Labs today? I don't see anyone, but please raise your hand, and I'll promote you to panelist if so. Okay, I think we can move on. Let's move on to research and implementation updates from QEDIT. I also don't see anyone from QEDIT, so let's move on. Shielded Labs and the Network Sustainability Mechanism, who is giving an update on that today?

## Research & Implementation Updates- shielded labs Nsm

Jason: 00:13:16

I can do it. Okay, so ZIPs 235 and 237 were merged into Zebra and Zakura for NU7. ZIP 233 will be included in NU8 since it requires a transaction format change, other than that, there are no updates. I will note this is Shielded Labs' first mainnet deployment, so it's a major milestone for our team, and I'm super excited about it. Thank you to everybody who supported the NSM and worked with us to make it happen. Yeah, congratulations. Thanks, and I think we can remove this from the agenda for future arborist calls.

Pili: 00:13:57

Okay, and congratulations, Jason . Great. So, any questions on this? Guess not. Let's move on. Crosslink and Trailing Finality Layer. Any updates on that?

## Research & Implementation Updates- shileded labs crosslink 

Nate: 00:14:21

Yes. Hello, Nate here. Okay, so I'll try to make this more brief. We're doing a workshop. You should all come. It's right after this call in a couple of hours. Let me check my calendar. Yeah, I think it's in just under three hours, and it's really awesome because it's the first. So our plan with this workshop is we have a FeatureNet, which is what we call this persistent testnet. So it's always running. People can show up and join and experiment, see what Crosslink is like,, we distribute mainnet real ZEC rewards for participation. If you're into that kind of thing, and some of those rewards are based on the actual ledger of, it's like you get a point every time you receive the the CTAs the Crosslink testnet coins from issuance, so it's kind of focused on issuance. But the idea was we wanted to incentivize those rewards by matching them to the actual incentives for the mainnet protocol, but then there's also rewards that are just discretionary that we hand out for like just people showing up and asking good questions, giving good feedback, participating, and we're getting lots of good participation, which is awesome. People are building infrastructure since the last workshop. We so we have a feature that we're calling user activated slashing feature. So its acronym is UASF, and it is it's like a tailored implementation for a specific kind of hard fork that is totally permissionless. So it only happens like any other hard fork if a critical mass of users accept it, but that can be used to slash bonds, which is sort of like an enforcement mechanism to make sure that stakers and finalizers are behaving well. And it's sort of you know like what do you call it? It's like a hammer. It's like the more extreme end of the enforcement mechanism. But just like any hard fork in cryptocurrency, that sort of backstops everything in a game theoretic way. So because people know that's there, like for a similar example, is because miners know if they really, really misbehaved, the community might just switch the proof of work algorithm and brick their hardware. So even though that's unlikely, it's still like a backstop that informs choices people might make. So that has early on in the network, the BFT network halted because some of the early participants  joined and then left, but they were finalizers, so the BFT couldn't make progress, and that feature was used previously successfully by the users to like slash the missing finalizers who had been absent for a long time, like weeks  and that worked. In this new era, they used it again. We haven't made code changes to it, and the interesting thing is they tried to use it, and in order to work correctly, everyone needs to agree, or a critical mass needs to agree and coordinate on the forking parameters. And even though it seemed like most of the people active in the signal group wanted to do that, they couldn't coordinate well enough, and so their plan didn't go through. So, example: the first case, there was a successful fork. This new case they couldn't coordinate, and it failed. So now we have real examples of each case, and then they figured out the like. I think the reason they couldn't coordinate wasn't because there wasn't a critical mass of support. It's just that you need to be precise in coordinating, and so they figured that out, and learned better how the tool actually behaves, and adjusted their behavior, and then did a third attempt, and that one did succeed at doing this kind of slashing behavior. So I think this is super cool because we  as developers, we're sort of developing the software and the protocol design, but the actual user group is like developing the institutional knowledge to figure out how this thing works and decide how to use it, and that's just like one piece. Another piece is we have so early on in the FeatureNet that we had a lot of reliability and stability issues, and part of the reason is we just had kind of one line of development for that network.

And so what we've changed since then is we've started a new thing called the NightlyNet, which frequently resets, you know we have frequent builds and we do interactive live testing there. But it is public and you can show up. It's just very unstable. So if you want to try out the latest software and play around there, you can participate in that, and that has allowed us to sort of unlock more rapid development and work on many breaking changes. And so, now with that in place, we have implemented the remaining outstanding protocol widgets for the overall design, and those are like backwards incompatible changes to the existing FeatureNet consensus protocol. So, at the workshop today, we're going to be launching a new version of the FeatureNet, basically a new FeatureNet, and this has a code implementation of a protocol that has all of the consensus protocols for the crosslink design in place. It has widgets for all of those, so it's feature complete. But  we still need to refine it and do a lot of design review and so forth. But it is kind of fun to have the full feature complete thing working. So the two new big consensus features are there's activation logic. So the network that is launching today,  is just a pure proof of work mode like mainnet, and now there's an activation process where there's multiple phases where people can begin staking before the BFT or finality kicks in to build up a roster, and then the BFT launches, and then the other feature is, there are finalizer commission fees. So previously on the current FeatureNet, only stakers were receiving rewards from the issuance, and stakers are anyone with like a smartphone, ideally on mainnet, who just say which finalizers they want to support by staking their ZEC as kind of an endorsement that that finalizer should do a good job, right? But the finalizers weren't receiving any direct compensation unless they were also staking themselves. But now, if you run a finalizer, you basically get paid for that with a portion of the issuance. So everyone should come to that. It's super exciting. Yeah, yeah. So starting today, we'll have a FeatureNet that is feature complete. It it won't be stable. We're likely to do network restarts in the future because we'll still be adjusting and refining the design.  basically what we have is like a full working a full working implementation and design, but it needs a lot of design review and scrutiny before we feel comfortable advocating that it should be in a zcash network upgrade, but we're headed that direction. So come if you're interested. Yeah, I think that's it. Is there? I think the announcement for where the workshop is on the forum. That's it for me.

Pili: 00:24:05

Great, thank you, Nate, and good luck with the workshop this evening. Well, later on. Great questions. Any questions for Nate? Okay, I'm going to move on. Dynamic fees is that Mark today or someone else?

## Research & Implementation Updates- shielded labs dynamic fee

Nate: 00:24:29

I don't hear you, Mark. You look muted.

Mark: 00:24:39

Hello, can you hear me? All right, awesome. Yeah, so yeah, if you count parameter changes as mainnet deployment type things, that will be Shielded Labs' second contribution to mainnet, which is the reduction of the marginal fee to 1,000 zatoshis and the raising of the weight ratio cap to 10. I received a message from Dave at Valar Group yesterday, signaling his intention to put the marginal fee at 400 in Zakura and start telling wallets to upgrade on october 12. Which, based on my rationale, I think I could support. If you look at the rationale in the zip, it's based on the fiat price of how much it would cost to do another sandblasting attack. And since the price action has been very high, I don't know if it's going to sustain that height. But the rationale in the zip still holds. So while his proposal is ambitious. I think it would be okay. He also seems to have influence over the Visor wallet, which is a big wallet. So if they're going to upgrade on October 12 and disregard the guidance in the zip, then we might need to scramble and get the other wallets to shift as well. Sorry about the noise. So consider that your heads up, and we'll do. We have inroads to other wallets, so we'll do what we can to manage that. I understand Zodl updates on a biweekly basis, so that may conflict with that. But like I said, I'll do what I can to liaise and hopefully get us through this rushed transition,

Pacu: 00:26:25

What was the date?

Mark: 00:26:26

They're proposing October 12. The transaction should not fail so long as there's a light wallet D recipient that's updated. At least one miner is not going to reject the transactions, and Dave's claim is that if a sufficient percentage of the P2P network is updated, then the relay policy should still work. I don't know. So I'm sure there'll be more discussion about that sooner rather than later.  I'm easy to find. So let me know if you have questions or if I can help in any way.

Pacu: 00:27:12

message from Lifeline Working Group. A good occasion to spin it back up. We have been having some scheduling issues lately, so yeah, good. I get motivated to start these calls again. I don't know if you're. Yeah,

Mark: 00:27:32

yeah, exactly. And again, I've I've expressed my desire to have representatives from Valar and Tachyon on these calls, but I can't force them to show up, so

Pacu: 00:27:41

There are a lot of calls on Thursday, so we might have to pick another date because I don't know. I have like five calls today.

Mark: 00:27:48

Okay, cool.  I stand corrected. Connor, Connor's here.

Pili: 00:27:55

Yeah, I just promoted him to panelist

Mark: 00:27:57

Okay, cool. Um, yeah, that's all from me on dynamic fees.

Pili: 00:28:03

Thank you, Mark. Great update.

Great. Does anyone have any questions for Mark? Okay, let's move on. Formalization work from Zodl, Pacu. Do you have any updates on this?

Pacu: 00:28:35

I do not. This one usually are from dairaEmma. 

Pili: 00:28:41

No worries. Let's move on to announcements. Then, does anyone have any announcements? Please raise your hand. There's not any discussion items. Same again. Please raise your hand. Nate, go ahead.

## Open Discussion 

Nate: 00:29:15

Yeah. So I asked the question about zebra expiry time, and this is you know just a lark or a whim. But I'm going to be on a panel at Zcon about how Zcash can ship faster and while still being safe. And so one thing I wondered is if it sounded like the zebra team's plan was to maintain  the current policy, so has this release been an exception. And I just started pondering. I just started pondering this, so I have no idea if it's a good or bad or crazy idea. But I was curious to explore changing the policy to shorten those times. If that would be helpful or not for improving the velocity of network upgrades, and now that I'm saying this out loud, I'm realizing what we should be doing is figuring out where the bottlenecks are, and that is probably not a bottleneck. But I guess since it's discussion, my my real thought is: Does anyone have things they think I should bring into that panel, like any thoughts, ideas, or concerns about how Zcash can ship faster, and I think that might mean improving  the protocol faster. So kind of open-ended. Maybe I'll hand it to you, Pili, or are

Pili: 00:31:02

I'll do one quick. Yeah, I'll do it. I wanna have a quick comment on the end of support height or the end of support. I mean, we do want to shorten that a little bit. I do think, yeah, on shipping faster whilst maintaining quality, I have some thoughts, but I don't-they're not well formed enough  to share here. Also, let pacu say something since he raised hand, and then Arya, I guess.

Arya: 00:31:35

Personally, I'd be interested in hearing about how we can ship faster while maintaining the strong coordination that we had.

Nate: 00:31:44

Yeah, yeah, I'm interested in brainstorming all manner of ways  that we could figure that out, Pili. I was going to say, not having well-formed thoughts didn't stop me from raising my hand. One thing I've always wondered about, and  I think some of the engineers I worked with at ecc. I don't want to put words in their mouth, but I'm pretty sure that for, let me put it this way, I have always liked the idea  that maybe what we could do for network upgrades is have somewhat independent efforts to develop features, and then whenever the features are ready, they get shipped, which is a little bit different than we have independent development of features, and we all kind of agree. Okay, for the next network upgrade, we're going to have this, that, and this feature. Even though they're not ready yet, we're planning on that. My thinking there is, then we might move to more frequent upgrades as soon as things are ready, and then  the other side of the the trade offs that I heard around NU7 were that when you have multiple different features, but they're interrelated, or they, or any of them disrupt the ecosystem to some degree. It's better to integrate them together and just do like one disruption, and so that seems like one kind of trade off. I'm still inclined to do more disruptions and just ship things when they're ready. So that's like the main sort of trade off I've previously discussed about this. I'm curious if people have thoughts about that, or if it stimulates considerations of other kinds of trade-offs, or anything else like the process of how we make decisions or things of that nature.

Pili: 00:34:36

I have some thoughts. I'll let Pacu go first, and then I'll. I don't know that I can raise my hand, being the co-host, but I'll go after Pacu.

Pacu: 00:34:43

Okay, thank you, Pili. Yeah, these are my views. I think that zcash  has achieved a really good thing, which is we call folks for upgrades, and we do them, and they are usually non-traumatic, and just partners  and miners and exchanges. They just say, "Hey, when's the next network upgrade, or is it gonna break us a lot, a little bit? What is it about? How can we get ready? So this is a huge achievement. Like if you go to our cousins on the other side of the street,  stuff is chaotic there. So that's great, and that's something we can completely get behind and  make the tool to ship faster, which I think that nobody can actually sort of oppose.   What we need to think about is like speed is not a value on its own. Like I've said this in many conversations, so I might be repeating myself on some. So, you know, it's not only how fast you can go somewhere; it's if you arrive in one piece or not. If you have destroyed stuff in you know, in that trajectory. So I think that it's important to see if you know that speed has value if there's other contextual conditions that are met. Speed also accompanies, you know, safety and quality. So, as you know, as long as everyone is on that same page of trying to improve processes and leverage the current technologies to achieve that, I think  that's okay. But just focusing  on being fast on its own, I think that doesn't bring much value. And then also, zcash has a huge reputation on how it does things,  and just maybe risking sacrificing that just for the sake of speed is not a great trade-off. But I agree that it would be great if we could continue this exercise of updating the network and making it better and having a lean process. That it also helped us respond as we did, for example, when we had to deal with the orchard mitigation, like we had a process in place, it was kind of like rusty and some sort of manual, but we had all the gears there. So I think it's worth the discussion, but with  some considerations and trying to stick to our first principles and Zcash core values are.

Pili: 00:38:23

Thank you, Pacu. So a couple of things. Kind of, if I put my old project manager hat back on, there's this whole thing of, of course, we can go faster, but you know, then everything we do needs to be smaller, right? We need to make smaller changes that are better defined, and then we also need to look at well, what is making us go slower than we'd like? Right, is it because, is there a cost to all the coordination,  or is the coordination actually not slowing us down, but just wanting to have the time to make sure we think through everything properly, and we understand all of the implications of the changes that we're making, because you know it's not just one piece. It's not just a node doing a thing by itself, right? It's many different nodes behaving together. There's network weather. There's a lot of unintended consequences to the changes that we make, and I think sometimes it's important to take the time to understand what the consequences might be. And again, that comes from well-designed changes, smaller scope, and more time for testing. So that's kind of what I'm thinking of. Yes, we can go fast, but  it has to be smaller, more incremental changes in that case, because I don't necessarily think that coordination is our limiting factor right now, and I think if we're trying to do too many things at the same time. That's when we start dropping balls and making mistakes and sacrificing quality. In my view, anyway. Yeah, Nate, you wanted to say something else.

Nate: 00:40:15

Yeah, if it's okay. I yeah, I really appreciate  hearing from each of you to temper the desire for speed, like in and of itself, like I liked Pacus metaphor. We don't want the car to fall apart. Or I was also thinking of the metaphor: we don't want to go fast in the wrong direction. So that's helpful, and it's kind of funny because  it sort of challenges the framing of the panel topic, which I like.  and I also wondered. I was thinking about the ecosystem and what you mentioned, Pacu. That we're in a really good situation because we're able to coordinate well across the ecosystem of users and integrations  where Zcash isn't necessarily their main thing, so they have limited attention. But we've still done a good job of keeping the broader ecosystem plugged in. I'm wondering, is there anything on that front that people know or want to improve, or ideas they have for improving with ecosystem coordination. Yeah, one thought I have there is that if the Zcash market cap keeps getting larger, then more ecosystem partners that are like multi-coin or general crypto space are likely to pay more attention. So maybe we can leverage that a bit. So I'm sort of just brainstorming about  getting more proactive about making sure partners are on the test net and have verified in their infrastructure that it works on the test net before upgrades or things like that. Anyway, I'm just rambling a little bit, but it's a topic I'm interested in, and I'm also kind of trying to crib for the panel.

Pili: 00:42:40

Yes, thank you,Nate. Pacu, you want to respond?

Pacu: 00:42:45

Yeah, I think that's a really interesting thought, and also I think a really high quality problem that we want to sort of have is that at some point,  zcash is so widespread worldwide that it's impossible to keep track of. , some of it is already happening. For example, at some point I don't know, a few months ago, people asked me, Do you know who this project is? I don't know. It's completely. I had no idea it was people doing that, and  we actually want to. That's a feature, right? It's a feature that we want to see. Like, so I guess that we also need to prepare for it, we want zcash to be adopted worldwide, and this means that these network upgrades need to happen in a way that we can monitor them, but not necessarily like that. It would  be like, so many people will be involved in updating their nodes and  that we will have to start creating like more an automated process of how updates are deployed  and they get adopted because for zcash to be you know a global movement as wanted, to be a global internet money unstoppable internet money  we needed to be everywhere so that's a really interesting conversation and like you know when, where do you want to be in some years? Kind of question, but yeah, it's a really nice conversation to have. It's like how do we move from the process we have today to  some bigger scale that we want to achieve in the next few   years and whatever the time is. I

Pili: 00:45:03

think that's also one of the evening facilitation group topics. Thank you, Pacu. Any other thoughts on this from anyone? Okay, I might wrap it up, and then thank you everyone for participating and for the great discussion. The next hour's call will be on October the 15th at 15 UTC. Hope to see you all then. Bye for now.

Next Meeting Scheduled: 15th october 2026

