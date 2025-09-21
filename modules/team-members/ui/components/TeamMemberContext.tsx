"use client";

import { createContext, useContext, useState } from "react";

interface TeamMemberActionContextProps {
  isMutating: boolean;
  setIsMutating: (value: boolean) => void;
}

const TeamMemberActionContext =
  createContext<TeamMemberActionContextProps | null>(null);

export const TeamMemberActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMutating, setIsMutating] = useState(false);

  return (
    <TeamMemberActionContext.Provider value={{ isMutating, setIsMutating }}>
      {children}
    </TeamMemberActionContext.Provider>
  );
};

export const useTeamMemberAction = () => {
  const context = useContext(TeamMemberActionContext);
  if (!context)
    throw new Error(
      "useTeamMemberAction must be used within TeamMemberActionProvider"
    );
  return context;
};
