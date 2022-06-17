import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { orderResponse } from './../../../type/orders';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderData: orderResponse[] = [];
  url: string = '';
  displayedColumns: string[] = ['index', 'id', 'status', 'name', 'action'];
  constructor(private orderService: OrdersService, private toarst: ToastrService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.activeRoute.snapshot.url.join('');
    this.getData();
  }
  getData() {
    if (this.url.includes("cancel")) {
      this.orderService.getCancelOrders().subscribe(data => this.orderData = data);
    }
    else {
      this.orderService.getOrders().subscribe(data => this.orderData = data);
    }
  }
  statusUpdate(status: number, id: string) {
    let confirmUpdate: any = '';
    switch (status) {
      case 0:
        confirmUpdate = confirm("Khôi phục đơn hàng?");
        break;
      case 1:
        confirmUpdate = confirm("Xác nhận đơn hàng?");
        break;
      case 2:
        confirmUpdate = confirm("Tiến hành giao hàng?");
        break;
      case 3:
        confirmUpdate = confirm("Hoàn thành giao hàng?");
        break;
      case 4:
        confirmUpdate = confirm("Hủy đơn hàng?");
        break;
      default:
        break;
    }
    if (confirmUpdate) {
      this.orderService.updateOrder(id, { status }).subscribe(data => { this.toarst.success("Cập nhật trạng thái thành công"); this.getData() })
    }
  }
}
