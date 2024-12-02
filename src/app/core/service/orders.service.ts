import { environment } from '../environment/baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
private readonly _HttpClient =inject(HttpClient)
myheader:any={token:localStorage.getItem('userToken')}
  constructor() {
   }

   checkout(idCart:string|null,data:object):Observable<any>{
return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.serverPath}`,{
  "shippingAddress":data
}
 
)
   }
}
