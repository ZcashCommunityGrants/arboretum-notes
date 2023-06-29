# Arborist Call #55 Notes

Meeting Date/Time: June 29th 2023, 15:00 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro 

+ ECC Core Update - [Zcashd 5.6.1 hotfix](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#1-ecc-core-updates----zcashd-561-hotfix) 

+ Zebra Update - [The Zebra Audit](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#2-zebrad-status---the-zebra-audit)

+ Research & Implementation Update - [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#3-research--implementation-updates-i-frost-update) / [QEDIT Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#3-research--implementation-updates-ii-qedit-update) / [Nighthawk Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#3-research--implementation-updates-iii-nighthawk-updat) 
    
+ Open Discussion = [halo 2 in hacspec](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#4-open-discussion-i-halo-2-implementation-in-hacspec) / [Arborist Call timing](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#4-open-discussion-ii-arborist-call-timing) / [DAGSync status & details](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2055-Notes.md#4-open-discussion-iii-dagsync-status--zip-editor-position)


Video of the meeting: [recorded]


Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes



### 1. ECC Core Updates -  zcashd 5.6.1 hotfix 


[02:58] - **Kris**

I think the main announcement for this week is that we've released a hotfix release of zcashd. So [zcashd 5.6.1](https://github.com/zcash/zcash/releases/tag/v5.6.1) that deals with a fixes a bug that 5.6.0 introduced with respect to maintaining the note commitment trees in the Orchard Wallet.

[03:24] 

So that is out and is definitely recommended for anyone who had previously upgraded to 5.6.0 to upgrade to. We are aware of another issue with the zcashd orchard wallet in 5.6.0 and 5.6.1 that we're still working on. Apparently it has been possible since at least 5.5.0 and perhaps earlier, for note information to be retained in the orchard wallet for notes that were that were never mined to the chain, for notes and transactions that were never mined.

[04:17] 

In that case, one of the things that the 5.6.1 upgrade does is it will trigger a rescan of the Orchard Wallet if it detects an inconsistency where the wallet knows of notes, but doesn't have all of the information necessary to spend them. And in this particular case, where the wallet knows of un-mined notes, it doesn't inhibit the spending of those notes. But what it does is it causes a rescan on every zcashd launch, which is inconvenient.

[04:58] 

We're working on mitigating that but that's the current state of zcashd. Aside from that, we're getting really close to a lightwalletd release. So the work there is essentially complete. There are just a couple of questions about the protobuff encodings that we're using that we may want to resolve before we have a full release.

[05:32] 

Then we are also in the final steps of the updates to librustzcash that are required to make the ECC Lightwallet SDK's able to take advantage of all of this new infrastructure and are expecting to have at least the librustzcash parts of those done by next week then there may be a little bit of time while we're still pushing those out through the SDKs, but I think that's it for what's going on at ECC right now.

[06:44] 

So we tagged our [1.0.0 stable release](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0) about two weeks ago. In the meantime, we keep cranking on stuff. We are working on integrating the latest updated crates from the ECC, like incremental merkle tree and things like that, so that we can also support fast-sync via lightwalletd on our backend, so that work is in-flight.

[07:20] 

One thing that we did notice is that things going from like a 0.3 to a 0.4 had some breaking changes in terms of how they serialized things or stopped serializing things altogether, which is making it take a little bit longer than we had originally expected. But we're working on that. 

[07:45] 

Deirdre, we should discuss that offline because there is serialization code available for everything. It may just have moved.

[07:56] - **Deirdre**

I don't know if that was in any changelog or anything like that. Yes, we should sync up on that out-of-band. Let me pull up some of the more relevant stuff.



___


### 2. Zebrad Status - The Zebra Audit 




[08:22] - **Deirdre**

So we've completed our Zebra audit. NCC Group has published their [final audit report](https://research.nccgroup.com/2023/06/29/public-report-zcash-zebra-security-assessment/) on their main blog, and we are going to also upload it to our repository for Zebra, coming soon.

[08:56] 

So the scope of this audit was all of the rust Zebrad code. But also some of the dependencies that we have written ourselves or very much depend on, such as the wrappers for Zcash script and some of the work that goes on in Zcash proofs because we strongly rely on it for maintaining consensus & security and we weren't sure of the audit state of it, so we asked them to look at it for us.

[09:30] 

Basically, we are very pleased with the results in this audit. We had one medium finding which has been addressed, which was a fragile management of peer addresses in our address book, or state management of when you're changing what we know about that address in our address book. Then the rest of the findings were low or informational, or just "here is a performance optimization that you could do to save you one scalar mull" and we were like, thank you, things like that.

[10:11] 

But every finding has either been already fixed in the current version in 1.0.0 of Zebrad, I think there may be one change that has already been merged into main. So I think our 1.1.0 or 1.0.1, we haven't decided the number yet, will include one final change, which is basically changing a thing that would panic if we didn't have enough blocks to check something and changing it to an error instead.

[10:44] 

But this is a bit long, so there's about 50 pages of findings and we will be posting that on the [Zcash Foundation blog](https://zfnd.org/blog/) as well. But we're very pleased at the results of this audit and we hope that it will help bolster, 'Belt and suspenders' trust in Zebrad as a full consensus node for the Zcash network.

[11:13] 

It also includes some small things in the [ed25519 Zebra library](https://github.com/ZcashFoundation/ed25519-zebra) that I know that multiple people use, including outside of the Zcash community. Like we weren't fully zeroizing memory at some point, or we were logging things with a debug imple that we wouldn't like to log because it could easily spill into log files or something like that for secret data so we no longer do that, things like that.

[11:40] 

So if you have questions or feedback on the audit, we are on the ZF discord as well. But that's big news that only went public this morning. So very excited about that. We've been working with the NCC Group cryptography services team for many weeks. They've been great. Big thanks to them.

[12:05] 

I'm trying to think of other things that are going into the next release. As soon as we tagged 1.0.0, we unblocked all these PR's so we've been merging a ton of stuff into zebra since 1.0.0 we didn't take a break. But besides the needing changing something from a panic into an error, we're allowing more flexible configuration in our docker artifact. So we basically released Zebra as crates on https://crates.io & also as a docker container image on [Docker Hub](https://hub.docker.com/r/zfnd/zebra) and the way that it was designed originally was based around how we were doing deploying Zebra in CI and automatically deploying it and running it and configuring it and it was less easy to change that config when you're just running that artifact and you would like to change, say, initial peer set or how much logging or turning the tracing support on/off, things like that.

[13:13] 

Now we're making it a little more easier to use and configure Zebra in that way if you're using our docker artifacts. One of the big pieces of feedback out of the audit that was useful is that our state layer, Zebra State, was not very understandable to an independent party.

[13:37]

We have multiple layers of contextual validation for blocks, and contextual validation for us is: after we've made sure that these things are well formed, after we've verified all the signatures and the proofs independent of the chain state, we take a block that has passed all those other checks, and then we're trying to check it in the context of a chain or one of the possible chains within the reorg limit, like on the main chain that we've already finalized. So we've been doing some refactoring and some renaming of some of the stuff in Zebra State because it was confusing enough to our auditors of what exactly was going on in there and how a contextually finalized block versus a contextually non finalized block and all these things were that we're changing that up so a lot of work has gone into that and that's been merged in as well.

[14:37] 

There's a lot of stuff in here that will be into our next release, which is probably coming in the next week. I think we started a merge freeze already. That's some of the big news from Zebra right now. 



___


### 3. Research & Implementation Updates i) FROST update


[15:44] - **Conrado**

Hi, everyone. So what's going on? We merges it support for Serde so people can serialize and deserialize the structs that are required to be sent back and forth during FROST protocol. We're still working on the demos. We're also doing a demo for the DKG, the distributed key generation process. So basically we're doing demo for everything that FROST supports, and that's going well.

[16:11]

We're doing some cleanups and we're starting the audit. The FROST audit is starting next week, which is also exciting also by NCC. So, yeah, we're looking forward to that. Lastly, I mentioned last time that there's going to be a small change to the specification because we weren't hashing the public key during the binding factor computation. So we had basically Chelsea posted on the CFRG list that we were planning to do this and we're waiting for feedback. No one said anything so far, so hopefully no one will have any objections. When that's merged, we're going to also make the equivalent change to the library. But it's a very simple change.

[17:09] 

I'm not sure if it's been scheduled or not, but probably next week will be a community call about FROST. So we're talking about how to reduce FROST with Zcash.



___


### 3. Research & Implementation Updates ii) Qedit Update


[17:47] - **Vivek**

So for the updates on the ZSA project on the ZIP side, we've mostly been fixing the consistency, the mathematical equations and naming of variables, those sorts of things in the past few weeks and making sure everything's consistent between both the implementation and the spec.

[18:12] 

On the implementation side, I think a lot of the work that we've ended up doing over the last few weeks has been merging and rebasing over the updates made on the Zcash repos. This will obviously ensure that our ZSA can make use of the new changes that have been made. I think we've done that for Orchard and Librustzcash, but zcashd is still we are not fully done with that yet.

[18:44] 

Another change that happened recently was we've changed the way nullifiers are derived for the split notes in the ZSA protocol. So I should thank Daira and Sean for helping us out with that and coming up with the final concrete suggestion that seems to be secure.

[19:06] 

We've added those changes for the nullifier derivation to the implementation, but those updates haven't made it into the ZIPs yet, so I'll be working on that and that should be updated soon. Another thing is that we are considering having a separate PDF to document the circuit changes in the changes to the circuit for the ZSA protocol and then link that from the zips. It seems that that gives the best balance of not inflating the ZIPs too much and keeping the context of how the circuit changed.

[19:41] 

So let's see, that's what we have in mind. We can discuss that further and we can see how that goes. For the asset swaps part of the thing. We came up with some initial design ideas for the asset swap, so just wanted to mention that works. Also been going on in parallel and we are planning to maybe have a ZIP number set aside for that so that we can start the spec sooner than instead of having the spec and implementation in parallel because with the ZSA protocol that's led to some amount of going back and forth and changing the implementation multiple times.

[20:27] 

So this time we'll try and work on having the spec more concrete much sooner. Yeah, I think that's my update for this time and not sure if I'll be able to make it to the next one. So if a month later it'll be Zcon, hope to see you most of you all there.

[21:41] - **Deirdre**

For Vivek. Do you have a draft of your circuit changes PDF visible anywhere?

[21:50] - **Vivek**

Yeah, we definitely do have a draft. I think we've shown it during the ZIP syncs. It's the same that you might have seen as well.

[22:01] 

I didn't get URL. Yeah, I'm not sure I have the URL either. I'll have to check with Constance, but we'll try and share it with you all.

[22:14] - **Deirdre**

Awesome.

[22:15] - **Daira**

Can you just share it on the zoom call on that?

[22:22] - **Vivek**

Yeah, I'll do that if I can. I'll just have to check if I have the document access. I mean, I've never opened the document myself, it's usually been Constance doing it, but I'll do that if I can.

[22:54] 

Okay, yeah. Do you want me to just share the link? Oh, I'm not sure I can do that. Do you want me to share my screen and show you?

[23:03] - **Daira**

Yeah, if there's any problem with sharing the link, if it's a read write link or anything like that, then share the document. Yeah, I joined late because I was having problems with my computer zoom wasn't working properly. So can you just briefly summarize because I know there was the problem with the circuit that I found. Does the draft circuit document include the changes for that?

[23:46] - **Vivek**

Like with the nullifier derivation?

[23:49] - **Daira**

Yes, I believe it does.

[23:56] - **Vivek**

Yeah. So I think that should be there in the circuit document, it's not in the ZIPs. Like, I haven't made the changes in the split note section of the ZIPs as yet.

[24:08] - **Daira**

No, that's fine, I can use the circuit document to review it.

[24:16] - **Vivek**

Okay, sure.

[24:23] - **Daira**

Does everyone know what the problem was there? Just to briefly summarize, would I be repeating something you already said earlier in the meeting?

[24:34] - **Vivek**

No, I didn't talk about the specific change.

[24:37] - **Daira**

So basically you might know that one of the security properties for anonymous payment scheme is spendability or more specifically resistance to Faerie gold attacks and roadblock attacks, which are where you create a note. So if someone tries to spend a note, then they will publish the transaction. The transaction is not necessarily in the chain yet or there might be a reorg and then an adversary can look at that transaction and potentially stop you from spending a note. So that was the form of attack, that was the problem and the way to fix that was to change how the nullifier was derived. I think that's enough detail for you can look at the ticket for ZSAs on GitHub if you want to know more detail.

[25:46] - **Deirdre**

Is that in the ZIPs repo?

[25:49] - **Daira**

Yes.

[25:57] 

I'll put a [link in the chat](https://github.com/zcash/zips/pull/680#issuecomment-1583802844).

[26:12] - **Deirdre**

I like the idea of the circuit document being included. One of the things to just make sure of for perpetuity is to keeping all the documents together and to avoid link rot or anything like that for being able to nail down the full Zcash shielded protocol, including ZSA's when they've fully landed. So if you want to submit it for the full PDF to be in the ZIPs repo, that's a nice option because it just keeps it with the other ZIPs and they can get published on a GitHub pages equivalent website as well.

[27:10] 

I'm just aware that we have an [Orchard book](https://zcash.github.io/orchard/) over there and we have a [Halo 2 book](https://zcash.github.io/halo2/index.html) and we have [ZIPs](https://zips.Z.cash) and we have ZSA's and we have the [protocol document](https://zips.z.cash/protocol/protocol.pdf).

[27:20] 

We have a lot of stuff in a lot of places that you have to look at, especially now, of how to figure out how to do Zcash, especially modern NU5 or now NU6 Zcash. So you are very welcome to just commit it or put it in the [ZIPs PRs](https://github.com/zcash/zips) whenever you feel comfortable, just putting it out there.

[27:45] - **Daira**

Yeah, call it something like protocol/zsacircuit.pdf or something like that.

[27:51] - **Vivek**

Okay, sure.

[27:55] - **Deirdre**

Great. We may need to find a nice folder for it, but whatever, that's fine. I'm also aware of the fact that.

[28:11] - **Daira**

It can just be kept with the protocol spec, I think because I'll change the makefile. So do you have source files for that as well? Is it a LaTeX document?

[28:25] - **Vivek**

No, at the moment we are working just with Google Doc. So that's why right now we might format it better before we actually submit it. At least for now we are working with this because it's in flux.

[28:43] - **Daira**

Right. If you put the existing PDF in the PR, the same one that I just linked and that would be fine for now.

[28:58] - **Deirdre**

This is on my brain because when we finalize the security proof for re randomized threshold signatures it is directly for the Zcash use case. We want to make sure that security proof document just doesn't float away. So we're probably just going to commit it to the ZIPs repo along with the ZIP that lays out how to do re-randomized FROST for Sapling and Orchard. So that would not live in protocol. It might live in a different folder but still in the ZIPs repo just.

[29:34] - **Daira**

Right, because that's not consensus.

[29:39] - **Daira**

Whereas the ZSA circuit would be consensus if it was adopted.

[29:48] 

Yeah, for the FROST thing, just add a FROST folder.

[29:52] - **Deirdre**

Okay.

[29:57] - **Vivek**

Regarding the Google Doc, I don't seem to be able to share it outside of qedit from

[30:05] - **Daira**

In that case, let's not worry about it because it's going to take too long.

[30:09] 

For now we can add like an initial version to the PR and we can go from there.

[30:18] 

Thank you. The interaction between ZSA's and how we currently handle preventing roadblock attacks and faerie gold attacks is a little bit subtle. The general approach that I suggested, calculating a different nullifier and the way that you did that using our seed split, that should be relatively easy to adapt the security analysis that I did for Zcon 3 to that.


___


### 3. Research & Implementation Updates iii) Nighthawk Update


[31:48] - **Adi**

So about the nighthawk wallet. We have implemented a parallel sync mechanism in both the iOS and Android native apps, which significantly improves the wallet syncing speeds. So this enhancement will ensure a smoother UX for our users.

[32:09] 

And these enhancements are built upon the robust [Secant project](https://github.com/zcash/secant-ios-wallet/) architecture that will have enhanced performance and security. On the distributed infrastructure front, we have been monitoring our automation setup and the node upgrades that went on from version 5.6.0 to 5.6.1. Also, for the Zcash Block Explorer, we've updated the main net and testnet frontends to respond to the updated zcashd node v5.6.1. That's pretty much it for now. Thanks.

[32:52] 

There's a question about the DAGsync, so that's another work. There's still a lot of moving parts it has to go through to make that work. But even before DAGsync comes, I think this parallel sync mechanism which simultaneously downloads and scans for transactions, reduces scanning speed considerably. So we look forward for shipping that when we can.

[33:18] - **Daira**

Yeah, that should be complementary to the other changes that we're making.

[33:23] - **Kris**

Yeah. The initial phase of DAGSync work is the librustzcash and Wallet SDK work that I alluded to in the ECC update.



____

### 4. Open Discussion i) Halo 2 implementation in hacspec 


[34:18] - **Deirdre**

I don't know if this is an announcement, it more leads into a question. There has been an implementation of most of [Halo 2 in hacspec](https://hvassaa.github.io/hacspec_halo2/) by some Masters students independent of Zcash.

[34:36] 

Hacspec is a functional subset of Rust that has a formalization to various proving system backends such as Coq, Easycrypt, and F*. This work has basically done the hard work of specifying and not just specifying, but formalizing in math terms, not just writing it down in a IATF style spec. The PLONKish arithmetization that's sufficient to do this work, the pasta curves and most of the Halo 2 proving system on top of those piecesit's and available on [GitHub](https://github.com/Hvassaa/hacspec/tree/master/examples/halo2).

[35:21] 

This is exciting because one, it gives us a formalization of Halo 2 that we didn't have before, this is non-trivial work. I think hacspec makes it easier to do. It's a wonderful tool, especially if you like those sort of functional style programming languages with low side effects. And it gives us an opportunity to have even more high assurance, trust and confidence in the Halo 2 implementations that we deploy in Zcash.

[35:57] 

So I just wanted to kind of flag that. That's very cool for us and I wonder if there's any sort of interest or kind of putting work on the back end of trying to either tie or test or see how the hacspec Halo 2 ties into the Halo 2 rust crates that we are all using in production right now.

[36:26] - **Daira**

Yes, I have considerable interest in that. I'm very enthusiastic about this spec because I think that because it's a functional subset of rust, you're right, it's going to be a lot easier to maintain than if, say, we were doing this directly in Coq, which is a formalization language. Nathan asked "does anyone have a link to that project?" Yes, let me try and find the link.

[37:10] - **Deirdre**

Googling. It is a failure. I think they've upstreamed it partly into the main hackspec repo. No, I was wrong. It's in a fork..

[37:58]

And there's a master's thesis to go along with it so it's not just, yes, I think it's this one. I have asked them explicitly in the hacspec Zulip that we would love this to just be upstreamed. They have a collection of examples and it's like a growing library of like you don't need to implement SHA256 from scratch in hackspec you can just pull in the thing from their examples library. They are intending to do that at some point. So it's not going to live on a fork forever. I put the [link to the repo implementation](https://github.com/Hvassaa/hacspec/tree/master/examples/halo2  ) in the chat.

[38:55] - **Daira**

I'm just putting the link to the [rendered version](https://hvassaa.github.io/hacspec_halo2/).

[39:01] - **Deirdre**

Yes, this is another pro of hackspec, it is just rust. It's just a small subset of rust that they could show a formalized mapping of how you do these functional things in the subset of rust to these formal mathematical notions and so you can prove things about them. So you can do Rust doc. You can have your documentation, just render a full doc website for you with the same rust tools so they are able to spit out this whole web page with all of the pieces ready for you. So it's very nice like that. We can post more links to their thesis work. I think I was tweeting about this at some point.

[39:50] - **Daira**

Yeah, there was a PDF as well. I'm not sure I see it in that repo.

[39:58] - **Deirdre**

I think it might be in another of their repos from the same author, but I'm not actually sure. But yeah, very exciting. There can be further nontrivial research work, if anyone wants to do it, of tying together the Halo 2 implementation that the ECC has done and that we rely on to this formalized specified implementation it is all of those things whether that is the angle we want to do to tie them together, or if there's some sort of cross compilation that we would rather do.

[40:41] 

Because one of the things to highlight is that this is a fully working implementation pretty much of Halo 2. It's not just a specification, it's not just a way to translate it to math. You can use it in rust code, but it may not have the performance optimizations, storage and memory optimizations that we would really like compared to the Halo 2 implementation that the ECC has done.

[41:14] 

So we would have to benchmark it. But also it's more likely that in general, you have an implementation in a spec language like hacspec, and you have the production one, but you want to show that they are doing the same thing that they are, in the parlance, there's some sort of proof of indistinguishability or something like that between these things.

[41:44] - **Daira**

Even something well short of a formal proof would be useful. You could start with an informal argument that these two pieces of rust code are doing the same thing.

[42:51] - **Deirdre**

So there are definitely options from straight forwardly just like test them against the same inputs to give assurance all the way up to having formal proofs that these things are the same, that one is implementing the other, there's a whole range of things that we can do to take advantage of this formalization in terms of higher assurance of what we're deploying in production. But it's just very exciting. So I just wanted to make sure that the inventors of Halo 2 and the people that did the first implementation were aware of it. It's very cool. It's very exciting.

[43:38] - **Daira**

Yeah. One step on that ladder of potential checks is to do a quick check style test that the two implementations correspond to each other and even though that is not a formal proof, what it does do is it gives you a lot more confidence that the two implementations do correspond.

[44:10] - **Deirdre**

Indeed.


____

### 4. Open Discussion ii) Arborist Call Timing


[44:58] - **Dodger**

I just wanted to mention again that we're thinking about moving the later edition of this call to start earlier. So it currently starts at 22:30 UTC which is currently 23:30 UK time & 00:30 European time. So we're thinking about moving it earlier to start at 21:00 UTC and I just wanted to flag that up to everybody and if they have any thoughts, feedback, any objections, like it was too early for people somewhere on the west coast state, just let us know. I'm sure that the people in Europe may appreciate that or maybe that actually people in Europe won't join anyway because it is still too late. 

[45:58] - **Daira**

This would help me a lot. Yeah, there's an 8 hour time difference usually between the UK and the west coast, so that would be 1:30PM on the west coast, so that seems probably okay for most people.

[46:18] - **Dodger**

1 PM, we're thinking about 21:00 UTC.

[46:22] - **Daira**

Sorry, 21:00 is 1PM, oh right.

[46:33] - **Dodger**

We just want to flag that up. Any comments? You don't need to comment now. Feel free to drop it in the #arboristcall channel on the Zcash R&D discord. I might also announce this on our so far unused kind of [Engineering Section](https://forum.zcashcommunity.com/c/rd/45) of the community forums. That's it from me.


____

### 4. Open Discussion iii) DAGsync status & ZIP editor position


[47:17] - **Luca Campobasso**

Hi, I'm Luca. I kind of represent Eiger. I'm one of the ones that worked on the [UniFFI Grant](https://forum.zcashcommunity.com/t/zcash-uniffi-library-addenda/44570). We were wondering, we were curious about the status of the work on the DAGSync for the librustzcash, at what point that is and if there is any help we can give?

[48:05] - **Kris**

I can give a bit more detail to update on that. So right now there are, I think, three related PR's open. One on the [Incremental merkle tree repository](https://github.com/zcash/incrementalmerkletree) and two on the [Librustzcash repository]((https://github.com/zcash/librustzcash)) that are the sort of point of that effort.

[48:29] 

Those are currently in review. They've just gotten some comments in the past couple of days that need to be addressed, but those should be ready to merge this week. Then there's one more piece that I'm currently working on. The way that wallets are going to interact with the initial implementation, this is not the full DAGSync, but what we're calling pre-DAGSync or fast spendability and the way that wallets will interact with that is that they will be able to query for suggested ranges to scan.

[49:05] 

Those suggested scan ranges will be ranges that are required in order to fill out the wallet's note commitment trees and then additionally heuristically ranges related to activity on the wallet. So under the assumption that people open their wallet when they're interested in either spending notes or expecting to receive notes or something of that nature. So there's already work ongoing on the wallet SDKs to take advantage of the API's that have already been exposed or to prepare for taking advantage of those API's for pulling down the necessary intermediate note commitment tree information from Lightwalletd and passing that over to the Zcash client backend.

[50:04] 

Now the remaining piece is just the suggested scan ranges. So I see a question in the chat of "what further changes will be happening to Lightwalletd when DAGSync is fully rolled out?" We don't anticipate right now any additional lightwallet changes being necessary beyond those that are where we're in sort of the final stages of releasing those that will just be additional updates to the SDK.

[50:40] - **Luca Campobasso**

Okay, so you're basically saying that you're already actively working on it and let's say in a couple of weeks other wallets should be able to use it.

[50:54] - **Daira**

Yes. So the fast spendability changes I am trying very hard to get all of those complete and to a point where they can start being integrated through the FFI next week.

[51:14] - **Vivek**

So.

[51:15] - **Luca Campobasso**

I know the [librustzcash repository](https://github.com/zcash/librustzcash). You mentioned other two elements to this.

[51:22] - **Kris**

So right now there are two pull requests open. One is 831 and the other is 861. [861](https://github.com/zcash/librustzcash/pull/861) builds upon [831](https://github.com/zcash/librustzcash/pull/831). So 831 is the one that just got feedback in the last day or two that I have to address and I'm working on that today then 861 will be rebased on that.

[51:59] - **Luca Campobasso**

Just to contextualize this question, because we lately submit to the ZCG for another grant on the UniFFI and Taylor commented that he would support to see a common sync lib library. I guess that's what you're building right now right?

[52:27] - **Kris**

The idea of Zcash client backend is that that library provides interfaces and common code that could be used across a number of wallet backends. The API changes there that are reflected in 831 and 861 are the sort of user facing parts of that. Then implementations that support those API changes in Zcash client SQLite. So I think that in terms of a sync library, there are obviously a number of ways to go about sync. I am not certain yet whether there is for example, the possibility for a common API that could serve both warp sync and the new fast spendability sync approach and then also the future DAGSync approach.

[53:45] 

Simply because in all of these cases, the sync algorithm has some state that it has to maintain. And the way that you maintain that state is kind of critical to the capabilities of the algorithm. So, for example, the current fast spendability changes maintain the essentially stateless or request response nature of the Zcash client backend API's and maintain the state in a persistent backend database. With the plan for the full DAGSync implementation, the full DAGSync engine would maintain a significant amount of data in memory and the ways in which that memory ends up getting flushed to persistent storage those patterns would be substantially different & it's not clear that the same API's would be appropriate for those two sync approaches.

[55:02] 

I guess the upshot of all of that is that sync and data storage, or at least data storage access patterns, are pretty intimately related. So a sync library is also going to be somewhat opinionated as to the capabilities that it expects for data storage.

[55:29] - **Luca Campobasso**

Okay, thank you for the pretty extensive answer.

[55:36] - **Daira**

And if people want to discuss this further, what channel should they use? 

[55:45] - **Kris**

#walletdev on the R&D discord is a great place to ask questions.

[55:50] - **Luca Campobasso**

Okay, thanks.

[55:53] - **Kris**

And there also will be a [Light Client Working Group](https://github.com/zcash/lcwg) meeting, I believe, in about an hour from now. And so if you're interested in joining that, I'll post a link to the Light Client Working Group and Wallet Dev channels when that starts, because that's a good forum for discussing this more deeply.

[56:22] - **Luca Campobasso**

Sure. Not today, unfortunately, but for the next meeting, maybe I will be interested.

[56:36] - **Pili**

Thank you. Anyone else have anything to discuss?

[56:51] - **Daira**

We're still looking for a third ZIP editor. Deirdre any comments?

[57:04] - **Deirdre**

I haven't heard any applicants or anything like that, but yeah.

[57:14] - **Daira**

So basically experience in document editing standards, anything like that would be useful. But just if you're the kind of person who likes writing and editing specs read ZIP-0 on https://zips.zcash to see what the job entails.

[57:46] - **Pili**

And the current editors are yourself, Daira, and Deirdre, then, yeah.

[57:55] - **Daira**

This would be a volunteer thing, not a paid position. Maybe we should pay ourselves for doing ZIP editing.

[58:15] 

You could maybe get ZCG Grant to be an editor.

[58:24] - **Pili**

That could be very interesting, actually. Okay anyone else? We still have 15 minutes, but I think it looks like we are done so I would like to thank everyone who participated today from the ECC, Qedit, Eiger as well, and the Zcash Foundation. We'll see you next time. Not me, because it's too late for me, but the next call will be on Thursday, 13 July at the 22:30 slot. Thanks, everyone. 



_____

### Attendees


+ Zcash Foundation  

+ Adi Nighthawk

+ Daira Emma

+ Deirdre Connolly  

+ Conrado Gouvea

+ Kris Nuttycombe 

+ Nate ZEC

+ Pacu G

+ Vivek  

+ Andy Murray

+ Dan Wolande 

+ Luca Campobasso 

+ Mandeep Bhalothia 

+ Oleksandr Putyak 

+ zero d



**Next Meeting Scheduled: 22:30 UTC July 13th 2023**


___
___

