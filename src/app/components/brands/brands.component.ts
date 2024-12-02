import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly _ProductService=inject(ProductService)
  // categoryList:Categories[]= []
  ngOnInit(): void {
    this._ProductService.BrandsData().subscribe({
      next:(res)=>{
        console.log(res.data);
        // this.categoryList=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
