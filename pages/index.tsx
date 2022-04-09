import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";
import Web3Controller from "../helpers/Web3Controller";
import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [address, setAddress] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let _web3Controller: Web3Controller | null = new Web3Controller();

    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);
      _web3Controller = null;
    }
  }, []);

  // const redirectUserToProfile = () => {
  //   // router.push(
  //   //   {
  //   //     pathname: "/my-nfts",
  //   //     query: {
  //   //       address,
  //   //     },
  //   //   },
  //   //   "/my-nfts"
  //   // );
  //   // if (address) {
  //   // }
  // };

  const authenticate = async (_web3Controller: Web3Controller) => {
    if (address) {
      router.push(
        {
          pathname: "/my-nfts",
          query: {
            address,
          },
        },
        "/my-nfts"
      );
    } else {
      const mAddress = await _web3Controller.connectWallet();
      if (mAddress) {
        setAddress(mAddress);
        _web3Controller.listenToEvents(mAddress);
        router.push(
          {
            pathname: "/my-nfts",
            query: {
              address: mAddress,
            },
          },
          "my-nfts"
        );
      }
    }
  };

  // <button
  //       onClick={() => {
  //         web3Controller?.mintToken(address as string, 25, null);
  //       }}
  //     >
  //       Mint
  //     </button>

  return (
    <div className={styles.container}>
      <div className={styles.blur}></div>
      <div className={styles.title}>
        <p>Welcome to</p>
        <p className={styles.name}>NAEX NFT</p>
      </div>

      <button
        className={styles.button}
        onClick={() => {
          if (!address) authenticate(web3Controller as Web3Controller);
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   try {
//     // await clientPromise
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
//     //
//     const client = await clientPromise;
//     const db = client.db("test");
//     //
//     // Then you can execute queries against your database like so:
//     const data = await db.collection("yoncity").find({}).toArray();

//     return {
//       props: { isConnected: true },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// }

export default Home;
