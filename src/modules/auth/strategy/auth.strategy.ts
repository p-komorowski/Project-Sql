import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Customer } from 'src/modules/user/entities';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: (req) => {
                if (!req || !req.cookies) return null;
                return req.cookies['access_token'];
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return { userEmail: payload.sub, username: payload.username };
    }

    async validateUser(username: Customer, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        } else return user;
    }
}
