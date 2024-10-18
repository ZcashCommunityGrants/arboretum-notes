# Arborist Call #88 Notes

Meeting Date/Time: October 17th 2024, 15:00 UTC

Meeting Duration: 1 hour 30 minutes


+ Welcome and Meeting Intro

+ [NU6 Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#1-nu6-update)

+ Zebra Update - [Zebra 2.0 / Security Audit](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#2-zebra-update---zebra-20--security-audit) 

+ ECC Core Update - [PCZT / Zashi delay](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#3-ecc-update---pczt--zashi-delay) 

+ [zcashd deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#3-zcashd-deprecation)

+ Research & Implementation Updates - [Zcash Shielded Assets](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#4-research--implementation-updates-i-zcash-shielded-assets) / [FROST 2.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#4-research--implementation-updates-ii-frost) / [Zcash Sustainability Fund](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#4-research--implementation-updates-iii-zsf--network-sustainability-mechanism) / [Trailing Finality/Crosslink Security](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#4-research--implementation-updates-iv-trailing-finality--crosslink-security) / [PoW/PoS Economic Design](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#4-research--implementation-updates-v-powpos-economic-design)

+ Open Discussion - [ZCG Processes](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2088-Notes.md#5-open-discussion---zcg-processes)


## Decision & Action Items

i) Set up call to discuss NSM ZIP corrections - ZIP editors + Jason McGee


___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=7A5ttZqad5g&feature=youtu.be)

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes


### 1. NU6 Update 

[00:01:23.41] - **Kris**

I can't remember whether this was since the last Arborist call. I think perhaps it was. [zcashd 6.0.0](https://github.com/zcash/zcash/releases/tag/v6.0.0) has been released with support port for NU6, and everyone should upgrade to it. The zcashd 5.1.0 series will end of service halt on or around November 5th and the current NU6 activation, I believe is around November 23rd. Everybody upgrade by November 5th.

[00:03:09.26] - **Marek**

We have a [release candidate for Zebra 2.0](https://github.com/ZcashFoundation/zebra/releases/tag/v2.0.0-rc.0). That's pretty much the main update in terms of merged PRs.



____

### 2. Zebra Update - Zebra 2.0 / Security Audit

[00:03:26.47] - **Marek**

We fixed the the testnet issue, and we have a bunch of all the PRs underway, the main ones are those that will track the - and the orphaned transactions in the mempool.

[00:04:06.46] 

The main thing there is the release candidates. That's all.

[00:04:20.49] - **Pili**

I'm just going to add that we've created [issues](https://github.com/ZcashFoundation/zebra/issues/8904) for the audit that least authority did. They're very minor comments, and we'll be fixing them in the next few days. After that, we'll go back to least authority for validation and hope we will get a final audit report that we can publish.

[00:04:55.10] - **Marek**

So, yeah, we have a bunch of PRs on the way that we need to merge. We are refactoring our Docker file and the scripts related to it. Then the verification of orphaned mempool transactions and tracking the nullifiers. The cookie-based authentication for RPCs, that's ready to go. The report contains two issues that we expect to fix quickly since it's documentation and panics.


____

### 3. ECC Update - PCZT / Zashi delay


[00:06:11.23] - **Kris**

The main thing that is ecosystem-wide that's of interest here that we've been working on this past week is Str4d has been doing a lot of work on the PCZT, the partially constructed a Zcash transaction format. That will be useful both for FROST signing and for interaction with hardware wallets and attempting to take into account all of the myriad ways that one might want to collaboratively build a transaction with other people and put things together.

[00:06:53.53] 

There's a [draft PR](https://github.com/zcash/librustzcash/pull/1577) up, I believe, on the librustzcash repository that has as a strawman implementation for that serialization. Apart from that, on the Zashi side we've been working through some issues related to app stores, but the major feature-related thing that we've done is implemented a a minimal note management feature so that people's wallets can have a mix of notes in them that helps them make transactions back to back so that we can finally fix the tip the barista problem.

[00:07:42.19] 

So anyway, that will be coming out in a release soon. Right now, releases are blocked on Apple being a bit of a hassle because of our Coinbase integration. We don't have a really strong idea of when or how those issues are going to get cleared up, but we're working through it.


___


### 3. zcashd deprecation

[00:08:07.22] - **Pacu**

On my side, I started contacting some block explorers, started the outreach to know their RPC requirements to be able to continue their services using Zebra instead of zcashd. And I'm currently currently taking on a small development task on librustzcash since I was blocked on other work, and I took something that was a little bit on the side and not blocking anyone, but we'll make progress on the zcashd deprecation DAG as well. I'm a little bit behind on gathering the RPC information we already have. I've been with some mild surgery of my eyes, so I couldn't commit too much work these past few days, but I'll catch up.

[00:09:54.23]

We also are working with chainsafe people because they are contributing on the in-memory wallet side of the zcashd wallet deprecation, mostly Kris is working with them to see how they can contribute upstream their work in a useful way for the codebase. That's another important part of the deprecation DAG that will be unlocked by those two items that the chainsafe people are working on. 

[00:10:44.06] - **Arlo**

There's a few changes that are going to be needed in Zebra. I'm currently working on integrating Zebra's primitives to use as the backend in Zaino. So There's certain structs at the moment that are completely private, and so public get setter functionality will need to be added. I should have a small PR early next week in Zebra to add that so I can switch over fully. Then we're also working on our test framework, which will show the functionality between lightwalletd and Zaino, so we can make sure that everything's running exactly the same. That should be done probably next week, while these two wrap up and we'll get to finishing off building all of the lightwalletd functionality in Zaino over the next couple of weeks. We can move on to actually integrating properly with the read state service in Zebra.

[00:12:06.52] - **Marek**

We also have a [PR on ZIP 233](https://github.com/zcash/zips/pull/913), and we will start reviewing that soon. It's the network sustainability mechanism.



___


### 4. Research & Implementation Updates i) Zcash Shielded Assets


[00:13:30.25] - **Vivek**

Regarding the ZSA updates, I'd like to start today with asset swaps. So we've continued with some changes to the ZIPs that we found streamlined things while we proceeded with our implementation. We've also completed a first draft of the changes to the Orchard Crate that would be necessary for asset swaps.

[00:13:54.33] 

So I think that's still in review, but it's a first draft that's ready. On the ZSA front, I believe we've completed work on the Orchard and librustzcash crates for the ZSA protocol and the transaction version 6 format. One of the recent changes that was there over there was moving away. We had originally used strings to store the asset description, but since the specification was that they should be UTF-8 and not must be UTF-8, that was not the best way to go about it. So we moved away from using the string format.

[00:14:44.23] 

Basically, that work is done. We are now focusing more on zebra. I think the two main pushes there are doing the consensus rule verification and making the updates to the global state to account for the extra stuff that needs to be stored for ZSAs. So I think the plan there, we had a meeting with the Zcash Foundation yesterday, and so we will split the work that we've been doing into smaller PRs and the review process should be starting soon. So that's nice.

[00:15:22.38] 

Regarding the ZIP, 226, 227, and 230 for the transaction format, those are ready for review by the ZIP editors. What I'm still working on is revisions to ZIP 317 for the fees to add in the details for ZSA and something analog is for ZIP 315 regarding recommended wallet behaviour. I think the audit with least authority also we've been discussing with them, and that should be starting sometime soon.

[00:16:05.29] 

The last bit is regarding the transaction acceptance work that we were also designing. We've been documenting the importance different considerations, the different use cases, those things like that. And we've started designing, made some initial designs based on that. So we'll be sharing the document or cleaning it and sharing that in the coming week sometime. 



___


### 4. Research & Implementation Updates ii) FROST

[00:19:24.46] - **Conrado**

We finished adding encryption authentication to the FROST server, which was the final part of the puzzle, but we still need some no cleanups and stuff to actually make the server something production ready, but the main part is done. That's for the demo repo and the domain Frost repo, we've been reviewing some contributor PRs, and we're going to make a 2.0.0 release We've been postponing for no particular reason, but it's going to be released soon. We're still working on adding refresh shares functionality when you're using the DKG. There was some small issue there, but we sorted it out, and I think that's it. 



____

### 4. Research & Implementation Updates iii) ZSF / Network Sustainability Mechanism 


[00:20:38.27] - **Jason McGee**

We've got a couple of major updates to share today. We've made some changes that we think will help improve the community's understanding of what the sustainability mechanism is and how it functions. First off, we've changed the name from Zcash Sustainability Fund or ZSF to Network Sustainability Mechanism or NSM. I had announced on the form a few months ago that we were considering a name change because the word 'fund' created too much confusion.

[00:21:10.17]

People were thinking of it in terms of the dev fund or that there were organizations that control or are recipients of the fund. Since the NSM is not a fund, it's an upgrade to the current issuance mechanism that enables ZEC to be removed from circulation and recreated as future block rewards to help the same in the network, we figured that that would help clarify its purpose.

[00:21:36.55]

As a result of this change, we no longer refer to deposits or distributions and instead use terms like burning to describe the process of removing ZEC from circulation and then minting to describe recreating ZEC in future block rewards, and it still honors that 21 million coin cap. We believe that the terms burning and minting are easier for the community to understand because they're common terms used in other projects like Ethereum.

[00:22:06.12] - **Daira Emma**

The ZIP editors, or actually Kris, Str4d and I had some doubts about that terminology, but I'll let you continue your piece, and then we can talk about that.

[00:22:27.47] - **Jason McGee**

Okay. Yeah, let's talk about it. So The changes have been reflected in our ZIPs. ZIP 233 has been updated to introduce a voluntary mechanism for burning ZEC. We previously had the ZSF deposit field, and that's been replaced with burn amount, and then ZSF balance is no longer reflected. It's instead defined in relation to max money by ZIP 234. And then in ZIP 234, we revised the motivation section to make it clear that smoothing the issuance curve is necessary to enable burned coins to be reintroduced into circulation in a straightforward and predictable manner.

[00:23:08.38] 

Then the term money reserve now replaces that ZSF balance and is defined by max money minus chain value. Then ZIP 235 is largely unchanged, except it now specifies the burning of 60% of transaction fees to support network sustainability. The ZIPs are final. PRs have been submitted, and they're ready for the ZIP editor review. We've also finalized the code and submitted all PRs for all three ZIPs implementations for zcashd. Then for the implementation for Zebra, I think the first ZIP has been submitted and the other two will be submitted in the next few days, and that's for the actual code.

[00:23:53.17]

Our intention is for the NSM to be included as a candidate in NU7. I'm going to provide the update for the community later today, obviously, depending on the feedback that Daira, Str4d, and Kris have snd I've also been working on a FAQ that addresses common questions about the project and helps explain it to the community better.

[00:24:15.29] - **Daira Emma**

So we had some comments about terminology and also some questions about motivation. Those are on the PRs, but I'll repeat them for the people here. So for the change of terminology from on issue to burnt. So in other cryptocurrencies, when you burn funds, they can't be reissued. That's cryptocurrency with effects like Bitcoin.

[00:25:02.11] 

So we thought that it might be for people who are used to that property, It might be a little bit misleading to use burnt here because part of the motivation for this is to allow those funds to be reissued.

[00:25:28.28] - **Kris**

The essential The difference, I think, is that burning implies reduction of the monetary base, and this operation is not a reduction of the monetary base.

[00:25:41.54] - **Jason McGee**

It's a temporary reduction of the monetary base, right? Because if those were never reissued, then.

[00:25:50.29] - **Daira Emma**

It's a temporary reduction in supply, yes.

[00:25:53.08] - **Zooko**

Yeah. There's this conceptual difference between, which we have flip-flopped at least once on.

[00:25:59.44]

It in the labs between the coins are set aside and then those coins are reused is one way to think about it. Dodger says burning implies destruction. Exactly, the other way to conceive of the same thing, which we're currently trying to switch to is that those are destroyed, and new ones can later be created according to the rules that still satisfy the 21 million cap and the supply issuance curve. The old ones are not the new ones.

[00:26:32.15] 

But before you answer, one of the reasons, I agree, it's that idea of the supply not going down permanently is confusing, but also the other way is confusing in different ways. And one more reason is we've been told by this high profile IRS lawyer who's currently suing the IRS and was in the news last week that if you have a gold coin, now you owe the IRS 40 % of it because you got paid. If you have a gold nugget that you dug out of the ground, you don't. And the same principle... So the principle is if the reward a miner in a block is a transfer to that miner from some agent, then that transfer and that agent, whoever it is, is subject to IRS and money transmitter requirements and securities regulations and so forth.

[00:27:53.53] 

Whereas if the miner actually just created that block all by himself independently, It's not because then the agent in question is just that miner. Anyway, that's complicated and weird, but that's one of the things that we were told along the way.

[00:28:11.09] - **Daira Emma**

Yeah. I mean, the agent is just the miner and then the protocol is a social construction in the same way that other kinds of money are social constructions.

[00:28:24.32] - **Zooko**

I agree with you. Let me read it real quick. It seems like, based on what this lawyer told us and what I I see in the news, that government agencies go looking for an agent, right? Their job is to regulate what agents can do. So if we say somebody or something gave the miner these coins, then that activates them. They're going to go looking and they could even potentially, I guess, maybe, maybe not, end up looking at the devs who implemented that code as the agent or all the other miners or someone as the agent. But anyway, that's a super big ball of wax.

[00:29:01.19] 

But back to your basic point, yes, saying it's burnt is a little inconsistent with Ethereum terminology, because like Kris says, in Ethereum, when coins get burnt, the ultimate permanent monetary base is that much less and that's what's different about the network sustainability modules that the monetary base eventually, exponentially over the next n years, restores. But it's also a lot like the Ethereum concept in that the person who burnt it has lost it forever, and the monetary base has gone down by that much currently.

[00:29:42.59] - **Kris**

Well, Ethereum is actually the wrong comparison here, because in Ethereum, they burn funds, but Ethereum's not supply capped. So future emissions can introduce according to, is it EIP 1559 that does that? There's something about that algorithm that allows it greater issuance. There's not a fixed cap.

[00:30:13.31] - **Daira Emma**

Yeah. I mean, Perhaps I shouldn't joke about taxes, but if I'm giving away money and lots of money as a dev as part of a business venture, then that's a loss and I want a tax rebate. Okay, that wasn't the only issue. Dodger mentioned the burning as having mental associations with destruction I mean, that is a disadvantage, I think. Anyway, so other issues.

[00:30:54.24] - **Jason McGee**

Just real quick on this one point, though, before we get to the other issues, are we saying that the problem is with the terminology and that the ZIPs are still in a stable or acceptable semantic state?

[00:31:07.02] - **Daira Emma**

Well, there are some issues that are about consensus rules, for example. Let's see. There was one issue about coinbase transactions where we thought the consensus rule was incorrect for transactions versions before this upgrade or whatever upgrade that would adopt the NSM. 

[00:31:55.51] 

It was a conflict with ZIP 236. So ZIP 236 requires that each block balances exactly. And that's in conflict with the way that you specified the burn amount field for ZIP 235. So there's a comment there about that. But there's a relatively easy fix to that because you can require Coinbase transactions to be the new version and have the explicit burn amount field.

[00:32:30.54] 

Other things were, I think, mainly about motivation. So the motivation for ZIP 234, it says that sudden shifts due to halvings can potentially disrupt the network's economic model and impact its security and stability.

[00:33:07.25] - **Kris**

we probably should make this a bit in a ZIP editor meeting.

[00:33:10.29] - **Jason McGee**

I'd be happy to set up another call with you guys to work through these issues because I think that they're very simple.

[00:33:20.57] - **Daira Emma**

That's probably the best thing to do. So let's do that.

[00:33:25.07] - **Jason McGee**

I wanted to check with Mariusz and see if he had anything he wanted to say on the last of the coding that he's working through.

[00:33:34.32] - **Mariusz**

So we have posted all PRs for zcashd for all the ZIPs. We have one PR for Zebra, which covers the ZIP 233 and I am finishing my work on the ZIPs 234 and 235, which should be posted either tomorrow or beginning of the next week.

[00:34:05.25] - **Daira Emma**

So the other issue which probably we should consider here because the governance implications is, do the community actually want this? Has it been sufficiently motivated that the community is in favor?

[00:34:27.49] - **Jason McGee**

That's an important question. So we've had conversations conversations for the past year and a half on the forum. We've done presentations in Zcon. But I do think that now that we understand what the timeline is for NU7 and we have an actual deadline, now is the time to start putting the conversation into high gear, doing polling in November after we go through the ZIP approval process or ZIP selection process as is listed in the roadmap.

[00:34:59.35] 

I'm pretty confident we can demonstrate that based on conversations I've had with community members and stakeholders. But I think that will happen organically over the next 2-3 months.

[00:35:15.00] - **Daira Emma**

Because if NU7 is including ZSAs, then it is already close to what we consider to be the complexity budget for an NU. Okay. Close to what we have considered in the past to be a complexity budget.

[00:35:33.18] - **Jason McGee**

Understood. But here's one issue, is there a chance? We've done the zcashd  and the zebrad implementations because we think that it might take longer to do the zcashd deprecation than is expected. If that runs into the end of the year or 2026, could we get this in first? Could this be NU7 and then ZSAs and zcashd deprecation be NU8? Because Zsas are contingent upon zcashd -deprecation, right?

[00:36:10.36] - **Daira Emma**

They are. So the ZIP editor has posted a rough timeline. I shouldn't speak for them because I'm not the ZIP editor anymore. But my impression is it certainly would significantly delay ZSAs if they were put in an upgrade after, if they were not in the next upgrade, if they were in NU8. So when you say the complexity budget, you're saying that it's too burdensome to include ZSA, zcashd deprecation, and the ZSF.

[00:36:49.32] 

I'm not quite saying that. I'm saying it's close to the limit. So there's There's a question there as to whether NSM is worth it to put it in the same upgrade. 

[00:37:14.34] 

And it's also the case that polls have consistently shown that the community considers ZSAs to be a very high priority.

[00:37:25.28] - **Jason McGee**

Understood. Yeah, I agree with that. It is definitely high on the list of priorities for the community.

[00:37:34.14] - **Josh**

So the question was, why were we implementing this in zcashd ? I thought we had agreed that zcashd  deprecation was a priority, and we didn't want to introduce anything new to zcashd . The goal within NU7 was everything would be on Zebra at that point.

[00:38:00.19] - **Jason McGee**

Yeah, this is something that I brought up in an Arborist call many months ago, and my understanding was that it was an option.

[00:38:10.56] - **Daira Emma**

We are further along, and we've worked out the rough timeline and the window for that option is closing. I mean, speaking as ECC's engineering manager, I think it's very unlikely that that option will be taken.

[00:38:40.10] - **Josh**

And it's also why? Why do we want to get this in now? Why should this be a priority because it's non-trivial to get another network upgrade in there.

[00:38:54.17] - **Jason McGee**

Yeah, but it seems like you can always make that argument that there's nothing overly sexy about the It's like saving for retirement in your 20s. I think you can always say that there's going to be more urgent or more pressing things to get in. It just seems to set that precedent to say, Well, we can just kick the can down the road because there's other things that are high priority.

[00:39:16.23] - **Josh**

But why do we need this now? I guess. That's something I just don't fundamentally understand is why should this be a priority for Zcash now?

[00:39:26.26] - **Zooko**

One thing it could enable right away is if someone wants to donate to Zcash as a whole by burning coins using this mechanism. As soon as it's live, someone could do that.

[00:39:38.30] - **Josh**

And this is something that- It's theoretical, right?

[00:39:41.10] - **Jason McGee**

We've heard from the foundation. There's a post on the forum where they said they would consider donating to the ZSF.

[00:39:53.25] - **Daira Emma**

The Namada people are very nice, I'm sure, but it's easy to put a post on the forum saying that you will donate to something.


____

### 4. Research & Implementation Updates iv) Trailing Finality / Crosslink Security

[00:16:55.58] - **Daira Emma**

This was a research and in general, as opposed to specifically zcashd deprecation. This is trading finality layer.... I figured out that it was possible to improve the security proof for Crosslink 2 in a way that allows you to effectively get half the finalization latency for the same security and I'm reasonably confident of that now. I just need to go through the details of the security proof, but that's really useful.

[00:17:50.28] 

Because previously, if you set the number of confirmations to Sigma, then you got security dependent on the best chain protocol, so the existing proof of work protocol with that many confirmations. But the finalization latency will be 2 Sigma plus 1 blocks. So it turns out that you can do it with the finalization latency of Sigma blocks plus whatever the overhead of the BFT protocol is, which is as good as you could possibly expect.

[00:18:40.05] 

It's not obvious, but I think it goes through.  

[00:40:11.18] - **Nate**

Hi, I'm back. I will be late to this time slot in future but its good to be here. 

[00:40:39.50] - **Daira Emma**

Did you miss me saying the thing about latency? I can't remember whether I told you about that. I think I told you privately about that.

[00:41:00.54] - **Zooko**

For the last three Arborist calls, we've had this living document, work in progress about possible trade offs and goals for Shielded Labs' first deployment of Crosslink. And now we've boiled it down into a short and sweet list of goals and trade offs, and we're going to post that to the Shielded Labs GitHub as the way to solicit feedback. So we're opening a comment period as soon as we upload that to our GitHub, and we're going to close the comment period on Halloween, the 31st.

[00:41:45.44] 

It's short and sweet. Please look at it. And that's going to guide the next step, which now that Nate's here, he could talk about the next step about implementing the stupidest possible prototype.

[00:42:00.10] - **Daira Emma**

Is that on Shielded Labs? Is that on Shielded Labs website?

[00:42:06.44] - **Zooko**

It's going to be on Shielded Labs GitHub momentarily, so we can figure out how to commit it.

[00:42:19.20] - **Nate**

Hi, I'm just starting up at Shielded Labs, and my focus is implementing and also fleshing up the design for Crosslink to make it deployable and then to see if we can get it to be deployed and Zcash. Just for context, I've been pretty unplugged for a while with my family. So I've been relearning contexts of Crosslink. I had a good call with Daira to learn about developments or updates she's been working on since I was last working on the project. So that's been good.

[00:43:05.15]

Then we have also started interviewing engineering candidates. So we want to hire a smallish team. And the initial goal is to start working on a prototype even before the full design of Crosslink is done. But that's a little bit farther out. So probably by the next Arborist call, what I would like to have done is reviewed all of the tickets and roadmap that's in the TFL book repository and also we want to figure out how to distinguish between what our plans are and what we are building versus what may already be in the [TFL book repository](https://github.com/Electric-Coin-Company/tfl-book).

[00:43:58.56] 

So we might want to have a different roadmap or pick and choose different pieces or use them in a different order, things like that. So, yeah, I need to figure out the best way to track that.

[00:44:18.09] - **Daira Emma**

Yeah, because originally that book was written under the assumption that ECC would be doing a large proportion of the work and so I think probably stuff about roadmaps should just be removed from the book and it should be a description one possible proposed protocol.

[00:44:47.05] - **Nate**

I think we can figure it out over the next couple of weeks, so that's my goal, doing that and also interviewing and relearning Crosslink and building zebra and setting up a dev machine, all of the ramp up stuff. Glad to be back. I couldn't stay away from Zcash.

[00:45:11.26] - **Daira Emma**

Good to work with you again. There is one thing that I thought of, so in addition to the improvement in latency, so it's possible to have an intermediate state that might be less risky that we transition to first. So there's a rule called the Finality Gap Rule, which says that if the gap between the finalization point on the tip of the chain exceeds a given number of blocks, then you can only construct safety blocks after that point, which probably would be coinbase only blocks and the rationale for that, well, it's described in the book already.

[00:46:14.59]

But just to make sure that the things like balances don't diverge too much between those or the number transactions. You can deploy it with the finality point, just as something advisory rather than defined to be the thing that you use to decide which transactions are final. So you can have a test mode where people are not really supposed to pay much attention to that unless they are debugging the protocol. And in that mode, you would switch off the finality gap and then it's It essentially doesn't matter if the BFT protocol gets stalled.

[00:47:21.16] 

So you can potentially have it stalled and the security properties are just the same, and then you can fix the reason why it's stalled and eventually, you enabled the finality gap rule and you have it working as intended.

[00:47:40.53] - **Nate**

Interesting. I like some of these ideas that are halfway between staging and deployment. So it's actually on mainnet, but it's designed not to interrupt. Another reason I like that is if we're really confident that that couldn't disrupt the normal operation of mainnet, but it has the BFT side, the trailing finality layer running, then it could involve real ZEC at stake for people who want to do that.

[00:48:21.53] 

The reason I like that is it's a way to guage how much people are interested in this. And it's similar to something Ethereum did where you could commit to helping run the Beacon chain and it took real money so they could see, is there enough support to do this, which is something you want to know for a proof of stake. We want to know there's enough stake interested. So we will definitely want to be figuring out those deployment stages.

[00:48:57.59] 

I think right now My focus is more on this prototyping piece, but there are some similarities, because in the prototyping, I want to build out different milestones that are similar, where portions of the protocols aren't functioning fully or are being ignored or what have you, to make sure it's okay.

[00:49:21.53] - **Daira Emma**

By the way, the only reason this is possible is the simplifications that I made for Crosslink 2. So thanks to Str4d and Nathan for those ideas that made it possible.

[00:49:37.12] - **Josh**

So I'm wondering since... I mean, this is all very novel to my knowledge, there's no real analog across crypto. Are we or are you looking at the economic or doing a study on the economics and the potential security implications of the economics of this? Because we're going to have a halving, then we're going to split mining rewards between proof of work miners and staker validators. And so my understanding is with this, there's some potential risk of a halt. I think I can't say, perfect or wrong, Daira, but I think you were teasing that out a little bit in terms of that potential risk.

[00:50:37.11] - **Daira Emma**

Yeah. So for the standard protocol, if you can call If you can cause a rollback of more than the safety parameter Sigma, then you can potentially force the network to halt and that might be something that you can detect and fix relatively quickly. But just for the protocol on its own, you can force that. So you have to be fairly confident of what that parameter is.

[00:51:10.13] - **Josh**

So then the question is, for Shielded Labs, is there an intention to do that economic security work?

[00:51:21.14] - **Nate**

Yeah, we definitely want to have some estimates or model for what we might expect for the security given the expected issuance. But that's going to be speculative to some degree. So the more tractable thing is to figure out, "if X amount of ZEC are being issued per time, per day, how is the security compared to existing Zcash proof of work without making this change? Is it better or worse? Or the same?"

[00:52:13.18] 

I don't know if people remember, but at a Zcon, I presented a much more hand-waving idea for doing a trailing finality layer and during the talk, people were like, but doesn't that split the amount of security to the weakest of POW or POS?. If our understanding of Crosslink is correct, it addresses that problem. So Daira has pulled the rabbit out of the hat. There is precedent for it in Ethereum mainnet. They switched to a hybrid and then they switched to full proof of stake.

[00:53:00.31]

So anyway, if that analysis is correct and the design is good and secure, ideally, there shouldn't be a significant change in security level. But I'm somewhat sceptical of people relying too much on these concepts of level.

[00:53:26.26] - **Daira Emma**

So it's like pulling a rabbit out of a hat, but the rabbit has half the amount of food.

[00:53:35.37] - **Nate**

Well, that's not quite the case. It's a little bit confusing because, for example, let's say the issuance gets split half and half between proof of work and proof of stake. So the difference between switching to Crosslink, assuming it works on the ideal, versus proof of work is not quite the same as saying, now it takes half as much resources to do a rollback attack, because now there's also finality. So, yes, you can do rollbacks. It's cheaper But the impact is almost entirely mitigated.

[00:54:24.07] - **Daira Emma**

This is the thing, there's no free lunch. In order for the security property to be meaningful, either one or the other of the BFT protocol or the best chain protocol has to be secure in order to get safety. But for liveness, They essentially both have to be secure and live. So that's the no free lunch.

[00:55:08.46] - **Nate**

Right.  So what that means more specifically is Now there's a new attack vector where an attacker could halt the chain and part of the rationale for why using a BFT protocol is desirable in the first place is that halting is better than long rollbacks, which is like a subjective judgment call. But basically the rationale is if there's a halt, everyone knows what happened. All exchanges will have the same sorts of reactions. Whereas if there's long rollbacks, everyone might behave differently.

[00:56:01.34] - **Zooko**

And people can get robbed.

[00:56:03.49] - **Nate**

People can actually get robbed either way. But it's much harder. Until we have a lot of DeFi, it's much harder to be robbed by a halt. But you can still be robbed if there's any futures contracts or anything like that.

[00:56:23.49] - **Zooko**

But there's currently not.

[00:56:25.35] - **Daira Emma**

I personally agree with this argument. I just want to make sure that the community understands.

[00:56:35.21] - **Nate**

There's definitely trade offs. Yeah. So I think maybe talking about security. So security level, like I was saying, I don't feel like it's good to rely on it too much. But my thinking is it's roughly in the same ballpark. But what's more important is there's these trade offs. And this is the major one is it's now possible for the network to halt. That could also happen because of a bug or something like that.

[00:57:06.02] - **Zooko**

With the benefit that you're less likely to get robbed.

[00:57:11.00] - **Daira Emma**

It's a feature that a bug will also trigger the same behavior.

[00:57:18.56] - **Zooko**

The network may halt instead of people getting robbed.

[00:57:27.42] - **Daira Emma**

People can still get robbed if both protocols get subverted.




____

### 4. Research & Implementation Updates v) PoW/PoS Economic Design 

[00:57:35.46] - **Pacu**

Yeah, in terms of how staking and mining rewards would split, is there anything that avoids current miners to also spin up validators? That has a tradeoff because they'll have a little bit more cost of spinning up a staking machine.

[00:58:10.23] 

They absolutely can do that. But they can have two tickets for the mining or the block lottery. But it also gives the the overall network security state some  hard to determine who of the staking. I'm the same actor with... Unless I have different personalities for doing each of the tasks, I have the same goals. In terms of have the protocol designers, considered the network effects of this new dynamic?

[00:59:19.00] - **Nate**

Yeah, so we've thought about it, but not super rigorously. The first place that comes up for me is when trying to think about the security of crosslink, asking yourself if an attacker has both of these kinds of resources, can they do something surprising by combining those resources and I haven't noticed anything yet, but that's not necessarily any guarantee. So that's something we want to dig into.

[00:59:57.11] 

But then I think your question is going even further assuming it's secure in the sense of the micro view of how things run in the present moment or in the ongoing case. What about centralization and economic effects and that second order stuff? I think that stuff is super hard to predict anything about, and different people have different intuitions.

[01:00:41.43] 

So that is something we should be thinking more about. Just so far, in thinking about it, it seems to me like if you had so many resources and you split it between mining mining and staking. It doesn't necessarily seem like it would give you an economic advantage versus just staking or just mining to me, but I have to think about it a lot more. And also it would be interesting to figure out if we can find other people who have thought about this issue before.

[01:01:27.10] 

Again, another thing we could do is look at history or metrics about what happened on Ethereum. 

[01:01:46.08] - **Daira Emma**

So two things. Presumably part of the motivation of moving to proof of stake is that it's possible to have more validators, more independent validators or independently-controlled validators, than there are mining pools. Because, I mean, to put it bluntly, and this also probably applies to Bitcoin as well, proof of work because of mining pools, is a lot less decentralized than the original goals of the Bitcoin whitepaper we're aiming for.

[01:02:36.34] - **Kris**

One way potentially to get some of that decentralization back is to support a wide range of validators. So if we're saying that it will be unfortunate in my view, if the validators ended up just being the same organizations as the mining pools, because that is not decentralization. The other thing is that we don't have to have a 50/50 split.

[01:03:05.37]

So what I was originally thinking was the disadvantage of having, let's say, an 80/20 split. Proof of work, 80%, and staking towards 20%. So the problem with uneven splits like that was that the protocol that gets less funding is potentially not secure enough to make any difference. And so you're in practice completely dependent on the other protocol. But using the idea that I mentioned before, where you can do things more incrementally, so you're completely depending on the finalization point to start with, that could make it safer to start with an uneven distribution.

[01:04:18.08] - **Zooko**

Two things. One, we were talking about safety against users losing money versus liveness. And while we're talking about that Andrew Arnott posted in the text chat saying he talked to a user who lost money due to a rollback recently. So that's interesting. Check it out. Talk to Andrew, I guess.

[01:04:39.25] 

But the main thing I wanted to say was, Hey, Josh, did that discussion of safety address your question about economics? Or if not, what is your question?

[01:04:54.06] - **Josh**

Somewhat. I think I'm understanding the balance of the trade offs of liveness and safety is good. I'm wondering, what is the price point that proof of work miners drop off? And we lower the hash because at some point, if the coin, it's reasonable to assume that the network is secure today based on the current coin price or down to 18 bucks or whatever it's been. We saw a significant hashrate drop.

[01:05:42.50] 

Does that also consolidate or further centralize power where we've seen, ViaBTC has a ~60% of the hash rate today. What is a reasonable yield for proof of stake to get people to participate? Those are just questions I have. I don't know if there's answers for, but is it something that we're looking at or something you guys are going to be looking at?

[01:06:13.18] - **Daira Emma**

It's a good point that we can use past reductions in price to assess whether we think that the proof of work part was secure at that point.

[01:06:28.22] - **Dodger**

So it's entirely It's entirely possible that the price floor isn't caused by miners dropping off. It's caused by miners deciding to hold on to their coins instead of selling them. So it could be that they'll continue mining even if the price is too low. But instead of selling those coins, they'll just hang on to them until the price rises.

[01:07:00.35] - **Nate**

Sorry, just a little bit more on economic modelling. I have sketched out a super simplistic model with a bunch of unrealistic simplifying assumptions that try has to predict if there's this much issuance for proof of state, how much ZEC should you expect to be staked? But I have no idea how useful it is. But I would like to flush it out just as a way to start thinking about those issues.

[01:07:41.42] - **Pacu**

I think Zooko has captured this on his Google doc on desired requirements. But I see that this proof of stake could be a possibility of making, not doing any better job, but bringing or attracting new people, bring back people that left that had GPU miners. Currently, for example, I really like what Yasser from ECC holds together, and Emersonian as well from Zec.Rocks has his own stack utilities where it can be fairly straightforward to put up some Zcash infrastructure in the cloud so that we can create fairly not complex... So it's simple because the cloud is always a bit complicated.

[01:08:58.40] 

But the fairly not complex steps or tutorials or documentation that helps people to spin up this validator, this infrastructure that can help us to have a different faces in both sides of the counter, on the staking window and the mining window, if there was an administrative office of the protocol. So If you're a miner, you will be a different person than a staker because maybe it has different incentives or maybe the staking mechanism is more help to foster diversity and brings interest in different kinds of actors that we're currently not a very appealing protocol for them.

[01:09:56.36] 

I guess that's also a dynamic that could be a way that help us avoiding this. People with two masks, people disguised as miners and sneakers, depending on whatever is the mask for them, what they're getting or maybe the people And I think that maybe it could be a good idea to figure out if there's a way to have more popular or average people friendly staking mechanism in terms of cost.

[01:10:37.03] - **Daira Emma**

Yeah. So we talked a lot about crosslink, but we haven't talked about the staking mechanism and in particular, delegation. And I think actually, whether Delegation can be done privately is an important question here. So if penumbra number does allow that, it's certainly It's certainly possible.

[01:11:01.50] 

The other thing I wanted to say was, have we considered hiring an economist? Because it sounds like we're trying to answer economic questions without the benefit of anyone who is trained in that field. I know economics has been called the dismal science, but that doesn't mean that everyone who studies it doesn't know what they're talking about. I did suggest that we hire an economist before leading up to the Zcash launch, but that was never taken up.

[01:11:41.19] - **Zooko**

Based on past experience, if you're going to hire an economist, it depends on how specific your questions are, how useful the answers are if that makes sense.

[01:12:15.51] 

So the open comment period on Crosslink requirements with the GitHub link that is soon to come, that would be a good place to hone in on the specific questions we have.

[01:12:29.13] - **Daira Emma**

It shouldn't be Crosslink requirements because there's also requirements on the staking design.




___

### 5 Open Discussion - ZCG processes 


[01:13:35.57] - **Pacu**

Last week, we were talking about Zcash Community Grants, grantees and side effects of developments, specifically we were talking about grants that maybe are development heavy, but they have this side effect of spinning up their own forks of different pieces of the Zcash tooling. We were thinking about on getting feedback from everyone here on how we could better maybe structure requirements for ZCG grantees so that they know that there's going to be more incentives for them to actually do development but contribute upstream, and maybe in a positive way, instead of being persuasive for them not to do it.

[01:15:15.53] 

This came up because on this conversation we were having between ECC people and chainsafe on their in-memory wallet development, there was this question on, hey, we're doing all this work on contributing to upstream, but it was not really on our brand. -

[01:16:17.38] - **Daira Emma**

We got most of what you said. Yeah, basically about there needing to be some clarity on what is actually included in a grant and so whether incidental upstream improvements are included. I think NYM also ran into this issue.  I guess that's feedback for this,

[01:16:51.54] - **Pacu**

Because something that It was a valid criticism that Kris gave is that it's awesome to have this contributions. But if the results or development, if the result is a dangling fork of a library that someone has maintains then with time, it becomes to be less and less comfortable to put it in a way.

[01:17:28.33] 

That's why it's my concern to have feedback from the developer community that is developing tools to actually maybe better structure the ZCG process to have more fruitful contributions and more code flowing upstream and less dangling.

[01:17:59.08] - **Daira Emma**

Yeah. Sometimes it's not even clear whether a branch is intended to be included or whether it was for prototyping.

[01:18:15.20] - **Pacu**

How do you consider a dangling fork of librustzcash, for example? Do you think that it's something of neutral value or positive value or negative value in the mid-term, long-term?

[01:18:46.46] - **Daira Emma**

If it's not a PR, it might as well not exist because we don't go through forks that are not in PRs and look at them at all. If it is a PR, then we might still need to have our attention drawn to it. Otherwise, it might fall through the cracks. Developers are busy, and I know this probably applies to the ZF developers as well.

[01:19:17.28] - **Pili**

I think from the ZF side, if people want us to be a PR, they should. Normally, we do check. I don't think we have as many PRs as there are in librustzcash and all the other ECC projects.

[01:19:30.06] - **Daira Emma**

There's a bunch of PRs against zcashd that are never going to be merged. And I feel bad for the people who did on those. Sorry, Str4d, because it applies to some of our own developers as well. But that's the way it is at the moment and hopefully we can avoid that, or certainly avoid it getting That's not that bad for librustzcash.

[01:20:03.34] - **Pili**

I think a heads-up is always nice. If you are going to submit a PR, reach out to the team and let them know that you actually want. It is the intention for it to be marriage upstream and open up a conversation with them rather than just randomly putting PRs out there, right?

[01:20:19.52] - **Daira Emma**

Yeah. I mean, actually for librustzcash and for the repos that have a lot of development on it, it's not so bad. But if you put a PR up on one of the ancillary repos that are dependencies, then a heads up is definitely important in that case. 

[01:20:43.28] - **Dodger**

I think maybe if a grant is expected or likely to involve changes to a piece of software that is maintained by somebody else within the ecosystem, then a prerequisite maybe during the process of evaluating the grants, maybe there should be a conversation to say, Right, we want to make these changes to librustzcash or to Zebra, whatever it happens to be. Are those changes acceptable? Does there need to be an audit? Stuff like that.

[01:21:28.43] 

Because I think in the past, grants have been approved that hadn't been perhaps closely examined and there was an assumption in the grant that there would be some support or some work carried out by other third parties that they had never agreed to. So, maybe going forward, it's just something that the committee just needs to be aware of.

[01:22:00.17] - **Jason McGee**

So we talked about this at the last ZCG meeting, and going forward, we're going to include that as part of the application process. So it's part of our review, and I think that will help. But I do want to say in this instance, chainsafe said, they expected some work to be done in librustzcash, but they didn't expect it to be as significant as it was. It sounds like they want to apply for another small grant cover the work needed.

[01:22:33.43] - **Daira Emma**

Yeah. So in the Nym case, I think they ended up doing a lot of work that wasn't very explicit in the grant. And we'll be able to use some of that, but not all of it because some of it is in Go and the Go implementation of lightwalletd is being replaced with They know in the medium term. People can end up doing interesting work that is useful for prototyping, but is not directly covered by the grant. And if that happens too often, then presumably, they'll get the discouraged from applying for grants. So I'm glad to hear that the process is going to be tightened up a little bit, though.

[01:23:38.18] - **Pacu**

Yeah, I brought up the chainsafe because it was the most reason, but they And I've been also super, going extra many miles to contribute upstream because they're super committed to the project and to Zcash. But there are also cases where I've seen like the ledger grant has a lot of dangling forks, for example & something that I've been checking in some grants that I've seen in the gallery is that maybe what something that grantees do is they put this possibility of my work not being merged as a risk of the project. So it might signal that we, as a Zcash developers might also have to maybe adjust a bit our processes to not that be perceived as a risk per se.

[01:24:54.29] - **Daira Emma**

Yeah, the problem has always been the very high quality standards that we insist on and have to insist on. Yes. And merging messy code can sometimes be a serious problem.

[01:25:11.56] - **Pacu**

Yeah, I totally agree with that.

[01:25:16.59] - **Pili**

Thank you for raising that part to those. Very interesting. I think grantees shouldn't assume that developers are also reading all of these. And I think we are now getting into this process where a ZCG will reach out if there is something that requires input. And I think that's been working great. So that will do things a lot.

[01:25:54.44] - **Kris**

Since the last Arborist call. Just call everyone's attention to the post on the forum for the [NU7 ZIP deadlines](https://forum.zcashcommunity.com/t/important-deadline-for-zips-that-want-to-be-activated-in-nu7/48998/11) and the potential timeline there. Essentially, zips must be semantically stable and in pull request by November 5th  for any chance for them to be included in NU7.

[01:26:29.47] - **Jason McGee**

So Nate and I can reach out to you and set up a call early next week to go through those NSM ZIPs.

[01:26:40.52] - **Kris**

Yes.

[01:26:47.23] - **Pili**

Let's leave it there then. Thank you to everyone for participating today and for the great discussions. The next Arborist call will be Halloween themed, it seems, on the 31st of October at 21:00 UTC. Clocks were in that time of the year are clocks changing, double check.



____


**Next Meeting Scheduled: 21:00 UTC October 31st 2024**


___
___
