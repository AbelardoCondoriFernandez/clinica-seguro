import { Injectable } from "@angular/core";
import { HOST, TOKEN_NAME, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD } from "../_shader/var.constant";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import * as decode from 'jwt-decode';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable()
export class LoginService {
     private url: string=`${HOST}/oauth/token`;
    
    constructor (private http:HttpClient,private router:Router){
}

login(usuario: string, contrasena: string){
    const body = `username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}&grant_type=password`;

    return this.http.post(this.url, body,{
        headers:new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
        
    });
}    
estaLogeado(){
    let token =sessionStorage.getItem(TOKEN_NAME);
    return token !=null;
}

cerrarSesion(){
    
    sessionStorage.clear();
    this.router.navigate(['login']);
}
isAdmin(){
    const helper = new JwtHelperService();

    let tk=sessionStorage.getItem(TOKEN_NAME);
    if(tk !=null){
     //console.log(decodedToken);
        const decodedToken=helper.decodeToken(tk);
    let isAdmin=decodedToken.authorities.some(el=>el ==='ROLE_ADMIN');
       //console.log(isAdmin);
        return isAdmin;

    }
}
}