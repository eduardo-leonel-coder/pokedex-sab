import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pokemons',
        pathMatch: 'full'
    },
    {
        path: 'pokemons',
        loadChildren: () => import('./pages/pokemons/pokemons.routes')
                .then(m => m.pokemonsRoutes)
    },
    // {
    //     path: 'pokemons',
    //     loadComponent: () => import('./pages/pokemon-list/pokemon-list')
    //         .then(m => m.PokemonList)
    // },
    // {
    //     path: 'pokemons/:name',
    //     loadComponent: () => import('./pages/pokemon-detail/pokemon-detail')
    //         .then(m => m.PokemonDetail)
    // },
    {
        path: 'registro',
        loadComponent: () => import('./pages/registro-entrenador/registro-entrenador')
            .then(m => m.RegistroEntrenador)
    },
    {
        path: 'favoritos',
        loadComponent: () => import('./pages/favoritos/favoritos')
            .then(m => m.Favoritos)
    }, 
];
