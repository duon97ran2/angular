import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() handleSubmit: EventEmitter<any>;
  @Input() inputValues: any;
  constructor() {
    this.handleSubmit = new EventEmitter();
  }
  ngOnInit(): void {
  }
  submitHandle(userForm: NgForm) {
    this.handleSubmit.emit(userForm);
    // if (userForm.value.id) {
    //   this.users = this.users.map(user => user.id != userForm.value.id ? user : userForm.value);
    // }
    // else {
    //   const newUserIds = this.users.map(user => user.id).sort((a: number, b: number) => b - a);
    //   this.users.push({ ...userForm.value, id: newUserIds[0] ? newUserIds[0] + 1 : 1 });
    // }
    // userForm.reset();
  }
}
