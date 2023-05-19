# Arborist Call #52 Notes

Meeting Date/Time: May 18th 2023, 22:30 UTC

Meeting Duration: 45 minutes


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status - [Zebra -rc.8 / Audit update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2052-Notes.md#1-zebrad-status---zebra--rc8--audit-update)

+ ECC Core Update - [Faster Sync / Zcashd 5.5.1](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2052-Notes.md#2-ecc-core-updates----faster-sync--zcashd-551)

+ Research & Implementation Update - [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2052-Notes.md#3-research--implementation-updates---frost-updates)
    
+ Open Discussion - [ZSA Stablecoins](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2052-Notes.md#4-open-discussion-i---zsa-stablecoins) / [Network Upgrade Coordination](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2052-Notes.md#4-open-discussion-ii---network-upgrade-coordination)


Video of the meeting: [recorded]


Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome & Intro 


[00:01] - **Dodger**

Welcome to the Arborist call for the 18 May 2023. These are calls that we hold every two weeks in two different time slots and early time slots to cater for people in Europe and east of Europe and this later slot which encompasses people in the United States.

[00:32] *

They are a call for protocol contributors to discuss upgrade timelines and processes, R&D efforts, design and implementation of new protocol features, & to discuss whether our blockers and where we can coordinate and whether issues that need to be resolved. The idea is to make core protocol development of Zcash more accessible to a wider set of participants and to provide transparency for the Zcash community.

[01:02] 

Anyone can participate. Anyone can attend these calls live on Zoom by registering at electriccoin.co/events. If you want to present something to the call, then drop us an email at Arboristcall@zfnd.org to request a presentation slot and we will get you on the agenda. Otherwise, get involved. You can apply for a Zcash Community grant if you go to zcashcommunitygrants.org. You can also apply for a grant if your project will benefit both the Filecoin and Zcash ecosystems.


[01:50] 

I think they've started giving out grants in the past few months. If you want to participate in chat and discussion about Zcash and be on the same discord server as many of the engineers who are working on Zcash, then you should join the Zcash R&D Discord. For a more spicy discussion environment, you can join the Zcash Community Forum. All of these links can be found by pointing your browser at zcasharborist.org.


___


### 1. Zebrad Status - Zebra -rc.8 / Audit update 


[03:12] - **Arya**

So the Zebra update is we have been mostly addressing the last of the audit findings. I think there are a couple left, after that we're done. We released[rc.8](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.8) last week, introducing an end of support halt like zcashd. So as of -rc.8 Zebrad will stop running 16 weeks after the last release date.

[03:31] - **Arya**

Also in rc .8, the ZIP-317 rules for mempool transactions were implemented, security fixes for inbound service overloads and a rare panic when a connection is dropped. A fix for handling randomness generation & invalid random values as errors in cryptographic code, rejecting nodes as using Zclassic ports, adding user agent arguments to Zebra network and automatically using the correct testnet listener port when Zebrad is configured to run with testnet.

[04:00] - **Arya**

We have also merged PRs since -rc.8 for omitting IP addresses and potentially sensitive user information from Zebra's logs. Rate limiting and size limiting peer transaction ID messages limiting the size & number of blocks and transactions sent in response to a single request, avoiding panicking on state RPC or block requests with very large heights and to add documentation pages for supported platforms, platform tier policy and versioning to the [Zebra Book's](https://zebra.zfnd.org) Table of Contents.

[04:37] - **Dodger**

I have a question. Arya. Has the audit yet discovered any major issues?

[04:43] - **Arya**

The audit has not yet discovered any major issues. It's been pretty smooth sailing so far, and I think we're at the end of the ride. 

[05:01] - **Dodger**

Yeah, I've got to say that the up on the audit, I think there's a real credit to the Zebra Team and demonstrates the benefits of building a node implementation from scratch without the massive legacy that comes with the Bitcoin code base.

[05:35] - **Daira**

Congratulations on nearing the end of the audit.


___

### 2. ECC Core Updates -  Faster Sync / Zcashd 5.5.1 


[06:12] - **Str4d**

We've been heads down focused on the changes necessary to the stack crates to get fast syncing into the mobile SDKs that we provide. The current stack of things that are tied into that are the various changes to the incremental merkle tree rust crates, in particular, the shardtree crate that is going to sort of be the backbone of the new wallet tree updating system.

[06:56] 

On the zcashd specific side, we have been working on the changes necessary to provide and expose the data that those rust crates will consume. We've done several large PRs that are necessary as steps towards that. Those are currently in review.

[07:22] 

I've just put up a PR that has the candidate new RPC that lightwalletd will need for accessing that data and transmitting it to the mobile SDKs. The next steps on that are get the data that feeds that RPC to get that data into zcashd & get the databases primed and cached & things so that when someone restarts their zcashd node, that's powering lightwalletd, it will just pick up all the necessary data that we happen to have already in our databases in different forms, and we just need to assemble it in the right way.After that, lightweightd will have the new gRPC's that convey that necessary data, then that's the zcashd piece effectively done then the work turns to using it in the mobile SDKs.

[08:36] 

There are a few other things that have been going on with zcashd. I think the main other one that I'm aware of that is relevant here is that there's been some work going on to create a newbalance API. So another RPC method to give a more cohesive view of the funds that are in a zcashd full node wallet. Currently, most wallets will be pulling that information from a variety of RPCs. Some to do with the old legacy bitcoin pool of funds, bucket of money and others pulling from the newer accounts model and so on. There's work that's hopefully going to be in the next zcashd release to have a more cohesive and easier to understand view of where all the funds in the wallet are & how can they be accessed.

[09:42] - **Daira**

Speaking of the zcashd full node wallet, there's a [hot fix release 5.5.1](https://github.com/zcash/zcash/releases/tag/v5.5.1) which fixes two bugs. One is we were calculating the ZIP-317 fee incorrectly for transactions with significant number of transparent inputs, just calculating the size of the inputs incorrectly. And the other is that there was a crashing bug if you tried to use the sender transaction that had transparent change without a particular privacy policy.

[10:27] - **Str4d**

If you specified "allow revealed senders" but it required creating transparent change, then the fact that "allow revealed recipients" wasn't part of that policy meant that an error should have been returned & instead it was crashing. So not user reachable from a network level, but something we wanted to get fixed.

[10:59] - **Dodger**

Str4d, you mentioned gRPC, am I correct in believing that that's only on the lightwalletd side?

[11:04] - **Str4d**

Yes, that's the interface between lightwalletd and the mobile SDKs and anyone else who uses that, it's that side of the protocol. The changes that will be made there will essentially be backwards compatible. Rather, to put it another way, the mobile SDKs will be able to tolerate those new methods not existing because they can just fall back on the existing linear scan process.

[11:39] - **Str4d**

But there will be new RPC, new gRPC methods on the lightwallet of these servers that those servers will need to offer and their backing full nodes will have to have the necessary JSON RPC methods to provide that data to lightwalletd in order for the faster spendability changes to be active on the mobile clients.

[12:06] - **Dodger**

Teor does that answer the question that you were wondering about?

[12:12] - **Teor**

Yeah, we had a very similar conversation yesterday in the zip sync. It's more just that we were interested in making sure that Zebra could make those changes on our own schedule rather than having to basically switch to them as soon as they're ready in zcashd and we know what needs to be done there because we might have to make some changes to our state layer to make sure that we have the right indexes and those kinds of things.

[12:50] - **Str4d**

Indeed the simple thing is just if you don't upgrade lightwalletd within it it won't be looking for those RPCs. But it shouldn't be hard for the logic in lightwalletd to be put behind a gate so that if you don't have the RPCs on your full node, then lightwalletd just doesn't offer those gRPCs to its mobile clients. Then the backwards compatibility I mentioned on the mobile SDK layer will handle the rest.

___


### 3. Research & Implementation Updates - FROST updates


[13:49] - **Conrado**

So the main thing that's going on is that we finished the main functionality of FROST library. We did some improvement refactorings and the codes getting audited soon. We are still working on a demo to show how to use FROST and we are also now including the demo, we also show a Zcash transaction being signed using FROST so that will be exciting.

[14:29] 

I already have some code that allows you to create a transaction and sign it externally & you already expose all the data that's required for it to work. We still just have to actually integrate FROST with that. We merged a PR that improves performance of FROST by using multi scalar multiplication. This is not something novel, it's a technique that other implementations use, but we're focusing on getting done first. But now it's starting getting the low hanging fruits of optimization, so that improves a lot the Frost performance both when signing and aggravating when generating the signature, especially if you're using a larger number of shares.

[15:31] 

We are writing a blog post to describe this increasing performance. And lastly, we're still working on preparing some kind of workshop presentation for wallet developers to explain how to use FROST and discuss how this can be exposed in wallets. What's the value for it? There's a lot of things that must be figured out in order to use Frost for users to be able to use Frost on wallets. That's it.


____

### 4. Open Discussion i) - ZSA Stablecoins


[17:06] - **Daira**

So there was a discussion on the forums about stablecoins using ZSAs. What are generally people's opinions of that possibility? I can't see it happening for regulatory reasons, but it's just me.

[17:34] - **Nate**

So I have an opinion on stablecoins, which is that it seems there is clear evidence that it's a very demanded feature across the crypto industry. So private stablecoins seem very important. So I'm really excited to move forward on that as best we can, in any way that we can.

[17:59] - **Daira**

Yeah, I agree. They're what users need, I hope that it's actually possible to build them. 

[18:10] - **Str4d**

Also worth keeping in mind that doing so would require significant changes to ZSA's. Because right now, at a very minimum, the way in which exchange transactions work is you can spend and receive these coins at whatever ratio you want inside a shielded transaction, and you would instead need to somehow bind that to the stable rate, wherever that happens to be.

[18:54] - **Str4d**

Otherwise you have essentially private exchange rates in the shielded transactions, which could diverge significantly from the public stable rate. Maybe people who are well versed in stablecoin lore have already solved that problem but it's the first thing that occurs to me when I think of trying to use ZSA's for a stablecoin is how do you ensure that the exchange rate is maintained?

[19:30] - **Daira**

Do you need to? If two parties agree to exchange two assets at a particular exchange rate, is it necessary to fix that exchange rate in order to have stability for the public rate?

[19:50] - **Dodger**

Well, if the value of your stablecoin is dependent upon being able to exchange it for the equivalent of a specific number of denominated in fiat currency, then yes it is, because the question is who backs it? You've got coins like Circle USD, GUSD, or tether that are backed by a company where you can go and say, here's my coin, give me a dollar. Then there's algorithmic stablecoins which are a different beast entirely.

[20:31] - **Str4d**

Yeah, so I was thinking of the things like the latter would not be at all enabled by ZSA's because you need programmability or some level of "oracleness" across independent shielded transactions. Whereas if you limit the definition of stablecoin here to specifically: "There is an entity that will give you a stable exchange rate, guaranteed". Then you can, I guess, handwave the problem away because it's, why would anyone in their right mind pay triple for this when they could go to entity "x" and pay a single dollar or whatever.

[21:20] - **Daira**

Exactly. The way that centralized stablecoins work is you have a backer who guarantees availability of exchanges at a given rate, and it's usually a slightly different rate in both directions. But I don't think it depends on preventing private parties from exchanging at a different rate, it's just that they're incentivized not to.

[21:53] - **Nate**

I realized I was just assuming the first uses of stablecoins through ZSAs would rely on bridging, because I guess I'm a big fan of bridging, so I was imagining any issuance mechanism, whether it was centralized or algorithmic, would be happening elsewhere. Then the stablecoins could be bridged to Zcash which is quite different from being issued directly onto Zcash.

[22:30] - **Nate**

It still seems like that would be feasible with a centralized issuer because that may require less programmatic functionality. But then generally in terms of exchange rates, the important thing as I understand it, first of all the Issuance and redemption mechanism has to be working well but then any place where there may be bottlenecks in reaching Issuance or redemption can cause tokens like behind that bottleneck to vary in price.

[23:12] - **Nate**

For example, if there were an Issuance redemption mechanism on Ethereum that was working just fine & Ethereum network is processing transactions without backlogs and that's working fine. But there's an Ethereum to Zcash bridge which is introducing some kind of delay or has other bottlenecks then it would be possible for a wrapped, shielded, stablecoin that's issued on Ethereum but held on the Zcash network.

[23:49] - **Nate**

There could be a market where the price could vary from the main peg if there's any sort of bottleneck. I guess as like protocol designers, we would want to focus on making reliable bridges and then as much as possible making them low latency and that's all bridge centric right, so there's this other path of direct Issuance on the Zcash network which I really haven't thought as much about, but that's an exciting path to explore too.

[24:25] - **Daira**

I mean the attraction of algorithmic stablecoins is that you can rely on the smart contract to have a particular behavior, I mean, assuming it doesn't have bugs,

[24:38] - **Nate**

As long as it's a good behaviour.

[24:41] - **Daira**

The centralized party can always turn out not to have as much backing the coin as you think they do.

[24:49] - **Dodger**

Well, algorithmic stablecoins as far as my research which is limitedly, limited has indicated rely entirely on game theory in incentivizing people to either burn or issue or some way that there are auction mechanisms or whatnot to ensure that the synthetic stablecoin maintains its value relative to the underlying asset which is usually Ethereum.

[25:27] - **Daira**

It's a combination of game theory and the behaviour of the contracts.

[25:37] - **Dodger**

With Zcash and ZSA's. There exists the intriguing possibility that somebody could anonymously create a centralized stablecoin.

[25:51] - **Daira**

Would they be allowed to?

[25:54] - **Dodger**

Allowed to by who?

[25:59] - **Daira**

By someone who's saying, oh look, you use this protocol to create an algorithm stablecoin, we're going to ban the protocol.

[26:09] - **Dodger**

Well there's nothing to stop. First of all it wouldn't be algorithmic, it would be centralized.

[26:19] - **Daira**

A particular kind of stablecoin that they don't like.

[26:21] - **Dodger**

Yeah, well, there's no way to stop it the moment ZSA's go live. There is nothing to stop Ziff on Beeblebrox from announcing to the world pseudonymously that they are going to issue a stablecoin on the Zcash network and assuming that the swap will exist, beginning to issue tokens that they declare are worth one dollar and if you exchange one ZEC, you'll get 33-34 of these coins. Then later on, if you want to sell them back, you'll get the corresponding amount of ZEC back.

[27:19] - **Daira**

That's technically true, but who would trust that an entity like that is gonna is not going to do a rug pull with the current current contents of the pool?

[27:31] - **Dodger**

Certainly, but I'm just saying that it is possible. Nobody can stop it.

[27:45] - **Daira**

We should not underestimate legal attacks & denial of service attacks. I mean, we've been subject to a denial of service for the past year or so. It's taken us longer to recover from it and we haven't completely recovered from it. I'm not sure but it seems as though that attacker is not particularly well resourced and so if you had a government who was trying to do a denial of service attack than they probably could. But sorry to be the bearer of bad news.

[28:39] - **Str4d**

Yeah, I mean, at the end of the day, as far as stablecoins go, what it's stable against matters and so issuing a stablecoin backed by Zcash is: 🤷, you could just use Zcash. People who want stablecoins are more likely going to want it against something that is stable relative to something that they value in their personal lives.

[29:08] - **Dodger**

Fiat currency or gold maybe or something like that.

[29:11] - **Str4d**

Yeah and what that means is that there's going to be an exchange point / swap point which is where the rubber hits the road as far as regulation goes.

[29:29] - **Teor**

Also, the problem with relying on game theory or incentives for these kinds of systems is that sometimes people are playing a different game or they're acting on external incentives that don't have anything to do with the network or the cryptocurrency you're trying to make function in a particular way. That becomes very tricky because you have to think not just of how you set up your own system, but every other system that it might interact with and all of the other incentives that people could potentially be acting under. Something to think about for proof of stake as well.

[30:11] - **Daira**

Yeah, I'm reminded of recent attacks on Ethereum where the miner extractable value turned out to be greater than the slashing of the stake. So people just broke the protocol and got slashed and got more money from the MEV.

[30:34] - **Dodger**

One of the great advantages of having privacy at layer one.

[30:38] - **Daira**

Indeed.

[30:42] - **Dodger**

All we need now is hit a verification key and then we can get started.

[30:49] - **Daira**

So there's an interesting question how much programmability do you need for an algorithmic stablecoin? Because it seems as though there are relatively few of them. The algorithms that they need to be encoded in a smart contract are relatively simple so you could maybe consider just hardcoding.

[31:14] - **Nate**

So when I'm thinking of algorithmic stablecoins, the one that I have most confidence in would be makerDAO and DAI because it's been around for a long time. I believe it's maybe depegged a couple of times. It has battle scars, but it's still around.

[31:41]

I haven't tracked its implementation too much recently, but I'm pretty sure it's quite complex. I sort of lost track of the design after they began switching to support multiple assets. So originally it just was backed by ETH deposits & even with a single asset, one linchpin is that the protocol needs an Oracle for the exchange rate price and then the other is MakerDAO has a security parameter for the game theory.

[32:30] 

If the collateral backing the DAI falls too low in value, then this mechanism kicks in where there's an auction and people can reclaim that collateral by redeeming it for DAI & if they do it in a certain window, it's worthwhile for them to do it. It fails if the price falls too quickly. But anyway, so there's a security parameter. Then they have governance to adjust that security parameter so it's all very complicated and yet it has seemed to work fairly well for a long time.

[33:14] - **Daira**

But how much of that has to be on the chain that is being bridged to DAI? Some of the governance can just be done on Ethereum, right?

[33:28] - **Nate**
Right. Maybe you could find like an interface where you just have a few parameters and well, you need some way to verify that they're being updated appropriately, through some offchain governance? Maybe if you can do that verification, then the on-chain side just updates a few parameters and then has a simpler implementation. I'm not really sure.

[33:59] - **Daira**

One way of doing it is to say that you have a smart contract on Ethereum that just signs things, can a smart contract hold a private key, well, I guess the owner of the contract can then the Zcash chain just verifies those signatures. So you're using the Ethereum's programmability to bootstrap a very limited form of programmability on Zcash,

[34:47] - **Daira**

You might as well just bridge DAI onto Zcash as a ZSA.

[34:57] - **Nate**

So a different direction is maybe instead of like a blockchain smart contract, you have a new protocol and you're using threshold signatures. So people are running nodes and those nodes have to reach consensus. When they do, they do like a threshold signature that Zcash can more easily verify.

[35:31] - **Daira**

Yeah, that could work.

[35:39] - **Dodger**

As a little tangent, I suspect that there might be a way of getting rid of the Oracle by using auctions, but it depends on having enough participants that the auction price ends up being accurate. If you imagine auctioning off collateral, and let's say the collateral is ZEC, then right now at this point in time, people would be unlikely to bid more than  $33.75. But also they're likely to bid very close to that if there's enough participants in the auction. Because the game theory around especially a non public auction where everybody's bids are secret, then the game theory around that is interesting & could potentially do away with the need for a price oracle.

[37:30] - **Daira**

I remember some [research](https://www.cs.cmu.edu/~sandholm/unconditionalPrivacyInAuctions.TISSEC-08.pdf) saying that private auctions are a hard problem.

[37:46] - **Nate**

Penumbra is building an on-chain exchange that has strong privacy properties. So if you're interested in that, go take a look at what they're working on.

[38:05] - **Daira**

Yeah, Penumbra is a very interesting protocol, has lots of ideas that are potentially applicable to Zcash as well.

[38:19] 
That team is led by former Zcash Foundation employee.

[38:38] 

I think Peter Von Valkenburg is on record as saying that he'd love to see a shielded stablecoin on Zcash.

[38:47] - **Daira**

I would love to see it. I'm quite skeptical in the current regulatory environment, but I would still love to see it.

[39:01] - **Str4d**

Well, one of the simple ways to do that is just bridge a stablecoin over, stablecoins issued in other places.


___


### 4. Open Discussion ii) - Network Upgrade Coordination 

[39:24] - **Nate**

Well, I have one. It's not really a discussion topic. It's just I wanted to remind folks we had been discussing starting in June to start having more conversations across Zcash development orgs on how to coordinate protocol changes and network upgrades moving forward in a way that works for multiple orgs.

[39:49] 

I'm excited to get started on those topics. There's more and more organizations showing up. We have QEDIT working on ZSA's shielded labs, I just got emailed from Jason McGee at Shielded Labs saying they are planning to proceed with working on a Zcash sustainability fund and what is the process for getting a protocol change deployed?

[40:20] 

I said, well, you should come to this conversation in June & help us figure out a good process that would work for you and other orgs. So it's exciting to have a few more orgs working on things, and I'm hopeful we can come up with something that makes it as easy as feasible for newcomers with protocol ideas to show up and make progress on getting them deployed.

[40:52] - **Dodger**

I think step one for anybody is to just start showing up to these calls and be prepared to discuss what you're planning & also be ready to lay it out for the Zcash community to see what their reaction to it is, because ultimately, we're bound to follow the consensus of the Zcash community.

[41:24] - **Daira**

I just pasted a paper on the existence of unconditionally privacy preserving auction protocols. It's a classic paper in the field. It says basically it is possible, but the round complexity is exponential in the bid size, & that's an optimality result.

[41:48] - **Dodger**

Auctions, they're tricky even running centralized ones. I can say that from experience can be tricky

[42:06] - **Daira**

This kind of impossibility result , there are sometimes ways to relax the requirements in reasonable ways. Just take the abstract at face value.

[42:23] - **Dodger**

Just turning to Nate, your thing, but first, an NU5 retro.

[42:32] - **Nate**

Yeah, I was imagining probably a series of discussions and in my mind that was included near the beginning. What have we done? How did it work? What can we improve? That whole arc.

[44:12] - **Dodger**

I think the time to make any changes to the Arborist call will be after Zcon because I think we're going to have to cancel at least one call during the week of Zcon. I think it's probably a good time to make a change. We'll probably redo the calendar invites and the zoom link and whatnot at that time. So maybe between now and then we can have a quick discussion about when's the best time / timezone to schedule these in.

[45:03] - **Dodger**

Cool, well, let's finish it there. So we'll see you again in two weeks time and thank you all for attending.


_____

### Attendees


+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 

+ 


**Next Meeting Scheduled: 15:00 UTC June 1st 2023**


___
___

