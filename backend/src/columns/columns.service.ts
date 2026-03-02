import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  // Cria uma nova coluna
  async create(CreateColumnDto: CreateColumnDto) {
    const column = this.columnRepository.create(CreateColumnDto);
    const saved = await this.columnRepository.save(column);

    return this.columnRepository.findOne({
      where: { id: saved.id },
      relations: ['cards'],
    });
  }

  // Retorna todas as colunas com seus cards ordenados
  async findAll(): Promise<ColumnEntity[]> {
    return this.columnRepository.find({
      relations: ['cards'],
      order: {
        id: 'ASC',
        cards: {
          order: 'ASC',
        },
      },
    });
  }

  // Encontra uma coluna por ID
  async findOne(id: number): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Coluna com ID ${id} não encontrada`);
    }
    return column;
  }

  // Atualiza uma coluna existente
  async update(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnEntity> {
    await this.findOne(id);
    await this.columnRepository.update(id, updateColumnDto);
    return this.findOne(id);
  }

  // Remove uma coluna
  async remove(id: number): Promise<void> {
    const column = await this.findOne(id);
    await this.columnRepository.remove(column);
  }
}
