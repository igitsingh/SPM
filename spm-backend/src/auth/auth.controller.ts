import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user and return JWT token' })
    @ApiResponse({ status: 200, description: 'Successful login' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiBody({ type: LoginDto })
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user (Partner/Customer)' })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
