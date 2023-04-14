import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GETPRODUCTS } from 'src/app/graphql/graphql.queries';
import { ProductModel } from 'src/app/models/product.model';
import {DELETEPRODUCT} from '../../graphql/graphql.queries'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products:any[] = []
  loading = true
  error : any

  constructor(private apollo:Apollo){}

  ngOnInit(): void {
    
    this.apollo.watchQuery({
      query: GETPRODUCTS
    }).valueChanges.subscribe((result:any)=>{
        this.products = result?.data?.products;
        this.loading = result.loading;
        this.error = result.error;
    })
  }

  showIndex(product:ProductModel){

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
