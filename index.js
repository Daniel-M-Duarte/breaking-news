import express from "express";
import router from "./src/routes/userRoute.js";
import authRouter from "./src/routes/authRoute.js";
import connectDataBase from "./src/database/db.js";

import dotenv from "dotenv";

dotenv.config();

connectDataBase();

const app = express();

app.use(express.json());

app.use("/user", router);
app.use('/login', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
