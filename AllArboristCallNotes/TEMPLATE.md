# Arborist Call #98 Notes

Meeting Date/Time: 3rd April 2025 15:00 UTC

Meeting Duration: 45 minutes 


**Agenda**: 

+ Welcome and Meeting Intro 

+ core stack updates

+ ECC Core Update - 

+ Research & Implementation Updates 

+ Open Announcements 

+ Open Discussion 

___

### Decisions and actionable items 

i) make neccessary changes to the frost key generation process to ensure post quantum ressillience - Daira emma

ii) Team to take a closer look at the zenith and zallet and provide input on the proposed features -zcash foundation


___

Video of the meeting: [https://www.youtube.com/watch?v=XxQx6vt7OmE&t=24s]()

Moderator: Arya

Notes: chidi

___



## Full Notes

### 0. Welcome & Meeting Intro - 

Arya  7:52  
Okay, so thank you to everyone joining the stream or watching on YouTube. This is the arborist called for Zcash. Arborist calls are scheduled at 15:00 UTC, and there's another one at 21:00 UTC, alternating on a bi weekly basis, and this call will be recorded. So if you don't want to be recorded, please turn off your microphone and camera now.


___

### 1. Zebra Update - 
Marek  10:00  
Yep. Thanks. So in the last few weeks, we rebuilt a bunch of things in our CI and Docker, and we also changed the way we configure Zebra Docker. Some of these changes are breaking changes, and the one that most people will probably notice is that the RPC endpoint is not enabled by default anymore, and users will need to enable it manually. Then, as regards RPCs, we extended the getblock, getraw transaction and get peering for RPCs. We added the invalidate block and reconsider block RPCs. We added support for negative heights to RPCs that were supported in ZcashD. We fixed the bug in trusted chainsync that was bugging the Zaino folks. We also brought back the internal miner that is useful for generating blocks on testnet and racfs. We fixed the order of outputs in Coinbase transactions as well. We had it the other way around then zcashd, and this was confusing block explorers, since they rely on the order,  
The last thing I have here is that we refactored the way zebra handles its internal database for Mac upgrades. This was to allow much better maintenance for new upgrades as they come. And I'd like to thank all external contributors and all people who opened issues. Very much appreciate it. That's all from me.

Arya  12:16  
Another quick shout out to str4d and Teor for pushing the echo hash PR through and helping us get the internal miner in. So next in the hot seat, I believe, is Kris, I'm guessing, but yep.

____


### 2. ECC Update -  

kris  12:28  
So in the past week, we have had new releases of or I guess, since the last arboristcall, we have new releases of the whole librustzcash crate stack. This brings in, well,  a number of things. The big thing is transparent, gap, limit based wallet recovery. So you know Bitcoin style,  wallet recovery for HD wallets, the other major area of focus is, of course, zallet. We now have a branch where we're able to sync the chain using Zingo as the source of data, and now are working on Z send. The other piece that's going on with zallet is we talked a bunch  with developers over the last couple of weeks, and I am in the midst of implementing a ZcashD wallet that imports into Zallet via the Zwift export. So that's all. That's all the high level stuff. Couple of other things that are going to be relevant. One is that I think Derek and Strad haven't joined yet, but Daira- Emma, do you want to talk a little about your post quantum work?

Daira-Emma  14:07  
 Yes, okay, let's see. Shall I screenshot?

Kris  14:14  
Well, I mean, this is, this is just the update so we can, we can talk about it in more depth later, but, but it's worth, it's worth giving a high level overview,

Daira-Emma  14:22  
I think, yeah. So basically, the idea is to change the construction of nodes in order to kind of enable a smoother transition to post quantum. So the problem is that the current no commitment scheme is not post quantum binding, that would allow a quantum adversary  to violate balance, to function, basically. But there is a change that we could make, which is a relatively simple change. It doesn't actually change the consensus protocol proper. It only changes how nodes were constructed in a way that surface does not affect consensus. So it does affect the nodes encryption and decryption. So if we do that, then the effect would be that new orchard nodes created by a wallet  that supports this could later be spent using a post quantum protocol, and so we wouldn't be in the position of having to completely disable the previous protocols and not have a way to spend existing nodes safely. So I think this very good idea to do this. I'm currently, sort of finishing, finishing the analysis of the changes, but the analysis seems relatively straightforward, so I think this could potentially be done at the same time as the memo bundles and any Sudden changes to net encryption.

Arya  16:40  
any questions for the ECC. So next is Zingo labs. I don't see anyone from zingo, I don't see anyone from QEDIT either. I can give an update for them, they're just mostly focused on the changes to the Zip's in response to Zip's editors comments. And I don't know who's here from shieldedlabs, 

___


### 3. Research & Implementation Updates i) Network sustainability mechanism - shielded labs

Jason Mcgee  17:05  
awesome. Yeah. So no update on the NSF. Basically, we're still waiting on a couple PRs to be merged to zebra. These include 9300 and 92 56 I reached out about this in the Zcash r & d, Discord, and it sounds like  ZF or pili, said that ZF hopes to get it done this week.

Arya  17:32  
Okay, any questions for

Jason Mcgee  17:36  
do you anticipate  that getting done this week? 9300 updates. Zebra dependencies, use the latest Librustzcash, which will allow us to rebase Librustzcash PR to the latest main branch. And then Arya, you had previously said that you wanted to hold off on zip 233 implementation until 9256 is merged. So that was merged this morning. Oh, awesome. So if you read this we can start taking a look today or this week, for sure. Yes, going back to Zingo Arlo.
__

### 3. Research & Implementation Updates ii) - Zingo labs -Zaino
Arlo  18:15  
Hey, yeah, we'll just give a quick update so we have, we've now got in fetching compact blocks by hash, which I think was required for Zallet, so that should be functional now, also just finished off the burgeoning for entry kind in Zcash history, So that PR is now ready for review, and when that's in, we will be quite close to having the remote restate service PR ready as well. So that's kind of the main updates there. I think we also have, I put a bit more detail on the forum regarding the continuation grant and kind of what that specific people and why we think that works required so. And yeah, because have any feedback on that.

Arya  19:14  
And then shieldedlabs and and ECC for cross link,

____

### 3. Research & Implementation Updates iii) shielded labs & Ecc -Crosslink Trailing finality layer  
Nate  19:19  
yes, hello. So at shielded labs, we are in the midst of our Milestone Two. So that involves using Malachite, which is a tendermint BFT implementation in rust, and setting that up so that there's a Malachite network that's consenting about what proof of work blocks they see. And then part of the milestone is also writing early draft documentation for like, the format of the BFT blocks and how they are validated. And then we've also been working on some diagnostics, and we have a visualization project, and we have a video that I'd like to share, if possible, let me see

Arlo  20:18  
share screen.

Nate  20:21  
Oh, okay, only one person can share at a time. All right, here I go. So this is on the shielded labs YouTube channel, and here's a like five minute video of this visualization.

Kris Nuttycombe  20:47  
We don't get any audio format, so, Oh,

Nate  20:52  
interesting. Yeah, I don't know exactly how to do that.

Daira-Emma (ze/hir)  21:04  
I think it is possible maybe that

Andrew  21:07  
Zoom isn't sending the audio part.

Daira-emma  21:13  
All right, right. You have to select the right device on Zoom, which will be the monitor of your output device. 
Arya  21:23  
you could also, I think if you do a new Share, and you go to Advanced and share a video that might work.


Alex  21:35  
that's more.

Andrew  21:41  
Oh, I don't see that. Oh, here we go. Okay, I think I found an option that could work. Try again.

Andrew  22:00  
I'm Andrew from shield the labs. I just wanted to share some of the progress we've towards. Milestone Two of crosslink, as you might have seen from our public roadmap, Milestone Two involves releasing an executable that anyone can run that has a BFT chain that mirrors or shadows. Mainet currently in the background, I have a zebra node. Zebra node even running main net. And if you've run it before, and there's a little bit of extra data that's not normally there, and this is the output of milestone one. It is showing as blocks become final, which is currently based on when they move past the real limit, then they just get printed to the terminal. And the only real interesting thing happening here is that the hashes are being highlighted for the last couple of characters, depending on basically the fewest number of characters that you can use to uniquely identify a hash within a batch for a few that's not particularly important, though. So as you may know, crosslink involves two chains, the proof of work and the proof of stake chain. And currently this is only looking at Mainet, which is the proof of work chain as part of the order to present proof of work and proof of state chain next to each other. It's not obvious how you do that in an ASCII mode, and so we've taken the decision to create a GUI visualizer, and that's gonna get a demo here. So let's see if I can get this working. Here we go. I've got it running in the background too. And the general idea here was basically just to make a presentation, an interactive presentation, that was similar to what you draw on a whiteboard. So we've got circles and lines. The circles I know, the blocks that are being generated, the lines are the connections back to their parent, and can see the height of a node and the hash of a node next to each other. While we're generating arbitrary visualizations, we may as well add some more proof of work specific stuff, so the size of nodes, which you might see is different in certain cases, represents the number of transactions. So here we've got just one the Coinbase, and here we've got eight, and you can see this one's a bit larger. The distance between nodes represents the amount of work done. So if you have two side chains next to each other, you could distinguish which one is the better chain by just visually which one is longer. And of course, as part of cross link, finality is an important thing. In milestone one, we added a just Fiat RPC call to determine finality directly. And so if I run that here, we can see that this node here and all the ones after it have been emptied. They're not empty circles, just to show that they're not yet final, whereas everything below is finalized. Okay, so we can set that again, and let's just kind of scroll up and find that. You can see that we've got all these nodes going past, they just get paged in as necessary, and here we have the new final T location. We can go backwards, although that's only for testing purposes. And there we go. Let's find that point again. So the last thing to show is, well, we've got one chain that's great, but the entire purpose of this is to have parallel chains. And so you may have been wondering what this mysterious box in the corner here is doing, and that's just a debug input to put any text. And now we can generate new nodes in our parallel chain. Currently, this is basically just being arbitrarily placed, but it'll be more relevant shortly. And so the protocol is called cross link, though. So Right? So we need to have connections between the two things. And so we can, for a moment, just type those in for this BFT placeholder. We now have a link going back to the proof of work chain. Currently, this can also point basically anywhere. Currently, there's no actual requirement that this has to be final. I think that's pretty much all for this update, but should have some more to show you soon. See everyone

Alex  27:00  
all right, oh,

Nate  27:12  
So, yeah, we're working on that diagnostic tool to sort of visualize the chain state and at the same time plugging in Malachite. So the goal for this milestone, just as a reminder, is to have Malachite connected to zebra and sort of reading the proof of work state, but there's no modifications to the proof of work state. And then in the next milestone, milestone three, we intend to modify the proof of work headers, but none of the transaction semantics, and that will be like the first prototype of the full cross link functionality. Of course, all of the BFT side is just using a proof of authority, so just a list of finalizing nodes that's useful for testing, and then the milestone after that four is where we would begin implementing the actual staking rules. So any questions,

Daira-emma  28:23  
so which milestone are the consensus changes, the ones that determine which block is final

Nate  28:32  
that will be the next milestone. So milestone three, okay and we're hoping for this milestone, Milestone Two, to make a fun thing, which we call mainet shadowing mode, which is connect to the ability to connect to mainnet and also participate in a BFT network that's read only, so it's not interacting with mainet in any way. But whoever is in this mainet shadowing mode network can see with each other that they're validating the same or finalizing, finalizing the same blocks. Of course, they're not really final.

Arya  29:20  
That was Yeah.

Daira-Emma  29:24  
So let's see, so the full protocol requires that each node kind of ratchets its finalization state so it can't go back. I know that you're only sort of testing there, but let's see. Yeah, I guess that's similar.

Nate 30:00  
Yeah. So just one thing that comes up on that tangent for me is that during this milestone, we want to determine the right layer to write tests that will allow us to write tests of sequences of both kinds of blocks and then verify that we're in the right state in portions of zebra. And so for this milestone, we want to try to pick a layer and then write some tests involving rollbacks for the proof of work slide, including, we want to be cautious about BFT based finality versus the rollback limit that's already in zebra, because those can interact, and we need to be careful that they interact correctly. So eventually, we want to be able to verify how they're interacting completely with tests of rollbacks.

Daira-Emma  31:10  
Oh, yeah. So the BFT chain is also essentially a tree, because you can have parallel blocks that haven't been, they're not considered final on the BFT chain. 
Well, if you consider stream that, for example, it's possible for there to be parallel blocks that are not final yet on the BFT, BFT side, so the prototype just had a linear chain of BFT blocks. Is that right?

Nate  32:00  
Yeah, so we might, I mean, my inclination is to have an abstraction where we ignore those and we only pay attention to known final blocks. But it might be nice to diagnose the BFT protocol better if some of those could be visualized. Yeah, yeah. And branching is still a to do for the diagnostic visualization.

Arya  32:35  
Try our new invalidate block RPC for rollbacks. So next is the Zcash Foundation again for frost.

Arya  32:49  
If no one is available for frost, then next is open

____

### 3. Research & Implementation Updates iv) Zcash foundation - Frost
Natalie  32:53  
announcements, Hi, sorry, I'm here. I wasn't promoted. Oh, I'm still questioned from zcon, excuse that. So there isn't much to say for us since last time we had the audit from least authority for the frost demo, and we're just still working our way through that. Yeah. And then once we've only got a little bit more to go, and then we'll send it back to them and see what they say. That's all the updates I have.
Kris  33:25  
One note is that the protocol that Daira Emma was talking about earlier for post quantum resilience will have implications for the frost key generation, but I think  there's something there that's already sort of in need of specification, and before that specification stabilizes, it ought to take these changes into account.
Daira-Emma  33:57  
It might actually be useful to dig into a little bit of the details with me. Let's see if I can screen share.

Daira-Emma  34:34  
Can you see that? Yes, okay, so basically, this part is the key generation, so normally, for without frost, you would generate NK as K and rVk from The secret key SK. So if you're doing a distributed key generation in frost, then each party has a different asK, and generates those differently. So the thing that you need to change in this case is that our avk has basically commit to NK, and that's necessary for this commitment ibk to be first quantum binding. So it's pretty straightforward, but there is a change to be made to the key generation to make sure that that's the case, and it doesn't dictate any particular key generation algorithm, because the only thing that changes is the generation of Rcm. Yep, I think that's it.

Natalie  36:21  
And in regards to changes to frost. We are sort of moving away from active work on frost now. But, I mean, obviously, like it was good to have these conversations and to figure out, you know, want to do more where we were going to welcome PRs from other people. But I think this is, like, it's a good conversation to have about whether or not we want to do any more work on frost at the moment. But I think, yeah, that's probably a conversation we can have

Daiar-Emma  36:56  
Yeah,this is straightforward, and it's specifying something that needed to be specified to do in the current Zec, so, I mean, if necessary, I can make those changes. I think that's straightforward.

Natalie  37:13  
Okay, great.

Daira-Emma  37:17  
Nate asks whether the diagram is public on hackmd, not quite yet. It's not quite ready. I'm hoping to have it ready today or tomorrow if you want to see the rest of the diagram, by the way. And the main other change that's needed is when you're generating a note, when you compute the RCM value, and that's computed in a slightly different way, so it's committing to Gd, PKD and V and for the V asset base, and that's the only change needs, Basically, for the time being. So there's a some security analysis on how the post quantum recovery will be done, but that's the only thing that needs to be changed so far.
Arya  38:25  
Now, open announcements, if anyone has any,

Arya  38:36  
okay, open discussion, anything anyone would like to discuss.

___

### 5 Open Discussion i) 
Jason Mcgee  38:40  
There's one thing that I had for zcg. I brought this up at the last arboristcall, but most people weren't. so I'll bring it up again. Pipma or Renee recently submitted a grant proposal for the zenith zebra wallet to add support for frost multisig and an integration with the Keystone hardware wallet. And we wanted to hear from the ecosystem developer teams on this call whether they using it, if they plan to use it, if they know others who do, and whether they feel these added features are useful, and some things ze should consider funding.

Speaker 4  39:22  
So far I have not used zenith, so I can't comment.

marek  39:31  
Yeah, we don't use it in zebra directly either. Remember, though that the team opened a bunch of issues and they were useful.

Arya  39:51  
Maybe we should take a closer look, if zcg needs some input.

Jason Mcgee  39:57  
Okay, that'd be great. I can send you the link after the call. Thank you, thanks.

___

### 5 Open Discussion ii) 
Arya  40:06  
I have a quick small item for Daira Emma re randomization in ML camp. Do you still think that this is going to be an issue, or any change?

Daira-Emma  40:18  
I think, well, that's a longer term space of things that will only be needed if we want diversified addresses in the first quantum protocol. But it's quite possible that we'll, only use symmetric cryptography for the the core algorithm that needs to input and implement in the second and we'll use some of the sort of point to point translation of notes through mix Note or Whatever, instead of the public key crypto. I think that means that we possibly don't need diversified addresses, because, like, the whole point of it diversified addresses, if you can, is you can give out a address containing a public key to multiple parties, and they can't make it if you have a more interactive protocol, where you have a two way communication channel to send the note, then you don't need that.

Daira-Emma  41:37  
And and so that approach also has advantages for scalability, because you're not doing no scanning,

Arya  41:50  
just one more thing you might not have to do no scanning in the future. That's good news.
Arya  42:00  
Any other items for open discussion from anyone? Nate,

Nate  42:09  
Oh, yeah. I mean, I have heard from other shielded labs folks that Sean Beau has published a blog post about a new scalability architecture, which also involves changes to the payment interaction protocol. So I'm looking forward to reading that today, and it just came up hearing Daira talk about different ways to transmit notes point to point. Yeah,

Daira-Emma  42:42  
they're entirely compatible. I think the motivation for making those changes is both scalability and post quantum.

Arya  42:50  
I any other items for open discussion? Going once twice? Okay, I think that concludes the arborist call. Thank you again to everyone who's joined here or is watching later on YouTube. Have a great morning, afternoon or evening, wherever you are. Bye for now.

Alex  43:25  
Thanks, Aria.

Daira-Emma (ze/hir)  43:29  



____


**Next Meeting Scheduled: 17 April 2025 21:00 utc**


___
___



