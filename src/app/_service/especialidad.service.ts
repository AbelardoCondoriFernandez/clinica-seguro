//se utilizara en otras clases para hacer inyecciones

import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from '../_shader/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import { Especialidad } from '../_model/especialidad';
@Injectable()
export class EspecialidadService {

  url: string=`${HOST}/especialidad`;
  especialidadCambio=new Subject<Especialidad[]>();
  mensaje=new Subject<string>();
  //pacientes:Paciente[]=[];
  constructor(private http: HttpClient) { 
  }
  
  getlistarEspe(){
   // let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Especialidad[]>(`${this.url}/listar`
    //  headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    //}
    );
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getlistarEspecialidad(p:number,s:number){
//    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Especialidad[]>(`${this.url}/listarPageable?page=${p}&size=${s}`
  //    headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
  //  }
  );
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getEspecialidadPorId(id:number){
  //  let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Especialidad>(`${this.url}/listar/${id}`
    //headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')}
    );
  }
  registrar(especialidad: Especialidad){
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`,especialidad
    //headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')}
    );
  }
  modificar(especialidad: Especialidad){ 
//    let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`,especialidad
  //    headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    );
    }
  eliminar(especialidad: Especialidad){
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/eliminar/${especialidad.idEspecialidad}`
      //headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    );
  }
}
