"use client";

import { createContext, useContext, useState } from "react";

interface PillarActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const PillarActionContext = createContext<PillarActionContextProps | null>(
  null
);

export const PillarActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <PillarActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </PillarActionContext.Provider>
  );
};

export const usePillarAction = () => {
  const context = useContext(PillarActionContext);
  if (!context)
    throw new Error("usePillarAction must be used within PillarActionProvider");
  return context;
};
