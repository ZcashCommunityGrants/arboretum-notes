# Arborist Call #91 Notes

Meeting Date/Time: November 28th 2024, 21:00 UTC

Meeting Duration: 30 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ [Zebra Update]()

+ [ECC & ZF zcashd deprecation]()

+ Research & Implementation Updates - [Crosslink update]() / [FROST update]() / [NSM Shielded Labs update]() / [NSM Discussion]()


___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=PV-yBPV7VOY)

Moderator: Jack Gavigan

Notes: Jason Rogers


___

## Full Notes




### 1. Zebra Update 


[00:02:34.250] - **Arya**

So in Zebra, since the last Arborist call, we've merged PRs that fixed several CI issues, add a test to CI that runs on release PRs to confirm that there are no crates being pulled in from Git sources, which happened for the 2.0.0 release. Added a getblockheader RPC method updated the minimum protocol version that Zebra expects from its peers during its initial sync, and finally merged the PR for verifying transactions in the mempool that spend unmined outputs of other transactions in the mempool so that TEX transactions will work as expected in Zebra.

[00:03:06.630] 

We are currently reviewing PRs that update the getblock RPC method to more closely match the zcashd getblock output, adding the createrawtransaction RPC method, updating the getrawtransaction RPC method to more closely match the zcashd method, and generally improving Zebra's RPC error construction so that it's easier to update other methods to more closely match their zcashd analogs later.

[00:03:30.480] 

Waiting until transaction submitted to Zebra via the sendrawtransaction RPC, pass a couple of final checks and are added into the mempool before returning a success response, replacing the deprecated JSON RPC create from parity with the new JSON RPC with an SEE. Then this will allow us possibly to move the runindexer RPC method to Zebra's regular RPC endpoint as the new create supports HTTP2 and server sent events.

[00:04:01.220] 

There's also PRs open for skipping semantic verification of transactions and blocks that are already in the mempool, tracking the spending transaction IDs by spent outpoints and revealed nullifiers, adding a Nix flake, and fixing the last few bugs in our tests that were revealed recently when we fixed some other CI issues. We've also added ZSA-issued asset states to zebra state in Qedit's fork of zebra, and are adding an RPC method for querying the issued asset states as well.



___


### 2. Research & Implementation Updates i) Crosslink update


[00:05:10.250] - **Zooko**

I can do that. The Crosslink GitHub, which you can find in the Shielded Labs repository as [scoping.md](https://github.com/ShieldedLabs/crosslink-deployment/blob/main/Scoping.md) document, which now has the rationale and user experience goals and deployment goals updated. And then we're building more steps tied back to those goals in the form of GitHub tickets, which you can explore and give feedback and help. That's the status of Crosslink, and we're hiring.

[00:05:57.740] - **Jason**

Yeah, the only thing I would add to that is that Basically, we're working on creating a roadmap as well that will be published for the community and link to those GitHub tickets and tie back to the scope.

[00:06:11.540] - **Zooko**

Yeah. Those GitHub tickets I was mentioning are the roadmap currently. There's no other document to see the roadmap such as it is currently half built. Look into the GitHub tickets which are linked from the [scoping.md](https://github.com/ShieldedLabs/crosslink-deployment/blob/main/Scoping.md) doc. 

[00:06:28.470] - **Dodger**

And what sort of person are you looking to hire, Jason?

[00:06:32.740] - **Jason**

We're looking for a mid to senior level Rust engineer. We're actually looking for two. We've been having consistent interviews. We originally posted to cryptocurrencyjobs.com, but the quality wasn't that good. I started using a recruiter based out of the UK. And there's a number of candidates, but we are looking for somebody who is the right fit. So we've been making progress. People have been getting through to second & third rounds, but we still are assessing our options.

[00:07:10.850] - **Zooko**

Somebody who's a good Rust engineer and who loves Zcash.

[00:07:37.430] - **Alfredo**

Yeah, I'm not sure if it will work it, but did you guys consider writing a specification in TLA+ or something like that. I'm not sure if you are familiar with TLA+, which is a language to write the specifications.

[00:07:56.180] - **Zooko**

I know about the language. We haven't talked about that that we haven't talked about that that we haven't talked about that we haven't talked about that we haven't talked about that we haven't talked about that It's not a bad idea. Do you want to post some a GitHub issue that says that so Nate you can look at it when it gets back from Thanksgiving?

[00:08:10.660] - **Alfredo**

Okay I can do that. 


___


### 2. Research & Implementation Updates ii) FROST

[00:08:34.660] - **Conrado**

We've been working on finishing up the FROST server. We added private key authentication. Basically, we realized that we have username and password. We have to register the server and share username with other participants. But then we realized that since we already require each participant to generate a key pair, to encrypt and authenticate communications between participants, then we could use this key pair to also authenticate with the server. So I implemented that, and now the server doesn't need the database, which is good and we remove it, they will username and password feature. So this is being reviewed, but should get merged soon. And we're progressing with other stuff, like allowing running the DKG using the the default server, and we keep working that.

[00:09:35.490] - **Dodger**

Cool. So does that make the server effectively stateless?

[00:09:37.910] - **Conrado**

Yes, which is good.

[00:09:41.410] - **Dodger**

Good. But I guess there's a small risk of a denial of service type attack.

[00:09:48.890] - **Conrado**

Yeah. We need to make this server more robust against those attacks, like have a time out, stuff like that. We might want to store session state in a database. If you need to reboot the server, then everyone who's running a session will lose the session. So we might get to store sessions in a database, but I think we can do that in a later phase after we release the first version of the server.


____

### 2. Research & Implementation Updates iii) NSM Shielded Labs updates


[00:10:41.090] - **Jason**

Yeah, so the major update since the last Arborist call is that we started polling the community to gauge sentiment on the NSM. We decided to present all three zips as a package and ask participants if they support the NSM being included in NU7. So far, we have the results back from the [ZecHub poll](https://forum.zcashcommunity.com/t/network-sustainability-mechanism-nsm/42703/207), which consisted of 20 active community members, and they unanimously supported the NSM being included in NU7.

[00:11:10.070] 

There's also a poll that went out to ecosystem engineers and included folks like core dev teams from ECC, ZF, Shielded Labs, and also community developers from organizations like Zingo, Qedit, and ChainSafe because they closely follow Zcash. We expect to have those the results by early next week.

[00:11:33.990]

Then we're organizing a [Coinholder poll](https://forum.zcashcommunity.com/t/coinholder-poll-nsm/49310/7), which there's currently a registration window for to give people the opportunity to move their exec into Orchard in order to participate. But the actual polling will take place next week after the registration window closes. I spoke to Dodger and Josh over the past week, and it sounds like both intend to circulate ZCAP and ZAC polls to the community.

[00:12:00.540] 

Shielded Labs has put together a web page at shieldedlabs.net/NSM that we'd request that they include in the poll or supporting material so that the community understands what it is and why we think it's important. And then if you guys are open to it. We'd like to work with you on raising the questions so that they're presented to the community in a way that accurately represents the NSM.

[00:12:24.310] 

Then lastly, we're waiting for the ZIP editors to come back on next step. So last week, Conrado wrote on the forum that the ZIP editors are preparing a post with feedback on whether each ZIP is feasible, safe, and useful, which he said would be posted at some point next week. We've just been waiting to see that update.

[00:12:45.210] 

Then lastly, Daira Emma brought up some concerns on Discord about the usefulness of ZIP 235, specifically that burning 60% of transaction fees don't account enough to justify The consensus change. I reiterated that we acknowledge that the fees are small and that it's always been our intention to implement a modern version of the NSM to introduce its basic functionality. Then we have every intention on adding other fee mechanisms in the future.

[00:13:18.730] 

Then I also reiterated that if consensus from the core engineers is that burning such a small portion of fees isn't worth a consensus level change, then we're open to testing the mechanism with a node software update first.


____

### 2. Research & Implementation Updates iv) NSM Discussion


[00:13:43.680] - **Arya**

Just to add some context to why or the discussions that were happening when the ZIP editors came up with the document that said the usefulness doesn't justify the complexity. NU7 is already going to be a really big update. There's concern about too much complexity from that point of view. But also ZIP 233 was discussed as possibly being used for ZSA issuance where we want to charge larger fees for creating new assets because it uses up a row in the database.

[00:14:19.100] 

We've also been discussing a update ZIP to 317, where by a standard rule, nodes would reject mempool transactions that do not burn a certain amount of funds. ZIP 235 seems less useful by comparison to taking that route, especially because that work could be done after NU7 has already been deployed. Just something to consider there.

[00:14:47.000] - **Jason**

Just going back to ZIP 233, is that going to come across as a recommendation from the ZIP editors to include in NU7 because there's some synergy there between ZSAs and what we envision the NSM to be? Because the burning mechanism in and of itself isn't the NSM. The NSM is really the full package. It's the ability to burn and then recirculate into future block rewards. But if we can get ZIP 233 in, I think that's a good compromise for NU7, given the complexity budget.

[00:15:25.960] - **Arya**

In terms of discussions, I'm not sure if it's been posted yet, but It sounds like 233 is easy to get in and very useful because we can add those standard rules later. I think the ZIP editors are going to, if they haven't already, recommend that that be included. 234 is a little bit more complicated in terms of ecosystem updates.

[00:15:48.690] 

But if Shielded Labs is willing to commit to doing that work, and if the community agrees that issuance smoothing is something that we want, then I think so far in discussions, it seems like the ZIP editors are happy to recommend that as well. It's just 235 that doesn't seem to justify the complexity because adding a standard rule after a NU7 is deployed seems easier & more useful.

[00:16:14.780] - **Jason**

Okay that's fair. That's good. It doesn't look like it's been posted to the forum yet, but it does sound like, based on what you're saying, it will be shortly.

[00:16:24.540] - **Arya**

I think it will be. So take everything I've said with a grain of salt because there may still be changes in for further discussions and review.

[00:16:32.570] - **Jason**

Thank you for that update.

[00:16:35.540] - **Dodger**

Jason, just to be clear, when you talk about polling these various groups, you're presenting the NSM as a full package. You're not asking them whether they agree with just enabling ZIP 233, you're just saying, Do you support the NSM?

[00:16:53.130] - **Jason**

Correct. Because the idea there is that if you support the NSM, then you're probably okay with ZIP 233 going in, especially since it's not contentious from our side, it's not contentious from the core engineering side. It seems like a nice compromise given the complexity budget and some of the potential sensitivities around ZIP 234. There's also a concern with presenting 233 as the NSM when it's not, like I said in my earlier comment, it's not really the NSM by itself.

[00:17:43.200] - **Dodger**

It's not, but it is a component of it that then provides that mechanism for storing those funds for future use.

[00:17:53.370] - **Jason**

Well, not really storing. It's just burning. 

[00:18:02.690] - **Dodger**

Yeah, as I've said in the past, I don't think that's good terminology, because the intention is to reissue those funds at some point in the future, correct?

[00:18:14.020] - **Jason**

Yes. If something like ZIP 234 is implemented. It's a necessary condition, right?

[00:18:21.130] - **Dodger**

ZIP 234 wouldn't be the only way. I mean, one way you can think of a network sustainability mechanism is it's just a different style of lockbox. There could be a future network upgrade that issues funds that have been burnt per ZIP 233, but using a different mechanism.

[00:18:53.550] - **Jason**

I'll have to think about that. I think there might be some differences, but yeah, I guess it I don't recall exactly how the lockbox works. How are the funds taken out of circulation or reserved for the dev fund?

[00:19:15.850] - **Dodger**

Well, actually, I'll let someone who actually knows the answer answer to that. I think Alfredo was first.

[00:19:26.270] - **Alfredo**

Yeah, I don't know the details, but I'm seeing that the main Is there a difference that the asset is getting from the fee instead of being created in the block, like the Lockbox. The Lockbox is more similar to a dev fund. But yeah, they are stored somewhere, and there's going to be a new ZIP to actually take them out from there, in any case.

[00:19:59.080] - **Zooko**

A big The difference between the whole concept of the lockbox and the whole concept of ZIP 234 is like [Chris Goes posted](https://forum.zcashcommunity.com/t/network-sustainability-mechanism-nsm/42703/216) recently, Chris Goes from Anoma posted recently. What's important to him and to me about ZIP 234 is that it's very neutral. There's no discretion. You don't have to wonder when or if devs will decide to do a thing.

[00:20:26.130] 

It's like a purely permissionless, automatic process like Bitcoin. So if Zcash doesn't merge and activate Zip 234 now, then there remains questions in people's minds like, will I do it next year or will they change their minds, or whatever? But once it's merged and activated, it's just baked in, and there's no discretion that any party has over what will happen with those funds going forward. 

[00:21:01.750] - **Arya**

In terms of how the lockbox will be distributed, I think the answer is really we just don't know yet. There is no way to distribute it yet. There have been some discussions about using Multisig or FROST to have multiple parties participate in sending funds over. But it is like the lockbox ZIP in that if we don't get ZIP 234 into this network upgrade, we still will have to get into a future network upgrade because ZIP 233 doesn't really make any sense without it or with some form of reissuing the funds that have been unissued or burned.

[00:21:42.180] - **Dodger**

 I guess we'll wait for the recommendation from the ZIP editors and also results of pause. We'll be pulling ZCAP as well, but I think we'll be giving them more of a menu to choose from rather than just an all or nothing, because I think that's a false choice.

[00:22:52.180] - **Zooko**

Happy Thanksgiving, everyone. Be grateful today, if you feel like it.


____


**Next Meeting Scheduled: 21:00 UTC December 12th 2024**


___
___
