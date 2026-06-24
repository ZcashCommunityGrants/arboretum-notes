## Arborist Call 126 Notes 

Meeting Date/Time: 11th June 2026, 21:00 UTC

Meeting Duration: 39 Minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [latest zebra](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

Zodl Update[Nu 6.2](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update) 

Research & Implementation Updates - [zcash D](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-zodlzf-zingo-labs-pacu) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer) / [Dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fees)

Open Announcements [zodl, Merkle tree](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcements)

Open Discussion[sprout deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=SKNivdDz9qI&t=62s)

Moderator: Alex

Notes: chidi (X): @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:01:23  

So let's give everybody one more minute and then we'll get rolling and Alright, let's get started. Hopefully, we've got some people from Zodl joining at some point. So, Zcash Arborist call today is june 11, 2026  This meeting will be recorded, so if you don't want to be recorded, please don't show your face or drop off the call as a panelist. So today's agenda: core stack updates: Zcash Foundation with Zebra, Zodl with Zcash D, Core Libraries, and Zallet, CLI Wallet, Zingo Labs with Zaino, pacu with Zcash D, Deprecation. Then Research and Implementation Updates: qedit with ZF, Shielded Labs with network sustainability mechanism, Shielded Labs and Zodl with crosslink, trailing finality layer, and Shield Labs with dynamic fees. And then open announcements and discussion. So, what are arborist calls? Bi-weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. The purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone could participate. Who's interested in learning about Zcash protocol development can register at Zcasharborist.org If you want to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot. Other ways to get involved: Zcash community grants, Zcash R and D Discord, Zcash Community Forum, and all these links are listed on Zcasharbor.org So, let's get rolling with core stack updates, Zcash Foundation, Zebra.

## zebra update

Alfredo: 00:04:55  

Yeah, that should be me. Thank you, Alex. I was just checking, we did a bunch of release in the last two weeks in Zebra, so was checking the dates a few minutes ago. So, in may 29 we released version 4 .5.0 which was mainly security stuff reported by the Bounty program. Then, on may 29 we released it as well, a patch for that with additional security stuff. On June 2nd we made the soft fork for deactivating the orchard pool, which was a public security issue everybody should know now. Then on June 3rd, we did the nu 6.2 activation that re-enables the other fixes, which is what we have now. So, in parallel for that, we had a problem with the synchronization of the chain bug in the sync code. So, we made a release yesterday that fixed the sync stall and we, so we forget to change the end of support dates. We're going to make a patch to fix that, and additionally, we're going to include the reorg window increase, which is some exposure we have that we want to reduce, so we're expecting to release another patch between tonight and, yeah, in the next few hours. I can't go in the details of all that, but I guess that should be it.

Alex: 00:06:36  

Any questions for Alfredo? Great, thank you, Alfredo. Next up is Core Stack updates with Zodl, Zcash D core libraries and zallet. The CLI wallet, is anybody from Zodl?

## Zodl Update 

Pacu: 00:06:53  

Yep, I don't. That would be me so yes, last last week events where we released zcash D supporting the in Nu 6.2 network upgrade, and all of that, that we already are aware of, and anyone interested in knowing a little bit more should go to the Ironwood post on Zodls X account. There's some nice long text about everything that went on, and future steps, but for this update, besides all that, for Zallet, we are clearing the bulk of the Zallet Alpha Four, like graph or Dagni, that we use to track things, so we are about to release for soon borrowing the next few days. We should see sync engine refactor and full block scanning for zallet, Coinbase and get wallet status RPCs, then the entire zcashD migration  cluster like watch only import private keys p2 kph and sampling in keys and supports that like import into zallet, plus some other additions that will let people having zcashD Dat  file to test them in zallet. What else? Then we improved the integration test hardness that we've been working together with Alfredo from Zf to make it more reliable, saving that much and not giving us useful information, and we would improve it a little bit. Also, finished the zcash D regtest wallet builder that says like create test cases for importing wallets from zcash D into Zallet Reg Test, and also we implemented full transferring coin tracking in zcash client backend, and now we're only missing chain view and chain index migration, which are in flight for our critical pass for releasing the next version of zallet and the beta version of zallet, then we finished the Nu 6.2 follow up, we bumped the version of the orchard crate, which is a 0. 14.0  and what else, and then we reviewed and merged a bunch of zallet RPCs, Z import key, Z Improve key, Z export key, also the JSON RPC cookie file off, and yeah, other things that were in review or in progress, that we we would be reviewing actively. Awesome. Thank you to all the people collaborating on that, and I think that's really much it and then we had a bunch of zodl  releases in conjunction with the Nu 6.2 upgrade and I think that's pretty much what being we've been up to the last two weeks, I guess. Yeah,

Alex: 00:11:30  

Great. Any questions for Pacu?  zodl team did an amazing job. That's an amazing two weeks. Congrats,

Pacu: 00:11:40  

thanks. Yeah, everybody did a great job last week. Yeah, thank you, everyone, for helping out and coordinating and working amazingly for long hours  to remediate the report that was offered by Taylor, which you know, kudos to him. we can't thank him enough. Thank you, Taylor, for your work. You're awesome. And yeah, way to go, everyone. And we have a lot to do, so yeah, congratulations to everyone involved last weekend this huge pool,

Alex: 00:12:26  

awesome, cool. All right, let's move on to the next Zingo Labs. Anybody here from Zingo with Zaino? I don't think so. All right, let's move on to, Hey Pacu.  zcash d deprecation updates 

## zcashd deprecation updates zodl,zf zingo labs pacu

Pacu: 00:12:43  

Yes, so the latest news is that since we, as the ecosystem, is planning to move from Orchard to Ironwood in around six weeks, which is late July. Thing is that we've set that as the finish line for deprecating zcash D, and for that we're, working on on different fronts, we have the zodl development on one side, which is, which is progressing quite much, zodl have new engineers, and for some Danny Williams, who's been doing a lot of work, for being  his first week, so kudos, Danny, he's been closing PRs as a champion, and but then we've been having help from Valar Group folks, which are also creating a wrapper around zcashd that will let us also help those organizations that today they rely on zcashd and that they can't accommodate moving to a new infrastructure like z3 which has a different API in this short term, so that's a really kudos to Valar Group, and  they'll be presenting like a testnet version of this wrapper soon. I'm pretty amazed on the progress they've made, and then also Zaino folks are continuing to improve Zaino performance. today we synced all the teams involved in z3 development sync today and Zaino specifically is working on some internal database enhancements that make Zaino a little bit leaner, and also they will be implementing kind of a no database approach, where it will let users of Zaino spin up a Zaino instance faster, and the expense of  it being slower because it's not fully synced, which is also pretty cool. And  we've been working well, Zebra folks have been killing it and fixing a lot of things in Zebra and optimizing stuff like sync performance, and yeah, that's pretty much what we're up to. We have this new goal, which is pretty ambitious, and I think we're going to make, we're going to make great progress towards it, and that's, I hope, going to be the final days of zcashD, around late July. I hope so. Anyone  wanting to test zallet, please stay tuned for the latest release, and we invite everyone that has or wants to try moving a backup of or a copy of their wallet dot dat file from zcashd into zallet, and give us feedback, it will be appreciated, even if you have a test net node, that's super helpful as well, and yeah that's pretty much the news around zcashd  deprecation.

Alex: 00:16:56  

Any questions for pacu, thanks. Pacu do we have anybody here from qedit for Zcash Shielded Assets? Don't believe so. All right, so next Shielded Labs with network sustainability mechanism,

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:17:23  

Yeah, quick update: just released the Zip 234 PR last week. Just need some reviews, and then I will have the Zip 235 bug fix PR out very soon. We had an audit of that code, and so some extra things came up out of that that I want to roll into that bug fix PR, yeah, that's about it.

Alex: 00:17:45  

Short and sweet. Any questions for judah on NSM? Great Shield Labs and Zodl with Cross Link.

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Nate: 00:18:00  

Hello, that's going to be me. Okay, so we just had our second workshop of the feature net era, and that went well. for that workshop, we switched to a more like conversational flow instead of like a presentation, and we also didn't have the section, which is like how to get set up and run the software, although we did notice there were about at least five new folks in the workshop who hadn't been to previous workshops, which is a great sign. We're going to start tracking that more carefully, and we're trying to distinguish how to show new users love and get them on boarded versus presenting updates and new releases and things of that nature, because one thing we are discovering is for new users to sync up takes too long to happen in a workshop. Now we didn't have to deal with that back when every network was ephemeral, so that's something we're working on, and then let's see, another big piece is we've finished a scanning tool that we will use for distributing mainet ZEC rewards to participants, and we're going to do the first round of rewawards in the next couple of weeks, so if you have participated and you want to receive any mainet ZEC rewards, you need to send your viewing key from the testnet. Please, just the cross link testnet, it will say test in the little prefix, and then a main that address to Jason, and the deadline for that is, I think, a week from now. Yeah, I think it's june 17. Let's see what else. That's all that I have on my mind right now, my nice sleepy mind. Yeah, so stay tuned. Come to the next workshop in roughly six weeks, and let us know if you have thoughs, questions. feedbacks. pacu go ahead 

Pacu: 00:20:38  

Yeah, is the viewing key from the Crosslink wallet a viewing key that is for a mainet  or testnet one

Nate: 00:20:52  

No, no, no. so the software we make and the feature net are all running our software that's on a fork of Zebra, and none of that should ever touch mainnet in any way, but what you can do, if you want to receive rewards, is export your viewing key from that network. Yeah, so there's a way to do it in our node. There might be a way to do it with the mobile wallet, but if you use one of those and you want to do that, and the prefix that people

Pacu: 00:21:32  

should look at is you test, you view tests, right? Or yes,

Nate: 00:21:36  

make sure it says tests in the prefix. I think it is like you view test one or something like that, and then if you, so what we have is the scan tool. You give us this viewing key, right? You will be disclosing your activity on the feature net, so you should be aware of that. And then if you give us this view key, the scanning tool looks at a time range, and it just accounts for where that wallet has received block rewards, basically. So that could be from mining, or from staking, or from earning commission fees as a finalizer, which isn't implemented yet, and so the rewards, these rewards are just non-discretionary, and they're proportional to that, and we've run into a fund edge case, which is because of a variety of interrelated reasons, the users have been on a lot of proof of work forks, and some of those have extended past the 100 block limit, and so we ran into an edge case immediately that we hadn't anticipated, which is which history do we calculate for the rewards, and so we're we chose a history that that there are two community contributed block explorers for the featurenet. They were up in agreement up to a certain point, and we chose a cut off point right before that. So, yep, these are, and the funny thing is, this is like definitely eating our own dog food, because the whole goal of finality, traveling finality, is to prevent long running forks, and so we're going to keep working on it until we get that working well

Alex: 00:23:34  

Alfredo,

Alfredo: 00:23:34  

yeah, sorry, I might be behind kind of , so maybe half an hour. I have a question for Crosslink, but I want to say something about some of the previous topics from qedit. They submitted a PR  of new version of the Shielded Asset, and they are testing it in the Zebra CI. So I know they are doing that last week, and then for the NSM, as part of the NSM work, I think Judah made a pr  that was merged last week, which I think helps improving the performance, if I remember correctly. That's it.

Alex:  00:24:20  

Great. Any other questions for Nate? Great, thanks, Nate. Shielded Labs with dynamic fees up next.

## Research & Implementation Updates, shielded labs- Dynamic fees

Mark: 00:24:30  

Hey folks, so last week we talked about how we were going to encourage wallets to implement features to allow priority lane, and there was a priority delivery, which is a 4x increase in the marginal fee, and I'm happy to report that using Nosy Wallet, which is a for a Zech Hub community wallet, I was able to send my first canonical priority fee, meaning that it was like a wallet feature, and not something I hacked or had to do some code or something like that. So that was pretty fun. I made a little graph for myself to watch fees. There's some interesting data there. There's really two sort of mega buckets in terms of fees, one is people who pay the 5000 zat marginal fee that zip 317 already recommends, and everybody else, and the fees that we see on the network right now are kind of wild, they're all over the place, some people will pay like 150,000 115,000 zats per action, some people pay 6000 so hopefully this work, and by encouraging the wallet creators to streamline these things, we'll be able to reduce those buckets from 5000 and everybody else to 5000 priority, which will be an improvement, notably a lot of those weird fees come from near intent swaps. There's, they're very often in the transparent pool, and probably some deck swaps and things like that. I see people like bridging in from Solana, paying high fees, because they probably want their fee, you know, their transaction to go through. So that's where a priority fee would come in. I am looking to create three zips to one zip defining. Actually, that's a question for the group. Maybe the Zebra team can answer. Do we do zips for new RPC endpoints, or do we just ship new RPC endpoints? If I want to make, like, a fee estimator endpoint, I know we talked about GRP seeing it through the indexer to the full node, but do we need a zip for that? Yeah, go ahead.

Alfredo: 00:26:52  

I'm not a zip editor, but I don't think we need a zip for that. You can just do it,

Mark: 00:27:02  

okay? I might just do it. Then that brings me down to two zips. Thank you, Alfredo. One to the 2000 level zips, which are chainge zips, one to reduce the marginal fee from 5000 to 1000 and another to increase the weight ratio cap to four from 4x to 10x and I think that's it, as far as dynamic fees are concerned. I'll note that a statistically significant amount of the wallets that we've talked to now, and we've talked to about 10 different wallets, have asked for some version of RBF to be implemented, and we were happy to say no, Zcash doesn't do that, and here's a GitHub issue that says that we're not planning on doing that either. So, yeah, and then the feedback that we get from wallets is really, really cool and useful and user focused, and that's always really refreshing, Nate.

Nate: 00:28:09  

Okay, when they request that thing, and we say no, and point them to a ticket, do they, how do they respond to that? Are they like, do we have a way to appease their underlying desires, or understand them, or

Mark: 00:28:25  

Sometimes, you know, a few of them, you know, my pushback on that is kind of similar to what we've talked about, Nate, privately, which is it's inconsistent, it's unreliable, and it's unpredictable, and that's not a good user experience, you know. 

Nate: 00:28:44  

So do those wallets? Does this new priority fee idea satisfy the same?

Mark: 00:28:55  

Well, the priority fee doesn't, but the short transaction expiry followed by a priority fee transaction mimics the speed up semantics enough, so that most wallet developers just go, okay, yeah, that makes sense, we can just do that. It helps that it works on mainnet now.

Pacu: 00:29:15  

Good to hear,

Mark: 00:29:16  

yeah, and a lot of the RBF memory is kind of, you know, Bitcoin does it, and it works really well, so that you should just do what Bitcoin does, and we say it doesn't actually work really well. Sorry to say, Paco,

Pacu: 00:29:36  

yeah, you can point them to the famous Google paper about quantum breaking like the quantum paper that Google and others released like two months ago and actually replaced by fee, has a whole chapter on why it is a problem  if there's a cryptographically relevant quantum computer.

Mark: 00:30:08  
Oh, shit,


Pacu: 00:30:09  

yeah, because it's actually the tool that the quantum attacker needs. Once you reveal your transaction is in the mempool, then yeah, the quantum computer can figure out the private key behind the public key of the transaction, and then create a new transaction and spend into the place they want, and they, they usually replace by fee to as a vehicle of replacing the lawful transaction with theirs. It's

Mark: 00:30:38  

like a seagull stealing,

Pacu: 00:30:41  

right, it was really late and night. I was reading that, that's my night reading, if people want to know. that's a new piece of information against implementing replaced by fee mechanics, I guess, from people that know a lot of crypto than myself, at least.

Mark: 00:31:06  

Yeah. Thank you, Pacu. I'll definitely take a look at that, and I definitely will point people to that if they bring up RBF again.

Alex: 00:31:15  

Any other questions for Mark? Great, so open announcements. Raise your hand if you'd like to share some news or make an announcement. pacu, I think you're first. Yeah,

## Open Announcements 

Pacu: 00:31:33  

I forgot to say a bit of update on Zodl, maybe it's a research and implementation update, which is daira emma is working on formal verification of many of the like Ironwood things, along with Tachyon folks like Shambo and folks from Tachyon and I didn't want to not mention that, and also say big kudos to Chris, Strad for and daira Emma, for all the work they did last last week, there were some days like awake like 32 hours in a row to fix and mitigate the the error, the bug found by Taylor, so I didn't want to not mention and congratulate them and thank them for the huge pull, as well as the Zf folks, Aria, Pili that were, you know, championing this and doing some procedure that wasn't, I guess, was never done. It was kind of invented, like, like discovered and invented on the go, and every expert is saying that it was really well executed. So I wanted to congratulate everyone in shielded Labs and Zf and thank all the miners that worked together with us too on that effort, because it was tremendous, and it was possible because everyone really worked together really closely. So, congratulations to you all, not the greatest thing to do to fix a bug, but yet still, congratulations for all the work and the effort, remarkable, actually. 

Alex: 00:33:33  

One of the silver linings the last couple weeks has absolutely been the collaboration between teams. It's been absolutely fantastic, and people taking the lead where they need to take the lead and taking a backseat when they need to take the back seat. It's been absolutely fantastic, and I'm sure we're going to see it continue. So much appreciate everybody on this call, and everybody that Pacu was mentioning as well. Mark, you're up next.

Mark: 00:33:59  

Yeah, on the Zcash Global Discord on june 16 at 5pm UTC. Sorry, 3pm UTC. We're going to do the next protocol walk through, which is Merkel trees. So, keep an eye out on the forum. I haven't announced it on the forum or on social media yet, but I will. And you're all invited. See you there.

Alex: 00:34:23  

Thanks, Mark. Nate, you got something.

Nate: 00:34:26  

Oh, it was partially addressed by Pacu, but it was a question about the Zodl team. I was wondering if Strad finished his sabbatical successfully or if the issue sucked him out of sabbatical, just for my own edification. Yes,

Pacu: 00:34:48  

I don't know if I can answer that on my record. Public call, but okay.

Daira: 00:35:01  

I think it's actually public because he's credited on some of the blog posts, so yes, it did take him away from his sabbatical, but his sabbatical will be extended by that time.

Alex: 00:35:27  

zooko did you want to give a quick update on Ironwood? I saw your message in the chat.

Zooko: 00:35:33  

The parts of Ironwood that I have visibility into, or is it Sean Bo, and a bunch of other folks agreed on like protocol rules and cryptography, and so forth, for Ironwood. I know Dara, Emma was part of that, and then the other part that I'm aware of is that Sean and Dara and others are working on assurance, such as formal verification, AI-powered security audits at Code Review, etc. And Taylor Hornby from Shield Labs is contributing to that part. That's my update.

Alex: 00:36:11  

Great. Does anybody want to add anything else to that? Okay. Next one

Zooko: 00:36:20  

One more thing, Sean posted a blog or a Twitter post about it. I'll post the link there. I posted, I guess, the chat here.

Daira: 00:36:30  

I guess I can give an update on my progress on formal verification, so it's been going very quickly. I've got a model in lean of the elliptic curves, that's all kind of proven, and the next step is to link it to the Zcash test vectors, so that we can actually test it, because proving something is correct is not the same as testing it against suspectors, and then after that I'm going to try and again formalize some of the arguments in the protocol spec about balance and binding signatures on the  hash which is directly relevant to some of Orchard, so that'll be a good start.

Alex: 00:37:37  

Awesome. Any questions for Daira emma on that? No. thank you for your efforts, Dara. Much appreciated.

Daira: 00:37:45  

And there will be a call tomorrow to kind of coordinate formal verification work, so if you're interested in that, then ping me.

Pacu: 00:37:59  

Great.

Alex: 00:38:01  

So open discussion, if there's topic you'd like to raise for open discussion, please raise your hand. Mark, I think you already commented your hand. There you go. So, anything for open discussion once? 

## Open Discussion 

Daira: 00:38:23  

We should retire sprout we really should anyway, and I've been saying this for a while, but we need to decide when we're going to turn Sprout off.

Mark: 00:38:42  

can we do a poll just for that, if we were, if we're can we just do a sprout deprecation date poll,

Daira: 00:38:53  

maybe. So that's a good question. When is the poll that what was originally the only certain sentiment poll? When was that delayed too? Or have we not decided yet?

Mark: 00:39:09  

I think it was indefinitely, but yeah,

Alex: 00:39:11  

we haven't decided yet. But did you want to comment on that, Pacu, or something else related

Pacu: 00:39:28  

I think that once we deprecate zcash D moving, like doing any kind of interaction with the Sprout pool will be significantly more difficult than it is now, so maybe we should do some sort of communication campaign around I don't know, trying to be more insistent on people holding a sprout to move their funds, because it's correct me daira Emma, if I'm missing something, but I understand that, for example, zallet,it's first version, it won't have any support for Sprout operating Sprout funds, so it's kind of a de facto reality of that you won't be able to use Zcash D or anything to move it, you have to like figure it out on your own,

Daira: 00:40:45  

yeah. And it will be pretty difficult to figure it out on your own. I mean, I guess you could vibe code a Sprout wallet, but do you really trust that? Yeah, if you want to get your funds out of Sprout, then do it with Zcash D and do it quickly.

Alex: 00:41:11  

Anything else for open discussion or response to that? Oh, I think we can probably wrap up.  thanks for everybody for participating. And we'll see you soon.

Next Meeting Scheduled: June 25th 2026. 15:00 UTC

