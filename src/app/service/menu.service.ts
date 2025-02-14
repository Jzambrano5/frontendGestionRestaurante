import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    // URL base de la API
    private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Crear un nuevo ítem en el menú
  createMenuItem(nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number): Observable<any> {
    const menuItemData = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen,
      categoriaId: categoriaId
    }
    const header = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/create`, menuItemData , { headers: header });
  }

  // Obtener todos los ítems del menú
  getMenuItems(): Observable<any> {
    const header = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/getMenuItems` , { headers: header });
  }

  // Obtener ítems del menú por categoría
  getMenuItemsByCategory(categoriaId: number): Observable<any> {
    const header = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/getMenuItemsByCategory/${categoriaId}` , { headers: header });
  }

  // Actualizar un ítem del menú
  updateMenuItem(id: number, nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number): Observable<any> {
    const menuItemData = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen,
      categoriaId: categoriaId
    }
    const header = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/update/${id}`, menuItemData , { headers: header });
  }

  // Eliminar un ítem del menú
  deleteMenuItem(id: number): Observable<any> {
    const header = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/delete/${id}` , { headers: header });
  }

}
