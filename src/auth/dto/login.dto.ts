import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
   @ApiProperty()
   @IsEmail()
   @IsNotEmpty({ message: 'email is not empty' })
   email: string;

   @ApiProperty()
   @IsNotEmpty({ message: 'password is not empty' })
   password: string;
}
