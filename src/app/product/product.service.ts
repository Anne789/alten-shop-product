import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AllProducts, ProductItem } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList = new BehaviorSubject<AllProducts>({ items: [] });

  addToProductList(item: ProductItem): void {
    const items = [...this.productList.value.items];

    const itemInProductList = items.find((_item) => _item.id === item.id);
    if (itemInProductList) {
      itemInProductList.quantity += 1;
    } else {
      items.push(item);
    }

    this.productList.next({ items });
  }

  removeFromProductList(item: ProductItem, updateList = true): ProductItem[] {
    const filteredItems = this.productList.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateList) {
      this.productList.next({ items: filteredItems });
    }

    return filteredItems;
  }

  removeQuantity(item: ProductItem): void {
    let itemForRemoval!: ProductItem;

    let filteredItems = this.productList.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromProductList(itemForRemoval, false);
    }

    this.productList.next({ items: filteredItems });
  }

  getTotal(items: ProductItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
