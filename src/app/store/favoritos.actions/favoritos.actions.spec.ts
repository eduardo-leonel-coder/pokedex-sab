import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosActions } from './favoritos.actions';

describe('FavoritosActions', () => {
  let component: FavoritosActions;
  let fixture: ComponentFixture<FavoritosActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosActions],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
