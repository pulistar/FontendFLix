import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { conexionbackend } from '../api-peliculas.service';
import { peliculas } from '../peliculas';
import { PeliculasModule } from '../peliculas.module';
import { ListarPeliculas } from './listar-peliculas.component';

describe('ListarPeliculas', () => {
  let component: ListarPeliculas;
  let fixture: ComponentFixture<ListarPeliculas>;
  let mockConexionBackend: jasmine.SpyObj<conexionbackend>;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('conexionbackend', ['listarPeliculas']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PeliculasModule], 
      providers: [{ provide: conexionbackend, useValue: mockConexionBackend }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPeliculas);
    component = fixture.componentInstance;
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('obtiene películas al inicializarse', () => {
    const mockPeliculas: peliculas[] = [
      { id: 1, url:'', titulo: 'sii', sinopsis: 'my buena', genero: 'accion', director: 'tu', actores: 'uno', fecha_estreno: new Date('2024-01-01'), duracion: 120  },
      { id: 2, url:'', titulo: 'no', sinopsis: 'muy mala', genero: 'ficcion', director: 'yo', actores: 'dos', fecha_estreno: new Date('2024-01-01'), duracion: 130  },
    ];

    mockConexionBackend.listarPeliculas.and.returnValue(of(mockPeliculas));

    fixture.detectChanges();

    expect(component.peliculas).toEqual(mockPeliculas);
  });

});
