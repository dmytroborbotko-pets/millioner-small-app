import { useEffect, useRef } from "react";

export const useMoneyListScroll = () => {
  const moneyContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (moneyContainerRef.current) {
      moneyContainerRef.current.scrollTop += e.deltaY;
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return moneyContainerRef;
};
