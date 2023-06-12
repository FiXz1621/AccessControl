import sql from "../../db";

import { AccessRecord as AccessRecord } from "./accessRecords.model";
import ServiceResponse from "../interfaces/ServiceResponse";

/**
 * This function returns all the AccessRecords in the database
 * @returns {Promise<ServiceResponse<AccessRecord[]>>}
 */
export async function findAll(): Promise<ServiceResponse<AccessRecord[]>> {
  let accessRecords: AccessRecord[] = null;
  let statusCode = 200;
  let errorMessage = null;

  try {
    accessRecords = await sql<AccessRecord[]>`SELECT * FROM tfg.access_records`;
    if (!accessRecords) {
      statusCode = 404;
      errorMessage = "AccessRecords not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: accessRecords, errorMessage };
  }
}

/**
 * This function returns the AccessRecord with the given id
 * @param {string} id
 * @returns {Promise<ServiceResponse<AccessRecord>>}
 * */
export async function findById(
  id: string
): Promise<ServiceResponse<AccessRecord>> {
  let accessRecord: AccessRecord = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      AccessRecord[]
    >`SELECT * FROM tfg.access_records WHERE ${sql`access_record_id`} = ${id}`;
    if (result.length > 0) {
      accessRecord = result[0];
    }
    if (!accessRecord) {
      statusCode = 404;
      errorMessage = "AccessRecord not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: accessRecord, errorMessage };
  }
}

/**
 * This function creates a new AccessRecord in the database
 * @param {AccessRecord} accessRecord The AccessRecord to create
 * @returns {Promise<ServiceResponse<AccessRecord>>} The newly created AccessRecord
 * */
export async function create(
  accessRecord: AccessRecord
): Promise<ServiceResponse<AccessRecord>> {
  let insertedAccessRecord: AccessRecord = null;
  let statusCode = 201;
  let errorMessage = null;
  
  try {
    const result = await sql<
      AccessRecord[]
    >`INSERT INTO tfg.access_records ${sql(accessRecord) } RETURNING *`;
    insertedAccessRecord = result[0];
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: insertedAccessRecord, errorMessage };
  }
}

/**
 * This function updates the AccessRecord with the given id
 * @param {string} id The id of the AccessRecord to update
 * @param {AccessRecord} accessRecord The AccessRecord with the updated fields
 * @returns {Promise<ServiceResponse<AccessRecord>>} The updated AccessRecord
 * */
export async function update(
  id: string,
  accessRecord: AccessRecord
): Promise<ServiceResponse<AccessRecord>> {
  let updatedAccessRecord: AccessRecord = null;
  let statusCode = 200;
  let errorMessage = null;
  try {
    const result = await sql<
      AccessRecord[]
    >`UPDATE tfg.access_records SET ${sql(
      accessRecord
    )} WHERE ${sql`access_record_id`} = ${id} RETURNING *`;
    updatedAccessRecord = result[0];
    if (!updatedAccessRecord) {
      statusCode = 404;
      errorMessage = "AccessRecord not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  } finally {
    return { statusCode, body: updatedAccessRecord, errorMessage };
  }
}

/**
 * This function deletes the AccessRecord with the given id
 * @param {string} id The id of the AccessRecord to delete
 * @returns {Promise<ServiceResponse<AccessRecord>>} The deleted AccessRecord
 * */
export async function remove(id: string): Promise<ServiceResponse<AccessRecord>> {
  let statusCode = 200;
  let deletedAccessRecord: AccessRecord = null;
  let errorMessage = null;
  try {
    const result = await sql<
      AccessRecord[]
    >`DELETE FROM tfg.access_records WHERE ${sql`access_record_id`} = ${id} RETURNING *`;
    deletedAccessRecord = result[0];
    if (!deletedAccessRecord) {
      statusCode = 404;
      errorMessage = "AccessRecord not found";
    }
  } catch (error) {
    statusCode = 500;
    errorMessage = error.message;
  }
  return { statusCode, body: deletedAccessRecord, errorMessage };
}
