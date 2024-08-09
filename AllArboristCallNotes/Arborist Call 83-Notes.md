# Arborist Call #83 Notes

Meeting Date/Time: August 8th 2024, 21:00 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [Exchange Rate Retrieval](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#1-ecc-update---nu6-lockbox--exchange-rate-retrieval)

+ Zebra Update - [Lockbox Funding Streams](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#2-zebra-update---lockbox-funding-streams)

+ [NU6](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#3-ecc--zf-nu6)

+ [ECC & ZF zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#4-ecc--zf-zcashd-deprecation)

+ Research & Implementation Update - [FROST](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#5-research--implementation-updates-i-frost) / [Zcash Shielded Assets](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#5-research--implementation-updates-ii-zcash-shielded-assets) / [Zcash Sustainability und/Trailing Finality](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#5-research--implementation-updates-iii-zcash-sustainability-fund--trailing-finality)

+ Open Announcements - [Inclusion Proof Advancements](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#6-open-announcements---inclusion-proofs-adancements) 

+ Open Discussion - [ZSA Implementation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2083-Notes.md#7-open-discussion----zsa-implementation) 


## Decision & Action Items

i)  After NU6 activation Arborist call on ZSA fee structure


___
Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - NU6 Lockbox / Exchange Rate Retrieval

[00:01:56.31] - **Kris**

At ECC, we have been working on three primary things, the first being the NU6 Lockbox Funding Streams implementation, the second being improvement to the ability to handle a fully transparent history in the Zcash Client backend, which is the back-end for the wallet SDKs and then finally, we are nearing completion on the Tor integration with the wallet backend for both exchange rate retrieval that's already implemented and is in testing in the Zashi Wallet. And shortly, Str4d has an open PR for being able to retrieve transaction data over Tor and reduce the leakage of a particular wallet's activity to the lightwallet server. Those have been the main things.

[00:03:18.33]

We've also had some discussions with folks who are working on hardware wallets for Zcash that I think are fairly interesting and there's some work that we have lined up there to really get the transaction signing process updated so that it's easier for hardware wallets to take advantage of using the transaction builders in Zcash primitives.




____

### 2. Zebra Update - Lockbox Funding Streams


[00:04:21.21] - **Alfredo**

Since the last Arborist call in Zebra, we added lockbox Funding Streams. When I calculated the lockbox in the Zebra consensus and tracks the amount in Zebra state, this needed some Zebra database changes. Initially, we made an implementation where after the upgrade, people had to resync the whole chain, and we realized that's not good. So we are working around so people don't have to do that.

[00:05:00.45] 

We are pretty much focused on NU6 stuff. In the process of that, we fixed some other issues we found, like the deserialisation of the value balance. We added a NU6 upgrade variants to our code, and we added some code to librustzcash for that as well, which is already merged in. We have some open PRs, but we are still we're working on RPC methods for a NU6, the get block subsidy RPC, specifically. Finally, we implemented ZIP-236, which is to acquire that Coinbase transaction balance exactly after a NU6  activation. So we're keeping an eye to the ZIPs as well. Yeah, that's it. It doesn't maybe sound like a lot, but some of the lockbox PR, we had a bunch of review from external people. We had a a lot of internal discussion as well.


___


### 3. ECC & ZF NU6

[00:06:11.59] - **Dodger**

Okay, let's move on and let's cover off the progress that's been made on NU6. So the original target for testnet activation was today, but I believe that that's slipped a bit. Kris, are you able to provide an update of when we think we're going to be ready to activate on testnet?

[00:06:44.06] - **Kris**

Yeah, I mean, right now, we're in the process of final debugging of the zcashd changes, and I expect that we'll have that ready early next week. So that's our current objective. And then Yasser, here at ECC, has been doing some work to make it so that we can run a private testnet, including both zcashd and zebrad nodes, so that we can have confidence before we do an actual testnet activation.

[00:07:21.11] - **Dodger**

So are we looking at maybe towards the end of next week, maybe Thursday next week or something like that?

[00:07:26.41] - **Kris**

For an actual testnet activation height, it depends It's upon what the results of the private testnet work end up being. But we will publish a release candidate that does not set a testnet activation height, then we'll activate that on a private fork of the testnet, ensure that we're able to interact with the testnet chain properly, and that funding streams are getting paid correctly, and then we can go ahead with setting the actual testnet activation height and publishing a release.

[00:08:09.28] 

So there's actually a fair bit to get done next week just in terms of getting a release out. So I think that it's optimistic that we'll have an actual testnet activation next week because we actually need enough folks to start running the testnet node. So setting a testnet activation height next week, I think, is entirely possible. The actual testnet activation will have to come a while after that.




___


### 4. ECC & ZF zcashd deprecation


[00:08:55.29] - **Dodger**

Okay, let's move on. I think we can probably skip over Zcashd deprecation as I think the priority has been on NU6.

[00:09:14.35] - **Kris**

That's not entirely true. We've made a lot of good progress in the past week or so on supporting fully transparent history in Zcash client backend. So that actually probably been where most of our work has gone to. The NU6 updates have been relatively small compared to that, with the exception of the debugging that i'm doing right now. But in the past week, there's been very little time required for the NU6 upgrade, but the zcashd depreciation has taken up most of our time.


___


### 5. Research & Implementation Updates i) FROST 


[00:10:12.24] - **Conrado**

The last two weeks, we worked mostly on updating the signing tool that we have for a demo our Zcash transaction signing demo. So this tool was based on some Ywallet code. It was annoying we needed to check out a fork of Ywallet code and compile it. Now it's like a standalone tool, which is much simpler, both to read if you're interested in the code and also to use.

[00:10:43.29] 

I just applied the implementation. We just need to review and merge the PR. So it should be a bit easier to run the demo. There's also been a lot of discussions about how to use FROST with Zcash, what is the flow for generating a Zcash wallet using FROST. I'm very glad that all these discussions are happening. So I want to resume work on the ZIP and So after all the discussions, we should write down to specify how the best way to generate a FROST Zcash wallet.

[00:11:25.57] 

We also have ongoing work on refresh shares for DKG. The final piece for our FROST server is adding authentication encryption. So we wrote a design for that and we probably proceed with the implementation for it. And after that's done, I think the server will be in a place that you can actually be used by people. So yeah, people I can start experimenting with it.

[00:12:07.05] 

Also I want to look into transaction plan format, which is something that is also needed for doing frost with Zcash. I know that ECC has a sketch of a format for transaction plan, and Ywallet has its own format for transaction plan, so I went to study both and come up with a proposal for something to be standard. 

[00:12:38.02] - **Dodger**

I think it's woth pointing out that FROST is usable today for Zcash. The work that's going on at the moment on the server is to make it a lot easier for people who want to collaborate on signing a transaction using FROST to be able to communicate with one another and to avoid the need to cut and paste blobs of text back and forth through something like Signal or whatever your secure messaging platform of choice is.

[00:13:15.07]

But it's definitely out there. People have been using it and experimenting with it. So this work that's going on at the moment is more about making it easier for wallet developers to integrate and for people to end up having a good user experience when they're actually using it.


___


### 5. Research & Implementation Updates ii) Zcash Shielded Assets

[00:13:44.49] - **Jon**

I was asked to pop on. Vivek is not here, so the visual updates won't be available. I'm currently at the Science of Blockchain conference in New York. There's a lot of really interesting things going on here, but I think I'm actually available to discuss and talk about questions on ZSA generally and maybe present a little bit not the work on the current work on ZSA, more the roadmap and follow up to the past conversations that we had on the status of what ZSA and questions.

[00:15:04.38] - **Jason McGee**

Yeah. So just real quick. So last Arborist call, Jonathan gave an overview of Qedit'sgrand on Asset.

[00:15:11.34] - **Jon**

I'm sorry, I can't hear you super well. There's a lot of You're very quiet, Jason.

[00:15:17.05] - **Jason McGee**

Okay, I'll reconnect with a different device. Sorry about that.

[00:15:20.26] - **Jon**

No, no, no, it works. No, it works. Oh, okay.

[00:15:24.15] - **Jason McGee**

Yeah. So last Arborist call, Jonathan gave an overview of Qedit's grant on Asset Swaps and Transaction Acceptance. We talked about the new process post the stablecoin cancelation, whereas ECC will have the core devs review technical grants and assess any potential risks. Jonathan, you seem to be under the impression that everything was good to go before you posted the grant to the forum. And then last week, we saw in Josh's weekly update that Jonathan and Josh had discussed the grant, and he said, ECC is conducting an internal review.

[00:15:59.56] - **Jason McGee**

So is ZCG is ready to vote on this grant, and we'd like to understand the status of that internal review, if it's still ongoing, and what the next steps are.

[00:16:11.41] - **Jon**

Okay. So I don't know what the internal review of the ECC is. I'm not sure that the article that Josh has posted. I don't exactly understand what is that review. I do know that all of those features we basically discussed way back in 2023 as part of the long-term roadmap of ZSA. One of them is implementation of a ZIP that was already reviewed, which is asset swap.

[00:16:49.34]

The other is implementing the ability to refuse transactions. Again, that's something that at least Daira last time said they would really want this to be in the protocol and use for it directly. But it didn't seem to raise any security concerns or controversial or any sort. There was some comments on the forums, which were not about the features themselves, but more about the pace of the ZSA project and fundings, et cetera.

[00:17:29.22] 

There's maybe a few misconceptions there to lift, but I can use the stage here. Most of our work, when we submit a grant proposal, we already do much of the work ahead of time in order to know that we can complete the grant and to have a good estimate of how much time it's going to take.

[00:17:58.56] 

The talks about the current grant actually started somewhere along February. Basically, there's a few engineers that have been since February, both looking at asset swap implementation, looking at transaction refusal, also looking at verifiable encryption, we're thinking of publishing outside of a grant the results of verifiable encryption just because we did it and we think that it's useful for for the ecosystem regardless of stablecoins and can be used elsewhere in the protocol.

[00:18:37.10] 

All this to say that it might be useful for the community to understand what it takes to develop the protocols and to chase the network upgrades to make sure that they're incorporated, and also to clarify whose responsibility it is to accept merge changes and actually activate ZSA.

[00:19:05.11] 

But from our perspective, we're in constant work with all teams, with the Zebra team, with the ECC team on the past grants, and we expect this grant that we submitted to be both done in collaboration with these teams and to make it possible for us to attend all of ZSA issues in parallel to the NU6 deployment and the security of it. What I would summarize is we haven't received any pushback on the content of the features.

[00:19:52.57] 

On the contrary, people seem to, when they talk about the features themselves, they seem to be accepted. There's a very difficult exercise for us to explain engineering product management on a forum and the time that things take and the dependencies of development and dependencies as on progress of other teams. It's not an easy exercise. All I can say is that our engineers are very happy to work on engineering problems, and they're very happy that they don't need to deal with public form project management. That's my job. If there's a way for me to to directly read, address, and talk about these things in detail, I don't know if this is the place, but maybe the major concerns we can discuss.

[00:21:27.56] - **Alfredo**

Yeah, this is not related to that, but I want to thank the qedit team to reviewing some of the lockbox PRs we had in Zebra for the NU6 activation. And also, they are going to make some testing with us for the NU6 as well. And they are always trying to help us to help the zebra team in whatever they can. And we really appreciate that. So thank you.

[00:22:05.28] - **Jon**

Thanks. It's appreciated.

[00:22:12.51] - **Dodger**

I feel like sometimes positive sentiments are either taken for granted or are expressed far more quietly and are less visible than negative.

[00:22:29.37] - **Jon**

I must say that the sentiment on the form I wouldn't qualify directly as negative because everybody was also voicing that they like the work and they like the efforts and they like the efforts that are put into the engineering. I think there's a big frustration on the outcome of the value being received from investing all this money and time and effort into ZSA and not seeing deployed ZSA, which we join. Maybe everybody would like to see an early use of it. There was a glimmer of hope back then in zcashd when we did the demos of all of this working on zcashd.

[00:23:22.44] - **Dodger**

That was a year ago now, wasn't it?

[00:23:24.23] - **Jon**

Yeah, retroactively, maybe we should have just been staying on zcashd for a while and pushing the zebra re-implementation to later. I don't know if that would have helped in a way. But thank you again for the positive comment.

[00:24:07.06]

I have just one last comment. Someone said here today, ZEC hit 36, which I think is amazing. I also wonder if any of it is related to Daira pushing back on stablecoins and stuff like that. I can't read this ecosystem at all. I don't understand how this functions, but congrats on ZEC hitting 36. I think it should be 360.

[00:24:40.02] - **Dodger**

I'd like to see 360 million users. 


____

### 5. Research & Implementation Updates iii) Zcash Sustainability Fund / Trailing Finality


[00:24:51.47] - **Jason McGee**

Yeah, just a quick update. I wanted to give everyone a heads up that we have a new developer from Eiger that just started working on the Zcashd implementation for the Zcash Sustainability Fund. His name is Paul Dan, and he goes by Giddy on Discord. He's already been asking questions on there, and he'll be working closely with Tomek. And both of them will attend the next Arbort's call on August 22nd to give a technical update.

[00:25:23.06] - **Dodger**

Cool. We'll look forward to that. Next up, any updates on trailing finality?

[00:25:31.31] - **Jason McGee**

Yeah, I got a quick update on this. So Shielded Labs announced today that Zooko is coming on to serve as head of product, and we're going to partner with ECC to accelerate the development of TFL and crosslink and transition Zcash to a hybrid proof-of-work, proof-of-stake protocol.

[00:25:52.19] 

So we met with the core engineering team at ECC last week, and we discussed the roadmap and our plans to develop a prototype. And so Zooko is putting together a list of trade offs for a couple of different approaches for how we plan to move forward, and he's going to present those at the next Arborist call on August 22nd. So going forward, we're going to use this slot, and we will provide bi weekly updates to the engineering community.

[00:26:41.19] - **Zooko**

Yeah, I don't have anything to add except Hi there. Like Jason said, my role as head of product for Shielded Labs. I'm going to be writing down desirable features of future consensus or proof of whatever upgrades to present later.



___


### 6. Open Announcements - Inclusion Proofs Adancements 


[00:27:28.54] - **Jon**
I have Just something intriguing. I met here with an interesting guy from another privacy token that described a way to do proof that you're in a set with billions of records in milliseconds of proof, like some extraordinary the jump in capacity that completely went under my radar. I don't know if the community is aware of it.

[00:28:07.23] - **Dodger**
What sort of set?

[00:28:09.05] - **Jon**
Like an Inclusion proof...

[00:28:17.34] - **Dodger**
Like a Ring signature replacement thing?

[00:28:22.04] - **Jon**
Kind of yes. It looks like it's a jump in capability that I haven't seen. I'm interested in understanding the community's thoughts on that particular construct, regardless of its origin. Just putting it out there. If anyone wants the links, I'll send them over. But it's intriguing. 

[00:29:02.21] - **Dodger**
Yeah. Could you post them on the forum maybe to share more widely?

[00:29:06.51] - **Jon**
I shall.

[00:29:08.07] - **Dodger**
The Ring Signatures is as currently implemented by other privacy coins. Obviously, they have their limitations in terms of the anonymity set. But it'd be interesting to see if there's been some significant change in terms of the scalability there. 



___


### 7. Open Discussion -  ZSA Implementation


[00:30:03.45] - **Jon**

There's a big question on what is the core feature for ZSA? And I think everyone agrees that the core feature for ZSA is ZSA being actually deployed on mainnet. Let's figure out a way to do that and hopefully everyone can start playing with the actual feature.

[00:30:34.50] 

We cannot separate that deployment from our work. We do what we can. We're helping with Zebra, and we've converted a lot of our work to try to see if there's roadblocks that we can push aside. But meanwhile, because we also wanted to do asset swaps and have designed it, and because every such design and implementation is an effort. We very much are happy to develop those things.

[00:31:13.49]

I think most of what we do is core. There's nothing very superfluous on the features themselves, but I can understand why building features when the core ZSA is not out is a frustration for the users. But again, the time it takes to vet these things with ZIPs and then implement them both in the cryptography and in the protocol and then do the security, et cetera, there's a huge lead time. And we do hope that all the core is going to make it at some point soon. So that's why we're proposing making the ZSA actually useful for trading it with other assets and things like this.

[00:32:09.13] - **Dodger**

And just to recap, vanilla ZSAs would be ready to deploy later this year, right?

[00:32:17.01] - **Jon**

Yeah. The protocol itself is ready to deploy. The readiness in terms of comfort to deploy also requires a security audit deeper than what has been done so far. An actual green light to do NU6 still requires security audit. There's aspects of fees that we could implement, but also could be implemented as part of NU7, if it goes into NU7 by others that need to be agreed on by the community.

[00:33:06.45] 

We've done the work to review and design what could be done, but the work is actually in the consensus parts. It doesn't really concern ZSA, it's part of the wider views of Zcash. But the short version is... Again, the circuits are here and the capabilities are here and the testing tools are here. These things are here, but it requires merging them to Zcash and deciding that they're active in one of the network updates.

[00:33:50.58] - **Dodger**

Maybe once the current focus on the NU6 testnet activation is out of the way, we could have I have an Arborist call where we have a specific discussion about the fees and how fees for ZSA should be structured and give people an opportunity to find out what the options are and discuss what the pros and cons of the different approaches are. But my understanding certainly is that Or certainly my expectation is that fees will be paid in ZEC.

[00:34:35.56] - **Jon**

That's our proposal in the Zip. I'm not sure if it's a full consensus, but that's our proposal in the Zip. In any case, the existing fee mechanism, the adjustments that were made in one of the latest adjustments, don't require anything special when you consider a ZSA transaction. It's just the weight of how much it takes in the block. It's a formula. Most of the work was trying to figure out if we're missing any corner cases, but it should be part of the regular mechanism.

[00:35:28.26] - **Dodger**

Cool. Are Are there any counter proposals that you're aware of for different approaches?

[00:35:37.43] - **Jon**

There's an argument that if you let people park, let's say, coins that are stablecoins or things that are other value on the zcash blockchain, and ZEC holders are paying fees are basically getting inflation because of  devfund and lockbox, et cetera, then ZEC holders are paying the price of privacy, that then assets, like wrapped assets don't pay that price.

[00:36:22.49] 

We've discussed these things when we were working on the Zip. I'm I'm not sure there's a way to quantify the effect. Also, I'm not sure that there's a straightforward privacy-preserving way to mitigate the effect. Because if you're a miner that needs to validate transactions, then how do you remove assets that you're not aware? If it's an NFT, what do you do? Do you take a chop of piece of NFT? It's not a straightforward solution, but also the damage is not easily quantifiable. But it's not a counter proposal. It's more one of the areas of risk that we're mentioning.

[00:37:27.20] - **Dodger**

It's an objection.

[00:37:30.20] - **Jon**

Yes. The straightforward way is to look at how much a transaction takes in the block and quantify this way, and also add some payment for issuing an asset. So a fee to the issuance of the asset that's, let's say, hefty to encourage the use. But When we submitted the Zip, the view was to make it as seamless as possible with a regular mechanism so that there's no distinction There's definitely a distinction between ZSAs and regular transfer fees.

[00:38:24.13] - **Kris**

It seems to me like I don't think that there's a significant issue with respect to transfer fees, because I I think that, as Jon says, Zip 317 transfer fees taken into account. We would not want to do anything that distinguished ZSA transfers via the fee. But I don't yet have a good idea of what a good approach is to issuance fees, where it both enables trivial experimentation and small use cases, and at the same time, readily enables, let's say, Tether coming onto the Zcash chain or something like that, where there's a very significant use case.

[00:39:22.16] - **Kris**

Now, maybe there's a per-mint or per-burn fee or something like that, and then you're just essentially economically economically incentivizing people to do large mints or large burns. The only proposal I've seen that tried to essentially level the playing field there was Nate's proposal for the shielded hosting fees. But as John also points out, that runs into problems that doesn't really work for NFTs. So I I think this is one of those things where we really need some creative thinking from people interested in the zcash ecosystem for, Okay, how can we actually do this?

[00:40:14.52] 

Ordinarily, if you want to have a market discover the price for a thing, maybe you use some auction mechanism or something of that sort. But I don't have good ideas here. Just reiterating the problem that's been discussed.

[00:40:37.45] - **Jon**

I think a subproblem of that is the unfortunate perception that the ZSAs are constantly 95% ready. As far as we're concerned, the fees, if you do them in the trivial way, ZSA is ready. But if you do decide to have a more advanced mechanism that actually goes into the content of the assets and which assets they are and has some logic, then we might end up needing to implement this and face again with the question of, Okay, who does it? When is it ready? How's the auditing, et cetera? I think there's also an incentive to start keeping the benefits of what was developed.

[00:41:39.33] - **Dodger**

I think for me, a key question is, is this a problem that other blockchains who allow people to issue assets on that blockchain have experienced. When I look at things like Ethereum, Solana, et cetera, it doesn't seem to me like there's a problem there. It seems to be the opposite, that the ability to issue assets and NFT and tokens and whatnot on top of those platforms is beneficial because it attracts more users, results in more transactions, therefore more transaction fees.

[00:42:24.35] - **Jon**

The argument is still valid that for blockchain that has a significant dev funds, which like Zcash, we are still in the process of funding lots of development, and that funding goes from ZEC rather than from the hidden assets that are in ZEC. In Ethereum, there's much less, or Solana, there's much less of that process of significant dev funds going out of the holders of their the underlying asset. But the pro-argument of this increases use and therefore the value, it's just a little bit unknown. That's the problem.

[00:43:15.56] - **Kris**

Yeah, I was just thinking in terms of in Ethereum, you have a fee market, and one of the things that plays into that fee market or that it plays into the fees of publishing smart contracts is essentially the cost of chain storage, effectively, of storing chain state is what you're paying for when you pay ETH fees to launch a smart contract.

[00:43:53.00] 

So maybe it's just perceptually then that there is a cost proportionate to the load that you're inducing on the chain because you're paying a fee that is proportionate to the cost of maintaining the state for the smart contract, and then you're paying fees to interact with that smart contract that are based upon the fee market. I guess just a bunch of dimensions to it, but I think that the problem has been worried about and that may or may not be a problem is the top heaviness problem. So if, for example, the value of assets secured by the Zcash chain become substantially greater than the value of the entirety of circulating ZEC, then you have potentially significant economic inducements to attack the chain.

[00:45:02.58]

And that since the value of those additional assets are not They're not reflected in the cost to attack the chain that you have problems. I don't know whether proof of stake or a hybrid proof of work proof of stake makes this better or worse. There's just a bunch of unknowns. With Ethereum, they haven't really had to worry about that because there have been no assets issued on Ethereum that individually are worth more than ETH. And so they haven't had any top heaviness yet. And I'm not sure that there are any chains where top heaviness has occurred. So maybe it's the sort of thing where certainly at first, the Zcash chain will not be top heavy, and it's something that the community can watch and worry about over time.

[00:46:22.14] - **Dodger**

I think that's squirrel makes a point that for a while, Maker was worth more than ETH. Instinctively, my gut feel is that one of the reasons that none of the assets issued on the Ethereum blockchain are worth more than Ethereum is because the value of Ethereum accrued in large part because of the ability to issue assets on top of Ethereum.

[00:47:12.01] - **Jon**

There's a scarcity of Ethereum itself, where many successful assets are trying to change hands. You're competing for a place in the block to create a transaction. 

[00:47:37.54] - **Dodger**

Well, hopefully, I feel like once the current focus on getting NU6 deployed on test that is over and done with. Then we move on into the testing and auditing phase. I think that would be a good time to see if we can flesh out this issue. And and see if there is an emerging consensus around how fees should be applied to ZSAs.

[00:48:12.29] - **Jon**

Connecting to the previous talk, if there's any chance that something more sophisticated than Vanilla consensus fee emerges, then It's better to know this very early so that that doesn't become another delaying factor.

[00:48:41.04] - **Dodger**

I think that's one of the reasons why I think it's important to distinguish between an objection because somebody has concerns about something versus a counter proposal. If the counter proposal is simply don't deploy ZSAs, then that's a straightforward question that we can visit the community and see what their sentiment is.

[00:49:06.23]

But I think the key thing is to see whether there's the emergence of an actual counter proposal. Also to probably express the sentiment, as Kris highlighted, that we can deploy ZSAs, and if the problem of top heaviness emerges, then we can act at that point. And hopefully, going forward, obviously, ZSAs won't be deployed until Zcashd is deprecated. So at that point, it'll just be Zebra, a single, back to a single node implementation, which obviously has its cons as well. But at that point, the nature of Zebra should make it far easier to rapidly deploy consensus changes to adapt to a adverse circumstance if a top-heavy situation emerges.

[00:50:13.35] - **Kris**

My hope with respect to the future of zebrad is that there are actually multiple forks of zebrad so that the community does still have to come to a a consensus at the protocol layer as well as in terms of node implementation. There may be trade offs and advantages to having different organizations responsible There are different forks of zebradthat all implement the same consensus protocol.

[00:50:54.55] - **Jon**

I have another topic. If one or two minutes, something interesting that I saw here. There's a group that organized the digital protests in Russia and in Iran using biometric passports. It's something called the Ramiru or Ramiro. I'm mispronouncing the name, but they basically use zero-knowledge proofs to demonstrate that the person holding the passport of a certain nationality has voted in a shadow election once, and they can show that the citizens of that jurisdiction think in a certain way, maybe not aligned with the official results of a vote.

[00:51:52.45] 

It was more a demonstration. It's like alpha software, but the entire thing is It's out there, open source with apps. It's a very interesting application of zero-knowledge proofs. It's not the first time that people try to do things with passports, but this one actually went all the way to organize this fake elections in these jurisdictions. I think it's something to note, to observe that there's already out there people using government issued cryptography to subvert it for their own uses. It's really interesting.

[00:52:48.23] - **Dodger**

Is this potentially a way of bringing Sybil resistance to an entirely anonymous governance mechanism?

[00:53:03.48] - **Jon**

I think we'll see something like this. There's going to be examples of this, probably in Ethereum first, with possibly some DAOs or some urgent governance that they need. They've been talking about this soulbound tokens and the ability to distinguish people for a while. But now that technology is is starting to be tested with this biometrics. I don't know if it's a solution. I don't know what the problem is, but I'm not sure it's an actual solution for Zcash. But it's probably relevant in the long term to the ecosystem.

[00:53:55.31] - **Dodger**

In any governance mechanism where you to have pseudonymity or anonymity, sybil resistance is a key challenge where you want to avoid a situation where a single person can vote thousands or hundreds or millions of times and therefore, skew the results in a way that aren't genuinely representative of the population being being polled. That's one of the key challenges that we've faced in how we allow people to preserve anonymity, whilst at the same time avoiding or maintaining sybil resistance.

[00:54:42.58] - **Jon**

I think it allows consent on how much you allow ponderation of whales. It becomes a parameter in the equation rather than being left as an unknown. But again, whether it's a problem or not is not really clear.

[00:55:14.22] - **Dodger**

We'll reconvene in a couple of weeks, hopefully by which time we'll have activated NU6 on Testnet. But for the time, the next meeting will be in the earlier time slot as well, 15:00 UTC. But for now, thank you, everybody, for joining us. And let's keep our fingers crossed for a successful and rapid activation of NU6 on Testnet.

____


### Attendees

+ Daniel (decentralistdan)

+ Jon (QEDIT)

+ Alfredo Garcia

+ Amber O'Hearn

+ Conrado Gouvea

+ Jason McGee

+ Kris Nuttycombe

+ Marek Bielik

+ Brian M

+ Elise Hamdon

+ Michael Harms

+ Mine ZKP

+ Oleksandr Putyak

+ Zero Dartz

+ Zooko

+ Andrew Arnott


**Next Meeting Scheduled: 15:00 UTC August 22nd 2024**


___
___



