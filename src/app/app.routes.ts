import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormulariosComponent } from './admin/dashboard/formularios/formularios.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'formularios', pathMatch: 'full' }, // Redirección automática
            { path: 'formularios', component: FormulariosComponent },
        ],
    },
];
