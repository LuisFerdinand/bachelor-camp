"use client";

import { createContext, useContext, useState } from "react";

interface MilestoneActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const MilestoneActionContext =
  createContext<MilestoneActionContextProps | null>(null);

export const MilestoneActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <MilestoneActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </MilestoneActionContext.Provider>
  );
};

export const useMilestoneAction = () => {
  const context = useContext(MilestoneActionContext);
  if (!context)
    throw new Error(
      "useMilestoneAction must be used within MilestoneActionProvider"
    );
  return context;
};
