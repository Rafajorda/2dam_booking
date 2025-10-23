import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { ImagesProduct } from '../images/images.entity';
import { Cart } from '../cart/cart.entity';
import { Favorites } from '../favorites/favorites.entity';




@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @Column()
    name: string;
    @Column()
    description: string
    @Column()//color es provisional, puede que cambie
    color: string;
     @Column('decimal', { precision: 10, scale: 2 })
    price: number; // 👈 precio del mueble
    @Column({ nullable: true })
    dimensions: string;
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

