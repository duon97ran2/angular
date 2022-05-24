import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: any;
  @Input() inputValues: any
  @Output() handleUpdate: EventEmitter<number>;
  @Output() handleRemove: EventEmitter<number>;
  constructor() {
    this.handleUpdate = new EventEmitter();
    this.handleRemove = new EventEmitter();
  }
  ngOnInit(): void {
  }

  removeHandle(id: number) {
    this.handleRemove.emit(id);
  };
  updateHandle(id: number) {
    this.handleUpdate.emit(id);
  }
}
