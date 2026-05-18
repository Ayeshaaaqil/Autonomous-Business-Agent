export function generatePlan(prompt: string) {
  return [
    `Analyze goal: ${prompt}`,
    'Research market strategy',
    'Generate business roadmap',
    'Create execution workflow',
    'Prepare final recommendations',
  ];
}