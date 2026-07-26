import { Route, Routes } from "@angular/router";

export const pokemonsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../pokemon-list/pokemon-list')
                    .then(m => m.PokemonList)
    },
    {
        path: ':name',
        loadComponent: () => import('../pokemon-detail/pokemon-detail')
                    .then(m => m.PokemonDetail)
    }

]