import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {DataExchangeService} from "../../../../data-exchange.service";
import {Subscription} from "rxjs";
import {Product} from "../../../../models/product/product.module";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  @Input() product: Product | undefined
  Subscript: Subscription = Subscription.EMPTY;

  constructor(private dServ: DataExchangeService) {
  }

  fullWidthMode: boolean = false;

  onAddToCart() {
    this.dServ.productEmit.next(this.product);
  }

  ngOnInit() {
    this.dServ.fullWidthModeDecide.subscribe(data => {
      this.fullWidthMode = data;
    })
  }
  ngOnDestroy() {
    this.Subscript.unsubscribe();
  }
}

