import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from 'src/app/type/category';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-cate-books',
  templateUrl: './cate-books.component.html',
  styleUrls: ['./cate-books.component.css']
})
export class CateBooksComponent implements OnInit {
  categories: CategoryResponse[] = [];
  products: Product[] = [];
  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => { this.categories = data, this.getProduct(data[0]._id) });
  }
  getProduct(id: string) {
    this.productService.getByCategory(id).subscribe(data => this.products = data);
  }

}
