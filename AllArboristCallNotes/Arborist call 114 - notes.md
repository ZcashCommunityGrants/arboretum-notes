## Arborist Call 114 Notes 

Meeting Date/Time: November 13th 2025, 15:00 UTC

Meeting Duration: 40 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [Nu 6.1 activation, Prs](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [zallet, Refactoring](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates  [zcashd depecation, zallet contributor board](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-ecczfzingo-labs--pacu)/ [Zsa, orchard, swaps](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets) / [Nsm,Zips, new engineers](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-shielded-labs--nsm) / [Crosslink, milestone 4b, workshop](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labsecc-crosslink-trailing-finality-layer)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=ksuYg_kmalE)

Moderator: Pili

Notes: [Chidi](https://x.com/ZcashNigeria) 

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:01:25

Okay, there we go. So, let's get started because we're already late. Most people have joined. Yes, this call is recorded.  turn off your camera if you're not comfortable with that.

This is the Arborist Call for November 13th. Welcome, everyone. Here is the agenda for today: Updates from the core teams, starting with the Zcash Foundation on Zebra.

Then the Electric Coin Company on zcashd and the core libraries, Then Zingo Labs with Zaino and finally, Zcash deprecation updates after that we will have research and implementation updates,QEDIT on ZSAs, Shielded Labs on the Network Sustainability Mechanism, Shielded Labs and the Electric Coin Company on Crosslink

After those sections, we will have time for announcements or any additional discussion items. Arborist Calls are biweekly meetings where Zcash protocol contributors discuss upgrade timelines, ongoing protocol R&D, and the implementation of new features. We also work to identify blockers and unresolved issues. The goal is to make Zcash development transparent and accessible to the wider community, and to encourage participation. Anyone can join.If you are interested, you can register at zcasharborist.org to receive the meeting details.

If you want to suggest a topic or present something relevant to Zcash protocol development, you can email arboristcall@zfnd.org and request a slot. Other ways to get involved include applying for grants via zcashcommunitygrants.org, joining the Zcash R&D Discord, or participating in the Zcash Community Forum. The links are available at zcasharborist.org. So with that, let's start with the core stack updates from the Zcash Foundation and the Zebra team. Marek, is that you today

## Zebra Update 

Marek: 00:03:59

So regarding Zebra, we’re in the process of releasing version 3 right now. In terms of what we merged since the last Arborist call, We merged the PR implementing ZIP 233 from Shielded Labs, which had been open for quite some time. We also merged a number of updates and fixes to the zebra RPCs so we can get closer to the deprecation milestone.

And we made several quick fixes for Dockerfile builds.That’s everything I had on my list.Huge thank you to everyone who contributed, a lot of the PRs came from external contributors.If you’re speaking pili  I can’t hear you.

Pili: 00:05:35

Oh, sorry , that’s why everyone was so quiet. Thank you, Marek Any questions for Marek? I also want to add that we are going to be releasing Zebra 3.0.0 stable release in the next few days, ready for NU6.1 activation the week after next, hopefully. Next up, the updates from the Electric Coin Company.Who do we have speaking today?

## ECC Update 

Kris: 00:06:08

I can take that. So the main focus over the last couple of weeks has been on zallet, we now have a PR up to update it to the new Zaino chain index.There are still a couple of things we need to clean up and resolve, but it’s a significant upgrade because it means we're really moving off the light-wallet-protocol backing for zallet and moving toward having full-node chain-index capabilities.Other things we've been working on,we have a fairly significant refactoring in the wallet backends underway, this refactor will move a lot of functionality out of the SQLite-specific implementation and into the general backend, so that other wallet backends  like the memory wallet backend  can also use it. This was simulated in service of  adding support for handling transparent inputs and outputs in the compact-block flow of the light-wallet protocol,with this, we'll be able to avoid a bunch of information-leaking queries to the light-wallet server by scanning for transparent inputs and outputs directly in the compact blocks,there is a PR up for that on lightwalletd and it’s currently under review. Other updates:

Thanks to some community contributions, we now have deterministic builds for zallet, which is quite interesting and useful. That's everything that comes to mind for the moment.

Pili: 00:08:23

Thank you, Kris. Any questions for kris? okay, let's move on to Zingo Labs and Zaino. Who’s around today to talk about that? Do we have anyone? Maybe they were confused by the time. I don’t see anyone from Zingo Labs.

Let’s move on, and we can come back to this if someone joins later.

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pili: 00: 09:00

Normally Pacu gives this, but he’s traveling, so he asked me to deliver it today.So, as Kris mentioned earlier, the Zaino team and ECC are still working on the chain-index feature integration. This will help fully support Zallet and  lightwalletd. Some exchanges have already started testing Zallet and both Pacu and I have been receiving feedback and questions from them. It’s very nice to see

Pacu has also been working on the zallet Contributor Board, This is the place where anyone who wants to contribute to Zallet can see open issues and pick things up.Items are prioritized top to bottom, based on the  usage survey that Pacu ran with various ecosystem participants last year.

Zooko: 00:10:19

Are you trying to screen share something?

Pili: 00:10:23

No, I will share the link in the chat now.Thanks. Maybe if I’m feeling adventurous, I’ll share my screen. Give me a minute.

Like I said, I’m a little unprepared today, and every time I try to share my screen I somehow mess it up.Let’s try sharing the screen with the board so you can all see it, but the link is also in the chat.There we go. So this is the board.People should probably look at the “Ready” column  that’s likely the most important set of tasks to implement right now, especially the “Implementing Wallet In Place” work.

So, yes, anyone who wants to contribute, please take a look at the [board The URL](https://github.com/orgs/zcash/projects/18) is there in the chat.

Looking forward to some nice contributions.Now let me get back to the slides. Oh wait, there were more updates. Just one second. And then finally, a reminder that all Zcash wallet developers both transparent and shielded  need to update the application consensus branch ID before NU6.1 activation on November 23rd in order to avoid disruptions.

And that’s it for the security and deprecation updates. Any questions?

Alright, let’s move on to research and implementation updates. QEDIT 

## Research and implementation updates- Qedit Zcash Shielded Assets

Pablo: 00:13:01

I'll take this one. Thank you.pili can you stop the screen sharing so I can Okay, so a quick status update on the ZSA project.The ECC team previously merged the changes required to Halo 2 gadgets and also sinsemilla, as well as updates to the changes required for Zcash note encryption.Currently, we have the Orchard ZSA changes in review.

On top of this, to finish the project we still need to merge the updates to Sapling-crypto. Those are minimal changes. more significant changes in librustzcash, and even more significant ones in Zebra.Zebra contains most of the consensus-rule changes required to make ZSA work.In addition to this, we have three auxiliary codebases, one big one is the Zcash Test Vectors repository. We updated it to support Orchard ZSA and Transaction V6. This is ready for review and currently in progress.

We also created an external tool called tztx, which generates V6 transactions in order to test Zebra  because Zebra is not a wallet; it's only a node. So we use TX Tool to craft transactions against Zebra for V6 support.

Today I’m going to show you a short demo of the TX Tool and how it works.

So we have a publicly running ZSA network at this address, and we have TX Tool packaged in Docker at this accessible address. Anyone can run this command and interact with TX Tool to create ZSA transactions against the running testnet.

A quick demonstration: it fetches the Docker and then the first thing it does is sync the blockchain to tip. The testnet is only around ~300 blocks. We only create blocks when there are transactions submitted. Okay, we’ll let it run and  sync and return to it later. 

work on Orchard: Orchard is basically in review. We are not doing a lot of changes. It is synced with upstream Zcash Orchard. All our changes are built on top of the most updated Zcash Orchard, and they are in review.

We fixed a small issue with shuffling action groups, detected by Daria Emma.The shuffle is now global; previously it was done per asset base.

This issue was fixed and merged; it's now in review. We are also working on integration: We are making sure the librustzcash version we’re using includes everything needed for V6 transactions.The most significant change is the new sighash_version byte. We added this for Orchard because we made many changes there and we also added it for Sapling and for Transparent within librustzcash.This work is ready.

To support this, the Zcash Test Vectors repository also needed updates.

We did that as well.The sighash_version byte is now properly tested and integrated into the ZSA version of librustzcash. We also integrated the NSM field as defined in ZIP 230.

There is now the “ZIP 233 amount”  sometimes called “burn amount.” We are discussing with Daira Emma whether we should unify this terminology under one name.

One comment about NSM: It is feature-flagged in librustzcash, but it is not tested in CI.So When we tested locally the version that we created worked  everything worked, but independently zip 233 feature flag is not tested in the libriustzcash Ci, the recommendation is add this to ci, it will break many more times during the development and if  not in the ci, it will be detected only much later

Next, fee computation:

We are modifying fee computation to support ZSA. Defined in ZIP 317. The major change is that to compute proper fees for ZSA, we need to know whether a specific asset base  has been previously issued.

Previously, Zcash could compute fees based only on the local transaction. Now, for ZSA, you need an additional input from global state , 

the aggregated blockchain state  to determine whether this is the first issuance or a subsequent issuance.we implemented this in librustzcash.  Please go ahead.

Kris: 00:19:06

I’m curious about that. Can’t you distinguish based on the issuance bundle? Or is the intent that only the first issuance transaction gets the altered fee, and subsequent issuances have a different fee?

Pablo: 00:19:30

There is an additional fee introduced for newly created assets. To answer whether this is the first issuance or a subsequent issuance, you need to access global state, the history.

Kris: 00:19:52

Should we reconsider that just as a simplification

Pablo: 00:20:00

We can. The fees were discussed.

Kris: 00:20:06

I think I just skipped over or didn’t think about the distinction between first and subsequent issuance. This is fine, nothing here reveals any additional  state.It just complicates implementation a bit. Any wallet that supports ZSA will be able to correctly determine whether there has been previous issuance, so it should be fine

Pablo: 00:20:48

You're right.Any wallet that wants to come up with a quack fee will need to take into account whether this is first issuance or not.

Of course,  for fees you can assume worst-case fee and say this just first issue, then select pay extra to simplify the wallet logic if this indeed goes in, there is a room to reconsider this we implemented this as written in the zip

Vivek: 00:21:19

Just wanted to add,the motivationfor doing it was basically  that when an asset is issued for the first time, a whole new row is added to the issuance-state table.So it made sense to have an additional fee to account for the real chain cost of that operation.

Kris: 00:21:48


Yeah, that makes sense. Any wallet doing issuance will have no problem providing the correct input.Sorry for the distraction.

Pablo: 00:21:59


Not at all this is totally relevant. As mentioned, we made these changes to  librustzcash, but any  wallet supporting ZSA  will need to take into account these logic it can import the code from librustzcash but the wallet need to  store the state and provide the current blockchain state.

Okay, continuing: On swaps , we have a proof of concept to verify that TXv6 will support future swap features. We’re doing a quick sketch for swaps just to make sure that nothing is missing and that tx v6 will last for many more upgrades as much as possible, we are making sure that future features are also supported in the tx v6 

Finally, Zebra:

The focus now is on Zebra integration.The testnet version we deployed includes issuance, transfer, and burn  those were introduced earlier  and now it also supports finalize.So if we want assets with finite supply, like NFTs or any asset with a hard cap, the finalize operation commits a consensus rule that no more issuance is possible.

The testnet already supports all these forms,However, to do this correctly, we are putting engineering work into Zebra’s ZSA implementation to make sure everything is consistent with consensus rules.

Returning to the demo: The blockchain is synced  381 blocks.

We redeploy often to keep the chain short.The new addition is finalize. Previously we had issue/transfer/burn; now we added finalize.

You can submit a transaction to finalize an asset, and then we test finalization by trying to issue more of a finalized asset and confirming it gets rejected.This concludes the update.

Pili: 00:24:58


Thank you, Pablo. Let me share my screen again. Any questions for Pablo? Alfredo, go ahead.

Alfredo: 00:25:08


Regarding the Zcash Test Vectors repo:I looked at the PR from QEDIT.

Some things in the PR aren’t absolutely needed , CI changes, utility stuff.

Would it make sense to split it into two PRs to make them smaller? Or would that just increase review overhead?

Pablo: 00:25:45

Sure. I thought everything there was needed, but the idea is to keep the implementation compact. If you have specifics

Alfredo: 00:25:57


Yeah, I think some things could be split out.It might make review easier.

I’ll send comments.

Pablo: 00:26:13


Okay, looking forward to it.There are two major changes there: Orchard bundles and TXv6.

Alfredo: 00:26:21
 
This reminds me: NSM also has an open PR touching the same repository.

They add a TXv6 definition that will conflict with yours. Not a big deal, mostly naming differences.Their PR is more ready and may merge first, so you might need to rebase your PR afterward.

Pablo: 00:27:00

Yes, that's similar to what happened in librustzcash with NSM merging first and us building on top of it.Please send the links or comments.

Pili: 00:27:20

Thank you. Alfredo, any other questions for Pablo?

Alfredo: 00:27:30

Yes, one more regarding the fee question, should we have an RPC method that returns asset information  like whether it’s finalized, or whether this is the first issuance? Or is that private information

Pablo: 00:28:04

It’s a good suggestion. It’s not required for consensus, but as a utility it would be helpful.A user may want to know if an asset is finalized, what the current supply is, etc.

Alfredo: 00:28:31

Is this public or private information?

Pablo: 00:28:36

Issuance is public. Global supply is also public; you can derive it by scanning the chain. Issuance amounts were designed to be public on purpose, we want to show the amount being issued,transfers are private, especially for NFTs or finite-supply assets, but supply itself is public and consensus-enforced.

Pili: 00:29:32  

Thanks, Pablo. Any other questions?okay, let's move on to network sustainability mechanism

## Research and Implementation Updates Shielded Labs- NSM

Mariusz: 00:29:43

So, thanks for merging the ZIP 233 PR. I am currently rebasing and updating the ZIP 234 and ZIP 235 PRs, and I think by the end of the month they should be ready. Also, I’ve completed all the updates based on the feedback for the Zcash Test Vectors PR,that’s PR 101.I think that one is ready to merge.

Pili: 00:30:24

Okay. Thank you, Mariusz. Any questions?

Jason: 00:30:28

Just a couple of other things I wanted to mention.First, to let everybody know: Mariusz and the team will be rolling off the NSM project at the end of November, after that, Shielded Labs will handle all remaining work internally.That includes all the rebasing, addressing comments, and merging ZIPs 234 and 235 into Zebra.

Jude Caruso will be the primary contact for that; you can also reach out to Mark.The other thing I wanted to mention before we move on to Crosslink is that we’ve had a couple of new engineers join us recently, so I wanted to briefly introduce them.

Jude joined us as a Shielded Labs DevRel engineer. He’ll be working on NSM, supporting ecosystem partners, contributing to Crosslink, and he’s currently running one of the voting-authority nodes for the upcoming coin-holder grants program.

And earlier this week we had Philip join.Philip helped us implement our own version of Tendermint, which we call Tenderlink. We first used it during last month’s Crosslink workshop.

He’s currently working on building a wallet interface that enables various staking actions, which we’ll showcase during our next workshop in early December.Neither of them are on the call today, but you’ll definitely see them around.

Pili: 00:32:02

Sounds great. Looking forward to working with them. anything else, or shall we move on? Okay, let's move on. Crosslink  who wants to give the update?

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:32:19

Yes, I can give our update. Just to remind people of the big picture: we are in a prototype phase, and our plan is to finish a fully functional prototype by the first quarter of next year.

As Jason mentioned, we have a few new team members helping out with Crosslink, which is really exciting. We’ve also started talking to the Zingo team about making an iOS demo for our prototype.

The idea is that by the time the prototype is ready, we’ll have two example wallets  not production-safe yet, but good enough to demonstrate the full user experience.

Right now we’re working on what we call Milestone 4B, and we’re planning to do a workshop on December 3. The goal of this workshop, compared to the last one, is a bit different.

In the last workshop, we were just using an arbitrary weight  a fake number for the weight in the proof-of-stake roster.

For this milestone, the goal is to connect that weight to actual test Zcash (we call that CTAs). So that’s what we are aiming for.

Where we are now:

We’ve modified the transaction format by creating an entirely new version  not format 6 or anything like that yet  and it includes a “staking action” field.

That field is now honored by the demo, so you can run the demo and staking actions flow through transactions. But the units of stake-weight are still arbitrary numbers.

To make this work quickly, we temporarily disabled ZIP-317 fee checks so that we can issue these transactions without a real wallet  we just create stake-weight 

To reach the milestone, we now need to hook up the stake-weight to the actual mined asset tracked by consensus.

There are a few steps involved: Ensure transaction balances include the staking amounts and all Zcash flowing in and out of the pool (test Zcash).

Build a wallet capable of spending Orchard notes, producing staking actions, and then also unstaking to return funds to the Orchard pool.

That’s our target for December 3. We’ve also been doing iterative improvements, such as updates to the visualizer tool.We hope to see you all there. Any questions?

Pili: 00:36:08

That’s great. Love hearing how you're collaborating with other ecosystem teams  the Zingo Labs collaboration is nice to hear about.

Nate: 00:36:20

Yeah, hopefully having two different wallet implementations will help us triangulate different approaches.

Pili: 00:36:36

Yes, exactly. Any questions or comments?

Nate: 00:36:43
 
Oh, sorry  one more detail I missed. For this milestone we also want to open a draft PR against the ZIPs repo. It will be partial and incomplete, and the prototype design may shift a lot as we refine things, but we want to open it soon so that ZIP editors and others can start reviewing and providing early feedback.

Pili: 00:37:20

Great. Any other comments?on what Nate mentioned? Okay, let's move on. Any announcements from anyone?

Pili: 00:38:00

Last chance.Any announcements? No? Okay  any discussion items? Anything else we should cover?

## Open Discussion

Nate: 00:38:19

Oh yes, I just remembered something important while Qedit is here. I’ve heard from a few people who are interested in trying to bridge Bitcoin to Zcash, which would require ZSAs.I was hoping to introduce them to qedit Who should I connect them with?

Pablo: 00:38:50

Please send them our way myself and John and we’ll happily discuss anything like that.

Nate: 00:39:00

Do I have your Signal contact, or

Pablo: 00:39:05

Discord.

Nate: 00:39:09

Alright, thanks.

Pili: 00:39:33

Any other announcements or discussion items? Last chance, No? Quick call today

Well, great  thanks, everyone. The next Arborist Call will be on the 27th of November at 21:00 UTC. Double, triple check that.

I won’t be joining that one  it’s too late for me but I’ll watch the recording afterwards

Next Meeting Scheduled: Nov 27th, 21:00UTC  [cancelled](https://forum.zcashcommunity.com/t/canceled-zcash-arborist-call-on-november-27th/53205)


