import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-validate',
  templateUrl: './show-validate.component.html',
  styleUrls: ['./show-validate.component.css']
})
export class ShowValidateComponent implements OnInit {
  @Input() field: any;
  @Input() title: any;
  console = console;
  constructor() { }

  ngOnInit(): void {
  }


}
