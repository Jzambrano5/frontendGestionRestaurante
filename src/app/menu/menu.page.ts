import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { MenuService } from '../service/menu.service';
import { CategoriaService } from '../service/categoria.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [HttpClientModule,IonicModule, IonLabel, IonItem, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  categorias: any[] = []; // Lista de categorías
  menuItems: any[] = []; // Lista de ítems del menú
  filtroCategoria: string = ''; // Filtro de categoría seleccionada
  searchQuery: string = ''; // Búsqueda por nombre
  menuItemsFiltrados: any[] = []; // Lista de ítems filtrados
  noItems: boolean = false; // Bandera para indicar si no hay ítems

  constructor(private menuService: MenuService,
    private categoriaService: CategoriaService,
    private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.obtenerCategorias();
    //this.obtenerMenuItems();
  }

  // Obtener todas las categorías
  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (response: any) => {
        this.categorias = response.category; // Asegúrate de que 'category' sea la clave correcta
      },
      error: (error: any) => {
        console.error('Error al obtener categorías', error.message);
      }
    });
  }

  obtenerMenuItems() {
    this.menuService.getMenuItems().subscribe({
      next: (data: any) => {
        this.menuItems = data;
        console.log("Datos del menú obtenidos:", this.menuItems);
        debugger;
      },
      error: (error: any) => {
        console.error("Error al obtener los ítems del menú:", error.message);
        debugger;
      }
    });
  }
  

  // Filtrar ítems por categoría
  filtrarItems() {
    if (this.filtroCategoria.trim()) {
      const categoriaSeleccionada = this.categorias.find(cat =>
        cat.nombre.toLowerCase() === this.filtroCategoria.toLowerCase()
      );

      if (categoriaSeleccionada) {
        this.menuItemsFiltrados = this.menuItems.filter(item =>
          item.categoriaId === categoriaSeleccionada.id
        );
        this.noItems = this.menuItemsFiltrados.length === 0;
      } else {
        this.menuItemsFiltrados = [];
        this.noItems = true;
      }
    } else {
      this.menuItemsFiltrados = this.menuItems;
      this.noItems = false;
    }
  }

  // Eliminar un ítem del menú
 /* eliminarItem(id: number) {
    this.menuService.deleteMenuItem(id).subscribe({
      next: () => {
        this.mostrarAlerta('Éxito', 'Ítem eliminado con éxito');
        this.obtenerMenuItems(); // Recargar la lista
      },
      error: (error: any) => {
        console.error('Error al eliminar ítem', error.message);
        this.mostrarAlerta('Error', 'No se pudo eliminar el ítem');
      }
    });
  }*/

  // Editar un ítem del menú
  /*async editarItem(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Ítem',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: item.nombre },
        { name: 'descripcion', type: 'text', placeholder: 'Descripción', value: item.descripcion },
        { name: 'precio', type: 'number', placeholder: 'Precio', value: item.precio },
        { name: 'imagen', type: 'text', placeholder: 'URL de la imagen', value: item.imagen },
        { name: 'categoriaId', type: 'number', placeholder: 'ID Categoría', value: item.categoriaId }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: ( data: any) => {
            this.menuService.updateMenuItem(item.id, data.nombre, data.descripcion, data.precio, data.imagen, data.categoriaId).subscribe({
              next: () => {
                this.mostrarAlerta('Éxito', 'Ítem actualizado con éxito');
                this.obtenerMenuItems(); // Recargar la lista
              },
              error: (error: any) => {
                console.error('Error al actualizar ítem', error.message);
                this.mostrarAlerta('Error', 'No se pudo actualizar el ítem');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }*/

  // Crear un nuevo ítem en el menú
  /*async crearItem() {
    const alert = await this.alertCtrl.create({
      header: 'Crear Ítem',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'descripcion', type: 'text', placeholder: 'Descripción' },
        { name: 'precio', type: 'number', placeholder: 'Precio' },
        { name: 'imagen', type: 'text', placeholder: 'URL de la imagen' },
        { name: 'categoriaId', type: 'number', placeholder: 'ID Categoría' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.menuService.createMenuItem(data.nombre, data.descripcion, data.precio, data.imagen, data.categoriaId).subscribe({
              next: () => {
                this.mostrarAlerta('Éxito', 'Ítem creado con éxito');
                this.obtenerMenuItems(); // Recargar la lista
              },
              error: (error: any) => {
                console.error('Error al crear ítem', error.message);
                this.mostrarAlerta('Error', 'No se pudo crear el ítem');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }*/

  // Mostrar una alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
