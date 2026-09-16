import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service.js';

@Resolver()
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  public async sayHello(): Promise<string> {
    await this.prisma.$queryRaw`SELECT 1`;

    return 'Hello, world!';
  }
}
