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
  constructor(private categoryService: CategoryService, private router: Router, private activeRoute: ActivatedRoute) {
    this.categoryForm = new FormGroup({
      name: new FormControl("", Validators.required)
    })
  }
  ngOnInit(): void {
    this.currentId = this.activeRoute.snapshot.params['id'];
    this.categoryService.readCategory(this.currentId).subscribe(data => this.categoryForm.patchValue({
      name: data.name,
    }));
  }
  onSubmit() {
    this.categoryService.createCategory(this.categoryForm.value).subscribe(data => this.router.navigateByUrl("/admin/category/list"));
  }

}
