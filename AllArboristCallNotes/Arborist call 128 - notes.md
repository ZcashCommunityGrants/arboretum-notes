## Arborist Call 128 Notes 

Meeting Date/Time: 23rd July 2026. 15:00 UTC

Meeting Duration: 33 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [ironwood](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update---ironwood)

Research & Implementation Updates - [zcashd, zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zcashd-core-libraries-zallet) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-nsm) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-zodl-crosslink--trailing-finality-layer) / [dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs---dynamic-fee)  

Video of the meeting: [recorded](https://www.youtube.com/watch?v=mHpMkEk6GGI&sttick=0)

Moderator: Alex

Notes: chidi @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:01:16  

So we'll give everybody  a few more minutes to join.  Okay, just one couple more minutes. We'll get started. All right. I guess there's enough people to get rolling here. So arborist calls are scheduled in the UTC time zone. It's going to start right now, and all arborist calls now start at this time.  This meeting will be recorded, so if you're not into that, please turn off your camera or leave the call. 

So Zcash Arborist call today is July 23 2026 Our agenda today is core stack updates with Zcash Foundation Zebra, Zodl with Ironwood, Zodl with Zcash D core libraries in Zallet, CLI Wallet, Zingo Labs with Zaino and Pacu with Zcash D deprecation, research and implementation updates qedit with ZSAs Shielded Labs with network sustainability mechanism, Shielded Labs and Zodl with Crosslink Trailing Finality layer and shielded labs with dynamic fees, and then open announcements and discussion. So, what are Arborist calls? They're biweekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process, protocol R and D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. Purpose is to make Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development can register at zcasharborist.org. If you want to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Then other ways to get involved: Zcash Community Grants (ZCG) ,Zcash R and D Discord, and the Zcash Community Forum. And these links are listed on Zcash arborist.org. So let's get started with core stack updates from Zcash Foundation.

## Zebra Update 

Marek: 00:04:21  

Hey, folks. So the headline is that zcashD is no more, and Ironwood activates on mainnet on Monday. Zebra had five releases since the last call. The latest one was yesterday. The first one was a release candidate that activated Ironwood on testnet. The second one was version 6.0.0 with full support for Ironwood on mainnet, and that release also shipped an optimization for miners, where the get block template RPC now caches the Coinbase transaction for short polled calls as well. To do that for long polling only, but noticed that miners call the GBT RPC quite often, like every half a second, and that's why we we cache the the shielded Coinbase for that as well because it it takes like six seconds to compute the proofs for for the shielded Coinbase transaction. Then the third release was security release, and the fourth one shipped Zcashd behind Zebra D, and the last one, the fifth one  from yesterday, was another security release. Another update is that we now shipped reproducible signed binaries and images, and internally for CI we dropped Windows and macOS tests  which moves Zebra to tier 3 support for these platforms, but that doesn't mean you can't run Zebra on these platforms. It's just that we don't run the full test suit there, and you can still run zebrad in Docker on on Windows or Mac. And then we bumped the minimum supported Rust version to 1.88 and that's all.

Alex: 00:07:26  

Any questions for Marek?

Mark: 00:07:29  

Yeah, I just wanted to raise an issue that I submitted yesterday. I'm going to put a link in there. It's 11061 where the zebra node was keeping connections around that had services equal zero or the node network unset, so it was trying to get blocks from peers that  weren't serving blocks, and it would hold those peers in the queue and it would stall. I saw another issue with this. I believe a lot of those nodes are Zakura release candidate nodes. They've since fixed this issue in 3.0.0 but I have a patch that rejects those. But I'm not sure if that's the right path forward. So, if somebody could just take a look at that issue and provide some fun feedback or discussion there. That would be helpful.

Marek: 00:08:25  

Yeah, awesome. Thank you. This is great. 

Mark: 00:08:29  

no problem. Yep.

Alex: 00:08:31  

Yeah. Thanks, Mark. Any other questions for Marek? Great. Thanks, Mark. Up next, Zodl with Ironwood. right,

## Zodl Update - Ironwood

Pacu: 00:08:44  

that will be me. So, just Ironwood updates, or in general,

Alex: 00:08:53  

start with Ironwood, 

Pacu: 00:08:55  

okay. So, in terms of Ironwood,  we are working on cutting Librustzcash crates with all the the needed changes. People needing to integrate to the latest code can use Librustzcash main at this moment.  Also we finished support for we're wrapping up and finishing support for note locking, which is one of the backbones of the Ironwood migration with privacy workflow, and also  it will help locking orchard notes of like small denomination notes that are like leftovers of little leftovers of Zec in your orchard balance that you might want to maybe not migrate them at this very same moment. Like we are speaking of, like 0.00005 for example, something that is not a marginal fee, a little bit more, but not a significant amount.  like those amounts are really what eavesdroppers would actually try to make use of  to figure balances if they want to do any analysis. So we are actually implementing this lock mechanism so users and app developers have the tools to actually like hold on to those little notes, and then choose when to migrate them or not migrate them at all. So these are like the last edge cases on the Ironwood migration, and we are there's a light client working group call following this call at  17 UTC, where developers can attend to actually discuss or have any inquiries and or questions about a wallet things on Ironwood. What else? And yeah, we are. are hoping to get crate releases soon tomorrow  and then SDK releases as well following up, like Friday or Saturday, and those will be fully supporting Ironwood,  and then app releases will follow up with the migration flows for Keystone. In  the case of Zodl, like for Keystone  and just regular seed phrase like hot  wallets, and with both paths like direct immediate migration and migrate with privacy, both flows that we we presented in the light client  working group, and I think that we've shared in social media as well.  There's so much going on. May I might have missed something.

Alex: 00:12:37  

Yeah, any questions for Pacu on Ironwood? ok, going to  Zodl for Zcashd core libraries in Zallet.

## Core stack Updates zcashD Core libraries, Zallet

Pacu: 00:12:47  

Okay, good. So Zcash D, press F for respect. Thank you for much, so much for everything. So at this moment, let me grab the numbers.  61% of the organizations we are in touch with at Zodll are reporting that they have migrated. Then others, the 20 something percent remaining had originally communicated that they were going to update, but they haven't like to respond if they had. We assume that since they hadn't, they haven't like reported any errors or outages that they have migrated, they just haven't responded to our follow up questions. We are following up every day with them, and also like Zf is releasing software, Valar Group is releasing software, so we're constantly spamming them a little bit. Yeah, outreach is a little bit humble for the volume of messages that we're sending to them, but we have good communication. And then 100% of the mining power, or really a number really close to 100%  has moved already to the new software in all of all of its forms. Huge congratulations to Valar Group and zcash Foundation for accommodating this wrapper approach, which was pretty  successful. Also thanks to Shielded Labs , also a huge partner with their stack approach. Thank you, Mark for being there in the battlefield till long hours with this huge partner, and yeah, everything went pretty fine. We hadn't been reported a lot like huge disruptions on the ecosystem, so we're really  happy about that, and we're still  monitoring the situation, reaching out like one by one to see how things are going and and we're getting some reports of some hiccups regarding questions because this is like maybe the the first time they they have been using zebra instead of zcashd, but everything is working really well. So congratulations to everyone. So in terms of Zallet our last release is Beta One 1.00 Beta One. Since we are prioritizing Ironwood and user-facing software, meaning like all the Librustzcash work that needs to be consumed by Shielded wallets, we are prioritizing users for now. The minor scenarios are pretty covered, and we are not actively working on automated migrations or anything like that for them yet. Miners  if they hold any orchard balance, they can actually send their balance  they will be able to send their balance to Ironwood in  simple transactions, like sending funds to their orchard receiver, and then that will automatically choose the best pool, which is Ironwood in this case. And after like on july 28 when Nu 6.3 activates, and that's how they can actually move any orchard balances they have after shielding  their coin bases  to do payout distributions. miners have communicated to us what they do to us. I mean, like foundation and Zodl and other people that are on those chats is that they shield ttheir coin bases and then all of their payouts  are done transparently for traceability and auditability, so they deshield and do payouts  to their pool people, the people that is pulling in. So  that use case is covered, and we haven't been reported any issues. And then the people that are not using Zallet, they're using the corresponding zcash D wrappers. So  no block is being mined with zcash D, which is the most important thing. These wrappers only connect to a Zebra node  and they do not connect  to the network directly. So we are in good shape to be a zebra only network if we are not already.

Pacu: 00:18:36  

Like until July 28 there might be people that they're running their own zcashd forks, and they might extend  the end of life by changing the constant. But then on july 28  they will fall out of consensus, so  that won't be something they'll be able to do easily. So that's pretty much it on our side. Any questions? Let us know. Anything that you think that we are missing? Just please ping us. There's a lot of movement right now, but we'll make it.

Nate: 00:19:20  

my question was, so just for context at Shielded Labs I have not been working very directly on this massive ironwood process, which is critical, and I'm very very grateful for everyone. So I don't have a whole lot of context, but one thing I'm curious about is what I can monitor for around that end of life date that might indicate issues early. Like I know there's a dashboard of Light Wallet server responsiveness, and I noticed the Zcash D domain name Light Wallet server has stopped responding. So, are there other like dashboards or things to be vigilant about generally? For yeah,

Pacu: 00:20:13  

I think that the best resources are fortunately community led. That's a huge improvement. Back in the day, like orgs used to have their own dashboards and graphanas and all that, and now, like we, for example, I mostly use the public resources that are around, like CipherScan and ZcashInfo.com, ZcashInfo.com. is I think maintained by Foundry, and it has a lot of information about pool like mining pool statistics and and and then you have Cipher Scan, which has mainnet, testnet, Crosslink, and then fort monitoring, like peer statistics. So there's a lot of of information there in those two public resources, which is awesome.

Alex: 00:21:18  

Great. Any other questions for Pacu? Yeah! Huge congratulations to everybody involved. I mean, I know  the hours people are working are significant. The efforts that have gone into these changes and updates are significant, and it's so awesome to see so much communication coordination.

Pacu: 00:21:41  

There's a lot of work that is not that visible, but it's the most important one, which is the formal verification work, which  Daira Emma and Tal and Sean Bowe from Tachyon are working on behind the scenes.  more like library mice kind of work, like silent and very meticulous work they're doing. and  that's basically what holds the ironwood pool strength. So congratulations to them as well because they've been working a lot and less visibility, but still a lot of work being done.

Alex: 00:22:32  

Cool. Yeah, Pacu, if you could share those two resources too, CipherScan and the oh yeah Explorer, that'd be great. And I second both of those. We've used them extensively. They're fantastic. Great, Zingo Labs with Zaino. Do you have anybody from Zaino here today? All right, we'll move on and come back. Zcash D deprecation updates. I think we just did that, Pacu. You have anything? Yeah, sure. I

## zcashd deprecation updates zodl,zf zingo labs pacu

Pacu: 00:23:08  

I guess this is the last one. Yes, so everything went fine, and yeah, thank you  to everyone for all the work, the foundation for building this awesome node, and yeah let's pay our respects to this old fellow  that is like leading us, and you know, welcome this new era of memory safety and I hope like for paced development as well.

Alex: 00:23:43  

I look forward to deleting this slide. That will be.

Pacu: 00:23:45  

Oh, we actually archived the zcashd repository a few days ago. So it's a huge milestone. Now, if you go to the zcashd repository on GitHub, it will say that it's archived.

Alex: 00:23:59  

Awesome. All right, thanks, pacu. Next is qedit with Zcash Shielded Assets. Do we have anybody from qedit here today? Okay, moving on. Shielded Labs with network sustainability mechanism.

## Research & Implementation Updates, Shielded labs-Nsm

Judah: 00:24:22  

Yeah, I can give a super quick update on that. So with the the Ironwood implementation sort of shaking things up, some of the changes for Zip 235 and Zip 234 sort of got moved around or removed from the current Zebra codebase, and so I need to just do a quick sync with yeah Merrick and the others at Zcash Foundation just to see, hey, how do we want to reincorporate the NSM into you know post Ironwood implementation zebra, and so yeah, I'm going to try to get those conversations happening either this week or next week, and yeah, get back to getting that implemented and getting ready for Nu 7, or what  whatever the the future name of it would be, but yeah, that's the the current update.

Alex: 00:25:11  

Any questions for Judah on NSM? Cool, thanks, Judah. Then Shielded Labs and Zodl with Crosslink.

## Research & Implementation Updates- Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:25:25  

Yes, hello. Okay, so Crosslink is in its own little development bubble, and you know, with Ironwood,  shielded Labs has prioritized that. let me actually look at my notes here. I'm a little bit tired. So since I'm not sure if we mentioned this since the last Arborist update, but we had released a tool to help users coordinate a hard fork to slash finalizers, and so this is yeah, it's a it's something users could always do, right? Users can always coordinate to hard fork a crypto like a blockchain, but we thought that providing a tool with like specific features and contours for this one specific case, which is a an important case in proof of stake, to sort of bolster the game theory behind  mitigating attacks, we thought it would be helpful to make a tool so we devs don't decide how the tool is used. We just make it possible if users want to use it to coordinate, and also having the tool helps them understand what it actually does ahead of time before you ever need it, so it's sort of like a, you know, the in case of emergency break glass displays. So we released that, and the current users of the feature net were able to use it and slashed some unresponsive finalizers. So BFT resumed, and that was pretty cool because it did not require any network. It did not require us to like reset the network or do a specific release to implement the the change. Instead, it was just sort of like this tool being used. So it was kind of an example, a first example in my understanding in Zcash history of a kind of a dynamic hard fork. Whereas all of our network upgrades, I think of as kind of static. They're planned way ahead of time. We know the, you know, deprecation heights and things like that, or the end of support halts timings and things like that. So we do a lot of static preparation to keep those safe, and this was more dynamic. But again, it was just one case on a testnet, so it was cool that it worked. So since then, we have been grappling with low capacity due to ironwood, and also a conference that some of our devs are at, and then we've been working on just improving stability and resilience and bug fixes. So there's been a bit, and we've been doing many releases. So season two, we've done nine releases so far, and we're about to do a 10th, so the pace the last few weeks has been around one a week. So that gives you an idea of the kind of rapid development style and process we're in right now. So the upcoming release fixes various bugs. So there's like an improvement to sync performance, an improvement to networking reliability. There is an out of memory issue that we have a plausible fix for that that we're going to deploy and see how that works out on the feature net, and then we're continually improving like observability and logging for users and us to have more you know ever clearer pictures of what's going on on the network, and then with Ironwood and our low capacity, we have decided to postpone a workshop. So we had planned it for this week, and we have postponed it to the end of August, which is also when we'll be doing a company all hands, and so part of our all hands will be the workshop and that milestone. And then, meanwhile  we're sort of focused on improving and revamping the project management. So next week, when we're all like back in house, we have a few big chunky items in terms of sequencing milestones. Some important decisions to make, including a trade off between addressing bugs that we have in the current network season versus a backlog of consensus changes we want to make that we're just going to do with a network restart, so that we don't have backwards compatibility complexity. But then we also want to be able to synchronize with the mainnet nodes, and there's more and more mainnet node development, which is awesome.

Nate: 00:31:20  

More and more features, patches, and so forth, and we're making sure that, like for example, our cross-link work does not interfere with the other work at Shielded Labs on nodes, such as our zero initiative and also the other public changes, and so the big obvious thing there that we want to merge is Ironwood, and we need to decide how we're going to sequence that along with the other consensus changes that we want to do that are specific to CrossLink, and then we also want to improve tracking because right now we have I think we have a gap between our top level roadmap versus I would like to provide more visibility into the upcoming milestones that sort of has the funnel from the very certain imminent milestones to the further out, less defined milestones that are still being refined. Let's see. Oh, that reminds me. I've been playing with Dagme, so we might start using that. Still working on that and anything else. Yeah, I think that's it for Crosslink.

Alex: 00:32:49  

Any questions for Nate? Great. And then Shield Labs with dynamic fees.

## Research & Implementation Updates, shielded labs - Dynamic fee

Mark: 00:33:07  

Yes, the get standard fee RPC endpoint was merged in and released with Zebra. So thank you, Zebra folks, for doing that and indulging me in that, all that endpoint does right now is return the ZIP 317 standard fee of 5000 Zats with a version field, and then the plan is to increment that version field with an actual fee estimator that we ship some point soon. We have two wallets now showing a priority fee lane, which is Nosy and Noir, and we have I guess commitments from 7 other wallets to do the priority lane. The next step would be getting them to honor the get standard fee RPC endpoint, and that sort of wires in all the architecture that we would need to start shipping an actual market. The wallet work has obviously been put on the back burner because of Ironwood, and our main priority right now is to make sure that the wallets are safe and secure and still usable during the the migration process. I'm going to try to attend the LCWG call today. Beyond that, yeah, that's where dynamic fees is at.

Alex: 00:34:43  

Any questions for Mark? Thank you, Mark. Any open announcements? Please raise your hand. Yeah. Anything for open discussion? If you do, please raise your hand. Wow, efficient call today. Going once, going twice. Well, thank you. Next Arborist call is August 6, the same time as this call. Thank you all very much for attending, and talk soon.

Next Meeting Scheduled: 6th August 2026. 15:00 UTC

