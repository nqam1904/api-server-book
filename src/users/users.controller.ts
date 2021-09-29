// import CommonConstant from '@constant/CommonStatus';
/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
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

@ApiBearerAuth('access-token')
@ApiTags('users')
@Controller('/api/users')
export class UsersController {
   constructor(private userService: UsersService) {}

   @Get()
   @ApiResponse({
      status: 200,
      description: 'Get list users success!',
      type: Users,
   })
   @HttpCode(common.API_CODE_STATUS.OK)
   findAll() {
      return this.userService.findAll();
   }

   @HttpCode(common.API_CODE_STATUS.OK)
   @Get(':id')
   findOne(@Param(':id') id: number) {
      return this.userService.findOne(id);
   }

   @Post('/findEmail')
   @HttpCode(common.API_CODE_STATUS.OK)
   findEmail(@Body() email: string) {
      return this.userService.findByEmail(email);
   }

   @Post()
   @HttpCode(common.API_CODE_STATUS.CREATED)
   @UsePipes(ValidationPipe)
   create(@Body() CreateUserDto: CreateUserDto) {
      return this.userService.create(CreateUserDto);
   }

   @Put(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
   }

   // @UseGuards(JwtAuthGuard)
   @Delete(':id')
   @HttpCode(common.API_CODE_STATUS.OK)
   remove(@Param('id') id: string) {
      return this.userService.remove(+id);
   }
}
