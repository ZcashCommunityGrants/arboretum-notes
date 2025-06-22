## Arborist Call #103 Notes 
Meeting Date/Time: june 12 2025,21:00 UTC

Meeting Duration: 35 minutes

Agenda:

Welcome and Meeting Intro [agenda,intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro--)

Zebra Update -[ NU6.1 varriant,bug fixes,Prs](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update - [librustzcash,zallet,zcashd](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Nsm,Zip's](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates--shielded-labs-network-sustainability-mechanism)/ [crosslink,shadowing mode,milestone 3](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-and-ecc-crosslink-trailing-finality-layer)

Open Discussion - [frost,lockbox,feedbacks](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=Yev7T34rMlM&t=28s)

Moderator:DAN

Notes: chidi olisa

## Full Notes

## Welcome & Meeting Intro 

DAN: 00:05:14

Hello everybody and welcome to today's Zcash Arborist call on June 12th. Today's Agenda has core stack updates from the Zcash foundation regarding Zebra, ECC, regarding ZcashD core libraries in Zallet, Zingo Labs, talking about Zano, and Updates on the ZcashD ecosystem wide deprecation project. We'll also have a section on research and implementation updates. We'll have somebody from QEDIT if they're here, normally they're in the other time slot and folks from Shielded labs touching on the Network Sustainability Mechanism and Crosslink. And then at the end we'll have space for open Announcements and Discussion section. What are Arborist calls? arborist  calls are bi weekly calls where zcash protocol contributors convene to discuss upgrade timelines and process, protocol research and development efforts, design and implementation of new protocol features, and to identify blockers and any unresolved issues. The purpose of these calls are to make core zcash development accessible for a wider set of participants and to provide more transparency for the zcash community and beyond at large. Anyone interested in learning about the Zcash protocol development can register at zcasharborist.org to participate, and if you'd like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot. other ways you can get involved in the zcash community is you can check out zcash community grants zcashcommunitygrants.org jump in the zcash R&D discord and join us over at the zcash Community forum and you can find all these links by pointing your browser to zcasharborist.org and we'll get it started with the first core stack update from ZF regarding Zebra.

## Zebra Update 

ARYA: 00:02:14 

Okay, so in Zebra since the last arborist call, we've merged several improvements to CI, including fixes particularly around how PRs like from forks and how the cached state is managed in CI. We've also merged a change into Main that allows debug crates to be compiled with alternative versions of their dependencies. We've added an NU6.1 variant of the network upgrade that's still unused in Main. We've pinned the LightwalletD version in CI and have added a major DB format upgrade to support new fields in the GET address Balance RPC and the GET block rpc. We've also added deserialization tests in Zebra RPC and let's see, are allowing local Outbound connections on regtest now finally that are defined in the config. We've added an add node RPC method and have merged an initial framework to test solid RPC methods that handle the setup. We fixed an issue around the zcasher context when validating transactions where it was serializing Zebra's transaction type into the Librustzcash type redundantly. So now it's only doing that once and added support for configuring shielded addresses for mining, but are not yet generating shielded coinbase. It's just the support for the configuration. We've updated the get address balance RPC to add the received field and finally we have merged the zcash script's new script trait into zebrascript. We also have new pull requests open for implementing the one time lockbox disbursement mechanism for NU 6.1. It would be really nice to finalize the zips for that soon by the way, and cleaning up Zebra RPC's API so that you can use the client types without requiring a dependency on Zebra state or any of the server code in Zebra rpc. There's also a PR open that will likely be merged soon for adding value pools and block sizes to the get block rpc and I think that's. That's most of what we've done for the past couple of weeks in Zebra.

DAN: 00:04:37

Thanks Arya. Any questions? All right, we'll jump forward here and next up I believe is Chris with an update from ecc.

## ECC Update 

KRIS: 00:04:52 

Yep. So we we also at ECC have have implemented the changes required, the consensus changes required for NU6.1 with the lockbox disbursement changes and the ability to do one time disbursement from the lockbox in zcashD we have produced a release of all of the crates in the Librustzcash stack that was mostly in service,  improving the Tor support in Zashi but also pushing forward a bunch of pieces for zallet. We have new implementations of Zallet RPC methods with Z Get total balance and there's another one that just recently merged. otherwise we have been just pushing forward a lot on zallet development that I think is the high level summary. Yep, that's it for now. I will come back if I remember more things.

DAN: 00:06:18

Great, thank you Chris. Any questions for Chris? All right, we'll jump forward again here. Next up, Zingo Labs. I'll just double check. I still do not see in the attendees. Okay, so we'll come back if anybody shows up any zcashd deprecation updates from any of the folks here.

## zcashd Deprecation updates. Ecc, zf, Zingo labs, Pacu

KRIS: 00:06:47

We're now in the sort of phase of figuring out what remains for a zallet alpha release. This again will not be a completely usable solution for all wallet problems, but it will include ZcashD wallet migration and zsend many sync transaction history, essentially all of the basic stuff, but biased toward the more modern APIs. There will still be a bunch that is left incomplete of the Legacy Bitcoin Derived APIs for this alpha release. We don't yet have a date for it, but hopefully by the end of the month or by the next arborist call we will have firmed up when and what will be deployed with that release.

DAN: 00:08:01

Okay, thank you Chris. Any other updates or questions, thoughts, comments, concerns? All right, I don't see anything in the chat either and. Oh Alfredo, go ahead.

ALFREDO: 00:08:20

Yeah, I have a question for Kris. Is there some way to import a key, in your mind for this alpha release.

DAN: 00:08:40 

You are muted kris

KRIS:  00:08:43

So right now all that is being supported immediately will be zcashd wallet import. Although it would be pretty trivial , given ZcashD wallet import being implemented to add transparent and legacy sapling key import. I just haven't thought about those two things yet because the back end supports those at this point, but I haven't exposed those through RPC APIs.

ALFREDO: 00:09:15

Yes, I think in regards to the Python test framework. So one of the things pretty much on the test is you mine blocks in rectest mode and the funds go to a certain address that should be included in the wallet. So yeah, we need a way to add a key to a database somehow.

KRIS: 00:09:48

So in the test setup is it not possible to run essentially the wallet account setup so that you're just using the wallet that  you've just initialized for the test? I'm pretty sure that's what the wallet is.

ALFREDO:00:10:15

I'm not sure does it .So one way would be using that import scene that you added. You import something that you already have into those tests. So that's an option.

KRIS: 00:10:30 

So the fact that the tests in ZcashD are just using sort of defaults is more of like a historical artifact than anything. Ideally the way that I would approach this is I would make the first operation on the wallet to be to create an account and then grab the key to that account

ALFREDO: 00:10:51 

So I think the problem with that is that to create,for zallet to start you already need a zebra backend running and you add the minor address to the zebra config,and yeah, it's kind of.

KRIS: 00:11:20 

Oh, I see there's sort of a check being able to set the minor address.

KRIS:00:11:28 

Wait, wait a minute. What could be done there? The other way to approach this would be to, instead of running Zallet Start, would be to add a CLI command to add an account to the wallet.  that could be used to set up the wallet without connecting to a light wallet server.  that strikes me as the better way to go about it.

ALFREDO: 00:12:06 

Okay, cool. Do you think we should open a ticket inside it to do that?

KRIS: 00:12:09

Yeah, please do.

ALFREDO: 00:12:12

Okay, I will. Thank you.

DAN: 00:12:18

Okay, thank you guys.

KRIS: 00:12:19 

I  could actually do one more call, a  flag or an argument to the wallet init as to whether or not it should create a default account.

ALFREDO: 00:12:33

Yeah, that will work as well.

DAN: 

Any other thoughts on this topic? We will jump forward. I still don't see anybody from qedit. So on to Shielded labs on the Nsm.

## Research & Implementation Updates- shielded labs Network sustainability mechanism

MARK: 00:15:58

All right, I can give this update. We have rebased the three PRs related to Zip233. There's one in Librustzcash, one in Zcash test vectors, and there's the Zebra PR which ties it all together. Daira Emma had made some comments on the Librustzcash Pr, which I believe Marius addressed. And Marius also updated the Zip 233 PR to reflect the latest Librustzcash PR changes. Marius had a question for Daira Emma, Marius noticed that the Digest header change in zip 233 Librustzcash PR breaks several zebra tests. Merkle root is valid. V5 with sapling spends, V4 with sapling spends Block test vectors and binding signatures. Because these process old blocks from testnet and mainnet. Should not the writing of the zip 233 mount in the header be conditioned, perhaps based on the transaction version? If anybody else has feedback on that, welcome.


KRIS: 00:14:08 

Yeah, absolutely. That should be dependent upon the transaction version. So if that's not currently the case, then that's a bug.

MARK: 00:14:17

Okay, I will report that back to Marius. And yeah, that's about it. So kindly review at your earliest convenience and then once that's reviewed and merged, hopefully we can go ahead with zip 234 and zip 235. Thank you.

DAN: 00:14:48 

Thanks, Mark. Any questions or thoughts on the nsm? Okay, next up, Crosslink.

## Research & Implementation Updates-shielded labs and Ecc crosslink Trailing finality layer 

NATE: 00:15:02 

All right, I'm giving the Crosslink update for Shielded Labs. We secretly had a goal to always do a demo at these, but sadly we've just Been doing more process and research, exploration kinds of work. So I'm just giving an update. So the last arborist at the end of May was when we wrapped up our second milestone  which implements basically some DFT stuff, but it doesn't modify anything related to zcash proof of work in Zebra. And then there's a thing called zcash mainnet shadowing mode which uses that BFT stuff to agree on what those nodes see on mainnet, but it doesn't influence mainnet in any way. So we had like a workshop where some people showed up and joined the network. the network is really brittle. Like you have to basically have a configuration file with all of the peers, network connectivity info and everyone has to have the same configuration and if anything changes or any node disconnects, the network has a hard time surviving that. So that was fun and sort of got the idea across, but it is not like a robust persistent thing yet. So at the beginning of our current milestone, now we're into milestone three, we did some review of like the process itself of Milestone 2 and if we want to tweak or improve things for Milestone 3 and there was a few things around how we verify that we are sort of meeting the expectations of different stakeholders. So like one example was doing that, that workshop with the mainnet shadowing mode as like a validation that what we're making is useful or usable or interesting. And then besides that process review, we've started doing kind of some work on the design front and some work on testing, like software QA stuff. So on the design front, the goal for this milestone, milestone three is to implement changes to the proof of work consensus. So the end result should be a node that has the basics of the crosslink consensus implemented. So there's a BFT side, a proof of work side and the blocks are modified and both to refer to each other to follow these crosslink rules. But there's no proof of stake anything, there's no delegation or bonds or anything. So the BFT side is just proof of authority, which currently is just a config file that everyone must have the same copy of. And so that milestone should demonstrate the actual consensus mechanism and be good for reviewing that design and implementation and testing, you know, security issues or other kinds of tests. So the research we've done towards that end so far has been ensuring that we know how to have something that we call or that I call objective validity. But some other people on the team say that's really confusing. But basically the Idea is if you are given a snapshot of this hybrid chain so you have both proof of work blocks and BFT blocks. Like if you're given a snapshot on a disk from someone you don't want to rely on too much, can you run software that validates? It's all internally consistent and it appears that, you know, consensus rules are being followed for the two sub protocols. So that seems like an important goal, especially for the case of a new node joining the network. And this is something that proof of work proponents love because Bitcoin is pretty strong on that, but it's a little, I'm learning it's a little bit different in BFT land. So it seems like the out of the box thing that the Malachite framework gives us is if you join. So first of all, it's really common to have checkpoints in BFT networks. So you assume a new node already has the checkpoint and you join. And then if you have a reliable buddy node, they can hand you the bft like the sequence of BFT blocks, but then also kind of some out of band signatures that let you verify each transition is valid. But those signatures aren't necessarily in the chain by default. And so we've explored putting them in the chain and there's some nuances, but I think that's a pretty common thing BFT chains do. But we're still learning about it to make sure we're doing kind of the standard thing. But then the other piece of design everyone wants to know, as Zuko says, when proof of stake. They're constantly asking him, which really means like, how does staking work? You know, what's my yield, how can I delegate, how do I run a validator, Stuff like that. So even though that isn't a goal for the implementation of Milestone 3, we're sort of pulling the design work forward on that to sort of get the early design out there for early feedback and so we can tell users something even though it will be very provisional and we can start getting feedback on that. So the goal for milestone four is to include all of that. So that's the end of Milestone 4 is basically like a working testnet that has all the basic functionality, including you can run a finalizer, you can host, stake you can delegate. And then those finalizers run the BFT protocol and get the fees or penalties if they're not behaving well. And we're trying to front load the design of that during this milestone. So we've done a little bit of work on that . We have a few different groups of stakeholders and if you're interested in being in any of these groups, let us know. But there's one group that's like people who do validation for other proof of stake networks and what would they want to see or what do they expect to see? And we came up with a faq, answering common questions that we've gathered from interacting with that group. And we went through a process as a team of just, even though we don't have a specific design, trying to answer what we think the answers should be for the design floating around in our heads. So that's sort of an interesting step where we're already kind of incorporating user feedback in a way like really early in the design process. And then the other thing is we've been talking to Informal Systems which is the developer of Malachite, but they also work with teams like they've worked with Starkware on some of their proof of stake stuff. So they're familiar with working with specific protocols implementing BFT using their SDK. So it's been useful to chat with them and then we also chatted with Christopher from Anoma to sort of share our challenges and what we need to figure out for this design work. And yeah, so that's what we've done. The next steps on that design work are to just study Cosmos Hub, which  maybe the oldest of the very common sort of central tendermint implementation that a lot of people understand well. But we also want to study Namada and Penumbra partially because they're sort of in a similar space because they have privacy as a first class goal. But also I think their proof of stake functionality should be relatively clean and simple, although both of them have some extra features we don't need. So we want something a little simpler. But the next step is to study that to inform our design and work on that design. Let's see. Did I. Oh, sorry. Then the last piece was the testing stuff I mentioned. So we've been sort of exploring this approach to testing, we want to have basically test vectors of a sequence of blocks, except it can be blocks for the two different sub protocols. So BFT blocks or proof of work blocks, but they're in a specific linear sequence that gets played into our new hybrid Zebra node prototype in, like a test harness. And then the idea is we want to write tests that replay sequences of certain sequences of blocks and then validate that the node is in certain states. And so, you know, like the example for the first sets of tests we want to write for that is just proof of work and we just have proof of work rolled out that verifies that the node is doing what we expect. And then once that's working, we want to start adding in some of the BFT stuff as we're implementing this current milestone goal where the two protocols are interacting with each other. And part of the motivation for this kind of approach is that as long as the serialization of the test vectors isn't changing, we can sort of keep the test logic unchanged while implementing other functionality. I don't think we have any working tests yet, but we're getting close to the first basic tests. But that seems like something we should share with the Zebra team and see if they're, you know, if it's useful or if it. If there's other ways to do this. But again, one of our goals is to make sure we can sequence blocks on these two different protocols. The two protocols sort of run independently in terms of timing, except they're referring to each other as the only timing dependency. So we need a way to be able to test different time orders of the same sequences of the sub protocols. Yeah, so that's the goal there and that's what we're up to so far. Any questions or feedback?

DAN: 00:27:27 

I'll check the chat. Looks like Zooko just posted, when POS three times. But yeah, I guess I'll put one more call out there for any questions or comments regarding Crosslink.

NATE: 00:27:46

Oh, I mean, as regards when POS we have a roadmap up. If you go to shieldedlabs.net you can find the roadmap from there. I think it's in one of the drop down menus, so we're still following that timeline.

DAN: 00:28:03 

Great, thank you, Nate. Let me jump back over to slides here. Sorry. Okay. Any open announcements? Last call for that. Okay. And open discussion topics from anyone. G Guy, did you want to chat about what you posted in the chat?

## Open Discussion 

GGUY: 00:28:40 

Yeah,  I'll share the link again. If anyone  has any feedback? We can discuss it offline if you wish, but just regarding Zcg possibly funding key derivation. Great. I'm a big supporter of passkeys. Been one of the options, so let me know if that's something the ecosystem could utilize. zashi probably specifically.

KRIS: 00:29:07

So there's something important here which is that key derivation for Frost has still not been fully specified and something like this would definitely need that specification Specifically. We at ECC have a proposal up for Frost key derivation that will essentially give post quantum resilience such that if quantum computers were to come along and the use of discrete log based notes had to be shut off on the chain that there would be a recovery path possible for those spent outputs. So any proposal along those lines should definitely think about carefully. Well it essentially needs to take that into account and in general we really need to find time to move forward on specifying that piece of Frost key derivations so that we don't end up in a situation where people have started using Frost derived keys and we can't depend upon. This is going to be relevant for you know certainly relevant before NU 7 but it really needs to be done as. As soon as possible.

GGUY: 00:30:57 

Okay, but generally speaking this type of work might be utilized?.

KRIS: 00:31:03

I mean I need to look at the specific proposal but.


GGUY: 00:31:09

Okay I can at least find out.

KRIS: 00:31:20 

Exactly what's being proposed more just  you know, in the process.

GGUY: 00:31:24 

Yeah I can find that more info. That's all I'm trying to gauge if it's worth me spending some time. Okay, thank you.

Speaker B: 00:31:29

Thanks GGuy, kris, you got more thoughts?

KRIS: 00:31:32

my hand was up for something different and unfortunately the most relevant folks aren't here yet but I just wanted to call out to the organizations who are going to be the key holders for lockbox the initial key holders for lockbox disbursement. We need you to go about producing a multisig P2SH key for testnet for the one time lockbox disbursement. That'll be in NU 6.1 so we'll need to get that so we can put it into the zip and we're now I think both Zebra and ZcashD are in a position where once we have those keys we will be essentially ready to cut a testnet release that allows us to test the lockbox disbursements.

DAN: 00:32:45  

Great, thank you Chris. Should we. Does that need to be posted somewhere? Post after this call 

KRIS: 00:32:56

it's an action item for essentially Josh, Jason and whoever is responsible for that at the zf.

NATE: 00:33:05

Yeah, I'll discuss it with those guys next week.

KRIS: 00:33:06

Thank you.

GGUY: 00:34:39 

Just wanted to quickly call out anyone and everyone who has been assisting grantees to specify their milestones more clearly. We're kind of trying to get a tighter grip on those things, so thank you.

DAN: 00:33:34 

Thanks G. Guy, Zooko has a question in chat that I'll read out loud. It is likely for Arya or Alfredo. Does Zebra currently verify the Fly client bits in block headers? It turns out that Fly client could potentially be useful for crosslink.

ARYA: 00:33:58

Nowhere that I can think of. I want to say with 95% certainty that zebra does not verify the fly client bits.

DAN: 00:34:09  

Okay, thank you. Arya, let's do one last call for any other open discussion topics or anything else that anybody would like to bring up.

DAN: 00:34:27 

Thank you all for being here and joining today's arborist call. The next arborist call is on June 26th at the earlier time slot of 1500 UTC. Thanks all.



Next Meeting Scheduled: june 26, 2025 15:00 utc
