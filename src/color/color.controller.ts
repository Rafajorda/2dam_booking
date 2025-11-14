import { Body, Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { Color } from './color.entity';
import { CreateColorDto } from './color.dto';

@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los colores' })
  async getColors(): Promise<Color[]> {
    return this.colorService.getColors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener color por ID' })
  async getColorById(@Param('id', ParseUUIDPipe) id: string): Promise<Color> {
    return this.colorService.getColorById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo color' })
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar color' })
  updateColor(@Param('id', ParseUUIDPipe) id: string, @Body() updateColorDto: CreateColorDto) {
    return this.colorService.updateColor(id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar color' })
  async deleteColor(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.colorService.deleteColor(id);
  }
}
