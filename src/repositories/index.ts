import { BossRepository } from "./bossRepository";
import { TeamLeaderRepository } from "./teamLeaderRepository";
import { MemberRepository } from "./memberRepository";
// import { UserRepository } from "./userRepository";

// export const userRepository = new UserRepository()
export const memberRepository = new MemberRepository()
export const bossRepository = new BossRepository()
export const teamLeaderRepository = new TeamLeaderRepository()