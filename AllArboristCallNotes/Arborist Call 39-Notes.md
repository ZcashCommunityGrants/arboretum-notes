# Arborist Call  #39 Notes

Meeting Date/Time: November 3rd 2022, 15:00 UTC

Meeting Duration: 30 minutes

**Agenda**: 

+ Zebrad Status Updates
    

+ Zcashd Status Updates


+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://ipfs.io/ipfs/QmUhoCYiSio9jayomuHKxLxa33ZrL25wXMoVHq2HvCPPPK) [2](https://ipfs.io/ipfs/QmacNu4WWYFpRuvKv2uQwf7GhuGZFdeL8b2Cm58fXQvnMt) 

Moderator: Steven Smith

Notes: Jason Rogers

___

## Decisions & Action Items


i)   Forward Invitations for 10th Nov ZIP 317 meeting 

ii)  Collate feedback on API preview on faster sync alpha 

iii) Coordinate with QEDIT on ZIP Drafts 

___

## Full Notes



### 1. Zebrad Updates - Zebra release 1.0.0-rc.1


[00:00] - **Deirdre**

From the Zebra side bigger news as we've released our second release candidate. This is [Zebra 1.0.0-rc.1](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-rc.1) and this is probably the candidate that we are going to send out to get audited. We have all of our dependencies updated, we've got all of our ducks in a row as far as we know and we think we are happy to send this out to get a full security audit. That's the next thing to get Zebra from release candidate to 1.0 stable which we will support long term. 

[04:07] - **Daira**

That's a huge milestone, congratulations. 

[04:09] - **Deirdre**

We are very excited we've had several things to make sure we got done before we were satisfied with this release and we got them done. Some of those are dependency updates but also we've been working on other stuff as well it's not just getting ready for an audit. We've got the very first getblocktemplate RPC call. It's not fully populated with live data yet but it is an RPC call that you can call. We also have the getblockhash RPC method and the getblockcount RPC method that we've just added and some other metrics when you're running Zebra & trying to track what's going on with your node with either prometheus metrics or grafana which are fully populated in our repository and we have instructions on how to use.

[05:07]

Those can be tracked by you or some of our miner clients or anyone else who wants to call it. Some little fixes including: In the mempool rejecting transactions with spent out points or nullifiers which we weren't doing before. Our previous version of rust was breaking how we were downloading the Zcash shielded parameters and we had to not support that build and use 1.63 but there was a brand new rust release but we are supporting 1.64 again if you build it yourself with rust. Those are some of the big things. 

[05:53]

We also made a release of ed25519 Zebra, the rust crate that implements the zip 215 consensus rules for how we or anyone else that likes to use the rules that we use to very ed25519 signatures in a distributed consensus compatible manner, we released an update to that crate. 

[06:23] - **Daira**

It's not zip 315, it's zip 215.

[06:35] - **Deirdre**

A nice contributor did the work to have that crate support no-standard. It's been sitting in our repository for months and we finally pushed that to crates.io so that's [version 3.1.0 of ed25519 zebra](https://crates.io/crates/ed25519-zebra) if anyone else wants to use it. 

[07:10] - **Daira**

What were the changes with that?

[07:10] - **Deirdre**

The crate now supports no-standards so you can use it without allocation. I don't know if we checked if it actually does not allocate but you can use it with just core as opposed to stud, rust standard library. Thats on crates.io.

[07:50] - **Steven**

Have you already picked the auditor that you're going to use for Zebra?

[07:54] - **Deirdre**

We have a shortlist, we have not officially picked one yet. 

[08:03] - **Steven**

There's some great choices out there. Congratulations again we mentioned it last time but it's a great milestone. Good luck with the auditors and the audits. They're always fun. 

[08:26] - **Daira**

I hope they find lots of things. It's always more useful if they find more things. 

[08:33] - **Deirdre**

If they find nothing i'll be nervous. 

[08:41] - **Steven**

There's that balance between "You want them to find not much but you absolutely want them to find some things" because otherwise you wonder how close did you actually look at this?

[09:01] - **Daira**

It's nice if they find spec things and the implementation is correct because that shows they are paying attention. 



___


### 2. Zcashd Updates - Status Update 


[09:29] - **Steven**

On the Zcashd side, ECC has been focused exclusively on performance and scalability of some sort since NU5 activated starting mid June. We've done a number of things we've blogged about etc. We've put out 3 Zcashd releases, 5.1.0, 5.2.0 & 5.3.0 that have performance optimisations for the most part in various forms. Memory optimisations, scan speed improvements, things that can help with block propogation and we are continuing to work on that.

[09:39]

The sore point at the moment that we are still trying to make improvement around is the faster sync for mobile SDK's. We're going to release that at least two phases, maybe three. The first phase we have in internal testing. Android should follow in roughly a week, we're staggering that internally. The first phase, there's a lot of DAGSync infrastructure that goes in. It's really catching up with what was in librustzcash. The Unified Address support that base was already in there and will be included in this first round of the SDK release. 

[11:01]

Subsequent SDK releases will include substantial improvements to sync times. It's like we do network upgrades sometimes where we could include all of this but it's too big so we'll split it up and follow it up. It's the same thing - this first one contains a lot of changes. 

[11:23] - **Pacu ECC**

We have for iOS some alphas. I think the latest is alpha 3, 0.17.0-alpha 1,2 & 3. Alphas are maybe breaking between each other. Always use the latest alpha but you can use that as an API preview for all the numerous changes. We do intend to try to ship some PR's to partners to help them adopt these changes or add a baseline. They know their code better so as they always do they will innovate the SDK better than we would. 

[12:22]

But the Api preview is really important for everyone to know and also to provide us feedback on API details there. One thing - Unified Addresses on the SDK can sync Transparent and Sapling, there is no Orchard support yet for those UA's but the idea is that UA'S are a pattern that we want to enforce, you can add any other pool to a UA and it should be seamless to use over time. 

[13:15]

I meant to mention that. Our original plan for the SDK's was to get Orchard support, Unified Addresses etc in and do things to 'harden' the SDK's, improve error handling etc. as well as a faster sync. We inverted priorities due to the increased load so we've focused more on the faster sync, we just happen to be building on a base for librustzcash that included unified address support but not yet orchard support. That's why you get unified addresses without orchard first included in this first phase of SDK releases. It would actually have been more work to take out unified addresses and build without it. We wanted to get things done as fast as we could.

[14:13]

We talked about Zip 317, I know you talked about it in zip sync and in the forums as well as the last arborist call where we went over the parameters and looked at what some examples fees would be so I wont go back over that. On the Zcashd side we're working on the necessary abstractions for it. So we're building generic abstractions so it could be ZIP 317, EIP 1559 one day or whatever is down the road. 

[15:15]

Our real next step is to work with ecosystem partners to get their feedback and talk about implementation. "How do we make this take effect throughout the ecosystem"? Nate is on PTO this week but he is on point for that I believe that meeting might be scheduled for next week already. That's the status, to work with ecosystem partners as we are doing in parallel working on ZIP 317 and Zcashd. 

[15:48] - **Adi**

Thanks for mentioning the [meeting](https://forum.zcashcommunity.com/t/zip-317-wallet-dev-call-announcement/43251) happening on November 10th. We'd just like to extend an invitation to all the developers and application service providers in Zcash to attend that and share their views and feedback on the planned upcoming changes. 

[16:08] - **Steven**

Are you going to promote that on twitter so people know how to join or how would be the best way to get that out there?

[16:15] - **Adi**

We are taking both the approaches, one is social media and also privately sending dm's and emails and messages to developers in the Zcash ecosystem. 

[16:27] - **Steven**

Yes, the partners that would be working directly with it. Sounds great looking forward to that. 

[16:43]

We are also working on recursion and halo 2. One of the main draws for halo 2 was recursion and the tools that it gives us to do interesting things around scalability, we are progressing on that reasonably well. Then we are also working on some additional optimisations for Zcashd that will go into either a 5.3.1 or a 5.4.0 it depends on timing. They will further reduce memory optimisation and reduce block propagation times further, or they should. 

[17:26] - **Daira**

More detail on those memory optimisations. Currently Zcashd holds a tree of block headers for the whole chain in memory. That was a design decision made by Bitcoin where the headers are quite small but in our case because of the equihash parameters the equihash solution is quite large. It's 1344 bytes and that for the whole chain comes to 2.3Gb. This optimisation will swap out those and read them back from the level DB database only when they're needed. 

[18:22]

It wont necessarily result in a working set size reduction of 2.3Gb because some of the pages with that information would have got swapped out anyway but that's the maximum possible reduction and I think we'll get a significant portion of that. 

[18:52] - **Steven**

5.3.0 is still being rolled out through the ecosystem, I should have pulled the numbers or asked Marshall for percentage of nodes running 5.2.0 or 5.3.0. 5.1.0 got halted, unless you compiled it yourself. Some people do it - you can look at peers and see older releases that are well past the date running out there. Maybe it's for convenience or hobbyists playing around and they don't want to upgrade. 5.3.0 is out there and the focus on it was really improving memory utilisation and I haven't heard of anyone having any OOM type issues which we were hoping to eliminate.



___

### 3. Open Discussion - ZSA draft ZIP's


[20:25] - **Deirdre**

We were looking at some of the ZSA draft zips yesterday in zip sync and we were talking about the PR open on the Orchard rust crate for some ZSA issuance so we were hoping if there was anyone from QEDIT who would be around to ask "is there any skew between the code being implemented and the draft zips that we should be aware of"? Who is in charge of keeping their ZIP up to date but I don't think anyone from QEDIT is here. 

[21:06] - **Steven**

I know Tel-Aviv is a challenging timezone to get in. I think it's dinner time roughly in Tel Aviv right now so I know its challenging. 

[21:48] - **Deirdre**

Either way, just curious where we've reviewed the transfer and burn doc months ago and now we've finally taken our first pass at the issuance draft and we have some feedback on the draft.

[22:07] - **Daira**

I'll make sure to ping Daniel about that. 

[22:07]

Thanks for everyones time, I appreciate the great update, congratulations to the foundation and Zebrad team, great milestone there and good luck with the audit. 


### Attendees

+  Deirdre

+  Adi ZCG

+  Daira Hopwood 

+  Greg Pfeil

+  Gustavo Valverde

+  Kris

+  Pacu ECC 

+  Daniel Wolande

+  M Harms

+  Margaret Baily   

+  Pili Guerra

+  A Murray

+  charlieok

___
___

**Next Meeting Scheduled For: November 17th 21:30 UTC**
