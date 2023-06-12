import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import * as UserService from "./api/users/users.service";

/**
 * Generates a hashed password from a raw password and a salt
 * @param password The raw password to be hashed
 * @returns A promise that resolves to the hashed password
 */
export async function generateHashedPassword(
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a raw password with a hashed password
 * @param password The raw password to be compared
 * @param hashedPassword The hashed password to be compared
 * @returns A promise that resolves to a boolean indicating if the passwords match
 */
export async function compareHashedPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generates a UUID v4
 * @returns The generated UUID v4
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)
 */
export function generateUUID(): string {
  return uuid();
}

/**
 * Formats a date to the SQL format
 * @param date The date to be formatted
 * @returns The formatted date
 */
export function formatDateToSQL(date: Date): string {
  try {
    // get the offset in minutes
    const offset = date.getTimezoneOffset();
    // convert that to milliseconds
    const offsetInMilliseconds = offset * 60 * 1000;
    // create a new date with the offset applied
    const dateWithOffset = new Date(date.getTime() - offsetInMilliseconds);
    // format the date to the SQL format we want
    return dateWithOffset.toISOString().slice(0, 19).replace("T", " ");
  } catch (error) {
    return null;
  }
}

/**
 * Generates a JWT token
 * @param payload The payload to be signed
 * @returns The generated JWT token
 * @see https://jwt.io/
 */
export function generateToken(payload: {
  user_id: string;
  role_id: string;
}): string {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "4h" });
  return token;
}

/**
 * Generates a unique 5-digit pin code
 * @returns The generated pin code
 */
export async function generateUniquePin(): Promise<string> {
  let pin: string;
  let isUnique: boolean = false;
  while (!isUnique) {
    // Generate a random 5-digit pin number in String format including leading zeros (e.g. "00001")
    pin = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const { statusCode } = await UserService.findByPinCode(pin);
    isUnique = statusCode !== 200;
  }
  return pin;
}