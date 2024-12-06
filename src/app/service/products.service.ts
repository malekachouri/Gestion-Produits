import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private host: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  // Get selected products
  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?selected=true`);
  }

  // Get available products
  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?available=true`);
  }

  // Search products by keyword
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?name_like=${keyword}`);
  }

  // Select a product
  select(product: Product): Observable<Product> {
    product.selected = true;
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }

  // Delete a product
  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.host}/products/${product.id}`);
  }

  // Save a new product
  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  // Get a product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  // Update an existing product
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
