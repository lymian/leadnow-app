import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trabajador {
  id: number;
  nombreCompleto: string;
  email: string;
  username: string;
  fechaRegistro: string;
  numeroFormularios: number;
}

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  obtenerAdministradores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/administradores`);
  }
  //http://localhost:8080/usuarios/username/{username}
  obtenerTrabajadorPorUsername(username: string): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/username/${username}`);
  }
}