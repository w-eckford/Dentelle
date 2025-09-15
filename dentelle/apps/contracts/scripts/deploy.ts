import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with:', deployer.address);

  const EspRulebook = await ethers.getContractFactory('EspRulebook');
  const now = Math.floor(Date.now() / 1000);
  const rulebook = await EspRulebook.deploy(deployer.address, {
    grantFmvUsd: 100_00, // cents
    startAt: now,
    purchaseAt: now + 30 * 24 * 60 * 60,
    discountBp: 1500,
    lookback: true,
    annualCapUsd: 25_000_00,
  });
  await rulebook.waitForDeployment();
  console.log('EspRulebook:', await rulebook.getAddress());

  const Registry = await ethers.getContractFactory('InvestorCommitmentRegistry');
  const registry = await Registry.deploy(deployer.address);
  await registry.waitForDeployment();
  console.log('InvestorCommitmentRegistry:', await registry.getAddress());

  const Anchor = await ethers.getContractFactory('DistributionAnchor');
  const anchor = await Anchor.deploy(deployer.address);
  await anchor.waitForDeployment();
  console.log('DistributionAnchor:', await anchor.getAddress());
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

