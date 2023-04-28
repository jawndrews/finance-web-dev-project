import { rateLimit } from "express-rate-limit";
import { logEvents } from "./logger.js";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // one minute
  max: 5, // limit ip to 5 login requests per window per minute
  message: {
    message: "Too many login attempts. Please try again in 60 seconds.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: true,
});
