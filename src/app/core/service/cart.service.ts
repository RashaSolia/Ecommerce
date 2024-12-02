import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private readonly _HttpClient=inject(HttpClient)
myheader:any={   token:localStorage.getItem('userToken')}  
cartitemsNum:BehaviorSubject <number>=new BehaviorSubject(0)
constructor() { }

  addToCart(id:string):Observable<any>{
   return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
    {
"productId": id
  },
  )
  }

  getProductOfCart():Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
{
  headers:this.myheader
}
)
  }


  deletecartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      headers:this.myheader
    }
    )
  }

  updatecartItem(id:string,num:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count": num
        } 
    )
  }

  deleteAllcartItem():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
    
    )
  }
 


}

