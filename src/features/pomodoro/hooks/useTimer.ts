import Worker from "@/features/pomodoro/scripts/timerWorker?worker";
import { useState, useRef } from "react";
import { clearIntervalRef } from "@/utils/clearIntervaRef";
import type { TimerWorker } from "@/features/pomodoro/types/timerWorkerTypes";

interface TimerProps {
  initialTimeLeft: number;
  onTimeChange: (timeLeft: number) => void;
}

export function useTimer({ initialTimeLeft, onTimeChange }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  const workerRef = useRef<TimerWorker>(null);
  const intervalIdRef = useRef<number>(undefined);

  if (!workerRef.current) {
    workerRef.current = new Worker() as TimerWorker;
  }

  workerRef.current.onmessage = (e) => {
    const { intervalId, timeLeft } = e.data;

    intervalIdRef.current ??= intervalId;

    setTimeLeft(timeLeft);
    onTimeChange(timeLeft);
  };

  function startTimer() {
    workerRef.current?.postMessage({ type: "startTimer", timeLeft });
  }

  function stopTimer() {
    workerRef.current?.postMessage({ type: "stopTimer" });
    clearIntervalRef(intervalIdRef);
  }

  return { timeLeft, setTimeLeft, intervalIdRef, startTimer, stopTimer };
}
