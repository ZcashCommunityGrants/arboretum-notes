## Arborist Call 122 Notes 

Meeting Date/Time: April 2nd 2026, 15:00 UTC

Meeting Duration: 50 minutes

Agenda:

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [Cve](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl Update [ZcashD](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zodl-update)

Research & Implementation Updates - [Zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit-zcash-shielded-assets) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs-zodl-crosslink--trailing-finality-layer) / [Dynamic fee](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--dynamic-fee) / [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs-zaino)

Open Discussion [DAG, Bft](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion) 

Video of the meeting: [recorded](https://www.youtube.com/watch?v=-4GDsezfilc)

Moderator: Arya

Notes: Notes:chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro

Arya: 00:00:46  

The usual reminder that the meetings are recorded and uploaded to YouTube. So turn off your camera and Mic if you don't feel comfortable being on YouTube, or you can leave the session. 

Welcome everyone to today's arborist call on the second of April 2026 so the agenda for the meeting is just regular updates, updates from the teams working on the zcash stack, Zcash Foundation, Zodl team and zingo labs, and we're just going to jump into research and implementation updates. So first up is Zcash foundation for zebra. I believe that's Marek

## Zebra Update

Marek: 00:02:20  

So for zebra, last week, we released zebra 4.3 with fixes for two CVEs. The first could lead to a chain split in vulnerable zebra nodes, and the second one could be used to put down any vulnerable node besides the CVEs, the release contains the implementation of zip 235, then fixes that make zebra Properly propagate blocks on regtest. Then a fix for calculating the founders reward for the for pre canopy blocks in the get block subsidy RPC, and a fix for test net, where zebra would unnecessarily utilize one CPU threat 100% and other than that, we noticed that syncing testnet is slow, and we have some solid improvements for that in the works. They also translate to mainnet, so we'll likely have a faster sync with the next release, and that's all i have got

Arya: 00:03:46  

Thank you. Marek. If anyone has any questions, raise your hand, otherwise. Zodl,

## Zodl Update 

Kris Nuttycombe: 00:03:55  

I'm on deck for zodl today. So  first thing is a, I guess team announcement, which has an impact across the community, which is that Strad is on sabbatical for the next three months, starting yesterday, so we are forging ahead with a bunch of work in flight,so there are a couple of things that strad was working on before he left that we will need some help from the community in pushing through. The biggest thing there was his work on integrating the Zaino chain index. There are a couple of PRs that I believe are, yeah, so there's, we will have a Zcash primitives 0.27 release  that will need to be integrated into zaino. And strad has a branch for that, that I will be pushing forward. And then there's also Zingo labs, zaino, 853,  which will need to be merged for completion there, apart from that, we're almost finished with the full block scanning changes in Zallet atop zano. So everything  is coming together there. There's still a little bit of outstanding work and bug fixing on the Librust Zcash side that we're doing there. But But in general, our scan process is almost complete. The other Zallet stuff that's happening right now is we now have support for import of P2sh addresses, which we need for Zcash D wallet compatibility, and we're going through a process of generating a bunch of reg test wallets by creating Docker containers using old Zcash D versions, spinning up a reg test network, creating a wallet with interesting transactions across the various pools, as of, you know, sprout and as of over winter, and as of sapling and so on through the network upgrade stack and so we will have these kind of old Zcash D wallet dat files that represent a reasonable spectrum of wallet usage across the history of Zcash, that we're going to be using for integration testing in zallet. The other things that are in flight, that are kind of important for community involvement, we have completed the draft work for ZIP 316 we're now calling revision two, since revision one was effectively rejected and withdrawn. So zip 316 revision two is now up on zips.z.cash
 zip 316 please review it. This does a couple of things with respect to unified addresses and unified viewing keys. So one of the problems with unified viewing keys at present is that they don't permit representation of p2sh viewing keys or p2sh descriptors, specifically, as we've recently specified in zip 48 so revision 2 fixes that it also creates two different unified address prefixes, A ZU prefix for fully shielded, unified addresses that are known not to contain any transparent parts, and then T u, unified addresses that can contain transparent parts but also allow us to do things like add the address expiry metadata that we've kind of always wanted as there was the primary motivation for ZIP 316, revision 1. So please take a look at zip 316, revision 2 and provide feedback. There is an issue in the zips repository, I will also make a forum post related to this, but this is all sort of in response to both needs that we have with respect to representing more flexible, unified viewing keys, and, you know, addressing the comments that folks made in the forums on Revision 1. The final thing,  oh, and the other thing that we would solicit community feedback on is zip 248, zip 248 is the extensible transaction format. There's currently an open PR in the zips repository, and just direct discussion there. But this is going to be an important upgrade  that's planned for part of Nu 7. And that's the high level stuff. There's lots of low level work going on, but, that's it. Questions, discussion.
So Zooko is thinking in the comment section Zooko, what are you thinking about?

Zooko: 00:10:09  

Oh, that's really interesting. It's all very interesting. Looking forward to reading the zips in GitHub discussions. The specific thing I was thinking was, do we also have expiry metadata in the Z u unified addresses, right?

Kris Nuttycombe: 00:10:38  

Yeah, go read the zips. Let me know what, yeah.

Zooko: 00:10:41  

So what i was thinking is, I wonder what all the wallets think about those besides all all the other wallets,

Kris Nuttycombe: 00:10:51  

yeah, I'd like to know, yeah.

Arya: 00:10:53  

Thank you, Kris. A very diverse set of work, all of it, very important. So next up we have core stack updates from Zaino. If anyone here is from zingo labs

Hazel: 00:11:09  

yes, but I also noticed that Daira Emma has a hand up. Daira emma, hello, can you hear me?



Daira: 00:11:25  

Okay, yeah, so I think there was some research and assurance. There was a research and insurance slot. So basically, there's been a paper from Google recently about the timeline for post quantum computing, and I think it was a surprise to a lot of people how soon they thought it would be. But quantum relevant, cryptographically relevant quantum computers. I wasn't actually surprised. I thought it'd be around that timeline anyway. But it doesn't mean that we kind of need to get a move on, on designing, on designing a post quantum, fully post quantum Zcash, and deploying the  quantum recoverability. In the meantime,  I've been writing a blog post about it, so that paper actually missed something about, so there are attacks that only require computing one discrete algorithm. So I'll do that blog post, and then we can all read that.

Kris Nuttycombe: 00:12:47  

Oh, I remembered. I remembered something that else that I completely forgot to put into my notes, which is that the other thing that the ZodL team did last week was we remediated, a potential vulnerability in Zcash D that could allow invalid sprout proofs to be accepted into the chain by or introduced into the chain by a malicious miner. So thanks to shielded labs who coordinated the disclosure and informed us of the vulnerability and helped us  with the fixes. So there is now Zcash D 6.12 out; the patches for the vulnerability were propagated to all of the minor mining pools prior to public release. And, yeah, the vulnerability has been successfully mitigated. Big thing to forget, but yeah

Daira: 00:14:12  

So the credit for the patch goes mainly to Strad,  who's now on sabbatical, and it was reviewed by me and Kris, and I think Zooko had some input into the bug investigation as well. Okay, just to make sure attribution there

Zooko: 00:14:37  

Zebra is really important. It turns out. zebra  was important for being able to analyze the scope of the possible exploitation because zebra wasn't vulnerable to that bug, then we could reason that the bug wasn't exploited in different cases because of zebras presence on the network, and also there's another data point that says Zebra is just safer than Zcash D going forward. So I'm increasingly motivated to get people to switch. But anyway thanks to the ZF folks for zebra.

Arya: 00:15:22  

Thank you, Zooko, I regrettably have to say that zebra was also vulnerable to a proof forging bug where we weren't paying attention to  v5 transactions, auth, digests, so for V5 transactions, specifically, the proof field was mutable. That wouldn't have affected sprout, because you can't have sprout transactions in v5 you can have sprout in v5 transactions. But I wonder if the vulnerability in Zcash D was specific to sprout, or it could affect sapling and orchard as well.

Zooko: 00:16:03  

It was specific to sprout and the bug, the mutability bug that you're talking about, is the one that you guys already fixed and disclosed, right? Yes, yes, that wasn't nearly as bad. The person who discovered it could have stolen 25,000 Zec out of sprout, yeah, whereas the zebra bug is not nearly as dangerous in terms of impact, yeah.

Daira: 00:16:36  

I think for various reasons, it would have been difficult to get away with that attack, because the consensus divergence between zebra and Zcash D would have been immediately apparent, and also the Zcash D didn't always accept the sprout proofs. There were some conditions under which it would check them, and so some of the Zcash D notes would also fall from each other. So the bug would have been very noisy, and there would have been an opportunity to essentially roll back the chain, but that obviously would have been disruptive.

Zooko: 00:17:19  

Yeah, and the more hash power use zebra, the better for defending against this particular bug in Zcash D, and I just want to reiterate, I'm pretty sure Zebra is just safer than Zcash D, yeah. So be encouraged You're doing good.

Arya: 00:17:36  

Thank you. Yeah, it does sound like that bug was quite a lot worse than the one in zebra. The one in zebra had a fairly low impact. Okay, sorry to the folks at zingo labs. The Zaino update,

## core stack updates, zingo labs zaino

Hazel: 00:17:50  

That was a fascinating conversation. So Zaino updates, since the last arborist call, we've released libraries are, I think, a 0.1 version and zaino D should match the version we've been using for the like GitHub release and whatnot. We're working on our next release. Now we're hoping for a much more regular process. There's some known bugs that we're working on and known issues like, for example,  one of the methods that Zallet needs is still on a feature branch atop our latest release, so we need to get that in. We're upgrading to zebra 4.3 that has some nice improvements that we really want, especially with some pre canopy indexing stuff. But we're in a state where mostly things work now and we have some time to, like, clean up top tech debt and improve the pass through documentation. we're more focused on making things easier to use for the next little bit, at least, there's still ongoing like RPC work to get block explorer support that we need to do, like, we still have features to work on, but let's put it this way, I am excited to be working on tech debt instead of feature for a little bit. And yeah, next zaino or release should be in a week or two. I hope.

Arya: 00:20:02  

Awesome. Thank you. Hazel, next up we have general Zcashd deprecation updates from everyone. pacu, any updates from you?

## Zcash deprecation updates Zodl,Zf, zingo labs pacu

Pacu: 00:20:16  

Not much apart from what has been said already Guess we will coordinate a little bit more to cope with Strads Sabbatical, well deserved. And I hope Strad you're not looking at this should be resting. And then also, we are starting to work a little bit more focused on things like walletD and Zaino, gRPC API parity. So as part of the light line Working Group initiative, we're going to create integration tests that compare the output between lightwallet D and Zaino. That's what's coming and also, I wanted to just do a small correction from what Hazel just said, like Zaino released 0.20 and the next release is going to be 0.21  which will include Zebra 4.3 support and some fixes to the get block range gRPC API to bring it to parity  in behavior with lightwallet D, which was causing some issues in non linear syncing, while it's like zodl. So I'm particularly working on testing that at the moment that we have fixed it. So that's what's coming next for zcashd, deprecation, and I guess like lightwalletd parity or deprecation, depending on whether somebody wants to keep maintaining lightwalletd in the long run. So that's it.

Arya: 00:22:10  

Thank you Pacu, Zooko.

Zooko: 00:22:11  

On the topic of ZcashD deprecation, I thought I should add why I think Zebra is safer. It's because the security researcher who reported these bugs is an AI augmented security researcher who I don't think speaks English as his first language, and he's the same guy who found the sprout bug and the mutability bug in zebra. And he told me that he's found like, 15 or 30 vulnerabilities in other cryptocurrencies using this AI technique, something like that. I didn't understand exactly what he meant, but it sounds like there's a lot going on. And so I asked him to look, focus his AI.'S on looking for vulnerabilities in orchard and in the conversation, he said something to the effect that there's very few pathways in zebras. It's like zebra is well hardened, is what he said. I think. Oh, and by the way, Bootstrap, shielded labs, zodl and Zcash foundation all donated 50 zec to give to that guy for having discovered and reported this sprout  bug to us. So he got a nice reward, kind of thing. But anyway, my point is there's another so I always thought zebra was better because it's newer and written in Rust, but I have the specific reason to think that Zebra is safer than Zcash D, that's all.

Arya: 00:23:53  

Thank you, zooko, and it's being hardened further

Daira: 00:24:02  

Yeah, I have something to say about that. So, yeah, the fact that this was in sprout code is significant because this is code that hadn't been touched, really, since, was it 2020, and that code really isn't getting a lot of attention now, but it's still, as we saw, presenting an attack surface. It's written in C++  we were adopting quite strict security review practices, but we had less experience in writing secure code, and so it really is important to remove that attack surface from protocol, zip 2003 for example, yeah,

Zooko: 00:25:08  

One time I spoke to someone who I consider a real expert on this computer security stuff, Yvonne kerstitch, who's the head of security at Apple. It was a long time ago when Zcash was new, like six years ago, and I was like, Yvonne, I want to learn from your wisdom. What's the number one thing we should do to improve security and protect users of Zcash? And he said, Stop exposing C ++ code to the internet. So it's the number one recommendation, starting like seven years ago, and we're almost there.

Daira: 00:25:39  

Can everyone see me, by the way? okay, never mind. Okay, yes, well, I'm not going to be too small and say I told you so, but I did tell you so

Pacu: 00:25:53  

I was gonna say, Daira has said this many times so you didn't have to, I want to, like, first, thank the community, because they have been really patient  with this whole process that is taking a lot of time deprecating a huge piece of software that is still supporting our network is not something that we take lightly, and we do it really carefully, and that's why we are taking the time that is needed to do this safely. But it's really important in terms of the protocol, that we keep this trend of removing things that are tech debt and attack surfaces, and to reduce the complexity of the protocol. I know that there are several community members and coin holders that are concerned about shielded pool deprecation and how it looks and how it changes the expectations of people storing some keys somewhere for a really, really, really long time. So we invite you to discuss this, to propose zips, to maybe propose ideas in the forums on how we should carry this forward. But it's important. That we do it, because the more  that we keep juggling we give a lot of leeway and attack vectors to our adversaries to try to put our project in jeopardy. So we need to have this discussion and keep innovating because we introduced the concept of shielded pools and  we will have to innovate in this as well. I think it is a really good thing because we're really good at it. And, and, yes, let's discuss this and see how we can arrive at a consensus to keep our protocol fresh, and you know, as lean as possible.

Daira: 00:28:35  

I'll try to be brief, so there is a good way of providing that functionality of a long term storage pool that uses more conservative cryptography that we could support in the long term. And we've had some ideas about that, and I'm going to write them up. Sorry about the background noise,the protocols that we've implemented for now have kind of had to be a compromise between  using a payment protocol and using a long term storage protocol. A long term storage protocol can be simpler and less attack surface. So I think that's the approach we should follow going forward, but we will need to remove our pools.

Arya: 00;29:28  

Thank you Daira, so on that note, perhaps qedit, anyone feedback? Any updates from Qedit?

## Research & Implementation Updates Qedit-Zcash shielded Assets

Vivek: 00:29:43  

So yeah, like, the high level update has been that we've mostly been tying up various loose ends on the Zcash shielded assets front. So we, like strad, had been also doing work on the orchard Zsa pull request, like PR 471, that we have, so we had reviewed that last month, and we responded to all the comments, and we also, like pulled it, we merged upstream back into our branch. So that's basically like issuance handling was improved, and we added some visibility that we needed for use in zebra. But, yeah, that's also ready for review, and it's, I think, pretty close to being done. So I hope that the review will continue, even though strad is on sabbatical. Yeah. Other than that, we've also looked at the sapling crypto crate. We like the Zcash note encryption crate had changed some time ago to allow for multiple notes to be encrypted, notes of different sizes to be encrypted. So we submitted a PR that updates sapling crypto to basically conform to the new interface of Zcash node encryption, while keeping, obviously, saplings node sizes unchanged and the same as before

Daira: 00:31:14  

My conclusion was that, yeah, we should probably merge this to unblock things, but it's not sufficient to do memo bundles, and it's not necessary to do ZSAs, so yeah, there's gonna have to be another refactoring after this. Anyway, Okay,

Vivek: 00:31:43  

So yeah, beyond that, we've also caught up to the upstream pretty much on the Librustzcash crate as well, and we reduced some of the diff that we had from upstream. That's like prep. But we've basically, like, caught up to whatever changes were there as knock on changes from the review of the orchard crate. And so we are sort of keeping things ready so that we have an upstream PR, I think PR, 1931, and that we are keeping that ready for the review that should possibly come next once the orchard review is done. We've also made, sorry?

Daira: 00:32:27  

That's right, yeah, that's, that's the next thing on our place after that, right?

Vivek: 00:32:32  

Yeah. Then in the test vectors as well, like the Zcash test vectors repository, we have our Zsa changes that are ready for review. I think Alfredo has been looking at the formatting changes that we had put in, and there's been some progress on that, but, yeah, the ZSA changes are also open for review. And the other, the top of the stack is zebra, which we've also, again, like, done the knock on changes for the orchard review. And we've pretty much, I think, completed the state management as well for issued assets. And we also, like, I think we were synced with Zebra 2. 4.0 I guess. And we like, bump that up. We've been syncing with, I think version 4.2.0 which is pretty close. I think 4.3 was what was released. So that's, I think, that we are still, like reviewing internally, but it's largely done, and it's just under review. Yeah, there were no changes, I mean, the ZSA zips, which is nice. Hopefully things are like, stable in that sense, at least. But of course, they're like, We there would be changes that come in from the move to zip 248, and so on. So, yeah, we'll be keeping an eye on that. Yeah, I think that's, that's the main review that I had, the update that I had.

Daira: 00:34:08  

Yeah, I think zip 2005 already takes Zsa into account. It's, it's just the 248 that needs to

Vivek: 00:34:17  

I'll be keeping an eye on the changes I haven't like, actually reviewed, reviewed yet, but yeah, I'm keeping track of what's happening in that PR, 1156, yeah.

Daira: 00:34:36  

There probably will be an interaction between 231, and the ZSa zips as well. So that's the memo bundles. Right, correct. Okay, great, yeah.

Arya: 00:34:52  

Thank you. Vivek. Any other questions or comments on Zsas. Looking forward to seeing the zebra-only testnet spin up with this. Okay, so next we have research and implementation updates from shielded labs on the NSM. Anyone available to take that on? Zooko, perhaps

## Research & Implementation Updates Shielded labs- Network sustainability mechanism

Judah: 00:35:16  

I think this one's me,so I will keep it super brief, Zip 235 was merged in, which is awesome. Thank you to all the people that have reviewed it and given their feedback over the course of that PR, that's really awesome. So that's merged in and released behind the configuration flag or compile time flag. The only things that are left are zip 234 and the refactor PR. Zip 234 s PR is blocked by the refactor PR. So just need some eyes on that whenever people have some time, and I'll post it in the chat right now, but that's about it for me 

Arya: 00:35:57  

All right. Thank you. Judah, next, we have research, research and implementation updates from shielded labs and zodl on crosslink. 

## Research & Implementation Updates Shielded labs, Zodl, Crosslink- Trailing Finality Layer

Mark: 00:36:06  

I can give this update. We are working towards the launch of our first incentivized testnet with a workshop that's going to take place on April 15. Currently, the team is really just kind of buttoning up things around stability, particularly around the new networking components that are built in for syncing So, and we've been working with a number of teams on that, namely the ZF on parts of that, and I think a little bit of the tachyon team as well, at least getting feedback from them. That's about all. We also started the zips for cross link, but they're really just stubs, and we'll be submitting, you know, proper stubs in some short time here, maybe not before the 15th, because we're focused on the workshop, but maybe, maybe by then.

Arya: 00:37:11  

Okay, thank you. Mark any questions on cross link or comments?

Daira: 00:37:17  

Yeah, so what kind of structure were you thinking for the spec? Because obviously  crosslink is designed to be modular. And so there's a BFT protocol, there's the block header changes, and there's the fitting those together and defining the finality gadget. So how many zips roughly do you think will be needed?

Mark: 00:37:49  

I think there'll be a number of them. I know less than three, and potentially more, depending on how the zip editors want to split them up. And we're pretty open to that?

Daira: 00:38:00  

That's my intuition, too Maybe probably more

Mark:00:38:00  

We are keeping that in mind as we go. I don't think it's going to be one monolith zip. I think we're going to, you know, the risk is that we end up in a situation like the NSM with this voting, where we get parts of them voted in, and parts of it not, but I think we'll just have a better ballot by then.

Daira: 00:38:26  

Yeah, so there's a, I think there's a clear path towards an incremental deployment, and so I would like to see any poll questions oriented around that. So, so do we do stage one? Do we do stage two and so on? Rather than kind of the zip boundaries will not be the right boundaries to ask questions about.

Zooko: 00:39:01  

designed for analysis by engineers, exactly.

Mark: 00:39:17  

Any other questions? Yeah,

Arya: 00:39:24  

Okay, moving on. Dynamic fees

## Research & Implementation Updates, shielded labs- Dynamic fee

Mark: 00:39:29  

Also, I think last time you recall I was talking about withdrawing the preliminary zip that I submitted for voting eligibility, I have since rescinded that zip and now taking a much more UX focused approach on just the design and discovery of dynamic fees in general. You know, it was not voted in for the Nu 7 sentiment poll by the coin holders. So it gives us extra time to explore as such, we started doing some wallet outreach. We talked to the folks at unstoppable just about their experience with fees, and maybe some experiments we can run to get information on Mainnet. One of the principles that we're building with is that mainet data is kind of the only data that matters when it comes to these fees and maybe other things. So we're just looking for ways to get useful data from mainnet about fees that we can use now to inform our design as we move down down the road. So also, of course Zodl, we reach out to your Wallet team at some point, and then, you know, Z cool, Zingo, maybe edge just, just to kind of talk to the teams and see what their experience with fees is with their users. And we really want to center the users in this design. So that's what we've been doing. Practical question, what do folks think about potentially lowering the marginal fee from 5000 to 1000 given the price action and given the, I don't know, relative stability we've been seeing lately? I don't want to, you know, obviously talk about price at all here, but just what are people's first impressions about that idea being proposed?

Daira: 00:41:31  

I think that's too much of a decrease to just my intuition about that because, well, let's put it like this. If we did that, and the sand blasting started up again, then we would want to have a quick option that could be easily deployed to put it back to where it was. I think maybe if we had that, then it would be a lot better. But that's starting to look like, yeah. I mean, there's some centralization involved in deciding what a fixed fee is, so you don't really want that either. It needs to be based on objective criteria. So yeah, we'll figure something out

Arya: 00:42:21  

That would make me nervous as well. I think what we need to consider is not just the fee and fiat currency, but also the fee relative to the overall value of the Zcash chain. Because if the chain is more valuable, an attacker might be willing to put in more resources to spam it. Dynamic fee would be nice.

Daira: 00:42:45  

There's also a differing sort of regulatory environment. So if you're an adversary whose objective is to take down the coin, then escalating fees to a high value, if there's a dynamic mechanism, is one way of doing it. Kind of having fees be so low that it gets dust by some other adversary is another way. So we have to be really careful about that. 

Arya: 00:43:15  

Any other questions or comments on dynamic feeds. Open announcements. Does anyone have any announcements they'd like to share Going once? Open discussion. Are there any topics that anyone would like to discuss?

## Open Discussion 

Arya: 00:43:46  

I have a quick question about crosslink. Has there been any research or thought put into a DAG BFT, like the one that  avalanche use or not yet?

Daira: 00:44:05  

I'm quite keen on bfts, so I think they have some interesting security properties. I've only really started reading papers on this very recently. So I think maybe what we want to do is have a gadget that gets these better security properties that you can plug in an arbitrary you can still plug in an arbitrary BFT protocol and necessarily have them, and that would preserve the modularity. Do

Mark: 00:44:49  

I also looked at the avalanche consensus protocol, how it does the sort of confirming transactions, then confirming whole blocks at a time and has more rounds. There was another person, I figured, who they were, that was really keen on DMing me a lot about how crosslink should use avalanche. But then it appears that avalanche is not final in the way that tender tendermint is. So it's sort of kicking the finale down the road a little

Daira: 00:44:59  

It's very hard to analyze. Avalanche. It's not my favorite. Maybe I'm biased.

Arya: 00:45:35  

Story might be a little bit better than avalanche. Bull shark in particular. I know they're not using it anymore, but bull shark seemed very impressive

Mark: 00:45:52  

Bull shark and narwhal were were very cool and popular back then, like 2021 2022

Daira: 00:46:01  

We should  also look at what Mina is doing now. If we're done with the discussion about BFT algorithms, I have another topic. So has anyone had the opportunity to read this Google paper about quantum computers? It made quite a splash.

Zooko: 00:46:35  

I've read it with partial understanding.

Daira: 00:46:45  

Anyone have any impressions about it? Because there are two headline things that first, there's a way to do circuits for discrete log, quantum circuits to discrete log in much fewer gates. And they actually don't disclose the circuit. They do a ZK proof that it exists, which is interesting. I'm not sure it's actually necessary. I think that will be rediscovered in short order. But the other thing is, they did a big analysis of how quantum attacks applied to various cryptocurrencies. And there's clearly a lot to say about that, because it's a huge Jerry you're analyzing lots of different protocols at once, and they did miss some things, as I said. So I think what I'm going to do is submit some corrections to the paper and also talk about them in a blog post.

Zooko: 00:47:47  

If people haven't looked, they analyzed Zcash specifically in some depth in that paper.

Daira: 00:47:56  

They did and what they said isn't incorrect, per se, but like I said, they've missed a couple of important things. For example, they imply that Halo 2 is better because of the untested setup. Well, it is against classical computers, but against quantum computers, there's basically the same attack. It doesn't matter whether it's a structured reference string or an unstructured reference string, if you can compute a single dispute logarithm, then you've broken the proof system. You've also broken the commitments of the value commitments and the note commitments. So I already knew all of this and it's informing our approach to a fully post quantum Zcash design, but a lot of it is missing from the paper, so I'm going to make sure that the attacks are described accurately. Good.

Arya: 00:49:07  

That's pretty big, impressive, I told you, so you caught that very early daira emma

Daira: 00:49:12  

Yeah, I told you,  to do this particular call of the sprout attack service one on the post quantum computer. Computer, the imminent one. Quantum computers, I should say post quantum crypto.

Arya: 00:49:36  

Most people, I think, did not think it was going to happen this quickly, except for you,

Daira: 00:49:45  

Except me and Dan Bernstein, I must give credit, though he's been predicting this accurately since about 2012. Well, I can't remember the exact year, but roughly that. If you go to my post quantum Zcash presentation and on the slide where it has the estimate, if you click on that link, then you'll see all of Dan Bernstein's previous estimates, and they have been spot on. Really, yeah,

Arya: 00:50:26  

Any other questions or comments on this topic, or any other topics that anyone would like to discuss, going once, going twice, if not, then I think that concludes our April 2 arborist call. Thank you again for everyone who presented and for everyone watching on YouTube

Next Meeting Scheduled: April 16th 2026. 21:00 UTC
