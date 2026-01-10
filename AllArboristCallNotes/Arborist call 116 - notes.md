## Arborist Call 116 Notes 

Meeting Date/Time: 8th January 2026,15:00 UTC

Meeting Duration: 26 minutes 

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Research & Implementation Updates - [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino) [zcash d Deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zcashd-deprecation-updates-ecczfzingo-labs--pacu)/[Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates--qedit-zcash-shielded-assets) /[NSM](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research-and-implementation-updates-shielded-labs--nsm)/ [Crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labsecc-crosslink-trailing-finality-layer)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=8eye-YoqtDk)

Moderator: Pili 

Notes: chidi (x) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Pili: 00:01:16  

We have a good number of people. So usual reminder, the meeting is recorded. It's uploaded to YouTube. Turn off your camera if you don't feel comfortable being on YouTube, or you can also leave the session. And with that warning, we can start the call and  the recording. So welcome everyone to today's arborist call on the eighth of January, 2026 I got the year right. Doesn't always happen. So the agenda for today's meeting is, of course, like updates as usual. So updates from teams working on the core Zcash stack, the Zcash Foundation, the electric Coin Company and zingo labs. Then we will follow this up with some updates from teams working on research and implementation updates, and that is headed by shielded labs and electric Coin Company. We will then open the floor to participants to make any announcements or bring any discussion topics that may be of interest. So what is the arborist call? It is a bi weekly call where Zcash protocol contributors meet up to discuss upgrade timelines and process protocol research and development efforts, design and implementation of new protocol features, and we try to identify blockers and then resolve issues so we can move them forward, hopefully. And the purpose of this call is to make Zcash protocol development accessible to everyone that is interested and to provide transparency for everyone. Anyone can register to attend at Zcash aborist.org and if you want to present or become more involved during this call, you can email us at Arboristcall@zfnd.org, and request a presentation slot outside of the arboristcall. You can also participate in Zcash community by applying to one of the grant programs or taking part in community discussions in the Zcash R and D discord or also the Zcash community forum, and there are clickable links for all of these at Zcash aborist.org Okay, so let's start with updates from the Zcash foundation on zebra. I believe Marek is delivering that today.

## Zebra Update 

Marek: 00:03:37  

Yep, that's great. Not much has merged in the last few weeks, since everyone took a break, but there's a bunch of open PRs that we want to move across the finish line. Namely, we're still adding support for mining blocks with shielded, coinbase transactions, as specified in zip 213. As part of that work, we added support for pre canopy block subsidies in the get block subsidy RPC, and support for sapling node commitment trees in the get block template RPC. We did it to unlock mining pre canopy blocks in zebra so that we have better parity with Zcash D on rec test and custom test nets and in the QA RPC framework we ported from Zcash D. Speaking of the framework, we we are also adding zaino D to it, like we did with Zallet and the pre canopy blocks will improve custom testnet, because so far, you could mine only post Nu 5  blocks with Zebra on rec test and custom testnets. Then we're doing another review round of the NSM PR. We have three PRs that add new Prometheus and Grafana metrics, and a PR that adds tracing support for the open telemetry framework. We're also adding open RPC support in zebra for the proof of concept project that unifies, zaino, Zallet and zebra, and a bunch of code refactors from an external contributor who's doing excellent work and a bunch of other PRs that hover around as usual, that's all I have.

Pili: 00:05:48  

All right, thank you, Marek. Any questions for Marek from the zebra update?

I don't see anyone from the ECC, so I guess we'll move on to zaino updates. I see Hazel on the call. Are you okay to give an update? Or someone else

## core stack updates, zingo labs zaino

Hazel: 00:06:22  

Yes, hello, I can give an update. Zaino is very close to our next release, or our first real release. We have a few PRs that just need to be reviewed, and one more piece of work that crossing my fingers, will be straightforward. And once that is done, we should have everything we need to support zallet. There's a lot of RPC development also in the works, but I have not been focused on that for the last few months, so I am not nearly as aware of how that is progressing, but it is progressing.

Pili: 00:07:25  

That's great. Thank you, Hazel, and congratulations on almost, almost being there.

Hazel: 00:07:31  

I feel like we've been a week out from release for the last three months.

Pili: 00:07:46  

Great. Thank you, Hazel. Any questions for Hazel? Okay, let's move on to Zcash deprecation update, I don't see Pacu. Oh, you are here, yes. You're with your alias. I was wondering who that was.  Yeah, go ahead.

## ZcashD deprecation updates, Ecc,zf,zingo labs- Pacu

Pacu: 00:08:19  

Sorry. What name is this app showing ? It's the long form. It's the long form of pacu, okay, okay. I hope that doesn't get recorded or whatever. allright, so in terms of Zcash D deprecation, there hasn't been much progress in in development since the holiday season, besides what Hazel shared on Zaino, I can add that I have been working to adopt the light client protocol files, the canonical files, into Zaino. That only started as an innocent PR with just one method, and it snowballed into this other whole thing. And I have a PR open for zaino folks to review. It ended up being a long PR. Very sorry about that, but I tried to make it in like logical chunks as much as I could. And there's also documentation on how to handle the protocol files in Git structure  all for users and developers and contributors. And that's part of the efforts of deprecating light wallet D that is a new chapter that apparently is beginning. So I'm really happy about that, and that's the update for these last few weeks, also, we've been Yeah. Also we've been getting tests like boxing issues and questions from miners and exchanges and API providers needing Zaino and eating zebra, some late feedback about where RPCs should live. Although late is welcome, Billy has been handling some of those too, and yeah, we're happy to receive these feedback and opinions and bugs, so keep them coming. Thank you.

Pili: 00:10:40  

Yeah, thanks, Pacu. It's definitely great to get some feedback and requests which we weren't getting previously. I think so. I think that's very positive. Any questions for Pacu, it's looking like it's going to be a short one today, but let's move on research and implementation updates from Qedit. Vivek, do you want to give an update please?

## Research and implementation updates- Qedit Zcash Shielded Assets

Vivek: 00:11:12  

Yeah, yeah. Hi everyone. So can I? Can I share my screen? I think people should be able to see the screen now, yeah, yeah. So our main update today is about the orchard pull request review and some work on LibrustZcash and Python reference implementation. So, like, the backstory is that  we had a pull request up on the orchard repo and Strad push,  a bunch of his comments over the last few months, somewhere in the last month. And so we've been working on making these changes,  working, discussing with them and fixing them so we've been doing that internally, and you can see that like on our fork of orchard. So this is, like, the internal process where we do each individual piece in a separate PR and then, like, some things are merged, some things are still, like, being reviewed. And then, yeah, we are close to getting done there, so that's good. And then we, bounce back to Strad and the others and check,  where to take it from there. So that should happen in the, I guess, the next coming, coming days or so. So, yeah, these changes in orchard also required some changes in LibrustZcash. So, like, this is not something that the ECC has started reviewing yet, but we've kept this sort of ready. So this is also stuff that we are fixing, I mean getting ready, and we'll have that also ready for whenever the LibrustZcash review happens. So this is regarding the orchard review and the follow up changes in the other repos. Besides that, we have Zcash test vectors, the Python reference implementation. So we had been working on,  there was an initial review of it done by Strad and Alfredo, and we also had to catch up to upstream, because the NSM changes to add the zip, 233, amount were merged in here. So we did that. We completed the upstream changes, and that's merged in with our work. So one of the things that came up in the review was that we there were things that were not exactly Zsa related, that Strad and Alfredo felt we could split out into a separate PR, so that there is, you know, like, what Zsa specific is one PR and the other things that are useful but not the Zsa specific can be separate. So we made that change in, like, internally here, and we've also, like, as a start, we've made one PR to the upstream. So yeah, it would be good to get a review on this at some point soon, because we have a few more steps that are pending, and we just said we'll wait for one review for like, one thing to get merged in and then add the others. So, yeah, one thing is that, since we added the upstream changes the zip, 233, amount gets added to the transaction format, like to check that things work, we tried to run this in the Librust Zcash to check that the test vectors work when we enable the zip 233, feature. So we surprisingly had some compilation issues with just running zip, the zip 233, feature. But anyway, we fixed that and we updated the test vectors, and it all works as it should. So that's good on like both fronts, LibrustZcash and Zcash test vectors. Yeah, Nate, did you want to

Nate: 00:15:12  

Oh, I was curious. Those compilation failures. Were those something that slipped through

Vivek: 00:15:21  

I think there wasn't a CI test that was checking for ZIP 233, so like now I think like the change that's here also adds check like, because now, since we have the ZSA plus the zip 233, amount like, we now set the CI to run with the zip 233, flag, so that ensures that, like it's it's working now with the zip 233, feature. And yeah. So I guess all the other tests also work the other zip 233, tests. So yeah. So that's the reference implementation. We also opened this. This is a really small PR to the zips, which was just, there was this definition that we had made, like, a long time ago, and it somehow, like, never got removed. So we just got rid of it because it doesn't really make sense. It's not made much sense for like, some years, I guess. But we clean that up and just remove some of these references. And yeah, besides that, we've also done, like, a bunch of work on zebra and the transaction tool. So that's mostly, dealt with improving, we have a testnet node, a single node testnet that is there, and we were improving the running time and the syncing with thetest net and so on. So I think we did some little bit of work with the stuff we've been working on, on zebra, the state management and catching up to one of the later versions of zebra, and so on. But I think we've been more focused on just getting the orchard review PR out so that it's back in strads code, basically. And yeah, thanks to Strad for that detailed review. So yeah, that's the Qedit update.

Pili: 00:17:09  

Thanks. Thank you, Vivek. Any other questions for Vivek? No, okay, let's move on. Nate, is that you on NSM or?

## Research and Implementation Updates Shielded Labs- NSM

Jason: 00:17:36  

Things have been slowed due to the holiday, but as I mentioned last arborist call, we made edits to the zip 233, zip to add a requirement section and a privacy implication section based on feedback from an audit report by least authority. Those changes were submitted, and we're waiting for the zip editors to review and accept them. On the engineering side, we rebased an updated zip, the zip 234 and 235 pull request. We're just waiting for the PR to be merged to zebra, which Marek mentioned earlier, and that's it.

Pili: 00:18:22  

Okay, thank you, Jason. Yeah, we have that on our keyboard review. We'll probably start looking at it. Thank you this week or next week. Soon. Any questions for Jason?

Hazel: 00:18:38  

which PR is this? I'm just curious about it. Changes to zip 234 or changes to zip 234 in zebra. Sorry, I may have understood. Yeah.

Marek: 00:19:03  

The PR number is 9848 Thank you.

Pili: 00:19:11  

Thank you, Marek. Okay, let's, let's move on, unless there's any other questions. Okay, cross link. Who's talking about that today? It is Nate now, yeah,

## Research & Implementation Updates. Shielded labs,Ecc-Crosslink Trailing Finality Layer

Nate: 00:19:30  

it's me. Okay. So we have also had slow holiday progress. We're still planning on completing the next milestone, I think we're aiming for the end of January, January 28 and so the goal for this one is to add a bunch of the staking mechanics that we blogged about, that there was some pushback on where there's like, time quantization, so you can only stake at certain times and only in certain amounts, As a balance between privacy, security and financial incentives. And another part of this milestone goal is to continue along with our two prototype wallet implementation so continuing to collaborate with Zingo on their demo wallet. Yeah, so we're still aiming for that. And then, in the meantime, we have begun a security like a design review from a mechanism design expert. we've started reviewing their initial draft internally, and we expect that they will publish that sometime soon. I'm pretty happy about it, because it's complementary to the existing security proof work that Daira primarily has done Dara and Strad, but it's focused more on the newer proof of stake stuff that we at shielded labs have come up with in our design, and we've been running a lot on our intuition and experience, but this review is sort of adding more rigor to that, so I'm pretty excited for that, and so I assume that would be published like roughly in The same time period that this milestone will be done by the end of January, and we'll have more to share as we digest that. Great. Thank you. Nate. Oh yeah, sorry, just a reminder of the bigger picture schedule is we want to sort of conclude what we're calling this prototype design phase this quarter, and then do like a really thorough assessment of community support, and if it's there, then we would transition into production design and implementation. So then we would start trying to integrate things into zebra upstream and things like that.

Pili: 00:22:48  

Great, exciting, we'll see look forward to seeing those. Okay, any questions for Nate? No  Let's move on announcements. Does anyone have any news, anything they'd like to share? Please raise your hand. Nope, last chance. Let's move on to discussion, any topic anyone would like to discuss today.

Taking that as a no, oh, zooko shared a link

## Open Discussion 

Zooko: 00:24:05  

Marek gave it to me. That was my idea. Cool, perhaps have someone say something.

Pili: 00:24:19  

This is the work that Marek has been doing. Yes, go on Marek.

Marek: 00:24:24  

Yeah, it's just documentation for benchmarking and profiling. I wrote it when I was profiling zebra, and I wanted to keep a record of how I did it, essentially,

[benchmarking and profiling](https://zebra.zfnd.org/dev/profiling-and-benchmarking.html#benchmarking)

Pili: 00:24:42  

let me see if I can get it up. Oh, I did get it up on the screen. I didn't want to do that. That was too clever. Oh, well, there it is. Yeah, and there zooko shared the link on the screen, on the chat. Sorry, any any questions about benchmarking or profiling or any other discussion topics for today, I going once, twice, three times. All right, thanks everyone. If I haven't got it incorrectly, the next abrorist call will be on the 22nd of January at 21:00 Utc



Next Meeting Scheduled: January 22nd, 21:00 UTC
