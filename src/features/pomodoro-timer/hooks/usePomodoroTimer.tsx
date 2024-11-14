import { useState, useEffect, useRef } from "react";

const defaultConfig = {
  work: {
    state: "work",
    friendlyName: "Pomodoro",
    time: 5,
    message: "Time for work!",
    autoStart: true,
  },
  shortBreak: {
    state: "shortBreak",
    friendlyName: "Break",
    time: 5 * 60,
    message: "Time for a short break!",
    autoStart: true,
  },
  longBreak: {
    state: "longBreak",
    friendlyName: "Long Break",
    time: 15 * 60,
    message: "Time for a long break!",
    interval: 4,
    autoStart: true,
  },
};
export type PomodoroConfig = typeof defaultConfig;
type PomodoroStates = keyof typeof defaultConfig;

export function usePomodoroTimer(setCurrentTab: (value: string) => void) {
  const [pomodoroConfig, setPomodoroConfig] = useState(defaultConfig);
  const [time, setTime] = useState<number>(pomodoroConfig.work.time);
  const [currentState, setCurrentState] = useState<PomodoroStates>("work");
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  function cleanInterval() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }

  function stateChangeHelper(state: PomodoroStates) {
    setCurrentState(state);
    setTime(pomodoroConfig[state].time);
    setCurrentTab(state);
    sendNotification(state);
    return pomodoroConfig[state].time;
  }

  function sendNotification(state: PomodoroStates) {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Timer", {
        body: pomodoroConfig[state].message,
        tag: "pomodoro-notification",
      });
    }
  }

  function handleStateChange() {
    const audioElement = document.querySelector("audio")!;

    audioElement.play();

    if (currentState === pomodoroConfig.work.state) {
      setPomodoroCount(pomodoroCount + 1);

      const newCount = pomodoroCount + 1;

      if (newCount % pomodoroConfig.longBreak.interval === 0) {
        return stateChangeHelper("longBreak");
      } else {
        return stateChangeHelper("shortBreak");
      }
    } else {
      return stateChangeHelper("work");
    }
  }

  function handleStart(state: PomodoroStates) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    setCurrentState(state);

    if (currentState !== state) {
      setTime(pomodoroConfig[state].time);
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

    if (currentState === pomodoroConfig.work.state) {
      setTime(pomodoroConfig.work.time);
    }

    if (currentState === pomodoroConfig.shortBreak.state) {
      setTime(pomodoroConfig.shortBreak.time);
    }

    if (currentState === pomodoroConfig.longBreak.state) {
      setTime(pomodoroConfig.longBreak.time);
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

  // useEffect hook is used to load the stored configuration from localStorage
  useEffect(() => {
    const storedConfig = localStorage.getItem("pomodoroConfig");

    if (storedConfig) {
      const parsedConfig = JSON.parse(storedConfig);
      setPomodoroConfig(parsedConfig);
    }

    setIsLoaded(true);
  }, []);

  return {
    time,
    isRunning,
    currentState,
    pomodoroCount,
    pomodoroConfig,
    handleStart,
    handleStop,
    handleReset,
    isLoaded,
  };
}
