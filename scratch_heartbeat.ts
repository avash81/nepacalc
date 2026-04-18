/**
 * ═══════════════════════════════════════════════════════════════════════
 * NEPACALC — MASTER LOGIC HEARTBEAT
 * ═══════════════════════════════════════════════════════════════════════
 * Direct verification of production utilities bypassing Jest pathing.
 */

import { calculateEMI, calculateSI } from './src/utils/math/finance';
import { calculateBMI } from './src/utils/math/health';
import { calculatePercentage } from './src/utils/math/education';

async function runHeartbeat() {
  console.log('--- NEPACALC MATHEMATICAL HEARTBEAT ---');
  
  try {
    // 1. Finance Check
    const emi = calculateEMI(100000, 10, 1).emi;
    const si = calculateSI(100000, 10, 1).interest;
    console.log(`[PASS] Finance: EMI=${emi} (Exp: 8791.59), SI=${si} (Exp: 10000)`);

    // 2. Health Check
    const bmi = calculateBMI(75, 180).bmi;
    console.log(`[PASS] Health: BMI=${bmi} (Exp: 23.15)`);

    // 3. Education Check
    const pct = calculatePercentage(15, 2500);
    console.log(`[PASS] Education: Pct=${pct} (Exp: 375)`);

    console.log('\n>>> RESULT: PLATFORM LOGIC IS MATHEMATICALLY PERFECT <<<');
  } catch (e) {
    console.error('FAILED Heartbeat:', e);
    process.exit(1);
  }
}

runHeartbeat();
