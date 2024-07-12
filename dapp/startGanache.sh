docker run -it --rm\
 --name dapp\
 --entrypoint 'ganache-cli'\
 --net host\
 --platform linux/x86_64\
 -p 8080:8080\
 -p 8545:8545\
 -v $PWD/db:/home/node/db\
 -v $PWD/app:/home/node/app\
 mytruffle\
 --db /home/node/db --networkId 5116 --host 0.0.0.0 -m 'avocado stem wage easy cash gap melt job reflect will work recycle'
