import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';
import { ActualizarPeliculas } from './actualizar-pelicula.component';

describe('ActualizarPeliculas', () => {
  let componente: ActualizarPeliculas;
  let fixture: ComponentFixture<ActualizarPeliculas>;
  let mockConexionBackend: jasmine.SpyObj<conexionbackend>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('conexionbackend', ['obtenerPelicula', 'actualizarPelicula']);
    const peliculaMock: peliculas = {
      id: 1,
      url: 'https://example.com/imagen.jpg',
      titulo: 'la vida',
      sinopsis: 'genial la pelicula super recomendada',
      genero: 'amor',
      director: 'goku',
      actores: 'uno, dos, tres',
      fecha_estreno: new Date(),
      duracion: 120
    };
    mockConexionBackend.obtenerPelicula.and.returnValue(of(peliculaMock));
    mockConexionBackend.actualizarPelicula.and.returnValue(of(peliculaMock));

    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '1'
        }
      }
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, FormsModule, ActualizarPeliculas],
      providers: [
        FormBuilder,
        { provide: conexionbackend, useValue: mockConexionBackend },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPeliculas);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('inicializa el formulario', () => {
    expect(componente.peliculaForm.controls['url']).toBeDefined();
    expect(componente.peliculaForm.controls['titulo']).toBeDefined();
    expect(componente.peliculaForm.controls['sinopsis']).toBeDefined();
    expect(componente.peliculaForm.controls['genero']).toBeDefined();
    expect(componente.peliculaForm.controls['director']).toBeDefined();
    expect(componente.peliculaForm.controls['actores']).toBeDefined();
    expect(componente.peliculaForm.controls['fecha_estreno']).toBeDefined();
    expect(componente.peliculaForm.controls['duracion']).toBeDefined();
  });

  it('cargar los datos de la película en el formulario', () => {
    expect(componente.peliculaForm.value.url).toBe('https://example.com/imagen.jpg');
    expect(componente.peliculaForm.value.titulo).toBe('la vida');
    expect(componente.peliculaForm.value.sinopsis).toBe('genial la pelicula super recomendada');
    expect(componente.peliculaForm.value.genero).toBe('amor');
    expect(componente.peliculaForm.value.director).toBe('goku');
    expect(componente.peliculaForm.value.actores).toBe('uno, dos, tres');
    expect(componente.peliculaForm.value.duracion).toBe(120);
  });

  it('llama a actualizarPelicula cuando se envía el formulario', () => {
    componente.actualizarPeliculas();

    expect(mockConexionBackend.actualizarPelicula).toHaveBeenCalledWith(componente.peliculaForm.value, componente.id);
  });

  it('redirecciona a la lista de películas después de actualizar', () => {
    componente.actualizarPeliculas();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/peliculas']);
  });
});