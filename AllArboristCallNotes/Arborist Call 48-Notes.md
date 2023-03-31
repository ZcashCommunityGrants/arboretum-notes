# Arborist Call #48 Notes

Meeting Date/Time: March 23rd 2023, 22:30 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status - [Zebra Update](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2048-Notes.md#1-zebrad-updates---zebra-updates)

+ ECC Core Update - [Zcashd Status](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2048-Notes.md#2-ecc-core-updates---zcashd-status)

+ Research & Implementation Update - [Network Monitoring](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2048-Notes.md#3-research--implementation-updates-i-network-monitoring) / [Node Statistics](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2048-Notes.md#3-research--implementation-updates-ii-node-statistics)
    


Video of the meeting: [recording](https://www.youtube.com/watch?v=k9bd3KCUoNs)



Moderator: Dodger

Notes: Jason Rogers

## Decisions & Action Items


i) Look at address manager code with Ziggurat team 

ii) Set up call with ECC infrastructure team around open sourcing monitoring & alerts 

___



## Full Notes



### 1. Zebrad Updates - Zebra updates

[00:00] - **Teor**

Hi i am Teor, i am the current Zebra Team lead. Its been a bit of a quiet few weeks for Zebra. We did some work on hardening Zebra's network protocol implementation in response to the Halborn disclosures. We weren't directly impacted but we did choose to do some hardening of similar minor issues in our implementation. 

[04:15]

Its one of the advantages of having a completely different network stack is that we aren't always affected by the same bugs. We updated the version incremental merkle tree to fix some minor halo 2 proof issues on 32bit platforms. The orchard update is pending. Just so you know, zebra at the moment doesn't work when its compiled on beta or nightly rust, but we are looking forward to those fixed versions of orchard once it's available. 

[05:08]

We've mainly been working on our Zebra audit for the last few weeks. We've been triaging the issues given to us by the auditors and starting work on some fixes so far things are going really well. We have continued to do a bit of work in the background on our mining feature where mining pools can use zebra to mine blocks. That's about it for the Zebra update. Any questions?

[05:37] - **Dodger**

A similar question from me, have there been any major issues discovered as part of the audit?

[05:58] - **Teor**

No, currently we are looking at issues which are low or informational priority. These are things that take very unusual circumstances in order to be a problem, or things that we just noticed in the code we might want to reconsider. That's where we are at at the moment. The auditors are moving onto more recent features in the code soon so we'll see how we go with those. 



___


### 2. ECC Core Updates - Zcashd Status


[08:05] - **Daira**

There was a security issue that is now fully disclosed. Basically a denial of service via memory exhaustion and we put out a [blog post](https://electriccoin.co/blog/new-releases-remediate-memory-exhaustion-vulnerability-in-zcash/) about that. The security company that found it, halborn also put out a [post](https://www.halborn.com/blog/post/halborn-discovers-zero-day-impacting-dogecoin-and-280-networks) about it. 

[08:34]

A lot of our work over the past few weeks has been to mitigate that. The disclosure process ended up taking a lot more time than we originally thought it would. Since then we've been working on getting the dependencies of zcashd in shape. We've made some changes to the ff, finite field crate in order to fix bugs on 32 bit platforms. Those dependencies have to all be rolled up into zcashd. I've been working on the ZIP-317 block construction implementation for zcashd, that's going well. Just making the tests pass after implementing that. Can anyone think of anything else?

[09:52] - **Kris**

There's a bunch else. We've just merged a major refactoring to the internals of the zcashd wallet for transaction construction. That's going to make it so that whereas we previously had 4 different implementations of transaction construction in zcashd wallet, we will now have one. That's going to then make orchard and unified addresses usable in z_mergetoaddress and z_shieldcoinbase in addition to z_sendmany. 

[10:24]

We also have just merged the new implementation of our sharded note commitment tree that we're going to be using for fast updates in the mobile wallets. There's been a significant cascade of updates through the librustzcash stack including merging significant type safety refactor for all of the sapling code of the rust crates. So all of that has landed in the last 2 weeks since we stopped being quite so distracted by the mitigation of the Halborn disclosure. 


___


### 3. Research & Implementation Updates i) Network Monitoring


[12:15] - **Teor**

This was a discussion we had that was also related to the transaction spam we've been seeing and detecting similar attacks like that ealier in the network. Inside the Zcash Foundation we had a brainstorm and prioritised the kinds of features & thought about how maybe we could work together with the rest of the community to do some better monitoring. 

[12:53]

I know that other cryptocurrency networks and other distributed systems have monitoring on things like the number of nodes which we currently do. But also monitoring on things like the volume of network traffic or whether there's a chain fork or whether, this is very vague i understand, whether bad things are happening. So, censorship of the protocol or big transactions or big blocks, packetstorms, those kinds of things. 

[13:30]

Those were the kinds of things we were talking about and we were wondering what the next steps would be to make progress so the next time there were network issues we could pick up on them quickly and diagnose them affectively & work towards a solution faster. 

[13:52] - **Dodger**

For this topic we've invited the equilibrium folks who are behind the Ziggurat project to join us. I appreciate Ziggurat is not necessarily directly about network monitoring but it's the closest thing we have at the moment thats active. 

[14:21] - **Mark Henderson**

it's adjacent to network monitoring i would say. The best way to talk about our project is just to go over our recent [deliverable we recently submitted to the zcash forums](https://forum.zcashcommunity.com/t/ziggurat-3-0/43350/17). That's also the closest thing to what we're talking about here.

[14:37]

That was a handful of network crawler updates that led to 2 main new features which is a network visualizer, it's not a real time thing, its a snapshot of the network at a certain time when we run the crawler, pass it through the data analysis tool and then output something for the visualizer to consume & display. That process takes hours, you can let it run for as long as you want but its snapshot based. 

[15:12]

It looks cool its 3D, its a webgpu kind of thing. The other is this idea of intelligent peer sharing. The crawler instead of being passive, we theorised a thing & tested it out on our data. Kind of like a back test but not quite so financial and the crawler carries with it a set of peers we think are good and reliable and can churn through the existing peers and fix island formation, narrow your betweenness metrics, narrow your degrees of separation, make the network a little bit more resilient & a little less susceptible to targeting one central node and harming the whole thing. 

[16:07]

Our results were pretty promising. We've not unleashed anything on mainnet yet, don't worry. We might soon. Moving from something like thist that is snapshot based to real-time is something we haven't thought about scoping yet at all but something like that could be pretty cool. We are able to intercept background radiation from the network as well so that may be a distant early warning of malicious behaviour. Getting a lot of the same messages from the same node. 

[17:04]

On our early tests last year we found there was a command string that was unrecognised by the network protocol that was getting tossed around. Nothing alarming but it was odd. This random set of bytes that was getting floated out there. That's the background of what we do. I don't think there's a crawler running right now but I could be wrong, I think its dormant at the moment. 

[17:43] - **Daira**

That random byte string, that was after a peer had successfully negotiated or was it during the handshake?

[17:53] - **Mark Henderson**

I believe it was after the handshake. I pasted the byte string in the chat if you're curious. I have to double check, our nodes don't indicate when it happened in the lifecycle of the connection but we saw that. We saw it a lot. Maybe somebody more familiar with it & more sleuthy can investigate.

[18:30] - **Kris**

In terms of the network protocol, are you dealing with the fact that the firo seems to trespass on the Zcash network protocol. Have you addressed how to separate out those nodes?

[18:59] - **Mark Henderson**

No. We have the reported node version, we have the reported network protocol version that its using. Those seem extremely easy to spoof. Correct me if i'm wrong Piotr but I don't think we've done any detection on counterfeit or imposter nodes or anything like that. 

[19:25] - **Piotr Olszewski**

We are now passively gathering information from the network. 

[19:36] - **Teor**

I was about to ask the same question as Kris. When you do your reducing islands, I guess some of these islands are meant to be because they're different networks. I am wondering if you check the versions of the nodes before you try to merge them together into the same network?

[20:16] - **Piotr Olszewski**

The crawler is going only through the good nodes from the one network. So we are checking if there are no reported nodes from this network that are disconnected or we have any nodes that when removed, when its possible to affect that node and remove it from the network. We check if that node wouldn't split the network into some island and propose new connections for 'hot nodes' that can omit this node & give network confidence that even if that node or any other bridging nodes, we dont have any islands after that. 

[21:09] - **Teor**

The question i'm asking is, there are actually different cryptocurrencies using this same protocol. For example that version, i cant remember the name of the network, those are not Zcash and then there are different splits where Zcash nodes have remained on the canopy upgrade or the sapling upgrade or something like that. These are all meant to be separate networks because they're actually different cryptocurrencies. So do you take that into account when you try and merge the networks together?

[22:05] - **Piotr Olszewski**

When we find a network that is somehow bigger and is not connected anyhow to the existing network, we stop merging and we thought it should be done manually by the users so we are notifying the user that we found something strange, some disconnected nodes and its not doing it automatically. 

[22:37] - **Dodger**

Daira, did you remember the name of the cryptocurrency thats using the same network magic?

[22:44] - **Daira**

Not off hand, I can look it up for you now. 

[22:48] - **Kris**

The one that has about 6000 nodes, the one that has magicbean 6.1.0, thats FIRO. 

[23:14] - **Dodger**

These guys forked, or however they did it used the same network magic as Zcash. This blockchain node explorer looks at what it perceives to be the Zcash network and says there's nearly 7000 nodes but in fact those are all a separate cryptocurrency. I'm pretty sure, did they start at magicbean 6.0.0?

[24:03] - **Daira**

Yeah, they do in practice have larger [user agent version] numbers and always have done. They're obviously deliberately copying our strings because its not a direct fork but it was deliberately launched at the same time and their marketing exploited confusion between the two networks. Its annoying. 

[24:50] - **Nate**

This is slightly a tangent from monitoring but would it be feasible introduce a network protocol change that would be backwards incompatible. We would need to do it safely to migrate legitimate Zcash nodes but the goal would be to prevent this issue. Knock off nodes that happen to be similar. I guess there is the easy version, knocking off nodes that aren't trying hard to accidentally connect to the same protocol & maybe the harder version which might be impossible using consensus which is knock off nodes which are malicious. 

[25:43]

So there's the easy version which might just be change the peer protocol around the handshake in some manner that will knock off nodes that aren't intentionally trying to join the Zcash network. 

[25:56] - **Daira**

So the question is, is the easy version possible to do incompatibly without too much disruption, the answer is yes. I kind of think it's a bit of a distraction from other things that we need to do but if that was prioritised, if ECC management decides it was important then we could do it. 

[26:45] - **Dodger**

Has ECC done any brainstorming or thinking about what sort of things we would want to monitor?

[26:55] - **Nate**

As we were working through this latest incident response, we have our own internal network monitoring and of course we were observing that but i don't know if our teams have had any brainstorming on this one but it does feel really important to me to have better public & shared monitoring. One thing we might do, i haven't shared this at all with our team so i'm not sure if there's blockers but maybe we can get our infrastructure team to start open sourcing more of the tooling we are using so at least others can set up their own with our open-source.

[27:47]

That feels like it would be the lowest hanging fruit of a way we could contribute but I am not aware of active discussions about that right now. How about you Daira or Kris, did I miss those discussions or have we not had them yet?

[28:07] - **Daira**

Apart from the discussion in the retro for the Halborn bug, we have talked about it in the past and we have some scattered notes about it but those need bringing together and comparing with what Ziggurat is implementing, so that we don't do redundant work. 

[28:34] - **Dodger**

I think of Ziggurat as almost network analysis. So obviously the testing and network analysis whereas this is actually i feel a slightly different thing. For example if we want to know when a whole bunch of nodes drop off we need to be monitoring and snapshotting it on an ongoing basis & then graphing if there is significant delta. 

[29:02] - **Daira**

We do have that monitoring. For the nodes that we run. 

[29:10] - **Nate**

That includes alerting, so when various conditions occur people get notified. So that piece also would be good to get more open-source, more alerting. There might be some balance, sometimes it's good to have some of the monitoring or alerting be proprietary so that malicious folks don't know how to game that but in my opinion the best situation would be a lot of open-source monitoring and then multiple teams running monitoring. 

[29:45]

A fair amount of it can be open source, maybe some teams have some of their own proprietary alerting on top of that. That feels like it would be the most resilient. 

[29:58] - **Daira**

Can we show a screenshare of grafana to show people what we're currently monitoring or would we need to decide whether that should be public?

[30:18] - **Nate**

I don't know because I would prefer looping in people from the infrastructure team because I don't know if any of them are here because I don't want to suprise them. Maybe one good next step would be getting our infrastructure team in a room, maybe at a future or maybe just on a call with Ziggurat or anyone interested in this topic to share where we're at, what we have & what good next steps would be for collaboration. How does that sound?

[31:04] - **Piotr Olszewski**

When we are doing the IPS, we have noticed that some of the information would be useful to be maybe anonymously, get from the node using the protocol not the rpc because if we would like to propose new peers using IPS we could take into account the network usage, the packets that are going through the network interface of such node but we have no information right now so the performance is not taken into account of each node so there is possibility that we propose a new peer which is on the high load right now but we have no other possibility other than connect to this node and measure the time of the response. 

[32:17] - **Dodger**

What you're talking about in terms of being able to suggest new peers in order to improve the connectivity or shape of the network, i that some capability that could potentially be plugged into a DNS seeder? So that when a new node fires up and connects to the DNS seeder the peers that it is given or suggested by the DNS seeder are better ones than whatever the selection process is today?

[33:07] - **Teor**

I think that'd be really helpful from a security perspective because if for example we know there are these reasonably isolated sets of nodes and then what you do is send at least one node from each of those set as your DNS seed, what happens is, the new node if any of those isolated sets have fallen behind then you know it has the best chance to find the best chain but also the new node will help gossip peers between those isolated sets as well. So i think it could work well on 2 different levels. I think that's a good kind of logic to have in your DNS seeder anyway. 

[34:27]

The DNS seeder is a cool idea I think thats possible as well. I don't know about the time to live records might complicate things, to make it bespoke for each node that connects but something like that could be possible I think. 

[34:48] - **Daira**

Yeah because the DNS seeds are global to the network so if you're trying to actively shape the network that would be tricky. Arguably you shouldn't have full control over shaping a nodes view of the network because thats also an attack. 

[35:17] - **Mark Henderson**

Everything the Ziggurat team builds is one step away from being a weapon, its really nerve racking. 

[35:28] - **Dodger**

Dual use technology. 

[35:30] - **Mark Henderson**

Exactly, like in many things. 

[35:37] - **Dodger**

You said you wanted a briefing on that piggybacking thing?

[35:44] - **Mark Henderson**

It doesn't need to be right now maybe on the discord I can hop on. Maybe one question i have is how do the nodes themselves differentiate between the network because you're sending block sharing messages, block height messages, if there's different cryptocurrencies how are the nodes themselves telling them apart?

[36:09] - **Daira**

When you look at network maps for example in the blockchair explorer, its not fully participating in the peer to peer protocol, its doing a handshake and if it gets past the handshake it counts that as a node. In practice Firo nodes will very quickly get banned by Zcash nodes. Because they would be sending messages that don't make sense for the Zcash chain. 

[36:48] - **Mark Henderson**

So the stats we are seeing are just the rpc reporting back what connection it is?

[36:55] - **Daira**

I don't know what software blockchair is using to get those stats at all. I don' think they're running a fully synced node because if they were then they wouldn't be seeing that count. 

[37:12] - **Mark Henderson**

The good thing about our crawler and most of our work is we're traversing the network via the network protocol itself so we are doing handshakes to nodes before moving on to other nodes and getting their peer lists & things like that. So i think a lot of the data you're seeing from us is not Firo data, i think. Its hard to tell them apart based on preliminary contact with the nodes but I think we're looking at the Zcash network when you're looking at the screenshots. 

[37:50] - **Dodger**

How many nodes do you guys see on the Zcash network?

[37:55] - **Piotr Olszewski**

Its about 6000. 

[38:00] - **Dodger**

In this list of node versions, magicbean is the name of zcashd but zcashd's latest version is 5.4.2. So anything that has a version number starting with 6 is this other cryptocurrency Firo. 

[38:32] - **Piotr Olszewski**

I am wondering because if the correct Zcash nodes ban those nodes that are connected from different cryptocurrencies, they also shouldn't advertise their addresses as peers to our crawler. 

[38:49] - **Daira**

That is true. 

[38:59] - **Piotr Olszewski**

Because we start our crawler with some seed and get using the get addr message. I believe if we are receiving from the Zcash node some peers they are the correct peers. 

[39:14] - **Daira**

We'd have to have a look at the address manager code to see whether we should actually be excluding those nodes from the address manager more quickly and not advertising them. Its a good point. 

[39:31] - **Piotr Olszewski**

Because i analysed the crawler results from the last week and all the nodes have some connections to all of the nodes reported so we haven't any island detected so each node reported connection to some other nodes and we haven't any node that hasn't any connection. 

[40:00] - **Daira**

It could be that we're underestimating the size of the actual Zcash network. Thats possible. 

[40:06] - **Mark Henderson**

I've got to agree with Nate in the chat that perhaps 6000 is too high and includes Firo nodes but 100 seems exceedingly low. 

[40:18] - **Daira**

Remember we've just released 2 hotfix releases so the version distribution is not as concentrated as it would normally be. 

[40:36] - **Dodger**

Traditionally during discussions on previous Arborist calls, the number that everybody seems to agree on is 200-220 nodes on the Zcash network which does sound perhaps low but bear in mind we have a lot of lightwallet users. 

[41:03] - **Daira**

And we also have the end of service halt policy that on other networks they have lots of nodes that are very out of date and we just dont have those nodes [that would be out of date]. 

[41:18] - **Dodger**

When you look at a list like this anything magicbean 6.0.0 you can ignore, magicbean 5.4 should be by far the most common and 5.3 is still a currently supported version isn't it?

[41:48] - **Daira**

5.3.1 & 5.3.2 are about to end of service halt. Also everything below 5.0.0 is pre-NU5 and also not following consensus. 

[42:06] - **Teor**

Zebra has a different network stack so our band logic is different to zcashd's. One of the things that could be happening is that Zebra could be connecting between these networks and gossiping their addresses back and forth. Its also possible that both Zebra & Zcashd are gossiping the addresses before they've had time to reject them or a third possibility is that one of the seed peers in Ziggurat is actually from Firo and therefore you'd be looking up those networks as well. 


___


### 3. Research & Implementation Updates ii) Node Statistics

[42:47]

The question i was really interested in asking is how do you know when two nodes are connected to each other? How do you work that out in Ziggurat?

[42:59] - **Piotr Olszewski**

We are sending the getaddress message and the node either outputs the address with up to 1000 peers. I've looked into Zcash code and i know that there are some other things that the node should be connected within 3 hours, it behaved alright, we are assuming if we are recieving the peer address in the other addr message that's alright and this is a peer that's connected to that node. We are adding it to the list and trying to connect it & checking if its good. 

[43:39]

If its good we are connecting it and making handshake we are adding it to the list and sending a message take a response and the nodes we cannot connect we are not adding it to the network because we thought they are down and we are moving on only with the good nodes. 

[44:02] - **Daira**

So a Zcashd node by default has a peer connection limit of 125 peers. If its sending you more than that in the address message, it's sending you IP addresses that it knows about or have ever connected to it but is not necessarily still connected to. 

[44:35] - **Teor**

In Zebra we'll send through addresses which we've got through from other nodes that haven't expired yet. So another node has told us "yes we know about this address". We'll send that through before we've connected to it ourselves and the reason we implemented it that way is say for example, a Zebra node that only has an ipv4 connection, we wanted it to be able to gossip ipv6 addresses even if it couldn't connect to it. So it'll gossip those ipv6 address for a few hours after it gets them or until its managed to check if it can connect to them and then it'll stop sending them. 

[45:27]

So i think your connectivity is a "could possibly be connected" metric not an "is connect/has been connected" metric.

[45:40] - **Daira**

Yeah that's why i am thinking maybe we should make that more strict but we'd have to think about what the possible side effects of that are because I don't think we only want to gossip ip addresses that we've been connected to for a minimum length of time because it's potentially more likely to create islands or avoid new nodes being gossiped. 

[46:22] - **Kris**

Could we do something perhaps with inventory messages? Getting inventory from the nodes the network observatory is connecting to so that we could get some sense of what chain they're following?

[46:35] - **Daira**

I think Sasha's seeder code uses some heuristics to tell whether it thinks a node is good so we should look at what thats doing and maybe include some of that in Zcashd. I don't know how much more it does than just doing a protocol negotiation. 

[47:09] - **Dodger**

Is it possible that the current DNS seeders will pass on inappropriate node addresses?

[47:18] - **Daira**

I think we try relatively hard to not do that. We certainly look at uptime, not sure how much more we look at than that. Str4d would know better but he's not on this call. 

[47:51] - **Teor**

One good way of getting an idea what chain nodes are following is to look at their block heights. Dodger if you could scroll up to that part of the page. You can see that theres one set of chains which is Firo at 1.3 million and theres another set at 2.2 million that obviously zcash. That might be one way of segregating the networks but it only works with nodes that are synced because zcash nodes also go through a temporary stage at about 1.3 million while they're syncing. 

[48:38] - **Daira**

Only the ones which are at 2026- something are fully synced zcash nodes. I think if you add up all of those you probably get a similar number to the looking at the number of nodes which have magicbean 5.x those look roughly the same order of magnitude. 

[49:26] - **Dodger**

Roughly yeah. 

[49:33] - **Kris**

A trivial filter would be just to start by filtering out and only report zebra and zcashd that we know should be currently active given our E.O.S halt rules. 

[49:53] - **Daira**

We allow nodes to not follow E.O.S halt but we also know that anything before 5.0 is not compatible with NU5. <-- this applies only to zcashd, not Zebra

[50:09] - **Mark Henderson**

Not to evangelise too much but it seems like something if we had a Firo detection algorithm or just a non-zcash algorithm is to deliver a set of ip addresses periodically to somebody as known Firo or Known non-Zcash nodes. I dont know if that's going to trickle up to blockchair, probably not. 

[50:40] - **Daira**

We have had some difficulty including things like supply metrics in getting these third parties to pay attention to accurate statistics. 

[50:56] - **Teor**

I can give you a very quick way to tell the difference most of the time. Thats the default port for Firo is 8168 which is not the same as Zcash network. There's a quick way to tell. 

[51:25] - **Mark Henderson**

You've got your looks, smells and quacks like a duck, you've got your port, the network protocol/node version and you've got the weird block height. If those aren't accurate then to some degree of confidence say its not a proper Zcash node. 

[51:50] - **Daira**

Bear in mind you can tell whether something is Zcashd from the user agent and you can tell whether its Zebra. There's nothing to stop there being other  consensus compatible with Zcash nodes with different user agents.

[52:10] - **Mark Henderson**

I would imagine we would do more thorough with the actual network protocol messaging post handshake a lot of stuff needs to happen to be zcash. 

[52:20] - **Daira**

Dodger I'm thinking mainly of forks of zcashd or Zebra rather than other implementations of which there aren't any as far as we know. 

[52:34] - **Dodger**

I wonder if some of these what look like very old versions of zcashd are potentially pieces of software that are maintained by miners or exchanges or something like that and they just haven't bothered. They may be pulling in updates from what they consider to be upstream but they just haven't updated the version number.

[53:07] - **Daira**

There used to be consensus compatible zcash nodes that had bitcore in the consensus string, as you can see there those have version numbers that mean they cannot possibly be a current version of zcashd or forked from one [without deliberately changing the number]. 

[53:49] - **Dodger**

Purely out of curiousity, what will ECC do when we go to version 6 of zcashd?

[54:01] - **Daira**

That could be an incentive to fix this before then.

[54:10] - **Dodger**

Or change the user agent. One option would be to change it to something that includes zcash because zcash itself is trademarked. It would be a mechanism to discourage people from abusing it. 

[54:32] - **Daira**

Remember there are interoperability provisions in copyright & trademarks law for example in europe you cannot prevent someone from using a protocol element that they need in order to be compatible, even if its a trademark. 

[54:51] - **Dodger**

In this case though Firo clearly aren't compatible with Zcash right? Its one potential option. Nate it sounds like next steps would be to arrange a call with ECC's infrastructure folks to talk about this more. Do you want to do that on a Arborist call or do you think it should be a separate thing?

[55:45] - **Nate**

I should talk to them first and see what they're up for. One thing to note is we are highly focused on addressing the mobile lightwallet performance issues. We are trying not to get distracted from that for a while, so maybe another month or so. I'm not sure how distracting this conversation would be but I just want to be sensitive to their time. I'll go ask them and i'll get back to you all. 

[56:34] - **Dodger**

At the risk of going off on a tangent how is the work on the wallet performance issues going?

[56:41] - **Nate**

We have been making good progress on the engineering front but we haven't been good at communicating about it and we've seen more and more people asking whats going on so we're definitely going to start improving the communications about that. We plan to have a blog post imminently that describes all of the different efforts we're doing and the timeline we have for those efforts so hopefully that will answer a lot of peoples questions. 

[57:17] - **Dodger**

Should we add a slot in this calls agenda for a place on that stuff?

[57:28] - **Nate**

I think thats a good idea but let me check with the people working on that but i think it would be a good idea to just have regular updates on it because its an urgent issue. 

[57:48] - **Dodger**

Back to the original topic of network monitoring, hopefully Mark and Piotr have given you guys a little bit of useful information and will maybe help spark some ideas and hopefully we can get a meeting setup to discuss some of this.

[58:20] - **Daira**

Do you have access to the R&D discord?

[58:20] - **Mark Henderson**

Yes, thank you. We'll probably plan to jump onto one of these calls and updating you on what we've learned and what we've changed in our crawler and things like that. We definitely already have some ideas, its great.

[58:41] - **Dodger**

I think it'd be great as and when you guys are ready to do a demo sort of thing that'd be great to do as well.

_____

### Attendees


+ AryaSolhi

+ John Bruhling

+ Kris Nuttycombe 

+ Daira Emma Hopwood

+ Mark Henderson

+ Michael Harms

+ Nate_ZEC

+ Pacu ECC

+ Piotr Olszewski

+ Teor (they/them)

+ Taylor Hornby

+ Zero Dartz

+ C T


**Next Meeting Scheduled: 15:00 UTC April 6th 2023**


___
___

