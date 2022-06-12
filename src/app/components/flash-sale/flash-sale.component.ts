import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/type/product';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.css']
})
export class FlashSaleComponent implements OnInit {
  @Input() dataSource: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
