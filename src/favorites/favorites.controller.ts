import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';
import { CreateFavoriteDto } from './favorites.dto';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    async getFavorites(): Promise<Favorites[]> {
        console.log('GET /favorites requested');
        const result = await this.favoritesService.getFavorites();
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('Failed to retrieve favorites');
        }
    }

    @Get(':id')
    async getFavoriteById(@Param('id') id: string): Promise<Favorites | null> {
        try {
            return this.favoritesService.getFavoriteById(Number(id));
        } catch (error) {
            throw new Error('Failed to retrieve favorite by ID');
        }
    }

    @Post()
    createFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
        return this.favoritesService.createFavorite(createFavoriteDto);
    }

    @Put(':id')
    updateFavorite(@Param('id') id: string, @Body() updateFavoriteDto: CreateFavoriteDto) {
        return this.favoritesService.updateFavorite(Number(id), updateFavoriteDto);
    }

    @Delete(':id')
    async deleteFavorite(@Param('id') id: string): Promise<void> {
        return this.favoritesService.deleteFavorite(Number(id));
    }
}
