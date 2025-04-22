import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  nombre: string;
  email: string;
  fechaEnvio: string;
  estado: string;
}

export interface Formulario {
  id: number;
  usuario: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  leads: Lead[];
}

export interface CrearFormularioDTO {
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})

export class FormulariosService {

  private baseUrl = 'http://localhost:8080/formularios';

  constructor(private http: HttpClient) { }

  getMisFormularios(): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(`${this.baseUrl}/mis-formularios`);
  }

  crearFormulario(dto: CrearFormularioDTO): Observable<Formulario> {
    return this.http.post<Formulario>(`${this.baseUrl}/crear`, dto);
  }
}
