import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanService, Column, Card } from '../services/kanban.service';
import { CardComponent } from '../card/card';
import Swal from 'sweetalert2';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, DragDropModule],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
})
export class ColumnComponent implements OnChanges {
  @Input() column!: Column;
  @Output() columnDeleted = new EventEmitter<number>();
  @Output() columnUpdated = new EventEmitter<Column>();
  @Output() cardCreated = new EventEmitter<Card>();
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() cardDeleted = new EventEmitter<number>();
  @Input() allColumns: Column[] = [];

  showEditColumnModal = false;
  editColumnName = '';
  showNewCardModal = false;
  newCardTitle = '';
  newCardDescription = '';

  isDeleting = false;
  isUpdatingColumn = false;
  isCreatingCard = false;

  /** Listas de colunas conectadas para drag and drop */
  connectedDropLists: string[] = [];

  constructor(private kanbanService: KanbanService) {}

  /** Atualiza listas conectadas quando allColumns muda */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['allColumns'] && this.allColumns) {
      this.connectedDropLists = this.allColumns
        .map((col) => 'column-' + col.id)
        .filter((id) => id !== 'column-' + this.column.id);
    }
  }

  /** Move cards dentro ou entre colunas */
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateOrders(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedCard = event.container.data[event.currentIndex];
      movedCard.columnId = this.column.id;
      movedCard.order = event.currentIndex;

      this.kanbanService.updateCard(movedCard.id, { columnId: movedCard.columnId }).subscribe({
        error: (err) => console.error('Erro ao atualizar coluna do card:', err),
      });

      this.updateOrders(event.previousContainer.data);
      this.updateOrders(event.container.data);
    }
  }

  /** Atualiza a ordem dos cards na coluna */
  updateOrders(cards: Card[]) {
    cards.forEach((card, index) => {
      card.order = index;
    });

    const payload = cards.map((card) => ({
      id: card.id,
      order: card.order,
      columnId: card.columnId,
    }));

    this.kanbanService.updateManyOrders(payload).subscribe();
  }

  editColumn() {
    this.editColumnName = this.column.name;
    this.showEditColumnModal = true;
  }

  closeEditColumnModal() {
    this.showEditColumnModal = false;
  }

  /** Atualiza o nome da coluna */
  updateColumn() {
    if (!this.editColumnName.trim() || this.isUpdatingColumn) return;

    this.isUpdatingColumn = true;

    this.kanbanService.updateColumn(this.column.id, this.editColumnName).subscribe({
      next: (colunaAtualizada) => {
        this.isUpdatingColumn = false;
        this.column.name = colunaAtualizada.name;
        this.columnUpdated.emit({
          ...this.column,
          name: colunaAtualizada.name,
        });
        this.closeEditColumnModal();
      },
      error: (err) => {
        this.isUpdatingColumn = false;
        console.error('Erro ao atualizar coluna', err);
      },
    });
  }

  /** Deleta a coluna com confirmação */
  deleteColumn() {
    if (this.isDeleting) return;

    Swal.fire({
      title: 'Tem certeza?',
      text: `A coluna "${this.column.name}" será deletada permanentemente!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0054ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isDeleting = true;

      this.kanbanService.deleteColumn(this.column.id).subscribe({
        next: () => {
          this.isDeleting = false;
          Swal.fire({
            title: 'Deletado!',
            text: 'A coluna foi removida com sucesso.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.columnDeleted.emit(this.column.id);
        },
        error: (err) => {
          this.isDeleting = false;
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível deletar a coluna.',
            icon: 'error',
          });
          console.error('Erro ao deletar coluna', err);
        },
      });
    });
  }

  openNewCardModal() {
    this.showNewCardModal = true;
    this.newCardTitle = '';
    this.newCardDescription = '';
  }

  closeNewCardModal() {
    this.showNewCardModal = false;
  }

  /** Cria um novo card na coluna */
  createCard() {
    if (!this.newCardTitle.trim() || this.isCreatingCard) return;

    this.isCreatingCard = true;

    this.kanbanService
      .createCard({
        title: this.newCardTitle,
        description: this.newCardDescription || undefined,
        columnId: this.column.id,
      })
      .subscribe({
        next: (novoCard) => {
          this.isCreatingCard = false;
          this.column.cards = [...this.column.cards, novoCard];
          this.column = {
            ...this.column,
            cards: [...this.column.cards],
          };
          this.cardCreated.emit(novoCard);
          this.closeNewCardModal();
        },
        error: (err) => {
          this.isCreatingCard = false;
          console.error('Erro ao criar card', err);
        },
      });
  }

  /** Atualiza card existente */
  onCardUpdated(card: Card) {
    const index = this.column.cards.findIndex((c) => c.id === card.id);
    if (index !== -1) this.column.cards[index] = card;
    this.cardUpdated.emit(card);
  }

  /** Remove card da coluna */
  onCardDeleted(cardId: number) {
    this.column.cards = this.column.cards.filter((c) => c.id !== cardId);
    this.cardDeleted.emit(cardId);
  }
}
