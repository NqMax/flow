import type {
  PomodoroConstants,
  PomodoroConfiguration,
  PomodoroSessionData,
} from "@/features/pomodoro/types/pomodoroTypes";

const pomodoroConstants: PomodoroConstants = {
  work: {
    key: "work",
    readableName: "Pomodoro",
  },
  break: {
    key: "break",
    nextPhase: "work",
    readableName: "Break",
  },
  longBreak: {
    key: "longBreak",
    nextPhase: "work",
    readableName: "Long Break",
  },
};

const initialPomodoroSessionData: PomodoroSessionData = {
  work: {
    completedPhases: 0,
  },
  break: {
    completedPhases: 0,
  },
  longBreak: {
    completedPhases: 0,
  },
};

const defaultPomodoroConfiguration: PomodoroConfiguration = {
  work: {
    duration: 25 * 60,
  },
  break: {
    duration: 5 * 60,
  },
  longBreak: {
    duration: 15 * 60,
    frequency: 4,
  },
  autoStartPhases: true,
};

export {
  pomodoroConstants,
  initialPomodoroSessionData,
  defaultPomodoroConfiguration,
};
