import { Component , OnInit, Input, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonasService } from '../../services/personas.service';


@Component({
  selector: 'app-editar-persona',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, MatInputModule, MatDialogModule],
  templateUrl: './editar-persona.component.html'
})
export class EditarPersonaComponent implements OnInit {
  personaEditada: any;

  constructor(
    public dialogRef: MatDialogRef<EditarPersonaComponent>, 
    private personasService: PersonasService,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
    this.personaEditada = { ...data.personaEditada }; // Copia los datos de la persona
  }

  ngOnInit() { }

  guardarCambios() {
    // console.log(this.personaEditada.id);
    this.personasService.editar(this.personaEditada.id, this.personaEditada).subscribe({
      next: (value) => {
        console.log('Persona actualizada:', value);
        // this.dialogRef.close(); // Cierra el diálogo después de guardar los cambios
      },
      error: (error) => {
        console.error('Error al actualizar persona:', error);
        // Aquí puedes manejar el error según tus necesidades
      }
    });
  }
}
