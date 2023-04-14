import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GETPRODUCTS } from 'src/app/graphql/graphql.queries';
import { ProductModel } from 'src/app/models/product.model';
import {DELETEPRODUCT} from '../../graphql/graphql.queries'
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import {UPDATEPRODUCT} from '../../graphql/graphql.queries'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products:any[] = []

  public productToEdit:ProductModel = new ProductModel
  nameEdit:string = ""
  typeEdit:string = ""
  

  constructor(private apollo:Apollo){}

  ngOnInit(): void {
    
    this.apollo.watchQuery({
      query: GETPRODUCTS
    }).valueChanges.subscribe((result:any)=>{
        this.products = result?.data?.products;
    })
  }

  loadData(product:ProductModel){
    this.productToEdit = product

    this.nameEdit = product.name;
    this.typeEdit = product.type;

    console.log(this.productToEdit.id)
  }

  saveChanges(form: NgForm){

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
      mutation: UPDATEPRODUCT,
      variables: {
        updateProductInput: {
          "id": `${this.productToEdit.id}`,
          "name": `${this.nameEdit}`,
          "type": `${this.typeEdit}`
        },
      },
    }).subscribe((result:any)=>{
      Swal.close();
      console.log(result)
      window.location.reload()
      
    },err=>{
      Swal.fire({
        title:'Autenticated Error',
        text: err.message
      });
    })
  }


  deleteProduct(product:ProductModel){

    Swal.fire({
      allowOutsideClick:false,
      text:'Waith a moment please'
    });
    Swal.showLoading();

    this.apollo
      .mutate({
        mutation: DELETEPRODUCT,
        variables: {
          removeProductId: `${product.id}`
        },
      }).subscribe((result:any)=>{
        window.location.reload();
        Swal.close();
        
      },err=>{
        Swal.fire({
          title:'Autenticated Error',
          text: err.message
        });
      })
  }

}
