import { Loader2 } from "lucide-react";

export default function TypingLoader() {
  return (
    <div className="flex items-center gap-2 text-cyan-400">
      <Loader2 className="w-4 h-4 animate-spin" />
      AI Agent thinking...
    </div>
  );
}