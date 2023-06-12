/**
 * ******************************************************
 * @name Access Control System API
 * @author @FiXz1621
 * @description This is the main entry point for the API
 * @version 1.0.0
 * @license Creative Commons BY-SA 4.0
 * ******************************************************
* */

import "dotenv/config";
import * as http from "http";
import * as https from "https";
import { readFileSync } from "fs";
import { join } from "path";
import onExit from "signal-exit";

import createApp from "./app";
import sql from "./db";

const app = createApp();

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

const credentials = {
  key: readFileSync(join(__dirname, "..", "cert", "key.pem")),
  cert: readFileSync(join(__dirname, "..", "cert", "cert.pem")),
};

const httpServer = http.createServer(app).listen(HTTP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});

const httpsServer = https
  .createServer(credentials, app)
  .listen(HTTPS_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
});

/**
 * This function is called when the process is terminated, 
 * it closes the database connection and the servers
 */
onExit(() => {
  console.log("Closing database");
  sql.end();
  console.log("Database closed");

  console.log("Closing servers");
  httpServer.close();
  httpsServer.close();
  console.log("Servers closed");
});
