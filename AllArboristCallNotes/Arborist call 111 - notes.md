### Arborist Call # 111 Notes 

Meeting Date/Time: october 2nd 2025, 21:00 UTC

Meeting Duration: 40 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zingolabs-updates---zaino) [zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-ecczfzingo-labs--pacu) [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=hq8Vigg3RxQ)

Moderator: Alex

Notes: chidi @zcashNigeria (X)

## Full Notes

## Welcome & Meeting 

Alex: 00:2:59  

the agenda is core stack updates with Zcash Foundation, electric Coin Company with Zcash D, core libraries and Zallet CLI wallet updates, Zingo labs with Zaino Zcash D deprecation, and then research and implementation updates, qedit with Zsa, and then, usually shielded  labs with NSM. But I don't believe anybody's here today from shielded labs, and then shielded labs and Ecc, cross link trailing finality layer, and then any open announcements and discussion. So what are arborist calls? Arborist calls are bi weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts design and implementation of new protocol features and identify blockers and unresolved issues. The purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development. Can register at Zcash arborist.org if you want to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot 

Other ways to get involved Zcash community grants, Zcash R and D, discord and the Zcash community forum. And you can find these links by pointing your browser at Zcasharborist.org, so core stack updates Zcash Foundation, zebra

## Zebra Update 

Arya: 00:04:33  

That's me today. Thank you, Alex. So in zebra, since the last arborist call, we've merged PRs that added a health check endpoint so container orchestration tools like Kubernetes can restart zebra if an instance has exited or seems to be having issues. We restored a test checking that zebra disconnects from misbehaving peers as support for querying side chains with the get raw transaction RPC, implemented the get network info RPC and simplified our CI and made it work on forks. There are also new PRs open which add  another simpler health check endpoint to the RPC server, add a map request trait for the state service to provide convenient access to concrete response and error types to callers of the state service, which should be very useful as we improve error propagation from server state. There's another PR that improves error propagation from the state service when handling invalidate block requests following two other recent PRs, both all of them by sisseri. Thank you, sisseri, that did the same for the commit semantically verified block and reconsider block requests. And then there's another PR open that advertises mined blocks to all peers in the peer set, and fixes an issue with advertising generated blocks on test networks when those blocks were generated in quick succession, and I think that's most of it.

Alex: 00:05:54  

Thank you, Arya. Any questions for Arya. ZF also posted a long update on the forum related to our engineering engineering work lately, so definitely check that out as well, onto core stack updates with Ecc on Zcash D core libraries and Zallet.

## ECC Update 

Kris: 00:06:14  

All right, so a few major things since the last arborist call. One is that we've completed a bunch of work on the Zcash script crate to sort of finish out the rust implementation of the Zcash script interpreter, and we're hoping so that has been used now for the generation so for adding P2SH support to a number of The back end libraries so that we were able to do the key holder org generation for the Nu 6.1 lock box disbursement address. So Strad piloted that ceremony on Wednesday, and we now have a p2sh address and a bunch of  new standards for the Zcash ecosystem, for how p2sh should be handled.So see zip 48 for all of those and a bunch of new software just in support of p2sh transactions generally, with a bunch of specifics for P2SH, multi Sig. Beyond that, we have forthcoming crate releases for the entire stack, for the Nu 6.1 network upgrade and those crate releases should hopefully happen today, and then we will have a Zcash D supporting Nu 6.1 release also happening in the next day or so. So those are the major efforts. There's also been a number of smaller efforts related to Zashi, they're mostly UI and UX related. We have a couple of things coming. We merged a bunch of changes for support of different wallet policies around the number of confirmations to use before spending, and have a couple more changes on that front, and also some changes related to now that zashi has swap functionality using sort of one time use transparent addresses when interacting with third parties that only need a one Time use transparent address.

Daira: 00:09:00  

should we just summarize the confirmation depth policy?

Kris: 00:09:07  

I think that it's documented in zip, 315, effectively, we have a distinction between what's considered, what are considered trusted Utxo. So these are typically txos that your wallet produces. So change txos And untrusted txos, those are txos received from third parties. The new policies in zallet, by default, will use three confirmations for trusted txos Because they're you're not concerned about someone double spending on you, and for untrusted txos, it's still ten confirmations, but wallets will be able to adjust  those levels on their own, and there will be mechanisms for marking your own txos, or marking  txos as not trusted, If you want to say, No, I trust the sender and not to not to double spend.

So yeah, that's it.

Alex: 00:10:11  

Great. Any questions for ecc? huge thanks to strad, i witnessed the key generation ceremony when it happened ,just absolutely amazing listening and watching how that unfolded, thanks to Ecc team and everybody as a whole that made that possible you all put in a massive amounts of work

Daira: 00:10:38  

Yeah, yeah. Strad has moved  and  deserves a lot of credit for that

Alex: 00:10:42  

He definitely needs more sleep after that. Huge appreciation. thank you. next, Core stack update, Zingo labs with Zaino.

## zingolabs updates - zaino

ZA 00:10:56  

So we've been making steady progress on updates to support zallet,we have been refactoring our code to better encapsulate upstream types from downstream, so our public API will be exposing fewer upstream types. We have been decoupling. We're almost complete, completely done with decoupling Zingo infrastructure from all non test crates in Zino. We have started working on block explorer RPCs. We have two that we finished off recently, another five in progress and we are updating the configuration for Zaino. That work should also be landing soon.I think that brings us up to date for

Alex: 00:11:57  

great any questions for za. Okay, ZcashD, deprecation updates, ECC, zingolabs, pacu 

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:12:09  

Hi, everybody. Yeah, a bunch of things covered previously by ZF updates, zingo labs and Ecc. I think there are few things that were not explicitly mentioned, which is that we are at the point in time where Nu 6.1 is being wrapped up and everything is getting ready to for the activation later this year, and also, like at the activation height is going to be set up today, depending on zip editors availability. So people watching this should go to [here](https://zips.z.cash/zip-0255) and check the activation height.

Daira: 00:13:10  

And that's zip 255, by the way. Thanks

Pacu: 00:13:14  

Thank you. daira emma and then ZcashD 6.10.0 will be released at some point in time soon, and there will be zebra release as well. I think we had talked about that being 3.0 but I know, I don't know if that does that's a final decision from the Zebra engineering team, but yeah, everything, there will be a bunch of releases of a lot of software, so just pay attention, and we will, anyway, be contacting all the people that We have direct contact with, like exchanges, block explorers, miners, to remind them of these new updates, what the timeline is for the network upgrade and and All that soon, as we always do, and with this, we have been also talking a bit about, like post Nu 6.1 work, transitioning to the Nu 7 work, like memory bundles or a lot of things in the orchard crates and whatnot. Yeah, so that's pretty much what was not mentioned by everybody else. And yeah, we will reach out, but stay tuned for the new software releases and let us know how everything goes. Also,  we're slowly contacting people for the zallet closed alpha its not closed because, like Ecc folks and everyone here in general, built in the open, but it's closed because we picked up specific orgs that we have a closer relationship with  for this initial alpha stage of zallet. But everyone who's listening or watching this can go to [here](https://zcash.github.io/wallet/)  which is the Zallet repo, and check the alpha and take it for a spin. Read the Zallet Alpha book, which is a very comprehensive guide of how to get started with Zallet. And that has happened, like the last few weeks. I think it was released on this last arborist call, and then, yeah, we've started like the outreach in the last past two weeks. So that's progressing as well. We have three responses confirming they will participate, and we're waiting for three other responses, yeah, and that's pretty much it.

Alex: 00:16:25  

Any questions for Pacu ? Alfredo,

Alfredo: 00:16:34  

I want to add that i saw in the discord that zechub, I think this month made some sort of tool for their shielded newsletter using zallet and the memo I think so they will release the code for that  workshop they have, and I think it might be worth to add into our list of Zcashd,  deprecation efforts.

Pacu: 00:17:07  

Oh, thanks for adding that. Yeah,

Alfredo: 00:17:10  

I'll send you a link to that conversation in the discord pacu

Pacu: 00:17:15  

Oh, thank you. Oh, yeah. And, speaking of which, like Alfred, has been working a lot on the RPC test framework, which is helping a lot to actually get a good test for Zcash deprecation. That's promising. Thanks, Alfredo.

Daira: 00:17:34  

Yeah. Alfredo also asked on chat about updating LibrustZcash for the Nu 6.1 activation height, that's PR 1979

Alfredo: 00:17:51  

After the zip is approved, there's going to be another PR in LibrustZcash. So how is the process?

Daira: 00:18:03  

the processes is that we just merged that Pr

Kris: 00:18:08  

PR, yeah, the PR that's up there has the has as the activation height, what we have been discussing, which is the the end height of the existing lockbox funding stream so that there's no interruption and but not before that. So that's what I've implemented in that PR as the prospective activation height, but, but yeah, we will, we will codify that in the zip.

Alex: 00:18:46  

Thanks let's move on to research and implementation updates with qedit Zcash shielded assets.

## Research and implementation updates- Qedit Zcash Shielded Assets

Pablo: 00:18:54  

Thanks, Alex, can I share my screen? Please?  okay. So I want to start with a quick status update on the Zsa project. So ECC successfully merged our changes in regards with Halo 2 gadgets and Halo 2 proofs, this is actually inside the same GitHub repository. Also merged the sinsemilia and the changes required for Zcash node encryption, currently in  the orchard Zsa, which is a big amount of work, is ready for review. We will discuss in detail in a moment, also work being done around sapling crypto, LibrustZcash. Librustzcash includes multiple crates and zebra. In addition, there are auxiliary code bases, mostly the Zcash test vectors; the section that relates to Orchard zsa also ready for review. And the Section relates to transaction v6 this is in progress. We also have the TX tool. It is our way to generate v6 transactions. This is not for review. This is auxiliary, so we do need to maintain it until everything here is merged, but this will not be submitted as part of the core code base next on the subject of orchard Zsa review. So this is a big amount of change, of changes, and generally speaking, we can divide this into four sections, so we have orchard Zsa, basically the ZSA data structures added to orchard and to the builder. This is the most significant amount of changes and the most critical point to this project. This is this part we have, the orchard Zsa circuit. I colored it in green because it was previously reviewed by least  authority and it was not changed since then. So we have at least partial indication for correctness and not the entire load of a review is on ECC, we have some external point of view that this is good and this is working and this is secure. Aside from this, we have Python test vectors for orchard, Orchard Zsa, this is also ready for review, and this can be reviewed in parallel to these two. And in addition, inside orchard  crate, there is the Pczt section. We changed it, we upgraded it to support Zsa, just for transfer for the moment. And we call it version two for orchard Pczt, because obviously the original Pczt, whoever uses it for orchard should continue to use this for orchard. This new version is for future, for the future, for future wallets, for future hardware wallets. Again, this can be postponed, but the main weight is on the on the structure and the builder. A question for ECC, when do we want to start the review? Daira emma  and Chris, do you have an opinion on this?

Daira: 00:22:59  

So in the meeting earlier today, I said, as soon as we can, we've got a little bit of stuff to finish off, but yeah, within the next two weeks

Pablo: 00:23:12  

This is good news. We can put this behind us. This is significant after this. The risk for the ZSA would be much lower, much lower. We are available for interactions. The review will require interactions. We can, we can discuss how to do this in our bi weekly meetings. Thanks. Okay. Next I want to discuss integration. So we're doing integration work in addition to everything else. So we already did the changes required to version the SIG hash for orchard, but it makes a lot of sense that we are already familiar with the logic, and we are also doing this for sapling and for transparent transactions to ease the process not to switch in the middle. So this is happening. The code itself is in librustZcash. Also, we will update our fork of librustZcash with these changes as well. We are doing a transaction v6 integration. So we are caught up with upstream. A lot of moving parts in LibrustZcash. We caught up with many people working on this. We know, we see the changes. We integrated the NSM field, which is actually the burn Amount field. Now we have TX v6 transaction format that includes both the orchard Zsa bundle, the issuance bundle, and then the same field in one package. This is a good step for integration. We saw that in the existing code for NSM in Zip 233 it is called  "amount", but in zip 230, it is called "Burnamount."

Daira: 00:25:06  

That's a bug in 230 I'll hopefully be able to fix right now.

Pablo: 00:25:10  

So the suggestion is to change to 30 for zip 233 amount. Yes, this is the

Daira: 00:25:20  

yes, yeah, it was intentionally changed from "burnamount" up to 233 "amount".

I guess that was best

Pablo: 00:25:30  

I see. Yeah,that helps. Another question about feature flags, okay, so now we have the combined version of TX v6 and there we discussed, there we discussed feature flags. But now this is a different question. So the zip 233  "amount" is currently under Nu 7 and under zip 233 feature flag. The question is, isn't it good time to combine those two flags together into a Nu 7 

Kris: 00:26:05  

Okay, note that the Zcash unstable flag is not a feature flag. This is a compilation flag. It's a config flag, and so it  cannot be Transitively enabled, and you cannot have multiple Zcash unstable flags enabled at once. So the answer is essentially that we would prefer to keep everything that ,the reason for having that Zcash unstable  config flag is so that we can merge these changes and make releases of the code without risking releasing a feature flag that might be inadvertently enabled by someone, all features of some or something of the sort. So these are not things that can be combined. They serve different purposes. The feature flag describes the feature being included with Nu 7, the Zcash unstable flag ensures that we can actually merge that code.

Pablo: 00:27:15  

But what prevents us from putting everything, including zip 233 amount under Zcash unstable  Nu 7.

Daira: 00:27:27  

Well, that would be essentially removing the zip 233, feature flag, which, I mean, if we're absolutely certain  that is going to be in Nu 7, then I guess we could do that. But I don't really see that there's a need to, at the moment, what's wrong with living as it is?

Pablo: 00:27:47  

So from time to time, there is a complicated intersections here. This is a very simple example, but we find ourselves with 234, feature flags on one field, and then you need to adjust the logic for the feature flags, while if everything combined into Nu 7 is much simpler, like you get additional logic just to take into account multiple multiple flags. I guess

Daira: 00:28:13  

I'm not understanding what situation you would need that,Can you give an example.

Kris: 00:28:21  

So an example would be, I guess, in a method call where say both is, you know, you have both an issuance bundle and zip 233 amount. If it would be more complicated, if there were scenarios where those two fields interacted, I'm not sure. I guess that because issuance and the zip 233 amount, they might interact slightly in fee, fee computation code, although I don't think that the the zip 233, amount has any implications for fees so, well, maybe it does in terms of

Daira: 00:29:14  

It doesn't in terms of calculating balance, but you don't need an interaction of flags to do that. You just have a conditional code that either takes into account, can you give an example, Pablo, of a more complicated case.

Pablo: 00:29:37  

I will try to look for this after I finish, if I'm available, I will return with this, okay,

Kris: 00:29:43  

In general, I would not be highly opposed to removing the zip 233 feature flag and just including it under the Zcash unstable flag.  It would just be better to have more examples of where it's causing what's causing problems.

Daira: 00:30:10  

Yeah, because each of the independent features will have a feature flag, right? So memory bundles will have a feature flag and so on.

Arya: 00:30:21  

but it might be a good idea to, instead of having a high fee for issuance, require that there be a 233, amount included in issuance, so that the fee essentially just goes to the sustainability fund rather than to miners.

Kris: 00:30:37  

I think that's been discussed before. Okay, I don't know what the resolution to that discussion was

Daira: 00:30:42  

There wasn't a resolution so far. It wasn't opposed, if I remember

Kris: 00:30:49  

I agree with the concept, but we just need to codify exactly what that is into the zips.

Pablo: 00:30:56  

Okay, very well, so we will keep it separate for now, but some, some time in the future, we will need to combine them into one probably, okay. So we have, we have this feature flag, sapling crypto, okay, so we have a version of sapling crypto, which the changes required for Zsa are not merged yet. So this is not a direct change for Zsa. These are changes caused by our changes to Zcash note encryption. So we did some updates to sapling crypto to support the changes in Zcash note encryption, but another portion of the changes is the sighash versioning. So we're doing sighash versioning for something in transparent this will affect the sapling crypto, so there will be a PR for this as well. So for swaps. We're not putting a lot of attention into this right now. On the side, we are doing proof of concept in order to verify that indeed transaction v6 includes, includes all the changes needed to support swaps and also all the rest of the assumption holds. So if we have this proof of concept, we can safely say, Okay, we did. We did everything needed in this, in this update to support swaps with minimum friction later. So this is happening as well. On the zebra front, we are working on global state management. So Zebra is a story on its own.We within the state, as previously discussed and upcoming we were going to include the consensus changes for Zsa and the additions needed based on global state and all on based on all the other components. That concludes the updates.

Alex: 00:33:15  

Great. Thank you, Pablo. Any questions for Pablo? While I get this sharing again, 

Pablo: 00:33:20  

Alfredo, go ahead.

Alfredo: 00:33:26  

Yeah, I have a few questions. The first one related to sapling crypto, is that change is strictly needed for ZSA or something that you want to do?

Pablo: 00:33:43  

So the change, so, the change that we were doing is versioning for SIG, hash. This is defined by the zips, because we already did this change for orchard. The logic is very clear. We discussed it with ECC many times, and we have, like our finger on the button already. Yeah, I agree.

Alfredo: 00:34:07  

Yeah i agree but so let's suppose we want to find out what is exactly needed to shielded asset that could be something that is optional.

Pablo: 00:34:23  

So again, this is, this should be backward compatible sapling for transaction  V5 should remain unchanged to support v5 this is for v6 we want to version Zcash for v6 even for something. This is the intention of the Zip editors.

Daira: 00:34:45  

it's, it's important that it be consistent between different shielded pools in v6

Alfredo: 00:34:53  

Yeah. What I show is that there are too many grounds open to do that, and I know shielded assets needs a big, actually, touch almost everything we have. And I was wondering if we can try to do the exercise of reducing the scope if we need it at some point. And the other question, 

Daira: 00:35:11  

i think it would be even more complicated to have sapling work differently from orchard in v6 

Alfredo: 00:35:31  

you mentioned a few test vectors, repositories, speaking about. I'm totally ignorant about this repository, but maybe the stuff there is somehow different and easier to review for other people than the ones that are more cold. So maybe we could kind of

Daira: 00:36:07  

Sorry, can you repeat the question?

Alfredo: 00:36:11  

So I was wondering if other people, like, for example, developers from the foundation, could review the test vector changes they are doing, or if that is so tied to the rest of the scene for the same people to do it.

Daira: 00:36:29  

I mean, I think the ECC  Core team would want to review those changes anyway.

It's the kind of thing that needs to, relies on it.

Alfredo: 00:36:41  

Okay, that makes sense. But if you're going to be reviewing it anyways, I'm not sure.

Daira: 00:36:49  

Well, I think it would be useful for people for more than one Org to  review, obviously, if you don't have time, then no. 

Pablo: 00: 37:04  

So what I like about these suggestions is, first of all, I really like the test vectors. The test vector is, actually, a reference implementation. It's, it's, it's relatively easy to read and to understand and to compare to the zips much easier than the rust code. So if, say, two reviews are required, one of them could be Zcash Foundation, for example, or something like this, this, this is a very, like, very positive suggestion, in my opinion. Yep, I agree. We could discuss this Alfredo in our meetings on Wednesday. We can kick, kick start this. Maybe even I can push this further, to a situation where it is actually reviewable. It is reviewable. Maybe I will do another post to make sure and then guide the Zcash foundation how to start.  This could be super helpful. Also, another opinion, yeah,

Alex: 00:38:26  

great. Anything else on this subject for now? Thank you, Pablo, Has anybody joined from shielded lab? So I don't believe  Okay. And then anything from ECC on the subject cross link? Or should we just continue? cool open announcements. If you have some news or announcement you'd like to share, please raise your hand and share

Daira: 00:39:15  

I have covid, that sucks. 

Alex: 00:39:19  

Oh sorry to hear that

Daira: 00:39:23  

wear masks. People.

Alex: 00:39:29  

Any open discussion? Is there anything anybody would like to bring up before we wrap up? Going once? 

Okay, well, thank you very much. Next arborist, call be October 16 at 1500 UTC thanks for all for participating.

Next Meeting Scheduled: 16 th October 2025, 15:00 UTC

