## Arborist Call 127 Notes

Meeting Date/Time: 25th june 2026. 15:00 UTC

Meeting Duration: 1 hr 30 min

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update[Nu 6.3](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [Ironwood](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update-ironwood) / [zallet,zcashd](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zcashd-core-libraries-zallet) 

Research & Implementation Updates - [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates--zingo-labs-zaino)/ [zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-zodlzf-zingo-labs-pacu) /[zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit-zsa) /[crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-zodl-crosslink--trailing-finality-layer)/[dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fee)

Open Discussion [formal verification of zebra chain](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#grant-proposal-presentation--formal-verification-of-zebra-chain)/ [Discussions](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=Ni-Bp0p8W4s&t=2420s)

Moderator: Pili

Notes:lisa (X): @ZcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:01:08  

Okay, so welcome to today's Arborist call , on the 25th of June. The agenda for today's meeting is as follows: we will start off with some updates from the teams working on the core zcash stack, such as the zcash Foundation, zodl, and zingo Labs. And then we'll follow this up with some updates from teams working on research and implementation of new features, such as Qedit, Shielded Labs, and zodl. We have a special slot today for Runtime Verification, who wants to talk about formal verification of the Zebra chain, So that will be after the research and implementation updates. So, what is the arborist call? The arborist school is a bi-week call where Zcash protocol contributors meet up to discuss upgrade timelines and processes, protocol research and development efforts, design and implementation of new protocol features and identify blockers and unresolved issues, and the purpose of this call is to try to make Zcash protocol development accessible to interested parties, and to provide more transparency for everyone. Anyone can register to attend by going to Zcasharborist.org and if you want to become more involved and present, you can email us at Arboristcall@zfnd and request a presentation slot. outside of the Arborist call. You can also participate in zcash in a number of ways. You can apply to one of the current grant programs, or you can take part in community discussions in the zcash R and D Discord or the zcash community forum, and there are clickable links for all of these at Zcash arborist.org We have a very full agenda today, so let's try to keep updates brief, so we have more room for meaningful discussions. And to start off today, Arya will give an update on Zebra.

## Zebra Update 

Arya: 00:02:57  

Thank you, pili. So, in Zebra, since the last Arborist call, we have made some updates to how we do releases, so that's more automated now with  unified release workflow, and we started attaching the binaries, the signed binaries to the releases as artifacts, in the state we've updated the non-finalized  state reorg window from 100 to 1000 so the highest 1000 blocks will now be kept in memory, and  they can be rolled back if needed. We added a find fork point. Thank you to Nuttycomb for that, for locating the common root points of fork in Zebra, the height and hash of it. We added resumable non-finalized block streaming for the index  RPC server, so that the zaino and zallet can sync better with the trusted chain sync module, and we started work on the Nu 6.3 network upgrade with Ironwood value balance pool. We also merged. in flight we have a block notify config option where there's a feature in Zcash d where you could run a command every time the chain tip changes, so we're adding that too. I think that's basically it for the past couple weeks.

Pili: 00:04:15  

Great, thank you, Arya. Any questions or comments for Aria? I guess not. So, let's move on to zodl updates on Ironwood. Do we have anyone today to say something on that?

## Zodl Update Ironwood

Pacu:00:04:48  

That will be me. Okay, so for Ironwood, we have specification work on the V6 transaction format, we have reviewed and merged V6 transaction format and signature implementations from velar group. We also reviewed some PRs on Librustzcash about Ironwood that Shambo sent, and also the Keystone multi sign, like multiple transaction signature implementation for fund migration from velar group also was reviewed by our core team, so that's the Ironwood related items on my list, last Tuesday, like before today, before late yesterday, we merged the draft of the Nu 6.3 deployment and V6 transaction format zips, so you should be able to see that draft in the zips website. Those don't define heights for for test net. We are targeting  Nu 6.3 testnet activation for July 1, but we speculate that there will be many miners actually testing their systems, and we are defining the the activation height at the last moment possible, because if they connect their mining rigs, which are far more powerful than anyone  testing  or mining on test net, then our estimation of the height that should happen on july 1 will be like completely wrong, so that's the only reason you see a TBD there is because we know the date that we, that we're targeting, that we don't exactly know which height it will be because of this particular situation. Yeah, that's our updates on ironwood, and yes, we are also working on more documentation specification  about the user experience and future migration to ironwood for users

Daira: 00:08:06  

background noise. Here I'm in the cafe. Can you see me?

Pili: 00:08:10  

Yep, and we can hear you. Okay,

Pacu  8:13  

yeah,

Daira: 00:08:15  

yep. So the circuit changes have been merged to the Orchard crate for Nu 6.3  circuit, still a few things to do, so the wallet zip, so I think there's going to be two zips for the works, the migration, and the all of the wallet considerations, and Zips 317 needs updating, so that's the fees, just to do the obvious thing and well, I've been kind of documenting the consensus changes that were made just before Nu 6.2 and then Nu 6.3 because it's important not to kind of let those be left behind. We have a good reputation of keeping our specs up to date, but they kind of slipped  a little bit in that emergency upgrade, but that should be hit soon. Oh, by the way, I'm slightly disappointed to see that Ironwood is in kind of an upright font, there's a very consistent way of referring to the balls and new specs

Pili: 00:09:58  

Thank you very much. Any questions for Pacu or Daira on Ironwood? There will also be space for other Zcash D updates after this. Okay, let's move on to, is there any more updates on Zcash D, the core libraries, or zallet from anyone at, oh

## Core stack Updates zcashD Core libraries, Zallet

Pacu:00:10:22  

yeah, I have more items on my list. Okay, so we have completed the zcash primitives 0.25 dependency upgrade across the stack, and then we're making progress on the zallet Alpha Five scope because I can give my suggestion deprecation update now on the zodl front, is that we have very good news, we completed zallet Alpha 4, and we are doing the release process as I speak, so it can be released today. It's pointing to a bunch of repository commits and then you will have all the instructions there on how to run it, but we encourage everyone to test this alpha because it has the not only the green field wallet user path but also the zcash d data file migration, so anyone who has their files, or also always back them up carefully, and you can start testing your migration to zallet with those files in either testnet or or mainnet, so it will be really helpful for any of you to actually test how that works, and provide any feedback or any differences you see in Zallet's balance and your current wallet balance. It will be really helpful for us to catch anything that we might have missed, we did our internal testing, but you know, life is a box of chocolates, so I guess that there are a lot of cases and situations that we could have not anticipated, and we might need to adjust

Daira: 00:13:10  

Speaking of backing up files. Don't do what I did, and for doing RM minus RF on part of your file system, I didn't lose anything important, but be careful that much,

Pili: 00:13:25  

okay. Thank you, Pacu. Any other questions or comments for Pacu? Okay, let's move on. zingo Labs on zaino, do we have anyone today? I don't see anyone. Actually, maybe they need to be promoted. Please raise your hand. Oh, yeah, there's Za

## core stack updates- zingo labs zaino

Za: 00:14:02  

Am I audible?

Pili: 00:14:04  

There you go.

Za: 00:14:07  

Hello, hi. I am not the normal participant in this meeting, so I found out that I was taking over a few minutes ago, so pardon my sketchy presentation, so since last time zaino released a network upgrade 6.2 upgrade that was entangled with a feature called Get TX Outset Info that was causing trouble in our sync system, and we finally got those bugs ironed out and released our 0.4.1 release, which includes network upgrade 6.2 and then we initiated our 0.5.0 release, which includes an optional database flag, so that users can start using Zaino without waiting for indexes to build, and that also encountered some sync issues with the experimental get TX outset info feature, so that's something we're currently working on. We removed Zingo Lib entirely from our test dependency stack because it was depending on Orchard directly, and then we were depending on Orchard through Zebra, so we were getting dependency version complex snarls that were causing lots and lots of churn and extra work, so we deleted Zingo Lib entirely and replaced it with dev tool. We turned off default testing of Zcash D, so if you want to test zaino against Zcash D, you need to use the  ZCcash D flag. We are currently working on getting the optional DB feature to work, getting the fully upgraded to the latest Zebras feature to work, which includes the new 1000 block reorg depth and now that we've added dev tool to our harness, and have a way to do that. it's a relatively light lift to add zallet cli to our harness  we're going to change our release criteria to focus on live testing against the actual use cases of zallet and that is where we're at.

Pili: 00:16:53  

Okay. Thank you za. Any questions or comments for za? okay. Everyone's very quiet. Let's move on zcashD  deprecation updates. Pacu are you taking this still.

## zcashd deprecation updates zodl,zf zingo labs pacu

Pacu:00:17:24  

Yes, I think we've said pretty much everything. So, there's one more thing, Zallet now will offer the option to use either like Zaino or Zebra directly. So you might find currently that if you build with all features, there are some features that contradict each other and are like mutually exclusive, and those might be when that pr lands, like choosing  the backend through Zaino or Zebra directly, as well. Thats the other thing that I think we are working on and will ship shortly, if not today, am not sure if it lands in Alpha Four actually. So, I can say,

Pili: 00:18:33  

Okay, yeah, I think everything in Zebra was covered by Aria. I just want to highlight again the block notify option, config option. I think that was one of the things that we were not aware of in Zebra that people were using, but that's implemented now. Okay? Any, any questions, or shall we move on? I Okay, let's move on to research and implementation updates, starting with qedit on Zecash shielded assets. vivek Are you presenting today?

## Research & Implementation Updates Qedit-ZSA

Vivek: 00:19:13  

Yeah, that's right. Hi everyone. I think like what we've been working on in the last few weeks has been largely, we've done some work on Orchard. We caught up to the Nu 6.2 changes, so like the ZSA branch of ours now has all that included. I think it's not quite merged yet, it's in the final review stage, and we've been checking how best to handle the circuit version part of the thing, becauseZsa's are later, so we want to, there's no need to have Zsa's working with the bad circuit and so on, I think we have few of those things to iron out, and then we should be ready with that. We also made a pull request to Zebra, so it's  10628, I think, which is open, and we've asked the Zcash Foundation to also take a look to give us, I think, a review of the high-level approach that we are taking, so that if there's anything that needs like major rethinking, then we can get working on that as well. So I think currently the the iron wood and the security stuff has been like obviously a higher priority, so but yeah we'll be keeping a track of that as it comes, as we get feedback. Zips wise, we've again been tracking the progress on Ironwood. There's the new transaction format, and also whatever changes have been happening with extensible transactions, quantum recoverability. We are keeping an eye on how that interacts with Zsa's and swaps and the things that we've been doing, same goes for the other crates, I think Librust Zcash and our transaction tool pretty much just maintaining it to make sure we are ready to be on top of all these changes, yeah, I think that's that's pretty much what we've been doing past few weeks.

Pili: 00:21:29  

Great, thank you, Vivek. Any questions for Vivek, I Okay, let's move on. Shielded labs on the network sustainability mechanism.

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:21:52  

Yeah, I can give a super brief overview of that. So, just the two PRs are still out there, the zip234 PR and the

Daira: 00:21:59  

So can you speak up and get closer to the microphone? Please.

Judah: 00:22:04  

Oh, sorry, I think my microphone is a little too quiet. Thank you for telling me. better now? Or same

Pili: 00:22:11  

It's similar, maybe a bit better.

Daira: 00:22:14  

Yeah, you're a bit quiet.

Judah: 00:22:18  

let me see, I'll change my setting. Okay, sorry. I'll keep it super brief in that case, if I'm very quiet, yeah, both PRs are out. Just need some eyes, but with Ironwood moving forward, I totally understand if people don't have the time to do it, but if you do, that'd be super appreciated. And Zip 234 PR and the Zip 235 bug fix PR, and that's about it,

Pili: 00:22:40  

Alright. Short and sweet. Thank you, Judah. Any questions for Judah? I'm going to move quickly, quickly today. Cross link, any updates on cross link?

## Research & Implementation Updates- Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:22:59  

Yes. Hello, I'm here. Can you hear me?

Pili 00:23:02  

Yes.

Nate: 00:23:02  

Hi. Okay, so we've done two workshops now in the featurenet phase. The featurenet is still the first generation, meaning we haven't reset it or reboot it yet since the first phase, it's been in the state where finality is stalled, and then there's some compounding issues, so users have hit the 100 block rollback limits with their nodes, so they've ended up on persistence forks that will not resolve, so on and so forth, and so we've been hardening the tools. Yeah, our approach has been instead of just resetting it, let's really dig into these kinds of unhappy cases, and try to improve the software, so that users can have more clarity about what's happening, are better able to diagnose how they might be able to fix their system, so on and so forth, which seems a little bit unusual, perhaps to some users, so we did sort of like the first season of that. We had the second workshop, and starting with the second workshop, we so that defines the first iteration or season of handing out main net rewards, and so we're following through with that, despite, you know, the unhappy state of the network, and so the rewards are sort of split into two buckets. There's non-discretionary that is just following the issuance on the of CTAs on the featurenets, and it's proportional to that. So, the idea is the more you're actually exercising the behavior of cross-linked consensus in any of the roles that leads to mainnet rewards, and then there's a discretionary component where Shielded Labs is just giving out some main net zec and accolades to our participants, we have some community contributors who are like providing new infrastructure and tools and things like that, which is really awesome, and then a lot of really active participants who are, you know, analyzing the network, giving us feedback, doing bug reports, asking questions, helping other users. So we love to see that. And so now our theme, right now, is in terms of software development, is we're prototyping a social, or I'll call it a user-driven slashing tool, so the idea is, you know, with blockchains, anyone's able to do hard forks or soft forks if they organize community of users who all agree to do so, but actually coordinating that could be really hard, and there's this one case that's really specific that we think is worth making a tool for, so that users understand this option could be available if they can organize enough people, and so, and that case is specific to slashing stake, so  if you believe the stake you know attributed to a finalizer is not good for any reason, and you convince enough people to do a fork that slashes that, and this is what this tool is intended to do. It is, I'm going to say, it's very exploratory, we're prepared for there to be many unexpected edge cases or hazards, and we're just going to start experimenting with it as users, but  yeah, in the meantime, we're starting to collect like a queue of improvements  to the software, and especially the consensus design that are backwards incompatible, so rather than trying to be backwards compatible, we're queuing these up. We're going to start implementing them, and then when we decide the time is right, like we've learned enough from this sad network state, we will reboot it and deploy the new rules, so that'll be like a second generation of the network and we'll keep iterating on the that general pattern until we get it stable, let's see what else is going. Oh, so we've begun distributing the first round of mainnet rewards, so we have like a scanning tool for the non-discretionary part, and that's still in progress, I think, but if you've been participating in any workshops and you're curious about that, please contact us, or contact Jason. Technically, we had a deadline already, so hopefully you already knew about this. If you're attending workshops or in the Discord or the Signal Channel, if not, ping us and get involved, and we'll share more details about what that looks like after we've completed everything. So, I think we're going to do something like a statistics distribution of the non-discretionary rewards, and then maybe accolades, potentially for people who are participating, and you can be anonymous if you'd like. What else? Oh, and now I'm also focused on improving or writing the initial drafts of ZIPS, and I've done a bit of work specifying the basics for the design of how ZEC or CTAs gets distributed from issuance through the proof of stake subsystem to the bond holders and the finalizer commission fees, but that's far from ready, and in the meantime I've been more focused on exploring different ways to improve rendering of the zips repo, so specifically my goal is I want to be able to render my changes that are messy and no one from the upstream zips repo has reviewed them or okayed them or knows anything about them, but they get rendered to my GitHub Pages site, and I'm trying to figure out a way to do that that's minimally invasive to upstream and still meet my goals, so if anyone's interested in that, ping me.

Daira: 00:30:31  

Already have that, maybe we can kind of upstream that and get that working for anyone. So, what was it going to say? So, about slashing, what made you, or what were the trade-offs in pursuing a kind of user-led approach for that rather than automatic approach?

Nate: 00:30:52  

Hang on, I want to go into that, but I just want to, my last update is that we're planning a tentative workshop three for july 23 so anyone wants to show up, those are fun. Okay, now the question is, what's the rationale for having the user-driven tool versus automated rules? the rationale is simple, and it could very well be a case where it's overly simple for being practical, but right now we're exploring more extremely simple to keep the whole system low complexity as much as possible, and the rationale is whenever there's an automated slashing rule, it has kind of like a true positive and false positive and true negative and false negative edge cases, so it might not trigger when it should, according to what we would want as humans, or some of us at least, and then other times it might trigger when it should not, and so those cases where it can, for example, if it could be triggered when it should not, and again, should is very hand-wavy. Then maybe that could be the kind of thing an attacker leverages, so for example, if most proof of stake systems have a slashing rule for unavailability, so if you're not voting, if your finalizer is not voting enough, you will begin to lose out or get slashed, and so the example in this case is that that could be used to leverage an attack where you denial of service that finalizers votes or network connection to harm them, right. So

Daira: 00:33:10  

The arguments that I've heard, and sorry for that, the standard argument for automatic slashing is that in some sense it doesn't matter whether a denial of  service is due to an attacker or just due to poor infrastructure or laziness or it doesn't matter to the functionality being provided to the network. Now the argument only goes so far, and if it allows an attack by a large scale denial of service, then yes, that's a problem, but in the cross link design is also intended to tolerate that, because the proof of work chain will continue moving despite fact that you have denial service on validation, it technically doesn't, it doesn't prevent the proof of work chain from continuing to satisfy its kind of non-rollback properties, so we have considered the case where that also invested in breaks the proof of work as well. Now I understand that it may sound bad if the application level liveness, in other words, users' ability to perform transactions. It's possible to perform a denial of service on that, but you can adapt to that on the fly. You can adapt to a particular attack, and we did eventually adapt to the sand blasting attack too slowly, but we did, and I don't think there's anything about slashing which is different in principle.

Nate: 00:35:43  

Yeah, I think. Okay, here's what I'd like to do in terms of process. I feel like when we have a little bit more zip stuff written, maybe I should show up to the Zcash R and D meeting, and we should do one or more sessions that dive into topics like this, because this is a huge topic. I have responses, and I'd love to dive into them, but I don't want to disrupt this meeting too much.

Daira: 00:36:26  

Yeah, okay, fair enough.

Nate: 00:36:29  

Yeah, but feel free to reach out, and yeah, just for the community.

Dara: 00:36:37  

Also, let's talk about this at the summit. the zcash summit

Nate: 00:36:46  

yes. And okay, just for this group, yeah. So, what I would like to do is prepare to discuss some of these topics in the coming months, and I will announce that in arborist call, but if you want to do the deep dive discussions, they're going to be outside the arborist call, because they might take a while. Deal. Okay, that's it for cross links.

Pili: 00:37:19  

Thank you, mate. There's always time at the end if you have time left over for a longer discussion. Okay, any more questions or comments for Nate? Let's move on. Dynamic fees. Who's presenting that today?

## Research & Implementation Updates, shielded labs- Dynamic fee

Mark: 00:37:41  

I can present that. This is another sort of short and sweet update. If you recall, we were working with Wallet partners to implement some of the experimental dynamic fees features, Priority Lane, and Speed Up Semantics, and cypher Wallet, the people, the person, I guess, who makes Cipher Pay and Cipher Scan has a wallet called cipher. They're going to implement those features, and that's going to land, you know, within the next week or so. And Noir Wallet, the browser extension wallet, is going to implement the features there, so we should be seeing more activity on mainnet with those, you know, people  that spot priority transactions on mainnet, which is going to be pretty cool to see. I intend to make, like a visualizer, like a public website that shows the lanes. I haven't got around to shipping that yet, but I did make a PR to Zebra for a new RPC endpoint called Get Standard Fee, which for now just returns the ZIp 317 5000 zat marginal fee number. The intention there is just to get people using that endpoint, so that when we do ship a fee estimator, they'll just, it'll be part of their workflow. Thank you to Alfredo and Gustavo for reviewing that, and I think I've satisfied many of the review comments in there, including the co-pilot comments that came through, so, and I want to thank Zcash Foundation for graciously reviewing that in the midst of all the Ironwood crunch, but any attention that can get paid to that is fine. Otherwise, I'm happy to keep supporting Ironwood deployment. That's all for me.

Pili: 00:39:46  

thank you, Mark. I'm sure we'll merge that, and I don't think we have any concerns, so it's just a question of getting through the pipes.

Mark: 00:39:57  

Yeah

Pili: 00:39:57  

Any questions for Mark? Okay, let's move on. Okay, so we're at the kind of open announcement. We had a request for slot to talk from runtime verification to talk through their grant proposal for formal verification of deeper chain, and I think we have Natalie. Yes, hi Natalie, do you want to

## Grant proposal presentation- Formal verification of zebra chain

Natalie: 00:40:39  

Yes, I would like to. Can we start the presentation?

Pili: 00:40:47  

Yeah, one second. Let me stop sharing my screen, and then you should be able to share. I'll stop. Share, couldn't see this time. Okay, let me know if you're not able to share. Natalie, I think you should be.

Natalie: 00:41:19  

Can you see my screen?

Pili: 00:41:22  

Yes.

Natalie: 00:41:24  

Okay. Let me introduce myself. My name is Natalie. I'm a verification engineer from Runtime Verification. We are small sub team. There are three of us. Paulina, she's the lead. She has PhD in formal verification. Juan has master's degree in math, and our company has been proven code correct since 2010 We came out from University of Illinois, and we've worked with Nasa, we worked with Toyota, and of course with Stellar, Monad, Solana, Lido, so we have in total more than 25 engineers in the team, and what we are going to propose, we want to verify the arithmetic and parsing layer of Zebra, the foundation crypto sits on top of it and is already audited. We verify the core underneath. This is where plain arithmetic and parsing bugs leave. Tests only check the inputs we could sort of, but proof, mathematical proof would check all inputs, would check all of them. This is the layer where some famous Bitcoin bugs were located. They were actually in Merkle tree. I'll say about it a little later. So, what is under approach? We built this approach under a grant from the Xero Foundation. It's a pipeline for refined Rust code  itself as it is. So, we connected several tools into one workflow. We used it on Plonc free. It was requests from Ethereum. We presented it in many conferences. We've been writing papers  and for Ethereum, we verified cryptographic primitives. It's hard infrastructure heavy layer for Zcash. We are going to start one layer below the deterministic arithmetic and parsing. It is simpler to verify, though. For ethereum we verified fry, and so on. And, and yet, the layer where we should start from it. This is what we think, and every block and every transaction goes through this layer and depends on this arithmetic core, so this is foundational value, that is why we want to start from arithmetic core and parsing layer. It is very reasonable to start with it, so our method, our approach works on real Rust code. We translate it to lean when we prove functions have no bugs, so you don't have to trust us, you just have to trust Lean kernel. Work will be public, anyone can download repo, run all the theorems, and Lean kernel will accept them. Formal verification has always been a hard mathematical problem. AI made it more affordable, so some of work we address to AI, that is why we can verify more and faster, but still lean kernel wouldn't allow AI to hallucinate, because its kernel would check each and every proof, and again, as I said, these are proofs by induction, although the full parameter space tests cannot cover this, but mathematical proofs can. For a little rust function, we will have to like 10 lines of Rust code. We translate it to lean then we write several theorems, behavioral theorems, one main specification theorem. There will be, and it's more than 100 of lines of code from us. So, what we are going to verify in the first proposal, four weeks it will be more than 18 theorems, three targets for the pilot proposal, the foundation, everything reads from subsidy activation lock times all depend on amount, and hate arithmetic being correct. No point proving subsidy if arithmetic under it isn't proven. So we start at the bottom. Group A amount, a bug breaks the inputs equal outputs check, so this would mean mining from nothing, or mining, sorry, mining from nothing, or valid transactions can be rejected. Group B compact size risk is non-canonical encoding, so the same value encoded two ways: one node accepts it, another doesn't2. nodes disagree on the same bytes, and that's a chain split. So we are going to prove this bug wouldn't happen here. And this is actually the kind of bug which happened with Bitcoin, but it was in the same arithmetic layer, it was in Merkle tree, where padding made a valid block look invalid, so crypto was broken, just structural logic, but Merkle trees go in phase eight in our road map, which I'm going to show you closely, and Group C is hate in our four weeks first pilot proposal. Back here means nodes apply different rules at the same height, so consensus split, but by another road. So this is the Germanistic arithmetic and parsing layer.

Natalie: 00:48:04  

Crypto primitives, as I said, lie above, and they already covered by audited libraries. So this is the next slide. This is our full road map. It will take verifying of this layer will take four to six months, four phases, and our pilot proposal is first proposal in this road map. It will take four weeks, and at the end of this program, that zcash can be sure, that its base layer, the foundation everything else builds on, is formally verified, and each phase in this road map is independent engagement. We can do them in any order, but this order looks good to me. So we will need from core developers two or three hours during this initial engagement, four weeks. The problem is we've read and write in input output in Rust. We will have to, it's a late target function into a standalone Rust crate, so our instrument NES would be able to lift them to lean, so maintainers will have to confirm that crate faithfully represents the production code, and maybe they will come up with some ideas for formal specification, maybe we need something else to add to specification. This would be also considered, so it's just a borrowed slice of unsigned eight bit integers will be replaced, so a little approval will be required, just three hours per four weeks, and whole picture is bigger now. We are proposing this initial four weeks, then four to eight months full arithmetic and parsing core verified self checkup. self-checkable Trust Pilot. Anyone will be able to load it from the repo, run lean, and make sure that Lin kernel accepts all the theorems. And then we can move to cryptographic primitives. I am finished. This is, please ask questions.

Pili: 00:50:44  

Okay. Thank you, Natalie. I see Emma has her hand up.

Daira: 00:50:49  

Okay, so  this actually seems quite a long time for this work. So, as you know, AI has massively accelerated the speed at which we can do formal verification. I think that kind of the things that you're targeting are a good start, but if we look at the bugs that have actually happened, there have been a lot of bugs in the parssing of elliptive curve points, because there are a lot of cases, so especially for that thing where we had the group was not prime order, so there are lots of cases, such as small load of points, identity points, non-canonical encodings, and so on, and there are a lot of real bugs there, and hopefully kind of, most of them, but a bunch of the bugs that just before Nu 6.2 were of that kind, so I would rather kind of go faster and focus on not the cryptography itself, but the cryptography-related parssing, and move that up the schedule, because otherwise we're not going to keep up with models that are just trying to find bugs. Can you sponsor that?

Natalie: 00:52:43  

Yes, yes, we definitely can do elliptic curves, all the cryptography, elliptic parsing. This is just a first proposal, but  we can start with this pilot, make sure that we get to know each other, you understand how to download and check all the theorems, and then we can move directly to elliptic curves, and we already have good experience with elliptic curves, all the arithmetic there. I agree parsing should be verified. We can redo our road map for zcash, or maybe we can start with that. We should agreed.

Daira: 00:53:33  

Yeah, so I mean, I want all of the formal verification efforts to fit together, so for the the orchard formalization, so it isn't quite done yet, but there will be a formalization of the elliptic curve passing in compiliptic, but the piece that's missing is connecting that to the Rust code, that's what your approach is good at. So, yeah, have you kind of done work previously on connecting what you're doing to someone else's formalization of the high-level potocol

Natalie: 00:54:26  

The thing is, this specific approach, I mean, our pipeline takes Rust code, translates it to lean, and adds all the theorems, it's new. There is only one engineer who's been doing it with his team, very similar approach, who's very fine, very basis code itself, Oliver, and what was his last name, and yes, he's been verifying elliptic curve dialog, and they achieved really good results. Maybe we can give a word to Paulina, because she've been doing with different teams from runtime verification, can she participate in talk? I mean, Paulina and Juan, they both should be here, and Paulina is managing more teams. Oh, Juan,

Paulina: 00:55:53  

sorry. I hope you can hear me, and yeah, I hope you can see this. Also, it took a while to connect. Yeah, it is very nice meeting you. Thank you so much for having us. So, I, yeah, I do get the question. We honestly were hoping that we'll get a chance to present here, because we also wanted to synchronize with what you are doing, because we did see that there has been - there is some form of verification being done on the circuits, I think you guys are working with ZK Security, and maybe some other parties, and doing some work internally. So, we did want to make sure that what we do actually does fall into like a larger strategy that you do see for formal verification. Answering the question, part of what we have done with Ethereum Foundation on verifying the cryptography, as Natalie has mentioned, essentially is done with a lot of other partners, so they have essentially this Compoly and ArcLIB. I'm not sure how involved you are in that, but essentially ethereum Foundation has this whole initiative for verifying ZKVM implementations, so that is done in coordination with a lot of other parties. We have implemented a lot of formal semantics historically, but to be honest, was mostly done, I think, in collaboration with the developers themselves. So we rarely, I think, do have another company or some sort of party that is doing something similar in parallel, but we are very open to communicate and make sure that we do what  seems to be useful. So, I just think we'll be able to coordinate, but yeah, I do appreciate this question. It was also on the list of things that we wanted to check with you on about the budget strategy,

Daira: 00:57:45  

make sure that the different efforts don't get siloed, because then they're not going to be useful in the longer term, and yes, so Comp eiliptic is inspired by Compoly, so it's part of the same kind of ecosystem, but we're using clean for the second verification,

Paulina: 00:58:05  

Yeah, that is what I was thinking, and I saw in your announcements, which is a great tool. So, yeah, thank you. I think Juan

Juan: 00:58:13  

just wanted to ask, so, so this formalization work that you mentioned is this in lean as well?

Daira: 00:58:29  

Yes, most of what we're doing is in lean. There's someone working on in rock as well. So, yeah, some comp elliptic is lean, the lean is lean, yeah. The work I'm doing on connecting things to the high level security properties in lean

Juan: 00:59:13  

to answer your question, yeah, I don't think we would be siloing our efforts in this sense, actually I think that's one of the great strengths that Lean brings, and why you want to extract Rust into Lean. So, I think it should be absolutely possible in theory, and you know,  we have seen this to some extent, verifying some cryptography where you take the specs like not within your project, so basically you take a great effort of extracting the rust to lean, and then within that framework itself you can prove things but then, of course, you want to prove more interesting stuff with respect to some more sophisticated specs, so I think that's it's absolutely possible, and I think it's intended to, that you can just take your  extracted lean, maybe to convert it, depending on which reason you have to do, but you for can for sure some refinements, prove some equivalents, have like a some, you know, more prove amenable sort of representation while maintaining the the correctness guarantees, and then reason, you know, use that to connect it basically to someone else's formalization efforts. So, yeah, There's nothing structurally like forcing us to redo any work, and two, I think it should be fairly easy, or at least doable, to just connect to the other, you know, abstraction layers that people are using to do their formalizations.

Daira: 01:00:57  

Yeah, the other thing is  when the Rust code changes have you had experience on working on projects that have actively developed and want to keep the formalization working across code changes through factorings, API changes, and so on

Juan: 01:01:22  

yeah, so far we haven't had like a moving target, so it's has more been a sort of like frozen commit, and then you do the initial effort there, historically we have worked on moving targets, just not with this lean, lean effort, but with other  formal verification stack, but like in theory, there's also like again not like a structural blocker, if the semantics of the code changes are preserved enough, if a proof breaks, it should be relatively straightforward to fix it, especially with AI, so that can even be integrated in CI. Be like, you know, something broke, give the agent some time window. If it doesn't fix it, like, then it's like maybe there's some big semantic change that needs deeper inspection. So I think while we have not applied this specific framework, we do have the experience of formal verification in CI, and we do see a theoretical path forward for this framework in particular.

Daira: 01:02:27  

Okay. Thanks

Juan: 01:02:30  

Pleasure.

Pili: 01:02:35  

Thank you both. Any more questions on this grant proposal? I know our team, the Zcash Foundation team, still needs to review the grant, or probably I might ask some people to take a look at it next week. I think this week it's not going to be possible yet. Yeah,

Daira: 01:02:58  

very much heads down on the ironwood work,

Pili: 01:03:03  

yeah. Okay, any other questions? Okay, let's, let's move on. Any other announcements from anyone? No. Okay, open discussion. Is there anything else that we want to discuss today?

## open discussion

Daira: 01:03:33  

I don't know. Do we want to go back to the cross link discussion? I'm still a bit unclear on what happened in the first iteration of the testnet, because I mean, it's not trivial to run zcash testnet unless you have solid connectivity between the nodes. They do tend to end up on blocks, and I mean that property is inherited from Bitcoin, but Bitcoin doesn't work on small networks either , but nevertheless, when we've run private test nets, we haven't had that kind of fragmentation that happened on the crosslink testnet, so do you think that was due to the change on network layer?

Nate: 01:04:43  

It's so my understanding is that  it's not easy to pin it down to a single reason, but there were several things going on, one was we have been working on a new networking protocol, and that includes changes to how proof of work blocks are synced, and that may have had bugs or performance issues, but I'm not certain that was the cause, a different issue is that we had configured our nodes out of the box. When you turn them on, they begin CPU mining as the way to distribute CTAs, because we didn't. So there's a little, well, there's a little bit of tension, yeah, the reason we did that is we wanted people to be able to begin participating without needing to interact with a faucet, and then because we're doing these non discretionary rewards, having a faucet has some potential for problems, so that was a contributor, right. And then I think there were other issues

Daira: 01:06:20  

the difference in behavior with Zebra, where it just won't do 100 block rollback, but it can continue mining on its own chains. For example, it doesn't shut down, so it's difficult to recover it from that point.

Nate: 01:06:44  

I'm interested in talking about that design decision. I want to re-examine it. I believe Zcash D would halt either intentionally or unintentionally, but in either case it seemed like that other trade off may be safer, because when there's a fork, so if you surpass the 100 block rollback limit, but you keep accepting new blocks on your tip, you're still connecting in the peer network with other people on other forks and chattering about your blocks, but you will never agree or resolve things. I just.. I haven't pinned it down, but it feels like a bad or dangerous choice.

Daira: 01:07:41  

Yeah, it's just completely. completely wrong. We considered that design and Bitcoin ABC was proposing that design, and so that was years and years ago, and we looked at it and thought, no, that won't work, that is the wrong thing, because once a node has diverged onto its own 100 block fork, it's stuck there and nothing will recover it, so it doesn't shut down. Then we're doing the wrong thing. I really think that Zebra would change this behavior, in addition to changing it to 600 blocks instead of 100 blocks, it's been proposed in conjunction with the lowering of target block time,

Nate: 01:08:31  

I mean, since it's open discussion, I also question that increasing that rollback resilience, so it's because if I'm running a node, and I mean maybe there could be a configuration, but if I'm running a node and there's a rollback of x amount of wall clock time from my perspective, right? Like the last hour or longer gets rolled back, then I want my node to shut down and emit a big warning, saying, 'Holy, holy shit, you're maybe you've just been attacked, something is very bad, you, oh human, should figure out, you know, how to protect yourself versus just silently being like, oh, okay, let's just forget about the recent history, and like, do whatever someone else says is happening in the real world. To me, that event should be loud, because I need to know what's going on. It could just be that my network is misconfigured, which is fine. I just need to look into it

Daira: 01:09:48  

How it's supposed to work, so the steady state when a cross link protocol instance is working as designed, you have this parameter signal, which is the proof of work rollback that and  your finality should be only slightly larger than sigma, and if it's kind of, if you're getting on to quotes that are longer than that, then something is seriously wrong, probably with your network connectivity, because the proof of work security assumptions essentially assumed network connectivity, and so with crosslink, you let me think, what I want to say here. You, so your finality at your finalization point should never go on to the wrong fork, because if it has lots of violation of the 1/3 malicious node assumption of the BFT protocol, right. Okay, so when you have a fork, which is 100 blocks or whatever from the the common ancestor of your tip and the consensus network tip right your finality point will in practice be at that point at the common ancestor

Daira: 01:12:04  

because you haven't seen no, your finality point, it won't have gone down your fork, right? because in order for it to go down your fork and be different from the rest of the network, that would be a violation of the 1/3 malicious nodes security assumptions, yeah,

Nate: 01:12:38  

Just to clarify, the finality point could be prior to the split prior to the fork point.

Daira: 01:12:46  

Yes, it could,  So, okay, if you lost connectivity before the fault point, then yes, it probably will be slightly before the fork point, but not very long before the fork point, right, so you kind of know that you're on a fork, and you know where you must have diverged from,

Nate: 01:13:18  

you know you're on a fork if all of the if the finalizer network is available is making progress, but okay, so it is not precise.

Daira: 01:13:35  

to be more precise, you know that either you're on a fork or there's a finality stop, both of which are bad conditions, in which you should notify the operator. Right,

Nate: 01:13:47  

yeah, and they're both

Daira: 01:13:48  

impossible to go down a fork and not know about it, right. So, but it's a violation of the security assumptions.

Nate: 01:13:57  

This is an important aspect of crosslink that I want more people to realize, because what it does here is it changes a subjective guess about if you're on a fork or not, that that you must do, and proof of work into an objective fact that you can immediately determine from your local history, right, that either you're on a proof of work fork or finality has stalled, and the reason I want to highlight that is different people have different intuitions about a trade off, people often feel like a finality stall is bad, and that means the fact that it can happen means the protocol is not a good idea, and it's because  they want availability, but the problem is that introduces  an ambiguous safety failure condition, and all that Crosslink does is it makes that same safety failure condition objectively visible to your local node, and if there's a BFT stall that's visible to everyone, so it, in the way I'm thinking of it, is it's like this kind of safety failure can always happen, even if it's pure proof of work, all that Crosslink does is it makes it clear to everyone that something bad is happening, so that they can like figure out what to do. So I feel like that's a key difference in intuition or beliefs about trade-offs that I've heard across the ecosystem. So yeah, now tying it back into what you were saying, Dara, so it sounds like you were trying to relate

Daira: 01:16:08  

So the point is that,  the reason why we have a fixed maximum rollback roll back depth is that we don't have a  an objective finality criteria, right? If we do have an objective finality criterion, then you know when you need to roll back to, so that's no longer the problem, or should no longer be the problem, but you still need a depth at which you report to the user that something is wrong. Now we're currently, even on the testnet that you've created not fully, if I understand correctly, implementing all of the crosslink consensus rules, and also you have problems with validator availability, and so on, and those need to be solved first before you can kind of rely on the security properties that I'm talking about here, but once those security properties are working properly, you no longer have the problem with the Zebra has that the implementation is only capable of rolling back so far, because there's the separation between persisted state and ephemeral state. Okay, yeah, so that problem goes away. You now just have to decide, and this can even be a local decision by the node operator. How far do I want to go down a proof of work fork before telling the operator something was wrong, and then probably shutting down, so it's in some sense that is now less of a difficulty for the network as a whole and more of a local no configuration issue. Okay, I think that's what I wanted to say

Nate: 01:18:23  

That ball sounds good. There's a implementation detail that I'm not too clear on yet, which is, So Zebra has a fixed rollback limit. What we want is it grows dynamically, so that it always can roll back to the most recent final thing, but it doesn't need to roll back any more than that, right? 

Daira: 01:18:51  

It sounds like a solvable problem to me.

Nate: 01:18:54  

Yeah, it's just an implementation thing that we haven't done yet, which is why the current network is a mess

Daira: 01:19:00  

exactly, previously you didn't have that objective point, but there's nothing to stop you using that information to decide what you persist, so you just persist what's been finalized. It's that straightforward.

Nate: 01:19:16  

it sounds like we're on the same page with that part of the design. The other topic was automated slashing, but

Daira: 01:19:33  

Yeah, we did the operator and other people's patience, so we should probably stop that.

Nate: 01:19:45  

Yeah, It could be a topic at the R and D meeting, assuming there's not more pressing stuff, because recently there's always been more pressing stuff.

Pili: 01:19:57  

Thank you, Nate and daira Emma. Yeah,

Daira: 01:20:00  

thanks for having the opportunity to crystallize on that stuff and this was always part of the design, but you, you also need to be able to explain it to other people.

Pili: 01:20:14  

Thank you both. So, I believe Blake wanted to present something, so

Blake: 01:20:19  

Hello everybody, I'm gonna try to share my screen really quick. I don't know if you could grant me permission to do that. There we go. All right, so as many of you know, I'm still working on overpay.com It lets anyone buy anything with Zcash. You basically have personal shoppers that can accept Zcash and fulfill any order from you, or you can paste any item from Amazon, and it's fulfilled. But a problem I ran into earlier this year, when starting this, is it's a pain to use Zcash D, as we are all too familiar with. So, as a business, I couldn't afford to wait for Zcash D to get deprecated. Many people in this room have been working super hard at that, but I just had to move fast and essentially build my own server-side Zcash wallet. So, when the Zcash D deprecation timeline got moved up to, you know, hopefully very soon, I decided to start racing towards open sourcing this wallet, and that's what I'm announcing today. It just went public on the Zeck Rocks GitHub, and I'd love everyone's objective feedback on what we're calling ZecD. It's a Zcash D wallet alternative that is not aiming to be backwards compatible with Zcash D, it really is mirroring the Bitcoin RPC pattern, something that every crypto dev has a lot of familiarity with. It's fully stateless. All of the users' funds are recoverable from the seed phrase. All of the addresses are derived from the seed, and it only supports account zero. So, really trying to narrow the scope of what it means to host Zcash wallet. The only supported fund migration path, if someone were to want to move from Zcash D over to ZecD, is to send all the funds on chain, and we've been using this in production with Overpay, that's what's generating our addresses, but I took the design decision to not support transparent addresses for my business, but with the need for a second Zcash D wallet alternative to be open sourced quickly, I have begrudgingly built in transparent support, which is launching on a branch later today. We've really tried to design this to support millions of Zcash addresses, really be commerce scale. It's simple. It only communicates directly with Zebra. We have a really extensive reg test suite. Feel free to reference, like, put this code into your, your AI tools, and feel free to, you know, grab anything that we've written and use it on the things that this community is working on, and yeah, I'd love your objective feedback  on everything. Here we're really not trying to step on anyone's toes, but instead to just open source what we have already been using after a mad dash of cleaning it up. Thank you for the time.

Daira: 01:23:32  

I love the idea, and I think zallet should have some competition. Yeah, as competently written competition is good, I havent looked at the code, but I'm excited by the idea.

Blake: 01:23:45  

Amazing. Thank you.

Pili: 01:23:48  

That's great. Thank you, Blake. I know Gustavo has been playing around with wallet alternatives. I'm sure  when he has time, he would like to look at it and possibly give some feedback.

Daira: 01:24:02  

I am slightly sad about the compromises of supporting transparent addresses. Maybe you should have gone as well, but I understand the pragmatics.

Blake: 01:24:13  

So I am moving forward with getting a security audit objective, but the scope is the shielded side. I kind of have this philosophy that if people really want a secure, transparent implementation, you know that's not going to be used by my business, and it's probably something that someone else should pay to get audited. We'll see

Pili: 01:24:35  

any more discussion topics or announcements. We do have about five minutes.

Daira: 01:24:42  

Yeah, so I hear there is a proposal by Shielded Labs to kind of support Zcash D  past Nu 6.3 activation. To be honest, I think it's a bad idea. I mean, I've pointed out privately that the code developers are not going to take into account Zcash D'S were making decisions about fixes to consensus bugs, and that's because there's a huge simplification in having to consider  for that, I understand the argument for node diversification, but while we only have deeper on the network, we have an opportunity to make the the only supported node implementation on the spec completely consistent, especially given AI, that's a feasible amount of work, whereas if we have to consider Zcash D as well, then any divergence is a security bug that we have to respond to immediately, and it's just a nightmare, honestly.

Pili: 01:26:17  

Jason, you want to respond?

Jason: 01:26:19  

Yeah, I'll respond real quick, look, I think we want the same outcome here. I mean, we want to get Ironwood activated as quickly as we can, and we want all operators to transition to Zebra in a safe and timely manner. But, like, what we're trying to address here is, what do we do for mining pools, exchanges, other infrastructure providers that may not be able to make the migration on the current aggressive timeline, so we're not trying to keep Zcash D alive indefinitely. We're not even asking partners to adopt it. We're just, we're building what we call the zero stack. We're talking to partners to understand what they need to make the move to Zebra, and if temporary Zcash D compatibility within zero helps them upgrade to Ironwood while they finish the migration, it's something that we can choose to support as a short-term bridge, but right now it's just something that we're exploring. thats it

Daira: 01:27:21  

Now I'm even more concerned because you said mining pools, so if non-mining nodes use codes that is based on zcashD, that's one thing. I mean, I still think it's probably a bad idea for those nodes, but if major mining pools use zcash D, I mean we are not going to take them into account, but they can be a hazard to the rest of the network because we still have all of the problems that we've had over the past few months, where we have very capable AI binding divergences between Zcash D and Zebra, and if there's a kind of significant amount of mining power still using Zcash D, then that asset is going to continue to exist for months and months, whereas we have the opportunity now to close off that category of security bugs, and we should see that they 're both handled.

Jason: 01:28:08  

jason-Yeah,  the feedback that I'm hearing from some of the mining pools that we've talked to is that the timeline is just too aggressive, like they haven't seen the code for zallet, zalleet is still an alpha. 

Daira: 01:28:47  

well lets reconsider the timeline there, but let's not reconsider Zcash d deprecation. Let's reconsider the timeline for Nu 6.3

Pili: 01:29:05  

we just have one minute left, and I don't think we're going to solve that right now. So, I think it's best if we take this online, offline, because I do have to jump onto another call now. But I appreciate you both sharing your, your concerns and your point of view,  let's leave it there. If everyone's okay with that, I do know we have a minute, but I don't think we're gonna solve anything else. Daira  you want to say one last word?

Daira: 01:29:34  

I feel quite strongly about this, because especially the software that is being run by mining nodes has a huge effect on the overall stability and security of the network, and we need to have a social consensus about what's going to happen, but I've said my piece.

Pili: 01:29:59  

pili-Thank you daira I'm going to call it. Thank you, everyone, for joining and participating. The next arborist call will be on the 9th of July at the same time. Now, no more calls at 21 UTC, so I will see you all. Thanks, everyone.

Next Meeting Scheduled: 9th july, 15:00 UTC

