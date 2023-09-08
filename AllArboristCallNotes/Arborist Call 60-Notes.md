# Arborist Call #60 Notes

Meeting Date/Time: September 7th 2023, 21:00 UTC

Meeting Duration: 1 hour 10 minutes


**Agenda**: 

+ Welcome and Meeting Intro - []()

+ ECC Core Update - []()

+ Zebra Update - []()

+ Research & Implementation Update - []()
    
+ Open Discussion - []()

Video of the meeting: [recorded]


Moderator: Jack Gavigan

Notes: Jason Rogers



**Decisions & Action Items**

- Merge FROST documentation updates to Zebra Book 

- POS research - address this security issue by specifying the problem well 

- POS research - writing design for Trailing Finality Layer that maps to [ebb and flow paper](https://eprint.iacr.org/2020/1091.pdf).

- Formalise new ZIP editor process 

___



## Full Notes



___


### 0. Welcome & Intro 

[00:00] - **Jack Gavigan**

Welcome to the Arborist call. Arborist calls are a means for Zcash community to come together and discuss the Zcash Protocol.

[01:34] 

The purpose is to make discussion of Zcash core protocol development more accessible to a wider set of participants and to provide transparency for the broader Zcash community. Anybody can join these calls. All you have to do is register as an attendee, which you can do so by pointing your browser at [zcasharborist.org](https://zcasharborist.org) and if you want to present something, or if you want to raise a discussion topic, then you can do so by dropping an email to arboristcall@zfnd.org.

[02:10] 

Other ways to get involved in Zcash are to apply for a major grant by going to [zcashcommunitygrants.org](https://zcashcommunitygrants.org) and learning more about the Zcash Community grants program. We also currently have the second round of [Zcash Minor grants](https://zfnd.org/zcash-minor-grants-round-2/), open. That's a separate program that's run by the Zcash Foundation, and you can learn more about that by going to the Zcash Foundation's website.

[02:33]

A good place to get involved in discussion about the technical aspects of Zcash is the R&D discord. And finally there's a Zcash Community forum, which is always lively and spicy, with lots of exciting discussions from across the Zcash ecosystem. Links found at: [zcasharborist.org](https://zcasharborist.org).

___


### 1. ECC Core Update - Mobile SDK release candidate


[03:31] - **Kris**

So the main announcement from ECC is that we are rapidly converging on the release candidate for the next version of the mobile SDKs. Both the Android and iOS mobile SDKs. All of the changes to the Zcash core libraries in Zcash client backend and Zcash client SQLite are complete at this point. I think at this point we are in some final testing and should expect a release candidate tomorrow for the mobile SDKs.

[04:14] 

So that's been the primary focus, all of the work to get a non-linear sync, out-of-order sync and the ability to spend funds before your wallet is fully synced into the mobile SDKs. That's everything that we've been doing.

[04:40] - **Jack Gavigan**

Congratulations. Being focused on one thing and getting it done is absolutely great. Congratulations on being so close to having those released. 



___


### 2. Zebrad Status - Zebra 1.2 release 


[05:20] - **Marek**

Last week on Friday we released [Zebra 1.2](https://github.com/ZcashFoundation/zebra/releases/tag/v1.2.0), and that contains the deduplication that I mentioned two weeks ago. I realized I forgot to mention back then that we were shipping that change with an internal framework for database upgrades in Zebra.

[05:47] 

That means that users don't have to resync the whole node from scratch and rebuild the database if there's a database upgrade. But Zebra will do it on its own without any user interaction & we're using this framework to add the subtree roots for the new RPC method [z_getsubtreesbyindex](https://zcash.github.io/rpc/z_getsubtreesbyindex.html)) and that's also implemented. We're testing it and it'll go into the next release and that's all the main updates, basically.

[06:57] - **Teor**

Probably something that's worth mentioning is the upgrade we're doing at the moment is incompatible with previous Zebra versions in some fairly subtle ways. Once you've upgraded to Zebra version 1.2 and don't then go and use earlier versions with the same state because it might panic or give the wrong results in a particular RPC. You can see the details of that in the [changelog](https://github.com/ZcashFoundation/zebra/blob/6fc5db95978ad81a580dc042950ede83e76a2dee/CHANGELOG.md#L4).


___


### 3. Research & Implementation Updates i) - FROST audit & documentation updates


[07:49] - **Deirdre**

We are finalizing a couple of items. FROST implementation audit, mostly small things, but also recently to improve documentation about mostly the FROST libraries in general and how to use them. Also we're merging about how to use our FROST libraries for Zcash specifically and how it intersects with the general shielded Zcash signing process and the key tree and things like that.

[08:26] 

In the fixes that pertain specifically to the audit, we'll be doing a little [] so that will affect the public shape of the API. We are still in the beta versions of our crates, so this will be 0.* releases continuing with what we're doing, but this will lead up to 1.0 stable release in the future where we hopefully will not be rearranging the public API in that point.

[08:59] 

We'll be merging those Zcash specific docs to our [Zebra book](https://zebra.zfnd.org) soon, and we are preparing for our FROST and wallet dev community call. We were hoping to have a bit of a more in depth conversation with wallet devs at Zcon, but we didn't quite make it. So we're hoping to have a little bit more conversation to help wallet developers integrate and support signing for Zcash transactions into their wallets.So we're working towards next few weeks.

[09:42] - **Jack Gavigan**

Thank you, any questions or comments from the other participants in the call on FROST?

[09:54] - **Deirdre**

And all those updates will get pushed to our [crates.io releases](https://crates.io/crates/frost-rerandomized) soon.


____

### 4. Research and Implementation Updates ii) - Trailing Finality Layer research 


[10:13] - **Nate**

I just [posted an update to the forum](https://forum.zcashcommunity.com/t/the-trailing-finality-layer/45133/11) about Proof of stake research. So it describes how I gave a presentation at Zcon, it was a workshop.

[10:30] 

The content is somewhat underdeveloped for a design. It was a presentation providing the gist of the approach, and there was a lot of good feedback from the audience about concerns or issues. Since then, we have been looking into this primary concern and we're still trying to figure out how to specify it more precisely.

[11:01] 

But the English language version is: In the design there's 2 sub protocols. There's proof of work and there's proof of stake & often with security, security is limited by the weakest link in the system. So the question - is that the case here? If we have this kind of design, can an attacker compromise either component? And if they do achieve some attack, and if that's the case, is that easier for them or less costly than if the protocol were just pure proof of work or pure proof of stake?

[11:50] 

So that's what we've been focused on, and we've been doing some roadmapping just this week. So we have two milestone goals, the first one is to address this security issue by specifying the problem well and seeing what we can understand once we have that specified. Then also making sure we're writing down a design for Trailing Finality Layer that maps to the [ebb and flow paper](https://eprint.iacr.org/2020/1091.pdf) precisely so that we know that the results in that paper would hold for our design.

[12:37] 

That first pass at the design will exclude a lot of the actual staking details and mechanics, such as what is the issuance rate or how do users create staking bonds or delegate. All of that complexity won't be in that. So it'll primarily just talk about proof of stake as a black box connected to proof of work and then we're analysing the security from that higher level.

[13:14] 

The second milestone is we want to get started on writing code that we are refining as we proceed with the design. So we want to try to do this concurrently to make sure what we're doing is pragmatic and also to ensure that there's something usable or interactive that people can play with as it evolves. The first code target we want is to create some kind of simulation of the sorts of attacks we're analysing when we're doing this security analysis. So that's the gist of that status update. 

[14:06] 

And we will be doing regular status updates moving forward. So I would also like to be in this update slot in future Arborist calls. 


____

### 4. Open Discussion - Zcash Wallet Community Developer update

**Pacu**

I've completed the deliverables of Milestone 1 and posted the corresponding [forum update](https://forum.zcashcommunity.com/t/grant-update-zcash-wallet-community-developer-milestone-1/45562. Research and Development of Second Flush of Enthusiasm dataset for wallets is completed. Reviewed PRs for NightHawk Apps for the various development efforts they are doing. Carried on Community activities proposed for the grant

Milestone 2 is a short one comprising the first half of September. 
I will continue collaborating with Zingo Labs on ongoing Integration testing work:
- Nighthawk Apps: Pull request reviews
- Ecosystem outreach: Support partners (Unstoppable and Edge) adopting ECC’s SDKs release of Sbs (if needed)
- LCWG, Arborist and other community tasks
- Start porting Reorg tests to Regtest to have them available in all wallets.

The second half of September I'll be out of office from 14th to 28th of september. 


____

### 4. Open Discussion i) - ZSA zip editors update 


[14:56] - **Deirdre**

A quick update on qedit and ZSAs from the most recent ZIP syncs with the qedit team and ZSA stuff. There is a draft being worked on of v6 transactions that includes ZSA, Transfer, Issuance and Burn. So very happy to see that from the qedit team. ZIP editors will be continuing to look at that and work on that with them.

[15:23] 

We also got some updates from the qedit team on [] space in the updated circuits for transfer Issuance as well. We got those on Tuesday, so that was good to see. We're trying to use all the tricks from [] working on Halo2 and the orchard circuit to get it on chain as small as can be safely done.

[16:01]

I'll quickly mention that the qedit folks are looking to be developing as much as they can going forward, which is very cool we are very excited to see that. But we also don't have all the bells and whistles that Zcashd has such as a fully integrated wallet. So we're in discussions with the qedit team about what they're going to build and what the Foundation team has been thinking about of our future roadmap for the full Zebra project and what exists, may exist, things like that so that they can continue to move forward with ZSA's, but building it forward towards Zebra.

[16:43] 

Their proof of concept end-to-end chain recently has been built on Zcashd, which makes sense because they have all the pieces in place. But now that Zcashd is moving towards deprecation, we're happy to continue and start the discussions with the qedit team to get these things working in a Zebra-centric world. So that's [] so that's a little bit of ZSA stuff. We start [] about making the issuance key structure signing, the issuance signing operations independent in terms of parameters and the primitives that we use from we've talked about this before.

[17:36] 

The whole ZSA sort of thing was designed to be working in the Orchard shielded pool, but it is theoretically workable on any shielded pool, including future shielded pools, not just Orchard. So that incentivizes the design of issuing shielded assets to be independent of the parameters of any of the shielded pools themselves, including Orchard. So we talked a bit about moving it away from the current redpallas design to something else and we kind of sketched out some schnorr based signatures, but we haven't nailed it down yet. But that was discussed on that Tuesday morning as well.

[18:18] 

I think that's a good thing to move forward we all agreed that that's a good idea moving forward. I don't think that's been written up yet, but that should show up on those issuance ZIP's sometime soon.

[18:39] - **Str4d**

Just to follow up on that, because that was what I was raising my hand for. It's not precisely that. If we decided that Orchard and redpallas made the most sense, that would still be what we go for. But there's no need to bind them together and require that it's that and the current motivation, which is what I wanted to bring up specifically here, is that for HSM',s in particular, we think that it might be easier for deployment, for people doing issuance, like the people who are actually issuing assets for the curve or signature scheme that is used there to be something that is more easily or more widely deployed.

[19:37] 

Now a couple of candidates that could go that way, if anyone on the call has specific constraints related to this, now would be an excellent time to hear about them. It doesn't have to be in this call, but on getting in touch with us on the discord or the forums or somewhere if you are considering issuing assets in this way and have constraints on the way that you issue them, this is a good time to be giving that feedback.

[20:12]

As an alternative the current candidate that we're considering is BIP-340. So schnorr signatures with secp256k1. So it's another curve that we support being a fork of Bitcoin. It's not a signature scheme that we currently use anywhere on Zcash, so it would be new from that perspective, but it's one that bitcoin have moved to and so there's potential share in terms of mind share with the rest of the ecosystem in terms of deployment potentially, but there's still work to be done to see if that hypothesis actually plays out in terms of ease of use or whether it'd be better to go for a different scheme that is more easily deployed.

[20:56] - **Deirdre**

Yes.

[20:57] - **Str4d**

Feedback please.

[20:58] - **Deirdre**

100% and if you want to leave feedback, we have the [ZIPs repo](https://github.com/zcash/zips). We also have a community discord. The ZIP editors and the Qedit folks are all participating on the community discord. And we have a couple of channels in there where we're discussing these sort of items so those are places where you can get in touch. 



____

### 4. Open Discussion ii) - Changes to ZIP editors process


[21:26] - **Jack Gavigan**

One thing I think is probably worth mentioning on this call is that there is a proposal to add some more ZIP editors to the team. Deirdre, your audio is dropping in an ad a little bit, so I'll just ask Str4d maybe to describe what the plan is there.

[21:57] - **Str4d**

The rough plan in-part derives from some suggestions that Teor made. So there's a group of things there. But for the editors specifically, the thinking is that thus far it started off with basically just Daira Emma Hopwood and then a couple of ECC people helping out here and there. Then it transitioned into Daira Emma and Deirdre being the two primary ZIP editors and with a slightly larger group of people helping out here and there.

[22:31] 

But the larger group of people was somewhat amorphously defined. And so the thinking here is that moving to more formally having a few extra people A). Means that we can start to load, share a bit more in terms of how ZIP's are edited and reviewed and processed to be more efficient in the way that we get through things and B). share some of the decisional burden and shard out the requirements there away from putting a lot of stress onto a couple of people.

[23:19] - **Jack Gavigan**

Thanks Str4d.

[23:22] - **Teor**

Yeah, I can speak to some of the process changes apart from having more ZIP editors. So when you have more people making decisions, you have to think about a bit more about how you make those decisions. So the most significant change that we want to write down, which we've effectively been doing anyway, is requiring a consensus of ZIP editors to make significant changes.

[23:49] 

So things like accepting a ZIP, rejecting a ZIP, things that look like that, like making changes to an accepted ZIP, major changes, that is. That's one part of that and we're going to say you need consensus for that. Similarly, for adding or removing ZIP editors, I think we decided on consensus minus one person. But all of those details will be in the ZIP when I get to the ZIPs repository, when I get to writing them down. So one of the big changes is formalizing consensus decision making.

[24:27] 

As part of that formalising what a ZIP editor meeting is, so what it means to have what's called quorum, so enough people at the meeting for it to be official. At the moment, we're looking at one ZIP editor associated with the Foundation and one ZIP editor associated with ECC but we're happy to get feedback on that and then just some admin stuff.

[24:56] 

So having somebody, the ZIP secretary or whose job it is to post what's on the agenda a few days before the meeting and then post a summary of what significant decisions were made at the meeting. The other thing which the sustainability fund people have already experienced is we're going to split reviewing the content of ZIPs from reviewing the style and typo and those kinds of things, because content review requires a lot of engineers. But style reviews, you can just get one or two people to do that and then bring them back for approval. So those are the kinds of changes we're looking at making to the ZIP editing process. A lot of them we've been doing informally for quite a while anyway.

[25:59] - **Nate**

If I wanted to direct potential candidates as ZIP editors towards that to join, where should I send them?

[26:13] - **Teor**

Currently, we're having this conversation in the [#zips channel](https://discord.com/channels/809218587167293450/809251050741170187). So go to that channel and say "hey, I'd like to be a ZIP editor" and we'll chat about it at the next meeting when we review this draft of changes to the ZIP editors and the process.

[26:39] - **Str4d**

Some of that will be also easier for people to consider once the process changes have been written up. So that people because some of the process currently is, as with all process documents, the process is what actually is done. So part of the outcome of the changes here will be that people considering becoming ZIP editors will have a better idea of what their responsibilities are as part of that.

____

### 4. Open Discussion iii) - Deirdre Connolly leaving Zcash Foundation


[27:36] - **Deirdre**

So I've told this to some people.

[27:52] 

I'm leaving the Zcash Foundation. My last day will be September 13th, which is a Wednesday for me. So I will no longer be a ZIP editor, but I will be a ZIP editor until then.

[28:07] - **Zooko**

Where's the thumbs down button?

[28:12] - **Deirdre**

I'm going to work on different cryptography than Zcash, but I'll be in the world. I'm not going to disappear into a hole somewhere, but I'll probably speak more about what I'm working on and where I'm going when I start it in a couple of weeks. But yeah, I'm going to be leaving the Zcash ecosystem, at least formally as a formal employee, I just wanted to say that I grew up as a cryptographer because of Zcash, and a lot of you who are on this call and have been on these calls with me, it's bittersweet to kind of leave the nest, as it were.

[29:01] - **Jack Gavigan**

We've lost you again for some reason.

[29:11] - **Deirdre**

Anyway I'm going to miss you all, and I'm going to miss the amazing things that we get to do with Zcash, but I'm going to be cheering everyone on and Zcash on into the future, so I will see you around.

[29:31] - **Jack Gavigan**

The fact that you're leaving the foundation doesn't mean that you have to stop being a ZIP editor.

[29:36] - **Deirdre**

It doesn't, but I don't think I'll have the bandwidth to juggle so many things at once. Technically, it does not. You are correct.

[29:49] - **Nate**

Also, why not mash up whatever new cryptography you're working on into Zcash somehow? Is that possible?

[29:57] - **Deirdre**

You never know.

[30:01] - **Str4d**

I'm just happy that we are helping seed more people into the wider environment who care about cryptography and privacy.

[30:10] - **Deirdre**

Definitely.

[30:14] - **Jack Gavigan**

Zooko, do you want to say something?

[30:16] - **Zooko**

I was just saying thank you so much for everything you've contributed, Deirdre.

[30:21] - **Deirdre**

Thank you, Zooko.

[30:24] - **Jack Gavigan**

Yeah, I want to add to that and say it is definitely bittersweet, but at the Foundation, we take the attitude that we want to help support people in achieving their career goals, even if that path lies outside of the Foundation. So Deirdre has played a huge role in Zcash since long before I joined the Foundation, particularly with regards to Zebra and FROST, two big, huge projects that the Foundation has been working on for several years. So thank you Deirdre and I do hope that we continue to see and hear lots of you within the Zcash community as you get settled in and get your feet under the table in your new role.

[31:18] - **Deirdre**

Oh, and I'm still a co author on FROST, so I will still be kind of flitting in and out of FROST related threshold signature stuff, so I will at least still be around in that regard.


____

### 4. Open Discussion iv) - Detection Keys & Out of Band/Liberated Payments 


[32:12] - **Jack Gavigan**

I think this is actually one of the first formal discussion topics we've had on the agenda for arborist calls, and this is something that we chatted about briefly during the last arborist call. I wanted to put it formally on the agenda, and that's to talk about detection keys and out-of-band notes/liberated payments and the reason that I think that these two topics are related is because we obviously have faced sort of a scalability challenge over the past year or so where we have faced a situation where the need to scan the entire blockchain has placed undue burden onto wallets.

[33:03] 

There's been a couple of suggestions in the past that detection keys might be a way of reducing the computational burden of doing that scanning. But also I wanted to throw in the mix the idea that transmitting note information out-of-band may also be a solution to this and may also facilitate greater integration and deployment of Zcash within, for example, messaging platforms.

[33:32] 

And I know that there's been past work done on Liberated Payments which I think also plays into the sending ZEC using a messaging platform without necessarily knowing what the other person's Zcash address is. So I just want to raise this topic. I shall let Str4d speak.

[33:55] - **Str4d**

Well, I just thought for the benefit of everyone here, I'd just give a very brief summary of what these three things are. So currently, for shielded transactions, the way that you learn that you have something is by scanning the chain with your viewing key. A detection key - the idea there is you instead can detect the presence of a transaction for you with a detection key but that detection key does not have the capability to view what the transaction is.

[34:26] 

So it does reveal to whoever has it that this transaction belongs to you. It does reveal metadata, but it doesn't reveal the received amount and memo field and so on. The rough idea being that in that model you would give the detection key to a service who runs the detection for you with powerful servers and maybe that's something you pay for, and then they let you know what ones were for you and you go from there. And there's a few things we can get into related to that.

[35:01]

Out-of-band Notes, the obvious thing, just when you make a transaction, give that transaction directly to the person who's receiving it instead of you still submit it to the chain. But instead of the recipient having to scan the whole chain to find that transaction, you give it directly to the recipient. For instance if you're doing a payment via a QR code or something, that could set up a local transmission pathway to directly send the transaction.

[35:28] 

And then Liberated Payments, or I think the most recent term for it was URL encapsulated Payments. Essentially the idea there is to pre-compute a series of temporary wallets which each have some defined amount of funds, like 10 ZEC, 5 ZEC, whatever. Like having cash in your wallet where you have your bank balance accessible by your card, and then you have a series of notes that you can give individually to people. So the idea being that you've essentially prematurely paid out of your main account into these temporary accounts, and then to pay someone, you can just give them the spending key for that account. So for a brief window of time, both the sender and recipient have the spending key to the same account. The transfer is effectively instantaneous because you just transfer the money there. However, it is also revocable for some period of time because the sender can use the spending key, they still have to pull those funds back.

[36:35] 

So there's a sort of a trade off there in UX between the payment is essentially like bearer based instantaneous. However your wallet then needs to do a claiming process to actually claim what those funds are. But the advantage here is you don't need to know the address of the recipient to give them funds, you can just give them this URL. The idea of being encapsulated in a URL you can just give them this link that will then when they click it if they don't have a Zcash wallet it will say "hey, go to here and download the Zcash wallet to claim these funds" or if you have one it could claim them automatically. So I think that's a brief summary of the three.

[37:20] - **Jack Gavigan**

One thing I wanted to point out about the sort of claimable element of liberated payments is that it has a potential use case in a situation where you send the note information out-of-band but the person at the far end either doesn't receive it or it gets lost or something along those lines. Without the ability to reclaim back the funds those coins will be lost. So having the situation where you can send funds to somebody, send them the information out-of-band that they need to then claim those funds but still be able to claim them back if needs be, could be potentially important from a UX perspective. 

[38:13] - **Deirdre**

Yeah I just wanted to ask some clarifying questions I think around detection keys we need to add more key material to your Zcash address or your unified address. This enables you to optionally when the sender opts-in and you provide them with this extra key material in your Zcash unified address to use that to make the...

[38:51] - **Jack Gavigan**

Sorry Str4d do you want to address that particular?

[38:54] - **Str4d**

Well, to answer the question for everyone else on the call, yes, it does require additional key material and the unified address packet format is the sort of thing that would enable us to deploy that to users. If we wanted it to be uniform in that everyone used it, it would require essentially a network upgrade to require it and it would require users to all migrate to wallets that support that functionality.

[39:26] 

There are also a couple of different ways that this could potentially be done. We've tried detection key things in the past and many of the ideas at the time had various degrees of issues. The two most promising things I'm aware of at the moment are this idea of fuzzy detection keys which give some level of over detection. Where the side doing the detection doesn't necessarily learn precisely what ones were interested to you, they learn a superset but there's values that need to be tuned there and again it doesn't prevent data leakage, it just slightly reduces there's stuff we'd have to consider there. The other one is the idea of private information retrieval based schemes of which I'm aware of a couple that people have been playing with.

[40:30]

I know one of them exists because we were asked to make the Unified Address format large enough to support it. Which is why we can support like, up to 65 kilobyte, 64 kilobyte receiver types, because those ones were rather chonky. But that sort of one would leak less information to the server but might require more processing power. There's stuff that needs to be figured out there. I don't know if you caught it Deirdre, but I was just saying at the beginning, yes, it would need more key material and it would be like opt in to begin with. Yes, but it could be something that we force the network to upgrade to if we decided that that made the best sense for users.

[41:31] - **Nate**

So one way I think about these is that each approach is likely to have sort of different usability impacts or tradeoffs. So one place my mind goes to is, the first thing is, can we maybe start from the usability?

[42:02] 

For example, the Liberated Payments usability might be fairly distinct from the current protocol and the current thing wallets do. The other place my mind goes to, is, well, can we do them all? Because if some are better for some use cases or others, maybe that's something we could consider. And when I think about that, it becomes really valuable in my mind if we can do any of these without protocol changes.

[42:43]

I'm not too sure about the details there, but I'm hopeful that there might be a lot we can do without protocol changes. For example, maybe Liberated Payments is a good candidate for something we could do without protocol changes. And those are always appealing to me because that might mean, okay, we have current shielded wallets that operate currently in a particular way. Some users use them, they meet their needs to some degree. Oh, but hey, we could add new wallets or new features of existing wallets that support this new use case or user flow. Then we can see, is that useful for different populations of users?

[43:26] 

And we can sort of try multiple things, try to find product market fit with different kinds of usability and trade offs. But that all being said, that's more work. I'm just interested in keeping the door open to more experimentation with less need to coordinate on protocol changes.

____

### 4. Open Discussion iv) - Detection Keys & Out of Band/Liberated Payments cont.


[43:51] - **Deirdre**

Kind of related to what Nate was just discussing. Is there a compare/contrast to the fast sync/DAGSync changes that are getting deployed for the ECC's Wallet, but also for wallet SDK, plus something like incoming viewing keys, not necessarily full viewing keys that would be on the full node side, but with the full fast sync coming with the wallets.

[44:29] 

Was that fast enough to mitigate the cost of doing fast sync over lightwalletd and doing full scanning all shielded transactions with your full viewing key on your controlled wallet on your device. Not even trusting a full consensus node. Asking for numbers is a bit much, but is there a vibe of how much margin between lovely operating fast sync where you and your full lightwallet can just scan it and get everything you need to go with everything in your control? Versus something like deploying detection keys or versus something like scanning with a consensus node that you trust with an incoming viewing key?

[45:24] - **Str4d**

I don't know of any of numeric comparisons someone posted in the chat. Taylor Hornby did a nice lexicographical comparison, just wrote a [blog post](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) about it, comparing from privacy perspectives.

[45:45] 

As far as performance goes, a couple of notes first. Even with DAGSync, that doesn't help you find transactions that you've never seen before. If your wallet has observed things or you have some connection other than you gave out your address, DAGSync will help. It's also, as another reminder, we are not fully deploying DAGSync in this SDK release. We're deploying large parts of the internals of what would go into it, but it does not have the full scaling functionality that we want because that would require significantly more engineering.

[46:28] 

But as my feeling on numbers go, if you pair something like DAGSync with when your wallet is doing in person transactions, the transaction is sent directly from your device to your peers device, then that will basically cover almost every user not need to scan the main chain.

[47:00] - **Kris**

With respect to that question, isn't the primary difference between the lightwallet sync of potentially full transactions and compact transactions just the bandwidth cost? Because I don't think that the trial decryption should be altered essentially at all.

[47:29] - **Str4d**

Between full sync and compact sync, you mean?

[47:32] - **Kris**

Yeah, exactly.

[47:37] - **Str4d**

Improving versus what? Are you saying DAGSync versus current sync or what are you asking?

[47:43] - **Kris**

I understood Deirdre's question to be related to essentially to be, is the fast spendability the fast.changes and/or DAGSync, do they provide enough benefit to potentially offset the costs related to relative to the linear scan?

[48:08] 

I think that my answer to that would be that if scanning is not bounded by bandwidth, then there's actually no difference whatsoever. It's that compact scanning was originally designed in the context of - we want users around the world who may pay per byte on their mobile plans to have an option for downloading transactions that doesn't break their bank. But I think even today, implementing a client that downloads full transaction or full blocks instead of compact blocks, that's actually a pretty tractable difference probably for users in developed nations where their bandwidth is not a consideration.

[49:13] - **Str4d**

I thought the question though was comparing that to detection strategies or PIR.

[49:21] - **Jack Gavigan**

Do you want to clarify what the question was?

[49:24] - **Deirdre**

Yeah, I was mostly asking, can we get away with improvements in things like DAGSync that would in theory make it at least faster to not make consensus level changes, to not change the addresses very much, to require up to not have to do detection key changes or other on chain changes. Is that fast enough? We can define what enough is and does it buy us compute savings to make that marginally worthwhile versus things that require us to make consensus changes.

[50:17] - **Str4d**

That was what I was getting at, which is what DAGSync is leveraging is private knowledge of the wallet graph. Any detection approach is not going to have access to that information because it's on some level discovering that information.

[50:34] 

So to the extent of what DAGSync does it's going to be significantly better than any of those other schemes. The thing that it doesn't do is detection of things you've never seen before that have previously no connection to you. That is the area where I think that the cumulative cost for an individual user versus the server doing the detecting whatever the server's compute costs are likely to be much larger than the individual users are because of the fact that you can't aggregate these detection keys, fuzzy message keys maybe there's a bit that you can do there.

[51:24] 

But what you do gain from those detection systems is the economies of scale. So informally I would expect that someone trying to scan the same number of outputs even if they are trying to do so for like 100x more users because those users alternative is scanning on their phone. I would pick that overall the detection key scanning would probably end up faster/more cost effective even with that detriment in place simply because you can just throw very powerful servers at it for short periods of time.

[52:08] 

But like I said, if you can get around that by using peer to peer approaches then you basically obviate the need to do that and that is entirely out-of=band outside consensus.

[52:19] - **Zooko**

I think it's a good question. I have some intuitions but we'll find out more from deployment soon. But it can't open up the tradeoff curve with regard to scalability. Because without detection keys or even better, liberated payments, then each client still has to do something on each ciphertext in order to detect new incoming payments to that client. And that means if enough other people are also posting ciphertext then that's going to swamp your client and maybe detection keys but definitely liberated payments could open up that side.

[53:03] - **Jack Gavigan**

Yeah there is no silver bullet. I want to read out what Nate posted to the chat. He said

[53:11] - **Nate**

"I have one opinion due to practical needs, the current lightwallet scanning approach compromises on privacy for bandwidth. Doing so enables lightwalletd to associate a transaction ID with a client IP which is close to the metadata leaked by detection keys. So I believe they have roughly similar privacy, whereas detection keys may be significantly better in bandwidth and balance update alacrity for users. But my high level approximation may be overlooking important nuances."

[53:43] - **Jack Gavigan**

There's one aspect of detection keys that I think is important to recognize and that's that detection can happen either on the user's device. So the lightwalletd v2 server could send the detection key field of every transaction to the user's device for the trial decryption to happen on the user's device, or the detection could happen on the server side.

[54:18] 

Now, if it happens on the server side, there's obviously a cost implication to that depending on the scale of the user base that the server serves. But Paul Puey from Edge has suggested that that's not actually a big deal. Apparently they're doing it with monero and it doesn't cost them a huge amount, or rather the amount that it costs is outweighed by the benefits of having more users for their wallet.

[54:44] 

The other aspect that I think is probably worth bearing in mind is that if you are doing your detection on the server side, then the server can constantly monitor new blocks and it can notify you as soon as it sees a new transaction for you, which is a very different model from the current user experience of having to start up your wallet, wait for it to download, and then scan through all of those blocks.

[55:23] 

So you can receive a notification from the server side, which is doing live monitoring of the blockchain when it sees a transaction and that's something, for those ZF engineers who are listening that I plan to introduce as an idea with regards to zebra and viewing keys as and when we get around to doing that functionality, I'm going to stop there. Str4d do you want to say what you posted?

[55:54] - **Str4d**

Yeah, I just noted in the chat that as long as we still support the 'recipient writes their address on a billboard' use case I e. The donation QR code model, then we fundamentally have to handle the scan the entire chain to find all our transactions workflow.

[56:14] 

And that scanning has to happen somewhere. So either on each client individually, which gives you the nice broadband privacy, ideally in practice not that because of the lightweight issues. So if you can move UX away from that in general to more of a like user immediated interactions is what leads to transactions, then that you already essentially have a channel open between the user and the merchant or the user and the person they're sending funds to.

[56:53]

If you have that channel open already via some trusted pathway, then leveraging that immediately to do the transaction detection enables you to use the much faster techniques and get away from that scanning process. But if we want to retain the address billboard: that's another way to potentially solve this problem is to move the UX away from patterns that need to support broad scale scanning, which also has the benefit for the long scale future of if we decide as a community to move away from having everything be recoverable from the chain, for instance, which is something that won't scale infinitely, so is something that chains will have to deal with. And as we've seen from the last year, where the blockchain ballooned 10x in size is something that is going to have to be dealt with.

[57:53] - **Zooko**

But Str4d, what if the QR code on the billboard contains routing information for getting a message to that recipient? Then that recipient does not need to scan the blockchain.

[58:02] - **Str4d**

That is precisely what I said to the last person who asked me about this is like I have a donation case, you can't kill that. And I go, I would love to just stick a tor hidden service in there or a NYM mailbox or something. But again, that is about moving that UX to that pattern. Currently the UX for doing that is just post your Zcash address.

[58:23] - **Zooko**

Okay, but what you said is wrong if you can include routing information in your QR code.

[58:35] - **Str4d**

What I said was recipient writes their address on a billboard.

[58:39] - **Zooko**

So if the word address in that sentence excludes routing information, that's true. But if you include routing information in the QR code that doesn't change the UX. You still post your thing on a billboard and people then send you money and you then get the money without scanning the blockchain.

[58:56] - **Str4d**

It does potentially change the UX because you need the routing information to be stable enough to be able to be posted on a billboard, which certain things can enable, but that does constrain the kind of technology you use for that. Whereas there's more that would need to be built into that to make that kind of thing work, as opposed to currently where the routing information is just the cryptographic address you receive payments at, which is able to be far more stable.

[59:27] - **Zooko**

Okay, so a way to say it is that that use case requires either scanning the blockchain or having sufficiently stable routing.

[59:35] - **Str4d**

Yeah.

[59:39] - **Jack Gavigan**

Touching on UX, I just want to read out something that Andrew Arnott posted in the chat. He said:

[59:46] - **Andrew Arnott**

"Detection keys sound like a huge UX win, but messaging will be super critical, emphasizing that this is opt-in, for example, so that news doesn't say that Zcash is sacrificing privacy."

[59:58] - **Jack Gavigan**

And he also pointed out that these notes, the idea of liberated payments where you can literally hand funds to others could also help with offline scenarios. For example, if he wants to pay his cousin for food at a reunion in the mountains where they don't have internet.

[01:00:15] - **Jack Gavigan**

I think there's some interesting use cases, ideas and scenarios that get thrown up by this, which in one respect what str4d said is right. If someone puts their as it currently defines Zcash address up on a billboard then we need to support that use case of scanning the entire blockchain. But we start trying to think about things in a different way. Like, for example, cash. And also potentially if we start looking far ahead to a world where we potentially roll out some kind of scalability solution that involves some kind of rollup then this need to be able to transmit note information out-of-band of the actual blockchain I think becomes more urgent and more attractive.

[01:01:12] 

The idea of being able to roll up the entire Zcash blockchain into a tiny state representation could be potentially hugely interesting and though that other blockchains are exploring doing that but yeah, I'll stop talking. I guess I'll add the phrase that it's a paradigm shift, I think, for cryptocurrency to say right "instead of using the blockchain as both a messaging layer for transmitting information about how to claim the funds that have been sent to you and a ledger which prevents double spending. You separate them out and use a separate messaging layer where you don't have to store those messages on the blockchain forever. But the ledger remains the really important part that prevents the double spending remains on the blockchain."

[01:02:29] - **Str4d**

And some part of that then becomes - what is the functionality that matters in terms of people using Zcash? Because the other way to look at this is a related use case that we've had similar discussions before about is I make a shielded a spending key, I send funds to its address and then I stick that key in a vault for 10 years. Should I still be able to use those funds afterwards?

[01:03:22] 

Because that one there doesn't actually require onchain storage they could store the note information in that same vault. So that's sort of a separate issue of how long should funds in a pool be usable in the form that they are. But it is similar to the onchain storage thing from the perspective of what are the costs to the chain of maintaining state long term and what are the costs in terms of usability and privacy and ability to service different facets of users of having that state there or of not having that state there.

[01:04:10]

So it's lots of fun stuff to think about here in terms of which users we are choosing to support and which users we are choosing not to support within the scaling model that we want because it will be the case there are just some use cases that are completely incompatible with scalable privacy.

[01:04:48] - **Jack Gavigan**

One of the reasons that this whole topic of out-of-band notes and the messaging links to it has popped up is because regards to the deployment of FROST, there is a requirement to facilitate or enable communications between the participants in a FROST circle for carrying out operations like signing and whatnot.

[01:05:19] 

That implicitly potentially one solution there is to have some sort of a messaging solution could be done over signal, could be done on a blockchain for coordinating those types of operations. But obviously having a messaging layer that facilitates those sorts of operations and that can be easily integrated into wallets opens up the question, well, what else could we use that for?

[01:05:53]

If you have someone's address to send them information out-of-band of the blockchain then it opens up that possibility of being able to do out-of-band notes. But I should make it clear that we're a very early stage of exploring that whole solutioning. So don't assume that me mentioning it here means that anything's going to happen very quickly or anytime soon or even in a form that matches what I've just described.

[01:06:57] - **Str4d**

I did want to note that while detection keys are a trickier thing to set up and play with, technically it is possible to shoehorn them in outside of consensus if someone really wanted to play with them by just overwriting memo field space of dummy notes to sort of like stick tags into your transactions in semi undetectable ways.

[01:07:26] 

So there are things that people can do to play with this just to get some experience with the UX out-of-band notes is completely in the hands of wallet devs because it is literally just a wallet to wallet interaction pattern. So it would be very interesting to see people try out different ways of building those interactions, hopefully in a privacy preserving manner and if you have questions about that, hop in the Zcash R&D discord and ask about it there and then liberated payments. I don't remember if we had any demo stuff implemented from that.

[01:08:08] 

We had some designs that were pretty far along, but if someone was interested in putting together some initial demos or tests of that kind of thing come and have a chat to us in the Zcash, R&D discord and we can point you in a direction if you're excited about playing around with these, because none of these things are going to happen without someone picking up the baton and running with it. But all of these detection keys a bit less so because a lot of cryptographic complexity there. But all of these essentially are and amenable to someone just coming along and saying, I am invested in trying to make this a reality and having a go.

[01:08:53] - **Jack Gavigan**

We have a minor grants program which would be perfect for someone to do a bit of experimenting and bit of prototyping and play around with it a little bit. And I'm pretty sure that there are wallet devs out there who would be interested in facilitating, collaborating on that sort of thing. So if you are listening to this conversation, whether live or afterwards within the next, I think, eleven days, and you're interested in potentially putting finger to keyboard to try and build something along these lines, then please go to zfnd.org Minor Grants. Learn about the Minor Grants Program, which is ideal for funding either an individual or a small team to build something along those lines.

[01:09:48] - **Str4d**

That's Minor grants, yes.

[01:09:54] - **Jack Gavigan**

Last time I had the benefit of having the text on the screen, but M-I-N-O-R grants. Yeah. We don't give grants to miners. 

[01:10:09] - **Zooko**

Are minors eligible? I know some minors who might want to apply. Wait, did you mean people who dig ore out of the ground?

[01:10:19] - **Jack Gavigan**

I mean people who dig ore out of the ground. People like HP Billet and people with big trucks and huge diggers.

[01:10:26] - **Zooko**

Just to clarify, if anybody who's under 18 is interested, should I tell them to apply?

[01:10:30] - **Jack Gavigan**

I think so, yeah.

[01:10:32] - **Zooko**

Awesome.

[01:10:36] - **Jack Gavigan**

Okay. Are there any other topics that people want to discuss? I think we've got 17 minutes left on the scheduled calendar entry, but I appreciate that people might be a little bit talked out and may have a lot that they want to take away and think about.

[01:11:05] 

We will see you again in a couple of weeks at the next Arborist call, which will be in the earlier time slot of 15:00 UTC. Thank you, everybody, for attending. Deirdre. Farewell this I guess, is your final arborist call, at least as a Zcash Foundation employee. Like I said, don't think you're going to escape Zcash that easily and thank you again for all your contributions and work and the key role that you played in getting Zebra to being a functional production quality node implementation for the Zcash ecosystem.

[01:11:50] - **Deirdre**

Godspeed Zcash and Zebra and everything else. I'll see you around.

[01:11:57] - **Jack Gavigan**

Thank you everybody. See you again in a couple of weeks.

_____

Attendees:

+ Teor they/them

+ Daniel (decentralistdan)

+ Deirdre Connolly

+ Jack Grigg

+ Kris Nuttycombe

+ Marel Bielik

+ Nate Wilcox

+ Pacu ZWCD

+ Yasser Isa

+ Zooko AtECC

+ Andrew Arnott

+ Michael Harms

+ Oleksandr Putyak

___
___

**Next Meeting Scheduled: 15:00 UTC September 22nd 2023**