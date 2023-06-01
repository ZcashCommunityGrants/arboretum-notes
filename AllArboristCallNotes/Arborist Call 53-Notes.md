# Arborist Call #53 Notes

Meeting Date/Time: June 1st 2023, 15:00 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro - ECC restructure

+ ECC Core Update - zcashd 5.6.0 

+ Zebra Status -  Audit Status 

+ Research & Implementation Update - FROST demo & Speed optimisations / ZSA update

+ Open Discussion - Equilibrium DAGSync details  ECC Roadmap / ECC roadmap cont.

+ Announcements - Nighthawk Apps Global lightclient infrastructure   
    



Video of the meeting: [recorded]


Moderator: Pili Guerra

Notes: Jason Rogers



## Decisions & Action Items

i) 

ii)

___



## Full Notes



### 0. Welcome & Intro - ECC restructure

[00:07] - **Pili**

I'm Pili from the Zcash Foundation hosting today's call. Before we begin I wanted to acknowledge the recent restructuring at the ECC and the impact it has had on a number of very talented individuals. So on behalf of the Foundation, I just wanted to encourage you to reach out to us if there's any way we can support you if you want to transition to new roles within the community.

[00:32] 

One thing we're doing is we're planning to bring forward the second ZF Minor Grants process & we're going to be announcing that shortly. Once that's open, we want to encourage those affected to submit a proposal. So if you want to continue contributing to the Zcash ecosystem, you can do so & hopefully help you bridge the gap until new opportunities arise for you.

___

### 1. ECC Core Updates - zcashd 5.6.0 details 


[03:34] - **Daira**

 we're on the way to publishing 5.6.0. Just concentrating on things like refactoring the API's between librustzcash and zcashd to make all of that work. I can't give you an exact date for when the rc will come out, roughly I think it's going to be next week. Don't quote me on that. Let me actually just look up things that we've done recently because I'm not prepared for having been asked to do this. I don't normally do it.

[05:17] - **Kris**

This is Kris. The main thing that we're working on for 5.6.0 that we're nearly complete with is a set of new API's that will open up the ability for lightwalletd to improve sync speeds by providing sort of intermediate information of the note commitment trees so that we can, in the lightwallets, have notes be essentially instantaneously spendable when you have known notes that you've received or known transactions that you've received.

[05:59]

So that's the main focus of 5.6.0. It's the last piece to getting us out of the 'emergency mode' on the zcashd side. There will then be subsequent updates to the Lightwallet SDKs. They'll also be coming out in the next couple of weeks. That's the main thing for 5.6.0 and we're pretty close to completion. Just the last few things coming together.

___


### 2. Zebrad Status - Audit Status 


[06:57] - **Pili**

So next we have Marek, I believe, from the Foundation to give us an update on Zebra. And I think he wants to share some slides.

[07:45] - **Marek**

So the current plan with Zebra is to have one more release candidate before the first stable release. We'll release the release candidate pretty soon, it will contain a bunch of network and security fixes. They will all be in the update log. And we revamped user documentation, which is the [Zebra Book](https://zebra.zfnd.org). We simplified Zebra's readme & also improved the logs.

[08:29]

There's been a bunch of PR's for the logs and we are bumping Abscissa for the next release. As regards the audit, I'm pretty happy to say that there's been one medium issue and the rest were low severity and informational issues. And we fixed them all except for two issues, I believe, which were performance findings and the auditors were fine with that and we're not expecting any more findings. The report is being finalized. The last item I have here is that we're turning CI errors into PR annotations, that's about it.

[09:29] - **Daira**

Congratulations on the audit.

[09:33] - **Deirdre**

Thank you. It went very well.


___


### 3. Research & Implementation Updates i) FROST demo / Speed Optimisations 


[10:11] - **Deirdre**

Some things happening in the FROST world. Our IRTF draft has moved to IRSG review. It's another gate to pass to get this spec turned into a real boy RFC. That's cool. We didn't do anything on our side, but it's continuing to move forward, which is great.

[10:35] 

We've also done some work recently implementing speed ups for our FROST implementations in Rust by leveraging the existing multi-scalar multiplication implementation we had to do computations of what's known in FROST as the group commitment, which is an important part of round 2 of signing and the final aggregation step of the Frost signing protocol.

[11:02] 

When we implemented this, which was just sitting in our codebase, we got an over 50% speed up in the high numbers of signing participants in the protocol and we basically just had to change like 3 or 4 lines of code. It was a very quick, easy win. So that is going to get released as part of our FROST crates and it's available in the FROST Core generic base layer. So anyone else that wants to build their own flavor of FROST on top of FROST Core gets this win for free because we had this multi-scalar multiplication implemented for 256-bit scalar fields.

[11:52]

Then we made it generic for any size scalar field because we wanted to support the ed448 cipher suite. So basically, if you're able to implement FROST with FROST core, you can get this optimization out of the box for free and we implement it by default. So that's going to get released in our code base and we are finalizing a nice little blog post about it to basically write up what was an hour's work for me, but a major optimization.

[12:25] - **Daira**

What's the size of the multi-scalar exponentiation? Does it depend on the number of participants?

[12:35] - **Deirdre**


When we are computing our group commitment, we are accumulating across several bases a group element that is the hiding-nonce commitment and a binding-nonce commitment. We also have a scalar mole by the binding factor which varies according to each participant.

[13:01]

Then you accumulate just the hiding and then add the scalar mole of the binding factor by the binding commitment and you accumulate all those together and we were like "oh, all of the binding factor and binding commitment can be a variable time because we have variable time. It's all public information multiscalar mole".

[13:27] 

We changed three lines and it was very good and easy to do. Those are the two parts, besides keygen, but you can do that separate from the signing part of it. Those round 2 & the final aggregate step are the most costly in terms of how much they scale by the number of participants. So that was very exciting, this is also significant because there have been attempts to try to either create other threshold or multisig signing protocols or changes to FROST to do the same, to get more optimizations or to get a better scaling in terms of the amount of compute or number of rounds or whatever.

[14:20] 

Basically we were able to show that you do not need to modify the protocol, you do not need to do a new security proof, you do not need to change any of your security assumptions to get a much faster version implementation of Frost. This is purely an implementation detail and rearranging of terms in your multiplication. Blog post coming very soon.

[14:50] 

So that's been pretty cool. Other stuff, we're working on proof of concept wallet integration for using FROST for Zcash signing for your Sapling or your Orchard spend authorization stuff. Conrado is leading that work and we've gotten something working, so that's great. We will be demonstrating it in a community call in mid-June, 19th I think is the plan.

[15:25] 

Daniel is confirming, so we're preparing for that and we'll be showing off some of the work that we've been doing to have a lot of examples and demo code & working examples of how you do threshold signing for Zcash specifically with all the code that we've written. So we're working on that and that's upcoming. Last, we are working on finalizing the full security proof for the rerandomized variant of FROST that is being used in Zcash because it's not pure schnnor, it's rerandomized schnnor AKA reddsa that is used in Zcash to have the privacy and unlinkability between public signatures on chain.

[16:18]

I think Chelsea who is leading that mentioned that there is going to be a little extra proving, not a ton of extra proving about properties that were not fully laid out anywhere else in the literature or in the Zcash protocol spec about why the rerandomized variant of schnnor or reddsa has the properties we want. She's basically saying like, has anyone else done this? Has Zcash done this? I was like, I don't think so.

[16:54] - **Daira**

There was a paper that Ariel and I did about the Sapling Protocol. I think it's essentially done there, but maybe not exactly the thing that you're doing. Also the [paper]([paper](https://eprint.iacr.org/2015/395.pdf)) that the re randomization is based on, it's referenced in the protocol spec has a similar proof. So it's just a matter of adapting that.

[17:28] - **Deirdre**

Yes, and she's definitely looking at that there's a little bit more that isn't quite there. I want to go find that specific paper to see if that fills that gap. But that will be coming and that will be part of our final ZIP for how one does, or at least pointed to by our ZIP of how one does FROST for Zcash.

[17:56] - **Daira**

If you want to ping me, I'm happy to review anything about the proof.

[18:02] - **Deirdre**

Awesome. I think that's it.

[18:05] - **Kris**

Deirdre, I have a question about the wallet integration that you're working on. What are you using as the backend for that wallet integration? And a related question can we get maybe some PR's to the Zcash client backend that can help support this for people using the Zthe ECC wallet SDKs?

[18:32] - **Deirdre**

Probably we are just trying to get it to work first.

[18:39] - **Kris**

What are you using? Are you building on one of the existing wallets?

[18:45] - **Deirdre**

Ywallet to start. Just to get something working. Because Conrado tried one of the other ones and it was either not working or kind of janky or something like that. So Conrado can illuminate if he wants to.

[19:01] - **Conrado**

Yeah, we were using Ywallet because it already supports offline signing, so already has the structure to export a transaction plan to be signed somewhere else. So we do that and then create a program that uses some of Ywallet code, which at the end uses the ECC crates to sign a transaction.

[19:21]

But instead of actually using creating the reddsa signature, it exports all the sighash, the randomizer, all the stuff that is required to create the FROST signature & then reads them back and creates the final sign of transaction

[19:40] - **Kris**

Something that you mentioned there that I think that is an appropriate topic for the Arborist call or for future ZIP meetings. Is that you mentioned that Ywallet has an offline signing format. We ought to actually go ahead and look at that and see if it's suitable for standardization. I know the Str4d has a bunch of opinions here, but building some standards or ZIPs around offline signing is probably a useful thing to do for the ecosystem, especially given that it's going to be important for FROST.

[20:23] - **Conrado**

Yeah, that's a great point. I also thought about this and it would be good to have a standardized format for the transaction plan.

[21:13] - **Deirdre**

Awesome. Thank you, Daira and I found the security analysis of Sapling. I don't know where I found it on the Internet, but I have it in my archive.



___


### 3. Research & Implementation Updates ii)  ZSA ZIPs & Implementation Updates


[21:40] - **Vivek**

I'm happy to give the update on ZSA's. As usual, I'll do the update in two parts with the Zips and the implementation. So on the implementation side, we've largely integrated the ZSA circuit now into Orchard. I think there are a few kinks that we have regarding the split notes and nullifiers that we have to iron out, but hopefully we should be done soon then that's like another milestone that we have done.

[22:10]

We've also added a good bunch of tests, both positive and negative tests, so that we see that things are failing when they should fail and that they are passing when they should pass. On the client side, we've been adding various RPC calls for Issuance and now transfer as well. The other cleanup thing we've been doing is recently rebased on top of more recent updates to all of zcashd, orchard, librustzcash. We are now more in line with where Zcash is on all these repos.

[22:57] 

On the ZIP side I think we've essentially cleared all the older pending comments from the old pull request so that's good. Those are done.  I think some of the things that the kinks that are there in the implementation will cause some changes to the ZIPs at some point. So those things are still there that will change & we also have fresh eyes looking at what we've done because there are things that after me looking at things for a long time, I don't see things. We've got some helpful improvements with that & that's in progress, so should be getting even better with us real soon.

[23:45] - **Daira**

Excellent.

[23:47] - **Jon**

If I add to that, there is something that as a community, we need to be talking about. We pushed one of our milestones to last - it's the fees milestone because at some point we suggested fees in the ZIP and we got interesting comments in the forums on, "hey, what's this about?" How are the fees going to affect the economics of Zcash?

[24:19]

Basically, there was a debate & we feel like it might be a good time to decide together how to approach fees for ZSA because we need to implement it and we have a basic implementation in mind and a design that we think crosses the threshold of usefulness and is very aligned with some things that happen elsewhere. But we are here to create something for the community, and if we need to implement something and then there's questions about it or comments or even disagreement on it, we might want to discuss this further.

[25:07]

I don't think this is the forum, but I think we do need to have a dedicated chat about that. Just to explain in one sentence, we thought issuance of new ZSA's should cost one ZEC and transactions of ZSA should be indistinguishable from transactions of regular ZEC and just cost whatever it costs in terms of weight on the protocol but there's differing opinions. We should chat about it.

[25:52] - **Daira**

I'm supportive of that approach because I think the indistinguishability property is very important because some of these assets are going to have relatively little usage by themselves relative to ZEC. And so in order to get meaningful privacy properties, you really need to have a single anonymity set.

[26:23] - **Jon**

Thanks. I guess maybe next time we'll prepare something short to gather the tradeoff's and talk about it and then give it a go with an implementation. Our goal is to have something useful very soon for testnet, but this is another big one.

[26:44]

We submitted and got the approval for the second part of ZSA, the one dealing with putting this in, giving a testnet and starting to move towards production and creating asset swaps between assets. So all of this work is starting really soon, we hope to bring a testnet to Zcon 4 so people can start playing with this. I say we hope because it's some work, but I expect we'll get something in your hands by the conform.

[27:30] - **Daira**

Yeah, I guess the opinion on fees depends on what philosophically you think fees are for. if fees are just to prevent denial of service, then it kind of makes sense that transactions shouldn't be distinguished because they have no greater impact on the network than ZEC transactions do.

[28:01] - **Jon**

Yeah, I had talks with Nate trying to get the strongest representation of opposing views with constructively building a case and trying to figure out what I can present so that there's like pros and cons. We'll do our best to bring this here and have that debate. One little thing, right after Zcon4, there's going to be ZK proof 5.5 because it's one day

[28:36] 

We talk about PLONK standardization, recursive snarks & should we start looking at those as something that should be a blessed concept, like a first class concept in the standardization? Then there's like two fun sessions, zkML and privacy and law enforcement actually jumping into anything that could be controversial in a panel of 45 minutes, hopefully with lots of sparks and insights for the wider Zero Knowledge Proof community, but I suppose also for the Zcash ecosystem. It's going to be interesting.

[29:36] - **Dodger**

Yeah, I just want to say it's probably worth devoting kind of an entire arborist call to that topic of fees. The other thing is, I would say, is that in a community like ours you're never going to get 100% consensus. There's just different trade offs and we just need to be wary of giving too much weight to the very noisy, but not necessarily well supported views on the fringe. And we always have the option of polling the community as well to get them to decide which of multiple options is the best one to go for. 


___


### 4. Open Discussion i)  Equilibrium / DAGSync details / ECC Roadmap 


[30:45] - **Miodrag**

We are working over the Red Team exercising and during the preparation, we have found some issues that we have mentioned on the Discord and the [Zcash forum](https://forum.zcashcommunity.com/t/ziggurat-3-0/43350/41). So we are updating this on the Discord and on the Zcash forum. So that's our update.

[31:47] - **Adi**

Can someone give an update on what's coming on with zcashd 5.6.0 and the DAGSync? Is the DAGSync enabled for the wallet within zcashd with the new release?

[32:02] - **Kris**

I can give an update there. So the zcashd embedded wallet is not going to get Dag sync. What's happening in zcashd 5.6.0 is that the support for computing the extra note commitment tree data & exposing that extra note commitment tree data via RPC API's to lightwalletd are the main focus.

[32:32] 

Along with zcashd 5.6.0, we have work ongoing on lightwalletd to then pull that data across, cache it, and then make it available to the wallets. I'm currently working on the updates to Zcash client backend, which will then make their way through the stack out to the ECC Wallet SDKs. So that's kind of the whole picture, is that zcashd changes that are required for the entire ecosystem to take advantage of the new improved sync algorithm, and then shortly thereafter, the Wallet support will follow. Does that answer your question, Adi?

[33:28] - **Adi**

Yeah. Thank you.

[33:58] - **Deirdre**

I am sorry to all the ECC folks that got laid off this past week condolences and hopefully ECC will be able to continue forward in a more successful manner. I don't know, I'm just saying platitudes sorry. But I was reading the blog post and I just wanted to kind of ask more questions about the current laid out roadmap, including or at least will release a revised roadmap.

[34:37] 

Number one bullet is proof of stake ZEC. I'm very curious, is that number one or is that just first amongst equals? Because we're very interested, but we're also aware of all the work that QEDIT has done to get ZSAs operational. I didn't see that mentioned on this blog post. And then a wallet built by and for Zcashers easy to use and accessible for anyone. I'm very curious how that interacts with zcashd or other compatible nodes, mobile wallet SDK and policy stuff. So I'm very curious about any more information about the explicitly interested roadmap priorities for the ECC.

[37:20] - **Jon**

There's actually one small angle that you mentioned. The Qedit work. We do have planned quite a lot of work of synchronizing between all the advancements on Zcash and the work on ZSA's.

[38:16] - **Pili**

I guess we park that till next time, maybe.

[38:35] - **Deirdre**

This might come back to the same blocker, but further in that blog post. ECC will help transition ownership to the broader community of some functions they've done in the past. The number one in that list is 'support for zcashd outside of ECC's Roadmap'. The second one, 'protocol review for zcash core protocols outside of the ECC's roadmap'. The second one sounds like ZIP review to me and I'm curious what the support for zcashd outside of ECC's Roadmap would look like in practice. Like third party contributors, full on contributors in terms of code review, management of infrastructure of CI or testing infrastructure. I'm interested if there's any details you can share about what you think those things look like in practice. If the answer is Ask Nick, that's also an answer.

[39:42] - **Daira**

The answer, as far as ECC Resources is concerned is ask Nick. I guess I can speak as ZIP editor and I'm happy to continue reviewing things as they need it.

[40:04] - **Deirdre**

Cool. Thank you.

[40:07] - **Pili**

Adi, do you want to say something as well?

[40:09] - **Adi**

Yeah. So from an ecosystem point of view, I just want to note that it's so good that we have two node implementations, so zebrad is hopefully coming to a stable version soon, so we have an option of switching to zebrad as the main client, at least for some of the service providers who need regular updates.

[40:37] - **Pili**

Okay. Thank you Adi. Anyone else?

[40:48] - **Daira**

Yeah, I guess I have an issue. I was going to say this to the ZIP sync call, but I guess that wasn't on yesterday, or if it was, I missed it, which is that there's a case for expanding the number of ZIP editors. It's currently me and Deirdre, and so if anyone wants to volunteer to be a zip editor, have a look at what the responsibilities of zip editors are in ZIP-0. See if that's something that you'd be interested in and get in touch with. Probably on the ZIPs channel of the R&D. Discord is the best place.

[41:37] - **Dodger**

Daira, do you want to maybe clarify what some of the sort of experience or qualifications and knowledge requirements would be? Can just anybody from the community become a ZIP editor?

[41:50] - **Daira**

So experience with editing technical documents is very useful. Making sure that a document is clear, that it's implementable, that it doesn't leave things ambiguous that has the right structure. Yeah, you don't have to be a cryptographer. It's useful if you are, but I think many of the candidates would not be cryptographers. So yeah, just to spread the workload a bit and to decentralize the influence that their competitors have because we have a lot of de facto influence. Even though our role is quite circumscribed in practice, just putting more effort into reviewing a particular ZIP can make a lot of difference as to how long that ZIP takes to go through the process.

[43:09] - **Pili**

Definitely an encouragement for anyone that's on the call or watching it later to see if this is something that you might be qualified to do. 

[43:24] - **Daira**

Definitely if you have experience with RFCs or with other science institutions, that would be perfect. But even if you don't, don't be too discouraged.

[44:13] - **Pili**

Yeah, I guess if there's nothing else, we will move to announcements, but don't know if we want to wait a little bit longer or just move on. There's a question about when the calls are uploaded. I'm not sure what the process is now. Dan, do you know who's in charge of this? Or Dodger, can you speak to that at all?

[44:39] - **Dodger**

This arborist call is set up under ECC's Zoom account & if we were to change that, and we will change it at some point, but changing it would mean new links and so on. So we want to make sure that we get plenty of notice and advanced warning before we do that so people aren't joining old links and it's just becoming a mess.

[45:08] 

But as a result of it being under the ECC Zoom account, the recordings are recorded to the ECC Zoom account. So ECC have to wait for those to be available and then upload them. And in our experience, uploading large files to YouTube doesn't always go smoothly. It can often take several tries for it to be uploaded. The short answer is that it kind of depends if someone's on vacation or if there's been a lot of change within the organization, then that might delay it a little bit, but they're usually up within a week or two of the call taking place.



____


### 4. Open Discussion ii) - ECC Roadmap continued


[49:07] - **Daira**

So Nick has joined with a new link. I think it's the Nick Takacs without the space. Can you promote that one to a panelist?

[49:26] 

Hi. So did we had the question about proof of stake and the roadmap.

[49:44] - **Deirdre**

Yeah, I was just wondering if there was more information about the explicit priorities, for example proof of stake ZEC and a wallet, period. 

[50:05] - **Nick**

From a high level & I know Chris Tomeo from our side posted an update yesterday, mid afternoon. "Priority continues to be getting out of emergency mode".  I believe Daira or Kris, one of the two mentioned at the beginning of the call 5.6.0 is piece one. We've got updates coming to Lightwalletd to enable those, expose those APIs for the fund availability components and then we are also updating the SDK with a follow up release to address those as well.

[50:48] 

So those three pieces are the necessary pieces to enable Nighthawk Edge unstoppable the three that are using our SDK to hopefully unblock them and get out of this emergency mode status. Kind of parallel to that. Nate is starting to put together a structure around the research elements for proof of stake. So as soon as he's done with that, he'll have some information at the next arborist call to present.

[51:25] 

As far as the wallet goes, we have a [base code for iOS](https://github.com/zcash/secant-ios-wallet) and [Android](https://github.com/zcash/secant-android-wallet) right now that we're using as a test bed to test the changes that were for example the parallelization changes for sync which have improved sync speed considerably.

[51:43] - **Conrado**

We'll use that same wallet code to test these upcoming changes for fund availability with DAGSync. And then once emergency mode is out, we will have a roadmap published that will talk about our delivery date for kind of version one of the ECC wallet. There's still some internal conversations at the leadership level over what functionality will or will not be in there, but at the very minimum, it'll be the basic kind of a stripped down wallet that is white, black, high contrast, simple UI interface, and then we'll iterate from that point forward.

[52:23] - **Deirdre**

So a mobile wallet, specifically a lightwalletd client?

[52:37] - **Nick**

Correct. Yes.

[52:41] - **Daira**

That's the secant code base. I don't know whether it will eventually be called second, but that's the codename.

[52:54] - **Deirdre**

Interesting. For the two items about transitioning ownership to functions ECC is undertaking, in the past, we already discussed a little bit about protocol review for Zcash core protocols outside of ECC's Roadmap. There was some discussion of basically inviting people to become a ZIP editor. I don't know if there's anything more about that beyond being a ZIP editor or a contributor to the Zcash protocol specification, but I have more questions about support for zcashd outside of ECC's Roadmap.

[53:35] - **Deirdre**

What does that mean in practice? Does that mean having full contributors with commit access and code review permissions? Does that mean people maintaining CI infrastructure and release tasks? Can you give us a little sense of what part of supporting zcashd outside of ECC's Roadmap are you looking to the community to take over?

[54:10] - **Nick**

So I can talk at a high level? Nate, I and Josh have talked a little bit about this as part of that decentralization of Zcash initiative, which Zooko has promoted as part of the restructure announcement. Part of our goals for the next term for our planning is to outline what we'd like to happen and then a plan for engaging the community through these types of calls and others to lay those out.

[54:42] 

One of the high level priorities is the new https://z.cash site launch, which will be coming up, and there's some internal work that we have to do to prep for that. As far as zcashd and the future of zcashd, we haven't gotten to that discussion yet on what that looks like and what we would be looking for from the community. So to answer your question, I don't know yet. Within the next six to eight weeks leading into Zcon4, we should have those answers at least have something on paper that we can start digging into and discussing what makes the most sense in terms of transitioning to the community or potentially saying, "hey, we want to hand this off. We don't want to hand this off". It wants to be kind of a partnership thing. So that's where we are at this point. There's still a lot of internal discussions to get done.



___


### 5. Announcements - Nighthawk Apps Global Lightclient Infrastructure 


[46:25] - **Adi**

All right. So, we want to announce the global Lightclient infrastructure, which are the four clusters. One is based in North America, one is in Europe, one is in Asia in Singapore, and one in Brazil, South America. So we see the properly functioning public infrastructure is crucial for the Zcash platform, having built apps on it for the last couple of years. We see this as a project, as an opportunity to work with all the participants in the Zcash ecosystem. We invite developers and projects to use the distributed infrastructure to build their Zcash applications and services. So these are all running mainnet on zcashd, plus the lightwalletd infra right now, and we are exploring even running the zebrad's and the compatible lightwalletd rpc's in the coming future.

[47:20] - **Deirdre**

Very cool.

[47:22] - **Kris**

Just a note that's relevant here with respect to zcashd 5.6.0 is that once the upgraded zcashd and the upgraded lightwalletd are available, the upgraded zcashd's will require a reindex in order to build all of the intermediate note commitment tree information. And so if that can be done in sort of a rolling fashion, that would be a good thing to have, just as a general capability for services that are backing or lightwalled services for those that are using zcashd as their backing service that they'd be able to deploy in a rolling fashion so that re indexes can happen on one node and then another node and so forth and not cause downtime.

[48:17]

Yeah, thanks for bringing that up Kris. I know we ran into this issue last time when it took way longer than we expected. Like more than a day. So do we have an approximate estimated time as to how much time it takes to reindex? I do not have any numbers for that. We haven't tried a reindex recently. It's probably not going to be substantially shorter than previous reindexes.

[48:44] - **Adi**

Understood, we'll make a note of that and use our backup servers to make sure no services go down. Thank you.

___

### 6. Closing - Call Schedule 

[55:41] - **Pili**

I know we've kind of jumped back to the discussion portion again, so I think if that's all that we wanted to talk about on that, I'll jump back to announcements and does anyone else have any other announcements or any other business? Okay, I think this means that we can end the call. Thank you, everyone & thank you to everyone who participated from the ECC, qedit Equilibrium and the Zcash Foundation we'll see you all next Thursday 15 June at 22:30 UTC. 


[56:35] - **Daira**

That's something I wanted to ask about the time, because in the UK it's UTC+1, quite late, and in Europe it's UTC+2. Is there any possibility of making that a little bit earlier?

[56:55] - **Dodger**

Well, let's not try and jerk the wheel right now. I think when we do the transition, when we create the new zoom links, I think we can revisit the timezone. Because obviously these are created in UTC timezone, and no matter what time zone we pick I understand if we pick one with daylight savings, then there's going to be confusion during a couple of weeks each year due to the mismatch between US & Europe. But my current thinking is that we make the change during the break for Zcon.

[57:48] 

Because I think that's that's that's a good time to make the change. That way we can we can give people plenty of notice and set up in your links and whatnot.

[58:01] - **Daira**

Yeah, let's talk about that on the Arborist call channel on the R&D discord.

[58:07] - **Pili**

Thank you everyone.


_____



**Next Meeting Scheduled: 15:00 UTC June 15th 2023**


___
___

