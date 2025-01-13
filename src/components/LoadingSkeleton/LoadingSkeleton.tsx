import React from "react";
import styles from "./loadingSkeleton.module.css";

interface LoadingSkeletonProps {
  optionsCount?: number;
}

const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ optionsCount = 4 }, ref) => (
    <div ref={ref} className={styles.skeletonContainer}>
      <div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
      <div className={styles.optionsGrid}>
        {Array.from({ length: optionsCount }).map((_, i) => (
          <div
            key={i}
            className={`${styles.optionSkeleton} ${styles.skeleton}`}
          />
        ))}
      </div>
    </div>
  )
);

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;
