## Arborist Call 129 Notes 

Meeting Date/Time: 6th Aug, 2026. 15:00 UTC

Meeting Duration: 15 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [ironwood](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update---ironwood)

Research & Implementation Updates - [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-nsm)/ [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-zodl-crosslink-tfl) / [Dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-dynamic-fee) 

Open Announcements 

Open Discussion 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=T93KAOy7GJs)

Moderator:Pili

Notes:chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:02:01  

Welcome to today's arborist call on the 6th of August, and here is the agenda for today's meeting. We will start off with some updates from the teams working on the core zcash stack, such as the zash Foundation, zodl, and zingo Labs, and then we will follow this up with some updates from teams working on research and implementation of new features such as qedit and Shielded labs. Finally, we will open the floor to participants if they want to make an announcement or they want to bring a discussion topic that may be of interest to the attendees. So, what is the Arborist call? The Arborist call is a biweekly call where zcash protocol contributors meetup to discuss upgrade timelines and processes, protocol research and development efforts, design and implementation of new protocol features, and we try to identify blockers and unresolved issues. And the purpose of this call is to try to make zcash protocol development accessible to interested parties and to provide more transparency for everyone. Anyone can register to attend at zcasharborist.org, and if you want to become more involved and present, you can email us arboristcall@zfnd.org and request a presentation slot. Outside of the arborist, you can participate in the zcash community in a number of ways, such as applying for a zcash community grant, or you can take part in community discussions in the zcash R &D Discord or the zcash Community Forum, and there are clickable links for all of these at zcasharborist.org. So, whoops. With all that said, let's start off with the Zebra update from Arya today. Take it away, Arya.

## Zebra Update 

Arya: 00:01:41  

Thank you Pili. So, in Zebra, since the last arborist call, we've had three patch releases in a couple of weeks, which is quite frequent for us. Largely exercising the release police pipeline and hardening it as we want. We shipped a bunch of consensus fixes, including banning peers that send invalid shielded proofs, checking ZIP 317 before doing any expensive verification, clearing rejected hashes before known block checks. We split the transaction verifier into the block verifier and mempool verifier, so that now there are two different tower services depending on whether the transaction is in a block or not, we are validating the total amount when updating value balances. We are working on better misbehavior score for blocks with duplicate transactions, and in the network, we are removing all address book entries now for banned IPs, canoculizing inbound addresses when accepting a connection, rejecting outbound to non-serving peers. Keep dialing until the outbound limit is reached. So at every crawl interval, it'll try to make as many connections as we have candidates. Get address now returns half of the addresses in the address book for Zebra instead of a third. The Zec.rocks DNS seeder were added, and we have connection lifecycle metrics now. In the RPCs, we've exposed the end of support height, consistent chain state snapshots across get block header and get transaction out. The NU 6  metadata fix for NU 6.1 plus two slot Coinbase cache, which was fixed for our get block template, gRPC streaming keep alive limits on the indexer, and I think that's essentially it. Aside from what's in Flight or something.

Pili: 00:03:35  

Great, thank you, Arya. Any questions for Arya today? Okay, let's move on. I'm happy to hear zodl updates on Ironwood. I don't know if there's anything else we still need to say on ironwood, but I will let. I guess it's Pacu from zodl. Yeah, give some examples.

## Zodl Update - Ironwood

Pacu: 00:04:09  

Yes. In terms of ironwood specifically, We've been doing a bunch of releases for like Wallet D 0.50 was the Ironwood compatible, and then we had follow up releases 5.1 and 5.2 That contained several fixes, and we articulated with the two major providers, Zec rocks and Stardust to update to that version. Then. Well, maintenance to the Ironwood migration dashboard, then releases on the Rust crates that support Ironwood, the zcash protocol 0. 10 primitives, 0. 29 zcash Client Backend 0.23, etc. And then we continue to work on the migration for zodl and  the underlying crate that actually provides all the  machinery to work to do the migration with privacy, the workflow that we presented some weeks ago in the client working group and yeah that's what we have been working on like specifically on ironwood, besides wrapping up Zip work in the Zip editors meeting, that it's like many orgs are there, not only zodl and yeah, I think  that's pretty much it on that on that front. We're really happy that there's a lot of people moving to ironwood. It's pretty popular, and  it's really nice to just see that dashboard all the time, and you know see Zec moving. Also, if you haven't watched the CipherScan data, that's pretty cool too. I I encourage everyone to check it out.

Pili: 00:06:33  

Yeah, that's a nice one for sure. Any questions for Pacu or anyone else here on Ironwood? Okay, let's move on to core libraries and zallet. Pacu, is there anything that wasn't covered in your?

## Core stack Updates zodl Core libraries and Zallet (cli wallet)

Pacu: 00:07:08  

yeah, I didn't say anything about zallet. We released Beta 2, and we are working towards cutting another beta in the next few days. The audit went pretty well, and we are in communication with the auditors, and we already delivered fixes for their findings. Nothing critical, fortunately, and so we're trying to to split between the migration work and Zallet, and so those are the the updates for Zallet right now, we got a few contributions  from miners testing zallet. Thank you very much to Oleg from I think Cryptex who sent us a pull request, and people from two miners that are great collaborators and helping us with a really detailed conversation about their use cases  and we're using that  feedback to make Zallet better for everyone.

Pili: 00:08:40  

That's great. Oh, thank you, Pacu anything else you want to share, or any questions for Pacu? Okay, let's move on. I don't see anyone from zingo Labs here, so we might move on. But if you are here from zingo Labs and you want to give an update, please raise your hand. Yeah, I don't really see anyone. Okay,  let's move on. We can always come back at the end if we have time and if someone joins. Next up, research and implementation update. qedit, but I also don't see anyone from qedit. So let's move on. Shielded labs on network sustainability mechanism.

## Research & Implementation Updates- shielded labs Nsm

Jason: 00:09:41  

No update from us on the NSM this week. Thank you.

Pili: 00:09:46  

Crosslink. Any update on that?

## Research & Implementation Updates- shielded labs, zodl: Crosslink (TFL)

Nate: 00:09:57  

Yeah. Sorry, I was hunting for my unmute button. Okay, so we are continuing to do releases about one a week to improve syncing reliability and performance, and so we've just released season 2v 11. over the weekend, or at the end of last week, and it seems like you know we are making progress on improving performance. We are preparing for a workshop coming up on August 26, and our plan through that workshop is just to continue improving performance and reliability of the current version of the network protocol, and also to begin implementing a backlog of consensus changes for a new version of the network. Oh, it's also been a while since the last Arborist update, so I can't recall if I already shared that we previously released a tool for users to slash validators, and the users did that to remove some absent validators who had been absent for a long time. So BFT did resume, so that functionality appears to be working well, and mainly we're working on syncing reliability. Yeah. So come to the workshop in two or three weeks. Three weeks.

Pili: 00:11:56  

Oh, thank you, Nate. Any questions for Nate? Okay, let's move on. Dynamic fees. Any update on dynamic fees?

## Research & Implementation Updates- shielded labs Dynamic fee

Mark: 00:12:16  

So I basically put dynamic fees on a little hiatus because of Ironwood, but this is going to pick back up again, and that's going to mean reaching out to wallets and see if they want to implement the priority lane, and then also working on the fee estimation endpoint, the median based fee estimation that we originally proposed last year, I guess. Now at this point, and moving forward there. So that's short and sweet. But yeah, the gear should start turning again here after now that Ironwood is ready.

Pili: 00:12:54  

Thank you, Mark. Questions for Mark? I think this is going to be a very quick arborist call. Announcements from anyone? Please raise your hand. Okay, discussion items. I guess not. Thank you everyone.

Next Meeting Scheduled: 20th August 2026, 15:00 UTC
