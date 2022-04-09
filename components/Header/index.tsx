import type { NextPage } from "next";
import style from "./index.module.scss";
import { useEffect, useState } from "react";

const Header: NextPage = ({ active, total = 0 }: any) => {
  useEffect(() => {}, []);

  const isActive = (link: string) => (active === link ? style.active : "");

  return (
    <div className={style.header_container}>
      <div className={style.links}>
        <p className={`${isActive("my NFTs")}`}>my NFTs</p>
        <p className={`${isActive("Mint")}`}>Mint</p>
        <p className={`${isActive("Lounge")}`}>Lounge</p>
      </div>
      <p className={style.total}>Total: {total}</p>
    </div>
  );
};

export default Header;
