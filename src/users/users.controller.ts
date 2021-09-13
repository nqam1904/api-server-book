// import CommonConstant from '@constant/CommonStatus';
/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpException,
   Param,
   Post,
   Put,
   UseGuards,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { common } from '../constant/CommonStatus';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
   constructor(private userService: UsersService) {}

   @Get()
   @ApiResponse({
      status: 200,
      description: 'Get list users success!',
      type: Users,
   })
   @UseGuards(JwtAuthGuard)
   @HttpCode(common.API_CODE_STATUS.OK)
   findAll() {
      return this.userService.findAll();
   }
   @UseGuards(JwtAuthGuard)
   @Post('/create')
   @HttpCode(common.API_CODE_STATUS.CREATED)
   @UsePipes(ValidationPipe)
   create(@Body() CreateUserDto: CreateUserDto) {
      return this.userService.create(CreateUserDto);
   }
   @UseGuards(JwtAuthGuard)
   @Put(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   remove(@Param('id') id: string) {
      return this.userService.remove(+id);
   }
}
