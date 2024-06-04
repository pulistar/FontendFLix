import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';
import { CrearPelicula } from './crear-pelicula.component';

describe('CrearPelicula', () => {
  let componente: CrearPelicula;
  let fixture: ComponentFixture<CrearPelicula>;
  let mockConexionBackend: jasmine.SpyObj<conexionbackend>;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('conexionbackend', ['crearPelicula']);
    mockConexionBackend.crearPelicula.and.returnValue(of({} as peliculas));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, CrearPelicula], 
      providers: [
        FormBuilder,
        { provide: conexionbackend, useValue: mockConexionBackend }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPelicula);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('inicializa el formulario', () => {

    expect(componente.peliculasForm.controls['url']).toBeDefined();
    expect(componente.peliculasForm.controls['titulo']).toBeDefined();
    expect(componente.peliculasForm.controls['sinopsis']).toBeDefined();
    expect(componente.peliculasForm.controls['genero']).toBeDefined();
    expect(componente.peliculasForm.controls['director']).toBeDefined();
    expect(componente.peliculasForm.controls['actores']).toBeDefined();
    expect(componente.peliculasForm.controls['fecha_estreno']).toBeDefined();
    expect(componente.peliculasForm.controls['duracion']).toBeDefined();
  });

  it('llama a crearPelicula cuando el formulario es válido y se envía', () => {
    const pelicula: peliculas = {
      id: 1,
      url:'http://',
      titulo: 'rambo',
      sinopsis: 'muy buena',
      genero: 'accion',
      director: 'rambo',
      actores: 'muchos',
      fecha_estreno: new Date(),
      duracion: 120
    };

    componente.peliculasForm.setValue({
      url: pelicula.url,
      titulo: pelicula.titulo,
      sinopsis: pelicula.sinopsis,
      genero: pelicula.genero,
      director: pelicula.director,
      actores: pelicula.actores,
      fecha_estreno: pelicula.fecha_estreno,
      duracion: pelicula.duracion
    });

    componente.crearPelicula(pelicula);

    expect(mockConexionBackend.crearPelicula).toHaveBeenCalledWith(pelicula);
  });

  it('resetea el formulario después de crear una película', () => {
    const pelicula: peliculas = {
      id: 1,
      url:'http://',
      titulo: 'rambo',
      sinopsis: 'muy buena',
      genero: 'accion',
      director: 'rambo',
      actores: 'muhos',
      fecha_estreno: new Date(),
      duracion: 120
    };

    componente.peliculasForm.setValue({
      url: pelicula.url,
      titulo: pelicula.titulo,
      sinopsis: pelicula.sinopsis,
      genero: pelicula.genero,
      director: pelicula.director,
      actores: pelicula.actores,
      fecha_estreno: pelicula.fecha_estreno,
      duracion: pelicula.duracion
    });

    componente.crearPelicula(pelicula);

    expect(componente.peliculasForm.valid).toBe(false);
  });
});
