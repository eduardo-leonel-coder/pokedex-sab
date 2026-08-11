import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  form,
  FormField,
  required,
  email,
  minLength,
  submit
} from '@angular/forms/signals'
import { SessionStore } from '@services/session-store';

interface Crendenciales {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  private readonly session = inject(SessionStore);
  private readonly router = inject(Router);

  readonly error = signal<string | null>(null);

  readonly credenciales = signal<Crendenciales>({
    email: '',
    password: ''
  });

  readonly loginForm = form(this.credenciales, (path) => {
    required(path.email, {
      message: "El email es obligatorio"
    });

    email(path.email, {
      message: 'Email no valido'
    })

    required(path.password, {
      message: "El password es obligatorio"
    });

    minLength(path.password, 6, {
        message: "Minimo 6 caracteres"
    })
  })

  onSubmit(): void {
    submit(this.loginForm, async () => {
      const {email, password} = this.credenciales();
      // autenticacion
      this.session.login(email, password);

      this.router.navigate(['/favoritos']);

      return null;
    })
  }
}
