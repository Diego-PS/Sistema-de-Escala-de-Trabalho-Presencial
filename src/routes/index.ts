import { Router } from "express";
import { bossRoutes } from "./bossRoutes";
import { teamLeaderRoutes } from "./teamLeaderRoutes";

const router = Router()

router.use(bossRoutes)
router.use(teamLeaderRoutes)

export { router }