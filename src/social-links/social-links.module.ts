import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service.js';
import { SocialLinksResolver } from './social-links.resolver.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({})],
  providers: [SocialLinksService, SocialLinksResolver],
  exports: [SocialLinksService],
})
export class SocialLinksModule {}
