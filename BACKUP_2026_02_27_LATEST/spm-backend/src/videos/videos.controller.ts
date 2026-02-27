import { Controller, Get, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get()
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'class', required: false })
    findAll(@Query() query: any) {
        return this.videosService.findAll(query);
    }

    @Post()
    create(@Body() createVideoDto: CreateVideoDto) {
        return this.videosService.create(createVideoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.videosService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.videosService.remove(id);
    }
}
