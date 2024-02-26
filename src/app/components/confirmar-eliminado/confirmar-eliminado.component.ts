import { Component,  EventEmitter, Output, Inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-confirmar-eliminado',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, MatInputModule, MatDialogModule],
  templateUrl: './confirmar-eliminado.component.html',
})
export class ConfirmarEliminadoComponent {
  id: any;
  
  constructor( 
    private dialogRef: MatDialogRef<ConfirmarEliminadoComponent>,
    private servicePersonas: PersonasService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.personaEliminada;
  }

  confirmar(): void {
    // console.log("El valor del id="+ this.id);
    this.servicePersonas.eliminar(this.id).subscribe({
      next: (value) => {
        console.log("Eliminar a la persona ", value);
        // this.dialogRef.close(true); // Cierra el diálogo después de eliminar la persona
      },
      error: (error) => {
        console.error('Error al eliminar la persona', error);
        // Manejar el error según tus necesidades
        this.dialogRef.close(false); // Cierra el diálogo si hay un error
      }
    });
  }

  /*
    guardarCambios() {
      // Llama al servicio para realizar la actualización
      this.personasService.editar(this.personaEditada.id, this.personaEditada).subscribe(
        (resultado) => {
          console.log('Persona actualizada:', resultado);
          this.dialogRef.close(); // Cierra el diálogo después de guardar los cambios
        },
        (error) => {
          console.error('Error al actualizar persona:', error);
          // Aquí puedes manejar el error según tus necesidades
        }
      );
    }
  */
}
