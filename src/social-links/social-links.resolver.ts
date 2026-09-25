import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SocialLinksService } from './social-links.service.js';
import { AddSocialLinkInput } from './dto/add-social-link.input.js';
import { UpdateSocialLinkInput } from './dto/update-social-link.input.js';
import { SocialLinkType } from './dto/social-link.type.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AuthenticatedRequest } from '../types/authenticated-request.js';

@Resolver(() => SocialLinkType)
export class SocialLinksResolver {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Mutation(() => SocialLinkType)
  @UseGuards(JwtAuthGuard)
  public async addSocialLink(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('input') input: AddSocialLinkInput,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<SocialLinkType> {
    return await this.socialLinksService.addSocialLink(context.req.user.id, cardId, input);
  }

  @Mutation(() => SocialLinkType)
  @UseGuards(JwtAuthGuard)
  public async updateSocialLink(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateSocialLinkInput,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<SocialLinkType> {
    return await this.socialLinksService.updateSocialLink(context.req.user.id, id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  public async deleteSocialLink(
    @Args('id', { type: () => String }) id: string,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<boolean> {
    await this.socialLinksService.deleteSocialLink(context.req.user.id, id);

    return true;
  }
}
