
import { Product } from '../product/product.entity';
import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm';


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    total: number;

    @Column({ default: 'active' })
    status: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => User, user => user.cart, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Product, (product) => product.carts)
    @JoinTable()
        products: Product[];
}

// model Cart {
//   id        Int           @id @default(autoincrement())
//   userId    Int
//   total     Float
//   status    status        @default(ACTIVE)
//   createdAt DateTime      @default(now())
//   updatedAt DateTime      @updatedAt
//   user      User          @relation(fields: [userId], references: [id], onDelete: Cascade)
//   cartLines CartProduct[]
//   products  Product[]
// }

