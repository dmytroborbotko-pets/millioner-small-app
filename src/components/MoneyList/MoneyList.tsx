import React, { memo } from "react";
import styles from "../../app/game/page.module.css";
import MoneyItem from "./MoneyItem";
import MoneyItemSkeleton from "./MoneyItemSkeleton";
import { useMoneyListScroll } from "../../hooks/useMoneyListScroll";
import { WinningSum } from "@/types";

interface MoneyListProps {
  winningSums: WinningSum[];
  currentQuestionId: number;
  loading?: boolean;
}

const MoneyList: React.FC<MoneyListProps> = memo(
  ({ winningSums, currentQuestionId, loading = false }) => {
    const moneyContainerRef = useMoneyListScroll();

    const getMoneyItemColor = (sumLevel: number) => {
      if (sumLevel === currentQuestionId) return "var(--color-orange)";
      if (sumLevel < currentQuestionId) return "var(--color-gray)";
      return undefined;
    };

    const skeletonCount = winningSums.length || 12;

    return (
      <div className={styles.moneyContainer} ref={moneyContainerRef}>
        <div className={styles.winningsList}>
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <MoneyItemSkeleton
                  key={index}
                  classNameContainer={styles.moneyItem}
                  classNameSpan={styles.moneyAmount}
                />
              ))
            : [...winningSums].reverse().map((sum) => (
                <MoneyItem
                  key={sum.level}
                  strokeColor={getMoneyItemColor(sum.level)}
                >
                  <div className={styles.moneyItem}>
                    <span
                      className={styles.moneyAmount}
                      style={{
                        color: getMoneyItemColor(sum.level),
                      }}
                    >
                      ${sum.amount.toLocaleString()}
                    </span>
                  </div>
                </MoneyItem>
              ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.currentQuestionId === nextProps.currentQuestionId &&
      prevProps.loading === nextProps.loading &&
      prevProps.winningSums === nextProps.winningSums
    );
  }
);

MoneyList.displayName = "MoneyList";

export default MoneyList;
