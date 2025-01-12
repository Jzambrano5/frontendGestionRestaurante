import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonList, IonItem, IonLabel, IonInput, IonButton, IonFooter } from '@ionic/angular/standalone';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe, arrowBack, pencil }from 'ionicons/icons';
  import { cog, search, person ,mail,create,trash,add, home,close, menu,exit, heartOutline, homeOutline, personOutline, cartOutline } from 'ionicons/icons';
  import { addIcons } from 'ionicons';
import { PersonService } from '../service/person.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [ IonButton, IonInput, IonLabel, IonItem, IonList, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {
  profile:any;
  personid:any;
  editDatos:boolean=true;
  
  constructor(private usuarioService:UsuarioService, private personService:PersonService) {
    this.personid = localStorage.getItem('id');
    addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit,menu, pencil});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

   }

  ngOnInit() {
    this. viewProfile();
  }

  editperfil(){
    this.editDatos=false;
  }

  
  viewProfile(){
    this.usuarioService.getOneUser(this.personid).subscribe({
      next:(data:any)=>{
        this.profile=data;
        debugger
      },
      error:(error:any)=>{
        debugger
      }
    })

  }

  updatePerson(){
    const idp =localStorage.getItem('idp');
    const personData = this.profile.user.person;

    this.personService.updatePerson(idp, personData.name, personData.lastname, personData.ci, personData.address, personData.phone).subscribe({
      next:(data:any)=>{
        debugger
        this.viewProfile();
        this.editDatos= true;
      },
      error(err) {
        debugger
      },
    })
  }

  goBack() {
    // Navegar a la página anterior
    history.back();
  }
  

}
