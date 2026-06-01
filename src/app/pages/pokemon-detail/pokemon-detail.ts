import {
  Component, OnInit,
  inject, signal, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser }  from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, TitleCasePipe } from '@angular/common';
import { PokemonService }         from '../../services/pokemon.service';
import { PokemonInterface }                from '../../interfaces/pokemon.interface';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
 
@Component({
  selector:    'app-pokemon-detail',
  imports:     [NgClass, TitleCasePipe],
  templateUrl: './pokemon-detail.html',
  styleUrl:    './pokemon-detail.scss',
  animations: [
 

    trigger('entradaDetalle', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(32px)' }),
        animate(
          '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),
 

    trigger('entradaStats', [
      transition(':enter', [
        query('.stat-row', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(60, [
            animate('250ms ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PokemonDetail implements OnInit {
 
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private pokemonService = inject(PokemonService);
  private platformId     = inject(PLATFORM_ID);
 
  pokemon  = signal<PokemonInterface | null>(null);
  cargando = signal(false);
  error    = signal('');
 
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) this.cargarDetalle(name);
  }
 
  cargarDetalle(name: string): void {
    this.cargando.set(true);
    this.error.set('');
    this.pokemonService.getPokemon(name).subscribe({
      next:  (data) => { this.pokemon.set(data); this.cargando.set(false); },
      // err.mensajeUsuario viene del errorHandlerInterceptor
      error: (err)  => {
        this.error.set(err?.mensajeUsuario ?? `No se encontro a ${name}.`);
        this.cargando.set(false);
      }
    });
  }
 
  volver(): void { this.router.navigate(['/pokemons']); }
 
  statPercent(value: number): number { return Math.round((value / 255) * 100); }
}
