import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, home, radio, person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonAvatar,
    IonHeader,
    IonIcon,
    IonLabel,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
    IonButton,
    RouterLink
  ],
})
export class PrincipalPage implements OnInit {

  constructor() { 
    addIcons({ library, home, radio, person });
  }
  

  ngOnInit() {
  }

}
