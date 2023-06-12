import * as z from "zod";

export const User = z.object({
  user_id: z.string().uuid(),
  username: z.string().max(50),
  register_date: z.string().datetime({offset: true}),
  expiration_date: z.string().datetime({offset: true}).or(z.null()).or(z.undefined()),
  card_number: z.string().regex(/^\d{8}$/),
  role_id: z.string().uuid(),
  hashed_password: z.string().max(300),
  pin_code: z.string().regex(/^\d{5}$/),
});

export type User = z.infer<typeof User>;

export const RawUser = z.object({
  username: z.string().max(50),
  expiration_date: z.string().datetime({offset: true}).or(z.null()).or(z.undefined()),
  card_number: z.string().regex(/^\d{8}$/),
  role_id: z.string().uuid(),
  raw_password: z.string().max(300),
});

export type RawUser = z.infer<typeof RawUser>;


export const UserForUpdate = z.object({
  username: z.string().max(50),
  change_expiration: z.boolean(),
  expiration_date: z.string().datetime({offset: true}).or(z.null()).or(z.undefined()),
  password: z.string().max(300).or(z.null()).or(z.undefined()),
  role_id: z.string().uuid()
});

export type UserForUpdate = z.infer<typeof UserForUpdate>;

export const UserForDBUpdate = z.object({
  username: z.string().max(50),
  expiration_date: z.string().datetime({offset: true}).or(z.null()).or(z.undefined()),
  hashed_password: z.string().max(300).or(z.null()).or(z.undefined()),
  role_id: z.string().uuid()
});

export type UserForDBUpdate = z.infer<typeof UserForDBUpdate>;