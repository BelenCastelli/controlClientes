import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url:string

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.url = 'http://localhost:3000/clientes'
  }

  public getClientes(): Observable<Cliente>{
    const token = this.loginService.getToken();
    console.log(token);
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(this.url, { headers });
  }

  public postCLiente(cliente:Cliente){
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url, cliente, { headers });
  }
  
  public getcliente(_id: string){
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:3000/cliente?_id=${_id}`, { headers })
  }

  public putcliente(cliente:Cliente){
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put('http://localhost:3000/cliente', cliente, { headers });
  }

  public deletecliente(_id:string){
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let body = { _id: _id };
    return this.http.delete('http://localhost:3000/cliente', { headers, body });
  }
}
