import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  authorities: string[];
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  username = '';
  password = '';
  errorMessages: string[] = [];
  successMessage: string | null = null;
  isLoading = false;



  constructor(private authService: AuthService) { }

  onLogin() {
    this.errorMessages = [];
    this.successMessage = null;
    this.isLoading = true;

    const credentials = {
      username: this.username,
      password: this.password,
    };


    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Respuesta del servidor:', response);

        // Si se recibió un token correctamente
        if (response.token) {
          localStorage.setItem('token', response.token);

          const decodedToken: JwtPayload = jwtDecode(response.token);
          const roles = decodedToken.authorities;

          localStorage.setItem('user', decodedToken.sub);
          localStorage.setItem('roles', JSON.stringify(roles));

          // Redirigir según el rol
          if (roles.includes('ROLE_ADMIN')) {
            window.location.href = '/dashboard';
          } else if (roles.includes('ROLE_GERENTE')) {
            window.location.href = '/gerente';
          } else {
            window.location.href = '/'; // o alguna ruta de acceso denegado
          }
        }
      },
      error: (error) => {
        console.error('❌ Error en la petición:', error);
        this.isLoading = false;

        // Manejo detallado del error según estructura del backend
        if (error.error && error.error.errors) {
          this.errorMessages = error.error.errors;
        } else if (error.error && error.error.message) {
          this.errorMessages = [error.error.message];
        } else {
          this.errorMessages = ['Ocurrió un error inesperado.'];
        }
      },
    });
  }
}
