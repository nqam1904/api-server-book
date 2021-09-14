import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { common } from '../constant/CommonStatus';
import { AuthService } from './auth.service';

@ApiTags('login')
@Controller('/api/auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @HttpCode(common.API_CODE_STATUS.OK)
   @Post('login')
   async login(@Body() body) {
      return this.authService.login(body);
   }
}
