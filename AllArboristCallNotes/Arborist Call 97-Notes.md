# Arborist Call #97 Notes 

Meeting Date/Time: 20th March 2025 21:00 UTC

Meeting Duration: 1 hour


**Agenda**: 

+ Welcome and Meeting Intro - []()

+ ECC Core Update - []() 

+ Research & Implementation Updates - []() / []()
+ 
+ Open Announcements - []() / []()

+ Open Discussion - []() / []()

___

### Decisions and Action Items

i) Post details for Zenith wallet using FROST + Cwtch to Forum - Pitmutt

ii)  Address security and privacy section in ZIP 231 - ECC


___

Video of the meeting: [recorded](https://www.youtube.com/watch?v=ksBEOo2Zja8)

Moderator: Dan

Notes: Jason Rogers

___



## Full Notes



___


### 1. Research & Implementation Updates i) Crosslink Deployment Milestone 1

[00:03:25.56] - **Nate**

So we've completed the [first milestone](https://forum.zcashcommunity.com/t/shielded-labs-crosslink-deployment-updates/49706/4) we set out on our [roadmap](https://shieldedlabs.net/crosslink-roadmap-q1-2025/). We had a blog post just a short while ago. So this milestone is like laying the groundwork, basically.

[00:03:50.50] 

We've modified Zebra and then also Zaino and Zcash dev tool to all work together. And then we've begun making new RPC interfaces related to finality. So the main result is we made a little demo that shows using a light client to do something that's like a regtest mode operation, where it can instruct the zebra node to just change arbitrarily its concept of `finality. So to different specific block hashes. So that's getting the ball rolling.

[00:04:37.40] 

We understand how to modify all those components and we also have been doing this a vertical slice approach to our milestones, where we try to deliver something for every piece of the stack that we want to deliver in the end. So that includes some documentation updates, placeholder for a ZIP, and many things like this. Another piece I wanted to call out is we've also been keen to figure out how to do upstream collaboration and send stuff upstream.

[00:05:22.36] 

One thing we've worked on is taking the NSM PRs against Zebra. They largely consisted of creating the new transaction format, and then the actual ZIP 233 that adds the new field to the transaction is relatively modest compared to all of the code changes that just make the transaction format. So we thought we would split that up into two PRs, and one just makes the transaction format change.

[00:06:04.34] 

And so this is just our way of getting involved in submitting stuff to upstream and also trying to coordinate people around how to roll out new transaction formats in the future earlier, because we'll definitely need a new transaction format for some of the crosslink stuff down the road.

[00:06:27.31] 

So next, our goal is Milestone 2. So that's something we call disconnected BFT. So this first milestone doesn't do anything with proof of stake or BFT. It just adds an RPC pathway from clients to zebra. The goal for the next milestone is to integrate this SDK called Malachite, which is a Rust implementation of tendermint. So we want to integrate that into Zebra, but we're doing it in such a way that we don't modify any of the proof of work consensus.

[00:07:13.37] 

So nothing changes about the blocks or the transactions. Instead, we have this new BFT component glued on, and it will be speaking to the other BFT components of nodes in a network to come to consensus about what the order of the proof of work blocks is. And one thing we want to get out of that milestone is something we call "mainnet shadowing mode". So the idea here is we thought it would be fun if we could allow users, anyone who's interested, to run this milestone 2 prototype and connect it to the real mainnet.

[00:07:59.50] 

What this would be doing is everyone who's participating would be connected in a BFT network. It's just a testnet. It doesn't interact with mainnet at all, except it's reading from mainnet, so it's read-only. And it's just a way to exercise having the two protocols running simultaneously. And so that's the goal for the next milestone. Our target date for that is June 1st.

[00:08:31.04] 

The final piece is we're noticing all kinds of ways that we want to collaborate across organizations. So I mentioned the transaction format thing. Another thing we've run into is just generally, when trying to figure out the software architecture decisions, we want to be collaborating with a lot of teams, especially the Zebra team. But we also modified Zaino to make our current milestone work, and the Zcash dev wallet tool and librustzcash.

[00:09:08.01] 

So all of those pieces, we want to figure out the architectural approach you want to take, such as what kind of RPC connections do we want to be adding to these components, and then make sure that those work with the other upstream projects. So we have a need to coordinate across all these teams on our roadmap early so that what we build works for all those components.

[00:09:39.13] 

Then another thing we're getting started on is we have a list of vendors and dev teams who we consider stakeholders. And so we're going to start more actively reaching out to them. And the idea there is we want to get early feedback from them on our milestones and say, hey, this is what we're building. Is it useful to you? Do you prefer it would be different in some way? Or things of that nature so that as the prototype matures, we know we're heading in a direction that all of those vendors and other projects are aware of and hopefully can integrate down the road.

[00:10:26.07] 

Let's see, any other questions or thoughts about this? Yeah, I would also direct people, generally, if you go to schildedlabs. Net and look at our blog, you can find our road map blog posts. And so we're still concluding the first milestone moving on to the second. So if you're curious, what's next, you can go review that. Great.

[00:10:56.08] - **Dan**

Thank you, Nate. I guess I'll do one more call for any other Any follow-ups on Crosslink or questions for Nate or anybody from Shielded Labs? All right, I see Kris joined, so I'm going to go back to the ECC updates real quick. Kris?



____


### 2. ECC Update -  Zallet, Zaino, ECC Mobile SDK and Crate Releases


[00:11:15.55] - **Kris**

So the main effort over the last couple of weeks, apart from Zcon stuff, we have been integrating... So Str4d has been integrating Zaino with Zallet, and we now have syncing, essentially working in Zallet using Zaino as a library, so that's a good step forward in the process. We've discovered a bunch of bits and pieces that we're going to need going forward. And so I think Str4d is in the process of making issues for those the Zaino teams repository.

[00:12:02.41] 

The other thing that's been on our plate has been we're releasing new Crate releases for Zcash keys, Zcash client back-end, and Zcash Client, SQLite, and new releases of the ECC wallet SDKs. These add essentially transparent gap limit handling. So the way that Bitcoin-derived wallets handle address rotation means that for transparent addresses means that in recovery, you need to do this process of searching for addresses that might hold funds. That's now in place. So that's going to be in the next release of Zashi this coming week. We've also added some functionality to Zcash Client SQLite to fix a bug where you could have a potential corruption of no commitment trees.

[00:13:05.59] 

And so that's also going to go out in this release, and there will be those crates are going out in the next couple of days. Apart from that, we've been doing some ZIP specification work on future community governance models that Josh is going to present in the next few days. That's, I think, it.

____

### 3. Research & Implementation Updates ii) NSM update 


[00:14:13.53] - **Jason**

So in the the last Arborist call on February 20th, I provided an update on the integration work that we're doing. For ZIP 233, we had removed feature flags and added NU7 along with the V6 transaction format. For ZIPs 234 and 235. We developed separate feature flags for each. We also removed feature flags from librustzcash, updated the test vectors for V6 transactions, and at that time had rebased all PRs on the latest upstream, except for librustzcash, which still remains on the December 2024 version.

[00:14:52.01] 

Since then, like the past month, we haven't been able to make further progress. We are waiting on a few PRs to be that were merged. One is [9300](https://github.com/ZcashFoundation/zebra/pull/9300), which updates zebra dependencies to use the latest librustzcash, and this will allow us to rebase the librustzcash PR to the main branch. Then, additionally, Arya indicated or asked us that reviewing the ZIP 233 implementation would be on hold until after [9256](https://github.com/ZcashFoundation/zebra/pull/9256) is merged. And that's the PR that introduces NU7 constraints in a way that aligns with the ZSA work. So what we're wondering today is if we can get an update on when these PRs are expected to be merged.

[00:15:43.45]

I know it doesn't sound like anybody from ZF is on the call, but I wonder if maybe Str4d or Kris might be able to answer that.

[00:15:54.11] - **Kris**

So we have not had time in the last couple of weeks to look at these, but we can prioritize that.

[00:16:07.36] - **Jason**

Okay, great. Thank you.

[00:16:14.34] - **Dan**

Anything else on the NSM or questions for Jason?

[00:16:17.49] - **Kris**

Just as a note, if there are things like that where it's totally fine to keep reminding us that we need to look at things and ping us in Discord or on Signal or wherever and be like, Hey, friendly reminder, because stuff gets lost easily along everything else we're doing.

[00:16:38.19] - **Jason**

Okay. Yeah, I think Mariusz has done that. He just hasn't been overly aggressive about it. So the last update was probably a couple of weeks ago. So we'll be more diligent about that.


___


### 4. Open Announcements i) Community Notetaker :)


[00:16:51.48] - **Dan**

Now to open announcements, if anybody has one of those.

[00:17:21.13] - **Jason**

I'll just call out that today is Jason's last day as a community notetaker. He's been doing this for two years. He's done an awesome job. So thank you, Jason. ZCG is actively looking for his report for placement. We have a few strong cabinets that we expect to have somebody in place by the next Arborist call on March 3rd. And if the replacement isn't confirmed by then, then Artkor is going to step in temporarily until we bring on somebody permanently.

[00:17:56.28] - **Nate**

Yeah, thanks a lot. I really appreciate it.

[00:18:00.51] - **Dan**

Yeah, I second that. Squirel, you did an amazing job.

[00:18:04.55] - **Jason**

Definitely.

[00:18:10.32] - **Dan**

Any other open announcements?

[00:18:14.21] - **Nate**

Can I just give a little more love to squirrel because when I took a break from work, my only connection really to Zcash was just catching up on the notes threads. And I really liked having that resource. It was a great thing to follow. So I really appreciate it.



___


### 4. Open Announcements iI) Zenith FROST Integration Grant Proposal 

[00:18:40.37] - **Dan**

Open discussion. Jason, you reached out about two things. Would you like to jump into those?

[00:19:13.09] - **Jason**

Yeah. So the first thing is for ZCG I don't think Rene is on this call, but he's a developer for Zenith, which is a full node Zebra wallet. He recently submitted a grant proposal to add support for Frost and also an integration with Keystone. And we wanted to hear from the core development teams on this call, whether they are using or plan to use Zenith, or if you know anybody who is using it. Basically, what we're trying to determine is that given that we have limited funding, does it make sense to fund these integrations now? Do they provide meaningful value to the ecosystem? Who's using it?

[00:19:57.04] - **Dan**

Rene did jump in here as well, if anybody has any questions I think he had some additional questions, too. Yeah. Yeah. Rene, if you want to speak, feel free.

[00:20:12.13] - **Rene**

Well, the feedback that I was hoping to get, although I don't think we have anybody from ZF right now, is based on our proposed approach to perform the frost multisig ceremonies It would allow us to do it without a server. It would be decentralized. It is end-to-end encrypted, it is peer-to-peer, and it is routed through Tor. It does seem to match all the criteria specified on the Frost book for broadcast channel and the communication channels. But we definitely wanted to hear what the Frost team thinks about that idea.

[00:21:07.08] - **Dan**

Yeah, it looks like still nobody from the Frost side. Does anybody have a response to what Rene brought up? 

[00:21:16.26] - **Nate**

I don't have a super specific opinion, and I'm not too familiar with all of the needs, but what you just described sounds cool to me. So I was going to see if I could maybe be like an alpha tester or beta tester. Will the Frost support be like open source that I can try out before it's ready?

[00:21:44.19] - **Rene**

Yeah, All our code is on our repo. We've already wrapped this communication protocol. The protocol is called [Cwtch](https://docs.cwtch.im/docs/intro). I believe that's how you pronounce it. It's a Welsh word, and I don't know if anybody can pronounce Welsh. And the protocol already exists. People can try it on their phones.

[00:22:08.12] - **Rene**

Right now, it's used for chat, but given its properties, we can use it to have two of our wallets talk to each other and pass each other information through that protocol. And that's what we're trying to implement. We already have ported it to Haskell. So our plan is to embed one of these cwtch nodes into each of our wallets so they can pass that information to each other, especially for the ceremonies in which we need to pass around the intermediary steps for key generation and for signatures. It gives us that opportunity to do it in a decentralized way. It's encrypted, and it also has that part that would be missing to do it all on-chain, which is validating that it's coming from the person that it says it's coming from because it does two-way authentication. It seems to be a really good fit for the application.

[00:23:17.42] 

That's what we wanted to get from the frost team to see if they agree.

[00:23:29.40] - **Dan**

Thank Rene. Any other thoughts? I haven't been checking the chat here. Let's see. Dodger mentioned to you, Rene, I believe, to post some details on the form and tag Conrado.

[00:23:45.19] - **Rene**

I can definitely do that.

[00:23:50.35] - **Jason**

Cool.


___

### 5 Open Discussion i) ZIP Process improvements


[00:23:53.01] - **Dan**

Any other topics for our open discussion?

[00:24:03.52] - **Jason**

I have one more, but I noticed that a lot of people are missing from today's call. So what I'll likely do is just talk about it. It's related to the ZIP process, so I think it's pertinent to Kris and Strad. And then what I can do is just follow up with a forum post or something.

[00:24:26.19] 

Recently, I've been thinking a lot about the ZIP process and how we can improve it. The NSM ZIPs that we did a year or so ago took significantly longer than expected, and I wanted to make sure that we don't run into similar issues for the Crosslink ZIPs that are coming up. I'm hoping we can make the ZIP process more efficient. To help with this, one thing that I've done is I've asked the three engineers that we recently hired at Shielded Labs to attend the ZIP meetings with the goal of eventually becoming ZIP editors. And with more ZIP editors, I think the workload could be divided into two or more groups, which would allow for faster and more manageable reviews that should make the process more efficient.

[00:25:07.24] 

But I've also noticed some other issues with the ZIP process. So [ZIP 0](https://zips.z.cash/zip-0000) outlines the required sections of the ZIP. And one of those sections is called "Security and Privacy Considerations". However, out of the 10 ZIPs being considered for inclusion in NU7, only two include this section. Now, furthermore, ZIP 0 does not clearly define who is responsible for assessing security and privacy implications of a proposed feature or upgrade. It states in one section, it is not the primary responsibility of the ZIP editors to review proposals for security, correctness, or implementability. But then in another section, it notes that ZIP editors may reject a proposal if it has manifest security flaws, including being unrealistically dependent on user vigilance to avoid security weaknesses.

[00:26:05.04] 

The question is, where does the responsibility lie in ensuring a thorough assessment of security and privacy issues? This is going to be relevant to crosslink ZIPs and other ZIPs that we do. So just to be clear, we didn't do a security and privacy consideration section in the 3 NSM ZIPs that we put forward, but we did make the ZIPs publicly available for community feedback, and at the same time that we submitted them to ZIP editors for review. And what this allowed was security concerns were raised, and we discussed them as part of the process.

[00:26:42.38] 

But for some of the current ZIPs, there doesn't appear to have been a request for public feedback or an assessment of potential security and privacy risks. And I'll give you an example. ZIP 231, it allows for variable length memo fields in transactions. And currently, the memos are fixed at 512 bytes. And ZIP 231 removes this constraint, which could create new attack vectors because variations in memo size leak information.

[00:27:14.13] 

And so I think the intentions behind this ZIP are good because they offer greater flexibility for application, but there's no documented analysis on the security implications, and that demonstrates a significant gap in the process that could ultimately lead to an unintentional compromise of user privacy. But my point here is not to pick on ZIP 231. It's just another example of how the ZIP process has issues and it needs to be reformed or rethought.

[00:27:52.24] 

We discussed these issues with Taylor Hornby last week, and some potential solutions that came up were having a transparent analysis and public discussion focused on the benefits and risks of proposed features and upgrades. ZIP 231, for example, my understanding is that it breaks the wallet threat model doc that Taylor put together while at ECC, but it's not clear if anybody is aware of that or is even paying attention to that document.

[00:28:23.08] - **Kris**

I will say that we actually had extensive discussions on this point in the ZIP ZIP 231.

[00:28:31.27] - **Jason**

Who we though?

[00:28:33.17] - **Kris**

Well, the ECC engineers.

[00:28:36.20] - **Jason**

Okay, but does anybody know that? So that's the problem, right?

[00:28:39.17] - **Kris**

Yeah. I think that you're right, that was not adequately documented in that ZIP.

[00:28:45.25] - **Jason**

Okay. And then the second point is, fix the ambiguity in ZIP 0 and make it clear who's responsible for assessing security and privacy risks. And then the third thing is, if somebody has a question or challenge about the security of a ZIP or any other issue with a ZIP, who should they raise it to? It's unclear if it should go to the ZIP editors, the ZIP authors, or just randomly raise to the community. There's no process in place. I think that's something that we should fix.

[00:29:20.51] - **Str4d**

Okay, I'm just going to jump in and say that you are misunderstanding the ZIP Format Instruction section of ZIP 0. Each ZIP should have the following parts. A should is not a requirement. Should is defined in BCP 14 as a… Let me go get the exact wording. Rfc-2119, HTML. "Should" means that there may exist valid reasons to ignore a particular requirement. The full implications should be understood, but it is not a requirement for that section to be there.

[00:30:00.17] - **Jason**

Okay, I understand that. Based on my reading, it does say not applicable. But I still think more often than not, a feature or change to the protocol will have certain security implications that should be addressed or discussed or documented somewhere.

[00:30:19.11] - **Str4d**

Indeed. I think at least, again, using ZIP 31 as the example you give there, we give most of that rationale in the Rationale section. We have various discussions about the effect of various choices made in the ZIP and why those choices were made. And some of those rationales are security and privacy rationales.

[00:30:52.16] 

So the useful change that could be made here is to better distinguish security and privacy rationale from other rationale, which could be done in more general in ZIPs. But the general reasoning of whether or not there needs to be security rationale, I agree that in general there should be, but the responsibility for that fundamentally comes down to the authors to do because the ZIP editors can't force an author to write something or not write something.

[00:31:45.55] - **Kris**

It's totally legitimate for you to be calling us out on that we didn't write a security and privacy section in the ZIP, and we'll go fix that. This is how it's supposed to work.

[00:31:58.28] - **Str4d**

Yes. With my With the hat on, yes, we should have put that into a section there. With my ZIP editor hat on, I can look at that and see that there is rationale there that covers that. I don't see it as a necessary change, but from a readability point of view, I agree that it would be useful, yes. Likewise for some of the ZIPs, I expect that, for example, if we went back and looked at the long history of the ZSA ZIPs, there were probably aspects there that led to additional security and privacy rationale that came up through the various rounds of review that went on that.

[00:32:36.29] - **Jason**

Yeah, there were the two ZSA ZIPs actually did have that section in there, but the other 8 did not. These are the NU7 candidates. There were 10 of them.

[00:32:52.46] - **Nate**

I was thinking that part of ZIP 0 that says should. I would prefer a different thing, which is that it must have a section. And then if it doesn't seem applicable, there's just a sentence or two that's like, security and privacy issues don't matter for this because X. Well, yeah, the main thing that seems important to do is to make it clear the distinction between that hasn't been covered yet versus that was covered but deemed unimportant or something like that.

[00:33:38.04] - **Str4d**

I think it is definitely useful to memorialize discussions that were had because that can be very useful for subsequent security analysis. But as long as they are memorialized somewhere, I'm personally not too worried about whether it is in a explicit security and privacy conservation section or rationale section. It can, to some extent, depend on the flow of the ZIP in terms of what ends up being easier to explain to the reader. Readability is an important aspect of ZIPs.

[00:34:16.47] - **Jason**

Let me change the question a little bit by using a different example. When is it that the security analysis should occur? If you take ZIP 234, which is for the NSM, and it's the one that smooths out the issuance curve, is that something that would be done during the initial ZIP submission, or is it done during the implementation, or is it done both?

[00:34:46.31] - **Str4d**

For something that has consensus level mechanism impacts, the existing deployment process for network upgrades essentially requires these things to be done by selection of the mainnet activation height because otherwise we're deploying something that we aren't necessarily convinced is secure or works within cooperation with the rest of the changes going in.

[00:35:31.13] 

So normatively, it has to be done by then. In practice, you would want it to be done ahead of any spec audits going on because the spec audits would then take into account the rationales provided. So this is one of those... It has to happen at some point, and generally, either before or early on in the implementation is probably generally when that's going to happen, except in my idealized form where the implementation is happening in a cycle, in a small loop so that we're able to improve the specs based on the implementations.

[00:36:15.58] 

But if you think of the final production implementation that we want to go into production, I would hope that by the time we get to that point that the spec is pretty well fleshed out of that point, including whatever rationales that need to be had, security or otherwise.

[00:36:41.11] - **Nate**

Oh, yeah. I mean, this is, again, just to brainstorm, but it feels like... To me, it feels like we would want something about security and privacy rationale, at least, before for the community ZIP selection process, which my impression of what that process is, is that it's somewhat murky. And I'm assuming that that process should happen relatively early in the implementation process just to avoid teams spending a lot of effort or money building something out that isn't accepted by the community.

[00:37:38.10] 

But I guess this is always a problem with this process, because early on, it may be hard to decide because there's not enough specificity or people aren't sure what the final form looks like. But also late in the process, it's unfortunate to be like, oh, well, team spent a couple of years building this thing, but actually the community rejects it. I feel like part of what could be helpful, everything I thought you said, Str4d made sense in terms of if we know what we're building and going to ship, then the process or the ordering should line up that way. I'm just wondering if we can push even more before a community decision point, or if we can clarify how the community decision process looks like.

[00:38:56.52] - **Nate**

That's a separate kettle of worms there. It is. It's a kettle of worms, but a lot of practical stuff hangs off of it, right? 

[00:39:08.08] - **Str4d**

I mean, as another example, there's a change that was going through for ZSAs, that qedit proposed for a change to how action groups interacted with ZSA burns and a move into that. And it was just proposed as a change to the transaction format necessary for subsequent proposed usage in atomic swaps. When the ZIP editors sat down to work through it, we worked out that there were privacy implications of this change.

[00:39:44.30] 

So we actually ended up having a long discussion there to figure out, Okay, what are the implications of this? What is the trade-offs that we're getting based on the extra functionality and whatever? Eventually came to a conclusion that there is a privacy tradeoff with this, but we're comfortable enough with the understanding of the implications there that we're okay with the proposal that qedit's made to make that change, as well as we proposed a way that this privacy thing could be potentially fixed, although given that this was proposed so late in the process, it's basically not practical to do.

[00:40:26.18] 

Instead, there's a proposal for what issuers can do outside of the protocol to address this privacy limitation of the change. These kinds of changes will happen all throughout the process, and any feedback, any change on a spec is going to potentially impact the rationale in general and the security and privacy rationale in specifics. Trying to say it is definitely going to be done by a certain point is going to be regularly adjusted as the real process hits the road. So we need flexibility in there at some points.

[00:41:19.49] - **Nate**

I'm almost wondering, to me, this sounds like a process where we need smaller incremental iterations. But again, I don't know how... Because it could be the case that in terms of governance and what the community wants, they do want feature X, and then And then six months into its implementation, everyone learns that it requires certain tradeoffs or has certain implications that nobody was aware of earlier. So there can be multiple decision points, even from a governance standpoint, not just a engineering making stuff work safely standpoint. So I'm wondering if we want to seek out something that's more iterative or what? I don't know. I'm just talking off the top of my head. 

___

### 5 Open Discussion ii) ZIP Process improvements cont.

[00:42:24.12] - **Zooko**

Can you give me a further pointer, Strad, into the documentation of this privacy trade-off and issuer workarounds? Which ZIP is it?

[00:42:37.19] - **Str4d**

That specific one was 226. There's a ZIPs. Let me go pull up the PR.

[00:42:43.46] - **Zooko**

Yeah, I have 226 open.

[00:42:45.47] - **Kris**

There's a bunch of discussion in the history.

[00:42:50.16] - **Str4d**

No, we haven't merged the change yet, but the PR was open separately to discuss the change there. It's [PR 991](https://github.com/zcash/zips/pull/991).

[00:43:00.47] - **Zooko**

Okay, so it's PR 991 and Zcash ZIPs Repo?

[00:43:17.01] - **Nate**

So there's the topic of improving the ZIP process or making it clearer, but then it runs into the can of worms of how we decide what should go into upgrades. And it feels like easiest for us to improve the ZIP process without dealing with the can of worms, but I feel like that can get us only so far. And so sooner or later, it behooves us as a community to figure the can of worms or the next iteration of worms V2. And I'm just not sure how to get that process started or who should be responsible for moving it along or anything like that?

[00:44:20.52] - **Str4d**

Well, as far as a change to ZIP 0 goes, the process for a change there is like any other ZIP. If someone has a proposal for a change, making a PR with a proposed diff on ZIP 0, or now that we have, I'll have to have a think with the other ZIP editors as to whether it would make sense as a 2000 series ZIP for For now, the easiest thing is just make a proposed diff on ZIP 0 with the change, so we can be discussing a concrete proposed change.

[00:44:55.38] 

Then that makes it very easy to then go, Okay, what are the What are the trade offs with the changes there? For instance, the one discussed earlier about, currently it is not required there to be a security section. Maybe it should be. If that's the proposal that we require that section, that's a great PR for someone to put up that we can concretely discuss.

[00:45:19.54] - **Nate**

Yeah, that one's nice and specific.

[00:45:22.16] - **Jason**

I can propose a few changes that I mentioned today and have them ready for the discussion at the next call.

[00:45:31.12] - **Str4d**

Yeah, that thing would be very useful too. In general, being able to comment on a proposal ahead of... I'm going to be able to give better feedback on a proposal I've had a chance to see ahead of time, put it that way.

[00:45:56.51] - **Jason**

What percentage of the community do you think actually reads these ZIPs? We vote on these in polls, or we were going to vote on NU7 candidates in a poll, and it's not clear what the status of that poll is. Sure, we'll find out in the next couple of weeks. But do you really think that the majority of respondents are taking the time to read and understand these ZIPs? I would think no. If And if that's the case, then do we need to do a better job of communicating executives' summaries and trade offs that are being made, assumptions that are being made to the community for them to review as a more digestible way to make a informed decision?

[00:46:52.19] - **Str4d**

No, absolutely. The process of writing ZIPs is very hard because trying to serve multiple different users. Because it has to be correct as a specification. It has to be sound and implementable and unambiguous. Those words are in tension with comprehensible and understandable by someone who isn't the person implementing it.

[00:47:26.08] 

Generally, the way that most ZIPs have tried to thread that is the motivation section has generally been what we've tried to make the most approachable. Then depending on the ZIP proposal, some of them there's been a fair bit of wordsmithing. On the specifications themselves. For example, the Funding Stream ZIPs for what became 1015, we had a bunch of draughts prior to that, but also the series 1001 through 1012. There was a lot of work put in by the ZIP editors. ZIPs were being proposed by the community, and ostensibly  under the ZIP process, it's on the community to make their case and to write those ZIPs in a way that people can parse and understand. But we put in a lot of effort to craft and shape those ZIPs to put their best foot forward so that the community had a chance of understanding.

[00:48:36.41] 

But even with that, it's still a wall of text, and a wall of text is a lot for people to read.

[00:48:51.46] - **Zooko**

So today, if I go to ZIP 226, I can see the privacy and security rationale And I can see updates to it and so forth. So I know that someone has analyzed this aspect of it. Today, for ZIP 231, there's no evidence that anyone has analyzed that aspect of it, although I totally believe what Kris says that some people have in great detail, but they just didn't write it down.

[00:49:24.17] 

But there could be of other ZIPs. If I go to the 10 ZIPs and Jason says 8 of them don't have security and privacy sections, I honestly don't know if anybody has looked at the risks or privacy issues of any of the other 8. I don't know my point. My point is ZIP 0 says ZIP editors might do that, but they might not. So it also doesn't help me. And I'm not saying the ZIP editors should, but I'm saying, I don't know. How can I tell if anyone has?

[00:49:58.56] - **Jason**

Well, if it's not the ZIP editors, who is it? Do you want some independent security assessment done? Should that be a requirement? That's another thing that I wanted to clarify in the ZIP.

[00:50:11.14] - **Kris**

I think that it's the responsibility of the ZIP editors to make sure that if security and privacy considerations apply to a ZIP, that they're discussed. Again, I agree that ZIP 231 and the rest of these probably should have security and privacy sections. So, yeah, let's do it. That's a great suggestion.

[00:50:50.46] - **Kris**

So the ZIP editors can be responsible for ensuring that that analysis section is present and does all the other things that we as ZIP editors do is legible. And if there are questions that we raise them and so forth, it's ultimately up to the ZIP authors to have performed that analysis or have had that analysis performed on their behalf. And then in terms of integration into the protocol, that's essentially the whole governance discussion that, to be quite frank about it, has been relatively informal before now because so few entities were involved in the process. So, yeah, it is time where we need a governance process so that when we're voting on things, that All the i's are dotted and the t's are crossed.

[00:52:19.04] - **Nate**

So one takeaway is we could maybe make a PR against ZIP 0. But I feel like there's another takeaway, whereas we all want more clarity about the governance process. But I don't know what the takeaway is yet, except we've documented that-

[00:52:46.54] - **Zooko**

Let me interrupt because you said we all want, and I don't want that, whatever it was you're talking about. Anyway, I don't really see the connection. I'm not concerned about governance. I just want to be able to track down, based on publicly visible documentation, which things have been analyzed for security and privacy.

[00:53:11.03] - **Nate**

But if you switch out your hat and now you're a ZIP author, don't you want to know what do I need to do to get this into the protocol? That's the same answer for that.

[00:53:31.49] - **Zooko**

I just think it's really useful to separate decision making from information gathering. There's lots of ways that we could improve governance that would worsen governance. But the only problem with producing the information is it takes time. But other than that, it's always good to have the analysis if we can, if we can afford it. Anyway, never mind. You just said we all agree on something, and there, that was a mistake. I'm going to just mute my mic again.

[00:53:58.42] - **Nate**

Yeah, I take it back.

[00:54:07.23] - **Str4d**

The other thing that I wanted to note there is that in terms of the checks and when things happen, the presence or not of knowing whether someone has looked at it from a security privacy perspective, while a spec audit potentially covers that depending on the scope. That also comes down to whoever is sorting out general spec audits of the changes going into a network upgrade overall versus for more complex subcomponents, specific audits of those subcomponents on their own.

[00:54:52.02] 

In past network upgrades, we've generally had overall audits that have been done for either the full set of smaller changes that are being made or the large protocol item, naming no names, but Sapling an Orchard, the behemoth model that they were. Those were a coordinated at a time where it was easier to corral the relevant people into a meet to make progress on those things. It's harder to do that now. To some extent, needing to shard those pieces out and decentralize the responsibilities for working on those pieces is an inevitable side effect of the lovely goal of having more people involved.

[00:55:53.06] - **Dan**

All right, I'm seeing head nods and thumbs up. I'll just read something Rene posted so that it's in the recording. this is in response to something Jason said. "I think that if there will be executive summaries of ZIPs, it would be useful to add a section of impacted stakeholders, for example, quote, all wallets need to make changes". So since Nate brought up takeaways, one thing I took away and agree with Jason said is a large amount in the community definitely are not digging into these ZIPs in detail and executive summaries would be useful.

[00:56:30.41] - **Kris**

I mean, all ZIPs are required to have an abstract, which is intended to be exactly that.

[00:56:40.08] - **Dan**

Do they all? I mean, the 10 for NU7?

[00:56:45.14] - **Str4d**

Those definitely do.

[00:56:47.35] - **Jason**

They definitely have abstracts, but the abstracts don't really give that much information. They don't talk about who impacted stakeholders are. They don't talk about what security considerations were assessed and so on and so forth. It's really just a summary. I saw something in here worth noting that some of the motivation sections should be up for best work of fiction awards. I feel like our ZIPs try to be as straightforward as possible. I feel like the motivation sections are sometimes try to serve as the executive summary. But again, they don't cover everything that people need to assess to make an informed decision.

[00:57:37.34] - **Kris**

That says to me that we need to improve the abstracts. I don't think that it says that we need a separate executive summary type, or yet another thing, basically.

[00:57:50.11] - **Jason**

Yeah. There's no reason why the abstract can't be the executive summary.

[00:57:59.31] - **Str4d**

And The other thing to note here is that the skills involved in writing a spec and the skills involved in writing an executive summary or an abstract that correctly and succinctly conveys it are not necessarily overlapping skill sets.

[00:58:17.55] - **Jason**

To that point, shouldn't that be a role of a ZIP editor to state things in a clear and concise manner? Because some people may not be fluent in English for example, and not making technical points clearly. So that could be one drawback.

[00:58:40.32] - **Kris**

There are some people who are fluent in English that don't make technical points clearly and succinctly. 

[00:58:48.18] - **Str4d**

And to some extent, that has been, and like implicitly, a role that the ZIP editors have taken on. As I mentioned before, there's been plenty... The editing, a large part of that is editing for clarity, editing for both identifying semantic weaknesses, because defining the semantics is, at the end of the day, up to the ZIP authors, but the ZIP editors are free to make whatever changes are necessary for clarity purposes. Often that has been making change with abstracts, but there's so much to do. So having more people involved in that process and willing to contribute is absolutely going to help here.

[00:59:36.33] - **Jason**

Okay. Well, I think you're going to like Andrew, Sam, and Mark. They're super smart. They're eager to be involved in the process, and we're happy to have them as part of the Zcash ecosystem.

[00:59:47.02] - **Mark**

Yeah, I'm pretty good at explaining technical things in layman's terms, so maybe I can pitch in there. I'll volunteer myself for that role if that's needed. Awesome. Thanks, Mark.

[01:00:05.33] - **Kris**

If you see improvements that can be made to the abstracts, for example, if that's a place to start, then by all means make PRs or make suggestions on PRs or whatever.

[01:00:17.23] - **Str4d**

The only thing you should need to do is alter the Markdown or RST file of the ZIP itself. Assuming the CI system works, which it doesn't currently, but we're doing some manual things over the top of it, so don't worry about that, the system should do all the renderings for you. And currently, the system involves some ZIP editors who have to periodically rerun the system. But you don't have to worry about that side.

[01:00:46.43] - **Mark**

Okay. Well, I'll take a look. Thank you.

[01:00:53.56] - **Dan**

Okay, thank you all for joining. This was a great discussion. This will make its way to the ZF YouTube. The next Arborist call is the third of April at 15:00 UTC. Beware of daylight savings time. 

____


**Next Meeting Scheduled: 3rd April 2025 15:00 UTC**


___
___
