# Arborist Call #81 Notes

Meeting Date/Time: July 11th 2024, 21:00 UTC

Meeting Duration: 35 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [ZIP-320 support]()

+ Zebra Update - [Zebra 1.8.0]() 

+ Research & Implementation Update - [Trailing Finality]() [FROST Refresh Shares]() 

+ Open Announcements - [BOLT & TZE's]() / [Z|ECC Summit updates]()




## Decision & Action Items

i) Add section to next meetings for NU6 Testnet Activation 


___
Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - ZIP 320 support 


[00:26] - **Kris**

So as you can imagine, there's been a bunch of fascinating discussion this week at the ZECC summit with respect to what's coming next. There'll be roadmap information about that coming out from ECC next week, but in terms of near term and development stuff, we are still working on the completion of ZIP 320 support. That's all implemented just now in the final review process.

[01:11]

I have finally gotten some good progress on the refactoring of test infrastructure out from zcash client SQlite into zcash client backend so that we can start making testing with fake chains more readily available so we can start having that ready for integration into the future Zcashd replacement wallet. So those are the main things most of last week while we were still all working was related to ZIP 320 support and Daira Emma's PR. So that's about it for us.




____

### 2. Zebra Update - Zebra 1.8.1


[02:08] - **Arya**

So in zebra, since the last Arborist call, [version 1.8.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.8.0) was released.

[02:14] 

It includes an update to the default unpaid action limit for ZIP 317 from 50 to zero and a lowered mandatory checkpoint height from the block height just after ZIP 212 grace period to just before the canopy activation height. So Zebra will now semantically verify an extra 30,000 or so blocks when checkpoint sync is disabled, thanks to some changes in the Zcash Primitives version 0.1.4 release, which made it really easy to handle the ZIP 212 grace period more easily during semantic validation.

[02:43] 

Also, a new alpha version of the Zebra launcher was tagged with the latest Zebra release. Installers for Debian and Windows are available on the [Zebra Launcher GitHub repository](https://github.com/ZcashFoundation/zebra-launcher/releases/tag/v0.0.0-alpha.1). Past binaries inexplicably stopped working on macOS. It may still be the issue with code signing that was causing macOS to quarantine the app before, but hopefully that will be fixed in the next version of the Zebra launcher.

[03:04]

We merged some more changes into the main branch after the release. It's now easier to initialize a read only zebraDb finalized state and restate service from a separate process, and now read only instances of Zebrad use a secondary RocksDB instance so it can catch up to the latest finalized state based on the write ahead log before updates in the Memtable are flush to disk.

[03:27]

A trusted chain sync module was added to Zebra RPC, which maintains an up to date copy of Zebra's non finalized state in a separate process and tracks chaintip changes in a zebra node via RPC methods and a standalone zebra scanner binary was added to the zebra scan crate using the secondary Rocks DB instance and using the trusted chain sync module to keep a copy of the non finalized state and track chain tip changes.

[03:51] 

This approach requires Zebra's cache directory to be available to the zebra scanner process and requires extra memory to keep the copy of the non finalized state compared to accessing data from zebra state by RPC calls to the prospective indexer service. But it helped to avoid changes to how the shielded scanner gets data from separate state, and it'll be needed by the indexer service later anyways and it allows for testing the trusted chain sync module through Zebra scan so there's no extra work involved in changing it. So it uses RPC calls later.

[04:24] 

Then there's also a [new page](https://zebra.zfnd.org/user/custom-testnets.html) in the Zebra book describing how to use custom testnets in zebra, caveats constraints and a comparison between custom testnets that are full testnet and regtest.

[04:35] 

And we merged our first dependency update that was reviewed with cargo vet, which had been added just before the last Arborist call. There's also a [PR open](https://github.com/ZcashFoundation/zebra/pull/8659) for moving tests for the shielded scanner and the scanning results reader binary, the utility binary from zebrad and Zebra utils to zebra scan. And next we're going to be working on moving one last test over for the shielded scanner to finish up that pr, some documentation updates for the scanner, investigating block explorer support and adding the indexer RPC interface which is hopefully going to be used by the zcashd replacement wallet. 

[05:14] - **Kris**

Given a bunch of the conversations that we've had here at the Z|ECC summit. I am super excited now about some possibilities that are of different kinds of applications that can make use of the zebra scanner library. One question I have is has there been defined yet a protocol or a format for returning scan data to clients of the scanner? Do we have a format for that yet?

[05:53] - **Arya**

Not currently. There are a couple different ways to get data from the scanner because it caches the data, so you can either just get the results with a synchronous method, or you could get them as a stream and in both cases it just returns the transaction ids. So the client of zebra scan will have to rescan those transactions, but at least it doesn't have to go find a needle in a haystack and search all of the transactions. I'm really excited about this as well. I think it solves a lot of scalability problems.

[06:27] - **Dodger**

And just to give some insight into that, the rationale for just turning the transaction ids was a, simplicity, and b also the potential, the future forward looking compatibility with a situation where we have detection keys.

[06:51] - **Kris**

Yeah. So for a wallet making use or an application, let's not call it a wallet necessarily, making use of the zipper scanner, you can use just the transaction ID to pull down the transaction data, and that gets you the memos and whatnot, which is all that some applications need. Then for a wallet, you would need to download both transaction data and some surrounding block data and potentially some adjacent note commitment tree data in order to make the notes discovered spendable, because you would at least need the prior note commitment tree frontier, and then the following note commitment tree data as the remainder of the to the 16th subtree, up to the subtree root to actually make that note spendable. So anyway, interesting stuff. Definitely looking forward to it. There may be some additional operations that we want to add to the light wallet server to support that kind of not having to scan everything once you've discovered your notes.

[08:15] - **Arya**

Another consideration for just storing the transaction ID's was we intended this to be used with minimal storage requirements, so we just didn't want to store all of the scanned data.



____

### 3. ZF + ECC zcashd deprecation


[08:30] - **Dodger**

Any other questions relating to zebra? We've kind of blurred over a little bit into the zcash, the deprecation topic there with the. So for context, the zebra scan work is basically related to zcashd deprecation. 

[09:15] - **Alfredo**

So I wanted to ask Kris about I saw you posted something in the discord about that you were working in the moving the test framework from the SQlite grid into the zcash client backend. I was wondering where you at in that regard.

[09:35] - **Kris**

I'm actively working on it. I expect that I'll have a PR for it up probably around the end of next week. Beginning of the week is going to be mostly focused on finishing out ZIP 320. 

[09:57] - **Dodger**

Anything else on the topic of zcashd deprecation?

[10:06] - **Daira Emma**

Not specifically zcashd deprecation. But ECC has just finished Z|ECC summit and that was really productive. We've got some interesting ideas that we're going to work on about things like instant payments. What else can you remember?

[10:32] - **Kris**

There's a whole variety of stuff that I mentioned this earlier, but our roadmap is going to come out next week.

[10:39] - **Daira Emma**

Yeah. Kris, you had an idea about funding.

[10:42] - **Kris**

Oh yeah, that was something aside, but yeah. Starting to think about possibilities since a lot of the future funding stream or funding stream proposals have some mechanism for or some TBD distribution of grants. I [posted to the forum](https://forum.zcashcommunity.com/t/loan-directed-retroactive-grants/48230) an idea of one possibility, but it would be good for other folks to voice other possibilities.

[11:16] - **Dodger**

Cool. Can we take it as red that zcashd deprecation is still a priority for you guys or are you guys going to be refocusing on these other ideas?

[11:27] - **Kris**

zcashd deprecation is still a blocker for virtually everything we want to do.
___


### 4. Research & Implementation Updates i) FROST 



[00:11:51.09] - **Conrado**
On FROST we're wrapping up the refresh shares functionality. It's ready but we are working on some tests because we realized that there was one subtle thing that wasn't being tested, which is when we refresh the shares, we need to refresh the verifying shares with the public key that each participant has. And it's kind of tricky. I mean it's not hard to test, but we were testing by just generating a FROST signature and verifying it.

[00:12:25.07] - **Conrado**
But when you aggregate as FROST signature, you just verify the symmetry to see if it works and if it works, we just return it. Only if it not works, then you try to verify each share and that's what actually uses the verified share. So it's not a big deal. It's just that something that accepted that we realized it wasn't being tested. So we're working on adding a test to that. But it should be simple and the refresh shares should probably make into the 2.1.0 release

[00:12:58.12] - **Conrado**
So our last release was [2.0.0 -rc0](https://crates.io/crates/frost-core/2.0.0-rc.0) . We were waiting for people to have feedback on the API changes. We didn't receive anything. So either people are happy or people haven't tested. But we will wait a bit more until we release 2.0.0 final. Then not long after we probably release 2.1.0 with the refresh shares functionality.

[00:13:25.00] - **Conrado**
On the FROST server side, which is the thing we're working on to help people use FROST, we added user registration, it's implemented it's just waiting for review and we are working on some refactoring, which I think will be useful which is basically moving some of the logic from the server back to the coordinator, basically aggregating commitments and aggregating shares.

[00:13:53.09] - **Conrado**
This was being done by the server, but doesn't need to be done by the server. If you do this on the coordinator, it makes a lot of things simpler, like adding encryption authentication, which is the next step. And also whenever we migrate from this centralized server format to a full peer to peer, we would also need to do this change. So we might as well do it now.

[00:14:22.03] - **Conrado**
It's already under implementation it's almost done, to be frank. So yeah, I think I'm excited. I think we're almost at a point that we might have something that people can more easily use to use FROST to produce FROST generated signatures for the Zcash transactions. We're discussing with Zingo about possibly doing some work on integrating with Zingo, but still very preliminary stuff. Our goal is to have this implemented somewhere on a wallet preferably. So yeah, we're excited in that direction. Maybe it would be useful for the whole lockbox thing that people seem to be in favour of. 

[00:15:35.04] - **Pacu**
If I may add on FROST more. I haven't tested the 2.0 interface yet. According to what Conrado says, the changes wouldn't be breaking that much to be straightforward to adopt. But I have started to work on the orchard pieces for the FROST uniFFI SDK for using FROST on Go and Swift and Kotlin and Zancas from Zingo Labs also offered to probably chip in with the Kotlin flavour of the FROST uniFFI SDK as well. So we're everything just like this talk for now, but that's getting started.

[00:16:23.26] - **Pacu**
I talked to Daira and Kris about how I could send a the orchard changes to the orchard crate and how to feature gate them so that we don't modify the philosophy of the public API of the crate because keys on FROST kind of like don't match in how ECC has, I think, correctly opinionated the Orchard keys. So not to affect that and maybe enable ways to people to wrongly shoot themselves in the foot with some APIs that are meant for FROST use only. We're going to feature gate those changes and I'll be coordinated with, you know, for Conrado and Str4d and Kris and Daira to review those changes that are not really that big, but they are important that they are, you know, in their own little corner.

[00:17:27.06] - **Daira Emma**
 I'm sure we can get to those soon. Despite everything else that we're working on. I actually had a more abstract question about FROST that came up at the Z|ECC summit. So I think the paper specifies a confidential and unauthenticated channel between the parties. The confidentiality there. Am I correct in thinking, because this is the answer that I gave to someone at the summit, that the only issue there is that. So if you reveal your signature share, then someone could potentially complete the signature and front-run you in the case of blockchain applications.

[00:18:29.05] - **Daira Emma**
Let's see what else could happen if the confidentiality is broken? Because you're only signing hashes, right?

[00:18:44.05] - **Daira Emma**
Yeah. The FROST protocol itself doesn't have a confidentiality requirement, and authentication is only required if you need cheater detection. If someone generates wrong values in SSHI, want to know who was responsible, you need authenticated channel, but you don't need confidentiality. The content of the Zcash, of course you need it, because if you're sending for privacy issues you might not want to disclose information about the transaction you're signing. But the protocol itself doesn't have any confidentiality other than the key generation for the distributed key generation protocol of the trusted dealer of course you need confidential channels because it transmits shares of the key, but the signing protocol doesn't have confidentiality requirements.

[00:19:42.07] - **Daira Emma**
Yeah, I understand what I was misremembering now, the use in zcash obviously does require confidentiality, but general usage doesn't.

[00:19:56.20] - **Dodger**
Cool. Any other questions or comments on FROST? Okay, I'm going to skip back to something that I had added, but obviously I hadn't put up on the screen. So obviously we are going to have hopefully some clarity early next week about what's going to happen with NU6. It seems likely that a lockbox of some form will be required. I think, Kris, you've already done some sort of protocol specification about what that could look like. So that's something that we're going to pivot to focusing on with the targets of testnet activation on the 8 August. Do I recall that correct? Yeah. Any other comments or updates or questions on that? Okay, and we'll keep this as an agenda item for the arborist call going forward then.


___


### 4. Research & Implementation Updates ii) Trailing Finality 


[21:13] - **Dodger**

 Do you want to give an update on Trailing Finality or no change from last time?

[21:25] - **Daira Emma**

The writing up the spec that we've done so far, the protocol description so far had been delayed, but I'm pretty sure I'm going to get to that soon. Otherwise no.



___


### 5. Open Discussion i) BOLT & TZE's


[22:14] - **Arya**

Arya, would this be a good time to ask a question? Daira Emma, did you say instant payments? And could you expand on that a little bit?

[22:23] - **Daira Emma**

Yeah, so there were lots of different things discussed, but my definition that I gave of an instant payment is a merchant and payer decide to make a transaction and the payer confirms, and within 10 seconds, the merchants and the payer have common knowledge that the transaction has succeeded. So obviously, if it's only going to take 10 seconds, then that precludes a lot of onchain solutions. But we did come up with some ideas for how to support this and liberated payments was only one of them.

[23:14] - **Kris**

Yeah, we haven't specifically prioritized any of that work for the near term because we have to first get through NU6 and we have to deprecate Zcashd and so forth. But it's definitely something that we'll be thinking about going forward is how can we make everyone's experience lower friction and faster? And there's some low hanging fruit that at the wallet level that we're going to be doing that will affect all of the wallet backend in the coming weeks. But that, again, is, that'll happen in the coming weeks after ZIP 320 and NU6. So, yeah.

[24:03] - **Daira Emma**

So instant payments should be distinguished between sort of receive to spend latency. So how long is it before you can spend funds after you receive them? And both are important. And we actually discussed both in the session, but, yeah, we've got ideas for both.

[24:32] - **Dodger**

Is there any discussion of Bolt?

[24:35] - **Kris**

Actually, there have been a number of things that we've discussed this weekend that not bolt specifically, but that would be potentially advantageous to have tease at ease back in the protocol. And that raises again the question of it would be really nice if, if the issuance for ZSAs were not tied to some bespoke features of the protocol, but were instead implemented as TZEs.

[25:14] - **Kris**

Because one thing that came up is that we right now have sort of one idea for TZE issuance that ZSA issuance that qedit has been proposing, but I think that we should decouple the sort of the circuit level pieces of ZSA transfer from ZSA issuance and it would be nice to have a design that where different issuance mechanisms could be implemented in terms of the TZE part of the protocol, so that we're not limited to just a single issuance mechanism, and that it requires non-modular bloating of the protocol to support other forms of issuance going forward. With respect to bolt, we haven't heard from the bolt folks in ages. Is there something specific that prompted that question dodger?

[26:31] - **Dodger**

No, I was just curious because I think the bolt guys were waiting for non malleability to be implemented in the zcash protocol.

[26:45] - **Daira Emma**

Transaction id. Non malleability has been implemented.

[26:49] - **Kris**

By the time that happened, though, they had moved on to other things. But their PRs are still open and all of the protocol feature pieces are still under an experimental feature flag in librustzcash. We never integrated them fully into zcashd, but at this point, of course we wouldn't ever do that. It would be a process of integrating them into zebrad. But there may be several potential applications for them and for things that are not interacting with the transparent pool, but for transparent parts of the zcash protocol. I would like if we were to revisit that framework so that we have a standard way of doing those things.

[27:42] - **Daira Emma**

I'm a little bit more sceptical. One thing I'd like to point out is that the code in librustzcash, at least that implements TZE's, is in imminent danger of bit rotting because of say, NU7 support. NU6 support. I think there was something with ZIP 320.

[28:08] - **Kris**

There are things that haven't been implemented that, you know, where things are stubbed out in TZE support.

[28:16] 

but they're relatively well separated enough from the rest of the protocol that I don't think I share those concerns because there's a separate part of the transaction, and the balance rules between the TZE parts of the transaction and the rest of the transaction are relatively straightforward. So I'm not as concerned about that. I think that it's worth revisiting.

[28:44] - **Daira Emma**

It is worth revisiting. Like I said, I'm more sceptical. But we do need to look at whether what the tradeoffs are in overall protocol complexity, and features with using TZE for things like this versus using more feature specific logic.

[29:10] - **Dodger**

Yeah, it looks like back when we were talking about NU3 feature selection, op check, sequence verify. And bitcoin was a prerequisite then, but I don't know if that was superseded by the TZE's solution.

[29:32] - **Daira Emma**

I mean, there hasn't really been a lot of interest. It was something that we could add because we could just backport stuff from bitcoin for zcashd, but I'm not sure there's sufficient interest in it on the zcash network and there's some opportunity cost and that we could be doing other things that maybe are more useful.

[30:06] - **Dodger**

So there's not enough interest in what?

[30:10] - **Daira Emma**

Check lock time verify.

[30:12] - **Dodger**

Well, check sequence verify.

[30:14] - **Daira Emma**

Check sequence verify was a. Yeah, you're right. I got the wrong one that the other one is already in.

[30:23] - **Dodger**

Yeah. Yeah. I just posted a link to the. To the original zip draft, which is 5 years old now. It's kind of funny how we come back around to talking about the same things or talking about the same challenges or problems that we were talking about years ago.

[30:48] - **Kris**

I've been working on Zcash now for about 4.5 years. TZE support was the first thing that I ever implemented.

[30:59] - **Daira Emma**

And I apologize for making you do that work, or our manager at that point, making you do that work that didn't get used.

[31:08] - **Kris**

It might yet.

[31:09] - **Daira Emma**

Well, it might. Okay. This might be slightly controversial. I don't think there's anything wrong with a ZIP staying open for 5 years if it is well defined, well specified, but no one has a particular interest in it. It's still available to be included in upgrade if. If that interest comes back or it becomes useful for another purpose. As long as it's still vali it doesn't need to be withdrawn. It's not doing any harm.

[31:49] - **Dodger**

I don't think. There wasn't any interest implementing Bolt. It said it was blocked on things like transaction malleability for so long.

[32:01] - **Daira Emma**

I don't think it was.

[32:02] - **Kris**

No, it was at one point, but. But we fixed that, right? We actually fixed that in NU5. So, you know, that was the necessary step. It's now easier to get to that.

[32:21] - **Dodger**

well, anyway, the zip is there.

[32:29] - **Daira Emma**

Yeah, maybe I'll look at it again. Or someone else can look at it because I'm no longer a zip editor and I shouldn't be a block on the protocol.

[32:49] - **Dodger**

Any other comments or questions on that topic? 

___


### 5. Open Discussion ii) Z|ECC updates


[33:15] - **Arya**

What else are you most excited about that came out of the Z|ECC summit?

[33:24] - **Kris**

So personally, I am reinvigorated with respect to. I believe that there's an interesting variety of applications that can be implemented in terms of the existing primitives that exist in the zcash protocol. Combinations of memos, viewing keys, FROST. And there are a whole bunch of sort of interesting end user applications that we can build specifically into wallets.

[34:02] - **Kris**

And I think we just need to build one of them. There are a couple of simple ones that I've had ideas about for a long time. I would love to get some traction to just build a couple of applications so that we have more user application level reasons for people to use the protocol than just transfers of value. That's the thing that I'm excited about coming out of the summit is getting more people using zcash for economic interaction purposes, where it's not just payments.

[34:41] - **Daira Emma**

Yeah, and there are a few things that are half baked I'm not ready to describe, because they're half baked that are very interesting and might lead to some important improvements. 

[35:01] - **Kris**

Yeah. I think that the thing that I'm most excited about from the summit is just when we get together, there is a creative ferment, because that's facilitated by having very high bandwidth connection and lots of ideas come out of that. Now we just need each of us to have a few clones to be able to implement it all, and to.

[35:57] - **Daira Emma**

It's amazing how well we do work as a distributive team.

[36:03] - **Kris**

Also, I've spent a lot of time working in offices, and you don't actually get the same effect from just working in an office. I think that the alternation between having focus time where you're undistracted, and then when you get together, there is a tremendous amount to do and you can communicate at much higher bandwidth.

[36:29] 

I think the combination of the two is great. We just need to do the in person things, and perhaps not as large of events, but just engineering folks things much more often. That's the sort of thing where we've discussed that on a number of occasions. But that's something where I'd also like ZF engineers to be involved in, say, an engineering retreat that is a, we're going to get work done, we're going to make things, um, you know, we're going to write code for a week, um, you know, as, as zcash developers.

[37:02] - **Daira Emma**

Cypherpunks write code.

[37:05] - **Dodger**

Indeed. You could talk more about that. The irony of having you guys all, all there at an ECC retreat to which we weren't really coordinated or invited is uh, is nothing lost on anybody at ZF. Anyway, we'll move on. Any other discussion topics that anybody wants to raise? Okay, let's wrap it up there. The next arborist call would be on the 25th July in the earlier time slot of 15:00 UTC. 


____


### Attendees

+ Kris Nuttycombe

+ Alfredo Garcia 

+ Arya Solhi 

+ Conrado Gouvea

+ Marek Bielik

+ Pacu ZWCD  

+ vito zk 

+ Zerodartz


**Next Meeting Scheduled: 15:00 UTC July 25th 2024**


___
___
