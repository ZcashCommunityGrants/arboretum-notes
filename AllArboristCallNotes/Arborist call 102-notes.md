
## Arborist Call #102 Notes 


Meeting Date/Time: may 29 2025,15:00 UTC

Meeting Duration: 47 minutes 

Agenda:

Welcome and Meeting Intro 

Zebra update [z3 stack, zcashd](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Qedit,zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-i--qedit-zcash-shielded-asset)/ [shielded labs, Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-i--qedit-zcash-shielded-asset)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=AIpl7mfZYK0&list=PL40dyJ0UYTLJqD_3PE9qiJTxse-iHnn1G&index=1)

Moderator: Pili guerra

Notes: chidi olisa

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:00:00

Okay it's 15 UTC already, so yeah, I'm gonna get started with the preamble at least. So, usual reminder, this meeting is going to be recorded and it's going to be uploaded to YouTube. So if you're not comfortable, please turn off the camera or you can also mute the session. So can we please start the recording now? Whoever's recording  There we go. So welcome. Today's Arborist call is happening on 29 May 2025. Here's the agenda. As usual, we'll start off with some updates from the teams working on the new zcash stack, so the zcash foundation, the Electric Coin company and shielded Labs. And then we're going to follow up with some research and implementation updates from Qedit, Shielded Labs and the Electric Coin company. And then finally we will open the floor for any announcements or any other topics of discussion that might be interesting to the participants and the wider community. So what is the Arborist call? It's a bi weekly call where zcash protocol contributors meet up to discuss and  analyze  protocol research and development efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. And the purpose of this call is to try to make zcash protocol development accessible to interested parties and just provide transparency for everyone. If you want to attend, you can register@zcasharborist.org and if you want to present during this call, you can email us and request a presentation slot and will add you to the agenda. Outside of the Arboristcall, you can participate in the zcash community in a number of ways, such as applying to one of the grant programs. And you can also take part in community discussions in the zcash Discord or the zcash Community Forum. And there are clickable links for all of these at zcasharborist.org ,so let's get started today with some updates on Zebra from the zcash Foundation's engineering team, who's represented by Marek today. Take it away, Marek.

## Zebra Update

marek: 00:03:45

Thanks, So as regards Zebra, similar to the past few months, a lot of work went to the RPC required for zcashD deprecation. Then we're still working on supporting shielded Coinbase transactions and we updated our process for doing Hotfix releases and we continued to work on moving the Python test span from zcashD to the z3 stack. We started initial work on sorry new 6.1 and the last thing I have here is putting the z3 stack into Docker.

Pili:00:04:59

Great. Thank you Mark. Any questions for Mark? Otherwise we can move on. Let's move on to the electric coin company with zcash D core libraries and zallet and I think we have str4d on the call today.

## ECC Update

Str4d: 00:5:13

Yep so since the last arborist call last two weeks we  were working on a variety of things. As usual, a fair bit of PR review on a number of open fronts, changes from third parties that have been proposed for librustzcash changes need to be pulled into the various mobile SDKs. Changes over the mobile SDKs as well. We made a bunch more progress on zallet in terms of testing its usage and thanks to previous bug fixes being merged into Zebra and Zaino that we had previously found, we were able to get further into the initial zallet testing that has now cropped up another round of Zebra and Zaino bugs that we opened various issues and PRs for that has. Let's see what else got Zview transaction in its initial form we are considering altering slightly altering the semantics of zview transaction where in zcashd it was documented as showing all the detailed information about a transaction in your wallet, but the behavior of it was that because it was the easiest thing to implement in zcashD and also due to how ZcashD stored the shielded information, it just stored it within the original transactions and decrypted on the fly. That meant that zview transaction also decrypted things on the fly. But with the new with zallet having like a full wallet database backend that stores the decrypted information visibly there, we are considering instead just providing a view over the information that has already been decrypted for transactions in the wallet. So it's still information about transactions in the wallet, but there's a slight difference in terms of view. Like when you can see that information in the ZcashD implementation the moment you import a viewing key, API would be updated to show everything that was present in the transaction even if the wallet state didn't reflect that information, say for balance purposes because a rescan hadn't happened at the moment, the same thing is in the case and what we've implemented in Zallet, but we are considering changing it to just show what's in the wallet backend along with changes to speed up how quickly the Wallet Backend reflects these kinds of changes when a new viewing key is imported. So that would mean that there's hopefully only a slight delta in semantic change, but it is something that would be documented if that occurs. What else? Ok, that was just bugs and things. I think that was most of this last week. Yeah, was just like Zallet things, there was work done on the Zewif changes. kris has been doing a lot of work with the Blockchain Commons people on enabling the zewif changes to be usable in zallet, which has resulted in a lot of patches and PRs to the Zewif changes. It sounds like that's getting  into a pretty close state . I think he's now got a draft PR up on Zallet that you can use to take an existing ZcashD wallet and turn it into a Zallet wallet. So that's very exciting and I expect in the next few weeks we'll be putting that through its paces and enabling that to get into zallet. And then this week the core team has been on site with Sean Bow doing work on Tachyon. So a lot of in depth. I think we did three days of 12 hours solid of R and D, so my brain is a little frazzled. But no, some very exciting stuff happening there. We've made some good progress on some fronts, discovered some more issues in other areas, and the roller coaster continues to run. And yeah, some very cool stuff going on there and it was really good to sort of really get it all onboarded into our brains so that now subsequent collaboration Async Online will be much, much easier going forward. Yeah. And so yeah, that's about it on our side, the other thing  that I'm adding to the Rust crate, so specifically the zcash client backend Rust crate that has the Tor API through which you can do like lightweight connections or getting the current zcash exchange rate to USD sort of in a private way. The latter. The exchange rate stuff under the hood uses HTTP get requests over Tor. I'm now exposing a Rust API for directly doing those HTTP get requests as well as post requests, which will mean that people can now use that to specifically do API queries over Tor to sites if they want to do so privately or say they're using an SDK for something that just has an HTTP server. You'll be able to use that, most of it is still managed for you by  the zcash client backend APIs, but this will now be a thing that you can do with that,  that's everything we've been working on in the last couple of weeks.

Pili: 00:11:02

Great. Thank you, Strad. Any questions? Alfredo?

Alfredo:00:11:12 

Yeah, I have a question for str4d. Let's see, but I'm not sure if this is the right time or you want to go with the updates first and talk later.

Pili: 00:11:21 

It depends if it's going to spark a long discussion. We can leave it for the discussion portion of the interview. Yeah, let's leave it for the discussion. Thank you. Cool. So next stop is zingo Labs 
Who's speaking today? Do we have arlo?

## core stack updates zingo labs zaino

Arlo: 00:11:50 

Yeah, I'm here. I've been quite a while the last week and haven't. So I'm not very caught up on where exactly we are. So in terms of Zaino,There's been a few issues we've been working on. Propagating errors has been one which I think we're getting close to having a fix ready to merge. There have been a couple other issues we've been working on. We've also been working on testing, I think running the zcashd RPC tests. So we can make sure that we are properly implementing all of the RPCs that we are implementing, we've been reworking the local cache. There are a few PRs now waiting for review and should be close to merging. So we're getting closer on that. Yes. I have been kind of out of action this week. I'm just trying to work out what's actually going on. I know outsiders know Zingo Labs also released Excavator V0 this week, so that is kind of out and ready for initial testing and use. Yeah, sorry that I have more information. I was hoping there'd be someone else here as well.

Pili: 00:13:26 

No worries. Cool. Well, let's move on to zcashD deprecation updates then.

## zcashd Deprecation updates. Ecc, zf, Zingo labs, Pacu

Pili: 00:13:28 

Some of it may have been covered by the actual updates, but just to recap from the foundation,  we're just working on finishing off the last few bits that are missing from the RPCs. And also we've been looking at testing the new stack using the RPC testing framework. Alfredo's been doing a lot of that and then Gustavo's been looking at packaging everything into a single Docker image and then we're starting to finish up these pieces and we're available to jump in and help with implementation of zaino, zallet features if needed. So if you have anything you'd like us to look at, then please let us know and we can get started with that. Does anyone else want to add anything in terms of zcashd deprecation updates? Maybe pacu? I'm not sure.

Pacu: 00:14:30

Yeah, sorry, I lost my airpod somewhere in the house so I don't know how I sound. Apologies..

About this excavator, If you're listening to this and wonder what that is, it's utility is to excavate zec from wallet files or different wallets. So if you have a Zec wallet file for example, please check out the Excavator repo in the forums. We'll try to provide some links for the note taker for the meeting notes, but it will be very helpful that anyone with an old wallet file that is compatible with this excavator like six SQLite Vit files can test it out. Since there are a lot of frugal wallets out there and it's difficult to actually donate them for development, I bet there's going to be a lot of debugging  and things like that, like user testing with real wallets. So please give it a try. I already have. It's pretty cool and simple to use. You know, it's a terminal thing but it's not complicated to actually run it. And yeah, that's like the Sunday church announcement for that. I am starting to work on the Block Explorer thing and I got it running and I'll start trying to use it with zebra and Zaino and see how it goes. So that's like some progress out there. And that's pretty much it in my end.

Pili: 00:16:42 

With Block Explorer I know there's some RPCs that we haven't implemented, so it'd be great if there are any that you think are really key. So for example I can think of get network info and Get Info we've not really implemented and we begin to know exactly what I think also ping and I think we've implemented get info but Ping get network Info I think are quite similar. We haven't implemented them yet, so it'd be good to know if there's anything that. What's the minimum amount of work we can do to get the Block Explorer?

Pacu: 00:17:16

Yeah, I'll try to start by commenting things out and see how it can stop exploding, something like that and then take it from there. I think that will be useful and I think that Alfredo has already gone that path a bit as well, but a long time ago. So we're definitely. I hope there's less.

Pili: 00:17:40

Sounds great. Thank you, Pacu. Anyone else want to share anything or we can move on to research implementation updates? Go ahead, Alfredo.

Alfredo: 00:17:50 

Yeah, so I have an open PR in Zebra that extended QI test with zallet. So an atomic test there that runs Zebra runs zallet with Zaino that's kind of working. When doing that we realized that we have a missing RPC method which is at node that will connect nodes between themselves to run those tests, which I think sounds useful.Tthat we don't have, So we need to implement that. And another kind of thing that I didn't decide yet that I wanted to ask Str4d is about, I need to put an address, the miner address inside zallet. I was thinking of following , by using the PR that kris submitted for the import.

Str4d: 00:18:44 

So the eventual way to go about that, the way that the ZcashD did that is that that the ZcashD wallet generated the miner address and then if necessary, that miner address was then loaded into the zcashd full nodes config for the particular tests that were testing like the miner address config. So that's what will end up happening with zallet as well. You'll be generating the miner address in zallet and then pulling it out that way. If there are tests that do require loading addresses into a different node, which I think maybe some of the minor tests do, I can't quite remember. Those will be where one of this probably one of the existing RPC method queries on. If I look at the zallet repo, there's probably an open issue there for a missing RPC method that is the one that you would need to use.

Alfredo: 00:19:40 

So what do you think would be the faster to add the minor otherwise.

Str4d: 00:19:47 

For what's available right now, the fastest thing is probably going to be, like what you're blocked on is issue 56 import address in. In zallet at the moment t

Alfredo: 00:20:00

Can you put the private key in that method? I don't remember.

Str4d: 00:20:16

If it's the private key you're trying to import, not just the address, then that's issue 57 import PR import priv key. So neither of those currently exist. They are things that are going to be able to exist once kris's PR for doing ZcashD Wallet import exists. If you need to work around it in the meantime, then I guess you could try and use kris's import thing to create a Zcashd  wallet and migrate it in. But  that's a lot of things that you could stack on there. When instead if we just get import PRIV key implemented, then that should. That's probably the thing the RPC tests are already using if they're not already just generating the address in the node and extracting it that way.

Alfredo: 00:20:58 

If you want to import private key, it's kind of the same functionality that zcashD does in zallet or it's more complex.

Str4d: 00:21:10 

The. The intention is that it would be the same API. That's right.

Alfredo: 00:21:20 

If you want to implement it, you need to put stuff into a database.

Str4d: 00:21:23

Right, and that's the thing, that's why I said, what 's been blocking on why we haven't done that, why that hasn't been done yet is that there were changes to the back end being done as part of adding the migrate ZcashD wallet command. So the currently open PR 152 has a bunch of the backend changes that will also enable implementing the import PRIV key method.
 
Alfredo: 00:21:48

thank you. That was my question from early before. I think it's pretty clear. Thank you.

Pili: 00:21:59

Great. Anything else on zcashD deprecation.

Str4d: 00:22:02

I mean just the same thing  as you said before, but on the zallet side, there's plenty of stuff to implement and if people are interested in contributing, then just ping myself or Chris. So come on the Zcash R&D discord and we can point you at a particular thing that would be useful to implement and that specifically is not blocked from being implemented right now. There are, you know, a lot of the things there are. There's somewhat of an ordering of getting them in because they depend on functionality that the mobile wallets didn't need. So we're having to add that functionality as well. If you're interested in helping add that functionality as well, then even better. So just let us know.

Alfredo: 00:22:39

Yeah, I will let you do that, If you can send me some links to work on.

Str4d: 00:22:44 

Yeah, we can. I'll find some ones that are non blocked and I'll ping you in the. In the R and D discord.

Alfredo: 00:22:52 

Cool, thank you.

Pili: 00:22:56

Great. Thank you both. Let's move on, shall we? So next up is Research and implementation updates starting with qedit today. Who's that? Is that Vivek today or Pablo?

##  Research & Implementation Updates i- Qedit, zcash shielded asset

Pablo: 00:23:10

Hi guys I would like to share the screen.

Pili: 00:23:13

Oh nice. Can you try sharing? Of course, my screen share. You should be able to share also.

Pablo: 00:23:26

I send the requests.

Pili: 00:23:33

Okay, I'll stop sharing,try again.

Pablo: 00:23:35

So yeah, we did some interesting updates across the entire stack in order to promote the implementation of zsa. And I want to go over recent things. So first of all we opened the small PR to the zips. This one is relatively scoped and it fixes some terminology. It is not as wide as the previous since most of the ZSA stuff has already been merged to the zip repository. So a small PR for Zips. Next we have a PR open for Halo 2. This is basically a PR to set the groundwork for Zsa. It's not the entire content of the ZSA changes, but it's a preparation. This one was reviewed and approved by Dara Emma and is still waiting to be reviewed by kris and Strad. But it's ready. It looks very good. We did a couple of iterations with the ECC team and it looks almost ready to be merged pending final feedback. Next one Next one We have a discussion going on around the Orchard ZSA implementation. So this one is a significant amount of change. We started this discussion with the ecc team and we are waiting for additional feedback on how to go forward. Next  we also did a review of the Quantum Resilience draft PR from Daira Emma, we are actively looking, this is in progress. We posted the comments, they are there. Whoever has the access can have a look. Next I wanted to show how propagating a change look like from the ZSA point of view. So this one is a simplified diagram of the stack. Many things are omitted here, but it gives some sense of what is needed to propagate the changes. So we have LO2s node encryption. Sapling interchanges  that we do here and here of course needs to be backward compatible with sapling, meaning transaction before Orchard, ZSA on top of it, Librustzcash and Zebra. This is the official zcash stack. On the side we have txtool generating transactions in order for us to test the ZSA functionality of Zebra. Zebra is just currently not attached to a wallet, so we are generating the transactions again based on the changes in Librustzcash and Orchard using the TX tool. So the Zebra so the Zebra node can digest them and basically every change needs to be propagated across the entire stack. So for example, recent changes to node encryption are embedded inside of Orchard but not yet embedded inside of Librustzcash, Zebra and txtool. Some of the changes like from recent time the change from Asset Description to Asset Description Hash. We also update the Python reference implementation in order to provide relevant test vectors, whether it is for Orchard or to Librustzcash. So some of these changes need to be also propagated to the Python reference implementations and some are not. Some areas are not tested by the Python reference implementation, so it's redundant. Every change needs to go the entire route. For example asset description changes. We already did it for our working version of Orchard ZSA and currently we are embedding this in Zebra and TX tool. So every change needs to go all the way. It's metrics that we are following to make sure that every change is propagated throughout the entire stack. For example, for Memo bundles, the current discussion is that Memo bundles will be implemented on top of Orchard zsa and this can be done either by us or by ECC team. If it is done by ECC, they will end up implementing Memo bundles on top of Orchard zsa. We still need to make sure that Zebra and the TX tool support the modified version that includes the Memo bundles. So some of these parts can be covered by other teams as well. This is part of the cooperation collaboration. Next, So this is like an overview look at the changes. Next, Just a couple of hours ago we created the first PR for Zebra. So at the moment we have a working version of Zebra that can verify ZSA transactions ZSA transactions meaning v6 transactions that include the same bundles. So we created the PR for Zebra first of all to start first of all to get the help of the zcash foundation team in reviewing this PR. So we are not ending up in one huge chunk of work dropping on zcash foundation and trying and letting them understand what's going on. So this is a smaller piece of work. So we will be getting the help of zcash foundation in review and of course the embedding of immediate feedback for these pieces of code aside, this PR is not directly mergeable for Zebra and the reason that it is not mergeable is because it is based on Orchard ZSA and Librustzcash ZSa  version, which are not yet merged to upstream, meaning that even if we wanted, even if we are in agreement on the implementation with the zcash foundation team, we still cannot merge it until Orchard ZSA is merged to upstream and Librustzcash is merged to upstream side with any side packages like Halo 2 that we're currently omitting for simplification. But still, this is important to us because we want early feedback from the zcash foundation team and we want to embed the feedback into the changes as we go and not wait until the end. So this is for the Zebra pr. And finally the final is that a significant amount of effort is put on our side to catch up with the recent changes that were done to Librustzcash. It's a significant amount of work being done by the ECC team and we are. Our work is to catch up, put out changes, basically on top of these changes. So this is what we are focusing at the moment, beside other things. That ends our update, our technical updates for this week. I will stop the sharing and of course, if there are any questions, we are open to questions.

Pili: 00:31:42

Thank you, Pablo. Any questions? So if there are no questions for Pablo, we'll move on to shielded labs and the network sustainability mechanism. Who's presenting?

## Research & Implementation Updates ii- Shielded labs NSM


Jason: 00:32:22

Marius, you want to go?

Mariusz: 00:32:24

So, regarding the network sustainability mechanism. So last week I rebased the Zebra PR for the Zip 243 implementation and it is now blocked by the Librustzcash PR because it depends on it. So the Librustzcash PR must be merged first and. Well, basically we are waiting for reviews for those two peers.

Pili: 00:33:02

I think we already reviewed the Zebra one. So are you looking for.

Mariusz: 00:33:07 

Yeah, yeah, yeah.

Jason: 00:33:07 

Well, there's three, right? There's Librustzcash, there's a Zcash test vector, and then there's the Zebra Zip 233. So what's. What are you saying is still outstanding?

Marusz: 00:33:28

Sorry, could you repeat.

Jason: 00:33:32

Just so that they're clear on what's outstanding, which are still pending review.

Mariusz: 00:33:38 

Librustzcash PR is still, and zcash test vector. Those two are still under review.

Jason: 00:33:50 

Okay. And that's something that ECC has to review, Kris or is that something the foundation can review as well?

Pili: 00:33:54

I don't think we were planning to review those. I think we can take a look, but we're probably not the best people to review those.

Jason: 00:34:03 

Okay, then we can follow.

Str4d: 00:34:06 

Are you referring to 1567?

Mariusz: 00:34:09

Let me check the number. Yes.

Str4d: 00:34:13

Okay. The burning one. Yeah, so it looks like kris did review it with some blocking comments. And then, yeah, two weeks ago it looks like those were maybe addressed. And then, yeah, like as you heard in the update, we've been busy the last two weeks, so I'll bring that back into the stack of things that need a re review.

Jason:00:34:36 

Okay, great. And then just so we're all on the same page. So once those are reviewed and since the zcash foundation has already done its review, then we can get zip 233 merged into Zebra shortly thereafter.

Str4d: 00:34:56

From our perspective, once it gets through into Librustzcash, then yeah, it'll be in  the next great release after that which is obviously behind the zcash unstable flag. So that doesn't fit current consensus, but yeah, it'll be there and therefore available for downstreams to use in unstable form.

Pili: 00:35:18

I think from the zebra side, I want to be clear first of whether we can merge it without any kind of. I don't want to make any assumptions about what's going to be going into NU7. So if we can merge it without saying that this is definitely going into NU7, we can do that..

Str4d: 00:35:43

as if it's depending on how. Because I've not had any time to look at the zebra PR for this. Yeah, but if it is feature flagged and config flagged off, then behind unstable flags, then there should be no problems with. With things being mergeable because merging into an implementation is not if it's still unstable. The thing is, there's nothing said about it actually going into a network upgrade at that point, but having it in there just makes it easier for testing the candidate for NU7. So yeah, the NU7 determination is always when the mainnet activation height is set. We haven't set that. Therefore we can make whatever breaking changes need to be made after that point. It's mostly just what's easier for you to manage in terms of like you're rebasing a side PR versus maintaining it in. You know,  that's up to you to decide on.

Pili: 00:36:44

Yeah, no, I think we would merge it given that with those caveats. Yeah.

Str4d: 00:36:48

Yeah, exactly.

Pili: 00:36:53 

Mark, you wanted to say something. I think you were just reiterating, that it is mergeable and that we can. We can just do that with no guarantees as to what's going on in Nu7 or other ones . Great. Any other questions or comments on the Nu7

Mariusz: 00:37:10

Just from my side. So the Zebra PR is not under the Zcash unstable flag. It is. All the changes are under the feature  v6 flag.

Str4d: 00:37:23

So it is not behind any unstable flag at the moment. Yes, that is a problem. Because it cannot be merged  Into anything that would end up in a consensus upgrade that could potentially affect the consensus rules. So put it this way, if it is not behind an unstable flag, then the review needs to be gated on ensuring that anything that is present cannot be enabled in a production Zebra node on mainnet zcash. Otherwise that will result  in a mainnet fork, and that is unacceptable for pulling in unstable changes.

Mariusz: 00:38:08

So basically everything should be under the same zcash unstable flag as in the Librustzcash pr, right?

Str4d: 00:37:58

Yes. Yes, because otherwise you'd also end up with compilation problems in that case, if it's depending on things that rely on the unstable flag being present. So yeah, separately from the aforementioned thing, it would have compilation problems if it's not behind that flag. Behind that config flag here.

Pili: 00:38:35

Go ahead, Marek.

Marek: 00:38:36

So it is behind a flag, but not the specific one. And I don't think we have unstable sort of flag in zebra.

Str4d: 00:38:54 

So. I'm having trouble hearing you, Marek. Is there a microphone problem?

Pili: 00:38:59

You're a little bit muffled.

Marek: 00:39:03

Yeah, sorry, I didn't want that. Is this any better? No.

Str4d: 00:39:06

A little bit.

Marek: 00:39:10

Yeah. I would think that we don't have any official unstable flag in zebra. The current NSM implementation is behind a flag, but.

Str4d: 00:39:24

Okay, but it is behind a flag though.

Marek: 00:39:27

Yeah.

Str4d: 00:39:29 

Okay, well then in practice that means that it is behind zcash unstable because you won't be able to compile it behind that flag without also enabling zcash unstable for the Librustzcash pieces to be compilable. So I think in practice that means that we're fine.

That allays my concern.

Jason: 00:39:47

Based on my recollection from talking about this with Dodger, like back when he was at the foundation. Is that the reason we didn't feature Flag It was because Zip 233 requires a transaction format change. And so I think that there was a way that he was comfortable including it, but not necessarily the functionality associated with. With it, that is the burning.

Str4d: 00:40:25

As long as the format change itself also essentially needs to be flagged off so it can never hit mainnet consensus code in production Zebra deploys. So if that's the flagging that you're relying on, then that should be fine.

Pili: 00:40:29 

Alfredo?

Alfredo: 00:40:30 

Yeah? Is the flag they say the name is a Nu 6. Is that correct?

Pili: 00:40:39

It shouldn't be NU6 because we've already deactivated it.

Alfredo: 00:40:43

Marek said that.

Alfredo: 00:41:10 

What I was thinking on is that there must be other things in the future that go under the same flag. Should we have an NSM flag instead of transaction v6 flags for this?

Str4d: 00:41:22

That really just comes down to whether we think that we may need to split this off later. That's less of a concern because , if a split off ever happens  before NU7 decision is made, then that flag can be swapped in later for the things that are currently behind the V6 flag. As long as it is all behind a flag that is currently consistent and stops it hitting production, then that's the only concern that I see,let's take the rest of the flag related discussions offline so that we don't derail.

Jason: 00:42:00

I just have one other question about NU 7 and  that's something that going back to what Str4d said about you know, an activation height hasn't been determined yet. And you know, up until that point we have time to determine what is and what isn't going into NU7. And so I guess the question is what is the timing around that? Are we talking like three to six months? Are we talking longer? Are we talking next week?

Str4d: 00:42:29

We have had that Conversation discussion plenty of times in the past, so I don't want to rehash that all directly here, but the general thing there is that when I say that we can change anything, I mean anything in that the ability to change things is locked up once we have a mainnet activation height in practice we will have made the higher level decisions on broad stroke spots going in a reasonable amount of time before that point. So before test activation height and that ties into audits and things as well. And in general, at least in the past, when we found things that need to change after test activation height, we will make those changes because  we still have the capability to do so. Because testnet globally is like the consensus for testnet is that it is allowed to be rewound. In zcashd's case we have various flags, things that basically lets it rewind to some pre activation state if necessary to undo an earlier testnet activation. I don't know how Zebra handles this at the moment, whether it requires blowing away the state entirely or if the RocksDB for testnet has support for that. But prior, at least up until now, it's been generally understood that it is okay to roll back testnet to be able to fix bugs that we find, because that's the whole point of testing. But those bugs have to be found prior to setting the mainnet activation height. Because once you have set the mainnet activation height, which means defining it and cutting a release that includes that height, then it is possible for people to run that code and follow that upgrade. So at that point you are now defining a different upgrade that may fork prior to it and replace it. But you have to find that upgrade.

Jason: 00:44:32

Okay.

Pili: 00:44:35

Thanks. Let's move on to Crosslink, who's presenting on that today?

## Research & Implementation Updates iii- shielded labs and ecc. crosslink trailing finality layer 

Mark: 00:44:40

I can present on that. The big news is that we finished our second milestone on our roadmap. Yay. That means that there is a one way link from the proof of stake chain to the proof of work chain. And on a technical level that means that the proof of work header, no, the proof of work hash of the block that we think is final is voted pre committed all the BFT related things with an actual network and stored in the block headers of the proof of stake blocks. So that is sort of a one way link. And then next milestone we're going to complete the other part of that bridge. And that's where we first start touching consensus on the proof of work chain. We'll plan another demo at some point. We had a workshop demo in the zcash global discord that we felt went really well. We were able to mine and create blocks with real participants with a proof of authority roster. So that was really cool. And we have been busy talking to staking partners as well. Large, medium, small, very scrappy, very institutional staking partners all across the board and getting feedback, the biggest feedback of which is that we need to figure out our tokenomics design. So we're putting that at the top of the priority list as well. Let me know if you have any questions. Otherwise, keep an eye on the forum for more updates.

Pili: 00:46:22

Thank you. Mark, any questions?

Str4d: 00:46:34 

I don't want to open too much of a can of worms here, but what are you meaning specifically by tokenomics?

Mark: 00:46:42

Delegation, Staking, Slashing.

Str4d: 00:46:48 

How the staking and slashing components of this work. Yeah, thanks.

Mark: 00:46:53 

Yeah, yeah. It's worth noting that we're in a sort of a unique position where 16 million coins have already been mined and we're sort of late in the issuance schedule. So there's no real precedent for a design that takes that into account. So we're sort of tossing some ideas around. But I think for the prototype, we're just going to aim for the most basic kind of rules possible, just so we can get something out there for feedback.

Pili: 00:47:26

Any other questions? Okay, does anyone have any announcements today? Any discussion? Last chance. So that's it then. Thanks, everyone. Yep. The next arborist call will be on the 12th of June at the later time of 21:00 UTC,  So see you all then. Thank you. Bye for now

Next Meeting Scheduled: june 12, 2025 21:00 utc

