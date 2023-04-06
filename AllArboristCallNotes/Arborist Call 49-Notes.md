# Arborist Call #49 Notes

Meeting Date/Time: April 6th 2023, 15:00 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro 

+ ECC Core Update - [Zcashd status](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#1-ecc-core-updates----zcashd-status)

+ Zebra Status - [Zebra updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#2-zebrad-status---zebrad-updates)

+ Research & Implementation Update - [DAGSync](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#3-research--implementation-updates-i-dagsync) / [Potential for ZF improvements & Ecosystem collaboration](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#3-research--implementation-updates-ii-potential-for-zf-improvements--ecosystem-collaboration) / [ZSA update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#3-research--implementation-updates-iii-zsa-updates) 
    
+ Open Discussion - [Nighthawk Apps update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#4-open-discussion-i-nighthawk-update) / [Potential ZF improvement + Arborist Call Front-end dev participation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2049-Notes.md#4-open-discussion-ii-potential-zf-improvement--arborist-call-front-end-dev-participation)


Video of the meeting: [recorded]

Slides: [1](https://gateway.pinata.cloud/ipfs/QmZa33iEj1deBJq9pcMWMEcn4bUtAv9dJQcYSBDE9Q7E2w) [2](https://gateway.pinata.cloud/ipfs/QmZBZcpAsVZiuLGc7DnxkfYQCrAUcdKpdXzmCEv3nHrayE) [3](https://gateway.pinata.cloud/ipfs/QmY3ZtUAoaEkVRhukjwHJVLtEBZFRpchs5VXrF3TuNaSoD) [4](https://gateway.pinata.cloud/ipfs/QmaFVC1kSHNX4Ntc2cT4VGJ2QGHYi92uzeBAyAYesFJd9V)


Moderator: Dodger

Notes: Jason Rogers



## Decisions & Action Items

i) Core dev call for Aligned strategy of Full Node wallet 

ii) Follow up ECC + ZF contact sharing

___



## Full Notes



### 1. ECC Core Updates  - Zcashd status 

[00:00] - **Kris**

The last couple of weeks we've merged a bunch of changes to the zcashd wallet that eliminate a bunch of duplicated functionality and provide more functionality related to how the wallet constructs transactions related to unified addresses. That's been in the works for quite a while, those are finally merged. 

[00:45]

We're also heavily into the development of the fast-sync capability for light wallets which involves integrating the new note commitment tree architecture into the zcash light client backend for the mobile wallet sdk's and also doing the work on the zcashd side that's needed to get the extra metadata that those wallets will need to be able to make their existing funds be immediately spendable. 

[01:36]

There's also been a pretty significant stack of updates to all of the rust crates decending from initially updates to the Finite Field (ff) crates, those have percolated through the whole stack of crates all the way down to librustzcash & zcashd. A bunch of cleanup that has been hanging out for a long time is now out of the way and we're in the final stages of ZIP-317 implementation both for the zcashd wallet & for change for the miner. 

[02:29]

Although there is some concern that we have not yet seen enough wallet ecosystem uptake of ZIP-317 fee calculation so it's not clear yet whether or not the ZIP-317 fee enforcement is going to be part of zcashd 5.5.0 which should be coming out in the next few weeks.

[03:14] - **Daira**

That's not decided yet. The block construction algorithm has been designed so that it can tolerate some wallets not immediately paying the potentially higher fee. We need to make a decision whether it is sufficient or not. 

[03:42] - **Kris**

We would definitely like to encourage other folks working in the wallet ecosystem to move forward on adopting ZIP-317 fees wherever possible. Librustzcash and Zcash client backend have a number of modules that are reusable even if you're not using the librustzcash sdk's for your wallet, there are pieces in there that should be independent & are designed to be resuable even if you are not using the SQL client backend for introducing ZIP-317 support. 

[04:36]

and if you need any help knowing where to look in librustzcash and zcash client backend to get help with fee computations, just ping me in the Zcash R&D discord, i'll be happy to help out. 

[05:15] - **Daira**

I did remember one more thing. There's an update to the halo 2 proofs crate which resolves possible non-determinism on 32 bit platforms on some versions of rust. That also will be in the dependency updates that we've made.

[05:36] - **Kris**

Also there hopefully will be the orchard crate version 0.4.0 which then brings in those changes as well as a similar non-determinism problem that exists in the incremental merkle tree crate. Both of those will be useful for those that want to build on 32 bit platforms.


___


### 2. Zebrad Status - Zebrad updates


[06:16] - **Arya**

Hey, I am Arya. I will be summarising what's new in Zebra since the last Arborist call. The main focus has stayed on Audit triage and fixes. We've merged PR's for a security fix to limit the number of non-finalised chains tracked by Zebra. Before it wasn't limited. We merged a fix for a rare concurrency bug in the getblocktemplate method. 

[06:36]

A fix for the mempool to stop ignoring transactions when it's newly activated. A config option for writing logs to a file, adding confirmations field to the Zebra's getrawtransaction method response. We created a docker hub binary with mining enabled for testnet on release. Merged a PR for checking if blocks are present inside chains before downloading or verifying them, before we were only checking the best chain. 

[06:58]

Dropping Firo nodes for Zebra's address book. There are also PR's open for adding terminal based progress bars behind a feature flag which shows how many known peers Zebra has, how many failed peers it has, failed connections, blocks, forks, transactions in the mempool pq & storage, mempool rejects, when the last chain fork was & the mempool cost. Finally there's a draft PR for refusing to run zebrad when the release is too old. 

[07:27]

It's to match the zcashd deprecation and in closing i'll stress the next release should publish a docker hub binary for testing with mining support and we are eager to help anyone who wants to test Zebra's mining support, ping us in the Zebra discord. 

[07:42] - **Daira**

Just to clarify is that 16 weeks?

[07:49] - **Arya**

I think its more, it might be 6 months. 

[07:53] - **Daira**

So its longer than zcashd then. 

[08:01] - **Dodger**

Just a comment on Firo, i seem to recall that since the last Arborist call we have had clarification the guilty blockchain is not in fact Firo but Zelcash/Flux. 

[08:32] - **Str4d**

I had seen them in previous investigations I had done last year sometime. I wasn't aware Firo had also been doing things but had just been misidentified then. 

[08:45] - **Dodger**

Firo was a complete red herring. i think this has always been Zelcash so might be worth to update of the issue since 5.0.5 Daira. 

[08:59] - **Daira**

[6505](https://github.com/zcash/zcash/issues/6505), thank you. 

[09:06] - **Dodger**

Thank you to Mioldrag Popovich for clarifying that for us. The context for that is last week we had a discussion about network monitoring and one of things that cropped up is how many nodes there are & there;s obviously a massive difference between how many nodes appear on a list of nodes in for example blockchair versus how many actual nodes are running. That's because Zelcash uses the same Network Magic number as Zcash. 

[09:56] - **Str4d**

Yeah, I see all of those in the seeder we run. They're treated as "not nodes to be advertised". But an entity like Blockchair may just be doing the scraping aspect without doing the monitoring and filtering aspect the seeders do. 

[10:22] - **Dodger**

Just to clarify we're going through the audit at the moment, we're fixing up any issues that arise and once thats done & once we're confident that everything is safe we are going to be cut a stable release of Zebra & start pushing hard for it to start getting used by people. Bearing in mind the whole purpose of having two node implementations is that we have some redundancy, we don't have the entire network running on one node. 

[10:59] - **Nate**

I was curious if you have been interacting with any miners who have been trying out Zebra?

[11:11] - **Dodger**

We have talked to a couple of miners. Arya I don't know if you've got any updates on that front?

[11:19] - **Arya**

I do not. 

[11:21] - **Marek**

I don't think they are using Zebra yet. 

[11:33] - **Dodger**

I think we'll be pushing harder once we actually got a stable release. We don't necessarily want to be pushing too hard until we've got something that's been audited. 

[11:50] - **Daira**

The ticket 6505 has been updated now, both the title & description. 

[11:57] - **Dodger**

Once we're at that point we'll reach out to ECC to coordinate on reaching out to miners to see if we can start to split miners up a bit so we dont have everyone relying on a single implementation. 


___


### 3. Research & Implementation Updates i) DAGSync

[12:40]

Research & Implementation updates and we're going to have some apologies  from the FROST team as I am pretty sure they are all out having traveled to Japan for RealWorldCrypto. 

[13:04]

I thought it would be useful. I did this arbitrarily but I thought it might be useful to get specific updates on the progress of DAGSync. The topic of performance has been raised over the past few weeks in various conversations i've had. I know that ECC have been working hard behind the scenes to make necessary changes to help improve the performance issues. Kris you touched on it but I wondered if you want to give any update on expected timelines or anything. 

[13:42] - **Kris**

I am currently working on trying to get the high level APIs changes that are going to be required in the Zcash Client backend in place. As part of that reverse engineering the changes that will have to happen in the lightwalletd APIs. We also have in progress the orchard side of collecting the necessary metadata in zcashd. We don't yet have in progress the sapling side because we need to make a few more updates. Essentially we are switching some of the zcashd sapling code from c++ to using the rust libraries. That is blocking some of the changes we need to make on the zcashd side. 

[14:46]

Current state is design is in progress for the API's that are needed for sdk updates so we can get our wallet team working on the changes to the SDK in parallel with making the updates that are required in zcashd. This is something that will affect zebrad insofar as zebrad can act as a lightwallet backend because once we have the changes to the grpc interface all figured out - those will need to be figured out on both sides. 

[15:42]

Because while wallets will be able to function continuing to use lightwalletd's they wont get all of the benefits, they will get some of the benefits from the new sync strategy but not all of them. 

[16:00] - **Str4d**

The largest thing thats going to be noticible to the downstream users is fundamentally its moving from linear sync to a non-linear asynchronous sync. So there's a lot that needs to happen in terms of the way in which sync is run will change a fair bit, but once that change is made then underneath that if something wants to degrade or needs to degrade to linear sync if they dont have access to the new APIs, that will be doable under the hood and can be hidden away. Its just a one time change on the rust layer enabling things to happen in parallel. 

[16:58]

It would potentially tie into the way Zebra works quite well becuase you already have an async engine built into your stack. If and when Zebra were to implement a wallet that would hook in quite nicely. Whereas then exposing that via the android and iOS sdk becomes a little more fun because the concepts dont overlap as neatly. 

[17:24] - **Kris**

From the perspective of a wallet developer I think the main thing that you'll observe in the first stage of this rollout is that (this should all be hidden behind the interface of the sdk) but instead of the wallet fetching blocks in a linear fashion, the wallet will ask the backend for a range of blocks it should fetch next or it will be told by the backend a range of blocks it should fetch next & pass over for processing. Those fetch instructions will come out of order with recent blocks being fetched first in order to make notes immediately spendable and then other blocks being fetched, given some heuristics which are most likely to contain notes and should be trial decrypted first.

[18:39] - **Adi**

With all the changes planned with lightwalletd and after is there a big change in the number of calls that clients need to be making to lightwalletd posting services and if so is there some planned load testing?

[18:58] - **Kris**

I dont think there should be. The order of magnitude of the number of requests for blocks should remain the same, there will be one additional call per wallet open to get a small amount of data which is the new intermediate note commitment tree roots. But that should be only one call per wallet session. Block downloading should be the same effectively. 

[19:33] - **Str4d**

I'd expect to see a concrete increase in the number of rpc requests made but there should be an overall noticable decrease in the magnitude of the bandwidth required for them. Wallets will still need to be doing linear sync in the background. There will still be some level of fetching all the blocks still going on from the server so overall there will be strictly more requests for data but the extra data being requested should be a smaller fraction of the current linear data and the local side will be aware of what it did & didnt need to fetch. 

[20:27]

For instance if it fetches a range of blocks, if the backend tells the sdk "fetch this range of blocks" then it knows it doesn't need to fetch those again because once its fetched that data, even if it only fetched it to check do a trial decryption of one specific transaction in one specific block but it fetched a range of blocks to certify the data, it can then do trial decryption of all those ancillary blocks it fetched anyway so it wont have to request them again.

[21:04]

There may be a little bit of extra overhead specifically from fetching nullifiers and the commitment tree pieces out-of-order but for the remainder of the data it should effectively just be reordering the order in which it is fetched rather than doing any duplicate fetching. 

____

### 3. Research & Implementation Updates ii) Potential for ZF improvements & Ecosystem collaboration


[21:38] - **Dodger**

I'm going to go on a slight tangent here and talk about a community call we had last night with the two newest members of the Zcash Foundations board. Marta Belcher who many of you know leads the Filecoin Foundation and J.W Verret. One of the topics that came up during that conversation was  "What can the Zcash Foundation be doing better?" 

[22:01]

One of the suggestions was that we should have looked more into whether there was anything we could do to help with the performance issues and sandblasting. I know i've said it before but if there is anything we can do to help ECC with grappling with these issues, please let us know. Obviously we're not familiar with the codebase but perhaps there are things that are being changed that we could do code reviews on or brainstorming on. 

[23:09]

I've assumed the ECC developers with their long experience and intimate knowledge of the codebase they're working with are best positioned to deal with this and that us coming in to try and help might actually make things worse in terms of being a distraction. But if there's anything we can do to help please do let us know. 

[23:35] - **Kris**

We will be reaching out. There's absolutely stuff that we can use help with. 

[23:40] - **Str4d**

I think up until recently it wouldn't necessarily been as helpful because a lot of the work we've had to do prior to now has been technical debt resolution & a bunch of inner plumbing work and fixes that weren't really stuff that would help directly on moving DAGSync & similar things forward, but were necessary to implement any of them. Paricularly a lot of the deep, arcane plumbing in zcashd which I do not wish on anyone but now we're through that main gauntlet, particularly the stuff we're now doing in the APIs on the Lightwalletd side it would be useful given the Zebra team probably has more experience with async logic etc. I expect we'll be coming with things we can verify against your knowledge & experience from that perspective. 

[24:56]

In terms of patterns we might be running into that you've already experienced and go "thats not going to work". Stuff like that.

[25:03] - **Kris**

Does the Zebra team do any maintenance of lightwalletd itself or does Zebra just expose lightwalletd APIs directly?

[25:16] - **Dodger**

The way we approached it, not having been involved in the actual coding, modulo my ignorance. The approach we took was to seek to have Zebra emulate zcashd so that if you had a lightwalletd that was facing zcashd you could simply point it at a new IP address & port and it would continue functioning without knowing any difference. As far as I am aware we haven't made any changes to lightwalletd, haven't delved into it too much apart from understanding exactly what fields it was asking for, what rpc calls it was making etc. 

[26:05]

Like grpc, i know for certain that some of the team here at the Foundation are very interested in alternatives. 

[26:20] - **Kris**

One of the things that i will bring up now is that I don't think that lightwalletd itself has a dedicated maintainer at this point. Larry Ruane who was the one primarily responsible for working on lightwalletd when he was here has moved on to working on mostly Bitcoin stuff. He still provides some support for lightwalletd but it would be good for ECC & the Foundation to collaborate on starting to take a more active role in the maintainership of lightwalletd or finding a third party that can do that because we have enough other products on our plate at ECC and i know that ZF engineers have Zebra and various other parts of the ecosystem they're maintaining. 

[27:35]

But lightwalletd really is a central piece to the ecosystem & coordinating around updates to lightwalletd is something we should probably do more actively. 

[27:45] - **Dodger**

When our full team is back in the office i'll reach out to them and see if we can schedule a chat with everyone who needs to be involved to talk about that further. 

[28:15] - **Adi**

Beyond the coding and reviewing platforms of 317 i think there's a lot of work towards spreading the message of updating to the new fees for the new wallets & existing wallets like Trezor, Ledger and all the miners. Maybe thats why ZF could also help out, reaching out to different communities because this is a big change. We do want to make and enforce the new fees over time. 

[28:48] - **Daira**

Absolutely, if we don't enforce them then there's no point. 

[28:55] - **Dodger**

One thing I feel that we lack currently are the contacts. I know that over the years ECC has built up a lot of contacts with various groups, maybe we could look at sharing those with Dan and he could start doing some outreach on that front. Let's add that to the agenda for further discussion. Nate can you raise it internally at ECC to see if we could start sharing some ecosystem contacts. I hesitate to suggest using some sort of Contact Management System but it may be appropriate at some point as the ecosystem grows to have some sort of system for keeping track of them. See if you guys have any thoughts on how best to share that information so we can help out. 

[30:19] - **Nate**

That sounds good. It's very similar to something else on our mind which is sometimes there's inbound queries coming to us about how to integrate with  the Zcash ecosystem. A recent one is this new block explorer https://3xpl.com , they contacted us interested in getting on the z.cash website or other things like that. Ideally we wouldn't be a bottleneck, ideally they would have some sort of portal or entry way that explains "here's all these different orgs, you can contact all these different roles."

[31:09]

Thats a little different but it feels related to just having shared ecosystem contacts across different orgs.

[31:19]

I think i'm repeating something that was already implicit about what the Foundation can do, you're already doing it in my mind - building up new alternative infrastructure. Integrating with lightwalletd, getting connected to the wallet teams seems like a good step. We already touched on ZIP-317. I know that Zebra has already implemented that logic. From what i've seen the Foundation is already doing the right things with their tech staff and I wanted to call that out. Keep doing it, good job. 

[32:19] - **Dodger**

We can always do more, we can always do better. 

[32:30] - **Nate**

What I would like to see, we were talking about miners earlier but also any kind of service coming to the ecosystem, it would be great the more technical options they have. If there's a Zebra based stack for lightwallets, a zebrad based stack, a zcashd based stack or for miners or exchanges that seems better for the ecosystem to me. 

[32:56] - **Dodger**

Thats definitely behind our approach of looking at specific use cases for Zebra. We've got Zebra participating in the network and maintaining a mempool and spreading transactions in blocks, but what are people actually then using them for apart from the wallet side of things - they use it as a backend to lightwalletd, lets build that functionality in. They use it to generate block templates to plug into some other piece of mining software to actually do the mining - lets do the getblocktemplate work. 

[33:30]

As we continue to add more functionality we'll hopefully be becoming more useful to potential people joining the Zcash ecosystem.

[33:41] - **Kris**

Something that i've been interested in for a long time but have not yet had time to work on is extending the Zcash Client backend code to make it suitable for building a full node wallet. The thought there is there are a few pieces for things that can be done there. The idea would be that a full node wallet would become a full node with a bundled lightwalletd that local wallet process can talk to and that would give us a migration path hopefully off the c++ Zcashd wallet which would be a great thing to eventually be able to do. 

[34:53] - **Str4d**

Or even looking at a closer integration you can imagine having a wallet stack in rust that can either talk directly talk to a full node or talk via a lightclient lightwalletd pathway where if its able to talk directly to the full node it might be able to gain additional guarantees and not have to rely on the lightwalletd threat model for instance but it could then plug in either way depending on how a user wants to set up their stack. There's definitely some opportunity there for building out and reusing the pieces we currently have in the Zcash Client backend, maybe splitting some of the wallet pieces out but in particular expanding on them to expand the capabilities there to the point it subsumes what we currently so in the zcashd wallet which currently has the most exposed functionality of any wallet in the ecosystem. 

[36:09]

I don't necessarily say its the best functionality exposed, but it has the most. We would need either a similar level of functionality exposed by a rust wallet or a sufficiently close subset that we could migrate all of our users away from it before we could migrate to that. 

[36:30] - **Daira**

It would be absolutely lovely from a technical development point of view to retire the zcashd wallet because its a lot of code and it takes up a lot of our time and just being able import a wallet.dat from zcashd to a new wallet and handle migration that way would be great. 

[36:57] - **Str4d**

There's a lot of stuff we end up having to do twice. Which for the size of team we are, that's a non-trivial amount of work that also adds to things like the delays in getting the fast syncing because we have to deal with it in two codebases. 

[37:28] - **Dodger**

Lets shelve this discussion for now, we can certainly come back to it. We can have a core devs call to talk about an aligned strategy in terms of node & wallet in terms of the full node wallet use case which i think is very different from the lightwallet use case in some situations. Any timelines for when we can expect to see a next step in the DAGSync stuff?

[38:05] - **Kris**

It's up in the air but its actively being worked on by me this week and I am hoping to have at least a sketch of new APIs out probably next week for wallet teams to start looking at & considering. That's the current work. 

[38:52] - **Nate**

I wanted to point out we did post a [Blog post](https://electriccoin.co/blog/update-addressing-zcash-wallet-performance-issues/) a week or two ago with a timeline. We intend to be doing frequent updates. They might go into the forum instead of every one as a blog post but whenever that timeline shifts or even if it doesn't shift but there's other details to share we're going to be proactively sharing frequently to give everyone a heads up of where we're at. 



___


### 3. Research & Implementation Updates iii) ZSA updates 


[39:34] - **Vivek**

Hi everyone, we have a couple of updates to give you. The main thing was we wanted to draw attention to the fact we've now moved to a new pull request for the ZIPs repository. We were earlier on [649](https://github.com/zcash/zips/pull/649) and we've now moved to PR [680](https://github.com/zcash/zips/pull/680). That's mostly to clean up the conversation that was there on 649. 

[40:06]

The comments on 649 either have been resolved or we've noted them down and we are still working on them. We request any future comments to be directed to PR 680 instead of 649. On the ZIP side we've been working on the two ZIPs - Transfer & Issuance 226 & 227. Along with the discussions we've been having in our calls with ECC & the Zcash Foundation we've also been making a pass to make sure we fit in consistently with ZIP 0. Thats the format for the ZIPs. That will make things cleaner going forward and we'll certainly have that ready soon. 

[40:50]

On the implementation side I think we now have multiple PR's to the zk circuit changes to both the halo and orchard crates. These are currently on the Qedit fork of the crates and we are still in the process of reviewing them and consolidate and put it out as a formal pull request to the actual repos. 

[41:14]

These changes are mostly the addition of variable based scalar multiplication to halo & changes to note commitments & value commitments that are required for the circuit. Our plan is to go over these circuit changes during our meetings we have with ECC & Zcash Foundation to ensure they're all on the same page about this. 

[41:42] - **Dodger**

Those are during the ZIP syncs right?

[41:52] - **Daira**

Those are separate. We do usually go over ZSA zips in zip sync but we have extra meetings which are more focused on editing the spec and resolving issues. 

___


### 4. Open Discussion i) Nighthawk update


[42:31] - **Adi**

I'd like to provide some updates on the Nighthawk apps front. For the Zcash Block explorer we've added a feature to decode coinbase hex to give block miner messages and fix the transaction type labels and the fees for v5 transactions. We invite our users to report any issues with the explorer by connecting with us [@zcashexplorer](https://twitter.com/zcashexplorer) or sending us an email at support@nighthawkapps.com. For lightwallet services we have started the process to deploy a globally distributed infrastructure with locations in South America, Europe and Asia beyond the existing North America that we have at present today. 

[43:11]

For the wallet front we have resumed the development for the Nighthawk wallet towards our 2023 roadmap.


___

### 4. Open Discussion ii) Potential ZF improvement + Arborist Call Front-end dev participation


[43:38] - **Kris**

Another thing that ocurred to me as perhaps something that ZF engineers might be interested in working on which is a rust implementation of the transparent script interpreter. This is something that would allow us to get rid of a significant wart in both of our codebases. We have this gnarly cyclic dependency on a kind-of factored out bit of c++ code and if we could get rid of that in favor of a rust implementation of the transparent script interpreter that would allow wallet developers who use the rust backend to do more & would also be an important step on that path to a new full node oriented wallet.

[43:48] - **Daira**

It would have to be perfectly bug for bug compatible with the c++ code unfortunately, no way around that.

[45:08] - **Dodger**

I wonder if such a project would be complete before we retired T-addresses?

[45:16] - **Daira**

I strongly suspect that retiring T-addresses will be a multi-phase thing where for a long time we still allow spending from T-addresses and just to spend from a T-address you still need the script interpreter. That is likely to still be the case after we move to proof of stake, a new network protocol to a succinct blockchain or anything else that we want to do. 

[45:53] - **Dodger**

i think we're definitely interested in exploring collaboration on core infrastructure. One of things that i've been thinking about recently is Sasha on the ECC side has been looking at building a rust seeder using Zebra network. I think that would be a great project, relatively small, relatively self contained that we could start off by having a joint effort. Having one of our guys working with Sasha on that, see how that goes and explore further future collaborations in a similar vein where there is core functionality that we can both team up to resolve/fix/replace. I'll take that up with Nate once we have our team back & have a better idea how things are going with the audit. 

[47:20] - **Daira**

I've actually been preparing a presentation about things we can potentially remove from the protocol to simplify it and that was originally going to be my Zcon presentation but I don't think I am going to be able to go to Zcon because of covid policy but i'll find somewhere else to present that. 

[47:41] - **Dodger**

Happy to host that as a community call. Our default approach for people who cant make it Zcon is to offer them a community call slot where we can give that an audience and also have it recorded and uploaded to youtube as well. 

[48:36] - **Nate**

One thing I would like to see in this meeting. It would be to get more developers of Zcash front end or consumer facing wallet or other services that are interacting with other end users into this call because my ideal is their perspectives would be present whenever we are discussing protocol changes or upgrades. I love seeing Adi here but I cant tell how to get that working well. I just wanted to share that desire and brainstorm about it. 

[49:25] - **Dodger**

Adi there's already a wallet meeting that happens isnt there?

[49:31] - **Adi**

Yes we do have the lightclient working group thats after this meeting. Its mostly focused on the sdk though. There are some other services potentially dont use the mobile sdks but I do like Nates version where we should have a section in this Arborist call where we invite a front-end application developer to join & share ideas and updates. 

[49:56] - **Dodger**

Can you relay that. This call is open for anyone to join. I think its fair to say it was originally very focused on protocol level stuff but I feel as Zcash matures we need to be concious of impact that changes at the protocol level will have at the user experience. 

[50:30] - **Nate**

ZIP-317 is a great example because I definitely want a lot of wallet developers feedback about that and its a protocol level thing but often we want the end-user app developers present when figuring out protocol stuff because they're serving the users at the end of the day. It would be good to get that feedback. 

[50:59] - **Daira**

Not a consensus level protocol thing but the wider protocol. 

[51:09] - **Nate**

Yes, sometimes when I say protocol I am speaking very generally but even for consensus things like ZSA's at some point wallets are going to need to figure out how they're going to support a ZSA feature and so I would hope they are showing up and providing feedback about ZSA design to whatever degree it interacts with their user experience or beyond. 

[51:37] - **Dodger**

We're going to have the same challenge with FROST. What's FROST going to look like? We've go the spec and a reference implementation effectively but there's a gap between the reference implementation in rust and having it actually working in wallets. We're going to face the same challenges there. Dan's just volunteered in chat to start reaching out to other ecosystem devs to start joining these calls. 


_____

### Attendees


+ Daira Emma 

+ Jack Grigg 

+ Kris Nuttycombe

+ Pacu ECC

+ Adi Nighthawk

+ Arya Solhi

+ Dan Wolande

+ John Bruhling

+ Marek

+ Michael Harms 

+ Nate_ZEC

+ Vivek Arte

+ Andy Murray

+ Ben Beale

+ Greg Pfeil

+ Josh Greenland

+ Oleksandr Putyak

+ S A

+ zero d


**Next Meeting Scheduled: 22:20 UTC April 20th 2023**


___
___

