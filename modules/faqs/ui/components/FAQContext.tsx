"use client";

import { createContext, useContext, useState } from "react";

interface FAQActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const FAQActionContext = createContext<FAQActionContextProps | null>(null);

export const FAQActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <FAQActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </FAQActionContext.Provider>
  );
};

export const useFAQAction = () => {
  const context = useContext(FAQActionContext);
  if (!context)
    throw new Error("useFAQAction must be used within FAQActionProvider");
  return context;
};
