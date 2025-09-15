import { Injectable } from '@nestjs/common';

type AdvanceResult = { ok: true; provider: string; reference: string };

@Injectable()
export class FundingService {
  private mode = process.env.FUNDING_MODE || 'mock';

  async advance(employeeId: string, payrollCycleId: string, amount: number): Promise<AdvanceResult> {
    if (this.mode === 'mock') {
      return { ok: true, provider: 'mock', reference: `adv_${employeeId}_${payrollCycleId}` };
    }
    // TODO: integrate SPV provider
    return { ok: true, provider: 'spv', reference: `spv_${employeeId}_${payrollCycleId}` };
  }

  async repay(reference: string, amount: number): Promise<{ ok: true; reference: string }> {
    return { ok: true, reference };
  }
}

