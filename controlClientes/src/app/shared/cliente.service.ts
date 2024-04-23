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

  public postCLiente(cliente:Cliente){
    return this.http.post(this.url, cliente)
  }
  
  public getcliente(_id: string){
    return this.http.get(`http://localhost:3000/cliente?_id=${_id}`)
  }

  public putcliente(cliente:Cliente){
    return this.http.put('http://localhost:3000/cliente', cliente)
  }

  public deletecliente(_id:string){
    let body = {
      _id: _id
    }
    console.log(body);
    
    return this.http.delete('http://localhost:3000/cliente',{ body: body})
  }
}
