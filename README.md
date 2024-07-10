# TruffleStuff
Messing around with daps using Truffle and Docker

# References 

[Ganache/Truffle](https://trufflesuite.com/ganache/)


# Setup
Create the docker image by running the `buildImage.sh` script in the root `TruffleStuff` director:

```sh
./builImage.sh
```

This will create an alpine docker image with truffle and ganache installed

Run the `startGanache.sh` script in the `dapp/` directory

```sh
./dapp/startGanache.sh
```

This will start an instance of the container and run the ganache process that will manage your blockchain.

In a separate terminal (or after altering the previous script to run ganache in the background by changing `docker run -it` to `docker run -d `), run the `attach.sh` script in the `dapp/` directory

```sh
./dapp/attach.sh
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

when the install command completes, you can host your app at `http://127.0.0.1:3000/` by running the following:

```sh
npm start
```
