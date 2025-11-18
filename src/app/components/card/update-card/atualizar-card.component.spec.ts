import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCardComponent } from './atualizar-card.component';

describe('AtualizarCardComponent', () => {
  let component: AtualizarCardComponent;
  let fixture: ComponentFixture<AtualizarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
