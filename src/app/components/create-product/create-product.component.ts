import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { ProductModel } from "src/app/models/product.model";
import {CREATEPRODUCT} from  "../../graphql/graphql.queries"
import Swal from "sweetalert2";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent {


   product:ProductModel = new ProductModel


  constructor(private apollo: Apollo, private router: Router) {}

  createNewProduct(form: NgForm){

    //si hay errores entonces se sale
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
        mutation: CREATEPRODUCT,
        variables: {
          createProductInput: {
            "name": `${this.product.name}`,
            "type": `${this.product.type}`
          },
        },
      }).subscribe((result:any)=>{
        this.router.navigateByUrl('/products')
        Swal.close();
        
      },err=>{
        Swal.fire({
          title:'Autenticated Error',
          text: err.message
        });
      })
  }

}
