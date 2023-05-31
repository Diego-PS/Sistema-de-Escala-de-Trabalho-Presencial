import { Router } from "express";
import { bossRoutes } from "./bossRoutes";
import { teamLeaderRoutes } from "./teamLeaderRoutes";
import { memberRoutes } from "./memberRoutes";
import { loginRoute } from "./loginRoute";

const router = Router()

router.use(bossRoutes)
router.use(teamLeaderRoutes)
router.use(memberRoutes)
router.use(loginRoute)

export { router }