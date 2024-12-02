import { environment } from '../environment/baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private readonly _HttpClient=inject(HttpClient)
  constructor() { }
 
  getAllProduct():Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpacificProduct(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
}
// ________________________categories________________
getcategoriesData():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
}
getSpacificcategoriesData(id:string|null):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
}

BrandsData():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
}

}
