import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    @ApiOperation({ summary: 'Get all books with optional filters' })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'board', required: false })
    @ApiQuery({ name: 'class', required: false })
    findAll(@Query() query: any) {
        return this.booksService.findAll(query);
    }

    @Post('seed')
    @ApiOperation({ summary: 'Seed initial books (Dev utility)' })
    seed() {
        return this.booksService.seed();
    }

    @Post('reset-import')
    @ApiOperation({ summary: 'Reset catalogue and Import new data' })
    resetImport(@Body() data: any) {
        // data.catalogue is the array
        if (!data.catalogue || !Array.isArray(data.catalogue)) {
            throw new Error("Invalid format. Expected { catalogue: [] }");
        }
        return this.booksService.resetAndImport(data.catalogue);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Add a new book (Admin)' })
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Update a book (Admin)' })
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.booksService.update(id, updateData);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Delete a book (Admin)' })
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }

    @Post('bulk')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Bulk Create Books' })
    bulkCreate(@Body() books: CreateBookDto[]) {
        return this.booksService.bulkCreate(books);
    }
}
