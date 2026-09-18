import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service.js';
import { RegisterInput } from './dto/register.input.js';
import { User } from '../generated/prisma/client.js';
import { LoginInput } from './dto/login.input.js';
import { LoginResponse } from './dto/login.response.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Hashes a plain-text password.
   *
   * @param password Plain-text password
   * @returns Hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  /**
   * Compares a plain-text password with a password hash.
   *
   * @param password Plain-text password
   * @param passwordHash Stored password hash
   * @returns True if the password matches the hash
   */
  private async comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  /**
   * Registers a new user.
   *
   * @param input User registration input
   * @returns Created user
   * @throws ConflictException if a user with the given email already exists
   */
  public async register(input: RegisterInput): Promise<User> {
    const existingUser = await this.usersService.findUserByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await this.hashPassword(input.password);
    const user = await this.usersService.createUser(input.email, input.name, passwordHash);

    this.logger.log(`User registered [id=${user.id}]`);

    return user;
  }

  /**
   * Authenticates a user and generates an access token.
   *
   * @param input User login input
   * @returns Access token and authenticated user
   * @throws UnauthorizedException if credentials are invalid
   */
  public async login(input: LoginInput): Promise<LoginResponse> {
    const user = await this.usersService.findUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.comparePassword(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        issuer: this.configService.get<string>('jwt.issuer'),
        audience: this.configService.get<string>('jwt.audience'),
        expiresIn: this.configService.get<number>('jwt.accessTokenTtl'),
      },
    );

    this.logger.log(`User logged in [id=${user.id}]`);

    return { accessToken, user };
  }
}
