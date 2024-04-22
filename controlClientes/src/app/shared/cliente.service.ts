import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url:string

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/clientes'
  }

  public getClientes(): Observable<Cliente>{
    console.log(this.http.get(this.url));
    
    return this.http.get(this.url)
  }
    
}
