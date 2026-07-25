import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { FavoritosNgrxStore } from "../../store/favoritos-ngrx.store/favoritos-ngrx.store";
import { PokemonCard } from "../../components/pokemon-card/pokemon-card";

@Component({
    selector: 'app-favoritos', 
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PokemonCard],
    templateUrl: './favoritos.html', 
})

export class Favoritos {
    readonly store = inject(FavoritosNgrxStore);
}