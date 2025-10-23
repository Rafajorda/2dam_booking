import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { Order } from './order/order.entity';
import { User } from './users/user.entity';
import { OrderLine } from './orderline/orderline.entity';
import { ImagesProduct } from './images/images.entity';
import { CartModule } from './cart/cart.module';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
import { OrderlineController } from './orderline/orderline.controller';
import { OrderlineService } from './orderline/orderline.service';
import { OrderlineModule } from './orderline/orderline.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: '2dam_booking',
      // entities: [User, Product, Category, Order, OrderLine, ImagesProduct],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CartModule,
    FavoritesModule,
    ImagesModule,
    OrderlineModule,
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: 'database',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: '2dam_booking',
    //   entities: [User, Product, Category, Order, OrderLine, ImagesProduct],
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   logging: true,
    // }),
    
  ],
  controllers: [AppController, OrderController, FavoritesController, OrderlineController],
  providers: [AppService, OrderService, ImagesService, OrderlineService],
})
export class AppModule {}
