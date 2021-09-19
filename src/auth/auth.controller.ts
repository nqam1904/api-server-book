import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { common } from '../constant/CommonStatus';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('login')
@Controller('/api/auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @HttpCode(common.API_CODE_STATUS.OK)
   @UsePipes(ValidationPipe)
   @Post('login')
   async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
   }
}
