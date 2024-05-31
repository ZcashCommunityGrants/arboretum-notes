# Arborist Call #78 Notes

Meeting Date/Time: May 30th 2024, 15:00 UTC

Meeting Duration: 35 minutes

**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Zebra Scan / ECC dependencies](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#1-zebra-update---zebra-scan--ecc-dependencies)

+ ECC Core Update - [Zcashd 5.9.1 / Zashi currency conversion](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#2-ecc-update---zcashd-591--zashi-currency-conversion)

+ [ECC & ZF zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#3-ecc--zf-zcashd-deprecation)

+ Research & Implementation Update - [Zcsah Shielded Assets update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#4-research--implementation-updates-i-zcsah-shielded-assets-update) / [FROST demo update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#4-research--implementation-updates-ii-frost-demo-update)  

+ Open Discussion - [ZKProof recap](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#5-open-discussion---zkproof-recap)

+ Open Annoucements - [Z|ECC Event](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2078-Notes.md#6-open-annoucements----zecc-event)




## Decision & Action Items

i)  ECC review of librustzcash/pull/1400


___

Video of the meeting: [recorded]

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes

### 1. Zebra Update - Zebra Scan / ECC dependencies 


[00:01:25.11] - **Alfredo**

In the last two weeks, we had part of the team in the [ZKproof workshop](https://www.happyscribe.com/transcriptions/e4e91b7a29e2496babc423524eb02ea1/edit?position=90.49) in Berlin. We made less progress than usual, but still, I have a few highlights that they wanted to share.

[00:01:42.59] 

We finished fixing a bug in the serialization of the note commitment trees. That was a bug reported. I don't remember the name of the person who reported it. Marek was working on it, and we ended fixing it in this period.

[00:02:02.56] 

We finalized the task of upgrading the ECC dependencies, which are the zcash client backend & the zcash primitives, the Orchard, and all that. So we have an open [PR](https://github.com/ZcashFoundation/zebra/pull/8568) in Zebra for that that we are rushing very soon, which is pretty much ready.

[00:02:24.50]

In addition to that, Marek opened a [PR](https://github.com/zcash/librustzcash/pull/1400) in the zcash client backend, about some fixes to some types so we can send them across threads. We can go without that, but it will be good if we eventually have that feature at some point. So it will be great if someone could take a look in the ECC side, but we're not in a rush for that. Then we have Conrado who is working in a zcash script, simplified API. I don't know a lot of details about that, but it's something we're working on to make the zcash script integration with Zebra easier.

[00:03:09.11]

Then we did some research in a list posted in the forum about some requirements to deprecate zcashd. We ended up finding that everything in the list, either we already have it in Zebra or requires wallet support we don't have yet. Finally, we had plans to move the Zebra scan, which is wallet functionality, to a new repo.

[00:03:39.20] 

We are now trying to reduce the scope of that by having the Zebra scan running in its own process, which will give us the security that the keys are not in Zebra, but will avoid us some work in regard to having a new repo with a new CI and stuff like that. So we might follow that path first and then figure out if we really need to put it in a new repo. That's what I have.

[00:04:16.38] - **Pili**

Thank you, Alfredo. Does anyone have any questions for Alfredo?

[00:04:22.09] - **Conrado**

Can talk a little bit about the Zcash script change? So basically the problem was that... So zcash script is a wrapper, a Rust crate, that basically links a C++ file and uses bindgen to link this file, which processes Bitcoin script, which zcash inherited. But the problem was that due to how the API is structured, the API takes a pointer to a C++ transaction, and that requires linking all of the things that are required in a transaction, including like Orchard Crate, and so on.

[00:05:01.59] 

That was a bit annoying because every time the cache updates, we had to update the zcash script to match the same dependencies. This reflects into Zebra because it links to zcash script and so on. So what I did, I changed the API so it doesn't take a transaction as an input. It takes a bunch of other parameters which are required to validate a transparent transaction. And there's a callback, which is called to compute the sighash of the transaction. So with that, I created the API. It's done, it's ready for review. I created the API in the zcash script, and the API in zebra to use it.

[00:05:44.52]

With that zcash script doesn't have any more dependencies other than the C++ code, but it doesn't link to any Rust crates, which is nice. The new API also shouldn't have a performance impact because you can still pre-compute things if you need it because the callback function takes a opaque pointer. So you can create a structure which has the pre-computed data & you can use it when computing the sig hash. And I did that for coding Zebra, it does pre-compute things. 

[00:06:23.35] 

So it's working. I'm happy that it's a very old problem that we have, which now I think it's mostly solved. I know that ECC wants to replace everything with Rust, but I think it's a halfway step there that will help us in the meantime, while everyone works on the Rust replacement for zcash script.

[00:06:49.22] - **Kris**

It will help us work on that Rust replacement for zcash script because it'll be much simpler to build the two side by side and do comparison testing and so forth, and to have both script interpreters running side by side against the chain data, which will be really helpful.

[00:07:11.23] - **Conrado**

Yeah, certainly. That's a good point. That's it, the PRs are ready for review, so they should get merged sometime soon.

[00:07:39.39] - **Kris**

Just really great work on that, Conrado. That's going to be a major I think that it's working.

____

### 2. ECC Update - Zcashd 5.9.1 / Zashi currency conversion 


[00:08:05.02] - **Kris**

So last week we released [zcashd 5.9.1](https://github.com/zcash/zcash/releases/tag/v5.9.1) which is a relatively minor update, but it includes some additional support for ZIP-320 TEX address generation that Binance had requested listed, as well as some other minor fixes to corner cases in the peer-to-peer protocol.

[00:08:41.59] - **Daira Emma**

Just to clarify, that's not actually ZIP-320 support. It's only a utility API that Binance wants to use to validate their TEX addresses.

[00:08:53.54] - **Kris**

Daira Emma has been working on the wallet support for ZIP-320. We fixed a bug in the incremental merkle tree and shardtree crates that affects wallets where there was a corner case related to how tree insertion was being done that could make funds unavailable because you couldn't compute a witness in a very narrow, specific case near the end of one of the shards of the note commitment tree. So that's been fixed.

[00:09:39.49]

Str4d has been working on another piece of wallet support, which is- In order to support currency conversion, one of the concerns that we have is that at least for Zashi and other Zcash wallets that will support currency conversion, We don't want users' IP's to leak directly to the providers of the currency exchange rate because that's an additional third party that's outside the security model for leaking that information. We've been looking at a couple of different approaches. We have a prototype for a change to lightwalletd that It allows proxy-ing, it allows lightwalletd to proxy requests to exchange rate providers. We're also looking into a couple of the exchange rate providers provide essentially signed exchange rate data.

[00:10:51.07]

If we're able to use that, that would probably be the preferable solution to have lightwalletd retrieve signed exchange rate values and then provide to the light clients that could then validate the signatures. Daira Emma, is there anything else that I'm forgetting there?

[00:11:17.03] - **Daira Emma**

Making good progress on Zashi 1.1.

[00:11:21.20] - **Kris**

There are a bunch of neat features in-progress for Zashi 1.1, some of which Daira Emma and I just got to see the first sneak peek of this morning. So I'm excited about those.

[00:11:41.39] - **Pili**

Pacu, you have a question?

[00:11:47.38] - **Pacu**

About the prototype of the currency conversion on lightwalletd. Is one of those Is that you're evaluating the PR that was originally used in zecwallet?

[00:12:11.13] - **Daira Emma**

No, I don't believe so. Which service did that use?

[00:12:16.43] - **Pacu**

I think it used maybe 2 or 3 different providers, and then did some averaging, but it was that approach.

[00:12:29.52] - **Kris**

So the concern that we have is that a lightwalletd provider should never be in a position where they can manipulate the data that's returned from the exchange rate providers. So the client wallet has to either be able to connect directly to an exchange rate provider over TLS and get the exchange rate directly from that provider, or if lightwalletd is going to be in a position to cache that data, then the client needs a way to validate it so that the lightwallet server can't manipulate it.

[00:13:15.14] - **Daira Emma**

And if the client wallet connects directly, then that's revealing information to both the API provider and any eavesdroppers about the timing between when it's querying and it's transactions. Ideally, we'd like to proxy via lightwalletd both for caching, which is possible in the signed information case, and just to secure the origin of the connection in the case where we don't have signed information.

[00:14:04.16] - **Pacu**

Yeah, I recall that once we had some issues with currency conversion because one of the main oracles was down and reporting plus infinite, like overflow data. And it came to my mind, like that approach did that, so we were and all. But yeah, the signed thing is interesting. I just wanted to check that out.

[00:14:38.32] - **Daira Emma**

The client should definitely sanity check the data as well as doing averaging or median.

[00:14:47.02] - **Kris**

One of the challenges is that it doesn't appear that there are very many providers that actually make signed data available. Well, right now, we only know of two providers that provide signed data feeds, and one of those doesn't appear, at least, to provide the ZEC exchange rate in their signed data feed. There's also a little bit of a complexity there that this I actually want to talk about in the lightclient working group later today, which is that if lightwalletd is going to be in a position to proxy these signed data feeds, then those will likely require for the lightwalletd operators to have their own access tokens, because these are premium services from the data providers. They don't just give their assigned feeds away. So it will require the lightwalletd operators to have accounts with those data providers in order to be able to retrieve those feeds that they can then proxy and the wallets will be able to verify.

[00:16:07.58] - **Daira Emma**

Yeah, which is probably only feasible if they apply for a grant to do that.

[00:16:12.25] - **Kris**

The other alternative is that the free APIs directly proxy with TLS proxy through the lightwallet server so it's not to reveal their IPs, but there we then have to worry about rate limiting and so forth. There are some implementation trade offs in this space that we've been grappling with.

[00:16:42.31] - **Daira Emma**

For the time being, we're not committing to either the signed data approach or the proxying or TLS connection approach. We're pursuing both, and we'll see which works better, or a client might be able to use both. Which I think might be necessary given the paucity of data sources.

[00:17:13.26] - **Pacu**

Yeah. Another chapter of the "Privacy's Hard" movie.

___


### 3. ECC & ZF zcashd deprecation 


[00:17:54.20] - **Kris**

So Sean and I have made a couple of steps forward on the implementation of Zcash script in Rust, but that's been just a few hours of work. We haven't made a ton of progress on it yet.

[00:18:16.02] - **Jon**

Is that for the transparent part?

[00:18:20.52] - **Kris**

So we're writing a port of the transparent script interpreter in pure Rust. We need that for full wallet support of transparent functionality, which is needed in order to replace the zcashd wallet. And the alternatives there, we don't want to, after zcashd is deprecated, to continue to have to maintain a bunch of the zcashd code so that the Zcash script crate continued functioning.

[00:19:05.51] - **Kris**

So we want a pure rust implementation of the transparent script interpreter and construction tools for important types of transparent scripts, like multisig scripts and so forth. But we want that all to be in pure rust. So the strategy that we're taking is: Sean, some time ago began this Rust implementation of the script interpreter. We're continuing with that, with the plan being that hopefully in NU6, the zcash script pure Rust implementation will be complete. We would like for both full nodes to continue running with the existing C++ script interpreter for consensus, but at the same time run the new Rust implementation side by side with it to verify that the results are the same when looking at all of the transactions on the network.

[00:20:09.08]

And then in NU7, we would do a network-wide switch away from the C++ interpreter. That then allows all of the C++ zcashd code to be completely deprecated, and we no longer have to worry about it, and then we'll be running entirely on the new stack. Any consensus divergence will have, by that time, verified that all of the existing transparent history that we're aware of, where we have the transparent scripts, validates correctly.

[00:20:47.17] 

There could, at that point of transition, be transparent scripts where just the script hashes exist in existing outputs, but the scripts have never been revealed. There could be cases where those funds are locked up or where there are otherwise problems with their scripts. We're going to do all that we can with Fuzz testing and whatnot to eliminate possible divergences like that before we would make that change.

[00:21:20.04] - **Daira Emma**

That change is not necessarily tied to NU7, so we could continue temporarily using the C++ script interpreter and just wrapping that like like zebrad currently does.

[00:21:35.34] - **Kris**

It's just that it means that in that circumstance that there's still potentially maintenance required for the old zcashd code, we would like to avoid that if it's possible.

[00:21:49.44] - **Daira Emma**

Yeah. The point of view I'm trying to make is that it's not going to delay NU7 if we can't do that in the NU7 upgrade.

[00:21:59.46] - **Kris**

Is there a subset of the scripts that is primarily used by the exchanges that you can see? Is it covers like 99.99?

[00:22:13.01] - **Daira Emma**

Str4d has previously done that kind of investigation. Yes, it's basically just P2SH being used in pretty much the same way as P2PKH. The other things where it's actually substantially used are multisig and a few hashed timelock contracts, but even that's not significant, really. We'll test those cases.

[00:22:46.23] - **Kris**

Yeah and str4d is currently, as yet another thing that Str4d is doing on the side when, just for fun, is attempting to restore his tooling that he had written for doing that analysis and improving that. So sometime, I don't know exactly when, but certainly in the coming months, we'll be redoing that analysis, probably as part of trying out the new script interpreter on the complete history of the chain.


___


### 4. Research & Implementation Updates i) Zcsah Shielded Assets update

[00:24:17.41] - **Vivek**

I'll give the general update. So as Alfredo mentioned, we also were there at ZK Proof, and it was nice Nice to meet some people from ECC & Zcash Foundation there, in person meetings, that was nice.

[00:24:37.57] - **Daira Emma**

I very much enjoyed ZK Proof. Maybe we can talk about the Plonkish standardization later.

[00:24:47.10] - **Vivek**

So then post that, I guess, a few of us also went to Eurotrip, the affiliated events and the conference. But that aside, we've also made some progress on zcash shielded assets.

[00:25:04.57] 

To summarize, I guess there's some amount of progress on the halo2 gadget side of things. We have added a trait to generalize it in the existing lookup range check to allow instantiating that for both the orchard ZSA circuit and the existing orchard circuit. We've made sure that we test these gadgets against the existing orchard circuit and make sure that it doesn't affect the existing layout of the circuit.

[00:25:40.15] 

We will be submitting a PR for this soon. Because this will be to the halo2 repository. It's just a standalone addition to halo2. Then aside from that, we've been working on the orchard and librustzcash crates. Some amount of it is making sure is additions work on top of the changes that have happened upstream. So I think we finished it for Orchard. It's stable on top of 0.8. I think there's something pending on Librustzcash. Something is not fully done yet, but we'll be working on that and should be done soon, I guess.

[00:26:32.46] 

Zcash note encryption. We had a PR out. I'm not sure I might have mentioned that last month.

[00:26:40.59] - **Daira Emma**

Yeah, we've unfortunately been too busy to work on review of that, but we haven't forgotten this. It's high priority.

[00:26:52.43] - **Vivek**

Yeah. And so there was also Zcash test vectors. We haven't submitted the formal PR, but we discussed with the ECC, and so we've made it into two bits, one that separates out the Orchard ZSA work from the Orchard work. So we'll submit that first, and then there's additional work on top of that, which changes the transaction structure and adds the insurance bundle and things like that. So that will be separate and subsequent.

[00:27:28.10] 

Yeah, I guess there's some pending things on the ZIP. I made some changes to that. And again, haven't submitted the PR to the Zcash Repository yet, but there were issues that were raised and we are working through them and we'll respond on the issues as we complete that. 

___


### 4. Research & Implementation Updates ii) FROST demo update

[00:28:16.43] - **Conrado**

So what's going on is that we presented a [Zcon demo](https://www.youtube.com/watch?v=LYisNtBul18), which is we were calling the phase 2 of adding online communication to the demo. There was this outstanding PR to get reviewed and merged, and it got merged. So if you want to try out the same thing we presented as Zcon, you can do that. We also created [documentation](https://frost.zfnd.org/zcash.html) to match.

[00:28:43.11]

Natalie is still working on the refresh share functionality. She created a PR for review for the trusted dealer key generation, and she's working on the distributed key generation support for refresh shares. After that we proceed with the work on the FROST server which is used by the demo now which will help people to connect with each other to run the FROST protocol. And that's it.

[00:29:27.55] - **Pacu**

I just wanted to publicly I thank all the FROST team in Conrado to give me awesome support this last days and weeks that have been doing a [POC](https://github.com/pacu/frost-uniffi-sdk) with FROST, and they've been great. Thank you for your patience.

[00:29:49.21] - **Conrado**

No problem. The feedback is very helpful to help us improve the API.

___

### 5 Open Discussion - ZKProof recap 


[00:29:57.34] - **Pili**

100 % agree. I love it when people are trying things out and give us feedback that we might not have thought about, or just help us make it more usable and better. So thank you for trying it out and doing that work Pacu. Okay, let's move on to Trailing Finality.

[00:30:24.20] - **Daira Emma**

No particular work on that because I've been away at ZK proof. Can I do an update on ZK proof instead?

[00:30:35.48] - **Pili**

Yeah, sure, why not? 

[00:30:39.09] - **Daira Emma**

So there's many things presented there, but From the point of view of Zcash, one of the most significant is the standardization work on Plonkish. So that's being led by me, Str4d, and Mary Maller. It's making really good progress. We had a session on it where we found two bugs in the spec, and those can easily be fixed. But I think the stage we are at now is trying to define an encoding for Plonkish circuits. Plonkish is the arithmetization used by Halo2 and by other systems.

[00:31:38.50] - **Pili**

Thank you. I moved the slides for us to open discussion. We can then go back to Announcements also. That was the previous item, or if anyone has any questions or comments for Daira on that work, then please raise your hand.

[00:31:55.08] - **Daira Emma**

Maybe I should have motivated that work. I mean, So Plonkish is a more complicated arithematization than R1CS, which is just quadratic constraints. I think that if that is standardized, then it will help a lot in promoting interoperability between different proof systems and different circuit languages. So it'll probably make it easier to to write circuits in high-level languages. 



___

### 6 Open Annoucements  - Z|ECC Event

[00:32:37.48] - **Pili**

Any other questions? Let me go back up to open announcements. Does anyone have any announcement or any news that they'd like to share? 

[00:33:16.25] - **Daira Emma**

So I guess the next gathering will be [Z|ECC](https://forum.zcashcommunity.com/t/z-ecc-summit-ecc-community-event/47433). So that's in July, I think, in San Diego. So if anyone wants to go to that i think it's on the ECC's Twitter.

[00:33:49.31] - **Pili**

Okay. So thank you, everyone. The next Arborist call will be in two weeks time on the 13th of June, and it will be at the later time of 21:00 UTC. I won't be at that one, but I'll see the rest of you later on. Thanks, everyone.


____


### Attendees

+ Conrado Gouvea

+ Pacu ZWCD

+ Daniel (decentralistdan)

+ Dodger

+ Kris Nuttycombe

+ Alfredo Garcia

+ Daira Emma Hopwood

+ Jon Rouach 

+ Natalie Eskinazi 

+ Vivek (QEDIT)

+ Michael Harms 


**Next Meeting Scheduled: 21:00 UTC June 13th 2024**


___
___



