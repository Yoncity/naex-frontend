import type { NextPage } from "next";
import Link from "next/link";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  address: string;
  active: string;
  total?: number;
};

const Header: NextPage<Props> = ({ address, active, total = 0 }) => {
  useEffect(() => {}, []);

  const router = useRouter();

  const isActive = (link: string) => (active === link ? style.active : "");

  //   <Link href={"/my-nfts"}>
  //   <a className={`${isActive("my NFTs")}`}>my NFTs</a>
  // </Link>
  // <Link href={"/mint"}>
  //   <a className={`${isActive("Mint")}`}>Mint</a>
  // </Link>
  // <Link href={"/lounge"}>
  //   <a className={`${isActive("Lounge")}`}>Lounge</a>
  // </Link>

  const redirect = (route: string) => {
    router.push(
      {
        pathname: route,
        query: {
          address,
        },
      },
      route
    );
  };

  return (
    <div className={style.header_container}>
      <div className={style.links}>
        <p
          className={`${isActive("my NFTs")}`}
          onClick={() => redirect("/my-nfts")}
        >
          my NFTs
        </p>
        <p className={`${isActive("Mint")}`} onClick={() => redirect("/mint")}>
          Mint
        </p>
        <p
          className={`${isActive("Lounge")}`}
          onClick={() => redirect("/lounge")}
        >
          Lounge
        </p>
      </div>
      {active === "my NFTs" && <p className={style.total}>Total: {total}</p>}
    </div>
  );
};

export default Header;
