import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';

@Component({
  selector: 'Nueva-Peliculas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})

export class CrearPelicula implements OnInit{
 peliculasForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private peliculas: conexionbackend){}

    ngOnInit(): void {

        this.peliculasForm=this.formBuilder.group({
          url:['',[Validators.required, Validators.maxLength(500)]],
          titulo:['',[Validators.required, Validators.maxLength(100)]],
          sinopsis:['',[Validators.required, Validators.maxLength(100)]],
          genero:['',[Validators.required, Validators.maxLength(100)]],
          director:['',[Validators.required, Validators.maxLength(100)]],
          actores:['',[Validators.required, Validators.maxLength(100)]],
          fecha_estreno:['',[Validators.required, Validators.maxLength(100)]],
          duracion:['',[Validators.required, Validators.maxLength(100)]],
        });
    }
    crearPelicula(peliculas:peliculas):void{
      this.peliculas.crearPelicula(peliculas).subscribe(
        (peliculaCreada)=>{
          this.peliculasForm.reset();
        },
      );
    }

  

}
