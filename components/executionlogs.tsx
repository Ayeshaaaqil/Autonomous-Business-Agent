type ExecutionLog = { taskId: string; message: string };

export default function ExecutionLogs({ logs }: { logs: ExecutionLog[] }) {
  return (
    <div>
      <h2 className="font-bold">Logs</h2>
      {logs.map((l, i) => (
        <p key={i}>
          {l.taskId}: {l.message}
        </p>
      ))}
    </div>
  );
}