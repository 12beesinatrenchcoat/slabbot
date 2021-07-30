<img align="left" height="256px" src="./images/slabbot-icon.png"/> 

# slabbot [= ' x ' =]

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/andythepie/slabbot?include_prereleases&style=flat-square)](https://github.com/AndyThePie/slabbot/releases) 
[![GitHub last commit](https://img.shields.io/github/last-commit/andythepie/slabbot?style=flat-square)](https://github.com/AndyThePie/slabbot/commit/master) 
![GitHub repo size](https://img.shields.io/github/repo-size/AndyThePie/slabbot?style=flat-square) 
![XO code style](https://flat.badgen.net/badge/code%20style/XO/cyan)
![Badge count](https://img.shields.io/badge/badges-5%20%28too%20many,%20let's%20be%20honest%29-informational?style=flat-square)

an experimental discord bot with weird features that no one ever asked for.

powered by [**discord.js**](https://github.com/discordjs/discord.js) and [**akairo**](https://github.com/discord-akairo/discord-akairo).

-----

# important notice

with discord [deprecating message content access](https://support-dev.discord.com/hc/en-us/articles/4404772028055) (it is becoming a privileged intent), this bot is being rewritten from the ground up. **this branch is an old branch from before the rewrite. it will not be further developed nor maintained, and exists here as an archive.**

that's about all. original readme is as follows. <3

## features!

- `roll` some dice...
- let slabbot `decide` between things when you can't~
- > this is so sad play despacito
- get an `osu`! player's stats
- there's an exp system, i guess.

see [commandinfo.json](commandInfo.json) or the [commands folder](/commands) for more info.

## how to run...

zeroth, get [node.js](https://nodejs.org/en/download/). (i currently use v16.2.0.)

then first, set up mongodb. see mongodb's documentation on [mongod](https://docs.mongodb.com/manual/reference/program/mongod/).   
by default, mongoose attempts to connect to `mongodb://localhost:27017`, although this can be changed in [index.js](index.js).

after that, clone/download the repository, install packages (run `npm ci` in your terminal).

you will then need to make a `config.json` file in the base directory (where `index.js` is.) it currently looks like this:

```jsonc
{
    "token": // your discord bot's token goes here
    "owner": // your discord id goes here, allows you to run ownerOnly commands

    "osu":{
        "id": // client id, as number
        "secret": // client secret.
    }
}
```

after all of that, start it up! (run `node .` in the directory where `index.js` is.)

## contributing

if you'd really like to, sure! [bug reports](https://github.com/AndyThePie/slabbot/issues/new?assignees=&labels=bug&template=bug_report.md&title=) and [feature requests](https://github.com/AndyThePie/slabbot/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=) are always welcome. if you want to fix something,  pull requests are also accepted! (although, if you're adding something and/or doing anything major, please open an issue before!)
