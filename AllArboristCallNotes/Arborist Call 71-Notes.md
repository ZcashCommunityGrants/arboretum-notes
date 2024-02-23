# Arborist Call #71 Notes

Meeting Date/Time: February 22nd 2024, 21:00 UTC

Meeting Duration: 50 minutes


**Agenda**: 

+ Welcome and Meeting Intro

+ ECC Core Update - [Mobile SDK's / ZIP-320](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#1-ecc-update---mobile-wallet-sdks--zip-320)

+ Zebra Update - [Zebra Scanning / Hackathon](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#2-zebra-update---zebra-scanning--hackathon)

+ Research & Implementation Update - [Trailing Finality](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#3-research--implementation-updates-i-trailing-finality) / [FROST 1.0 stable release](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#3-research--implementation-updates-ii-frost-10-stable-release)

+ [Experimental Features i)](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#4-experimental-features-definitions-i) / [Experimental Features ii)](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Arborist%20Call%2071-Notes.md#4-experimental-features-definitions-ii)


## Decision & Action Items

i)  Zebra team to write readme to clarify experimental features definition. 

ii) At some point publish informal standard for FROST.

___


Video of the meeting: [recorded]

Moderator: Jack Gavigan

Notes: Jason Rogers


___



## Full Notes


### 1. ECC Update - Mobile Wallet SDK's / ZIP-320 

[03:36] - **Kris**

Our focus right now is entirely on the release of wallet sdk's. We are currently in the process of working on a release of zcash client backend that adds orchard support. That will then be followed by another couple of weeks of implementation to get that plumbed fully through the Zcash client SQL lite and then on into the wallet sdks for the Zashi 1.0 release, which we're expecting for the end of March.

[04:14]

The other thing that's active is we are undergoing security audits starting at the iOS layer and then working backwards through the wallet SDKs and to the rust libraries that support the SDKs that will be finishing up and we'll have a little bit of time to respond before the Zashi 1.0 release.

[04:46] - **Daira Emma**

Yeah, the iOS release will probably be a little bit before the Android release, so the audit is time to fit in with that.

[04:57] - **Kris**

Is there anything that I'm missing?

[04:59] - **Jack Grigg**

Obviously if there's anything that comes up in the audit that is significant, then timelines will move.

[05:09] - **Kris**

The other thing that ECC team has been involved with recently is work supporting the Binance transparent source exchange addresses. So we have a little bit of work now. We've come to a resolution on the approach with the help of Jason McGee and Hanh and Pacu and others, and feedback from Binance. So we have a bit of finalization there to do on [ZIP 320](https://zips.z.cash/zip-0320), which defines those addresses and then we have implementation in progress basically ready to go for Zcash address. And then Zcash client backend support will follow.

[06:03] - **Daira Emma**

Yeah, and it will be the TEX encoded addresses. So alternative one in the current ZIP, we'll change the ZIP to. So it's probably just that alternative. Or do we want to. We'll move it to an appendix.

[06:27] - **Kris**

Yeah, I think that that ZIP will probably just become that alternative then we may separately in the longer term open a source address restriction metadata ZIP that would allow users to add metadata to their addresses that says please shielded sources only or please no pool crossing value exposed and things of that nature.

[06:58] - **Daira Emma**

Yeah, and that has the advantage that you can combine it with other metadata like address expiry and things like that. But for the immediate resolution of binance's problem, we are going with TEX addresses.

[07:17] 

Something that I would like to solicit. I don't know if the Zcash Community Grants folks could put out a call for proposals or whether there was any possibility of doing this under the minor grants umbrella, but we've received feedback that if we want to have sort of widespread support for valid Zcash address parsing that what we as a community should target are Java, Swift and Typescript native implementations that are equivalent to the zcash address rust crate.

[08:06] 

So if there's any appetite from anyone in the community to seek a grant to do a java or swift or typescript port of zcash address, that is something that I think would be valuable. So if anyone's here from ZCG, then maybe you can help facilitate that outreach.

____

### 2. Zebra Update - Zebra Scanning / Hackathon


[09:20] - **Alfredo**

First we are finalizing with the Zebra scanner gRPC interface. This ended up with 6 gRPC methods to interact with the zebra scanner. We created a [document on basic functionality](https://zebra.zfnd.org/user/shielded-scan-grpc-server.html) and information.

[10:02]

Of particular interest is the scan push interface that registers, starts scanning and then get a stream of results back to the user in an async mode. We know we are lacking some functionality. For example, we are not scanning for orchard transactions. We have a bunch of bugs that we are going to improve.

[10:26] 

However, we would like the community to test it out, people that might be interested in that and provide feedback, comments, improvements or whatever. To us, that's something we will be looking for in a short period of time. In another topic we are releasing Zebra 1.6.0 which is Marek working on and I think that will be targeted very soon, probably between today and tomorrow.

[10:55]

Another topic is that the Zebra team has been receiving different proposals to add regtest mode into Zebra from different organizations. For example, we got some proposals from Qedit which we have been talking about the last time and in the last week we recited some pull requests from Zingo! Which are kind of going in the same direction.

[11:23] 

We didn't have time yet to investigate further and decide what we are going to do exactly to solve this problem. It could be that we go with the Qedit stuff or with the Zingo! stuff or propose an alternative that satisfies everyone or we can take pieces of each other, we are not sure yet, but we will try to research more and make a decision in that regard.

[11:54]

Another topic we had today our first meeting between the Electric Coin Company and the Zebra team to discuss what functionality is lacking in Zebra that needs to be implemented in the future to replace zcashd. This is going to be an ongoing and collaborative effort between both teams and we expect to do some work together for different repositories, upgrades or whatever. We will update, I guess, in the next arborist call. Where are we going to start working.

[12:27] - **Daira Emma**

Yeah, that was very productive. I meant to mention that. Thank you.

[12:32] - **Alfredo**

So the last one is that the Zebra team is going to be celebrating a hackathon sprint for the next two weeks. This is something we did in the past which every kind of team member or we make small teams to work in some fun feature we want to add to Zebra and that we never have time because of your routine stuff that we need to do.

[13:00]

So in the past we make with the same idea, we made a progress bar features which makes Zebra looks pretty similar to how zcashd does. We made an elastic search integration and I remember we did Arch Linux packages. I might be missing some of the other things we did in the last hack sprint we did. But yeah, we will be doing that in the next two weeks.

[13:32] 

For now, the proposals we have that we are pretty sure we will be working on is to restore Tor support that we had in the past, but we had a lot of dependency issues and we had to abandon it. So when I get back into Tor support, integrating with the Arti software, which is the Rust client for Tor, I will be probably working on that, maybe with someone else.

[14:00] 

Another idea that Arya is going to be working on or leading is creating a graphic user interface to launch Zebra with some rust tool called [tauri](https://tauri.app). Maybe at the end of the two weeks we'll have that.

[14:17] 

Another idea I'm aware is that Colorado will probably be working in the restore windows support in zebra that we had to abandon by zcash script issues, I think it was. So we maybe restored that with something we want to do since a lot and we never had time to do it. I guess that will give us our manager some time to decide what will be the next medium or big next thing for Zebra between a pool of things that we want to do.

[15:00] - **Jack Gavigan**

Thanks, Alfredo. Any questions? 

[15:19] 

I just want to add an expression of joy and satisfaction at today's meeting between the two engineering teams. Something I've wanted to happen for 3 years. It's fantastic.

___


### 3. Research & Implementation Updates i) Trailing Finality 

[15:40] - **Jack Gavigan**

Okay, let's move on. Any updates on Trailing finality?

[15:58] - **Daira Emma**

No update. I'm still planning to write up my changes for Crosslink 2. We're trying to figure out how and whether Proof of Stake fits into our timeline at ECC, but there's no firm conclusion on that yet.

___

### 3. Research & Implementation Updates ii) FROST 1.0 stable release 


[16:48] - **Conrado**

Yeah, it's me. So, yeah, we released [1.0.0 stable release](https://crates.io/crates/FROST-core) of FROST Crates, which is exciting.

[17:04] 

The previous release was a release candidate and the only difference between the stable release and the release candidate, just a bunch of methods that we exposed based on users feedback, but that's mostly it. But also importantly, there was a bug fix. This bug fix came from [vulnerability disclosure](https://blog.trailofbits.com/2024/02/20/breaking-the-shared-key-in-threshold-signature-schemes/).

[17:30] 

So, Trail of Bits reached out to us in January to let us know that they found a vulnerability in multiple person, commitment based distributed key generation protocols, including FROST. But not only FROST. So, this vulnerability, basically, the main aspect of it is that when you're generating a key. For example, with FROST, when you're generating key shares using the distributed key generation protocol, each participant generates a polynomial and a bunch of coefficients for this polynomial and publishes a commitment to these coefficients.

[18:22] 

So the issue was that we weren't checking the length of this commitment. So a malicious participant could generate a larger polynomial and in practice, this would result in generating key shares that had a higher threshold than intended. So, for example, if you're generating a 2/3 FROST wallet, maybe an attacker could cause it to be 3/3 or even 4/3 which would perhaps make the wallet unusable. You would never be able to generate a valid signature. So this denial of services vulnerability is not like key compromise. It just prevents you from using it.

[19:07] - **Daira Emma**

It was prevented from being shorter than it should be. It could just be longer, is that right?

[19:13] - **Conrado**

Yeah, it can be only longer.

[19:15] - **Daira Emma**

Okay.

[19:18] - **Conrado**

So, basically a denial of service vulnerability. So we fixed that by simply checking the length of commitment, and that fix is out in 1.0.0 stable release. But of course, we are not aware of any deployment ready applications of our libraries, so we don't think there's any complete impact. But if you're using our crates, please update to the stable release, which you should anyway.

[19:48] 

But yeah, that's it. We are also working on the demos. We finished phase one. On the last update, it was ready, but it had some pull requests in the review. So that's merged. We have updated readme to describe how to run it. So if you want, you can clone your repo and do the FROST demo over the Internet. The only catch is that you have to run a server, so people need to connect to you and if you're behind firewalls or NAT's that can become a problem. But it works.

[20:32] 

We already have good progress on phase two, which is basically decoupling the server from the coordinator. That should help with those connectivity issues, since everyone connects to the server and much easier in practice for people to use it. So we're halfway through that. 

[21:06] - **Jack Gavigan**

Any questions about FROST? I just want to express thanks to Trail of Bits, by the way, for sharing that vulnerability in a responsible manner.

[21:27] - **Daira Emma**

Yeah, it's a nice catch. I'm wondering about the sort of a root cause analysis, though. The polynomial needs to be variable length, because the parameters obviously can change between instances, but for any given instance, it should be a fixed length. So why was the code allowing that flexibility when it didn't need it?

[22:01] - **Conrado**

I think the answer is that it's not like you can't restrict like a vector by default. I think the right call should be for us to use like a wrapper struct that limited the length of this commitment vector to be the expected length.

[22:39] - **Daira Emma**

You were already checking that it was at least the right length. Were you explicitly checking that or were you just referencing the indexes and it would crash if it wasn't?

[22:51] - **Conrado**

That's a good question. I would need to check the code. Yeah, I can't remember the top of my head. I don't remember having like explicit length check.

[23:06] - **Daira Emma**

Okay. It was accidentally not having that vulnerability. Okay.

[23:13] - **Conrado**

Exactly.

[23:14] - **Jack Grigg**

Yeah. Because the bit that gets a bit annoying here from an implementation perspective, is that because it's a multi round interactive protocol, you have to essentially serialize and then reload state between different network calls, which may in some cases be asynchronous, while also handling the fact that the implementation, like the decision: are you going to do a 3/5 or a 5/7 or whatever is ideally a runtime decision, because it's up to the users on what they want to do.

[23:52] 

Although encoding that into the types of the state machine is handy and useful from an implementation perspective, but severely limits the usability of the resulting binaries. So there probably wasn't an easy way to programmatically detect this, because essentially it ends up being a thing you just have to make sure every time you load your state from disk and from network for the next phase that you recheck.

[024:27]

Because there's been similar vulnerabilities in other protocols, like invalid curve attacks and outsized not checking the length of your field elements in other protocols that are all essentially the same thing, which is that if there's flexibility in your cryptographic scheme, you can generally exercise that to break something.

[24:55] - **Daira Emma**

Yeah, the blog post has a list of affected libraries. So are these all vulnerable because they were basically copying how each other did it, or are they derived from the same code?

[25:15] - **Conrado**

I'm not super familiar with all of these. I know that none of these are based on our code.

[25:24] - **Daira Emma**

Right, so they're independent implementations, but they're looking so closely at the other implementations that they reproduce the same.

[25:33] - **Conrado**

Maybe.

[25:34] - **Jack Grigg**

Is there anything in the [RFC draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/) that might have led to this implementation direction?

[25:44] - **Conrado**

Not exactly, because the RFC draft doesn't talk about key generation, it's just signing. 

[25:52] - **Daira Emma**

Oh right, so there is no spec.

[25:56] - **Conrado**

Exactly.

[25:57] - **Daira Emma**

That might be a useful thing to write.

[26:01] - **Conrado**

Yeah, that's a good point.

[26:03] - **Daira Emma**

It doesn't necessarily have to be in the RFC, or it could be an appendix. I guess the RFC is already published or in the process. That boat has sailed as far as changing it now.

[26:15] - **Conrado**

Yeah, but we could do an informal standard published somewhere. I agree that would be a good idea. Programming wise I wish we had used some new Type to wrap the vector, and that would ensure that it will always have the correct length regardless of whatever it was decoded or generator or whatever.

[26:48] - **Daira Emma**

We should all be using dependently typed languages that make it really easy to make the lengths of something depend on a parameter.

[26:57] - **Conrado**

Yes.

[27:00] - **Daira Emma**

I'm serious. I think the tradeoffs in favour of dependently typed languages have been sort of misunderstood widely because they don't have to be as complex as people perceive them to be.

[27:17] - **Conrado**

Right?

[27:19] - **Kris**

In most cases, when you get dependent typing, it actually simplifies a whole bunch of special cases.

[27:30] - **Daira Emma**

Yeah, one of these days I'll actually implement NETA and you will all see how much simpler it is, or can be.

___

### 4. Experimental Features Definitions i) 


[29:25] - **Jack Gavigan**

We were working recently on adding viewing key scanning capabilities to Zebra and we're going to release what we call an experimental feature. But I'm conscious that that terminology has been used for a long time by Zcashd, and I wondered if there was any formal definition of it beyond just the fact that it's hidden behind the experimental feature flag in zcashd.

[30:07] - **Daira Emma**

So apart from being hidden behind that flag, it basically means that we're not making a compatibility commitment to that feature so it might change.

[30:21] - **Jack Grigg**

Yeah. You basically have to assume that kittens may come along and eat your code at any time.

[30:30] - **Daira Emma**

Yes. It could be removed without further notice or changed without further notice.

[30:38] - **Jack Gavigan**

Yeah.

[30:38] - **Jack Grigg**

As was said, there's no expectation of backwards compatibility or any sort of migration path. That's what we haven't meant that as and that's what we are indicating as well. So in zcash primitives, we've documented now specifically some feature flags on zcash primitives crate and similar crates as also experimental features such as the unstable NU6 feature flag.

[31:10] 

If you depend on that right now, you're going to break consensus stuff and you're also going to break a bunch of other stuff to some extent there's a separate conversation to be had about how we do those pieces, which we maybe should talk about. But for now kittens can be eating things.

[31:38] - **Alfredo**

i wanted to ask, how do you differentiate in rust, what is an experimental feature or any other feature? Because you have these flags. But that doesn't mean that it is experimental.

[31:57] - **Daira Emma**

So in zcashd it means that the feature is behind a command line flag or zcashd.conf flag and whether that's implemented in terms of a rust feature, it probably isn't if it's zcashd. So that's a separate concept from features in rust libraries.

[32:33] - **Jack Grigg**

Yeah, so the word feature in experimental feature conceptually has nothing to do with rust feature flags. It just so happens that currently we have a few things that are implemented via rust feature flags that are experimental features.

[32:50]

So there's no formal thing in the rust compiler that enables an experimental feature, although this is something this is what I was referring to 30 seconds ago.


Rust has obviously the concept of conditional compilation, so you can place things behind #[CFG). Anything in there enables you to turn on a condition with some sort of boolean logic for when something should or shouldn't be compiled. So that's the primitive that the rust compiler gives you for including or excluding something, and you can just pass through configure flags to Rust C directly via the rust flags environment variable to enable and disable things.

[33:40]

Feature flags are specifically a feature of rust that are implemented via rust config arguments, but they have specific mechanisms, and they are intended to be additive only. So it should never be a semver breaking change to enable a feature flag in your dependency tree.

[34:04] 

Now, in practice, people use and misuse them for things that are technically breaking semver, in part because there can be some very subtle semver API issues that are hard for developers to reason about and think about. So within the context of within our experimental features thing, an example of this is the zfuture flag that we've had around for a while. We've had that sitting there, that it is quote unquote additive because it adds a new transaction format, the zfuture format, that we can just throw anything in that is like experimental and being experimented with. But technically adding an enum case to a rust enum is a breaking change.

[34:49] - **Daira Emma**

Not just that, it's also an incompatible consensus change, right?

[34:53] - **Jack Grigg**

Because I was literally about to say that it's not adding APIs, it's changing how the parsers work in a way that means you're expanding or contracting consensus. So something that we've started experimenting with for orchard specifically is we put the orchard feature flag in zcash client backend in the Zcash client SQlite behind a rust flag.

[35:20]

So you have to enable --config zcash unstable=orchard in order to compile with the orchard feature flag & we've altered our CI to do this as well. That essentially means that you can at that point make behind that config flag whatever changes you want, because it's no longer just a feature flag, it's a config flag which has no kind of like semver or compatibility support or anything to deal with.

[35:49] 

So we may want to consider moving the experimental features in general to just be config flags rather than feature flags. The downside is it's not as nice to work with them because you have to put things in through environment variables. And also that config flag just applies universally. So if you happen to pick a name for that config flag that collides with anything else anywhere in your dependency tree, that will get enabled as well.

[36:21] 

The upside is you don't run into this problem where feature flags look like they can be enabled because they exist. If you haven't noticed that, there's documentation saying that these are experimental.

[36:32] - **Daira Emma**

What happens if you use the orchard feature flag and don't set the environment?

[36:43] - **Jack Grigg**

Right now we've set it to a compilation failure. There's a macro you can use in rust if it is compiled in, the compiler will emit a compilation error. So we've got that precisely using the Boolean options of if you have the orchard feature enabled, but you don't have this config flag, then it emits that compiler failure.

[37:08] - **Kris**

One of the limitations of feature flags, there are some things, most might mind would be constraints. So trait bounds that you can't actually flag off. And so there are some things that you would like to be able to hide behind a feature flag, but that are just inexpressible in rust. There are some workarounds, but they're really inconvenient.

[37:41] - **Daira Emma**

So if you duplicate the whole trait.

[37:43] - **Jack Grigg**

Yeah, that's essentially what you have to do right now. There is an RFC that's just been merged for essentially fixing this by allowing you to add conditional compilation onto where bounds and that basically solves the language UX problem of allowing bounds to be conditionally compiled.

[38:06]

You still have to account for the fact that adding or removing a bound is a breaking change to a trait. So that still isn't really an appropriate use of feature flags. But the problem you run into with feature flags there is the spooky action at a distance problem where because feature flags are always unified, so the feature flags enabled for any dependency is the unification of all feature flags that were enabled by anyone in your tree.

[38:36]

If you depend on a library and enable one feature flag, and then someone else depends on that same library enabling a different feature flag that actually conflicts, then you end up in a situation where you can't do anything. You run into this far less when your dependencies are direct dependencies right underneath you like very close to the application layer because you essentially control all, almost the code there.

[38:56] 

But if the dependency is very deep in the tree, then you can be in a position where through no fault of your own, you cannot compile and there's nothing you can do. You're beholden to the maintainers of those libraries. Which is why for libraries the general premise is make sure that features are additive.

___

### 4. Experimental Features Definitions ii) 

[chat] **Andrew Arnott**

Does this mean that feature flags in librustzcash shouldn't change what members are included in a trait? (That subject came up recently and was decided in favor of flags adding members to it).
Here is a sample of a 'semver breaking change' on a feature flag: https://github.com/zcash/librustzcash/blob/04343e16f1d0078ff4529890240ebf082410e3df/zcash_client_backend/src/data_api.rs#L557-L561


[39:14] - **Daira Emma**

Can I answer Andrew Arnotts question? So he pointed out an example where you have a pub trait and you conditionally enable a particular method on it depending on a flag. So normally yes, that would be a case of assembler breaking change dependence on a feature flag. But in this particular case, because the orchard feature flag is also dependent on this other environment variable flag, then that is essentially saying that we're not making that guarantee.

[39:59] - **Jack Grigg**

But that's not the real reason for doing that, because the plan is when orchard is released, we'll remove that zcash unstable flag around it and it will still behave this way. There are two answers to this question that Andrew posed. One is you can make these kinds of changes to traits in a non semver breaking way.

[40:20] 

Because the problem here essentially is if someone depends on the version of the library and they don't enable that flag, and then they implement that trait, they haven't implemented the flagged off method, they may not have wanted to. It may be like say someone wants to pin just on orchard support and they disable the sapling feature flag. So they don't depend on the sapling crypto dependency. They don't want to implement any of those sapling logic. But if what they're implementing is another lower level library that depends on Zcash stuff but itself will be dependent on, and then someone else depends on that trait and is enabling sapling, then that's where the breakage happens.

[40:57]

So there's two ways around that. One is to make sure that anything that has a feature flag has a default implementation. So then if it gets enabled, then there's a fallback method that is provided so there's no code compilation, everything just works and that's what we've done in other places. Then the other thing is to only do this kind of flagging when you're very close to the application layer. That's the example that Andrew points at. That's what's happening there.

[41:23]

So we've flagged things off with the orchard flag that don't have a default implementation. But the rationale is that if you're depending in this case on the wallet read trait, you're implementing a wallet application. So it is unlikely that you're going to run into this diamond dependency problem that leads to spooky trait action and feature enabling at a distance. The real solution here is going to be turn the zcash client backend into essentially this is an application crate. It's a library, but it is used directly in applications and not a deep dependency. So that means moving the things that are more suitable for a deep dependency usage like batch scanning and other papers of that out of that crate.

[42:12] - **Andrew Arnott**

That makes sense. Thanks.

[42:15] - **Kris**

Yeah, in that particular case, again, we would not necessarily have it built the way that it currently is if the language were able to conditionally enable trait bounds. There's an RFC or something of that sort that is.

[42:43] - **Jack Grigg**

Yeah, the one I mentioned earlier. Yeah. There are ways you could structure this where you put like the orchard specific stuff into an orchard specific trait and then you just never implement that trait in practice.

[42:55] 

The problem essentially here is that zcash client backend is not just adding these traits, it has a bunch of generic methods that assume those traits exist. That's where you run into this problem because if you're trying to write a general like scan compact blocks method that scans for sapling and orchard, if you want to scan both sapling and orchard, you need the database to be bounded on both the sapling and orchard traits, that's where the top of the diamond and the interaction pattern comes in. And we're trying to write those essentially application methods in a generic way so they can be reused by multiple applications.

[43:35]

If instead we had a bunch of individual methods for like 'scan the sapling stuff', 'scan the orchard stuff' and so on, then we could just flag off each of those methods and the applications that didn't want to support sapling wouldn't have access to the sapling method. So it's a language level annoyance that we're sort of just coping with for now because it's good enough and not too many people are going to run into this problem, but we may have to revisit later.

[44:05] 

But getting back to the point of experimental features, those are certainly deep enough in the dependencies like zcash. Primitive is a much lower level dependency that we can't do this kind of thing. So we do need to respect how feature flags are meant to be additive, which means that experimental features of the sort that we should be able to do wide ranging changes to make it to do experiments, probably need to be moved away from feature flags.

[44:34] 

Str4d, out of band can you share a [link](https://github.com/zcash/librustzcash/blob/04343e16f1d0078ff4529890240ebf082410e3df/zcash_client_backend/src/lib.rs#L89-L92) to or a pointer to this compilation flag that causes it to fail to compile if it's not set appropriately? 

[45:05] - **Alfredo**

I was thinking on how we in Zebra use the feature flags, and right now, for example, we do a bunch of stuff behind feature flag with all the troubles that it became a bit difficult to maintain at the end. But of course we don't have a difference for experimental features or other features that could be really useful for users.

[45:34] 

So by what the Str4d said, it's a matter of convention. So I think we should write that readme or something like that, because sometimes it feels like we have a stuff behind a feature and it feels like we need to remove it from behind that feature at some point and that may not be the case. There are features that will forever be there. There are other features we will want to remove it behind that flag, not because they are experimental, but after certain testing we include it in the main repo, which makes things a bit easier. But we don't have a distinction right now and I think that may be what we need.

[46:25] - **Jack Gavigan**

Yeah, I think that we are using rust features in a sensible way in Zebra to allow people to expose different pieces of functionality. I think just describing some of them as experimental features and maybe using this thing. Maybe using this approach to ensure that people don't accidentally enable or start relying on a feature that we consider to be experimental is probably a good approach.

[47:13] - **Jack Grigg**

Yeah, because in that regard, this kind of conditional compilation flag approach, gating the feature flags behind this compilation is essentially equivalent to what zcashd does with its experimental command line flag.

[47:32] 

All of those other command line flags are disabled and can't be used if you haven't enabled that flag. The one thing I will note, however, is if you do do this gating, then the All Features flag does not work when you compile. Because again, the rust compiler doesn't know that you're doing this. So if you ask cargo to compile with all features, it will try and compile with all features, including the experimental ones. So anywhere you want to use all features, you'll need to also add all of those experimental things that you've gated off.

[48:04]

That's one possible argument for using for unstable things in particular, maybe using the config flag approach entirely rather than feature flags then maybe if it's something that you want to be conditionally compiled by feature flags once it's done, then maybe at that point you then instead of having it be, you've feature flagged it, but then you made the feature flag data behind this. Maybe you just start it as a conditional compilation flag, and then when you're ready and it's an additive feature that you want to add conditionally to the main stable code base, replace all those config things gated by an unstable rust flag with a feature flag at that point that would allow unstable.

[48:51] 

So if you took that approach, then all features would then be all non experimental features because you wouldn't be using feature flags for experimental things.

[49:00] - **Daira Emma**

Maybe there's some macro that you can write that actually replaces the config macro and can use either approach so that you don't actually have to replace all of those things.

[49:13] - **Jack Grigg**

Yeah, actually that on its own would be something like if we want to unify how we handle experimental features between the zcash rust crates in librustzcash and zebra, that might be a suitable component crate that we could just put the shared how we handle this across our ecosystem into that logic there.

[49:38] - **Daira Emma**

Yeah, that might be generally useful for other people. Should be a similar crate.

____


### Attendees

+ Daniel (decentralistdan)

+ Jack Grigg

+ Kris Nuttycombe

+ Alfredo Garcia 

+ Arya Solhi

+ Conrado Gouvea

+ Daira Emma

+ Andrew Arnott

+ Marek Bielik

+ Michael Harms


**Next Meeting Scheduled: 15:00 UTC March 7th 2023**


___
___
