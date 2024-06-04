import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionBackend } from '../series.service';



@Component({
  selector: 'eliminar-serie',
  templateUrl: './eliminar-serie.component.html',
  styleUrls: ['./eliminar-serie.component.css']
})
export class EliminarSerie implements OnInit {
  id: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ConexionBackend: ConexionBackend
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.eliminarSerie();
  }

  regresar(): void {
    this.router.navigate(['/series']);
  }


  eliminarSerie(): void {
    this.ConexionBackend.eliminarSerie(parseInt(this.id)).subscribe(
      () => {

      },
      error => {
      }
    );
  };
};