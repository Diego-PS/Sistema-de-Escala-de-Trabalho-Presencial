import { Router } from "express";
import { teamLeaderValidators } from "../validators/teamLeaderValidators";
import { teamLeaderController } from "../controllers/teamLeaderController";

const teamLeaderRoutes = Router()

teamLeaderRoutes.route('/teamleader').get(teamLeaderValidators.get, teamLeaderController.get)
teamLeaderRoutes.route('/teamleader/register/:id').post(teamLeaderValidators.register, teamLeaderController.register)
teamLeaderRoutes.route('/teamleader/members/:id').get(teamLeaderValidators.getMembers, teamLeaderController.getMembers)
teamLeaderRoutes.route('/teamleader/changeschedule/:id').patch(teamLeaderValidators.changeTeamSchedule, teamLeaderController.changeTeamSchedule)
teamLeaderRoutes.route('/teamleader/changerules/:id').patch(teamLeaderValidators.changeTeamRules, teamLeaderController.changeTeamRules)
teamLeaderRoutes.route('/teamleader/:id').delete(teamLeaderValidators.delete, teamLeaderController.delete)

export { teamLeaderRoutes }