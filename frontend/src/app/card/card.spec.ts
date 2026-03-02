import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card';

describe('Card Component', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    // 👇 mock do input necessário
    component.card = {
      id: 1,
      title: 'Teste',
      description: 'Descrição teste',
      columnId: 1,
      order: 0,
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
