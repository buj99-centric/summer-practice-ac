import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-cart',
    imports: [CurrencyPipe, TitleCasePipe, DatePipe],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    amount: number = 23;
    company: string = 'centric romania';
    purchasedOn: string = '2024-01-17';
}
