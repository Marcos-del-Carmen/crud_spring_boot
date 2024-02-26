import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) {  }

  obtenerPersonas(): Observable<any> {
    return this.http.get('http://localhost:8080/api/persona/obtener');
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/persona/eliminar/${id}`);
  }

  guardarPersona(persona: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/persona/agregar`, persona);
  }

  // con este eliminamos una persona de manera logica
  eliminarLogicoUnaPersona(id: number): Observable<any> {
    return this.http.put(`http://localhost:8080/api/persona/eliminar/${id}`, {});
  }

  editar(id: number, personaEditada: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/persona/actualizar/${id}`, personaEditada);
  }
}
