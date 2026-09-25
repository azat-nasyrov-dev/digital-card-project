import { Request } from 'express';
import type { User } from '../generated/prisma/client.js';

export type AuthenticatedRequest = Request & {
  user: User;
};
