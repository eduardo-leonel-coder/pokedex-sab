import {
  Component, OnInit, OnDestroy,
  inject, signal, computed, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser }  from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription }       from 'rxjs';
import { PokemonService }     from '../../services/pokemon.service';
import { PokemonListItem }    from '../../interfaces/pokemon.interface';
import { PokemonCard }        from '../../components/pokemon-card/pokemon-card';
 
@Component({
  selector:    'app-pokemon-list',
  imports:     [PokemonCard, ReactiveFormsModule],
  templateUrl: './pokemon-list.html',
  styleUrl:    './pokemon-list.scss'
})
export class PokemonList implements OnInit, OnDestroy {
 
  private pokemonService = inject(PokemonService);
  private platformId     = inject(PLATFORM_ID);
  private sub?: Subscription;
 
  pokemons     = signal<PokemonListItem[]>([]);
  cargando     = signal(false);
  error        = signal('');
  paginaActual = signal(1);
  totalCount   = signal(0);
  favoritos    = signal<Set<number>>(new Set());
 

  readonly limit = 24;
 
  busqueda = new FormControl('', { nonNullable: true });

  // Signal puente — computed() solo reacciona a Signals, no a FormControl
  busquedaSignal = signal('');
 
  pokemonsFiltrados = computed(() => {
    const filtro = this.busquedaSignal().toLowerCase().trim();
    if (!filtro) return this.pokemons();
    return this.pokemons().filter(p => p.name.includes(filtro));
  });
 
  totalPaginas = computed(() => Math.ceil(this.totalCount() / this.limit));
 
  paginas = computed(() => {
    const total  = this.totalPaginas();
    const actual = this.paginaActual();
    const rango  = 2;
    let inicio = Math.max(1, actual - rango);
    let fin    = Math.min(total, actual + rango);
    if (fin - inicio < rango * 2) {
      if (inicio === 1) fin = Math.min(total, inicio + rango * 2);
      else inicio = Math.max(1, fin - rango * 2);
    }
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  });
 
  ngOnInit(): void {
    this.cargarPokemons();
 
    this.sub = this.busqueda.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(valor => {
      this.busquedaSignal.set(valor); // actualiza la Signal → dispara computed()
    });
  }
 
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
 
  cargarPokemons(): void {
    this.cargando.set(true);
    this.error.set('');
    const offset = (this.paginaActual() - 1) * this.limit;
 
    this.pokemonService.getPokemons(this.limit, offset).subscribe({
      next: (data) => {
        this.pokemons.set(data.results);
        this.totalCount.set(data.count);
        this.cargando.set(false);
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        this.error.set(err?.mensajeUsuario ?? 'No se pudo conectar a la PokeAPI.');
        this.cargando.set(false);
      }
    });
  }
 
  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas() || p === this.paginaActual()) return;
    this.busqueda.reset();
    this.busquedaSignal.set(''); // sincronizar al limpiar
    this.paginaActual.set(p);
    this.cargarPokemons();
  }
 
  // onFavorito(id: number):void {
  //   console.log('POkemon marcado como favorito:', id)
  // }

  onFavorito(id: number):void {
    const actuales = new Set(this.favoritos());
    if (actuales.has(id)) {
      actuales.delete(id);
    }else {
      actuales.add(id)
    }
    this.favoritos.set(actuales)
  }

  esFavorito(id: number): boolean {
    return this.favoritos().has(id);
  }

  getId(url: string):     number { return this.pokemonService.getIdFromUrl(url); }
  getSprite(url: string): string { return this.pokemonService.getSpriteUrl(url); }
}