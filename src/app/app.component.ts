import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from "./models/cart/cart.module";
import {DataExchangeService} from "./data-exchange.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  subscript1: Subscription = Subscription.EMPTY
  constructor(private dServ: DataExchangeService ) {
  }
  cart: Cart = {items: []}
  ngOnInit() {
    this.subscript1 = this.dServ.cart.subscribe(_cart=>{
      this.cart = _cart;
    })
  }
  ngOnDestroy() {
    this.subscript1.unsubscribe()
  }
}
