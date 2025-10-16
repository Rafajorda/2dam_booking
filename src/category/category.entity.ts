
import { Product } from '../product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
    @Column({ unique: true })
    slug: string;
    @Column()
    description: string
    @Column({ default: 'active' })
    status: string;
    @ManyToMany(() => Product, product => product.categories)
    products: Product[];
// model Category {
}
