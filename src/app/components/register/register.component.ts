 import { AuthService } from '../../core/service/auth.service';
 import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage:string=''
  isloading:boolean=false
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)
 constructor(){
 }

 registerForm:FormGroup=this._FormBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
 },{validators:this.matchedPassword})

// registerForm:FormGroup =new FormGroup({
//   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
//   rePassword:new FormControl(null),
//   phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
// },this.matchedPassword)

registersubmit(){
  if(this.registerForm.valid){
    this.isloading=true
    console.log(this.registerForm.value)
    this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next:(res:any)=>{
console.log(res)
this.isloading=false
if(res.message=='success'){
  this._Router.navigate(['/login'])
}
      },
      error:(err:any)=>{
console.log(err)
this.isloading=false
this.errorMessage=err.error.message

      }
    })
  }
}

matchedPassword(g:AbstractControl):any{
if(g.get('password')?.value === g.get('rePassword')?.value){
return null
}
else{
  return {mismatch:true}
}
}


}
