import { OrdersComponent } from './components/orders/orders.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DetailsComponent } from './components/details/details.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
 import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
 import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[loginGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgetpassword',component:ForgetPasswordComponent},
    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'product',loadComponent:()=>import('./components/product/product.component').then((c)=>c.ProductComponent)},
        {path:'cart',component:CartComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'brands',component:BrandsComponent},
        {path:'details/:id',component:DetailsComponent},
        {path:'allorders',component:AllordersComponent},
        {path:'orders/:id',component:OrdersComponent},
     ]},
    {path:'**',component:NotfoundComponent},

];
