import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchInput: FormControl;
  products: Product[] = [];
  constructor(private productService: ProductService) {
    this.searchInput = new FormControl();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(500),
      switchMap((changedValue: string) => this.productService.searchProduct(changedValue))
    ).subscribe(data => { this.products = data, console.log(data) });
  }

}
