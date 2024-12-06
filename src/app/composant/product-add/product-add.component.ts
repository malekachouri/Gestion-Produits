import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../service/products.service'; 

@Component({
  selector: 'app-product-add',
  standalone: false,
  
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup; // FormGroup for the product
  submitted: boolean = false; // To track form submission

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    
  ) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required], // Name is required
      price: ['', Validators.required], // Price is required
      quantity: ['', Validators.required], // Quantity is required
      selected: [false], // Default: not selected
      available: [true], // Default: available
    });
  }

  // Save the product
  onSaveProduct(): void {
    this.submitted = true;

    if (this.productFormGroup?.invalid) {
      return; // Exit if form is invalid
    }

    // Call the service to save the product
    this.productsService.save(this.productFormGroup?.value).subscribe({
      next: (data) => {alert("Succes saving product ");
      }  
    });
  }
}

