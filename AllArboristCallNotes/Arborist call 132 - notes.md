## Arborist Call 132 Notes 

Meeting Date/Time: 17th Sept 2026, 15:00 UTC

Meeting Duration: 35 minutes

Welcome and Meeting Intro 

Zebra [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update) 

Zodl [Update](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zodl-core-libraries-and-zallet-cli-wallet) 

Research & Implementation Updates [Qedit zsa](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-qedit--zcash-shielded-assets)/[zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#core-stack-updates-zingo-labs--zaino) / [Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--nsm) / [crosslink](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--crosslink)

Open Discussion [NYM,Zcash integration](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion---nym-update-on-zcash-integration)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=5Vgq0sXJ_Co&t=13s)

Moderator: Alex

Notes:chidi (X) @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Alex: 00: 08:02

Zcash Arborist Call September 17, 2026. So today's agenda is core stack updates: Zcash Foundation with Zebra, Zodl with Core Libraries and Zallet, CLI Wallet and Zingo Labs with Zaino, and then research and implementation updates with QEDIT on ZSAs , Shielded Labs with the NSM, Shielded Labs with Crosslink trailing finality layer, Shielded Labs with dynamic fees, Zodl with formalization, and then we'll have Nym as a guest presenting update on Zcash integrations, and then any open discussion following that.  

So, what are Arborist calls? Biweekly calls where Zcash protocol contributors convene to discuss upgrade timelines and processes, protocol R&D efforts, design and implementation of new protocol features, and identify blockers and unresolved issues. Purpose is to make core Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Who can participate? Anyone interested in learning about Zcash protocol development can register at zcasharborist.org. If you want to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot. Other ways to get involved: Zcash Community Grants, Zcash R&D Discord, Zcash Community Forum, and these links are all listed on ZcashArborist.org. So let's get started with core stack updates: Zcash Foundation, Zebra, Janito.

## Zebra Update 

Janito: 00:09:34

Thank you. Yes. So since the last Arborist call, we haven't made the new release, but we're looking to have a new one soon. In the meantime, we had a few repairs merged. The main topics are: we had improved reliability in sync, so we had two fixes for issues that cause stall progress. One was because a new missing UTXO caused a timeout, and that restarted the sync unnecessarily. Even though the prem commit could provide the UTXO soon, just a bit more tweeks. We also had some consensus checks restored before the release because since the last release, we upgraded the transaction format using, I think it was Zcash, and that removed a few checks we had, and now we restarted before the release, so everything's tight again. Hopefully, we're still finishing that work. We have more meaningful validation and safer RPC accounting, so we have more regression tests, and we're also checking if a proof has failed. So, well, basically proof the orchard proof checks. Not really sure exactly, but yeah, there was some work on that as well, and also there was some efforts in improving CI to make it more robust and also make it faster for us engineers. There's some work in progress. One of them is improving peer scoring for stall detection. So if a peer is misbehaving, now we're trying to be more nuanced about what conditions we detect and how we detect if there's a stall or not. If the peer is trying to stall us, actually, we're working on improving the mining template performance. So there's increased latency by precomputing templates, but also trying to keep it updated based on internal events. So that's ongoing work. We also are improving verification performance using caching and a few other things. Then work started for NU7. We have a PR that does initial work. Nothing to be active yet, but it starts adding the code at least. And there's some other fixes, but I think that's mostly it, and yeah, I think that's the update.

Alex: 00:12:07

Any questions for Janito? Great, thank you. Moving on to Zodl with core libraries and Zallet CLI.

## Core stack Updates zodl Core libraries and Zallet (cli wallet)

Kris: 00:12:21

Yep. So, in terms of core wallet work, or excuse me, core library work, a major thing that we've been working on over the past couple of weeks is updates to the Zcash org library stack  to bring in a number of  performance improvements that had been pioneered by the the Valar Group team and Project Tachyon in Zakura. So we're bringing in assembly optimizations to the pasta_curves crate and then  performance improvements in in Sinsemilla, so we're working on crate releases for those actively. We've also been doing a number of things, including essentially review of features of the coin holder voting system. We've landed the ZIP 248 proposal for a transaction format change for network upgrade eight. Thanks to Arya also for their contributions from ZF on that. Just have to look through. Apart from that, we've landed a number of minor changes in the zcash_client_backend code in support of better, you know, bug fixes in multi-account functionality and some fixes for or improvements for how we're handling Tor connections there, and that is the majority of what I have to report on right now.

Alex: 00:14:14

Any questions for Kris? Thank you. Zingo Labs with Zaino. I think that's Hazel, and we just re-promoted them. Okay. We'll come back to you, Hazel. Let's see if you can fix. They're having some audio issues, so we'll see if we can come back. Hold on one sec. Oh, Eli, are you able to give the update? All right. Let's move on to the next. And if Zingo is able to provide an update, we'll come back. QEDIT with Zcash Shielded Assets.

## Research & Implementation Updates Qedit- Zcash shielded Assets

Vivek: 00:15:08

Hi. So that's that's me today. So yeah, I think the overarching work that we've been doing the last couple of weeks is that we've continued putting all the ZSA work that we've done on top of NU6.3. The good news we have is that the Halo 2, we had an open Halo 2 PR number 887 and that's been merged recently. That was like all the changes to Halo 2 that were needed to like support the ZSA circuit, so that's like the supporting changes. So that's been merged. on the Orchard side. We had a discussion with the core team, and we have split the work that we've done into two pull requests. So we have one pull request, which is just the circuit work, which will basically keep the circuit, like add the circuit in, but keep it sort of out of the actual protocol. And then there was there'll be like the second follow-on pull request, which will add the rest of the pieces in and like allow  the ZSA circuit to be used for that. So we have submitted the I think it's pull request 546 on Orchard and that's been submitted to upstream and I think it's being reviewed at the moment. on librustzcash again like we've largely pulled up to NU6.3 as well we um I think like one couple of the things that are pending there is mainly just that we have the test vectors like the Python reference implementation. So we are working on adding our changes to that as well, like on top of  NU6.3. So we had, I think, a couple of open pull requests, pull request 108, 112, and so on. So those will probably like get subsumed by the new stuff because there's been a bunch of changes to the test vectors, and we are making sure. Like I think quantum resilience, for example, also comes in. It changes the ZSA key structure, and so we are working on making that work as well. And yeah, we've also been doing similar changes to Zebra and our transaction tool and so on. So basically, across the stack, getting our work ready with all the work from NU6.3 included. On the swap side, we have also continued making some improvements. We earlier had swaps being added  on a later stage to ZSAs, and now since like the ZSAs are happening later, we we are looking at how it would look if we just better integrate the swaps and ZSAs together into one piece and see how we can like make improvements there instead of having it as two separate pieces, so we are also working on that sort of stuff. Yeah, that's basically the update I have.

Alex: 00:15:08

Any questions for Vivek and QEDIT? Great, thank you, Eli. Did you want to provide the update for Zaino for Zingo?

## Core stack updates zingo labs -zaino

Eli: 00:17:55

Yeah, perfect. We have been working on like landing a big refactor, and we're almost done. So that brings a bunch of like sync performance improvements and lots of like usability improvements and reliability. We've also started to move on to looking at some performance improvements for like the serving side. So we've gotten sync to a decent state, and so now we're kind of looking into optimizing the compact block RPCs and yeah, speeding those up, and then yeah.

Alex: 00:19:07

Great. Any questions for Zingo? Great.. Shielded Labs with Network Sustainability Mechanism.

## Research & Implementation Updates shielded labs -Nsm

Jason: 00:19:18

So for the NSM, the poll results were released on Monday. They showed support for the version of ZIP 234 that preserves halvings, not the version that smooths the issuance curve. And then there were mixed results on the question about when to start reissuing or recycling ZEC that's been removed from circulation into future block rewards. Panels wanted ASAP. Coin holders voted for February 2031. So after discussing it with the other development orgs, we decided on February 2031 because it was the most conservative interpretation of the results. So we're working to implement ZIPs 234 and ZIP 235 into Zebra and Zakura by September 30. My understanding is that it was decided in the most recent R&D meeting that a new value pool will be introduced, since it doesn't require a transaction format change. So basically, it will receive 60% of transaction fees, as well as unclaimed mining rewards, which will be used more or less seed the NSM. Daira-Emma is planning to update ZIP 234 to reflect these changes, but we're happy to help if needed. And since ZIP 233 requires a transaction format change, that will be included as part of NU8, and that's it.

Alex: 00:20:49

Any questions for Shielded Labs on NSM? Great, thanks, Jason. Shielded Labs on Crosslink.

## Research & Implementation Updates shielded labs- crosslink

Philip: 00:21:03

Hi, can everybody hear me?

Alex: 00: 21:06

Yep.

Philip: 00:21:08

Hey, everybody, welcome to the Crosslink team. Last Arborist call, we said we would hold a workshop on August 26. We did that.  at the workshop. We reviewed our progress. We covered the stability improvements and the user-activated slashing feature. We announced the round two payment date. Shared our plans for the next network implementation, nightly network, and we got a lot of great feedback and a lot of great questions from the participants. Really well. We actually held the workshop in person during our quarterly summit in  Massachusetts, where we also discussed next steps and roadmapping for CrossLink. On the last arborist call, we said we would prepare a  restart. We're doing that now. It's on track to restart around the end of this month, like immediately after the round two payment cutoff, we said we would merge Zebra updates made since we originally forked it, and that it would include Ironwood. We did that. We merged  a commit of Zebra from August, so it's around like Zebra 6. 2.3. We said we would include consensus changes based on lessons from the first network. So we've done a first pass of almost all of them, including finalizer commission for finalizers and updating stake redelegation actions for easier slashing logic. There's also a few more in progress. We're transitioning the engineering of the codebase more towards the design as intended. So that means disambiguating different definitions of finality in the codebase and making progress on sprucing up our documentation of our official cross-link design. We're also making robustness and completeness fixes for staking action logic and then fixing some issues and oversights that happened when we merged the new version of Zebra, and also making some improvements to testing. We also said we would deploy a nightly network that restarts frequently for the purposes of high-frequency testing of new consensus features and progress we're making. You know, in preparation for the feature, the stable feature net restart, and that's going well too. We've deployed the first iteration of that already. Some participants opted into playing around with it, so it's going really well on that front. And that's about it

Alex: 00:23:57

Great. Any questions for Shielded labs on Crosslink. Thank you, Philip. We're flying through this today. Shielded labs with dynamic fees.

## Research & Implementation Updates dynamic fee

Mark: 00:24:11

Yeah, so this is not directly dynamic fees related, but it is fees related. The ZIP editors are working through a 2000-level ZIP that lowers the marginal fee to 1,000 and raises the weight ratio cap to 10x. That draft is kind of ready and ready and waiting to hopefully be merged as a draft. But all the NU7 stuff is now in play, so this might be backburnered for a minute. So that's really the whole update.

Kris: 00:24:48

Yeah, I think that if we can get this in  on the NU7 timeline, that would be positive. the The big thing there is that because it's a fee reduction, wallets can't implement it before full node block construction takes it into account and particularly full node relay takes it into account, and so so I think that it's actually pretty important for us to essentially make this part of NU7 so that full nodes that will be NU7 supporting  won't have to wait for another full node release after that for these to go down, especially because you know, coin prices are continuing to do nice things.

mark : 00:25:45

Yeah  that's true. Yeah, let me clarify. And for the audience, the factor here is  the node end of life block height. So we want to land the dynamic fees code changes. I keep calling them dynamic fees. I apologize. The parameter changes in code by the EoS height that is associated with NU7 . That's the target that we're trying to do here. So I will be making pull requests, and I think Zakura is either waiting for me to do a pull request or they'll just go ahead and do it, but I'll do those, and then I only meant the ZIP editor process , we might prioritize other NU7 things before that zip, but I will make the PRs a zebra. There's already one out there. I'll just update it with the marginal fee change.

Alex: 00:26:46

Great. Any other questions for Mark on the dynamic fees? Thank you, Mark. Actually, go one more.. One more. One more. Yep, I put this in the wrong place. So Zodl, Zodl  update on formalization.

## Research and implementation updates zodl- formalization

Kris: 00:27:08

Yeah, Daira-Emma is not available to attend today, and I am. Oh, oh,

Daira: 00:27:14

yes, I am. Okay, so we're aware of the kind of blog post from  Zakura saying that they've proven ZK for the action circuit and Halo 2. Yeah, I've been reviewing that draft, and yeah, there are a couple of minor gaps I think that can be straightforwardly fixed. So currently the proof takes about an hour and a half to elaborate. So I've been working on improving that to probably about it'll probably end up being about 20 minutes, I think, and it was only for Zakura's prover. So there are two things that need addressing there. First, you have to kind of generalize it to to support fixtures from both the core approver and the upstream prover, and there's also some changes that Zakura have made within the zero knowledge in their blinding implementation. So what they're doing is actually more complicated. It's straightforward to prove it for the upstream one as well. So that's what I've been working on.

Alex: 00: 29:12

Any questions? I'm

Daira: 00:29:13

also writing a blog post about kind of the higher level security properties part of the formalization.

Alex: 00: 29:28

Any questions for Daira on formalization? Great, thank you, Daira.   Open discussion. Nym has asked to provide an update on Zcash integrations. Max, I believe that's you.

## Open Discussion - NYM Update on Zcash Integration

Max: 00:29:48

Brilliant. Can you all hear and see me? Yes, great, perfect. Yeah, I think it's just me. It was meant to be both me and Harry, but I'm going to kind of do both of them because I think he's running a bit delayed. So yeah, basically we have there was a proposal that was put into the Zcash forum and accepted for some work to basically allow for Zcash wallets to use Nym. that work is now complete, and I'm going to do like a little bit of an overview on what we built for it and the current status of integrations as well, because there's kind of a couple of them. So I can go over what mixnets are, kind of in general, just so everyone's on the same page, and basically a mixnet is it's an overlay network that routes messages through independent relays. So you are breaking apart the ability for a single party, such as a kind of a global passive adversary, someone who can watch an entire network and all the traffic flowing through it, see who's talking to who and when and in kind of what pattern, it differs from something like Tor or a VPN because they're connection based. You make a circuit in the case of Tor, but a VPN you're just kind of baking a tunnel, and you're basically sending packets through that industry. mixnets, you actually break all of your in the case of a Zcash wallet, maybe a transaction, maybe a wallet sync message, into many different packets, Sphinx packets that are all kind of identically sized, identically encrypted, padded. So  basically you're not able to do kind of traffic fingerprinting, and then you slot your real packets into noise cover traffic, so you break up the ability to kind of do timing-based attacks as well. The mix in mix node, oh sorry, the mix in mixnet comes from mix nodes, and what these basically are is instead of sending packets in like a first in first out basis, like something maybe like a Tor relay would, then they also add a random delay. So  you can imagine it like you're shuffling a deck of cards each time you get a packet. So this is how we kind of break up the ability for various episodes to do things. That's a very quick overview of mixnet. Basically, from looking at the Zcash wallet infrastructure, we identified two different, I suppose, threat actors or threat models. We tried to address both in different ways with this work. So first of all is the global network observer, the global passive adversary I kind of talked about before, and the other one, which is maybe the more immediate problem that wallet users might be facing, is untrusted infrastructure endpoints. So maybe wanting to unlink their sender metadata from whoever is running a lightwalletd instance, and we have examples of both of these in the code that we've basically made as well. One is actually, you know, a lot of our examples are actually talking to live lightweight instances, and then with the GPA, that's more of a property of the mixer itself. So  what we've actually built is three SDK modules or crates that Zcash developers or Zcash yeah Zcash devs can use for wallets and hopefully in the future as well for infrastructure. So we made a stream module for our SDK, so a kind of a byte like a byte stream primitive, and this allows. There has been an example of this being used or integrated with NozyWallet, and this is basically where you integrate the Nym SDK stream module into your wallet, and that is able to talk to a Nym native service provider is the term that we use. So this is a a service on the other end. In this case, a modified instance of lightwalletd that has a Nym address, and this enables the wallet to communicate with this modified version of lightwalletd, and as well as unlinking sender and receiver, then the lightwalletd instance is also able to actually like reply anonymously to the wallet without ever learning even its Nym address. So it doesn't really learn any identifying information of who it's even talking to using something called Single-Use Reply Blocks, or SURBs.

Max: 00:34:45

To be clear, all of this stuff now you are able to. These are kind of transport agnostic, so you are tunneling the normal gRPC traffic that Zcash wallets want to use through the mixnet. It also supports HTTPS, TLS. It's basically  a generic tunnel. We've also made something if people just want to use client side only integrations called smolmix, which is a basically a userspace TCP/IP stack that runs over the mixnet, and that basically uses the exit gateways and their services called IP packet routers to essentially proxy your traffic to a kind of a clearnet endpoint. So the difference between these two things is one is a Nym address, and the other one is maybe the normal announced address of your lightwalletd instance. We also built something that we call nym-smoldvpn, which is a user space WireGuard tunnel. Now, this is where you would kind of be because of the added latency of the mixnet. This is where the  things that we've built kind of diverge. So the stream module or smolmix that are useful for sends and sends are where you want to have the kind of highest level of defense or kind of defend against the you know the largest kind of threat actor that you can. But unfortunately, when you're syncing a wallet, then the mixnet is a little bit too slow. So this nym-smoldvpn, which is a kind of a two-hop WireGuard tunnel in a tunnel, with some censorship-resistant kind of quick bridges as well built in, if that's necessary, that would be for your wallet syncing as well. And the final thing that we made is actually something that all of those three they sit at the networking layer, but we've also added something that basically further defends Zcash wallets at the application layer, and that's what we're calling Nym Swizzle. So what this basically is, this is a Rust, just a Rust crate. It's not a service. There's no network I/O or anything like this. And what this does is it allows for it to kind of randomize the resume point chaining. So basically, if you're syncing a wallet, you're always kind of syncing from the previous sync point that you've had plus one, if you're kind of doing block syncing or block header syncing, what this does is it allows you to kind of randomize the block header request batches that you're making, so you're not kind of identifying yourself, and then it also allows you to add delays to broadcasts, so you're able to, imagine the situation in which you're syncing a wallet, you sync and then immediately broadcast, then there's a good chance that a a light wallet instance that kind of receives both, it's you know that they can link that, they can make an assumption that that's probably the same user, and that's identifying information that's being leaked. So this is a way of, in just to essentially add delays to your kind of async send operations, both in terms of like requesting blocks and actually broadcasting transactions. All of these are now published. We have our documentation on nym.com/docs. They're all on crates.io, and we will be writing a kind of a larger blog post update as well in the forum. At the moment, we know that Zkool and Zingo have already integrated this, and we're in discussions with other wallets as well, such as Zodl. So the next step that we could do with this would then be to extend these kind of defenses in some form between the lightwalletd server and the Zcash full node behind it, because we've at the moment this work is just really focused on the wallet to lightwalletd work. I realize that was a lot longer than everyone else's update, so I will see the floor. But if anyone has any questions, please let me know.

Kris: 00:38:53

Yeah, my one question there is with the lightwalletd modifications  have you upstreamed those yet, or attempted to upstream those yet because that's really interesting.

Max: 00:39:23

So we  ourselves weren't actually working on those, but there was a very long discussion that I was having with two developers in the forum who are working on NozyWallet who have got a forked version of Lightwallet D, I believe. Let me just try and grab that forum link for you, Kris, and I can put it in the chat.

Alex: 00:39:55

Additional questions for Max and Nym. Great, that was an awesome update, Max. Thank you very much. We always appreciate when grantees come and provide in-depth updates like that. That's great. Additional or any open announcements? Okay, and open discussion. Is there any topics anybody else would like to bring up as far as the open discussion goes? All right, this has been a very efficient call today. I know we all have lots of other stuff going on thanks to everybody for participating. Have a great couple week Thank you.

Next Meeting Scheduled: 1st October 2026, 15:00 UTC

