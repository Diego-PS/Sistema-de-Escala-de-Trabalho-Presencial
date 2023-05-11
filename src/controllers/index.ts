import { bossServices, memberServices, teamLeaderServices } from "../services";
import { BossController } from "./bossController";
import { MemberController } from "./memberController";
import { TeamLeaderController } from "./teamLeaderController";

export const bossController = new BossController(bossServices)
export const teamLeaderController = new TeamLeaderController(teamLeaderServices)
export const memberController = new MemberController(memberServices)