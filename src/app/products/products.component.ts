import { switchMap } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];
  currentCategory: string;
  productsByCateogry: any[];

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
      this.currentCategory = params.get('category');
      this.productsByCateogry = this.currentCategory ?
        this.products.filter(p => p.category === this.currentCategory) :
        this.products;
    });;
  }
}
