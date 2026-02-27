import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateUserDto): Promise<User> {
        const hash = await bcrypt.hash(dto.password, 10);
        try {
            return await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                    name: dto.name,
                    role: dto.role, // Prisma Enum
                    subRole: dto.subRole
                }
            });
        } catch (e) {
            if (e.code === 'P2002') throw new ConflictException('Email already exists');
            throw e;
        }
    }

    async findAdmins() {
        return this.prisma.user.findMany({
            where: { role: 'admin' },
            select: { id: true, name: true, email: true, role: true, subRole: true, isActive: true, createdAt: true }
        });
    }

    async toggleStatus(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return this.prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive }
        });
    }

    async resetPassword(id: string) {
        const defaultPass = 'Admin@123';
        const hash = await bcrypt.hash(defaultPass, 10);
        return this.prisma.user.update({
            where: { id },
            data: { passwordHash: hash }
        });
    }

    // Auth helpers
    async findOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findOneById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
