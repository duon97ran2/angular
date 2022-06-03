import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
}
