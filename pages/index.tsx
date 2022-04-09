import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import clientPromise from "../lib/mongodb";

const Home: NextPage = () => {
  return <div className={styles.container}></div>;
};

export async function getServerSideProps(context) {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    const client = await clientPromise;
    const db = client.db("test");
    //
    // Then you can execute queries against your database like so:
    const data = await db.collection("yoncity").find({}).toArray();

    console.log("====================================");
    console.log(data);
    console.log("====================================");

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default Home;
