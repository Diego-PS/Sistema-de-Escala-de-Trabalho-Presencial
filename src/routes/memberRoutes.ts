import { Router } from "express";
import { memberValidators } from "../validators";
import { memberController } from "../controllers";

const memberRoutes = Router()

memberRoutes.route('/member').get(memberValidators.get, memberController.get)
memberRoutes.route('/member/register/:id').post(memberValidators.register, memberController.register)
memberRoutes.route('/member/changeschedule/:id').patch(memberValidators.changeDesiredSchedule, memberController.changeDesiredSchedule)
memberRoutes.route('/member/:id').delete(memberValidators.delete, memberController.delete)

export { memberRoutes }