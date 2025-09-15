import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

const rulebookAbi = [
  'function recordContribution(address user, uint256 usd) external',
  'function canSettle() view returns (bool)',
  'function markSettled() external',
];
const anchorAbi = ['function anchor(uint256 programId, bytes32 merkleRoot, string uri)'];

@Injectable()
export class ContractsService {
  private provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC_URL);
  private wallet = new ethers.Wallet(process.env.CHAIN_PRIVATE_KEY || '', this.provider);

  private rulebook = new ethers.Contract(
    process.env.RULEBOOK_ADDRESS || ethers.ZeroAddress,
    rulebookAbi,
    this.wallet,
  );
  private anchor = new ethers.Contract(
    process.env.DISTRIBUTION_ANCHOR_ADDRESS || ethers.ZeroAddress,
    anchorAbi,
    this.wallet,
  );

  async recordContribution(user: string, usd: number) {
    const tx = await this.rulebook.recordContribution(user, usd);
    return tx.wait();
  }

  async maybeSettle() {
    if (await this.rulebook.canSettle()) {
      const tx = await this.rulebook.markSettled();
      return tx.wait();
    }
    return null;
  }

  async anchorDistribution(programId: number, merkleRoot: string, uri: string) {
    const tx = await this.anchor.anchor(programId, merkleRoot, uri);
    return tx.wait();
  }
}

