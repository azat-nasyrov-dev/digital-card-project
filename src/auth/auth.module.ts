import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config.js';
import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
