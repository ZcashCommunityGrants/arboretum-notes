# Arborist Call #72 Notes

Meeting Date/Time: March 7th 2024, 15:00 UTC

Meeting Duration: 35 minutes 


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Zebra 1.6.0 / ZF Hack Sprint]()

+ ECC Core Update - [Zashi Progress Update / TEX address support ]()

+ Research & Implementation Update - [Trailing Finality Researh]() / [ZSA Updates]()

+ [Open Discussion - LWCG / Meeting Time]()


___


Video of the meeting: [recorded]

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes



### 1. Zebra Update - Zebra 1.6.0 / ZF Hack Sprint 

[01:56] - **Arya**

Since the last arborist call we have updated Zebra gRPC's build script to add the experimental lab proto, three optional flag so that it can be compiled with folder versions of protoc. Added more unit tests for the register keys scan service request and the Zebra scan gRPC methods. Added the scan gRPC method for registering keys and getting a stream of results as they're found. Added gRPC server reflection and docs for how to use the Zebra scan gRPC server in the Zebra book.

[02:25] 

We also made updates to our CI so that it works better for PRs from external contributors, added a scan task test to CI and released [zebrad version 1.6.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.6.0).

[02:35] 

As part of our hack sprint we also restored Windows support to Zcash script coming soon to Zebra as well, and added an alpha release of a Zebra app. Thank you to Str4d for an assist with the Windows support. Finally, thanks to [bishopcheckmate](https://github.com/bishopcheckmate) for removing some circular dependencies to allow for rust creator runs and thanks to idky137 for replacing match statements on network in Zebra's tests to help minimize the changes needed for adding custom testnet parameters and regtest later. That's all for the Zebra update.

[03:06] - **Pili**

Great, thank you.

[03:08] - **Daira**

It's great to hear about Zcash script working on Windows now.

[03:15] - **Pili**

Thank you to Conrado who managed to fix that? I think it was a one line change in the end. Good job there. 

___

### 2. ECC Update - Zashi Progress Update / TEX address support 

[03:56] - **Str4d**

Since the last Arborist call two weeks ago, we have been focused solely on getting the rust crates and things all ready for Zashi 1.0. So last week's work was all of the pre orchard pieces, so there was some more extra refactoring that was happening and that we landed and there were a bunch of other bug fixes and stuff.

[04:28] 

But we got the next releases of the Zcash primitives, Zcash proof Zcash client backend and so on, crates out at the end of last week. This week is all about getting the pieces in necessary for orchard support. So we've done a bunch of work on various reorgy bits that needed to happen in terms of blockers. We've been reviewing Andrew Arnotts account changes, which is also going to go in as part of refactoring those.

[05:07] 

And then Kris is busy working away on zcash client SQlite pieces at the moment for that. The other thing that we did is we published a new release of the zcash address crate 0.3.2, which has ZIP-329 TEX address support. So if you're using that crate, just do a cargo update.

[05:30]

You will now have immediate and without you needing to do anything your application will start saying "TEX addresses are unsupported". You'll still need to implement something to use them if you're using that crate, but your users now will immediately learn that these are not invalid addresses, they are unsupported by your application. And then obviously once you updated, you can then start using that, detecting TEX addresses and using them.

[05:59] - **Daira**

So could zcash address just...

[06:03] - **Str4d**

No, it can't because of the source.

[06:06] - **Daira**

Because the whole point is to report to the application that they have to make a transfer and that requires a change to the application.

[06:15] - **Str4d**

Exactly. So the correct change here is what we've implemented, which is the parser now supports TEX addresses and by default when you transparently upgrade it returns an error of "transparent source restricted addresses are unsupported".

[06:33] 

And so as opposed to "Not a valid Zcash address" which is what most parsing libraries would return. But yeah, people using the zcash address create still need to make a change to that. And if you're using zcash client backend, we currently don't have TEX address support in that. That's also coming because that's the piece, because it requires creating multiple transactions, that's where all the new proposal APIs and pieces come in.

[07:07] 

Thinking of we should have new releases of the Swift and Android SDKs shortly, fingers crossed, like a 2.0.. that contain new APIs for constructing transactions. And so that's the proposed transfer, proposed shielding and create proposed transactions which can return multiple transactions. Because once we have TEX address support, one proposal will result in two transactions. The SDKs don't currently create those, but the APIs are there and the old ones are marked as deprecated so that people can migrate across. So that will be in the next release of the 2 mobile SDKs.

[07:52] - **Daira**

Yeah. And we have a deadline for the security audit of Zashi, so that functionality is going to need to be released next week.

[08:12] - **Pili**

Thank you, str4d, and good luck with the security audits, fingers crossed. 

[08:26] - **Daira**

Thank you. Is it okay to talk about the conclusions of the security audit for Zashi iOS? I think so, because most of the conclusions are public in [GitHub](https://github.com/Electric-Coin-Company/zashi-ios/issues).

[08:41] - **Str4d**

Yeah, there isn't a report yet that the reports are still ongoing, but the auditor very kindly let us know of the things that they found initially so that we can get on with them.

[08:54] - **Daira**

And those are all in hand, so those will be fixed in 1.0, at least sort of well enough for the release.


___

### 3. Research & Implementation Updates i) Trailing Finality Research 

[10:00] - **Daira**

There is something to report actually. We had a very productive meeting. R&D meeting with Zaki Manian, who is associated with Comet BFT. Knows a lot about that so we asked a lot of technical questions and got very detailed answers about Comet BFT and about various projects using it, like Polygon and Penumbra and there's a few others.

[10:37] - **Pili**

Cool. Yeah, we'll look forward to hearing more when there's more progress.

[10:43] - **Daira**

I was going to say that I'm on the hook to write up Crosslink 2 before I go to hack, which is a cryptography conference on the 19th.

[10:59] - **Pili**

There'll be some, well, a couple of zcash foundation people there, so everyone should say hi.

___

### 4. Research & Implementation Updates ii) ZSA Updates 

[11:31] - **Vivek**

Hi everyone. I'd like to start first with some project updates. So I think in our update last month, we shared that we had given an initial draft of the asset swap ZIP 228 so that's still there. We've made some minor typo corrections and some other streamlining. That's still there as it is.

[11:54] 

I think very soon after the Arborist call, the next week we also submitted our transaction testing tool for the zebra node. I think one thing that came up in the last Arborist call, when I mentioned that it was nearly done, was that the ECC people asked that it be a separate repo. So, yeah, I confirmed that it is a separate repo and I'll link the repo after my update.

[12:21] 

So yeah, we hope that this is useful to both Zebra and ECC teams and any other wallet developers who want to do transaction generation on zebra. So the other major push that we've been doing in the last few weeks has been the backward compatibility for orchard, which is that allowing our code to support both v5 and v6 transactions at the same time.

[12:47] 

So there's been a good progress in that respect. I think the work on the orchard crate is pretty much complete. I think there are some places in the Librustzcash crate where there needs to be support for v6 transactions. That still needs to be fixed properly. So I think that's pending but we've made good progress on that.

[13:12] 

At the same time, I've also been refactoring the test vectors repository so that the work that is already there for orchard is a separate set of vectors and the additions that we have for ZSA are separate so that we can generate vectors for transaction v5 and v6 at the same time and separately as well. So that's the details for the project ZSA project.

[13:40]

We have another update, which is that we've been working on putting together a proposal of our roadmap on Zcash and with ZSAs for 2024. So, yeah, I think we'd already spoken about part of this work in our grant last year, saying that we would add features to improve compatibility with exchanges and allow for greater user control over whether they can accept incoming transactions and things like that.

[14:08] 

So we are also going to additionally focus some part of our proposal on adding support for stablecoins onto zcash. We feel that there's a big opportunity here to allow stablecoins to also join in on Zcash. So we'd be excited to see how that goes. We'll give more details soon.

[00:14:32] - **Jon**

Maybe I can add to that. This is like following chat with basically everyone. Before even Vivek did a [demo on Zcon4](https://www.youtube.com/watch?v=bRdNvepJVXM) of a running ZSA on Zcashd, we already had knocks on the door of people that wanted to use whatever prototype we have to start doing stablecoins.

[14:56] 

But the special thing about stablecoins is that they're not really decentralized. There's something there that is more difficult to keep the same parameters of a decentralized currency when you're dealing with one neck to choke and a place where the regulator can go target the holders of the underlying assets.

[15:29] 

So we're actually taking advantage of that and saying, "okay well since this is something that is very different from the regular decentralized approach, then each asset will be able to separately decide how they approach privacy". But in order for large issuers of stablecoins, in order for them to be able to come to Zcash and use it as a place that you can issue assets, we need to actually take into account their needs for accountability, et cetera. S`o it's going to be, I think, the most centralized part of the Zcash decentralized ecosystem but the impact is going to be on all of ZEC and all of the ecosystem.

[16:27]

So we're trying to explain all of that in our proposal, like how we approach it. Why is there an opportunity? What we think is the first step to develop, and we're going to first get more feedback on the roadmap from everyone and then on the forum, have a direct discussion. This is for 2024 so it's live. If we succeed the pace of this, then Zcash is potentially eligible for large issuers of centralized stablecoins to come and issue that on zcash, which I think is tremendous.

[17:24] - **Daira**

So can you explain what you think the impact on other assets would be of having stablecoins on Zcash?

[17:35] - **Jon**

If this works well, then you might have competition on putting the transactions in the blocks, in which case you will have some effect on ZEC itself. And generally speaking, I think it's going to be putting awareness on the zcash ecosystem and the unfair advantage that it has against other ecosystems that don't have core privacy. I think it's going to be put forward.

[18:14]

But bear in mind that those assets that will decide to be stable coins probably will relinquish much of the privacy part towards the issuer. So the issuer will be kind of like all knowing, but this is like opt in. Anyone that wishes to use this asset will be using it and other assets are not affected.

[18:42] - **Daira**

So why specifically to the issuer rather than to the holder of a specific key pair? Logically, issuance and having a view of all of the transfers within a given asset are independent.

[19:12] - **Jon**

The entity that will be facing the most constraints from a regulation perspective and that will actually need this view is probably first and foremost the issuer. And then second wave you could imagine like exchanges or something like that. But we take care of, or we propose to take care of exchanges in a much more privacy preserving way with other features.

[19:40] - **Daira**

So I'm just thinking, even if it's the same legal entity, it doesn't necessarily mean that you use the same key pair because you might want to keep, let's say the regulatory compliance division of that entity separate from the issuance division, because you don't want every employee who's checking regulatory compliance to be able to issue.

[20:08] - **Vivek**

We aren't planning to have the same issuance ke. It will probably be a different key.

[20:16] - **Jon**

No, actually what we're planning is to have a verifiable encryption piece where the people that are part of a transaction self report to the issuer or to the legal entity of the issuer. But you could have like a department there what happened in the transaction in an encrypted form on the blockchain. So you could have a separation and it's provably reported so they know every other node can accept that this requirement of that particular asset was met. It's a far reaching jump, but I think the implication of having big, stablecoin joining Zcash could be huge. Fingers crossed.

[21:14] - **Daira**

I'm just thinking about possible security weaknesses of that approach.

[21:19] - **Str4d**

Yeah, I think the main thing that this leads to, and I think it was mentioned by Vivek in passing, was that if big if still on whether this kind of like arbitrary centralized condition on transaction in an asset were included, it would be imperative that users be able to control what kinds of assets they accept, because otherwise anyone would be able to doxx your wallet otherwise by sending your address an asset you are unable to transact in.

[22:03] - **Daira**

You don't accept the privacy trade offs.

[22:09] - **Str4d**

The conditions might be you are not an entity from some particular place or country whatever to interact with this or by holding this asset, you are in violation of yada yada, because that's the kind of thing that these controls are designed to enforce. And the moment that happens, you could then brick people's wallets because they would be unable to do anything with their wallet without violating those legal conditions, which is a huge risk.

[22:40] - **Jon**

That is one of the additional features that we plan to do during this thing. So there's transaction acceptance, compatibility with exchanges, and verifiable encryption to the issuer of a stable coin. That's kind of broadly what we're going to be doing in 2024 or proposing to do. We have a proposal that we're going to submit soon. And this is in parallel to finishing asset swaps, which is ongoing process.

[23:15] - **Daira**

Yeah. So I was thinking about potential weaknesses. And if you're encrypting, it doesn't matter whether it's verifiable or not, to a key that is shared between all transactions for a given asset, then the private key becomes a big target. So you either need, I think, to be able to rotate that key. I think rotating the key is pretty much the only solution there, or you need to be able to keep the ciphertext off chain.

[24:03] - **Jon**

I guess I propose that we keep those conversations to later. You guys should know that there is something interesting that's going to happen at the conference, the ZK proof six conference in Berlin, which is there's talks of creating a verified verifier, meaning ZK proof. The organization starting to potentially bless one particular embodiment and implementation of a verifier on one of the schemes and put efforts over twelve months to formally verify, squeeze out bugs, and write down all the specs to the level needed for verification.

[25:07] - **Daira**

That's exciting.

[25:08] - **Jon**

It's a huge effort, and I think people in this community should be aware of it and probably weigh in on how it should work.

[25:22] - **Daira**

Well, I'm going to hacks. Will anyone from. Could it be at hacks high assurance? Because that is exactly the kind of venue to discuss that kind of verifiable software.

[25:43] - **Jon**

Any ideas that you can glean from people working there? By the way, in 9 days, there's a deadline for call for papers for the Berlin conference or anyone that has new stuff to show.


___

### 5. Open Discussion i) LWCG / Meeting Time


[26:04] - **Pili**

Thanks, Jon. Any other questions on the data? Otherwise, we can move on to the open announcements, which Jon already did one. Let's move on. Open announcements.

[26:30] - **Jon**

Can I ask a question? An open question? Who knows the Ywallet team and people who's working with them? Who are they? Are they a front for three letters? What's up with that?

[26:53] - **Dodger**

So Ywallet is built by an individual called Hanh who lives in Asia. There's no reason to think that he's an employee of an agency, a TLA. But its an individual. The reason it's called Ywallet was because he was originally and still is associated with the ycash project, which forked off from Zcash a few years ago and now he receives funding from the community grants committee to maintain and work on Ywallet and some other projects.

[28:30] - **Jon**

I believe they're a real person. Hanh, if you hear us, please join the next one. I want to thank you for that piece of software.

[28:39] - **Pacu**

Hanh is sleeping at this time of the day, so that actually proves that he's a person. If he was a machine, he wouldn't sleep at all. He could be present in all meetings.

[29:16] - **Pili**

Okay, I feel like we moved on to the open discussion portion. So any other discussion topics about who else is human or otherwise or anything else related to Zcash, please raise your hand.

[29:29] - **Daira**

I'm human.

[29:33] - **Dodger**

I'm not human.

[29:38] - **Jon**

I will refer you guys to a non human called [Claude 3](https://www.anthropic.com/news/claude-3-family), which you all should try. It's better than GPT-4, just FYI.

[29:52] - **Pili**

Pacu, do you want to say something?

[30:07] - **Pacu**

At 17:00 hours UTC we have light client working group. Everyone is invited to join inside Discord Light client working group channel we have the agenda, we have some small pickup dates from every team attending and then the idea would be discussing some things, mostly things around development, outreach and deployment of the transparent source only T addresses and ZIP-320 implementation across the ecosystem. Also, we will be probably hearing out. It will be a great venue. If anyone is using the ECC SDKs to get in touch with Andrea from ECC who is, I think her title would be project manager is that correct?

[31:14] - **Daira**

Yes.

[31:17] - **Pacu**

And we will have folks from Edge and we will be probably discussing some things around SDK deployment, frictions for react native, among others and there are also an open agenda as well, so everyone is welcome to join. 

[31:52] - **Daira**

The Light Client Working Group that's on the R&D discord.

[31:55] - **Pacu**

Yes, thank you very much for that. [R&D discord, light client working group](https://discord.gg/xpzPR53xtU), exactly.

[32:06] - **Pili**

Thank you Pacu. Anyone else have any other announcement or discussion item?

[32:19] - **Daira**

I think since last arbitrarist call I've stepped down as a ZIP editor, so that was planned at the end of February. I'm really confident that the ZIP editors who are there now are able to do an excellent job.

[34:25] 

It is definitely incorrect in the ICS file, but it depends what client you're using. So you may get a double correction. So two incorrect things cancel out.

[34:41] - **Dodger**

For the record, we don't control the ICS file, it's sent out by Zoom, we don't have anything to do with it. So I just advise the people create their own calendar entry and set it to the appropriate time in UTC as opposed to in their own timezone

[35:04] - **Daira**

Mean you could just disable the automatic zoom thing and just do it manually because it's repeating event, it won't require that much maintenance.

[35:18] - **Andrew Arnott**

Are we sure that Zoom itself has the right time? Could someone have scheduled this meeting in Zoom for the wrong time? And yet it lets us start the meeting whenever you want?

[35:29] - **Decentralistdan**

Did. I did double check that and it's set in UTC in the administration side. Daira, can you repeat that recommendation that you just said a second ago?

[35:42] - **Daira**

Yeah just disable the automatic zoom calendar notifications and just create the event manually.

[35:53] - **Decentralistdan**

Maybe we can look at.

[35:55] - **Dodger**

Well, we don't want to delete and recreate the event. We don't want to start causing confusion with multiple different events and people joining to two different events. I think if people are having trouble with their calendars, then I suggest that they delete the calendar entry and create a new one as a simple, straightforward and non complex and unrisky approach to not causing disruption.


____


### Attendees

+ Dodger

+ Daniel (decentralistdan)

+ Daira Emma Hopwood

+ Jack Grigg

+ Alfredo Garcia

+ Andrew Arnott

+ Arya Solhi

+ Conrado Gouvea

+ Jon Rouch 

+ Kris Nuttycombe

+ Pacu ZWCD

+ Vivek (QEDIT)

+ Michael Harms

+ Zero dartz


**Next Meeting Scheduled: 15:00 UTC March 21st 2023**


___
___










