import sql from "../../db";

import { Role } from "./roles.model";
import ServiceResponse from "../interfaces/ServiceResponse";

/**
 * This function returns all the roles in the database
 * @returns {Promise<ServiceResponse<Role[]>>} All the roles in the database
 */
export async function findAll(): Promise<ServiceResponse<Role[]>> {
  let roles: Role[] = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    roles = await sql<Role[]>`SELECT * FROM tfg.roles ORDER BY access_level DESC`;
    if (!roles) {
      statusCode = 404;
      errorMessage = "Roles not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: roles, errorMessage };
  }
}

/**
 * This function returns the role with the given id
 * @param {string} id The id of the role
 * @returns {Promise<ServiceResponse<Role>>} The role with the given id
 */
export async function findById(id: string): Promise<ServiceResponse<Role>> {
  let role: Role = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      Role[]
    >`SELECT * FROM tfg.roles WHERE ${sql`role_id`} = ${id}`;
    if (result.length > 0) {
      role = result[0];
    }
    if (!role) {
      statusCode = 404;
      errorMessage = "Role not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: role, errorMessage };
  }
}

/**
 * This function returns the role with the given name
 * @param {Role} role The role to be created
 * @returns {Promise<ServiceResponse<Role>>} The role with the given name
 */
export async function create(role: Role): Promise<ServiceResponse<Role>> {
  let insertedRole: Role = null;
  let statusCode = 201;
  let errorMessage = null;
  try {
    const result = await sql<Role[]>`INSERT INTO tfg.roles ${sql(role)} RETURNING *`;
    insertedRole = result[0];
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: insertedRole, errorMessage };
  }
}

/**
 * This function updates the role with the given id
 * @param {string} id The id of the role
 * @param {Role} role The role to be updated
 * @returns {Promise<ServiceResponse<Role>>} The updated role
 */
export async function update(
  id: string,
  role: Role
): Promise<ServiceResponse<Role>> {
  let updatedRole: Role = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<Role[]>`
      UPDATE tfg.roles
      SET ${sql(role)}
      WHERE ${ sql('role_id')} = ${id} RETURNING *`;
    updatedRole = result[0];
    if (!updatedRole) {
      statusCode = 404;
      errorMessage = "Role not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: updatedRole, errorMessage };
  }
}

/**
 * This function deletes the role with the given id
 * @param {string} id The id of the role
 * @returns {Promise<ServiceResponse<Role>>} The deleted role
 */
export async function remove(id: string): Promise<ServiceResponse<Role>> {
  let deletedRole: Role = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<Role[]>`
      DELETE FROM tfg.roles
      WHERE ${ sql('role_id')} = ${id} RETURNING *`;
    deletedRole = result[0];
    if (!deletedRole) {
      statusCode = 404;
      errorMessage = "Role not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: deletedRole, errorMessage };
  }
}
