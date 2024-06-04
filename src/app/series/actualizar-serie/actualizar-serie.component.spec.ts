import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { series } from '../series';
import { ConexionBackend } from '../series.service';
import { ActualizarSerie } from './actualizar-serie.component';

describe('ActualizarSerie', () => {
  let componente: ActualizarSerie;
  let fixture: ComponentFixture<ActualizarSerie>;
  let mockConexionBackend: jasmine.SpyObj<ConexionBackend>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;
  let serieMock: series;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('ConexionBackend', ['obtenerSerie', 'actualizarSerie']);

    serieMock = {
      id: 1,
      url: 'http://localhost:',
      titulo: 'calamar',
      sinopsis: 'muy buena serie',
      genero: 'suspenso',
      director: 'unchino',
      actores: 'uno, dos, tres',
      fecha_estreno: new Date(),
      temporada: 1,
      duracion: 120
    };

    mockConexionBackend.obtenerSerie.and.returnValue(of(serieMock));
    mockConexionBackend.actualizarSerie.and.returnValue(of(serieMock));

    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '1'
        }
      }
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, FormsModule, ActualizarSerie],
      providers: [
        FormBuilder,
        { provide: ConexionBackend, useValue: mockConexionBackend },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarSerie);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('inicializa el formulario', () => {
    expect(componente.serieForm.controls['url']).toBeDefined();
    expect(componente.serieForm.controls['titulo']).toBeDefined();
    expect(componente.serieForm.controls['sinopsis']).toBeDefined();
    expect(componente.serieForm.controls['genero']).toBeDefined();
    expect(componente.serieForm.controls['director']).toBeDefined();
    expect(componente.serieForm.controls['actores']).toBeDefined();
    expect(componente.serieForm.controls['fecha_estreno']).toBeDefined();
    expect(componente.serieForm.controls['temporada']).toBeDefined();
    expect(componente.serieForm.controls['duracion']).toBeDefined();
  });

  it('cargar los datos de la serie en el formulario', () => {
    expect(componente.serieForm.value.url).toBe('http://localhost:'),
    expect(componente.serieForm.value.titulo).toBe('calamar');
    expect(componente.serieForm.value.sinopsis).toBe('muy buena serie');
    expect(componente.serieForm.value.genero).toBe('suspenso');
    expect(componente.serieForm.value.director).toBe('unchino');
    expect(componente.serieForm.value.actores).toBe('uno, dos, tres');
    expect(componente.serieForm.value.fecha_estreno).toEqual(serieMock.fecha_estreno);
    expect(componente.serieForm.value.temporada).toBe(1);
    expect(componente.serieForm.value.duracion).toBe(120);
  });

  it('llama a actualizarSerie  cuando se envía el formulario', () => {

    componente.actualizarSerie();

    expect(mockConexionBackend.actualizarSerie).toHaveBeenCalledWith(componente.serieForm.value, componente.id);
  });

  it('redireccionar a la lista de series después de actualizar', () => {
    componente.actualizarSerie();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/series']);
  });
});
