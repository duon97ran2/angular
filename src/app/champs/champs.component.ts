import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrls: ['./champs.component.css']
})
export class ChampsComponent implements OnInit {
  @Input("champ") champ: any;
  constructor() { }
  ngOnInit(): void {
  }

}
