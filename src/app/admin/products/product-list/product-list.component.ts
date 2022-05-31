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
  displayedColumns: string[] = ['index', 'name', 'image', 'id'];
  constructor(private ProductService: ProductService) {
  }

  ngOnInit(): void {
    this.ProductService.getProduct().subscribe(data => this.products = data)
  }

}
