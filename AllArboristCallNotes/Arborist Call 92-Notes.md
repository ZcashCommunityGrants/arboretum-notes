# Arborist Call #92 Notes

Meeting Date/Time: December 12th 2024, 15:00 UTC

Meeting Duration: 2 hours  


**Agenda**: 

+ Welcome and Meeting Intro

+ [NU6]()

+ [ECC Update]()

+ [Zebra Update]()

+ [ECC & ZF zcashd deprecation]()

+ Research & Implementation Updates - [FROST update]() / [Crosslink Update]() / [NSM Shielded Labs update]() / [NSM Discussion]() / [ZSA update]()

+ Open Annoucements - [Zcash Dev Summit / ZK Proof & RWC Events]() / [zec sqlite wallet]()

+ Open Discussion - [NU7 ZIPs]


### Decisions and Action items

i) Helios poll initial draft to the forum for the community to provide feedback? - Dodger



___

Video of the meeting: [recording](https://www.youtube.com/watch?v=9x9KSYvmvGc&feature=youtu.be)

Moderator: Pili GUerra

Notes: Jason Rogers


___

## Full Notes



### 1. NU6



___


### 2. ECC Update - PCZTs 

[00:00:02.38] - **Daira Emma**

No updates on zcashd. It's nice that we are not spending any time on zcashd. That's absolutely great. For Zashi and the Wallet SDKs, we are heads down doing lots of work for the Keystone integration. That is the highest priority, overriding everything else.

[00:01:00.07] 

We're wanting, if we can, to get that released by Christmas, and we're not sure yet whether that will happen. It depends to a large extent on the Keystone firmware changes, and whether there are any bugs on their side. We know there are bugs on their side, so it's just how long it's going to take to get that fixed. We are able to test our code because there's a simulator, To simulate the communication between the simulated Keystone and the wallet app. We're intending to have a debugging feature where you can just export the data as a file, and that will make it a lot easier test.

[00:02:01.29] 

Kris and Str4d, have I missed anything?

[00:02:07.11] - **Str4d**

So the main relevant piece here tying into this is that the v1 PCZT format is done. There'll be an upcoming, the first release of the PCZT crate that supports that. I have not tested it with the v4 transactions. It might work. The implementation that we have can't do v4 signatures because that wasn't necessary on the timeline. Essentially, if you want to build v5 transactions as a piece of PCZT, you will be able to do so.

[00:02:49.53] 

That will, in particular, only support the v5 tx format, and it, at the I believe, also only supports the implementation, only supports P2PKH spends for the roles that I currently find. If you wanted to find your other roles yourself, other than that, you're welcome to. The format, obviously, It enables it because we've built in the same functionality as PSBTs have from BIP 174 for transparent signing.

[00:03:24.49]

The main other bits that it doesn't support is it doesn't have any fields for FROST because we didn't have time to pin down what those would be, and it doesn't have any speculative support for ZSAs. It is entirely because we don't know what the v6 transaction format is fully going to look like yet, that's still to be written up.

[00:03:45.47] 

What we are instead planning is that the v1 PCZT format can be used and essentially tested in production. We can confirm it's satisfying the main use cases because will work. Then people can experiment with what other things they are unable to do with that beyond simply it doesn't support the ZSA pieces. Then in parallel with defining the v6 transaction format, we will be able to define a v2 PCZT format that has support for ZSAs and therefore being able to do incremental construction of shielded assets in addition to ZEC transactions.

[00:04:34.57]

That would also be the ideal time to bring in FROST support as well. Because at this point, we have the implementation of everything, so it would be good to augment it with FROST in testing capacity to figure out mainly the interaction patterns and what's necessary to include and so on and so forth. But yeah, that's basically there. We have tooling related to that, but I think that's everything for this particular topic.

[00:05:10.42] - **Pacu**

I've been looking at the PCZT API. It looks really nice. Are you folks planning to expand the 'how to use it' documentation or do some Readme on how to quickly get a grasp on how to integrate PCZT?

[00:05:36.31] - **Str4d**

The intention of that is the PCZT create itself, which has a bunch of internal documentation, but I have rendered the Rust documentation for it, and it's currently not great. If I have time before the 0.1 cut of it, depending on, because that might be tomorrow, it might be Monday, we'll see when that happens. If I have time, I will try I can get something in, but it is my intention to put documentation in there, yes.

[00:06:03.43] 

That being said, the roles and things themselves are also relatively straightforward in terms of how the integrations work. They use the Type system to constrain how they get used. Also, the other thing I forgot to mention is that the way that we're integrating into Zashi is via the zcash client backend rate. If you're familiar with the Create Proposed Transactions API that's currently there, there are two new APIs that essentially are either half of that.

[00:06:38.47]

One, Create PCZT from proposal, and the other one, extract and store transaction from PCZT. That's the interface if you're using that back-end, swap in from your current monolithic function that does proofs and signatures and everything internally, taking a USK to instead take the proposal, generate the PCZT, then you use the proving and signing roles that are in the PCZT crate, and then you pass the PCZT's back into that second method.

[00:07:13.43] 

That's the expected way that most people interact with this. Actually, probably most people will be interacting via the mobile SDKs because that's being exposed by that aspect as well. But for anyone who's wanted to build their own offline signers or stuff like that, you'd be dealing with the either the PCZT crate or just implementing the format yourself.

[00:07:37.52] - **Pacu**

Nice. All the versions, you need to be in the latest versions of all the crates to use PCZTs, right?

[00:07:45.25] - **Str4d**

If you want to do anything that involves the protocol-specific types, then yes. However, I explicitly built the PCZT crate so that by default, it has no dependency on any of the rest of the Rust crates. So if you are just using it for parsing the format, combining, doing anything that doesn't require understanding a particular protocol, like just introspecting the raw data, you can just use the PCZT crate directly and it doesn't matter what version of the regular zcash Rust dependencies are on. The only hard dependencies of the crate are postcard because that's what we use for the v1 encoding and Serde to get to that encoding. Everything else is optional.

[00:08:38.37] - **Daira Emma**

But obviously, if you need to sign, then that requires more dependencies.

[00:08:42.56] - **Str4d**

Yeah, but it would in theory be possible for you to do the parsing there and then essentially backport to an earlier version. If you really wanted to, you could do that. It would not be fun, but you could do that. If you can get to the latest crates, then you get to use all the stuff that we wrote to do that parsing and signing and things. Awesome.

[00:09:12.32] - **Daira Emma**

I was just going to suggest that you mentioned v2 of PCZTs supporting v6 transactions. We might want to synchronize the versions so it's actually v6. Any given version of PCZT supports that version of transactions and potentially

[00:09:34.20] - **Str4d**

I don't think that's worth doing personally because if we weren't doing v6 transactions, we would do a v2 to add FROST.

[00:09:43.55] - **Daira Emma**

Yeah, I guess. Okay. We could have it be transaction version dot and then a subversion. Maybe it's not worth it. All right.

[00:09:56.58] - **Str4d**

We can discuss that offline.


___

### 3. Zebra Update - 2.0.0 NU6 bug / Zebra 2.1.0 

[00:10:14.32] - **Marek**

Yeah, so the main thing for today's update is the release of [2.1.0](https://github.com/ZcashFoundation/zebra). We upgraded the minimum protocol version so that Zebra now won't talk to outdated peers even during its initial sync. We added the getblockheader RPC, and we updated the getblock RPC using the getblockheader one.

[00:10:49.29]

We had one [bug](https://github.com/ZcashFoundation/zebra/issues/9064) in the transaction verifier that showed up during NU6 activation. Basically, we weren't properly checking the consensus branch ID field in v5 transactions and transactions with this field set to the consensus branch ID corresponding to NU5 would make it into Zebra's mempool even during NU6 was active. We noticed this bug and fixed it and Hanh noticed it as well. Thanks for that.

[00:11:34.53]

We have this check in the block verifier, though. But block verification happens, or rather, doesn't apply to mempool verification.

[00:11:51.49] - **Daira Emma**

So what's the practical consequence of this? Is there any denial of service issue that an adversary using these invalid transactions could cause?

[00:12:08.21] - **Marek**

Yeah, it could be a denial of service. If a mining pool basically was using zebra as a back-end, then this transaction would make it into a block template and if a the miner mined such a block, then zebra would refuse it, and that would be a DOS for the miner, basically.

[00:12:39.53] - **Daira Emma**

So does Zebra recheck the block? Or rather, when does Zebra recheck the block in that case? It attempts to mind the incorrect block. Is that right? So it doesn't run the block verifier on the block that it's creating.

[00:13:07.41] - **Marek**

Yeah. So we wanted to make sure that the getblocktemplate RPC behaves so that when a mining pool requests a a block template. Zebra applies the same checks as when it receives the block back as a proposal, and we currently don't do that.

[00:13:49.31] - **Daira Emma**

But you're already doing the block checks when you receive it back as a proposal, is that right?

[00:13:54.20] - **Marek**

Yes.

[00:13:55.23] - **Daira Emma**

Okay. So the denial of service is only on the mining pool. It's not on the rest of the network.

[00:14:02.51] - **Marek**

Yes, exactly. But even it's still bad for the mining pool because they would waste a lot of work. And then if all mining pools were using zebra, that would be a problem for the whole network then.

[00:14:24.22] - **Daira Emma**

Yeah, because Yeah, because the other three would have an advantage in rollback attacks because the rest of the network hashrate or some large proportion of the network hash rate would be useless.

[00:14:42.37] - **Marek**

Yeah. So to get rid of this, we want to make sure that Zebra won't create blocks that would contain data that would be later refused after filling the solution for the block. The way we want to do this is to apply the same checks. Then if there's anything wrong, we would just exclude the transaction, the problematic one, log an error, and then try the same process again.

[00:15:27.23] - **Daira Emma**

So the fix for the immediate consensus branch ID issue that's going to be in the version of Zebra, so currently pending release, is that right?

[00:15:42.02] - **Marek**

Yeah, it's in 2.1.0.

[00:15:47.41] - **Daira Emma**

But the additional check on block template is going to be in the next release. Is that right?

[00:15:57.17] - **Marek**

I don't know if it's going to be in the next release, but it will be in a release, but I don't know if we make it into the next one.

[00:16:15.12] - **Daira Emma**

I'd encourage you to prioritize it because the proportion of mining power that gets backed by zebra is going to be increasing as people prepare for zcashd deprecation so this is going to become a more significant problem.

[00:16:37.38] - **Marek**

So Zebra 2.1.0 has the fix for the consensus branch ID, and a transaction that doesn't use the right one will be refused right away. Another bug that we fixed was in the sendrawtransaction that hanh also reported. The issue there was that Zebra would return a TXID even if the submitted transaction was refused.

[00:17:17.36] 

That wasn't actually an issue with submitting transactions, just returning a txid, where it should have been returned. Another thing that made it into the release is verification of transactions that spend mempool UTXOs, and this adds support for text transactions. And that's all for the release. That's all for me.

___

### 4. Zcashd Deprecation 


[00:18:44.43] - **Str4d**

So we have the general framework for the app is over in the zcash/wallet repository. The next thing we will be working on after the PCZT related stuff gets in is building up the framework for the binary that runs around the zcash client back-end-based interface. Actually, my plan is also to ensure that the architecture for how sends are done directly leverages PCZTs because that will give us instant hardware wallet support in there as well, which would be nice, or HSM support for for backends.

[00:19:31.52] 

So not too much update on the actual binary itself now, but that's going to be the next thing that we have updates on.

[00:19:45.52] - **Pili**

On the Zebra side, we've mostly been building out the RPC methods that we need to support, that we don't currently expose that we know that people need. We had a very productive call last week where we finished going through all the RPC methods that we think we might need to implement.

[00:20:10.58] 

So I think we have quite a clear picture now of what existing users of zcashd need and where those are going to be supported. So for us, it's just a matter of going through the list and implementing, exposing those in RPC, but they're already... Most of the function is implemented. We just need to expose it.

[00:20:31.22] - **Jon**

Pili, how optimistic are you on a scale from 1 - 100% ?

[00:20:39.21] - **Pili**

I'm not going to answer it directly. I'm just going to say that my main source of concern is about the unknowns, the partners that need things that they've not told us about. So it's all those people that we know currently using zcashd that we're trying to reach out to.

[00:21:00.58] 

Because implementing the RPC methods is straightforward, right? We just need to expose the functionality. But the actual integration, the getting people to actually tell us and then switch over, that's what I'm least confident on. 

[00:21:19.16] - **Jon**

Did the message get through that we are collecting uses? So there's a big message out there. What's the flag? How do I recognize myself as concerned by this work?

[00:21:33.46] - **Pili**

We reach out to people, are they not interested? Do they not trust that I am or we are who we say we are? Because quite frankly, if someone reached out to me cold like that, it'd be like, well, what are they trying to sell to me? What are they trying to get from me? It's a hard ask, but Pacu is doing a great job on the outreach front, just being really relentless there. I pitch in where I can and just try to make sure that I process the results and update them. I just still need to.

[00:22:11.46] - **Jon**

Let's use the FOMO method. That's how crypto works, right? Yeah. Everybody out there, if you're listening, we're all looking for uses for the RPCs. Move yourself and get yourself known. Because it's happening now.

[00:22:33.04] - **Str4d**

The real FOMO here is, let us know what your use cases are or the methods you need will be going away. 

[00:22:42.43] - **Pacu**

We're coming up with a new, less, I don't know, more urgent, less friendly messaging for the outreach because has passed and it's like FOMO. And we're also mentioning the fact that some methods will go away, and that even though they use them and they say they use them, they might go away because they're just deprecated and we are not guarantee 1:1 implementation and things that will, I don't know, put a sense of urgency and that things will break if you don't take action.

[00:23:41.25] - **Str4d**

We'll have that end of the carrot versus stick approach, the stick there is going to come more into force early next year because the next zcashd release, one of the things, probably the main thing it's going to include, is setting is marking all the RPC methods that we're not intending to migrate over as deprecated.

[00:24:05.37] 

Now, in that first release, it won't have any effect on anyone who's not paying attention, but anyone who is paying attention will be able to proactively deprecate those and test where in their stack it breaks. The release after that will turn those from default enabled to default disabled. That's the point at which everyone who isn't paying attention is going to be very aware that stuff is happening.

[00:24:29.49] 

That release will still let them reenable those methods, so they won't be prevented from still running their business, but they will have to take a step there if they haven't so far. The latest at which someone who's not paying attention is going to notice from that perspective is after the next release of zcashd reaches its EOS vault, and people upgrade to the one after that that has a default disabled.

[00:25:01.25]

Unless you're someone who has been building your own zcashd node and changing the EOS halt, in which case you're choosing to be your own support, in which case you need to be paying attention.

[00:25:14.14] - **Daira Emma**

I have a suggestion which is to default-disable some methods where we want to know whether people are using them. That way we will get feedback on whether people are using them because they'll have to reenable them and they will complain.

[00:25:33.17] - **Str4d**

That is true. And there's nothing that prevents us from deprecating something and then undeprecating it. So we could choose to just be more liberal in what we deprecate and only leave undeprecated the things that we know we will be supporting exactly as they currently are.

[00:25:52.23] - **Pacu**

I think that's a good idea.

[00:25:53.34] - **Str4d**

We can still take the approach of anything that's being anything that is even having its interpretation changed in some way, we deprecate in order to force people to be aware of that fact.

[00:26:04.02] - **Daira Emma**

That will only work if we default deprecate them, I think.

[00:26:09.02] - **Str4d**

Yes. So that would be in the not this coming release, but the next one.

[00:26:13.43] - **Daira Emma**

I was suggesting this coming release because it's not that much work for them to reenable them.

[00:26:24.40] - **Jon**

Yeah, it sounds aggressive, though.

[00:26:28.53] - **Pacu**

To be honest, Yeah. I don't think we have much choice because what Pili pointed out, if you're receiving these emails, it's easy to disregard them or just group them with probably tons of emails that are like fake airdrops and whatever, because you can't verify the emails or make sure that the people asking the information is is really who they say they are or they can't know what we're going to do with it or they have to trust that with that information if it's not fully public on their side.

[00:27:14.28] 

So the email outreach has this practical limitation that maybe if you're totally not trusting anybody, which is what you should do in crypto, you may disregard it.

[00:27:28.11] - **Daira Emma**

Or it may not get to the It's a lot of people.

[00:27:30.50] 

I'm just thinking about the timeline because we don't have very many zcashd releases left. We need that information on what methods people are using and what they will complain about. We need that relatively quickly.

[00:27:54.34] - **Str4d**

The current act of zcashd release, 6.0.0, reaches EOS January 22nd. If we stuck out a release that just deprecated everything, your node just stops working. That's a bit extreme.

[00:28:15.29] - **Daira Emma**

I wasn't suggesting that, but I like the idea.

[00:28:19.04] - **Str4d**

Put it this way, I'm wary of doing that this year because I don't want people to be in a situation where they upgrade. Oh, there's a new release. They upgrade right before Christmas and before holidays. 

[00:28:30.46] - **Daira Emma**

I was thinking after Christmas. I'm doing it before Christmas is a disaster because they won't be able to do anything other than reenabling them. They'll automatically do that.

[00:28:43.31] - **Str4d**

But if we put out a release just after Christmas, that gives people three weeks of overlap, If that was to be the deprecation point, that's a little tight for people to upgrade.

[00:29:00.23] - **Daira Emma**

I mean, if they have a problem, they can reenable those methods, but they're more likely to tell us about it. 

[00:29:16.09] - **Dodger**

Yeah, I was just going to suggest, and this is relating to something that came from DC, whether in January or whenever, change zcashd so that It automatically shuts down unless you've set a specific config flag. The config flag says, I'm aware that zcashd is going away equals =1 or something like that. And It's just really simple. It forces them it means that they don't have to recompile, don't have to do anything crazy. But as a first step, it just makes sure that people are aware.

[00:29:56.59] - **Daira Emma**

If you default disable a method that you think is really commonly used that effectively has the same.

[00:30:05.08] - **Str4d**

Yes, but actually this is a nice idea because we actually did the same thing with zcashd at the very beginning, where if you run zcashd and you've not created a config file, it won't start. You have to at a minimum create the empty config file to confirm that you're happy with the default settings.

[00:30:24.23]

This would be an equivalent thing. It would actually let us put a message there - It's another spot that we could reach to people. Actually, coupling that with default enabled, I'd be happy rolling that up with a short EOS Halt support window this year because Then we could just tell people in the message, "Hey, we've deprecated a bunch of these methods. Please go through, disable them in turn, check what fails, tell us if it fails, and also tell people we're going to be default disabling them for the next release." 

[00:31:06.01] - **Dodger**

Just to clarify, the idea there isn't to find out what methods people use. The idea is to make sure that people are aware of and are going to respond to the fact that zcashd is going away.

[00:31:24.52] - **Str4d**

Yeah. It enables us to serve both purposes there.

[00:31:28.24] - **Daira Emma**

Yeah, exactly. We can have the message say both that it's going away, and please tell us about the deprecated methods that you have to enable.

[00:31:38.20] - **Str4d**

Whereas just doing the deprecation doesn't enable us to show the context there.

[00:31:44.29] - **Pili**

I was going to say that Pacu is working on a Google form to collect this information.

[00:31:49.03] - **Str4d**

Yeah, so we could just include that link in there.

[00:32:11.44] - **Daira Emma**

str4d can you file a ticket about that for Zcash?

[00:32:14.12] - **Arlo**

i've been a bit unwell this week. I'm just catching up yesterday and today. We've been going through, there's been this regtest bug in Zebra, but it's now changed to where blocks are not being rejected but any transactions in blocks with Coinbase funds are being rejected. So I opened the [issue](https://github.com/ZcashFoundation/zebra/issues/9082) in Zebra yesterday regarding that.

[00:33:01.22] 

So I think it does look like a Zebra issue now. I was worried before it could be wallet, but it looks like it's Zebra is actually rejecting those transactions.

[00:33:17.52] - **Arya**

So have you guys checked that the consensus branch ID and the transactions are correct for the network upgrade that's active?

[00:33:30.14] - **Arlo**

I have not. No. I'll take a note of that and check with that.

[00:33:36.32] - **Daira Emma**

The other thing since you said it was, is it related to spending Coinbase?

[00:33:43.17] - **Arlo**

Yes.

[00:33:44.35] - **Daira Emma**

So there's a 100 block limitation that you have to have 100 confirmations in order to spend Coinbase. Are you taking that into account?

[00:33:56.35] - **Arlo**

Yeah, so we're generating over 100 blocks so that it should be spendable at that point.

[00:34:06.52] - **Daira Emma**

Okay. Presumably, Zebra implements that correctly because that's a consensus issue. I hope it is.

[00:34:16.25] - **Arya**

It does.

[00:34:18.00] - **Pili**

What about the issue that you're working on right now? Is this not related or is it to be able to spend before the 100 blocks in practice?

[00:34:28.58] - **Arya**

No. So the issue So what I'm working on is Coinbase inputs can be spent to transparent outputs instead of forcing them to be shielded. But I think that the test is doing that correctly. I think the issue is just the consensus branch IDs.

[00:34:45.22] - **Pili**

Okay. Well, we'll look at it offline. We'll prioritize that. Thanks for reporting. Thank you for creating the issue.

[00:34:53.43] - **Pacu**

i do have a small update that we are working with Blockchain Commons and Zingo on the wallet export format and that part of the graph. So they present a [grant](https://forum.zcashcommunity.com/t/blockchain-commons-working-with-zcash/48006) to ZCG that covers the new format for storing wallet information in an interoperable and interchangeable format and then the exporting from the old .Dat files to the new format, it will be, I don't know, a separate thing that other teams might do. We're working towards having someone do the new format thing.

[00:35:59.07] - **Daira Emma**

Yeah we had the meeting about that yesterday, I think. So in terms of zcashd deprecation, I think that grant will be focused more on what is the new thing that we should do rather than what is directly necessary for the deprecation, because we don't want the new format to be encumbered by things that doesn't need to be.

[00:36:30.02] 

There are basically two strategies for how you migrate. You can either sweep the old sources of funds and send them to a new wallet and then forget about the old ones, and that works in some cases. But in cases where you have addresses that have been exported and you don't know whether there are people are going to send new funds to those addresses, you have to have a way for the new wallet to know about those addresses, and they might not be in the ZIP 32 derivation tree. So that needs to be supported.

[00:37:18.11]

The other issue is that metadata about past transactions should be supported in the new format. And so there may be transactions that even if they couldn't be created by a new wallet, it's necessary to be able to represent them in their history.

___

### 5. Research & Implementation Updates i) FROST 


[00:38:07.31] - **Conrado**

So we're working on the FROST server. We basically finished up a couple of things that we needed for real-world usage of the server. We had the timeouts, we had JCPS support, and stuff like that. And also on the FROST client, which is a tool that integrates with the server. We had the We're working on the support for multiple sessions and removing contacts and groups. It's done the review we finished it.

[00:38:39.58]

There's probably a lot of small adjustments and cleanups that we might want to do, but the main part, I think, is done. Other than ongoing work on the DKG support for the server, we're working on that. So I think that's the last bit is missing. With that, we're planning to begin to do an audit of both the FROST server and the client code that they're interacting with it. So that's exciting.

[00:39:10.32]

Also, now that the PCZTs are going to be released soon, we might want to take a look and update our tool to support it. We have a tool that can sign FROST transactions, but only supports the wire wallet transaction plan. So we'll likely take a look at the PCZT and support that, too, which is also interesting. 

[00:39:40.19] - **Daira Emma**

So do we know what extensions, just roughly not going into the detail, might be necessary in PCZT to support for us?

[00:39:53.23] - **Conrado**

Yeah, I think I added a comment in the design PR about that. It's like, So that's not strictly needed. We can use FROST using regular PCZT's, but it might be interesting to include some fields. There are multiple ways to do it. I'm not sure what's the best one. FROST has this concept of a sign package, which is basically the message when to sign and the commitments. So we might include this inside the PCZT or do the other way around - Send the PCZT, include the sign package inside the PCZT.

[00:40:34.54]

So basically, maybe we need a sign package field if you want to do this way around. We might want to, when you do FROST signing, the participants generates the signing share. The signing share might be returned as a PCZT. I'm not sure if that's needed because the signing share is like 32 bytes and using a whole PCZT to transport that thing is overkill, but that might be useful for some contexts.

[00:41:15.01]

So I think the only fields I can think about are the signing package, which will be actually the signing commitments. When you're sending a transaction for someone to sign, and in the return of that process, the signing share. Yeah, you could use the proprietary key value section for that, but it might be useful to also standardize how this is done.

[00:41:51.26] - **Str4d**

Yeah, the intention is to eventually standardize something. Indeed, you could use the proprietary section to prototype things, but that's intentionally arbitrary and not something that people should assume they can know what something in there means.

___

### 5. Research & Implementation Updates ii) Crosslink update

[00:42:30.41] - **Nate**

Nate here. I just posted an [update](https://forum.zcashcommunity.com/t/shielded-labs-crosslink-deployment-status-update/49706) to the forum. The recent update is that we've finished the first pass of defining the scoping, and then we've created a list of target engineering deliverables.

[00:42:58.29] 

The engineering deliverables include a full node with appropriate APIs, a tool to run a validator, which is likely to be bundled with the full node, and then a tool that can do stake delegations. It would have some wallet functionality, but it isn't something we would recommend to users. Instead, it would just be for developers to to verify the full end to end functionality works. Those are the three main components. And then the continuous integration is, I consider that, an explicit deliverable to define all the testing that happens and hopefully some of the deployment also.

[00:43:52.46]

Then we have other deliverables, including a suite of documentation. I would like feedback on that. And then a third thing is, as we were working on this document, it became clear that we're trending towards a strategy where in order to know how well we're on track to actually be useful to end users, we want to be engaging with different kinds of stakeholders that are representative, like wallet teams, exchanges, people who are interested in validating early on be getting their feedback as we go.

[00:44:33.21]

So down the road, we'll want to start formalizing those connections. Those are the main updates. We're also continuing to look for candidates to hire, so engineers. We would like to hire two or three engineers.

[00:44:55.48]

And I had one request If there's anyone familiar with Zebra's CI, it would be helpful for me to have a tour. It's much more sophisticated than I expected, which is just awesome to see. But I'm trying to figure out how Shielded labs can safely and sensibly run a subset of it on GitHub for our own prototyping work without getting in Zebra's way.

[00:45:25.21] - **Pili**

Yeah, I'll connect you with Gustavo. That's definitely cool.

[00:45:29.57] - **Daira Emma**

So on the specification of Crosslink 2, I have planned to get more of it done before I go on holiday, which is I'm going on Saturday. What I think I'll do is just mark the bits that are not finished yet and push that up immediately, probably today, just so that it's not languishing in my local repo.

[00:46:01.01] - **Nate**

Cool. We still need to build out our roadmap, but just while I'm here, my intention is to start prototyping, and then if we run into unanswered design gaps or unspecified things to basically improvise something that seems like it should work as we're building the prototype, but to document whenever we do that so that we end up with something that runs, but it might not be safe and we have a trail of how to follow up and make it more rigorous.

[00:46:40.07] - **Daira Emma**

Yeah. I mean, if there's anything that you want to ask me about Crosslink 2, specifically, although I'll be on holiday, I'm on signal. You can distract me. I just might not respond immediately.


____

### 5. Research & Implementation Updates iii) NSM Shielded Labs updates


[00:47:11.48] - **Jason Mcgee**
So the update since the last call is that we heard back from the Zip editors via Josh Swihart regarding a few different options for how to proceed. We've decided to develop ZIP 234, which is smoothing the issuance curve, and ZIP 235, which is burning 60% of transaction fees behind two separate feature flags. Our plan is to continue to gauge sentiment over the next couple of months for smoothing the issuance curve and everything around ZIP 234, and then demonstrate support by the testnet deadline of March first, 2025. Paul and Mariusz, who are on the call. Go ahead.

[00:47:53.35] - **Zooko**
And we did a poll of developers.

[00:47:56.40] - **Jason Mcgee**
Oh yeah, we've done some polling. We did a poll of coinholders that came back similar to the ZecHub, which was unanimous support for the NSM. These polls are experimental, and there were some issues that were reported, so obviously, they should be taken with a grain of salt, but there were still over, like around 250,000 ZEC that were voted with, which is significant.

[00:48:23.29] - **Jason Mcgee**
Then what Zooko said is we did a Helios poll with ecosystem engineers. There were about 34 people who the poll went out to, 53% responded, and the results were 12 saying yes to include the NSM in NU7, and five, no. So one person didn't vote, but submitted.

[00:48:49.08] - **Daira Emma**
So when you say the NSM there, what was the question? Was the question about all three zips?

[00:48:56.01] - **Jason Mcgee**
Yeah, the background information outlined all three zips, and then the question simply said, "Hey, take a look at this background information. Do you support including the NSM in NU7?" Then the possible answers were yes and no.

[00:49:22.02] - **Jason Mcgee**
The reason is because we see this as initial sentiment gathering, and it really gives us the opportunity to gauge general support for the project versus drilling down into specific options. But I think there are other ways that we can poll in the future.

[00:49:46.20] - **Daira Emma**
Yeah. I mean, if I've seen that in time, I wouldn't really know how to answer it because at the moment, I support 233 and 234, but not 235.

[00:50:03.41] - **Jason Mcgee**
Okay. So then I think that over the next weeks to months, we can poll on those specific questions as well.

[00:50:12.36] - **Jon**
Can you specify what's 234 and 235?

[00:50:16.15] - **Daira Emma**
Sorry. 233 is the basic mechanism with burning of the burn amount field in v6. 234 is issuance smoothing and reintroduction of funds via block subsidies. And 235 is requiring, as a consensus rule on Coinbase transactions, that 60% of fees are burned.

[00:50:45.13] - **Jason Mcgee**
The thing to remember with polling on separate questions is that the majority of the community isn't in the weeds on the engineering specifications, right?

[00:50:54.42] - **Daira Emma**
I understand. I thought that specific poll was going to engineers.

[00:51:01.26] - **Str4d**
It was, yeah. But yeah, it was high level. Fair enough.

[00:51:07.43] - **Conrado**
I posted a suggestion on the forums, it probably got lost in the middle of some of the messages. But I was thinking about the smoothing of the issuance curve. I think from what I understand, the main reason is that it's the simplest way to issue from the NSM.

[00:51:26.23] - **Conrado**
So thinking about it, I was wondering if it would be possible -  you could do the same thing, the way the smoothing out works is basically at each block, you issue a fraction of the total uninssued amount, and the specific fraction there, in the end, there is 50% in each four years. But I was thinking, could we just do the same thing, the exact same thing, issue a fraction of the total, but not the total uninssued amount, but the total amount of deposits into NSM.

[00:52:05.38] - **Conrado**
Don't bundle the uninsured amounts with the NSM. Just keep track of the NSM by itself and do the exact same thing.

[00:52:18.41] - **Daira Emma**
Does that end up being equivalent?

[00:52:21.21] - **Conrado**
No, because we keep the halvings. We don't lose the halvings. The regular issuance will be the same. Because my main worry with the smoothing out of the issues is, I don't know, it's unexpected, both technical difficulties or just people's expectations of how the Zcash is issued. People, this issue has always looked like this and completely changed. So that's my main worry. And this would, I think, fix this, but maybe I missing something.

[00:52:58.02] - **Jason Mcgee**
So I would like for Nate to opine on this because I believe that he did consider this when he originally brought up the NSM.

[00:53:08.21] - **Nate**
Yeah, I can't open on that on this spot. Let me think about a moment. So, I agree that that could keep the having And it might be less surprising to some users. One issue, though, is that it does cause there to be two different categories of unissued ZEC or two different balances.

[00:53:56.08] - **Nate**
One thing I'm wary about, which is one reason that I support that changing the name away from "fund", is that I didn't want people to see the balances as just a fund that's effectively discretionary or could be spent through governance or otherwise down the road, including maybe regulators or policy people or anything like that. So I guess I saw the single issuances simpler conceptually and less likely to have that confusion. But there are trade offs that I'm open to thinking about as a group, as a community.

[00:54:53.14] - **Jason Mcgee**
I think what I'll do next week is open up the discussion to ZIP 234, specifically, and we can broach that alternative at that point in time. 

[00:55:18.52] - **Daira Emma**
Oh, on the forum?

[00:55:20.20] - **Jason Mcgee**
Yeah, on the forum. Just to open it up for a community discussion on Zip 234, specifically, and any possible alternatives we should consider.

[00:55:31.44] - **Jon**
One thing about... So it's Zip 235,the burning part. We were trying to figure out if there were interactions with ZSA, and there's a whole thread on the forum, and then we actually took a deep dive with the engineering. If we do move forward with enabling that feature, it might make sense to actually do that as fast as possible, because if there's an interaction with ZSA, one of the possible interactions is that we use that feature also on the fees of ZSA.

[00:56:27.13] - **Daira Emma**
So the feature that is necessary in order to require that a certain amount of the issuance fee is burnt is 233, not 235. So 235 is requiring that 60% of fees overall are burnt. There is an interaction of that with the issuance fee burning, because do you include the burnt issuance prevent issuance fee is in that 60 % or is that separate?

[00:57:05.05] - **Daira Emma**
But in order to satisfy, so I believe Chris's motivation, which I agree with in this incentivised suppressing selfish mining attacks. In order to specify that, we only need two, three, three.

[00:57:24.58] - **Jon**
Got it. Okay. So my point here is that we We are following and interacting on the one that could be affecting the ZSA fees. There's work to do on ZSA. I don't know, maybe we're next, so we can talk about it. But there's work to do on ZSA fees, and there's a question of what's the order and what's more efficient. If this goes in, if we know that it's going in, then we might want to get it in really quickly so that we can develop the fee, knowing that's running.

[00:58:06.02] - **Daira Emma**
Yeah, you basically need to know whether 233 is getting in early soon. Right.

[00:58:12.47] - **Zooko**
But 235 might also help.

[00:58:17.16] - **Daira Emma**
In what sense?

[00:58:19.11] - **Zooko**
Even though it's not necessary, like you say, but ZSAs might want to use 235 or just learn from 235 and do a similar thing or a different thing based on 235. 

____

### 5. Research & Implementation Updates iv) NSM Discussion


[00:58:42.41] - **Paul Dann**

Yeah, I was just thinking, we were just on a call with the Qedit guys, and my understanding is that the concept of burning that's being introduced with 233 is new. Before that, anything that destroyed funds was considered a mistake. I think that's reflected in some of the ZSA consensus rules.

[00:59:10.58]

My understanding is that one of the effects of introducing 233 is that the idea of burning funds now becomes a possibility. I think that affects the way the consensus is working for orchard bundles, in ZSAs, if I'm not mistaken. So I think that's the main interaction with 233.

[00:59:37.14] - **Jon**

I got to which one is the burn one?

[00:59:40.34] - **Paul Dann**

That's 233. The first one is introducing burning.

[00:59:44.34] - **Jon**

Okay. So I was talking about 233 the whole time, the burn one.

[00:59:49.29] - **Daira Emma**

So I can answer the technical question here. In NU6 already, we now require that. So the block's balanced exactly. And in NU6, and this is part of one of the other zips, the explicit fee zip, we will require that the fees are specified in the fee field. And so at that point, there will be no implicit loss of of funds that don't balance within a transaction. Each individual transaction will exactly balance and blocks will exactly balance. So that's happening anyway independent of burning and independent of ZSAs.

[01:00:57.31] 

ZSAs are consistent with it in that they also follow the same principle. Everything is split up at balance. But I don't think there's any particularly difficult interaction there.

[01:01:12.29] - **Paul Dann**
My particular understanding The interesting thing was that there's a consensus rule specifying that tokens can be burned in orchard bundles, but not ZEC.

[01:01:28.52] - **Daira Emma**

Correct. Because the The burn amount field does the same thing for ZEC. So it's just a matter of specifying only one way to do things. If 233 gets in, ZEC is burnt using the burn amount field. Regardless, if ZSAs get in, then non-native assets, I think that's what they're called, the non-ZEC assets can be burnt for a burn bundle.

[01:02:02.27] - **Paul Dann**

Okay, that makes sense. But I guess that was for me the question, is that an explicit choice? And does that still make sense with 233 coming in or should we allow it as an option of, well, you can burn things in different ways since the concept is now valid. Would it be convenient to make it possible to burn in multiple different ways?

[01:02:28.29] - **Daira Emma**

I mean, it's just a a different representation of the same thing. You could not have the burn amount field and then relax the rule on not burning ZEC with a burn bundle. I I think...

[01:02:45.31] - **Paul Dann**

But then you'd need to transfer any transparent funds.

[01:02:49.44] - **Daira Emma**

No, I'm not arguing for that because we're past the deadline to be bike shedding about this, to be honest. And what's currently specified in the Zips works perfectly well. So I'm not in favor of making that change, but I don't see any reason to make it.

[01:03:09.41] - **Jon**

So we're going to be working hard on making sure that the fees in ZSA are working with an eye on all the flags that are turned on for a NU7 and testing all the variations. So And like you said, Paul, we have to interact with your team and all the different teams to make sure that this works with all the features that are planned for a NU7. 

[01:04:05.13] - **Jason Mcgee**

Yeah. So it sounds like it has not yet been decided whether 233 is going into NU7. I thought that it had. Is that the case? And if not, when will it be determined? Because we're ready to go forward with the integration work.

[01:04:32.10] - **Daira Emma**

Hang on. There's a procedural question here which a Zip editor should answer. Str4d, what has been decided about what Zips are going into NU7, If anything.

[01:04:47.54] - **Str4d**

Technically, nothing. The ZIP editors have given their view on what a suitable compatible set of updates is. At this point, it is up to node implementers to implement those. At the end of the day, what actually gets decided on what goes in is what users run.

[01:05:13.49] 

But at this point, it is likely that the set of things in that [post](https://forum.zcashcommunity.com/t/zip-editors-nu7-zip-viability-assessment/49553) that were marked as suitable for inclusion are likely to be included. For ZIP 233, specifically, if the change from a technical perspective is a small transaction format change, so the cost to inclusion is low. But I would refer you to the form for the post about the overall set, and we can talk about it further on.

[01:05:49.31] - **Daira Emma**

Yeah, the ball is in ZF's court because it's what Zebra implements. And so now that there is only one main or will be from NU7, only one main consensus node implementation, there probably should be some procedure about ZF explicitly saying what they intend to implement for the next NU and maybe allowing the objections to that, but that's not for me to decide.



____

### 5. Research & Implementation Updates v) ZSA update

[01:06:25.07] - **Vivek**

Yeah, I think I'll start. So on the Zcash shielded assets side. We can start with ZIPs. So we've been making various updates to the Zips. It's some rearrangements. There have been some issues that were raised last month. We've resolved, I think, most of the issues. I think some of those required. I ended up making a rewrite to how I specify the consensus rules in the ZIPs and so on. I think it aligns better with how it is in the protocol now. 

[01:07:14.19] 

I've mostly responded to all the issues. There was one issue regarding the row value in the issue notes, which we discussed this week, and we have a way forward. I'll be making those changes to the ZIPs as well and pushing all that together.

[01:07:32.55] 

We also made a change to the transaction format with a forward-looking view towards not having an additional transaction format change for the swaps update, which ideally would be in the next NU. So that's like bringing action groups instead of just actions at a high level. I've made that update in the ZIPs. And we've also made those implemented computation changes in Orchard, librustzcash, and the Python test vectors. So there's a little bit of work left on our end to make sure all these pieces are interacting properly. We are reviewing all that at the moment.

[01:08:16.59] 

Another forward-looking addition that we have made is the reference notes feature that will be needed for asset swaps. This has been implemented in Orchard again, and I will be making the changes in the ZIP soon.

[01:08:44.58] - **Daira Emma**

If you look at [967](https://github.com/zcash/zips/issues/967), the most recent issue on zcash/zips, Kris, Str4d, and I had a proposal for shielded sighash computation that we think has a lot of advantages.  Specifically, it reduces the chance that there will be... We're boxing ourselves into a corner with respect to how sighashes will work for asset swaps. So as we had previously proposed how, sighashes would work for action bundles, it was going to be and this would be in NU8...

[01:09:51.42]

We propose that there be a flag in the orchard flags, which is per bundle, to specify whether the signature works over the whole transaction, which is something that you definitely need for the hardware wallet case, for example, or the action bundle, which is what you need for asset swaps. And that would be committed to in the bundle, it would be affecting data, so it would affect the transaction ID.

[01:10:24.00]

That is not how, sighash variants work for the transparent transparent protocol. So for the transparent protocol, there's a byte which is put after the signature, which determines how the sighash is computed for that signature. And It defers the decision over what's sighash type to use to the point where the signature is actually being made, which is more flexible in some respects.

[01:11:00.59] - **Daira Emma**

So if you look at the issue that we posted on the ZIPs repo, which is basically just our note that we wrote up for that meeting. It suggests how to get the same flexibility for shielded spending signatures. And it has some motivation for doing it that way. So if we did that for the NU7 sighash algorithm, then we would avoid potentially having to change the Zcash in an incompatible way for NU8.

[01:11:53.13]

Okay. I'll take a look at this issue. I hadn't seen this before. Okay, thank you. But, Str4d, have I summarized that correctly? Is there anything else you want to say about that?

[01:12:06.14] - **Str4d**

The core point here essentially is that if we include asset group support in the v6 transaction format for NU7. Currently, how sighashes are done in zcash is there is one sighash algorithm for one transaction version. The versions are in sync. Then within that, the transparent sighash types allow you to specify behaviours that the sighash algorithm enforces.

[01:12:36.46]

What that would mean is if we include asset groups in NU7, then the defining the asset group sighash needed for asset swaps would be on the NU7 critical path. If for whatever reason we got it wrong, then we would need to make a new transaction version v7 to fix it. We would not be able to fix it as a change to the sighash algorithm without breaking the property that you can validate signatures when you see a transaction completely independently of the chain. So this proposal essentially allows you to decouple it by essentially letting you version the sighash algorithm relative to a transaction version.

[01:13:27.21] - **Daira Emma**

Yes. That has some nice consequences. For example, if you get it wrong, you can do a restricting change, which we're expecting as an emergency change to turn off that variant. If you only ever have one version of the sighash for a given transaction version, then it's essentially free in terms of complexity and security analysis cost. So it has some really nice properties.

[01:14:10.11] - **Nate**

Yeah, it's just a a basic question. I want to learn more about asset swaps as a user. Is there a guide or a tool, like how to execute them, how to create them as a user yet?

[01:14:28.55] - **Vivek**

So we have the ZIP, right? Are you talking from an implementation point of view?

[01:14:34.31] - **Nate**

If I wanted to create an asset swap transaction.

[01:14:42.08] - **Jon**

I can take that, Vivek. So asset swap currently is... We talked about it in the zips, and there's a beginning of implementing it. There's a whole work on aspects of it. But you don't have today a transaction tool that supports asset swaps fully. It's still being developed. There's a whole aspect also of putting one transaction in front of another and matching them, like a matcher for this.

[01:15:16.45] 

I think we don't really have time to dive into it, but it's cooking right now this entire thing. If it's okay, Pili, I want to to just give a few points on ZSA that I zoom out.

[01:15:38.33] - **Vivek**

If I can just take a minute and just finish the quick technical updates also, then I'll hand it over to you. So just to wrap that up, we updated also the Orchard and Halo2 books and documentation. We have a draft of that ready, which we are reviewing internally at present.

[01:15:58.06] 

On the zebra side, we've working closely with the zcashFoundation, and I think making good progress with getting new RPC functionalities and testing them and so on. We've been working on a demo for showing the general ZSA functionality using Zebra and our zcashtransaction tool. And we also just got back the audit report from least authority. So it was pretty positive. I haven't fully gone through it,

[01:16:34.11] - **Jon**

So the the the the overall message here is that we're finally at a point where ZSA is ready to be merged in Zcash. The ZIPs are through sent this link to the discussion on the forum. We still get comments and changes that mean that we need to re implement bits and pieces of it, but the ZIPs are through.

[01:17:09.11] 

Like Vivek said, just today, a few hours ago, we got back the audit from Least Authority, and it seems there's no major issues. Actually, the quote is very high quality. And then we're now taking the Zebra ZSA node and running it live so that we can see that that exact node will be running against current zcash so that at least we have the backward compatibility, the clock on it starting now.

[01:17:46.49]

So basically, there's a shift in how serious this is in terms of being in the protocol. And I want to thank everybody in this call, I think there's something that as a community, we managed to send a clear message of, Here's NU7, here's what's coming. And yeah, we talk about the interactions and the specifics. But it's one of the first moments of clarity going forward, and it's the biggest change in the functionality of the protocol that's going to land. So we're very excited. That's what I wanted to say.

[01:18:37.54] 

There's a lot of value that's been created over the years and is now going to be... It's like a step. It's going to be out real soon. So that involves the testnets. It involves the talks with the community and getting that in the hands of developers so that they can run it.

[01:19:00.05] 

Personally, running ZSA on my own machine with this transaction tool and just going through the readme's and getting the dockers up and seeing it, basically seeing again what was on zcashd, but this time with a modern zebra in Rust was a huge moment, and we celebrated it in the company. So big message here is this is ready for merging. So we will do everything we can to assist the merging of this in the implementations. 

[01:19:40.41] 

That's going to be the work going towards the freeze and the testnets and launch of NU7. We're all geared to do it. So yes, there's the asset swap work and there's other things we're doing. But as a team, we're here to make sure that Zebra can take this and have this blessed. That's the zoom out message.

[01:20:15.24] - **Daira Emma**

I just want to say congratulations, it's been a ton of work. It's high quality work. Thank you. So in terms of the next step, I am strongly in favour. Speaking as ECC's R&D engineering manager, speaking as a protocol designer and adviser to the ZIP editors, it says, I don't know whether that's been formalized yet. I'm strongly in favour of including ZSAs, and more specifically in the short term, while we're still behind feature flags and effectively turned off, of reviewing the code to make sure that it isn't making any inadvertent consensus changes to NU6. Once that's been done, I think that is the only blocker on merging the code, as far as i am concerned

[01:21:23.37] 

Obviously, Zebra is ZF's project, and that will have to be reviewed by ZF engineers as well. But that's from my point of view, and I think I'm okay in speaking for ECC here, ECC's point of view in what the next step is.

[01:21:46.52] - **Jon**

There's, of course, always a logistic piece to it. So if I understood correctly, the ZCG will be needing your help to understand the amount of work that it takes to accompany all this. And if I understand correctly, it's in these calls that we talk about those logistics. So as a team, we prioritize that for 2025, making sure that ZSA finally lands and unlocks that value.

[01:22:22.38] 

I think it's already apparent in the fact that this is so focused. That list for a NU7 is already being taken into account by the community.


____

### 6. Open Announcements - Zcash Dev Summit / ZK Proof & RWC Events


[01:22:39.59] - **Dodger**

We are going to skip the next Arborist call, which is on the 26th of December. So we'll next see you in January 9th in the earlier slot. I just also want to say that we are organizing a dev summit in Sofia in March to be taking place just before ZK proof.

[01:23:51.43]

So anybody who's going to be in Sofia, plenty to visit there for RPC, Hacks, ZK proofs, please consider joining us for a Dev Summit. It's going to be an unstructured... The content and the agenda will be determined by the attendees rather than being something that we're going to dictate from ZF.

[01:24:20.29] - **Daira Emma**

So the scheduling of that, I believe that there's one day of that that is before hacks and ZK proof. And then I think the forum post says that the optional hack day for the Zcash thing would be on the same day as the first day of hacks and ZK proof.

[01:24:53.14] 

It's not really hack day so much as just a co-working day.

[01:24:57.34]

Right. So that means I would not be at that co-working day. Probably Str4d will not be there. It seems a little bit suboptimal to put it there.

[01:25:14.28] - **Str4d**

There's more suboptimality in hacks and ZK proofs overlapping, unfortunately. 

[01:25:21.15] - **Jon**

Let me just say a word on that. So I sat down with Trevor several times trying to figure out how do we do this because we all wanted the pre Real World Crypto slot. They don't co-locate with real-world crypto exactly on the location because they want to be a bit remote on purpose because they want very intense focused talks, and we understand their format.

[01:25:55.29] - **Jon**

They wanted to have this year much more focused on on zero knowledge proof people and a lot of focus on formal verification, which is exactly what we wanted to bring to Sofia right before Real World Crypto. So what we did was understand that they start the day, very intense day, and then the first day of ZK proof actually starts at 4:30 in the afternoon in the lightest possible way for a ZK proof which is workshops that probably Daniel Benarroch is going to run and keynotes that are like vision, but probably not like deep dive into hard core cryptography.

[01:26:45.10]

Then day two are topics that are super interesting. Identity, TLS notarization, things like this, and lots of advances in zero knowledge in general that going to be interesting. But we realized that there's a few people that will not be in ZK proof for day 2 because they'll be very busy doing hacks.

[01:27:10.04]

But that's taken into account. So we're not going to be having roles or anything that we expect the people in hacks participate in ZK proof. But then day 3 is a whole day on ZKVMs, and and formal methods, the verified-verifier, Plonk standardization. And this needs focus from everyone. So everyone is there and that's also coordinating with hacks.

[01:27:47.35] - **Daira Emma**

Yeah. I mean, I decided to be there on ZK proof day 3, even though I'd be missing the hack day for hacks. So I'll be there.

___

### 6. Open Announcements ii) - ZEC sqlite Wallet

[01:57:05.32] - **Str4d**

Could I very briefly grab an open announcement before we go? For anyone who just happens to be left. So if I can very briefly share screen. It's this one here. 4 years ago, I hacked together a example CLI for [zcash client sqlite](https://github.com/Electric-Coin-Company/zec-sqlite-cli) as purely a way of testing things. Zcash Client SQLite being the crate that backs the Mobile SDK, Zashi, and a bunch of other things. It lived as an example here for quite a while.

[01:57:38.41] 

Then we decided actually we were getting a lot of utility out of just using it. We pulled it into a separate crate. But because I had just hacked this together, I was not at all comfortable with it being public because of the way key material and things were handled. We finally had time a couple of weeks ago, four years later, but finally time to to address my concerns.

[01:58:02.19] 

So this is now public. And so if you want to play with it, it is a electiccoincompany/zecsqlite cli. It is a full CLI wallet. But it is imperative. So it is literally just you run a command, it doesn't actually cause them, then it shuts down. There is no persistent process. It is just for poking at essentially a version of what backs the Zashi edge unstoppable.

[01:58:32.41]

I think a few people on this call have already been given private access over the over the time to be able to use it for this way. But I'm now comfortable with anyone playing around with it, whereas I wasn't a while ago. The main thing now is that actually when you load the seed phrase in, it's encrypted on disk to an age key, which actually means that you can, in theory, I haven't I had a chance to test this, but you should be able to use this with the age plugin, YubiKey crate, which I maintain, to have your seed phrase encrypted and controlled by a YubiKey.

[01:59:11.41] - **Daira Emma**

How much money would you personally be comfortable trusting to this wallet?

[01:59:15.55] - **Str4d**

Oh, that's the million dollar question, isn't it? Well, maybe a million dollars. If you're storing it with the Yubikey backend, then I would be I would personally be comfortable with five-figure USD. I would not currently go to six. Does that give you a sense of that?

[01:59:38.58] - **Daira Emma**

Yes.

[01:59:39.58]

It clearly depends on how secure you keep your computer and-

[01:59:45.28] - **Str4d**

Exactly. That's mostly where it sits now. I would have not felt... I would have been an order of magnitude lower than that a couple of weeks ago. So if people want to play with it, they can play with it now. I am no longer at the point where I needed to delete the makefile.





____

### 7. Open Discussion - NU7 ZIPs


[01:28:00.38] - **Dodger**

Does anybody else have any questions or comments or issues to raise regarding NU7?

[01:28:21.27] - **Daira Emma**

So there was a point that came up earlier, which is when is it formally decided which ZIPs are going into NU7, and how is it decided?

[01:28:34.15] - **Dodger**

That's a really good question. So I'll share what my view is. I hoped that there would be consensus around this between the ZIP editors and the core engineering teams and the various parties who are putting forward proposals. That clearly doesn't seem to be the case.

[01:29:02.48] - **Daira Emma**

I mean, it doesn't seem to be the case for ZIP 235, to be more specific.

[01:29:08.23] - **Dodger**

Yeah. I think there's a lot of concerns raised about making it impossible to spend Sprout funds as well. So what I think we probably need to do is look to the community for some guidance and I think what we can say to the community is, would you like to see these features included in an upcoming network upgrade? And thinking about how we ask this, which ones would you like to see prioritized?

[01:29:45.33] 

Now, I think this is a foregone conclusion to be frank, I think I'd be very, very surprised if the community were to come back and say anything other than we want to see both ZSAs and NSM included. I'd be interested to see their reaction on making it impossible to spend Sprout funds.

[01:30:01.30]

And I would expect that they will prioritize ZSAs over NSM. So at that point, I think we go to the community for whether a feature should be added to the zcash protocol, and if so, how it gets prioritized. And then, as you alluded to, Daira, it's really then down to the core engineering team. So in the case of like the Orchard Crate and librustzcash that's ECC.

[01:30:33.41] 

In the case of Zebra, that's ZF to consider whether they are comfortable that the proposed set of included ZIPs are going to be going to fall within the complexity budget. I will say that we've discussed this internally at ZF, and there is cautious optimism that both ZSAs and NSM can be included, although modulo 235. .

[01:31:15.05] - **Paul Dann**

Yeah. So my question is mainly one about process. My understanding is that the ZIP editors have put forward a list of ZIPs that are acceptable or seem compatible for inclusion wit NU7, and that includes 233. And then it's a question of getting the implementations ready.

[01:31:40.28] 

So in our case, the implementations for 233 are already there in PRs. And my question is, is there anything you'd like us to do? I know the code is behind feature flags right now. Are we just in the queue or is Is there anything you'd like us to work on?

[01:32:04.28] - **Daira Emma**

Sorry, was that a question to the ZIP editors?

[01:32:08.08] - **Paul Dann**

It was a question of process. I'm afraid I'm not sure who's responsible for the next stage.

[01:32:14.13] - **Str4d**

Okay, so I'll put my ZIP editor hat on for a moment and speak to this point. For the given network upgrade, the process that we have evolved towards over the years is generally that for the different kinds of zips that are proposed or going into a different network upgrade, some of them will interact with common core in a sense, like the transaction format and things like that.

[01:32:44.15] 

That that is specified after the various ZIPs that are going to go in are sufficiently clear that it's going to be in, that it's worth combining. The thing that we went through and did as ZIP editors posted the forum was us figuring out what was a feasible from both in terms of complexity budget, but also in terms of implementation timelines and interactions. You can read all the things we said about it there.

[01:33:22.23] 

But the combination of things that's there that specifically affects the transaction format, of which ZIP 233 is one of the ones that gets included, The next stage there is the ZIP editors sitting down and figuring out what the transaction format would be, assuming that those things that get included, get included.

[01:33:40.34] 

From memory, because I've been frazzled for the last couple of weeks, but from memory, nothing that affects the ZIP, the transaction format, was a strong no anywhere. The only thing that's a question mark was the asset groups as to where that that we went in. But the affermentioned issue on the ZIPs repo, which, again, for the transaction format and the sighashing, it's under that purview of the Zip editors need to figure that bit out, taking input from the ZSA ZIPs to find what they need in the transaction format and so on and so forth.

[01:34:23.25]

But synthesizing that together, that falls under the ZIP editors. That couples with also the Sighash algorithm, taking the various inputs and making sure that that's consistent for the protocol. The only thing that I'm aware of as a possible problem was the asset groups stuff, but the proposed idea in the ZIPs Repo helps to reduce the risk there and narrow what needs to be done.

[01:34:54.11]

To wind back then to specifically ZIP 233, because ZIP 233 Basically, from a transaction format perspective, is very simple, that will just get included as part of the work to figure out the transaction format and figure out the final specification for that, which will very likely be quite close to what's already in various implementations in places. But essentially, synthesizing that together falls under that. Then as far as the implementation goes for ZIP 233, that would be relevant to the Zebra developers because it's using of that field and constraining of that field and consensus. From that perspective, it would be how the zebrad team gets that into their code base.

[01:35:42.42] - **Paul Dann**

Are they also responsible for librustzcash as well, just in terms of me.

[01:35:46.29] - **Str4d**

librustzcash is the ECC team. So related to the transaction formats, that ties into the ECC's implementation of the transaction formats in the zcash primitives crate, and then I think Zebra has their own implementation of the transaction format in the Zebra crates. Once the transaction format is specified enough to be able to implement, then that will get implemented into the zcash crates.

[01:36:17.14] 

Most likely given that the largest contributor to the v6 format is ZSAs, getting the ZSA changes into the Orchard crate below is likely to be the main thing that then drives through and gets the v6 format into the librustzcash crate.

[01:36:35.27] - **Paul Dann**

Okay, so we're not expecting a PR to get merged or anything anytime soon. We're waiting for everything to be formalized in the ZIP process before we start looking at code?

[01:36:47.27] - **Daira Emma**

No. We tend to do specification first, but code in parallel-ish.

[01:36:57.01] - **Str4d**

Put it this way. Anything that lands in before a spec is present for v6 transaction format, anything that lands in the librustzcash repo will be behind a config flag. So it won't even be a feature flag, it will be config flagged off. But taking off my ZIP editor hat and putting on my ECC hat, I would very much like to see a v6 format implemented in librustzcash in the very near future for people to start testing with.

[01:37:24.27] - **Daira Emma**

By the way, I think it's important for procedure and separation of power and balance of power between ECC and ZF that librustzcash is being maintained by ECC and Zebra is being maintained by ZF. There might be some failure modes if it was just one organization controlling all of the code that this helps to mitigate to a certain extent.

[01:38:10.38]

That wasn't the main point that I wanted to make it that I had my hand up for, which was that I think we should have a poll question for ZIP 235, specifically. 

[01:38:25.42] - **Jason Mcgee**

Yeah, there's an important technical consideration regarding Zip 233 that Kris Nuttycombe raised, and that's that you can't open the transaction format for changes frequently. It's already happening with ZSA. It sounds like if we don't get it into NU7, that it can't be included in NU8. If that's correct, then I think it's a very important issue that should be taken under close consideration when deciding what gets into NU7. I'm thinking in this scenario where the community votes NSM a lower priority, it could impact it getting included into future network upgrades when the community is ready to prioritize the NSM.

[01:39:10.13] - **Dodger**

Yes. I would say that one way of thinking about this, and certainly the way that I'm thinking about it, and would be delighted to hear from anybody who thinks this is a bad way of thinking about it, is that you could actually split 233 into a minimal change to the transaction format, which is just a placeholder field, the burn amount field, I believe it's called. And then, but not implementing burning.

[01:39:42.07] 

But like I said, team is cautious I'm really optimistic that can certainly be included, or the full 233. So, yeah, we're fully aware of that, Jason, and ready to take that to account. 

[01:40:04.07] - **Str4d**

Just to riff off that, this same concern applies to asset groups. Currently, ZSAs can be implemented by just changes to the circuit, changes to the bundle format just for ZSAs. But to do asset swaps, you need this additional change to be able to represent asset groups.

[01:40:31.02] 

If for whatever reason that can't be pinned down on the NU7 critical path and isn't included, then to do asset swaps would require another transaction format change. It's not to say that there wouldn't be something later to go into, but that it's one of those ones where, and this is something that we mentioned within the viability assessment of things, is that the opportunity cost of adding something in to a format change is if you can get the small stuff in while the big stuff is going on, then it's worth doing so.

[01:41:10.12]

ZIP 233, as we noted there, it's a trivial transaction format change. The consensus rules are non-trivial, but that's a separable, manageable piece. Whether ZIP 233 in in terms of implementation ends up being in or not, I think it's almost, not to speak fully on behalf of every ZIP editor, but I believe it's likely that the field will end up in the v6 format purely because it's a simple field to include.

[01:41:50.05]

You don't really pay any cost if it ends up never being used just in the format. We're already making a change for ZSAs, so it's the right time to do that thing. As far as 234 and other things go that would apply consensus meaning to it, you need it to be in the transaction format first, and so getting in there would be the priority.

[01:42:17.38]

Similar to the shielded sighash versioning that Daira Emma mentioned earlier, same thing there. Getting a single byte per orchard signature in to enable something there, even if we never use that flexibility, getting it in means that we have it there. Because we've generally, as a principle for Zcash, gone with not having our transaction formats ambiguous, because that can cause significant analysis problems further down the line.

[01:42:51.05] 

So instead being explicit and like, Yeah, we're going to pop this field in. Even if it's just consensus set to zero, the field being present and explicit that is there is better than trying to shove it in later. I had something else, but I can't remember what my hand was actually up for, so I will join the back of the queue for that and try to remember.

[01:43:13.59] - **Marek**

Regarding I'll try mentioning the two implementations of transactions, one in Zebra and one in librustzcash. We were discussing replacing the implementation in Zebra by the one in librustzcash. We mentioned it to Qedit engineers, and they were in favor of doing that. So if there's further interest or motivation of doing this, then we could prioritize this work internally.

[01:43:52.14] - **Str4d**

If you think that's a viable route going forwards for that, then I'm perfectly fine with that. I've encountered this a little bit with the PCZT stuff, whereas I mentioned before, I explicitly tried to set up in a way that you didn't have to depend on the Orchard of Sapling Crates if you didn't need to be aware of those pieces. I've been attempting on the side to do a similar thing with the transaction format in our library. Haven't succeeded yet.

[01:44:29.51] - **Str4d**

But I have a bunch of whip work that's along those lines to be able to make it easier for someone who is just like, I just have orchard support. I don't want to pay the cost of the Sapling Crypto Crate, but I still want to generate transactions. That's the direction that I'm hoping to bring our format into. If you think that would be useful from a Zebra perspective, then that would also potentially be a benefit there.

[01:44:55.47]

Obviously, in the context of zebra, you need to understand all the protocols because it's a consensus node implementation. So from a node perspective, that flexibility wouldn't matter. But from a development perspective, it would be interesting to have more perspectives on what would be the most usable.

[01:45:18.59] - **Daira Emma**

Yeah, we had a conversation with Arya. I can't remember whether you were there as well, Marek in Montreal, where I think the plan we discussed there was to to make the current zebrad transaction type be a simple wrapper over the librustzcash one. And that way, the it would reduce the scope of immediate changes that need to be made to zebrad.

[01:46:00.58] - **Nate**

I had two things. So one was for ZIP 233, I got a little confused what it means to include the format change without the consensus rule, because it sounds like that... And I may be missing details, but I thought if the format change allows a ZEC balance, then we I definitely need the consensus rule to ensure ZEC isn't created.

[01:46:35.55] 

If that is true, that is already burning. There's no other definition of burning because those funds can't be spent.

[01:46:46.46] - **Daira Emma**

So the proposal would be to have a consensus rule that that field is zero.

[01:46:53.58] - **Nate**

Okay, that difference makes sense, but to me it seems like there's no complexity difference between those two options. So I don't see how allowing-

[01:47:08.21] - **Daira Emma**

The question is whether the community wants burning at all.

[01:47:13.49] - **Nate**

But it's already possible to burn. This just allows for it to make it explicit.

[01:47:17.36] - **Daira Emma**

I agree. I think you're right. So I think the answer will be yes.

[01:47:23.10] - **Nate**

To me, it seems odd to say, basically, we'll the whole thing in there, but then disallow it. But all that does is it means burns can't be explicit. They can only continue to be implicit. But I don't know. For me, it just doesn't make sense to go to It's a bit strike that balance.

[01:47:45.05] - **Daira Emma**

The ZIP editors recommendation was to include 233.

[01:47:51.37] - **Str4d**

It would only be if, for example, there were concerns raised further down the chain, like implementation complexity or overcomplex budget for Zebra to be able to deploy or a something raised in the community, further that I think at this point would make it likely that ZIP 233 wouldn't go in. Because I also agree, as was just noted in the ZIP assessment, that the ability to bring it in is very simple.

[01:48:25.58] - **Nate**

Okay. The other piece I had was for ZIP 235, there's a different route that seems plausible and also maybe safer. There's a different route that's possible. So rather than making that rule a consensus rule, if it were excluded from consensus, then we could, if Zebra wanted to, we could make a opti in standard rule or opt out standard rule and see and test that out first on the network without the ability to pull it back. Just wanted to make sure that everyone was there. That was an option.

[01:49:22.59] - **Dodger**

I think that the ZIP editors can make recommendations the community can say, we want all of these things in the zcash protocol and at ZF, We are committed to implementing the will of the community within reason. If they want a backdoor, they can go and do it themselves. So you can have all of the recommendations from the ZIP editor is, you can all the polls you want. But at the end of the day, there are only so many hours in the day and we only have so many engineers.

[01:50:08.14] 

And if it becomes a situation where it isn't possible to jam everything in safely, then something may have to give and that is why I referenced potentially just including the transaction format change and the prioritization. But this is all hypothetical at the moment. Given how far past the end of the meeting schedule time we are, I would suggest that now is not the time to rabbit hole on it.

[01:50:43.34] - **Str4d**

On that point, that was also something that we did talk about at length for the ZIP editors viability assessment and, again, figuring out what things would be viable to include, first back out, versus... And there are options there. There are points at which we need to have something fixed because after which we need to be able to deploy the software. The obvious one is the setting of the main net activation height and the release of consensus node software that sets that.

[01:51:18.43]

The more likely deadline for anything is the testnet activation height being set because that's the point at which people are actually first running the software. In particular, once we've set that height, if any consensus change is made, the consensus branch ID must change, pairs of 200. Really, the absolute drop-dead date for anything point for anything to be backed out or included or whatever, modulo security fixes is really the point at which we set the test and activation height in terms of just how people should be thinking about it.

[01:52:07.14] - **Jason Mcgee**

Yeah, Dodger. One request with regard to the poll. Before you open it up in Helios, are you able to post an initial draft to the forum for the community to provide feedback?

[01:52:17.44] - **Dodger**

Sure, of course, yes. Awesome. Thank you.

[01:52:21.31] - **Daira Emma**

So one last point I want to make. When we do polls, they should be focused on the things that are actually is still in dispute. So to me, the inclusion of 235 is separately in dispute. Therefore, there should be a poll question specifically on that. It sounds like Dodger thinks that the disalowing v4 transactions is also in dispute, and therefore there should be a poll question specifically on that.

[01:53:04.38] - **Daira Emma**

And the question should not be just include this ZIP. It should be about the main effects of the ZIP. So 'Do you want to require that 60% of fees of  are burned?' And define what that means. 'Do you want to disallow v4 transactions, which will have the effect of not being able to spend sprout funds?'

[01:53:30.04] - **Dodger**

Feel free to start up a Google Doc and put your suggestions in there and or post them to the forum.

[01:53:36.26] - **Daira Emma**

I have very little time before I'm going on holiday, but I will if I can.

[01:53:45.57] - **Jason Mcgee**

Is this going to be part of the ZCG poll or do we have time to work these details out?

[01:53:53.51] - **Dodger**

I think we should try to get it into the ZCG poll.

[01:53:57.58] - **Daira Emma**

What's the timeline for the ZCG poll?

[01:54:01.27] - **Dodger**

Mid next week. So basically, approximately a week from now.

[01:54:05.16] - **Daira Emma**

Okay. I mean, I can make some suggestions before that.

[01:54:11.07] - **Dodger**

We can always push it to next year.

[01:54:17.58] - **Daira Emma**

str4d, you know what my opinions are on this. I trust you to channel me on it. 

[01:54:26.41] - **Str4d**

And also it helps. There are things that I think are obvious enough that they don't need to go in there. Do they want ZSAs? I think at this point we know.

[01:54:35.01] - **Dodger**

Playing devil's advocate, I would say that in terms of establishing a precedent for future process. Who gets to assume that something is non-controversial? Because I don't want to have to be the person who everybody's shouting at if I make an assumption and then we'll disagree with it. And there will always be someone who disagrees. We know that from experience. Whatever we do, someone will try to pick a hole in it.

[01:55:09.14] - **Daira Emma**

I thought that disallowing v4 was controversial. It seems that's not the case.

[01:55:17.59] - **Str4d**

To some extent, I think the biggest benefit of the current controversy around that is making people aware that they might still have Sprout funds and they should start moving them.

[01:55:27.35] - **Daira Emma**

Yeah, i think the controversy around disallowing v4 is not whether it should happen, but when it should happen.

[01:55:38.48] - **Str4d**

And this is one of the things we have been talking about it for years. And we have definitely done it-

[01:55:46.35] - **Daira Emma**

Yeah, literally since 2018.

[01:55:49.56] - **Str4d**

And we have been talking about the kinds of things that have been proposed since before zcash launched.

[01:55:55.49] - **Dodger**

What ever happened to Sprout on halo?

[01:56:00.28] - **Dodger**

There was never an implementation of that. I didn't think we should do it because I thought we should just do this Slice Sprout instead. I thought it was basically a waste of time.

[01:56:20.48] - **Str4d**

If it was something that someone felt strongly about doing, that would actually be easier than Sapling on halo. Because Sapling is based on-Let's not go into the reasons. We won't get the road hold.

[01:56:39.03] - **Daira Emma**

It's a lot of work. It's the answer.

[01:56:42.49] - **Dodger**

Maybe what we need to do is we need to have a afterparty on Discord going forward. So with a nominated Discord, so the people can join and continue an informal chat. But for now, let's wrap it up and have a good holiday season, everybody.

[02:00:13.34] - **Dodger**

Merry Christmas to everybody. Bye.


____


**Next Meeting Scheduled: 21:00 UTC January 9th 2025**

___
___
