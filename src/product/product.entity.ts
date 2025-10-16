import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { ImagesProduct } from '../images/images.entity';
import { Cart } from '../cart/cart.entity';
import { Favorites } from '../favorites/favorites.entity';




@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    name: string;
    @Column({ unique: true })
    slug: string;
    @Column()
    description: string
    @Column()//color es provisional, puede que cambie
    color: string;
    @Column({ default: 0 })
    favoritesCount: number
    @Column({ default: 'active' })
    status: string;
    @ManyToMany(() => Category, category => category.products)
    @JoinTable( { name: 'product_category', joinColumn: { name: 'product_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' } })
        categories: Category[];
    @OneToMany(() => OrderLine, orderLine => orderLine.product)
        orderLines: OrderLine[];
    @OneToMany(() => ImagesProduct, images => images.product)
        images: ImagesProduct[];
    @ManyToMany(() => Cart, cart => cart.products)
        carts: Cart[];
    @OneToMany(() => Favorites, favorite => favorite.product)
        favorites: Favorites[];
    

}

// model Product {
//   id             Int             @id @default(autoincrement())
//   name           String
//   slug           String          @unique
//   file           String
//   fileSize       Int
//   description    String
//   triangles      Int
//   userId         Int
//   cartId         Int?
//   favoritesCount Int             @default(0)
//   status         status          @default(ACTIVE)
//   createdAt      DateTime        @default(now())
//   updatedAt      DateTime        @updatedAt
