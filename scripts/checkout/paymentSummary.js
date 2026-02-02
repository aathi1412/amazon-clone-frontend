// import { cart, calculateCartQuantity } from "../../data/cart.js";
import {cart, resetCart} from '../../data/cart-class.js';

import { getProduct } from "../../data/products.js"; 
import { formatCurrency } from "../utils/money.js";
import {  getDeliveryOption } from "../../data/deliveryOption.js";
import { addOrder } from '../../data/ordersData.js';





export function renderPaymentSummary(){

    let itemPrice = 0;
    let shippingPrice = 0;

    cart.cartItems.forEach(cartItem => {
        
        let product = getProduct(cartItem.productId);
        itemPrice += cartItem.quantity * product.priceCents;

        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.priceCents;
        
    });

    const totalBeforeTax = itemPrice + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;


    let paymentSummaryHTML = '';

    const cartQuantity = cart.calculateCartQuantity();

    paymentSummaryHTML = `
            <div class="payment-summary-title">
                Payment Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${cartQuantity}):</div>
                <div class="payment-summary-money">
                $${formatCurrency(itemPrice)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money js-shipping">$${formatCurrency(shippingPrice)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money js-total">$${formatCurrency(totalBeforeTax + estimatedTax)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
                Place your order
            </button>
        
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {

        if(cart.cartItems.length === 0){
            alert('no products to order')
            return;
        }

        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                    cart: cart
                })
        });

        const order = await response.json();
        addOrder(order);
        
        }
        catch(error){
            console.log('unexpected error. please try again later');
        }
        
        resetCart();
        
        window.location.href = 'orders.html';
    });

}
