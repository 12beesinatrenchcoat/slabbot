# slabbot changelog!
[ = ' x ' = ] :clock3:in terms of versioning numbers, the first number increases on some major milestone, the second number increases on a new feature/command, and the last number increments on any bug-fixes or any other minor things.

## ~~table of~~ contents

[upcoming (unreleased)](https://github.com/AndyThePie/slabbot/blob/master/CHANGELOG.md#upcoming-unreleased)

...

[0.1.1-indev "wait, it's all despacito?"](##0.1.1-indev), released 24 september 2020

[0.1.0-indev "this is so sad play despacito"](##0.1.0-indev), released 9 july 2020

## upcoming (unreleased)
...shh...

## 0.1.1-indev

> wait, it's all despacito?

**24 Sep 2020** / commit 1cf341e87db451b733d187dc1b155755e2fc52e5

Just a few small additions... because I can. I haven't practiced code in a long time, hopefully this brings me back ^^

### + additions +
+ added ["Despacitouhou" by Princess Sylvysprit](https://youtu.be/bMCkrXaXFCM) to `this is so sad play despacito`.
+ added the ability to choose a specific video from the `this is so sad play despacito`-list.
  + basically, typing a number after the command will return video with that position in the list. something like that.

### dev stuff
- refactored `despacito.js` a bit
  - holy moly that was disgusting to look at. hopefully this verson will be slightly less bad.

that's... it. pretty small, huh?

## 0.1.0-indev

> this is so sad play despacito

**9 Jul 2020** / commit cc84c74e18ff1ccb72b956ad25d4bc7db8fd8076

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

- [ ] create `slabbot help` - in case people need to know commands.
- [ ] categorize commands, maybe
- [ ] create some owner-related commands for rebooting / shutdown / reloading / etc
- [ ] a website or something
- [ ] ~~sql~~ mongodb stuff to track command usage

> future @AndyThePie here! not using sql, gonna be using mongodb + mongoose. why?... that's a question.