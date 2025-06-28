import { z } from "zod/v4";
import { PomodoroConfigurationSchema } from "@/features/pomodoro/schemas/PomodoroConfigurationSchema";

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

type PomodoroConfiguration = z.infer<typeof PomodoroConfigurationSchema>;

export type {
  PomodoroPhase,
  PomodoroState,
  PomodoroSessionData,
  PomodoroConstants,
  PomodoroConfiguration,
};
