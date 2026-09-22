import { Module } from '@nestjs/common';
import { DigitalCardsService } from './digital-cards.service.js';
import { DigitalCardsResolver } from './digital-cards.resolver.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({})],
  providers: [DigitalCardsService, DigitalCardsResolver],
  exports: [DigitalCardsService],
})
export class DigitalCardsModule {}
