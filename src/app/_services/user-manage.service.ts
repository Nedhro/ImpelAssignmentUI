import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  public url = 'http://localhost:9000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  public getRoles() {
        return this.http.get(this.url + '/admin/roles');
  }

  public getPermissionGroups() {
        return this.http.get(this.url + '/admin/permission/group');
  }

  public getPermissions() {
        return this.http.get(this.url + '/admin/permissions');
  }

  public getPermissionByRole(id) {
        return this.http.get(this.url + '/admin/role/' + id);
  }

  public saveRolePermision(id: number, permission: any) {
        return this.http.post(this.url + '/admin/role/' + id , permission);
  }
  public saveRole(role: any) {
        return this.http.post(this.url + '/admin/role', role);
  }

  public getUsers(page: number, size: number) {
        return this.http.get(this.url + '/admin/users/' + page + '/' + size);
  }

  public saveUserRoles(id: number, roles: any) {
        return this.http.post(this.url + '/admin/user/' + id, roles);
  }

  public saveUser(user: any) {
        return this.http.post(this.url + '/public/registration', user, this.httpOptions);
  }

  public resetPassword(password: any) {
        return this.http.post(this.url + '/public/resetpassword', password);
  }

  public getMenuPermissionData() {
      return this.http.get('./assets/sidebar_menu.json');
  }

  public setUserStatus(id, status) {
      return this.http.get(this.url + '/admin/user/status/' + id + '?action=' + status);
  }

  public getUserByEmail(email: string) {
      return this.http.get(this.url + '/public/username/?email=' + email);
  }

}
