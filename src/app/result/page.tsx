import { Button } from "@/components/Button/Button";
import { Layout } from "@/components/Layout/Layout";
import React from "react";
import styles from "./page.module.css";

const Page = ({ searchParams }: { searchParams: { wonSum: string } }) => {
  const wonSum = parseInt(searchParams.wonSum);

  return (
    <Layout withGradient={false}>
      <div className={styles.scoreContainer}>
        <p className={styles.totalScore}>Total score:</p>
        <h1 className={styles.title}>${wonSum.toLocaleString()} earned</h1>
      </div>
      <Button href="/">Try again</Button>
    </Layout>
  );
};

export default Page;
