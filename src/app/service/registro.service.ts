import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private httpr:HttpClient) { }
  registrar(user:string,email:string,password:string,typeusers_id:string){
    const datosregistro={
      "user":user,
      "email":email,
      "password":password,
      "typeusers_id":typeusers_id
    }
    return this.httpr.post('http://127.0.0.1:3000/api/register', datosregistro);
  }
}
