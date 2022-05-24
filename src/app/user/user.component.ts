import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  };
  users: { username: string, age: number, id: number, email: string, phone: string }[] = [];
  formValue = {
    username: "",
    age: 0, email: "", phone: "", id: 0
  };
  onCreateUser(formData: any) {
    if (formData.value.id) {
      this.users = this.users.map(user => {
        if (user.id == formData.value.id) return formData.value
        return user
      })
    }
    else {
      const newUserIds = this.users.map(user => user.id).sort((a: number, b: number) => b - a);
      this.users.push({ ...formData.value, id: newUserIds[0] ? newUserIds[0] + 1 : 1 });
    }
    formData.reset();
  }
  onUpdateUser(userId: number) {
    const data = this.users.find(user => user.id == userId);
    if (data) this.formValue = { ...data };
  }
  onRemoveUser(userId: number) {
    this.users = this.users.filter(user => user.id != userId);
  }
}
