import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string = ''
  public password: string = ''


  constructor(private route:Router, private toastr: ToastrService, 
    public loginService: LoginService
  ){}
  login(){
    let user =  new User(this.email, this.password)
    this.loginService.login(user).subscribe((res:any) => {
      if(!res.error){
        const token = res.token;
        localStorage.setItem('token', token);
        console.log(token);
        
        this.toastr.success(res.mensaje, 'Éxito')
        this.route.navigate(['/'])
      } else {
        this.toastr.error(res.mensaje, 'Ups')
      }
    })
  }
}
