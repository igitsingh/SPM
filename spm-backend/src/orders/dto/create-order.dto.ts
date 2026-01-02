import { IsNotEmpty, IsArray, IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @ApiProperty()
    @IsNumber()
    qty: number;
}

export class CreateOrderDto {
    @ApiProperty({ type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    buyerId?: string; // Admin override
}

export class UpdatestatusDto {
    @ApiProperty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    notes?: string;
}
