import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create new user (admin/staff)' })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get('admins')
    @ApiOperation({ summary: 'List all admin/staff users' })
    findAdmins() {
        return this.usersService.findAdmins();
    }

    @Put(':id/toggle')
    @ApiOperation({ summary: 'Toggle active status' })
    toggleStatus(@Param('id') id: string) {
        return this.usersService.toggleStatus(id);
    }

    @Put(':id/reset-password')
    @ApiOperation({ summary: 'Reset password to Admin@123' })
    resetPassword(@Param('id') id: string) {
        return this.usersService.resetPassword(id);
    }
}
