import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Oswal-CBSE-X-Math' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ example: 'Oswal Guru - CBSE X Mathematics' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '10' })
    @IsString()
    @IsOptional()
    class?: string;

    @ApiProperty({ example: 'CBSE' })
    @IsString()
    @IsOptional()
    board?: string;

    @ApiProperty({ example: 'Mathematics' })
    @IsString()
    @IsOptional()
    subject?: string;

    @ApiProperty({ example: 'Textbook' })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiProperty({ example: 'https://example.com/cover.jpg' })
    @IsString()
    @IsOptional()
    coverImage?: string;

    @ApiProperty({ example: 499.0 })
    @IsNumber()
    @Min(0)
    priceRetail: number;

    @ApiProperty({ example: 350.0 })
    @IsNumber()
    @Min(0)
    pricePartner: number;

    @ApiProperty({ example: 100 })
    @IsNumber()
    @Min(0)
    stock: number;
}
