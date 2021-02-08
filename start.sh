# this exists because i'm too lazy to type two commands.
RED='\e[31m'
BLU='\e[34m'
NC='\e[0m'

echo "${BLU}blu text to indicate the thing is starting up...${NC}"
mongod --dbpath=./data/ & sleep 5
echo "${BLU}aight, the database should be up now, now the bot...${NC}"
node .
echo "${RED}hey the bot died!${NC}"
