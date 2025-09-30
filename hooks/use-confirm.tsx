import { ResponsiveModal } from "@/components/ResponsiveModal";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, JSX } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

interface useConfirmProps {
  title: string;
  message: string;
  variant?: ButtonProps["variant"];
}

export const useConfirm = ({
  title,
  message,
  variant = "default",
}: useConfirmProps): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  // Determine icon and color based on variant
  const getVariantConfig = () => {
    switch (variant) {
      case "destructive":
        return {
          icon: AlertTriangle,
          bgColor: "bg-red-50",
          iconColor: "text-red-600",
          borderColor: "border-red-200",
        };
      case "default":
        return {
          icon: CheckCircle2,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600",
          borderColor: "border-blue-200",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-gray-50",
          iconColor: "text-gray-600",
          borderColor: "border-gray-200",
        };
    }
  };

  const config = getVariantConfig();
  const Icon = config.icon;

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col items-center text-center">
            {/* Icon Container */}
            <div
              className={`mb-4 p-3 rounded-full ${config.bgColor} border-2 ${config.borderColor}`}
            >
              <Icon className={`w-8 h-8 ${config.iconColor}`} />
            </div>

            {/* Content */}
            <CardHeader className="p-0 space-y-3 mb-6">
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription className="text-base text-muted-foreground max-w-sm">
                {message}
              </CardDescription>
            </CardHeader>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto sm:min-w-[300px]">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full sm:flex-1 h-11 font-medium"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full sm:flex-1 h-11 font-medium"
                size="lg"
              >
                Confirm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm];
};
