import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pokemons',
        pathMatch: 'full'
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
        path: 'pokemons',
        loadChildren: () => import('./pages/pokemons/pokemons.routes')
                .then(m => m.pokemonsRoutes)
    },
    {
        path: 'registro',
        loadComponent: () => import('./pages/registro-entrenador/registro-entrenador')
        .then(m => m.RegistroEntrenador),
        canActivate: [authGuard]
    },
    {
        path: 'favoritos',
        loadComponent: () => import('./pages/favoritos/favoritos')
        .then(m => m.Favoritos),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import ('./pages/login/login')
        .then(m=> m.Login),
    }, 
];
