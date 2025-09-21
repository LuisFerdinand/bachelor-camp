"use client";

import { createContext, useContext, useState } from "react";

interface LocationActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const LocationActionContext = createContext<LocationActionContextProps | null>(
  null
);

export const LocationActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <LocationActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </LocationActionContext.Provider>
  );
};

export const useLocationAction = () => {
  const context = useContext(LocationActionContext);
  if (!context)
    throw new Error(
      "useLocationAction must be used within LocationActionProvider"
    );
  return context;
};
