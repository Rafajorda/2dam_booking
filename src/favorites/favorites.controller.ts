import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoriteDto } from './favorites.dto';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    async getFavorites(): Promise<Favorites[]> {
        console.log('GET /favorites requested');
        return this.favoritesService.getFavorites();
    }

    @Get(':id')
    async getFavoriteById(@Param('id', ParseIntPipe) id: number): Promise<Favorites | null> {
        return this.favoritesService.getFavoriteById(id);
    }

    @Post()
    createFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
        return this.favoritesService.createFavorite(createFavoriteDto);
    }

    @Put(':id')
    updateFavorite(@Param('id', ParseIntPipe) id: number, @Body() updateFavoriteDto: CreateFavoriteDto) {
        return this.favoritesService.updateFavorite(id, updateFavoriteDto);
    }

    @Delete(':id')
    async deleteFavorite(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.favoritesService.deleteFavorite(id);
    }
}
