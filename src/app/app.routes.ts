import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pokemons',
        pathMatch: 'full'
    },
    {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemon-list/pokemon-list')
            .then(m => m.PokemonList)
    },
    {
        path: 'pokemons/:name',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail')
            .then(m => m.PokemonDetail)
    }

    
];
