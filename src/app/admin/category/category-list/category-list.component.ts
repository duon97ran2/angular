import { CategoryService } from './../../../services/category.service';
import { CategoryResponse } from './../../../type/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'createdAt', 'id']
  categoryData: CategoryResponse[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => this.categoryData = data);
  }
  onDelete(id: string) {

  }

}
