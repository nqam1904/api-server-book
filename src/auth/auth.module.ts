import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant/constants';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './strategies/discord.strategy';
import { UsersService } from '../users/users.service';
const jwtModule = JwtModule.register({
   secret: jwtConstants.secret,
   signOptions: { expiresIn: '1d' },
});
@Module({
   imports: [UsersModule, PassportModule, jwtModule, HttpModule],
   providers: [AuthService, JwtStrategy, DiscordStrategy],
   controllers: [AuthController],
   exports: [AuthService, JwtModule],
})
export class AuthModule {}
