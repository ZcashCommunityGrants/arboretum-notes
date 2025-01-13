# Arborist Call #93 Notes

Meeting Date/Time: January 9th 2025, 15:00 UTC

Meeting Duration: 1 hour 


**Agenda**: 

+ Welcome and Meeting Intro

+ [Zebra Update]() 

+ ECC Core Update - [zcashd 6.1.0 / 6.2.0]() 

+ [ECC & ZF zcashd deprecation]()

+ Research & Implementation Updates - [FROST DKG + Planned Audit]() / []() / []() / []()

+ Open Announcements - [ZIP editors Meetings / ZconVI RFP submission]()

___

Video of the meeting: [recorded]

Moderator: Pili Guerra

Notes: Jason Rogers


___



## Full Notes





### 1. Zebra Update -  


[00:01:54.20] - **Marek**

We migrated the JSON RPC server to a new framework because the original one that we were using is not developed anymore. We implemented transaction verification optimization where we don't verify a transaction that comes in a new block if the transaction is in the mempool already. Basically, we don't re-verify transactions.

[00:02:35.35] 

The last bit is that we updated the getblock and getrawtransaction RPCs so that they match zcashd more closely, and we fixed a bunch of bugs in the getblock transaction RPC.


____

### 2. ECC Update - zcashd 6.1.0 / 6.2.0 


[00:50:44.07] - **Str4d**

zcashd 6.1.0 was released last week. Over the weekend, the build zones was over the weekend, the build zones. It was effectively the builds were already by the beginning of this week. And 6.0.0 reaches end of support just under two weeks from now. If you're running a Zcashd node, make sure... If you're running a Zcashd node built by ECC, make sure you update prior to then. Yeah, I think that's it.

[00:51:19.42]

we're going to have another release out in the near future, just as near as we can manage to get it implemented, a 6.2.0 release that will have the flags to enable deprecating RPC methods and things. We didn't have time to get that into 6.1.0. So 6.1.0 was just essentially a maintenance release, but we'll pull those into 6.2.0.

[00:51:47.28] - **Pili**

Sure. Okay. There's been a suggestion that since we skipped the ECC updates and the CLI wallet updates for the zcashd deprecation, maybe we can do them now since we have some time. I I don't know if you want to know a bit about that, Str4d.

[00:52:02.19] - **Str4d**

Oh, yeah, I can jump into that quickly. Sorry. The Arborist call calendar events completely disappeared from my calendar in 2025, so I don't know what happened there. Obviously, it's been the holidays this last patch, so we've been a little bit reduced capacity there. But the main things have been since the Keystone-related work got out in Zashi just before Christmas. There's been a couple of bug fixes related to that coming in since then.

[00:52:40.19] 

Kris spent time working on the support in the Zcash Rust crates for transparent gap limit scanning. We already had some gap limit logic for, specifically for use around the ephemeral addresses used it through 20. This rewrites that and expands it to support just general transparent address gap limit handling, which should mean, I'm in the process of reviewing it now, but it should mean that this will enable people to import transparent only seed phrases into a Zcash, client sqlite based wallet such as Zashi or any one any of the other ones built from the SDKs that is able to then find all of the existing transparent funds and then for shielding purposes.

[00:53:39.41]

In particular, I believe the ledger-based seed phrases that some people have been attempting to import into Keystone devices have been missing funds because we currently only look at the first transparent address.

[00:53:56.45]

That's ongoing work to to make that use case viable, at least at the library layer. Then I've also been chasing down yet more bugs in the way that the note commitment trees this work. If you've seen the entry missing at address 1 index, blah, bug in any of your wallets, we fixed a large I was part of that mid last year, like six months ago, but there's a weird edge case that a couple of people are running into. I'm attempting to find that, and if I can't find that, I'm just going to write some code to forcibly work around it. Which it didn't have time to do last year, but I think I would just like that to exist.

[00:54:52.53] 

I think that's everything that we've mainly been doing the last couple of weeks. The Zcash ZEC Sqlite CLI wallet? What was called ZEC Sqlite CLI, which we announced, I think, at the previous Arborist xall or one of those ones, was finally open-sourced after I'd done some security work on it. We've renamed that to zcash dev tool. That's GitHub.com/zcash/zcashdevtool. We've pulled in the old zcash inspect tool that used to live in zcashd, and then we moved to the Rust crates and it now lives in there.

[00:55:29.45] 

That's now intended as a central place for developers of wallets, essentially, to be a multi-tool for working on things there. As I've mentioned previously, that's where the PCZT stuff currently is It essentially influences a base CLI wallet, but very bare bones. The new one that we mentioned at the end of last year, there's been no change on that across the holiday period.


___

### 3. Zcashd deprecation updates - Outreach / Zaino regtest errors


[00:04:44.17] - **Pili**

We can try to move on with some zcashd deprecation updates from some of the other people. Pacu would you mind starting on ecosystem outreach, maybe?

[00:04:51.09] - **Pacu**

Yes. The last few weeks have been a little bit slow, but anyway, I've been nudging I'm pinging some people. We're trying to get a hold of CoinMarketCap and CoinGecko and those API providers. I've reached through the official channels But they say they have already put up a disclaimer on the support form that they take a long time to respond, so it's probably sure that they will.

[00:05:28.38] - **Pacu**

If anyone knows someone from those two companies and can provide a direct contact that might help us to reach them out, it will be much appreciated. And we're sending out a form currently to gather a feedback instead of the email, but we're also offering sending the email if they don't like the Google form. There hasn't been much movement there, but yes, we got a few responses, but nothing too outstanding. We eventually expect that it will get better after the holidays, like from now on.

[00:06:20.53] - **Pili**

So have we had any responses on the Google form?

[00:06:23.58] - **Pacu**

On the form? I don't think so. I I hadn't checked this week, honestly.

[00:06:37.49] - **Marek**

We should see them directly on the form, on the responses tab of the Google form document. Yeah, I haven't checked this week about it.

[00:06:53.06] - **Pili**

Okay, great. Thank you, Pacu. Do we have any any further zcashd deprecation updates on the Zebra side? Maybe Marek or Arya. We probably covered that in the Zebra updates.

[00:07:17.22] - **Marek**

I don't think we have anything related to this in Zebra.

[00:07:24.46] - **Pili**

That's fine. We've all been coming back online this week as well. So Okay.

[00:07:34.27] - **Pacu**

About Zaino, I can provide some context. This hasn't been officially confirmed as a task for me, but I started looking at some of the regtest problems since the Zingo folks just asked for a fresh environment and a new set of eyes to look at the errors.

[00:08:04.43] 

The problem is mostly located on the tooling side. So the development is ongoing, but given that the tests don't run reliably, it's harder to go in a more steady pace for them. We don't have any evidence that it's actually a zebra problem or a Zebra regtest problem. This is not a production issue at all. Everything is testing environment, and the problem is that the testing environment is complex. And maybe there's where it resides the main problem, I guess.

[00:08:55.01] 

So we're trying to debug things. They're trying to see what's the source of the issue and then if there is anything that is to be reported to a zebra, a regtest part of the node, it will be done. But we don't have any evidence that it is actually. There are too many moving parts, two or three moving parts that could be the source of a problem.

[00:09:21.12] - **Marek**

We don't have any assurances to actually report an issue and don't make you folks waste any time. But if you feel like it, hey, I want to just make it a go and see where it takes me. So you're totally welcome to scratch an itch and test things out there or try to reproduce the issues.

[00:09:49.47] 

Regarding regtest on Zaino there's a consensus rule that prohibits transactions that spend Coinbase outputs to have transparent outputs. And zcashd allows this, allows such transactions on regtest. We merged a PR that allows these transactions as well. Today, I noticed that there's another consensus rule that zcashd also likely breaks on Regtest, and that is spending Coinbase outputs in transactions that are less than 100 blocks away from the Coinbase transaction, and we didn't implement this yet.

[00:10:53.09] 

So I know that Zaino had issues with this on Regtest. So one part is solved. Now, I'm not sure if we also have to implement the or change the other consensus rule as well. But at least part of the the original problem is solved.

[00:11:22.59] - **Pacu**

Yeah, I recall having issues on regtest because I didn't know that such limitation and my tests were failing, but I guess the right thing is that you can't spend the Coinbase, right? Which is the correct implementation for that? Or maybe it's something that is worth disabling, but I don't know what's the spirit of reg test, whether we want a super faithful regtest in in terms of consensus rules or most of them or what we want to do with that?

[00:12:09.39] - **Marek**

The issue was that some Zaino tests couldn't spend Coinbase transactions on Regtest. So we're working towards having that functionality only in Reg test. Okay. Cool. Okay, I will check those things and see if some of the folks can join. But yeah, thanks. I'll have that in mind. It's pretty useful.



___


### 4. Research & Implementation Updates i) FROST DKG / Planned Audit 

[00:13:15.41] - **Conrado**

Yeah, sure. We've been working on adding support for running the DKG, which is a distributed key generation for Frost, using the Frost server that it wants to be done. So we finished that. The only missing piece is using a broadcast channel, which is something that is required for security reasons, but it's not super complicated. So we're working on that. And that's the last part, the last thing we need.

[00:13:53.21] 

We're going to do an audit. We haven't defined the start date for it yet, but it's going to happen soon. We'll finish this thing, and before the audit starts, we'll probably use... There's always cleanups to do, refactors to do, just to improve the code, clarity, and documentation. But that's it.

[00:14:22.03] - **Pili**

Great. Thank you, Conrado. Any questions for Conrado? Okay. And when the audit is done, we would like to ask for a developer to start trying to integrate this, and we're happy to help out with that. If people are trying it and it's not working well. Okay. Next step is trailing finality layer and crosslink. Who can talk about that today?



___


### 4. Research & Implementation Updates ii) Trailing Finality / Crosslink

[00:14:59.10] - **Zooko**

I don't I don't have anything to report. I'm just getting back into work from vacation. Ask me next time.

[00:15:06.17] - **Pili**

Okay, fair enough. I think a lot of us are in that situation. Okay, let's move on then.

[00:15:13.29] - **Zooko**

Nate might have something to report or Jason, I don't know.

[00:15:18.07] - **Nate**

Let's see. I'm also getting back from vacation. The latest bits I've been playing with is just playing around with zebra, so running testing tests locally and attempting to replicate the CI that the zebra team uses upstream. And I'm wondering if that's too heavy weight for us right now. So I'm considering just replacing it with a super simple thing that just runs cargo test for now, which I think excludes a bunch of integration testing, but that might be good enough for the beginning of the prototype. So that's my current thinking.

[00:16:03.34] - **Jason**

Okay. And then one thing I'll add to that is on hiring, we've been making progress. We have two offers out there right now, so hopefully we'll get a couple of engineers started by February first.


____

### 4. Research & Implementation Updates iii) Network Sustainability Mechanism - ZIP 233 'Burn' / ZIP 234 Issuance Smoothing 

[00:16:28.15] - **Jason**

I can start off, like Nate and Zooko said, things have been slow because of holidays, but I do have a couple of updates. First off, Kris mentioned on the forum that for Zip 233, it's important to be clear whether burning permanently reduces the supply to be below the 21 million cap. I propose an edit to Zip 233 that basically states that burning ZEC through it or other means reduces the total supply of ZEC below the 21 million cap but the intention of Zip 234 is to introduce a mechanism that allows ZEC to be systematically issued in future block rewards.

[00:17:21.07] 

The point that we're trying to make here is that there's no direct relationship between the coins that have been burned and the new coins issued. We want to get away from this idea of talking about ZEC is being reissued. The point is that if Zip 234 or a similar mechanism doesn't get implemented into the protocol, but something like Zip 233 does, and there's other ways to burn ZEC as well, then burning ZEC would result in a permanent reduction in the total supply below 21 million.

[00:17:52.20] 

We made the comment in GitHub for that edit, and we're just waiting to hear back from the Zip editors. I just want to make sure that that was seen. Okay, I can follow up with Kris about that or Daira Emma. Then second, I started a conversation about Zip 234 on the forum yesterday. I used the opportunity to respond to the alternative proposal that preserves halvings that Conrado put forward, and then ask the community for feedback on Zip 234 generally, and also their view on the importance of halvings as part of the issue schedule. I can post a link to that here in the chat if you haven't had a chance to read it, but you can let me know your thoughts.

[00:18:38.06] 

Then I saw Conrado's response this morning, and I think that in the new version, the only thing that is relevant is the money reserve. Paul can talk a little bit about that if he wants to. But yeah, I can paste a link to the updated version of ZIP 234 that's in the repository because I think you're citing the previous version of the Zcash Sustainability Fund.

[00:19:15.04] - **Paul Dann**

Yeah, I could just point out. I think the main difference is that in the alternative proposal, they're suggesting that it's about what's being tracked. I think the only misunderstanding is that under the current implementation, we don't track anything new. We just use the existing chain value and subtract that from max money, and that gives us the money reserve, and the issuance calculation is based on that. So there's no tracking of any deposits or anything like that in our current implementation.

[00:20:03.58] - **Conrado**

Yes I'm a bit confused. I need to think about it, but I think you need to keep the deposits using the NSM deposit field I forgot the name you need to keep track of those, right? So you need to keep track of something.

[00:20:22.13] - **Paul Dann**

No, there was a previous iteration of the implementation that We use the deposit term, but we threw that away. We're not using deposits as a concept anymore. We're just burning. So we just burn funds, and that will naturally reduce the total value of the chain. So chain value is a value that's tracked across all the value pools. And when you burn ZEC, then one of the pool values will go down, like probably the transparent pool.

[00:21:01.54]

So if you add up all of the pool values and subtract that from max money, that gives you the total amount of money in the money reserve, which is the difference between the current chain value and the 21 million cap. And that's what we're using in our calculation.

[00:21:25.25] - **Conrado**

But if you're subtracting, say, from the transparent pool, then you need You need to keep track of the things you're subtracting, right? Because currently the transparent pool, the size of transparent pool is the sum of all the deposits into the transparent pool minus the money spent from it. But if you want to burn using that pool, then you need to keep track of everything that's burned from the pool or not? Sorry, I need to think about it.

[00:21:59.50] - **Paul Dann**

Well, a burn just behaves exactly the same as a transparent input or any input, really. Basically, the input goes away in exactly the same way as it normally would, but there's no corresponding output. So the funds just disappear from the chain. 

[00:22:27.38] - **Dodger**

So Jason, you suggested Is that Zip 233 may be implemented without the other zips being implemented, but that's the first I've heard that suggestion.

[00:22:38.38] - **Jason**

No, it's not. It's that we're treating these as three individual zips, three individual implementations. One of the things that we've talked to, I guess what I'm saying is more like, our intention is to implement all three zips. But the way that the conversation has gone on these calls on the forum is that, well, maybe we'll only be able to get Zip 233 in. So I'm going with that. Yes, the intention is for the NSM as a whole to be implemented. But in terms of NU7, that's the question.

[00:23:16.13] - **Dodger**

Okay. So the intention is that all the Zips will be implemented. So any ZEC that is withdrawn from circulation via the mechanism will eventually be returned to circulation, correct?

[00:23:34.43] - **Jason**

Yeah. So we're trying to get away from talking about as return to circulation, but it's more so ZEC is burned and then new ZEC is reissued up into the cap of 21 million in a systematic way.

[00:23:49.23] - **Dodger**

Well, why? I mean, I seem to recall there being feedback from multiple sources, including me, that the term burnt implies that the coins are being withdrawn from circulation permanently, and it would not be possible to return them, and suggesting that a different terminology is adopted. So why are you continuing to use that term?

[00:24:23.37] - **Nate**

Oh, yeah. Well, my thinking on why using that term, it just seems standard. So that's what I believe they refer to in Ethereum when fees are burnt for EIP 1559, but then new issuance counteracts that. The other piece was there's a little bit of subtlety because the definition we prefer is for NSM, the issuance is just based on the difference between the cap and the current supply. And what that means is anything that reduces the supply, any kind of burn is accounted for. So the mechanism in, I think it's 233, that just allows an explicit way to do this. But there's already implicit ways to do burns. I don't know this has been patched yet, but miners can not claim all of the new issuance that's due to them and I've heard that referred to as burning that ZEC.

[00:25:44.05] 

Or if there were transfers to the all 0 address or a known way to break funds that might be considered burning.

[00:25:57.50] - **Dodger**

So with With Ethereum, the burning of fees and the fact that there's an uncapped issuance mechanism are two entirely separate pieces of the Ethereum protocol. The new issuance of Ethereum isn't in any way impacted by the burning Ether due to fees. Whereas with this mechanism, there is a direct link between the number of coins that are withdrawn from circulation using using NSM and the potential increase in issuance using those coins.

[00:26:52.07] - **Dodger**

So what I'm trying to understand is why there's this insistence on using the term burn when when it's not the way that that term is used elsewhere in the crypto ecosystem, and it risks misleading people into thinking that those coins are permanently withdrawn, reducing the 21 million cap.

[00:27:20.15] - **Nate**

I mean, if I could just respond quickly. I'm not particularly attached to burn. I just think that's the common terminology.

[00:27:29.55] - **Dodger**

 But it's terminology for something else. It's not for what the NSM does.

[00:27:38.32] - **Nate**

I don't know. I think it's somewhat ambiguous how people use words. Yes, if you burn fees in Ethereum transactions, people say they're burnt, but then new Ethereum is going to be issued in the future.

[00:27:58.31] - **Dodger**

But like I said, those two things are totally disconnected.

[00:28:04.38] - **Dodger**

The burnt fees don't go into a pot that get reissued.

[00:28:10.47] - **Nate**

Well, I don't particularly... I personally don't care to tell people what words to use. I just want to pick whatever words are likely to be used.

[00:28:19.19] - **Jason**

The point that I want to make here is the reason that we changed this was because there was a lot of confusion when we were talking about the Zcash Sustainability Fund as a thing, something that you make deposits into, something that's tracked separately, something that is put into future disbursements.

[00:28:36.31] 

What we try to do is get away from that. The thing that seemed most reasonable based on what other cryptocurrencies is this idea of burning and then issuing. We're really just trying to simplify it. Now, a lot of people have said, I don't like the term burning, but nobody has suggested an alternative for us to consider. The important thing here is nothing under the hood is changing. We're just talking about how to conceptually think about the NSM. If somebody wants to suggest another term other than burning, then I think that's something that we can consider.

[00:29:11.43] - **Dodger**

But I think withdrawn from circulation or unissued, donated to the network security mechanism. I think there's a whole lot of terms that could be used that would be far less likely to lead a casual observer or a casual reader to believe that any funds that are burnt would permanently reduce the 21 million ZEC supply count.

[00:29:46.51] - **Pili**

Let's try to go ahead because he's had to send that for a while, and then maybe Zooko, if he still wants to speak.

[00:29:55.56] - **Str4d**

Thanks. On the part that's just been had, the thing that DC in chat just noted something that essentially is one of the points I was going to make, which is that whether or not you or users think of burn as permanent or not, the thing that matters is whether it is having an effect on the circulating supply or the maximum supply. The circulating supply is the case for Ethereum. That is the effect that it has on that.

[00:31:00.01]

The way I think of it from Ethereum perspective is it does have an effect on Ethereum's equivalent of the maximum supply, but only because Ethereum is infinitely uncapped, it does not have a maximum supply. What it's doing is it's shifting the curve leftwards to later in time. So creating discontinuities from that perspective. But it will still continue to go to infinity if left unchecked. Whereas in the case of Bitcoin, Zcash, anything else that has a fixed maximum cap, a burn that affects maximum supply is a concrete step, a restraining step downwards.

[00:31:46.09] 

Currently, for the examples that Nate gave of setting the zero address or the miners not claiming funds, which was fixed, by the way, and then use six, fixed that the Coinbase transactions are now required to exactly balance. If a miner accidentally doesn't claim everything, then their Coinbase transaction will be rejected now.

[00:32:13.02]

But yet the distinction that I think matters here to make in the Zip, and this is something I think Kris also pointed out in the forum at the end of last year and several times before that, is whether or not the intention for the NSM is to affect circulating supply supply or maximum supply. That's the thing I don't particularly care. The Zip headers have suggested words, have suggested words previously to the NSM authors. Those were rejected at the time, and I don't particularly care whether or not we keep the terms as is or not. What needs to be clear to users is whether or not it is intended for this mechanism to affect maximum supply.

[00:32:58.00] - **Jason**

With DC with Bitcoin, when you talk about burning Bitcoin, it affects the total supply, right? Is that what you're saying?

[00:33:07.38] - **Str4d**

Yes, because there is zero mechanism for altering the issuance curve. The NSM is a mechanism for altering the issuance curve. If Bitcoin had something like it, then you would be able to express burns that only affect circulating supply. The act of adding something like the NSM effectively is moving Zcash from being purely Bitcoin-like to something that is a midpoint between Bitcoin and Ethereum, because it still has a maximum supply, unlike Ethereum, but it enables burns that only affect circulating supply, which the way I described it in a previous Arborist call, I think was like, you can think of it in a sense as paying for future security because you are you are effectively deferring current issuance to be reissued or issued at a future time, necessarily altering the issuance curve, which is something that Bitcoin does not have, and therefore all burns in Bitcoin necessarily always affect maximum supply, not circulating supply.

[00:34:29.50] - **Zooko**

Those are good points, Str4d. I was just going to comment that a good way to measure intention is whether the consensus rule has been integrated and deployed and activated worldwide.

[00:34:41.39] 

Like 235 or whatever the number is, makes it so that the supply of ZEC always approaches 21 million and ever exceeds it. If 235 is going into a network upgrade, then I think it's fair to tell people that's the intention. But if it's not and we're intending to deploy 235 in the future, then I don't know if it's fair to say that's the intention of Zcash. You know what I'm saying?

[00:35:22.41] - **Jason**

We're all clear on how the NSM is intended to work. In terms of the terminology that we use, is that something that we need to figure out immediately, or is that something that we can flesh out in the coming months?

[00:35:45.10] - **Dodger**

To my mind, the issue is that if it's currently phrased in a way that is likely to mislead members of the community, then I think that's a problem.

[00:36:02.32] - **Jason**

But I don't think it's phrased in a way to mislead members of the community, because even if you go back to your description in your poll or the description on our website, it is clear that ZEC is burned and then issued into future block rewards. There's something circular happening, right? It's not just permanently burned and the supply cap is permanently reduced. Nowhere does it say that.

[00:36:29.50] - **Dodger**

So why not just use a different term that is less likely to cause confusion? Because a casual reader who doesn't pay close attention to the details, I fear, is likely to think that, oh, great, this is going to reduce the 21 million ZEC cap. If this happens, this is a great idea, the economics will increase the value of ZEC. And I think that that is misleading.

[00:36:59.22] - **Jason**

Yeah. So Are you saying something like withdraw from circulation isn't ambiguous? Because I wouldn't know what to think if I heard that as a casual Zcash holder. What does that mean? It sounds like it's being removed from circulation. So how do I know that it doesn't impact the total supply?

[00:37:20.08] - **Dodger**

At least then you're triggered to go and find out exactly what it means.

[00:37:40.41] - **Paul Dann**

While Jason is doing that, can I just jump in and say, burning ZEC would increase the value of circulating ZEC. That would be the economic impact, right? It might be that it will come back again later, eventually in like 100 years. But burning ZEC now will have a deflationary effect on the existing chain.

[00:38:06.13] - **Dodger**

But only temporarily because it's going to be reissued.

[00:38:10.32] - **Paul Dann**

Temporarily for the next several hundred years.

[00:38:17.31] - **Dodger**

I think the issue is that anybody who owns... Let's say I own 21 ZEC today. I've got 21 ZEC in my wallet. I can have confidence today that that 21 ZEC represents one-millionth of the maximum supply of ZEC that will ever be issued. I know that if coins are burnt by sending them to a burn address or some other unofficial mechanism, I know that that reduces that 21 million max supply because those coins can't be It can't be returned to circulation. The question is, will the average Zcash user understand that NSM's use of the term burn does not equate to the way that the crypto ecosystem in general uses the term burn?

[00:39:25.05] - **Jason**

I think so long as it's clear that the maximum supply is 21 million coins, But then yes. When you go to coinmarketcap.com and you look at the total supply, it's always going to say 21 million. It's not going to account for Burns and say, 20,000,999.

[00:39:57.11] - **Dodger**

I'm sorry, I'm not sure if I follow your logic there. In any case, what was it that Kris suggested?

[00:40:06.12] - **Jason**

He used the word retraction.

[00:40:11.50] - **Dodger**

Yeah, I think that's good.


____

### 4. Research & Implementation Updates iv) Zcash Shielded Assets

[00:40:46.34] - **Vivek**

Yeah. Hi, everyone. In the last month or so, we've worked on a bunch of things. On the Zip side, we wanted to update that I think we are ready for the next round of the Zip Editor review on our upstream pull request. We resolved the open issues that are there on the repository. We made some consensus rule. We rewrote it so that it matches how things are written in the spec PDF.

[00:41:17.14] 

We've added action groups, we've added reference notes, and the computation of the row field for issue notes, along with various other relevant changes alongside. Whenever the next Zip Editor's meeting is, if that can be added to the agenda, that will be nice. I've posted it on the Discord in the appropriate channel, so that should be that.

[00:41:43.32]

We've been making the implementation changes for these Zip updates as well in Orchard, Librustzcash. We've also updated the test vector, so I'm merging those things into Librustzcash, and We're getting that ready as well. We've been working on Zebra as well. We've been, I think, trying to reduce some duplication of code between Orchard and Zebra along the way. We've been working on asset state management, and again making these Zip changes I mentioned wherever they are relevant.

[00:42:22.47]

I guess one thing that happened in the last month was that we gave a demo a community call just before the holidays. If someone's not seen that, definitely check it out. It's on YouTube in the Zcash Foundation channel. We also, based on that demo, the same functionality. I think we are pretty much ready with the first testnet.

[00:42:54.37] 

I think it uses GitHub Actions, and it seems pretty simple to just Just take that and use that to run the things you want yourself. I don't know. I think we're just figuring out some of the final things, and then we'll post when that's ready as well. So besides that, we got an audit report from least authority that was generally positive. I think some suggestions that are there, we want to just run those by ECC before we finalise all that stuff. That's for ZSAs.

[00:43:35.17]

Then we've also, on the asset swap side, we've completed a good portion of the implementation changes for Libra C-Cash, Orchard changes were done in the last update. And I think the Zips right now are not... The ZSA Zips have moved a bit ahead, and accordingly, the asset swab Zips need to be changed accordingly. That's not done yet. I'll be working on that in the coming weeks.

[00:44:06.30]

Also for the user control and the transaction acceptance stuff, we had prepared designs in a document or in a forum post last time. And we have also made a draft zip with those, like what changes would be required in the protocol side of things. I think it's still an internal pull request. It's not to upstream yet, but that's there. And I guess maybe Jason will mention it for the ZCG side of things, but we also submitted a grant proposal for some support for the work that we've been doing and will be doing in the coming months for getting the ZSAs ready and developing. So just wanted to bring that to everyone's notice as well. That's what I have for now.

____

### 4. Research & Implementation Updates v) NU7


[00:46:05.32] - **Jason**

Yeah. So where we left off was I think Dodger was originally going to possibly poll with the ZCG poll, and it sounds like that got deferred to mid to late January. We made progress on how to phrase the questions, all that was handled transparently. And I guess the question that now comes up where we're talking about the terminology used in the NSM is, are we okay with the language that we loosely agreed on or we had considered, or do we now need to go in and amend that? Again, my position is the way that it's laid out, it's clear that there is no permanent burning, like that the intention is to reissue it in future block rewards.

[00:46:57.53] - **Dodger**

I think you should go away and have a think an alternative term. 

[00:47:15.20] - **Pili**

Do we have any updates on the poll and what the likely timing is for that?

[00:47:23.59] - **Dodger**

No.

[00:47:30.08] - **Pili**

Any other thoughts, comments, discussion on NU7? I think it will be important to see the results of the poll, see what the community thinks we should prioritize. If we are not able to get everything into NU7 or if we think that the complexity budget is succeeded, but I guess that will come after the poll results. Okay. It seems like there's not last chance, I guess, to bring anything else up about NU7.

___


### 5. Open Announcements i) ZIP editors Meetings / ZconVI RFP submission

[00:48:14.47] - **Str4d**

I think the only thing I'll mention is from the IP editor side, we'll be restarting our meeting, the per-hour schedule, the next, the first Zip editor meeting of this year is meant to be next week, although that does coincide with the ZECC summit. So we'll figure out whether we do it that week or shift it a week or something.

[00:48:46.49] 

so I think the main next thing that we'll be needing to work on besides further review of any non-semantic changes to the candidate zips and the previously discussed potential semantic changes to the ZSA zips around action groups. The other thing that will be kicking off there is defining the V6 transaction format and signature hash. They'll be starting the zip editor discussion in the next week or the week after, depending on when we schedule that for.

[00:50:27.31] - **Pili**

No, that's it. I think the The RFP deadline for ZconVI is this Sunday. So if you want to submit a talk, please do so by Sunday.

[00:56:24.52] - **Pili**

Any other discussion topics for today? Okay, last chance. Nate, go ahead.

[00:57:05.13] - **Nate**

Yeah, I just, on the spur of the moment from the discussion about terminology, made a poll on X. So if you're into X, you could contribute to that poll.

[00:57:20.41] - **Pili**

Thank you, Nate. Thank you, everyone, for joining today. The next average call will be on Thursday, January 23rd, at the later time of '21 UTC. See you then. 

____


**Next Meeting Scheduled: 21:00 UTC January 23rd 2025**


___
___
