type PomodoroPhase = "work" | "break" | "longBreak";

type PomodoroState = "uninitialized" | "stopped" | "paused" | "running";

type PomodoroSessionData = {
  [key in PomodoroPhase]: {
    completedPhases: number;
  };
};

type PomodoroConstants = {
  [key in PomodoroPhase]: {
    key: PomodoroPhase;
    nextPhase?: PomodoroPhase;
    readableName: string;
  };
};

interface PomodoroConfiguration {
  work: {
    duration: number;
  };
  break: {
    duration: number;
  };
  longBreak: {
    duration: number;
    frequency: number;
  };
  autoStartPhases: boolean;
}

export type {
  PomodoroPhase,
  PomodoroState,
  PomodoroSessionData,
  PomodoroConstants,
  PomodoroConfiguration,
};
