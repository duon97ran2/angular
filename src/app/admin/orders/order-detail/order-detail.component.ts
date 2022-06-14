import { OrdersService } from './../../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderResponse } from 'src/app/type/orders';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderData: orderResponse = {} as orderResponse;
  currentId: string = ''
  displayedColumns: string[] = ['index', 'name', 'price', 'quantity', 'image',];
  constructor(private activeRoute: ActivatedRoute, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.currentId = this.activeRoute.snapshot.params['id']
    this.orderService.getOrderDetail(this.currentId).subscribe(data => this.orderData = data);
  }

}
