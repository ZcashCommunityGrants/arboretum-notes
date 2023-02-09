# Arborist Call #45 Notes

Meeting Date/Time: February 9th 2022, 15:00 UTC

Meeting Duration: 40 minutes


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra/FROST Status 

+ ECC Core Update

+ Research & Implementation Update
    
+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://gateway.pinata.cloud/ipfs/Qme3doLia1C5iKNwvuWVj2a1q6nTAjzZYKpUbB5kRaFS44) 

Moderator: Aditya Bharadwaj

Notes: Jason Rogers

___



## Full Notes



### 1. Zebrad Updates - Zebra -rc.4 / FROST update


[00:00] - **Pili**

Hi everyone, i am Pili, the engineering manager at the Zcash Foundation. I wanted to give an update of where we are with Zebra today. Since the last Arborist call we've been very busy. We've been manually testing Zebra on testnet because we wanted to make sure we're able to use Zebra to mine a block. 

[02:11]

We've managed to mine a number of blocks using a modified version of s-nomp and also cpu miner. We've got a set of instructions that we want to publish of how we did it so others can try it out if they want. Before we ask mining pools or other people interested to try it out on mainnet we want to implement a few more methods that we think some people might need. 

[02:40]

We've been working with s-nomp because it's open-source but we still had to modify it a little bit. Once we implement the remaining RPC methods, a few performance improvements we'll be looking for volunteers to test it out and provide feedback. Please reach out to us on Discord. There's always some of us on the Zcash R&D discord, the Zcash Foundation or the Zcash Community Server. 

[03:14]

Other than that we tagged our 5th release candidate which is [Zebra 1.0.0-rc.4](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.4) and we are looking to tag another one soon. Probably once we've finished implementing the remaining rpc methods and some performance improvements to mining pools, we will release rc.5. So please keep an eye out for that if you want to test out mining. 


[18:25[] - **Deirdre**

I'll give a quick FROST update. Frost at it's heart is a signature scheme so we've been doing a lot of dedupulication of various implementations of Frost across our FROST, redjubjub, reddsa & Zebra libraries. In the latest release candidate of Zebra we have removed an implementation of redpallas on FROST because we had just ported redjubjub which had an old implementation of FROST to redpallas and carried the FROST implementation with it. 

[19:34]

Now we are pointing at reddsa which has been updated to [0.40](https://crates.io/crates/reddsa/0.4.0), for anyone who wants to use it and no frost for now. We are finishing up our PR that will be basing the implementation of frost for redjubjub & redpallas in the reddsa crate on our fully up to date implementation of frost based on the spec & the rerandomised variant that is undergoing edits with the zip editors.

[19:44]

You have new redjubjub crate as well, [0.60](https://crates.io/crates/redjubjub/0.6.0) that is basically a thin shell around reddsa now, to help migrate away from existing use of redjubjub which has been a long lived crate. We are consolidating around the reddsa crate as having both redpallas, reddsa and the rerandomised variant of FROST supporting both of those ways to do those signatures that Zcash depends on.

[20:54]

We've also merged updates to do an aggregation optimisation to the underlying frost crate that these things depend on which makes it so that when you're doing the final step of FROST where you're aggregating the shares together, instead of checking all the shares before you aggregate which you have to do a bunch of elliptic curve math, you create the signature & if it verifies with the group key then you're done but if it doesn't verify you know that someone cheated and you can do the one-by-one verify to figure out who cheated. 

[21:31]

But in the golden path, no one cheats because they don't want to make a bad signature that wont verify so it saves you a lot of computation at the final step of creating a frost signature if everyone is honest. But we will catch you if you're not honest but if everyone is, you get a cheaper to compute signature, that got merged into frost and will be available to all implementations of frost, not just redjubjub and redpallas, all the other cipher suites for the IETF draft. Thats a lot of the stuff we've been cranking on in the frost adjacent land. 

[22:13]

We have a new person at the Foundation, we have Natalie who merged in her first code change to the frost library this past week. Welcome to Natalie! 


___


### 2. ECC Core Updates - 5.4.0 release



[03:41] - **Kris**

I can give a summary of what we've been doing. Yesterday we tagged [Zcash 5.4.0](https://github.com/zcash/zcash/releases/tag/v5.4.0), a new release of Zcashd. There are a number of changes in this release. We've had a number of comments from the community asking for accurate supply numbers. The getblockchaininfo rpc call now on nodes that have been reindexed with this release will have information about the size of the total supply & the transparent pool. 

[05:22]

There are a couple of bug fixes that have been reported from about 5.0.0 on that are now in. We've backported a number of changes for miners to the getblocktemplate functions from upstream. That's in preparation for ZIP 317 implementation which we are working on now which we expect to be in the next release, for ZIP 317 rules to be used in block selection. 

[06:03]

A couple more things that will be of interest to people that are using Zcashd. A number of the previously deprecated features are now disabled by default. The getnewaddress, getrawchangeaddress, z_getnewaddress & z_listaddresses, those are the most commonly used rpc methods that have been deprecated in favour of the new account based operations for getting new addresses. 

[06:45]

Since we implemented mnemonic seed derivation in Zcashd in 4.7.0 we've been encouraging folks to move to the new methods that do regular derivation from that mnemonic seed or as defined in ZIP 32. The old RPC methods, while still supported for a little while longer, if you need to use those its possible to set the 'allow deprecated' flag to allow previously deprecated features to be used but those will be going away so we encourage you to migrate off of them. 

[07:37]

A lot of that is preparatory work, Zcashd 5.5.0, we are working on heavily right now. Thats going to be primarily ZIP 317 support, both on the wallet side and on the block template construction side. I think thats most of it. 

[08:07] - **Daira**

Did you talk about bug fixes to reindexing?

[08:13] - **Kris**

There are a couple of long-standing issues where it was not possible in some cases to shut down a node during reindexing because if you hit ctrl+c during a reindex or a rescan, the node might not find an interruption point. Both of those have been fixed so you can now shut down a node while its reindexing and start back up without it running a long time before it halts from the ctrl+c. That should help in the case you need to start a reindex because you want the supply and transparent pool numbers and then need to shut your node down. 

[09:16]

It is not required to reindex a new node starting with 5.4.0 but if you want those transparent pool and supply numbers available in your getblockchaininfo call then you will need to reindex. 

[09:33] - **Daira**

Did you mention the fix to the orchard wallet? I can't remember if you did. 

[09:38] - **Kris**

Yes, that was the fix i mentioned. The orchard wallet had a bug where it could throw an assertion failure in the case of a combination of reindex and rescan. That has now been fixed, it was not a potential loss of funds bug it was just a consistency bug where you would have to start a rescan the wallet rather than simply reindexing. 

[10:23] - **Str4d**

There's one other thing. There is a known issue with the release which was identified 4 rc's in so we decided to get this release out. When you do reindex on some systems, your rpc interface may lock up for the duration of the reindex. It's a locking issue internally. We fixed it in master so if that is an issue for you while reindexing and you wish to reindex for this, there's nothing currently merged into master that would be a problem. Otherwise just hold off reindexing until 5.5.0 which will include the fix. The next release whenever the next release is. 

[11:17] - **Kris**

The reindex's generally take upwards of 24 hours and the locking issue may extend that by 8-12 hours i think. 

[11:36] - **Str4d**

Yeah, because it also causes the wallet internally to get delayed behind the main reconnecting thread in terms of where its been notified of the reindex up to. We haven't seen it on every system and the ctrl+c still works. Even if the rpc is locked up and you can't stop the node that way and you need to, the ctrl+c fixes that we implemented do work now for this. 

[12:44] - **Kris**

There have been a number of changes in librustzcash. Str4d has done a bunch of refactoring of Sapling module to bring it closer in API to the Orchard module. The goal there is that we want them to have essentially the same interface and update the transaction construction code in librustzcash to unblock Zingolabs from their Orchard work. 

[13:17] - **Str4d**

And related to that, which is also something that isn't in 5.4.0 but will be in the next release - we are retroactively enabling ZIP 216 which was changes to do with supporting parsing certain non canonical jubjub points. For most of the protocol it was fine but there were a few cases where it was possible to be able to parse something. Now the rust code has been updated to not do this. Zcashd will now also prohibit those points because we've confirmed the entire chain prior to NU5 isn't affected by those. 

[14:14] - **Daira**

More precisely, the entire testnet chain and mainnet chain. 

[14:19] - **Str4d**

This does mean that if any of those cases occured in a note sent to a wallet Zcashd is parsing, those wallets will now no longer be decryptable but the value in those notes wouldn't have been spendable in any case. It essentially means you have a pkd of 0. 

[14:48] - **Daira**

I checked the circuit, they technically were spendable but you would never have generated those keys. The spec said to reject ivk=0. 

[14:58] - **Str4d**

Anyone who was deriving keys & addresses using the ZIP-32 style derivation or ZIP-316 for the newer stuff would not have this problem at all and it wouldn't be possible for someone to send you funds by mutating your address to use a non canonical encoding this way, in a way that you could still decrypt and successfully verify. You would have had to derive your address in a way that generated a pkd with this value. It's not possible for a sender to do so and cause you to see it as a valid note. 

[15:49]

The impact of this should be non-existent. If anyone does encounter this as a result of a reindex please let us know. I hope that we never hear from any such person because it should be negligible to non-existent issue. The main concern had really been the consensus rules because it was sender controlled, the senders could have generated notes that violated this that we would've had to accept under consensus. Fortunately no one did. 

[16:27] - **Nate**

It sounds like it should have never happened but you said if anyone notices it to let you know. What would be an expected symptom?

[16:47] - **Str4d**

The symptom would be a note that your wallet was previously aware of, it became unaware of because it couldn't trial decrypt it. It's hard to say precisely how people would see it because it should not happen but essentially behaviour would be - your wallet was previously able to decrypt this output and now it cant. The way that Zcashd works, we always trial decrypt things on the fly when we spend. We don't store the notes unencrypted in it we store them in the transactions they came in. 

[17:23]

If for some reason someone had one of these notes in their wallet and it had not been spent yet, then when their wallet tried to select it - it would fail. 

[17:42] - **Adi**

Do we know of any recourse when someone runs into the issue? Is that a fix expected in the 5.5.0 version?

[17:50] - **Str4d**

There is no intended fix. If someone who encounters that is outside of the defined protocol, if someone ever ran into this problem come and talk to us. We would want to investigate it to figure out whats going on but this issue should never impact anyone who was working within the bounds of the protocol & deriving keys within the method of the protocol spec. 


____


### 2. ECC Core Updates ii) - zero-conf transactions

[25:31.901] - **Daira**

In the Zcashd updates I forgot to mention the work i'm doing on implementing ZIP-317 for the block construction algorithm, so thats making good progress. 

[25:45] - **Str4d**

There's some slight changes that Zcashd has to make relative to 317 to account for the fact that we allow in the mempool chains of zero-conf transparent transactions because thats the behaviour that bitcoin core has and so its possible via the current block creation algorithm in 317 that you can select a transaction that isn't able to go in the block yet because its parent hasn't been selected but thats minor modifications in terms of caching & deferring them until you've either selected the parent or you don't in which case you don't select the child. 

[26:29] - **Daira**

We'll probably add a note to ZIP-317 on how to do that. 

[26:32] - **Str4d**

My belief is that it doesn't affect Zebra because you don't cache zero-conf chains of transactions in the mempool.


___


### 3. Research & Implementation Updates i) - ZSA Update


[22:50] - **Vivek**

I can give the ZSA update. The main highlight we wanted to point out was that we now have the Transfer implementation [pull request](https://github.com/zcash/zips/pull/649) thats out now. This corresponds to [Milestone 5](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153/28) of the ZSA project. 

[23:09]

It can be found as [PR 372](https://github.com/zcash/orchard/pull/372) on orchard and there are also a couple of other pull requests on [librustzcash](https://github.com/zcash/librustzcash/pull/746) & zcash test vectors. We've also had some preliminary discussions on backporting the encryption changes that are on librustzcash from the ZSA project into the orchard protocol ahead of the entire ZSA update. 

[23:34]

This is so that the internal changes that are in the backend can be slowly merged into the main repo instead of there suddenly being a huge amount of code to bring in. We've also begun more regular meetings with the zip editors and the people at Zcash Foundation & ECC. I think with respect to the ZIPs thats helping us get to consensus on the design faster. Thanks for that. 

[24:10] - **Adi**

Thank you Vivek. I have a quick question. I noticed the other discord comment about some signature scheme change, is that still an issue or is it resolved?

[24:19]

I think Daira responded and that is generally fine. I am still making the changes in the ZIPs to updated what Daira said but i think that seems okay. 

[24:45] - **Adi**

Daira do you have any comments?

[24:46] - **Daira**

No, I think its pretty straightforward. It's just the main separation of the base point for the signature scheme. 


____


### 3. Research & Implementation Updates ii) - PoS & Cosmos community call 


[26:49] - **Nate**

There's basically no updates for proof of stake research from the ECC team right now but we would like to get a straw proposal or a sketch proposal out within the first half of this year to get feedback on that proposal which would be a transition plan. Thats our thinking now but me and all of the engineers are busy with focusing on wallet performance. That's kind of the same update as i gave previously. 

[27:55] - **Deirdre**

Related to proof of stake stuff, the Foundation hosted a community call yesterday with Christopher Goes who works on tendermint & cosmos ecosystem which was really great and we got to ask him a lot of questions about the different mechanisms that things like cosmos and tendermint can provide, how we can use BFT consensus layer and/or their staking systems to use with validators that stake to help verify blocks and such. It was recorded and should be up on youtube.

[28:05] - **Deirdre**

It was a very informative talk especially for me, there may be mechanisms that come with that ecosystem that make it even easier to conduct FROST signing and possibly also FROST distributed keygen which is slightly harder. You dont need to do distributed keygen you can do trusted keygen but the frost signing seems to come "for free" with some of the authenticated channels that tendermint & cosmos provide which is very attractive, that was a great call you can check it out. 

[29:21] - **Nate**

That is awesome and i totally missed it. I am really excited that theres more discussion going on around proof of stake so i'll go check it out. 


____


### 4. Open Discussion - mempool chain / zero-conf transactions cont.


[29:37] - **Adi**

I do have a question for Str4d regarding the comment on the mempool and the chain of transactions, do we know of a mempool limit for size of a Zcash nodes? Do we have a hard limit?

[29:54] - **Str4d**

Yeah, thats unrelated to the fact that Zcashd stores these zero conf chains. The zero conf chains was just its behaviour from bitcoin means you can choose to spend funds that have not been mined yet because you're able to do that. It's impossible for shielded funds becuase you can't spend something that doesn't exist in the commitment tree and things only enter the commitment tree through mining. 

[30:21]

Separately from that there is mempool ommiting. It is described in ZIP 401. Where our limiting is described. Essentially the approach is weighted random discard when the weight as defined in the ZIP goes over a certain threshold. Elements of it are being updated, the ones related to fees are being updated as part of zip 317 and theres potentially some other changes we may look at in terms of the interactions between sapling & orchard and transaction size differences etc. ZIP 401 is the place to look for that. 

[31:17] - **Daira**

We actually noticed Zcashd wasn't quite implementing the spec as written because it uses the estimate of the size of memory rather than the serialised size of transaction, but it doesn't make very much difference. 

[31:33] - **Adi**

Understood, my concern was only because we are planning to implement ZIP 317 and if some party still wants to bloat up the mempool with transactions that dont get included, will that be an issue?

[31:47] - **Str4d**

That's part of the design of ZIP 401. All the shielded transactions were designed around a fixed fee and so the logic was you look at the fee per size of transaction with a floor set a certain point & then the discard doesn't just discard the ones that pay the least fee, it discards randomly with selection weighted on the amount of fee paid but it can discard anything from the mempool. That ensures you cannot have adversaries creating transactions that exercise pathological behaviour to force out other transactions that are in the mempool preferentially to the adversaries ones. 

[32:51]

Instead it comes down to if the adversary wants to occupy x percent of the mempool they have to create and maintain x percent of the transactions in there. When something is evicted Zcashd adds it to a cache. 

[33:14] - **Daira**

I think it's just an ordinary set. 

[33:16] - **Str4d**

Whenever something gets evicted we make sure we dont immediately allow it to be readded prior to the next block. I think its unilaterally cleared on blocks though. It could be accepted or rejected for a variety of reasons but it may still be a potentially valid transaction for the next block. Its the sort of thing we keep an eye on but memory usage which anyone can do with their local node with the getmempoolinfo.You can look up the stats at that point in time for the mempool and if you're using the prometheus metrics those stats are also exposed via the prometheus metrics endpoint so you can track your mempools usage by both the size of transactions and thats what Zcashd is tracking, the memory usage of those transactions in the mempool over time. 

[34:26]

As usual it's mostly just the sort of thing we've got to keep an eye on and if we start seeing problematic issues we can refine and adjust as we uncover them. 


___

### Attendees


+  Conrado Gouvea

+  Dan Wolande

+  Deirdre Connolly

+  Ian Sagstetter

+  Jack Gavigan

+  Jon (QEDIT)

+  Kris Nuttycombe

+  Nate ZEC

+  Nick Takacs

+  Pili Guerra

+  Vivek Arte

+  Ben Beale

+  John Bruhling

+  Lucky Tokidoki

+  Matthew Watt

+  Greg Pfeil

+  charlieok

+  Hazel OHearn



**Next Meeting Scheduled: 22:30 UTC February 23rd 2023**

___
___
