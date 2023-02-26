import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../../../models/cart/cart.module";
import {DataExchangeService} from "../../../../data-exchange.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  subscrpt1: Subscription = Subscription.EMPTY;
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 3,
        id: 1
      }
    ]
  }
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private dServ: DataExchangeService) {
  }

  getTotal(items: Array<CartItem>): number {
    return this.dServ.getTotal(items);
  }
  onClearCart(){
    this.dServ.clearCart();
  }
  onRemoveFromCart(element: CartItem){
    this.dServ.removeFromCart(element);
  }
  onAddQ(item: CartItem){
    this.dServ.addToCart(item);
  }
  onRemQ(item: CartItem){
    this.dServ.removeQ(item);
  }
  ngOnInit() {
    this.subscrpt1 = this.dServ.cart.subscribe(data => {
      this.cart = data;
      this.dataSource = this.cart.items;
      console.log(this.dataSource)
    })
  }
  ngOnDestroy() {
    this.subscrpt1.unsubscribe();
  }
}
