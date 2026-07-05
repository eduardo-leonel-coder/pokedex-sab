import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  form, FormField, 
  required, minLength, email,                   // validadores sincronos
  validateHttp,                                // validacion asincrona
  hidden,                                       // logica condicional de campos
  submit,                                       // envio controlado
  type ValidationError                          // la interfaz del error 
} from '@angular/forms/signals'

export interface Entrenador {
  nombre: string;
  email: string;
  pokemonFavorito: string;
  tipo: "novato" | "lider";
  gimnasio: string;
}

@Component({
  selector: 'app-registro-entrenador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, JsonPipe],
  templateUrl: './registro-entrenador.html',
  styleUrl: './registro-entrenador.scss',
})
export class RegistroEntrenador {

    modelo = signal<Entrenador>({
      nombre: '',
      email: '',
      pokemonFavorito: '',
      tipo: "novato",
      gimnasio: '',
    });

    // formulario = form(this.modelo)
    formulario = form(this.modelo, (ruta) =>{
      
      // sincronos 
      required(ruta.nombre, {message: 'El nombre es obligatorio.'});
      minLength(ruta.nombre, 3, {message: 'Minimo 3 caracteres.'})

      required(ruta.email, {message: 'El email es obligatorio.'});
      email(ruta.email, {message: 'Eso no parece un email valido.'})

      required(ruta.pokemonFavorito, {message: 'TOdo entrenador tiene un favorito.'});
    
      // asincrono
      validateHttp(ruta.pokemonFavorito, {
        request: ({ value }) => 
          value()
          ? `https://pokeapi.co/api/v2/pokemon/${value().toLowerCase().trim()}`
          : undefined,
        
          onSuccess: () => undefined,

          onError: () =>({
            kind: 'noExiste',
            message: 'Ese pokemon no existe en la PokeApi'
          } satisfies ValidationError)
      });
      
      hidden(ruta.gimnasio, ({valueOf}) => valueOf(ruta.tipo) !=='lider');

      required(ruta.gimnasio, {message: 'Un lider debe indicar su gimnasio.'})
    });
    
    onSubmit(event: Event): void {
      event.preventDefault();

      submit(this.formulario, async() =>{
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Entrenador registrado:", this.modelo());
        return undefined;
      })
    }

}
