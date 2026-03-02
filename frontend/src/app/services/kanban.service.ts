import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Column {
  id: number;
  name: string;
  cards: Card[];
}

export interface Card {
  id: number;
  title: string;
  order: number;
  description?: string;
  columnId: number;
}

export interface ReorderCardDto {
  id: number;
  order: number;
  columnId: number;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  order?: number;
  columnId?: number;
}

@Injectable({ providedIn: 'root' })
export class KanbanService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/columns`);
  }

  createColumn(name: string): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/columns`, { name });
  }

  updateColumn(id: number, name: string): Observable<Column> {
    return this.http.patch<Column>(`${this.apiUrl}/columns/${id}`, { name });
  }

  deleteColumn(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/columns/${id}`);
  }

  createCard(card: { title: string; description?: string; columnId: number }): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, card);
  }

  updateCard(id: number, data: UpdateCardDto) {
    return this.http.patch<Card>(`http://localhost:3000/cards/${id}`, data);
  }

  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${id}`);
  }
  updateManyOrders(cards: ReorderCardDto[]) {
    return this.http.patch('http://localhost:3000/cards/reorder', { cards });
  }

  reorderCards(cards: { id: number; order: number; columnId: number }[]) {
    // enviando no formato que o Nest espera
    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/cards/reorder`,
      { cards }, // <- wrapper "cards" obrigatório
    );
  }
}
