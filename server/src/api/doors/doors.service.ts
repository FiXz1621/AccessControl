import sql from "../../db";

import { Door } from "./doors.model";
import ServiceResponse from "../interfaces/ServiceResponse";
import { formatDateToSQL } from "../../util";

/**
 * This function returns all the doors in the database
 * @returns {Promise<ServiceResponse<Door[]>>} All the doors in the database
 */
export async function findAll(): Promise<ServiceResponse<Door[]>> {
  let doors: Door[] = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    doors = await sql<Door[]>`SELECT * FROM tfg.doors ORDER BY door_location ASC`;
    if (!doors) {
      statusCode = 404;
      errorMessage = "Doors not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: doors, errorMessage };
  }
}

/**
 * This function returns the door with the given id
 * @param {string} id The id of the door
 * @returns {Promise<ServiceResponse<Door>>} The door with the given id
 * */
export async function findById(id: string): Promise<ServiceResponse<Door>> {
  let door: Door = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      Door[]
    >`SELECT * FROM tfg.doors WHERE ${sql`door_id`} = ${id}`;
    if (result.length > 0) {
      door = result[0];
    }
    if (!door) {
      statusCode = 404;
      errorMessage = "Door not found";
    }
  } catch (error) {    
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: door, errorMessage };
  }
}

/**
 * This function creates a new door in the database
 * @param {Door} door The door to be created
 * @returns {Promise<ServiceResponse<Door>>} The created door
 * */
export async function create(door: Door): Promise<ServiceResponse<Door>> {
  let insertedDoor: Door = null;
  let statusCode = 201;
  let errorMessage = null;
  try {
    const result = await sql<Door[]>`INSERT INTO tfg.doors ${sql(door)} RETURNING *`;
    insertedDoor = result[0];
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: insertedDoor, errorMessage };
  }
}

/**
 * This function updates the door with the given id
 * @param {string} id The id of the door
 * @param {Door} door The door with the updated information
 * @returns {Promise<ServiceResponse<Door>>} The updated door
 * */
export async function update(
  id: string,
  door: Door
): Promise<ServiceResponse<Door>> {
  let updatedDoor: Door = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<Door[]>`UPDATE tfg.doors SET ${sql(
      door
    )} WHERE ${sql`door_id`} = ${id} RETURNING *`;
    updatedDoor = result[0];
    if (!updatedDoor) {
      statusCode = 404;
      errorMessage = "Door not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: updatedDoor, errorMessage };
  }
}

export async function updateDoorLastAccess(door_id: string) {
  let updatedDoor: Door = null;
  let statusCode = 200;
  let errorMessage = null;

  const now = formatDateToSQL(new Date());

  try {
    const result = await sql<Door[]>`UPDATE tfg.doors SET last_opened = ${now} WHERE ${sql`door_id`} = ${door_id} RETURNING *`;
    updatedDoor = result[0];
    if (!updatedDoor) {
      statusCode = 404;
      errorMessage = "Door not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: updatedDoor, errorMessage };
  }
}

/**
 * This function deletes the door with the given id
 * @param {string} id The id of the door
 * @returns {Promise<ServiceResponse<Door>>} The deleted door
 * */
export async function remove(id: string): Promise<ServiceResponse<Door>> {
  let deletedDoor: Door = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      Door[]
    >`DELETE FROM tfg.doors WHERE ${sql`door_id`} = ${id} RETURNING *`;
    deletedDoor = result[0];
    if (!deletedDoor) {
      statusCode = 404;
      errorMessage = "Door not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: deletedDoor, errorMessage };
  }
}
