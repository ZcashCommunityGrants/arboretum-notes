# Arborist Call #96 Notes

Meeting Date/Time: February 20th, 21:00 UTC

Meeting Duration: 1 hour 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro - [Calendar Files & Ecosystem Partner Mailing List ]()

+ Zebra Update - [Zebra RPC's and Banning Misbehaving Peers]() 

+ ECC Core Update - [librustzcash crates / ZIP 325 account metadata keys]() 

+ Research & Implementation Updates - [FROST Audit & Demo]() / [Crosslink / Hiring & Roadmap discussion]() / [NSM Update]() / [ZSA Offchain Metadata]()

+ Open Announcements - [ZconVI March 4th - 7th]() / [Arborist Calls livestreamed to X]()

+ Open Discussion - [ZIP 231 Encrypted Memo Bundles]() / [Ecosystem wide feature flags ]()




___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=TmHv3_qhzQo)

Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes

### 0. Welcome & Meeting Intro - Calendar Files & Ecosystem Partner Mailing List 

[00:01:29.23] - **Dodger**

A little bit of housekeeping. First of all, we will have no Arborist call on the 6th March because we will be having Zcon during that that week. Also a little bit of progress on hopefully resolving the calendar issues that people have. If you go to [zcasharborist.org](https://zcasharborist.org), you will find that you can now download some new calendar files, which will hopefully provide the correct calendar entries.

[00:02:50.11] 

But one caveat is that it's a very simple calendar entry, and it doesn't account for any canceled or skipped calls. And I just wanted to gauge any interest, and maybe the easiest way to do this is if people stick a thumbs up into the chat, but I'm interested in finding out if there's any interest in us creating a public Google calendar for both Arborist calls and other events like community calls and whatnot that people could then subscribe to and add to their own Google calendars. If there's interest in that, go to the chat and stick a thumbs up in there.

[00:03:32.13] 

Then finally, we had previously discussed briefly having a mail group for announcements relating to Zcash technical developments, and specifically a group that the ecosystem partners could subscribe to to find out when, for example, there are significant changes being made to software, if they need to upgrade or if there stuff has been deprecated or whatnot. So we have created that group. And again, you can go to the zcasharborist.org address and you should find those instructions there also. It's hosted at Google groups. I figured that if it's good enough for Bitcoin dev, it'll be good enough for us.

[00:04:24.37]

Based on my testing, you don't have to have a Google account to subscribe, you can email that address and that will get you subscribed. If anybody finds that that's not correct, please let me know and we'll see if we can do anything about it, but we may not be able to do anything about it. And that's a moderated group, by the way. So it's not a situation that everybody can just email and it gets blasted out to everybody. There are any emails posted to it have to be approved first. And as people join, we will add others to the approval group if we can.


___

### 1. Zebra Update - Zebra RPC's and Banning Misbehaving Peers

[00:06:04.50] - **Alfredo**

So we have a few things that were in flight. I want to get started with what happened to those. So we were refactoring the Docker file and the entry points, which is done. We were implementing invalidateblock and reconsiderblock functions to a finalized state, which was our joint effort between Arya and an external contributor that's done, that will allow to actually implement the RPC method. So this was some internal functions we did in order to support the RPC method that we want to do in Zebra.

[00:06:42.16] 

Another thing we had in progress in the last call was we wanted to build a tracking misbehaving peers and banning them using a score system. So we finalized with that. That's basically the network when peers send us That's bad information, we can ban them. That's done. We were adding inbound connections to the getpeerinfo RPC method. That's not merged yet, but it's done. We were working on replacing the Zcash script implementation, which we had been doing since a lot with other participants as well.

[00:07:22.37] 

That was mainly Conrado working on, but he's still working on frost. He gave a community call, I think, yesterday. So that was a bit on hold, but still in progress. Similar situation to replacing the simsemilla Zebra implementation, which is Natalie, which also work on for us. So now that she's released from the from the first staff, as far as I heard, yeah, she's making progress in that regard. Daira, do you want to say something?

[00:07:54.45] - **Daira Emma**

Yes. So the banning mechanism, is that documented or specified anywhere?

[00:08:01.54] - **Alfredo**

Yeah, I don't think so. 

[00:08:09.54] - **Daira Emma**

I think it should be. I always regret it that zcashd's mechanism was not documented, and that made it pretty much impossible to, well, at least without doing a lot of reverse engineering, to figure out whether it was actually banning the right peers or whether it could be misused to ban the wrong peers.

[00:08:34.59] - **Alfredo**

Yeah, that's a good feedback. I take a note of that and try to work with Arya, which is the person who actually made it. I think I'm pretty familiar with it, so I could do the documentation as well.

[00:08:48.48] - **Daira Emma**

That would be extremely helpful because I really think that it needs analysis. Otherwise, it could be a means of knocking legitimate nodes off network.

[00:09:01.39] - **Alfredo**

Yeah. Okay, let's do that.

[00:09:09.33] 

So another thing we had in progress in the last, what is called was expanding the  getblockchaininfo RPC method to return more data, which is actually done. Yeah, so that's what we had in progress. Apart from that, we are now using a new network kind in the transparent address of the regtest. I'm not very familiar with this, but I know it's something requested by the Zaino people. That was done in the last week.

[00:09:46.20] 

We added a block commitment field to the getblockoutput. We fixed some serialization in the configuration format for regtest as well. We are now accepting another parameter in the sendrawtransaction RPC. This is for compatibility with zcashd, and there were some issues with [] because we are not accepting this parameter. So now we accept it and it do nothing but it's compatible with zcashd.

[00:10:21.49] 

We added a verbose support for getroutemempool, which returns a bunch more information than the previous version. And we extended the getinfo RPC method to return more stuff, which is something requested as well. So that's pretty much what we got done in the last two weeks or so.

[00:10:43.02] 

And then in progress, I know there are a few things, which is I am adding negative height support for some RPC methods. So we can use heights like -1 or minus whatever to get blocks, for example. We are fixing the getblocktemplate coinbase output order, which is different from zcashd, and we want to fix that. We're happy for that. We are actually implementing the invalidateblock and reconsiderblock RPC method now that we have the background work that we needed to do.

[00:11:17.40] 

One thing I want to say is that all this I said is not only the Zebra team doing it. We're having a lot of high-quality external contributor pushing code to Zebra. And yeah, that's very good news for us and for the whole ecosystem, I hope. I guess that's pretty much it. Any question or whatever, please let me know.



____


### 2. ECC Update -  librustzcash crates / ZIP 325 account metadata keys 


[00:12:06.02] - **Str4d**

In the last couple of weeks, the main focus has been getting the librustzcash crates into releasable state because they've had a bunch of work done over the last couple of months and we want to make sure that gets capped off and released, particularly with regards to the Keystone changes that were brought in at the end of last year. There were some changes that had to flow through from further up in the create stack and dependencies, basically to enable Keystone to get on to published versions of our crate stack rather than depending on pinned dependencies, which should then mean that future updates are then just them rolling dependency updates rather than needing to update vendor libraries.

[00:12:55.13] 

So that work has been done. We are going through the release motion not as we speak, because we're all on the call, but today. Almost as we speak. Almost as we speak. That will include the changes for all the no standard stuff that we did to enable Keystone. There's other stuff that's gone in there. The transparent change recovery work is not going to be in this set of releases because that's a significant enough change to the way that the wallet code synchronizes transparent logic, that we want that to be in its own breaking release change.

[00:13:43.32]

So the PR is ready to go. And as soon as we've done the crate stack of releases, we will then be merging that and rolling that through to the mobile SDK so that Zashi, Edge, Unstoppable, et cetera, will be able to test that and make sure that that potentially works however they're working with their wallets. And that will also be the point at which then Zallet will be able to start leveraging that. That's probably the point at which we start being able to add some of the transparent-related RPC keys to Zallet.

[00:14:17.33]

The other thing that we did in the last couple of weeks was, wrote up and put together what's now ZIP 325, which is a specification for account metadata keys. The intention with this is to enable a commonly understood key tree that any wallet that wants to encrypt or handle off-chain metadata that their wallet is generating in a way that you can recover from an encrypted backup from using the same seed material backup as you already have, the seed phrase, backed up. This is something that will enable you to do that, which will be useful for Zallet, for Zashi, for probably other wallets if they wish to use it.

[00:15:01.25] 

But the main motivation for doing it this way is that then the Keystone Firmware will be able to be updated to export the root of that correct tree so that without needing the Keystone to be involved in all of the key derivations for that. So it's a single predictable key that they'll be able to refer to.

[00:15:21.41] - **Daira Emma**

And by Keystone, we really mean any hard and compatible wallet.

[00:15:25.41] - **Str4d**

Any hardware wallet will be able to do this yes. if you have a wallet that wants to integrate with PCZTs and is doing the thing, we'll be able to do everything the Keystone does. But the general mechanism of it when you're exporting the unified full viewing key, which is what gives you the view capability for the shielded and transparent, like notes and things, they will also be able to export this account metadata key, which gives you the encryption capability for off-chain metadata that while it might be associated with it.

[00:15:58.03] - **Daira Emma**

Yeah. So by that metadata, we mean things like address book, annotations on transactions, what exchange rates were that we use to calculate amounts, all things that are necessary for tax and stuff like that.

[00:16:16.29] - **Str4d**

Yeah. Moderation related things. If a wallet is putting in stuff related to memos that they don't want to see in their wallet persisting that information as well. So that stack of things is what that enables. And then, yeah, just the other thing that happened last couple of weeks was I implemented support in the mobile SDKs for fetching and submitting transactions over Tor. That's going to hopefully roll out. I just need to get the Swift bindings in place, but that will hopefully roll out as a capability in the mobile SDKs in their next release, which then while it's using mobile SDKs will be able to leverage for... Particularly transaction submission is probably going to be the first use case for this.

[00:17:11.04] 

Done correctly and done carefully, we'll be able to break the link to stop lightwalletd's from directly observing who is submitting transactions on the network. You obviously need to take into account the fact that there are possibilities for timing correlations here because if you submit a transaction and then you immediately query it via public provider or the lightwalletd information about it, you can run into problems so anyone integrating it does need to think carefully about the patterns with which their wallet does requests but at least once we have the capability in the SDK, that's one of the things we'll be slowly working on, integrating it into the various requests that the SDK itself makes to that beyond what the SDK supports wallets making directly.

[00:18:07.25] - **Daira Emma**

Tor does have limitations in its adversary modelled. It's not designed to protect against global surveillance, but it does do a pretty good job of protecting against compromised infrastructure.

[00:18:24.29] - **Str4d**

Yeah. It's the simplest next iteration on this pathway. Stronger iterations would be using things like NYM, mixnets, that approach, which is definitely something that there's interest in looking at. Now that we have the infrastructure behind this, this is a simple step forward to lift the network level privacy. Cool. I think that's everything.

[00:19:03.40] - **Daira Emma**

There is an interesting aspect of that metadata key derivation, which is that it's tied to a ZIP. In order to define a subtree of the keyspace that you can guarantee that is only used by a particular protocol, you just define a new zip and it will be skipped to that. Kris?

[00:19:32.50] - **Kris**

The other thing that I wanted to remind folks of is that the other thing that we've worked on in the last few weeks is NU7 zips, specifically the v6 transaction format Zip has, we've made substantial progress on and some other of the Zip editing.

[00:19:54.38] - **Str4d**

As that relates to the core stack, there won't be any v6 format changes to the to the WIP format that is in the crates in this set of crate releases that will come in a subsequent update to the core REST libraries. And it will probably come in behind a feature flag initially while we can check things down and make sure that all the various component features get in.

[00:20:20.07] - **Daira Emma**

So we should have a discussion later about feature flags because we had some ideas about that. But let's get on with the updates first.

[00:20:30.55] - **Dodger**

I don't think there's anybody here from Zingo Labs. Let me just double check the. We'll skip on to Frost, which I'm guessing is Conrado.


___


### 3. Research & Implementation Updates i) FROST Audit & Demo 


[00:20:50.44] - **Conrado**

The main thing that's going on with Frost is that Least authority were auditing our Frost client and Frostd tools, and they provided us the audit report. Nothing major. There's a bunch of minor issues that we already working on. So we've been addressing those issues. It shouldn't take too much time, probably this week or early next week, we'll finish those.

[00:21:19.04] 

We'll probably double check that we fixed everything. And that's it. That will wrap things up with the Frost project. We made a community call yesterday presenting the Frost server and doing a demo. We had a couple of issues with the demo. Just demo gremlins got us, but we probably be rerecording the demo and we'll probably upload that next week or the other week. But that's mostly it. There's a bunch of small work left, like integrating with PCZT's, which I think will be valuable. But other than that, the next steps for Frost is for people to try to integrate it with wallets or other piece of software. And if you need help with that, reach out.

[00:22:17.32] - **Kris**

I was just going to make a suggestion. Given that Zcash dev tool is an easy to hack option here, it would be excellent to have the your reference implementation made available as Zcash dev tool commands, if that's possible?

[00:22:37.16] - **Conrado**

Yeah, that's a good idea. I think I thought about this at some point and it makes sense. I just now have to schedule the work, but yeah, it does make sense.

[00:22:51.59] - **Dodger**

In terms of scheduling, our priorities really are zcashd deprecation and getting ZSAs merged into Zebra.

___


### 3. Research & Implementation Updates ii) Crosslink Hiring & Roadmap discussion


[00:23:28.23] - **Nate**

On our side. So what we've been up to is a lot of focus has been on interviewing and hiring folks. So we've hired a couple, and I think we have one more joining soon, so that's pretty good.

[00:23:51.49] 

Next week, our team is going to be meeting in person and focusing on the roadmap for a crosslink implementation and then what the code design might look like and also we want to get specific about the requirements for a first milestone and this milestone we want is some demo or proof of concept that people can run that demonstrates at least some piece of crosslink functionality added into a zebra fork. And we want to have that demo done by the end of March.

[00:24:47.04]

Meanwhile, we've been looking, trying to understand zebra CI and trying to decide how much of it we should reproduce. Right now we're leaning towards not reproducing it by default and instead just creating new automated CI for the crosslink prototype-specific stuff. But then if it works for the zebra team, we might occasionally like to create a draft PR to get the full comprehensive CI feedback for the current state of our prototype on occasion when that makes sense, each milestone or not. So we're interested in talking to super devs or the CI folks about that. So that's our update for today. Any questions?

[00:25:54.22] - **Dodger**

No question, but just a point of information that we have a [community call](https://www.youtube.com/watch?v=oPZqvRCC-Pg) I just scheduled or actually took place today that gives an overview of our CI setup. Thank you, Jack.

[00:26:09.25] - **Mark Henderson**

Yeah, that was today. That was really useful. And thank you, Gustavo, for presenting.

[00:26:18.06] - **Dodger**

Yeah, I really should be on top of these things, but there's so much going on. So many community calls. So much stuff going on. Cool. Any questions relating to Crosslink? And by the way, if I should be changing these slides in any way, just let me know. Just ping me an email or something. If any of these slides are inappropriate or have the wrong thing on.

[00:26:45.59] - **Daira Emma**

Actually, I have a question. So the current security analysis of crosslink is incomplete. I mean, I have in my head the necessary arguments, but they're not completely written down. From Shielded Labs point of view, when do you need that by?

[00:27:11.56] - **Nate**

That's a great question. Part of our approach is to start building a demonstration that does stuff that people can poke at and that we can learn from around the implementation without blocking on the design being super solid. So that should give you more time. And also, I couldn't say when that would be needed by, but definitely after the first milestone, I think, which we were aiming for the end of March.

[00:27:52.48] - **Daira Emma**

Got it. Yeah, just for me on prioritization.

[00:27:57.49] - **Nate**

So also our intention is to be doing iterative milestones of the prototype. So it'll become clearer and clearer when we're approaching gaps in the design.

[00:28:15.56] - **Daira Emma**

Yeah. There is, of course, the finite event Python model, not really prototype. And I really want to get that done because that would give us a lot of confidence that the design is sound. So that was working.

[00:28:39.41] - **Nate**

I see a subtle indication about updates. But maybe what we should to you is plan a discussion about crosslink design and next steps sometime after we have a roadmap hashed out.

[00:28:54.44] - **Daira Emma**

Yes. Cool.


____

### 3. Research & Implementation Updates iii) NSM Update 

[00:29:03.31] - **Jason**

Yeah, so Mariusz couldn't make it today, so I'll provide the engineering update on the NSM. And any feedback you guys have, I'll relate to them tomorrow. So we made a lot of progress on the integration work. For Zip 233, we removed the feature flags and added NU7 in the v6 transaction format version.

[00:29:23.20] 

For Zips 234 and 235, we added two separate feature flags. We removed the feature flags from librustzcash and added NU7 in the v6 transaction format. The Zcash test vectors were updated for the v6 transaction format. All PRs, except for librustzcash were rebased on the latest upstream. The one for librustzcash was not because Zebra does not use the latest librustzcash, so we had to keep the older code from December 2024. Next steps, we're going to meet with Eiger on Tuesday to really any feedback or updates, and also discuss what else needs to be done before these PRs are merged upstream.

[00:30:15.48] - **Str4d**

Yeah, I think as far as librustzcash goes, the right point to target will be just after the set of crate releases that we're currently doing, because that will be the next target that zebra moves to. Probably the thing that's interfering at the moment is I don't know for certain, but I presume the security for secp256k1 update that we were required to do as part of the Keystone changes might be what is giving some problems there potentially. But that was also why we were delayed in doing crate releases because of the dependency stuff we had to work on. But if you're able to target the rebase just after we've done the next set of releases, then that would be the smoothest integration pathway.

[00:30:54.56] - **Jason**

What's the timing on that?

[00:30:57.16] - **Str4d**

Like I said, in our update, we're trying to do those releases as we speak, except that all the engineers are in this meeting, so we can't do them right now.

[00:31:04.34] - **Jason**

So they're imminent?

[00:31:07.17] - **Str4d**

Imminent, yes.

[00:31:10.50] - **Kris**

There is a topic that we have for later discussion on how we want to handle feature flagging that'll be relevant to this and relevant to, I think, the question from Nate about integration with zebra, hopefully.



____

### 3. Research & Implementation Updates iv) ZSA Offchain Metadata

[00:31:55.59] - **Daira Emma**

Oh, I guess there is something that we could talk about related to ZSAs. The Zip editors suggested a design change. Currently, there's a string called asset desc that describes each asset, and that's paired with an issuance public key. That specifies the asset uniquely. The change that the Zip editor suggested was that the asset desc should only be encoded as a hash on the blockchain.

[00:32:41.15] 

And part of the motivation for that was that we don't want wallets to just display the asset desc. I think that's an attractive nuisance because what a user needs to know about an asset is much more than that. They need to know the reputation of an issuer. They need to know a rough idea of how much it's worth, what security issues there might be with it. If it claims to be wrapping a particular currency, is it really wrapping that currency? Is it just an outright scam? Without that metadata, the user can't really make a decision about what asset this is. We think that that will need an off-chain protocol to provide that information because you really need to rely on the reputation of people who are telling you things about an asset.

[00:33:53.05] 

There's, I think, a little bit of pushback about this design change from Qedit. They were perfectly prepared to do it, but they wanted to make sure that we were actually all okay with this, and we wanted to really get it. So you would be able to verify an asset desc if you were given it, but it wouldn't be on chain. Does anyone have any comments about that design change?

[00:34:30.08] - **Zooko**

I put some comments in text just now. 

[00:34:39.59] - **Nate**

Yeah, maybe it's related to what Zooko said in text. I don't know much about this area, but I had heard, I think it was MetaMask promoting a standard called token lists for Ethereum land. And I think it basically boils down to There's curation of lists that map the metadata to the high entropy crypto-stuff, cryptographic stuff. And then I think the token list world is your wallet just might, by default, subscribe to one of those, or maybe users can pick which ones they subscribe to. But I just wanted to bring that to people's attention.

[00:35:29.03] - **Daira Emma**

Yeah, that's an idea I think we'd already talked about at the Z|ECC summit.

[00:35:35.02] - **Str4d**

Yeah, the idea of wallets being responsible for conveying some trust to their users regarding this was something that also was part of the discussion that led to the ZIP editors making this recommendation. And then as far as the main pushback, as Daira Emma said, was potentially never having access to to the "original asset desc". But the main arguments we made against that, which as far as I can talk against Qedit were that, well you can do that anyway. If an asset desc is a bare string, you can just put a commitment to a different string in there and not reveal what the real string is, even with the previous protocol. You can't force anyone to reveal the human readable string.

[00:36:30.38] 

Then on the flip side, for people who do want to ensure the human readable string is accessible on chain at some point, you can put that into a memo field. Now, currently, the memo fields are only 512 bytes, but because memo bundles are being proposed for deployment at the same time as ZSAs, that actually means that you'll be able to have memo bundles in the same issuance transaction.

[00:36:53.40] 

You could just have a memo bundle encrypted with the all zeros key in the very first transaction transaction that issues an asset, and then you wouldn't need to include it or pay the fee to include it in any future transactions. But that would mean that it's available from nodes that haven't pruned that member bundle.

[00:37:13.29]

So that problem can be resolved in a way, although you still have the trust problems that really do need an off-chain protocol.

[00:37:23.32] - **Daira Emma**

An interesting aspect of that is that it needn't be only the issuer that is providing that metadata. They could provide it in the transaction that creates the asset, but then other people could provide it in the same format. Then you would have some reputation system to show the user some filtered view of all those opinions about a given asset. 

[00:37:59.17] - **Kris**

Yeah. Zooko posted in the chat that because the asset description string is under the control of the attacker, a good wallet should probably never display that string. I continue to contend that even though it's possible to put it in the memo bundle, that that's actually an anti-pattern with respect to security for users, and that it should only be possible to obtain that asset description via off-chain protocols that the users can explicitly opt into. Because otherwise, there are too many ways in which that asset description string, if it is on-chain, if it's revealed to users, can be used to mislead users.

[00:38:46.51] - **Str4d**

And indeed, doing a via memo means that while it can't assume that it's going to be there. So even if the issuers choose to put it there for accountability purposes themselves, while it can't rely on it being there like they could with the current protocol.

[00:39:01.52] - **Dodger**

I see a bunch of people have their hands up, but we do have time at the end for open discussion, so I suggest we move further discussion of this to the end and just check again to see if there are any open announcements.


___


### 4. Open Announcements i) ZconVI March 4th - 7th 

[00:39:23.46] - **Dodger**
From my part, I'd just like to remind folks that ZconVI is coming up. If you If you go to the zfnd.org website and click on Zcon, you'll find all the information there. It's taking place between the 4th and 7th of March. It's happening entirely online, so you'll be able to watch it from the comfort of your own home and indeed from your sofa, if like me, you have YouTube on your TV.

[00:39:50.46] - **Daira Emma**
And come and see my presentation on postquantum Zcash. Which is coming along nicely.


___


### 4. Open Announcements iI) Arborist Calls livestreamed to X


[00:40:09.04] - **Daira Emma**

Okay, we'll move on to open discussion, and we have a topic today that was requested by Jason, and he'd like to talk about streaming Arborist calls to social media platforms.

[00:40:20.03] - **Jason**

Last week, I posted to the [forum](https://forum.zcashcommunity.com/t/arborist-calls-lets-livestream-to-x/50328/39) about live streaming the Arborist calls to the Zcash X and really other social media. The reason for this is that the Arborist calls provide the best updates for our core engineering efforts and demonstrates our commitment to building in public.

[00:40:37.54] 

However, live attendance is low. Youtube recordings rarely exceed 150 views. The objective to live streaming is to increase engagement, expand the visibility, and establish or really reinforce Zcash's credibility as an active and innovative project. It seemed to me that the vast majority of community members Arborist call participants supported live streaming. But a couple of people raised some concerns about Elon Musk, hate speech, the politics of X.

[00:41:09.56] 

While I understand your concerns, like politics aside, the reality is that X is where most crypto discussions happen. It's where the majority of Zcash contributors and industry participants are active. But most importantly, the Arborist call recordings are already posted in full to the Zcash X page so this is simply about livestreaming them to increase visibility and engagement in real-time. Youtube is public, but it doesn't drive the same level of interaction or discovery. If we want people to be aware of and engaged with Zcash development, then we need to meet them where they are.

[00:41:51.19]

If there's a better platform for achieving that, I'm open to hearing it, but right now X is really unmatched in terms of reach and impact in the crypto space.

[00:42:10.26] - **Daira Emma**

Well, X is an anti-trans platform. Its CEO is a racist, a white supremacist, a Nazi. The things he's doing is beyond the pale. He is attempting to dismantle democratic institutions in the US and other countries. And if we can't take a stand, then I don't know why we're here.

[00:42:49.10] - **Jason**

I understand that point, but the thing is everybody's already using X.

[00:42:54.09] - **Daira Emma**

Maybe we should stop using X.

[00:43:02.13] - **Str4d**

Everybody's already using Bitcoin. Maybe we should stop developing Zcash.

[00:43:09.19] - **Jason**

The majority of the Zcash community is on X. All our most vibrant community groups.

[00:43:17.34] - **Daira Emma**

I will repeat. X is an anti-trans platform. It's impossible for me to say anything on X because the hate speech would be Incredible.

[00:43:34.05] - **Jason**

Okay, I mean, I'm curious what Jack and Josh think. Josh is ultimately responsible for the Zcash Twitter. Jack, I take it you're responsible for the Arbolst calls as they are a community resource?

[00:43:48.05] - **Dodger**

I'd say I'm responsible for them in the sense that ZF took over running the Arbolus calls at ECC's request. I'm not going to be mandating that anybody attends Arbolst calls has to accept anything specifically. I mean, I will say that I've always been of the opinion, and this takes right back to my earliest days at ECC, I've always been of the opinion that Zcash should be apolitical. Zcash and freedom.

[00:44:20.31] - **Daira Emma**

I don't have the option to be apolitical. Marginalised people don't have the option to be apolitical, ever.

[00:44:30.10] - **Dodger**

Zcash and freedom and privacy are for everybody, no matter where you land on the political spectrum. And I've always been against us taking a particular political stance. I think it's a bad idea. But that said, at the end of the day, it's not for me to heavy-handedly state that you can only be part of the Zcash community if you're willing to be streamed on X.

[00:45:02.58] 

But that's my perspective on it. For example, there are people who object strenuously to us using Zoom for these calls. The simple fact of the matter is that Zoom is a convenient platform. It means that we can record it easily without having to use separate software. We have moderation capabilities where we can promote people to panelists and demote them if somebody shows up who's causing trouble. We just do what's practical. And I appreciate that people have very strong views about specific things, but ultimately, from my perspective, running these calls, we just have to be practical about them. I think, Francisco, are you looking the comments on this factor?

[00:45:59.38] - **Daira Emma**

So no, we don't have to. It's our decision. It's not forced. It's a decision that we can make one way or the other. I personally think it's a pretty low bar to resist fascism. And that is what we're talking about here. So, okay, I said my piece. I will not refuse to participate in the Arborlst calls if this decision is taken, but I am protesting it very strongly.

[00:46:42.55] - **Str4d**

A question I have here is one of the... What is the utility of livestreaming versus the posting recordings? What is the actual benefit that we wish to see from livestreaming recordings on any platform?

[00:47:11.02] - **Jason**

I can answer that. That's a good question. I think the difference is people are just scrolling through looking at posts. When the Arborist call is just posted to the Zcash Twitter, you're just scrolling by with all the other noise that's there. The Livestreams are much more engaging. There's a top bar where it's like, what's currently happening? They're Twitter spaces, and now they have a video live streaming function, and you can actually engage. I think that it would just bring additional engagement. It would potentially bring more community members, more developers, and it would signal that we're active and doing so in public on the number one social media platform.

[00:48:05.01] - **Str4d**

My following question here is, why focus on X then? If the principle, like TikTok, is far more widely used than X when it comes to video streaming and video interactions. Tiktok would be the first thing I would have suggested livestreaming to.

[00:48:25.22] - **Jason**

We're actually also talking about TikTok, but for sure, It's not for like...

[00:48:32.20] - **Str4d**

You can do it on TikTok. If the straighter motivation is really to reach people who are scrolling through and wanting to watch videos, that's the place to be. The way that I would look at this is, firstly, identify what it is, the benefit that we actually get from changing the way that the recordings happen, because the addition of essentially additional places where people, which is a combination of developers, engaged community members or general cryptocurrency community members, and the disinterested users who might stumble upon us, figuring out what they actually are wanting to engage with and what interest they will get from that. Secondly, what the moderation burden will be from engaging on those various platforms, because there will be a moderation burden that someone will have to pay to manage live streaming on those services.

[00:49:38.06] 

Comment moderation, banning, whatever. We need to know what tools are available for those. We need to know what kinds of things are for that. We have an established pattern at the moment because at the moment we can rely on the fact that the Zoom calls have an attendee list. I think that has recently changed because of the time zone problems. But Zoom is designed for meetings. There's controls that the meeting runner has for managing those meetings. If we had someone who needed moderation here, we could do so. Do these other platforms? What tools do they provide for this? What tools do they provide for managing it? How much additional effort and cost is going to be on top of us to maintain that for the benefit that we in the community get?

[00:50:23.13] - **Jason**

Well, I think there's a bit of a misunderstanding there, unless I'm misunderstanding what you're saying. It would just be live casted to X. It would still be run through Zoom.

[00:50:33.40] - **Dodger**

Yeah, my understanding, because I've also had other discussions about this with other community members, and my understanding is that they're essentially looking to join the Zoom and then somehow, I'll confess, I don't understand exactly how it works, take the feed and live cast it somewhere else. So it's not the case of we would be moving to X We've been moving to TikTok.

[00:51:01.46] 

My understanding is that nothing would change from our perspective. We would still be using Zoom. We would still have these moderation tools available to us. And by the way, those include things like I can mute people, I can demote them, change the role to attendee. We have moderation tools here available to us. It's not like the suggestion is that we move the meeting onto a different platform. It's purely that the suggestion is that this meeting gets re-broadcast or restreamed on that platform.

[00:51:39.08] - **Jason**

Yeah. Ryan, who does the Zero Knowledge AV Group, he brought up that he wants to use software to not only livestream it to X, but to other platforms as well, like Discord and other platforms like BlueSky.

[00:51:54.14] - **Daira Emma**

I don't think that they have the functionality yet.

[00:52:00.08] 

I think we need to be clear that we're talking about streaming to a platform where a lot of bigots and people who hate trans people in a very extreme way hang out. It is increasing the risk that someone who decides as, for example, to a swat a participant because they don't like something that they've said. That is something that happens, and it's more likely to happen if people on X are listening to these calls, to be honest.

[00:52:50.08] - **Dodger**

I'll just comment here. I'm struggling here because I'm hearing an echo in my headphones because I've just logged on to this Discord, it's the Zcash Global Discord, and you can see that this call is currently being restreamed there.

[00:53:16.52] - **Daira Emma**

Just trying to figure out how to share that. Yeah, the call is public. This is all about risk management. This is all about choosing where you rebroadcast it and not choosing a place where...

[00:53:37.05] - **Jason**

Could we try it out? See if there's any evidence...

[00:53:39.10] - **Daira Emma**

...where a whole marginalized community has been essentially chased away from the platform because any protection for that community has been systematically removed.

[00:53:55.03] - **Jason**

Daira Emma, I just wanted to make sure I heard you correctly. I'm not sure what you said earlier, but did you say that if it was broadcasted, it's a strong protest, but you would still participate in the Arborist calls, or you would not participate in the Arborist calls?

[00:54:16.19] - **Daira Emma**

I said that I would participate under protest.

[00:54:25.41] - **Dodger**

One thing I want to make sure is that if anybody does feel that they don't want to participate, please let me know privately and I can relay the information because I appreciate that there are certain folks in the Zcash ecosystem who are quite nasty. And I'm looking at a Telegram screen right here where some of them hang out. So people may not be willing to say here, that they would not be willing to participate in Arborist calls if it's restreamed on a particular platform. If that is the case, feel free to reach out to me privately and let me know.

[00:55:15.04] - **Daira Emma**

I mean, that is not a final decision, by the way. It depends what happens. If I think that this is increasing my risk significantly, then I'll stop participating.

[00:55:36.14] - **Conrado**

Just as a reference, the Zcash Dev fund Twitter space that happened in August last year had 305 listeners. And I feel like this is not a gigantic number that will be super convincing for us to do this streaming at X/Twitter. But I share Daira Emma's opinion I feel the same, but I also won't stop participating if it does get streamed to Twitter. But I just feel like it won't matter that much. But if people want that, that's it.

[00:56:16.13] - **Daira Emma**

I have to say I'm disappointed that people are apparently hearing what I'm saying and not listening. Or listening and not hearing. I don't know which way around it is. I mean, you can probably hear in my voice how disappointed I am.


___

### 5 Open Discussion i) ZIP 231 Encrypted Memo Bundles 


[00:56:57.59] - **Daira Emma**

I think we could We're going to continue now the qedit discussion that I interrupted earlier, if we want to.

[00:57:05.32] - **Daira Emma**

It's also the thing about feature flagging.

[00:57:17.18] - **Dodger**

First of all, was there anything else, any other points that... I think several people had their hands up for the Qedit ZSA asset desc discussion.

[00:57:40.13] - **Alfredo**

Yeah, I have a question not exactly about the Qedit stuff, but I was making a high level overview on the [memo bundle zip](https://github.com/zcash/zips/blob/main/zips/zip-0231.md). I know it's a draft, and it seems that there is stuff missing. I wasn't able to figure out, for example, how it's going to be possible for... So the idea, one of the requirement is to... If you have a memo, you can know it before decrypting the whole thing. That's beneficial for wallet clients. I wasn't able to figure out by the zip how that works. So I was wondering if it needs more written stuff or what the status i sabout that?

[00:58:30.17] - **Kris**

That particular case, I think, is covered in there. But the notion is that there will be a well-known memo key such that upon trial decryption of an output, if an output decrypts to you, the memo key will then indicate to you that there is no memo available.

[00:58:57.01] - **Alfredo**

Okay. Yeah.

[00:58:58.52] - **Str4d**

From memory What it is, is that if an output has the all zeros memo key, then that implies it's decryptable by everyone because any well-known key can be decryptable by everyone, but that's the standard already. Then the all ones memo key is being used as the no-memo flag because there's a cryptographically negligible probability of that ever colliding with a real key.

[00:59:25.23] - **Alfredo**

Okay, that makes sense. In regards of the status, do you think it's ready or what do you think is the status that, specifically?

[00:59:37.01] - **Daira Emma**

Is this Zip 231?

[00:59:40.17] - **Kris**

Yes.

[00:59:43.38] - **Daira Emma**

The status is that it's not implemented yet.

[00:59:53.38] - **Kris**

It's almost completely proposed until it has a reference implementation, I believe.

[01:00:01.16] - **Daira Emma**

Yes.

[01:00:04.04] - **Alfredo**

So do you guys feel that with that zip in the state as it is, it's enough to make an implementation?

[01:00:11.25] - **Kris**

As a couple of weeks ago, I was actually working on an implementation. I've been pulled away from that for other reasons, but yes.

[01:00:21.47] - **Daira Emma**

Yeah. If there's anything that you think is missing, then please comment on the Zip. 

[01:00:29.19] - **Alfredo**

Yeah. I'll do that. Okay. 

[01:00:34.35] - **Str4d**

Yeah, the consensus part should be... We reviewed that in the Zip editor discussions end of last year. 

[01:00:45.31] - **Daira Emma**

I'm looking at the things that are still to do. There's the transaction to sighash which we know about that because that's basically part of the ZIP.

[01:00:59.55] - **Str4d**

We're working on that now. Just as with all the other Zips, it's the Zip editors who are defining the sighash because it depends on some of the features.

[01:01:11.59] - **Daira Emma**

It says there's a potential interaction with Zip 302, which is an older memo format Zip. We haven't thought about that, but as far as it goes, it's well specified. And I think it's just that that other zip needs to be updated or maybe even withdrawn in light of these changes.

[01:01:43.28] - **Alfredo**

Yeah. So I feel doing very high level overview. I have very limited knowledge in a lot of stuff, but if I have to implement it, I'm not sure if I will be able with just what is written right now. But yeah, it could mean that I don't have enough background or capability to do it. I could comment it out that some of the things that I feel that will need some clarification.

[01:02:13.53] - **Str4d**

That would be good to know because the protocol for decrypting and using these is fully specified there. So if it's not clear to an implementer what is needed there, then that just means we need to refactor the zip itself. But in particular, the memo decryption heading should be a step by step for doing exactly what you need to be able to access a memo bundles contents.

[01:02:48.04] - **Alfredo**

Thank you.

[01:02:49.47] - **Daira Emma**

I've just looked over it again. As far as I can see, it's well specified. The only thing that might be a little vague is which chunks you consider to be pruned, but that's a local decision. Maybe we could say a little bit more about that.

[01:03:34.12] - **Conrado**

Yeah, about the asset description, going back to it a little bit. I feel like wallets needs to show something for the user, and they will show something for the users, and they will get this information from somewhere, and probably each wallet will do something different that we have no control of. So I wonder if there is another approach to do this.

[01:04:06.31] 

For example, restricting what an asset description can be, like an username, just letters, and the score, and whatever. I feel like this is a problem that's not being fully solved, but people are used to it, like usernames, stuff like that, and domain names also. So I wonder if just restricting the what an asset description can be could be a better option.

[01:04:34.37] - **Kris**

There are a few problems that we discussed that arise here. The motivation for that change is, I think, pretty well stated in the Zip if you haven't read it yet. But there are different kinds of attacks that are possible. If the asset description is on-chain, then the simplest thing, the simplest attack is that the asset description can spoof some popular other asset's asset description, but use a different issuer key.

[01:05:10.02] 

That could mislead users if the wallet displays that asset description. If you have something where you have some trusted set of issuers, because there is currently no key rotation mechanism available, that then means that if an issuer issuer's key is compromised, then a trusted issuer could issue some new asset, or that issuer's stolen key could issue some new asset, and that then could mislead users and trick them into trusting or trying to use an asset that is malicious.

[01:05:53.39] 

There are other concerns. For example, if the asset description can be an arbitrary string, then it could include either abusive content directly or things like you can dox individuals via an asset description, and it's just public information that is immutable on chain.

[01:06:17.53] 

I would suggest looking at the motivations behind that PR, which is [975](https://github.com/zcash/zips/pull/975) on zcash/zips. And take a look at the motivations there. And if you have comments, maybe it would be a good idea to take those up there.

[01:06:54.17] - **Conrado**

Will do. Thank you.

[01:07:00.25] - **Str4d**

John in chat asked, could Frost be used for validating these things set at CT logs? No. For two reasons, because they're also two separate technologies. Frost can be used for issuance because the issuance keys are just public signature verification keys. There's nothing preventing someone from being an issuer, but having that issuance key backed by Frost. That's indistinct distinguishable from being a single signer.

[01:07:33.55] 

So Frost provides no benefit for verifiability purposes. What it provides is potential benefits for sharding or control of a signer, assuming you trust that that key is indeed backed by Frost rather than just a single issuer. It provides benefits to the signing operator, but not to the people who are externally observing the signer to try and verify them, specifically because it is designed to be indistinguishable. CT logs don't provide a benefit here because the purpose of a CT log is essentially to make an indelibly visible mark that some signed action occurred. We already have one of those. It's called a blockchain. CT logs are essentially just blockchains. You can think of them as a blockchain as being a very horribly asymmetricly balanced cryptographic tree.

[01:08:33.45] 

So we already have the properties that a CT Log would give us here are essentially already provided by the property they have. Ct Logs are for people who don't want or need the proof of work, the high-level consensus aspect of chains, but need essentially the distributed validation. That's where a CT Log shines. We don't need that because we already have a blockchain.

[01:09:05.34] - **Daira Emma**

But by the way, I think transparency logs are a fantastic primitive. We have them. Yeah, we have them for free.


___

### 5 Open Discussion ii)  Ecosystem wide feature flags 


[01:09:21.37] - **Kris**

Shall we move on to feature flagging?

[01:09:25.05] - **Daira Emma**

Sounds good.

[01:09:27.16] - **Kris**

Okay, so we've had We did come up in the forum, or not in the forum, but in the R&D dev channel, a question about how we should handle integrating new functionality that is intended for the next network upgrade, the observation was that the zcash unstable = Zfuture configure flag that we introduced in the past isn't sufficiently flexible. In particular, you can't have multiple configure flags with the same identifier active simultaneously. What I wanted to propose for this is that we agree upon some ecosystem-wide configure flag, like zcash unstable = NU7 or something of the sort.

[01:10:29.50] 

And then within each crate, guarded by that configure flag, new functionality will be introduced under an ordinary rust feature flag. Now, the advantage of this is that if we adopt, for example, zcash unstable = NU7 across the ecosystem, because of the way that configure flags work, they are enabled in every crate when you build with them, which is actually That's exactly what we want here. Then we can, for modularity purposes, put, for example, the memo bundles code under a rust feature flag. We can put the a ZSA code under a Rust feature flag and can essentially implement those Rust features as they're intended in an additive fashion, such that when you turn on all of those features, then you get all of the functionality is intended for a NU7.

[01:11:32.10] - **Daira Emma**

Yeah, and it's also important to be able to do arbitrary Boolean expressions of feature flags and have code be conditioned on that because that's something that you might need And if there's a combination that the code doesn't support, you just error.

[01:11:51.22] - **Kris**

Yeah, and the nice thing is that the config macro or the config annotation allows you to combine both feature declarations and configure flags in a straightforward fashion.

[01:12:09.53] - **Str4d**

So two things. One is the key thing to remember here is that with whatever we do, as like by convention here, it has to involve a config flag and not a feature flag because feature flags are additive. And so we need to ensure that any not yet released changes do not affect current consensus. So absolutely everything that is making changes to production code, pre setting a mainnet activation height that could potentially affect it, should be going behind, behind essentially this top-level config flag.

[01:12:54.28] 

The granularity that I think has been proposed here, because as Shielded Labs noted earlier, they previously, I believe, were using just feature flags exclusively and now have switched to config flags exclusively. I don't think that model is incompatible with what's being proposed here because it involves a config flag. Enabling use of feature flags is convenient because feature flags are slightly more convenient to use because they operate at a per-grade granularity rather than across the entire dependency stack. It can be a bit easier to pull things together. But because they only work for additive changes. If you have, for example, an interaction between two candidates things, having them both be additive might be sufficient, but there will be edge cases there where if you're looking at, say, ZSAs, ZSAs Enabled, NSM Disabled NSM Enabled.

[01:13:54.32] 

I can imagine cases where feature flags may still not be sufficient. And even ZSAs themselves as another example, because they make significant changes to the way that Orchard works, that also may not work as an additive change. If we're going to do this, then I would propose that we probably have a convention for two config flags. So like zcash unstable = nu7 being the top level one that we control everything with, and then having a Zcash NU, Zcash feature subset or whatever for any non-additive changes that we need to be able to represent. That one, like I said, it's a bit more complex. If we don't need to reach for it, we shouldn't. But I can imagine cases where we may need to, so we shouldn't preclude it from people thinking about it.

[01:14:57.00] - **Kris**

I think that we will probably just discover some things in the implementation process. But if we start off with a basic approach like this, then we can adapt to whatever we encounter in that development process.

[01:15:15.29] - **Daira Emma**

So to me, the thing that you absolutely need a config flag for is to say this is not mainnet consensus because you want mainnet consensus to be absolutely stable and not have to worry about the conditional code interfering with it. Now, if you have some other networks, so maybe Testnet or maybe a private Testnet, that you're still interested in the stability of consensus within that network. And so maybe the right thing here is for the config flag to say which network you intend to be consensus compatible with.

[01:16:21.25] - **Kris**

There's something here that I wanted to bring up, which is that for some things, let's take the Orchard circuit. Given that there will be circuit changes and that both of the circuits, effectively, the current consensus Orchard circuit and the ZSA inclusive circuit, will need to both be separately in the code at the time of the network upgrade activating. That to me says that we're going to have to have just some duplication in the code to to accommodate that. That duplication will then, well, potentially later be able to be removed, although there are questions around how the chain ends up being validated going forward. But I think that for some of this, it's not going to be granular. It's going to be more monolithic,.

[01:17:24.11] - **Daira Emma**

Some things you just can't do with conditional compilation. If you need to support two things at once or at different times in the same network in the same node software, you need to compile both of them in. There's no way around that.

[01:17:40.38] - **Kris**

That actually makes things somewhat easier because since the old code and the new code will both need to exist simultaneously, that means that the new code can be config flagged off and enabled conditionally.

[01:17:59.24] - **Str4d**

The thing that I think we and also the rest of the developer ecosystem trying to contribute code in needs to keep in mind is that we both have multiple stages of code integration, multiple ways that we can control this complexity, and also multiple points at which the changes need to be integrated. For instance, we currently have defined two global consensus networks, ie. That we collectively agree that everyone in the entire world agrees on the contents of those networks.

[01:18:39.51] 

One of them is the Zcash Mainnet, the other one is the Zcash Testnet, the primary testnet. Those two are operated as global consensus networks, and therefore, anything that's targeted for those essentially is in the main code bases without config flags or feature flags because they are part of consensus. And so by the time we get to thinking about deploying functionality on even the regular testnet, that's the very end of the network upgrade process. So that's the point to me the code needs to be in a position where any conflict flags can be removed.

[01:19:17.57] 

Private test nets are not global consensus. They are localized consensus. And so that to me is the point of which, things being in behind config flags or even being maintained as like ZSAs have for the last while in a parallel repository is a better way to manage that, particularly for things of the complexity of ZSAs. That has been a better way to mean that they can iterate without blocking.

[01:19:48.53]

We're just currently going through the phase of transitioning from that management to in-code based management. I think the feature flagging is there's a window of time during the development of the network where the config flagging is very useful. I think that window of time is larger the smaller changes. Because the real benefit I see from this with having a standardized way of doing this feature flagging and config flagging is that smaller changes can be integrated into the main codebase more quickly and iterated on within that main code base without affecting consensus. Whereas larger changes like ZSA essentially by necessity need to be developed and iterated on in separate repositories or branches or separate codebases to reach a point of more stability before they can really be feasibly integrated. Picking the line between those is always going to be a bit tricky.

[01:20:59.29] - **Daira Emma**

Yeah. I had something which was that at one point we were trying to use... I can't remember which form of flagging, which one form of conditional compilation to compile for either mainnet or Testnet. I think this might have been in wallet code. It didn't really work. You really need the code to support both mainnet and testnet.

[01:21:26.32] - **Str4d**

Yeah, that was in the mobile SDKs.

[01:21:31.57]

I think it was conditional compilation there because at the time, again, putting it back into 2019. What we were designing for at the time was two different builds of the SDK, one for Mainnet, one for Testnet, so that users didn't think they were on Testnet, but actually were on Mainnet. I think that was for a nascent codebase that had a lot of new moving parts and really the first shielded mobile wallet, I think that was not a bad decision to make at the time, but it definitely did cause some problems, and we have since migrated away from that. Essentially, this gets back to the point I was saying before about essentially those two networks need to be both supported in the main code and you switch at run time.

[01:22:24.22] - **Daira Emma**

Yeah, because there are well-defined set of differences between those. Although we're having the same issue with regtest, where that's much more loosely defined and was not documented, but is still a mode that the software can be in. The more global a thing is, the more need there is for it to be supported [].

[01:23:11.34]

So is there any objection to using that approach? To be clear, the approach would be you have a config flag which indicates this is not running in a consensus standard mode that is either mainnet or testnet or both. Then when you want to do conditional compilation, you use feature flags, but you also always condition on this, this other config flag. Does anyone see any problems with that? For example, applying it to Zebra or any code that people are writing?

[01:23:59.03] - **Alfredo**

Yeah, so How the config flag works if you're importing the library from Zebra, for example?

[01:24:08.18] - **Str4d**

Are you asking how will it work?

[01:24:12.25] - **Alfredo**

Yeah, I'm not sure.

[01:24:15.20] - **Str4d**

So regular feature flags, you can obviously specify that at the time you pull the dependency in, you can specify what feature flag you want that dependency. If you need to enable feature flags on a transit of dependency, you just make it a direct dependency just for the purpose of enabling that feature flag. That side's fine.

[01:24:34.04]

For the config flags, the normal way you set that is with a rust flags argument, which you can also set them in a .cargo/config file, so a local config setting. What we're basically sitting is --config arguments on the Rust C-compiler. The normal way of doing this is like rust flags = --config  zcash_unstable = blah. Is the environment and then it just works.

[01:25:05.39] 

That would be then if you were trying to do, say, a preview of what will become the nu7 testnet before we're ready to declare that, you might do a build of zebra with zcash_unstable = NU7 enabled, along with if there are feature flags, whether the feature flags are needed. Then that would give you a build of zebra that contains those bits, which is completely domain-separated essentially from the regular build of zebra where you don't have that environment variable set.

[01:25:37.24] - **Daira Emma**

Yeah, I think so as far as... I've not seen any problem where cargo or Rust C ended up mixing compilation artifacts with different flags. It does a pretty good job of that. I mean, previously it would just do a complete rebuild whenever you change the flags, and they've changed that recently, I think.

[01:26:00.14] - **Str4d**

I think in 1.85, that just came out today, they've made some changes to the way they do rust flags. Obviously, if you're changing this particular variable, yes, it's going to do a full rebuild because it can affect everything. But if you have other rust flags that you've been setting, you'll get more stability from the latest rust C, and so it should be at least better.

[01:26:25.14] - **Daira Emma**

So I think it will cache based on the rust flag. So if you're switching between two different sets of rust flags, then you will still get the benefit of caching, which is extremely useful.

[01:26:44.54] - **Str4d**

Really, the biggest change that you would then want to incorporate is really into CI to make sure that you are at least getting warnings, which eventually you will want to raise to errors for a version of CI that has these feature flags enabled. For example, in the librustzcash repo, we've for a long time been we have builds of just the regular stack, and then we have a build with the Zfuture enabled just to make sure that nothing's getting merged that horribly breaks that, but it's not a required to pass, for instance. We don't block on that being broken because it's just far future things that may never make it into the protocol.

[01:27:27.30] - **Daira Emma**

I think we compile with them without orchard as well.

[01:27:31.41] - **Str4d**

Yes, because that's a feature flag that we do in our pulling through for support.

[01:27:39.14] - **Dodger**

I feel like it might be worth writing this up so that it's clear what the proposal is because whether or not it gets... If it doesn't get adopted, we'll need to have it written up anyway to be able to share with folks who are coming into the game and looking to add new functionality. I think also having it written up would make it easier for the rest of the Zebra team to have a look at it as well.

[01:28:10.43] - **Str4d**

It's essentially very similar to the approach we have already been using for the Zfuture stuff for a long time. It's just refined to include potentially feature flags, whereas rather than solely relying on config flags within a network upgrade. Anyway, so It sounds like then we'll be taking that approach for as we're integrating, like as the NSM stuff that now is all moved to config flags, we may, depending on how it integrates in, we might end up turning some pieces back into feature flags as we pull it in, depending on what makes the most sense contextually within bits of code. But there will absolutely still be the top level config flag present. 

[01:29:00.01] - **Arya**

This sounds like a good plan. I think it'll help with the ZSA integration.

[01:29:05.38] - **Str4d**

Yeah, that's far on the ZSA pieces that we've pulled in, mainly done in ZCash Note encryption, we've been able to pull them in in a way that we're happy with without needing feature flags, but the moment we get the next piece in with halo2 and Orchard, it's with that stuff that we're definitely going to be placing behind a config flag in its first integration.

[01:29:31.25] - **Daira Emma**

Yeah, just to have more time to review it and make sure that it isn't causing any regression.

[01:29:39.46] - **Dodger**

Is the halo two and Orchard changes? Are they backwards It's compatible.

[01:29:46.55] - **Str4d**

In theory, yes. And at least the nice thing about the circuit is that we have a pinned verification key for Orchard. So from the proving system side of things, we can be relatively certain that just the changes there are fine. So we may not need to do this all the way through for Halo 2, but there are some... There's just the normal breaking changes to APIs and things we'll have to deal with. But for the non-proving code in the Orchard Crate, there's plenty of scope for shenanigans that we want to make sure we rule out for the initial integration.

[01:30:26.05] - **Daira Emma**

Yeah, there were some design issues with the pin verification key interacting with some optimizations. There are some optimizations that are difficult to make and so keep that stable. But I think those are optimizations that we're not making for, at least in the near future for ZSAs. So it should be fine.

[01:30:56.12] - **Dodger**

Well, we are at time. I'm happy for for people to stay on and keep discussing if they want. But I would like to wrap up the formal part of the call by reminding people that the next Arborist call will be in four weeks time on the 20th of March. We're skipping an earlier Arborist call during Zcon. That said, maybe that we schedule something out of to do a catch up with the qedit folks. But next formal Arborist call will be on the 20th of March, and that will be again in the late slot.

[01:31:35.16] 

And just a final reminder that Zcon is coming up. And make sure you put So we'll put a calendar reservation for those dates in early March. It's going to be a good one. We've got a new approach this year where we have, instead of in the past, the Zcash Foundation has basically set the agenda, pulled in the RFPs and set the agenda for the entire event. This year, we have split it up amongst multiple organizations. So ZF is taking charge of one day, ECC another day, ZCG, a third day, and ZecHub, the final day. So it's getting properly decentralized.

[01:32:24.16] 

So I'm looking forward to seeing how that works. It seems to be working well so far. And I hope that we get to see many of you taking part. So there's a reminder to not... Don't forget to order your free T-shirt. Courtesy of the ZecHub store. We can go and order lots of different Zcash swag. Pacu.

[01:32:57.58] - **Pacu**

Yeah, There will be a bunch of interesting things on Zcon. I'll be also presenting on ZCG Day, I think. So I hope everyone is there. I'll be talking about how Zcash is all time high in collaboration. And so I hope everybody is there. I hope to get my T-shirt for Zcon last the time it arrived three months later. It was a very nice T-shirt, very nice fabric. So if you can get your T-shirt, do so. 100 % recommend it and also So don't forget that today is International Cat Day. So I think there are a lot of cat owners and cat people here. So say hello to your cats today and see you there at the Zcon virtual.

[01:34:02.58] 

Hey, thank you, Pacu. Well, with that, let's wrap it up. And like I said, if people want to stick around to chat further, that's absolutely fine. But we will end the formal part of the call here.


____


**Next Meeting Scheduled: 21:00 UTC March 20th 2025**


___
___
