import { Controller, Get, Post, Body, UseGuards, Request, Param, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdatestatusDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Place a new Order' })
    create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
        // req.user has { userId, email, role, name } usually from JWT strategy
        // We pass the whole user object for role checking
        return this.ordersService.create(req.user, createOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get orders (History or All for Admin)' })
    findAll(@Request() req, @Query() query) {
        return this.ordersService.findAll(req.user, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order details' })
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Put(':id/status')
    @ApiOperation({ summary: 'Update order status' })
    updateStatus(@Request() req, @Param('id') id: string, @Body() dto: UpdatestatusDto) {
        return this.ordersService.updateStatus(id, dto, req.user);
    }
}
