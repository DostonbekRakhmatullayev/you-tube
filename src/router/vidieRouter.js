import { Router } from "express";
import { VIDEO, VIDEOGET, VIDEO__GET } from "../controllers/video.controllers.js";
import { errorHandlerMiddlewares } from "../middlewares/error.middlewares.js";


const router = Router()

router.post("/video/post", VIDEO)
router.get("/video/get", VIDEOGET)
router.get("/view/:id", VIDEO__GET)

router.use(errorHandlerMiddlewares)


export default router


