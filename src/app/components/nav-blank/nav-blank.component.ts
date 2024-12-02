import { CartService } from './../../core/service/cart.service';
import { MytranslateService } from './../../core/service/mytranslate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive ,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
private readonly _AuthService=inject(AuthService)
private readonly _MytranslateService=inject(MytranslateService)
readonly _TranslateService=inject(TranslateService)
readonly _CartService=inject(CartService)
cartIttemsNum:number=0
signout(){
  this._AuthService.signOut()
}

change(lang:string):void{
this._MytranslateService.changelang(lang)
}
ngOnInit(): void {
  this._CartService.getProductOfCart().subscribe({
    next:(data)=>{
this._CartService.cartitemsNum.next(data.numOfCartItems)
    }
  })
   this._CartService.cartitemsNum.subscribe({
    next:(data)=>{this.cartIttemsNum=data}
  })
}
}
