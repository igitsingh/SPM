import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, MinLength, IsOptional } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    PARTNER = 'partner',
    CUSTOMER = 'customer'
}

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'partner@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'securePass123', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, example: UserRole.PARTNER })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ required: false, example: '9876543210' })
    @IsString()
    @IsOptional()
    phone?: string;
}
