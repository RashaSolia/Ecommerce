import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from './../../core/service/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { Iproduct } from '../../core/service/interfaces/iproduct';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  private readonly _ProductService =inject(ProductService)
  private readonly _CartService =inject(CartService)
  private  readonly _ToastrService= inject (ToastrService)
  productdata:Iproduct[]=[]

  ngOnInit(): void {
   this._ProductService.getAllProduct().subscribe({
      next:(res)=>{
  console.log(res.data)
  this.productdata=res.data
      }
      
   })}
  
   addToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
  console.log(res)
  if(res.status=='success'){
       this._ToastrService.success(res.message, '');
       this._CartService.cartitemsNum.next(res.numOfCartItems)
   }
      } 
    })
  }
}
