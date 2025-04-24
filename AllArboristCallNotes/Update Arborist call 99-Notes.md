# Arborist Call #99 Notes

Meeting Date/Time: April 17 2025 21:00 UTC

Meeting Duration: 01.07.00


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Update - [Zebra](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#1-zebra-update--) 

+ ECC Core Update - [zallet ,zaino,crate releases,zcashd,core libraries](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#2-ecc-update--) 

+ Research & Implementation Updates - [ZSA,](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#3-research--implementation-updates-ii-qedit--zcash-shielded-assets) / [NSM update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#3-research--implementation-updates-iii-shielded-labs--network-suatainability-mechanism) / [crosslink deployment updates](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#3-research--implementation-updates-iv-shielded-basd--ecc--crosslink-trailing-finality-layer) / [frost](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#4-research-and-implementation-updates-v-zcash-foundation--frost)


+ Open Discussion - [quantum ressiliency](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#5-open-discussion-ii) 

___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=MBU-wfZM2a4)

Moderator: Decentralistdan

Notes: chidi

___



## Full Notes

### 0. Welcome & Meeting Intro - 
DAN: Okay, hello everybody and welcome to the Zcash Arborist call on April 17th. On the agenda today we have Core Stack updates from the zcash Foundation, ECC and ZINGO Labs, research and implementation updates from QEDIT, Shielded Labs on a few topics and the zcash foundation, and then a section for open announcements and discussion. What are Arborist Calls? Arborist calls are bi weekly calls where zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. The purpose of the arbortist call is to make core zcash development accessible for a wider set of participants and provide more transparency for the community at large. Anyone can participate, Anyone interested in learning about the Zcash protocol development can register at zcasharborist.org and if you would like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot in the future. Other ways to get involved in the zcash Ecosystem, we have zcash Community grants. You can check out what they have going on both on the forum, x and zcashcommunitygrants.org there's the zcash R & D discord the zcash community forum, and you can find all these links by going to zcasharborist.org and kicking us off. We have the Zcash foundation presenting on Zebra as part of the Core Stack Updates section.


___

### 1. Zebra Update - 
Aria: 00:02:00

since the last Update we've merged PRs that fixed an issue around Zebra attempting to overwrite user mounted config files in a Docker environment fixed an issue to allow for running the tip height and copy state commands while another instance of Zebra is running and using the same database directory to More closely match Zcashd's get address transaction IDs RPC by making the start and end heights optional and the getrawtransaction RPC by adding several more of the missing fields to its verbose or object formatted output and the get peer info RPC by adding inbound peer information. We also removed the GetBlock template RPC's feature because it was just superfluous, merged in a V6 transaction variant behind a feature flag and in flight. We also have work being done to deduplicate the logic that's common between Zebra and the sensimilla crate, restore the internal miner match zcashds get address balance RPC more closely by adding a received field to the output and adding value pool information to the GetBlock RPC's output.

DAN: Great, thank you. Arya. Any questions on Zebra? All right, we'll jump to the next update from ECC regarding zcashd core libraries and zallet.

____

### 2. ECC Update -  
Kris: 00:03:20

Okay, so the first bit of news is zcashd. There is a new release out today. There's about, I don't know, 8 or 9 days left before the current ZcashD 610EOS halts and so 6.2.0 is published to all the normal places, the app repository and Docker hub as of today. So if you're listening to this call, it's time to upgrade your ZcashD. The other thing that has been happening in the past couple of weeks, we have merged a bunch of functionality to zallet that brings us much closer to our functional alpha. The last remaining piece there is getting zips working and that is currently in progress. The other major effort that is in progress on Zallet is decoding and migrating wallet data from the ZcashD Wallet.DAT format via the tools that the Blockchain Commons folks have built for their Zewif Wallet interchange format. The ECC core team is heavily involved in making, updating and tuning what they've done for that wallet interchange format. And so that's still going to be an evolving process for the next few days, but hopefully, I'm going to say a week or so, certainly by the next arborist call, we should have the rudiments of ZcashD wallet migration and the ability to then sync and send from that migrated Zallet wallet implemented. there's also a bunch of work that Strad's been doing on updating our own upstream crates in the crypto ecosystem. So the ZK crypto crates for you, groups and so forth to the new rand crate or new new randomised crate release. Strad, is there anything else that I am forgetting.

STR4D:00:05:57

as far as It affects zcashD core libraries and zallet? I don't believe so.

KRIS:00:06:06

DC asked a question about 6 2 0 removes create raw transaction.  Well, I think at present it is simply deprecated. It is not removed. But we do plan to have a mechanism for partially creating and updating transactions, but that will be done via pieces of teas.

DAN:00:06:39

All right, thank you Kris. Any questions from panelists or in the chat? Let me double check. Okay, we'll jump to the next topic. Do we have folks from zingo here? It looks like thats a no if anybody joins, we can circle back. Or does anybody want to say anything about Zaino in general?

___


### 3. Research & Implementation Updates i) zingo labs- zaino

Kris:00:07:12

we've been working pretty closely with the Zaino folks to sort of figure Out the impotence mismatches between what we were expecting for zallet and what Zaino currently implements. And I think that we're making forward progress on a sort of a common path towards having a nice set of APIs and the proper separations between Zaino and ZebraD and so forth. So lots of interaction between the different entities in the ecosystem is happening right now.

DAN: Yeah. Cool. Thank you, Chris. Next up, ZSA is from Qedit. I see Pablo up here.

___


### 3. Research & Implementation Updates ii) QEDIT -Zcash shielded Assets

Pablo:00:08:04

Hi guys. So we are getting closer to finalizing everything needed for the zips, for the for the ZSA zips. We had a nice discussion with the ECC people this week to close the last bits of these zips. At the same time we are also having the reference implementation prepared and there as well we need to do these final touches for the reference implementation. We got this week's review on the Sensimilla crate and our PR for Halo 2. We also got a review from ECC, initial review on the Orchard crate. The Orchard crate is quite large, quite extensive. The changes required for ZSA are quite large. So at least we started this discussion. I also responded to this initial review today. This is for zsa, so we are getting closer. At the same time we are doing atomic swap work. So basically we prepared an atomic swap version of Orchard where unlike Orchard ZSA, where we have one action group for atomic swap, we allow multiple action groups. Every participant can send the action group and then it is combined all together into one bundle in the atomic swap version of Orchard. So we prepared the branch for this and it needs to be propagated all the way up. Meaning we also have a Librustzcash branch for atomic swaps. Also we have the txtool version. We have the txtool version for Orchard zsa. We are using it to test Orchard ZSA against Zebra, but we need a different version for atomic swap. So we have this as well. And now we are preparing the Zebra version for atomic swap. So this is also in progress. I would say it progresses nicely and we will have something working for atomic swap pretty soon. But again, the emphasis is not on atomic swap. we do this in the background, but the entire attention is on Orchards, as I say now, first of all, handling the reviews and then propagating the changes up through to the entire stack. Librustzcash and Zebra. That's the update.

DAN: Thanks Pablo. Any questions? Double check the chat, okay? Okay. Thanks again, Pablo. And next up we have Shield Labs with the NSM, I believe this is Mark.

____

### 3. Research & Implementation Updates iii) Shielded Labs- Network suatainability mechanism

Mark: 00:11:19

Hey, folks the NSM PRs were rather extensive in their number of changes and files updated because of all the transaction v6 and network upgrade, NU7 variants in Rust and between,I believe, Paul's pull requests to Zebra, which handled the transaction, the network upgrade, respectively. Our hope is that the NSM PRs will be much smaller and much easier to review. So that's the aim there. One of the PRs, as I mentioned, has been merged, mine and then we're still waiting on the NU7 PR to be merged. Once that's taken care of which it looks like it's very close to being taken care of, then we'll move our attention both to the NSM PRS and the LibrustzCash PR that's required to support that. And that's where we're at. All of this is all flagged and all that good stuff, so it's all safe to review and everything.

DAN: Great, thank you, Mark. Any questions? All right, we'll jump to the next topic. Crosslink.


____

### 3. Research & Implementation Updates iv) Shielded labs & Ecc- Crosslink Trailing finality layer

Mark:00:12:55

I can take this one. I actually have a video to show. Do I just share my screen and let the audio handle itself, or how does that work?

DAN: Let's see if. Honestly, I'm not 100% sure if audio will work. Let's see if you. Why don't you try sharing your screen? Let's see if it boots me. Okay. And if not, I'll stop sharing here, actually. And then let me stop sharing. Okay, let's give it a try, Mark.

Mark: All right, I'm just going to hit play and just let me know if there's a problem with the audio, I guess, and let's go for it. Hold on.


SAM:00:13:54

Hello, everybody. This is the update from Shielded Labs for today's August Call. In front of you, on your screen, we can see the viewer that you've seen before from the last time. But now, this week we worked on addressing a lot of technical debts to do with our malachite integration, and that was in order to be able to switch to arbitrary payloads for the bft. So I Can suggest a message here. I can say hello Arborist, I'll do/sam. Now my node is proposing that. And so when it becomes my turn to create a block, we should see it appear on Andrew's screen which is in front of you. It might also help if Andrew proposes a block as well. This is not exactly the intended mechanism of how this is supposed to work inside . Are you proposing Andrew?

ANDREW: 00:15:02
Another block is proposed. Yeah, we'll see what happens. So we can see in the background that the rounds are increasing as we try and as I say that we have our message from Sam and then message from me.

SAM: 00:15:20
Yes. These. These can run in very quick succession when right now there's. There's a round robin between the finalizers or proposers and what's. What's happening is things can get a little bit clunky if we don't propose because then it has to stall for around etc. And then eventually get passed around to somebody who is proposing. But I can propose again and well, we can see this randomness. There we go. See it took a little while. And again I think the time you could the, you know, a tentative view of this could time how long that took. I think it's probably going to be two to three times five or six seconds or something if you count the timings anyway. So that's on the malachite side. We also have updates on the actual visualizer stuff. Andrew, what have you been working on this week?

ANDREW: 00:16:50

Right. So the core thing with the visualizer that's new is the ability to have nodes that branch off one another and as they get put onto the visualizer that uses a force directed layout approach to make sure we have a kind of balanced tree and we can generate a tree or a bunch of sidechains for either chain. And that is going to be among. As well as just being able to view the data, we're going to be able to use this as input for tests. We also currently have a setup so that tests can output data and then we can import it into our visualizer just to make sure that we have a decent mental model of what the test is actually working on.

SAM:00:17:48

Oh I should say as well we have since last time fixed up support For syncing so you can turn a pair off and then turn it back on again and it can connect to the network and resync back up. We're still working on some connectivity stuff to do with. I want to get punch through done. We'll see if we end up Doing that, you know,  because it should just be something we can turn on in the P2P. But yeah. Do we have anything more to share this week?

ANDREW: I think that's the main stuff for this week, but we'll, we'll have some more pretty soon.

SAM: All right, see you all in two weeks.

ANDREW: See everyone.

DAN: Great. Thanks, Mark.

MARK: Yeah, no problem.

DAN: Is the, Are the slides back?
STR4D: Yes.

DAN:00:18:50

Okay. Any questions, comments, thoughts on what we just saw or anything else related to Crosslink? All right, we will jump forward. Next up is the ZF on Frost.


___


### 4. Research and implementation updates v) Zcash foundation- Frost

CONRADO:00:19:09

Yep, that's me. We've been working on addressing the final two comments from the audit, suggestions from the audit, basically improving the structure of the project as a demo. So we did that. It's just those ones are under review and we should get those merged and wrapped  up. This part of the project from the findings from the audit and that's mostly it for the project.I often see some confusion about the status of the Frost project overall. Taking a big step back here. So just to make clear to everyone, like the first thing, the Frost implementation itself you know, signing, generating signature shares, aggregating and whatnot. This has been implemented in the Frost Core and the Cipher suite crates and it has been audited and was published in 100 releases beginning last year. So that's been ready for a while. Since then we've been working on, Because that's just part of the puzzle, right? To run Frost, you need people to communicate with each other, send messages back and forth. And that's not handled by the core Frost crates. So we've been working on some. We started with a demo to show how it can be done and iterated on it. So we arrived at two tools called Frost Client and Frostd, which is a Frost server. And these tools allow you to sign things with Frost, particularly the Zcash transactions. And this is what is being audited, was audited. And we're addressing those findings from the audit. And after we finish that, we basically wrap it up. The Frost Project sdf. So we have a tool that people can like command line tool that people can use or can use as a reference to, to integrate Frost with their software. The only things that will probably work at some point, we want to add PCCT support for this, for this tool. And this is something that probably will happen at some point. It's not scheduled yet, but should happen, I don't know, in the upcoming month or so. And that's Basically it like a long term view. Like we will like to have Frost integrated with wallets. Right. But this is not something we can work on ourselves. But we need to help other people to do that. And that's mostly it. And I think there was some chat about Zip312, which is a zip that would specify how to use Frost with zcash. I think there was some suggestion from Str4d and related to quantum resistance or something like that. We're happy to change it. The zip is basically on a state that is blocked on other people reviewing it and offering feedback. So if you're interested in it, please give us feedback. But I might revisit it. Just update the zip and ping different people in the ecosystem to see if you can get unblocked and approve it at some point. But that's it. That's the whole picture for the Frost Project sdf. So if you have any questions, feel free to ask.

STR4D: Thanks.

DAN:. Any questions or thoughts?

STR4D:00:23:18

Regarding the. The remaining things for. For Zip 312. Yeah, The thing that was left outstanding at the time the Zip 312 was merged it was primarily key generation. And then there is another pr, I think that's open for randomized handling for the two. Are you aware of anyone currently actually attempting to deploy Frost within zcash?. Regarding the quantum resiliency things, the approach that we've been thinking about is very dependent on no one having actually deployed Frost yet.

CONRADO:00:24:04

I'm not aware of anyone. The main thing is our own Frost client tool, but that can easily be changed. But I'm not aware of any other implementation.

STR4D:00:24:15

Great, fantastic. So we, so we still have the chance to get the key structure for Frost done in a way that is quantum sound. Cool. Thanks.

CONRADO: 00:24:27

I'm kind of curious,I haven't looked into it, but I mean, Frost is not quantum secure. Right?


STR4D: 00:24:34

Well, I can give a quick overview in the open discussion at the end if people want.

CONRANDO: Cool, cool. Thank you.

STR4D: Great.

DAN:00:24:44

Thank you. Str4d any other questions or thoughts. All right, we'll circle back with what Strad mentioned later and jump to the next topic. Open announcements. So, yeah, please raise your hand if you have an announcement.

___

### 4 Open Discussion i) 

DAN:00:25:07

We'll jump into discussion and maybe before we get to what you mentioned, Strad, I saw Sean, Sean is not able to come up. Did you still want to type anything out, Sean? I'd be happy to read it or drop links or anything. Like that. Yeah, the blog post. Okay. Yeah, please check out that blog post. It was retweeted. There we go. There's the link. Seanboe.com/blog okay. And then there was another. Paco, do you want to jump in I. On what you wrote?

PACU: 00:26:00

Yeah, it was just a quick question, just to know, like, the ZSA folks have been working on their own playground for a long time. Not because they chose to, but for other reasons. And I just want to know, like, how do you see impacts, like new changes that are made into Zebra or all the code you're working on? How does changes on upstream impact new? Are you up to date with the upstream code? Is there anything that we can do, I don't know, to mitigate or help you out. And if that's. If you see that going back upstream is going to be a major thing. I think that was not a lot of clarity and there was some discussion on a zip, I mean a governance zip that, you know, it created a lot of fuzz. It was kind of around this topic and, and I guess that I think you. We probably have everything figured out, but I don't know if you want to give some feedback or, or comment anything about that. It's much welcome.

PABLO:00:27:40

Sure, sure. So the status update for this particular topic, meaning upstream updates, is that we are fully caught up with the changes to Orchard. The most significant change to Orchard that affected our work was the introduction of pct. We are caught up to this right now and we merged our work on top of PCZT on top of Orchard with PCZT included. We are not fully caught up on Librustzcash where there was significant activity in the upstream branch. We are preparing to catch up now. We made sure with the ECC people with Str4d just this week that this is a good time to update to our version of Upstream Librustzcash and we will be doing it soon. And so to your concrete question, yes, every change from upstream there is a price to catch up. That's it. That's the question and the answer. But these changes are specified. They are mostly part of the NU7 upgrade as discussed previously. So we will need to catch up on anything that was not previously mentioned. Also it is possible to catch up. There is a price. We are doing this. The most significant parts though, which are the circuit halo 2 and the dependencies are not being changed for a significant amount of time and both the ZSA work on top of Halo 2 and on top of Sensimilla is considered stable in the circuit, so the critical parts are not moving. And this is important. And this is good otherwise with Orchard we are up to date as of now.

PACU:00:29:50

Excellent. I suppose so. But you know, it was great to just make it clear. It was not apparently clear for some people.
SAM: Thank you.

DAN: Thanks, Pacu and Pablo, any other thoughts on that or other open discussion topics? Just double check the chat. I do not see anything. Okay, thank you all for.



___

### 5 Open Discussion ii) 

STR4D:00:30:12

I thought you were talking about other things. Okay, so if I. Where's my window gone? Here we go. If I quickly screen share this, this one specifically. Okay, how does that look? Do I need to make it shorter? Would that help people? Is there anyone who can't see this clearly? I will take silence as a no. Okay, so the general idea. And so Daira-emma has been writing this up and is preparing a zip draft for this. But this is an idea that came out of discussions at Rural Crypto a short time ago. And the general idea is that the current, obviously the current zcash protocol is not quantum sound. So if a quantum computer comes along, then they can counterfeit funds, they can spend arbitrary money arbitrarily. And the reason they can do that is because the way that note commitment works is not quantum sound. So you can take an existing note that exists in the tree that you don't know the note details for, and with a quantum computer, you can trivially find a note that will satisfy that note commitment. And I won't get into details of why that's the case, but basically you can generate any note you want that has the same commitment to some existing note commitment, but a different nullifier. And so Daira -emma has gone into detail in this. In her quantum related zcash talks at previously zcon. The idea that we had is basically to consider a quantum sound circuit, all you need to do is prove knowledge of some kind of information associated with the note And so via something that is quantum safe. And we already have something like that in the current note payment protocol, the Blake 2B hashes that are involved in deriving various information that goes into note commitments. Now there's aspects of this protocol like the witnesses, the input information into the proofs are things like this row value down here, cy RCM the value and the address. So these pieces are inputs to the pre quantum circuit, the current circuit. But this part down here, the derivation of RCM from RC and PSI from RSeed, this is all done for. There's a couple of reasons that it's done, but one of the reasons is that then in the note plaintext we only convey rc and then you can derive things like RCM and various other ESK and other values from it. So the idea is that if a quantum computer comes along, you can still spend notes created under Orchard. You just need to additionally make a few changes to how you produce them. And essentially what you're doing is you're leveraging the fact that we already have this hash driving RCM in the wallet level protocol and we're providing everything else that goes into note commitment is then changed to also be an input to this RCM hash. And the upshot of this is that then you can then show and daira-Emma has some security arguments that he's putting together show that by doing that you correctly bind even though nocommit is not quantum sound itself given a particular cm. And then given if you check this hash in the circuit, it constrains you down to having either one or two possible RCM options per attempt. And so you basically turn grinding on the commitment to grinding on this hash, which is quantum hard under various assumptions. So that approach which is going to be sketched out in the zip, basically allows you to start generating notes in the Orchard circuit that will, if a quantum computer comes along, still be claimable under a. What you would do is you would write a circuit that proves everything in the current circuit, plus also proving this hash. And so it's proof of knowledge of the inputs to this hash that is the thing you use to spend. So there's a bunch of details in it. I've not covered everything in here, but the zip draft, once it's up, will cover those details. But this essentially means that you can have. It becomes a fallback, whereby you have what would be a very slow post quantum circuit, but a circuit that does hopefully work and provides quantum soundness. Again, this would all need to be checked, but assuming that that's the case, that solves that part of the circuit, which is the payment protocol. Basically, wallets would then need to spend all of their existing notes into new notes in the Orchard pool after their wallets were upgraded to generate notes in this way. And then all notes from that point forward in the wallet would be quantum, quantum recoverable. Whereas notes that were just sitting around previously would be quantum vulnerable. And by quantum vulnerable I essentially mean that you would lose that money if you didn't before the quantum computer came around. Migrate your notes, because obviously once the quantum computer comes around, we will just turn off the vulnerable circuits so that people can't quantum Adversaries can't mint funds. The downside being of course, when you turn off that circuit, people who haven't done this migration would then lose access to their funds. But this essentially provides hedging and a way for people to potentially in advance make their notes quantum recoverable. Anyways, that covers this particular note commitment there, which has this problem. But there's another one down here, the commit IVK that has the same problem. It's a similar quantum runnable hash and the the same thing applies to it and we can take the same trick to derive it in the same way where at the moment in the circuit we take ak, NK and RIVK as the witnesses. But RIVK is derived from a hash currently in fact all of these are derived from hash. So you can also do the same trick and have proving knowledge of the spending key of SK in Orchard's case as the new proof of spend authority in the post quantum world, so that you can do the same trick for the long term recovery key. However, there's a difference here which is that the note logic is one time because of the way that UTXO model works. Every note is generated and then spent and then never used again. So you don't need to deal with long term state for your existing notes, you can spend them all and then you don't need to worry about your previous state for quantum resilience. But ematerial is intended to be long term. So we have this legacy case here where we have this part that's proven in the pre quantum circuit which is AK is technically in here as well. AK&K and R VK are all inputs to this circuit. This is quantum vulnerable in that if you only have AK&R IVK as your inputs, then you can pick an IVK and pick and find any AKR of AKN that was satisfied. So you need to bind those three inputs to some prior input. Now for existing key material derived from Viya Z32 for Orchard, the only suitable thing is the SK value. And as a side note, this is also why we're not proposing this for sapling, because there are details in the zip32 derivation for sapling that make this significantly more complex and harder. And it's just not worth the worth the time to put to figure that out. But essentially what you end up doing is you're proving knowledge of SK and so that becomes your spending key rather than ask being doing a schnorr signature using ask. The other thing that we note in this diagram is that if your SK value is on a hardware wallet like a keystone, then you still can potentially in the post quantum recovery case maintain hardware wallet compatibility. If we can figure out a hardware wallet compatible proof that you can do inside the circuit that proves 3 Blake 2B hashes, that's going to be very expensive compared to like post quantum friendly hashing. But if we can figure out a way to do it, then you can keep your SK inside the hardware wallet. And in a post quantum world, if we can't figure that out, then to recover your funds from a hardware wallet in a post quantum world, you would have to take that SK value off the hardware wallet to be able to make this proof to do the recovery proof. So the reason that I brought up Frost earlier is because we can't change this key tree, people are already depending on it and trying to make this more optimal for the hardware wallet case would cause way more problems in terms of discovery and deriving of funds. Everything we've done with the other protocol upgrades and things we've done, we don't change the structure of a key tree once we've defined it, particularly the HD key trees. However, as I noted, Frost hasn't been deployed yet, so we have an opportunity to structure its key tree to be more efficient in this case. Now note again, this pre quantum circuit, same as before, it's just taking in currently the aknk rivk values, which is essentially the viewing key. And then normally this ask to ak step is proven with a Schnorr signature. So that's the spend auth sig in the protocol. And so what we could do if you have the flexibility to change the key tree so you could do this for potentially more efficient pico hardware wallet, if you accept the fact that you run into all these semantic problems, so I'd rather not. But if you're willing to do that, then you can change the structure of this derivation so that the only thing you have to prove in the post quantum circuit is this hash deriving R v K that takes ak and K and this extra value that we derive, qk sort of the quantum key, which is essentially inserting an additional it's turning this leg of the current tree from one hash into two hashes. And what that means is that in the case where you can do things on the hardware wallet, now the only thing you have to prove on the hardware wallet is this circuit on a single. We would still use Blake2B for this because we have to use Blake2B in other places, but a single Blake2B hash rather than three of them, which is smaller and therefore more likely to possibly be hardware wallet compatible. Or maybe we we look at other like potential hashes we could stick in here for this. That might be even easier. But the other thing that this gives you in the case of Frost is, is graceful degradation. So if, if you're using this normally in Frost, this part would just be done inside the hardware wallet or inside whatever Frost is doing this. This derivation of RVK and NK is has to be known to all Frost participants. The ASK value is the thing that's sharded amongst the participants and AK is the group key. So this dotted line here only exists for the harbor wallet case. This dotted line does not exist for Frost. Ask is just like a floating value. So the thing here is that in the case of a quantum adversary coming along, this link breaks. So you no longer can use the threshold mechanisms, but you can still do prove a spend by proving this QK hash over here. So your Frost multisignature degrades from K multisig, whatever you've defined N of N or K of N, it degrades down to 1 of n multisig effectively, because you just need to prove knowledge of this QK and presumably all of the Frost signers have knowledge of that. Maybe all of them have it stored on a common hardware wallet or you know, on, on hardware wallets of their own. However, or, or just they have it in their secret key material along with their shard of ask. But what this means is in the interim where, say, say as a community zcash, the zcash community believes that quantum adversaries are too much of a threat to leave the pre quantum circuit enabled. So we disable the pre quantum circuit, we've moved the recovery circuit along with whatever post quantum stuff we're doing. And so you're required to prove this leg, you could still include the Schnorr signature as also being required. Now obviously if a quantum computer actually exists, then the Schnorr signature is providing no benefit. However, if a quantum computer does not yet exist, and we just are worried about before threat of one existing, then keeping the Schnorr signature here retains the multisig benefit. So in that interim period where globally we've turned off the pre quantum circuits, but no one has actually proven a quantum computer to exist in generating false proofs, the Frost multisig stuff can still be used and still be retaining essentially K of N multisig in that interim locally. Like for the people who are using the Frost signatures, even if globally, the network isn't relying on the fact that those multi signatures work or that pre quantum stuff works. So you get this sort of graceful degradation which would also let you. In the meantime, hopefully a post quantum sound threshold scheme would be derived and then the people using those frost keys could migrate over time, but they would still have a way to recover their funds either in that interim sort of twilight zone via their current multisig guarantees, or in the fully post quantum zone via this recovery able QK value that is one of N multisig effectively. Cool. Any questions?

CONRADO:00:44:56

I think I got it. Kinda. The only thing I'm not sure about is the sk. Like for Frost, you don't need an sk, right? You can just generate the NK RVK randomly or whatever.

STR4D: Right, but that's the thing. Sorry, so what was the question?

STR4D:00:45:20

So that's the insight that we have here. You can't generate them randomly or else you don't get quantum resiliency.
CONRADO: Right.

STR4D: 00:45:33

The quantum resiliency comes from the fact that these are not generated randomly. They have some hash based derivation that we can fall back on. So to clarify, like in the legacy case here, the post quantum circuit, for rendering reasons we only show this as the addition. But actually the post quantum circuit would cover all of the pre quantum circuit as well. We have the pre. The post quantum circuit has to prove everything the pre quantum circuit does plus this addition. And the reason that it's sound is because we can rely on the hashes being derived in this way. So if you just derive NK and RIVK randomly and just make it known that all of the Frost participants know what the NK and RVK is and then they have AK as the group key, then that Frost group can never have quantum soundness like, sorry, have quantum recoverability because you've got nothing to fall back on.
GULAN: Yeah. So my question is, if we were going to adopt this, what would the Frost wallet need to store? They need to store the signature, the key share. But then SK or QK or both SK and qk, this is what.

STR4D:00:46:38

So ignore this box. Gary, I put this in because this is running for the PQ hybrid wallet case. But if you ignore this box, the minimal that a Frost participant needs to store is their keyshare and then whatever is necessary to derive the rest. Having an SK value makes it convenient because you just store that one SK and you can derive everything you need. But if you didn't want to do that, then you would need to. If we adopted this kind of approach, you would need to store NK&QK.


STR4D: 00:47:08

And QK in particular would be sensitive spending material. NK is just viewing material. So the advantage to deriving this all from an SK value is that it retains the simple property of you just have a single spending key  that derives your viewing key material, other than the fact that you have the ask share here.

CONRANDO: Got it.

STR4D:00:47:35

It would be convenient if the ask share could in some way also be derived from, you know, from something, you know if there was some way to ensure that this could be, you know, bound in some way. I, I don't know enough about the options for doing FROST EKG in terms of what they can do in terms of resiliency. But, if it's guaranteed to be the case that, you know, each participant is going to need to remember something of their own, and if there's no good way to, to have like SK or some equivalent of it derived from the group sk, then yeah, like, like another option here, just like spitballing, would have been to derive NK from ak, which, which causes problems in your proofs because this is part of the reason why we use an SK in the other protocols. Because then you can treat this layer of the protocol as basically, these are independent values. You can model them as independent values where if we have NK derived from ak, you don't get that property. And here we're actually intentionally deriving our IVK from these two. So yeah, it becomes a bit tricky. You certainly could not derive, to have quantum resiliency. You could not derive QK from AK because otherwise AK is viewing capability material. QK is meant to be spending capability material. So you cannot have spending capability material derived from viewing capability material. And since you couldn't have it derived from the individual asks, because, you know, each of those is meant to be separate and you know, you're never supposed to combine them together. You couldn't combine them in a way to produce the QK value. So it's kind of necessary in this model to have sort of a minimum of the key shard and something either QK or something that derives it. But yeah, you could, for example  you could model, you know, you could ignore QK here, for example, and just have SK deriving NK and also being an input here. But that also causes slight modeling problems. So that's probably why Daira-emma has put this here. Yeah. The simplest thing would just be to have the key share, the participants key share part and a seed value sk value that derives everything else they need.

CONRADO:00:50:00

Yeah, that makes sense. Thank you. Yeah, I think this is, this is important. The only thing I think about is I don't think this is worth blocking for. Like if people want to use Frost now, I think they could. I don't think it's an issue if people generate Frost keys using the, the current way because I mean the, like there's lots in settings, it's not as ossify as in regular as a cache when you need to have a seed phrase and you need to make it work with the seed phrase forever for Frost, you need to store your key share and whatever material you need somewhere. So I think in my view it's okay for people to use this and then we add a new option or you can now generate quantum resistant Frost wallets and people can decide to, to migrate their funds,to a new wallet

STR4D:00:51:00

I mean that just rolls into the exact same problem that we were looking at up here, it rolls into the same problem as we have with sapling basically. And to some extent here. I mean this, this one. The problem with the legacy case here is just the only problem is efficiency for hardware wallets and this change here in the hardware wallet case. So the hardware wallet case, this is a, these are fixed lines, the hardware wallet case. The only difference between these two is reducing the number of hashes you need to do inside the circuit for the efficient hardware wallet. And of course, the nice thing about the stuff that Sean's been looking at for scalability is you could support both of these at the same time because these could just be different potential leaves in the PCD tree. So you could prove, you know, you could have support for either proving, you know, the full legacy mechanism or support for this mechanism, because either way you end up with a, you know, you're placing a constraint on the, a hash constraint on all of the, on the relationship between all of the inputs to commit ivk. And that's the core property that we're relying on here is that the inputs to the quantum unsound commit function are bound via a quantum sound relationship. So yeah, the advantage to doing this ahead of Frost deployment is that then it's simple for people and in particular simple for like wallet support because then there's only one thing they have to define, whereas rather than potentially multiple things.

KRIS:00:52:40
Yeah, I think in this case also, like, one really has to consider the UX of if you're imposing a cost for key migration on your users in the future, key migration is generally not something that is good for users. And so if we can make the fix now before they would have to worry about that, then we should go ahead and do it.

CONRADO:00:53:11

Yeah, the only thing I worry about is like, how long do you expect this to be? Like finish it so we can implement it.

STR4D:00:53:25

Oh. So in current conversations we would like to Deploy this alongside NU7 and the reason for that is specifically ZSAs. The advantage to deploying this in so everything that I've described here is just a wallet level change. This is not part of the consensus protocol. Except this pre RCM value does interact with shielded coinbase specifically, because shielded coinbase verifies the RCM derivation. And so if some notes have a different RCM derivation, then that would affect consensus. So that. So you could either choose to not deploy it in consensus, at which point it would mean that any shielded coinbase would never be quantum recoverable, or we accept that this particular change, none of the rest of this matters, but just this particular change, we allow it in NU7 alongside the other changes and then shielded coinbase is also protected. But the reason that it would be good to Deploy this alongside NU7 is that no one has generated ZSA notes yet. So if every wallet is uniformly doing this approach from nu7 from like, yeah, the upgrade that deploys ZSAs onwards, we as developers and maintainers of the specs can assume that every single non zec note is quantum recoverable. Currently, we cannot make that assumption about zcash, about ZEC notes, because we have a bunch of notes in the orchard tree that are not quantum recoverable. So there's complexity in terms of sort of the migration process whereby some of the notes in the tree migrating in this way would become quantum recoverable and other notes in the tree would not. And that leads to complexities and problems essentially in the same kind of way as we have with Sprout at the moment, where we can't distinguish between notes that people have the spending keys for, but just haven't gotten around to moving yet from notes that are unrecoverable and essentially locked up, lost, burned, whatever funds inside the sprout pool. We can't distinguish between those two. And so there's an ongoing protocol complexity burden to dealing with that. And there's a similar thing here with orchard in terms of when you get to a quantum computer, some funds are going to get locked up and be lost, essentially because they cannot safely be proven spendable in the presence of a quantum computer, but some of them can be. And the advantage of deploying something like this alongside zsa's is that we know that every ZSA note is provable in that way. So assuming that others agree with us, then the timeline for that would be relatively quick. Which is also the advantage of this is that it's a relatively small and easy to specify set of changes because most of the complexity is really sort of on future us. Whenever the quantum computer actually starts being a threat and we have to define a post quantum circuit, the complexity on the protocol now is just a few, you know, adding a few more inputs to existing hash functions.

GULAN:00:56:53

Got it. This is a consensus rule change, right? We need to change how.

STR4D:00:57:01

But the most part it is not the only. As I said before, the only consensus rule that might be affected by this is the Orchard shielded coinbase rule.
It allows you to create orchard shielded coinbase because the orchard shielded coinbase is required to be decryptable and we, and we verify that the note commitment is correct because you have to decrypt it in order to check that the. The value is valid, that the consensus rules verify this, this no commitment. And they do that because they decrypt and they then get the RC data and they derive rcm. So because the consensus rules specifically for shielded coinbase check this pathway, we can either have zero consensus rule changes at all as a result of this change at the cost of shielded coinbase outputs remain quantum vulnerable, as in quantum, quantum quantum loss, or we can choose to add an additional consensus rule change that allows the shielded coinbase note plaintexts to have the version that does derivation in this way. And then shielded coinbase outputs become quantum recoverable. But that's an option that you could, that the community could decide to not have in exchange for not needing to make any consensus rule changes. Because everything else is all the rest of this is not consensus rules at all because it's all just how wallets construct new notes to send to people.

CONRADO:00:58:36

Got it. Thank you. I would say that I'm slightly nervous about cramming more stuff in NU 7, but I think this is worth thinking more about. So I think we're going to publish this somewhere at some point, right?

STR4D: Yeah.

KRIS: Yeah.

STR4D:00:58:57 

This is going to become a, there is a lot of zip content. Yeah, this. This is.

CONRADO: Yeah, you can take a close look into it later.

STR4D:00:59:10 

Can talk about it. There's a lot of. A lot of stuff in here. The diagram is the most useful thing . So yeah, I expect that to be a zip draft soon for. For people to be able to look at.

GULAN: Cool. Thank you.

DAN:00:59:28

Strad, could you check. Okay, let me bring the slides back up. Check the chat. I think a lot of it was covered over the last few minutes there.

STR4D:00:59:40

Yeah, I could. I couldn't see the chat because Zoom hides it while I was doing stuff. Yeah, I see Sean made some notes. Yeah, it's not a blog post. It's a. It's a draft Zip. This is basically Sean, the stuff that we discussed in person at Real World Crypto. Yeah, so. Oh, I see he's already gone. Okay, already answered. This does not require a network upgrade. It's only convenient to deploy alongside the network upgrade. And for that one specific case I mentioned could potentially be beneficial, but that is essentially optional. Zerodarts, what's the timeline to implement this quantum stuff? Worst case could be three years. Like it's the numbers range depending on who you ask. Could be 10, could be 30. But like, worst case, given the stuff that we've been seeing, could be as soon as three. Okay. Yeah. Will it delay in NU7? Well, the intention of this is that the changes required on the NU7 timeline would be very minimal.This, this would not be on the blocking path. And if it were on the blocking path, then it would be easy to kick out if, if people decided that. That we didn't want that. Again, the convenient reason to deploy it along with NU7 is that then we know that every ZSA note is derived in this way, which has simplifying aspects on the. On protocol management going forward.

DAN:

Looks like Zerodartz asked a clarifying question there. Three years meaning quantum computers that are capable of potentially breaking zcash. Not three years to implement the.

STR4D:1:01:32

No, no, I didn't mean three years to implement this. No, no.. This is not a three year.. Not three year to implement the thing I just described. Three years until we might be in a position where we might need to consider turning off the orchard circuit depending on how research in the quantum sphere goes. And I only say three years because you asked for the absolute worst case. I don't think it will be sooner than that. But I don't have a crystal ball. I can't see further out than that. But this is like now is the time that people are making these decisions to give some context. NIST is like the numbers from. Is it NIST or cnsa? I forget the specs. I'm not. I'M not deep in US government specifications, but the timeline horizon on which people are looking at like deprecating and disallowing elliptic curve cryptography, is five to 10 years. Like there's, there's deadlines in 2030 and there's deadlines in 2035. So people are particularly for encryption stuff right now. People are doing that right now. This falls under the realm of authentic of like authentication essentially. So it's on a slightly slower timeline publicly. Like people aren't upgrading their protocols right now to fix authentication problems. They're focusing on the encryption problems first because the harvest now decrypt later attacks or store now to decrypt later attacks. But we are still getting primitives and things and protocols ready for the authentication aspects because that matters the moment that people can create inauthentic signatures and stuff like that. And proofs fall into sort of that category. Yeah, the problem here is more one of. Because notes can live for a while and particular key trees can live for a long while. This sort of falls into the realm of. Yeah, we can't easily rotate certificates. We don't have note expiry on people's funds where you are forced to spend your Note value every 90 days in order to keep it spendable. So this would instead be a preemptive change to wallets so that the notes that they are naturally producing for the next several years are plausibly quantum recoverable. So it's. Yeah. A thing I would like more people to be. To be thinking about and mulling over and so yeah, there'll be a better opportunity for people to do that once the proposed draft zip is put up.

DAN:01:04:45

All right, thank you, Str4d. Any other thoughts or questions on this topic? I see DC dropped a link that Strad referenced. I believe in the chat.

STR4D: 01:05:00

Yep, that's the 2035 deadline I was. I was remembering.

DAN:01:05:08

Cool. Okay, well let's do a last call for any other open discussion topics. Okay. I don't see any hands.

PACU:01:05:20 

Thank you for the brash course. It was awesome.

SAM: Yeah.

STR4D: If you want more actual, more in depth information, go look at all of Daira-emma talks on this.

DAN: 01:05:36

ZF website or ZF. YouTube channel has a few. At least the ones from Zcon.

STR4D: Yeah, those are the ones I'm thinking of.

DAN: All right. All right. Well, thanks again, everybody.

PACU: Okay.

DAN: We'll see you on the next one. See you, folks. Thanks.

STR4D: thanks, everyone. Thanks for hosting. Dan.
DAN: Thank you.


____


**Next Meeting Scheduled: May 1st 15:00 Utc**


___
___


