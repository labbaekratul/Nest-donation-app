import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos/auth.dtos';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupInput: SignupDto) {
    return this.authService.userSignup(signupInput);
  }

  @Post('/signin')
  signin(@Body() signinInput: SigninDto) {
    return this.authService.userSignin(signinInput);
  }
}
