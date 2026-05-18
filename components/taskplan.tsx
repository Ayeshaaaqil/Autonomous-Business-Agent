

interface Task {
  id: string;
  title: string;
  status: string;
}

export default function TaskPlan({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <h2 className="font-bold">Plan</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}