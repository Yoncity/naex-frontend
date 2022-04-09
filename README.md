# NAEX

Naex is an NFT wallet, where you mint and view all your available nfts.

Any user can connect their wallet using `Metamask` and is presented with a list of all their NFT and is given the option to mint for a new NFT.

### Screenshots

## How to run

- This project uses `mongoDB`, so you will need to download, and run the mongodb server.
- Next create a `.env` file using the `.env.example` provided in the root of the codebase.
- Provide the necessary links in the `.env`
  - the mongoDB uri
  - deployed contract address i.e. you can deploy locally in your machine and provide the contract address here.
  - backend api link
- Get the deployed contract's `abi` and place it in the `contants/abi/nft.json`, and you are good to go.
- Run `yarn dev`
