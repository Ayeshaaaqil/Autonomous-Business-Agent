"use client";

import { useState } from "react";

export default function PromptForm({ onSubmit }: { onSubmit: (v: string) => void }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter goal..."
      />
      <button
        className="bg-black text-white px-4"
        onClick={() => onSubmit(input)}
      >
        Run
      </button>
    </div>
  );
}