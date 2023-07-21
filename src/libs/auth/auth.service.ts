import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInParams, SignupParams } from 'src/interfaces/auth.interfaces';
import { errorHandler } from 'src/helpers/errorHanders';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private User = this.prismaService.user;
  private Jwt = this.jwtService.signAsync.bind(this.jwtService);
  private Payload(payload) {
    const { id, name, role } = payload;
    return { id, name, role };
  }
  private Response(userData, token) {
    const { id, name, role } = userData;
    return { id, name, role, token };
  }

  // ## USER SIGNUP
  async userSignup({ name, email, phone, password }: SignupParams) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const userData = { name, email, phone, password: hashPassword };
      const newUser = await this.User.create({ data: userData });
      const payload = this.Payload(newUser);
      const token = await this.Jwt(payload);
      return this.Response(newUser, token);
    } catch (error) {
      if (error.code === 'P2002') return errorHandler(409);
    }
  }

  // ## USER SIGNIN WITH AUTH
  async userSignin({ email, password }: SignInParams) {
    const user = await this.User.findUnique({ where: { email } });
    if (!user) return errorHandler(403);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return errorHandler(403);
    const payload = this.Payload(user);
    const token = await this.Jwt(payload);
    return this.Response(user, token);
  }
}
