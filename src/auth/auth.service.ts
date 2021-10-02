import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
   ) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.usersService.findByEmail(email);
      const isValid = await bcrypt.compare(password, user.password);

      if (user && isValid) {
         const { ...result } = _.omit(user, ['password']);
         return result;
      }
      throw new HttpException('Email or password invalid', HttpStatus.BAD_REQUEST);
   }

   async login(user: any) {
      const payload = await this.validateUser(user.email, user.password);
      try {
         return {
            isSuccess: true,
            data: payload,
            access_token: this.jwtService.sign(payload),
         };
      } catch (e) {
         throw new HttpException('Email or password invalid', HttpStatus.BAD_REQUEST);
      }
   }

   async findUserFromDiscordId(discordId: string, data: any): Promise<any> {
      const user = await this.usersService.findIdDiscord('discord_id', discordId);
      if (!user) {
         const { ...userDiscord } = await this.usersService.createAccountDiscord(discordId, data);
         return {
            isSuccess: true,
            type: 'DISCORD',
            data: userDiscord,
            access_token: this.jwtService.sign(userDiscord),
         };
      } else {
         const { ...discord } = _.omit(user, ['password']);
         return {
            isSuccess: true,
            type: 'DISCORD',
            data: discord,
            access_token: this.jwtService.sign(discord),
         };
      }
   }
}
