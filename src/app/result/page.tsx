"use client";
import { Button } from "@/components/Button/Button";
import { Layout } from "@/components/Layout/Layout";
import React, { Suspense } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

const ResultContent = () => {
  const searchParams = useSearchParams();
  const wonSum = parseInt(searchParams.get("wonSum") ?? "0");

  return (
    <div className={styles.scoreContainer}>
      <p className={styles.totalScore}>Total score:</p>
      <h1 className={styles.title}>${wonSum.toLocaleString()} earned</h1>
    </div>
  );
};

const ResultPage = () => {
  return (
    <Layout withGradient={false}>
      <Suspense>
        <ResultContent />
      </Suspense>
      <Button href="/">Try again</Button>
    </Layout>
  );
};

export default ResultPage;
