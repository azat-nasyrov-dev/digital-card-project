import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDigitalCardInput } from './dto/create-digital-card.input.js';
import { UpdateDigitalCardInput } from './dto/update-digital-card.input.js';
import { Prisma } from '../generated/prisma/client.js';
import type { DigitalCardWithSocialLinksType } from './types/digital-card-with-social-links.type.js';
import type { PrismaDriverAdapterUniqueConstraintMetaType } from './types/prisma-driver-adapter-unique-constraint-meta.type.js';

@Injectable()
export class DigitalCardsService {
  private readonly logger = new Logger(DigitalCardsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a digital card for the specified user.
   *
   * The created card includes its social links, which are empty for a newly created card.
   *
   * @param userId Owner user identifier
   * @param input Digital card creation input
   * @returns Created digital card with its social links
   * @throws ConflictException When the slug is already in use or the user already has a digital card
   */
  public async createDigitalCard(
    userId: string,
    input: CreateDigitalCardInput,
  ): Promise<DigitalCardWithSocialLinksType> {
    try {
      const card = await this.prisma.digitalCard.create({
        data: {
          userId,
          slug: input.slug,
          title: input.title,
          bio: input.bio,
          phone: input.phone,
          email: input.email,
        },
        include: { socialLinks: true },
      });

      this.logger.log(`Digital card created [id=${card.id}, userId=${userId}]`);

      return card;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        console.dir(err.meta, { depth: null });
        const meta = err.meta as PrismaDriverAdapterUniqueConstraintMetaType | undefined;
        const constraintIndex = meta?.driverAdapterError?.cause?.constraint?.index;

        if (constraintIndex === 'digital_cards_user_id_key') {
          throw new ConflictException('User already has a digital card');
        }

        if (constraintIndex === 'digital_cards_slug_key') {
          throw new ConflictException('Slug already exists');
        }

        throw new ConflictException('Digital card already exists');
      }

      throw err;
    }
  }

  /**
   * Finds the digital card owned by the specified user with its social links.
   *
   * @param userId Owner user identifier
   * @returns Digital card with social links
   * @throws NotFoundException When the user has no digital card
   */
  public async getMyDigitalCard(userId: string): Promise<DigitalCardWithSocialLinksType> {
    const card = await this.prisma.digitalCard.findUnique({
      where: { userId },
      include: { socialLinks: true },
    });

    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    return card;
  }

  /**
   * Finds a public digital card by its slug with its social links.
   *
   * @param slug Public card slug
   * @returns Digital card with social links
   * @throws NotFoundException When the card does not exist
   */
  public async getDigitalCard(slug: string): Promise<DigitalCardWithSocialLinksType> {
    const card = await this.prisma.digitalCard.findUnique({
      where: { slug },
      include: { socialLinks: true },
    });

    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    return card;
  }

  /**
   * Updates a digital card owned by the specified user.
   *
   * Only fields provided in the input are updated. The returned card includes its social links.
   *
   * @param userId Owner user identifier
   * @param cardId Digital card identifier
   * @param input Partial digital card update input
   * @returns Updated digital card with its social links
   * @throws NotFoundException When the card does not exist or does not belong to the user
   * @throws ConflictException When the specified slug is already in use
   */
  public async updateDigitalCard(
    userId: string,
    cardId: string,
    input: UpdateDigitalCardInput,
  ): Promise<DigitalCardWithSocialLinksType> {
    const card = await this.prisma.digitalCard.findFirst({ where: { id: cardId, userId } });
    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    try {
      const updatedCard = await this.prisma.digitalCard.update({
        where: { id: card.id },
        data: input,
        include: { socialLinks: true },
      });

      this.logger.log(`Digital card updated [id=${card.id}, userId=${userId}]`);

      return updatedCard;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('Slug already exists');
      }

      throw err;
    }
  }

  /**
   * Deletes a digital card owned by the specified user.
   *
   * Deleting the card also removes all associated social links through the database cascade delete constraint.
   *
   * @param userId Owner user identifier
   * @param cardId Digital card identifier
   * @throws NotFoundException When the card does not exist or does not belong to the user
   */
  public async deleteDigitalCard(userId: string, cardId: string): Promise<void> {
    const card = await this.prisma.digitalCard.findFirst({ where: { id: cardId, userId } });
    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    await this.prisma.digitalCard.delete({ where: { id: card.id } });

    this.logger.log(`Digital card deleted [id=${card.id}, userId=${userId}]`);
  }
}
