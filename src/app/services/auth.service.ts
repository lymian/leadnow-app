import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:8080/public/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, credentials).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        console.log('✅ Login exitoso:', response);
        return response;
      }),
      catchError((error) => {
        console.error('❌ Error en login:', error);
        return throwError(() => error); // Reenvía el error al componente
      })
    );
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para eliminar el token (logout)
  logout(): void {
    localStorage.clear();
  }
}
