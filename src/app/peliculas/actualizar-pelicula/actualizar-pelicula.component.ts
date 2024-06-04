import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';

@Component({
  selector: 'editar-peliculas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './actualizar-pelicula.component.html',
  styleUrls: ['./actualizar-pelicula.component.css']
})
export class ActualizarPeliculas implements OnInit {
  peliculaForm!: FormGroup;
  peliculas: peliculas = {
    id: 1,
    url: '',
    titulo: '',
    sinopsis: '',
    genero: '',
    director: '',
    actores: '',
    fecha_estreno: new Date(),
    duracion: 1
  };

  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private conexionBackend: conexionbackend,
    private router: Router // Agregar el Router
  ) {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.conexionBackend.obtenerPelicula(this.id).subscribe((pe) => {
      this.peliculas = pe;
      console.log(this.peliculas);
      this.initForm();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.peliculaForm = this.formBuilder.group({
      url: [this.peliculas.url || '', [Validators.required, Validators.maxLength(500)]],
      titulo: [this.peliculas.titulo || '', [Validators.required, Validators.maxLength(100)]],
      sinopsis: [this.peliculas.sinopsis || '', [Validators.required, Validators.maxLength(100)]],
      genero: [this.peliculas.genero || '', [Validators.required, Validators.maxLength(100)]],
      director: [this.peliculas.director || '', [Validators.required, Validators.maxLength(100)]],
      actores: [this.peliculas.actores || '', [Validators.required, Validators.maxLength(100)]],
      fecha_estreno: [this.peliculas.fecha_estreno || '', [Validators.required]],
      duracion: [this.peliculas.duracion || '', [Validators.required]]
    });
  }

  actualizarPeliculas(): void {
    this.conexionBackend.actualizarPelicula(this.peliculaForm.value, this.id).subscribe(() => {
      // Redireccionar a la lista de películas después de actualizar
      this.router.navigate(['/peliculas']);
    });
  }
}