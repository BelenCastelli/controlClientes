import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/shared/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{
  public cliente: Cliente = {
    _id: '',
    nombre: '', 
    apellido: '', 
    email: '', 
    saldo: 0
  }

  constructor(public clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.cliente._id = this.route.snapshot.params['id']
    if(this.cliente._id){
      this.clienteService.getcliente(this.cliente._id).subscribe((res:any) => {
        if(!res.error){
          this.cliente = res.data
        }
      })
    }
  }

  guardar(form:NgForm){
    if(!form.valid){
      this.toastr.error('Rellena el formulario correctamente', 'Error')
    } else {
      form.value._id = this.cliente._id
      this.cliente = form.value
      this.clienteService.putcliente(this.cliente).subscribe((res:any) =>{
        if(!res.error){
          this.toastr.success('Cliente modificado', 'Éxito')
          this.router.navigate(['/'])
        }
      })
    }
  }
  eliminar(){
    if(confirm('¿Seguro que deseas eliminar el cliente?')){
      if(this.cliente._id){
        this.clienteService.deletecliente(this.cliente._id).subscribe((res:any) => {
          if(!res.error){
            this.toastr.success(res.mensaje, 'Éxito')
          }
        })

      }
    }

  }
}
