import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-order',
  templateUrl: './verify-order.component.html',
  styleUrls: ['./verify-order.component.css']
})
export class VerifyOrderComponent implements OnInit {
  message: string = "";
  id: string = "";
  url: string = "";
  token: string = "";
  constructor(private orderServices: OrdersService, private activeRoute: ActivatedRoute, private userServices: UserServices) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.token = this.activeRoute.snapshot.params['token'];
    this.url = this.activeRoute.snapshot.url.join('');
    this.callApi();
  }
  callApi() {
    if (this.url.includes("order")) {
      this.orderServices.confirmOrder(this.id, this.token).subscribe(data => this.message = data.message, error => this.message = error);
    } else {
      this.userServices.confirmUser(this.id, this.token).subscribe(data => this.message = data.message, error => this.message = error);
    }
  }
}
