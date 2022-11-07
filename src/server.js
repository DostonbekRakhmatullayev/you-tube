import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"
// import { errorHandler } from "./errors/errorHandler.js";
// import { errorHandlerMiddlewares } from "./middlewares/error.middlewares.js";
// import { read, write } from "./utils/FS.js";
// import { usrsPost } from "./validate/validate.js";
// import sha256 from "sha256";
// import path from "path";
import  usersRouter from "./router/usersRouter.js"
import vidieRouter from "./router/vidieRouter.js"
dotenv.config()

const app = express();
app.use(fileUpload());
app.use(express.json());

app.use(usersRouter)
app.use(vidieRouter)

// app.use(errorHandlerMiddlewares);

app.all("/*", (req, res, next) => {
  res.status(500).json({
    message: req.url + " is not found",
  });
});

app.listen(9090, console.log(9090));
