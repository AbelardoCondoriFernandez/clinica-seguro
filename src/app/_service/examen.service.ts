//se utilizara en otras clases para hacer inyecciones

import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from '../_shader/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Examen } from '../_model/examen';
//import { ConsultaListaExamen } from '../_model/consultaListaExamen';
@Injectable()
export class ExamenService {

  private url: string = HOST;
  examenCambio = new Subject<Examen[]>();
  mensaje = new Subject<string>();
  //pacientes:Paciente[]=[];
  constructor(private http: HttpClient) {
    /*let p=new Paciente();
    p.idPaciente=1;
    p.nombres="Yuri";
    p.apellidos="Pomachagua";
    this.pacientes.push(p);

    p=new Paciente();
    p.idPaciente=2;
    p.nombres="Milagros";
    p.apellidos="Collantes";
    this.pacientes.push(p);//agrega a la lista*/
  }
  
  getlistarEx(){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Examen[]>(`${this.url}/examen/listar`,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    });
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }

  getlistarExamen(p: number, s: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Examen[]>(`${this.url}/examen/listarPageable?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer${access_token}`).set('Content-Type', 'application/json')
    });
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getExamenPorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Examen>(`${this.url}/examen/listar/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer${access_token}`).set('Content-Type', 'application/json')
    });
  }
  registrar(examen: Examen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/examen/registrar`, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer${access_token}`).set('Content-Type', 'application/json')
    });
  }
  modificar(examen: Examen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/examen/actualizar`, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer${access_token}`).set('Content-Type', 'application/json')
    });
  }
  eliminar(examen: Examen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/examen/eliminar/${examen.idExamen}`, {
      headers: new HttpHeaders().set('Authorization', `bearer${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
