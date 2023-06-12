import * as z from "zod";

export const AccessRecord = z.object({
  access_record_id: z.string().uuid(),
  username: z.string().max(50),
  door_location: z.string().max(255),
  access_date: z.string().datetime().optional(),
  authorized: z.boolean(),
});

export type AccessRecord = z.infer<typeof AccessRecord>;

export const rawAccessRecord = z.object({
  username: z.string().max(50),
  door_location: z.string().max(255),
  authorized: z.boolean(),
});

export type RawAccessRecord = z.infer<typeof rawAccessRecord>;
