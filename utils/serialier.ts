/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'typeorm/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  deserializeUser(payload: any, done: Function) {
    const user = this.authService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
