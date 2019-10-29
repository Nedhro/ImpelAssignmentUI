import { AuthenticationService } from './../_services/authentication.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Roleguard implements CanActivate{

  constructor(
    private router: Router,
    private auth: AuthenticationService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    )
    : Observable<boolean> | Promise<boolean> | boolean  {
      let roles = route.data.roles as Array<string>;
      let hasRole = this.auth.hasPermission(roles[0]);
      if(hasRole){
      	return true;
      }

      this.router.navigate(['/']);
      return false;
    }
}
