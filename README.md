# TruffleStuff
Messing around with daps using Truffle and Docker

# References 

[Ganache/Truffle](https://trufflesuite.com/ganache/)

# tutorial references
[Developing Applications on Ethereum Blockchain](https://app.pluralsight.com/ilx/video-courses/975932a6-f99a-4c21-97ea-0353070a007d/38e080dd-7269-4f0b-b4f6-ce9ff1a911a3/bae019a9-8f3f-47fb-86b4-00b9073a484b) (pluralsight course)
[ReactRouter Tutorial](https://reactrouter.com/en/main/start/tutorial)

# Setup
Create the docker image by running the `buildImage.sh` script in the root `TruffleStuff` director:

```sh
./builImage.sh
```

This will create an alpine docker image with truffle and ganache installed

Run the `startGanache.sh` script in the `dapp/` directory

```sh
cd ./dapp/
./startGanache.sh
```

This will start an instance of the container and run the ganache process that will manage your blockchain.

*Note:* make sure to import the test key using the phrase specified in the `startGanache.sh` script. Using this prase, you can import the test key to your wallet and add a new network with an RPC URL of `http://127.0.0.1:8545`

In a separate terminal (or after altering the previous script to run ganache in the background by changing `docker run -it` to `docker run -d `), run the `attach.sh` script in the `dapp/` directory

```sh
cd ./dapp/
./attach.sh
```

This will attach your terminal to the running container.

When inside the container, run the following to move to the client directory and setup npm dependencies:

```sh
cd client
npm install
```

NOTE: There is an issue with installing dependancies when building the docker image. You may need to run the following if the previous command fails

```sh
apk add -t --no-cache git python g++ make
```

when the install command completes, you can host your app at `http://127.0.0.1:5173/` by running the following:

```sh
cd /home/node/app/clientNew/goals-client/
npm run dev
```

contracts are created in the `app/contracts/` folder and can be deployed by creating a migration in the sibling `migrations` folder and then running

```sh
truffle migrate
```
from the `app/` folder


