# slabbot! [='x'=]

a discord bot with some weird features that nobody asked for.

## current status / where did everything go?

discord plans on making message content a privileged intent, which is kind of what the bot relies on to… well, find commands and respond to them. without it, the bot doesn't function. the alternative is slash commands, which is what discord seems to be pushing quite a bit. however, the framework i used (akairo) has no plans of supporting slash commands. so… i guess it's an excuse to rewrite everything from the ground up. by myself. because i'm a masochist.

### but wait, why rewrite everything?

because i want to see what i can do by myself. (i'm still using [discord.js](https://github.com/discordjs/discord.js), though, that won't change.)

### but what if i want to look at the old version?

look at the [`shattered-memories`](https://github.com/AndyThePie/slabbot/tree/shattered-memories) branch.

## alright, how do i run this thing?

assuming you have node.js already installed...

first, install dependencies. `npm i` in the root folder.  
next, you want to create a `config.json` in the root of this repository. should look something like:
```jsonc
{
	"token": // your bot token, as a string
}
```

after that? uhh…

for development, i recommend you use nodemon. just run `nodemon` in the root. otherwise…
```sh
npm run build  # or npx tsc, both work
node . 
```

## can i contribute?

given its current state, i'd ask that contribution stick to issues at the current moment. if you have any non-code pull requests, though, feel free to submit them!

### why is this readme in all lowercase?

because i like all lowercase. :3

