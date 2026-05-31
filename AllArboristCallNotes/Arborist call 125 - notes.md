## Arborist Call 125 Notes 

Meeting Date/Time: May 28th, 2026. 15:00 UTC

Meeting Duration: 1 hr 12 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update[zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update) 

Research & Implementation Updates [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates--zingo-labs-zaino) [zcashd](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-zodlzf-zingo-labs-pacu) [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit--zsa) [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) [Tfl](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer)/ [D.fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fee)

Open Announcements[office hour](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=h76Ngomx8kk&t=16s)

Moderator:Pili

Notes:chidi @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:03:46  

Okay, so welcome everyone to today's arborist call on the 28th of May. The agenda for today's meeting, as usual, we will start off with updates from the teams working on the core zcash stack a the zcash Foundation, zodl, and zingo Labs, and then we will also follow this up with some updates from teams working on research and implementation of new features, such as qedit, Shielded Labs, and zodl. We will then open the floor to participants to make any announcements or bring any discussion topics that may be of interest to the community. So, what is the Aborist call? The Aborist call is a biweekly call where zcash protocol contributors meet up to discuss upgrade timelines and processes, protocol research and development efforts, design and implementation of new protocol features and identify blockers and unresolved issues. And the purpose of this goal is to try to make zcash protocol development accessible to interested parties and to provide more transparency for everyone. Anyone can register to attend. You can go to zcasharborist.org and if you want to become more involved and present during this call, you can email us at Arboristcall@zfnd.org and request a presentation slot. You can also get involved in the zcash community in a number of ways, you can apply to one of the grant programs, or you can take part in community discussions in the zcash  Discord, or the zcash community forums, and there are clickable links for these at zcashaborist.org And with all that said, we can start with some updates on Zebra from the foundations.

## Zebra Update 

I will be representing today, so the team is not here because a number of them are looking into reports of the greatest sync performance and trying to understand what's going on and see if we can do anything about it. Apart from that, the team has been very busy working on a number of security issues, and we will publish a security release later on today. That's all I have. Does anyone have any questions? I Yeah, I see zooko is asking about sync issues. There's a number of reports on Discord and the forum that some zebra nodes are stalled, so we're looking into that. Okay, I don't see anyone from zodl, but I'm going to move on for now. We can come back to them later if they join, and so next up we have zingo labs with zaino, and I see Hazel, but I'm not sure. Yeah, Hazel's going to give.. let's promote them to panelist. Hi, Hazel, we can't hear you. Okay. Hello, hello, I see you're unmuted, but I can't hear you.

Hazel: 00:04:33  

Or maybe I can't hear you.

Pili: 00:05:38  

Oh, I can hear you now. Yeah, go ahead.

Hazel: 00:06:35  

Hang on, let me see if I can figure out what's going on with my audio.

Pili: 00:07:00  

Hello, hello, can you hear me, Hazel, I guess not.

Mark  00:07:56  

Can I hear you

Pili: 00:07:59  

well? we can hear you, but I see Emma has joined, so if you don't mind, I'm gonna go back to that and let her give the update, so one second with me. Hi, Daremah, are you able to give an update on zodl from zodl, daira emma, can you hear me?

Daira: 00:08:31  

Yes.

Pili: 00:08:33  

Do you have any updates from zodl and zcashdD, zallet or the core libraries.

## Zodl Update 

Daira: 00:08:42  

Yes, bear with me. Sorry, Zodl and Zallet. Just a second. Okay, so fixes for the rewind method SDK releases, so there are some some internal release that will support the coin holder voting for the next poll in zodl, so collaboration with the varrious Group, team on that for coin holder polling and multi-server transaction broadcast, some security work can't tell you about, and getting back to some zallet Alpha for blocking work, so for mobile, released Zodl 331 on iOS, and then 340 on both platforms, and finally fixed the Keystone import, so that's the issue where you don't necessarily see all previous funds that you've received, so now you can, I think, how it works is that you can enter a birthday height, and it will scan from that birthday. Let's see, current focus is on coin holder polling. Please help us test those in  Zodl server improvements, so that's like wallet server and sync issues on iOS. Harry has joined as a senior mobile QA on Monday, and Danny will join as principal cryptographic engineer on the 27th which I believe is today. Let's see, it's so that's the core stack updates. Yeah, I think that's everything on that slide.

Daira: 00:08:42  

We've also got is R&D updates separate,

Pili: 00:09:32  

Thank you, Daira. Any questions for Daira? Okay, let's let's move on, and let's try Hazel again. I think she has things working, but let's try it again. Hazel, can you hear us? Oh no, let's see. Let's promote. Hello, Hazel, you're on twice, but that's okay.

## core stack updates- zingo labs zaino

Hazel: 00:12:15  

All right. Well, I still cannot hear, but I will give my update, and then see if I can get my audio working after that, so Zaino has just had a release of version 3.1, which is it cleans up some stuff, like we've fixed return value of a version in the get block range, and the big thing is updating to latest Zebra. We were trailing behind Zebra, and now we are not, and we have a whole bunch of new code that did not make that release. We're working on a release that will get us proper lightwallet D pairity again, because with the huge wave of lightwallet D  vnerabilities being reported, we're starting to think that getting light wallet D deprecated is a shorter term priority now, so we're really trying to get that out the door as fast as possible. That's our main next goal. I'm looking at the change log for the release we're working on, and there is so much in it, so I'm not going to try to overview all of it, but that is hopefully coming out this week, maybe next week, but hopefully this week, and yeah, that's where we're at, finishing off lightwallet D, and yes, that's about it. I am going to try refreshing my browser again to see if I can get sound back, because it seems to be turning my microphone on is turning my speakers off, and I don't understand it. This has never happened to me before.

Pili: 00:14:31  

Okay. Thank you, Hazel. Even though you can't hear us, if you have any questions for Hazel, please type them in the chat, I guess, so she can see them. Otherwise, you can tell me, and I can try to type out. I'll give a few minutes for that. Yeah, so Daira emma has a question about what's the schedule for retiring lightwallet D Hazel. Hazel says I have thought that we had parity already, so but something got lost when we did a recent upgrade.

Daira: 00:15:31  

Okay, I know that a few weeks ago Strad was still saying that there were bugs that were blocking the zallet beta or Alpha four or whatever it is, but maybe those have been victims.

Pili: 00:15:53  

Okay, I guess, given the audio issues where Hazel can't hear, it's probably best to sync on this offline for today. any other questions for Hazel, I Okay, I'm gonna move on. zcashd deprecation update from Pacu and anyone else wants to jump in.

## zcashd deprecation updates zodl,zf zingo labs pacu

Pacu: 00:16:34  

Hey, all right, yeah, many things have been said already, but basically, yeah, zaino reached a few milestones of the Zaino completion grant, so over the last two weeks the block Explorer RPC start phase is mostly completed, the the only RPCs that were not implemented were those flagged as low priority by our surveys and our spreadsheet of RPC usage, so those will be as we always said, like implement the on demand  if there is demand and if it's reasonable to do it, then also we finished implementing part of the integration tests on the integration test repo that actually test the parity between, lightwalletd  and Zaino, those tests originated some changes within Zaino, and also surfaced some possible bugs on zcashd that were reported, and then the team will decide whether they will either work to be addressed or not. So good feedback there. The only part we haven't tested yet is the mempool, because it requires a little bit of more setup, but so we are trying to speak with the zaino folks who are trying to target lightwaletd parity between the releases of version 0.40 and 050 that will be like the next two releases of Zaino. Of course, there has to be a lot of testing involved to actually be able to call like one thing is being feature complete, which on the lightwalletd surface, like that's objectively complete. The thing is that one thing is being like code complete, and but then we had to do a lot of testing to say, okay we can actually start replacing Lightwalletd infrastructure with Zaino D infrastructure, that it's kind of an adjacent conversation we need to have later, but we are trying to bump up that priority, so we can also sunset lightwalletd  and yeah, that's that's kind of the update on that question. What else, then, regarding Zaino, with the milestones completed the only pending stuff that is on the Zaino grants that are currently open is work that is mostly in internal enhancements and maintenance that doesn't impact the public interface, so there are a lot of like functionality that is completed, but we are now working between Zaino and zodl folks to wrap up some work from Strad that actually had some like differences or bug reports on the zallet and Zaino integration, and I believe that kris is actually working on that among the other ton of things that kris works on, so kudos to Chris to pulling that off. And we expect that from that work zaino folks will have a bunch of input from kris to actually do some enhancements and include those in the next releases. Yeah, that's that's pretty much it

Daira: 00:20:43  

Can I just say that kris is doing an immense amount of work at the moment. I really want to make sure this doesn't burn out. Yeah, if if you're thinking whether to ask kris to do something else, the answer is no

Pacu: 00:20:59  

No, if you need to ask Chris something to Chris, ask him if he needs some help, and whether you can actually help him out with something. yeah, and he's also onboarding a lot of new engineers, so like this is a lot of work. So, kudos to kris again. Thank you.

Pili: 00:21:21  

Yep, definitely

Daira: 00:21:24  

he needs some kind of lifetime award for services to Zcash.

Pili: 00:21:28  

Well, I'll see what we can do 

Pacu: 00:21:32  

Yeah, also we're Hazel and I are grooming the Dagny section of Zaino, so we can provide comprehensive, comprehensive views of you

Daira: 00:21:47  

you dropped out for an important part of that sentence.

Pacu: 00:21:49  

Oh, okay. I will start again. Hazel and I are working on the Dagny section of the Zaino section inside of the Dagni graph of the Zodl core and that will like enable us to produce some nice views of like the work that is pending and how it's going to be worked on, and we will be able to provide like public links to that work, so that everyone can see how it progresses, and also open like collaboration and  make some dependencies visible, so kudos to kris, who actually created that need as well, between all the things he did,

Pili: 00:22:46  

Any questions for Pacu on zcashd deprecation I Okay, I'm going to move on. Next up, research and implementation updates from qedit on Zcash shielded assets.

## Research & Implementation Updates. Qedit- ZSA

Vivek: 00:23:17  

Hi, hi everyone. So, yeah, I think, this is the  first arborist call since we, we met a bunch of people in Rome. So, yeah, it was very nice to meet everyone there. Yeah, so in terms of the updates, since then we have been working on a few things. There's been work on Orchard. We've looked at tightening some of the validation logic around the issuance of zcash shielded assets and I think we've looked at some of the edge cases and improved some error handling and documentation and things like that. We also recently submitted a new upstream PR to Zebra, so like we had a PR that was up for a while, but we closed that, and we've opened a new one that's more updated, and we will be discussing with the Zcash Foundation over the next few weeks to see the approaches to how to do things, and see that everything looks good for like detailed code review, we've updated the transaction tool that we have to again like work with this new tip of Zebra, and we have that working as well. the Orchard PR was under review. we've responded to most comments. I think it should be getting ready. I guess it's pretty much ready. I don't think there should be too much more before we get that merged into the ZSA branch. Yeah, and yeah, we also have a grant proposal that's open, and so we had like a discussion with the ZCG yesterday, and so we'll be working on updating the proposal based on the discussion that we had. So I think that's the main stuff that I have to update this week.

Pili: 00:25:21  

Thank you, Vivek. Any questions for Vivek? Okay, I guess no questions, so let's move on to Shielded Labs and network sustainability mechanisms. Who is giving updates about that?

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:25:50  

Oh, so I'll give that. Yeah, so I'll keep it super brief. Just have a couple of pieces of the refactor PR. I just need to merge that into main. There was a merge conflict that I'll get done today, as well as the PR for Zip 234 which I'll also publish as well today. This is the split up PR from the original implementation, it needed to be re-implemented on a couple of pieces, essentially. And so that is finally coming out today. Yeah, so that should be about it

Pili: 00;26:29  

Great, thank you, Judah. Any questions for Judah, I I guess not. Let's move on. Shielded labs and zodl on crosslink and the trailing finality layer.

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:27:00  

Hello, is my audio working? Okay. So, let's see. I think it was before Rome or at Rome. Anyway, about six weeks ago, we launched what we call the Cross Link Feature Net, and so the this is sort of a transition where previously when we're prototyping we would just basically set up an ephemeral testnet for each workshop now we have a persistent network and we're going to keep using that and having people use that, and our plan is to reset it when necessary through 2026 and keep improving it until we get crosslink ready to propose as a mainet feature, so in the first six weeks, oh, and a one big idea here is that we are handing out real ZEC rewards to people who participate, and those rewards are kind of mapped to their usage of the consensus stuff to try to get people motivated to hammer on that, so the story so far is that relatively early on, a lot of the stake went offline, so that BFT stalled, which is a known feature of BFT systems. They stall in order to protect safety, whereas proof of work systems make the other trade-off, where they don't stall, but they allow rollbacks and in the crosslink design, in the current design of our network, when that happens, proof of work just continues as normal indefinitely, which is, by the way, different from what's specified in the TFL book, and so once that happened, we also saw some compounding effects, so  we have made a new transport layer, there were some performance issues and bugs there, there's a new block sync algorithm, and then we also are in this mode where every one, by default, runs a CPU miner to get CTAs, and the combination of those led to really long proof of work forks, and that led to hitting the reorg limit in Zebra, and so now we have people see sort of perma fork behavior and so when grappling with what we wanted to do here we decided instead of doing what we initially planned which was to reboot the network each six weeks and do a new iteration. It was more interesting for us, and I think more valuable to decouple the network reboots, so we're going to only reboot the network when we have a compelling engineering motivation to do so, and in the meantime, what we want to do is instead of resetting to sort of get out of this bad state, we want to improve the software and analyze the bugs and learn what it's like for users to deal with these situations and try to focus on that to make it the end result more resilient for the real world and so that's the state we're in and so catching you up to the present so some things we've done in our recent releases, we've released a new v6 on Monday that has BFT peer discovery and visualization of which finalizers you're connected to, so that's helping people figure out some network topology stuff that has interacted with the current network state, and then we have also been doing lots of like diagnosis and analysis. We've also been getting a lot of support from the collaborators and contribu,tors, so specifically I wanted to call out ZK Nader and Kenback, because they've each set up their own different block explorers with staking info, which is really cool, and then a lot of the, there's several users who are like really proactive about diagnosing things, figuring out what's going on, helping each other, dismad, Pacu Orchard Guardian, Tom Z. So we really appreciate all of that. We've also been.. oh, I kind of glossed it over this, but we're going to continue doing updates every six weeks, and workshops, and we're switching the rewards distribution approach, so that it's time-based, so it happens every six weeks, regardless of the state of the network, and that's sort of how we're decoupling the network version, or the network restarts from the workshops and rewards cycles, so the workshops and reward cycle are just time based. The network restarts are whenever we think we should, and by the way, one reason we all agree we should is when we want to make an improvement and we don't have backwards compatibility as a goal at all for now, and we would only add it as a goal like once it's very mature, like basically on a staging network for mainnet, and we're doing cross or collaboration, so we're working with Zcash Foundation, Zebra Devs on how we're developing and diagnosing the new transport protocol and the new block sync, and moving forward, I just heard about some zebra nodes halting on mainnet, and so I'm wondering if we can probably collaborate more on diagnosing networking issues and stalls and things like that, diagnosing and testing and hunting down how to do those fixes, and then we're also collaborating with NIM, so that our new transport protocol will have NIM integration sooner or later, and then finally there is I've done an iteration on the zips, but it is what I call partially refined AI slop, so I don't - I'm not super proud of it, but it is helping me get started on a structure. So right now, there's a PR against the upstream zips repo that I opened a while ago that just had a stub, and now I've replaced that with some AI slop, that's, you know, I've done a couple iterations, so it's somewhat useful but somewhat misleading, and it has two zips, one zip is an overview, one zip is about the cross link construction, which is roughly equivalent to the TFL book construction, but with significant differences, but the scope is about the same, and then I've identified we're going to want many more zips, so zips around the BFT protocol, zips around the staking rules on the ledger, zips about new transport protocols, etc. etc. So I think there might end up being a big chunk of zips, and we'll be iterating on that as we go. Okay, any questions?



Daira: 00:36:09  

Three protocol points, so to motivate the two thirds schedule threshold. This is why the BFT is stalling, and it turns out that to get the security properties you need from a BFT protocol that's resistant to partition you need two thirds of the registered stake, not just two thirds of the stake that's online at a given time to vote for for the right updates, so that's why it's actually kind of difficult to completely avoid the possibility of a BFT stall and I think, so the incentives to keep validators online are going to be really important for the eventual network, that explanation of why it's two thirds is in my presentation on Crosslink, from, I think, was it Zcon 5, another protocol point. So you said that the Shielded Labs version of Crosslink differed from the TFL one in terms of what happened on the FT stall, in both of them, the proof of work continues. It's just that in the one in the TFL book, you can only past a certain point, you can only do empty blocks, but in both, the proof of work has to continue because a proof of work chain is like a shark, the ancedote about a shark swimming, which does not apply to all sharks, it has to continue swimming, or it can be attacked.
Third  thing, I promise this is last, so Zebra and Zcash D differ slightly in how they implement the rollback limit. So I believe in Zebra's case it just won't roll back more than 100 blocks, but it stays on its own chain, and it stays running in zcashd case, if it sees that it would roll back 100 blocks, then it shuts down. So those are obviously very different semantics, and I think we need to consider more carefully what we want.  I would prefer zcash D semantics if the roll back limit was increased, so that there is actually a proposal by the group,  to increase the roll back limit to 600 blocks, and that's in combination with the reduction for block time from 75 so target blocks facing from 75 to 25 seconds, so that would restore the wall clock time of the rollback limit back to what it was before Blossom, before we have the block time. I think that's everything I have.

Nate: 00:39:49  

Nice, thanks. Yeah, I'm especially interested in understanding more the rollback limit and what to do about it, and one thing I proposed to the team is that we actually lower it or maybe this is something, a collaboration we could do with ZF, even against upstream Zebra, which is set up a network, it's sort of like a, what do you call it, you know, it's like a red team network, or like a stress testing network. We explicitly lower that, we turn on everyone as a CPU miner in order to trigger that condition and learn from it. That's what we're seeing right now on our testnet, yeah, so I'd be interested to have a discussion about the reorg limit specifically, and what to do about it, both on mainnet and for the crosslink version.

Daira: 00:40:57  

Yeah, I mean the rationale behind it is that if that ever happens, then you violated the security assumption as the proof of work, so yeah, we should really be aiming for it not to be able to happen, and part of that is just kind of having the difficulty in having enough reliable mining power in a testnet, which is just a question of incentives, but yeah, and part of it is just it being a bit more difficult than it probably should be to run a node and also I think probably nodes should not be mining by default, because mining is actually making a commitment to have a stable network connection, because if you don't, then you, you will either get the clips, or you'll fall off the network, and then you'll be on a fork, so I don't think that nodes should be mining by default. I think that's a commitment that you have to consent to



Nate: 00:42:11  

It's the dream of initial Bitcoin

Daira: 00:42:17  
But the dream failed, 

Nate: 00:42:19  

by the way. The reason we chose to do that is so that people could get CTAs organically, because we didn't want to rely as much on a faucet, partially because there's these ZEC rewards. so I don't think our current user community, there's an issue, but if it grew larger, we didn't want to, like, reward airdrop farmers, like people who love rewards, and just figure out how to game them, so yeah, and also it is sort of measuring how the real world behaves, if we imagined everyone had similar mining equipment to begin with, which is not the real world, but still interesting to me.

Daira: 00:43:13  

Yeah, to quote the intro to Babylon Five proof of work was a dream given form, its goal to prevent centralization. It failed.

Pili: 00:43:31  

Maybe there's a few things I need to unpack there for the super perspective, but yeah, I think I like the idea of trying these things out on a feature testnet, I guess, and I'll see how we can look to prioritize and schedule that.

Pili: 00:43:49  

Cool. Any other questions on crosslink?

Nate: 00:43:56  

Actually, just to respond to that. I think that is more effort than needed for the first step. The first step might be just to ensure that we explain to some zebra devs everything we've learned about the behavior on our network and ask them to check out which pieces might apply to mainnet.

Pili: 00:44:19  

Okay, let's set that up. I'll take that. Okay, let's, let's move on for now. Shielded labs dynamic fees.

## Research & Implementation Updates, shielded labs- Dynamic fee

Mark: 00:44:31  

Hello, I'd like to share my screen, if that's okay.

Pili: 00:44:37  

Yeah, one second. Alright, I guess, if I stop sharing, you might be able to share now.

Mark: 00:44:46  

Yeah, all right, cool. So this is the blog post and forum post that we made yesterday. There's a lot of really exciting stuff happening in Dynamic Fees Land. Our overearching goals have remained pretty consistent this whole time. Here we want to mitigate sandblasting situations while also reducing fees for normal users under normal circumstances, and by way of paying dynamic fees, supporting the sustainability of ZEC and the Zcash network. I'm not going to read the whole post here, but there's other goals and things like that, and we sort of realized that we can do a lot of things under the current main net parameters right now with wallets to start moving things in this direction and getting useful data on main net that we can study and perhaps use, so we're working with, I think six or seven wallets now have agreed to experiment with these features, starting with Unstoppable and moving through a handful of others, and the ones that have not yet agreed, we have feelers out to talk to the wallet teams about these things. One is a 4x priority delivery, which goes right up against the weight cap defined in Zip 317 and that basically creates a quality of service that a user can choose to pay for and speed up semantics, which are lowering the expiry time in transactions to two minutes of wall clock time, so like two blocks under current parameters, and then it would be like five blocks if Dave's zip 218 goes through and this is a way to get the same semantics in the UX without you, without implementing like RBF or any other feature like that. It basically just waits for the transaction to expire and then resubmits it at the priority rate. Then from there, once we have some data, we can design spec out and ship a RPC endpoint called Z get standard fee that could be called from a wallet or relayed via an indexer, and then the wallets can use that fee with some sort of pseudo SLA, you know, in terms of inclusion in blocks. Our preference is to use mined blocks and mined transactions, as opposed to mempool spying or anything like that. It's just more real that way. And then from this research we want to change two parameters into 317 which would be lowering the marginal fee we'd propose 5000 to 1000 before, and then raising the weight cap from four to 10 to just sort of widen the the inclusion parameters  for blocks, and that's kind of where we're at right now, we're working with wallets, and I'm specifying the fee estimator. There's a librustZcash pull request that somebody from, not a pull request, an issue that somebody from Unstoppable opened about being able to configure the transaction expiry and the fee in Librustcash  transaction builder, and also be talking about, like, I think 2000 level zips for the parameter changes, and just getting the conversation started there,

Daira: 00:48:46  

yeah, the historical reason why we've kind of resisted these virtualization ideas is that we wanted to maximize the anonymity status, and obviously if you choose four times fees, then the adversary has that information. It's difficult to tell how much that leaks about who you are, because some users may be more likely to choose prioritization. The reason for the four times cap was basically, well, I'm a communist, so I don't really believe in money at all. Don't ask me why I'm working on this project, just to understand money, really, and some fun crypto, and prevent surveillance, but the point is that we didn't want a situation where only rich people could send transactions, so the four times was kind of a compromise to that in that direction, and if all you're doing is splitting the anonymity set between prioritized and not prioritized, then some sense that's the minimum amount of additional information you can reveal


Daira: 00:50:25  

I guess I'm okay with that. And I wrote the zip to allow it.



Mark: 00:50:30  

Okay, cool. And yeah, if you got to use money, you might as well understand it, right? I'm sympathetic to that.

Daira: 00:50:37  

Sorry, I am a co-authors, which I think, is Strad and kris. All

Mark: 00:50:45  

right, cool. Yeah, that's our thinking too, it's a meaningful discretion to give the user, and it's minimal in terms of what it reveals. And after the NSM ships, it's even more opaque as to why somebody would be doing that if they just want to tip the network or whatever, so that's oh yeah, Pacu

Pacu: 00:51:12  

Oh yeah, first I wanted to apologize because I haven't been able to read the post yet, but I wanted to stress out what daira emma  said, I was actually gonna make like kind of the same questions, remarks, so are there any privacy implications in terms of like being able to pick up like expiry heights  or fees, and how can we avoid users being advised to pinpoint their own transactions just in order to like not make the Dara Emma was right t shirt like even more popular. No, we have 1000 orders, like, yeah, we can do one. We can't scale that many right?




Mark: 00:52:14  

No, I want to be reassuring, but also as intellectually honest as possible about that question, it's because it's a policy change, because it's a wallet change. There's going to be a period of time when certain wallets are using these features and certain wallets are not, and I expect the usage to be minimal in that regard. You know the main wallet, Zodl is somebody that we have a conversation booked with, but has not committed to any of these features or anything like that. So I think you'll end up with a with two anonymity buckets, one will start very small and hopefully over time get bigger and bigger until they're, you know, of sufficient equality, and then that will be that, but it would still be if everybody plays along, which we're going to be pretty rigid about how the wallets implement these. We're looking at, okay, we call it the 5,004x parameters right now, and we're hoping to get to 1,010x but with all that, we're hoping that the it stays to about, you know, one bit, quote unquote, of leakage or whatever

Pacu: 00:53:36  

Oh yeah, it seems that you have everything well thought. Awesome, yeah, because these kind of changes are those kind of things that are under the category of like, road of hell is paved with good intention, like I remember having a conversation with one of the authors of the Zip 313 was it the the previous zip fee that lowered the fee like to really low and the idea was to lower them so like with with some parameters of how bandwidth costs were at the time in developing countries and then like this person was really kind of like regretful because like, then we had the sandblasting, and also, like, I think that these, these changes need a lot of like introspection, and it appears that you have done it, so it's, it's really awesome,

Mark: 00:54:35  

yeah, yeah, if you think about it's weird, because there's no price oracle, right? And if we look, you know, right now, if we lower to 1000 it's probably fine, but if Zec drops to maybe 200 usd or 150 usd again, or something like that, you don't know. So I think, but the good news is, is that we kind of know from 30 on up, 5000 is like safe where it is, so we can be careful about changing that parameter while still progressing this work forward  to current setup.

Daira: 00:55:14  

we also haven't seen what I would consider a serious attack designed to make Zcash unusable, that is well funded. So, the sunblasting did, in fact, make a lot of Zcash wallets unusable, but it did that partly because of our and tardiness, people know my position on this, I think by now about implementing  zip 317 so that was kind of partly us shooting ourselves in the foot and not responding quickly enough, but on the other hand, if someone, if it's an out of service attacker with 10 times or 100 times the budget of the sun-blasting attacker, tried to attack us, then they would succeed. So, yeah, I don't know how to fix that.

Mark: 00:56:27  

Yeah, there's also, if you squint at zip 218 which is the 25 second blocks, there's also these action limits, and you start to wonder if there's interactions here that, and I know it helps with sandblasting to have these action limits in some regard, wondering if there's some something between the fees and that that might interact

Daira: 00:56:52  

well. They do interact because they both affect the adversaries cost, so in any network like this, if the adversary is prepared to pay more than the users in aggregate, then there's not much you can do, because either the adversary can just flip the network, and if they're clever enough about it, then the transactions are pretty much indistinguishable from user transactions, and so how do you tell how do you end up favoring the users over the adversary is the hard problem, and no one has ever solved it, as far as I'm aware, for any, any network protocol whatsoever, we kind of rely on centralized services like Cloud Flare to another CDNs to kind of partially mitigate this at the internet level, but that's dependent on paying people to detect attack patterns and kind of block them in real time, maybe eventually that's what we'll have to do

Daira: 00:58:20  

Oh, I'll get an AI to do it, which has its own downsides. vibe denial with service protection. Nate,

Nate: 00:58:35  

yes. Hello. Sorry, I was actually chatting with Dave from Valor Group, saying they should be in the arborist calls. He wasn't aware of it until just now, but and the reason is because I remembered he had a criticism of this dynamic fees approach, and I wanted to channel it, because it's not - it was new to me, because it's not my awareness or bias.



Mark: 00:59:10  

the multi sig thing.

Nate: 00:59:11  

Yeah, it's basically short timescales, like, so I'm.. I love the idea of short time scales, you know, like the two minute expiry, because I think it's a good way to address the privacy issues, but it's by imposing the certain constraint that your wallet is online recently when it generates the transaction, and so I'm skeptical. I've, I'm typically skeptical of use cases where you have a transaction that's old that hasn't been online recently, and you want to submit that. That seems strange to me, but one use case that sounded like it made a lot of sense is around multi sig or threshold signatures, where you need time for everyone to agree. How do you think about that?

Mark: 01:00:08  

So, check this out. I have an opinion, . All right. Well, yeah, I'll say my heavy blunt instrument approach here, which is multi sig should just pay the priority fee at the time of the last signing, and it will probably be fine.




Pacu: 01:00:30  

Yeah, so actually part of the problem is I don't understand the the use case specifically, like there may be clunky multi sig people,


Mark: 01:00:42  

I don't know about multi sig UI and UX. I think that's kind of the wallet's job, but the problem statement, as I understand from Dave, is that in the span of time it takes to coordinate the multi sig, the fee could change, and then the transaction doesn't go through, and you have to start the whole multi sig all over again. which I think, if you just pay the priority fee, it will probably go through if our estimate is designed well.

Pacu: 01:01:08  

Oh, well, yeah, I think the story might be like, you know, it's an institution and it's three of five, and the one guy is away from the office on the weekend, and so the transaction, the transaction is specified, and it's the last necessary signature doesn't arrive for like days or whatever. I think that's the kind of use case that might happen in real life for other networks at least, and my I also have an opinion, which is just make the multi sig system work better, so it can handle that long time scale, but but the transaction is actually generated on demand after everyone goes, I'm not sure how,

Daira: 01:02:04  

so okay, so tachion on to the rescue, because if you have recursive proofs. So let me first explain why the problem arises in the current protocol, and this actually also a privacy problem, because you have to choose the anchor in order to know the sig hash, so you give the sig hash and the transactions, but they know what they're signing to all of the signers, they decide to sign it, and then they combine the partial signatures to get the transaction, but in the meantime, the the anchor can't be advancing, so that is what you end up using an old anchor, and also you could estimate when you're going to be able to broadcast the transaction and set the expiry height accordingly, but you don't necessarily know when the multi sig ceremony will have finished, and so you have to estimate conservatively, and which is okay. So Penumbra actually took an approach to this, which is to allow the anchor to be updated. Now I don't know whether we want to do that. We decided not to do that in kind of stripes sapling in Orchard to maximize privacy, but there's a case for that, and there's also you might be able to use the features of Tackhion on to do a similar thing without compromising privacy, so yeah, there are two potential avenues, I think that there's that avenue, and then there's also when you get the authorization to spend from the signers, they don't necessarily need to sign the SIG hash of a precise transaction, they could, for example, authorize an intent which matches some set of transactions, and that would be kind of ZK proof that I sorry, I'm confusing two different things. Basically, you just want the signers to authorize only the kind of weakest condition necessary, not a specific transaction, and then you combine that with recursive proofs, which means that you can much be much more flexible, and this solves some other problems, because if so, we have some threshold post-quantum signature schemes based on MLDSA, but they all have some drawbacks. The two main ones are ones patent patented, and the other doesn't work in a dishonest majority model. They're kind of inflexible, and you would have to use an old DSA, and they might be produced distinguishable signatures. So, there are other reasons why you might want to use recursive proof aggregation instead of a dedicated threshold signature scheme, and that kind of solves your problem.





Mark: 01:06:04  

I'm glad this is recorded. That's a lot of information. I need to go back and look at each piece.mark ,Okay, circle up with who you can just do a study group. Nate, you still have your hand up. Are you good, or you want to keep going? I do have my hand up, and it's for even more hand waving, and it's like totally a tangent, but I just realized I feel like the way I might want to solve this very abstractly is as an application of intents, so maybe I was just thinking about different, yeah, it's just a maybe we should have an intense geek out call someday, that's not this, but I just wanted to say the idea of intense, how it might apply here is you could have an intent, which says, you know, I'm signing that I control this private signature key, and I approve of any one single transaction that meets these criteria, and those criteria include it has a significant, a sufficient threshold of signatures from the other participants, and it pays this amount to that recipient, and the fee is either this or that, and then the actual transaction has to include proofs that it satisfied all of these intents, so it's a pretty significantly different architecture, but I'm very interested to explore it. If anyone wants to do a geek out on that someday,

Daira: 01:07:47  

If you squint at this sideways, it's basically a smart contract contract system, so it's, I think, programmability, and you can, so with not much more effort, you can support both programmability and this, and I'm very keen to explore that once we have Tachion on deployed for scaling, that we try and extend the use of the recursive proofs as far as it will go.  Also, yeah, it also gives you privacy of the statement, just like in Hawk, for example. Hawke is an academic kind of private smart contract version,

Mark: 01:08:40  

yeah. Envision there being the sort of NU 6, and Nu 7 dynamic fees version, and then the post tachyon, you know, there's probably tons of discussions we can have around how all this changes and new cool

Daira: 01:08:54  

the  point is we have very powerful tools that we are deploying and we can solve basically any cryptographic problem that you can state precisely can be solved, and the question is just the complexity budget and attack surface.

mark; 01:09:16  

Well, thank you all. That's all for me.

Pili: 01:09:21  

Thank you, Mark. Let me share my screen again. We're almost at the end anyway. Okay, so any announcements from anyone?

Daira: 01:09:39  

Oh, you didn't have - we didn't have R and D updates from zodl

Pili: 01:09:44  

oh, I didn't know there were any.

Daira: 01:09:47  

Oh, yeah. Sorry. Yes. Okay. Anyway, I'll do it here. I realized I missed a few things in my other report. The most important one is kind of, I mentioned that Harry and Dania joining us. Also, Pacu is joining us a zodl, so yeah. And, as well as that, so emerged the final changes as it 2005 which is the what should quantum recoverabilities at. So that's now been proposed. Chris and I, and others are working on improving our security and triage policy at zodl and we'd like to work with other organizations to kind of have a more of a common policy without kind of constraining everyone to doing the same thing, as we discussed it at the summit, the Keystone developers have merged PR to support Slip 39 secret sharing that'll be available in the future firmware update, and I have a project called Daira / shaman on GitHub, and it's kind of AI related, and what it does is it improves Claude's ability to remember things, particularly across session boundaries and perfection boundaries, and it adds hooks, so that it actually gets reminded of the right things at the right time, and it does significantly improve, kind of, I find default clauude quite forgetful, and it's a problem with doing complicated things with it in long context sessions. Okay, I think that is everything. And in Rome, by the way, Rome was fantastic. There were four conferences: ZK Summit, the Zcash Summit, ZK Proof, and Eurocrypt, and the highlights for me were kind of the very nuanced discussion of AI, discussing the potential harms, but also not kind of pretending that doesn't work and the discussion of the post content timeline, which, which we absolutely do not have time to discuss here.

Pili: 01:12:31  

Cool. So, I was gonna ask, we don't really have a zodl research update, but maybe we should add a section for that for the next time, like a separate one

Daira: 01:12:41  

Well, that'd be good idea, I think that's kind of how we organize the updates.

Pili: 01:12:45  

Yeah, so we'll do that next time. And then, yeah, I want to, I want to coordinate more on the security disclosure process. I just haven't had a chance to update their own too much yours a bit more closely, and I think Mark has a question or an announcement,

## Open Announcements 

mark  1:13:02  

I Yeah, I just wanted to invite everybody to our next office hours, which is going to be a continuation of the notes, commitments, and nullifiers protocol walkthrough that we had to cut short last time. That's going to be June 2 at 3pm UTC. So hope to see you there. That's all

Pili: 01:13:25  

great. Thank you, Mark. Any other announcements?

Daira: 01:13:28  

I'll try to be there.

Pili: 01:13:37  

Okay. Any, I have to say, I do have a very hard stop, so if we have any more discussion, it might have to continue without me, but any, any other discussion topics, I think I'm not going to give much of a chance for another one to arise, so with all that. Thank you very much. The next hour school will be on the 11th of June, 21 UTC. Hope to see all of you therer. Thank you.

Next Meeting Scheduled: June 2nd 2026. 21:00 utc

