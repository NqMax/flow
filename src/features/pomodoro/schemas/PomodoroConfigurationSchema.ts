import { z } from "zod/v4";

const timerDurationSchema = z.int().gte(0);

const intFromStringOrNumber = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .pipe(timerDurationSchema);

const PomodoroConfigurationSchema = z.object({
  work: z.object({
    duration: intFromStringOrNumber,
  }),
  break: z.object({
    duration: intFromStringOrNumber,
  }),
  longBreak: z.object({
    duration: intFromStringOrNumber,
    frequency: intFromStringOrNumber,
  }),
  autoStartPhases: z.boolean(),
  allowNotifications: z.boolean(),
});

export { PomodoroConfigurationSchema };
