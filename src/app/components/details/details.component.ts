import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Iproduct } from './../../core/service/interfaces/iproduct';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/service/product.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _ProductService=inject(ProductService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _CartService=inject(CartService)
  productData:Iproduct |null=null
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
let productId = p.get('id')
this._ProductService.getSpacificProduct(productId).subscribe({
  next:(res)=>{
    this.productData =res.data
console.log( this.productData)
  },  
  error:(err)=>{
    console.log(err)
}
})
}
    })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay:true,
  rtl:true,
  autoplayTimeout:2000,
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
}
    } 
  })
}
}
