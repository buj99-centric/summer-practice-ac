import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-products',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.maxLength(10)),
    value: new FormControl(10, [Validators.min(10), Validators.max(100)]),
    description: new FormControl('a'),
    category: new FormControl(''),
  });

  get name(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get value(): FormControl {
    return this.productForm.get('value') as FormControl;
  }

  ngOnInit(): void {
    this.name.setValue('Nice product');
  }

  onSubmit(): void {
    console.log('Form submitted:', this.productForm.value);
    console.log('Error on name:', this.name.errors);
    console.log('Error on value:', this.value.errors);
  }
}
