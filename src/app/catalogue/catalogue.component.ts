import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent {
  products: Product[] = [];
  loading = true;
  error = false;
  errorMessage = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.httpClient
      .get<Product[]>(environment.apiUrl + '/Products')
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        () => {
          this.error = true;
          this.loading = false;
          this.errorMessage = 'Failed to fetch products.';
          console.log('Error fetching products');
        }
      );
  }
}
