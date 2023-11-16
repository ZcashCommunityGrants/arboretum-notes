# Arborist Call #65 Notes

Meeting Date/Time: November 16th 2023, 15:00 UTC

Meeting Duration: 35 minutes


**Agenda**: 

+ [Welcome and Meeting Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#0-welcome-and-intro)

+ Zebra Update - [Zebra 1.4.0 / Blockchain scanning](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#1-zebra-update---zebra-140--blockchain-scanning)

+ ECC Core Update - [Wallet SDK updates / Decentralising Zcash Focus ECC](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#2-ecc-update---wallet-sdk-updates--decentralising-zcash-focus-ecc) / [ZIP-317 & Orchard support](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#2-ecc-update-ii---zip-317--orchard-support) / [DZFE working group](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#2-ecc-update-iii---dzfe-working-group)

+ Research & Implementation Updates - [Zcash Sustainability Fund](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#3-research--implementation-updates-i-zcash-sustainability-fund) / [ZSF cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#3-research--implementation-updates-ii-zsf-cont) / [Zcash Shielded Assets update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#3-research--implementation-updates-iii-zcash-shielded-assets-update) / [TFL Book 0.1.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#3-research--implementation-updates-iv-tfl-book-010) / [Frost demo](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#3-research--implementation-updates-v-frost-demo)

+ [Wrap up & Close out](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2065-Notes.md#4-wrap-up--close-out)


## Decision & Action Items

i) Establish Working Group/Task Force for DZFE 

ii) Moving Forward Pili to serve as Point of Contact with Eiger's Zebra work

___ 


Video of the meeting: [recorded]

Moderator: Maria Pilar Guerra-Arias

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome and Intro 

[00:01] - **Pili**

So what is the Arborist call? It is a bi weekly call where Zcash Protocol contributors meet up to discuss update timelines and process protocol research and development efforts, design and implementation of new protocol features, and to identify blockers and unresolved issues. The purpose of this call is to try to make the Zcash Protocol development accessible to interested parties and to provide more transparency for everyone in the community.


___

### 1. Zebra Update - Zebra 1.4.0 / Blockchain scanning 

[01:37] - **Pili**
So all that we can move on to the updates from the core teams and I believe I'm doing the Zebra update today. So updates since last time, last week we released [version 1.4.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.4.0) we wrote a [blog post](https://zfnd.org/zebra-1-4-0-release/) about this and we're going to be doing this for any minor releases from now on.

[02:05] 

The main things to highlight are the fact that we are now including mining support in the release binaries. Before this was only on the experimental Docker image or you had to compile it yourself.

[02:21] 

We also have restored macOS support on a best effort basis. What this means is that we run some tests on macOS on our CI. So whilst CI works on macOS then we will support it on a best effort basis. We are also now including the Zcash parameters directly into Zebrad, same as the Zcashd binary started doing. And then from the next release onwards we are planning to deprecate some Docker tags. So if there are any that you use that you can't live without, please do let us know.

[02:56]

Ideally on GitHub just creating a new issue or you can alternatively message us on Discord or write a post in the Zcash community forum and that way we can take that into consideration and decide whether or not to deprecate all of those tags that we plan to deprecate. So that was the last release.

[03:18] 

We've also been working on blockchain scanning using viewing keys. We want to implement a first minimum viable product, so this will very simply take a sapling viewing key and serially scan the blockchain from sapling activation onwards for any transactions that are associated with that unit. And then we've also been working on some of the issues highlighted way back by the ziggurat team on their red team report and we've also been helping the qedit team to implement and test ZSA's in Zebra. I think that's all I wanted to mention today. So with that, I'll hand over to the ECC for their updates. 

___

### 2. ECC Update - Wallet SDK updates / Decentralising Zcash Focus ECC

[04:14] - **Zooko**

Hopefully someone else from ECC can report on any updates to zcashd and to the Proof of Stake protocol. What I can report on is the wallet stuff and Decentralize Zcash Focus ECC, which is abbreviated DZFE.

[04:33] 

On the wallets it's not different from last time, but we've now kept live support in the wild of shielded Zcash using our SDK with Nighthawk, Edge and unstoppable and we have the beta release of our own wallet Zashi, which is different from last time in that the iPhone side has got a UI that's pretty much complete enough that you can see where we're going so reach out if you want to help beta test Zashi.

[05:07] 

And then there's Brave they told us this week that they've implemented the first phase of their project to integrate Zcash into the Brave web browser. The first phase is transparent only, but it looks like from what I can tell so far, it looks like they've implemented it and the necessary UI, which means they'll presumably start on the next phase soon. The next phase is orchard support and Brave. Okay that's pretty much all I can think of with regard to wallets.

[05:50] 

We've also been spending a lot of time on what we call DZFE, Decentralize Zcash and Focus ECC which includes documenting more precisely what products ECC is still supporting and which ones we're transitioning to other people or dropping.

[06:15] 

The non-technical digital content side has made really good progress on that due to this [Decentralizing Digital Task Force](https://forum.zcashcommunity.com/t/decentralizing-zcash-digital/45349) that Josh Swihart and Chris Tomeo came up with and that Chris Tomeo has been running. Looks like it's going really well. They recruited a bunch of qualified members of the community, including Decentralistdan from the Zcash Foundation, and that task force seems to be making really good progress.

[06:41] 

So I'm thinking that we should try to follow that model with the DZFE of the technical side, maybe we should recruit a task force to help us figure out the steps. But what we've done so far in the last two weeks or whatever since the last Arborist call is just have a bunch of conversations with Coinbase, Gemini, ZCG, Qedit, Ledger, Zondax et cetera. Just letting everyone know how things are changing, introducing people to each know, starting to warm up the relationships and the planning.

[07:20] 

Okay, so if there's anyone else from ECC here who can report on any changes to zcashd in the last two weeks, and there's been a lot of changes to Proof of Stake, but I'm not the right person to report on it.

[07:34] - **Pili**

I think for the Proof of Stake, the Trailing finality stuff that's later in the research and implementation updates. But if there's any updates on Zcashd maybe itself?

[07:45] - **Daira Emma**

I'm not aware of any significant updates.

___

### 2. ECC Update ii) - ZIP-317 & Orchard support 

[07:50] - **Pili**

Okay, maybe we can move on then, so next we have research and implementation updates and Dodger, you want to say something?

[08:03] - **Dodger**

Yeah, I just got a question about the SDK. Does it support ZIP-317?

[08:12] - **Zooko**

That's pretty high on our agenda. The ECC SDK doesn't support orchard or ZIP-317 as of the most recent stable release. Adding orchard support is pretty much our current top priority for user experience reasons. So we're actually user experience driven now. So whatever goes to the top of our priority list is because it's hurting or will plausibly hurt real users.

[08:40] 

The lack of orchard support actually does, because if you import your seed into ECC SDK powered wallet, and the seed was used with a different wallet that supported orchard, if you import it into a wallet that doesn't support orchard, then your funds disappear. So that makes adding orchard support a top priority because disappearing funds is kind of one of the top classes of UX problems.

[09:07] 

Now, ZIP 317 is also a really high UX problem because the user experience effect is your transactions take a long time to go through. Currently, in theory they might also fail to go through but from my observations they currently, with the current usage of the network, mostly always go through, but it takes a long time.

[09:31] - **Daira Emma**

If they were spending enough inputs or outputs, then they wouldn't go through.

[09:37] - **Zooko**

I see, yeah, so ZIP-317 support is also a high priority for the ECC SDK and Zashi.

[09:45] - **Kris Nuttycombe**

Yeah, I can give a little bit of an update there. So just yesterday, some of the final changes needed for ZIP-317 support were merged to Librustzcash and twopoint from Nighthawk has got an [open pull request](https://github.com/Electric-Coin-Company/zcash-light-client-ffi/pull/105) for the Zcash Light client FFI repository that builds upon that functionality to start implementing ZIP-317 support in the SDK. So we're actually getting some contributions towards that end which is great.

[10:24] - **Zooko**

One more point. The light client working group call that happens about 3 hours from now also covers this in more detail and more participants.

___

### 2. ECC Update iii) - DZFE working group


[16:18] - **Kris Nuttycombe**

So Zooko mentioned earlier the desire to begin sort of the technical decentralization process, and this is probably a great opportunity to exercise the start of that process by actually starting to add outside collaborators as committers to the Zcash repository and so forth, so that they're acknowledging reviews can have weight and so forth. So we should establish a working group similar to what's been done for the Z.cash website. It sounds like in the relatively near future.

[17:06] - **Zooko**

Do you want to give updates about renaming and moving and access control on GitHub repos?

[17:12] - **Kris Nuttycombe**

Oh yeah, relevant. Yeah, this is relevant. So one of the things that I've been doing over the past couple of days... So at ECC, we want to make it really clear what products ECC employees are committed to supporting. Those right now are the Zcash core libraries that support the Zashi Wallet. And so the Zashi Wallet apps and the Zashi Wallet SDKs, those have moved into the electric coin company organization, as have a couple of their supporting libraries.

[17:57] - **Kris Nuttycombe**

And then the other thing that we're in the process of doing, so in the past there were some non-public repositories under the Zcash Org and in preparation for adding external community members as contributors to that Org we've been moving some of those repositories out.

[18:22] 

So in general, the ECC wallet SDKs and the Zashi Wallet, their official home, is now under the electric coin company GitHub Organization. But Librustzcash remains where it is. Zcashd remains where it is. There will be in the next few days or maybe the next week or so, I think some major refactoring happening in the Librustzcash repository. One of the things that's happening there is that all of the sapling logic that lives currently inside of the Zcash primitives crate is being moved back out to what is the Sapling crypto crate.

[19:12] 

So it will live alongside of the Orchard crate as a sort of first class independent piece of functionality & we'll also probably move all of the transparent logic that exists inside of the Zcash primitives crate out into its own Zcash transparent crate or something of that sort. So essentially, we're trying to prune and organize the Zcash primitives in particular has kind of grown into a loose baggy monster, and it's hard to find your way around. And so one of the things that we're putting some effort into is organizing stuff and making it easier to find exactly what you need as an implementer using parts of the Zcash protocol.


___


### 3. Research & Implementation Updates i) Zcash Sustainability Fund

[10:41] - **Pili**

Thank you. Any other questions or updates? So let's move on to the sustainability fund. Do we have anyone to talk about that today?

[11:00] - **Tomek Piotrowski**

I can give an update. So we within the team decided that the ZIPs are at a point where they are not changing that much recently, so we thought it's safe for us to start working on some implementation. So just wanted to announce that this is something we've started working on in the last week or two.

[11:27]

I guess two things I wanted to talk about here is one, we realize that there is some overlap between the work that we are doing and the work that other teams are doing that might be included in NU6. So there are obviously some simple things like just the introduction of network upgrade six that somebody has to do, and then there is some work on transactions v6. So I know there is a ZIP-230 that is trying to define transaction v6 format.

[12:08]

We obviously in ZSF will be needing a ZSF deposit field, so there will be some overlap between our work and that work. One thing I wanted to figure out is how we'll be managing that overlap. Is it something that maybe we can do first and then other teams will build upon that or is there some other course of action you guys want to follow?

[12:40] - **Daira Emma**

So speaking as a ZIP editor, if there are changes needed for ZSF to add the v6 transaction format, that should be just a PR. Probably. At the moment the easiest way to do it is a PR onto the branch of the existing PR because I think that hasn't been merged yet.

[13:12] 

Maybe the existing PR can be merged because we have a ZIP sync meeting today, I believe.

[13:20] - **Tomek Piotrowski**

Okay, so this is how we would handle it in the ZIP, but there's also the matter of figuring out how we will handle it in the code itself because we started to work on Zebra first because it's a little bit easier to work with. So we just wanted to figure out. That's another thing I wanted to understand is how would you want that process to look? Is it something that we should develop on our own branch, on our own fork of zebra and then we will gradually move it to Zebra? Or is it something that we should right from the get-go start pushing to a pull request in a Zebra repository or how should that work?

[14:17] - **Zooko**

Who are you asking?

[14:19] - **Tomek Piotrowski**

Yeah, that's a good question. That's another question I had is who should be my point of contact?

[14:27] - **Pili**

So for Zebra I can be the point of contact. I think obviously the sooner we can start to review what you're doing and your code, the better. With of course no guarantees that on when it will be merged or if it will be merged. We can also have a talk to go through how our coding styles, how we work, and to make sure that anything that you do submit to the Zebra repo matches what we are already doing.

[15:05] 

But also we're very happy if you fork it and when you're ready, you do your testing and then when you're ready to submit something, first just do a PR. And I think Arya wanted to say something. Go ahead.

[15:24] - **Arya**

I think pull request on the Zebra repo would be good. This may have been something we would also be interested in doing because I think, and please correct me if I'm wrong, but Qedit would also need something like this?

[15:40] - **Daira Emma**

Yeah, I was going to ask, so is there any mechanism in Zebra or any preferred approach for merging things that are not enabled yet? Because we do have a way of doing that in zcashd, although not very much using it yet.

[16:10] - **Arya**

We've been doing it with Rust features.

[16:13] - **Daira Emma**

Okay, makes sense.

_____

### 3. Research & Implementation Updates ii) ZSF cont.

[20:06] - **Pili**

Okay, thank you, Kris. Tomek, did we answer your question between all of us or do you still have any questions?

[20:13] - **Tomek Piotrowski**

Well, there's still the matter of the ZIPs themselves, which I wanted to talk about briefly and kind of get a feeling of what is the editor's kind of understanding of the current status of those ZIPs from our point of view I think out of the three ZIPs, I think two of them do not have any feedback that necessitates any kind of our response.

[20:46] 

There is some work to be done on the third zip, which is about the 60/40 transaction fee split which is about understanding how much money will be involved here.

[21:02]

Yeah, that sounds right. I think we'll be discussing those ZIPs at the ZIP sync meeting today which you're welcome to attend by the way. Let me know if you want an invite to that meeting.

[21:23] 

Okay, so just to summarize as I said, we are starting development on those ZIPs.

[21:54] 

So we're starting a development. I will reach out to Maria or maybe I'll reach out on Discord and we'll try to get an understanding of how can we proceed from here.

[22:15] - **Pili**
Sounds good. Thank you.


___

### 3. Research & Implementation Updates iii) Zcash Shielded Assets update

[22:40] - **Vivek**
On Zcash Shielded Assets. We wanted to first start with the ZSA ZIPs. For the transfer and burn ZIPs, ZIP 226 & 227 have been mostly stable for the last few weeks, no significant changes as far as I can remember. So that's, I think a good sign of things like settling down at present.

[23:04] 

On the implementation side, one of the changes that I'd been mentioning in previous Arborist calls was the switch of the issuance authorization signature to the BIP-340 Schnorr signature scheme, so that implementation is work in progress and I'm basically working on updating the test vectors to make sure that it is like following BIP-340 and things like that so that ideally should be added to the implementation on Orchard soon enough.

[23:41] 

I think was mentioned in the Zcash Foundation update. We are also working with the Zcash foundation to work on the Zebra node transaction testing setup and we've been having meetings with them and we've got some help from them on how to get things started with Zebra and then to add our things in with that. So that's nice. With respect to the other grant that we have the Asset swaps and beyond Grant, I did want to highlight that we recently published an issue on the Zcash ZIPs repository, which is I think [issue 736](https://github.com/zcash/ZIPs/issues/736).

[24:25] 

So that is basically, it's a call for comments for our first draft of the Asset Swaps proposal and in that call for comments you'll be able to find a [Google Doc](https://docs.google.com/document/d/1MabmK6UAj946mOoFV5vR5XmgakCVVVazS1tsTU2M0gI/edit?usp=sharing) that has a detailed first protocol that we've put up there. So we'd love for everybody to have a look at it and comment on it and let us know there's any room for improvement, any things that they see better.

[24:59] 

I think I saw that Nate's already had some comments on there, so thanks for that. And please everyone else, please join in and have a look. Yeah, we've also, I think, recently been looking into Halo 2 proof aggregation stuff because I think that's stuff that can be useful for asset swaps for us. So we are looking into how we can make use of those features. Yeah, I think that's what I have for ZSA update.

[25:35] - **Pili**
Thank you, Vivek. Does anyone have any questions for Vivek? Okay, guess not. Let's move on to Trailing finality. 

___

### 3. Research & Implementation Updates iv) TFL Book 0.1.0 

[26:06] - **Daira Emma**

Okay, so we have released [version 0.1.0 of the TFL book](https://electric-coin-company.github.io/tfl-book/introduction.html), so all of the definitions have been cleaned up and it's in pretty good shape. It links to several documents on Hackmd that describe the Crosslink protocol.

[26:35] 

I think we've talked about Crosslink in previous Arborist call, but basically the idea is that you obtain finality by using a hybrid of Byzantine fault tolerant protocol and a best chain protocol, like proof of work, for example, and the safety of the resulting finalized chain is safe if either of those protocols are safe, and I managed to prove that. So that proof is now in good shape, and it's quite rigorous, still fairly informal, but it's a rigorous argument.

[27:23] 

and I'm currently working on the so there are two ledgers, or two ways of viewing the chain. You can look at Logfin, which is the finalized chain, or LogVDA, which stands for bounded dynamic availability, which gives you a lower latency. And I'm currently working on the proof for that. It's basically very similar to Snap and Chat, which is the protocol that the Crosslink is originally based on. So I don't anticipate any issues there. Is there anything else you can think of, Nate?

[28:10] - **Nate**

There's a [forum post] and from the forum post there's a link to a roadmap, which is one of the [Zcash developer DAGs](https://zcash.github.io/developers/). So that shows you a short to medium term roadmap with about two or three milestones. So that's shorter term and fine grained if you want to see specifically what's happening next. And there's a forum thread, and we post updates continuously. We always post to that thread. So if you search for 'Trailing finality layer' on the forum, you'll see our updates there too.

[28:54] - **Daira Emma**

Yeah, so one of the interesting things about the security proofs is making sure that was using the correct communication model and not inadvertently losing properties of the best chain protocol or the BFT protocol. So basically any best chain protocol assumes that the network isn't partitioned. For example, if you completely partition the Bitcoin network or the Zcash network into two, then they would build independent chains and you wouldn't be able to infer that they agreed on the same chain.

[29:42] 

So any analysis that depends on the best chain protocol is going to be vulnerable to partitions. But the advantage of using the Byzantine fault tolerant protocol as well is that its analysis isn't dependent on partition freedom. So even if your network is partitioned, it will just stall rather than continuing to build two chains. Well, it will actually build two chains, but they won't be finalized. 

[30:27] - **Pili**

Conrado, you have a question?

[30:29] - **Conrado**

Yeah, I have a question about a suggestion that Henry posted on the forums about using Comet BFT for proof of stake in Zcash and I don't understand these things, but it seems reasonable. So I'm wondering, is this something that will be compatible with Training finality or not? Do they conflict? What do you think about this suggestion?

[30:58] - **Daira Emma**

As far as I know, they don't conflict. We haven't done the work to make sure that the model of a BFT protocol that we're using for Crosslink is able to accommodate other BFT protocols like Comet BFT and hot stuff and whatever. For the purpose of thinking about the protocol, we've been using a BFT protocol called Streamlet, which is designed to be very easy to understand and to teach. But the model of a BFT protocol that we've used is designed to be quite general, and I don't really anticipate that there will be any problem in adapting other protocols to it.

[31:48] - **Conrado**

Thank you.

[32:18] - **Zooko**

I actually think it's important for this which language you write. A full node consensus protocol implementation is actually does matter. It's not a bike shed, it's a nuclear reactor.

[32:32] - **Daira Emma**

Yeah, I completely agree.

[32:35] - **Dodger**

Yeah. It's morally irresponsible to write important things in  go.

___

### 3. Research & Implementation Updates v) FROST Demo 

[33:15] - **Pili**

Yeah. Cool. Okay, let's move on, I think, to FROST updates next. Conrado, is that you today?

[33:24] - **Conrado**

Yeah, hi everyone. So in FROST we mentioned that we're working on a 1.0.0 Release candidate. So that's coming probably today or tomorrow and we have also been working on adding communication to our FROST demo. So we have a demo that works with terminals, copy paste and stuff, and we're changing it to add actually socket communication. This is like a first step in trying to come up with a solution of actually getting FROST deployed. So this is probably just a proof of concept for now, but that's still ongoing work and we'll keep working on that.



___

### 4. Wrap up & close out

[35:11] - **Pili**

Thank you very much to all participants today. Next arborist will be on the 30th of November. It will be at the later time of 21:00 UTC, and it will focus on the NU5 retrospective. So if you're interested in that, please join and we'll see you all then. Thank you so much.

[35:33] - **Daira Emma**

NU5 retrospective or Sandblasting retrospective? Which thing are we focusing on first?

[35:41] - **Pili**

I'll let Dodger chime in on that one. He's the one that did the slides.

[35:49] - **Dodger**

I can't remember which one we're doing first. I don't have the document in front of me, if you have a strong opinion post it in the forums in the engineering topic.

[36:05] - **Pili**

Thanks everyone. Goodbye.

_____


### Attendees

+ JG

+ Arya Solhi

+ Zooko AtECC

+ Conrado Gouvea

+ Daniel (decentralistdan)

+ Daira Emma Hopwood

+ Kris Nuttycombe

+ Tomek Piotrowski (Eiger/ShieldedLabs)

+ Nate_ZEC

+ Vivek (QEDIT)

+ John Bruhling

+ Michael Harms

+ Zec Mec 


**Next Meeting Scheduled: 21:00 UTC November 30th 2023**


___
___
