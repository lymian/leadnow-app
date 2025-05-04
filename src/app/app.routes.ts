import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormulariosComponent } from './admin/dashboard/formularios/formularios.component';
import { DashboardGerenteComponent } from './garente/dashboard/dashboard.component';
import { TrabajadoresComponent } from './garente/dashboard/trabajadores/trabajadores.component';
import { FormulariosTrabajadorComponent } from './garente/dashboard/trabajadores/formularios-trabajador/formularios-trabajador.component';
import { LeadsComponent } from './garente/dashboard/trabajadores/leads/leads.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'formularios', pathMatch: 'full' },
            { path: 'formularios', component: FormulariosComponent },
        ],
    },
    {
        path: 'gerente', component: DashboardGerenteComponent, children: [
            { path: '', redirectTo: 'trabajadores', pathMatch: 'full' },
            { path: 'trabajadores', component: TrabajadoresComponent },
            { path: 'trabajadores/:id/formularios', component: FormulariosTrabajadorComponent },
            { path: 'formularios/:id/leads', component: LeadsComponent },
        ]
    }
];
