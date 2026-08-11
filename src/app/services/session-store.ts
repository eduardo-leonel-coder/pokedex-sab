import { Injectable, signal, computed } from '@angular/core';

interface Usuario{
  sub: string; 
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})

export class SessionStore {
  private readonly _token = signal<string | null>(null);
  private readonly _usuario = signal<Usuario | null>(null);

  readonly token = this._token.asReadonly();
  readonly usuario = this._usuario.asReadonly();
  readonly estaAutenticado = computed(() => this._token() !== null);
  readonly rol = computed(() => this._usuario()?.role ?? null);

  constructor() {
    this.restaurarSesion();
  }

  login(email: string, _password: string): void {
    const token = this.generarTokenMock(email);

    this._token.set(token);
    this._usuario.set(this.decodificarPayload(token));

    localStorage.setItem('token', token);
  }

  logout(): void {
    this._token.set(null);
    this._usuario.set(null);

    localStorage.removeItem('token');
  }

  private decodificarPayload(token: string): Usuario {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private restaurarSesion(): void {
    const token = localStorage.getItem('token');
    if (token){
      this._token.set(token);
      this._usuario.set(this.decodificarPayload(token));
    }
  }

  // mock - fabricando un jwt 
  private generarTokenMock(email: string): string {
    const header = btoa(JSON.stringify({alg: "HS256", typ: "JWT"}));
    const rol = email.includes('admin') ? 'admin' : 'entrenador';
    const payload = btoa(JSON.stringify({
      sub: '10',
      name: email.split("@")[0],
      role: rol,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }));
    return `${header}.${payload}.firma-falsa-mock`;
  }
}
