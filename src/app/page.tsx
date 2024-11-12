import { PomodoroTimer } from "@/features/pomodoro-timer/components/PomodoroTimer";

export default function Home() {
  return (
    <div className="flex h-screen">
      <PomodoroTimer />
    </div>
  );
}
