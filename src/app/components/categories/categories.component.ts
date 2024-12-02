import { ProductService } from './../../core/service/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { ConstantPool } from '@angular/compiler';
import { Categories } from '../../core/service/interfaces/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly _ProductService=inject(ProductService)
categoryList:Categories[]= []
ngOnInit(): void {
  this._ProductService.getcategoriesData().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoryList=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
