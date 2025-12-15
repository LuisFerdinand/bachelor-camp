import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  error?: string;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled = false,
  label,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("09");
  const [minutes, setMinutes] = useState("00");
  const [focusedInput, setFocusedInput] = useState<"hours" | "minutes" | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const hoursInputRef = useRef<HTMLInputElement | null>(null);
  const minutesInputRef = useRef<HTMLInputElement | null>(null);

  // Parse the value prop (HH:mm format)
  useEffect(() => {
    if (value && value.match(/^\d{2}:\d{2}$/)) {
      const [h, m] = value.split(":");
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatTime = (h: string, m: string) => {
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };

  const updateTime = (newHours: string, newMinutes: string) => {
    const h = newHours.padStart(2, "0");
    const m = newMinutes.padStart(2, "0");
    setHours(h);
    setMinutes(m);
    onChange(formatTime(h, m));
  };

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);

    const num = parseInt(val || "0", 10);
    if (num > 23) val = "23";

    setHours(val);

    if (val.length === 2) {
      minutesInputRef.current?.focus();
    }
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);

    const num = parseInt(val || "0", 10);
    if (num > 59) val = "59";

    setMinutes(val);
  };

  const handleHourBlur = () => {
    const h = hours.padStart(2, "0");
    setHours(h);
    updateTime(h, minutes);
  };

  const handleMinuteBlur = () => {
    const m = minutes.padStart(2, "0");
    setMinutes(m);
    updateTime(hours, m);
  };

  const incrementHours = () => {
    const newHours = ((parseInt(hours, 10) + 1) % 24).toString();
    updateTime(newHours, minutes);
  };

  const decrementHours = () => {
    const newHours = ((parseInt(hours, 10) - 1 + 24) % 24).toString();
    updateTime(newHours, minutes);
  };

  const incrementMinutes = () => {
    const newMinutes = ((parseInt(minutes, 10) + 1) % 60).toString();
    updateTime(hours, newMinutes);
  };

  const decrementMinutes = () => {
    const newMinutes = ((parseInt(minutes, 10) - 1 + 60) % 60).toString();
    updateTime(hours, newMinutes);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: "hours" | "minutes"
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      type === "hours" ? incrementHours() : incrementMinutes();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      type === "hours" ? decrementHours() : decrementMinutes();
    } else if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const displayValue = value || "09:00";

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-3 py-2 pl-10 border rounded-lg bg-white text-gray-900 text-left font-medium transition-all text-sm
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300 hover:border-blue-400 focus:ring-blue-500"}
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:shadow-sm focus:outline-none focus:ring-2"}
          ${isOpen && !disabled ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
      >
        <span className="font-mono">{displayValue}</span>
      </button>

      <Clock className="absolute left-3 top-[34px] w-4 h-4 text-gray-400 pointer-events-none" />

      {isOpen && !disabled && (
        <>
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className=" text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select Time
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {/* Hours Column */}
              <div className="flex flex-col items-center gap-0 space-y-1">
                <div className="flex flex-col items-center gap-0 space-y-0">
                  <button
                    type="button"
                    onClick={incrementHours}
                    className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>

                  <div className="relative my-2">
                    <input
                      ref={hoursInputRef}
                      type="text"
                      value={hours}
                      onChange={handleHourChange}
                      onBlur={handleHourBlur}
                      onFocus={() => setFocusedInput("hours")}
                      onKeyDown={(e) => handleKeyDown(e, "hours")}
                      className={`w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all
                      ${focusedInput === "hours" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-900"}
                      focus:outline-none focus:border-blue-500 focus:bg-blue-50 font-mono`}
                      maxLength={2}
                    />
                    <div className="absolute -bottom-4 left-0 right-0 text-center text-xs font-medium text-gray-500">
                      Hours
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={decrementHours}
                  className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-gray-600 hover:text-blue-600 mt-5"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Separator */}
              <div className="text-3xl font-bold text-gray-400 mb-6">:</div>

              {/* Minutes Column */}
              <div className="flex flex-col items-center gap-0 space-y-1">
                <div className="flex flex-col items-center gap-0 space-y-0">
                  <button
                    type="button"
                    onClick={incrementMinutes}
                    className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>

                  <div className="relative my-2">
                    <input
                      ref={minutesInputRef}
                      type="text"
                      value={minutes}
                      onChange={handleMinuteChange}
                      onBlur={handleMinuteBlur}
                      onFocus={() => setFocusedInput("minutes")}
                      onKeyDown={(e) => handleKeyDown(e, "minutes")}
                      className={`w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all
                      ${focusedInput === "minutes" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-900"}
                      focus:outline-none focus:border-blue-500 focus:bg-blue-50 font-mono`}
                      maxLength={2}
                    />
                    <div className="absolute -bottom-4 left-0 right-0 text-center text-xs font-medium text-gray-500">
                      Minutes
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={decrementMinutes}
                  className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Select Buttons */}
            <div className=" pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">
                Quick Select
              </p>
              <div className="grid grid-cols-4 gap-2">
                {["09:00", "12:00", "15:00", "18:00"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      const [h, m] = time.split(":");
                      updateTime(h, m);
                      setIsOpen(false);
                    }}
                    className="px-2 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Done
            </button>
          </div>

          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

// Demo Component
// export default function TimePickerDemo() {
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("17:00");
//   const [error, setError] = useState("");

//   const validateTime = (time) => {
//     const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     return regex.test(time);
//   };

//   const handleStartTimeChange = (time) => {
//     setStartTime(time);
//     if (!validateTime(time)) {
//       setError("Invalid start time (HH:mm)");
//     } else {
//       setError("");
//     }
//   };

//   const handleEndTimeChange = (time) => {
//     setEndTime(time);
//     if (!validateTime(time)) {
//       setError("Invalid end time (HH:mm)");
//     } else {
//       setError("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Advanced Time Picker
//             </h1>
//             <p className="text-gray-600">
//               Premium time selection with intuitive controls and HH:mm format
//               validation
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <TimePicker
//               value={startTime}
//               onChange={handleStartTimeChange}
//               label="Start Time"
//               error={error && error.includes("start") ? error : ""}
//             />

//             <TimePicker
//               value={endTime}
//               onChange={handleEndTimeChange}
//               label="End Time"
//             />
//           </div>

//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//             <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
//               <Clock className="w-4 h-4" />
//               Selected Times
//             </h3>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between items-center">
//                 <span className="text-blue-700 font-medium">Start:</span>
//                 <span className="font-mono font-bold text-blue-900">
//                   {startTime}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-blue-700 font-medium">End:</span>
//                 <span className="font-mono font-bold text-blue-900">
//                   {endTime}
//                 </span>
//               </div>
//               <div className="pt-2 border-t border-blue-200 flex justify-between items-center">
//                 <span className="text-blue-700 font-medium">Duration:</span>
//                 <span className="font-semibold text-blue-900">
//                   {(() => {
//                     const [sh, sm] = startTime.split(":").map(Number);
//                     const [eh, em] = endTime.split(":").map(Number);
//                     const diff = eh * 60 + em - (sh * 60 + sm);
//                     const hours = Math.floor(diff / 60);
//                     const mins = diff % 60;
//                     return `${hours}h ${mins}m`;
//                   })()}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
//             <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
//             <ul className="text-sm text-gray-700 space-y-1.5">
//               <li className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                 Click to open interactive time selector
//               </li>
//               <li className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                 Arrow buttons or keyboard arrows to adjust time
//               </li>
//               <li className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                 Direct input with automatic validation
//               </li>
//               <li className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                 Quick select buttons for common times
//               </li>
//               <li className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//                 Automatic HH:mm formatting
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
