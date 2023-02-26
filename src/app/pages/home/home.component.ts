import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataExchangeService} from "../../data-exchange.service";
import {Subscription} from "rxjs";
import {Product} from "../../models/product/product.module";
import {StoreService} from "../../store.service";

const ROWS_HEIGHT: { [id: number]: number } = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscript1: Subscription = Subscription.EMPTY;
  subscript2: Subscription = Subscription.EMPTY;
  subscript3: Subscription = Subscription.EMPTY;
  subscript4: Subscription = Subscription.EMPTY;
  subscript5: Subscription = Subscription.EMPTY;
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  product: Product | undefined;

  products: Product[] | undefined;

  sort = 'desc';
  count = 12;
  productsSubs: Subscription = Subscription.EMPTY;

  constructor(private dServ: DataExchangeService, private storeServ: StoreService) {
  }

  getProducts() {
    this.productsSubs = this.storeServ.getAllProducts(this.count, this.sort, this.category)
      .subscribe(data => this.products = data)
  }

  ngOnInit() {
    this.getProducts();
    this.subscript1 = this.dServ.columnsCountChange.subscribe(data => {
      this.cols = data;
      console.log(data)
      if (this.cols === 1) {
        this.dServ.fullWidthModeDecide.next(true)
      } else {
        this.dServ.fullWidthModeDecide.next(false)
      }
    })
    this.subscript2 = this.dServ.showCategory.subscribe(data => {
      this.category = data;
      this.rowHeight = ROWS_HEIGHT[this.cols];
      this.getProducts()
    })
    this.subscript3 = this.dServ.productEmit.subscribe(data => {
      this.product = data;
      this.dServ.addToCart({
        product: this.product?.image!,
        name: this.product?.title!,
        price: this.product?.price!,
        quantity: 1,
        id: this.product?.id!
      })
    })
    this.subscript4 = this.dServ.sortChange.subscribe(data => {
      this.sort = data;
      this.getProducts()
    });
    this.subscript5 = this.dServ.countChange.subscribe(data => {
      this.count = data;
      this.getProducts();
    });
  }

  ngOnDestroy() {
    this.subscript1.unsubscribe();
    this.subscript2.unsubscribe();
    this.subscript3.unsubscribe();
    this.subscript4.unsubscribe();
    this.subscript5.unsubscribe();
    this.productsSubs.unsubscribe();
  }
}
