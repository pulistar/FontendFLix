import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { peliculas } from './peliculas';



@Injectable({
  providedIn: 'root'
})
export class conexionbackend {

  
  private apiUrl = 'http://localhost:8000/api/peliculas/';



  constructor(private http:HttpClient) { }


  listarPeliculas(): Observable<peliculas[]> {
    return this.http.get<peliculas[]>(this.apiUrl + 'listar-peliculas');
  }

  obtenerPelicula(id: number): Observable<peliculas> {
    return this.http.get<peliculas>(this.apiUrl + 'listar/' + id);
  }


  crearPelicula(pelicula: peliculas): Observable<peliculas> {
    return this.http.post<peliculas>(this.apiUrl + 'crear-pelicula', pelicula);
  }


  actualizarPelicula(peliculas: peliculas ,id: Number): Observable<peliculas> {
    return this.http.put<peliculas>(this.apiUrl + 'actualizar-pelicula/' + id, peliculas);
  }
  


  eliminarPelicula(id: number): Observable<peliculas> {
    return this.http.delete<peliculas>(this.apiUrl + 'eliminar-pelicula/' + id);
  }
   
}



 

 

