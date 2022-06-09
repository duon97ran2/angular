import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../type/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getProduct().subscribe(data => this.products = data);
  }

}
