import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getPokemons(limit = 10, offset = 0): Observable<{results: PokemonListItem[], count: number}>{
    return this.http
    .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
    .pipe(map(response => ({
      results: response.results, count: response.count
    })))
  } 

  getPokemon(name: string): Observable<PokemonInterface> {
    return this.http.get<PokemonInterface>(`${this.baseUrl}/pokemons/${name}`)
    //return this.http.get<PokemonInterface>(`${this.baseUrl}/pokemon/${name}`)
  }

  getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return +parts[parts.length - 1]
  }

  getSpriteUrl(url: string): string {
    const id = this.getIdFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }
}
