/* eslint-disable prettier/prettier */
import { Role } from '@prisma/client';
export interface UserUpdateParams {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UserResonseData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  createdAt: Date;
  uppdateAt: Date;
}
