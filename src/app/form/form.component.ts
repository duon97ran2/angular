import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }
  inputValues = {
    username: "",
    age: 0, email: "", phone: "", id: 0
  };
  users: { username: string, age: number, id: number, email: string, phone: string }[] = [];
  removeHandle(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  };
  updateHandle(id: number) {
    const data = this.users.find(user => user.id == id);
    if (data) this.inputValues = data;
  }
  submitHandle(userForm: NgForm) {
    if (userForm.value.id) {
      this.users = this.users.map(user => user.id != userForm.value.id ? user : userForm.value);
    }
    else {
      const newUserIds = this.users.map(user => user.id).sort((a: number, b: number) => b - a);
      this.users.push({ ...userForm.value, id: newUserIds[0] ? newUserIds[0] + 1 : 1 });
    }
    userForm.reset();
  }

}
