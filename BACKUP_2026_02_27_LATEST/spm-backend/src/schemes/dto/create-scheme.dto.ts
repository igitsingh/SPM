import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SchemeType {
    FLAT = 'FLAT',
    PERCENT = 'PERCENT'
}

export class CreateSchemeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ enum: SchemeType })
    @IsEnum(SchemeType)
    type: SchemeType;

    @ApiProperty()
    @IsNumber()
    value: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    minOrderValue?: number;

    @ApiProperty()
    @IsDateString()
    validFrom: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    validUntil?: string;
}
