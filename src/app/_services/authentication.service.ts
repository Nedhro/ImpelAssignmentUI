import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public permissions: any[];
    public menus: any[];
    public userPermissions = [];

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
        ) {
    	if(this.cookieService.get('currentUser')){
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')));
             try {
                this.permissions = jwt_decode(this.currentUserSubject.value.accessToken).permission;
                this.menus = this.permissions.filter(v => v.authority.endsWith("MENU"));
                this.getuserPermissions();
            } catch(Error){
                this.permissions = [];
            }
        } else {
        	this.currentUserSubject = new BehaviorSubject<User>(null);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public hasPermission(name: string) {
        let hasPermission = false;
        if(!this.permissions){
            this.permissions = jwt_decode(this.currentUserSubject.value.accessToken).permission;
        }
        for (let authority of this.permissions) {
            if(authority.authority == 'ADMIN') hasPermission = true;
            if(authority.authority == name) {
                hasPermission = true;
            }
        };
        return  hasPermission;
    }

    public getuserPermissions() {
        this.userPermissions = [];
        if(this.cookieService.get('currentUser')){
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')));
            this.permissions = jwt_decode(this.currentUserSubject.value.accessToken).permission;
            this.menus = this.permissions.filter(v => v.authority.endsWith("MENU"));
        } else {
            console.log('currentUser not found');
        }

        this.userPermissions.forEach(menu => {
            let features = [];
            menu.permissions.forEach(permission => {
                if (this.checkAvailability(this.permissions, permission.name)) {
                    features.push(permission);
                }
            });
            menu.permissions = features;
        });

    }

    private checkAvailability(arr, val) {
        return arr.some(function(arrVal) {
            return val === arrVal.authority;
        });
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:9000/auth`, { username, password })
            .pipe(map(user => {
                if (user && user.accessToken) {
                    this.cookieService.set( 'currentUser', JSON.stringify(user) );
                    this.getuserPermissions();
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        this.cookieService.delete('currentUser');
        this.currentUserSubject.next(null);
    }

    public getVerificationToken(token: string) {
        return this.http.get('http://localhost:9000/public/verify/' + token);
    }
}
