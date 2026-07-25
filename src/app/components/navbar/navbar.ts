import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FavoritosStore} from '../../store/favoritos.store/favoritos.store';
import { FavoritosReduxStore } from '../../store/favoritos-redux.store/favoritos-redux.store';
import { FavoritosNgrxStore } from '../../store/favoritos-ngrx.store/favoritos-ngrx.store';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // readonly favoritosStore = inject(FavoritosStore)
  readonly favoritosStore = inject(FavoritosNgrxStore)
}
