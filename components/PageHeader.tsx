import React, { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string; isCurrent?: boolean }[];
  action?: ReactNode;
  subnav?: ReactNode;
}

export function PageHeader({
  icon,
  title,
  description,
  breadcrumbs,
  action,
  subnav,
}: PageHeaderProps) {
  return (
    <div className="px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-2">
            <BreadcrumbList className="text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <BreadcrumbItem>
                    {crumb.isCurrent ? (
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {icon && <span className="text-primary">{icon}</span>}
                        <span className="font-medium text-foreground leading-none">
                          {crumb.label}
                        </span>
                      </div>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="hover:text-foreground transition-colors leading-none"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {idx < breadcrumbs.length - 1 && (
                    // <BreadcrumbSeparator />
                    <BreadcrumbSeparator className="text-muted-foreground">
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  )}
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {subnav && <div className="pt-3">{subnav}</div>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
