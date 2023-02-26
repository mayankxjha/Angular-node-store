import {Component, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {DataExchangeService} from "../../../../data-exchange.service";

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit{
  constructor(private dServ: DataExchangeService) {
  }
  sort: string = 'desc';
  itemShowCount = 12;

  changeOrder(sortType: string) {
    this.sort = sortType;
    this.dServ.sortChange.next(this.sort)
  }
  onItemsUpdated(count: number){
    this.itemShowCount = count;
    this.dServ.countChange.next(this.itemShowCount)
  }
  onColumnsUpdated(colsNum: number){
    this.dServ.columnsCountChange.next(colsNum);
  }
  ngOnInit() {
  }
}
