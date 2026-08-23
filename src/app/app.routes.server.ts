import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';
import {inject} from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    
    async getPrerenderParams() {
      const pokemonService = inject(PokemonService)
      const { results } = await firstValueFrom(pokemonService.getPokemons(151,0));
      return results.map(p => ({name: p.name}))
    },
  },
  {
    path: 'favoritos',
    renderMode: RenderMode.Client,
  },
  {
    path: 'registro',
    renderMode: RenderMode.Client,
  },
  {
    path: 'login',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
