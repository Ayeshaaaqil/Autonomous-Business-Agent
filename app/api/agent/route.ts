import { NextResponse } from "next/server";
import { generatePlan } from "@/lib/planner";
import { generateLogs } from "@/lib/executor";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const plan = generatePlan(prompt);

    const logs = generateLogs(plan);

    const result = await generateAIResponse(prompt);

    return NextResponse.json({
      success: true,
      plan,
      logs,
      result,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Agent failed",
    });
  }
}