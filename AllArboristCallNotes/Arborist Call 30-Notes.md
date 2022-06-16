
# Arborist Call  #30 Notes

Meeting Date/Time: June 16, 2022, 13:30 UTC

Meeting Duration: 18 minutes

**Agenda**: 
+ Zebrad/Zcashd Status Updates
+ NU5 Integration Update
+ NU5 Ecosystem Update



Video of the meeting: [Recording](https://github.com/ZcashCommunityGrants/arboretum-notes)

Moderator: Steven Smith

___
## Decisions & Action Items

i. Analyse tests of Tokio tool

ii. Cleaning up CI documentation 

___

## Full Notes



### Zebrad Updates - 1. DNS Seeder

Conrado 03:51 -  "So lately we were working on making Zebra work as a lightwalletd backend, it's mostly done. There is one issue that we are investigating some test failure that only happens in CI which is annoying, but we investigate it hopefully it's not a bug its just a CI issue but other than that we test it with some wallets like Nighthawk and Zecwallet so that's good, we're glad that we have finished that chunk of work."


04:39 "Something else which happened I mentioned on the last Arborist Call, I was testing our DNS seeder and it was behaving weirdly, it was seeming to be offline. It was a bunch of issues which together had presented this problem. The first issue that was happening, there were a bunch of Flux nodes, that is a fork of Zcash and the number increased a lot recently, I think to 8000 nodes and our DNS seeder was not enforcing a minimum protocol version" 

05:30 "Another issue was that our DNS seeder was returning peers regardless of the port they use but since DNS seeders just return a list of IP's they cant return the port which they are listening to. So the DNS seeders should only return peers using the default ports. Ours wasn't doing that so that was another problem that we fixed and Flux is using a different port so that's why it was causing problems for us but all of that has been fixed. 

"We already applied the updated version so our DNS seeder should be working fine. There is another DNS seeder being maintained by George who used to work at the foundation so i reached out to him to also update his seeder. Also doing that testing it was covered that some Zcashd nodes were returning some Flux peers. I reported the bug I think you were investigating but probably something related to the peers date file which stores peers when the node is restarted but I think you're already working on it."

_____

### 2. Zebrad Updates - 2. Tokio Console

  Conrado 07:10 - "Another thing we did in these past 2 weeks, we added support for Tokio console in Zebra, which is a tool to do async programming in Zebra, note tasks and this tool allows you to view what is going on, how many tasks are running, how much cpu they're using, on what they're blocked. This is a really interesting tool which shows a terminal with a list of tests like TAP in linux but for tests." 

  "It gave us a warning about some test not have workers registered which we are investigating, it could be some source of issues but we just did this so the next step would be to better analyze the output of the tool and check if there is anything we can do to increase Zebra performance or reliability, that's something exciting which we've wanted to do."


  08:30 - "Other than that we are mostly cleaning up CI documentation, the Config file format for zebra, we had a bunch of stuff that we left for later which wasn't critical but it's important do for usuability to make it easier for users to deploy Zebra. Our goal is to do a stable release candidate for Zebra which should come soon."        


  Dodger 09:08 - "Regarding the Flux thing, I wonder if they forked before or after we included the remote shutdown mechanism in Zcashd, and if they did fork after I wonder if they changed the key."

  Daira - "We removed that quite a while ago so my guess is probably they forked after, I'll check and report it as a bug to them if that is the case."

  Daira - 17:32 "About the Alert key for Flux nodes, yes they did change the key. They have a comment saying their technology is GmbH so i assume its their key. 

______

### 3. Zcashd Updates


  Steven 10:30 - "Over the last couple of weeks we've had some folks on PTO, we did some work on cxx.rs which we're using to replace handwired FFI between Rust and C++ with something that should be more safe. If I understand correctly it generates a bit of the FFI stubs perhaps, Str4d was working on that prior to going on PTO."

  11:05 - "We've updated the Zcash address to allow for parser errors to be exposed which is pretty handy for people looking to parse addresses. We integrated something called cargo-vet which if i understand correctly is a way to establish your dependencies are correct."

  "We have been working on the recursion related API's in Halo and for some time we paused work on it because we didn't want our CI to been in any state of flux around the NU5 activation. We have been working on really substantial update to our CI system to improve reliability and build/test times."


  "That's getting really close, should have it deployed any day now and we are looking forward to that, there will be some incremental improvements. This is a long term project that we are about to deploy so it should make everyone really happy that builds & runs Zcashd and submits PR's."


  Larry 12:32 - "In case anyone isn't familiar, "cxx" is a general convention to refer to c++ but works in contexts where special characters wouldn't be allowed … so think of the "x" characters as 45 degree rotated + characters"



### 4. NU5 Ecosystem updates - 1. Coinbase


 Steven 12:57 - "At the last Arborist call we had one exchange that was working through a few issues. We had worked with Coinbase for a few months in the lead up to NU5 activation. The team we were working with was not aware there was an older, deprecated way of interacting with Zcash that was used on the retail side. 

 "They had the institutional working well and tested weeks in advance of NU5 activating and found the retails side used a different codebase, we worked with then for over a week and a half after NU5 activated to get squared away." 

 "Coinbase had a new team that wasnt too familiar with that part of the code and had not worked with a bitcoin based type coin before. They're a great group of people, we enjoy working with them and Str4d did an excellent job."

 14:10 - "They have come back after the fact and asked if there is a way to not have do the transaction parsing themselves. We are looking to implement UNIFFI which essentially generates language bindings for a number of languages for Rust. That may be a way for them to rely on our Rust crates for the things they do themselves." 

 ### 4. NU5 Ecosystem updates - 2. Wallets

 Steven 14:45 - "Nighthawk, Unstoppable, Edge, ZecWalletLite all versions are fully functional as far as we know. Ledger is fully functional again, ledger typically upgrades when something stops working although we let them know ahead of time that it was coming."

 "Coinmetrics is fully functional, Block explorers are fully functional we have an update to [get] and [decode][raw transaction] which is a couple of RPC's in Zcashd which adds an ability to see details in raw transactions, obviously not the sender/receiver or amount but number of actions for example. Our plan is to include that in our next release of Zcashd which is 5.1.0 which is roughly 6 weeks after 5.0.0 which is the cadence we like to follow if we're not a hot fix or bumping up against a halt which in this case we are not."

 "Congratulations to everyone from ECC the foundation and all our ecosystem partners to make NU5 possible"


___


### Attendees


+ Conrado 

+ Daira 

+ Dodger 

+ Deidre

+ Sean

+ Larry 

+ Marek

+ Marshall 

+ Pacu ECC


