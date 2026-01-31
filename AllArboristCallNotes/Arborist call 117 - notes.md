## Arborist Call 117 Notes 

Meeting Date/Time: 22nd Jan.2026, 21:00 UTC

Meeting Duration: 43 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update[Zebra 4.0.0,Dns seeders](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Former ECC Core Update [ZcashD, Nu 7, lockbox](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#former-ecc-update)

Research & Implementation Updates - [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-shielded-labs--nsm) / [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labsecc-crosslink-trailing-finality-layer) / [Dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fees)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=zVu2yxxUMCs)

Moderator: Alex

Notes: chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00:00:43  

Zcash arborist call January 22 2026 our agenda. So core stack updates. Zcash foundation with Zebra, former ECC team with Zcash D, core libraries and Zallet CLI wallet. zingo labs with Zaino and Zcash D, deprecation, research and implementation updates. qedit with zsas. Shielded labs with network sustainability mechanism. Shielded labs and former ECC, with crosslink trailing finality layer and shielded labs with dynamic fees and then open announcements and discussion. So what are arborist calls? They are bi weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D, R D efforts, design and implementation of new protocol features and identify blockers and unresolved issues. Purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development can register at Zcasharborist.org if you want to suggest a topic for discussion or present an in depth agenda item relevant to the Zcash protocol, email arboristcall@zfnd.org to request a slot or reach out to myself or Elise other ways to get involved are Zcash community grants, Zcash R and D on  discord and the Zcash community forum. And you can find these links by pointing your browser at Zcasharborist.org.

## Zebra Update 

Arya: 00:2:53  

So in zebra, since the last arborist call, we've published a new release, version 4.0.0. Added shielded labs as DNS seeder to the list of default initial peers, added support for using Toml config files with arbitrary file extensions and new PRs have been opened with a minor fix to metrics and diagnostics when connection heartbeat task exits, and adding mempool checks to more closely match ZcashD's mempool. There's also now a new DNS seeder written in Rust based on zebra network, thanks to TC David Campbell and the new DNS seeders features support for custom test networks, we also finally got a PR that was written a while ago, reviewed and approved to improve error typing in zebra state, and I think that's it. Yeah,

Alex: 00:03:43  

thanks. Arya, any questions for Arya? Great. Core stack updates, former ECC, ZcashD core libraries and Zallet.

## Former ECC Update 

Kris: 00:03:58  

So in the time since the last arborist Call  we've made a new release of Zcash D to advance the end of service halt. Because I think actually the halt was probably yesterday for all of the previous ZcashD 6.10,. So hopefully the network's still functioning the other things so the former Ecc team has been heavily focused on a couple of new zips over the past couple of weeks. So one of these is a proposal for a different approach to creating the v6 transaction format. The intent here is that we be able to make Zcash easier to evolve with new consensus features. There's currently a PR up on the zips repository. Let me find the number of that, it's PR, 1156, but the idea is to define a new transaction format for which the next parser change to wallets and other entities in the Zcash ecosystem will be likely the last, or it will at least make it much easier for all of the various consensus features that have been proposed for Nu 7 to be split up across smaller releases, which I think is generally desirable. So take a look at that PR and provide feedback, especially if you're doing anything with wallet development, or if, if you're responsible for any part of the the ecosystem where transaction parsing is something you're interested in, the other things in Zallet, we're continuing to work on Z shield Coinbase and on fully transparent functionality. So the legacy Zcash D wallet obviously provides functionality for sending from transparent to transparent, and Zallet does not have that yet. So those  have been our major focuses. Oh, there's one more thing on the specification front, in addition to the transaction format change, we are working on a proposal that essentially generalizes the lockbox functionality into a system of what we're calling consensus accounts. So the observation was, there's a key rotation mechanism that has been defined for Nu 7 that was originally intended for use to make Zsa issuance keys able to be rotated and to be used for keys used for lockbox disbursement. What we recognized was that the lockbox, essentially, with that key rotation mechanism in place, becomes an account that is funded from issuance. Now one of the reasons that we wanted to create the lockbox in the first place was because managing the thousands of utxo outputs that the development fund was producing is a logistical hassle. And in addition, we wanted a system whereby it would be possible to eventually have key rotation so that key compromise and whatnot could be or loss of keys could be effectively responded to. However, right now, the lockbox is getting funded, and we've made a single issuance from the lockbox into a p2sh, multisig. However, for example, the Zcash community grants outputs don't gain the same logistical benefits of not having to deal with the thousands of outputs. And miners have a similar problem of having to aggregate output value. So by generalizing the functionality of the lockbox, we can provide these kinds of benefits across the ecosystem. The other thing that is a potential benefit there is we may be able to eliminate the Coinbase maturity rule in that case. So in any case, we currently have a draft for a zip for that in progress, and hope to have at least an abstract and a motivation and a rough SketchUp today. All right, that's it for core teams.

Alex: 00:09:12  

Awesome. Alfredo. You got a question?

Alfredo: 00:09:16  

Yeah, so I have a question for kris. You mentioned about zallet stuff. I just submitted an issue about having a problem with reg test, which is, I can mine coins to my own address, or I can be a recipient of funding address in my own regtest network, but I cannot spend those funds because of several reasons I open a PR. One of the reasons is that we don't have  shielded Coinbase function that you mentioned, that it is in progress. I don't see a PR open for it. Do you have any time frame for that, or any way I could collaborate to make it faster?

Alex: 00:10:14  

If you're responding, kris, you're on mute.

Kris: 00:10:16  

Oh, sorry about that. There's currently a PR open in Librustzcash to fix a problem related to Coinbase maturity that is a blocker. Then for finishing the  Coinbase, I expect that we'll have a PR up either tomorrow or early next week. Shell chivalli is working on that ,the PR on librustzash for the coinbase maturity changes is ready for review, though. And then, okay, Coinbase. That's the main blocker there.

Alfredo: 00:10:57  

Yeah, if I have that function, I can do the rest. I wrote some alternatives in that issue as well. If you want to take a look to that and see the problem in more detail, I just posted the link in the chat. Thanks, kris.

Alex: 00:11:10  

Yep. Great. Any other questions for kris? Great. Let's move on. 

Core stack updates from Zingo labs on Zaino. Anybody here from Zaino or Zingo? All right, move on to the next

## core stack updates, zingo labs zaino

Hazel: 00:14:36  

So let's see we got some work in from Gustavo verde that got our Docker set up closer to the rest of the z3 system, like Docker DNS host name resolution is working now. We also see there were some sync bug fixes. There's still two things we need to do for release. Nacho is working on getting the last pieces of our old cache removed in favor of the new one. And there is pass through is feature complete, but it needs to be tested and debugged and such. So I think we have everything in place to release, assuming it all works, but we're just in the stage of testing and tidying at this point. So again, I'm I don't want to say a date, but we are very close to release,

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:12:33  

All right. So, yeah, we can provide an update along the lines with what I've mentioned in the last community updates. zallet  Beta is targeting it's release for March, and we should expect a couple more alphas in the middle. So we will be reaching out to the alpha testers with that, and like coordinating with Gustavo from ZF to create the appropriate z3 containers and all which we are happily seeing that people are choosing that route and instead of building from source. So yeah, and then what else Zaino is like? Yes, hi, Hazel. We can hear, I'm personally continuing the, I guess, the path to light wallet D deprecation, that we're starting to walk that road by adopting the protocol, canonical files for the gRPC services, And we're implementing the missing bits in Zaino, and that's currently under review.for Zaino update. So we I leave you to Hazel about Zaino.

Pacu: 00:16:09  

all right? And one more thing that I have to add is that we were looking for contributors, community contributors for Zallet. We got together with Zallet engineers, and we went through the backlog and labeled some of the issues that are really like, are really good candidates for newcomers and like independent contributors to work on. Those are in the Zale repo, which is like github.com/zcash/wallet and you can look at the issues labeled good first issue and help wanted and Z contributors needed those those kind of labels will tell you that those issues are good to be worked on. And if you have any questions, any any any clarifications you need on what, what's needed to be done, please reply on GitHub so we leave that conversation documented, or you can always, like, reach out through the r&d Discord as well, and I guess we will have news, more news out this kind of contributions in the next few weeks. So stay tuned.

Alex: 00:17:44  

Cool. Any questions for Pacu or Hazel? Great. Thanks, both. Let's move on to the next,research and implementation updates. qedit with Zcash shielded assets. Anybody here doesn't look like anybody from the qedit team is here. So we will move on to shielded labs with network sustainability mechanism.

## Research and Implementation Updates Shielded Labs- NSM

Jason: 00:18:18  

Sorry if there's background noise, I'll be quick. So we're still waiting for the zip editors to review and accept updates we made to the zip 233, zip to add a requirement section and privacy implication section based on feedback that we received from an auto report late last year, and then on the engineering side, earlier this week, we addressed some comments and updated the zip. 234 235 PR. We're just waiting for those updates to be reviewed and the PR to be merged to zebra. So super close to having everything completed.

Kris: 00:18:57  

There's one note, I think that so I think that Strad was looking at some issue related to how the Zcash unstable Nu 7 feature flag, not feature flag, config flag was being used. And so just as a heads up the config flags in the Rust code or something, we need to have kind of a unified approach to handling across the ecosystem, because they are not enabled on a crate by crate basis. They're, you know, when you turn on a config flag, you turn it on for all crates. And so we're going to write up some some documentation for like, exactly what and how, what should be guarded by those config flags and how they should be used so that we don't end up with incompatible usage in different projects.

Jason: 00;19:57  

Okay, let's reach out to him in the signal group that we have for the NSM, and I guess take it from there.

Alex: 00:20:11  

Any other questions for Jason on NSM? Great shielded labs and former Ecc  crosslink trailing finality layer

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:20:25  

Yes, I have a general update, which is that we are doing our next workshop next week  on the 28th and so this is called milestone 4c workshop, and we think it should have all of the functionality we set out initially to put into the prototype. So we hope people can show up and try that out. It's going to be fun, sorry, I have some co-workers, some barking co workers. And, yeah, it's going to be fun. There's going to be a couple of wallets. There's going to be which were there last time, but they've been improving. So one by the Zingo team that works on mobile, and one Shielded Labs is doing in house. It's like a desktop and  has a visualizer. Those are fun to play with if you haven't seen it. we're going to do the workshop first, and then sort of have a Q and A session that's more general about cross link, instead of just about the workshop stuff like, how do I configure my node? That'll be the first section, general QA at the end. And then after this workshop, our team is going to circle around during our retrospective and do a checklist to make sure we've covered all of the main big, chunky functionality pieces we were aiming for for the prototype. And then if so, I mean if not, we're going to make sure the next milestone adds those. If we have covered all of the basics, we're still going to do one more sort of prototyping phase that's sort of like cleaning up, dealing with any rough edges, making any tweaks to the UI that seem good for a milestone 5 and then around the time that milestone 5 is complete, we're going to start engaging more to assess community support, and we're going to begin a transition process towards  productionization. And so stay tuned for that. Shielded Labs has an in person summit in a couple of weeks, and we're going to flesh out our roadmap for 2026 especially for crosslink. And so stay tuned. And in addition to the workshop, we also have an audit underway from a mechanism design expert who is mostly done and is waiting for feedback  from our team, and we're still reviewing that, and we hope to have that published soon, it would be nice if it could be published around the same time as the workshop next week, and stay tuned for that. The Big Picture punchlines are that the cross link design doesn't interfere with the existing proof of work liveness, but it does introduce a risk of malicious miners being able to cause a stall of just the finality piece, which is somewhat obvious. And if that kind of stall happens, it would be very obvious to the whole network. One thing we've done in this prototyping process is cut down the design of the proof of stake stuff to be as dumb and simple as possible. And I think that was a great call, because now, as we start analyzing these trade offs with outside expertise, we can really decide, do we want to add any protections for each thing? So we've even stripped down some things that were in the original trailing finality layer book, and so now we're going to revisit some of those and so forth. So that is where we are at with crosslink. We're about to, in the next month or two, transition towards working on a production protocol feature.

Alex: 00:25:13  

So yeah, that's it. Questions, yeah. Questions for

Nate. All right, thanks Nate. Next slide So shielded labs with a dynamic fee

## Research & Implementation Updates Shielded labs- Dynamic fees

Mark: 00:25:37  

Hey folks. Pretty short update on my part, just getting sort of back in the saddle after the holidays and after some other work that I've done at shielded labs, besides dynamic fees. But going to pick this back up, I want to just shout out to kris, who's been extremely helpful in a dialog about this work. So thank you, kris and yes hearts, and obviously the people at shielded labs too that work on this. I am going to probably bring in another engineer from shield labs to start building out our own testnet for this feature, so we can actually run simulations and, you know, long term, back tests, forward tests and things like that. And, yeah, we get to start building and continue working on the fees.shieldedinfra.net site. That's sort of the main promotional site for this feature, but it's also interactive and kind of fun. And again, kris gave me some good feedback on that page and some sections I need to add, and thinking about the information architecture there as well, and how this can be succinctly communicated to everybody as we work on it. So yeah, looking forward to giving more updates here on the next calls. Thank you.

Alex: 00:27:10  

Thanks Mark. And this will be, we've added this to our template so it'll be on each arborist call going forward until y'all say to take it off.

Open announcements. If you have some news or an announcement you'd like to share, please raise your hand. Okay, no announcements, great. Next open discussion. If there's a topic you'd like to raise for open discussion, please raise your hand. arya go ahead 

## Open Discussion

Arya: 00:27:50  

Is there any beginning of a plan to implement the extensible transaction format that we've just created a draft set for? Do we have a preference on what repository we want to implement it in

Kris: 00;28:06  

We haven't gotten,I think that the draft is still very much in draft, so I would really like to, in the next week or so, get that draft firmed up to a point where it's something implementable, but I don't think it's quite there yet. With respect to that question, we certainly will be implementing it in in librustzcash, in Zcash primitives, the the other piece that needs to be worked through so the the transaction format change, like all that's been specified thus far is kind of the outer skeleton, the inner parts of it that are the sapling and orchard bundles, The transparent bundle, and essentially the other bundles that I think that it should activate with have not been defined yet, so it's not really implementation ready. And then also SIG hashes, the SIG hash hashing logic needs to be reworked, because the signature hashes will in the future, be over the bundles, and an important consideration is that wallets that don't know about certain bundle types still be able to correctly sign transactions  that might make use of bundle types that might, might be mined in an environment where bundle types that they're not aware of are are enabled. So there's still a bit of work, I think, before it's implementation ready.

Arya: 00:29:55  

Do you think there is going to be a very big difference between the definition of the bundles and the current transaction format of the fields that those bundles have right now.

Kris: 00;30:08  

No, I mean, it's really just going to be pulling out the value balance fields from the shielded bundles. The transparent bundle is going to be basically the same, and then explicit fees are going to be a bundle. And I think that at this point, we should probably add the NSM as a bundle type as well. So that would be my proposal for the the initial release. I

Alex: 00:30:44  

cool. Thank you. Other topics for open discussion.

Kris: 00;30:51  

So there's one thing that I might be jumping the gun a little bit here. But Mark, did you want to, did you want to talk about or discuss with the larger group, the thing that we talked about with respect to, like, core engineers writing opinions about proposed network features?

Mark: 00:31:20  

Yeah, sure, this sounds like a good place and time to do it. In the past, when we've done sentiment polling, there's been like sort of an engineer caucus that gets polled and votes separately from the others. So we were going to propose doing that again for the Nu 7 during the same polling window as  Nu 7  And I'm just sort of stepping up here because I think, you know, a small number of people like Jason and some others are the ones who typically run these things. So I just wanted to help out. And I think it would be cool to do. And kris suggested having people sort of write like a majority opinion and a dissenting opinion on each of the polling questions, because I think the engineers have a good culture of being able to disagree without it devolving into anything. And it'd be good to sort of model that to the community, and it would be good to have those opinions published so that the rest of the community can read them and sort of get the nuances and get the trade offs and things like that. So I was going to send an email out I've sort of been in touch with some point people at each of the organizations already, just to sort of make sure that the email I'm about to send is the messaging looks good, but it's nothing. It's fairly innocuous. It's kind of just what I just said. So I was going to send that out, and then we were going to use Helios for it, because we can add and remove people while the polls running, and participants can change their votes during the polling window as well, which may happen given the nuances and details that I mentioned before. that all sound about right?

Kris: 00:33:11  

Yeah, I think that this is something that's interesting and worth a try, because we have, as engineers, a lot of discussions, kind of among ourselves, but the high points of those discussions don't always get surfaced to the community. And so, you know, this is, you know, partially like something that I think would be great to happen, partially something that I think is going to be like yet more load. And so hopefully we'll be able to write these kind of opinions relatively quickly and  this is just maybe an experiment.

Mark: 00:33:53  

Yeah, a couple of things there. I don't think they need to be super long. I think they just need to be complete. But they can be succinct. And also, participation is totally voluntary, so if we don't end up with a full set of majority and dissenting opinions, then we tried Nate,

Nate: 00;34:18  

yeah, I just remembered ages ago, Andrew Miller advocated for using a website. I'm trying to find it. I think it might have been therecccccccccccccc and but, but there's a genre, right? So maybe we could look around and an interesting detail of that website was that  it allowed a bit more ground up surfacing of text, like anyone could write a pro or a con. And there was sort of a tree structure, I remember. So I'm wondering. I mean, I'm kind of interested in tools like that, if they are helpful for this kind of thing. Anyway, just remembering that experience, it seemed like some people used it a little bit, and then it sort of just faded away. So I think really the key trick here is to have a cat herder, someone who's, like, owns keeping the thing up to date and sharing the results.

Mark: 00:35:30  

I mean, I'm kind of volunteering to be the cat herder here. The problem is we have six days until the polling window open, so we might, we might just end up going with Helios this time around. But that's, that's interesting, yeah.

Nate: 00:35:43  

Then, I wanted to tack on one feature I would like to see, though not in six days,  it could be cool to have somehow we decide among or the cat herder decides to bless one bit as like a pro and one bit as a con. But I really like the notion of anyone can write pros and cons and the community can sort of determine somehow which would seem like the most compelling like

Mark: 00;36:26  

a rotten tomato for protocol features, exactly. All right?

Jason: 00;36:33  

Jason, yeah, so a couple questions. Um, one, how will you know what opinions are, majority and dissenting without seeing the results from the engineering panels poll. Like, I guess, what I'm saying is it would make more sense for it to do, like, pro and con opinions. Like, you know, yeah,

Mark: 00:36:53  

I guess it can't be majority, but yeah, I would just imagine people could self nominate for, hey, I'm anti this feature. I will

Jason: 00:37:03  

and then kris I had shared the questions with you earlier today. Do you envision a separate opinion for each question or feature? Or would you just pick and choose topics based on where there's a disagreement or difference of opinion? I.

Mark: 00:37:34  

Why don't we go to Alfredo and then Chris returns? Yeah.

Alfredo: 00:37:38  

who are the core developers, the ones in the organization, anyone that had contributed with any of the repository, or who

Mark: 00:37:50  

we don't have a hard rule on how we measure, you know, if somebody is part of This contingent or not, but it's, it's generally speaking, the the organizations that are in this call, and like people like Hanh, qedit, yeah, qedit is in this Call, kit from Red dev Harry Halpin from nim. You know few others like that, but generally, okay, call.

Alfredo: 00:38:26  

So those people you mentioned, you are going to make them have an opinion. Seven different seats that are proposed right now. No, no context to answer that. I don't even have it. Yeah, okay, yeah,

Jason: 00;38:46  

So right now there's a bunch of different panels. So there's a zcap panel, which is, like, you know, the entire, like, has 100 people on it. There's Zac, which was maintained by the former Ecc, which has something like 80 to 100 people  then there's smaller ones like Zechub and the Spanish community, Russian community, Korean community, Brazilian community. So this is just another input of just engineers, and I wouldn't be thinking of them as necessarily, like core protocol engineers, but just like the engineering community, and that's why you see people like kris goes involved in like Harry from Nim, so on, so forth,

Kris: 00:39:23  

yeah, and in terms of these opinions, the way that I think that, that I would like to see it evolve, is You know, there's the sentiment polling piece of it, I'd kind of like to see it evolve into a, like a discussion group or something like that, where, you know, maybe we get everyone involved in a signal group or something like that, and, you know, informally pull The membership of that group for who wants to, you know, who's in favor, who's opposed, who wants to write the opinion for each side. And, you know, sort of, sort of take that kind of approach, as opposed to, like everyone submitting different pros and cons. Because, what I'd like to have from this is kind of,  for the community, to have a pro view and a con view, each of which has some consensus among the engineers. And you know, it's always someone's option to write their own, like independent pro or con opinion. But I think it would be good to have like, here's an opinion, and here are the five people that signed on to it, or whatever you Yeah,

Jason: 00:41:04  

polling is going to start the 28th so I don't know that we'll have the ability to have that out before polling starts, because that sounds like a lot of work, but I think it can be part or part of a broader discussion that we have. You know, after polling starts,

Alex: 00:41:21  

just to be clear, coin holder holding will start on the 28th not zcap will be after that.

Jason: 00:41:26  

Oh, I thought we were gonna start everything at the same time.

Alex: 00:41:29  

Okay, you and I can discuss that and take care of it. But yeah,

Alfredo: 00:41:33  

so I think it was developers at some point, if you remember that?

Alex: 00:41:43  

I don't think it was related to zcap. I mean, there's been, there's been developer polling in the past, but this is more, this is a bit more sophisticated outside,

Alfredo: 00:41:54  

yeah, yeah. But okay, I remember there were some like core developers poll in the past, but understand, see what you mean is more like five people agreeing to some sort of statement. What kris said?

Kris: 00:42:10  

yeah, And it may even be the sort of thing where, we get in an email list or a signal group or something, something, and someone says, you know, I have an opinion, and writes it up, and then, you know, others can sign on to it, or something like that. You know, it's just a loose experiment maybe

Alex: 00:42:36  

Well, are there questions or opinions on this? I it awesome. That sounds super cool. Thanks for bringing it up and pursuing it. Yeah. Thank you. Other open discussion. Anything else anybody wants to bring

Awesome.

Next Meeting Scheduled: 5th febuary 2026 15:00 UTC

