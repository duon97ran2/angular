import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: UntypedFormGroup;
  currentId: string | null = '';
  images: string[] = [];
  constructor(private productSevive: ProductService, private router: Router, private activateRoute: ActivatedRoute, private imageService: ImageService) {
    this.productForm = new UntypedFormGroup(
      {
        name: new UntypedFormControl("",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
            // this.onVidateNameHasProduct
          ]),
        price: new UntypedFormControl(0)
      }
    );
  }

  ngOnInit(): void {
    this.currentId = this.activateRoute.snapshot.params['id'];
    if (!this.currentId) return
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
  uploadHandle(event: any) {
    console.log(event.target);
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('image', file, file.name);
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.imageService.uploadImage(formData).subscribe(data => this.images.push(data))
  }
  removeImage(image: string) {
    this.images = this.images.filter(item => item != image);
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
