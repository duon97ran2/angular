import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catgory-form',
  templateUrl: './catgory-form.component.html',
  styleUrls: ['./catgory-form.component.css']
})
export class CatgoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  currentId: string = "";
  thumbnail: string[] = [];
  uploadState: boolean = false;
  constructor(private categoryService: CategoryService, private router: Router, private activeRoute: ActivatedRoute, private toastr: ToastrService) {
    this.categoryForm = new FormGroup({
      name: new FormControl("", Validators.required)
    })
  }
  ngOnInit(): void {
    this.currentId = this.activeRoute.snapshot.params['id'];
    if (this.currentId) {
      this.categoryService.readCategory(this.currentId).subscribe(data => {
        this.categoryForm.patchValue({
          name: data.name,
        });
        this.thumbnail = data.thumbnail;
      }
      );
    }

  }
  onSubmit() {
    if (this.currentId) {
      this.categoryService.updateCategory(this.currentId, { ...this.categoryForm.value, thumbnail: this.thumbnail }).subscribe(data => { this.router.navigateByUrl("/admin/category/list"); this.toastr.success("Cập nhật danh mục thành công") });
    } else {
      this.categoryService.createCategory({ ...this.categoryForm.value, thumbnail: this.thumbnail }).subscribe(data => { this.router.navigateByUrl("/admin/category/list"); this.toastr.success("Tạo danh mục thành công") });
    }
  }
  setThumbnail(data: string[]) {
    this.thumbnail = data;
  }
  setState(state: boolean) {
    this.uploadState = state;
  }

}
