# CypherQL - a GraphQL implementation for reading the Cypher System SRD

## Introduction

This is a GraphQL server that serves up data from the Cypher System SRD. The initial schema was defined by the user @fva on the Cypher Unlimited Discord server. The data is taken from the excellent [Cypher-System-JSON-DB](https://github.com/Jon-Davis/Cypher-System-JSON-DB).

## Requirements

*It Works on My Machine™️*

All you should require on your machine is NodeJS. I have tested it again Node 18.16.0, feel free to try it against other versions and let me know.

## Cloning the Repo

**IMPORTANT**: This module uses a git submodule to bring in the json data. A straight clone of the repo **WILL NOT WORK**.

To clone this repo and get all the code correct, do:

```
git clone --recurse-submodules https://github.com/christav/cypherql
```

If you've already cloned the repo without using the `--recurse-submodules` flag, instead run these two commands in your working directory:

```
git submodule init
git submodule update
```

After doing one of those commands, check if you have the `CSRD.json` file in the `src/Cypher-System-JSON-DB` directory. If not, double check your submodule is set up correctly.

## Running the Code

Run `npm run start:dev` to bring up the server locally. This is running under `nodemon`, so will automatically restart if you change the files.

If you want to run it outside of `nodemon`, you can run `npm run build` and then run `node build/src/index.js`. The intention is to eventually dockerize this to make it easier to deploy, but this is just a fun side project for now.
