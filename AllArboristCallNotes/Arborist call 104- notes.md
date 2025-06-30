## Arborist Call #104 Notes 

Meeting Date/Time:june 26,2025 15:00 UTC

Meeting Duration: 32 minutes 

Agenda:

Welcome and Meeting Intro [intro,Agenda](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra Update [PRs,RPc,Ipv6](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [zcash Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates [Zsa, ZIps](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates---zcash-shielded-assets--qedit) / [NSM, Librustzcash](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates---shielded-labs-network-sustainability-mechanism)

Open Announcemet [Plonk wg, zashi wallet survey](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=4q6KEFQDvvw)

Moderator: NATALIE

Notes: CHIDI OLISA

## Full Notes

## Welcome & Meeting Intro 

NATALIE: 00:01:18

welcome to the Arborist call. We do these fortnightly. They're an opportunity for people who are working in the zcash ecosystem to come and present their work and give updates on research, etc.  we're going to cover the core stack updates, then research and implementation updates, and then the announcements and discussion for the end. So what are our Arborist calls? I've sort of already talked about this and yeah, the purpose is to make everything that's happening in terms of the development of the ecosystem accessible for everyone and provide transparency. Here we go. Arborisca.zfnd.org, there's the email. And if you just want to learn more about Zcash and development, please register at zcasharborist.org and yes, here are some other ways to get involved as well. So if you want to apply for community grants, the link is there and there's our discord and of course, community forum. Okay, so let's get started with the Corestack update. I'm going to start with Zebra and I think conrado is presenting.

## Zebra Update 

CONRADO: 00:04:14 

There you go. So in Zebra for the last two weeks, we merged a lot of stuff. We added some missing fields to The Get RouteTransaction RPC method recently just fell to their cracks. There are a bunch of fields that we didn't support but wasn't particularly difficult to add, so we added them. There's still a couple of them left which we are still working on, mostly related to our trading sampling specific fields. We also added value pools to the get block RPC method, so we previously only supported returning the value pools for the entire chain. But with this you can query like  the orchard pool, whats  at block height, whatever. We also added a new GRPC method which is called mempool Change so you can get notified when something changes in the mempool and what changed in the mempool. We added two other RPC methods, Invalidate Block and Reconsider Block, which are generally useful but particularly useful for testing. Also removed one specific configuration from Zebra which is called Debug, like zcach D, it's a very specific technical thing that wasn't useful anymore. But be advised if you were enabling it, you need to remove it from the config file. We're cleaning up the Zebra RPC API. This was basically motivated by people realizing that the Zebra RPC crate, its main purpose is to offer the RPC interface in Zebra, but you could also use its types to create a client for querying the zebra rpc. But the API was kind of weird and a mess because we weren't thinking about that particular use case. So we cleaned it up and now it should be much nicer to use. We standardized naming conventions across CI encode but just a good thing that we finally were able to do. It just helps like the specific job and specific testing whereas I'll have the same name. So when something fails CI it's easier for us to find what went wrong. We changed the default config in Zebra. Like if you set up Zebra for the first time it will enable IPv6 addresses by default, which is something that was not happening. So that's good. But if you already have a config file you need to enable it. We still have to enable it manually. And last we made a new release of zcach script Crate, which is a crate that does the interpreting of regular transparent scripts, which uses for transparent transactions. Greg from ECC added Rust implementation. It's a C ++ code previously, but Greg added a Rust implementation for it, which is great. The final goal is to get rid of the C++ part, but for now you can enable a flag in Zebra that will run both the C++ code and the Rust code. If there's anything, if there's a mismatch on the result, it will log a warning. So we'll use this to test this implementation, make sure it matches the C++  implementation, and after some time when we're confident that everything works, we will eventually get rid of the C++ code and do rust only, which is great. That's it. Thank you.

NATALIE: 00:08:06 

Thanks. Okay, what's next? Ecc. Who wants to speak from there?

## ECC Update 

DAIRA EMMA: 00:08:18 

Sorry, I was muted. I'll be speaking for ecc. Okay, so we've done some work on zcash deprecation. Strad overhauled the config files for zallet, we did an initial review of Craig's PR updating zcach script to support BCDTs. I've been doing some work on formalizing the Plonkish relation in Lean for the Plonkish working group. Let's see what else. Okay, we've been doing some specification work on NU6. Sorry, NU 6.1. Making sure that the lockbox disbursement. We know what we need to do for that. Quite a bit of work on zallet. Let's see. Strad and I investigated whether it was possible to do multisig transfer  on the trezor. This is not, regardless of whether the Trezor itself supports it, there are no wallets that simultaneously support multisig and zcash because Trezor Suite does not. Does not support multisig. And I see that's most of it, I think.

NATALIE: 00:10:30
 
Thanks. Okay, cool. Move to the next one. Zingo Labs. Anyone here from zingo labs want to talk today? No. Okay, that's fine. In which case we'll move to the next. Okay. ZcashD deprecation updates. He wants to discuss this.

## zcashd Deprecation updates. Ecc, zf, Zingo labs, Pacu

PACU: 00:11:04

Oh yeah, yeah. I've mentioned this in our  group, given that the zallet Alpha has,every day, a little bit less stunning things to do. I wanted to discuss what's the best way we can help ECC down this road of reaching zallet Alpha? And I don't know. That's the main thing I wanted to ask them.

NATALIE: 00:11:57

Does anyone have any response?

PACU: 00:12:03

Are all the main pending things present there, or is that the correct way?

DAIRA EMMA: 00:12:13 

Sorry, I think I. I think I missed part of what you said.

PACU: 00:12:16

Oh, yes, I can repeat it. Given that we're getting closer to the Zallet Alpha milestone, I want to ask ECC people like, how can we all best help you out? I don't know, on testing things that anything that you can think of that will make or help

DAIRA EMMA: 00:13:03 

Basically using it. So just try it and see what breaks. Don't obviously put more funds than you're prepared to lose in it. And we really mean that because it's not. It's not been released as a wallet that's ready for production use yet, but it will be soon and we need to get it to that stage. So yeah, any paper cuts you have on setting it up or using it for what you want to use it for with small amounts of money, then that would be incredibly useful.

PACU: 00:13:45 

Alright, cool, that's the only thing I want to discuss which is like our main goal now.

NATALIE: 00:13:58 

Great, thank you. Does anyone else want to give anything else about any more updates?

PACU: 00:14:04 

Oh, one question about the missing fields that Conrado said were merged, are they like  txiv for example. Is it already in Zebra main?

CONRADO: 00:14:20 

Yes, it's already main and we'll be including analytics to zcash Zebra release. Yeah.

PACU: 00:14:28 

Okay, I'll test it out on my local testnet Block Explorer build and see how it goes. Thank you.

DAIRA EMMA: 00:14:39

Cool.

NATALIE: 00:14:43

Great. So let's move to the next slide. Anyone here from Qedit?

## Research & Implementation Updates - zcash shielded Assets- Qedit

VIVEK: 00:14:52 

Yeah,  I'll be giving the update this week. So yeah like regarding zcash shielded assets. So we have like a few different areas on which we've been working on over the last few weeks. The first thing is the zips. There's. We've been working on a change to support key rotation without an explicit transaction format change in future because that would be helpful going ahead. We did  like a couple of the changes. We already like got merged into the upstream repo of the zips and we discussed some more with the Str4d and daira emma last week. Sorry a few days ago and yeah we've also discussed how to make some things clearer in the zip. So that's something that I'm working on at present and that should be. We'll have that ready in a few days I guess we also yeah like these changes to the zips also require some small changes to the implementation in Orchard and or like Librustzcash and so we are making those changes accordingly. I guess the changes basically involve the change to the encoding of the issuance validating key and the issuance authorization signature and there are minor changes to the naming of these things that we are working on. Yeah, that's regarding the zips we Also have had like some progress, some good progress on Halo 2. So we had an initial PR like setting the stage for the ZSA work that got merged in to the upstream Halo 2. So we prepared a new PR with the main meat of the changes for ZSAs. So we had a discussion about that as well. Like few days back one of the things was I think regarding some duplication for the lookup table for the rain check. So we yeah we've added a comment about that it's pretty much ready but I think it's like it's an internal PR so we haven't. But that should be out soon so we'll ping when that's ready as well. Yeah. Regarding Orchard ZSA so the ECC is I think currently looking at our code for the initial review and that work is in progress. Librustzcash Right now we are, we are still in the process of rebasing it on upstream and catching up to all the other changes that were there. That's still work that's being done. For  Zebra work.
Let's see. I think Arya and Dimitri and Pablo were peer reviewing our PR for the transaction changes for ZSAs and like simultaneously we are also continuing with our progress on the state management for the global issuance state and then like top of the stack we have like the zcash transaction tool we like a few weeks back we released a new version of this which has like a more general approach to creating transactions and things like that. There's also I think various CI updates and checks that we've made to ensure like things are like things are covered properly in that repository. And I guess the last bit is the quantum resilience zip. We were held like we were reviewing that zip as well. So we finished our review. I think the general thing was that the design is solid and like we suggested some minor fixes but yeah that's a good design. It's the general thing. So yeah that's basically the update I have from our end.

NATALIE: 00:19:13

Great, thank you. Does anyone have anything else they want to add or ask? Great, let's move on to the next slide. Yes, Shielded Labs. So this is research and implementation updates.

## Research & Implementation Updates - shielded labs Network sustainability mechanism

MARK: 00:19:29

Hey folks, I can give the update here. We have been in a holding pattern for a number of weeks now because we are at the mercy of some very busy people that we need to once again ask to review a couple PRs. The two PRs that I think are the top priority right now are the Zcash test vectors PR which is number 101 and that it Looks like somebody, a maintainer there, just needs to run the workflows to test those so we can get the checks to pass. So hopefully that's just a push button thing somebody can do.

DAIRA EMMA: 00:20:08 

I'll do that now.

MARK: 00:20:11 

Thank you. Daira Emma and then also Daira Emma and Chris, there's the Zcash, the Librustzcash  PR that's been sitting there for a little while and I'm hoping that Marius has sufficiently addressed your concerns and it doesn't look like that needs to be rebased or anything. So hopefully that can get another review within the next day or two here and hopefully that can merge. But obviously if there's issues, we will address them and then once all those are in, we can go to the Zebra pr, rebase that and see what happens. But any, any attention that can be given to this in the short term is highly appreciated. You know how busy everybody is.

DAIRA EMMA: 00:21:02 

Yeah. I'll see if I can give you permission to run those workflows yourselves rather than going to ping us today.

MARK: 00:21:11

Sure.

NATALIE: 00:21:18  

Great. Thank you. Okay, Next one, Shield Labs and ECC on Crosslink. Anything more to say?

## Research & Implementation Updates- shielded labs and Ecc crosslink Trailing finality layer

NATE: 00:21:26

Yes, I can give an update here. So we're working on our third milestone, which is the goal of the third milestone is to modify proof of work headers so that proof of work blocks and BFT blocks refer to each other. So this would be the first change to proof of work consensus and it should implement sort of the core of the crosslink consensus, but it lacks all of the proof of stake rules. So the finalizers on the BFT side are just hard coded in a config file. So it's akin to what people might call proof of authority. However, we're also trying to add a feature to the BFT blocks that we didn't have in Milestone 2, which we call objective verifiability. And put simply, it's just making sure the BFT signatures appear in the blockchain, which doesn't happen by default in, in the Tendermint algorithm. And the reason we want to do that is so that new nodes, if they are given a snapshot of the blockchain, can review it and ensure that it's self consistent, which is a prerequisite to knowing if it's in consensus. To know if it's in consensus, the nodes need to connect to the network and there are several different ways to include those signatures. And we brainstormed a few designs and discussed it for a while and picked a design. And so we're proceeding with that right now, although this seems like something other BFT chains have probably done. So it would be prudent for us to look. Look into that, which I haven't done yet. And what else to say about that? Oh, there are. We discovered, you know, a lot of nuances and the different design options we. We looked into. There's always this strange thing where if you're participating in the protocol, you might come to believe that a block is final based on seeing signatures for the block, but those won't be the exact same signatures that appear later in the blockchain. So there's sort of this weirdness around that that we discussed a lot. And then what is the other. Oh yeah. So the other big piece is we're also starting to work on the design for proof of stake. So this would be all the rules about how users can lock up ZEC into bonds or delegation positions and assign them to finalizers and how finalizers can register to participate in the protocol, and then how the rewards are distributed and how penalties might happen or fees. Anyway, so we're right at the beginning of that design process and we're reviewing other chains and right now we're in the midst of. I'm in the midst of reviewing Namada, partially because we talked to Christopher Goes and so we're more familiar with that team basically, and we have a high opinion of their design. But we'd also like to look at the Cosmos Hub because it's sort of like the oldest, most standard thing and maybe Penumbra because it's a similar project in spirit. And so far I've been learning Quint, which is a modeling language similar to TLA + or a variation of TLA +  because there is a Quint model of the NMADA Proof of state logic. And I couldn't resist trying to learn this new modeling language. It's developed by informal systems and someone there is also working on a model for Crosslink itself. So I figured it would be good for me to learn this tool and hopefully it could be helpful in multiple cases for our project

So that's the update there, Any questions?

DAIRA EMMA: 00:26:24 

That's fascinating. I'm just looking at quintlang.org now. Yeah, I was just thinking we might be able to model it in Lean, but if there's already a. A formalization being done in Quint, then that makes sense. Do you know kind of how expressive Taylor plus or QUINT are relative to other pre persistent languages?

NATE: 00:26:55 

No clue. I'm not really familiar with this sort of protocol modeling languages yet, so I'm not sure. I mean, I've just started learning about it and I was debating whether I should just try to read the source of the proof of stake logic without learning the language too much just to try to learn what their rules are. But I've decided I should do it more thoroughly. Yeah, so I'm not sure it has, you know, ways to model state transitions, like temporal things, non determinism, stuff like that.

DAIRA EMMA: 00:27:43 

Right. So it's model checking on the temporal logic and it actually has. It's, the model checker is slightly pluggable. So there are two options, TLC and Apalache which I'm just looking at now. I think I've heard of TLC before. I have not heard of Apalache before. Yeah, okay. Lots to get my teeth into, thank you.

NATE: 00:28:07 

Yeah, and I think it's. My impression is that it's sort of a new front end for TLA +, so it's like a nicer syntax maybe. Anyway, Quintlang.org or informal systems/Quint on git.

NATALIE: 00:28:31 

Great, thank you. Does anyone else want to ask any questions? Great. Ah, okay. Open announcement time. So if you have some news or an announcement you'd like to share, please do raise your hand. I don't see any raised hands.

## Open Announcements 

DAIRA EMMA: 00:29:01 

If anyone would like to contribute to the Plonkish working group, we're making a lot of progress now, so just ask me or ask Mary Mallow.

NATALIE: 00:29:17 

Oh, I think I've got some things in the chat. No, there are no questions in there. Okay, great.  Any other discussions people want to open? Okay, thank you very much. Oh Pacu. Go for it.

PACU: 00:29:46 

Oh yeah. Just one announcement is that one grantee has successfully integrated the TestNet Block Explorer to Zebra and the other, I don't know, announcement or request is that the zashi team is running a survey requesting feedback from zcachers and developers and users. So just check the. I think the zashi social network accounts are advertising that. That survey and they're close to reaching their target for a number of responses. So please contribute. It will be very useful for them.

NATE: 00:30:37

Where can I learn about the block Explorer that reached the milestone?

PACU: 00:30:43

In the forums  there's a thread there. I can send you a link.

NATE: 00:30:50 

Okay, thanks. Is there a name for it or the project?

PACU: 00:30:55 

No, it's just the zcash Block Explorer that we know. But no.: 

NATALIE: 00:31:15

Thanks, anyone? No. Okay, thank you everyone. The next arborist call will be on July 10th at 9:00 o'clock UTC at 9:00pm UTC. So yeah, I hope you enjoyed this today and if you want to have a look back at it then it will be uploaded to YouTube. Great. Thank you everyone.

Next Meeting Scheduled: July 10, 2025 21:00 UTC
