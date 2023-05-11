import { Router } from "express";
import { bossRoutes } from "./bossRoutes";
import { teamLeaderRoutes } from "./teamLeaderRoutes";
import { memberRoutes } from "./memberRoutes";

const router = Router()

router.use(bossRoutes)
router.use(teamLeaderRoutes)
router.use(memberRoutes)

export { router }