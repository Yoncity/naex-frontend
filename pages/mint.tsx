import type { NextPage } from "next";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Mint.module.css";
import { useEffect, useState } from "react";
import Web3Controller from "../helpers/Web3Controller";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Mint: NextPage = (props: any) => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [address, setAddress] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

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

  const handleInputChange = ({ target: { name, value } }: any) => {
    form[name] = value;
    setForm(form);
  };

  const handleSubmit = () => {
    if (form.name && form.description && form.amount && form.image_url) {
      web3Controller?.mintToken(
        address as string,
        form.amount,
        form.name,
        form.description,
        form.image_url
      );
      alert("Minting started.");
      setForm({});
      return;
    }
    alert("Please fill out all the forms.");
  };

  return (
    <div className={styles.container}>
      <div className={homeStyles.blur}></div>
      <Header active="Mint" address={address as string} />

      <div className={styles.input_fields_container}>
        <input
          className={styles.input_field}
          type="text"
          name="name"
          onChange={handleInputChange}
          placeholder="Name"
          value={form.name}
        />
        <input
          className={styles.input_field}
          type="text"
          name="description"
          onChange={handleInputChange}
          placeholder="Description"
          value={form.description}
        />
        <input
          className={styles.input_field}
          type="text"
          name="amount"
          onChange={handleInputChange}
          placeholder="Amount"
          value={form.amount}
        />
        <input
          className={styles.input_field}
          type="text"
          name="image_url"
          onChange={handleInputChange}
          placeholder="Image URL"
          value={form.image_url}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Mint awaaay...
        </button>
      </div>
    </div>
  );
};

export default Mint;
