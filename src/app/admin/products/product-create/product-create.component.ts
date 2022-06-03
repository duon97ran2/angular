import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  currentId: string | null = '';
  constructor(private productSevive: ProductService, private router: Router, private activateRoute: ActivatedRoute) {
    this.productForm = new FormGroup(
      {
        name: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(12), this.onVidateNameHasProduct]),
        price: new FormControl(0)
      }
    );
  }

  ngOnInit(): void {
    this.currentId = this.activateRoute.snapshot.params['id'];
    this.productSevive.getProductDetail(this.currentId).subscribe(data => {
      this.productForm.patchValue(
        {
          name: data.name,
          price: data.price,
        }
      )
    })
  }
  onVidateNameHasProduct(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    if (!value.includes("product")) return { hasProductError: true };
    return null
  }
  onSubmit() {
    const data = this.productForm.value;
    if (this.currentId) {
      this.productSevive.updateProduct(this.currentId, data).subscribe(data => this.router.navigateByUrl("/admin/products/list"))
      return
    }
    this.productSevive.createProduct(data).subscribe(data => this.router.navigateByUrl("/admin/products/list"));
  }
}
