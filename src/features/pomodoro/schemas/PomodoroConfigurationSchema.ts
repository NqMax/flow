import { z } from "zod/v4";

const intFromStringOrNumber = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .pipe(z.int().gte(0));

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
});

export { PomodoroConfigurationSchema };
