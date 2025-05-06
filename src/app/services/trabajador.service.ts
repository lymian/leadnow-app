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

export interface RegistrarTrabajador {
  username: string;
  nombreCompleto: string;
  email: string;
}

export interface ChangePassword {
  newPassword: string;
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
  //http://localhost:8080/usuarios/registrar
  registrarTrabajador(trabajador: RegistrarTrabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(`${this.apiUrl}/registrar`, trabajador);
  }
  //http://localhost:8080/usuarios/eliminar/{id}
  eliminarTrabajador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
  //sin parametros
  //http://localhost:8080/usuarios/cambiar-contrasena
  cambiarContrasena(dto: ChangePassword): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cambiar-contrasena`, dto);
  }
}