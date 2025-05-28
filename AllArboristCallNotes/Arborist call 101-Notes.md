### Arborist Call #101 Notes

Meeting Date/Time:May 15 2025, 21:00 UTC

Meeting Duration: 45 minutes

Agenda:

Welcome and Meeting Intro -

Zebra Update [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [zcashD / zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [shielded labs,NSM](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-ii-shielded-labs-network-sustainabiliy-mechanism) / [shielded labs,Ecc, Crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-iii-shielded-labs-and-ecc-crosslink-trailing-finality-layer)

Open Discussion - [Zcg, NU7](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion-i-zcg)


Video of the meeting: [recorded](https://www.youtube.com/watch?v=2HSAF2o7aK4&list=PL40dyJ0UYTLJqD_3PE9qiJTxse-iHnn1G)

Moderator: Dan

Notes: chidi olisa

Full Notes

## Welcome & Meeting Intro 

DAN:0.13

Hello, everybody. Thank you for joining today's Zcash Arborist call on May 15th. Today's agenda we have core stack updates from the Zcash foundation regarding Zebra ECC regarding ZcashD. The core libraries in Zallet, Zingo labs will touch on Zaino and we'll be talking about zcashd deprecation, research and implementation updates. I don't think we have anybody from qedit, but we'll still touch on that if anybody has any updates there. And two things from Shielded Labs, the Network Sustainability Mechanism and Crosslink. And then we'll have open announcements and discussion sections and it was requested that ZCG and NU7 priorities get discussed. What are Arborist calls? Arborist calls are bi weekly calls where zcash protocol contributors convene to discuss upgrade timelines and process, R and D efforts, design and implementation of new protocol features and identify blockers and unresolved issues. The purpose of these calls is to make core zcash development accessible for a wider set of participants and provide more transparency for the community at large. Anyone interested can participate. Anyone? If you're interested in learning about the Zcash protocol development, please register@zcasharborist.org and if you'd like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, please email arborscall@zfnd.org to request a slot. Other ways you can get involved with Zcash, there's the Zcash Community Grants, the Zcash R&D Discord and the Zcash Community Forum. And you can find and access all these links by going to zcasharborist.org and we'll kick it off with some core stack updates starting with Zebra from the zcash Foundation.

## Zebra Update 

ALFREDO: 00:2:09

Yeah, that's me. Thank you. Dan, can you hear me okay?

Okay, cool. So in the last two weeks or so Zebra has released version 2.3.0. Apart from that, we fixed an issue with some optional fields in the GET three state that was causing some issue in the stack integration with  Zaino. We also added the size and time fields to a transaction object which we know causes some issues in Zaino and zallet because we didn't realize that in new fields could cause problems. That ended up with some discussion. We are having to see how we're going to manage that in the future. Whatever is the case, we added those fields because some community members were requesting them to make their applications. Then when we were testing zallet with the full stack we found some caught repeating logs that were happening in the Zebra side, We fixed that and during the Release we found several CI issues in Zebra that we also fixed. Then we fixed a bug in the HTTP middleware that was causing ordering issues in the upgrades field of the get blockchain info RPC method. We made a big refactor by moving the RPC methods related to getlogtemplate that we had in separate files under certain feature flags. We move all that to the main methods file. We extended validate address to support text addresses. We are currently working adding value pools to the getlock RPC method. Conrado is working on that. Aria is working on adding a mempool change RPC method for listening to mempool changes. I think Marek is working on adding shielded coinbase support to Zebra. Yeah, that's pretty much it

DAN:

Thank you, Alfredo. Any questions, just check the chat. Okay, moving on. I believe this is Kris with the ECC update. You're unmuted, Kris.

## ECC Update 

KRIS:00:04:57 

Okay. In the past couple of weeks the major efforts have been so Zsend is now merged in Zallet so that it is now ready to be tested out. It doesn't support the full range of zcashd's ZSEN mini functionality, but it's now working for simple cases. We also have started the process of and are pathway through adding mempool scanning support in zallet. We did take a little bit of time away from Zallet to add address rotation for the ECC mobile wallet SDKs to propagate the work that we had done there through the FFI and to the other side so that we can now have automatic rotation of addresses in mobile wallets that are using the ECC SDKs. The other stuff that we did, we have a plan now for implementation, So after the conclusion of the recent vote we have a plan for the implementation of the one time lockbox disbursement and have a call out to the community So this week at the R and D the ECC weekly R&D meeting.
We At ECC didn't have any external contributors there but we discussed essentially requirements and options for the longer term lockbox disbursement protocol that we would like to include with NU7. So we had a bunch of good design discussions there. Next week we'll probably be flushing out the rest of the key rotation mechanism and and the rest of the lockbox disbursement mechanism. So if anyone from the community is available and interested in that conversation, please get in touch. I think that's basically it ,Still making progress on zcashd Wallet import. There's just. There's a lot there.

DAN:00:07:20

Thank you, Chris. Any questions? All right, we'll jump to the next one. Did we end up getting anybody from zingo? I don't think so. Anything worth bringing up here, Pacu?

## Research & Implementation Updates i) -Zingo Labs

PACU:00:07:45

No,as far as I know zingo has been wrapping up milestone three from the current grant and starting the continuation grant, like the follow up grant that has Block Explorer support, among other things. And I think that's pretty much just the status. I've been pinging zingo folks, that's brief update of what I'm up to speed with.

DAN:00:08:15

Cool, thanks. Pacu. Yeah, Alfredo.

ALFREDO:00:08:18 

Yeah, I know the  push appeared to Zebra about transaction and block deserialization, which is merged now. So yeah, that's something I know they did.

DAN:00:08:37

Thank you. Yeah. And if they do join, we can always circle back later. So we'll jump to the next topic here. Zcashd deprecation. I saw where you posted in the chat, Pacu. No update or no agenda items?

PACU:00:08:53 

We didn't have any agenda items for the meeting that's earlier today That usually clashes like every other week. So no updates.

DAN:00:09:03 

Okay, next topic. I don't see anybody from Qedit but would anybody like to bring anything up related to ZSAs? All right, we'll jump to the next topic again. And we got shielded labs and the network sustainability mechanism.


## Research & Implementation Updates ii) Shielded Labs, Network sustainabiliy mechanism

JASON:00:09:26 

Yeah. So where we stand on the NSM, we rebased three PRs, Librustzcash, the Zcash test vectors and the Zebra implementation for Zip 233. kris came back about two weeks ago with comments and Marius responded to them earlier this week. And so far only the Librustzcash PR was reviewed. So we're waiting, we're waiting for the others to be reviewed and then once Zip233 is merged, we'll go forward and We'll submit the PRs for Zips 234 and 235.

KRIS:00:10:03 

Can you make sure that I have the links to everything that needs review because stuff's scattered around enough that it's easy for stuff to slip off of my plate. So yeah, just ping in the R & D discord for anything that's blocking you.

JASON:00:10:22 

In the zebra channel.


KRIS:00:10:31

The channels appropriate to the PRs I would say, libraries for Librustzcach PRs, zebra for zebra PRs and you know zips channel for zip PRs, etc.

JASON:00:10:44 

Okay, we'll do. Thank you.

DAN:00:10:50 

Anything else regarding the NSM or questions for Jason or anyone else from shielded labs? All right, we'll jump to the next one. Crosslink.

## Research & Implementation Updates iii) shielded labs and Ecc, Crosslink Trailing finality layer 

NATE:00:11:03 

Hey, everybody.

MARK:00:11:09

I didn't think you were here.

NATE:00:11:15 

Yeah, sorry I was a bit late, we are close to wrapping up a Release for Milestone 2. I think we're just blocked on me finishing some documentation. And so this milestone has a thing called mainnet shadowing mode. And so what this is we have a fork of Zebra. We added a BFT system to it, and now you can configure your node appropriately to join a network of other people through the BFT protocol, as well as joining zcash mainnet. And then the BFT protocol will come to consensus about which proof of work block headers it's seeing. And so that's all it is. It's very rough around the edges. So it has, like placeholders for signatures, Bft, you know, placeholders for full validation of proof of work blocks, so on and so forth. But it's enough to run and interact with. And so we are planning on putting together, I've heard different things, a lab, a work lab, a party, a thing next week for anyone who's interested to join. And if you want, you can run one of these nodes and try to connect it to a network for us. So if you're interested in that, I think  we are going to make an R & D slide here?

MARK:00:12:53 

If I could share my screen.

DAN:00:12:58 

Yeah, let me quit sharing, Mark. And then you should be able to.

MARK:00:13:02 

All right, cool. There you go.  ( IMAGE)

NATE:00:13:11 

You win. This is so. Okay.

NATE:00:13:16 

Yeah. So, yeah, so as Nate was saying on the zcash Global Discord, we're gonna hijack the voice channel or a channel in there and have a little workshop where people, participants with a public IP address and port, can experiment with us and sort of run a test flight on this BFT network. And, you know, we're going to. We'll finalize the roster. You can DM your IP address and port to Jason, and then we're just going to run it until it breaks, and then that'll give us some good information. So it should be fun being a good excuse to just be on Discord together.

DAN:00:13:58 

Thanks, Mark. Yeah, go ahead, Nate.

NATE:00:14:01 

Yeah, just to follow up, also, if you want to play with the code and just be there and chat with us, you don't have to have a public IP address that's just to join this network that we want to run. And just to be clear, this is like totally a test network that doesn't really do much yet.
Want to join, and you don't want to join that network, but you want to learn how to run the software on your own, you can join that too. Or if you just want to watch people type Linux commands and hear what we're chatting about.

DAN:00:14:42 

Cool, thank you guys. Let me jump back to sharing here. Okay. Anything else related to Crosslink or questions for the Shield Labs team?

MARK:00:15:04

Alfredo, do you want to mention what you mentioned in the chat?

ALFREDO:00:15:07 

Yeah, I think I mentioned in the last  call that I was doing some DLA plus stuff for Crosslink. So I posted the link in the chat for anyone that would like to take a look. It's a kind of a personal project, but yeah, would be good. Some feedback will be great.

MARK:00:15:32 

That's really, really cool. Alfredo, thank you for starting the effort on that.

DAN: 

Great. All right, let's click on to the next one. Any open announcements from anybody? Just double check the chat here. All right, next up, open discussion, which included something that Jason wanted on the agenda regarding ZCG.


## Open Discussion i) ZCG

JASON:00:16:02 

Yeah, so this is for ZCG. So the NU7 timeline's been delayed and it sort of lacks this clear timeline for completion. And it's creating some challenges that we sort of need help navigating. So we're running a few different initiatives here around ZcashD deprecation work that zingo and Blockchain Commons is doing. And then we have QEDIT working on integrating zcash shielded assets into the protocol. And what happens is as the timeline for NU7 gets pushed out, so does ZCG's funding liabilities, which puts a lot of pressure on our Treasury. So for example, we've been funding Qedit at $105,000 per month for the past five months to support ZSA integration. And that was based on the original expectation that NU7 would be completed by the summer. But then due to delays, Qedit's in a position where they need, they're planning a follow on grant through the end of the year for a similar amount. And we're also expecting additional grant proposals from zingo and Blockchain common. So there's a couple things that can help out. First we need clearer, realistic, more realistic timelines for completion of NU7. I mean, there have been a number of optimistic timelines, but those have been pushed out Multiple times. And then second, we need clarity from the core teams on the scope of work required by these teams. And what I mean by that is like with Qedit's grant, we're currently funding a team of eight engineers at an average of $15,000 per month per engineer. And this might have made sense when the goal was to integrate ZSAs by the end of June or by the end of the summer. But having this ongoing and like, indefinite is just not like, viable. So I guess one question that we have is, are we correct in thinking that there should be a fixed amount of work required to integrate ZSAS into the protocol regardless of the timeline? And can you help us work with these grantees to better scope the grants to specific deliverables and a specific timeline? Because, you know, we have limited funding, so these sorts of ongoing expenses are just not sustainable.

DAN:00:18:35 

Any takers?

KRIS:00:18:43 

I guess what I can say is that there's not a way to like on the spot, decide on timelines, I know that Strad and Dara Emma have been making some progress on the ZSA integration PRs. Those are like extremely substantial pieces of work to review those PRs and get them in. So it's slow going and it's especially slow going when there's multiple competing things competing for attention. So I don't know right now how to improve the visibility of timeline priorities.

JASON:00:19:44 

you mentioned that Dara Emma and Str4d are reviewing the ZSA pr,but what we're paying for Qedit and Seven engineers.

KRIS:00:19:57 

Yeah, I, I understand that

JASON:00:19:58 

No, no, but I'm saying is that, is that necessary? Right? Like, are they doing full time work?

KRIS:00:20:03 

I don't know. I don't have any idea.

JASON:00:20:04 

Oh, okay.

KRIS:00:20:08 

Yeah, I know  that they have been meeting with Str4d Daira Emma on a regular basis. I don't know what they're doing, maybe Str4d and daira emma have a better idea, but I'm not confident they really know much better than I do.

JASON:00:20:30 

Okay, all right, well, maybe a good starting point would be to talk to Str4d and the QEDIT team and just get a better sense of the work.

KRIS:00:20:39 

Yeah, I mean, it sounds to me like, Do you attend their regular syncs?

JASON:00:20:49 

No, I, I wasn't aware that they were having regular Syncs. It's.

KRIS:00:20:53 

Yeah there are one or two meetings weekly between the ZSA engineers and Str4d and Emma,They happen at about 4am my time so I haven't been to them. So I don't really know exactly what's going on there.

JASON:00:21:08 

Gotcha.

ALFREDO:00:21:15 

Yeah, I have a question related to that maybe for kris As a ZIP editor, what is the status of shielded asset ZIPs right now?

KRIS:00:21:29 

So I believe that many of the smaller zips PRs have been merged recently.

ALFREDO:00:21:45 

Okay. Yeah I guess that's one. So there's less that they have to work on if they are already merged.

KRIS:00:21:54 

Yeah, there's a bunch that has been merged. So what hasn't been merged? So we're still working on the zip 230 and 246. The transaction format and SIG hash , there were a few fixes and so that's now essentially it needs one more rebase and that should be also ready to merge. So that should unblock us then merging the librustzcash parts that deal with stuff like transaction format and SIG hash and so forth.

ALFREDO:00:22:50 

Okay cool. Yeah I guess that's something less that they have to do. The ZIPs are kind of ready. So I guess the zcg can fund with less money because that work is really done.

KRIS:00:23:14 

Yeah, this is something that you know, I think that meeting with both Qedit, Str4d and Daira Emma Is the way to go.

DAN:00:23:28 

There was another piece of Jason's question that maybe kris, you might be or Pacu placed in a good position. I don't mean to put you on the spot but the you know a potential follow up to just any information regarding the Zewif project and blockchain commons and you know, work going forward related to zcashd deprecation.

MARK:00:23:53 

Real quick, Dan, Jason's power cut out and he has dropped. Okay so.

DAN:00:23:55 

Okay

KRIS:00:24:00 

Okay yeah. So. So with respect to the blockchain common stuff I have made I've done a lot of work over the past three weeks on. On sort of bashing the. The Zewif stuff into shape. The approach that was taken there,The ZeWIF format Seems to have been largely designed by taking the internal representation of transaction and wallet data from zcashd and kind of reproducing those in a serializable format, which is absolutely the wrong way to go about it because zcashd is a huge pile of cruft. So I've spent a lot of time and thousands of lines of code ripping out a good portion of that work. Now I am actively working on the ZcashD wallet import using stuff that the blockchain commons folks have delivered. That in itself I'm having to implement a bunch of sort of lower level parsing for ZcashD key management types and whatnot. where what we're getting out is basically raw encodings that are again internal to zcashd that then need to be parsed and handled for us to actually use them,for the purposes of migration and creation of of ZeWIF and getting zcashD wallet data into Zallet So on, on balance there has been definitely some useful stuff, but definitely some products of not having enough context  have consumed a lot more time than I wish they would have.

DAN:00:26:10 

Okay, thank you, Chris. I don't know if Jason rejoined, but I can make sure he listens in to this part. Anything from your end, Pacu? I see you're unmuted.

PACU:00:26:26 

What I've asked around two weeks ago to the three major development teams that are working on zcashD deprecation is to actually think of a timeline that doesn't have to be accurate by the day, hour and second. But yes, this lack of timeline has been a problem when talking to big tech partners because they need us to tell them when they should be prioritizing work for the zcash ecosystem among all the things they work on. Because we're talking about exchanges like Coinbase and others that are that size and have many competing priorities, then the conversation kind of stalls on ourside because we don't have a specific answer to when Z3.What I've asked, if we do have any timeline like the, the accountability on that timeline to whomever is disclosed, if it's private or semi private or shared publicly, it will be responsibility of the head of Zingo ZF and ECC mostly which are like the does the big three on the Z3 thing. So I didn't want to like push anything forward without their approval, their consent and that's what I'm trying to work towards.I was not aware about this accounting kind of resource thing of ZCG which makes total sense. I guess that, may be a good thing would be actually scoping what is the workload that it is currently going and maybe start from there. but what I can say from the zcashD deprecation side is that I'm trying to get some timeline but not specifically something kind of blog post timeline but something that we can at least start discussing internally, make sense of it and then and we have new information coming  We needed the input from the community voting and polling, if we had had a timeline 2, 3 weeks ago we will have to redo it. We do have all the input that we need for some kind of timeline that makes sense because we know that community wants the CNC mechanism work done before NU7 and that means like before or nearby zcashd deprecation competing with that. So we didn't know that before we had the results and now we can like have all the things to work on that. So I guess that that's something that I can help. I don't know if we were in an office I could bring pastries and coffee and mate facilitate some meetings but I don't think it's up to teams to actually make a sense of it and we just help.

JASON:00:30:50 

Yeah. So what we can do is With Qedit, I'll talk to Str4d and Daira Emma and get a sense of the work that's required and sort of where things stand with the open PRs and just the integration, and then with Blockchain Commons and zingo I think you know it will be helpful to just get the core teams to sort of review their proposals and and help scope it out just so that it makes sense both in terms of project management and also from a funding perspective.

KRIS:00:31:32 

Yeah I mean with respect to Blockchain Commons specifically You may have missed and so should probably re listen to the comments I had there. I think that in terms of What is necessary for my use for zcashd Wallet import have already been delivered. So the other pieces there are going to be related to other community efforts around Zewif, now I would point out that I don't personally yet feel like the Zewif format is necessarily stable or adequately represents enough of a range of use cases but that's something where Other members of the community need to know, So specifically zingo folks and maybe Han, if Han is inclined to use ZeWIF at all like their contribution would be greatly appreciated.

JASON:00:32:57 

Okay, I'll touch base with both those teams and encourage them to get in touch with the Blockchain Commons team. Pacu and I had a call with Blockchain Commons yesterday and that was something that they mentioned as well.

PACU:00:33:35 

Yeah, they could also consider that there are some some work that needs to, not specifically done but like contributed from wallet developers to extend the extensible wallet information format Zewif and also I think that the most important thing for now is the zcashd part of it which is like the critical path for the zcashD deprecation which is getting the Wallet DAT file into some format that then can be converted into other format or imported into other software.

KRIS:00:34:19 

Yeah, I mean what I've been. Because of sort of the immaturity of Zewif format, I spent a bunch of time trying to make the Zewif format mature enough and I have fallen back to, I am currently implementing the zallet migration directly on top of the tools that Blockchain Commons had provided for parsing the Wallet dat.  after I have completed it directly then I'm going to go back to exporting it as Zewif. But essentially having that intermediate ZeWIF state when there was so much kind of not well mapped across was slowing me down too much. So I'm not currently using ZeWIF as the intermediate format in this, in this exchange, although the work that I'm doing now will lead to being able to populate that intermediate format.

PACU:00:35:20 

It's a little bit of salt and pepper I guess. Good and good and sad news. Yeah. But well and thank you for doing all that.

DAN:00:35:40 

Okay, thank you guys for that update. Yeah. Anything else on that Pacu or Jason or just on that topic?

PACU:00:35:45 

No, no, I guess that will follow up with the teams about these follow up grants and we will need input from core developers to actually make sense because I think that's something that we fell short a bit is that, maybe these works needed a little bit more like feedback cycles with the the core teams and they didn't have that and that's probably what caused maybe this like disconnection between What was expected for this Zewif and what ended up being. We will make sure that we can actually factor in like reviews, meetings, office hours, you name it, how we want to call it. But like a feedback loop, like review and development with the core team and the contributors.

JASON:00:37:10 

Just to add to what Pacu is saying, like, I mean, one thing that I took away from the call with Blockchain Commons yesterday is that there are significant growing pains having these new teams involved and specifically like I guess Blockchain Commons relied on like zingo to help scope their grant and block. What wasn't clear to them is that they would need to be experts in zcashd and  they didn't really have that background. They relied heavily on the community, but I mean they just didn't get a lot of feedback from community members and pretty much sounds like they just worked with kris, which probably took up a lot of your time. So yeah it's growing pain, some of it is just we need more communication, which is hard because everybody's already strapped for time.

KRIS:00:38:02 

So there's another thing that could have been done here that we should certainly consider for future efforts of this sort and that's that the approach to the deliverable should have been more incremental.So for example, if it had been the case where the goal was using the zcash dev tool, integrate key material from the wallet dat. with the zcash devtool wallet. If that had been sort of the first deliverable, that would have revealed a bunch of mismatches early on and then the next deliverable is integrate transaction data via this path. If the integration can go more end to end, then I think that the impotence mismatches would have shown up much earlier.

DAN:00:39:21 

Any other thoughts on this? All right, thank you all for that. Okay, good. Any other topics for open discussion? Let me double check the chat again. Okay, last call for any other comment, question, concern. Okay, the. Thank you all for being here. And the next arborist call will be May 29th at the 1500 UTC time slot and you can watch for this. Today's call will be uploaded to the ZF YouTube. Thank you all.

Next Meeting Scheduled: may 29 2025, 15:00 UTC)

