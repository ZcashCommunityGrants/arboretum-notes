# Arborist Call #66 Notes

Meeting Date/Time: November 30th 2023, 21:00 UTC

Meeting Duration: 40 minutes


**Agenda**: 

+ [Welcome and Meeting Intro]()

+ ECC Core Update - [Rust Library refactoring / Decentralising Zcash Github Organisation]()

+ Zebra Update - [Zebrad 1.5.0 / Zebra Scanning]()

+ Research & Implementation Update - [ FROST 1.0.0 -rc.0]() / [Trailing Finality Layer]()

+ Open Announcements - [Arborist Calls over Holiday Period]() / [1st Zebra Block Walkthrough]()

+ Open Discussion - [Mining Luck Estimation]() / [Zebra Latency / Sandblast status]()


## Decision & Action Items

i) Arborist calls resume in 2024, Jan 11th 

ii) Knowledge Share between ECC & ZF on Zebra Scanning

iii) Revisit FROST ZIP during ZIP sync

___


Video of the meeting: [recorded]

Moderator: Teor

Notes: Jason Rogers


___



## Full Notes

___

### 0. Welcome & Intro 

[00:02] - **Teor**
Welcome to the Zcash Arborist call. Arborist calls are community calls that are designed for engineers and organizations involved in protocol development to collaborate together on the protocol.

[00:22] 

Today's agenda, we have the Welcome and Meeting intro, updates from the different nodes in the ecosystem Research and Implementation status to an announcement about Arborist calls over the holiday period, an Open Announcements period, and an Open discussion period.

[00:45] 

So, as I've already said, Arborist calls are bi-weekly calls for Zcash Protocol contributors. This is the call in the 21:00 UTC timeslot. There's also one at 15:00 UTC on Thursday on alternating fortnights. So the purpose of this call is to make Zcash protocol development accessible for a wider set of participants and provide transparency for the community.

[01:19] 

Anyone interested in learning about Zcash protocol development can register at [zcasharborist.org](https://zcasharborist.org). And if you want to present an in depth agenda item, you can email Arboristcall@zfnd.org to request a presentation slot. There's also some coordination that goes on in the R&D discord for Zcash.

[01:48] 

You can also get involved in Zcash development by getting involved in Zcash community grants, the R&D discord, and the community forums. And all of those links are available at [zcasharborist.org](https://zcasharborist.org). So we'll start with the core team updates, starting with the Electric Coin Company.



___

### 1. ECC Update - Rust Library refactoring / Decentralising Zcash Github Organisation

[02:29] - **Str4d**

From that perspective, the main work going on right now in the core Zcash Rust libraries underpinning both of these is twofold. We have ongoing work to refactor the Sapling code from within that codebase, to extract it out, to basically have the same sort of level within the structure as the Orchard code, and add in various bits of Type, Safety and things that we developed during writing the Orchard code, retrofitting it into the Sapling pieces.

[03:06] 

That will also potentially mean that you'll be able to use the stack eventually without the Sapling pieces if you want, but it'll be easy to do it once the modularity is there. Then the second piece is introducing Orchard into places where it doesn't currently exist, such as the lightclient wallet component, Zcash client backend & Zcash client SQLite. So there's ongoing work to refactor those pieces together. The Sapling piece, which I've been working on, hopefully we'll be doing the extraction next week will be nice, assuming that the reviews and the remaining decouplings and things internally go smoothly.

[03:54] - **Kris**

There's one more thing which we wanted to bring up here that I think Nate and I were actually on the hook to prepare for this, but did not get an opportunity to fully prepare. But just as there is an ongoing effort to decentralize responsibility for the Z.cash website, the next stage in that process is going to be decentralizing responsibility for the Zcash GitHub Organization and Zcashd. So there are a number of questions with respect to what NU6 looks like for Zcashd and we're going to be putting out a call for participants in a new organization or a new group that can look at sort of the zcash ecosystem more holistically and decide who is going to be responsible for what pieces of the Zcash ecosystem when it comes to zcashd and the Zcashd wallet going forward.


___

### 2. Zebra Update - Zebrad 1.5.0 / Zebra Scanning 


[05:19] - **Teor**

Thanks for that. Okay, so next we'll move on to the Zebra update. Arya was going to do this one, but he's away, so I'll just share what he was going to share earlier. So one of the big pieces of news in this release is that we've started working on shielded scanning in Zebra. So it's very experimental at the moment, but you'll start to see some new crates and some changes in Zebra.So have a look at those when they're released.

[06:13]

The other things in this release in production are that we avoid a panic when reading cache Sprout or history trees in the previous Zebra version. So we're encouraging people to upgrade. And we've done a number of network fixes in response to the Ziggurat red team report that's most of what's in this release for Zebra. That release is 1.5.0, and that'll be out sometime next week. Any questions about zebra? Go for it.

[06:58] - **Str4d**

The experimental scanning square, I saw one of the PR's looking like it was pulling in from Zcash client backends scanning. Are you looking at the Zcash client SQlite crate as well or are you at the moment using the backend's scanning basis and then your own data stores and things for now?

[07:23] - **Teor**

Yeah, so for the moment we think we're going to use our own data stores, but we're still in a very experimental stage, so we're just seeing what's possible at the moment.

[07:36] - **Str4d**

Yeah. It'll be good once you've got something sort of like end to end, I guess there would be good to have maybe not in an arborist call, but an offline chat at some point to see how things are working there and how you're finding them, because the extracting out the pieces that are useful from a wallet perspective and decoupling them from the lightclient pieces specifically because you're operating in a full node context would be good to have at some stage. So we can have an offline chat about that in the R&D discord to figure out how we can sort of do that knowledge share.

[08:22] - **Kris**

Also just related notes. So as Str4d mentioned, I'm currently working pretty heavily on introducing Orchard support into the Zcash client backend APIs. So just as a heads up, there will be a bit of a moving target for the next week or two, but I'm trying to get those API changes wrapped up relatively quickly.

[08:51] - **Str4d**

And that will only affect you if you're using the current branch, because obviously the published crates can't have a moving target because they're pinned.

[09:00] - **Kris**

Exactly.

[09:01] - **Str4d**

But yeah, hopefully the diff from the current published to the next one will not be too horrible.

[09:10] - **Teor**

We'll keep an eye out

[09:11] - **Kris**

Well, there are some things moving of imports or use statements that will need to change and so forth and some signatures change but hopefully conceptually not much will need to move around or architecturally.

[09:27] - **Teor**

Sounds good. Yeah, I think that knowledge sharing would be good once we have a better idea of what our scanning will look like. Right at the moment we're just trying things out to make sure that they work.

[09:45] - **Str4d**

Yeah, exactly. When you've got like an end to end sort of thing working that you're reasonably comfortable with, it'd be good to do that. Yeah.


___


### 3. Research & Implementation Updates i) FROST 1.0.0 -rc.0

[10:19] - **Conrado**

So with FROST we released the [1.0.0 rc-0](https://crates.io/crates/frost-rerandomized/1.0.0-rc.0) version of our crate. So the first release candidate. So that's out. And our goal now is to gather feedback from people who are already using it or are interested in it to see we want to stabilize the API. So if have any feedback on the API, that's very welcome right now.

[10:45] 

Eventually we will release the final stable 1.0.0. But not sure when we want to wait a little bit to give time for people to give feedback. Otherwise the crates are fully functional. We are also working on adding communication to the demo. So we have a demo that works on the terminal and we're adding socket communication suite we are halfway through it.

[11:13] 

We're planning now the next phase after that. We haven't decided yet, but we might expand that demo to make its architecture a bit different because right now it assumes the coordinator of the fraud signing process is a server. But in practice I think that's unlikely. The server probably will be some infrastructure server that's running somewhere like the lightwalletd server. So we might refactor that. Or we are also considering if we just expose this demo as an application, as a graphical user interface application to allow people to experiment with it.

[12:02] 

Something else that's also going on is we're trying to add no S2D support to our crates. So if you have some embedded environment that you like to run FROST you can, it's done-ish, but I had to forks and dependencies and stuff like that. So I have to sort these things out, open some PR's. But yeah, eventually we'll get this done. 

[12:33] 

Another thing is that I wrote a ZIP for using FROST with Zcash. It has been kind of frozen. It's complete, but we haven't pushed it forward because we were waiting for a secret proof by Chelsea. So now that's ready, I think we'll publish it on reprint sometime soon and we would like to resume the ZIP process. So whenever we have time, the zip sync, I'd like to revisit the FROST ZIP so we can sort some things out and eventually make it.


___

### 3. Research & Implementation Updates ii) Trailing Finality Layer 

[14:29] - **Nate**

Okay, so just zooming out to the medium term roadmap. The last sort of milestone we completed about two weeks ago, which was sort of to release a [version 0.1.0](https://electric-coin-company.github.io/tfl-book/introduction.html) of what's called the Trailing finality layer book.

[14:55] 

That version introduces what is the Trailing finality layer and why are we proposing this sort of approach to transition to a hybrid proof of work, proof of stake protocol? And then it also refers to a construction called Crosslink and all of the Crosslink writing is external to the book on Hackmd, and so it links over there.

[15:30]

The next milestone we want to get to is just to integrate those so that the next release of the book will sort of be comprehensive and contain everything about this thing called the Crosslink construction, which is sort of the heart of the design so far. And what's happened recently is I finished reviewing the safety arguments with Daira, and it's pretty fun or exciting because this design, I believe addresses the concern that was brought up at Zcon4.

[16:13] 

At Zcon4, I presented a simpler design, and there was the concern about that splitting the security so that it would only be as strong as the weakest of the two subprotocols. But I'm pretty sure with crosslink, the safety of the protocol holds as long as the safety of either subprotocol holds, which is really nice.

[16:41] 

So that's much better. Then in the meantime, we've just started discussing creating a prototype. We want to make a prototype, and we're exploring using Zebra and sort of mashing that together with CometBFT, which is the main SDK and protocol from the Cosmos ecosystem.

[17:11]

The initial goal for the prototype isn't necessarily to implement Crosslink or to use that particular proof of stake protocol, but rather, it's just to start getting our hands messy with zebra and how to modify it and what it looks like if we're trying to tie together these two protocols so that we are able to start iterating on that codebase.

[17:36] 

And then as the actual design matures, we could start developing that codebase towards a mature, realistic implementation. Yeah, so that's where we are at so far. There's still a lot to the protocol definition that's unanswered open questions, including a lot of the topics that many users are interested in, such as how staking will work and how yield or delegation or things like that will work. So that stuff is still a ways out. I just wanted to highlight that in case people are listening along, because usually I get questions about that fairly frequently, so that's still a ways out.

___

### 4. Open Announcements - Arborist Calls over Holiday Period 

[18:42] - **Teor**

So there's a Q&A and a chat if people want to ask questions that way. So we might go to the next part of the announcement. Feel free to also ask your questions in the Open Questions section. So the arborist calls over the holiday period. The next arborist call is on the 14th of December, the early time slot, and then got a question here. Any objections or concerns about cancelling the 28th of December?

[19:32] 

Then the first call of 2024 will be on the 11th of January in the early timeslot. So that's 15:00 UTC. So those details will be available on the Zcash Arborist calls website. And now we have an Open Announcement section. I know we've got at least one. Marek, are you ready to share?

___

### 4. Open Announcements - 1st Zebra Block Walkthrough


[20:18] - **Marek**

Sure. So Zebra has its first block on mainnet that we know of. I can share how we did it. So a while back we implemented mining support in Zebra and recently we enabled the rpc's in the default build.

[20:52] 

I've been mining Zcash for more than a year, and I never thought it was possible to produce a block with the hardware that I have until we were enabling the RPCs. And I randomly thought of calculating the probability of producing a block. And the result was that it should be possible to hit the solution once per 10,000 blocks, which seemed quite good because that's about nine days.

[21:36] 

So I tried it, and the way I did it was pretty simple. I ran Zebra on my desktop, then I connected s-nomp to it, which is mining pool, and I live in Prague, but the miners are in Slovakia in my parents house. So I needed to connect the miners to s-nomp, but I don't have a public IP, so I just set I redirected the port that I was running s-nomp at to a VPS that I rent to make S-nomp publicly accessible. And then I connected the miners to it.

[22:34] 

And then I was just waiting for a month, and it actually worked. So that's about it. I would like to write a blog post about how I operate the machines, because I mentioned it to a few people at Zcon4 and they were interested in the economics and the consumption and stuff like that. I track all of this data and if I have time, I might write it up over Christmas.

[23:14] 

I have the miners immersed in oil so that I can use all the heat from them. The electric power there is about four and a half kilowatts, which is enough to heat up a whole house. I transfer the heat from the oil to water through like heat exchanger, so the water goes to the radiators in the house. And I also use the heat to heat up a water tank for hot water in in the house. And last piece is that I offset the consumption with solar panels, which works great, especially in summer. So in winter I use all the heat, and in summer I'm mining almost for free. That's all about it. One more maybe is that the way I connect to the ASIC's, they just provide a web interface, like a WiFi router, and I needed remote access to them.

[24:41] 

So on the VPS that I have, I set up OpenVPN Server, and then at home I run OpenVPN Client and I learned to so thanks to this, this forced me to learn how to redirect traffic from a client in VPN to the local network on the client, and then back from the local network to the VPN. Yeah.

[25:22] - **Teor**

So any questions for Marek? I know there's been a bunch of comments in the chat,

[25:40] - **Marek**

it's just a hobby I told a few people on Zcon4 and they wanted to know more, so I'll try to write the blog post over Christmas because I'll be in Slovakia, so I'll take photos and try to document it.

[26:07] - **Teor**

Great. So look, I'm personally very impressed that it's all doing useful work as well as doing proof of work, so that's pretty good. Any other announcements? I know this one might be hard to top, but yeah, please feel free. 

___

### 5. Open Discussion i) - Mining Luck Estimation 

[27:16] - **Marek**

So one really random thing about mining, and that's actually a question, what I wonder about is if it's possible to estimate the distribution of mining luck. Mining luck is the deviation from the expected time of hitting a block. So it took a month to hit the right block for me, but the expected time was about nine days.

[27:53]

So the luck was about 300%. 100% is when you hit the right block at the expected time. And I assume that the luck is normally distributed with mean at 100%, but I wonder about the standard deviation there. I was not able to determine that, and I feel like it should be possible to determine it without the actual data. I think it's an interesting metric for mining in general.

[28:37] - **Str4d**

Yeah, because the fun thing there is that what you're dealing with more of a sort of a Poisson distribution. It's completely oblivious of everything that's happened prior to that point. So at any point you look at it, your expected wait time is nine days for that, even if you've already been waiting 18 days. So it's an interesting thing to be like, okay, well, given the knowledge of how long you've been going, how does it actually factor into the statistics?

[29:18] - **Marek**

Yeah, I see the Poisson distribution, but regarding the luck, I think that's a little bit different because that just measures how much you deviated from the expected time and I wonder what's the global value of it, basically.

[29:44] - **Str4d**

But the thing there is it's an uneven way in which you can deviate, right? It's not normal because you can only be faster than the median to a certain degree. So you can only claim blocks to a certain level. I think the interesting thing there will be that I would expect to see will be the effect of network latency on block propagation in terms of how quickly small miners are seeing the blocks, particularly as we have much larger blocks or have had much larger blocks in recent history, and how that affects.

[30:28] 

Because obviously the sooner you get a block, the sooner you can start mining on probably. If that's the dominant factor in that, then that would add more of a normal factor. Yeah, that could be very interesting for someone to look at. Most of this should be visible in the chain data because even for shielded coinbase, the coinbase recipients are public.

___

### 5. Open Discussion ii) - Zebra Latency / Sandblast status

[30:57] - **Marek**

I wonder if there's any difference between Zebra's latency and Zcashd's latency.

[31:06] - **Str4d**

I would hope zebras is better.

[31:11] - **Marek**

But that would increase the effective hashrate of the pool if it was.

[31:21] - **Teor**

So I know that our latency to get blocks and validate them should hopefully be better, but I think we still have a fixed delay in some of our getblocktemplate code. It's not arriving immediately, as soon as there's a new block. So yeah, if people are interested in looking into that performance, that is something that's possible to change. But at the time, we didn't have any solid data on whether that would make a difference at all.

[31:50] - **Str4d**

Whereas we definitely had a bunch of people going "no blocks. Need to be able to be created as soon as possible" and minimizing in particular in our case, the time between someone else finding a new block and our getblocktemplate call generating something based on it. Like a couple of years ago, we put some time into it after getting some user feedback that it was a little too slow. I expect if there's more uptake of Zebra in mining pools, you will start to get more user issues with that regard.

[32:40] - **Teor**

I'm just madly scanning through the code now. Yes, we are doing long polling, but I think our first request comes back very quickly. So the trick is the second time around for long polling. I will go look up what that constant is. It's currently 5 seconds because we were, I think we were a bit cheeky and picked half of zcashd's, but we can definitely change that or make some code changes to make it virtually instant.

[33:16] - **Str4d**

Yeah, because zcashd does, it has its ten second whatever barrier on how long it waits, but it does have a bunch of logic for it that will skip past that depending on certain conditions that occur. So that's sort of more an upper limit on how long it will block.

[33:41] - **Marek**

What helped with producing the block, unfortunately is also that the global hash rate dropped in the last few months from around 11 Gsols per second to about 8 Gsols per second. I think this is also related to the increase of the global hashrate share of ViaBTC because some smaller pools got smaller hashrate and via BTC basically kept the same hashrate. So the share of ViaBTC's hashrate increased. I think that the decrease of the hashrate is the reason why ViaBTC is so high now.

[34:55] - **Teor**

I should clarify what I just said. I've just been reading our comments. So it turns out when we get a new block, getblocktemplate will return a new answer immediately. It's only when there are mempool transaction changes that we're waiting for 5 seconds to go check the mempool for the next set of changes. Which, with the current transaction spam, is probably a good idea.

[35:19] - **Str4d**

Although the transaction spam has actually sort of ceased in the last two weeks.

[35:28] - **Teor**

So this would be an interesting topic. Would you like to tell us more str4d about the transaction spam?

[35:36] - **Str4d**

Well, the sandblasting that we've been having for the last year and a half or so has generally been reacting to things that have gone on in the network and changes deployed to the nodes.

[35:53] 

We haven't deployed any specific changes recently, but I think there's been more wallets who have been uptaking things like ZIP-317, & similar things along with after zcashd deployed it within the default block construction algorithm back in April this year I think it was. And the other thing I've noticed in the past is periodically the spam will just start dying off, like the mempool just start decreasing because all the transactions in there will have some expiry height or even if they don't, as more transactions are added, they will get evicted.

[36:40] 

Because of the way that the mempool's weighted transaction stuff works. If you have transactions that are smaller but more preferred, when they enter the mempool, the random eviction by weight meant that the larger spam transactions were getting evicted and not being naturally re added because they didn't have a wallet behind them that was doing resubmissions. So you'd get sort of this natural decay of the transactions over time from that perspective.

[37:10] 

But normally what had happened when I'd seen that in the past is you'd see that decay and then come like a Friday evening or Saturday morning kind of time. You'd see some spikes and some curves going on in the behaviour, as if someone who is generating them might be experimenting with a script and then it would ramp back up to full and then sort of go away, continue on that way.

[37:34] 

But sometime in mid October, it died off for a period and got down from like 8000 transactions down to about 4500, jumped back up to mempool full, and then a couple of weeks later it died back off. And it's now as of 16th of November, the mempool went back down to having only a couple of transactions in it on average, and it has been quiet since then. So there's nothing stopping someone from spinning that back up and continuing. But perhaps they got tired of it not being as effective as it was a year ago. We can speculate on that regard, but at least since middle of November, the mempool has been basically quiet.

[38:29] - **Teor**

Any more questions on the transaction? Spam Marek I don't know if you have a question or if your hands raised from before.

[38:53] 

So any further questions at all before we finish up? Thanks everybody, for a bit of a short call today. The next Arborist call is in two weeks time on the 14th December at 15:00 UTC, which is the earlier timeslot.


____


### Attendees

+ JG

+ Daniel (decentralistdan)

+ Jack Grigg

+ Conrado Gouvea

+ Kris Nuttycombe

+ Marek Bielik

+ Nate ZEC

+ Taylor Hornby 

+ Michael Harms

+ Oleksandr Putyak

+ John Garcia

+ 


**Next Meeting Scheduled: 15:00 UTC December 14th 2023**


___
___