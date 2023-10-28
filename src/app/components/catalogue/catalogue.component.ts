import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent {
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<Product[]>('https://localhost:7027/api/Products')
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
}