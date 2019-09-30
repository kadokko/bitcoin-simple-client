# Bitcoin Simple Client (regtest only)

This tool makes it easy to create a Bitcoin transaction with a GUI.

It works with Bitcoin daemon in the regtest environment.

It makes testing Bitcoin Script easier.


## Motivation

When trying to test the Bitcoin Script program, you also need to create a transaction that includes it.
If you are not familiar with it, it will take some time.
This tool may help to improve such situations.

Also it will be easier to test script programs which use timelocks,
because you can test the scripts by actually running them in the Bitcoin regtest environment.


## Requirements

* Vagrant

* Bitcoin Core 18 (regtest)

Bitcoin regtest environment is required to use this application.
You can use [this environment](https://github.com/kadokko/env-multi-bitcoind).


## Usage

* How to setup

```sh
git clone https://github.com/kadokko/bitcoin-simple-client.git

cd bitcoin-simple-client
vagrant up
vagrant ssh

cd /vagrant_share
./setup.sh
```

* How to run

```
./start.sh
```

* How to use

```
http://192.168.33.14:3000
```

## Licence

This project is under MIT License.
