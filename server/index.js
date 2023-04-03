import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
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
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*routes*/
app.use("/general", generalRoutes);
app.use("/income", incomeRoutes);
app.use("/management", managementRoutes);

/*file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  fiename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});*/

/*mongoose setup*/
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
