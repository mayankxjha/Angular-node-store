import {Component, Input, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart/cart.module";
import {DataExchangeService} from "../../data-exchange.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = {items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.map(item => item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  getTotal(items: Array<CartItem>):number {
    return this.dServ.getTotal(items);
  }

  constructor(private dServ: DataExchangeService) {
  }
  onClearCart(){
    this.dServ.clearCart();
  }
  ngOnInit() {
  }
}
