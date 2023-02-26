import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataExchangeService} from "../../../../data-exchange.service";
import {StoreService} from "../../../../store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy{

  subcript1: Subscription = Subscription.EMPTY;
  constructor(private dServ: DataExchangeService,private storeServ: StoreService) {
  }

  onShowCategory(category: string) {
    this.dServ.showCategory.next(category);
    console.log(category);
  }
  categories: string[] | undefined
  ngOnInit() {
    this.subcript1 = this.storeServ.getAllCata().subscribe(data=>this.categories = data);
  }
  ngOnDestroy() {
    this.subcript1.unsubscribe();
  }
}
