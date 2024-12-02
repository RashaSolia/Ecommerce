import { TranslateModule } from '@ngx-translate/core';
import { CartService } from './../../core/service/cart.service';
import { RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { Iproduct } from '../../core/service/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { Categories } from '../../core/service/interfaces/categories';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

 @Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,UpperCasePipe,CurrencyPipe,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy {

  private readonly _ProductService =inject(ProductService)
  private readonly _CartService =inject(CartService)
  private  readonly _ToastrService= inject (ToastrService)
productdata:Iproduct[]=[]
CategoriesData:Categories []=[]
getAllProductSubscribe!:Subscription
getAllCategoriesSubscribe!:Subscription

 ngOnInit(): void {
  this.getAllProductSubscribe= this._ProductService.getAllProduct().subscribe({
    next:(res)=>{
console.log(res.data)
this.productdata=res.data
    }
    
   })

 this.getAllCategoriesSubscribe=  this._ProductService.getcategoriesData().subscribe({
    next:(res)=>{
      this.CategoriesData=res.data
      console.log('ca',res.data)
    }
    
   })
 }

ngOnDestroy(): void {
this.getAllProductSubscribe?.unsubscribe()
this.getAllCategoriesSubscribe?.unsubscribe()
}

customOptionsstatic: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay:true,
  rtl:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
   items:1,
 
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  rtl:true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 5
    }
  },
  nav: true
}

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




