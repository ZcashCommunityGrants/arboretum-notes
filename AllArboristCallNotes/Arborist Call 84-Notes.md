# Arborist Call #84 Notes

Meeting Date/Time: August 22nd 2024, 15:00 UTC

Meeting Duration: 1 hour 37 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [zcash 5.10.0 -rc1](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#1-ecc-update---zcash-5100--rc1) 

+ NU6 - [Testnet Activation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#2-nu6-testnet-activation)

+ Zebra Update - [Zebra 1.9 / NU6 testnet](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-zebra-update---zebra-19--nu6-testnet) 

+ Research & Implementation Updates - [FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-research--implementation-updates-i-zcash-sustainability-fund) / [ZSF update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-research--implementation-updates-ii-zcash-shielded-assets) / [ZSA update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-research--implementation-updates-iii-frost) / [Crosslink v1](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-research--implementation-updates-iv-crosslink-v1)

+ Open Announcements - [Shielded Labs Hiring](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#3-research--implementation-updates-iv-crosslink-v1) / [Midnight Halo2 Recursion](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#4-open-announcements-ii-midnight-halo2-recursion)

+ Open Discussion - [Crosslink v1 Security](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2084-Notes.md#5-open-discussion---crosslink-v1-security)



## Decision & Action Items

i) Tomek to upload current Zebra code 

ii) FROST team can reach out to Gordian to combine efforts


___

Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - zcash 5.10.0 -rc1 

[00:01:36.41] - **Kris**

So we have just this morning finally have a released PR for zcashd 5.10.0 -rc1. We are now at long last ready to proceed with a private testnet testing for NU6. The main blocker that we faced there has been, as with many things in zcashd, there is a fair bit of bit rot in the RPC tests for the Zcash node that caused us a fair bit of rework that we weren't expecting in the process of getting out both the NU6 lockbox changes and the changes that require all blocks to fully balance.

[00:03:22.23]

One of the features that was accepted by the ZIP editors for NU6 is that It will no longer be allowed for miners to fail to claim all of the fees from transactions. This hasn't been an issue in a long time. Miners have generally been using the zcashd and zebrad block construction that does claim all fees. But early in Zcash's history, there were a bunch of fee values that were left unclaimed.

[00:03:54.53]

Forcing the blocks to balance It's been something we wanted to do for a long time. And as an added benefit, forcing the blocks of balance helped us discover a bug in our implementation of the NU6 lockbox changes. So that's positive. The other thing that has been a major focus of the ECC core team the past couple of weeks has been in the Zcash client backend and Zcash Client SQLite, we now have full support for transparent wallet history recovery, which is a pretty important step on the way to replacing the zcashd wallet.

[00:04:40.43] 

So previous to this, the transparent protocol was only partially supported by the wallet backend. It was possible to get unspent outputs and to shield them, but not to recover any transparent history that might have come from a fully transparent wallet, or importantly, from the zcashd wallet, which might have fully transparent history. So we now are able to properly traverse the transparent history associated with your wallet. And that's the next big step on the way to the zcashd wallet replacement.

[00:05:29.28] 

The other piece that has gone in the process of going in is that Greg Pfiel, who came on with us as a con or came back to us as a contractor recently, has been making good progress on updating Sean's work to fully support transparent script functionality in Rust. There are a couple of PRs that are open against the zcash script repository that provide a generalized Rust interface for evaluating transparent scripts and we're now in the process of using that to start doing some property testing to compare the C++ script interpreter against the Rust script interpreter. So good progress on that front.

[00:06:27.43]

So for those of the ZF who are interested, reviewing those PRs that are open would be helpful. That's going to be one of our focuses in the next week or two is pushing that transparent replacement functionality forward.

[00:06:50.42] - **Pacu**

Whenever you can, may you share the links to those PRs, or are they easy to locate by name?

[00:06:57.55] - **Kris**

They should be easy to locate by name, just on the [zcash foundation/zcash_script](https://github.com/zcashfoundation/zcash_script) repository. I think one of them is in draft and one of them should be ready for review.

[00:07:17.41] - **Tomek**

Yeah, I just want to point out that because Kris, you mentioned that one of the changes in NU6 is going to be that it will not be possible to not claim all the mining rewards. I just want to point out that in ZIP 233, which is the ZSF ZIP, basically all the previously unclaimed mining rewards will become part of the ZSF. So the ZIP 233, I think it doesn't specify if that will only apply to past blocks or future blocks as well. So I guess this is something that we'll need to figure out. Because I think the original intent in ZIP 233 was that not claiming all the miner rewards will be the way for miners to donate to the ZSF.

[00:08:16.23] - **Daira Emma**

Well, there will be a ZSF deposit field.

[00:08:21.20] - **Kris**

That can be explicit rather than making it implicit. Part of the problem is that by having things like the ZSF deposit and then also the transaction fee be implicit, where you have to actually explore the chain, that makes it much harder for example, hardware wallets to verify that the fee being paid is correct or that the ZSF deposit is correct. Whereas if we have this rule that transactions must balance and the blocks must balance, then there's no ambiguity and all of the relevant affecting information of the transaction can be verified by the hardware wallet.

[00:09:12.17] - **Daira Emma**

I mean, to be fair, the ZSF deposit would be an explicit field in the transaction, and so it would be committed to by the successor to ZIP244.

[00:09:22.32] - **Kris**

Yes, absolutely.

[00:09:32.16] - **Daira Emma**

I suggested it partly for that reason.

[00:09:36.51] - **Tomek**

I also agree with the sentiment that it's better to be explicit, but just to point out that that was the original design to be explicit?

[00:09:49.05] - **Daira Emma**

There's nothing really to specify here because there will be no unclaimed rewards in future. And so It doesn't matter whether the specification says to those going to the ZSF or not, because they will be zero.

[00:10:08.10] - **Kris**

Yeah, it matters in terms of the specification regarding previously unclaimed funds as part of the ZSF.

[00:10:17.42] - **Paul Dann**

I was going to say, I think maybe what Tomek was getting to there is that the way we define the ZSF is in terms of the max value versus the current chain value. So if you just take the difference between those two, that will include any previously unclaimed transaction fees. So if we go with that definition, then we're automatically scooping up those previously unclaimed fees as part of this.

____

### 2. NU6 Testnet Activation


[00:10:58.41] - **Dodger**

Do we have a timeline for testnet activation?

[00:11:17.55] - **Kris**

So what we would like to do is today collaborate with the ZF engineers to run a private testnet where we activate on the private testnet just to make sure that activation smoothly and we can test across that activation and mine blocks across the activation, then once we've done that, then we can set a public testnet activation height.

[00:11:48.20] 

We already have a private Discord channel set up that we've been starting to discuss this So I think we're on the same page there.

[00:12:06.31] - **Dodger**

So are we hoping to have testnet activation early next week, perhaps?

[00:12:13.24] - **Kris**

We'll discuss it once we've done some testing.

[00:12:19.22]

So one of the issues is that we do need time for some portion of the testnet nodes to be upgraded to the latest release otherwise we'll just have a testnet fork. So let me look quickly. So zcashd 5.9.1 reaches its end of service halt in early September, I think September 8th or September 9th. So to be fully safe, we would want the the public testnet activation after that.

[00:13:08.06] - **Daira Emma**

I don't think it really needs to be after that.

[00:13:10.22] - **Kris**

There'll just be a testnet chain fork that people have to be aware of what nodes they're using for testing.

[00:13:24.23] - **Daira Emma**

So we enforce that policy for mainnet, but I don't think we need to for testnet. Because anyone who is actively testing on testnet is hopefully more aware of the place.

[00:13:51.56]

And also, I think that testnet doesn't even obey the EOS halt.

[00:14:02.52] - **Kris**

Oh, that's a good point.

[00:14:03.46] - **Daira Emma**

I don't think it does because the heights are all different. The EOS heights are mainnet heights. Yeah, so that's not an issue.

[00:14:20.05] - **Pacu**

Just bringing up that maybe people running infrastructure that are not actively testing may need a heads up just in case for the testing activation. But yeah, that's all. I can help with that or just take care of it. And it's just like, so you don't have to.

[00:14:47.50] - **Dodger**

And Tomek is asking if the testnet setup that would include zcashd and Zebra nodes, is it documented anywhere?

[00:14:59.34] - **Kris**

So just give me your Discord username, and I'll include you in the private NU6 Testnet activation channel. I suspect that we're going to work out a bunch of issues in this process, and we'll document all of that as we do this joint effort to activate on private testnet.



____

### 3. Zebra Update - Zebra 1.9 / NU6 testnet


[00:15:57.17] - **Arya**

In Zebra, since the last Arborist call, we have merged error handling for block-subsidy calculations to avoid panics at low block heights. Coinbase transactions must balance exactly after our NU6.

[00:16:10.43] 

Major database format versions can now be restored from state caches using the previous major database format version. So Zebra no longer needs to rethink the whole chain from scratch when its major database format version has been bumped. The latest changes to librustzcash dependencies are being pulled from the main branch in librustzcash to ensure a smooth transition to their next release. Thanks to Str4d for the suggestion and Alfredo for the change. The debug output for the testnet variant of Zebra's network type has been reduced to reduce noise in Zebras logs when running on testnet. Zebras getblocksubsidy RPC method has been updated to return information about lockbox streams when NU6 is active.

[00:16:45.06] 

The getblockchaininfo RPC method has been updated to return information about chain pool balances at the chain tip. Zebras open API spec was updated to reflect the changes in those RPC methods, and the minimum required protocol version when NU6 is active has been updated to align with the NU6 deployment ZIP, and there are also various documentation updates and fixes.

[00:17:07.25] 

There are currently PRs open for moving common dependencies of multiple crates in the Zebra workspace to workspace dependencies, thanks to Tomek.

[00:17:15.05] 

Ignoring Coinbase spends must be shielded rule on regtest using the new scripts trait in Zcash script, thanks to Greg. There's also one in Zcash script for this, and then running possible minor database format version upgrades before attempting to restore state cache from the previous major version. So in place, upgrades work correctly on long, outdated state caches and will work correctly in the future if zebra's major database format version has bumped shortly after a prior version of zebra has bumped the minor version.

[00:17:43.52] 

Returning verification errors from the sendrawtransaction RPC method. Thanks to Hanh for bringing it to our attention. Writing the database format version to disk atomically to avoid a panic in rare cases where it could be malformed or corrupted, like due to a poorly timed interruption. Updating Zebra's end of support hold time on mainnet to fall before the expected NU6 activation height on mainnet.

[00:18:05.59] 

Finally, there's a PR open to update the changelog and prepare for the release of Zebra 1.9 which is ready to deploy NU6 on testnet. There's also been a little bit of preparation for running Zebra nodes on a private testnet to manually test its NU6 implementations in coordination with the ECC and some minor preparation for an audit of the NU6 changes ahead of mainnet activation.

[00:18:47.35] - **Dodger**

Did you say that you fixed the issue reported by Hanh the last few days? 

[00:18:58.45] - **Arya**

No, so we did start returning those errors in a draft PR. So if a transaction is not verified and added to the mempool, the sendrawtransaction RPC method will return the error explaining why. But it may not be propagated through lightwalletd because we also need to make some changes in lightwalletd, and it hasn't yet been merged into main. So you have to use the branch in order to get those errors currently.

[00:19:23.36] - **Daira Emma**

So does this mean that does this mean that the zebra is behaving more like zcashd in this respect? So the In theory, the same change to lightwalletd will work for both Zcash and Zebra?

[00:19:37.02] - **Arya**

Yes, in the sense that it's at least returning the errors. No, in terms of the format is slightly different, but I think we should update that in zcashd.

[00:19:49.04] - **Pacu**

And is the change in lightwalletd being worked on, does he have an issue? Or is it done already?

[00:20:03.13] - **Arya**

I'm not sure. I don't know if it's being worked on.

[00:20:08.01] - **Kris**

Okay. So there are a couple of different issues on lightwalletd. The one, so Larry Ruane is going to be working on correctly propagating errors from the zcashd RPC and Zebrad the RPC APIs as GRPC errors. Then separately, there was this [issue](https://github.com/ZcashFoundation/zebra/issues/8744) with being able to specify the issue with the getrawtransaction. That I've already merged PR for. Did I get everything there? 

[00:21:12.55] 

The last thing was the incorrect propagation of the block height information for mempool and orphan transactions. Those values were not being properly propagated by lightwalletd. Part of the reason that they weren't being properly propagated is that the protobuff definition was actually, unfortunately, it used a uint64 instead of an int64 for block heights. And that means that we have to map the negative block heights that are used to indicate orphan transactions in the zcashd RPC responses to the max block height or the max value of the uint64. So that's just a wart that we're going to live with in the lightwallet protocol all, but at least it will now be propagated properly, whereas before it was not even being parsed properly. It had platform dependent behaviour. 

[00:22:45.30] - **Daira Emma**

Yeah, so we assumed that it was supposed to be 64 bits instead of platform int. There's something else. If we have a better idea of what needs to change in lightwalletd to make sure that errors are propagated synchronously when they can be, can we make sure that that's documented in the lightwalletd issue? I know it's already documented in- Yes, that's the issue that Pacu just linked, 497.

[00:23:32.43] - **Alfredo**

Yeah. In addition with what Arya said, which was a lot more than I had in mind to give Zebra updates. So thank you, Arya. We also tried in the RPC methods to add the value pools to the getblock RPC method, but we realized Zebrad doesn't keep track of the value points for specific blocks, but just for the tip. So we discussed it with ECC people, and we think that's not totally needed.

[00:24:06.00] 

So Zebrad will not have that. We'll have getblocksubsidy and getblockchaininfo to get information from the lockbox, but not for a specific block with getblock. That's one thing that we tried to do, but we ended up deferring it. Another thing we did is that we investigated two security fixes, denial of service in the Zcash protocol that were backported from Bitcoin to Zcashd. Our initial conclusion, and maybe we should write a statement about it, is that Zebra is not affected by the two of the issues that zcashd backported. 

[00:25:11.44] - **Daira Emma**

We are just on the verge of releasing zcashd 5.10.0 -rc1. Just waiting for the PR to finish CI. And that will include include the two security fix backports that we just mentioned and NU6. So all of the consensus changes. The activation heights are not set, but all of the consensus rules are implemented and have tests. We also fixed some of the unreliable tests, just to get the PR through. Let's see. We've updated the zcasd's dependencies on Rust crates. 

[00:26:29.54]

It does not include the reduction of the default unpaid action limits to zero. We couldn't get that in in time. Yeah, I don't think it's anything else.

[00:26:46.46] - **Kris**

With respect to Zashi and the wallet SDKs, we've just released both Android and iOS version, I think in both cases it's version 221 of the ECC wallet SDKs. There is a new Zashi iOS release that has just hit the app stores this morning, and there will be a Zashi Android release that hits the app stores as soon as Google gets around to accepting the newest release into the Play Store is basically what it comes down to.

[00:27:24.35] 

Those new Zashi releases include They include currency conversion with currency value fetched over Tor from multiple exchanges and taking the median. It's possible to get currency conversion rate information without having to reveal your IP address and your interest in Zcash to the exchange servers.

[00:27:56.17] 

It includes TEX address, so ZIP 320 support. And as part of ZIP 320 support, as I mentioned earlier, we ended up having to essentially implement support for fully transparent wallet history. So the SDKs now will recover all fully transparent wallet history in addition to the shielded history that they already properly managed. The TEX support ended up taking us a bit longer than we anticipated because we realized after having fully implemented TEX address spending that we weren't getting complete wallet history back, and so we had to implement all of the fully transparent wallet history support that we had thought we were going to be able to put off till later.

[00:28:51.11] 

It just reprioritized that in the release process. But as I mentioned before, that's all pretty important for zcashd deprecation, so we made a bunch of progress there.

[00:29:36.20] - **Alfredo**

I think there had been some progress in regards to running the RPC test that zcashd has with Zebra as the backend. Immediately after Kris started doing that, we found some issues. So I guess that will be a path that we'll follow forward to regarding the zcashd deprecation.

[00:30:01.49] - **Kris**

We've done a lot of cleanup on the RPC tests as part of the NU6 release, just in order to address some of the bit rot that I mentioned earlier. But one of the things that we will really want to do with the zcashd deprecation process is see what we can do to get the RPC tests running against Zebrad. We expect that a lot of them will likely fail either due to issues with the RPC tests being very highly tied to the expectations of what zcashd is providing.

[00:30:52.14]

But it'll at least get us to where we can do a side by side comparison of how zcashd and Zebrad are responding to the same RPC requests. Then eventually we'll be able to replace, as we start replacing the zcashd wallet, then we can try to get all of those RPC tests passing against both nodes, and that will be a huge step forward in zcashd deprecation.

[00:31:35.56] - **Pacu**

First, congratulations for the SDK release. It's a huge, huge, huge feature to have good transparent support on the SDK's. Regarding zcashd deprecation, I just wanted to chip in that, given that my grant has been repurposed a bit on its goals, and it has thankfully been extended for the next year, that I'd like to just bring it up that anything that I can, whatever I can do to help in zcashd deprecation, I think this is the most important thing that we have besides the NU6 at the moment.

[00:32:26.47] 

Anything that I can contribute to make this happen smoother or get stuff off your shoulders from the Zebra team or for the ECC team. I'm pretty glad to do it. So just let me in on anything I can help. .


___


### 4. Research & Implementation Updates i) Zcash Sustainability Fund


[00:32:53.10] - **Tomek**

The Zebra code has really been in an almost finished state for about a month. We haven't pushed it yet. We've been struggling with testing it in integration a little bit. As I mentioned in the chat, now we tried to set up a testnet with zcashd and zebra nodes and send some ZSF deposit transactions and have been having some issues there.

[00:33:33.10] 

But we've pushed a request to update test vectors with some of the test data we need for our fork of librustzcash. I guess we'll push our changes to the librustzcash either today or tomorrow. Paul has started work on implementing ZSF in zcashd. So we've plugged in our changes to librustzcash to zcashd as well. And I know Paul has managed to send some transactions. I think there's quite a number of things still missing. I think transaction verification and Coinbase transaction verification, I think, is not updated. But in general, I think things are progressing there.

[00:34:23.43] - **Paul Dann**

I think the only thing missing now is the deposits from Coinbase transactions. I think all of the rest, in most of the sign-in complexity is in librustzcash. But the additional field and serialization stuff is all covered by RPC test in zcashd that seems to be working quite well.

[00:34:53.30] - **Tomek**

There's still a few RPC calls, right? I think we'd have to update the getblock template, I guess.

[00:34:59.56] - **Paul Dann**

Yeah, maybe just a couple left. But things like send to address and create raw transaction, those paths to depositing are covered. I think some of the mining-related RPC calls still need updates. All right.

[00:35:28.45] - **Arya**

What's the motivation for implementing this in zcashd?

[00:35:34.23] - **Jason McGee**

Yeah, so the main reason that we're doing the zcashd implementation is that assuming that there's consensus for the ZSF, we want it to be included in a network upgrade in the first quarter of 2025.

[00:35:46.19] 

It sounds like it might take longer to deprecate zcashd than what's currently listed on ECC's roadmap, and we don't want to impede the implementation. It's currently a dependency for ZSAs, for example. So If the ZSF is ready and zcashd deprecation gets delayed until the second half of 2025, we're going to push for it to be included in a network upgrade on its own. 

[00:36:34.51] - **Daira Emma**

I was certainly hoping that we wouldn't need another network upgrade in zcashd, but It does depend on the timing. So I can't really give a very certain estimate of when ZSAs will be matched.

[00:37:00.55] - **Arya**

That sounds good. Do we have an idea of how substantial those changes are going to be and what the review burden will be like?

[00:37:10.42] - **Daira Emma**

I mean, so it's a transaction version change, which has some overhead. Yeah, it's not a particularly complicated upgrade apart from that. Notice I'm not giving an estimate.

[00:37:40.42] - **Paul Dann**

In terms of lines of code changed directly in in zcashd, it's not huge, and I'm certainly working to keep it minimal. I think librustzcash is where most of the complexity is. So, yeah, we're trying to keep things easy to review.

[00:38:09.07] - **Daira Emma**

Yeah, those changes would be necessary for Zebra anyway, I imagine. The ones in the librustzcash. Maybe not. 

[00:38:28.27] - **Tomek**

I could upload our current Zebra code, which I think is mostly complete. In case you want to have a look.


___


### 4. Research & Implementation Updates ii) Zcash Shielded Assets



[00:38:47.43] - **Vivek**

Hi, everyone. So for the ZSA update, I'd like to start with Zebra today. We'd like to help reveal the lockbox funding streams we had for NU6 in Zebra some time ago, and we gave some suggestions there. We also made various changes across the different crates, librustzcash Orchard Zcash test vectors, and so on to support the V6 transaction format. It involves some repacting to move back from V7, which we thought it would be. So maybe if there is a ZSF update and we have to go back to V7, there may be some stuff there eventually again. 

[00:39:47.21] 

Right now, I think all of our dependencies have backward compatible versions that support both the vanilla orchard and the ZSA versions together.

[00:39:59.46] 

So Our push now is to get all these changes supported properly in zebra, which is basically top of the stack. I think we shifted to having our version of Zebra depend on our dependencies instead and made the necessary interface changes. We've made various placeholder changes to add the NU7 over the NU6 changes that are there.

[00:40:25.43] 

We've picked some arbitrary activation heights for now, and we'll have to change that to whatever is agreed upon whenever. We are working on adding functionality inside the NU7 pieces, such as verification of transactions and that dates to the global state that is required to be stored.

[00:40:51.43]

We've also built a test setup to run these ZSA additions that should run via a docker image, and we'll use Zcash transaction tool over a zebra node. I think that's under review right now, but we'll post an update when we have that up and running.

[00:41:15.16]

On the further implementation, we completed making changes based on str4d's review to Zcash note encryption.

[00:41:26.16] 

I think some of the changes create some interface changes in Orchard and Sapling crypto. So we've made those changes in those crates as well, but I think we've not pushed PRs to upstream so far. But we have that ready to support the changes to the Zcash Note encryption.

[00:41:50.03]

On the ZIPs front, we caught up to the upstream changes that came due to the NU6 and the restructuring the repository. So we've merged those changes into our changes, and basically things are clean and look simple to merge once again. We've also been responding to various open issues about the ZSAs that are there on the ZIPs repo.

[00:42:18.50] 

I think there are still maybe two or three that are open, and I'm working on those. I think Strad had previously mentioned that the asset swap ZIP once it has been moved to the new format after the restructuring that could be merged into upstream. So I will make one pass over it still, and then I'll probably send a message on the ZIPs channel in the Discord and let you know when that's ready to be merged so that it's available upstream for people to comment on and have a look at in more detail.

[00:43:07.10] 

To sum up, our main focus right now is tying up the loose ends and Zebra and librustzcash and the test vectors to make sure that we have a working ZSA version for the community to play with as soon as possible.

____

### 4. Research & Implementation Updates iii) FROST

[00:43:44.04] - **Conrado**

We've been working on our Frost server, the component which we created to help people run Frost. We've been adding encryption and authentication for it.  it's basically the last piece we need until we have something that we are confident people can use securely. We also thinking of doing an audit after that, but we've been working on that. There's a permanent design going on. I started implementing it, and then I realized that there's some tricky aspects to it. It's just always the key management. It's like how you register people's public keys, how you bind them to identify, stuff like that.

[00:44:26.56] 

We're still figuring this out, but the implementation is underway. And I think it shouldn't take too long. But I think that's basically the last thing we need. We still haven't published 2.0.0 of the frost crates. No particular reason for that. Just waiting for more feedback on the RC release.

[00:44:57.22] 

We still need to finish the We did the refresh share functionality for the trusted dealer, but still working on the DKG.

[00:45:18.04] - **Pacu**

The server, when do you think it would be ready to undergo an audit time-wise, not just relatively an estimate, whole park estimate, not like seconds and minutes.

[00:45:40.46] - **Conrado**

Yeah, I also finished the encrypted authentication. There's a few loose threads that we might want to address, just stuff that we postponed, which is not usually important, but we might want to finish. But that's the last piece. So just a rough estimate, like one month, maybe three weeks, one month, something like that.

[00:46:06.10] - **Pacu**

Okay. Has the Gordian developer community contacted the Frost?

[00:46:14.06] - **Conrado**

Yeah, we had a meeting some time ago, I think there will be another meeting in September, if I'm not mistaken. But they work they have done so far And the store is mostly related to how to store and backup and the shares, which is something that is important, but I don't think it's the biggest blocker right now. But I think we can start reaching out to them to see if we can combine efforts on that regard. But I don't think it's a blocker for what we've been doing. 

[00:47:05.11] - **Daira Emma**

So I noticed on the ZIP PR, that is about the use of randomization. I suggested a way of generating the alpha value that doesn't fully depend on the coordinator's RNG. So you might worry, for example, that it's been compromised or it has some stupid seeding bug like RNGs have had in the past. And so it seems to me that that's a useful change that doesn't increase the number of rounds.

[00:47:50.53] - **Conrado**

Yeah, I saw that. That's a great suggestion. At first, we were considering doing the signing package, which is the commitment plus the message, but then I realized that you can't use the message in this. It's the input to generate the message.

[00:48:08.46] - **Daira Emma**

You could use the PCZT if there was a standardized format for it that just excluded alpha, maybe. But I don't think it's worth it. I think you gain all of the benefit by including all of the commitments because those are random from each participant. 

[00:48:32.43] - **Conrado**

I'm going to update the ZIP. Just for the ready ZIP, I think can opened another PR, which is basically has a sketch. I think the biggest missing in the ZIP is how we generate the Zcash wallet key tree, the rest of the key tree, when you use a FROST wallet.

[00:48:58.24]

And it has a couple of suggestions to how to do that. Not even a suggestion, the sketch of something just to start this question. But we can see if anyone who is interested in that, please take a look on that PR. So we can find a way to standardize a way to generate a frost wallet.

[00:49:24.16] - **Daira Emma**

That's it. It's 883, isn't it?

[00:49:27.15] - **Conrado**

Yeah, I think so.


____

### 4. Research & Implementation Updates iv) Crosslink v1

[00:50:39.29] - **Zooko**

So we are here to accelerate the deployment of Crosslink at Shielded Labs. The current focus is collecting and documenting desiderata/requirements/nonrequirements and tradeoffs among them. And the other thing that we expect to start soon, as Jason might mention after this, is implementing the dumbest possible prototype that would be informative to learn from.

[00:51:17.25] 

So my goal here is to stimulate you folks, and then separately, the broader Zcash community, to help enumerate the desirable features of a Crosslink v1 deployment. First of all, why do hybrid proof not stake at all? Here's our motivation at Shielded Labs. There's three main motivations. First is that it increases the demand for ZEC coins and reduces the supply of ZEC coins on the market, increases demand by giving people something else, some additional new thing to do with their ZEC coins, and it reduces supply because ZEC coins that are locked up for staking can't be sold on the market. And so both of those exert upward pressure on the price of ZEC, and that's good because the price of ZEC is the fuel for our mission, and it attracts users.

[00:52:16.37] 

And the second is that Crosslink v1 adds finality that protects users from getting robbed, and it is necessary or at least super helpful for cross-chain and Bridge things like the Avalanche Bridge that's currently in progress. And the awesome thing about the Crosslink design due to Nate and Daira is that it's a defense in-depth where basically this might be overstating the case. I'm not sure. It might not. But basically, if you want to harm Zcash users who are relying on Crosslink for finality, then you're going to have to break both proof of stake and proof of work or the implementations thereof in order to I wish that. That's awesome.

[00:53:00.51] - **Daira Emma**

I can detail the caveats to that if you want, but I'll let you... Let's leave that for the discussion.

[00:53:09.43] - **Zooko**

Okay.  The last motivation for deploying Crosslink V1 is that it's a foundation for future improvements. I imagine that it will make it easier and safer to deploy other improvements to Zcash consensus protocols, such as cross-chain communication and scalability improvements. I'm not sure about that yet. That's also something that I might be interested in hearing about during the discussion.

[00:53:36.29] 

But here's the initial list I've sketched out about goals or desirable features.  so the main thing I want is either in this right now or in the open discussion or on the Discord channel or something. Help me notice missing desirable possible features of Croslink.

[00:54:04.41] 

Here's my list. Number 1, can users stake or delegate their ZEC and get rewarded for doing so? And what risks and costs to them do they incur or buy? Number 2, can users run their own validators if they want to avoid those risks and costs or support the network? Number 3, time to market. When can the users start doing this on mainnet? Are we talking first half of 2026 or earlier or later? Number 4, safety, which is a big category that encompasses all kinds of things, reliability, privacy, availability, and safety.

[00:54:44.20]

Number 5, user experience in terms of a couple of things, ease of use, safety, reliability, availability, user experience. And then the other one on my list is simplicity of concepts for users. If you're a Zcash user, you want to stake your ZEC and get rewarded for doing so, but you don't know about the existence. You don't know what a validator is. You don't know what a proof of work means. What's the fewest things you don't know nothing. What's the fewest things you can learn in order to correctly do what you want to do, which is stake your ZEC.

[00:55:23.29] - **Jon**

So not numbers go up, basically.

[00:55:27.36] - **Zooko**

Well, you got to learn a few things. You got to learn what the risks are for starters. Is this free money you're getting or what? So anyhow, this is an open part of this is what's the set of things that the users do have to learn or what does their wallet have to do for them. That's what I've written down on this list is simplicity in terms of concepts the user has to learn to do what they want to do.

[00:56:01.00]

Next, latency. And Nate pointed out something really cool to me, which is that I was saying to Nate at some point, well, Crosslink v1 is awesome for safety and ease of deployment, but it does nothing for latency or performance. And Nate pointed out, there's this awesome new wiki page from ZecHub wiki that has all the centralized exchanges and how many minutes you have to wait if you deposit your ZEC into them. You should definitely look at that wiki page. But the answer is you have to wait a long time, and you have to wait a very different amount of time depending on which centralized exchange you're depositing your ZEC into.

[00:56:45.31] 

And Nate pointed out to me that deploying Crosslink v1 with finality with a simple, widely understood block height for finality.

[00:57:15.33] 

Nate pointed out that latency in terms of waiting for some service, such as a CEX, to accept your ZEC deposit could be greatly improved by Crosslink v1 even though latency in terms underlying Byzantine consensus protocol isn't. So I think that's cool.

[00:57:38.52] 

Throughput number of transactions that we can make simultaneously. Next, ease and gracefulness of upgrade for existing users like miners, mining pools, CEXs, instant exchangers, et cetera. Next, retain the advantages of existing proof of work, such as people being able to permissionlessly mine to get their ZEC, even when they don't start with any ZEC or any connection to the network, which I've heard many times over the years was really important to people. There was a time many years ago when that was widely used in Venezuela for people to acquire Zcash by proof of work mining in Venezuela. And then I haven't heard about that. I think the corrupt government seized all of their miners at some point. And then I heard about people doing that in Iran. And then recently, I've heard about people doing that in Russia as of today. So retaining the ability for people to do that is a good feature, desirable property.

[00:58:44.15] 

And the last one on my list is safety and ease of deployment for future network upgrades. I'll post this [document](https://docs.google.com/document/d/1GZYQgQdzL1-GNJLWmt5CbTFXo1nuufkL7-gg7az_M2Q/edit#heading=h.6ffy45al3m33) into the Discord or something after this. I have a little list of different types of threats to safety. It says proof of work break eg, 51% attack equihash algorithm, failure, mining pools and miners all get hacked, Eclipse attacks, et cetera, et cetera. Next category, proof of stake break, eg. 67% attack, the proof of stake protocol is bad, is wrong, the validators get hacked, long range attacks, et cetera, et cetera. And then the last category is implementation bugs exploited on mainnet.

[00:59:35.08] - **Daira Emma**

Point of order, 34% of the attacker is sufficient to break the proof of stake assumptions, not 67%.

[00:59:45.48] - **Zooko**

Isn't that only to break the liveness assumption, but insufficient to break the safety assumption?

[00:59:53.29] - **Daira Emma**

It's complicated. So if you assume by some time, failures, in other words, you can assume that the adversary can cause network partitions, then it's 34%.

[01:00:06.46] - **Zooko**

Yeah, in this in your presentation.

[01:00:09.02] - **Daira Emma**

So basically, you're already assuming something stronger than that when you rely on proof of work because all of the security analysis that's been done on, for example, Bitcoin and some proof of work protocols, implicitly assumes that the attacker can't create partitions. So that is a motivation for moving to proof of stake. So you are getting strictly better security there. But the point is that... So you can't have it both ways. If you want to If you do not make that assumption about partitions, then the attacker threshold is 34%. If you do make that assumption about partitions, then you can get away with a larger attacker threshold. And the analysis, that's a bit complicated, so I won't go into it.

[01:01:02.41] - **Zooko**

Right. And later, can you go into whether Crosslink makes partition attacks harder? I think the difficulty factor overhang protects proof of stake network.

[01:01:27.10] - **Daira Emma**

I have some good notes on that, and I will load Can you take them back into my brain. I'll just quickly read them while you're talking about other stuff.

[01:01:34.07] - **Zooko**

I have edited 67% attack to 34% attack in the list of ways that proof of state can break. And the last category, which I actually think is Probably the most dangerous category for threats to safety is implementation bugs exploited in mainnet. And that could be bugs in proof of stake implementation, with work implementation, i.e, the full nodes that implement or the libraries that those full nodes use and so forth. In the light client server software, there could be safety failures there, which could harm users, even though all the full nodes are still working. And in the client software, i.e. All the wallets and all the exchanges and everyone who uses the network.

[01:02:21.54] - **Daira Emma**

And of course, there's attack surface that isn't dependent on that layer, that isn't dependent on the consensus consensus layer proper. Bitcoin changed the meaning of what consensus means. I'm talking about consensus in the distributed protocol analysis sense. If, for example, the proof system breaks, then it doesn't matter whether your consensus protocol proper is secure.

[01:02:57.13] - **Zooko**

Okay, so I'm going to put eg. Proof system.

[01:03:01.02] - **Daira Emma**

That's an existing weakness or an existing attack surface.

[01:03:08.52] - **Zooko**

Other attack service, eg. Proof system. Yeah, which may or may not be affected or worsened by the deployment of a Crosslink v1. Okay, that's my presentation. I'll post my [Google Doc](https://docs.google.com/document/d/1GZYQgQdzL1-GNJLWmt5CbTFXo1nuufkL7-gg7az_M2Q/edit#heading=h.6ffy45al3m33), so you can add comments into it.

[01:03:24.40] 

Next steps. Gather any other missing goals, features, desired properties, et cetera, to add to this list. Analyze tradeoffs among them. Choose scope for Crosslink v1. And in parallel with all that, as soon as we can get rolling, we intend to implement the dumbest prototype that anyone would be interested in playing with.

[01:03:55.28]

Crosslink v1 will hopefully not be the last Zcash protocol upgrade. And so a lot of the desired features, in particular, I'm thinking about high scale scalability, is something that we shouldn't try to squeeze in to cross link V1, but we're still excited about at Shielded Labs for future upgrades. Jason, tell them that we're hiring.


[01:04:59.55] - **Daira Emma**

So to go into some nuance on the threshold of attackers needed to break the proof of stake protocol. So it depends on what you assume about what partitions the adversary can provoke. Personally, I don't think it's reasonable to assume that the adversary can't provoke partitions at all because they can, for example, do denials service attacks that take some nodes offline or attack the network connections.

[01:05:51.59] - **Zooko**

And they haven't practiced exploited BGP routing, including to attack Bitcoin mining. Yes.

[01:05:58.59] - **Daira Emma**

Yes. Good point. In fact, a BGP routing attack is one of the the nicest attacks from the adversary's point of view because that can potentially Basically, depending on how they do it and depending on where the nodes are distributed, it can give them a good approximation to a perfect network partition where you slip the network in two.

[01:06:34.47] - **Daira Emma**

The raw proof of stake algorithm is not the only defence we have here because if we detect out of band that an attack like that is happening, then we can tell validators to stop validating at all, which will stall the chain, or we can agree out-of-band on which is the correct fork. There are things that we can do to prevent a partition attack like that, which would presumably be very noticeable. I mean, it's very hard to do that attack without being noticed to prevent that from turning into something that is easily exploitable. So I think the fact that the threshold is technically 34% in some attack models, I wouldn't worry about that on Julien.

[01:07:43.43] - **Zooko**

I'm going to put it back to 34-67.

[01:07:48.35] - **Zooko**

Somewhere between 34-67. By the way, channelling Nate, I think the proof of work component can help with this, in part because of the difficulty factor can't quickly fall. And maybe also, this is the part about channeling Nate, something about the proof of work serving as a beacon or a Schelling point for the social coordination among the stakers.

[01:08:20.27] - **Daira Emma**

Yeah, remember that you are assuming that lack of partitioning in the proof of proof of work as well. So, yeah, there are attacks against proof of work that are not normally considered. So proof of stake protocols came out of academic community where the Byzantine Failures model was a very nice abstraction because it's making very weak assumptions and you can prove interesting things about it. And you can make a split between synchronous and asynchronous protocols.

[01:09:18.00] 

So it's very, very nice to write papers about. And I think maybe some of it being nice to write papers about was an obstruction to making real-world progress. And this is the insight that Satoshi had, really, that it was okay to assume a weaker model. But nevertheless, it's very nice to have this resistance to partitioning attacks because, as you say, some of them are quite realistic. So, yeah, it's It's nice to have both types of security.


___


### 5. Open Announcements i) Shielded Labs Hiring 

[01:04:30.07] - **Jason McGee**

So we're looking to hire a couple mid-level Rust developers to work on Crosslink. If anybody is interested or know someone who might be interested or a good fit, They can reach out to me, best on Twitter, the forum, or you can email me at jason@shieldedlabs.net.

___


### 5. Open Announcements ii) Midnight Halo2 Recursion 

[01:10:41.02] - **Josh Swihart**

Just something real quick that might be of interest. I spent some time with Eron Barak this week. So we sat down and talked about the project that he's working on called Midnight, which is part of IOHK, so the Cardano community. So they're using halo2 and he said that they're about done adding recursion and that then they're going to upstream that code as soon as it gets through all audits.

[01:11:15.58] 

He's claiming that they'll be done by Q4 this year, and then they'll go into audit, and that audit, they expect to take three to four months. And then they'll go off stream that code. So we may have it sooner than later. We'll see what But one of the things we wanted to do was to get some of their team connected with the core teams here so we can see what they have and dig underneath the covers a little bit.


___

### 6 Open Discussion - Crosslink v1 Security 

[01:11:47.13] - **Jon**

Maybe follow up on that as a question. Once you have this, how feasible is it to go over all the past transactions and prove everything all the way to now so that you can bootstrap everything immediately?

[01:12:09.11] - **Daira Emma**

The issue there is that the transparent protocol would be hugely complicated to prove anything about.  

[01:12:31.20]

So what you can do is, precisely because it's transparent, you can verify that once. And if there's a social agreement that all of the transparent stuff balances, then you can take that as an input to your proof about all of the shielded stuff.

[01:13:12.43] 

The other issue you would have is that, so say you're doing this using halo, it's easy to prove stuff about orchard because you're on the same curve cycle. But proving stuff about sapling is hard because that would require a non-native field arithmetic. So again, if you're prepared to just accept all of the sapling stuff is... In other words, if you're using this as a performance improvement rather than a 'We want to know that all of the proofs are correct from an insurance perspective', then yes, Recurring is obviously very useful. That's why we added this protocol. Well, that's why we chose the pasta curves for Orchard.

[01:14:23.29]

Yeah, but proving everything from Genesis, which obviously includes Sprout as well, is hard. Thanks. And very inefficient. But if you, for example, at some point we could deprecate Sapling, or we could say in the same way that you can't add new funds to Sprout, we could do the same for Sapling and say you can only withdraw funds.

[01:14:58.20]

And then And that would limit the potential balance violation, even if there were a weakness in Groth16, say, or the way we've implemented Groth16, more likely, that you could bound that to what is in the sapling pool at the time that you stopped new additions to. In the same way that we have thus far.

[01:16:06.35] - **Jason McGee**

I wanted to flag a grant for node implementers and ecosystem engineers to review, especially those focused on zcashd deprecation. Zonkis is requesting $76,000 to help accelerate the deprecation of zcashd by implementing key RPCs for a Zebrad, and the RPCs These are an RPC method for listening to tip changes, listening to changes in the memples, and getting a new nullifier for block hash or height. Basically, ZCG just wants to know that these actually will help with that effort and that the grant amount is reasonable.

[01:17:01.12] - **Daira Emma**

Okay. I'll have a look at that one. I've got time. Thank you. So what's the timeline on that?

[01:17:07.44] - **Jason McGee**

Our next meeting is... Let me just pull my calendar on the second of September. So if before then, that would be idea. Okay. Alfredo?

[01:17:24.17] - **Alfredo**

Yeah. Those are RPC methods that they are trying to do as part of the grant, a part of the indexer task that we want to do in Zebra, which is mainly Arya in that side. We're preparing for now for the NU6 staff. So yeah, I think the best person to answer that would be probably Arya. Let's hear from Arya.

[01:17:53.23] - **Arya**

We are hopefully meeting tomorrow to discuss the details and scope of that project if anyone else wants to join, but I don't have too many details to share.

[01:18:04.26] - **Pacu**

I'd like to join. If you might invite me.

[01:18:08.23] - **Arya**

Sure. I'll add you to the signal group. Is anyone else interested?

[01:18:14.56] - **Jason McGee**

You can add me to the signal group as well.

[01:18:17.30] - **Daira Emma**

Yeah, please add me.

[01:18:27.29] - **Dodger**

Let's return to open discussion if people want to continue discussing Crosslink or recursion.

[01:18:43.13] - **Zooko**

I posted the link to the document, please contact me on Discord or whatever, or add notes to the document about other things that we might want in crosslink.

[01:18:57.46] - **Daira Emma**

I said I was going to, we mentioned caveats. So we've mentioned some of them with the threshold of how much the network an attacker needs. But there's also the fact that the mining rewards will need to be split between proof of work miners and staking or some way of incentivizing validators. So did you have any thoughts zooko about the economics?

[01:19:33.28] - **Zooko**

No. My main thought was, let's split it 50-50 because that's hard for people to argue about.

[01:19:40.40] - **Daira Emma**

It behaves like an extra halving, which we've done before for Blossom. So the remaining issue is, is the absolute amount enough?

[01:19:52.58] - **Zooko**

My main thought is that the cost of buying that many miners or compromising that many miners or on the other part, the cost of carving that much stake or compromising that many validators is not the cheapest way to attack. So however we balance the split between that cost and the other cost, it's probably not going to make that combined Crosslink v1 vulnerable to that economic-based attack. This is a very half-formed thought at this point.

[01:20:44.07] - **Daira Emma**

It also depends on the coin price. Miners and also validators presumably have costs that they have to pay in fiat, and therefore...

[01:21:09.29] - **Zooko**

But the pay offs are also probably go down with the coin price going down, right? Unless we have ZSAs, then we have a problem. In economic inequality.

[01:21:24.19] - **Daira Emma**

Well, I'm not sure that adding ZSAs is really the issue because there's going to be a marketplace to exchange between seconds. I can see that anyway. So it doesn't matter whether you can do it within the protocol or not.

[01:21:39.59] - **Zooko**

Well, okay. So back up. The cost of a 51% attack or whatever you call it, a something, something % attack on proof of work mining and the cost of a something, something % attack on proof of stake staking, those are both... What are They're like upper bounds on the cost to an attacker to attack, right? It's like, here's one way you could attack. It would cost you this much to attack this way. All right so far?

[01:22:13.11] 

Well, the very next thing I think we need to reason about is the benefit to the attacker of attacking.

[01:22:21.45] 

And there's one thing which really pleases me that I think proof of work is way more secure in a certain way, the proof of stake, which is that with proof of stake, if you have somehow compromised, you can sign as many transactions as you want. It's basically free. So it's a multi-spend. If you can break it, you can defraud any number of participants. The protocol is not going to slow you down. It's just a question of how many victims you can defraud in parallel or over a long-range attack with your keys.

[01:22:57.49]

But with proof of work, the protocol Well, it can slow you down. You have to do another proof of thermodynamic expense per target victim. Isn't that cool? So proof of work, it can be limited to a double spend.

[01:23:12.40] - **Daira Emma**

You can do attacks in parallel, but it depends on how many victims you can find within the period of blocks that you're able to roll back for. So if you have 51%, then you can roll back an arbitrary number of blocks. But of course, someone will notice and then respond to the attack.

[01:23:38.27] - **Zooko**

But can't the proof of work algorithm require a given coin to be committed to as a required commitment to the thermodynamic cost? Therefore, you can't spend a given coin to more than the number of victims that you are able to generate proof of work blocks for.

[01:24:07.58] - **Jon**

Does not compute. Can you say it again?

[01:24:10.40] - **Zooko**

Let's say I have the ability to defeat proof of work. For example, I have 51% of all the miners, or I've hacked into the mining pools that have 51% of all the miners or whatever. So now what I want to do is what has been done in practice to gate.io, when someone deposited millions of dollars worth of ETC into it and then use their 51% power to undo the ETC blockchain and make it so they had never to deposit those millions of dollars into that exchange after they'd already withdrawn the resulting Bitcoin or whatever from the exchange. Okay, so I want to do that as an evil attacker. I want to defraud people.

[01:24:57.52]

But They are going to require to see a proof of work block with a deposit to them in it.

[01:25:09.01]
Each of my target victims, if there's a million victims I want to do this to, each of them needs to see a proof of work block, and it needs to have a transaction to them in it.

[01:25:20.55] - **Daira Emma**

It depends how much capital the attacker has. So they can basically double spend all of that capital with a single fork.

[01:25:33.04] - **Zooko**

Right. So I think this is a deep difference between proof of work and proof of stake. For a given capital with proof of work, you can double spend it, but it costs you one proof of work block's worth of thermodynamic cost per added victim for your capital. Okay? With proof of stake, if you can defeat it, then it's free to defraud an arbitrary number of victims in parallel with your same starting capital.

[01:26:01.55] - **Daira Emma**

Yes, I believe that's correct. This was one of the motivations for keeping proof of work in Crosslink.

[01:26:07.20] - **Zooko**

Yeah. So that's what I've come to, is that proof of work is actually really good to keep around, at least for now, for added safety I forgot how we got onto that. You were saying something else.

[01:26:22.46] - **Jon**

You can be more and more conscious about the environment and move it to 40, 60, 30, 70.

[01:26:33.07] - **Daira Emma**

If the price goes up, then you can potentially, I think, reduce the proportion that's allocated to the proof of work side and reduce the environmental cost.

[01:26:49.15] 

Which is not the same as for, say, Bitcoin. So there the the environmental cost is tied to the difficulty level in such a way that the coin price going up is actually a disadvantage. 

[01:27:26.14] - **Pacu**

Yeah, I was going to piggyback on something you said earlier when you're mentioning the features and goals. I wonder if implementing Crosslink can be an opportunity to bring back users that Zcash might have lost when it transitioned to ASIC mining, or maybe that bridge is burned, but maybe being able to attract people with that same mindset or what you said about having grassroots miners in Venezuela or Iran or also Argentina or other countries that they can see this as an opportunity to actually do some investment that doesn't have to do with buying from a fiat on-ramp and participating in securing the network in some way.

[01:28:36.01]

And also, how does that balance with the security? Because I wonder, I'm not a protocol expert, but I wonder if I can create a validator with just a few zennys, like Zcash pennies, then wouldn't that be detrimental to the proof of stake security? How can we balance that to have the cake and eat it?

[01:29:12.03] - **Daira Emma**

If all you're doing is delegating to another validator and attaining the mining rewards and you don't do anything to keep that validator honest, then you're not actually contributing to the security of the protocol. I don't think there's any way around that. If you're running a full node and you can observe... Actually, so here's the point. If you withdraw your delegation in response to a tax that can be attributed to that validator, then it doesn't actually matter whether you did the validation or you are relying on a social consensus as long as that social consensus is correct. So it doesn't matter how it was obtained as long as it's correct. So that's a very good point about delegation.

[01:30:30.29] - **Zooko**

So the thing is, there's a cost to attack, and then we should be thinking about the benefits to attack. And that's tricky because somebody might get infinite utility points, or not infinite, but they could get a great number of utility points from destroying everyone else's Zcash just because they're haters, like users.

[01:30:49.00] - **Daira Emma**

That's the attack that I'm most worried about, to be honest.

[01:30:51.20] - **Zooko**

That makes it hard to balance. But we can see huge differences if I'm right that proof of work mining allows up to double spend, basically without additional cost, and proof of stake by itself allows arbitrarily large multi-spend with the same cost. My point is the top-heavy problem. Because Dara said, what if the cost of ZEC goes, the price of ZEC goes down, the cost to an attacker to defeat Crosslink and/or proof of work and/or proof of stake goes down. But also maybe the motivation to them to steal ZEC or ruin people's fun goes down.

[01:31:32.01] - **Daira Emma**

They can have lots of different motivations. And as you say, if their motivation is political, so if they don't want people to have private currency, and that is a motivation of several governments, we have to remember and the governments have basically arbitrary amounts of money anyway they can print money.

[01:31:57.52] 

It's a hope that you don't have a government as an adversary because a lot of this economic analysis breaks down.

[01:32:07.59] - **Zooko**

Right. For that attacker with infinite resources to spend or infinite willingness to spend. And They're not concerned about the financial benefit to them. That's one attacker. But this conversation has made me think again about the so-called top-heavy problem, which is, what if we have ZSAs and there are transactions of a billion bitcoins going back and forth, which are secured by ZEC-based Crosslink, and the price of ZEC goes down 100X, and how it only costs you $10,000 to control 51% or 67% or whatever of the consensus rules. But this $10,000 consensus rules is protecting people from a $1 billion rollback attack of BTCs.

[01:33:02.01] - **Jon**

If you don't go buy a bunch of ZEC to protect yourself on your billion Bitcoin transaction, then you're a fool, right? You probably would need to dedicate some thought to the network you're using.

[01:33:24.56] - **Daira Emma**

You might, but there's a potential tragedy of the commons there because it You might reason that it's not your individual responsibility to support the price of ZEC. 

[01:33:47.31] - **Zooko**

And the other way to look at it is if the price of ZEC has gone down so that the cost for the economic attack is low, then you don't accept billion dollar transactions to view of Bitcoin on that network, I guess.

[01:34:07.22] - **Pacu**

Also, to push back on Jon's point, an attacker could be at both ends So what they want to achieve is a huge reputational hit on Zcash & ZSAs, they can attack themselves and just profit on trashing our network, and they won't suffer any economic problem.

[01:34:35.26] - **Daira Emma**

That's a very good point.

[01:34:42.15] - **Arya**

Is there or will there be a Git repository that we should be watching for updates on the exploratory implementation?

[01:34:49.42] - **Zooko**

There is not yet. I will post it. Are you in the R&D Discord?

[01:34:57.32]

I'll post it as soon as there is one.

[01:35:00.22] - **Jon**

Wait, if you're on both ends of a ZSA transaction, it's secret. So the reputation requires someone to disclose.

[01:35:13.17] - **Pacu**

Well, I wonder There are a couple of governments that have seized huge amounts of crypto when they incarcerated developers. So they have the liquidity and the manpower to do that.

[01:35:33.37] - **Jon**

I'm saying in order to collect the reputation or to do the reputation damage, you need to reveal the transaction or do some- 

[01:35:50.30] - **Daira Emma**

Yeah. You also need to not get caught in the sense that any reputation damage you can do will be blunted if people know that you did the attack. So I mean, governments are good at doing attacks and attributing it to other people to be fair.

[01:36:12.06] - **Jon**

They're also good at finding good old ways to attack these things rather than advanced economics, right? 

[01:36:27.00] - **Zooko**

Good point.

[01:36:39.41] - **Daira Emma**

Cool. I thought about several new things in this discussion. I like that.

[01:36:48.16] - **Dodger**

Cool. We are past time, so let's wrap it up there. Our next meeting be in two weeks time in the later time slot of 21:00 UTC.

[01:37:07.47] - **Daira Emma**

And I just noticed that the zcashd 5.10.0 -rc1 release PR has passed tests. So I'm going to merge that now.
____


**Next Meeting Scheduled: 21:00 UTC September 6th 2024**


___
___



