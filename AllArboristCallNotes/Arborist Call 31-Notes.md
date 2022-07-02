
# Arborist Call  #31 Notes

Meeting Date/Time: June 30, 2022, 22:30 UTC

Meeting Duration: 38 minutes

**Agenda**: 
+ Zebrad Status Updates
+ Zcashd Status Updates
+ Open Discussion



Video of the meeting: [Recorded]

Moderator: Steven Smith


Notes: Jason Rogers

___
## Decisions & Action Items

i. Presentation on Collective Test Suites

ii. Knowledge sharing between ECC, ZF, Grant receipients on CI/Automated Testing


___

## Full Notes



### 1. Zebrad Updates - 1. 1.0.0-beta. 12

**Conrado** [04:47] - A couple of days ago we released Beta .12 Zebra. We had some breaking changes, we now delete old cached states because the way Zebra works when we change the database format, instead of migrating the data we just sync back from genesis. But every time that happens the old database would be left on the disk and that can be weird for users because it starts to take up a lot of space. So now Zebra deletes the old cached states in the database. 

We don't enable by default some features like tracing new metrics just because they are optional and we don't need to compile them if you don't need them. So if you need them you now need to enable them in compiling. There was also a small change in the Config file format, before you needed to specify the number of seconds and miliseconds it was weird but now you just write down 's', a human format and it will accept that. 

[06:15] - We had some issues with sync speed because recently there has been both a large number of transactions and some transactions which a large number were Orchard transactions and those were taking a long time to verify and this was resulting in Zebra not being able to sync at all. So we did some adjustments with timeouts and number of parallel jobs, stuff like that and now its working. 

We also incorporated the new recent Halo 2 crate release which also improved performance a bit but the biggest change will be something we are working on which is actually supporting batched verification for Halo 2 proofs. So when we do have that the performance will probably be much better. We also had to make some CI improvements also due to this issue because GitHub Actions has a 6 hour timeout for each job and Zebra was syncing in 5 hours 55 minutes. But with those blocks it became more than that so we had to split the sync job into different jobs to work around the timeouts, it's now working. 

[07:33] Some Documentation improvements, we also now  we reject peers listening to the ports that Flux use to avoid issues because we already had issues from DNS seeder and we also don't connect to those peers in Zebra. We also prefer when choosing peers we prefer peers using the canonical ports of Zcash. 



______

### 2. Zcashd Updates 1. Build System Improvements


 **Steven** - The next thing for us is Zcashd release 5.1.0 we are targeting next week to have that out. A few things to highlight that we will include in there, you can categorize it as some build system improvements. We integrated [cxx.rs] into the build system. That replaces handcrafted FFI layers between Rust and C++ to something thats a little more automated. Also integrated [cargo-vet] into the build system for Rust dependency trust verification. 

 Other big things in the release, we reworked the 'reindex', 'rescan' logic a bit. Wallet RPC's now block until 'reindex' and 'rescan' are complete. The reason we did that, no particular failure but you could absolutely get some erroneous results back. For example there was one partner we worked with that was doing at some point in the rescan a [z_getbalance] and because of the way things were initialized it was showing that there balance was basically half of all issuance, like 7 million ZEC. 

 [09:37] We also made it where 'rescan' will now only kick off once 'reindex' is completed. Previously 'reindex' and 'rescan' were totally seperate functions. 'Reindex' was not a superset that included 'rescan' but we adjusted the logic so essentially it is at this point. 

 We improved [z_gettreestate] performance, that's one of the RPCs. Thats honestly not as much of an issue after NU5 as it was before but nonetheless we have that code in there, its merged. As i mentioned before [gettransaction] & [decoderawtransaction] we did not have the Orchard details in specifically for that. Where that would show up primarily is block explorers trying identify number of Orchard actions in a transaction for example. Definitely not the sender, receiver or amount of course but the little bit of info they needed for block explorer when looking at individual transaction. 

 ___

 ### 2. Zcashd Updates 2. Batch Verification 



 **Steven** [10:45] - Then the last one, Batch Verification of Orchard proofs as Conrado mentioned, after NU5 activated roughly about 2 1/2 weeks ago we started seeing a tremendous number of Orchard transactions coming through, sometimes as many as 500 a block which was pretty high and higher than shielded transaction activity that we had seen before. The verification time for a block of that size was roughly 2.5 seconds, we've reduced that time by i think 81%. So it would be roughly half a second now to do that same amount. 

 So we made a number of optimizations, one obviously Batch Verification which speeds that up. Kind of an interesting data point, if we had seen the same number of Sapling transactions with the current Sapling architecture, how long would it have taken? And it would have been roughly about 7 seconds to do that same number of Sapling transactions. Caveat is we didn't do batch verification on Sapling, there were some optimizations we could have done and got that time down super the low too if we needed to. 

 **Daira** [12:10] - It's fine we could do some Batch Verification relatively easy if that happened. 

 **Steven** -  We know how to fix it, we should probably do that at some point anyway. 

 **Daira** - Congratulations to Str4d for implementing that Batch Verification, it was me and Sean involved as well but Str4d did most of the work so thank you. 

 **Steven** [12:53] - Great point, great work by Str4d and Sean and Daira to really dig in and identify the opportunities for optimization of that amount. Str4d also developed some benchmarks, if you look at that particular PR theres a benchmark that uses a particular block that has a large number of Orchard transactions in it so we have a benchmark we can track for future testing.  


 **Deirdre** [13:35] - Can i ask a question? We upstreamed batch maps for Groth16 into Bellman a while ago, is Zcashd not using that? We're using that to verify batches of Groth16 proofs. 

 **Daira** - Zcashd is not using that, just because we havent got round to it. 


___

### 3. Open Discussion - 1. Test Suites

**Steven** [14:35] We mentioned the ZCAP poll so be sure and vote if you haven't already. I do know Dodger wanted to introduce Gustavo who the foundation hired to do some Devops work. 

**Dodger** - Yes Gustavo's been with us quite some time now. It was December, he's been kicking our CI infrastructure into shape. One of the things I wanted to float and may not be practical or reasonable but I was wondering if it was a good idea to do some knowledge sharing between ECC and ZF and in fact maybe outside as well, especially to any Grant recipients maybe people like Ziggurat may be interested. How we do CI, how we do automated testing, the sort of test that we run. I don't think we properly got into benchmarking yet. 

**Daira** - I think that will be useful.

**Steven** [16:05] - I think it's a great idea and it will be a great idea in general no matter what. In NU5 for example it would be really great if we shared test suites, so if we made a change to Zcashd we could've ran some Zebrad basic test, maybe not the full test suite & vice versa. When you were making some changes you could have maybe a subset of the tests you could run just to make sure things still functioned right. I like that idea, i'm very supportive. 

**Dodger** - At the risk of volunteering Marshall and Gustavo I was wondering if maybe they've corresponded a bit and met a few times, maybe it would be a good idea to do a presentation type thing describing how we collectively and if there's any individual differences do this sort of thing. I think good for our community and good for other people who might be doing this sort of thing. 

**Marshall** [17:35] - I think it's a really good idea to get some consistency across the stacks. We were talking about this yesterday with our Gitflow issue we were working with, The same kind of stuff came up we were talking about having a shim layer of tests, so it's like a test suite if you look at it from a repo thats independant from a main repo so it can be ideally shared or in high flow CI's it's one less thing to worry about but it gives folks the ability to test stuff, more independant from the code. Having a conversation across team even with Ziggurat focused on the community and bringing it all in and finding common bases and flows, thats something we are already trying to do so we're definitely open to new ideas or stuff we may have missed so i think it will be a good fruitful conversation. 

**Steven** [18.32] - Lets just get Gustavo and Marshall connected and I know Yassers recently joined the team. He's been doing quite a bit of work on CI an upgrade we're doing there and we've got a number of people doing some really cool things around testing too so Marshall and Gustavo can get everyone connected that needs to connect and that'd be great. 

I do remember too the last time we had Ziggurat on the call we were looking at taking some of their tests and including those in a test suite too. To have that kind of multinode test suite and a network level test suite all in one place if you wanted to run it could be really cool, in addition to people doing other protocol development. Maybe they're not doing a full node for example but they want to know their work would impact a full node so they would have access to that test suite too, excellent idea Dodger. 


**Gustavo** [19:57] - Nice to meet you. If you need anything Dodger will put us in contact, but if there is anything that you'll need to know about the actual implementation just let me know. 

**Marshall** - What timezone are you in?

**Gustavo** - UTC -4, commonly New York time.

___

### 3. Open Discussion - 2. Orchard Verification


**Teor** [20:50] - I just wanted to chat through a few of the details of the extra Orchard load that we've been seeing on mainnet. As conrado said, one of the things we are working for zebra at the moment is decreasing the number of blocks that we try to verify concurrently, because we were verifying hundreds of blocks and that was fine when you've only got a few shielded transactions in there but if you try to verify a few hundred blocks with 500 transactions each, that's actually a lot of RAM and alot of CPU so we were timing out on a lot of those. So that change should be hopefully coming in our next release, not in the one we've just had. 


Hopefully when we get batching in we can increase the default limit there. I was just wondering if anybody else had any other thoughts on how we should be working through that or maybe even how we should be monitoring for these kinds of load incidents?

[22:13] - Is there anything else we could be doing to speed up verification Zebra has on it's list, verifying fewer blocks concurrently and then also batching Orchard proofs? Then should we as a community or node implementers be doing more to monitor the load on the network so we can find out about these kinds of things earlier. 


**Daira** [22:45] - I think that especially to mitigate denial of service any full node implementation should probably be capping the amount of memory that it's going to use for verification. So in other words, keep track of that and if it's above a threshold then don't use any more parallelism. 


**Str4d** - The main thing is we need to be at a point where full blocks are comfortably verifiable and including with Orchard there's a bit more we need to do to get to that point. I know in Zebra's case you do a lot of full chain syncing, especially with the Config deletion you sync from scratch, so you're probably encountering more of the multi-block edges than we are in that case, particularly because we dont sync blocks in parralel. 


**Daira** [24:10] - There are two approaches you can take here. You can try and design for worst case blocks but then if you make a mistake and a DoS attacker finds some block structure worse than your worst case then they have an attack. Or you can try and dynamically deal with resource usage, so the suggestion of capping memory usage was in that category. 


**Str4d** - I also dont know how much you do in terms of remembering verification states, I dont know what zebras internals are like. If you see a transaction come in via the mempool and then again via blocks, how much that verification gets cached?

**Teor** [25:01] - At the moment we dont cache any verification results but we could and it would be possible for us to put a generic service in front of our verification that returns the same result. The trick would be to capture the state of the chain at that point that the verification depended on, at which point we'd probably just capture the tip hash and re-do it again if the tip hash happened to change. 

**Str4d** - That's roughly what Zcashd ends up doing where in memory the transaction that's in the mempool can cache that verification state but then the mempool state gets re-evaluated every time the tip changes. Probably in your case with multi tips theres probably a more intelligent thing the node could do to track which subset of tips a mempool transaction could be valid in and maintain the validity within that state perhaps? 


**Daira** - The issue with caching in general is that it's not going to affect the worst case. So it's fine for general usage but not for denial of service. 

**Dodger** - Purely for this specific topic given the nature of it, is it worth having a private meeting?

**Str4d** [27:35] - It could be useful, for certain things we know the kind of work that can be done to improve things and certainly something off-channel for collaborating on those improvements could be useful. 

 
**Marshall** [28:20] - The second question Teor asked about which was the common ground of rules or alerts or monitoring, how we cache the state across the ecosystem. Hand-in-hand with what Dodger was saying bring all the DevSecOps folks in together I was thinking maybe the next step would be to get a common Rule set / Alerting set that we can build off, at least folks could share this in a test suite just to have sanity check references of what they may be seeing compared to others. We are totally open to other ideas and maybe doing something completely different because I know Ziggurats gone into all the cases with each node.

___

### 3. Open Discussion - 3. Node Metrics


**Teor** [29:30] - I used to work with the the Tor project and worked a bit with their  metrics team. They actually have a public website that has automatically updated metrics for a bunch of things common for distributed systems like Number of Nodes and Volume of stuff, those kinds of things. I also worked as a researcher on Tor before that and it was very useful as a research resource. So if we're looking to attract more researches on, say the reliability side of things or even as something for other researchers to quote in terms of the volume of their network or the Number of Nodes. I think that monitoring is very useful. It's also something I think would help us make better decisions for future network upgrades particularly when we are talking very large changes like for example, a change away from Proof of Work. Knowing how many nodes are on the network is pretty important for those kind of changes and that kind of planning. 

**Marshall** - So moreso like a status page for the nodes. I think there was a grant, something like Observatory or one of their early projects that was doing a form of this. Maybe we restart those conversations, having a board like that would be extremely useful it's been on the wishlist for a while and I think other folks have tried with just node counts and they're not as useful, they don't really tell the whole tale. 


**Daira** [31:33] - We really should be more organised about this because we might get an attacker who actually knows what they're doing. 


**Teor**[32:19] - Would you mind if I shared my screen and showed what the Tor metrics looked like? (https://metrics.torproject.org/torperf.html)

So to give you an idea, probably the most similar metric that Tor has is the number of relays, the number of servers that are involved in maintaining the network. They started with this graph and went on to add about 10 different varieties of different graphs which is easy to do once you have the initial data there. Something else that Tor does is user estimates but in a privacy preserving way. They have a number of different ways to look at that, this is by IP address by estimated and anonymized and there is also a way of estimating the number of users in the application section, thats by the number of downloads of the software. 

[33:55] - So the things we would have been looking at maybe useful in the last few weeks would be Traffic. So we wouldn't be looking at the amount of 'Data Transferred', we may be looking at the 'Number of Transactions' or the number of transactions of particular types. One of the features of these graphs is that they show over time. A lot of block explorer's just show very recent information. 
They had some researchers work on performance graphs adopted into the official metrics website were they look at the latency of in this case, downloading files, we might be looking at the latency of 'Fetching Blocks' or fetching other data. I could speak about specific metrics if people are particularly interested.  


**Steven** - That would be a great joint project or maybe could feed off the combination of observed metrics, maybe even test status we could expand it a bit. 

**Daira** - The other thing I would like a visualization of is Connectivity in the Zcash network. So there's been some research done on that before in Bitcoin but it's one of these things where the paper authors have their own software they dont publish and the results are not really reproducable. But if we had a live display of that, that would be really interesting. 

**Str4d** [36:30] - We've talked before about using something like Privio or one of those kinds of things to collect those metrics in a way full nodes can opt into providing that kind of data but as with everything it's the time. A lot of those libraries were early in their deployments and lifecycles whereas now we have pretty wide scale big tech company production deployments of these private metrics systems. It's likely easier to do that setup and integration now than it was 3-4 years ago. 

**Daira** - It is but also there are some things that don't need to block on that because if you're just displaying some view of the network that an attacker would have anyway I don't see any big privacy problem with doing that. 


**Teor** [37:45] - So two jobs ago I was working on privacy preserving statistics for Tor and there were definitely some statistics like bandwidth amount, because those were triggered by users we wanted to hide and other statistics like the number of nodes which is publically available on the network so the privacy constraints are much lower. 

**Str4d** - The number of nodes would be fine, the ways in which nodes are connected is more the sort of thing I'd want to be careful about. 

**Daira** - Even if it is in principle public information, you don't want to make it too easy for an attacker. 

**Steven** - Good seeing everyone again, thanks for all the comments and input. 

___


### Attendees


+ Conrado 

+ Daira 

+ Dodger 

+ Str4d

+ Marshall

+ Deirdre

+ Gustavo Valverde

+ Teor

+ Winfred Mandela

+ Jason Mcgee

+ Daniel Wolande

+ Taylor Hornby

+ Pacu ECC

+ Ying Tong

+ Michael Harms 

+ Charlie O'Keefe

+ Han Lin

+ Marek

+ Kris

+ The Geffen


___

**Next Meeting Scheduled For: July 14, 2022 08:00 AM PST**




