# Arborist Call #74 Notes

Meeting Date/Time: April 4th 2024, 15:00 UTC

Meeting Duration: 15 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ Zebra Update - [Minor Cleanup & Zebra Testnet](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2074-Notes.md#1-zebra-update---minor-cleanup--zebra-testnet)

+ ECC Core Update - [Zashi Wallet 1.0](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2074-Notes.md#2-ecc-update---zashi-wallet-10)

+ Research & Implementation Update - [Zcash Sustainability Fund](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2074-Notes.md#3-research--implementation-updates-i-zcash-sustainability-fund) / [Zcash Shielded Assets](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2074-Notes.md#3-research--implementation-updates-ii-zcash-shielded-assets)

+ Open Announcements - [ZconV Registration](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2074-Notes.md#4-open-announcements-i-zconv-registration) 

___


Video of the meeting: [recording](https://www.youtube.com/watch?v=fkqcekg2BWs)

Moderator: Daniel (decentralistdan)

Notes: Jason Rogers


___



## Full Notes


### 1. Zebra Update - Minor Cleanup & Zebra Testnet

[01:56] - **Arya**

Since the last Arborist call, we some new clippy warnings for the latest stable version of clippy, updated the getblock RPC method to make state service requests in parallel, and thanks to [Elijah Hampton](https://github.com/elijahhampton), Zebra now logs database metrics such as the total disk space usage when it starts up and when it's shutting down.

[02:13] 

All these are minor cleanup, as some of us were away at Real World Crypto. There's also a PR open for adding an empty network parameter struct in the testnet variant of the network, and based on that branch, there's another PR open for adding an activation height field to network parameters and implementing parameters crate in Zcash primitives for our network struct, steps towards adding regtest and custom configurable testnets to Zebra.

[02:36] 

Finally, there's a PR open for returning block times when the getblock RPC method is used with Zebra v1. So that's accessible without having to get and deserialize the hex encoded block data. That's all.

____

### 2. ECC Update - Zashi Wallet 1.0 


[02:58] - **Kris**

So the big news since the last ROS call, Zashi 1.0 iOS version is out available on the App Store. So that's been the conclusion of a lot of work over the past several months to get that all the way into production.

[03:21] 

It's built on the Zcash client back-end and Zcash client SQLite stack, that we are now starting to work to extend to to serve additional potential use cases in the direction of a command line wallet or just more broader support for the Zcash protocol than just the simple light wallet use cases that we started with. So that's the major thing right now.

[03:52] 

I think everyone else is out either on post real world crypto travel or dealing with family situations and whatnot. But we're currently in the process of testing out Zashi for Android. That will be coming out sometime in the near future. I'm not exactly sure what the release schedule is, but it's essentially feature complete at this point. So we're in the testing and cleanup phases for that.

[04:24]

The other thing is there will be a Zcashd release maintenance release coming out, I think this week, to avoid EOS halt problems on the network. Those are the major updates from the core team, ECC.


___


### 3. Research & Implementation Updates i) Zcash Sustainability Fund

[04:58] - **Tomek**

So the sustainability fund effort in general has been suspended for a little while, but we are looking into resuming the work shortly. We are still figuring out the timeline for that. I guess the overall goal is still to aim for the upcoming halving later in the year. So we're hoping Q2 will manage to do a lot of progress in Q2.

[05:31] 

In general, the current status is the zebra implementation, I would say, is 60 to 70% complete. We have a bunch of smaller pieces that we still need to glue together and test, but I think we know how to do things and how to proceed.

[05:50] 

We haven't really done much progress on zcashd, except the parts that are common and shared between zebra and zcashd, which is the librustzcash we have a small PR there that was merged already and another one that we are working on, but other than that we haven't really done much progress. Just to be sure. even though the migration to Zebra in the ecosystem has been announced and so on, we are still supporting zcashd after the halving and the Zcash sustainability fund effort is still to be developed on zcashd, right?

[06:39] - **Kris**

It will need to be developed on both nodes, depending upon what network upgrade it is released in. Right now, because of the absence of a replacement for the zcashd wallet, we're not yet as an ecosystem in a position where we we can migrate entirely off of zcashd, but that is work that we're interested in pursuing. It's not totally clear yet what that roadmap looks like. I think that the intent is clearly to move off of zcashd. The timeline is not yet clear.

[07:33] - **Tomek**

Right. As I said, we'll be figuring out internally what will be the timeline for us to resume work. Me and Jason McGee will be giving a talk about the ZSF on Zcon 5, so excited to do that. Thank you..



___


### 3. Research & Implementation Updates ii) Zcash Shielded Assets

[08:26] - **Vivek**

For the ZSA updates, I think the main focus for us for the last few weeks has been on backward compatibility. There's been work required on librustzcash and Orchard and Halo2, and basically the test vectors that we've been working on simultaneously. We've pretty much finished the orchard and the test vectors work independently.

[08:53] 

So now we're just confirming that things work. They work as they're expected to once we put them together. And then similarly, we are going to do... I think the Librustzcash work is also close to getting done. So then we're going to check the test vectors with that and so on.

[09:12] 

On the circuit front we are working on being able to generate both the circuits while ensuring that the optimizations that we made for the Orchard ZSA circuit, as well as the original optimizations for the Orchard circuit, are maintained so that we get the optimal circuit it's in either case. So all this is work for our network update integration milestone. So we've spoken to ZCG about possibly splitting the milestone in a way that we can claim some of it once we complete the backward compatibility work.

[09:47] 

We have recently just about started kicking off discussions about the audit of the ZSA protocol as well. That's something that I think should be happening soon after we get the backward compatibility done. As we get more information about how that's proceeding, we'll share that with you.

[10:07] 

I guess the last bit is regarding our recent grant proposal. We followed the discussion on the forum and spoken to the ZCG, and the general direction is that we will look at how we can shift things around with what we have so we can try to push ZSA's out for everyone as fast as possible.

[10:31]

We're also in the process of adjusting the grant proposal we made in such a way that we don't lock up a good chunk of the available funds. Ideally, we'd like to see ZEC rise, there's more available in the pie, and then get the things out, the things that are important in smaller phases. We haven't quite worked out those specifics yet, but we'll share those along as those get more crystallized.


___


### 4. Open Announcements i) ZconV Registration


[11:52] - **Kris**

Everybody, go download Zashi IOS if you're on IOS and give us feedback if you haven't done so.

[12:05] - **Dan**

I'll give a shout out. We announced Zcon, so I think some folks here are likely speaking, so you won't have to register. But anybody who's watching this later on YouTube or is in the audience, you can go to our website, https://zfnd.org, and go to the Zcon section and walk through the steps for registering. We'd love to have you there and participate.

[12:38] - **Dan**

Thank you, everybody, for joining. Thank you, everybody, for presenting. The next Arborist call is April 18th at the 21:00 UTC time slot. We hope to see you guys there, and we'll see some of you in between that time. Thanks for joining.


____


### Attendees

+ Dodger

+ Kris Nuttycombe

+ Tomek Piotrowski

+ Arya Solhi

+ Mariusz Pilarek

+ Pacu ZWCD

+ Vivek (QEDIT)

+ John Bruhling

+ Michael Harms


**Next Meeting Scheduled: 21:00 UTC April 18th 2024**


___
___



