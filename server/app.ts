import express, { NextFunction, Request, Response } from "express";
import router from "./routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", router);

app.listen(port, () => console.log(`Server listening at port ${port}`));
