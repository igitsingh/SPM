import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRoleDto {
    ADMIN = 'admin',
    PARTNER = 'partner',
    CUSTOMER = 'customer'
}

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ enum: UserRoleDto })
    @IsEnum(UserRoleDto)
    role: any;

    @ApiProperty()
    @IsString()
    @IsOptional()
    subRole?: string;
}
