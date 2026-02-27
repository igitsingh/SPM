import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdjustStockDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @ApiProperty({ enum: ['IN', 'OUT', 'ADJUST'] })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reason?: string;
}
