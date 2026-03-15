## Arborist Call 120 Notes 

Meeting Date/Time: 5th March 2026, 15:00 UTC

Meeting Duration: 47 minutes

Agenda

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

General discussion, [Nu7 poll result](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#general-discussion-nu-7-poll-results)

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update[zallet, shielded coinbase](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update) 

Research & Implementation Updates [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino)/[zcashD](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcash-deprecation-updates-zodlzf-zingo-labs-pacu)/[Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-qedit--zcash-shielded-assets)/[Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)/[crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer)

Open Announcements [kusama](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcement) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=uBsaOLUepB0)

Moderator: Pili

Notes:chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:02:00  

There we are. Okay, let's get started. So this meeting is recorded. It is uploaded to YouTube. Please turn off your camera or leave the session if you're not comfortable with this. And with that, we will start the call and the recording now. Recording in progress. So welcome everyone to today's arborist call on the fifth of March of 2026 the agenda today is as follows. We are going to kick things off today with a discussion on the Nu 7 poll results, and then we can move on to the initial updates  from the teams working on the core Zcash stack, the Zcash Foundation, zodl, zingo labs, as well as an update from Pacu on the ZcashD deprecation progress. Then we will follow up with some updates from teams working on research and implementation of new features, such as qedit shielded labs and Zodl. Finally, we will open the floor to participants if there are any other announcements or any discussion topics that the community might be interested in. So what is the arborist call? It is a bi weekly call where Zcash protocol contributors meet up to discuss upgrade timelines and process protocol research and development efforts, design and implementation of new protocol features and identify blockers and unresolved issues. And the purpose of this call is to make Zcash protocol development accessible to everyone and to provide more transparency for interested parties. Anyone can register to attend. You can go to Zcash arborist.org, to get the links. And if you want to become more involved and you want to present, you can email us at arboristcall@zfnd.org and request a presentation slot, outside of the arborist call, you can also participate in the Zcash community by applying to one of the grant programs. And also you can take part in community discussions in the Zcash R and D discord or the Zcash community forum, and there are links for all these at Zcash arborist.org, and with that said, let's start off with discussion on the Nu 7 poll results. Is there anyone that wants to kick off this conversation today?

## General Discussion Nu 7 poll results

Jason: 00:04:18  

So just for context, I asked Alex to put this on the agenda item a week or so ago. Since this is the first arborist call following the polling results, I just wanted to get a sense of everyone  more or less aligned on how to interpret the results, like what features we currently view as in scope for Nu 7 and then whether there are any updates on the timeline for Zcashd deprecation and Nu 7 activation. I figured, like you know, these questions would likely come up in each section of the call for things like the zsas and the NSM updates, so it seemed more efficient just to discuss it up front. Sure.

Pili: 00:05:01 
 
Thank you, Jason. I don't know if anyone wants to ,I think you know, there have been some posts from both the Zcash foundation and shielded labs on how we interpret the results. I think there are clearly, obviously, there are some areas everyone agrees on. What is not clear is what we do about the features  where  everyone was not  in agreement, even though most of the polls were in agreement, apart from a few that were not.

Jon: 00:05:44  

I have a few ideas to share. You know, qedit, we've been working on getting Zsa ready. And the target was to be ready for a Nu 7. And then the conversations, the last ones were okay, Nu 7 activation of Zsa is probably not a consensus, so there needs to be some verification with the community if the community wants to activate a Nu 7 right now. Activate Zsa right now. We didn't react on the forums because we preferred to understand the emerging consensus. What I saw was basically two things. One, there is a sort of, let's say, downgrade of the urgency to activate Zsa soon, so people don't see activation of Zsa in Nu 7  like an immediate target from our perspective, it means that we are kind of prepared for that. We were making sure that this is available to merge in the code, but it doesn't rely on activation immediately. The other consensus that we saw afterwards in the forums is, let's verify what Zsa can bring to the community in a testnet, and make sure that people that want to test the feature can test the feature, but not on Main Zcash, and This seemed to have like across the board consensus. So our takeaway on this angle  of Zsa is,  making sure that we hit save on all of the effort that has been made to have this feature available behind a feature flag. Make sure that this is in the Zcash code base, behind a feature flag so it's not deployed on Mainet, but  take the effort and   make it available for people to test on testnet, which requires much less effort. On our side, we already have a testnet running, and just making sure that this testnet is giving to users the exact functionality that is now the tip  of zebra or the tip of Zcash with the feature flag enabled on testnet and disabled on mainet. On a personal level, I actually went to Santa Barbara. One of the reasons was specifically to make sure  that I talk face to face with the developer community, to understand where the consensus is, and make sure that this message gets through. Let's hit save on the efforts and postpone the big decision, To turn it on on Mainet for when, if and when the community thinks this is a good thing for the ecosystem. Also, I liked looking at the variety like this is unrelated to zsa. I like the variety of other proposals that were accepted and supported. You may know that qedit is also very involved in the tachyon effort, doing the audits of the tachyon code. And we're very, very happy to have more efforts in other places at Zcash that are not dependent on Zsa. So this is from our perspective, roughly, I'm very keen to hear others' interpretation  of how to form a consensus from these votes. Yeah,

Pili: 00:10:54  

please raise your hands, anyone if you'd like to respond. One thing I do want to say is, at the foundation, we definitely don't want to see this effort and investment that has been made into Zsa wasted, and we're very supportive of merging this code behind the feature flag to ensure that it is available, that we can keep it in the code base as other changes are made, and that it doesn't just bit rot and when we are ready to activate it. It wount be a huge task to do it, because we just let it die a slow death on the code base, yeah.

Jon: 00:11:37  

I can, I can send afterwards, a link to the exact piece of the conversation where it seems that this, this consensus crystallized. I'm very, very sensitive to places where Josh and Daira agree  on like a roadmap that talks about Zsa and the highest form of agreement was what I described like, making sure that we can test it on testnet and making sure that the Nu 7, what is activated in Nu 7 is not incompatible with Zsa, but serves the purposes of other features. Primarily.

Pili: 00:12:39  

Question that I had, Jon, you mentioned you have your own testnet that is running with Zsa's. Is your expectation that people will use your testnet? Or would it be that we activated on the actual official testnet? I see Mark is suggesting feature testnets

Jon: 00:13:02  

I think it might, it will probably be a feature testnet, and like a testnet that is exactly the same as the main testnet, with the sole difference of turning on the feature flag, it's what would be necessary for outside participants to realize how to use it, and what are the interfaces, etc, and we don't want to introduce any interactions with the main testnet for, for, you know, before there's a decision to actually go and launch it live at some date, if at all. So the, the short version is what probably the team that works at qedit on the on Zsa will be now reduced to just making sure that this testnet is available and we're now doing more things that are unrelated.

Jason: 00:14:08  
 
Do we have a sense of what the earliest Nu 7 can activate is ?

Pacu: 00:14:23  

Yes, what I shared a few weeks or months ago was that, given the cadence of the Zcashd end of life cycle, which is like this new release that comes every 16 weeks. We have originally envisioned that a good window for deprecating Zcashd could be like September 2, depending on when the feature completeness is reached.  There are some things that need to happen, obviously, that we need to assess that every single feature that is covered by zcashd currently is now supported on the z3 stack. And then there has to be a period of time where both like z3 and zcashd are ready as a single validator or node coexist altogether, and we can monitor the situation, but the earliest could be September the second. But obviously time has passed, and we need to reassess, based on the new facts and well, I guess the output of this call is going to be very important to actually get these timelines reviewed and figure out our next steps.

Pili: 00:16:07  

So as I understand the zcashd deprecation window is tied to the second Zcashd end of life cycle, which will be around September 2026, but that's not exactly the Nu 7 activation. How much time would we want to leave between Zcashd being deprecated and nu 7 activating? It's kind of a slightly  related, slightly separate.

Pacu: 00:16:43  

Yeah, that's completely right. Thank you for pointing that out. Yes, so that's like, my answer to Jason, like, what's the earliest? But I think there is a period of time that we really need to consider, which is, since Zcashd deprecation, like, once we shut it down,  it's hard to get it back up, so we got to make sure that we make it right the first time. It's kind of a one shot situation. So yes, we haven't discussed that. I think we started talking about that, and the last week on getting a document, maybe under the Zcashd book, that starts discussing this sequence of events that lead to zcashd  being turned off, and then declaring, like that we are ready to do a network upgrade that it's only on The z3 stack and doesn't involve Zcashd at all

Pili: 00:17:52  

Okay, any other questions, comments, thoughts on the Nu 7 results or a potential Nu 7 activation timeline. I think it definitely depends on what we decide wants to be activated for Nu 7 and how long that will take to be ready. Essentially, I think we need to decide what's going to go into a Nu 7 basically, you know, that's a decision that we take looking at the polls and in consultation with Zip editors, who will propose what will form the Nu 7 activation, Nu 7 feature set, whatever we want to call it. So the question is, I guess, how do we decide? How do we make this decision as to what we're actually going to implement based on the sentiment polling and based on, you know, what we think is doable for a reasonable timeline.

Kris: 00:19:27  

So I think the process that we're going through right now is essentially, you know, in the zip editor group and  with consultation with you know, I think all of the major development entities in the ecosystem, is to fit together an Nu 7  proposal that is, in some sense, minimal, but also doesn't leave anything out, and leaves room for sort of rapid iteration and extension, so  that's in progress right now, and we're figuring out and I expect that what we'll have is, You know, a lot of the folks involved are on this call, but we're going to come together with a proposal, and  that sort of explains the rationale behind why the things that we've chosen here to go together fit together For this network upgrade. And then present that to the wider community to say, you know, yay or nay. Does this work or do we need to go back to the drawing board again?

Pili: 00:20:51  

Do we have, I know we don't like to talk about timelines, but do we have any timeline for when this proposal is going to be put to the community?

Kris: 00:20:58  

So, I mean, work on that is really active. I know that Sean would like to get a proposal out in the next week or so. We'll just, we'll see what we can do.

Pili: 00:21:11  

That helps. Thanks Kris. Any other thoughts, comments, questions, anyone unhappy if we move on? I'll take that as a no, let's move on. Then core stack updates from the Zcash foundation on zebra Marek. Take it away. Yeah.

## Zebra Update 

Marek: 00:21:59  

The zebra people spent a lot of their time digging in other repos, but in terms of what got merged is that we removed the Python Q and A framework, we aligned mempool transaction filters with Zcash D, which was an external contribution. We fixed a bug that was affecting the verification of transactions that would try to spend inputs from both the chain and the mempool and another bug that was affecting the peer connection metrics, and we simplified the implementation of the Read state service, and that's all that was on my list.

Pili: 00:22:56  

Great. Thank you. Marek, any questions for Marek, okay, let's move on Zodl Zcashd, the core libraries and zallet, any updates today?

## ZODL Update

Kris: 00:23:24  

We're progressing on Zallet on two fronts there, one is getting Z shield Coinbase implemented through the back end stack. There have been problems in the backend stack in the past where we weren't treating Coinbase maturity properly. So I had to do that. We're also working on integration of p2sH support, for importing Zcash D wallets. ZcashD wallets currently have ptsh key components. So in order to make those keys still usable, we have to have ptsh support. And then the major other thing is Strad took the work that ZF had done on integration testing, factored that out of the zebra repository, I think, with some help from Alfredo And and we now have Zcash integration tests repository that pulls in current zebra, zaino and Zallet and builds an integrated testing stack and then runs the historic Zcash D RPC tests against that stack. So we're now just about in a place where we can start fixing, you know, we can start taking off the cases that the ZcashD RPC tests exercise. so there's a little bit more work to be done to hook that up to the actual CI of potentially zebra and Zaino. I just got a message this morning that Zaino folks are working to do that hook up but, yeah, we're, we're now to a place where we can start really checking whether the functionality that we've implemented in zallet, where the gaps are, and either modifying the integration tests to say, Okay, this is how we want this kind of operation to be done in the future, or adding support in to zallet, so all in service of getting off of Zcash D here, and that's that's our primary focus.

Pili: 00:26:13  

Great. Thank you, kris. Any questions for kris?

Hazel: 00:26:21  

I have a question about the zallet tests. I was taking a look at the chain index, migration, draft PR 336, and I've noticed that when I ran the tests, all the tests passed despite me expecting to hit some of the to do's in there, and I'm wondering, should I be running like oat of crate tests to try to hit that?

Kris: 00:26:56  

So I think that what you're seeing is essentially that, the way that PR is currently structured, the the things that don't work aren't currently tested. So, yea I don't know the exact state of of that PR, but there are definitely going to be pieces that are not quite all aligned yet, and we should add failing tests, or at least, you know, pending tests, for some of that other functionality, but I don't think that's been done yet.

Hazel: 00:27:44  

All right, thank you.

Pili: 00:27:48  

Any more questions? Okay, let's move on to Zingo labs with zaino, hazel is that you today?

## core stack updates, zingo labs zaino

Hazel: 00:28:03  

I think so. So we have been working on getting a zaino release out for what feels like forever now, and we are on to our fourth and hopefully final release candidate. I don't think any more code actually needs to go into the release. I think this, we have a release ready commit, and it's just a matter of actually doing the release process. It should be usable for anyone who wants to test it already, with the exception of for the Zallet folks, the sub tree roots API is still in a draft PR on top of it, it's not going to make this release because it is untested. We're going to have to put subtree roots into a follow up, minor release shortly down the line.

Kris: 00:29:17  

I think that's fine. We can depend upon patch versions when we need to. if that PR is at a point where you think that we can try it out, then we'll just depend upon that patch version.

Hazel: 00:29:34  

I think that PR is on a point where you can try it out. It's mostly just passing through data from the backing validator. So there's not much surface area for anything to go wrong in it. It's just untested.

Kris: 00:29:57  

Yep, that sounds fine. 

Hazel: 00:29:58  

All right, yeah, I'll drop a link to that 

Pili: 00:30:12  

Okay, thank you, Hazel. Any more questions for Hazel? 

Okay, guess not. Let's move on to Zcashd,  deprecation update. Pacu, anything else to add?

## Zcash deprecation updates Zodl,Zf, zingo labs pacu

Pacu: 00:30:30  

Yeah, not much. This is kind of like a hands on quiet period for me, which I don't have much outreach to do until we really cut a new  alpha of zallet and the whole z3 stack. But yeah, I'm currently grooming the contributors board for Zallet, because we fortunately got a lot of community contributions on that front and we kind of like run out of issues that we had listed that were open for contribution. So we're really thankful for those, and we'd like you to keep them coming. So I'm trying to do my homework  and get those issues filtered and prioritized for the community so they can actually continue to bring those contributions that's pretty much on that side. And then I'm trying to help out with Zaino development as well

[link](https://github.com/orgs/zcash/projects/18/views/1)

Pili: 00:31:38  

Great. Thank you. Pacu, any other comments from anyone else working on zcashd, deprecation, or any questions for Pacu? 

i guess not. Let's move on to research and implementation updates, starting with qedit. Who's talking about that today?

## Research and implementation updates Qedit- zcash shielded assets

Vivek: 00:32:12  

That's me today. Hi. Do you mind if I share my screen?

Pili: 00;32:17  

No one second I'll stop sharing myself. And then you can take over. I think, yeah.

Vivek: 00:32:29  

So, yeah, hi everyone. So we've been working on a few things for like over the past month. So yeah, like, let's go in order of, like from the bottom to the top of the stack. So starting with the zips, the zips have been like, largely stable over the past month. We did a few minor changes that got merged in already. One was the flagsorchard specification. We noticed that one of the things that  we added, the Enable Zsa flag that had got removed at some point during a merge, and so we added that back in so that the space where enable zsas is in the specification is not missing. The other bit is that the zip editors pointed out that, like it's better to not have the value burn field in the burning of assets to be a U 64, so that can prevent overflows. So we also made that change, and we limited it to the U 63 yeah. The main bulk of the work that has been going on for the last few months has been orchard, strad has been reviewing our PR to upstream, which is PR 471, we had responded to strads comments last month, and Strad did another pass with some more comments. So I said we were responding to those comments, but I think that internally, we sort of finished responding to them, and we're just, like, going through it internally before we complete that again. And hopefully the ball should be back in strad court. That's the work on orchard. The other bit where there's been a bunch of progress has been the test vectors. So we've had the PR 108, open for a while that's been like the orchard Zsa changes that had originally included formatting changes as part of with a single PR, but based on strads review, we split that out into two separate PRs with the two main formatting changes that we are doing that's PR like 112, and PR 114, so those have been approved by Alfredo, and we are waiting to hear back from strad or someone  about whether that's good to go. And yeah, and the PR 108 is independent of these formatting tenders. So again, that's also open for review. I think strad should be able to do that whenever he is available. On the librustzcash front, we Yeah, we've been doing changes like as we've done, orchard zsa changes based on the review, we have been making changes in librustzcash so that the corresponding things are brought forward into Librustzcash. We had made the test vector changes like catching up to upstream, which I mentioned in the previous slide. So we've updated those test vectors in librustzcash, and that basically includes the zip, 233 Amount field into the LibrustZcash test vectors, and now we run it with the feature flag for ZIP 233 switch on. The other thing that we were doing recently was just reducing the diff that we have with upstream, like spotting places where changes that we've made are not super, like can can be removed, and getting it back to how it is upstream. On the zebra front, we've had some good progress. one is obviously the changes, again based on the changes that happened in the orchard crate. We've also made some good progress with the state management, the management of the like we need to store the issue, like the assets that are being issued in an additional map, and we've made, I think we're pretty close to being done with the state management work completely. And yeah, the other thing that's going on in parallel is just syncing with more recent versions of Zebra upstream. And the last bit is our transaction tool to generate transactions. We've been improving the way this works a bit, so we recently added some blockchain caching. So the idea is to, like, avoid having to like, this is related to our testnet that's being up and running. So we want to avoid having, like, the entire history to be resynced every time we shut down the node. So discussion will help with that. And I think this is how it's done with client like blockchain clients usually. So we are more in line with that. And aside from that, we just added some additional test scenarios and things like that, so that you can try out different things directly on the transaction tool. But of course, you can always build your own tools in the same form as well. Yeah, our testnet has been up. I think Pablo had given a demo of that a few months back, and that remains the same. It's up and running as usual, yeah, so that's, that's the update that I had.

Pili: 00:37:43  

Thanks. Okay, thank you, Vivek. Let me share my screen again.

Okay, any questions for Vivek? Okay, let's move on. Shielded labs, network sustainability mechanism

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Jason: 00:38:19  

For the NSM, we have one update on the engineering side. We split the original PR that combines zip 234 and 235 into two separate PRs for each zip, and this gives us more flexibility on how the NSM gets implemented. It sort of allows us to move forward with zip 233 and 235 which enable zEC to be removed from circulation and on issue 60% of transaction fees while potentially deferring zip 234 while discussions continue with the community and coin holders Around issuance smoothing and an appropriate disbursement mechanism. This is sort of consistent with how we interpret the polling results. The burning transaction fees received broad support from coin holders and the community panels and the disbursement mechanism that requires smoothing the issuance curve, received strong support from community panels, but not from coin holders.

Pili: 00:39:22  

Okay, great. Thank you, Jason. Any questions for Jason?   let's move on shielded labs and Zodl cross link

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Mark: 00:39:49  

So we are going to finish our prototype phase at the end of this month, and soon after launch our first seasonal incentivized testnet to start testing our prototype and build towards production, top to bottom with the community and the incentives on the testnet are based on things that you do to help Zcash mainet, like running a DNS seeder, for example, or something like that. It should be, it should be pretty fun, pretty low stakes. And that will continue through q2 and onward. We're working on a formal roadmap that we will publish on our site, so look forward to that coming out soon. With regards to testnets, we developed something we're calling deploy link internally, which allows us to take our monolith repo with Zebra and Zaino and Librustzcash and all the excellent things that we sort of cobbled together into a monolith with Git sub trees, and it allows you to take the sort of root hash of the commit of That monolith and then deploy a testnet with that tooling. So I have two calls for sort of collaboration or interest in that. One is, if other people are interested in taking a look at this tool we can arrange a demo, right now the tool is in the internally useful state you know, it's, it's internally useful to us because it requires this sort of monolith code setup. But I think, you know, for the ZSA conversation we were just having in other teams to do feature testing, maybe this tool could be made useful at a later time for other people. So there's that. And another interesting research spike that's happening among shielded labs engineers is we're working with the Zcash Foundation, Nym and  some light work with the tachyon team to create a networking stack. It necessitated by cross links need for much faster block sync so that the two systems can sort of stay up to date with each other. And so we started sort of doing that in part of our tenderlink implementation, where we're implementing the tenderlink protocol. That's a sort of built for purpose tender link for us. It this networking stack spun out of that. So there uses the noise protocol. It uses UDP. It's sort of quick, like but not quick, and we were just collaborating with the Nym team to make it compatible with the Udp tunneling.like Bleeding Edge version of their mix net does. So that's a cool thing that's, you know, somewhat spun out of the crosslink work. Is this networking stack work too, and that is all

Pili: 00:43:18  

okay. Thank you, Mark. Any questions for Mark? All right, let's move on to dynamic fees.

## Research & Implementation Updates Shielded labs- Dynamic fee

Mark: 00:43:37  

I guess that would also be me. But this is short and easy. I haven't had a substantial update since last time we covered this. I still am just reviewing the zip, and still, you know, talking internally about the design and things like that, so not much here.

Pili: 00:43:57  

Sounds good. Thank you. As usual, questions, comments, Nope, okay, let's go on open announcements. Anything else that anyone wants to discuss or announce, please raise your hand. No.

## open Announcement 

Pili: 00:44:23  

Ah, go ahead, Hazel,

Hazel: 00:44:27  

I had something I meant to bring up during the zebra section. We've hit a bug in Zaino that I'm not completely sure yet, is a zebra bug and not a Zaino handling it wrong bug. But we're having an issue where when we check the RPC endpoint with get blockchain info, it gives us a chain tip that seems to be the top of the non finalized state. And then when we check the read state service, it seems to be giving us the top of the finalized state, so 99 blocks behind, I will drop an issue link in the chat here, and I would appreciate a look at this at some point.

Pili: 00:45:33  

Okay, thanks, Hazel. Does anyone want to respond off the top of their heads, or will we just take that offline and look into that?

Marek: 00:45:43  

Yeah, let's take that offline. I haven't seen this yet.

Pili: 00:45:55  

Cool. Thank you, Marek. Mark, are you okay with that?

Hazel: 00:46:01  

yeah, I just wanted that to bring it up now instead of asynchronously,

Pili: 00:46:08  

sounds good. Thank you, Mark. You're up next, I guess. Yeah.

Mark: 00:46:14  

I just wanted to toss a fun idea out there in terms of feature testing and testnets and staging networks and stuff like that. There's been some buzz between me and a few other people about maybe making a sort of a Kusama for Zcash, which, if you don't know the analogy, polkadot has this Canary network called Kusama where they test all their new features out, but the twist is that is has real economic value. So KSM is a token that's traded on exchanges and things like that. I just wanted to get a call out. Reach out to me asynchronously after this. You don't have to, like, raise your hand or shout anything out right now, but if you would be interested in joining a very informal, very light touch, very not time consuming sort of working group to discuss this idea, reach out and let me know.

Pili: 00:47:15  

Okay, thanks, Mark. Interesting. Any other announcements, discussion items, i never know how much time is enough time to give people to respond. I feel like I tend to rush people through. So let me give a bit more time. But this is, this is kind of like the last chance to speak. Now.

All right, yeah, let's, let's leave things there. open discussion, I guess that was covered in the last one, So thanks, everyone.

Next Meeting Scheduled: 19th March 2026, 21:00 UTC
