import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const { title, description, columnId } = createCardDto;

    // conta quantos cards já existem na coluna
    const cardsCount = await this.cardRepository.count({
      where: { columnId },
    });

    const card = this.cardRepository.create({
      title,
      description,
      order: cardsCount, // define a ordem como o número de cards existentes
      columnId,
    });

    const saved = await this.cardRepository.save(card);

    return this.cardRepository.findOne({
      where: { id: saved.id },
    });
  }

  async findAll(): Promise<CardEntity[]> {
    return this.cardRepository.find({
      relations: ['column'], // Traz também os dados da coluna
    });
  }

  async findOne(id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['column'],
    });
    if (!card) {
      throw new NotFoundException(`Card com ID ${id} não encontrado`);
    }
    return card;
  }

  // Buscar cards por coluna
  async findByColumn(columnId: number): Promise<CardEntity[]> {
    return this.cardRepository.find({
      where: { columnId },
      order: { order: 'ASC' }, // Ordena por 'order' crescente
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<CardEntity> {
    await this.findOne(id); // Verifica se existe
    await this.cardRepository.update(id, updateCardDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const card = await this.findOne(id);
    await this.cardRepository.remove(card);
  }

  async reorderCards(cards: { id: number; order: number; columnId: number }[]) {
    for (const card of cards) {
      await this.cardRepository.update(card.id, {
        order: card.order,
        columnId: card.columnId,
      });
    }
    return { message: 'Cards reordenados com sucesso' };
  }
}
