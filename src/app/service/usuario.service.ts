import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  login(correo: string, password: string) {
    let datos = {
      email: correo,
      password: password,
    };
    return this.http.post('http://127.0.0.1:3000/api/login', datos);
  }

  getOneUser(id:number){
    
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get('http://localhost:3000/api/user/'+id, { headers: header });
  }
}
