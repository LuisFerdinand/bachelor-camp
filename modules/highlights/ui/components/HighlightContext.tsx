"use client";

import { createContext, useContext, useState } from "react";

interface HighlightActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const HighlightActionContext =
  createContext<HighlightActionContextProps | null>(null);

export const HighlightActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <HighlightActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </HighlightActionContext.Provider>
  );
};

export const useHighlightAction = () => {
  const context = useContext(HighlightActionContext);
  if (!context)
    throw new Error(
      "useHighlightAction must be used within HighlightActionProvider"
    );
  return context;
};
