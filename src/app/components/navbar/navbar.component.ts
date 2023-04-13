import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  autenticated = false;

  constructor(private router:Router){}

  ngOnInit(): void {
    if (localStorage.getItem('token')===null||localStorage.getItem('token')===''){
      this.autenticated = false
    }else{
      this.autenticated = true
    }
    console.log(this.autenticated) 
  }

  logOff(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

}
