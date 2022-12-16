# Arborist Call  #42 Notes

Meeting Date/Time: December 15th 2022, 22:30 UTC

Meeting Duration: 1hr20m

**Agenda**: 

+ Welcome and Meeting Intro 


+ Zebra Status 


+ Research & Implementation Update
    

+ Core Update


+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://gateway.pinata.cloud/ipfs/QmaGbrUrgtN9x657P63EByvhS9qKC8hsfA1dvFbht3NTd6) [2](https://gateway.pinata.cloud/ipfs/QmS37bym2QebekmqVZGQEGRXDY6sRnMM2QYJdeeqwC5nia)

Moderator: Ian Sagstetter

Notes: Jason Rogers

___

## Decisions & Action Items


i) List tradeoffs between Liberated Payments/Detection Key protocol/Out of band Notification system

ii) Organisational changes w/ goal of making external contributions easier on halo 2

___

## Full Notes


### 1. Welcome & Meeting Intro - Arborist Call Hosting 

[00:00] - **Nate**

For community members hosting Arborist call maybe some people might be wondering what that might entail. I am not exactly sure on the details but i think it might be having the calendar even set up and the zoom hosting and we start rotating through who hosts. 

[02:39]

Part of the thinking there is to get more community involvement and rotate around organisations because generally at ECC we want to try spread responsibility that are broad and open to the community to have more stakeholdership. So once we are doing that maybe it evolves into something more. More collaboration on setting agendas, more collaboration on figuring out who to invite or who to ask to present. Let me know if you're interested. 

___

### 2. Zebrad Updates - Zebra rc .2 / FROST status 


[05:41] - **Teor**

I am Teor, I am the current Zebra team lead at the Zcash Foundation. I'm going to talk through some recent updates that we've done to Zebra. About a week ago we released our [rc.2 release](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.2). That's  our third release candidate. 

[06:04]

In that we implemented ZIP 317, the conventional fee for evicting mempool transactions and we fixed an occasional crash and memory errors when Zebras RPC server was shutting down. If you're using Zebras RPC's that would be a good release to upgrade to. We've mainly been focusing on getting support for mining pools getting implemented in Zebra. At the moment this is all behind a rust feature because its not production quality code. 

[06:42]

We've finished off the main two RPCs used by mining pools, thats getblocktemplate & submitblock and we're busy filling in other RPCs that mining pools use for statistics or checking status, those kinds of things. The full details will be in our release notes when they're ready. Recently we've just got to the point where we can produce block templates that are pretty similar to Zcashd's. We are currently working through some differences allowed by the consensus rules to make sure that we are producing valid blocks because one way to do that is to make sure we are producing the same block template as Zcashd.

[07:40]

The other thing thats in the draft of the next release is that we implemented ZIP 317 for block selection for the block template. So that will refuse to mine or delay mining very large transactions that pay a very low fee if the mempool is full or if there are a lot of them in the mempool. That's where we're up to, happy to answer any questions. 

[08:17] - **Nate**

What is your criteria for switching from release candidates to production release?

[08:30] - **Teor**

We want to make sure that all of the production code in Zebra has been audited before we call Zebra a stable release. We've tagged release candidate 1 and we'll say to the auditors "can you check this and make sure it's ok". Similar to what Zcashd does, we want to make sure it's audited before we say it's ready. Also a lot of the draft stuff we're working on is hidden behind a rust feature so it isn't production code yet, it isn't getting audited. 

[09:22] - **Deirdre**

I can give a quick frost update for our threshold signatures work. I think we have completed the last call period for IRTF. We think the frost specification for threshold signatures that we plan to use in a randomised variant for Zcash signing looks good to go, we are making small changes from the feedback we got in the last call period so we'll be cutting a version 12 and we think that is the version that will become a real RFC. 

[11:02]

We've updated all of our FROST code that implements the RFC draft to be compatible & our colleague Conrado has implemented all of the parameter sets included in the document. That includes ed448 and he's working on the randomised variants for the Zcash parameters including redjubjub and red palace for sapling and orchard respectively that we need to create threshold signed transactions. That is happening and ongoing. We are planning to do releases of all the frost parameter signature libraries, FROST, ristretto, ed5119, secp256 and ed448 to crates.io & we'll be keeping those up to date with any changes to the RFC. 

[12:12] - **Adi**

I was curious if anyone from the Zebra team has tried running zecwallet full node with a Zebrad wallet running on the side? As I understand the zecwallet full node needs an active zcashd client running. 

[12:42] - **Teor**

I think we had a look at that but i am not sure where we got to. I don't know what RPCs zecwallet full wallet needs. It would depend if we've implemented those RPCS yet. We just implemented the ones that were needed by lightwalletd and now we're moving on to the ones that are needed by mining pools. If that happens to overlap with whats needed by zecwallet fullnode then it should just work hopefully. If not, open a ticket. I don't think we've looked into it in detail. 

[13:39] - **Nate**

I am not certain but i thought maybe zecwallet fullnode used zcashd used zcash wallet RPC calls. If thats true then it relies on Zcashd to hold wallet secrets and do scanning and generate transactions and things of that nature. I am curious if Zebra plan to add that kind of functionality?

[14:14] - **Teor**

Good question. We don't have any plans to add wallet support inside Zebra at the moment but we are working on things that maybe would require wallet support so we might do that in the process but we're just not ready to announce stuff yet. There's nothing happening yet, its out there in the future as a maybe if there are compelling use cases we need to support for it. I guess if it is using wallet calls then no, Zebra doesn't have wallet support, we rely on lightwalletd for that.

[15:02] - **Nate**

I am not sure what the other Zcash developers think but I personally often wish the wallet functionality was not imbedded in the Zcashd codebase. Or not the same process at least. 

[15:24] - **Teor**

That is part of our reasoning. We were hesitant to host spending keys in particular in the same address space as an entire implementation of a consensus node, network parser. Even though it's in rust there's still the potential for privacy leaks in the same process. That was our concern, if we were to go along with that we would have a long think about our architecture before we implemented things that handled your private spending keys. 

[16:11] - **Deirdre**

We had a design for a separate binary that would be a separate wallet and it would communicate with your Zebrad by registering viewing keys to do scanning, but we haven't pursued that yet because it requires a whole other binary and we wanted to support the lightwalletd & mining cases before building our own wallet functionality whether its part of Zebrad or a separate binary. 

[17:04] - **Teor**

We got a bug report about Zebra not handling the Zcash network protocol correctly. In our next release there will be an update that makes zebra handle the version message, connection setup more correctly. It's still not quite like Zcashd because zcashd allows a whole bunch of optional fields but at the very least we'll be compatible with things that don't send the relay fields at the end of version message. Thats there for people who are trying to run Zebra and get it to appear on block explorers/network explorers or DNS seeders. We think we've fixed some bugs that stopped it appearing on those a while ago, this is another that might be causing that problem.

[18:03] - **ZecProphet**

So Zebra app devs should assume lightwalletd will be required to interface with zebrad?

[18:09] - **Teor**

If you want to run a wallet then use lightwalletd. If you want to use the JSON RPC calls in another way, feel free to call them directly. For example we've had people who are interested in just looking up information for particular transparent addresses or looking up various kinds of statistics etc. You would need to use something that either talks JSON RPC directly or sits in the middle and translates that to a protocol you understand like the lightwallet protocol. 

[19:04] - **ZecProphet**

Messaging, use lightwalletd or zebrad? Thanks.

[19:05] - **Teor**

Effectively you should use lightwalletd if you want to run a wallet or you should use Zebrad directly if you want to call some other JSON RPC calls. 

[19:31] - **Str4d**

Just as far the RPCs. Is submittransaction one of the RPCs that was needed to lightwalletd?

[19:39] - **Teor**

Yes, currently we have support for submitrawtransaction and then if you activate the getblocktemplate rpc you can also submit a block that you've mined elsewhere. Definitely those rpcs are included. 

[19:56] - **Str4d**

So if someone wanted to do their own wallet stuff or messaging stuff or anything themselves they could have their own process thats using the rust crates to do that building and then use zebrad to submit their transactions to the network. 

[20:13] - **Teor**

Or you could use the Zebra JSON RPCs directly if you want to run a wallet thats a bit more low level. All that flexibility is there. There should be enough functionality to do that. If there is something small missing please open a ticket and let us know. 

[20:41] - **Nate**

I noticed one other question, Autotunafish was sharing a project their working on called [zclimate](https://github.com/autotunafish/zclimate) which is a frontend for Zcash cli wallet. If you are curious to check that out.


___


### 2. Research & Implementation Updates - Shielded wallet UX & payment scalability


[21:15] - **Nate**

Research update is that I have effectively paused research I was doing on PoS & Interoperability in order to focus with the rest of ECC on engineering improvements to address the performance issues, especially for shielded mobile wallets given the high output transaction load. Thats been our full focus across ECC engineering team. We're still doing halo improvements towards adding support for recursion.

[22:17]

Once we feel like we've gotten to a place where shielded wallet users are able to use user wallets without significant usability disruptions, even in the face of the high load, then we'll begin to branch out into more priorities again. Our plan even then is to focus still on improving mobile wallet scalability and performance further, beyond just remediating the current usability issues. We want to turn some of our research attention on "can we make qualitative improvements in scalability or UX"? 

[23:11]

So we plan to spend about a year focused on that during which time we probably wouldn't make much progress on PoS or Interop. We are likely to be doing early pieces of those and also investigating how they might relate to payment scalability improvements. 

[23:53] - **Deirdre**

Can you tell us a little more on what sort of directions you're looking at for wallet scalability? One of the motivations of recursive proving with halo2, which hasnt been deployed yet but is one of the promises is that deploying recursive verifying proofs would have scalability for the network. Or the full, (as you approach the limit) cost of verifying the chain. Is this part of that or is there a different set of ideas you are pursuing for wallet scalability?

[24:41] - **Nate**

We haven't in earnest started looking at it because we are focused more on making scanning work well now using the current lightwalletd design and shielded mobile designs. We do want to investigate payment scalability improvements. You're right that a lot of the focus on how recursive proving would be useful would be to improve validation of full nodes which doesn't help mobile wallet UX directly. 

[25:28]

The kinds of things we've had discussions about might be ways to replace lightwalletd or augment it. A simpler example might be adding some sort of out of band signalling service that protects privacy properties but allows a sender to send a notification to a recipient to notify they've sent a payment. This could be a hint of which blocks to scan or be the transaction itself. Thats the primary brainstorm we've had so far. 

[26:19] - **Deirdre**

Would that be on-chain or would that require separate infrastructure to facilitate?

[26:26] - **Nate**

The thinking for that would be off-chain. One way to do it is like an auxiliary system that wouldn't modify any of the existing infrastructure so if it fails everything would continue operating in the current way. Instead it would be an auxiliary notification system for recipients to notice incoming payments sooner.

[27:02] - **Deirdre**

How would this be better or different than me just signalling my friend that i just sent you a payment?

[27:12] - **Nate**

You would still need to wait for your wallet to detect the incoming payment. This would be a way to speed up/shortcut that process. Thats not really a scalability improvement, it's a ux performance improvements, its arguable how much of an improvement it is because it has various tradeoffs but thats one example how we want to make sending shielded payments work better for users. 

[28:05]

A separate thing we might want to consider is, are there ways we can improve the scalability of shielded payments? That might involve a lot of things. We might want to consider "how much is lightwalletd a bottleneck & are there improvements we can make around that"?

[28:54] - **Adi**

I have two questions, since the size of the blockchain has grown a lot, many users cannot run the full node. Has any thought been given to having a pruned version of the Zcashd running, not caring of the past history if you have certain checkpoints?

[29:20] - **Nate**

We have given some thought to that. We have prioritised shielded wallet ux as number 1. The blockchain size growth is a problem and it's a secondary priority for us right now. We've discussed an expedient thing we might do, to ask miners to configure a setting that would reduce the size of blocks they generate. [(see. call 34)](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2034-Notes.md#3-open-discussion---sync-time-improvements-ii-fee-change-mechanisms--zip).

[30:03] - **Str4d**

It doesn't help with historic issues though. Regarding that, zcashd does have some support for pruning and there are things you can configure, it doesn't work in all cases because it wasn't something that had historically been necessary to maintain. It is something that is there and although it's not our priority to work on that because we are doing other things right now, we would very happily accept PR's that improve zcashd's pruning ability if someone had time to work on that. It would very likely happen at some point. 

[30:55] - **Adi**

My second question was around the timeline for ECC's next year focus on UX. The community wants to know is the ECC mobile wallet expected?

[31:14] - **Nate**

I am not too certain yet. I think our focus on improving existing usability and performance issues is largely focused on improving our SDK. So that has slowed down to some degree development of our own wallet, although we have an early prototype that we're developing against our SDK and we're using that to validate the design of the SDK. I don't think it's likely we would be able to ship our own mobile wallet before the first half of the year. It seems plausible we could do it by the latter half of the year. I am not highly confident we could do it by the latter half of the year. 

[32:32] - **Pacu**

To chime in on what Nate said, we are fixing the SDK's and making them fast for everyone that uses them. The ECC wallet is in a second or third background place until we sort everything else out. Thats the work we are giving it right now. Our complete focus is on the SDK's and things for everyone to use. 


___


### 2. Research & Implementation Updates - ii) Liberated payments, Detection keys & Out of band notification


[33:44] - **Dodger**

I seem to recall years ago we discussed, there was a specific terminology for it. 

[34:25] - **Str4d**

Liberated candidates. 

[34:28] - **Dodger**

Is that something you guys are looking at? Secondly, the sandblasting of the Zcash network got us thinking about the scalability & performance of mobile wallets and how do we move away from this model where your mobile wallet has to download every single shielded transaction before it can detect? There's obviously detection keys, that requires a change to the protocol so Deirdre has been looking at what OMR might enable. That might enable something without requiring a change to the protocol, it doesn't look like it will. There's a draft blog post that will be coming out that will summarise Deirdre's research. 

[35:37]

It feels to me like a way to make quick progress would be to implement detections keys. I know it's not as straightforward as simply doing that, there's figuring out about how do you derive the detection key & making sure it doesn't allow people to link payments etc. But it does feel like it's a doable solution in a relatively near term, as opposed to something we are looking at years away. I wanted to ask if that's something you've been thinking on as well? Liberated payments & Detection keys.

[36:31] - **Nate**

Yes, we have discussed and thought about those things. Those are the kinds of things on our mind in the bucket of payment scalability improvements. Again, we are not actually starting that research yet. I would expect we may start after the 1st quarter of 2023. Our current work on improving usability with the current sandblasting is largely focused on changing our SDK. We are planning on potentially adding a new method to lightwalletd to facilitate a faster scanning & developing that and shipping it will take a few months.

[37:41]

So Liberated payments, detection keys, the out of band 'hint' i've mentioned as well as oblivious message retrieval. Those are all the kinds of things we do want to focus on that we're saying we want to prioritise that sort of stuff before continuing with PoS in 2023. I look forward to examining those different options with the community.

[38:14] - **Dodger**

I think we'd certainly be interested in doing a deep dive on detection keys to figure out what the lift is there, what the pre requisites are & how difficult its going to be. 

[38:30] - **Nate**

I was party to at least one conversation about that. We do have some concerns about performance on a lightwalletd. Theres a bunch of different tradeoffs. If each wallet has its own detection key then the lightwalletd's node grows with the number of users its supporting. There might be another way you can have a shared detection key with the lightwalletd server that the clients use, those are privacy challenges. 

[39:12]

We've talked a little bit about it but not enough. The next step that would be nice to do would be to put all of these ideas next to each other and start sussing out what the tradeoffs between them are.

[39:33] - **Dodger**

One idea that crossed my mind was the potential for computation load and therefore cost of them running the lightwalletd is potentially significant. If only there were a way of paying someone to scan for you. To make a micropayment and scan the next 10,000 blocks for a detection key with a response on the cost x zatoshis & you pay it for it. I think enabling micropayments is something that could have a lot of use cases. 

[40:39] - **Str4d**

As far as things like detection keys etc. There has been a fair bit of movement since we first started investigating them back in 2019. There are definitely some more viable options if someone wanted to spend some time mocking up what that might look like as a proposal. That would be a way that someone in the community could help shortcut some of these investigations. 

[41:15]

The actual act of getting something in like that is going to require a network upgrade. There are things that could be done to hide it in existing transactions but they end up rather messy. Now is definitely the time for people who are interested and invest in this kind of thing existing to put together mockups which would make our job as protocol reviewers & engineers determining how things will fit in - easier to evaluate. 

[42:04]

If the options we need to consider are available instead of needing the R&D still. 

[42:14] - **Deirdre**

The new lightwalletd API, DAGSync? or something like DAGSync?

[42:24] - **Str4d**

Related. The one thats coming in the near future, hopefully early next year is just a way to get the necessary data for the witness tree update logic through to the client. Kris has been doing some excellent work on the new tree structure, we've actually been through several tree structures and different designs and ideas for how the tree component of DAGSync will work. The short piece in terms of what lightwalletd needs for this is each compact block that gets synchronised, in addition to what it currently has, we would need the ability to annotate the position in the tree of the first note in the compact block. To locate within the tree where the range of when you do a getblock request & you get stream of blocks, where does each block live in the tree. 

[43:35]

Potentially the ability to eventually filter compact blocks so you can get a view of the stream thats just the note commitments for instance. You can say "I need information about this subtree in the commitment tree" I can just stream that data but i don't need all of the outputs. You may still want to do the outputs because the DAGSync can be adaptive in terms of bandwidth and decisions. The main new RPC is the ability to gain roots of subtrees. 

[44:13]

Currently the subtree depth that we're thinking of is 16 so each 2^16th subtree (halfway up the tree) the root of that would be something that light clients would be able to query. Which in the case of Zcashd, we already store that information implicitly in the way we store the incremental merkle tree front tier per block. You can from that recover the root of 2^16th tree because a single block cannot contain 2^16 notes it's impossible for a single block to spam more than one 2^16th subtree. 

[44:54]

It's equivalent if you've heard of some previous talk about bridge, its the newer way of thinking about doing that sort of thing. These are just points in the notes within the tree that if you can just fetch a couple of those points you can along with the leaf nodes do all the fast forwarding you need to.

[45:17] - **Deirdre**

Very cool, are you implementing this in rust? Can we use it?

[45:19] - **Kris**

Theres a draft PR up that I can point you to. 

[45:37] - **Deirdre**

Second point. It seems that all designs that try to offload detection either via detection or via OMR (Oblivious message retrieval) will offload some compute load that is mostly linear to the number of keys being registered with a full node that supports this sort of stuff to the number of keys that are being detected for you, either fully homomorphicly or less so. I think unless we have some other kind of breakthrough we will continue to run into the problem of a full node do work on any number of users behalf's, it'll continue to scale linearly to that number of users. We'll have to live with that unless some breakthrough happens.

[46:37]

Three, it sounds like leveraging the recursion properties of halo 2 proofs that we deployed with Orchard is getting pushed further down the priority list. Is that ever going to get deployed on Zcash?

[46:51] - **Str4d**

On the third point, we cant deploy recursion until recursion is implemented and implementing recursion is still high up on the priority list. We have been working on it slowly because we have been working on addressing the performance issues but we have had people working directly on it this whole time. Actually using it is a conversation for once we have it available. 

[47:35]

To the second point, I agree with you on terms of the current techniques being inherently linear, which is why my thinking is that the benefit you get from using the current method of using the blockchain of your broadcast medium is the high privacy you get from not revealing what you request. Although as we all know the light clients then go and request the full transaction so you reveal that transaction to your local lightwalletd. 

[48:09]

But the move to shifting the detection work from being linear in the number of people using the network to being linear in the size of your personal transaction graph (who you are making payments with) to me seems the only way to escape that issue. Because then the on-chain coordination is just in terms of ordering & correctness. It's there if you need it but you're not relying on it for detection. 

[48:50]

Most of that is just making bluetooth interaction APIs work in android or NFC or QR code scanning for hints. Relatively not interesting cryptographically but very useful UX wise work that can & should happen. Even without using a mixnet or hidden services or any other mechanisms for stop & forward mailers etc. There's a lot we can do in the near term at the wallet UX layer to alleviate this pressure. 


___


### 2. Research & Implementation Updates - iii) Halo 2 recursion & Priority timeline



[49:37] - **Nate**

I had a comment on recursive proofs. I have the impression we have a fairly good idea of how its helpful to improve the amount of data validating nodes need to retrieve or validate but i am less certain how it will be helpful for payments. It feels like payments is really the lynchpin or should be more of the priority, at least right now. 

[50:24]

My current thinking on recursion is it is likely to be helpful down the road, around a PoS transition or maybe prior to that for making validators lighter cost but that doesn't directly improve shielded payment scalability - which seems like should be the highest priority, what we want to work well & responsively for as many users as possible. 

[51:03] - **Deirdre**

I am just aware of the fact that halo 2 was sold as we should do this and we need recursion to scale Zcash. That was part of the motivation to do NU5 which was a big lift & delayed a lot. The fact recursion is being pushed more down the priority list both because it's not ready in the implementation of halo 2 & also because something else came up and it's not even the sandblasting attack on mainnet, its this other thing which is not important. This thing we sold NU5 on, because everything flowed out of the adoption of halo 2 - all the big changes. Partially motivated by recursion but also moving away from trusted setup and now we dont see it getting deployed any time soon. 

[52:03] - **Nate**

I can describe our thinking prior to the sandblasting attack was transitioning to PoS would be valuable so that's what we were advocating for. I do think recursion is helpful in lowering the cost for validators. For example, if its possible for many people to run validating nodes, that has advantages. They might be able to participate in running as validators on a PoS consensus system and earning payments from the network protocol for doing that. 

[52:49] - **Deirdre**

But PoS was also being pushed down the priority list as well. 

[52:54] - **Nate**

Explaining our thinking prior to sandblasting. Prior, we believed making this transition to PoS would be beneficial to Zcash users as a whole and i do believe recursion is useful for that. Once sandblasting began and we saw we have all these problems with scaling shielded payments, we changed our priorities to focus on that. If we had no usability or scalability problems currently even in the face of sandblasting then we would be proceeding with PoS transition research and I believe recursion is valuable for that. 

[54:15] - **Deirdre**

Right but the whole Halo 2 recursion, we need it for scalability of Zcash came before we were talking before PoS and came before sandblasting. We were working on NU5 for over a year before PoS became a thing. 

[54:32] - **Str4d**

I think there is a mix of terminology going on in terms of what people mean by scaling. Scaling as we are currently dealing with like right now with sandblasting, for the current capacity of the chain - how do our wallets and such function with it?

[55:07]

Scaling as was being talked about in the time halo was originally being proposed for that is more along how do you increase the capacity of the chain? They are two orthogonal but complimentary components of scaling. The halo 2 components & recursion are the long term planning for long term scalability and are still necessary components of that. If we were doing that long term scalability pieces, the act of doing so would also have an effect on short term scalability. 

[55:50]

If you can imagine the sharding designs that were being proposed then the users only need to deal with the throughput on their own shard. So if we said with the current capacity of Zcash and deployed recursion based scaling as sharding but dont actually increase the capacity of the network then each individual users experience would have gotten better because the amount of data they would need to process would be lower. But separately there are also scaling improvements needed for when you have this firehose of information you need to process regardless of how it ties into the rest of the Zcash consensus. 

[56:32]

Thats essentially where I come from in this. It enables a scaling improvement, we unfortunately don't have the ability to work on that now because we are doing a different component of the scaling improvements. I have not seen any new information come in that has changed my opinion that recursion based scaling is what would be needed to grow the chain beyond its current capacity. 


___


### 3. Core Updates - Zcashd status update / DAGSync development


[57:45] -  - **Str4d**

On Core updates, we had a 5.3.1 release which was mostly hotfix stuff done as a normal release because we accumulated some other bits and pieces into it. That was mostly addressing high memory usage problems during IBD which were the result of the changes in high load but also the chain got to a certain point the amount of data related to equihash had to be kept off. We deployed that, at the same time a change from a community member came in to backport a headers first fix.

[58:28]

The way Zcashd does chain downloading as built on Bitcoin cores design is you always fetch the headers linearly & in order. Then you can fetch blocks in parallel and once you've received the blocks you need to connect in order you can now update the chain. The rationale there is the headers are very small and the blocks are much larger. In Zcash's case the headers are much larger due to the equihash solution. 

[59:09]

The headers first fix was that it was waiting to download all of the headers before starting to download blocks. It was a bug in upstream Bitcoin core that the fix got backported but in doing so that then uncovered another problem related to when flushing happens. Another component of Zcashd's bitcoin core based design is that data is all cached in memory and operated on from that cache and the cache is periodically flushed when certain limits are exceeded. In upstream Bitcoin core the primary input to that cache was the chain state, what they call coinsDB. 

[59:52]

In upstream Bitcoin all they contain is the UTXO set. In our case it also contains the set of nullifiers and commitments etc. That chain sets size is managed & tracked for deciding when to flush. The equihas solutions are now themselves effectively a cache but on the chain data size and that is what is not being tracked correctly. On bitcoin there was no need to because the headers were so small. We've temporarily on 5.3.2 reverted the headers first fix. So if you have enough memory to run your node. 

[01:00:35]

Essentially what was happening was the entire blockchain header would be downloaded then would start downloading blocks and that would be the first point it would flush and so it would result in a temporary doubling of memory usage to 10gb or something - not great. If you have enough memory to do it you can run 5.3.1 and you get the benefit of the headers first fix. If you don't 5.3.2 reverts the headers first temporarily & probably 5.4.0 which should be out mid to late Jan next year we will have fixed the caching problem so we can have both. 

[01:01:05]

The other thing on Zcashd, Greg has been working on unifying a bunch of our changes to how our transaction building works in Zcashd's full wallet. Part of what that will enable is an RPC design that allows you to do a propose-commit style of creating transactions, which is a direction we want to move both this and the mobile sdk's to. Where the user says "I want to send x amount of funds to these addresses with this fee". and you get back "ok here is the proposed transaction including things like what the effects of transaction are, who its going to, what change outputs are going to be generated, what privacy effects is it going to have". 

[01:02:05]

Right now we have something of the sort for z_sendmany, which is a privacy policy, a simple way because we don't have this two phase API its a simple way for the user to say "I only want you to do things up to this privacy policy level" so it will fail after that. With the 2 phase API the direction we're heading is, it will do whatever it needs to in the proposal to satisfy what you've asked it to do and then you can inspect the result of that and compare it to what you would have said is the privacy policy in z_sendmany and confirm if you're happy to be built & sent off. 

[01:02:48]

Then you could do optimistic building which is what the mobile sdk will do to improve the UX once its deployed. Moving to trust the user knows what they want to do because they're the ones taking the economic action but give them the information necessary to make an informed choice. Influenced by the wallet trying to do its best practices. So if it has the ability to make a shielded transaction it should do so. If it can't do so, say "you still have the funds to do this but it will cost you in some other way, fees or privacy leakage"

[01:02:58]

On the DAGSync side we're making good progress. We talked earlier about the tree side. Once thats in place the first thing that will be rolling out is integrating the new tree style into the mobile sdk's and into Zcashd & lightwalletd and what that will enable is splitting up the syncing process into the first thing the wallet does, taking any notes it already knows about and makes them spendable and then running the existing linear sync process. The is essentially the first step of DAGSync, where DAGSync is to break everything up. 

[01:04:09]

We want to get this bit out the door first. It wont help people who are running multiple wallets, you will run into problems where you get transactions that are trying to be spending notes that have already been spent by the other wallet you're running, if you're running the same seeded multiple wallet. You have the same problem right now but this will concretely help as a first step single wallet users to make funds spendable. 

[01:04:36]

The exact same stuff is what DAGSync will do, in that case it will be racing making the existing notes spendable and figuring out if those existing notes have been spent on chain and that will remove that UX hiccup for multiwallet users. In the Zip sync meetings we've been working on ZIP 317, we've started looking at implementing those changes into zcashd with the hope to have them ready for 5.4.0, that is a lower priority to DAGSync. We'll get those into Zcashd as quickly as we can. 

[01:05:36]

Related to the halo 2 recursion work, we've started up a developer call for halo 2. We've been running office hours since earlier this year - people who were using the halo 2 stack could come along and ask questions. For whoever would turn up and thats what we would end up working on. We've no set up another call early next year once we can verify who's coming and what times. This ones more focused on people who are developing halo 2. The bigger projects like scroll, osmosis, zkEVM and making their own changes on top of it in downstream forks, we need somewhere to have more coordination between them and us bringing changes back in. 

[01:07:00]

If you're interested in that kind of thing and are part of a project working on using halo 2 and extending it, you should join the halo 2 discord channel there are links to it. Also we use the discord events. We're also trying to make some organisational changes to how we bring in features to add a bit more flexibility for people trying to do more nightly style things with halo 2 while still enabling the base version to be stable, production ready and reliable. 

[01:08:02]

The model I currently have is kind of like the rust nightly beta stable type of thing. We've still got to figure out how its going to play out because certain kinds of changes are invasive enough that you cant feature flag it off as a nightly feature. Some more experimentation to do there, the goal making external contributions easier and help the whole ecosystem benefit. 


___


### 4. Open Discussion - Learning resources & recommendations for new developers 


[01:09:30] - **Ian**

Into Open discussion I have a question. For people who come from the community who might not be into the developer side or not technically adept, what are some of the best resources they can go to to learn more about these things and have a better understanding when they come into these calls in future? Are there any channels, calls or learning groups etc?

[01:10:27] - **Deirdre**

Read all the zips in the zcash spec. 

[01:10:33] - **Str4d**

Not all of the zips are approachable as others, we've refined the way we do zips over time. We try to make the subcomponents of things a bit easier to understand. That is also one of the fertile grounds that leads to stuff in this call. The other place are the Discord channels where stuff actually happens, not necessarily needing to chat but to listen in is a very useful way to pick information up. You also get to read that at your own leisure versus these calls. It depends what you're interested in, if you're interested in the cryptography side of things then the halo 2 book has some good intro level cryptography things geared towards you understanding halo 2 & also the kinds of cryptography we use here. 

[01:11:49]

You could pick up any of the books of how blockchains work to understand more of the context around the chain side of things we discuss here. 

[01:11:57] - **Deirdre**

If you're interested in the code at a high level, the zcashd github & zebra github, looking at the PRs will give you a flavour of what is happening in the code right now. Those are the entry points to the whole tree of dependencies of both the Foundation & ECC maintain. Things like the orchard crate, the halo 2 crate, Zcash addresses, wallets, the SDK, signature libraries all of that gets pulled into the main code repositories. That's a good place to see the code changes happening, getting reviews & merged into the upcoming releases of Zebra & Zcashd.

[01:13:05] - **Str4d**

On that point for the Arborist calls where we're talking about development within the ecosystem and particularly development on the full nodes, look at the PRs and look at the kind of review going on because the review comments can often be very instructive in terms of what we're thinking about and also the way in which we go about keeping the network secure & performant. At some point I want to put a few more of the review documents & guidelines into the zcash book. We're already going to have to pull some of that out for the halo 2 side. That is our review guidelines in terms of what is sufficient review for us to consider it something we will use?

[01:14:12]

If you're interested in contributing to review or code it's a very easy way to figure out what kinds of code we like to see. 

[01:14:38] - **Pacu**

I would say for newcomers as long as we stay on PoW, getting familiar with every concept in Mastering Bitcoin, that book is really helpful. Getting the basics is the most important. If you want to get a deep dive, it'll be really hard to catch up with the code & zips if you don't have base level covered. ECC was the first job i got where my first assignment was actually to read a book. Read the book, get familiar with the terms and start diving into the Zcash docs & also start with the light client protocol. Get to how things work on the outside then get into the protocol, that would be my why. Thats how I got into it with my software engineering. 

[01:16:45] - **Str4d**

One more point onto it in that its very easy for us as the developers of this to have blind spots in terms of what is easy to understand. We very likely missed some things and many of the things we mentioned may not be particularly approachable or usable. If you are trying to do this and finding problems you're struggling with please come and talk to us or open an issue on the zcash issue tracker or chat in discord. The usability of the developer experience is absolutely a usability problem. We dont always have the resources to keep it up to date or improve on it but knowing the kinds of issues that people are having are very useful in instructing the directions we take the guides & resources. 

[01:18:03]

We had a long standing thing open for the explanatory ELI15 halo 2 rulebook. Open an issue and we'll have a record of a usability problem. A good half of them we fixed pretty quickly. The other half were acknowledged as problems with intention to fix. Same thing applies to all of the Zcash developer interface. The people who are trying to learn it are the absolute best in what the problem is in trying to learn this. 

[01:18:56] - **Ian**

Thank you to everyone for joining us. 


___



### Attendees

+  Nathan Wilcox 

+  Aditya ZCG

+  Conrado

+  Deirdre

+  Str4d

+  Greg Pfeil

+  Daniel (decentralistdan)

+  Gustavo Valverde

+  Kris Nuttycomb

+  Pacu

+  Teor

+  Autotunafish

+  Charlie Okeefe

+  Hazel OHearn

+  ZecProphet

___
___
