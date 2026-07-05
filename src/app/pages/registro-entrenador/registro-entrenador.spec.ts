import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntrenador } from './registro-entrenador';

describe('RegistroEntrenador', () => {
  let component: RegistroEntrenador;
  let fixture: ComponentFixture<RegistroEntrenador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEntrenador],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEntrenador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
