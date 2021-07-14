import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Large site with ODB</title>
        <meta name="description" content="On-demand generation with Netlify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Features />
      <Testimonials />
      {/* <main className={styles.main}>
        <div>{data.map((product) => product.title)}</div>
      </main> */}
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://test.gasport.com.ng/API/OrderList");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
