import { Injectable, signal, computed } from '@angular/core';
import { FavoritosActions } from '../favoritos.actions/favoritos.actions';
import { favoritosReducer, estadoInicial, FavoritosState } from '../favoritos.reducer/favoritos.reducer';

@Injectable({providedIn: 'root'})

export class FavoritosReduxStore {    

  private readonly _estado = signal<FavoritosState>(estadoInicial);

  // selectores
  readonly ids = computed(()=> this._estado().ids);
  readonly total = computed(()=> this.ids().length);
  readonly hayFavoritos = computed(()=> this.total() > 0);
  readonly ultimaAccion = computed(()=> this._estado().ultimaAccion);

  esFavorito(id:number): boolean {
    return this._estado().ids.includes(id);
  }

  // unica puerta de escritura
  distpatch(accion: FavoritosActions): void {
    const anterior = this._estado();

    const nuevo = favoritosReducer(anterior, accion);

    console.log(
      '%c[dispatch ' + accion.type,
      'color: #7c3; font-weight: bold',
      {anterior, accion, nuevo}
    )
    this._estado.set(nuevo)
  }

}
