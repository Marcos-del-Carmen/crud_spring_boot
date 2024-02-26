import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AgregarPersonaComponent } from '../agregar-persona/agregar-persona.component';
import { ConfirmarEliminadoComponent } from '../confirmar-eliminado/confirmar-eliminado.component';
import { EditarPersonaComponent } from '../editar-persona/editar-persona.component';

@Component({
  selector: 'app-lista-personas',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css']
})
export class ListaPersonasComponent implements OnInit {
  displayedColumn: string[] = ['Nombre', 'Primer Apellido', 'Segundo Apellido', 'Edad', 'CURP', 'Acciones'];
  listaPersonas: any[] = [];

  constructor(
    private servicePersonas: PersonasService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.servicePersonas.obtenerPersonas().subscribe({
      next: (value) => {
        this.listaPersonas = value; // Rellenamos el arreglo con los datos que tenemos en nuestra base de datos
      }, error: (err) => {
        console.error('Error', err);
      }
    });
  } // mostramos las personas en la tabla 

  openGuardarDialog() {
    const dialogRef = this.matDialog.open(AgregarPersonaComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.obtenerPersonas();
    });
  } // agregamos el componente para agregar una nueva persona

  openEditarDialog(persona: any) {
    const dialogRef = this.matDialog.open(EditarPersonaComponent, {
      width: '50%',
      data: { personaEditada: { ...persona } } // Pasa una copia de los datos de la persona
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.obtenerPersonas();
    });
  } // agregamos el componente para editar una persona

  openEliminarDialog(id: number) {
    const dialogRef = this.matDialog.open(ConfirmarEliminadoComponent, {
      width: '50%',
      data: { personaEliminada: id } // el valor del id se lo pasamos al ts de componente confirmar-eliminado para que se lo pasemos al metodo del servidor que estamos haciendo
    });
    // console.log("El " + id + " Identificador de la persona a eliminar");
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPersonas();
    });
  } 
}
