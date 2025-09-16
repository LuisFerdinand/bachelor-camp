"use client";

import { createContext, useContext, useState } from "react";

interface StatisticActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const StatisticActionContext =
  createContext<StatisticActionContextProps | null>(null);

export const StatisticActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <StatisticActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </StatisticActionContext.Provider>
  );
};

export const useStatisticAction = () => {
  const context = useContext(StatisticActionContext);
  if (!context)
    throw new Error(
      "useStatisticAction must be used within StatisticActionProvider"
    );
  return context;
};
