import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/Shared/services/cart.service';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Product } from 'src/app/Shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  wishListData: string[] = [];

  constructor(
    private _EcomdataService: EcomdataService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WhishlistService: WhishlistService
  ) {}

  ngOnInit(): void {
    //get All Products..
    this.getAllProducts();

    this._WhishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('wishlist' , response.data);
        const newData = response.data.map((item: any) => item._id)
        this.wishListData = newData
      }
    })
  }

  getAllProducts() {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },

      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addFav(id: string): void {
    this._WhishlistService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string): void {
    this._WhishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }
}
