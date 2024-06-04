// app-landing-page.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',

  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router) { }

  navigateToMovies(): void {
    this.router.navigate(['/peliculas']);
  }

  navigateToSeries(): void {
    this.router.navigate(['/series']);
  }
}
