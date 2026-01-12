import React from "react";

export default function Loader2() {
  return (
    <div className="flex flex-row gap-2 mt-2">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.1s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.2s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
    </div>
  );
}
