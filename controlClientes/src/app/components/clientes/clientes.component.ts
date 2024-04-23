import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    this.toastr.error('Rellena correctamente el formulario','Atención')
  } else {
    console.log(form.value);
    
      this.clienteService.postCLiente(form.value).subscribe((res:any) => {
        if(!res.error)
          this.toastr.success(res.mensaje, 'Éxito')
          this.getClientes()
          form.reset()
      })
  }
  }

  getCliente(id:string){
    
  }


}
