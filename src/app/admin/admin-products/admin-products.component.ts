import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  displayedColumns: string[] = ['index', 'title', 'price', 'edit'];
  // displayedColumns: string[] = [ 'title', 'price'];
  dataSource: MatTableDataSource<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dataSource  = new MatTableDataSource(this.filteredProducts);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ) : 
      this.products;
  }

}
