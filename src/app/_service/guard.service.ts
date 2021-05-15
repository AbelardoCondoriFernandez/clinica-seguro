import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TOKEN_NAME } from '../_shader/var.constant';
import { LoginService } from './login.service';
//import { tokenNotExpired } from 'angular2-jwt';
import jwtDecode, * as decode from  'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class GuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();

    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
      if (helper.isTokenExpired(TOKEN_NAME, token.access_token)) {
        const decodedToken = helper.decodeToken(token.access_token);
        console.log(decodedToken);
        let rol = decodedToken.authorities[0];
        let url = state.url;
        switch (rol) {
          case 'ROLE_ADMIN': {
            if (url === '/medico' || url === '/paciente' || url === '/examen' || url === '/especialidad') {
              return true;
            } else {
              this.router.navigate(['not-403']);
              return false;
            }
          }
          case 'ROLE_USER': {
            if (url === '/paciente' || url === '/medico' || url === '/especialidad' || url === '/examen') {
              return true;
            } else {
              this.router.navigate(['not-403']);
              return false;
            }
          }
          default: {
            this.router.navigate(['not-403']);
            return false;
          }
        }
      }
      else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return true;
      }
    }
  }
}