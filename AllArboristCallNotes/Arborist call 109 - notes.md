## Arborist Call #109 Notes 

Meeting Date/Time: September 4th 2025, 21:00 UTC

Meeting Duration: 1 hr 25 minutes

Welcome and Meeting [Intro](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#welcome--meeting-intro) 

Zebra Update [zebra,Nu 6.1](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zebra-update)

ECC Core Update [librustzcash, p2sh, zallet](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#ecc-update)

Research & Implementation Updates - [zaino](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#zingolabs-updates---zaino) / [zcashD deprecation](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-zcashd-deprecation-ecc-zf-zingo-labs)/ [ZSA,Nsm](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#research--implementation-updates-shielded-labs--network-sustainability-mechanism)

Open [Announcements](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-announcement)

Open [Discussion](https://github.com/ZcashCommunityGrants/arboretum-notes/new/main/AllArboristCallNotes#open-discussion)

Video of the meeting: [recorded](https://www.youtube.com/watch?v=1T5zIlLNCz8)

Moderator: DAN

Notes: chidi @zcashNigeria

## Full Notes

## Welcome & Meeting Intro 

Dan: 00:03:07  

Hello everybody, and thank you for joining today's Zcash arborist call on September 4. On the agenda today we have core stack updates from the Zcash foundation regarding zebra updates from ECC on Zcash D core libraries and zallet. We'll hear from the Zingo labs team on zaino and touch on Zcash D deprecation under the research and implementation updates. We have someone from Qedit here today. We will hear from shielded labs on the network sustainability mechanism as well as cross link, and then we will have time at the end for open announcements and discussion portion. What are arborist calls? Arborist calls are bi weekly calls where Zcash protocol contributors convene to discuss upgrade timelines and process protocol R and D efforts design and implementation of new protocol features and identify blockers and unresolved issues. The purpose of these calls are to make all Zcash development accessible for a wider set of participants and provide more transparency for the community at large. Anyone interested in learning about the Zcash protocol development can register at Zcasharborist.org to participate. And if you'd like to suggest a topic for discussion or present an in-depth agenda item relevant to the Zcash protocol, please email arboristcall@zfnd.org to request a slot. Other ways you can get involved in the community are to check out Zcash community grants at Zcashcommunitygrants.org, hop in the Zcash R and D discord and jump into the Zcash community forum. And you can find all these links by going to Zcasharborist.org and we'll get started on the agenda, hearing from the Zcash foundation on zebra

## Zebra Update 

Conrado: 00:05:06  

Hello, since the last arborist call, the main things that happened in this zebra code base was that we added  orchard and sprout fields to the get raw transaction RPC, so hopefully it should be complete. Now. We also completed the Z get three state RPC, which was missing one of the fields. We also migrated zebra to use a layered configuration. We changed libraries  to handle configuration. So you can still configure zebra by using a toml file, but you can also configure zebra using environment variables, which is good  to make it easier for people to deploy zebra, and also makes it easier for us to do our own CI, but that's optional. You can choose wherever you want to use environment variables or the Configure file, and we also switch it zebra to use the librustZcash, sampling, verifier, previously like we didn't implement like the proof and signature verification, but we had all the logic to call that, so we remove it, other logic, and just call the librustzcash function that validates a sapling bundle. So with that, we managed to remove a bunch of code from Zebra, which is good, and this is something that  has been happening multiple places in zebra. The goal is probably at some point we want to remove a transaction type and use librustzcash type. But that's probably like the final step of the whole thing. But yeah, we've been replacing some stuff that was duplicating zebra, with Librustzcash types. That's mostly it. There's a lot of work going on, working. We review it, or review queue is a little bit right now, but yeah, hopefully we'll manage to get those merged soon. So yeah, our focus has been on finishing up some small RPC things that I went over the RPC spreadsheet that we have and noticed some stuff missing. So I've been working on that. And also we've been refactoring CI, which will take a little bit also. And hopefully, with all that done, we can help focus more on helping with zallet or Zaino or whatever needs  to be done to finish zcashd deprecation, that's it.

Dan: 00:07:56  

Thank you, Conrado. Any questions for Conrado or the zebra team? Yeah, okay, all right, we will jump ahead and the next stop is ecc.

## ECC Update 

Daira: 00:08:09  

I can do that. So let's see. We prepared 48 which is about generating p2sh, multi SIG addresses, which is needed for Nu 6.1, sent  the draft of that to the Keystone  devs and got positive feedback from them, so that can go ahead, 

We've been preparing for the zallet alpha. So that involved implementing RPC calls, reporting and working around some issues in the Zaino and zebra stack.

And also we investigated a few bugs reported by users in zashi and librustzcash. Let's see str4d, kris, did I miss anything?

Kris: 00:08:55  

Yeah, the main the main things, there are just some sort of community wide relevant things. One is that we have opted for at least the zalle alpha and hopefully going forward to implement all of functionality that's needed for transaction inspection as part of Z list unspent, or excuse me, Z view transaction, so that hopefully the get transaction method, which has some extremely confusing semantics in Zcash D, will not need to be used anymore. The same thing is true of Z list unspent taking over the functionality for listing all unspent outputs, so that list unspent can also be retired. Beyond that, the last steps that we have are to get the last bits of the Zcash D wallet import in for the alpha and there are a few pieces of cleanup to be done, but in general, we're getting relatively close.

Daira: 00:10:14  

Yeah. So the focus will be on releasing the alpha, getting feedback from the alpha, and also releasing the Zcashd that supports NU 6.1 on Mainnet, and we should have our hands forward with those things.

Dan: 00:10:31  

Anything to add? Strad

Str4d: 00:10:33  

No, I think everyone else got it.

Dan: 00:10:36  

Okay, cool. Thank you guys. Any questions for the team? Double check? Oh,

Str4d: 00:10:49  

there is one I mentioned, which is that one of the long standing annoyances we've had with the with the mobile SDKs and Zashi and sort of the stack behind it has been the the inability to separate out the need to select an anchor height  for reliability purposes, from the need to select a particular confirmation amount. For security purposes, for untrusted received notes when you go to spend them, that is now finally making its way through the stack as an implementation thanks to mischell, who's who the new Ecc engineer who has taken this as their first onboard task and is working its way through various stacks now, and so hopefully, in the next short while, we should see updates to the mobile SDKs that enable the wallets using them, such as zashi and edge and others, to be able to, ideally, just by default, have Faster spends of change nuts. 

Kris: 00:12:50

Now that you've mentioned that, now I've remembered other things that we've done. So one other piece that built on top of that was Pacus PR to add send Max functionality to Zcash client backend has been merged, and so is available for use. We will be cutting Zcash client backend and Zcash client SQLite releases, and I think we need to do another pczt release soon that will probably be concurrent with rolling of the stack for the mainnet, that's probably when we will do that. And then the other thing that is a significant piece of work that pacu did some help to facilitate, was we've merged the in memory wallet implementation that was done by chainsafe. There are, there is still work that needs to be done to fully bring that up to date. There were a number of things where APIs are changed  and we've essentially just left panics in place for things that are unimplemented, where there are updates needed. So anyone who's interested in you know, I think that chainsafe has a grant that's starting for maintenance, but that is now at least that code is no longer bit rotting, which is really nice.

Pacu: 00:13:41  

On that we already pointed chainsafe folks to that direction so they can fix those in their next cycle, which is, I think, starting next week, perfect timing.

Daira: 00:14:02  

And one more thing, we've finished the changes to the protocol spec for Nu, 6.1 it's still in the PR, but they're done apart from, apart from the main message address for the disbursement, which has not been generated yet.

Dan: 00:14:22  

Great. Thank you all. Any questions or comments? All right, so up next we have zingo labs on Zaino.

## zingolabs updates - zaino

Za: 00:14:38  

So we have finished our grant proposal and pushed, there's some requested features in front of the zallet developers who immediately opened a raft of issues, which we are now prioritizing and triaging to make sure that Zallet alpha can still come out in the coming weeks. We've also backlogged a fair bit of architectural redesign and zaino to promote a bunch of internal types into the type system so that we can get proper guarantees from the compiler that works has already been done. So we should be benefiting from that shortly. We're also working to upgrade to support network upgrade 6.1 which we should have support for, hopefully before the end of the week. And I think that covers what we have. Thanks

Dan: 00:15:49  

Any questions for za or comments on Zaino? All right. Jump ahead Zcashd deprecation updates from the whole squad.

## Research & Implementation Updates, ZcashD Deprecation, ECC, ZF, Zingo labs

Pacu: 00:16:09  

I think that, as always, a lot of things have been covered in the previous updates. We are continuing with the outreach for the network upgrade, friction survey, getting some initial feedback from some exchanges, and I will continue to keep pinging and annoying people to get more responses for us. It's super important to

have this input to really know the scope of transaction changes, for example, and on network upgrades, and how these partners handle those changes, and how we can like make them less of like an event and more like something That just happens and it's no problem to them, and this will be used to scope some RFPs if needed. So we'll continue on that, and then on the testing front, Alfredo today presented a really cool testing framework that he's been working on and wrestling a bit, which is a huge work, and he deserves, like, a lot of credit. And, yeah, I can't stop congratulating him. It's currently living on the zebra RPC code base, and is, I think it's going to help us accelerate a lot of the RPC work, which is, like, pretty repetitive and was kind of lacking a good, quick feedback for developers. So Zingo folks are already looking at it and seeing how they can benefit from that. And yeah, then we're triaging bugs from the integration. Uh, some things are breaking. Others are like slightly, doing some bangs and noises here and there, but nothing that I don't know. One wouldn't expect from an integration of two pieces of software. So that's kind of what we're at right now.

Dan: 00:18:32  

Thank you. Pacu, anything else on Zcash? D deprecation

Str4d: 00:18:42  

for Zcash deprecation itself, it's likely that we will ratchet that will, you know, potentially put some more deprecations into parts of your aspects of Zcash D in the next release. Ideal if, if we have time, it mostly comes down to that, but expect that there will probably be some more things that get marked as deprecated but enabled by default,for things that are intended to not be provided in zallet. A Yeah, as we figured out more of the service and how things are shaping up and and in particular, what things are very tricky to actually provide within Zallet.

Daira: 00;19:27  

Exactly we needed to do that exercise in order to figure out what to deprecate in zcashd basically,

Str4d: 00:19:35  

yeah, so it's, it's likely that there'll be additional deprecations in there as part in the same release as the as mainet Zcash D, but It mostly comes down to it. We need to focus the energy on implementing the things that are necessary to implement in zallet to be able to get people to migrate at all, versus implementing absolutely everything to make the migration seamless. I'm trying to still ensure that we implement as much as we can to make the migration as seamless as possible. But it's not, yeah, none of this is going to be perfectly seamless. And  so the thing to be tracking in particular for this is, I don't know if it was in the last two weeks or before that, but  there's a, I think I might have just been before the last call. This is all a book page up now.

There's now a page there that has all the altered semantics and we're updating that as we go. So basically, anytime you make a change, or, you know, renaming fields, adding fields, what, changing some fields, still go there. So keep an eye on that page in terms of when, when anything ends up happening, and if you're running into things. Yeah, they will. We're not going to get that page to be empty, but that page is, is the minimum delta we like to get to. To clarify it's these are also not the Rpc documentation, the  Rpc documentation, that is something that we will consider potentially trying to pull out into an automated page, like we're writing RPC documentation in the crate like we know. And so it's definitely a lot better than it used to be, and that is accessible via the open RPC endpoint, so that is all introspectable automatically. It would be nice to get that up, but that's it's not currently a priority to get the new like the Rpc documentation to be rendered up there, but that would be a nice contribution. But yeah, the main thing we're tracking is just the delta between zcashd

Daira: 00:21:55  

I will file an issue for that because there isn't already gone. Thanks, Alfredo.

Alfredo: 00:22:03  

Yeah, I think eventually zebra and zaino, should use the open RPC scene to document the API so the user will have a unified way to find RPC methods.

Str4d: 00:22:20  

Yeah, yeah, there's a bunch of stuff related to that that we could probably standardize on a particular way of doing it and then extract out some common logic into helper crates. But yeah, at the moment, haven't had time to work on that, so yeah,

Daira: 00:22:38  

yeah, there might already be a project to provide a friendly interface over an open RPC.

Str4d: 0022:45  

We were using the one that I could find. I have not found anything better,

Pacu: 00:22:49  

Okay, fair enough. Yeah, I was playing with it yesterday, and the official  web view UI application for the RPCs. I think the spec for zallet is already too big for the web app, and it doesn't like kind of work. Yes, but I assume that if you actually query the RPC exploring or discovering methods of the open RPC spec, then those kinds of clients will work. And then you kind of get these clients for almost free, which will be nice for developers to just to play with it quickly, yeah,

Daira: 00:23:46  

or we could fix whatever the bug is in that visualizer

Alfredo: 00:24:06  

So in zebra, we use an open API swagger, which is not for JSON, RPC method, and we are willing to change to the one zallet is using. We're expecting you guys to fix all the problems it has before we go

Str4d: 00:24:21  

probably like it, like the whole infrastructure that I wrote to make that work like it could easily be pulled out into a crate with just the macro logic for it. It's just a matter of having time to do that. I will probably do that at some point just to make it easier to maintain. Yeah,

Dan: 00:24:43  

All right, thank you all anything else on Zcash D Deprecation?

Pacu: 00:24:51  

No, no, I think they'll all have been covered. And also, I don't know some from someone that hasn't listened to this, yet, in any of these announcements, is that we were as first principles. We're not trying to do a plug and play, one by one, replacement of zcashD. There are a lot of things that, if engineers ported them as they are, they will be actually working to develop tech debt of another system into the new one. So we want to as our first principles avoid that and try to make things as frictionless as possible without bringing a lot of like baggage from your system. So I know that it will be a dream to have everything just work as magically. But we'll try. We want to not bring tech debt to the new place.

Dan: 00:26:04  

Thanks. Pacu, alright, jumping ahead. Uh, normally, this is in the morning calls, but we do have Pablo here.Anything on the Qedit side?

## Research and implementation updates- Qedit Zcash Shielded Assets

Pablo: 00:26:17  

Hi guys. I would like to share my screen for this,

Dan: 00:26:29  

you guys see that Pablo screen, or is it still mine, still yours, still yours? Okay? Oh, give me a second.

Pablo: 00:26:51  

Okay, guys, so there is a lot of things going on around ZSA, but the important things for this meeting are orchard. So orchard, as of now, is spec complete. There were a couple of changes in recent weeks. Specifically the zip editors added the versioning for the SIG hash, and we did some small but meaningful changes to the issuance keys. Both of these changes are now implemented in orchard, and we have a complete package. It is spec complete. We are doing the final sweep on this in order to reduce the diff as much as possible. In regard to reducing the diff, there is no right answer there. There is a trade off between smaller diff and the proper structure. So we are internally debating between smaller diff and what we believe is the right structure. A few more days from now, we are going to submit. We're going to mark the orchard Zsa PR. We're going to change the mark from draft to ready for review. It is already spec complete, but the diff reduction is the final touch that we are doing. And then the review part. Of course, we are here. We are well available to support the review, the review orchard Zsa built on top of orchard is a big chunk of work. So we identified three areas that can be reviewed in parallel, namely the orchard Zsa circuit. So the orchards Zsa circuit didn't change since the audit that we did half a year ago. So it's a good thing. It is stable. And  it seems that no more changes are required for the circuit. This can be reviewed independently from the rest of the changes in orchards Zsa. And it's a good thing. It will help with the review process. And the second thing that can be reviewed in parallel is the Python reference implementation. So we updated the Python reference implementation to support both orchard Zsa and transaction v6 transaction v6 is a different topic. I will discuss it in a moment, but the orchard Zsa part is there and it is ready for review, same as the circuit, it can be reviewed independently and in parallel, which is also a good thing. And finally, the orchard Zsa built on top of orchard. It is the same crate. Now it can produce orchard bundles in a backward compatible way, meaning, if you take our orchard Zsa implementation, you can still produce the good old orchard bundles to be inserted into transaction v5 or you can produce the new orchard Zsa bundles to be inserted in transaction v6 and this is the significant chunk of work to be reviewed in one go. This will require a significant effort to review. But  we knew this in advance, we are prepared for this. We're here to support this review. Of course, we are here also to make the changes necessary. We started the discussion around the orchard Zsa review. Str4d and Kris looked at this. They confirmed our approach to generalizing orchard to support orchard Zsa so the general approach is there in the details,  We will discuss the details with them, with ECC, as much as needed to make it

production ready. We are there just for this.So this is it on the subject of orchard Zsa. on the subject of integration. So, okay, so orchard Zsa is this piece of the puzzle, but also the upper level, the layer that is on top of orchard Zsa is the transaction v6 so we and the ECC team, put a lot of effort into transaction v6 to make it future proof, first of all, To support orchard Zsa but also to make it future proof, with the features that we believe that will be embedded in the future we are aiming,for a transaction format that is that will support other features except also Zsa, but our implementation at the moment, so we have a reference implementation for transaction v6 currently, we just, we just made it work with orchards Zsa and we ignored all other NU 7 features, namely NSM and change for fees. in the recent weeks, actually, in this week, we had a very nice, very good discussion with Daira emma and Str4d, and we decided that instead of ignoring everything else, we are going to embed all  of the spec for transaction v6 in our reference implementation. We are going to embed the required fields for NSM, and we are going to embed the fee changes, and we are going to make our implementation for transaction v6 spec complete, meaning we are going to take zip 230 and make our implementation spec spec complete with the zip, and this is in order to support the integration efforts as much as possible. So while this is in review, we can move forward and advance Nu 7 as much as possible, namely by embedding everything needed into transaction V6. So we are going to make it spec complete, and after, of course, the transaction v6 is dependent on orchard Zsa so there is no point reviewing this unless this is already reviewed and verified and merged. So while this is being reviewed, we are advancing with everything needed with transaction v6 and this is what we agreed just this week. So there are two pieces here. First of all, there is the LibrustZcash implementation for transaction v6 and there is the Python reference implementation. We are going to update them both. The Python reference implementation is very nice. It's easy to review, easy in the sense that it is much easier than the real thing. So it's a good starting point for everyone that wants to be familiar with the transaction v6 format implementation, so start with the Python reference implementation. Once you get this straight, go to the real code and look into librustZcash. But we are going to do this for both.

Daira: 00:35:19  

It's surprising how simple the Python code can be, because we're used to crypto code being complex, because it has lots of lots of optimizations, and the Python code just doesn't so it's actually very nice, and it could be written very quickly, which is how it ended up getting written.

Pablo: 00:35:45  

Yeah, Indeed, part of the reason that it is relatively easy to implement the review, there are no external dependencies here. While here, we have a bunch of external dependencies which also the same other crate. Note, encryption here. Everything is embedded inside, so it's self sufficient in some sense, and easy to to review, easy to implement, easy to change.

Daira: 00:36:13  

So apart, apart from things like hash functions, yeah, yeah.

Pablo: 00:36:20  

So we have this. This is on the subject of transaction V6. Also we submitted the draft PR for LibrustZcash. So everyone can see how it looks from the orchard Zsa, from the ZSA point of view. So there is a draft PR here. Again, it implements transaction v6 without all the fields just set the same material, but soon it will include everything needed for the new transaction structure. So this is on the subject of Librustzcash. On top of this, we have zebra. Zebra is the top most layer. We are in the process of implementing the less pieces for global state changes. We had a discussion with Zcash foundation this week about the proper next steps. We are implementing the global state changes for Zsa namely, so the node now needs to keep track of all the assets. Right at the moment, we have just Zec, transaction v5, and after the next upgrade, the next next upgrade, thenNU 7 upgrade. The zebra node needs to keep track of all the assets, all the issued assets. And this is what we call the global state. First of all, it needs to keep track of the supply for all the assets being issued. Then you need to keep track of all the assets that was finalized, meaning if you want to issue an NFT, then you issue an NFT, and then you finalize. And then it's like a one time sale. You break it and you cannot issue more. And this is guaranteed by the consensus. So the node also needs to keep track of this part of the global state So this is a change to the database ,the node has an additional table for these assets now. And on top of this, we need to run the consensus rules, meaning, okay, someone issued some assets, and then someone tries to issue more of the same asset. So by issuing more, the node needs to check whether it is permitted to issue, to issue more, if this is the right issuer, if this is the right signature, and if the asset was not previously finalized. So  this is included in the consensus rules. This is also in the final steps of implementation. But because this is dependent, the dependency here is Librustzcash, and the dependency here is in orchard. So, yeah, we we have a working version, but as long as transaction v6 is not finalized as long as orchard is not finalized. We cannot call it final version, so we are calling it working version. So we have a working version of this. Final consensus rules are being implemented. In addition to this, we had a discussion with the Zcash Foundation team this week. We propose the new health point, health RPC endpoint, so we have a running testnet for Zsa and every time we put the zebra node inside the Docker container. So most of the automated systems require some kind of automatic indication that the process inside the Docker is working correctly. So we propose to add the health endpoint. We already implemented this internally, but right now, we are in discussion with Zcash foundation if they would like to include this unrelated to the ZSA work, as part of the zebra node. This is in discussion. It's a good idea to have all the RPC endpoints, all the RPC endpoints in zebra at the moment are post endpoints and automatic systems for deployment of Health endpoint, which is get. So the proposal was to add a health endpoint, something very simple like get health, and if the node is up and running, it will return the proper get response. So we're going to submit the PR independent from Zsa work to zebra, just for this cause. This is in discussion again.This is in parallel to the ZSA work that we are doing. I think this is pretty much everything.

Dan: 00:41:52  

Thank you. Pablo,questions, comments on ZSAs yeah, go ahead. Pacu,

Pacu: 00:42:02  

Yeah, well, thank you for this update. It is great work, a ton of work. I'm interested in knowing a little bit more about the section basics work and the Python reference implementation. Is this Python reference implementation intended to be like a guide for people migrating into or adapting their systems to accept v6 transactions or to be able to understand them? If not, would you be able to actually produce that kind of documentation as well? We we've gotten some responses from the survey, and I think that that will be useful for some organizations

Pablo: 00:42:58  

yeah, for sure. So the Python reference implementation is a piece of code that emulates some parts of the Zcash protocol, the significant parts already include, most of the parts for transaction v5 this is already here in Zcash, under Zcash test vectors. What we've been doing is taking this work and extending this to support transaction v6 so the idea is to have two implementations. It started as a concept like, not put all your eggs in one basket. So the Zcash people previously, before we started this work, implemented the most of the important parts of the protocol in both in Python and in the real, the real thing in Rust

Daira: 00:44:14  

to clarify the motivation, I mean, this is nowhere near a Production implementation, and this is, it's the purpose of it is to be, it's not quite a reference implementation, but it's to to be the most straightforward possible implementation of the cryptography  mainly, and things like format parsing so that you can,

it's sometimes a lot easier to understand than the well as it was C++  in zcashd or rust code, because that, as I said before, has a bunch of optimizations.

So yes, it's not that. It's an implementation that you could use instead of any part of the rust or as it was C ++ . It's just for understanding, really, and it's understanding of protocol developers, rather than users of the protocol, really. So I'm not sure that it's that useful for tha changes and things.

Str4d: 00:45:32  

So for the bet, for the transaction part, specifically the goal of the like. The purpose for which we added both the legacy transaction format and the v5 transaction format into the test vectors repo was so that when people were implementing their own parses, they had or could generate test vectors that exercised all of the ways in which the transaction format could alter. That's the purpose of the of it being a test vector generator. Yes, it's, it's not really a reference implementation. It's a test vector generator and so well. And what that defends against is that we can say to anyone, here's your transaction you're doing a transaction parser right now. Here are the test vectors that your transaction parser needs to be able to pass in order to be able to tolerate any transaction it might see on the network. And if you're unable to pass parts of this like we've had, for example, exchanges in the long past, where, like when expiry heights were added in the tree transactions, they just hard coded them to zero in their parser, not just in their serializer, so they would incorrect, either incorrectly parse transactions, or just downright fail to pass transactions that set an expiry height, because they would only pass a transaction where the expiry help field was zero and the shielded parts were, you know, their lengths were zero. They just, they, they didn't implement a full parser. And so I remember, like, users coming to us back in this would have been like 2019, I think, with complaints. It's like, well, this, yeah, the problem is, they haven't implemented the full transaction specification. They've only implemented the bits that affect the transparent side. So that's the intention of this, of this history generation here is that, then we can say, yeah, if you want to know if you've implemented things correctly, can it pass these examples? They might be meaningless, like they are not valid transactions, but they are valid transaction encodings.

Pablo: 00:47:42  

Yeah. It is not a complete implementation, but it gives very good guarantees, and most importantly, it is independent of the rust, the C ++  code, and it can be inspected independently. So if the test vectors generated by this create parses. If the node passes under these test vectors, we get a very good guarantees toward the spec, spec compliance. So we took the already existing Zsa test vectors implementation, we call it Python reference implementation, and we extended it right now, the Zcash slash Zcash test vectors produces transaction v5 test vectors, we extended it to produce also The transaction v6 test vectors, including everything that we did for orchards Zsa, our implementation takes into account,   zsa , but as as previously discussed, it's going to take into account the complete spec, meaning zip, 230, every field for a transaction v6 is going to be taken into account in our implementation. Eventually it's going to be merged back into Zcash test vectors. I hope that answers your questions.

Pacu: 00:49:18  

Yep. Thanks. Bye.

Dan: 00:49:24  

Yes, Daira, you still have your hand up. Or was that from prior?

Daira: 00:49:32  

That was from prior. I don't actually see how to unraise it. There we go.

Dan: 00:49:40  

Okay, cool. Thank you all. I think we'll jump ahead now, if anything, if anybody thinks of anything, we might have some time at the end to circle back next up shielded labs on the network sustainability mechanism.

## Research & Implementation updates. Shielded labs- Network Sustainability Mechanism

Jason: 00:50:01  

I think Mark's gonna give the update today. 

Mark: 00:49:55

Can you hear me? okay, sorry about that I can speak on the NSM, zip 233, the test vectors were just updated, and I landed a small PR. Thanks to Chris for the approval, just to fix the CI so that other PR could get merged. Was speaking about it was just up on the screen, but 101, 109 was merged. 109 walked so that 101 could run. And that's just the NSM test vectors. Once that's merged, which I believe Daira will act on, then we can move back to zebra and tackle the central final boss, PR or zip, 233 zip, 234 and zip, 235 remain as they were. I think that's everything. Thank you,

Daira: 00:51:19  

Mark. I had filed a PR on, you know the CSF simulation repo to update  CSF, because it's not been renamed to NSM. I'll just link it in the chat. So if you could have a look at that, then that'd be useful.

Mark: 00:51:49  

I don't have either co permissions, I don't think anymore, but somebody might I can definitely take

Daira: 00:51:58  

I mean, alternatively, you can just use my fork, which is Dara/ NSM-simulator. Okay, awesome. Thank you.

Dan: 00:52:13  

Any questions for shielded labs or comments on the NSM? All right, we'll jump ahead to cross link.

## Research & Implementation Updates.Shielded labs and Ecc- Crosslink- Trailing Finality Layer

Nate: 00:52:30  

So last week, we did a milestone 3 workshop, and that had some hiccups, but overall it went pretty well. We got multiple people on the network and syncing, and so that was a demo of where, the key test for the demo is we try a roll back past the finality point and prevent that. So it's like hooking up proof of work and proof of stake to refer to each other and provide that finality. But there's no proof of stake accounting stuff, and that was fun. We also had a dismad and Merrick show up in person, which is cool. We were all at an on site,but we had a bunch of hiccups. So it was,some people got confused with discord. I think a lot of people couldn't hear I didn't know that, so I just kept talking as one does. And there was a bug that was pretty persistent, but fortunately, it didn't block the overall progress. And then what else. So, you know, overall, it was a mixed bag, but it was exciting to have people in the workshop. And so this week, we're starting on the next milestone. So milestone 4 if you look at our roadmap on our website, is basically now we add proof of stake. That is a much bigger footprint than the other changes we've made so far. And so we have been figuring out how to break that one up into smaller pieces. And so given that the workshop last week had all those hurdles and confusions and stuff, we're just going to spend the first part of this so we made a milestone, 4.1 and it's just focused on making a testnet that's easy to join and it has good instructions. And the functionality change we want to make is we wanted to add a zebra RPC call that basically says, Put me on the roster with this weight, where you can just make up any number. So it's sort of like, you know, it's a testnet, and so that should be functionally the same as the last milestone demo, except the goal is that it should be a lot easier for people to join and check out. And we're also improving, like some doing some CI improvements and things like that. So just make that whole process better, and then moving forward. 

our philosophy, since this is just totally an experiment prototype right now, is, if people break the testnet, then we'll think about if we want to make it more resilient. Let's see what else. Okay, So, our goal is hopefully, within a month, to do another workshop that's almost like a repeat, except it should be a lot smoother. After that, we want to work on introducing, like, the first piece of staking mechanics. So that would be a way to bond and unbond with transactions, but it won't have, like, all of the rules, like an unbonding period or details like that. So stay tuned for that one. I think we're calling that 4.2 and then after that, there will be yet another milestone, at least one that adds some more wrinkles to the proof of stake design. Meanwhile, I think we have a blog post coming soon, unless I already missed it. Sorry. I'm a little bit tired. I'm so low parenting this week, we have another blog post coming out where we it's sort of like an answer to a fact of what the proof of stake design is. It's not actually the design, but like, what are the implications? it's sort of targeted for a user. Like, how do I stake and unstake and what does that look like? And it's all very provisional, because we haven't actually hammered out the specific concrete design yet, but we just wanted to get our thinking out in front of people to see what feedback they have. And I think that's it for the update.

Dan: 00:57:43  

Thanks nate any questions 

Dira: 00:57:45  

Yeah, I have a question. So how are you approaching this as an economic mechanism design problem How are you going to analyze the staking part of it

Nate: 00:58:00  

Basically, we plan on looking at that much more, like, stringently, after the prototype phase. So like, after the end of the year, which means the design we're making is just sort of, can we make the simplest thing, like, we have a few different trade offs and goals, and then we've continued to try to simplify it over and over. So like, for example, a very broad simplification we made is, well, a lot of Cosmo style proof of stake chains where users can delegate, they have you know, a sophisticated protocol. It might have slashing or it might have fees or penalties and unlock periods and stuff like that, what. But it also is sort of predicated on the users who are delegating, responding to bad behavior, and like moving their delegations away. So we're making this broad simplification, like, if we're going to rely on the users to do that in some cases, why don't we just do that across the board? And so we won't have rules for lots of those edge cases in order to try to keep it super simple for now, okay, there, oh, I should mention, though, that i have become a little more concerned about privacy, and so we do have a wrinkle that's motivated by privacy, partially, which is a unbonding period,

but we can say more about that when it's a little more baked. or we can go into it maybe,

Daira: 00:59:59  

Well, we can do that at the end if we have time. Yep.

Dan: 00:1:00:06  

Okay, that works. Thank you. Nate, Last call for cross link comments or questions. All right, any open announcements from anybody. Str4d,

## Open Announcement 

Str4d: 01:00:24  

So we had hoped, so  there's a zcashd deprication meeting that we've been running sort of weekly, but I forget exactly how frequently. And we'd hoped to do a test run of like usage of zallet at that, but there were some blocking bugs that meant that we couldn't run that. But that will likely be happening in the next week or so. So if you are interested in, like playing around with the pre alpha, or maybe it'll be the alpha at that point, we'll see how quickly we can get to the first alpha, then ping in the Zcash R and D discord, and we can let you know when we're doing that. It'll basically just be like hands on with zallet and using it and playing with it, and potentially like sending each other  some funds with it to exercise the various workflows that we've got there.

Dan: 01:01:28  

Cool. Thank you. Str4d any other announcements, okay? And last up open discussion so we could loop back to the unbonding privacy bit, Nate. Or there might have been something from earlier on the call that I apologize I forgot, but if anybody has anything, we can jump into that after Nate.

## Open Discussion 

Nate: 01:01:59  

Okay, yeah. So the thing that shifted is, previously, we were imagining a fairly simple system so we have certain constraints, like we're not going to change any zero knowledge circuits and that's primarily motivated for keeping the changes simple and safe and being able to iterate and deploy faster on the v1 of the protocol, and I had modeled that kind of incorrectly as What that means is the staking delegation positions will have visible amounts, but no addresses associated with them, or maybe like a one time use address for unstaking. And the incorrect modeling I did was, well, that's roughly like a turnstile, and we already have kind of a best practice and some practical knowledge of how to manage turnstiles, but talking through the design, approaching this milestone, we realized it's different than turnstiles in quite a few ways. So one is that it basically reveals more information. So one is, it reveals who you're delegating to. And also, there's just a timing thing, so a turnstile event is just a single transaction, so an amount is revealed. And that's that with this, though, there's the timing of creating the delegation and removing the delegation. So the wrinkle we were thinking about introducing, which would complicate the super simple design, is to sort of quantize when delegations and undelegations can occur, and then also adding an unbonding period. And that has a couple of motivations, but one of them is people who want liquid Zcash, and they don't want to wait for that amount of unbonding period, will then likely hold that Zcash on the orchard pool directly.

So, yeah, that's the gist of it.

Daira: 01:04:41  

Have you considered just taking the private staking design from penumbra?

Nate: 01:04:48  

We talk about Penumbra a fair amount. I haven't looked at the mainnet design yet, but when I looked at it early on, like a couple of years ago, it was predicated on a few things. So one was, I'm pretty sure I could be wrong about this, but I'm Well, the thing that I'm certain about is that the design I read, there is a unique asset for each validator, and then staking and unstaking is or sorry, delegating and undelegating is equivalent, basically, to buying or selling the asset.

Daira: 01:05:33  

we will have part of the machine we needed, because we will have ZSAs presumably by the time you need them for staking. And the other part of it that does require circuit support,I usefully, we did an audit of penumbra so we understand how it works. So the other part of it is that, so those assets are kind of treated specially, because when you delegate and undelegate, then you need to apply a conversion depending on the amount of time that's passed, but that, that is a very simple circuit change. So you could consider maybe doing a simple thing to start with, and then when we have time to do that circuit change, we could potentially improve the privacy guide by picking that into the second.

Nate: 01:06:39  

Yeah, I just realized I had gotten confused because I thought that design required or relied on a Dex. But I think it's simpler than that, right? It's just when you delegate the protocol, just says, I know how many of the validator tokens you get for this many,

Daira: 01:07:00  

yeah, it's like, I mean it's baked into the protocol, because exactly what the exchange rate should be.

Nate: 01:07:11  

Yeah, I like that idea. We actually did talk about it early on, like at the beginning of the first milestone, and we thought it seemed a little bit too complicated, just in terms of just, you know, for the

Daira: 01:07:28  

yeah, for one point, I agree with you. So yeah, what I'm suggesting is kind of do transparent delegation to start with, and then add support for private delegation, yeah, because it really isn't a complicated circuit change, because it's not really cryptography. It's just a conversion of amount,

Nate: 01:07:56  

right, which happens transparently anyway, right? Yeah, and

Daira: 01:07:59  

you can still get it wrong, because it's arithmetic in the circuit. But circuits are complicated. We know how to do it, and we can just look at the penumbra circuit

Nate: 01:08:10  

So we do, yea. Oh, wait, I thought they used, I thought they were based off of sapling. Is that? 

Daira: 01:08:20  

I mean, the proof system doesn't matter. You can take the design and the design is looking at really,

Nate: 01:08:29  

yeah, we'll definitely consider that. We haven't really started working on a post 1.0 thing yet, but we want to start figuring out what that would look like. And so this would be a candidate. There's  a GitHub label for post 1.0 wish list items. So I'll make sure that's there.

Daira: 01:08:57  

It occurs to me now I think about it might be an interaction with the long term storage protocol we're thinking of, I actually sort of made a start on a rough design in a hack and decent way. So because of the long term storage protocol. So basically, the idea is that for the existing protocols where we're eventually going to want to deprecate each of them, because they are very complicated, and they use cryptography that's dependent on electric curves, so they're not post quantum and kind of, they're kind of over optimized in some ways, and we know how to do things more simply now. So there's a case for having a protocol that uses simpler cryptography, and in particular, doesn't need to use public key cryptography, because it's always the party that knows the same keys that is withdrawing as originally deposited funds. So you're only withdrawing your own notes, but you can spend them to an average replace because it's only the spend side that changes that. So I think that's a good idea. I think it's the right way to evolve the protocol. But if you do that, then you obviously want things in the long term pool to be able to be used as staking funds. So yeah, I'm just pointing that out because you need to, we need, we'll need to think about how that works.

Nate: 01:10:48  

Yeah. It also sounds like it has a similar privacy consideration,

Daira: 01:10:56  

yeah, so there's some interesting wrinkles about how turnstiles work. Because I think what you would need is a long term I've been calling it reservoir, associated with each pool, and then you still have the separation between pools, but for each one, you have the long term protocol that does not get switched off when the complicated part of that pool gets switched off?

Nate: 01:11:29  

Interesting? Yeah, I'd like to see that write up when it's ready.

Daira: 01:11:35  

Yeah, I haven't been able to finish it because there are so many things to do,but it's, it's simply enough that, yeah, I really want to do it, because eventually we will need a post quantum protocol

Str4d: 01:11:53  

anyway. Also means that it's then something that you know, given what we know now about how to run and manage a like a private, shielded protocol based payment protocol. It's it's something that as a community, we can potentially commit to actually having the long term properties that various members of the community assume are present for the existing protocols when they have never been Yes.

Dan: 01:12:33  

Okay, anything else on that topic? Thank you guys. Pablo go ahead

Pablo: 01:12:43  

Different subject. I have a question for Daira emma. What is the status of the post quantum resilience? Zip.

Daira: 01:12:56  

I've just been working on it today, actually, so in order to simplify that zip, there are some preliminary changes I want to refactoring. So I want to do the protocol spec, which I can do on top of the Nu 6, Nu 6.1 changes that have just been finished. So, yeah, there were some dependencies and blockings that has now been resolved, and so I can work on that now, and I hope it shouldn't be too long before we have a draft set

Pablo: 01:13:36  
 
So we believe that this is a strong proposal. Is this planned for Nu 7?

Daira: 01:13:46  

Well it's not. I haven't done the work to convince people that it should be on Nu 7. I personally think it should be, but I'm aware that I need to do that work.

Str4d: 01:13:54  

But also it is not a consensus change, so it is not relevant to Nu 7.it is a change that would be good to deploy along side Nu 7 or concurrently with Nu 7 for various reasons that the rationale of that includes, but there is no consensus change in bulk of It, It would not be part of Nu 7. it does not get tied to a consensus branch ID.

Daira: 01:14:33  

I will correct you slightly there, because sure the Coinbase throws into

Daira: 01:14:41  

that would be the one thing if we decided that, but that would be a conscious decision, but it's not a necessary requirement for that.we can just say if you receive a shielded Coinbase, you don't get quantum resiliency until your wallet then does a subsequent spend. And if all wallets are implementing it the same way, that would happen automatically, For simplicity, I think the simplest way to describe it is as a consensus change, but it, but it's, it's mostly not a consensus change 

Str4d: 01:15:16  

to me, that's too confusing. If you want to describe it that way, I would say the shielded Coinbase part is a separable consensus change that builds on it, but the actual core of the quantum resiliency is not a consensus change referring to us.

Pablo: 01:15:37  

So there could be some wallets supporting post quantum resilience and other wallets not

Daira: 01:15:44  

I definitely want to avoid that, because that will be very difficult to explain to users. The consequences of that, it will be more like so you know, the change that was made to the notes, plain text format wit zip 212,  in canopy? I believe it was. Yes, it was canopy. So it will be like that.it will be exactly the same, effectively, because it would be a version three of the plain text format. And there will be a requirement to implement it for wallets, even though it's not a consensus change, except in the case of shielded coinbase.

Str4d: 01:16:33  

But, and this is it's actually, it's both less and more problematic than the the note  versioning change we have before, because the problem there was that some wallet like, there was a grace period, and this was zip 212. And again, it wasn't a consensus change. It was a a fix to a problem that wallet started rolling out, and there was a sock coordination period. There was a grace window where wallets would be allowed to make either and then wallets would start enforcing a requirement.

Daira: 01:17:04  

I think that was a bad idea.

Str4d: 01:17:07  

Yeah because a few wallets that were in popular use did not implement it within the grace period, and so their users then encountered problems when other wallets started generating their plain text that they couldn't receive. So So I say it's an easy problem, Matt, because the quantum resiliency is unobservable to the recipient, in that it is purely a change that the sender's wallet makes to how they construct their notes. The recipient can know it's been done. They can verify it's been done, but it's fully backwards compatible, because all receiving wallets that will be able to handle what notes created in this way.

Daira: 01:17:50  

Actually, I'm not sure that that's true of the proposal in the current draft. It was true at one point, and then I decided to simplify it in a way that it could be said to break that propely I need to check that Yes. That's just off the top of my head, yes, because we need to be careful about this.

Str4d: 01:18:18  

Yes, because at least when we last discussed it, the motivation here was that it doesn't break interacting with like paying people, because there's no visible, there's no there's nothing that breaks the recipients. Let me just check, yeah, but you still want all wallets to upgrade, because if you receive an orchard note that is quantum resilient in a no in a wallet that doesn't understand how to it doesn't generate them itself, then when you go to spend that quantum resilient note, it will produce a change note that isn't quantum resilient. So we do want all wallets to implement this and to upgrade, and that's why I said earlier it would be convenient for this to be deployed alongside in Nu7  so that we could just say that if you're making a v6 transaction, you also always create the orchard notes in this way. And that would be convenient, from a developer point of view, that we could, we could, for the most part, know that people are making notes in this way.

Str4d: 01:19:35  

but again, there's nothing about that that actually forces the wallet to create notes in this fashion. The most we could do is if we wanted to, yeah, there's nothing in the current proposal that forces them to do this in this fashion, if we wanted to, to force the issue, then we could add a wallet level requirement, similar to the commitment checks, where we say, when we pass this out, we then go and validate the that we can reproduce the the the corresponding commitment by your from the derived randomness and if you don't do That, 

Daira: 01:20:23  

in the current draft. RCM is computed differently. If lead fighters are accessory that's, it has, it has to be because it includes the asset base.there's, there's almost no point in um, sort of keeping it compatible, if you have to account for the asset base. Anyway, everything has to be upgraded for ZSAs, yes, and therefore

you might as well require this

Str4d: 01:21:02  

Again, it's the might as well. It's the if it this is why I said it's convenient to deploy it alongside. But there's nothing in the circuit that requires RCM to be computed.So it is still entirely possible that we could say this and then someone upgrades to v6 implements v6 deploys the format, but does not alter how they generate our scene. The only way to do that would be an additional rule that, basically all that wallets reject and ignore funds that don't set our scene in this way, and that basically the same problems we have with zip 212 where you then just have to, like, tolerate people breaking that rule.

Daira: 01:21:49  

So if they, if a receiver doesn't implement the new hrcm, as it's called in the draft, then they will break for ZSAs as well as breaking for all quantum resilient notes. So they just have a broken wallet. That's not an acceptable implementation

Str4d: 01:22:19  

Again, the hrcm, however you choose to produce, we're going beyond. What's worth talking about in the arborist call now, okay

Daira: 01:22:36  

We need to discuss this in an R D meeting. Yes,

Str4d: 01:22:39  

Yes because it sounds like you've made some changes beyond the last things we discussed in an RD meeting. So probably, yeah, we so we need to talk about that.

Daira: 01:22:48  

We do, but I think I'll be able to convince you that kind of the there's no point in trying to maintain more compatibility than

Daira: 01:23:03  

than just requiring all wallets to immediately implement this before the network upgrade, and just checking that they do instead of what we did in canopy, which is kind of wishing and hoping,

Str4d: 01:23:17  

which, again, it comes back to a this is why it would be it would be. It would be useful to deploy this alongside Nu 7,

Daira: 01:23:25  

yeah. I think we need a longer testnet period than we had,

Str4d: 01:23:31  

yeah. And so in part, it's going to come down to, like, how quickly is this available and implemented and people can actually test and use it compared to everything else that needs to be done for Nu 7 right? That's  going to be where the where that comes down to, but, but this would definitely, yeah, but again, it would be riding alongside Nu 7. And if we can't make it work on that timeline, if there's too much other stuff to do and we can't get it in, then we will just have to find another way to mark the upgrade

Daira: 01:24:12  

I mean, if I have to write the code myself, I want to make sure that this gets in and all librustzcash using wallets. It will just work because we're using encryption, but also because of memo bundles, and because memo bundles are in the same upgrade as ZSAs and quantum resilience, everyone is basically going to have to completely re implement note encryption. Why would they implement it, ignoring one of the specs that we say you've got to implement.

Str4d: 01:24:57  

I point back to the earlier comment I made when we're talking about the Zcash test vectors, where people did precisely this,

Daira: 01:25:04  

and hard coded parts of the transaction format to zero, I it would never have occurred to me that someone would do that

Str4d: 01:25:13  

That's what people do, indeed do. They take the path that works for whatever it is that they are trying to achieve in the moment. And, yeah, we, we hold ourselves to a very high standard in in Zcash community. And

Daira: 01:25:30  

I mean, true, but this protocol is so complicated that you basically have to implement to the specs you want. I think part of the issue was the implementations that broke. They had never sort of held themselves to the same standards as the code that we write. Sorry if that's controversial to the to anyone still here who is implementing those wallets, but it's my opinion.

Pablo: 01:26:10  

So if a wall, if a wallet ignores, ignores the RCM computation, it simply does not, detects the new incoming note, right? 

Daira: 01:26:26  

Basically,  what I plan to say is that from Nu 7 onwards, the producers of net ciphertext must use access rate which means that all notes would fail to be received by a wallet that didn't implement access rate, so that that is just a broken wallet, and presumably users will notice that it's broken because they are not getting any incoming funds. The problem that we had with canopy is that we allowed two different versions.

Str4d: 01:27:06  

It wasn't that we allowed two versions, problem was that we only allowed version two too soon.

Daira: 01:27:19  

I don't think that was the problem. I think the problem was inadequate testing.

Pablo: 01:27:27  

Yeah, I think it's reasonable to specify for the wallet and expect people to either adopt the official code or implement it according to their spec. 

Daira: 01:27:41  

It is reasonable and also all of the lengths are changing so they can't use the old implementation. It won't even pass the transaction. The thing about canopy is that it was too similar to the previous protocol implementation, so you could get away with not changing it. Here, you can't possibly get away with not changing it.

Okay, so that's my argument. Anyway

Dan: 01:28:19  

I'm not sure what the proper venue to continue this is. R D, meeting. Okay, perfect. Well, thank you. That was quite interesting. Let me jump to the slides yet. Thank you for joining today, and the next arborist call is September 18 at the 1500 UTC, UTC time slot,

Next Meeting Scheduled: September 18 2025, 15:00 UTC

