import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  AllOrdersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeOrdersCount: Observable<number> = this.AllOrdersCount.asObservable();

  changeTruckCount(NewNumber: number): void {
    this.AllOrdersCount.next(NewNumber);
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
  getSingleOrderDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,

      { headers: { token: this._CartService.myToken} }
    );
  }
}
