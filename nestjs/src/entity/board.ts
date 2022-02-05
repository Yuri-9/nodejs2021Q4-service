import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { ColumnEn } from './column';
import { Task } from './task';

@Entity('board')
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEn, (column) => column.board)
  columns!: ColumnEn[];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
