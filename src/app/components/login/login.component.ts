import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Apollo } from "apollo-angular";
import { UserModel } from "src/app/models/usuario.model";
import { LOGIN } from "../../graphql/graphql.queries";
import { Router } from '@angular/router';
import Swal from "sweetalert2";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  
  user: UserModel = new UserModel();

  constructor(private apollo: Apollo,
              private router:Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick:false,
      text:'Waith a moment please'
    });
    Swal.showLoading();

    this.apollo
      .mutate({
        mutation: LOGIN,
        variables: {
          logInInput: {
            "email": `${this.user.email}`,
            "password": `${this.user.password}`
          },
        },
      }).subscribe((result:any)=>{
        this.saveToken(result.data.login.token);
        this.router.navigateByUrl('/products')
        Swal.close();
        
      },err=>{
        Swal.fire({
          title:'Autenticated Error',
          text: err.message
        });
      })
  }  

  private saveToken(idToken:string){
    this.user.token = idToken
    localStorage.setItem('token',idToken)
  } 

  // private readToken(){
  //   if(localStorage.getItem('token')){
  //     return localStorage.getItem('token')
  //   }else{
  //     return ''
  //   }
  // }

}  
