import type {
  PomodoroSessionData,
  PomodoroConfiguration,
  PomodoroPhase,
} from "@/features/pomodoro/types";
import type React from "react";

interface SessionStatsProps {
  sessionData: PomodoroSessionData;
  longBreakFrequency: PomodoroConfiguration["longBreak"]["frequency"];
  currentPhase: PomodoroPhase;
}

function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card-foreground rounded-lg text-card py-1 px-2 text-sm font-geist-mono font-semibold">
      {children}
    </div>
  );
}

export function SessionStats({
  sessionData,
  longBreakFrequency,
  currentPhase,
}: SessionStatsProps) {
  const pomodorosCompletedInCycle =
    sessionData.work.completedPhases % longBreakFrequency;
  const pomodorosUntilLongBreak =
    longBreakFrequency - pomodorosCompletedInCycle;

  const longBreakText =
    currentPhase === "longBreak"
      ? "currently in long break"
      : longBreakFrequency === 0
      ? "long breaks deactivated"
      : `${pomodorosUntilLongBreak} pomodoros until long break`;

  return (
    <div className="flex flex-row gap-2 bg-card p-1 rounded-xl absolute top-5">
      <StatCard>{sessionData.work.completedPhases} pomodoros 🍅</StatCard>
      <StatCard>{sessionData.break.completedPhases} breaks 👾</StatCard>
      <StatCard>
        {sessionData.longBreak.completedPhases} long breaks 💤
      </StatCard>
      <StatCard>{longBreakText}</StatCard>
    </div>
  );
}
