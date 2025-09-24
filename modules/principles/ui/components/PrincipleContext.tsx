"use client";

import { createContext, useContext, useState } from "react";

interface PrincipleActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const PrincipleActionContext =
  createContext<PrincipleActionContextProps | null>(null);

export const PrincipleActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <PrincipleActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </PrincipleActionContext.Provider>
  );
};

export const usePrincipleAction = () => {
  const context = useContext(PrincipleActionContext);
  if (!context)
    throw new Error(
      "usePrincipleAction must be used within PrincipleActionProvider"
    );
  return context;
};
