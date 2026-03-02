import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanService, Column, Card } from '../services/kanban.service';
import { ColumnComponent } from '../column/column';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, ColumnComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})
export class Board implements OnInit {
  columns: Column[] = [];
  showNewColumnModal = false;
  newColumnName = '';
  isCreatingColumn = false;

  constructor(
    private kanbanService: KanbanService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadColumns();
  }

  loadColumns() {
    this.kanbanService.getColumns().subscribe({
      next: (data) => {
        this.columns = [...data];
        this.cdr.detectChanges();
      },
    });
  }

  openNewColumnModal() {
    this.showNewColumnModal = true;
    this.newColumnName = '';
  }

  closeNewColumnModal() {
    this.showNewColumnModal = false;
  }

  createColumn() {
    if (!this.newColumnName.trim() || this.isCreatingColumn) return;

    this.isCreatingColumn = true;

    this.kanbanService.createColumn(this.newColumnName).subscribe({
      next: (novaColuna) => {
        this.isCreatingColumn = false;

        this.columns = [...this.columns, novaColuna];

        this.closeNewColumnModal();

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isCreatingColumn = false;
        console.error('Erro ao criar coluna', err);
      },
    });
  }

  onColumnDeleted(columnId: number) {
    this.columns = this.columns.filter((col) => col.id !== columnId);
  }

  onColumnUpdated(colunaAtualizada: Column) {
    const index = this.columns.findIndex((col) => col.id === colunaAtualizada.id);
    if (index !== -1) this.columns[index] = colunaAtualizada;
  }

  onCardCreated(novoCard: Card) {}
  onCardUpdated(cardAtualizado: Card) {}
  onCardDeleted(cardId: number) {}
}
