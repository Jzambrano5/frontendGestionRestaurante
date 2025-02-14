import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonIcon,
  IonInput,
  IonItem,
  
} from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonContent,
    CommonModule,
    FormsModule,
    IonIcon
  ],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService:UsuarioService,private router:Router,
    private loadingController:LoadingController, private alertController:AlertController, private alertCtrl: AlertController) { }

    ngOnInit() {}
    async login(email:any, password:any) {
     const loading = await this.loadingController.create({
       message: 'Iniciando sesión...',
       spinner: 'circles',
     });
     loading.present();
     this.usuarioService.login(email.value,password.value).subscribe({
       next: async (datos: any) => {
         localStorage.setItem('token',datos.token);
         localStorage.setItem('id',datos.dataUser.id);
         localStorage.setItem('idp',datos.dataUser.person_id);
         localStorage.setItem('username',datos.dataUser.user);
         loading.dismiss();
         this.router.navigateByUrl('principal');
       },
       error: async (e: any) => {
         loading.dismiss();
         const alert = await this.alertController.create({
           header: 'Error',
           message: e.error.message,
           buttons: ['OK'],
         });
         await alert.present();
       },
     });
   }

   async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

   async loginWithGoogle() {
    console.log('Iniciando sesión con Google...');
  
    try {
      // Llamar a la función definida en index.html
      const loginFunction = (window as any).loginWithGoogle;
      
      if (typeof loginFunction === 'function') {
        await loginFunction();
        console.log('Sesión iniciada con éxito');
        this.showAlert('Éxito', 'Inicio de sesión exitoso');
        this.router.navigateByUrl('principal');
      } else {
        console.error('La función loginWithGoogle no está definida en window.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.showAlert('Error', 'Inicio de sesión fallido');
    }
  }

}
