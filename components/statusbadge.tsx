export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500 px-3 py-1 rounded-full text-sm text-emerald-400">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      {status}
    </div>
  );
}