"use client";

import { createContext, useContext, useState } from "react";

interface TestimonialActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const TestimonialActionContext =
  createContext<TestimonialActionContextProps | null>(null);

export const TestimonialActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <TestimonialActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </TestimonialActionContext.Provider>
  );
};

export const useTestimonialAction = () => {
  const context = useContext(TestimonialActionContext);
  if (!context)
    throw new Error(
      "useTestimonialAction must be used within TestimonialActionProvider"
    );
  return context;
};
