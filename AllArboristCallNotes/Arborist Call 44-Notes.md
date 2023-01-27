# Arborist Call #44 Notes

Meeting Date/Time: January 26th 2023, 22:30 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro 


+ Zebra Status 


+ ECC Core Update


+ Wolfram Blockchain Integration API


+ Research & Implementation Update
    

+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://gateway.pinata.cloud/ipfs/QmQBkxV9ThCaBH4MPPFugzsXquheCRayS5UMqyRLxfobeQ) [2](https://gateway.pinata.cloud/ipfs/Qmc2UFPHm8hUUmociusfmNfPxwKyJkZPfVw1B14dwUp6wy) 

Moderator: Ian Sagstetter

Notes: Jason Rogers

___

## Decisions & Action Items


i) Sync call with ZSA authors around zip documentation 


___

## Full Notes



### 1. Zebrad Updates - Zebra / FROST update


[03:13] - **Teor**

I am Teor, I use they/them pronouns. I am the current Zebra team lead at the Foundation. Zebra recently we've been focusing on support for mining pools. In the last few weeks we've implemented different mining rpc's like getpeerinfo, getblocksubsidy & the getblocktemplate proposal mode. 

[03:39]

We've been doing a lot of rpc testing and fixing different bugs. eg. fixing the order of transactions in the merkle root, making sure we don't choose the same transaction twice in the block template and fixing the times in the block template. We've made a bunch of changes to make Zebra's upward format as similar as possible to zcashd. Even though it doesn't matter in JSON its easier for us to do testing if all the fields and transactions are in the same order. 

[04:13]

One of the other changes we made in our production code was adding a transaction lock time check to the mempool. This was something we missed when we originally did the mempool. It's not specified anywhere. We had to go to the Zcashd source code to find that, credit to [DeckerSU](https://github.com/DeckerSU) for reporting that to us. 

[04:39]

We've made some internal changes but they're kind of boring and only really for Zebra developers to notice. Probably the biggest internal changes were moving some duplicated redpallas code so we don't have two copies of that code in the redpallas crate and in Zebra itself. This about it from me. 

[05:00] - **Str4d**

The duplicated redpallas logic. You're deduplicating with the redpallas crate specifically?

[05:16] - **Teor**

Yes, zebra had a copy of redpallas as a module and the code was almost identical.

[05:30] - **Str4d**

Excellent, because we also have the reddsa crate which we need to reconcile. I wasn't sure if it was that one you were referring to. 

[05:37] - **Teor**

No, it's just redpallas for the moment. I think reddsa is not a question for me, probably for Deirdre or Conrado. 

[05:52] - **Str4d**

I think the original plan for the split was that we would bring them back together but we'll see how things go. Particularly now that FROST has made more progress on implementation we can figure out what we want to do there offline. I think that means we have 4 implementations of redjubjub/palace?

[06:11] - **Teor**

We're almost about to remove one, so one down. Definitely agree that we should have one copy and get it audited. Then we know its correct. 

[06:34] - **Conrado**

Just to say we are now using with deduplicated code, we're now using the reddsa crate so i think there isn't a redpallas crate. There is now one less copy of the code. 

[06:50] - **Str4d**

At some point we can discuss how we make progress forward on that. It would be good to centralise around that crate as the thing to use. 

[07:11] - **Daira**

Can you file an issue on Zcash zips about the documentation of lock-time?

[07:21] - **Teor**

Sure, I'll link to our ticket as that's probably our best explanation but i'll file that issue. 

[07:27] - **Deirdre**

One other motivator besides deduplicating is I think the redpallas implementation had a early implementation of FROST because it was forked off the implementation of redjubjub, that was one of our first implementations and the old implementation of FROST on redjubjub is basically deprecated and its getting cleaned up by Conrado. So the redpallas implementation that we deduped we've got rid of. The redpallas crate will include the updated with the spec implementation of FROST, another reason to remove old duplicated versions of code.

[08:39] - **Daira**

There was a question on one of the Telegram groups, either zk-study club or zk podcast about where to find the FROST implementation. I was having to direct them away from some of the duplicates. 

[09:02] - **Deirdre**

Yes, we have the primary https://github.com/ZcashFoundation/FROST Repo. We have a lot of stuff going in there including the rerandomised variant of FROST that is intended for applications like Zcash signing. But that can be consumed by reddsa & several places. Zcashfoundation/frost is where most of our frost development is happening up to date with the specification. 

[47:22] - **Deirdre**

We can give a quick update on FROST. We've cut a new version, version 12 of the specification. We are now doing what we think is the final boss stance of asking an increasing number of chairs within the IRTF to make sure this doesn't conflict with other things and approve it and if we do the invocation in the correct order and don't jinx ourselves we may have a real document in possibly a few weeks. 

[48:18]

We got feedback from Ian Goldberg, the co-author from the orignal FROST. It was minimal and so that was incorporated into version 12. Wish us luck. 


___


### 2. ECC Core Updates - 5.4.0 release / Zcash Posterity Fund / DAGSync



[10:13] - **Str4d**

The last two weeks on the Zcashd side has been focusing on getting a 5.4.0 release out. This rc series has been more exciting than previous ones. It's good and makes me feel confident in the rest of the stuff when we actually find bugs. 

[10:37]

We've found and squashed some bugs in the stuff we are deploying. We have just identified some rather serious performance regressions that we introduced while implementing performance improvements a few releases ago for the chain sync stuff. We are just testing those out and it will be -rc.3 that we're about to cut in the next day or so. Aiming to get the 5.4.0 release early next week. 

[11:15]

The other thing this is 0xArbitrage originally started a PR a few years ago to work on tallying up the transparent pool. In Zcashd we already have monitoring the sizes of the shielded pools, we added sprout & sapling before sapling launched, we added orchard before orchard launched. So we are adding transparent and also a tracker for the chain supply defined as the outputs created by coinbase transactions minus unclaimed fees. 

[12:00]

The logic for that being, if you look at the way a transaction works fees are defined as an inbalance between funds consumed and funds produced from the transaction. If a transaction doesn't produce outputs corresponding to all of the inputs they consumed, the delta leftover disappears from the supply, Unless the miner claims that in a coinbase transaction. What we are doing now is tallying those as we go, fortunately those are precisely equal to the sum of all vaule sitting in utxo's or notes in the various value pools. This is exactly the check we wanted to ensure we had. 

[12:50]

Correct me if i'm wrong Kris, there's a delta between the theoretical maximum supply and the current maximum supply of about three hundred and fifty ZEC?

[12:57] - **Kris**

Yes, there are about 30,000 instances of miners failing to claim fees but they are small amounts and so it amounts to roughly 350 ZEC. 

[13:19] - **Str4d**

Yes, thats the ballpark. I remember a few years ago I did a tally and remember 150 being the number, informally. It's what we expect. We spot checked some of the earlier ones and we spot checked the later ones and they all follow that same pattern. There was an instance in slow start where the miner was miscalculating the miner portion of slow-start & claiming the miner reward at a lower amount. 

[13:53]

There was another fun instance where a coinbase transaction was paid out to three different coinbases and because dividing a number into three leaves a rounding error there was 1 zatoshi left unclaimed. 

[14:07] - **Kris**

Adi just asked "can the ZEC be reclaimed/recirculated in some fashion"?

[14:13]

I think at [Zcon3 Nathan from ECC introduced the idea of the Zcash posterity fund](https://www.youtube.com/watch?v=bRuly9lyRO8&t=3405s). The way the posterity fund would work is essentially exactly the same way that this unclaimed balance works. If in the future the Zcash community decides to implement something like the Posterity Fund as a perpetual source of block rewards, it seems likely those unclaimed fees would be the first seed in that fund. 

[15:05] - **Str4d**

From Nathans talk it was the delta from the circulating supply and the theoretical supply is what was defined as the posterity fund and that happens to also coincide with the unclaimed amounts. 

[15:28] - **Daira**

If anyone wants to check, its 368.5844552 ZEC. 

[15:34] - **Kris**

We also include a python script in there that can be used to check that. You can see that in the release branch & one of the inputs to that is a file that contains the block height and the unclaimed amount for every one of those 30,000 unclaimed fee amounts associated with the miner address that failed to claim them. 

[16:04] - **Teor**

I was interested in the details of how you're tracking those unclaimed amounts. I know in Zebra we keep a total of all of the shielded & transparent pools but we don't sum those up to the "theoretical outlay" or compare them at all. I was wondering about the implementation details there.

[16:36]

I also wanted to mention that sometimes if a miner has already done a bunch of "work" on a particular template, I wonder if its more economic for them to continue to do that & try and fiddle transactions around or is there no way it might pay off?

[17:02] - **Daira**

My assumption is that's the explanation for some of these.

[17:11] - **Str4d**

It's a little more in depth than that. The moment you add transactions to a block you have to alter the header. An update has to occur. My guess as to whats happening is they are only updating the header and then not updating the coinbase transaction. 

[17:29]

Pre-NU5 all that required doing was updating the root of the merkle tree of transactions. Post NU5 we have several other block commitments that also would need to be updated if you did this. As far as implementation - we aren't tracking the deltas in Zcashd. That is a separate script that compares what Zcashd is tracking to the maximum theoretical supply at each height. What we are adding are 2 tracks: The first is in every block the sum of all transparent outputs created minus the sum of all transparent coins consumed, effectively the equivalent of negative value balance - which is what we currently track for the shielded pools. 

[18:22]

The value of the shielded pool is defined as spends - outputs. So the delta on a pools balance is negative of that. So we're tracking the equivalent of that on transparent which gives us the transparent pool balance. We are also tracking separately for each block whatever is calculated as the fee for that transaction is counted as a subtraction on the chain supply and every output on the coinbase transaction is counted as an addition to the chain supply. 

[18:59]

So if all fees are claimed then the subtractions cancel out with the fee component of the additions and all that's left in each block is a delta increase on the chain supply due to the block subsidy. 

[19:12] - **Daira**

We plan at some point to add a check to [zip 209](https://zips.z.cash/zip-0209) which is currently the consensus rule that stops shielded pools going negative to make that consistency check a consensus rule.

[19:31] - **Str4d**

Yes, the consistency check of both. We may as well check the transparent pool doesn't go negative as well and also to check the calculation of the chain supply of that method should be equal to the sum of the value in each of the pools. 

[19:51] - **Teor**

That's what Zebra currently does as a consequence of using the same value type for all 4 pools. We're also checking that transparent doesn't go negative because our type doesn't allow negative values which is implied by the other rules but not explicit. 

[20:12] - **Str4d**

We're targeting early next week for 5.4.0. The other thing it includes is a change to getblocktemplate that I think we might've discussed in a previous Arborist Call. Essentially to move a bunch of the work that was being done on each getblocktemplate call into the mempool as a result of backporting some changes from upstream Bitcoin core. 

[20:40]

Thats been done and it definitely reduces the amount of time spent inside createnewblock. About half of the time spent inside createnewblock was spent checking that the resulting block was valid. Testblockvalidity in Zcashd's case. It's slightly slower because some of the caches are not primed properly internally.

[20:50]

But something we noticed while doing that is, a lot of the time in a getblocktemplate call is spent outside createnewblock possibly in the case of these larger ones just serialising over 4mb of JSON across the RPC. It might be of interest to miners to consider an alternative like maybe a binary based api if they wanted to reduce latency there. It does seem like a lot of latency is outside of the block template creation. 

[21:40] - **Daira**

Is there anything in upstream Bitcoin?

[21:42] - **Str4d**

I don't believe so, theirs is also bounded because they raise their soft limit to effectively 4mb so they probably have a similar problem, 8mb of JSON in the limit. I haven't looked specifically if they've made any other improvements on any alternative way of representing the thing besides JSON rpc. It would be worth looking into. .

[22:09]

On the other fronts we're continuing to make progress towards DAGSync. The first thing we are heading towards is a pre-DAGSync where we can decouple making existing notes spendable from finding new notes I think we've got in place all of the refactoring and changes we needed to do. 

[22:45]

Basically once we've got 5.4.0 out the next thing we are working on is chasing down all the issues and implementation things we need to get to that point. Stuff like getting the necessary commitment tree information into Zcashd available over an RPC that lightwalletd can consume and then give out to lightclients.

[22:55]

Actually integrating the incremental merkle tree changes that are currently in review, shardtree i think the crate will be called - get those merged and available to start using in the light clients we use under the mobilesdk's then break apart the current scan cache's logic to be able to separately update existing notes from finding new notes. Thats essentialy our next chunk of work. 


___


### 3. Wolfram Blockchain Integration API


[24:15] - **Jon Woodard**

Thanks everyone for inviting us to introduce ourselves and give you an overview of what we've been working on in the blockchain community. I am John Woodard, I help run Wolfram Blockchain Labs. We are actually a subsidiary of Wolfram Research. Probably the core thing that people have heard of is either Mathematica as a product thats out there or Wolfram Alpha. 

[25:09]

We've been around for roughly 35 years for Wolfram Research which is an awful long time, I've worked at Wolfram Research for almost 12 years so I've had an opportunity to see a lot of stuff develop. What we are doing in Wolfram Blockchain Labs is extending computational intelligence into web3 ecosystems. Computational intelligence is something we work on in Wolfram research which is our parent company all across the board in a lot of ways. 

[25:46]

Wolfram Alpha is the biggest example of that. What we've done in the past 5 years in Web3/Blockchain/Crypto is basically develop that and integrate blockchains out there. What we've done with the blockchain integration service where we actually host nodes in our own co-location center as opposed to on cloud services. We actually rented our own co-location center as a result of building Wolfram Alpha in 2008 when we were deploying it there weren't a lot of services to use. 

[26:39]

We have struggled with Hardware intitially but when it comes to our blockchain integration service we host nodes, integrated those into our platform and then connect those to Wolfram Language & what we've done during the course of the last few months is creating a blockchain framework so it makes it easier for communities to integrate blockchains into Wolfram Language. That's one of the things we are working on now. 

[27:21]

At present it's just going to be for read access, i'll show you a few examples of what it's like but you can almost think of a programatically accessible, universal blockchain explorer and beyond that you can write transactions pretty easily as well: https://www.wolfram.com/language/12/blockchain/

[28:13]

Also our [documentation](https://reference.wolfram.com/language/guide/Blockchain.html) which people might find interesting to explore and play around with. Basically you can do all the interaction you could on a blockchain explorer except through our Wolfram Language functions. The functions are modelled after our superfunctions so you can change the blockchain base from Bitcoin to Ethereum and easily running the same function & get data. 

[29:03]

So what we want to explore and do with Zcash, in our blockchain framework, which will be a construction notebook. Notebook interface where someone can put in snippets of code to connect an rpc api from getblock service, connect it to functions that will be really similar to this & be very easy to do and actually save that code to a repository that people can download and use. That's basically the structure of our system. We've played around with it so we are confident it will work. 

[29:48]

We've done the construction notebooks & code repositories for other Wolfram Language functions and Wolfram Language packlets of both code and data. We're pretty excited, we think its all going to work and what we're doing is creating it as a proposal for the Cardano Catalyst program. Its a community led program. Basically what we are interested in and talked with folks at Zcash is engaging the Zcash community when we put this up for a proposal in Cardano which is supporting utx oriented chains to do cross-chain analysis of data and other things. 

[30:48]

Thats basically what we're up to & why we wanted to introduce ourselves and talk to folks and if you're interested in using it or in what we are doing, getting in contact with us. If there are any questions i am happy to answer them here or via email/linked in: jwoodard@wolfram.com / https://linkedin.com/in/jonlwoodard

[31:18] - **Adi**

This is just too cool to learn that Wolfram is integrating with Zcash. One of the things I loved from the Wolfram search was the ability to search certain data sets and view them in a graphical way. Maybe in the future if we can find a way to create graphs for Zcash data like how many transactions are going on in the shielded pool, the growth of different transactions etc. Is it something that is possible, to link the search with this data set?

[32:06] - **Jon Woodard**

In terms of connections to Wolfram Alpha that's something we are working on but that's going to be with the larger service. Because we're hosting the nodes. There are some things we have to store the data in databases to have the performance we need for those sorts of queries for Wolfram Alpha. Thats the tradeoff there, but when it comes to this, there are a bunch of examples available for Blockchain functionality & you can use Wolfram Language on the data. 

[32:51]

There's a lot that can be done there. Most of the visualisations you see within Wolfram Alpha are actually from Wolfram Language. There's a nice bridge from Wolfram Alpha to Wolfram Language called the Wolfram Alpha Notebook edition. What that allows you to do is start in natural language and move from natural language to Wolfram Language code in a notebook fromat. That's probably where you would want to go. 

[33:32]

It may not be that we support Zcash in that way but you could eventually do a query (we're very close to integrating this with other languages). You could do it with English, get the Wolfram Alpha code and use that code to play around with the Zcash implementation which would be in the Blockchain Framework. 

[34:05]

Going even further, like a lot of people we've been playing around with chatgpt3. I'd encourage you if you're interested in the power of Wolfram Language - here is a pretty good [article](https://writings.stephenwolfram.com/2023/01/wolframalpha-as-the-way-to-bring-computational-knowledge-superpowers-to-chatgpt/) as an alternative way to use Wolfram Language via natural language. 

[34:56] - **Adi**

That's amazing. If someone could use your feature set to track information, people would learn about having privacy online. That's a good use case. I just want to add about the grant program, Cardano Catalyst. They have one program every 6 months, maybe you could consider applying for a Zcash Grant, there is a rolling application for grants in the Zcash ecosystem. 

[35:34]

We are definitely thinking about that moving up from this initial implementation. For a long time we did the Blockchain integration which is more involved because we're running nodes, the hardware etc. In having this blockchain framework it gives a smaller initial step and then we can look at the larger step. We absolutely have that on our mind.

[36:29] - **Str4d**

Really interesting stuff here. Couple of questions from the technical side. I know you're providing access to data you could also get through a block explorer. I know in the past that block explorer strategies have differed wildly in terms of how they store data. How much are you relying on the backend node for data providing versus extracting data from it and then post-processing yourselves in your own data structures. 

[37:17]

I ask this partly as a maintainer of the full node you will be using in terms of the api's etc. What kinds of things this new exciting use cases is requiring for support?

[37:31] - **Jon Woodard**

When it comes to our blockchain integration we access ledgers directly for all the different ledgers we support. As you know already, there are pros & cons with that. People are able to access directly but it's going to be much slower. We have support databases for ledgers that require it. If you're accessing smart contracts that define tokens or names/tickers that are associated with tokens - we have support & are growing that. 

[38:44]

In the future what we might have are databased analytics where we've reformed everything & then ledger access supported in parallel. In terms of the data, we have a concept of 'Raw requests' & 'Cooked requests'. We do reshape the data but every time we access the data, we are accessing the ledger. 

[39:10] - **Str4d**

In this case we can think of it as accessing the data that Zcashd is storing and collecting internally. I'm guessing you'll be using the inside explorer stuff that we merged to help with one of the block explorers. The thing i can think of as a good use case for this is; when i've tried to do data analytics on the chain before usually its writing a python script - it includes a JSON rpc parser into a library and i point at my Zcashd and have it do things that way. 

[40:00]

It sounds like it would be about the same speed as what you're doing for now but that the benefit would be you can take the Wolfram common language and repurpose things as a common access point to multiple chains potentially. 

[40:22] - **Jon Woodard**

Exactly. You can access all the chains we support in that common way. We also have the Wolfram Language Client library for Python. It means that once we support it in Wolfram language, you can access it in Nodejs & Julia. You automatically have well formed universal structure with the other languages we support. Also within our Wolfram Notebooks we support external evaluation of Python, Julia & Nodejs and maybe some other languages. There is a lot of functionality there as well. 

[41:52] - **Str4d**

Cool. As far as the per-chain stuff goes. The Zcash chain started as a fork of Bitcoin so there is a fair few of the same rpc's and same concepts as far as the transparent side goes. We do have a fair bit of other things that we can expose related to our shielded support. How does that make its way into the Wolfram Language?

[42:21] - **Jon Woodard**

That's where it's harder and we'll have to figure out the changes. When you look at the functions that we have, we try to make them as universal as possible. We struggle with how to say it in a way that people can associate it with the functionality people have with a block explorer but also see that its more useful in ways. With each chain we try to support as many of the unique functions as possible. 

[42:55]

What helps us there is if you have information that highlights in this case the clear differences from Bitcoin, thats the fastest way our engineers can have a better understanding of Zcash to support as many of those that we could have good responses for. In some cases look at interesting and novel ways to use things. One of the things we are trying to do over time is make things more accessible to folks who are doing things like data science where they dont have to have an in depth understanding of ledgers and take data from ledgers to do interesting and cool stuff with it. 

[43:51]

With that in mind we do a lot of our own educational stuff. We have some study groups out there and we're expanding that stuff and we will continue to do that. That's another way it's useful if you have some of the stuff thats unique from Bitcoin and here's a list of the stuff or here's the best source to understand, the sooner we could do a good job with it. 

[44:22] - **Str4d**

The thing i'm likening this to was a Google BigQuery set to query Zcash data and i recall looking at some of the data and thinking "this isn't quite right". The interpretation of stuff they're taking the rpc's is questionable. Definitely prefer to hit that off in this case to make sure that you're getting the interesting data and ensuring the data you're exposing is the same interpretation as the source. 

[45:02] - **Daira**

I'm looking at the api's for various blockchains and it looks like it goes into some detail. For example it looks like it parses outputs & inputs down to the level of typed public keys and signatures. That's interesting I didn't really expect that. It identifies what curves there are and so on. 

[45:37] - **Jon Woodard**

Most people are pretty impressed with the implementations we have. That said this is a new area with the blockchain framework, we're hoping to get that support with cardano so we can do it with their Catalyst program. It should be a way to get more utxo chains supported, even if it's supported at the read level. If you look through the documentation you will see that we support writing transactions as well. 

[46:13]

We're supporting writing smart contracts as well with payloads from the different functions. I know we support it for Ethereum, we are working on it for cardano as cardano has added smart contracts in. It's interesting and there's a lot of examples in the documentation to go through and test & explore. 


___


### 4. Research & Implementation update - ZSA zips 


[48:40] - **Ian**

I didn't see Nathan on the call today, does anyone in ECC have any updates regarding research & implementation status?

[48:59] - **Str4d**

Nothing in particular I think our main focus at the moment is the work towards DAGSync & keeping Zcashd running. There will probably be more related to that in upcoming calls. 

[49:19] - **Deirdre**

There was an ask on an update regarding ZSA's or ZSA zips. Daira you may be able to help me out, we are the zip editors so we've been reviewing the ZSA draft zips for issuance and transfer & burn. That is ongoing, they are getting updated with implementation changes and the authors have been resposive but we are trying to get a synchronous call at least from the ZIP editors and the ZSA folks so we can avoid some of the latency of these back and forth cycles about specifics of things that are getting implemented in a forwards looking way for the Zcash protocols & how to structure the documents for ZIPs and documenting specifications in the Zcash world. 

[50:43] - **Daira**

There's also work that needs to be done on the implementation side, making sure that the circuit fits within 2^11 rows etc.

___


### 5. Open Discussion - Total coin supply / Tail emissions


[53:20] - **Adi**

Just revisiting the chat we had about unclaimed ZEC. One of the things that keeps coming up in Bitcoin world is: There will never be exactly 21million Bitcoins mined, there will always be a small remainder. Is the same issue with Zcash?

[53:37] - **Str4d**

No. There's a good reason for that. The small remainder people refer to for Bitcoin is the fact the genesis block could have claimed 50 Bitcoin but didn't, that is no the case with Zcash because of the slow-start. It was indeed the case at the point we forked it was impossible to put non-zero outputs into the genesis block because of the way the genesis block was ordered but i picked the slow start parameter so that the intended amount of block subsidy on the genesis block was zero. 

[54:25]

The other thing people refer to when never hitting the 21million is rounding errors at the bottom when things get small enough the way halving works. But again, thats a "if you leave things exactly as they are" thats the case. If the community were to go towards some sort of posterity fund system that delta of whats theoretically on the network and what supply says it should be, that lets you reach parity. 

[55:18] - **Daira**

To me there's an open question whether a Bitcoin style cryptocurrency whose block rewards go to zero is sustainable and secure in the long term. I'm sure that Monero people would say that it isn't because they have a tail emission. 

[55:50] - **Str4d**

Ethereum as well, they also have a tail emission of that sort. 

[55:58] - **Daira**

I agree with them, I feel that tail emission is necessary to be honest. There may be some point at which we change the consensus rules to take that into account and its just a matter of how much and when. 

[56:16] - **Str4d**

That would be something that would require wider discussion in the community. Everything that we've discussed thus far in terms of the tracking and leftovers are within the existing emissions curve. 

[56:30] - **Daira**

I want to emphasize thats just my opinion and obviously its something that needs to be discussed among the community. Also the security requirements for proof of stake may be different than proof of work. 

___

### Attendees

+  Jon Woodard (Wolfram Blockchain Labs)

+  Adi Nighthawk

+  Conrado Gouvea

+  Arya Solhi

+  Deirdre Connolly

+  Daira Hopwood

+  Str4d

+  Pacu ECC

+  Greg Pfeil

+  Jack Gavigan

+  Kris Nuttycombe

+  Teor

+  Taylor Hornby

+  Daniel Wolande

+  Dismad

+  Issac Shapira

+  John Bruhling 

+  Amber O'Hearn

+  Michael Harms

+  A Murray

+  Zero dartz

+  Yasser Isa Manzur

+  Turd Ferguson


**Next Meeting Scheduled: 15:00 UTC February 9th 2023**
___
___
