import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { series } from '../series';
import { ConexionBackend } from '../series.service';

@Component({
  selector: 'editar-serie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './actualizar-serie.component.html',
  styleUrls: ['./actualizar-serie.component.css']
})
export class ActualizarSerie implements OnInit {
  serieForm!: FormGroup;
  series: series = {
    id: 1,
    url: '',
    titulo: '',
    sinopsis: '',
    genero: '',
    director: '',
    actores: '',
    fecha_estreno: new Date(),
    temporada: 1,
    duracion: 1
  };

  id: number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ConexionBackend: ConexionBackend
  ) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.ConexionBackend.obtenerSerie(this.id).subscribe((pe) => {
      this.series = pe;
      console.log(this.series);
      this.initForm();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.serieForm = this.formBuilder.group({

      url: [this.series.url || '', [Validators.required, Validators.maxLength(500)]],
      titulo: [this.series.titulo || '', [Validators.required, Validators.maxLength(100)]],
      sinopsis: [this.series.sinopsis || '', [Validators.required, Validators.maxLength(100)]],
      genero: [this.series.genero || '', [Validators.required, Validators.maxLength(100)]],
      director: [this.series.director || '', [Validators.required, Validators.maxLength(100)]],
      actores: [this.series.actores || '', [Validators.required, Validators.maxLength(100)]],
      fecha_estreno: [this.series.fecha_estreno || '', [Validators.required]],
      temporada: [this.series.temporada || '', [Validators.required]],
      duracion: [this.series.duracion || '', [Validators.required]]
    });
  }

  actualizarSerie(): void {
    this.ConexionBackend.actualizarSerie(this.serieForm.value, this.id).subscribe(() => {
      this.router.navigate(['/series']);
    });
  }
}
