import { Body, Controller, Post, Get, Put, Delete, UseGuards, Request, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CartService } from '../cart/cart.service';
import { FavoritesService } from '../favorites/favorites.service';
import { LoginDto, RegisterDto, UpdateProfileDto, RefreshTokenDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  async register(@Body() registerDto: RegisterDto) {
    console.log('='.repeat(50));
    console.log('[AuthController] POST /auth/register - RECEIVED');
    console.log('[AuthController] Body type:', typeof registerDto);
    console.log('[AuthController] Body constructor:', registerDto?.constructor?.name);
    console.log('[AuthController] Body:', JSON.stringify(registerDto, null, 2));
    console.log('[AuthController] Keys:', Object.keys(registerDto || {}));
    console.log('='.repeat(50));
    
    try {
      const result = await this.authService.register(registerDto);
      console.log('[AuthController] register SUCCESS');
      return result;
    } catch (error) {
      console.error('[AuthController] register ERROR:', error.message);
      console.error('[AuthController] error stack:', error.stack);
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  async login(@Body() loginDto: LoginDto) {
    console.log('='.repeat(50));
    console.log('[AuthController] POST /auth/login - RECEIVED');
    console.log('[AuthController] Body:', JSON.stringify(loginDto, null, 2));
    console.log('='.repeat(50));
    
    try {
      const result = await this.authService.login(loginDto);
      console.log('[AuthController] login SUCCESS');
      return result;
    } catch (error) {
      console.error('[AuthController] login ERROR:', error.message);
      throw error;
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    console.log('[AuthController] POST /auth/refresh - Token refresh attempt');
    try {
      const result = await this.authService.refreshTokens(refreshTokenDto.refresh_token);
      console.log('[AuthController] refresh SUCCESS');
      return result;
    } catch (error) {
      console.error('[AuthController] refresh ERROR:', error.message);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    console.log('[AuthController] POST /auth/logout');
    return this.authService.revokeRefreshToken(refreshTokenDto.refresh_token);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('logout-all')
  @ApiOperation({ summary: 'Cerrar todas las sesiones' })
  async logoutAll(@Request() req) {
    console.log('[AuthController] POST /auth/logout-all - User:', req.user.sub);
    return this.authService.revokeAllUserTokens(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  async getProfile(@Request() req) {
    // Obtener el perfil completo del usuario autenticado
    return this.authService.getProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('profile')
  @ApiOperation({ summary: 'Actualizar perfil del usuario' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    // Actualizar el perfil del usuario autenticado
    return this.authService.updateProfile(req.user.sub, updateProfileDto);
  }

  // ==================== CARRITO ====================
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('cart')
  @ApiOperation({ summary: 'Obtener mi carrito' })
  async getMyCart(@Request() req) {
    return this.cartService.getMyCart(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('cart/add/:productId')
  @ApiOperation({ summary: 'Agregar producto al carrito' })
  async addToCart(@Request() req, @Param('productId', ParseUUIDPipe) productId: string) {
    return this.cartService.addToCart(req.user.sub, productId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('cart/remove/:productId')
  @ApiOperation({ summary: 'Eliminar producto del carrito' })
  async removeFromCart(@Request() req, @Param('productId', ParseUUIDPipe) productId: string) {
    return this.cartService.removeFromCart(req.user.sub, productId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('cart/clear')
  @ApiOperation({ summary: 'Vaciar carrito' })
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('cart/checkout')
  @ApiOperation({ summary: 'Crear orden desde el carrito' })
  async createOrderFromCart(@Request() req) {
    return this.cartService.createOrderFromCart(req.user.sub);
  }

  // ==================== FAVORITOS ====================
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('favorites')
  @ApiOperation({ summary: 'Obtener mis favoritos' })
  async getMyFavorites(@Request() req) {
    return this.favoritesService.getMyFavorites(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('favorites/:productId')
  @ApiOperation({ summary: 'Agregar producto a favoritos' })
  async addToFavorites(@Request() req, @Param('productId', ParseUUIDPipe) productId: string) {
    return this.favoritesService.addToFavorites(req.user.sub, productId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('favorites/:productId')
  @ApiOperation({ summary: 'Eliminar producto de favoritos' })
  async removeFromFavorites(@Request() req, @Param('productId', ParseUUIDPipe) productId: string) {
    return this.favoritesService.removeFromFavorites(req.user.sub, productId);
  }
}
