import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import {Puente} from './components/puente/puente'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Puente],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Pokedex');
}
