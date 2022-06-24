docker run -it --rm\
 --name dapp\
 --entrypoint 'ganache-cli'\
 --net host\
 -p 8080:8080\
 -p 8545:8545\
 -v $PWD/db:/home/node/db\
 -v $PWD/app:/home/node/app\
 mytruffle\
 --db /home/node/db --networkId 5116 --host 0.0.0.0


#docker run -it --rm\
#  --name dapp\
#  -v $PWD/db:/home/node/db\
#  -v $PWD/app:/home/node/app\
#  mytruffle\
