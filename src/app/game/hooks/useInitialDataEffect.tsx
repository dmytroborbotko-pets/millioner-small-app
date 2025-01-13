import { WinningSum } from "@/types";
import { useEffect } from "react";

export const useInitialDataEffect = (
  initialLoading: boolean,
  winningSums: WinningSum[],
  hasInitialData: boolean,
  setHasInitialData: (value: boolean) => void
) => {
  useEffect(() => {
    if (!initialLoading && winningSums.length > 0 && !hasInitialData) {
      setHasInitialData(true);
    }
  }, [initialLoading, winningSums.length, hasInitialData, setHasInitialData]);
};
