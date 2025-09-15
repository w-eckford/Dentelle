import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const employer = await prisma.employer.create({ data: { name: 'Acme Corp', domains: ['acme.com'] } });
  const plan = await prisma.plan.create({
    data: {
      employerId: employer.id,
      discountBp: 1500,
      lookback: true,
      pctCap: 15,
      annualCapUsd: 2500000,
      holdingPolicy: 'NONE',
    },
  });
  const offering = await prisma.offering.create({
    data: {
      planId: plan.id,
      grantFmvUsd: 10000,
      startAt: new Date(),
      purchaseAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      status: 'DRAFT',
    },
  });
  console.log({ employer, plan, offering });
}

main().finally(async () => prisma.$disconnect());

