# Arborist Call #43 Notes

Meeting Date/Time: January 12th 2022, 15:00 UTC

Meeting Duration: 1 hour

**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status - [Zebrad -rc.3 / FROST update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2043-Notes.md#1-zebrad-updates---zebrad--rc3--frost-update)

+ Research & Implementation Update - [ZSA protocol current status](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2043-Notes.md#2-research--implementation-updates-i---zsa-protocol-current-status) / [ZSA note ciphertext / New features](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2043-Notes.md#2-research--implementation-updates-ii---zsa-note-ciphertext--new-features)
    
+ ECC Core Update - [TZE's / DAGSync progress / Deprecated rpc's](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2043-Notes.md#3-core-updates---tzes--dagsync-progress--deprecated-rpcs)



Video of the meeting: [recording](https://www.youtube.com/watch?v=p5u9EdQSftE)

**Slides**:[1](https://ipfs.io/ipfs/QmbX2xEndok2qGPi9h2JpgXuqGS8zYTsEvH5qi4WVsnUo3)

Moderator: Ian Sagstetter

Notes: Jason Rogers

___

## Decisions & Action Items


i) Arrange meeting with QEDIT to discussing Pull Requests between orgs

ii) Further discussion on change to memo field format

___

## Full Notes



### 1. Zebrad Updates - Zebrad -rc.3 / FROST update


[02:58] - **Pili**

i am Pili, the engineering manager at the Foundation. I don't usually speak in this form I lurk occasionally but hopefully you'll be seeing more of me on this call. Right now in Zebra we've finished implementation of the getblocktemplate rpc method. We want to throughouly test to be as sure as we can be that it will work correctly. Especially since we are not sure how we're going to mine a block on testnet at this moment. We're doing as much testing as we can and maybe we will get to mine a block but thats currently up in the air. 

[03:44]

We have implemented most of the rpc methods that we think are needed to support mining pools. There are a few others that we need to re evaluate to see how many mining pools are using them and ensure we have a minimal set of rpc methods that will enable mining pools to use zebra. 

[04:13]

We recently tagged our 4th release candidate and thats [rc.3](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.3). That release includes the mining pool rpc's that have been implemented and also some changes which implement the latest zip 317 changes to make sure the transaction selection algorithm for the getblocktemplate rpc method matches zip 317.

[04:23]

Please check out the release and the release notes if you're interested in the full list of changes. If you are using Zebra, please upgrade to benefit from all the new functionality and fixes. If you do want to try out the latest rpc methods that are implemented to support mining and generate blocks, you will need to compile Zebrad with the getblocktemplate rpc's feature and also do some extra configuration on your node. Please check out the release notes & readme for more information on that. A caveat that mining support is currently incomplete, experimental. More details on github, if you have any questions you can drop us a line on discord or create an issue of github. 

[05:46] - **Ian**

Thank you, are there any comments or questions from anyone in the audience or any panelists?

[05:53] - **Daira**

Is there an expected timeline for complete support for mining?

[06:04] - **Pili**

Not as such but I'm hoping that in the next couple of sprints, hopefully by the end of January we will have something that we are confident that mining pools can test. 

[06:18] - **Deirdre**

I wanted to give an update on some of the FROST work that we're also doing at the foundation. We have a zip up for review about [how to use FROST with the spend authorisation signatures in Zcash](https://github.com/zcash/zips/issues/382). This is a variant, it points to the IETF document which is almost done, it went through last call with lots of praise so we're synthesising the final feedback and getting that moved from a draft document to a real RFC. 

[07:08]

The zip on how to use it with Zcash points to that but with the update that it is re-randomised because the spend all signatures in sapling & orchard that we have designed the cipher suites for are re-randomised to improve privacy across different transactions. We have been working on it for a while but we are putting it out there to get the zip review. We have implementations of it that we are getting tidied up. That's available for people to look at and then we have rust code of how to use it. 

[07:49]

We will be updating our old rust code of how to do FROST for sapling and orchard ciphersuites for redjubub and redpalace signatures, which we've had for a long time but was based on pre-rfc versions of frost. We'll be updating to point to those in the future. 

[08:15] - **Adi**

I had a question regarding the mining support in Zebrad. Is it going to be a 1:1 feature set as Zcashd, or are there any extra features or customisations available with the mining support in Zebrad?

[09:04] - **Pili**

So far it's actually going to be less features because right now we can generate the block but we cannot do the actual mining. I believe Zcashd can do mining. So far we're doing the minimum we have to do in order to support mining pools. As we do some testing and talk to people we might decide to implement more mining rpc's and more features but right now this is the bare minimum that we have to do. 

[10:07] - **Nate**

Is Zebra team in contact with any mining pools?

[10:17] - **Pili**

Yes, we some of the developers have been in contact with the mining pools. I have not been in touch personally but we have had some feedback. I have to say it's very hard to get any details. We're hoping that once we get them to test we'll be able to get more clarity but I think getting them to test will be a challenge, fingers crossed. 

___


### 2. Research & Implementation Updates i) - ZSA protocol current status 


[11:13] - **Jon**

On our side there is myself and Vivek who has been updating the community  and runs the updates for zips and a lot of the work that is communicated back to the community. I want to do two parts, a quick status on Zcash Shielded Assets, where we are, the upcoming pull requests that are about to be baked and served, and then a word on roadmap questions that we started to float to see what would be the most interesting next features. If there is time I would also like to discuss the testnet plans of Zcash shielded assets and when that would come. 

[12:22] - **Vivek**

Most of the updates have already been posted on the [Zcash Community Forum](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153/25?) last week. When it comes to ZSA's, some of the updates they've had such as the burn mechanism. We've implemented the burn functionality and we'd recommend going over the [pull request](https://github.com/QED-it/orchard/pull/35). We've added features to do some of the basic burn implementation, to burn given amounts of a specific asset but theres still work left on the circuit and other parts so its not totally a complete picture, we're getting there. 

[13:57]

The other update we have is on the [note encryption](https://github.com/zcash/librustzcash/pull/746/files). This here, for add 32 bytes of an asset identifier as part of the ZSA protocol. We have to add that to the note and that required some changes to 3 crates, zcash note encryption package in librustzcash, the orchard crate itself and the zcash primitives package inside librustzcash. 

[14:27]

So far we've had only 580 bytes as the plaintext size and now we need to allow for that as well as well as support for sapling for the 32 bytes added, so 612 bytes for the new ZSA protocol notes. We have pull requests for the librustzcash package and we have initial work done for the orchard crate. We are still working on the Zcash primitives part of the package but its a work in progress.  

[15:07]

We've also started working on the client again. We had done some cosmetic changes where we had changed rpc commands so that we now see the asset ID balances. We've moved a bit beyond the cosmetics, taking the details from the orchard crate. Thats an important bridge that we're building right now. 

[15:34] - **Jon**

For the zip's one thing. All of the ECC and Foundation, all these pull requests at some point we will need to make sure that you can catch them on the other side. It's becoming a pretty large effort and at some point we should talk & when do we meet. 

[16:03] - **Vivek**

In the zips, the zip editors have given a lot of very important comments. We made some of the changes and there are some changes which we might want to discuss further. We will probably contact you soon and get things hashed out with the zip editors & important stakeholders. We also split the zips like [PR 649](https://github.com/zcash/zips/pull/649) we kept the transfer & issuance.

[16:54]

We had zip 317b, but we've separated that out into a [new zip](https://github.com/QED-it/zips/pull/2) that is currently only on a pull request on a QEDIT fork of the zips. I think the general preference was that instead of having a separate file zip317b - we merge it into zip 317 with serparate sections to point where we are adding changes for the ZSA protocol. We are working on adding those suggestions into zip 317 after which we'll be able to make a proper pull request to the zips.

[17:43] - **Jon**

One addition on the zips. One of the pieces of work we need to do is add the spec itself but after discussing this with you guys, a lot of changes on the spec are changes inside the zips that would go (as is) to the new spec. We understood thats the best way to do it. We haven't touched the proper spec but there are whole sections of this that would go as is. 

[18:19] - **Daira**

I don't anticipate that will be a lot of work if that can be copied or moved across wholesale. 

[18:27] - **Jon**

Yeah. We managed to indicate where each piece of material would go. The next piece is what's upcoming. We have a bit of work to deliver. To finalise the transfer part, pieces of the circuit that are still work-in=progress, the spec itself is being written. All this is in the coming month.

[19:07]

We already have ideas that we want feedback on, what to do next and what to do first. There's a piece that makes all these changes concrete, tested and to give the wider community a way to play with the developement and theres another to make sure whatever happens on ZSA is useful for the first applications that we envision for them. Here we actually started with our QEDIT hat, talking to people that might look at that as infrastructure for stablecoins & concrete use. 

[19:58]

It made us reorder the features that we thought about. The main feature that we would like to implement next is Reject Transactions. Because if this is used for payment you want to be able to say "I don't know who sent me this money i don't want it". It connects to all the stuff that happened with Tornado Cash, is it yours? do you need to create a transaction to push it back? All these legal questions we want to avoid. 

[20:31] - **Daira**

I'm glad you're taking that into account. 

[20:34] - **Jon**

There's a bunch of other roadmap features that each could idependantly could be discussed. I don't want to take this call for that but I do ask that you see what we are proposing and maybe have another conversation. This will be submitted to all the formal commitees. We will follow all the formal steps to propose that for the next work.

[21:31] - **Str4d**

As far as next steps for Integration goes, Zcashd has a framework for network upgrade features which we tried to get in for NU5 and didn't quite hit it. None of the NU5 stuff uses but the framework is there in the codebase. My recommendation there would be to implement ZSA's using that feature flagging system. If you've got questions, come talk to us. 

[22:03]

Essentially that will allow us to optimistically merge code in rather than growing a very large patch set. That code can then be gated off so it doesn't affect the mainnet consensus rules or regular testing consensus rules. Then we can explicitly enable it. Getting to the point about testnets, the initial thing would be to define a new tesnet just for playing with these features and get that prepared and as other things shape up for NU6, assuming this goes in, whatever other features can be combined and tested together. Once we are happy with what's going to go into the next network upgrade that can then be rolled out onto testnet. 

[23:23]

Probably means you want to do a similar thing in terms of the orchard crates, using feature flags for those new pieces. In the same way as in zcash primitives we have 'unstable' or 'experimental' as a feature flag for the TZE stuff. I think we had conversations at one point about doing ZSA's using the TZE's. 

___


### 2. Research & Implementation Updates ii) - ZSA note ciphertext / New features


[23:57] - **Deirdre**

Was your original question about note encryption extra bytes?

[24:07] - **Str4d**

Yes it was. The question i had there was, are you going the approach of preserving the existing memo size or consuming bytes of that memo? Are you going the direction of the entire cipertext growing to 612 bytes or are you keeping it at 580 and consuming a piece of the memo internally?

[24:33] - **Vivek**

We are going to be extending the cipertext size by 32 bytes. The memo size stays the same for 512 bytes and the whole thing goes up by 32 bytes. 

[24:45] - **Str4d**

That then ties into discussions that we had and stuff that we didn't end up putting into NU5 due to complexity budget reasons, but one of the things we had discussed was potentially splitting off the memo field into a separate ciphertext to allow for more configurability at the expense of some extra can be revealed, but you can then do things such as have a memo that is decryptable by multiple recipients in the transaction or if you don't need memo's and you are willing to exclude that space then exclude it to save transaction size, there are a few others with some issues. 

[25:33]

If we're going to be changing the memo field formats for this we should also have that discussion as well.

[25:44] - **Daira**

I think doing the simple thing of extending the ciphertext size in the initial implementation is fine and then we can consider how to integrate that with the other changes. 

[25:58] - **Str4d**

The reason i mention that is because whatever we do, as you can see from the PR is going to be somewhat extensive in terms of changes to the Zcash note encryption crate. Certainly the way the changes have been implemented thus far, they affect the existing code rather than just being additions. 

[26:18]

We might be able to separate some of those changes out. The move to use an associated constant for the length. I think at the time we built the crate we couldn't do that because of limitations in rust but our msrv might be recent enough that all of the const stuff we need for it is available. That'll be something we're thinking about when reviewing that. 

[26:47] - **Vivek**

That's interesting because I think I had tried using an associated constant and running into the same rust issue some months ago. If its working now that would be interesting. 

[27:03] - **Str4d**

We still cant do math with constants but we can use those associated constants in more places that we used to. That's also why i was asking about if its expanding because we might be able to simplify the api's that currently use generics to tie up the lengths of ciphertexts. We could instead split this into a refactor that means the length is no longer part of the type expression. That would then enable the new thing to be done as an addition rather than as a modification. We'll have a think and see how we can split up those changes to make it easier to integrate as a feature. 

[27:52] - **Daira**

Str4d mentioned adding a new testnet, that actually would've been useful in previous upgrades like Canopy and NU5, probably Sapling as well because we had some coordination difficulty. People wanted to be testing on the existing protocol & testnet at the same time as we wanted to upgrade testnet. 

[28:20] - **Str4d**

We've done private testnets in a sense before where we've privately forked it but theres no reason why we can't just add another testnet definition. 

[28:33] - **Jon**

That's one of the proposals that we're thinking of and trying to time for Zcon. To actually have another testnet that we can be taking care of and maybe hosting so that people can play specifically on ZSA. Its one of those, "lets do this quickly, it's a quick win". 

[29:03] - **Adi**

I wanted to expand a bit on the transaction rejection. What is the high level approach to reject a transaction & who pays the fees for this rejection?

[29:18] - **Jon**

I think we might arrange a small AMA on those specific designs. There is a lot that goes back and forth on these questions, this is part of the work; trying to find the design space & pros and cos & propose something that makes sense but, to your question its probably if you made a transfer - you are paying the fees and if the other person refuses and it didn't go into the block the miners won the fee. You don't want to make it spammable just because somebody refused. It's the senders responsibility to send. 

[30:04]

If the person that received refused it, well, it went on-chain and took some space so somebody needs to pay. 

[30:15] - **Daira**

Presumably there will have to be some record on chain whether it was accepted or refused because that affects the balances of the sender & recipient

[30:25] - **Jon**

Thats the whole conversation and we need all the smart people to help us think about it.

[30:33] - **Adi**

Follow up question. Are you thinking of a minimum amount of ZEC to be held in wallets for a wallet to be eligible to interact with ZSA's?

[30:43] - **Jon**

I don't think this came up but it is a problem with Ethereum tokens when you get a token and then have no way of moving it around because you don't have ETH. We can discuss that in other forums. 

___


### 3. Core Updates - TZE's / DAGSync progress / Deprecated rpc's


[31:13] - **Adi**

Quick question to Str4d, Is the NU5 framework code compile ready for testnet purposes? 

[31:20] - **Str4d**

The feature logic? Yes that was merged a while ago. 

[31:40] - **Daira**

If you search for Zfuture in the sourcecode you'll find it. If I remember correctly it's like a synthetic network upgrade that is called Zfuture. 

[32:19] - **Str4d**

If you look in [source/consensus/params.h](https://github.com/zcash/zcash/commit/766abede57b4672e95e20d0676db760c5587cef6) you'll find there's a consensus feature enum. There's a feature info structure there. You can basically define a graph of features, so you can define initial features that do things and then later features that build on earlier features and so on. 

[32:49]

We have an open PR for trying to get in TZE's as a feature that then things could build on but haven't had the time to get that full in. Thats what that framework enables. It's geared mainly towards consensus features specifically, its not the thing you would use for new rpc methods related to wallet behaviour, thats more suited to something like a config option. 

[33:21]

This is suited to something more like, you want to configure the set of consensus rules that are to be applied. The intention is that new consensus changes will go into this or maybe in future turn off features. 

[33:38]

TZE stands for Transparent Zcash Extensions. It was something we designed a while back for essentially a extension of the way transparent logic works. Generalising the UTXO model to sending funds to something that is encoded as a precondition. Then when you go to spend it you have to provide a witness that satisfies that prepared precondition. Which is effectively how transparent UTXO logic works with bitcoin script.

[34:18]

One could implement bitcoin script in this model. The idea was that it was a general pluggable system that we could A) build other things on top of that needed that UTXO style commitment scheme (commit > witness) for spending and that we could also use to collect & collate things people were trying to do in the desirable future when everything becomes fully shielded, even these pieces we could be tracking the things people were trying to do so that shielded versions of them could be more easily determined and written. 

[35:04]

It is a problem we have with Bitcoin script, because right now if we wanted to move bitcoin script style things into a circuit we would need to support the entirety of bitcoin script even though the vast majority of the opcodes noone uses. 

[35:19] - **Jon**

I have internal information there thats super interesting thats kind of public. There's a language called [simplicity](https://blog.blockstream.com/from-miniscript-to-simplicity/) that somebody at blockstream was working on. It's a sort of extension or a much stronger version of bitcoin scripting. They're actually looking at doing that and compiling it into circuits that would be zero-knowledge proven. There's zero-knowledge thread in bitcoin core thats under the radar. 

[36:16] - **Daira**

One of the motivating examples for TZE's was BOLT. 

[36:25] - **Str4d**

They renamed to ZK Channels. Where you were doing zkp's off-chain but then your on-chain state still needed a UTXO model. That was the motivating idea for TZE's. Intending to make the system more pluggable in a way that we as full node maintainers could manage the complexity of. 

[37:05] - **Ian**

As we discussing everything relating to QEDIT's work, does anyone from ECC or ZF have implementation or research status updates?

[37:29] - **Daira**

There will be some minor updates to the protocol spec. Just corrections, not anything that changes consensus. One of them is actually an error in the spec relative to [ZIP 212](https://zips.z.cash/zip-0212) which was done in Canopy. If you are implementing from the spec then this may be relevant to you. 

[38:05] - **Str4d**

We've got a couple of fronts we've been working on. The main one has been continuing work on DAGSync implementation for the mobile sdk's. Kris has been doing excellent work building the shardtree crate which is implementing the new tree strategy. He's just put the PR up for that so we'll start a review on that. We've also blocked out and about to start on the zcashd changes that are needed to power shardtree. Then when those two pieces are done and we thread it through lightwalletd we'll be able to get out the first increment of performance improvements. 

[39:04] - **Daira**

Can you give a summary of how shardtree is different?

[39:16] - **Kris**

Sure, the main difference is up until now the Zcash note commitment trees which we use in order to make proofs that you control a particular node. They have required in-order, linear appends. So to produce a current note commitment tree for a given note you would have to scan the chain in linear order. 

[39:57]

The idea of shardtree is to change that from a linear ordered scan to be able to decrypt or add to the note commitment tree in random order. This will enable things like scanning just the last 100 blocks of the chain and then getting information about intermediate nodes of that note commitment tree from a 3rd party like lightwalletd. 

[40:35]

The note commitment tree is public information, all that we need is intermediate nodes of the note commitment tree and then information about the specific subtrees in which our notes live, which is determined by our wallet and then we scan them in random order and make notes instantly spendable with just a megabytes worth of download from lightwalletd of data thats static. Thats the essential thing - getting rid of the requirement of linear appends. 

[42:07]

If someone could expand on, what is the work on recursion for halo 2? Is that something to do with scaling solutions? It's the last point on the slide. 

[42:37]

The ECC has a cooperation with the Filecoin Foundation and the Ethereum Foundation on working on recursive zero knowledge proofs. Halo 2 was always designed to support recursion, like halo but the implementation of that was incomplete because we didn't need it for orchard. We're filling that in. 

[44:00]

Refactoring the rust sapling types, that's to make the sapling implementation more similar to the orchard crate because we learnt a lot from implementing orchard. We want to make those more regular, that will make it easier for external parties to implement things that work both for sapling and orchard (eg. hardware wallet support).

[44:34]

To support zip 317 the fee changes, part of that is we now backported some changes from bitcoin for transparent transactions keeping track of dependencies in the mempool. Because we would have to track code that has changed in Bitcoin we wanted to do those refactors first. 

[45:25]

There are several features mainly in the rpc api's that had been deprecated for a while and have now been removed. 

[45:37] - **Kris**

Just a clarification. The deprecated features can now be re enabled for a period of time as mentioned on the deprecation page by providing command lines at startup. They have not been completely removed yet but they will be. If you are making use of any of the deprecated features you should migrate away from them. 

[46:08] - **Daira**

I think the main changes were things that were deprecated but on-by-default have now changed to off by default. A couple of the very old things like z_seeraw method that were prototyping the shielded functionality even from before launch. Those have been removed completely and there was  was a lot of near duplicated code between several rpc methods that handled sends so changing them to use the same code will help in future. 

[46:59] - **Kris**

The primary interest there, it was going to be extremely challenging to implement zip 317 for the zcashd wallet without fixing the technical debt thats been around since 2017 and inconsistent code in those rpc methods and so getting rid of that duplication and cleaning everything is a prerequisite to zcashd wallet implementation of zip 317. 

[47:44] - **Adi**

Speaking of deprecation i noticed the dumpwallet feature was deprecated. I want to understand what the thinking was behind that?

[47:55] - **Kris**

They should use the z_exportwallet. This has a been the case for some time, that dumpwallet has been deprecated in the rpc docs. It didn't correctly export shielded keys. 

[48:20] - **Daira**

It did exactly the same thing that is does in bitcoin which is only dump the transparent part of the key tree. if you use that and you also used shielded addresses in your wallet then you would only be dumping part of the information. 

[48:42] - **Adi**

With the new feature of z_exportaddress, you need to know the address. What if the user doesn't know their addresses and just want to get all the private keys from a wallet. How would they do that?

[48:55] - **Daira**

z_exportaddress is a superset of dumpwallet. 

[49:04] - **Kris**

Also since Zcash 4.7.0, we now have mnemonic derivation of all keys from the mnemonic seed. So backing up the mnemonic seed for any newly created addresses is sufficient to be able to recover those. 

[49:50] - **Nate**

Brainstorm: we could augment the online/live output for deprecated methods to refer to which calls supercede them (eg. dumpwallet should say "use z_exportwallet" instead).

[50:00] - **Daira**

I think it does. I just checked if you call dumpwallet it will mention z_export wallet in the error message. 

[53:09] - **Adi**

Great work refactoring the outstanding code for ZIP 317 and DAGSync changes Team ECC!. 

___

### Attendees


+  Jon QEDIT

+  Adi Nighthawk 

+  Conrado Gouvea

+  Deirdre Connolly

+  Pili Guerra

+  Vivek QEDIT  

+  Pacu

+  Yasser Isa Manzur 

+  Daira

+  Nate ZEC

+  Str4d

+  Kris

+  Jack Gavigan 

+  Greg Pfeil

+  Marshall G

+  Matthew Watt

+  John Bruhling

+  Kitty Crypto

+  Charlie Okeefe


**Next Meeting Scheduled: 22:30 January 25th 2023**
___
___
