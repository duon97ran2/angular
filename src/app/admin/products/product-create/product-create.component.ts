import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from './../../../type/category';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { HttpEvent, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: UntypedFormGroup;
  currentId: string | null = '';
  images: string[] = [];
  categoryList: CategoryResponse[] = [];
  upload: { progress: number, state: boolean } = { progress: 0, state: false }
  constructor(
    private productSevive: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private toarst: ToastrService
  ) {
    this.productForm = new UntypedFormGroup(
      {
        name: new UntypedFormControl("",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
            // this.onVidateNameHasProduct
          ]),
        price: new UntypedFormControl(1000,
          [
            Validators.required,
            Validators.max(10000000),
            Validators.min(1000),
            // this.onVidateNameHasProduct
          ]),
        newPrice: new UntypedFormControl(0,
          [
            Validators.max(10000000),
            Validators.min(0),
            // this.onVidateNameHasProducts
          ]),
        stock: new UntypedFormControl(0,
          [
            Validators.required,
            Validators.max(1000),
            Validators.min(1),
            // this.onVidateNameHasProduct
          ]),
        status: new UntypedFormControl(0,
        ),
        author: new UntypedFormControl("",
          [
            Validators.required,
            // this.onVidateNameHasProduct
          ]),
        description: new UntypedFormControl("",
          [
            // this.onVidateNameHasProduct
          ]),
        category: new UntypedFormControl("", Validators.required)
      }
    );
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => this.categoryList = data);
    this.currentId = this.activateRoute.snapshot.params['id'];
    if (!this.currentId) return
    this.productSevive.getProductDetail(this.currentId).subscribe(data => {
      this.images = data.image;
      this.productForm.patchValue(
        {
          name: data.name,
          price: data.price,
          newPrice: data.newPrice,
          stock: data.stock,
          category: data.category,
          author: data.author,
          description: data.description,
          status: data.status,
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
    this.upload.state = true;
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('image', file, file.name);
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.imageService.uploadImage(formData).subscribe({
      next: (data: HttpEvent<any>) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.upload.progress = Math.round(100 * data.loaded / (data.total ?? 1));
        } else if (data instanceof HttpResponse) {
          this.upload.state = false;
          this.upload.progress = 0;
          this.images.push(data.body);
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(false);
      }
    })
  }
  removeImage(image: string) {
    this.images = this.images.filter(item => item != image);
  }
  onSubmit() {
    const data = this.productForm.value;
    data.image = this.images;
    if (this.currentId) {
      this.productSevive.updateProduct(this.currentId, data).subscribe(
        data => { this.router.navigateByUrl("/admin/products/list"); this.toarst.success("Cập nhật sản phẩm thành công") },
        error => { this.toarst.error(error) },)
      return
    }
    this.productSevive.createProduct(data).subscribe(
      data => { this.router.navigateByUrl("/admin/products/list"); this.toarst.success("Thêm sản phẩm thành công") },
      error => { this.toarst.error(error) },
    );
  }
}
