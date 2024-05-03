# Arborist Call #76 Notes

Meeting Date/Time: May 2nd 2024, 15:00 UTC

Meeting Duration: 1 hour 25 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - []

+ ECC Core Update - []()

+ ZF & ECC Zcashd Deprecation - []()

+ Research & Implementation Update - []()

+ Open Announcements - []()

+ Open Discussion - []() / []() / []()
___


Video of the meeting: [recorded]

Moderator: Pili 

Notes: Jason Rogers


___



## Full Notes


### 1. Zebra Update - Zebra regtest & zcash script updates

[02:04] - **Arya**

So since the last Arborist call, we've restored Windows support in Zebra by publishing a new version of Zcash script and updating zebra's dependencies, added more fields to testnet parameters like disabled proof of work, network name, genesis hash, made other changes to support regtest with NU5, like calculating the median time pass on the difficulty limit for short chains, skipping the slow start interval, and skipping checking if zebra is close to the tip before returning block templates.

[02:31]

A minimal version of regtest is now working on the params regtest branch, which will hopefully merge soon. We're almost ready to publish a new release, and it should be included there and we've also fixed a minor concurrency bug in the We had to get three state RPC method and increased the end of support time.

[02:53] - **Daira Emma**

How long did you increase the end of support time to?

[03:01] - **Arya**

I can't remember exactly.

[03:04] - **Daira Emma**

Okay. I'm just asking because it might be relevant to timing of a NU6. Presumably, it's not excessively long, but we will need to know what it is.

[03:21] - **Alfredo**

I think we increased it from 16 weeks to 20 weeks.

[03:26] - **Daira Emma**

Okay. I also have a quick question median time span. How do you calculate that when you are below 17 blocks in the chain? I believe that is well specified in the spec. Let me just go and look it up.

[03:43] - **Alfredo**

Okay. It's well specified in that we figured out how to specify the thing the Bitcoin core code just happened to do which I believe is just it does the median of the shorter range of blocks. It The code that looks it up just looks back to Genesis.

[04:28] - **Daira Emma**

Median. Okay, so when median is applied to a sequence of even length, the element that begins the second half of the sequence is taken. It's in 773. Okay.



____

### 2. ECC Update - Zashi 1.0 Android release / Crate refactoring 


[05:12] - **Kris**

The big news there is obviously that the Android Zashi 1.0 release has gone out, and we've gotten, I think, I don't know the exact numbers, but close to or perhaps over a thousand installs at this point.

[05:35] - **Daira Emma**

It was 1600 I think.

[05:38] - **Kris**

Okay. So of course, with a bunch of new users, we now have a few new bugs to look into. The most important ones are ones that are in the common wallet backend codebase. So we're currently working on triage of a couple of issues there.

[06:01] 

We also have been making forward progress on specification work with Arya's help for potential NU6 memo changes, and have also been working out some additional issues related to ZIP 315, which are essentially standards for wallet developers and recommended best practices for wallet developers. So, a bunch of wallet and a bit of protocol functionality related work going forward.

[06:41] - **Str4d**

There's also some ongoing work in the vein of continual refactoring of the rust crates. In the previous couple of breaking release changes, we did some refactoring of the sapling code, which was released earlier this year.

[07:03] 

In the last couple of weeks, we've been doing some work to decouple the, Sprout, Sapling, and Orchard, and transparent parts of the functionality in the crates from themselves, in particular to enable downstreams who only want to, for example, create transactions with one aspect of these can remove the rest of the dependencies out of their stack.

[07:29]

This will also then be beneficial for both enabling the upcoming transparent functionality that is required for a zcashd wallet replacement to be potentially separated from wallets that don't need it, that's purely shielded wallets, and also should hopefully ease future pathways towards deprecating pools.

[07:56] 

if we have better ways for wallets to migrate away away from supporting the older tech in their stacks. So there are, hopefully, the top-level transaction type change can be kept away, but some of the transaction creation pieces underneath are going to have some fun new states they can represent. I think everything else has just been going on and it's just minor our internal engineering work.


___


### 3. ECC & ZF Zcashd deprecation


[08:37] - **Pili**

So next up, we actually have a joint update from ECC and ZF on zcashd deprecation. Who can give us an update from the ECC side, and then maybe we can put in the gaps from the ZF side.

[09:04] - **Str4d**

Well, on the bits that I'm aware of, we have continued to fill out the [graph of things that need doing](https://zcash.github.io/developers/zcash-zcashd-deprecation-dag).

[09:18] 

We've had some discussions around the wallet architecture and getting some consistency on what the functional aspects of replacement architecture need to be. Then, as mentioned in the previous section, there's been some initial engineering work towards enabling the changes that need to be made for adding missing functionality to be added.

[09:51] 

I've also been resurrecting my scripts from 2020. I ran them in 2019 and 2020 for analyzing the distribution of P2SH scripts on the network, and I am rehabilitating those to make them runnable again, because apparently, when you don't touch a script for four years, a bit rots, who knew? To start on collecting more of the data that we need to feed into what things need implementing on the transparent side.

[10:25] - **Daira Emma**

I put a link to the zcashd deprecation tag in the chat. The other thing I remember was that we made a start on reviewing Sean's PR, where he had made a start on transliterating the Bitcoin script interpreter into Rust.

[10:51] - **Str4d**

So that is [Issue 1362](https://github.com/zcash/librustzcash/issues/1362) on the DAG, which if that can end up in a viable place it may subsume the current contents of the Zcash script great, for instance, which currently is C++ based.

[11:19] - **Daira Emma**

It's not strictly necessary, but it would be nice.

[11:22] - **Str4d**

Yeah. In the beginning, it would at least make sense. The thing that we're going that's going to be looked at there is doing not necessarily full-on fuzzing, but at least like prop test-based comparisons between what the Rust code is doing and what the existing C++ wrapped zcash script crate expects. Being able to provide incremental improvements to pin down the behavior that we expect from the transparent scripting back-end.

[12:02] - **Daira Emma**

Yes. Like I said, not a blocker for Zcashd deprecation because we can continue to use Zcash scripts in zebra. But it's really nice to have that functionality in Rust so that we can use it in the Zcashd wallet replacement work.

[12:27] - **Str4d**

For some of it, it may end up being necessary. That's still to be to be determined.

[12:33] - **Pili**

Great. Thank you. Alfredo, do you have anything to add from the foundation side?

[12:43] - **Alfredo**

Yeah. So our plan is in the short term, the Zebra side, is to move the Zebra scan crate we have inside Zebra to a separate the repo. Yes, we wanted to do that after we upgrade the dependencies we have with the ECC libraries, but that's becoming a bit harder than we expected. So we are not sure if we will move now or we will move after we sort that out.

[13:22] 

We will probably get started with that after zconV. The idea is to put the scanner function in a separated place. We are doing that planning with Str4d and the other ECC engineers to figure out if the indexer that we have to do needs to be inside that crate or in zebra itself. But we don't know yet. We don't have enough details yet. I guess we will have more information in the next coming weeks. Thank you for the zcash script, the research and getting started on that. I think it's going to be very useful. I'm really glad that this started the work in that.


___


### 4. Research & Implementation Updates i) Zcash Shielded Assets updates


[14:32] - **Vivek**

So this time we'll start with the ZIPs, which I haven't had an update on that in a while. But we did spot that we had not included the burn digest as part of the transaction ID digest and sync hash computation in our zips. We added that in and we made sure that that's the same thing in the implementation as well. So that's been one change the zips that has happened beyond just minor typographical changes.

[15:06]

We haven't opened a new pull request since the time that the older pull request was merged into and is available on the ZIPs website of Zcash. We'll open a new pull request in the coming days to have a track of and have comments on things that come up.

[15:26] - **Daira Emma**

When you noticed that, did you and check all of the other potentially affecting data to make sure that was also included in the hash?

[15:37] - **Vivek**

Yeah, it should be. I think we've covered it. That's for the zips. The other thing that we've been working on is backward compatibility. We've, I think, largely finished most of the work for the Orchard and Librustzcash backward compatibility bits. So Orchard is largely making sure that we can build the two different vanilla orchard and the orchard ZSA bundles simultaneously.

[16:11]

And I think in Librustzcash, it's mostly being able to handle v6 transactions. The part that's left is largely test vectors and I think some of the orchard vanilla tests that were there, we have to bring them back in and make sure those are working as well. Those are what we are working on now.

[16:30] 

When it comes to test vectors, we did some refactoring of the test vector repo as well because there was a lot of room for code reuse between what we've changed for ZSA and what already was there. We've done that and we've tried to clearly separate what we have added on in separate folders and stuff, so it should hopefully be easy to review when the time comes for that.

[16:55]

We've been working on Halo 2, and I think we've been having discussions with ECC pretty regularly, figuring out the generalizations that we've made, do we include it in Halo 2? Are they specific to the Orchard circuit and should We keep it in Halo 2 or make it specific to Orchard and things like that.

[17:18] 

So that's in progress, not as far along as the Orchard and librustzcash work. We've also begun to get cracking on starting a testnet for ZSA. That's pretty recent news. So we've only just got around to setting up a zebra node on an ECS instance and connecting to it locally and things like that. It's a good first step, but this is the whole making sure it works with ZSA that's yet to come. But stay tuned and hopefully in our next update, we'll have more to say on that.

[17:57] 

And finally, we have zconV next week. I see a number of nice backgrounds on some people's Zoom, so I have it on my foreground instead because I got the T-shirt. It's nice. We at qedit will be diving a bit more into all these updates and talking a little bit about the asset swaps design over there so looking forward to interacting with everyone there.

[18:29] - **Pili**

Great. Thank you, Vivek. Exciting news about testnet. So let us know if we can help out in any way with that. 

___


### 4. Research & Implementation Updates ii) FROST Demo Phase 3


[18:59] - **Natalie**

Yes. Conrado and I have just been preparing for ZconV. We're giving a talk on Thursday, the beginning of the conference. If anyone wants to come to that. So we'll be giving updates on a lot of the stuff you'll have heard and hear anyway. So we're currently working on the refresh share functionality, which will mean that if you can remove a signer without having to change your address, basically.

[19:48] 

We're about to do a release of version 2. We have some breaking changes due to some Rust components pilot changes, and we're adding the no std flag, which is not going to be on by default. I don't know how much I don't know if people know about that change. 

[20:29] - **Daira Emma**

Removing a signer without changing the public key? Let me think about that. It's not that you have to specify which signers you've removed from verifying. It's just that the other potential signers that you haven't removed, refresh all of their keys, and then you can sign either using K of M with the old keys, but some of those have been deleted, so you're assuming that that can't happen, or with K of N of the new signers. Is that right?

[21:17] - **Natalie**

Well, you have to... So you redo the key generation. 

[21:24] - **Daira Emma**

But because the public key hasn't changed, it must be the case that the K of N with the old keys still works, right?

[21:39] - **Natalie**

Yeah, Conrado, that's correct, right?

[21:42] - **Conrado**

Yeah, that's correct. It still works. But the idea is that maybe one participant was compromised or lost their share, and then you can refresh the share. So yes, it's true that K of N of the old share will keep working. But if someone has only one or something less than K, then they won't be able to use it.

[22:09] - **Str4d**

If you're doing the rotation because someone lost access, then it's really just recovering that. I think the case for removal is more if a previous entity is determined to be malicious, then as long as at least T of the If the honest signers have deleted their older versions, then there's no way for them to-

[22:37] - **Daira Emma**

Doesn't it have to be N minus T minus 1 have deleted?

[22:48] 

Well, K, yes. So you need a sufficient number of on it. I think it's actually K minus- It's N minus T plus one must have deleted in order for the to only be T minus one left.

[23:05] - **Natalie**

We're not changing the threshold.

[023:10] - **Str4d**

So the point is that rotation is fine because the old set can't be used if enough of the honest assigners honestly rotated and deleted their old data.

[23:20] - **Daira Emma**

Yeah just clarifying the security model.

[23:30] - **Natalie**

So to answer your Dodgers question, you could change the threshold. That's something we've spoken about that's being suggested in an issue that someone raised, but that's not part It's not part of this. It's not part of refreshing the shares.

[23:47] - **Conrado**

It can be done, but it's a bit more complicated. So we're just doing the easy thing first, but eventually we could support changing the threshold, too.

[23:56] - **Str4d**

Yeah. That's the thing that would be useful in a context where you're moving from, say, three of five to doubling the number of signers, three of 10, you don't want. Yeah.

[24:07] - **Daira Emma**

I mean, arguably, you should have a mechanism for key rotation anyway, and then that mechanism will also apply to frost group keys.

[24:22] - **Natalie**

Yeah, I don't think there are any other updates, Conrado, that I've missed.

[24:27] - **Conrado**

I don't think so, we're still waiting for the draft to be accepted.

[24:39] 

if you feel there's something missing the book, we hope the book is as complete as possible, so there's something missing. I think part of this, this refresh share is also documented. We hope the [book](https://frost.zfnd.org) is as complete as possible, so there's something missing. I think part of this, with the share is also documented. So yes.

[25:03] - **Pili**

Thank you, Natalie. I would add that if there's any documentation missing, please raise an issue, and we know what we need to do. 

___


### 4. Research & Implementation Updates iii) Trailing Finality Layer


[25:29] - **Daira Emma**

Yes, I am busy finishing off my presentation, which is on, I believe, Monday of ZconV, so I only have a few days left, but it's going well. Fortunately there's a previous presentation that I can group from, but it will be different from that. Yeah, looking forward to it. I don't know whether I'll have this done by Zcon, but if not, then soon after, updating the TFL book for Crosslink2. Basically, just specification work. There's been no implementation work on TFL.



___


### 5. Open Announcements i) ZKProof6 May + ZconV


[27:05] - **Jon**

I want your opinion on this. I'm about to send it to people. Can I share my screen? Yeah.

[27:22]

So the announcement is the same that I've been announcing a bunch before. Which is at the end of this month on May 22, 23, 24. We're all gathering together for ZKproof 6. This year, there's something special because there's the choosing of the verified verifier. There's going to be a kickoff to do a formal verification of one a particular verifier.

[28:02] 

It could be Groth16, it could be bulletproof, it could be PLONK, it could be something else. And there's a whole conversation that's going to happen there to figure out the pros and cons of blessing a particular verifier and focusing security attention and specing on one particular one over the next 12 months. Other than that, there's going to be actually Jens Groth, Alessandro Chiesa, and Kostas from the circuit, giving keynotes. So it's interesting for those people that are into zero-knowledge proofs, and I think it's going to be a great follow-up for ZconV.

[28:56] - **Daira Emma**

Hopefully I will be there.

[29:18] - **Vivek**

Yeah, I was just saying that I think to add to Jon's, Kostas is from Mysten Labs was the specific information that was missing.

[29:28] - **Natalie**

Yeah, Kostas Halkias. He used to be in Facebook. Now he's in an ecosystem called Sui. I gave a demo here about  zksend, zklogin, which uses Groth 16. That's part of their work. It's very inspiring stuff, and I think there's a lot that can be brought back to the Zcash ecosystem to accelerate what we're doing here. That's my announcement. I'm very consistent, right? I think I've been saying that for a while.

[30:08] - **Pili**

Great. Thank you, John. And of course, ZconV is next week. I'm assuming everyone here has registered, but please do register. If you haven't done so already, please ask us the questions ahead of time for, I think, all sessions. I think that will really help the moderators and and presenters. Great. I think any other open announcements? 


___


### 6. Open Discussion i) ZSF


[31:13] - **Daira Emma**

We said before, we have been working on the memo changes spec. And we did discuss, to some extent, the ZSF.

[31:31] - **Str4d**

The ZSF discussions were earlier. That was mostly ZIP editor discussions, not ECC discussions.

[31:41] 

We've not discussed it in the last week or so. So if equilibrium isn't here, then we can't fill in.

[31:59] - **Daira Emma**

Yeah, we will need to get a move on on figuring out exactly which things are going to be in NU6 because the roadmap says that it needs to be decided now.



___


### 6. Open Discussion i) Zcash Memo Bundles - Overview


[32:20] - **Str4d**

Yeah. In the meantime, if we want to, we could replace this with a quick overview of the of the memo work that we did in the last couple of weeks.

[32:35] 

Which we mentioned earlier, because it is at the point now where the requirements of things basically is what we've figured out, and we have a sketch of the design, and the next step after this will be actually nailing down what the specification is.

[32:52] 

But if people have comments on the overall design, now is the time for that to be done. 

[33:01] - **Daira Emma**

Can you give a brief summary?

[33:04] - **Str4d**

Yeah, I can do that. 

[33:50] 

So as has been mentioned in prior calls, we've now got essentially what the motivation down here, but in short, the combination of the fact that right now, as part of the shielded protocol, the addresses of senders are not revealed to recipients in any formal way in the protocol.

[34:17]

Senders can stick their return address into a memo field, but it's completely unauthenticated and they could put whatever they wanted in there. So for recipients who want to authenticate who the sender is, there is currently no way for them to do that in-band because the functionality that we would need to build for authenticated reply addresses can't fit into a single memo.

[34:38]

We've noted here that currently the way that the lightclient protocol works is sending a truncated ciphertext down, cutting off the memo to save pieces there. But that complicates the security argument for the lightclient case, and switching to pulling the memos out from would actually simplify the way the implementation works there as well.

[35:02] 

The requirements that we've enumerated after a fair bit of discussion about this here, the primary requirement is that recipients can receive memo data greater than 512 bytes. So  512 bytes of text gets replaced by some variable length thing. Multiple recipients across any of the shielded pools can be given the capability to view the same memo data.

[35:29]

Right now, for example, Ywallet, in certain transactions that it creates, it will create an output in both the sapling and orchard pools, and it will just copy paste the same memo into both outputs, which has actually come up in the initial Zashi launch where people have been noticing duplicate memo data in the Zashi UI. Right now, there's no way in the backend to detect that those are actually meant to be semantically the same memo because while weird, there are edge cases where you can imagine that seeing the same memo text twice actually has different semantic meaning than seeing it once.

[36:12] 

This requirement basically would mean that if you are actually wanting to show the same memo for multiple outputs, that gets encoded into the transaction structure. Then the privacy requirement where the exact number and exact length of the distinct memos should not be revealed, even to the transaction recipients. If I am able to decrypt one or more of the outputs of a transaction, I can learn the memos that those outputs were given the capability to see, but whatever of the rest of the information I can't decrypt, I should not be able to learn anything more than what is revealed by the amount of data that is left unencryptable, the amount of data that is left that I can't decrypt.

[36:58] 

A recipient should be able to determine whether or not they have been given the capability to view a memo solely by decrypting the note ciphertext. This gets back to that light client case. We've had this problem for a while where you can't tell just by downloading that truncated ciphertext whether or not you received a memo, so you have to go get the full transaction to enhance it to get those memos.

[37:19] 

If we're making this change here, the idea is that you just encode that in a mechanism into the key, so then you can tell by decrypting the full note ciphertext if there's anything everything in the memo for you. Again, learning that, that just saves on downloading and decrypting that data.

[37:38] 

Then finally, the final requirement we settled on was that memo chunks, so the memo will be split into a series of chunked pieces as part of a multi-member decryption and arity hiding things. But they should be individually prunable without preventing the transaction from being verified. You're doing by this is you verify a transaction is included in the chain by deriving the transaction's TXID, the idea of the transaction, and you can prove that a TXID is included in a block by showing a merkle tree path to the block.

[38:15] 

This is really just a constraint on the way in which the memo data is authenticated within the Txid in that it should be possible to replace a memo chunk with the commitment to that chunk so you can still derive the Txid but be able to prune that data. Then just a non-requirement of, we don't need to be able to receive multiple memos per output note because you can recipient who wants to do that and send multiple memos to a single receiver, can emulate that by just creating dummy notes.

[38:49] 

Then I'll skip over the spec, the initial sketch of the spec for now because this is the stuff that still needs to be figured out and changed. But the main rationale that we've included here basically The key is around what we've had here is for why we want to include a pruned... Make sure that the encoding is prunable. It doesn't necessarily mean that they will be broadcast on the network in pruned form, but this is more about If a node operator is presented with a memo decryption key, which gives them the capability to decrypt and view a memo, and they don't want to store that data, now knowing it's there have the ability to prune it from their local store without needing to do that.

[39:36] 

Likewise, as has been seen for example, in Bitcoin, OpReturn-based null data storage on Bitcoin. There was a problem a number of years ago where some people were using that to embed virus detector signatures. It's causing antivirus software to detect the entire Bitcoin blockchain as a virus and delete it or delete individual block files.

[40:09]

The way that Bitcoin core fixed that was by XOR'ing a random salt value in with all the block data on disk so that the data was still there because it couldn't be pruned from the disk, but it was just hiding the signature from the antivirus software. This is a defensive mechanism here from that potential chain abuse from adversaries, where if that thing occurs, nodes are able to adapt that locally without compromising the ability for those nodes to still enable wallets to decrypt data.

[40:46] 

It makes the memo portion of it still authenticated. Obviously, if you gain access to memo data via some other pathway, you can then verify that it's correctly for that transaction. But it gives you the ability to prune where necessary. In particular, there's a note here about the ability to prune the data is just an artifact of the way that it's authenticated, it doesn't provide any additional censorship access for a global adversary because assuming that we meet this requirement of 'we don't leak anything about the number and length of distinct cryptical memos', then for an entity that doesn't have access to a capability to decrypt a memo, there's nothing in the transaction memo section that they can use as a censorship vector, like a distinguisher for that transaction.

[41:46]

And the transactions themselves, fully shielded transactions, similarly are designed to lack those distinguishers. So you can only do that pruning, you can only sensibly do the pruning if you have already not be a capability to decrypt it and view it. Is the rationale for that.



___


### 6. Open Discussion iI) Zcash Memo Bundles - Use Cases


[42:06] - **Daira Emma**

Dodger asked about implications for transaction size.

[42:11] - **Str4d**

This gets a little bit into the specification, but the rough idea that we've still got to pin down is that instead of having a single AAD cipher text, which contained... Normally in a transaction for each note output, You have a single AAD containing the note plain text, which is the things to derive the address, the amount, the randomness that goes into the note. In the case of ZSAs or post ZSA upgrade, there'll also be an asset-based value that goes into that note plain text. That's all necessary data in the output already.

[42:50]

Then in addition, there's a 512-byte field for the memos. All up, you have the size of the note plain text, which is necessary per output, plus the memo data, plus the 16-byte tag, which is the overhead you get from an AEAD ciphertext. The 512-byte part of that per-note ciphertext will get replaced with a 32-bit memo key or something along those lines, that bit to be specified, but around about 32 bytes. So reduction per output from 512 to 32 But then there's also going to be with ZSAs, an increase of 32 for each note anyway.

[43:37] 

And then in the memo side, the memo data that would have gone per output is now in the memo section. Each of those memo chunks, because we represent the memo bundle as a vector of memo chunks, each of those will have an authenticated encryption overhead as well.

[43:55]

You could imagine one possible memo bundle as being We have as many memo chunks as there are shielded outputs in the transaction. That would be, for example, if you actually wanted to send the same as before, a 512-byte memo to every output individually. That would essentially amount to a 48-byte because the 32-byte keys plus the 16-byte tag, it would amount to 48 bytes of overhead per output in the transaction data size.

[44:28] 

But that's an upper I'll bound on that because the memo bundle lets you then reduce that at the cost of revealing certain things about arity. But there's a trade-off you can then make there in terms of privacy versus the amount of data you put in. You could, for example, just have a single memo chunk, which still is large enough to store the same amount of data if you wanted to, but identifiably a single chunk and therefore a single memo.

[44:53] 

Then you're only paying 32 bytes per output for the keys plus one 16 byte overhead for the whole transaction at the other end of the scale. It's about the minimum overhead that we can do while maintaining the security level we want. You could make an argument that we could use 16 bytes symmetric keys instead and insert Certain encryption formats do. 32 bytes keys make it simple. We don't have to care about Grover ever becoming viable, for instance, in a quantum computer setting.

[45:26] - **Daira Emma**

I'm actually more worried about multi-target attacks and low-probability attacks without quantum computers that's why we use 256 bit cryptovolues throughout the protocol. There's a paper by Dan Bernstein called Understanding Bruteforce, which gives the rationale for that

[45:51] - **Str4d**

There may be other things that get once when we write the actual specification, they get folded into this. For example, we currently rely on AEAD encryption, and that is not key committing. You can run into multi-target attacks there as well from that perspective. So given that we're defining a new AEAD here, section, we might make changes there, but this is in the to be specified part.

[46:18] 

Functionally, what this ZIP proposes is just a separate memo bundle section with a vector of chunks. Then you decrypt your note outputs as you get a key. If the key indicates that it is a real key, you can decrypt with it, you can then go to these memo bundle chunks and decrypt a subset of those chunks, like say with key A here, and then concatenate those chunks of whatever length they are to get your final memo.

[47:30] 

The note about ZIP 317. Yes, the way that fees are done would account for this. And indeed, you would then essentially be because you now have independent arity, like length data visible publicly for both the individual note outputs and the memo data, you could account for those separately in ZIP 317 fees. So you might have a lower fee per shielded output and then pay fee for memo data.

[48:02] - **Kris**

So just as a fun aside to this, so after we've been talking about it, something that I've been considering is that, Ordinals on the Bitcoin chain have been a, I don't know if a driver of adoption, but a popular thing there. I have an idea for a shielded Ordinals protocol using the memo data.

[48:32]

Given that we'll have the separation of memo keys from memo data, there's a pretty straightforward approach to an ordinal-like functionality. In the presence of an extended memo, one of the things that we want to change is to make more use of the... I think it's ZIP 302. Anyway, structured memo data, such that you can have a multi-part memo data that is where all the parts of a memo are related to one another. And so given that, one could have a specification for an ordinal inscription that would include the ordinal data and then the prior step in the chain of verifiable reply-to address that could give you the conventional chain of custody like you have with Ordinals.

[49:43] - **Daira Emma**

So I know that On Bitcoin, the way that original NFTs are currently done depends on Segwit and taproot. I don't know what the exact The segwit part, probably we've already done the necessary things for that in ZIP, 143 and 243. But the taproot part, I have no idea how they use that or why.

[50:17] - **Kris**

My understanding is perhaps too shallow, but I understand it as essentially you establish a chain of custody for a trivial output with a a given Op return. And we can establish a chain of custody via authenticated reply to's and publicly or payment disclosures of some sort.

[50:48] - **Str4d**

Yeah, the thing it relies on in Bitcoin is the visible transaction graph, which is precisely the thing that we don't make visible here.

[50:57] - **Daira Emma**

You would need to payment disclosures, I think.

[51:00] - **Kris**

You would need to payment disclosure. But a payment disclosure is something that can fit in a multi-part memo along with your payload.

[51:11] - **Str4d**

Actually, this is something that would be relevant for others to think about for the memo changes is there was an idea from way back, I think I opened an issue about it on the Zcash repo in 2017, about more granular payment a payment disclosure. Right now, the concept of a payment disclosure is just essentially disclosing the the OCK value for a particular output, which reveals the amount, the recipient, and the memo data for a given recipient.

[51:46] 

You could imagine the key structure being derived in such a way that you can reveal subsections of that data. Currently, with what the direction we're currently heading, the ZIP 231 for this memo proposal. Being able to decrypt the note, by definition, lets you decrypt the memo, but you could then give out the capability to decrypt the memo in a transaction without having the capability to decrypt the note. Essentially, the capability to decrypt a memo on chain is being sent in-band, but it doesn't have to be. This essentially becomes enabling Zcash to be an arbitrary permanent data store, which is why we have the ability to prune things as a requirement.

[52:39]

But the rationale then is you could also imagine a structure where you are providing multiple memo components that logically tie together into the same logical thing like Ordinals or whatever, but where all you're revealing is the bit that's necessary to be public. You only reveal the memo key that contains the public willing part, and then the private part is sent to the same recipients in a different note, for instance.

[53:09] 

But if there are other use cases or other ideas around things that could be done with partially public data for shielded in particular, things that people currently use transparent for. This is a line of thought in the direction of deprecating transparent, like replicating transparent functionality in Shielded World or things that people need to be able to do is along these lines. We obviously don't want to do everything at once here, but if there's something that is easy to do, enabling in that direction while we're separating out memos anyway, it would be worth thinking about it.



___


### 6. Open Discussion iii) Zcash Memo Bundles - Use Cases cont. 


[53:50] - **Daira Emma**

Something has occurred to me, which is that qedit has suggested using verifiable encryption for compliance purposes for stablecoins, optionally. If we have arbitrary length memos, essentially, then that can no longer be accommodated by the proof associated with an output. If the memo was long enough, you would have to have additional proofs to cover it for the verifiable encryption, I think.

[54:43] - **Jon**

There's another piece, another angle at trying to be compatible with exchanges and a bit more is using those memos for some structure around identity, like consent-based identity, when you're interacting with an exchange. Actually, everything you're talking about here is probably super relevant as an underlying infrastructure for selecting a format for these things.

[55:19] - **Daira Emma**

We do have to think about the multiple proofs issue, though.

[55:22] - **Str4d**

The combination of what you just said and the point I was making earlier about partial visibility, I suddenly realized there's actually something you can do with our current design that I don't think was intended but could maybe we want to preserve.

[55:37] - **Daira Emma**

Do you want to say this on a public call, Str4d?

[55:43] - **Str4d**

Well, It's really more about the structure of this that enables the partial visibility. It's really the same as the key derivation trees. Essentially, you could imagine having memo trees, a memo that contains the keys for other memos. That actually lets you, if you have, say, two outputs, one output could be given the ability to view more memo data than the other by having a multipart memo that contains both the additional data that they wanted to decrypt and then the memo key

[56:16] 

Alice and Bob, Bob's given a key to view some data, and then Alice has given a key to view some other memo data that includes the key that was given to Bob. That actually lets you have partial visibility into a memo, which is something that when we first talked about this, we weren't considering was possible.

[56:33]

But actually, there's nothing in the structure that prevents you from doing that once you have separable memo chunks. It wouldn't be something we could avoid anyway in the structure because it's just the symmetric key. Unless we changed how the key derivation was done to not be pure symmetric keys.

[56:55] - **Daira Emma**

I think we want it to still be symmetric keys. That's actually important for the postquantum properties because if you keep the addresses secret, then because you're mixing the destination address into the KDF and because the encryption based on the output of the KDF is symmetric, that's what allows it to be postquantum in that case. You'd have to be very careful changing that.

[57:31] - **Str4d**

Exactly. But the point I was making more is that the memo keys are, at least in the current design, bearer capabilities, essentially. If you can see it, you can use it. I don't, off the top of my head, have really any better way to do that. Because if you try and avoid pure bearer tokens, then what you end up with is some asymmetric thing. Then you have to deal with quantum resistance and whatnot. I think that's probably too much overhead for what we can do in the stack.

[58:04] - **Daira Emma**

Yeah. I thought of a potential solution to the needing extra proofs thing. If your Compliance Disclosure Protocol thingy, you only need to verify part of the memo per output, then you could just verify that bit and then it's possible to fetch it in a fixed-size witness.

[58:59] - **Kris**

I think this is just a really good example of how, I'm really hopeful that people will think about applications that they need for this functionality and then work backwards to what protocol features are, or how does that impact the design of protocol features? Because I think even with today's Zcash, there's a lot of unexploited space for using the features that Zcash exposes in novel ways. But this one in particular, I'm excited about because there's just a lot of things that can be done with it.

[01:00:03] - **Pacu**

Oh, yeah. I think that to tap on what Kris was saying, I think that most of the memo field potentials are not quite exploited yet because we can't rely on an application acting on some memo data that hasn't been authenticated. Anyone with some common sense would see that it's potentially dangerous to tie some logic of an application to a message that you received that is not authenticated on a blockchain, even though it's to an address and all.

[01:00:53] 

Like the feature I was talking about, using remote configuration and forced upgrade for Zashi, for example, or any of the other wallets. Let's say that we want to deprecate some versions of a wallet, and we could do that instead of using the typical firebase remote configuration, we could have the memo be that communication channel without leaking additional requests to a server or requiring some external library like Firebase, then we on the privacy space, we don't like much.

[01:01:37]

But again, if I can decompile the viewing key, I would need to actually see those messages by, decompiling the the Android or the Swift app, then I could actually derive the address for that viewing key and start sending messages that are not from the developer so could expect the app to lock or something like that. I guess the authentication is what it really opens up a secure environment to actually make use of memos with more confidence and security.

[01:02:23] - **Str4d**

You get that authentication for free in transparent chains because you can observe who the sender is and go and check that it's the sender you expect, whereas you don't have that capability natively for shielding.

[01:02:54] - **Dodger**

Has there been any consideration of setting an expert time to to enable auto-pruning?

[01:03:13] - **Str4d**

So that's more That is more in line with... zcashd has the concept of running a pruning node, which Bitcoin had, and then zcashd has somewhat support for it. It's not really well integrated. But yes, that was something that I was thinking about when writing up the thing about pruning is that you could choose to run a node in a way where you are still helping users of the network to be able to send and receive funds, but you can have a somewhat lower data requirement by not needing to store anything that's stored in the memos as an option versus a full pruning node like zcashd currently offers, where you just drop old block data.

[01:04:03] 

That's the problem with the shielded piece in that in the case of a transparent node, you just need to store the latest chain state and you don't need to store the older blocks, and then you can continue appending things. In the shielded case, because all the state is shielded, what state you need to store in order to be able to maintain things going forward is somewhat different. Still, there's certain things like nullifier sets, for instance, which you can't prune.

[01:04:29] 

But yes, this is something that a node operator could opt into locally auto-pruning if they wanted to. Zebra, I think, would have a hard time doing that right now because of the RocksDB. I guess, in current Zebra, if that height of order pruning aligned with the stable height that Zebra was using, so currently 100 blocks, then you could not serialize the memo data to disk at the same time. But pruning becomes a lot harder, I think, in Zebra, given its current design.

[01:05:07] - **Kris**

I think that what Dajer was asking was maybe somewhat different. I could easily imagine a convention-based approach where, let's say that you add an additional memo chunk that is decryptible by a well-known key and then use that to contain pruning instructions, for example. I think that the general memo capability and separated memo capability opens up a lot in terms of conventional approaches where you don't necessarily have to bake things into the protocol.

[01:05:50] - **Str4d**

You are still baking that into the protocol, and in fact, doing something like that at the consensus node layer continues the somewhat unfortunate decision that was made with Shielded Coinbase, where we baked note encryption into the correctness into the consensus layer.

[01:06:06] - **Daira Emma**

Yes. I would like to fix that as part of the memo changes we're doing now. Maybe we can't.

[01:06:15] - **Str4d**

I'm not sure. I don't think we can for sure, Coinbase, but it would extend it to the memos as well.

[01:06:26] - **Kris**

I'm not sure that I agree So if you said, Okay, the second memo chunk, which is decryptible by the key that is 12345, or whatever, contains in it a just directive that says the corresponding memo at position whatever, or the corresponding memos in this transaction can be pruned after block height x. That's a directive that the node could choose to either follow or reject.

[01:07:07] - **Str4d**

Oh, I see what you mean.

[01:07:11] - **Kris**

That would be selective expiry. That is truly a conventional option.

[01:07:20] - **Str4d**

Okay, so that is a different thing that I thought you were, that either of you were saying. So what this is, is the equivalent not of the transaction expiry, but a memo expiry in the memo bundle. Is that what you were asking about, Dodger? Convention didn't imply that to me because that's different than actually encoding this publicly in the transaction.

[01:07:53] - **Dodger**

Yes, that's the sort of thing I was suggesting.

[01:07:57] - **Str4d**

Okay, so there was a trade-off there because Because if you aren't doing expire at the entire transaction level, then you're leaking memo data, or rather, you're leaking the existence of specific memos. Essentially, That would be incompatible with the current requirement about not leaking anything except an upper bound on about the amount of memo data that's present, a combination of the number of chunks and the length of each chunk.

[01:08:29] - **Daira Emma**

I would be worried about that because you can imagine that a particular application would be using or needing a particular expiration time and then you've identified all of the transactions that are associated with that application.

[01:08:55] - **Str4d**

If expiry for memo chunks, if proof of If expiry/pruning for memo chunks happened at the whole transaction level, that might be a level of granularity that seems reasonable because then the ecosystem would essentially bifurcate.

[01:09:13]

It's yet another public transaction identifier that we can't get rid of, but it would mean that you would only be bifurcating into expires at some standard heights that wallets agree on to use or doesn't expire. In In the same way that transactions right now bifurcate into... It's not a single bit right now because for transaction expiry, expiry is at a concrete height. It's the delta from whatever the change was. There is identifiability there.

[01:09:47]

The question essentially then becomes either do you couple that to transaction expiry at all or do you couple the... You probably I wanted it to be separate. But the point is, however you encode it, you have to encode a height in some way, which means you could encode any height. It's not necessarily one bit of information unless while it's appropriately standardized on setting it. But assuming they do that, then you only have a couple of consensus putting in to.

[01:10:23] - **Daira Emma**

You can make it one bit by making it relative to the expiration an expiry height. So let's say that in order to use this feature, you need to set an expiry height, and then it's either never expire or expire at that height plus some fixed amount.

[01:10:45] - **Str4d**

Right. But then you're making an assumption about how long the data is relevant for, for every transaction, which again comes down to what do people want to do with that functionality and what privacy guarantees does the entire network need to risk for that functionality to be implemented?

[01:11:07] - **Daira Emma**

Yeah, good point. Yeah, I'm quite skeptical because I think that's actually leaking quite a bit of information.

[01:11:16] - **Dodger**

I think there's two things to think about here. Number one is everything's a trade-off. We're targeting perfect privacy. The trade-off is data being stuck in the blockchain for forever.

[01:11:33] - **Daira Emma**

It's not because it's only if you need it. Nodes can always prune it. Although they would be able to after this change in NU6 because they can just keep a commitment instead.

[01:11:48] - **Dodger**

The other thing that I think we should bear in mind is that in doing this, we are potentially further entrenching the memo field as something that we're going to rely on in the long term. And I think, again, if we look at the long term direction of Zcash, is that something we want to commit to or will we find that X years is down the line? Like, I wish we hadn't done that.

[01:12:22] - **Str4d**

I mean, the something that is not yet specified in there, the fact that We want to be able to encode there is no memo here, which essentially is the encoding an option of key means that you also have the ability to encode other kinds of things within the fixed length that is set aside per output. But you could, for instance, encode a key for some off-chain memo, and then have no memo data on chain in your transactions.

[01:12:58] 

There's nothing fundamentally that prevents that because at the end of the day, it's a type value-tuple going into the per note. Particularly, given that the memo bundles would be separately in account of the fees, it would be entirely possible for people to start not putting memo data on chain at all and instead storing it in some other mechanism with the corresponding questions about data access and reliability and privacy and things. But that essentially would get uploaded to somewhere else.

[01:13:34] - **Daira Emma**

Yeah. I mean, you could store a freenet or Tahoe LAFS, for example or SSK. That would give you immutable encrypted files in a DHT, but you would be relying on that DHT. If you were accessing it directly, then you might be leaking metadata about that file being interesting to you. So the transaction with that key must have been to you. 

[01:14:12] 

Although we have similar issues with the light client protocol right now. At least with the current proposal, because we definitely We don't want information hiding for notes in that context. So whatever we use as memo key data there needs to be fixed length. You need to either figure out a couple of things, like how much extra data might you require to be able to store a couple of other different kinds of keys in there.

[01:14:54] - **Kris**

Well, can't you just put that in a memo, though? 

[01:15:01] - **Str4d**

True you could do the indirection I mentioned before to just have a small memo on chain that then references the memo's off chain. So it wouldn't be removing the memo data fully, and it is still that memo data is subject to prunability, which might be desirable in that case of having the key to the off chain stuff disappear later.

[01:15:27] - **Daira Emma**

Yes, good point.

[01:15:29] - **Kris**

Yeah. Again, there's just a big space of options that the fundamental change opens up. There is a small but relevant question, which is, given this change, if we're choosing a chunk size, and there are options about whether we're doing chunking or some other kind of padding, would we want to allow the chunk size to drop? Say, have a chunk size for memos go down to 256 bytes or 128 bytes, and then a conventional memo is two or four chunks, something like that from a ZIP 317 perspective. Anyway, just possibilities. Overhead of chunks versus the requirements for the keys is a piece to be sorted out.

[01:17:00]

Dodger said in the chat, out-of-band note transmission.

[01:17:05] - **Str4d**

That was just a reference to the discussion we were having. That's the name we've used for it elsewhere. Out-of-band note transmission more generally was just the entire note data not being stored on chain. That's partly why we never verified the encryption of the note data. If people wanted to have full postquantum resistance, they could just not put random data on chain. They can't recover from seed ever, but in exchange, they can not have that data stored on chain.

[01:17:36] 

The memo proposal here lets you at least do that for memos. You can choose to just not put memo. You don't even need to pay the cost of the 512 wide field. You just pay the cost of the 32 or 33 or whatever the length ends up being for the memo down thing and just put either no memo or a link to memo off chain, which is a step in that direction if you want to not have people rely on that.

[01:18:04] - **Daira Emma**

For completeness, Str4d obliquely mentioned the length of the Poly1305 authenticator. Poly1305 it's a 128-bit authenticator, but it actually has security. It's 8x number of 16 byte blocks divided by 2^106, which Which turns out if you work it out for a single memo, it's 2^-98 for Zcash's use.

[01:18:38] 

You might think, is that enough? Because we normally require 2^125 security. But it is enough because it's a different situation to when you are trying to break a symmetric encryption key. Because basically, in order to break it, you would need the recipient to act as an oracle for whether the authenticator is correct. It's an online attack. That's what makes it infeasible, even though it's 2^-98. In other words, it doesn't necessarily need to be any longer to resist quantum attacks. But that does need reanalysing.

[01:19:58] - **Pili**

Let's leave it there then. Thank you so much, everyone, for attending and participating. The next Arborist call will be in 2 weeks on the 16th of May, at the later time of 21:00 in UTC. Please check your calendars because it seems there's still some calendar glitches is out there. So see you all then.


____


### Attendees

+ Daniel (decentralistdan)

+ Dodger

+ Jack Grigg

+ Kris Nuttycombe

+ Alfredo Garcia

+ Arya Solhi

+ Condrado Gouvea

+ Daira Emma Hopwood

+ Jon (QEDIT)

+ Marek Bielik

+ Natalie Eskinazi

+ Pacu ZWCD

+ Vivek (QEDIT)

+ John Bruhling

+ Brian M

+ Michael Harms

+ Oleksandr Putyak


**Next Meeting Scheduled: 21:00 UTC May 16th 2024**


___
___
