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
  ],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService:UsuarioService,private router:Router,
    private loadingController:LoadingController, private alertController:AlertController) { }

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

}
