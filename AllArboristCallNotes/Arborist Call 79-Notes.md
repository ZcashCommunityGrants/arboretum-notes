# Arborist Call #79 Notes

Meeting Date/Time: June 13th 2024, 21:00 UTC

Meeting Duration: 1 hour 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [ZIP-320 / Arti support / ZIP-317 fees](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#1-ecc-update---zip-320--arti-support--zip-317-fees)

+ Zebra Update - [Zebra Scanning / Zcash Script](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#2-zebra-update---zebra-scanning--zcash-script)

+ [ECC & ZF Zcashd Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#3-ecc--zf-zcashd-deprecation)

+ Research & Implementation Updates - [FROST refresh shares / Multisig & Dev Fund options](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#4-research--implementation-updates-i-frost-refresh-shares--multisig--dev-fund-options)

+ Open Announcements - [NU6 Specification](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#5-open-announcements-i-nu6-specification)

+ Open Discussion - [Dev Fund Proposals - Design Space](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#6-open-discussion-i-dev-fund-proposals) / [Dev Fund Proposals / ZIP proposers guidance](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2079-Notes.md#6-open-discussion-ii-dev-fund-proposals--zip-proposers-guidance)



## Decision & Action Items

i) ZIP editors to decide NU6 specifications in next meeting

ii) Create documentation for miners ZIP-317 submitrawtransaction 


___

Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - ZIP-320 / Arti support / ZIP-317 fees


[00:00:00.00] - **Kris**

...then the final interesting thing is, in the pursuit of adding privacy to being able to retrieve exchange rate information, Str4d has gotten a prototype working of retrieving currency conversion rates over Tor from the wallet back-end. 

[00:00:42.28] - **Daira Emma**

Yeah, and It will help in future with things like transmitting notes cyphertext over Tor, which should really help scalability.

[00:00:54.16] - **Kris**

Yeah, this will allow us to do essentially, other parts of the wallet operations that are currently leaking more information than they should, such as transaction submission, can be done connecting to the lightwalletd servers over Tor. So it's a pretty exciting improvement.

[00:01:19.30] - **Daira Emma**

Partly thanks to the ZF development funding. 

[00:01:26.58] - **Str4d**

I think it was ZOMG back in the day. Major grants for funding the [Arti](https://forum.zcashcommunity.com/t/arti-a-pure-rust-tor-implementation-for-zcash-and-beyond/38776) work. There was a bit of trepidation in terms of using it. Given my past experiences trying to bundle a tor, but bundling Arti as a library was significantly easier than all of my past attempts at getting Tor clients working on the fly. So kudos to the Tor team, Nick Mathewson and the others who've been working on it for crafting a rather nice library within their constraints.

[00:02:10.40] - **Daira Emma**

I wrote a paper with Nick Mathewson and the other for people once. It was on mixnets' reliability using reputation systems.

[00:02:22.07] - **Str4d**

And the nice thing also about this is that if using and then using mixnets instead, depending on what properties we want to have, it starts the pathway towards being able to use whatever is most appropriate for whatever particular wallet sensitive thing. But having something to interact that way is far better than the status quo.

[00:02:57.26] - **Daira Emma**

I have been working on ZIP-320 support. It is basically finished. We ran into a slight niggle, which is that the current database schema used in zcash client, sqlite, it assumes that any UTXOs, any transparent outputs that you know about have a known height.

[00:03:32.07] - **Daira Emma**

In the case of the ephemeral output between the first and second transactions in ZIP-320, it doesn't have a known height because we're submitting two transactions at the same time. That's required a little bit of database changes. We're just finishing that up. There's actually some complicated design issues of what the schema should actually be, but I think we've got those mostly sorted now. I'm thinking that will probably be done early next week. We were intending to get an SDK release that this week, but it's not going to happen. It turned out to be too complicated.

[00:04:26.31] - **Dodger**

Any questions for the ECC team? With Arti integrated on the client side, next step will be to add it to enable a service on the node side and then some mechanism for Tor-enabled node discovery so that wallets can submit new transactions directly to nodes over Tor.

[00:05:07.11] - **Str4d**

That's going to be a fair way off at the moment. Because at least if we're basing on an Arti, they're still working on their Onion Service implementation, so that's not yet ready for anything other than experimental use, but having the client side integrated is definitely a good starting point. Just connecting through exit nodes to there will be a huge improvement, and then we can shift it to Onion Services once the Tor team are happy on that side, or we can shift it to any other channel we want there, which would be nice.

[00:05:45.26] 

Similarly, also, if we get to the point of having Onion Services or a mixnet  inbox or something like that, then peer-to-peer broadcasts between wallets will be something that we can use that for as well because what it essentially provides from that perspective is NAT traversal. No matter where you are, you have essentially a private VPN-ish type thing that you can use between two wallets.

[00:06:21.30] - **Kris**

Something else that's potentially related here. So, Dodger, you mentioned direct submission to a node. However, a little bird told me earlier today that there is a prototype of a lightwalletd server written in Rust that is supposedly going to be visible soon. So we'll find out more about that. But this, I think, is for part of Zingo's NYM integration.

[00:06:55.35] - **Str4d**

That'll be fun.

[00:06:56.47] - **Daira Emma**

Excellent.

[00:07:07.29] - **Str4d**

So the other thing related to zcashd is that the tail-end of sandblasting last year, between when ZIP 317 activated on the network in April and then November, it was a period of time where the sandblasting then restricted itself to the unpaid action limit. When we deployed ZIP-317, the default logic that in zcashd for block creation was that it would enforce ZIP-317 except for a configurable number of logical actions per block with a default of 50, that it would allow to be included in blocks that were unpaid, so that didn't have sufficient fee to be covered.

[00:07:58.27] 

The intention was to allow To have a space that wallets that hadn't yet upgraded to add ZIP-317 support could still have a chance of getting blocks in. The sandblasting then started targeting that specific chunk of block space, effectively, crowding out any wallets that didn't implement ZIP-317. Obviously, implementing ZIP-317 allowed you to skip past that and ignore it. But that died off in November last year, and then it It started up four days ago or so. Again, we hadn't noticed any behaviour in between that, but it's come back up. At least for zcashd, we've decided that it's now been a year since ZIP-317 was implemented and deployed.

[00:08:46.24] 

To our knowledge, all of the major wallets that are out and actively being used have ZIP-317 fees in place. Our plan is to in the next Zcash release, set the default unpaid action limit to zero. Anyone who upgrades to zcashd 5.1.0 and doesn't change the config. So the config settings will still be therem miners can still open that up for their own nodes if they wish, but the default limit will go back down to zero. Essentially, by default, zcashd blocks will not contain any transactions that don't at least pay the ZIP-317 fees.

[00:09:31.20] - **Daira Emma**

Obviously, we're suggesting that this is the desired behaviour for the network as a whole. Obviously, ZF can make their own decision whether you think that's reasonable. But yeah, that's our suggestion because it will effectively get rid of this remaining 50 actions per block that is clustering up block space with spam.

[00:10:11.26] - **Kris**

I have a question, actually. How do our RPC tests do with the unpaid action limit set to zero?

[00:10:21.32] - **Daira Emma**

We will see that in the PR. I thought I'd just submit the PR and let the CI do that for me rather than bogging down my machine running the tests. I assume that they will fail and I'll have a few tests to fix up.

[00:10:38.02] - **Kris**

Yeah, I mean, in a bunch of them, it should just be setting the fee to null from being explicit and just letting the default go through.

[00:10:47.25] - **Daira Emma**

Yeah, exactly. There will be some tests that need to pay ZIP-317 fees when they didn't previously, or we can just override it for those tests, which some of them do already.

[00:11:09.17] - **Conrado**

Yeah, I was thinking about this and I realized I had a question. Do you plan not pay the unpaid action limit to enforce it when you're mining? If you're mining a block, it won't include in any of those, or will you filter them on the mempool .

[00:11:31.58] - **Str4d**

The current plan is to change both. zcashd has two config options, one for mempool acceptance and one for block acceptance, which can be configured separately, but both of them have the same default value of 50. Our plan is to change the default value to zero. It will affect both what gets into the mempool and then what miners pull in.

[00:11:58.11] 

But because the We're not removing the config options, full nodes and miners can still set those values to whatever they want locally for their own purposes. For example, if a miner wants to still enable including in their own blocks transactions that don't pay the requisite fee, on their own, on the node that's generating their blocks, they can set those values to a non-zero thing and then use the direct like submitrawtransaction APIs like they've probably been doing already to include their own transactions for mining pool payouts or whatever, that will all still work if they wanted to do it that way.

[00:12:43.14] - **Conrado**

Got it. Thank you.

[00:12:45.46] - **Daira Emma**

Yeah, because that's a good point. From a miners' point of view, they don't need the Coinbase transaction to pay fees

[00:12:57.19] - **Str4d**

Well, it's not the Coinbase transaction it would be like if they had another transaction because if they've shielded into a shielded pool and then they have a payout transaction, they don't need the payout transaction to pay fees because their fee would go straight.

[00:13:08.51] - **Daira Emma**

Because they're definitely going to include it.

[00:13:10.11] - **Str4d**

Yeah, they're going to include in their own transaction and the fee would go straight back to them if their block gets in.

[00:13:16.17] - **Kris**

They might also do things for their Shield Coinbase transactions. If they're shielding their own Coinbase, they might put those in with zero fee.

[00:13:26.52] - **Daira Emma**

Obviously, those zero fees would not get included by other miners blocks, but they're mining.

[00:13:32.05] - **Str4d**

They're competing for blocks anyway.

[00:13:33.38] - **Daira Emma**

Do you remember if they call prioritized transaction on that transaction, will it still get in?

[00:13:40.52] - **Str4d**

I don't recall the details.

[00:13:42.59] - **Daira Emma**

 I'll document that on the PR.

[00:13:45.38] - **Str4d**

I don't actually recall how prioritized transaction works anymore after the changes. Because the priority system was replaced. So I don't actually know if those APIs do anything.

[00:13:57.25] - **Daira Emma**

They do. I was careful to make sure that they did something vaguely reasonable when I simplified the rest of the priority.

[00:14:05.43] - **Str4d**

They don't remember what it is they do.

[00:14:07.00] - **Daira Emma**

I don't either, to be honest. They're more likely to get into a block if you prioritize them, but I don't remember the details. I will load that back into my memory.

[00:14:19.17] - **Str4d**

Oh, no, I remember. There's two ways of doing priority, and I think one of them no longer works, but the fee-based priority does, where the local node pretends the fee for a transaction.

[00:14:32.09] - **Daira Emma**

What you would actually do is get the node to pretend that it's actually paying the ZIP 317 fee, and that would work.

[00:14:40.31] - **Str4d**

So nodes wouldn't even need to change this unpaid action limit to allow unpaid actions, they could just make their transactions pretend to have the right fees.

[00:14:51.58] - **Dodger**

Does submitrawtransaction bypass the mempool?

[00:14:57.17] - **Str4d**

No, submitrawransaction submits into the mempool. But prioritize transaction is like an internal setting that lets you, which I believe is persistent. If I recall correctly, you can set it before, before you do a submission, I think. I might be wrong there.

[00:15:21.49] - **Daira Emma**

It has to be in the mempool.

[00:15:23.32] - **Str4d**

It has to be in the mempool? Then, yeah, in that case, what they would need to do is allow unpaid actions in the mempool to get their transaction to the mempool, and then they would call prioritize transaction to bump it up to stay in the mempool.

[00:15:38.19] - **Dodger**

So if they allow unpaid actions, that would mean that they could end up accepting other transactions since their own mempool.

[00:15:48.59] - **Daira Emma**

I think you're right. We'll have to have a look at that. Thanks for pointing that out because that might defeat the intent of the change.

[00:15:59.03] - **Str4d**

Well, also remember that mining tools usually keep their block creating node quite private, at least in my experience. It is not directly accessible to the network. They usually have a proxy node in front. So at least the ones that I've been aware of in the past.

[00:16:16.47] - **Daira Emma**

At the very least, we need to document what they should do if they want to get the particular transaction in without changing the global limit.

[00:16:28.00] - **Dodger**

So it could reject unpaid transactions on the proxy node, but accept them on their block creation node.

[00:16:35.16] - **Str4d**

Exactly.

[00:16:36.08] - **Dodger**

And that would not solve the proxy.

[00:16:37.43] - **Str4d**

Yeah, exactly.

[00:16:39.10] - **Daira Emma**

Or we could find a way to make the fee bumping. It's work as they're submitting the transaction.

[00:16:47.54] - **Str4d**

Or do the thing that some do and just build the block template themselves using the components that it gives rather than the full example.

[00:16:56.59] - **Daira Emma**

We want to make it easy for them to do the right thing, so we'll document that in the release notes.

[00:17:03.02] - **Dodger**

The reason I asked about submitrawtransaction is because if submit raw transaction bypassed that filter on the mempool, then that would be an easy way of...

[00:17:19.43] - **Str4d**

Right, but it would also break other usages of that, submitrawtransaction. Because I think That's what lightwalletd uses to submit into the mempool. If lightwalletd wants to enforce those limits then it doesn't want that to be something that light clients can bypass. Basically, this is why we're not removing the config flags. Minors have the ability to ensure that they can still get their own transactions that they need to.

[00:17:52.41] - **Dodger**

I think it's unlikely a miner will be running a lightwalletd off the same time they know that they were generating block templates from.

[00:17:58.40] - **Str4d**

Exactly.

[00:18:15.47] - **Daira Emma**

Did we include the wallet update for ECC?

[00:18:24.26] - **Str4d**

We did mention that, yes. At least for the Zashi-related wallet stuff, yes.

[00:18:31.39] - **Daira Emma**

We have a new member of staff coming on board for the wallet team. Is Andrea here?

[00:18:46.47]

Okay. I'll let her announce that at some point.




____

### 2. Zebra Update - Zebra Scanning / Zcash Script 


[00:18:58.44] - **Arya**

In Zebra, since the last Arborist call, the ECC dependencies have been updated. A docs compilation issue with Rust beta was fixed. There have been some improvements to CI, and support for starting zebrascan and Zebra has been removed in favour of eventually making it a standalone.

[00:19:15.31] 

There are currently PRs open for using the latest version of Zcash scripts in zebra script, which allows Zebra to use different ECC dependency versions than those in zcashd and should be helpful for testing that it builds with changes in librustzcash PRs and running the Zebra scanner on its own process with blocks from RocksDB in Zebra's RPC server.

[00:19:36.20] 

There's also a new tracking issue for adding an indexer service. Zebra seems to just be missing a way to notify RPC clients of changes to the best chaintip or a mempool from C validation interface, and one RPC method for getting the blocks nullifiers without the rest of the block from lightwalletd.

[00:19:57.28] - **Dodger**

Those last few items are related to to Zcashd deprecation.

[00:20:04.52] - **Daira Emma**

So Zebra scan has already been split out into another process or just the prerequisites to do that?

[00:20:13.04] - **Arya**

There's a [PR](https://github.com/ZcashFoundation/zebra/issues/8576) open, I believe, for splitting it out altogether. It's been removed from Zebra. There's another one to make it work as its own binary. Okay, cool.


___


### 3. ECC & ZF Zcashd Deprecation


[00:20:27.23] - **Dodger**

Okay, moving on - zcashd deprecation. Some of that work obviously relates to plans for creating a separate CLI wallet that uses Zebra instead of Zcashd. I don't know if anybody wants to highlight any other work that's been done in that direction.

[00:20:58.08] - **Str4d**

Well, as mentioned earlier, we've been working on things in the librustzcash crates related to Zashi that are also beneficial for this process, in particular, the work that Kris has been doing to basically, add symmetry into the wallet backend logic for transparent logic. There's obviously the Zashi apps and the mobile SDKs that ECC produces are shielded storage only. You can receive to transparent, but then you cannot do arbitrary spends from transparent.

[00:21:38.14] 

However, Zcashd wallet does allow arbitrary spends from transparent, and a replacement for it will need to do so as well because that is one of the primary use cases of it, doing transparent transactions on exchanges. The work that Kris has been doing to add essentially more symmetric representation in the wallet backend of how transparent outputs are handled, which will then still be insulated from the mobile SDKs in terms of what the mobile SDKs will still be shielded storage only. But this is the beginnings of enabling that functionality to be used more generally, certainly in terms of their effects on the zcash client backend code and the general wallet code within it. The changes there will become important for the main wallet back-end.

[00:22:34.07] 

We've also talked about the next steps for actually starting building that wallet backend, the one that will become the wallet service. We have two large corpuses of tests related to wallets in the Zcash ecosystem. We have the Zcash Client SQlite tests that that are directly testing these backends at the moment. We have a set of tasks outlined for migrating those to be generic over the wallet backend so that then they can become tests that we apply to the wallet service backend when that is extracted.

[00:23:18.55] 

Then separately, there is the corpus of RPC tests that exist in the zcashd codebase, which we don't currently have any direct plans for pulling those over. But at some point, that corpus of tests will want to be either adapted to be able to test a wallet service or ported into the Rust framework for testing things directly because it's a great archive of weird stuff that people want to do with the zcashd wallet, and it pins a bunch of the behaviors of the zcashd wallet that people currently rely on. Combining those two into a unified corpus is a longer term goal for ensuring that the replacement wallet does what we need.

[00:24:11.06] - **Daira Emma**

I don't necessarily want to replicate all of the bug for bug compatibility.

[00:24:17.13] - **Str4d**

Not bug for bug behaviour. But in terms of functionality that is required, it's a good source of things that we currently are able to do. There's also open tasks that are going to be worked on for enumerating all of the things that the replacement wallet needs to be doing and things like what the various components of the wallet service need to be passing data, what data they need to be passing around, such as what the wallet and scanner needs to be able to obtain from the indexer and so on and so forth there.

[00:24:57.01] 

And then I think the other thing related to that, that's in the last couple of weeks was, just mostly fixing bugs related to how the transparent balance within the wallet backend is used and represented. So there's a few bugs that were affecting Zashi that fixing those will also be relevant to this. Anything I missed? Okay.



___


### 4. Research & Implementation Updates i) FROST refresh shares / Multisig & Dev Fund options 


[00:26:23.43] - **Conrado**

We're still working on the refresh shares functionality. It's working, but we realized that we need to do some API improvements. We also realized that there was a small issue related to serialization. It's a small detail which is annoying, which is that the FROST specification doesn't allow you to serialize the identity. This does happen during the for refresh shares protocol. It's easy to bypass. You can just remove the identity and re-add it when you resume the protocol. It was just annoying. We're addressing that.

[00:27:03.35] 

We also are doing a few changes to the FROST core and the cipher suite crates because we have to do some API changes related to TD functionality and one thing in the Rust compiler that we were doing, but we were breaking a feature of Rust release. So while we We break the API in a way, so we ended up selecting some things to also change. These are mostly related to how you serialize and deserialize things, not the functionality itself, just API. So these API changes. They are done they just need review, we'll probably make a 2.0.0 rc-0 release to gather feedback, to see if people are happy with these refactorings.

[00:27:59.34]

If you have any suggestion of any improvements that would require breaking the API, now is the time. But we'll do the release candidate maybe next week. And then After some time, we do the 2.0 release. But it's just API improvements, ordinary refresh shares functionality that hopefully will also make it to the 2.0.0. And the work on the FROST server, which helps people use FROST by making it easier to communicate. It's paused due to the other things we are working, but I'm going to resume more on it by adding user registration. 

[00:28:53.49] - **Dodger**

Any questions to do with FROST?

[00:29:10.46] - **Alfredo**

I have a question, I saw in the forums that there are a few proposals for the dev fund that use multisig FROST. Do you think FROST is ready for that? Or will it be ready for November if that proposal gets enough traction?

[00:29:27.01] - **Conrado**

That's a great question. I'm not sure. I just think the tooling, it's a bit awkward to use. It's just common line. We don't have graphical interfaces, but it works.

[00:29:41.49] - **Daira Emma**

The proposals that I saw were for multisig, but they weren't particularly dependent on it being shielded multisig.

[00:29:52.58] - **Alfredo**

Oh yeah. It can be done with a script.

[00:29:56.17] - **Str4d**

You could start off If there was a proposal that wanted a multisig approach, it could start off with a transparent multisig, and then in a later upgrade, replace that address with an equivalent - same entities, but a shielded multisig.

[00:30:15.38] - **Kris**

I will make a point. This is just a technical point on that, but I am highly sceptical that it would even be possible to use a transparent multisig in practice because remember, you're doing this for a thousand plus outputs a day that would all need the multisig protocol to be executed among all of the participants. So I don't think that that multisig approaches that work based upon spending TX-outs from either shielded or transparent TX-outs from the block issuance, I don't think that either of those are really practical.

[00:31:13.29] - **Daira Emma**

I mean, you wouldn't Are you getting together the participants individually for each block. You would be getting them together, I don't know, once a month or however often it is.

[00:31:28.38] - **Kris**

Even doing so. It takes hours just with the P2PKH outputs to consolidate those into spends. It's not a practical approach.

[00:31:48.53] - **Daira Emma**

Okay, so I will have to correct a post that I made on the forum saying that it was technically possible, and at least make that caveat. I said technically feasible, I think, which is a little bit different. I'll have to make some caveats to that post.

[00:32:09.52] - **Str4d**

Because also the thing there is, even if you use a different approach like has been sketched out elsewhere, where withdrawals are done via a separate mechanism from deposits, that still has the option of using either a transparent multisig or a shielded multisig as the target.

[00:32:32.54] - **Daira Emma**

Right, like Skyls proposal. Yeah. There was a technical issue. We're drifting off FROST into the general topic of multisig, but I think I said in my reply on the forum that it was possible to do up to 15 of 15 with P2SH multisig, but that was based on a post I found, I'm talking about Bitcoin 0.10.0, I think, which is before we forked, but I'm not actually certain that zcash supports that. Do you know, Str4d?

[00:33:18.25] - **Str4d**

We forked at 0.11.2. Right.

[00:33:22.36] - **Daira Emma**

I know when we forked, but the post that I found wasn't specific about...

[00:33:29.31] - **Str4d**

My vague recollection is it's 15, but we have to confirm. But that's a more detailed point for later.

[00:33:37.38] - **Daira Emma**

Sorry, yeah, that's going into the weeds. Okay, I'll figure it out. But FROST is much nicer anyway.

[00:33:47.52] - **Str4d**

Oh, yes, so much nicer.

[00:34:04.35] - **Dodger**

One of the advantages of FROST, I'll let Conrad maybe talk through this graph.

[00:34:27.31] - **Conrado**

Yeah, the way it scales, it's linear on the number of participants, but it's not that bad. Even for a thousand, which I don't think in this user case we're talking about we need a thousand, but it's less than a second, so it's totally feasible.

[00:34:52.28] - **Daira Emma**

Okay, that's a Ryzen9. That's not even a particularly beefy machine.

[00:34:59.45] - **Dodger**

One other thing that I think... Actually, there's two things. The first thing that I think a lot of people probably don't realize is how useful the Repair shares functionality is in FROST. Today if you have a 2/3 multisig and one person loses their key, then that becomes a 2/2 multisig. If you have a two or three FROST set up and one person loses their key, you can regenerate that key. It means that the risk profile associated with key compromise or loss is massively different.

[00:35:56.13] - **Str4d**

Yes and in particular, the The way you do that rotation with transparent when you go from two of two back to two of three is by regenerating a new P2SH address. So if anyone sends to the old address, any funds sent to that old address are still 2/2 to gain. Whereas the refresh, because it preserves the public address, because it's only just changing how the signing key works on the back-end and the long-term signing is preserved. Yeah, it's great from that perspective in that it's a true repair as opposed to a migration.

[00:36:41.26] - **Dodger**

Something else that we may start looking into is nested FROST. Let's say you have three organizations. It's 2/3 organizations that need to sign off on the spending of funds. But maybe each of those organizations has seven people. So you might want to make it 4/7. So you have four of seven who take part in the two of three signing thing.

[00:37:15.53] - **Daira Emma**

That might actually be directly useful for the dev fund case, actually.

[00:37:26.23] - **Dodger**

Yeah.

[00:37:27.49] - **Daira Emma**

For reducing the attack surface against developers in a given organization.

[00:37:40.01] - **Dodger**

Yeah. It might also have other useful consequences on the legal side as well.

[00:37:46.35] - **Daira Emma**

Yeah, that's true.

[00:37:48.28] - **Dodger**

But yeah. And that is actually what sparked the question, "is this possible?"

[00:37:53.32] - **Daira Emma**

Actually thinking about what Kris said about performance of P2SH multisig and so that issue. Then I think if we wanted to do a multisig-based dev fund, then FROST is the way to go because it's ready enough that I would be confident recommending to use it.

[00:38:26.15] - **Kris**

I think that the question I'm more interested in there is, Is it a UTXO-based dev fund or is it a protocol reserve-based dev fund? Because the UTXO-based dev fund, I would say that it has served its time, but I don't think that a future dev fund should follow that model.

[00:38:54.15] - **Daira Emma**

Actually, we made some notes about this, and I hadn't had time to publish them, but I can screenshot them actually, and talk about them here. Let's see.

[00:39:21.19] - **Dodger**

So let's wrap up the FROST. Any other questions relating to FROST? Any announcements anybody would like to share?



___


### 5. Open Announcements i) NU6 Specification 

[00:39:38.17] - **Kris**

All right. So this isn't necessarily an announcement. We need to decide on NU6, and we need to decide on NU6 to get specifications for NU6 in a relatively short order. So what I wanted to raise - I think that it is the way that we do things generally in the Zcash ecosystem is we specify things and then we go and implement them. And we need, at this point, a deadline for specifications. Now, what that deadline is, I believe, should be decided by the ZIP editors because they are the ones who are essentially on the hook for delivering the specifications to the community in proposed status, which is 'this is now implementable'.

[00:40:36.07] 

The ZIP editors have a meeting on Tuesday, and I am not myself a ZIP editor, but I'm speaking to encourage the ZIP editors on Tuesday to set a deadline for specifications for any and everything that will go into NU6. And that deadline shouldn't be too far away because we need time to finalize specifications and start implementation.

[00:41:11.42] - **Daira Emma**

Not to put them on the spot, but I think we have three ZIP editors present. Is that right? Arya, Conrado, and Str4d?

[00:41:27.17] - **Kris**

I have a proposal or a suggestion for the Zip editors, which is that I think that the... So there's a ZIP editors meeting scheduled for Tuesday, July 16th at 17:00 UTC. And I think that ZIPs that are intended for inclusion in NU6 should be essentially complete and in proposed status or moved proposed status in that meeting for anything that's actually going to go into NU6.

[00:42:08.33] - **Str4d**

Or which meeting were you proposing?

[00:42:11.37] - **Kris**

July 16th.

[00:42:14.47] - **Daira Emma**

Let's see. What's that relative to the Z|ECC summit?

[00:42:19.25] - **Kris**

It's the week after the Z|ECC summit.

[00:42:22.02] - **Daira Emma**

Okay, that works.

[00:42:24.25] - **Kris**

I know that ZF is planning on putting forth a dev fund proposal based upon their surveys. And there are obviously other dev fund proposals that have been outlined, but I don't think are yet being written into zips that would be implementable. So we need, I think, as a community to say, okay, we've got to get these things done. We have to get specifications that are implementable, and we need to set a deadline for that because otherwise we will not get them in time to implement them.

[00:43:04.33] - **Daira Emma**

I mean, that's assuming that we need to do it by November.

[00:43:07.58] - **Dodger**

Yeah, that's what I was about to say.

[00:43:08.57] - **Daira Emma**

To make that assumption explicit.

[00:43:11.22] - **Str4d**

With my ZIP editor hat on, the constraint here is how long it takes to get things implemented, deployed, and then the deployed nodes active, and the nodes that don't support the network upgrade halted by the time we wanted to activate and audits as well.

[00:43:41.35] - **Str4d**

There's quite a lot of things to do. If the deadline there is November 22nd, so mid to late November. Yeah, that's where the stack will be coming in. So yeah, actually, there's already some rough timelines and various things ECC has a [timeline](https://electriccoin.co/wp-content/uploads/2024/04/ECC-roadmap-April-2024-2.pdf) that sketched out things at one point. I think there's some There's a lot of timelines around there. But yeah, we'll just... Yeah, ZIP editors says we should definitely look at what we think is feasible for Zips that wish to be able to be active by November.

[00:44:30.28] - **Str4d**

If there are zips, proposals that people have that would be fine to activate after November, then they don't necessarily have to be beholden to the same timeline, but the consequence of that is they would not be active at the halving, which is something that those zips would need to take into account



___

### 6 Open Discussion i) Dev Fund Proposals 

[00:44:53.50] - **Kris**

The important thing here is, and this is with my Zcash community member hat on. It seems to me that if a replacement dev fund is desired, which there's a fair bit of polling support for that, i think that the block rewards that go to the dev fund going to zero, I think it will be It's hard to go back the other direction if that happens. It's just personal opinion, but continuity of service is important here.

[00:45:43.37] - **Daira Emma**

I was going to share the notes that we made on deferred dev fund proposals, which are accounting for funds that may be temporarily locked up and get distributed later. One of the motivations for this is to solve the problem that Kris was talking about before about having lots of UTXOs. But the other reason is that to basically give more time to decide where these funds are going and what the policies are to disperse them.

[00:46:37.26] - **Str4d**

Let's just put a pin in that for a moment. This is Skylar's proposal you're talking about.

[00:46:42.54] - **Daira Emma**

It's a generalization of Skylar's proposal. We looked at the overall design space there.

[00:46:53.35] - **Str4d**

Yeah, but putting a pin in that for a moment, is there anything else regarding deadlines and things that anyone else wants to talk about?

[00:47:05.15] - **Dodger**

What's your point, Alfredo? 

[00:47:10.28] - **Alfredo**

I have a question. So how do you imagine the process will be you put a ZIP for each proposal or you reach consensus before and go with one zip to the zip editors.

[00:47:27.05] - **Kris**

I don't have a strong opinion on that myself. I think that I'm always in favour of more specifications that are clearly laying out exactly what will happen. So I think that in terms of the implementation timeline, I would certainly like one ZIP to implement.

[00:47:57.01] - **Dodger**

Well, the ZIP address will have a role in advising on whether a proposed ZIP is practical and implementable.

[00:48:17.11] 

At one end of the spectrum, we have some proposals that assume a continuation of the current dev fund model of slices, 20% or X%, split up into different slices, going to specific addresses or multiple addresses. And then the. At the moment The more complex possibility seems to be what I keep referring to as Skylar's proposal, which is a lockbox where funds get locked up. So there's still a percentage, but they don't get distributed to any specific addresses. And I think that's what you're referring to, Daira.

[00:49:09.34]

The other complexity that we discussed last time around was the Gguy proposal, which had a declining schedule with the remainder going into an unissued reserve or a sustainability fund, there doesn't seem to be significant support for that approach based on the recent poll that we conducted.

[00:49:38.42] - **Daira Emma**

That was my impression.

[00:49:40.27] - **Str4d**

It's also one of the most complex that I've seen, even with the modifications that I directed them towards on the forum to make it doable within the current model, it still ends up being pretty complex. If you squint at it, it's effectively equivalent to putting all of the funds directly into a holding pool and then issuing on a declining curve out of that. You could also squinted it and handle the curve piece in a different way outside consensus potentially, or in a mechanism apart from that or implement it later. There's other ways that the complexity can be potentially moved around, but it is one of the more complex ones.

[00:50:30.41] - **Daira Emma**

Yeah, it depends what you would count as being the issuance curve in that case.


___

### 6 Open Discussion ii) Dev Fund Proposals - Design Space 

[00:50:36.40] - **Dodger**

So I think to introduce Daira now. As things stand right now, the only complex proposal that I'm aware of is this lockbox proposal where the funds get locked up in some manner. So there they're not given to the miners. The percentage is locked up into a lockbox to allow the community time to decide what they want to do in the long term.

[00:51:09.41] - **Daira Emma**

So one of the observations that we made is that the first ZIP of the ZSF, the one that just accounts for what the funds in the ZSF are and allows you to a voluntary deposit to it, that is using essentially the same mechanism as the Skyls lockbox. There's a difference in interpretation of how you consider those funds and what they're for. But in terms of technical mechanism, it's very similar. 

[00:51:57.22] - **Kris**

I think in terms of implementation complexity, the big question in design space to me is, UTXO per block model versus pool of funds or multiple pools of funds model, but that are represented more directly in the protocol.

[00:52:29.07] 

And each of them, there are some approaches that are simpler with UTXOs and some approaches that are more complex with UTXOs. There are some approaches that are simpler with a in-protocol reserve. There are other approaches that are more complex within protocol reserve. But that's an important design space decision to be made.

[00:53:00.27] 

Because I guess what I'm saying is whatever decision you make there will necessarily constrain your solution space in terms of other parts of the proposal. So for example, there might be limitations on multisigs or practical limitations for executing the signature process if you go with a UTXO model.

[00:53:25.49] - **Daira Emma**

Yes. So there are three categories of arguments for the lockbox-style model. Efficiency, Security, and Deferring Decisions that we don't know how to make it for the time being. Efficiency, Kris basically went through that before, but we have some figures here for the actual number of outputs that I needed. Basically, it's a lot.

[00:54:24.22] - **Str4d**

It's a lot of outputs. The actual fee cost is not too great, but it's really just the cost of the number of outputs and the amount of computational power and block time to be able to coalesce.

[00:54:39.30] - **Daira Emma**

To me, one of the most important issue is security. If you literally have these multisig keys, then they have the potential to be compromised. Whereas if you even during the time when you're not paying out the recipients, they can potentially be compromised. Whereas if you just account for the amount of funds in each part, then there are no keys associated with it yet and so it reduces that vulnerability.

[00:55:35.37] - **Dodger**

To my mind, the lockbox idea is not to issue or to send the funds to a multisig address. It's to lock them up in a way that they can only be then accessed through a network upgrade, which would require. So I would suggest discounting that multisig approach for the lockbox.

[00:56:03.36] - **Str4d**

Well, it's not necessarily that you wouldn't have multisig on the lockbox. It's that that's one design space for how to get funds out of the lockbox. Further down, we sketch out what the design space can look like. Because Skylar's proposal was essentially one design point in the design space. We've got some notes here about a few different ways that this could actually work. 

[00:56:48.49] - **Dodger**

Yeah. So one thing I want to caution against is allowing technical possibilities to drive the intent.

[00:57:02.14]

I think the intent should be what drives the technical solution and if there are constraints on the technical solution, including practical constraints like the number of UTXO's, just as an example, then that's just something you have to deal with. But I think the intent should be elucidated first. Certainly, my understanding, I could be wrong, and I'm sure Skylar, if I am wrong, Skylar will correct me. But my understanding of Skylar's intent is that the problems are locked up in a way that they can only be accessed through a network upgrade.

[00:57:50.24] - **Str4d**

Sure, but that's not what we're showing here. Skylar's proposal is one, as I said, Skylar's proposal is one specific data point, and we're not saying anything about against Skylar's option. The point was that there are several alternatives in addition to the specific data point that Skylar made.

[00:58:12.08] - **Kris**

I believe that what Skylar had said was that the distribution mechanism would be produced in a future network upgrade, but didn't specify what that distribution mechanism would be. So a future network upgrade would add the ability to distribute that, but whether that's to add a number of multi-sig keys to the protocol or add some other chain-weighted voting or who knows what as a distribution mechanism. I think that that decision is the one that he is suggesting be deferred. Yes. Another So to look at the diagram and show what it actually shows rather than what you were saying, Skyla's point on this document is essentially the bottom right in this table, which is defer the decision on how to do the allocation and stick everything into a single bucket, which is the bottom right in this graph.

[00:59:27.14] - **Str4d**

But the principle of moving away from per output, which is the left-hand column, to more bucket-based ones, even if we don't defer it, is still useful. If we do defer it, we still have to decide how to allocate it later, which essentially moves us up into the top two rows or to some other approach that we haven't thought of yet.

[00:59:52.22] 

The three important ones I want to note here is that the current Funding Stream approach is essentially the top two on the left there. It's not quite a direct analogy, but it's essentially those two because they hybridize together because of the way that outputs are essentially serving the dual purpose of storing the dev fund and enabling it to be spent.

[01:00:17.23] 

Then the two other points are that, not we can't implement defer to future network upgrade if we send to individual outputs because the moment you send to an individual output, it's immediately spendable. That can be spent. Yeah. The bottom left is not implementable.

[01:00:31.35]

Then the other one we noted is that the top right is likely too complex to be implementable for some reasons that we outlined elsewhere in this document. But essentially, what it comes down to is having a single reserve where at any time an individual can withdraw, but that withdrawal is defined by predetermined, like one address gets a certain ratio, another address gets a certain another ratio.

[01:00:59.56]

That would then mean that the consensus rules would need to be keeping track of not only a single reserve, but also how much of that reserve belongs to each address and how much of that percentage of belonging to each address had been withdrawn by that particular address. It becomes a somewhat fractal-

[01:01:18.39] - **Kris**

It essentially becomes the per-recipient reserve at that point.

[01:01:21.05] - **Daira Emma**

Yeah, exactly.

[01:01:22.52] - **Str4d**

It would make more sense in that sense to do a per-recipient reserve, which is essentially, think of it as you to redefine how much each individual recipient is going to get and put them into those buckets ahead of time, but then how they withdraw from that is what you can decide.

[01:01:38.54] - **Daira Emma**

It's actually either this box or this box.

[01:01:42.04] - **Str4d**

Or in deferred to future upgrade, if we wanted to constrain how it was done to some future fancier way, you could still choose to pre-allocate in the consensus rules who gets what. There is that as an option as well. But the data point of the existing addresses or multisig, whatever hard coded into the consensus rules, merging with a single reserve is likely to just be intractable.

[01:02:08.06] - **Daira Emma**

Overall, what I want to say is that this document isn't trying to recommend a single approach. What it's doing is exploring the design space and saying what is feasible and what isn't.

[01:02:21.34] - **Str4d**

It would be great for people who are advocating for particular proposals.

[01:02:58.02] 

Yeah, that's the one you want to share. And it would be great for people to have a look through this and just use that as an extra piece to inform the proposals and the zips that they want to write if they want to explore this space.

[01:03:14.32] - **Daira Emma**

I will post this to the forum on the dev fund thread after this meeting with the context that I've just explained.

[01:03:31.12] - **Str4d**

Obviously, if people disagree with our thoughts on this, then absolutely comment on it. But this is just our thoughts on essentially how practical both the Skylar's approach is, but also how practical other points in similar areas could be and things to consider about doing.

[01:03:53.43] - **Dodger**

But also the benefits of having some form of protocol reserve versus UTXO-based. Because I think we all know, or those of us who've had any hands-on experience with it, know just how much of a huge and massive pain in the ass the UTXO-based dev fund has been.

[01:04:49.28] - **Daira Emma**

I apologize as a protocol designer to everyone who had to deal with that.

[01:04:59.25] - **Kris**

There was We had a complexity budget in the early design of Zcash, and it was already maxed out.

[01:05:06.49] - **Daira Emma**

It was more than maxed out, to be honest. We were lucky.

[01:05:12.22] - **Dodger**

I mean, you Continuing with the current model is easy because we already have the infrastructure to handle it. Moving to a protocol reserve based model would be significantly better. Whether you're continuing with funding streams going to multiple recipients or whether you're going with the lockbox approach. I don't think anybody would disagree that getting rid of the UTXO-based streams would be great, would be objectively good. But again, is it within time frames?

[01:06:04.48] - **Daira Emma**

In the interest of objectivity, I should also point out that it might be reasonable for someone to object to deferring this to a future NU because it's essentially creating an expectation that something will be done with these funds. And so it's not neutral in the sense that it's different to saying that the funds are allocated to miners. 

[01:06:48.50] - **Dodger**

But it's a conscious choice to not send the funds to the miners. So the options, in a hypothetical high level, the options are, allow all the funds to go to the miners, ie. just do nothing and let the fund expire. Do something that sends funds to recipients, whether that's a funding stream style thing or something like this. But then you have to decide the recipients. You have to decide all those things, which we will have proposals for.

[01:07:25.40] 

Or you say, well, none of this is ideal. This is not a step forward. This is just perpetuating the current system and surely we can do better, but we don't have enough time. So let's just put the funds aside, put them into a vault, where they can only be unlocked in the event of the community reaching consensus. So I think it's okay, using that objective perspective, the community will have a choice to send all the funds to the miners or to say, No, we'd actually like to set these funds aside in the expectation and in full open expectation and knowledge that there's an expectation that they will be somehow allocated for some purpose at some point in the future, but without having necessarily to decide that.

[01:08:27.44] - **Daira Emma**

It's also possible to some constraints on to partially bind what those funds can be used for without specifying all of the details.

[01:08:41.51] - **Dodger**

I would say, I would argue, no, you can't.

[01:08:45.44] - **Kris**

I think because unless it's ratified in the protocol, then you can't really say anything about what a future network upgrade will do, right?

[01:08:59.53] - **Daira Emma**

Yeah, you can only do it on an advisory basis. But I mean, that's what process Zips already do. So ZIP-1014, for example, specifies things that you can't enforce in the protocol and that could be changed by a future upgrade, but doing so is very controversial.

[01:09:27.50] - **Dodger**

Or by an amendment to ZIP-1014, which has happened.


___

### 6 Open Discussion ii) Dev Fund Proposals / ZIP proposers guidance


[01:09:31.36] - **Str4d**

Just briefly with my zcashd maintainer hat on, just briefly looking at this graph and just to look at what I think ease of implementation is. Obviously, top left is easiest because it's just changes the set of address that we have and we're done.

[01:09:52.17] 

Then I think the next simplest is probably single reserve defer to future NU because that's That's essentially a combination of tracking we're already doing for per pool output at fundamental level and what the ZSF tracking proposes. It's just another thing that the nodes track.

[01:10:13.30]

Then after that, probably the next simplest would be per recipient reserve, withdraw to specific address, because that means we don't have to worry about how the authorized spend to any address is handled in consensus. We're just using payment protocols that are already there.

[01:10:30.26]

Well, you could say that the bottom right and bottom middle are roughly as much complexity, although the bottom right is definitely simpler. But I think the middle row is likely the most complex, and therefore, we'd need a pretty strong specification in that regard, very clear specification in terms of implementability for that to be something that is-

[01:11:04.23] - **Daira Emma**

Yeah, because the current protocol already has a mechanism for authorizing spends based on the address so this is saying we have some other authorisation method.

[01:11:21.55] - **Str4d**

But if you squinted it, the middle row is analogous to the way that a new issuance mechanism is being defined for ZSAs, which is arbitrary outside the current protocol thing, key material that can authorize issuance rather than spend, but issuance from some pool of assets, in the case of ZSAs, unissued, in the case of this, issued to a specified recipient address.

[01:11:59.55] - **Kris**

It's a good point.

[01:12:02.16] - **Str4d**

And that is being worked on with the timeline of NU7. So that's another thing to take into account for ZIP design.

[01:12:11.48] - **Dodger**

But certainly, as far as I'm aware, the only two proposals that I have seen, and like I said, maybe there's stuff that I just haven't seen. I don't keep up with all the forms, are - Three proposals, let the dev on the expire, top left and bottom right. Let's go through some hands. Daira, do you still have something you want to say?

[01:12:44.20] - **Daira Emma**

No, I can talk about anything else on the forum when I have this.

[01:12:53.54] - **Alfredo**

Yeah, so I was wondering something you said, Dodger, which is when Well, do nothing for the dev fund to expire. In the case of Zebra, if I remember correctly, we need to make change for that to happen because right now, I think what will happen in the halving, if we do nothing, is that the same addresses will still receive block rewards, but half of them.

[01:13:24.01] - **Daira Emma**

Oh, that's not good. That's not correct.

[01:13:32.41] - **Alfredo**

I'm not sure what the ZIP says.

[01:13:38.23] - **Daira Emma**

The ZIP says that the funding streams end.

[01:13:41.13] - **Dodger**

Yeah. It's not correct for the Zip, But it might be what's been implemented. I'd be really surprised if that's the case.

[01:13:50.35] - **Alfredo**

I don't think we have any limit for that. We don't have the code, I mean.

[01:13:55.52] - **Dodger**

Okay, Alfredo, can you open an issue for that right now?

[01:13:59.13] - **Str4d**

To investigate Because that would be a consensus divergence between Zebrad and Zcashd. Zcashd is still the majority on the network at the moment, I believe, but that is definitely something that Zebrad - I'm going to go and look at the Zebra source code right now.

[01:14:16.18] - **Dodger**

I'm really surprised that that wouldn't get from by the audits.

[01:14:22.11] - **Alfredo**

I'm not totally sure, I'm not in that code since the last-

[01:14:28.21] - **Str4d**

It's always good to check.

[01:14:30.30] - **Dodger**

Let's solve that then until we know for sure, because that feels like a massive rabbit hole that we could spend three hours going on about. But let's check that. Please open an issue that can only be closed when that is confirmed. 

[01:15:06.01] - **Str4d**

I know consensus protocols are really enthralling.

[01:15:17.26] - **Dodger**

Let's find out for certain. And if it is it is genuinely the case, we will fix that. Now before we make any future changes.

[01:15:39.49] - **Daira Emma**

I've got the code already.

[01:15:42.38] - **Dodger**

Any other questions? Are any other points relating to this? I think we are.

[01:15:54.40] 

Close to time, yes. We got 10 minutes left. I want to say a couple of things, harking back to stuff that we said earlier, Kris. I don't think it's that difficult. If time constraints mean that what the community chooses to do cannot be implemented in time for the happening, then obviously the dev fund will expire, miners we get all the rewards. But I don't think it's more difficult than to implement something else. It's really about what the community wants to do. I'm sure people will complain. We're always going to have people to complain. But it's about consensus.

[01:16:51.06] - **Daira Emma**

I found it and it's fine. You implemented it correctly. 

[01:17:00.32] - **Alfredo**

Cool. thank you for that.

[01:17:03.17] - **Daira Emma**

I will post the URL here.

[01:17:11.16] - **Dodger**

Is there something else I wanted to say? Oh, yeah. I think it's really important to have clear separation and air gap between political considerations and technical considerations, because what we don't want ever to have is a situation where there is even a suspicion that a political perspective or stance or viewpoint or an organization's stance on something like this is causing or influencing technical decisions.

[01:18:00.36] - **Daira Emma**

Yeah, this is why I try to make it very clear what kind of point I'm making in any particular case and also why I step down as a ZIP editor, because there was actually a conflict of interest.

[01:18:20.43] - **Dodger**

For the record, I don't think that it's a conflict. I think, well, there may be a conflict, but it's perfectly managed.

[01:18:29.53] - **Daira Emma**

There wasn't a conflict with me being an engineer and also ZIP editor, but I think there was with me being ECC's engineering manager and also ZIP editor. It was too much power.

[01:18:43.45] - **Str4d**

And in any case, I'm happy for Daira Emma to decide that from the-

[01:18:50.42] - **Daira Emma**

Also, I was getting overworked, so I needed to share some load.

[01:18:57.02] - **Dodger**

Certainly, for the record, my approach with this is I have my own personal opinions, the Zcash Foundation has a stance, and then there's what's technically feasible and as we previously made clear, we will implement within practical constraints whatever the community decides. We won't seek to use our position to constrain or prevent anything that the community decides, as long as it is implementable. Obviously, if they ask for something that's impossible to implement within a certain time frame, or if it's something that the ZIP editors go, No, this is a bad idea for these security or efficiency or whatever reasons.

[01:20:01.07] - **Str4d**

Something that would be good to know from those who are making proposals around this or other zips is what they feel they need in terms of being able to get to the point of having a fully fleshed out ZIP. If, for example, obviously as ZIP editors, we'll figure out what we think is a reasonable deadline next week when we will discuss that. But if we were, for example, looking at the proposal Kris made of mid-July, which is essentially just over a month from now, what kind of support do we have the time to provide, but also do people writing zips need in terms of being able to craft those zips appropriately to meet the necessary specification requirements to reach a proposed state.

[01:21:21.55] 

Maybe something near the end of in a couple of weeks time, for instance, maybe having a meetup in Discord or something from people who want to ask questions or whatever or get some office hour things, maybe that would be useful. If you are wanting to do something like that and you have thoughts on what would be helpful for you as a person trying to write one of these zips, what would be helpful for you for doing that, then either mention it on forum or mention it in the Zcash R&D Discord in the #zips channel.

[01:22:05.08] 

We can try and see if we can figure something out in terms of just making it a bit easier to get through that point. Because obviously, for more complex and technical ZIP's, we do that kind of work and give that guidance during the Zip review process. But for these kinds of ZIP's, and particularly on the timelines that are needed to get those ones through, that's going to be potentially impractical. So something more collective or more direct might end up being a bit easier.

[01:22:40.20] - **Dodger**

I think also, anybody who is intending or proposing or planning to perform the ZIP should be attending the Arborist calls. 

[01:22:51.09] - **Str4d**

Or reading the notes on them. We're very lucky to have people who summarize and make the notes available.

[01:22:59.56] - **Daira Emma**

I was going to say that the 1,000-series Zip, the alternatives that the one was chosen was Zip 1014. The Zip editors provided quite a lot of help to the proposers because it was appropriate that the proposers didn't need to have the same technical knowledge on how to write a ZIP as you would for a protocol feature.

[01:23:37.37] - **Dodger**

Yeah.

[01:23:38.39] - **Str4d**

But as noted in the graph we looked at before, certain kinds of ZIP's don't really necessarily require much protocol things because they leverage existing protocol properties, while others that people might be wanting to write may require more technical chops on the part of the ZIP author. Because while we as ZIP editors can provide guidance on what is doable and how to structure the ZIP to be clear and whatnot, we can't really provide a whole heap of doing the protocol design for you.

[01:24:17.01] - **Kris**

On that topic, though, Daira and I are not ZIP editors. However, I certainly would be happy to provide pre-ZIP editor feedback with respect to proposals from a technical and specification perspective, because anyone can do that. Anyone can pair with someone who is trying to propose something and say, Okay, well, here are the things that you need to... Here are the conditions that you need to satisfy, and here are the things you need to think about. 

[01:25:00.23] - **Daira Emma**

I have limited time, but for the right proposal, I could be interested in helping, yes.

[01:25:09.57] - **Dodger**

Our next Arborist call will be in two weeks in the earlier time slot. So thank you for attending today, and I look forward to seeing you all then.


____


### Attendees

+ Daniel (decentralistdan)

+ Andrew Arnott

+ Daira Emma

+ Jack Grigg

+ Kris Nuttycombe

+ Alfredo Garcia

+ Arya Solhi

+ Conrado Gouvea

+ Marek Bielik

+ VitoZK

+ Michael Harms


**Next Meeting Scheduled: 21:00 UTC June 27th 2024**


___
___
