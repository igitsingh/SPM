import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { SchemesService } from './schemes.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Schemes')
@Controller('schemes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SchemesController {
    constructor(private readonly schemesService: SchemesService) { }

    @Post()
    @ApiOperation({ summary: 'Create new discount scheme' })
    create(@Body() dto: CreateSchemeDto) {
        return this.schemesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'List all schemes' })
    findAll(@Query('active') active: string) {
        return this.schemesService.findAll(active === 'true');
    }

    @Put(':id/toggle')
    @ApiOperation({ summary: 'Toggle scheme status' })
    toggle(@Param('id') id: string) {
        return this.schemesService.toggleStatus(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete scheme' })
    delete(@Param('id') id: string) {
        return this.schemesService.delete(id);
    }
}
