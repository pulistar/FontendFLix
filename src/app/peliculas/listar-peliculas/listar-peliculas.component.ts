import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';


@Component({
  selector: 'ver-peliculas',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, FormsModule],
  templateUrl: './listar-peliculas.component.html',
  styleUrl: './listar-peliculas.component.css'
})

export class ListarPeliculas implements OnInit{
  peliculas:Array<peliculas>=[];

  constructor(private router: Router, private conexionbackend: conexionbackend, ) {

  }
  toggleInfo(id: number): void {
    const infoElement = document.getElementById('info-' + id);
    if (infoElement) {
        infoElement.style.display = infoElement.style.display === 'none' ? 'block' : 'none';
    }
}
  ngOnInit() {
      this.obtenerPeliculas();
  }
  obtenerPeliculas(){

    this.conexionbackend.listarPeliculas().subscribe(vs=>{
      this.peliculas=vs;
      console.log(this.peliculas)
    });
  }
  actualizar(id: number) {
    this.router.navigate([`/actualizar/pelicula/${id}`]);
  }

  eliminar(id:number){
    this.router.navigate([`/eliminar/pelicula/${id}`]);
  }
  navigatePelicula(): void {
    this.router.navigate(['/crear/pelicula']);
  }
  


}
