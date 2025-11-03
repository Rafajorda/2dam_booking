# 🔐 Sistema de Autenticación - NestJS

Sistema de autenticación JWT implementado sin Passport, de forma simple y directa.

## 📋 Endpoints Disponibles

### 1. Registro de Usuario

**POST** `/auth/register`

Crea un nuevo usuario y devuelve un token JWT.

**Body:**

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "MiContraseña123",
  "address": "Calle Falsa 123"
}
```

**Respuesta:**

```json
{
  "user": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "username": "juanperez",
    "email": "juan@example.com",
    "role": "user",
    "status": "active",
    "isActive": true,
    "address": "Calle Falsa 123",
    "createdAt": "2025-11-03T10:00:00.000Z",
    "updatedAt": "2025-11-03T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

**POST** `/auth/login`

Inicia sesión y devuelve un token JWT.

**Body:**

```json
{
  "email": "juan@example.com",
  "password": "MiContraseña123"
}
```

**Respuesta:**

```json
{
  "user": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "username": "juanperez",
    "email": "juan@example.com",
    "role": "user",
    "status": "active",
    "isActive": true,
    "address": "Calle Falsa 123",
    "createdAt": "2025-11-03T10:00:00.000Z",
    "updatedAt": "2025-11-03T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Obtener Perfil (Ruta Protegida)

**GET** `/auth/profile`

Obtiene el perfil del usuario autenticado. **Requiere token JWT**.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta:**

```json
{
  "sub": 1,
  "email": "juan@example.com",
  "role": "user",
  "iat": 1699012345,
  "exp": 1699098745
}
```

## 🔒 Cómo Proteger Rutas

Para proteger cualquier ruta con autenticación, usa el `@UseGuards(AuthGuard)`:

```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductController {
  // Ruta pública - no requiere autenticación
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  // Ruta protegida - requiere autenticación
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  // Obtener información del usuario autenticado
  @UseGuards(AuthGuard)
  @Get('my-products')
  getMyProducts(@Request() req) {
    const userId = req.user.sub; // ID del usuario desde el token
    const userEmail = req.user.email;
    const userRole = req.user.role;

    return this.productService.getProductsByUser(userId);
  }
}
```

## 🧪 Probando con Postman/Thunder Client

### 1. Register

```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Pérez",
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "MiContraseña123",
  "address": "Calle Falsa 123"
}
```

### 2. Login

```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "MiContraseña123"
}
```

### 3. Acceder a Ruta Protegida

```
GET http://localhost:3000/auth/profile
Authorization: Bearer TU_TOKEN_AQUI
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
JWT_SECRET=tu_secreto_super_seguro_cambialo_en_produccion
```

### Configuración del Token

El token JWT tiene las siguientes características:

- **Expiración**: 24 horas
- **Algoritmo**: HS256
- **Payload**: `{ sub: userId, email: userEmail, role: userRole }`

Para cambiar la expiración, edita `src/auth/auth.module.ts`:

```typescript
JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
  signOptions: { expiresIn: '7d' }, // Cambia a 7 días, por ejemplo
});
```

## 🛡️ Seguridad

### Recomendaciones:

1. ✅ **Cambia el secreto JWT** en producción
2. ✅ Las contraseñas se hashean con **bcrypt** (10 rounds)
3. ✅ Los tokens expiran en 24 horas
4. ✅ Las contraseñas nunca se retornan en las respuestas
5. ✅ Se valida que el usuario esté activo antes de generar tokens

### Validaciones:

- Email único
- Username único
- Password mínimo 6 caracteres
- Email debe ser válido
- Todos los campos son obligatorios

## 📝 Payload del Token JWT

Cuando decodificas el token, contiene:

```json
{
  "sub": 1, // ID del usuario
  "email": "juan@example.com",
  "role": "user", // o "admin"
  "iat": 1699012345, // Issued at (timestamp)
  "exp": 1699098745 // Expiration (timestamp)
}
```

## 🚀 Ejemplos de Uso

### Crear un producto (requiere autenticación)

```typescript
// product.controller.ts
@UseGuards(AuthGuard)
@Post()
createProduct(@Body() createProductDto: CreateProductDto, @Request() req) {
  const createdBy = req.user.sub; // ID del usuario desde el token
  return this.productService.createProduct(createProductDto, createdBy);
}
```

### Verificar rol de administrador

```typescript
// Puedes crear un guard personalizado para verificar roles
@UseGuards(AuthGuard, AdminGuard)
@Delete(':id')
deleteProduct(@Param('id') id: string) {
  return this.productService.deleteProduct(id);
}
```

## 🔧 Troubleshooting

### Error: "Token inválido o expirado"

- Verifica que el token esté en el header: `Authorization: Bearer TOKEN`
- El token puede haber expirado (24 horas)
- Haz login nuevamente para obtener un nuevo token

### Error: "El email ya está registrado"

- El email ya existe en la base de datos
- Usa un email diferente o haz login

### Error: "Credenciales inválidas"

- Email o contraseña incorrectos
- Verifica los datos de acceso
