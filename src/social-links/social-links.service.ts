import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { SocialLink } from '../generated/prisma/client.js';
import { AddSocialLinkInput } from './dto/add-social-link.input.js';
import { UpdateSocialLinkInput } from './dto/update-social-link.input.js';

@Injectable()
export class SocialLinksService {
  private readonly logger = new Logger(SocialLinksService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Adds a social link to a digital card owned by the specified user.
   *
   * @param userId Owner user identifier
   * @param cardId Digital card identifier
   * @param input Social link creation input
   * @returns Created social link
   * @throws NotFoundException When the card does not exist or does not belong to the user
   */
  public async addSocialLink(
    userId: string,
    cardId: string,
    input: AddSocialLinkInput,
  ): Promise<SocialLink> {
    const card = await this.prisma.digitalCard.findFirst({ where: { id: cardId, userId } });
    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    const socialLink = await this.prisma.socialLink.create({
      data: {
        cardId: card.id,
        platform: input.platform,
        url: input.url,
      },
    });

    this.logger.log(
      `Social link created [id=${socialLink.id}, cardId=${card.id}, userId=${userId}]`,
    );

    return socialLink;
  }

  /**
   * Updates a social link belonging to a digital card owned by the specified user.
   *
   * Only fields provided in the input are updated.
   *
   * @param userId Owner user identifier
   * @param socialLinkId Social link identifier
   * @param input Partial social link update input
   * @returns Updated social link
   * @throws NotFoundException When the social link does not exist or does not belong to the user
   */
  public async updateSocialLink(
    userId: string,
    socialLinkId: string,
    input: UpdateSocialLinkInput,
  ): Promise<SocialLink> {
    const socialLink = await this.prisma.socialLink.findFirst({
      where: { id: socialLinkId, card: { userId } },
    });

    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    const updatedSocialLink = await this.prisma.socialLink.update({
      where: { id: socialLink.id },
      data: input,
    });

    this.logger.log(
      `Social link updated [id=${socialLink.id}, cardId=${socialLink.cardId}, userId=${userId}]`,
    );

    return updatedSocialLink;
  }

  /**
   * Deletes a social link belonging to a digital card owned by the specified user.
   *
   * @param userId Owner user identifier
   * @param socialLinkId Social link identifier
   * @throws NotFoundException When the social link does not exist or does not belong to the user
   */
  public async deleteSocialLink(userId: string, socialLinkId: string): Promise<void> {
    const socialLink = await this.prisma.socialLink.findFirst({
      where: { id: socialLinkId, card: { userId } },
    });

    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    await this.prisma.socialLink.delete({ where: { id: socialLink.id } });

    this.logger.log(
      `Social link deleted [id=${socialLink.id}, cardId=${socialLink.cardId}, userId=${userId}]`,
    );
  }
}
