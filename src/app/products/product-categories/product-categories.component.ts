import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  categories$;
  @Input('currentCategory') currentCategory;

  constructor(private cateogryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.cateogryService.getAll();
  }

}
