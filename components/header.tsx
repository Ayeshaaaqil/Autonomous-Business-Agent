export default function Header() {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Autonomous Business Agent
      </h1>

      <p className="text-slate-400">
        Multi-step reasoning • Task planning • Execution logs
      </p>
    </div>
  );
}