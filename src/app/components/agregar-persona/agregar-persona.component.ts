import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonasService } from '../../services/personas.service';
// import { MatSiredenavModule } from '@angular/material/'

@Component({
  selector: 'app-agregar-persona',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, MatInputModule, MatDialogModule],
  templateUrl: './agregar-persona.component.html',
})
export class AgregarPersonaComponent implements OnInit {
  listaPersonas: any[] = [];
  nuevaPersona: any = {};
  constructor(private servicePersonas: PersonasService) {} 

  ngOnInit() { }

  agregar() {
    // Guarda los datos utilizando tu servicio
    console.log("Vamos a agregar una persona");
    this.servicePersonas.guardarPersona(this.nuevaPersona).subscribe({
      next: (value) => {
        this.listaPersonas = value;
        console.log("La persona se puede agregar de manera correcta"); 
      },
      error: (error) => {
        // Maneja errores de guardado aquí
        console.error('Error al guardar persona:', error);
      }
    });
  }
  

}
