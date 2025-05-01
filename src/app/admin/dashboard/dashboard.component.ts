import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  user: string = "";

  ngOnInit() {
    this.user = localStorage.getItem('user') || '';
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private router: Router,
    private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
