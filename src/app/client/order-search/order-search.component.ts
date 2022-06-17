import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { orderResponse } from 'src/app/type/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  orderData: orderResponse[] = [];
  displayedColumns: string[] = ['index', 'id', 'status', 'name', 'action'];

  formSearch: FormGroup
  constructor(private orderService: OrdersService, private router: Router, public dialog: MatDialog, private toarst: ToastrService) {
    this.formSearch = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }
  statusUpdate(status: number, id: string) {
    let confirmUpdate = confirm("Hủy đơn hàng?");
    if (confirmUpdate) {
      this.orderService.updateOrder(id, { status }).subscribe(data => { this.orderData = this.orderData.map(item => item._id != data._id ? item : data); this.toarst.success("Cập nhật trạng thái thành công"); })
    }
  }
  openInNewWindow(id: string) {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/detail/${id}`])
    );

    window.open(url, '_blank');
  }
  onSubmit() {
    const emailData = this.formSearch.value;
    this.orderData = [];
    this.orderService.findEmail(emailData).subscribe(data => {
      const diaglogRef = this.dialog.open(DialogAnimationsExampleDialog, { width: "350px" });
      diaglogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result.type == 'success') {
          this.orderData = result.payload;
        }
        if (result.type == 'failed') {
          this.toarst.error(result.payload)
        }
      })

    }, error => this.toarst.error(error));
  }

}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  codeForm: FormGroup
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private toarst: ToastrService, private orderService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: { payload: any, type: 'success' | 'failed' }) {
    this.codeForm = new FormGroup({
      code: new FormControl('', Validators.required)
    });
  }
  codeSubmit() {
    if (this.codeForm.valid) {
      this.orderService.findOrders(this.codeForm.value).subscribe(data => { this.dataDialog = { payload: data, type: 'success' }; this.dialogRef.close(this.dataDialog); }, error => { this.dataDialog = { payload: error, type: 'failed' }; this.dialogRef.close(this.dataDialog); })

    }
  }

}
