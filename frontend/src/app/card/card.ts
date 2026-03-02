import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanService, Card } from '../services/kanban.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() card!: Card;
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() cardDeleted = new EventEmitter<number>();

  showEditCardModal = false;
  editCardTitle = '';
  editCardDescription = '';

  isUpdating = false;
  isDeleting = false;

  constructor(private kanbanService: KanbanService) {}

  editCard() {
    this.editCardTitle = this.card.title;
    this.editCardDescription = this.card.description || '';
    this.showEditCardModal = true;
  }

  closeEditCardModal() {
    this.showEditCardModal = false;
  }

  updateCard() {
    if (!this.editCardTitle.trim() || this.isUpdating) return;
    this.isUpdating = true;
    this.kanbanService
      .updateCard(this.card.id, {
        title: this.editCardTitle,
        description: this.editCardDescription || undefined,
      })
      .subscribe({
        next: (cardAtualizado) => {
          this.isUpdating = false;
          this.card.title = cardAtualizado.title;
          this.card.description = cardAtualizado.description;
          this.cardUpdated.emit(cardAtualizado);
          this.closeEditCardModal();
        },
        error: (err: any) => {
          this.isUpdating = false;
          console.error('Erro ao atualizar card', err);
        },
      });
  }

  deleteCard() {
    if (this.isDeleting) return;

    Swal.fire({
      title: 'Tem certeza?',
      text: `O card "${this.card.title}" será deletado permanentemente!`,
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

      this.kanbanService.deleteCard(this.card.id).subscribe({
        next: () => {
          this.isDeleting = false;

          Swal.fire({
            title: 'Deletado!',
            text: 'O card foi removido com sucesso.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          this.cardDeleted.emit(this.card.id);
        },
        error: (err: any) => {
          this.isDeleting = false;

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível deletar o card.',
            icon: 'error',
          });

          console.error('Erro ao deletar card', err);
        },
      });
    });
  }
}
