import { AuthParams } from "../interfaces/AuthParams";
import { Router } from "express";
import { validateRequest } from "../../middlewares";
import { findByUsername as findUserByUsername, findByCardNumber as findUserByCard, findByPinCode as findUserByPinCode, update } from "../users/users.service";
import { findById as findRoleById } from "../roles/roles.service";
import { findById as findDoorById, updateDoorLastAccess } from "../doors/doors.service";
import { create as createAccessRecord } from "../accessRecords/accessRecords.service";
import { compareHashedPassword, formatDateToSQL, generateToken, generateUUID } from "../../util";

const clientAuthorization = Router();

/**
 * This route validates the petition to open a door, it checks if the user exists and if the user has the access level to open the door
 * */
clientAuthorization.post(
  "/",
  validateRequest({
    body: AuthParams,
  }),

  async (req, res) => {
    const doorId = req.body.door_id;
    const identification = req.body.identification;
    let user: { user_id: string, username: string } = { user_id: null, username: null };
    let door: { door_id: string, door_location: string} = {door_id : null, door_location: null};
    door.door_id = doorId;
    let authorized = false;

    switch (identification.length) {
      case 5:
        authorized = await authorizePinCode(identification, door , user);
        break;
      case 8:
        authorized = await authorizeCardId(identification, door, user);
        break;
      default:
        break;
    }
    
    createAccessRecord({
      access_record_id: generateUUID(),
      username: user.username,
      door_location: door.door_location, 
      authorized,
      access_date: formatDateToSQL(new Date())
    });

    updateDoorLastAccess(door.door_id);
    res.json({ authorized });
  }
);

/**
 * This route validates the petition to login, it checks if the user exists and if the password is correct
 *  */
clientAuthorization.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { statusCode, body } = await findUserByUsername(username);
  if (statusCode !== 200) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const { user_id, hashed_password, role_id } = body;
  const isPasswordValid = await compareHashedPassword(password, hashed_password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = generateToken({ user_id, role_id });

  res.json({ token, user_id, role_id });
});

/**
 * This function validates the petition to open a door with a pin code, it checks if the door exists and if the user has the access level to open it
 * @param pinCode The pin code of the user
 * @param doorId The id of the door
 * @returns A boolean indicating if the user is authorized to open the door
 */
async function authorizePinCode(pinCode: string, door_object: { door_id: string, door_location: string}, user_object: { user_id: string,  username: string }): Promise<boolean> {
  const { statusCode: doorStatusCode, body: door } = await findDoorById(door_object.door_id);
  
  if (doorStatusCode !== 200) {
    return false;
  }

  door_object.door_location = door.door_location;

  const { statusCode: userStatusCode, body: user } = await findUserByPinCode(
    pinCode
  );
  if (userStatusCode !== 200) {
    return false;
  }

  user_object.username = user.username;

  const userAccessLevel = await getRoleAccessLevel(user.role_id);
  if (userAccessLevel == null) {
    return false;
  }

  const doorAccessLevel = door.access_level;
  if (doorAccessLevel == null) {
    return false;
  }

  return userAccessLevel >= doorAccessLevel;
}

/**
 * This function validates the petition to open a door with a card id, it checks if the door exists and if the user has the access level to open it
 * @param cardNumber The card number of the user
 * @param doorId The id of the door
 * @returns A boolean indicating if the user is authorized to open the door
 **/
async function authorizeCardId(cardNumber: string, door_object: { door_id: string, door_location: string}, user_object: { user_id: string,  username: string }): Promise<boolean> {
  const { statusCode: doorStatusCode, body: door } = await findDoorById(door_object.door_id);
  if (doorStatusCode !== 200) {
    return false;
  }

  door_object.door_location = door.door_location;

  const doorAccessLevel = door.access_level;
  if (doorAccessLevel == null) {
    return false;
  }

  const { statusCode: userStatusCode, body: user } = await findUserByCard(
    cardNumber
  );
  if (userStatusCode !== 200) {
    return false;
  }

  user_object.username = user.username;

  const userAccessLevel = await getRoleAccessLevel(user.role_id);
  if (userAccessLevel == null) {
    return false;
  }

  return userAccessLevel >= doorAccessLevel;
}

/**
 * This function gets the access level of a role
 * @param roleId The id of the role
 * @returns The access level of the role or null if the role doesn't exist
 * */
async function getRoleAccessLevel(roleId: string): Promise<number | null> {
  const { statusCode, body } = await findRoleById(roleId);
  if (statusCode !== 200) {
    return null;
  }
  return body.access_level;
}

export default clientAuthorization;
