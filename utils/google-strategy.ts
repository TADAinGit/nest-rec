import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refrestToken: string, profile: Profile) {
    console.log('Google strategy call');
    console.log(accessToken);
    console.log(refrestToken);
    console.log(profile);
    const userResponse = await this.authService.validateUserSignIn({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });

    const user = {
      id: userResponse.id,
      email: userResponse.email,
      name: userResponse.displayName,
      accessToken,
    };
    // done(null, user);
    // return { name: user.displayName, email: user.email, accessToken } || null;
    return user || null;
  }
}
