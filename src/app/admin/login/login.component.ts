import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  onLogin() {
    this.errorMessages = [];
    this.successMessage = null;

    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Respuesta del servidor:', response);

        // Si se recibió un token correctamente
        if (response.token) {
          window.location.href = '/dashboard'; // Redirigir a la página de dashboard
        }
      },
      error: (error) => {
        console.error('❌ Error en la petición:', error);

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
