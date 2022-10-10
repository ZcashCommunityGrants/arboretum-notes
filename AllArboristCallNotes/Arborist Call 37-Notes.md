# Arborist Call  #37 Notes

Meeting Date/Time: October 6th 2022, 15:00 UTC

Meeting Duration: 30 minutes

**Agenda**: 

+ [Zebrad Status Updates](https://youtu.be/UbHvwoJS178?t=141)
    

+ [Zcashd Status Updates](https://youtu.be/UbHvwoJS178?t=262)


+ [Open Discussion](https://youtu.be/UbHvwoJS178?t=491)


Video of the meeting: [recording](https://www.youtube.com/watch?v=UbHvwoJS178)

Moderator: Steven Smith


Notes: Jason Rogers

___

## Decisions & Action Items

i. Reach out to wallet vendors regarding new fee parameters & implementation 

___

## Full Notes



### 1. Zebrad Updates - Status Update

[02:21](https://youtu.be/UbHvwoJS178?t=141) - **Deirdre** 

Quick stuff from Zebra, we are prepping all our release candidate tagging which will be sent off for security audit and conformance audit with the Zcash spec when we tag it and lots of dependency updates, lots of tweaks to our CI.

[02:52](https://youtu.be/UbHvwoJS178?t=172) 

We are filing down all the things because we still have ongoing work including the upcoming getblocktemplate support. Better RPC support for being a lightwalletd backend and part of the work thats been happening in the past two weeks is making commitment of blocks to our state, not make calls to RPC methods or hang for several minutes or more when there are these big blocks we are seeing on mainnet right now. A lot of little things like dependency updates, making tests nicer and also state work, writing non-finalised blocks in a separate thread and trying to parallelise that so we can tag a release candidate but for the future getblocktemplate & supporting lightwalletd frontend they can make lots of queries to zebrad over the RPC and it will be very responsive and it won't be hanging or locking or lagging. 

___

### 2. Zcashd Updates i) - Status Update / 5.3.0 details

[04:021](https://youtu.be/UbHvwoJS178?t=262) - **Steven** 

Zcashd update. We have been focused largely on performance scalability improvement, the current top of our stack is a faster sync capability for our mobile sdk's. As i mentioned at the beginning of these calls, the call is about protocol development but this is an all hands on deck kind of effort. So we've got a couple of members of the core team working on this as well as our mobile team. We are getting very close on that and we'll roll out these updates for faster sync in at least a couple of sdk updates. 

[05:08](https://youtu.be/UbHvwoJS178)

Its great work going on and it's going to be a pretty significant improvement even over sync times from our mobile sdk's prior to this increased load that we're seeing. So it'll be an improvement over the steady state as it was back prior to Mid-June. There will be multiple things in 5.3.0 but the focus for 5.3.0 will be around memory optimisations for concurrent memory usage. It's some of the same thing processing larger blocks we made some changes to do things in parallel which then allowed us to exploit more resources on the system which drove up concurrent memory utilisation and it highlighted some areas we could make improvements so we made multiple improvements there. 

[06:04](https://youtu.be/UbHvwoJS178?t=364)

Also community members would hit the Out of Memory situation. Once 5.3.0 is out with other optimisations if you're running 5.3.0 and you have the recommended memory configuration on your machine then OOM should be eliminated. Great work from a number of team members on that. We are also making progress on Halo2 recursion on 3 parallel tracks. One is the frontend api, the second it backend split accumulation, the third area is circuit changes for full width scalar multiplication. 

[06:54](https://youtu.be/UbHvwoJS178?t=412)

As far as ZIP 317 goes, we've done a really exhaustive analysis of historical fee profiles / transaction profiles. Anything with fees you have to be very careful that you don't inadvertently detonate a lot of very common use cases and you really think through the impact of anything that modifies fees and anything that could impact normal usage of Zcash.

[07:27](https://youtu.be/UbHvwoJS178?t=447)

We've begun doing some implementation work around that and one the things that implementation involves is an abstraction that we are adding in to essentially make it where we can adjust fees in the future even if we did something down the road thats closer to an EIP 1559 type fee mechanism then we would have some abstractions in place that would make those changes easier. 

___

### 3. Open Discussion i) - ZIP 317 Parameter selection/analysis

[08:10](https://youtu.be/UbHvwoJS178?t=491)

Huge thank you to everyone that's worked on this Adi wrote the ZIP, Chris and Daira originally came up with the rough model. I talked Adi at Zcon3 and he took the initiative and wrote up a ZIP. Nates been doing a tonne of research into the mechanism and different parameters and Greg who's one of our new engineers joined right at Zcon3 and did a great job creating a bunch of analysis scripts for us so instead of wondering what an average transaction look like, he wrote the tools that allowed us to definitively know which was critical for us in getting to a point where we were comfortable with a set of parameters.

[09:09](https://youtu.be/UbHvwoJS178?t=549)

Then I know tonne of people have been involved in tweaking the ZIP, deirdre from Foundation the ZIP editor and I see the updates come through. Everybody thats participated in working on that, a huge shoutout and thank you. 


[09:34](https://youtu.be/UbHvwoJS178?t=574)

Specifically on ZIP 317, the parameter selection which I titled the slide. Two things, Let's define a metric called logical actions: 

     max(transparent_inputs, transparent_outputs) + 2* sprout_joinsplits + max(sapling_inputs, sapling_outputs) + orchard_actions. 

[10:08](https://youtu.be/UbHvwoJS178?t=608)

What does that mean? For a typical 2 in 2 out sapling transaction which we've always used as a logical baseline. In that use case you would have 2 logical actions. So it would be the max of 2 inputs, 2 outputs or two. The parameters, Marginal fee & Grace actions in the formula, where we have modelled fees and where we are comfortable with the way the math works, the marginal fee value would be 5000 zats & grace actions 2. The next slide has some examples of 1 in 8 out it's much easier to see with real world examples. 

[11:01](https://youtu.be/UbHvwoJS178?t=661)

If we look at a 2 logical action transaction, that could be transparent, sprout, sapling or orchard. The fees that someone would pay would be 10,000 zats. Which if you've been around Zcash long enough, that is the standard fee prior to the ZIP 313 change which lowered the standard fee to 1000 zats. Thats resetting it to pre ZIP 313 levels for the default fee. 

[11:50]https://youtu.be/UbHvwoJS178?t=710

Just explaining the table. Grace window: size of two which means you get 2 logical actions before additional fee calculations kick in. For the calculations here that are translated into dollars, it's a random ZEC price of $60. Just to have something to model with. 

[12:29](https://youtu.be/UbHvwoJS178?t=748) - **Kris**

I wanted to actually provide a little bit of colour on high level motivations behind the design choices. One of the two driving motivations was first, we wanted the fees to be proportional to the load imposed on the chain so that someone who makes a 1000 output transaction and someone that makes a 2 output transaction. You can make a 1000 output transaction but you're paying a cost proportional to the load that you impose on the ecosystem. 

[13:16](https://youtu.be/UbHvwoJS178?t=796)

The other thing that we wanted, and there's a lot more detail in the ZIP 317 draft itself. We wanted to make sure the fee mechanism we chose didn't discriminate against any of the protocols. it didn't Transparent/Sapling or Orchard. So the logical actions notion that was shown on the precious slide, the reason for that model is that we do not want orchard to be at a disadvantage compared to the other protocols. So the logical actions model basically gives us a level playing field between all of the various protocols that are active today. 

[14:18](https://youtu.be/UbHvwoJS178?t=850) - **Steven**

Excellent point. We tried to think through second order effects which is exactly what Kris said with regard to pool preference. You couldn't look at a fee mechanism and say 'I could circumvent that' or 'I could pay cheaper fees if I move all funds to the Transparent pool'. So we tried to make a level playing field with that. The other thing we did was that the math is not game-able. If you've got logical actions of 8, you're going to pay the same cumulative fee if that's one transaction with 8 logical actions or 2 transactions with 4 logical actions.

[15:08](https://youtu.be/UbHvwoJS178?t=908) - **Steven**

There would be no way to game it, instead of sending one transaction with a lot of outputs i'll send a lot of transactions with 1 output. The math works out to be identical in those cases which we were after. Just looking at a couple of examples here. Standard 2 logical action transaction would pay the fee level prior to ZIP 313. Then here's a couple of examples of 4 logical actions or 8 logical actions and what those fees would be. The interesting one is 1,152 blocks per day roughly, so if you assume I am sending a transaction every 75 seconds and I am lucky that I get one in each block and there's going to be 1152 transactions with 2 logical actions per day, what would I pay? $6.91. What would I have paid prior to this modification? $0.69.

[16:17](https://youtu.be/UbHvwoJS178?t=978)

If it's 4 logical actions I'd pay $13 a month for 1100 transactions and $27 in the case of 8 logical actions. Then the last line 1102, is based on actuals. What I asked Greg to do was to pick a random week when these sandblasting transactions are prevalent and tell me how many transactions a day fit that model? We based it on things with greater than 300 outputs, just to have a number. Thats accurate +/- some percentage factor. There was 704 sandblasting transactions per day on average and of those 704 the average number of logical actions was 1102. 

[17:25](https://youtu.be/UbHvwoJS178?t=1045)

This is based on a weeks worth of actual data and analysis so if this fee structure were in place during that average period of time the old fees would have been $0.42. But under the new fee mechanism you would be paying roughly $2,300 per day for that same usage. You can see that it's a significant increase over what it was previously but to Kris' point this transaction obviously is using a lot more network resources than these other much smaller transactions.

[18:16](https://youtu.be/UbHvwoJS178?t=1096)

The math on that which everyone can do here themselves, if this were to happen everyday which we have seen go on for weeks, then your cost per month is $69,000 vs $12. This is meant to make fees proportional to usage for the most part. 

___

### 3. Open Discussion ii) - Fee Mechanism Roadmap 


[19:12](https://youtu.be/UbHvwoJS178?t=1154) - **Nate**

First I wanted to start back to give broader context in case people are watching recordings of this and then talk a bit about use cases and roadmap. The broad context is 'Why are we changing fees?', Kris already alluded to it, we want to make sure that users are paying based on the cost they are imposing on the network. So generally during this latest period with performance issues, one thing we've been doing is improving the performance but that doesn't actually necessarily reduce over usage. Fees are the only way to do that plausibly in my opinion. Thats the big picture of why we are changing fees.

[20:13](https://youtu.be/UbHvwoJS178?t=1213)

The second topic was Use Cases. This change impacts use cases that use more inputs or outputs and we've brainstormed some of those but there may be some that we are not aware of. It's really important as we are deploying this to do our best to learn from different users from different use cases if this is a problem for them. Some uses cases that pop immediately to mind would be cases where you are paying many recipients so that might be mining pools, or cases where you are receiving many incoming payments, that could also be mining pools or people taking donations or small businesses. 

[21:10](https://youtu.be/UbHvwoJS178?t=1270)

Another concrete example is Devfund orgs, they receive one transfer in each block as part of the consensus rules so this raises their fees for receiving those funds, notably. I did a back of the envelope calculation & it works out to something like $200 per month. Thats something to be aware of. Changing fees in this way seems necessary for the network to remain sustainable and it will impact use cases that use a lot of inputs or outputs and we should keep our eyes wide open for that. 

[21:55](https://youtu.be/UbHvwoJS178?t=1315)

The third piece was Roadmap. I see this as a first step in improving fees. I think we should follow it up with more improvements. The main flaw i see this has is hardcoded parameters for the amount of fees & we are not sure if that's the right level for a given amount of usage especially as time develops and there is new users or new use cases and they will have different demand for making transactions. Down the road after this is deployed I am pretty keen on doing something like EIP 1559 although there could be other options like a Bitcoin style fee market but the general goal is to have fee's adjust dynamically with the actual demand & usage of the network in a way that removes discretion from developers. I would like to get out of the business of every few months developers picking fee schedules on a table. Thats how I am thinking of the longer term Roadmap. 

[23:24](https://youtu.be/UbHvwoJS178?t=1403)

Zooming back to the very short term, since these are the parameters we propose we should be reaching out to wallet developers as soon as possible. Today I want to see if I can get all of the shielded wallet developers & maybe even other wallet developers into a call to explain this to them & ask if it makes sense or if they have any concerns implementing it. 

[23:57](https://youtu.be/UbHvwoJS178?t=1437)

This is also predicated on the idea that wallets can roll out using these fees before the network begins enforcing that these fees are required. We want to get the wallets to start doing that as quickly as possible so we can learn if there is any deployment issues or issues with users of those wallets versus other wallets etc. That's a tour of the Roadmap. 

[24:29](https://youtu.be/UbHvwoJS178?t=1468) - **Steven**

Another key point is all Greg's great analysis that he's done to help us make a good informed decision on some of these parameters we can use to see progression in how that rollout is going. So we can look at what transactions are seen, what the fees are associated with the transaction. Are they what we are proposing they should be? or are they still the default and then we can gauge how the rollout across the ecosystem is going. 

[25:11](https://youtu.be/UbHvwoJS178?t=1511) - **Nate**

I really would like to have wallet developers attend this meeting regularly. I see Adi from Nighthawk show up a lot and thats great but in my opinion protocol development really requires wallet developers to be participating because the whole purpose of the protocol is to enable wallets. I am going to try to encourage them to show up more if they can. 

[26:33](https://youtu.be/UbHvwoJS178?t=1593)

I am not as familiar with the ZIP lifecycles as I wish i were. I was of the opinion of reaching out to wallet developers right away and pointing them at whichever pull request or draft seems the most relevant to me without waiting for the official ZIP status to reach any particular stage. Is that the right thing to do?

[27:25](https://youtu.be/UbHvwoJS178?t=1645) - **Daira**

Yes, that is the right thing to do. In this particular case I think the ZIP can be published pretty much today anyway so you might be able to refer to that in the published form. Remember, ZIPs are not like RFC's so they can be updated, it's not a heavyweight errata process to do corrections to them. They can be published in draft form and finalised later. 

[28:06](https://youtu.be/UbHvwoJS178?t=1685) - **Nate**

Can you remind me of the lifecycle or the maturity stages and what those indicate?

[28:14](https://youtu.be/UbHvwoJS178?t=1693) - **Daira**

The simple case for a ZIP like this, wallet & standards track. It starts off as a pull request and during that period there will usually be a stub page on where the ZIP is going to be on zips.zcash and then the PR is merged, normally as a draft. It will stay in draft for some period, get comments on it and then it will go to either active or final. Active would be for something that is not implemented. The final status is just something that has a one shot implementation and after it's done it doesn't need to be changed again. Active is for something that is more dynamic and can be changed in future. 

[29:34](https://youtu.be/UbHvwoJS178?t=1772) - **Nate**

Okay, should this ZIP enter the active state or is it draft?

[29:40](https://youtu.be/UbHvwoJS178?t=1779) - **Daira**

It should enter the active state when it has been implemented by at least one wallet. 

___
___

**Next Meeting Scheduled For: October 20th 21:30 UTC**
