import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant/constants';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

const jwtModule = JwtModule.register({
   secret: jwtConstants.secret,
   signOptions: { expiresIn: '1d' },
});
@Module({
   imports: [UsersModule, PassportModule, jwtModule],
   providers: [AuthService, JwtStrategy, LocalStrategy],
   exports: [AuthService, JwtModule],
   controllers: [AuthController],
})
export class AuthModule {}
