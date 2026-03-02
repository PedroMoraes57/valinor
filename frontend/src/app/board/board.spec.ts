import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from './board';
import { KanbanService } from '../services/kanban.service';
import { of } from 'rxjs';

describe('Board', () => {
  let component: Board;
  let fixture: ComponentFixture<Board>;

  beforeEach(async () => {
    const kanbanServiceMock = {
      getColumns: () => of([]),
    };

    await TestBed.configureTestingModule({
      imports: [Board],
      providers: [{ provide: KanbanService, useValue: kanbanServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Board);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
