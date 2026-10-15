import { Routes } from '@angular/router';
import { Estudiantes } from './estudiantes/estudiantes';
import { DetalleEstudiante } from './detalle-estudiante/detalle-estudiante';

export const routes: Routes = [
  { path: 'estudiantes', component: Estudiantes },
  { path: 'detalle/:id', component: DetalleEstudiante },
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' }
];