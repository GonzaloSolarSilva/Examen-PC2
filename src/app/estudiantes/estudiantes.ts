import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.html'
})
export class Estudiantes implements OnInit {
  estudiantes: Estudiante[] = [];
  busqueda = '';
  cargando = false;
  error = '';

  constructor(
    private servicio: EstudianteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();

    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        this.estudiantes = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error HTTP:', err);
        this.error = 'No se pudieron obtener los estudiantes.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  get estudiantesFiltrados(): Estudiante[] {
    const texto = this.busqueda.trim().toLowerCase();
    return this.estudiantes.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }

  verDetalle(estudiante: Estudiante, index: number): void {
    this.servicio.estudianteSeleccionado = estudiante;
    this.router.navigate(['/detalle', index]);
  }
}