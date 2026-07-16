import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosReduxStore } from './favoritos-redux.store';

describe('FavoritosReduxStore', () => {
  let component: FavoritosReduxStore;
  let fixture: ComponentFixture<FavoritosReduxStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosReduxStore],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosReduxStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
