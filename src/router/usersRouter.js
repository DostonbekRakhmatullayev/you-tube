import { Router } from "express";
// import controller from "../controllers/users.controllers.js";
import {IMG_GET, LOGINPOST, SKACHAT, USERSGET, USERSPOSTS} from "../controllers/users.controllers.js";
import checktoken from "../middlewares/checktoken.js";
import { errorHandlerMiddlewares } from "../middlewares/error.middlewares.js";

const router = Router()

// router.get("/users/get", controller.USERSGET )
router.get("/users/get",   USERSGET )
router.post("/users/posts", USERSPOSTS)
router.post("/login/posts", LOGINPOST)
router.get("/view/:img", IMG_GET)
router.get("/download/:img", SKACHAT)


router.use(errorHandlerMiddlewares)

export default router
























