import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conexionbackend } from '../api-peliculas.service';


@Component({
  selector: 'eliminar-pelicula',
  templateUrl: './eliminar-pelicula.component.html',
  styleUrls: ['./eliminar-pelicula.component.css']
})
export class EliminarPelicula implements OnInit {
  id: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private conexionbackend: conexionbackend
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.eliminarPelicula();
  }

  regresar(): void {
    this.router.navigate(['/peliculas']);
  }


  eliminarPelicula(): void {
    this.conexionbackend.eliminarPelicula(parseInt(this.id)).subscribe(
      () => {

      },
      error => {
      }
    );
  };
};