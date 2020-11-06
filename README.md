# slabbot [='ｘ'=]

<img align="left" src="./images/slabbot-icon.png" width="15%" height="15%"/>![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/andythepie/slabbot?include_prereleases&style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/andythepie/slabbot?style=flat-square)

an experimental discord bot with weird features that no one ever asked for.

powered by [**discord.js**](https://github.com/discordjs/discord.js) and [**akairo**](https://github.com/discord-akairo/discord-akairo).

-----

## features!!

- boring commands, like `ping` and `help`!

- a basic exp system! (see `me`)

- a command that `decide`s between things!

- really bad `despacito` videos!

...and that's it.

## how to run

download the repository, extract files, `npm install`, etc. you also need a mongodb database set up (by default, it connects to `mongodb://localhost:27017`.)

you will then need to make a `config.json` file in the base directory (where `index.js` is.) the structure of it should match something like this:

```json
{
    "token":"<insert token here>",
    "owner":"<insert discord id(s) here>"
}
```

then run `node .` in the directory where `index.js` is.

(extra note: it may or may not matter, but this is currently being developed on node.js v14.)

## contributing

*really not recommended.* that being said, if you *really* want to, you can always [write an issue](https://github.com/AndyThePie/slabbot/issues/new/choose) or submit a pull request (please make an issue beforehand if you're doing anything major)!
