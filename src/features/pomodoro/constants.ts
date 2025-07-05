import type {
  PomodoroConstants,
  PomodoroConfiguration,
  PomodoroSessionData,
} from "@/features/pomodoro/types/pomodoroTypes";

const pomodoroConstants: PomodoroConstants = {
  work: {
    key: "work",
    readableName: "Pomodoro",
    notificationTitle: "Time to Focus!",
    notificationBody: "Your work session has started.",
  },
  break: {
    key: "break",
    nextPhase: "work",
    readableName: "Break",
    notificationTitle: "Break Time!",
    notificationBody: "Take a short break and recharge.",
  },
  longBreak: {
    key: "longBreak",
    nextPhase: "work",
    readableName: "Long Break",
    notificationTitle: "Long Break!",
    notificationBody: "Enjoy a longer break. You've earned it!",
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
  allowNotifications: false,
};

export {
  pomodoroConstants,
  initialPomodoroSessionData,
  defaultPomodoroConfiguration,
};
