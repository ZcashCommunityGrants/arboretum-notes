# Arborist Call #67 Notes

Meeting Date/Time: December 14th 2023, 15:00 UTC

Meeting Duration: 1 hour 50 minutes


**Agenda**: 

+ Zebra Update - [Zebrad 1.5.0 / Sapling Scanning ]()

+ ECC Core Update - [Sapling extraction / NU6 & Zcashd]()

+ Research & Implementation Update - [Trailing Finality Layer update]() / [Zcash Sustainability Fund / ZIPs update]() / [FROST demo / ZIP update]() / [ZSA update / v6 transactions]() / [ Proposal for ZSA Regulatory Compliance  ]()

+ [Wrap up & Closing]()



## Decision & Action Items

i)  Call for Task Force participation around zcashd maintainership

ii) February in depth presentation at arborist call on Trailing Finality Layer  
___


Video of the meeting: [recording](https://www.youtube.com/watch?v=vbG7-E32nj4)

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes

___


### 1. Zebra Update - Zebrad 1.5.0 / Sapling Scanning 

[00:02:26] - **Marek**

So earlier this week we released [Zebra 1.5.0](https://github.com/ZcashFoundation/zebra/releases/tag/v1.5.0). It contains a bunch of networking improvements and fixes. Some of them were reported by the Ziggurat team, so thanks for those.

[00:02:47] 

The main addition is that we introduced support for shielded scanning. The way it works now is that you add your sapling viewing key to Zebra's config file, or like multiple of them. Zebra picks them up, scans the blockchain, and stores the results in its persistent storage.

[00:03:21]

The results contain Txid's and their associated keys, and we have a tool that prints the memos of these transactions. So if you want to try it, the way it works there is that you can scan the blockchain with zebra and then run the tool that picks the Txid's, then fetches the transactions from zebra and prints all the memos, for example from Zecpages. So you'll get the Zecpages posts. That's all.

[00:04:09] - **Kris**

So I have just sort of an implementation question about separation of concerns. So one of the things that caused us much pain and difficulty over the years was the zcashd full node wallet being tightly coupled to zcashd. And we really wish that there were an abstraction and process boundary between the two. So in terms of what you're implementing, how is the wallet isolated from the rest of Zebrad and what is the communication protocol between the two?

[00:04:57] - **Dodger**

So I'll answer that. There is no wallet. What Marek just described relates to viewing keys only.

[00:05:10] - **Kris**

Okay. But it's still integrated functionality. There can be a pruned or diminished version of a wallet, which is an input scanner essentially. And in fact, in zcash client backend, we've for long had the idea that a wallet is only one of the possible applications but a client, like a merchant point of sale terminal where you only want to use incoming viewing keys and not full viewing keys, is a valid application. And for any such application, though, I think that sort of isolation would be valuable.

[00:06:12] - **Dodger**

Marek, I don't know if you want to talk about how it's been implemented.

[00:06:16] - **Marek**

Yeah, so we thought about this as well. And for the MVP, which we are almost finished by now with, we decided to just go with what I just described and that's adding the viewing key to zebras config, the release nodes contain a warning about this, that this is not Secure for now, and we are definitely open to suggestions and improvements as regards the separation there. We also considered having the keys in a separate process from zebrad.

[00:07:10] - **Kris**

I mean, the way that I think that it would be fruitful to move forward. I understand that for an mvp you just want to get something out there. But I think that for the long game, it would be ideal for such applications to be separate processes that speak over either the light client protocol or an evolved version of the light client protocol to full nodes, so that the distinction between such an application.

[00:07:50] 

So that such an application could run remotely from the full node or that separation. In Zcashd's history, there were significant vulnerabilities that took a lot of effort to mitigate due to the communication channel between Zcashd and its wallet being synchronous and just trying to warn away from the integrated path development. And I know very well how easy it is to put prototypes into production. We discussed yesterday at the NU5 retrospective just how much pain we at ECC suffered from having put prototypes into production and then come to regret our choices.

[00:08:52] - **Daira**

Direct response to that.  So that issue with privacy leaks, if you have a synchronous communication between the scanning and the rest of the node, that applies even to viewing keys. So you ideally don't want to leak that you're scanning using a particular key, but already just with a viewing key, you potentially have a timing leak depending on exactly how it's implemented. 

[00:09:36] - **Conrado**

So I'm wondering, what do you think would be like an ideal solution to this? Because if it fits in another process, you basically have to stream the entire blockchain to another process, which seems very expensive or not, maybe just not viewing the right solution for this, but do you think it's worth doing this? I agree that the whole wallet, the main part of the wallet, should be another process, but this particular thing, the blockchain scanning, do you think even considering this should be another process?

[00:10:14] - **Kris**

I think so. I think that the light client protocol and the compact block protocol is intended to pass as little information across as is necessary to make that feasible. I think that if we need to evolve the light client protocol to make it more performant, that will ultimately be beneficial to the entire ecosystem, whereas having. I think that starting with embedded scanning into zebrad, especially with the tendency of prototypes to become production, it's likely that that functionality will want to be extended to full node wallets down the road, and then you will end up in the same position as we are in zcashd, where we really wish that the wallet were not part of zcashd at all, because it's really easy to get tight coupling. So just food for thought going forward. I think that common work on light client backends and improving the light wallet protocol benefit the entire ecosystem, perhaps at the cost of sort of individual user scanning.

[00:11:54] 

The other thing though is that I think that full node wallets where you have an integrated viewing key. There's much more limited application for those than there is for disconnected lightclients. Now, maybe it's the intent that, well, okay, I'm running my own full node and then I'm connecting to it from elsewhere or something like that. But yeah, I think that should be just considered what the costs of that tight coupling will be in the long term.

[00:12:57] - **Pili**

Yeah, so thank you Kris. We have been thinking about, we definitely don't intend for this MVP to make it anywhere into production, and we were just trying to see okay, let's get familiar with the library. Let's see what we can achieve. And so right now we've only been scanning ZECpages, which I guess Marek probably said in terms of security issues and timing attacks and things like that. We have been doing some analysis and we do have some issues open to, for example, running the task in its own Tokio executor to prevent timing attacks and other things.

[00:13:37] 

And we're also very at peace with the idea of if we need to scrap all this work and do it properly from the start, that's fine. We've been learning lessons from this MVP and we'll take those going forward. But yeah, we welcome all these feedback. This is great. And if you have any other ideas on other security concerns that we should have, please send them on.

[00:14:07] - **Str4d**

I just wanted to push back semi strongly against what Kris was saying, as he knows I will. So I agree with the conclusion that not requiring a wallet to be tightly coupled within a single nodes full process and like integrated the way it is in zcashd is good. I do not believe that we should be instead coupling it to the lightclient protocol, and there might be a difference in semantics here in terms of what an evolution of the lightclient protocol is thought to mean. But there are significant costs imposed on wallets that use the light client protocol, in part because of the way that compact blocks are required to consider bandwidth.

[00:15:01] 

And if you are in a context with a full node where you have access to the whole chain in some persistent database, in particular because zebra uses RocksDB as a persistent and immutable database, I would imagine that actually opens up some interesting possibilities for having the wallet and scanning and keys in a separate process, but still sharing the same on disk structures.

[00:15:26] 

So the protocol between them could be passing block references for instance, or references in that way, but referring to the same immutable launch on disk data, which gives you a significant performance improvements compared to having to parse into an in memory synthetic lightclient protocol. You can a) rely on a bunch of checks that the full node is doing for you that you in theory are meant to be doing yourself for lightclient and b) potentially depending on where the security get boundary gets drawn, in the case that Kris alluded to. For having your wallet on your phone connecting to a full node that you run remotely, you could potentially have parts of that scanning happening on the same computer as your full node, and then parts of the wallet behavior happening on your phone where you are, which would give you the best of all worlds where you would have like, process separated scanning happening on a more powerful machine than your local phone, and then communicating with your local phone over your direct connection, for instance.

[00:16:39] - **Kris**

So this comes down to actually, I think, a really important point, which is, it would be really useful to define the use cases that this scanning capability, integrated with the full node, is intended to solve and who the intended users are and what proportion of the network they represent. One of the reasons that I'm pushing back a little bit is that my perception at least, is that for something like a full node that is online all the time, an adjacent lightclient wallet that's connected, there are certainly sort of startup costs where in mobile wallet parlance, if you're recovering and wanting to scan the chain historically, then there are certainly costs that are associated there. But if it's more of a thing where you have a steady state, then I don't think that the costs that you're talking about that are associated with light client protocol are relevant.

[00:17:52] - **Str4d**

The costs are not just performance costs, they are security costs. Yeah, that's my point.

[00:17:59] - **Dodger**

Anyway, folks, we're going down rabbit holes here. We're going very deep down rabbit holes. So I'm going to call on Marek, I'm going to call on Daira, and then we're going to move on. And if we want to come back to this topic at the end of the call, you're absolutely more than welcome to. This is intended to be the core team updates portion of the call. 

[00:18:20] - **Marek**

That one of the reasons why we built the mvp is to have these discussions. And if there are any potential consumers of the future API, like users of the scanning, you're also welcome to contribute to the discussions and help us how we are going to design the APIs and how it's going to work. We can sort of adjust it for various needs.

[00:18:55] - **Daira**

Yes, a couple of things. First of all, I couldn't find the tickets on analysis of side channels on zcash Foundation Zebra. So if you can post links for those, that would be helpful. I don't think that the cost of streaming full blocks to another process on the same machine is actually very great relative to compact blocks. So I think that shouldn't be a determining design consideration and yeah, so the only other thing I want to say is that the important thing is that whatever protocol is used is carefully analyzed. We shouldn't be deciding on architectures in a few minutes.

[00:20:05] - **Dodger**

As both Marek and Pili alluded to, this is a prototype. It's based on an assumption that the ability to scan all transactions associated with a particular viewing key will be of use in use cases such as, for example, exchanges in a way that improves upon having the tightly coupled wallet that we currently have in zcashd.

[00:20:35] 

So what we're aiming here really is for progress, not perfection. And we will continue to iterate and improve towards hopefully use cases where this will get picked up and used. But yeah, there have been internal discussions about whether we should even store this information and I decided that we should for the time being because we can always choose not to store it in the future, hold memory and then be able to delete it and whatnot, or run it in separate processes or whatever.

[00:21:16] 

I think the discussion about how to improve the Lightclient protocol is an important one. We're not trying to solve every problem that Zcash has right now we're just trying to build some functionality into zebra that we think is likely to be useful to certain use cases going forward.


___

### 2. ECC Update - Sapling extraction / NU6 & Zcashd


[00:21:53] - **Kris**

Okay, so significant updates since last time is that we have more or less completed the extraction of the sapling crypto crate from Librustzcash. So the GitHub Zcash sapling crypto repository now has the updated version of all of the sapling code that's been extracted from zcash primitives and it's been restructured to follow the model that we developed for orchard and we've not yet cut a release of the sapling crypto crate.

[00:22:34] 

There are a few other changes that we're considering getting in before cutting a release, but kudos to str4d that major refactor is done. This will allow us to do a couple of interesting things. One is that for Brave's use case of zcash client backend, we may need to feature flag off sapling capabilities.

[00:22:58] 

And so this isolation both helps with decoupling the sapling functionality from everything else. We discovered a bunch of points of coupling that we had along the way and affixed those. So that's really nice. The other pieces that we're working on that are significant are adding orchard support to the Zcash client backend. That's also progressing relatively rapidly. And that's it. As far as Zcashd and the wallet SDK,

[00:23:35] 

There's also been a bunch of CI work going on for Zcashd, but that's less relevant to the ecosystem as a whole.

[00:23:47] - **Str4d**

Yeah. The other bit that is relevant to the ecosystem for that is we will probably be cutting a new release of Zcashd probably early next week, so that there's another release out ahead of 5.7.0 reaching EOS in mid January. But there's not much that's happened in Zcashd itself. It may include the updates to the sapling crypto rust crates if they're in time, but if we have that release out in time, but otherwise it will mostly just be a bumping the EOS height.

[00:24:35] - **Jon QEDIT**

Can I ask a question?

[00:24:37] - **Kris**

Sure.

[00:24:41] - **Jon QEDIT**

I was under the impression that we were deciding collectively to move to zebra as the focus for development. So does Zcashd work? Is that kind of like catching up or fixing ongoing stuff until we move to zebra, or is there new big things that zcashd?

[00:25:06] - **Kris**

No, I can answer that. So, right now, the majority of the network runs on Zcashd, and Zcashd will automatically shut down every, well, you know, 16 weeks after each release to allow us to get old versions of zcashd off of the network. And so we have to usually about every, what is it, 6 weeks?

[00:25:35] - **Str4d**

Ideally every 6 weeks. It's been stretching out more as we've been doing less directly on Zcashd.

[00:25:40] - **Kris**

Yeah, but we need to have replacement nodes available so that when existing nodes halt at their end of service, that users have upgraded so that it doesn't impact the functioning of the network. This also is one of those things where do frequently the things that need to be done if our partners are all used to updating zcashd regularly and Zebrad is also, to my knowledge, included an end of service halt, similarly. It's been incredibly important for being able to evolve the network to get old nodes to shut down.

[00:26:25] - **Str4d**

Yeah, but to clarify, the majority of what was described in this update was changes to the rust crates that are used by zcashd, by the wallet SDKs, and by Zebrad. 

[00:26:39] - **Daira**

I was going to say it's important to continue making zcashd depend on the most recent versions of the rust code, partly because that helps to test the rust code.

[00:26:56] - **Dodger**

Yeah. It's probably also worth mentioning that the process of sunsetting zcashd isn't going to happen overnight or even over the course of a couple of months. It's kind of akin to moving the world off fossil fuels. There's a lot that needs to happen before we can stop pumping oil and having cars run on petrol or gas.

[00:27:24] - **Kris**

And the zebra wallet work or scanning work is definitely an important step in that direction because the zcashd wallet does feature importantly in the current ecosystem, and we would very much like it not to.

[00:27:41] - **Dodger**

Yeah. And just to put that in context, our work in Zebra is not intended to build a zebra wallet. It is intended to provide functionality in zebra that will support external clients, including wallets that will be entirely separate from zebra, and to perform functionality that those clients will find useful and ideally improve the overall user experience of zcash in the longer term. 

[00:28:28] - **Marek**

Yeah.

[00:28:28] - **Nate**

One thing I wanted to point out is ECC has the intention to wind down our support of zcashd over an appropriate amount of time. But we're also planning to try to organize a task force to help us review all the stuff that we're maintaining to see if there are pieces that other people are interested in helping with or potentially taking over maintainership of and Zcashd could be one of those pieces.

[00:29:06] - **Nate**

So if there were any teams that wanted to continue maintaining it, it might persist. It's just that we plan to transition our future work to zebra moving forward. So just wanted to point that out. The ecosystem could go either way, depending on who else shows up.

[00:29:31] - **Kris**

I think that it's actually on me to really initiate the call for participation for that task force and I have not gotten to it yet because of everything else that's been going on. But the important questions that we'll want to answer in that task force are timely in that we have to decide what's happening with the network for NU6 and how we can transition enough of the network to zebrad for NU6, or what the scope of NU6 is in terms of what needs to be developed and how do we actually get the network to shift. So lots to work on there and I will attempt to get the call for participation out as soon as I can.

[00:30:32] - **Dodger**

Yeah. My kind of assumption stroke expectation is that just as zebra is adding functionality, like adding the ability to support a lightwallet, adding the ability to generate block templates as more functionality becomes available that doesn't rely on zcashd, it seems reasonable that over time, that functionality in zcashd would become unsupported.

[00:31:12] 

It obviously depends on whether there are use cases which would rely on two sets of functionality within a single node. For example, if we go to miners today and we say "you should switch from using zcashd to using zebra for generating your block templates", that's something they can absolutely do. But I would imagine that most miners also use zcashd for managing their block rewards and doing payouts and whatnot.

[00:31:44] 

So the two pieces of functionality, which fortunately in that particular case can be separated, they can run two separate pieces of software, or they could run, I guess, a lightclient to receive their payout. But there may be other pieces of distinct functionality that the user needs to or would prefer to reside in a single node, and that will have to deal with those as would come.

[00:32:13]

But I think over time, the overarching goal is for zebra to address more use cases and thereby allow zcashd to say, right, we no longer support this use case, this will not be upgraded or it'll be sunset until finally, perhaps zcashd could, if nobody else decides to continue to maintain it, which also is my expectation, then its functionality will shrink down until eventually the vast majority of the network has transitioned across to zebra.

[00:32:58] - **Kris**

Yeah, let me take a different view on that, though. There is a halving coming in a bit less than a year in order to meet the network needs of that halving full nodes supporting the halving have to be deployed by, let's say, at the latest July of this coming year.

[00:33:33] 

And if we don't want a chain fork at the halving, then both zcashd, if it were to continue to exist, and zebrad, would have to implement the same consensus rules. So if there is not a party that is planning to implement, let's call it NU6 consensus rules in zcashd, then there is some urgency to not just do this gradual process, but to actually shift the network rather rapidly to using zebrad exclusively, because otherwise we'll get to the halving and there just won't be a good set of consensus rules that is uniformly distributed across the network.

[00:34:30] - **Daira**

Agreed.

[00:34:33] - **Dodger**

The problem is, if we don't get enough of the critical use cases supported in zebra by that time, then does that then place a block on being able to do have a network upgrade.

[00:34:47] - **Kris**

I think that at that point, what happens is that NU6 just doesn't happen if we haven't upgraded the network. So yes, it's very important for, I think, Zebrad to achieve the ability to take over the whole network in the next 5 to 6 months.

[00:35:10] - **Jon QEDIT**

It's the first time I'm hearing a concrete deadline on NU6 by anyone.

[00:35:17] - **Kris**

I mean, if the dev fund is intended to continue, then, yeah.

[00:35:27] - **Nate**

It's certainly timely to begin discussing network upgrades, and we should get focused on that outside of core team update for Zcashd. But clearly there's a lot of related moving parts that we should be discussing as a group, so I'm hoping we can do that soon, especially as we sort of wrap up the NU5 retro, which I'm not sure when the next iteration is planned, but I hope you all can drop into that and participate.

[00:36:15] 

Just a comment on what Kris was saying. I personally would be an advocate for maybe separating out if there's a dev fund thing. I'm assuming we're presuming that the technical changes for that might be relatively modest, so it might make sense for us to separate out two different updates to alleviate some of that timing pressure. But again, I think we need to really discuss all these options as a group moving into the new year.

[00:36:49] - **Daira**

So the technical change that would be required for a continued dev fund is just to add a funding stream and both zcashd and Zebra already support funding streams as a general mechanism. So it's a code change, but it's a relatively straightforward code change that doesn't even, in principle need the technical expertise of the zebra and zcashd engineers. Pretty much anyone could do it.

___


### 3. Research & Implementation Updates i) Trailing Finality Layer update


[00:37:43] - **Nate**

The last big milestone was sort of publishing what we call [v0.1.0](https://electric-coin-company.github.io/tfl-book/) of the book, and that was coordinated with completing the first pass on the core consensus construction, which is called Crosslink.

[00:38:11] 

So now we're working on sort of three different tasks. The first is just to transition all the Crosslink writing, which is on Hackmd, over into the book, so that there's just one comprehensive document. The second is we're creating a simulator which we can use to sort of model consensus rules in a simplified manner that just focuses on what's important and that can model different kinds of attacks or edge cases. So that's coming along. I think the status is that it's able to simulate BFT protocol to some degree.

[00:39:04] - **Daira**

I'll talk about the simulator. So I've just finished implementing streamlet, which is kind of a pedagogical BFT protocol as simple as possible, and it works and in fact, the tests are detecting safety violations. So one of the things that we've considered doing is recording in the chain whenever a BFT safety violation occurs, so that everyone gets a proof that it happened. So making good progress on that.

[00:39:57] - **Nate**

the third sort of track is that we have just barely started with this idea of just creating a prototype that mashes together zebra and Comet BFT. Comet BFT is the new name for what used to be called tendermint because there was like an IP working issue.

[00:40:24] 

And so our current thinking for that prototype effort is we don't even know if that will fit the actual design we're working on, which we need to figure out down the road. But we just want to get familiar with how do we modify zebra in this way to make some sort of hybrid protocol just so we get that started really early.

[00:40:52] 

We're hoping to have kind of a milestone for all three of those things ready by the end of January. And I think at that point it might be a good idea, maybe in early February for us to give a more in depth presentation at arborist call so that we can get wider review of Trailing Finality Layer design and feedback and analysis. Does that seem good to you Daira, that timeline for us to give a presentation?

[00:41:27] 

Early February. I'm putting her on the spot. I was saying probably in early February would be a good time for us to give like a more in depth presentation to arborist about cross link to get wider review and questions.

[00:41:43] - **Daira**

So there's a technical question that might be interesting to discuss, which is whether you have basically a separate network of BFT proposers and validators. Currently miners while the protocol is still in the hybrid mode that are also proposing BFT blocks and I just posted, there we go. I posted a link into the chat.

[00:42:24]

The discussion of that option is at the end of that document. So the question then is, what are the trade offs for trust reliance? Because while the protocol is still in the hybrid mode, you're relying on miners anyway, so you can essentially not get any extra security by relying on some additional parties to propose BFT blocks. So that's worth considering.

[00:43:13] - **Nate**

One final bit about scope and context for that February presentation goal. Crosslink is a construction that treats proof of work and proof of stake mostly as black boxes, although there is some requirements it imposes on them. It modifies them to some degree, but it is agnostic as to many of the proof of stake features that are going to be really important, such as how does staking work? Can you delegate? How many validators are there? What's the yield? All of those questions are still not resolved at all at this part of the design, just so people understand the scope. So this is more focused on just the core consensus mechanism.

[00:44:08] - **Daira**

So if people have opinions about those things, where should they post them?

[00:44:18] - **Dodger**

There's two spots. So there's the [forum thread](https://forum.zcashcommunity.com/t/the-trailing-finality-layer/45133/20), and I think people have already been posting opinions there. The other option is to go to the [TFL book GitHub](https://github.com/Electric-Coin-Company/tfl-book) and file tickets. Either could work, whatever people are comfortable with.

[00:44:39] - **Daira**

Or if you're on the R&D discord and there's a proof of stake channel there.



___

### 3. Research & Implementation Updates ii) Zcash Sustainability Fund / ZIPs update


[00:45:08] - **Tomek**

So I can give an update. So ZIP wise, we have submitted a couple of small pull requests, one that [updates ZIP-230](https://github.com/zcash/zips/pull/745), which is about the transaction version 6 format.

[00:45:24] 

So we are adding the ZSF deposit field there and there is a small pull request that we have published as well that [updates ZIP-244](https://github.com/zcash/zips/pull/748), which is about transaction ids. So we want to update the ZIP-244 to include ZSF deposit and transaction ids and signature digest.

[00:45:48] 

Then there is, you have a comment there?

[00:45:53] - **Daira**

Yes. So zip-244 currently describes the signature digests for transaction v5. Obviously you can't change how those digests are calculated for v5 without causing a compatibility break. So there will be an equivalent of ZIP 244 for v6. That's probably where that change should be made. But yeah, the zip editors will have to sort that out.

[00:46:35] - **Tomek**

Okay. I wasn't sure about that. So thank you for clarifying that.

[00:46:39] - **Str4d**

Yeah, depending on the kind of change that's necessary, it might be possible to maybe compatible. But if you've written up the delta that is necessary, that will make it easier to determine whether it's possible to massage it into a form where like v5 would just ignore it and still get the same thing.

[00:47:02] - **Daira**

Yeah, this is ZIP-748. So let me just very quickly have a look at it. Right. So the way that change is currently described would break compatibility, but that's okay. It at least shows what's needed. Just to clarify, ZIP-244, at least in its title, doesn't mention transaction v5 specifically. So I'm not sure. Like if you look at ZIP-225. That's what references ZIP-244. I think so, yeah. It's indirectly, well, I'll check it. You should carry on. 

[00:48:00] - **Str4d**

ZIP-224 does reference v5 in a couple of places, but it does so in spots where the algorithm being described is used on both v4 and v5 transactions. The reason it doesn't mention it in other places is because in those other places, like for the transaction digest, that transaction digest currently is only used for v5. So it's sort of implicit. If we update it in a way to be v5, v6, then those distinctions of "for v5 do this way, for v6 do this way" will need to be introduced.

[00:48:30] - **Daira**

Yeah. So if you look at [ZIP-225](https://zips.z.cash/zip-0225), which is the v5 transaction format, it says that it depends on and defines modifications to the commitments defined by ZIP-244. I'd actually slightly misremembered that, but yeah, the dependency is there.

[00:48:57] - **Tomek**

Okay, so either there will be a new zip, or this one will be, I guess, kind of updated with the, and made it so that v6 handles it as well?

[00:49:16] - **Dodger**

I imagine that there'll be a ZIP-226 maybe.

[00:49:22] - **Marek**

I think 226 is already in use but there will be a new zip.

[00:49:29] - **Dodger**

Oh yeah. 230 is reserved for v6.

[00:49:32] - **Tomek**

So 230 will reference a new zip.

[00:49:37] - **Daira**

Right.

[00:49:37] - **Tomek**

The other thing we did is we have updated our third ZSF zip, which is the one about 60/40 transaction split. The one thing missing from there was an estimation of the impact that implementing this transaction fee split would have on miners.

[00:50:02] 

So I wrote a simple tool that estimates transaction fees based on past 100,000 blocks starting from a couple of days ago. And I implemented kind of a simplified ZIP-317 model to estimate what would be the transaction fees under that regime. I estimated that implementing the 60/40 split will result in around 800 coins being sent to ZSF.

[00:50:42] 

So taken from miners to ZSF, which is in dollar value, is around $24,000. That's per year. As I mentioned, I did a little bit of a simplification of the ZiP 317, because there is a dependency in there on the serialized length of transaction inputs and outputs, which my tool being written in a scripted language. I didn't have access to that because I had to, I guess, set up some bindings to the c++ code, or find out some way of calculating exactly what would be the serialized length of those transaction inputs and outputs.

[00:51:25] 

But I assumed that the typical length would be 150, which is what is mentioned in the ZiP 317. So shouldn't impact my estimation, I hope. 

[00:51:45] - **Nate**

I was curious, for that estimation, why you need. So it sounds like you're modeling ZIP-317. I guess I can see the difference, because another kind would be to just look at transaction made in the past 100,000 blocks and then multiply that by 60%. That doesn't anticipate everything transitioning to ZIP 317. Is that the reason you're trying to model Zip 317?

[00:52:25] - **Tomek**

Yes, and I was specifically asked to by one of the editors. I don't remember who exactly now, but somebody asked for it specifically.

[00:52:34] - **Nate**

Yeah, I guess ZIP-317 should make a really big difference, at least for larger transactions. I'm actually curious now about how big that difference might be.

[00:52:47] - **Daira**

By the time this is deployed, ZIP-317 will be fully in effect. So that's why the editors, I think, asked for that. I can't remember who it was. I might have been,

[00:52:59] - **Tomek**

I think, my estimation tool, if I remember correctly, I'd have to check again, but I think the average transaction fee would raise by, I think, 90x, 90 to 100. I think that was my estimation. 

[00:53:16] - **Nate**

Another thing is that if we're using recent blocks, that includes the spam, and presumably if ZIP 317 accomplishes what we hope, then that will go away. So I would guess that that would be an overestimate of how much would be deposited in ZSF.

[00:53:42] - **Daira**

Yeah. I think the intent was to filter out the spam transactions before calculating. But I don't know whether that's been done in that estimate, has it?

[00:53:53] - **Tomek**

That has not been done.

[00:53:55] - **Daira**

Okay. Maybe we weren't clear about that.

[00:54:00] - **Nate**

And is the estimate code like mentioned on the PR or otherwise available?

[00:54:08] - **Tomek**

I've added a reference to it in the zip.

[00:54:19] 

One more thing. I am currently, because we have started actually some implementation work on this for Zebra, for now, for the entirety of the ZSF. And I've started working on top of a pull request that is already submitted to the zebra repository.

[00:54:39] 

There is a pull request by Paul, I believe, who's working on Zcash shielded assets, and he has already created some. He's written some transaction v6 code, which we obviously need as well and just wanted to mention that I'm working on top of that pull request, which luckily seems to be in a decent shape. But obviously, there's no reason for me to duplicate the work and create conflicts and so on. So I'm working on top of that. For now, it hasn't been an issue. But just to let, I guess, everybody know that I depend on it. So I don't know if it's possible. It would be in my best interest for that pull request to get merged quickly and not change too much.

[00:55:34] - **Jon QEDIT**

I'll transmit the message on the not change too much. But the merging is not in our hands.

[00:55:44] - **Tomek**

Or maybe in some way we could extract the part that is common to both of our efforts. So just the introduction of the transaction, v6, because that's something I need, and I saw that there is some serialization code already written, but it's missing the deserialization code. So obviously I need the deserialization part as well. So we need to figure out who will actually write that.

[00:56:15] - **Jon QEDIT**

We changed the content of part of our deliverables to support this, regardless of ZSA. So if you have actual needs like the one you're saying, talk to us and we'll figure it out, its actually budgeted because we understood that we're doing here something that's wider than just ZSA. So talk to us.

[00:56:46] - **Tomek**

Okay, thank you.

[00:56:53] - **Daira**

Yeah. So can I ask an awkward question? Did you say $20,000 a year at current prices? Is this worth doing at all? Is that too little to make any significant difference or anything? Not sure if that's a question to me. Okay. It's a rhetorical question to the community.

[00:57:31] - **Nate**

My opinion would be that this is a) this change can be impactful if aggregate fees go up in the future and I think that it would be generally good for zcash if we can find a way for aggregate fees to go up, because that means there's demand to use the network. But also I would like to be able to keep typical fees low. So that implies scalability, and it implies use cases with lots of adoption. I think those are good goals.

[00:58:10] 

The other piece is that the ZSF is a mechanism we could use for any other new types of fees or anything else where there's something in the protocol that generates a stream of coins and there's a question about what to do with them or where to transfer them. One option would be ZSF, so that could come into play with ZSA's or like maybe some bridging things or maybe proof of stake or DeFi, basically any of those sort of mechanisms where there could be some sort of on chain fees, ZSF would be in place as an option.

[00:58:59] 

And using that option is a way to handle a particular case of mechanism design where sometimes you want to impose a cost on some participants, but it's not clear that transferring that directly to other participants would result in a good outcome for the whole system and in those cases, probably a good option is transfer to the ZSF because that can help maintain the network moving forward.

[01:00:19] - **Str4d**

I've got one, which I will now postpone to the ZSA update and then the other one was just a final note on what Nate has said, which is that in addition to anything where there's fees coming out, burning is another candidate for that kind of thing. Because burning in other protocols is removal from circulation and ZSF is by definition outside circulation. So that's another candidate for that kind of thing.

[01:00:51] - **Pili**

So with regards to the PR that Qedit has opened on zebra that the sustainability fund team is dependent on, there was there was no intention to merge this at all. It was at least not in the near future. It was just to ensure that the Qedit team were working in the right direction with Zebra and that we could see what they were thinking about and just kind of validate their approach.

[01:01:22]

So, having said that, we are happy with how it is, and probably you can rely on it remaining that way with quite high confidence. But I suggest you coordinate also with Qedit if you want to make any additions to it. You could also write your review or suggest updates to it as well. I think that would work well & the Zebra team can review them also and if we do need to have more coordination, maybe we can set up a call with our three organizations to coordinate that.

[01:02:05] - **Tomek**

Okay, thank you.

[01:02:07] - **Daira**

Yeah, so I'm just saying that I marked [748](https://github.com/zcash/zips/pull/748), which is the addition of the ZSF deposit to zip two four four is draft, because that can't be merged as is.

[01:02:37] - **Dodger**

Any other questions or comments anybody wants to make on that topic?

[01:02:40] - **Jon QEDIT**

Just the coordination about that pull request. Let's bear in mind that Christmas is coming, so if we can do it early it's better.

[01:02:53] - **Tomek**

Just to say again, I have had no issues whatsoever for now. I was just signaling that there might be some cooperation we might do. I don't depend on immediate cooperation for now from anybody so it's good.


___

### 3. Research & Implementation Updates iii) FROST demo / ZIP update


[01:03:28] - **Conrado**

So we're still working on adding communication to the first demo that we have, adding socket communication. So hopefully that will be finished by next week.

[01:03:40] 

There was another round of review on the FROST ZIP that has been ready for a while, but we're waiting for the security proof that Chelsea was writing but now resumed its review. There were some comments from Str4d, and I'm addressing them, but nothing major, I think. So I'm going to work on that. Also on the security proof itself. Chelsea wrote a paper, she asked me to write one section about implementation. So I'm doing that. And hopefully we also publish the proof, probably to eprint soon. Yeah, that's it.

[01:04:38] - **Str4d**

I had a question from someone that actually had asked a question of me and I hadn't had a chance to catch up on it, which was, for the FROST part that is tied into transparent signatures. Do you know why the library is giving out 65 byte signatures instead of 64? Which apparently the bitcoin schnorr defines 64 byte signatures. Is that? Because it's hooked into the older ECDSA style serialization? 

[01:05:32] - **Conrado**

So a bit confused by your question. You talked about using FROST with transparent?

[01:05:38] - **Str4d**

Someone had messaged me privately about using the FROST library from ZF and was seeing that for transparent, at least for secp256k1 signatures, it was producing 65 byte signatures, which suggests that it might be using the 33 byte point encoding rather than the 32 byte encoding that the bitcoin Schnorr spec uses.

[01:06:05] - **Conrado**

Yeah, just to mention that, just to be clear, Zcash transparent doesn't use Schnorr so you can't use it with the Zcash transparent transactions. But for Bitcoin, where we have taproot, which uses Schnorr, we have the secp256k1 cipher suite in your implementation. But that's not compatible with Bitcoin Schnorr it's the same curve, but it's just the format is a bit different.

[01:06:41] 

The reason why it's 65 bytes is just. We're following the NIST standard. Because it's a NIST curve.

[01:06:52] - **Daira**

The Sac curve. We are following the Sac standard and it's a byte.

[01:06:59] - **Str4d**

Yeah, I figured that was the case. Thanks.

[01:07:02] - **Conrado**

But just out of curiosity, there is a PR that someone opened on our crates to add the Bitcoin compatible cipher suite. And they're working on it. Someone else found an issue and they are solving that, which is cool. It's cool when contributors get to collaborate. So, yeah, there's a PR that should probably be ready at some point early next year, probably that adds a cipher suite, a frost cypher suite that's compatible with Bitcoin Schnorr signatures.

[01:07:45] - **Dodger**

I'm going to declare FROST for bitcoin off topic for this call now, again in the address.

[01:07:58] - **Daira**

Do you know if the NIST format signatures are variable length or are they always 65 bytes?

[01:08:06] - **Conrado**

They are variable length.

[01:08:09] - **Daira**

That's a poor design. Okay, carry on.

___

### 3. Research & Implementation Updates iv) ZSA update / v6 transactions


[01:08:30] - **Vivek**

To start off with the ZIPs. I think we mentioned last time that the ZIPs for the ZSA protocol on orchard have been mostly stable and we think they are mostly ready to merge at the moment. So that's, I think, mostly the same as last month. So we've also continued working with the Zcash Foundation and there's progress on the zebra front, as I think, like it came up earlier in the call. So we've added some initial v6 transaction support

[01:09:06] 

I think the specific PR that was mentioned is [PR 7978](https://github.com/ZcashFoundation/zebra/pull/7978), which I'll add a link to later on.

[01:09:15] 

We also need to set up a testing framework for Zebra v6 transactions. So we've been building an external tool to generate these v6 transactions to test on zebra, we've also recently been discussing our additions to the halo crate with folks at ECC to get things more in line for merging. So that's work that we've been doing. There were changes to the issuance authorization signature that I've been working on. So those are like, we've made some progress on that as well, and hopefully it'll be ready from our end shortly.

[01:10:01] 

This is all regarding the ZSA protocol. And so regarding the [atomic swaps proposal](https://docs.google.com/document/d/1MabmK6UAj946mOoFV5vR5XmgakCVVVazS1tsTU2M0gI/edit?usp=sharing), we've presented our progress on that front to ECC, and I think some of the discussion was based on whether circuit changes would be necessary. At present it seems that no circuit changes are required on top of the circuit changes that are already there for ZSAs. So that's nice. A point to the discussion that we are having on atomic swap. So everyone is free to comment on that. If they have comments. I will add a link to that as well. 


____

### 3. Research & Implementation Updates v) Proposal for ZSA Regulatory Compliance  


[01:10:52] - **Jon QEDIT**

Thanks. So in parallel to those efforts, we're trying to see if we have a role to play in making ZSAs, and broadly the Zcash asset, robust to the outside attacks. Talking about delisting and things like this, I don't know if you're familiar with this. There's a conversation on the aftermath of the binance interaction with the United States. Somehow the fallout of this is that there's requests to get more clarity on users that are sending funds to binance, what the source of funds is, and how to identify assets coming to binance.

[01:12:03] 

I think I'm not summarizing well the conversation here, there's a lot of really [long thread](https://forum.zcashcommunity.com/t/important-potential-binance-delisting/45954/100) about it. But my point is that we've proposed in the past, on the roadmap of ZSA to have a development on figuring out how to work with exchanges better and standardize what goes on in the note, when people need to find a way to show the exchange that they're linked to the transaction and find a way to do consent based identity linking to a transaction if you choose to, so that the exchange can verify who you are.

[01:13:04] 

That was a proposal that we put on the table at the same time as we worked on asset swap, and it was scheduled to start sometime middle 2024. So I think we're going to be looking at proposing to advance those features and try to see if we can help address the interaction with exchanges already now, just start working on a proposal to address these things earlier. So it's not concrete, it's only starting. But we have a few ideas on what can be done. We suggested them in the past but now it's becoming currently a bit more urgent. I'm going to pause here.

[01:14:13] - **Daira**

Okay, so my understanding from reading the thread is that the proposal is kind of an exchange only address type, which is like a T-address, but you can't send to it from a shielded address, so you have to send to it in transparent only transaction. What's to stop you in that case? Just generating a random T-address, sending your shielded funds to that, and sending from that to the exchange address. Is it just that that's no longer binance's problem, because the immediate transaction sending to them is transparent only? 

[01:14:55] - **Jon QEDIT**

So I read that proposal the same as you. What we're suggesting, at least in ZSA, is way more advanced than adding a hop of transparent address to the transactions. It's actually being able to demonstrate that you have some form one way identity in the notes, and then going to the exchanges and interacting with them, demonstrating that you have committed to that address yourself and you're standing behind that address. Basically forcing you in front of the exchange, not be anonymous on a particular address.

[01:15:52] - **Daira**

So where is that idea coming from? Is that just Qedit's proposal? What is the regulatory requirement that has led to, for example, Firo adding these exchange only addresses?

[01:16:18] - **Jon QEDIT**

We're talking about two different things. I started from there because it's a long thread with binance, and I started there pointing the need. But we're suggesting for ZSA to do something that is more involved than this one hop mega transparent, how do you call it?

[01:16:46] - **Daira**

Exchange Only. So I'm slightly confused. I haven't read the whole thread.

[01:16:54] - **Jon QEDIT**

What I'm talking about is not present in the thread. It's a proposal.

[01:16:58] - **Daira**

I understand that, but I kind of think that we need to have a very clear understanding of what the regulatory requirement is and not include anything that goes further in reducing privacy than what is actually required to keep the exchange support. Because the goal is just to keep the exchange support, if I understand correctly.

[01:17:32] - **Jon QEDIT**

So I'll try to sharpen this. The binance conversation is a symptom as far as I'm seeing it. They're currently under pressure and trying to figure out the way out of it for all assets, and Zcash is just one of them. But I really believe that if we want to have a robust ecosystem in particular, with the ZSAs that we're putting forward, at some point there's going to be dollars flowing on those networks.

[01:18:18] 

And when dollars are starting to flow, the pressure is going to be not indirect, but very direct on the ecosystem. So I think it's a good time to look faster at how do we keep the control on the consent for the user so that they can decide when they interact with exchanges to reveal whatever the exchange is asking, any way they're doing it right. When you're working with regulated exchanges, you're already in a context of revealing things and losing your privacy.

[01:19:02] - **Daira**

Understood.

[01:19:03] - **Jon QEDIT**

So we want to shield ourselves from having mechanisms that are all over the place when we can concentrate them on the interaction with the exchange. But that exchange does need to have, for its compliance, strong assurances on who's holding the assets and possibly where did they come from, and that require features that are just not present, not in Zcash, not in ZSA, and not in the ecosystem. We want to accelerate thinking about those features now.

[01:19:43] - **Daira**

I mean, if the exchange only gives out a deposit address to one customer who has been KYC'd, then is that not sufficient? Do they not trust the customer not to give out the deposit address more widely?

[01:20:06] - **Dodger**

I think that you're asking questions that nobody on this call is in a position to answer.

[01:20:11] - **Daira**

No, I understand that. I want us to clarify what the requirements actually are, but I'll yield to Kris.

[01:20:19] - **Kris**

Yeah, I was just going to also ask, in what respect does something like sharing an OVK not satisfy this requirement? If it is a well defined requirement to begin with, if you have a regime that is demanding some kind of visibility, that's kind of what viewing keys are for and viewing keys can be specific to individual accounts within a shielded wallet.

[01:21:11] - **Daira**

Or a payment disclosure for the particular transfers to the exchange.

[01:21:16] - **Kris**

Yeah, I think that the threat that regulators would likely like to make is that, well, if there's anything that we can't see about the source of your funds, then they're disallowed. But that threat is just essentially an unsupported demand for full transparency of the whole chain. So I don't think that we can start there.

[01:21:50] - **Dodger**

I think the right place for this particular discussion is that thread is that topic on the forums about this. I think there's nobody on this call who has been in those discussions with binance. So I think the right place is there. One thing I will say from personal experience of talking to regulated entities in my previous role at ECC is that the hurdle of being forced to introduce more or expend more engineering efforts and introduce more technical infrastructure can be a factor that will dissuade, for example, an exchange from doing that work in order to continue to support an asset.

[01:22:50] - **Jon QEDIT**

Yeah. Just to be clear, we're trying to think of ways that keep the court shielding and privacy for, for anyone that doesn't wish to lose it. And the, I'm, I'm spending a lot of time and energy trying to figure out what, what can we get away with interacting with law enforcement and interacting with active investigations that are looking at problematic transactions. I think the compliance of exchanges is the first place we meet those things. The impact is huge because if we do get delisted, it's not good.

[01:23:56] 

But we can solve this and remove a lot of future heat on the ecosystem by looking at proactively introducing things that put us on the good side without without making everything transparent. It's something that we're putting efforts, trying to come up with those solutions. There's obvious first steps such as standardizing what goes on in a note which you fully control as a user and you disclose if you want that we already think we should start implementing.

[01:24:57]

So the concrete thing I'm saying here is that we're going to be trying to see if we can help in this topic. But we also have things that For ZSA could be we already proposed that we think could be implemented faster than middle of 2024.

[01:25:23] - **Daira**

Does anyone know if the settlement with binance was public? I'm trying to find it.

[01:25:32] - **Jon QEDIT**

I don't think you'll have the logical chain of what it means for our conversation with zcash from a public source.

[01:25:42] - **Daira**

Okay, so the [FinCen consent order](https://www.fincen.gov/sites/default/files/enforcement_action/2023-11-21/FinCEN_Consent_Order_2023-04_FINAL508.pdf) is public. 

[01:25:54] - **Jon QEDIT**

Anyone that has ideas and opinions on this, I want to dedicate what time is left before the holidays to know at least who's got ideas on the topic because we're actively researching this. 

[01:26:34] - **Daira**

It seems to be focused on suspicious activity reporting and KYC. 

[01:26:53] - **Dodger**

One thing I'll say about regulations and things like that consent order is they are not technical requirements. They aren't a set of technical requirements that you can simply let them put. There is a lot more to this than just being able to say, this a final requirement that we can fullfil.

[01:27:20] - **Jon QEDIT**

I invite people, I invite people to go on YouTube to the ZK proof channel and go to the live tab. On [November 30, we had zkproof policy in Washington, DC](https://www.youtube.com/live/TmCoURJ-stk?feature=shared&t=971) and I invited the IRSCI person that investigates crime in digital assets. And on that panel, I asked him directly "Okay, you can't see anything on private chains, but that's by design. Which part of that is making your life complicated to do law enforcement?" And do you understand the need for privacy for us civilians against mass surveillance?

[01:28:13] 

It was like a direct conversation with trying to see if there's any way to do gestures that help when there's an extreme case that's needed without relinquishing the core of the privacy that we worked so hard to achieve. So that was a whole event dedicated to the balance between privacy and law enforcement.

[01:28:49] 

So when I'm saying we're putting efforts in this, this is something that we really take strongly because we see the benefits of shielded assets being deployed for the world. But we can immediately and directly see misuses that we would like as much as we can to avoid. So that's why you're going to be hearing me as now, trying to figure out what's the right implementation, not just to get away with like a binance ask, but to make sure that we send a signal to bad actors that you cannot use with total freedom from law enforcement all of the techniques.

[01:29:49] 

I'm apologizing in advance. I was the one responsible for the streaming of it and I was running the panel, which means that you can hear the voice, but you see us moving really slowly. If you google for ZK proof YouTube channel, you get the channel.

[01:30:45] 

The whole day was really interesting, with Justin Thaler describing some cryptography and Eran Trome describing some work he's doing on compliance. There was a demo.

[01:31:02] - **Daira**

Did you send that link to everyone? Because I know that the Zoom chat just randomly chooses who to send each message to. .

[01:31:14] - **Jon QEDIT**

In that conference I was deliberately trying to be controversial to the people on the other side that represent law enforcement, but also float some possible solutions and see what's their take. The session I'm talking about is the last session. It's the panel.

[01:32:02] 

That's for now, again, I'm interested in gathering all of everyone's opinions on this. It's an important topic.

[01:32:30] - **Dodger**

Yeah, I think it's a topic that we need to think about in a practical sense. On the one hand we don't want to be seen to be bowing to, or we don't want to bow to pressure. On the other hand, if adoption of Zcash becomes massively obstructed, then that also conflicts with all our goals.

[01:33:05] - **Daira**

So it seems to be that regulators have this instinct that in order to have better compliance, you need to force transparent usage of the blockchain. But actually that reveals the information to everyone, not just the regulators. And in fact, if, say, you were to pay to a shielded exchange address, then you could include a memo which could include everything needed for the travel rule. It's not clear that transparency is the actual.

[01:33:53] - **Jon QEDIT**

I'm voting for that one. That's what I'm saying. I think instead of trying to wiggle our way with some half baked transparency stuff, we should probably do it proper and show other privacy applications how this should be done for real. This came right after the digital dollar project conference, where there's like 250 people that assembled in DC to talk about what the dollar would look like, and they all were saying the same thing. We need zero knowledge proofs for privacy. Basically. That's already established, so need to show them how it's done. It's not by transparency.

[01:34:40] - **Daira**

Agreed and in fact, transparent transactions should be ruled out just for regulatory compliance reasons because they reveal information to people who shouldn't have it. It is a regulatory issue.

[01:34:55] - **Jon QEDIT**

I think Europe will be going that direction by the way, I'm pretty certain that at some point they'll outlaw regular unshielded money transfers.

[01:35:13] - **Dodger**

Another kind of side question this raises is: Is it reasonable for a zcash user like binance to want to be able to control how they receive funds? I think if binance could, they would tomorrow flick a switch or set an option in their zcashd that would allow them to refuse to accept transactions from a shielded address.

[01:35:50] - **Daira**

And for the reason I pointed out, it would do them no good because people would just use one off random T-addresses to bypass it.

[01:36:01] - **Dodger**

Not going to argue with that. But the question still stands. Is it reasonable for them to want to do that? Or should people who are supporting Zcash accept that this is the way it works. It's intended to be private and shielded, and if you don't like, you know, tough, in which case then the expected response from someone like Binance would be to say, right, well, sorry, but we're not going to support zcash anymore.

[01:36:32] - **Kris**

I mean, we can also remember that regulated exchanges in the United States do support zcash and support transfers both from and to shielded addresses and so this is binance not wanting to do extended due diligence.

[01:36:52] - **Dodger**

Yeah.

[01:36:54] - **Jon QEDIT**

What do you mean by extended due diligence? I might have misunderstood.

[01:36:59] - **Kris**

This is the additional KYC steps that, for example, Gemini and Coinbase and other regulated US exchanges take to identify their users.

[01:37:10] - **Dodger**

Yeah. And that often is a purely commercial decision because of the extra cost that's involved in doing extended due diligence. If they aren't seeing enough revenue from a specific coin that they are incurring extra cost in extended due diligence and to support, then that will often become a very simple commercial decision.

[01:37:37] - **Jon QEDIT**

There's an option to do extended due diligence on the zcash blockchain. Most people use chainalysis to do some due dilligence.

[01:37:52] - **Dodger**

This is doing more than just gathering the simple KYC information. This is a non-technical concept of doing further investigation, asking the person where they're receiving the funds from, can they provide proof of where the funds are from.

[01:38:14] - **Jon QEDIT**

The thing is that when you ask those questions, you often have a need to have unbiased outside sources to recoup the answers that you're getting, to cross examine the answers that you're getting and when everything is unattributed and completely private, it makes it very difficult for those due diligences to achieve that.

[01:38:48] - **Daira**

Customers have the right to privacy. So if I pay a merchant in cash, the merchant can't ask me where that cash came from. I know there are restrictions on moving cash across borders, things like that. But either you accept the principle that privacy includes financial privacy, or you don't and it seems like the regulators don't and that's the underlying problem.

[01:39:28] - **Dodger**

The exchanges are regulated as money transmitters and I've never done this personally, but I've got a sneaking suspicion that if I were to show up the office of a bank or a money transmitter or a similarly regulated organization with $20,000 in cash, they would want to conduct a fair amount of privacy piercing and due diligence on me before they would accept those funds.

[01:40:00] - **Jon QEDIT**

I've actually done it for years, and my brother is doing it at bits of gold in Israel. Not going with dollars, but being on the other side receiving just Bitcoin and Ethereums and other assets. You have the tools that kind of de anonymize using chainalysis, which is unfortunate that it exists, but it exists, but you also ask questions of source of funds and you look at people in the eyes, try to figure out if they're bullshitting you or not, because you have to do it because there's a certain percentage of users that are actually coming with illegitimate funds and you need to catch them, and also because the regulator is forcing you to do it.

[01:40:45] 

But my point is that we need to at least have some form of tools that would deter those that think that because every transaction is completely unattributed, they can use that to just say, well, I can't prove to you anything so I won't tell you the source of funds and you have to trust that it's legit. When it comes to due diligence, it becomes difficult. I think that's why exchanges have difficulties doing those due diligence, but law enforcement have much more difficulties that's the real target.

[01:41:45] - **Daira**

But I mean, where the funds came from in a high level sense, what did you do in order to get that money? Is an entirely different kind of question than what address did the money come from? And you don't need to answer the latter in order to answer the former.

[01:42:12] - **Jon QEDIT**

No, I agree. As I'm saying, I think there's tools that will allow to show that when an exchange is asking for trying to establish clearance, you might be able to have to show that it left another exchange it saw everything. It made a few hops, and now I'm presenting it to you. And those hops never travelled through the currently under investigation 100 terrorist list or something like that. Is that something that doesn't disclose too much of privacy to anyone?

[01:43:02] - **Daira**

I mean, it discloses a lot.

[01:43:06] - **Dodger**

Okay. As with our previous discussions during this call, we've been on here now for 1 hour and 47 minutes. And I have to say that I did not think we are going to resolve this issue on this call.

[01:43:23] - **Jon QEDIT**

Happy to take it offline and discuss it because again, I want all of the ideas.

[01:43:31] - **Dodger**


I think those of you who have questions regarding the binance thing. Like I said, nobody on this call has been involved in those discussions with binance. The right place would be to post them to that [thread on the forums](https://forum.zcashcommunity.com/t/important-potential-binance-delisting/45954/100).


_____

### 4. Wrap up and Closing


[01:44:13] - **Nate**

i was just wondering because there were a lot of topics people wanted to dig deeply into. I'm wondering if we should have another meeting or if we should start scheduling an agenda for the open discussions. Here are a set of topics people want to dive into so we can have an open discussion that's fully focused on x or y. Because I feel like there were 4 or 5 topics like that this call where people seem to want to keep digging into it, maybe that could be a smaller group. I'm just wondering how we can scratch people's itches.

[01:45:01] - **Dodger**

If there are specific topics that people want to discuss email arboristcall@zfnd.org and let us know.

[01:45:15] 

We're going to take a break over the holiday period and our next call will be on the 11th January in this earlier time slot of 15:00 UTC. So happy holidays to everybody. So with that, let's wrap it up and everybody have a good holiday and we'll see you all in approximately 4 weeks time. 

____



**Next Meeting Scheduled: 15:00 UTC Janiary 11th 2023**


___
___
