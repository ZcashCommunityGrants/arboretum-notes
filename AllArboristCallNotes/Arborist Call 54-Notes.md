# Arborist Call #54 Notes

Meeting Date/Time: June 15th 2023, 22:30 UTC

Meeting Duration: 45 mins 


**Agenda**: 

+ Welcome and Meeting Intro - [Arborist Call & Zcash Grants / Zcon4 Registration](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#0-welcome--intro---arborist-calls--zcash-grants--zcon4-registration)

+ ECC Core Update - [5.6.0 details & ECC Emergency Mode Roadmap]https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#1-ecc-core-updates----zcashd-560--ecc-emergency-mode-roadmap()

+ Zebra Update - [Zebra 1.0.0 release](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#2-zebrad-status---zebra-100-stable-release)

+ Research & Implementation Update - [FROST & Zebra Community Call](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#3-research--implementation-updates-i-frost--zebra-community-call) / [Nighthawk Apps Testnet Block Explorer](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#3-research--implementation-updates-ii-nighthawk-apps-testnet-block-explorer)
    
+ Open Discussion - [Lightwalletd Syncing](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#4-open-discussion-i-lightwalletd-updates--syncing) / [Arborist Call Timing](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2054-Notes.md#4-open-discussion-ii-arborist-call-timing)


Video of the meeting: [recorded]


Moderator: Dodger

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome & Intro - Arborist calls & Zcash Grants / Zcon4 Registration 

[01:45] - **Dodger**

If you want to present on an Arbor's call, if you want to present an idea, if you want to change the Zcash Protocol, then email arboristcall@zfnd.com to request a presentation slot and we will get you scheduled. There are a bunch of other ways to get involved in Zcash. You can apply for a Zcash Community grant. You can apply for a grant from the Filecoin & ECC grant program, which is intended for grants that benefit the Filec oin and Zcash ecosystems.

[02:20] 

You can join the Zcash R&D discord, which is where most of the Zcash developers hang out and chat or there's the ever exciting Zcash Community forum where there's more general discussion, not quite so much technically focused, although we will probably start using it for that in the not too distant future.

[02:43] 

You just go to https://zcasharborist.org, you'll find a page where all these links are available. Zcon4 is a great way to get involved in the Zcash ecosystem, it is happening in Barcelona this summer from July 30th to August 1st. Registration is open, and if you are planning to attend, register ASAP, because we won't be able to guarantee room availability at the conference hotel or that the discounted hotel rate will be available after tomorrow.

[03:23]

So you can register by going to https://zfnd.org/zcon4, and once you've registered there as an attendee, you'll receive a link to be able to book the hotel room with the discount. This does not apply to speakers who are being taken care of separately. If you have any questions or if you don't get your link or anything like that, just email admin@zfnd.org


### 1. ECC Core Updates -  zcashd 5.6.0 & ECC Emergency Mode roadmap


[04:05] - **Nick Tacaks**
So, on the ECC side, yesterday we released zcashd 5.6.0. That was the next in our planned roadmap to address what we've called emergency mode, the large growth of the chain over the last few months that resulted in lightwallets being unable to quickly and efficiently scan the chain and do trial decryption.

[04:33] 

So 5.6.0 is the first of kind of a three part attack to get us out of emergency mode. The next two pieces are an update to lightwalletd, which should come sometime middle of next week. Then finally updates to the iOS and Android mobile sdk's which will enable what we're calling fund availability. So the ability to access spendable notes without having a wallet that is fully synced.

[05:07] 

So that is where we're at currently. The 5.6.0 tag is out so you can download and compile the code. We are working currently, literally as we speak, on getting the binaries compiled and published.

[05:24] - **Dodger**

This particular suite of releases that you've got coming up with 5.6.0 and the lightwalletd stuff has been a long time coming so congratulations on that. For those who aren't aware this will be a major step forward to resolving the issues that have been affecting the network for the past while. 


___


### 2. Zebrad Status - Zebra 1.0.0 stable release


[06:15] - **Marek**

So in case anyone didn't notice, we released Zebra -rc.9 last week which fixes multiple network protocol and RPC bugs. It also avoids logging of information that might be sensitive. This week we released the first stable version, Zebra 1.0.0 and that's somewhat lightweight release from the user perspective, but not as lightweight from the developer perspective.

[06:59]

From the user perspective. The main thing is that it fixes a panic at startup when parsing the app version then we published Zebrad to https://crates.io. The Docker image has the latest tag on DockerHub, and if you encounter any bugs, please report them to our GitHub repository. We have template for issues, and you can also reach out on the Zebra support channel on Discord. That's pretty much it.

[07:52] - **Dodger**

I just want to give a big congratulations to the ZF engineering team for this milestone and also to acknowledge the contributions of past members of the Zcash Foundation and the help from the ECC engineers over the years as the ZF engineers have grappled with trying to replicate the functionality of Zcash, these sometimes bug for bitcoin derived bug.

[08:24] 

So it's taken on a huge amount of effort and a lot of contribution to get to this point and I just want to recognize that it's been a real group effort from across the whole Zcash ecosystem. So congratulations to everybody who's made this possible.

[09:05] - **Str4d**

While I'm here, congratulations ZF on zebrad it's very exciting and now I know I can contribute patches to something that people will be, they will get used by. So they will get reviewed with more terror than before. Welcome to the jungle.

[09:31] - **Sean Bowe**

Yeah, congratulations. Good job!

[00:09:35] - **Dodger**

Thanks Sean, and thank you for all your support especially the moral support. I keep quoting it and putting up a screenshot. I know it means a huge amount.

[09:48] - **Sean Bowe**

No, I'm totally serious. I've been dreaming about having Zebra 1.0.0 since six months after we launched Zcash, I think it's monumental for the project. So congratulations to all of you.



___


### 3. Research & Implementation Updates i) FROST / Zebra Community Call


[10:08] - **Dodger**

Thank you. Okay, Conrado, let's hear about latest of FROST.

[10:15] - **Conrado**

So we've been planning to do a community call talking about how to use frost with the cash wallets and that's still going to happen, but we're postponing a bit because the next one will be about Zebra. We will do a community call to talk about Zebra either next week on the other one. So the first one, we will push it back on the first week of July, probably to be confirmed.

[10:43] 

But that's going to happen. We have slides ready &I think it will be interesting. It has a lot of stuff that I'm not sure about how wallets would handle when using FROST. So there's a lot to discuss and decide on how that will work. Besides that, there's ongoing work on the demo, we want to present a demo or going to do at Zcon4 test design a Zcash transaction using FROST. Maybe we have that ready for the community call, but no promises. So we're working on that.

[11:27] 

Also adding serde support for the FROST library to help people in code, in the code stuff. Because of course it's a distributed protocol, so we need to send and receive structures around so having serde help you with that. From the implementation side that's it.

[11:52] 

From the spec side possibly there will be a minor change to the spec because Chelsea, while working on the proof for the re-randomized FROST variant that will be used with Zcash, Chelsea noticed that we weren't hashing the public key when computing the binding commitment, which is for the nonce computation, which is not an issue for FROST itself. It's considered good practice, but it's not a security issue if you don't do it. But it is required for re randomized FROST and other variants so we think makes sense to include in the spec. We have to see how that works in practice because there's some bureaucracy involved.

[12:50] - **Dodger**

Any questions on FROST?


___


### 3. Research & Implementation Updates ii) Nighthawk Apps Testnet Block explorer


[13:05] - **Adi**

Hello. So I remember last time there was a discussion around talking to some end user use case based services which might use multisignature in their protocol to get an idea of what use cases we want to build for. Is that something that is still on? Are you working with some teams or looking to connect with some?

[13:27] - **Dodger**

We haven't started that process yet because we want to be able to demo something before we start talking to folks. But yes, it's still very much on the cards and we'll probably at Zcon4, have a little bit of time anyway set aside to talk about what the roadmap towards getting Frost integrated into Zcash wallets might look like.

[14:05] - **Adi**

Sounds good. Thanks.

[14:29] 

Yeah, I can share it now. I thought there was another section for ecosystem updates. So we released the [Testnet Block Explorer](https://testnet.zcashblockexplorer.com) for Zcash, which has been lacking in the ecosystem, breaking a lot of testnet workflows. We're definitely open for all kinds of feedback. What API's you would like to have open to cater to your specific test cases? And if you don't run into any issues, feel free to DM us on Twitter and we have our repository on GitHub with our email on there. So, looking forward for folks to start using a dedicated testnet for Zcash.

[15:17] - **Dodger**

Very cool. Any questions for Adi or any other updates that anybody wants to share? Okay let's throw it open for any other ecosystem updates or any other questions that anybody wants to put forward or topics that they want to discuss. The only thing that I think we should chat a little bit about is the scheduling of this later arborist call.


____

### 4. Open Discussion i) Lightwalletd Updates & Syncing 


[16:15] - **Str4d**

I just wanted to mention that I opened a PR on Zebra with some mempool metrics that we've been trialing for the last month or so on Zcashd, and trying to figure out what's a useful set of graphs to be able to show related to mempool insights. So the point at which they're at now is I'm pretty happy with them. I haven't heard many complaints from the other people who have been trying them out.

[16:49] 

So the idea is now that people using Zebra could also have a look at them and see what you think. If we're happy that they are metrics that are worth collecting and they form useful data, then we can both go ahead and merge those in and get them out. Mostly I'm just thinking from the perspective of if the Zebra team is happy with those metrics, then we can have them out as like common Zcash metrics with the Zcash prefix. If Zebra doesn't want some different change of things, then we can either decide to make them ones that are optional or I can change it over to Zcashd prefix on our side. But that's what that PR is there for, just for context.

[17:53] - **Marek**

Thanks for the metrics.

[17:58] - **Dodger**

I suspect that we haven't had a chance to look at it yet. Just so everybody knows, our next kind of focus now that the stable release is done will be to integrate the changes that ECC have made to Zcash to enable the improved performance DAGSync for lightwallets through lightwalletd. So we'll be looking to implement that.

[18:39] - **Adi**

Yeah. Related question to getting lightwalled drpcs built inside Zebra. So there's a fork of Adityapk which is not maintained, which has certain APIs used by some wallets and then there's this new DAGSync based work that is going on and the lightwalletd being actively built by ECC that has different APIs used. So what is the kind of approach Zebra wants to take here?

[19:08] 

Do you want to integrate both and supporting both ways of allowing lightclients to fetch the blocks? Because otherwise I don't think if adityapk is actually maintaining his branch, but some of his APIs are being used by certain wallets.

[19:29] - **Dodger**

I need to know more before figuring out what we want to do on that. My gut feel is that we want to have a standardized approach rather than multiple forks. So ideally, if people are making enhancing lightwalletd, we should be getting those changes and improvements merged back upstream. But I see that Nate has an opinion on this.

[20:06] - **Nate**

Yeah, I was just wondering if and how we can engage the other wallet developers to see if they can migrate and what it would take. Also I'm curious if it's newer versions of other wallets or if it's like older versions that users are continuing to use. Does anyone know?

[20:30] - **Adi**

I think it's a combination because as of now, the lightwalletd just has the adapter layer has support for different kinds of ways it allows access to the blocks. So even if some wallets are older wallets, they can still access the lightwalletd. So it's backward compatible. So if some wallet doesn't find specific feature then they revert back to the linear download of blocks instead of asking blocks in specific ranges.

[21:01] - **Str4d**

So as far as the changes we're making to the upstream, like Zcash/lightwalletd repo, the changes being made there are just adding additional APIs that the DAGSync stuff can use and the DAGSync changes themselves in the SDKs will, I believe, be able to fall back to linear if the API's they need don't exist. It's possible to do and I think that's I think that's planned in in the way that's being done, but that's obviously only for the API's that we're adding for DAGSync and that doesn't take into account for other wallets that have chosen to add their own ways of doing things with possibly divergent changes.

[22:00] 

There's not much that we can do without discussion of those proposals. If they're just done in a custom wallet without being proposed as a wider change, then we can't really expect our stack to also handle that because we don't know what the motivations are for those particular changes.

[22:29] - **Adi**

Correct. They'll need some kind of maybe a call, but otherwise, personally, I feel as long as the Lightwalletd supports different ways of accessing the blocks and serves it, it should be fine. The only thing I worry about is if there's an effect when it comes to scaling, if there are a high number of users connecting, and if there's different calls being made to the lightwallet service, will that affect the performance?

[23:00] - **Str4d**

You mean the performance of Lightwalletd specifically

[23:04] - **Adi**

The service correct.

[23:09] - **Kris**

The amount of data that is transferred by Lightwalletd for this fund availability is very small orders of magnitude smaller than the compact block data. So I don't think it'll be a substantial difference.

[23:36] - **Str4d**

Without having concrete numbers a ballpark way to think about it is that any of these alternate ways of showing block data or accessing block data are fundamentally reductions of or transformations over the data that's in the chain, necessarily, at least for the data for most of the data that the DAGSync stuff will need, the lightwalletd's can choose to serve that as a live filter over already cached compact blocks or they could choose to cache the responses they would make for those calls themselves. So naively. You can think of it as like a 2X or 3X on the data cached by lightwalletd.

[24:33]

For the Compact blocks case, the upper bound, like completely ballpark with no actual numbers, would be like two to three x what it's currently caching and it'll be quite a bit less than that. But you can think of it as 2-3X in terms of to cache, all the different ways in which one might want to fetch block data, because across multiple blocks, you're just fetching different ranges. Doesn't change what the data is that you're fetching, because the data you're fetching is still independent of the individual wallets doing the fetching, other than what height range they're requesting.

[25:10] - **Kris**

And at least for this first round, the data that Lightwalletd is going to cache, I don't have metrics on what it's going to be in terms of protobuff size, but if I look at I just produced the uncompressed JSON of the data from Zcashd and it's less than 100K. So it's trivial.

[25:38] - **Adi**

Got it. It seems like the Zebra engineers will have to decide on the database caching and what kind of architecture they want to go with for the lightwalletd integrated inside Zebrad.

[25:54] - **Dodger**

Well, that's an idea that's not currently prioritized or planned. So at the moment Zebra acts as a backend for Lightwalletd, as a drop-in replacement for Zcashd, and there's an idea to integrate Lightwalletd functionality into Zebra, but it's no more than an idea.

[26:28] - **Adi**

Got it.

[26:37] - **teor**

I had a related question about how we should do the upgrade to the RPCs to make sure that it remains compatible. So one thing that we're working on in Zebra is instead of having to do a reindex where the node doesn't answer any queries and doesn't really start up for maybe a few minutes or half an hour or something, we are planning on doing those index changes in parallel to the node doing everything else it normally does.

[27:16] 

So for the new RPC fields, can we just leave them out if the height isn't built yet? So can we supply some heights and not others? Or do we need to not activate those RPCs until everything is ready to go? We don't mind which we have to do, we just need to know what's needed so that we can plan out the design for that.

[27:48] - **Str4d**

So you're referring to the RPCs that we just added to Zcashd?

[27:54] - **teor**

Yes. So we'll need to create new indexes I think for the subtree. Let me look it up.

[28:05] - **Str4d**

We have to do the same thing and we have basically done, as far as I'm aware, the same thing. So we don't require people with 5.6.0 to do a reindex I believe. I think we did get the we got the code in that we would rebuild it live on startup though rather than while the node is running. So we do have a period there, but I don't think that period is very long.

[28:37] - **Nate**

It does a binary search through the block index. I don't think we've measured it yet, but it's not substantially noticeable on startup.

[28:50] - **Str4d**

We have much longer things on startup just as a matter of course, like they can take a few minutes sometimes. So our startup concerns as to between when the node starts up and when the node is serving queries might be different to what Zebra is concerned with.

[29:08] - **teor**

Yes, if everything goes well on the network, zebra can start up in 10 seconds or 20 seconds or something. We honestly haven't measured it because it's kind of gone by the time you go look at it. I think we'll just try it and see and if it causes any problems, we can delay the RPCs activating until they are ready. If it's a quick free index then I doubt it will be noticed.

[29:38] - **Sean Bowe**

Sorry I was distracted are you talking about the repopulating the subtree database thing?

[29:45] - **Str4d**

Yes.

[29:45] - **Sean Bowe**

Yeah, it takes a couple of minutes for our node. I'm sure it's a lot faster for Zebra because our node sucks, but yeah.

[29:55] - **Str4d**

I think the main thing here I think is that you shouldn't be serving data at a block height where you are missing data for a later block height. Because the kind of query that lightwalletd will be doing is "give me everything from this height onwards".

[30:13] - **teor**

Great, then I can put that in our ticket and we'll make sure that it happens in the height order.

[30:19] - **Str4d**

Well, it's reverse height on the order I guess if you want to do it live. Because in our case if you're doing it starting from Genesis and going forward, then you'll have data for earlier heights, but not later. But what the lightwalletd will need is the reverse. It will want data from okay, yeah. From the chain tip backwards to some height is what it will care about. So if your population process can't serve it that way, then it would be better to avoid serving any data.

[30:52] - **Kris**

Something else that I've considered that we should probably just do is that since this data is actually static, once it's more than 100 blocks deep, just like we ship checkpoint information with the Lightwallet SDK, right now it's only 1000 records, so we can just include 1000 records in the binary. And then there's no need for Lightwallets to actually download really anything except for the very most recent stuff.

[31:31] - **Str4d**

Yeah, we also need to handle the case where they're downloading it.

[31:37] - **Kris**

In terms of if you can get the data in reverse order, then it's likely when deployed that you will only need to get a little bit of it.



____

### 4. Open Discussion ii) Arborist Call Timing 


[32:01] - **Dodger**

Any other questions, comments on the lightwallet related stuff? Any other topics that anybody wants to raise? If not, I'll kick in my own topic. So there was some discussion on the last iteration of this timeslot call about moving it to be a little bit earlier in order to cater for people especially in Europe. So right now here in the UK, it's just after midnight.

[32:55] 

Europe, obviously. It's just after 01:00 on the flip side for teor, it's 8-9am? I wanted to canvas and I think it was Daira who who originally raised this, so it's unfortunate they're not here but I just wanted to canvas and see if anybody has any thoughts or objections to potentially moving this call to be an hour or maybe an hour and a half earlier. Still scheduled in UTC.

[33:44] - **Sean Bowe**

I have no problem with that.

[33:50] - **Adi**

No objections. But I may suggest even moving it 2 hours earlier because if you consider Europe timezone, it's still quite late for them to join this call. Right?

[34:03] - **Dodger**

 I take the view, admittedly this is a very foundation centric perspective, but we span Europe all the way around to Eastern Australia and my general approach is to try to avoid scheduling meetings outside of the 07:00 to 00:00 window. We try to allow people to have their midnight to 07:00 clear. So yeah, making it earlier for people in Europe also makes it a lot earlier for people in Asia.

[35:16] - **Str4d**

Yeah. Like for comparison, the other slot of this which is currently like the the other slot is what is it?

[35:24] - **Dodger**

3 or 4pm. Yeah.

[35:26] - **Str4d**

15:00 UTC. So that's generally around like literally the middle of the night in New Zealand. So when I'm there I just don't go to those meetings and whereas I'm in the UK, I'm fine for them.

[35:41] - **Dodger**

Similarly the qedit folks don't attend this timeslot meetings. At the end of the day, you're never going to be able to keep everybody happy unless we switch to having three timeslots which I don't think is a good idea.

[36:06] - **Str4d**

I think the important thing for all of them is that we have enough coverage with the teams who will be attending and in particular the people who will be taking the call. So in this case at the moment it's you Dodger who is heading the call each time.

[36:33] 

So coverage with your time zone is important from that perspective. But similarly, it's not necessary for everyone from ECC or everyone from ZF to attend every single meeting as long as because we've got the recordings, we've got the things covering them up, it's useful and it's handy. But if we also have the ability to go to smaller sort of working group style meetings and things for things that need more close discussion, and these meetings are more of a general get together and things for the wider group, then we can go to times that are a bit more annoying. Although it would be annoying if we then end up in a situation where there are certain combinations of people who never get to be in the same arborist call.

[37:31] - **Dodger**

Yeah, that would be unfortunate.

[37:35] - **Str4d**

i was wondering from that perspective it just occurred to me maybe having the equivalent of them being positioned so we have like three meeting slots at like 8 hour intervals. It feels like that would give the best chances for people to have overlapping coverage. And in fact, moving this meeting a couple of hours earlier is essentially moving it to be about 8 hours after the 15:00 time slot.

[38:08] 

Because that would be 23:00 start time or 22:00. Like it's it's around about that point already. Like at that point on the triangle.

[38:18] - **Dodger**

At the moment, it's a 7.5 hour gap between the two timeslots. The earlier time slot is 15:00 UTC. This time slot is 22:30 UTC. So we'd actually be reducing the gap between the two.

[38:43] - **Str4d**

I see why I make that mistake because this is 23:00 to my calendar.

[38:53] - **Dodger**

Okay, well, we're not going to make any changes before Zcon. I basically reasoned that changing the time slots or anything like that will require changing the Zoom links, and that's a significant change. I don't be doing it too often. So my vague plan has been to make any changes during the sort of break for Zcon, and that will probably include switching it from being hosted on the ECC Zoom account to being hosted on the Zcash Foundation Zoom account.

[39:43] 

So at the moment, ECC still have to do the upload, whereas if we host it on the foundation account, then we can take over doing the upload. And also, by the way, we're going to be looking for more hosts as well, at the moment it's shared between myself and Pili our engineering manager. I seem to recall Sean doing an excellent job a few months back of posting the call. Might tap him again and Adi as well. We'll give plenty of notice and we'll try and get emails out to everybody's registered. I'm not sure actually, what the mechanics of that are. We'll make sure that people know as and when any change is happening.

[40:47] 

Right. Any other topics that anybody wants to raise or discuss. Going once, going twice. In that case, let's say goodnight and we'll see you at the next Arborist call, which will be in 2 weeks time in the earlier timeslot, 15:00 UTC.

[41:22] - **Sean Bowe**

See you then. Congratulations Zcash Foundation!.

[41:30] - **Dodger**

Thanks for the PR Str4d as well. Thank you all. Good evening. Good night. Good morning, wherever you happen to be.

_____

### Attendees


+ Daniel Wolande

+ Jack Grigg

+ Kris Nuttycombe

+ Adi Nighthawk

+ Conrado Gouvea

+ Marek

+ Nate ZEC

+ Nick Tacaks

+ Sean Bowe

+ teor

+ Arya Solhi

+ Vito

+ John Bruhling


**Next Meeting Scheduled: 15:00 UTC July 6th 2023**


___
___

