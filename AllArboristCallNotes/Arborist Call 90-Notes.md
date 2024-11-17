# Arborist Call #90 Notes

Meeting Date/Time: November 14th 2024, 15:00 UTC

Meeting Duration: 1 hour 


**Agenda**: 

+ Welcome and Meeting Intro - NU6 Watchparty

+ Zebra Update - [Zebra Updates]() 

+ ECC Core Update - [NU7 ZIPs / Note Management]() 

+ [ECC & ZF zcashd deprecation]()

+ Research & Implementation Updates - [Network Sustainability Mechanism]() / [Trailing Finality]() / [FROST]() / [Zcash Shielded Assets]()

+ Open Announcements - [ZCG Coin Holder Voting Proposal / Zaino RPC interface]()


___

Video of the meeting: [recording](https://www.youtube.com/watch?v=JldVJO79Qlk)

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes



### 1. Welcome and Intro - NU6 watchparty 

[00:01:37.330] - **Pili**

We'll start off with a NU6 update. So a NU6 is due to activate on Saturday, the 23rd of November. Unlucky date. Well, not a lucky date, but shame it's on a Saturday. I think some of us at the foundation would like to coordinate with the ECC team, maybe get on a call together around the time. I think it's around 9:30 AM UTC.

[00:02:47.140] 

We'll just get on a call, monitor, zebra, zcashd, and cross our fingers that everything goes smoothly, which there's no reason why it shouldn't. I don't know if anyone from ECC wants to share any updates or plans on what they were thinking for any sixth activation date.

[00:03:12.320] - **Kris**

No specific engineering plans here.

[00:03:14.800] - **Pili**

Okay, cool. We should coordinate and see how we can have a watch party together. 

___

### 2. Zebra Update 

[00:03:44.040] - **Marek**

So in the last two weeks, there are three things that we got done. The first is the verification of transactions that spend mempool UTXOs. We had that PR open for a while, and we finally made it ready to be merged. Then we started replacing our JSON RPC server in Zebra because the one we're currently using is not maintained anymore. And then the last thing is the bug fixes for the getrawtransaction RPC. We hope to merge that soon as well. That's all I have.

____

### 3. ECC Update - NU7 ZIPs / Note management 


[00:04:49.240] - **Kris**

So the major things that we've been working on the last two weeks are there's been a lot of ZIP editing work for NU7 ZIPs. That's taken up a bunch of our time. Apart from that, Str4d has nearly finalized its in testing the partially constructed Zcash transaction format, the PCZT, which is used for hardware wallet integration that we're doing with Keystone, and will also be used for producing frost, trying to standardize on a partially constructed format that can be used for multi-party signatures.

[00:05:39.850] - **Kris**

Then beyond that, we've in the wallet back-end, merged a note management system that is primitive but should be adequately functional to help kill the tip the barista problem so that your wallet maintains some distribution of spendable notes. And we also have put together a skeleton of the command line version of the Zcash or the the wallet app that we're now fleshing out with functionality from our internal CLI application that we've been using for testing. So that is proceeding. I think that's it. 


### 4. Zcashd deprecation 


[00:06:39.150] - **Pili**

Okay, great. Thank you, Kris. Let's move on then to zcashd deprecation updates. I think from the foundation, we're just concentrating on filling out the RPC methods that we think Zebra is going to need to support. So they were included in Marek's update there and also with Pacu's help, well, Pacu has been doing a lot of the reach out, trying to figure out which other partners need which RPC methods. Any Is there updates from anyone? 

[00:07:22.200] - **Pacu**

I don't know if someone from Zaino managed to join? Yeah.

[00:07:33.390] - **Arlo**

One of the things I wanted to speak about was the getsubtreesbyindex RPC, which is currently in Zebra and used by Lightwelletd, but it's not on the spreadsheet. Which is on there? z_gettreestate is on the spreadsheet, but not getsubtreesbyindex.

[00:07:59.900] 

I wanted to see if that should be on there, and whether that's one Zaino should be taking responsibility for it as well?

[00:08:08.940] - **Pili**

That's a good question. I'm not sure. I mean, the spreadsheet came from all of the public RPC documentation. I don't know why that's not on the spreadsheet. If it is on the website, I don't know if anyone has any more context or knows about the RPC method.

[00:08:32.240] - **Pacu**

I think spend before sync uses it or did use it at some point. Kris, is it still being used by the SDK? I think it is.

[00:08:43.490] - **Arlo**

lightwalletd uses it for getssubtreeroutes gRPC service.

[00:08:56.430] - **Kris**

Yeah, and that is pretty important.

[00:09:05.330] - **Arlo**

Okay, brilliant. Yeah, so that was whether we should add that as one that Zaino should be taking responsibility for or whether that would be.

[00:09:14.830] - **Kris**

From my perspective, that does fall into the class of data that's derived from the chain and should be indexed and served efficiently. So it seems like it's it's in the right scope for something that Zaino takes responsibility for.

[00:09:36.080] - **Arlo**

Yeah, that's what I had in mind.

[00:09:44.760] - **Pili**

Thank you for clarifying this. Any other zcashd deprecation updates anyone wants to share?

[00:09:55.080] - **Pacu**

From my side, I had a few responses from like, two or three exchanges. These are exchanges, the "KYC-less" exchanges. Many of them use the same provider, but some of them run nodes. So we have some responses and putting them on the spreadsheet apart from that, that's the only update I have for now.


___


### 5. Research & Implementation Updates i) Network Sustainability Mechanism


[00:10:52.860] - **Jason**

Hey, everybody. All right. To start off, I wanted to recap what I had said on the previous Arborist call on Halloween. At that meeting, I mentioned that Shielded Labs was open to considering alternative proposals that did not involve activating all three existing ZIPs in NU7.

[00:11:13.220] 

First, I mentioned that implementing ZIP 233, which establishes a voluntary burning mechanism as part of NU7, since this is a non-controversial change that involves changing the transaction format, which is already happening with ZSAs. We'd want to include that in NU7. Second, for ZIP 235, which burns 60% of the transaction fees, I said we were okay holding off on a consensus level change, and instead updating the node software to default to 60% burning of the transaction fees. Then the objective here is that it would allow us to test it out before making a change to the consensus rules.

[00:11:59.340] 

Then for With ZIP 234, which is the one that smooths out the issuance curve, I said we were open to holding off, including it in NU7, to consider alternatives and to allow for more time to discuss the change with the community. All right, so it's then Since the last Arborist call, we had a Twitter spaces event, which was me, Nate, Zuco, and Kris also attended.

[00:12:24.460] 

Kris mentioned or encouraged us to change ZIP 234 activation height, which at that time reflected the late… The NU6 activation height and moving it to something further out. We made that update, though I think the precise activation height is still to be determined. All three zips as originally envisioned as consensus level changes have been submitted as candidates for NU7.

[00:12:53.150] 

In addition, we've been doing some community outreach and consensus gathering to gauge support for the NSM. But I think at this point, we just need some additional direction. Obviously, our preference is for the entire NSM to be implemented into the protocol, but we're trying to be collaborative here and understanding of the concerns that have been raised on previous calls. We're open to alternatives. One thing that Str4d mentioned on the last Arbolus call was that he had thought of a way to reintroduce burned ZEC into circulation in a way that preserves havings and wouldn't require smoothing the issuance curve.

[00:13:38.410] - **Jason**

If this is true, then I think it's something that should be written up for discussion with Shielded Labs and the community, and I think it's something that we should start now.

[00:13:47.520] - **Kris**

I can respond to that quickly. Daira Emma, and Str4d and I discussed that as a possibility. We opted not to write it up because I essentially think my position is that it makes the change harder to explain, and it doesn't actually provide the- I don't know that it has any more merit than the existing proposal. We opted not to write it up just in favor of the the existing proposal for ZIP 234.

[00:14:37.420] - **Zooko**

The Russian Zcash ambassador, ruzcash on Twitter, posted a graph of the ZIP 234 smoothing with the assumption that it would kick in at the time when the old halving style inflation rate was equal to the ZIP 234 inflation rate, which is halfway between the second and third halvings. Anyway, I posted a link to that graph into the chat in this panel, so you can see that graph.

[00:15:15.360] - **Nate**

Hello, so another piece there. My math is bad, so I don't actually know if I believe that that activation height where the two equal is halfway between havings, but I could be convinced. But what I did do is I took an old plotting library that I used to make an original blog post about this.

[00:15:48.390] 

It is different than this one by ruzcash. But it has a graph of issuance over time showing the two different kinds. And I just changed the code a bit to print out when the two cross over, like what height, because I wanted to improve ZIP 234 that currently has activation height TBD. I'm not confident that that software picked the right height, but I posted details about that on a new issue on the ZIPs repository since the ZIP It was already merged, but it has this TBD field. So I just wanted to start that conversation and make sure we're aiming for the right height and that makes sense to everyone. And also, if anyone wants to teach me some math about exponentials, that would be helpful.

[00:16:51.700] - **Kris**

So one of the things that factors in here, I don't think that we have to get that exactly right, because if we just as the activation block halfway through the next halving period, then it will be close enough. And the fact that if any Zec is burned prior to that, it would adjust when the exact crossover is anyway. It specifically would adjust up. You would get a slight bump upward in issuance, but very slight. It's going to be, you know, 10ths or 100ths or 1,000ths of a ZEC.

[00:17:33.550] - **Zooko**

Good point.

[00:17:34.650] - **Kris**

It's negligible, right?

[00:17:38.150] - **Zooko**

Let's just pick the block between the two havings, right? Halfway in between the two havings and then stop spending time on it.

[00:17:45.000] - **Kris**

Yep, exactly.

[00:17:48.390] - **Nate**

I'd be fine with that. And I don't know exactly if there are no burns, it's easy to calculate ahead of time. If there are burns, we don't know how many there would be. But I believe you that the amount of difference would be fairly low there. I would still be curious to calculate it ahead of time, just so nobody's surprised.

[00:18:15.130] - **Jason**

But whatever that block height is, and it would probably happen at some point, like mid-2026, it would be included in NU7 for activation at that point in time, correct?

[00:18:28.820] - **Kris**

Yeah. It should be implemented, and the ZIP should activate at NU7, but the actual change in issuance curve then activates at that block height.

[00:18:43.350] - **Jason**

Okay. What are the next steps? Is there anything that we should be doing now as you go through your ZIP review process?

[00:18:53.270] - **Kris**

From my perspective at this point, ZIP 233 and ZIP 234 are in in good shape. The ZIP editors essentially will handle the changes to ZIP 244 and the V6 transaction format because we have to integrate changes from multiple ZIPs there. The only remaining question is ZIP 235. And the question there is, that's That's the one I think that needs the most community input of does ZIP235 activate in consensus at NU7, or does it activate, let's say, as essentially a standard rule of the default Coinbase transaction construction that's produced by getblocktemplate.

[00:20:01.900] 

Give miners the option to do it one way or the other with an objective towards maybe codifying it in consensus in the future. The piece that I'm more interested in that's related to ZIP235, but not exactly, is whether the community is interested in burning fees for ZSA issuance. Because that's both potentially a larger burn amount. I think that in terms of economic incentives, because ZSA issuance is transparent, there is potentially some dynamic that could advantage some miners over others with respect to mining ZSA issuance transactions. I think that if ZSA issuance fees are burned, then that potentially has better economic effects across the network.

[00:21:26.550] 

I don't have a specific MEV style attack in mind, but because it's transparent, it feels like there might be some MEV thing that could happen there. And if the fees are just burned, then that removes an incentive for miners to, I don't know, do selfish mining or something like that.

[00:21:47.560] - **Zooko**

Good idea.

[00:21:52.600] - **Kris**

That's more a question for the qedit folks since I think right now that's not a part of the fees. 

[00:22:03.350] - **Zooko**

But for us, getting it baked into the consensus rule sooner might help. Might help qedit be able to use that mechanism.

[00:22:12.950] - **Jon**

We probably won't have a choice but to make it as soon as possible because the cycle for changes on fees, that affects consensus, and we don't want to leave that as an afterthought. Today, we just have paying a fee in the regular mechanism, so to miners, and a pretty hefty fee so that there's no spamming of ZSAs.

[00:22:45.890] - **Kris**

Yeah, so that sounds fine to me. From my perspective, ZIP 233 and 234 are, I would like to see those in NU7. I hope that they get support from the community for inclusion. And then I hope that can be settled relatively quickly so that qedit can depend upon that functionality being there for finalizing the specification of ZSA fees.

[00:23:21.030] - **Jon**

And implementation, actually. The specification, there's a zip, but the implementation hasn't been done yet.

___


### 5. Research & Implementation Updates ii) Trailing Finality 

[00:23:59.530] - **Zooko**

I'm doing the scoping, what we're trying to accomplish and what we're not trying to accomplish. And Nate is doing building a roadmap. My update on scoping is that we got a lot of really thoughtful feedback from a whole bunch of people, including from Zcash Foundation and ECC and other places. I'm working on integrating that feedback into our documentation. And you're all welcome to follow along. I'll paste the link in here.

[00:24:39.280] 

But the interesting part, if you guys are interested in privacy and staking, then you might be interested in this part. It's very subtle and confusing. But the overall big picture of what our goals, what are the big chunks that we're attempting to solve and what things are we not attempting to solve are stable and haven't changed since It's probably two Arborist calls ago. I'll paste the link in here. And then Nate is doing the roadmap based on that. That's my update.

[00:25:14.990] - **Nate**

My focus is, okay, how can we deploy this eventually? Do all the engineering necessary for that? And so most of In my days, right now, we're focused on figuring out a roadmap and interviewing engineers to help me.

[00:25:40.260] 

And for the roadmap, I've been working on a couple of different approaches, but one is to take the scoping document, which lists a bunch of goals, and start putting those into GitHub tickets and then working backwards. So I posted a link that goes straight to this label called scoping. So that should evolve as the scoping document evolves so that the lists align one to one. And then for each of those, issues.

[00:26:22.590]

But if you just click on one of those [tickets](https://github.com/ShieldedLabs/crosslink-deployment/issues/16), you'll see so far, there's not much detail outside the scoping document, except some of them have... Okay, click on one that says UX goal, such as users run validators and get rewards, number 16. And you'll see that lists a prerequisite ticket. So some of these have prerequisites, and those prerequisites are the end engineering goals for our team.

[00:27:00.000]

This is still early and brainstormy, but it's already been helpful for us to make some decisions such as we want users to be able to delegate stake, for example. But we are not going to be making a wallet, and we're still debating how much we want to write wallet guidelines or not. But what we've settled on is we want to work with wallet vendors and make sure that the protocol is clear to them. If they know how to implement, what needs to be implemented for their users, and they are basically satisfied, at least one or hopefully more good wallet vendors.

[00:27:47.790]

And then the same for exchanges, centralized exchanges. And then we'd also like to get a DEX project or a Bridge project, not necessarily to commit to deploying something, but to be very interested and to be looking at it and to be saying, yes, this could work for our purposes..

[00:28:08.640] - **Zooko**

Maya DEX.

[00:28:09.020] - **Nate**

Yeah. I mean, in my opinion, what we want is by the end, any one high quality partner in each category is the goal to know at least one is satisfied, but ideally, most of them would be satisfied. And so that's how we're cutting the scope for our engineering effort. So our engineering effort will be focused mainly on working out the design of the protocol, producing patches to a full node, zebra, that implement that. And then one big piece that's still less clear to me is how much of the validator stack we will be providing writing directly in software, but presumably enough to be able to start validating maybe from the command line, something like that we're still trying to figure that piece out.

[00:29:10.680] 

But anyway, the big summary is we're going backwards from the scoping document to figure out where we're headed and what the implications are. And the main implication is we want to make sure we're working with partners so that our scope and focus could be more narrow because we're a tiny team. So if you're interested, stay in touch. It'll be a little while before we're ready to show anything useful that's not already just on GitHub for any of those partners. But when that day comes, we'll make sure and start getting louder on Arborist calls and asking for feedback or setting up meetings like, "Hey, come help us watch this thing develop and give us feedback". 

[00:30:00.940] - **Pili**

Thank you, Nate. Any questions or comments for Nate or Zooko?

[00:30:05.640] - **Jon**

I have a question. Are there any veterans of staking that you guys are consulting? Like, please give us your wisdom, or is this such a different thing with like, UTXOs that it doesn't apply? Or how do you approach past wisdom?

[00:30:29.890] - **Zooko**

It's not very different because the UTXOs don't touch the staking side. So the staking side is very similar.

[00:30:40.130] - **Nate**

Yeah. Another way to answer that is that crosslink is a protocol for plugging together two different protocols. One would be a staking protocol, or actually for us, for now, one is a staking protocol, but we haven't picked the staking protocol, and doing that and then adapting it to work with crosslink requires answering a bunch of questions that would be relevant to staking experts.

[00:31:11.570]

So we are chatting with some. And also when we're hiring, we're looking for, like we've seen, some candidates who have worked on proof of stake protocol nodes, which is the kind of candidate, which would be really good for this because I don't have that direct experience.

[00:31:30.090] - **Zooko**

It's a good idea Jon.

[00:31:31.130] - **Nate**

One more piece is in my approach that I would like to do is just start prototyping something, even though the design has a lot of gaps in it. And then after we get stuck with the prototype in making progress, then start engaging more seriously with the design.

[00:32:04.930] - **Jon**

I'm hearing subtext of, well, when Claude and '01 preview are not good enough for me, I'll go hit the heavy ones.

[00:32:18.090] - **Nate**

Maybe. I actually haven't seen Claude yet.

[00:32:22.680] - **Jon**

I highly recommend.

____

### 5. Research & Implementation Updates iii) FROST

[00:32:45.180] - **Conrado**

So the last few things that happened in Frost were that we merged the Taproot PR or BIP 340 PR, which is something that is a cipher suite, which is useful for Bitcoin, but it's also useful for Zcash since it will be used for the issues of ZSAs. So that was cool. I just did found a small issue, a greater PR to fix it, but it's nothing big. And this will make into the next release of FROST core. And the Cypher Suite, it's just a crate itself. There will be a new crate just for the Cypher Suite.

[00:33:27.230]

We also merged It should support for refresh shares functionality using the DKG. So if you have a bunch of shares and maybe you want to exclude someone from the group or just refresh everyone's share out of precaution. You can do that using a distributed protocol, which is also neat without changing the group of a key. And what we will We work on next is basically finishing the frost server. Functionally, it's ready-ish, but we need to add support for the DKG using the server. Only the demo code we have is just no copy and paste stuff still for the DKG.

[00:34:17.650] 

So we want to add support to do the DKG using the server. And also some final touch to the server to make use HTTPS, stuff like that, making more our production ready, and hopefully we'll get that done by the end of the year. Yeah, that's it.

[00:34:40.900] - **Pili**

Thank you, Conrado. Any questions?

[00:34:50.020] - **Pacu**

I do have one small question. When you mean excluding someone, is that removing it from the group for good or do the old shares still work if they screw the person?

[00:35:15.580] - **Conrado**

The old share still work, which is why you need to be careful. It's not sufficient that, for example, you have a 2/3 group, and you find someone is malicious or they lost the share, the share was compromised. You want to remove them from the group. You can do that, and you can add another person. Everything works because you work on the assumption that always 2/3 people are honest.

[00:35:47.250] 

But if another person from the original group was also compromised, then you can still compromise the whole wallet. So refresh share is not like a panacea for solving security issues. It's just a best effort, a precaution in the case of someone losing or getting the share compromised. But the best defense against this is to choose a perfect threshold. Something that you be very difficult to compromise that amount of shares. But alongside the life of the group, even if you refresh shares at a specific point in time, it needs to be true that the threshold of participants will be trusted. And maybe in the case for a Zcash wallet, for example, it would be good. At some point in So at the same time, you actually do a full migration.

[00:36:47.930]

You create a new wallet and migrate all the funds. And with that, you have 100% sure that the old shares won't work because the old shares will be of an empty wallet. 

[00:37:01.760] - **Pacu**

Awesome. I just wanted to clarify that.

[00:37:04.480] - **Conrado**

Yeah. It's a tricky issue that people... It can be dangerous, so it's good to emphasize that.

[00:37:13.970] - **Pili**

I think we clarify that on our documentation as well now.

[00:37:16.480] - **Conrado**

We did. We have some feedback regarding that, and we added some disclaimers.

____

### 5. Research & Implementation Updates iv) Zcash Shielded Assets


[00:37:42.280] - **Vivek**

Yeah, hi. So I think the In the updates, we have are largely with two main areas of focus this time. It's the ZSA ZIPs like Kris was mentioning and Zebra. So starting off with the ZIPs, earlier a Pull Request, which was Pull Request [854](https://github.com/zcash/zips/pull/854), was merged around the NU7 ZIP deadline, and our ZIPs are in the consideration for NU7.

[00:38:07.880] 

We received some reviews and comments on the ZIPs around that time, and some issues have been opened recently. So thanks, ZIP editors and Dera, for all that work. We've been working on these issues. We've responded to some of the issues, and we've opened a new pull request now. That's a pull request [960](https://github.com/zcash/zips/pull/960). If anybody wants to take a look.

[00:38:33.960] 

One of the changes that got discussed recently that I think we are close to pushing into that pull request is a forward-looking change where we are adjusting the v6 transaction format so that it can smoothly support swaps for ZSA in the next upgrade, ideally. So the change is such that it shouldn't need too much implementation overhead for NU7 that we already have implemented. And at the same time, it will also lessen the need for a second transaction format change again in the next upgrade. So that's there on the ZIPs front. We are still actively working on fixing the other issues that are open. And we'll be talking with the ZIP editors over the coming weeks.

[00:39:27.860] 

On the Zebra front, We have created a few step-by-step PRs with breaking up the work that we've done. We've been working with the Zcash Foundation to peer review that work so that we can have it ready for merging soon. We get everyone on the same page regarding those changes. We are progressing on adding the issuance support in Zebra and the issuance state. That's work that's still ongoing.

[00:40:00.090]

Besides this, regarding swaps, we have made an implementation of the swaps for ZSA in the Orchard Crate. I think that's ready pretty much. We've also, alongside, been improving our ZIP as we've been implementing stuff. And there's one thing that's pending is if we change this transaction format for v6 itself, then we'll be removing some of that redundancy in the Asset Swap ZIP. Yeah, finally, regarding transaction acceptance, we made an initial presentation of the work we've done there earlier this week to Daira. We got some feedback and we should be making that report available sometime soon as well.

[00:41:14.150] - **Pili**

Let's move on. Does anyone have any announcements that we'd like to share?

[00:41:25.640] - **Jon**

I have just a comment on what Vivek said. The fact that we're merged in the ZIPs and we're preparing to merge with pull request and working, it's very significant for the Qedit team. After so much time trying to chase first zcashd and zebra, and then progress in Zcash in general, and chasing with our side forks. We're finally at this point where we We see that this is becoming real. Very exciting.

[00:42:07.220]

And also a lot of responsibility because it's a lot of trust in the feature itself. So we're aware of that. Vivek didn't mention, but there's an ongoing security audit for the core protocol that's not finished, but it's the timing is supposed to be in parallel to this merging work. So thanks to the entire Zcash community for putting the effort to review this and make this a real thing.

[00:42:46.880] 

I asked the team, When can we put together a series of webinars to explain more in detail what was done? How do you hold it and run it and see that the sales move around and make it concrete for people? And as soon as we can, we'll announce just three sessions of 40 minutes where It will remind a bit of what we described in Zcon, the various Zcon's, but it's from the perspective of what ended up being in the protocol and how do you actually use it now that we know what it looks like. So this is soon. I can't put a date yet, but that's what we're aiming for.

___


### 6. Open Announcements i) ZCG Coin Holder Voting Proposal / Zaino RPC interface


[00:44:03.490] - **Jason**

Yeah, hi. I have one thing for Zcash Community Grants. Hanh had submitted an updated proposal for his [proof of balance coin holder voting](https://forum.zcashcommunity.com/t/coin-voting-2-0/49177) mechanism. I did a very nice presentation using GitHub pages, but I just wanted to flag this for the core developers and the node implementers for your review. The next meeting where we plan to vote on this proposal is November 25th, which is Monday. So if possible, we'd appreciate getting your feedback before that date.

[00:44:35.490] 

Kris had some questions and comments for Hanh, but one thing that we're particularly interested in is an overall risk assessment of the changes and improvements he's looking to make. Since Daira Emma is not on the call today, I can message Zee separately. But Pili, is it possible for somebody at ZF to have a look at the proposal over the next week or so and let us know if you have any feedback.

[00:45:06.060] - **Pili**

Yeah, we can do that. I'll take a note of it. And thank you for giving us a friendly notice. Any questions or comments for Jason on that? Otherwise, we'll move on to Arlo.

[00:45:24.450] - **Arlo**

Yeah, I wanted to discuss essentially the protocol for the RPC services that Zaino will be taken over from Zcash. It currently they're JSON RPC services. I wanted to see if there was any possibility that we could implement them as gRPC services instead. I don't even know if that's possible.

[00:45:45.120] - **Kris**

So my position here, what I would like to see is we will need to be able to provide JSON RPC services for support of existing exchange partners and so forth. That that seems like it's it's just something that we have to have. However, the architecture there could be that a JasonRPC service is layered over or is just a proxy layer for an underlying GRPC service that might be built in a more cohesive and modern fashion. Because, for example, if you When you look at the zcashd RPC services, there are several places where those existing RPC APIs are... Functionality is split up between multiple RPC methods where you really would want all of the results in a single call.

[00:46:48.600] 

I think what we ought to be doing there is designing the semantically correct RPC method that we want going forward. And whether that's exposed via gRPC or some other mechanism is not that important, so long as then the existing zcashd RPC methods could be implemented in terms of that correct semantic RPC interface.

[00:47:22.640] - **Arlo**

Yeah, makes sense. So it goes on. So currently there's the light wallet GRPC services specified, and then there's a separate load of Zcash RPC services. Would it make sense for us to replace the compact, the ZX streamer with Zcash indexer service, the pin and compass, all of the indexes that need to be served, both for light wallets and for wallets and block explorers and then we could build the JSON RPC services from that.

[00:48:00.940] - **Kris**

I mean, I think that sounds right. Again, the way that I would approach this is, let's start by, irrespective of gRPC or JSON RPC, let's just define the actual set of operations that we require at a semantic level And maybe implement those in terms of rust traits or something like that so that their semantics are fixed.

[00:48:42.550] - **Arlo**

Yeah, that was what I was talking about. I was so like, There's two separate services, one specified for lightwallets and one specified for wallets and block explorers. Is it something where we can essentially reform that into just one specification, or do to keep those two separate?

[00:49:01.710] - **Kris**

Yeah, I think that the the lightwallet API is, again, downstream of this set of indexes or set of RPC methods for that is the modern correct set of operations. The lightwallet protocol itself is It's hacky and organically grown more than designed or designed in the context of a different set of requirements than we currently have. So it's better to just work from a foundation that can support it but not be tied to it.

[00:49:51.090] - **Pili**

Thank you everyone for joining today. And we'll see you in two weeks time at the later time of 21:00 UTC. Double check your calendars. We've had daylight savings changes happening in some places in the world, not in other places.


____


**Next Meeting Scheduled: 21:00 UTC November 28th 2024**


___
___

