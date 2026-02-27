import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get('logs')
    @ApiOperation({ summary: 'Get recent inventory logs' })
    getLogs(@Query('limit') limit: number) {
        return this.inventoryService.getLogs(limit ? Number(limit) : 20);
    }

    @Get('low-stock')
    @ApiOperation({ summary: 'Get low stock books' })
    getLowStock() {
        return this.inventoryService.getLowStock();
    }

    @Post('adjust')
    @ApiOperation({ summary: 'Adjust stock (IN/OUT)' })
    adjustStock(@Body() dto: AdjustStockDto) {
        return this.inventoryService.adjustStock(dto);
    }
}
