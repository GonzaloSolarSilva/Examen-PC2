import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante';

@Component({
  selector: 'app-detalle-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-estudiante.html'
})
export class DetalleEstudiante implements OnInit {
  estudiante: Estudiante | null = null;
  cargando = false;
  error = '';

  constructor(
    public servicio: EstudianteService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.servicio.estudianteSeleccionado) {
      this.estudiante = this.servicio.estudianteSeleccionado;
    } else {
      const index = Number(this.route.snapshot.paramMap.get('id'));
      this.cargando = true;
      this.servicio.obtenerEstudiantes().subscribe({
        next: (datos: Estudiante[]) => {
          this.estudiante = datos[index] || null;
          if (!this.estudiante) {
            this.error = 'Estudiante no encontrado.';
          }
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se pudo cargar la información del estudiante.';
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  get suma(): number {
    return this.estudiante ? this.servicio.calcularSuma(this.estudiante) : 0;
  }

  get promedio(): number {
    return this.estudiante ? this.servicio.calcularPromedio(this.estudiante) : 0;
  }

  get estado(): string {
    return this.estudiante ? this.servicio.obtenerEstado(this.estudiante) : '';
  }

  get observacion(): string {
    return this.estudiante ? this.servicio.obtenerObservacion(this.estudiante) : '';
  }

  volver(): void {
    this.router.navigate(['/estudiantes']);
  }
}