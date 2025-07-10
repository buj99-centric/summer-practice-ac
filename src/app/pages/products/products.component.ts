import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './products.service';
import { ProductApi } from './types/product-api-response.type';
import { Subscription, take } from 'rxjs';
import { ProductFormModel } from './types/product-form-model.type';

@Component({
    selector: 'app-products',
    imports: [RouterOutlet, ReactiveFormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
    productForm: FormGroup = new FormGroup({
        id: new FormControl({
            value: 1,
            disabled: true
        }),
        name: new FormControl('', Validators.maxLength(10)),
        value: new FormControl(10, [Validators.min(10), Validators.max(100)]),
        description: new FormControl('a'),
        category: new FormControl('')
    });
    updateProductSubscription = Subscription.EMPTY;

    constructor(private readonly productsService: ProductsService) {}

    get name(): FormControl {
        return this.productForm.get('name') as FormControl;
    }

    get value(): FormControl {
        return this.productForm.get('value') as FormControl;
    }

    get description(): FormControl {
        return this.productForm.get('description') as FormControl;
    }

    ngOnInit(): void {
        this.name.setValue('Nice product');
        this.productsService.getProductById(1).pipe(take(1)).subscribe(product => {
            this.productForm.patchValue(product);
        });
    }

    ngOnDestroy(): void {
        this.updateProductSubscription.unsubscribe();
    }

    onSubmit(): void {
        const formValue = this.productForm.getRawValue() as ProductFormModel;

        const productApi: ProductApi = {
            id: formValue.id,
            title: formValue.name,
            price: formValue.value,
            description: formValue.description,
            category: formValue.category,
            image: '' // Assuming image is not part of the form
        };

        this.updateProductSubscription = this.productsService.updateProduct(productApi).subscribe(_ => {
            console.log('Product updated successfully');
        });
        console.log('Form submitted:', this.productForm.value);
        console.log('Error on name:', this.name.errors);
        console.log('Error on value:', this.value.errors);
        console.log('Error on description:', this.description.errors);
    }
}
