import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DigitalCardsService } from './digital-cards.service.js';
import { CreateDigitalCardInput } from './dto/create-digital-card.input.js';
import { UpdateDigitalCardInput } from './dto/update-digital-card.input.js';
import { DigitalCardType } from './dto/digital-card.type.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.js';

@Resolver(() => DigitalCardType)
export class DigitalCardsResolver {
  constructor(private readonly digitalCardsService: DigitalCardsService) {}

  @Mutation(() => DigitalCardType)
  @UseGuards(JwtAuthGuard)
  public async createDigitalCard(
    @Args('input') input: CreateDigitalCardInput,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<DigitalCardType> {
    return await this.digitalCardsService.createDigitalCard(context.req.user.id, input);
  }

  @Query(() => DigitalCardType)
  @UseGuards(JwtAuthGuard)
  public async getMyDigitalCard(
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<DigitalCardType> {
    return await this.digitalCardsService.getMyDigitalCard(context.req.user.id);
  }

  @Query(() => DigitalCardType)
  public async getDigitalCard(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<DigitalCardType> {
    return await this.digitalCardsService.getDigitalCard(slug);
  }

  @Mutation(() => DigitalCardType)
  @UseGuards(JwtAuthGuard)
  public async updateDigitalCard(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateDigitalCardInput,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<DigitalCardType> {
    return await this.digitalCardsService.updateDigitalCard(context.req.user.id, id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  public async deleteDigitalCard(
    @Args('id', { type: () => String }) id: string,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<boolean> {
    await this.digitalCardsService.deleteDigitalCard(context.req.user.id, id);

    return true;
  }
}
