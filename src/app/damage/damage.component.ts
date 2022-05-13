import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-damage',
  template: `
    <span [ngClass]="damage>500?'text-danger':'text-warning'" >{{damage}}</span>
  `,
  styleUrls: ['./damage.component.css']
})
export class DamageComponent implements OnInit {
  @Input() damage: number;
  constructor() {
    this.damage = 0;
  }
  ngOnInit(): void {
  }

}
