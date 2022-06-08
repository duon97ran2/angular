import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanAccessAdminGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return this.router.navigateByUrl("/login")
    const userData = JSON.parse(loggedInUser);
    if (!userData.role) return this.router.navigateByUrl("/");
    return true
  }

}
