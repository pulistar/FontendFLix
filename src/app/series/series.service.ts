// series.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { series } from './series';

@Injectable({
  providedIn: 'root'
})
export class ConexionBackend {
  private apiUrl = 'http://localhost:8000/api/series/';

  constructor(private http: HttpClient) {}

  listarSeries(): Observable<series[]> {
    return this.http.get<series[]>(this.apiUrl + 'listar-series');
  }

  obtenerSerie(id: number): Observable<series> {
    return this.http.get<series>(this.apiUrl + 'listar/' + id);
  }

  crearSerie(serie: series): Observable<series> {
    return this.http.post<series>(this.apiUrl + 'crear-serie', serie);
  }

  actualizarSerie(serie: series, id: number): Observable<series> {
    return this.http.put<series>(this.apiUrl + 'actualizar-serie/' + id, serie);
  }

  eliminarSerie(id: number): Observable<series> {
    return this.http.delete<series>(this.apiUrl + 'eliminar-serie/' + id);
  }
}
