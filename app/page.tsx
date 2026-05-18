'use client';

import { useState } from 'react';
import {
  Play,
  Loader2,
  CheckCircle2,
  ClipboardList,
  Activity,
} from 'lucide-react';
import Header from "@/components/header";
import StatusBadge from "@/components/statusbadge";
import TypingLoader from "@/components/typingloader";

interface Log {
  step: number;
  task: string;
  reasoning: string;
  output: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  const startAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setPlan([]);
    setLogs([]);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.success) {
        setPlan(data.plan);
        setLogs(data.logs);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch {
      alert('Failed to run agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-10 md:px-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Autonomous Business Agent
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Multi-step reasoning • Task planning • Execution intelligence
          </p>
        </div>

        {/* INPUT CARD */}
        <form
          onSubmit={startAgent}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl"
        >
          <label className="text-sm text-slate-300">
            Enter your business goal
          </label>

          <div className="flex flex-col md:flex-row gap-3 mt-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Launch a SaaS product in fitness niche..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 transition"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {loading ? 'Running' : 'Run Agent'}
            </button>
          </div>
        </form>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PLAN */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-cyan-400 font-semibold mb-4">
              <ClipboardList className="w-5 h-5" />
              Task Plan
            </h2>

            {plan.length === 0 && !loading && (
              <p className="text-sm text-slate-500">
                No plan generated yet.
              </p>
            )}

            {loading && plan.length === 0 && (
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating plan...
              </p>
            )}

            <div className="space-y-3 mt-3">
              {plan.map((task, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-slate-950 border border-slate-800 p-3 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <p className="text-sm text-slate-300">{task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LOGS */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <h2 className="flex items-center gap-2 text-purple-400 font-semibold mb-4">
              <Activity className="w-5 h-5" />
              Execution Logs
            </h2>

            {logs.length === 0 && !loading && (
              <p className="text-sm text-slate-500">
                Waiting for agent execution...
              </p>
            )}

            <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
              {logs.map((log) => (
                <div
                  key={log.step}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="text-cyan-400 font-semibold">
                      Step {log.step}
                    </span>
                    <span className="truncate max-w-[60%]">
                      {log.task}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Reasoning
                    </p>
                    <p className="text-sm text-slate-300 bg-slate-900 p-2 rounded-lg">
                      {log.reasoning}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Output
                    </p>
                    <p className="text-sm text-slate-200 whitespace-pre-wrap">
                      {log.output}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-center py-6">
                  <Loader2 className="w-7 h-7 animate-spin text-cyan-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}