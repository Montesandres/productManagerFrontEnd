import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GETPRODUCTS } from 'src/app/graphql/graphql.queries';

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
      console.log(result.data)
        this.products = result?.data?.products;
        this.loading = result.loading;
        this.error = result.error;
    })
  }

}
