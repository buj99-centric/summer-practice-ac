import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-products',
    imports: [RouterOutlet, ReactiveFormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
    productForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.maxLength(10)),
        price: new FormControl(10, [Validators.min(10), Validators.max(100)]),
        description: new FormControl('a'),
        category: new FormControl('')
    });

    get title(): FormControl {
        return this.productForm.get('title') as FormControl;
    }

    get price(): FormControl {
        return this.productForm.get('price') as FormControl;
    }

    get description(): FormControl {
        return this.productForm.get('description') as FormControl;
    }

    ngOnInit(): void {
        this.title.setValue('Nice product');
    }

    onSubmit(): void {
        console.log('Form submitted:', this.productForm.value);
        console.log('Error on title:', this.title.errors);
        console.log('Error on price:', this.price.errors);
        console.log('Error on description:', this.description.errors);
    }
}
