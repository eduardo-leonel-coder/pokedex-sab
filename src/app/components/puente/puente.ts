import { Component } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop'
import {interval} from 'rxjs'

@Component({
  selector: 'app-puente',
template: `<p>Segundos Transcurridos: {{contador()}}</p>`
})

export class Puente {
  contador = toSignal(interval(1000), {initialValue: 0});
}
