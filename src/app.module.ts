import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './libs/user/user.module';
import { AuthModule } from './libs/auth/auth.module';
import { DonationModule } from './libs/donation/donation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
  ],
})
export class AppModule {}
