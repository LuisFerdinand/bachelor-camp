import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
}: {
  options: { label: string; value: string }[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const current = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "w-full lg:w-auto h-8 border rounded-md flex items-center justify-between px-3 text-sm bg-background",
          value && value !== "all"
            ? "bg-muted text-primary border-primary ring-1 ring-primary/40"
            : "border-input"
        )}
      >
        <span className="flex items-center gap-2 truncate leading-none">
          {icon}
          {current?.label || placeholder}
        </span>
        <ChevronsUpDown className="ml-2 size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-8" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.label}
                onSelect={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
                {opt.value === value && (
                  <Check className="ml-auto size-4 text-primary" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
