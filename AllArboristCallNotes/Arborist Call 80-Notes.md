# Arborist Call #80 Notes

Meeting Date/Time: June 27th 2024, 15:00 UTC

Meeting Duration: 1 hour 


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Zcash Script / Zebra 1.8.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#1-zebra-update---zcash-script--zebra-180) 

+ ECC Core Update - [ZIP-320 / Note Commitment Tree changes / Arti Support for currency conversion](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#2-ecc-update---zip-320--note-commitment-tree-changes--arti-support-for-currency-conversion)

+ [ECC & Zcashd Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#3-ecc--zf-zcashd-deprecation)

+ Research & Implementation Update - [FROST 2.0.0 -rc0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#4-research--implementation-updates-i-frost-200--rc0) / [Zcash Sustainability Fund update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#4-research--implementation-updates-ii-zcash-sustainability-fund-update) / [Zcash Shielded Assets Updates](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#4-research--implementation-updates-ii-zcash-sustainability-fund-update) / [ZSA New ZIPs](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#4-research--implementation-updates-iv-zsa-new-zips) 

+ Open Discussion - [ZSA Verified Encryption](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2080-Notes.md#5-open-discussion-i-zsa-verified-encryption)



## Decision & Action Items

i)  Conversation around ZSF ZIP timeline & zcashd implementation in R&D discord.



___

Video of the meeting: [recording](https://www.youtube.com/watch?v=KtVvt3lis6o)

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. Zebra Update - Zcash Script / Zebra 1.8.0 

[00:02:46.17] - **Marek**
In the last two weeks, we released a new version of Zcash script. It's a new minor version, and it doesn't depend on the Rust dependencies from zcashd anymore. We're using it in Zebra, and we don't have to depend or keep the librustzcash dependencies in Zebra synchronized with zcashd anymore, thanks to this.

[00:03:31.14] 

So we updated the dependencies from librustzcash as well in Zebra. Then we fixed some tests for Windows, which allowed us to bring it back into the second tier of supported platforms. We merged a PR that drops transactions containing unpaid actions. We removed the scanner functionality from the Zebrad process. We have new documentation focused custom testnets and a Regtest in-flight, which we will merge pretty soon.

[00:04:24.22] 

Next week, we will be releasing a zebra 1.8.0, which will contain these updates plus the ones that we did in the past. 

[00:04:48.04] - **Dodger**

Any questions relating to Zebra?

[00:04:54.03] - **Marek**

Maybe I could clarify why we had to keep the dependencies from librustzcash synchronized with zcashd. The reason was that Zcash script used to depend on them through zcashd, and since we were using the Zcash script create in Zebra, we had to keep Zebra's dependencies synchronized with zcashd through this convoluted pipeline.


____


### 2. ECC Update - ZIP-320 / Note Commitment Tree changes / Arti Support for currency conversion 


[00:06:20.11] - **Daira Emma**

So, yes, This is basically just handling some corner cases. So today we found an issue with how dust in the... So this is dust in the sense of notes and inputs that are less than the ZIP-317 marginal fee. We've just been discussing how those should be handled.

[00:07:00.19] 

Basically, there is some complicated code to calculate whether an input has economic value because it's either greater than the fee or can be included for free without increasing the fee. There's an interaction between that and ZIP-320, which I'm working out today. But I think that it's very nearly ready to be merged. The other things that are waiting for an SDK release are, Kris will discuss the commitment tree changes, and Str4d, can you do the Arti support for querying exchange rates?

[00:08:08.06] - **Kris**

So there had been previously a bug that was mentioned before on the Arborist call in a note commitment tree management that was a corner case at shard boundaries.

[00:08:24.21]

As part of the fix for that bug, I introduced an assertion that ended up, due to other features of the note commitment tree, was triggering in some cases where it did not actually represent an erroneous condition. I've been working to make it so that removing that assertion is possible. Removing the assertion is the easy part, but then fixing up some other bits about how the distinction between actually observed subtrees and just subtrees for which we've inserted data that we got from somewhere else. They're just low-level details, but that's all complete and ready for review now. So that was the last other thing blocking the next SDK release apart from ZIP-320 support.

[00:09:26.24]

Hopefully, with that done, I can now focus on reviewing Str4d's stuff that gives us currency conversion support in the SDK, or at least the basis for currency conversion support.

[00:09:43.18] - **Str4d**

I may have described it in previous calls, but just as a re-summary, we wanted to enable wallets to query the exchange rate between ZEC and USD, to begin with, in a way that doesn't leak information to exchanges about that user that they don't necessarily want.

[00:10:09.07] 

If a user is using exchange then they're revealing their IP address to those exchanges. But we didn't want to require doing so just for getting a sense of what the fiat rate is. The current PR that's up for doing that uses the Arti library for fetching these over Tor. It attempts to fetch from three data sources and then takes a median of them or gets the best result it can from the data sources it has. The code for that's up there, and as I said, is waiting for review.

[00:10:48.11] 

The main issue that is currently being run into is that three data sources that I'm attempting to use right now are Binance, Coinbase, and Gemini. The response from Gemini is almost always good. The response from Binance is most of the time good, and then sometimes has some like four, five, one unavailable for legal reasons or four or three unauthorized kinds of requests.

[00:11:12.20]

But the Coinbase API, every time I have attempted to test this, has always returned a 400 error, which implies that Coinbase is probably just blocking all Tor exit nodes as client IPs. We're looking at whether there are ways that Coinbase can bypass that if the app authenticates at an app level in some way. But we're also going to look at some other possible data sources for exchange rates that we feel aren't immediately subject to market manipulation.

[00:11:55.01]

For instance, looking at potentially having one of the aggregators that exists as a potential data source there. But in any case, what it comes down to there is just having enough different data sources that if we can reliably get three, then we can reliably take a median and it's going to It's going to be pretty consistently fine for usage. But yeah, so at this point, it's literally just what data sources are accessible via Tor, and then reviewing that code, and that will then be accessible to anyone using the Zcash client backend rust crate.


___


### 3. ECC & ZF Zcashd Deprecation


[00:13:37.17] - **Str4d**

I can give a brief update from the Rust crates' perspective, which is that we have merged Kris's PR that adds more parity between how shielded and transparent funds are represented in the zcash client back-end & zcash client SQlite layer. We're not all the way towards essentially the backend wallet being able to do the same kinds of transparent spending as zcashd, but we're a big step forward towards that now which will be necessary for the wallet work. 

[00:14:29.23] - **Dodger**

And can anybody on the ZF side provide an update on the Zebra scanner separation? 

[00:14:49.14] - **Arya**

Alfredo is working on moving the tests, Zebra scan is mostly separated at this point into its own binary and we've begun working on the indexer RPCs to support the replacement wallet on ZF side.


____

### 4. Research & Implementation Updates i) FROST 2.0.0 -rc0

[00:15:27.09] - **Conrado**

These past two weeks, I think the main thing is that we released the [2.0.0 -rc0 release](https://crates.io/crates/frost-core/2.0.0-rc.0) of the FROST crates. This has a bunch of breaking changes. It has a simplification of the serialization API which I think makes much simpler to serialize things.

[00:15:55.01] 

It support no std, so if you need frost in some embedded environment or something like that, you can do that. Just one cypher suite that does not support, which is ed448 and another small API changes, adjustments that since we're going to do a break-in release we might as well do those cleanups.

[00:16:20.04] 

So if you are a user of FROST, take a look into 2.0.0 -rc0. If you have any feedback, please provide us, and at some point in the next month, we'll do the final 2.0.0 release. We also keep working on the refresh shares functionality, which is very close to be finished on the frost server, which is the thing we're working on to help people use FROST to help them communicate with each other. I'm working on adding user registration because if you have user registration, it makes it easier for people to find the other person and download public keys, stuff like you need to authenticate connection and so on. So we have a very simple proof of concept on this, and we'll keep iterating on that. I think that's it.



____

### 4. Research & Implementation Updates ii) Zcash Sustainability Fund update



[00:17:44.24] - **Tomek**

So the work on the ZSF has resumed in the last couple of weeks. What I've been working on recently is updating the librustzcash to update the transaction IDs and sighashes and transactionread, transactionwrite methods to include the ZSF deposit field. I'm doing all of that behind the Zcash unstable rust flag, so similar to the ZFuture one that's already there. I've been also updating the Zcash test vectors because this is something I discovered that exists just a couple of days ago, but I guess it needs to be updated as well. So the best data for transactions that include a ZSF deposit field are also generated.

[00:18:52.24] - **Dodger**

Any questions relating to the Sustainability Fund?

[00:18:56.15] - **Str4d**

Yes. So I saw in the forum I think it might have been you posted that you're targeting early 2025. Is that correct?

[00:19:11.19] - **Tomek**

Well, Jason posted that. I'm not sure. He didn't really consult that with me, so I'm not sure what's the background.

[00:19:21.11] - **Str4d**

Basically, what I would like to figure out, because it's been a while since we've had ZSF come up with people in the Arborist call. With my ZIP editor hat on, I wanted to confirm whether or not you plan to have any of the ZSF zips ready for the deadline on Tuesday for potential inclusion in NU6, specifically meaning potential activation concurrently with the network halving.

[00:19:56.16] - **Str4d**

You don't have to answer that right now if you don't know the answer, but the  deadline for Zips that people want to activate concurrently with the network halving in November is Tuesday, and the drop dead for the Zips being absolutely finished is two weeks after that. If the intention is to target ZSF for a network upgrade in early 2025, then you're not subject to those deadlines and you don't have to worry. But if you are trying to to get it ready for that point, then those deadlines are in play.

[00:20:35.10] - **Tomek**

Yeah, I'll discuss this with Jason, but I think the last time we discussed this, we were not targeting NU6. We didn't think that's realistic. We also were discussing whether or not we'll wait for zcashd deprecation, actually, because we don't have an implementation of that started.

[00:20:57.00] - **Str4d**

Those are both conversations that would be good to have, probably in the R&D Discord. Definitely the second one in terms of knowing how much of a delta the ZSF stuff requires and whether it is too much of an implementation burden to be able to add into zcashd. But the NU6 thing is the main one to establish. If you can just, we put it this way, we will presume that if there isn't a Zip submitted by the deadline on Tuesday, that there isn't an intention there. But I wanted to make sure that that was an active decision rather than a reactive decision.

[00:21:35.00] - **Tomek**

Yeah, I understand. I'm pretty confident we were not targeting NU6. I'll discuss it with Jason just to make sure.

[00:21:41.09] - **Str4d**

Great. Thank you.

[00:21:43.02] - **Dodger**

Jason has communicated on the forums that the Zcash Sustainability Fund will not be ready in time for NU6.

[00:21:52.22] - **Str4d**

Okay. I had missed that update. That must be in the last couple of days. Great. That basically answered my question. So That has knock-on effects for what will be an NU6. From a simplifying perspective, that is great.

[00:22:11.14] - **Dodger**

Cool. Any other questions or comments  the Sustainability Fund?

[00:22:19.19] - **Tomek**

Maybe I'll just mention there was a post by Jason a few days ago. We were thinking about changing the name of Zcash Sustainability Fund to something more friendly. So if any If you guys have any suggestions or you want to participate, we'd be grateful.

[00:22:38.19] - **Dodger**

One of the two hardest things to do in computer science. Right. Maybe. Many things. Okay, let's move on to ZSAs. And we have both Vivek, I think, and Jonathan here. So I'll leave it up to you guys. Who wants to take the lead?


____

### 4. Research & Implementation Updates iii) Zcash Shielded Assets Updates


[00:22:59.07] - **Vivek**

I'll give the main update. So I guess we had this pull request on Zcash node encryption to the upstream, and we got a review from Str4d recently. So thanks, Str4d. We started working on responding to the comments there, and we'll probably get back to you and either change the code or discuss it in our meetings.

[00:23:32.19] 

The other stuff we've been working on librustzcash and Orchard, both the crates, making sure we have all the V7. We are moving things to V7 as the NU7 as the general name. We tried to put things behind the feature flags with a zcashunstable=nu7 feature flag is what we've kept things so that all our ZSA work can soon start to be merged in with those feature flags there to keep them separate.

[00:24:11.20] 

We've also worked on the Zcash test vectors that were mentioned earlier. We created one set which just separated out the altered ZSA from the rest of the Orchard test vectors, and we have that ready for review. We've been working on the ones that also change the transaction format, which will then match the implementation in librustzcash. So that's largely done. We are just cleaning up some code, making improvements, stuff like that. And we'll be adding a new full request for that, subsequently, when that's ready.

[00:25:00.08] 

We've also done some work on Halo 2. I think there's been stuff that we've been doing where there's been some standalone enhancements to Halo 2, which generalized the lookup range check and things like that. I don't think we've put out the PR to upstream yet. I don't remember if that's happened, but I think we are reviewing viewing it properly inside our team. If it's not out yet, it'll be out in a short bit.

[00:25:41.22]

Just for information, for the Zips, we had our earlier pull request for the Zips merge some months ago. We've opened a new pull request. It's a [Pull Request 854](https://github.com/zcash/zips/pull/854). That will be the place for further changes, things that we correct or improve in the Zips going forward.

[00:26:11.21] 

I guess on Zebra, we've had this Zcash transaction testing tool, so we've been updating it to allow it to support the new V7 transactions. The work on librustzcash and Orchard helps support that as well. That's, I guess, the main points of the update. I don't know if John might have something or not.

____

### 4. Research & Implementation Updates iv) ZSA New ZIPs

[00:26:47.10] - **Jon**

I can add that we started the work on two new ZIPs, which are one, user control on receiving transactions. So this is the ability to refuse the transaction if you don't want to receive the funds. It's very similar to liberated payments and paying with links, it's in the same area of work.

[00:27:17.18] 

We've started working on the verified encryption, which is the ability to have an issuer of an asset get encrypted to them details of the transactions of that asset. This is, of course, maybe one of the one of the only features that we've done that are not centred around keeping privacy, but rather it's centred around allowing the adoption of ZSA for stablecoin issuers.

[00:27:58.12] 

So the zips for that are being worked on. We started working on them a while back, but we got the acceptance and the date to submit them officially soon. The goal of submitting them early before we even start implementing any of them is to get direct feedback from all of the community, but in particular from the Zip to see that we're not missing cases and to react on a concrete proposal. There's a whole conversation about it in the forums.

[00:28:47.01] - **Kris**

We know that we need to go back there and answer some of the questions. I had a chat yesterday with Zooko on some of those features. I I haven't spoken to Zooko for a while. The question about how fast can we have ZSAs themselves deployed is present in everyone's mind. So we really hope that that NU7 is not very far behind the NU6 so that, you know The word can be used by the community and hopefully with an impact on the usefulness for the whole ecosystem.

[00:29:45.04] - **Daira Emma**

Yes. I made my opinions about this feature in general clear at ZK proof 6. I think the [video](https://www.youtube.com/watch?v=CyTqEr8A52Y&list=PLOEty2U8Y69Uzkd6MthUjWbOxQHzBAtCQ&index=8) for that is probably online, but in In general, I'm opposed. The main reason is that I believe it creates a honeypot for the issuer keys that are used to control access to this additional data encrypted to them. The question I wanted to ask specifically is more of a technical one.

[00:30:33.01] - **Jon**

Just one thing. I think you reacted to that in the Zcon 5 online conference. Is that correct?

[00:30:38.24] - **Daira Emma**

I think it was both. It might have been both at ZconV and ZKproof 6. I'm not sure. Okay. Yeah, actually, the first time was at ZconV. But I wanted to ask a technical question, which is that, so if the verifiable encryption is only used to provide essentially a backdoor for some party associated with the issuer or decided by the issuer, then any potential selective disclosure benefits of that are not available to other Zcash users.

[00:31:31.10] 

It's not technically necessary for that to be the case. You could have variable encryption that could be used more generally and would work for any viewing key. I think that's not compatible with the approach that was described at ZconV and ZK proof 6. Can you explain why you've taken that approach?

[00:32:09.13] - **Jon**

Right. Now I recall that you reacted to Pablo's talk on ZK proof 6. That's correct, yes. I remember that. Yes if I understand correctly, you would find a benefit to having these types of techniques applied to selective disclosure where it's fully consented by the user.

[00:32:36.13] - **Daira Emma**

The devil is in the detail, right? Yeah. If there's in practice, any form of coercion of users in order to use this asset at all, they need to give up their keys, then that's different from genuine consent. But just on the technical question of tying the verifiable encryption to the compliance feature, let's call it that. I don't think that's necessary.

[00:33:19.18] - **Jon**

Okay. I was actually planning on asking you for one-on-one to get your full view and to go deeper there. I think it's way past time. So let's do that. But generally speaking, at QEDIT, we're fully aware that this is not your regular type of ZIP where it's adding to the benefit that users get in Zcash and don't get anywhere else. Zcash is unique in that sense that you have deep privacy, and then you start taking away from it, if at all. This is contained in a particular asset. So it doesn't have to be used, looked at or anything of the sort by the general Zcash users.

[00:34:34.05] - **Daira Emma**

It's more complicated than that because let's say that a regulator sees that this feature is available for some assets, what's to stop them saying, We'll shut down Zcash unless you apply it to all assets, including ZEC.

[00:34:48.11] - **Jon**

The same thing that stops them from stopping Zcash today from functioning, which is, it's not practical to enforce something on an ecosystem that doesn't want that feature to be there. So I believe that nobody is capable of moving on ZEC in a way that is accepted by the ZEC ecosystem, by the ZEC ecosystem. I think that when you do an isolated related additional functionality, then that is a different business.

[00:35:37.17] 

In a way, this additional functionality is the longest declaration you can give to law enforcement that this community is concerned with having legitimate uses on the platform be the main use and is trying to send a signal to non-legitimate uses that they're not welcome. But again, that's something I think we've discussed on stages, off stages.

[00:36:13.19] - **Daira Emma**

I would push back on the implication. I'm not sure whether you meant to make this implication that having complete, full, and not in any way backdoor privacy is in any way not legitimate. It is to want to protect yourself from the surveillance state.

[00:36:31.19] - **Jon**

I'm in this ecosystem for that reason. I think you cannot have the privacy freedoms that you are building if you don't have full privacy and I think that the fact that you consent to use or not use the asset preserves that fundamental freedom.

[00:36:56.13] 

The illegitimacy is is of criminal use, which we as an ecosystem developer on our side, we don't have access to viewing the bad uses. There's a distortion that makes it viewable only from a tiny window from law enforcement side. We don't see any of it. But again, you will not find an implication it's important for me that privacy itself is illegitimate. On the contrary, it's what we need to push and having messages that send away bad uses on these islands of assets, I believe, is a means for that same end.

[00:37:54.22] - **Daira Emma**

Part of the country view is that surveillance features are not only used for criminals. Only recently, there was a proposal in the UK to monitor the bank accounts of people claiming benefits, and this would have hugely impacted disabled people in particular. The proposal was basically shot down, partly because the current government doesn't seem as though it will have a long time in power, but the party that is likely to win in the election is not particularly left wing either, and they may resurrect some parts of these proposals. We cannot assume that surveillance in general by a state or otherwise, or by hackers who have been able to compromise encryption keys, we can't assume that that is only used against criminals.

[00:38:57.24] - **Jon**

I agree. But again, when you apply these things to assets that are backed by assets that already are under scrutiny of government, then this argument goes back to for real strong privacy use ZEC. And for practical, non-volatile, but not private from the government asset, you hopefully will be able use other means. But I do want to have all your views on the underlying technology as well, also because this is going towards a zip very soon. So let's continue this party, at least parts of this conversation offline.

[00:39:50.03] - **Dodger**

Yeah, this feels very much like going way off the reservation But in terms of an arborist call, perhaps if people want to continue this discussion we could do so at the end.

[00:40:09.16] - **Daira Emma**

One more very short point, one sentence. It needs to be postquantum if you're going to have any keys that give access to more than one user's data, because it will be a disaster if some centralized compliance mechanism got broken by quantum computers.

[00:40:37.05] - **Dodger**

Okay. We can return to this as part in the open discussion if people want to stay on, but for now, I believe the last remaining item on the agenda is any open announcement. If anybody has any announcements that they want to share, please raise your hand now.

[00:41:03.17] 

Otherwise, I'll say the next Arborist call will be on the 11th of July during the later time slot. Now we can return to the open discussion. And coincidentally, Daira still has their hand raised. But in terms of listening to updates, people can depart now if they want to.

[00:41:28.11] - **Daira Emma**

I lowered my hand. I didn't have I don't have anything more to say specifically on that. But I am interested in other people's opinions. I haven't heard too much about what other people think about QEDIT's proposal.

[00:41:46.06] - **Dodger**

I'll share my views on it. I think that we face an increasingly encroaching regulatory environment where access to Zcash is being nibbled away. And we have to decide how we're going to deal with that threat effectively to Zcash adoption.

[00:42:19.09] 

For me, a key factor is whether this is an opt-in or a mandatory feature. And my My understanding is that it is entirely an opt-in feature, i.E. The person or entity that is issuing the ZSA gets to choose whether or not this feature is enabled or not. I also think it's important that it be clear to users whether or not this feature is enabled or not. And beyond that, I think that, to my mind, Zcash is about permissionlessness. I'm not as concerned Daira, as you are about the potential for a government forcing us to do something, because certainly in the United States, you can't compel speech in that way.

[00:43:28.17] - **Daira Emma**

I mean, there are other levers of power. There's going after developers, there's putting checkpoints on the exchanges so that, yes, in principle, ZEC might stay free, but you can't interoperate with the existing financial system using it. There are plenty of ways in which the surveillance state can effectively get what it wants and squeeze out the use of actually private money. In general, I think this kind feature is helping them.

___

### 5 Open Discussion i) ZSA Verified Encryption 


[00:44:42.19] - **Dodger**

I think this is absolutely a discussion that should take place and should incorporate as wide a range of views from across the Zcash ecosystem. I think it's really important that we don't end up in a situation where I think a decision about whether or not to implement this needs to be taken transparently rather than through any feet dragging or anything like that. So I think it does need to be a broad discussion about it and hopefully, all views can be shared and heard and hopefully, we'll be able to reach a consensus about whether or not it should be implemented.

[00:45:36.14] - **Kris**

There is a interesting governance question here, which is, ZCG has opted to fund this work, essentially without there being community consensus as to whether or not it would ultimately be desired by the community in a larger sense. That's not something that's unique to this situation. The organizations, we hope that the individual organizations, ZF and ECC, are paying to do development on things that are approved of by the community in general.

[00:46:32.05]

But this is a unique item from that perspective in that for the first time, this is the community choosing to fund something that will potentially contract the privacy of naïve users. We have generally, in the past, tried to protect naïve users from things that might impact their privacy. But this is going the opposite way where a less informed user might inadvertently expose themselves to surveillance because of a feature that's being added.

[00:47:39.08] - **Daira Emma**

Extremely good point.

[00:47:49.20] - **Jon**

I agree with this point, actually. It's true. It's a risk that naïve users would be exposing themselves to scrutiny from the issuer. I do believe that there is the same type of risk with any stablecoin, which is that the fact that the underlying assets are held by the issuer means that they're under that actually the tokens they hold are not really direct value, but an IOU on the underlying asset, if they go to redeem it.

[00:48:45.00]

But it's true that different from what existed in the past, this is something that goes not in the direction of added privacy for the user of that particular asset. I don't know what to do with that fact. But the reason why we thought it would be interesting to add these features is the trade-off of signalling that since we already have the the issuers being under a jurisdiction, let's use that fact to have... Let's push that fact all the way to its conclusion, which is the issuer is basically a different participant in the rest of the ecosystem. But, yeah, you're right. It's a departure from past features.

[00:50:01.10] 

I would say that for years, most of the Zcash blockchain was running on transparent addresses, and most users were believing that they have privacy when they didn't have. But that was a separate problem. 

[00:50:20.06] - **Daira Emma**

And it's still a problem.

[00:50:21.23] - **Kris**

Yeah, it's still a problem. The one thing that I'll point out is that in terms of deployment of resources, this is getting to the governance question, the choice to deploy this feature for use with stablecoin issuers is at the expense of potentially advancing work on, I know Dodger is very enthusiastic about shielded programmability. With shielded programmability, you get the option to starting having

[00:51:03.03] - **Jon**

But it's not, though, because there isn't shielded programmability proposed on the table by any group of developers.

[00:51:11.01] 

I actually checked that with the Grants Committee. I asked them because the grant initially was proposed to be implemented as well. This is just the zips of that grant. So we rephrased so that the discussion on the feature will be on a concrete proposal rather than the titles. But there's not an alternative use of those funds from what I'm hearing.

[00:51:41.21] - **Daira Emma**

I don't think it's a strong argument, but I have my hand up and what I wanted to say is, first of all, it's not necessarily just the issuer that gets this information. It's anyone who has the keys, and specifically the decryption keys. I haven't heard of any plan to use threshold decryption. Why is there an assumption that the keys will be held by the same entity that is authorizing issuance? Because that's clearly a conflation of two different authorities. Those are the two main things I wanted to say.

[00:52:38.18] 

Even if it is the same organization, you wouldn't just for security compartmentalization, you would want to have different people associated with authorizing issuance and with being able to access the graph of funds.

[00:53:03.05] - **Jon**

I think when discussing the feature from a high level, we present it in its most controversial version. Which is if you don't trust the issuer, you don't get close to that particular asset. But of course, from there you can start adding practical implementations that make it way less dangerous. Still, if there's a collusion or bad key management or things like this, from the perspective of the user, their transaction was compromised.

[00:53:49.05] - **Daira Emma**

In the best possible case, it's not going to be just the issuer because the surveillance state in any particular country can order the the issuer to give them the keys and not tell anyone. That's true in the US.

[00:54:06.09] - **Jon**

That is the basic assumption is that the viewing key is shared with a bunch of law enforcement agencies that-

[00:54:17.11] - **Daira Emma**

So it's misleading to just say that it's the issuer.

[00:54:22.04] 

But that's not what's going on in the proposal that you will see. The assumption from the user perspective is that there's processes that influence the issuer to disclose upon those processes completing the content of all relevant transactions. Possibly the processes are very wide and possibly the transactions are all the transactions. There's not going to be any misleading on that. The privacy in that island of functionality that asset is very far from what you get in ZEC.

[00:55:05.13] - **Jon**

The ability for Zcash to nevertheless hide the transactions from everybody else on the network is an added benefit that distinguishes that type of stablecoin on Zcash from any other stablecoin on any other system, which makes it an unfair advantage for that stablecoin in the race among stablecoins. But from From the perspective of a user that doesn't trust the issuer or the the authorities that influence the issuer, you're again, right. It's not a private transaction whatsoever, and it's very clear in the proposal, I believe. It will be clear in any case in the ZIP.

[00:55:54.07] - **Kris**

We will have, with ZSAs, added a new set of shielded asset pools, and then this essentially is proposing to add a new set of effectively transparent asset pools.

[00:56:22.07] - **Daira Emma**

Actually, I think it's worse if a pool is implied to be private to anyone except the law enforcement and issuer. In fact, the keys end up getting leaked because we know that even intelligence agencies can't actually keep secrets very well. Obviously, the Snowden leaks. They leaked a ton of information that the NSA was highly incentivised device to keep secret. I don't see that creating this big honeypot of a key that will give you access to the whole transaction graph. I don't see that that's a sensible thing to do.

[00:57:19.13] - **Kris**

I wanted to also push back a little bit, Jon, you said that this doesn't conflict in terms of opportunity cost with opportunity cost of working on other things in general. The work that will go into these zips and so forth is work that could go into, again, I'll mention shielded programmability and that as a gateway to algorithmic stablecoins. We have some examples of algorithmic stablecoins that have performed pretty well over the past several years in terms of maintaining their stability. They are not tied to single assets, but there is absolutely an opportunity cost in choosing to pursue this avenue, even if it's just doing the research and writing ZIPs.

[00:58:16.22] - **Jon**

Maybe if there were teams out there that were proposing what you're describing, unfortunately, what Daira said earlier is very true. And one of the levers of pressure that governments can have is go after developers. And the piling on on the side that pushes towards the usability of stable coins with without regards to any potential misuse. QEDIT is unable to take on such tasks. I don't believe that there's many teams out there that are capable from a legal exposure perspective to take on such a task. Maybe there are, but I haven't heard that in practice arriving at the table of ZCG.

[00:59:38.05]

What we're suggesting to the community and ZCG, and have suggested is start making concrete steps to reinforce Zcash robust as an ecosystem by demonstrating that where it makes sense, which is, again, where assets are being backed by assets that are already under some regulatory review. So where it makes sense to demonstrate that the ecosystem itself is financing those features. It's a huge statement. It's not a small statement. But I'm actually eager. I'm hearing that there's going to be more things coming up soon for the Zcash ecosystem.

[01:00:42.16]

I'm actually eager to see where the grants are being, what proposals arrive and what is built next. I think there's a gazillion things that can be built. And I want to see those things built. Not all of them, get it as a company, can come and say, Hey, we'll do it, because we only have so much budget of involvement to dedicate to some of those features. I don't know if it's clear what I'm saying, but I believe that there's features that could be built with that financing, even with the current Zcash price. Beautiful features, but we can't propose many of them.

[01:01:54.07] - **Arya**

I'm sceptical of stablecoin issuers joining the Zcash ecosystem if they're not able to to satisfy their own compliance requirements. But I also share Kris and Daira and his concerns around the safety of doing this in a good way, and I'm not sure there is a good way to do it. We need to be very careful here I think.

[01:02:16.10] - **Jon**

Let's look at the zips and see if we propose a good way or not. That's part of the reason why I want to have those talks with Daira.

____


### Attendees

+ Daniel (decentralistdan)

+ Jack Grigg

+ Alfredo Garcia

+ Arya Solhi

+ Conrado Gouvea

+ Daira Emma Hopwood

+ Kris Nuttycombe

+ Marek Bielik

+ Pacu ZWCD

+ Tomek Piotrowski

+ Vivek (QEDIT)

+ Oleksandr Putyak


**Next Meeting Scheduled: 21:00 July 11th 2024**
___
___
