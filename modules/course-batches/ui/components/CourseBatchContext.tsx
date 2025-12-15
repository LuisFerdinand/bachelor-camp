"use client";

import { createContext, useContext, useState } from "react";

interface CourseBatchActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const CourseBatchActionContext =
  createContext<CourseBatchActionContextProps | null>(null);

export const CourseBatchActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <CourseBatchActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </CourseBatchActionContext.Provider>
  );
};

export const useCourseBatchAction = () => {
  const context = useContext(CourseBatchActionContext);
  if (!context)
    throw new Error(
      "useCourseBatchAction must be used within CourseBatchActionProvider"
    );
  return context;
};
