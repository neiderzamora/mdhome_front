import React, { useState } from "react";

const ReadMore = React.memo(({ text }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const isLong = text.length > 30;
  const displayText = isLong && !expanded ? text.slice(0, 30) + "..." : text;
  return (
    <span>
      {displayText}{" "}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 underline cursor-pointer"
        >
          {expanded ? "ver menos" : "ver mas"}
        </button>
      )}
    </span>
  );
});

ReadMore.displayName = "ReadMore";

export default ReadMore;