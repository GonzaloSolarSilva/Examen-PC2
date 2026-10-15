import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  id?: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private url = 'https://careli2021.github.io/api_examen/api/estudiante.json';
  estudianteSeleccionado: Estudiante | null = null;

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  calcularSuma(e: Estudiante): number {
    return Number(e.nota1) + Number(e.nota2) + Number(e.nota3);
  }

  calcularPromedio(e: Estudiante): number {
    return this.calcularSuma(e) / 3;
  }

  obtenerEstado(e: Estudiante): string {
    return this.calcularPromedio(e) >= 13 ? 'Aprobado' : 'Desaprobado';
  }

  obtenerObservacion(e: Estudiante): string {
    const promedio = this.calcularPromedio(e);
    if (promedio >= 17) {
      return 'Excelente';
    } else if (promedio >= 13) {
      return 'Regular';
    } else {
      return 'En riesgo';
    }
  }
}