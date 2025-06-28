import { useState } from "react";
import { useTimer } from "@/features/pomodoro/hooks/useTimer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ConfigurationDialog } from "@/features/pomodoro/components/ConfigurationDialog";
import { SessionStats } from "@/features/pomodoro/components/SessionStats";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import {
  pomodoroConstants,
  initialPomodoroSessionData,
  defaultPomodoroConfiguration,
} from "@/features/pomodoro/constants";
import type {
  PomodoroPhase,
  PomodoroState,
  PomodoroSessionData,
  PomodoroConfiguration,
} from "@/features/pomodoro/types/pomodoroTypes";

function PomodoroTimer() {
  const [pomodoroConfig] = useLocalStorage<PomodoroConfiguration>(
    "pomodoro",
    defaultPomodoroConfiguration
  );

  const { timeLeft, setTimeLeft, intervalIdRef, startTimer, stopTimer } =
    useTimer({
      initialTimeLeft: pomodoroConfig.work.duration,
      onTimeChange: handleTimeChange,
    });
  const [pomodoroPhase, setPomodoroPhase] = useState<PomodoroPhase>("work");
  const [pomodoroState, setPomodoroState] =
    useState<PomodoroState>("uninitialized");
  const [sessionData, setSessionData] = useState<PomodoroSessionData>(
    initialPomodoroSessionData
  );

  const autoStartPhases = pomodoroConfig.autoStartPhases;
  const longBreakFrequency = pomodoroConfig.longBreak.frequency;
  const minutesLeft = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const secondsLeft = (timeLeft % 60).toString().padStart(2, "0");

  // Configure timeLeft when a new time is saved on the timer configuration
  const [initialTime, setInitialTime] = useState(pomodoroConfig);
  if (
    initialTime[pomodoroPhase].duration !==
    pomodoroConfig[pomodoroPhase].duration
  ) {
    setInitialTime(pomodoroConfig);
    setTimeLeft(pomodoroConfig[pomodoroPhase].duration);
    handlePause();
  }

  // Auto start phases if configurated to be true
  if (
    autoStartPhases &&
    pomodoroState === "stopped" &&
    intervalIdRef.current === undefined
  ) {
    handleStart();
  }

  function handleTimeChange(timeLeft: number) {
    if (timeLeft === 0) {
      const isLongBreak =
        (sessionData[pomodoroPhase].completedPhases + 1) %
          longBreakFrequency ===
        0;

      let nextPhase: PomodoroConfiguration[PomodoroPhase];

      if (pomodoroPhase === "work") {
        nextPhase = isLongBreak
          ? pomodoroConfig.longBreak
          : pomodoroConfig.break;
      } else {
        nextPhase = pomodoroConfig.work;
      }

      const nextPhaseDuration = nextPhase.duration;

      if (pomodoroPhase === "work") {
        if (isLongBreak) {
          setPomodoroPhase("longBreak");
        } else {
          setPomodoroPhase("break");
        }
      } else {
        setPomodoroPhase("work");
      }

      setSessionData({
        ...sessionData,
        [pomodoroPhase]: {
          ...sessionData[pomodoroPhase],
          completedPhases: sessionData[pomodoroPhase].completedPhases + 1,
        },
      });

      handleStop();
      return nextPhaseDuration;
    } else {
      return timeLeft - 1;
    }
  }

  function handleStart() {
    stopTimer();
    startTimer();
    setPomodoroState("running");
  }

  function handleStop() {
    stopTimer();
    setPomodoroState("stopped");
  }

  function handlePause() {
    stopTimer();
    setPomodoroState("paused");
  }

  function handleReset() {
    stopTimer();
    setTimeLeft(pomodoroConfig[pomodoroPhase].duration);
    setPomodoroState("uninitialized");
  }

  function handlePhaseChange(phase: PomodoroPhase) {
    stopTimer();
    setTimeLeft(pomodoroConfig[phase].duration);
    setPomodoroPhase(phase);
    setPomodoroState("uninitialized");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/images/bg.jpg')] bg-background/50 bg-blend-darken">
      <SessionStats
        sessionData={sessionData}
        longBreakFrequency={pomodoroConfig.longBreak.frequency}
        currentPhase={pomodoroPhase}
      />
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex gap-x-2">
          {Object.values(pomodoroConstants).map((phase) => (
            <Button
              key={phase.key}
              variant={pomodoroPhase === phase.key ? "default" : "outline"}
              className="text-xl w-40 font-semibold font-geist-mono rounded-xl"
              onClick={() => handlePhaseChange(phase.key)}
            >
              {phase.readableName}
            </Button>
          ))}
        </div>
        <div className="text-9xl font-bold">
          {minutesLeft}:{secondsLeft}
        </div>
        <div className="flex gap-x-2 w-full justify-center">
          {(pomodoroState === "paused" ||
            pomodoroState === "stopped" ||
            pomodoroState === "uninitialized") && (
            <Button
              onClick={handleStart}
              className="text-xl font-semibold font-geist-mono rounded-xl"
            >
              Start
            </Button>
          )}
          {pomodoroState === "running" && (
            <Button
              onClick={handlePause}
              className="text-xl font-semibold font-geist-mono rounded-xl"
            >
              Pause
            </Button>
          )}
          <button onClick={handleReset} aria-label="Reset">
            <RotateCcwIcon className="hover:rotate-45 transition-transform" />
          </button>
          <ConfigurationDialog />
        </div>
      </section>
    </div>
  );
}

export default PomodoroTimer;
