import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { series } from '../series';
import { SeriesModule } from '../series.module';
import { ConexionBackend } from '../series.service';
import { ListarSeries } from './listar-series.component';


describe('ListarSeries', () => {
  let component: ListarSeries;
  let fixture: ComponentFixture<ListarSeries>;
  let mockConexionBackend: jasmine.SpyObj<ConexionBackend>;

  beforeEach(async () => {
    mockConexionBackend = jasmine.createSpyObj('ConexionBackend', ['listarSeries']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SeriesModule],
      providers: [{ provide: ConexionBackend, useValue: mockConexionBackend }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSeries);
    component = fixture.componentInstance;
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('obtiene  series al inicializarse', () => {
    const mockSeries: series[] = [
      { id: 1, url:'url', titulo: 'tu', sinopsis: 'mala', genero: 'terror', director: 'pepito', actores: 'uno, dos, tres', fecha_estreno: new Date('2024-01-01'), temporada:1, duracion: 120  },
      { id: 2, url:'url', titulo: 'yo', sinopsis: 'buena', genero: 'accion', director: 'tu', actores: 'uno', fecha_estreno: new Date('2024-01-01'), temporada:2, duracion: 130  },
    ];

    mockConexionBackend.listarSeries.and.returnValue(of(mockSeries));

    fixture.detectChanges();

    expect(component.series).toEqual(mockSeries);
  });

});
