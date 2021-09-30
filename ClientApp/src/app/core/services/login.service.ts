import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string;

  constructor(private httpClient: HttpClient, @Inject('reqresurl') originUrl: string) {
    this.baseUrl = `${originUrl}api/login`;
  }

  isAuthenticated(): boolean {
    return this.tokenNotExpired();
  }

  public isInRole(roleName:string):boolean{
    return this.getRoles().indexOf(roleName) > -1;
  }

  public  getToken(loginModel): Observable<ITokenResponse> {

      const url = `${this.baseUrl}/token`;

      return this.httpClient.post<ITokenResponse>(url, loginModel).pipe(
        tap(data => {
          console.log("token", data);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem('userProfile', JSON.stringify(data.userProfile));
          localStorage.setItem('roles', JSON.stringify(data.roles));
        })
       );

  }

  public getUserProfile(): IUserProfile {
      return JSON.parse(localStorage.getItem('userProfile'));

  }
  public getRoles(): string[] {
      return JSON.parse(localStorage.getItem('roles'));
  }

  public logOut():void{
      localStorage.removeItem('token');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('roles');
      //localStorage.removeItem('salesOrder');
  }

  // private readUserFromLocalStorage() {

  //     this.profile = JSON.parse(localStorage.getItem('profile'));

  //     //var token = localStorage.getItem('token');
  //     //if (token) {
  //     //    var jwtHelper = new JwtHelper();
  //     //    var decodedToken = jwtHelper.decodeToken(token);
  //     //    this.roles = decodedToken['https://vega.com/roles'] || [];
  //     //}
  // }

  //https://stackoverflow.com/questions/60758154/how-to-check-if-jwt-token-is-expired-in-angular-8
  private tokenNotExpired() :boolean {
    let token = localStorage.getItem('token')
    if(!token)
      return false;

    const tokenExpiryDate = (JSON.parse(atob(token.split('.')[1]))).exp;
    const currentTime = (Math.floor((new Date).getTime() / 1000))
    return tokenExpiryDate >= currentTime ;
  }

}
export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
  userProfile: IUserProfile;
  roles : string[];
}

export interface IUserProfile {
  id: number;
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
}
