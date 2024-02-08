# Arborist Call #70 Notes

Meeting Date/Time: February 8th 2024, 15:00 UTC

Meeting Duration: 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Blockchain Scanning / QEDIT Testing Tool](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#1-zebra-update---blockchain-scanning--qedit-testing-tool)

+ ECC Core Update - [Mobile SDK 2.1](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#2-ecc-update---mobile-sdk-21)

+ Research & Implementation Update - [ZSA ZIP's](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#3-research--implementation-updates-i-zsa-zips) / [Trailing Finality Status](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#3-research--implementation-updates-i-frost-update) / [ZKProof 6 Event](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#3-research--implementation-updates-i-trailing-finality-status)

+ Open Announcements - [New Head of Engineering](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#4-open-announcement-i-new-head-of-engineering) / [ZKProof 6 Event](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#4-open-announcement-ii-zkproof-6-event) / [Zcon V](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2070-Notes.md#4-open-announcement-iii-zcon-v)

___


Video of the meeting: [recorded]

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes


____
### 1. Zebra Update - Blockchain Scanning / QEDIT Testing Tool

[01:51] - **Marek**

So since we released [Zebra 1.5.2](https://github.com/ZcashFoundation/zebra/releases/tag/v1.5.2), we've been working on gRPC front end for the scanner. It will contain a bunch of straightforward gRPC's that will allow users to submit their viewing keys. The scanner will start the trial decryption, and then users will be able to fetch the results.

[02:21] 

We're using the tonic library in rust to implement the gRPC server and together with tower services. So that's progressing well. The second thing is the new docker compose files for running zebrad together with Lightwalletd and the purpose of that is to make the configuration for both zebrad and Lightwalletd easy as regards for example, managing the docker volumes for persistent storage for both Lightwalletd and zebrad. The last thing is also new Docker compose files that allow developers to  run the same tests as in CI locallythat's. Thats all from me.

[03:42] - **Pili**

Thank you Marek. Does anyone have any questions for Marek or anyone else on zebra development?

[03:50] - **Daira Emma**

So Qedit mentioned that they had developed a thing. My impression was basically similar to regtest. Do you have anyone from cadet on the call?  I don't think that's been mentioned outside the ZSA meetings before. So do you want to say basically what that is and how it's useful. 

[04:29] - **Vivek**

Yeah, we've basically been developing this transaction testing tool that we've been showing the Zcash Foundation and I think the zip editors as well. We gave a demo recently on that.

[04:43] 

Basically it allows you to set up a single node and get the blockchain state and then be able to run transactions and test those just for transaction v5 right now. But that's what we started with. And then we'll be able to move on to v6 subsequently.

[05:09] - **Daira Emma**

And that's with mining switched off, or just trivial mining?

[05:13] - **Vivek**

Yeah, the proof of work is switched off right now. So that's one of the other things that I think we're going to look into whether we can keep it. The low difficulty mining that I think is there for regtest. So we'll see how that works. But at present the proof of work is switched off.

[05:32] - **Daira Emma**

Part of the reason I wanted to mention that is that that seems like it would be very useful for our future development. So is there any chance of that being merged upstream?

[05:51] - **Vivek**

So we are doing the review right now and it's very close to being finished, We'll be putting the formal pull request pretty soon.

[06:07] - **Str4d**

For specifically this, as opposed to it being inside ZSAs?

[06:13] - **Vivek**

Right now we only have transaction v5 that we have right now. The ZSAs and stuff is going to need more work.

[06:26] - **Str4d**

What I meant was I wanted to make sure that we were able to extract this as a separable piece because this is independently useful.

[06:36] - **Daira Emma**

Rather than it just being a PR on your branch.

[06:40] - **Vivek**

I'll check, I'll make sure that that's the case.

[06:45] - **Daira Emma**

Thank you.


____

### 2. ECC Update - Mobile SDK 2.1

[07:37] - **Str4d**

Current status there is we are back into working on Orchard post zeboot. That's just chugging along at a rapid pace. The current plan is to get a release of the zcash rust crates up through zcash client SQlite out without orchard. So there's a feature flag and a rust compiler flag that basically will gate all the orchard stuff off so it will not be part of the API for the next release. That's just so that people can have a stepping stone to upgrade to a version that includes all of the sapling refactors and other bits and pieces that have gone on in a separable way, and then they'll be able to, in the subsequent release, focus on including orchard support.

[08:39] 

So from the rust side, that's the focus there and then on the wallet SDK side, the focus there is pushing towards the functionality necessary for Zashi 1.0. So just again, making progress through being able to get in things like orchard support into the mobile sdk's. I think we're done with performance changes that will be in at least the next release of that like the SDK 2.1 releases, and it's just feature finishing at this point for Zashi 1.0. 


[11:01] - **Alfredo**

so for str4d, I was listening to their updates. We in Zebra team with the blockchain scanner are using a function from one of the rust crates, which is scanblock, which is scanning for sapling transactions. My question is, you said you upgraded the sapling code. I'm wondering if that function in particular had any change that we need to implement?

[11:31] - **Str4d**

So actually directly on that there are some potentially relevant changes. So one of the things that I just recently did & got a pr for was so you're using a rather external API that is focused more on scanning compact blocks, but internally to that, that uses a batch scanning API that we copied over from zcashd.

[11:57] 

I've just about landed the changes to deduplicate that. So the API that I'm referring to is not currently public because we wanted to make sure it would serve both use cases. My intention is for that to then be exposed so that we can remove the equivalent code from zcashd's wallet to do batch scanning because we currently use it over there for batch scanning of sapling.

[12:25] 

So that would actually be a good a good part of the API for you to look at and confirm usability off there. Because that will probably, I just need to look over that because if I'm correct on the scan blocks API that you're probably using, I think this one will be the more performant one, I think. Let's talk offline in the R&D channel in the libraries channel of the R&D discord and synchronize on that.

[13:00] - **Alfredo**

Cool, thank you. So when we were using that API, we noticed that you can send multiple blocks to that, but we are scanning one by one because the API doesn't return the number of the transaction where it is. So you can't identify which transaction belong to which block.

[13:34] - **Str4d**

Just to clarify, which specific API, just to make sure we're on the same page, which specific API is the one that you are using?

[13:43] - **Alfredo**

I think we use one that its name is scanblocks.

[13:47] - **Str4d**

Yeah, I think I know the one. I'm just searching for it to make sure that it's the question I deferred. But if you're asking, then I will just go and answer it right now.

[14:00] - **Alfredo**

We can talk offline if you want.

[14:02] - **Str4d**

We better talk offline about that. But my answer to this is I expect the API that I've been working on most recently is the one you'll want to use. It's the same one that we use in zcashd. With the changes I'll have it will work with and be intended to work with full node style blocks with full transactions.

[14:25] - **Alfredo**

So the last one. You said you're going to implement a similar function that scanblockorchard, that can do the same thing for orchard?

[14:36] - **Str4d**

Again, the new scanning API is generic over sapling/orchard. So what you would then be doing there is. I'm still trying to find the API that you're using. I don't know where scan blocks has gone, because I see scan. What version are you depending on? That's too much for this. The API that I'm working on right now. What you will then have is you will have a sapling batch runner and an orchard batch runner, but the code is entirely generic. You'll be feeding in the same transaction into both runners, and then they will take away their respective parts of it.

[15:28] - **Alfredo**

Okay, great, thank you. I'll check that out, because I'm also in the air. I don't know what version we are using and such, so we better do this offline in the chat. Thank you, Str4d.


___

### 3. Research & Implementation Updates i) ZSA ZIP's 

[16:15] - **Vivek**

So we have a few things to update this time. The one that's right off the press is that we just submitted a new PR. It's [PR 780](https://github.com/zcash/zips/pull/780). This is the initial draft for the asset swap zip. I think it's now numbered ZIP-228.

[16:38] 

Again, it's a draft. There'll be multiple rounds of zip editors looking at it and things like that. But I think, yeah, we are excited for everyone to have a look at the stuff formally, and let's see how that goes.

[16:53]

The second thing was the transaction testing tool, which I mentioned earlier, it's close to being completed, I think. So you can look out for that, too, hopefully in the coming few days or week or so. The other thing we've been working on is we've been generalizing the orchard crate to support both v5 and v6 transactions at the same time. So ZSAs and the original v5 transactions. So I think we've done most of the non circuit related stuff, making it generalized.

[17:32] 

But in the circuit we ran into, I think we had made some changes to the halo2 crate, which sort of switched around the original circuit. So we spoke to Daira and Str4d, and they pointed us in the right direction. So we'll be doing some refactoring there to get that back to how it should be working.

[17:53] - **Daira Emma**

Is that going okay? Did you end up with any obstacles there?

[17:59] - **Vivek**

I haven't heard of anything so far, but I also haven't really actively checked on that. So since the last couple of days, I haven't heard anything yet. So we'll let you know if there is something that's keeping us stuck. So I think that's mostly what I have. Thanks.

[18:20] - **Daira Emma**

So on the Zcash ZIPs, [PR to add 226, 227 & 230](https://github.com/zcash/zips/pull/778). The original one was conflicted and I filed another one with my editorial changes that is rebased. So can you check the changes on that just to make sure?

[18:44] - **Vivek**

Oh, yeah, I did see the comment and I think Pablo started having a look. I haven't personally looked at it yet, but I'll do that. Then currently, the pull request for ZIP 228 the asset swap ZIP is, again, it's not merging for the same reason. So once that's done, I can just rebase on top of that so that it's clean and just as the swaps work and not the previous.


___

### 3. Research & Implementation Updates ii) FROST update

[19:34] - **Natalie**

So Conrado and I have been working on what we call phase one of separate three different phases at the moment of what we're doing. So phase one is setting up the coordinator as a server and the participant as a client, so they can all just talk to each other seamlessly. And you don't have to have all this manual input, which is currently how it's set up. So that's done. We're just sort of in review.

[20:17] 

Phase two is what's in progress at the moment, which is basically decoupling the coordinator from the server so we have an independent server. That's what we're working on we're going to do a stable release probably tomorrow. That's the current plan. We're sort of releasing a blog post at the same time. So we're just timing everything together.

[20:46] - **Daira Emma**

Congratulations.

[21:01] - **Pili**

I would add that maybe the stable release will be next week rather than tomorrow. Not because the release is ready. It's just a blog post that is not and we want to do them both at the same time.

[21:11] 

So this is the table release of the reference implementation based on the [CFRG IRTF draft spec](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/). To be clear, exactly what we are releasing. And it will include the frost re randomized variant, which is what we need for Zcash. 

___

### 3. Research & Implementation Updates iii) Trailing Finality Status

[21:53] - **Daira Emma**

The current status of that is that we're trying to come up with an estimate of how long it would take ECC to have something useful to show for Trailing finality, which is not necessarily the whole thing, but just to prioritize and decide whether we're going forward with it.

[22:37] 

We had a meeting about that yesterday. If we did proceed, the way forward would be to kind of build it with an abstraction layer for the BFT protocol so that it would work with just a trivial dummy BFT protocol, so that option wouldn't by itself do anything to security. But then underneath that abstraction layer, it will be possible to implement or experiment with the different options for the BFT protocol. But nothing's really been decided yet. We're still prioritizing after Zeboot.


___

### 4. Open Announcement i) New Head of Engineering 

[00:09:50.250] - **Daira Emma**

I have an announcement, which is so you may already know, because it's been announced on the forum that I'm the new R&D engineering manager for Electric Coin Company. I'm going to step down as zip editor. So that will be at the end of February because I think that it's basically too much power over the future of the protocol for me to have both roles, and there could be conflicts of interest there.

[00:10:28.160] 

So probably for the indefinite future, I'll still be going to zip sync meetings, still be giving my expertise, but I won't have a formal role as an editor.

____

### 4. Open Announcement ii) ZKProof 6 Event

[24:12] - **Jon QEDIT**

Thanks so much. I have a small announcement which is the same as the previous one. There's a [ZKProof 6](https://zkproof.org/events/zkproof-6-berlin/) event on May 22 - 24 in Berlin, and we now have started the call for papers there.

[24:35] 

There's a whole program committee that looks at the papers with people formerly from Zcash. There's Ariel Gabizon is one of the guys checking this. There's also Kobi looking at the papers, and it's run by Mutu and Kalmit. Last time we had 30 different papers accepted so anything that has to do with advancements in zero knowledge is of interest to that conference. It's expected to be pretty interesting.

___

### 4. Open Announcement iii) Zcon V 

[25:32] - **Dodger**

On the note of events we've announced on the forums, our plans for the next Zcon which will be a virtual event later this year. We're calling it [ZconV](https://zfnd.org/zconv/). A play on 5 and v for virtual. And we're then looking, or hoping to do the next in-person event in Q1 of next year.


____


### Attendees

+ Daniel (decentralistdan)

+ Dodger

+ Str4d

+ Vivek (QEDIT)

+ Alfredo Garcia

+ Conrado Gouvea

+ Natalie

+ Daira Emma Hopwood

+ Josh Swihart

+ Kris Nuttycombe

+ Marek Bielik

+ John Bruhling 

+ zerodartz


**Next Meeting Scheduled: 15:00 UTC February 22nd 2024**

___
___
