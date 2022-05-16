import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography',
  template: `
    <p><strong>{{title}}</strong>:  {{text}}</p>
  `,
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  constructor() {
    this.text = '';
    this.title = '';
  }

  ngOnInit(): void {
  }

}
