import * as z from "zod";

export const Role = z.object({
  role_id: z.string().uuid(),
  role_name: z.string(),
  access_level: z.number(),
});

export type Role = z.infer<typeof Role>;

export const rawRole = z.object({
  role_name: z.string(),
  access_level: z.number(),
});

export type RawRole = z.infer<typeof rawRole>;
