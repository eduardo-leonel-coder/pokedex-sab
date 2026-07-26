import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { FavoritosNgrxStore } from "@store";
import { PokemonCard } from "@components/pokemon-card/pokemon-card";
import { pattern } from "@angular/forms/signals";
import {FavoritosFacade} from "@store";
import { FavoritosReduxStore } from "@store";

@Component({
    selector: 'app-favoritos', 
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PokemonCard],
    templateUrl: './favoritos.html', 
})

export class Favoritos {
    // readonly store = inject(FavoritosNgrxStore);
    readonly favoritos = inject(FavoritosFacade);
    // readonly store = inject(FavoritosReduxStore);
}