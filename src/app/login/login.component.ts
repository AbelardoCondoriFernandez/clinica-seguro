import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service';
import { TOKEN_NAME } from '../_shader/var.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: string;
  contrasena: string;
  constructor (private loginService:LoginService,private router:Router) { }
 
  ngOnInit() {
  }
  ngAfterViewInit() {
    (window as any).initialize();
  }
  iniciarSesion(){
    console.log(`usuario: ${this.usuario} contrasena: ${this.contrasena}`)
    alert(`usuario: ${this.usuario} contraseña: ${this.contrasena}`)
    this.loginService.login(this.usuario,this.contrasena).subscribe(data => {
     
      if(data){
        let token= JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.router.navigate(['paciente']);
        
      }
    });
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    
  }
}
