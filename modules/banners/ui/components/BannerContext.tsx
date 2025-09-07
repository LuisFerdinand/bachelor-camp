"use client";

import { createContext, useContext, useState } from "react";

interface BannerActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const BannerActionContext = createContext<BannerActionContextProps | null>(
  null
);

export const BannerActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <BannerActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </BannerActionContext.Provider>
  );
};

export const useBannerAction = () => {
  const context = useContext(BannerActionContext);
  if (!context)
    throw new Error("useBannerAction must be used within BannerActionProvider");
  return context;
};
