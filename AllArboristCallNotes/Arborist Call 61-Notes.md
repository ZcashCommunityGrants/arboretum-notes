# Arborist Call #61 Notes

Meeting Date/Time: September 21st 2023, 15:00 UTC

Meeting Duration: 1 hour 15 minutes 


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Update - [Zebra update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#1-zebrad-status---zebra-update)

+ ECC Core Update - [Mobile SDK -rc 3 / Zcashd updated binary](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#2-ecc-update---mobile-sdk--rc-3--zcashd-updated-binary)

+ Research & Implementation Update - [FROST audit / planned community call](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#3-research--implementation-updates-i---frost-audit--planned-community-call) / [TFL Research / Snap-and-Chat design](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#3-research--implementation-updates-ii---tfl-research--snap-and-chat-design) / [ZSA circuit optimisations / issuance curve / wallet support](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#3-research--implementation-updates-iii---zsa-circuit-optimisations--issuance-curve--wallet-support) 

+ Open Discussion - [Zebra wallet support / ZIP editor update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#4-open-discussion-i---zebra-wallet-support--zip-editor-update) / [Network Upgrade Process](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2061-Notes.md#4-open-discussion-ii---network-upgrade-process)

Video of the meeting: [recorded]


Moderator: Aditya Bharadwaj

Notes: Jason Rogers


___



## Full Notes


___


### 1. Zebrad Status - Zebra update 

[02:58] - **Marek**

I'll do the update today. So in the last two weeks, we basically finished the support for the spend-before-sync for lightwalletd. We're about to merge one additional PR with tests, that will basically conclude the work on that.

[03:30] 

Next we plan to start working on a new project that will include support for a wallet in Zebra, our initial plan is to start with implementing scanning for sapling viewing key, basically. that's all I had.

[04:01] - **Adi**

Thank you for the update. Are there any questions?

[04:07] - **Kris**

I have a question about that. So I would encourage you to take a look at the Zcash client backend project, because in terms of sapling scanning, rather than reimplementing it, it would be really good to adapt the scanning code that we have in there to make it suit your use case.

[04:37] - **Marek**

Thank you. I think Teor mentioned that in our previous call that this thing exists.

[04:45] - **Daira**

Does that code support scanning Orchard as well?

[04:48] - **Jack Grigg**

Not yet, but that's a future work item for us.

[04:56] - **Kris**

Yeah, for us and whoever is interested in implementing it because it would be nice to collaborate and not have redundant effort in this sort of thing.

____


### 2. ECC Update - Mobile SDK -rc 3 / Zcashd updated binary 


[05:25] - **Jack Grigg**

I can cover Zcashd. Update there is that we will be having an update out in probably next week or two. There's a few existing things that we'd merged into there a while back. We've obviously not been focused on Zcashd work in the last month or so because we've been focused on the Wallet SDK.

[05:48] 

But we need to get an update out for that because existing nodes are going to be hitting expiry soon. So we will have an update out for that pretty soon. I think the biggest thing that changes in it is that we no longer require the proving parameters on disk. Yes, everything gets bundled now other than the Sprout data, but we don't support making Sprout transactions in Zcashd anymore, so that will be out soon.

[06:29] - **Kris**

Okay, as far as the Wallet SDK updates go, we are now in the release candidate period for both the iOS and Android Wallet SDKs provided by ECC. We have a release candidate three out for iOS, and there's a release candidate three for Android that is being deployed as we speak. So it should be fully available on [Mavencentral](https://mvnrepository.com/artifact/cash.z.ecc.android/lightwallet-client) in the next couple of hours.

[07:02] 

We've been going through this process for a bit over a week now, just iterating finding bugs. The release candidate process has been going really well. We've been getting good engagement from our wallet partners. They've been testing stuff and finding issues that we needed to address and provided that no additional errors are found, we're planning a 2.0.0 final release on Monday, so things are really going quite well there.

[07:42]

Beyond that we have a bunch of additional wallet updates queued for after the 2.0.0 release that we're going to work on. We'll be prioritizing those as well as doing any additional triage once the release is final. But hereafter I expect that releases of the SDK's will become much more frequent because we're going to be able to work in much smaller increments, which is going to be great.

[08:15] - **Daira**

Another thing to note is that this release will not include ZIP-317 fees, but probably the next release after that will this release will use a fixed fee of 10,000 zatoshi? Yes, that's right.

[08:45] - **Zooko**

I wanted to add thanks to our wallet dev partners like Nighthawk and also Edge and Unstoppable for doing a whole lot of good testing and feedback on the SDK.

[08:58] - **Kris**

Yeah, that's been fantastic. This has been really good in terms, and I hope we're able to continue this in the future with having a real release candidate process that allows us to shake out issues before we put things out. So it's been great thank you.

[09:19] 

i have a quick question about the Zcashd update. So Str4d, regarding the parameters not being bundled or being bundled, what is the exact difference from how things worked before?

[09:39] - **Jack Grigg**

On previously you had to run Zcash, fetch params or whatever it was, depending on your script to download those. You will not need to do that anymore and you will be able to delete the old files off disk. So Orchard has always just generated its parameters on startup because it can do that because it doesn't have a trusted setup. What we are now doing is we have bundled the Sprout verification and the sapling proving and verification parameters into the Zcashd binary.

[10:19] - **Adi**

Does that increase the size of the binary?

[10:22] - **Jack Grigg**

The binary does increase as a result of this. So we've essentially moved them into the binary so that they are now a unified part of that rather than having them separately. The older separate API made sense when you considered like the Sprout even post Sapling upgrade. When we shifted Sprout to groth16, its proving parameters were still like a gigabyte in size.

[10:45] 

Whereas now the largest component of these is the sapling spend parameters, which are about 50 megabytes. The Zcashd binary has generally been well over 100 megabytes. If you've built it from source, because you have all the debug symbols, the releases have generally been smaller than that. So now essentially, you're paying the same cost in disk size you're just now it's simpler as part of a single binary rather than needing to coordinate with the params on disk.

[11:15] - **Daira**

And remember that on low memory systems, if they have swap and they're not creating proofs, then that will generally be swapped out.

[11:27] - **Adi**

Got it. So do we have a rough idea of how large is the new binary?

[11:34] - **Jack Grigg**

I don't have one to hand. If you take the existing release binaries and add about 16 megabytes, that's going to be approximately the right ballpark.

[11:53] - **Adi**

Thank you.

[11:54] - **Jack Grigg**

But I can give better numbers offline.


___


### 3. Research & Implementation Updates i) - FROST audit / planned community call 


[12:00] - **Adi**

Okay, I see no other hands or questions. So let's move on to research and implementation updates from FROST.

[12:12] - **Conrado**

So recently we got FROST audited. So we made the fixes to address the findings, which were medium or low. So we sent that back to NCC, they reviewed it and they just sent us the final audit report where they confirm it that everything has been fixed successfully. We are just reviewing the report and probably it's going to be published soon, so that's good.

[12:45] 

Recently we've been working polishing the crates. Something that we did is we added default byte oriented serialisation because when you use FROST, you need to serialise structs to send between participants and we support Serde, but we don't enforce any particular encoding because each application may have their own requirements. But someone pointed out that it would be good to have at least a default one. So we basically selected one particular serde encoder, [postcard](https://docs.rs/postcard/latest/postcard/) I think.

[13:27] 

We are defining that as default. So we don't need to actually import Serde, you just need to call serialise functions, but internally that will call Serde and use the postcard serialisation which is super simple. So I think that would be helpful for most implementations who don't have any particular constraints on encoding they can just use that and that may make them easier to interoperate.

[13:56] 

And yeah, we're finishing some refactoring to prepare for 1.0.0 release candidate. So now we're really looking forward for feedback from people, things like if they think is the API is okay. Do people believe there's something needs to be changed before we can do the final 1.0.0 release?

[14:19] 

Other than that, I started looking more into ways to actually deploy FROST because as I mentioned before, the tricky part is the communication, allowing wallets to communicate between themselves. So I've been looking to it, it's kind of tricky. Networking is hard. I am still studying this and hopefully we also want to have a community call probably on the first week of October where we want to gather requirements, feedback from wallet developers, especially on how these things could work in practice. Because just for example, are people expecting to use FROST synchronously? Like everyone comes online and do FROST or do people to expect it to work asynchronously so this kind of stuff we need to figure out before proceeding with a possible solution to address communication.

[15:31] - **Adi**

So which is the best place for folks to follow updates on FROST? Is there some GitHub where we can see the release information?

[15:40] - **Conrado**

Yeah, we have a repo, [ZcashFoundation/FROST](https://github.com/zcashfoundation/frost) where all the crates are there. Each release there's a changelog, so you can follow that to see what's going on & what we're working on, recorded issues, the GitHub issues, you can also look into that. Also we are switching to GitHub projects which can also be useful for people to know what we are working on at the moment. Everything is on GitHub.

[16:22] - **Daira**

So this is not about FROST. It was asked how big the Zcashd binary is with that change to include the parameters. So I make it just compiling. The current main is about 73 megabytes. It's 100 megabyte larger with debugging and simple information. That's not using the official process that we use to create the release binaries. It's just running strip minus s.

[17:08] - **Dan**

Yeah, I just wanted to confirm that that FROST call that Conrado mentioned will be Thursday October 5 at 18:00 UTC. So that's directly following the Light Client Working Group call that day, and I'll send out information and tweet about it and send invitations shortly.

___


### 3. Research & Implementation Updates ii) - TFL Research / Snap-and-Chat design

[18:35] - **Adi**

So let's move on to the sustainability fund. Who do we have for this update?

[18:47] - **Dan**

It doesn't look like we have anybody from Shielded Labs or Equilibrium on the call, but I'll keep an eye out.

[18:56] - **Adi**

Okay.

[18:58] - **Daira**

Yeah, the review has been sort of trundling along of those ZIP's, but I think nothing substantive done.

[19:12] - **Adi**

Okay, yeah we did have a bunch of ZIP editor updates. We can maybe talk about that in the open discussion. So maybe let's go over the Trailing Finality. Do we have Nate?

[19:26] - **Nate**

Since last time we've been looking into this question of if this design splits the security budget.

[19:40] - **Daira**

We is Nate and me, by the way.

[19:43] - **Nate**

Yeah, and the [ebb and flow paper](https://eprint.iacr.org/2020/1091.pdf), which is sort of the primary resource we're using for coming up with a design and reasoning about it. It only uses kind of a common, simplistic security analysis for BFT protocols. So it just assumes less than a third of the nodes are malicious and then if that's the case, these properties hold.

[20:16]

That isn't as thorough or it's not as thorough of a security analysis as I would feel good about for our TFL proposal. Meanwhile, while we were digging into that, we started thinking more about how do we actually design Tralling Finality to follow the paper explicitly? And the paper is fairly high level and glosses over some things. In particular it does this thing called log sanitization where you have these two subprotocols. In our case, we want to use proof of work and proof of stake and the proof of stake protocol that would be providing finality is sort of taking snapshots of the proof of work ledger and then to figure out what is final, you sort of merge these snapshots. In the paper it just says if there's duplicate transactions, you just prefer the first one that appears in the snapshots.

[21:29] 

So it just says that kind of as an aside but when you think about it, that introduces a fair number of complications. So what that would mean is if there's a proof of work rollback that undoes transaction A and then includes transaction B, that is a double spend of A. So it's spending some of the same inputs. Then in proof of work you would then prefer B because A rolled back. But in this scheme A would be finalized, not B. And so that complicates a lot of the transaction reasoning. So when we start thinking about okay, well how do we make transactions coherent with this sort of scheme? We realize the proof of work component needs to have some awareness of the finalization which isn't really clear or maybe even overlooked in the ebb and flow paper.

[22:32] - **Daira**

I think it's actually a bug because if you need to be able to spend outputs from the finalised chain before the finalisation point, which you obviously do, otherwise there's no point, then they completely miss the fact that you have to change the consensus rules for Pi rc which is the longest chain protocol. I think it's just an error in the paper to be honest. But it's fixable.

[23:00] - **Nate**

Yeah. So we started digging into ways to address that. However, I think resolving that really well will take a bit of time and instead what we want to do is sort of do a release. So kind of do a write up of what we've figured out and what the open issues are and update the [TFL book](https://github.com/Electric-Coin-Company/tfl-book). So it's just an MD book where we're sort of doing iterations on the design and the analysis as we go. So we're going to do a release of that and describe all these issues.

[23:43] - **Nate**
So hopefully by next Arborist call I can point to that release and then people can go there for a much more thorough description of what we're talking about. If you're already curious though, you can look at the issue tracker there and I would say a lot of what we're discussing is either on that issue tracker or in some Hackmd's so it's sort of spread around, if you wait two weeks we'll condense that. 

[24:17] - **Daira**

I have already a write up of it which is pretty thorough. I concluded that we need actually an extra property of the ebb & flow security model called finalisation availability and that will solve the problem that we were talking about and some other problems simultaneously. So hopefully I can have that written up.

[24:41] - **Nate**

Yeah, and also at a high level if you don't care about the weeds. We're still fairly confident that this kind of approach is viable because it's what Ethereum is doing right now. So there's a very large in production bounty on security flaws with that. So what we're aiming for is roughly the same and we know it is apparently feasible in production. So it doesn't seem like this issue specifically is a total blocker, but it is something to be resolved.

[25:18] - **Daira**

Yeah, I think Ethereum 2.0 has a finalisation availability as I'm going to define it. So that makes sense.

[25:26] - **Nate**

Yes, then aside from digging into the sort of analysis stuff, we're also doing more roadmapping. What we're planning to do as soon as possible is just start writing code that sort of simulates the design so that we can start simulating different attack scenarios or different security properties because we want to get started earlier with code rather than later. So it's sort of evolving as the design evolves, but that's going to be further out, 4-6 to six weeks or more. So that's the update. Any questions or comments?

[26:13] - **Adi**

Thank you for your update Nate and all the diligent work on the Trailing Finality. I have a couple of points. So you mentioned the issue tracker, do we have a link to the website where we can track issues on this?

[26:28] - **Nate**

Yeah, let me post that: [https://github.com/Electric-Coin-Company/tfl-book](https://github.com/Electric-Coin-Company/tfl-book)

[26:47] - **Adi**

Thank you. So later Jason can share it in his notes as well. The other question I had was around the duplicate transactions that you mentioned. So what are duplicate transactions exactly? Is it like a double spend with a different TXID or the same TXID being caught by proof of work and proof of stake finality?

[27:18] - **Nate**

If you just imagine a proof of work node, and it has a sequence of blocks, but it has selected as the best chain and each block contains valid transactions and they can refer to previous transactions to spend their outputs. Now imagine there's a rollback, so there's a new proof of work chain that's better, so it's longer/heavier and it reverts some of the recent blocks.

[27:57] - **Nate**

So this new one is also self-consistent. So each one is self-consistent, but the difference between the two - so the new chain may have many of the same transactions, but it can also have transactions that would be conflicting with the other chain as long as each one is self-consistent. So what the Snap-and-Chat design, which is in the ebb and flow paper which is our inspiration for Trailing Finality. What that does is basically the proof of stake nodes are just taking snapshots of the proof of work chains and finalizing the snapshots. So that means if there's a rollback, there would be two snapshots. The earlier one has the original proof of work chain, the later one has the new chain, so it has that rollback.

[29:00] 

So those two snapshots together can contain either duplicate transactions or conflicting transactions. So then there's something called sanitization to select which ones are the official transactions for finality. Does that help clarify?

[29:18] - **Adi**

Yes. That raises another question. Which is when a hybrid proof of work and proof of stake models are considered to work, is it going to be like 50% mining hash or 50% of the transactions will be handled by proof of work and the other 50% by POS? Or will POS only be used for finality and it'll still be a proof of work chain?

[29:40] - **Nate**

Yeah. So in the TfL design and Snap-and-Chat, which is this theoretical design, the dynamically available subprotocol, which in our case will be proof of work, is responsible for bundling the transactions into blocks. Then the other protocol, which in our case will probably be some proof of stake protocol, it's only responsible for finalizing the transactions.

[30:15] - **Nate**

The complication that we're discussing here is just that, one way to think of it is you can't just look at the proof of work blockchain and say, "this block and everything prior is final." Instead you have to have a more complicated picture of which transactions are final. But proof of work is still responsible for generating the initial blocks.

[30:46] - **Daira**

For the time being. This construction only requires that you have a finalization mechanism using a BFT Byzantine fault tolerant consensus protocol and a dynamically available protocol. So dynamically available in this case means that the dynamic means that nodes can join and leave the network and available means that it has a liveness property so the chain continues advancing. So any dynamically available protocol can be used for that component. And there do exist dynamically available proof of stake protocols.

[31:35] - **Nate**

Ethereum has roughly the same thing, but it's not exactly Snap-and-Chat but it's fully proof of stake. In our case, for the dynamically available component, we're going to keep using the existing proof of work.

[31:49] - **Daira**

But that may be a stepping stone.

[31:52] - **Nate**

Right, later we might be able to swap that out or something. And then part of your question was something about 50%. We don't know anything yet about how the Issuance gets spent on mining versus proof of stake, but I kind of have a guess that it may need to be 50/50. If the security cost of attacks is the minimum of the two security budgets, then they would need to be the same.

[32:29] - **Daira**

I don't think that the BFT protocol and the heaviest chain protocol are equally efficient in terms of how they use security resources. So that means that in principle, a different split between them could be optimal.

[32:46] - **Nate**

Yeah, so that was my guess. And it very low confidence because as we're learning more about it, as we learn more about the security, we'll realize more about the security budget and in particular the sort of things Daira was mentioning about finality availability - like the two subprotocols might be more coupled and so the security of each will be more related. And therefore it may not just be a simple case of you can attack one or the other independently.

[33:24] - **Daira**

Yeah, and for other reasons that we talked about before. It's necessary in practice for nodes to participate in both protocols and in particular block producers. You could have part of their reward be associated with mining a block and part of it from participating in the BFT protocol. And so they would end up with a similar reward in the end. But they're just participating in two protocols, maybe, not entirely sure. 

[34:06] - **Adi**

Thank you for all the detailed updates. I know it's very early stage ideas, but it's good to know where we are heading. One more thing that comes to my mind is, if we have a vision of going fully proof of stake in the future, how will we move on from having equal budgets for each to directly 100% to POS?

[34:28] - **Nate**

Again, that's all unknown. So what I said about equal budgets, that's just a guess with really low confidence. So we've got to figure out what are the budgets and then what would a transition look like? We know Ethereum did a transition.

[34:45] 

There was also some amount of pushback from miners I believe, and that may be unavoidable. So one principle I have in mind is just to make sure miners have a fair amount of heads up so that we're kind of being fair to them, but also we don't want to extend it too long on their behalf. So there's sort of a balancing act. But another thing I'm kind of hopeful for, and maybe this is wishful thinking, but there's some way that is natural for them to sort of migrate their operations as the protocol is evolving to keep them engaged. Because whenever we have engaged users, if we can keep them engaged even if they're sort of shifting their role, to me that's valuable.

[35:40] - **Daira**

Yeah, and that fits in with what I was saying that potentially block producers could participate in both protocols.


___


### 3. Research & Implementation Updates iii) - ZSA circuit optimisations / issuance curve / wallet support


[36:10] - **Vivek**

We have a few updates to give on the ZSA project. The main thing that we've been working on the last few weeks has been on the circuit, the optimization. So basically our unoptimized circuit went beyond 2^11, which is like 2048 gates and so that's caused an increase in a lot of the parameters for the proof.

[36:46] - **Daira**

Rows, not the gates.

[36:49] - **Vivek**

Yeah. Sorry, Rows. So, yeah, we've been working with Daira and Str4d on optimizing, improving certain parts of the circuit and getting it down largely to just below 2048 rows so that we'll be back in the good side of the size of the proof and the other parameters from our team for working on that.

[37:27] - **Daira**

We were seeing single digit overheads of doing ZSA's even without that optimization. So it's entirely feasible.

[37:44] - **Vivek**

Yeah. And basically shout out to Constance from our team who's leading that optimization [].

[38:24] 

We are also looking at the Zebra implementation and connecting that with [].

[38:35] - **Adi**

Yeah, your audio was echoing a bit. Would you mind turning off your video?

[38:50] - **Vivek**

So we've basically been looking at working with the Zebra node and getting our ZSA work on that and we are looking at connecting with Wallets and things like that so that we can start with the experimentation on the Zebra node for ZSAs.

[39:13] 

The other thing we've been doing is that so far we had the changes that we had made for ZSAs were just on top of the v5 transactions. So we are working on creating new data structures for the v6 transactions and shifting all our changes in there. So that's like one step towards integration for NU6 and things like that.

[39:38] 

That's on the implementation side. On the ZIP side again, for the v6 transaction, the ZIP editors had opened a new, ZIP-230 I believe for the v6 transaction format. So we've started filling out those details for Zcash, shielded assets in there and I think Daira's had a preliminary look at it so far, I think so far it's just a PR on our repo, but I'll switch that to a PR to the ZIP's repo soon enough.

[40:16] - **Daira**

Yeah, it's [PR 687](https://github.com/zcash/zips/pull/687) on Zcash, ZIP's is v6 transactions and yes, it's ZIP-230.

[40:28] - **Vivek**

Other than that, on the ZIP's and implementation both, we discussed switching the Issuance authorization signature. We've initially been working with the redpallas signature without rerandomization. So we've decided to move to the bitcoin Schnorr signature over the secp256k1 curve. So one reason for that is that it's standardized in BIP-340 and likely to have good HSM support and we want to also be as independent of the Orchard parameters and curves and so moving away from pallas in that place seems like a good thing.

[41:27] 

I think a lot of that work has been done in the FROST crate already, like for the secp256k1 curve and the FROST implementation for that. So we are planning to reuse those details that have been implemented as much as possible. That's work in progress, like updating the ZIP and adding that implementation to our ZSA updates. Yeah. On the asset swap side, we've created a preliminary document for the ZIP design that good portions of it are complete. I think we are still ironing out a few kinks in the complete design.

[42:13] 

And we've been discussing that as well when we've been having our meetings with the ECC and Zcash Foundation folks. Yeah, I think those are my updates for now. 

[42:49] - **Nate**

I was curious for the asset swap portion, what kind of product validation we're doing. The ideal in my mind would be we know one or more folks who are interested or planning to build some sort of swapping product or tool. There's kind of a tangent to this question is to ask or to recommend if you've looked at the designs in Penumbra around DEX stuff? So I think that stuff is probably way too complicated for what ZSA's might want to aim for for v1, but it might give some ideas about future directions to go. So I guess 2 part question; are we talking to any product people working on swap products? And are we looking at Penumbra or other shielded DEX design projects?

[44:08] - **Jon**

Yeah, just on the second part of the question, we've seen the designs and the implementation of Penumbra already at the stage of preparing for the asset work. One of the things there is that there's so much with this topic, you can have asset swaps be something very simple or very complex, like an order that is partially fulfilled or things like that. So we're trying to cover and at least understand what are the categories that we need [] something we're not touching. 

[45:15] 

So what I'm saying is we're trying to find the categories of work where we can learn from Penumbra and from other places. And if we're not going to do them, we at least mention 'this exists but it's out of scope'. So Nate you're right, the v1 is attempting to deliver something tight and not the full shabang for the product people. So we don't have product people in our team taking ZSA as like, a black box and using it, we don't have that. It would be interesting if you know of those people. We've been put in touch with people interested in ZSA for stablecoins, but today it doesn't drive the development. So if you have ideas on that, happy to loop them in.

[46:27] - **Adi**

That's good to know and was there a second question as well?

[46:33] - **Daira**

Yeah, so my question was directed the people in ZF working on FROST crates. So I know that the draft RFC. The Internet draft includes secp256k1. So the crates that you were developing for randomized FROST in Zcash that currently only has redjubjub and redpallas. So I assume it will be relatively easy to extend that crate to include secp256k1? Even though I think we don't need randomization for issuance signatures.

[47:19] - **Conrado**

Yes, the FROST pack does specify a cipher suite with the secp256k1 curve, but it's not compatible with Taproot because Taproot has some weird unique differences which are not tricky. Starting from that cipher suite is not difficult to do a taproot one. Stuff like the Y coordinate must always be odd, stuff like that. So, yeah, it doesn't work out of the box but it shouldn't be difficult to adapt. Out of curiosity, our rerandomized implementation is generic so you can do rerandomized FROST with secp256k1 if you want to, but yeah.

[48:11] - **Daira**

Okay, thanks. Yeah, I hadn't realized that the variant in the FROST draft was not compatible with the BIP is it 340?

[48:28] - **Conrado**

Yeah, 340.

[48:33] - **Adi**

Follow up question to that. Are there any discussions around having FROST support for the shielded assets?

[48:42] - **Daira**

I think we definitely want that in terms of the actual consensus protocol and the support. So ZSA's will only support Orchard, but it won't be a separate pool. The shielded assets will be in the Orchard pool. I am just assuming here it was designed that way and so it will still be using redpallas for that. Does that answer your question? Adi?

[49:20] - **Adi**

Yeah, but wasn't there update that they're trying to stay away from orchard's pallas curves?

[49:27] - **Vivek**

No, that was just for the Issuance signature. Because the Issuance signature is something that's going to be sort of like constant throughout, even going forward into further shielded protocols, while the transfer section is built on top of the Orchard protocol, as Daira said in the Orchard pool. So that will be Orchard specific. And at whichever time we decide to move beyond Orchard into some other curve and some other shielded protocol. At that point, it's designed in such a way that ZSA's will move to the other curve with the rest of Zcash.

[50:07] - **Daira**

No, not necessarily even another curve because it could be a post quantum thing that doesn't use curves, for example.

[50:20] - **Adi**

Got it. So that answers my question. I have Nate's hand up. Nate, do you have answers to your questions or do you have anything else?

[50:28] - **Nate**

Oh yeah, it's sort of a follow on. So back to ZSA's and product stuff, it seems like it would be a good idea to do sort of what the FROST project is doing, which is start engaging with wallet or front-end developers. Especially now that there's a working prototype, it would be really good if we can get wallet or front end prototypes. There we could start experimenting with the usability of swaps. If we can find anyone who can put effort into those prototypes that could be really good because then we could start getting validation, showing it to potential users and being like, Is this useful? Is it confusing? How can we improve it? So it's just a recommendation.

[51:39] - **Jon**

So just a comment on working prototype. We showed in Zcon4 a demo of how to use the capability. But this was on Zcashd and now if you want to have people to start playing with it, they probably need to wait a bit until we catch up the same capabilities with Zebra because the current status is we're almost there, but we're not there yet to be able to reproduce what happened in Zcashd with Zebra and we all move to Zebra.

[52:18] - **Nate**

Yeah.


[52:22] - **Jon**

As soon as we reproduce the capabilities of the early prototype, then you're right, we should put it in the hands of people.

[52:34] - **Nate**

Well, I realized thinking about, okay, how could we go about building a wallet prototype? I don't necessarily recommend this as the fastest way, but kind of the obvious way is to also prototype out all of the lightwalletd and rust SDK support that go into the current production wallets. We might also want to think about, can we prototype a UX that may not be as feasible in production, but it's just faster to make a UX just to get the user feedback? I'm not sure which route would be wiser, given our resources.

[53:22] - **Adi**

Yeah. Thank you for sharing the idea, Nate. I do agree, having early on discussions on use cases, we had it planned for our roadmap for the Nighthawk and my team. I'm sure there are other community members having their own use cases to be shared as well.

[53:38] - **Daira**

Given that Zebra doesn't have a wallet yet. We heard that they're just implementing scanning for the time being. But it seems like the existing wallet SDKs are the best chance for getting ZSA wallet support done.

[54:04] - **Jack Grigg**

And something that I had pointed out previously is that so the wallet SDKs do not have Orchard support currently, orchard support is something that I want to see in there, like, relatively soon. Which has been blocked on getting the rest of the SDK stuff out. But for the Zcash lightclient crates which need Orchard support there, the act of adding orchard support to those could also be the process where temporary experimental support for ZSA's is added as well. So if someone working on that would be able to sort of hit 2 birds with 1 stone potentially.

[54:51] - **Daira**

We don't want Orchard support in the wallet SDK's case to block on ZSAs. But that doesn't mean we can't think about what the APIs need to look like to support.

[55:06] - **Jack Grigg**

Right and my point being is that might be the fastest way to something that then is compatible with Zebra in terms of someone extending something with a ZSA wallet if they wanted to be able to immediately drop into a bunch of user facing wallets for experimentation.

[55:27] - **Adi**

Correct and as we heard from the Zebra update today, they are planning on working with viewing key support for the sapling pool only. So I'm not sure about their timelines on Orchard Wallet support.

[55:42] - **Daira**

If they were using Zcash client backend for that scanning support, then basically as soon as we implemented Orchard support in Zcash client backend, there might be a little bit more work to do on integration, but it would kind of mostly work.

[56:04] - **Adi**

Got it, yeah we can have this follow on topic continue next Arborist call as for use cases and product ideas for ZSA's.

____


### 4. Open Discussion i) - Zebra wallet support / ZIP editor update 


[56:16] - **Nate**

I just wanted to highlight. So there was a town hall I was in last week talking about future technical development and one big part of the discussion was, are there ways we can collaborate more? Also in my mind, we always have decisions between should we sort of put our focus and eggs in one basket or should we have different orgs trying different approaches? And I just wanted to highlight that for Zebra Wallet support, we have that same decision. So they could either sort of begin developing their own approach or put their effort into the Zcash Wallet backend crates and the Lightwalletd stack. And so that's just a choice I wanted to highlight.

[57:15] - **Jack Grigg**

There was a third option.

[57:21]

The third option, so Zebra ends up with something completely new and something separate & independent. Zebra focuses on the Lightclient backend stack or Zebra ends up with something that is compatible with the Zcashd Wallet in terms of sharing, implementation and backend things. Not to speak to anyone's individual priorities, but there are options that fit in the middle of those two extremes is what I'm pointing out.

[58:06] - **Daira**

Yeah, what I was going to say is that from a security point of view, it is a good idea for there to be at least one implementation of a full node wallet that doesn't depend on the Lightclient security model.

[58:25] - **Adi**

Okay, thank you for sharing the ideas. Anything else we want to discuss for the ZSAs?

[58:32] - **Pili**

Not about ZSAs, but I just wanted to say from the foundation, we're at a very early stage with planning this wallet work, so we haven't really made any decisions yet. We're going to start little by little implementing small bits of functionality and see how that evolves. But we're definitely open to hear how things go.

[59:22] - **Daira**

So I was just going to talk about ZIP reviews that have happened. There was a [proposal for a Zenate](https://forum.zcashcommunity.com/t/establishing-a-zenate-for-zip-governance-and-managing-zcap/45609/23), which is another governance body, and I made some technical comments on that in the forum and editorial comments about the conflict with ZIP-0 and the role of the ZIP editors.

[59:50] 

So that's in progress. The other main ZIP reviews that are in progress are ZSA's. There's the smoothing out the Issuance curve and the Sustained Royalty Fund ZIP's. There's the v6 transaction format, and in the background when I have time to do it there are some updates needed to the protocol spec. That's about it, I think, on the ZIP's front. And of course, Adi, welcome to the ZIP editors.

[01:00:33] - **Adi**

Thank you. Thank you for adding me.

[01:00:37] - **Daira**

Yeah, there are some editorial updates to ZIP-0 as well. So if anyone can review those, that would be good, as well as adding Adi.

[01:00:51] - **Adi**

Yes. I'm traveling a bit for the next week or so. I'll get as soon as possible back to the ZIP reviewing.

[01:00:59] - **Daira**

So just in case anyone isn't up-to-date, the zip editors are now me, Str4d, Conrado, Adi, and who's the other person from ZF?

[01:01:19] - **Conrado**

Teor.

[01:01:33] - **Nate**

Yes, well, it's a meta announcement because Zooko is at Messari Mainnet and planning to give a fun announcement. I don't know the schedule, so I don't know if that's happened yet or not. So I don't want to spill the beans, but stay tuned for that.

[01:01:57] - **Zooko**

It's tomorrow. 

[01:02:07] - **Kris**

Yes, just a small note. So the Zcash Android Wallet SDK release candidate 3 is now available from [Mavencentral](https://mvnrepository.com/artifact/cash.z.ecc.android/lightwallet-client). So for all of you Android Wallet developers, this rc fixes an issue that was discovered by the Nighthawk folks. So again, thanks to you all for adopting the rc and finding issues with it.

[01:02:33] - **Adi**

Great, thanks to share the update on the fast turnaround.

[01:02:37] - **Daira**

And that was the issue with some transparent transactions not being included, right?

[01:02:43] - **Kris**

No, that one was fixed in -rc 2. This one was an issue related. It was caused by a problem in how we handle errors across the FFI and essentially chain continuity errors were being reported across the FFI, but not being interpreted correctly on the other side.

[01:03:08] - **Adi**

I have a small announcement from my side. I'll be attending the Proof of Work Summit next week in Prague, as well as the Hacker Congress. I'll be handing out some Zcash merch that I have at those conferences. I can meet up with other Zcashers there who plans to attend. All right, next is any open discussion. We've had a long discussions for the ZSA's and Trailing Finality updates. Do we have other topics?


____


### 4. Open Discussion ii) - Network Upgrade Process


[01:04:05]

Okay, I have a general question, which is we have a lot of ZIP's in development and ideas being planned. Is there like, a timeline where we plan to incorporate these? Like, for example, we have the next halving coming up. So is there a plan to have some of the developments going in to be part of the next upgrade cycle? Or can these updates be shipped after the halvingor before? Is there any roadmap discussion around that? Maybe question to the ECC developers, zcashd being the primary?

[01:04:43] - **Daira**

That sounds like a question for Nate.

[01:04:49] - **Nate**

Sorry, ask once more.

[01:04:52] - **Adi**

So we have a bunch of ZIP's in development, new ideas, including FROST, ZSA's and other new changes to the protocol. What timeline do we have to ship this, considering the Halving coming up? So usually we have like a post upgrade and a bunch of new features shipped on a halving. So is there a timeline that we have? We want to ship these new developments?

[01:05:21] - **Nate**

Okay, so I don't have a timeline, and I had the understanding and hope that we could figure that out together, including the process. So it's been a while since we discussed this, but we had this intention to do like an NU5 retrospective and then also to come up with a new process to replace the network upgrade pipeline.

[01:05:56] - **Daira**

Which was mostly observed, it was never really followed.

[01:06:05] - **Nate**

Well. Yeah, I think part of that was like on ECC's front, we've been focused in this emergency mode on Wallet performance, which means we haven't been paying close attention to upgrade process or planning. But also the network upgrade pipeline v2 was always sort of an ECC invention that ECC was driving.

[01:06:35] 

Even though part of the intention was to keep the door open for other protocol contributors, it didn't work very well. Now that we actually have protocol contributors showing up regularly, it makes a lot of sense to me that we figure out as a group what the process is and that would help us figure out the timeline. So unfortunately, that's a lot of decision making. Both when we have a decision about what to do, like which ZIP's, but also what is the process at the same time, I think that can get messy. So I think we need to sort of separate those topics and focus on figuring out the process and then use that process to figure out the timeline for ZIP's. That would be my recommendation. I don't know how or who can drive this forward.

[01:07:38] - **Daira**

I think one of the problems with the the network upgrade pipeline is that it was trying too hard to define a fixed timeline, when in fact all that's really necessary is that you are sufficiently confident that each thing that's going into a network upgrade, has been securely implemented, is securely designed, has the confidence of the community that it's something that we want to include in the protocol. So I would like to see any future process not be so strict about timelines, to be honest.

[01:08:26] - **Adi**

Thank you for sharing those and I would add even the testnet phase. Right. We want to see these new ideas being out in the testnet for considerable time.

[01:08:37] - **Daira**

Absolutely. So that is something that can have timeline constraints because we want something to have been testable on testnet for some length of time before it activates on mainnet.

[01:08:53] - **Adi**

Perfect. I have Nate's hand up again.

[01:08:56] - **Nate**
Yeah, I mean, my one sort of bootstrapping recommendation is that we start regularly discussing what the process should be. So that might be a slot on Arborist calls that we check in on every call or every month. Or maybe we need to start another meeting series that's just all about upgrade process. Because I think it'll take multiple meetings to get things going and I don't think we should delay, I think we should start doing those meetings and discussions right away.

[01:09:30] - **Daira**

Totally agree.

[01:09:34] - **Nate**

The simplest thing is just add a slot on Arborist calls.

[01:09:38] - **Adi**

I support that. Yeah, more meetings is not good.

[01:09:41] - **Daira**

Yeah, sounds good to me.

[01:09:44] - **Nate**

But I'm curious what Dan might.

[01:09:49] - **Dan**

That's exactly what I was going to say. I think I can make that happen. We'll add a section to current arborist calls and that could be a way to bootstrap it, as you said and then if the time comes where we do have to spin it off for timing wise, then then we can do that as well. So starting maybe the next arborist call, we'll have a slot for network upgrade process discussion.

[01:10:16] - **Nate**

So I guess there's sort of an open call to everyone here or the broader community. If you have suggestions for the process, be ready to show up to that slot and raise your hand. Be like, here's a proposal, let's do X or Y. Otherwise I'm worried it'll be the kind of slot where we open the mic and note it's crickets because we need people to proactively bring proposals there or suggestions.

[01:10:52] - **Adi**

Great. Thank you so much Nate, for kickstarting this and sharing a solution. Thank you all for attending today's Arborist call and see you all the next Arborist call on 5th October at 21:00 UTC. All right, thank you. Bye everyone.


_____


### Attendees


+ Daniel (decentralistdan)

+ Daira Emma Hopwood 

+ Nate Wilcox

+ Kris Nuttycombe

+ Conrado Gouvea

+ Jack Grigg

+ Marek Bielik

+ Maria Pilar Guerra-Arias

+ Vivek Arte

+ Zooko AtECC

+ Andrew Arnott

+ John Bruhling

+ Matthew Watt

+ Oleksandr Putyak


**Next Meeting Scheduled: 15:00 UTC October 5th 2023**


___
___
