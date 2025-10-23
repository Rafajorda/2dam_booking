
import { Product } from '../product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => Product, product => product.categories)
  products: Product[];
// model Category {
}
