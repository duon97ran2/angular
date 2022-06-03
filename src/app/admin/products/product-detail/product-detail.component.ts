import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string | null;
  product: Product
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
    this.id = "";
    this.product = { _id: "", name: "", price: 0 };
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.productService.getProductDetail(this.id).subscribe(data => this.product = data);
  }

}
