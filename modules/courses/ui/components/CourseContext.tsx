"use client";

import { createContext, useContext, useState } from "react";

interface CourseActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const CourseActionContext = createContext<CourseActionContextProps | null>(
  null
);

export const CourseActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <CourseActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </CourseActionContext.Provider>
  );
};

export const useCourseAction = () => {
  const context = useContext(CourseActionContext);
  if (!context)
    throw new Error("useCourseAction must be used within CourseActionProvider");
  return context;
};
