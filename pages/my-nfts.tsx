import type { NextPage } from "next";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/MyNfts.module.css";
import { useEffect, useState } from "react";
import Web3Controller from "../helpers/Web3Controller";
import Router, { useRouter } from "next/router";
import Header from "../components/Header";

const MyNfts: NextPage = (props: any) => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [address, setAddress] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let _web3Controller: Web3Controller | null = new Web3Controller();
    if (!router.query.address) {
      router.push("/");
    }
    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);
      _web3Controller = null;
    }
  }, []);

  // const redirectUserToProfile = () => {
  //   if (address) {
  //     router.push({
  //       pathname: "/my-nfts",
  //       query: {
  //         address,
  //       },
  //     });
  //   }
  // };

  // const authenticate = async (_web3Controller: Web3Controller) => {
  //   if (address) {
  //     redirectUserToProfile();
  //   } else {
  //     const mAddress = await _web3Controller.connectWallet();
  //     if (mAddress) {
  //       setAddress(mAddress);
  //       _web3Controller.listenToEvents(mAddress);
  //       redirectUserToProfile();
  //     }
  //   }
  // };

  // <button
  //       onClick={() => {
  //         web3Controller?.mintToken(address as string, 25, null);
  //       }}
  //     >
  //       Mint
  //     </button>

  return (
    <div className={styles.container}>
      <div className={homeStyles.blur}></div>
      <Header active="my NFTs" />
      <div className={styles.nft_container}>
        <div className={styles.row}>
          <Image
            src="/assets/boredape1.png"
            alt="Nft image"
            width={256}
            height={256}
          />
          <p className={styles.nft_name}>Bored Ape #1</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>0.025 ETH</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image
            src="/assets/boredape1.png"
            alt="Nft image"
            width={256}
            height={256}
          />
          <p className={styles.nft_name}>Bored Ape #1</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>0.025 ETH</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image
            src="/assets/boredape1.png"
            alt="Nft image"
            width={256}
            height={256}
          />
          <p className={styles.nft_name}>Bored Ape #1</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>0.025 ETH</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image
            src="/assets/boredape1.png"
            alt="Nft image"
            width={256}
            height={256}
          />
          <p className={styles.nft_name}>Bored Ape #1</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>0.025 ETH</p>
          </div>
        </div>

        <div className={styles.row}>
          <Image
            src="/assets/boredape1.png"
            alt="Nft image"
            width={256}
            height={256}
          />
          <p className={styles.nft_name}>Bored Ape #1</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>0.025 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNfts;
