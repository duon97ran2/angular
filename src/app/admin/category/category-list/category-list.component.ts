import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { CategoryResponse } from './../../../type/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'thumbnail', 'createdAt', 'id']
  categoryData: CategoryResponse[] = [];
  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.categoryService.getCategory().subscribe(data => this.categoryData = data);
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Xoá danh mục này?");
    if (!confirmDelete) return
    this.categoryService.deleteCategory(id).subscribe(data => { this.toastr.success("Xoá danh mục thành công"); this.getList() });
  }
  updateStatus(id: string, status: number) {
    this.categoryService.updateCategory(id, { status: !status ? 1 : 0 }).subscribe(data => { this.toastr.success("Cập nhật trạng thái thành công"); this.getList() });
  }
}
