import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../type/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productData: { saleProduct: Product[], product: Product[] } = { saleProduct: [], product: [] };

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getHomeProduct().subscribe(data => this.productData = data);
  }

}
