import React from "react";
import styles from "./layout.module.css";
import ThumbsUp from "@/images/thumbsUp/ThumbsUp";

interface LayoutProps {
  withGradient: boolean;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, withGradient }) => {
  return (
    <div
      className={`${styles.page} ${
        withGradient ? styles.pageWithGradient : ""
      }`}
    >
      <div className={styles.wrapper}>
        <ThumbsUp />
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};
