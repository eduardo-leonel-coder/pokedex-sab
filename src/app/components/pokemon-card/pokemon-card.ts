import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgClass],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
  animations:[
    trigger('entradaTarjeta', [
      transition(":enter", [
        style({opacity: 0, transform: 'translateY(24px) scale(0.94)'}),
        animate(
          '320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ]),
      transition(":leave", [
         animate(
          '180ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' })
        )
      ])
    ])
  ]
})



export class PokemonCard {
  // Default version vieja de Angular
  // @Input() name: string = '';
  // @Input() spriteUrl: string = '';
  // @Input() types: string[] = [];
  // @Input() id: number = 0;

  // OnPush version nueva de Angular
  name = input.required<string>();
  spriteUrl = input.required<string>();
  id = input.required<number>();

  types = input<string[]>([]);

  esFavorito = model<boolean>(false);
  //favorito = output<number>();

  // marcarFavorito(): void {
  //   this.favorito.emit(this.id())
  // }

  alternarFavorito():void {
    this.esFavorito.set(!this.esFavorito())
  }


    onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const spriteNormal = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id()}.png`;
    
    if (img.src !== spriteNormal){
      img.src = spriteNormal
    }else {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`
      img.onerror = null;
    }
  
  }
}
