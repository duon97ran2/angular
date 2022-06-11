import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.css']
})
export class StatusChangeComponent implements OnInit {
  @Input() status: number;
  constructor() {
    this.status = 0;
  }
  ngOnInit(): void {
  }

}
