import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Partners')
@Controller('partners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Get()
    @ApiOperation({ summary: 'List/Search partners' })
    findAll(@Query('search') search: string) {
        return this.partnersService.findAll(search);
    }

    @Get(':id')
    findAllOne(@Param('id') id: string) {
        return this.partnersService.findOne(id);
    }
}
