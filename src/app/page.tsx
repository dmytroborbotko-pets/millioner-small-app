import { Button } from "@/components/Button/Button";
import styles from "./page.module.css";
import { Layout } from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout withGradient={true}>
      <h1 className={styles.title}>Who wants to be a millionaire?</h1>
      <Button href="/game">Start</Button>
    </Layout>
  );
}
