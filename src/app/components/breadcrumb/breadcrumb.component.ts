import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
  <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page"><a href="#">Data</a></li>
  </ol>
  </nav>
  `,
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
