# Arborist Call #58 Notes

Meeting Date/Time: August 10th 2023, 21:00 UTC

Meeting Duration: 15 minutes


**Agenda**: 

+ Welcome and Meeting Intro - [Arborist Call Updated times & Registration links]()

+ ECC Core Update - [Spenc-before-sync & ZIP-317 support for Mobile SDK's]()

+ Zebra Update - [Spend before Sync Support]()

+ Research & Implementation Update - [Trailing Finality Research]() / [ZSF draft ZIPs]()

+ Open Discussion -  [Zcash Wallet Community Development]()

Video of the meeting: [recorded]


Moderator: Jack Gavigan 

Notes: Jason Rogers


___



## Full Notes


### 0. Welcome & Intro - Arborist Call Updated times & Registration links

[00:04] - **Jack Gavigan**
we'll get started with some node updates. I'm not sure there will be any research or implementation status updates today. No discussion topics have been proposed. In fact, no discussion topics have ever been proposed in advance of any Arborist call. If you have something you want to discuss, let us know and then we'll move on to open announcements, any updates, anybody wants to give any discussion and then we'll wrap it up.

[00:42] 

Just a reminder that Arborist calls happen every two weeks in alternating time slots. There's an early time slot of 15:00 UTC which caters more to people living in Europe and a little bit further east of there. This is the 21:00 UTC time slot and the goal of these calls is to allow people who are contributing to the Zcash protocol to come together to provide updates and to discuss timelines, processes, write updates on any R&D efforts that are going on & coordinate to ensure that we don't have any mutual blockers.

[01:32] 

The goal is to make protocol development more accessible and transparent to the Zcash community and to make it possible for a wider set of participants than the actual developers who are regularly involved. The goal is if you want to get involved in Zcash protocol development, this is the place you come to find out what's going on and to get started.

[01:59] 

Anybody can register to attend these calls. You can find the relevant links by going pointing your browser at [zcasharbost.org](https://zcasharbost.org). If you want to present something to the call please email us on: arboristcall@zfnd.org. Other ways to get involved you can apply for a Zcash community grant, you can join our Zcash R&D discord, which is where all the developers hang out or you can join the Zcash community forum.


____


### 1. ECC Update - Spenc-before-sync & ZIP-317 support for Mobile SDK's


[03:22] - **Kris**

Not much in the way of Zcashd updates this week, because our principal efforts have been going towards the SDKs for the mobile wallets. We are nearing a new SDK release, some of the nightly releases are already being tested by some of our wallet partners, but we're working through sort of the last of the issues that need to be resolved for us to release the Spend-before-Sync and ZIP-317 support functionality in the SDK.

[04:00]

So what these are just briefly, the Spend-before-Sync allows users existing notes to be made, spendable almost immediately upon opening the wallet, not having to wait to scan all of the blocks in the chain, and then the ZIP-317 support. We're moving to a model for transaction creation that should allow wallets to give users a pretty nice user experience. The wallet calls into the SDK asking for a transaction proposal, the SDK replies with "here's a summary of the transaction that we are planning to create including any fees" that also provides information about if for example, you have a wallet that supports both Sapling and Orchard, if there are any privacy implications of funds crossing pool boundaries, anything like that.

[05:04]

The user can then be shown the details of that transaction, including what memos are going to go where and so forth, and then approve it. That proposed transaction can then be actually created using the wallet spending keys and published to the network. So those are the main things that we're working on right now and looks like we'll probably be finalizing up that SDK release in the next week or two, given the amount that I'm aware of that we have left to resolve.


___


### 2. Zebrad Status - Spend before Sync Support


[06:14] - **Marek**

There isn't much to update. There isn't that much that got merged in the last two weeks since most of us were away. The main thing that we're working on is the support for the Spend-before-Sync algorithm. We have some work left there to do, mainly three issues, and we're not storing the note commitment trees for each height anymore, but we still have to prune the existing trees. We have a PR in flight for that, and that's about it. We need to update two more RPC's, if I'm not mistaken, and then the support should be ready for the new lightwalletd algorithm or the support.



___


### 3. Research & Implementation Updates - Trailing Finality Research


[08:12] - **Kris**

I dont think there is anything much on the ECC end. The primary research and development action here has been, I know Nate has been moving forward on design of essentially finality protocols for Zcash related to a shift to proof of stake. So I know that he's been looking at some sort of hybrid stake and proof of work protocols, but I don't have more details than that at the moment, but the goal is to propose a finality layer that will allow functionality like bridging between chains to be implementable.

[09:08] - **Jack Gavigan**

Yeah, it's actually design that we first looked at probably about four years ago when I think it was around the time Ethereum Classic was 51% attacked. We were nervous about Zcash being attacked at the time. I think at the time, the idea was to have a proof of authority to effectively have a trailing milestone beyond which the blockchain could not be rolled back. Sounds like Nate has adapted that idea for proof of stake. 

[10:06] - **Jason McGee**

Hi, everybody. Just a quick update for Shielded Labs. We've been working on the two ZIPs for the Zcash Sustainability Fund and the first ZIP, which establishes the ZSF at the protocol level, it's almost complete. We're planning on posting a rough draft to the forum early next week. So we're building consensus as we go amd it kind of feels like we're in uncharted waters. I think it only works if we get meaningful feedback from the relevant organizations and stakeholders. So I just wanted to encourage everybody to please provide feedback on the ZIPs and I'll probably be somewhat aggressive about facing down and following up with people for feedback.

[11:02] - **Jack Gavigan**

Have you been talking to the ZIP editors?

[11:05] - **Jason McGee**

Yes, we have.

[11:06] - **Jack Gavigan**

Okay, that's the most important feedback that you need to be getting.

[11:14] - **Kris**

I was just going to ask, so I presume that there's a draft on the [ZIPs GitHub repository](https://github.com/zcash/zips) that might be a good piece of information to share in this venue, if that's available.

[11:32] - **Jason McGee**

Okay. Will do. 


____


### 4. Open Discussion - Zcash Wallet Community Development


[11:39] - **Pacu**

Just to announce myself officially, this is like my first full week as the Zcash Wallet Community developer, and I'm still getting everything organized to serve the community better and putting some project management tools around my repos and all to be a little more organized and try to see what's better to make my work visible to everyone.

[12:22] 

I've been mostly working on reviewing some PR's for Nighthawk this week & also starting to work on benchmark tests using darksidewalletd that I will initially use Zingo! for but at least the data sets will be available for every wallet to use. The first one we've come up with is the second flush of enthusiasm, which is basically a basic onboarding flow for users that we came up with the Zingo! Labs team, which will allow us to simulate the situation where someone gets onboarded to use ZEC, then forgets about it, 100,000 blocks have passed and somebody reminds that person of receiving ZEC for some transaction and the user opens up the wallet and we want to see what happens, how fast the funds are available, how fast the wallet is usable, and compare between implementations that the wallet teams can have benchmarks on how they improved upon that scenario.

[13:58] 

That's the first scenario we will be creating, but we expect to create more. So if you have ideas and all, just ping me on the R&D discord and then I hope in the future I come up with better communication channels that are easier, that's my announcement and pretty excited.

[14:24] - **Jack Gavigan**

Congratulations Pacu any other announcements or questions or any other topics that anybody wants to raise? Okay the next Arborist call will be in two weeks time in the earlier time slot, 15:00 UTC.


_____


### Attendees


+ Jack Gavigan

+ Kris Nuttycombe 

+ Jason McGee

+ Marek Bielik  

+ Pacu ZWCD

+ Taylor Hornby

+ Oleksandr Putyak

+ Aditya Bharadwaj 


**Next Meeting Scheduled: 15:00 UTC August 24th 2023**


___
___