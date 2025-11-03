import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesProduct } from './images.entity';
import { CreateImageDto } from './images.dto';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get()
    async getImages(): Promise<ImagesProduct[]> {
        console.log('GET /images requested');
        const result = await this.imagesService.getImages();
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('Failed to retrieve images');
        }
    }

    @Get(':id')
    async getImageById(@Param('id') id: string): Promise<ImagesProduct | null> {
        try {
            return this.imagesService.getImageById(Number(id));
        } catch (error) {
            throw new Error('Failed to retrieve image by ID');
        }
    }

    @Post()
    createImage(@Body() createImageDto: CreateImageDto) {
        return this.imagesService.createImage(createImageDto);
    }

    @Put(':id')
    updateImage(@Param('id') id: string, @Body() updateImageDto: CreateImageDto) {
        return this.imagesService.updateImage(Number(id), updateImageDto);
    }

    @Delete(':id')
    async deleteImage(@Param('id') id: string): Promise<void> {
        return this.imagesService.deleteImage(Number(id));
    }
}
