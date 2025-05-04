import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Trabajador, TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardGerenteComponent implements OnInit {

  isSidebarCollapsed = false;
  user: string = "";
  userRole: string = ""; // Variable para almacenar el rol del usuario
  trabajador: Trabajador | null = null; // Variable para almacenar el trabajador

  constructor(private router: Router,
    private authService: AuthService,
    private trabajadorService: TrabajadorService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user') || '';
    this.trabajadorService.obtenerTrabajadorPorUsername(this.user).subscribe(
      (trabajador: Trabajador) => {
        this.trabajador = trabajador;
      },
      (error) => {
        console.error('Error fetching trabajador:', error);
      }
    );

  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}