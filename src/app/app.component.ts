import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'No name';
  name = "duong";
  class = "we16301";
  oxs_sad = "asdasd";
  student_list = [
    {
      name: "daadsf",
      id: "as123123",
      class: "we16301",
      status: 1,
    },
    {
      name: "dasdsadaf",
      id: "as123124",
      class: "we16301",
      status: 1,
    },
    {
      name: "daadsxzcf",
      id: "as123125",
      class: "we16301",
      status: 0,
    },
    {
      name: "daadsf",
      id: "as123126",
      class: "we16301",
      status: 0,
    },
  ];
  champs = [
    {
      name: "Yasuo",
      damage: 2000,
      defend: 1000,
      speed: 400,
      price: 3000,
      avatar: "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb"
    },
    {
      name: "Teemo",
      damage: 2000,
      defend: 1000,
      speed: 400,
      price: 3000,
      avatar: "https://kenh14cdn.com/203336854389633024/2021/1/1/photo-1-16094709965821478696212.png"
    },
    {
      name: "Akali",
      damage: 2000,
      defend: 1000,
      speed: 400,
      price: 3000,
      avatar: "https://image.lag.vn/upload/news/20/10/28/WildRift_Akali-1024x576_HFRM.jpg"
    },
    {
      name: "LeeSin",
      damage: 100,
      defend: 1000,
      speed: 400,
      price: 3500,
      avatar: "https://victory8.online/wp-content/uploads/2020/08/leesin-lien-minh-huyen-thoai-1-e1597644246760.jpg"
    },
  ];
  visible = false;
  displayHandle() {
    this.visible = !this.visible;
  };
  champData = {
    name: '',
    avatar: '',
    damage: '',
    defend: '',
    speed: '',
    price: '',
  }

  onSubmit(event: any) {
    this.champs.push({
      ...this.champData,
      damage: +this.champData.damage,
      defend: +this.champData.defend,
      speed: +this.champData.speed,
      price: +this.champData.price
    });
    this.champData.name = '';
    this.champData.avatar = '';
  };
  onInput(event: any, text: 'name' | 'avatar' | 'damage' | 'defend' | 'speed' | 'price') {
    this.champData[text] = event.target.value;
  };

}
