import { Injectable, signal, computed } from '@angular/core';

@Injectable({providedIn: 'root'})

export class FavoritosStore {
  // el estado
  private readonly _favoritos = signal<Set<number>>(new Set());

  // la lectura publica
  readonly favoritos = this._favoritos.asReadonly();

  // derivados
  readonly total = computed(() => this._favoritos().size);
  readonly hayFavoritos = computed(() => this.total() > 0);
  readonly ids = computed(() => [...this._favoritos()].sort((a, b) => a -b));

    // metodos
    esFavorito(id:number): boolean{
      return this._favoritos().has(id)
    }

    alternar(id:number): void{
      const copia = new Set(this._favoritos());

      if (copia.has(id)){
        copia.delete(id)
      }else
      {
        copia.add(id);
      }
      this._favoritos.set(copia)
    }

    limpiar():void {
      this._favoritos.set(new Set());
    }
}
