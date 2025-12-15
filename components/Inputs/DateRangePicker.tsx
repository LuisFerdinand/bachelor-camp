import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DateRangePickerProps {
  startDate?: string | null;
  endDate?: string | null;
  onDateChange: (start: string | null, end: string | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  showPresets?: boolean;
}

type PresetRange = {
  label: string;
  getValue: () => { start: Date; end: Date };
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
  placeholder = "Select date range",
  minDate,
  maxDate,
  showPresets = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStart, setSelectedStart] = useState<Date | null>(
    startDate ? new Date(startDate + "T00:00:00") : null
  );
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(
    endDate ? new Date(endDate + "T00:00:00") : null
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (startDate) return new Date(startDate + "T00:00:00");
    return new Date();
  });
  const [yearInput, setYearInput] = useState(
    currentMonth.getFullYear().toString()
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startDate) {
      setSelectedStart(new Date(startDate + "T00:00:00"));
    } else {
      setSelectedStart(null);
    }
    if (endDate) {
      setSelectedEnd(new Date(endDate + "T00:00:00"));
    } else {
      setSelectedEnd(null);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setYearInput(currentMonth.getFullYear().toString());
  }, [currentMonth]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const presets: PresetRange[] = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [
      {
        label: "Today",
        getValue: () => ({ start: new Date(today), end: new Date(today) }),
      },
      {
        label: "Yesterday",
        getValue: () => {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return { start: yesterday, end: yesterday };
        },
      },
      {
        label: "Last 7 days",
        getValue: () => {
          const start = new Date(today);
          start.setDate(start.getDate() - 6);
          return { start, end: new Date(today) };
        },
      },
      {
        label: "Last 30 days",
        getValue: () => {
          const start = new Date(today);
          start.setDate(start.getDate() - 29);
          return { start, end: new Date(today) };
        },
      },
      {
        label: "This month",
        getValue: () => {
          const start = new Date(today.getFullYear(), today.getMonth(), 1);
          const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          return { start, end };
        },
      },
      {
        label: "Last month",
        getValue: () => {
          const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const end = new Date(today.getFullYear(), today.getMonth(), 0);
          return { start, end };
        },
      },
    ];
  }, []);

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, []);

  const formatDate = useCallback((date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const toISODateString = useCallback((date: Date | null) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const isSameDay = useCallback((date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  const isInRange = useCallback((date: Date, start: Date, end: Date) => {
    if (!date || !start || !end) return false;
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const startTime = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    ).getTime();
    const endTime = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate()
    ).getTime();
    return dateTime >= startTime && dateTime <= endTime;
  }, []);

  const isToday = useCallback(
    (date: Date | null) => {
      if (!date) return false;
      return isSameDay(date, new Date());
    },
    [isSameDay]
  );

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;

      if (!selectedStart || (selectedStart && selectedEnd)) {
        setSelectedStart(date);
        setSelectedEnd(null);
      } else {
        if (date < selectedStart) {
          setSelectedEnd(selectedStart);
          setSelectedStart(date);
        } else if (isSameDay(date, selectedStart)) {
          setSelectedEnd(date);
        } else {
          setSelectedEnd(date);
        }
      }
    },
    [selectedStart, selectedEnd, isDateDisabled, isSameDay]
  );

  const handleApply = useCallback(() => {
    if (selectedStart && !selectedEnd) {
      onDateChange(
        toISODateString(selectedStart),
        toISODateString(selectedStart)
      );
    } else if (selectedStart && selectedEnd) {
      onDateChange(
        toISODateString(selectedStart),
        toISODateString(selectedEnd)
      );
    }
    setIsOpen(false);
  }, [selectedStart, selectedEnd, onDateChange, toISODateString]);

  const handleClear = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedStart(null);
      setSelectedEnd(null);
      onDateChange(null, null);
    },
    [onDateChange]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  }, [currentMonth]);

  const handleMonthChange = useCallback(
    (value: string) => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(value)));
    },
    [currentMonth]
  );

  const handleYearChange = useCallback(
    (value: string) => {
      const year = parseInt(value);
      if (!isNaN(year) && year >= 1900 && year <= 2100) {
        setCurrentMonth(new Date(year, currentMonth.getMonth()));
      }
    },
    [currentMonth]
  );

  const handleYearInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setYearInput(value);
    },
    []
  );

  const handleYearInputBlur = useCallback(() => {
    const year = parseInt(yearInput);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      setCurrentMonth(new Date(year, currentMonth.getMonth()));
    } else {
      setYearInput(currentMonth.getFullYear().toString());
    }
  }, [yearInput, currentMonth]);

  const handleYearInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleYearInputBlur();
        e.currentTarget.blur();
      }
    },
    [handleYearInputBlur]
  );

  const handlePresetClick = useCallback((preset: PresetRange) => {
    const { start, end } = preset.getValue();
    setSelectedStart(start);
    setSelectedEnd(end);
    setCurrentMonth(new Date(start));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!focusedDate && !selectedStart) return;

      const currentFocus = focusedDate || selectedStart || new Date();
      let newDate: Date | null = null;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          newDate = new Date(currentFocus);
          newDate.setDate(newDate.getDate() - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          newDate = new Date(currentFocus);
          newDate.setDate(newDate.getDate() + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          newDate = new Date(currentFocus);
          newDate.setDate(newDate.getDate() - 7);
          break;
        case "ArrowDown":
          e.preventDefault();
          newDate = new Date(currentFocus);
          newDate.setDate(newDate.getDate() + 7);
          break;
        case "Enter":
          e.preventDefault();
          if (currentFocus) handleDateClick(currentFocus);
          return;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          return;
      }

      if (newDate) {
        setFocusedDate(newDate);
        if (
          newDate.getMonth() !== currentMonth.getMonth() ||
          newDate.getFullYear() !== currentMonth.getFullYear()
        ) {
          setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth()));
        }
      }
    },
    [focusedDate, selectedStart, currentMonth, handleDateClick]
  );

  const days = useMemo(
    () => getDaysInMonth(currentMonth),
    [currentMonth, getDaysInMonth]
  );
  const displayStart = selectedStart;
  const displayEnd = selectedEnd;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-9 px-3 text-sm min-w-[240px] justify-between font-normal hover:bg-gray-50 group transition-all"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
            <span className="text-gray-700">
              {displayStart &&
              displayEnd &&
              !isSameDay(displayStart, displayEnd)
                ? `${formatDate(displayStart)} - ${formatDate(displayEnd)}`
                : displayStart
                  ? formatDate(displayStart)
                  : placeholder}
            </span>
          </div>
          {(displayStart || displayEnd) && (
            <X
              className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onKeyDown={handleKeyDown}
      >
        <div className="flex">
          {showPresets && (
            <div className="border-r p-3 w-40 space-y-1">
              <div className="text-xs font-semibold text-gray-500 mb-2 px-2">
                Quick Select
              </div>
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePresetClick(preset)}
                  className="w-full justify-start h-8 text-xs font-normal hover:bg-primary/10 hover:text-primary"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          )}

          <div className="p-4" ref={calendarRef}>
            <div className="flex items-center justify-between mb-4 gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevMonth}
                className="h-7 w-7 hover:bg-primary/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                <Select
                  value={currentMonth.getMonth().toString()}
                  onValueChange={handleMonthChange}
                >
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  value={yearInput}
                  onChange={handleYearInputChange}
                  onBlur={handleYearInputBlur}
                  onKeyDown={handleYearInputKeyDown}
                  min="1900"
                  max="2100"
                  className="h-8 w-[90px] text-center"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="h-7 w-7 hover:bg-primary/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-xs font-semibold text-gray-500 text-center py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return (
                    <div key={`empty-${index}`} className="aspect-square" />
                  );
                }

                const isStart = isSameDay(date, displayStart);
                const isEnd = isSameDay(date, displayEnd);
                const inRange =
                  displayStart &&
                  displayEnd &&
                  !isSameDay(displayStart, displayEnd) &&
                  isInRange(date, displayStart, displayEnd);
                const inHoverRange =
                  selectedStart &&
                  !selectedEnd &&
                  hoveredDate &&
                  !isSameDay(selectedStart, hoveredDate) &&
                  isInRange(
                    date,
                    selectedStart < hoveredDate ? selectedStart : hoveredDate,
                    selectedStart > hoveredDate ? selectedStart : hoveredDate
                  );
                const isTodayDate = isToday(date);
                const isDisabled = isDateDisabled(date);
                const isFocused = focusedDate && isSameDay(date, focusedDate);

                return (
                  <Button
                    key={date.toISOString()}
                    variant="ghost"
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    disabled={isDisabled}
                    className={`
                      aspect-square p-0 h-9 w-9 text-sm font-normal transition-all duration-150 relative
                      ${isDisabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : ""}
                      ${isFocused && !isDisabled ? "ring-2 ring-primary ring-offset-1" : ""}
                      ${
                        isStart || isEnd
                          ? "bg-primary text-white hover:bg-primary/90 hover:text-white font-semibold shadow-sm"
                          : inRange || inHoverRange
                            ? "bg-primary/10 text-primary hover:bg-primary/20 font-medium"
                            : isTodayDate
                              ? "border-2 border-primary text-primary hover:bg-primary/5 font-medium"
                              : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {date.getDate()}
                    {isTodayDate && !isStart && !isEnd && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleClear()}
                className="h-8 hover:bg-gray-100"
              >
                Clear
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!selectedStart}
                  className="h-8 shadow-sm"
                >
                  Apply
                </Button>
              </div>
            </div>

            {selectedStart && !selectedEnd && (
              <div className="mt-3 text-xs text-center text-gray-600 bg-blue-50 py-2 rounded-md border border-blue-100 animate-in fade-in duration-200">
                <span className="font-medium">Tip:</span> Click Apply for single
                date or select end date
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
