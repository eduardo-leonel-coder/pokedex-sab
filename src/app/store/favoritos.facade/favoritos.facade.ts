import { Injectable, inject, Signal } from "@angular/core";
import {FavoritosNgrxStore} from "@store";
import {FavoritoPokemon} from "src/app/domain/pokemon.interface"
import { FormValueControl } from "@angular/forms/signals";


@Injectable({providedIn: 'root'})
 
export class FavoritosFacade{
    private readonly store = inject(FavoritosNgrxStore);

    readonly total: Signal<number> = this.store.total;
    readonly hayFavoritos: Signal<boolean> = this.store.hayFavoritos;
    readonly lista: Signal<FavoritoPokemon[]> = this.store.entities;

    alternar(p: FavoritoPokemon): void {
        this.store.alternar(p);
    }

    esFavorito(id: number): boolean {
        return this.store.esFavorito(id);
    }

    limpiar():void{
        this.store.limpiar();
    }
}