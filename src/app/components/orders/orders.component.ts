import { OrdersService } from './../../core/service/orders.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  private cartId:string|null=''
ordersForm:FormGroup=this._FormBuilder.group({
  details:[null],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null]
})
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
 
this.cartId=params.get('id')
    }
  })
}
submitOrder(){
console.log(this.ordersForm.value)
console.log(this.cartId)

this._OrdersService.checkout(this.cartId,this.ordersForm.value).subscribe(
  {
    next:(res)=>{
      console.log(res)
      if(res.status==="success"){
        // res.session.url
        window.open(res.session.url,'_self')
      }
    },

    error:(err)=>{
      console.log(err)
    },
  }
)
}


}
