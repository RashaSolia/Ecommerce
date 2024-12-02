import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const handelErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService=inject(ToastrService)
  return next(req).pipe (catchError((err)=> {
    _ToastrService.error(err.error.message)
    return throwError (()=>err)}));
};
