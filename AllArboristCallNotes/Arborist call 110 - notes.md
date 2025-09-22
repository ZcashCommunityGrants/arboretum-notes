Arborist Call #110 Notes 

Meeting Date/Time: 18 september 2025, 15:00 UTC

Meeting Duration: 1 hr 21 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro)

Zebra Update [zebra](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates [ZSA](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets)/ [NSM](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)/ [Crosslink Trailing finality layer](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updatesshielded-labs-and-ecc--crosslink--trailing-finality-layer)

Open [Announcements](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded])(https://www.youtube.com/watch?v=2tENS3Sb_jM)

Moderator: Alfredo

Notes: chidi [@zcashNigeria](https://x.com/ZcashNigeria)

## Full Notes

## Welcome & Meeting Intro 

Alfredo: 00:1:03  

Thank you. Welcome to today’s Arborist Call, September 18, 2025. On today’s agenda we have updates from the Zcash Foundation, Zebra team, and ECC. We’ll also touch on Zaino, shielded labs work, the Network Sustainability Mechanism (NSM), and cross-link with ECC. At the end of the call, we’ll have an open discussion on cross-link tokenomics.

For anyone new here: the Arborist Calls are our weekly protocol development syncs. Core contributors gather to share progress, discuss timelines, and align processes. These are open calls—anyone is welcome to join. You can find more details and ways to get involved at zcasharborist.org.

Let’s begin with the Zebra team update,  that's myself. 

## Zebra Update 

So in the last two weeks or so, we finished the get raw transaction which had missing orchard fields. So finish that. It was Conrado that did most of that work. Then in the get address, transaction, IDs, RPC method, we were supporting an object argument, which was the most complex thing to do, but there is a single option for the arguments. It's just string, and we just added that in the last two weeks. It was from an external contributor called cseri that has done a bunch of stuff in the last two weeks with us. Yeah, we are very grateful for seeing that kind of contribution. The same person also working with Conrado in adding the get mempoline for RPC method, which is one of the RPC methods we have missing for zcash deprecation. Then the same contributor improved error propagation to one of our types, which we had been since a while, and now it's done, which is a good refund term. You had a lot of smaller contributors that helped us fixing specific tests I was working on improving the Python test framework in regards to the argument passing to the binaries. And with that, we were able to add a feature, Nu 6.1 test to test the disbursement, which went pretty much okay. Arya added the C feature variant to network upgrade, which is something several teams were requesting to us so they can develop their own stuff for future network upgrade. Now, zebra supports that we removed a lot of custom code from sapling. We moved to use the sapling crypto crate  upstream. Removed a lot of code. We weren't able to remove it all, but we got rid of a bunch of it, avoiding duplication. We updated contributor guidelines, so if you are a contributor, please take a look. We added two new items, I think, and then a big chunk of work Arya mainly did is to back up the last 100 blocks from Zebra so the non finalized chain. When you restart zebra, those blocks were lost, and they have to be downloaded from the network. Again, we are saving those blocks to files. And when you restart zebra,  you start at the exact point that you were before you shut it down. We added a Python test for that as well as a rust test, so we seeing, we have the feature pretty much covered. But you know, if you can give it a try, we'll be great if you find bugs. And then there was a lot of CI refactor work that Gustavo is working on, and the zebra CI is a lot simpler now it's a lot more stable. So the prs are getting measured faster, which has increased the productivity of the overall zebra team. Also, Marek is back with us. He was on a sort of vacation and professional development, and went to some conferences around the world. As far as you know, now he's back working with us. We expect to have more stuff done for the future. Now that Mark is back, we have PR for zip  213, which is about supporting shielded addresses in the Coinbase transaction for the miners; we expect they resume the work there. We have had PR since a while to add flight client support to zebra, and we see that these functionalities may be better for zaino. So we have to discuss, if we move the functionality there, I guess that could be a good topic for discussion as well. And that's related to the guidelines. I mentioned it before. One of the things we added to the guidelines is that if the functionality belongs to zaino, or zallett, or anything like that, we will try to move it to the corresponding repositories, instead of adding more functionality to zebra, trying to achieve the old dream of just being  node consensus software, but yeah, at least we are not going to be adding new functionality if it can be added to somewhere else and belongs there. Then we have an external contributor working on get network info, which is another RPC  support for zcash deprecation. Conrado is working on get route transaction side chains functionality that we don't have. And we have few open PRs about the health endpoints, which  Qedit, Gustavo Emerson and  other people  are requesting to have that functionality. There are different ways to do it, and we're trying to agree on one of them, I guess that's pretty much for zebra. Any questions? Okay, let's move to the ECC.

## ECC Update 

Kris: 00:08:37  

All right, so the major announcement for this morning is that the zallet alpha is out. I will post in the chat the URL for the documentation, but you can get that at www.zcash.github.io/wallet and there are both Docker images available under the electric coin code Docker Hub and Debian packages available for the Zallet alpha. The second major effort has been to get the zashi cross pay functionality out so you now, from your zashi wallet, can make cross chain payments via near and we are also getting quite close to the reverse swaps  into zashi from arbitrary coins facilitated by zashi. I did my first one yesterday, and it was awesome. I just, you know, opened my Metamask wallet and scanned a QR code and swapped directly from Ether into zec. So that was pretty cool. So that's nearing completion. The next major thing that has been completed recently is we've made a bunch of progress on the Rust implementation of the Zcash script interpreter. That code is actually getting to be really pretty nice at this point. There are two more PRs that we are working hard to get merged with the goal of getting the last of the Zcash script functionality that we need into the wallets for the purpose of doing key Generation for the mainnet nu 6.1 release, which is the next major effort on our plate. Strad, is there anything that I'm missing there?

Str4d:  00:10:53  

No, I think that covers it.Main thing I'll point out for the alpha is, as it says on the front page of the documentation, expect things to break as changes are made. We are not currently at a point where you won't need to, like, recreate your zallet wallet from scratch, so as a result, expect to go in and hit a bunch of edge cases when you're using it. Please tell us about those edge cases so that we can improve them.

Kris: 00:11:25  

Yep, the other, the other important note there is that this is not, you know, the alpha that we have released is a essentially a minimum viable set of functionality, but it is, it does represent most of the functionality that we hope that users will be able to migrate to, there is a page on that documentation site that describes the differences from the Zcash D RPC API. There are a number of RPC methods that we are opting not to support for now because we believe that the replacements are better than  what was originally available and have fewer corner cases. But if there are RPC methods that you really, really need that are not currently supported, please talk to us and let us know why it is that you're not possible to migrate to the new and improved RPC APIs.

Alfredo: 00:12:36  

Oh, there was a massive contribution from you guys, a huge amount of pull requests into the zallet repository in the last two weeks for the Alpha. Any questions for the ECC? Okay, let's move on to zingo labs. Do we have anyone? 

## zingolabs updates - zaino

ZA: 00l:13:08  

We have been working on supporting the zallet release. We have a get transaction status and get snapshot methods in flight. Some of those are waiting for review. Should land shortly. We are consistent with the ZF guidelines to use the best implementations across the z3 space. We are deprecating some bespoke deserialization we had in Zaino. We are deprecating a local cache we had in zaino that is coupled to the deserialization those we expect to land this week, we have been migrating to the get snapshots API that Hazel implemented, and we recently completed disentangling a bunch of dependency snarls that allowed us to upgrade to network, upgrade 6.1 which has had some positive side effects on zaino. Now we've scoped all of our work in a GitHub project that we targeted to be complete by next Friday, and I think it's safe to say we're on target. Yeah.

Alfredo: 00:14:23  

Cool, thanks. Any questions for zingo labs? Okay, move on to the zcash deprecation update. I'm not sure Pacu is here.I think he is  not, a lot of stuff in the zallet, zaino and Zebra is in this call right now, so I think it's pretty much covered. I don't have any specific update to say here, but if anybody has something, please speak now, or we move on. Okay, let's move on. We've got people from Qedit. Please go ahead.

## Research and implementation updates- Qedit Zcash Shielded Assets

Pablo: 00:15:15  

Hi guys. Can I share my screen for this?

Alfredo: 00:15:21  

Yeah, let me stop sharing mine. Okay,

Pablo: 00:15:29  

okay, so we continue to develop Zsa across multiple crates. We had a meeting today with ecc. Starting from ECC, we showed them our initial implementation for sighash versioning, and we got his feedback. So sigash versioning is an additional byte that is currently attached to sig hash, and the idea that in the future we can potentially change the SIG hash algorithm to a different algorithm without changing the transaction format. So we are adding a version to the SIG hash, and this is applicable to Orchard in the future. Currently, we have orchards Zsa, but in the future for swaps we will need a different sig hash algorithm that will hash every action group independently, instead of hashing the entire transaction as it is done today. So this is the preparation for the future, but the zip editors decided to do this, not only for orchard, but also for sapling and transparent. So we discussed, since we are already doing this for orchards Zsa it makes sense that we will do this change for sapling and for transparent as well. We discussed the best way to achieve this across the crates, and we decided.  together to move a lot of this logic closer to the transaction encoder decoder in librustzcash, having some mutual logic here. And of course, we need to change each one of these to support the sighash versioning. This is one thing. We continue with the changes propagation. So there were zip changes that started in orchards at the same but they need to be propagated up in the stack. So we are propagating them into LibrustZcash and zebra. LibrustZcash  it's not one crate. It's multiple crates. So this is in progress. We also discussed the orchard Zsa review. So the orchards zsa review is a big piece of work. In order for this to happen, first of all, the zips related to Orchard Zsa need to be frozen. Basically no more changes. Okay? We say, as a community, we say that we reached a point where we included every feature that we planned, into these zips. And to say, freeze, of course, we can do bug fixes if we see that the implementation requires it, bug fixes can be made. But generally speaking, we cannot. We cannot review orchard zsa, if the zips are being changed under our feet, so we have this at the same time, other work for orchard, at least for the review period, it is recommended to stop other other changes in orchard that are not related to orchards zsa and when we have these two, we will do with the ECC team back and forth as much as needed to enable this review, we are fully available for this. We're just waiting for the mark. So this is on the subject of orchard zsa review, next we are also working on integration. So we discussed with Strad this week, what is the right point in  upstream for LibrustZcash that already includes the NSM changes. So we can embed the NSM changes into the transaction v6 format. Basically most of the transaction v6 format are Zsa related, so we have a working version of this. But for the sake of integration, we're also embedding the NSM fields. So we discussed  the upstream PRs in LibrustZcash that we need to catch up first in order to do this integration.So this is happening as well.
 
Next, we started the mini Working Group. Kris started it and Alfredo, this is around wallets. So the idea is that currently we have a  bi weekly meeting with kris, Alfredo, Aria Alex from our team and myself to discuss how we can promote from our side, we are helping with the ZSA features into the wallet. So even the Zcash backend client is a crate under LibrustZcash. So even before submitting the LibrustZcash changes for Zsa, we are already in discussions how this will look on the wallet side. So we are advising on wallets and also on fees. There are changes in zip, 3174, Nu 7 to support zsa. So the issue bundle, for example, needs to be taken into account. So all of us are working together to promote the wallet integration of the ZSA side. Alfredo and Aria already started the work and submitted where we were. We are looking into this. We saw the message, so we have this, and also we're working on zebra, the ZSA version. So we had the web discussion this week with the Zcash Foundation. We suggested the health endpoint today, when we copied our work to upstream independently, we we discovered that there were some upstream changes been done that we cannot copy the health point as is, as we presented yesterday, because one of the crates was replaced with a fork. So we work around this, we will prepare a new version, and we will submit it as discussed. Also, a lot of happening in zebra, and we see it as a consumer, basically. So we have  our own fork, our own fork of zebra. So some of the effort that we are doing is to catch up with upstream. So we are in the process of updating the latest zebra work into our branch, in order, so in order for us to continue the development and  the overall task for zebra, the overall challenge is to add state management and the consensus rules. Consensus rules are dependent on state management. Once we have state management figured out, we will lay out all the consensus rules that are written pretty clearly in the zip. We have this. This is, this is our update.

Alfredo: 00: 22:49  

Any question for Qedit? Okay, I try to share my screen again. Okay, let's move on to shieldedlabs  NSM

## Research & Implementation updates. Shielded labs- Network Sustainability Mechanism

Mariusz: 00:23:18  

So regarding NSM, we are  waiting for the Zcash test vector PR, 101, to be merged. I think all the comments are addressed now, and the PR was also rebased recently, as for the zip 233, zebra PR, I have rebased it recently after the latest changes done to the LibrustZcash so that I could get rid of those patches for  LibrustZcash, I saw the problem is with the with the CI, With the automated test. There is one test that uses all features flags, and that test is failing because we are missing the Nu 7 Zcash unstable flag that is parsed to the librustzcash. So when the all features flag is enabled, we are using the takes version six flag also then, and that flag actually requires the LibrustZcash to be compiled with the Nu 7 Zcash unstable flag.

Alfredo: 00:24:34  

So what changes are needed in LibrustZcash or in zebra?

Mariusz: 00: 24:39  

No changes needed. Actually, the thing is that to be able to use the Nu 7 in zebra, you have to compile LibrustZcash with the Zcash unstable flag. Nu 7. And in the automated test, the Zcash unstable flag is not of a set, for the librustZcash

so that test is not passing.

Alfredo: 00:25:10  

Yeah, yeah.I'm not sure what we want to do if we want to pass it in the test. Using that, what

Kris: 00: 25:19  

What we do is we have, you know, separate test tasks and CI that enable the Zcash unstable ,the various Zcash unstable flags to ensure that we build with any of them. So just just separate, so we don't necessarily always run tests. I think, with the Zcash on stable flags, we do run builds,

Str4d: 00:25:44  

And we generally, at least initially, we have, we generally have that logic set to allow those to fail, and the PR can still be merged, so it's not blocking on the PR, because there's still flux, like the in Zallet, for instance, Right now Nu 7 test build doesn't pass because we're built on a version of zebra that couldn't build with Nu 7

Alfredo: 00:26:12  

Okay, let's see how we can go over that, either by ignoring the test or by a different CI round or something like that. I'll take an action here to start an issue in zebra for these so we can discuss further.Anything else for NSM,

Mariusz: 00:26:38  

it's no it's everything from my side?

Jason: 00:26:41  

One question that I have is we haven't really started to rebase or try to integrate zips 234 and 235 and now it sounds like we're pretty close to getting 233 merged or merged to main, at what point should we? Should we start working on those other two zips? From the Zcash Foundation's perspective? Like, is it too early to do it now?  Kris, do you have any insight into that?

Alfredo: 00:27:38  

You're muted. Kris,

Kris: 00:27:40  

I was. I was going to say I don't have a strong idea right now, as Arya is probably the right one to answer this. But yeah, I have not been thinking about the NSM much in the last couple of weeks. Is there a librustZcash PRs that needs to be merged  and rebased. I think that the only things that zebra PRs, yeah, no, I'm just contemplating what might be use. yeah, I can't think of anything  that would still affect Librustzcash at this point, except for potentially. I don't know how the transaction construction for Coinbase outputs right now, Marek has an open PR for that that I think has some comments on it that need to be addressed. But beyond that, for the changes in fee distribution, there will probably need to be some changes to how Zcash client backends transaction builder is used, but I don't know if that requires additional changes to the builder right now. Nate,

Nate: 00:29:23  

Yeah, this is a slight tangent, but because I haven't been paying attention to the NSM directly either, but over in crosslink land, we are starting to mess around with transaction types and so, you know, Zebra has some of its own types, and then LibrustZcash has some types. And there's like overlap and scope, and I know that there's plans to change some of that specifically, like the transaction type that's in each code base. And I was wondering if we could have, like, a roadmap meeting focused just on that issue of overlapping scope between librustZcash and zebra, just so that, I mean the timing for us would be nice, before we really get into the thick of it if we know about any big structural changes coming up.

Alfredo: 00:30:32  

Yeah, that's correct. In the zebra we want to change the transaction to use the one in librustzcash.but we were requested by qedit to do that after their code is merged because they constantly have to make changes 

Nate: 00:31:00

So again crosslink in this prototype phase we arent too worried about merging the upstream code bases but i am wondering if we want like a development branch or something that all of the teams are aware of and looking after , Afer zsa lands for post Nu 7 we know we want to make this big event , should we start working on that now , otherwise for crosslink we can , by the time we want to start preparing production for the actual code it will be need to sought of tailor our efforts ,the timing for that could be next year, its not urgent 

Alfredo: 00:32:54

So we kind of move it to the future, and we're not kind of planning on that, but we know it's going to happen. We're unsure when, but at least we want it to happen.So in the last few weeks, I was working with Conrado in a big refactor to zebra for sapling code. We have all code duplicated. We could use something quick to do pretty much the same. And the same happens with orchard, and we are not doing that now, at least because of the same reason, like the Qedit team  has a lot. Would like it to keep it like that for now? Yeah, we can definitely talk about it. Yeah, go ahead.

Nate: 00:31:34  

Yeah, okay. I mean, we could talk more about it. Would it help to have, like, a roadmap planning discussion across orgs for this topic, even though it's early, like, you know, if we plan on starting those efforts next year, it might be good 

Alfredo: 00:31:53  

Yeah, I think so. I think we can bring other topics that are related to that. Like, for example, I mentioned in the zebra update that we have PR for the flight client functionality. We think that feature belongs to zaino, so, there are things to consider in the future. The worst stuff is going to be any single source of truth for certain types that we can depend on where they are going to be located, and stuff like that could be valuable to discuss as well. my opinion. Anything belse from shielded labs . move on to crosslink

## Research & Implementation Updates.Shielded labs and Ecc- Crosslink- Trailing Finality Layer

Nate: 00:32:33  

After we wrapped up the last milestone 3, we worked on milestone 4, the way 1,2,3 and 4 where classified was 1,2 and 3 were nice  and  for 4, we decided to split that up into smaller chunks which is easier to do each roughly 4 to 6 weeks . each one is focused on quality of life improvements for developers. So the one feature change we're looking at is the previous workshop to get onto the BFT roster. We had a special BFT field or message, and now we're moving that into the normal Zcash transaction, because part of the design we're working on has kind of a an invariant that all changes to the proof of stake state outside of running the actual BFT protocol happened through normal Zcash transactions. So that's the only sort of like feature code change, but ideally to the user's point of view. For a workshop, nothing changes, except everything could run smoother. So there's a lot of auxiliary changes, like there's a lot of confusion about the config file, so fix that up, improve CI and continuous deployment and stuff like that, so that the next workshop can effectively be a repeat, but hopefully just a lot smoother. So that's the first thing we're biting off. And then the next ones are. So the next milestone, after this current one we're working on, which we're calling 4A or4 B, the goal is to sort of couple the roster status to testnet z,. So at that point, we'll have to figure out, like, for workshops. Are we going to have, like a test net faucet or something, but that will be like the beginning of actually having a proof of stake system, but that the staking and unstaking rules will be as minimal and simple as possible. After that, we have a 4c milestone to add more restrictions and rules about when staking can occur, where there's time quantization and amount quantization and unlocking periods and so forth. And we wrote a blog post about that, and we've gotten a ton of feedback, and we've learned a lot of people who like stake but don't like lock ups, which, yeah, so we've learned that, and now we're trying to incorporate a lot of feedback and figure out How much do we want to adjust that design to find a good point for trade off curves and so we are going to keep having discussions about that and again that milestone where want to implement those pieces is two milestones out, we will probably  start on the software development part, Let's see September, October, probably the end of, like November, or, I guess, December, sort of the black hole month, so maybe January timeframe. But before then, we're going to be having lots of discussions. So that's our status update.

Alfredo: 00:35:52  

Cool. Any question on,

Nate: 00:35:55  

yeah, one other piece is the next workshop. We're trying to figure out the date, but we hope figure out a date and publish that next week, but ideally it'll be like early October, ish or mid October.

Alfredo: 00:36:14  

This is in discord?

Nate: 00:36:19  

No, we're gonna move away from discord, because that did not work well for Okay, most, most participants.

Alfredo: 00:36:33  

I tried to be in a workshop in discord, and my microphone just didn't work for some reason that it's still trying to figure it out.

Nate: 00:36:45  

yeah, we learned a lot of like, just practical workshop lessons like, don't use discord, make sure we're in a good co working space with good networking stuff like that.

Alfredo: 00:36:58  

Any question for crosslink?

Pablo: 00:37:00  

So one comment about the issue that Nate brought up earlier, the issue of duplicated structures in zebra and orchard and LibrustZcash for sapling. So indeed, zebra re implements significant parts of the protocol, and this is a pain point. This is a pain point for the project. And we consulted the Zcash foundation people, and they said that there is a plan to consolidate both implementations. We ask them to wait, because doing this now basically unrolling the year of changes that was done to support Zsa  on the current re implemented zebra structures. But going forward and long term vision. This mission is critical, and we fully support this. We said that we will fully support this. It's just a matter of picking the right timing, and maybe the right timing is somewhere not too far away from this point in time. So yeah, we're here, and we're familiar with this, and we are here also to help also, either look on the cross link, fork of zebra and this week, and it is massive, the scope of changes is significant. I had a really quick look, and I'm looking forward to see how this develops. 

Alfredo: 00: 38:37  

cool, yeah, we are kind of in agreement with that to keep the times for now so we can make the change we the community really wants the shielded assets to be there, so we are prioritizing that, waiting for the factors. Okay, let's move on to open announcements. Is there anything anyone wants to announce? If not, we can move to open discussion. Then I know we found the crosslink tokenomics  from Jason or

## Open Announcements 

Nate: 00:39:22  

Oh, yeah, I had an announcement. It's just kind of a fun thing if you use X. I posted a bunch of polls about the design space related to crosslink. But I'm also hoping people from other communities weigh in, because actually, I've seen a thread where people are criticizing ethereum for how it made some of these design trade offs, some experience too. So if you're interested, go check that out. It's no biggie, though. I mean, it's a poll.

[polls](https://x.com/nate_zec/status/1968682560344445187)

## Open Discussion 

Jason: 00:40:00  

Okay, I'll start off with the tokenomics. So like Nate mentioned last week, we published a blog post on tokenomics before we get into the conversation. I just wanted to give a quick overview of the design and rationale behind the features that we chose. So for crosslink, staking takes place within the orchard pool. When users stake, they delegate their zec to a Finalizer of their choice, which makes them eligible to earn rewards. When they decide to unstake their zec is unlocked, and it has to go through this 30 day unbonding period before it can be spent again. For security and transparency, the total amount that is staked and delegated are disclosed so that the overall staking levels and the distribution across finalizers can be confirmed and verified for privacy. Crosslink uses quantization in both time and amount. So staked amounts can only be committed in exponential increments of like 10 100, 1,000 so on, so forth. And then staking, or unstaking, can only occur in these fixed 10 day intervals. And the purpose for the batching and the amount quantization is it makes it harder for observers to link staking actions to specific individuals or accounts or infer exact balances. Then the there's a 30 day unbonding period, and that serves both security and privacy. For security, it creates a window to detect and address misbehavior before funds are released. And when we were modeling this out, some of the examples we were thinking about were potential attacks like the Ethereum Dao hack, the rollback attacks against Ethereum classic, or Zen Justin Sun's  attack against steem and then for privacy, the 30 day unbonding period encourages users to keep a portion of their zec liquid in orchard. It's sort of intentionally inconvenient to help maintain a healthy anonymity set alongside the funds that are staked. So all together, these features were meant to balance privacy, security, accountability, usability, while creating stronger incentives for long term holders. However, like Nate said, after hearing feedback from investors about the 30 day on bonding period, it became clear that we overlook the impact the design would have on attracting new capital, because liquidity is a huge priority for many investors. So I just want to be clear that our design should be viewed as an initial design. We shared it with the goal of gathering feedback and then iterating on it, and we definitely got feedback, but it's no it's by no means a final design that we're rushing towards implementing. Like, like Nate said, the implementation part happens a couple miles, a couple miles sub milestones away. But ultimately, like, what gets implemented is up to the community and coin holders, not shielded labs, so they'll need to consider the various trade offs determine what's acceptable. From my perspective, what's important now is that we need to try to find a balance that allows for liquidity without compromising privacy and security. So I'm hoping that we can use this time for the next 45 minutes to sort of explore that. I'll stop there.

Pablo: 00:43:50  

Yeah, so yeah, that's a valid point for me, as everyone, I don't like to be locked once I made the decision to withdraw, and then I need to wait for a month. It's a lot, it's a lot. I do like the aspect of price stabilization that the lock would have meaning tokens that cannot be released immediately, prevent, prevent the person to act potentially rationally and do rush decisions and destabilize the price. If you see that there is a chain with 80% lock coins. So, you know, this is stable. They are there. The price shock will be minimal if something happens. So I like the stabilizing aspect of this. In my personal opinion, 30 days is too much. I like binance doing seven days. Maybe it's somewhere in the middle there. But this is my personal opinion.

Alfredo: 00:45:13  

So you mentioned you did some models that public information, how.

Zooko: 00:45:20  

So I have some data about that. I'm trying to get a link I can post Coinbase prime has a nice table of all of the different like 12 or so coins that Coinbase prime will stake on behalf of its customers. Okay, I think I posted a link to a spreadsheet. So there are basically two inputs to us with a 30 day unbonding period. And like Jason says, we missed an input, or we generated an input by cutting ham slaw, by posting the 30 day unbonding period of. But there's a really strong signal from a whole bunch of investor types, many of whom are from the Solana ecosystem, which I think is really interesting, which calls itself like the NASDAQ of the internet or whatever, anyway, but those folks really, really hate the 30 day unbonding  period. I think it's egregious. But anyway, before we got that information, we looked up the unstaking and unbonding and epoch periods of all these different coins, and we thought about a few attacks, like the ones Jason named. 

[Data coinbase prime](https://docs.google.com/spreadsheets/d/1ztC3lDHn8ma-6PRRxCr_IcW_1kfLQudBPFs3QPdJdxg/edit?gid=0#gid=0)

So I have three data points from history. One was the Dow hack, which Ethereum got the Ethereum community got together and organized this contentious hard fork, which resulted in Ethereum classic versus Ethereum and it took them like 30 days to do it, but that's because the DAO had a 30 day unbonding period baked in when it started, so the attacker couldn't withdraw their claims for 30 days. And this guy from Solana named Mert, who posts a lot on Twitter, made a really good retort to that argument, which was governance processes expand to fill the available time. So if the DAO hacker had had 14 days, then maybe the Ethereum folks would have initiated the hard fork in 14 days. That's a good retort. But then I looked up the Justin Sun tussle over steem. It was really interesting. I love this history stuff. It turns out, when Justin Sun initially announced that he had bought 20% of all the steem tokens, I'll try not to go into too much detail, but I love history, so there's these 20% of these tokens which were supposed to not be used for governance by like a verbal agreement among the community. Those were only supposed to be used to sell for development funding those 20% so Justin Sun bought the company that owned those 20% and said he was going to move steem to the Tron network. And the rest of the Steem community really didn't like that, and it took them eight days to initiate a soft fork that froze Justin sons coins. So that's another data point. Took eight days and they didn't have a particular deadline, and then Justin sun, then they lied to CZ for binance and a bunch of other exchanges and claimed that they needed to use their customers steem coins to do this run of the mill network upgrade. And thus all these exchanges voted in favor of him taking over the whole governance system of steem. And then the community was like, oh yeah, there's a bunch of tussle but eventually, a few days later, it was clear enough he could buy enough tokens to control the steam governance system. And then it took the steem, the rest of the Steem Community, 14 days to initiate a hard fork that produced a new blockchain where all of the steem tokens got one to one airdrops with the new tokens, except for any steem tokens that had supported Justin Sun's takeover attempt. So anyway, I've got three data points, 30 days for the dao hard fork, eight days for the steem soft fork freeze, and 14 days for the steem hard fork split and then the spreadsheet I just posted the link to, it's pretty incomplete. I've been asking AIS to explain how the Coinbase data lines up. It's confusing because there's epochs, which are regular intervals, and then some tokens also have a delay.In addition to the interval, you see what I mean? .That's all I have. I.

Str4d: 00:54:01  

Another data point I wanted to raise here. So one shouldn't, well, the sort of two parts of this, because one shouldn't really think about staked tokens as, like, I kind of dislike the framing everyone uses as yield, because the purpose is not to earn money. The purpose of staking is to secure the network, and you are the yield is payment for a service, really, if we think about in the same way as mining, however many people do think about it as essentially investment, and if we look at investment terms, well, if I go and put my money into term deposit that has a 30 day unbonding period, like 30 day unbonding periods and that are very familiar to wide swaths of people who they're probably not familiar to are the very rich investors who don't use those particular investment tools and use other means of. Are preserving their liquidity. So I want to just raise the point that we shouldn't over index on the views of the very wealthy investors, and under index on the purpose of staking at all, which is securing the network like we Yes, there needs to be some sort of balance there, because you need to have sufficient stake in order for the proof of stake system to be secure. And so you have to be able to incentivize that coming across. And so, yeah, there's a whole network of like, trade offs that have to be balanced in there. But I also don't want us to over index in the other direction, particularly when you take into account the fact that, like, like, some of the things that Zooko was referring to there, a lot of the actions that happen on chain, and those are all public. So you can see Justin sun moving those coins around in a private staking situation like zcash. The only thing you can see is the is the bonding and unbonding portion of it. And so while you get exposure to the visibility on the Finalizer in the end, the and the movements in their stake, you can't actually tell who, if anyone, is doing that kind of movement. You know, civil style attacks are possible here from a, you know, one many smaller, one large staker, emulating very many small stakers, which is the point of this. So, the so I thought that occurred to me when, when I first put my hand up, was perhaps something to consider here is, if you want, if you explicitly want, a shorter staking period, is there some level of privacy that you, that you are required to Pay in exchange for that? Could like, essentially like is, is there? Is that something we want to consider, or do we want to maintain the no like we want with privacy and so we need to consider everything within that context. A similar vein would be maybe different unbonding intervals have different amounts of yield that they earn as an equivalent change. And then you get into the bucketing and things to make sure you still get positive in that. But yeah, that's where my lines are going.

Nate: 00:57:35  

yeah, I like those points specifically about privacy, so finalizers can leverage the Zcash privacy to perform simple attacks. That's true, and so it feels like there might be a trade off, but I actually believe other systems that don't have good privacy still have this problem, one example of protocol design is some protocols distinguish between stake that a validator has is putting up that it owns, versus stake that's being delegated from others, but that's totally gameable, ultimately, or they can, you know, simple attacks are always possible even when there's no privacy on the internet. For, I should say, not good privacy. So for that reason, and since privacy is sort of our key value proposition, aside from, like, other cool stuff, like governance and scalability, but anyway, it's the most well known. It seems like we should just be consistent there. But the other piece about that, you brought up Strad about the purpose of staking, I think is really helpful, because, like, I noticed on the forum, somebody was comparing lock up periods and interest to a bank account, and I thought I didn't comment yet, but that's a poor comparison, because a bank, the purpose of a bank's product for consumers is It's on demand withdrawals, right and and then. But internally, banks are doing this thing where they're trying to match their liabilities and assets, and there's this time range thing that they're trying to do with different bonds and trying to predict when people will withdraw and stuff. So inside the bank, it's using other investment assets, and those have time horizons. So any investor, like from just a purely financial standpoint, every investment is going to have some time horizon. And so I sort of wonder how much. People who are highly specialized in just staking proof of stake networks have had to deal with that in other realms, it's just a reality. And there's a reason for the different time horizons and for proof of stake. We might have particular reasons. Yeah, that being said, there's one thing I'm still trying to wrap my head around, which is for social slashing, like the hive example, or Ethereum or whatever, there's always the potential to just roll back time. So like an example was the Bitcoin integer overflow bug when they fix that, that one wasn't a really easy one, because it's unambiguous and everyone wants the same thing, but they rolled back and they're saying, you know, it's obvious that starting at this block, things weren't right, so we're just going to reset. And I'm wondering if that's still true in Zcash, even with privacy or not still true, then it feels like there's less of a need for lockups, because part of the rationale for lockups is to ensure somebody who's done something obviously malicious can't escape through the shield pool. But if you can just roll, if the community, community can decide to roll back time, then couldn't they roll back hard fork, like nuke the bad guys, funds, Um, even though there's the shielded pool, 

Zooko: 01:01:45  

have a thought on that, which is it could have major collateral damage to some innocent third party who had nothing to do with anything, and suddenly they have all their money destroyed by that. But the main thing I was going to say was that there's, I think, five trade offs, and I intend to document these, but they're simple. It's privacy, network security, investor appeal, long term or long term versus short term is a trade off, separate from the other three, and then time to market, and rapid iteration is the fifth one, and I can see before our role at shielded Labs is not pushing so hard in any one of these five directions, except for time to market. We'll get to that, but mostly trying to engineer Pareto improvements where we can get very much privacy and investor appeal and stuff like that. But I do want us to lean hard on time to market, because I believe we can improve all of the other ones by iterating better. But anyway, that's the five trade offs. It's not up to us. It's up to the zcash community at large, security like network security, privacy for stakers, Long Term versus short term holders. Investor appeal, which we accidentally omitted from our first proposal, like I sort of forgot about external investors being interested and time to market and rapid duration most of the five.

Jason: 01:03:19  

Yeah, one thing that we're working on, like a follow up blog piece or post that sort of dives into our rationale for the design and also explores those various trade offs. So hopefully we can have something like that out in the next week or so. But I wanted to respond to something that Strad said, so I agree that we shouldn't over index on the opinions of wealthy investors, but I also I don't want to subject retail or institutional investors to an unnecessarily long unbonding period. So I guess a question that I have is, What can we do to try and determine the optimal unbonding period given the security risks that might arise. And like, you know, what we need to do to mobilize a response to that threat. Like, 30 days is a conservative estimate, but, and it's a bit of a guess on our part,

Str4d: 01:04:17  

The kinds of things that I would want to do if I had the time to spend on this, which I do not, but shieldedlabs does, the kinds of things that I would be thinking about. Here are things like, what is our detection like for what are the detection processes for malfeasance. What are the like? What are the bottlenecks in the governance process, but also the technical deployment process for making changes in response to malfeasance? What are the Yeah, what are the mechanisms and things that. like, how does slash. But like, if something goes wrong and we have to use the breaks, can we actually do a like, a social slash in seven days here.  I'm someone who regularly gets close to slash over burnout as a result of my decade at Zcash. I don't want to be the person who has to be one of those people trying to rush to get something done in seven days, which wouldn't actually be seven days, because you know, it will take some amount of time to detect that there's a problem. So we'll probably only have three or four days if it's a seven day period. Like there's a bunch of you can plan for them, plan and and make sure that the joints that are necessary to exercise are well greased and so that, and it's, you know, one of the examples of that is the fact that we've, we've tried to keep doing regular network upgrades to keep it in front minds people that, hey, this is a thing we do. It keeps the process working. And we would need similar kinds of things around the entire rest of the ecosystem to be agile enough to correctly respond on that kind of timeline, given and to that, you then have to factor in what engineering resources, what engineering time constraints, and things we have available, or rather, are likely to have available, if and when this occurs, What is the incident response process for  proof of stake protocol.

Mark: 01:07:01  

The other part about the unbonding period and the epoch links is that they introduce friction to people who want to stake and that may be a good thing, because it keeps coins in the shielded pool. So so some of the trade offs are sort of at direct odds with each other, too. When we talk about appealing to people who want fast liquidity versus maintaining the, you know, the core of Z cash, the privacy of the shielded pool, the anonymity sets and at a Strads point, I wonder what the actual balance would be, or what the size of orchard, you know, what is the threshold when anonymity starts to become degraded because people are staking and, you know, modeling that out would be useful, too. Just a just random thought.

Zooko: 01:08:05  

a good conversation. So I really like stress point. That's an example of the kind of thing that I think shielded labs can do to improve the Pareto improvements, or improve the trade off curve among these things. However, something Jason said made me realize my earlier list of trade of desirable goals that were trading off with each other. It was totally wrong. I said security, privacy appeal to investors long term and time to market. And that's totally wrong. That appeal to investors. One No, no, like security appeals to investors, right? And privacy appeals to investors. The better the privacy, the more likely more investors are going to invest in Zcash in the future. And Jason pointed out that, like non people who are not professional investors, but they're just Z cash users, and they have some stake, and then they want to unbond their stake, this impacts them a lot. It's a usability, it's usability, right? So on, and recast it, security, privacy, long termism. And then this one is like, usability slash liquidity, something like that. And then the last one is time to market. But it's cool that they do have these trade offs, like, Okay, one more thing, like Mark said, there's a really 180 degree trade off between privacy and quick liquidity. Like, basically, if you can use your staked zec on demand, like, as soon as you want to, then you're losing privacy. That's pretty much 100% but all the other trade offs, I think, tend to actually potentially reinforce each other in some ways, as well as whatever I'll be quiet. Good idea kris

Nate: 01:09:54  

yeah,let's see. I'm thinking about the  incident response, and my mind went in a few directions. One is, we need good monitoring and good technical support and good community and governance around how to respond to incidents more generally, even if you know, there could be a wide range of incidents from something that's like a security compromise that is super time sensitive and acute and that might need like a like a war room team of devs and people working on it. But then there might be, you know, there's like a situation, like the dusting attack, where it is urgent, but it doesn't necessarily require, like, a turnaround time of a couple of days of changes decided by a war room of developers that might need, like, a wider scope of participation in deciding what to do and a little Bit more thing and how to address it well, and then we can, I can imagine a spectrum. So maybe there's something like, let's say we deploy a version of cross link, and there's attention orchard metrics that people like, or metrics we use as proxies for privacy versus how much staking there is, or how popular staking is, if there's a contention there, and we feel like it's okay, and then we really but then we see in practice The the metrics are going away, that makes people uncomfortable, then you know that might be an even longer time range thing. So one thing in my mind that I'm thinking of whenever I'm thinking of time to market, is I want to also see if we can have a relatively tight schedule of follow up changes. Because I kind of feel like, for a lot of these things where there's a parameter and trade offs, and we're guessing something based on discussions, it's very likely that, in real life, you know, think you know, the situation might change, or we might learn, and we might want to change them in the future. So it would be good if we already have the intention and capacity to do that on a normal timeline, so that it's not emergency mode. And this is bleeding into this, the other thread that Jason's been spearheading about trying to accelerate network upgrades. And so I don't you know that's a huge topic, but I feel like Incident Response really comes all the way into can we do faster network upgrades in that spectrum? And the one piece so far in my mind for crosslink is I'm hoping we can be able to disrupt crosslink specific use cases more easily, versus something like hardware wallet support, which has a really slow turn. Disruptions might be costly or more costly, I'm hoping we can sort of set a precedent and do things technically, so that it's easier to disrupt, say, Finalizer operators or the wallets that do delegation, and they're expecting it, and they're used to it, and so we can make those changes more rapidly than general changes, but that's my only thought there. 

Zooko: 01:14:11  

okay, real quick, improving privacy and security as well as improving liquidity. I think all of those attract investors. And then I was thinking, in response to something Strad said earlier, attracting investors, I'll bet, improves privacy and security by having more usage and more users and stuff. That's all

Alfredo: 01:14:40  

so the crosslink design has a stall mode, which is an emergency mode. I was wondering if we kind of need to synchronize it within this or if it can help us to easier report something like that. 

Nate: 01:15:04  

yeah, stall mode. So just to clarify for anyone who hasn't heard about this, that's a name with, with names, they're always shifting, and we have way too many variations of emergency mode. But stall mode is this idea that if the BFT hasn't made progress for long enough, then the proof of work consensus rules enter a state called stall mode, which is that only coin bases are allowed. And the thinking is, the motivation is, proof of work is making progress, but finality is stalled, and there's no stall mode, and proof of work just continues indefinitely, and then later, finality suddenly catches up, and there's going to be two sets of users, the ones who are relying on proof of work to make their economic decisions, and the ones who are waiting for finality, and those two sets be on the resolution because they've drifted too far apart. So that's the rationale for having stall mode. And then the design, the goal of having Coinbase only is hopefully miners will want to keep mining on the assumption that things will be improved, and then they'll, you know, those coins will be worth it to them. So that's the basic design. But it does seem like it's related to this concept of lockups or forks, like community forks or whatever. Generally, it's this case where protocol designers try to figure out things that could go wrong, and then they might try to bolster the design to protect against those things. But I'm growing more and more kind of skeptical of that. So for example, what if there were no stall mode, but we knew we had a community process and an emergency upgrade process or something, and we knew we could do something within, like a week. Then in that case, should we not have a stall mode? And then if the FT stalls, we just use that process, because then we have more discretion. We might know more about the context. But on the other side of the fence, if there's less discretion and a pre baked rule, then people can predict what will happen without coordinating. And I um, it's a tricky choice

Alfredo: 01:17:46  

Maybe Emma will talk about that maybe in the next arborist call.

Nate: 01:17:51  

Yeah, she's like the originator of that concept, and convinced me that it was a good idea.

Alfredo: 01:18:00  

Okay, cool. Thank you. Nate, anyone else want to talk about these?

Str4d: 01:18:10  

Yeah, I think the only other thing I bring up on here, because I think I tend to agree with the sentiment that's been expressed around you know, privacy is a tree is it can be attractive? You know when, when it is possible to do the thing. And the clearest evidence we have for that is the significant increase in the orchard pool over the last year from and shielding in general, now that people who are technically unable to to keep their funds shielded, are now able to do so, and so I do see the argument that people who wish to stake but are technically unable to do so with privacy would be able to, you know, would be incentivized in that sense, yeah, as, as always, it comes down to the to the to the actual implementation details of all, which is the fun thing to get to discuss.

Nate: 01:19:59  

I have a parting thought. So we want a good time to market, but we already know there are some designs that could be really appealing in terms of reducing the contention between the amount of stake in privacy. For example, Penumbra is high on my list to re-examine. So the only, in my mind, the main reason we would not just adopt something like that wholesale is just time to market. So the basically my favorite strategy unless there's something about that design that we decide makes trade offs differently than we want. But my favorite strategy is ship something that's, you know, like kind of good enough, but it has known flaws that doesn't make everyone happy, but then see if we can follow up with an improvement that makes the trade offs in a better way. And I'm just curious for everyone here, if that approach seems like a good idea, versus taking longer to launch a more sophisticated thing, which I'm fairly biased against, because I'm worried about scope creeps and getting bogged down and stuff like that.

Zooko:  01:21:45  

Yeah, I think if you wait to make the better thing, sometimes the market has moved on, like another competitor is eating your lunch, and doesn't matter how good your thing is.

Alfredo: 01:21:55  

Yeah, that's true in the other kind is a difficult problem. There are a lot of details that need to be considered. This will never cover everything better than nothing. Okay I'll see you in two weeks. The next one is October the second in the later time, be there and have a good day, good evening

Next Meeting Scheduled: october 2nd 2025, 21:00 UTC

