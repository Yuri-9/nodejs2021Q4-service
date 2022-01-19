import 'reflect-metadata'
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany} from "typeorm";
import { Task } from './task'


@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}