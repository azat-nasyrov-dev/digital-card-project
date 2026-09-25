import { Request } from 'express';
import { User } from '../generated/prisma/client.js';

export type AuthenticatedRequest = Request & {
  user: User;
};
