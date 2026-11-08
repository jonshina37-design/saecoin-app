import { sac, type Units } from "./units.js";

export const FOUNDER_ACCOUNT = "FOUNDER";

/** Spec section 3.1 (opening balances recorded in Genesis Block 0). */
export const GENESIS_BALANCES: Record<string, Units> = {
  FOUNDER: sac(12_000_000),
  REGULAR_POOL: sac(12_960_000),
  REFERRAL_POOL: sac(4_320_000),
  TASK_POOL: sac(1_720_000),
};
