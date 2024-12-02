import { NgClass } from '@angular/common';
import { AuthService } from './../../core/service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  constructor(){

  }
  isloading:boolean=false
  errorMessage:string=''

  loginform:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
// loginform:FormGroup =new FormGroup({
//   email:new FormControl(null,[Validators.required, Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
// })

loginsubmit(){
if(this.loginform.valid){
  this.isloading=true
  console.log(this.loginform)
this._AuthService.setLoginForm(this.loginform.value).subscribe({
  next:(res:any)=>{
console.log(res)
this.isloading=false
localStorage.setItem('userToken',res.token)
this._AuthService.saveUserData()
this._Router.navigate(['/home'])
  },
  error:(err:any)=>{
console.log(err)
this.isloading=false
this.errorMessage=err.error.message

  }
})

}
}
}
