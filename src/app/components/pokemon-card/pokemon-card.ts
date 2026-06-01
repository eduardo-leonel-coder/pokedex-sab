import { Component, Input } from '@angular/core';
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
  @Input() name: string = '';
  @Input() spriteUrl: string = '';
  @Input() types: string[] = [];
  @Input() id: number = 0;

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const spriteNormal = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
    
    if (img.src !== spriteNormal){
      img.src = spriteNormal
    }else {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`
      img.onerror = null;
    }
  
  }
}
