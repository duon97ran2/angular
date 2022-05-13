import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-avatar',
  template: `
    <img [src]="src" height="100px" class="border p-2" [ngClass]="  price>3100?'border-warning':'border-0'" >
  `,
  styleUrls: ['./table-avatar.component.css']
})
export class TableAvatarComponent implements OnInit {
  @Input() src: string;
  @Input() price: number;
  constructor() {
    this.src = '';
    this.price = 0;
  }

  ngOnInit(): void {
  }

}
