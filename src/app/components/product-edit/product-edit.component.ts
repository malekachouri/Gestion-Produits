import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-edit',
  standalone: false,
  
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  productId!: number; // Store the product ID
  productFormGroup?: FormGroup; // FormGroup for editing the product
  submitted: boolean = false; // Track if the form has been submitted

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the product ID from the route
    this.productId = +this.activatedRoute.snapshot.params['id'];

    // Fetch the product details and initialize the form
    this.productsService.getProduct(this.productId).subscribe((product) => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
      });
    });
  }

  // Update the product
  onUpdateProduct(): void {
    this.submitted = true;

    if (this.productFormGroup?.invalid) {
      return; // Exit if the form is invalid
    }

    this.productsService.updateProduct(this.productFormGroup?.value).subscribe({
      next: () => {
        alert('Success! Product updated.');
        this.router.navigateByUrl('/products'); // Navigate back to the product list
      },
      error: (err) => {
        console.error('Error updating product:', err);
      },
    });
  }
}
