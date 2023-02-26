import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Product} from "./models/product/product.module";
import {Cart, CartItem} from "./models/cart/cart.module";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  columnsCountChange = new Subject<number>();
  countChange = new Subject<number>();
  sortChange = new Subject<string>();
  showCategory = new Subject<string>();

  fullWidthModeDecide = new Subject<boolean>();
  productEmit = new Subject<Product | undefined>();

  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackbar: MatSnackBar) {
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find(_item => _item.id === item.id)
    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({items});
    this._snackbar.open('1 item added to the cart.', 'ok', {duration: 3000});
  }

  getTotal(items: Array<CartItem>): number {
    return items.map(item => item.price * item.quantity
    ).reduce((prev, current) => prev + current, 0)
  }

  clearCart() {
    this.cart.next({items: []});
    this._snackbar.open('Cart is cleared', 'ok', {duration: 3000})
  }

  removeFromCart(element: CartItem, update = true): CartItem[] {
    const filteredCart = this.cart.value.items.filter(item => item.id !== element.id);
    if(update){
    this.cart.next({items: filteredCart});
    this._snackbar.open('1 item removed from cart.', 'ok', {duration: 3000})
    }
    return filteredCart
  }

  removeQ(item: CartItem) {
    let itemForRemoval: CartItem | undefined
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item
    })
    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({items: filteredItems})
    this._snackbar.open('1 item removed from cart', 'ok', {duration: 3000});
  }
}
