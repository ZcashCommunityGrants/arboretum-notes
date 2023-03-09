# Arborist Call #47 Notes

Meeting Date/Time: March 9th 2023, 15:00 UTC

Meeting Duration: 1 hour 25 minutes


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status 

+ FROST Status 

+ ECC Core Update

+ Research & Implementation Update
    
+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://gateway.pinata.cloud/ipfs/QmYPjMEUv1EDJ4KjSHEy36HwHT7CzF5FEtnURGhs8q6Bcw)

Moderator: Ian Sagstetter

Notes: Jason Rogers




## Full Notes



### 1. Zebrad Updates - Zebra Test Mining 

[00:00] - **Pili**

Hi everyone, I am Pili the engineering manager at the Zcash Foundation I am here to give you an update of where we are as of today. We finished basic implementations of mining features in Zebra. A number of the team have been reaching out to mining pools trying to find out who's interested in testing & supporting them if necessary. 

[04:42]

If anyone listening is running a mining pool or is a solo miner and is interested in testing Zebra for mining please let us know and we can assigned to guide and support you if necessary. Other than that in the past few weeks and this week we've had a 20% time break. 

[05:08]

We've had the team working on projects related to Zebra that they want to work on. We are going to be releasing a number of blog posts in the coming weeks on what the outcomes of those projects have been. Finally we have just received the 1st update from the team that is doing the audit on Zebra. We have started to create issues based on the findings. If anyone is interested keep an eye out for those. 



___


### 2. ECC Core Updates - Orchard Circuit Layout bug / ZIP-317 support

[05:54] - **Jack Grigg**

The main thing we've been continuing on with is initial preps for DAGSync. The main tasks at the moment are getting through and reviewing all the precursor work in the incremental merkel tree crate. We also did some work around an issue that had been found in 32 bit usage of halo 2 for orchard proofs. There was an issue in terms of how the circuit was getting laid out. 

[07:05]

We've finished resolving that issue, the various branches - we've got a couple of crates to publish further down the stack and once thats done then that fix will be rolled through into the next series of Zcash rust crate updates. Specifically Zcash primitives 0.11 & crates related to that will contain those changes. 

[07:41]

Anyone who is downstream-depending on them, the mobilesdk's Ywallet, Zingo wallet etc. that are somewhere downstream from our rust crates. I believe the common depends is the orchard crate, the next release of the orchard crate will have those fixes in it.

[08:08] - **Daira**

That affected 32 bit platforms and also would affect newer versions of rust. I think it's 1.69 and later.

[08:17] - **Jack Grigg**

1.70 i think is the one it would land it. Because it was in the changes that then got in the beta around the 1.69 release so there's a delay through there. I think its 1.70 onwards. 

[08:30] - **Daira**

I thought I tested it and it didn't work in 1.69. 

[08:35] - **Jack Grigg**

Okay it might've been 1.69 then. In any case the point is any rust version from 1.56, on through there was fine but the newest stable version would have affected 64 bit platforms as well. We are basically about done with that. The main things there are that it will also come in with the latest updates to some of the underlying crates. So we are at the moment waiting on the next reddsa release which will then also filter into that same orchard crate release. 

[09:09] - **Nathan**

When I had heard about this I was concerned about the potential for impacting consensus. The platforms that were affected, if those were doing consensus validation, would that have been a potential consensus bug?

[09:38] - **Jack Grigg**

In theory, yes. However the specific problem was that a part of the layout within the circuit logic was depended on some unstable behaviour of an unstable sort function. So the effect of that was if there was a change there, it would result in a different verifying key. Unlike sapling & sprout the verifying keys for orchard can get derived on the fly which is an advantage because we don't need to download these fixed parameters, we don't have the trusted setup & that we can easily roll out changes if we need to in network upgrades. 

[10:23]

But there is still a consensus issue of people need to agree of what those verifying keys are. So what would've happened if anyone had encountered this problem is that the moment the very first orchard transaction ended up on the main chain months ago, a split would've occurred. A very noisy split at that because no orchard transaction valid on one side would be considered valid on the other. 

[10:50]

It's not like if there were a hypothetical problem in the circuit where it was unconstraining for instance & allowing more witnesses to be considered valid than intended, that would be a significantly more problematic split. In this case its essentially a mutually incompatible change. The fact that no one had observed this until now is a very strong indicator that there is no consensus problem here because nobody runs consensus nodes on 32 bit platforms. 

[11:31]

The only time we had observed this thus far had been in either the 32 bit wallet. I think was an android device or as Daira said more recently a change in the rust compiler. That would have also been noisy because the moment we tried to upgrade because Zcashd we keep it on as close to latest rust as we can the moment we had tried to upgrade to latest rust we would've encountered the problem as well. 

[12:10] - **Daira**

It would've failed tests. 

[12:20]

Yeah, so it would not have made it out into a Zcashd release. 

[12:21] - **Nathan**

Just one other claryfing question. It did affect proving on specific platform that was discovered by a wallet right? If proofs dont match consensus validation thats safe for consensus it's just bad for that wallet and its just to fix that bug & thats what we've done. 

[12:39] - **Jack Grigg**

The effect of it is the users of those particular wallets who have funds in an orchard address were unable to spend those funds because the transactions they were creating were considered invalid but there was no loss of funds issue. Once the wallet upgrades to a version that is able to create proofs again they will be able to continue spending funds. 

[13:07] - **Kris**

The other thing I wanted to mention for core team is we are almost complete with a major overhaul of the internals of the Zcashd wallet in terms of how it goes about constructing transactions and that is going to also roll out in the next release that is going to include support for ZIP-317 in the Zcashd wallet. We are also working through the last bits of ZIP-317 support for the Zcash miner block construction code. Thats all going to be coming soon in 5.5.0. 

[13:48] - **Jack Grigg**

Just looking through the final reviews of those pieces. I think thats everything. 


___


### 3. Research & Implementation Updates i) FROST update

[14:06] - **Conrado**

About FROST, we went through another round of review for the rfc. It's in the final stage of approval, hopefully and received our review from the CFRG  chair. It was a good review mostly about editorial issues that we are addressing. Hopefully we will get everything fixed this week. Then we can hopefully proceed to the next step of the approval pipeline and get the rfc approved soon. 

[14:59]

Regarding implementation, Natalie has been working mostly with adding support for recovering shares in FROST. So if someone loses their share you can reach out for the other participants and they can help the participant recover the share which is a very useful feature. 

[15:30]

This works by this participant reaching out to the other participants and there is a protocol that is run and they help this participant recover their share. Of course you need to reach out to at least the threshold of signers to help recover the share but its done in a way where you dont actually need to recreate the entire secret. You just recreate the share that was lost. 

[16:12] - **Daira**

Thats very neat. 

[16:17] - **Conrado**

Also in parallel we are planning the work to do a demo for FROST. A program that allows you to actually create shares and do the signing. Both for us to verify if the flow of using FROST is good. If theres anything missing. Its also to serve as an example for developers to use FROST. We are also planning recommendations of broadcast channel which is something that is required for the key generation both in the trust dealer generation when the distributed key generation. 

[17:03]

You need this broadcast channel, there's a whole thing - multi party communication and it seems there isn't a straightforward implementation of it so we are working on that also but we are on the planning stage for that. 


___


### 3. Research & Implementation Updates ii) ZSA update


[17:32] - **Nathan**

The only update is i've spent a lot of time talking to people about where their day-sync forum would be so it sounds like the best candidates would be the Zcash Community forum or potentially Github discussions. I haven't used Github discussions very much so if people have opinions on that let me know. 

[18:05] - **Daira**

There will also be an update of the Zcash protocol spec & ZIP-216. Mainly to indicate it is possible to apply ZIP-216 respectively. This is the fix for canonical point representations & some of the minor fixes mainly to sapling in the protocol specification. 

[19:02] - **Vivek**

I have a quick update from QEDIT. Basically we've been having the meetings to finalise the ZIPs I think that has been making decent progress. We did some internal backend changes to the asset identifier, the way it was defined. There has been some slight renaming of the thing which has been completed in the ZIPs now. We discussed about how we do the derivation of the issuance keys, we are now following the procedure thats done in ZIP-32 - analogous to the orchard key generation but completely independent in that it's not connected to the orchard keys anymore. 

[20:01]

One of the other issues was the split note discussion. We wanted to use the split notes for the ZEC notes as well instead of using dummy notes but I think there were some possible issues we had to check whether it was fine to do so. That's one of the pending issues. 

[20:27] - **Daira**

I was going to review that and I just haven't had time. 

[20:34] - **Vivek**

On the implementation side we've been doing work on the circuit side of things. The most recent effort there has been on implementing variable based scalar multiplication for the value commitments. Earlier the value commitments were with a fixed base but now we need different bases for different asset identifiers. Thats the major thing going on the circuit side. On the client side we've added issuance rpc commands and the changes that we made for the asset identifiers for the asset base we've included on the client side. 

[21:23]

On the other hand for future directions - at qedit we've been thinking and trying to work out details for a continuation proposal for ZSAs maybe including atomic swaps and the other NU6 stuff I posted some of these ideas a couple of months back in the forum. Hopefully we will have something more concrete to show you all soon. 


____


### 4. Open Discussion i) - ZIP 317 timeline 

[22:48] - **Daira**

On the subject of Zcon4 and particularly covid precautions for Zcon4. Do we have any information about what those will be?

[22:56] - **Jack Gavigan**

No

[23:26] - **Adi**

ETA on the Zcashd 5.5.0?

[23:37] - **Jack Grigg**

That's likely to be 3-4 weeks away I think. If you look on the [developer DAG](https://zcash.github.io/developers/zcash-core-dag) you can find the release 5.5.0 node within the dag. Everything upstream of that is the stuff that we currently aim to get into 5.5.0. You can see the halo 2 32 bit fix that I mentioned and the ZIP 317 stuff going in. 

[24:28]

Essentially, the moment we've done all of that is when we plan that release to go out. Currently we are expecting that to be 3 or 4 weeks from now. 


____


### 4. Open Discussion ii) - FROST demo / ECC integration of frost


[24:45]

I had a brief question about the frost crates themselves. Conrado I know you had said yourself in the discord you are planning a release of that side soon. Wondering what the current status overall is of them in terms of, will that be basic Type support or are they getting close to people using these in downstream systems.

[25:20] - **Deirdre**

Yeah we just pushed core and rerandomise half an hour ago. Every frost thing is going to be 0.1.0, even though they've been in various forms of development for well over a year. Mostly because the spec is not finalised. We do not foresee any major code changes to affect the api or any significant changes underneath the api level from editorial. 

[26:07] - **Jack Grigg**

It's unliklely that will occur at this point. I was meaning more in terms of the network protocols. Are there any changes expected on that side in terms of what the frost crates implement or do the crates not currently implement those and just focus on what goes into the rfc?

[26:23] - **Deirdre**

Yes they are just focused on the rfc. The frost crates are the pure cryptography of creating signatures and creating keys to make signatures and verify them with. The stuff about "you need a broadcast channel to do DKG" is in a different area. Thats a different layer of the abstraction. We dont forsee the serialisation of these Types so when you are eventually putting them on the wire or on disk to significantly change out of any of the ietf updates.

[27:02] - **Conrado**

Just to be clear, the reason there is dependency is because we added support for rerandomised frost in reddsa for redjubjub and redpallas. But of course this is a work in progress since ZIP-312 is being reviewed, its not done yet. Its just a proof of concept, it's working but its not done yet. This feature is gated under frost feature which is disabled by default so users of reddsa shouldn't be affected but we had to publish the dependency in order to publish reddsa. 

[27:45] - **Jack Grigg**

That makes sense. So from our downstream perspective for the moment it is an experimental feature from the perspective of users of the reddsa crate & orchard etc. 

[28:05] - **Jack Gavigan**

On a related question, is ECC planning to implement FROST either in Zcashd or the upcoming ECC wallet?

[28:19] - **Jack Grigg**

Speaking to Zcashd, not at present. We have rpc inherited from bitcoin for doing transparent multisig and it would definitely be interesting to look at how to implement something similar for shielded. I suspect though with the way rpc's are set up it will be slightly more painful to use and i personally would advocate for that kind of thing to be done outside of Zcashd. 

[28:58]

If there were places where people wanted to be able to have one of the shares in Zcashd for whatever reason, then we can discuss that bridge when we come to it. Or in my case burn that bridge when we come to it. I suspect the thing we would want to figure out before then is something along the lines of the work I was doing years ago on partially created Zcash transactions PCZT's or something like that. A Zcash analogue to the the Partially Signed Bitcoin Transactions that bitcoin has moved towards for "how do you ship around things that are not actually typed as a transaction yet" to shift between things. 

[29:54]

Obviously frost solves this specifically for signatures but there's various other elements to add to the transaction to figure out before something would be suitable to go into Zcashd. But a bunch of this stuff could be implemented in separate binaries file more easily I think. 

[30:19] - **Jack Gavigan**

And in the new ECC Wallet?

[30:21] - **Nathan**

Just going to speak to that. The first version of the wallet is going to be super rudimentary. We are stripping down functionality as much as possible and having basics. What we would like to do is deploy it, see who uses it and start developing support for use cases in a more rigorous way. Using frost would be a potential if we identify a specific use case and work out the usability etc. for that. I would like to learn about what different user stories would be that would use frost. 

[31:18]

Its definitely something want to look into because we are especially interested in ways to remove sharp edges with respect to managing secrets and keys. So we are curious about things like social recovery. Its an area we want to explore but we have no specific plans on a roadmap. 

[31:48] - **Deirdre**

We would love to have conversations with anyone including either zcashd dev team or ECC new wallet team or anyone else about how to do frost which is just the signing part versus doing the key gen part which have different requirements on how to do them securely in practice. For depending on your deployment environment, just doing signing & leaving the key gen out of your application or your main wallet or something - or at least the first part being signing + second being more complicated key gen may be easier. 

[32:46]

If you do trusted key gen that is also slightly easier than the hard mode of DKG. Distributed Key Generation which requires some sort of broadcast channel to do it securely. For Zcash, for people with access to a blockchain you may have different options to do the attractive DKG ceremony than other parties who may not have that available & may need something like the broadcast channel toy that we're going to demonstrate as a way to do something like that. 

[33:23]

So please if you're interested please come talk to us people working on frost and we can help sus out what your limitations are, what your requirements are, what you have available to you as opposed to being like "go use our library - this is what you must do to do DKG" because that might not be true for you. 

[33:58] - **Nathan**

There is a community wallet developers meeting that meets every 2 weeks. I think it would be awesome if anyone wanted to give a presentation on what process is for all the wallet developers. I would definitely like to see that presentation too. 

[34:40] - **Jack Grigg**

Just because we are here and talking about it, one of the things i've really wanted for a while for Zcash is the ability to locally to do the same kind of 2fa that I do with my websites and an app I think does this nicely for Bitcoin is Casa. they have various things you can do and various ways you can set up but theirs is built around regular Bitcoin Multisig. 

[35:12]

The idea of - you don't need to worry about the DKG or broadcast medium because you are the dealer. When you set up your wallet or local device your device is the thing doing the dealing. Conceptually setting that up is a lot simpler to do because your medium is connecting to "this hardware wallet" or whatever your signing device is that you're tying it to. 

[35:44]

Then when you're doing signing you need 3 of 5 devices accessible to be able to spend funds in this thing. I would really like someone to pursue something like that as a usecase which gets away from the "i need to deal with some other party on the network". I think casa has that option of being a back up share as an emergency backup  but that's entirely within their ecosystem so you don't have to worry so much about doing DKG over the blockchain with arbitrary people. It simplifies the problem. 

[36:34] - **Deirdre**

That's kind of the standard recommended (easy mode) deployment of frost is a trusted keygen with dealer and then you hand them out however you hand them out. The only requirement is you make sure everyone can see the same commitments to your secret polynomial and then everyone can verify it. Thats slightly easier to do than the full multi-round DKG ceremony. 

[37:04]

You can hand those out as long as you can all see the same commitment and everyone can see that they're all seeing the same thing. 

[37:12] - **Jack Grigg**

For this kind of thing where your trust model is trusting the device you are setting this up on at the beginning but not necessarily trusting its security in future, that model seems fine. You could also if you wanted to secure it more - you could still run the DKG style thing between the hardware devices if you trusted the hardware devices more than the machine you set it up on. There are definitely levels to how paranoid one needs to be.

[37:41] - **zero dartz**

How is ZIP-317 going?

[37:55]

The short of it is that zcashd 5.5.0 release will have ZIP-317 block production and ZIP-317 fee selection in Zcashd's block generator and wallet. Once thats out we'll be looking on the mobile SDKs side at enabling it. Its deployed and ready on that side it just needs to be enabled. I think Zebra said on another call they already have their block production set up to do ZIP-317 and they don't have a wallet. So at 5.5.0 it should mean that all the pieces are in place. 

[38:59] - **Kris**

With respect to the mobile SDKs all of the pieces are in place for use of ZIP-317 it just needs to be enabled and for the wallets like zecwallet lite and ywallet that don't use the sdk directly, all of the pieces they would need to use to do ZIP-317 are available in librustzcash. They should be unlocked and if anyone has anything else that is needed they can let us know. 

____


### 4. Open Discussion iii) - Zebra Audit


[39:54] - **Deirdre**

We are starting our Zebra audit and one of our auditors before they started investing a lot of time in testing Zebra was asking about Zcash support or historical analysis of eclipse attacks on the network. I basically wanted to ask if the Zcashd team if they had previously done any analysis to whether we wanted to invest at a full Zcash network level about protecting, mitigating or doing any defence against these sort of network level eclipse attacks. Attackers segmenting parts of the network & isolating nodes. 

[40:47]

We basically wanted to remain compatible and as in line with the general behaviour of a compliant compatible Zcash full node so i wanted to ask about that sort of history, if there was anything you've looked at and rolled out or "it would be nice to do this but it would be too complex or complicated" or that sort of thing before we tell our auditors "go for it". Spends 3 weeks to set up a Zebrad testnet-in-a-box before we even know the history. 

[41:29] - **Daira**

Zcashd has some complicated code in the address manager to book its addresses by subnet essentially. It's a little more complicated than that. I honestly don't know how effective that stuff is, its stuff that accreted in Bitcoin core as they got attacked in various ways but Zcashd still has that. Do you implement anything like that in Zebra?

[42:05] - **Deirdre**

Not by subnet I think. We basically look at address behaviour of how they are connecting to us. But I dont think we have anything thats looking at just where the address is coming from. 

[42:32] - **Daira**

I haven't seen anything like that in the code. But like I say, I dont know how effective it is, the intuition is that if an attacker is coming from some subset of the ipv4 or ipv6 address space then you might want to prioritise disconnecting connections that are all coming from the same place if there are too many of them but its all a bit heuristic and i've never seen a design document that gives a clear rationale of all of the design decisions that were made there. 

[43:16] - **Jack Grigg**

It's definitely more upstream accumulated things. We also have our networking stack as upstreams accumulations as of somewhere between 0.11 & 0.12. So they will likely have a bunch of other things they have done to the network stack over the years that we also done have. We are not mitigation-less but there are likely things one could try and do. 

[43:47]

That being said we defintiely have an easier time against eclipse attacks than something like a pure p2p network because we have the shared global state of the chain which individual nodes will checkpoint and confirm they are getting the correct view. All you need is a single external connection beyond the eclipse to be able to reconnect to the main view again. It's not that we shouldn't think about it but we are likely a little more resilient in the face of that than pure DHT based p2p network for instance. 

[44:43] - **Daira**

For any auditing there's a tradeoff. If you look at any particular area in a lot of depth then what other things are you not spending your time on. It's up to you what you want to audit but my suggestion would be maybe other areas are a higher priority. If you have downtime and there's time you wanted to spend on it then I wouldn't think it would be a waste of time to be looking at if there are mitigations that zcashd currently implements that Zebra not implementing creates a detriment to. 

[45:44]

As opposed to necessarily, there are mitigations that neither Zcashd or Zebra implements that would help overall. I think that kind of thing would be useful, but whether it's useful for the audit you are specifically doing is a question for you. 

[45:56] - **Daira**

What kind of experience do these auditors have? Are they mainly on the cryptographic side or network protocols in general?

[46:04] - **Deirdre**

Little bit of both

[46:11] - **Daira**

Can you say what auditing firm it is?

[46:21] - **Deirdre**

NCC 

[46:22] - **Daira**

Good choice.

[46:25] - **Deirdre**

It's quite lovely because its like, you know a lot of this stuff but here's a completely new codebase. Tell us what we did wrong. 

[46:43] - **Jack Gavigan**

The mitigation that you guys mentioned of dropping peers that are on the same subnet. That seems to assume the attacker will be coming from the same subnet. 

[46:54] - **Jack Grigg**

It's not specifically dropping on the subnet. Daira gave a general overview. The key thing it's doing it actually terms them groups in the zcashd codebase. The heuristics for how the groups are defined and split up is significantly more than just an ipv4 subnet. I believe for instance where you learned an address from plays into it as well. 

[47:36]

One of the effects of this address management bucketing system is if you hear about an address from multiple different people more often you are more likely to try and connect to it. Because the fact you heard it from different sources - i think it still ends up in the same subgroup but the bucketing system will put it in more buckets you are more likely to come across it. The specific thing i am thinking of regarding outbound connections the node will not make more than one outbound connection to one particular grouping. 

[48:24]

A lot of that is because we don't want data coming from inbound connections to solely determine what our outbound connections are. 

[48:40] - **Daira**

That rule in particular does make sense and has a sound rationale. Anyone can pretend to be from anywhere in ipv4 & ipv6 but to the extent that the ISP's do egress filtering and stuff like that it does make a little bit more difficult for an attacker. 

[49:04] - **Jack Grigg**

At the end of the day if your node is the one who's choosing to connect out to something its the one that gets to choose why it connects out to them. You got the ip address from an addr message from a peer vs you got the address from a dns seeder vs you got the address from a hardcoded list the developers gave of some trustworthy nodes to start off with. I think Zcashd inherits all 3 of those approaches from Bitcoin. We do hardcode a couple of trusted nodes like mainnet.z.cash but purely as you reach out to this peer as a starting point and you will learn addr messages from that peer that you can then use to find other peers and so on. 

[49:49] - **Jack Gavigan**

It sounds like these protections are something we would want to implement in any new dns seeder doesn't it?

[49:55] - **Jack Grigg**

It is the kind of thing that even the existing dns seeder does. The existing dns seeder has a bunch of heuristics it uses before deciding to give out ip addresses and one of those is "it appears to be following the network protocol properly", it's checking that versions are compatible. Its checking that heights are compatible, that its online and behaving correctly over an extended period of time and stuff like that & you can put whatever additional heuristics into that dns seeder to try and filter out nodes that dont make sense to give out to general people to connect to. 

[50:36] - **Daira**

Thats largely a reliability thing rather than a security thing. Obviously an adversary can appear to be a perfectly compliant reliable node. 

[50:51] - **Jack Grigg**

I know the C dns seeder also buckets what it gives out so if you have a dns request coming in from a particular ip address it will give out the same set of ip's to you if you do repeat requests within a certain time window. So to limit the ability to enumerate the set of ip's that a seeder is aware of for instance. Again, a lot of these are heuristics and we don't know how well they work. They definitely don't hurt.

[51:33] - **Jack Gavigan**

This reminds me of an issue we had at a certain bank I worked with where there was discussion about disaster recovery approach and the fact that our primary and our alternate recovery site were in the same city raised the question of "what happens if the city is hit with a nuclear bomb?" Unless there's reason to believe that Zcash is particularly more vulnerable to these sort of attacks then we'll probably de-prioritise this for now and then maybe certainly think about it in the context of a new dns seeder. Maybe just stick as a future tech-debt thing to review how zcashd does and therefore if we should replicate this with Zebra at a future point. 

[52:37] - **Daira**

I wouldn't quite say that some of these mitigations don't necessarily hurt because it is a lot of code complexity. 

[52:51] - **Jack Grigg**

That is true. And the other aspect to consider is that some of this may timeout if there is a move to proof of stake that ends up being a move to some or all of a significantly different network protocol or a different network interaction setup may obviate some of those things or give us a whole new set of problems that we have to deal with in that context instead. 

____


### 4. Open Discussion iv) - Halo 2 documentation / PLONKish arithmetization 

[53:25] - **Deirdre**

I've got two other queries. I have a researcher who did some work. I said "could you do something like this for Zcash" they asked me questions "well does Zcash fund phd students?" So we have community grants, minor grants we have lots of grants floating around. I was wondering if those are the correct avenue to have a researcher look at the Zcash protocol as it currently stands and doing some sort of security analysis in the way they have done it for other work. 

[54:26]

Because I need them to get back to me is this one grad student for a year? is this one grad student for 6 months? Is this a minor grant size, is this a major grant size? I have a feeling it's slightly larger than a minor grant but slightly smaller than some of our major grants but I wanted to throw that out there if this is the appropriate avenue for some of this work to be done for Zcash. 

[54:57] - **Jack Gavigan**

I would say depending on how much they are looking for then minor grants bearing in mind the deadline is coming up in 11 days. Or Zcash community grants would be fine. I think a better starting point would be to post some ideas on the forum and see what sort of feedback you get. 

[55:29] - **Deirdre**

Okay I will guide them towards major grants and I will help try to guide a post in submission. They are based in europe so they would have to lean towards a major grant vs if they were in the US they would be able to patch together funding from minor grants and other things. The last one is I had another researcher who was asking about halo 2 and saying they would like to implement halo 2 in a formal specification language and they asked is there a halo 2 spec? The code and the book together, that counts as a spec. 

[56:15]

Is there any movement on that or anything that would help them try to re implement halo 2 so we can prove certain things about it in a different way. 

[56:31] - **Jack Grigg**

We do have that it's [section 4.2](https://zcash.github.io/halo2/design/protocol.html) of the book. The thing that has the security argument. That is the formal description of halo 2 - The proving system. Is that actually what they want to implement or is what they want to implement PLONKish?

[56:52] - **Deirdre**

Both. 

[57:02] - **Jack Gavigan**

So the formal description of the proving definitely abstracts over some of the details of the PLONKish representation. For those we would need to look. There is a description in the book i don't know exactly it matches what we implement but its reasonably close. 

[57:19] - **Daira**

Its not described to the same level of detail as the protocol spec does. If you wanted to do an independent implementation that is compatible with halo2 proofs its feasible. Its a lot of work and would require some reverse engineering. But I am happy to help anyone thats doing it and in addition to that there is an effort by Mary Maller and some of us to standardise plonkish and whether that ends up being interoperable with halo 2 thats currently implemented I am not sure. But it certainly would help and be of interest to the person doing that project. 

[58:38] - **Jack Grigg**

The way to frame it right now is if you want to be compatible with the halo 2 proving system as one might write in a paper then section 4.2 is the place to look at. That is the protocol description that matches the proving system that is deployed currently in Zcash. There are changes that will be made to it as part of recursion implementations etc. What we currently implement is described on that page. 

[59:07] - **Daira**

Modulo potential errors. I don't think anyone has reviewed it against the code to check that everything is exactly as in the code. We have done that for the rest of the protocol but we haven't done that for halo 2. 

[59:28] - **Jack Gavigan**

I think we did do a bit of that at the time. I remember doing reviews and things and tying them in. I did do some of that review but i didnt have the space at the time to fully tie it to the mathematical things i was relying on Mary who was reveiwing the page and proof and security argument itself for that. But it is the closest thing we have there. 

[59:58]

I would also say that right now trying to write a formal version of halo 2 is probably trying to do the same thing with gcc.

[01:00:21] - **Daira**

No because we know how complicated it is to produce a formal model of C because we have one. I can't remember what the project is called. We have a model of C and it's huge. So i think halo 2 proofs is nothing like as complicated. 

[01:00:48] - **Jack Grigg**

I dont think its nearly as complicated but what my statement was trying to imply is that currently halo 2 with its arithmetization implements a formal model in that it tries to describe conventions and guide people through registers to convey their circuit intentions into code and give them as many safety rails as one can but it is still done in a bit of an ad-hoc way with things that we developed and improved over time rather than being something that is designed to be explicitly modelled. 

[01:01:45]

It may still be modellable but there may be things that are made trickier by the way we currently do them because our goal in doing them a particular way was user safety and circuit performance rather than being modellable. 

[01:01:57] - **Daira**

My impression was this person wasn't trying to prove correctness of halo api's currently implemented. They were more trying to give a model in a specification language. 

[01:02:23] - **Deirdre**

Like hack-spec. They are trying to use something like hack spec or a version related to hack spec to implement in a high level specification language halo 2 all the way down. 

[01:02:44] - **Jack Grigg**

Definitely the best place for them to start would be the protocol document section 4.2 and then beyond that they will likely need to look at the code. 

[01:02:51] - **Daira**

Do they have access to the halo 2 discord? If not then please point them there. 

[01:03:31] - **Deirdre**

Halo 3 is not a thing. 

[01:03:38] - **Jack Grigg**

Halo 2 is technically not a thing per se. The reason its halo 2 is because halo was a proving system defined in a paper that didn't get published other than  on eprint but the thing we implemented in the halo 2 repos is not the proving system implemented in the halo paper. This is actually the same problem people had with the name PLONK. 

[01:04:06]

Because PLONK means several different things but foremost it means the PLONK proving system defined in the plonk paper which is much more limited than what people do with what people now refer to as PLONKish arithmetizations.  Halo 2 being halo 2 does not imply there will be a halo 3. More likely halo 2 the ecosystem of crates & proving systems will be expanded based on what its usecases evolve to be. 

[01:04:52]

One of the nice things about it is we can do those kinds of evolutions in a way that people can migrate to because you don't have to run a new trusted setup everytime you change the circuit. It's more about if we are making changes we making them in a way people can follow them rather than being stuck. 

[01:05:09] - **Daira**

Halo 2 with recursion will still be called halo 2. I am not sure about adding support for hyperplonk but the library will continue to be called halo 2. 

[1:05:39] - **Deirdre**

But to do that if you were to support hyperplonk, how much work is it to support two or more different arithmetizations at the backend?

[01:05:50] - **Daira**

A lot of work. The initial generalisation to make it support two is hard work. 

[01:06:01] - **Jack Grigg**

That work is work that I want to have happen because its also work we need for other DSLs or compatible intermediate representations, Thats really where i was thinking the direction of this research project might end up in. Being a specification that is compatible at some particular intermediate representation for instance. That would then enable taking out some of the complexity of how certain optimisations are done in our stack.

[01:06:46]

In any case, the various things going on like the PLONKish standardisation effort for the representation or the various other IRs that people have been working on to try and make progress in the space. One or more of them is going to end up being in halo 2 but the work to get just one of them in is the big lift. 

[01:07:08] - **Daira**

Speaking about the PLONKish standardisation effort, we realise there is a different way to think about rotations that might be more amenable to analysis/optimisation and the way the halo 2 library currently does it. This new way is to think about abstract columns so whenever you reference a non zero rotation instead you represent that as an abstract column and then you have hints that map the abstract columns to rotation. 

[01:07:53]

The advantage of that is that you can compile it one of 2 ways you can just take the abstract columns literally and that produces a valid circuit without rotations or with only zero rotation or you can use the hints to compress the circuit area. 

[01:08:21] - **Jack Grigg**

It's an evolution of the optimisation ideas I outlined in my [Zcon3 talk](https://youtu.be/kkQWubFae7Y?t=1084). There was a slide there of different ways you can write equivalient circuits. The nice thing about this is the thing the rotations are effectively doing is encoding intent from the circuit designer. Which is the thing you are really missing if you're trying to do these optimisations from scratch. 

[01:08:58] - **Daira**

The advantage of this is that the hints can be completely arbitrary and it doesn't change the meaning of the circuit. They could be completely wrong and that wouldn't create a correctness problem.

[01:09:31] - **Deirdre**

Back of the envelope calculation. What is the performance space differential between the lovingly hand crafted compilation down to PLONKish that you have created for halo 2 versus compiling to some arbitrary IR that is on the market and using that to compile down to a full proof to be verified?

[01:09:56] - **Daira**

Rough, top of my head estimate, 3 times. 

[01:10:05] - **Deirdre**

So abstraction comes with a cost. 

[01:10:10] - **Daira**

It depends how good the compilation is, I firmly believe you can do something like a 5% overhead, you might not be able to automatically do some of the things we do. On the other hand for a given time budget in how long you have to manually optimise a compiler might be able to do better. Just like how it is compiling ordinary code to a processor. If you have a lot of time to optimise assembly language for a particular instruction set then yes you're going to be able to do it more efficiently but most people don't have that time and in that case the compiler will do a better job. 

[01:11:13] - **Jack Grigg**

The core issue is that in the timeline of developing compilers for circuits, we have been a lot earlier on in the process than code compiler toolchains have been but the end goal is something similar. We're kind of speed running from the 50's to the 80's in terms of compiler technology. You can also look at it in 2 ways. The nice thing with a circuit is this effort to do optimisation only has to be done once before you pin the circuit because once you've pinned the circuit you're not going to be editing it beyond a well defined common upgrade point because everyone has to agree on the context of the circuit.

[01:12:14]

What you can choose to do is write your circuit more abstractly and then throw a butt tonne of cpu power to SAT solve the absolute best layout and however long that takes you do it and you just pay it down once but you need to have all the tooling in place to a) represent your circuit in a way that still correctly conveys the things you need b) has a way to imply the various hints you know of in terms of what you mean c) knows about all the various tricks that so far people individually for circuits and hand encoding.

[01:13:06]

On the flip side you also have the thing where people cant choose different optimisation strategies because they have to agree on the verifying key. Its not like regular binaries where 1 can run a debug & 1 can run a release and they will be for the most part compatible because it doesn't matter if the most precise binary bits in their 2 binaries differ, for the most part even the undefined behaviour isnt going to leak its way out into the main protocol that the binary is implementing between the various parties. 

[01:13:45]

There are obviously notable exceptions but usually those exceptions are limited to exploiting the person who is running a particular binary whereas with circuits similar issues result in an invalid state that breaks the thing that  is encoding. So the option at the moment is everyone has to agree on the same circuit. 

[01:14:16] - **Deirdre**

Thank you, i kind of knew some of this but at the same time i was curious. How far apart we would be if we tried to make this abstracted away, managed the complexity a bit, reused some of this and its 1) there would be a gap but 2) it might help people eventually. Do we think we want to stay with plonkish or would there be other arithmetizations that are more attractive for reasons? Is there sense in trying to coalesce around plonkish as a target?

[01:15:20] - **Daira**

Yes because plonkish has essentially all the optimisations for arithmetizations that we currently know how to do. You can pair it with R1CS & if you compare it with AIR then the essential difference is that plonkish allows equality constraints and AIR doesn't directly. I think plonkish is here to stay. If there are improvements to it which is quite likely then the things we've learnt from using plonkish will still apply. 

[01:16:24] - **Jack Grigg**

I think centralising around plonkish is the tooling it gives you is the ability to work almost arbitrarily in additions and multiplications & those are the two things we have at our disposal when building protocols around fields & groups. That basically gives you everything you need. R1CS was a little more restrictive in that regard in that you had arbitrary additions but you did not have arbitrary multiplications. You had to do them in a specific way which simplified the model but did put limits on how you could construct with things and how efficient they could be whereas with plonkish it lets you do arbitirary tradeoffs in those two operations.

[01:16:34] - **Jack Grigg**

The space is now close enough to the protocol in terms of abstraction that barring some significant shift in the landscape its likely that most improvements going forward are going to be on the current theme.

[01:17:50] - **Daira**

The only thing that potentially you could argue would be a slightly bad idea in plonkish is the rotations because they make the ordering of rows matt up. Actually this idea of how to use hints helps with that because in the version that uses abstract columns you can reorder rows. You regain that analyse-ability aspect of it.  

___

### Attendees


+  Adi Nighthawk

+  Conrado Gouvea

+  Daira Emma Hopwood 

+  Deirdre Connolly

+  Jack Gavigan

+  Jack Grigg

+  Kris Nuttycombe

+  Nate_ZEC

+  Pili Guerra

+  Vivek Arte

+  Ben Beale 

+  charlieok

+  Greg Pfeil

+  John Bruhling

+  Michael Harms

+  Pacu

+  Zero D


**Next Meeting Scheduled: 15:00 UTC March 23rd 2023**


___
___

