import { ReactNode } from "react";

interface RequiredLabelProps {
  children: ReactNode;
}

export const RequiredLabel = ({ children }: RequiredLabelProps) => (
  <div className="font-semibold">
    {children}
    <span className="text-red-500">*</span>
  </div>
);
