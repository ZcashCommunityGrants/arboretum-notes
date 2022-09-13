
# Arborist Call  #35 Notes

Meeting Date/Time: September 8th 2022, 15:00 UTC

Meeting Duration: 1 hour

**Agenda**: 
+ Zebrad Status Updates
+ Zcashd Status Updates
+ Open Discussion


Video of the meeting: [recording](https://www.youtube.com/watch?v=Cpw__dtZLpA)

Moderator: Steven Smith


Notes: Jason Rogers

___

## Decisions & Action Items

i. Roadmap around ZIP 317 & ZSA Fee Changes 

ii. File Issue on Librustzcash regarding UA's w/ Orchard components [#630](https://github.com/zcash/librustzcash/issues/630)

iii. ZSA team discussion around circuit optimisations

___

## Full Notes



### 1. Zebrad Updates 

[02:46](https://youtu.be/Cpw__dtZLpA?t=165) - **Marek**

Hello I will give the Zebra this time. A week ago we released [beta .14](https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-beta.14). The CI works really well now which is amazing. The start command for Zebrad is now the default one. Zebra used to update its tree state twice for each block once it stopped checkpointing so we fixed that and that made the sync faster. We also fixed a regression in lightwalletd syncing that was caused by using rayon threads. We reverted that. That's basically the main summary 

[03:37](https://youtu.be/Cpw__dtZLpA?t=217) - **Steven**

What is the thing with rayon threads? We were looking at some memory allocations that involved rayon threads. What was that issue?

[03:48](https://youtu.be/Cpw__dtZLpA?t=228) - **Marek**

I think we were deserialising transactions in rayon threads and that was unnecessary overhead. [PR 4933](https://github.com/ZcashFoundation/zebra/pull/4933). 

[04:09](https://youtu.be/Cpw__dtZLpA?t=249)

We are currently making sure that the release process for Zebra release candidates will be smooth. 

[04:31](https://youtu.be/Cpw__dtZLpA?t=271) - **Deirdre**

We have a new engineer and they started last week. Arya is joining us and one of their first commits was that instead of doing zebrad start every time you can just run zebrad and it will do zebrad start as default and apparently that was a tricky thing to do based on the library that we used to scaffold all of our commands and config for our command line configs because they don't want you to do it like that by default but welcome to Arya!

[35:59](https://youtu.be/Cpw__dtZLpA?t=2159 - **Adi**

Since we are on the wallet discussion, just want to hear from the Zebra team about their progress. What is their timeline on adding the wallet functionality to the Zebra node. 

[36:15](https://youtu.be/Cpw__dtZLpA?t=2170) - **Dodger**

It's not on the roadmap at the moment. We've been focusing on adding the drop-in Lightwalletd support and now we are looking towards "getblocktemplate", theres no plans right now to have a wallet built into Zebra itself. That may change in the future but right now it's not on the roadmap. 

[36:44](https://youtu.be/Cpw__dtZLpA?t=2200) - **Adi**

Got it, maybe someone can talk about the use cases of Zebra, I believe one is being a consumer and serving the blocks. Are you also planning to be a mining client? 

[36:55](https://youtu.be/Cpw__dtZLpA?t=2213) - **Dodger**

We are not planning to build a miner into Zebra but we are planning to add the getblocktemplate that will allow miners to use Zebra to generate the block template that they will then mine using whatever software they use. 


___

### 2. Zcashd Updates i) Sync time improvements


[05:23](https://youtu.be/Cpw__dtZLpA?t=323) - **Steven**

Moving on to Zcashd, quick update on the protocol side. As everyone is aware we've been exclusively focused on mitigating the impact of the shielded transaction load. On the Zcashd side we've put out 5.1.0. / 5.2.0, we talked about that last time. That has seemed to make substantial improvements on the node side. Our focus now is speeding up wallet sync. There's also an issue which we are working on, a few people have reported in the forums and through GitHub an increased memory usage during sync. Some users have hit an OOM condition. We've actually recreated it and identified an initial fix which we believe will reduce peak memory usage. 

[06:27](https://youtu.be/Cpw__dtZLpA?t=387)

It doesn't appear to be a leak, it's just because of the amount of processing that we are doing at any given time was an increase based on the blocks that we are processing and the increased number of shielded transactions it was driving up peak memory usage. We've got a few things we're going to be testing to help with that over the coming week or so.

[06:56](https://youtu.be/Cpw__dtZLpA?t=412) - **Daira**

I think there might actually be more than one contributing factor to some of the out of memory conditions people are seeing because some of the people who are seeing it are not doing scanning with shielded addresses. There must be something else in addition to that. 

[07:14](https://youtu.be/Cpw__dtZLpA?t=434) - **Steven**

I noticed that. I think the one you're talking about was the one you were looking at this morning. They had an 8gb VM configured, which i've seen steady state get up to even a little over 9gb. I don't know if we've gotten to the point where we are exceeding 8gb regularly or it is something else. 

[07:36](https://youtu.be/Cpw__dtZLpA?t=456) - **Daira**

There could be other things that we can optimise memory for. 

___

### 2. Zcashd Updates ii) Fee Mechanism Changes / ZIP 317


[07:48](https://youtu.be/Cpw__dtZLpA?t=467) - **Steven**

The third item on here. Adi from Nighthawk had created a ZIP proposal that included some fee changes. [ZIP 317](https://github.com/zcash/zips/pull/631). Nate in particular who has been heading up our research around all things PoS, Interoperability etc. He's shifted his research focus over to Fee mechanism changes. That's something we have always had down the road, an EIP 1559 type thing but given the proposal and our priorities for trying to scale well to the load that we are seeing Nate shifted his research. 

[08:40](https://youtu.be/Cpw__dtZLpA?t=520) - **Nate**

Basically i am coordinating with people at ECC. I think generally we support this kind of proposal, modulo some tweaks or specific parameters. We are also trying to integrate user research and on-chain research with it to make sure we are understanding the potential impact for all users. I am thinking we want this to be part of a sequence of changes to the fee system that can improve usability over the longer term. 

[09:35](https://youtu.be/Cpw__dtZLpA?t=575) - **Steven**

The key there is one, the mechanics of a fee proposal or fee change. The other is are you playing whack-a-mole with what you are trying to address and would you potentially impact 'typical' usage of Zcash maybe not some of these larger extreme transactions that we are seeing. Greg, one of our new engineers on core at ECC has been doing analysis of historical transactions so we can actually look at what a transaction paid and with various potential fee changes you could look at what a transaction would now pay 'x' instead of 'y'. So we want to be careful with something like that. 

[10:39](https://youtu.be/Cpw__dtZLpA?t=639) - **Daniel**

Thanks Steven. I didn't get a chance to review [ZIP 317](https://github.com/zcash/zips/pull/631) yet but I would preferably want to talk about it a bit more in length. We do have a concrete proposal that we are writing now for fees, specifically for ZSA. Our proposal was saying Sapling & Transparent will stay as is and then we will change the way ZSA's are done. Specifically we wanted to do two things; One is to lower the price per byte/per action for ZSA in order to incentivise the use of ZSA. The second thing is for issuance is a fixed fee per issuance and the accompanying smaller fee per output for the issuance. 

[11:43](https://youtu.be/Cpw__dtZLpA?t=703)

The way that the issuance works is when you do the actual issuance there is a state thats recorded on consensus and then you are going to be able to send those issued assets to different addresses. For every one of those it's an output. It's transparent but it's like an output note of the action. First of all I want to hear the feedback from everyone. Our idea was that we do want to maintain ZEC as the core currency and increase its value with ZSA even. Also to prevent trash going into Zcash. So if we put a high fee for issuance, let's say something round like 1 ZEC. We wouldn't want all the fee to go to miners necessarily. You could get a pump/dump mechanism but it could go to a prosperity fund or the Zcash Foundation fund or the Grants Committee fund. Paying people issuing will basically be paying the network itself.

[13:12](https://youtu.be/Cpw__dtZLpA?t=792) - **Steven**

Is that in one of the ZIPs you already have out there Daniel?

[13:14](https://youtu.be/Cpw__dtZLpA?t=795) - **Daniel**

We are literally finished writing it in the next week or two we wanted to push it ASAP. This one came first. I don't know if the idea would be to merge them. Better than having two zips, or we could differentiate the two ZIPs based on ZSA & non-ZSA.

[13:41](https://youtu.be/Cpw__dtZLpA?t=816) - **Steven**

I'm looking forward to that. I worked with the GMU folks on the mechanism study they did along with Nate who authored the myriad of mechanisms they analysed. Looking forward to seeing that. 

[13:57](https://youtu.be/Cpw__dtZLpA?t=833) - **Adi**

Thanks Steven. I want to say thank you to Nate for shifting the priority to this fee mechanism change. I know this is an ongoing topic in the Zcash Ecosystem but just looking at how much the chain has grown in the last three months and the blatant use of the blockspace, blockchain transaction size and still paying the minimum fee, that is what prompted the research into this. I have also been coordinating with a lot of other Zcash developers who support this kind of proportional fee mechanism for the transactions and based on what Daniel said, I am definitely open to review & read the fee structures planned for ZSA's. I am all for supporting incentivising ZSA transactions but we have to be careful of intentional or unintentional spam attack. I still view ZSA's as something that is not current, it's supposed to come to mainnet next year or later. The priority is still for the transaction fee change. 

[15:10](https://youtu.be/Cpw__dtZLpA?t=910)

I did review Nate's last message in the GitHub discussion for the ZIP. I think the issue that is that there is still a lot of wallet code in the mainnet and live use which is relying on old bitcoin-style fee structures for Zcash transactions so there will be some changes that will have to be made by every wallet, developer, exchanges, hardware wallets to adopt this new function. The delivery of this new updated fee structure has be very carefully coordinated with the whole ecosystem so people can actually make transactions after the change happens. I look forward to discussing this with Nate. 

[16:04](https://youtu.be/Cpw__dtZLpA?t=964) - **Nate**

Daniel, the proposal for fees related to ZSA's, thats a totally different timeline than [ZIP 317](https://github.com/zcash/zips/pull/631). I think a prudent step I would like to start working on in addition to 317 is sketching out a roadmap. Even for 317 I think we should break out it's deployment into phases or maybe separate ZIPs where the first phases have wallets implement the rules and deploy that as quickly as possible and learn what we can from that. A later phase might then be changing transaction relay rules. Both of those don't require consensus changes so they could happen relatively quickly which is necessary given the current chain usage. 

[17:08](https://youtu.be/Cpw__dtZLpA?t=1028)

Beyond that we want to start thinking about if we want to extend that mechanism more. One idea I am interested in is having the possibility of the fees fluctuating depending on network congestion. Thats one axis, other functionality might be on the axis. Maybe what do fees look like for ZSA's? A different axis is the deployment pipeline from wallets to relay rules to consensus rules and they interact. We can do some functional things prior to doing consensus changes and we probably should be doing that. Then following up and reinforcing things with consensus changes where we can. Figuring out that roadmap together will be helpful but I don't want to slow down 317 right now. I'd want to keep the scope focused on the short term issue. 

[18:30](https://youtu.be/Cpw__dtZLpA?t=1111) - **Daira**

I am less worried about the issue of transparent-only wallets not changing their code because transparent-only wallets are already responsive to where the transactions are getting into the chain and they adjust the fee rate based on that. Also they use a fee rate which is dependant on the size of the transaction. For a fully transparent transaction, thats going to be approximately proportional to the number of inputs + outputs anyway. It's expected that as long as we don't choose the parameters so that the fees are really high then transparent wallets even if they don't change their code are going to work for the vast majority of transactions. 

[19:40](https://youtu.be/Cpw__dtZLpA?t=1179) - **Nate**

I think that might be true based on what we know about code. I want to be cautious about understanding users & use cases, especially if we are going to do stuff beyond 317 such as dynamically adjusting fees. 

[20:08](https://youtu.be/Cpw__dtZLpA?t=1208) - **Daira**

We know that there are definitely some wallets that will have problems because there are some wallets using the old fixed fee of 10,000 zats. Those will have a problem whenever the transaction would need to pay more than 10x the base fee. There will be wallets that have problems. My expectation is that users will stop using wallets that can't get the transactions through. i don't know whether that assumption is justified. 

[21:03](https://youtu.be/Cpw__dtZLpA?t=1255) - **Nate**

I am a fan of being cautious and conservative and neutral about usage patterns. We all know the big problem now is large transactions with many shielded outputs paying the small fixed fee. In my opinion addressing that by inhibiting transactions with many outputs might be a useful short term thing but its a bandaid and we want to be cautious about different use cases. If we are proposing a fee proportional to inputs/outputs for all transactions including transparent, thats going to sweep up a lot of use cases like mining pools, exchanges, dev-fund recipient orgs and things of that nature. We do need to be cautious so I urge people not to get overly focused on this ideal of a 'typical everyday user' and they have transactions that look a certain way and thats who we care about. We need to be cautious of all users and also making assumptions about usage patterns. 

[22:34](https://youtu.be/Cpw__dtZLpA?t=1354) - **Daira**

Mining pools might have to increase the fees to pool participants slightly. The pool participants if they're trying to spend those UTXO's would have to pay the fee anyway. It's only proportional to that.

[22:55]https://youtu.be/Cpw__dtZLpA?t=1375 - **Steven**

To Nates point that's kind of why Greg's been modelling the usage pattern. So we have concrete data that shows what we are seeing. Because you can randomly check a block explorer for transactions that are more common but you do see transactions that I would consider not in the category of increased load transaction that are a couple of hundred inputs & several hundred outputs. There are use cases where that is common. 

[23:32](https://youtu.be/Cpw__dtZLpA?t=1412) - **Adi**

I would say I agree with Daira. It's not a huge change, typically the shielded miners have transactions with 50-100 inputs or outputs. It's still overall low fees compared to other chains that are out there. To Daira's other point that some wallets may not work so does someone know how this will function? If someone does set a low fee and broadcasts the transaction, should we allow the transaction to be broadcast or should we plan on filtering it at the lightwalletd level or the node level?

[24:18](https://youtu.be/Cpw__dtZLpA?t=1452) - **Daira**

Eventually I would expect that we would impose relay restrictions. 

[24:25](https://youtu.be/Cpw__dtZLpA?t=1461) - **Steven**

That goes to Nate's point, he was nodding his head. A roadmap phased rollout of any potential fee change we might make. 

[24:34](https://youtu.be/Cpw__dtZLpA?t=1472) - **Str4d**

This was also brought up by the ZIP editors when we were reviewing ZIP 317. There were several comments that are not yet addressed to that effect about moving and filling in the deployment section of the ZIP to cover what this is going to be. 

[24:54](https://youtu.be/Cpw__dtZLpA?t=1494) - **Nate**

Also while we are focusing on this topic for a roadmap I want us to think more broadly about usability. I think if we implement a relay rule and then a user has a wallet that tries to transmit a transaction where the fees are too low, the usability is really terrible. I am not even sure if the protocol can make it clear to the wallet that the transaction doesn't follow a policy. So it might quietly just drop the transaction. Thats not good. Even if it did, wallets would need to respond to that in their UX. I am hoping we can push on that front. 

[26:00](https://youtu.be/Cpw__dtZLpA?t=1560) - **Dodger**

We still check a default transaction expiry height, don't we?

[26:12](https://youtu.be/Cpw__dtZLpA?t=1571) - **Str4d**

We do. 40 Blocks in the transaction builders that we maintain the default is 40 blocks. We don't have any control over what other transaction builders choose to do. I know that there are several transaction builders out there derived from Bitcoin that added support for generating Zcash format where they hardcode a zero into that field. I've even seen one where on parsing it expects that field to be zero & fails to parse transactions that do set an expiry height. I believe i left them a comment. 

[26:58](https://youtu.be/Cpw__dtZLpA?t=1618) - **Kris**

Gregs analysis, thats one of the things that we do have that we are gathering statistics on, what expiry heights are being set. 

___

### 2. Zcashd Updates iii) Mobile SDK's


[27:42](https://youtu.be/Cpw__dtZLpA?t=1662) - **Steven**

Arborist calls are primarily protocol related but given the load that we are seeing I just wanted everyone to know our number one engineering priority is a faster sync for the mobile wallet SDK's. We are working on that and making great progress. The primary beneficiaries of that update will be Edge, Unstoppable & Nighthawk. We are looking forward to getting that out. Our plan is to roll an improved sync out in a couple of phases. The first one would be some incremental improvements hopefully enough to make an impactful difference in how fast wallets sync. 

[29:00](https://youtu.be/Cpw__dtZLpA?t=1739) - **Adi**

A lot people in the community have the question of the timeline on the rollout of the mobile SDK's. Is there an idea of when and how much progress is done?

[29:16](https://youtu.be/Cpw__dtZLpA?t=1752) - **Steven**

I'd answer with the caveat that it is subject to our internal testing, it's hard to put a definitive date on it. We are getting very close and will probably have the IOS SDK updated first followed shortly thereafter with Android. But we are hopeful we could have the first IOS update packaged next week. That's the target we're shooting for. It may take longer. 

[29:56](https://youtu.be/Cpw__dtZLpA?t=1796) - **Str4d**

The roadmap here is, the next update that comes out for IOS & Android SDK's will be the one that includes unified addresses and the migration to UA's because that was necessary to get the codebases into the state where the sync improvements could be applied. They will include the unified address migration and also internal parallelisation of trial decryption. Thats the first piece. The next piece will be the changes to how the commitment trees & witnesses are updated. That's the next nearest piece to completion. 

[30:48](https://youtu.be/Cpw__dtZLpA?t=1848)

Then full DAGSync beyond that will be a more sizeable change to the interface that SDK users use potentially. We are still figuring out how the API surface will change. That will come after that point. 


___

### 2. Zcashd Updates iv) Roadmap & Orchard Roll-out


[31:28](https://youtu.be/Cpw__dtZLpA) - **Adi**

Quick question on that. The update that's coming next week or soonish, will that have parallel trial decryption doing both Orchard & Sapling? 

[31:34](https://youtu.be/Cpw__dtZLpA?t=1894) - **Str4d**

Yes, I think we implemented it for both of them. I can't quite remember. There is definitely parallelised trial decryption for Sapling but cant remember if we also plugged it in for Orchard.  

[31:49](https://youtu.be/Cpw__dtZLpA?t=1908) - **Daira**

We did for Zcashd so it shouldn't be too much of a lift to get it working. 

[31:56](https://youtu.be/Cpw__dtZLpA?t=1913) - **Str4d**

The code is there and I know that it was integrated for Sapling i just cant remember off the top of my head if we had integrated Orchard yet. The SDK at the moment doesn't have Orchard yet so it's immaterial from that perspective but the parallelisation code is there and it does batching based on the existing API used for 'scan however many blocks', it'll do the batching & parallelism across the increment you use. 

[32:29](https://youtu.be/Cpw__dtZLpA?t=1949) - **Daira**

Can you clarify how much of Orchard will be implemented in the next update?

[32:38](https://youtu.be/Cpw__dtZLpA?t=1957) - **Str4d**

In the migration to UA's the spending key backends will have orchard keys in them but the SDK itself will have support for seeing UA's but will not select orchard for spends, it will select Sapling for spends. Then an update after that will add support for trial decryption Orchard outputs to be able to detect inputs being sent to those pieces. 

[33:26](https://youtu.be/Cpw__dtZLpA?t=2002) - **Daira**

So to clarify we are not exposing UA's that include Orchard components before we are able to receive Orchard funds. 

[33:42](https://youtu.be/Cpw__dtZLpA?t=2019) - **Str4d**

I will have to go back and check. The spending keys absolutely will have Orchard components in them because we don't want to have to do two migrations in short succession. 

[34:00](https://youtu.be/Cpw__dtZLpA?t=2036) - **Daira**

The UA's should not have Orchard components before we can use them.

[34:05](https://youtu.be/Cpw__dtZLpA?t=2045) - **Str4d**

I can't remember if thats currently the case, I will go back and check. In any case, even if seeing an Orchard containing UA the SDK wallets will ignore the Orchard component of it when sending to a UA in the next update and will continue sending to the Sapling component of the UA's. I believe Zecwallet or Zecwallet Lite currently generates Orchard-only UA's so those would not work with the SDK in the next update. Those UA's would not have Sapling components. Ideally we would have Orchard pieces in there as well but given that we are having to prioritise the performance stuff, thats the tradeoff here. Orchard once we've got the pieces there will be significantly easier to bring in.

[35:22](https://youtu.be/Cpw__dtZLpA?t=2122) - **Daira**

What crate should I file an issue [#630](https://github.com/zcash/librustzcash/issues/630) on to make sure that we are not outputting UA's with Orchard components yet. 

[35:37](https://youtu.be/Cpw__dtZLpA?t=2137) - **Str4d**

It's probably both of the SDK libraries. Just make an issue on librustzcash I can move it from there. 



___

### 3. Open Discussion i) - ZSA Updates


[37:25](https://youtu.be/Cpw__dtZLpA?t=2245) - **Daniel**

I would like to share updates with regards to the ZSA project. Two things that came out of discussions at Zcon3 and follow up discussion we had internally. The first is we are going to submit a reshuffle of the proposal to distinguish between two types of milestones that we had. One is the everything that comes from the design to the implementation and the other is everything related to Deployment and longer term testing. I wanted to ensure that was clear to everyone we are going to submit it as an update, I don't know what the formal process is for that maybe I should speak to Adi from the Grants committee. 

[38:37](https://youtu.be/Cpw__dtZLpA?t=2314)

The other thing is we are really advancing with implementation, we are more or less halfway with the circuit. As of now we may be exceeding some of the limits that we hoped to achieve in terms of circuit size. It may be that we need to rethink some of the constraints. At some point when we finish with most of the implementation we should have a talk with Str4d & Daira to figure out any optimisations in terms of space. Also based on the talk that St4d gave at Zcon3 that was really inspiring. 

[39:17](https://youtu.be/Cpw__dtZLpA?t=2357) - **Daira**

So roughly how far above 2 ^11 are you at the moment?

[39:27](https://youtu.be/Cpw__dtZLpA?t=2367) - **Daniel**

I don't actually have the concrete number and I don't think Aurélien is in the call right now. We are not finished with the extra constraints we want to add. Let's get that done in the next weeks and share that. 

[39:47](https://youtu.be/Cpw__dtZLpA?t=2387) - **Daira**

There are other optimisations that we can do in the rest of the circuit if we need to. 

[39:54](https://youtu.be/Cpw__dtZLpA?t=2394) - **Str4d**

We can also look at different tradeoffs from the circuit as a whole, once we know what sort of space constraints we are dealing with for the new components. 

[40:13](https://youtu.be/Cpw__dtZLpA?t=2413) - **Daniel**

The more expensive part is probably, not the fact that we're adding an extra hash but we are adding an extra round of the sensimilla hash. Because to add the type in this malleable way. 

[40:32](https://youtu.be/Cpw__dtZLpA?t=2432) - **Daira**

The other thing is that we are replacing fixed baed multiplications with variable based in some places. I think those were only the value commitments so it's only a 64-bit scalar at the moment but if we wanted to extend that to 128-bit values that might be an issue. But i think that the current way we are doing variable base multiplication is suboptimal anyway. There's more fairly low hanging fruit to be had there. 

[41:22](https://youtu.be/Cpw__dtZLpA?t=2474) - **Str4d**

If you'd seen the comments related to the u128 value?

[41:25](https://youtu.be/Cpw__dtZLpA?t=2485) - **Daniel**

I didn't personally but maybe some of the other team members did. 

[41:36](https://youtu.be/Cpw__dtZLpA?t=2495) - **Str4d**

It was just a comment that was raised somewhere to do with the fact that bridging ethereum in. The way the ETH token is defined, it uses a unit of account that ends up being larger than u64 can hold. So to be able to represent wei in ZSA we would need to represent notes with larger than u64 values. 

[42:12](https://youtu.be/Cpw__dtZLpA?t=2532) - **Daniel**

We discussed it at one point, we will make sure it's on the top of the list. 

[42:23](https://youtu.be/Cpw__dtZLpA?t=2538) - **Str4d**

There's been some notes on it we made during ZIP sync. Which would also be affecting how sensimilla gets extended and so on. ERC20's in general, you're allowed to represent up to u256 because thats the word size in Ethereum and that breaks the way the value balancing works. We are not going to support that I think but someone may want to do a brief survey if there is anything that might be excluded based on u64 vs u128 vs u256 for representing values. 

[43:17](https://youtu.be/Cpw__dtZLpA?t=2597) - **Daira**

We could potentially do u192 as well. That would fit in the range constraints. The other thing I was going to mention was there was an omission in one of the ZIPs. in the circuit section about how dummy's are done. If split is 1 then you need to enforce that V old is non-zero so that you're still enforcing the other merkle path validity. 

[44:03](https://youtu.be/Cpw__dtZLpA?t=2637) - **Daniel**

Because it's not enough to take a previous split dummy note. Like a zero value note that exists in merkle root. 

[44:15](https://youtu.be/Cpw__dtZLpA?t=2655) - **Str4d**

That's precisely the thing. If the definition of a dummy is that its value is 0 and that turns off the commitment tree check. But you cant have the commitment tree check turn off for a split note. There needs to be a constraint that you either have a split note or a dummy note but not both simultaneously. 

[44:37](https://youtu.be/Cpw__dtZLpA?t=2677) - **Daniel**

But its different in the sense that we are splitting the circuit into ZEC note or non-ZEC note. For ZEC note we allow dummy notes but for non-ZEC notes we don't. 

[44:50](https://youtu.be/Cpw__dtZLpA?t=2690) - **Str4d**

That was the alternative that we discussed in ZIP sync. That you could either represent it as just tying dummy vs split together or base it on whether the 'Type' field was a ZEC note/non-ZEC note. In any of the cases it needs to be clear in the ZIP. 

[45:15](https://youtu.be/Cpw__dtZLpA?t=2714) - **Daira**

There was a missing conformance requirement either way. 

[45:24](https://youtu.be/Cpw__dtZLpA?t=2725) - **Nate**

It looks like Cosmos' interchain asset transfer also uses 256-bits. One thing is that Ethereum ERC20 lets assets define their precision so I am curious if you looked at assets across the chain, how much precision do any of them actually need? Thats still not a guarantee that there wont be some high precision asset. 

[46:05](https://youtu.be/Cpw__dtZLpA?t=2765) - **Daira** 

The reason I am not really worried is that if you are defining a bridge then you can always require that the values on the other side have zeroes at the end so that you don't have excess precision. Those can be binary zeroes or decimal zeroes depending on how the token is defined. 

[46:34](https://youtu.be/Cpw__dtZLpA?t=2793) - **Str4d**

There are ways around it but they just need to be planned for. 

___

### 3. Open Discussion ii) - Unified Spending Keys / Unified Viewing Keys


[46:42](https://youtu.be/Cpw__dtZLpA?t=2802) - **Hazel Ohearn**

As far as I can tell, unified spending keys and unified full viewing keys aren't concepts that exist at the protocol level. They're also #[doc(hidden)]. What's the situation with them?

[47:02](https://youtu.be/Cpw__dtZLpA?t=2822) - **Kris**

Unified full viewing keys are a concept that's defined in [ZIP 316](https://zips.z.cash/zip-0316). They have a well specified encoding that is similar to the encoding for unified addresses. Unified spending keys at the protocol level are not necessarily defined but we have a well established derivation for unified spending keys in ZIP 316 and we are currently close to merging a PR that defines a unified spending key encoding for crossing FFI boundaries. We don't intend for unified spending keys to be passed around or used for backup. They are derived from a mnemonic seed, ZIP 316 defines that derivation process.

[48:24](https://youtu.be/Cpw__dtZLpA?t=2904)

The important thing is the components of a spend authority be derived in parallel according to account information and so forth from the mnemonic seed. Because we don't want unified keys that are a mash of different spending authorities. That makes it harder to reason about privacy properties. 

[49:12](https://youtu.be/Cpw__dtZLpA?t=2952) - **Str4d**

The way to think about it conceptually is that unified addresses are intended to be passed around to users, from recipient to sender. Unified full viewing keys are enabled to be passed around to a smaller set of people or entities you are willing to give viewing capability to. Hence they also have an encoding and we use the same encoding mechanism as with unified addresses because the properties we want to enforce and preserve about the UFEK's when passing around to users are similar to those needed for unified addresses. Unified spending keys, you don't want to ever give out because they are your root of spend authority. 

[50:15](https://youtu.be/Cpw__dtZLpA?t=3015)

Giving out individual spending keys is an indication of the wrong approach being taken for how the funds are managed. It is very risky, it is the root of spend authority. You are cloning your sense of self essentially as far as control of funds. We dont want those to be passed around. 

[50:47](https://youtu.be/Cpw__dtZLpA?t=3042) - **Kris**

I'll make an analogy here. If you're familiar with setting up SSH keys, you generally don't want to copy your private SSH keys off of a machine and put them on another machine. Instead you want to go onto the other machine and generate a new set of keys and distribute the public keys for those so that you are never moving that secret information in a way that could be captured. 

[51:14](https://youtu.be/Cpw__dtZLpA?t=3074) - **Str4d**

The affordance relaxed here within the accounts model is the mnemonic seed phrase is the backup for when you need to load back in to recover. But its still an action that shouldn't be taken lightly and should be done carefully. Versus addresses and viewing keys which we want to be far easier for people to interact with. 

[51:47](https://youtu.be/Cpw__dtZLpA?t=3107) - **Dodger**

One thing we should bear in mind when thinking of unified spending keys is that it's entirely possible in the not too distant future that different keys will live in different places. If you think of the work going on to add shielded support for Zcash to Trezor & Ledger, we are likely to have the ability for hardware devices to handle Transparent and Sapling keys but not Orchard.

[52:34](https://youtu.be/Cpw__dtZLpA?t=3154) - **Daira**

Or Orchard but not Sapling depending on exactly when that work is finished. 

[52:44](https://youtu.be/Cpw__dtZLpA?t=3164) - **Dodger**

Thats something to bear in mind for a UX perspective of how we want to be able to manage that sort of thing. 

[52:54](https://youtu.be/Cpw__dtZLpA?t=3174) - **Str4d**

Thats another example of why having a unified spending key encoding that people pass around is a mis-feature and we don't want to have because if you add a new spending pool you would have to update every one of the USK's that have ever come into existence. If a user believes they have backed up their USK they now have access to all of their funds going forward - that is false. Whereas you get that property from a mnemonic seed phrase.

[53:30](https://youtu.be/Cpw__dtZLpA?t=3210) - **Str4d**

If we were able to get some of the recipients within a key tree into a hardware wallet but not all, the mechanism would be that the hardware wallets would have the seed phrase controlling one piece and if you gain access to the seed phrase then the Orchard component could be derived separately and combined into the UFEK that would've been derived. Then its the UFEK that gets passed around and treated as the view capability. Then the moment Orchard support were to land in the Hardware wallet then you move from accessing the spending key for Orchard off the wallet to accessing it only on the wallet. But it comes back to, the only time you ever access an individual spending key is when you need that particular capability to be able to spend funds. 

[54:41](https://youtu.be/Cpw__dtZLpA?t=3280) - **Hazel Ohearn**

One more question about USKs/UEVKs. Are they not yet intended to be part of the public interface? They're #doc(hidden) in librustzcash, I'm not sure if that means they're still unstable. 

[55:08](https://youtu.be/Cpw__dtZLpA?t=3308) - **Kris**

In librustzcash unified full viewing keys as a type were first introduced into the Zcash client backend crate. That is not where they are intended to live long term. These are more general types it should be moved out of that crate. They were introduced just for use in the wallets initially. They are currently doc-hidden because they are expected to move within the hierarchy of librustzcash crates. 

[55:46](https://youtu.be/Cpw__dtZLpA?t=3308) - **Daira**

In general dochidden things are unstable. That's a good inference. 

[56:02](https://youtu.be/Cpw__dtZLpA?t=3362) - **Kris**

We are also introducing an explicit unstable feature flag that will be used to guard the unified spending key encoding because it is intended just for use in wallets. I don't know exactly what our plan will be for removing that from unstable features but it is accessible to users that wish to use it. There may be changes required later. 

[56:41](https://youtu.be/Cpw__dtZLpA?t=3394) - **Str4d**

For example one of the motivations for defining that encoding is if people want to use a react native style system. The way react native ends up encoding with the backend requires everything to be encoded as ASCII strings, which is a somewhat frustrating limitation as someone who is writing rust and likes to represent things as types. This is an internal affordance to enable that kind of use case rather than something that should be considered persist-able and storable. 


___


### Attendees

+  Adi Zcash

+  Str4d

+  Daniel Benarroch

+  Deirdre

+  Dodger

+  Daira

+  Greg Pfeil

+  Kris

+  Marek

+  Nathan Wilcox

+  Sean

+  Andrew Levin

+  Andy Murray 

+  Arya Solhi

+  Charlie OKeefe

+  Gianni Morselli

+  Grace Huang

+  Hazel Ohearn

+  Jason McGee

+  Joseph Van Geffen

+  Margaret Baily

+  Michael Harms

+  Pacu ECC

+  Taylor Hornby

+  Vivek Arte

+  Za Wilgustus

___
___

**Next Meeting Scheduled For: September 22nd 21:30 UTC**

