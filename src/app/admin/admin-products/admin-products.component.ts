import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dataSource = new MatTableDataSource(this.filteredProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: Product, filter: string) =>
        (data.title + data.price).toLowerCase().includes(filter.toLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // filter(query: string) {
  //   this.filteredProducts = query ? 
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ) : 
  //     this.products;
  // }

  filter(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    console.log(searchText);
    this.dataSource.filter = searchText.trim().toLowerCase();
  }

}
