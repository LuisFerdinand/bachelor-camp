"use client";

import { createContext, useContext, useState } from "react";

interface FacilityActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const FacilityActionContext = createContext<FacilityActionContextProps | null>(
  null
);

export const FacilityActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <FacilityActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </FacilityActionContext.Provider>
  );
};

export const useFacilityAction = () => {
  const context = useContext(FacilityActionContext);
  if (!context)
    throw new Error(
      "useFacilityAction must be used within FacilityActionProvider"
    );
  return context;
};
