
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { series } from '../series';
import { ConexionBackend } from '../series.service';

@Component({
  selector: 'ver-series',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listar-series.component.html',
  styleUrls: ['./listar-series.component.css']
})
export class ListarSeries implements OnInit {
  series: Array<series> = [];

  constructor(private router: Router, private conexionBackend: ConexionBackend) {}

  ngOnInit(): void {
    this.obtenerSeries();
  }

  obtenerSeries(): void {
    this.conexionBackend.listarSeries().subscribe((vs: series[]) => {
      this.series = vs;
      console.log(this.series);
    });
  }

  toggleInfo(id: number): void {
    const infoElement = document.getElementById('info-' + id);
    if (infoElement) {
      infoElement.style.display = infoElement.style.display === 'none' ? 'block' : 'none';
    }
  }

  actualizar(id: number): void {
    this.router.navigate([`/actualizar/serie/${id}`]);
  }

  eliminar(id: number): void {
    this.router.navigate([`/eliminar/serie/${id}`]);
  }
  navigateSerie(): void {
    this.router.navigate(['/crear/serie']);

  }

}
