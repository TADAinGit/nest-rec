import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/signIn')
  @UseGuards(AuthGuard)
  signInOauth2() {
    return { msg: 'Log in with google' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard)
  handleRedirect(@Req() request: Request) {
    if (request.user) {
      console.log(request.user);
      return { msg: 'Authenticated', user: request.user };
    } else {
      return { msg: 'Unauthorized' };
    }
  }
}
