//se utilizara en otras clases para hacer inyecciones

import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { Paciente } from '../_model/paciente';
import { HOST, TOKEN_NAME } from '../_shader/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class PacienteService {


  url: string=`${HOST}/paciente`;
  pacienteCambio=new Subject<Paciente[]>();
  mensaje=new Subject<string>();
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
  getlistarPac(){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Paciente[]>(`${this.url}/listar`,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    });
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getlistarPaciente(p:number,s:number){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Paciente[]>(`${this.url}/listarPageable?page=${p}&size=${s}`,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    });
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getPacientePorId(id:number){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente>(`${this.url}/listar/${id}`,{
    headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')});
  }
  registrar(paciente: Paciente){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`,paciente,{
    headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')});
  }
  modificar(paciente: Paciente){ 
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`,paciente,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    });
    }
  eliminar(paciente: Paciente){
    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/eliminar/${paciente.idPaciente}`,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    });
  }
}
