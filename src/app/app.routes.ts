import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ActualizarPeliculas } from './peliculas/actualizar-pelicula/actualizar-pelicula.component';
import { CrearPelicula } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EliminarPelicula } from './peliculas/eliminar-pelicula/eliminar-pelicula.component';
import { ListarPeliculas } from './peliculas/listar-peliculas/listar-peliculas.component';
import { ActualizarSerie } from './series/actualizar-serie/actualizar-serie.component';
import { CrearSerie } from './series/crear-serie/crear-serie.component';
import { EliminarSerie } from './series/eliminar-serie/eliminar-serie.component';
import { ListarSeries } from './series/listar-series/listar-series.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'peliculas', component: ListarPeliculas },
  { path: 'crear/pelicula', component: CrearPelicula },
  { path: 'series', component: ListarSeries},
  { path: 'actualizar/serie/:id', component: ActualizarSerie},
  { path: 'inicio', component: InicioComponent}, 
  { path: 'crear/serie', component: CrearSerie},
  { path: 'actualizar/pelicula/:id', component: ActualizarPeliculas }, 
  { path: 'eliminar/pelicula/:id', component: EliminarPelicula},
  { path: 'eliminar/serie/:id', component: EliminarSerie},

];
