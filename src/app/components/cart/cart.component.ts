import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Icart } from './../../core/service/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly _CartService=inject(CartService)
private  readonly _ToastrService= inject (ToastrService)

cartData:Icart ={} as Icart
ngOnInit(): void {
  this._CartService.getProductOfCart().subscribe({
    next:(res)=>{
console.log(res.data)
this.cartData=res.data
    },
     
  })
}
deleteItem(id:string){
  this._CartService.deletecartItem(id).subscribe({
    next:(res)=>{
console.log(res)
this.cartData=res.data
this._ToastrService.success('Done');
this._CartService.cartitemsNum.next(res.numOfCartItems)
    },
     
  })
}

updateItem(id:string,count:number){
 if(count>0){
  this._CartService.updatecartItem(id,count).subscribe({
    next:(res)=>{
console.log(res)
this.cartData=res.data
this._ToastrService.success('Done');

 
    },
     
  })
 }
}

deleteAllcart(){
  this._CartService.deleteAllcartItem().subscribe({
    next:(res)=>{
console.log(res) 
 if(res.message=='success'){
  this.cartData ={} as Icart
  this._ToastrService.success('Done');
  this._CartService.cartitemsNum.next(0)

 }
    },
     
  })
}
}
