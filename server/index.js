import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import generalRoutes from "./routes/general.js";
import incomeRoutes from "./routes/income.js";
import managementRoutes from "./routes/management.js";

// data imports
import User from "./models/User.js";
import { dataUser } from "./data/index.js";
import Payment from "./models/Payment.js";
import { dataPayment } from "./data/index.js";
import Invoice from "./models/Invoice.js";
import { dataInvoice } from "./data/index.js";

/*config*/
dotenv.config();
const app = express();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*routes*/
//app.use("/auth", authRoutes);
app.use("/general", generalRoutes);
app.use("/income", incomeRoutes);
app.use("/management", managementRoutes);

/*mongoose setup*/
app.use(errorHandler);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* insert mock data */
    //User.insertMany(dataUser);
    //Payment.insertMany(dataPayment);
    //Invoice.insertMany(dataInvoice);
  })
  .catch((error) => console.log(`${error} did not connect`));
