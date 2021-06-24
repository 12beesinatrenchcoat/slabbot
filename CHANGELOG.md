# slabbot changelog

[ = ' x ' = ] :clock3: in terms of versioning numbers, the first number increases on some major milestone, the second number increases on a new feature/command, and the last number increments on any bug-fixes or any other minor things.

## ~~table of~~ contents

[0.4.1-indev "whoops"](#041-indev), released 27 may 2021

[0.4.0-indev "pro gamer move"](#040-indev), released 27 may 2021

[0.3.0-indev "await, mongoose!"](#030-indev), released 7 november 2020

[0.2.0-indev "spaghetti edition"](#020-indev), released 29 september 2020

[0.1.1-indev "wait, it's all despacito?"](#011-indev), released 24 september 2020

[0.1.0-indev "this is so sad play despacito"](#010-indev), released 9 july 2020

-----

## unreleased
> please hold!

### code stuff
- **now using [xo](https://github.com/xojs/xo) code style.**
  - with a few exceptions:
    - strings still use double quotes (unless you have to use them in the string).
    - comments don't have to be capitalized (too professional!)
      - todo comments don't return warnings, we have a github bot for that.
    - no radix needed in `randInt()` (i only use decimal numbers...)
- functions in `things.functions.js` are no longer named
  - felt a tad redundant when they were called by their export names...
- renamed `commandinfo.json` to `commandInfo.json`, and moved to root directory.
  - and also using `require.main.require`, because it's cleaner.

## 0.4.1-indev

**27 May 2021** / commit [`41f150d`](https://github.com/AndyThePie/slabbot/commit41f150dc27199f774552a3e732c2b7efd4571c82)

:fire: a hotfix because i forgot about two files!

### >_< fixes

- `sl decide` is now in the "utilities" category. (as opposed to the "utilties" category)
- `sl dice` has help info now.

that's it. that's literally it.

## 0.4.0-indev

> “I'll probably end up abandoning this again for another month.”  
\- Me, 6 months ago

**27 May 2021** / commit [`065ef89`](https://github.com/AndyThePie/slabbot/commit/065ef89e7493824246b07a8fe490dee297267d42)

this version focused on some game stuff, i guess. it's been so long that i don't really even remember this... (>_<)

### + additions

- **get `osu`! user stats!**
  - you can get a user's [osu!](https://osu.ppy.sh) stats with this command.
  - defaults to the user's default mode.
    - specific modes can also be specified (`osu!taiko`, `osu!catch`, `osu!mania`, or just `osu!`.)
  - w00t p00t :3
  - and just in case, no, i am not affiliated with the osu!team.
- **roll some `dice`!**
  - because... why not?
- fancier `about` command.
  - links now exist, the description's been changed, and there's also a version thing. 
    - current uptime is also fancier.
- slabbot has a [website](https://andythepie.github.io/slabbot)?
  - well, not really. it's just the `README` for now. watch this space, though...
- `decide` command can now also be invoked with the alias `choose`.
- `shutdown` command posts a message *before* it shuts down.

### ~ other changes
- **xp gain has been nerfed, and level thresholds are higher.**
  - levels may have been lost as well, the exp/level calculation has also slightly changed. 
  ```js 
  // const expNeededForLevel = level => 1024*(level**1.3)+(level/35)**4.5;
  const expNeededForLevel = level => 1024 * (level ** 1.3) + (256 *((level-1) / 8) ** 1.8);
  ```
  - exp per message is also lower.
    - 2.4exp at 6000ms, increasing to 9exp at 30000ms. 
    - previously 5exp at 5000ms, increasing to 25exp at 60000ms.
    - see also: desmos graphs for the [old exp/message graph](https://www.desmos.com/calculator/pzw6sryjnm) and the [new one](https://www.desmos.com/calculator/pci07ccizk).
- a new `things.functions.js` for functions that do things that i'll probably use in multiple commands.
  - `createExpBar` has been moved here (from `sl me` command).
    - so has `expNeededForLevel`.
  - `fNum` formats numbers (adds commas and decimals).
  - `sToDhms` converts seconds to other units (used in `sl about`)
  - `getLongMonth` gets month name from a `Date`.
  - **`returnError` standardizes error embeds, I guess.**
    - not yet used everywhere else... yet.

i think...? that's all. it's been fun to write these and get back into code and all the sort. it's summer as well... oh boy... 

next update will focus on refactors and code cleanups and documentation and all the sort. so... see you then! (^^)/

-----

## 0.3.0-indev

> await. can you type that again? i can't base my assumptions on this mongoose you've given me.
> (where did you even get this mongoose?)

**7 Nov 2020** / commit [`595086a`](https://github.com/AndyThePie/slabbot/commit/595086a66b7e12262f2e321335832dc6fa47443c)

The biggest update since... well, the last update.

### + additions

- **`slabbot me` is now a thing!**
  - A basic exp system. Some exp per message.
    - You get exp for each message, with a cooldown of 5 seconds.
    - The amount of exp you get depends on the last time you sent a message.
      - *look at [this graph](https://www.desmos.com/calculator/rs1k8grtc9)*
  - Also tracking command usage. Stats are cool.
    - Oh yeah, and now a MongoDB instance is required. Defaults to connecting to `mongodb://localhost:27017`.
- **`slabbot about` is better.**
  - Displays some stats (commands used, top commands)
  - Uses an embed now. Hopefully looks a bit nicer.
- `slabbot shutdown` does what it says on the tin.
  - This is an owner only command - only runs if the user's ID is in `config.json`.

### ~ other changes

- The cooldown message now displays cooldowns in seconds. (3642ms → 3.64s)
- **Some commands now have much longer cooldowns:**
  - `me` has a rate limit of 2 uses / 30s
  - `about` has a rate limit of 1 use / 30s
- More general code cleanup. Mostly removed some `console.log()` stuff.

It's been a long, *long* time since the last update, but... I think I'm starting to get the hang of some of this stuff. So... that's cool!
As always, never expect any updates, because I'll probably end up abandoning this again for another month. Or something like that.

Thank you for following development of `slabbot`!

-----

## 0.2.0-indev

> introducing spaghetti edition: now with 5000% more spaghetti!

**30 Sep 2020** / commit [`9a77213`](https://github.com/AndyThePie/slabbot/commit/9a77213a6628f04f44e29011c5b43681b48efc33)

A lot of very minor back-end things. And also a new command. And more Despacito.
...I should have named this one "wait, it's all despacito?" huh...

### + additions

- Added **6** new videos to `this is so sad play despacito`.
  - I'd list them, but I'm very lazy.
  - ~~Turns out that some videos don't have `maxresdefault.jpg` thumbnails (and so, *Kiryu Coco - Despacito* has no thumbnail). I'll fix it it later.~~ I've fixed it by adding an override property for one thumbnail. If there's no `maxresdefault.jpg`, I'll use the `hqdefault.jpg` instead.
- More errors! Attempting to send a NSFW video in a non-NSFW channel will return you an error, and so will choosing an out-of-bounds value.
- Added `decide` command. ~~Feed~~ Give slabbot some things, separated by commas, and they'll choose a random one!
- slabbot now has the prefix `sl`. (You can still use `slabbot` and mentions.)
- More `README.md`s! and also hopefully slightly better.

### − removals

- Removed dependencies `sqlite` and `sequelize` (and probably some more). I plan to use `mongoose`.
- Removed `slabbot-banner.png`, replaced with `slabbot-icon.png` (in the README). It looked bad.

### ~ other changes

- Fixed a typo + reworded a thing in `commandinfo.json` (used in the `help` command.)

### < code stuff >

- Now utilizing `eslint`. Because my code is bad.
- Turns out that you can set default values for properties (e.g. `constructor(a, b = true, c = 5);`). That's used *once* in `despacito.js`.

Anyways, that's a second number increment. I feel like it's deserved. New command and some other things. Next release should hopefully add MongoDB or some other things.

-----

## 0.1.1-indev

> wait, it's all despacito?

**24 Sep 2020** / commit [`1cf341e`](https://github.com/AndyThePie/slabbot/commit/1cf341e87db451b733d187dc1b155755e2fc52e5)

Just a few small additions... because I can. I haven't practiced code in a long time, hopefully this brings me back ^^

### + additions

- added ["Despacitouhou" by Princess Sylvysprit](https://youtu.be/bMCkrXaXFCM) to `this is so sad play despacito`.
- added ["Hentaicito" by DaymanIsOurSavior](https://youtu.be/Vn25uTGgYho) to `this is so sad play despacito`.
  - added `nsfw` property to videos in the array.
- added cooldowns. default is 2000ms per command, `this is so sad play despacito` has a cooldown of 8000ms / 2 uses.
- added the ability to choose a specific video from the `this is so sad play despacito`-list.
  - basically, typing a number after the command will return video with that position in the list. something like that.
### ~ other changes

- changed the `about` text by like one word

### < code stuff >

- refactored `despacito.js` a bit
  - holy moly that was disgusting to look at. hopefully this verson will be slightly less bad.

that's... it. pretty small, huh?

-----

## 0.1.0-indev

> this is so sad play despacito

**9 Jul 2020** / commit [`cc84c74`](https://github.com/AndyThePie/slabbot/commit/cc84c74e18ff1ccb72b956ad25d4bc7db8fd8076)

![slabbot attacks!](./images/slabbot-0.1.0.png)

> what's that? a wild **slabbot** attacks!

another new discord bot. originally going to be a fork of [despacitoBot;](https://github.com/AndyThePie/despacitoBot-semicolon) but I disliked the old codebase too much. so here's this. built from the ground up using the [Akairo](https://discord-akairo.github.io/) framework for [discord.js](https://discord.js.org).
the bot is far from done, but... i wanted to get *something* done. so... here's something.

### + additions

- the basic commands - ping / about.
  - ping can be executed using `slabbot ping`
  - about can be executed using `slabbot about`
- this is so sad play despacito. stolen from despacitoBot, and then rewritten. gives a random despacito-related video using an embed.
  - executed using `this is so sad play despacito` (case insenstive) or `slabbot despacito`.

yeah, that's about it.

### things to do

- [x] create `slabbot help` - in case people need to know commands.

> edit 29 sep 2020: oh yeah i did this in 0.1.1 lol

- [x] categorize commands, maybe

> edit 29 sep 2020: oh yeah i  also did this in 0.1.1 lol

- [x] create some owner-related commands for rebooting / shutdown / reloading / etc
- [x] ~~sql~~ mongodb stuff to track command usage

> future @AndyThePie here! not using sql, gonna be using mongodb + mongoose. why?... that's a question.

> v0.3.0 did some things. (7 nov 2020)

- [ ] a website or something

> i'll do this for v0.4.0. (7 nov 2020)

