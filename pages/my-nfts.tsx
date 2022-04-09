import type { NextPage } from "next";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/MyNfts.module.css";
import { useEffect, useState } from "react";
import Web3Controller from "../helpers/Web3Controller";
import { useRouter } from "next/router";
import Header from "../components/Header";
import server from "../helpers/axios";

const MyNfts: NextPage = (props: any) => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [address, setAddress] = useState<string | null>(null);
  const [nfts, setNfts] = useState<Array<Record<string, any>>>([]);

  const router = useRouter();

  useEffect(() => {
    let _web3Controller: Web3Controller | null = new Web3Controller();
    if (!router.query.address) {
      router.push("/");
    }
    setAddress(router.query.address as string);
    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);
      _web3Controller = null;
    }

    getUserNfts();
  }, []);

  const getUserNfts = async () => {
    const res = await server.get(`/?owner=${router.query.address}`);

    const { status, message, data: resData } = res.data;

    if (status === 200) {
      setNfts(resData);
    } else {
      alert("Error fetching users NFTs");
    }
  };

  const loadNfts = () => {
    if (nfts && nfts.length > 0) {
      return nfts.map((item: Record<string, any>) => (
        <div className={styles.row}>
          <img src={item.image} alt="Nft image" width="256px" height="256px" />
          <p className={styles.nft_name}>{item.name}</p>
          <div className={styles.nft_price}>
            <Image
              src="/assets/icons/ethereum.svg"
              alt="Ethereum Icon"
              width={16}
              height={16}
            />
            <p className={styles.amount}>{item.amount} ETH</p>
          </div>
        </div>
      ));
    }
    return <p className={styles.no_nfts}>You have No NFTs</p>;
  };

  return (
    <div className={styles.container}>
      <div className={homeStyles.blur}></div>
      <Header
        active="my NFTs"
        address={address as string}
        total={nfts.length}
      />
      <div className={styles.nft_container}>{loadNfts()}</div>
    </div>
  );
};

export default MyNfts;
