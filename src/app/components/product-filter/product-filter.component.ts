import { CategoryResponse } from './../../type/category';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categoryData: CategoryResponse[] = [];
  filterForm: FormGroup;
  @Output() filterHandle: EventEmitter<any>;
  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.filterForm = new FormGroup({
      sort: new FormControl(""),
      range: new FormControl(""),
      category: new FormControl([]),
    });
    this.filterHandle = new EventEmitter();
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => this.categoryData = data);
  }
  onSubmit() {
    const { category, sort, range } = this.filterForm.controls;
    this.productService.getFilterProduct(sort.value, JSON.stringify(category.value), range.value).subscribe(data => {
      if (data.length) {
        this.filterHandle.emit(data);
      }
    });
  }

}
