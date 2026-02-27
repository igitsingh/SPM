import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    provider: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    method?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reference?: string;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    date?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    notes?: string;
}
