import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puente } from './puente';

describe('Puente', () => {
  let component: Puente;
  let fixture: ComponentFixture<Puente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Puente],
    }).compileComponents();

    fixture = TestBed.createComponent(Puente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
