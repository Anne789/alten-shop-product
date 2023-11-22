import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import { AllProducts, ProductItem } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsAdminComponent implements OnInit, OnDestroy {
  productList: AllProducts = { items: []};
  displayedColumns: string[] = [
    "code", 
    "name", 
    "description", 
    "image", 
    "price", 
    "category", 
    "quantity", 
    "inventoryStatus", 
    "rating"
  ];
  dataSource: ProductItem[] = [];
  productsSubscription: Subscription | undefined;

  constructor(private productService: ProductService, private http: HttpClient) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService.productList.subscribe((_allProducts: AllProducts) => {
      this.productList = _allProducts;
      this.dataSource = _allProducts.items;
    });
  }

  getTotal(items: ProductItem[]): number {
    return this.productService.getTotal(items);
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  
}