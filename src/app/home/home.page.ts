import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent],
})
export class HomePage implements OnInit {

  logoVisible: boolean = true;
  constructor(private router: Router ) {}

  ngOnInit() {
    // Simula una carga inicial y oculta el logo después de 3 segundos
    setTimeout(() => {
      this.logoVisible = false;
      this.router.navigate(['/welcome']); 
    }, 3000); // Tiempo en milisegundos
  }
}
