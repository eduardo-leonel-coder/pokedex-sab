import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosReducer } from './favoritos.reducer';

describe('FavoritosReducer', () => {
  let component: FavoritosReducer;
  let fixture: ComponentFixture<FavoritosReducer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosReducer],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosReducer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
