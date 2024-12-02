import { AuthService } from './../../core/service/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step:number=1
  private readonly _Router=inject(Router)
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  verifyemail:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
  })
  verifycode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[Validators.required, Validators.pattern(/^[0-9]{6}/)]],
  })
  resetpassword:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  verifyemailSubmit(){
  let email=  this.verifyemail.get('email')?.value
  this.resetpassword.get('email')?.patchValue(email)
this._AuthService.setEmailVerify(this.verifyemail.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.statusMsg=="success"){
      this.step=2
    }
  }
, error:(err)=>{
  console.log(err)
}
})
  }

  verifycodeSubmit(){
    const resetCodeValue = String(this.verifycode.get('resetCode')?.value);  // Convert resetCode to string
    const payload = { resetCode: resetCodeValue };  // Create an object with resetCode as a string

    this._AuthService.setCodeVerify(payload).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "Success") {
          this.step = 3;
        }
      },
      error: (err) => { 
        console.log(err);
      }
    });
}

      
      resetpasswordSubmit(){
    this._AuthService.resetPassword(this.resetpassword.value).subscribe({
      next:(res)=>{
        console.log(res)
         localStorage.setItem('userToken',res.token)
         this._AuthService.saveUserData()
         this._Router.navigate(['/home'])
      }
    , error:(err)=>{
      console.log(err)
    }
    })
      }

}
