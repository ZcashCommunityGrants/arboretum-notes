## Arborist Call #113 Notes 

Meeting Date/Time: Oct 30 th 2025. 21:00  UTC

Meeting Duration: 60 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [Prs, Zebra state service](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [ZcashD](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Zsa, Qedit](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets)/ [Nsm, Zip 233](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-shielded-labs--nsm) / [Crosslink, trailing finality layer](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labsecc-crosslink-trailing-finality-layer)

Open Discussion [quantum recoverability draft](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=8c_6UiciAuU)

Moderator: DAN

Notes: CHIDI @ZcashNigeria

Full Notes

## Welcome & Meeting Intro 

Dan: 00:04:24  

Okay, hello everybody, and thank you for joining today's arborist call on October 30, today's agenda. We have core stack updates from the Zcash Foundation, the electric Coin Company, Zingo labs and Zcash D deprecation. We'll have research and implementation updates, I don't think we have qedit at the later call time, and then we'll have shielded labs to touch on network sustainability mechanism and cross link and then, oh, sorry, and then an open announcements and discussion section at the end. What are arborist calls? Arborist calls are bi weekly calls where Zcash protocol contributors convene to discuss upgraded timelines and process protocol R and D efforts, design and implementation of new protocol features and to identify blockers and unresolved issues. The purpose of these calls are to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Anyone interested in learning about the Zcash protocol development can register at Zcash arborist.org and if you'd like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot. Other ways you can get involved in the ecosystem are to check out Zcash community grants at Zcashcommunitygrants.org, jump in the Zcash R and D discord, or take a look at the Zcash community forum. And you can find all these links by pointing your browser at Zcash arborist.org and we'll get started with the first core stack update from the Zcash Foundation.

## Zebra Update 

Arya: 00:06:06  

Thank you, Dan. So since the last arborist call, in zebra, we have tagged and published release candidates for deploying nu 6.1 it also deploys the fix for the performance regression in zebras initial sync so it now syncs in about eight hours rather than 24 we fixed some build issues that were on Main and added the assembly code to script outputs in the get raw transaction and get block RPCs. We also merged a couple PRs related to refactoring the state service traits and other service traits, and we're currently working in PRs on improving the error types. Lately, we've also merged some PR is related to improving error types in zebra state service. We're currently working on fixing the error types for commit, checkpoint verified and commit semantically verified requests, if anyone's familiar with those, and I think that's mostly it. We also are. There's a PR open for using rocks DB from the system rather than always building it when compiling zebra, which should speed up build times

Dan: 00:07:20  

Great. Thank you, Aria. Any questions for ARIA? Okay, we will jump forward to ECC updates. I think we have str4d in here.

## ECC Update

Str4d: 00:07:35  

So as people may be aware, there has been price action in the Zcash ecosystem. With price action comes users, and with users comes bugs. So we have been spending a fair bit of time the last couple of weeks on bugs reported, addressing the underlying causes of bugs. Obviously, the bugs are coming in through zashi users, but a fair few of them result in changes need to happen to Zcash client, the other core, rust crates under the hood. Yeah, so all bug reports are good, and resolving them is good for the entire stack. But oh, boy, this has been a fertile time for discovering things. So yeah, more specifically, there's been various bug fixes around mempool detection, which was  landed in Zashi at the end of September October, around then, and that's throwing up a bunch of things that we've discovered about how the back end rust crates were doing state management in the in that case, because prior to that, it was only ever detecting via blockchain scanning. So there's been various fixes we've made from that perspective. There's also been fixes related to confirmation changes and the confirmation reduction handling that we had, that we had deployed at the end September, beginning of October. So beginning of October, and there's also been a little bit more progress getting through, so the send Max functionality on the is, I think, through to the SDK layer on the Swift side, I don't recall about the Android side yet, but this is, this is just additional functionality for being able to like sweep a wallet, or be able to spend everything that is currently available, which relies on a bunch of like data that the backend has. We've also merged support for what we're terming in the in the SDK layer. What are the single one time address? I forget the exact term point. Basically, it's powered by ephemeral addresses, ephemeral, transparent addresses. And the intended use case there is for things where you are not giving out an address to to a user directly, but you're using it in some other thing, like, like in swap. So for refund addresses within those they're the same addresses that are currently being used as the as the intermediate address in a zip 233 text dress transaction if you do, if you do one of those in zashi. So there's been a bunch of additional logic that has to happen there to make that all work. And we're in the bug fixing stage for the Finding and fixing for that at the moment, but hopefully that will be out in the not too distant future, in the in the SDKs, there's been some work on Zallet in the last week, looking to get the second alpha release out in the next day or so, which will include A bunch of those bug fixes as well as some initial like user feedback reports and and sort of preparing the state the base further for additional additional improvements and API implementations and things also very, very fun. The next release will have reproducible builds thanks to Anton from stage X, who has been figuring out how to do that over the last month and making various PRs and places to fix build determinism problems here and there. So that mean that from there will probably be some things we have to figure it, you know, figure out and adjust as we go on through the alpha phase. But very likely this means that we'll be in a position where Zallet can offer reproducible builds in the same way that we do for Zcash D releases, so anyone who's relying on that for their wallets will be able to continue with that In Zallet and yeah, there's more work being done in related areas in that but I think that's probably everything that covers under this particular update stack. We can talk about other bits later. Great.

Dan: 00:11:52  

Thank you. Strad. Any questions or comments? All right? Next up zingolabs, and I think that's it

## zingolabs updates - zaino

Za: 00:12:06  

we are cracking along at, upgrading to supporting zallet with the chain index interface. In the course of doing that, we have realized that we need to migrate a bunch of the existing code to a more trait based generic pattern to eliminate a bunch of non valid code, a bunch of repetitiveness. So we also are upgrading our test infrastructure so that we can have a validation to that we are properly handling chain forks in the chain index before we merge that code and want and we need to upgrade to zebra  3.0, to use some of their new offerings from their service traits. In order to finish that, we have made significant progress on the chain index integration, so I think you can look forward to that landing, certainly before the next arborist call, probably early next week, top priority after those things land are adding transparent data to complex block, compact blocks, to reduce leakage of Which transparent transactions are of interest to zaino D and there's always one other thing that I'm forgetting that I will remember shortly.

oh, the blockchain, or sorry, the block, block explorer, RPCs, we anticipate adding those finished up. We have four in review, and all except one of them probably will land this week, and thats it from us

Dan: 00:14:18  

Okay, thank you. Za, any questions. Check chat, okay, and we'll jump forward again.

Str4d: 00:14:29  

I just remembered one other thing I wanted to mention on the core team side that Chris has been working on, who couldn't be here this meeting, account deletion in the wallet backend. So the what that functionally means for users is, if you want to, if you want to be able to unregister a keystone device, currently, you have to reset your zashi from scratch, because we, we don't have the ability to remove an account that's Chris been working on that this week. So with any luck, that will be in the next set of rust crates, and then that will enable, in future weeks, to be able to add that functionality into zashi.

Dan: 00:15:13  

Awesome ,thank you. Strad, next up, Zcash. D deprecation. This is pacu. Hello.

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:15:20  

Hello, everyone. Well, a lot was already covered. So in terms of Zcash D deprecation, we are at the point of start looking at deprecating  lightwalletD as well. Although light walletD is  getting one of its last features, I hope, which is the transparent data addition to the compact log processor, to improve how how transparent transactions are, or how well it's asked for transparent stuff in the more or in a less identifiable way, or that in a way that the server learns As at least as possible from those calls, and that's going to be built into Zaino as well. And we're working towards code completion of lightwallet D features on Zaino as well, so we can deprecate light walletD when its time  comes sorry. Then  we have almost completed RPCs for block explorer support in Zaino. So we are in a good shape. There are one or 2  I think are still in the queue. But they are not show stoppers in terms of starting to integrate night Hawk block explorer with Zebra and in Zaino and then, with all these good news there is  some sour kind of news that is kind of what strad talked about a little bit ago. We have been really happy to receive all this love from users and price action, and all the attention is and all the celebration that it comes with but it also comes with a lot of things that Ecc folks had to attend, and also the rest of the teams, and we have been impacted a little bit in terms of Our timeline for Zcash d deprecation, not for like highly like, we're not like, sleeping end of year for too much. But I don't think we can call it like ZcashD retirement phase until, like, the first months of 2026, given how we had to handle all of other stuff and Zcashd deprecation work had to be slightly deprioritized to attend, like urgent production things. So that's kind of the sour note that comes with every joy in life, to put it in a way, but we're still managing this and trying to move things around how we're currently working, to reduce this impact on the teams, and try to keep collaborating and and keep progressing. So yeah, that's, that's the sour note of the day. Sorry, but we're still progressing. We are currently looking towards building a board for things that are good to go and open to collaboration. So anyone who wants to take on, for example, RPC development on zallet  we are starting to put ready items in the board that you can find on zallets repo, and in that way, like different team members from the teams that conform the z3 effort or start, I will start to pick those up as well, so we can catch up to this timeline impact we have with the latest, awesome developer developments that we have on the Zcash community. So that's the news.

Dan: 00:20:05  

Thanks. Pacu,  daira

Daira: 00:20:09  

yeah, I just wanted to talk briefly about the transparent information in blocks. It's a privacy improvement, and it's also a huge sort of simplification because at the moment, so actually, for example, it is incurring a lot of complexity in trying to preserve privacy without having the transparency information in blocks. And so a lot of that complexity after we can rely on connecting to a light wallet server that supports this can potentially go away, and also we'll get better privacy, because there are some things that we just can't paper over. So

Pacu: 00:21:00  

yeah, thank you daira Emma, yeah, and you remembered me something that is that we will originally the compact block model, or how zip 207, which is the like client protocol stipulated it like everything started in sapling activation and so, so all the assumptions for lightwallet d development, which was, at the time, the only implementation, like everything kind of started like that. There was a like a pseudo Genesis where everything started at the block 419200, and now, with the transparent data addition, we are starting to index all the transparent data from Genesis block, and This will allow people that held like transparent zec from since the beginning of times to be able to import their wallets into modern, shielded wallets, and if they are Light clients, for example, zashi Zingo or  Ywallet, they will use this lightwallet D that will be able to get their information and handle their transparent zec more efficiently and it was a use case that was maybe not well covered in this Current version of the light client protocol, but it will be very good, well covered in this next addition of the transparent data which will help, for example shielded zec support  on ledger. That's going to be a huge use case for this kind of data addition, but it means that lightwallet D, for example, will take a little bit longer to sync, because the cache will have a lot more data to index. So any operators of light wallet D infrastructure should take that into consideration when we deploy this. But ECC always makes awesome change. So if you read, we live in an era where people don't read things, myself included, sometimes so, but if you watching this YouTube video, just your work.

Daira: 00:23:43  

I think I'm reading more now than at any time in my life.

Dan: 00:23:55  

Okay, any other comments or questions on ZcashD deprecation? Nope. Okay, cool. Thank you all. And next up, we don't have anybody from Qedit here, but I guess I'll throw it out. Would anybody like to bring anything up on ZSAs?

## Research and implementation updates- Qedit Zcash Shielded Assets

Daira: 00:24:14  
 
ZSAs are awesome, and I can't wait for them to be activated.

Nate: 00:24:28  

Okay, I've been hearing, you know, the scuttle, but in different, like signal groups, some people are interested in potentially trying to find ways to bridge Bitcoin into the Zsas, so I want to get them in touch with qedit. So it's it's the wrong time slot for qedit, but I'm going to reach out to them, and if anyone else was excited by that kind of project, let me know or talk to qedit

Daira: 00:25:02  

yeah, I do know that work is starting on kind of extending pczts to support ZSAs

Alfredo: 00: 25:18  

Yeah, so bbec was in the Zcash D deprecation meeting today, and we briefly talked about ZSA, and I saw the review in the orchard ZSa has been postponed by the ECC for the last bug fixings that they were working on. And as far as I know they're going to be working on that kind of next week or so. So yeah, they're pretty interested in trying to get that in  since  it's the base of other changes.

Daira: 00:25:59  

I'm certainly hoping to start on it very, very soon

Alfredo: 00:26:11  

Yeah, yeah, so Chris mentioned that you guys were to start soon on that.

Dan: 00:26:20  

Yeah, cool. Thank you. daira, any other thoughts, questions, comments on zsas, okay, we'll jump ahead shielded labs for NSM,

## Research and Implementation Updates Shielded Labs- NSM

Jason: 00:26:36  

Most recent update is that the zip 233 PR has been updated and rebased. It passes all CI checks and tests, and it's just waiting to be merged. 

Daira: 00:26:53  

sorry it was, it was on my plate to review that, and I haven't been able to get around to it, okay before now. Sorry about that. Thank you.

Dan: 00:27:09  

Anything else on NSM questions? All right. Next up, crosslink,

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:27:23  

So the first thing that sort of out there is, it seems like there's an influx of a lot of conversation about Zcash on x and with new like new accounts, or, you know, old accounts who haven't talked about Zcash in the past, very much talking about it. And part of that includes a notable contingent of proof of work, proponents, or also proponents saying, Maybe we should just postpone cross link, because everything seems to be going well. We're aware of that but we still have kind of the same plan, which is to, like, finalize our prototype so it's a full stack working implementation, and then make sure it's well specified. And then after that we intend to do different kinds of assessment of competence in deploying it. And if we see that confidence, then we'll go through a rigorous process of rewriting production code, hardening the design and so forth. So we just wanted to make it clear that that's that sort of process, because some of the comments don't seem to be aware of the timeline or decision process. So we wanted to share that

Daira: 00:29:11  

Do they have concrete arguments against or in favor of proof of work over proof of stake, or is it just vibes?

Nate: 00:29:20  

I haven't noticed any. I have seen some people talking about how it's better for security, but it's Twitter level  superficial. Like, what does that mean? Nothing tangible there. The one that seems more tangible strategy to me is like other things should be prioritized. So one example is fixing the fee system in case there's a big influx, influx of users and blocks start getting full. So just as an aside, not part of cross link, but in shielded labs, we have Mark, who's started focusing on that a lot more. So I kind of agree with that, potentially a more time sensitive thing, potentially. Yeah, so I haven't yet seen strong arguments, but to be fair, our prototype, the documentation, which is my in my ball court, is sparse, aside from the upstream documentation that's well written for the crosslink  construction. And then our prototype is a prototype where we just cut a lot of corners and stuff. So I imagine if the newcomers see that, they might not realize that  more thoughts have gone into it, so that could be part of it anyway, that's that, but we're plowing ahead. So we completed our milestone  4a and as a reminder 4a was basically a redo of milestone 3 but just trying to fix some bugs and make it much more usable. And so it was basically a repeat workshop, but it went way better, like most of the attendees were able to get on the roster, it didn't have a bug that the last workshop had, where every node would crash when syncing like every 30 seconds or whatever, and the so there's no outward facing feature change, but there's a big aside from some visualizer improvements, but there was a big internal change where we pivoted away from Malachite, which was which is a BFT, like a tendermint implementation in rust, and it's a big framework. We pivoted away to our own in house BFT implementation because our engineers thought we could make it tailored to fit, and that would have a lot of advantages. It would end up being a simpler overall system, and they sort of proved that that's a viable approach so far, because our new implementation has been running like the current class, and that's been up for awhile there's no crashes. So that's not to say it's guaranteed to be bug free or secure, but it's a good sign that that strategy is working for our prototype and then upcoming.

Daira: 00:32:28  

Oh, yeah, sorry. I'll let you carry on and raise my hand.

Nate: 00:32:32  

Okay, yeah, I'll bring it up after the rest of the update. So the next update is we're working on the next milestone, which is called 4b and the functional change for that is to switch the 4a workshop has a hacky way to put things on the roster that and right now  4B, what we're working on is putting actual fields into transactions to do delegations, and we're in the midst of doing that with a few, a few expedients, so like so for example, one thing is those we have, the visualizer, can generate the transactions with No fees, and that way we don't need a wallet. But that also means the we're still using fake units, not real test zec for the weight. So the next chunk before the workshop hopefully is to hook up like the full real wallet stack, the Zcash dev tool, and then that will be the first iteration of actual proof of stake, but it still will lack some of the like privacy and safety features we have written up in our recent blog post. But we're excited to that. And the goal for that one is a week after Thanksgiving, American Thanksgiving, which I think means it's like the first week of December, maybe. But I'm bad with dates, and now I think that's it for update.

Daira: 00:32:32  

Two questions, yeah, yeah. So first of all, the new BFT implementation. That's still an implementation of tendermint. Is that right?

Nate: 00:34:27  

I believe so. Yeah, it's still using a stake weighted roster and requiring greater than two thirds weight of votes.

Daira: 00:34:39  

Okay, yeah, there are lots of details about the BFT protocol that, besides that, yeah, I'll have a look. Can you post a link to the implementation on the chat? Yes. The other thing was, why Zcash dev tool rather than go straight to zallet, for example.

Nate: 00;35:05  

Oh, that was our guess as to the easiest code base to just modify to issue the things. But we yeah, we probably could use advice, because we want the quickest path that's also relatively usable for workshop participants. So there's sort of a,

Daira: 00:35:29  

yeah, I'm thinking about that and thinking probably zallet, but yeah, okay, it's not a particularly strong opinion, but yeah, I would think that you're taking a shock up there, because you're not going to want to use Zcash dev tool in the long term, whereas zallets  are perfectly acceptable thing to use in the long term.

Jason: 00:36:02  

The thing I wanted to say is it would be helpful if everybody on this call could review our blog posts that we posted earlier this week on cross link, staking design, and publicly let us know your feedback, regardless of whether you support or oppose it. It'd be great to hear your opinions. And then also to add to what Nate said, some of the talk I've seen on Twitter from people who oppose crosslink, it's been, the reason that I've seen is that it somehow conflicts with this new narrative of Zcash as encrypted Bitcoin since bitcoin is proof of work. And then, like Nate said, we've also heard that it's less of a priority than Tachyon or dynamic fees, which, you know it's important to point out, they can happen in parallel with crossink, they don't actually conflict with it.

Daira: 00:36:58  

Yeah, I was gonna ask,so are you intending to have an external audit of the economics?

Nate: 00:37:08  

Yes, but we were imagining doing those kinds of things after the prototype phase. So the sort of roadmap is to wrap up the prototype phase by mid q1 next year, sort of asses community confidence and assuming there is, we proceed and then the rest of the year is hardening. So at that point, it may be the right timing to have somebody look at the game theoretic economic stuff, but I would want for us to do like a design and implementation pass, probably before paying for like, auditors, for the whole thing. That makes sense, because the prototype code and design is really just sort of like, there's no guarantee it's correct. It's just trying to show it's like a sketch, almost like each functional part. There's some code there that's doing the right thing, so that not the right thing, but something the approximate thing, so that testnet can stand up and people can interact with it, so the user flows should be approximately realistic.

Daira: 00:38:33  

Yeah, I guess what I was concerned about, I think Josh and people in Ecc are slightly concerned that the decisions about the economics aren't solidified too early before they've had a chance to get external review, and I'm glad to see that the cross linked tokenomics post. I think there's two posts that I will look at now

Nate: 00:39:10  

i would say the sort of the lifecycle or timeline is right now the blog post is high level, sort of approximation of the design we're working towards. So it's the perfect time to be getting feedback. Like, you know, issuance should be different, or fee, like, if there are fees or delegation, those things, anything about proof of stake tokens, token distributions, or whatever. Now is the easy time to incorporate feedback and tweak the prototype, although there's always a balancing act between just making the prototype work versus pivoting the design too much like if somebody shows up and saying it should be drastically different, that might slow down our prototyping phase if we wanted to do that so. But anyway we so we get that feedback, decide how to handle it, definitely document or notes all the feedback and then and then, that's going to be before we're going to sort of start looking into things like, I don't know, like micro economics or game theoretic or econo security, whatever design review that will come later, but we want to do both. I'm not sure how clear that is. If you're interested, give us feedback right away.

Daira: 00:40:53  

feel as though  because I've been so busy, I don't feel like so I have good enough grasp with the current design to come out, but I will do

Alfredo: 00:41:12  

I  have a quick question. I'm assuming that all the crosslink projects will need to be specified in the form of zips. So I was wondering if there is a monitor for that, when we will be able to start thinking about that?

Nate: 00:41:31  

Yeah, we want to begin writing like a zip and starting the zip process around the same time that the prototype is, so, probably the beginning of next year, maybe. So, yeah, that's the time. I mean there I think or ideally, we would start earlier to get feedback and zip review earlier, but,

Daira: 00:42:06  

I'd encourage you to start as early as possible, but obviously subject to your bandwidth,

Alfredo: 00:42:13  

yeah, so I think it will bring more confident if we go through the process, find All 

the details and then, yeah, I guess I, as far as I know, you have some code to be merged into zebra, but without being specified, I don't think we can do that.

Nate: 00:42:30  

just to clarify, we maintain a pull request against upstream. But it's not a request to merge at all. It's sort of so we can look and at a glance, figure out, okay, how far are we from Zebra to sort of gauge the complexity.

Daira: 00:42:55  

Zcash has always kind of,there is some feedback between implementations and specifications, but the specification leads most of the time, and I think that has been very important  to maintain specification quality and  to head off potential bugs, because, yeah, we really are specifying all of the detail to implement the protocol. We don't do specification by implementation. Well we do in the Bitcoin inherited parts of the protocol, but that's a bug, right?

Nate: 00:43:46  

Yeah, so this idea of making a prototype is a little bit different from that, but so I guess my request would be for people to give us enough scrutiny of the specification that everyone can gain confidence that it's good, and, don't hesitate to say it's not good enough to us. And we won't. Yeah, we won't take it personally. We'll try to make it better.

Daira: 00:44:25  

If anything, I'm so worried that I might not be as kind of hard on you as I should be, because it's partly my design, but I will try to compensate conflict of interest and be really hard on you.

Dan: 00:44:44  

Thank you. Nate. Any other questions, comments. Looks like nothing in the chat. Okay. Next up, open announcement section. Any open announcements from the panel? Going once and twice? All right, next open discussion. Would anybody like to bring anything up?

## Open Discussion 

Daira: 00:45:22  

Please review the quantum recoverability draft. Yeah, so I've been saying for a long time that I wanted to get that into a draft set. It's now there. It's ready for review. I don't know whether anyone on this call is sort of familiar with the details of analyzing protocols for post quantum security, but if you know people who are or if you are then please, please look at it.

Dan: 00:46:08  

Thank you. Dara, any other topics, questions, thoughts?

Alfredo: 00:46:18  

Alfredo, yeah, I have a question probably for Strad, daira emma maybe as well, because, yeah, so I was struggling with some tests that I was wondering if zallet could have, or there is any plan to have some sort of status report, like an RPC method to say up to what point is sync it up, and if it is ready to receive request right now, you don't have anything apart from the logs to check what height zallet it is. So I was wondering.

Str4d: 00:46:59  

This is the thing where, in Zcash D, we added, like reg test only logic to be like, yeah, this is synced up to this particular, like synchronization number or whatever. Yeah, we just had, like, just an atomic that we incremented carefully to synchronize the bits that could get out of hand. is that sort of the bit that you're running into so what I'm asking is that the problem you're running into.

Alfredo: 00:47:39  

So the problem is that zallet needs at least one block in the state, and sometimes that block is not there, so you don't have a way to figure out if everything was populated or not, especially because there is zaino in the middle as well. So zebra generates a block, but it takes.It takes a little bit for zallet to actually catch up with the sync, and you don't have a way to to know that, besides to know that you are behind.

Daira: 00:48:30  

So we had a mechanism for that Zcash D internal wallet. I forget how it actually worked

Str4d: 00:48:38  

So that's the thing I was referencing, daira Emma. So currently the way that Zcash D does this, because we didn't originally need this, but it was when we decoupled the wallet from the main thread to stop the remote key extraction bug. What we added we then ran into this synchronization problem. So that's where you'll see the sync with wallet and sync with mempools and things calls in the rpc tests. The way that currently is done is that get blockchain info in Zcash D has a reg test only fully notified. Okay, yeah, see what you mean. API, like a field, and I forget exactly I need to go back and look, yeah, so, so that has a,

Alfredo: 00:49:31  

yeah, we decided to not implement in zebra the Z, B

Str4d: 00:49:37  

For zebra d doesn't make sense because, like, the concept of being fully notified only makes sense if you have things to notify which it works in Zcash D, because it's all internal. So what we effectively are after is the equivalence of this? Yeah? So you'll see, yeah, this is the relevant bit in Zcash D that is handling it, let me just paste the link here that's in Zcash D's like sync loop. That's the thing that is going okay with the wallet is synchronized up to this particular point, you know, this particular sequence number. We just hooked it into existing methods that were already being called in Zcash D to make it simpler, but for here, I think it would probably make more sense to have a dedicated RPC that is used for this purpose. Obviously, if you're working in like testnet and demand things, you need to be able to tolerate asynchronicity, so we just have to deal with that. But for Reg test specifically, to make the tests more reliable, yeah, we should have something of the same ilk that you can then take the state you expect from Zebra, take some state you expect from from Zallet and just like keep polling, either keep polling or maybe do a long poll, maybe until, until the Zallet status matches what you're waiting on.

Daira: 00:51:11  

So there are basically two ways to do this. There's to use sequence numbers, like zcash D does, or there's a barrier approach. So if you think about memory coherence in multiprocessor systems, they usually have a barrier instruction that says all of the operations that were initiated before the barrier, all of their effects should have happened by the time you get past the barrier, and that's usually easier to program with. I think so. I don't know whether the sequence number thing allows more pipelining, but at the cost of complexity?

Str4d: 00:52:03  

The problem with the sequence number issue here is that we can't actually generate those easily. That worked, yeah, two threads effectively within the same process, and so  we had to be very careful in updating those to not reintroduce the cross thread blocking side channel that was being used for that exploit. Here. We don't really have that. So this would just have to be something that says, okay, you know, as of the time you call either something zallet is is synchronized up to this particular chain tip, or this particular view of the chain, or something where you can say, let me know  once you are viewing this particular view of the chain, then there's secondarily, the question of how much of that view of the chain Have you scanned? And that's a different question, which I think also is relevant here, which gets into like at the moment, yeah, this is the like sync percentages and things that ideally, we don't need async percentage logic here because, normally, because it's meant to be a steady state, keeping up however, there will be cases like when you import a new key, new key, and you have to go back and re scan all the blocks to find stuff there that's going to need to be handled in some way. Yeah,let's talk offline further about this and figure out what the right. Usable thing here 

Arya: 00:53:48  

There's a ping RPC method in Zcash D that, when called, sends a ping message to all of Zcash D's peers. And then, if you call the get peer info method right after that method then returns information about the latency that the measured latency of all Zcash D peers. I wonder if that's because Zcash D doesn't have like a heartbeat task, or if it's okay for zebra to omit that RPC method and just always measure the latency on ping requests, so that when you call get peer info, it returns like the last heartbeat intervals ping, rather than sending out a message to all requests when the RPC is called or, yeah, what does it zcash d Do there? Does it have the heartbeat task

Str4d: 00;54:46  

The Ping logical comes from Bitcoin, yes, but all of these, most of the questions you're asking, the answer is, why does zcash have it? Because Bitcoin had it, so you'd need to look at the motivations that they had there. There is like, logic within, like peer management that is keeping track of things. But I doubt it's doing any sort of, like measuring latencies and things like that, ping times or whatever, because it probably was like, This was probably just something that was added for debugging purposes. In fact, I can find it. So yeah, 12 years ago, the PR, 2937 upstream, Heng and Pong were added and at the end, the only purpose of that, when those were added, was also when the ping time and ping weight fields were added to get peer info. So those fields were not present prior to PING and PONG being used. So I would, I would argue that the ping time and ping weight fields should probably not be filled if you're not implementing support for pinging.

Daira: 00:56:04  

so there have also been kind of side channel attacks based on ping, and they weren't only dependent on ping. There were other ways to get similar side channel information. But honestly, methods like that make a side channel attacker's life easier. So, yeah, I'm fully into part of not implementing,

Arya: 00:56:35  

okay, so we may not need them, and if we add them, it could actually introduce a security vulnerability. So we probably don't want to add them.

Str4d: 00:56:45  

The question here is about whether you have the specific question is whether you have handling of the Pong message generating pings is just like, that's a you're already assuming that your local RPC is trusted to some degree, although maybe that trust assumption is a bit less than zebra because you don't have a wallet. But the main question from a security perspective, is the fact that is, is the existence of handling pings and responding to pongs at the network layer

Alfredo: 00:57:25  

Yeah, so getting back to the other issue about the sync, I think that  for the specific case of this test, some RPC method that returns what zallet, best chain, and where is this in this in the scanning process should be enough, because you can pull on that the primary right now is that you don't have anything to pull on with unless you go after the logs. But, yeah, that's hard. And for sure, if we could introduce an RPC method to do that. Yeah, there should

Str4d: 00:58:05  

There should definitely be that, that let you know, in the same vein as get blockchain info, but not get blockchain info, but a similar one that is like, it's not, it's also not get wallet info, because, again, the get wallet info from Zcash, therefore, from Bitcoin was existed in the context of the wallet is on the same node as as the same process as the node. So you can just call get blockchain info, to get the state. So this would be some sort of separate rpc, different from any existing one, so we can shape exactly as we want


Daira: 00:58:39  

And this would be breakfast only with it, because, again, I'm a little bit concerned about

Str4d: 00:58:45  

it may be beneficial to allow, have some sort of, essentially a health API, or some sort of, like, what state is the node currently healthy? And healthy to me, would mean it's, it's fully synchronized. It's keeping up with the chain tip. Like, we're not under we're not experiencing network load. Like, you know, if sandblasting were to happen again for whatever reason and we were not able to keep up on this particular machine, like, if there's too few CPU cores or memory, whatever, if we're not able to keep up with the rate of block scanning, and we start to get lag behind the chain tip that would be like a sign of poor health or network weather. So that kind of API is, I think, what I'm thinking about. And then within that, there might be Reg test specific, so reg test only fields that allow for, like, much closer synchronization, potentially for testing purposes. But I can see the benefit of a more general network, network state nodes, like, yeah, wallet status, but like wallet Sync Status or something, yeah.

Alfredo: 00:59:48  

So zebra added some health checks, RPC method just for that. So when it's ready, it returns that and yeah, I guess, is useful for the mainnet directories can just point on that, and if it is behind, can keep doing until it gets in a position, which is fine

Str4d:1:00:13  

We control the network there, so we know that the chain won't advance while we're waiting for the world to catch up. So that would be fine,

Alfredo:1:00:22  

Maybe we can end up opening an issue inside it to plan out what we're actually going to post on that

Dan: 1:00:38  

Thank you guys. Any other topics for open discussion? daira emma your hands still up, maybe by accident. Yep, cool. Thank you. Um, let me just check the chat. Okay, last call for open discussion topics. Okay? Thank you all for joining the next arborist call will be on November 13 at the 1500 UTC time slot. Thanks, everybody. Bye, thanks. Thanks. Bye, everyone

Next Meeting Scheduled: 13 th Nov 2025, 15:00 UTC

