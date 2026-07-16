import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosStore } from './favoritos.store';

describe('FavoritosStore', () => {
  let component: FavoritosStore;
  let fixture: ComponentFixture<FavoritosStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosStore],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
