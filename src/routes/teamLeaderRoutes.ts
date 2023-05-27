import { Router } from "express";
import { authValidators, teamLeaderValidators } from "../validators";
import { teamLeaderController } from "../controllers";


const teamLeaderRoutes = Router()

teamLeaderRoutes.route('/teamleader').get(teamLeaderValidators.get, teamLeaderController.get)
teamLeaderRoutes.route('/teamleader/register/:id').post(teamLeaderValidators.register, authValidators.auth, authValidators.boss, teamLeaderController.register)
teamLeaderRoutes.route('/teamleader/members/:id').get(teamLeaderValidators.getMembers, authValidators.auth, authValidators.teamLeader, teamLeaderController.getMembers)
teamLeaderRoutes.route('/teamleader/changeschedule/:id').patch(teamLeaderValidators.changeTeamSchedule, authValidators.auth, authValidators.teamLeader, teamLeaderController.changeTeamSchedule)
teamLeaderRoutes.route('/teamleader/changerules/:id').patch(teamLeaderValidators.changeTeamRules, authValidators.auth, authValidators.teamLeader, teamLeaderController.changeTeamRules)
teamLeaderRoutes.route('/teamleader/:id').delete(teamLeaderValidators.delete, authValidators.auth, authValidators.boss, teamLeaderController.delete)

export { teamLeaderRoutes }