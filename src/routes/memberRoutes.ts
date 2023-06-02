import { Router } from "express";
import { authValidators, memberValidators } from "../validators";
import { memberController } from "../controllers";

const memberRoutes = Router()

memberRoutes.route('/member').get(memberValidators.get, memberController.get)
memberRoutes.route('/member/register/:id').post(memberValidators.register, authValidators.auth, authValidators.teamLeader, memberController.register)
memberRoutes.route('/member/changeschedule/:id').post(memberValidators.changeDesiredSchedule, authValidators.auth, authValidators.member, memberController.changeDesiredSchedule)
memberRoutes.route('/member/:id').delete(memberValidators.delete, authValidators.auth, authValidators.teamLeader, memberController.delete)

export { memberRoutes }