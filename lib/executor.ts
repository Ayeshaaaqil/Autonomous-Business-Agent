export function generateLogs(plan: string[]) {
  return plan.map((task, index) => ({
    step: index + 1,
    task,
    reasoning: `AI reasoning process completed for "${task}"`,
    output: `${task} executed successfully.`,
  }));
}