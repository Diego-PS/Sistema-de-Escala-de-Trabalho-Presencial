import { BossValidators } from "./bossValidators";
import { MemberValidators } from "./memberValidators";
import { TeamLeaderValidators } from "./teamLeaderValidators";

export const bossValidators = new BossValidators()
export const teamLeaderValidators = new TeamLeaderValidators()
export const memberValidators = new MemberValidators()