import { Router } from "express";
import { authValidators, bossValidators } from "../validators";
import { bossController } from "../controllers";

const bossRoutes = Router()

bossRoutes.route('/boss').get(bossValidators.get, bossController.get)
bossRoutes.route('/boss/register').post(bossValidators.register, bossController.register)
bossRoutes.route('/boss/teamleaders/:id').get(bossValidators.getTeamLeaders, authValidators.auth, authValidators.boss, bossController.getTeamLeaders)
bossRoutes.route('/boss/changerules/:id').patch(bossValidators.changeOrganizationRules, authValidators.auth, authValidators.boss, bossController.changeOrganizationRules)
bossRoutes.route('/boss/:id').delete(bossValidators.delete, authValidators.auth, authValidators.boss, bossController.delete)

export { bossRoutes }