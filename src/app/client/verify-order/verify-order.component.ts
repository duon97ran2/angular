import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-verify-order',
  templateUrl: './verify-order.component.html',
  styleUrls: ['./verify-order.component.css']
})
export class VerifyOrderComponent implements OnInit {
  message: string = "";
  id: string = "";
  token: string = "";
  constructor(private orderServices: OrdersService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = this.activeRoute.snapshot.params['token'];
    this.orderServices.confirmOrder(this.id, this.token).subscribe(data => this.message = data.message, error => this.message = error);
  }

}
