import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from './users/user.entity';
import { UserSeeder } from './db/seeding/seeds/user.seeder';
import { config } from 'dotenv';
import { Cart } from './cart/cart.entity';
import { Category } from './category/category.entity';
import { ImagesProduct } from './images/images.entity';
import { Order } from './order/order.entity';
import { OrderLine } from './orderline/orderline.entity';
import { Product } from './product/product.entity';
import { Favorites } from './favorites/favorites.entity';
config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,

  entities: [
    User,
    Cart,
    Product,
    Category,
    Order,
    OrderLine,
    ImagesProduct,
    Favorites
  ],
  seeds: [
    UserSeeder,
  ],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((error) => console.log('Error initializing data source', error));
