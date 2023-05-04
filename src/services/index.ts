import { bossRepository, memberRepository, teamLeaderRepository } from "../repositories";
import { BossServices } from "./bossServices";
import { MemberServices } from "./memberServices";
import { TeamLeaderServices } from "./teamLeaderServices";

export const bossServices = new BossServices(bossRepository)
export const teamLeaderServices = new TeamLeaderServices(teamLeaderRepository)
export const memberServices = new MemberServices(memberRepository)