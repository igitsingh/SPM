import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
    constructor(private prisma: PrismaService) { }

    async findAll(query?: any) {
        const { search, class: classVal, subject } = query || {};
        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (classVal) where.class = classVal;
        if (subject) where.subject = subject;

        return this.prisma.video.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
    }

    async create(dto: CreateVideoDto) {
        const youtubeId = this.extractYoutubeId(dto.youtubeUrl);
        const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
        const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

        return this.prisma.video.create({
            data: {
                title: dto.title,
                youtubeId: youtubeId || 'unknown',
                url: embedUrl,
                thumbnail: thumbnail,
                class: dto.class,
                subject: dto.subject,
                description: dto.description || '',
                duration: '10:00', // Mock duration until API integration
                views: '0'
            },
        });
    }

    async update(id: string, data: any) {
        let extraData = {};
        if (data.youtubeUrl) {
            const yid = this.extractYoutubeId(data.youtubeUrl);
            extraData = {
                youtubeId: yid,
                url: `https://www.youtube.com/embed/${yid}`,
                thumbnail: `https://img.youtube.com/vi/${yid}/maxresdefault.jpg`
            };
        }
        return this.prisma.video.update({
            where: { id },
            data: { ...data, ...extraData }
        });
    }

    async remove(id: string) {
        return this.prisma.video.delete({ where: { id } });
    }

    private extractYoutubeId(url: string) {
        let youtubeId = '';
        try {
            if (url.includes('v=')) {
                youtubeId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                youtubeId = url.split('youtu.be/')[1];
            } else if (url.includes('embed/')) {
                youtubeId = url.split('embed/')[1];
            }
        } catch (e) { }
        if (!youtubeId && url.length === 11) youtubeId = url;
        return youtubeId;
    }
}
