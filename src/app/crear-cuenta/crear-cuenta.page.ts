import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInputPasswordToggle,
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
import { RegistroService } from '../service/registro.service';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
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
export class CrearCuentaPage implements OnInit {

  constructor(private registroService:RegistroService,private router:Router,
    private loadingController:LoadingController, private alertController:AlertController) { }

  ngOnInit() {
  }
  async registrar(user:any,email:any,password:any,typeusers_id:any){

    const loading = await this.loadingController.create({
       message:'Registrando Usuario...',
       spinner:'circles',
     });
 
     loading.present(); 
 
   this.registroService.registrar(user.value,email.value,password.value,typeusers_id.value).subscribe({
     next:async(datosregistrar:any)=>{
       loading.dismiss();
       this.router.navigateByUrl('welcome');
     },
     error:async(e:any)=>{
         
       loading.dismiss();
       const alert = await this.alertController.create({
         header:'Error',
         message: e.error.message,
         buttons:['OK'],
       });
       await alert.present();
     },
   })
   }
 
  
}
