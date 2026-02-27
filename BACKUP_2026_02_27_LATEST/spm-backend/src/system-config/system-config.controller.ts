import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('System Config')
@Controller('system-config')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SystemConfigController {
    constructor(private readonly configService: SystemConfigService) { }

    @Get()
    @ApiOperation({ summary: 'Get all system configurations' })
    getAll() {
        return this.configService.getAll();
    }

    @Put()
    @ApiOperation({ summary: 'Update configuration' })
    async update(@Body() body: { key: string; value: string; description?: string }) {
        return this.configService.set(body.key, body.value, body.description);
    }

    @Post('seed')
    @ApiOperation({ summary: 'Seed default configurations' })
    seed() {
        return this.configService.seedDefaults();
    }
}
