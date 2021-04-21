# slabbot [='ｘ'=]

<img align="left" src="./images/slabbot-icon.png" width="15%" height="15%"/> [![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/andythepie/slabbot?include_prereleases&style=flat-square)](https://github.com/AndyThePie/slabbot/releases) [![GitHub last commit](https://img.shields.io/github/last-commit/andythepie/slabbot?style=flat-square)](https://github.com/AndyThePie/slabbot/commit/master) ![Manually updated badge count (<3 Shields.io!)](https://img.shields.io/badge/badges-%203,%20i%20guess-informational?style=flat-square)

an experimental discord bot with weird features that no one ever asked for.

powered by [**discord.js**](https://github.com/discordjs/discord.js) and [**akairo**](https://github.com/discord-akairo/discord-akairo).

-----

## features!!

- boring commands, like `ping` and `help`!

- a basic exp system! (see `me`)

- a command that `decide`s between things!

- really bad `despacito` videos!

...and some other underwhelming things. see [commandinfo.json](https://github.com/AndyThePie/slabbot/blob/master/commands/meta/commandinfo.json) for everything.

## how to run

download the repository, extract files, `npm install`, etc. you also need a mongodb database set up (by default, it connects to `mongodb://localhost:27017`.)

you will then need to make a `config.json` file in the base directory (where `index.js` is.) it currently looks something like this:

```jsonc
{
    "token": "your discord bot's token goes here",
    "owner": "your discord id goes here, allows you to run shutdown",

    "osu":{
        "id": "client id, as number",
        "secret": "client secret."
    }
}
```

then run `node .` in the directory where `index.js` is.

(extra note: currently being developed on node.js v14.)

## contributing

if you *really* want to put yourself through it, sure! [write an issue](https://github.com/AndyThePie/slabbot/issues/new/choose) or submit a pull request (please make an issue beforehand if you're doing anything major)!
