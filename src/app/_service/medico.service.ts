//se utilizara en otras clases para hacer inyecciones

import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from '../_shader/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medico } from '../_model/medico';
@Injectable()
export class MedicoService {

  url: string=`${HOST}/medico`;
  medicoCambio=new Subject<Medico[]>();
  mensaje=new Subject<string>();
  constructor(private http: HttpClient) { 

  }
  getlistarMed(){
   // let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Medico[]>(`${this.url}/listar`
    //  headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    );
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  }
  getlistarMedico(p:number,s:number){
  //  let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      //volvera la variable listar
    //  return this.pacientes; 
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    return this.http.get<Medico[]>(`${this.url}/listarPageable?page=${p}&size=${s}`
    //  headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    );
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
    //java moderno

  } 
  getMedicoPorId(id:number){
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Medico>(`${this.url}/listar/${id}`
    //headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')}
    );
  }
  registrar(medico: Medico){
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`,medico
    //headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')}
    );
  }
  modificar(medico: Medico){ 
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`,medico
    //  headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    );
    }
  eliminar(medico: Medico){
    //let access_token =JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/eliminar/${medico.idMedico}`
    /*,{
      headers:new HttpHeaders().set('Authorization',`bearer${access_token}`).set('Content-Type','application/json')
    }*/);
  }
}
