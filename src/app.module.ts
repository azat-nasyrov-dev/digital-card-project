import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { Request } from 'express';
import jwtConfig from './config/jwt.config.js';
import { AppResolver } from './app.resolver.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DigitalCardsModule } from './digital-cards/digital-cards.module.js';
import { SocialLinksModule } from './social-links/social-links.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [jwtConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    DigitalCardsModule,
    SocialLinksModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
