import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/shared/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = []
  public cliente: Cliente = {
    nombre: '', 
    apellido: '', 
    email: '', 
    saldo: 0
  }
  constructor(public clienteService: ClienteService,
    private toastr: ToastrService
  ){

  }
  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(){
    this.clienteService.getClientes().subscribe((res:any) =>{
      this.clientes = res.data
      
      console.log(this.clientes);
      
    })
   
  }

  getSaldoTotal(){
    let saldoTotal:  number = 0
    if(this.clientes.length != 0){
      this.clientes.forEach((cliente) => {
        if (cliente && cliente.saldo !== undefined) {
          saldoTotal += cliente.saldo
        }
      })
    }
    return saldoTotal
  }

  agregar(form: NgForm){
  if(!form.valid){
    this.toastr.error('Atención', 'Rellena correctamente el formulario')
  } else {

  }
  }
}
