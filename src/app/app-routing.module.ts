import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/auth-layout/login/login.component';
import { RegisterComponent } from './components/auth-layout/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './Shared/guards/auth.guard';
import { ForgotPasswordComponent } from './components/auth-layout/forgot-password/forgot-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { SubcategoriesComponent } from './components/categories/subcategories/subcategories.component';

const routes: Routes = [


  {
    
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'subcategories/:id', component: SubcategoriesComponent },
      {path: 'checkout/:cartId',component: CheckoutComponent,canActivate: [authGuard],},
      { path: 'allorders',component: OrdersComponent,canActivate: [authGuard],},
      {path: 'whishlist',component: WhishlistComponent,canActivate: [authGuard],},

      
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent },
        ],
      },
    ],
  },
  { path: '**',   component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
