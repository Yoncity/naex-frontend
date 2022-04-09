import Web3 from "web3";
import NAEX_NFT_ABI from "../constants/abi/nft.json";
import server from "./axios";
// import createAccount from "../redux/actions/account/createAccount";
// import updateAccount from "../redux/actions/account/updateAccount";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

class Web3Controller {
  web3: any;
  // @ts-ignore
  ethereum: any = window.ethereum;
  naexContract: any;

  supportedBrowser = this.ethereum ? true : false;

  BLOCKS: Array<Number> = [];

  constructor() {
    this.web3 = new Web3(this.ethereum);

    const contract = new this.web3.eth.Contract(NAEX_NFT_ABI, CONTRACT_ADDRESS);
    this.naexContract = contract;
  }

  async connectWallet(): Promise<string | undefined> {
    if (this.ethereum) {
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.address = accounts[0];
      return accounts[0];
    }
    return undefined;
  }

  async getContractBalance(): Promise<Number> {
    const balance = await this.naexContract.methods.contractBalance().call();
    return this.web3.utils.fromWei(balance, "ether");
  }

  convertFromWeiToEth = (balance: string) => {
    return Number(this.web3.utils.fromWei(balance, "ether")).toFixed(2);
  };

  mintToken(
    address: string,
    amount: string,
    name: string,
    description: string,
    image_url: string
  ) {
    const encoded = this.naexContract.methods
      .mint(Number(amount), name, description, image_url)
      .encodeABI();
    const tx = {
      from: address,
      to: CONTRACT_ADDRESS,
      data: encoded,
      nonce: "0x00",
      gas: "21000",
      masFeePerGas: "150000",
    };

    this.ethereum
      .request({ method: "eth_sendTransaction", params: [tx] })
      .then((transactionHash: string) => {})
      .catch((error: any) => console.log("🚀 --- mint token --- error", error));
  }

  isDuplicate(blockNumber: Number) {
    if (this.BLOCKS.includes(blockNumber)) return true;
    this.BLOCKS.push(blockNumber);
    return false;
  }

  listenToEvents(address: string) {
    console.log("\nEvent Listening Started.\n");

    this.naexContract.events.TokenMinted(
      { fromBlock: "latest", filter: { owner: [address] } },
      async (error: any, result: any) => {
        if (error) {
          console.log("🚀 --- listenToEvents --- error", error);
          return;
        }

        if (!this.isDuplicate(result.blockNumber)) {
          const data = {
            tokenId: result.returnValues.tokenId as number,
            amount: result.returnValues.amount as string,
            owner: String(result.returnValues.owner).toLowerCase(),
            name: result.returnValues.name,
            description: result.returnValues.description,
            image: result.returnValues.image_url,
            // blockNumber: result.blockNumber,
            // blockHash: result.blockHash,
            // signature: result.signature,
          };
          switch (result.event) {
            case "TokenMinted":
              const res = await server.post("/", data);
              const { status, message, data: resData } = res.data;
              if (status !== 201) {
                alert("Something went wrong with minting.");
                throw new Error(message);
              }
              alert("Minting successful.");
              break;
          }
        }
      }
    );
  }
}

export default Web3Controller;
