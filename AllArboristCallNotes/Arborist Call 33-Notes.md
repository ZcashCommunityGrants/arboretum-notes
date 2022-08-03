
# Arborist Call  #33 Notes

Meeting Date/Time: July 28, 2022, 21:30 UTC

Meeting Duration: 50 minutes

**Agenda**: 
+ Zebrad Status Updates
+ Zcashd Status Updates
+ Open Discussion



Video of the meeting: [recording](https://www.youtube.com/watch?v=kzoFcZd4Wo8)

Moderator: Nick Takacs


Notes: Jason Rogers

___

## Decisions & Action Items

i. Review Documentation on DOS mitigation 



ii. Further discussion on fee restructure proposals


___

## Full Notes



### 1. Zebrad Updates 

[04:07](https://youtu.be/kzoFcZd4Wo8?t=247) - **Teor**


Hello I am Teor and i am going to be giving the Zebra update today. Recently we've been working on another beta release. There's been some extra load on the network and it's the first time we have run that many blocks and transactions through zebra. What thats meant is we have needed to rewrite the concurrency along a number of parts of our verification stack from right at the top where we feed blocks into the pipeline, to right at the bottom where we verify proofs and signatures in parralel and where we also update node commitment trees in parralell now. 

[04:55](https://youtu.be/kzoFcZd4Wo8?t=295)


Zebra is using Rayon for that, for those who've used Rust before it's a Rust threads work scheduling library. Those are the big changes, and then the extra data usage has required a few changes to our tests and things like that. 

[05:13](https://youtu.be/kzoFcZd4Wo8?t=313)


As part of that work we discovered places where Zebra was doing some redundant work, for example we were de-serialising entire blocks from our database right to answer block headers requests and to answer block hashes requests. So when the blocks are large, that of course takes a long time to deserialise 500 blocks just to calculate their hashes. Those are the major changes we made. Happy to answer any questions about Zebra. 



[16:19](https://youtu.be/kzoFcZd4Wo8?t=978) - **Adi ZCG**


A while back Conrad from ZF brought up the testing that was done to run lightwalletd along with Zebrad. Was there some more testing around that, is it coming around well?

[16:37](https://youtu.be/kzoFcZd4Wo8?t=997) - **Teor**


We are testing with lightwalletd in CI and we are just fixing a bunch of bugs that have come up due to the extra load on the network mainly timing bugs and things like that. It's coming along well, we think it works but we haven't actually done a lot of manual testing lately. We should definitely be spinning up some wallets and doing testing at some point. 


___

### 2. Zcashd Updates - 5.2.0 Release 


[06:04](https://youtu.be/kzoFcZd4Wo8?t=364) - **Nick**


On the Zcashd side I know there was a couple of folks here who could talk in terms of the technical changes for 5.2.0, which was the release that just went out yesterday. 

[06:24](https://youtu.be/kzoFcZd4Wo8?t=384) - **Str4d**


As a reminder the 5.1.0 release which was just under 3 weeks ago, since the last slot we've been working on performance improvements for Zcashd for dealing with the increased load on the network and to make it more stable as a backend for lightwalletd as it is used for light clients on the network. 

[06:59](https://youtu.be/kzoFcZd4Wo8?t=419)


The specific changes that we made in 5.2.0 towards this effort, we altered the way in which Sapling & Orchard were verified within the consensus rules. Now if a proof or signature has been checked at some point either when a transaction comes in off the mempool or when a proposed block is checked via the getblocktemplate API. If either of those has resulted in proofs being checked, they will be cached and that validity will be used if that transaction is then seen coming in via a block. 

[07:55](https://youtu.be/kzoFcZd4Wo8?t=475)


When it comes in via a block, the cache entry for that is cleared because it is likely we will not see it again. Modular reorgs, there is a small reuse cost of reorgs but the larger benefit of keeping the cache size manageable keeps its all fine. That doesn't help rescan performance but it helps steady state performance and in particular it's a change that should help reduce block propagation times because the cost of validation from a block being created from the proof of work, being submitted to the local node, being propagated through the network and being validated by each hop before it gets repropagated, all adds up the time it takes for a block to get from a miner that finds a proof of work to all the other miners. 

[08:54](https://youtu.be/kzoFcZd4Wo8?t=534)


This should reduce the orphan rates that miners have been seeing as higher in recent weeks. We then also made changes to the scanning side for the Zcashd wallet with multithreaded and batched trial decryption for Sapling & Orchard and some other smaller changes such as we now prune witness data. 

[09:25](https://youtu.be/kzoFcZd4Wo8?t=565)


We had done this in the mobile SDK's for quite some time but in zcashd that wasn't being done and that coupled with the increase in shielded transaction volume meant that the cost of updating these witnesses you no longer needed was now becoming noticeable. So we now prune those once we are certain that they will never be needed again. We also backported a few optimisations from upstream that had single digit percent improvements but everything is useful. 

[10:06](https://youtu.be/kzoFcZd4Wo8?t=606) - **Daira**


Just a detail on how that is not going to be used again. When you spend a note, 100 blocks after that you can discard the witnesses because we never rollback more than 100 blocks, that's how that works. 

[10:32](https://youtu.be/kzoFcZd4Wo8?t=632) - **Deirdre**


Are we explicitly going to describe that caching of proof verification is allowed in the instances you described coming into the mempool and on queries & on propagation in a spec or in a ZIP or something like that. 

[10:54](https://youtu.be/kzoFcZd4Wo8?t=654) - **Daira**


As far as I can see it's a transparent optimisation. The spec never says when you should do validation. You need to have validated stuff before you rely on that block as being in the consensus chain but thats it. 

[11:20](https://youtu.be/kzoFcZd4Wo8?t=680) - **Deirdre**


Should it be a note added to [ZIP 401](https://github.com/zcash/zips/blob/main/zip-0401.rst) which describes mempool operations?

[11:27](https://youtu.be/kzoFcZd4Wo8?t=686) - **Daira**


That might be useful actually. 

[11:31](https://youtu.be/kzoFcZd4Wo8?t=691) - **Str4d**

Maybe. It's something we do as part of mempool verification but we don't only do it there. Also for reference, we have always parallel validated transparent signatures because that was implemented in upstream Bitcoin. We've both done parallel verification and caching. That has always been the case in Zcashd. In consensus rules we've just expanded the usage. 

[12:11](https://youtu.be/kzoFcZd4Wo8?t=731) - **Daira**


Now that I think about it, it might be useful to have a general note basically saying that it matters that validation has been done, not when it was done or what prompted it, and then mention that optimisation. 

[12:33](https://youtu.be/kzoFcZd4Wo8?t=753) - **Str4d**


It's consensus relevant to make sure the caching is implemented in the node correctly so that you are not misreading the cache at the wrong time. 

[12:44](https://youtu.be/kzoFcZd4Wo8?t=763) - **Deirdre**


Yes, that needs a queue on when those items in the cache are invalidated or expired. 

[12:52](https://youtu.be/kzoFcZd4Wo8?t=772) - **Str4d**


The way that Zcashd does it is we've taken the caching system that Bitcoin had implemented for transparent signature caching and we've extended it & reused it for the Orchard and Sapling components. So the cache invalidation happens when a block is connected. Once it's been connected you know that (assuming no rollbacks),  you will never need the cached validities again for that node setup. If you do a reindex then you are re-verifying everything anyway. 

[13:42](https://youtu.be/kzoFcZd4Wo8?t=822) - **Deirdre**


So that's invalidated within the 100 block reorg limit. 

[13:46](https://youtu.be/kzoFcZd4Wo8?t=826) - **Str4d**


It's invalidated immediately, yes. If there is a reorg the way Zcashd is currently doing it there will be extra validation going on, that's a potential future optimisation but again, that's a performance optimisation in the face of regular reorgs. If you're not seeing a regular reorg rate then that shouldn't have much effect. 


___

### 3. Open Discussion - FROST  

[14:45](https://youtu.be/kzoFcZd4Wo8?t=885) - **Conrado**


I'd just like to mention that we are working on a draft ZIP for specifying FROST which is a Threshold signature to be used in Zcash. The draft is ready it was reviewed on last weeks ZIP sync. There was a lot of very useful feedback. I think it's practically done, we just need to clean it up. We are waiting for chelsea to write down secret proof. Other than that, it's done so if you are curious, take a look and we welcome any feedback on that, we are looking forward to officially submitting the ZIP. 

[15:47] - **Deirdre**


(https://github.com/Zcashfoundation/zips/pull/3) We are not blocking the ZIP on the security proof but it is getting written down in parallel and will be linked in to help motivate the security and privacy properties of our variant of FROST when it is done. That is happening but not blocking. 


___


### 3. Open Discussion - Fee Structure Proposals 

[17:23](https://youtu.be/kzoFcZd4Wo8?t=1043) - **Daira**


There have been suggestions on if maybe we want to change the structure of fees to disincentive the kind of extra load on the network we are seeing. The load we are seeing at the moment is very large transactions and they still only pay the default fee, regardless of size. I think Kris suggested making the fee depend on the total number of Inputs & Outputs. So that would be transparent or shielded inputs and outputs. Im just interested in what people's general view is on that. 

[18:27](https://youtu.be/kzoFcZd4Wo8?t=1107) - **Adi ZCG**


I like that idea because it directly charges more to the folks who take up more space in the blockchain. Really the transaction size increases by so much when you increase the number of outputs and restricting the low fee for simple payments, maybe 1 in 2 out or 2 in 2 out, that would still make it cheaper and usable for most of the folks. 

[18:55](https://youtu.be/kzoFcZd4Wo8?t=1135) - **Daira**


Yes, the default fee would be based on the number of inputs and outputs with a floor. The floor would probably be set so that a 2 input 2 output transaction is at the floor. The one reason to make it dependant on the number of inputs & outputs rather than the transaction size is that transparent inputs & outputs contribute less to the transaction size in bytes, we don't want to disincentivize shielded transactions relative to transparent transactions. So making it based on the inputs & outputs doesn't do that. 

[19:59](https://youtu.be/kzoFcZd4Wo8?t=1199) - **Adi ZCG**


Got it, so even the transparent transactions is it?

[20:05](https://youtu.be/kzoFcZd4Wo8?t=1205) - **Daira**


Yes. That's one of the proposals we are considering. The proposal that Kris made. 

[20:15](https://youtu.be/kzoFcZd4Wo8?t=1215) - **Dodger**


I seem to recall when we looked at this before a couple of years ago we had a document with various ideas & proposals. Has that been updated? Is it possible to publish that?

[20:40](https://youtu.be/kzoFcZd4Wo8?t=1240) - **Kris**


I think that one of the motivations for this particular proposal is it is a simple change that could be readily adopted by the ecosystem and i think that at some point we will want something like dynamic fee adjustment according to EIP 1559 but that doesn't preclude us from making a change of this sort in the nearer term to try and deal with the current situation. Just to try to make costs proportional to the costs being imposed on the network relative to, say ordinary 2 in 2 out transactions. 

[21:24](https://youtu.be/kzoFcZd4Wo8?t=1284)


So my proposal that I had put out is essentially we consider the 2 in 2 out transaction, 4 total inputs & outputs and so if we charge 250 zat per input and output with a floor of 1000 zat that would keep us at our current fee rate. That would impose on someone that is using the chain at the rate we are currently seeing, that would take the cost for that usage from tens of dollars to thousands of dollars. Daira has also suggested essentially reverting the previous fee change, where we changed from 10,000 zat to 1000 zat. If we were to do that but keep the same fee schedule then it could make the use of the chain in this fashion economically unviable unless someone really wants to throw a lot of money at it. 

[22:45](https://youtu.be/kzoFcZd4Wo8?t=1365)


There are a few different knobs we can turn. Ultimately i think those hard constants are the thing that ideally would be tuned by an algorithm that responds to how full the blocks are. We might want to do something with an EIP 1559 style fee adjustment where we could use a base fee. Either with base fees being returned to the future admitable monetary base or something like that.

[23:31](https://youtu.be/kzoFcZd4Wo8?t=1411) - **Daira**


I did find the document you were talking about Dodger. It's from March 2017 it's not very long though, there's not much detail in it. 

[23:53](https://youtu.be/kzoFcZd4Wo8?t=1432) - **Dodger**


I am pretty sure this is one that either me or BamBam who started it. 

[24:02](https://youtu.be/kzoFcZd4Wo8?t=1442) - **Str4d**


I remember having a discussion on these around 2017 sometime, so maybe it was from that one. 

[24:28](https://youtu.be/kzoFcZd4Wo8?t=1468) - **Daira**


There's a longer document about DOS attack mitigations. That was from May 2019. I don't know whether I can share a link to this. Looks to be all policy stuff but i would need to review it. 

[25:12](https://youtu.be/kzoFcZd4Wo8?t=1512) - **Dodger**


We obviously spent a lot of time and put a lot of brainpower into thinking about exactly the problem back then. 

[25:20](https://youtu.be/kzoFcZd4Wo8?t=1520) - **Daira**


Completely understand and this document does have a lot of stuff that is potentially relevant now. Thank you for reminding me of that. We have actually implemented part of it. Part of it is [ZIP 401](https://github.com/zcash/zips/blob/main/zip-0401.rst). Which is implemented in both Zcashd and Zebra. 

[25:47](https://youtu.be/kzoFcZd4Wo8?t=1547) - **Dodger**


I think the big question is how would we enforce this? Whats the plan for enforcing this? Will we enforce this in consensus rules?

[26:00](https://youtu.be/kzoFcZd4Wo8?t=1560) - **Kris**


Not initially. Initially we would want wallets to update to follow this fee proposal and then at that point we could update the default that miners use for selection from the mempool to use that fee and then sometime later we could increase the default fees for transaction relay between nodes. But it doesn't matter that much if we keep the relay fees low and give miners the option to choose what transactions they want to include. 

[26:53](https://youtu.be/kzoFcZd4Wo8?t=1613)


I presume that if we adopted Daira's proposal for fees, that miners might actually start becoming incentivised to pick & choose among which transactions they want to include. 

[27:08](https://youtu.be/kzoFcZd4Wo8?t=1628) - **Dodger**


I seem to recall that one of the things in that document will be something about dropping transactions from the mempool. 

[27:16](https://youtu.be/kzoFcZd4Wo8) - **Str4d**


That's [ZIP 401](https://github.com/zcash/zips/blob/main/zip-0401.rst). It's already implemented. I just wanted to point out that we cant make any changes in the full nodes like Zcashd until wallets have had time to make changes. It's not just that we would prefer that order but if we were to deploy a change with the intention of improving the UX of users like trying to have miners select transactions according to a different fee mechanism without wallets having updated first, that would have the effect of causing the default fee size transactions that wallets are currently selecting to be down-selected in a way we don't want to happen. 

[28:30](https://youtu.be/kzoFcZd4Wo8?t=1710)


There is a specific order that something like this would need to be deployed in if we chose to do it. 

[28:35](https://youtu.be/kzoFcZd4Wo8?t=1715) - **Daira**


In general if you are increasing fees then you need to change wallets first, if you are decreasing fees then you do it the other way around. 



___


### 3. Open Discussion - Fee Structure Proposals (ii)


[28:50](https://youtu.be/kzoFcZd4Wo8?t=1729) - **Adi ZCG**


Just wanted to respond to Kris's point why I am not a fan of the EIP 1559 style of fees. It really makes it unpredictable what the fees will be and it also hampers the privacy aspect. One of the reasons we have same fees for the same sheet of transactions is to make all transactions look alike. There's also the element of remnant dust. If the fees cannot be known how much will remain in an address you cannot send all the ZEC out of an address. Thats one of the problems. 

[29:23](https://youtu.be/kzoFcZd4Wo8?t=1763) - **Daira**


That is an issue, if you make the default fee dependant on the number of inputs and outputs then you are essentially saying that you can't spend a note that is worth less than that per-input fee unless you spend it opportunistically when you would have otherwise have spent a dummy.

[29:50](https://youtu.be/kzoFcZd4Wo8?t=1790) - **Adi ZCG**


Right, you can still add more ZEC to that logic and still clean up the wallet but with EIP 1559, you can never really get to zero because it'll be all dynamic. It will hamper privacy. 

[30:05](https://youtu.be/kzoFcZd4Wo8?t=1805) - **Kris**


With respect to the privacy concerns, EIP 1559 is built on an assumption that the miners tips will be taken into account and that those are discretionary. It would be entirely possible to make the adjustments non-discretionary and simply based upon how much of the block capacity is being consumed. 

[30:36](https://youtu.be/kzoFcZd4Wo8?t=1836) - **Adi ZCG**


Which will never be known for sure, it all has to be predicted and depends on what happens in the future. 

[30:44](https://youtu.be/kzoFcZd4Wo8?t=1844) - **Daira**


There's a lot of things to be discussed if we were going to do a EIP 1559-like mechanism and we probably wouldn't want to adopt everything that's in that EIP which is partly why we're suggesting this simpler and more limited change. 

[31:07](https://youtu.be/kzoFcZd4Wo8?t=1867) - **Adi ZCG**


I do support that, and to the other point of reverting the fees from 1000 back to 10,000. I don't think that's going to hamper whoever is making the 1100 output transactions. It's just a 10x increase in cost, it's not too much.

[31:24](https://youtu.be/kzoFcZd4Wo8?t=1884) - **Daira**


If you look at the effect on the attack cost, assuming this is an attack, the effects on the attack cost of doing both the per-input & output fee and the 10x increase, the cost is significantly greater. 

[31:50](https://youtu.be/kzoFcZd4Wo8?t=1910) - **Kris**


It's effectively a 1000 fold increase for the base proposal and a 10,000 fold increase for the combined proposal. You would effectively go from a $20 attack to a $200,000 attack. 

[32:08](https://youtu.be/kzoFcZd4Wo8?t=1928) - **Adi ZCG**


Is that really necessary, to go from 10 to 100,000 or can it just be from 10 to 20,000 dollars? My point being, why change the current default of 1000 zats when people are used to it. For 2 in 2 out, starting with that base rate why do i have to do both the things. 

[32:36](https://youtu.be/kzoFcZd4Wo8?t=1956) - **Daira**


First of all the 10x is just one potential option. It could be 4x, 6x, whatever. Another thing to consider here is that the fiat prices decrease significantly. If you look at the equivalent fiat fee then you wouldn't actually be paying very much. You would be paying a few US cents with this proposal. 

[33:09](https://youtu.be/kzoFcZd4Wo8?t=1989) - **Adi ZCG**


I was mentioning there is a simpler way of keeping it the same for 2 in 2 out while exponentially increasing it only for those who need a very high number of outputs. 

[33:19](https://youtu.be/kzoFcZd4Wo8?t=1999) - **Kris**


I think we want it to be linear not exponential but linear would be good enough compared to what we are doing today. 

[33:29](https://youtu.be/kzoFcZd4Wo8?t=2009) - **Daira**


Yes, if you make it super linear then that incentives the transactions to just use small transactions, it doesn't actually help very much. 

[33:44](https://youtu.be/kzoFcZd4Wo8?t=2024) - **Pacu ECC**


I just wanted to comment on some practical deployment things about the fee change. Unlike where the Zcashd node falls under a similar dynamic, we cannot assume the mobile users will actually update their applications. And in our case Zcash mostly uses non-custodial wallets which are really not logging or using much of the typical upgrade mechanisms that other client upgrade mechanisms that other client facing applications have in the mobile space. 

[34:51](https://youtu.be/kzoFcZd4Wo8?t=2091)


So for us it would be really hard. Even though we co-ordinate an ecosystem wide upgrade of all the SDK's and for the case of wallets, using the CLI light version, we wont be sure that users will be able to use their wallets when they open it up. Because they don't force users to upgrade to keep working, so they might face a situation where they open their application, try to do a transaction and the fee that will be used by that application, by that software, will be less than the one we are now enforcing. 

[35:45](https://youtu.be/kzoFcZd4Wo8?t=2145) - **Daira**


Thats true, at the moment users are having trouble using wallets that haven't been updated anyway because of the performance issues. They will need to update. 

[36:03](https://youtu.be/kzoFcZd4Wo8?t=2163) - **Pacu ECC**


Probably if we can think of a solution that can increase the cost of the attack without affecting the regular average transaction the mobile wallets do, it's really particular. 

[36:22](https://youtu.be/kzoFcZd4Wo8?t=2182) - **Kris**


Pacu, I want to point out that we do have that problem already with v5 transactions. If a wallet hasn't been updated to be able to parse v5 transactions, the wallet is not going to be working correctly anyway. 

[36:38](https://youtu.be/kzoFcZd4Wo8?t=2198) - **Pacu ECC**


I am pointing these out to factor them in and then we can decide what is best. The situation is really complicated I just wanted to add this factor. I don't know what the solution is. 

[36:55](https://youtu.be/kzoFcZd4Wo8?t=2215) - **Daira**


That issue is going to raise itself again in future so we do need to think about it in the long term. 

[37:05](https://youtu.be/kzoFcZd4Wo8?t=2225) - **Kris**


I think that ideally one thing that we could do is hopefully make fee computation a bit more modular and that way if in the future we adopt a fee adjustment algorithm, hopefully we could make it a lower impact change. 

[37:32](https://youtu.be/kzoFcZd4Wo8?t=2252) - **Pacu ECC**


Yeah, that's a good opportunity. Since we are going to roll updates that mitigated some of the problems we are having right now, we expect high adoption of those update. It will be interesting to see if we can make the fees some parameter that is easier to change by the wallets or the clients of the SDK's in the near future. 



___


### 3. Open Discussion - UX impact of fee restructure 

[38:10](https://youtu.be/kzoFcZd4Wo8?t=2290) - **Nate**


Now I have two items, but one is for this issue Pacu just brought up, it feels to me like it might be helpful if we had a general purpose protocol versioning system for wallets. So that once they have this feature they pay attention to the blockchain and somewhere in there is a signal about the wallet protocol version or wallet behaviour version so they can notify their users if they are out of date. Don't know how feasible that is. 

[39:05](https://youtu.be/kzoFcZd4Wo8?t=2345)


We might have similar issues for something besides fees. We already have it for the transaction format so if we can make a general purpose thing that might be helpful. The other thought i had was the proposal to change fees might make sense in the short term. Also i wanted to recognise how nice it is to have the convention that every shielded transaction has a flat fee in terms of UX. It's easy for users to understand, users do not necessarily anticipate how many inputs/outputs transactions might use when they make a request. That ideal seems like it can't survive the situation where blocks become full for any reason, whether it's for normal adoption or pathological usage. 

[40:14](https://youtu.be/kzoFcZd4Wo8?t=2414)


Longer term i think we might need to start grappling with those UX issues sooner or later for wallet users and helping them transition away from the nice ideal we've had of just the flat fee. 

[40:31](https://youtu.be/kzoFcZd4Wo8?t=2431) - **Daira**


We could reduce the axon transaction size. Before sapling an axon transaction size was 100 kB instead of 2 MB. That obviously precludes some use cases so we would need to think very carefully before doing that. 

[40:50](https://youtu.be/kzoFcZd4Wo8?t=2450) - **Nate**


The concern I have is anything we change with the protocol like if we are changing the fee structure or the maximum transaction sizes or whatever, users are just using wallets and requesting wallets to do stuff for them and they don't have clear visibility into why a transaction wont work or what will the fee be and each time we adjust that it's going to be confusing. I just want to make sure that we are paying attention to UX as we are thinking about these proposals. 

[41:38](https://youtu.be/kzoFcZd4Wo8?t=2498)


Not just the UX impact of each proposal but is there any way we can help users along that path. For example anchoring on the fixed fee has been nice but it's sort of UX technical debt. We've gotten people to anchor on that but it can't last forever.

[42:11](https://youtu.be/kzoFcZd4Wo8?t=2531) - **Pacu ECC**


I guess we have mitigation things to do and in the middle-long run we can do more elaborating things. Something I see if we factor in the numbers of input/outputs, I could troll your wallet. I could send you a lot of small transactions to make your wallet really expensive to use I know that your wallet is not good at picking up notes of a certain shape so I could make every transaction really expensive for you. For now I guess we need to sort out this situation and then improve it. 

[43:05](https://youtu.be/kzoFcZd4Wo8?t=2585) - **Daira**


The other lever we potentially have is for miners to just produce smaller blocks until we implement other mitigations. There is actually an existing option in Zcashd. I think it's called [blockmaxsize] in bytes. If you set that for example to 1000000, that would halve the size of blocks. I do recommend that you set [blockprioritysize] proportionately. If you halve block max size then also halve block priority size. That option only matters for miners.

[44:31](https://youtu.be/kzoFcZd4Wo8?t=2671) - **Adi ZCG**


I just want to second what Nate & Pacu said. We have to think in terms of UX. People have gotten used to the low fees of Zcash and they have an expectation to use it for transactions and exchange and sending money. There should be a middle ground solution for now, because the blocks are still not full. Then there should be a long term solution which i think definitely is important because once ZSA's come around in the next year or two, definitely the blocks will be full. 

[45:04](https://youtu.be/kzoFcZd4Wo8?t=2704) - **Daira**


The blocks are full at the moment during this period of high load. 

[45:12](https://youtu.be/kzoFcZd4Wo8?t=2712) - **Str4d**


They're not full all the time but we have seen prolonged periods of full blocks. 

[45:22](https://youtu.be/kzoFcZd4Wo8?t=2722) - **Nate**


Yeah, so full blocks is especially an important case to consider for usability and I am actually fairly concerned that we don't have a good UX story if the mempool is growing, my understanding of how shielded wallets behave now is they have a fixed fee. That's easy to understand. But what will occur is maybe a random subset of transactions will be selected from the mempool so a user experiences submitting a transaction and it wont confirm and they don't have a good way to predict when it will confirm. If it has an expiry height that's probably better. Then at least in that state the wallet will eventually be able to say 'sorry - that did not succeed'. 

[46:31](https://youtu.be/kzoFcZd4Wo8?t=2791)


Which is bad but in my opinion it is not as bad as 'sorry - your funds are locked up and we can't tell you when the transfer will occur and it still might not occur'. Which is what occurs in Bitcoin. But even in Bitcoin land if blocks are full, people are already used to the user experience that their wallet tries to guess a good fee and they click yes or no and sometimes that still doesn't work out well. Because wallets can adjust fees, the users experience to decide 'do I want to pay high fees now? or give up on this and wait for fees to go lower?'. 

[47:24](https://youtu.be/kzoFcZd4Wo8?t=2844)


So I am really concerned if the mempool starts growing and I don't think there is much in the way of preventing that happening. This is actually a UX need that is shorter term. We don't see that happening now but we could easily see that happening and when it does the UX is going to be bad. It's separate from this issue of many shielded outputs but it is a different impact I want to proactively anticipate. 

[48:02](https://youtu.be/kzoFcZd4Wo8?t=2882) - **Daira**


Blockchains have fixed capacity. There is stuff you can do to aggregate transactions in the longer term using recursive proofs or proof aggregation. 

[48:19](https://youtu.be/kzoFcZd4Wo8?t=2899) - **Nate**


There is a very concrete important difference right now between Zcash shielded wallets and Bitcoin-style wallets. Which is Bitcoin-style wallets allow you to adjust fees. So if fees are high they can decide to pay $10 or whatever. With shielded wallets, they cannot decide that. All they can do is say 'send' and it will not succeed. So that is a concern for me. 

[48:59](https://youtu.be/kzoFcZd4Wo8?t=2939) - **Str4d**


Relevant thing to that point is that transparent-style wallets have the multi-coin wallets that have zk support also rarely, if ever set transaction expiry. Because there was no such thing in Bitcoin. I have seen implementations that just hardcode that field to zero in their parser. 

[49:35](https://youtu.be/kzoFcZd4Wo8?t=2975) - **Dodger**


What about adding functionality to lightwalletd to advise the wallet what the fees should be?

[49:52](https://youtu.be/kzoFcZd4Wo8?t=2992) - **Kris**


If we implement a fee adjustment algorithm at some point then that seems totally reasonable. 

[50:01](https://youtu.be/kzoFcZd4Wo8?t=3001) - **Str4d**


If it was an adjustment algorithm based on the public chain data then it would not just be feasible, it would be necessary because lightwalletd is the source of chain data for light clients. 

[50:14](https://youtu.be/kzoFcZd4Wo8?t=3014) - **Kris**


The light client could run the same algorithm based upon the same data they have from the chain. 

[50:18](https://youtu.be/kzoFcZd4Wo8?t=3018) - **Str4d**


No, because they don't see everything. It skips out transparent data which would also have to be included in the calculations. 

[50:31](https://youtu.be/kzoFcZd4Wo8?t=3031) - **Daira**


It depends what the calculation depends on. 

[50:36](https://youtu.be/kzoFcZd4Wo8?t=3036) - **Dodger**


You could have the node do it and then pass it to lightwalletd for passing on. 

[50:42](https://youtu.be/kzoFcZd4Wo8?t=3042) - **Str4d**


Whatever information was necessary from chain data for a node to be able to make those fee decisions would necessarily be passed through a lightwalletd. Passing additional data is maybe something that could be done if there is useful additional data. We can parse whatever we want under the current lightwalletd trust model. Which is we trust the lighwalletd to give accurate chain view. 

[51:31](https://youtu.be/kzoFcZd4Wo8?t=3073) - **Daira**


So an advantage of the lighwalletd passing on the suggested fee directly rather than the information needed to calculate the fee, is if you want to change the fee calculation then you only have to change lightwalletd or if it's getting it's information from Zcashd you'll only have to change Zcashd which you have to do anyway. 

[51:54](https://youtu.be/kzoFcZd4Wo8?t=3114) - **Nate**


So I am a fan of longer-term something like EIP 1559 but better and for Zcash that has better privacy and works well the lightwallet protocols so I want to talk about that more, especially with Adi since he had those concerns but I don't want to do that right now. I am just letting people know. 

[52:25](https://youtu.be/kzoFcZd4Wo8?t=3145) - **Daira**


I suggested maybe we should have a meeting with developers to discuss these things in more detail. 

[52:39](https://youtu.be/kzoFcZd4Wo8?t=3159) - **Str4d**


Also you can go to the Zcash RND discord, the channels I would suggest would either be ZIPs channel or the 1559 channel which would be the place to talk about this.

[53:12](https://youtu.be/kzoFcZd4Wo8?t=3192) - **Nick**


I think there's another call coming up in 2 weeks and a small conference in Las Vegas. Glad to meet you all, hope to see you in person. 




___


### Attendees

+  Adi ZCG 

+  Conrado Gouvea

+  Daira

+  Deirdre

+  Dodger

+  Kris

+  Marshall

+  Pacu ECC

+  Str4d

+  Nate Wilcox

+  Ying Tong

+  Andrew Johnson

+  Charlie OKeefe

+  Gustavo Valverde

+  Jason McGee

+  Marek

+  Muhammed Ali

+  RJ Ricasata

+  Sasha S

+  Taylor Hornby

___
___

**Next Meeting Scheduled For: August 11, 2022 15:00 UTC**




