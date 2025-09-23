"use client";

import { FC } from "react";

interface LastUpdatedDisplayProps {
  value: string | Date;
}

const LastUpdatedDisplay: FC<LastUpdatedDisplayProps> = ({ value }) => {
  const date = new Date(value);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let timeAgo = "";
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    timeAgo = diffHours === 0 ? "Just now" : `${diffHours}h ago`;
  } else if (diffDays < 7) {
    timeAgo = `${diffDays}d ago`;
  } else {
    timeAgo = `${Math.floor(diffDays / 7)}w ago`;
  }

  return (
    <div className="flex flex-col text-xs">
      <span className="font-medium">{date.toLocaleDateString()}</span>
      <span className="text-muted-foreground">
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <span className="text-muted-foreground text-[10px] mt-0.5">
        {timeAgo}
      </span>
    </div>
  );
};

export default LastUpdatedDisplay;
