import type {
  PomodoroSessionData,
  PomodoroConfiguration,
  PomodoroPhase,
} from "@/features/pomodoro/types/pomodoroTypes";

interface SessionStatsProps {
  sessionData: PomodoroSessionData;
  longBreakFrequency: PomodoroConfiguration["longBreak"]["frequency"];
  currentPhase: PomodoroPhase;
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
      ? "Currently in long break"
      : longBreakFrequency === 0
      ? "Long breaks deactivated"
      : `${pomodorosUntilLongBreak} Pomodoros until long break`;

  return (
    <div className="flex flex-row text-card-foreground gap-3 bg-card p-1 rounded-xl border">
      <StatCard>{sessionData.work.completedPhases} Pomodoros 🍅</StatCard>
      <StatCard>{sessionData.break.completedPhases} Breaks 👾</StatCard>
      <StatCard>
        {sessionData.longBreak.completedPhases} Long Breaks 💤
      </StatCard>
      <StatCard>{longBreakText}</StatCard>
    </div>
  );
}

function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card-foreground rounded-lg text-card py-1 px-2 text-sm font-geist-mono font-semibold">
      {children}
    </div>
  );
}
