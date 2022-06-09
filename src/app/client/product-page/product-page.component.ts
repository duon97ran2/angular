import { Product } from 'src/app/type/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryResponse } from 'src/app/type/category';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  param: string | null = "";
  products: Product[] = [];
  categoryName: string = '';
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.param = params.get("id");
      if (!this.param) {
        this.productService.getProduct().subscribe(data => this.products = data);
      } else {
        this.productService.getByCategory(this.param).subscribe(data => { this.products = data; this.categoryName = data[0].category.name });
      }
    });

  }

}
