import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'example@email.com', description: 'User email' })
    email: string;
}