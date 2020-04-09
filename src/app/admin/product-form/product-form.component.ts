import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  productId;
  preventReadingFromNull: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getById(this.productId).subscribe(p => this.product = p);
    }
  }

  store(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    }
    else {
      this.productService.save(product);
    }
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.productId);
    this.preventReadingFromNull = true;
    this.router.navigate(['/admin/products']);

  }
}
