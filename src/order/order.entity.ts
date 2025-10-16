import { OrderLine } from '../orderline/orderline.entity';
import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
    @Column()
    slug: string;
    @Column()
    userId: number
    @Column('float')
    total: number
    @Column({ default: 'active' })
    status: string;

    @ManyToMany(() => User, user => user.orders)
        users: User[];

    @OneToMany(() => OrderLine, orderLine => orderLine.order)
orderLines: OrderLine[];
}


// model Order {
//   id         Int         @id @default(autoincrement())
//   slug       String
//   userId     Int
//   total      Float
//   status     status      @default(ACTIVE)
//   createdAt  DateTime    @default(now())
//   updatedAt  DateTime    @updatedAt
//   user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)
//   orderLines OrderLine[]
// }
