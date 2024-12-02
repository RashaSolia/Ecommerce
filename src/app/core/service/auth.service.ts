
import { environment } from '../environment/baseUrl';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any=null
private readonly _HttpClient=inject(HttpClient)
private readonly _Router=inject(Router)
  constructor() {} 

setRegisterForm(data:object):Observable<any>{
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
}

setLoginForm(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
 }

 saveUserData()
{
  if(localStorage.getItem('userToken') !==null){
   this.userData= jwtDecode(localStorage.getItem('userToken')!)
   console.log(this.userData)
  }
}

signOut(){
  localStorage.removeItem('userToken')
  this.userData=null
  this._Router.navigate(['/login'])

}

setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}

setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
resetPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}
}
