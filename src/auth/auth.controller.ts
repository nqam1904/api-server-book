import {
   Body,
   Controller,
   Get,
   HttpCode,
   Post,
   Req,
   UseGuards,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { common } from '../constant/CommonStatus';
import { IpAddress } from '../constant/IPConfing';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('login')
@Controller('/api/auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @HttpCode(common.API_CODE_STATUS.OK)
   @UsePipes(ValidationPipe)
   @Post('login')
   async login(@Body() loginDto: LoginDto, @IpAddress() ipAddress) {
      //ipAddress chưa sử dụng đc để test lên production nó lấy đc ip ko vì trên localhost ko láy ipaddress đc
      return this.authService.login(loginDto);
   }

   @Get('discord')
   @UseGuards(AuthGuard('discord'))
   async getUserFromDiscordLogin(@Req() req): Promise<any> {
      return req.user;
   }
}
