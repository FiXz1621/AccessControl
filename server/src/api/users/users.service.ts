import sql from "../../db";

import { User, UserForDBUpdate, UserForUpdate } from "./users.model";
import ServiceResponse from "../interfaces/ServiceResponse";

/**
 * This function returns all the users in the database
 * @returns {Promise<ServiceResponse<User[]>>} All the users in the database
 */
export async function findAll(): Promise<ServiceResponse<User[]>> {
  let users: User[] = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    users = await sql<User[]>`SELECT * FROM tfg.users ORDER BY username ASC`;
    if (!users) {
      statusCode = 404;
      errorMessage = "Users not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: users, errorMessage };
  }
}

/**
 * This function returns the user with the given id
 * @param {string} id The id of the user
 * @returns {Promise<ServiceResponse<User>>} The user with the given id
 */
export async function findById(id: string): Promise<ServiceResponse<User>> {
  let user: User = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      User[]
    >`SELECT * FROM tfg.users WHERE ${sql`user_id`} = ${id}`;
    if (result.length > 0) {
      user = result[0];
    }
    if (!user) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: user, errorMessage };
  }
}

/**
 * This function returns the user with the given username
 * @param {string} username The username of the user
 * @returns {Promise<ServiceResponse<User>>} The user with the given username
 */
export async function findByUsername(username: string): Promise<ServiceResponse<User>> {
  let user: User = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      User[]
    >`SELECT * FROM tfg.users WHERE ${sql`username`} = ${username}`;
    
    if (result.length > 0) {
      user = result[0];
    }
    if (!user) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: user, errorMessage };
  }
}

/**
 * This function returns the user with the given Card Number
 * @param {string} cardNumber The Card Number of the user
 * @returns {Promise<ServiceResponse<User>>} The user with the given Card Number
 */
export async function findByCardNumber(
  cardNumber: string
): Promise<ServiceResponse<User>> {
  let user: User = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    const result = await sql<
      User[]
    >`SELECT * FROM tfg.users WHERE ${sql`card_number`} = ${cardNumber}`;

    if (result.length > 0) {
      user = result[0];
    }

    if (!user) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: user, errorMessage };
  }
}

/**
 * This function returns the user with the given PIN code
 * @param {string} pinCode The PIN code of the user
 * @returns {Promise<ServiceResponse<User>>} The user with the given PIN code
 */
export async function findByPinCode(
  pinCode: string
): Promise<ServiceResponse<User>> {
  let user: User = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    const result = await sql<
      User[]
    >`SELECT * FROM tfg.users WHERE ${sql`pin_code`} = ${pinCode}`;

    if (result.length > 0) {
      user = result[0];
    }

    if (!user) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: user, errorMessage };
  }
}

/**
 * This function creates a new user in the database
 * @param {User} user The user to create
 * @returns {Promise<ServiceResponse<User>>} The created user
 */
export async function create(user: User): Promise<ServiceResponse<User>> {
  let newUser: User = null;
  let statusCode = 201;
  let errorMessage = null;

  try {
    const result = await sql<User[]>`INSERT INTO tfg.users ${sql(user)} RETURNING *`;
    newUser = result[0];
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: newUser, errorMessage };
  }
}

/**
 * This function updates the user with the given id
 * @param {string} id The id of the user to update
 * @param {UserForUpdate} user The user with the new data
 * @returns {Promise<ServiceResponse<User>>} The updated user
 */
export async function update(
  id: string,
  user: UserForDBUpdate
): Promise<ServiceResponse<User>> {
  let updatedUser: User = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    // set columns to update manually
    const result = await sql<User[]>`UPDATE tfg.users SET ${sql(
      user
    )} WHERE ${sql`user_id`} = ${id} RETURNING *`;
    updatedUser = result[0];
    if (!updatedUser) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: updatedUser, errorMessage };
  }
}

/**
 * This function removes the user with the given id
 * @param {string} id The id of the user to remove
 * @returns {Promise<ServiceResponse<User>>} The removed user
 */
export async function remove(id: string): Promise<ServiceResponse<User>> {
  let user: User = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    const result = await sql<
      User[]
    >`DELETE FROM tfg.users WHERE ${sql`user_id`} = ${id} RETURNING *`;
    user = result[0];
    if (!user) {
      statusCode = 404;
      errorMessage = "User not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: user, errorMessage };
  }
}
