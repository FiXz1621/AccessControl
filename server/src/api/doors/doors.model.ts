import * as z from "zod";

export const Door = z.object({
  door_id: z.string().uuid(),
  door_location: z.string().max(255),
  access_level: z.number(),
  last_opened: z.string().datetime().or(z.null()).or(z.undefined()),
});

export type Door = z.infer<typeof Door>;

export const rawDoor = z.object({
  door_location: z.string().max(255),
  access_level: z.number(),
});

export type RawDoor = z.infer<typeof rawDoor>;
