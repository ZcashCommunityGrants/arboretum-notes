## Arborist Call #107 Notes 

Meeting Date/Time: August 7, 2025  21:00 UTC

Meeting Duration: 40 minutes 

Agenda:

[Welcome and Meeting Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [zebra release 2.4.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [ZcashD, P2Sh](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [Z3](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-zcashd-deprecation-ecc-zf-zingo-labs-pacu)/ [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-network-sustainability-mechanism)/ [crosslink milestone 3](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-and-ecc-crosslink--trailing-finality-layer)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=79pNSvju05g)

Moderator: DAN

Notes: chidi olisa

## Full Notes

## Welcome & Meeting Intro 

Dan:00:02:48  

Thank you for joining the Zcash arborist call today, August 7, and on the agenda, we have core stack updates from Zcash foundation, the electric Coin Company, zingo labs, and we'll touch on Zcash D deprecation. And then we have the research and implementation updates. We do not have Qedit here in the afternoon session, shielded labs on network sustainability mechanism, and then cross link, and then we'll have an open announcements and discussion portion of the call. What are arborist calls? Arborist calls are bi weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocolR and D efforts, design and implementation of new protocol features and identify blockers and unresolved issues. The purpose of these calls is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Anyone interested in participating, interested in learning about the Zcash protocol development. Can register at Zcash arborist.org and if you would like to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot. Other ways you can get involved in the Zcash community. You can check out Zcash community grants atZcash communitygrants.org we have the Zcash r, d discord and the Zcash community forum. And you can find all these links by going to Zcasharborist.org and we'll kick off the call starting with the Zcash foundation on the topic of zebra.

## Zebra Update 

Alfredo: 00:04:41  

Yeah, that's me. Thank you. Dan, yeah. So about two weeks ago, we were doing a zebra release, 2. 4.0 so after we did that, we found the bug in the database, so we created 2.4.1, and. That didn't went well . So we shank that and eventually ended up with 2.4.2 , which is currently our last release, but 2. 5.0 is going to be released today as well. So apart from that, one of the things we did is to fix our CI, which was having a lot of issues, and now it's working perfectly fine, thanks to Gustavo and his hard work there. Related to that, we're going to make a pretty big refactor of the CI, because it's unattainable to do too many things. So we are starting on that with some ideas and stuff. So if anybody, anyone has ideas about our CI, complaints, feedback, whatever, please let us know, because we are planning now and will be able to have the opportunity to include stuff or remove stuff or whatever. Apart from that, we made some progress in  test mode for zebra Dorian from zingo labs' fixed bug in the validate address bug we had.  We are happy, we are open to allow configured funding extreme. We have a PR as well for the some progress done in the Python framework. We had to put that on hold for this week because we are doing another release, but we are planning to resume the work on that pretty much next week, and the biggest thing we did is that  we implement ploy The release that includes everything we need for the Nu, 6.1 and the activation heads on the test net. We participated with ECC in the private custom testnet session. And now we call one PR, which is the release PR to be merged in. And so we can finally tag the release. Um, apart from that, we have Mario working on zip 213 Yeah, what I mentioned is that we plan to resume the work in the solid zebra integration with the Python test next week. That's pretty much it. 

Dan: 00:07:45  

sorry I was muted. Thank you, Alfredo. Any questions for Alfredo or the Zcash foundation on zebra? All right, let's jump over next up, ecc, core stack updates, Zcash D, core libraries in Zallet.

## ECC Update 

Kris: 00:08:06  

Okay. So last week we released Zcash D 6.3.0, which has the functionality for the Nu 6.1, test net update. And as Alfredo mentioned, we coordinated with ZF and shielded labs on testnet activation, and, you know, generation of the p2sh multisig for testnet between the three key holder orgs. Beyond that, we so or in support of that, we did librustzcash Crate releases from Zcash protocol up through Zcash keys now so  that that prefix of the crate graph has all been released, but we're holding off on Zcash client backend and Zcash Client SQLite releases, because we have a bit more that needs to go in there for the Zallet alpha release, which we are also actively working on. Other major efforts over the past few weeks, have been getting pieces of T support in for p2sh multisig signing, thanks to Str4d for doing a bunch of that work. As part of that, we're also looking at integrating that functionality into the Keystone firmware. Yeah, beyond that, we have merged the main NSM network sustainability mechanism PR from from shield labs into Librustzcash, so all the NSM functionality that they've implemented is now there it is, feature flagged and and config flagged for the rust builds, but you can see examples of how to do those. Nu7 zip 233, enabling builds in the CI config. So yeah, then next, next up stuff we're really focused next on the Zallet release, the other pieces that are high priority in the near term, are continuing on this Keystone wallet implementation for P2sh, multi SIG. We're going to be adopting a couple of the Bitcoin standards for how the P2sh, multisig setup key derivation is done, and for how the multi SIG setup process is done with hardware wallets. And then, the other things that are on my plate are trying to get a couple of community PRs, one from ZF for adding Coinbase construction or to the Zcash transaction builder. And also pacu has a librustzcash PR for Zcash client backend that allows sending the full contents of the wallet. And we're going to get that in for use in zashi, specifically for use with the swap interface. That's that's in progress using the near intents swaps. So that's all I can think of for the moment.

Str4d: 00:11:38  

The other thing that is being worked on at the moment is the, finally, the  zip draft for PCZT 1 so, yeah, one was, was specified, “end of last year in the PCZT rust crate”. But there's ecosystem work that we want to be able to do, to define a v2 that includes support for v6 transaction format for a Nu7, and also into adding things like frost support into it. And there's people who want to in the wider ecosystem, who are potentially going to be wanting to use it, and all this means having a textual v1 that sort of collects everything together in places is more and more important. So that's now being worked on. 

Kris: 00:12:33  

The other zip that ECC is currently working on is Dara. Emma  is working on turning her nodes on and hacking these on quantum resilience changes for key derivation into a zip with the proposal that that v6 transactions will have all shielded outputs, or at least all orchard shielded outputs in these transactions will be associated with keys that have the quantum resilience changes so that in a future where a quantum computer comes online In the next few years, that orchard notes are recoverable in a post quantum setting, because without that change, essentially, you know if quantum computers come online, this is not something, of course, that just affects Zcash. It also affects Bitcoin and Ethereum, but they basically mean that you can forge signatures, which means that you can't trust any notes that don't have spending keys that have some Post quantum resilient component to their their creation. Okay. That's it for ECC,

Dan: 00:14:03  

okay, thank you. Chris and Str4d, any questions for the team? All right, just double check the chat. All right. Next up, we have,

Kris: 00:14:18  

I do have one more thing, we might bring him up. So ECC also has a new core team member. So schell, he's in the attendees right now, but yeah, if you can bring schell up so that he can say hi. So we have increased our our capacity by a third 

Schell: 00:14:48  

Yeah, hey, sorry, this is my first zoom webinar too, so I wasn't sure how that was going to work. Yeah. Thank you guys. Glad to be here.

Dan: 00:15:07  

Okay, let's see. Next up, I think we might have to bring up I see za. We might need to bring up za, Elise for this section from Zingo labs, unless pacu is touching on something? Here we go.

## Core stack updates zingolabs- zaino

Za: 00:15:27  

Oh  I'm not prepared for an official update but I'll give an informal update. Technically, I am on vacation, but really, I'm working every day, so the design team is closing in on finishing off the respecification work that, among other things, builds in primitives and exposes them that are compatible with crosslink,  So finalization and non finalization, our first class states in the new version of zaino and kris could probably speak more to this than I have been working with kris to fully support zallet and zaino d the lightwallet G replacement is also its release. we expect soon again? This is not a formal update, it's an informal update. So but expect that to be out probably before the next arborist call, with respect to zaino, I think that's all that's top of brain. Then , kris is probably more from maybe more familiar with actual day to day flow on zaino, because we're doing zaino, zallet , all the integration work that's going on, but yeah, lots going on. Talking to Shielded labs a little bit, mostly showing up to their demos,talking to zebra folks, talking to ECC folks, lots and lots of collaboration going on and lots of momentum, sorry, Block explorer support is also expected, but it's going to be after the zaino D release. So sometime in the next month or so, we should.

Dan: 00:17:43  

Great. Thanks Za,  kris, anything to add, or anybody else on this topic or questions?

Kris: 00:17:49  

The main focus of the work that I've been engaged with, with the Zaino folks, is that Zaino is exposing for us a new chain index API that  we can use to access index data, it can abstract over both the finalized state of the chain and the non finalized state. As zebra defines those with finalized state being 100 blocks back and further and the non finalized state being the most recent 100 blocks. So that's going to be helpful. That'll simplify some code in Zallet, and we're looking forward to having it. like the middle of next week is kind of when we might be able to start consuming that. I think we should have it ready for you.

Dan: 00:19:01  

Okay, any other thoughts, comments, questions on this topic? Okay, cool. Thank you guys. We'll jump to Next up, zcashd, deprecation updates. Okay,

## Research & Implementation Updates, ZcashD Deprecation, ECC, ZF, Zingo labs, Pacu

Pacu: 00:19:15  

I can summarize the best meeting that we had earlier today. So basically, we're figuring out a high level kind of wavy roadmap for coordination purposes, and we're starting to prepare on everything Z3 alpha, although Zallet would be the most front facing piece of the Z3 stack, there's a lot of coordination and collaboration between ZF on dockerization of the stack, and also some things that  we have to define to be able to subsequently ship the zallet Alpha through  different platforms. Initially it will be just like sort of built from source, and then we will surely incorporate more ways of distribution. And we're also going to start with a brief list of selected partners for the initial alpha, and then probably broaden up the scope as the ECC, ZF and zingo engineers see fit. We really like feedback from everyone, but we also dont want to have a like tsunami of feedback, right? We want to be able to have in depth feedback from the ecosystem, and be able to respond accordingly to the efforts that the different teams invest on z3 so if we just massively launch it won't. It won't be that way. And that's why we are kind of like slowly tuning in to the alpha and the beta stuff. So that's pretty much what we talked about today. There's a lot of things going on and well, I guess there's more after this, so stay tuned.

Dan: 00:21:47  

Thanks, Pacu. Any questions for Pacu or anything else somebody would like to add on this topic?  All right, let's see no qedit. I should have taken that out next up, shielded labs. NSM,

## Research & Implementation Updates shielded labs, network sustainability mechanism

Jason mcgee: 00:22:08  

yeah. So we have a super quick update for the NSM today. As kris mentioned, the librustzcash PR has been merged. Daira Emma had some additional comments on the Zcash test vectors, PR that we intend to address. Marius is out this week on vacation, but he'll be back on Monday, and we'll address those comments. Then, once that's complete, the zip 233 integration will be all set, and we'll go forward and submit the PRS for ZIP 234 and zip 235 and that's it.

Dan: 00:22:43  

Thank you. Jason. Any questions? Okay, next up, cross link,

## Research & Implementation Updates, shielded labs and Ecc, crosslink- trailing finality layer

Jason Mcgee: 00:22:54  

yeah. So we have a demo today that we wanted to share, that Sam and Andrew put together. Is it easier if I just send you the link in the chat, or do you want me to share my screen?

Dan: 00:23:04  

Um, let's have you, I'm a little concerned about my internet connection,you should be able to share, and then I'll jump back in. Okay, when it's over,  

cool. Let's try. Let's try that. All right, let me stop sharing. Okay, there we go. You should be able to take that over. Jason, okay, you

Jason Mcgee: 00:26:57  

Now, Nate, do you want to sort of give a summary of it, and

Nate: 00:27:02  

yes, so it basically has a punchline which is really exciting, which is it starts by showing some automated tests run and describes a bit about them. So the main detail there is that they have a mode which will notice, like assertion failures without halting the process, so that we can see, like all of the issues that we can get through by running that test, the test demonstrates like a case involving the two chains, and then they pop open the visualizer and the visualizer can sort of replay what is in the test, and then the punch line is that there's cute, colorful links going between the two different chains.

Daira emma: 00:28:05  

Would it be useful to play the video without sound and then you can do the voiceover?

Nate: 00:28:10  

Oh, and I could narrate, yes.Does anybody have it handy .I can do voiceovers.

Dan: 00:28:26  

Give me a second. I should have left it. This is fun. Okay, so here  Can you guys see that? Okay, all right, I'll press play. Yep. [crosslink milestone 3](https://www.youtube.com/watch?v=A0PUmThne_M)

Nate: 00:28:54  

I think we could probably skip the first couple of minutes. Uh, perhaps it's going to show the terminal output and be a description of the test case. I think the big picture there is not necessarily the specific test case, but just that we've begun implementing test cases with two blockchains. I don't see the video playing, but no, I just see the full screen of YouTube. Are you able to play it down?

Dan: 00:29:35  

Yeah, it's playing on my end. I'm not sure what. Let me try. One more thing.

Nate: 00:29:39  

I Oh yeah, yeah, it's updating now. Okay, so you can see some colored output, and there's two colors that are showing error messages. Okay, so then we pop up in the vision. Analyzer, and then Sam has this humorous thing, saying, like, Wait, what are those links? They're different colors. Are those cross links? And so they have a discussion about this, how those are processed. So the punch line is that this implementation has links going both ways, but there's still a lot to do. For example, we don't have tests yet that try doing rollbacks past a finality point, which is kind of the key thing there. And so that's sort of the status of the implementation on the design front or, sorry, on the roadmap. Let me do that first. We're trying to get this functionality ready by the end of the month, and we'll have a workshop on the 27th for anyone who wants to join. Yeah, I recommend watching the video if you want afterwards. Yeah. So by the end of this month, we want to finish this milestone, which is effectively cross linked with proof of authority and many cut corners and rough edges, but hopefully it is basically demonstrating The fundamental concept without the proof of stake stuff. And that meanwhile, we've been working on the design of both this milestone, including the proof of work changes, as well as the next milestone, which is to implement all of the proof of stake accounting rules. So we, I heard that our those devs got a lot of feedback on a zips call about how to modify the proof of work headers, and so that was super helpful to get a lot of context about potential issues with, you know, compatibilities with miners and so forth, and it helped me sort of clarify some of my thinking about what we're calling the prototype phase. So basically, what we're doing whenever we run into a design issue like this. So this simple thing is just change the headers to make our tests work. But the problem is that it is likely not compatible with mainnet. The more sophisticated thing is to figure out a slightly more complex change to make it compatible with mainnet, or make sure we're contacting folks in the ecosystem to make sure that there's like an upgrade process that works successfully. And so what we're doing this prototype phase is every time we run into one of those, we document it. And so we have, we call that an architectural decision. We have a thing tracking them, and we aren't spending very much time on them. Instead, we're just picking. We're picking, we're noting there's an issue. We're picking the thing that seems quickest to get working, and then we're continuing. So what this means is our goal for the end of this year to have, like, a fully functional prototype. There's no guarantee it will like actually be something that can feasibly run on mainnet, so it'll need a lot of work, but our goal is in its own testnet, it should have all of the functionality we're aiming for, right? So there's finalizers. People can delegate stakes to them. They get on an active roster, and then they run effectively.  Let's see what else. And we're going to be writing some blog posts coming up, and I'm going to write one sort of about this approach of prototyping and which design pieces we've run into so far, in the future proof of stake design, that's the real chunky thing, because it requires, oh, wait, Daira, did you want to ?

Daira emma: 00:34:16  

continue first and then I'll ask my question. Yeah.

Nate: 00:34:21  

Okay, yeah. So this milestone 2 has proof of authority, AKA a config file, instead of actual staking, to name which nodes are the finalizers in. The goal for the next milestone, milestone 4, is to have proof of stake system so that includes ways for finalizers to register on the protocol, to join a candidate roster, and then ways for users to delegate zec to those candidates  and then selection of candidates to  become an active runner, and then the active roster is what runs the BFT protocol. And then that's going to have all the rewards and fees and penalties, and it's connected to issuance, right? all of the pieces are connected to everything else. So one chunk that we started working on is just figuring out the reward system. So how is the issuance distributed to all of this stakers and all of the delegators and finalizers and keeping along with the prototyping approach we are like evaluating or drawn to making this sort of radical simplification that I think is unusual across proof of stake, as far as I'm aware, where  we would basically try to avoid special rules that attempt To reward or penalize various conditions that the protocol can notice, because every edge case has trade offs and there's more complexity. So we're imagining making a much simplified system where, once you're on the roster, the issuance gets paid basically at the same rate to everyone, even to finalizers and all their delegators, when those finalizers aren't actually online, like they're not available, so we're considering just doing the simple design. There's no rule to prevent that, and what this means is everything would continue to work until enough finalizers are not responding for the BFT system to halt. So that's what we're aiming for, for the prototype, and then we're going to evaluate carefully. can that work or do we need more rules such as payment for performance or slashing for double signs, or  all these things that have these complicated trade offs Okay, that's sort of where we are.

Daira emma: 00:37:15  

Sounds good. So where are these kinds of limitations or things where you're taking shotguns prototype, where are they documented?

Nate: 00:7:26  

Yes, they are documented. Yes, they're in a Google spreadsheet, and I'll go make sure it is  

World readable, and they're all definitely incomplete. And first, yep, so I think that's it for our update. Any questions about crosslink? Besides that list  here, anyway, you could continue with the agenda, and I'll find that link and share it in the chat.

Daira emma: 00:38:21  

So can you give some examples of the kind of thing that would be in that spreadsheet?

Nate: 00:38:31  

The first one is about how to have signatures on chain to ensure that it's unambiguous and objectively verifiable. If you're starting from a proof of work block to figure out which  is final. See there was a second one. about what data should be stored in the blocks, which is data that can be computed by fully verifying nodes as they go. And so this is a common kind of trade off that happens elsewhere in the consensus protocol. And the prototype thing is, don't add any of that data unless, for whatever reason it is easier or necessary, but generally, just don't worry about it right now and then we'll go back and figure out who needs data to be there and exactly why? If it's something that's already implied by the consensus rules, and then there's going to be one, but there isn't one about how to change the proof of work, header and or block. Formats so that it's feasible for mainnet, and then there's going to be at least one about this reward system, or there might be multiple, because it's very complex.

Dan  40:19  

all right, thank you, and thank you for everybody putting up with our issues there. I see I was going to recommend this, Elise is  already on top of it, to share the link in the arborist YouTube, and then maybe Chidi, if you can be sure to grab the link and put it into your notes that would also be helpful for folks. Okay, so let's see open announcements. Do we have any of those? Okay? And lastly, open discussion. Would anybody like to bring something up, going once and twice and three times.

All right, thank you all for being here today. And the next arborists call is the morning session at 1500 UTC August, 21

Next Meeting Scheduled: Aug. 21,2025 15:00 UTC

