# Sandblasting Retrospective - Summary

Meeting Date/Time: December 13th 2023, 22:00 UTC

Meeting Duration: 1 hour 50 minutes


**Agenda**: https://docs.google.com/document/d/1rYxKscpHe-DOkyXlK4G3M1SL37RuFmndD3enfUxwk0Q/edit#heading=h.af2t2yevr4k3



## Sections:

1. [What is Sandblasting?](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#1-what-is-sandblasting) / 2. [Sandblasting Timeline of Events](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#2-sandblasting-timeline-of-events) / 3. [Zcash Foundations Response](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#3-zcash-foundations-response) / 4. [ECC Response Timeline](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#4-ecc-response-timeline) /  5. [Impact on Network users / Timeline](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#5-impact-on-network-users--timeline) / 6. [What reposnses worked and what didnt](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#6-what-reposnses-worked-and-what-didnt) / 7. [Did ECC grow as a response?](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#7-did-ecc-grow-as-a-response) / 8. [Non technical Mitigations](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#8-non-technical-mitigations) / 9. [Sapling Woodchipper attack](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#9-how-did-the-sandblasting-attack-comparecontrast-with-the-sapling-woodchipper-attack) / 10. [ZIP-317](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#10-zip-317) / 11. [Is the Attack Over?](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#11-is-the-attack-over) / 12. [Any idea who is behind it?](github.com/ZcashCommuityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#12-any-idea-who-is-behind-it) / 13. [Lessons Learned](https://github.com/ZcashCommunityGrants/arboretum-notes/blob/main/AllArboristCallNotes/Sandblasting%20Retrospective%20-%20Summary.md#13-lessons-learned) / 




## Improvements / Suggestions

i) If emergency mode was explicitly detailed it would be clear what ECC was working on

ii) Would be helpful to discuss other mitigations such as Block Size halving more widely

iii) Prepare ready-to-go processes for long term issue resolutions 

iv) Stress testing for DoS attacks across architecture 

v) Find better way to handle security incidents during Emergency Mode 

vi) Keeping track of more development efforts between intersecting codebases

VII)  Concerning issues must be proactively researched + weekly calls set up

___


Video of the meeting: [recorded]

Moderator: Mark Henderson

Notes: Jason Rogers


___



## In-Call Summarised Notes


### 1. What is Sandblasting?

**Nate**

Shortly after NU5 shielded transactions on the network spiked. 
A bunch of these had different characteristics than normal transactions. They tended to use a lot of size. 
With the low fixed fee at the time, they consumed a lot of resources. 


___

### 2. Sandblasting Timeline of Events

**Str4d**

- General pattern, shortly after nu5 activation period of high orchard action activity for a couple of weeks
- high no. of orchard actions + high no. of sapling outputs for rest of 2022 
- few changes in behaviour as mitigations were deployed

**Nate** 

- Sandblasting started within a month of NU5 activation 
- thought was it might leverage orchard 
- DoS was not specific to orchard 


**Kris**

- There was an additional change, after deployment of ZIP-317 fee changes propagated across network
- Transactions switched back to transparent with intention of saturating mempool
- Visibly dust being transferred
 
**Str4d**

- For observable (funded) shielded sandblast transactions they were dust 
- Started 15 june 2022 
- Sandblast transactions appear to have stopped being added to mempool november 2023 
- First 2 months making sure nodes could process chain load 
- Next zcashd wallet was bolstered for centralised exchanges and mining pools 
- After Zcon3 (august) enabling lightclient stack to tolerate sandblasting through to september 


**ECC's response was as follows:**

1st phase - Consensus network itself (all users)

2nd phase - CEX's & mining pools    

3rd phase - lightclient stack + its users

In parallel ZIP 317 fee change designed & implemented 


___


### 3. Zcash Foundations Response 


**Teor**

- No immediate impacts on Zebra when spam started 
- Due to Zebra's engineering + support for wallets via lightwalletd, txs were verified in parallel, no immediate impact on performance.
- At this time support was offered to ECC 
- 1st major contribution to issue was helping to produce zip 317 
- ZIP 317 was implemented from scratch in Zebra


**Daira**

- Engineering cooperation between ECC & ZF worked well, specifically ZIP 317

____

### 4. ECC Response Timeline

**Str4d**

- 20th June issue raised by 3rd party 
- Kraken CEX noted performance problem
- Activity in the forum at the time - first suggestions made that would lead to fee changes

**Daira**

- ECC created channel "wallet performance issues" July 22nd
- Brainstorm around additional responses
	
**Str4d**

- 8th July - first release with performance improvements 

**Nate**

- Most engineers were aware and actively investigating 
- Some members of team were unaware at the time 
- Took time to conceptualize Emergency Mode - late September 2022 
- First engineers were aware, then Nate and Zooko communicated it to executives
- Many more months before emergency mode was described to public 
- If emergency mode was explicitly detailed it would be clear what ECC was working on - ACTION POINT 
- Criteria for exit was users of mobile sdk could access fund safely 


**Daira**

- internally in wallet performance issues channel zooko asked people to treat it as ongoing incident July 25th 

- Users not being able to access funds in some wallets 

- Team had already been working on mititgations


**Zooko** 

- As memory serves - was not emergency that would require extraordinary effort until realisation changes to lightwallets required

**Kris**

Late July was also when Madars first suggested fee changes on the forum: 
https://forum.zcashcommunity.com/t/zip-reduce-default-shielded-transaction-fee-to-1000-zats/37566/76 


______

### 5. Impact on Network users / Timeline

**Arya**

- It did affect wallets - concurrency issues blocked RPC requests, lightwalletd would hang for 10minutes

**Pacu**

On Impact to wallets: 
- Started experiencing memory issues on lightwalletd that were more frequent 
- Wallets that didnt have linear sync were affected less than linear scan wallets 
- Eventually every wallet was affected 
- Ywallet/Zingo implemented transaction filtering - this cost legitimate usecases (payrolls/big payments like donations/mining pool outputs unstable).

**Nate**

3 main categories:
- zcashd wallet users like exchanges 
- shielded mobile wallets that use lightwalletd 
- transparent lightwallets incl multicoin mobile wallets - much less affected 

**Daira**

- Even relatively early on, some engineers experienced burnout 
- July 2022, daira had migraines and was feeling very stressed
- NU5 activated 31 May, sandblasting was 2 weeks later - no time to rest 

**Teor**

- Mid july 2-3 weeks went through code & tech debt 
- Redundantly verifying orchard proofs 
(werent running more than 1 cryptographic batch at a time)
- Majority of work complete by august 
- Zebra had most of our parallelism and batching fixes in this release, in mid-July 2022. 
- This included the redundant Orchard verification fix: 
https://github.com/ZcashFoundation/zebra/releases/tag/v1.0.0-beta.13
- We didn't need to add much caching at all, the parallelism was enough.

___

### 6. What reposnses worked and what didnt 


**Str4d** 
- A lot of initial mitigations for zcashd 
- Adding parallelism, batching & caching (standard things that weren't yet implemented)
- Took zcashd closer to what zebra had 
- wallets - improvements to batching & parallelism to scanning through till august/september 
- lightwallets and other significant changes to scanning 
- Non-linear scanning for mobile sdk enabled 
(If notes are known you can make them spendable without having to scan through chain)
- Changing the way update witnesses + ordering of block scanning/processing 


**Zooko**

- Took 4-6 weeks to get full nodes reliable 
- Maybe 4-6 weeks to get CEX & mining pools back online  
- Mobile wallets and lightwalletd, 12 months to get working


___

### 7. Did ECC grow as a response?

No - 
Large layoff in May 



___

### 8. Non technical Mitigations 

**Pacu**

- When he learned attack was described as issue. At some point if there is consensus it was an attack it was documented 
- Risk management could have been done differently 
- There were great improvements in technical mitigations that were tech debt 
- Sdk's were improved a lot - addressing tech debt 

**Pacu**

- Emergency mode changed how things were prioritised 
- ECC had better priorities around development goals 
- Understanding it was an Ecosystem emergency may have led to better collaboration

**Nate**

- Once emergency mode was defined it worked well to be clear on goal + communicate widely 
- Improvement - didnt communicate phase before defining goals (analysis phase) 
- Helps to have more collaborators in ecosystem during this phase 
- There was effort needed to align on what impact was  (size of node vs mobile wallet scanning)

**Daira**

- Suggested halving block size temporarily 
- wouldve proportionally reduced effect on blockchain size 
rejected at ECC 
- would've been helpful to discuss things more widely - ACTION POINT


**Str4d**
 
- Block size decrease was mentioned, issue was created 
received some negative responses 
- There were progress reports in arborist 
zcash incident response is good (time limited and focused)
- We didnt have an equivalent ready to go process for long term ongoing issue - ACTION POINT
- Emergency mode developed organically while everyone was under stress (not ideal)

___

### 9. How did the Sandblasting attack compare/contrast with the Sapling Woodchipper attack? 


**Dodger**

https://saplingwoodchipper.github.io/ - public post of potential attack on zcash

**Daira**

- Change in itself (fee reduction) wasn't the problem 
- Attack wasn't well defined (spam was possible)

Context

>https://github.com/zcash/zcash/issues/3955

**Zooko**

Sandblasting was an implementation of the woodchipper attack

___

### 10. ZIP-317

**Zebras timeline for ZIP 317**

- 1 week implementation 
- 1 week to do revision


**Daira**

- There was thought of fee changes early on 
- Kris suggested change to fees on July 22nd 2022 
- Usability, variable fees were deemed UX issue 
- Team recognised that in the face of spam attack, fixed fees were no longer tenable 
- Perception that wallets should make fee change first before enforcing on zcashd
- Early enforcement would cause UX issue 
- Probabilistic enforcement allowed disincentivisation without enforcement 
- ZIP created Aug 2022 - merged Oct 10 
- Designed new block construction algo - late oct 
Mobile sdk support released in November - still not enabled 
- Took until end of april 2023 for zcashd 5.5.0 released with new block construction algo 
- It had immediate effect 


**Pacu** 

- Mobile sdk was not enabled due to not being tested 
- It did have bug + UX implications for creating transactions


**Str4d**

- Mobile sdks required refactoring 
- ZIP 317 effect on network - once block production cut in, probablistic algorithm (50 unpaid actions) pattern of sandblasting soon afterwards changed to target unpaid actions 
- Wallets paying ZIP 317 could skip queue and be fine = very full mempool instead of very full blocks 



___

### 11. Is the Attack Over?


**Zooko**

- Must differentiate
- Ending the attack was not sufficent to allow users to access funds 
- Additional work required 

- As of November 2023 both true. Attack stopped/Users can access funds

___

### 12. Any idea who is behind it?

- Not worth speculating 




___

### 13. Lessons Learned

**Dodger**

- What should we do differently moving forward?
- In response to str4d's prepared response tactic: its good because it means you can act quickly but you cant plan for every eventuality 
sometimes it can be a disadvantage 


**Conrado**

- Wondering how zip317 was built and timeline around it 
strategy was not to stop spam but make nodes & software work 
- Was it possible to do stop gap measure to create fixed fee of 10,000 
- Entire process took several months 
- Simple design might have saved resources 


**Daira**

- Increasing fixed fee wasnt going to fix it 
- Attacker was filling blocks, fee would have to be large enough to disincentive attack + account for resources of a full block 
very high per tx 
- Wallets would also need to implement new fee 
- Probabalistic enforcement would still be necessary 


**Kris**

- It was prioritization 
- How prioritisation should be handled going forward important 
because zip 317 was not a consensus change, it could have been anyone in ecosystem to lead the effort 

**Taylor**

- If you have funds in mobile wallet in the middle of spam - scanning still infeasible
- Stress testing for DoS attacks across architecture ideal - ACTION POINT 
- Cost of attack today - figure out 
- Fixes today make attack expensive but trial decryption still an issue - different paradigm ideal 


**Daira**

- Cost of attack was calculated - not public 
- Analysis informed constants chosen 


**Nate**

- When operating in emergency unexpected impacts of mitigations must be discovered


**Daira**

- Channel needed to every wallet developer 
- Assumption that there wont be wallets that wont update prevents useful and important changes 
- Referring to LCWG 
core team told it couldn't make changes because it would brick wallets


**Kris** 

- Ledger transparent wallets are still bricked 

**Nate**

>I think I am still reeling from believing that asic adoption was inevitable and the ecosystem would need to adapt, then learning Zcash lost a huge proportion of miners (who were likely the most popular use case at that time). So I believe we shouldn't hold back due to unknowns, yet at the same time we want to understand as much as possible of existing use cases so we can understand the impacts of our technical decisions.


**Daira**

- There was Halborn security incident in the middle of the response 
- Other coins affected were slow to react
- It cost a lot of engineering bandwidth 
- Find better way to handle this moving forward - ACTION POINT 


**Str4d**

- Lesson learned in getting changes out quickly 
- There was drift between rust code that crates were using 
- Reintegrated two branches was much of latter half of 2022 
- Keeping track of more development efforts between intersecting codebases - ACTION POINT 
- Delta between users wallets + needed state for fixes was too great for any rapid fix 


**Zooko**

Lesson learned for ECC:
- Zashi beta tremendously helpful to fix sdk 
- Generalised lesson - no replacement for having direct contact with users 
- ECC pivoting to Zashi gives direct contact to:
prioritize / try fixes / coordinate team 


**Nate** 

- Have norm in zcash development community 
when anything is concerning to anyone, consider getting people more proactively research issue - ACTION POINT
- Weekly call to be set up about said topic 


____


### Attendees

+ Str4d

+ Daira Emma

+ Nate Wilcox

+ zooko

+ Alfredo Garcia

+ Andy

+ Arya

+ Chris

+ Conrado

+ Dodger

+ Jason McGee

+ John Bruhling

+ Josh

+ Kris Nuttycombe

+ Marek

+ Michael Harms

+ Pacu 

+ Sean

+ Taylor Hornby

+ Teor

+ Yasser

+ Ying Tong

+ zerodartz

**Next Meeting Scheduled: 15:00 UTC January 11th 2023**

___
___
