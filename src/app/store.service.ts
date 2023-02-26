import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./models/product/product.module";

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpC: HttpClient) {
  }
  getAllProducts(limit = 12, sort = 'desc', category?:string): Observable<Array<Product>>{
    return this.httpC.get<Product[]>(`${STORE_BASE_URL}/products${category ? ['/category/'] + category : ''}?sort=${sort}&limit=${limit}`);
  }
  getAllCata():Observable<Array<string>>{
    return this.httpC.get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
  }
}
