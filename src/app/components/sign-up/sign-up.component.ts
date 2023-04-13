import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/usuario.model';
import { Apollo } from 'apollo-angular';
import {CREATEUSER} from 'src/app/graphql/graphql.queries'
import Swal from "sweetalert2";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit  {

  user:UserModel = new UserModel()

    constructor(private apollo:Apollo,
                private router:Router){}

    ngOnInit():void {}

    onSubmit(form:NgForm){

      //console.log(form)

      if (form.invalid){return;}

      Swal.fire({
        allowOutsideClick:false,
        text:'Waith a moment please'
      });
      Swal.showLoading();

      this.apollo
      .mutate({
        mutation: CREATEUSER,
        variables: {
          signUpInput: {
            "email": `${this.user.email}`,
            "fullName": `${this.user.name}`,
            "password": `${this.user.password}`
          },
        },
      }).subscribe((result:any)=>{
        this.saveToken(result.data.singup.token);
        Swal.close();
        this.router.navigateByUrl('/products')
       
      },err=>{
        console.log(err)
        Swal.fire({
          title:'Register Error',
          text: err.message
        });
      }) 
    }

    private saveToken(idToken:string){
      this.user.token = idToken
      localStorage.setItem('token',idToken)
    } 
  
    
}
