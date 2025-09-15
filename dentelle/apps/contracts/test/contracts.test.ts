import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Contracts', () => {
  it('emits events on update and contributions', async () => {
    const [admin, user, investor] = await ethers.getSigners();

    const Rule = await ethers.getContractFactory('EspRulebook');
    const now = Math.floor(Date.now() / 1000);
    const rule = await Rule.deploy(admin.address, {
      grantFmvUsd: 100_00,
      startAt: now,
      purchaseAt: now + 1000,
      discountBp: 1500,
      lookback: true,
      annualCapUsd: 25_000_00,
    });

    await expect(
      rule.updatePlan({
        grantFmvUsd: 200_00,
        startAt: now,
        purchaseAt: now + 2000,
        discountBp: 1500,
        lookback: false,
        annualCapUsd: 25_000_00,
      }),
    ).to.emit(rule, 'PlanUpdated');

    await expect(rule.recordContribution(user.address, 123_45)).to.emit(
      rule,
      'ContributionRecorded',
    );

    const Registry = await ethers.getContractFactory('InvestorCommitmentRegistry');
    const reg = await Registry.deploy(admin.address);
    await (await reg.setWhitelisted(investor.address, true)).wait();
    await expect(reg.connect(investor).commit(1, 1000)).to.emit(reg, 'Committed');

    const Anchor = await ethers.getContractFactory('DistributionAnchor');
    const anchor = await Anchor.deploy(admin.address);
    await expect(anchor.anchor(1, ethers.keccak256(ethers.toUtf8Bytes('root')), 'uri'))
      .to.emit(anchor, 'Anchored');
  });
});
