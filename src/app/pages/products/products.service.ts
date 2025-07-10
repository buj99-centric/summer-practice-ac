import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductApi } from './types/product-api-response.type';
import { map, Observable, tap } from 'rxjs';
import { ProductFormModel } from './types/product-form-model.type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = 'https://fakestoreapi.com/products';

  constructor(private readonly httpClient: HttpClient) { }

  getProductById(id: number): Observable<ProductFormModel> {
    return this.httpClient.get<ProductApi>(`${this.baseUrl}/${id}`).pipe(
      tap(productApiResponse => {
        console.log('Side effect with api response product:', productApiResponse)
      }),
      map(productApiResponse => {
        return {
          id: productApiResponse.id,
          name: productApiResponse.title,
          value: productApiResponse.price,
          description: productApiResponse.description,
          category: productApiResponse.category,
          image: productApiResponse.image
        } as ProductFormModel;
      })
    );
  }

  updateProduct(product: ProductApi): Observable<unknown> {
    return this.httpClient.put<ProductApi>(`${this.baseUrl}/${product.id}`, product);
  }
}
