# Arborist Call #77 Notes

Meeting Date/Time: May 17th 2024, 21:00 UTC

Meeting Duration: 50 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [Binance TEX addresses / Zashi currency conversion](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#1-ecc-update---binance-tex-addresses--zashi-currency-conversion)

+ Zebra Update - [Zebra 1.7.0 / Regtest tutorial](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#2-zebra-update---zebra-170--regtest-tutorial)

+ [ECC & ZF Zcashd Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#3-ecc--zf-zcashd-deprecation)

+ Research & Implementation Update - [Zcash Shielded Assets ZIPs](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#4-research--implementation-updates-i-zcash-shielded-assets-zips) / [FROST demo](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#4-research--implementation-updates-ii-frost-demo) / [TFL presentation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#4-research--implementation-updates-iii-tfl-presentation)

+ Open Announcements - [My First Zcash Workbook](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#5-open-announcements-i-my-first-zcash-workbook)

+ Open Discussion - [Memo Bundle Design](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#6-open-discussion-i-memo-bundle-design) / [Memo Bundle Design cont.](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2077-Notes.md#6-open-discussion-ii-memo-bundle-design-cont)

___

Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - Binance TEX addresses / Zashi currency conversion

[00:39] - **Kris**

Since the last Arborist call, obviously, last week was a wonderful Zcon and this week we have been spending most of our effort catching up on wallet maintenance tasks that have arisen and bug fixing since the launch of the Zashi wallet apps.

[01:12]

The other piece that we're actively engaged with is working with Binance on adding an RPC method that they're requiring for zcashd to allow them to essentially check the TEX address conversions. So we've gone back and forth on this a bit, and we've decided to just go ahead and add it because otherwise, they are not willing to proceed.

[01:44] 

Apart from that, we've spent some additional time talking about NU6 and discussing things related to NU6 memos.

[02:20] - **Str4d**

Was that in the Zashi bits we were talking about there or NU6, specifically?

[02:28] - **Kris**

I I'm losing track of all the things that we're doing, and I didn't take notes in advance of this meeting.

[02:36] 

If you remember other things that I haven't mentioned, please speak up.

[02:42] - **Str4d**

Yeah, we did have some discussion yesterday and then a bit today as well around how currency conversion in Zashi was going to work.

[02:56] - **Kris**

Yeah, that was the thing that I was remembering.

[02:58] - **Str4d**

Coming up with an approach that enables access to exchange rates in a verifiable way, so not relying on intermediate caching in a lightwalletd in a way that lightwalletd could manipulate, while also ideally not revealing information to the currency servers that is unnecessary to do so and being resistant to currency exchange rate manipulation.

[03:34]

We've had some thoughts around that. Mostly, it seems to be working around the fact that most cryptocurrency exchange rate API providers don't consider this to be a thing that they care about. There's a little bit of work to be done to do that on top of the APIs that exist, but it seems feasible.


____

### 2. Zebra Update - Zebra 1.7.0 / Regtest tutorial 


[04:36] - **Alfredo**

So last week it was Zcon. Most of the Zebra team was either a panelist or a speaker or helping with the logistics with that. I think it was Monday that we released [Zebra 1.7.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.7.0) before Zcon started, which mainly highlights directors and the regtest and the custom testnet support.

[05:03]

Then this week we reverted back the end of support date. In the last Arborist call, I think we mentioned that we were extending the end of support of Zebra from 16 weeks to 20 weeks. But there were some concerns about that, so we reverted back to 16 weeks, which is the same zcashd does.

[05:25]

We are working on a regtest tutorial for people to start using the new feature Zebra has. We resume the work of upgrading what we call the ECC dependencies from Zebra, which are the zcash primitive, the zcash client backend, the zcash proofs, all those dependencies that we are behind right now in Zebra. This upgrade is not trivial, so it is taking us some time, but I think we are getting there.

[05:58]

Finally, I think Marek is working on a bug reported by Andrew Arnott about the gettreestate method there is a PR open for that. So I think that is in the right direction, that's it for today. Since the last, our call, it was a short update because of the second, but I guess we were able to do some stuff.


___


### 3. ECC & ZF Zcashd Deprecation


[07:13] - **Str4d**

Progress continues to be made. There's been some work on a bit further discussion around how the various services are going to work, like how the composition and distribution of responsibilities between what's going to be in scanning and what's doing indexing and what those mean. There's been some further figuring out of that and then identification of further work that needs to be done to enumerate the various kinds of data that are necessary for those services so that people can start building them.

[07:50]

There's been work done in the depths of the transparent script logic. People are figuring out the work necessary to take the fledgling rust implementation of the script engine and verification and production logic that's being ported over from C++ and figuring out how to integrate that into the Zcash script rust library, which is currently a thin wrap around the C++ script engine. There's some finagling necessary to get that stack to work. But once that is working, then the process of building and setting up the rust piece will be significantly easier because it'll be possible to do cross-testing between the current of anything that the Rust generator is producing against the existing C++ verifier up until such times we're confident that it can be a direct replacement.

[09:00]

Although for safety reasons, it's most likely that even when we are confident that the Rust implementation is feature complete, we'll probably still want to have a switch over in a network upgrade similar to what we've done in the past for switching core cryptographic dependencies such as Libsodium, switching from Libsodium for Ed25519 verification to to Ed25549 in Zebra, just to make sure that there's no potential issues in that regard.

[09:37] 

Then, as Kris mentioned before, there's continual bug fixing going on in the zcash client backend stack and the dependencies underneath it, which, of course, are necessary to be working for an eventual full node wallet as well. And then I think there's a bit of work going on with potentially looking at different ways that we can start putting together a initial CLA binaries and things that people can start iterating on for the purposes of doing the wallet development work of the wallet services. But that's stuff that will be more relevant in future Arborist calls.

[10:41] - **Jack Gavigan**

Any questions on that?

[10:45] - **Kris**

There was one other thing that I remembered, which is actually something you've been working on, Str4d, which is a relatively significant refactoring of the Zcash Primitives transaction builder.

[10:58] - **Str4d**

It blanks from my memory because it's all I spend my time on at the moment. But that is, so for the purpose of enabling, I think maybe this is the previous Arborist call, but for the purpose of enabling specifically, the Sapling crypto and related dependencies to be made unnecessary. So you're not required to depend on them if you aren't doing anything explicitly with sapling.

[11:30] 

The canonical case being Brave who are deploying transparent and orchard, but not going to be deploying the ability to store funds in and spend to sapling. Eliminating all that stack of dependencies makes the deployment process of dependency auditing and whatnot far simpler. There's work going on to essentially tease apart the APIs so that if you don't have those dependencies there, then you just can't add sapling outputs to the builder and so on and so forth. It's a bunch of staring at the type system and it's slowly coming together.

[12:17] 

But thus far, there isn't an effect on anyone who is using just the transaction type directly. I'm hoping to try and keep it that way. It's mostly just if you're using transaction building APIs or the authorisation stuff underneath, essentially in the wallet code, is where most of the effects are occurring.

[12:43] 

The other benefit of this refactor is as a side effect, the effect on the transaction builder in the zcash primitives crate will be such that signature production will now be a separate, explicit step rather than bundled into the build process, which will make integration with hardware wallet signing stacks easier.

___


### 4. Research & Implementation Updates i) Zcash Shielded Assets ZIPs 



[14:16] 

I can give a very brief update on ZSAs, which is that we had a meeting earlier this week. We (with the ZIP editor's hat on) have been having regular meetings for months if not the full past year, with the qedit team working on the specification design and whatnot. That meeting slot has now been transitioned into an integration-related meeting, so more focused on the process of landing the backlog of things into the various code bases. The meeting on Tuesday was focused on the initial pieces that need to be landed in note encryption, some discussion about the halo2 gadgets changes and then there was one piece that I am forgetting what it was that we discussed. There was some notes posted, I think, in the Discord.

[15:25] - **Daira Emma**

Was it the interaction between ZSAs and the memo changes for NU6?

[15:41] 

Yeah, there were some discussions around things like, can asset desc be zero-length? And then some implementation level discussions about what it is that nodes need to be storing and what state full validators need to be tracking. So for instance, ZIP 227, which handles the ZSA issuance, currently only requires full nodes to track finalized assets, ie. Assets for which no more issuance transactions are allowed to be created, so they have to be rejected from consensus.

[16:16]

But it's also desirable for ZIP-209 style tracking of individual assets to be done, ie. The amount that has been issued by any asset thus far to ensure that if there were, for the same reason that we have in the current consensus rules, a requirement that you don't allow any of the existing shielded pool values to go negative in a transaction, which would imply some counterfeiting bug inside the circuit, but we just don't allow that to happen in the consensus rules to be a a bulwark between different shielded protocols. You should have a similar rule for the individual assets which implies that the assets themselves need to be tracked.

[17:03] - **Str4d**

There were some discussions around all assets that have been issued need to be tracked. Then there's a question of how that impacts the fee for defining a new asset versus the fee for issuing an asset that has already been defined and whether there should be a distinction. There's discussions ongoing in the realm of what's the effect of tracking all of the state on full nodes and the network as a whole.

[17:34] - **Daira Emma**

Yeah, that condition, whether the pull would need to be checked to see whether it went negative. So initially it only applies to burns because that's the only thing that because there's no equivalent of transparent ZSAs, it would only apply to burns. But you can imagine, for example, that in future we would have some protocols that upgraded Orchard, and you might have a value-revealing turnstile between those two.

[18:09] - **Str4d**

Yeah, say if we migrated to a postquantum sound ZK SNARKs, We're enforcing a postquantum sound payment protocol that you would want to bulwark that from the pre-quantum secure side. And that would be a point where you would want these checks to to be enforced.

[18:33] - **Daira Emma**

Yeah, I think we also had a discussion, and not with specifically with the qedit team, but among ourselves, about the issue of how you name assets and how to make sure that there are no collisions. I mean, the issuance key to a certain extent prevents collisions, but that doesn't address the issue of what you show to the user. We wrote down some design considerations for that.

[19:05] - **Str4d**

From a wallet UX perspective, because you can think of the ZSAs as being a baseline protocol on top of which a variety of different assets and asset usages are possible, and how individual wallets distinguish those is important for UX, and how wallets determine what asset they receive, given that we have a protocol where anyone can be sent any asset, and all you learn from that detection phase is the identifier that's in the note plaintext. So There are a couple of follow-on ideas related to that that may result in some slight changes to Zip 226 in terms of what could store the note plaintext, perhaps, or it might be that we satisfy ourselves with the UX around things as they are.

[20:04] - **Daira Emma**

And we might end up having another ZIP for recommendations for how wallets implement ZSAs or fold that into ZIP 315.

[20:14] - **Str4d**

Yeah, it may make sense.

[20:16] - **Daira Emma**

It shouldn't block the existing working Zip 315.

[20:19] - **Str4d**

Yeah, it would either be an amendment to 315 or a... If you were doing ZSAs in addition to the considerations of 315. 


____

### 4. Research & Implementation Updates ii) FROST demo


[20:47] - **Conrado**

So on the last two weeks, we've been mostly focusing on Zcon. We did a [presentation](https://www.youtube.com/watch?v=LYisNtBul18) there explaining what we did since Zcon. We presented a demo. [This demo can almost run it yourself if you want to](https://github.com/ZcashFoundation/frost-zcash-demo). There's one last PR that we need. It's basically done. I just need to use something and merge it. But after that's done, you can run the demo yourself.

[21:20] 

This demo allows you to run FROST in different machines across different places by using a server that helps people sending messages back and forth. So what we're working now are doing some refactoring to the server to help prepare for the rest of the implementation, which is basically turning the server to something that is production ready. So we need to do some user registration mechanism. We need to add encryption, authentication, etc. So we're working on that. Nathalie is finishing the refresh shares functionality in the main FROST crate. It's basically done. I think she's working on just getting some tests fixed it. And that's mostly it.


____

### 4. Research & Implementation Updates iii) TFL presentation



[22:37] - **Daira Emma**
I realized that I said there was no news for TFL, but I did a whole [presentation](https://www.youtube.com/watch?v=O4wQi_i7k0I) At ZconV on TFL, which took a lot of time to prepare. 



___


### 5. Open Announcements i) My First Zcash Workbook


[23:15] - **Jack Gavigan**

If anybody's watching wants to find all these presentations, they're on the [Zcash Foundation YouTube channel](https://www.youtube.com/@zcashfoundation). So you'll find them all there.

[23:29]

I'm going to share something very quickly, which I think is really cool. It's a project that Elise has been working on for a little while. And it's, as you can see, an educational workbook entitled [My First Zcash](https://github.com/massadoptionorg/My-First-Zcash) and it's basically talking about money and decentralized cryptocurrencies and then an introduction to Zcash, and a bunch of details. It is such a cool piece of design. It's been a real collaborative effort with people from across the Zcash community, chipping in and completing various bits of it. I'd recommend checking that out.

[24:23] - **Daira Emma**

And if you have any comments, it's on GitHub so file an issue as I did. 

[24:31] - **Jack Gavigan**

Yeah. Some amazing artwork as well. I think it's just really cool. But yeah. Any other announcements or news that anybody wants to share? If not, let's move on to open discussion. Can we stop sharing? It's the point of sharing this. Yes, Stuart, I think you wanted to talk about something.



___


### 6. Open Discussion i) Memo Bundle Design


[25:05] - **Str4d**

Regarding the memo bundles ZIP that we've been working on, Hanh raised an interesting point that we considered it multiple points over the various years that we've been thinking about this, and I'm glad that they raised it again to bring it back to the forefront of thought, regarding how these memo bundle keys are derived.

[25:48]

In the initial draft that we put together, it was the simplest switch from what we currently have, which is just to replace the memo field in a note plaintext with a key that can be used to decrypt member bundle data that is elsewhere in the transaction. With the idea being that then you can have, in particular, you can share memos between recipients and also between shielded pools. So you can have a memo that a sapling output and an orchard output can both see because you just give them the same key.

[26:35] 

So Hanhs' question was "instead of embedding the key in the plaintext, Why not derive it from the common shared secret?" And so to give a brief explanation of what that means from a cryptographic perspective, when you do trial decryption right now, you scan with your incoming viewing key, and the process of scanning is that you're deriving a shared secret between some ephemeral data that's provided in the transaction by the sender and your static data that's your IVK.

[27:14]

Then from that shared secret, you derive a symmetric key, and that symmetric key is then used to decrypt the note ciphertext. If that decryption succeeds, then the note/output is for you. That's what we mean when we say trial decryption. There's no reason why you can't derive multiple keys from that shared secret. If you're going to do so, you need to do so in a specific way. If we took this approach, it would mean just completely changing the way that the KDF is currently done, but that's fine. Cryptography knows how to do that. 

[27:56] - **Daira Emma**

We, in fact, did that for Sprout. We derived two keys.

[27:57] - **Str4d**

The question really is one of the effect on the transaction as a whole. We've done a bit of discussion around this, and there are three things that essentially need resolving when it comes down to this particular design question.

[28:20]

One is, do we gain capabilities by deriving keys from the KDF? Secondly, do we lose capabilities by deriving keys from the KDF rather than embedding them directly? Three, what is the effect on distinguishability of the resulting transactions?

[28:47] 

If you embed the memo key in the note plaintext, you can share a key between multiple outputs because you can just embed the same key in multiple outputs. If the memo key for a recipient is derived from their shared secret, then each output has a unique memo key the same way that currently each output has its own memo. Now, you can still do shared memos in that design. You just have to do them indirectly, where each recipient is given a memo, and that memo, the only thing it contains is a A structured memo, so no text, but just essentially a thing that says, Oh, by the way, you've been given a memo key to decrypt some other memo in the bundle, and you give everyone the same key there.

[29:44]

It's not impossible to do shared memos. However, if you do that, then there are two problems that I see from from this. One is that it requires a bunch of additional memos, so you're no longer saving data relative to embedding the key material in the note plaintext, because to embed the key in the note plaintext, it's an extra 32 bytes per recipient. To give everyone a common memo key, that's an extra 32 bytes per recipient in the memo bundle part because you have to give them that data somewhere.

[30:29] - **Daira Emma**

You have to give it to them separately for each recipient because they have different keys.

[30:33] - **Str4d**

Because they have different memo keys, exactly. If you use the KDF approach, then in the shared memo case, in the limit of you're giving one memo to every recipient, you are saving no data whatsoever in this approach. Even though the note plaintexts are then technically shorter, overall, it costs you the exact same amount of data in a transaction.

[30:57] 

Where you would save data is in the, you are sending unique memos to individuals or one memo to one individual and none to any of the other outputs. But then we get to the question of identifiability because the memo chunks required to send key material are going to be quite small, versus the memo chunks, if we want to still do minimum of 512 byte memos, if that gets all used, then you've got this distribution of memo chunk sizes within the memo bundle that potentially then create an identifiable distinguisher between people who are sharing memos and people who are not. Transactions are sharing memos and transactions that aren't. That's a potential issue that we need to decide whether we're interested in doing.

[31:49] - **Daira Emma**

I'll give you my intuition. I think the potential need for indirection in some cases is too complicated. It makes it more difficult to potentially prove things in the circuit about memos if we wanted to do that in future extension. I prefer the design that we were originally thinking of just with the extra 32 bytes and the 32 bytes key in the note plaintext.

[32:30] - **Kris**

I've been thinking about this a bunch since yesterday. And I think the complexity argument is the one that mostly wins me over is the flexibility offered by including the memo key in the note plaintext and the fact that it's very straightforward to analyze, It's more readily implementable and it provides a lot of utility without a huge lift, particularly in terms of distinguishability analysis.

[33:15] - **Str4d**

Now on the flip side, just to offer an alternative point here.

[33:24] 

An advantage of using the KDF approach is that it takes a step towards more granular viewing payment disclosure capabilities. If the wallet ecosystem standardizes on the memos are encrypted with a key that is given to you in the note plaintext, then what that means is if you have the capability to view a note plaintext, you are inherently being given the capability to view any memo bundles that the keys included in there can include. Whereas if the keys, if in the KDF approach, where you have the shared secret and you derive two, in particular, independent keys from that same shared secret, then you can have there exists a secret that you can include in a payment disclosure that will disclose the note plaintext but not disclose the memo.

[34:26]

Now, the caveat to that is that that particular cipher's key only discloses the note value. It doesn't disclose the recipient because the recipient data is stored in the out cipher text. If you have a capability to decrypt the out cipher text, then you gain the capability to recover the shared secret and therefore, both keys that you would do in the KDF context.

[34:49] - **Daira Emma**

Yes, it's complicated to reason about.

[34:52] - **Kris**

The inevitable question is, why not both? Could one do the KDF to produce your two keys, but then XOR the memo, the derived part for the memo with the memo key, and therefore you get the separation, but you're essentially just decrypting the memo key that you then use to go to decrypt the memos.

[35:28] - **Daira Emma**

Kris, if If the argument against option B is that it's too complicated, then option A plus B is also too complicated-

[35:42] - **Kris**

A x or B, yes.

[35:44] - **Str4d**

My answer to that was something I was about to mention before you asked the question, which is that a thing that we do need to consider with the way that memo bundles work is that there is nothing preventing you from encrypting memo bundles to whatever key you want. So in particular, even with a note plantings that has an embedded memo key slot, if you don't fill that slot, it is possible to create a transaction where the note data is recoverable from on-chain, but the memo data is not.

[36:21] - **Str4d**

By instead using a memo key that is derived in some other fashion or just generated from random and provided to the recipient out of band. The answer there is if the KDF structure is that you can derive those keys, then there's nothing preventing you from encrypting something to that KDF key in addition to any key that was in the main slot. In fact, that could be a slightly more efficient way to be able to give a recipient two memos, one of which is definitely for them, and the other one is a potentially shared memo.

[37:11] - **Kris**

If you put a key into the note plaintext, then you don't have to do anything with that key. If one were to specify this KDF, you would just derive your other key based upon the KDF and take and use that.

[37:26] - **Daira Emma**

But that doesn't have to be consensus.

[37:29] - **Kris**

Yeah, it's It's entirely outside of consensus.

[37:31] - **Str4d**

Exactly. It's wallet standards because the wallets need to know where to look. But at least for how regular wallets will be working, as I said before, the act of receiving a note is the ability to decrypt the note plaintext. What you can decrypt from memos is completely irrelevant, and so it's not a factor in the ability to receive funds. Once you have detected something is for you, then you can go "well, I'm going to look if there's a memo key inside the note plaintext, I'm going to decrypt with that". Then maybe I also, because some wallets might be encrypted with the other one, go and decrypt with the KDF key as well and just check if there's anything under that.

[38:11] - **Str4d**

But at that point, the amount of work that you're doing is linear in the number of transactions involving your wallet because you've already filtered from the chain based on the receiving a note as the flag that this transaction was for you. Although that being said, there's nothing preventing someone from creating a transaction where in an output is not decryptable by you, but memo data is. Because if they can derive a key that you in theory could derive, then they could use it.

[38:47] - **Daira Emma**

By the way, our protocol discussions are always this dense. So you have now an insight into what we do all day. Well, in the best case, when we're not implementing silly features about transparent addresses.

___


### 6. Open Discussion ii) Memo Bundle Design cont.


[39:03] - **Kris**

This is a good point to pause because we on the ECC team have been discussing this a bunch, but can we get input from ZF folks or anyone else who has thoughts on this discussion?

[39:24] - **Conrado**

I don't think I have. I need to think about this more and I need to study the memo ZIP a bit more, but the impression that I have is also that the original approach is simpler, the KDF one seems to complex i am not sure if it's worth it.

[39:49] - **Daira Emma**
I mean, if it helps. So for Sprout, we had two notes, plaintext in each joint split, and I regretted that decision, it was because it was more difficult to do payment disclosures as a result. We do need to think about that.

[40:18] - **Str4d**
The ability to do granular disclosures, more like sub-part granular disclosures, does not necessarily mean that doing so is a useful idea.

[40:38] - **Daira Emma**
Yeah, I think so in the Sprout case, you ended up disclosing potentially the change as well, which you normally don't want to do. And that's why we changed it back to the KDF only deriving one key for sapling. Also because it's slightly simpler to analyze.

[41:08] - **Arya**
I find this idea tempting, but It does seem like it's too complicated for the feature that we're adding.

[41:19] - **Kris**

The reason I think that Hanh had suggested this was that he was saying, well, in that case, we can save a whole 512 bytes from each output as opposed to only 480 or whatever it is, 476 - something like that.

[41:40] - **Daira Emma**

I don't think it ends up smaller for a significant portion of use cases.

[41:46] - **Kris**

Yeah. I think that on average, having the 32-byte memo key with each output, we're already going to be saving essentially 450 bytes or something like that for the standard transaction, because I think the standard will be that there is one memo associated. We could make it the standard that there's two memos associated, and then we won't be saving anything.

[42:19] 

Standard is one. Two is probably going to be common because there are more and more wallets that are putting extra metadata into their change memos. But I don't I think that that's going to be one versus two is not going to be substantially distinguishable there. And in those cases, in an amortized sense, we'll be saving a bunch of space on chain anyway. So that's good enough for now.

[42:59]

So Actually, here is an example of something where sharing is a significant benefit here. Ywallet. Hanhs Wallet actually duplicates memos right now when it generates change... In transactions where there are more than two outputs, you have the recipient output in whichever pool is going to recipient, potentially several pools, and then potentially several change outputs, one per pool, Currently, what Ywallet does is it duplicates a memo mentioning something about that in each of the change outputs.

[43:38] 

So purely in that use case, sharing those memos together is something you would want to do. If the KDF approach is taken, then you immediately have to pay the cost that you were trying to save in the first place by not storing the memos in the in the note plan text.

[44:01]

Yeah, that's a good argument as well.

[44:05] - **Str4d**

Yeah. It only saves data in the case where you have explicitly distinct memos, and one of the two motivations here is to enable not having distinct memos.

[44:23] - **Kris**

If you have an authenticated reply to, you can share that authenticated reply to with multiple recipients easily via the sharing.

[44:48] - **Str4d**

Yeah and that piece, for instance, is something where potentially nested memos are a useful idea. When you think about, imagine that you ask... Yeah, you're creating a transaction which has 10 recipients plus change, and you want to send an authenticated reply to address to each of them. But the authenticated reply to part is a huge component. It's hundreds of bytes. You could include that once in a memo in a memo bundle, and then have a per-recipient memo that's a structured memo, which has the per-recipient memo piece, and then a memo key that lets them decrypt the other memo thats the common memo with the authenticated reply to it.

[45:33]

Then you're only paying the authenticated reply to once in effectively 10 otherwise distinct memos. There is a UX question of how that compositionality is shown to users in these nested memo cases. But this is the thing where what you would probably do is just at the Zip-315 style level of how wallets behave with this. At the UX level, you would say, you can do these arbitrarily nested things. You shouldn't. If you're going to do nested things, consider only having one text memo across all of the nesting and keeping the other stuff for metadata.

[46:21] - **Kris**

From the perspective of the individual recipient of that transaction, it's pretty straightforward what the wallet should do, which is just show them everything that as you can see, right?

[46:32] - **Str4d**

Yes with the caveat of what does it mean if you have a memo within another nested memo, and they're- If the ordering is well defined. Yeah. It forms a tree. There is some level of ordering you can define. But for instance, there's the problem right now. Well, there was a problem in Zashi, which has just been fixed in the recent update, where If two memos were decryptable, they were concatenated. The order they were concatenated in was semi-arbitrary because it depends on the ordering within the transactions.

[47:09] - **Kris**

That was a bug, though.

[47:11] - **Str4d**

Yeah, that was a bug. But the more general case of if you can see multiple separate text strings. You can imagine you don't actually want them to be directly ever concatenated or treated in that way, but ordering could be a concern there. It's mostly just about pinning down the behaviour of what wallets do there.

[47:29] - **Daira Emma**

I mean, if I've learned anything, it's pinning down the behaviour of what it to do is a lot harder than pinning down the consensus protocol. You would think it's the other way round, but no. Because the consensus protocol has to be right, it's actually easier to specify, which is weird.

[47:52] 

I've got a fortune cookie here. It says, The secret of success is to have a constant goal. The constant goal is privacy.


____


**Next Meeting Scheduled: 21:00 UTC May 31st 2024**


___
___
