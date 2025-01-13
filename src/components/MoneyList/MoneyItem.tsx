"use client";
import React from "react";

interface MoneyItemProps {
  strokeColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const MoneyItem: React.FC<MoneyItemProps> = ({
  strokeColor = "var(--color-gray)",
  backgroundColor = "var(--color-white)",
  children,
}) => {
  return (
    <svg
      width="100%"
      viewBox="0 0 376 40"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "all 0.3s ease" }}
    >
      <path
        d="M69 20H0"
        stroke={strokeColor}
        style={{ transition: "stroke 0.3s ease" }}
      />
      <path
        d="M376 20H307"
        stroke={strokeColor}
        style={{ transition: "stroke 0.3s ease" }}
      />
      <path
        d="M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z"
        fill={backgroundColor}
        stroke={strokeColor}
        style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
      />
      <foreignObject width="100%" height="100%">
        {children}
      </foreignObject>
    </svg>
  );
};

export default MoneyItem;
