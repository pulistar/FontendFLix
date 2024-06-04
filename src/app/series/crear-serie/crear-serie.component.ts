import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { series } from '../series';
import { ConexionBackend } from '../series.service';


@Component({
  selector: 'Nueva-serie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-serie.component.html',
  styleUrl: './crear-serie.component.css'
})

export class CrearSerie implements OnInit{
 seriesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private series:ConexionBackend){}

    ngOnInit(): void {
        this.seriesForm=this.formBuilder.group({
          url:['',[Validators.required, Validators.maxLength(500)]],
          titulo:['',[Validators.required, Validators.maxLength(100)]],
          sinopsis:['',[Validators.required, Validators.maxLength(100)]],
          genero:['',[Validators.required, Validators.maxLength(100)]],
          director:['',[Validators.required, Validators.maxLength(100)]],
          actores:['',[Validators.required, Validators.maxLength(100)]],
          fecha_estreno:['',[Validators.required, Validators.maxLength(100)]],
          temporada:['',[Validators.required, Validators.maxLength(100)]],
          duracion:['',[Validators.required, Validators.maxLength(100)]],
        });
    }
    crearSerie(series:series):void{
      this.series.crearSerie(series).subscribe(
        (peliculaCreada)=>{
          this.seriesForm.reset();
        },
      );
    }

  

}