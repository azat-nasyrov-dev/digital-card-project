import type { Prisma } from '../../generated/prisma/client.js';

export type DigitalCardWithSocialLinksType = Prisma.DigitalCardGetPayload<{
  include: {
    socialLinks: true;
  };
}>;
