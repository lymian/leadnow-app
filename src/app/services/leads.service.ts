import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private apiUrl = 'http://localhost:8080/leads'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo lead
  crearLead(lead: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, lead);
  }
  // Método para eliminar un lead http://localhost:8080/leads/eliminar/1

  eliminarLead(leadId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${leadId}`);
  }
  //http://localhost:8080/leads/actualizar/1
  actualizarLead(id: number, leadData: any): Observable<any> {
    return this.http.put(`http://localhost:8080/leads/actualizar/${id}`, leadData);
  }
}
