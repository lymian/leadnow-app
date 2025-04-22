import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private apiUrl = 'http://localhost:8080/leads/crear'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo lead
  crearLead(leadData: any): Observable<any> {
    return this.http.post(this.apiUrl, leadData);
  }
}
