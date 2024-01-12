# Arborist Call #68 Notes

Meeting Date/Time: January 11th 2024, 15:00 UTC

Meeting Duration: 1 hour 20 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Zebra Integrated Mining Support](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#1-zebra-update---zebra-integrated-mining-support)

+ ECC Core Update - [zcashd 5.8.0 / Mobile SDK ZIP-317 Orchard support](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#2-ecc-update---zcashd-580--mobile-sdk-zip-317-orchard-support)

+ Research & Implementation Update - [Zcash Shielded Asset update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#3-research--implementation-updates-i-zcash-shielded-asset-update) / [Trailing Finality Layer update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#3-research--implementation-updates-ii-trailing-finality-layer-update) / [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#3-research-and-implementation-updates-iii-frost-update)

+ Open Announcements - [zkProof 6 Standardation Event ](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#4-open-announcements---zkproof-6-standardation-event)

+ Out-of-Band Payments - [zksend Demo](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#6-out-of-band-payments-i----zksend-demo) / [Liberated Payments / URI Encapsulated Payments](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#6-out-of-band-payments-ii----liberated-payments--uri-encapsulated-payments)

+ Open Discussion - [Binance Exhange Address Proposal]() / [Binance Exhange Address Proposal cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#7-open-discussion-i---binance-exhange-address-proposal) / [Zebra Full Node Wallet Proposal](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#7-open-discussion-ii---binance-exhange-address-proposal-cont) / [Zeboot ECC x Community Event](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2068-Notes.md#7-open-discussion-iv---zeboot-ecc-x-community-event)


## Decision & Action Items

i) Merge Teor's updates to Equihash crate.

ii) Document URI encapsulated payment mechanism 

iii) Share case study of Binance Proposal with Crypto Policy advocates

iv) Kris & Rene to discuss technical approaches of Zebra wallet 

___


Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


___

### 1. Zebra Update - Zebra Integrated Mining Support

[01:30] - **Arya**

New in Zebra since the last Arborist call: Integrated mining, credits and thanks to Teor for adding experimental integrated mining support to zebra at a lightning fast pace with additional credits and thanks to Strad for helping make the Zcashd Equihash solver accessible from a rust environment.

[01:44] 

It's now possible to mine blocks within zebra with the internal miner feature and a couple config fields. There are also several related cleanups and improvements related to the getblocktemplate RPC as part of this work. Disclaimer; this feature is still experimental and is only intended for testing. Use at your own risk.

[02:01] 

There were also fixes in CI and for the experimental elastic search feature in zebra. And there's the new write typed batch and typed column family structs for strongly typed column families so that the types for a RocksDB column family are only defined once and so that developers can't accidentally use different types for reading and writing.

[02:18] 

I'm personally very excited about this one since it should make it much harder to make mistakes and much easier to verify correctness. Then finally, Zebra scan now avoids scanning blocks below the sapling activation height and is more clearly documented. That's it for the zebra update.

[02:33] - **Pili**

Great, thank you. Who do we have to give an update on zcashd?

[02:41] - **Daira**

I wanted to ask a question about the mining support. So this is cpu mining, right? What's the current status of doing ASIC mining with Zebra?

[02:55] - **Arya**

I don't believe we've made any progress in that direction as of yet.

[03:00] - **Str4d**

I think as far as I'm aware that is just using separate mining software in the same way that a mining pool would. So using like getblocktemplate or something, which Zebra does have support for.

[03:16] - **Daira**

Okay, so it can be made to work.

[03:19] - **Str4d**

Yeah, I think that's been working for a while. As I understand it is just for things like Testnet or potentially the backend Zcash doesn't support it yet. But eventually we could add a way to hook up the regtest parameters so that you could do like integration testing that involved mining.

[03:42] - **Kris**

You might have missed it in a previous Arborist call Daira, but Marek successfully mined a mainnet block with a miner hooked up to Zebra.

[03:53] - **Daira**

Yes, I remember that now.

[04:02] - **Dodger**

Daira, I just want to highlight that as Arya mentioned, this is intended for testing only. So this was done to help the Qedit folks with their testing of stuff. Is not intended for production use, is not intended for mainnet. Testing only.

[04:30] 

We have a problem where we say a word like 'wallet' or 'mining' & then everybody jumps to the conclusion that we're going to build a wallet. This is for testing only.

[04:56] - **Str4d**

So the fact that it's now included, does that mean that the changes that Teor was making on top of my initial draft Equihash PR on the [Equihash crate](https://github.com/zcash/librustzcash/pull/1088) are stable?

[05:12] - **Arya**

May still be a bug or two in it, but for the most part it works.

[05:15] - **Str4d**

Because basically if you can let me know once it's stable, I'll merge Teor's into mine and then do some cleanups on the commit history to integrate the things together into that.

[05:30] 

Because I know there's at least one bug outside of the zebra usage, which is that it's still trying to compile the code when it's feature flagged off. So there'll be a bit of work to figure that out before we can get that merged. If you can let me know once the zebra's usage of it is stable, then I can take some time on a Friday to poke at and get the PR into a state where we can get it into the Equihash crate.

[05:58] - **Daira**

Also worth pointing out that I think that tromp solver code has never been thoroughly reviewed for memory safety.

[06:08] - **Str4d**

Yeah, it'll be behind a feature flag. So for zcashd's usages of it, we don't have to use it initially, but also Zcashd does use it because we pulled that code out of there.

[06:31] - **Arya**

First, I think zebra's usage of it is currently stable. It should merge into main soon.

[06:39] - **Str4d**

In that will probably not this Friday, but maybe next Friday. I will do some cleanups on that.

[06:52] - **Marek**

I just wanted to say that the main motivation for the miner in zebra was testing and allowing Qedit to progress faster. Regarding ASIC's, I think all of them rely on the stratum protocol, and I don't think it would be worth implementing that into zebra because mining pools are like the middleware between getblocktemplate and stratum.


___

### 2. ECC Update - zcashd 5.8.0 / Mobile SDK ZIP-317 Orchard support

[07:56] - **Kris**

From the ECC wallet team side, I don't remember was the Zcashd 5.8.0 release that has happened, I think, since the last Arborist call? I think that's right. That's a maintenance release of zcashd. Apart from that, the ECC team has been focused on mobile wallet support.

[08:29] 

So we are close to having both [ZIP 317](https://zips.z.cash/zip-0317) and Orchard support ready for inclusion into the [mobile wallet sdk's](https://github.com/Electric-Coin-Company/zcash-android-wallet-sdk). So that's going to happen in the next week or two. Then the other things that we're working on are mobile SDK performance related at the moment.

[09:04] - **Str4d**

There's one additional thing. For people who are using the mobile sdk's, there had been a problem for a while. There was a build time problem if you were using too new a version of Rust because of changes to the Android NDK. We have finally wrangled the linker in the correct way to resolve that problem. So the next release of the Android mobile SDK will include that, and we should be able to shift back to just building with stable rust from this point forward.


___


### 3. Research & Implementation Updates i) Zcash Shielded Asset update


[10:08] - **Vivek**

Best wishes for the new year, I guess, from everyone at qedit. We have a few updates on the Zcash Shielded Assets front, the first one is actually the work that was happening with Zcash Foundation on Zebra.

[10:23] 

We've been building the testing framework and one of the issues was the mining, which I think now Teor's things looks like it's going to be helpful. So thanks for that. Yeah, that's one. The other thing we've been up to is generalizing the code in the orchard crate so that it supports both v5 and v6 transactions at the same time. So adding generics and stuff so that we can reuse as much code as possible.

[10:50] 

I think the same is going to happen for the circuit as well. On the ZIP side, we had some comments from the ZIP editors since the last Arborist call, and we've incorporated those in. I think they were mostly rearrangements, making things more understandable, readable, and I think in one case less ambiguous. But that hopefully is getting close to the end of things.

[11:23] 

On the Asset Swaps project front, we've had an [initial design](https://github.com/zcash/ZIPs/issues/736), as I think mentioned before, it's been out for a couple of months and we are trying to see if there's any improvements or any additional things that we can add in but I'm hoping that we can get the ZIP out as PR instead of just the Google Doc that it is right now, and hopefully in a week or two so stay tuned for that. 

[11:59] - **Dodger**

I've got a question for you, Vivek. Could you just talk a little bit about why the mining functionality in zebra is helpful for you? Because I think it touches on a topic that we discussed in the past Arborist calls around testnets and testing and the ability to spin up testnets etc.

[12:22] - **Vivek**

So I think basically how it is, is that we want to test with ZSAs and then we also want to test with the native ZEC asset and I think at present you cannot mine directly into an orchard shielded address. So that's been one of the things which we've been working around by trying to mine to transparent addresses and then shielding it and things like that. 

[12:48] - **Daira**

To clarify, the protocol supports it, but zcashd does not and I think Zebra does not.

[12:54] - **Kris**
I'm pretty sure that zcashd does support mining to orchard addresses. I've done it before. So there's some confusion there.

[13:11] - **Daira**

Yeah, I don't think it's specifically prevented. And if you've tested it, then presumably it works.

[13:23] - **Dodger**

Maybe Vivek and Kris could connect and discuss that.

[13:29] - **Jon Rouach**

Well, that's on Zcashd and we're trying to have most of our work in Zebra.

[13:37] - **Vivek**

I mentioned, it was for zebra. I think the support is not there at present

___

### 3. Research & Implementation Updates ii) Trailing Finality Layer update


[14:48] - **Nate**

Yeah, so we have integrated all of the writing into one location. So that's called the [Trailing Finality Layer book](https://electric-coin-company.github.io/tfl-book/introduction.html) and we're working on the simulator and we are planning to prepare like a short presentation for the zeboot, which is happening in a couple of weeks. So we can probably also do that presentation for Arborist I think. 

[15:23] - **Daira**

That sounds fine to me.

[15:25] - **Nate**

Yeah. So that should be ready in about two weeks and we are sort of going to spend some of that time before zeboot building out a speculative roadmap all the way to what a deployment would look like which will be like a roadmap with the steps, the milestones, but not necessarily the dates and things like that, because there are a few unknowns. But that should just help everyone understand what the sequence of steps might be if we want to deploy this kind of change.

[16:10] 

So hopefully in about two weeks we'll have those things ready to share. And there's still plenty of design work yet to be done. So that's going to be on the roadmap.

[16:21] - **Daira**

Speaking of design work. So I had a pairing with Str4d explaining the Crosslink protocol to him and he suggested that there might be a way of simplifying it.

[16:37] 

Currently the BFT chain is able to snapshot an arbitrary set of snapshots of currently the proof of work chain as long as the score (the accumulated work) of each snapshot increases. What Str4d suggested was that instead we should not allow rollbacks in the snapshots.

[17:08] 

So essentially each snapshot would be a descendant of the previous one, and it's tricky to analyse liveness for that. Analysing safety follows from the previous design because this rule is stricter than the previous increasing score rule.

[17:39] 

So I need to do a little bit of work on analysing liveness for this variant, and if it works out, then it might sort of reduce the changes that are needed in order to implement this and also provide a better experience because it means that the dynamically available chain has stronger safety properties.

____

### 3. Research and implementation Updates iii) FROST update

[20:18] - **Conrado**
Yeah, don't have much to report. We have people taking time off on the holidays. So basically resumed it. Working on adding socket communication to the demo that we have so that you can use over the Internet. But that's it.

___

### 4. Open Announcements - zkProof 6 Standardation Event 

[21:03] - **Jon Rouach**

Actually, there's something brewing on the ZK proof side. You know, the standardization event. It looks like we might have ZKproof6 in Berlin right before ETHBerlin. So on May 20-24th. So it's not confirmed yet, but it's looking very likely. So if anyone is in the area of Berlin around that time, it's going to be pretty interesting. Very relevant to people doing zero knowledge. 

___

### 6. Out-of-Band Payments i) -  zksend Demo 


[22:36] - **Dodger**

Okay, let's move on to talk quickly about detection keys. The reason I want to raise this know it's one of my favorite topics. Josh Swihart, recently appointed CEO of the electriccoin company, has [raised it on the forums](https://forum.zcashcommunity.com/t/improving-ux-with-detection-keys/46372) and he mentioned they had a conversation with Paul Puey from Edge. I had a similar conversation with Paul and Josh also mentioned some of Taylor Hornby's comments.

[23:12] 

This is the [ticket](https://github.com/zcash/zcash/issues/6756) that he links to where Taylor talks about the need for us to effectively get away from needing to scan every transaction in order to be able to detect transactions intended for a specific key.

[23:30] 

He talks about liberated payments and transaction tags. I also shared earlier today what i am calling an evolutionary path instead of a roadmap. Because if you say the word roadmap, people assume that a) You're going to do it for certain and b) They start demanding timelines. So Nate, I feel your pain when it comes to leaving out dates on these things, but I personally see detection keys as a key stepping stone towards a more scalable architecture for Zcash.

[24:08] 

One of the reasons, not the main reason, but one of the reasons behind our work on adding support for viewing keys to zebra is that when we've added support for viewing keys, it'll be really simple to add support for detection keys. There's a lot of overlap in terms of the purpose and functionality with regards to an external client.

[24:40] 

Further down the line after we have detection keys, then we'll be in a position to move to a situation where we can start to use out-of-band transmission of note details. And I want to pull in Jon here to maybe do his little demo of some stuff that's going on elsewhere outside of the zcash ecosystem. Daira you have a question?

[25:13] - **Daira**

Yeah, so I think those are independent. Sending transactions out-of-band and detection keys. You can do either or both.

[25:23] - **Dodger**

Yes they are. 

[25:31] - **Jon Rouach**

It's a fun demo, I hope, because it's extremely simple. Let me see if I manage to do it. I have no stake here and I didn't build any of it, me or anyone in qedit team, but it's called [zksend](https://zksend.com/auth). Do you guys know about it? zkLogin, zksend?

[26:06] 

Alright. So check this out. My Gmail is going to be kind of doxxed here. But on my Gmail, I have a few SUI that were granted to me by the guy that built this, Costas. And I'm creating a link for 0.3 SUI. And first one to grab it won. So please grab it, because otherwise I can't do the demo. This is your money. Just take it. Who's the first one?

[26:53] - **Dodger**

Also, Jon, I want to highlight something here, because we're going to talk about this in a moment, you can also reclaim the funds yourself. So this is really important. Okay.

[27:04] - **Jon Rouach**

Yes, I can. I can reclaim it. Before someone took the money. Who took it?

[27:19] - **Kris**

I did.

[27:34] - **Jon Rouach**

Okay. I'm going to try to reclaim, and he's going to tell me, buggers, you can't reclaim this because somebody took it. But the point here is this: The person that claimed this. Kris, when you claimed it, can you confirm you said 'You basically said, I want to log in with my Gmail account' and you had this little thing where you selected which Gmail account, you clicked on it, and that's all you had to do. You didn't save twelve words or you didn't do any of this stuff.

[28:18] 

You just basically received the money because your identity comes from Gmail and this is how it works. It's pretty neat stuff. So this is like Google, the 0auth provider. There's zksend, this application you just saw. They issue public private keys, and they ask Google to sign the public key. So there's a JWT token that comes back from Google with that public key in one of the fields signed by Google.

[29:02] 

And then there's a zero knowledge proof that that private key was signed by Google. 

[29:09] - **Daira**

Who makes the proof?

[29:10] - **Jon Rouach**

So you could make it yourself. But this is like a proving service that's provided for you, which this blockchain gave. So you're basically with that proof and with signatures, regular signatures of ephemeral keys that are discardable. You can move your tokens and claim your tokens, et cetera. So here in the app, there's some sort of nonce or salt of what goes here.

[29:42] 

There's a few more details that I'm skipping, but basically with a proof and with some FML keys that reveal nothing on you, you're now the owner of those tokens under your identity and anywhere you'll go with this identity if you're capable of generating a JWT token from Google, you own the funds and you can send a few funds.

___

### 6. Out-of-Band Payments ii) -  Liberated Payments / URI Encapsulated Payments

[30:19] - **Daira**

Can you go back to the [architecture diagram?](https://sui.io/zklogin)

[30:37] 

Okay, so I'm looking at the blue boxes here, and obviously they are potential points of failure for either privacy or security. So what do each of them know and what are you relying on each of them for?

[30:55] - **Jon Rouach**

Awesome question. Here's the deal. I want to very quickly do a deep dive of this and present this to the Zcash community as one of the contenders of a full zero knowledge, consent based identity. I'm looking for other contenders for this type of work and I want to dedicate actual time to do this right and we will examine what you said and anything that I can think of. I think we need to move fast on this because it was possible to do it for a while, but now it exists.

[31:35] - **Str4d**

But just to clarify and make sure that my understanding is correct here, the proof there is a proof of validity of an OAuth signature. So it ties back to some public keys that Google provides or whatnot. That's what the chain is tying back that trust to?

[31:58] - **Jon Rouach**

Yeah. When you verify the proof, you also have access to an oracleized version of their public key, which Sui network gives to you. I think it's not so easy to have those keys available. There's like a hop of one API call and so an oracle needs to happen.

[32:21] - **Str4d**

Okay and then the other question for the zksend part. In the workflow you had there, that involved I presume, a proof of stake blockchain in behind there or something?

[32:36] - **Jon Rouach**

So I'm not entirely sure all the details of how sui works, but I think it has staking.

[32:47] - **Str4d**

That would explain why it was so quick if it's block times are on the orders of a couple of seconds. Because at least without knowing the details there, that feels in terms of UX very similar to what we had proposed for liberated payments where you're just essentially creating an intermediate transaction that is controlled both by the sender and recipient, or in the case of liberated payments, whoever you want. Whereas in this case it would be interesting in that it could be scoped to only being controlled, like the middle transaction, only being usable by the sender and recipient's IDs and no one else, which is an improvement in terms of that over the pure bearer tokens.

[33:32] - **Daira**

Well, I stated it's a trade off because you're relying on centralized identity.

[33:37] - **Str4d**

Send me the link to that proposal because it's going to figure in the SoK.

[33:44] - **Daira**

Absolutely. Yeah. We should compare liberated payments with this and other approaches.

[33:51] - **Str4d**

Yeah, because liberated payments were a 2019 era approach, so they didn't involve like customs zkp's and stuff.

[34:32] - **Jon Rouach**

Tt's based on Groth16. They did a trusted setup a few months back. Okay, thanks.

[34:40] - **Dodger**

You said that it relies on an OAuth service of some kind. In principle, and I'm sure somebody will correct me if this is wrong, within the zcash context, we don't have to rely on a third party service in order to be able to adapt or change the Zcash protocol to make it possible to send payments that can be claimed either by the recipient in the form of a zcash address or by the sender.

[35:12] - **Daira**

Agreed. Yeah.

[35:15] - **Str4d**

The centralized party comes in in terms of when you're wanting to bind it to a centralized identity provider, unless that identity provider provides a way for trustlessly confirming that something is bound to them, which was my earlier question. It sounds like currently the 0Auth providers don't because it's kind of misappropriating what they're doing, but, like, in a really neat way.

[35:45] - **Daira**

Apart from the user, there were four other blue boxes on that diagram, each of which could potentially violate privacy or some soundness property, some safety property. So we need to dig into the details.

[36:10] - **Dodger**

Part of the context for that is around out-of-band node transmission. This is something that. These are concepts that have been around for years, and when we talk about a GitHub issue that's been around since 2019, I would strongly suggest that we close that GitHub issue and open a new one, because a lot of things have changed, a lot of water has gone under the bridge, and there's a lot of new work that has been done outside of the Zcash ecosystem that we should be reviewing and looking to see if there's anything that we should be looking to take advantage of, rather than sticking to a not invented here mindset.

[36:50] - **Daira**

Well, I mildly disagree, because I think it's worth documenting the original proposal for liberated payments, which would not be that much work, and then we can go from there.

[37:03] - **Str4d**

Yeah. Also the original liberated payments design had aspects of it that were specific to the kind of UX that it was trying to achieve, which I haven't seen anyone use elsewhere yet, to my knowledge. So there are still aspects of it that I think would be interesting to potentially fold in.

[37:24] - **Daira**

For a start, it doesn't require an interactive protocol, it's just one shot.I

[37:31] - **Dodger**

I think we may want to consider the terminology that we use, because to my mind there are two types of liberated-ish payments, before somebody starts arguing about definitions.

[37:52]

The first one is where you send a payment that can be claimed by whoever receives that message, no matter who they are & these are both relating to out-of-band node transmission.

[38:08] 

The second one is where you're able to send a payment in a way that allows the recipient to claim the payment if they have the correct Zcash address. If they control the relevant Zcash address.

[38:30] - **Str4d**

There's sort of like either 2 or 3 orthogonal axis here that are relevant. There's the out-of-band transmission aspect, which applies even to current existing Zcash usage, which is relevant for the scaling aspect of scanning. The thing that liberator payments was actually we had renamed to [URI encapsulated payments](https://docs.google.com/document/d/19I45TlOQo5kxvFhgDXPuLUWq07Hy5mU2ER1s8UWT2gk/edit), which is not as nice a name, but was more like accurately describing what it did.

[39:06] 

That's more about the benefit that it provided less than being out-of-band was more that you didn't need a wallet to receive a payment. That was the UX benefit that was intended there. The third aspect is binding to the receiver's identity, or some representation thereof and at least with URI encapsulated payments, we didn't have the ability to both enable recoverability and enable you to receive without necessarily having a wallet, because if you don't have a wallet, you don't have any identity to receive it to.

[39:50]

The proposal with the oath one is kind of similar in that there is still a race in terms of who can claim that first, who sees the QR code first. So functionally it might actually not be that different from that perspective, but there's maybe a third axis there that could potentially be explored.

[40:18] - **Dodger**

You said that the person didn't already have a wallet, but would it be more accurate to say that the sender does not know what the recipient's Zcash address is and they don't necessarily have to already have a Zcash address?

[40:34] - **Str4d**

Yeah, you could say that those are equivalent. Yes, the two parts were, which I think I see is the same size. Like the sender doesn't know the receiver's address, which may or may not be because the receiver doesn't have an address yet. They obviously need to create a wallet in order to claim it. But you were able to take possession of it, like via a signal message or something, receive a message, and you are now one of the bearers of that token. So whoever clicks the claim button first would be able to do that.

[41:13] - **Daira**

What I was going to say is, with regard to identity, there's two ways of thinking about identity. You can think about it as: Is the intended recipient getting the funds? The recipient intended by the sender.

[41:33] 

Or you can think of it as: Is a specific person getting the funds because the sender knows they want to send to a specific person? 

[41:45] 

The second of those involves an indirection, which is what introduces the perceived need for centralized identity. And I think, well, if we can achieve always getting the money to the intended sender without relying on centralized identity, then I think that's preferable.

[42:16] - **Dodger**

I'll just comment that it might be preferable for some people, the opposite might be preferable for other people.

[42:24] - **Daira**

Well, if you want to document that you sent it to someone with an identity that is understood by other parties who are auditing that record, then yes, that might be useful, but even that, I think doesn't require centralized identity.

[42:52] - **Nate**

Yeah, for this trade off, can't we get something pretty good? That's the best of both worlds? Like if I could send Zcash to a Gmail address or to a z address, then wouldn't that allow users to sort of choose which systems they're using? Is that still a concern to you, Daira?

[43:18] - **Daira**

That sounds fine to me. So they can specify who the intended recipient is in a variety of ways, and if they choose to do that with a centralized identity system, then fine, but the system should not pressure them into doing it that way, even implicitly I think.

[43:46] - **Dodger**

You all should also check out what Jon actually showed us and tried out and there's multiple options I believe for the identity.

[43:51] - **Kris**

Yeah, there are multiple options for identity available because I think that it's actually any OAuth provider from what was presented to me,

[44:01] - **Daira**

It's still assuming that you have a third party provider that is implementing OAuth infrastructure is not trivial, so it's not going to be just anybody. In practice that implies something centralized.

[44:20] - **Dodger**

Let's not let perfect be the enemy of progress here.

[44:25] - **Daira**

That is true, but on the other hand, we are implementing a private cryptocurrency and that has implications for how identity is conceptualized and implemented.

[44:37] - **Nate**

Yeah, I think probably most of the people on this call get this, but I just sort of want to say it for the recording. So the benefit of integrating with, say, Google OAuth should be pretty obvious. There's a lot of Google OAuth users and people already use those identifiers. The risk if the system relies on centralized providers too much, or especially the risk if that's the only option, is that then that provider is a gatekeeper.

[45:13] 

So first of all, they can decide which users can have an address and what address they can have. They can take addresses away, so on and so forth. So as long as it's not baked into the system and there's still the ability to just use Zcash addresses or anything a user can generate on their own without going through any gatekeeper, then hopefully that mitigates that concern.

[45:44] - **Daira**

There's also the issue of privacy from the identity provider. So logically, there's no necessity for the identity provider to have any knowledge of the transaction. But is that actually a property of any given system? Can the identity provider see that you're doing a transaction? Oh no, you're a bad person because you sent it to this socially stigmatized recipient and then punish you by restricting other uses of that identity, for example.

[46:27] - **Dodger**

So the context of this is, number one, changing, enhancing or adding functionality to Zcash. That takes us in different axis. But one of the theme that I think this aligns with is the idea that we cannot continue forever having a single ledger to which every single transaction gets written. So we got a thumbs up from Daira.

[47:23] 

We simply cannot continue forever. And obviously we need to think carefully about how we migrate away from the current model. But the current model is that the Zcash ledger is used both for recording transactions and therefore ensuring that the transactions aren't double spendable, and also communicating the information that the recipient needs in order to be able to spend the transaction that they have been spent.

[47:53] 

We decouple those things, then that's what we're talking about in terms of out-of-band note transmission. If we move to out-of-band note transmission, then it unblocks us from being able to move to what I think is our end state, at least within the foreseeable future, which is a succinct, Mina style blockchain model.

[48:19] 

But that requires that every transaction is sent out-of-band, that no transactions are written to the blockchain in the medium term. I think that as we migrate to out-of-band note transmission, one of the requirements that we are going to have to put in place is the ability for the sender of a transaction, as Jon just demonstrated, to be able to claim it back if the recipient doesn't receive the necessary information or isn't capable of claiming it for some technical reason or whatever.

[48:52]

Now, that idea of a 2 step send + claim transaction is something that has other applications, and I think we'll maybe use this as an opportunity to say into the challenges that we're facing with binance. One of the clear potential use cases is where the recipient of a transaction does not want to receive it. People should, in my opinion, have the option of not accepting transactions. If I walk into a bank with a million dollars in cash, they have the option of saying, no, we're not going to accept this van full of cash..

[49:43] 

It unlocks and solves various problems, including the one that we currently face with binance. So with that, I think I saw on the chat that people were curious in hearing what I think Pacu was asking, what's going on with the binance exchange address potential changes and Jason has an update based on a call that they had last night.


___

### 7. Open Discussion i) - Binance Exhange Address Proposal 

[50:10] - **Jason McGee**

Last night, Kris, Han and I had a call with Binance to discuss Hanh's proposed exchange address solution. The conversation primarily addressed some technical questions that they had, and the good news is that they ultimately signed off on the proposal from a technical standpoint.

[50:29] 

Unfortunately, they postponed the go ahead for development until they complete a compliance review of all the privacy coins on their platform, by the sounds of it. What they're looking to do is they want to evaluate the discussions that they've had with the various projects, whether or not they plan to adhere to their requests, and then potentially delist some coins based on this review. So if we pass the compliance review, then at that point we'll be authorized to start development. 

[51:06] - **Daira**

To clarify, they don't have any say in whether we start development on a feature which might be useful for other purposes as Dodger has just pointed out.

[51:18] - **Dodger**

It might help if you describe exactly what the proposal was, because I think Dara's making an assumption that we're talking about a change to the protocol, when in fact we're talking about a different solution.

[51:28] - **Daira**

No, I understand which solution we're talking about. Kris filled me in on what happened in the meeting as well.

[51:38] - **Jason McGee**

So, yeah, I mean, the other relevant information is they originally gave us a deadline of February 29th. It sounds like they're going to be flexible with that deadline. At this point, we've pretty much done everything possible to cooperate with finance to prevent this delisting. If we fail the compliance review, it's going to be because they're taking a hardline stance against privacy coins, and it's not due to a lack of a viable proposal from our side.

[52:09]

We should hear back from them with a final decision by the end of next week or January 19th. And then I just wanted to check with Kris and see if there's anything he wanted to add to what I said.

[52:24] - **Kris**

No, I think that you've covered it effectively.

___

### 7. Open Discussion ii) - Binance Exhange Address Proposal cont.

[52:29] - **Daira**

To clarify what the proposal is, if I understand correctly, it's to create another address type that is essentially equivalent to a T address, except that you cannot send from shielded directly to this address. You can send indirectly.

[52:50] - **Kris**

So let me color that a little bit. The proposal is to specify a reencoding of the existing transparent address type and that wallets would then use. So the idea is that existing wallets would not recognize that encoding and would say, well, this isn't a zcash address, we can't send to it.

[53:17]

Upgraded wallets in the case of observing that address, they would say "okay, this is a transparent address however, the restriction on the transparent address is that the funds being sent to this address must also come from the transparent pool".

[53:35] 

The way that I think that we will likely implement this in the Zcash lightclient sdk's is your funds remain stored in the shielded pool, if we are asked to send to a text address, then we actually construct 2 transactions that are chained, one of which is a deshielding transaction which produces the funds into a new transparent P2PKH address, and then the second transaction which spends from that internal P2PKH address to the external recipient.

[54:18] - **Str4d**

Yeah, and both of those can be done simultaneously because the second  purely transparent transaction can be 0 conf and spend the unmined outputs of the unshielding transaction. So there's no effect on mining latency usability other than the cost of getting both of the transactions into a block.

[54:43] - **Daira**

And just to dot an I and cross a t, the intermediate T-address can be completely random, it doesn't need to be controlled by the originating wallet. That's a good point. It can be purely ephemeral.

[55:02] - **Nate**

Three thoughts: Can we use unified addresses or any other technique so that wallets that aren't aware of the new address type but presumably have UA support would be able to say "oh, this is a Zcash address that I don't know about yet" rather than this is not a Zcash address. 

[55:35] - **Str4d**

No because it will be transparent only, and by design UA's require a shielded component.

[55:41] - **Nate**

Okay, it would be nice if there were a future proofed way to construct addresses so wallets could always have the ability to say I recognize this is.

[55:55] - **Str4d**

A that was the intention of UA's. That's also the intention of the Zcash address crate I wrote. For anyone who is unaware, there is a Zcash address crate that just does address parsing and nothing else. In fact, it doesn't make any assumptions about the type you're parsing into. You can use it across an FFI to parse into your C# address types if you want for instance.

[56:19] - **Str4d**

The intention of that crate is that we can add things like this new address type into there and all you do is bump your version of that crate and then your parser will change from saying 'invalid zcash address' to 'unsupported zcash address' unless you also add support for that type.

[56:36] - **Str4d**

That crate was intended to solve that precise problem. UA's also somewhat solve it if you are within the shielded context. But at the end of the day, there are many parsers out there that only parse transparent and don't parse anything else, and we're not going to be able to touch those unless the people who wrote those parsers make some change.

[56:59] - **Daira**

So it was an explicit design decision for unified addresses, that a unified address always be able to provide a shielded address for senders who support that. So binance's requirement that they want both the recipient and the immediate sending address to be T-addresses... and it's not entirely clear to me whether that is the requirement or the requirement is just to be able to send back to the money to the immediate sender. But that is directly in conflict with the original design decision for UA's. So that's why we can't use UA's.

[57:54] - **Nate**

I disagree with that design opinion, because I think in the future we're going to need future ways to send to recipients that don't support shielded that we want to enable and every time we're going to run into a similar problem of address versioning and support.

[58:21] - **Daira**

That is a desire to undo the original design decision, which might have merit, but yeah, we need to treat it as such. I realized that I said something incorrect before. I said that the intermediate T-address could be purely ephemeral and not controlled by the originating wallet. But if the exchange does send the money back to that address, then the originating wallet needs to be able to reclaim it. So it does have to be controlled by that. Whether it has to be in the [ZIP-32](https://zips.z.cash/zip-0032) key tree, I don't know.

[59:03] - **Nate**

I had two other thoughts on this. One is, I am somewhat concerned that if binance accepts this, that there's a risk six months or a year from now, they'll say, "this isn't good enough anymore, there's like a new requirement."

[59:26] 

Because the source of the requirements and the principles behind the requirements aren't very clear. So I wanted to state that concern. The third thing was, whether or not they accept this, I think it should be interesting to share this with policy people who are working on financial regulations, privacy and cryptocurrency as a case study. Like here's a thing we tried, binance accepted it/didn't accept it.

[01:00:04] - **Nate**

Because I think ideally, I'm kind of an idealist, but we would have feedback back to the regulatory sources of requirements like this to help improve them. Because in my opinion, this kind of requirement seems a little confused or nonsensical. I feel like there could be a better way to improve regulation to achieve what people, at least what the purported purpose of the regulation is.  I know that's not our lane, and it's like a big ball of wax  maybe it won't ever work, but I still think we should try.

[01:00:56] - **Pacu**

Yeah, I think I posted this in forums that there's always like moving goalposts regarding these kind of things, and ultimately what we are ending up doing is probably compensating for features that we actually lack like selected disclosures and those kinds of things that would be ideal to have.

[01:01:25] 

So I agree about the regulatory documentation or having it as a case study in terms of regulatory people work concerns, but in terms of the engineering, we just have to focus on the abstract requirement and see how we can make this work in pure shielded world and just to have it in mind, because I guess the ultimate goal of Zcash would be getting rid of transparent addresses and all the legacy code it entails.

[01:02:06] 

So if we don't have this functionality or abilities to comply to some elective disclosure of payments from users, then we won't be ever be able to actually get rid of T or something of that. I guess that's my speculation.

[01:02:29] - **Daira**

I agree 100%, because if it had been clearer that the actual requirement was that it be possible to refuse a payment, then we would never have ended up with this new adhoc address type as a way of implementing that, I think especially not something tied to T addresses.

[01:03:00] - **Dodger**

With these conversations, the actual requirement is often not defined or the actual requirement is that the from the exchange's perspective, is we need to keep our regulators happy. That's what the actual requirement is & how successful an engagement with that sort of a regulated entity is, in my opinion, is heavily influenced by how supportive the entity is of privacy.

[01:03:41] 

So you take Gemini as an example. Any person who supports Zcash who has the option of using Gemini instead of another exchange should use Gemini and the reason is that the guys behind Gemini have gone way above and beyond. They've really put a huge amount of effort into getting their regulators to understand Zcash, and they've been supportive of zcash.

[01:04:08] 

There have been conversations, when I was still at ECC, where we had conversations directly with the regulator, with Gemini's sort of assistance or whatnot, to help ensure that there was an understanding of the real risks involved. Now you have other regulators who aren't so open to those sorts of conversations, and you have exchanges whose sole objective is to make money, and they make a purely commercial decision where they look at how much trading revenue do we get by supporting Zcash, how much is it going to cost us through the enhanced due diligence that is necessary, and they make a purely financial decision and they delist us, whereas Gemini I think on the whole, I would guess that it probably costs Gemini to list Zcash and support Zcash.

[01:04:56]

But it also matters hugely who you're talking to at the regulated entity. So you often have people who are relatively junior who work in operations and the back office, and they don't really have genuine decision making capability. All they know is that they've got to deal with this problem, and you end up dealing with a middleman who has no real understanding and no ability to make decisions.

[01:05:25] 

So Nate's point that they could turn around. First of all, no matter what we do, they could just choose not to, or they could choose to go ahead and delist c cash. The requirements could change. The pressure that they're under could be such that it doesn't matter what we do, they just go ahead and delist us because we're a "privacy coin". Nobody on this call should be under any illusion that there is a lot of focus and a lot of pressure on Zcash and if it were up to the powers that be, Zcash would cease to exist. A lot of stuff that's going on, and this is just, I think, one visible symptom of that.

[01:06:23] - **Daira**

Yeah, I was going to say so on Nate's suggestion to use this feature as a case study for regulators, I would be concerned that they might draw the wrong conclusion because of the conflation of the use of T addresses, if this actually is the requirement to be able to refuse funds and being able to refuse funds seems to me like a perfectly reasonable thing that is not at all incompatible with privacy. But if they draw the wrong conclusion and think this is about only using T-addresses in certain circumstances, then it could even be counterproductive.

[01:07:15] - **Nate**

Yeah, sorry, just to clarify, I was not talking about us engaging regulators, but engaging good crypto policy people who are engaging regulators, like Paul at ECC or Coin Center or whoever, who kind of understands the issue, 

[01:07:40] - **Daira**

It would be much easier to explain to them why we did it and what we think the actual requirement might be.

___

### 7. Open Discussion iii) - Zebra Full Node Wallet Proposal


[01:09:30] - **Rene Vergara**

Hi everyone. It was suggested that I should come here to do a quick discussion based on the proposal that we submitted for ZCG to create a full node wallet on top of zebra. There were questions about, are we duplicating efforts? What is the roadmap for Zebra? I think that's probably the more relevant discussion here. 

[01:09:54] 

Also, if there are any questions from the Zebra team regarding this topic, I think that based on the responses on the forum to the [proposal](https://forum.zcashcommunity.com/t/zenith-full-node-wallet/46523), I think that there's interest from the community. But that was one of the topics of the discussion, "what does the Zebra team have to say about this proposal? What are the plan? How are we coordinating?" That's kind of my main focus for today.

[01:10:22] - **Dodger**

Let me say straight off that the Zebra team does not have any plans to build a wallet. We are building functionality into zebra that will support external wallets like the one that you've proposed. 

[01:10:46] 

I think somebody on the forum said "Have you checked what was on the Zebra team's roadmap? Are you duplicating effort?" This is not duplicative of effort. Let's just make that absolutely clear. One other thing I wanted to highlight was somebody was asking about which platforms it's going to be built on. And I wanted to highlight that if you are planning to use Zebra's Lightwallet RPCs, then you don't need to run what you're proposing to build on the same machine. You could run it on Windows and have Zebra running on a Linux host and have your wallet take advantage of Zebra.

[01:11:30] - **Daira**

Well, as long as the protocol between them is secure.

[01:11:36] - **Kris**

The point that I wanted to make is similar here, which is that I think that the conceptual distinction between full node wallets and lightwallets is an artificial one. Because what we're really talking about historically, the full node wallet has been sort of embedded in the same process, and what are called lightwallets have been outside the process.

[01:12:01]

But a wallet is a wallet, and its source of data may be the lightclient protocol, or it may be some other mechanism for retrieving data. If we can decouple the question of what is the source of data from, whether it's light or in process. I think that the goal should be a set of libraries that can support the full range of Zcash wallet functionality and that give you a choice of source of data.

[01:12:52] - **Str4d**

If we think about what a full node wallet is trying to replace, it's trying to replace is the zcashd wallet and the functionality that, that provides, primarily the transparent functionality, because that's what we really don't have implemented anywhere outside of zcashd in terms of a full node level integration.

[01:13:15] - **Daira**

Wait, hang on. That's one of the things that it might be trying to achieve. The other is that there are security properties that you can achieve from a full node wallet that you might not be able to achieve, at least via the light client wallet protocol as it's currently defined.

[01:13:36] - **Kris**

Well no, you could achieve it via the light client protocol by just only connecting to a local lightwalletd that only connects to your local full node.

[01:13:46] - **Daira**

That is not clear to me.

[01:13:49] - **Kris**

I don't understand what's the distinction.

[01:13:53] - **Daira**

So even if you fully trust what the lightwalletd provider, we need to check that that is the case, because it's not obvious to me that you can do everything that you need to do just via the light client protocol.

[01:14:27] - **Rene Vergara**

From our perspective, we have used the full node wallet for our other application, and as part of it, we kind of have already developed a little bit of a proof of concept of this idea of "external wallet" sitting on top of the node. In order to implement unified viewing keys that was not available in zcashd, we needed it for our application.

[01:15:00] 

So our idea is that we can build upon that for additional functionality and follow the same pattern, but instead using the actual private keys and adding the support that we've already built on top of it, with the idea that also we'll have a more user friendly frontend for the full node, which is one of the things that right now kind of  Zecwallet full node has left a gap in the ecosystem, and using zcash-cli is definitely not what I would say, user friendly. If somebody just wants to run a node and send ZEC to people and that's what we are trying to implement there.

[01:15:53] - **Kris**

I have a question. If you're working atop a zcashd wallet, then presumably you're depending upon the zcashd RPC methods for your functionality. I'd suggest as an alternative. There is the zcash client backend crate that we use as the data abstraction layer for the lightwallets, but that also provides all of its functionality actually in terms of unified full viewing keys. So we should just discuss about technical approaches. I'm happy to do that offline or right now there's a related discussion happening in the #zebra channel on the Zcash R&D discord. So it would be good to talk there.

[01:16:52] - **Rene Vergara**

Sounds good, yeah, that would be great.

[01:16:59] - **Dodger**

Just to reiterate, this would not duplicate any efforts currently planned by the zcash team and modulo people's concerns about the security between the host running the wallet and the host running the zebra node as far as I'm aware, there's no reason why you couldn't have one running on Windows and one running on Linux, which is the only platform that Zebra currently supports.

[01:17:28] - **Daira**

Yeah, just to clarify what I was talking about, about the lightclient protocol, I think if there were anything missing from that, then it would be relatively easy to add.

[01:17:43] - **Dodger**

One thing I just want to, want to comment about here, just to highlight that if we were to adopt detection keys... As soon as we implement detection keys, we are in a position to effectively move to an entirely new generation or version of a lightclient protocol where you no longer have to download the entire population of shielded transactions that might potentially relate to your key, albeit in the form of compact blocks.

[01:18:31]

You can move to a situation where if you want to, you can provide your detection key to a provider like Edge. Just to reiterate that for those who ask who's requesting this? Paul Puey from Edge is requesting this, basically. And we could end up with a situation where we get significantly better UX and the ability to sunset the existing lightwalletd stack in favor of something that connects directly to a zebra node.

[01:19:12] - **Kris**

Does ZF have resources to devote to developing the detection key standard and implementing it? Because I feel like that it's a great thing to do.

[01:19:34] - **Dodger**

As I've said publicly, I would love for there to be a joint team with engineers from multiple organizations to work together on this. So basically the ball is in Josh's court right now as regards to whether he wants to discuss collaboration to move this forward. We would definitely be interested in working to move forward. Like I said, the work that we're doing currently with regards to viewing keys, one of the advantages of doing that work is that it can be relatively straightforwardly repurposed to support detection keys as well.

[01:20:11] - **Daira**

Well, the technical approaches that I'm aware of for doing detection keys, the most obvious one is nested encryption, and that requires a protocol change.

[01:20:24] - **Dodger**

Detection keys requires protocol change yes, 100%.

[01:20:28] - **Daira**

So that has implications for the timeline when it can be added.

[01:20:33] - **Dodger**

Yeah, 100%. It requires protocol change. I don't think anybody expects otherwise. Unless somebody can come up with some clever way of maybe repurposing the memo field? I don't know. Could be possible.

[01:21:01] - **Daira**

Yeah, you might be able to do it if you have arbitrary memo space. I have to think about that.

[01:21:12] - **Dodger**

Anyway, we are past time and I should show. So yeah, the making progress on detection keys is something that we are totally open to discussing. 

[01:21:47] - **Kris**

Full disclosure. Right now the ECC engineering team is still rather heavily loaded between our support for the lightwallets and the proof of stake research. So obviously what we're prioritizing is up for discussion and that is a Josh level question. I'm just saying that if you want a time commitment, it's going to come at the cost of something else.

[01:22:25] - **Dodger**

Choosing priorities is about saying no to everything apart from the one or two things that you're prioritizing. That is the unfortunate reality, and it's a hard choice often.


___

### 7. Open Discussion iv) - Zeboot ECC x Community Event

[01:22:40] - **Nate**

I was just going to point out that the ECC zeboot is all about figuring out for things like detection keys. Should we be reprioritizing at ECC? And that's coming up in two weeks. Others are invited, but they have to pay their own way because we're on a shoestring and we're improvising.

[01:23:10]

I saw a question in text. Why won't it be recorded? I'm not certain, but I think maybe the thought was we wanted people to be unrestricted in discussing stuff about ECC and what we should be doing and how our past has been and what we can improve and things like that. That's my guess. So, yeah, that's just context for everybody.

[01:23:46] 

So maybe in 4 weeks at the arborist call we'll have a lot of updates. I think we'll hopefully have more clarity by that time.

____


### Attendees

+ Pili Guerra

+ Daniel (decentralistdan)

+ Arya Solhi

+ Conrado Gouvea

+ Jason McGee

+ Jon Rouch

+ Kris Nuttycombe

+ Marek Bielik

+ Nate ZEC

+ Pacu ZWCD

+ Rene Vergara

+ Str4d

+ Vivek (Qedit)

+ Vito

+ John Bruhling

+ zero dartz

+ Michael Harms 


**Next Meeting Scheduled: 15:00 UTC January 25th 2023**

___
___
