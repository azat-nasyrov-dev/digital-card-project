import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Finds a user by email address.
   *
   * @param email User email address
   * @returns Found user or null if the user does not exist
   */
  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Creates a new user.
   *
   * @param email User email address
   * @param name User display name
   * @param passwordHash Hashed user password
   * @returns Created user
   */
  public async createUser(email: string, name: string, passwordHash: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });
  }
}
