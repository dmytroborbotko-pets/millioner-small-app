import React from "react";
import styles from "../LoadingSkeleton/loadingSkeleton.module.css";
import MoneyItem from "./MoneyItem";

interface MoneyItemSkeletonProps {
  classNameContainer?: string;
  classNameSpan?: string;
}

const MoneyItemSkeleton: React.FC<MoneyItemSkeletonProps> = ({
  classNameContainer,
  classNameSpan,
}) => (
  <MoneyItem>
    <div className={`${classNameContainer}`}>
      <span
        className={`${classNameSpan} ${styles.skeleton}`}
        style={{ width: "100px", height: "24px" }}
      />
    </div>
  </MoneyItem>
);

export default MoneyItemSkeleton;
