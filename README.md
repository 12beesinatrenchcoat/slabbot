# slabbot
another discord bot with features no one asked for

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/12beesinatrenchcoat/slabbot?include_prereleases&style=flat-square)](https://github.com/12beesinatrenchcoat/slabbot/releases)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/12beesinatrenchcoat/slabbot?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/12beesinatrenchcoat/slabbot?style=flat-square)
[![XO code style](https://flat.badgen.net/badge/code%20style/XO-ish/cyan)](.eslintrc.json)

## current features
- A meaningless exp system!
- Outdated Despacito!
- [osu!](https://osu.ppy.sh) profile fetching!
- Dice rolling!

# running
slabbot uses the [`pnpm`](https://pnpm.io/) package manager, go install that (`npm` *might* work? No promises, though.)

slabbot is also built on [node.js](https://nodejs.org) v18.x (v18.4.0 as of writing).

Install dependencies with `pnpm i` and then build with `pnpm build` (or `pnpm tsc`).

Create a .env file with `pnpm run setup` (see [setup.js](/setup.js)). You can also fill this out if you'd like:
```sh
# Discord (https://discord.com/developers/applications)
DISCORD_TOKEN= # required for bot to functi:won
CLIENT_ID= # required to deploy commands
GUILD_ID= # deploying commands to testing guild

# MongoDB - used for stats (/slabbot and exp)
MONGO_URL=

# osu! (https://osu.ppy.sh/home/account/edit#oauth) -
OSU_ID=
OSU_SECRET=
```

Run with `pnpm dev` or `pnpm start`.

## old version
There is an old version of slabbot in the [`shattered-memories`](https://github.com/12beesinatrenchcoat/slabbot/tree/shattered-memories) branch that used the Akairo Framework. This has been abandoned since [Discord announced they would make message content a Privileged Intent](https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ#:~:text=On%20August%2031%2C%202022%2C%20access%20to%20message%20content,than%2075%20servers%20are%20not%20affected%20at%20all.) (see [#48](https://github.com/12beesinatrenchcoat/slabbot/issues/48)).

It's still there if you want it! Wouldn't recommend it, though.

# license
[AGPLv3](LICENSE.txt).

## credit where credit is due
A lot of code involving command handling “inspired by” (read: stolen from) [Naval-Base/yuudachi](https://github.com/Naval-Base/yuudachi). Slabbot is under the AGPL for that reason.
