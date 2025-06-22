import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon, SettingsIcon } from "lucide-react";
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
} from "@/features/pomodoro/types";

function PomodoroTimer() {
  const [pomodoroConfig] = useLocalStorage<PomodoroConfiguration>(
    "pomodoro",
    defaultPomodoroConfiguration
  );

  const [timeLeft, setTimeLeft] = useState(pomodoroConfig.work.duration);
  const [pomodoroPhase, setPhase] = useState<PomodoroPhase>("work");
  const [pomodoroState, setState] = useState<PomodoroState>("uninitialized");
  const [sessionData, setSessionData] = useState<PomodoroSessionData>(
    initialPomodoroSessionData
  );

  const intervalIdRef = useRef<number>(undefined);

  const autoStartPhases = pomodoroConfig.autoStartPhases;
  const longBreakFrequency = pomodoroConfig.longBreak.frequency;

  const minutesLeft = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secondsLeft = (timeLeft % 60).toString().padStart(2, "0");

  function handleTimeChange(timeLeft: number) {
    if (timeLeft - 1 < 0) {
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
          setPhase("longBreak");
        } else {
          setPhase("break");
        }
      } else {
        setPhase("work");
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

  function clearIntervalRef(
    intervalIdRef: React.RefObject<number | undefined>
  ) {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = undefined;
  }

  function handleStart() {
    clearIntervalRef(intervalIdRef);
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => handleTimeChange(prevTimeLeft));
    }, 1000);
    intervalIdRef.current = intervalId;
    setState("running");
  }

  function handleStop() {
    clearIntervalRef(intervalIdRef);
    setState("stopped");
  }

  function handlePause() {
    clearIntervalRef(intervalIdRef);
    setState("paused");
  }

  function handleReset() {
    clearIntervalRef(intervalIdRef);
    setTimeLeft(pomodoroConfig[pomodoroPhase].duration);
    setState("uninitialized");
  }

  function handlePhaseChange(phase: PomodoroPhase) {
    clearIntervalRef(intervalIdRef);
    setTimeLeft(pomodoroConfig[phase].duration);
    setPhase(phase);
    setState("uninitialized");
  }

  if (
    autoStartPhases &&
    pomodoroState === "stopped" &&
    intervalIdRef.current === undefined
  ) {
    handleStart();
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[url('/images/bg.jpg')]">
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex gap-x-2">
          {Object.values(pomodoroConstants).map((phase) => (
            <Button
              key={phase.key}
              variant={pomodoroPhase === phase.key ? "default" : "outline"}
              className="text-xl w-40 font-semibold font-geist-mono"
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
              className="text-xl font-semibold font-geist-mono"
            >
              Start
            </Button>
          )}
          {pomodoroState === "running" && (
            <Button
              onClick={handlePause}
              className="text-xl font-semibold font-geist-mono"
            >
              Pause
            </Button>
          )}
          <button onClick={handleReset}>
            <RotateCcwIcon className="hover:rotate-45 transition-transform" />
          </button>
          <button>
            <SettingsIcon className="hover:rotate-45 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default PomodoroTimer;
