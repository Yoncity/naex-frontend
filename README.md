# NAEX

Naex is an NFT wallet, where you mint and view all your available nfts.

Any user can connect their wallet using `Metamask` and is presented with a list of all their NFT and is given the option to mint for a new NFT.

## How to run

- This project uses `mongoDB`, so you will need to download, and run the mongodb server.
- Next create a `.env` file using the `.env.example` provided in the root of the codebase.
- Provide the necessary links in the `.env`
  - the mongoDB uri
  - deployed contract address i.e. you can deploy locally in your machine and provide the contract address here.
  - backend api link
- Get the deployed contract's `abi` and place it in the `contants/abi/nft.json`, and you are good to go.
- Run `yarn dev`

### Screenshots

<img width="1512" alt="Screen Shot 2022-04-10 at 00 47 11" src="https://user-images.githubusercontent.com/37688326/162593052-7d490c92-7ecc-4e95-9ad6-97fa18c50245.png">
<img width="1512" alt="Screen Shot 2022-04-10 at 00 49 35" src="https://user-images.githubusercontent.com/37688326/162593055-ae55bce2-d142-48d0-99d4-0ae80d5433fb.png">
<img width="1512" alt="Screen Shot 2022-04-10 at 00 49 41" src="https://user-images.githubusercontent.com/37688326/162593056-eaf7f719-3e3a-409e-b204-ddfdfe1e0cf2.png">
