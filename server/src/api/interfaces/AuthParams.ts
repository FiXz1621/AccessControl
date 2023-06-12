import * as z from "zod";

/**
 * Interface for the authentication parameters in the request body of the authentication with the door
 */
export const AuthParams = z.object({
  door_id: z.string().uuid(),
  identification: z
    .string()
    .regex(/^\d{8}$/)
    .or(z.string().min(5).max(5)),
});
