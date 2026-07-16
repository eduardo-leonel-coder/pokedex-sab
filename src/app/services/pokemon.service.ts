import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import {
  PokemonInterface,
  PokemonListResponse,
  PokemonListItem
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {
  private http = inject(HttpClient);

  private baseUrl = 'https://pokeapi.co/api/v2';

  private cacheDetalle = new Map<string, Observable<PokemonInterface>>();

  getPokemons(limit = 10, offset = 0): Observable<{results: PokemonListItem[], count: number}>{
    return this.http
    .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
    .pipe(map(response => ({
      results: response.results, count: response.count
    })))
  } 
  
  // getPokemon(name: string): Observable<PokemonInterface> {
  //   // return this.http.get<PokemonInterface>(`${this.baseUrl}/pokemons/${name}`)
  //   return this.http.get<PokemonInterface>(`${this.baseUrl}/pokemon/${name}`)
  // }

  getPokemon(name: string): Observable<PokemonInterface>{
    if (this.cacheDetalle.has(name)){
      return this.cacheDetalle.get(name)!;
    }

    const peticion = this.http
    .get<PokemonInterface>(`${this.baseUrl}/pokemon/${name}`)
    .pipe(
      shareReplay(1)
    );

    this.cacheDetalle.set(name, peticion);
    return peticion;
  }

  getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return +parts[parts.length - 1]
  }

  getSpriteUrl(url: string): string {
    const id = this.getIdFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  getTiposDeLista(items: PokemonListItem[]): Observable<{id: number, types: string[]}[]>{
    const peticiones = items.map(item =>
      this.getPokemon(item.name).pipe(
        map(detalle => ({
          id: detalle.id,
          types: detalle.types.map(t => t.type.name)
        })),
        catchError(()=> of({id: this.getIdFromUrl(item.url), types: [] as string []}))
      )
    );
    return forkJoin(peticiones)
  }

}
