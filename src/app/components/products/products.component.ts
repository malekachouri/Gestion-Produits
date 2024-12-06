import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../../../model/product.model';
import { Observable,of } from 'rxjs';
import { catchError,map,startWith } from 'rxjs';
import { AppDataState,DataStateEnum } from '../../../../state/product.state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: false,
  
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService: ProductsService, private router :Router) {}
  ngOnInit(): void {
    this.onGetAllProducts(); // Fetch all products on initialization
  }
  // Fetch all products
  onGetAllProducts(): void {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data); // Debug: Log the data
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }), // Emit loading state first
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
  // Fetch selected products
  onGetSelectedProducts(): void {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) => {
        console.log(data); // Debug: Log the data
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }), // Emit loading state first
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
 // Fetch available products
 onGetAvailableProducts(): void {
  this.products$ = this.productsService.getAvailableProducts().pipe(
    map((data) => {
      console.log(data); // Debug: Log the data
      return { dataState: DataStateEnum.LOADED, data: data };
    }),
    startWith({ dataState: DataStateEnum.LOADING }), // Emit loading state first
    catchError((err) =>
      of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
    )
  );
}
 // Search products
 onSearch(dataForm: any): void {
  this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
    map((data) => {
      console.log(data); // Debug: Log the data
      return { dataState: DataStateEnum.LOADED, data: data };
    }),
    startWith({ dataState: DataStateEnum.LOADING }), // Emit loading state first
    catchError((err) =>
      of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
    )
  );
}
// Select a product
onSelect(p: Product): void {
  this.productsService.select(p).subscribe((data) => {
    console.log('Product selected:', data);
    p.selected = data.selected; // Update selection status
  });
}

// Delete a product
onDelete(p: Product): void {
  const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
  if (confirmDelete) {
    this.productsService.deleteProduct(p).subscribe(() => {
      console.log('Product deleted:', p);
      this.onGetAllProducts(); // Refresh product list
    });
  }
}

// Navigate to the New Product page
onNewProduct(): void {
  this.router.navigateByUrl('/newProduct');
}

// Navigate to the Edit Product page
onEdit(p: Product): void {
  this.router.navigateByUrl(`/editProduct/${p.id}`);
}

}
