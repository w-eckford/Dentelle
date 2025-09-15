import { Injectable } from '@nestjs/common';

@Injectable()
export class BrokerService {
  private mode = process.env.BROKER_MODE || 'mock';

  async generateInstruction(offeringId: string) {
    if (this.mode === 'mock') {
      return { fileUri: `mock://instruction/${offeringId}.json`, rows: [] };
    }
    // file mode: export file path (stub)
    return { fileUri: `file://instruction/${offeringId}.json`, rows: [] };
  }

  async executeInstruction(_fileUri: string) {
    // Simulate immediate fills
    return { ok: true, fills: [] };
  }
}

