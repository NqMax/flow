import { z } from "zod/v4";

const PomodoroConfigurationSchema = z.object({
  work: z.object({
    duration: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .pipe(z.number().gt(0)),
  }),
  break: z.object({
    duration: z.number(),
  }),
  longBreak: z.object({
    duration: z.number(),
    frequency: z.number(),
  }),
  autoStartPhases: z.boolean(),
});

export { PomodoroConfigurationSchema };
