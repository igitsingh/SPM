import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReferralDto {
    @ApiProperty({ example: 'retailer@example.com' })
    @IsEmail()
    @IsNotEmpty()
    referredEmail: string;

    @ApiProperty({ example: 'Check out SPM Portal!', required: false })
    @IsString()
    @IsOptional()
    message?: string;
}
