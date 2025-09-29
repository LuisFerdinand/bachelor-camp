import { ReactNode } from "react";

interface RequiredLabelProps {
  children: ReactNode;
}

export const RequiredLabel = ({ children }: RequiredLabelProps) => (
  <>
    {children}
    <span className="text-red-500">*</span>
  </>
);
