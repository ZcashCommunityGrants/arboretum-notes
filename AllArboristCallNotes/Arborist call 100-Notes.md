# Arborist Call #100 Notes 

Meeting Date/Time: 1st may 2025 16:00 UTC

Meeting Duration: 32 mins.

# Agenda:

Welcome and Meeting Intro -

Zebra Update - [Zebrad docker](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update - [zallet , crate releases, Ecc](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update--)

Research & Implementation Updates - [Qedit](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates---qedit-zcash-shielded-assets) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#reseach-and-implementation-updates---crosslink-trailing-finality-layer--shielded-labs--ecc) /[Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--nsm-update--shielded-labs) / [zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-update--zcashd-deprecation-updates)


Open Discussion - [zcashers wishlist](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Decisions and Action Items

i)  If anyone seeing this call, watching this call sees that they are using RPCs that are not checked here, please reach out and we'll get in touch and hand you the survey so that we have your input here
[checklist](https://docs.google.com/spreadsheets/d/1UJxH1cowexGqadU32Uei5Qak6jGhXjb18-T_QBPmDAA/edit?gid=0#gid=0)

ii) zcasher wishlist for things the community wishes to be built [check it out ](https://forum.zcashcommunity.com/t/lets-create-the-zcasher-wish-list/51143)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=VgFpg-U_CbI&t=58s)

Moderator: Alfredo

Notes: chidi

## Full Notes

Welcome & Meeting Intro -

Alfredo: 0:01

All right, so my name is Alfredo. Work for the Zcash foundation, mainly in the Zebra part. This is the Zcash arborist call for May 1st, 2025. Big agenda to cover in regards to the updates. We'll give updates for Zebra. Then there's going to be some updates about the libraries and the wallet, what the ecc is working on Regards to Zaino.  If the first three was not covered. We'll talk about zcashd deprecation. Then we'll give some updates about research and implementation. qEdit, shielded labs, Network Sustainability Mechanism, Crosslink and finally Frost. And at the end we will discuss any topics we want to discuss further. What are arborist calls? Bi weekly calls were zcash developers get together to discuss process timelines, efforts, design, etc. The purpose to make the zcash development more accessible for a wider set of participants. Provide more transparency for the community at large. Anyone can participate in the arborist calls. You just need to send an email to get invited. The email is posted on the screen. There are other ways to get involved. The zcash community grants, the Discord and the zcash forums. All these links are available in zcasharborist.org so let's start with the Zebra updates from the Zcash Foundation. I think Marek is the one for doing that. Are you there? Okay, marek is not here. Should we move on to the ECC updates and then get back to that? You want to do that, Chris? Yep.

## ECC Update -

Kris: 1:39

So the majority of the work that that ECC has been engaged in in the last two weeks has been making progress on zallet. I still have to review the PR one more time But we've also improved the help documentation and what not around Zallet. The Zewif integration is still ongoing. The other thing is Daira-Emma and Str4d have been putting forward a bunch of effort towards review of the Qedit PRS for ZSAs.

# Research & Implementation Updates- Zingo labs, Zaino

Arlo:  3:23   

Hey, yeah. So in terms of Zaino, the  last  two weeks we've mainly been working to get milestone three of our grant finished off just to make sure we can unlock payment and carry on working on things. We're very close to that. So the JSON RPC server is now in a PR ready for review that should be merged today, tomorrow and then the restate service backend should be landing some point next week. Hoping to get all of that finished by the end of next week so we can put a little bit of time into focusing on all of the issues that have been raised in Zaino and reworking a few things there for zallet and other consumers.

Alfredo: 4:17

Cool. So if I remember correctly one of the blockers for zallet was that Zaino is not serving full blocks. So if that is what you said about the redesign PR that is going to be landing next week.

Arlo: 4:37

So Zaino does serve full blocks. It doesn't. It currently doesn't build block ranges correctly for zallet and that's what we will be working on as soon as we get this milestone complete. There's a couple things we have to rework at a slightly lower level to make that actually work in Zaino.

# Research & Implementation Update- Zcashd Deprecation updates 

Alfredo: 5:00

Okay cool. Pacu, do you want to talk about zcashd deprecation?

Pacu: 5:08           

Yeah, mainly I booked this space to have like a small section of the call for zcashd deprecation if anyone wants to give any announcements or bring up any anything related to that given that this call overlaps the call we have every Thursday so every Thursday. So I didn't want the opportunity to miss that. Given the announcement that has been said by Arlo the moment we have the JSON RPC on Zaino  I'll try to start working on the formerly Nighthawk Block Explorer support for Zaino and Zebra we expect a few things to blow up but it's going to be the starting point for that. And I wanted to bring it up, there's a read only version of a spreadsheet that people can see on the z.cash/deprecation I think page that we've been sharing. But there's also a read only spreadsheet that has the full list of RPCs that are involved in zcashd deprecation or zcash Z3 as we like to call it recently and it's useful for people to check it out. We're going to share it here in the chat. Probably our note taker will be able to post it on the notes that are published after these calls and we invite everyone to see this checklist which has a lot of use cases. It covers Block Explorers, Inside Explorer, Nighthawk Explorer and A couple of mining pools and exchanges we've been surveying. If anyone seeing this call, watching this call sees that they are using RPCs that are not checked here, please reach out and we'll get in touch and hand you the survey so that we have your input here. Although it's never too late, but it's not early. So don't be shy and reach out. That's what I want to bring up here. And if anyone wants to bring up anything on zcash Z3 formerly zcashd deprecation, this is a slot. Otherwise we'll continue with the agenda of the call.

Alfredo: Arlo?

Arlo: 8:11

Yeah, I was having a look at that spreadsheet just earlier in terms of getting Nighthawk running and there was one RPC which I didn't have down as needed for block explorer support, which was the GetBlock subsidy RPC. So I just wanted to check that that is definitely required for Nighthawk.

Pacu: 8:35

I'll double check but we do have a little bit more messy GitHub thread that has also the list there.

Daira-emma: 8:58

can you hear me by the way? Yeah, that RPC is a pure functional one so it's not dependent on Chain state I think, except possibly the current height, I'm not sure but it is quite useful because yeah, the subsidy can change according to the consensus rules so. It can be hard to compute if You are not up to date with this.

Pacu: 9:25

Well, thank you Daira.

Str4d: 9:30

Yeah, I just wanted to remind people, or maybe people who haven't seen it yet or if you run a zcashd node you will definitely have seen this because the latest ZKashd release puts it right in your face when you try to start zcashd and forces you to know but we have a canonical URL now for zkashd deprecation and if there's things that you want want to be directed to that you would like to be on that page, let us know. That's where as the deployment side gets worked out and that story gets built out that this will be where that ends up being explained to people and yeah, on the. I think, yeah the two interesting notes in the last. In the last patch from me for this, there was a user question in I think the forum about like is it possible to migrate from an existing ZcashD to a ZebraD without having to just like sync from scratch. And part of the answer is that in theory it should be possible for Zebra to just directly pull from your local running zcashd node. Zcashds have always been able to do this. There's a whitelisting thing that you can force zcashd to specifically use a given local node. But additionally we have all the block data on disk, we should just be able to pull it. So I put together an initial working example for doing that migration and it's thrown up some edge cases that we'll need to work around. It looks at the moment like it would be easier to do as a separate tool, but I don't have a good place for that because it would make sense as part of the Zebra CLI because it's a set up of a zebra node from a zcachd node is functionally what this tool would be doing. But it looks at the moment due to limitations in Zebra that this would require more like it would require level DB supported built into Zebra to be able to read ZcashD's database there. So it might make more sense as a as a helper tool binary that lives alongside the Zebra repo. I'm not quite sure if people have thoughts about how. If people would be interested in using such a tool and have opinions on how it should work. Let us know in the R and D discord, in the zebra channel, in the R and D discord or on the the PR which that's currently open, which is. I had it open and I have 9472 on the Zcash foundation repo is where it currently is. Yeah. So if there's thoughts about where that could live or how that could go. There's no because that would then mean that like you can just take your existing ZcashD with its fully synced chain data and transmogrify it locally into a zebra state that you could then just start up and connect to the network from but from a position of like or an already trusted base.

Pacu: 13:02

marek is suggesting on The chat that it could go to Zebra utils.

Str4d: 13:07

Yeah, whatever makes the most sense for Zebra usage and whatever. So yeah, just leave comments to that effect and we can figure out what we do there. And then the other thing is yeah, obviously just in the realm of trying to make zallet easier to use, I just threw together yesterday open RPC support into zallet, which basically it lets you, It gives you a JSON RPC response that encodes a JSON RPC schema for what the RPC itself supports. So it allows for introspection and you could choose to generate client data from it or whatever. It's probably got bugs. But if people are interested in playing around with it and giving feedback, then we can make that easy to go. And that should just help with discoverability of particularly the changes to the rpc because it will more precisely specify what the RPC interface is, which was previously essentially just documented in the code of ZcashD.

Alfredo: 14:20

Cool. Yeah, I want to do that for Zebra because in the past hackathon Sprint, I made it with Open API which is not very good feed for the JSON IP that we have. So I'm looking forward to apply something like that to Zebra to replace that. So we'll definitely take a look of how you did it. In regard to Explorer, I was going to say that we have the zcash Explorer repo in the zcash organization. I think we should try to start to make the changes there because what I'm seeing now is that people have forks. I guess it would be good to unify there. I think it would be good to modify the Explorer to remove all the functionality that we don't have and then we can slowly add those. Well, another thing we need to do is to connect to Zaino as well and Try to have a basic version of the Explorer working.I think it would be great. But anyways, anything else in regards to zcashd deprecation?

Pacu: 15:47

I don't think so. Thank you for bringing up Alfredo the block Explorer now also living under the zcash org.

Alfredo: 15:59

Okay.I'm not sure if we have someone for Qedit to talk about ZSAs.

# Research & Implementation Updates - Qedit, Zcash shielded assets 

Vivek: 16:11               

Yeah I'm here.

So yeah, I can give the ZSA update. We have a few general updates. So regarding the zips, I think  And the pull requests that we had open last time on the zips repo have been merged. We opened a new PR recently, PR 1009 but that's pretty much I think just a rearrangement of a section of the zip. No like significant changes over there that's on the zip side. On the implementation side I think as Chris mentioned, the ECC has been reviewing our work over the last few weeks. So the status of that is. I think the. The changes to the Sensimilla crate that we suggested, those have been merged. The changes in Halo 2, they were reviewed. We had a discussion ,I think something was pending there but we just an update to Strad. I think we made those changes that you suggested that we had missed in our meeting. So that I think is ready for review again. In Orchard it's I think a more informal review that was done at the start and I think some discussion that we still are like in the process of doing with the ECC on making those changes. What we did do in Orchard is we caught up to the upstream changes as of maybe last week or something like that, so that's good. On Librustzcash we've made the changes, we've been making changes regarding the changes that were done in the In the zips in the last few months. So we've made those changes across like Orchard and librustzcash as well. But we have some work to do to catch Librustzcash up to the latest upstream changes. We've also like on the Zebra side, we've also made most of the changes that were there to the zips. I'm not 100% sure if you're like completely done with that part of it. We've been syncing with Zcash foundation on that work through internal PRs, but I think we might be also putting an actual PR to Upstream at some point soon for like a more formal review and so on. I guess on the last bit is the zcash transaction tool, we've been making improvements to the CI and like the general ability to use the transaction tool to create your own scenarios for testing. Testing as in of the essays, issuance, transfer, burn, finalization, things like that. I think that covers what we've been up to last couple of weeks.

Alfredo: 19:23

Any question. Okay, let's move on. Network sustainability mechanism from Shielded Labs. 

# Research & Implementation Updates- NSM update- shielded labs

Mark: 19:32  

Yeah, I can take this. We are in the rebase merge dance right now with the majority of the PRs. There's a pull request in Zebra if you. If you recall, we created pull request and we merged pull requests having to do with the NU7 and transaction v6 variants and we just merged those. And now the rebased versions of the 233, 234, 235 NSM PRs are much smaller and much easier to review and ready to merge, but they're ordered. So the Zebra one needs to wait until the Librustzcash PR is merged and then the Zebra one can be merged. And there's also a zcash test vectors PR that can be merged asynchronously to either of those I believe. So I think the laser focus right now should be on reducing any friction to LibrustZcash's merge and then getting zebra sting merged and then 233 will be in. 234 and 235 are still just kind of in git limbo right now. We're rebasing those against main, but I believe once all this is taken care of, those can be reviewed as well. Thank you.

Alfredo: 20:56

So, Chris, is there any kind of timeline or something to check that out in librustzcash?

Mark: 21:02

Actually, the ball's in our court. I should clarify the ball is in our court, to just rebase. There was a clippy issue and the PR just needs to get rebased against that. So it's not in Chris or anybody else's court.

Alfredo: 21:18

Great. Any question? Okay. Any updates for Crosslink?

# Reseach and implementation updates - Crosslink trailing finality layer.- shielded labs & ecc

Mark: 21:30

Yeah, May I share a video?

Alfredo: 21:35

Yeah, sure. I think I need to stop sharing.

Mark: 21:51

All right. Can you see that video?


Alfredo: 21:55

Yes.

Mark: 

Okay, great.

Andrew: 22:01

Hello and welcome to another Shielded Labs update. Today we're going to talk a bit about the new UI improvements and some more about Bft. So the key thing that we've added is this node jump to and tracking interface. The main or a common use for this, at least in practice so far has been tracking a tip with 2 bytes. And you can see the camera just as new blocks get added to the proof of work chain in this internal miner version. Now, very shortly, once we've got enough blocks, we will start getting some BFT blocks. And there we go.

Sam: 22:46
 
Yeah. So what's new as well is that these BFT blocks we have going here now this time contain a real payload. And this is, you know, still early, but it's, you know, pursuing the actual design of Crosslink. Now, where we have the payload contains an array of proof of work headers. And this is because illustrated by the arrow is the proof of work block being finalized by the BFT chain. And then also if Andrew highlights one of them, you'll see it highlights a number of proof of work blocks ahead. And that's the amount of proof of work that was done already on top of this block that's being finalized. And we intern those into the payload for the BFT to avoid unnecessary changes to zebra that would otherwise come from needing to track these extra blocks. Right. Because it may be that if there is forking in the proof of work chain, sort of small, low level forking, that some of the proof of work that's included in needing to finalize a block might have been on a slight side chain that then doesn't end up in the mainchain. And so by including those in the BFT payload, we minimize the amount that the rest of the of Zebra has to track in terms of remembering blocks that didn't end up in the final chain and got dropped some time ago.

Andrew: 24:20

Yeah, I think that's all we have for this call. So we'll say goodbye for now and catch you with an update soon.

Sam: 24:22

See everyone.

Alfredo: 24: 30

Thank you.

Mark: 24:35

That's all from us.

Alfredo: 24:40

Cool. I. Yeah, I think I have a ticket open in somewhere in shielded labs for the Crosslink development repo you have about Crosslink TLA specification. I have been working on that. I think I will. So I'm not expecting anything from it. It just helped me understand how the system works and maybe other people will find it useful. I'll try to post it by the end of this week. And yeah, in that issue I have.

Mark: 25:15

Cool, that's awesome. Connect with me on the discord or signal or whatever if you have any specific questions as you work through that.

Alfredo: 25:19

Yeah, cool. Would be great if you could take a look.

Mark: 25:21

Okay, cool.

Alfredo: 25:22

Okay. Any more questions for Crosslink? Okay, so in regards to Frost, I think the frost people is on holiday today so I don't think we have anyone to keep the updates. Okay. So anything else  to discuss  or extend on some and anything we already spoke or whatever you want to suggest some topic?

# zebra update 

Marek: 26:10

I can give the Zebra update. So, as regards Zebra, we will soon be releasing version 2.3. There will be one breaking change for node operators who run Zebra D in Docker and that is that the RPC endpoint will no longer be enabled by default in in Docker images. So people who run Zebra D in Docker will need to enable it manually in the config. Other than that, in the last two weeks we continued working on Zcashd deprecation. The work mainly revolved around RPCs and fixing various bugs and inconsistencies with Zcashd.
That's pretty much it.

Alfredo: 27:12

Cool. Thank you, Marek. Yeah. So for discussion, anyone want to raise any topic or announcement Discussion?

# Open Discussion 

Pacu: 27:30        

Okay. Not really. Kind of off topic, not related to protocol specifically but given some question Nate asked in the chat I came up with this idea of the zcasher wish list which is the topic in the forum to. You know there are a lot of things that we would like to have and maybe  other projects have or other projects or maybe they don't have but we would like to have in zcash. It can be something really simple as a dashboard or something really complex. But the important thing is that you raised your idea and we can sense how much acceptance it has in the community, how many likes it has, and then create a list of things that people would like to have and post it on the blog. So for builders to have some wish list there and maybe they'll build some of the items there. So it's a little bit of a game fun thing to do. And we invite everyone to post their wishes for the ZCASH project, what they like to see, what they'd like to have, the nice things they like to have or see on zcash and so we can make them visible and they'll maybe materialize. I left the link in the notes in the chat so it can be added in the notes of the.

Alfredo: 29:25

Cool. Thanks Pacu. Another topic for discussion. Okay, I guess if there is none we could finish early. So the next arborist call will be May 15th and at the later 21 UTC time. Thanks everyone for coming. It was great to see you all. Thanks.

Kris: 30:06

Bye everyone.

Pacu: 30:08

Bye everyone. Thank you.

Alfredo: 30:12

Thank you olisa, thank you for support . Bye have a great day 

Next Meeting Scheduled: may 15th 2025, 21:00 UTC

