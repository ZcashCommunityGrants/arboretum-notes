# Arborist Call 134 Notes 

Meeting Date/Time: 15th october 2026. 15:00 UTC

Meeting Duration: 40 minutes 

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Research & Implementation Updates - [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zodl-core-libraries-and-zallet-cli-wallet) / [zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit--zcash-shielded-assets) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-lab--crosslink) / [Epoch](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-update-shielded-labs-epoch)

Open [Announcements](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=3FKbc3N41Zw&list=PL40dyJ0UYTLJqD_3PE9qiJTxse-iHnn1G)

Moderator: Alex

Notes: chidi (X) @ZcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:04:38 

So this is the Zcash Arborist call for October 15th, 2026. Our agenda: core stack updates, Zcash Foundation with Zebra, Zodl with core libraries and Zallet CLI wallet, Zingo Labs with Zaino, and then research and implementation updates: QEDIT with ZSAs, Shielded Labs with Crosslink trailing finality layer, Shielded Labs with dynamic fees, Zodl with formalization, and then this week we've added Shielded Labs with EPOCH, and then open announcements and discussion. What are Arborist calls? Biweekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process, protocol R and D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. Purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about zcash protocol development can register at zcasharborist.org. If you want to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Other ways to get involved: Zcash Community Grants, ZCG, Zcash R&D Discord, Zcash Community Forum, and these links are listed on zcasharborist.org. So let's get started with core stack updates. Zcash Foundation with Zebra.

## Zebra Update 

Marek: 00:06:02 

So we have a bunch of optimizations for mining pools that we would like to roll out before NU7 activates, and that's pretty much it For now, yeah, the activation height is expected to be set on next Tuesday, and yep, that's it.

Alex: 00:06:39 

Any questions for Marek. Great, thanks, Marek. Next up, Zodl with Core Libraries and Zallet.

## Core stack Updates zodl Core libraries and Zallet (cli wallet) 

Pacu: 00:06:52 

Hi, hello everyone. So for the last two weeks, we've been working on NU7 pre-releases for the librustzcash crates, going from the pre Zebra to pre two, and also worked on zcashd and other parts of the of the stack to get everything up to speed with the new network upgrade. Also, a lot of zip reviews, updated ZIP 2003, for NU6.3 and Nu 6.7, specified network sustainability mechanism seeds emerged ZIP 2009, and also we've been working on cryptography performance. Released the pasta_curves crate 0.6.1 with substantial performance improvements with assembly field, method on the architectures AArch64 and x86-64. What else? We also had a like a brief conversation with the Zingo folks, and for now we Dropped the Zaino backend from Zallet, and we we we basically asked them if they could update some stuff and then Eli from Zingo suggested that they were like changing a lot of things lately, and that it would be fine if we just like drop it for now on that that backend and then we add it later, and so we did. We also worked on a bunch of documentation that we were missing. We're preparing a release of Zallet for NU7 testnet and then subsequently the mainet release for NU7. When we define the block, the activation block height, we also released lightwalletd 055, which fixes a bunch of things and backend Failures, and for example, it has a new metric that lets operators know when there's a stale tip. Also, the Docker images drop from almost two gigabytes to just barely to under 200 megabytes [transcript unclear: source says “2200 megabytes,” but describes approximately a 90% reduction], which is like a 90% drop of the image size, which is really nice. We worked on our signing and polished the PCZT Ledger crates in line, which we use in the Zodl Ledger feature, and now as current priorities, we are still working on bringing NU7 to zallet. That's what I said already, and what else? Anything, and also we are working on the grant disbursement and we have scheduled that I think for October 16, which is tomorrow, if I'm not mistaken, and I think that's pretty much what we're doing that. It's important for this call.

Alex: 00:10:46 

Thanks, Pacu. Any questions for Pacu? Great. Zingo Labs with Zaino. Do we have a Zaino representative here today? Doesn't look like it, so we can come back to Zaino. QEDIT with Zcash Shielded Assets.

## Research & Implementation Updates Qedit- Zcash shielded Assets

Vivek: 00:11:16 

Hi, that's me today. Can I share my screen? I'm giving the update today. If you've been following these updates over the last few weeks, you'll know that we've been working on bringing the Zcash Shielded Assets work up to speed with all the latest network upgrades that happened due to the security incident. So we are happy to share now that we have completed this catch up to NU6.3. So the main changes that we made for Orchard ZSA is like in the Orchard repository. So over there, we have actually split this work into two parts. So one is this upstream PR. It's PR 506 to the upstream Orchard repository, and that only does the circuit changes, and it keeps it basically separate. And like you can't actually build transactions with this new circuit in this original PR, like this first PR, and we've done this so that it's easier for the developers to review. There's only like 37 files changed, which are all circuit related for the most part. So yeah this has been out for a while, it's being reviewed, I think, by the code developers. So we have the rest of the work also done in, This is like an internal PR of ours to see the difference. There's clearly like more files changed, which is like all the work that's there, including changing the builder and everything else that's outside the circuit, so we have these two pull requests that are there, we are also in a similar situation when it comes to librustzcash and Zebra. We are pretty much on top of NU6.3 in both of those cases as well. So we are kind of ready across the stack, so we are now going to be moving our work onto dedicated branches inside the Zcash repositories instead of it being on QEDIT repositories, so that it's more publicly visible and accessible. So this like handover basically to the core teams is underway. We are discussing with the core teams, and yeah, we are here. We're really excited that we've delivered this high quality externally audited result for what's a pretty significant extension to Zcash. So moving to these branches, like dedicated branches on the Zcash repositories, ensures that our work will remain well preserved, and it's it's also up to date as I said with NU6.3, so it can be prepared for activation and deployment whenever the community wants and chooses to do that. the grant that we have for this would likely need some adjustment for the work because there was more work to catch up to the two network NU6.2 and 6.3 network upgrades that happened in quick succession, and yeah,we'll see how that goes. And we are excited that we are going to be moving the stuff onto the Zcash like upstream repositories soon. So yeah, that's my update.

Alex: 00:14:44 

Any questions for QEDIT and Vivek? Great, thank you. Next up, Shielded Labs with Crosslink Trailing Finality Layer.

## Research & Implementation Updates shielded lab- crosslink

Philip: 00:15:04 

Awesome. Hey everybody, I'm Phillip. I'm on the Crosslink team. So the first ever restart of our featurenet happened on October 1, soon after the last arborist call, went off without a hitch. Everything went smoothly. The new network added two main features to flesh out the full  more of a feature complete design. The feature; those two main things being BFT bootstrap and 10% finalizer commissions. The BFT bootstrap has happened. It succeeded. We successfully bootstrapped the BFT, and it activated, and it's finalizing. So that's a nice milestone. We also added the 10% finalizer commissions. That's paying out to only the active roster of finalizers. For this feature net, it's only the top 12 finalizers that are active at any one time, but that' 12 is just a testing number for this featurenet. It's not implied to be a limitation at all. We're also now operating with a three day staking interval instead of the very short one we had before. So now each staking day is 24 hours of real time, which at our target block time of 25 seconds, that's about like 3000 blocks per day. We also completed our second round of payouts for the incentivized testnet. Redistributed 25 ZEC. It's about 20 ZEC to participants who were mining and staking based on the CTaS they earned, and the remaining five ZEC were to community contributors as discretionary rewards for recognizing their impressive work on tooling and testing and community support. On the engineering side, we've been working closely with the community to identify issues and fix issues. We released version 15 of the Node software very recently. We are rolling out a small network upgrade with this version just for three main changes. The first one is that there was an edge case in the BFT consensus implementation where multiple proposals in the same round could cause finalizers to get stuck. We corrected some mistakes in the finalizer commission issuance model. The previous implementation wasn't behaving as intended and had some bad incentives, so we've now brought that in line with the intended design. And last one is we're we're enforcing powers of 10 for the bond amounts in the transactions. It was only enforced in the wallets, so now it's happening on consensus, and so that's why it's a network upgrade, and it'll activate on about six hours from now on like block 55,000. So yeah, overall we've had a very successful network restart. We've been really happy and impressed with the response from the community that we've had. There's a lot, a lot of new faces, a lot of old faces, yeah. There's a lot of activity and there's a lot of enthusiasm, and it's the network is a much more fleshed out design now, and so yeah, we're we're happy with progress. So that's it for that update.

Alex: 00:18:37 

Any questions for Shielded Labs on CrossLink? Great, thanks, Philip. And now, Shielded Labs with dynamic fees. Hey there.

## Research & Implementation Updates shielded labs - dynamic fee

Mark: 00:18:55 

We are intending to go full steam ahead at this point with both a detailed zip draft for our fee estimator mechanism, as well as suggesting all the wallets that we have contact with in our efforts to help them with NU7 transition to implement both the getStandardFees RPC as well as the priority lane for dynamic fees to pay higher fee for several reasons. We already have this implemented in a couple wallets, but just a shout out to the Zodl team, obviously, and the Zingo Labs team that we will be in contact. Zodl, I believe Andrea owes me a signal message, so please remind her when you have a chance. Stay tuned. I believe the zip will be coming sometime next week. That's awesome. So

Daira: 00:19:57 

I heard that Zakura was using a different value for the marginal fee than was originally specified in the zip. I've been at this workshop at the Cambridge formal verification workshop, so I haven't had chance to keep up. What's the current situation there?

Mark: 00:20:21 

First of all, clarification: I can't really speak for Zakura.

Daira: 00:20:26 

I know. Okay, this is a question of the community in general, and you raised the issue. 

Mark: 00:20:33 

So I know that Zakura is, I believe, has already gone ahead with the 400 Zat marginal fee. I believe Arya has updated the zip or made a pull request to update the zip to reflect that value. I don't know what the Zebra team intends to do there, but I know that the getStandardFees RPC mitigates this somewhat because the wallets can just query that, and they don't have to worry about these constants, and the wallets don't need to worry about having to pay attention to what the nodes are doing, as shenanigan based as they may be.

Daira: 00:21:10 

Is that true, though? Because what a light wallet server will report is dependent on what its backing node reports. So, if its backing node reports a higher fee than some other nodes, then it will overpay, and conversely, if it will underpay. So, there's still an issue if nodes choose different values.

Mark:00:21:47 

I agree. It's not ideal. I don't think that you know overpaying is not something that will evict a transaction from the mempool or anything like that. It's inconvenient.

Daira: 00:22:01 

Overpaying is a temporary issue with kind of, users overpay, which they may not like, but that's okay. Well, it may or may not be okay, but it's not an interoperability problem. Underpaying is an interoperability problem, and obviously, if the fees go down at some point, then it's possible for them to go up at another point. So in denomination, ZEC, yeah. So zebra, what what are zebra's plans for how to handle this? And do we have any representatives, Zakura?

Alex: 00:22:45 

There are no Zakura representatives here today from the Zebra team. Can somebody respond to Daira's question?

Marek: 00:23:01 

We we haven't made any decision yet.

Daira: 00:23:04 

Marek, I can't hear you. Your volume is very low

Daira: 00:23:10 

We haven't made any decision about this yet.

Daira: 00:23:17 

Okay. Yeah, that's clear. It's disappointing that we don't have anyone from Zakura when they've proposed this non-Zip compliant thing.

Alex: 00:23:33 

Any other questions or discussion on dynamic fees with Shielded Labs? Thank you, Mark. Appreciate it.

Daira: 00:23:46 

And and sorry for derailing the discussion on dynamic fees to talk about a change in static fees.

Mark :00:23:54 

That's okay, Daira. We'll have plenty to talk about in the coming calls.

Daira: 00:23:57 

Okay. Yeah, I'm  here to raise the awkward questions tonight,

Alex: 00:24:04 

and it's your turn, Daira Zodl with formalization.

Mark: 00:24:09 

Oh oh wait, before we do this, could we add Shielded Labs to the formalization because we're doing some Quint modeling on our zero indexer tool, but please continue.

## Research and implementation updates zodl- formalization

Daira: 00:24:24 

Yes. So as I said, I'm at the Cambridge Formal Verification Workshop, which is fantastic. Thank you to Justin Drake here for organizing. He can hear me. So yeah, the enthusiasm and the kind of excitement at how much we can formalize now is quite palpable. People are kind of eager to formalize all of the things which I'm excited about, and also they have an appropriate, what I consider an appropriate degree of skepticism about whether the things they are formalizing are the things that they actually care about. So that issue has been raised many times at the workshop with many interesting answers. In terms of kind of what I've done and what Zodl have done recently, so Pasta Curves has formally verified arithmetic for so the AArch64 and x86-64 Montgomery multiplication, AArch64 inversion, portable inversion, using a state of the art quantum, state of the art constant time algorithm, Bernstein–Yang's diff step algorithm. So we are able to formalize quite complicated things in a reasonable time, so in my view, it was actually at least as easy to formalize the assembly code, which came from Zakura originally, as it would have been to review it to our standards of correctness and assurance. So yeah, formalization is here. Oh, and the other thing is, so I just did a lightning talk where I presented. There's an issue when you using Lean to express security reductions: if the function used to represent the reduction takes some bounded time, then you haven't really proven anything. So I presented a solution to that using an assert-efficient macro, or can-be-efficient keyword, and yeah, which asserts efficiency as well as computability, and just extends the language with that. And because Lean's meta programming facilities are very expressive. It's able to do really well at automatically proving that functions are efficient in the sense required for security reductions. I'll post in the chat the URL for those for my slides.

Alex: 00:27:45 

Great. Before we ask for questions, Mark, did you want to add anything from the Shielded Labs side?

Mark: 00:27:51 

Not today. Just that we're doing it. I think we're going to have a blog post out and more to report on it pretty soon. Shoeb, a newcomer at Shielded Labs will be spearheading that.

Alex: 00:28:05 

Great. So, any questions for Daira on formalization? Great. Next up, new new edition: Shielded Labs with EPOCH

Mark: 00:28:22 

Sorry, Alex. It looks like Ulrich has a question. Oh yeah, actually,

Ulrich: 00:28:26 

I can take over right after. What is? Can you hear me? So, what is the target of formal verification, or also the cryptographic protocols, or just circuits. So, could you just give me quick overview here?

Daira: 00:28:47 

So we had the ironwood formalization, which targeted the circuit written in clean. So that's the Orchard and Ironwood action circuit. Halo2 as a knowledge sound proof system. Halo2 is a zero knowledge proof system that hasn't been released yet. The analysis of that, but Tal did excellent work on that. That I've been adapting to work with both the Zakura and upstream provers, and the high-level security properties. So mainly balance integrity and future target is spendability. So you can actually spend your funds rather than just a global property of balance. And then we have also, as I said, been formalizing the arithmetic in pasta_curves. So yeah, we're trying to make things kind of meet up. There's a lot of, there's a long way to go to make everything meet up, but it's at least possible, and I think it's actually feasible with AI. Yeah. Let's see. Anything else? Oh yes. So as well, in terms of research, not specifically formalization, I've been looking at the the estimated performance of Akita, which is a lattice-based post-quantum polynomial commitment scheme with Ragu, kind of comparing the performance so prover performance verifier performance proof sizes of the discrete log-based PCS and Akita, and also hash-based code-based PCSs. So the PCS is kind of the cryptographic back end that you add on to the interactive argument. So, yeah, and Akita. I was talking to two of the Akita designers, kind of about potentially using it in zcash,and what I've been kind of working out with Mythos, which I now have access to, that is actually just well mostly a drop-in for and the PCS for ragu. So it would be possible to deploy. Well, either way, either just deploying Ragu with Akita or deploying it with a pre-quantum proof system first and then switching to Akit. That's a beautiful cat. All cats are beautiful.

Ulrich: 00:32:00 

Oh, thanks. That's that's Bowe by the way. I have a question in terms of your estimates, Dairaama. So, do you have anything? Let's say, do you have first estimates? Is it really like you can take Akita, replace it like one to one over prime scheme. Yes,

Daira: 00:32:23 

you really can. It's deployable, I think, as a replacement proof system. So my estimates for proof size are about in the on the order of 85k, which is very good if you compare it to hash based schemes, and it's only about 10 to 12 times, only 12 times larger than discrete log, and for where we would be using it, so that's both transmitting transactions to an aggregator, and also the communication between aggregators and the final proof on chain, all of those are feasible. So with slot accumulation, it looks like, yeah, there's still some research to do. So, for example, some of the security proofs needed are missing, and there are some minor design changes to adapt it to Ragu. I think they're minor, but it does seem feasible. Yeah, so hash based or code base, hash and code base schemes would be about 200 kilobytes or or more at the same security level.

Ulrich: 00:33:52 

Really, so much.

Daira: 00:33:54 

I've been estimating at about this level three, which I think would be 90k for Akita.

Ulrich: 00:34:11 

I will ping you offline.

Daira: 00:34:15 

Also, I will post my estimator. Also vib coded by Mythos, but it's really neat actually. You've got a 3d Pareto surface. 

Ulrich: 00:34:30 

Last question: Did you compare binary Starks with packing?

Daira: 00:34:37 

Yes, yes, I compared to Schlock and Vinith.

Ulrich: 00:34:41 

Okay, okay, thanks.

Daira: 00:34:44 

they have better prover performance, but they're also significantly larger proof sizes. But roughly the same proof sizes as were, but yeah, just higher prover performance.

Alex: 00:35:13 

Thanks for those questions. Now on to Shielded Labs with EPOCH.

## Research and implementation update shielded labs Epoch

Ulrich: 00:35:19 

So hi, I'm Ulrich. Maybe few people know me from my work from the Stark side of cryptography. So my work on Circle STARKs and LogUp lookup arguments. So I had the honor to join Shielded Labs on October 1. to lead the the epoch team we will be a threesome team together with Suez Spaga who already also join October 1 and Luke Edwards both Suez and Luke from from formerly aztec who will join on Mondays I'm quite excited about it so so the EPOC team will be about to to figure out. It goes along exactly the track that Daira was right now already exploring or is exploring. So, how to proceed, how to face the post quantum threat here, and which proof systems to take, which signature systems, and the overall design, because whenever we move to post quantum schemes, we face, in any case, as Daira already pointed out, like at least 12 times larger proof sizes. So how to cope with it in terms of throughput and things like this? So yeah. So in short, that's the main target of the epoch team. We are really happy and eager, and we will cooperate with Zodl and Sean's team and everyone in the ecosystem. So I'm looking forward to that . Thanks. That's from my side.

Alex: 00:36:55 

Welcome to the ecosystem. Awesome. Any questions ?

Daira: 00:37:00 

I posted the estimator in the chat.

Alex: 00:37:07 

Great. Any questions for epoch Great. So, open announcements. If you have some news or an announcement you'd like to share, please raise your hand and open discussion. If there's a topic you'd like to raise for open discussion, please raise your hand. Okay, so the next Arborist call is going to be on November 12. October 29 falls during ZCon, so yeah, November 12 will be the next meeting. 

Daira: 00:37:55 

Looking forward to talking to people about post quantum stuff and formal verification and lots of other things.

Alex: 00:38:04 

Also, it's October 29, I believe. Just a heads up.

Alex: 00:38:10 

Yeah, absolutely, October 29. You're absolutely correct. So, the next meeting is November 12.

Daira: 00:38:16 

Yeah. Sorry, Vivek. Was there anything more that we needed to discuss about the ZSA merge?

Vivek: 00:38:28 

No, I think I covered all the points, so I guess it's good.

Daira: 00:38:35 

Okay, yeah, I'm good to give access to merge the things on the branch, and then we can go from there.

Alex: 00:38:46 

Great, thank you, everybody, and we'll see you see many of you in. Oops, Marek, did you have something else to say?

## Open Announcements

Marek: 38:54 

Yeah, like a little announcement.

Daira: 00:39:00 

You're so very quiet, Marek. Oh,

Marek: 00:39:02 

okay. I'll try speaking directly to the mic. 

Marek: 00:39:10 

Okay. So Strad found a slight contradiction today between ZIP 218 and 237, and the implication of that is that deploying NU7 as it is drops 0.67 ZEC on the floor from the total issuance, and so the question is whether. That's that's on main. We can either.

Daira: 00:39:50 

sorry thats the testnet? Oh, do you mean the rounding?

Marek: 00:39:55 

Yes.

Daira: 00:39:57 

Okay. Carry on

Marek: 00:40:00 

Yeah. So we can either keep it as it is and acknowledge it and fix it later like an upcoming network upgrade or if we want to fix it now, I guess we would have to roll back testnet and then fix it. Yeah, that's all about it.

Daira: 00:40:24 

So I thought that kind of there was a design decision to say that this was okay. But I mean, yeah, I guess it does Technically, violate what was agreed in ZIP 1016. Is it 1016 or 1015? Hang on.

Marek: 00:40:56 

Yeah, I just posted the issue in the chat. 1015.

Daira:00:41:12 

its 1015. I have no strong opinion. Does anyone else have a strong opinion? Is it that ZIP 237 is claiming something that doesn't actually satisfy? Oh yeah, yeah. So ZIP 218 should modify ZIP 237 to remove that claim. Is that right?

Marek: 00:42:00 

Yeah.

Daira: 00:42:02 

Okay. Yeah, we can fix that. We should fix that. Good point. All right, I'll have a look. Thanks for raising that.

Alex: 00:42:16 

Any other comments or questions on this one before we wrap up? Okay, great. Well, again, thank you, everybody. Next call, November 12, and the October 29 call is canceled. And I'll see many of you in ZCon at ZCon. Thank you very much. Appreciate

Next Meeting Scheduled: November 12 2026, 15:00UTC




