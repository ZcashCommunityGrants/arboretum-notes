# Arborist Call  #40 Notes

Meeting Date/Time: November 17th 2022, 22:30 UTC

Meeting Duration: 30 minutes

**Agenda**: 

+ Zebrad Status 


+ Mobile SDK Update
    

+ Zcashd Status Updates


+ Open Discussion


Video of the meeting: [recording](https://www.youtube.com/watch?v=Ot9-qtYiEQQ)

**Slides**: [1](https://ipfs.io/ipfs/QmPLFaFqYEcJGqDfsSdWp1EKrjbYpXbjwbRRE6aZmkZKiT) [2](https://ipfs.io/ipfs/QmXqxwJD94nrUSuKeUsLvugMVMjvCGxeC2Dr5s5nhzZMAb) 

Moderator: Ian Sagstetter

Notes: Jason Rogers

___

## Decisions & Action Items


i) Select moderator on Arborist Calls 


___

## Full Notes



### 1. Zebrad Updates - Status Update

[04:03](https://youtu.be/Ot9-qtYiEQQ?t=243) - **Deirdre**

For Zebra we've mostly been working on more support for out getblocktemplate rpc's and our submitblock rpc methods so that miners can get a getblocktemplate thats more populated with more data. That is getting filled out continuously. We've merged in submitblock so if you've done something with that template and filled it with transactions you can submit it to Zebra and it will go through the block validation checks that every block goes through to see if it fits on the blockchain as a valid, consensus compatible block. 

[04:45](https://youtu.be/Ot9-qtYiEQQ?t=285)

We've also been doing a bunch of CI stuff with our CI infrastructure. We use Google Cloud to do a lot of long running integration tests, integration tests with fully cached lightwalletd servers and things like that. We've been pushing Google Cloud to the limit spinning up VM's in containers and spinning them down & we're trying to make sure that the latency and connections via SSH don't get in the way of our CI or fail for the wrong reasons. So we've been doing work to try and squash all of these bugs from us pushing Google Cloud pretty far. 

[05:24](https://youtu.be/Ot9-qtYiEQQ?t=324)

A lot of API work, to get Zebrad to an even more useful place for people who are mining. Thats continuing to work. We have a couple of people on break recently so its a little bit quiet. 


___


### 2. Zcashd Updates - Mobile SDK's 


[07:04](https://youtu.be/Ot9-qtYiEQQ?t=424) - **Daira**

The status update for Zcashd and the Android and IOS SDK's is we've cut some releases of the Zcash rust crates. That includes support for ZIP 317 which is proportional fees. That support is currently disabled, it's going to be enabled in a point release afterwards. That allows people to upgrade to this version of the SDK and then choose when they want to enable the fees. We were asked not to make it a boolean parameter. 

[08:04](https://youtu.be/Ot9-qtYiEQQ?t=484) - **Str4d**

I'm not sure it's going to be configurable in the next update of the SDK's. Because the current version of the mobile SDK releases already have quite a large chunk of changes that need to happen in a UX level and there are some other things in the rest of the SDK's that need to be done in terms of fee preview that need to be made consistent with that. I think that was the rationale but the core point there is the mobile sdk release thats coming out wont do ZIP 317 but the one after that will. 

[08:45](https://youtu.be/Ot9-qtYiEQQ?t=525) - **Daira**

What were the changes in the release thats coming out now?

[08:51](https://youtu.be/Ot9-qtYiEQQ?t=531) - **Str4d**

A lot of changes, you'll need to look over the release notes for those. Commensurate with the size of the changes to the Zcash client backend, the biggest thing is essentially Unified Address support which was necessary in part because it was already in flight and also necessary because we had to get the core issue that was blocking performance improvements was getting the mobile SDK'S onto the same revisions and versions of things as the core rust crates themselves were. That has been solved and they're all roughly now in sync. 

[09:35](https://youtu.be/Ot9-qtYiEQQ?t=575)

The biggest user facing change will be UA's, they will only be Transparent and Sapling UA's to begin with but the underlying database and spending key logic does support orchard its just not exposed at the front level. So in a future release when Orchard is added into the SDK's then the UA's will just roll and you will have a new UA that has Transparent, Sapling & Orchard. 

[10:04](https://youtu.be/Ot9-qtYiEQQ?t=604) - **Daira**

So basically we want people to update, to adapt to any API changes in this release and then they will be ready for Orchard support and for ZIP 317 and eventually for DAGSync in future releases. 

[10:21](https://youtu.be/Ot9-qtYiEQQ?t=621) - **Str4d**

Yeah, the user facing changes in this release also does most if not all of the groundwork for DAGSync that is necessary. So whilst this is a lot of internal work to do for those synchronisation changes, the changes that users of the SDK would have to deal with should be much less because of the way the mobile SDK'S built with a synchroniser, the synchroniser is the one handling that. Getting past this point should mean that the future performance improvements should be much easier to migrate to.

[11:00](https://youtu.be/Ot9-qtYiEQQ?t=660) - **Daira**

As Str4d said, we've started implementation work for DAGSync. Str4d is probably better placed to talk about that and we're looking at shorter term mitigations for the sandblasting that we can apply to the mobile SDK's. 

[11:24](https://youtu.be/Ot9-qtYiEQQ?t=684) - **Str4d**

Mostly in terms of the things you could do there are basically components of DAGSync anyway. There are some things perhaps you could separate out and do first. We are trying to see if we can front load those but how much work do you spend doing that and writing parallel systems to do that versus just writing the same thing DAGSync would do for it. 

[11:46](https://youtu.be/Ot9-qtYiEQQ?t=706) - **Daira**

On the Zcashd side, there was a bug that was causing an assertion failure that could occur sometimes when Zcashd was shutdown and then restarted. If this happened it would always happen at the same point on restart. That bug is fixed. That was to do with the resync of the Orchard wallet. We have also made some changes to reduce memory usage. Theoretically it can save up to 2.3Gb on the virtual memory usage, it probably saves less than that if you consider the working set size of the process which is a bit difficult because it depends on usage. It still should be a significant help.

[13:01](https://youtu.be/Ot9-qtYiEQQ?t=781) - **Deirdre**

Is that the one where flushing the block headers to disk?

[13:05](https://youtu.be/Ot9-qtYiEQQ?t=785) - **Daira**

Yes, we are actually flushing them to the Leveldb database instead of storing them in memory. There are some transaction builder changes for Zcashd to prepare for ZIP 317 and apart from that we are also continuing to work on recursion for Halo 2 although Ying Tong is off at the moment so thats slightly paused. 

[13:46](https://youtu.be/Ot9-qtYiEQQ?t=826) - **Str4d**

I think that covers everything from the last couple of weeks. 

[14:16](https://youtu.be/Ot9-qtYiEQQ?t=856) - **Deirdre**

I've seen the updates to Zk proofs and a couple of those other rust crates any the ETA on the SDK releases?

[14:24](https://youtu.be/Ot9-qtYiEQQ?t=864) - **Str4d**

They are going through. I think the IOS one is ahead of Android Pacu or Carter would be able to speak to that. 


___


### 3. Open Discussion - Zkproof Conference & FROST Threshold Signatures 


[14:44](https://youtu.be/Ot9-qtYiEQQ?t=883) - **Daira**

Speaking of ZK proofs I was on an inner workshop at the zkproof.org 5th Conference. We were working on standardising PLONK or PLONKish systems including halo 2. 

[15:24](https://youtu.be/Ot9-qtYiEQQ?t=925) - **Str4d**

Fortunately we were able to get some people there and I think Ying Tong is there as well and she's been holding the fort there for us. The main thing we are trying to do there is come to agreements on what specifications would look like and be for the PLONK style architectures. The nice thing about that is it both makes the halo 2 stack interoperable potentially with the rest of the ecosystem as most people come to consensus on that. 

[16:08](https://youtu.be/Ot9-qtYiEQQ?t=968)

In addition, the nice thing about that is we can potentially upgrade or migrate the Orchard circuit too if there were changes that required divergences we could do an upgrade to Orchard that changes the circuit to be one thats more compatible if there is a benefit to that because its no longer a Trusted Setup kind of thing, it becomes very easy to upgrade the version of the proofs that we're using for that. There is ability for us to tweak that as we need to if it becomes useful to gain interoperability with other parts of the system like someone doing GPU proving.

[16:51](https://youtu.be/Ot9-qtYiEQQ?t=1011) - **Daira**

Also to share security analysis with other projects. 

[16:59](https://youtu.be/Ot9-qtYiEQQ?t=1019) - **Deirdre**

Is there any sort of formal notions of what PLONKish style arithmetization versus R1CS. Is there any notion of a formalisation of what those different types of arithmetization give you or is that the wrong framing?

[17:34](https://youtu.be/Ot9-qtYiEQQ?t=1054) - **Daira**

The definitions of soundness, completeness, zero knowledge and so on are all the same but the general statement that you are trying to prove rather than the circuit specific one is precisely one of the things that we are trying to formalise. 

[19:33](https://youtu.be/Ot9-qtYiEQQ?t=1172) - **Deirdre**

I have a very important thing to bring up. The FROST Threshold Schnorr Signature specification at the IRTF is now in last call. You have about two more weeks, if you are a fan of really nice threshold signature specifications. The kind that we are writing up to use in Zcash for your spend signatures so that you can have t out of n signers doing a schnorr signature - that is in last call. Go to the [CFRG mailing list](https://irtf.org/cfrg) and send an email that says "I like this document, I think it is good and it should be adopted".

[20:18](https://youtu.be/Ot9-qtYiEQQ?t=1219) - **Daira**

Or not as the case may be. 

[20:36](https://youtu.be/Ot9-qtYiEQQ?t=1236) - **Deirdre**

We love the feedback, we love good review of our stuff but if you think it is good enough to adopt, this is [version 11](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/) - in last call drop a line and your feedback on the the CFRG mailing list. That will help, if you did that we would all be very happy. 

[21:11](https://youtu.be/Ot9-qtYiEQQ?t=1270) - **Str4d**

That will also make it far more likely that we can persuade people to implement it in hardware and far more likely that we can actually use it. 

[21:24](https://youtu.be/Ot9-qtYiEQQ?t=1284) - **Deirdre**

Yes, there are 5 cipher suites to find in that irtf document. Those are not the curves that are used in Zcash but you've got ed25519, secp256k1 and p256. These are all Schnorr signatures just to highlight you might hear use of those curves for ecdsa signatures, these are being used for edsa-like signatures these are schnorr signatures, they are not the same thing.

[22:24](https://youtu.be/Ot9-qtYiEQQ?t=1344)

Our primary cipher suite is ristretto which is the prime order group construction over the same curve that ed255119 is so you've got some options. You've also got ed448 which is the only one we haven't implemented ourselves because there is no handy implementation of ed448 in rust. 

[22:28](https://youtu.be/Ot9-qtYiEQQ?t=1348) - **Daira**

Why not include the pasta curves in the draft?

[22:34](https://youtu.be/Ot9-qtYiEQQ?t=1354) - **Deirdre**

Because there are no documents in the IETF.

[22:48](https://youtu.be/Ot9-qtYiEQQ?t=1368) - **Daira**

I see, so it has to be an IETF/IRTF specified curve. 

[22:50](https://youtu.be/Ot9-qtYiEQQ?t=1369) - **Deirdre**

Pretty much, but for our ZIP which is in draft - we don't have it submitted to the ZIPs repository yet but we've had a construction of how you do the re-randomisation that you need to do re-randomised eddsa signatures. reddsa signatures even though they are not over ed anymore for Zcash we do define the jubjub curve and the pasta curve specifically for using it for Zcash. They're just in a ZIP instead of in a IETF document. 

[23:45](https://youtu.be/Ot9-qtYiEQQ?t=1425)

If anyone is interested, we the Foundation have been keeping up with the spec with a full set of rust implementations for all the cipher suites except the ed448 one. The one we did first is red jubjub and I think we already have redpalace somewhere else but don't remember if we have to update them to use our fully generic [FROST core library](https://github.com/ZcashFoundation/frost/tree/main/frost-core) which makes it really easy for anyone to implement their own favorite new cipher suite in just 300 lines of rust code if you already have an elliptic curve implementation you like or any prime order group & you already have a hash function that you like that would fit in the security requirements for those cipher suites. Conrado who's been working on this with us just spits out a new implementation of FROST like in a day.

[24:55](https://youtu.be/Ot9-qtYiEQQ?t=1495)

So if you want to play with FROST we have a rust generic implementation for you thats fully up to date with the spec thats under last call and you can ask us questions on the internet or on the mailing list. 

[25:39](https://youtu.be/Ot9-qtYiEQQ?t=1539) - **Ian**

We've got one question here: "Did someone mention GPU proving - is that being used right now"?

[25:41](https://youtu.be/Ot9-qtYiEQQ?t=1541) - **Str4d**

No, not currently. I mentioned that as an example of potentially things that could be interoperable but on that front there has been work towards this that Filecoin developers have been doing. There's an ECGPU crate they've been working on and there was actually a pr to pull that into some of the rust stacks. Our Zcash stack does not use it at the moment but it is something that we want to enable. The work for that is not something that is on our plate but it is something that we are aware of and keeping track of and at some point will hopefully feed into the stack. 

[26:29](https://youtu.be/Ot9-qtYiEQQ?t=1589) - **Daira**

At some point there will be some integration work on our plate. But we're not doing the bulk of the work. 

[26:40](https://youtu.be/Ot9-qtYiEQQ?t=1600) - **Ian**

Awesome thank you both. 



### Attendees

+  Daira

+  Deirdre

+  Str4d



___
___

**Next Meeting Scheduled For: December 1st 15:00 UTC**
