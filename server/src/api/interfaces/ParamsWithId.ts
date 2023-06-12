import * as z from 'zod';

/**
 * Interface for the parameters of the request
 * Contains the id of the entity
 */
export const ParamsWithId = z.object({
  id: z.string().uuid(),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
