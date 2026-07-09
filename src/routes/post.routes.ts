import {Router} from "express"
import * as PostController from "../controllers/post.controller.js"

const router = Router()

router.post("/", PostController.createPost)
router.get("/", PostController.getAllPost)

export default router;