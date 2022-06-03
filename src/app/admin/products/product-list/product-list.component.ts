import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['index', 'name', 'price', 'image', 'id'];
  constructor(private ProductService: ProductService) {
  }

  ngOnInit(): void {
    this.onGetList();
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Do you want to remove this item?");
    if (confirmDelete && id) {
      this.ProductService.deleteProduct(id).subscribe(data => {
        console.log(data)
        this.onGetList();
      })
    }
  }
  onGetList() {
    this.ProductService.getProduct().subscribe(data => this.products = data)
  }

}
