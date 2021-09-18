import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
   @ApiProperty()
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @ApiProperty()
   @IsNotEmpty()
   password: string;
}
