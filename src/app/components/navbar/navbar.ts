import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FavoritosStore} from '../../store/favoritos.store/favoritos.store';
import { FavoritosReduxStore } from '../../store/favoritos-redux.store/favoritos-redux.store';
import { FavoritosNgrxStore } from '../../store/favoritos-ngrx.store/favoritos-ngrx.store';
import { FavoritosFacade} from '@store'
import { HasRole } from '@directives/has-role';
import { SessionStore } from '@services/session-store';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, HasRole],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // readonly favoritosStore = inject(FavoritosStore)
  // readonly favoritosStore = inject(FavoritosNgrxStore)
  readonly favoritos = inject(FavoritosFacade);

  // inyeccion de SessionStore para verificar si el usuario esta autenticado
  private readonly session = inject(SessionStore);

  // inyeccion de Router para poder navegar hacia la pagina de pokemons
  private readonly router = inject(Router);

  readonly estaAutenticado = this.session.estaAutenticado;

  // boton de cerrar sesion.
  // Redirigimos al usuario a la pagina de pokemons porque la pagina de login es muy plana
  // y no obligamos al usuario a volver a hacer click en pokemons, mejor le mostramos
  // directamente el catalogo de pokemons.
  logOut(): void {
    this.session.logout();
 
    this.router.navigate(['/pokemons']);
  }
}
