import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private localStorageToken: LocalStorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.localStorageToken.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if(tokenDecode.isAdmin &&  !this._tokenExpired()) return true
            
        }
        this.router.navigate(['/login']);
        return false;
    }

    private _tokenExpired() {
        const token = this.localStorageToken.getToken();
        if (!token) return true;
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        const expires = new Date(tokenDecode.exp * 1000);
        return expires < new Date();
    }
}
