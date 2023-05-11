import { Router } from "express";
import { bossValidators } from "../validators";
import { bossController } from "../controllers";

const bossRoutes = Router()

bossRoutes.route('/boss').get(bossValidators.get, bossController.get)
bossRoutes.route('/boss/register').post(bossValidators.register, bossController.register)
bossRoutes.route('/boss/teamleaders/:id').get(bossValidators.getTeamLeaders, bossController.getTeamLeaders)
bossRoutes.route('/boss/changerules/:id').patch(bossValidators.changeOrganizationRules, bossController.changeOrganizationRules)
bossRoutes.route('/boss/:id').delete(bossValidators.delete, bossController.delete)

export { bossRoutes }