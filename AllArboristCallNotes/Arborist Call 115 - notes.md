## Arborist Call 115 Notes

Meeting Date/Time: Dec 11th, 2025 15:00 UTC

Meeting Duration: 1 hr, 30 minutes 

Agenda:

Welcome and [Meeting Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

ECC Core [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update) 

Research & Implementation Updates -[zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino) / [zcashD Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-ecczfzingo-labs--pacu) / [ZSA](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets) / [NSM](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-shielded-labs--nsm)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=tT9H-XQuvfM)

Moderator:Natalie

Notes:chidi, @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

This is the Arborist Call for December  11th. Welcome, everyone. Here is the agenda for today: Updates from the core teams, starting with the Zcash Foundation on Zebra.

Then the Electric Coin Company on zcashd and the core libraries, Then Zingo Labs with Zaino and finally, Zcash deprecation updates after that we will have research and implementation updates,QEDIT on ZSAs, Shielded Labs on the Network Sustainability Mechanism, Shielded Labs and the Electric Coin Company on Crosslink

After those sections, we will have time for announcements or any additional discussion items. Arborist Calls are biweekly meetings where Zcash protocol contributors discuss upgrade timelines, ongoing protocol R&D, and the implementation of new features. We also work to identify blockers and unresolved issues. The goal is to make Zcash development transparent and accessible to the wider community, and to encourage participation. Anyone can join.If you are interested, you can register at zcasharborist.org to receive the meeting details.

lots of different ways you can connect with people. Okay, let's get started. So core stack updates, I believe Marek is talking about zebra from the foundation.

## Zebra Update 

Marek: 00:00:16  

Yeah, let's see, since the last arborist, we released zebra 3.1.0 and the notable changes there are the fixed arm 64 Docker images, then the so called dust filter for transactions in the mempool and configurable size of RPC responses. And after that, we merged preliminary support for the Bing RPC, and we are significantly extending our Grafana metrics.

And last thing is that we're adding support for checking and generating blocks with pre canopy subsidies, which will unlock higher parity with Zcash D on rectest, among other things. And that's all 

Natalie: 00:01:24  

Thank you, Marek. Are there any questions from anyone so next we have ECC, who's going to talk for them

## ECC Update 

Str4d: 00:01:38  

I can, so for the last couple of weeks, we have been pushing through on being able to cycle more zallet updates out. So we're working through. At the moment, I'm reviewing the SLSA related stuff for the stack on top of the reproducible builds for assurance in the binaries. Once that's through, then Zallet Alpha 3 will be out, so hopefully that'll be the next day or so, also got through review and are in the process of reviewing. I believe the implementation changes, for the updates for lightwalletD  protocol specifically adding transparent the optionally being able to add transparent data to compact blocks. The goal of that then being to allow for better privacy when scanning transparent to ensure we don't miss anything, and also enable transparent reverse rotation in various places, we have been making progress on changes in the core libraries enabling rewinding of accounts, or, sorry, disconnecting of accounts. So this is to enable things like disconnecting and reconnecting the Keystone wallet. Keystone hardware wallets to wallets, enabling disconnecting them from a wallet, if you wanted to just move it off and similar things. There we have. What else we've

Kris: 00:03:19  

There's the sapling and orchard have new crate releases in support of making it possible to to expose or to do, to add signatures to pczt that are generated outside of the, you know, the very minimized pczt loop that we had initially published.

Str4d: 00:03:49  

So, yeah, yeah, this was in support of some of the, some of the hackathon ideas that were going on separately. And so this enables those kinds of uses, as well as, sort of more generally, the like checking your transaction in a place where you've got easy access to rest libraries, but then applying the signatures in a much more constrained environment. Another thing we did in the last two weeks, I set up some benchmarking metrics for measuring wallet sync time for Zcash. I can just post the link to them here. I unfortunately have to go fix them. The last couple of days of metrics are not quite right, so I have to go fix those today. But there's a track there for tracking. At the moment, tracking is essentially the time for Zcash dev tool to sync the last 1, 7 and eventually, once I've got enough data, 30 days of blocks, so we can keep an eye on like as changes are made to the core libraries and wallet and  things, how long that's taking. The intention is eventually to also be able to add other wallets, like what real wallets, like Zashi and  zallet to there as well, so that we can keep keep an eye on what the on the performance penalty cost of like operating in a real mobile environment, versus Zcash dev tool, which sort of is like much closer to the hardware, and can can be a lot more efficient in various ways. So, so that's there, if people want to sort of keep an eye on things. Interesting thing from that is that the one day metric, almost all of that is currently performance costs in updating the sub trees like that seems to be rather costly in terms of lightwallet D queries, whereas the seven day one is where most of the syncing block time is coming in, so we'll be keeping updates on that sort of going forward, just to give us something to keep an eye on, another thing is the halo 2 releases, yes, so the halo 2 releases that contain the changes necessary for the orchard zsa circuits. We got those in. We also got into various other communities and third party PRs have been languishing in there since, not having time to do that. One of the notable changes is that proof, proof creation on like decent on like modern mini core CPUs will be about 18 to 20% faster. We haven't tested on mobile yet, but I expect there'll be an improvement there, and proof validation will be 50% faster. So that should be useful for zebra.

Kris: 00:06:27  

Something else I wanted to bring up is that so the ECC team has a weekly open research and design meeting that we've had some members of ZF attend. One of the things that's come out of the last couple of weeks that is potentially worth pursuing is we've had a number of discussions around,

Str4d: 00:06:53  

I'll just put an asterisk there, kris, let's, let's defer that to later in the r&d section.

Kris: 00:06:53  

I agree. I'm just going to note it here as it's, you know, as now is the time that it's so we have some ideas for how to make network upgrades easier by changing how we evolve the transaction format. So, you know, with the objective of making it so that we can do smaller network upgrades and not be blocked by these. These, yeah, yeah,

Str4d: 00:07:31  

but we can talk about that in the r&d section if anyone's got questions. Oh, and then the other thing, I guess, related to that, but obviously it's been taking up our time these last couple weeks, is last couple weeks, is reviewing the orchard Zsa PR, from the perspective of trying to get it integrated into the orchard repository, at this point we are basically done with review of the non Zsa changes, the integration part, except for one bit of circuit code that I need to review, with the intention being that once comments on that are addressed, we can get that merged into the orchard repo and then so related to that, our plan for the core libraries, the core rust libraries, going forward, is to follow the sort of like integration model that we've that we've worked out whereby, for these sort of longer, long term features, in a sense, we can have them in the repo with PR, so not merged into into the main branch, but in the main repo. So that the cost of keeping those long term branches updated as change it like maintenance happens is handled by the maintainers, rather than by the feature developers. So that should hopefully make it easier for for these longer term features to be integrated and sort of keep up to date with everything. We don't think it's going to be too much additional overhead on maintainers versus what they really would have to do if it got merged all the way into main for a completed feature, but we'll be keeping an eye on that going forward.

Kris: 00:09:07  

We need to actually document those. Will update the contributing MD

Str4d: 00:09:12  

Yeah, we've got a sketch of what we're planning, or what we've drawn out, and that will go into the contributing MD files in the near term.

Natalie: 00:09:22  

Great, thank you. That might be everything.

Str4d: 00:09:25  

There's probably more stuff that we did related to this, these three things, but that'll do for this

Natalie: 00:09:30  

cool, great, thank you. Okay, next we have Zingo labs, who's going to chat from there. Anyone want to give updates on Zaino? Looking to see who's here?

## core stack updates, zingo labs zaino

Za: 00:10:04  

I can give a quick update on I know we've got two streams. We've got the chain index integration, deprecation of local cache project, which is almost complete, and that's being run by Nacho, who I think might be on this call and can speak much more fully to the details. And then we've got the deployment of a new test framework for testing chain forks, which I think is also nearing completion. That's Hazel's work. I don't think. I'm not sure if she's on this call. Yeah, if Nacho is Nacho on the call?

Nacho: 00:11:06  

Sorry, yes, the details of the chain index integration. What we're doing, we're basically weaving out migration from the old local cache that we're deprecating. So basically, we're getting all of feedback by chain index instead of the old modules. And we're close and entering

Natalie: 00:11:41  

Does anyone have any questions? No, okay, all right, let's move on. Yes, so Zcash D deprecation updates, 

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:11:58  

Yeah, well, a lot of things were said before. So what we have been doing towards this end of the year in terms of outreach, I have been talking to the different partners. We have exchanges, mining pools, API providers, one to do a retrospective on a Nu 6.1 and what was their experience. We're trying to get feedback on that and see what we can improve for them and make their lives easier. And then also we are getting some feedback on Zallet and z3 stack usage from one or two big exchanges and an API provider. So it's good. And then, as it goes on, for development, we have been reviewing our timeline, and I've factored in the end of support or, and, yeah, end of support of the versions of Zcash D, which is kind of the pacemaker we have for being able to, you know, set up, kind of our quarter or our period on how Zcash D can be changed. And we have released a version in October. So the next end of support for this current version of  zcash D is 6.10 is on January 21 which means that then I'm going to leave it back on open discussion, because I need to ask Qedit folks some questions . But then, since we we've been getting a lot of attention from the market and and the general crypto ecosystem, which is pretty awesome, but it has set us back a little bit on our priorities on zcashd  deprecation, we we have some delays on some of the things that we were doing for good reasons, but yet still. So what we are forecasting is that once we signal that everything, every feature that we need to deprecate Zcash D is in place, then we need to set up a proper testing period, which we have estimated, but We haven't defined strictly as probably a 16 week period where zcashD and the new stack coexist side by side and and people start moving towards the new the new stack, and we they have zcashd as a backup. So considering the pacemaking of 16 weeks of each new release of zcash D. Then this gives us a window of, for example, if we have everything in place by, for example, beginning of q2, 2026, then the possible Nu 7, and whatever set of features is defined, can be set up in the next, in the following Eos, or end of support milestone of Zcash D, which is September 9, 2026 that's kind of like the timelines where we're this is a pretty napkin, not even bulk. Ballpark is a napkin, kind of notebook estimate of how our timeline is. And then we need to actually factor in a couple of things that have been going on with the community, about sentiment of our CS days and the different features that will be included in Nu 7 So yes, this, this is kind of what we're going strictly on zcash D deprecation. But then there are a lot of things that go on in the context that will play around how the possible dates of signaling deprecation, feature completeness and telling the ecosystem to start moving, definitely, their production environment, to the new stack. Yeah, that's kind of what I've been working on. And these are, like, everything is tentative, but we wanted to give an update to the whole community, and towards the end of the year, the year to have an idea on how things are progressing and what people should expect in terms of like milestones and things happening in this process.

Natalie: 00:17:34  

Thank you. Pacu, Does anyone else want to give any any updates which haven't already been said around deprecation? Yes, Alfredo.

Alfredo: 00:17:44  
 
In addition to that, I'm working on creating an open RPC document for zebra also, I will do it for zaino, and then in the z3 repository, I'm building a router that opens another endpoint. But when you use the two specs, the zallet and the zebra one, when you call a method which is inside the grade, it's there. When it calls an RPC method that is in zebra, I get the response from there. So it's kind of a unified endpoint with all the RPC methods. So I'm working on that, pretty dirty right now. I move it some code to a common crate, which is right now approaching my computer because I follow what zallet did in regards to build a map in the when you are building zallet with all the RPC method, the rasmap, and then when you have an RPC discovered endpoint that use that map to generate the spec, and I did the same for zebra, and I would do the same for zaino. So it's a lot of common code, so I think we should move that to separate crate. Yeah, that's some question I will maybe ask you guys later. But just to let you know, I'm working on that, it's a unified open RPC specification, and it's a rust router that redirects the calls to whatever of the three endpoints we have In the stack.that's it. Thank you.

Natalie: 00:19:40  

Thanks Alfredo, anything else from anyone? No, okay, next slide,yes, qedit, research and implementation update. So who from qedit wants to speak?

## Research and implementation updates- Qedit Zcash Shielded Assets

Pablo: 00:19:55  

Pablo, thanks. Natalie, can I share my screen? 

Okay, so we wanted to convey the status of the project. So as previously mentioned, everything done for Zsa in Halo 2. Halo 2 proofs, halo 2 gadgets and other dependencies for the circuit has already been merged. Some of it has already been released, as mentioned today by Strad, and now the focus is orchard zsa So this is in active review, and I will discuss it in a moment. Once it is done, we can properly update Librust Zcash for the changes done in orchards zsa, as a result of the fixes of the review, and the same for zebra. In addition to this, there is two auxiliary code bases. One is Zcash test vectors, the changes done for transaction v6 and orchards zsa,we are doing these changes specifically. And we have TX tool, tool to generate transaction v6 we are using it for testing against the zebra modified node. More specifically, on the subject of workshop, just this week, we received a review from Strad reviewing everything except the circuit changes. Strad correct me if I'm wrong, everything except the circuit changes was reviewed. We had a discussion this week with the ECC team, In addition to this, as mentioned by Strad, the base branch for the changes, it's not, it's not the main branch anymore. It is a dedicated integration branch, the ECC is working on a team that is working on the way to streamline these long term features. And then they introduced a new branch, and the idea is to have the development done in one of the branches in the orchard main repo. In the future, hopefully this will give more visibility, maintainability, and all the other benefits that strad the mentioned so this is also positive. Next we have changes to test vectors. Go ahead.

Vivek: 00:23:05  

Yeah, hi. So, like, we had put up pull requests to the test vectors as well, and we got reviews from Strad and Alfredo on that. So like, some of the initial changes that were there were like, regarding like, while we had done this, we also made some changes to the formatting of all the test vectors in general, to allow, you know, for us to just directly copy paste the things from the Zcash test vectors repo to the orchard  Zcash repos where they are used. So one of the things that's here on the screen is the just simply adding a russt test FMT, like doing FMT on the generated rust test vectors. So this was all part of the pull request, 108, at the start. And what was requested was that we separate these parts that are not zsa specific outside this PR so that, like it reduces, obviously, the diff, and it makes it easier to change the like look at exactly what change is happening. So we split this up into a few pieces. So this is the first of those PRs, which is just simply, it adds cargo fmt. It runs FMT on the vector so that we get it in the format that can directly be pasted into the downstream repos, so we have this one that's out and ready for review on Zcash test vectors. Beyond that, we will be adding, like, based on some of the other comments that were there on the PR like, there were some things which were, like, extra unused imports and things like that, which we will separate out later. And there's also stuff regarding the indentation and adding the pub create visibility for the test vectors and things like that. So those are all coming in subsequent prs. And then we have, I think, like there was recently the NSM, and there's like, zip, 233, amount those changes were added into the main zcash test vectors. And so we catching up to that upstream as well. And there's, like, some things that we have to integrate, basically merge the two things in a unified way. So we will be doing that next, and then we'll be checking that it basically is a complete TX v6 like representation of T x v6 essentially that it covers all the fields that should be there for T X v6 so that's our plan for the moment, for Zcash test vectors.

Pablo: 00:25:48  

Thanks, Vivek. So in addition to the formatting, we are rebasing it on top of the latest version of Python test vectors, as Vivek mentioned, there is a conflict between Tx v6 initial implementation that was already merged to the Tx V6 that we did. So we are working around this to align our version with watch what are already been merged, and we will be submitting this in subsequent behalf. Aside from this, we have the work of zebra. So we have one tested node that is capable of doing all these operations as was demoed in the previous video call. It can, it can do transfer, burn, finalized issue using the TX tool. We are working on global state management for zSA we need to keep an additional record of additional details for the consensus checks for it to work and once the upstream grades are integrated. The focus will be on zebra. So we will have much more of this coming, especially after some version of orchard is reviewed and fixed and included in the main in the integration branch, and the focus will be shifted toward the Librust Zcash and zebra. This concludes our update. Pacu, you wanted what you wanted to ask or to add something?




Pacu: 00:27:31  

Oh, yes, I wanted to ask you a few things. So a few days ago, qedit filed a grant, or posted a grant to cover for what I understand are the last remaining items of orchard  zSAs zebra integration and  zcash integration. Do you consider this as Code Complete, as of like for what it entails, zSAs as a feature.

Pablo: 00:28:09  

So after, so, okay, so we have a running version of zebra zsa the idea is to finish the review process of orchard zsa, include the changes required by the reviewers. Then to do the same for librust Zcash, first adjust to the changes in orchard Zsa then do a round of reviews for librustZcash. LibrustZcash also involves transaction v6. It will be not as big as orchard zsa but still, the content is significant for librustZcash. After this is done, we we will take the changes into account in zebra, and there is a need to work with Zcash foundation to review the changes for orchard zsa for Zsa in zebra again, round of reviews, fixes and and then hopefully merge it, either to integration branch or the main whatever the decision is, Yeah, this is only a the content of the ground.

Pacu: 00:29:24  

And do you think that may that after completing these, or maybe, I don't know, 70% through all this work, a testnet could could be launched to have like this version, like all like zSA working as you say in a testnet that people can easily, more easily access to and and start Like building applications and testing out on feeling what orchard zSAs bring to to the protocol. I'm thinking about like whenever this feature goes live, if  there's, there's consensus for it, I think that a good lesson learned from Nu 5 is that we better make use of test net to have people to test and develop things to actually use the feature of the protocol and Not actually launch it as an kind of like abstract thing that was implemented to the protocol, but then there is no actually tangible way to use it,  and I was wondering about what a prudent testnet period for this feature is, and I don't know how many months, like three months, six months, and if you think that that could start like as you end this last grant you just filed, or if there's anything else that needs to be done,

Pablo: 00:31:21  

okay, so there is already a single node testnet running, and it is accessible to the public. There is a video of me showing how to use it in the arborist call from one month ago. It is accessible. It is open. We are maintaining this is an unofficial test net, just to demonstrate the capabilities of zebra with Zsa later, there is a need to, as you said, there is a need to provide a proper testnet, which is the official Zcash testnet. Sure we can discuss this. We can do this. the thing with the official zcash testnet, you probably want all the features for the release, to be included, not just Zsa. So that's why we keep this. This single note, testnet live the bottleneck with this is the ability to create transactions. So we have a TX tool that allows us to create these transactions, and it is well integrated. Anyone can download and run it and imagine the applications it also include the issue, not, not just transfer number, so it is there.we will keep maintaining the unofficial testnet as much as needed, of course, for the upcoming grant, and even after we can discuss, we can continue this work. Yes, definitely strad go ahead.

Str4d: 00:32:55  

Yeah, I think what pacu was asking about was not an update to the to the main Zcash testnet, but having a separate testnet, but that is like what you know, or maybe was a potentially even a fork of the main testnet, so like Bootstrap from that testnet. So that would be not too dissimilar to the single node one, but presumably, then in a position where other implementations would be able to more easily integrate with it, because it behaves more closely to the main testnet. And indeed, once we get to the point of, yeah, once we get to the point of things being sort of merged through the stack and available, sort of more easily integrated, then it will be easier for the node operators to coordinate a feature testnet for for this, ahead of any changes to the main testnet, yeah.

Pablo: 00:34:02  

Yeah, definitely. And once orchard  review is done, and once LibrustZcash review is done, the maturity of the of this work will be much higher, and then it is the proper time to potentially launch a feature testnet, as strad said, yeah,

Pacu: 00:34:22  

Thank you. Yeah I was, thinking about that too. Like, whether you have thought of this in terms of like, using the official or  the main  testnet. Or if we need to, the changes are so like radical different, that we need to, launch a different testnet and have the current testnet as it is for like, daily development. And, yeah, maybe we can  start discussing that  and probably you folks need to actually scope this in, because it sounds like a lot of work.

Str4d: 00:35:11  

Well, I can answer that from a protocol perspective, which is that the main testnet tracks mainnet ahead of time. So we cannot merge to and deploy on the main testnet until the consensus rules fully provided in terms of we know exactly what's going to go into mainnet  because otherwise,  if we deploy to testnet and then they change, we then have to roll back testnet in order to to ensure that what's on testnet will reflect what's on Mainet. So that can be disruptive and has caused breaks in the official testnets in the past. So we try and do that later in the process, I think that's where the flexibility of having feature testnets that are less problematic to tear down would be much more beneficial for this and make it easier  for users to actually to test the new features, while, as you say, also enabling regular testnet to still be able to use for testing against current behavior.

Nate: 00:36:22  

So this idea of, I feel like we need like a focused cross org effort to figure out how to do feature testnets well, and how to sort of, you know, develop them to get to become mature, to eventually merge into the main testnet. I like to call it staging net, because like my old web two app days, there's this concept of a staging website, and everything should be code identical to what you want to publish to the public. And so I think we definitely need that kind of final stage testnet before mainet. But we also need feature testnets where, you know, shielded labs need this too. We've been doing workshops, but every workshop we've had an ephemeral testnet. And so there's, like this general problem I feel like multiple orgs are running up against. So I feel like it would be good to get a conversation going on that. And so maybe I'm volunteering myself to try to arrange a meeting about that maybe or, or maybe it could be a topic for  the R and D meeting. Anyway,

Pablo: 00:37:56  

Yeah, it is a great suggestion later. Go ahead.

Nate: 00:38:00  

Oh, just one more detail. I am not tracking Tachyon too closely, but I assume ZSAs crosslink and Tachyon might all need some common infrastructure needs for doing things that aren't compatible with mainet yet, but we want there to be nodes. We want people to be able to join. We want it to be persistent, and we want different ones for different feature sets. So maybe those three orgs at least, and then maybe zebra or other infrastructure code teams could jump in a meeting and figure out, like a good next step there?

Pablo: 00:38:42  

Yeah, yeah. It could have proper instructions for people, like an easy ramp up for anyone that want to test this feature or build on top of this future feature. Yeah, it is a great suggestion.

Nate: 00:38:58  

I'm going to put myself on the record as like one trying to organize that in maybe late January or February, to get that conversation started, just because that's what works for my schedule and the holidays and stuff.

Pablo: 00:39:15  

Yeah, on our side. So we have the single node to test the functionality. We are not waiting so we have something  that is publicly accessible, but being part of this process and to streamline feature testnets sounds like a good idea.

Natalie: 00:39:37  

Anything else anyone wants to say or shall I share my screen again? This one? Everyone see that? Okay, cool. So next we have shielded labs. Hi.

## Research and Implementation Updates Shielded Labs- NSM

Jason: 00:39:56  

So just a couple updates on the NSM, first least authority has completed their audit of zip 233, and I've shared the report with the engineering teams at Ecc and the Zcash foundation. Their primary recommendation is to update the zip to include a requirements section and a privacy implications section. So we're working on those additions and plan to have them ready for review by next week's zip editor meeting. On the engineering side, as I mentioned on the last call, igers contract ended in late November, and Shielded Labs has taken over the work. Judah is working on updating the code and rebasing the zip 234 and zip 235 PR, and we expect to have that completed before the end of December. That's it. 

Natalie: 00:40:56  

Thank you. Any questions? Anyone? Okay, thank you. Okay, yeah, crosslink so shielded labs and Ecc, anyone ?

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:41:12  

Yes, I have shielded labs updates. Okay, so we finished. Let me find my notes. We finished what we were calling workshop 4 B at the beginning of December, and that went pretty well. And so it was the first milestone where we began hooking up the actual testnet, we call for crosslink specific test net, zec, into the staking weight that's used in proof of stake. So this is like the first milestone where actual proof of stake is starting to emerge. And another really exciting thing is we had Zingo join, and they're participating to make a demo, like an iOS demo wallet, and then the shielded labs team has had a visualizer, and we completely rebooted that and integrated wallet functionality. So there were like, two demo wallets. Plenty of stuff was rough around the edges, but it's really cool that, you know, there's a desktop one and a mobile one, and then there's also you could run the Finalizer .for the next milestone, which we want to do, I think mid to late January we're going to start like tightening the screws on all of the proof of stake stuff. So we've written some blog posts about trying to balance different trade offs between timing, like user experience for staking, unbonding, delays, privacy, financial appeal, and there's probably more axes in the trade off space, anyway, so we've, we have, like, a basic design that We're going to start building for the next milestone. So it'll have unbonding periods, it'll have quantization of amounts as like a privacy thing, so you can only stake powers of 10 CTAs. And then there's plenty of usability improvements we want to do, and we've had a discussion at shielded labs. I don't know if we've looped in Zingo, but we realized there's kind of two possible goals. One is to make it a really polished experience, and the other is to do more experimentation in terms of usability. And I think we're mostly leaning towards experimentation, so rather than So, yeah, you know, try stuff out with the UX, do a workshop, get get review and feedback from that, and see how that is. So expect experimentation, rough edges, things breaking, but we're exploring how to do the UX well, and all of the other code. And then another goal we have here is to improve some of the infrastructure. So this kind of ties into the test net thing. Like One example, we need our demo testnet is doing proof of work, and we kind of need to do that, since cross link is about proof of work. So we can't really use a proof of authority like reg test style testnet, I mean, we could, but we would rather make it more realistic for actual cross link. So one need for our feature testnet is to have real proof of work mining, and now we have this challenge of, okay, well, how do we distribute CTAs to the participants so that they can try stuff out, right? So this is just kind of like a general infrastructure thing. It would be nice if we had a persistent testnet. It had mining. It was somehow accumulating, you know, the assets. And then when we're running workshops, we can distribute them. So we want to make some improvements on that front. And then we've also been trying to, we started collaborating a bit with some zEC hub folks on getting more like community, like fun stuff, basically like, so we're brainstorming different, like goals, like, hey, as a participant, can you? Like, a simple one is, can you stake with either one of the wallets, more advanced ones might be like, can you try out both wallets and compare them, or try to, you know, get the most people to stake to your Finalizer, or things like this. So it's not meant to be a competition, but just like a way to stimulate people to try out different things. And we started working with zechub to come up with awards. I think they might be nfts. I wasn't noticing that too closely, but at least badges. And so that's kind of fun. So that's the 4c goal is the end of January, and by the end of q1, 2026, what we want to do is get the prototype to a what we're thinking of as a feature complete phase. So this will not be a production ready wallets or design so it may have bugs, security flaws, bad UX, etc, but it kind of shows a persistent feature testnet, where all of the main moving pieces are accessible to people, and then also a lot of the design that we've been fleshing out as we're trying to connect the more abstract design that Dara and Strad especially worked on at Ecc I helped with a while ago. That's abstract. It's great, solid work, and we're trying to make it real with code. And so there's a lot of gaps and pieces in there that we have been sorting through. So at the end of this. Q1, 2026, what we want to do is like, basically show the community and say, like, this does all the things, but to make it safe for mainnet, there's still a fair amount of work. Should we proceed to work on this? It'll probably take at least a year to get it ready for like this, the staging testnet, right? So look forward to that that, will have like announcements and ways to give feedback and stuff like that. And as part of that we've we have started some of that process of hardening it to make it more production ready. We're just getting started. So one thing is, we've we're just starting a work with an independent design reviewer named Nicholas della pena, and he is an independent mechanism design researcher, he's focused on the design documentation, which is exciting, because that part is a bit messy, and what we're doing is nailing everything down into a specific git revision, and then he's going to run with that, and so Jason's going to be publishing an announcement about this later today. But the reason we're nailing that down is to sort of, we're trying to do like a pre registered sort of process where we say, here's what we have. It includes the questions we want in a design review to focus on, and we're just going to upfront share that with the world. This is what we're looking for, so that any review reports that we get from that or they get published, we will publish any reviews that are done. You can kind of tell we didn't like change the scope or tweak the questions or whatever to make it look better like we want to have a rigorous process. And yeah, so that's sort of where we are with crosslink. Did I miss anything? I probably missed some things, but that's the big picture.

Natalie: 00:50:24  

Did you have your hand up? Did you want to say something?

Za: 00:50:29  

My question was answered, right? Okay,

Natalie: 00:50:34  

Okay cool. Well, thank you. Nate, anything from anyone else?

Nate: 00:50:39  

Oh, actually in the interest of accountability, I mentioned last workshop, I would be submitting a zip PR, but I haven't done that yet. I've shifted more towards preparing documents for this review, which is a good precursor step. that's it. Thanks.

Natalie: 00:51:03  

Great, yeah open announcement. So this is an announcement. Discussions are next. Kris, do you have an announcement? No, okay

## Open Discussion

Open discussion. So there are a couple of things which I know people have already wanted to talk about. So Daniel wants to talk about inverse tech, and Mark wants to talk about dynamic fees. Mark, I think you just put your hand up. Do you want to go first?

Mark: 00:14  51:42  

I'm happy to go first. I just raised my hand because I wasn't sure that I was officially scheduled on the call, but sure I'll go. Let me share my screen here.

All right, so in case anybody missed it, we posted this dynamic fees Lab, which is just sort of meant to be kind of a light fun introduction to this topic. It's not meant to be any sort of final design, or anything like that. It's just the historical context, some prior art and like, some native solutions, and then a proposal that meets the goals that we put forth here in this document. You can find this at fees.shieldedinfra.net, if you want to look at this yourself, I this yourself, you know it walks through the background of the fees, the history it walks through zip 317, which is the current fee regime. And then we define these goals here. You know, we don't want to leak information. We want to use public information. We want a clear and consistent user experience. We want to incentivize miners to act in their own self interest and include legitimate transactions and blocks. We want to respond quickly to congestion. We want to make briefing expensive. We want to make this easy to implement, deploy, and we don't want to substantively degrade user experience compared to the status quo. I think a great first step would be for the community to at least agree that these are the goals. And I want to thank Chris for taking some time yesterday to go through this document with me. Chris, I've not been able to incorporate every single piece of feedback you gave me, but I got a lot of it, including that last goal, which was your idea that, you know, this is a cool website because it uses live main net data to display the information on it. So you can see that the network is never really all that congested. You know, right now it's utilization is at like 1% of the full block size based on just transaction kilobytes versus the two megabyte block size. Here, the things that I've seen discuss these so called Naive solutions. People talked about just simply lowering the zip 317, marginal fee based on the recent price action. But we don't know if this price action is going to be sustained or not, or if it's going to go higher or whatever. So you know, just manually tweaking the fee probably is not a viable long term solution. And then other people talk about increasing the block size, but as you can see, that would not do anything. There's other solutions for this on other blockchains, namely EIP, 1559, style congestion controllers, or like what Solana does in terms of compute abstractions. And then there's sort of real world solutions that like surge pricing in Uber or something like that. So I just call those out here. The section that I'm going to add at some point soon is a trade off section that says, like, if we do this, then we have to sacrifice that, and so on and so forth. So kind of reverse engineering from the goals, or deriving from the goals, we put together this comparable based dynamic fee mechanism, which uses live market data from the previous blocks and treats it as you would appraise a house, or you would appraise like a eBay item or something like that. It's what people have been willing to pay in the past. With regards to transaction fees, informs what the current transaction fee is, and the way we do that is by recalculating the zip 317, marginal fee as a median based computation from a previous set of blocks. I arbitrarily chose the last 50 blocks, because that's about an hour. And to guard against reorg noise, we shift that by five blocks. So we take block five to 55, rather than block zero to 50. We look at that, we calculate the average transaction size in kilobytes and the median per action fee, and we use that to calculate the median however we want the fee to go down. So we have this construction where we basically pretend like the blocks are full, but they're full of these synthetic transactions that are set at some sort of variable floor. You could, you know, in the simulator here, you could do 100 sets. You could do, you know, and it's really anything that's, if we're going to be NSM compatible, it's going to be anything divisible by five. So you can send 60% of the transaction fee to the NSM and 40% to the miner. That will drag the fees, generally speaking, based on this congestion history, pretty much always down super low. And then obviously we can't just lower the fee, because then we're back in, like, sandblasting land. So we need something that's going to bring the fees up over time. We suggest, when there is competition for block space, we suggest using this sort of Fast Lane, which, right now is another arbitrary, just 10x calculation, and that will allow users to, at their discretion, say, Okay, well, the blocks are getting full here, so we should just, you know, I should pay more, some reasonable amount more, to prioritize my transaction, so it's a very minimal amount of discretionary information, which hopefully should inform the wallets and the nodes and everybody in the miners and about what the fees are and what the fees should be. We also suggest bucketing the fees in general, in powers of 10 rounding, just using classic rounding up and down to the next power of 10 up or down, which you know, if it were enforced in case, this would greatly reduce the fee entropy and potentially things like information leakage. You'll see in the next steps that we want to perform all manner of analysis and testing on this, but that's the idea we would you know, we have an activation plan in place which would start with the policy only phase and then move to consensus. And the consensus rules for this particular iteration of the design end up being very minimal. You know, we would probably require an expiry height that is about the length of look back window so stale fees don't hang out in the mempool for too long. We would enforce a power of 10 for the per action fee. And we would define a floor and just make sure that the fees are above that. And I, you know, again, this is all a work in progress, but we're aiming towards extremely light consensus changes, if any at all. From here, we want to do all sorts of threat modeling. We want to document the trade offs. We want to do a privacy analysis to see if that discretionary information that we provide can be used in concert with other information to de anonymize your segment users. And then what I'm doing at the bottom here is kind of collecting a bunch of other just kind of interesting and cool ideas. You know, Strad pointed out that the difficulty could be used as some sort of heuristic price Oracle, because they're correlated on some level. I found some I found a paper about the Bitcoin fees and treating the mempool like actuarial math, so that, like, you know, people pay a fee to get if they pay insurance to get their thing into the block, and then the block stuffing is like an insurance claim. And what that does, if you invert that, is allow you to basically tune the fast lane to have a stronger guarantee that it would land in a certain number of blocks. I haven't been able to visualize that, which would make that a lot easier to explain, but that's another cool idea. And then Chris also sent me an idea which I have not been able to put in here yet, which so I won't share that at the moment, but so this is the whole thing here again, fees.shieldedinfo.net I would suggest, if you have time or bandwidth to go and take a closer look at it and give me your feedback. We're still very early in this phase, and definitely would love to hear from you. That's all. Thank you. Great.

[website](https://fees.shieldedinfra.net/)

Natalie: 01:00:54  

Thank you for that. Does anyone have any questions they want to ask or comments they want to add? Yes? Strad,

Str4d: 01:01:12  

Something I noted when you mentioned the activation plan, the one of the rules that you proposed there is that transactions must contain an expiry height no more than the length of the look back window. That as a side effect, would remove the ability to disable transaction expiry. Now I don't think that is necessarily a bad idea, but it is a significant idea independent of the fee logic. So if your design has a requirement on this, then we should be talking about disabling transaction expiry much earlier than talking about actually deploying something to raise fees, because that would impact a large swath of the of the ecosystem, basically any if you look at the on chain, at the proportion of transactions, which transactions don't set expiry heights, I expect you will find that they are almost exclusively, purely transparent transactions generated by people who have modified Bitcoin transaction production libraries for the purpose of just like making Zcash stuff, but otherwise they are tweaking things in the So, okay, mate. What I mean is that if you set the expiry Height field to zero, it disables the expiry logic, which is incompatible with that consensus rule. That consensus rule requires the expiry height be both non zero and no more than the length of the look back window. Well, the length of the back window implies non zero. So it would be worth you could it should be very simple to check what proportion of generated transactions on the chain right now this would impact. That would actually be a nice graph to have on the site.

Mark: 01:02:58  

Great. Yeah. I will look into that. Thank you. 

Speaker 1  1:03:06  

Thanks strad, oh Nate, yeah.

Nate: 01:03:10  

Had two follow ups. So one was, yeah, in addition to looking at, you know, like the empirical stuff about current expiry. I think it's useful to also just communicate like it's making a trade off and usability, like if it would be forcing all wallets to behave a certain way, whereas some wallets do and some don't today. And so that's like the bigger picture message to especially wallet developers, but maybe also users. Yeah, so that feels like a big piece, and I think you're right to call it out. Strad, oh yeah, my other thought was, I really want us to here from and communicate with the tachyon team about anything involving fees, because in you know, it's really early, but if there's any constraints or goals around fees related to Tachyon, then If there's any way we can or should adjust towards that, that might be interesting, or it may be the case that it's far out enough that we can just do a sensible thing now and then, do another transition there. Hey. Speaking of which, why don't we have Tachyon people showing up to the arborist and giving updates. I'll go pester them after this meeting.

Natalie: 01:04:46  

Love that. Go for it. Anything else?

Blake: 01:04:52  

Blake, yeah. Just a really quick comment. So Zec.rocks, we're continuing to reward node operators for running Zcash light wallet servers. We started with around 12 servers online a few months ago, and this experiment has worked out in 112 servers now being online. So I'd actually love for us to kind of put ourselves out of business, right, like where we don't have to have any infrastructure that's remotely centralized in our ecosystem. So something we're moving towards, and I invite anyone to kind of DM me or hit me up in form if you have comments on it, is I want to start experimenting with directing user traffic towards these community servers right now. They're not actually powering any zec.rocks infrastructure, and it was never announced as something that might we, of course, will not pass any user identifying IP addresses or user agents or anything like that back to the community infrastructure, and we don't log any of that in our infrastructure. Yeah, just kind of throwing that idea out there, and you'll see some more about it on the forums. And yeah, we were able to continue this reward structure. It's roughly $300 per month with Zcash for at least the next six months. So it's a great time to run Zcash infrastructure, and we're excited to continue contributing in that way.

Kris: 01:06:24  

This strikes me as a situation where we probably need, in order to make this work, make this more trustless. We probably need something like the fly client proofs. It's exactly what my hand was up for. Yeah, so support for the fly client proofs in wallet infrastructure so that wallets can can have proofs that they're the data that they're receiving is not malicious,

Str4d: 01:06:54  

yeah, and mostly that's been blocked on there wasn't an easy way to implement that in the Golang implementation. But it would be trivial to include that kind of information in zaino based lightwallet D because we have all the logic and rust for building fly client logic. You know, the Zcash history crate provides all of that, and so whatever it's missing could easily be added there using the infrastructure that's there. So that's a long standing, has been missing from the fly client protocol that would be good to have, because the does like its threat model does involve you are trusting the server for a variety of things, and if we can minimize the Trust for some of those aspects, then it makes it more viable to  using the  service. The other related thing for this would be it would probably mean that we would start wanting to query from multiple different servers rather than one to be able to do cross checks.

Natalie: 01:08:02  

Thank you strad, Nate and kris, you are just you're next, but I just want to say that I'm going to watch for time, because we have two other topics to be talked about. So yes, Nate,

Nate: 01:08:16  

Okay, mine's a quick flight. I'm pretty sure the flyclient could benefit  crosslink, and I pushed back on our team from looking into  it too much, because that feels like a next year kind of thing. So there's a tie in or dovetail there, and if it were included in cross link, it then sort of makes the the need to create valid flight client proofs directly built into consensus,

Kris: 01:08:55  

So my hand is actually just a call back to the actually just a call back to the Ecc update, something I didn't explicitly say, we have tagged a version 04 of the light wallet protocol. So this is the thing that Strad was talking about that adds transparent information to compact blocks, along with a few other updates, there's not yet a light wallet D release that supports this, but it is backwards compatible in the gRPC sense That so wallet maintainers and other other folks who who make use of the protocol definition can go ahead and update to this release. The other thing here, for wallet maintainer specifically, is that the new definition of the protocol includes a field in light wallet info that is the light wallet protocol version, so that servers can announce what version of the light wallet protocol they support. Now this does mean that servers will need to upgrade to support 040 in order to announce and they should completely support 040 in order to announce that they support 040 but that's you know, that will hopefully make it easier to do things like for a wallet to determine whether the light wallet server that it's talking to can provide it with transparent information and compact blocks, for example, or, you know, fly client proofs if those are added at some point in the future.

Natalie: 01:09:41  

Thank you. kris, Daniel had before this, said that he wanted to talk about inverse tech. So do you like to go for that? Daniel, yeah.

Daniel: 01:10:33  

Hi everyone. As you can see, my daughter is here with me. Good to see you all. It's been quite a while since I joined one of these there. Today I'm here with Dorell, who's a co-founder of inverse. A while back, we were joining, you know, when we were working to get it for the ZSA design and initial work there, and later on, we actually wrote an SLK on private programmability with the Zcash foundation. So like, we're definitely familiar with the with the ecosystem, and recently, we had some ideas that you know, we would like to share with you all and get feedback, because it could, it could eventually transform in some kind of a grant on this sort of related to the topic of of how to do private, like fully private, kind of light wallet on Zcash, building on top of the momentum that zec has created a little bit so I'm going to just kind of let Dorel speak and give a short presentation on this, and happy to answer any questions you may all have.

Aurel: 01:12:13  

Hi everyone. Thanks, Daniel. Let me share. We made a little, little deck.

So is this working? Think, so can you hear me?

Str4d: 01:12:33  

Well, yes, we can hear you and see the presentation as well.

Aurel: 01:12:39  

So we became interested in improving the light wallet protocols for Zcash. So we are looking a little bit into that. So as I mentioned, we are in the studio. We are involved previously in sapling orchard Zsa and programmable money for zcash and yeah, now we'd like to look into the light Wallet. So this is very early phase. We are basically exploring ideas, and we have that co founder here by not present today. So the lightwallet protocol that we have, right? It's kind of proportional to the number of transactions. So it's a bottleneck in itself. It's like you're limited by its lowest mobile device in a way, if you want to support them, and in the future, so in the future of higher traffic, and you also like the risk of centralization, so I'd like the servers. They are good points to collect all the side channel data and try to do like metadata attacks and so on. So just to recap what the light wallet needs today, it needs to find the orchard. So to send itself, it needs to update its witnesses, to receive it it needs to detect the transactions incoming into it, and also detect its own past sense. And if we have a future with tachyon, we also have use cases for out of band, like storage and communication of sequence. So a different secret distribution method. So what we imagine that can all work together in some way So we would like to explore the cryptographic solution that could be relevant. So, for instance, try to apply the private information retrieval method so to make it to to make the work on the mobile device sub linear. So that can be used to to update the witnesses without revealing So, not running through the entire blockchain like even, even quickly, but just looking at the path that you need without revealing which one. So to prevent linkability  we can look into the homomorphic encryption that's needed for the inbound transaction detection, or either, like one server that would be a homomorphic encryption, or multi server that's MPC in that case. So that would be interesting if it's known, but that would be interesting to understand, like the cost of this, probably this point number two is a lot more costly than number one, but would be interesting to know how much, and if too much, we can also improve  a concept of of notifications of transfer. So in addition to secret distributions, the concept of a notification is going to be able to do only the detection, because once you have detected that you received a transaction, you can then fetch the like full ciphertext and decrypt it. And that's like sublinear with, again we could make it more friendly to fhe if you want to go the like fhe side or homomorphic encryption methods on the server side. So the current method of encryption, they are not particularly friendly. So to to fhe, so that's a cost. You can reduce the cost automatically by by making this choice, and we can investigate some some methods of adding some secret that is shared between the sender and receivers in a different way, like adding something to the Payment Request, or deriving some additional cryptographic material that will help the receiver fetch its incoming transactions privately, again, PIR layer.So we'd like to flesh out this type of ideas, but we were asking for for feedback about about this, like, what's interesting, what has been done, maybe we are so interested in, in the networking side, like decentralized storage and decentralized like messaging. So again, to share these notifications of transfers. So again, making an out of band, basically making a recommendation of the best out of band methods, but then wallets could adopt right? So, and for that, there are, like, really two features that that you like, one is the wallet state. So what it's the wallet can be recovered from a seed phrase, so by storing it states somewhere on a decentralized storage network. And the second task we're considering again this notification of secret distribution and finding ways to do that in excuse me, in a way that is like sub linear again, in cost using potentially additional cryptographic material, which I call here, notification keys, again Using PIR or using onion routing. So I know that the wallets support Tor, for instance, to access like, essentially web servers. But here the idea is to make the wallets participate in some sort of DHT or onion routing mechanism so that they can forward to each other in a peer to peer manner, like the secret distribution and notifications, and in a way that is not uniquely identifiable To this wallet, so having some anonymity sets that is still presented. Yeah, so we have a further topic. We are designing right now, an identity protocol at inversed and we have been discussing with the zcg some some ideas about integrating, basically adding identity features to Zcash, like connecting the wallet of  zcash to Identity features like proof of funds and as such, such ideas are just a teaser for now, and yeah, so, so the next step for us will be to flesh out those ideas based on feedback from anyone here, and then establish some kind of scope and then start a discussion on the forum. Yeah, but that's where we at.

Daniel: 01:21:28  

We think that, because it's it's such a like, big topic, and, I mean, there's many of them, but because it has so much behind it, it doesn't make sense to sort of submit a proposal right away, to design a protocol, but more to actually, like, do research and, like, get more clarity on on, you know, specific benchmarks and simulations and things like that on these technologies. So, yeah, that's kind of just put it to put it out

Natalie: 01:21:56  

Thank you for that. Um, yeah, just gonna do a time check. We've got six minutes left, but we definitely do have an opportunity for some questions, but just quickly, though, how would you like to best be responded? How do you want people to reach out to you? Email, forums, Discord. Do you have a preference? Yes, we

Aurel: 01:22:23  

you can write to us at our email display, so that's aurel@inversed.tech , or you can find us on Discord as well.

Natalie: 01:22:35  

Wonderful. Thank you. And Pablo, go for it.

Pablo: 01:22:40  

Aurel, you mentioned homomorphic encryption. What is the exact computation that you have in mind in this context

Aurel: 01:22:48  

that trial decryption of ciphertext, like what is currently called in band distribution. So with Diffie Hellman and the cha, cha decryption, or an alternative, which would be like faster, which would be like fhe friendly, and which would be only about detecting the presence of a transaction without so detecting without decrypting just not possible in the current format

Pablo: 01:23:21  

something like the server detects on behalf of the user, if this is a relevant node, and then respond accordingly. This is the direction,

Aurel :01:23:33  

yes, the server will do the trial decryption of all the transactions, and then that can be aggregated in fhe as well, so that the output to the client is a sub linear.

Str4d1:23:49  

I've had suspicions slash hopes for a while that an fhe based approach to either trial description or detection keys would, it would eventually become feasible. And if you think that it might be in the realm of feasibility now, then I'd be very interested to see the results of of that sort of like investigative research there. Obviously there's, as you, I'm sure you're well aware, there's, there's a bunch of prior art and prior research that was done into detection keys specifically for the context of Zcash, and none of it sort of really panned out as, like, satisfying the desires that we had without something like fhe, protecting the information and, yeah, and I think the only other thing independently, so like Chris mentioned, penumbra, what Penumbra ended up deploying was a variant of fuzzy message detection. So like a padding, padding the output slash, like intention, intention colliding detection effectively to provide padding traffic. And fhe based approach effectively also would incur some amount of padding traffic, because in order to hide the fact that you're getting responses, you necessarily would have, effectively, some something that amounts to constant bandwidth responses, to some degree, within the within the response, regardless of the actual traffic you're getting, but presumably there'll be tunability in regards to that. The something else in your slides I wanted to raise, but I can't remember, the other thing I wanted to bring up is in terms of a place for things to chat in Zcash r&d Discord. Under the r&d category, there is a brainstorming section which would be an ideal place for, if you're, if you're looking for discussions on things there with, with Zcash, r and d people, that's, that's a good place to do it.
Yeah, I was gonna, I was gonna say that we were gonna, we're gonna write up a small description of this and then put it on the r&d forum. because the margin of this call is too small for the discussions that are necessary. But there's, there's definitely some interesting, like, avenues there that are like, yeah, we've someone just needs the time to figure out what's feasible now. And you know, with the with the benefit of not having looked into it for like, four years, hopefully there's been more fundamental progress in fhe. Think schemes should be nice to look at.

Natalie: 01:26:29  

Thanks strad. Yeah. So everyone do remember that these conversations, of course, can continue after this, and at the next arborist call, we had a lot of chats today, which was great. I'm looking at when we said the next Arbor to be and apparently, 25th of December. I feel like this is unlikely. So I'm not sure we already announced.

Alex: 01:26:53  

We already announced that it's canceled. So no,

Nate: 01:26:59  

I think we should cancel Christmas instead.

Natalie: 01:27:02  

Cancel Christmas. Well, thank you everyone. Merry Christmas. see you all soon in the new year, probably. Thanks.

Next Meeting Scheduled: Jan 8, 2025 15:00UTC
