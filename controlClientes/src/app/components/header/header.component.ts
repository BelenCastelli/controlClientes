import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isLogged: boolean = false
 loggedUser: string = ''
 constructor(private loginService: LoginService,
  private router: Router
 ){}

 ngOnInit(): void {
   
 }
}
