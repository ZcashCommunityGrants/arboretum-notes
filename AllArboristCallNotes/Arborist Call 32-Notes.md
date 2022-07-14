
# Arborist Call  #32 Notes

**Meeting Date/Time: July 14, 2022, 16:00 UTC**

**Meeting Duration**: 50 minutes

**Agenda**: 
+ Zebrad Status Updates
+ Zcashd Status Updates
+ Open Discussion



**Video of the meeting**: [Recorded]

**Moderator**: Steven Smith

**Notes**: Jason Rogers

___
## Decisions & Action Items

i. ZIP on Frost use with Zcash

ii. Discuss ZSA Security 



___

## Full Notes



### 1. Zebrad Updates 


[00:00] **Conrado**

 So basically with Zebra we are addressing some performance issues that we are having since there is a higher volume of shielded transactions in the Zcash blockchain. We found a bug in Zebra. Each orchard transaction has a single Halo 2 proof but we put the verification in the wrong part of the loop so we were verifying it for each action which is completely wasteful, we fixed that but unfortunately it wasn't just that. There are some other issues which we are still investigating. 

[04:33]

We also noticed that we have batch verifier at least for sapling proofs and for signatures but due to the way it was implemented, a single batch verifier runs at a time so if you have multiple cores they were not being used to the full potential so we changed that to have multiple batch verifiers running at the same time and to use that correctly we had to also change some of the structure in order to process more blocks and batch items concurrently. 

[05:18]


So we had some improvements, before Zebra wouldn't sync at all it would get stuck but now Zebra is able to sync successfully again but the performance is still not great. If i'm not mistaken the last number we have, it was taking 10 hours to sync everything while before it was 6 hours. There are still some issues we are looking into but at least it's working, we managed to sync successfully. 

[05:54] - **Deirdre**


Of course we didn't notice these issues until these blocks full of shielded Orchard (and Sapling I guess) transactions started showing up, so a mixed blessing i guess



[05:54]


We also had to change out CI because of the GitHub Actions' 6 hour limit so we changed the testing to sync one chunk at a time in different jobs so each job has a 6 hour limit but the whole process can take more.

[06:04]


That's mostly it, we are still investigating and working on performance issues and related to FROST, just to give some context it's a protocol for threshold signatures that's being worked on by Deirdre and they are working on getting an RFC draft ready. Related to Zcash we want to write a ZIP to specify how to use FROST with Zcash. FROST operates on regular schnorr signatures but Zcash needs re-randomizable signatures so we have to do some adjustments to FROST to support that. I'm working on the ZIP, I have the first variation that already specifies everything that needs to be specified but it still needs to be cleaned up, fix references and expand some background sections. So hopefully we have at least the first variation of the ZIP ready. We want to get it ready before Zcon i think thats likely to happen. 


 ___


## 2. Zcashd Updates

[07:40] - **Steven**


So we put out release 5.1.0, it's got a number of things in it. As Conrado mentioned there has been an increase in the number of shielded transactions on blockchain, so we did a few things in 5.1.0 to try to improve performance just like the Zebrad team. The notable changes, its faster block validation for Sapling and Orchard transactions, the net of that is we've been able to reduce verification times for those transactions by about 80%. That's a good step forward. 

[08:59]


It reduces worst case block validation times for historic blocks by about 80%. Added a new option for Zcashd that allows a node for example, to default to Version 4 transactions if the transaction doesn't contain orchard components, if they chose to. This is helpful if there is a legacy wallet that does not yet support V5. That would be a way for them to still easily integrate with the network. 

[09:51]


Made some changes to our RPC's, the first one getblocktemplate also to improve performance around that, so it now skips proof and signature checks on templates it creates as those templates are only clear transactions that have been previously checked so it was redundant. It's sped that up quite a bit. 

[10:10]


We updated getrawtransaction/decoderawtransaction to now include details of about orchard actions so hopefully now we'll see orchard specific things start showing up in block explorers. Orchard specific things would largely be like 'number of actions' for the most part is all you could get out of that. 

[10:36]


We also improved the performance in this release of the z_gettreestate RPC, maybe it was something we put out earlier but i'm not positive. On the wallet, rescan performance of post NU5 blocks has been slightly improved and we are working on a few other improvements. Some general improvements to the wallet, reducing the amount of time that blocks were held, things like that to improve RPC throughput in general.

[11:11]


We implemented a methodology for how we might begin to deprecate things specifically around RPC's. Typically in the past with Zcashd we would deprecate an RPC, we would say 'here's the old one, you should be using this one instead'. This provides a methodology for actually beginning to deprecate this. We didn't turn them off, we didn't block them in any way. We just said it would be a great idea if you start using something different and here it is. 

[11:46] - **Str4d**


Just to be clear this functionality was implemented in 5.0.0, but it is not just RPC'S, it's for anything in Zcashd that we want to deprecate. So for instance if people wanted to try their wallet with sprout disabled, this would be the functionality to do that through as well. It's for general enabling us deprecating removing currently public Zcashd features of which RPC is a subset. 

[12:29] - **Steven**


That's the bulk of what went into 5.1.0. A couple of other things we are working on with regard to performance, we've got a couple of PR's we are working through. The first one is geared at improving node scan performance. 

[13:08] - **Str4d**


Between 5.1.0 and the stuff we have open now where essentially the three pain points that tie in. There's the block syncing times and the IBD cost which is where the 80% improvement to block validation came in. 

[13:35] - **Daira**


'IBD' means Initial block Download

[13:36] - **Str4d**


That incidentally was essentially using multicore optimisations like Zebra are now considering doing as well. Although ours is inverted in that in the Orchard crate there is now a batch validator which you can just throw stuff into the batch and it will internally handle the multithreading and batching for you whereas I think Zebra is doing single threaded batching but then throwing those batches onto multicore. So it'll be interesting to see how these tradeoffs and we can figure out what the optimal strategy is from there. 

[14:20]


As far as these other changes go, we have the wallet scanning problems which also are affected by this. This one here (https://github.com/zcash/zcash/pull/6069) is the way in which Zcashd tracks witnesses for notes. When a note comes in it gets added to the pool of things we increment and then in order to handle the ability to handle reorgs and rollbacks, the simplest thing was just track everything. But once we get to the number of notes that are in these full blocks, particularly for larger wallets that have hundreds or thousands of spent notes whose witnesses are still being incremented this was a significant performance bottleneck which noone had noticed previously. 

[15:17]


Now we are just taking advantage of the fact that there is a schelling point of, the network will never rollback more than 100 blocks or nodes will shut down/zebra will ignore it etc. So once we get that far away from a spend we can assume that we will never unspend it and so we can stop tracking those witnesses. Eventually it would be nice to transition more to the incremental merkle tree crate for tracking sprout and sapling witnesses but that's a longer term project. We might get around to replacing the wallet before we do that. 

[15:50]


The other thing we are doing with regards to the wallet scanning is, as far as Zcashd goes we are a bit handstied because of the bitcoin inherited wallet but pulling out trial decryption to be multithreaded is something that we think is feasible. We'll be working on that as well which should also help lower that bottleneck. 

[16:29]


(https://github.com/zcash/zcash/pull/6073) The other PR that we have here, the caching one. This is just taking advantage of the fact that in steady state most transactions on the network will be observed by the mempool before they are observed via a block. So this change does not help initial block download or catching up to the chain tip but once you are at the chain tip if you have seen a sapling or orchard bundle be validated via the mempool then when you see that same bundle again coming into a block we will go 'yep it's valid' and not recheck the proofs. 

[17:07]


On top of the 80% reduction that we had in 5.1.0, this adds another 80% in improvement, it effectively brings it back down to what we expected for block validation by spreading out the load validating those transactions as they enter the mempool. It doesn't help worse case. Worst case being a block appears that is full of transactions you've never seen which is precisely what happens during chainsync/Initialblockdownload because you dont see those transactions via the mempool because they are already in a block. But for steadystate this will reduce the block verification times we are seeing and in particular help to reduce orphan rates. The orphan rates affected by how long individual miners' nodes take to validate the blocks they are producing, how long the individual nodes in the network take to validate the blocks before they propagate them and how long miners' nodes take to validate a block before they're accept it into their chain and start building on it. All of this should be improved by this PR. 

___


## Open Discussion - 1. 0xPARC Halo 2 Learning Group

[18:26] - **Steven**


i wanted to let Ying Tong give an update on some things she's been working on. I'm sure that a number of people are familiar with 0xPARC. The name comes from the great research facility down in Palo Alto. They are currently conducting a 4 week learning group on HALO 2 in New York that's been going on for some time. Ying Tong's been there and done a number of presentations working with people St4d & Daira also popped in on some AMA sessions for folks. We're pretty excited some of the things people are looking to do with Halo and some of the work that's been done so far. 

[19:46] - **Ying Tong**


This learning group wrapped last week. Daira and Str4d and I have been in the Discord helping out in the sessions to introduce PLONKish and Halo 2, both in terms of the concepts and also in terms of onboarding Devs onto the library. We also saw some cool uses of Halo 2 by projects that are building on it. For example Orbis is a zkrollup on cardano, they've built a tiny RAM in Halo 2 and Darkfi is  project, they're doing private DAO's and private Proof of Stake. They've built a VM and a DSL on top of Halo 2. The Ethereum Foundations ZkEVM effort is also built on Halo 2. We saw all of these in the learning group. 

[21:07]


At the end of the learning group we had 10 projects from the participants. There were about 20+ participants and I think or more observers. We saw really fun projects like zkWordle, i think it will be up soon whereby you can prove that you got the incredibly short series of guesses that you claim you did. Halo 2 Wasm, people got it working in the browser, stuff like MiMC, the hash in Halo 2 etc. For next steps, we have a bunch of ongoing discussions, there's interest in collaborating in a PLONKish DSL and in working on features for the Halo 2 library, dynamic lookup tables etc. It would be cool to see how we work on this in the long term together. 

[22:14] - **Steven**


Thats pretty exciting, the interest and also the work thats ongoing by other teams and contributing back. We're getting a number of PR's into Halo 2 so it's really exciting as well. I know we have Daniel and some of his team members on the call so let's open it up for anyone that has any thoughts or anything they want to discuss. 

___


## Open Discussion - 2. ZSA 

[23:00] - **Daniel**


We have some updates, first of all thank you everyone for the patience. I know it's been a couple of weeks if not more that we didn't share much but we were really working on advancing on implementation and finalising a lot of details on the design. As you saw yesterday we put the Pull Request for both of the issues. I think the issuance issue still has maybe a little bit of work, we would love some of the inputs and comments directly on the issue. 

[23:41] - **Daira**


Those dropped 17 minutes before our ZIP sync meeting so that was very timely. 

[23:48] - **Daniel**


Sorry about that hopefully you'll have time the next week or so to review that. I will let Auriél talk about some of the things we've been thinking about in terms of more concrete design, I think it's interesting as how we are thinking about doing this pair case scenario inside of the circuit to not replicate the hash functions. Because we are basically trying to be backwards compatible with ZEC nodes so that we can input them into the circuit. That we can remove the orchard bundle or replace it with the ZSA bundle and not need a turnstile. 

[24:39]


At the same time we are also thinking about in 2 different ways how to handle ZEC nodes and ZSA nodes in the context of how you split them in several actions for different output loads. We've discussed this before. 

[24:58] - **Aurélien**


The backwards compatibility is certainly the biggest challenge, but we do have a complete way of doing it like complete backwards compatibility. What do we have so far; Project updates, the classical computation of everything, the new implementation of note commitments. So that supports duality of ZEC notes and ZSA notes, same for value commitments and all of those including test vectors. Plus we have a lot of progress in the client itself Zcashd. 

[25:57]


Basically integrating all of these new functions into it. There is a major change that the client has to handle which is that in ZSA notes in order to spend them or in the case of a split where you spend one note with two outputs, the second outputs in the design you still need a valid input. The input has to exist and that is a change in how the client manages it's previously known as 'dummy notes'. Now they are not dummy but 'will-not-spend-notes'. That's also a change of logic in the secret. 

[26:49]


We know how to do about everything I believe. There is maybe one thing that I will have to change in the design for performance improvements. We have note commitments to change, so this can be implemented efficiently in secret, we still need to support the old type of note commitment, the hashing gadgets that hashes the data of notes and then we add the suffix which is the note type. So we calculate first the hash and then it has, lets say a multiplexer, depending if it's native or ZSA note that's going to either use it as a note commitment identical to the current protocol. the other branch of the multiplexer is it takes the old note commitment as input to further has gadgets to basically append the type to the message. 

[28:38]


Those require a change in the sinsemilla gadget, at the moment the sinsemilla gadget has a fixed initialisation. The initial stage of the gadget is the domain and we have to change that to make it viable, basically adding one word in the gadget for this input. Otherwise that's all. 

[29:29] - **Str4d**


Just a question about the change for the sinsemilla gadget. The necessary change there is because you need a different domain for the ZSA component, for the note commitment. 

[29:58] - **Aurélien**


Thats right there are two reasons, one is to make it a viable domain and the second reason is performance only, the ability to append. 

[30:10] - **Str4d**


I can see potentially how to change the API's in a nice way to do the appending. before too much work is done on that I would want to make sure that we continue to preserve the ability in the API's to use the sinsemilla gadget in a fixed domain way. So the variable domain is a new API that's available but we should continue to preserve the previous way for people who don't need that flexibility.

[30:43] - **Aurélien**


That's good input, this was a question I had so I will do it that way. There is another change in the secret which is the value commitment which is right now a fixed base elliptical multiplication with 64bit scalar. This has to change to viable base. That will also be a cost but it's already implemented in Halo 2. 

[30:47] - **Daniel**


I think I should just add a small comment, it would be interesting if maybe we set up some extra call in two weeks or maybe even at Zcon3. We can meet up and maybe go a bit more thoroughly through the whole security of ZSA's.That would be super helpful to make sure everything is okay. Even though we've already done again & again but one more wouldn't hurt. 

[32:13] - Str4d


Yeah and it's a lot easier to analyse now that we have a ZIP draft to look at.

[32:20]- **Daniel**


Also we would probably have a lot of the implementation by then so hopefully we will. 

[32:27] - **Steven**


Are you having several folks come over for Zcon3 Daniel?

[32:30] - **Daniel**


Actually most of the QEDIT team is coming, we also have as attendees Pablo and Vivek so the four of us are going and i think John as well.

[33:22]


I am not sure what the agenda is exactly but we are also doing a small workshop around future applications on Zcash. I think that would be super interesting to see some if not all of you there.

___

## Open Discussion - 2. ZSA (continued)

[41:01] - **Aurélien**


I have another topic, maybe a longer roadmap but we are thinking about the next steps after ZSA. What makes it really useful is when you have things such as a trustless exchange between asset types or if you have a trustless bridge to another chain, these sort of things. We have also been thinking about multisig wallets and every time I come to this thought which is it would be pretty bad practice to implement that stuff in the core protocol and the better way is to have a programmable protocol and then implement those things like the logic of bridges and exchanges etc. separately. I remember that was a topic in a previous Zcon and there were some cool ideas and that was before Halo 2 and recursion. I wonder if anyone can comment on the state of the art or any projects about that or if it'd be interesting to talk about in the upcoming Zcon. 

[42:29] - **Daira**


Absolutely, it was one of the motivations of moving to Halo, that recursive proofs would open the door for potential programmability later. It wasn't the main focus but that was a factor. 

[42:54] - **Str4d**


The simple architecture here is if you're doing bridging, you know you are leaving the network so one other way to look at it is you can do it with a separate circuit because you know you have to leave the orchard pool anyway so you are going to have a different anonymity need there. But it would be interesting to think about ways we may be able to preserve some level of privacy with bridging by enabling the circuits to be connected in some way without having too much effect on turnstile and whatnot. 

[43:44] - **Daira**


So if we support transaction aggregation then I think we get that indistinguishability for free because the circuit proofs you are aggregating, you won't be able to see what you're aggregating exactly.


___

## Open Discussion - 3. Wallets

[33:58] - **Dodger**


I know that Str4d outlined some work that you guys have done in performance. I'm just wondering whether that will resolve the issues that are being experienced with lightwallets.

[34:18] - **Str4d**


That's what we are working on next. The changes we've been doing thus far have been focused on Zcashd because you can't have a light wallet without having a full node backing the server. That was the number one priority, to address the performance problems with Zcashd. We're almost done with that, we have the 2 PR's we have up and testing and there's one more that will help with Zcashd wallets which is important for the very big users of Zcashd (mining pools and exchanges). 

[34:54]


The next thing we are working on after that is improving the synchronisation performance for light clients, specifically the light clients that build around Zcash client backend crate in our rust crates so that will then affect the mobile SDK's and therefore anyone that uses the mobile SDK's will be able to pull that in once it's done. That's going to take a bit more time to do because there is a reasonable amount of architectural changes that need to be made in the backend code to make that work. But it is the next priority, right after getting the next Zcashd release out that has our current in flight changes.

[35:50] - **Daira**


There's also the possibility of making changes is fee policy that increase the cost as well.

[36:05] - **Steven**


I noticed that the 5.1.0 some of the things we did in there, in the lightwallet these servers as Str4d also mentioned have a Zcashd they connect 5.1.0 helped some, marginal but not significant. It's kind of related to a question that just came into the chat. 

[36:31] - **RJ Ricasata**


https://forum.zcashcommunity.com/t/feedback-on-what-is-currently-your-go-to-favorite-zec-wallet-and-why/42510

[36:33] - **Steven**


I am sure most of us have several wallets that we test with, check out, keep updated, send funds back and forth. Several of them are slow but functional if you have the patience to let it sync for a while it'll eventually get caught up. For me nighthawk and we have an internal ECC wallet that's really just a demo wallet we play around with but it's based on that same stack. The SDK's/Lightwalletd/Zcashd. It eventually syncs fine both android and IOS. 

[37:27]- **Steven**


To answer the specific question, I know Zecwallet Lite is a favorite of many, i think Aditya is working through a couple of challenges there, perhaps with the number of transactions we are seeing but i'm sure he posted yesterday about working on addressing some of those things. 

[37:57] - **RJ Ricasata**


What do you see for the wallet space? Like search engines later on there isn't a need to have 10 different search engines to use

[38:16] - **Deirdre**


Not putting all your eggs in one basket is good for security and decentralization

[38:26] - **RJ Ricasata**


Or 20 different steaming services? The global masses will likely adapt the most user friendly wallet and what can be done on the main ZEC wallet to meet the needs of the next billion users ? Users that expect phone support and what not.

[38:27] - **Deirdre**


I would argue that there is a very good reason to have more than one search engine as there is duckduckgo that does not collect as much information about users as google.com and may be useful in different ways in how one operator of a search engine decides to prioritise what is the most useful.

[38:51] - **Adi ZCG**


Totally agree with Deirdre there. Most of the top successful cryptocurrencies have several wallets which cater to different audiences, different regions and places around the world. There's definitely a need to have several teams to focus on different aspects. Several people just want to use it for day to day transactions, several users just want to store their ZEC for long term and private use and some of them just want very fancy looking apps, could be a number of users. 

[39:26] - **Daira**


There's also a benefit to decentralisation, especially in security so if there's a single target for an attackers and people aren't able to switch to a different wallet then that's really problematic. 

[39:50] - **RJ Ricasata**


Correct, but if you go with the 80/20 rule it usually is the top 20% that own the 80% what will be that ZEC wallet you foresee? Sure multiple wallets and services, but that is still a niche amongst users. Seeing the vision for main stream if in the next 10 years that everyone can easily use.

[40:01] - **Steven**


There's several out there, they are all evolving. My personal opinion here. There's the core wallet functionality that every wallet has to provide, you can set it up, back it up, restore it. You can receive ZEC, send ZEC, see your history & balance the building blocks of any wallet. They all share that in common but then there are features where wallets can distinguish themselves as Deirdre and Adi mentioned for the unique needs of who wants to use it. 

[40:38]
Some wallets may have heavier use than others but i'm sure if you looked at the stats for google search engine vs duckduckgo, it's probably more just because it's more of a household name but there is incredibly valid uses for duckduckgo as well. Good questions. 


___



___
### Attendees

+ Dodger 

+ Str4d

+ Daira 

+ Aurélien Nicolas

+ Adi ZCG

+ Ying Tong

+ Sean

+ Conrado Gouvea

+ Daniel Benarroch

+ Deirdre

+ Vivek Arte

+ Kris 

+ Andrew Johnson

+ Andy Murray 

+ Charlie O'Keefe

+ Dan Thomas 

+ Gustavo Valcerde 

+ Hazel O'hearn 

+ Jason McGee

+ John Law 

+ Michael Harms 

+ Muhammed Ali

+ Nick Takacs 

+ Pablo K 

+ Paul Brigner 

+ RJ Ricasata

+ Sasha S

+ Tatyana Vinogradova 

+ Winfred Mandela 

+ Yasser Isa


___

**Next Meeting Scheduled For: July 30, 2022 22:30 UTC**




