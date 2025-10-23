
import { Cart } from '../cart/cart.entity';
import { Favorites } from '../favorites/favorites.entity';
import { Order } from '../order/order.entity';
import { OrderLine } from '../orderline/orderline.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';


export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}


@Entity()
export class User {
  constructor() {
   
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @OneToOne(() => Cart, cart => cart.user)
  cart: Cart;
  @OneToMany(() => Favorites, favorite => favorite.user)
  favorites: Favorites[];

  
   @ManyToMany(() => Order, order => order.users)
      @JoinTable( { name: 'user_order', joinColumn: { name: 'user_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'order_id', referencedColumnName: 'id' } })
      orders: Order [];




}
