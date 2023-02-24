# Arborist Call #46 Notes

Meeting Date/Time: February 23rd 2022, 22:30 UTC

Meeting Duration: 1hr 20mins


**Agenda**: 

+ Welcome and Meeting Intro 

+ Zebra Status 

+ FROST Status 

+ ECC Core Update

+ Research & Implementation Update
    
+ Open Discussion


Video of the meeting: [recorded]

**Slides**: [1](https://gateway.pinata.cloud/ipfs/QmWVjPRGBywcShgUahpjsdko2jHupfCGyXycDiBSB3vUNb)

Moderator: Jack Gavigan

Notes: Jason Rogers


## Decisions & Action Items


i) discuss mempool filtering rules for consistency between zebrad & zcashd

ii) ZF & ECC teams investigate miscompilation of halo crates/dependencies in zebra

iii) check rationale for orchard dummy notes in prev arborist calls
___



## Full Notes



### 1. Zebrad Updates i) - Zebra -rc5 status 

[00:00] - **Marek**

Hello, i'll give the Zebra update today. We are actually in the process of releasing [zebra -rc5](https://github.com/ZcashFoundation/zebra/pull/6213) which brings a couple of updates. The main one is that we finished the mining related rpcs and that makes zebra ready for testing with mining pools. 

[03:58]

If there are any mining pool operators in this call or if anyone is watching on youtube, I would like to encourage you to try zebra and let us know how it goes. The next thing is that we fixed a little regression with lightwalletd and zebra now supports the latest version of lightwalletd. We also made non-finalised chain rollbacks instant. Before zebra was recomputing the note commitment trees when there was a non-finalised rollback but now zebra stores the trees in its database and fetches the right tree when there is a rollback. 

[05:10]

Then we have a couple of smaller improvements such as the duplication of the redpallas code. One more important thing i have here is that zebra now implements the settled network upgrade consensus rules so it checks if its following the consensus chain each time it starts. 

___


### 1. Zebrad Updates ii) - FROST updates


[05:47] - **Deirdre**

I have a little update. We are doing project planning, basically an end to end proof of concept of how to do FROST signing in a distributed setting. Little binaries to show how different processes can do key setup and signing of an arbitrary message That will be a demo for people to build off of when they are trying to build FROST into their own applications. 

[06:23]

Part of that work will be a library that we are sketching out. It will bootstrap this proof of concept from real barebones copy pasting messages between terminals, to a networking library that will handle the authenticated channels that you need to do this over the network, and then the implementation of a broadcast channel protocol that we have been researching about the simplest, easiest, clearest way to do this in a small scale setting.

[06:33]

So that we can demonstrate in an end to end setting, what a secure setting for FROST looks like and then we can tell people "here is a way to do it, you need these properties to do FROST key setup and then signing. So as long as your application has properties like this proof of concept then you can scale up as needed".

[07:31]

So we are doing project planning for that and starting the beginning of that sort of work and will keep you posted. 

[07:36] - **Daira**

What are you using for the authenticated channel? TLS, Noise?

[07:41] - **Deirdre**

Noise. Probably the ik pattern. That is the easier part, the current plan is to use a specification of echo broadcast over those channels and then the API we will provide is just "send message to the broadcast channel". We'll try to make that API as simple and clear as possible for anyone wanting to do a multiparty computation thing. But our goals are to make it very small, clear, correct, our goals are not scaling. That's a secondary or tertiary stage of our FROST end to end proof of concept toy. 

___


### 2. ECC Core Updates - 5.4.1 changes / deprecated features / two stage payment api

[09:00] - **Str4d**

Last arborist call was 2 weeks ago and we had just released 5.4.0 which had various changes including transaprent pool, chain tracking supply etc. To use those you had to reindex. There was a known issue related to some lag related to the wallet updates. That got fixed and we released that in a 5.4.1 along with another thing that became apparent when we released 5.4.0 which was that the feature deprecation framework that we rolled out in 5.0.0 worked if you specified config options in the command line but not in the config file. 

[09:48]

People noticed because 5.4.0 was also where we moved a bunch of deprecated features from stage 1 to 2. As a reminder the feature deprecation framework is used to deprecate features. It goes through a 2 stage process where we first mark features as deprecated, announce it in the release notes & provide a flag you can use to mark it off so you can preemptively disable it to work out what is going to cause problems and then a minimum of 18 weeks later we do the movement to stage 2 where we default disable it but then you can use that flag to reenable it to keep using your existing use case if you haven't figured out how to migrate. 

[10:28]

A bunch of people started needing to do that. It turned out that the config option had broken in the config file. So we released a 5.4.1 that fixed that so people can now configure deprecated features in the config options to alter on the CLI. As a result of that its also had issues, i've been opening up the issue tracker, thank you please open more of them if you have issues with things you have now found are deprecated.

[10:38]

The way we want to do the deprecation process is this is one of the steps that allow us to learn how people are relying on things that we want to deprecate so that we can ensure that we have a migration pathway to features that are not being deprecated like new or supported features. In terms of other things that have gone on in the last couple of weeks, we've started retroactively applying [ZIP-216](https://zips.z.cash/zip-0216) to Zcashd. That is also active in 4.5.1.

[10:43]

ZIP-216 was related to some specifics about how certain non-canonical jubjub points were allowed to be encoded. We have since confirmed that everything thats visible to consensus prior to the NU5 satisfied the ZIP-216 rules. So we can pretend they were always active, which makes the code simpler.

[10:48]

It does technically mean that a wallet that could have been sent something that was violating ZIP-216 but as far as we can tell those funds never would have been spendable anyway due to other things in the codebase. No existing user should be impacted by the rust changes related to that. On the rust side we were making changes to improve the type safety of the various APIs. Thats rolling out in the next release of the crates which will happen at some point in the near future. 

[13:09]

On the rust crates side, a recent addition to the APIs was a split transaction creation mechanism. The existing transaction builder that we have available for those who are using the light clients. Previously it was just a one shot api to send a transaction to a given recipient or send a transaction using a ZIP-321 transaction URI but now there is the ability to, in the latest current release to do a 2 stage API where you first propose a transaction, the user provides a 321 URI that says I want to send these many funds to these recipients and you will get back a transaction proposal, that is what the wallet says "given the funds i have access to, this is the best option for you to create". 

[14:08]

From that you can then figure out things like what kind of privacy property does it have? What kind of fee is it going to require? The idea of this is that instead of only finding that out by trying & looking at error messages for lack of funds or not being able to choose a privacy policy in order to spend finds that otherwise you might not have been able to. This is now information that could be figured out up front as part of these APIs. That style of api will in the near future be rolled into the mobile sdks and we're doing some refactoring inside zcashd that will enable similar kinds of rpcs to be provided inside zcashd itself, which will let us migrate away from the single-shot z_sendmany etc. to having this 2 phase check what will happen - check you're happy with it then commit to doing so. 

[15:17] - **Kris**

The only other thing I would mention is that we are nearing completion on a ZIP-317 block construction implementation. The implementation is essentially complete we are just now working through all of the rpc tests that made assumptions about fixed fees and fixing those up as we go. It will be rather thoroughly tested by the time it's released. 

[15:55] - **Str4d**

Related to that, the current zcashd rpc uses a positional JSON rpc mechanism which means you cant specify later arguments without specifying earlier ones and one of the arguments that exists in a bunch of rpc's is the fee. We are considering ways at the moment which allow people to specify at some value in the fee slot that indicates "I want to use the default fee" rather than having to explicitly encode it which will let the ZIP-317 rules do what they want from the wallet perspective.

[16:35]

Most likely it will be specified -1 in that position but the release notes for the relevant release will contain that. The other thing i should mention is we are still making progress on DAGSync style stuff. We are primarily looking at the incremental merkle tree crate. There's pr's open, in the process of being reviewed there. 


____


### 2. ECC Core Updates ii) - Mempool fee filtering 


[17:01] - **Teor**

I know we've talked about this in the zip editors sync but did you make many changes to the fee filtering rules for the mempool as part of the block construction changes?

[17:33] - **Daira**

The [ZIP-401](https://zips.z.cash/zip-0401) random message drop, when the mempool gets full, that had a random component that was dependant on whether you were paying the conventional fee and that gets updated to use new conventional fee. Apart from that I don't think we are making other changes. We haven't made any changes yet. 

[18:07] - **Str4d**

The only other relevant change is because zcashd's mempool allows storing packages of transactions where specifically transparent transactions where you can create a transaction that creates some transparent coins then you can spend those coins in a zero conf transaction. Thats behaviour zcashd inherited from Bitcoin so we've got it there. 

[18:36]

That adds an implicit requirement on ordering to the transactions. There was a slight modification to the block selection algorithm where it still selects randomly per [ZIP-317](https://zips.z.cash/zip-0317), but any time it selects something randomly that can't be immediately added to the block, it gets added to a queue. The moment the parent of that transaction gets randomly selected we then go through the queue and any child becomes immediately eligible gets prioritised into a different queue to maybe go through. 

[19:11]

The random selection is still single selection like [ZIP-317](https://zips.z.cash/zip-0317) but there is minor reordering from that random selection process to resolve any parent child relationships within the mempool which can mean you might select a child transaction and originally you might sample it and then because you never sample its parent before the blocks full, the child gets dropped. Thats part of what you would expect out of ZIP-317. 

[19:39] - **Daira**

We haven't implemented this yet but i expect we will make a change to the relay policy so that if a single transaction has more than 50 unpaid actions, then it probably wont be relayed. Because it would never get into a block under the ZIP-317 algorithm. 

[20:07] - **Teor**

We've got an open ticket for making that same change in zebra. What i am interested in, maybe we can discuss this in detail in a future zip sync is making sure that Zebra's mempool filtering rules in terms of minimum fees or fees per byte are reasonably consistent with Zcashd's. Because our mempool is new we don't have any of those rules implemented yet apart from ZIP-401 for denial of service. 

[20:36] - **Nate**

It's kind of a high level question, I might have already asked about this but want to check again. Zebra is adding mining support api's and those are ready to test, meanwhile zcashd is upgrading the block proposal rpc's to do ZIP-317. 

[21:20]

A) Is it true Zebra is also implementing the ZIP-317 rules? B) Does that mean miners should have a choice now between 2 full nodes & both implementing ZIP-317 rules?

[21:34] - **Teor**

Because ZIP-317 was being drafted while we were implementing this, we just implemented ZIP-317 for our block construction algorithm. We've had that implemented for a while. The only piece of ZIP-317 we don't have implemented is what Daira was just talking about which is the relay rule. That's because we were waiting on Zcashd and confirmation that dropping large transactions with low fees from the network was okay. We were waiting for wallets to update.

[22:21] - **Daira**

I'm not sure we made a final decision to do it but we can talk about that in the next zip sync. 

[22:28] - **Teor**

Let us know, we're happy to do it whenever its done. Miners should have a choice. To be clear Zebra's now experimental test mining with Zebra. We have one known bug where one of our checks or the concurrency is a bit off. That only happens very rarely. Almost all of the block proposals should be valid but we do need to make one fix before its ready for production use. 

[23:13] - **Nate**

Just circling back, what i wanted to know is Is the message for mining pools - at some point in time when zebra is ready for production and zcashd has deployed the ZIP-317 changes, you can choose between these two implementations and it wont affect at all your policy about ZIP-317 because they both implement the same policy - or will there be a window in time where the message would be "You can switch implementations but one implementation has a different policy than the other for some period of time?"

[23:58] - **Teor**

The answer is Zebra will only ever implement ZIP-317. If you switch to zebra you will have ZIP-317. 

[24:12] - **Daira**

There are some aspects of especially relaying that are quite vaguely specified, we should probably write a ZIP about them. Those might be different. 

[24:28] - **Str4d**

There's the things that Zcashd already has that i don't know if zebra have emulated which is the package tracking but also rpc's for artifically increasing the fee that you pretend a transaction has to change it's priority within the logic which we are figuring out how to make useful and usable with ZIP-317. How long we keep those around will be a separate question. 

[25:12] - **Daira**

I would kind of like to deprecate them. The thing for adjusting the fee, that can behave in the same way that it previously did. It just pretends that you're using a different fee and then you apply the ZIP-317 algorithm to that fee but there's a different priority based thing that is modified by the same rpc and I haven't figured out how to handle that yet. 

[25:43] - **Str4d**

We are essentially getting rid of the priority pieces. 

[25:50] - **Daira**

Maybe it will just be ignored. 

[25:51] - **Str4d**

Yeah, because upstream Bitcoin had already done that from memory. They switched a while back to using solely fee, what they turned into score. 

[26:02] - **Daira**

We'll have to take a look how they changed the prioritised transaction rpc. 

[26:07] - **Str4d**

It would be my expectation if anyone is using similar stacks for Bitcoin and Zcash, at least for the interaction on the rpc's for mining it's likely they aren't using those priority api's. Certainly when we do ZIP-317 the priority piece won't do anything anymore because that logic won't be part of block construction. 

[26:33] - **Daira**

I think mining pools do tend to prioritise their mining payouts. 

[26:41] - **Str4d**

That can be done with the existing api's. 

[26:48] - **Teor**

Just to answer that question, yes there are some more complex features that we didnt implement in our mempool like as str4d was saying the transaction packages, dependant transparent transaction and also queuing transactions that might become valid later. Actually we do in some cases do queues and in others we don't. We haven't heard from any miners that use those priority rpc's yet. if they do, please reach out and let us know, we are happy to implement new rpc's that are actually needed and used by people. 

[27:36] - **Str4d**

Similarly, if there's rpc's you use and we know that you're using them then if we're planning on deprecating them we can figure out how to service the use case that you are using them for. 

[28:03]

Theres one more thing i forgot to mention in the update section. There is a current issue open regarding issues creating orchard transactions on 32bit android devices, we've already given updates in the issue but it is something we are working on internally and we've already found a couple of bugs that are already contributing to it so we are doing the full look through things and identifying anything that is interfering with the wallets ability to create valid transactions. 

[28:46] - **Daira**

There was one bug in [incrementalmerkletree](https://github.com/zcash/incrementalmerkletree/tree/master/incrementalmerkletree) and another one in pastacurves.

[28:53] - **Str4d**

We're continuing to chase those down. It looks like it should just be patch fixes out on the various crates that then a cargo update should be sufficient to bring those updates. It should work given what we are seeing so far. We'll keep hunting those down.

[29:28] - **Teor**

I wonder if this is related. In Zebra we've just found what we think might be a rust mis-compilation in the halo crates or some of their cryptographic dependencies. On nightly the test vectors that we share with ECC for halo proofs fail but on stable they work fine. Maybe this is separate, maybe this is related to the errors that wallets are seeing. 

[30:05]

We're seeing this on cxx 64 on nightly, we haven't actually checked any other architectures. 

[30:15] - **Daira**

That sounds like its probably a seperate thing. The things we've found would affect all 32 bit platforms. All platforms where U-size is 32 bits. 

[30:28] - **Str4d**

This seems more likely to be a breakage in nightly because those do happen but it would be interesting to figure out what that problem is - we can chat about that offline. It's always fun to find actual mis-compilations in the rust compiler. I have yet to trigger an Internal Compiler Error. I know a few people who have, i'm still holding out for one of those. 

[30:57] - **Teor**

We did a few months ago with an iterator but that was a ICE in beta rust then it got patched.


___


### 3. Research & Implementation Updates i) Research based async discussion Forum 


[31:51] - **Str4d**

From the zip editors side of things we are continuing to have meetings with QEDIT to iterate on the editorial side of the ZSA zips. Making good progress there. 

[32:07] - **Nate**

I'm interested in finding a long form venue for research discussions. Letting people know I am interested in that and wondering how we could set one up and where it should be. I'm thinking long form and asynchronous. Discord doesn't work very well for that purpose because it's more chat oriented. I am putting the call out there and plan on discussing that with different groups and seeing what would work best for everyone.

[32:54]

Does that sound like something people here would value? Do we already have good options?

[33:05] - **Jack**

There used to be a regular science call wasn't there?

[33:15] - **Nate**

I'm thinking asynchronous though, so like a forum. Maybe it could potentially be a place in Zcash Forum or something else. I really like https://ethresear.ch I think it might be a discourse forum but the framing & participation there i'd love to get stuff like that going for Zcash. 

[33:42] - **Jack**

With the community forums, we can create separate sections that are permissioned to a specific group of people. In fact we did this recently for maybe the mobile wallet group. We can create a separate section in the community forum. It can be visible to the rest of the world or entirely private and you can simply create a group and we can make different people managers of that group and allow them to invite and add more people to that group and it means then that you don't get the situaltion where anyone can join and post in a topic. It's very much permissioned to a specific group. It can be public or entirely private. 

[34:58] - **Nate**

Cool, i'll check that out. Another piece is trying to find folks who I was thinking might be interested in posting there and figuring out what they might want or need. I perceive there is a need. 

[35:18] - **Jack**

That's definitely a solution we can have ready if not immediately, within a very short space of time. 


___


### 3. Research & Implementation Updates ii) Feature Specific Testnets

[35:33] - **Teor**

I was interested in a bit more of an update on the ZSA progress. Do we have a vague timeline for either when ZSA's might be ready to integrate into Zcashd & Zebra or I guess NU6. Very interested in when that work might be able to start but i understand if we don't know yet. 

[36:17] - **Daira**

We don't know yet but I am hoping they will go into NU6. 

[36:24] - **Str4d**

We do know that qedit have been working on an implementation integration already and we know that they have a version of a circuit that implements a version of the ZSA zips. Whether its the one that ends up aligning with what comes out of the zip editorial process is another matter. 

[36:50]

For instance, one of the things that came up in the most recent discussion with them was whether we keep the orchard dummy note system around or if we coalesce on the split note system. I know at the time months ago when we discussed this, we discussed this particular point. At the time there were good reasons for keeping dummy notes around for orchard but i cant remember them now. We need to go back and review those earlier discussions to make sure that in the process we haven't forgotten the early rationales. 

[37:40]

As far as the integration goes, I haven't been discussing it directly with them other than pointing them in arborist calls towards the feature logic in Zcashd and things. I have not had specific questions from them. It would be good to if they are working on that part of the implementation to chat with them a bit more about that part so that the implementation they're working on is more likely to be integrated easily into a node rather than needing adapting. 

[38:21] - **Daira**

I think that may have had something to do with compatibility with existing notes. obviously there can already be zero value notes for sapling and orchard. I have to think about it. 

[38:43] - **Str4d**

Technically you can use a note that was previously created but its tracing through the binding of what it all ties to. 

[38:56] - **Daira**

For new assets there will need to be an on-chain issuance transaction and that has the effect of making a particular asset base valid so we would have to treat ZEC as a special case because there is no such transaction for ZEC. 

[39:28]

Because it has to use the existing value base. 

[39:32] - **Str4d**

I don't think that would be specifically necessary, no. Remember the way the split note idea works is that you're binding to an existing note that exists. 

[39:46] - **Daira**

Oh right, you can use any ZEC note. 

[39:52] - **Str4d**

It's an open task to go back and check what our earlier rationale was in the earlier arborist calls were for instance. 

[40:16] - **Nate**

I wish we had an easier time or a better ability to do feature specific testnets. It feels like that could be really helpful if we could put some effort into that for ZSA's but especially if we get more teams working on distinct features, if they don't have to coordinate up-front and merge into main branches on the nodes and instead they could setup independent test networks, I would love it especially if they could do that before ZIPs are finalised so people like me can play with a thing even if its half-baked or has bugs or has a bad design just to get a feel for it. 

[41:06]

As far as i know doing that kind of effort isn't a priority right now for the ECC engineering team but I feel like we need to think about that and collaborate with the community to set that up. 

[41:20] - **Str4d**

It is doable for Zcashd, or at least its meant to be doable with our feature framework. If an upgrade is integrated into Zcashd via the feature framework then we can set those features to be enabled at certain fake network upgrades. 

[41:40] - **Daira**

It's not so much enabling features but Zcashd has the assumption that it's running on either mainnet or testnet. Running on a different testnet there would be no separation between that testnet and the global one from Zcashd's point of view. 

[42:10] - **Str4d**

You can add that. You define another set of parameters. We have mainnet parameters, testnet parameters. Upstream Bitcoin when they were doing SegWit they added a SegNet for another temporary global testnet for that. testnet in a box does effectively the same thing by modifying the parameters to create an independent testnet rather than baking them in. There's a variety of ways we could choose to do that. 

[42:45]

That combined with the feature flagging system means it should be possible for anyone to spin up an arbitrary testnet with whatever set of features that they want. 

[43:00] - **Daira**

I had forgotten testnet in a box basically already solved that. 

[43:04] - **Nate**

I feel that testnet in a box plus the zcashd command line flags mean in order to manage which testnet you want to join you have to do networking tricks. Whereas by contrast in Ethereum nodes they have an interface to something like configuration testnet="name" arbitrary string and different node implementations can use the same name and its like a persistent public testnet and taking that approach seems appealing to me because then as you're running the node you don't have to care too much about tweaking network settings to make sure you're connecting to the right network. 

[44:07]

Would something like that be valuable?

[44:11] - **Str4d**

testnet in a box does its own thing entirely so you don't have that problem at all and for the other approaches that I described the networking piece is built into the config. 

[44:28] - **Nate**

Let's say qedit says "hey we setup a zsa test network" if they're using testnet in a box, how do I open up a new terminal, launch a zcashd and connect to their testnet. 

[44:52] - **Str4d**

That i don't know, but the other approach I described, it would just be run the binary that they provide. Because the set of parameters that define it, if you modify the testnet parameters to be a different testnet is where you set things like what DNS seeder to use, what network magics to use. Those bits and pieces are all configured there. You would just enable the previous network upgrade to be enabled by default so we start from NU5 and ignore all the previous ones and define this fake new network upgrade that activates just the features you want. 

[45:25]

The process would be: Nate runs the binary that qedit builds and it works. If that UX doesn't work then it needs fixing. 

[45:40] - **Daira**

You have to be running a different fork in order to support the new testnet anyway for whatever features are supposed to be running on it. 

[45:49] - **Str4d**

Because by design the feature flagging system is meant to ensure that anything that would affect consensus rules is not compiled into our production binaries. It can be in the zcashd codebase but we dont want it touching the regular consensus rules until we put it into a network upgrade. As opposed to the network upgrade system where the rules are in there but they're not enabled at the height yet. The feature flagging system from memory is more strict. 

[46:25] - **Nate**

So the next follow up - If they had a fork of zcashd they could implement the feature flags and the correct settings and hard code it to Zcashd, but now whats the story for zebra and is there any way we could deduplicate across the nodes and around classifying how do i join a testnet and what features are present in it? Maybe there's not but i am interested in seeing the 'how-to' for both nodes on a feature specific testnet. 

[47:06]

I feel like that would help the whole ecosystem start developing much earlier against specific features. Much earlier than has been the status for Zcash. 

[47:25] - **Teor**

Zebra has just implemented a mainnet and testnet selection. We do have all our parameters in one or two modules so they are reasonably easy to change. The way that I think I would recommend doing this is the way we've been doing existing features in Zebra which is to use rust feature flags which is very similar to the model str4d was just talking about where the features affect the consensus rules so they're not actually enabled unless you use a specific flag when you're compiling. 

[48:06]

In that case you would do things like change the default DNS seeder to a DNS seeder that has been set up for this new testnet. Thats actually a piece of work that needs to be done for every new testnet or add some default nodes in which is something thats possible. Then configure your testnet on a different port with a different network magic. 

[48:40]

Some of these things are in the config and some of them you would have to do using the feature. Basically it would be using the rust feature system and then you could compile with that. You can do that in your fork, you can push a pr to our fork. It's something we're looking for. 


___


### 3. Research & Implementation Updates ii) Feature Specific Testnets cont.


[49:02] - **Deirdre**

To make it easy to have a general client connect to a general a-general testnet not the testnet we currently talk about from multiple compatible projects there needs to be some collaboration and they have to deploy them so that already seems to happen for testnet but barely. I think this is a hard problem for a non-developer user or a user that can't get the experimental and get it running. That is where experimental designs & features live. 

[50:16]

Zebra has a few longish running instances but they run off of our main branch and they change almost every day. The experimental branches might be even more volatile. I think what i hear you saying from "I want to try some new experimental stuff on an experimental testnet and make it easy for everyone to experiment on" is harder to do in a cross-implementation compatible way so I would say we should just leverage the use of the current testnet in my opinion. 

[51:07] - **Str4d**

Related to that, i would be interested Nate because I don't know how these extra ethereum testnets work and how they actually differ. I would be interested in knowing how those differentiations are done because in the case of these features, its not simply theres a common configuation that one can set up - its also necessary that both node implementations implement those consensus rules in precisely the same way to be interoperable. 

[51:47]

That is not a copy a config over thing, that is a lot of extra engineering involved. The testnets are useful once you've done that engineering, its possible to then agree on the settings of the network but it feels like the hard part is the engineering prior to agreeing what those settings are going to be. Certainly once the engineering gets to the point where the consensus rules are not the thing thats being test and its mostly wallet level testing then having a common testnet or common multiple tesnets could be potentially beneficial. 

[52:30]

So instead of there being the one main testnet that we upgrade, you could imagine once ZSA's have a working consensus version that the nodes agree on there could be a long running testnet that people use to develop their app level features in advance of it being deployed to a testnet. 

[52:56]

If that is the functionality that people want out of the the long running testnet's, that could be something beneficial to then make easier to configure in the main nodes but for the development of the consensus feature itself, its already enough of a hands of process that i'm not sure that making the network configuration part easier would not help much. 

[53:24] - **Nate**

I have a different mindset, two things. Maybe a good next step would be both of these teams collaborate on making a 'how to set up a testnet guide'. Because here's a question, we are not quite sure who's going to do the work. If qedits going to do it, do they know all of these steps? Do they know how to set up a seeder, how to make forks of both nodes, what parameters to change on both nodes? Etc.

[54:08]

Maybe giving them a guide and they are our first test user like 'here's a guide on how to set up a first testnet' and it might be sparse or just a launching off point for them or a way for us to get feedback. The second thing was a mindset shift. You started going there str4d. i personally would love it if I could get a development test version of a wallet and it has prototype UI's for ZSA stuff, I can connect it to the ZSA testnet and experiment with it. 

[54:45]

So instead of we roll out the protocol, we do the consensus changes, we set up the test network, we update lightwalletd then we update wallets. Instead of doing it in that sequence is there any way we could frontload as much of that as possible. 

[55:15]

Let me tell a story so it's not for ZSA's. I just have some crazy idea for a protocol feature I want to do, and instead of even thinking about consensus rules all I do on day one is set up a test network and its just running the main branch of everything and then day two I start tweaking consensus rules and deploying that to the test network. Its frontloading having an interactive stack you can experiment with super early on in the process. 

[55:49]

Because I have this intuition that might help a lot with rolling out complex changes. It's an ideal. 

[56:04] - **Str4d**

I agree with you there and the trickiness there is what does it actually take to roll out those kinds of features. Because if what you're trying to is something that requries consensus changes to the consensus rules then you compile it, you run it, you have a nice testnet running. You then change it then you've got to make sure you wipe out all the local state. The current zcashd - if you change the consensus rules on it, it doesn't know that. 

[56:44]

It isn't compiled with knowledge of all previous consensus rule evolutions that have ever occurred. It just knows the consensus rules expected to be applied with the local chain state, what the local chain state reports, those don't match I have to wipe out a bunch of stuff and keep going, but the weirder and wackier the changes are, the tricker that gets. There's a limit to how easy we can make parts of that work but for hacking on stuff like "I want to be able to hack on the network protocol" or "I want to experiment with different ways that nodes can communicate" but not fundamentally changes, that kind of stuff could definitely be a lot easier. 

[57:23] - **Daira**

It kind of has to be the way str4d described because there are refactorings we may want to make to the consensus rule code that are not supposed to represent an actual consensus change and we do those frequently. 

[57:50] - **Str4d**

I also did just pull up our feature system which we implement in zcashd and it is not compile time turned off it appears. You actually do define the features in the runtime code. It is a runtime one you can actually enable with feature flags at the command line. Which is more flexible than I remembered it. Currently its not used for anything because we don't have any features that use it. What that in theory means is that you could define a new testnet thing and start it up with a particular set of feature flags and define whatever set of consensus rules you want. 

[58:30] - **Daira**

A non trivial example of what i just said, refactoring the consensus rules that is not supposed to represent a consensus fork is the change we made to apply ZIP-216 retrospectively. So the reason that is not a consensus fork is that we checked that those rules applied in our previous box on mainnet and testnet but you have to actually check. 

[59:09] - **Teor**

I think this would be a good thing for the teams to work on together because what i'm hearing from nate about the ethereum implementation is it's just naming your testnet in the config and it just works. I wonder how close we can get to that kind of automatically picking a new port, picking a new network magic, picking all the things that need to be done, starting a dns seeder.

[59:19] - **Teor**

Because the less manual the process is the easier it is for people to develop new features and I think thats a helpful use case but it would take some investment of time from both teams so we probably have to schedule again. 

[01:00:04] - **Str4d**

It occurs to me, thinking about what Ethereum is, that actually the purpose of those multiple testnets is to allow multiple test versions of the global state as opposed to multiple different sets of consensus rules. Ethereum has all of the programmability on layer-2 and so being able to experiment with different setups of the global state or how they interact or have completely parallel sets of funding for testing and things.

[01:00:14] - **Str4d**

If the goal of this named config is to set up a parallel version of the existing rules, that seems far more iminentely doable and reachable than set up a different thing with a different set of consensus rules. It would be useful to look at the Ethereum ones as a case stuff of how they use the system in general and how they use the system when it comes to actual consensus rule changes that they are making in their hard forking upgrades - the equivalent of our network upgrades. 

[01:01:21] - **Jack**

The next step would be to get someone from Ethereum to actually tell us what it is they actually do. 

[01:01:37] - **Daira**

The issue on any proof of work chain with spinning up testnet's is that you need some significant mining power for that testnet to be stable. 

[01:01:50] - **Nate**

Ethereum, one thing they did, it depends on the testnet but they have proof of authority for a bunch of testnets where it just checks your signatures from a timestamping server as an expedient. I don't know if we want to do that but the rationale is obvious why thats helpful. Part of the motivation that's most direct is it could be the case, although i don't know how likely that we will want development of ZSA's and development for changes for proof of stake happening concurrently and it would be really nice if we could develop those independently without needing to synchronise the changes to prove them out and consider them separately & then do later stuff of figuring how to safely integrate them if the community wants both changes. 

[01:03:07]

If we can keep them unbundled its helpful for independent development that requires less coordination and its also helpful because we can make the decision separately of when and how to integrate. The other motivation is the easier we could make it, the lower barrier to entry it would be for new teams to come in who want to work on protocol changes. If there's any way we can lower that cost. It sounds like it's difficult but the longer term motivation is if we can lower that cost it might be really helpful for getting more teams involved in protocol development.  

[01:04:10] - **Adi**

Why dont we discuss the testnet's and having multiple testnet's live. Is there a way an architecture can be set up to have a closed testnet and only expose the rpc's and specific api's that some people might want to experiment with. For example a testnet for ZSA's would be a closed testnet server, open rpc to the outside world which can use a custom edition of a lightclient to try out different transaction types but not take part in the testnet consensus?

[01:04:47] - **Str4d**

Yes, the same way you would do that with plain zcashd. The way to do that would be to run zcashd in regtest mode and then have the rpc exposed. So its completely seperated from any other network, its not tied to anything real and you have a local script that every so often hits the generate api to make a block. 

[01:05:24] - **Adi**

That's great to hear, is that something more optimal versus allowing anyone to take part in the testnet as in running their own testnet node what works the best?

[01:05:37] - **Str4d**

I guess that comes back to what is the testnet trying to achieve? Which gets back to Nates point of, what is the purpose of the testnet? Is it to check interoperability and confirm behaviour of consensus nodes? Is it to enable people to test their mining implementations which we do see on main testnet, you'll see the difficulty suddenly spike and then drop back down. Is it for people testing their lightwalletd interactions? But then it also comes down to knowing those use cases. 

[01:06:29] - **Deirdre**

For making sure we can test major work independently, feature branches. As long as they don't have major consensus nodes rules that may collide, you can talk to a feature branch build of zebra or zcashd to test your ZSA wallet work, you can do a different testnet build of PoS, things like that. We can get away with a lot of not blocking each other by developing against a main feature branch. We dont have to merge every incremental move towards ZSA's or towards PoS to main everytime. 

[01:07:16]

For things that you want to deploy and make sure this build of zcashd or zebrad talks a different set of consensus rules to verify ZSA transaction for example that may need separate testnet. If we're at that point I almost would rather move to full on testnet. We can get away with a lot with feature branches. 

[01:07:50] - **Jack**

One thing I'll say about using the primary testnet in the run up to network upgrade is there will be people who want to test against the current set of consensus rules and there will be people who want to test against the future set of consensus rules. Thats really important to bear in mind.

[01:08:14] - **Daira**

We had precisely this problem with NU5 also I think with Sapling. Maybe just one extra testnet for whatever is proposed for the next upgrade is sufficient. We've floated that idea before, you would upgrade the more conservative testnet only after the upgrade had happened on mainnet. 

[01:08:48] - **Nate**

Staging. 

[01:08:54] - **Jack**

I think it would be really interesting to hear from someone in the Ethereum community how they do things and also we should probably talk with qedit. We're speculating about what they might need and it may be that they've already done quite a fair amount of thinking about this. 


____


### 4. Open Discussion i) - Zcash Minor Grants

[01:09:35]

I want to give a quick advert for our new Minor Grants Program which we launched this week. This is intended to compliment the Major Grants Program which is now rebranded as Zcash Community Grants. The maximum grant size will be $25,000 and the budget in this initial round of the program will be $75,000. That could be 3 big grants or 20 small grants. 

[01:10:11]

This is being funded out of the Zcash Foundations slice of the Dev Fund. It is distinct from the Zcash Community Grants program and the foundation will filter applications for suitability and then we will poll ZCAP to ask their opinion on which grants should be funded. Doing this a little bit differently from whats been done in the past. 

[01:10:35]

The deadline for applications is the morning UTC time of Monday 20th March. If you're interested in getting an application in visit https://zcashgrants.org and if you scroll down to ZF minor grants you can find a link to the blog post with all the information or you could just vision the Zcash Foundation blog. 

[01:11:03] - **Adi**

Thanks for this super awesome announcement. From the committee side I just want to ask if there are certain examples of categories of grants that you might suggest the community to look into. 

[01:11:19] - **Jack**

No we want the community to come up with as wide variety of grant ideas that they want. We will filter applications to ensure the purpose of the grant is congruent with the Zcash Foundations mission and the 501c3 restrictions & will also be excercising judgement whether we believe that the applicant can deliver on the grant. Other than that I wouldn't want to say anything that might inhibit the communities creativity and restrict their ability to come up with ideas for this program. 

[01:12:17] - **Daira**

Good luck to applicants!

____


### 4. Open Discussion ii) - Network Monitoring / Mining rewards

[01:12:49] - **Jack**

We've been talking internally, it was actually Teor who raised this idea about whether we need better network monitoring of the Zcash network. There is a team working on the ziggurat tool set for assesing and monitoring the Zcash network but i just wanted to see if there was appetite for having this as an agenda item for a future arborist call to get Ziggurat and get an overview of what they've done so far and what they're working on as part of their current grant and then have an open discussion about what would be nice to see in terms of improvements or further networking monitoring. 

[01:13:50]

Does anybody think that is not a good idea?

[01:13:53] - **Adi**

It's great, I wanted to hear from Ziggurat for a while now regarding their status and updates, Network monitoring is still very important. Just today 2 different miners contacted me saying that they had issues with Zcash mining in terms of the rewards suddenly dropping for them. That suddenly a high amount of mining is happening in shielded pools, this is like an open concern, they were concerned what if someone is trying to attack Zcash. Just throwing it out there, it would be good to have a network monitoring dashboard to see realtime changes in things that are fluctuating. 

[01:14:43] - **Jack**

Sorry you weren't very specific about what changed for these miners. What was it that changed, their payouts dropped but what was it that caused it to happen?

[01:14:57] - **Adi**

One criteria was that the rewards dropped suddenly since this January and some miners noticed that a large portion of mining was happening to the shielded pool so they don't know who these new miners are.

[01:15:15] - **Jack**

Has difficulty increased?

[01:15:25] - **Adi**

Its been the same, that is the whole concern.

[01:15:26] - **Daira**

It could be existing miners switching to support shielded coinbase. An advantage of using shielded coinbase is that you don't have to wait 100 blocks before the coinbase matures. 

[01:15:47] - **Jack**

I would suggest they post to the forums and detail exactly what it is they are seeing. 

[01:15:52] - **Adi**

I'll ask the person, i did ask them to register on the forums because right now the only team they are talking to is the Luxor mining team, and even they don't have the answers to the questions. 

[01:16:12] - **Jack**

I think more information will be needed to even begin to think about what the answers to those questions would be. 

[01:16:25] - **Daira**

If the total hashrate hasn't increased and the pools that are saying this are doing the same amount of work then they should be getting the same mining rewards. 

[01:16:44] - **Adi**

That is the complaint, the rewards randomly dropped. 

[01:16:47] - **Jack**

Are these mining pools that are coming to you or are these individual miners who are signing up to mining pools?

[01:16:56] - **Adi**

Individual miners. 

[01:16:59] - **Str4d**
If the miners rewards suddenly dropped that's something they need to talk to their mining pools about. If the hashrate is staying the same the block reward going out is staying the same, it's being divided amongst the mining pools as it is, its up to how the mining pools are managaing what they're bringing in. 

[01:17:33] - **Daira**

It's not a protocol issue. 

[01:17:43] - **Jack**

Tell them to post details on the forum. 

[01:17:45] - **Teor**

One possibility, of course we need more details to confirm. One way you can lose funds while mining is if there are chain hooks. If you're mining on a fork that isn't actually making it into the final chain then what will happen is you wont get payouts for those blocks that get orphaned, thats a possibility. There are other possibilities like the reward schemes of the pools changing or the templates the pools sending not keeping up to date with the current block. All sorts of different alternatives. 

[01:18:33] - **Str4d**

We definitely have seen issues in the past where the roundtrip time of getting a block template then going through the mining process and back out has timing issues due to things like heavier block load and network propagation issues, from that side of things we continue to make changes to make the network operate as smoothly as possible under the load that it can or does have but if protocol is full and things are taking time then thats part of the protocol. There's only so much we can do at the protocol level to smooth that out if the networks under that much load. 

[01:19:30] - **Daira**

It's possible that ZIP-317 will help there.

[01:19:41] - **Marek**

If they were individual miners, what could happen is that other miners from the pool just left and changed to another pool and then the whole pool has lower rewards and then the individual miners at the same pool have lower rewards. 

[01:20:06] - **Jack**

Without more details all we can do is speculate. 

[01:20:13] - **Adi**

The individual has confirmed they will be posting on the forum. 

___

### Attendees


+  Adi Nighthawk

+  Arya Solhi

+  Conrado Gouvea

+  Deirdre Connolly

+  Daira Emma Hopwood

+  Kris Nuttycombe

+  Marek

+  Michael Harms

+  Pacu ECC

+  Sean Bowe

+  Taylor Hornby

+  Charloe OKeefe

+  Ben

+  Bushi Bushi

+  Chris Tomeo

+  Daniel Wolande

+  Gary Weinstein

+  Greg Pfeil

+  John Bruhling

+  Joseph Van Geffen

+  Tatyana Vinogradova


**Next Meeting Scheduled: 15:00 UTC March 9th 2023**


___
___
