import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsPath = path.join(
      path.dirname(path.dirname(fileURLToPath(import.meta.url))),
      "logs"
    );
    if (!fs.existsSync(logsPath)) {
      await fsPromises.mkdir(logsPath);
    }
    await fsPromises.appendFile(path.join(logsPath, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  /*    if (req.method === "GET") {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  }
  if (req.method === "POST") {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  }
  next();  */

  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};
