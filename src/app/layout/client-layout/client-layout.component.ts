import { CategoryResponse } from './../../type/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  categories: CategoryResponse[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  setCategories(categoriesData: CategoryResponse[]) {
    this.categories = categoriesData;
  }

}
