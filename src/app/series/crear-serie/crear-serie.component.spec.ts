import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { series } from '../series';
import { ConexionBackend } from '../series.service';
import { CrearSerie } from './crear-serie.component';


describe('CrearSerie', () => {
  let componente: CrearSerie;
  let fixture: ComponentFixture<CrearSerie>;
  let mockConexionBackend: jasmine.SpyObj<ConexionBackend>;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('ConexionBackend', ['crearSerie']);
    mockConexionBackend.crearSerie.and.returnValue(of({} as series));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, CrearSerie], 
      providers: [
        FormBuilder,
        { provide: ConexionBackend, useValue: mockConexionBackend }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSerie);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('inicializa el formulario', () => {
    expect(componente.seriesForm.controls['url']).toBeDefined();
    expect(componente.seriesForm.controls['titulo']).toBeDefined();
    expect(componente.seriesForm.controls['sinopsis']).toBeDefined();
    expect(componente.seriesForm.controls['genero']).toBeDefined();
    expect(componente.seriesForm.controls['director']).toBeDefined();
    expect(componente.seriesForm.controls['actores']).toBeDefined();
    expect(componente.seriesForm.controls['fecha_estreno']).toBeDefined();
    expect(componente.seriesForm.controls['temporada']).toBeDefined();
    expect(componente.seriesForm.controls['duracion']).toBeDefined();
  });

  it('llama a crearSerie cuando el formulario es válido y se envía', () => {
    const serie: series = {
      id: 1,
      url: 'https://www.google.com',
      titulo: 'flix',
      sinopsis: 'es genial',
      genero: 'accion',
      director: 'tu',
      actores: 'rambo',
      fecha_estreno: new Date(),
      temporada: 1,
      duracion: 120
    };

    componente.seriesForm.setValue({
      url : serie.url,
      titulo: serie.titulo,
      sinopsis: serie.sinopsis,
      genero: serie.genero,
      director: serie.director,
      actores: serie.actores,
      fecha_estreno: serie.fecha_estreno,
      temporada: serie.temporada,
      duracion: serie.duracion
    });

    componente.crearSerie(serie);

    expect(mockConexionBackend.crearSerie).toHaveBeenCalledWith(serie);
  });

  it('resetea el formulario después de crear una serie', () => {
    const serie:series = {
      id: 1,
      url: 'https://www.google.com',
      titulo: 'flix',
      sinopsis: 'es genial',
      genero: 'accion',
      director: 'tu',
      actores: 'rambo',
      fecha_estreno: new Date(),
      temporada: 1,
      duracion: 120
    };

    componente.seriesForm.setValue({
      url : serie.url,
      titulo: serie.titulo,
      sinopsis: serie.sinopsis,
      genero: serie.genero,
      director: serie.director,
      actores: serie.actores,
      fecha_estreno: serie.fecha_estreno,
      temporada: serie.temporada,
      duracion: serie.duracion
    });

    componente.crearSerie(serie);

    expect(componente.seriesForm.valid).toBe(false);
  });
});