import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { orderResponse } from 'src/app/type/orders';


@Component({
  selector: 'app-order-detail-search',
  templateUrl: './order-detail-search.component.html',
  styleUrls: ['./order-detail-search.component.css']
})
export class OrderDetailSearchComponent implements OnInit {
  orderData: orderResponse = {} as orderResponse;
  currentId: string = ''
  displayedColumns: string[] = ['index', 'name', 'price', 'quantity', 'image',];
  constructor(private activeRoute: ActivatedRoute, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.currentId = this.activeRoute.snapshot.params['id']
    this.orderService.getOrderDetail(this.currentId).subscribe(data => this.orderData = data);
  }

}
