import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn() // ID auto-increment.
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true }) // descrição opcional
  description: string;

  @Column()
  order: number; // Para ordenar os cards dentro da coluna

  @Column()
  columnId: number;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE', // Se a coluna for deletada, os cards também são deletados
  })
  column: ColumnEntity;
}
