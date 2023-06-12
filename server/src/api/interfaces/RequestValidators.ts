import { AnyZodObject } from "zod";

/**
 * Interface for the request validators which should be Zod objects
 * Contains the validators for the params, body and query
 * @see https://zod.dev/
 */
export default interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}
