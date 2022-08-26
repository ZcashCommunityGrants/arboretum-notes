
# Arborist Call  #34 Notes

Meeting Date/Time: August 25th, 2022, 21:30 UTC

Meeting Duration: 50 minutes

**Agenda**: 
+ Zebrad Status Updates
+ Zcashd Status Updates
+ Open Discussion



Video of the meeting: [recorded]

Moderator: Steven Smith


Notes: Jason Rogers

___

## Decisions & Action Items

i. Workshop / Brainstorming session around Detection Key Systems



ii. Removal of orchard component from the address component of UA's prior to next SDK release


___

## Full Notes



### 1. Zebrad Updates 

[02:44] - **Teor**
We just rotated the Zebra team lead a few weeks ago so thats me now. As you might imagine it has been a slow month for Zebra development because we were all helping run a conference. We've mainly been doing some preparations for a release candidate. Looking at getting our testing all sorted, doing some dependancy updates, some minor performance improvements. Those kinds of things. 

[03:18]
Thats what we've been looking at on the Zebra side. There's a few minor fixes to the network protocol but we are mainly looking towards the next few releases where we are hoping to be ready for a release candidate. The last release which i think Conrado might have spoken about, we made a number of breaking changes to the configuration and a number of performance improvements. 


___

### 2. Zcashd Updates 


[03:52] - **Steven**

Excellent, and one thing I meant to say at the beginning, I think everyone on this call at least the panelists were physically at Zcon3. I was remote and I just wanted to give a huge shoutout to the people that put that on. The experience for someone attending virtually was absolutely first class. It was as good as any virtual conference I have ever been to. The quality of the stream, the organisation of what was coming next etc. Hats off to Danika, the co ordination was totally well done. Kudos to everyone involved. A lot of the engineers were doing session co ordination and the MC and fielding questions, that was awesome as well. 

[05:04]

Zcashd, a bit of an update on a few things. One of the things that has been top of mind for us for a couple of months now is an increased network load. Since mid-June, for folks that might watch the recording at some point. There has been a significant increase in shielded transaction load, we looked at the impact of that load across the ecosystem. On the Zcashd side, Node operations - the ability to run a node and the peer to peer network were not that impacted with the exception of block propagation which took a bit longer because blocks were full etc. 

[05:59]

Miners and exchanges that interacted directly with Zcash through a full node wallet were impacted primarily by elongated scan times. In the case of miners, increased orphan rate. Mobile wallets have been the most severly impacted. In some cases wallets just had severely impacted scan times or failed to sync all together depending on how recent you had synced your wallet. These wallets, Edge, Unstoppable, Nighthawk - the ones built on our SDK that relies on the SDK syncing capability. In most cases Ywallet and Zecwallet Lite performed fairly well. In some cases it did & didn't work for people. By and large they have been functioning pretty well. 

[06:51]

Historically our shielded transaction load is down here and starting mid June it really popped up. Mid June until here this is primarily an increase in Orchard transaction load then it dropped off and when it resumed it was all Sapling. Here it has dropped back down, these are transaction rates. The number of transactions have gone down. You can't tell a tonne about them if they're other than the number of inputs/outputs or actions in the case of orchard.

[07:01]

In this window where the blue line is above the black line, those were a larger number of sapling transactions that would average a little over 100 outputs. Where it dropped off the load is still there but the profile of the transactions have changed. The transactions now will be in some cases a little over 1000 outputs. So it's fewer transactions but each transaction has significantly more outputs. The rate has gone down but the 'net' is roughly about the same in terms of what has to be done to verify or validate a block. 

[08:28]

Chain growth as you might expect with that kind of increase is getting close to having tripled since mid June. Somewhere in here we were about 30gb and we are about 83 now. Chain growth because with the on chain data we are  storing associated with the shielded transactions has really kicked the chain up in terms of size. That's the current state of affairs. 

[09:11]

On the protocol side of things our priority has been on mitigating the impact of this increased load. We made some performance improvements to transaction verification times, block propagation times and Zcashd full node wallet scan performance. We've got some great partners we worked with in a lot of cases they would grab a development branch we were using just to go in and see if it had the effect we intended. We really appreciate all their help in verifying some of these things we had in development. That resulted in a couple of Zcashd releases, 5.1.0 & 5.2.0. 

[09:53]

5.1.0 had an 80% decrease in block validation times for sapling & orchard transactions and then some improvements to mining related RPC's to help reduce orphan rates. Zcashd 5.2.0 highlights there were continued improvements for block propagation times & significant improvements to Zcashd full node wallet scan performance through primarily increased parallelization.

[10:03]

The combination of those two releases, performance at the node level is not what it was pre-increase in load but at this point orphan rates have come down, they're not down as low as when a block has very low utilisation. They're in the 1.8-2.8% range according to some feedback from our partners. They were as high as 8% at one point. We have some partners with some incredibly large Zcashd wallets with several hundred thousand addresses in there, you can imagine scan performance could be quite impacted in that case. The scan is slower at the Zcashd level but it's nothing that prevents them from upgrading effectively. 

[11:16]

On the mobile side. I know this is a protocol focused call so rarely do we talk about anything outside of that but since this is highly related I did want to talk about some things that we are doing on the mobile side to address this load. it is a network level load we're seeing. The near term goal that we had prioritised for out wallet team was to 'harden' our mobile SDK's by including things like an updated FFI layer, improved syncing capability, which was always on out roadmap and other API's needed for our wallet and other apps using the SDK'S. We bumped the faster sync up in priority other the other items we are going to include to get that out sooner so that the partners using the SDK will get their sync performance within acceptable levels. 

[12:21]

The faster sync algorithm, we don't have it developed, we don't have benchmarks but our expectation is sync time will go from several hours or days depending on when you synced your wallet last going to less than an hour and we hope significantly less than that but it kind of all depends. 

[12:38]

ECC's focus as a company, we are looking at this holistically and not just from an engineering perspective. The number one thing for us we know there is a sync issue in our mobile wallet SDK's. Thats the priority for engineering, all hands on deck for that. In parallel we are doing outreach to all of our ecosystem partners to make sure they are aware of what we are doing around these issues and to understand if they have any lingering node level issues that we may not be aware of. 

[13:12]

We are shifting our research efforts at the moment from Proof of Stake which is where Nates been spending the bulk of his time, i'm sure you saw his excellent presentations at Zcon3, over to fee mechanisms and fee changes that would be consistent with our roadmap if possible. We've always kicked the idea around of some kind of EIP 1559 kind of thing, something along those lines. Nate's all in on doing that and will be reaching out to different people to discuss. I know Adi has a ZIP proposal as well, Nate has it on his list to chat with him to fully understand it. 

[13:58]

Whatever we do, fee mechanism or otherwise to help this, we want to holistically evaluate any change in terms of its impact to user experience. And how you would adapt that change in a mobile wallet for example or what impact it might have on mobile wallets. We want to make sure that anything we introduce doesn't potentially cause collateral damage in the sense that it causes other problems in the mempool. Because transactions are flowing if you want to send shielded funds you can. its going to get through, not a problem. Some things we could do might address the symptom but potentially impact people that are trying to use Zcash. So we have to really evaluate in totality how we would do something. 

[14:58]

We are also doing user research. Some of the growth team at ECC has been sending out surveys to better understand some of the issues people are seeing, their experience with different wallets, so we can summarise that and get it out to the ecosystem. Other research efforts related and prioritise changes that improve long term network resilience. Phase II of this is to identify; Are there other things we know could potentially be a problem and we've kind of kicked the can on it a bit - we're going to look at getting those addressed before they become problems. 

[15:48]

Thats a summary of the things we're doing both on the engineering side, across the company. It's an important issue and I wanted to make sure that we got that out there for everyone. 


___

### 3. Open Discussion -  Wallet SDK's 

[17:10] - **Daira**

There has been a fork of librustzcash that was used in the wallet SDK's and we're trying to get everything unified so that it's using the latest version of librustzash. 

[17:30] - **Str4d**

Steven mentioned that at the beginning of the wallet section which was just the unification pieces because there was some drift between the two pieces and its taken a fair bit of work to reify those because it's difficult to keep backporting performance changes we are trying to make on the main branch. That work is almost done, the performance work will be able to build directly on top of that. 

[18:10]

The goal of that then hopefully we will get to the position of having a new release of the Zcash client backend and Zcash client light crates which has been a while. They've been in a halfway position of refactoring and we've just not been able to get them to a stable enough point to release but i think after we've done these changes we might possibly be close enough to be able to do that. 

[18:40] - **Daira**

There will be some API changes but hopefully they wont be too difficult to adapt to. 

[18:49] - **Steven**

i think our plan there is to consume the SDK's with our internal wallet apps and really wrap out head around what kind of API changes there might be so we can work directly with folks to help streamline their adoption of the new SDK's. 

[19:08] - **Str4d**

For the mobile SDK's, yes. Because the other thing with the mobile SDK's is this upgrade will also be the one that transitions the mobile wallets to using unified addresses. So the first cut of that will be the one that people migrate, the internal wallets will migrate their data formats to the viewing keys that are the unified viewing keys with transparent sapling and orchard components and any key material that people maintain around that will need to be migrated as well. That will be a heavier upgrade for people to migrate to but necessarily it would have to happen anyway to get to that. The migration plan will be there once we've tested against the internal wallets. Then from that point the subsequent releases that add more performance should be significantly easier to switch to. 

[20:20] - **Steven**

Point of clarification, adding unified address does not necessarily mean having orchard support in the mobile SDK's? Or does it. 

[20:39] - **Str4d**

Correct, moving to unified addresses, what that will do, the unified spending keys will be migrated to have orchard. It will potentially mean that you could receive funds to the orchard component but it wont have any spend support at all. We may initially even remove the orchard component from the address component so that at least in that first iteration the UA's people are giving out don't include the orchard component while they don't have the ability to include it as part of the balance because that won't be in the next SDK release. The spending key side will have the orchard components in there so that the backend migration that some wallets may need to do of their spending material will just need to be done once to have the orchard piece. Orchard will come directly after that. 

[21:47] - **Steven**

Little bit of a lesson learned from the protocol there. In hindsight would have been a great way to have ruled out unified addresses first and then like orchard maybe in a subsequent upgrade but thats water under the bridge. Thanks Str4d & Daira for that clarification. 


___


### 3. Open Discussion - Sync Time Improvements 


[22:16] - **Dodger**

Obviously part of the issues that we've seen recently are due in part to the way lightwallets currently work, just their architecture. I'm curious as to, is the planned ECC wallet going to be built on that same architecture or are you looking at doing something different?

[23:00] - **Steven**

At the moment the plan is to leverage the lightwalletd intermediate server. There have been conversations that occured in the past randomly that would have a different architecture and didn't require a lightwallet server but thats quite honestly over my head to do justice trying to explain what they were thinking. To answer your question, the plan as we have it set right now is to use that same lightwallet architecture. Hopefully with the improved sync we are about to include in our mobile SDK's, projects that were built on those SDK's, the sync times will be acceptable.

[23:51] - **Str4d**

The limiting factor for the steady state for the most part is detection of new spends. Spends that are from the chain perspective unconnected to anything in your wallet. Everything else, there are things we can do and tricks we can play. The stuff that we'll be putting into the syncing stuff we are doing now which will then be part of the subsequent wallet leveraging all the tricks etc, given the way the protocol currently operates but the two things that would be significant departures from the way that wallets currently operate would be if we finally had a suitable detection key style protocol of which there are several potential opportunities now but all of them essentially require address changes so it's not something we can just roll out on its own. Rolling it out would require both halves of the connection. The sender has to be compatible with those kinds of detections and creating transactions in that way. 

[25:22]

It's doable and particularly once unified addresses are out and established and people are using them its something that could be rolled out on top of that. In terms of if it was rolled into the SDK then wallets that upgraded to the SDK could opt to give their peers the larger addresses that enable them to use this other syncing protocol. 

[25:46]

The other one is more of a fundamental shift in how transactions are synchronised. Right now people rely on the broadcast medium of the chain to detect transactions but there's

[25:56]

no need for that to always be the case. If you are at a merchant or you're buying your coffee & you have your phone. Your devices are in very close proximity, you may even be scanning a QR code for the purpose of making the payment. There are ways and means to have an opportunity for the transaction to be sent directly to the recipient. At which point you don't need to do chain scanning. So if you happen to operate a wallet or scanning node where the only way it receives transactions are by being given them by the sender then you don't need to do chain scanning because you don't care about seeing that information.

[26:56]- **Dodger**

Yeah, you still need to confirm that specific transaction is in the chain. 

[27:00] - **Str4d**

Yes, but that part is not the bit thats slow. The slowest part of synchronisation is the trial decryption of every single output in the chain to find brand new sources. If people have seen my [DAG sync proto-blog](https://hackmd.io/@str4d/dagsync-graph-aware-zcash-wallets) that I didn't quite get time to finish before it went public, i've got a note in there about if you think of the graph. 

[27:37] - **Kris**

Something I wanted to point to there also is that what you're talking about with wallets being able to become aware of the transaction immediately, there are also heuristics that we can use. Scan the blocks around the time that the wallet is opened first because the time that someone opens the wallet is the time they're most likely to be anticipating to receive a transaction. Those kinds of things will absolutely be possible with the changes that are required to make the DAG sync work. 

[28:09] - **Str4d**

Yes, but that is still really only changing the order in which you scanned things, it doesn't really change the fact that for wallets to avoid that they basically need to either go to a detection key system which means you can offload the detection in a privacy preserving way to someone else who has the time to scan the chain for you or you set your wallet up in a way where you don't have to scan the chain. 

[28:45] - **Daira**

So historically one of the reasons we haven't completely embraced sending transactions out of band is that we want to be able to recover if a user only has the wallet seed so they have to regenerate all of the addresses and rescan. If your goal is to reduce the effort of syncing in the common case and you can allow a much larger sync process for recovering from seed then that's not as much of a problem, provided you still keep the outputs on chain which does increase the bandwidth needed on chain. 

[29:42] - **Dodger**

My mental model of str4d says that he's about to respond saying he wasn't suggesting we only send the transactions out of band. I think he was suggesting that they get broadcast to the network and also the information to make it easier to find the transactions sent to the terminal.

[30:05] - **Str4d**

You have a very good mental model. Absolutely correct, another thing that is noted in the DAG sync is once you have discovered a new source you can fold that into your graph so in the case where you need to do a chain recovery, you still don't need to do the linear scan. If you are in the mode where your wallet is always receiving things directly so in it's steady state it never has to scan, and then once it receives something it proactively nits it into its graph then you also don't need to do a full linear scan when you recover from seed. You just need to scan to find your most recent things and then that is good enough. Modulo maybe a full linear scan at the very end to cover anything that falls through that gap. For the most part you can completely avoid it. 

[31:22]

If you're in the paradigm where your wallet only detects funds. So if in steady state it never scans the chain and trial decrypts everything and it only detects funds that it was literally told about then once it receives those funds you just need to ensure that the funds you received are downstream of your graph. So your wallet then makes a proactive transaction to merge the funds you received with some existing funds that you are already tracking. So on recovery, you wont necessarily find that transaction that you received it on but you will find the funds corresponding to it. At which point the only reason to do a linear scan of a chain is history recovery rather than fund recovery - which can be done with a lower priority. 

[32:35] - **Daira**

Thanks, you had mentioned it before and I hadn't got the detail right. 

[32:47] - **Dodger**

I thought a lot about detection keys because it can be a game changer in terms of number 1, massively reducing the computational & storage load for lightwallets but also the ability to have somebody else do the scanning for you without having to disclose everything to them is really interesting because at the moment we have limited number of lightwalletd servers but imagine a future where you have the option to run a 'detectiond' style service as part of your node.

[32:57] - **Dodger**

Imagine when you start up Zcashd or Zebrad option where you can include this. Then you can have the drastically reduced bandwidth, you could have a lightwallet that gets switched on maybe connects over Tor, connects to a node, tells the node 'the last block that was checked on my behalf was this. These are my detection keys, can you please check from that block until now or from that block until another block'. Bouncing across multiple nodes doing 1000 blocks each. You assemble everything in the lightwallet. You have strong privacy preservation because although the nodes know that you're interested in specific transactions if you're connecting over Tor, they don't know who you are. I think detection keys are potentially very powerful and something we should do some brainstorming on or get a workshop around.

[35:25]

That then leads us towards a more decentralised Zcash network. Think about it right now, there is strong centralisation for lightwallets. There are a certain number of light wallet servers that are operated by people and theres a certain semi-centralised point of failure but also potential attack points. Whereas if you have every Zcash node prepared to do a little bit of scanning for folks then it would be interesting. Obviously the computational load of that scanning would be a factor but you could build in some form of throttling or some form of payment. 

[36:24] - **Steven**

That's a great idea dodger. Another thing too, a full node thats doing scanning on your behalf, usually a full node is going to have some decent hardware for the most part. You could probably run a consumer laptop if you wanted but in a lot of cases this is some pretty high powered computers running nodes so scanning would be relatively fast compared to a smaller device. 

[36:52] - **Pacu ECC**

I wanted to comment on the transacting thing mentioned before. There was some things that we are not exercising which is is the mempool things. Currently the wallets don't actually monitor the mempool actively to show transactions or incoming transactions. So there is a lot of room to improve perception of transaction speed with that considering the mempool. I think things are less complicated and we are still not fully profiting on before doing complicated stuff. 

[38:17] - **Steven**

Dodger had a comment, I think Zecwallet Lite looks at the mempool to some degree. 

[38:32] - **Pacu ECC**

It does to some extent, yes. 

[38:36] - **Dodger**

I think it's more about being able to spend your change after you send a transaction. 

[38:42] - **Str4d**

That's a transparent thing because you can't spend shielded change until its been mined. So the fact that its in the mempool is irrelevant but for transparent that is indeed the case. If you want to improve the efficiency of transparent then you absolutely would interact with the mempool. It also wouldn't matter because its transparent. We're not trying to hide anything there. 


___


### 3. Open Discussion - Sync Time Improvements (ii)



[39:05] - **Steven**

The question that came in: 'The increase in the blockchain size associated with the higher volume of shielded transactions is very alarming. Maybe turn off shielded transactions until this is under control.' 

[39:24]

That would definitely stop the increase in chain load. If you couldn't do a shielded transaction it wouldn't be growing at 1gb a day. We could do that but I think it would destroy the product. 

[39:40] - **Str4d**

I disagree. If the increase in chain load is due to a desire to increase chain load then transparent transactions can be used for that. The chain growing at the rate it is, is due to blocks approaching fullness. Blocks can be filled with transparent transactions, turning off shielded has zero effect on that. What it would do is decrease the cost of validating a full block of transactions vs a full block of shielded transactions because you don't have the proofs to verify. It doesn't effect the data storage cost. 

[40:35] - **Steven**

You'd still have the same amount of data, it would just be transparent data as opposed to shielded data. 

[41:01] - **Daira**

For the sake of argument, let's say i'm an attacker and my goal is to disable shielded transactions, and we just disabled shielded transactions in response to this situation, then i've achieved my goal. So i don't think we should do that. 

[41:27]

I have suggested not as a consensus rule but as an option that miners can take, effectively halving the block size. I don't know what other people's opinions are about that. It would halve the increase in chain size, it would roughly halve the syncing and validation times so i wonder what peoples opinions are. 

[42:16] - **Steven**

We had a conversation about that with Nate and Sean and the concern was, there are some different things you might do but do they cause other problems that might be worse. For example if you cut the size of a block down significantly and you keep the block time the same then the amount of data you can put on chain is clearly reduced. Does it then create contention for block space beyond what you see now where there's a certain profile of transaction that's associated with this increase in load and then there's normal shielded transactions. 

[43:00]

Would it then impact people just paying for their coffee at a coffee shop because they cant get a shielded transaction mined or accepted in a block, I don't know the answer but its the type of thing we should really think through. 

[43:14] - **Daira**

I have a response. We effectively doubled the transaction bandwidth with blossom by reducing the block time, although the effect on bandwidth is the same as halving the block size. So when we did that, we did so based on an estimate of validation time for a block, what the effect would be on orphan rates etc. I think with hindsight this situation has shown that we made some miscalculations there. I know that those calculation were explicitly based on us implementing parallel verification which we've done now. Even with parallel verification we are still on the edge of what is feasible to cope in terms of transaction bandwidth. There's an argument to be made maybe we did miscalculate, maybe only temporarily until we've implemented other changes we should reduce that effective rate. 

[44:46] - **Dodger**

My point is that I think it is a valid temporary measure. But i think in the world that we all hope exists in 5-10 years time, we'll have far more transaction volume than this. In a way this is actually a really good thing to have happen because it's forcing us to improve things. 

[45:36] - **Steven**

I was going to say i'm going to channel dodgers mental model and say this is actually a good thing but you beat me to it. 

[46:08] - **Str4d**

We are definitely getting to significantly better positions than where we were at. Even the full node stuff that we've done thus far, there is still more that we could potentially do. It's just doing that more would take significantly more to implement and there's a time opportunity where we've spent a bunch of time working on the full node, now we have to spend time working on the wallets. That's not to say there aren't some longer tailed things we cant do to the full nodes for the current behaviour to improve performance. 

[46:47] - **Daira**

It is also worth pointing out that effective blockchain size decrease can be implemented using options that are already in Zcashd. Miners can just do that on their own but they're probably only going to do it if we told them to. 

[47:09] - **Steven**

This is obviously longer term but i'd love to see options with Halo 2 and recursion around transaction aggregation or block aggregation and then the type of load we would hope to see in the next 5 to 10 years is going to be organic beyond what we're seeing now. We've got a scalable solution for the next wave of load we might encounter. 

[47:56] - **Daira**

There has been a proposal to change fees to make them roughly proportional to the number of inputs + outputs that Aditya from Nighthawk filed as a draft [ZIP 317](https://github.com/zcash/zips/pull/631). So I would encourage everyone if they have opinions about that to look at the draft ZIP and comment on that if they want. 

[48:28] - **Steven**

One of the things Nate's shifted his focus on short term is fee mechanism research to see if there would be options. He's going to be reviewing Adi's proposal, some other ideas. Nate's been looking into EIP 1559 type things forever as it might apply to Zcash. Just trying to merge up that work with understanding Adi's proposal better and are there some options we could implement with the understanding of not creating a UX nightmare around fees. Making sure they are effective & fair and proportional to what you're trying to do. Take a look at that, I think its [ZIP 317](https://github.com/zcash/zips/pull/631).


___


### Attendees

+  Daira Hopwood 

+  Dodger

+  Conrado Gouvea

+  Deirdre

+  Kris

+  Pacu ECC

+  Str4d

+  Teor

+  Andrew Levin

+  Andy Murray

+  Arya Solhi

+  Ben Beale

+  charlieok

+  Daniel Wolande

+  Jason McGee

+  Michael Harms 

+  Tatyana Vinogradova


___
___

**Next Meeting Scheduled For: September 8th 15:00 UTC**




