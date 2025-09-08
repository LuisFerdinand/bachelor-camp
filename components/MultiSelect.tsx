"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
  color?: string | null;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={!disabled ? setOpen : undefined}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-muted-foreground/50"
          >
            {value.length > 0
              ? `${value.length} selected`
              : placeholder || "Select options"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search categories..."
              onValueChange={setSearch}
              disabled={disabled}
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => !disabled && toggleOption(option.value)}
                  className={cn(
                    "cursor-pointer",
                    disabled && "pointer-events-none opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted",
                      value.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {value.includes(option.value) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 border border-slate-500 rounded-sm" />
                    )}
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected badges */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((val) => {
            const option = options.find((opt) => opt.value === val);
            if (!option) return null;

            return (
              <Badge
                key={val}
                style={{
                  backgroundColor: option.color ?? "#6b7280",
                  color: "#fff",
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full hover:opacity-90 transition-all shadow-md group cursor-pointer",
                  disabled && "opacity-50 pointer-events-none"
                )}
                onClick={() => {
                  if (!disabled) {
                    onChange(value.filter((v) => v !== val));
                  }
                }}
              >
                <span className="truncate max-w-[150px]">{option.label}</span>
                <X className="w-4 h-4 opacity-80 group-hover:border rounded-full border-white" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
