import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(setCurrentTab: (value: string) => void) {
  const pomodoroStates = {
    work: "work",
    shortBreak: "shortBreak",
    longBreak: "longBreak",
  } as const;
  type PomodoroStates = keyof typeof pomodoroStates;

  const pomodoroConfig = {
    workTime: 5,
    shortBreakTime: 4,
    longBreakTime: 3,
    longBreakInterval: 4,
  };
  type PomodoroConfig = keyof typeof pomodoroConfig;

  const [time, setTime] = useState(pomodoroConfig.workTime);
  const [currentState, setCurrentState] = useState<PomodoroStates>(
    pomodoroStates.work,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  function cleanInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }

  function handleStateChange() {
    if (currentState === pomodoroStates.work) {
      setPomodoroCount(pomodoroCount + 1);

      const newCount = pomodoroCount + 1;

      if (newCount % pomodoroConfig.longBreakInterval === 0) {
        setCurrentState(pomodoroStates.longBreak);
        setTime(pomodoroConfig.longBreakTime);
        setCurrentTab(pomodoroStates.longBreak);
        return pomodoroConfig.longBreakTime;
      } else {
        setCurrentState(pomodoroStates.shortBreak);
        setTime(pomodoroConfig.shortBreakTime);
        setCurrentTab(pomodoroStates.shortBreak);
        return pomodoroConfig.shortBreakTime;
      }
    } else {
      setCurrentState(pomodoroStates.work);
      setTime(pomodoroConfig.workTime);
      setCurrentTab(pomodoroStates.work);
      return pomodoroConfig.workTime;
    }
  }

  function handleStart(state: PomodoroStates) {
    setCurrentState(state);
    const requestedTime = `${state}Time` as PomodoroConfig;
    const stateTime = pomodoroConfig[requestedTime];

    if (currentState !== state) {
      setTime(stateTime);
    }

    setIsRunning(true);
  }

  function handleStop() {
    cleanInterval();
    setIsRunning(false);
  }

  function handleReset() {
    cleanInterval();
    setIsRunning(false);

    if (currentState === pomodoroStates.work) {
      setTime(pomodoroConfig.workTime);
    }

    if (currentState === pomodoroStates.shortBreak) {
      setTime(pomodoroConfig.shortBreakTime);
    }

    if (currentState === pomodoroStates.longBreak) {
      setTime(pomodoroConfig.longBreakTime);
    }
  }

  // useEffect clean up function is used to clean the interval on component unmount
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((time) => {
          if (time <= 0) {
            return handleStateChange();
          }

          return time - 1;
        });
      }, 1000);
    }

    return () => {
      cleanInterval();
    };
  }, [isRunning, currentState]);

  return {
    time,
    isRunning,
    currentState,
    pomodoroCount,
    pomodoroConfig,
    handleStart,
    handleStop,
    handleReset,
  };
}
