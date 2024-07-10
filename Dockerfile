FROM node:15-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

#COPY . .

RUN apk add -t .gyp --no-cache git python g++ make &&\
    npm install -g truffle ganache-cli &&\
    npm install &&\
    apk del .gyp

ENTRYPOINT [ "/bin/sh" ]
#CMD [ "./entry.sh" ]









#FROM debian

#run apt update\
# && apt upgrade -y


#run apt-get -y install curl git vim build-essential

#run apt-get install -y curl software-properties-common\
# && curl -sL https://deb.nodesource.com/setup_14.x | bash -\
# && apt-get install -y nodejs

#run npm install -g truffle\
# && npm install -g ganache-cli








#run apt install -y curl

#run apt install -y software-properties-common\
# && apt update -y\
# && add-apt-repository ppa:deadsnakes/ppa

#run curl -sL https://deb.nodesource.com/setup_lts.x | bash -\
# && apt install -y nodejs bash curl gcc g++ make python3\.6 gpg\
# && npm install ganache --global

