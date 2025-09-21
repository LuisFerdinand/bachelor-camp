"use client";

import { createContext, useContext, useState } from "react";

interface SocialMediaActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const SocialMediaActionContext =
  createContext<SocialMediaActionContextProps | null>(null);

export const SocialMediaActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <SocialMediaActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </SocialMediaActionContext.Provider>
  );
};

export const useSocialMediaAction = () => {
  const context = useContext(SocialMediaActionContext);
  if (!context)
    throw new Error(
      "useSocialMediaAction must be used within SocialMediaActionProvider"
    );
  return context;
};
