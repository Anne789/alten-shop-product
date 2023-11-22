export interface AllProducts {
    items: Array<ProductItem>;
  }
  
  export interface ProductItem {
    id:number; 
    code:string;
    name:string;
    description:string;
    image:string;
    price:number;
    category:string;
    quantity:number; 
    inventoryStatus:string;
    rating:number;
  }
  