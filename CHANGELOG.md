# slabbot changelog!
[ = ' x ' = ] :clock3:in terms of versioning numbers, the first number increases on some major milestone, the second number increases on a new feature/command, and the last number increments on any bug-fixes or any other minor things.

## ~~table of~~ contents

[upcoming (unreleased)](https://github.com/AndyThePie/slabbot/blob/master/CHANGELOG.md#upcoming-unreleased)

...

[0.2.0-indev "spaghetti edition"](#020-indev), released 29 september 2020

[0.1.1-indev "wait, it's all despacito?"](#011-indev), released 24 september 2020

[0.1.0-indev "this is so sad play despacito"](#010-indev), released 9 july 2020

## upcoming (unreleased)
...shh...

## 0.2.0-indev

> introducing spaghetti edition: now with 5000% more spaghetti!

**30 Sep 2020** / commit tba

A lot of very minor back-end things. And also a new command. And more Despacito.
...I should have named this one "wait, it's all despacito?" huh...

### + additions +

+ Added **6** new videos to `this is so sad play despacito`.
  + I'd list them, but I'm very lazy. 
  + ~~Turns out that some videos don't have `maxresdefault.jpg` thumbnails (and so, *Kiryu Coco - Despacito* has no thumbnail). I'll fix it it later.~~ I've fixed it by adding an override property for one thumbnail. If there's no `maxresdefault.jpg`, I'll use the `hqdefault.jpg` instead.
+ More errors! Attempting to send a NSFW video in a non-NSFW channel will return you an error, and so will choosing an out-of-bounds value.
+ Added `decide` command. ~~Feed~~ Give slabbot some things, separated by commas, and they'll choose a random one!
+ slabbot now has the prefix `sl `. (You can still use `slabbot` and mentions.)
+ More `README.md`s! and also hopefully slightly better.

### - removals -

- Removed dependencies `sqlite` and `sequelize` (and probably some more). I plan to use `mongoose`.
- Removed `slabbot-banner.png`, replaced with `slabbot-icon.png` (in the README). It looked bad.

### ~ other changes ~

- Fixed a typo + reworded a thing in `commandinfo.json` (used in the `help` command.)

### > code stuff <

- Now utilizing `eslint`. Because my code is bad.
- Turns out that you can set default values for properties (e.g. `constructor(a, b = true, c = 5);`). That's used *once* in `despacito.js`.

Anyways, that's a second number increment. I feel like it's deserved. New command and some other things. Next release should hopefully add MongoDB or some other things.

## 0.1.1-indev

> wait, it's all despacito?

**24 Sep 2020** / commit [`1cf341e`](https://github.com/AndyThePie/slabbot/commit/1cf341e87db451b733d187dc1b155755e2fc52e5)

Just a few small additions... because I can. I haven't practiced code in a long time, hopefully this brings me back ^^

### + additions +
+ added ["Despacitouhou" by Princess Sylvysprit](https://youtu.be/bMCkrXaXFCM) to `this is so sad play despacito`.
+ added ["Hentaicito" by DaymanIsOurSavior](https://youtu.be/Vn25uTGgYho) to `this is so sad play despacito`.
  + added `nsfw` property to videos in the array.
+ added cooldowns. default is 2000ms per command, `this is so sad play despacito` has a cooldown of 8000ms / 2 uses.
+ added the ability to choose a specific video from the `this is so sad play despacito`-list.
  + basically, typing a number after the command will return video with that position in the list. something like that.
  
### ~ other changes ~
- changed the `about` text by like one word

### > code stuff <
- refactored `despacito.js` a bit
  - holy moly that was disgusting to look at. hopefully this verson will be slightly less bad.

that's... it. pretty small, huh?

## 0.1.0-indev

> this is so sad play despacito

**9 Jul 2020** / commit [`cc84c74`](https://github.com/AndyThePie/slabbot/commit/cc84c74e18ff1ccb72b956ad25d4bc7db8fd8076)

![slabbot attacks!](./images/slabbot-0.1.0.png)

> what's that? a wild **slabbot** attacks!

another new discord bot. originally going to be a fork of [despacitoBot;](https://github.com/AndyThePie/despacitoBot-semicolon) but I disliked the old codebase too much. so here's this. built from the ground up using the [Akairo](https://discord-akairo.github.io/) framework for [discord.js](https://discord.js.org).
the bot is far from done, but... i wanted to get *something* done. so... here's something.

### + additions +
+ the basic commands - ping / about. 
  + ping can be executed using `slabbot ping`
  + about can be executed using `slabbot about`
+ this is so sad play despacito. stolen from despacitoBot, and then rewritten. gives a random despacito-related video using an embed.
  + executed using `this is so sad play despacito` (case insenstive) or `slabbot despacito`.

yeah, that's about it.

### things to do:

- [x] create `slabbot help` - in case people need to know commands.

> edit 29 sep 2020: oh yeah i did this in 0.1.1 lol

- [x] categorize commands, maybe

> edit 29 sep 2020: oh yeah i  also did this in 0.1.1 lol

- [ ] create some owner-related commands for rebooting / shutdown / reloading / etc
- [ ] a website or something
- [ ] ~~sql~~ mongodb stuff to track command usage

> future @AndyThePie here! not using sql, gonna be using mongodb + mongoose. why?... that's a question.
