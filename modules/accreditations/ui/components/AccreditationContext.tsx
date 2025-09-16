"use client";

import { createContext, useContext, useState } from "react";

interface AccreditationActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const AccreditationActionContext =
  createContext<AccreditationActionContextProps | null>(null);

export const AccreditationActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <AccreditationActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </AccreditationActionContext.Provider>
  );
};

export const useAccreditationAction = () => {
  const context = useContext(AccreditationActionContext);
  if (!context)
    throw new Error(
      "useAccreditationAction must be used within AccreditationActionProvider"
    );
  return context;
};
