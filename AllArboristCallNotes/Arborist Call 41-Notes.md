# Arborist Call  #41 Notes

Meeting Date/Time: December 1st 2022, 16:00 UTC

Meeting Duration: 45 minutes

**Agenda**: 

+ Zebra Status 


+ Research & Implementation Update
    

+ Core Update


+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://ipfs.io/ipfs/QmbYEFgridwZrR8Sn8ZyVSTqDfTnQp4btjDRmsFSZe26cM)

Moderator: Sean Bowe

Notes: Jason Rogers

___

## Decisions & Action Items


i) Coordination meeting between QEDIT & ECC on circuit size

ii) Meeting with Ledger, ECC & Zondax around v4 transaction support 

iii) Merge ZSA fees with ZIP 317 


___

## Full Notes



### 1. Zebrad Updates - Status Update 

[02:18] - **Deirdre**

Some of Zebra updates, a little bit of CI work. We were having a lot of trouble in the past few months where we spin up and spin down containers with our builds and our full nodes and lightwalletd in Google Cloud and so we were SSH'ing to these vm's that we just spun up and they weren't quite ready and there was some syncing issues with SSH keys, we tried a lot of stuff to figure it out and I think we've nailed it down so now we have a much more reliable not flappy, failing spuriously CI & Integration testing which is very nice for us. Which is less wasted cycles for development on Zebra and all of our users.

[03:15]

Another big thing that we just merged in, a nice optimisation is we check our Sprout Anchors for the note commitment tree in parallel using a rayon thread pool because those checks were highly bound by cpu. Previously I think we were doing them with Tokio but as we've learned with some of our other stuff recently if you have work that is highly cpu bound, tokio won't adequately work the way you would like but if you use something like rayon which is cpu bound it will do it a much nicer way. That just got merged in. 

[04:04]

Stuff coming down, we have a preliminary implementation of ZIP 317, of how to pick transactions and put them into a block template out of the mempool based on these new fee rules. They are trying to ameliorate these sandblasting attacks that we've been seeing on mainnet. But as of yesterday there are some updates to ZIP 317 so I think we will be updating that implementation in response, that should be coming soon. 

[04:39]

On a different Foundation note, the FROST - IETF specification is in the last call in CFRG. I think the end of this week is the end of call for comments & feedback. Frost Threshold Signature scheme has been designed with some of the constraints of things like Zcash and other cryptocurrencies in mind where you want to share trust of who can authorise a spend across more than one party in a nice and secure way with as few rounds as possible. If you have any feedback or support for FROST you can join the CFRG mailing list and send an email. It might be Icing on the cake at this point but all of it helps support FROST and give it support in the broader cryptographic community. 

[05:43]

We are planning to release our implementations of the FROST cipher suites on crates.io pretty soon. We've been iterating on those for months and we have a nice core library that they are all built upon that we are also using to build the Zcash compatible versions of FROST that support rerandomisation so that we can deploy it for Zcash & anyone else can use it. Any questions?

[06:24] - **Sean Bowe**

What do you mean by 'checking Sprout Anchors'?

[06:25] - **Deirdre**

I think it's literally a lookup. Computing the updated tree and then doing our stateful lookup and that is constrained by cpu and not just blocking I/O and things that tokio is not nicely doing. Trying to squeeze out anything around note commitment trees that we can parallelise or that we can spawn off into a cpu bound thread because any of those updates seem to be more cpu bound than tokio worker threads. Standardly if you spawn a tokio worker thread it allocates. Link to Sprout Anchor changes: https://github.com/ZcashFoundation/zebra/pull/5742/files


___


### 2. Research & Implementation Updates - ZSA issuance & transfer fees


[07:42] - **Sean Bowe**

Research and Implementation status updates, I'm guessing this is where QEDIT or anyone else wants to give updates on stuff they are doing. 

[08:09] - **Jon QEDIT**

I'm happy to briefly share. It's my first Arborist call, happy to join. We are moving nicely through the different milestones. The latest thing we accomplished was updating the fee proposal. There is a conversation on what fees would look like on Zcash shielded assets. We looked at several directions but the main important thing is how to connect it to the previous work on fees that was proposed. If i'm not mistaken there is a comment that we should merge this work directly in the new fee ZIP so we will do that. 

[09:12]

We already accomplished issuance but the transfer we've divided into the protocol & the proof side. Most of the protocol is done we have some work on the burn right now ready for PR. The circuit itself is moving along, I think we are going to finish this mid January with some tests.

[09:22]

I wont go through all the milestones but we believe we are going to be around end of January with something that can be used by outside people trying to connect it maybe to a testnet & starting the work on making this real for other people and at some point we will need to discuss coordinating the work being done by the ECC on the circuit size because we are beginning to raise a flag because you are touching stuff super optimised and we are in the same areas, in the end it's all going to need to fit together. So either we find a way to modernise all of it or we release it down and figure out how the merge work will look like. It's not for now but at some point further down the line we are going to need to sit down and figure out that circuit. 

[11:16] - **Daira**

Looking forward to it. 

[11:26]- **Jon QEDIT**

That's the actual stuff. On the more zoomed out, Daniel who has been our proud face of QEDIT to the Zcash community is now Daniel in the Zcash community but not part of Qedit, he's starting his own next phase so I am taking over some of the conversations that were with Zcash. I was involved in the past but I am going to have a more direct role which means I am in calibration mode finding out how I can be helpful for this community & QEDIT in general with our set of skills and Daniel being helpful but not representing Qedit. 

[12:41]

Other than that we had an amazing zkproof 5 event. I highly encourage you guys to check out the [Youtube](https://www.youtube.com/@zkproofstandards1776). I actually want to thank both the Zcash Foundation & the people at the Zcash Foundation who helped us figure out how to create an event of this magnitude. It was really fun to have and hope you will see it in the talks. I recommend in particular the 3 keynote talks every morning there was a different keynote. One from [Justin Thaler](https://www.youtube.com/watch?v=wnNKbWuY4wE), from [Mary Maller](https://www.youtube.com/watch?v=uZAOt6_fZ1k) and one from [Kobi Gurkan](https://www.youtube.com/watch?v=ru-fCNOWals). Highly recommend it. 

[13:36] - **Dodger**

Just have a question, what is the current thinking on the fees? I know there's been a lot of back and forth but what's the current thinking?

[13:53] - **Jon QEDIT**

First and foremost to be compatible with what is discussed outside, trying to figure out how to have proportionate fees to the stress that it puts on the blockchain & consider the transactions in a similar manner to ZEC transactions. There was a question very quickly discarded of 'do we want to tap into the value of the token itself'? Do the people validating the transactions get a cut from the underlying value? Big no because it leaks privacy, changes the incentives but we considered it, briefly. 

[14:47]

We basically took the formulas that were in the fee proposal, I forget the number. 

[14:56] - **Daira**

ZIP 317

[15:06] - **Jon QEDIT**

Exactly, and we try to see how we fit the practicalities of ZSA. There was a question on issuance. Do we want to have an issuance that's a bit higher in fees when you issue a token so you don't have spamming of infinite assets and there's two schools of thought here. One is the way it works in the Ethereum case, anyone can create a token & nobody cares because there is no place where it is all listed at once - unless you pay the bribe to the exchange to list your token. The other is at some point we will want to list them somehow as a resource. Not a name resource but, a resource so you need to pay 1 ZEC or 0.5 ZEC. It's all in the [ZIP](https://github.com/zcash/orchard/pull/364) and of course it's open for comments and happy to adapt it. 

[16:09]- **Deirdre**

Happy to have you Jon. 


___


### 2. Research & Implementation Updates - i) Zondax Ledger support 

[16:34] - **Daira**

Do Zondax have anything?

[16:39] - **Ainhoa Zondax**

Hi everyone, I am Ainhoa from Zondax and our other two colleagues are also in the call. We developed the new version of the ledger app for Zcash that my colleagues were presenting at Zcon & we were very excited to move on sending this to ledger and we initiated conversation with ledger. We have at the moment 2 blockers. One is we made a PR to enable this new app to be compatible with Zecwallet and this PR is still open so this version is to be reviewed & merged and closed so that ledger can move on with the review.

[17:22]

The second thing is that this app supports v4 but not v5. This was not in scope in the development. Ledger was telling us that the current app that is a fork of Bitcoin supports v5 and that this could be a blocker for taking this new app into review for public release. Those are the main topics I wanted to bring here. 

[17:53] - **Dodger**

I asked Zondax folks to join just to get some feedback from some of the attendees about whether they think that only having support for v4 is a problem. I'll confess that I only found out about this in the last couple of days, I haven't had a chance to research it myself. 

[18:20] - **Daira**

From a technical point of view, v5 transactions are needed to do anything with Orchard. 

[18:32] - **Dodger**

This will be for Sapling only. 

[18:35]- **Daira**

If you're sending transactions then it's always possible to send them as v4, provided they have no Orchard components and that shouldn't cause any problem. The only other difference between v4 & v5 essentially is that v5 txid's are non-malleable. I wouldn't think that would be much of a problem because it tends to only matter for higher level protocols that are relying on the Transaction ID being stable. 

[19:28] - **Deirdre**

V5 is required for Orchard, v5 is required for ZSA's.

[19:43]- **Dodger**

Just to reiterate, the scope here is Sapling shielded transactions on ledger at the moment. 

[19:47] - **Daira**

So from what you're saying it seemed that Ledger was raising this as an issue. 

[20:04] - **Ainhoa Zondax**

Yes, the current app supports v5 and they don't want to have a new app with less functionality or less support than the previous one. 

[20:12] - **Daira**

But the current app doesn't support Orchard. 

[20:18] - **Ainhoa Zondax**

They told me that they did some changes to have support for v5. But they don't support Orchard transactions. 

[20:27] - **Kris**

It likely means that they support creating v5 transactions and parsing them but they presumably still need to be able to parse v4 transactions. It may be a bit confusion about whether or not they should be creating v4 transactions. It's fine for them to create v5 purely transparent transactions & v4 sapling shielded transactions. 

[21:07] - **Juan Leni Zondax**

I was going to add that, I think the vision here is that originally Ledger made their own app, basically a fork of the Bitcoin app that only supports transparent transactions. They have upgraded that to v5, they have a legacy app that has v5 or Transparent. In parallel is the Ledger app that support for shielded transactions with sapling & Transparent transactions - sapling style.  The thing is if we submit it to ledger, ledger says that it is a regression because now they need to go back to only sapling transparent and they are going to miss v5 transparent. So in a way, we will need to modify the app that has shielded support we are submitting to generate and sign v5 transparent & v4 sapling. 

[22:11]

A follow up question that I have, is there a situation where we might not be able to mix outputs? So if someone sends me Orchard transaction & I cannot move the funds anymore?

[22:37] - **Daira**

UTXO's are not tied to a transaction version. The transaction version is independent of that. 

[22:52] - **Kris**

I might understand your question differently than Daira did which is that it's not possible for someone to send you an Orchard note if your wallet is not producing an Orchard address. So, you'll never get an Orchard Note sent to your address because you're not generating the Orchard addresses using the appropriate curves and so forth. 


___


### 2. Research & Implementation Updates - ii) Zondax Ledger support 

[23:17] - **Juan Leni Zondax**

So the summary of the situation with ledger is that they have upgraded the Transparent part to v5 and we have v4 Transparent + v4 Shielded and they don't want to have this kind of regression. 

[23:35] - **Daira**

I can see their point of view that it's complicated & we want to be moving to v5. From a technical point of view there is no loss of functionality if you would only be doing sapling anyway. I guess there is the thing of transaction id non-malleability which doesn't really matter in this context.

[24:00] - **Kris**

What about parsing though? Because if the wallet needs to be able to parse transactions then it will need to be able to parse v5 transactions contained in sapling. 

[24:10] - **Daira**

Right, I assumed we were only talking about sending. But yes, you absolutely need to be able to parse v5.

[24:22] - **Juan Leni Zondax**

When you mean parsing, you mean to calculate balances right?

[24:28] - **Daira**

I don't know how your part of the app would interface with the rest of the app that is doing things like transaction parsing. Maybe this is something that we need to take offline and go into the details or maybe have a separate meeting with you.

[24:54] - **Juan Leni Zondax**

This was point one of Ainhoa was describing. The other I am not sure if it is the scope of this call or not but the other one was a request to zecwallet. Eventually, we could submit to ledger but we need zecwallet to somehow merge our pull request and right now it's starting to get a bit behind and there are merge conflicts. 

[25:28] - **Dodger**

I've reached out to Aditya at Zecwallet and asked them what the status is so hopefully he will get back to us. The current Ledger app, that uses Ledgers own frontend right? 

[25:58] - **Juan Leni Zondax**

It can be both. Its irrelevant but we also help a bit so ledger could use that. You have ledger live - at the moment it doesn't have any integration for shielded transactions, it only understands our legacy app. I am not sure if they are going to just adjust it. Initially I would say they would keep that working as transparent. The shielded transactions will happen in Zecwallet. Maybe Ainhoa you know if they are keen on adding support for shielded transaction in their own frontend?

[26:39] - **Ainhoa Zondax**

You mean in Ledger live? Yes but before moving into that the new app needs to be released, so it's a next step. I don't think this is in the scope for this year or in the really short term. But I think the first thing is to unplug public release because then we can move into things like Ledger Live and this brings also to topics like support for Ywallet. To be able to add support for Ywallet we need the app to be released so we can use it with the Nano X. 

[27:21]- **Dodger**

Sorry, I'm missing the context there of the support. Why do we need the app to be released before we add support for Ywallet?

[27:28] - **Juan Leni Zondax**

At the moment there are two main wallets in the market. One that is called Nano X that has bluetooth that has bluetooth support and the other one doesn't. For some reason and just to complicate the puzzle the one with bluetooth support doesn't support siteloading so the only way to get an app in that device is Ledger to release a signed version of the app. So the only we can get an app with bluetooth that is what a Ywallet mobile phone will need, is that we have a public release. 

[28:20] - **Dodger**

Let's set aside mobile phone support for the time being and just focus on Desktop support. 

[28:30] - **Juan Leni Zondax**

In the case of Desktop support, the one that is in the market that can be siteloaded is called Nano S plus. We can siteload that. We have a pull request with Zecwallet that works and then we don't need ledger for that specific case. Of course that means that you are site loading, there are no assurances or checks from Ledger. It would be kind of like 'Put it on your own'. But that one doesn't need site loading and it could be integrated with anything immediately. As long as people use the API and integrate they could do that.

[29:07] - **Dodger**

There's a pull request against Zecwallet lite desktop app right?

[29:17] - **Juan Leni Zondax**

Correct.

[29:18] - **Dodger**

If we talk about only Ywallet desktop. If we ignore mobile completely because I feel like we're just complicating things and it will take even longer. If we forget about mobile completely, are there any other obstacles?

[29:45] - **Juan Leni Zondax**

As far as we see, there is a need for this integration into Ywallet but they could using Nano S plus even if Ledger does not release - the engineering work and everything should be okay. As long as we are talking about sapling. 

[30:09] - **Dodger**

I am concerned here that there is confusion around the scope. So we're talking about Sapling only, Desktop only - not talking about mobile. A usb interface just to be clear here. I am concerned that talking about side loading onto bluetooth complicates things and risks causing confusion.

[30:45]

is it worth trying to get the Ledger folks to attend a meeting with yourselves & with us?

[31:01] - **Ainhoa Zondax**

Yes, they asked already. 

[31:11] - **Kris**

Is Aditya still the primary maintainer of Zecwallet at this point and what is the future of maintainership of Zecwallet as it is not something that he is primarily focused on as far as I understand?

[31:40] - **Dodger**

I believe he's partnered up with a developer to work on it. Any questions about the future of it, you will have to ask him. I feel like people are constantly asking the foundation about Zecwallet, it's an independent project we funded it's development originally we don't control it or oversee it. You always need to remember if you have questions about the future of Zecwallet, the foundation is not in a position to answer those questions. My understanding is that he is working on other projects but he has got a developer working with him that's doing the actual engineering work on Zecwallet. 

[32:35]

How about we try and circle back with all the parties involved and would ECC be willing to have one or two of their engineers attend that meeting as well?

[32:45] - **Daira**

Yes, I wont be available from December 10th but before this yes. 

[32:53] - **Dodger**

Okay, lets take this offline then I'll start an email thread with Juan and Ainhoa. 

[33:15] - **Daira**

I had just one more question, are there any plans to do audits of any of the code involved here? Either on the Trezor or the Ledger side?

[33:31] - **Dodger**

Good question, it's not currently planned but it would absolutely make sense. 

[33:39] - **Daira**

Especially the cryptographic code, obviously there's a lot of potential for error there but also the design of the communication between the components. 

[33:53] - **Dodger**

Let's treat that as a separate question because we are just never going to get anywhere. 

[33:58] - **Daira**

I'm not suggesting it should be a blocker in this case. 

[34:02] - **Dodger**

Let's try and get anybody who needs to be on into a call & see if we can get some clarity. it sounds to me like having v4 transactions shouldn't be an issue but do sympathise with the idea that they don't want to regress if they're supporting v5 transactions. If everything will continue working then it begs the question of whether it makes sense. 

[34:41] - **Daira**

I see upgrading it to v5 as an extended scope that we can decide on later. 

[34:55] - **Juan Leni Zondax**

Just very briefly for context, it was not a formal review but we opened up the code some time ago and people from ECC, Daira & St4d had a look. I feel we've been asking this a few times already if we can get this high level audit too. I guess eventually when Ledger publishes that they will audit anyway but i don't think they will audit at the cryptographic level, probably they will look for more coding issues like buffer overflows and things like that. 

[35:37] - **Daira**

Our bandwidth to do reviews like that has been quite limited recently. We are getting to the point where we might be able to do that - not committing to anything. 


___


### 3. Core Updates & ZIP 317 modification

[35:51] - **Sean Bowe**

In the interest of time we could move on. Im going to do a quick update from our core team. There's probably stuff i've missed, this is just stuff I can remember we've been doing. We've been working on a 5.3.1 Zcash release that contains some significant memory usage improvements. We talked about it in a previous Arborist call but that release is going to come out this week or next week.

[36:32] - **Daira**

The other important thing it contains is an assertion error that sometimes happened when you shutdown and restarted it, it would happen on restart. That only happened when you generated Orchard keys. 

[36:56] - **Sean Bowe**

There was also some RPC changes as well. Obviously as quite a few of you know we've been working on ZIP 317. I wasn't at the zip sync this week but there's been some changes and theres a new PR that Daira opened to address some potential problems in that proposal. 

[37:22] - **Daira**

I can talk about that in more detail. Madars was one of the people that originally suggested this fee change. As background, the aim of the fee change is to make fees more accurately reflect the load on the network. For several months we've been having very high shielded transaction usage - sandblasting. We've made changes to Zcashd to partly address this, we are in the process of making changes to the mobile sdk's as well but in addition to that currently most transactions only need to pay a flat fee. That fee is relatively low, assuming this is a denial of service the cost to the attacker has been very low. 

[38:47]

So we want to make those fee's proportional to the number of Logical Actions in a transaction. A generalisation is the number of Orchard actions. This generally increases fees which has the issue that if wallets don't upgrade then they will not be able to get their transaction if we were to immediately enforce the new fee calculations as a hard requirement. 

[39:29]

Instead what ZIP 317 does is if the fee is less than the conventional fee there is some probability of the transaction getting in. The specific way that we were doing that had a vulnerability where an adversary could use several transactions that are close to the conventional fee and then one transaction which is much larger (inputs/outputs) that paid almost a zero fee. Because the average weight ratio (ratio between fee that is actually paid & conventional fee) was high - The amount of the block that the algorithm would aim to fill is high so the attacker could get their large transaction in. 

[40:50]

The way the modified algorithm in this PR works is you have the concept of Unpaid Actions which is 'how many actions are not covered by the transaction fee at the amount defined by ZIP 317'. So we allow a fixed maximum number of unpaid logical actions per block and then that has the nice security property that we can bound the effort that is spent on processing those unpaid actions. 

[41:56] - **Sean Bowe**

There's that, and we are continuing to work on DAGSync and working on recursion for Halo 2. 

___


### 4. Open Discussion - Orchard Transaction Builder


[42:21] - **Dodger**

One question, there was a wallet developers call a while back and one of the issues that came up was the availability of a transaction builder for Orchard. Just wondering what that status was there. 

[42:47] - **Adi**

Yes, we did have the wallet dev call in early November. We did bring up a couple of issues and now we have merged the call with the light client working group. Our first call will be later today. As for the transaction builder, i think the most of the focus right now is to improve the rust library which is named as Zcash light client kit. That is all I am aware of now. We can discuss more of how we want to make this transaction builder. Do we want to have scripts in particular languages or binaries? Or how do the developers want to see this?

[43:37]

On a side note I did notice someone shared the Zingo Labs CLI using a fork of Zecwallet CLI on the Free2z Twitter page. I think that has a decent number of examples if anyone wants to test out transaction building including Orchard transactions. 

[44:07] - **Dodger**

So we're not waiting on a transaction builder, the PR's been merged?

[44:13] - **Adi**

Those are other conversations that the Zingo labs team brought up. They wanted the Orchard v5 support ready in the core rust libraries, we'll be discussing that later today. 

[44:33] - **Dodger**

Just to check, will someone from ECC be on that lightwallet group call?

[44:43] - **Adi**

Pacu couldn't join today, he would be the one. 

[44:44] - **Kris**

I can be there. I do not have an invitation to that call. 

[44:56] - **Adi**

It's starting in 1 hour from now.

[45:28] - **Kris**

I can be on that call to discuss the PR with respect to the Orchard support in transaction builder. 

[45:55] - **Sean Bowe**

Thanks everyone for the discussions. 


### Attendees

+  Ainhoa - Zondax

+  Daira

+  Ida

+  Juan Leni - Zondax

+  Jon - QEDIT

+  Deirdre

+  Aditya ZCG

+  Kris Nuttycombe

+  Dodger 

+  Pili

+  Taylor Hornby

+  Autotunafish

+  Greg Pfeil

+  Vkbdev

+  Yasser Isa

+ 

___
___

**Next Meeting Scheduled For: December 15th 22:30 UTC**
