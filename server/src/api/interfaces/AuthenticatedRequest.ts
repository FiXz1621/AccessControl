import { Request } from "express";

/**
 * Interface for authenticated requests.
 * Extends the Request interface from Express.
 * @see https://expressjs.com/en/api.html#req
 * Adds a user object to the request, containing the user_id and role_id.
 */
export interface AuthenticatedRequest extends Request {
    user: {
        user_id: string;
        role_id: string;
    };
}
