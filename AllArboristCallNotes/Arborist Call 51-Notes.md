# Arborist Call #51 Notes

Meeting Date/Time: May 4th 2023, 15:00 UTC

Meeting Duration: 50 minutes


**Agenda**: 

+ Welcome and Meeting Intro 

+ ECC Core Update - Zcashd 5.5.0 release / 5.6.0 details

+ Zebra Status - Audit update

+ Research & Implementation Update - ZSA update / FROST update / Equilibrium Update / Nighthawk Update
    
+ Open Discussion - Zebra timeline / ZSA estimated wallet load


Video of the meeting: [recorded]


Moderator: Pili Guerra

Notes: Jason Rogers



## Decisions & Action Items

i) Check expected ZSA trial decryption load on wallet implementations

___



## Full Notes



### 1. ECC Core Updates  - Zcashd 5.5.0 release 


[02:26] - **Kris**

The major update that we have for the last two weeks is Zcashd 5.5.0 is out. This is a pretty substantive release in terms of the future of the network. This release implements ZIP-317 which is the proportional fees ZIP that changes the default rules for block construction that miners using zcashd for creating block templates use in terms of how they select inputs & what fees are accepted by default.

[03:21] 

That is starting to make its way across the network. Last night I checked and about a quarter of the network had upgraded to 5.5.0 according to our seeder metrics. It also contains a pretty substantive upgrade to the Zcashd Wallet. So ever since 4.7.0 we've had some inconsistencies with respect to the options the zcashd wallet methods had for creating transactions.

[04:01]

We've had tickets open for a number of years to unify how our various transaction creation methods actually build transactions. That unification work has been done. So the various methods available should behave in a much more regular fashion and they now all respect the ZIP-317 fee scale.

[04:31] 

Beyond that, also a number of other sort of lower-level updates to dependencies and clean up a bunch of tech debt. Overall a pretty important release. We are now full speed ahead on working on the next on 5.6.0, which will contain all of the support that we need for lightwalletd to be able to support faster syncing/ near instantaneous syncing for the light wallets.

[05:13] 

That will make it so that any notes in your wallet are immediately spendable and that it becomes possible to both do scanning of the chain in parallel and out of order. So things like reverse scanning & heuristic scanning will become possible for the light wallets, which we're hoping for a pretty substantial improvement in user experience. 

[06:01] - **Daira**

Although the block construction algorithm has been changed in this version of zcashd, there's still some space for wallets that haven't upgraded to the new fees to get their transaction in. There's this concept of unpaid actions and there are 50 of them allowed in each block. So if your transaction is not paying the ZIP-317 fee by up-to the cost of 50 actions, it still has a chance of getting into a block in this new algorithm. Of course, not all nodes upgraded yet.

[06:51] - **Kris**

In that limited selection, the closer you are to paying the ZIP-317 fee, the more likely it is that your transaction is going to be the one that's selected. So transactions that pay very low fees relative to the amount of resources they consume are deprioritized. A transaction still paying the previous 1000 zat preferential fee for a 2 in - 2 out transaction is going to be much more likely to be selected than a fee that's paying 1000 zat for 500 inputs and outputs.

[07:40] - **Daira**

Although note that the blocks are mostly small now so the sandblasting has been greatly alleviated. This happened before the release of 5.5.0.

[08:05] - **Str4d**

We are, however, still seeing those very large, like many action transactions. There are fewer than the block size now, but we are still seeing that level and so we expect those will start being affected by the unpaid action limit as miners upgrade.



___


### 2. Zebrad Status - 



[09:07] - **Deirdre**

We've been doing a lot of CI and infra work in the Zebra environment this week, we're preparing to migrate our entire CI, build and deployment release environment to a fully TerraForm sort of config in the near future, which is very nice for us and helping to keep things consistent and maintainable for anyone who uses Zebra software.

[09:35] 

In the meantime, we've started phase 2 of our our full system audit of the Zebra code base. Phase 1 was mostly focused on cryptographic implementations and related consensus rules, a lot of signature implementations, proof checking logic, note commitment trees, that sort of stuff was in phase 1.

[10:04] 

Basically all the rest of Zebra is the focus of phase 2. They've already noted a couple of things that we fixed up in some networking but also in our state layer, which is where we do a lot of full contextual checks for PoW, checking chains, things like that are being covered in this part of the audit.

[10:34]

I think we tagged our [release candidate 7](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.7) last week. I don't remember if we mentioned that here, but the current Zebra release us rc.7. Things that have not been released yet but are merged in are we have implemented senescence to match the defaults of Zcashd.

[10:56]

So by default, if you have not updated or if you're still running a zebrad instance 16 weeks, or to be specific, the default is 120 days since this node was released or started up, it will panic and it will stop. But this is configurable in the config.

[11:24] 

So we basically decided to match what Zcashd does here, that got merged in. That's a decent impact behaviour change. We've also increased our implementation of [ZIP-401](https://zips.z.cash/zip-0401) to match the latest changes to ZIP-401 for the mempool cost threshold for Orchard transactions. I think it got bumped from 4000 to 10,000 as the mempool transaction cost threshold and the low-fee penalty went from 16,000 to 40,000, we now match that as well.

[12:12] 

A little bit of refactorings around ZIP-317. We've fixed a panic when we are connecting to our peers. That happens rarely when a connection is dropped. Instead of cleaning up correctly, sometimes we would panic, which is bad. I think we fixed up some notes from the audit around how we're managing randomness to generate row commitments and things like that, which is not currently used in zebrad, but we have that code to support shielded coinbase which was partly implemented. That's most of what we have right now.


___


### 3. Research & Implementation Updates i) ZSA update


[13:46] - **Jon**

Hi Everybody. We have two sorts of updates, ongoing work that Vivek, who's on the call is going to update soon. But the big update is that we've [posted on the forum](https://forum.zcashcommunity.com/t/zcash-shielded-assets-asset-swaps-and-beyond/44497) our plans and proposals for what's coming up next, which is the ability to do asset swaps on the protocol of Zcash shielded assets. Working on developing that and more importantly, making our development concrete in the hands of other developers by launching a testnet and basically distributing this work outside of just a small team of QEDIT.

[14:39] 

So we're trying to have that ready for Zcon4 so that people can see the impact of issuing assets, moving assets around in full anonymity. Maybe a question here to the crowd, if you haven't seen the forum post, it's under the grants questions. But now that we've submitted that proposal, it's all open, so you have all the details and what we're thinking, we very much want to know if we're right with this roadmap.

[15:32]

It builds on almost finalising this current grant, which Vivek is going to talk about. We're finalizing the circuit, the RPC calls in the wallet. There's a lot of work of catching up from our branch to what the rest of the community has been doing. So just that work of basically bringing a year of work closer to the main Zcash so it can be merged is a ton of joint work. I think we're going to be up to it and we were eager to do it so exciting times. 

[16:26] - **Kris**

I wanted to ask, with respect to integration into zcashd and the testnet and etc. In early discussions we talked about the issuance being done using the transparent Zcash extensions framework that had been designed a couple of years ago, but never fully integrated into zcashd. So what is the plan as far as the actual protocol level changes? How is Issuance and Burn going to be integrated at the protocol level? 

[17:16] - **Jon**

On our branch, it is integrated, meaning that on whatever we're doing, we're able to move ZEC and at the same time to move Zcash shielded assets. There's no full backward compatibility for certain things. We first blaze through the path of having the functionality, but since there's a lot of progress for the past year plus, we have to adapt whatever we were targeting, we have to adapt it to whatever you guys were working on. Most of the answer to your question is thoroughly described in the ZIPs that we also have worked on & are in their own branch. There's hundreds of comments and suggestions that we integrated from you as well.

[18:22] - **Kris**

I'm familiar with the state of the ZIPs. I'm mostly just asking about the specific protocol integration in terms of the transparency zcash extensions, whether Issuance and Burn is implemented in terms of that framework, or whether there's been a new sort of bespoke extension to the protocol.

[18:57] - **Jon**

I would think closer to bespoke.

[19:04] - **Daira**

So I think the TZE mechanism is not quite the right fit here, you could use it, but it would be a bit awkward because it was designed so that you basically have another type of transparent UTXO, which is not what you're doing for ZSAs. The Issuance records are a little bit like that, but I think it would probably be easier just to define new structures in the v6 transaction format for that.

[19:56] - **Kris**

Okay, yeah, I'm a little bit surprised of that answer just because I'm not sure it's correct to characterise those as a new type of UTXO because they're unrelated to bitcoin script or anything of that sort.

[20:16] - **Daira**

Right, not using bitcoin script, but they behave in a similar way that encumbered with requirements for the thing that is able to spend them in a similar way, which is not really what we have here for ZSAs.

[20:42]

And they were mainly designed for BOLT, not exclusively for BOLT, but that was the original use case. BOLT has been renamed to something else, I can't remember what. [zkChannels]

[21:00] - **Jon**

To expand just a bit on what I described, we're going to have sessions in Zcon4, both to show the status of ZSA & also where this can take the community forward & what ZSA's will look like when there's the possibility of asset swaps that you want to implement. So there's a few sessions that for those of you who are not too far from Barcelona in late July and early August, it's going to be really interesting.

[22:04] - **Daira**

On the 1 August, there's an event associated with ZK Proofs where everyone will be wearing masks.

[22:31] - **Jon**

So to get a bit more into the details of where we stand on the current development, maybe vivek, you can take it from here.

[22:44] - **Vivek**

Yeah, I just wanted to apologise for the noise. I think I'm stuck in traffic, but I hope you can hear me okay.

[22:53] - **Jon**

We can hear colourful India as well.

[23:01] - **Vivek**

Regarding the updates, I think for the circuit, we have a good number of updates to the Note commitment is complete. The note commitment for the circuit are largely complete & wanted to shout out Constance from our team for that. I think he's done great amount of work and we've been discussing this with the ECC team as well in our calls and that's been going nicely. We've also been working on the client, we have two members working on different parts of the client & there have been additions to the issue bundle 

[24:10] 

Basically the issue bundle is completed and we have some more work on the RPC commands that has been done. I think we are making good progress on both the client and the circuit & hopefully that should result in us completing that pretty soon.

[24:29]

On the ZIP side most of the changes are largely rearrangements and making sure that the spec is accepted, the rationale is accepted along with addressing a few of the comments that are still not addressed. So I think getting close to the final form in that respect as well, things are looking good. That's basically all I have and hopefully enough of that came out.

[25:00] - **Jon**

Thank you. Vivek, if I may, this is the right crowd for 60 seconds about the fact that two days ago I took GPT4 and made it work on a GitHub repository where it makes the GitHub repository better and I've launched a feedback loop that completely absorbed me. So on parallel to all of this, I'm sitting and looking at the machine build itself in complete awe. Maybe you guys heard about AutoGPT. AutoGPT hasn't been able to take itself and make AutoGPT better, but I managed to get some embeddings done right and some loop done right and I'm just having fun having my own tiny singularity in front of my eyes and wondering where the world is going to end in six months.

[26:06] - **Daira**

Don't invent the torment nexus, please.


___


### 3. Research & Implementation Updates iii) FROST update


[26:32] - **Conrado**

So on the specification side nothing much is going on. We addressed some comments from the IRTF chair and we're just waiting for the next step on the process for the RFC approval. On the implementation side we're working on a demo for the FROST implementation. We completed Key Generation with a trusted dealer part. So it's a binary you run, it creates a key, splits into shares and prints the output so that we use it for the remaining part of the demo, but can also use by people to learn how to call and use the Frost library.

[27:18] 

We also completed the repair share functionality which allows if someone lost a share, the other participants, the threshold of them can help these other participant repair the share. Or you can also use the same functionality to add someone to generate a new share.

[27:39] 

We started working on the broadcast channel implementation, we look into using noise to authenticate the communication channel. This is something that is needed mainly for distributed key generation but also for trusted. It can also help enhancing the security properties and we're also working on provide documentation to explain all this stuff a bit better since it's I think it's the most confusing part of using Frost.

[28:12]

We started preparing presentations. We're probably doing one or more presentations about Frost on Zcon, but we also want to do one for wallet developers which is something has been suggested here at our Arborist Call so we're starting planning that. Lastly something interesting that happened last week, David Craven, a contributor, [opened an issue](https://github.com/ZcashFoundation/frost/issues/319) about how to use Frost on the Ethereum virtual machine and we helped with some stuff, mainly as a feature in the Frost-core library that exposes the features called internals and exposes some low level functionality of the library. And this can be useful to build things on top of Frost if you need to change some inner part of it.

[29:11] 

We are using this feature to implement re-randomized Frost which will be use with Zcash. But this was used for enabling Frost on the EVM because the EVM has a seed recover function that can be like you can use a trick to use it. The intention is to recover a public key from a signature in a message, but you can use it to carry out arbitrary point multiplication. So you can use that to do the FROST signing verification.

[30:00] 

David Craven has created a [Frost EVM repository](https://github.com/Analog-Labs/frost-evm) which allows you to do that. The whole goal is to save gas because you can just call this function that already has the biggest part of the computation. So that is interesting use case, customisation of Frost. So if you're interested you can look up Frost EVM and GitHub. I think that's it.

[30:32] - **Daira**

So I have a question about the share recovery.

[30:36] - **Conrado**

Sure.

[30:37] - **Daira**

How do you make sure that in the recovery protocol only the party who had lost their share gets to know the new share?

[30:54] - **Conrado**

The way the protocol works is kind of similar to distributed key generation. Each participant, each helper that is helping them recover their share, they compute a part of the computation and then send a 'share of the share' to the participant who lost their share and this participant merges them and computes their share. So only the person who receives all these shares of shares is able to recover the share. So everyone else, if everyone else colludes, they can recreate the share without the participant knowledge, but they can also recover the original secret so it's kind of a moot point.

[31:44] - **Daira**

So you're relying on the confidential channel to the new recipient.

[31:49] - **Conrado**

If there's someone is snooping on the channel they can't recover the share because unless of course there's a problem on all the channels. But if they compromise one participant, for example, one of the helpers, they won't be able to recover the last share.

[32:07] - **Daira**

Okay. Will that be included in the FROST paper?

[32:18] - **Conrado**

It's not. That's a good point. There's another paper that describes this algorithm, but I think it's not referenced in the Frost paper, but I can share the reference and we can also include it in the FROST documentation.

[32:34] - **Deirdre**

I don't think the Frost paper, which was published three years ago is getting updates. The specification does not include DKG, it only includes trusted dealer in the appendix. It's not actually specified. It's there just so that an implementer can implement some sort of keygen.

[32:59] 

We are implementing it. Natalie and Conrado implemented a key repair, I think based off another paper, but I think Chelsea has a formal analysis of generic Dkg's in general.  Maybe share repair stuff will be included in future work, but for us and the work that we're doing at the Foundation, we're going to document as much as possible what we have implemented in our software. But I don't know if we're going to have papers that include that.

[33:44] - **Daira**

So that will be in the FROST book.

[33:46] - **Deirdre**

Yes, or at least in our Rust doc. And then we will mention specific properties and specific user guides in the Frost book.

[34:00] - **Daira**

Okay, cool.




____

### 3. Research & Implementation Updates iv)


[34:30] - **Karlo Mardesic**

We have some updates from the last Arborist call. We improved our crawler network crawler, which is used to crawl mainnet and collect information about the nodes in the network. We also have this p2p wiz tool which we use to map all these nodes. So we can easily see where these nodes are and how they are connected.

[35:01] 

From last time, we also included filtering for Zcash nodes. So last time when we were here, we thought the network size was around 6000 nodes, which is not correct. The latest finding is that the network size is ~200 nodes. The only thing that we don't still have support for is the ipV6 scanning. So the nodes we have so far collected are only ipV4 & the number is around 200 nodes in the whole network. The interesting finding from our side is most of these nodes are Zcashd nodes. There is less than 10% of zebrad nodes in the network which was interesting to see.

[35:58] 

Also we've been manually crawling these nodes. We wanted to see how they behave when we connect to those nodes and what messages they sent. So we collected the black box behavior of the network protocol whenever we connect to some node & we can know for sure what will happen depending on the initial first message sequences that we receive.

[36:25] 

That's an interesting thing for us because the next goal for us is to execute a Red Team exercise on the testnet. So this is how we collect information for that thing & we are preparing right now scenarios.

[36:41] 

One of the interesting things that we also noticed is every Zcashd node to which we connect to reports around 1000 nodes in the peer list. In this peer list we also have Flux nodes and Firo nodes which are not part of the Zcash network, but somehow they are present in the total IP pool that the node has locally. So what we also did is spin up our own zcashd node which we can use RPC commands and we also noticed that this node reports around 1000 addresses & peer lists.

[37:30]

But when we connect to it and check with the RPC call, we see that it reports only around 30 connections. So that's a good thing. The question is, why does it have these firo and flux nodes in the peer list? That's something there which could be improved, I guess, in the future.

[37:49] - **Daira**

Yeah, we don't currently filter by port for example. I guess the original intention was that incompatible forks would change the network magic, but they didn't. So it's probable that we could improve how the Address manager works so that we're not carrying around information about nodes that aren't compatible.

[38:22] - **Karlo Mardesic**

Yes. We don't see this behaviour in Zebra. Zebra is working perfectly fine.

[38:28] - **Daira**

Yeah, zebrad does have port filtering.

[38:33] - **Karlo Mardesic**

But the good thing is this peer list is randomized. So there is hope, because we thought if it was not randomized. Since it's randomized, whenever some new node connects to the network, eventually it will be broadcasted to other nodes in the network and that's how that IP address will be shared.

[39:00]

Basically, this is the summary of what we have done. We have a few other things that I could maybe mention, but I don't want to go too much into details. I can say that if we manage to perform a handshake with the node, we can definitely get the full peer list with some techniques. So that's a good thing for our crawler. We can easily map the whole network if we perform a handshake and to perform a handshake, we just need the correct IP address and a port. So that's something we are implementing right now in our crawler to be as best as possible.


____

### 3. Research & Implementation Updates v) Nighthawk update


[40:09] - **Adi**

Hello, I'll give a brief update here. So we have finished writing and deploying the K test stateful scripts to automate zcashd deployments as part of our 2023 roadmap to set up a distributed and highly available lightwallet service. We will make available the new endpoints when they go live & once the initial sync is completed, the lightwalletd services can be deployed to any new region within minutes and we plan to open source these scripts that we have written.

[40:41]

We are looking forward to the release of  lightwalletd 0.5 version later this month to support the newer APIs for parallel and reverse scanning features that Kris talked about earlier. Zcash Block Explorer is upgraded to reflect the v5 transaction fees for Orchard and non-Orchard transactions and the backend server was migrated to a new cloud provider. We did drop support to connect our nodes to Tor enabled nodes as some of them were misbehaving, but our zcashblockexplorer.com continues to be reachable via Tor onion address, the v3 address that we have made available.

[41:21]

On the wallet front, the team is working on adopting updated native architectures from Apple and Google platforms and ECC Mobile SDK with the ZIP-317 proportional fee structure. That's it for now.


____

### 3. Open Discussion i) Zebra Stable Release Timeline / ZSA estimated wallet load


[42:20] - **Adi**

Yeah, I would like to know the rc release for Zebra, is that something usable in prod or is there some more time before you plan to market as a release worthy candidate?

[42:38] - **Deirdre**

We are still considering everything marked release candidate and prior as beta software. But we are fully intending after our audit has been complete and any remediations out of the audit confirmed by our auditors to prepare a 1.0 stable release that we intend to support for production deployments.

[43:05] 

And we're intending to get that done within months, being a bit conservative, I would say we are mid audit, so I don't want to count any chickens before they hatch. But the preliminary phases of our audits the findings have been minimal & requiring very little changes on our part. So if that trend continues, we expect to be able to finish our audit, remediate any changes, have it confirmed, and prepare 1.0 for stable production environments and then have the Zcash Foundation team be ready to support that long term stable software for our users in terms of user support & any security incident handling if that were to happen. So not yet, but very soon.

[44:07] - **Adi**

That sounds good. On a parallel front, as we know that the qedit team is working on ZSAs and a Zcashd update with ZSAs work. If we do move forward in the next six months to a year to make this alive in the prod, how. soon can zebrad catch up to implement all these updates of ZSA support?

[44:31] - **Deirdre**

We haven't taken a first pass on it yet to estimate how much time it would take. But since we would be implementing a lot of the software that gets merged into the Orchard crate and into the halo2 changes to the circuit and all that sort of stuff, we would inherit a lot of that because we already use it to verify Orchard transactions and all sorts of NU5 & Orchard related consensus rules.

[45:01] 

We don't think it would be a big lift, but I can't give you a hard number right now. We have been consistently trying to watch the design of ZSAs as how it would impact a full node with a design like Zebras, which does a lot of things in parallel, and asynchronous in terms of consensus verification, and we think it's looking okay. There is nothing fundamental in the ZSA design or implementation that is significantly different or harder for Zebra to handle than anything else that we're currently doing. I can't give you a hard estimate, but I don't think it would be a crazy amount of work.

[45:50] - **Adi**

Thank you.

[45:53] - **Kris**

I do have a ZSA related question with respect to scanning the chain. So what is the additional load going to look like? Is it going to be essentially an additional trial decryption cost per output or per asset that you're attempting to scan for? How is that going to look in terms of wallet implementations, what kind of costs will wallets bear from ZSA's?

[46:40] - **Adi**

I think this is a question for Qedit, right?

[46:44] - **Kris**

Yeah or anyone who has knowledge.

[46:55] - **Vivek**

I'm actually not 100% sure about the answer to that, but I can just check and get back to you. Yeah, that's definitely something that I'll check and we'll get back to you on that. I don't have the specific details right now and I'm away from the computer, but I'll try and get back to you as soon as possible.

[47:14] - **Kris**

Okay, thank you.

[47:23] - **Pili**

Any other questions or anything else you want to discuss?

[47:37] - **Deirdre**

Yeah, there was just some questions in the chat about proof of stake, and Daira basically replied there hasn't been much movement & I think main reason is that both teams have been dealing with the sandblasting attack and Zebra has been trying to get up to 1.0. So there hasn't been a lot of movement on PoS in many areas of the community because we've been occupied.

[48:45] - **Pili**

Thank you to everyone who participated today from Qedit, Equilibrium, Nighthawk and the Zcash Foundation. So we will see you all next time during the 22:30 UTC slot. Thank you & goodbye.

_____

### Attendees


+ Zcash Foundation

+ Kris Nuttycombe

+ Daira Emma

+ Adi Nighthawk

+ Conrado Gouvea

+ Deirdre Connolly

+ Jack Grigg

+ Karlo Mardesic

+ John Bruhling

+ Marek

+ Mark Henderson

+ Pacu ECC

+ Piotr Olszewski

+ Taylor Hornby

+ Vivek Arte

+ Ben Beale

+ charlieok

+ Greg Pfeil

+ Jack Gilcrest

+ Jason McGee

+ lucky tokidoki

+ Mandeep Bhalothia

+ Michael Harms

+ Niklas Long

+ Oleksandr Putyak

+ zero d


**Next Meeting Scheduled: 22:30 UTC May 18th 2023**


___
___

