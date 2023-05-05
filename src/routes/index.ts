import { Router } from "express";
import { bossRoutes } from "./bossRoutes";

const router = Router()

router.use(bossRoutes)

export { router }