
# Arborist Call  #36 Notes

Meeting Date/Time: September 22nd 2022, 21:30 UTC

Meeting Duration: 50 minutes

**Agenda**: 
+ Zebrad Status Updates
    

+ Zcashd Status Updates


+ Open Discussion


Video of the meeting: [recording](https://www.youtube.com/watch?v=RIskJby8Qm4)

Moderator: Steven Smith


Notes: Jason Rogers

___

## Decisions & Action Items

i. Reach out to Wallet Vendors regarding [ZIP 317](https://github.com/zcash/zips/pull/631)

ii. Formulate long term plan for removing Bitcoin-style script

iii. Create work-in-progress PR on zcash_script move / Zcashd repository

___

## Full Notes



### 1. Zebrad Updates - Beta.15 Release candidate 

[00:00] - **Teor**

Hi, I'm Teor. We just did another [Zebra release beta.15](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-beta.15) and we were mainly focused on improving Zebra's sync and RPC performance. We used to block on reading from the cache state but now all of that runs in parallel. That should make a big difference to people who are using Zebra as a Lightwalletd backend and also possibly to sync performance under some conditions. 

[03:50]

We are getting ready for a release candidate so we've started creating Docker binary images for our releases and we also and we updated some of Zebra networks API's so they return more peer metadata. I understand some of the folks at the ECC are interested in using those for a DNS seeder. Those are the big changes in this release and there's one breaking change for people who are using Zebrad as a Lightwalletd backend - We've changed how the RPC threading works, so there's a config you'll need to activate to get multithreaded RPC's and thats all in the release notes. 

[04:37]

The reason we're not activating that by default is that it also disables port config testing, so you could accidentally run multiple Zebrad instances or a Zebra & Zcashd instance on the same port. Maybe you don't want to do that. But that config is open to you if you're happy to manage your instances and check those conflicts yourself. Otherwise this is a pretty good release and happy to answer any questions. 

[05:11] - **Steven**

I have just a general question about some of the terminology. When you say 'release candidate' would that be like a post-beta release or is it another beta-.12 or beta -.14? 

[05:23] - **Teor**

We'll be tagging it as a release candidate so that means features like lightwalletd support and the consensus rules for NU5 and all of those things will be ready for final testing and ready to be audited. To be clear they haven't been audited yet, thats why its a release candidate and not a stable release that we're saying has been double & triple checked by auditors to make sure we've got everything right. But ready for final testing. 


___

### 2. Zcashd Updates i) - Status update


[06:16] - **Steven**

I'll move onto Zcashd. Major updates, as we've mentioned on several Arborist Calls now our focus has been on addressing the increased load that we've seen in a few different ways. We put out a couple of releases of Zcashd that made several performance improvements to scan performance, block propagation etc. Our current engineering focus is on a few things. The number one priority is a faster sync for our Mobile SDK's, to help out wallets that are built on those SDK's, which are Edge Unstoppable and Nighthawk.

[06:58]

The current plan on that is to roll that improved sync out on a couple of SDK updates, there could be more than two. The first update will also have included with it support for unified addresses. The reason for that is quite simple, before we shifted priorities to focus on a faster sync our priority was supporting all things NU5 in the SDK's, unified addresses and orchard support. So we had already done a fair amount of work on unified addresses and when we shifted focus to work on the sync it was easier to build on top of that than to start from a different base and merge it back in later. 

[07:51]

In this first update that we've put out there will be support for unified addresses and an incremental improvement to sync. We also have had reports and recreated internally some instances where we had increased concurrent memory utilisation during syncing. So you'd be running along with what you would deem a normal reserve set size and then your memory usage would spike up and in some cases the node might even OOM. We've identified three memory reduction optimisations. We are in the final stages of testing the third one just to verify it has the intended effect that we would like. Once we are satisfied with those three and we've identified any remaining items we want to include, there are a few other performance improvements we have identified. Then we wont include in 5.3.0 then we'll roll those up and get those out as a new release of Zcashd.

[08:01]

The third item is we're continuing to do some work around [ZIP 317](https://github.com/zcash/zips/pull/631). Nate's on the call. He's been on point for us to do some nuanced research around fee mechanisms with [ZIP 317](https://github.com/zcash/zips/pull/631) community submitted proposal. We always add on our loose roadmap to investigate fee mechanism changes that might be consistent with an EIP 1559 style mechanism. At any rate Nate is probably the most well versed in fee constructs that we have. Essentially, there's three things that are important to us.

[08:06]

1) We want to make sure that fees are equitable and consistent. I put there regardless of transaction counts, Inputs/Outputs, Action Split. By that I mean we have this increased load, it's shielded we don't really know anything about it and we just want to make sure that if we make any fee changes it's equitable and consistent. So if you're sending one transaction with 1000 outputs, vs 10 with 100, that fee ought to work out to be the same. So there's no penalty for having more transactions or less transactions and there's conversely also nothing to gain associated with that either. 

[10:26]

2) Avoiding unnecessary impact on smaller transactions. I don't know if you could call it a 'normal' transaction or a smaller but maybe the common use case of 'I'm sending some ZEC to a recipient or two'. We want to make sure that we don't unnecessarily impact transactions that are not causing us any concern. 

[10:54]

3) A big item is UX issues and concerns and thoughts. You really need to think through those at the same time. You think through those mechanically. It's one thing to say 'here's a mechanical fee implementation' but then another thing because fees have been historically negligible in Zcash. What's the UX around that. It's easy to see If i am sending to one person vs 5 or 10, you see directly i am doing this and i am using more resources. On the input side however, you might want to send 10 ZEC so you might have one note with 10 ZEC in it or you might have 1000 with 0.1 ZEC in it and that would be a tonne of inputs going into a transaction and that might be unexpected for you because you don't really have control of your input notes. Definitely on the output side of things when you're getting ready to send you do. That's some of the things we are thinking through in addition to just the mechanics of fees. 


___

### 2. Zcashd Updates ii)  - ZIP 317 Fee Change Proposal 


[12:08]- **Nate**

One of our new engineers Greg has been doing a lot of great on chain analysis of recent transaction arities of different kinds like shielded or transparent so that we can ask questions like, 'if we saw those same transactions, but we had the [ZIP 317](https://github.com/zcash/zips/pull/631) fees currently enforced, how many of those transactions would be below the threshold'? The initial results from that looked like a fair number of transparent transactions would be below the threshold for various parameters we've been looking at.

[12:18] - **Nate**

The next thing we need to do in addition to reaching out to all the wallet vendors to see if they can adopt this fee change. We also would benefit from figuring out how many of those wallets might use Bitcoin style fee escalation. Because if they do and they still don't adopt this change, then their users may still be able to use Zcash because their wallets would adjust their fees naturally given enough time. We really want to understand that.

[12:23] - **Nate**

One other thing is the proposal is setting these hardcoded parameters and it's replacing a standard fee that's already a hardcoded parameter. Since it's hardcoded, if it's too low then it isn't going to alter anyones usage and if it's too high it could hamper adoption because some users would baulk that transaction fee's are too high. Its sort of a balancing act but because it's a hardcoded thing I expect whatever we pick is going to have some impacts and we'll want to be observing those closely & considering that we might need another change in the future to change those parameters or down the road I would like to see something that is less hardcoded to adapt to the actual usage of the network, but that is a lot more work so thats totally out of scope for 317. Its just on my mind that whatever we pick for 317 is likely to be either too high or too low at certain times. 

[15:18] - **Daira**

I just wanted to say that we made a lot of progress on the actual [ZIP](https://github.com/zcash/zips/pull/631). Editorial issues and clarifying the formula in the zip sync on Wednesday so there's a PR to make those updates. That's a [PR to Aditya's branch](https://github.com/nighthawk24/zips/pull/2). 

[15:56] - **Nate**

I forgot next steps. In my mind the next steps would be to reach out to wallet vendors as soon as possible to explain this potential change and figure out how likely it is that they would adopt it. The other is I want to clarify or suggest parts of the proposal around deployment stages. For example if there are significant number of bitcoin wallets that adjust their fees in response to what they observe happening and we are able to get other wallets to adopt the change and deploy that before there is any enforcement we might be able to notice if some of the other wallets are dynamically updating their fees. That would be really helpful to know. If we can't determine if their developers are just going to deploy the change. 

[16:56] - **Steven**

Excellent point. So whatever we might do, it would be great to have a strategy for rolling that out to gather feedback at every possible stage we can. By feedback one is obviously talking to partners, 'is this something you would adopt', two is continuing Greg's on-chain analysis to see what behaviour are we seeing now? Has this changed? Is this having the effect we wanted? And as important, Are there any surprises? Is something happening that we didn't want to happen? It's a great way to learn before there is any enforcement mechanism in place. 

[18:24]

As I mentioned, the big thing for us is focusing on performance improvements and mitigation of the increased loads so thats why everything we're talking about is related to that in some fashion. 


___

### 2. Zcashd Updates iii)  - Concurrent Memory Utilisation Issue 


[18:50] - **Daira**

It might be interesting to go into a little bit more detail into what the problem was with the memory usage. 

[19:10] - **Str4d**

In 5.2.0, as part of fixing the syncing performance problems we deployed batched and parallelised trial decryption into Zcashd. We already have a separate thread that processes wallet updates. That was done in response to an earlier security issue because it was happening in the same thread as the main chain update thread. You could do remote timing attacks which was not good. 

[19:51]

So we pulled that out into a separate thread that handles that. Now it will essentially lock on the main thread to grab updates of what has changed on the main chain since the last update and it will drop that lock, process that and once it's done all that processing it waits for the next available slot to sync and grab the next chunk of updates. 

[20:16]

The problem that we were having was that it does that on a second boundary, so every integer second it will ask for another update. But if it takes longer than an integer second to process those updates it then has to wait till the next integer second. So what was happening was the wallet scanning time was taking longer than the chain scanning time. The wallet chaintip was getting behind the node chain tip. So every time it hit the second boundary the amount of delta between the wallet chain tip and the node chain tip grew. 

[21:10]

The way that we did batch scanning was to throw everything onto the batch to begin with and then it's all ready for when the scanner needs it. But by throwing it all in at once that ended up being quite a large memory load and as the combination of the two growing over time, it would OOM. The fix to that was essentially manual implementation of back pressure. We still grab the chunk of data to work with for the wallet, but now we only put onto the scanner up until we hit a memory threshold and then we start interleaving the batch scanning with the pulling off that.

[21:20]

Thats great. Then we identified a memory consumption issue that wiped out all of that and made it pointless. We still have it implemented but the core actual problem was that after batch scanning was complete, because its parallelised we have to send the results of it back to the main thread to pull in per transaction. For each output we were sending back an option of 'did it decrypt? or not' If it did decrypt 'here's the note'. In the limit where you have very few notes, most of those are going to be none but they were the size of a decrypted note. We were storing 600 or 700 bytes for each thing we failed to decrypt which scales with the number of on-chain outputs rather than the number of outputs you actually decrypted. 

[22:41]

The simple fix to that was to not return as an option and only send something back when you've got it. The reason that works is because we use a cross-beam channel & the receiver you can consume as an iterator and when all of the items in the channel have been consumed and crucially all of the senders have been dropped, so the channel is disconnected, it will end it's iteration. So we now treat instead of sending an explicit none to report back that trial-decrytion failed, we just close the sender channel and that acts as an implicit signal backwards. Now the memory spike will occur while we're doing trial decryption and then drop back down to nothing. 

[23:43] - **Nate**

That reminds me of the rust clippy lint that warns you if some enum variants are very large compared to others, but I just realized 'Option' must not be covered by that? (Because it would always trigger on any large 'T'?)

[23:43] - **Nate**

Was that option in c++ or rust?

[23:48] - **Str4d**

The option was in rust. I was somewhat surprised that i hadn't seen that particular lint where you would normally get a lint when its one size or the other. Because option itself is its own enum. If we were implementing this as an enum we would get that link but I guess they don't have one for 'You are making something very large' optional. 

[24:19] - **Nate**

Yeah, maybe its a special exception for 'option' since it would trigger every time you have an option of any large. 

[24:27] - **Str4d**

Yeah, the problem here is essentially a combination of using this option with a cross-beam channel. Specifically, we were using an unlimited channel but that doesn't really matter because the size of the channel is based on the number of outputs and the number of outputs is limited by the block size. You can't fit a transaction with more outputs in it than you can fit in a block so its already inherently limited. But its implemented as a linked-list internally and it has a minimum size thats based on the size of the items that could go into it which they allocate even when the items aren't there yet. One of those where it's a combination of things that stack together and cause it. 

[25:24] - **Steven**

We are testing those changes right now actually. I have it running right here. For some reason i've been able to find it more than anyone i think. 

[25:36] - **Str4d**

As a side effect we've now got a few extra metrics added into Zcashd as well so you can track the throughput of the batch scanner, the memory usage of it which now seems like an obvious metric to have but you've now got several metrics for the chain-tip synchronisation point which i think is the same for Zcashd & Zebrad. Then the separate metric for what the height the wallet has scanned to so you can more easily observe for when this behaviour is going on. We've noted some other potential synchronisation issues we need to deal with as a result but this addresses the primary issue that users were having. 

[26:20] - **Daira**

About that lint, i think it's allowed by default and also i think it only happens when you are defining the enum. In this case we are not defining option. 

[26:35] - **Steven**

Great work on that. Diagnosing these kinds of things is not trivial but the team did an excellent job. Str4d & Daira did a fair amount of time pairing on it, diagnosing heap track files and that was really great finds. Also there was an additional topic. Conrado wanted to have a chat about Zcash script maintenance. 


___

### 3. Open Discussion i) - Presentation on zcash_script crate


[27:11] - **Conrado**

Basically what I would like to discuss is Zcash_script which is a crate that Zebra uses to verify signatures in transparent transactions. So it basically wraps a piece of c++ code that is inside the Zcashd repository, zcash_script.cpp. There is this crate that generates rust binding for the c++ code. The issue we often have is every time Zcashd updates, eg. Orchard or Halo2, we need to update the crate to use the same versions that Zcashd is using. The reason for that is Zebra also uses those dependencies, so we don't have duplicated dependencies with different versions we need to do that. 

[30:08]

This can be a bit annoying. Another problem is that the crate repository needs to copy the Zcashd source code. This is also a bit annoying, you can use git symmetry or some others but each one of these options has it's own problems, we've been switching between them for a while. I was discussing some of these issues on Discord. Str4d suggested that maybe Zcash_script could live inside the Zcashd repository.

[30:55]

To explain first how the crate works. We include the source code with gitsubtree, we generate the bindings with bindgen. In order to build the c++ files from Zcashd we use the rust build script (build.rs) which uses cc::Build to build the c++ files and link them to the crate. Recently we had to do a small change because Zcashd now generates some of their own bindings using cxx and we'll need to include some of these generated files. So we had to replicate the logic of generating this code with cxx. 

[31:49]

Thats how it is currently. The first solution i thought would be, maybe we could remove these dependencies from zcash_script, the c++ file. We discussed this on a zip sync, its feasible but difficult. The reason it requires those crates is because it needs to decode a transaction and to decode a transaction you build a transaction memory and this has has some fields which are Orchard Halo2 proofs and such which use Types from those crates. 

[32:29]

I thought of maybe the caller to compute the sighash and provide it to the crate but that would require exposing low-level API's which isn't something that they don't want to do. It could also be dangerous because maybe the user could provide the wrong sighash. This doesn't seem to be a good solution. Maybe the simplest solution would be to move the crate as is, into the Zcashd source. The advantage of that would be that we no longer need to keep a copy of the Zcashd source, it would be right there. But we need to think about how to build the crates. 

[33:39]

We could keep the same build system that the crate is already using, (build.rs to call cc::Build), the code thats generated with cxx which we already have. Thats simple and anyone thats using the crate just needs to import and they will build. They need a C compiler but most developers have one around but they don't need anything other than that. The downside is that you still need some duplicated logic for building the library and generating the code with cxx. 

[34:33]

Another option would be to integrate with Zcashd build system. We would copy the source of the bindings into Zcashd repository. We could even migrate to cxx to make things simpler, i don't think that would be hard. We would then not use cc::Build, we could just compile Zcashd and link to the object files that we need. I was even looking into the Zcashd source and noticed that there is an option to build libzcash_script library which is exactly what we would need to link with. That seems to be an option. We then could reuse the cxx code, we wouldn't need to call it to generate those bindings again. 

[35:31]

The upside is less repeated logic. The downside maybe something that i don't fully understand, how to rework but i fear that to compile Zcashd you need a bunch of build dependencies, I was just compiling it today to see how works and noticed that it even downloads the C compiler and builds a lot of stuff, even the cxx generator it builds on buildtime. I am not sure how this will work, if someone has rust code then they want to use the Zcash_script rust crate when they compile the project they would need to install all the build dependencies that Zcashd needs. 

[36:21]

Maybe the build system of Zcashd could provide an option to just build the libzcash_script library with less dependencies but i don't fully understand how that would work. These are basically the options that I see. The question is, does this make sense? Did I miss something, and do you have any suggestions of what the best approach is?

[36:55]

I was going to say that we consider it necessary for consensus compatibility to build with pinned version of all of out dependencies. So we could potentially narrow the set of dependencies that zcash_script in particular depends on but that's probably a lot of work. Str4d will probably know how much work that is.


___

### 3. Open Discussion ii) - Discussion on zcash_script crate


[37:19] - **Str4d**

We had a good discussion about this in the zip sync previously and i had forgotten at the time that, build libzcash_script and just pull it in as a static library that all the rust people use requires building that library for every possible target that isn't something thats really feasible to do. Cargo doesn't have that sort of bottling system. The changes to move to everything using cxx is a good idea in general. Now that we've managed to get it integrated we want to move all our interfaces to be built with it. 

[38:30]

There are some limitations a little bit in terms of interoperability of certain types within cxx, which is just limitations of what they haven't implemented yet in the cxx builder. If theres prop limitations there we can contribute things upstream if necessary. The main issue is just getting the right strata for the build system. We are wanting to move as many of our foundational dependencies to rust as possible and in particular, things like moving Blake2b has already been done. We'd like to move SHA-2 to the rust as well if possible. For now we've been keeping our internal SHA-2 updated relative to our upstream Bitcoin just for simplicity but it is an eventual goal to replace that as well. For transaction parsing there is a bunch of rust dependencies there as well.

[39:16]

We sort have Low level rust dependencies, The c++ code that lives on top of those that is necessary to build libzcash_script, then we have rust pieces that want to be able to use that piece, and then we have c++ dependencies that separately want to use libzcash_script but don't want to use the rust library. This is the key part to get. Due to quirks of history libzcash_script is a wrapper around a subset of the c-library. It is not the full engine, there is a lot of the stuff there for building scripts and things which is very c++ like and tied into the rest of the Zcashd system.

[39:26]

It would be nice, given that Zebra is eventually going to want to do wallet stuff as well, and we are interested in moving our wallet stuff to rust as well. There is is likely at some point going to come a time where we are going to want to have a rust interface to the script generation side of this. That could be a direction to investigate. To fully break apart the strata and have the engine and anything it needs as a subpiece and insulate that from the rest of the c++ codebase. That would be quite a bit of work to do though. So the interim most reasonable solution will be a hybrid of the two. We copy the source in, leave most of the existing pieces behind but do bring in the build.rs changes so there is a small amount of duplication of the makefiles that we use and the build.rs specifically for building this piece. We then hook up the build system to use by default the pinned compiler etc. that we normally use. 

[41:55]

Then if you're using it as a rust library that gets published then thats already extracted the few files it needs and been uploaded as a crate and you're using whatever compiler is on your system because you're completely outside the Zcashd codebase. That seems like the most reasonable thing we can do to strike the balance between making updates to this less painful while also making this seemingly usable. From a consensus point of view, the main thing that matters is, everything that Zcashd uses is consistent and ideally everything that Zebra does within it is consistent with Zcashd. From that perspective it would be nice for compiler consistency and c lang consistency as well. Though Zebra doesn't do any pinning of that sort as far as I'am aware. 

[42:58] - **Daira**

So let's have a long term plan for removing Bitcoin-style script. Because that's the only way in the long term we're going to get rid of this complexity. 

[43:12] - **Str4d**

If we can deprecate the Transparent pool that would make our lives so much easier. 

[43:23] - **Daira**

I would really like to do that at the same time as moving to Proof of Stake. 

[43:29] - **Str4d**

So from that perspective we can get something to work that is easier to maintain and live with a bit of pain with it for short to medium term potentially. 

[43:43] - **Nate**

I was wondering how feasible it would be to pull out the script specific portion of Zcashd into a separate repository and make a standalone c++ library. Is it too interwoven?

[44:06] - **Str4d**

It's very interwoven at the moment. There might be refactors upstream that make this easier that we could try pulling in, but as it stands it is currently quite interwoven. Just to do this it would be necessary to pick apart the build level aspects of it and that on it's own would be quite tricky but doable. The way libzcash_script works in the Bitcoin-style build system is that it's essentially slightly parallel so it's already slightly duplicated. You have the regular script system as it's integrated into the main node and then you have libzcash_script which needs many files and pulls them across into their own build sub-unit. It mostly works. We sometimes find cases where libzcash has atrophied sometimes because we make a change in the main build system which it didn't get reflected. It's all really tricky to keep them in sync. Pulling it out entirely is not my cup of tea. 

[45:19] - **Daira**

It might be possible to extricate the script interpreter which is the main part of validating scripts from the script builder logic and then there would only be the script interpreter that you needed to move into this other library. 

[45:43] - **Str4d**

It's a bit tricky though because the script interpreter is used for both. All of this is doable, it's just how much legwork are willing to put in to wrench it into position. 

[46:08] - **Teor**

One thing that we haven't really spoken about is testing in CI. Our current experience of testing this is that we don't actually run any CI or automated updates to the Zcashd dependency so when Zcashd updates we often find out effectively by surprise just before a mainnet or testnet consensus change. Usually a network upgrade. It's very tricky to schedule CI in a separate repository on every change. One of the advantages for us and anybody else who wants to use either the rust zcash script or the libzcash script is that if it was moved into the zcashd repository, we could run some basic checks on it in CI and agree on what those checks need to be. We wouldn't have to deal with testing across multiple repositories. 

[47:32] - **Str4d**

It is possible to do that sort of synchronisation, I do it in a few of my own repositories, but it's not fun. Essentially this proposal does put maintenance burden on the zcashd developers in the moment to do that. I think it's maintenance burden that's manageable because it's the kind of thing we had to do libzcash_script library itself anyway. Finding those things out when they interact with the rust component at the same time seems manageable. As far as its external surface goes, its relatively well contained. 

[48:25] - **Conrado**

Thank you everyone for the discussion, I think one perfect final option is to do nothing and keep things as is if the other solutions are more work. But I like Str4d's suggestion of keeping the build system and moving to the Zcashd repository, so my suggestion is at some point we can create a PR with what we think makes sense for us and then we can keep discussing that. I just don't know when, we need to schedule. That's my suggestion. 

[49:09] - **Str4d**

Also something that might help here. I noted in Rust 1.64.0 that got released today, they've just merged some interesting improvements to how workspaces are defined. Being able to define common dependencies and what not. That would actually greatly help us here because we would go the route to have separate crates for zcash script & librustzcash within a workspace that can then share common pieces and then pull the bits across as we need them. It's also one where the librustzcash library component is on some level a dependency of the zcash script library. Right now i think the way it's done is the zcash script library pulls in the relevant rust files from the librustzcash component but with the workspace we could figure out the rust component of that strata a little more carefully and figure out how to interleave them nicely. Then the new workspace changes will definitely help with that. Zcashd we try and stick with as latest stable as we can, modulo LLVM changes. So as long as they're still on LLVM 14 on this release then we can just jump to that and start using it.    

___


### Attendees

+  Arya Solhi

+  Conrado Gouvea

+  Deirdre

+  Dodger

+  Greg Pfeil 

+  Kris

+  Nathan Wilcox

+  Pacu ECC

+  Sasha S

+  Str4d

+  Teor

+  Yasser Isa

+  Ben Beale 

+  charlieok

+  Joseph Van Geffen

+  Taylor Hornby


___
___

**Next Meeting Scheduled For: October 6th 15:00 UTC**

