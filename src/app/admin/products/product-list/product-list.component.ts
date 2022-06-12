import { createType } from './../../../type/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['index', 'name', 'category', 'price', 'newPrice', 'stock', 'status', 'image', 'id'];
  constructor(
    private ProductService: ProductService,
    private toarst: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.onGetList();
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Do you want to remove this item?");
    if (confirmDelete && id) {
      this.ProductService.deleteProduct(id).subscribe(data => {
        this.toarst.success("Xóa sản phẩm thành công")
        this.onGetList();
      })
    }
  }
  onGetList() {
    this.ProductService.getProduct().subscribe(data => this.products = data)
  }
  onDuplicate(product: createType) {
    delete product._id;
    this.ProductService.createProduct(product).subscribe(data => { this.toarst.success("Nhân bản sản phẩm thành công"); this.onGetList() })
  }
  statusChange(id: string, status: number) {
    this.ProductService.updateProduct(id, { status: !status ? 1 : 0 }).subscribe(
      data => {
        this.toarst.success("Cập nhật trạng thái thành công");
        this.onGetList();
      })
  }

}
